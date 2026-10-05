---
titolo: Copy deck · SIII (Siti Interattivi Immersivi)
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer]
stato: in revisione
versione: 1.2
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/decisioni/002-veridicita-staging-e-immagini-ai.md (riserve di go-live), docs/brief/brief-consolidato.md, docs/seo/mappa-keyword-url.md, docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md, docs/contenuti/tone-of-voice.md (§6), docs/contenuti/microcopy.md (§4), docs/creativa/direzione-visiva.md (§7.4, §7.8), docs/ux/struttura-pagine.md (0.5, §2), docs/review/2026-09-28-sito-bozze-copywriter-content.md (S1–S3), docs/review/2026-09-28-sito-accessibilita-ux-designer.md (§4: T6, T11), docs/review/2026-09-28-sito-verifica-accessibilita-ux-designer.md (A7), docs/review/2026-09-28-sito-veridicita-brand-strategist.md (I7), src/pages/siii.astro, src/lib/structured-data.ts, src/data/site.ts, src/data/asset-slots.ts, src/data/pages.ts, staging http://localhost:4321 del 2026-10-05 (commit c98f565)]
---

# Copy deck · SIII

Pagina `/siii/`. Copre le sezioni 10, 11 e 12 delle linee guida (LG), la chiusura e l'introduzione al form (§23). I testi sono pronti da impaginare.

**Novità della v1.2 (2026-10-05)**
- **Verifica sul sito costruito.** Il documento ora descrive la pagina com'è: hero senza occhiello, frecce ↓ sulle CTA che portano al form, testi della figura di confronto e marquee dei verbi, ponte prima della chiusura, «Richiedi un’offerta» come titolo del form, anteprima immersiva non al lancio.
- **Beneficio 03** in due frasi, come nel sito: la correzione che avevo proposto nella review di bozze del 2026-09-28 (S3).
- **Riserve di go-live** dell'ADR 002 che toccano questa pagina (I7, I8, A7), annotate nelle sezioni 3–6, con una proposta per la didascalia della figura.
- Le differenze ancora aperte sono nella sezione «Verifica sul sito».

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag** (H1, H2, H3, p, a, button): indica il livello semantico, non la dimensione visiva. Un H2 può essere piccolo come un'etichetta e uno statement in `<p>` grande come un titolo.
- **max**: lunghezza massima consigliata in caratteri, spazi inclusi. Tiene conto della scala della §04 (H1 fino a 150 px, titoli di sezione fino a 100 px, minimo 44 px su mobile). Oltre questa soglia il testo va a capo troppe volte su uno schermo da 390 px.
- **verbatim**: frase fornita dalle LG. Si cambia solo l'apostrofo tipografico (’).
- **Frecce** (tone of voice §6): → altra pagina del sito, ↓ più in basso nella stessa pagina (form compreso), ↗ sito esterno in nuova scheda. Sono icone decorative (`aria-hidden="true"`). Delle CTA del cliente cambia solo l'icona, mai le parole.
- **Link esterni**: `target="_blank" rel="noopener"`. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3) e aggiunge destinazione e «(si apre in una nuova scheda)» con testo visivamente nascosto. Tre CTA con lo stesso testo visibile hanno nomi accessibili diversi (WCAG 2.4.4).
- **Fonti che prevalgono nel loro dominio**: brief consolidato (fatti e claim), mappa keyword→URL (heading, metadati, blocchi di risposta), strategia di conversione (CTA, ancore, form). Le differenze sono elencate in «Allineamenti».
- **Microcopy del form** (etichette, errori, stati, consenso): copywriter-brand e strategia di conversione §8.

## Metadati

Fa fede `docs/seo/mappa-keyword-url.md` §2 (owner seo-content). Copia per comodità:

| Campo | Testo | Limite |
|---|---|---|
| Title | SIII, Siti Interattivi Immersivi oltre il tour 360° \| ITnode | ≤ 60 |
| Meta description | Il SIII replica gli spazi della tua azienda in un ambiente da esplorare da desktop e smartphone: hotspot, prodotti, video, richieste e prenotazioni. | 140–155 |
| Breadcrumb | Home › SIII | — |

`og:title` e `og:description` seguono le specifiche tecniche: title senza suffisso, description uguale alla meta. Title, meta e breadcrumb coincidono con il sito (`src/data/pages.ts`, staging del 2026-10-05).

## Struttura della pagina

