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
- **Sessione principale, 2026-09-28:** applicate quasi tutte le osservazioni della review di fedeltà e la variante «in pubblicazione» dei segnaposto. Scostamenti dalle mie proposte che ho accettato: statement di «Cosa si può fare» in `m` invece di `s`; righe mono dei segnaposto su due righe; hotspot a y 44–53%. I11 (ordine delle porte) resta ovest → est per scelta di ux-designer: decide il creative-director.

## Review di fedeltà del sito (lezioni del 2026-09-28)
- **Metodo efficiente (circa 35 chiamate):** un solo script in scratchpad (`ui-review.mjs`) che, per pagina e larghezza, scorre (attiva i reveal), torna in cima, salva la pagina intera e lancia una sonda DOM: gradino di token per ogni testo (via `var(--fs-*)` risolti in un div), pesi e famiglie, contrasto, accenti fuori posto, raggi, ombre, gradienti, filtri, overflow a 320, caratteri per riga, bersagli, giro di tastiera e testo nascosto con reduced motion e senza JS. Poi fogli con sharp: 390 px a scala 1 (5 strisce da 1800), 1440 a 0,3 per la composizione, ritagli nativi per i dettagli.
- **Falsi positivi della sonda da non riportare:** input nascosti (radio e checkbox a pillola) risultano «senza focus» ma l'anello sta sulla label con `:has(:focus-visible)`: controllare il codice. Lo skip link risulta «coperto dall'header» se non si guarda lo `z-index`. Nei fogli ridotti a 0,3 compaiono parole «colorate»: sono artefatti di crominanza del ridimensionamento, da ricontrollare a risoluzione nativa.
- **Il reflow a 320 va rimisurato sul copy definitivo**, compresi i rientri del Passaggio: la tabella del DS non conteneva «Cominciamo» (display-xl più rientro 1,2 em = +42 px).
- **L'`h1` che contiene i registri del Passaggio mantiene il 2em del browser** (la sonda lo vede a 40 px): non è visibile, ma inganna chi misura il titolo sull'elemento invece che sugli span.
- **Da controllare sempre nelle review future:** colori-segno usati come decorazione (`--place` su frecce, punti o avvisi; `--node` su punti non interattivi), gerarchia dei registri (mai salire), sequenze di titoli sullo stesso gradino, segnaposto con il formato giusto anche nel taglio mobile.

## Verifica di fedeltà dopo le correzioni (lezioni del 2026-09-28)
- **Le correzioni generano regressioni alle larghezze intermedie:** un margine pensato per il mobile è rimasto attivo su desktop (nodo «oggi» staccato dal filo); un posizionamento assoluto in % della carta funziona a 1440 ma sovrappone i blocchi a 1024–1279. Misurare sempre anche 1024, 1152 e 1280, non solo 390 e 1440.
- **Le mie proposte vanno misurate sul copy vero in ogni colonna:** «statement in `display-l`» andava bene nel capitolo a 8 colonne, ma in quelli a 6 il browser spezzava le righe d'autore (fino a 6 righe). Sonda utile: righe visive per ogni `.line > span` di ogni Passaggio.
- **I Passaggi in `<p>` ereditano `text-wrap: pretty`, non `balance`:** chi è un titolo va bilanciato esplicitamente.
- **Richiami ed etichette degli orizzonti:** sonda geometrica (ascissa del richiamo dentro il box di un'etichetta di fila più alta) a tutte le larghezze e a 4 posizioni di scroll, per la rotazione. L'incrocio c'era da 320 a 1440, non solo a 390 come avevo scritto.
- **Snippet provati prima di consegnarli:** iniettare le correzioni con `page.addStyleTag` e rimisurare. Con `document.head.append(style)` + `getComputedStyle` subito dopo, il contenuto fuori schermo può restituire valori vecchi: aspettare 300–400 ms.
- **Screenshot a pagina intera:** possono perdere dettagli legati al viewport (tacche dell'orizzonte nella copertina del video). I dettagli si controllano con screenshot del viewport dopo `scrollIntoView`.
- **Misura della «g» sull'orizzonte:** screenshot a 2× con `.horizon { visibility: hidden }` e riga più bassa d'inchiostro (< 110 in scala di grigi) contro `getBoundingClientRect().top` della linea.
- **Ricontrollo dopo c025181 (stesso giorno):** V1, V2, V3, V5, V7, O4 e O6 confermati con le stesse sonde. Verdetto UI: approvabile per il G4; V4 e V6 restano al creative-director. Le build di verifica servite con `python3 -m http.server` vogliono gli URL con la barra finale (`/siii/`). Prima di rimisurare, confrontare il diff del commit con gli snippet.
- **Bash:** il classificatore a volte non risponde; riprovare dopo qualche lettura. Script riusabili in `scratchpad/ui-verifica/` (verify, pubcheck, elshot, crop, sbs, sheet, rows, chaptest, i8test).
