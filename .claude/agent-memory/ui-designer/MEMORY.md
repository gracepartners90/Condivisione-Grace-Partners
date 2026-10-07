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

## Mappa di Città Digitali con 45 città (lezioni del 2026-10-05)
- **Richiesta dell'utente:** tutte le città come puntini, nomi solo dove non si sovrappongono, più nomi oltre ai tre del testo. Il coordinatore ha dato le priorità: fonte più solida, un nome per regione o gruppo, nessun nome per «Polignano» e «San Cataldo», nessun numero finché il testo della pagina non è confermato.
- **Etichette in zone fitte:** non bastano le posizioni accanto al nodo. Funziona l'aggiunta del nome «appeso» con un richiamo verticale, che è il gesto dell'Orizzonte e dà coerenza con il sistema. Il primo posto libero per ciascun nome non basta: serve una ricerca congiunta con ritorno indietro (prima i nomi più vincolati), altrimenti il primo nome occupa l'unico spazio di un altro.
- **Larghezze:** controllare ogni 5 px tra il minimo e il massimo. Una sovrapposizione può comparire a una larghezza intermedia: quando la carta cresce, i puntini si allontanano ma le etichette restano della stessa misura.
- **Un nome non deve nascondere il puntino di un'altra città:** il nodo Ø 10 con l'anello copre un vicino entro 4 px. È questa regola, non lo spazio, a togliere il nome a Pompei e a Comiso.
- **Classi annidate di larghezza:** i nomi compaiono solo quando la carta cresce, mai il contrario. Con due classi sulla soglia già esistente (25rem) i CSS restano semplici. Una città con nome solo sulle carte larghe è un puntino sulle strette.
- **Snippet di componenti provati in una build vera:** copia di `src/`, `public/`, `scripts/` e configurazione nello scratchpad, `node_modules` collegato, `cacheDir` della copia (così non si scrive nella cache del progetto), `astro check` e build, server su un'altra porta, chiuso con `kill` sul PID. Poi `git apply --check` delle patch sul repository, che non lo modifica.
- **Fragment Mono in Chromium:** l'avanzamento dei glifi è arrotondato al pixel (7 px fino a circa 12,4 px di corpo, 8 px oltre). Per i calcoli al build usare un margine e le misure di WCAG 1.4.12.
- **Script** in `scratchpad/ui-mappa/`: `gen/` (generatore di prova), `site/` (copia del sito con le modifiche), `probe-built.mjs` (sovrapposizioni), `select3.mjs` (scelta dei nomi), `variants.mjs` (misure dei puntini).


## Carta di /citta-digitali/ con i punti (lezioni del 2026-10-05)
- **Esito della carta del capitolo 03:** applicata in 0a61546 come proposta (DV 0.6 §1.4, il punto-città). Per la pagina ho proposto il modo `cities="dots"` di `MapItaly` e la prop `cityDots` di `LocationShowcase`: tre nodi delle schede, 42 punti, legenda L1, descrizione L4 a tre nomi. In attesa del creative-director.
- **Legenda sotto una carta con elementi allineati alla latitudine:** nel flusso allunga la riga e sposta le città posizionate in percentuale. Da 80em va `position: absolute; top: 100%` nello spazio già libero sotto la carta. Misurare sempre nodi e schede prima e dopo, alle larghezze dove cambia l'impaginato.
- **Accessibilità della carta che cambia nel tempo:** con il `label` la carta è `role="img"`; senza, carta e legenda insieme `aria-hidden` (una legenda letta da sola parla di punti che lo screen reader non incontra). Costruire la descrizione con una funzione condivisa dagli stessi dati.
- **Colori forzati:** nodi, punti e richiami fatti con un fondo spariscono (il sistema dipinge i fondi in `Canvas`). Prova con Playwright `forcedColors: 'active'`. Correzione: `forced-color-adjust: none` e `background: CanvasText`. La proprietà si eredita, quindi gli pseudo-elementi con bordo vogliono un colore esplicito. Nessuna regola sui colori forzati nel progetto fino al 2026-10-05.
- **Altri membri committano in `src/` mentre lavoro** (ce276be durante questo incarico). Prima di generare le patch: `git log`, confronto file per file tra copia e repository, riallineamento della copia, nuova build. Poi `git apply --check` delle patch estratte dalla review stessa, così il testo consegnato è quello provato.
- **Pesi compressi:** `gzip -c file` scrive il nome del file nell'intestazione, e nomi di lunghezza diversa falsano i confronti di pochi byte. Usare `zlib` di Node (o `gzip -n`). Per trovare differenze tra HTML minificati: `cmp -l`, oppure andare a capo su `><`; `SequenceMatcher` senza autojunk su 140 KB non finisce.
- **Script** in `scratchpad/ui-cdpage/`: `probe.mjs` (nodi, schede, legenda, accensione a 7 larghezze), `spacing.mjs` (legenda con 1.4.12), `a11y.mjs` e `nolabel.mjs` (albero di accessibilità), `forced2.mjs` (colori forzati), `contrast.mjs`, `focusshot.mjs`; patch in `diff/`.