Le sezioni tengono la numerazione delle versioni precedenti, perché altri documenti la citano. L'ordine con cui compaiono nel sito è nella prima colonna.

| Ordine nel sito | Sezione del copy deck | Ancora | Componente |
|---|---|---|---|
| 1 | 1. Hero | — | Hero `line`, con la soglia dell'anteprima a destra |
| 2 | 2. Cos’è un Sito Interattivo Immersivo | `#cos-e` | H2 piccolo, definizione, statement |
| 3 | 3. Tour 360° o Sito Interattivo Immersivo? | `#tour-360` | Statement, figura a due stati e tabella di confronto |
| 4 | 4. Cosa si può fare dentro un SIII | `#cosa-si-puo-fare` | Statement, marquee dei verbi, elenco tipografico, niente card |
| 5 | 5. Perché scegliere un SIII | `#benefici` | BenefitsSection `zigzag` |
| 6 | 6. Entra. Esplora. Interagisci. | `#esempi` | Tre soglie Schermo 16:10, con schermata e link |
| 7 | 8. Gli altri mondi ITnode | — | Bridge: riga editoriale con due link |
| 8 | 7. Chiusura e form | `#chiusura`; form `#richiesta` | CTASection `form` + ContactForm |

Nota: il ponte viene prima della chiusura (`struttura-pagine.md` SI-7): il form resta l'ultima sezione della pagina. Nella v1.1 proponevo il ponte dopo il form.

## 1. Hero

**Eyebrow.** Non c'è. Sulle pagine interne il breadcrumb («Home / SIII») prende il posto dell'occhiello: è una decisione della sessione principale (direzione visiva §7.8; review di accessibilità del 2026-09-28, T11). La v1.1 proponeva l'occhiello «Esperienze immersive per aziende»: non va reintrodotto senza una nuova decisione.

**H1** · verbatim · max 32 in totale (riga 1: 4, riga 2: 26) · due righe nello stesso H1: «SIII» alla scala piena, «Siti Interattivi Immersivi» più piccola
> SIII\
> Siti Interattivi Immersivi

**Statement** · p · verbatim · max 50 · due registri: «Non raccontare la tua azienda.» e «Falla esplorare.»
> Non raccontare la tua azienda. Falla esplorare.

**CTA primaria** · a → `#esempi` · max 28 · `cta_id` siii-hero-esempi
> Esplora gli esempi ↓

**CTA secondaria** · link testuale → `#richiesta` · verbatim · `cta_id` siii-hero-offerta
> Richiedi un’offerta ↓

