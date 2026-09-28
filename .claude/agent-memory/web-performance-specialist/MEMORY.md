# Memoria di progetto: web-performance-specialist

Lezioni, vincoli di ambiente e compromessi. Fatti e decisioni ufficiali stanno in `docs/performance/` e in `docs/decisioni/001-stack-tecnologico.md`: qui non si duplicano.

## Ambiente e strumenti (verificati il 2026-09-28)
- **Lighthouse.** Funziona con `CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 <url> --chrome-flags="--headless=new --no-sandbox"`, con Chromium 141.
  - `benchmarkIndex` tra 1950 e 2420: annotarlo sempre.
  - Una corsa dura circa 15 s.
  - La 13.5.0 è già nella cache npx: `/root/.npm/_npx/1722e863ebfd623b/node_modules/.bin/lighthouse` (nessun download). La sessione principale usa la 12.8.2: numeri non confrontabili col budget.
- **Playwright** 1.56.1 è globale. Negli script ESM: `createRequire('/opt/node22/lib/node_modules/')` e poi `require('playwright')`, con `executablePath: '/opt/pw-browsers/chromium'`.
  - Serve per l'INP (CDP `Emulation.setCPUThrottlingRate`), per le tracce (`browser.startTracing`) e per gli stili calcolati.
- **Server di misura.** `astro preview` non comprime e manda `no-cache` su tutto: si usa il server in `budget.md` §6.6.
- **Rete.**
  - Bloccati: docs.astro.build, docs.railway.com, developers.cloudflare.com, MDN, web.dev, caniuse, jsDelivr, api.fontsource.org, railway.app, itnode.it.
  - Funzionano: il registry npm (`npm view`, `npm pack` per leggere il codice dei pacchetti), raw.githubusercontent.com (CHANGELOG), WebSearch (solo sintesi).
- **PageSpeed Insights.** L'API risponde, ma la quota anonima è esaurita (429): serve una chiave.
- **Font di sistema.** L'ambiente non ha Arial, Roboto, Helvetica né Segoe, ma ha **Liberation Sans** (verificato il 2026-09-28 con `fc-list`). La faccia di ripiego con `local('Liberation Sans')` si applica: il CLS dello swap misurato qui rappresenta le metriche di Arial, non è pessimistico (la nota del budget §6.1 va corretta).
- **Prototipo.** Il prototipo e i suoi script (`lhrun.mjs`, `inp.mjs`, `trace.mjs`) stanno nella scratchpad della sessione e possono sparire. Gli script essenziali sono riportati in `budget.md` §6.

## Insidie scoperte (tutte misurate)
- **Throttling simulato di Lighthouse (Lantern).** Non vede i ritardi dovuti alle animazioni. Un fade da `opacity: 0` sull'H1 vale +0,05 s nel simulato e +0,66 s nell'applicato. Per il motion si usa sempre anche `--throttling-method=devtools`.
- **Lightning CSS** (minificatore di Vite 8).
  - Fonde `animation` più `animation-timeline` in `animation: … view()`, che Chromium scarta.
  - Si scrive solo in longhand. `vite.css.lightningcss.targets` non basta.
- **`poster` del `<video>`.** Si scarica subito anche con `preload="none"` e sotto la piega: meglio una copertina `<picture>` lazy.
- **`clip-path` animato.** Ridipinge a ogni frame (124 paint/s); gli otturatori in `transform` ne fanno 6.
- **`compressHTML: 'jsx'` (Astro 7).** Gli elementi generati con `.map()` escono senza spazi: si scrive `{i > 0 && ' '}`.
- **Fonts API di Astro.**
  - I provider `npm()` e `fontsource()` scaricano da CDN in build: si usa `local()` con il percorso del pacchetto.
  - `fallbacks: ['sans-serif']` genera il ripiego solo per Arial; `['system-ui']` copre anche Roboto.
- **Sottoinsiemi latini di Fontsource.** Non contengono → ↗ ≈.
- **`grep -c` sull'HTML minificato.** Conta le righe, non le occorrenze.

- **Reveal sopra la piega.** Con throttling applicato i moduli girano prima del primo paint: gli elementi `[data-reveal]` nella prima viewport partono nascosti. Su `/siii/` LCP − FCP = 935 ms, invisibile nel simulato. Controllo: Playwright, `[data-reveal], .aperture` con rect nella prima viewport a 412×823 e 1440×900.
- **`pkill -f <pattern>`.** Se il pattern compare nel comando stesso, uccide la shell (exit 144).
- **Server di misura.** La Brotli q11 a ogni richiesta dà un TTFB di 57–205 ms su HTML da 130 KB: è un artefatto del laboratorio.
- **Traccia dello scroll.** Si fa con CDP `Input.synthesizeScrollGesture` (touch) più `browser.startTracing`, contando Layout e Paint sul main thread.
- **Contatti.** Dopo un invio con errori, `tap` sul submit va in timeout in Playwright (causa non indagata, segnalata nella review).
- **Script della Fase 5** (`pw.mjs`, `lhsum.mjs`, `runlh.sh`): stanno in `scratchpad/audit/` e possono sparire. Gli essenziali vanno in `scripts/perf/` quando la sessione principale li chiede.

## Compromessi aperti
- **Preload del font dell'H1.** Nel prototipo: simulato −0,36 s di FCP, applicato +0,1 s.
  - Fase 5, sulle pagine vere (2026-09-28): senza preload l'LCP applicato della home migliora di 136 ms e il simulato resta pari.
  - Proposta di toglierlo dopo la rimisura di `/siii/`, falsata dal bug del reveal (review del 2026-09-28, osservazione 5).
- **Autoplay del video su mobile.** Risolto: `video.ts` fa autoplay solo da 64em. Resta aperto il file su Railway, non verificabile da qui (403 dal proxy); i controlli sono nella review, osservazione 2.
- **Baseline del sito costruito:** `docs/review/2026-09-28-sito-performance-web-performance-specialist.md` §2, da riportare nel budget dopo la correzione del bloccante.

## Collaborazione
- La direzione visiva (creative-director) mi ha chiesto di validare i font: validati, 70,7 KB, 2 file.
- Il piano CRO al lancio prevede zero script e zero banner. Ogni futuro analytics passa da un ADR con me per peso e INP.
