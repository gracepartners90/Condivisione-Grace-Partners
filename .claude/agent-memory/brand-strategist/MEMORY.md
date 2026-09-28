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
