---
titolo: Copy deck · SIII (Siti Interattivi Immersivi)
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer]
stato: in revisione
versione: 1.6
aggiornato: 2026-10-09
fonti: [docs/contenuti/copy-deck/home.md (1.8, §5: modello della riga con il nome, copywriter-brand, commit c112a4a), docs/contenuti/alt-text.md (1.12), commit d97aa29 (alt della hero nel sito), 2178f47 (derivato desktop della hero), docs/review/2026-10-08-hero-siii-yes-creative-director.md (ritaglio in alto confermato), docs/contenuti/alt-text.md (1.11), staging http://127.0.0.1:4321 del 2026-10-08 (build di c11734b), commit 1112c93 (schermata del negozio YES nella hero, richiesta dell'utente del 2026-10-08), docs/contenuti/alt-text.md (1.10), staging http://127.0.0.1:4321 del 2026-10-08 (build di 1112c93), scripts/prelaunch-check.mjs (controllo A7, commit 58715c4), docs/brief/linee-guida.md, docs/decisioni/002-veridicita-staging-e-immagini-ai.md (riserve di go-live), docs/brief/brief-consolidato.md, docs/seo/mappa-keyword-url.md, docs/cro/strategia-conversione.md, docs/contenuti/tone-of-voice.md (§6), docs/contenuti/microcopy.md (§4), docs/creativa/direzione-visiva.md (§7.4, §7.8), docs/review/2026-09-28-sito-bozze-copywriter-content.md (S1–S3), docs/review/2026-09-28-sito-accessibilita-ux-designer.md (§4: T6, T11), docs/review/2026-09-28-sito-verifica-accessibilita-ux-designer.md (A7), docs/review/2026-09-28-sito-veridicita-brand-strategist.md (I7), docs/ux/struttura-pagine.md (0.9, SI-1, SI-6), docs/ux/accessibilita.md (0.9, §2.8), docs/contenuti/alt-text.md (1.6), docs/cro/piano-misurazione.md (0.5), docs/review/2026-10-07-schermate-siii-ux-designer.md, docs/review/2026-10-07-schermate-siii-cro-specialist.md, commit d06a3e9 (schermate), 88d7083 (schermata cliccabile, decisione dell'utente del 2026-10-07) e 9ddc8b2 (alt), src/pages/siii.astro, src/data/media.ts, src/lib/structured-data.ts, src/data/site.ts, src/data/asset-slots.ts, src/data/pages.ts, build di 326f354 con gli alt della v1.6 di alt-text.md, servita in locale il 2026-10-07 (scratchpad, non versionata)]
---

# Copy deck · SIII

Pagina `/siii/`. Copre le sezioni 10, 11 e 12 delle linee guida (LG), la chiusura e l'introduzione al form (§23). I testi sono pronti da impaginare.

**Novità della v1.6 (2026-10-09)**
- **Riga con il nome sotto la hero**, sul modello di copywriter-brand (copy deck della Home 1.8, §5). Oggi non è pubblicata: mancano nome confermato, comune e consenso. Quando arriva, l'alt passa alla variante senza il nome (sezione 1).

**Novità della v1.5 (2026-10-08)**
- **Hero.** Il creative-director ha confermato il ritaglio in alto per i telefoni (verdetto del 2026-10-08). Da 64em la hero usa un derivato 3:5 della schermata, senza il menu e senza le parti tagliate in basso (commit 2178f47). L'alt vale per tutti e due.
- **L'alt della v1.10 è nel sito** (commit d97aa29): V5 è chiusa, e nel sito ci sono 100 testi su 100 di questo documento.

**Novità della v1.4 (2026-10-08)**
- **Nuova schermata nella hero.** Dal commit 1112c93, su richiesta dell'utente, la hero mostra il negozio YES da smartphone, al posto della sala di Masseria Santella. Alt e note vengono da `alt-text.md` (1.10). Nel sito l'alt è ancora provvisorio (Differenze aperte, V5).
- **Consenso A7** anche per YES (sezioni 1 e 6, Rischi). Il nome completo dell'impresa è [DA VERIFICARE].
- V4 chiusa: gli alt della v1.6 dei tre esempi sono nel sito.

**Novità della v1.3 (2026-10-07)**
- **Le schermate ci sono.** Hero ed esempi mostrano schermate vere delle esperienze, inviate dall'utente (commit d06a3e9). Il documento non le dà più per mancanti: per questa pagina non ci sono più segnaposto né asset da fornire.
- **Schermate cliccabili negli esempi**, per decisione dell'utente (commit 88d7083): la schermata apre l'esperienza in una nuova scheda, come il CTA, con un `cta_id` proprio.
- **Testi alternativi** delle schermate, da `docs/contenuti/alt-text.md` (1.6): descrivono la vista, non i comandi disegnati (`docs/ux/accessibilita.md` §2.8).
- **Riserva A7**: il consenso delle tre imprese ora riguarda schermate già nel sito (sezione 6).

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
| 1 | 1. Hero | — | Hero `line`, con la schermata di un SIII su smartphone a destra (sotto le CTA su mobile) |
| 2 | 2. Cos’è un Sito Interattivo Immersivo | `#cos-e` | H2 piccolo, definizione, statement |
| 3 | 3. Tour 360° o Sito Interattivo Immersivo? | `#tour-360` | Statement, figura a due stati e tabella di confronto |
| 4 | 4. Cosa si può fare dentro un SIII | `#cosa-si-puo-fare` | Statement, marquee dei verbi, elenco tipografico, niente card |
| 5 | 5. Perché scegliere un SIII | `#benefici` | BenefitsSection `zigzag` |
| 6 | 6. Entra. Esplora. Interagisci. | `#esempi` | Tre esempi, ognuno con la schermata 16:10 dell'esperienza, cliccabile, e il CTA |
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

**Alt della schermata** · testo alternativo (`alt`) · fa fede `docs/contenuti/alt-text.md`
> Il negozio YES da smartphone: la parete verde, la scala che sale al soppalco, gli scaffali di legno e l’interfaccia dell’esperienza.

Note sulla schermata:
- **Che cos'è.** La schermata del negozio YES vista da smartphone (`siii-yes-mobile-negozio.jpg`, commit 1112c93). Si vedono la parete verde, la scala che sale al soppalco, gli scaffali di legno e, sopra, logo e icone dell'esperienza; sui telefoni anche il menu. È l'elemento LCP della pagina.
- **Nome dell'impresa.** [DA VERIFICARE] Il logo dice «YES» e, in piccolo, «pure design 100% flowers», che potrebbe essere un payoff. L'alt usa «YES».
- **Formato.** Sotto i 64em la hero è 4:5, con un ritaglio fatto in build e ancorato in alto: restano logo, menu, icone e soppalco (commit 1112c93, confermato dal creative-director). Da 1024 px è una Porta 3:5, con un derivato senza il menu e senza le parti tagliate in basso (commit 2178f47). L'alt vale per tutti e due.
- **Accessibilità.** È informativa, con alt. Sopra non ci sono nodi decorativi (`accessibilita.md` §2.8). Non è un link.
- **Perché l'alt nomina l'impresa.** La hero non la nomina. «Il negozio» prima del nome evita che «YES», a inizio frase, si senta come una parola inglese. L'alt non ripete «Siti Interattivi Immersivi», che è nell'H1 (criterio 5 di `alt-text.md`).
- **Perché «l’interfaccia dell’esperienza».** Il menu non si vede in tutti i ritagli, e «i contatti» nominerebbe dei comandi (criterio 12 di `alt-text.md`).
- **Consenso.** La schermata mostra un'impresa reale: vale la riserva A7 della sezione 6.

**Riga con il nome sotto la schermata** · decisa dal creative-director (verdetto del 2026-10-08 sulla hero, punto 2; direzione visiva 0.21, §4.8) · testo di copywriter-brand, modello del copy deck della Home 1.8, §5 · oggi non pubblicata

La proponeva cro-specialist (review del 2026-10-07, oss. 4). La forma è `{nome dell’impresa} · {comune} ({sigla della provincia})`, come la riga del luogo nelle schede degli esempi. Per la hero, da completare con i dati: «YES · [DA FORNIRE: comune] ([DA FORNIRE: sigla della provincia])». È un modello, non un testo da pubblicare: per questo non è in un blocco citato.
- **Nel sorgente:** `YES&nbsp;· {comune con spazi unificatori}&nbsp;({sigla})`. L'unico punto d'a capo è lo spazio dopo «·». Misure degli a capo, spaziatura di WCAG 1.4.12 e lettura proposta per gli screen reader sono nel copy deck della Home (1.8, §5). Markup e lettura li decide ux-designer.
- **Mai «pure design 100% flowers»:** è un payoff non confermato e contiene un numero (`alt-text.md`, sezione del file).
- **Il nome.** «YES» è letto dal logo. [DA VERIFICARE] Se il nome confermato è diverso, cambia nella riga e nell'alt. A inizio riga uno screen reader può leggere «YES» come la parola inglese: da valutare con la lettura della riga.
- **Va online solo con** il nome confermato, il comune, il consenso scritto (A7) e la conferma che il SIII l'ha realizzato ITnode (A8). Fino ad allora nessuna riga, e il nome resta solo nell'alt.
- **Alt con la riga.** Il nome non si ripete: l'alt passa alla variante «Con il nome nel testo accanto» di `alt-text.md`, «Da smartphone: la parete verde del negozio, la scala che sale al soppalco, gli scaffali di legno e l’interfaccia dell’esperienza.» (129 caratteri).
- **Non è un link.** Niente numeri né aggettivi: dice solo di chi è lo spazio e dove sta.

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
| Testo alternativo della schermata (`alt`) | La schermata d’avvio dell’esperienza: il cancello d’ingresso tra gli alberi in una vista a piccolo pianeta, con il menu. | La schermata d’avvio dell’esperienza: la vetrina su una strada alberata in una vista a piccolo pianeta, con il menu. | La schermata d’avvio dell’esperienza: il vialetto d’ingresso tra le siepi, sotto una palma, in una vista a piccolo pianeta, con il menu. |
| `cta_id` della schermata | siii-showcase-masseria-santella-schermata | siii-showcase-maison-mimina-schermata | siii-showcase-dl-natura-dentro-schermata |

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
- **Schermate.** Per ogni esempio, la vista a piccolo pianeta con cui si apre l'esperienza (commit d06a3e9): `siii-masseria-santella-desktop-ingresso.jpg`, `siii-maison-mimina-desktop-ingresso.jpg`, `siii-dielle-desktop-ingresso.jpg`, in 16:10. Sono informative, con alt, e nella voce della lista vengono prima del nome.
- **Testi alternativi.** Fa fede `docs/contenuti/alt-text.md` (1.6, criterio 12). Descrivono la vista, non i comandi disegnati: niente «pulsante» per il play al centro, che chi usa lo screen reader non può premere (`accessibilita.md` §2.8). Non ripetono il nome, che l'H3 dice subito dopo. Nel sito c'è ancora la versione con «il pulsante di avvio», finché la sessione principale non applica la v1.6.
- **La schermata apre l'esperienza**, in una nuova scheda (decisione dell'utente del 2026-10-07, commit 88d7083).
  - Sopra l'immagine c'è uno strato `<a>` trasparente, con lo stesso URL e la stessa nuova scheda del CTA. È per il solo puntatore: fuori dalla tabulazione e nascosto agli screen reader.
  - L'immagine resta fuori dal link e tiene il suo alt. Per tastiera e screen reader il CTA resta l'unico link della voce, e dice già destinazione e nuova scheda.
  - Lo strato non ha testo visibile: non serve copy.
  - Tracciamento: `outbound_click`, tipo `esperienza-siii`, `cta_location` esempi, con il `cta_id` della schermata, distinto da quello del CTA (piano di misurazione 0.5).
  - Limite noto, da verificare con VoiceOver e TalkBack: nell'esplorazione al tocco, sopra la schermata lo screen reader non legge nulla (review di ux-designer del 2026-10-07, §2.3).
