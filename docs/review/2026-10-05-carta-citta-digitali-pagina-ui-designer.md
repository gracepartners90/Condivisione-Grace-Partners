---
titolo: Carta di /citta-digitali/ · le città di Città Digitali con il punto-città
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-10-05
fonti: [docs/creativa/direzione-visiva.md (0.6: §1.4 «Il punto-città», §7.6 sezione 3), docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md (§3.1, §3.2), docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (L1, L4), docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md, docs/strategia/citta-digitali-elenco.md (0.2, §1, §4), docs/contenuti/copy-deck/citta-digitali.md (1.2, sezione 2), docs/ui/design-system.md (0.6: §1.5, §2.4, §3.8, §5.4), docs/performance/budget.md (§3), src/components/ui/MapItaly.astro, src/components/sections/LocationShowcase.astro, src/pages/citta-digitali.astro, src/pages/index.astro, src/data/maps.json, src/data/citta-digitali.json, staging http://localhost:4321 (dist con il commit ce276be), build di prova con le modifiche (copia nello scratchpad, non versionata), misure Playwright 1.56 (Chromium 141) e axe-core 4.13 del 2026-10-05]
---

# Carta di `/citta-digitali/` · «L'Italia in un unico portale» con il punto-città

**Richiesta.** La direzione visiva 0.6 (§7.6, sezione 3, punto 2) chiede che prima del go-live la carta della sezione passi al punto-città, «perché la pagina del progetto non può mostrare meno città della Home».
- Le tre città delle linee guida restano in evidenza come nodi, allineate alla latitudine, con coordinate e «Esplora ↗».
- Finché l'elenco in testo non le sta accanto, la carta ha una descrizione come quella della Home.
- Decide il creative-director; applica la sessione principale.

**Oggi.** La carta mostra 3 nodi ed è `aria-hidden`, perché le tre città sono nominate dalle schede accanto. Dal commit 0a61546 la Home ne mostra 45.

## In sintesi

- **Tutte le 45 città, come nella Home.** Le tre città delle schede restano nodi (Ø 10); le altre 42 sono punti-città senza nome (Ø 5), con lo stesso anello nel colore della superficie. Sulla carta non c'è nessun nome: le tre città le nominano le schede.
- **Legenda L1 sotto la carta**, in una `<figcaption>`, come nella Home: «Ogni punto è una città di Città Digitali». Sta su una riga da 360 px.
- **Descrizione accessibile, finché l'elenco non sta accanto.**
  - La carta diventa un'immagine con un nome (`role="img"`), costruito dagli stessi dati.
  - Il testo è la forma L4 di copywriter-brand con i tre nomi: 184 caratteri.
  - Quando arriva l'elenco in testo si toglie una riga di codice, e carta e legenda tornano `aria-hidden`.
- **Da 1024 px in su non si sposta nulla.** Schede e nodi restano dove sono.
  - Da 1280 px la legenda esce dal flusso, così non sposta le città allineate alla latitudine.
  - Sotto 1024 px (carta in alto, città in pila) le schede scendono di 33 px, l'altezza della legenda.
- **Componente.**
  - Nuovo modo `cities="dots"` di `MapItaly`.
  - Nuova prop `cityDots` di `LocationShowcase`.
  - La funzione della descrizione passa in `src/lib/citta-digitali.ts`, condivisa con la Home. L'HTML della Home resta identico byte per byte.
- **Prove.**
  - Nessuna violazione axe.
  - Nessuno scorrimento orizzontale da 320 a 1920 px.
  - La legenda non si sovrappone mai, anche con la spaziatura di WCAG 1.4.12.
  - Peso: +0,65 KB gzip, cioè 28,6 KB su 35.
  - La patch si applica pulita al repository.
- **A parte (P6), su tutte le carte.** Nei temi a contrasto di Windows (colori forzati) nodi, punti e richiami spariscono: i nomi restano senza luogo, e i punti tagliano la costa.
  - Una patch CSS separata li ridisegna nel colore del testo del tema.
  - Nel modo normale i pixel non cambiano.
  - Decide ux-designer.

## 1. Il disegno

### P1 · Punti e nodi

- **Dove.** Sezione «L'Italia in un unico portale» (`#portale`), superficie `notte`.
  - `LocationShowcase.astro`, variante `italy`.
  - La carta `italia` di `MapItaly.astro`.
- **Problema.** La pagina del progetto mostra 3 città; la Home, dal commit 0a61546, 45.
- **Motivazione.**
  - DV §7.6: la pagina del progetto non può mostrare meno città della Home.
  - DV §1.4: un punto per ogni luogo reale dell'elenco, nella sua posizione vera. I punti si impilano come monete e si dipingono da nord a sud, poi i nodi.
  - N12: la carta resta solo contorno. I punti mostrano la distribuzione vera, densa in Puglia e rada altrove.
- **Proposta.**
  - **42 punti-città:** tutte le città di `maps.json`, cioè le 45 di `citta-digitali.json`, tranne le tre delle schede.
    - Ø 5 px in `--place` (`arancio-segnale` su `notte`, 6,42:1), con l'anello di 1,5 px in `notte`.
    - Nessuno stato: niente hover né focus (DV §1.4).
  - **3 nodi:** Varese, Altamura e Caltanissetta restano Ø 10, con l'anello dei nodi delle carte con i punti (classe `map--cities`).
    - Si dipingono dopo i punti, quindi sopra.
    - Si accendono dalle loro schede, come oggi: con hover o focus sulla scheda il nodo cresce ×1,5 in 250 ms.
  - **Nessun nome sulla carta.** Resta `showLabels={false}`, come oggi.
    - Le schede accanto, alla stessa latitudine dei nodi, sono già i nomi.
    - I sei nomi in più della Home (Manfredonia, Itri, Bari, Massafra, Cosenza, Caltagirone) qui farebbero concorrenza alle schede.
    - Su questa pagina arriverà l'elenco completo (P5).
  - **Coordinate.** Restano nelle schede, sotto il nome della città (riga del dispositivo), non sulla carta.
- **Cosa si vede** (screenshot a 390, 1024 e 1440 px).
  - Il gruppo pugliese si legge come tanti luoghi, non come una macchia, come nella Home.
  - Varese e Caltanissetta sono isolati.
  - Altamura sta dentro il gruppo della Murgia e si distingue per la misura (Ø 10 contro 5). L'hover o il focus sulla sua scheda lo porta a 15 px.

### P2 · Legenda

- **Dove.** Sotto la carta: `<figure class="places__atlas">` con `<figcaption class="places__atlas-note t-label">`. Sono le classi della Home (`worlds__atlas`, `worlds__atlas-note`), con il prefisso della sezione.
- **Problema.** 42 punti senza nome hanno bisogno di una chiave. La Home ce l'ha.
- **Proposta.**
  - **Testo L1:** «Ogni punto è una città di Città Digitali», con gli spazi unificatori in «di Città Digitali».
    - Stile: `label` mono, `--fg-2` (8,43:1 su `notte`, 13 px).
    - Posizione: 16 px sotto la carta (`--space-s`).
  - **Da 1280 px (80em) la legenda esce dal flusso** (`position: absolute; top: 100%`).
    - Le città sono posizionate in percentuale dell'altezza della riga della carta. Con la legenda nel flusso la riga crescerebbe di 33 px, e le città scenderebbero rispetto ai loro nodi.
    - Fuori dal flusso, la legenda occupa lo spazio che c'è già sotto la carta: restano almeno 195 px fino alla fine della sezione.
  - **Nessun link nella legenda.** Il link alla fonte, «Tutte le città sul portale ↗», sta già nella colonna del testo (DV §1.4).
  - **Nessun numero.** Valgono le condizioni di brand-strategist (`citta-digitali-elenco.md` §4).

### P3 · Descrizione accessibile, finché l'elenco non sta accanto

- **Dove.**
  - `MapItaly.astro`: prop `label`, già esistente.
  - `LocationShowcase.astro`: `cityDots.label`.
  - `src/pages/citta-digitali.astro`.
- **Problema.**
  - Con i punti, la carta mostra più di quanto dice il testo accanto: 42 città senza nome.
  - Per la regola di ux-designer (review della mappa, §3.1) non può più restare `aria-hidden`: dove stanno le città arriverebbe solo a chi vede (WCAG 1.1.1, 1.3.1).
- **Proposta.**
  - **La carta diventa `role="img"`, con questo `aria-label`:**
    > Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Altamura e Caltanissetta.
  - **Da dove viene il testo.** È la forma L4 di copywriter-brand con i tre nomi obbligatori. Copywriter-brand l'ha già scritta per il caso in cui al go-live restino solo quei tre (review della legenda, L4: 184 caratteri, Gulpease 69).
  - **«Tra queste» ripete i tre nomi del paragrafo e delle schede.** È voluto: la carta mette in evidenza tre città, quindi un'alternativa equivalente le nomina (1.1.1). Senza i nomi la descrizione sarebbe più corta, ma non equivalente.
  - **Una sola funzione per Home e pagina** (`describeCittaDigitali`).
    - Regioni e quota vengono da `citta-digitali.json`: se l'elenco cambia, le due descrizioni cambiano insieme.
    - Così la descrizione segue i dati da sola, come chiede la DV §1.4 («Veridicità»).
  - **L'`<svg>` della costa resta `aria-hidden`,** come già in `MapItaly`.
  - **Albero di accessibilità (misurato),** con la stessa struttura del capitolo 03 della Home:
    - la figura, con il nome «Ogni punto è una città di Città Digitali»;
    - l'immagine, con la descrizione;
    - il testo della legenda;
    - la lista delle tre città (H3 e link).
  - **Con l'elenco in testo accanto (P5) si toglie `label`.**
    - Il componente rende `aria-hidden` carta e legenda insieme, perché la legenda spiega solo ciò che si vede. Letta da sola, parlerebbe di punti che lo screen reader non incontra.
    - Provato: figura e carta `aria-hidden`, 42 punti disegnati, nessuna violazione axe.

### P4 · Componente

- **`MapItaly.astro`:** `cities?: boolean | 'dots'`.
  - **`true` (Home):** invariato.
  - **`'dots'` (`/citta-digitali/`):**
    - i nodi sono i `places` passati dalla pagina, cioè le tre schede;
    - tutte le altre città di `maps.json` (`places` più `dots`) diventano punti, da nord a sud;
    - nessun ancoraggio di nome.
  - **Perché un modo e non un componente nuovo.** Una sola carta e una sola fonte: il modo `'dots'` legge le posizioni già proiettate in `maps.json`. Non serve rigenerare la carta, e `maps.json` non cambia.
  - **Regge i cambi dei nomi della Home.**
    - Se cambia la scelta dei nomi (`nomi` nel file dati), una città passa da `places` a `dots` in `maps.json`.
    - Il modo `'dots'` legge le due liste insieme, quindi `/citta-digitali/` non cambia.
    - Lo stesso vale per la ricerca della latitudine in `LocationShowcase`, che ora legge anche `dots`.
- **`LocationShowcase.astro`:** `cityDots?: { legend: string; label?: string }`.
  - **Con `cityDots`:** figura con la legenda, carta in modo `'dots'`, `label` passato alla carta. Senza `label` la figura è `aria-hidden`.
  - **Senza `cityDots`:** il markup resta quello di oggi.
  - **CSS:** due regole, più due dentro `@media (min-width: 80em)`.
  - **Script dell'accensione:** invariato; ne cambia solo il commento.
- **`src/lib/citta-digitali.ts` (nuovo).** La funzione della descrizione esce da `index.astro` senza cambiare il testo. La Home le passa i 9 nomi della carta larga, la pagina le sue 3 città.
- **`src/pages/citta-digitali.astro`:** la prop `cityDots`, con legenda e descrizione.
- **`src/pages/index.astro`:** usa la funzione condivisa. L'HTML della Home è identico byte per byte.
- **Performance.**
  - Nessun JavaScript in più. HTML e CSS sono statici.
  - `/citta-digitali/`: +4,4 KB di HTML, +0,65 KB con gzip (+0,51 KB con brotli), cioè 28,6 KB gzip su 35 (budget §3, T2).
  - `/puglia-digitale/` riceve solo il CSS della sezione: +0,04 KB gzip.

### P5 · Quando arriva l'elenco in testo

Fonti: DV §1.4 («Elenco in testo») e §7.6, punto 3. Il disegno della sezione per un elenco lungo si fa con ux-designer quando il testo della pagina del cliente è confermato: non fa parte di questa proposta.
- **Carta.** Si toglie `label` da `cityDots`, e carta e legenda tornano `aria-hidden`. Punti, nodi e legenda restano visibili.
- **Elenco.** Per regione da nord a sud, dallo stesso file dati. Il numero, con la data, va nell'elenco, alle condizioni di brand-strategist.
- **Schede.** Le tre città delle linee guida restano schede e nodi in evidenza.
- **Punti.** Restano senza stati anche con l'elenco: accenderli dall'elenco li renderebbe hotspot (DV §1.4: non sono interattivi). Se servisse, lo decide il creative-director con il disegno della sezione.

### P6 · [IMPORTANTE] Colori forzati: su tutte le carte nodi, punti e richiami spariscono

- **Dove.** `src/components/ui/MapItaly.astro`, `<style>`. Riguarda tutte le carte: Home (capitoli 02 e 03), hero di `/puglia-digitale/` e `/citta-digitali/`.
- **Problema.**
  - Nodi, punti e richiami sono elementi con un colore di fondo. Nei colori forzati (temi a contrasto di Windows) il sistema dipinge i fondi nel colore della tela (`Canvas`).
  - Nell'emulazione di Chromium i fondi prendono il colore della pagina, quindi:
    - i nomi restano senza il loro luogo;
    - i punti aprono buchi bianchi nella costa della Puglia: oggi nella Home, con P1 anche su `/citta-digitali/`;
    - resta solo l'anello della sede, che è un bordo.
- **Motivazione.**
  - WCAG 2.2 AA non chiede di supportare i colori forzati: non è una soglia, e per questo la priorità non è `[BLOCCANTE]`.
  - I temi a contrasto sono usati da persone ipovedenti su Windows. Una carta che perde i suoi luoghi perde il suo dato.
  - Le alternative in testo (nomi, schede, descrizione) restano.
- **Proposta.** Un blocco `@media (forced-colors: active)` in fondo agli stili di `MapItaly`.
  - Nodi, punti e richiami nel colore del testo del tema (`CanvasText`), l'anello nel colore della tela.
  - L'anello della sede in `CanvasText`.
- **Provato.**
  - Colori forzati emulati in Chromium (Playwright, `forcedColors: 'active'`) su tre carte, a 390 e 1440 px: capitolo 03 della Home, hero di Puglia Digitale, `/citta-digitali/` con P1. Con il blocco si vedono nodi, punti, richiami e anello della sede.
  - Nel modo normale gli stessi 6 screenshot sono identici pixel per pixel.
  - Peso: +0,06–0,07 KB gzip per ogni pagina con una carta.
- **Si applica da sola o insieme a P1–P4** (patch 6).
- **Non verificato.** Windows con un tema a contrasto `[DA VERIFICARE]`. Gli altri dispositivi (Orizzonte, porte) non li ho controllati nei colori forzati: sono fuori da questo incarico.

## 2. Snippet

Le patch 1–5 (P1–P4), concatenate nell'ordine, sono un'unica patch per `git apply`. La patch 6 (P6) è indipendente.
- Le ho verificate con `git apply --check` sul repository al commit 1182551, sia separate sia insieme.
- Applicate in sequenza, danno file identici a quelli della copia provata.

#### 1 · `src/components/ui/MapItaly.astro`

```diff
diff --git a/src/components/ui/MapItaly.astro b/src/components/ui/MapItaly.astro
index e8d394d..5380a56 100644
--- a/src/components/ui/MapItaly.astro
+++ b/src/components/ui/MapItaly.astro
@@ -29,10 +29,13 @@ interface Props {
   /** Named places; with `cities` they come from maps.json. */
   places?: MapPlace[];
   /**
-   * Città Digitali (Home chapter 03): every city of src/data/citta-digitali.json, one dot each,
-   * names where they fit at every width (anchors computed by scripts/generate-maps.mjs). No coordinates.
+   * Città Digitali: every city of src/data/citta-digitali.json, one dot each (visual direction §1.4).
+   * - `true` (Home chapter 03): names where they fit at every width (anchors computed by
+   *   scripts/generate-maps.mjs). No coordinates.
+   * - `'dots'` (/citta-digitali/): the cities in `places` are the nodes, named by the cards beside the
+   *   map; every other city is a dot. Use with `showLabels={false}`.
    */
-  cities?: boolean;
+  cities?: boolean | 'dots';
   showLabels?: boolean;
   /** Puglia: crop to the stretch of coast around the places. */
   compact?: boolean;
@@ -78,17 +81,27 @@ const lookup = (id: string) => {
   return named ?? data?.dots?.find((d) => d.id === id);
 };
 
+// Places stored in maps.json for this map (Città Digitali: the cities named on the Home map).
+const mapPlaces = Array.isArray(data?.places) ? data.places : [];
 const placeList: MapPlace[] =
-  cities && Array.isArray(data?.places) ? data.places.map((p) => ({ id: p.id, name: p.name ?? p.id, lat: p.lat ?? 0, lon: p.lon ?? 0 })) : places;
+  cities === true && mapPlaces.length ? mapPlaces.map((p) => ({ id: p.id, name: p.name ?? p.id, lat: p.lat ?? 0, lon: p.lon ?? 0 })) : places;
 const points = placeList.map((p) => {
   const pt: Partial<PlacePoint> & { x: number; y: number } = lookup(p.id) ?? project(p.lat, p.lon);
   const pos = pct(pt.x, pt.y);
   // Names placed at build time (Città Digitali) carry an anchor per class of width; without one,
   // labels of places in the eastern part of the map hang to the left, so they stay inside it.
-  const anchor = cities ? pt.anchor : undefined;
+  const anchor = cities === true ? pt.anchor : undefined;
   return { ...p, ...pos, anchor, isHome: p.id === home, labelLeft: !anchor && pos.left > 55 };
 });
-const dots = cities ? (data?.dots ?? []).map((d) => pct(d.x, d.y)) : [];
+// Dots: with `cities` the unnamed cities; with `cities="dots"` every city that is not a node here.
+const nodeIds = new Set(placeList.map((p) => p.id));
+const dotPoints =
+  cities === 'dots'
+    ? [...mapPlaces, ...(data?.dots ?? [])].filter((c) => !nodeIds.has(c.id)).sort((a, b) => a.y - b.y)
+    : cities
+      ? (data?.dots ?? [])
+      : [];
+const dots = dotPoints.map((d) => pct(d.x, d.y));
 const labels = (data?.labels ?? []).map((l) => ({ ...l, ...pct(l.x, l.y) }));
 
 // Graticule every degree (fallback only).
@@ -105,7 +118,7 @@ if (!data) {
 }
 ---
 
-<div class:list={['map', `map--${map}`, { 'map--fallback': !data, 'map--compact': compact || Boolean(frame), 'map--cities': cities }, className]} style={`aspect-ratio: ${vbW} / ${vbH}`}
+<div class:list={['map', `map--${map}`, { 'map--fallback': !data, 'map--compact': compact || Boolean(frame), 'map--cities': Boolean(cities) }, className]} style={`aspect-ratio: ${vbW} / ${vbH}`}
   {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
 >
   <svg class="map__svg" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
@@ -255,9 +268,9 @@ if (!data) {
     text-align: right;
   }
 
-  /* Città Digitali (Home chapter 03): one dot per city without a name. Half the named node, same
-     colour: a place, not a hotspot. A knockout ring in the surface colour keeps every dot distinct
-     where they crowd and where they cross the coastline (a stroke, not a shadow: DS §1.5). */
+  /* Città Digitali (Home chapter 03, /citta-digitali/): one dot per city without a name. Half the
+     named node, same colour: a place, not a hotspot. A knockout ring in the surface colour keeps every
+     dot distinct where they crowd and where they cross the coastline (a stroke, not a shadow: DS §1.5). */
   .map__dot {
     position: absolute;
     width: 5px;
```

#### 2 · `src/lib/citta-digitali.ts` (nuovo)

```diff
diff --git a/src/lib/citta-digitali.ts b/src/lib/citta-digitali.ts
new file mode 100644
index 0000000..3cdaa18
--- /dev/null
+++ b/src/lib/citta-digitali.ts
@@ -0,0 +1,25 @@
+/**
+ * Text alternative of a map with the cities of Città Digitali (WCAG 1.1.1, 1.3.1), built from the same
+ * data as the dots: regions north → south, the region with most cities, then the cities the map
+ * names or highlights. No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
+ * Wording: copywriter-brand (L4), «Tra queste» because a map may name only some of the cities.
+ */
+import cittaDigitali from '../data/citta-digitali.json';
+
+const REGIONS = ['Lombardia', 'Lazio', 'Campania', 'Puglia', 'Calabria', 'Sicilia']; // ISTAT order, north → south
+
+const perRegion = new Map<string, number>();
+for (const c of cittaDigitali.citta) perRegion.set(c.region, (perRegion.get(c.region) ?? 0) + 1);
+const unknown = [...perRegion.keys()].filter((r) => !REGIONS.includes(r));
+if (unknown.length) throw new Error(`lib/citta-digitali.ts: add ${unknown.join(', ')} to REGIONS`);
+
+const andList = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}` : (xs[0] ?? ''));
+const inRegion = (r: string) => (r === 'Lazio' ? `nel ${r}` : `in ${r}`);
+
+/** `names`: the cities the map names or highlights, north → south. */
+export function describeCittaDigitali(names: string[]): string {
+  const regions = REGIONS.filter((r) => perRegion.has(r));
+  const [mostRegion, mostCount] = [...perRegion].sort((a, b) => b[1] - a[1])[0];
+  const share = mostCount > cittaDigitali.citta.length / 2 ? 'la maggior parte' : 'più che altrove';
+  return `Carta d’Italia con le città di Città Digitali. Sono in ${andList(regions)}, ${share} ${inRegion(mostRegion)}. Tra queste: ${andList(names)}.`;
+}
```

#### 3 · `src/pages/index.astro`

```diff
diff --git a/src/pages/index.astro b/src/pages/index.astro
index af3119a..b6467d6 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -21,28 +21,14 @@ import { bearing, distanceKm, formatCoords } from '../lib/geo';
 import { pageGraph, person, ids } from '../lib/structured-data';
 import eventoPanorama from '../assets/images/derivate/evento-panorama.jpg';
 import eventoCitta from '../assets/images/derivate/evento-citta.jpg';
