# Memoria di progetto: creative-director

Lezioni e preferenze. Le decisioni ufficiali stanno in `docs/creativa/` e `docs/decisioni/`: qui non si duplicano.

## Ambiente e strumenti (lezioni del 2026-09-28)
- **Bloccati** (sia curl sia WebFetch): aprildunford.com, web.archive.org, archive.ph, itnode.it, i portali *digitale.*, railway.app, LinkedIn, nominatim.openstreetmap.org, wikidata.org e molte rassegne di design (nanoglobals, knapsackcreative, sitebuilderreport).
- **Funzionano:** WebSearch (restituisce solo sintesi testuali, mai il layout; per le coordinate dà valori discordanti tra fonti), il registry npm, Google Fonts.
- **Non interrogare lo stato del proxy** (`/__agentproxy/status`): la richiesta è stata negata. Se una fonte è bloccata, dichiararlo e chiedere screenshot o materiali.
- **Mai mettere l'email dell'utente in una richiesta di rete** (header User-Agent compreso). Il 2026-09-28 è successo una volta verso Nominatim: il proxy ha rifiutato il CONNECT prima del tunnel TLS, quindi l'header non è partito. Per le richieste usare solo un User-Agent generico.
- **Analisi immagini:** `sharp` è già in `/home/user/itnode/node_modules/sharp`; per i fogli di confronto si compone con `sharp({create})` più `composite`.
  - L'ordine interno delle operazioni di sharp non segue quello delle chiamate: estrarre i canali dal buffer raw in JS.
  - Per un composite seguito da un resize servono due passaggi.
- **Misure tipografiche:** fontkit fallisce su `getVariation` con i WOFF2. Si misura in Chromium con Playwright globale (`/opt/node22/lib/node_modules/playwright`), aprendo un file HTML via `file://`: con `setContent` i font locali non si caricano.
- **Screenshot di pagine intere:** prima scorrere tutta la pagina e aspettare le immagini, altrimenti le `lazy` restano vuote. Con `reducedMotion: 'reduce'` reveal e aperture sono già aperti.
- **Prove in pagina sul sito Astro:** gli stili dei componenti sono scoped e pesano più di un selettore iniettato. Per emulare una correzione servono `!important` o un selettore più pesante, altrimenti la prova non si applica e sembra fallire.
- **Server con Brotli per misure:** `PORT=… node scripts/serve.mjs` serve `dist/` come in anteprima (in locale senza password).
- **Misura dello scambio di font:** evento `loadingdone` di `document.fonts` più rete emulata via CDP (`Network.emulateNetworkConditions`) e HTML intercettato con `page.route` per togliere un `<link>`.
- **Test visivi:** schizzi HTML in scratchpad più `npx playwright screenshot` a 1440 e 390 px, osservati con Read. Mostrano problemi che a memoria non si vedono: overflow dei numeri giganti su mobile, ambiguità I/l.
- **Misure durante lo scorrimento** (2026-09-29).
  - Il sito ha lo scroll fluido. Negli script servono `document.documentElement.style.scrollBehavior = 'auto'` e `scrollTo({ top, behavior: 'instant' })`, più due `requestAnimationFrame` prima di leggere; altrimenti `scrollY` non arriva al valore.
  - La striscia dell'orizzonte copre da −90° a 450°, quindi alcune etichette esistono due volte (Varese, Monopoli): si misura la copia più vicina alla finestra.
  - La traslazione si legge da `new DOMMatrix(getComputedStyle(strip).transform).m41`.

## Insidie scoperte sugli asset e sui font
- **Logo PNG:** completamente opaco, con fondo bianco (non trasparente); la «o» è un anello #3C71A5 con il vuoto spostato in alto a destra.
- **Foto evento:** la sovrimpressione con il simbolo ✦ in basso a destra può essere un segno di editing generativo. Chiedere sempre l'originale.
- **Foto del fondatore:** fondali generati (skyline e «reti luminose» con nodi). Una monocromia pesata sul canale blu li schiarisce; una maschera verso la carta li assorbe, ma non del tutto: in Contatti le linee a nodi restano come tracce dietro il braccio.
- **Sottoinsiemi latini @fontsource:** non includono → ↗ ≈ e spesso nemmeno ′ ″. Frecce in SVG, coordinate in gradi decimali.
- **La «I» maiuscola** di Schibsted Grotesk ha le grazie: è il motivo per cui è stato scelto (disambigua «Il SIII»). Con qualunque alternativa, verificare sempre la resa di «Il SIII».
- **Coordinate:** alcune erano arrotondate (Monopoli 40.95 · 17.3) e mostrate con 4 decimali. Controllare sempre gli zeri finali.

