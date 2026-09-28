---
titolo: Copy deck · Puglia Digitale
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer, brand-strategist, creative-director]
stato: in revisione
versione: 1.2
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/seo/mappa-keyword-url.md, docs/cro/strategia-conversione.md, docs/creativa/direzione-visiva.md, docs/review/2026-09-28-sito-veridicita-brand-strategist.md, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, src/data/site.ts, src/data/asset-slots.ts, src/data/figures.ts, src/pages/puglia-digitale.astro]
---

# Copy deck · Puglia Digitale

Pagina `/puglia-digitale/`. Copre le sezioni 13, 14, 15 e 16 delle linee guida (LG), la chiusura e l'introduzione al form (§23). Rispetto a SIII il carattere è più territoriale ed emozionale (§13). I testi sono pronti da impaginare.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi, per la scala della §04. **verbatim**: frase delle LG; si cambia solo l'apostrofo tipografico.
- **Frecce** (tone of voice §6): → altra pagina o form, ↓ sezione della pagina nei link secondari, ↗ sito esterno in nuova scheda. Sempre `aria-hidden="true"`.
- **Link esterni**: `target="_blank" rel="noopener"`. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3) e dichiara la nuova scheda.
- **Fonti che prevalgono nel loro dominio**: brief consolidato (fatti e claim), mappa keyword→URL (heading, metadati, blocchi di risposta), strategia di conversione (CTA, ancore, form).
- **Attribuzione.** Finché il cliente non chiarisce il ruolo di ITnode (brief A1, D1, DR4), nessun testo dice che ITnode ha creato Puglia Digitale, né che si tratta di «un progetto ITnode». Formula provvisoria: «Con Puglia Digitale, ITnode porta online…». Nessun riferimento a patrocini, alla Regione o al portale omonimo puglia-digitale.it (A2).

## Metadati

Fa fede `docs/seo/mappa-keyword-url.md` §2 (owner seo-content). Copia per comodità:

| Campo | Testo | Limite |
|---|---|---|
| Title | Puglia Digitale: destination marketing immersivo \| ITnode | ≤ 60 |
| Meta description | Puglia Digitale è una piattaforma di destination marketing che digitalizza e valorizza città, borghi e imprese pugliesi con esperienze immersive. | 140–155 |
| Breadcrumb | Home › Puglia Digitale | — |

## Struttura della pagina

| # | Sezione | Ancora | Componente suggerito (§30) |
|---|---|---|---|
| 1 | Hero | — | Hero |
| 2 | Dalla costa all’entroterra | `#progetto` | LargeStatement + testo editoriale |
| 3 | Numeri | `#numeri` | Stats, grande impatto tipografico |
| 4 | I luoghi | `#luoghi` | LocationShowcase: tre porte d'accesso, non tre card |
| 5 | Perché aderire, con la foto dell'evento | `#perche-aderire` | BenefitsSection con numerazione grande |
| 6 | Chiusura e form | `#richiesta` | CTASection + ContactForm |
| 7 | Gli altri mondi ITnode | — | Riga editoriale con due link |

## 1. Hero

**Eyebrow** · p · max 36
> Destination marketing

**H1** · verbatim · max 90 in totale (riga 1: 15, riga 2: 73) · due righe nello stesso H1: nome alla scala piena, descrittore alla scala del lead
> Puglia Digitale\
> Una piattaforma interattiva immersiva per la valorizzazione territoriale.

**CTA primaria** · a → https://www.lapugliadigitale.it · verbatim · `cta_id` pd-hero-portale
> Visita il portale ↗

**Nome accessibile della CTA primaria**
> Visita il portale Puglia Digitale (si apre in una nuova scheda)

**CTA secondaria** · link testuale → `#richiesta` · max 28 · `cta_id` pd-hero-richiesta
> Aderisci a Puglia Digitale ↓

Note:
- H1 composto da nome e descrittore, come nella mappa SEO §2: distingue il progetto dai programmi omonimi della Regione. La composizione su due livelli la decidono ux-designer e copywriter-brand.
- CTA secondaria: la strategia di conversione propone «Porta la tua impresa in Puglia Digitale» (39 caratteri). La guida di stile fissa un massimo di 28 caratteri: propongo «Aderisci a Puglia Digitale ↓», che riprende la sezione «Perché aderire». Da confermare con cro-specialist.
- Visual: le LG chiedono immagini della Puglia, che negli asset non ci sono (slot `puglia-paesaggio`). [DA FORNIRE]

