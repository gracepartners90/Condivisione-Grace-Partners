// Brand assets for the ITnode site (provisional vector redraw of the logo).
//
// Outputs:
//   src/assets/brand/itnode-wordmark.svg  wordmark, letters in currentColor, ring #3C71A5
//   public/favicon.svg                    ring of the "o" on calce (optically adjusted for 16 px)
//   public/favicon.ico                    16, 32 and 48 px (PNG-compressed ICO)
//   public/apple-touch-icon.png           180 × 180
//   public/brand/logo-itnode.png          1024 × 1024, wordmark on calce (Organization.logo)
//
// Method (docs/ui/design-system.md, "Logo"): the glyphs are Montserrat (OFL 1.1) converted to
// outlines with opentype.js; sizes and positions were fitted to the client's raster logo
// (src/assets/images/logo-itnode.png, 192 × 114) by least squares on anti-aliased coverage.
// «it» is Montserrat 500, «N» «d» «e» Montserrat 700; the «o» is a ring built from two
// rotated ellipses fitted to the same raster. All geometry below is in pixels of the original.
//
// This is a PROVISIONAL redraw: replace it with the client's official vector logo when it arrives.
// Run with: node scripts/generate-brand.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import opentype from 'opentype.js';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const fontFile = (weight) => require.resolve(`@fontsource/montserrat/files/montserrat-latin-${weight}-normal.woff`);

const BLUE = '#3C71A5';
const CALCE = '#F3F1EC';
const INCHIOSTRO = '#141413';

// ─── Geometry fitted on the original raster (pixels of logo-itnode.png) ───
const BASELINE = 68.538;
const GLYPHS = [
  { char: 'i', weight: 500, size: 34.446, x: 25.814 },
  { char: 't', weight: 500, size: 34.446, x: 35.093 },
  { char: 'N', weight: 700, size: 39.474, x: 50.653 },
  { char: 'd', weight: 700, size: 39.474, x: 109.285 },
  { char: 'e', weight: 700, size: 39.474, x: 136.256 },
];
// The ring: outer ellipse minus inner ellipse, both rotated by the same angle. The hole is wider
// than tall and the outer shape taller than wide: thick above, thinner below, hairline on the right.
const RING = {
  rotate: -13.1, // degrees, SVG convention (positive = clockwise)
  outer: { cx: 96.163, cy: 56.857, rx: 11.186, ry: 12.647 },
  inner: { cx: 96.647, cy: 57.613, rx: 9.832, ry: 8.257 },
};

const SCALE = 10; // SVG units per original pixel
const round = (v) => Math.round(v * 10) / 10;

/** Closed ellipse as two SVG arcs; `reverse` flips the winding (hole). */
function ellipsePath({ cx, cy, rx, ry }, rotateDeg, reverse, dx, dy, s) {
  const t = (rotateDeg * Math.PI) / 180;
  const ax = Math.cos(t) * rx, ay = Math.sin(t) * rx;
  const p0 = [round((cx + ax) * s - dx), round((cy + ay) * s - dy)];
  const p1 = [round((cx - ax) * s - dx), round((cy - ay) * s - dy)];
  const sweep = reverse ? 0 : 1;
  const r = `${round(rx * s)} ${round(ry * s)} ${rotateDeg}`;
  return `M${p0[0]} ${p0[1]}A${r} 0 ${sweep} ${p1[0]} ${p1[1]}A${r} 0 ${sweep} ${p0[0]} ${p0[1]}Z`;
}

/** Axis-aligned extent of a rotated ellipse. */
function ellipseBox({ cx, cy, rx, ry }, rotateDeg) {
  const t = (rotateDeg * Math.PI) / 180;
  const hw = Math.sqrt((rx * Math.cos(t)) ** 2 + (ry * Math.sin(t)) ** 2);
  const hh = Math.sqrt((rx * Math.sin(t)) ** 2 + (ry * Math.cos(t)) ** 2);
  return { x1: cx - hw, y1: cy - hh, x2: cx + hw, y2: cy + hh };
}

/** Compact SVG path data: relative commands on points rounded to 0.1 units (no drift), h/v shortcuts. */
function compactPath(commands) {
  const r = (v) => Math.round(v * 10);
  const f = (n) => {
    let t = (n / 10).toFixed(1).replace(/\.0$/, '');
    if (t === '-0') t = '0';
    return t.replace(/^(-?)0\./, '$1.');
  };
  const join = (nums) => nums.reduce((out, n, i) => (i === 0 || n.startsWith('-') || (n.startsWith('.') && /\.\d*$/.test(nums[i - 1])) ? out + n : `${out} ${n}`), '');
  let d = '', cx = 0, cy = 0, sx = 0, sy = 0;
  for (const c of commands) {
    if (c.type === 'Z') { d += 'z'; cx = sx; cy = sy; continue; }
    const x = r(c.x), y = r(c.y);
    if (c.type === 'M') { d += 'M' + join([f(x), f(y)]); sx = x; sy = y; }
    else if (c.type === 'L') {
      if (x === cx && y === cy) continue; // zero-length segments emitted by opentype.js
      if (y === cy) d += 'h' + f(x - cx);
      else if (x === cx) d += 'v' + f(y - cy);
      else d += 'l' + join([f(x - cx), f(y - cy)]);
    } else if (c.type === 'Q') d += 'q' + join([f(r(c.x1) - cx), f(r(c.y1) - cy), f(x - cx), f(y - cy)]);
    else if (c.type === 'C') d += 'c' + join([f(r(c.x1) - cx), f(r(c.y1) - cy), f(r(c.x2) - cx), f(r(c.y2) - cy), f(x - cx), f(y - cy)]);
    cx = x; cy = y;
  }
  return d;
}

