---
titolo: Copy deck · Città Digitali
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer, web-performance-specialist]
stato: in revisione
versione: 1.2
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md (glossario, omonimie, S7), docs/seo/mappa-keyword-url.md, docs/seo/specifiche-tecniche.md (§5.3), docs/seo/dati-strutturati.md, docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md (§5.1), docs/contenuti/tone-of-voice.md, docs/creativa/direzione-visiva.md (§7.6, §7.8), docs/ux/struttura-pagine.md (§2, §4), docs/strategia/citta-digitali-elenco.md (§1, §4, §5), docs/review/2026-09-28-sito-accessibilita-ux-designer.md (§4), docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md, docs/review/2026-10-05-legenda-mappa-copywriter-brand.md, docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md, src/pages/citta-digitali.astro, src/components/sections/LocationShowcase.astro, src/data/pages.ts, src/data/site.ts, src/data/asset-slots.ts, src/scripts/video.ts, dist/ del 2026-10-05 (commit 2a038de)]
---

# Copy deck · Città Digitali

Pagina `/citta-digitali/`. Copre le sezioni 17, 18, 19, 20 e 21 delle linee guida (LG) e l'introduzione al form (§23). I testi sono pronti da impaginare.

**Novità della v1.2 (2026-10-05)**
- **Dominio del portale.** È cittàdigitali.it, con l'accento; nei link `https://xn--cittdigitali-19a.it`. Il dominio senza accento indicato dalle LG (§22) è di un progetto omonimo di altri: non si cita e non si linka (conferma dell'utente del 2026-10-05; brief S7).
- **Nuovo link** «Tutte le città sul portale ↗» nella sezione 2, con il testo di copywriter-brand.
- **Nuova meta description**, decisa da seo-content.
- **Verifica sul sito costruito.** Il documento ora descrive la pagina com'è: ordine delle sezioni, hero senza occhiello, schede delle città senza foto, chiusura senza CTA. Le differenze ancora aperte sono nella sezione «Verifica sul sito».

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi, per la scala della §04. **verbatim**: frase delle LG; si cambia solo l'apostrofo tipografico.
- **Frecce** (tone of voice §6): → altra pagina del sito, ↓ più in basso nella stessa pagina (form compreso), ↗ sito esterno in nuova scheda. Sempre `aria-hidden="true"`.
- **Link esterni**: `target="_blank" rel="noopener"`. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3) e dichiara la nuova scheda.
- **Dominio del portale.** Nel testo visibile e nei nomi accessibili si scrive «cittàdigitali.it», con la «à» composta (U+00E0). Negli `href` va il punycode, senza www: `https://xn--cittdigitali-19a.it` (specifiche SEO §5.3; tone of voice §5). Mai la forma senza accento, che è il dominio di un progetto omonimo (brief, omonimie e S7).
- **Fonti che prevalgono nel loro dominio**: brief consolidato (fatti e claim), mappa keyword→URL (heading, metadati, blocchi di risposta), strategia di conversione (CTA, ancore, form), tone of voice (grafie e convenzioni).
- **Attribuzione.** Non si scrive che ITnode ha creato Città Digitali (brief A1, D5). Formula provvisoria: «con cui ITnode porta online».

## Metadati

Fa fede `docs/seo/mappa-keyword-url.md` §2 (owner seo-content). Copia per comodità:

| Campo | Testo | Limite |
|---|---|---|
| Title | Città Digitali: le attività del territorio online \| ITnode | ≤ 60 |
| Meta description | Città Digitali è il portale con cui ITnode porta online le attività di città come Varese, Altamura e Caltanissetta con tour virtuali e strumenti digitali. | 140–155 |
| Breadcrumb | Home › Città Digitali | — |

Note:
- **Meta description del 2026-10-05** (154 caratteri). La decide seo-content: nomina ITnode con la formula del Blocco E, perché nella ricerca di marca circola un'attribuzione del progetto ad altri (review sull'omonimia, O2 e O3; mappa §2 e §3.4). «Siti Interattivi Immersivi» resta nel sottotitolo e nel testo.
  - Prima era: «Città Digitali porta online le attività di città come Varese, Altamura e Caltanissetta con tour virtuali, Siti Interattivi Immersivi e strumenti digitali.»
- Title, meta e breadcrumb coincidono con il sito (`src/data/pages.ts`, build del 2026-10-05).

## Struttura della pagina

