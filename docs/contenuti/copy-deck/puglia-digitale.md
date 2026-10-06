---
titolo: Copy deck · Puglia Digitale
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer, brand-strategist, creative-director]
stato: in revisione
versione: 1.5
aggiornato: 2026-10-06
fonti: [docs/brief/linee-guida.md, src/assets/images/acquaviva-digitale.webp, gravina-digitale.webp e monopoli-digitale.webp (utente, 2026-10-06), docs/decisioni/007-immagine-di-acquaviva-con-segni-grafici.md, docs/contenuti/alt-text.md (1.4), docs/strategia/citta-digitali-elenco.md (0.3), docs/decisioni/002-veridicita-staging-e-immagini-ai.md (riserve di go-live), docs/brief/brief-consolidato.md (D1, S7, omonimie), docs/seo/mappa-keyword-url.md, docs/seo/specifiche-tecniche.md (§5.4), docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md, docs/contenuti/tone-of-voice.md (§6), docs/contenuti/microcopy.md (§4), docs/creativa/direzione-visiva.md (§7.5, §7.8), docs/ux/struttura-pagine.md (0.5, §3), docs/review/2026-09-28-sito-veridicita-brand-strategist.md (B3, B4, I9), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/review/2026-09-28-sito-bozze-copywriter-content.md (P1, P2), docs/review/2026-09-28-sito-accessibilita-ux-designer.md (§4: T6, T11), src/pages/puglia-digitale.astro, src/data/site.ts, src/data/asset-slots.ts, src/data/figures.ts, src/data/media.ts, src/data/pages.ts, staging http://localhost:4321 del 2026-10-05 (commit 5c4a6cb)]
---

# Copy deck · Puglia Digitale

Pagina `/puglia-digitale/`. Copre le sezioni 13, 14, 15 e 16 delle linee guida (LG), la chiusura e l'introduzione al form (§23). Rispetto a SIII il carattere è più territoriale ed emozionale (§13). I testi sono pronti da impaginare.

**Novità della v1.5 (2026-10-06)**
- **Foto di Gravina in Puglia e Monopoli** per le loro porte: testo alternativo per il ritaglio centrale e nota, in attesa dei ritagli del creative-director. La foto di Acquaviva è nel sito (commit d60b95f).

**Novità della v1.4 (2026-10-06)**
- **Foto di Acquaviva delle Fonti** per la sua porta nella sezione 4: testo alternativo e nota sotto la foto, in attesa del ritaglio del creative-director e delle risposte dell'utente su autore, data e uso di AI.
- **«30+ città»**: elenco e perimetro confermati dall'utente il 2026-10-06, cioè le 31 città pugliesi dell'elenco di Città Digitali. Manca solo la data dei dati (brief N1).

**Novità della v1.3 (2026-10-05)**
- **Verifica sul sito costruito.** Il documento ora descrive la pagina com'è: hero senza occhiello e chiusa dalla linea della costa, link al portale nel primo paragrafo, foto dell'evento nella sezione 2 con la nota di trasparenza, luoghi da ovest a est, ponte prima della chiusura, «Contattaci» come titolo del form.
- **Dominio del portale** confermato dall'utente il 2026-10-05: lapugliadigitale.it, come nelle LG (brief S7).
- **Riserva di go-live I6** dell'ADR 002 annotata nella hero, con una forma breve entro i 28 caratteri.
- Le differenze ancora aperte sono nella sezione «Verifica sul sito».

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi, per la scala della §04. **verbatim**: frase delle LG; si cambia solo l'apostrofo tipografico.
- **Frecce** (tone of voice §6): → altra pagina del sito, ↓ più in basso nella stessa pagina (form compreso), ↗ sito esterno in nuova scheda. Sempre `aria-hidden="true"`.
- **Link esterni**: `target="_blank" rel="noopener"`. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3) e dichiara la nuova scheda.
- **Fonti che prevalgono nel loro dominio**: brief consolidato (fatti e claim), mappa keyword→URL (heading, metadati, blocchi di risposta), strategia di conversione (CTA, ancore, form).
- **Attribuzione.** Finché il cliente non chiarisce il ruolo di ITnode (brief A1, D1, DR4), nessun testo dice che ITnode ha creato Puglia Digitale, né che si tratta di «un progetto ITnode». Formula provvisoria: «Con Puglia Digitale, ITnode porta online…». Nessun riferimento a patrocini, alla Regione o al portale quasi omonimo di un'associazione, con il trattino nel dominio (A2; brief, omonimie).

## Metadati

Fa fede `docs/seo/mappa-keyword-url.md` §2 (owner seo-content). Copia per comodità:

| Campo | Testo | Limite |
|---|---|---|
| Title | Puglia Digitale: destination marketing immersivo \| ITnode | ≤ 60 |
| Meta description | Puglia Digitale è una piattaforma di destination marketing che digitalizza e valorizza città, borghi e imprese pugliesi con esperienze immersive. | 140–155 |
| Breadcrumb | Home › Puglia Digitale | — |