## 2. Dalla costa all’entroterra

**H2** · verbatim · max 60
> Dalla costa all’entroterra. Un territorio da esplorare.

**Testo 1** · p · blocco di risposta D · max 500
> Puglia Digitale è una piattaforma interattiva immersiva per la valorizzazione territoriale, online su lapugliadigitale.it. È un progetto di destination marketing che digitalizza e valorizza città, borghi e imprese della Puglia attraverso esperienze immersive, dalla costa all’entroterra. Tra i luoghi da esplorare ci sono Acquaviva delle Fonti, Gravina in Puglia e Monopoli. Con Puglia Digitale, ITnode porta online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.

**Testo 2** · p · max 260
> Fare destination marketing significa promuovere un territorio come destinazione. Puglia Digitale lo fa mettendo in rete luoghi e imprese: chi cerca la Puglia non si limita a leggerla, la esplora prima di partire e la ritrova dopo il ritorno.

Note:
- Il Testo 1 è il Blocco D della mappa SEO, con le stesse parole; una frase è spezzata in due per la leggibilità (Gulpease). È il primo paragrafo sotto l'H2, nell'HTML statico.
- «destination marketing» in minuscolo nel testo corrente, come propone il brief (DR2).
- Parola lunga nel titolo: «all’entroterra.» è un blocco di 15 caratteri. A 44 px su 390 px rischia di uscire dalla colonna: prevedere `hyphens: auto` con `lang="it"` o una scala minima più bassa per questo titolo.

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
- La nota con la fonte è obbligatoria: il componente Stats non mostra numeri senza fonte (strategia di conversione §9; brief DR4). Che cosa si pubblica, e con quale nota, lo ha deciso brand-strategist (B3): vedi la tabella qui sotto.
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

**H2** · max 45 (28)
> Puglia Digitale in un numero

Alternativa: «Il territorio di Puglia Digitale» (32).

**Numero** · componente Stats con un solo elemento
| Valore (visivo) | Etichetta | Testo per le tecnologie assistive |
|---|---|---|
| 30+ | città coinvolte | Più di 30 città coinvolte |

**Nota sotto il numero** · p · obbligatoria, con la data
> Dati ITnode, aggiornati a [DA FORNIRE: mese e anno].

Condizioni (brand-strategist, B3 e I9): il cliente conferma il numero, il perimetro e il mese e l'anno del dato. Il perimetro deve dire quali sono le città e che sono tutte di Puglia Digitale. Se comprende città di altri progetti, per esempio di Città Digitali, il numero non vale per questa pagina: decide brand-strategist.

Note:
- **Perché questo titolo.** Dice che cosa contiene la sezione e di chi è il numero. Il singolare rende il numero unico una scelta di composizione, non il vuoto lasciato da altri due. Recupera la proposta della mappa SEO («Puglia Digitale in numeri»), accantonata per proteggere il claim delle partite IVA (N2): senza quel numero, il rischio non c'è più.
- **Perché non «Il numero dei territori coinvolti»**, il singolare letterale del titolo attuale. «Il numero dei territori» è un conteggio di territori, mentre qui si contano città; e «coinvolti» si ripeterebbe subito nell'etichetta «città coinvolte».
- **Etichetta e testo nascosto restano quelli già approvati**: il titolo dice già a che cosa si riferiscono. Lo screen reader legge «Puglia Digitale in un numero», poi «Più di 30 città coinvolte», poi la nota.
- **A capo**, provati il 2026-09-28 con DOM iniettato e il numero dalla colonna 3: il titolo sta su una riga da 360 a 1920 px; a 320 px va su due, «Puglia Digitale / in un numero». L'alternativa va a capo in «Il territorio di / Puglia Digitale», sempre solo a 320 px.
- **Dove si applica**: in `src/pages/puglia-digitale.astro`, il `title` di `<Stats>` e il solo primo elemento di `stats`; in `src/data/figures.ts`, mese e anno in `pugliaUpdated`. La composizione a un numero la cura ui-designer.
- **seo-content** allinea l'H2 nella mappa keyword→URL, se la variante va online.

## 4. I luoghi

**H2** · verbatim · max 20
> I luoghi

**Testo** · p · max 90
> Tre città, tre porte d’accesso al territorio. Scegli da dove entrare.