-import cittaDigitali from '../data/citta-digitali.json';
 import maps from '../data/maps.json';
+import { describeCittaDigitali } from '../lib/citta-digitali';
 
 const places = horizonPlaces.map((p) => ({ id: p.id, name: p.name, bearing: bearing(office, p), km: distanceKm(office, p) }));
 const schema = pageGraph('home', [person()], { about: ids.organization });
 
-// Text alternative of the chapter 03 map (WCAG 1.1.1, 1.3.1), from the same data as the dots and the
-// names: regions north → south, the one with most cities, the names drawn on wide maps (narrow maps
-// show fewer). No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
-const REGIONS = ['Lombardia', 'Lazio', 'Campania', 'Puglia', 'Calabria', 'Sicilia']; // ISTAT order
-const perRegion = new Map<string, number>();
-for (const c of cittaDigitali.citta) perRegion.set(c.region, (perRegion.get(c.region) ?? 0) + 1);
-const unknown = [...perRegion.keys()].filter((r) => !REGIONS.includes(r));
-if (unknown.length) throw new Error(`index.astro: add ${unknown.join(', ')} to REGIONS`);
-const regions = REGIONS.filter((r) => perRegion.has(r));
-const [mostRegion, mostCount] = [...perRegion].sort((a, b) => b[1] - a[1])[0];
-const share = mostCount > cittaDigitali.citta.length / 2 ? 'la maggior parte' : 'più che altrove';
-const inRegion = (r: string) => (r === 'Lazio' ? `nel ${r}` : `in ${r}`);
-const named = [...maps.maps.italia.places].sort((a, b) => b.lat - a.lat).map((p) => p.name);
-const andList = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}` : (xs[0] ?? ''));
-// Wording by copywriter-brand (L4): «Tra queste» because narrow maps draw fewer names than wide ones.
-const mapLabel = `Carta d’Italia con le città di Città Digitali. Sono in ${andList(regions)}, ${share} ${inRegion(mostRegion)}. Tra queste: ${andList(named)}.`;
+// Text alternative of the chapter 03 map: the names drawn on wide maps (narrow maps show fewer).
+const mapLabel = describeCittaDigitali([...maps.maps.italia.places].sort((a, b) => b.lat - a.lat).map((p) => p.name));
 ---
 
 <BaseLayout page="home" schema={schema}>
```

