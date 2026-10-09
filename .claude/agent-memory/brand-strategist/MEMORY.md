# Memoria di progetto · brand-strategist

Fatti, claim e domande al cliente stanno in `docs/brief/brief-consolidato.md`: qui solo lezioni di metodo e preferenze.

## Preferenze del cliente e del progetto
- Le linee guida (`docs/brief/linee-guida.md`) prevalgono sul processo generico di CLAUDE.md; metodo della loro §34 (Fasi 1–2 brevi, sviluppo subito dopo).
- Documenti sintetici e operativi: tabelle ed elenchi, niente saggi.

## Lezioni di metodo (2026-09-28)
- Rete: WebFetch bloccato per molti domini italiani (consiglio.puglia.it, giacomolenoci.it, leccesette.it, ttgitalia.com, oltre a itnode.it, portali *digitale.*, railway.app, LinkedIn, aprildunford.com). Funziona WebSearch: citare come «snippet» con URL e data, marcare [DA VERIFICARE].
- Prima di scrivere un claim su un'entità, cercare le omonimie: qui «Puglia Digitale» esiste anche come portale di un'associazione e come programma regionale; «Città Digitale» è un altro operatore.
- Controllare la provenienza di ogni asset: il simbolo ✦ in basso a destra è la filigrana di Gemini (trovato su due ritratti e sulla foto dell'evento). Immagini AI di eventi = rischio di veridicità, oltre che di AI Act art. 50.
- I claim del cliente possono contraddire fonti pubbliche (es. «ITnode ha creato Puglia Digitale»): registrarli come [DA VERIFICARE] con formulazione provvisoria, non scartarli né pubblicarli.

## Lezioni dall'audit di veridicità del sito (2026-09-28, Fase 5)
- Controllare sempre il JSON-LD in `dist/`: un claim ammorbidito nel testo visibile può sopravvivere in `Organization.description` o `brand` su tutte le pagine (qui «ha creato» in 7 pagine su 8).
- Coordinate del comune accanto al nome di un'impresa si leggono come posizione dell'impresa: nello showcase niente coordinate, o solo quelle fornite dall'impresa.
- Una foto «reale» passata da Gemini (✦) va trattata come i ritratti AI finché non arriva l'originale: se è usata come documento di un evento, la nota di trasparenza va anche lì.
- Numeri derivati da registri pubblici (partite IVA, quote del tessuto produttivo) non sono «Dati [cliente]»: serve «elaborazione [cliente] su dati [fonte], [anno]». Verificare la coerenza aritmetica tra numeri collegati.
- Contenuti non visionabili (video su domini bloccati) possono contenere claim esclusi dal registro: segnalarli come da visionare prima del go-live.
- Regola che funziona con la sessione principale: staging (non indicizzabile) con i testi del cliente e le domande allegate; go-live solo con conferma scritta oppure con il testo di riserva già scritto nella review.
- Budget di circa 35 chiamate: leggere prima dati e pagine (`src/data`, `src/pages`), poi grep mirati su superlativi e JSON-LD in `dist/`, e guardare solo le immagini con persone o eventi.

## Lezioni da ADR 002 v0.2 e coordinate (2026-09-28, G4)
- Rete, oltre ai blocchi già noti: bloccati Wikidata (www, query), OSM (nominatim, overpass, api), Wikipedia (it, en), geohack, GeoNames, tuttitalia, comuni-italiani. Il README del proxy (`/root/.ccr/README.md`) vieta di aggirare un blocco di policy con mirror: leggerlo PRIMA di provare servizi alternativi, poi segnalare gli host e passare a WebSearch.
- WebSearch dà un riassunto, non il testo: per i comuni restituisce il riquadro di Wikipedia (en), quasi sempre al primo d'arco (~1,8 km); i risultati «X - Wikidata» danno il QID. Non mettere valori ipotetici nella query: il riassunto li «corregge» ma inquina la lettura.
- Precisione e rilevamenti: un'incertezza di 1 km su un luogo a 6–7 km vale circa ±10° di rilevamento. Per l'orizzonte servono fonti precise (nodi OSM), non coordinate al primo d'arco.
- Niente Bash in questo ruolo: i calcoli si fanno a mano. Validare prima il metodo riproducendo i valori già pubblicati; vicino a x,5° serve la correzione sferica (−Δλ/2 · sin φm) o la formula esatta.
- Un dato del sito può essere duplicato in più file (qui coordinate in site.ts, asset-slots.ts, generate-maps.mjs, og-card.html): cercarlo con grep su tutto il repository ed elencare ogni occorrenza quando si propone un cambio.
- ADR sottoposti all'utente: citare file e righe del codice verificati e scrivere le riserve per esteso (testo esatto, trigger, stato nel codice). L'utente approva parole, non rimandi a una review.
- WebSearch con `allowed_domains` = un solo sito: è il modo per garantire «fonte unica» su più voci. Per le coordinate dei comuni espone valori solo en.wikipedia (primo d'arco); tuttitalia e it.wikipedia hanno le pagine ma l'indice non mostra i numeri; GeoNames a macchia.
- I riassunti di WebSearch inventano cifre: GeoNames «Monopoli 40.7409» (23 km di errore) e valori proposti «a memoria». Un numero letto così si usa solo se supera un controllo incrociato con una serie indipendente; dichiararlo nel deliverable.
- Il link diretto all'API Overpass, aperto dall'utente da browser, ha risposto 406: per OSM proporre l'interfaccia overpass-turbo.eu, non l'URL dell'API.
- Verificare dati pubblicati senza browser (localhost non raggiungibile): grep su `dist/**/*.html` con una regex che prende ogni occorrenza del formato (qui `\d+\.\d+°` seguito da N, S, E o O), più i valori vecchi, più i formati alternativi (virgola decimale, testo per screen reader); l'immagine social si guarda con Read. Contare le occorrenze attese (per esempio la firma del footer in tutte e otto le pagine).
- `dist/` è la build di staging: le varianti «in pubblicazione» (`PUBLIC_SLOT_MODE=publish`) non ci sono. Verificarle per calcolo e rimandare la verifica a vista alla build di produzione.
- Dopo un cambio di dati, controllare i commenti vicini: qui il commento del tipo `Place` diceva ancora «4 digits».

## Lezioni dall'elenco delle città di Città Digitali (2026-10-05)
- Distinguere gli errori di WebFetch: «EGRESS_BLOCKED» = blocco di policy (non riprovare, non aggirare); «ENOTFOUND» = il dominio non si risolve, quindi un possibile link morto da segnalare. Così è emerso che il portale delle LG (cittadigitali.it, senza accento) non esiste più ed è un omonimo.
- Per ogni dominio del cliente provare anche la variante con l'accento (IDN, punycode `xn--…`). WebSearch accetta il punycode in `allowed_domains`.
- I portali del cliente contengono dati utili anche ad altri dossier: pagine «dati aziendali» (REA, PEC) e «chi siamo» (ruoli). Segnalarli come piste `[DA VERIFICARE]`, senza applicarli.
- Controlli su un elenco letto da un riassunto: il numero dichiarato dalla fonte deve coincidere con i nomi elencati; le pagine trovate una per una devono essere tutte nell'elenco. Le ricerche che contengono già i nomi tendono a confermarli per eco: valgono poco.
- Coordinate in serie: se due comuni risultano con lo stesso valore (Martina Franca = Mottola), il valore è da scartare. Nessun sostituto «a memoria».
- Per tante voci (45 città) conviene WebSearch a gruppi di 9 in parallelo, una città per ricerca, con `allowed_domains` = en.wikipedia.org; poi un'appendice con i dati pronti, controllata riga per riga con la tabella.
- WebSearch con `allowed_domains` = wikidata.org espone P625 e i quattro punti estremi del comune (P1332–P1335): è la fonte di riserva più solida quando Wikipedia en è incoerente. I punti estremi permettono un controllo forte: il centro deve cadere dentro il territorio. Così il valore sbagliato (Mottola) è caduto fuori di 11 km.
- Prima di mescolare due fonti, verificarne l'accordo su due comuni vicini (qui ≤ 1′, cioè meno di 2 km) e chiedere l'eccezione all'owner della regola (creative-director, DV §1.4).
- Le risposte dell'utente vanno registrate subito anche nel brief consolidato: glossario, omonimie e righe del registro (qui S4, S7), con la data della conferma.
- Quando una conferma chiude un'ipotesi, propagarla in tutti i punti che la citano (registro N, materiali P, ipotesi I, domande D, note di sintesi) e cercarli con grep, non a memoria. Nel deliverable l'ipotesi chiusa passa a una riga «chiuse il …».
- La data dei dati di un numero di prima parte può essere «vera per costruzione»: mese della consultazione della fonte primaria più la data della conferma dell'utente. Proporla come opzione, ma la decisione resta all'utente o al cliente.

## Lezioni dalla hero di /siii/ (2026-10-08, Fase 5)
- Se il coordinatore ferma l'incarico (l'utente cambia asset): annullare con Edit inversi usando il testo originale letto all'inizio, poi grep per verificare che non resti traccia. Non scrivere sull'asset scartato nemmeno dopo.
- Un asset dell'utente che non viene dalle LG porta tre questioni distinte: chi l'ha realizzato (implicito non è dichiarato: registrare le parole esatte), identità (nome ufficiale e comune, che servono alla riga con il nome della DV §4.8), consenso. Un testo di consenso che dice «realizzato da ITnode» chiude anche la paternità.
- La lettura di un logo non è un nome ufficiale. Un nome tutto maiuscolo uguale a una parola inglese («YES») può essere letto come parola dagli screen reader: proporre «con il logo X» finché non è confermato.
- Prima di dire che logo o menu sono «nell'immagine», controllare l'ancoraggio del ritaglio dei telefoni (in alto o in basso): l'alt deve valere per tutti i ritagli.
- Controlli di go-live con un solo interruttore per più entità (consensi): proporli per entità, con chiave dal prefisso del file, e far fallire le chiavi non elencate.
- Patch per la sessione principale: «scratchpad/» è la scratchpad condivisa della sessione (`/tmp/claude-0/-home-user-itnode/<sessione>/scratchpad`, dove c'è `siii-lcp/`). Write toglie lo spazio delle righe di contesto vuote: `git apply` le accetta, ma va detto e va chiesto `git apply --check`.
- Il Contesto di un ADR invecchia (l'anteprima era «protetta», poi è stata aperta): rileggerlo a ogni nuova versione.
- Piccole imprese locali: spesso non hanno traccia indicizzata. Quattro ricerche bastano; i risultati spuri (pagine di città dei portali) non sono piste.
- Le riserve si scrivono per posto, non solo per impresa: hero di `/siii/` e capitolo 01 della Home hanno ciascuno la sua cascata (vista approvata in precedenza con consenso, poi variante «in pubblicazione» senza nomi non autorizzati).
- Un alt che dice «Il SIII di [impresa]» è un'affermazione in parole: la paternità (A8) pesa più che per un'immagine muta. Segnalarlo.
- Prima di riprendere un incarico dopo altri commit, leggere il log (`.git/logs/HEAD`) e le review nuove: qui patch già applicata, alt definitivo e verdetto del creative-director avevano cambiato i fatti da citare.
- Tenere stabili i numeri di sezione citati da altri (§4 degli input, citato dal creative-director): aggiornare in loco con «Stato» e aggiungere le novità in una sezione nuova, con versione 1.1.
- Grafia dei nomi che iniziano con l'articolo: nel testo la preposizione si unisce all'articolo («della Tana di Aldo», come `alt-text.md` 1.11); il nome da solo resta «La Tana di Aldo». Applicarla in tutti i miei documenti insieme, lasciando le citazioni storiche marcate come tali.
- Quando un alt passa da provvisorio a definitivo, o altri membri chiudono punti che avevo aperto, aggiornare subito gli stati e le «Decisioni richieste» di ADR, brief e review: le correzioni di stato arrivano spesso da chi legge l'ADR.

## Lezioni dall'immagine della basilica (2026-10-09)
- Identificare un luogo da un'immagine: tabella «elemento descritto / nell'immagine» contro descrizioni pubbliche (Wikipedia it via WebSearch con `allowed_domains`, schede storico-artistiche). Esito massimo: «molto probabile», mai «confermato». Conferma = una riga dell'utente o una fonte sull'immagine stessa. Il nome del file non è una fonte.
- Immagini di monumenti usate da un'impresa: segnalare l'art. 108 del D.Lgs. 42/2004 (canone per le riproduzioni a scopo di lucro dei beni in consegna pubblica) come domanda per il consulente legale, ed estenderla alle immagini simili già nel sito.
- Senza provenienza nota, la riserva minima è «fuori al go-live» (diritti, linee guida §31 sulle immagini stock). Con la provenienza dal portale del cliente vale lo stesso trattamento delle immagini dell'ADR 007.
- Quando un'immagine sostituisce un'altra su una pagina, aggiornare le righe dell'ADR che citavano la vecchia (qui la foto dell'evento su Puglia Digitale) e verificare su `dist/` che anche la sua nota sia sparita.
- Tabelle Markdown: se si inserisce una riga in fondo a una tabella seguita da un paragrafo, niente riga vuota tra l'ultima riga e quella nuova. Controllare con grep le righe `^| ID |`.

## Lezioni dalla risposta «tutto autorizzato» (2026-10-09)
- Una risposta globale dell'utente chiude i permessi (consensi, diritti), non i dati (nomi ufficiali, comuni, luoghi, uso di AI). Registrarla con la citazione esatta e la data, e con una tabella «che cosa chiude / che cosa resta aperto / effetto sul sito».
- Un fatto (chi ha realizzato un lavoro) non si deduce da un'autorizzazione. Si può accettare come conferma implicita solo se la risposta arriva a una domanda che lo chiedeva esplicitamente e il rischio di sbagliare è basso. Va marcato `[DA VERIFICARE, non bloccante]`, con una riga esplicita consigliata.
- Una regola condizionata (il consenso conferma la paternità «se dato sul testo del §3.2») non si applica se non si conosce il testo usato. Dirlo, invece di applicarla per comodità.
- Consensi: nel repository solo il registro (impresa, data, forma, custode), mai le email o i documenti, che contengono dati personali. Prevedere la revoca: la riga torna «Revocato», la chiave torna `false`, vale il ritiro immediato.
- Un «vai» dell'utente su un tema non chiude le altre condizioni del gate: dirlo in una riga, senza allargare l'incarico.
