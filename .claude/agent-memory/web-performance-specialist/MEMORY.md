# Memoria di progetto: web-performance-specialist

Lezioni, vincoli di ambiente e compromessi. Fatti e decisioni ufficiali stanno in `docs/performance/` (budget §7.1 = baseline del sito) e in `docs/decisioni/001-stack-tecnologico.md`: qui non si duplicano.

## Ambiente e strumenti (verificati il 2026-09-28)
- **Lighthouse.** Funziona con `CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 <url> --chrome-flags="--headless=new --no-sandbox"`, con Chromium 141.
  - `benchmarkIndex` tra 1640 e 2730: annotarlo sempre.
  - Una corsa simulata dura circa 12 s, una con throttling applicato circa 23 s.
  - La 13.5.0 è già nella cache npx: `/root/.npm/_npx/1722e863ebfd623b/node_modules/.bin/lighthouse` (nessun download). La sessione principale usa la 12.8.2 (anche in `scratchpad/tools`): numeri non confrontabili col budget.
- **Playwright** 1.56.1 è globale. Negli script ESM: `createRequire('/opt/node22/lib/node_modules/')` e poi `require('playwright')`, con `executablePath: '/opt/pw-browsers/chromium'`.
- **Server di misura.** `astro preview` non comprime e manda `no-cache` su tutto.
  - Dal 2026-09-28 si usa `DIST_DIR=<build> PORT=<porta> node scripts/serve.mjs` (ADR 004): applica `_headers`, comprime all'avvio e ha un TTFB di circa 1 ms. Legge la build **all'avvio**: dopo una nuova build va riavviato.
  - Il server di riserva (`scratchpad/serve.mjs`, budget §6.6) rilegge i file a ogni richiesta e comprime ogni volta. Le mediane di Lighthouse sono le stesse (verificato).
  - Su 8080 gira ancora il server di riserva su `/home/user/itnode/dist`.
  - `scripts/serve.mjs` **non gestisce le richieste `Range`**: la correzione è nella rimisura, osservazione 6. Serve prima di mettere il video in `/video/`.
- **Commit durante le misure.** La sessione principale committa e ricostruisce in parallelo. A fine misura si controllano `ls --time-style=full-iso dist/` e `git log`, e si dichiara quale commit è stato misurato.
- **Script di misura** (possono sparire): Fase 5 in `scratchpad/audit/`, rimisura in `scratchpad/perf-rimisura/`.
  - `lh.sh`: corse Lighthouse; nomi senza trattino, perché `lhsum.mjs` divide sul `-`.
  - `runs.mjs`, `mt.mjs`: dettaglio per corsa.
  - `reveal-frames.mjs`, `lcp-detail.mjs`, `inp-scroll.mjs`, `menu-first.mjs`, `menu-trace.mjs`, `scroll2.mjs`, `fix-check.mjs`, `publish-check.mjs`, `counter-func.mjs`.
- **Rete.**
  - Bloccati: docs.astro.build, docs.railway.com, developers.cloudflare.com, MDN, web.dev, caniuse, jsDelivr, api.fontsource.org, railway.app, itnode.it, erwinhofman.com.
  - Funzionano: il registry npm, raw.githubusercontent.com (anche il **sorgente di Chromium**: `chromium/chromium/main/third_party/blink/...`), WebSearch (solo sintesi).
- **PageSpeed Insights.** L'API risponde, ma la quota anonima è esaurita (429): serve una chiave.
- **Font di sistema.** L'ambiente ha **Liberation Sans** (non Arial, Roboto, Helvetica né Segoe). Il ripiego `local('Liberation Sans')` si applica, quindi il CLS dello swap misurato qui è realistico (budget §6.1, corretto).
- **Bash in modalità automatica.** A volte il classificatore non risponde (errore transitorio). Intanto si lavora con Read, Glob e Grep: dopo 10 fallimenti di fila il turno si ferma.

## Insidie scoperte (tutte misurate)
- **Throttling simulato di Lighthouse (Lantern).**
  - Non vede i ritardi dovuti alle animazioni. Un fade da `opacity: 0` sull'H1 vale +0,05 s nel simulato e +0,66 s nell'applicato. Per il motion si usa sempre anche `--throttling-method=devtools`.
  - **Tratta il font come bloccante per l'FCP.** Senza preload, l'FCP simulato cresce di 0,23–0,33 s, mentre quello applicato scende di 0,15–0,27 s. Per decidere sui font vale il throttling applicato.
- **Preload dei font in Chromium.** Un `<link rel="preload">` di font nel `<head>` blocca il primo rendering fino all'arrivo del font, oppure fino a 100 ms dopo l'inserimento del `<body>`, oppure fino a 1500 ms dalla navigazione. Vale anche con `swap`.
  - Sorgenti: `render_blocking_resource_manager.cc` e `document_loader.cc`.
  - È la spiegazione del «preload ritarda l'FCP» visto nel prototipo e sul sito.