**Schede dei luoghi** · copy · una colonna per luogo, dalla costa all'entroterra
| Campo | Luogo 1 | Luogo 2 | Luogo 3 |
|---|---|---|---|
| Nome · H3 · max 24 | Monopoli | Acquaviva delle Fonti | Gravina in Puglia |
| Riga · p · max 80 | Sulla costa adriatica, tra il porto antico e il centro storico. | Nell’entroterra barese, la città in cui ha sede ITnode. | La città che prende il nome dalla sua gravina, nell’Alta Murgia. |
| Dominio · p | monopolidigitale.it | acquavivadigitale.com | gravinadigitale.it |
| CTA · a · verbatim | Esplora ↗ | Esplora ↗ | Esplora ↗ |
| Nome accessibile della CTA | Esplora Monopoli su monopolidigitale.it (si apre in una nuova scheda) | Esplora Acquaviva delle Fonti su acquavivadigitale.com (si apre in una nuova scheda) | Esplora Gravina in Puglia su gravinadigitale.it (si apre in una nuova scheda) |
| URL | https://www.monopolidigitale.it | https://www.acquavivadigitale.com | https://www.gravinadigitale.it |
| `cta_id` | pd-luoghi-monopoli | pd-luoghi-acquaviva | pd-luoghi-gravina |
| Immagine (slot) | `luogo-monopoli` | `luogo-acquaviva` | `luogo-gravina` |

Note:
- Ordine proposto: dalla costa all'entroterra, come il titolo della sezione 2. Le LG elencano Acquaviva, Gravina e Monopoli: i testi valgono anche in quell'ordine (in `src/data/site.ts` basta riordinare `pugliaPlaces`).
- Ogni riga contiene un solo fatto geografico, verificato su fonti pubbliche (vedi Fonti). Per Acquaviva c'è anche il legame con ITnode, che lì ha la sede operativa (§22). Nessuna informazione sui contenuti dei portali, che non si possono consultare.
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

**Fotografia dell'evento**, accanto a «La forza della rete» (strategia di conversione §9): `src/assets/images/derivate/evento-panoramica.jpg`, oppure `evento-palco.jpg` su mobile. Testo alternativo in `docs/contenuti/alt-text.md`. La didascalia si pubblica solo quando data e luogo sono confermati (brief A4).

**Didascalia** · figcaption · max 100 · solo con data e luogo confermati
> [DA FORNIRE: luogo], [DA FORNIRE: mese e anno]. Giacomo Lenoci, fondatore di ITnode, sul palco di Puglia Digitale.

Note:
- Numerazione 01–04 decorativa (`aria-hidden="true"`). Composizione dinamica, non quattro card identiche (§16).
- Nessun dato su traffico o vendite.
- Foto dell'evento: nell'originale c'è il segno di Gemini (vedi `alt-text.md`, Rischi) e in platea ci sono persone riconoscibili. Servono liberatorie o l'informativa dell'evento, altrimenti si usa un ritaglio senza volti riconoscibili (brief A4). Nome e ruolo del fondatore: [DA VERIFICARE] (F7).
- Il link a `/siii/` con anchor «cos’è un Sito Interattivo Immersivo» nel Testo 02 (mappa SEO) si aggiunge solo se il cliente conferma che le imprese entrano nel portale con un SIII (brief I3). Fino ad allora il collegamento a `/siii/` è nella sezione 7.

## 6. Chiusura e form

**H2** · verbatim · max 50
> Porta la tua impresa dentro Puglia Digitale.

**CTA** · a → `#richiesta` · verbatim · `cta_id` pd-chiusura-contattaci
> Contattaci →

**Introduzione del form** · p · max 160
> Raccontaci la tua impresa: ti spieghiamo come entrare in Puglia Digitale.

Note:
- Se il form è già visibile, la CTA diventa il titolo del form (H3 «Contattaci», senza freccia).
- «Mi interessa»: Puglia Digitale preselezionato in build (`form_id` richiesta-puglia-digitale). Casella privacy sempre vuota. Pulsante: «Invia richiesta».
- Introduzione del form: testo della strategia di conversione §8, adottato così com'è.

## 7. Gli altri mondi ITnode

**H2** · max 36
> Gli altri mondi ITnode

**Testo** · p · max 150 · due link interni
> Dalla singola impresa alla rete di città: la stessa visione si ritrova nei Siti Interattivi Immersivi (SIII) e in Città Digitali.

Link: «Siti Interattivi Immersivi (SIII)» → `/siii/`; «Città Digitali» → `/citta-digitali/`. È la prima occorrenza della sigla nel testo della pagina, quindi va sciolta (glossario del brief).

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Hero | Aderisci a Puglia Digitale ↓ | `#richiesta` |
| Sezione 6 | Contattaci → | `#richiesta` |
| Sezione 7 | Siti Interattivi Immersivi (SIII) · Città Digitali | `/siii/` · `/citta-digitali/` |

