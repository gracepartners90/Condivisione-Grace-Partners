---
titolo: Mappa keyword→URL, meta, struttura delle pagine e blocchi di risposta (AEO/GEO)
owner: seo-content
contributi: [seo-technical, ux-designer, copywriter-brand, copywriter-content, brand-strategist]
stato: bozza
versione: 0.4
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/seo/ricerca-keyword.md, conferma dell'utente del 2026-10-05 sul dominio del portale Città Digitali (docs/strategia/citta-digitali-elenco.md §5), docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md, docs/contenuti/copy-deck/contatti.md (V1), docs/contenuti/copy-deck/citta-digitali.md (V4), docs/creativa/direzione-visiva.md (0.8, §7.6), docs/seo/specifiche-tecniche.md (§2.1), dist/ (build del commit 5c4a6cb, sola lettura)]
---

# Mappa keyword→URL, meta e struttura delle pagine

Documento operativo per lo sviluppo e il copy: title, meta description, H1, scaletta degli heading, link interni e blocchi di risposta, pagina per pagina. Le motivazioni sono in `docs/seo/ricerca-keyword.md`.

- «§» rimanda alle sezioni delle linee guida (LG).
- I codici come A1, N5, D4 e DR2 rimandano al brief consolidato (`docs/brief/brief-consolidato.md`): registro dei claim §5, domande e decisioni in fondo al brief. Fatti, claim e grafie seguono il brief.

## 1. Regole comuni

- **Title e meta description**
  - Title: massimo 60 caratteri, brand incluso: `ITnode | …` in home, `… | ITnode` altrove.
  - Meta description: 140–155 caratteri.
  - Lunghezze e unicità sono verificate con uno script (2026-09-28), e ricontrollate il 2026-10-05 con la nuova meta di `/citta-digitali` e con title e meta di `/contatti` allineati al sito. I testi usano l'apostrofo tipografico (’).
- **Heading**
  - Un solo H1 per pagina.
  - Il livello dipende dalla struttura, non dalla dimensione visiva. Statement, numeri grandi, marquee e CTA non sono heading, salvo quando lo statement è il titolo della sezione.
  - I marquee che ripetono testo sono `aria-hidden="true"`. I numeri decorativi (01, 02…) restano fuori dal testo dell'heading o sono `aria-hidden`.
- **Testo nell'HTML generato** (Astro statico). Deve essere visibile anche senza JavaScript e con `prefers-reduced-motion`: i text reveal animano testo già presente, non lo iniettano.
- **Breadcrumb visibile** sulle pagine interne (`src/components/layout/Breadcrumbs.astro`). Tracce ed etichette seguono le specifiche tecniche, owner seo-technical (`docs/seo/specifiche-tecniche.md` §4.3): per esempio «Home › SIII».
- **URL.** Qui i percorsi sono scritti senza barra finale per brevità (`/siii`). Gli URL canonici hanno la barra finale (specifiche tecniche §1.3).
- **Open Graph e X**: `og:title` è il title senza suffisso, `og:description` la meta description. Il resto sta nelle specifiche di seo-technical.
- **Link esterni** (portali ed esperienze): si aprono in una nuova scheda, con `rel="noopener"`. Sono link normali, senza `nofollow`: portali ed esperienze sono proprietà collegate a ITnode.
- **Anchor**
  - Descrittive, con il nome dell'entità.
  - Le CTA ripetute («Esplora →», «Entra nell’esperienza →») hanno un nome accessibile che inizia con il testo visibile e aggiunge destinazione e nuova scheda (WCAG 2.4.4 e 2.5.3).
  - Esempio: «Esplora<span class="sr-only"> Acquaviva delle Fonti su acquavivadigitale.com (si apre in una nuova scheda)</span>».
  - La freccia è `aria-hidden`.
- **Immagini**
  - Gli alt descrivono persone, luoghi o eventi reali, senza liste di keyword.
  - Le immagini generate o elaborate con AI non si usano come prova di eventi, né come `image` del markup Person (brief §0.3, DR3).

### Terminologia

Segue il glossario del brief (§4) e le proposte DR1–DR2, che l'utente deve ancora confermare.

