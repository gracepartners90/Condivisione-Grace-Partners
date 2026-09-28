---
titolo: Budget di performance
owner: web-performance-specialist
contributi: [seo-technical, cro-specialist, ui-designer]
stato: bozza
versione: 0.3
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/decisioni/001-stack-tecnologico.md, docs/decisioni/004-anteprima-su-railway.md, docs/decisioni/005-preload-del-font.md, docs/creativa/direzione-visiva.md, docs/cro/piano-misurazione.md, prototipo di misura del 2026-09-28 (§7.2), docs/review/2026-09-28-sito-performance-web-performance-specialist.md, docs/review/2026-09-28-sito-rimisura-performance-web-performance-specialist.md (§7.1), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (§3.1, C08), fonti web elencate nel §6.8]
---

# Budget di performance

Limiti che lo sviluppo deve rispettare dal primo commit, e il protocollo con cui li verifichiamo in Fase 5 e a ogni modifica che tocca media, font, JavaScript o terze parti.

**Convenzioni**
- KB = 1024 byte, come in Lighthouse.
- I pesi sono **trasferiti**, cioè compressi.
- Si misura al primo caricamento a cache vuota, senza scroll, in emulazione mobile.
- **Limite** = bloccante per il gate G4. **Obiettivo** = valore atteso; se lo si supera, serve una motivazione nell'audit.

## 1. Soglie sul campo (75° percentile, mobile)

| Metrica | Limite (soglia di CLAUDE.md) | Obiettivo di progetto |
|---|---|---|
| LCP | ≤ 2,5 s | ≤ 2,0 s |
| INP | ≤ 200 ms | ≤ 150 ms |
| CLS | ≤ 0,1 | ≤ 0,05 |
| TTFB (diagnostica) | ≤ 0,8 s | ≤ 0,6 s |

## 2. Tempi in laboratorio, per template

Lighthouse 13.5.0 in emulazione mobile, throttling simulato, mediana di 5 esecuzioni (§6).

| Template | URL |
|---|---|
| T1 Home | `/` |
| T2 Progetto | `/siii/`, `/puglia-digitale/`, `/citta-digitali/` |
| T3 Contatti | `/contatti/` |
| T4 Servizio | `/privacy-policy/`, `/cookie-policy/`, 404 (un URL inesistente) |

Le soglie valgono per tutti i template:

| Metrica | Limite | Obiettivo | Sito costruito, caso peggiore tra i template (§7.1) |
|---|---|---|---|
| LCP | ≤ 2,5 s | ≤ 2,0 s | 1,67 s |
| FCP | ≤ 1,8 s | ≤ 1,5 s | 1,34 s (con il preload del font, ADR 005) |
| TBT | ≤ 200 ms | ≤ 100 ms | 0 ms |
| CLS | ≤ 0,1 | ≤ 0,05 | 0 |
| Speed Index | ≤ 3,4 s | ≤ 2,5 s | 1,34 s |
| Punteggio Performance | ≥ 90 | ≥ 95 | 99 |
| **LCP − FCP** con throttling applicato (`devtools`) | ≤ 200 ms | ≤ 100 ms | 0 ms |

**Perché serve la riga LCP − FCP.** Il throttling simulato non vede i ritardi dovuti alle animazioni.
- Un H1 che entra da `opacity: 0` sposta l'LCP di +0,66 s con throttling applicato, e di soli +0,05 s in quello simulato (§7.2).
- Sul sito costruito lo statement di `/siii/`, nascosto dal reveal, ha dato LCP − FCP = 935 ms con throttling applicato e 373 ms in quello simulato, dovuti al font (review del 2026-09-28).
- Su tutte le pagine la hero è senza foto e l'LCP è testo: LCP e FCP devono quindi coincidere.

**FCP simulato e font.** Il sito tiene il preload di Schibsted Grotesk (ADR 005, §3). Le misure del §7.1 sono fatte con il preload, e l'obiettivo di 1,5 s è rispettato su tutti i template. Se un giorno il preload verrà tolto (condizioni del §3), vale questa avvertenza:
- il modello simulato (Lantern) tratta il font come una dipendenza dell'FCP, mentre con `font-display: swap` il testo si dipinge con il ripiego;
- senza preload l'FCP simulato cresce di 0,23–0,33 s (home a 1,51 s, 0,01 s sopra l'obiettivo), mentre quello applicato scende di 0,15–0,27 s: in 20 corse su 20 l'FCP applicato precede l'arrivo del font (rimisura del 2026-09-28, §4.2);
- in quel caso l'obiettivo di FCP si valuta con il throttling applicato.