async function loadFont(weight) {
  const buf = await readFile(fontFile(weight));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

async function buildWordmark() {
  const fonts = { 500: await loadFont(500), 700: await loadFont(700) };
  // Glyph outlines in original pixels, then bounding box of the whole mark.
  const paths = GLYPHS.map((g) => fonts[g.weight].getPath(g.char, g.x * SCALE, BASELINE * SCALE, g.size * SCALE));
  const boxes = paths.map((p) => p.getBoundingBox());
  const ring = ellipseBox(RING.outer, RING.rotate);
  const x1 = Math.min(...boxes.map((b) => b.x1), ring.x1 * SCALE);
  const y1 = Math.min(...boxes.map((b) => b.y1), ring.y1 * SCALE);
  const x2 = Math.max(...boxes.map((b) => b.x2), ring.x2 * SCALE);
  const y2 = Math.max(...boxes.map((b) => b.y2), ring.y2 * SCALE);
  const dx = Math.floor(x1), dy = Math.floor(y1);
  const width = Math.ceil(x2) - dx, height = Math.ceil(y2) - dy;

  const letters = paths
    .map((p) => {
      p.commands.forEach((c) => {
        for (const k of ['x', 'x1', 'x2']) if (k in c) c[k] -= dx;
        for (const k of ['y', 'y1', 'y2']) if (k in c) c[k] -= dy;
      });
      return compactPath(p.commands);
    })
    .join('');
  const ringPath =
    ellipsePath(RING.outer, RING.rotate, false, dx, dy, SCALE) + ellipsePath(RING.inner, RING.rotate, true, dx, dy, SCALE);

  // No role/aria-label/title/comments here: the Wordmark component inlines this file in every page
  // and adds the accessible name. Provisional status is documented in docs/ui/design-system.md §5.1.
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">` +
    `<path fill="currentColor" d="${letters}"/>` +
    `<path fill="${BLUE}" fill-rule="evenodd" d="${ringPath}"/>` +
    `</svg>\n`;
  return { svg, width, height, ringPath, dx, dy };
}

// ─── Favicon: the ring alone, re-proportioned for 16 px ───
// At 16 px the hairline side of the original ring (≈1 px on a 25 px ring) would vanish,
// so the favicon keeps rotation and eccentricity but thickens the ring (thinnest side ≈ 1.3 px at 16 px).
function faviconSvg() {
  const size = 32;
  const c = { x: 16, y: 16 };
  const rot = RING.rotate;
  // Outer: same 0.885 width/height ratio as the logo ring, 27 units tall.
  const outer = { cx: c.x - 0.25, cy: c.y - 0.35, rx: 11.95, ry: 13.5 };
  // Inner: same ratio as the logo hole (1.19), offset right and down like the original.
  const inner = { cx: c.x + 0.35, cy: c.y + 0.75, rx: 8.6, ry: 7.2 };
  const ring = ellipsePath(outer, rot, false, 0, 0, 1) + ellipsePath(inner, rot, true, 0, 0, 1);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" fill="${CALCE}"/>` +
    `<path fill="${BLUE}" fill-rule="evenodd" d="${ring}"/>` +
    `</svg>\n`
  );
}

/** ICO container with PNG-compressed entries (supported by every current browser). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const png = (svg, size, opaque = false) => {
  const img = sharp(Buffer.from(svg), { density: 72 * 8 }).resize(size, size);
  return (opaque ? img.flatten({ background: CALCE }).removeAlpha() : img).png({ compressionLevel: 9 }).toBuffer();
};

const { svg: wordmark, width, height } = await buildWordmark();
await mkdir('src/assets/brand', { recursive: true });
await writeFile('src/assets/brand/itnode-wordmark.svg', wordmark);
console.log(`itnode-wordmark.svg  viewBox ${width} × ${height}  ${Buffer.byteLength(wordmark)} B`);

const favicon = faviconSvg();
await mkdir('public/brand', { recursive: true });
await writeFile('public/favicon.svg', favicon);
console.log(`favicon.svg  ${Buffer.byteLength(favicon)} B`);

const icoBuf = ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(favicon, size) }))));
await writeFile('public/favicon.ico', icoBuf);
console.log(`favicon.ico  16/32/48  ${icoBuf.length} B`);

// Apple touch icon: iOS rounds the corners itself, so the square is full-bleed calce;
// the ring takes about half of the height, well inside the rounded mask.
const touch = favicon.replace('viewBox="0 0 32 32"', 'viewBox="-10 -10 52 52"').replace('<rect width="32" height="32"', '<rect x="-10" y="-10" width="52" height="52"');
const touchBuf = await png(touch, 180, true);
await writeFile('public/apple-touch-icon.png', touchBuf);
console.log(`apple-touch-icon.png  180 × 180  ${touchBuf.length} B`);

// Organization logo for structured data: square, wordmark in inchiostro on calce, safe margins.
const LOGO = 1024;
const markW = Math.round(LOGO * 0.78);
const markH = Math.round((markW * height) / width);
const logoSvg = wordmark.replace('<svg ', `<svg width="${markW}" height="${markH}" color="${INCHIOSTRO}" `);
const mark = await sharp(Buffer.from(logoSvg), { density: 72 * 4 }).resize(markW, markH).png().toBuffer();
const logoBuf = await sharp({ create: { width: LOGO, height: LOGO, channels: 3, background: CALCE } })
  .composite([{ input: mark, left: Math.round((LOGO - markW) / 2), top: Math.round((LOGO - markH) / 2) }])
  .removeAlpha()
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile('public/brand/logo-itnode.png', logoBuf);
console.log(`logo-itnode.png  ${LOGO} × ${LOGO}  ${logoBuf.length} B`);