## Lezioni di processo
- **Prima di chiudere un deliverable, rileggere `docs/` per intero.** Altri membri lavorano in parallelo e possono aver registrato regole vincolanti nel frattempo: registro dei claim e decisioni DR nel brief consolidato, vincoli di motion e menu nella sitemap UX, elementi della hero nel copy deck. Il 2026-09-28 la bozza andava contro DR3, A4 e N5 e i vincoli UX, ed è stata riallineata prima della consegna.
- **Prima di decidere, `git log`.** La sessione principale applica correzioni mentre lavoro: al G4 i campi del form erano già stati sistemati da ui-designer (846f142) durante la mia review. Se un owner ha già deciso con un'analisi, si conferma, salvo un motivo forte e nuovo.
- **La build servita può essere più vecchia dei commit:** controllare l'ora di `dist/` e cercare nel bundle le correzioni attese prima di giudicarle.
- **Istruzioni in conflitto.** Quando un'istruzione della sessione principale confligge con una decisione aperta nel brief (per esempio «usare i ritratti» contro DR3), si danno il parere e le specifiche per entrambe le opzioni e si segnala il conflitto nella consegna.
- **Decidere su prove, non su stime.** Al G4 ogni decisione visiva (riga della hero, statement, maschere, campo visivo, cascata) è stata provata in pagina prima di scriverla, e due affermazioni sono state corrette dalla misura (Città Digitali a 200°, incroci delle etichette).
- **Le misure degli specialisti possono avere un punto cieco.** La rimisura del preload considerava solo la rete lenta; la misura su connessione veloce ha rovesciato la raccomandazione (ADR 005).
- **Confronti di laboratorio: almeno 6 corse per variante.** Con 3 corse le coppie oscillano da 106 a 361 ms, e la stima del ritardo del preload su `/siii/` passava da 201 a 282 ms. Lo stesso vale per i miei confronti visivi o temporali: poche corse fanno sembrare vicina una soglia che non lo è.
- **Anche le mie sintesi vanno ricalcolate.** Intervalli e rapporti che riassumono una tabella si calcolano dalla tabella, non a occhio. Nell'ADR 005 v1.0 due valori erano imprecisi: 100–280 ms invece di 72–280, e «3–6 volte» invece di 2,7–14. Li ha trovati web-performance-specialist.
- **Un testo attribuito a un altro documento va controllato lì.** Nella DV 0.1 «Scorri per esplorare» era indicato come testo «dal copy deck», ma il copy deck non l'ha mai previsto. L'errore si è propagato alla struttura UX e al design system.
- **I dati muovono la composizione.** Cambiando le coordinate (C11), il gruppo murgiano ha superato il centro mobile dell'orizzonte e la sua etichetta è uscita dal bordo (C14-1). Dopo ogni cambio di luoghi o coordinate vanno rimisurati centri ed etichette.
- **Scrivere una regola guardando la resa, non a memoria.** Al G4 ho scritto la regola del peso di `display-m` dichiarando il codice conforme, ma il testo metteva a 400 gli statement secondari che su `/siii/` sono Passaggi a 600. Se ne è accorta ui-designer. Le regole si scrivono dall'elenco degli usi reali.
- **Gli effetti legati allo scorrimento si giudicano nella finestra in cui si vedono.** Non basta il loro stato finale: conta il tratto in cui l'elemento è in vista sotto l'header sticky. ui-designer aveva visto Varese «entrare» alla fine della rotazione, quando l'orizzonte era già sotto l'header (R1). Inoltre un valore a riposo (il centro a 238°) sposta anche i momenti dell'animazione: dopo averlo cambiato si rimisurano tutti e due.
- **Un limite si scrive come l'invariante, non come un sostituto.** `max(60svh, 60vw)` dice «intervallo mai più corto della corsa, quindi velocità mai sopra la pagina» e vale in ogni finestra. `orientation: portrait` ci arrivava solo in parte. La proposta era di ux-designer ed è stata adottata.
- **Prima di estendere una correzione alle altre istanze di un componente, misurarle.** Avevo dato per scontato che l'orizzonte di Città Digitali andasse a 1,07 px/px in orizzontale come la Home. Invece ruota di +40° (prop `rotate`) e va a 0,71: la correzione nel componente non serviva.
- **Le review parallele non ancora committate contano.** `git status` mostra i file `??` in `docs/review/`: sono decisioni che altri membri stanno prendendo in quel momento. Il 2026-10-05 ux-designer ha deciso l'alternativa testuale della carta e copywriter-brand la legenda mentre scrivevo la DV. La mia prima stesura diceva «carta `aria-hidden`», con criteri di legenda già superati, ed è stata allineata prima della consegna.
- **Una legenda descrive il segno, non promette la completezza.** «Ogni punto è una città di Città Digitali» resta vera se l'elenco cresce. «Un punto per ogni città» è un claim quantitativo implicito. L'osservazione è di copywriter-brand: vale per ogni didascalia di dati.
- **Prima di aggiungere complessità, provare la leva semplice.** Per la terza classe di nomi a 1024 px ho abbassato la soglia nel generatore delle carte, in una copia nello scratchpad. La scelta dei nomi peggiorava, e la prova ha chiuso la domanda in pochi minuti.
- **Le regole «opzione principale / ripiego» funzionano.** Per le coordinate la fonte a 4 decimali non era raggiungibile: il ripiego a 2 decimali, scritto nella DV, ha chiuso C11 senza un nuovo arbitrato.

## Preferenze e feedback del cliente e dell'utente
- Nessun feedback diretto del cliente sul piano creativo. L'utente ha voluto vedere il sito online prima del G4 (anteprima su Railway, ADR 004).
- **Carta di Città Digitali (2026-10-05).** L'utente vuole mostrare tutte le città del progetto, anche fitte, con un punto per ognuna e il nome solo dove sta, e ha chiesto più nomi oltre ai tre delle linee guida. Preferisce l'estensione reale alla sintesi: tenerne conto anche per altre carte, come quella della Puglia se il cliente conferma le «30+ città».
- G1–G3 non sono mai stati approvati formalmente: il lavoro ha seguito il metodo delle linee guida (§34). Al G4 ho chiesto un'approvazione retroattiva. Aggiornare dopo la risposta dell'utente.