#### 4 · `src/components/sections/LocationShowcase.astro`

```diff
diff --git a/src/components/sections/LocationShowcase.astro b/src/components/sections/LocationShowcase.astro
index ed7ea62..d373a50 100644
--- a/src/components/sections/LocationShowcase.astro
+++ b/src/components/sections/LocationShowcase.astro
@@ -5,7 +5,8 @@
  *   longitude (west → east) and latitude (north higher). DOM order is west → east too, so
  *   focus order always matches what is seen (WCAG 2.4.3).
  * - `italy` (Città Digitali): outline map of Italy on the right, cities on the left aligned
- *   to the latitude of their node; hovering or focusing a city lights its node.
+ *   to the latitude of their node; hovering or focusing a city lights its node. With
+ *   `cityDots`, every other city of Città Digitali is a dot on the map (visual direction §1.4).
  * Every «Esplora ↗» opens the town portal in a new tab, announced to assistive technology.
  */
 import Media from '../ui/Media.astro';
@@ -43,9 +44,16 @@ interface Props {
    * that DOM and visual order match at every width (ux-designer, chapter 03 map review §3.2).
    */
   allPlaces?: { href: string; label: string; srSuffix: string; ctaId: string; destinationId: string };
+  /**
+   * Italy: every other city of Città Digitali as a dot (city dots, visual direction §1.4), with the
+   * legend under the map. `label` is the text alternative of the map while the full list of cities
+   * is not in the text beside it; without it the map and its legend stay aria-hidden (the legend only
+   * explains what is seen).
+   */
+  cityDots?: { legend: string; label?: string };
 }
 
-const { variant, id, title, text, statement, locations, surface = 'calce', location = 'luoghi', allPlaces } = Astro.props;
+const { variant, id, title, text, statement, locations, surface = 'calce', location = 'luoghi', allPlaces, cityDots } = Astro.props;
 
 // Doors: west → east, positions from real coordinates.
 const west = [...locations].sort((a, b) => a.lon - b.lon);
@@ -59,8 +67,11 @@ const doors = west.map((l) => ({
   y: maxLat === minLat ? 0 : (maxLat - l.lat) / (maxLat - minLat),
 }));
 
-// Italy: north → south, each city at the height of its node on the map (yPct of maps.json).
-const italyPoints: { id: string; yPct: number }[] = (maps as { maps?: { italia?: { places?: { id: string; yPct: number }[] } } }).maps?.italia?.places ?? [];
+// Italy: north → south, each city at the height of its node on the map (yPct of maps.json, named
+// places or dots: a city may be either, depending on the names of the Home map).
+type ItalyPoint = { id: string; yPct: number };
+const italia = (maps as { maps?: { italia?: { places?: ItalyPoint[]; dots?: ItalyPoint[] } } }).maps?.italia;
+const italyPoints: ItalyPoint[] = [...(italia?.places ?? []), ...(italia?.dots ?? [])];
 const north = [...locations]
   .sort((a, b) => b.lat - a.lat)
   .map((l) => ({ ...l, y: italyPoints.find((p) => p.id === l.id)?.yPct }));
@@ -140,7 +151,14 @@ const north = [...locations]
             )}
           </div>
           <div class="places__map">
-            <MapItaly map="italia" places={north} showLabels={false} class="places__map-svg" />
+            {cityDots ? (
+              <figure class="places__atlas" aria-hidden={cityDots.label ? undefined : 'true'}>
+                <MapItaly map="italia" places={north} cities="dots" showLabels={false} label={cityDots.label} class="places__map-svg" />
+                <figcaption class="places__atlas-note t-label">{cityDots.legend}</figcaption>
+              </figure>
+            ) : (
+              <MapItaly map="italia" places={north} showLabels={false} class="places__map-svg" />
+            )}
           </div>
           <ol role="list" class="places__cities">
             {north.map((c) => (
@@ -177,7 +195,7 @@ const north = [...locations]
 {
   variant === 'italy' && (
     <script>
-      // Light the node of the city being hovered or focused (decorative, the map is aria-hidden).
+      // Light the node of the city being hovered or focused (a visual echo: the cities are named in the list).
       document.querySelectorAll<HTMLElement>('[data-places]').forEach((root) => {
         root.querySelectorAll<HTMLElement>('[data-place-link]').forEach((city) => {
           const node = root.querySelector<HTMLElement>(`[data-place="${city.dataset.placeLink}"]`);
@@ -368,6 +386,16 @@ const north = [...locations]
     max-width: 22rem;
   }
 
+  /* City dots: the legend under the map, like the Home chapter 03 (visual direction §1.4). */
+  .places__atlas {
+    margin: 0;
+  }
+
+  .places__atlas-note {
+    margin-top: var(--space-s);
+    color: var(--fg-2);
+  }
+
   .places__cities {
     display: grid;
     gap: var(--space-xl);
@@ -442,6 +470,17 @@ const north = [...locations]
       padding: 0;
     }
 
+    /* The cities stand at the latitude of their node: the legend must not lengthen the map's row. */
+    .places__atlas {
+      position: relative;
+    }
+
+    .places__atlas-note {
+      position: absolute;
+      inset-inline: 0;
+      top: 100%;
+    }
+
     .city {
       position: absolute;
       inset-inline: 0;
```

