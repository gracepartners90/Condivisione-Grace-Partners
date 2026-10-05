// Maps for the «Coordinate» device (docs/creativa/direzione-visiva.md §1.4, §7.3, §7.5, §7.6).
//
// Output: src/data/maps.json — for each map: viewBox, one SVG path (outline only, no fill needed),
// projected positions of the places (x, y in viewBox units and as percentages of the viewBox).
//
// Data: Natural Earth 1:10m admin-0 countries (public domain), via the world-atlas package
// (countries-10m.json, quantized TopoJSON). One projection for every map: Lambert conformal
// conic, standard parallels 37.5° and 45.5°, central meridian 12.5° E (fits Italy from
// Lampedusa to the Alps with minimal distortion). Each map is a linear window on it.
//
// - italia: outer rings of Italy ∪ San Marino ∪ Vatican (no enclave holes), islands ≥ 18 km² (smaller ones render as specks),
//   Douglas–Peucker at ~1 km, closed polylines.
// - puglia: Italian coastline clipped to the Terra di Bari window, Visvalingam–Whyatt (drops
//   sub-kilometre notches such as the harbour moles), then a centripetal Catmull–Rom curve
//   through the remaining Natural Earth vertices: one open line, no fill.
//
// Run with: node scripts/generate-maps.mjs   (fails if a path exceeds 8 KB)
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { geoArea, geoConicConformal } from 'd3-geo';
import { merge, mesh } from 'topojson-client';

const require = createRequire(import.meta.url);
const topology = JSON.parse(await readFile(require.resolve('world-atlas/countries-10m.json'), 'utf8'));
const WORLD_ATLAS_VERSION = JSON.parse(await readFile(require.resolve('world-atlas/package.json'), 'utf8')).version;

const MAX_PATH_BYTES = 8 * 1024; // visual direction §1.4
const EARTH_RADIUS_KM = 6371.0088;

const PROJECTION = { type: 'conicConformal', parallels: [37.5, 45.5], rotate: [-12.5, 0], center: [0, 41.9] };
// Scale = Earth radius: projected units are (almost exactly) kilometres near the standard parallels.
const projection = geoConicConformal()
  .parallels(PROJECTION.parallels)
  .rotate(PROJECTION.rotate)
  .center(PROJECTION.center)
  .scale(EARTH_RADIUS_KM)
  .translate([0, 0])
  .precision(0);

// Coordinates of the places: same values and source as src/data/site.ts (visual direction §1.4,
// docs/strategia/coordinate-luoghi.md). Keep the two lists aligned, then run `npm run maps`.
const PLACES = {
  acquaviva: { name: 'Acquaviva delle Fonti', lat: 40.9, lon: 16.85 },
  gravina: { name: 'Gravina in Puglia', lat: 40.82, lon: 16.42 },
  monopoli: { name: 'Monopoli', lat: 40.95, lon: 17.3 },
};

// Città Digitali on the «italia» map (Home chapter 03): one dot per city, names where they fit.
// Single source: src/data/citta-digitali.json (cities from the page «Tutte le città» of
// cittàdigitali.it; coordinates from docs/strategia/citta-digitali-elenco.md). The order of the
// candidate names is an editorial choice (`nomi`), the room for them is computed below.
const CITIES = JSON.parse(await readFile('src/data/citta-digitali.json', 'utf8'));
{
  const ids = new Set();
  for (const c of CITIES.citta) {
    if (ids.has(c.id)) throw new Error(`citta-digitali.json: duplicate id ${c.id}`);
    ids.add(c.id);
    // Same precision rule as every other place (visual direction §1.4): at most 2 decimals.
    for (const v of [c.lat, c.lon]) if (!/^-?\d+(\.\d{1,2})?$/.test(String(v))) throw new Error(`citta-digitali.json: ${c.id} has ${v}, use at most 2 decimals`);
  }
  const named = [...CITIES.nomi.obbligatori, ...CITIES.nomi.gruppi.flat(), ...CITIES.nomi.poi];
  const unknown = named.filter((id) => !ids.has(id));
  if (unknown.length) throw new Error(`citta-digitali.json: names for unknown cities ${unknown.join(', ')}`);
}

const geometries = topology.objects.countries.geometries;
const byId = (id) => geometries.find((g) => g.id === id);
const ITALY = '380', SAN_MARINO = '674', VATICAN = '336';

// ─── Geometry helpers (projected space) ───