| Uso | Forma adottata | Da evitare | Nota |
|---|---|---|---|
| Brand | **ITnode** nei testi. «ITNODE S.r.l.» solo nei contesti legali. Il logotipo «itNode» resta com'è. | ItNode, iTNode, ITNode nel testo corrente | DR1. Nei dati strutturati le varianti vanno in `alternateName`. |
| Prodotto | **SIII**: «Sito Interattivo Immersivo», al plurale «Siti Interattivi Immersivi»; «il SIII», «i SIII». Alla prima occorrenza in ogni pagina: «SIII – Sito Interattivo Immersivo». | «Siti Immersivi Interattivi» (LG §17) | DR2. La sigla ha tre «I», ma lo scioglimento ne spiega due (D3): non si spiegano le lettere una per una. |
| Tecnologia | «Tour Virtuale Interattivo Immersivo», con le maiuscole, quando indica la tecnologia di ITnode (LG §07) | — | Rapporto con il SIII: I3, D4 |
| Termini di ricerca | tour virtuale, tour virtuale interattivo, virtual tour, tour virtuale 3D, tour 360°: minuscolo, «360°» senza spazio | Usarli come nomi di prodotto | Sono le varianti viste in SERP. «3D» solo se la tecnologia lo è davvero (D4). |
| Progetti | **Puglia Digitale**, **Città Digitali**: accento, due maiuscole, plurale; negli URL `/citta-digitali` | «Città Digitale», «Puglia digitale» | Omonimie: brief §4. Per ora non si scrive che ITnode ha «creato» Puglia Digitale (A1, DR4). |
| Domini | lapugliadigitale.it, **cittàdigitali.it** (minuscolo, con l'accento; negli `href` `https://xn--cittdigitali-19a.it`) | cittadigitali.it senza accento: è «CITTA' DIGITALI», un progetto di altri | Dominio di Città Digitali confermato dall'utente il 2026-10-05 (brief: glossario, omonimie e S7). Nel testo visibile si scrive sempre con l'accento. Forma dell'indirizzo: specifiche tecniche §5.3. |
| Altri termini | destination marketing, digitalizzazione territoriale: minuscolo nel testo. hotspot: invariabile. «partite IVA». «abitare il Web» | — | DR2 |

## 2. Quadro sintetico

| URL | Intento | Title (car.) | Meta description (car.) | H1 |
|---|---|---|---|---|
| `/` | Brand e categoria | ITnode \| Esperienze immersive per imprese e territori (53) | ITnode rende esplorabili sul Web gli spazi di imprese e territori con i Siti Interattivi Immersivi (SIII) e i progetti Puglia Digitale e Città Digitali. (152) | «La tecnologia cambia. La curiosità ci accompagna da sempre.» |
| `/siii` | Commerciale e informativo | SIII, Siti Interattivi Immersivi oltre il tour 360° \| ITnode (60) | Il SIII replica gli spazi della tua azienda in un ambiente da esplorare da desktop e smartphone: hotspot, prodotti, video, richieste e prenotazioni. (148) | «SIII» + «Siti Interattivi Immersivi» |
| `/puglia-digitale` | Brand del progetto e destination marketing | Puglia Digitale: destination marketing immersivo \| ITnode (57) | Puglia Digitale è una piattaforma di destination marketing che digitalizza e valorizza città, borghi e imprese pugliesi con esperienze immersive. (145) | «Puglia Digitale» + «Una piattaforma interattiva immersiva per la valorizzazione territoriale.» |
| `/citta-digitali` | Brand del progetto e adesione delle attività | Città Digitali: le attività del territorio online \| ITnode (58) | Città Digitali è il portale con cui ITnode porta online le attività di città come Varese, Altamura e Caltanissetta con tour virtuali e strumenti digitali. (154) | «Città Digitali» + «Le attività del territorio, online senza perdere radici.» |
| `/contatti` | Navigazionale e locale | Contatti, Acquaviva delle Fonti (BA) \| ITnode (45) | Parliamo del tuo prossimo spazio digitale: SIII, Puglia Digitale o Città Digitali. ITnode, Via Sant’Anna, 34, Acquaviva delle Fonti (BA). Tel. 080 2466520. (155) | «Parliamo del prossimo spazio digitale.» |

Nella colonna H1, «+» indica un solo H1 su due righe: il nome grande, il descrittore più piccolo. Coincide con la gerarchia del brief (§2.4) e disambigua i nomi dagli omonimi in SERP. Title e meta di `/privacy-policy`, `/cookie-policy` e 404 sono nella sezione 3.6.

**Contatti, allineati al sito il 2026-10-05** (copy deck di Contatti, V1). Il sito aveva già la forma giusta:
- il title segue lo schema «‹Titolo pagina› | ITnode» delle specifiche (§2.1) e della regola del §1, così `og:title` perde correttamente il suffisso;
- l'indirizzo ha la virgola, «Via Sant’Anna, 34», come nel footer, in pagina, nei dati strutturati e nelle linee guida (§22): nome, indirizzo e telefono restano identici ovunque.

## 3. Schede pagina

### 3.1 `/` Home

- **Intento**: navigazionale di brand e comprensione della categoria: chi è ITnode, cosa fa, dove si trova.
- **Tema principale**: ITnode ed esperienze digitali immersive che collegano spazi fisici, imprese e territorio.
- **Query e concetti**: ITnode; esperienze immersive per aziende (solo sul Web); digitalizzazione territoriale (contesto).
- **Entità**:
  - ITnode (Organization);
  - il fondatore Giacomo Lenoci (Person, F7);
  - SIII, Puglia Digitale e Città Digitali;
  - Tour Virtuali Interattivi Immersivi e digitalizzazione territoriale;
  - Acquaviva delle Fonti (BA) e la Puglia;
  - nella timeline: IBM, MyComm, IcommLab, Leadstone.
- **H1**: quello di LG §07. Non contiene il tema, e va bene così: in home l'entità è definita dal title, dal primo paragrafo (Blocco A) e dai dati strutturati. Niente testo nascosto nell'H1.

```text
H1  La tecnologia cambia. La curiosità ci accompagna da sempre.              §07 hero
H2  ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.        §07 intro
    p          Blocco A «Cos’è ITnode»
    p (grande) Una nuova infrastruttura digitale per connettere imprese, cittadini e visitatori.
H2  I tre mondi ITnode                                                       §08
    p   Blocco F «Come si collegano SIII, Puglia Digitale e Città Digitali»
    H3  SIII · Siti Interattivi Immersivi   01 · «Spazi reali. Esperienze digitali.» · CTA «Esplora SIII»
    H3  Puglia Digitale                     02 · «Un territorio. Migliaia di storie.» · CTA «Scopri Puglia Digitale»
    H3  Città Digitali                      03 · «Le attività del territorio, online senza perdere radici.» · CTA «Esplora Città Digitali»
H2  36 anni dentro l’innovazione. E ancora la stessa curiosità.              §09
    p           Blocco G «Chi ha fondato ITnode»
    ol          timeline con <time>: tappe e ordine dal brief §6 (F1–F7)
    blockquote  «È questo il futuro che mi appassiona e che stiamo costruendo giorno dopo giorno.» (firma: Giacomo Lenoci, F7)
(facoltativo) sezione di chiusura con CTA «Parliamone» → /contatti          non prevista dalle LG
```

**Link interni in uscita**

| Anchor | Destinazione | Posizione |
|---|---|---|
| Siti Interattivi Immersivi · Città Digitali · Puglia Digitale | `/siii` · `/citta-digitali` · `/puglia-digitale` | nel testo del Blocco A |
| Esplora SIII · Scopri Puglia Digitale · Esplora Città Digitali | `/siii` · `/puglia-digitale` · `/citta-digitali` | capitoli 01–03 |
| Parliamone (o Contattaci: sceglie cro-specialist) | `/contatti` | header, in tutte le pagine, ed eventuale chiusura |

**In entrata**: il logo in tutte le pagine (nome accessibile «ITnode, home») e la prima voce del breadcrumb.

**Note**
- **E-E-A-T.** Servono nome, ruolo e percorso reali del fondatore e un ritratto reale. Le quattro immagini attuali sembrano generate o elaborate con AI: vale DR3. La foto dell'evento Puglia Digitale si usa con didascalia solo quando data e luogo sono confermati (A4).
- **«10.000+ clienti»** si usa solo come in N5: nel percorso del fondatore, mai attribuito a ITnode. Da verificare anche «36 anni» (N4) e «2002» (F3).
- **Nome del fondatore visibile** (didascalia o firma della citazione): serve anche al markup Person.

### 3.2 `/siii`

- **Intento**: commerciale e valutativo (un'azienda valuta come portare online i propri spazi), più informativo (cos'è un SIII, in cosa differisce da un tour 360°).
- **Tema principale**: il Sito Interattivo Immersivo (SIII) come evoluzione del tour virtuale per le aziende.
- **Query e concetti**:
  - entità: sito interattivo immersivo, SIII;
  - domanda: tour virtuale interattivo per aziende, virtual tour aziendale, tour virtuale 3D per aziende;
  - informativa: differenza tra tour 360° e sito immersivo.
  - È l'unica pagina che ha «tour virtuale» come tema principale.
- **Entità**:
  - SIII e Sito Interattivo Immersivo; tour 360° e tour virtuale;
  - le funzioni: hotspot, desktop e smartphone, prodotti, video, richiesta di informazioni, prenotazione, azioni commerciali;
  - ITnode;
  - i progetti Masseria Santella, Maison Miminà, D.L. Natura Dentro.
- **H1**: «SIII» + «Siti Interattivi Immersivi» (LG §10).
- **Title di riserva**: il title scelto è al limite dei 60 caratteri. Se in SERP risulta troncato, si usa «Siti Interattivi Immersivi: oltre il tour 360° | ITnode» (55).

```text
H1  SIII + Siti Interattivi Immersivi                                        §10 hero
    p (statement) Non raccontare la tua azienda. Falla esplorare.
H2  Cos’è un Sito Interattivo Immersivo                    [proposta]        §10
    p   Blocco B
H2  Tour 360° o Sito Interattivo Immersivo?                [proposta]        §10 comparazione
    p      Blocco C
    table  confronto (sotto)
H2  Cosa puoi fare dentro un SIII                          [proposta]        §10
    ul  esplorare gli ambienti · interagire con hotspot · vedere prodotti · guardare video ·
        richiedere informazioni · prenotare servizi · accedere ad azioni commerciali
H2  Perché scegliere un SIII                               [proposta]        §11, solo benefici qualitativi
    H3  Fiducia istantanea
    H3  Più coinvolgimento
    H3  Vendita diretta                                    (N13)
    H3  Uno strumento commerciale sempre accessibile
H2  Entra. Esplora. Interagisci.                                             §12 showcase
    H3  Masseria Santella    p proprio (2–3 righe) · «Entra nell’esperienza»
    H3  Maison Miminà        p proprio · «Entra nell’esperienza»
    H3  D.L. Natura Dentro   p proprio · «Entra nell’esperienza»
H2  La tua azienda può diventare un’esperienza.                              §12 CTA finale
    CTA «Richiedi un’offerta» → form in pagina (#richiedi-offerta)
```

La sezione «Cosa puoi fare dentro un SIII» può fondersi con la definizione, se la composizione lo richiede. In quel caso il Blocco B resta il paragrafo di apertura.

**Tabella di confronto**
- Va resa come HTML `<table>` con `<caption>`, non come immagine: è il formato che i motori generativi estraggono meglio.
- La colonna «Tour 360°» segue la definizione del glossario: categoria generica, interazione limitata. I criteri vanno confermati da ITnode (D4).
- Il confronto riguarda la categoria: non cita concorrenti e non li denigra (pubblicità comparativa, D.Lgs. 145/2007).

| | Tour 360° | Sito Interattivo Immersivo (SIII) |
|---|---|---|
| A cosa serve | Soprattutto a mostrare un ambiente | A far esplorare l’impresa e a trasformare la visita in una richiesta, una prenotazione o un’azione commerciale |
| Cosa fa chi visita | Si guarda intorno e passa da un punto di vista all’altro | Esplora gli ambienti, interagisce con hotspot, vede prodotti e video |
| Azioni previste | Di norma rimanda ad altri canali | Richiede informazioni, prenota servizi, accede ad azioni commerciali |
| Ruolo | Un contenuto da guardare | Uno strumento commerciale sempre accessibile |

**Link interni in uscita**

| Anchor | Destinazione | Posizione |
|---|---|---|
| Entra nell’esperienza (+ nome del progetto, nuova scheda) | cassanodigitale.it/masseriasantella/ · monopolidigitale.it/maisonmimina/ · acquavivadigitale.com/dielle/ | showcase |
| Richiedi un’offerta | `#richiedi-offerta` | CTA finale |
| Puglia Digitale · Città Digitali | `/puglia-digitale` · `/citta-digitali` | chiusura «Gli altri mondi ITnode» `[proposta per ux-designer]` |
| informativa privacy | `/privacy-policy` | form |

**In entrata**: home (Blocco A e capitolo 01), `/citta-digitali` (sottotitolo della hero), `/puglia-digitale` (sezione «Vendere attraverso l’esperienza»), navigazione e footer.

**Note**
- **Benefici solo qualitativi** (N6, N9): niente «5–10 volte più tempo», niente «migliore posizionamento Google». Per «Vendita diretta» va chiarito dove avvengono acquisto e prenotazione (N13).
- **Testo proprio per ogni esperienza.** Le esperienze si aprono in un'altra scheda e non trasferiscono testo alla pagina. `[DA FORNIRE: settore, località, cosa si può fare]`. Per Masseria Santella la località è Cassano delle Murge (fonte pubblica, brief §8). Servono anche nomi ufficiali e consenso delle imprese (A7), screenshot o cover.

### 3.3 `/puglia-digitale`

- **Intento**: il brand del progetto, da disambiguare, e la comprensione dell'offerta da parte di imprese ed enti; in secondo piano il destination marketing.
- **Tema principale**: Puglia Digitale, la piattaforma di destination marketing per città, borghi e imprese pugliesi.
- **Query e concetti**: Puglia Digitale insieme a ITnode o lapugliadigitale; destination marketing Puglia; tour virtuali di città e borghi pugliesi; valorizzazione territoriale.
- **Entità**:
  - Puglia Digitale e lapugliadigitale.it (D1, S7);
  - ITnode, con un ruolo da chiarire (D1);
  - destination marketing e valorizzazione territoriale;
  - città, borghi e imprese; la Puglia, dalla costa all'entroterra;
  - Acquaviva delle Fonti, Gravina in Puglia, Monopoli.
- **H1**: «Puglia Digitale» + «Una piattaforma interattiva immersiva per la valorizzazione territoriale.» (LG §13). Il descrittore dentro l'H1 distingue il progetto dall'agenda digitale della Regione e dal portale omonimo.

```text
H1  Puglia Digitale + Una piattaforma interattiva immersiva per la valorizzazione territoriale.   §13
    CTA «Visita il portale» → https://www.lapugliadigitale.it (nuova scheda)
H2  Dalla costa all’entroterra. Un territorio da esplorare.                  §13 concept
    p   Blocco D
H2  Puglia Digitale in numeri                              [proposta]        §14
    dl  30+ città · ~200.000 partite IVA nei territori coinvolti · 60% del tessuto produttivo pugliese
        + nota «Dati ITnode, aggiornati a [mese anno]» (N1–N3)
H2  I luoghi                                                                 §15
    H3  Acquaviva delle Fonti   p proprio · «Esplora» → acquavivadigitale.com
    H3  Gravina in Puglia       p proprio · «Esplora» → gravinadigitale.it
    H3  Monopoli                p proprio · «Esplora» → monopolidigitale.it
H2  Perché aderire a Puglia Digitale                                         §16
    H3  Aperti al mondo, 24/7
    H3  Vendere attraverso l’esperienza
    H3  La forza della rete
    H3  Continuare la relazione oltre il viaggio
H2  Porta la tua impresa dentro Puglia Digitale.                             §16 CTA finale
    CTA «Contattaci» → form in pagina (#aderisci)
```

**Link interni in uscita**

| Anchor | Destinazione | Posizione |
|---|---|---|
| Visita il portale (Puglia Digitale, nuova scheda) | lapugliadigitale.it | hero |
| Esplora (+ nome del luogo e dominio, nuova scheda) | acquavivadigitale.com · gravinadigitale.it · monopolidigitale.it | I luoghi |
| cos’è un Sito Interattivo Immersivo | `/siii` | «Vendere attraverso l’esperienza» `[IPOTESI I3, brief §2.3: i SIII vivono dentro i portali]` |
| Città Digitali | `/citta-digitali` | chiusura «Gli altri mondi ITnode» |
| Contattaci | `#aderisci` | CTA finale |

**Note**
- **Attribuzione (A1, DR4).** Non si scrive «ITnode ha creato Puglia Digitale». La formula provvisoria è «Con Puglia Digitale, ITnode porta online…».
- **Nessun legame istituzionale.** Niente patrocinio (A2), nessun riferimento né link a puglia-digitale.it o ai programmi regionali.
- **Numeri (N1–N3).** Sono dati del cliente e si pubblicano con la nota sulla fonte. «~200.000 partite IVA» è il bacino economico dei territori coinvolti, non il numero di imprese sulla piattaforma. Nel testo accessibile «~» si legge «circa».
- **Materiali mancanti** `[DA FORNIRE]`: foto della Puglia e dei tre luoghi, testo di 2–3 righe per ogni luogo, testi dei quattro motivi per aderire.

### 3.4 `/citta-digitali`

- **Intento**: il brand del progetto e l'adesione delle attività (B2B). Il portale per i visitatori è un sito esterno.
- **Tema principale**: Città Digitali, rete e portale nazionale che porta online le attività delle città italiane.
- **Query e concetti**: Città Digitali (brand), da sola e insieme a ITnode; portale delle città digitali; tour virtuali delle attività commerciali; visibilità digitale delle attività locali.
  - Non presidia il significato generico di «città digitale» (smart city).
  - Non contende al portale le query locali a cui rispondono le sue pagine città (ricerca keyword §2.1).
- **Entità**:
  - Città Digitali e cittàdigitali.it;
  - da distinguere da «CITTA' DIGITALI» (cittadigitali.it, di altri), «Le Città Digitali» (iniziativa precedente, D5), «Città Digitale» (cittadigitale.it) e dal significato generico di «città digitale»;
  - ITnode, con un ruolo da chiarire (A1, D5);
  - il tessuto imprenditoriale e commerciale italiano;
  - tour virtuali e Siti Interattivi Immersivi;
  - Varese, Altamura, Caltanissetta;
  - il video (VideoObject).
- **H1**: «Città Digitali» + «Le attività del territorio, online senza perdere radici.» (LG §17). Il descrittore distingue il progetto dagli omonimi «città digitale» (siti comunali, smart city). Il sottotitolo va in `<p>`.

```text
H1  Città Digitali + Le attività del territorio, online senza perdere radici.     §17
    p   Tour virtuali, Siti Immersivi Interattivi e strumenti digitali per il tessuto
        imprenditoriale e commerciale italiano.     (verbatim LG fino a DR2; poi «Siti Interattivi Immersivi» → /siii)
    CTA «Visita il portale ↗» → cittàdigitali.it, https://xn--cittdigitali-19a.it (nuova scheda)
    p   cittàdigitali.it      testo semplice sotto la CTA, non un link                O4; DV §7.6
    link «Aderisci a Città Digitali ↓» → #richiesta
H2  Città Digitali, in movimento.                                            §19
    video a tutta larghezza con poster + p descrittivo visibile + sottotitoli o trascrizione se c’è parlato
H2  L’Italia in un unico portale.                                            §18 (N12: sempre con le città)
    p   Blocco E
    carta con un punto per ogni città e legenda · link «Tutte le città sul portale ↗»
    H3  Varese          p proprio · «Esplora ↗» → varesedigitale.it
    H3  Altamura        p proprio · «Esplora ↗» → altamuradigitale.com
    H3  Caltanissetta   p proprio · «Esplora ↗» → caltanissettadigitale.it
H2  Dal locale al nazionale.                                                 §20
    p   introduzione con il link «Sito Interattivo Immersivo (SIII)» → /siii
    H3  Distanze ridotte, fiducia immediata
    H3  Maggiore coinvolgimento
    H3  Visibilità digitale
    H3  Differenziazione
    H3  La forza di un portale ad alto traffico      (N10: senza dati «La forza di un portale nazionale»)
H2  Gli altri mondi ITnode                                                   link → /puglia-digitale, /siii
H2  La tua azienda merita più di una presenza online. Merita di essere esplorata.   §21
    H3  Entra in Città Digitali      titolo del form, non una CTA · form con ancora #richiesta
```

Scaletta allineata al sito il 2026-10-05 (build del commit 5c4a6cb; copy deck di Città Digitali, V4). L'ordine segue la direzione visiva §7.6: dopo la hero viene il video, poi la sezione del portale.

**Link interni in uscita**

| Anchor | Destinazione | Posizione |
|---|---|---|
| Visita il portale (Città Digitali, nuova scheda) | cittàdigitali.it (`https://xn--cittdigitali-19a.it`; forma dell'indirizzo e verifiche nelle specifiche tecniche §5.3) | hero |
| Aderisci a Città Digitali | `#richiesta`, il form in pagina | hero, link secondario |
| Tutte le città sul portale (Città Digitali, nuova scheda) | `https://xn--cittdigitali-19a.it/tutte-le-citta/` | «L’Italia in un unico portale», sotto la carta |
| Esplora (+ nome della città e dominio, nuova scheda) | varesedigitale.it · altamuradigitale.com · caltanissettadigitale.it | «L’Italia in un unico portale» |
| Sito Interattivo Immersivo (SIII) | `/siii` | introduzione di «Dal locale al nazionale». Nel sottotitolo della hero solo dopo DR2 |
| Puglia Digitale · Siti Interattivi Immersivi (SIII) | `/puglia-digitale` · `/siii` | «Gli altri mondi ITnode» |

**Note**
- **Nessuna cifra non documentata.** Niente «5–10 volte», «4 volte», «250.000 visite mensili» (N6–N8). Anche «ad alto traffico» richiede dati (N10).
- **Attribuzione (A1, D5).** Non si scrive che ITnode ha «creato» Città Digitali. Il Blocco E usa la formula «con cui ITnode porta online».
- **Omonimie** (ricerca di marca del 2026-10-05, ricerca keyword §2.1). Il nome è conteso. Regole:
  - la definizione (Blocco E) lega sempre Città Digitali a ITnode e al dominio con l'accento;
  - la pagina non cita né linka cittadigitali.it, «CITTA' DIGITALI», lecittadigitali.it o Leadstone;
  - «Le Città Digitali» può comparire solo nella storia del fondatore, e solo se D5 conferma il legame.

  Dettagli in `docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md`, a cui rimandano anche le note seguenti («review del 2026-10-05»).
- **Meta description, aggiornata il 2026-10-05** (review dello stesso giorno, O3).
  - Ora nomina ITnode, con la formula del Blocco E, e non contiene più «Siti Interattivi Immersivi», che resta nel testo.
  - Prima era: «Città Digitali porta online le attività di città come Varese, Altamura e Caltanissetta con tour virtuali, Siti Interattivi Immersivi e strumenti digitali.»
  - Applicata il 2026-10-05 in `src/data/pages.ts` (commit 73b041c) e nella copia del copy deck di Città Digitali.
  - Title e H1 restano come sono.
- **Elenco delle città** (`docs/strategia/citta-digitali-elenco.md`). Quando il testo della pagina «Tutte le città» è confermato:
  - un solo elenco, in questa pagina;
  - i nomi ufficiali dei comuni, con la sigla della provincia;
  - il link alla pagina della città sul portale, o al portale della città, solo se l'indirizzo è verificato;
  - la data di aggiornamento.

  Nessuna pagina locale su itnode.it. Regole complete nella review del 2026-10-05, §5.
- **Franchising** (aggiornato il 2026-10-05). Sulla query «Città Digitali franchising» si posizionano già la pagina Franchising del portale e le schede delle directory. Se l'utente decide di rivolgersi ai potenziali affiliati (DR5), su itnode.it basta un link a quella pagina, senza riprendere i claim X1. Una pagina propria entrerebbe in concorrenza con il portale.
- **Video** (S8). Per il markup VideoObject servono titolo, descrizione, data di pubblicazione, durata e poster `[DA FORNIRE]`. Il file va servito dal dominio definitivo (decidono web-performance-specialist e seo-technical).
- **Materiali mancanti**: solo quelli del video (nota precedente).
  - Le foto dei territori non servono: la direzione visiva (§7.6) mette nella sezione del portale la carta con un punto per ogni città.
  - `src/data/asset-slots.ts` non ha slot per Varese, Altamura e Caltanissetta.
  - Allineato il 2026-10-05 (copy deck di Città Digitali, V4).

### 3.5 `/contatti`

- **Intento**: navigazionale (contattare ITnode) e locale (dove si trova).
- **Tema principale**: i contatti di ITnode ad Acquaviva delle Fonti (BA).
- **Entità**: ITnode; la sede (Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti, BA); telefono, mobile ed email; Giacomo Lenoci (LinkedIn); Città Digitali e Puglia Digitale.
- **H1**: «Parliamo del prossimo spazio digitale.» (LG §22)

```text
H1  Parliamo del prossimo spazio digitale.                                   §22
H2  Recapiti                                               [proposta]
    address  ITnode · Sede operativa (o «Sede legale e operativa», se S3 è confermata) ·
             Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA)
             Telefono +39 080 2466520 (tel:) · Mobile +39 335 1229785 (tel:) · Email info@itnode.it (mailto:)
             LinkedIn di Giacomo Lenoci (esterno, S6)
H2  Scrivici                                               [proposta]        §23 form, CTA «Invia richiesta»
H2  I portali                                              [proposta]        §22
    Città Digitali → cittàdigitali.it · Puglia Digitale → lapugliadigitale.it
```

**Link interni in uscita**: `/privacy-policy`, nell'etichetta del consenso del form. Portali e LinkedIn sono esterni.

**In entrata**: la CTA dell'header («Parliamone» o «Contattaci»), la navigazione, il footer.

**Note (local SEO)**
- **Nome, indirizzo e telefono** vanno come testo in `<address>`, identici nel footer, nei dati strutturati, su Google Business Profile e nelle directory. Stesso formato ovunque.
- **LinkedIn.** Il profilo indicato è personale (S6): nel testo va scritto «LinkedIn di Giacomo Lenoci». Nei dati strutturati va nel `sameAs` del Person, non dell'Organization.
- **Mappa.** Niente mappa incorporata di terze parti senza consenso (cookie e performance): basta un link «Apri in Google Maps».

### 3.6 Pagine di servizio

| URL | Title (car.) | Meta description (car.) | Note |
|---|---|---|---|
| `/privacy-policy` | Privacy Policy \| ITnode (23) | Come ITnode tratta i dati personali raccolti con il sito e il modulo di contatto: titolare, finalità, basi giuridiche, tempi di conservazione e diritti. (152) | H1 «Privacy Policy». L'indicizzazione la decide seo-technical. Il vecchio `/informativa-privacy/` è già nella mappa dei redirect. |
| `/cookie-policy` | Cookie Policy \| ITnode (22) | Quali cookie e tecnologie simili usa il sito di ITnode, per quali finalità, per quanto tempo e come dare, negare o revocare il consenso in ogni momento. (152) | H1 «Cookie Policy». La meta va riallineata al testo definitivo della policy. |
| 404 | Pagina non trovata \| ITnode (27) | La pagina che cerchi non esiste più o è stata spostata. Riparti dalla home page di ITnode oppure esplora SIII, Puglia Digitale e Città Digitali. (144) | `noindex`, fuori dalla sitemap, stato HTTP 404. Link a `/`, `/siii`, `/puglia-digitale`, `/citta-digitali`. L'H1 lo scrive copywriter-brand. |

## 4. Blocchi di risposta (AEO/GEO)

Sono definizioni brevi e autosufficienti, scritte solo con i fatti delle LG e con le formule provvisorie del brief. Servono a essere citati da AI Overviews, ChatGPT e Perplexity e a descrivere ITnode sempre nello stesso modo.

**Regole**
- **Visibili e nel flusso editoriale.** Sono il primo paragrafo sotto l'heading indicato, nell'HTML statico. Niente accordion, tab, tooltip o testo nascosto.
- **Autosufficienti.** Nominano l'entità per esteso, senza «noi» o «questo progetto», e si capiscono anche estratti dalla pagina.
- **Sempre le stesse parole.** Se un blocco si riusa altrove (profili esterni, portali, Google Business Profile), si riprende identico o accorciato, senza riformularlo. Proposta per lo sviluppo: tenerli in un unico file di contenuti in `src/data/`.
- **Niente sezione FAQ, niente markup FAQPage.** Le risposte stanno nelle sezioni editoriali. I dati strutturati (Organization, WebPage, Person, VideoObject) li scrive seo-technical, coerenti con questi testi.
- **Nessun fatto nuovo.** I copywriter possono rifinire lo stile, ma non aggiungere fatti. Se un segnaposto è ancora aperto, il blocco si accorcia e non si pubblica il segnaposto.

**A. Cos’è ITnode**
- **Dove**: home, sezione introduttiva. È il primo paragrafo sotto l'H2 «ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.»
- **Testo**: «ITnode è una società con sede ad Acquaviva delle Fonti, in provincia di Bari, che progetta esperienze digitali immersive e rende gli spazi fisici esplorabili sul Web. Realizza Siti Interattivi Immersivi (SIII) e, con Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale, porta online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi. Il suo obiettivo è una nuova infrastruttura digitale che connetta imprese, cittadini e visitatori.»
- **Fonti**: LG §07, §08, §22, §35; glossario (ITnode); formula provvisoria di A1 e DR4. Se D1 conferma la paternità dei progetti, la seconda frase può tornare alla forma di LG §07 («ha creato»). La prima frase è anche il testo di presentazione per Google Business Profile, LinkedIn aziendale e le pagine «chi siamo» dei portali.

**B. Cos’è un Sito Interattivo Immersivo (SIII)**
- **Dove**: `/siii`, sezione «Cos’è un Sito Interattivo Immersivo», primo paragrafo.
- **Testo**: «Un Sito Interattivo Immersivo (SIII) replica digitalmente gli spazi fisici di un’impresa e li trasforma in un ambiente navigabile da desktop e da smartphone. Chi lo visita può esplorare gli ambienti, interagire con gli hotspot, vedere i prodotti, guardare video, richiedere informazioni, prenotare servizi e accedere ad azioni commerciali. È la soluzione di ITnode per le aziende che, invece di raccontarsi, vogliono farsi esplorare.»
- **Fonti**: LG §08, §10; glossario (SIII).

**C. Tour 360° e Sito Interattivo Immersivo: la differenza**
- **Dove**: `/siii`, sezione comparativa, paragrafo prima della tabella.
- **Testo**: «Un tour 360° è pensato soprattutto per mostrare un ambiente: chi lo visita si guarda intorno e passa da un punto di vista all’altro. Un Sito Interattivo Immersivo (SIII) parte dall’esplorazione degli spazi, ma è un sito a tutti gli effetti: dentro l’ambiente si interagisce con hotspot, prodotti e video, si chiedono informazioni, si prenotano servizi e si accede ad azioni commerciali. In breve, il tour 360° fa vedere uno spazio; il SIII lo trasforma in uno strumento commerciale sempre accessibile.»
- **Fonti**: LG §10, §11; glossario (tour 360°). La prima frase descrive la categoria in generale e non viene dalle LG: la conferma ITnode con D4.

**D. Cos’è Puglia Digitale**
- **Dove**: `/puglia-digitale`, sezione «Dalla costa all’entroterra. Un territorio da esplorare.», primo paragrafo.
- **Testo**: «Puglia Digitale è una piattaforma interattiva immersiva per la valorizzazione territoriale, online su lapugliadigitale.it. È un progetto di destination marketing che digitalizza e valorizza città, borghi e imprese della Puglia attraverso esperienze immersive, dalla costa all’entroterra: tra i luoghi da esplorare ci sono Acquaviva delle Fonti, Gravina in Puglia e Monopoli. Con Puglia Digitale, ITnode porta online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.»
- **Fonti**: LG §07, §13, §15, §22; formula provvisoria di A1 e DR4. Il ruolo di ITnode e il dominio vanno confermati (D1, S7).

**E. Cos’è Città Digitali**
- **Dove**: `/citta-digitali`, sezione «L’Italia in un unico portale.», primo paragrafo.
- **Testo**: «Città Digitali è la rete e il portale nazionale con cui ITnode porta online le attività del territorio, senza che perdano le proprie radici. Offre al tessuto imprenditoriale e commerciale italiano tour virtuali, Siti Interattivi Immersivi e strumenti digitali, e riunisce in un unico portale, cittàdigitali.it, città come Varese, Altamura e Caltanissetta.»
- **Fonti**: LG §07, §17, §18, §22; glossario (Città Digitali); N12.
  - Il dominio è confermato dall'utente (2026-10-05). Il ruolo di ITnode (A1, D5) va ancora confermato.
  - È anche la definizione da riprendere identica sul portale e sui profili del progetto (review del 2026-10-05, O2).

**F. SIII, Puglia Digitale e Città Digitali: come si collegano**
- **Dove**: home, sezione «I tre mondi ITnode», paragrafo prima dei tre capitoli.
- **Testo**: «SIII, Puglia Digitale e Città Digitali sono tre applicazioni concrete della stessa visione di ITnode: rendere gli spazi esplorabili digitalmente e usare questa tecnologia per valorizzare imprese e territori. Il SIII porta online gli spazi di una singola impresa, Puglia Digitale valorizza città, borghi e imprese della Puglia, Città Digitali riunisce in un unico portale le attività di città italiane come Varese, Altamura e Caltanissetta.»
- **Fonti**: LG §10, §13, §17, §18, §35; modello del brief §2.3 (impresa, territorio, rete di città).

**G. Chi ha fondato ITnode**
- **Dove**: home, sezione del fondatore. È il primo paragrafo sotto l'H2, prima della timeline; la sezione si chiude con la citazione (LG §09).
- **Testo**: «ITnode è stata fondata da Giacomo Lenoci, che lavora nell’innovazione da 36 anni. Il suo percorso parte da IBM negli anni ’90 e passa per MyComm, IcommLab e Leadstone, fino a ITnode, Puglia Digitale e Città Digitali.»
- **Fonti**: LG §09, §22.
- **Da verificare prima di pubblicare**:
  - il nome e il ruolo del fondatore (F7);
  - il ruolo in IBM (F1) e l'ipotesi che il percorso parta da lì (I5);
  - la grafia di «IcommLab» (F5);
  - l'anno da cui si contano i 36 anni (N4).
- «2002» e la «prima azienda» entrano nel blocco quando il cliente chiarisce a quale tappa si riferiscono (F2, F3). «10.000+ clienti» resta fuori (N5).

## Ipotesi da validare

- **H1 composto** (nome e descrittore) su `/siii`, `/puglia-digitale` e `/citta-digitali`. È coerente con il brief §2.4 e disambigua i nomi dagli omonimi in SERP.
- **I SIII vivono dentro i portali** (brief I3 e §2.3). Serve a giustificare il link da `/puglia-digitale` a `/siii`.
- **Nessuna sezione FAQ al lancio.** I blocchi A–G coprono le domande principali.
- **Le formule provvisorie** dei blocchi A, D ed E valgono fino alle risposte a D1 e D5.

## Domande aperte

**Per il cliente, nuove rispetto al brief**
1. Esiste una scheda Google Business Profile? Con quale nome, categoria e indirizzo?
2. Quali profili ufficiali vanno collegati all'entità ITnode: Instagram @itnodedigital, una pagina LinkedIn aziendale (P3)? E all'entità Città Digitali: i profili Facebook @cittadigitali e Instagram @citta_digitali sono ufficiali? (review del 2026-10-05, O6)

**Già aperte nel brief, da cui dipende questo documento**
- D1: il ruolo di ITnode in Puglia Digitale (blocchi A e D);
- D3: lo scioglimento della sigla SIII;
- D4: tecnologia e criteri del confronto con il tour 360° (Blocco C e tabella; uso di «3D»);
- D5: Città Digitali e franchising;
- D6: il fondatore (Blocco G);
- D7: i numeri;
- A7: lo showcase;
- S8: il video.

**Per altri membri**
- **seo-technical**:
  - `sameAs` del LinkedIn del fondatore sul Person;
  - varianti del nome in `alternateName` (DR1);
  - `image` del Person solo con una foto reale (DR3);
  - `name` e `description` di WebPage e VideoObject presi da questo documento, che sostituisce i title provvisori delle specifiche (§2.2);
  - Brand Città Digitali: `url` nella forma finale del portale, `sameAs` solo con i profili confermati, nessun `alternateName`, `description` dal Blocco E (review del 2026-10-05, O6).
- **ux-designer**: nomi accessibili delle CTA ripetute; blocco «Gli altri mondi ITnode» sulle pagine di progetto; composizione dell'H1 su due livelli.
- **cro-specialist**: chiuse nel sito (verificato il 2026-10-05). Il form di Città Digitali è in pagina, con ancora `#richiesta`, e «Entra in Città Digitali» ne è il titolo; la CTA dell'header è «Parliamone».

## Decisioni richieste

1. **Composizione degli H1 su due livelli**: ux-designer e copywriter-brand; creative-director in caso di conflitto con il layout.
2. **Grafie e convenzioni** (DR1, DR2): decide l'utente. Questo documento le applica già come proposta.
3. **Blocchi A–G in un file di contenuti condiviso** in fase di sviluppo, accanto a `src/data/pages.ts` previsto dalle specifiche tecniche: sessione principale.
4. **Nuova meta description di `/citta-digitali`** (§2): applicata il 2026-10-05 in `src/data/pages.ts` (commit 73b041c) e riportata nel copy deck (review del 2026-10-05, O3).
