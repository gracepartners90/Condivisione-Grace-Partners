---
titolo: P4 · verifica di fedeltà sulla build e carta della Terra di Bari inutilizzata
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-10-07
fonti: [decisione dell'utente del 2026-10-07 su P4 («sì, mettila», riferita dalla sessione principale), docs/review/2026-10-06-regola-11-verifica-build-ui-designer.md (§4, patch 6 v3), docs/creativa/direzione-visiva.md (0.12: §1.4, regole 8 e 11; §7.3), docs/ux/accessibilita.md (0.8: Appendice D), commit 3e25c42, 133e9a5 e d3eba9c, build di 3e25c42 (scratchpad/dist-link, http://127.0.0.1:4360), staging http://127.0.0.1:4321 e variante «in pubblicazione» http://127.0.0.1:4322 (build di d3eba9c), build di prova con la patch di pulizia (copia nello scratchpad, non versionata), misure Playwright 1.56 (Chromium 141) del 2026-10-07]
---

# P4 · verifica di fedeltà sulla build e carta della Terra di Bari inutilizzata

**Richiesta** (sessione principale, 2026-10-07).
- **Decisione dell'utente.** L'utente ha approvato P4 («sì, mettila»).
- **Applicazione.** P4 è nel commit 3e25c42: la mia patch 6 v3, portata a mano su 133e9a5.
- **Che cosa mi si chiede:**
  1. rifare la verifica sulla build: regola 11, sovrapposizioni da 320 a 1920 px anche con la spaziatura di WCAG 1.4.12, colori forzati, confronto con la v3 che avevo provato;
  2. aggiornare il design system;
  3. proporre se togliere o tenere la carta della Terra di Bari, che non è più usata.
- **Interruzione.** Il lavoro si è fermato per il limite di utilizzo dell'API. Al riavvio, staging (4321) e 4360 servono la build di d3eba9c, che ha P4 più una modifica a `/siii/`; la variante «in pubblicazione» (4322) è ricostruita su d3eba9c.

## In sintesi

- **Conforme: la build è la v3 che avevo provato.**
  - La mia build pulita di 3e25c42 coincide byte per byte, nelle 8 pagine, con quella della sessione principale.
  - Le due figure con carte della Home e le regole CSS della carta sono identiche byte per byte alla build della v3.
  - d3eba9c cambia solo `/siii/`: Home, `/puglia-digitale/` e `/citta-digitali/` restano identiche a 3e25c42.
- **Capitolo 02, la Puglia intera:** 321 finestre da 320 a 1920 px, con e senza 1.4.12, in due build: quella di 3e25c42 (4360, con la stessa Home dello staging di oggi) e la variante «in pubblicazione» di d3eba9c (4322).
  - Nessuna sovrapposizione, nessuno scorrimento, legenda sempre dentro la pagina.
  - Nessun nome né richiamo a meno di 6 px dal nodo di un'altra città nominata.
  - Minimo dal bordo dell'anello, la misura del generatore: 13,9 px (7,6 con 1.4.12). Dal bordo dipinto, la misura del creative-director: 15,4 px (9,1).
  - Sono gli stessi numeri della v3.
- **Capitolo 03:** invariato, minimo 8,4 px (7,2 con 1.4.12).
- **Colori forzati:** restano solo i residui già accettati (`a::after`, `chapter__rule`). Punti, nodi, anello della sede, richiami, nomi, costa e legenda sono nei colori del tema, con la palette chiara e con la scura.
- **Descrizioni della Home:**
  - capitolo 02: la L7, identica a quella di `/puglia-digitale/` (222 caratteri);
  - capitolo 03: la B (199 caratteri).
- **La carta della Terra di Bari non è più in nessuna pagina. Propongo di toglierla** (§5), con una patch provata.
  - Escono il builder e i suoi dati, con i luoghi duplicati di `site.ts`, e da `MapItaly.astro` le prop `compact` e `frame` e le coordinate sotto i nomi, che la regola 8 non ammette più su nessuna carta.
  - In pagina non cambia nulla: 12 figure su 12 identiche pixel per pixel.
  - Escono 4 regole CSS; `maps.json` perde 2,2 KB.
  - sha256 atteso: `b588d8da84d51006dae8ed96162d2783701f66dc6c5c3e856c68b70d5363a7fe`.
  - Decide il creative-director.
- **Immagini:**
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-p4/verify/cap02-390-map350.png`, `cap02-1075-map402.png`, `cap02-1440-map480.png` (capitolo 02 sulla build)
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-p4/verify/fc-cap02-pair-1440.png` (colori forzati, palette chiara e scura)

## 1. Che cosa è applicato

| Controllo | Esito |
|---|---|
| Codice di 3e25c42 e patch 6 v3 | Stesso markup del capitolo 02 e stessa descrizione. Le differenze sono dovute ai commit intermedi: l'import di `siiiHomeScreen` (d06a3e9) e l'uscita di `describeTerraDiBari` (133e9a5), che serviva solo alla carta della Terra di Bari |
| Build di 3e25c42 (`dist-link`) e mia build pulita di 3e25c42 | 8 pagine su 8 identiche byte per byte |
| Figure della Home e build della v3 (su 4b90180) | Capitolo 02 e capitolo 03 identici byte per byte; regole CSS della carta e della figura identiche (68 su 68) |
| Build di d3eba9c (4321, 4360) e build di 3e25c42 | Home, `/puglia-digitale/`, `/citta-digitali/` e `/contatti/` identiche; cambia `/siii/` |
| Variante «in pubblicazione» (4322) | Le due figure della Home hanno lo stesso markup dello staging |

## 2. Capitolo 02: regola 11 e sovrapposizioni

**Come.**
- Finestre da 320 a 1920 px ogni 5, cioè 321 per build, con una misura a vuoto prima della serie.
- Spaziatura normale e spaziatura di 1.4.12.
- Si controllano nomi e richiami contro punti, nodi, anello della sede, altri nomi e bordo della carta, poi lo scorrimento orizzontale e la legenda.
- Regola 11: distanza tra il nome o il richiamo e il nodo di ogni altra città nominata, in due modi:
  - dal bordo dell'anello di ritaglio (raggio 6,5 px, 13,5 per la sede), come il generatore;
  - dal bordo dipinto e dal riquadro dell'etichetta, come il creative-director.

| Carta | Nomi | Minimo dall'anello | Con 1.4.12 | Coppia |
|---|---|---|---|---|
| 280–300 px | 7 | 14,9 px | 13,7 | Manfredonia → Barletta |
| 300–380 px | 7 | 17,0 | 15,8 | Manfredonia → Barletta |
| 380–400 px | 7 | 23,6 | 23,6 | Bari → Monopoli |
| 400–420 px | 10 | 13,9 | 7,6 | Massafra (appeso) → Nardò, a 1075 px di finestra |
| 420–460 px | 10 | 19,0 | 12,7 | Massafra → Nardò |
| 460–480 px | 10 | 24,1 | 23,8 | Acquaviva → Gravina; con 1.4.12 Massafra → Nardò |

- **Esito**, identico nella build di 3e25c42 (la stessa Home dello staging) e nella variante «in pubblicazione»:
  - nessuna sovrapposizione, nessuno scorrimento, legenda sempre nella pagina;
  - nessuna distanza sotto i 6 px;
  - dal bordo dipinto il minimo è 15,4 px (9,1 con 1.4.12);
  - gli stessi valori della v3, misurata il 2026-10-06.
- **Nomi:**
  - carte strette (280–399,7 px): Manfredonia, Barletta, Bari, Monopoli, Acquaviva delle Fonti (appesa, su due righe), Gravina in Puglia (su due righe), Nardò;
  - carte larghe (401,6–480 px): in più Lecce, Massafra e Ostuni.
- **Misure della carta** (sessione principale): 280 × 220 px a 320, 350 × 275 a 390, 480 × 377 a 768, 382 × 300 a 1024, 480 × 377 a 1440.

## 3. Colori forzati

| Prova | Esito |
|---|---|
| D.1 (segni fatti solo di fondo), Home e `/puglia-digitale/`, palette chiara e scura, 390 e 1440 px | Solo `a::after` a 1440, residuo accettato |
| D.2 (confronto tra modo normale e colori forzati: gradienti persi, contorni trasparenti dipinti) | Solo `div.chapter__rule` sulla Home (CF2, residuo accettato); nessun contorno dipinto |
| Colori calcolati della carta del capitolo 02 | Punti, nodi, anello della sede, richiami, nomi e costa in `CanvasText`; anello di ritaglio dei punti in `Canvas`; legenda nel colore del testo. Uguale con la palette chiara e con la scura, a 390 e 1440 px |

## 4. Capitolo 03 (controllo)

La carta d'Italia non cambia: 321 finestre, con e senza 1.4.12. Nessuna sovrapposizione, minimo 8,4 px (7,2 con 1.4.12), 5 nomi sulle carte strette e 7 sulle larghe, come nella verifica del 2026-10-06.

## 5. La carta della Terra di Bari: togliere o tenere

**Stato.**
- Dal 3e25c42 nessuna pagina usa `map="puglia"`. Oggi `MapItaly` si usa solo così:
  - con `pugliaRegione` (hero di `/puglia-digitale/` e capitolo 02 della Home);
  - con `italia` (capitolo 03 della Home e `/citta-digitali/`).
- Restano senza uso:
  - in `scripts/generate-maps.mjs`: il builder `buildPuglia`, i luoghi `PLACES` (che ripetono le coordinate di `src/data/site.ts`, con l'avvertenza «tenete allineate le due liste»), `placeEntry` e `clipPolyline`;
  - in `src/data/maps.json`: la carta `puglia`;
  - in `MapItaly.astro`: le prop `compact` e `frame`, `viewBoxCompact`, due regole `.map--compact` e le coordinate sotto i nomi (`.map__coords`). Queste ultime si disegnerebbero su qualunque carta senza punti-città che mostri i nomi, contro la regola 8 della DV 0.12: nessuna coordinata sotto i nomi, su nessuna carta.

| | Pro | Contro |
|---|---|---|
| **Togliere** | Niente codice morto né coordinate doppie da tenere allineate; `MapItaly` più semplice e coerente con la regola 8; `maps.json` −2,2 KB; 4 regole CSS in meno su Home, `/puglia-digitale/` e `/citta-digitali/` (−30, −41 e −33 byte gzip) | Per riavere la carta serve la storia del repository (commit 133e9a5) |
| **Tenere** | Pronta se tornasse | Codice e dati senza uso; due elenchi di coordinate da tenere allineati; una prop che disegna coordinate contro la regola 8 |

**Proposta: toglierla.**
- Nessun progetto la richiama: il capitolo 02 ha la Puglia intera e, quando arriverà, una foto del territorio (DV §7.3).
- La patch tocca solo `scripts/generate-maps.mjs` e `src/components/ui/MapItaly.astro`; `maps.json` si rigenera.
- **Come applicare:**
  1. applicare la patch;
  2. eseguire `npm run maps`. Lo sha256 di `src/data/maps.json` deve essere `b588d8da84d51006dae8ed96162d2783701f66dc6c5c3e856c68b70d5363a7fe`;
  3. fare la build.
- **Prove** su una copia di 3e25c42, che per questi file è uguale a d3eba9c:
  - `maps.json` contiene solo `italia` e `pugliaRegione`, entrambe identiche a oggi; passa da 28 595 a 26 376 byte;
  - il generatore stampa ancora 6,7 px di minimo per la regola 11 su tutte e due le carte;
  - `astro check`: 0 errori, 0 avvisi;
  - HTML: markup identico salvo righe vuote; nel CSS mancano le 4 regole, niente altro;
  - 12 figure con carte (capitoli 02 e 03 della Home, hero di `/puglia-digitale/`, carta di `/citta-digitali/`, a 390, 1075 e 1440 px) identiche pixel per pixel;
  - `git apply --check` sul repository al commit d3eba9c: passa.
- **Fuori dalla patch:** le citazioni della carta della Terra di Bari nella direzione visiva (§1.4, regola 8 e «Dove»; §7.3) le aggiorna il creative-director, se decide di toglierla.
- **Copia:** `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-p4/diff/pulizia-terra-di-bari.patch`.

```diff
diff --git a/scripts/generate-maps.mjs b/scripts/generate-maps.mjs
index f096ef4..3b130fd 100644
--- a/scripts/generate-maps.mjs
+++ b/scripts/generate-maps.mjs
@@ -10,13 +10,15 @@
 //
 // - italia: outer rings of Italy ∪ San Marino ∪ Vatican (no enclave holes), islands ≥ 18 km² (smaller ones render as specks),
 //   Douglas–Peucker at ~1 km, closed polylines.
-// - puglia: Italian coastline clipped to the Terra di Bari window, Visvalingam–Whyatt (drops
-//   sub-kilometre notches such as the harbour moles), then a centripetal Catmull–Rom curve
-//   through the remaining Natural Earth vertices: one open line, no fill.
 // - pugliaRegione: the whole coast of Puglia, from the mouth of the Saccione (border with Molise) to
-//   the mouth of the Bradano (border with Basilicata), smoothed like `puglia`: one open line, no fill,
-//   no regional border (Natural Earth admin-0 has none, and a closed outline would read as coverage:
-//   N12). One dot per city of Puglia Digitale, names where they fit (three classes of width).
+//   the mouth of the Bradano (border with Basilicata): Visvalingam–Whyatt (drops sub-kilometre notches
+//   such as the harbour moles), then a centripetal Catmull–Rom curve through the remaining Natural
+//   Earth vertices. One open line, no fill, no regional border (Natural Earth admin-0 has none, and a
+//   closed outline would read as coverage: N12). One dot per city of Puglia Digitale, names where they
+//   fit (three classes of width).
+//
+// The Terra di Bari map (`puglia`), on the Home until 2026-10-07, is no longer generated: it is in the
+// git history (commit 133e9a5) if it is ever needed again.
 //
 // Run with: node scripts/generate-maps.mjs   (fails if a path exceeds 8 KB)
 import { readFile, writeFile } from 'node:fs/promises';
@@ -41,14 +43,6 @@ const projection = geoConicConformal()
   .translate([0, 0])
   .precision(0);
 
-// Coordinates of the places: same values and source as src/data/site.ts (visual direction §1.4,
-// docs/strategia/coordinate-luoghi.md). Keep the two lists aligned, then run `npm run maps`.
-const PLACES = {
-  acquaviva: { name: 'Acquaviva delle Fonti', lat: 40.9, lon: 16.85 },
-  gravina: { name: 'Gravina in Puglia', lat: 40.82, lon: 16.42 },
-  monopoli: { name: 'Monopoli', lat: 40.95, lon: 17.3 },
-};
-
 // Città Digitali on the «italia» map (Home chapter 03): one dot per city, names where they fit.
 // Single source: src/data/citta-digitali.json (cities from the page «Tutte le città» of
 // cittàdigitali.it; coordinates from docs/strategia/citta-digitali-elenco.md). The order of the
@@ -136,29 +130,6 @@ function simplifyRing(ring, tolerance) {
   return [...a.slice(0, -1), ...b.slice(0, -1)];
 }
 
-/** Liang–Barsky clipping of a polyline against [x0,y0,x1,y1]; returns the visible pieces. */
-function clipPolyline(points, [x0, y0, x1, y1]) {
-  const pieces = [];
-  let current = null;
-  for (let k = 0; k < points.length - 1; k++) {
-    const a = points[k], b = points[k + 1];
-    const dx = b[0] - a[0], dy = b[1] - a[1];
-    let t0 = 0, t1 = 1, visible = true;
-    for (const [p, q] of [[-dx, a[0] - x0], [dx, x1 - a[0]], [-dy, a[1] - y0], [dy, y1 - a[1]]]) {
-      if (p === 0) { if (q < 0) { visible = false; break; } continue; }
-      const r = q / p;
-      if (p < 0) { if (r > t1) { visible = false; break; } if (r > t0) t0 = r; }
-      else { if (r < t0) { visible = false; break; } if (r < t1) t1 = r; }
-    }
-    if (!visible) { current = null; continue; }
-    const pa = [a[0] + t0 * dx, a[1] + t0 * dy], pb = [a[0] + t1 * dx, a[1] + t1 * dy];
-    if (!current || t0 > 0) { current = [pa]; pieces.push(current); }
-    current.push(pb);
-    if (t1 < 1) current = null;
-  }
-  return pieces.filter((p) => p.length > 1);
-}
-
 // ─── Serialisation: absolute start, then relative deltas computed on rounded points (no drift) ───
 
 function fmt(v, decimals) {
@@ -439,17 +410,6 @@ function windowTransform([kx0, ky0, kx1, ky1], width) {
   return { s, width, height, apply: ([x, y]) => [(x - kx0) * s, (y - ky0) * s] };
 }
 
-function placeEntry(id, T, extra = {}) {
-  const p = PLACES[id];
-  const [x, y] = T.apply(projection([p.lon, p.lat]));
-  return {
-    id, name: p.name, lat: p.lat, lon: p.lon,
-    x: +x.toFixed(1), y: +y.toFixed(1),
-    xPct: +((x / T.width) * 100).toFixed(2), yPct: +((y / T.height) * 100).toFixed(2),
-    ...extra,
-  };
-}
-
 function labelEntry(text, lat, lon, T, anchor) {
   const [x, y] = T.apply(projection([lon, lat]));
   return { text, lat, lon, anchor, x: +x.toFixed(1), y: +y.toFixed(1), xPct: +((x / T.width) * 100).toFixed(2), yPct: +((y / T.height) * 100).toFixed(2) };
@@ -492,47 +452,6 @@ function buildItalia({ width = 1000, minIslandKm2 = 18, tolerance = 1.1, decimal
   };
 }
 
-/** Coast of Terra di Bari as one open line crossing the frame (no fill: the frame edges are not drawn). */
-function buildPuglia({ width = 1600, minArea = 200, decimals = 1 } = {}) {
-  const WINDOW = { west: 15.98, east: 17.72, north: 41.37, south: 40.66 };
-  // Wide window (desktop hero) in projected km, from the geographic corners below.
-  const corner = (lon, lat) => projection([lon, lat]);
-  const [wx0] = corner(WINDOW.west, 41.0), [wx1] = corner(WINDOW.east, 40.8);
-  const [, wy0] = corner(16.85, WINDOW.north), [, wy1] = corner(16.85, WINDOW.south);
-  const T = windowTransform([wx0, wy0, wx1, wy1], width);
-  const coast = mesh(topology, topology.objects.countries, (a, b) => a === b && a.id === ITALY);
-  const pieces = coast.coordinates
-    .map((line) => line.map((c) => T.apply(projection(c))))
-    .flatMap((line) => clipPolyline(line, [0, 0, T.width, T.height]))
-    .map((line) => simplifyArea(line, minArea))
-    .filter((line) => line.length > 1);
-  const path = toCurvePath(pieces, decimals);
-  // Compact window (mobile, Home chapter 02): Terra di Bari around the three nodes, same coordinates.
-  const [cx0, cy0] = T.apply(corner(16.3, 41.34));
-  const [cx1, cy1] = T.apply(corner(17.42, 40.7));
-  const compact = [cx0, cy0, cx1 - cx0, cy1 - cy0].map((v) => +v.toFixed(1));
-  return {
-    description: 'Costa della Terra di Bari, da nord-ovest (Barletta) a sud-est (oltre Monopoli): linea aperta levigata (Catmull-Rom sui vertici Natural Earth), solo tratto.',
-    window: WINDOW,
-    viewBox: `0 0 ${T.width} ${T.height}`,
-    viewBoxCompact: compact.join(' '),
-    width: T.width, height: T.height,
-    kmPerUnit: +(1 / T.s).toFixed(4),
-    subpaths: pieces.length,
-    path,
-    bytes: Buffer.byteLength(path),
-    places: [
-      placeEntry('gravina', T),
-      placeEntry('acquaviva', T, { role: 'sede' }),
-      placeEntry('monopoli', T),
-    ],
-    labels: [
-      labelEntry('MARE ADRIATICO', 41.2, 17.12, T, 'start'),
-      labelEntry('MURGIA', 41.02, 16.28, T, 'start'),
-    ],
-  };
-}
-
 // Ends of the coast of Puglia, where the line starts and stops (the Natural Earth vertex nearest each):
 // - north, mouth of the Saccione, border with Molise (molisecoast.com, «Foce Saccione – Bonifica
 //   Ramitelli», read 2026-10-06; the source gives no coordinates: point read on the Natural Earth coast);
@@ -579,7 +498,7 @@ function buildPugliaRegione({ width = 1000, minAreaKm2 = 1.65, decimals = 1, pad
   const [bx0, by0, bx1, by1] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
   const padKm = (bx1 - bx0) * pad;
   const T = windowTransform([bx0 - padKm, by0 - padKm, bx1 + padKm, by1 + padKm], width);
-  const minArea = minAreaKm2 * T.s * T.s; // same smoothing as the Terra di Bari coast, in km²
+  const minArea = minAreaKm2 * T.s * T.s; // Visvalingam threshold: km² → viewBox units²
   const line = simplifyArea(projected.map(T.apply), minArea);
   const path = toCurvePath([line], decimals);
   const view = { width: T.width, height: T.height };
@@ -614,9 +533,8 @@ function buildPugliaRegione({ width = 1000, minAreaKm2 = 1.65, decimals = 1, pad
 }
 
 const italia = buildItalia();
-const puglia = buildPuglia();
 const pugliaRegione = buildPugliaRegione();
-for (const [id, m] of Object.entries({ italia, puglia, pugliaRegione })) {
+for (const [id, m] of Object.entries({ italia, pugliaRegione })) {
   if (m.bytes > MAX_PATH_BYTES) throw new Error(`${id}: path is ${m.bytes} B, over ${MAX_PATH_BYTES} B`);
   console.log(`${id}: viewBox ${m.viewBox}, ${m.subpaths} subpaths, path ${m.bytes} B`);
 }
@@ -626,7 +544,7 @@ const out = {
   generatedBy: 'scripts/generate-maps.mjs',
   projection: { ...PROJECTION, scale: EARTH_RADIUS_KM, note: 'Lambert conformal conic; one projection for every map' },
   coordinatesNote: 'Coordinate a 2 decimali da una fonte unica (riquadro Wikipedia dei comuni, 2026-09-28): docs/strategia/coordinate-luoghi.md.',
-  maps: { italia, puglia, pugliaRegione },
+  maps: { italia, pugliaRegione },
 };
 await writeFile('src/data/maps.json', JSON.stringify(out, null, 2) + '\n');
 console.log('src/data/maps.json written');
diff --git a/src/components/ui/MapItaly.astro b/src/components/ui/MapItaly.astro
index 9775bbc..866e8bb 100644
--- a/src/components/ui/MapItaly.astro
+++ b/src/components/ui/MapItaly.astro
@@ -7,8 +7,6 @@
  * in the text beside it) and aria-hidden; with `label` it is an image with that text alternative
  * (Home chapter 03, visual direction §1.4).
  */
-import { formatCoords } from '../../lib/geo';
-
 type MapPlace = { id: string; name: string; lat: number; lon: number };
 /** Position of a name per class of map width (scripts/generate-maps.mjs); 'none' where it is not shown. */
 type LabelAnchor = { wide: string; narrow: string; hero?: string };
@@ -28,7 +26,6 @@ type MapDot = { id: string; x: number; y: number };
 type MapLabel = { text: string; x: number; y: number; anchor?: 'start' | 'middle' | 'end' };
 type MapData = {
   viewBox: string;
-  viewBoxCompact?: string;
   path: string;
   places: PlacePoint[] | Record<string, { x: number; y: number }>;
   labels?: MapLabel[];
@@ -37,7 +34,7 @@ type MapData = {
 };
 
 interface Props {
-  map: 'italia' | 'puglia' | 'pugliaRegione';
+  map: 'italia' | 'pugliaRegione';
   /** Named places; with `cities` they come from maps.json. */
   places?: MapPlace[];
   /**
@@ -55,12 +52,8 @@ interface Props {
    * under 25rem.
    */
   nameClass?: 'hero';
-  /** Puglia: crop to the stretch of coast around the places. */
-  compact?: boolean;
   /** Id of the place drawn as the office (ring around the node). */
   home?: string;
-  /** Custom viewBox (a crop of the map's own coordinates), e.g. a wide band of coast. */
-  frame?: string;
   /**
    * Text alternative (WCAG 1.1.1). Give it when the map shows something the text beside it does not
    * say (chapter 03: where the cities of Città Digitali are). Without it the map is decorative.
@@ -69,16 +62,15 @@ interface Props {
   class?: string;
 }
 
-const { map, places = [], cities = false, nameClass, showLabels = true, compact = false, home, frame, label, class: className } = Astro.props;
+const { map, places = [], cities = false, nameClass, showLabels = true, home, label, class: className } = Astro.props;
 
 const files = import.meta.glob<{ default: Record<string, unknown> }>('../../data/maps.json', { eager: true });
 const raw = Object.values(files)[0]?.default as { maps?: Record<string, MapData> } & Record<string, MapData> | undefined;
 const data: MapData | undefined = raw?.maps?.[map] ?? raw?.[map];
 
-// Fallback frame: bounding boxes of the two maps.
+// Fallback frame: bounding boxes of the maps.
 const BOUNDS = {
   italia: { minLon: 6.5, maxLon: 18.6, minLat: 36.5, maxLat: 47.2 },
-  puglia: { minLon: 15.8, maxLon: 17.8, minLat: 40.4, maxLat: 41.35 },
   pugliaRegione: { minLon: 14.9, maxLon: 18.7, minLat: 39.6, maxLat: 42.1 },
 }[map];
 const W = 400;
@@ -89,7 +81,7 @@ const project = (lat: number, lon: number) => ({
   y: ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H,
 });
 
-const viewBox = (data && frame) || (compact && data?.viewBoxCompact) || data?.viewBox || `0 0 ${W} ${H}`;
+const viewBox = data?.viewBox || `0 0 ${W} ${H}`;
 const [vbX, vbY, vbW, vbH] = viewBox.split(/\s+/).map(Number);
 const pct = (x: number, y: number) => ({ left: ((x - vbX) / vbW) * 100, top: ((y - vbY) / vbH) * 100 });
 
@@ -146,7 +138,7 @@ if (!data) {
 }
 ---
 
-<div class:list={['map', `map--${map}`, { 'map--fallback': !data, 'map--compact': compact || Boolean(frame), 'map--cities': Boolean(cities) }, className]} style={`aspect-ratio: ${vbW} / ${vbH}`}
+<div class:list={['map', `map--${map}`, { 'map--fallback': !data, 'map--cities': Boolean(cities) }, className]} style={`aspect-ratio: ${vbW} / ${vbH}`}
   {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
 >
   {/* Drawn text is aria-hidden too: with `label` the description says it (children of role="img" are
@@ -183,7 +175,6 @@ if (!data) {
             ) : (
               <span>{p.name}</span>
             )}
-            {!cities && <span class="map__coords">{formatCoords(p)}</span>}
           </span>
         )}
       </span>
@@ -290,8 +281,8 @@ if (!data) {
     white-space: normal;
   }
 
-  /* Wide maps (the Puglia Digitale hero from ~800 px): place names on one line, as on a printed
-     map at this scale (N8). Small maps keep their two-line names. */
+  /* Maps of at least 45rem: place names on one line, as on a printed map at this scale (N8). Small
+     maps keep their two-line names. Maps with city dots set their own lines (below). */
   @container (min-width: 45rem) {
     .map__label > span:first-child {
       max-width: none;
@@ -382,7 +373,7 @@ if (!data) {
     display: none;
   }
 
-  /* Narrow maps (up to 25rem, like the coordinates below): the narrow anchor where it differs; a
+  /* Narrow maps (up to 25rem): the narrow anchor where it differs; a
      city without room for its name there is drawn as a dot. */
   @container (max-width: 25rem) {
     .map__label[data-anchor-narrow] {
@@ -426,28 +417,6 @@ if (!data) {
     .map--pugliaRegione .map__area { display: none; }
   }
 
-  .map__coords {
-    color: var(--fg-2);
-  }
-
-  /* Small maps (phones): names only, the coordinates would collide. */
-  @container (max-width: 25rem) {
-    .map__coords {
-      display: none;
-    }
-  }
-
-  /* The compact frame (Home chapter 02, at most 30rem): names only at every width. With the
-     coordinates, those of Monopoli would cover the office ring and the name of Acquaviva. */
-  .map--compact .map__coords {
-    display: none;
-  }
-
-  /* The compact frame crops the coastline: clip it to the frame. */
-  .map--compact .map__svg {
-    overflow: clip;
-  }
-
   /* Windows contrast themes (forced colors): the system paints every background in its canvas
      colour, so nodes, dots and leaders would vanish, and dots would cut gaps in the coastline. Draw
      them in the text colour of the theme; the knockout ring takes the canvas colour. */
```

## 6. Prove

| Prova | Esito |
|---|---|
| Identità delle build | Mia build di 3e25c42 = `dist-link`; figure e CSS della carta = v3; d3eba9c = 3e25c42 per Home, `/puglia-digitale/`, `/citta-digitali/` e `/contatti/` |
| Capitolo 02, sovrapposizioni e regola 11 | Nessun problema in 321 finestre, con e senza 1.4.12, nella build di 3e25c42 (la stessa Home dello staging) e nella variante «in pubblicazione»; minimo 13,9 px (7,6) dall'anello, 15,4 (9,1) dal bordo dipinto |
| Capitolo 03 | Invariato: minimo 8,4 px (7,2) |
| Colori forzati | Solo i residui accettati; segni della carta nei colori del tema con le due palette |
| Patch di pulizia | 0 errori; `maps.json` atteso; 12 figure su 12 identiche; 4 regole CSS in meno |
| Pesi (zlib 9, KB = 1024 byte) | Home 29,0 KB gzip su 40 (23,5 con brotli); `/puglia-digitale/` 26,2 su 35; `/citta-digitali/` 28,3 su 35 |

## Verdetto di dominio (UI)

**Conforme.**
- P4 è applicata come provata.
- La regola 11 e l'assenza di sovrapposizioni valgono sulle due carte della Home, anche con 1.4.12, nelle due build.
- I colori forzati non perdono nessun segno.
- La pulizia della carta della Terra di Bari è pronta e non cambia nulla in pagina: decide il creative-director.

## Ipotesi da validare

- **Browser.** Misure in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`, come per le altre carte.

## Domande aperte

- **creative-director:** togliere la carta della Terra di Bari con la patch del §5, oppure tenerla.

## Decisioni richieste

1. **creative-director:** la pulizia del §5.
2. **Sessione principale**, se passa:
   - applicare la patch;
   - eseguire `npm run maps` e controllare lo sha256;
   - fare la build.
   - Dopo, aggiorno il design system (§2.4, §5.4) e ricontrollo le figure sullo staging.