Title, meta e breadcrumb coincidono con il sito (`src/data/pages.ts`, staging del 2026-10-05).

## Struttura della pagina

Le sezioni tengono la numerazione delle versioni precedenti, perché altri documenti la citano. L'ordine con cui compaiono nel sito è nella prima colonna.

| Ordine nel sito | Sezione del copy deck | Ancora | Componente |
|---|---|---|---|
| 1 | 1. Hero | — | Hero `line`, chiusa dalla linea della costa (decorativa) |
| 2 | 2. Dalla costa all’entroterra | `#progetto` | Passaggio, testo editoriale e foto dell'evento |
| 3 | 3. Numeri | `#numeri` | Stats, grande impatto tipografico |
| 4 | 4. I luoghi | `#luoghi` | LocationShowcase `doors`: tre porte d'accesso, non tre card |
| 5 | 5. Perché aderire | `#perche-aderire` | BenefitsSection `scala` |
| 6 | 7. Gli altri mondi ITnode | — | Bridge: riga editoriale con due link |
| 7 | 6. Chiusura e form | `#chiusura`; form `#richiesta` | CTASection `form` + ContactForm |

Note:
- **La foto dell'evento sta nella sezione 2**, accanto al testo sul destination marketing (direzione visiva §7.5, riga 2). Nella v1.2 era nella sezione 5, accanto a «La forza della rete».
- **Il ponte viene prima della chiusura**, come su SIII (`struttura-pagine.md` SI-7): il form resta l'ultima sezione della pagina.

## 1. Hero

**Eyebrow.** Non c'è. Sulle pagine interne il breadcrumb («Home / Puglia Digitale») prende il posto dell'occhiello: è una decisione della sessione principale (direzione visiva §7.8; review di accessibilità del 2026-09-28, T11). La v1.2 proponeva l'occhiello «Destination marketing»: non va reintrodotto senza una nuova decisione.

**H1** · verbatim · max 90 in totale (riga 1: 15, riga 2: 73) · due righe nello stesso H1: nome alla scala piena, descrittore alla scala del lead
> Puglia Digitale\
> Una piattaforma interattiva immersiva per la valorizzazione territoriale.

**CTA primaria** · a → `https://www.lapugliadigitale.it` · verbatim · `cta_id` pd-hero-portale
> Visita il portale ↗

**Nome accessibile della CTA primaria**
> Visita il portale Puglia Digitale (si apre in una nuova scheda)

**CTA secondaria** · link testuale → `#richiesta` · max 28 · `cta_id` pd-hero-richiesta
> Aderisci a Puglia Digitale ↓

Note:
- H1 composto da nome e descrittore, come nella mappa SEO §2: distingue il progetto dai programmi omonimi della Regione. Tra le due righe c'è un separatore nascosto alla vista (`<span class="sr-only"> – </span>`): il nome accessibile dell'H1 è «Puglia Digitale – Una piattaforma interattiva immersiva per la valorizzazione territoriale.» (review di accessibilità del 2026-09-28, T6).
- CTA secondaria: la strategia di conversione propone «Porta la tua impresa in Puglia Digitale» (39 caratteri). La guida di stile fissa un massimo di 28 caratteri: propongo «Aderisci a Puglia Digitale ↓», che riprende la sezione «Perché aderire». Da confermare con cro-specialist.
- **Riserva di go-live I6** (ADR 002, in stato di proposta). Se il cliente risponde a D1 che ITnode è partner tecnologico, e non conferma di gestire le adesioni, la CTA diventa «Porta la tua impresa in Puglia Digitale». Con la freccia sono 41 caratteri, oltre i 28 della guida di stile. In quel caso propongo «Contattaci ↓» (12): è la CTA delle LG per questa pagina (§16), porta allo stesso form e non dice chi gestisce le adesioni. Decidono brand-strategist e cro-specialist.
- **Dominio del portale**: lapugliadigitale.it, confermato dall'utente il 2026-10-05 (brief S7). Il link resta con www, come nelle LG, finché la verifica da una rete normale non dice altro (specifiche SEO §5.4).
- **Visual.** Nessuna foto: la hero finisce sulla costa della Terra di Bari, un'unica linea con i nodi di Acquaviva, Gravina e Monopoli e le etichette mono «MARE ADRIATICO» e «MURGIA» (direzione visiva §7.5, riga 1). È decorativa (`aria-hidden`): i luoghi sono nominati nel testo e nella sezione 4. Lo slot `puglia-paesaggio` della v1.2 non esiste più.

## 2. Dalla costa all’entroterra

**H2** · verbatim · max 60 · due registri: «Dalla costa all’entroterra.» e «Un territorio da esplorare.»
> Dalla costa all’entroterra. Un territorio da esplorare.

**Testo 1** · p · blocco di risposta D · max 500 · link esterno su «lapugliadigitale.it»
> Puglia Digitale è una piattaforma interattiva immersiva per la valorizzazione territoriale, online su lapugliadigitale.it. È un progetto di destination marketing che digitalizza e valorizza città, borghi e imprese della Puglia attraverso esperienze immersive, dalla costa all’entroterra. Tra i luoghi da esplorare ci sono Acquaviva delle Fonti, Gravina in Puglia e Monopoli. Con Puglia Digitale, ITnode porta online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.