/** Perpendicular distance from p to segment ab. */
function segDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  let t = len2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

/** Douglas–Peucker, iterative. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop();
    let max = 0, index = -1;
    for (let k = i + 1; k < j; k++) {
      const d = segDist(points[k], points[i], points[j]);
      if (d > max) { max = d; index = k; }
    }
    if (max > tolerance && index > 0) {
      keep[index] = 1;
      stack.push([i, index], [index, j]);
    }
  }
  return points.filter((_, k) => keep[k]);
}

/**
 * Visvalingam–Whyatt: drops the vertices whose triangle with their neighbours has the smallest
 * area, until every remaining triangle is at least `minArea` (units²). Unlike Douglas–Peucker it
 * removes small notches (harbour moles, quantisation steps) first and keeps long gentle bends.
 */
function simplifyArea(points, minArea) {
  const pts = points.map((p) => [...p]);
  const area = (a, b, c) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
  while (pts.length > 2) {
    let min = Infinity, index = -1;
    for (let k = 1; k < pts.length - 1; k++) {
      const a = area(pts[k - 1], pts[k], pts[k + 1]);
      if (a < min) { min = a; index = k; }
    }
    if (min >= minArea) break;
    pts.splice(index, 1);
  }
  return pts;
}

/** Closed ring: split at the point farthest from the start so both halves simplify well. */
function simplifyRing(ring, tolerance) {
  const pts = ring.slice(0, -1);
  let far = 0, max = 0;
  pts.forEach((p, k) => { const d = Math.hypot(p[0] - pts[0][0], p[1] - pts[0][1]); if (d > max) { max = d; far = k; } });
  const a = simplify(pts.slice(0, far + 1), tolerance);
  const b = simplify([...pts.slice(far), pts[0]], tolerance);
  return [...a.slice(0, -1), ...b.slice(0, -1)];
}

/** Liang–Barsky clipping of a polyline against [x0,y0,x1,y1]; returns the visible pieces. */
function clipPolyline(points, [x0, y0, x1, y1]) {
  const pieces = [];
  let current = null;
  for (let k = 0; k < points.length - 1; k++) {
    const a = points[k], b = points[k + 1];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    let t0 = 0, t1 = 1, visible = true;
    for (const [p, q] of [[-dx, a[0] - x0], [dx, x1 - a[0]], [-dy, a[1] - y0], [dy, y1 - a[1]]]) {
      if (p === 0) { if (q < 0) { visible = false; break; } continue; }
      const r = q / p;
      if (p < 0) { if (r > t1) { visible = false; break; } if (r > t0) t0 = r; }
      else { if (r < t0) { visible = false; break; } if (r < t1) t1 = r; }
    }
    if (!visible) { current = null; continue; }
    const pa = [a[0] + t0 * dx, a[1] + t0 * dy], pb = [a[0] + t1 * dx, a[1] + t1 * dy];
    if (!current || t0 > 0) { current = [pa]; pieces.push(current); }
    current.push(pb);
    if (t1 < 1) current = null;
  }
  return pieces.filter((p) => p.length > 1);
}

// ─── Serialisation: absolute start, then relative deltas computed on rounded points (no drift) ───

function fmt(v, decimals) {
  let s = v.toFixed(decimals).replace(/\.?0+$/, '');
  if (s === '-0') s = '0';
  return s.replace(/^(-?)0\./, '$1.');
}
function joinNumbers(nums) {
  let out = '';
  nums.forEach((n, i) => {
    if (i === 0) out += n;
    else if (n.startsWith('-') || (n.startsWith('.') && /\.\d*$/.test(nums[i - 1]))) out += n;
    else out += ' ' + n;
  });
  return out;
}
function toPath(lines, { closed, decimals }) {
  const f = 10 ** decimals;
  let d = '';
  for (const line of lines) {
    const pts = line.map(([x, y]) => [Math.round(x * f), Math.round(y * f)]);
    const unique = pts.filter((p, k) => k === 0 || p[0] !== pts[k - 1][0] || p[1] !== pts[k - 1][1]);
    if (unique.length < 2) continue;
    d += 'M' + joinNumbers([fmt(unique[0][0] / f, decimals), fmt(unique[0][1] / f, decimals)]);
    const rel = [];
    for (let k = 1; k < unique.length; k++) {
      rel.push(fmt((unique[k][0] - unique[k - 1][0]) / f, decimals), fmt((unique[k][1] - unique[k - 1][1]) / f, decimals));
    }
    d += 'l' + joinNumbers(rel) + (closed ? 'z' : '');
  }
  return d;
}