## Ricontrollo della carta e colori forzati (lezioni del 2026-10-05, sera)
- **Esito:** la carta di `/citta-digitali/` è applicata (c98f565) come proposta, con la descrizione L6 di ux-designer al posto della mia P3 con i tre nomi: su questa pagina i nomi sono già nel testo e nelle schede. P6 approvata. Le mie CF1 (404), CF2 (residui a gradiente) e CF3 (controllo D.2) sono state adottate da ux-designer, e CF1 è applicata in 00593a7.
- **Colori forzati, due casi oltre gli sfondi:**
  - i gradienti spariscono, perché `background-image` diventa `none` per ogni strato;
  - un contorno trasparente usato per nascondere un anello a riposo viene dipinto e resta sempre acceso.
  - Il controllo che cerca solo gli sfondi color tela non li vede. Serve il confronto tra modo normale e colori forzati sugli stessi elementi (`accessibilita.md` D.2).
- **Lo staging può essere ricostruito mentre misuro** (qui con O4). Controllare l'ora di `dist/` prima e dopo, e dire su quale build vale ogni prova. Uno spostamento frazionario della sezione (la hero cresce di 24,8–26,2 px) rompe il confronto pixel per pixel per l'antialiasing. Resta valido il confronto della geometria relativa al componente.
- **La squadra va veloce:** il coordinatore committa i file in corso e applica le proposte mentre scrivo ancora. Prima di consegnare: `git log`, poi stato di review e design system allineato alle decisioni prese nel frattempo (DV 0.8, `accessibilita.md` 0.6).
- **Server di prova:** chiuderli a fine incarico. Il 4333 della carta del capitolo 03 era rimasto acceso dalla mattina; chiuso con `kill` sul PID, dopo aver controllato con `/proc/<pid>/cwd` che servisse una mia copia.
- **Script** in `scratchpad/ui-cdpage/remeasure/` (`probe2/3/4`, `pixels`, `forced3`, `fcmarks`, `fc-extra`, `gradients`, `fix404`, `offset`) e in `scratchpad/ui-fc404/` (copia del repository con CF1, `test404.mjs`, `fcx/fc-extra.mjs`).