**Testo 2** · p · max 260
> Fare destination marketing significa promuovere un territorio come destinazione. Puglia Digitale lo fa mettendo in rete luoghi e imprese: chi cerca la Puglia non si limita a leggerla, la esplora prima di partire e la ritrova dopo il ritorno.

**Link nel Testo 1**
| Campo | Valore |
|---|---|
| Testo visibile | lapugliadigitale.it, senza icona: è un link nel testo, non una CTA |
| Nome accessibile | lapugliadigitale.it (si apre in una nuova scheda) |
| Destinazione | `https://www.lapugliadigitale.it`, nuova scheda, `rel="noopener"` |
| Tracciamento | `cta_id` pd-progetto-portale, `cta_location` sezione, `outbound_type` portale (strategia di conversione §4) |

**Fotografia dell'evento** · `figure` accanto al testo · immagine `src/assets/images/derivate/evento-schermo.jpg` (ritaglio 4:5 sul maxischermo)
| Elemento | Testo |
|---|---|
| Testo alternativo | La platea dell’evento Puglia Digitale davanti al maxischermo con il tour virtuale di una piazza storica. |
| Nota di trasparenza · `figcaption` | Immagine elaborata con strumenti di intelligenza artificiale |

Note:
- Il Testo 1 è il Blocco D della mappa SEO, con le stesse parole; una frase è spezzata in due per la leggibilità (Gulpease). È il primo paragrafo sotto l'H2, nell'HTML statico. Nel sito il dominio è un link al portale: il testo visibile non cambia, e il testo nascosto « (si apre in una nuova scheda)» sta dentro il link.
- «destination marketing» in minuscolo nel testo corrente, come propone il brief (DR2).
- Parola lunga nel titolo: «all’entroterra.» è un blocco di 15 caratteri. A 44 px su 390 px rischia di uscire dalla colonna: prevedere `hyphens: auto` con `lang="it"` o una scala minima più bassa per questo titolo.
- **Foto.** È la composizione della direzione visiva (§7.5, riga 2): persone davanti al maxischermo con il tour virtuale di una piazza. In questo ritaglio il palco non si vede, quindi la didascalia della v1.2, con il fondatore sul palco, non vale più. Il testo alternativo è in `docs/contenuti/alt-text.md`.
- **Didascalia: solo la nota di trasparenza** (review di veridicità, B4). Il file sorgente porta il segno di un editor generativo, quindi la foto ha una nota di trasparenza, come i ritratti. Niente data, luogo, numero di partecipanti né nome dell'oratore: le didascalie restano così finché il cliente non manda l'originale dello scatto.
  - Con l'originale la nota si toglie (B4). Luogo e data si aggiungono solo se confermati (A4): «[DA FORNIRE: luogo], [DA FORNIRE: mese e anno]».
  - In platea c'è almeno un volto riconoscibile di profilo (B4): servono l'informativa sulle riprese o un ritaglio più stretto (condizione C07 del verdetto G4).

## 3. Numeri

**H2** · max 45
> I numeri dei territori coinvolti

**Numeri** · copy · componente Stats (`<dl>`)
| # | Valore (visivo) · max 10 | Didascalia · max 45 | Testo per le tecnologie assistive |
|---|---|---|---|
| 1 | 30+ | città coinvolte | Più di 30 città coinvolte |
| 2 | ~200.000 | partite IVA nei territori coinvolti | Circa 200.000 partite IVA nei territori coinvolti |
| 3 | 60% | del tessuto produttivo pugliese è in questi territori | Il 60% del tessuto produttivo pugliese si trova nei territori coinvolti |

**Nota sotto i numeri** · p · max 70 · obbligatoria
> Dati ITnode, aggiornati a [DA FORNIRE: mese e anno].

Note:
- Valori e didascalie della §14, dati forniti dal cliente (brief N1–N3). Primo adattamento: «Città» diventa «città coinvolte», come «territori coinvolti».
- Riga 3 allineata al sito nella v1.2: etichetta e testo nascosto sono quelli della review di veridicità (I9), perché «del tessuto produttivo pugliese» si poteva leggere come «il 60% delle imprese pugliesi è su Puglia Digitale». L'etichetta ha 53 caratteri, oltre il massimo di 45 della tabella: a 390 px va su due righe, a 320 px su tre (misurato il 2026-09-28).
- L'H2 dice a che cosa si riferiscono i numeri: al bacino economico dei territori, non alle imprese presenti sulla piattaforma. Nessuna didascalia deve diventare «200.000 imprese in Puglia Digitale» o «il 60% delle imprese pugliesi aderisce». La mappa SEO proponeva «Puglia Digitale in numeri»: questo titolo protegge meglio il claim N2.
- La nota con la fonte è obbligatoria: il componente Stats non mostra numeri senza fonte (strategia di conversione §9; brief DR4). Che cosa si pubblica, e con quale nota, lo ha deciso brand-strategist (B3): vedi la tabella qui sotto. Oggi, in anteprima, il sito mostra «Dati ITnode.»: la data arriva da `src/data/figures.ts` quando il cliente la fornisce.
- Markup: il valore visivo è `aria-hidden="true"` e accanto c'è il testo per le tecnologie assistive, visivamente nascosto. Senza questo accorgimento alcuni lettori di schermo leggono «tilde 200.000».