/**
 * Centripetal Catmull–Rom through the Natural Earth vertices, as cubic Béziers.
 * The 1:10m source is generalised (one vertex every 3–5 km on this coast): at hero size a straight
 * polyline reads like a chart, the smoothed line reads like a coast. The curve passes through
 * every source vertex; nothing is added between them except curvature.
 */
function catmullRom(points, alpha = 0.5) {
  const segs = [];
  const P = (k) => points[Math.max(0, Math.min(points.length - 1, k))];
  const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]) ** alpha;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const d1 = dist(p0, p1), d2 = dist(p1, p2), d3 = dist(p2, p3);
    const b1 = d1 < 1e-9 ? p1 : [0, 1].map((k) => (d1 * d1 * p2[k] - d2 * d2 * p0[k] + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1[k]) / (3 * d1 * (d1 + d2)));
    const b2 = d3 < 1e-9 ? p2 : [0, 1].map((k) => (d3 * d3 * p1[k] - d2 * d2 * p3[k] + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2[k]) / (3 * d3 * (d3 + d2)));
    segs.push([b1, b2, p2]);
  }
  return segs;
}
function toCurvePath(lines, decimals) {
  const f = 10 ** decimals;
  const r = ([x, y]) => [Math.round(x * f), Math.round(y * f)];
  let d = '';
  for (const line of lines) {
    let prev = r(line[0]);
    d += 'M' + joinNumbers([fmt(prev[0] / f, decimals), fmt(prev[1] / f, decimals)]) + 'c';
    const nums = [];
    for (const [b1, b2, p] of catmullRom(line)) {
      const [c1, c2, e] = [r(b1), r(b2), r(p)];
      for (const q of [c1, c2, e]) nums.push(fmt((q[0] - prev[0]) / f, decimals), fmt((q[1] - prev[1]) / f, decimals));
      prev = e; // relative "c": all three points are relative to the current point (segment start)
    }
    d += joinNumbers(nums);
  }
  return d;
}

// ─── Names on the map of Città Digitali ───
// Two classes of map width, the same 25rem threshold as the coordinates in MapItaly.astro:
// narrow maps (phones, and the 1024 px desktop at 382 px) and wide maps (up to 30rem).
// Each name takes one position around its node: beside it, on a corner, or hanging below it on a
// vertical leader, the gesture of the Horizon labels (design system §2.1). A name is shown only if
// it covers no dot, no node, no other name and no other leader at every width of its class.
// Metrics: mono label at 13 px, uppercase, with the user text spacing of WCAG 1.4.12 (0.12em
// tracking, line-height 1.5). Offsets match the anchor rules in MapItaly.astro.
const LABEL = { advance: 9.6, pad: 2, line: 19.5, node: 6.5, dot: 4, clear: 1, indent: 8 }; // node and dot radii include the 1.5 px knockout ring
const NAME_CLASSES = { narrow: [280, 400], wide: [400, 480] }; // px; .worlds__map is 280 px at 320 and 30rem at most
const STEP = 5;
const DROPS = { 'drop-r': 24, 'drop-l': 24, 'drop2-r': 40, 'drop2-l': 40 }; // px from the node centre to the first line
const ANCHORS = {
  e: (_w, h) => [14, -h / 2],
  w: (w, h) => [-14 - w, -h / 2],
  ne: (_w, h) => [8, -8 - h],
  se: () => [8, 8],
  nw: (w, h) => [-8 - w, -8 - h],
  sw: (w) => [-8 - w, 8],
  'drop-r': (_w, h) => [0, DROPS['drop-r'] - h / 2],
  'drop-l': (w, h) => [-w, DROPS['drop-l'] - h / 2],
  'drop2-r': (_w, h) => [0, DROPS['drop2-r'] - h / 2],
  'drop2-l': (w, h) => [-w, DROPS['drop2-l'] - h / 2],
};
const anchorOrder = (p, view) => p.x / view.width > 0.55 // as on every map: eastern names hang left
  ? ['w', 'e', 'ne', 'se', 'nw', 'sw', 'drop-l', 'drop-r', 'drop2-l', 'drop2-r']
  : ['e', 'w', 'ne', 'se', 'nw', 'sw', 'drop-r', 'drop-l', 'drop2-r', 'drop2-l'];