## Carta della Puglia intera nella hero di /puglia-digitale/ (lezioni del 2026-10-06)
- **Richiesta dell'utente:** la Puglia intera con un punto per ogni città virtualizzata (le 31 pugliesi di `citta-digitali.json`, confermate). Proposta in `docs/review/2026-10-06-carta-puglia-intera-ui-designer.md`, in attesa del creative-director; il design system si aggiorna dopo la decisione. Condizioni di brand-strategist: niente «tutta la Puglia», niente campiture, nessun numero, nessuna formula che attribuisca Puglia Digitale a ITnode; nomi solidi subito, gli altri solo in anteprima, con un ordine che permetta di toglierli al go-live.
- **Solo costa, ed è una scelta:** nessun confine regionale offline (`world-atlas` ha solo admin-0, `iso-codes` solo i nomi). Il registro npm e GitHub raw rispondevano, ma un dato nuovo è una dipendenza con licenza e attribuzione: non si scarica senza decisione. Una regione chiusa farebbe pensare a una copertura completa.
- **L'ordine dei nomi sta nei dati, a livelli** (`obbligatori`, `solidi`, `gruppi`, `poi`, `senzaNome`): al go-live si tolgono due blocchi e restano i solidi. Provare anche l'insieme ridotto, non solo quello pieno.
- **Le classi dei nomi devono coincidere con le larghezze vere.** Senza limite, la carta della hero andava da 572 a 1237 px. Prima si fissa in CSS l'intervallo del componente (qui `clamp(640px, 75svh × rapporto, 1100px)`), poi si calcolano i nomi per quell'intervallo. Tre classi su due elementi: la compatta (stretta 280–400, larga 400–660, query a 25rem) e la hero (640–1100).
- **Nomi obbligatori su due righe** con un `<br>` che la query di contenitore accende o spegne con `display`: funziona in Chromium; gli altri browser `[DA VERIFICARE]`. Senza, Gravina non entrava sotto i 400 px.
- **Anello della sede sotto i punti:** `z-index: -1` finiva dietro il fondo della sezione, perché `container-type` non crea un contesto di sovrapposizione in Chromium 141. Serve `isolation: isolate` sulla carta.
- **Specificità:** le regole della sede battevano le ancore strette della query di contenitore. Meglio proprietà personalizzate sul nodo (`--corner`, `--leader-from`) lette dalle regole generali, senza regole di eccezione.
- **Le sonde delle sovrapposizioni non vedono l'ambiguità:** «ALTAMURA» stava proprio sopra il nodo di Gravina senza toccarlo. Regola nuova: 6 px da ogni altro nodo con nome. Guardare sempre le immagini, oltre ai numeri.
- **Nomi dei mari:** sono ostacoli come i nomi delle città. Con l'ancora `middle` restano dentro la carta stretta; sotto i 25rem si tolgono.
- **Il repository si è mosso due volte durante l'incarico** (5241f80, poi d60b95f, 808c901 e 43cb915, che hanno committato le modifiche alla pagina su cui avevo fondato la patch). Prova finale più solida: `git archive HEAD | tar -x` in una cartella pulita, patch estratte dalla review, generatore (sha256 di `maps.json`) e build, con l'HTML confrontato byte per byte con quello provato.
- **Staging spento:** non l'ho riavviato; ho servito le mie build su 4341, 4342 e 4343 e le ho chiuse con `kill` sul PID.
- **Patch su un file che altri stanno per cambiare** (qui la pagina, con le foto delle porte in arrivo): simulare la modifica in un `git clone --shared` nello scratchpad e provare `git apply --3way`. Funziona se la patch porta l'indice del blob di partenza e quel blob è nel repository; dirlo nella review.
- **Staging riacceso a fine incarico:** confrontare l'HTML servito con quello della copia di confronto (`cmp`) per dire se le misure di «oggi» valgono anche lì.
- **sharp:** `composite` e `resize` nella stessa catena falliscono; prima il composito in un buffer, poi il ridimensionamento.
- **Script** in `scratchpad/ui-puglia/`: `probe.mjs` (sovrapposizioni con e senza 1.4.12), `widths.mjs`, `legend.mjs`, `brtest.mjs` (a capo condizionale), `forced.mjs`, `fcmarks-pd.mjs` (colori forzati), `same.mjs` (confronto al pixel), `a11y.mjs`, `anim.mjs` (otturatore e legenda), `home02.mjs` (P4), `assemble.py` ed `extract.py` (review dalle patch e ritorno); patch in `diff/`.