**Altre categorie di Lighthouse (mobile).** Sono obiettivi proposti; soglia e verdetto spettano agli owner.

| Categoria | Obiettivo | Owner |
|---|---|---|
| Accessibilità | ≥ 95, puntando a 100. Non sostituisce l'audit WCAG. | ux-designer |
| Best Practices | ≥ 95 | — |
| SEO | 100 | seo-technical |

## 3. Pesi e richieste, per template

| Voce (trasferito, al caricamento) | T1 Home | T2 Progetto | T3 Contatti | T4 Servizio |
|---|---|---|---|---|
| Documento HTML (compresi CSS e SVG inline) | ≤ 40 KB | ≤ 35 KB | ≤ 25 KB | ≤ 20 KB |
| — di cui CSS (inline più esterno) | ≤ 15 KB | ≤ 15 KB | ≤ 15 KB | ≤ 12 KB |
| JavaScript di prima parte (totale) | ≤ 10 KB | ≤ 12 KB | ≤ 12 KB | ≤ 5 KB |
| JavaScript e richieste di terze parti | **0** | **0** | **0** | **0** |
| Font | 2 file, ≤ 75 KB | 2 file, ≤ 75 KB | 2 file, ≤ 75 KB | 2 file, ≤ 75 KB |
| Immagini (senza scroll) | ≤ 150 KB | ≤ 150 KB | ≤ 60 KB | ≤ 20 KB |
| Video | **0 byte** | **0 byte** | 0 | 0 |
| Peso totale | ≤ 300 KB | ≤ 300 KB | ≤ 200 KB | ≤ 130 KB |
| Richieste totali | ≤ 15 | ≤ 18 | ≤ 12 | ≤ 8 |

**Regole collegate**
- **Font.**
  - Al massimo **2 file** per pagina: Schibsted Grotesk variabile, 45,9 KB, e Fragment Mono 400, 24,8 KB (misurati).
  - **Un solo preload, in ogni pagina: il file di Schibsted Grotesk.** Fragment Mono e le immagini non vanno in preload. Decisione del creative-director al gate G4, sentito web-performance-specialist: `docs/decisioni/005-preload-del-font.md`.
    - **Meccanismo.** In Chromium un preload di font nel `<head>` blocca il primo rendering fino all'arrivo del font, oppure fino a 100 ms dopo l'inserimento del `<body>`, oppure fino a 1,5 s dall'avvio della navigazione. Vale anche con `font-display: swap`. Fonte: costanti `kMaxFCPDelay` (`render_blocking_resource_manager.cc`) e `kMaxBlockingTimeForRenderBlockingFonts` (`document_loader.cc`) nel sorgente di Chromium, ricontrollate il 2026-09-28.
    - **Costo**, rispetto alla variante senza preload (rimisura del 2026-09-28, §4): con throttling applicato l'LCP è più tardi di 151 ms sulla home e di 177 ms su `/siii/`, e resta 1,01–1,04 s; con throttling simulato è pari sulla home e più tardi di 145 ms su `/siii/`. CLS invariato (0–0,002).
    - **Beneficio** (misure del creative-director, ADR 005): con la fibra il titolo compare subito in Schibsted, senza scambio di carattere; su 4G veloce la finestra del ripiego scende da 158–183 a 13–32 ms, su 4G lento da 626–694 a 184–234 ms.
    - **Quando si riapre.** La decisione torna a web-performance-specialist, che può togliere il preload senza un nuovo assenso, se:
      - i dati di campo (RUM `web-vitals` o CrUX) mostrano un LCP mobile al 75° percentile sopra 2,0 s;
      - una nuova versione di Chromium cambia in modo misurabile il comportamento dei font in preload;
      - la hero smette di essere tipografica.
    - Come sorvegliare le prime due condizioni: nota in fondo a questo paragrafo.
  - Niente corsivi né altri pesi statici. Un terzo file richiede un'eccezione (§8).
- **CSS.** Resta tutto inline finché sta entro 15 KB per pagina. Oltre, si torna a `inlineStylesheets: 'auto'` e si rimisura.
- **JavaScript.**
  - Nessun task oltre 50 ms durante il caricamento o le interazioni.
  - Moduli sopra i 5 KB, non necessari al primo rendering, solo con `import()` dinamico.