const circleHitsBox = (cx, cy, r, [x0, y0, x1, y1]) => {
  const nx = Math.max(x0, Math.min(cx, x1)), ny = Math.max(y0, Math.min(cy, y1));
  return (cx - nx) ** 2 + (cy - ny) ** 2 < r * r;
};
const boxesHit = (a, b, m) => a[0] < b[2] + m && a[2] > b[0] - m && a[1] < b[3] + m && a[3] > b[1] - m;
const widthRange = ([from, to]) => { const r = []; for (let w = from; w <= to; w += STEP) r.push(w); return r; };

/** Box (and leader, for drops) of the name of `p` with `anchor`, at map width `W`. */
function nameGeometry(p, anchor, W, view) {
  const k = W / view.width, cx = p.x * k, cy = p.y * k;
  const w = p.name.length * LABEL.advance + 2 * LABEL.pad + (DROPS[anchor] ? LABEL.indent : 0), h = LABEL.line;
  const [ox, oy] = ANCHORS[anchor](w, h);
  return { k, box: [cx + ox, cy + oy, cx + ox + w, cy + oy + h], leader: DROPS[anchor] ? [cx - 0.5, cy + LABEL.node, cx + 0.5, cy + DROPS[anchor]] : null };
}

/** Anchors for every city of `named` together (backtracking), or null if they do not all fit at `widths`. */
function placeNames(named, cities, view, widths, budget = 300000) {
  const others = cities.filter((c) => !named.includes(c));
  const free = (p, a) => widths.every((W) => {
    const { k, box, leader } = nameGeometry(p, a, W, view);
    if (box[0] < 0 || box[1] < 0 || box[2] > W || box[3] > view.height * k) return false;
    const touches = (x, y, r) => circleHitsBox(x * k, y * k, r + LABEL.clear, box) || (leader && circleHitsBox(x * k, y * k, r + LABEL.clear, leader));
    return !others.some((d) => touches(d.x, d.y, LABEL.dot)) && !named.some((q) => q !== p && touches(q.x, q.y, LABEL.node));
  });
  const options = named.map((p) => anchorOrder(p, view).filter((a) => free(p, a)).map((a) => ({ a, geo: widths.map((W) => nameGeometry(p, a, W, view)) })));
  if (options.some((o) => o.length === 0)) return null;
  const clash = (g1, g2) => g1.some((A, i) => { const B = g2[i]; return boxesHit(A.box, B.box, LABEL.clear) || (A.leader && boxesHit(A.leader, B.box, LABEL.clear)) || (B.leader && boxesHit(A.box, B.leader, LABEL.clear)); });
  const order = named.map((_, i) => i).sort((i, j) => options[i].length - options[j].length); // most constrained first
  const chosen = [];
  let steps = 0;
  const search = (n) => {
    if (n === order.length) return true;
    const i = order[n];
    for (const o of options[i]) {
      if (++steps > budget) return false;
      if (order.slice(0, n).every((j) => !clash(chosen[j].geo, o.geo))) { chosen[i] = o; if (search(n + 1)) return true; }
    }
    return false;
  };
  return search(0) ? Object.fromEntries(named.map((p, i) => [p.id, chosen[i].a])) : null;
}

/**
 * Names per class, in the editorial order of `nomi`: the required names (those of the chapter
 * text), then one name per group (the first that fits), then the others. The wide class starts
 * from the narrow names, so names only appear as the map grows. Returns { id: { wide, narrow } },
 * 'none' where the name is not shown. A required name may be missing on narrow maps (warning:
 * the chapter text names it beside the map); the build stops if it does not fit on wide maps.
 */