#### 5 · `src/pages/citta-digitali.astro`

```diff
diff --git a/src/pages/citta-digitali.astro b/src/pages/citta-digitali.astro
index 733ebc9..bd2d0ed 100644
--- a/src/pages/citta-digitali.astro
+++ b/src/pages/citta-digitali.astro
@@ -16,6 +16,7 @@ import ContactForm from '../components/sections/ContactForm.astro';
 import Bridge from '../components/sections/Bridge.astro';
 import { italyPlaces, office, portals, video } from '../data/site';
 import { bearing, distanceKm } from '../lib/geo';
+import { describeCittaDigitali } from '../lib/citta-digitali';
 import { pageGraph, videoObject, ids } from '../lib/structured-data';
 
 const portal = portals.cittaDigitali;
@@ -91,6 +92,11 @@ const cities = italyPlaces.map((p) => ({
     locations={cities}
     surface="notte"
     location="luoghi"
+    cityDots={{
+      // Legend: copywriter-brand L1. Text alternative until the full list of cities is in this section.
+      legend: 'Ogni punto è una città di\u00a0Città\u00a0Digitali',
+      label: describeCittaDigitali([...cities].sort((a, b) => b.lat - a.lat).map((c) => c.name)),
+    }}
     allPlaces={{
       // Source of the full list of cities until it is confirmed and published here (citta-digitali-elenco.md §4).
       href: `${portal.url}/tutte-le-citta/`,
```