## Regola 11 su tutte le carte (lezioni del 2026-10-06, pomeriggio)
- **Esito della Puglia intera:** applicata (b113efb) e approvata dal creative-director senza correzioni: DV 0.11, con le regole 10 (sede), 11 (6 px dai nodi con nome) e 12 (nomi dei mari). La descrizione è la L7 di copywriter-brand, scelta da ux-designer: i nomi disegnati a ogni larghezza, senza la sede nell'elenco. Ogni descrizione di carta sta sotto i 250 caratteri. Design system 0.8 allineato.
- **Il metro decide l'esito.** Il creative-director misura in pagina, con la spaziatura normale, dal bordo dipinto del nodo. Il generatore usa il caso peggiore (1.4.12) dal bordo dell'anello: circa 3 px più severo. Con il suo metro «MANFREDONIA» arriva a 6 px da 460 px di carta, con quello del generatore mai. Dichiarare sempre il metro e dare entrambe le misure.
- **Quando la ricerca non trova soluzioni, dimostrarlo** con una tabella per posizione: che cosa la blocca e a quali larghezze (fuori carta, punto coperto, nodo a meno di 6 px). Convince più di «il generatore non trova spazio».
- **Il ripiego editoriale del gruppo può essere peggio di nessun nome:** «SAN GIOVANNI ROTONDO», 20 caratteri, su 400 px attraversa la penisola. Guardare l'immagine della scelta automatica prima di proporla. La preferenza 2 del creative-director applicata nome per nome (restano i nomi che la regola già rispetta) non richiede nomi nuovi.
- **«Vale per tutte le carte» vuol dire misurarle tutte in pagina,** comprese quelle posizionate dal CSS. Così è emerso un difetto vecchio della carta della Terra di Bari nel capitolo 02 della Home: le coordinate di Monopoli sull'anello della sede a 400–480 px di carta, soprattutto nella conca delle due colonne (finestre 1025–1230). Nelle verifiche precedenti avevo guardato 390 e 1440: provare ogni 5 px, anche lì.
- **Sonde:** la prima misura dopo il caricamento o un ridimensionamento può essere falsa (carta di 219 px a 320). Fare un ridimensionamento a vuoto e aspettare 600 ms. Per le sovrapposizioni di testo usare i rettangoli di un Range: i riquadri delle etichette danno falsi positivi (confermato).
- **Patch con `git diff --no-index`:** riscrivere le intestazioni `a/a/…` e `b/b/…`. La riga `index` conserva il blob di HEAD, quindi `--3way` resta possibile.
- **Script** in `scratchpad/ui-apart/`:
  - `tools/probe-map.mjs`: sonda generale di una carta, con il selettore come argomento;
  - `tools/gaps.mjs`: il metro del creative-director;
  - `tools/tdb-text.mjs`: la Terra di Bari, misurata sul testo;
  - `tools/mapwidth.mjs`, `mapshot.mjs`, `shot02c.mjs`;
  - `site/scripts/explore*.mjs`: le posizioni possibili;
  - `assemble.py` ed `extract.py`;
  - patch in `diff/`.

## Verifica sulla build della regola 11 (lezioni del 2026-10-06, sera)
- **Esito:** il creative-director ha approvato R1, R2 e R3 (DV 0.12), applicati in 3edfc79 senza modifiche. La verifica sulla build è conforme alla proposta, nello staging e nella variante «in pubblicazione». Per la descrizione del capitolo 03 ux-designer ha scelto B (4b90180): solo i nomi disegnati a ogni larghezza, 5 nomi, 199 caratteri. Ora è una regola sola per tutte le carte. Design system 0.9.
- **Unità dei pesi:** `budget.md` usa KB = 1024 byte, come Lighthouse. Nelle review della Puglia intera e della regola 11 avevo dato migliaia di byte: 26,8, 27,9 e 29,4 KB invece di 26,2, 27,3 e 28,7. Leggere sempre la convenzione del documento di riferimento prima di scrivere un peso.
- **Le patch in attesa di una decisione invecchiano.** Dopo 4b90180, che toccava `index.astro`, la patch 6 v2 di P4 non si applicava più, e avrebbe dichiarato una seconda volta `drawnAtEveryWidth`. A ogni commit che tocca i file di una patch in attesa: rifare `git apply --check` e riusare le funzioni introdotte da altri, invece di duplicarle.
- **Verifica di fedeltà veloce e solida:**
  1. file applicati contro file provati (`cmp`);
  2. sha256 dei dati generati;
  3. HTML dello staging contro la build di prova, pagina per pagina.

  Se sono identici, le misure valgono; poi si rimisura comunque, come chiesto, nelle due build.