function chooseNames(cities, nomi, view) {
  const byId = Object.fromEntries(cities.map((c) => [c.id, c]));
  const excluded = new Set(nomi.senzaNome ?? []);
  // A name turns its dot into a node (Ø 10 and its ring): it must not hide another city's dot.
  const hidesDot = (c, widths) => widths.some((W) => cities.some((d) => d !== c && Math.hypot(d.x - c.x, d.y - c.y) * (W / view.width) + LABEL.dot - 1.5 <= LABEL.node));
  const grow = (start, widths, strict) => {
    let named = [], anchors = {};
    const add = (id) => {
      const c = byId[id];
      if (!c || excluded.has(id) || named.includes(c)) return false;
      if (!nomi.obbligatori.includes(id) && hidesDot(c, widths)) return false;
      const r = placeNames([...named, c], cities, view, widths);
      if (r) { named = [...named, c]; anchors = r; }
      return Boolean(r);
    };
    for (const id of [...start, ...nomi.obbligatori]) {
      if (add(id) || named.some((n) => n.id === id) || !nomi.obbligatori.includes(id)) continue;
      if (strict) throw new Error(`italia: no room for the required name ${byId[id].name}`);
      console.warn(`italia: no room for ${byId[id].name} on narrow maps: name hidden there`);
    }
    for (const group of nomi.gruppi) if (!group.some((id) => named.some((n) => n.id === id))) group.some(add);
    nomi.poi.forEach(add);
    return { ids: named.map((n) => n.id), anchors };
  };
  const narrow = grow([], widthRange(NAME_CLASSES.narrow), false);
  const wide = grow(narrow.ids, widthRange(NAME_CLASSES.wide), true);
  const lost = narrow.ids.filter((id) => !wide.ids.includes(id));
  if (lost.length) console.warn(`italia: ${lost.join(', ')} named on narrow maps but not on wide ones`);
  return Object.fromEntries(wide.ids.map((id) => [id, { wide: wide.anchors[id], narrow: narrow.anchors[id] ?? 'none' }]));
}

// ─── Map builders ───

/** Linear window: projected km → viewBox units (origin top-left, `width` units wide). */
function windowTransform([kx0, ky0, kx1, ky1], width) {
  const s = width / (kx1 - kx0);
  const height = Math.round((ky1 - ky0) * s * 10) / 10;
  return { s, width, height, apply: ([x, y]) => [(x - kx0) * s, (y - ky0) * s] };
}

function placeEntry(id, T, extra = {}) {
  const p = PLACES[id];
  const [x, y] = T.apply(projection([p.lon, p.lat]));
  return {
    id, name: p.name, lat: p.lat, lon: p.lon,
    x: +x.toFixed(1), y: +y.toFixed(1),
    xPct: +((x / T.width) * 100).toFixed(2), yPct: +((y / T.height) * 100).toFixed(2),
    ...extra,
  };
}

function labelEntry(text, lat, lon, T, anchor) {
  const [x, y] = T.apply(projection([lon, lat]));
  return { text, lat, lon, anchor, x: +x.toFixed(1), y: +y.toFixed(1), xPct: +((x / T.width) * 100).toFixed(2), yPct: +((y / T.height) * 100).toFixed(2) };
}

/** Italy with its islands: outer rings of Italy ∪ San Marino ∪ Vatican (no enclave holes). */
function buildItalia({ width = 1000, minIslandKm2 = 18, tolerance = 1.1, decimals = 1, pad = 0.02 } = {}) {
  const multi = merge(topology, [byId(ITALY), byId(SAN_MARINO), byId(VATICAN)]);
  const rings = multi.coordinates
    .map((poly) => poly[0])
    .filter((ring) => geoArea({ type: 'Polygon', coordinates: [ring] }) * EARTH_RADIUS_KM ** 2 >= minIslandKm2);
  const projected = rings.map((ring) => ring.map((c) => projection(c)));
  const xs = projected.flat().map((p) => p[0]), ys = projected.flat().map((p) => p[1]);
  const [bx0, by0, bx1, by1] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  const padKm = (bx1 - bx0) * pad;
  const T = windowTransform([bx0 - padKm, by0 - padKm, bx1 + padKm, by1 + padKm], width);
  const lines = projected.map((ring) => simplifyRing(ring.map(T.apply), tolerance)).filter((r) => r.length >= 3);
  const path = toPath(lines, { closed: true, decimals });
  // Città Digitali: every city a dot; names where they fit, per class of width.
  const cities = CITIES.citta.map((c) => {
    const [x, y] = T.apply(projection([c.lon, c.lat]));
    return { id: c.id, name: c.name, lat: c.lat, lon: c.lon, x: +x.toFixed(1), y: +y.toFixed(1), xPct: +((x / T.width) * 100).toFixed(2), yPct: +((y / T.height) * 100).toFixed(2) };
  });
  const outside = cities.filter((c) => c.x < 0 || c.y < 0 || c.x > T.width || c.y > T.height);
  if (outside.length) throw new Error(`italia: outside the map: ${outside.map((c) => c.id).join(', ')}`);
  const anchors = chooseNames(cities, CITIES.nomi, { width: T.width, height: T.height });
  const named = cities.filter((c) => anchors[c.id]);
  const dots = cities.filter((c) => !anchors[c.id]).sort((a, b) => a.y - b.y); // north first: southern dots paint on top
  return {
    description: 'Italia con le isole maggiori e minori (≥ ' + minIslandKm2 + ' km²): contorno chiuso, solo tratto.',
    viewBox: `0 0 ${T.width} ${T.height}`,
    width: T.width, height: T.height,
    kmPerUnit: +(1 / T.s).toFixed(4),
    subpaths: lines.length,
    path,
    bytes: Buffer.byteLength(path),
    places: named.map((p) => ({ ...p, anchor: anchors[p.id] })),
    dots: dots.map(({ id, x, y, xPct, yPct }) => ({ id, x, y, xPct, yPct })),
  };
}