- **Lo scroll touch sintetico non scorre.** Con Chromium 141 headless e l'emulazione mobile di Playwright, `Input.synthesizeScrollGesture` con `gestureSourceType: 'touch'` sposta 0 px.
  - Si usa `'mouse'` (rotella), e si controlla sempre `scrollY` prima e dopo.
  - La traccia del §2.6 della review di Fase 5 era su una pagina ferma; corretta nella rimisura, §6.
- **Anche `tap` di Playwright** va controllato con l'effetto atteso, non solo con l'assenza di errori.
- **Strumentazione pesante falsa i tempi.** Un `getComputedStyle` per ogni elemento in ogni rAF, con CPU 4x, ha spostato un LCP da 1,04 a 1,37 s. Per i tempi si usano solo i PerformanceObserver; i controlli per fotogramma servono solo per gli stati.
- **Prima interazione.** Il caso peggiore dell'INP è la prima interazione su una pagina nuova, e 3 ripetizioni sulla stessa pagina non bastano.
  - Si misurano almeno 6 caricamenti distinti, alternando le varianti.
  - Menu: mediana 128 ms, massimo 200 ms su 19 caricamenti, contro 128 ms con un solo campione.
- **`showModal()`.** Ricalcola lo stile dell'intero documento: 631 elementi, 52–80 ms con CPU 4x.
  - Il blocco dello scroll con `html:has(dialog[open])` non c'entra (provato).
  - `content-visibility: auto` dimezza gli elementi ricalcolati, ma l'INP resta nel rumore.
- **CLS durante la lettura.** Lighthouse misura solo il caricamento.
  - La maschera del reveal a righe (padding più margini negativi) fa collassare i margini tra le righe, e il blocco cambia altezza quando la maschera viene tolta (CLS fino a 0,016).
  - Si misura con uno scroll completo alla rotella, più ResizeObserver per trovare la causa.
- **Reveal sopra la piega.** Se lo script nasconde ciò che è già a schermo, l'LCP arriva dopo l'FCP (935 ms su `/siii/`), e il simulato non lo vede.
  - Corretto con la lettura delle posizioni prima di `reveal-ready`.
  - Controllo: stati per fotogramma a 412×823, 390×844, 768×1024 e 1440×900, con CPU 4x e la rete di Lighthouse (latenza 562,5 ms, 1474,56 kbit/s).
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
- **`pkill -f <pattern>`.** Se il pattern compare nel comando stesso, uccide la shell (exit 144): si usa `kill <PID>` con i PID presi da `lsof -t -iTCP:<porta>`.
- **Server di misura.** La Brotli q11 a ogni richiesta dà un TTFB di 65–234 ms: è un artefatto del laboratorio, e sposta l'FCP simulato di qualche decina di ms tra una build e l'altra.
- **Metodo delle varianti.** Per un confronto A/B si copia `dist/` nella scratchpad, si cambia una sola cosa (con `sed` o `perl` sull'HTML, oppure con uno `<style>` iniettato prima di `</head>`) e si serve su un'altra porta con `serve.mjs`.

## Compromessi e decisioni
- **Preload del font: deciso di toglierlo** (rimisura del 2026-09-28, §4; budget §3).
  - Guadagno misurato, throttling applicato: LCP −151 ms sulla home e −177 ms su `/siii/`.
  - Costo: ripiego visibile 0,4–0,5 s in più sulla prima pagina.
  - In attesa dell'assenso di creative-director e dell'applicazione della sessione principale (riga 42 di `BaseLayout.astro`). Dopo l'applicazione: rimisura breve di `/` e `/siii/`.
- **Contatore 01/05 di Città Digitali.** Il listener di scroll è conforme al budget, ma va contro la regola 9 dell'architettura. Ho proposto un IntersectionObserver con `rootMargin: '100000px 0px -50% 0px'`: provato su Chromium, da provare su Safari.
- **Autoplay del video su mobile.** Risolto: `video.ts` fa autoplay solo da 64em. Restano aperti il file su Railway (403 dal proxy) e l'hosting: sono le condizioni per il go-live.

## Collaborazione
- La direzione visiva (creative-director) mi ha chiesto di validare i font: validati, 70,7 KB, 2 file. Il preload ora è in discussione con lei.
- Il piano CRO al lancio prevede zero script e zero banner. Ogni futuro analytics passa da un ADR con me per peso e INP. RUM `web-vitals` proposto per l'INP del menu e per i font.
- La sessione principale mi richiama per le rimisure. Non posso modificare `src/`, `public/` né `scripts/`: le correzioni vanno come snippet nelle review.