## P4 sulla build e pulizia della Terra di Bari (lezioni del 2026-10-07)
- **Esito:** l'utente ha approvato P4 («sì, mettila»). La sessione principale l'ha applicata in 3e25c42, portando a mano la mia patch 6 v3: non si applicava più dopo 133e9a5 e d06a3e9. La verifica sulla build è conforme alla v3. Design system 0.10. Ho proposto di togliere la carta della Terra di Bari, ormai senza uso: decide il creative-director.
- **Dopo un riavvio del container** i server sono spenti, ma lo scratchpad resta. Prima di rimisurare controllare HEAD e le build servite, e confrontare l'HTML servito con quello già misurato. Se è identico byte per byte, le misure valgono ancora.
- **Prova di una pulizia senza effetti visivi:**
  - markup identico, ignorando le righe vuote: togliere un'espressione Astro lascia una riga di soli spazi, che in un contenitore a griglia non conta;
  - differenza del CSS regola per regola;
  - screenshot di ogni figura con carta, confrontati byte per byte, in tre larghezze.
- **Il codice morto può contraddire le regole nuove:** le coordinate di `MapItaly` per le carte senza punti-città sarebbero andate contro la regola 8 della DV 0.12. Dirlo nella proposta di pulizia.
- **Script** in `scratchpad/ui-p4/`:
  - `pixmaps.mjs`: le figure di due build a confronto;
  - `forced-cap02.mjs`: colori forzati della carta;
  - `fcmarks-home.mjs`: D.1;
  - `shot-cap02.mjs`;
  - `diff/pulizia-terra-di-bari.patch`.