**Stati della sezione al lancio** · decisione B3 di brand-strategist (review di veridicità) e verdetto G4 (§§ 3.7 e 3.8)

| Situazione | Che cosa si pubblica | Nota sotto i numeri |
|---|---|---|
| Anteprima protetta | I tre numeri, perché il cliente li riveda e li confermi | «Dati ITnode.» |
| Go-live con fonte e data per tutti e tre i numeri | I tre numeri e il titolo «I numeri dei territori coinvolti» | «Città: dati ITnode, aggiornati a [mese anno]. Partite IVA e tessuto produttivo: elaborazione ITnode su dati [fonte], [anno].» È più lunga del massimo di 70: l'a capo va verificato |
| Go-live con la conferma del solo «30+»: numero, perimetro e data | La variante di riserva a un numero, qui sotto | «Dati ITnode, aggiornati a [mese anno].» |
| Go-live senza conferma nemmeno del «30+» | Niente: la sezione non si pubblica e il layout resta pronto (direzione visiva §7.5) | — |

### Variante di riserva · un solo numero (B3)

**Da non applicare ora.** È pronta per quando il cliente risponde, se resta confermato solo «30+». Composizione della direzione visiva (§7.5): un solo numero in `display-xxl` dalla colonna 3, con etichetta e nota con la data.

**H2 della variante** · max 45 (28)
> Puglia Digitale in un numero

Alternativa: «Il territorio di Puglia Digitale» (32).

**Numero** · componente Stats con un solo elemento
| Valore (visivo) | Etichetta | Testo per le tecnologie assistive |
|---|---|---|
| 30+ | città coinvolte | Più di 30 città coinvolte |

**Nota sotto il numero** · p · obbligatoria, con la data
> Dati ITnode, aggiornati a [DA FORNIRE: mese e anno].

Condizioni (brand-strategist, B3 e I9): il cliente conferma il numero, il perimetro e il mese e l'anno del dato. Numero e perimetro sono confermati dal 2026-10-06 (le 31 città pugliesi dell'elenco); manca la data. Il perimetro deve dire quali sono le città e che sono tutte di Puglia Digitale. Se comprende città di altri progetti, per esempio di Città Digitali, il numero non vale per questa pagina: decide brand-strategist.

Note:
- **Perché questo titolo.** Dice che cosa contiene la sezione e di chi è il numero. Il singolare rende il numero unico una scelta di composizione, non il vuoto lasciato da altri due. Recupera la proposta della mappa SEO («Puglia Digitale in numeri»), accantonata per proteggere il claim delle partite IVA (N2): senza quel numero, il rischio non c'è più.
- **Perché non «Il numero dei territori coinvolti»**, il singolare letterale del titolo attuale. «Il numero dei territori» è un conteggio di territori, mentre qui si contano città; e «coinvolti» si ripeterebbe subito nell'etichetta «città coinvolte».
- **Etichetta e testo nascosto restano quelli già approvati**: il titolo dice già a che cosa si riferiscono. Lo screen reader legge «Puglia Digitale in un numero», poi «Più di 30 città coinvolte», poi la nota.
- **A capo**, provati il 2026-09-28 con DOM iniettato e il numero dalla colonna 3: il titolo sta su una riga da 360 a 1920 px; a 320 px va su due, «Puglia Digitale / in un numero». L'alternativa va a capo in «Il territorio di / Puglia Digitale», sempre solo a 320 px.
- **Dove si applica**: in `src/pages/puglia-digitale.astro`, il `title` di `<Stats>` e il solo primo elemento di `stats`; in `src/data/figures.ts`, mese e anno in `pugliaUpdated`. La composizione a un numero la cura ui-designer.
- **seo-content** allinea l'H2 nella mappa keyword→URL, se la variante va online.
- **Elenco e perimetro di «30+ città»: confermati** dall'utente il 2026-10-06. Sono le 31 città pugliesi dell'elenco di Città Digitali (`citta-digitali-elenco.md`; brief N1). Manca solo la data dei dati: la proposta di brand-strategist è «ottobre 2026», da confermare.

## 4. I luoghi

**H2** · verbatim · max 20
> I luoghi

**Testo** · p · max 90
> Tre città, tre porte d’accesso al territorio. Scegli da dove entrare.