- **Riserva A7** (ADR 002, in stato di proposta; condizione C06 del verdetto G4). Le schermate mostrano nome, logo e ambienti di tre imprese reali. Senza il loro consenso, nessuna schermata delle loro esperienze: si torna agli slot, e restano nomi e link (LG §12). Oggi le schermate entrano senza passare dagli slot, quindi tornare indietro richiede una modifica del codice. Il controllo di go-live che blocca c'è (`scripts/prelaunch-check.mjs`, voce A7, commit 58715c4) e vale anche per la schermata del negozio YES nella hero (sezione 1). [DA VERIFICARE: consenso scritto delle tre imprese e di YES]
- **Riserva I8** (ADR 002): un'esperienza che al lancio non risponde si toglie, con la sua schermata, e «Tre Siti Interattivi Immersivi già online» si adegua al numero vero.
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

Link esterni: le tre «Entra nell’esperienza ↗» della sezione 6, più il footer. Anche le tre schermate degli esempi aprono l'esperienza, per il solo puntatore (sezione 6).

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
| Schermate degli esempi | Cliccabili, con uno strato per il solo puntatore; l'immagine tiene l'alt | Decisione dell'utente del 2026-10-07 (commit 88d7083); `accessibilita.md` §2.8; `struttura-pagine.md` SI-6. |
| Testi alternativi delle schermate | La vista, non i comandi disegnati | `accessibilita.md` §2.8; `alt-text.md` (1.6), criterio 12. |

