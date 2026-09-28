# Memoria di progetto: web-performance-specialist

Lezioni, vincoli di ambiente e compromessi. Fatti e decisioni ufficiali stanno in `docs/performance/` e in `docs/decisioni/001-stack-tecnologico.md`: qui non si duplicano.

## Ambiente e strumenti (verificati il 2026-09-28)
- **Lighthouse.** Funziona con `CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 <url> --chrome-flags="--headless=new --no-sandbox"`, con Chromium 141.
  - `benchmarkIndex` tra 1950 e 2420: annotarlo sempre.
  - Una corsa dura circa 15 s.
- **Playwright** 1.56.1 è globale. Negli script ESM: `createRequire('/opt/node22/lib/node_modules/')` e poi `require('playwright')`, con `executablePath: '/opt/pw-browsers/chromium'`.
  - Serve per l'INP (CDP `Emulation.setCPUThrottlingRate`), per le tracce (`browser.startTracing`) e per gli stili calcolati.
- **Server di misura.** `astro preview` non comprime e manda `no-cache` su tutto: si usa il server in `budget.md` §6.6.
- **Rete.**
  - Bloccati: docs.astro.build, docs.railway.com, developers.cloudflare.com, MDN, web.dev, caniuse, jsDelivr, api.fontsource.org, railway.app, itnode.it.
  - Funzionano: il registry npm (`npm view`, `npm pack` per leggere il codice dei pacchetti), raw.githubusercontent.com (CHANGELOG), WebSearch (solo sintesi).
- **PageSpeed Insights.** L'API risponde, ma la quota anonima è esaurita (429): serve una chiave.
- **Font di sistema.** L'ambiente non ha Arial, Roboto, Helvetica né Segoe: il CLS dello swap dei font misurato qui è pessimistico.
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

## Compromessi aperti
- **Preload del font dell'H1.** Nel simulato anticipa l'FCP di 0,36 s; nell'applicato lo ritarda di circa 0,1 s. Tenuto per il peso identitario del carattere, da riverificare in Fase 5 sulle pagine vere.
- **Autoplay del video su mobile.** Costa 2,2–3,7 MB ogni 15 s. Ho raccomandato copertina e play sotto i 64rem; decidono creative-director e ux-designer.

## Collaborazione
- La direzione visiva (creative-director) mi ha chiesto di validare i font: validati, 70,7 KB, 2 file.
- Il piano CRO al lancio prevede zero script e zero banner. Ogni futuro analytics passa da un ADR con me per peso e INP.