Le sezioni tengono la numerazione delle versioni precedenti, perché altri documenti la citano (per esempio `struttura-pagine.md` §4). L'ordine con cui compaiono nel sito è nella prima colonna.

| Ordine nel sito | Sezione del copy deck | Ancora | Componente (§30) |
|---|---|---|---|
| 1 | 1. Hero | — | Hero `line`, chiusa da un orizzonte decorativo (`aria-hidden`) |
| 2 | 3. Video | `#video` | VideoSection a tutta larghezza |
| 3 | 2. L’Italia in un unico portale | `#portale` | LocationShowcase `italy`: carta d'Italia e tre città, niente card |
| 4 | 4. Dal locale al nazionale | `#come-funziona` | BenefitsSection `sticky`, niente card |
| 5 | 6. Gli altri mondi ITnode | — | Bridge: riga editoriale con due link |
| 6 | 5. Chiusura e form | `#chiusura`; form `#richiesta` | CTASection `form` + ContactForm |

Note:
- **Il video viene prima del portale.** La hero finisce su un orizzonte che si apre nel video, e la carta continua il buio del video (direzione visiva §7.6).
- **Il ponte viene prima della chiusura**, come su SIII e Puglia Digitale (`struttura-pagine.md` SI-7 e SI-8): il form resta l'ultima sezione della pagina. Nella v1.1 proponevo il ponte dopo il form.

## 1. Hero

**Eyebrow.** Non c'è. Sulle pagine interne il breadcrumb («Home / Città Digitali») prende il posto dell'occhiello: è una decisione della sessione principale (direzione visiva §7.8; review di accessibilità del 2026-09-28, T11). La v1.1 proponeva l'occhiello «Digitalizzazione territoriale»: non va reintrodotto senza una nuova decisione.

**H1** · verbatim · max 72 in totale (riga 1: 14, riga 2: 56) · due righe nello stesso H1: nome alla scala piena, statement alla scala dei titoli di sezione
> Città Digitali\
> Le attività del territorio, online senza perdere radici.

**Sottotitolo** · p · verbatim · max 120
> Tour virtuali, Siti Immersivi Interattivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano.

**CTA primaria** · a → `https://xn--cittdigitali-19a.it` (cittàdigitali.it) · verbatim · `cta_id` cd-hero-portale
> Visita il portale ↗

**Nome accessibile della CTA primaria**
> Visita il portale Città Digitali (si apre in una nuova scheda)

**CTA secondaria** · link testuale → `#richiesta` · max 28 · `cta_id` cd-hero-richiesta
> Aderisci a Città Digitali ↓

Note:
- H1 composto da nome e statement, come nella mappa SEO §2: distingue il progetto dagli omonimi («città digitale», smart city). Tra le due righe c'è un separatore nascosto alla vista (`<span class="sr-only"> – </span>`): il nome accessibile dell'H1 è «Città Digitali – Le attività del territorio, online senza perdere radici.» (review di accessibilità del 2026-09-28, T6).
- **Sottotitolo e DR2.** Le LG scrivono «Siti Immersivi Interattivi», con l'ordine invertito rispetto al nome del prodotto. Se l'utente approva la DR2 del brief, il testo diventa «Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano.», con link da «Siti Interattivi Immersivi» a `/siii/` (mappa SEO). Finché la decisione manca, resta verbatim e senza link.
- CTA secondaria: la strategia di conversione propone «Porta la tua attività in Città Digitali» (39 caratteri). La guida di stile fissa un massimo di 28 caratteri, quindi propongo «Aderisci a Città Digitali ↓», da confermare con cro-specialist. Evito «Entra in Città Digitali» nella hero perché, accanto a «Visita il portale ↗», si confonderebbe con il link al portale.
- Parola lunga nel sottotitolo: «imprenditoriale» (15 caratteri). Alla scala del sottotitolo non crea problemi.
- **Dominio visibile vicino alla CTA** (proposta O4 di seo-content, non applicata). Sono favorevole nella forma più leggera: «cittàdigitali.it» in `label` mono sotto le CTA, come l'indirizzo dei portali in Contatti. Nessuna parola nuova, e la grafia con l'accento si impara proprio dove si cerca il portale. Decidono ux-designer e il creative-director, perché cambia la composizione della hero (direzione visiva §7.6).

## 2. L’Italia in un unico portale

**H2** · verbatim · max 40
> L’Italia in un unico portale.