## Pulizia applicata e hero di /siii/ con il ritaglio in build (lezioni del 2026-10-07, pomeriggio)
- **Esito:** il creative-director ha approvato la pulizia della Terra di Bari (decisione 7) e la sessione principale l'ha applicata in bae201c senza modifiche. Nello stesso commit: nodi tolti dalle schermate vere (decisione 4) e `mobileCrop` di `Media` nella hero di `/siii/`, 4:5 e ancorato in basso (decisioni 1 e 2). Le carte sono identiche pixel per pixel e il ritaglio coincide con la prova del creative-director. Design system 0.11.
- **Verificare un ritaglio fatto in build contro un riferimento CSS:**
  1. screenshot dell'elemento;
  2. togliere dal `<picture>` le `<source media>` e mettere all'`<img>` l'`object-position` del riferimento (il browser ricarica l'immagine intera);
  3. secondo screenshot;
  4. differenza media in scala di grigi, al quarto della risoluzione, cercando lo scarto migliore entro ±4 px.

  Lo scarto (0, 0) con circa 1 su 255 prova che il ritaglio coincide. `naturalWidth` e `naturalHeight` sono corretti per la densità del `srcset` (danno la misura CSS): vale il loro rapporto, e il candidato scelto si legge da `currentSrc` confrontato con il `srcset`.
- **Art direction con `<picture>`:** il ripiego `<img>` (JPEG intero) usa `object-fit` con il suo `object-position`. Se il ritaglio è ancorato in basso e l'`<img>` è al centro, i browser senza AVIF e WebP inquadrano diverso. Dare all'`<img>` lo stesso ancoraggio non cambia nulla a schermo.
- **Il verdetto del creative-director può assegnarmi lavoro che la sessione principale non riporta.** Qui il punto S3, la nitidezza del primo esempio di `/siii/` sugli schermi retina larghi. Leggere sempre il verdetto e segnalare i punti aperti nel resoconto.
- **Script** in `scratchpad/ui-siii/`:
  - `hero-crop.mjs`: ritaglio contro riferimento, sorgente scelta, prima schermata;
  - `hero-extra.mjs`: CLS e `object-position`;
  - `diff/siii-hero-fallback-position.patch`.

## Nitidezza del primo esempio di /siii/ sugli schermi retina (S3, lezioni del 2026-10-07, sera)
- **Esito:** con il limite a 1440 px, sugli schermi 2x il primo esempio scende a 0,48–0,61 pixel dell'immagine per pixel del dispositivo e al 63–78% dei contorni della sorgente; con il 1920 si arriva al 93–96%. Una variante uniforme a 1600 o 1800 px non entra nel controllo n. 8 (il WebP supera i 200 KB). Ho proposto `avifWidths` (AVIF fino a 1920, più un 1600 per gli schermi 1x larghi), provata. Decide web-performance-specialist. Design system 0.12.
- **«1,08x» è ambiguo.** Può essere la densità per pixel CSS (1440 / 1339) o quella per pixel del dispositivo (0,54 su 2x). Prima di accettare un giudizio di nitidezza, ricalcolare la densità per pixel del dispositivo.
- **Varianti di prova identiche a quelle di Astro:** sharp con le opzioni di `astro.config.mjs` (`avif({ quality: 50 })`, `webp({ quality: 75 })`, `jpeg({ quality: 75, mozjpeg: true })`) dà gli stessi byte. Si possono stimare pesi e nitidezza senza ricostruire il sito.
- **Mostrare in pagina un'immagine di prova:** il CSP non c'entrava (il server di prova non lo applica). Serve una URL dello stesso sito servita con `page.route(...).fulfill({ path })`. Togliere `srcset` lasciando `sizes` cambia `naturalWidth`, che viene corretta con `sizes`: aspettare `currentSrc` invece di `naturalWidth`.
- **Scelta del candidato con le `w`:** un candidato in più sopra il massimo attuale lo prende anche lo schermo 1x che supera di poco il massimo (1488 contro 1440). Serve una tappa intermedia (1600), oppure una sorgente con `min-resolution`.
- **Script** in `scratchpad/ui-s3/`:
  - `slot.mjs`: resa, candidato e densità;
  - `variants.mjs`: pesi per larghezza e formato;
  - `compare.mjs`: Tenengrad e PSNR per zona;
  - `diff/siii-esempio-avif-retina.patch`.

## Strada (b) per il primo esempio di /siii/ (lezioni del 2026-10-07, sera)
- **Esito:** web-performance-specialist ha scelto la (b), una sorgente AVIF solo con `media="(min-resolution: 1.5dppx)"`, contro la mia (a) (`avifWidths` per tutti), per non dare +18,5 KB agli schermi 1x larghi. Ho preparato la patch `hiDpiAvifWidths` di `Media`, con le prove richieste: review S3 0.2, §6, e design system 0.13. Non è ancora applicata.
- **La sorgente ad alta densità deve avere tutte le larghezze**, non solo quelle nuove. Anche i telefoni da 1,75x a 3x rispondono a `min-resolution`, e con le sole larghezze grandi scaricherebbero 1600 px o più. Per le larghezze comuni l'URL è la stessa della sorgente normale: nessun file in più.
- **In Astro, con `compressHTML: false`, un'espressione `{cond && <tag/>}` su una riga a parte lascia una riga vuota** quando la condizione è falsa. Per tenere identico byte per byte l'HTML delle istanze senza la prop, la nuova espressione va sulla stessa riga di un elemento vicino, con un commento nel frontmatter che spieghi perché.
- **Quale `<source>` sceglie il browser:** la prima la cui `media` è vera e il cui `type` è supportato. Con URL condivise tra sorgenti, `currentSrc` non basta: trovare la sorgente usata con `matchMedia(source.media)`, poi il candidato nel suo `srcset`.
- **`sizes` decide, non la larghezza resa:** a 390 × 844 a 3× la schermata è larga 350 px, ma `sizes` vale 93vw (363 px). 363 × 3 supera 1080, quindi il browser sceglie il 1440 già oggi.
- **Script** in `scratchpad/ui-s3b/`:
  - `choice.mjs` e `choice2.mjs`: variante e sorgente scelte, oggi e con la patch; il secondo prende i formati come JSON;
  - `diff/siii-esempio-avif-hidpi.patch`.