Note:
- La seconda riga dell'H1 non può stare alla scala piena: «Interattivi» (11 caratteri) a 64 px supera la larghezza utile di uno schermo da 390 px. Tra le due righe c'è un separatore nascosto alla vista (`<span class="sr-only"> – </span>`): il nome accessibile dell'H1 è «SIII – Siti Interattivi Immersivi» (review di accessibilità del 2026-09-28, T6).
- Nessun paragrafo nella hero: la definizione arriva subito dopo.
- CTA confermate dalla strategia di conversione §4: la prova più forte del SIII è provarlo. La CTA secondaria porta al form della stessa pagina, quindi la sua icona è ↓, non →; le parole del cliente restano identiche (tone of voice §6, regole 3 e 4).
- **Visual.** A destra una soglia 3:5 con lo slot `siii-anteprima` (un'esperienza SIII vista da smartphone) e tre nodi hotspot decorativi. [DA FORNIRE: schermata, almeno 1200 × 2000 px] Finché manca, il segnaposto è nascosto agli screen reader. Il testo alternativo per quando arriva è in `docs/contenuti/alt-text.md`.

## 2. Cos’è un Sito Interattivo Immersivo

**H2** · max 45 · resa piccola, da etichetta
> Cos’è un Sito Interattivo Immersivo

**Testo** · p · blocco di risposta B · max 420
> Un Sito Interattivo Immersivo (SIII) replica digitalmente gli spazi fisici di un’impresa e li trasforma in un ambiente navigabile da desktop e da smartphone. Chi lo visita non legge una pagina: entra, esplora gli ambienti e trova al loro interno prodotti, video, informazioni e azioni commerciali. È la soluzione di ITnode per le aziende che, invece di raccontarsi, vogliono farsi esplorare.

**Statement** · p · max 45 · resa grande
> Il sito diventa un luogo.

Note:
- Il Testo è il primo paragrafo sotto l'H2, nell'HTML statico, senza elementi in mezzo: è il testo che AI Overviews e motori di risposta estraggono. Lo statement viene dopo.
- Nel sito il Testo viene da `siiiDefinition` (`src/lib/structured-data.ts`), lo stesso che alimenta i dati strutturati: si corregge in un punto solo.
- Rispetto al Blocco B della mappa SEO, la seconda frase è accorciata: l'elenco completo delle funzioni è nella sezione 4, subito sotto. I fatti non cambiano.

## 3. Tour 360° o Sito Interattivo Immersivo?

**H2** · max 45 · resa piccola, da etichetta
> Tour 360° o Sito Interattivo Immersivo?

**Testo** · p · blocco di risposta C · max 500
> Un tour 360° è pensato soprattutto per mostrare un ambiente: chi lo visita si guarda intorno e passa da un punto di vista all’altro. Un Sito Interattivo Immersivo (SIII) parte dall’esplorazione degli spazi, ma è un sito a tutti gli effetti. Nell’ambiente si interagisce con hotspot, prodotti e video, e da lì si chiedono informazioni, si prenotano servizi e si accede ad azioni commerciali. Il tour 360° fa vedere uno spazio; il SIII lo trasforma in uno strumento commerciale sempre accessibile.

**Statement** · p · max 50 · resa grande · due registri
> Un tour 360° è una visita. Un SIII è un sito.

**Figura di confronto** · `figure` con un interruttore a due stati (pulsanti radio, funziona anche senza JavaScript)
| Elemento | Testo |
|---|---|
| Legenda dell'interruttore (`legend`, visivamente nascosta) | Che cosa mostrare nella figura |
| Opzione 1 (radio) | Tour 360° — guardi |
| Opzione 2 (radio, selezionata) | SIII — agisci |
| Didascalia nello stato «Tour 360°» (`figcaption`) | Nel tour 360° chi visita si guarda intorno e passa da un punto di vista all’altro. |
| Didascalia nello stato «SIII» (`figcaption`) | Nel SIII chi visita interagisce con gli hotspot, vede prodotti e video, chiede informazioni e prenota. |
| Etichette dei punti nello schermo (`aria-hidden`) | Prodotto · Video · Informazioni · Prenotazione |
| Riga mono nello stato «Tour 360°» (`aria-hidden`) | Tour 360° · ti guardi intorno |
| Riga mono nello stato «SIII» (`aria-hidden`) | SIII · apri, esplori, chiedi, prenoti |

**Tabella di confronto** · table · copy · celle max 120
| | Tour 360° | Sito Interattivo Immersivo (SIII) |
|---|---|---|
| A cosa serve | Soprattutto a mostrare un ambiente. | A far esplorare l’impresa e a trasformare la visita in una richiesta, una prenotazione o un’azione commerciale. |
| Cosa fa chi visita | Si guarda intorno e passa da un punto di vista all’altro. | Esplora gli ambienti, interagisce con gli hotspot, vede prodotti e video. |
| Azioni previste | Di norma rimanda ad altri canali. | Richiede informazioni, prenota servizi, accede ad azioni commerciali. |
| Ruolo | Un contenuto da guardare. | Uno strumento commerciale sempre accessibile. |

Note:
- **Figura.** È la composizione della direzione visiva (§7.4, riga 3): una schermata 16:10 con un orizzonte graduato, che nello stato «SIII» mostra i punti interattivi. Il trattino lungo delle due opzioni lo disegna il CSS, e il nome accessibile lo comprende. Gradi, etichette dei punti e righe mono sono decorativi; ciò che serve lo dicono la didascalia e la tabella. I testi li ho rivisti nella review di bozze del 2026-09-28 (S2: «apri, esplori, chiedi, prenoti», al posto di «guardi», per non indebolire il contrasto con il tour 360°).
- **Veridicità.** La didascalia dello stato «SIII» descrive la categoria, come la tabella. Vale la stessa riserva sulle funzioni sempre incluse (review di veridicità, I7; brief N13; condizione C06 del verdetto G4). Se al go-live si applica la riserva I7 (ADR 002), propongo che la didascalia segua la frase della Home rifinita da copywriter-brand: «Nel SIII chi visita interagisce con gli hotspot, vede prodotti e video, chiede informazioni e, dove previsto, prenota.» (118 caratteri). Decide brand-strategist, owner del registro dei claim.
- Tabella HTML vera (`<table>`, `<th scope="col">`, `<th scope="row">`), con ruoli ARIA espliciti e `<caption>` visivamente nascosta: «Differenze tra tour 360° e Sito Interattivo Immersivo». Su mobile le righe si impilano e ogni cella ripete l'intestazione di colonna.
- Il Testo è il Blocco C della mappa SEO, con le frasi spezzate per la leggibilità (Gulpease) e «da lì» per la prenotazione (N13). Righe e contenuti della tabella sono quelli della mappa SEO §3.2, con ritocchi di stile. Il confronto riguarda la categoria, non concorrenti. Le formule prudenti («soprattutto», «di norma») restano: molti tour 360° hanno punti interattivi. I criteri vanno confermati da ITnode (brief D4).
- «Da lì si prenotano servizi»: la prenotazione parte dall'ambiente, anche se si conclude su un sistema esterno (brief N13).

## 4. Cosa si può fare dentro un SIII

**H2** · max 45 · resa piccola, da etichetta
> Cosa si può fare dentro un SIII

**Statement** · p · max 45 · resa grande
> Una visita che diventa azione.

**Marquee** · decorativo (`aria-hidden`) · verbi presi dall'elenco qui sotto
> Esplora · Interagisci · Guarda · Richiedi · Prenota

**Introduzione all’elenco** · p · max 60
> Nel tuo SIII, chi ti visita può:

**Elenco** · ul · copy
| # | Azione (grande) · max 36 | Complemento (piccolo) · max 55 |
|---|---|---|
| 1 | Esplorare gli ambienti | spostandosi liberamente da uno spazio all’altro. |
| 2 | Interagire con gli hotspot | i punti attivi che aprono contenuti e azioni. |
| 3 | Vedere i prodotti | nello spazio in cui li proponi. |
| 4 | Guardare i video | dentro l’esperienza. |
| 5 | Richiedere informazioni | nel momento in cui nasce l’interesse. |
| 6 | Prenotare i servizi | mentre li sta scoprendo. |
| 7 | Accedere alle azioni commerciali | che hai scelto di proporre. |

Note:
- Le sette azioni sono quelle della §10, con i soli articoli aggiunti. Il complemento spiega l'azione senza aggiungere funzioni.
- Markup: `<ul>`, con azione e complemento nello stesso `<li>`. Resa: elenco tipografico, non sette card con icona.
- Tra azione e complemento c'è una virgola nascosta alla vista (`sr-only`): lo screen reader legge «Interagire con gli hotspot, i punti attivi…» (review di bozze, S1). In Chromium il nome calcolato ha uno spazio prima della virgola; non si sente, ed è il caso che ux-designer ha deciso di non toccare (verifica di accessibilità, A7).
- **Marquee.** Cinque delle sette azioni, all'imperativo, come chiede la direzione visiva (§7.4, riga 4: nessun verbo può promettere più di quanto il SIII fa). È decorativo: lo screen reader legge l'elenco.
- **Riserva di go-live I7** (ADR 002, in stato di proposta). Se il cliente non conferma che tutte le funzioni sono sempre incluse, l'introduzione diventa «Nel tuo SIII, in base alle funzioni che scegli, chi ti visita può:». Ha 66 caratteri, oltre il massimo di 60: l'a capo va provato a 390 px quando si applica.

## 5. Perché scegliere un SIII

**H2** · max 45
> Perché scegliere un SIII

**Beneficio 01** · H3 · verbatim · max 45
> Fiducia istantanea

**Testo 01** · p · max 180
> Chi entra nei tuoi spazi online sa già cosa troverà dal vivo. Mostrare il luogo reale, così com’è, crea fiducia fin dal primo contatto.

**Beneficio 02** · H3 · verbatim · max 45
> Più coinvolgimento

**Testo 02** · p · max 180
> Un ambiente da esplorare invita a restare. Chi visita sceglie il percorso, apre i contenuti e si sofferma sui dettagli che preferisce.

**Beneficio 03** · H3 · verbatim · max 45
> Vendita diretta

**Testo 03** · p · max 180
> Prodotti e servizi si mostrano nel loro contesto reale. E il passo successivo parte dallo stesso ambiente: una richiesta, una prenotazione, un’azione commerciale.

**Beneficio 04** · H3 · verbatim · max 45
> Uno strumento commerciale sempre accessibile

**Testo 04** · p · max 180
> Il tuo spazio resta aperto anche quando la sede è chiusa, da desktop e da smartphone. E per farlo visitare a un cliente basta un link.

**CTA dopo i benefici** · a → `#richiesta` · verbatim · `cta_id` siii-benefici-offerta
> Richiedi un’offerta ↓

Note:
- Numerazione 01–04 decorativa (`aria-hidden="true"`).
- Solo benefici qualitativi (§11; brief N6, N9): niente «5–10 volte più tempo», niente «migliore posizionamento Google». Se arriva un dato documentato, si aggiunge sotto il beneficio con il modulo «Dato documentato» di Città Digitali (valore, etichetta, fonte, periodo).
- «Vendita diretta» dice che il passo successivo «parte» dall'ambiente, non che l'acquisto avvenga dentro il SIII (brief N13). Riserva di go-live I7 (ADR 002): se il cliente non conferma che prenotazione o vendita partono dall'esperienza, il titolo diventa «Dalla visita alla vendita»; il testo non cambia. Il Testo 03 è in due frasi dalla review di bozze del 2026-09-28 (S3): una frase di 25 parole aveva Gulpease 44, così è a 57, con le stesse parole.
- «Uno strumento commerciale sempre accessibile» (44 caratteri) è il titolo più lungo: su mobile va su tre righe alla scala H3.
- La CTA dopo i benefici è nel sito, come pulsante secondario (`ghost`).

## 6. Entra. Esplora. Interagisci.

**Eyebrow** · p · max 36
> Esempi

**H2** · verbatim · max 45 · tre registri a cascata
> Entra. Esplora. Interagisci.

**Testo** · p · max 140
> Tre Siti Interattivi Immersivi già online. Aprili ed esplorali, da desktop o da smartphone.

**Schede degli esempi** · copy · una colonna per esempio
| Campo | Esempio 1 | Esempio 2 | Esempio 3 |
|---|---|---|---|
| Nome · H3 · max 30 | Masseria Santella | Maison Miminà | D.L. Natura Dentro |
| Luogo · p · max 30 | Cassano delle Murge (BA) | Monopoli (BA) | Acquaviva delle Fonti (BA) |
| Portale · p · max 30 | cassanodigitale.it | monopolidigitale.it | acquavivadigitale.com |
| Frase · p · max 90 | Varca l’ingresso di una masseria e attraversane gli spazi, ambiente dopo ambiente. | Entra in Maison Miminà e scoprine gli ambienti come se fossi lì. | Muoviti negli spazi di D.L. Natura Dentro senza spostarti da dove sei. |
| CTA · a · verbatim | Entra nell’esperienza ↗ | Entra nell’esperienza ↗ | Entra nell’esperienza ↗ |
| Nome accessibile della CTA | Entra nell’esperienza di Masseria Santella (si apre in una nuova scheda) | Entra nell’esperienza di Maison Miminà (si apre in una nuova scheda) | Entra nell’esperienza di D.L. Natura Dentro (si apre in una nuova scheda) |
| URL | https://www.cassanodigitale.it/masseriasantella/ | https://www.monopolidigitale.it/maisonmimina/ | https://www.acquavivadigitale.com/dielle/ |
| `cta_id` | siii-showcase-masseria-santella | siii-showcase-maison-mimina | siii-showcase-dl-natura-dentro |
| Immagine (slot) | `siii-masseria-santella` | `siii-maison-mimina` | `siii-dielle` |

**Anteprima immersiva (predisposta, non al lancio)** · solo con l'iframe caricato al clic (`src/scripts/immersive.ts`)
| Campo | Esempio 1 | Esempio 2 | Esempio 3 |
|---|---|---|---|
| Pulsante · button · max 24 | Avvia l’anteprima | Avvia l’anteprima | Avvia l’anteprima |
| Nome accessibile del pulsante | Avvia l’anteprima di Masseria Santella | Avvia l’anteprima di Maison Miminà | Avvia l’anteprima di D.L. Natura Dentro |
| Nota sotto il pulsante · p · max 70 | L’anteprima carica contenuti da cassanodigitale.it. | L’anteprima carica contenuti da monopolidigitale.it. | L’anteprima carica contenuti da acquavivadigitale.com. |
| Titolo dell’iframe (`data-embed-title`) | Anteprima interattiva di Masseria Santella | Anteprima interattiva di Maison Miminà | Anteprima interattiva di D.L. Natura Dentro |

Note:
- Le frasi usano solo ciò che è noto: nome, luogo e il fatto che si tratta di un SIII. «Masseria» è nel nome della struttura. Non attribuire settori, servizi o risultati finché il cliente non li fornisce.
- Nel sito luogo e portale stanno sulla stessa riga mono, sotto il nome.
- Luogo di Masseria Santella: il dominio dice solo «Cassano», ma Cassano delle Murge risulta da più schede pubbliche della struttura (brief §8). [DA VERIFICARE con il cliente]
- Le schermate mancano: i segnaposto sono nascosti agli screen reader e, nella variante «in pubblicazione», non ripetono nome e luogo, che sono già nel testo accanto. [DA FORNIRE]
- **Riserve di go-live** (ADR 002, in stato di proposta). I8: un'esperienza che al lancio non risponde si toglie, e «Tre Siti Interattivi Immersivi già online» si adegua al numero vero. A7: senza il consenso delle imprese, nessuna schermata delle loro esperienze; restano la variante «in pubblicazione», i nomi e i link (LG §12).
- **Anteprima immersiva: non al lancio.** Al lancio ci sono schermata e link (`struttura-pagine.md` SI-6). Il pulsante compare solo da 1024 px, e solo dopo tre verifiche: i portali permettono l'incorporamento, non impostano cookie non tecnici senza consenso, il viewer non trattiene il focus. Quando si attiva, ux-designer chiede anche un pulsante «Chiudi l’anteprima» subito dopo l'iframe. La nota sotto il pulsante serve alla trasparenza, perché l'anteprima carica un sito di terze parti (vedi Rischi).

## 7. Chiusura e form

**H2** · verbatim · max 45
> La tua azienda può diventare un’esperienza.

**Titolo del form** · H3 · verbatim · senza link e senza freccia · ancora `#richiesta`
> Richiedi un’offerta

**Introduzione del form** · p · max 160
> Raccontaci il tuo spazio: ti ricontattiamo per capire cosa far esplorare e prepararti un’offerta.

Note:
- **La CTA delle LG è il titolo del form.** Il form sta accanto allo statement su desktop e subito sotto su mobile: un pulsante che fa scorrere di pochi pixel sarebbe inutile (strategia di conversione §5; `struttura-pagine.md` SI-8). La v1.1 la prevedeva come link, con `cta_id` siii-chiusura-offerta: nel sito non esiste.
- «Mi interessa»: SIII preselezionato in build (`form_id` richiesta-siii). È un dato di contesto, non un consenso. La casella privacy resta sempre vuota. Pulsante: «Invia richiesta» (§23). Verificato sullo staging del 2026-10-05.
- Microcopy del form (copywriter-brand, `microcopy.md` §4): sotto «Messaggio» il suggerimento «Che spazio vorresti far esplorare? Per esempio una struttura ricettiva, un negozio, uno showroom.»; dopo l'invio, l'azione «Torna agli esempi».
- Parola lunga nel titolo: «un’esperienza.» è un blocco di 14 caratteri, al limite a 44 px su 390 px. Prevedere `hyphens: auto` con `lang="it"` o una scala minima leggermente più bassa.

## 8. Gli altri mondi ITnode

**H2** · max 36
> Gli altri mondi ITnode

**Testo** · p · max 130 · due link interni
> Dalla singola impresa all’intero territorio: la stessa visione si ritrova in Puglia Digitale e Città Digitali.

Link: «Puglia Digitale» → `/puglia-digitale/`; «Città Digitali» → `/citta-digitali/`. La frase riprende la §35 («tre applicazioni concrete della stessa visione») senza dire chi ha creato i progetti (brief A1). Nel sito l'H2 è in `label` e la sezione sta dopo gli esempi, prima della chiusura (`struttura-pagine.md` SI-7).

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Hero | Esplora gli esempi ↓ | `#esempi` |
| Hero, sezione 5 | Richiedi un’offerta ↓ | `#richiesta` |
| Sezione 8 | Puglia Digitale · Città Digitali | `/puglia-digitale/` · `/citta-digitali/` |

In entrata: Home (Blocco A e capitolo 01), `/citta-digitali/` («Sito Interattivo Immersivo» nella sezione «Dal locale al nazionale» e nel blocco finale), `/puglia-digitale/` (blocco finale), navigazione e footer.

Link esterni: le tre «Entra nell’esperienza ↗» della sezione 6, più il footer.

## Allineamenti con gli altri documenti

| Punto | Scelta in questo documento | Motivo |
|---|---|---|
| Ancora del form | `#richiesta` | Strategia di conversione §2 e §5. La mappa SEO (§3.2) usa ancora `#richiedi-offerta`: va allineata. |
| H2 della sezione 4 | «Cosa si può fare dentro un SIII» (la mappa propone «Cosa puoi fare…») | L'elenco descrive ciò che fa chi visita, mentre la pagina parla all'impresa: la forma impersonale evita l'ambiguità del «tu». È nel sito. |
| Statement sotto gli H2 descrittivi | Gli H2 sono quelli della mappa SEO. Le frasi grandi sono `<p>` | Tiene insieme ricerca (heading descrittivi) e direzione creativa (grandi statement). |
| Blocco B | Seconda frase accorciata | Evita di ripetere l'elenco della sezione 4. Fatti invariati. |
| Frecce | ↗ per le uscite, ↓ per le CTA verso il form della pagina | Tone of voice §6 e strategia di conversione §4. Il testo resta quello delle LG. |
| Occhiello della hero | Nessuno: lo sostituisce il breadcrumb | Direzione visiva §7.8; review di accessibilità del 2026-09-28, T11. |
| Chiusura | «Richiedi un’offerta» come titolo del form, senza link | `struttura-pagine.md` SI-8. |
| Ponte | Prima della chiusura | `struttura-pagine.md` SI-7. |
| Anteprima immersiva | Non al lancio | `struttura-pagine.md` SI-6. |

## Verifica sul sito (2026-10-05)

**Metodo.**
- Staging http://localhost:4321, build del 2026-10-05 che corrisponde al commit c98f565. Confronto con `src/pages/siii.astro`, `src/lib/structured-data.ts`, `src/data/pages.ts` e `src/data/site.ts`.
- Testi letti dal DOM (`textContent`), nomi accessibili dall'albero di accessibilità di Chromium, a 1440 px.
- Due script. Il primo controlla che ogni testo da pubblicare di questo documento compaia nella pagina, carattere per carattere. Il secondo cerca il contrario: i testi della pagina che il documento non riporta, fuori dal form, che è microcopy di copywriter-brand.

**Esito.** I testi da pubblicare di questo documento sono tutti nel sito, identici (96 testi su 96 trovati dallo script, compresa la figura di confronto; title e meta controllati a parte). Fanno eccezione solo i testi dell'anteprima immersiva, che non è al lancio. Rispetto alla v1.1 ho allineato questi punti: in ognuno il sito seguiva una decisione registrata.

| Punto | v1.1 | Sito, ora anche qui | Decisione |
|---|---|---|---|
| Occhiello della hero | «Esperienze immersive per aziende» | Breadcrumb | Sessione principale; direzione visiva §7.8 (T11) |
| Frecce verso il form | «Richiedi un’offerta →» | «Richiedi un’offerta ↓» | Tone of voice §6; `struttura-pagine.md` SI-1 |
| Visual della hero | Non indicato | Slot `siii-anteprima` con tre nodi decorativi | Direzione visiva §7.4, riga 1 |
| Ordine della sezione 2 | Statement prima del testo | Testo, poi statement | La definizione subito sotto l'H2 (mappa SEO; `struttura-pagine.md` SI-2) |
| Figura di confronto | Assente | Interruttore, didascalie e righe mono | Direzione visiva §7.4, riga 3; review di bozze, S2 |
| Marquee | Assente | «Esplora · Interagisci · Guarda · Richiedi · Prenota» | Direzione visiva §7.4, riga 4 |
| Testo 03 | Una frase | Due frasi | Review di bozze, S3 |
| Chiusura | Link «Richiedi un’offerta →» | Titolo del form, senza link | `struttura-pagine.md` SI-8 |
| Ponte | Dopo il form | Prima della chiusura | `struttura-pagine.md` SI-7 |
| Anteprima immersiva | Prevista | Non al lancio | `struttura-pagine.md` SI-6 |
| Nome accessibile dell'H1 | Non indicato | «SIII – Siti Interattivi Immersivi» | ux-designer, T6 |

**Differenze aperte.**

| # | Dove | Differenza | Proposta | Chi decide |
|---|---|---|---|---|
| V1 | `docs/ux/struttura-pagine.md` SI-1 | Cita ancora l'occhiello, e come visual lo slot `siii-masseria-santella` o un `ImmersivePreview`; il sito ha lo slot `siii-anteprima` | Allineare il documento al sito. Il sito non cambia | ux-designer |
| V2 | `docs/creativa/direzione-visiva.md` §7.4, riga 7 | Cita ancora la CTA «Richiedi un'offerta →» sopra il form (lo segnala anche il tone of voice) | Allineare il documento al sito. Il sito non cambia | creative-director |
| V3 | `docs/seo/mappa-keyword-url.md` §3.2 | Usa ancora `#richiedi-offerta` e l'H2 «Cosa puoi fare dentro un SIII» | Allineare il documento al sito. Il sito non cambia | seo-content |

## Testi originali mancanti

- **Benefici (§11).** Le LG chiedono di «trasformare i contenuti forniti», ma i testi originali non sono nel repository (brief §7, P1). Le descrizioni sono scritte solo a partire dai titoli dei benefici e dalla definizione della §10. [DA FORNIRE: testi originali dei quattro benefici]
- **Esempi (§12).** Le frasi sono ridotte al minimo verificabile. [DA FORNIRE: per ogni esempio, il settore e che cosa si trova dentro l'esperienza (ambienti, prodotti, prenotazione)]
- **Cos’è, confronto, elenco (§10).** Scritti solo con i fatti della §10 e con i blocchi di risposta della mappa SEO.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, statement, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 38 | 450 | 2.321 | **62,8** |
| Tutti i testi principali | 66 | 547 | 2.836 | 73,4 |

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. I blocchi di risposta della mappa SEO, pieni di nomi di prodotto lunghi, abbassano l'indice: per questo alcune frasi sono state spezzate, a parole invariate. Lo stesso script ha controllato 68 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description. Ricalcolato il 2026-10-05: i paragrafi salgono da 62,1 a 62,8 perché il Testo 03 è in due frasi; un elemento in meno perché l'occhiello non c'è più.

## Ipotesi da validare

- [IPOTESI: la sigla SIII corrisponde a «Sito Interattivo Immersivo». La sigla ha tre «I» e lo scioglimento ne spiega due (brief D3). Il testo abbina sigla e nome come la §10, senza spiegare le lettere una per una]
- [IPOTESI: i tre esempi sono realizzati da ITnode e le imprese hanno autorizzato nome e schermate (brief A7). La pagina non lo afferma in modo esplicito]
- [IPOTESI: ogni SIII può includere tutte le azioni della §10, a seconda di come è configurato. Per questo il testo usa «può»]
- [DA VERIFICARE: Masseria Santella si trova a Cassano delle Murge (BA)]

## Domande aperte

1. Che cosa significa la terza «I» di SIII (brief D3)?
2. Per i tre esempi: settore, cosa si può fare nell'esperienza, consenso a pubblicare nome e schermate (A7).
3. Acquisto e prenotazione avvengono dentro il SIII o su sistemi esterni (N13)?
4. Esistono dati documentati sul comportamento dei visitatori, per esempio il tempo di permanenza, con fonte e periodo (D7)?
5. Il SIII vive sempre dentro un portale città o anche sul dominio dell'impresa (D4)? La risposta conferma o corregge lo statement «Un SIII è un sito».

## Decisioni richieste

- **brand-strategist**: forma della didascalia della figura se si applica la riserva I7 (proposta nella sezione 3).
- **creative-director**: approvazione dello statement «Un tour 360° è una visita. Un SIII è un sito.» e della regola «H2 piccolo + statement grande»; allineamento della direzione visiva (V2).
- **ux-designer**: allineamento di `struttura-pagine.md` SI-1 (V1).
- **seo-content**: allineare l'ancora `#richiesta` e l'H2 della sezione 4 nella mappa (V3).

## Rischi

- **Cookie di terze parti nelle anteprime.** Se l'anteprima immersiva viene attivata, l'iframe carica un portale esterno che potrebbe impostare cookie non tecnici. Il clic su «Avvia l’anteprima» non equivale a un consenso secondo le linee guida del Garante. Per questo al lancio non c'è, e prima di attivarla va verificato (soglia 5; `struttura-pagine.md` SI-6).

## Fonti consultate

Consultate il 2026-09-28. I portali e itnode.it sono bloccati dall'ambiente: le informazioni sui portali vengono solo da risultati di ricerca. Il 2026-10-05 non ho consultato nuove fonti web.

- Masseria Santella a Cassano delle Murge: https://www.booking.com/hotel/it/masseria-santella.de.html · https://masseria-santella.apuliahotelspage.com/en/ · https://www.facebook.com/masseriasantella/
- Città Digitali e tecnologia VR 360 (solo sintesi di ricerca): https://xn--cittdigitali-19a.it/il-progetto/
- Maison Miminà, D.L. Natura Dentro: nessun risultato pubblico trovato.