**Schede dei luoghi** · copy · una colonna per luogo, da ovest a est, come nel sito
| Campo | Luogo 1 | Luogo 2 | Luogo 3 |
|---|---|---|---|
| Nome · H3 · max 24 | Gravina in Puglia | Acquaviva delle Fonti | Monopoli |
| Riga · p · max 80 | La città che prende il nome dalla sua gravina, nell’Alta Murgia. | Nell’entroterra barese, la città in cui ha sede ITnode. | Sulla costa adriatica, tra il porto antico e il centro storico. |
| Dominio · p · mono · `aria-hidden` | gravinadigitale.it | acquavivadigitale.com | monopolidigitale.it |
| CTA · a · verbatim | Esplora ↗ | Esplora ↗ | Esplora ↗ |
| Nome accessibile della CTA | Esplora Gravina in Puglia su gravinadigitale.it (si apre in una nuova scheda) | Esplora Acquaviva delle Fonti su acquavivadigitale.com (si apre in una nuova scheda) | Esplora Monopoli su monopolidigitale.it (si apre in una nuova scheda) |
| URL | https://www.gravinadigitale.it | https://www.acquavivadigitale.com | https://www.monopolidigitale.it |
| `cta_id` | pd-luoghi-gravina | pd-luoghi-acquaviva | pd-luoghi-monopoli |

Note:
- **Ordine da ovest a est**: Gravina, Acquaviva, Monopoli. È la decisione del G4 (direzione visiva §7.5, riga 4): le porte stanno sull'orizzonte secondo la longitudine reale, e l'ordine del DOM è lo stesso a ogni larghezza, quindi anche l'ordine del focus (WCAG 1.3.2 e 2.4.3). Sostituisce l'ordine «dalla costa all'entroterra» che proponevo nella v1.2: le righe valgono in qualunque ordine.
- Ogni riga contiene un solo fatto geografico, verificato su fonti pubbliche (vedi Fonti). Per Acquaviva c'è anche il legame con ITnode, che lì ha la sede operativa (§22). Nessuna informazione sui contenuti dei portali, che non si possono consultare.
- Nel sito, sotto il nome, le coordinate del comune in mono, e sotto la CTA il dominio: entrambi nascosti agli screen reader, perché il dominio è già nel nome accessibile di «Esplora».
- **Immagini delle porte.** Acquaviva: `derivate/acquaviva-porta.jpg`, nel sito dal commit d60b95f. Gravina e Monopoli: le immagini del portale sono arrivate il 2026-10-06 e aspettano il ritaglio; fino ad allora restano gli slot `luogo-gravina` e `luogo-monopoli`, nascosti agli screen reader. Tutte e tre hanno i segni grafici del portale, per decisione dell'utente (ADR 007).

**Foto delle porte** · `figure` nella porta 3:5 · alt e nota; varianti per altri ritagli in `alt-text.md`
| Porta | Testo alternativo | Nota sotto la foto (`label` mono) |
|---|---|---|
| Gravina in Puglia · `gravina-digitale.webp`, ritaglio centrale a tutta altezza, in arrivo | Una chiesa in pietra vista di scorcio, con una finestra tonda e un piccolo portale sormontato da una statua; sopra, pannelli digitali azzurri. | Immagine elaborata digitalmente |
| Acquaviva delle Fonti · `derivate/acquaviva-porta.jpg`, nel sito | Una piazza con un palazzo sul fondo, oltre una ringhiera e uno spazio ribassato in pietra; sopra, segnaposto arancioni e pannelli digitali azzurri. | Immagine elaborata digitalmente |
| Monopoli · `monopoli-digitale.webp`, ritaglio centrale a tutta altezza, in arrivo | Un muro imbiancato con un balconcino rosso e una bicicletta rossa con un cesto di fiori; sopra, una fascia di pannelli digitali azzurri e segnaposto. | Immagine elaborata digitalmente |

Note sulla foto:
- **Che cosa sono.** Immagini del portale del cliente con una grafica digitale sovrapposta: pannelli trasparenti azzurri, segnaposto arancioni (non a Gravina), piccole luci. La grafica resta per decisione dell'utente (2026-10-06), perché «segna l'aspetto digitale della città». Per questo gli alt la descrivono. L'associazione delle immagini a Gravina e Monopoli l'ha confermata l'utente il 2026-10-06.
- **Testo alternativo.** Non ripete il nome della città, che è nel titolo della porta, e non nomina luoghi non verificati: né la piazza di Acquaviva né la chiesa di Gravina, perché è confermata la città, non che sia la cattedrale. Per Gravina e Monopoli è scritto per il ritaglio centrale a tutta altezza; varianti e regole per qualunque riquadro sono in `alt-text.md`. I ritagli li sceglie il creative-director.
- **Nota.** Segue l'ADR 002: dice solo ciò che è certo, cioè che la grafica è un'elaborazione digitale, senza affermare né escludere l'AI. Quando l'utente risponde, la nota cambia con le formule di `alt-text.md`. Con l'AI: «Immagine elaborata con strumenti di intelligenza artificiale» (o «generata», o «generata o elaborata»). Senza AI: «Foto con grafica digitale aggiunta».
- **Fonte: nessun credito sotto la foto.** È materiale del cliente; «cittàdigitali.it» su questa pagina legherebbe la foto a un altro progetto. Il credito serve solo se l'autore lo chiede. [DA FORNIRE: autore, data, diritti, uso di AI]
- **Collegamento nel sito** (sessione principale): l'alt va preso da qui o da `alt-text.md`, non dal campo `alt` di `asset-slots.ts`, che contiene il solo nome della città.
- La mappa SEO chiede 2–3 righe per luogo [DA FORNIRE dal cliente]. Qui c'è una riga, come previsto dall'incarico.