## Verifica sul sito (2026-10-07 e 2026-10-08)

**Metodo.**
- **2026-10-08, per la v1.4.** Staging http://127.0.0.1:4321, build del commit 1112c93. Hero letta da 320 a 1920 px (sorgente, ritaglio, albero di accessibilità: `alt-text.md` 1.10, «Verifica sul sito»). Gli altri testi li ho ricontrollati con lo stesso script del 2026-10-07.
- **2026-10-07.** Lo staging condiviso era fermo al commit d06a3e9, prima della schermata cliccabile. Ho costruito in una cartella di lavoro una copia di `HEAD` (326f354), con gli alt della v1.6 di `alt-text.md` applicati, e l'ho servita in locale. Il repository non è stato toccato.
- Testi letti dal DOM (`textContent`), nomi accessibili dall'albero di accessibilità di Chromium, a 1440 px. Per gli strati sulle schermate ho letto anche URL, `target`, `tabindex`, `aria-hidden` e `cta_id`.
- Due script. Il primo controlla che ogni testo da pubblicare di questo documento compaia nella pagina, carattere per carattere, compresi alt e `cta_id`. Il secondo cerca il contrario: i testi della pagina che il documento non riporta, fuori dal form, che è microcopy di copywriter-brand.
- La verifica precedente, del 2026-10-05, era sulla build del commit c98f565.