/** Coast of Terra di Bari as one open line crossing the frame (no fill: the frame edges are not drawn). */
function buildPuglia({ width = 1600, minArea = 200, decimals = 1 } = {}) {
  const WINDOW = { west: 15.98, east: 17.72, north: 41.37, south: 40.66 };
  // Wide window (desktop hero) in projected km, from the geographic corners below.
  const corner = (lon, lat) => projection([lon, lat]);
  const [wx0] = corner(WINDOW.west, 41.0), [wx1] = corner(WINDOW.east, 40.8);
  const [, wy0] = corner(16.85, WINDOW.north), [, wy1] = corner(16.85, WINDOW.south);
  const T = windowTransform([wx0, wy0, wx1, wy1], width);
  const coast = mesh(topology, topology.objects.countries, (a, b) => a === b && a.id === ITALY);
  const pieces = coast.coordinates
    .map((line) => line.map((c) => T.apply(projection(c))))
    .flatMap((line) => clipPolyline(line, [0, 0, T.width, T.height]))
    .map((line) => simplifyArea(line, minArea))
    .filter((line) => line.length > 1);
  const path = toCurvePath(pieces, decimals);
  // Compact window (mobile, Home chapter 02): Terra di Bari around the three nodes, same coordinates.
  const [cx0, cy0] = T.apply(corner(16.3, 41.34));
  const [cx1, cy1] = T.apply(corner(17.42, 40.7));
  const compact = [cx0, cy0, cx1 - cx0, cy1 - cy0].map((v) => +v.toFixed(1));
  return {
    description: 'Costa della Terra di Bari, da nord-ovest (Barletta) a sud-est (oltre Monopoli): linea aperta levigata (Catmull-Rom sui vertici Natural Earth), solo tratto.',
    window: WINDOW,
    viewBox: `0 0 ${T.width} ${T.height}`,
    viewBoxCompact: compact.join(' '),
    width: T.width, height: T.height,
    kmPerUnit: +(1 / T.s).toFixed(4),
    subpaths: pieces.length,
    path,
    bytes: Buffer.byteLength(path),
    places: [
      placeEntry('gravina', T),
      placeEntry('acquaviva', T, { role: 'sede' }),
      placeEntry('monopoli', T),
    ],
    labels: [
      labelEntry('MARE ADRIATICO', 41.2, 17.12, T, 'start'),
      labelEntry('MURGIA', 41.02, 16.28, T, 'start'),
    ],
  };
}

const italia = buildItalia();
const puglia = buildPuglia();
for (const [id, m] of Object.entries({ italia, puglia })) {
  if (m.bytes > MAX_PATH_BYTES) throw new Error(`${id}: path is ${m.bytes} B, over ${MAX_PATH_BYTES} B`);
  console.log(`${id}: viewBox ${m.viewBox}, ${m.subpaths} subpaths, path ${m.bytes} B`);
}

const out = {
  source: `Natural Earth 1:10m Admin 0 – Countries (public domain), via world-atlas ${WORLD_ATLAS_VERSION} countries-10m.json`,
  generatedBy: 'scripts/generate-maps.mjs',
  projection: { ...PROJECTION, scale: EARTH_RADIUS_KM, note: 'Lambert conformal conic; one projection for every map' },
  coordinatesNote: 'Coordinate a 2 decimali da una fonte unica (riquadro Wikipedia dei comuni, 2026-09-28): docs/strategia/coordinate-luoghi.md.',
  maps: { italia, puglia },
};
await writeFile('src/data/maps.json', JSON.stringify(out, null, 2) + '\n');
console.log('src/data/maps.json written');