**Testo** · p · blocco di risposta E · max 420
> Città Digitali è la rete e il portale nazionale con cui ITnode porta online le attività del territorio, senza che perdano le proprie radici. Offre al tessuto imprenditoriale e commerciale italiano tour virtuali, Siti Interattivi Immersivi e strumenti digitali. Riunisce in un unico portale, cittàdigitali.it, città come Varese, Altamura e Caltanissetta.

**Statement** · p · max 100 · resa grande
> Da Varese a Caltanissetta, passando per Altamura: città diverse, un’unica rete da esplorare.

**Link all’elenco delle città** · a → `https://xn--cittdigitali-19a.it/tutte-le-citta/` · max 28 · `cta_id` cd-portale-tutte-le-citta · testo di copywriter-brand
> Tutte le città sul portale ↗

**Nome accessibile del link all’elenco**
> Tutte le città sul portale Città Digitali (si apre in una nuova scheda)

**Dettagli del link all’elenco**
| Campo | Valore |
|---|---|
| Posizione | Nella colonna del testo, subito dopo lo statement, prima delle tre città. Così l'ordine del DOM e quello visivo coincidono a ogni larghezza (ux-designer, review della carta del 2026-10-05, §3.2) |
| Testo per gli screen reader | « Città Digitali (si apre in una nuova scheda)», con lo spazio iniziale, in uno `<span class="sr-only">` subito dopo il testo visibile |
| Icona | ↗ in SVG con `aria-hidden="true"`: il link esce dal sito e apre una nuova scheda (tone of voice §6, regola 3) |
| Attributi | `target="_blank" rel="noopener"`, senza `noreferrer` |
| Tracciamento | `data-track="outbound_click"`, `data-cta-id="cd-portale-tutte-le-citta"`, `data-cta-location="luoghi"` (come le tre città della sezione), `data-outbound-type="portale"`, `data-destination-id="citta-digitali"` (piano di misurazione §5.1) |
| Stato | Nel sito dal commit 0a61546; `data-cta-location` corretto da `portale` a `luoghi` nel commit ce276be. Verificato il 2026-10-05: testo, nome accessibile e indirizzo come sopra |

**Schede delle città** · copy · da nord a sud, come nelle LG
| Campo | Città 1 | Città 2 | Città 3 |
|---|---|---|---|
| Nome · H3 · max 16 | Varese | Altamura | Caltanissetta |
| Regione · p · max 16 | Lombardia | Puglia | Sicilia |
| Riga · p · max 60 | La città giardino, tra il lago e le Prealpi. | Sull’altopiano dell’Alta Murgia, nell’entroterra barese. | Capoluogo di provincia nel cuore della Sicilia. |
| CTA · a · max 16 | Esplora ↗ | Esplora ↗ | Esplora ↗ |
| Nome accessibile della CTA | Esplora Varese su varesedigitale.it (si apre in una nuova scheda) | Esplora Altamura su altamuradigitale.com (si apre in una nuova scheda) | Esplora Caltanissetta su caltanissettadigitale.it (si apre in una nuova scheda) |
| URL | https://www.varesedigitale.it | https://www.altamuradigitale.com | https://www.caltanissettadigitale.it |
| `cta_id` | cd-citta-varese | cd-citta-altamura | cd-citta-caltanissetta |

Note:
- Il Testo è il Blocco E della mappa SEO, con le stesse parole; l'ultima frase è spezzata in due per la leggibilità (Gulpease). È il primo paragrafo sotto l'H2, nell'HTML statico. Nomina le città reali, come chiede il brief (N12): «L’Italia in un unico portale» non deve far pensare a una copertura completa del Paese.
- Nel Testo il dominio arriva dal dato del sito (`portals.cittaDigitali.display` in `src/data/site.ts`), come nel footer e in Contatti: si corregge in un punto solo.
- **Il link all'elenco** nomina la sua destinazione: sul portale la pagina si intitola «Tutte le città». Per questo non ha il verbo (tone of voice §6, regola 1, eccezione; review di copywriter-brand, L2).
  - Accanto a «Visita il portale ↗» della hero non si confonde: una porta alla home del portale, l'altra all'elenco delle città.
  - Rimanda alla fonte dell'elenco senza copiare nomi ancora da verificare, e senza dire quante sono le città: nessun numero finché mancano le condizioni di brand-strategist (`citta-digitali-elenco.md` §4).