**Esito del 2026-10-08, sulla build di c11734b.**
- Nel sito ci sono tutti i 100 testi di questo documento, identici, compreso l'alt della hero (V5, chiusa).
- Nel senso inverso, mancano solo i gradi della figura di confronto, decorativi e nascosti agli screen reader (sezione 3).

**Esito del 2026-10-08, sulla build di 1112c93.**
- Nel sito ci sono 99 testi su 100 di questo documento, identici. Manca solo l'alt della hero, perché nel sito c'è ancora il provvisorio del commit 1112c93 (Differenze aperte, V5).
- Nel senso inverso, mancano solo i gradi della figura di confronto, decorativi e nascosti agli screen reader (sezione 3), e l'alt provvisorio.
- Gli alt della v1.6 dei tre esempi sono nel sito: V4 è chiusa.

**Esito del 2026-10-07.**
- I testi da pubblicare di questo documento sono tutti nel sito, identici: 100 su 100, compresi i quattro alt delle schermate e i tre `cta_id` delle schermate. Title e meta li ho controllati a parte.
- Fa eccezione solo l'anteprima immersiva, che non è al lancio.
- Nel senso inverso, mancano solo i gradi della figura di confronto, decorativi e nascosti agli screen reader (sezione 3).
- Gli alt dei tre esempi coincidono solo dopo la patch della v1.6 (Differenze aperte, V4).

