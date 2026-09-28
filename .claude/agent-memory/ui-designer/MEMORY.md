# Memoria di progetto: ui-designer

Lezioni e preferenze. Fatti e decisioni ufficiali stanno in `docs/` (design system: `docs/ui/design-system.md`): qui non si duplicano.

## Ambiente e strumenti (lezioni del 2026-09-28)
- **Playwright come libreria:** `import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'` (non è nelle dipendenze del progetto). La CLI `npx playwright screenshot` non ha il fattore di scala: per immagini «a 2×» si impagina direttamente a dimensione doppia.
- **sharp del progetto** (0.35) è CJS in `dist/`: dagli script in scratchpad si carica con `createRequire('/home/user/itnode/package.json')`.
- **opentype.js 2.0** legge WOFF ma non WOFF2: i pacchetti `@fontsource/*` statici hanno anche i `.woff`. `toPathData(intero)` imposta `flipY: false`; emette segmenti `L` di lunghezza zero (da saltare nella serializzazione).
- **Copertura dei glifi:** confrontare in Chromium la larghezza di un carattere con due fallback diversi (`'Font', serif` contro `'Font', monospace`): se cambia, il glifo manca.
- **world-atlas countries-10m** è già generalizzato e quantizzato: la costa da Barletta a Brindisi ha ~40 vertici. A scala di hero serve Visvalingam (via le tacche dei moli) più Catmull-Rom centripeta, altrimenti sembra un grafico.
- **`vector-effect: non-scaling-stroke` + `pathLength` + `stroke-dashoffset`** non funzionano insieme in Chromium (il tratteggio va in px dello schermo): per «disegnare» una linea a spessore costante meglio un otturatore in `transform`.

## Metodo che ha funzionato
- **Ridisegno di un logo raster:** separare i colori per miscelazione lineare (bianco, trama, blu, nero), poi adattare per minimi quadrati corpo, linea di base e posizione dei glifi di più famiglie e pesi sulla copertura anti-aliasing. Ha indicato Montserrat 500 per «it» e 700 per «Node» (il brief diceva «tutto bold»). La «o»: due ellissi ruotate, adattate allo stesso modo. Verifica finale: sovrapposizione ×8 dei contorni sul PNG.
- **Prima di scrivere la «Revisione dei token», rileggere `tokens.css`:** la sessione principale lo modifica in parallelo (il 2026-09-28 lo stack dei font è stato corretto durante il mio lavoro).
- **Misurare il reflow a 320 px con il font reale** per ogni token display: la direzione visiva misura a 390 e 1440 e non vede l'uscita di «~200.000» a 320.

## Feedback e scelte
- **Utente, 2026-09-28** (via sessione principale): le foto del fondatore si usano con il trattamento «inchiostro» (DR3-b). Il logo web senza trama poligonale resta una proposta da confermare al cliente.
- Nessun feedback visivo ancora ricevuto sul design system.