- La regione è l'elemento che fa percepire «l'Italia»: nel sito è in evidenza in `label`, insieme alle coordinate del comune in mono (`aria-hidden`, da `src/data/site.ts`).
- Le righe contengono un solo fatto geografico, verificato su fonti pubbliche (vedi Fonti). La §18 non prevede una CTA: «Esplora ↗» è ripresa dalla §15 per coerenza con Puglia Digitale.
- **Niente foto e niente riga del dominio.** La v1.1 prevedeva per ogni città il dominio visibile e una foto (slot `luogo-*`). La composizione della direzione visiva (§7.6: carta d'Italia, città allineate alla latitudine del loro nodo) non li ha, e gli slot non esistono in `src/data/asset-slots.ts`. Il dominio della città resta nel nome accessibile di «Esplora».
- **Portali delle città da verificare.** seo-technical trova indizi di indirizzi superati per i tre portali (review del dominio, oss. 2). Se dopo la verifica un link passa alla pagina della città su cittàdigitali.it, il testo visibile resta «Esplora ↗» e il nome accessibile diventa «Esplora [città] su cittàdigitali.it (si apre in una nuova scheda)». L'URL lo indica seo-technical.
- **Sezione in revisione** (direzione visiva 0.6, §7.6). Prima del go-live la carta passa al punto-città, con tutte le città del portale. Finché l'elenco in testo non le sta accanto, la carta avrà una descrizione costruita dai dati, come quella della Home (modello di copywriter-brand, review della legenda, L4). Quando il testo della pagina «Tutte le città» è confermato arriva l'elenco completo, per regione, con fonte e data (seo-content, review sull'omonimia, §5; ux-designer, §3.2). Scrivo io i testi dei due elementi quando la carta e l'elenco sono decisi.

## 3. Video

**Eyebrow** · p · max 36
> Video

**H2** · max 45
> Città Digitali, in movimento.

**Testo** · p · max 120
> Il progetto Città Digitali, raccontato per immagini.

**Descrizione testuale del video** · p · da scrivere dopo la visione
> [DA SCRIVERE dopo la visione del video: 3–5 frasi su che cosa mostra, in ordine]

Note:
- Il video (`https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2`) non è raggiungibile da questo ambiente: titolo e testo restano volutamente generici e non descrivono scene che nessuno del team ha visto. La mappa SEO indica come segnaposto «Città Digitali in video»: il titolo definitivo si sceglie dopo la visione.
- Nome accessibile: `<video aria-labelledby>` collegato all'H2.
- Accessibilità (WCAG 2.2 AA): se nel video si parla servono i sottotitoli (1.2.2); se le informazioni sono solo visive serve la descrizione testuale (1.2.1, 1.2.3, 1.2.5). La descrizione va in un blocco richiudibile sotto il player (`<details>`), con il titolo «Leggi la descrizione del video». Nel sito il blocco compare solo quando la descrizione è scritta.
- Dati strutturati VideoObject (`docs/seo/dati-strutturati.md`): `name` è l'H2 senza punto finale, `description` è il Testo; devono coincidere con il testo visibile (§26). Mancano `thumbnailUrl` (slot `video-poster`), `uploadDate` e `duration`. Finché mancano, il nodo non si pubblica. [DA FORNIRE]

## 4. Dal locale al nazionale

**Eyebrow** · p · max 36
> Come funziona

**H2** · verbatim · max 30
> Dal locale al nazionale.

**Testo** · p · max 200 · link interno su «Sito Interattivo Immersivo (SIII)» → `/siii/`
> Con un tour virtuale o un Sito Interattivo Immersivo (SIII), la tua attività resta radicata nel suo territorio e, dentro un portale nazionale, diventa visitabile da chiunque, ovunque si trovi.

**Concetto 01** · H3 · verbatim · max 45
> Distanze ridotte, fiducia immediata

**Testo 01** · p · max 180
> Chi ti trova online può entrare nella tua attività prima di raggiungerla. Vedere il luogo reale accorcia le distanze e rende più semplice il primo contatto.

**Concetto 02** · H3 · verbatim · max 45
> Maggiore coinvolgimento

**Testo 02** · p · max 180
> Una pagina si scorre, uno spazio si esplora. Chi ti visita decide il percorso e ti scopre un dettaglio alla volta.

**Concetto 03** · H3 · verbatim · max 45
> Visibilità digitale

**Testo 03** · p · max 180
> Sei online con i tuoi spazi reali, dentro un portale dedicato al territorio. Chi esplora la tua città può incontrare anche te.

**Concetto 04** · H3 · verbatim · max 45
> Differenziazione

**Testo 04** · p · max 180
> Una foto mostra, un’esperienza immersiva fa entrare. È ciò che rende la tua attività riconoscibile, oltre la semplice presenza online.

**Concetto 05** · H3 · verbatim · max 45
> La forza di un portale ad alto traffico

**Testo 05** · p · max 180
> Non parti da zero: entri in un portale che riunisce città e imprese. I visitatori che arrivano per un luogo possono fermarsi anche da te.

Note:
- Numerazione 01–05 decorativa (`aria-hidden="true"`). Sezione sticky o composizione editoriale numerata, non cinque card (§20). Nessuna sezione sticky deve contenere il form (strategia di conversione §5).
- Nessun claim numerico: «5–10 volte», «4 volte» e «250.000 visite mensili» non compaiono (brief N6–N8).
- Il titolo 05 è verbatim, ma «ad alto traffico» è già un'affermazione sul traffico (brief N10). Il testo resta qualitativo. Se il cliente non documenta il traffico, il titolo diventa «La forza di un portale nazionale», come propone il brief.

### Modulo «Dato documentato» (predisposto, nascosto per impostazione)

Ogni concetto può mostrare un dato sotto il testo. Il dato compare solo se tutti e quattro i campi sono compilati e la documentazione del cliente è stata controllata; altrimenti il concetto mostra solo il testo qualitativo.

| Campo | Contenuto | max |
|---|---|---|
| Valore | Il numero, per esempio un moltiplicatore o un totale | 10 |
| Etichetta | Che cosa misura, in chiaro | 50 |
| Fonte | Strumento o documento, per esempio lo strumento di analytics del portale | 60 |
| Periodo | Intervallo di rilevazione | 30 |

Resa: `[Valore]` in grande, sotto `[Etichetta]`, poi in piccolo «Fonte: [Fonte], [Periodo]». Testo accessibile sciolto, come per i numeri di Puglia Digitale.

| Affermazione citata nelle LG | Concetto probabile | Cosa serve per pubblicarla |
|---|---|---|
| «5–10 volte» | 02 Maggiore coinvolgimento | [DA FORNIRE: che cosa misura (per esempio il tempo di permanenza), rispetto a che cosa, fonte, periodo] (N6) |
| «4 volte» | [DA VERIFICARE: non è chiaro a quale concetto si riferisca] | [DA FORNIRE: che cosa misura, fonte, periodo] (N7) |
| «250.000 visite mensili» | 05 La forza di un portale ad alto traffico | [DA FORNIRE: export dell'analytics del portale, metrica, periodo] (N8). Formula del brief se documentato: «Oltre 250.000 visite al mese su [portale] (media [periodo], fonte [strumento])» |

## 5. Chiusura e form

**H2** · verbatim · max 80 · due frasi in due registri (vedi nota)
> La tua azienda merita più di una presenza online. Merita di essere esplorata.

**Titolo del form** · H3 · verbatim · senza link e senza freccia · ancora `#richiesta`
> Entra in Città Digitali

**Introduzione del form** · p · max 160
> Raccontaci la tua attività: ti spieghiamo come entrare in Città Digitali.

Note:
- **La CTA delle LG è il titolo del form.** Il form sta subito sotto lo statement, quindi un link che lo raggiunge sarebbe inutile. Come titolo seguito dall'introduzione, «Entra in Città Digitali» dice che si tratta di aderire, non di visitare il portale (`struttura-pagine.md` CD-5; strategia di conversione §4). La v1.1 la prevedeva come link, con `cta_id` cd-chiusura-entra: nel sito non esiste.
- Il titolo ha 77 caratteri. Nel sito è un Passaggio a due registri della stessa scala (`l`), con il secondo spostato a destra (direzione visiva §1.5): a 390 px occupa 7 righe, 4 più 3 (misurato il 2026-10-05). Nella v1.1 suggerivo la prima frase a una scala minore e «Merita di essere esplorata.» alla scala piena. Resta un suggerimento di composizione, non di testo: decidono ui-designer e il creative-director.
- L'introduzione del form scioglie l'ambiguità: dice che cosa succede dopo. È il testo della strategia di conversione §8, adottato così com'è. Il portale resta collegato nella hero.
- «Mi interessa»: Città Digitali preselezionato in build (`form_id` richiesta-citta-digitali). Casella privacy sempre vuota. Pulsante: «Invia richiesta». Verificato sulla build del 2026-10-05.
- Microcopy del form (copywriter-brand, `microcopy.md` §4): sotto «Messaggio» il suggerimento «In quale città lavori e di cosa si occupa la tua attività?»; dopo l'invio, l'azione «Visita il portale ↗», con lo stesso nome accessibile e lo stesso indirizzo della CTA della hero.

## 6. Gli altri mondi ITnode

**H2** · max 36
> Gli altri mondi ITnode

**Testo** · p · max 150 · due link interni
> Dalla rete di città alla singola impresa: la stessa visione si ritrova in Puglia Digitale e nei Siti Interattivi Immersivi (SIII).

Link: «Puglia Digitale» → `/puglia-digitale/`; «Siti Interattivi Immersivi (SIII)» → `/siii/`. Nel sito l'H2 è in `label` e la sezione sta prima della chiusura con il form (vedi «Struttura della pagina»).

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Hero | Aderisci a Città Digitali ↓ | `#richiesta` |
| Sezione 4, Testo | Sito Interattivo Immersivo (SIII) | `/siii/` |
| Sezione 6 | Puglia Digitale · Siti Interattivi Immersivi (SIII) | `/puglia-digitale/` · `/siii/` |

In entrata: Home (capitolo 03, «Esplora Città Digitali →»), blocchi finali di `/siii/` e `/puglia-digitale/`, `/contatti/` (I portali e azioni dopo l'invio del form), navigazione e footer.

## Link esterni

| Da | Testo visibile | Nome accessibile | Verso | `cta_id` |
|---|---|---|---|---|
| Hero | Visita il portale ↗ | Visita il portale Città Digitali (si apre in una nuova scheda) | `https://xn--cittdigitali-19a.it` | cd-hero-portale |
| Sezione 2 | Tutte le città sul portale ↗ | Tutte le città sul portale Città Digitali (si apre in una nuova scheda) | `https://xn--cittdigitali-19a.it/tutte-le-citta/` | cd-portale-tutte-le-citta |
| Sezione 2, tre città | Esplora ↗ | Esplora [città] su [dominio della città] (si apre in una nuova scheda) | portali delle città (tabella della sezione 2) | cd-citta-varese, cd-citta-altamura, cd-citta-caltanissetta |
| Form, dopo l'invio | Visita il portale ↗ | Visita il portale Città Digitali (si apre in una nuova scheda) | `https://xn--cittdigitali-19a.it` | richiesta-citta-digitali-successo-portale |

Nella pagina c'è anche il link del footer («cittàdigitali.it ↗», `microcopy.md` §3). Nella build del 2026-10-05 i quattro link al portale usano tutti il punycode senza www, e il dominio senza accento non compare mai.

## Allineamenti con gli altri documenti

| Punto | Scelta in questo documento | Motivo |
|---|---|---|
| Dominio del portale | cittàdigitali.it nel testo; `https://xn--cittdigitali-19a.it` nei link | Conferma dell'utente del 2026-10-05 (brief S7); forma dell'indirizzo nelle specifiche SEO §5.3. Sostituisce il dominio senza accento delle LG §22, che è di un progetto omonimo di altri |
| Ancora del form | `#richiesta` | Strategia di conversione. La mappa SEO (§3.4) usa ancora `#entra`: va allineata |
| Occhiello della hero | Nessuno: lo sostituisce il breadcrumb | Direzione visiva §7.8; review di accessibilità del 2026-09-28, T11. La v1.1 proponeva «Digitalizzazione territoriale», che a sua volta sostituiva «Un progetto ITnode» della v1.0, un'attribuzione non confermata (A1, D5) |
| CTA secondaria della hero | «Aderisci a Città Digitali ↓» | Massimo 28 caratteri (tone of voice §6), nessuna confusione con il link al portale. È nel sito |
| Titolo di riserva del concetto 05 | «La forza di un portale nazionale» | Brief N10 e mappa SEO (sostituisce la mia proposta «condiviso» della v1.0) |
| Video | H2 «Città Digitali, in movimento.» | Alternativa al segnaposto della mappa SEO; decisione finale dopo la visione |
| Chiusura | «Entra in Città Digitali» come titolo del form, senza link | `struttura-pagine.md` CD-5 |
| Schede delle città | Senza foto e senza riga del dominio | Direzione visiva §7.6 |
| Meta description | Versione del 2026-10-05, con ITnode | seo-content, review sull'omonimia, O3 |

## Verifica sul sito (2026-10-05)

**Metodo.**
- Build `dist/` del 2026-10-05, che corrisponde al commit 2a038de. L'ho copiata e servita in locale. Dopo quel commit `src/` è cambiato in un solo punto, che non tocca i testi: `data-cta-location` del link all'elenco (commit ce276be, controllato sul codice).
- Testi letti dal DOM (`textContent`), nomi accessibili dall'albero di accessibilità di Chromium, a 390 e a 1440 px. Confronto con `src/pages/citta-digitali.astro`, `src/data/pages.ts` e `src/data/site.ts`.
- Uno script controlla che ogni testo da pubblicare di questo documento compaia nella pagina, carattere per carattere.

**Esito.** I testi da pubblicare di questo documento sono tutti nel sito, identici: title, meta, titoli, paragrafi, CTA, nomi accessibili, link e `cta_id` (53 testi su 53 trovati dallo script; title e meta controllati a parte). Rispetto alla v1.1 ho allineato otto punti: in ognuno il sito seguiva una decisione registrata.

| Punto | v1.1 | Sito, ora anche qui | Decisione |
|---|---|---|---|
| Dominio del portale | Senza accento, come nelle LG §22 | cittàdigitali.it; `href` in punycode | Utente, 2026-10-05 (commit eb691ee) |
| Meta description | Senza ITnode | Con ITnode | seo-content, O3 |
| Link all'elenco delle città | Assente | «Tutte le città sul portale ↗» | ux-designer, creative-director e copywriter-brand, 2026-10-05 (commit 0a61546) |
| Occhiello della hero | «Digitalizzazione territoriale» | Breadcrumb | Sessione principale; direzione visiva §7.8 |
| Ordine delle sezioni | Portale, poi video; ponte dopo il form | Video, poi portale; ponte prima della chiusura | Direzione visiva §7.6; `struttura-pagine.md` SI-7 e SI-8 |
| Schede delle città | Dominio visibile e foto | Regione con coordinate, niente foto | Direzione visiva §7.6 |
| Chiusura | Link «Entra in Città Digitali →» | Titolo del form, senza link | `struttura-pagine.md` CD-5 |
| Nome accessibile dell'H1 | Non indicato | «Città Digitali – Le attività del territorio, online senza perdere radici.» | ux-designer, T6 |

**Differenze aperte.**

| # | Dove | Differenza | Proposta | Chi decide |
|---|---|---|---|---|
| V1 | Sito: link «Tutte le città sul portale», `data-cta-location` | Nella build verificata c'era `portale`, un valore fuori dall'elenco del piano di misurazione | **Chiusa il 2026-10-05**: `luoghi`, come le tre città della sezione (snippet di cro-specialist, commit ce276be). Nessun testo cambia | Sessione principale, su indicazione di cro-specialist |
| V2 | `docs/ux/struttura-pagine.md` CD-1 e CD-2 | Citano ancora l'occhiello, il link secondario «Porta la tua attività in Città Digitali ↓» e, per ogni città, dominio e foto | Allineare il documento al sito. Il sito non cambia | ux-designer |
| V3 | `docs/creativa/direzione-visiva.md` §7.6, riga 5 | Cita ancora la CTA «Entra in Città Digitali →» sopra il form | Allineare il documento al sito. Il sito non cambia | creative-director |
| V4 | `docs/seo/mappa-keyword-url.md` §3.4 | Usa ancora `#entra` per il form e cita le «immagini dei territori» tra i materiali mancanti | Allineare il documento al sito. Il sito non cambia | seo-content |

## Testi originali mancanti

- **Dal locale al nazionale (§20).** Le LG chiedono di presentare «i cinque concetti forniti» e citano tre affermazioni numeriche, ma i testi originali non sono nel repository (brief §7, P1). I testi sono scritti solo a partire dai titoli dei concetti. [DA FORNIRE: testi originali e documentazione dei dati]
- **Video (§19).** Contenuto non visto; titolo e testo generici. [DA FORNIRE: file accessibile o descrizione, presenza di parlato, durata, data di pubblicazione, eventuale trascrizione]
- **Città (§18).** Una riga per città, con un fatto geografico da fonti pubbliche citate.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, statement, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 20 | 255 | 1.324 | **60,6** |
| Tutti i testi principali | 38 | 347 | 1.875 | 67,8 |

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. I blocchi di risposta della mappa SEO, pieni di nomi di prodotto lunghi, abbassano l'indice: per questo alcune frasi sono state spezzate, a parole invariate. Lo stesso script ha controllato 39 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description. Ricalcolato il 2026-10-05: i paragrafi non cambiano (il dominio con l'accento ha le stesse lettere); il totale sale di una frase perché conta il titolo del form.

## Ipotesi da validare

- [DA VERIFICARE: indirizzo e titolo della pagina «Tutte le città», `https://xn--cittdigitali-19a.it/tutte-le-citta/`. Vengono dall'indice di ricerca e si controllano da una rete che raggiunge il portale (`citta-digitali-elenco.md` §1; review di copywriter-brand, L2)]
- [DA VERIFICARE: risposta del portale da una rete normale: risoluzione del dominio, HTTPS, forma senza www. È bloccante per il go-live del link (seo-technical, review del dominio, oss. 1)]
- [DA VERIFICARE: i portali di Varese, Altamura e Caltanissetta sono attivi e del cliente (seo-technical, review del dominio, oss. 2)]
- [IPOTESI: le attività entrano in Città Digitali con un tour virtuale o con un Sito Interattivo Immersivo, come dice il sottotitolo della §17]
- [IPOTESI: il portale riunisce città di più regioni, come mostrano Varese, Altamura e Caltanissetta. Il testo non dice «tutta Italia» e non indica un numero di città]

## Domande aperte

1. A che cosa si riferiscono «5–10 volte» e «4 volte», e con quale documentazione (D7)?
2. Esiste un export dell'analytics del portale per le «250.000 visite mensili» (N8)?
3. Contenuto del video: parlato o solo musica, durata, data; serve un file accessibile da questo ambiente (railway.app è bloccato) (S8).
4. Il sito deve rivolgersi anche ai potenziali affiliati del franchising (D5, DR5)?
5. Città Digitali e Puglia Digitale: stessa rete o progetti distinti? Come convivono per le città pugliesi come Altamura (D5)?
6. Per le città che hanno una pagina su cittàdigitali.it, il cliente preferisce che il sito linki quella pagina o il portale della città? La domanda è già nell'elenco di seo-technical (review del dominio, oss. 2).

## Decisioni richieste

- **Utente, tramite la sessione principale** (DR2): allineare il sottotitolo a «Siti Interattivi Immersivi».
- **Cliente e cro-specialist** (N10): titolo 05 «La forza di un portale ad alto traffico» solo con dati documentati, altrimenti «La forza di un portale nazionale».
- **cro-specialist**: etichetta della CTA secondaria della hero.
- **ux-designer e creative-director**: dominio visibile vicino alla CTA della hero (O4 di seo-content; parere favorevole nelle note della sezione 1).
- **ux-designer, creative-director, seo-content**: allineare i propri documenti (V2, V3, V4).

## Fonti consultate

Consultate il 2026-09-28. I portali e railway.app sono bloccati dall'ambiente: le informazioni sui portali vengono solo da risultati di ricerca.

- Varese, «città giardino», lago e Prealpi: https://en.wikipedia.org/wiki/Varese · https://www.comune.varese.it/vivere_il_comune/territorio/territorio_1.html
- Altamura, altopiano dell'Alta Murgia, entroterra barese: https://en.wikipedia.org/wiki/Altamura · https://www.sapere.it/enciclopedia/Altamura.html
- Caltanissetta, capoluogo nel cuore della Sicilia: https://www.visitsicily.info/luogo/caltanissetta/ · https://www.bellasicilia.it/caltanissetta-il-capoluogo-di-provincia-nel-cuore-della-sicilia/
- Città Digitali su cittàdigitali.it e franchising (solo sintesi di ricerca): https://xn--cittdigitali-19a.it/il-progetto/ · https://xn--cittdigitali-19a.it/caltanissetta/ · https://xn--cittdigitali-19a.it/franchising/

Il 2026-10-05 non ho consultato nuove fonti web. Il dominio viene dalla conferma dell'utente del 2026-10-05 (brief S7). La pagina «Tutte le città» viene dall'indice di ricerca letto da brand-strategist (`citta-digitali-elenco.md` §1).