**Allineato nella v1.4.**

| Punto | v1.3 | Sito, ora anche qui | Decisione |
|---|---|---|---|
| Visual della hero | Schermata di Masseria Santella su smartphone; sotto i 64em, ritaglio centrato | Schermata del negozio YES su smartphone; sotto i 64em, ritaglio 4:5 ancorato in alto | Richiesta dell'utente del 2026-10-08, commit 1112c93 |

**Allineato nella v1.3.**

| Punto | v1.2 | Sito, ora anche qui | Decisione |
|---|---|---|---|
| Visual della hero | Slot `siii-anteprima`, in attesa della schermata, con tre nodi decorativi | Schermata di Masseria Santella su smartphone, con alt; nessun nodo sopra | Commit d06a3e9; `accessibilita.md` §2.8; `struttura-pagine.md` SI-1 |
| Immagini degli esempi | Slot, «Le schermate mancano» | Schermate delle tre esperienze, con alt | Commit d06a3e9; `alt-text.md` (1.6) |
| Schermata degli esempi | Non cliccabile | Apre l'esperienza in una nuova scheda, per il solo puntatore, con un `cta_id` proprio | Decisione dell'utente del 2026-10-07, commit 88d7083 |

**Allineato nella v1.2**, rispetto alla v1.1:

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
| V1 | `docs/ux/struttura-pagine.md` SI-1 (0.9) | Il visual ora è allineato al sito, ma tra i contenuti e nell'ordine su mobile c'è ancora l'occhiello, che il breadcrumb ha sostituito | Togliere l'occhiello da SI-1. Il sito non cambia | ux-designer |
| V2 | `docs/creativa/direzione-visiva.md` §7.4, riga 7 | Cita ancora la CTA «Richiedi un'offerta →» sopra il form (lo segnala anche il tone of voice) | Allineare il documento al sito. Il sito non cambia | creative-director |
| V3 | `docs/seo/mappa-keyword-url.md` §3.2 | Usa ancora `#richiedi-offerta` e l'H2 «Cosa puoi fare dentro un SIII» | Allineare il documento al sito. Il sito non cambia | seo-content |
| V4 | `src/data/media.ts`, alt dei tre esempi | Nel sito c'era ancora la v1.5 di `alt-text.md`, con «il pulsante di avvio» | **Chiusa** il 2026-10-07: gli alt della v1.6 sono nel sito dal commit d211ba4 | Sessione principale |
| V5 | `src/data/media.ts`, alt della hero | Nel sito c'era l'alt provvisorio del commit 1112c93, che finiva con «con il menu e i contatti» | **Chiusa** il 2026-10-08: l'alt della sezione 1 è nel sito dal commit d97aa29 | Sessione principale |

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

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. I blocchi di risposta della mappa SEO, pieni di nomi di prodotto lunghi, abbassano l'indice: per questo alcune frasi sono state spezzate, a parole invariate. Lo stesso script ha controllato 68 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description. Ricalcolato il 2026-10-05: i paragrafi salgono da 62,1 a 62,8 perché il Testo 03 è in due frasi; un elemento in meno perché l'occhiello non c'è più. Ricontrollato il 2026-10-07 e il 2026-10-08: invariato. Gli alt delle schermate non entrano in questo calcolo: il loro indice è in `alt-text.md`.

## Ipotesi da validare