## 5. Perché aderire a Puglia Digitale

**Eyebrow** · p · max 36
> Per le imprese

**H2** · max 45
> Perché aderire a Puglia Digitale

**Motivo 01** · H3 · verbatim · max 45
> Aperti al mondo, 24/7

**Testo 01** · p · max 180
> La tua impresa resta visitabile a ogni ora, da chiunque e da qualunque luogo. Il portale è aperto anche quando tu hai chiuso.

**Motivo 02** · H3 · verbatim · max 45
> Vendere attraverso l’esperienza

**Testo 02** · p · max 180
> Chi esplora i tuoi spazi scopre prodotti e servizi nel loro contesto reale. La vendita comincia da un’esperienza, non da una vetrina.

**Motivo 03** · H3 · verbatim · max 45
> La forza della rete

**Testo 03** · p · max 180
> La tua attività non è sola online: entra in un portale che riunisce città, borghi e imprese del territorio. Chi arriva per un luogo può scoprire anche te.

**Motivo 04** · H3 · verbatim · max 45
> Continuare la relazione oltre il viaggio

**Testo 04** · p · max 180
> Il viaggio finisce, il legame no. Chi ti ha conosciuto in Puglia può tornare a trovarti online, rivedere i tuoi spazi e ricontattarti da casa.

Note:
- Numerazione 01–04 decorativa (`aria-hidden="true"`). Composizione dinamica, non quattro card identiche (§16).
- Nessun dato su traffico o vendite.
- La foto dell'evento non sta più qui: è nella sezione 2.
- Il link a `/siii/` con anchor «cos’è un Sito Interattivo Immersivo» nel Testo 02 (mappa SEO) si aggiunge solo se il cliente conferma che le imprese entrano nel portale con un SIII (brief I3). Fino ad allora il collegamento a `/siii/` è nella sezione 7.

## 6. Chiusura e form

**H2** · verbatim · max 50 · due registri: «Porta la tua impresa» e «dentro Puglia Digitale.»
> Porta la tua impresa dentro Puglia Digitale.

**Titolo del form** · H3 · verbatim · senza link e senza freccia · ancora `#richiesta`
> Contattaci

**Introduzione del form** · p · max 160
> Raccontaci la tua impresa: ti spieghiamo come entrare in Puglia Digitale.

Note:
- **La CTA delle LG è il titolo del form.** Il form sta subito sotto lo statement: un link che lo raggiunge sarebbe inutile (`struttura-pagine.md`, come SI-8 e CD-5). La v1.2 la prevedeva come link, con `cta_id` pd-chiusura-contattaci: nel sito non esiste.
- Nella chiusura non c'è un link secondario al portale: il portale è già nella hero e nel primo paragrafo (review di bozze del 2026-09-28, P2).
- «Mi interessa»: Puglia Digitale preselezionato in build (`form_id` richiesta-puglia-digitale). Casella privacy sempre vuota. Pulsante: «Invia richiesta». Verificato sullo staging del 2026-10-05.
- Introduzione del form: testo della strategia di conversione §8, adottato così com'è.
- Microcopy del form (copywriter-brand, `microcopy.md` §4): sotto «Messaggio» il suggerimento «In quale città lavori e di cosa si occupa la tua attività?»; dopo l'invio, l'azione «Visita il portale ↗», con lo stesso nome accessibile e lo stesso indirizzo della CTA della hero.

## 7. Gli altri mondi ITnode

**H2** · max 36
> Gli altri mondi ITnode

**Testo** · p · max 150 · due link interni
> Dalla singola impresa alla rete di città: la stessa visione si ritrova nei Siti Interattivi Immersivi (SIII) e in Città Digitali.

Link: «Siti Interattivi Immersivi (SIII)» → `/siii/`; «Città Digitali» → `/citta-digitali/`. È la prima occorrenza della sigla nel testo della pagina, quindi va sciolta (glossario del brief). Nel sito l'H2 è in `label` e la sezione sta prima della chiusura con il form.

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Hero | Aderisci a Puglia Digitale ↓ | `#richiesta` |
| Sezione 7 | Siti Interattivi Immersivi (SIII) · Città Digitali | `/siii/` · `/citta-digitali/` |