- **Terze parti.** Zero al caricamento, su tutte le pagine.
  - Questo vale anche per i domini dei portali, per railway.app e per i preconnect statici.
  - Ogni futura aggiunta (analytics, antispam del form) passa da un ADR con cro-specialist, con un proprio budget di peso e di INP.

**Nota di web-performance-specialist sull'ADR 005.** Condivido la decisione: con o senza preload tutte le metriche restano nella stessa classe, e la scelta tra circa 150 ms di LCP in laboratorio e l'assenza dello scambio di carattere è una scelta d'identità, quindi del creative-director. Le misure su fibra e 4G colmano un limite della mia rimisura, che valutava solo la rete lenta. Tre osservazioni, che non cambiano la decisione:
1. **Due numeri dell'ADR da precisare**, ricalcolati sulla sua tabella:
   - su 4G il primo paint con il preload arriva più tardi di **72–280 ms**, non di 100–280 ms: il valore più basso è `/siii/` su 4G veloce (228 contro 156 ms). Con la fibra la differenza è nulla (±8 ms);
   - senza preload la finestra del ripiego è **da 2,7 a 14 volte** più lunga, non «3–6 volte»: 2,7–3,8 volte su 4G lento, 4,9–14 volte su 4G veloce.
2. **L'FCP simulato della home senza preload (1,51 s) non è un contro dell'opzione A.** È un limite del modello Lantern (§2): con throttling applicato l'FCP scende. Non incide sulla decisione presa.
3. **Le prime due condizioni di riapertura oggi non sono sorvegliate.**
   - Al lancio il piano CRO non prevede script di misura, e CrUX è improbabile con il traffico del sito (§6.7): senza RUM la condizione «LCP mobile p75 sopra 2,0 s» non può scattare. Serve il RUM `web-vitals` senza cookie, decisione ancora aperta con cro-specialist.
   - Per la seconda condizione propongo un confronto A/B su `/` e `/siii/` a ogni aggiornamento maggiore del Chromium di misura, e comunque ogni tre mesi. Metodo: stessa build, sola riga del preload tolta, 3 corse per variante con throttling applicato, alternate.
   - Soglia proposta: si riapre se il ritardo dell'LCP dovuto al preload supera 300 ms (oggi 151–177 ms), oppure se cambiano le due costanti del sorgente citate sopra.

## 4. Budget per componente e media

| Componente | Budget |
|---|---|
| Immagine LCP, se una pagina ne avrà una | Unica immagine con `priority`, mai `lazy`. Pesi: ≤ 60 KB nella variante mobile (≤ 828 px), ≤ 150 KB in quella desktop. |
| Foto a tutta larghezza | ≤ 45 KB a 828 px, ≤ 70 KB a 1080 px, ≤ 150 KB a 1920 px (AVIF). Riferimento misurato: foto evento a 1080 px = 49,6 KB. |
| Foto a metà pagina o ritratto | ≤ 45 KB a 828 px (AVIF); i ritratti del fondatore misurano 32–40 KB. |
| SVG della hero (orizzonte) | Inline, ≤ 6 KB non compresso (limite fissato dalla direzione visiva). |
| Carte (Puglia, Italia) | Inline, ≤ 20 KB non compresso ciascuna; tracciati semplificati con SVGO, precisione a 1 decimale. |
| Copertina del video | `<picture>` lazy, non l'attributo `poster`. Pesi: ≤ 60 KB a 828 px, ≤ 150 KB a 1920 px. |
| Video, bitrate e file | 0 byte finché la sezione non è a metà viewport (autoplay consentito) o finché non c'è un clic. H.264: ≤ 2 Mbit/s a 720p, ≤ 4 Mbit/s a 1080p. AV1: circa −40%. Ogni file ≤ 25 MiB, con `+faststart`. |
| Anteprime immersive (iframe) | 0 byte e 0 connessioni al caricamento. Preconnect solo all'intenzione (hover o focus); iframe solo dopo il clic. |
| Visual in Canvas (se si userà) | ≤ 5 KB di JS, avviato dopo `load`, ≤ 4 ms di script per frame con CPU 4x, fermo fuori viewport. |
| Marquee, parallax, orizzonte | 0 KB di JS: solo CSS scroll-driven, da scrivere con le proprietà longhand (architettura §6.5). |

## 5. INP: le interazioni da misurare