- [IPOTESI: la sigla SIII corrisponde a «Sito Interattivo Immersivo». La sigla ha tre «I» e lo scioglimento ne spiega due (brief D3). Il testo abbina sigla e nome come la §10, senza spiegare le lettere una per una]
- [IPOTESI: i tre esempi sono realizzati da ITnode e le imprese hanno autorizzato nome e schermate (brief A7). La pagina non lo afferma in modo esplicito. Le schermate sono nel sito dal 2026-10-07, ma il consenso non risulta in `docs/` (review CRO del 2026-10-07, oss. 2)]
- [IPOTESI: anche l'esperienza del negozio YES, nella hero, è un SIII realizzato da ITnode. Una schermata nella hero di questa pagina lo lascia intendere (soglia 1). L'ha mandata l'utente il 2026-10-08, e l'interfaccia è dello stesso tipo delle altre schermate, ma non risulta in `docs/`]
- [DA VERIFICARE: nome completo del negozio della hero: «YES», oppure «YES» con «pure design 100% flowers»]
- [IPOTESI: la vista a piccolo pianeta degli esempi è la schermata d’avvio di ogni esperienza, come dicono il commit d06a3e9 e le review del 2026-10-07. Gli alt la chiamano così (`alt-text.md`, «Ipotesi da validare»)]
- [IPOTESI: ogni SIII può includere tutte le azioni della §10, a seconda di come è configurato. Per questo il testo usa «può»]
- [DA VERIFICARE: Masseria Santella si trova a Cassano delle Murge (BA)]

## Domande aperte

1. Che cosa significa la terza «I» di SIII (brief D3)?
2. Per i tre esempi: settore, cosa si può fare nell'esperienza, consenso a pubblicare nome e schermate (A7).
3. Acquisto e prenotazione avvengono dentro il SIII o su sistemi esterni (N13)?
4. Esistono dati documentati sul comportamento dei visitatori, per esempio il tempo di permanenza, con fonte e periodo (D7)?
5. Il SIII vive sempre dentro un portale città o anche sul dominio dell'impresa (D4)? La risposta conferma o corregge lo statement «Un SIII è un sito».
6. Il negozio della hero: si chiama solo «YES»? «pure design 100% flowers» è un payoff? In che comune si trova? Il SIII è di ITnode (A8), e c'è il consenso a mostrarne la schermata (A7)?

## Decisioni richieste

- **brand-strategist**: forma della didascalia della figura se si applica la riserva I7 (proposta nella sezione 3).
- **creative-director**: approvazione dello statement «Un tour 360° è una visita. Un SIII è un sito.» e della regola «H2 piccolo + statement grande»; allineamento della direzione visiva (V2).
- **ux-designer**: togliere l'occhiello da `struttura-pagine.md` SI-1 (V1); markup e lettura della riga con il nome sotto la hero, quando arriva (sezione 1).
- **Utente, con brand-strategist** (owner dell'ADR 002): consenso scritto delle tre imprese degli esempi e del negozio YES per le schermate (A7).
- **seo-content**: allineare l'ancora `#richiesta` e l'H2 della sezione 4 nella mappa (V3).

## Rischi

- **Consenso delle imprese delle schermate (A7).** Le schermate di quattro imprese reali sono già nel sito: le tre degli esempi, anche nella variante «in pubblicazione», e il negozio YES nella hero. Il consenso non è registrato. Per cro-specialist è bloccante per il go-live (condizione C06), e il controllo A7 di `scripts/prelaunch-check.mjs` blocca. Senza consenso, si tolgono le schermate: negli esempi restano nomi e link (sezione 6).
- **Cookie di terze parti nelle anteprime.** Se l'anteprima immersiva viene attivata, l'iframe carica un portale esterno che potrebbe impostare cookie non tecnici. Il clic su «Avvia l’anteprima» non equivale a un consenso secondo le linee guida del Garante. Per questo al lancio non c'è, e prima di attivarla va verificato (soglia 5; `struttura-pagine.md` SI-6).

## Fonti consultate

Consultate il 2026-09-28. I portali e itnode.it sono bloccati dall'ambiente: le informazioni sui portali vengono solo da risultati di ricerca. Il 2026-10-05 e il 2026-10-07 non ho consultato nuove fonti web. Il 2026-10-08 ho cercato il negozio della hero («YES» «pure design» «100% flowers»): nessun risultato pertinente.

- Masseria Santella a Cassano delle Murge: https://www.booking.com/hotel/it/masseria-santella.de.html · https://masseria-santella.apuliahotelspage.com/en/ · https://www.facebook.com/masseriasantella/
- Città Digitali e tecnologia VR 360 (solo sintesi di ricerca): https://xn--cittdigitali-19a.it/il-progetto/
- Maison Miminà, D.L. Natura Dentro: nessun risultato pubblico trovato.
