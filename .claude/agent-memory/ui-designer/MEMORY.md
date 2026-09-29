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
- **DR3 (ritratti del fondatore):** la build applica (b), trattamento «inchiostro», per scelta della sessione principale **in attesa della conferma dell'utente** (DV §4.3, ADR 002): non è una decisione dell'utente, non scriverlo così nei documenti. Il logo web senza trama poligonale resta una proposta da confermare al cliente.
- Nessun feedback visivo ancora ricevuto sul design system.
- **Sessione principale, 2026-09-28:** applicate quasi tutte le osservazioni della review di fedeltà e la variante «in pubblicazione» dei segnaposto. Scostamenti dalle mie proposte che ho accettato: statement di «Cosa si può fare» in `m` invece di `s`; righe mono dei segnaposto su due righe; hotspot a y 44–53%. I11 (ordine delle porte): ovest → est, proposta di ux-designer confermata al G4.

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
- **Animazioni con timer:** per osservare la fine di un'animazione prima di un timer JS (es. `.is-revealed`), si rinviano i `setTimeout` lunghi con un `addInitScript`, poi si confronta al pixel lo stato congelato con quello finale. `Animation.setPlaybackRate` rallenta le transizioni CSS ma non i timer, e falsa la sequenza.
- **Form a due colonne:** tra `align-content` `start`, `end` e subgrid ho scelto `end`. Riquadri allineati a riposo e dopo un invio vuoto, etichette vicine, ritmo invariato. La subgrid con traccia del messaggio variabile rompe il posizionamento automatico con un solo errore.
- **Bash:** il classificatore a volte non risponde; riprovare dopo qualche lettura. Script riusabili in `scratchpad/ui-verifica/` (verify, pubcheck, elshot, crop, sbs, sheet, rows, chaptest, i8test).

## Verifica C14 dopo il verdetto G4 (lezioni del 2026-09-28)
- **Esito delle mie proposte al G4:** accolte V4, V6, V9, V10, V14 (solo nella hero della Home: su Città Digitali 200° sovrapponeva le etichette) e `align-content: end` nel form; S1 (togliere la dissolvenza dell'orizzonte) superata: il creative-director la tiene come eccezione registrata. S4 è diventata una regola della DV §3.2.
- **Un cambio di dati sposta la composizione:** con le coordinate a 2 decimali (C11) il gruppo murgiano è passato da un lato all'altro del centro mobile e la sua etichetta si è appesa a sinistra, uscendo dal bordo. Dopo ogni cambio di luoghi, coordinate o centri si rimisurano sia gli incroci sia le etichette tagliate a riposo, non solo gli incroci.
- **Snippet per stili con scope di Astro:** i selettori compilati (`.x[data-astro-cid-…]`) pesano più di una regola iniettata da fuori. Per simulare una regola che nel componente vincerebbe per ordine, iniettarla con un selettore più pesante o con `!important`; altrimenti la prova sembra senza effetto.
- **Sovrapposizioni vere:** i box delle etichette (`width: max-content`, griglia) si toccano anche quando i testi no. Misurare sugli `getClientRects()` di un Range del testo.
- **Soglie di componente:** la larghezza di una carta non cresce sempre con il viewport (a 1000 px è più larga che a 1024, dove parte dalla colonna 3). Per le soglie di un componente meglio una query di contenitore.
- **Hero con orizzonte ruotato dallo scroll:** gli screenshot a pagina intera lo mostrano già ruotato; la prima schermata va fotografata nel viewport a scroll 0.
- **Server di verifica:** tra una sessione e l'altra possono spegnersi. Scrivere gli esiti nella review appena misurati; se il diff dopo la build misurata tocca solo commenti, dichiararlo invece di ricostruire.
- **Script riusabili C14** in `scratchpad/ui-verifica/`: c14, c14b, rows2 (incroci e tagli a riposo), v14b (700–767 fine), center2 (prova dei centri), pub14 (variante in pubblicazione), reflow14, s4 e s4b (pesi di `display-m`), n8b e n8c (etichette della carta), n7grid e n7check (posizione del nodo sulla foto).

## Ricontrollo dopo le correzioni di C14 (lezioni del 2026-09-29)
- **Esito delle mie proposte:** il creative-director ha approvato C14-1 (centro mobile a 238°), N7, N8 (soglia sulla larghezza della carta) e C14-4, e ha scritto la DV 0.4 con la regola del peso di `display-m` («il peso segue il gradino») e l'orizzonte mobile al 42%.
- **Errore mio da non ripetere:** nella verifica C14 ho scritto «Varese entra ancora» guardando la fine della rotazione (+60°). Su mobile la rotazione è legata a 0–100svh di scorrimento, ma l'orizzonte passa sotto l'header sticky dopo circa 300 px: se ne vedono solo circa 24°. Per ogni effetto legato allo scorrimento si misura **ciò che è visibile sotto l'header**, passo per passo, non lo stato finale.
- **Un cambio di centro sposta due momenti:** il riposo e l'ingresso durante la rotazione. Per separarli la leva è l'intervallo della rotazione (`animation-range-end`), non il centro.
- **Striscia dell'orizzonte:** copre 540°, quindi ogni luogo compare due volte nel DOM. Quando si cerca un'etichetta per nome, prendere la copia più vicina alla finestra.
- **Scroll-driven animations in Chromium headless:** funzionano con `scrollTo({ behavior: 'instant' })` e due `requestAnimationFrame` di attesa prima di leggere i rettangoli.
- **Snippet per un componente figlio:** provarlo iniettato così com'è, longhand e senza `!important`, per verificare che vinca per peso del selettore e che non tocchi le altre istanze (qui Città Digitali e il tablet).
- **Script del ricontrollo** in `scratchpad/ui-ricontrollo/`: rest (etichette a riposo), rot (ingresso di Varese sotto l'header), opts (alternative a confronto), heights (formati di telefono), heights2 (snippet esatto), applied (N7, N8, C14-4), bridge, shots.
- **Chiusura di R1 e R2 (DV 0.5):** approvate. R1 però nella forma con il limite di ux-designer, `max(60svh, 60vw)`: la mia proposta a 60svh, provata solo in verticale, sui telefoni in orizzontale avrebbe portato la striscia a 1,78 px per pixel di scorrimento. **Ogni intervallo o misura in `svh`/`vh` va provato anche in orizzontale** (568 × 320, 640 × 360, 667 × 375, 915 × 412), dove l'header non è sticky sotto i 480 px di altezza.
- **Regola del progetto** (`accessibilita.md` §2.6, DV §6): nessun movimento legato allo scorrimento va più veloce della pagina (≤ 1 px per px). Con intervalli in `svh` si limita con la corsa dell'elemento, cioè (rotazione ÷ campo) × 100vw. Nelle proposte di motion si riporta sempre la velocità in px per pixel di scorrimento sui formati estremi.

