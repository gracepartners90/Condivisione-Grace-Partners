---
titolo: Budget di performance
owner: web-performance-specialist
contributi: [seo-technical, cro-specialist, ui-designer]
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/decisioni/001-stack-tecnologico.md, docs/creativa/direzione-visiva.md, docs/cro/piano-misurazione.md, prototipo di misura del 2026-09-28 (§7)]
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

| Metrica | Limite | Obiettivo | Prototipo (§7) |
|---|---|---|---|
| LCP | ≤ 2,5 s | ≤ 2,0 s | 1,35 s |
| FCP | ≤ 1,8 s | ≤ 1,5 s | 0,90 s |
| TBT | ≤ 200 ms | ≤ 100 ms | 0 ms |
| CLS | ≤ 0,1 | ≤ 0,05 | 0 |
| Speed Index | ≤ 3,4 s | ≤ 2,5 s | 0,90 s |
| Punteggio Performance | ≥ 90 | ≥ 95 | 100 |
| **LCP − FCP** con throttling applicato (`devtools`) | ≤ 200 ms | ≤ 100 ms | 0 ms |

**Perché serve la riga LCP − FCP.** Il throttling simulato non vede i ritardi dovuti alle animazioni.
- Un H1 che entra da `opacity: 0` sposta l'LCP di +0,66 s con throttling applicato, e di soli +0,05 s in quello simulato (§7).
- Su tutte le pagine la hero è senza foto e l'LCP è testo: LCP e FCP devono quindi coincidere.

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
  - **Un solo preload**, Schibsted Grotesk. È un compromesso misurato (§7, variante D): con throttling applicato il preload ritarda l'FCP di circa 0,1 s, ma porta prima il carattere che fa l'identità.
  - In Fase 5 si confronta con e senza preload sulle pagine vere e si tiene la variante con l'LCP migliore.
  - Niente corsivi né altri pesi statici. Un terzo file richiede un'eccezione (§8).
- **CSS.** Resta tutto inline finché sta entro 15 KB per pagina. Oltre, si torna a `inlineStylesheets: 'auto'` e si rimisura.
- **JavaScript.**
  - Nessun task oltre 50 ms durante il caricamento o le interazioni.
  - Moduli sopra i 5 KB, non necessari al primo rendering, solo con `import()` dinamico.
- **Terze parti.** Zero al caricamento, su tutte le pagine.
  - Questo vale anche per i domini dei portali, per railway.app e per i preconnect statici.
  - Ogni futura aggiunta (analytics, antispam del form) passa da un ADR con cro-specialist, con un proprio budget di peso e di INP.

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

- **Build di produzione** (`npm run build`), servita in locale con **Brotli** e con gli header di cache di produzione (`scripts/perf/serve.mjs`, §6.6).
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
  - il server locale va in HTTP/1.1;
  - l'ambiente non ha Arial, Roboto né Helvetica: il CLS dello swap dei font è **sovrastimato** rispetto ai dispositivi reali, dove il fallback metrico si applica.

### 6.2 Procedura

```bash
npm run build
node scripts/perf/serve.mjs dist 8080 &   # Brotli + production cache headers

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
| 7 | Un solo `rel="preload"` per pagina (il font); al massimo 2 file `.woff2` | come il n. 1, con `grep -o 'rel="preload"'`; `find dist -name '*.woff2' \| wc -l` → ≤ 2 |
| 8 | Nessun AVIF o WebP sopra i 200 KB, nessun JPEG di fallback sopra i 300 KB; nessuna foto in `public/` | `find dist -type f \( -name '*.avif' -o -name '*.webp' \) -size +200k` → vuoto |

### 6.4 INP in laboratorio (Playwright)

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

### 6.5 Esito e report

- **Superato:** tutti i limiti del §2 e del §3, tutti i controlli del §6.3 e tutte le interazioni del §5 sotto il limite.
- **Obiettivi mancati:** motivazione nell'audit e correzione pianificata. **Limiti mancati:** blocco del gate G4.
- **Contenuto dell'audit** (`docs/performance/audit/`):
  - condizioni di test;
  - mediane per URL;
  - confronto con il budget;
  - problemi ordinati per impatto;
  - correzioni con il guadagno misurato.

### 6.6 Server locale di misura (`scripts/perf/serve.mjs`)

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

## 7. Misure di riferimento: prototipo del 2026-09-28

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
- [IPOTESI: i numeri del prototipo sono un pavimento; con tutte le sezioni reali ci aspettiamo HTML di 15–30 KB e JS di 4–8 KB, dentro il budget.]
- [IPOTESI: nessuna pagina avrà una foto come LCP, come prevede la direzione visiva. Se una pagina la avrà, vale la riga «Immagine LCP» del §4.]
- [DA VERIFICARE: CLS dello swap dei font su un Android di fascia media reale (Roboto) e su iPhone (Helvetica Neue), in Fase 5.]

## Domande aperte
1. È disponibile un Android di fascia media per una verifica sul campo prima del lancio, oppure un servizio di test su dispositivi reali?
2. Il cliente ha una chiave API di PageSpeed Insights o un accesso a Search Console per i dati sul campo del sito attuale?

## Decisioni richieste
- **ui-designer e creative-director:** confermare i font entro questo budget (2 file, 70,7 KB, un solo preload) e la qualità AVIF q50.
- **cro-specialist:** RUM `web-vitals` senza cookie dopo il lancio, sì o no, da inserire nell'ADR sull'analytics.
- **Sessione principale:** creare in Fase 4 `scripts/perf/serve.mjs` e `scripts/perf/inp.mjs` (§6) e aggiungere `.perf/` a `.gitignore`.