In entrata: Home (capitolo 02, «Scopri Puglia Digitale →»), blocchi finali di `/siii/` e `/citta-digitali/`, `/contatti/` (I portali), navigazione e footer.

## Allineamenti con gli altri documenti

| Punto | Scelta in questo documento | Motivo |
|---|---|---|
| Ancora del form | `#richiesta` | Strategia di conversione. La mappa SEO usa `#aderisci`: va allineata. |
| H2 dei numeri | «I numeri dei territori coinvolti» (la mappa propone «Puglia Digitale in numeri») | Rende chiaro il perimetro dei dati (brief N2). |
| H2 con il solo «30+» | «Puglia Digitale in un numero» (variante di riserva, sezione 3; copywriter-brand, v1.2) | Senza le partite IVA il rischio N2 non c'è più; il singolare segue il numero unico (direzione visiva §7.5). |
| Etichetta del 60% | «del tessuto produttivo pugliese è in questi territori» | Allineata al sito (review di veridicità, I9). |
| Eyebrow della hero | «Destination marketing» | Sostituisce «Un progetto ITnode» della v1.0, un'attribuzione non ancora confermata (A1). |
| Luoghi | Ordine dalla costa all'entroterra | Scelta editoriale, reversibile. |
| CTA secondaria della hero | «Aderisci a Puglia Digitale ↓» | Massimo 28 caratteri (tone of voice §6); stesso schema di Città Digitali. |

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
| Tutti i testi principali | 39 | 355 | 1.875 | 69,1 |

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. I blocchi di risposta della mappa SEO, pieni di nomi di prodotto lunghi, abbassano l'indice: per questo alcune frasi sono state spezzate, a parole invariate. Lo stesso script ha controllato 35 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description.

## Ipotesi da validare

- [DA VERIFICARE: «60% del tessuto produttivo pugliese» è la quota di imprese pugliesi che si trova nei territori coinvolti. È la lettura su cui si basano l'H2 e le didascalie; la verifica di coerenza è nel brief, N3]
- [IPOTESI: «30+ città» sono i comuni coinvolti nel progetto, cioè gli stessi territori delle 200.000 partite IVA (brief N1, I6)]
- [DA VERIFICARE: nome e ruolo del fondatore nella didascalia (F7)]

## Domande aperte

1. Ruolo di ITnode in Puglia Digitale e dominio ufficiale del portale (brief D1). Dalla risposta dipendono l'attribuzione e il Blocco D.
2. Fonte, data e definizione dei tre numeri, con l'elenco delle città (D7).
3. Le imprese entrano nel portale con un SIII, con un tour virtuale o con entrambi (I3, D4)?
4. Data, luogo e liberatorie della foto dell'evento (A4, D9).

## Decisioni richieste

- **creative-director e ux-designer**: ordine dei luoghi e posizione della foto dell'evento.
- **seo-content**: allineare nella mappa l'ancora `#richiesta` e l'H2 dei numeri.
- **cro-specialist**: etichetta della CTA secondaria della hero.

## Rischi

- **Omonimia e attribuzione.** «Puglia Digitale» è anche il nome dei programmi regionali e di un portale di tour virtuali di un'associazione. Un testo che attribuisse il progetto a ITnode, o che suggerisse un legame istituzionale, potrebbe risultare falso (soglia 1). La foto con la scritta «Evento regionale» sul fondale rafforza la lettura istituzionale: per questo la didascalia non riprende la parola «regionale».

## Fonti consultate

Consultate il 2026-09-28. I portali e itnode.it sono bloccati dall'ambiente.

- Monopoli, costa adriatica, porto antico e centro storico: https://it.wikipedia.org/wiki/Monopoli_(Italia) · https://www.tuttitalia.it/puglia/60-monopoli/
- Acquaviva delle Fonti, entroterra della provincia di Bari: https://www.italia.it/en/puglia/acquaviva-delle-fonti · https://en.wikipedia.org/wiki/Acquaviva_delle_Fonti
- Gravina in Puglia, nome dalla gravina, sede del Parco nazionale dell'Alta Murgia: https://www.cittaslow.it/citta/gravina-puglia · https://en.wikipedia.org/wiki/Alta_Murgia_National_Park
- Omonimie: vedi brief consolidato §4 e §8.