#### 6 · `src/components/ui/MapItaly.astro`: colori forzati (P6, indipendente)

```diff
diff --git a/src/components/ui/MapItaly.astro b/src/components/ui/MapItaly.astro
index e8d394d..22e20b4 100644
--- a/src/components/ui/MapItaly.astro
+++ b/src/components/ui/MapItaly.astro
@@ -360,4 +360,26 @@ if (!data) {
   .map--compact .map__svg {
     overflow: clip;
   }
+
+  /* Windows contrast themes (forced colors): the system paints every background in its canvas
+     colour, so nodes, dots and leaders would vanish, and dots would cut gaps in the coastline. Draw
+     them in the text colour of the theme; the knockout ring takes the canvas colour. */
+  @media (forced-colors: active) {
+    .map__node,
+    .map__dot,
+    .map__label[data-anchor^='drop']::before,
+    .map__label[data-anchor-narrow^='drop']::before {
+      forced-color-adjust: none;
+      background: CanvasText;
+    }
+
+    .map__dot,
+    .map--cities .map__node {
+      box-shadow: 0 0 0 1.5px Canvas;
+    }
+
+    .map__place--home .map__node::after {
+      border-color: CanvasText;
+    }
+  }
 </style>
```

## 3. Prove

**Come.**
- **Copia del sito nello scratchpad.** `src/`, `public/`, `scripts/` e configurazione, con `node_modules` collegato, allineata al repository dopo ce276be. Ho applicato le patch, costruito il sito e servito la build in locale.
- **Confronto con lo staging** (http://localhost:4321), cioè la stessa base senza la proposta.
- **Strumenti.**
  - Playwright (Chromium 141), con movimento ridotto per le misure di posizione.
  - axe-core 4.13 (WCAG 2.2 A e AA, best practice) a 390 px, 1440 px e 1440 px con movimento ridotto, dopo aver fatto scorrere tutta la pagina.

| Prova | Esito |
|---|---|
| `astro check` e build | 0 errori, 0 avvisi (2 suggerimenti già presenti, in `scripts/seo-check.mjs` e `src/scripts/video.ts`); 8 pagine |
| Patch | `git apply --check` pulito al commit 1182551, patch 1–5 e 6 separate e insieme; il risultato è identico, file per file, alla copia provata |
| HTML rispetto allo staging | Home, SIII, Contatti, Privacy e Cookie policy identiche byte per byte. Puglia Digitale: solo il CSS della sezione (+283 B). Città Digitali: CSS, `<figure>`, carta con `role="img"` e descrizione, 42 punti, `<figcaption>`; nient'altro |
| Punti e nodi | 42 punti e 3 nodi, cioè le 45 città di `citta-digitali.json`. Nel DOM i punti vengono da nord a sud, poi i nodi, che si dipingono sopra |
| Posizioni di nodi e schede (320, 390, 768, 1024, 1280, 1440 e 1920 px) | Invariate da 1024 px in su. Sotto, con carta in alto e città in pila, le schede scendono di 33 px (49 a 320 px, dove la legenda va su due righe) |
| Legenda | 16 px sotto la carta; una riga da 360 px, due a 320. Con la spaziatura di 1.4.12: due righe fino a 768 px, una da 1024. Mai sovrapposta a schede o testo, mai tagliata. Da 1280 px resta dentro la sezione, con almeno 195 px di margine |
| Contrasto | Legenda `--fg-2` su `notte`: 8,43:1. Punti e nodi `arancio-segnale`: 6,42:1 (soglia 3:1 per la grafica) |
| Hover e focus | Il focus su ogni «Esplora» accende il suo nodo (15 px), a tutte le 7 larghezze |
| Reflow | Nessuno scorrimento orizzontale da 320 a 1920 px, anche con 1.4.12 |
| axe-core | 0 violazioni a 390, 1440 e 1440 px con movimento ridotto. Le voci da rivedere (color-contrast, video-caption) sono le stesse dello staging |
| Albero di accessibilità | Figura «Ogni punto è una città di Città Digitali» → immagine con la descrizione → testo della legenda → lista delle tre città |
| Stato futuro, senza `label` | Figura e carta `aria-hidden`, 42 punti disegnati, 0 violazioni |
| Peso dell'HTML (gzip livello 9, brotli qualità 11) | `/citta-digitali/` 27,9 → 28,6 KB gzip (+0,65), 23,0 → 23,6 KB brotli; budget T2: 35 KB. `/puglia-digitale/` +0,04 KB gzip |
| Colori forzati (P6) | Senza il blocco: nodi, punti e richiami nel colore della tela su tutte e tre le carte. Con il blocco: nel colore del testo. Modo normale identico pixel per pixel |

**Screenshot** (a 2×, nello scratchpad, non versionati).
- 390, 1024 e 1440 px.
- Il nodo di Altamura a riposo e con il focus sulla scheda.
- Le tre carte nei colori forzati, prima e dopo P6.

## 4. Limiti noti

- **Città sotto un nodo.** Sono i limiti accettati dalla DV §1.4, e queste città saranno nell'elenco in testo (P5).
  - San Cataldo (7 km da Caltanissetta) resta sotto il suo nodo a ogni larghezza.
  - Gravina (11 km da Altamura) resta sotto il nodo di Altamura sulle carte fino a circa 350 px, cioè qui sui telefoni. A 1440 px se ne vede uno spicchio a sinistra del nodo.
  - Ercolano e Torre del Greco si leggono come un punto con uno spicchio.
- **Altamura è meno isolato** di Varese e Caltanissetta. Nel gruppo della Murgia il suo nodo si distingue per la misura, non per lo spazio intorno. Le alternative per marcarlo di più sono scartate (§5).
- **Sotto 1024 px le schede scendono di 33 px.** È il costo della legenda nell'impaginato in pila. Non si rompe nessun allineamento, perché sotto 1280 px le città non sono allineate alla latitudine.
- **Misure in Chromium.** Safari iOS e Firefox `[DA VERIFICARE]`.

## 5. Alternative scartate

- **Nomi sulla carta, come nella Home.** Le schede accanto sono già i nomi, alla stessa latitudine. Altri nomi farebbero concorrenza alle schede e anticiperebbero l'elenco (P5).
- **Un anello attorno ai tre nodi,** per distinguerli dai punti. L'anello attorno al nodo segna ciò che si può esplorare (DV §1.3) e, sulle carte, la sede di Acquaviva delle Fonti: ai tre nodi darebbe un significato falso.
- **Richiami orizzontali dalle schede ai nodi.** Attraverserebbero i punti della Puglia. Scheda e nodo sono già legati dall'allineamento alla latitudine e dall'accensione.
- **Un link nella legenda.** Il link alla fonte c'è già nella colonna del testo: un secondo link alla stessa pagina sarebbe un doppione. Anche nella Home la DV §1.4 lo tiene fuori dalla legenda.
- **Carta `aria-hidden` con la sola legenda.** La legenda dice che cosa sono i punti, non dove stanno: la regola di ux-designer chiede la descrizione.
- **Una descrizione senza nomi.** Non sarebbe equivalente all'immagine (P3).
- **Un secondo componente per la carta della pagina.** Darebbe due fonti agli stessi dati; il modo `'dots'` legge `maps.json` come la Home.

## Verdetto di dominio (UI)

**Proposta pronta per la decisione del creative-director.**
- **Risponde alla DV §7.6.** La pagina mostra tutte le città della Home. Le tre delle linee guida restano in evidenza con le schede. La carta ha la sua descrizione finché l'elenco non le sta accanto.
- **Rispetta le soglie.**
  - Accessibilità (WCAG 2.2 AA): descrizione, contrasti di 8,43:1 e 6,42:1, spaziatura 1.4.12, reflow, nessuna violazione axe.
  - Performance: nessun JavaScript, +0,65 KB gzip, 28,6 KB su 35.
  - Veridicità: nessun numero, nessun nome nuovo, punti dallo stesso elenco della Home.
- **P6 è indipendente** e riguarda tutte le carte: decide ux-designer.

## Ipotesi da validare

- **Elenco.** I nomi della pagina «Tutte le città» restano `[DA VERIFICARE]` (`citta-digitali-elenco.md` §1, §4).
  - Su questa pagina non si disegna nessun nome nuovo, ma i punti dipendono dallo stesso elenco.
  - Al go-live vale la regola della DV §1.4 («Veridicità»): senza il testo della pagina si pubblicano i punti con i soli tre nomi obbligatori. Su questa pagina non cambia nulla, perché i nomi sono già solo quei tre.
- **Browser.** Le misure valgono in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`.
- **Colori forzati.** Sono solo emulati in Chromium; Windows con un tema a contrasto `[DA VERIFICARE]`.

## Domande aperte

- **creative-director:** per il nodo di Altamura dentro il gruppo della Murgia bastano la misura (Ø 10 contro 5) e l'accensione dalla scheda? Proposta: sì.
- **copywriter-brand:** conferma della descrizione L4 a tre nomi anche su questa pagina, dove i tre nomi sono anche nel paragrafo e nelle schede.
- **copywriter-content:** riportare legenda e descrizione nel copy deck di Città Digitali (sezione 2), come previsto dalla versione 1.2.
- **ux-designer:**
  - P6, i colori forzati;
  - conferma della regola «senza `label`, carta e legenda `aria-hidden`», per quando arriverà l'elenco.

## Decisioni richieste

1. **creative-director:** adottare P1–P5 prima del go-live, e aggiornare la DV.
   - §1.4: la frase «Le carte i cui luoghi sono tutti nominati dal testo accanto restano `aria-hidden`: oggi la carta della Puglia e quella di `/citta-digitali/`» vale ormai solo per la Puglia.
   - §7.6, punto 2.
2. **ux-designer:** P6, i colori forzati su tutte le carte.
3. **Sessione principale:**
   - applicare le patch 1–5, e la 6 se viene decisa;
   - poi la build. Non serve `npm run maps`, perché `maps.json` non cambia.
   - Dopo, se serve, rifaccio la misura sulla build di staging.