In laboratorio con Playwright (§6.4): CPU rallentata 4 volte, 3 ripetizioni, conta il caso peggiore.
- **Obiettivo:** ≤ 100 ms per interazione.
- **Limite:** ≤ 200 ms.

| Interazione | Pagine |
|---|---|
| Apertura e chiusura del menu mobile (`<dialog>`) | tutte |
| Invio del form con errori (messaggi e riepilogo) | contatti e pagine con form |
| Invio del form valido, fino allo stato «in invio» | contatti e pagine con form |
| Play, pausa e audio del video | `/citta-digitali/` |
| Attivazione dell'anteprima immersiva, fino all'inserimento dell'iframe (escluso il contenuto di terzi) | `/siii/` |
| Interruttore del confronto «Tour 360° / SIII» | `/siii/` |
| Focus e hover sulle città della carta | `/puglia-digitale/`, `/citta-digitali/` |

## 6. Come verifichiamo

Si verifica in Fase 5 e, durante lo sviluppo, a ogni modifica che tocca media, font, JavaScript o terze parti.

### 6.1 Condizioni di test (da riportare in ogni audit)

- **Build di produzione** (`npm run build`), servita in locale con **Brotli** e con gli header di cache di produzione.
  - Dal 2026-09-28 il server di misura è `scripts/serve.mjs` dell'ADR 004: applica `_headers` e `_redirects` e comprime all'avvio.
  - Verificato: dà le stesse mediane di Lighthouse del server del §6.6, che resta come riserva.
  - `astro preview` non va bene: non comprime e manda `Cache-Control: no-cache` (verificato).
- **Strumenti:**
  - Lighthouse 13.5.0 via `npx`;
  - Chromium 141 di Playwright in `/opt/pw-browsers/chromium`;
  - preset mobile predefinito: emulazione Moto G Power 412×823, DPR 1,75, RTT 150 ms, 1,6 Mbit/s, CPU 4x.
- **Esecuzioni:**
  - 5 con throttling simulato, di cui si prende la **mediana**;
  - 3 con throttling applicato (`--throttling-method=devtools`), per la riga LCP − FCP e per il CLS dei font.
- **Dati da annotare:** `benchmarkIndex` (1950–2420 in questo ambiente il 2026-09-28) e il commit misurato.
- **Limiti noti del laboratorio:**
  - il server di misura è locale: HTTP/1.1 senza TLS e senza rete vera, TTFB di circa 1 ms con `scripts/serve.mjs` (65–234 ms con il server di riserva del §6.6, che comprime a ogni richiesta). Compressione, cache, protocollo e latenza dell'host reale si verificano sull'host (§6.8);
  - l'ambiente non ha Arial, Roboto né Helvetica, ma ha **Liberation Sans**, che la faccia di ripiego intercetta con le metriche di Arial (verificato il 2026-09-28). Il CLS dello swap misurato qui rappresenta quindi un ripiego con metriche di Arial: non è sovrastimato. Resta da verificare su Android (Roboto) e iPhone (Helvetica).

### 6.2 Procedura

```bash
npm run build
DIST_DIR=dist PORT=8080 node scripts/serve.mjs &   # ADR 004: _headers, Brotli computed at start-up

# 5 runs per URL, simulated throttling: take the median
for i in 1 2 3 4 5; do
  CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 http://127.0.0.1:8080/ \
    --only-categories=performance --chrome-flags="--headless=new --no-sandbox" \
    --output=json --output-path=.perf/home-$i.json --quiet
done

# 3 runs with applied throttling: LCP − FCP and font CLS
CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 http://127.0.0.1:8080/ \
  --only-categories=performance --throttling-method=devtools \
  --chrome-flags="--headless=new --no-sandbox" --output=json --output-path=.perf/home-dt-1.json --quiet

# Once per URL, all categories, HTML report attached to the audit
CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 http://127.0.0.1:8080/ \
  --chrome-flags="--headless=new --no-sandbox" --output=html --output-path=.perf/home.html --quiet
```

**Dove leggere i valori nel JSON**
- **Tempi e punteggio:**
  - `audits['largest-contentful-paint' | 'first-contentful-paint' | 'total-blocking-time' | 'cumulative-layout-shift' | 'speed-index'].numericValue`;
  - `categories.performance.score`.
- **Pesi e richieste:** `audits['resource-summary']` per tipo di risorsa e `audits['network-requests']`, con host e priorità di ogni richiesta.
- **Elemento LCP e sue fasi:** `audits['lcp-breakdown-insight']`.