In entrata: Home (capitolo 02, «Scopri Puglia Digitale →»), blocchi finali di `/siii/` e `/citta-digitali/`, `/contatti/` (I portali e azioni dopo l'invio del form), navigazione e footer.

Link esterni: «Visita il portale ↗» nella hero, «lapugliadigitale.it» nel Testo 1, le tre «Esplora ↗» della sezione 4, l'azione dopo l'invio del form, più il footer.

## Allineamenti con gli altri documenti

| Punto | Scelta in questo documento | Motivo |
|---|---|---|
| Ancora del form | `#richiesta` | Strategia di conversione. La mappa SEO (§3.3) usa ancora `#aderisci`: va allineata. |
| H2 dei numeri | «I numeri dei territori coinvolti» (la mappa propone «Puglia Digitale in numeri») | Rende chiaro il perimetro dei dati (brief N2). |
| H2 con il solo «30+» | «Puglia Digitale in un numero» (variante di riserva, sezione 3; copywriter-brand, v1.2) | Senza le partite IVA il rischio N2 non c'è più; il singolare segue il numero unico (direzione visiva §7.5). |
| Etichetta del 60% | «del tessuto produttivo pugliese è in questi territori» | Allineata al sito (review di veridicità, I9). |
| Occhiello della hero | Nessuno: lo sostituisce il breadcrumb | Direzione visiva §7.8; review di accessibilità del 2026-09-28, T11. |
| Luoghi | Ordine da ovest a est | Decisione del G4 (direzione visiva §7.5, riga 4). |
| Foto dell'evento | Nella sezione 2, con la nota di trasparenza come didascalia | Direzione visiva §7.5, riga 2; review di veridicità, B4. |
| CTA secondaria della hero | «Aderisci a Puglia Digitale ↓» | Massimo 28 caratteri (tone of voice §6); stesso schema di Città Digitali. È nel sito. |
| Chiusura | «Contattaci» come titolo del form, senza link | Come le chiusure di SIII e Città Digitali (`struttura-pagine.md`). |
| Ponte | Prima della chiusura | Come SIII (`struttura-pagine.md` SI-7). |

## Verifica sul sito (2026-10-05)

**Metodo.**
- Staging http://localhost:4321, build del 2026-10-05 che corrisponde al commit 5c4a6cb. Confronto con `src/pages/puglia-digitale.astro`, `src/data/site.ts`, `src/data/figures.ts`, `src/data/media.ts` e `src/data/pages.ts`.
- Testi letti dal DOM (`textContent`), nomi accessibili dall'albero di accessibilità di Chromium, a 1440 px.
- Due script. Il primo controlla che ogni testo da pubblicare di questo documento compaia nella pagina, carattere per carattere. Il secondo cerca il contrario: i testi della pagina che il documento non riporta, fuori dal form, che è microcopy di copywriter-brand.

**Esito.** I testi da pubblicare di questo documento sono tutti nel sito, identici (60 testi su 62 trovati dallo script; title e meta controllati a parte). Fanno eccezione, come previsto, l'H2 della variante di riserva, che non è applicata, e il Testo 1, che nel sito contiene dentro il link il testo nascosto « (si apre in una nuova scheda)»: a schermo è identico. Rispetto alla v1.2 ho allineato questi punti: in ognuno il sito seguiva una decisione registrata.

| Punto | v1.2 | Sito, ora anche qui | Decisione |
|---|---|---|---|
| Occhiello della hero | «Destination marketing» | Breadcrumb | Sessione principale; direzione visiva §7.8 (T11) |
| Visual della hero | Slot `puglia-paesaggio` | Linea della costa, decorativa | Direzione visiva §7.5, riga 1 |
| Dominio nel Testo 1 | Testo semplice | Link al portale, nuova scheda | Strategia di conversione §4 (`pd-progetto-portale`) |
| Foto dell'evento | Sezione 5, ritaglio panoramico, didascalia con luogo, data e nome | Sezione 2, ritaglio sul maxischermo, nota di trasparenza | Direzione visiva §7.5, riga 2; review di veridicità, B4 |
| Ordine dei luoghi | Dalla costa all'entroterra | Da ovest a est | G4; direzione visiva §7.5, riga 4 |
| Chiusura | Link «Contattaci →» | Titolo del form, senza link | `struttura-pagine.md` |
| Ponte | Dopo il form | Prima della chiusura | `struttura-pagine.md` SI-7, come su SIII |
| Nome accessibile dell'H1 | Non indicato | «Puglia Digitale – Una piattaforma interattiva immersiva per la valorizzazione territoriale.» | ux-designer, T6 |

**Differenze aperte.**

| # | Dove | Differenza | Proposta | Chi decide |
|---|---|---|---|---|
| V1 | `docs/creativa/direzione-visiva.md` §7.5 | Riga 1: «Visita il portale →», mentre il sito e il tone of voice hanno ↗. Riga 2: «didascalia solo con data e luogo», mentre il sito ha la nota di trasparenza (B4). Riga 6: CTA «Contattaci →» e un link secondario al portale, mentre il sito ha «Contattaci» come titolo del form e nessun link al portale | Allineare il documento al sito. Il sito non cambia | creative-director |
| V2 | `docs/seo/mappa-keyword-url.md` §3.3 | Usa ancora `#aderisci` e l'H2 «Puglia Digitale in numeri» | Allineare il documento al sito. Il sito non cambia | seo-content |

## Testi originali mancanti

- **Perché aderire (§16).** Le LG chiedono di «riorganizzare i contenuti forniti», ma i testi originali non sono nel repository (brief §7, P1). Le descrizioni sono scritte solo a partire dai quattro titoli e dal concept della §13. [DA FORNIRE: testi originali]
- **Dalla costa all’entroterra (§13).** Blocco D della mappa SEO e un secondo paragrafo con una definizione generale di destination marketing.
- **I luoghi (§15).** Una riga per luogo, con un fatto geografico da fonti pubbliche citate. [DA FORNIRE: 2–3 righe per luogo dal cliente]
- **Numeri (§14).** [DA FORNIRE: fonte, data di riferimento ed elenco delle città]

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, statement, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 21 | 277 | 1.424 | **60,3** |
| Tutti i testi principali | 41 | 365 | 1.927 | 69,9 |

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. I blocchi di risposta della mappa SEO, pieni di nomi di prodotto lunghi, abbassano l'indice: per questo alcune frasi sono state spezzate, a parole invariate. Lo stesso script ha controllato 35 elementi con limite di lunghezza (nessuno supera il massimo, salvo l'etichetta del 60%, spiegata nella sezione 3) e i limiti di title e meta description. Ricalcolato il 2026-10-05: i paragrafi non cambiano; il totale sale di una frase perché conta il titolo del form, e c'è un elemento in meno perché l'occhiello non c'è più.