**Dove salvare i risultati**
- La cartella `.perf/` non va versionata.
- Le mediane finiscono nell'audit `docs/performance/audit/AAAA-MM-GG-<oggetto>.md`.
- In Fase 4 si può automatizzare tutto in `scripts/perf/lighthouse.mjs`, con 5 esecuzioni per URL, le mediane e il confronto con queste tabelle. Lo script di riferimento esiste già nel prototipo e lo scrive web-performance-specialist su richiesta.
- `@lhci/cli` 0.15.1 resta un'opzione per la CI, ma usa Lighthouse 12.6.1: i numeri non sono confrontabili con quelli della 13.5.

### 6.3 Controlli statici sulla build (bloccanti)

| # | Controllo | Comando di esempio (vuoto o conforme = superato) |
|---|---|---|
| 1 | Al massimo un `fetchpriority="high"` per pagina, mai insieme a `loading="lazy"` | `for f in $(find dist -name '*.html'); do echo "$f $(grep -o 'fetchpriority="high"' "$f" \| wc -l)"; done` → ogni valore ≤ 1 (non usare `grep -c`: l'HTML minificato sta su una riga) |
| 2 | Ogni `<img>` ha `width` e `height` | `grep -rhoE '<img [^>]*>' dist --include='*.html' \| grep -cvE 'width="[0-9]+"[^>]*height="[0-9]+"\|height="[0-9]+"[^>]*width="[0-9]+"'` → 0 |
| 3 | Nessuno shorthand `animation` con timeline di scroll (sarebbe scartato dal browser) | `grep -rhoE 'animation:[^;}]*(view\|scroll)\(' dist` → vuoto |
| 4 | Nessun `<iframe>` nell'HTML (solo facade) | `grep -rl '<iframe' dist --include='*.html'` → vuoto |
| 5 | `<video>` senza `autoplay` e senza `poster` | `grep -rhoE '<video[^>]*>' dist --include='*.html' \| grep -E 'autoplay\|poster='` → vuoto |
| 6 | Nessuno script, CSS, font o preconnect esterno | `grep -rhoE '<script[^>]+src="https?://[^"]*"\|<link[^>]+rel="(stylesheet\|preload\|modulepreload\|preconnect\|dns-prefetch)"[^>]*href="https?://[^"]*"' dist --include='*.html'` → vuoto |
| 7 | Nessun `rel="preload"` (§3; fino alla modifica è ammesso il solo preload di Schibsted); al massimo 2 file `.woff2` | come il n. 1, con `grep -o 'rel="preload"'` → ogni valore 0; `find dist -name '*.woff2' \| wc -l` → ≤ 2 |
| 8 | Nessun AVIF o WebP sopra i 200 KB, nessun JPEG di fallback sopra i 300 KB; nessuna foto in `public/` | `find dist -type f \( -name '*.avif' -o -name '*.webp' \) -size +200k` → vuoto |

### 6.4 INP, scroll e reveal in laboratorio (Playwright)

```js
// scripts/perf/inp.mjs — usage: node scripts/perf/inp.mjs <url> <selector> [<selector>…]
import { createRequire } from 'node:module';
const require = createRequire('/opt/node22/lib/node_modules/'); // global Playwright 1.56.1
const { chromium } = require('playwright');
const [url, ...selectors] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await (await ctx.newCDPSession(page)).send('Emulation.setCPUThrottlingRate', { rate: 4 });
await page.addInitScript(() => {
  window.__events = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (e.interactionId) window.__events.push({ target: e.target?.outerHTML.slice(0, 60), d: e.duration });
  }).observe({ type: 'event', durationThreshold: 16, buffered: true });
});
await page.goto(url, { waitUntil: 'load' });
for (const sel of selectors) for (let i = 0; i < 3; i++) { await page.tap(sel); await page.waitForTimeout(400); }
const events = await page.evaluate(() => window.__events);
console.log('worst interaction (ms):', Math.max(0, ...events.map((e) => e.d)), events);
await browser.close();
```

Taratura del 2026-09-28:
- un gestore leggero (cambio di classe) misura **40 ms**;
- un gestore con 150 ms di lavoro sincrono misura **176 ms**.

Il metodo distingue quindi bene i casi.

**Prima apertura del menu.** Il caso peggiore dell'INP è la prima interazione su una pagina nuova. Si misura su almeno 6 caricamenti distinti, non con le ripetizioni sulla stessa pagina. Riferimento del 2026-09-28: mediana 128 ms, massimo 200 ms su 19 caricamenti.

**Traccia dello scroll** (main thread durante lo scroll, CPU 4x):
- si usa `Input.synthesizeScrollGesture` con `gestureSourceType: 'mouse'` (rotella) e `browser.startTracing`;
- **non** la sorgente `touch`: con Chromium 141 headless e l'emulazione mobile di Playwright non scorre la pagina (0 px in 12 prove su 12, verificato il 2026-09-28);
- si controlla sempre che `scrollY` sia cambiato;
- si contano i task oltre 50 ms (limite: nessuno) e gli eventi `UpdateLayoutTree`, `Layout` e `Paint`.

```js
await cdp.send('Input.synthesizeScrollGesture', { x: 206, y: 411, yDistance: -3000, speed: 1500, gestureSourceType: 'mouse' });
```

Riferimento del 2026-09-28, home a 412×823 su 3000 px: main thread al 37–39% con il motion e al 12% con movimento ridotto; nessun task lungo.

**Reveal e CLS durante la lettura** (Playwright):
- **Reveal:** a ogni fotogramma del caricamento, con CPU 4x e la rete del throttling applicato, nessun `[data-reveal]` o `.aperture` nella viewport deve avere opacità sotto 1, righe traslate o otturatori chiusi. Si controlla a 412×823, 390×844, 768×1024 e 1440×900.
- **CLS durante la lettura:** Layout Instability API durante uno scroll completo con la rotella, a scatti di 400 px ogni 120 ms.
  - Il valore si somma al CLS del caricamento, e il totale ha gli stessi limite (0,1) e obiettivo (0,05) del §2.
  - Ogni spostamento con una causa individuabile si corregge anche se il totale è sotto l'obiettivo.
  - Riferimento del 2026-09-28: fino a 0,016, dovuto al reveal a righe (rimisura, osservazione 2).

### 6.5 Esito e report

- **Superato:** tutti i limiti del §2 e del §3, tutti i controlli del §6.3 e tutte le interazioni del §5 sotto il limite.
- **Obiettivi mancati:** motivazione nell'audit e correzione pianificata. **Limiti mancati:** blocco del gate G4.
- **Contenuto dell'audit** (`docs/performance/audit/`):
  - condizioni di test;
  - mediane per URL;
  - confronto con il budget;
  - problemi ordinati per impatto;
  - correzioni con il guadagno misurato.

### 6.6 Server locale di misura di riserva

Da usare solo se `scripts/serve.mjs` (ADR 004) non è disponibile. Comprime a ogni richiesta, quindi il TTFB locale sale a 65–234 ms, ma le mediane di Lighthouse restano le stesse (verificato il 2026-09-28).

```js
// Minimal static server that mimics production: Brotli for text, long cache for hashed assets.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import zlib from 'node:zlib';

const [root = 'dist', port = '8080'] = process.argv.slice(2);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.json': 'application/json', '.txt': 'text/plain', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };
const compressible = new Set(['.html', '.css', '.js', '.svg', '.xml', '.json', '.txt']);

http.createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://local').pathname);
  let file = join(root, path);
  if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, 'index.html');
  const found = await stat(file).catch(() => null);
  if (!found) file = join(root, '404.html');
  let body = await readFile(file).catch(() => null);
  if (!body) return res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
  const ext = extname(file);
  const headers = { 'content-type': types[ext] ?? 'application/octet-stream',
    'cache-control': path.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate' };
  if (compressible.has(ext) && /\bbr\b/.test(req.headers['accept-encoding'] ?? '')) {
    body = zlib.brotliCompressSync(body, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } });
    Object.assign(headers, { 'content-encoding': 'br', vary: 'Accept-Encoding' });
  }
  res.writeHead(found ? 200 : 404, { ...headers, 'content-length': body.length }).end(body);
}).listen(Number(port), '127.0.0.1', () => console.log(`http://127.0.0.1:${port}`));
```

### 6.7 Dopo il lancio

- **CrUX e rapporto Core Web Vitals di Search Console.** Solo se il traffico basta, cosa improbabile per un sito B2B di nicchia [IPOTESI].
  - L'API PageSpeed Insights risponde dall'ambiente, ma la quota anonima è esaurita (errore 429 il 2026-09-28): serve una chiave API [DA FORNIRE].
- **RUM con `web-vitals` 6.2.2** (3,0 KB con Brotli), caricato dopo `load`: si attiva solo con una decisione.
  - Il piano CRO prevede zero script di misura al lancio.
  - Proposta: un invio senza cookie né identificatori all'endpoint del sito, da valutare nell'ADR sull'analytics con cro-specialist [DA VERIFICARE la base giuridica].
- **Controllo mensile** con la procedura del §6.2 sul sito in produzione, più un confronto con i valori di questo documento.

## 7. Misure di riferimento

### 7.1 Sito costruito (rimisura del 2026-09-28, commit `7c5f747`)

Sono la base per la regola del +10% del §8. Condizioni: quelle del §6.1, con Lighthouse 13.5.0, Chromium 141, `benchmarkIndex` 1642–2690 e build con il preload del font. Dettaglio e confronti in `docs/review/2026-09-28-sito-rimisura-performance-web-performance-specialist.md`.

| URL (template) | Simulato: FCP / LCP (corse) | Applicato: FCP = LCP (corse) | TBT sim. / appl. | CLS | Peso, richieste | JS | Elemento LCP |
|---|---|---|---|---|---|---|---|
| `/` (T1) | 1,18 / 1,66 s (5) | 1,01 s (5) | 0 / 52 ms | 0 | 113,2 KB, 7 | 2,0 KB | riga dell'H1 |
| `/siii/` (T2) | 1,28 / 1,66 s (5) | 1,04 s (5) | 0 / 54 ms | 0 | 95,3 KB, 7 | 4,2 KB | statement della hero |
| `/puglia-digitale/` (T2) | 1,16 / 1,59 s (3) | 1,02 s (3) | 0 / 36 ms | 0 | 111,2 KB, 8 | 4,2 KB | descrittore dell'H1 |
| `/citta-digitali/` (T2) | 1,34 / 1,67 s (10) | 1,01 s (3) | 0 / 30 ms | 0 | 98,7 KB, 8 | 5,5 KB | sottotitolo della hero |
| `/contatti/` (T3) | 1,14 / 1,51 s (3) | 0,93 s (3) | 0 / 7 ms | 0 | 89,6 KB, 7 | 4,2 KB | H1 |
| T4 (privacy, cookie, 404) | 0,99–1,03 / 1,36–1,51 s (3) | — | 0 / — | 0 | 81,8–82,6 KB, 6 | 2,0 KB | paragrafo |

- **Senza preload del font** (copia della stessa build, §3):
  - `/`: simulato 1,51 / 1,66 s; applicato 0,86 s.
  - `/siii/`: simulato 1,51 / 1,51 s; applicato FCP 0,78 s e LCP 0,86 s.
  - Quando la modifica sarà applicata, questi valori sostituiscono le prime due righe; le altre pagine si rimisurano al primo audit successivo.
- **INP**, caso peggiore: prima apertura del menu, mediana 128 ms e massimo 200 ms su 19 caricamenti. Le altre interazioni restano tra 32 e 112 ms.
- **Scroll:** nessun task oltre 50 ms. Main thread al 37–39% sulla home e al 25–31% su Città Digitali, con CPU 4x e motion attivo.
- **Pesi:** HTML 8,7–22,1 KB, di cui CSS inline 4,9–10,1 KB con Brotli; DOM 179–583 elementi; zero terze parti.

### 7.2 Prototipo del 2026-09-28

**Il prototipo:** scheletro Astro 7.3.5 costruito nella scratchpad con gli asset reali.
- HTML statico, CSS inline, uno script di reveal inline (IntersectionObserver).
- 12 sezioni di testo; foto con `astro:assets` (AVIF q50, WebP q75).
- Condizioni del §6.1.

| Variante | Throttling | FCP | LCP | CLS | Peso | Note |
|---|---|---|---|---|---|---|
| **G. Hero tipografica: Schibsted in preload, Fragment Mono** | simulato, mediana 5 | 0,90 s | 1,35 s | 0 | 72,5 KB, 3 richieste | TBT 0; HTML 1,8 KB; font 45,9 + 24,8 KB; LCP = blocco di testo dell'H1 |
| G | applicato, mediana 3 | 0,79 s | 0,79 s | 0,026 | | CLS dovuto allo swap dei due font (sovrastimato, §6.1) |
| A. Foto evento in hero con `priority` (font di prova) | simulato | 0,84 s | 1,51 s | 0 | 76 KB | variante scelta: AVIF 750w, 30 KB |
| B. Hero tipografica con preload (font di prova) | simulato / applicato | 0,84 / 0,82 s | 1,21 / 0,82 s | 0 / 0,013 | 47 KB | — |
| C. Come B, H1 con fade da `opacity: 0` (200 ms più 800 ms) | simulato / applicato | 0,88 / 0,82 s | 1,26 / **1,49 s** | 0 | 47 KB | **+0,66 s di LCP** visibili solo col throttling applicato |
| D. Come B, senza preload del font | simulato / applicato | **1,20** / 0,73 s | 1,21 / 0,73 s | 0,013 / 0,013 | 47 KB | risultati opposti: nel simulato il preload anticipa l'FCP di 0,36 s; nell'applicato lo ritarda di circa 0,1 s |
| E. Come B, H1 con ingresso solo `transform` | applicato | 0,82 s | 0,82 s | 0,013 | 47 KB | nessun ritardo |

**Immagini reali codificate con sharp 0.35.5** (KB per larghezza):

| Sorgente | AVIF q50 a 828 / 1080 / 1280 px | WebP q75 a 828 / 1080 px | Default di sharp (WebP q80) a 828 px |
|---|---|---|---|
| Evento Puglia Digitale (1365×768) | 33,5 / 49,6 / 61,3 | 56,1 / 78,7 | 66,3 |
| Fondatore, braccia conserte (1094×1438) | 34,6 / 47,4 / — | 53,2 / 72,7 | 63,7 |
| Fondatore, platea (1536×1024) | 28,5 / 40,4 / 50,2 | 43,6 / 61,6 | 52,1 |

- Confronto visivo con ingrandimento 2x su un volto: AVIF q50 è indistinguibile a 1x; q45 impasta la texture del tessuto; q60 costa +36%.
- **Default:** q50. q60 solo per i ritratti in primo piano, su richiesta di ui-designer.

## 8. Eccezioni e modifiche

- **Owner.** Il budget lo modifica solo web-performance-specialist.
- **Eccezioni.** Un'eccezione, per esempio un terzo font, uno script di terze parti o un'immagine fuori limite, richiede:
  - un ADR con il costo misurato e l'alternativa scartata;
  - il parere di creative-director se tocca l'identità.
- **Regressioni.** Se una modifica peggiora LCP o INP di oltre il 10% rispetto all'audit precedente, va giustificata anche se resta sotto il limite.

## Ipotesi da validare
- [IPOTESI: nessuna pagina avrà una foto come LCP, come prevede la direzione visiva. Vale per tutte le pagine attuali (verificato il 2026-09-28). Se una pagina futura la avrà, vale la riga «Immagine LCP» del §4.]
- [IPOTESI: il blocco del rendering dovuto al preload dei font (§3) riguarda Chrome, quindi i dati CrUX. Su Safari per iOS l'effetto del preload non è misurato.]
- [DA VERIFICARE: CLS dello swap dei font su un Android di fascia media reale (Roboto) e su iPhone (Helvetica Neue). In laboratorio, con Liberation Sans, è 0–0,002.]
- [DA VERIFICARE: INP della prima apertura del menu su un Android di fascia media reale (in laboratorio fino a 200 ms).]

## Domande aperte
1. È disponibile un Android di fascia media per una verifica sul campo prima del lancio, oppure un servizio di test su dispositivi reali?
2. Il cliente ha una chiave API di PageSpeed Insights o un accesso a Search Console per i dati sul campo del sito attuale?

## Decisioni richieste
- **creative-director:** assenso alla rimozione del preload del font (§3): il ripiego resta visibile 0,4–0,5 s in più sulla prima pagina con rete lenta.
- **ui-designer:** la qualità AVIF q50 resta confermata; tabella dei font del design system da allineare se il preload viene tolto.
- **cro-specialist:** RUM `web-vitals` senza cookie dopo il lancio, sì o no, da inserire nell'ADR sull'analytics. Serve anche per l'INP del menu e per il font senza preload.
- **Sessione principale:**
  - creare prima del lancio `scripts/perf/lighthouse.mjs` e `checks.mjs` (§6), con i controlli Playwright del §6.4: reveal fotogramma per fotogramma e CLS durante la lettura;
  - il server di misura c'è già: `scripts/serve.mjs`, a cui manca solo il supporto alle richieste `Range` per il video (rimisura, osservazione 6);
  - `.perf/` è già in `.gitignore`.