## Ipotesi da validare

- [DA VERIFICARE: «60% del tessuto produttivo pugliese» è la quota di imprese pugliesi che si trova nei territori coinvolti. È la lettura su cui si basano l'H2 e le didascalie; la verifica di coerenza è nel brief, N3]
- [DA VERIFICARE: «~200.000 partite IVA» e «60%» si riferiscono ai territori delle 31 città di Puglia Digitale (brief I6). Servono fonte, anno e definizione; con l'elenco si possono controllare su dati pubblici per comune]
- [DA VERIFICARE: risposta del portale da una rete normale: risoluzione del dominio, HTTPS, forma con o senza www (seo-technical, review del dominio, oss. 1; specifiche SEO §5.4)]

## Domande aperte

1. Ruolo di ITnode in Puglia Digitale (brief D1). Dalla risposta dipendono l'attribuzione e il Blocco D. Il dominio del portale è invece chiuso: lapugliadigitale.it, confermato dall'utente il 2026-10-05.
2. Numeri (D7): per «30+ città» solo la data, perché elenco e perimetro sono confermati; per «~200.000» e «60%», fonte, anno e definizione.
3. Le imprese entrano nel portale con un SIII, con un tour virtuale o con entrambi (I3, D4)?
4. Originale della foto dell'evento, con data e luogo, e informativa sulle riprese per le persone in platea (A4, B4, D9; condizione C07 del verdetto G4).

## Decisioni richieste

- **brand-strategist e cro-specialist**: «Contattaci ↓» come forma breve della riserva I6 (proposta nelle note della hero).
- **seo-content**: allineare nella mappa l'ancora `#richiesta` e l'H2 dei numeri (V2).
- **cro-specialist**: etichetta della CTA secondaria della hero.
- **brand-strategist e creative-director**: variante di riserva a un numero (sezione 3). Il titolo proposto è «Puglia Digitale in un numero», l'alternativa «Il territorio di Puglia Digitale». Si applica solo alle condizioni di B3.
- **creative-director**: allineamento della direzione visiva (V1).

## Rischi

- **Omonimia e attribuzione.** «Puglia Digitale» è anche il nome dei programmi regionali e di un portale di tour virtuali di un'associazione. Un testo che attribuisse il progetto a ITnode, o che suggerisse un legame istituzionale, potrebbe risultare falso (soglia 1). La foto con la scritta «Evento regionale» sul fondale rafforza la lettura istituzionale: per questo gli alt e le didascalie non riprendono la parola «regionale». Il ritaglio della sezione 2 non mostra il fondale.

## Fonti consultate

Consultate il 2026-09-28. I portali e itnode.it sono bloccati dall'ambiente. Il 2026-10-05 non ho consultato nuove fonti web.

- Monopoli, costa adriatica, porto antico e centro storico: https://it.wikipedia.org/wiki/Monopoli_(Italia) · https://www.tuttitalia.it/puglia/60-monopoli/
- Acquaviva delle Fonti, entroterra della provincia di Bari: https://www.italia.it/en/puglia/acquaviva-delle-fonti · https://en.wikipedia.org/wiki/Acquaviva_delle_Fonti
- Gravina in Puglia, nome dalla gravina, sede del Parco nazionale dell'Alta Murgia: https://www.cittaslow.it/citta/gravina-puglia · https://en.wikipedia.org/wiki/Alta_Murgia_National_Park
- Omonimie: vedi brief consolidato §4 e §8.
