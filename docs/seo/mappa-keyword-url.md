---
titolo: Mappa keyword→URL, meta, struttura delle pagine e blocchi di risposta (AEO/GEO)
owner: seo-content
contributi: [seo-technical, ux-designer, copywriter-brand, copywriter-content, brand-strategist]
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/seo/ricerca-keyword.md]
---

# Mappa keyword→URL, meta e struttura delle pagine

Documento operativo per lo sviluppo e il copy: title, meta description, H1, scaletta degli heading, link interni e blocchi di risposta, pagina per pagina. Le motivazioni sono in `docs/seo/ricerca-keyword.md`. I riferimenti «§» rimandano alle sezioni delle linee guida.

## 1. Regole comuni

- **Title**: massimo 60 caratteri, brand incluso: `ITnode | …` in home, `… | ITnode` altrove. **Meta description**: 140–155 caratteri. Lunghezze e unicità sono state verificate con uno script il 2026-09-28. I testi usano l'apostrofo tipografico (’).
- **Heading**: un solo H1 per pagina. Il livello dipende dalla struttura, non dalla dimensione visiva. Statement, numeri grandi, marquee e CTA non sono heading, salvo quando lo statement è il titolo della sezione. I marquee che ripetono testo vanno marcati `aria-hidden="true"`. I numeri decorativi (01, 02…) restano fuori dal testo dell'heading o sono `aria-hidden`.
- **Testo nell'HTML generato** (Astro statico), visibile anche senza JavaScript e con `prefers-reduced-motion`: i text reveal animano testo già presente, non lo iniettano.
- **Open Graph e X**: `og:title` = title senza suffisso; `og:description` = meta description. Il resto è nelle specifiche di seo-technical.
- **Link esterni** (portali ed esperienze): nuova scheda, `rel="noopener"`, link normali senza `nofollow`, perché sono proprietà collegate a ITnode.
- **Anchor**: descrittive, con il nome dell'entità. Le CTA ripetute («Esplora →», «Entra nell’esperienza →») hanno un nome accessibile che inizia con il testo visibile e indica la destinazione e la nuova scheda. Per esempio: «Esplora<span class="sr-only"> Acquaviva delle Fonti su acquavivadigitale.com (si apre in una nuova scheda)</span>» (WCAG 2.4.4 e 2.5.3). La freccia è `aria-hidden`.
- **Alt text**: descrivono persona, luogo o evento reali (per esempio nome del fondatore e contesto della foto), senza elenchi di keyword.

### Terminologia (provvisoria)

Il glossario di brand-strategist (`docs/brief/brief-consolidato.md`) non esiste ancora: queste scelte seguono le linee guida e vanno confermate o corrette lì.

| Uso | Forma adottata | Da evitare | Nota |
|---|---|---|---|
| Brand | **ITnode**; ragione sociale «ITNODE S.r.l.» solo nei dati legali `[DA VERIFICARE]` | ItNode, iTNode, ITNODE nel testo corrente | Grafie incoerenti sul Web: l'entità va unificata. |
| Prodotto | **SIII**; «Sito Interattivo Immersivo» (singolare), «Siti Interattivi Immersivi» (plurale), con le iniziali maiuscole; «il SIII» | «Siti Immersivi Interattivi» (§17): uniformare | L'acronimo ha quattro lettere per tre parole `[DA VERIFICARE: scioglimento]`. Fino ad allora si usa «SIII — Siti Interattivi Immersivi», senza spiegare le lettere una per una. |
| Categoria | tour virtuale, tour virtuali; «tour virtuali interattivi e immersivi» (minuscolo) | Maiuscole su termini generici («Tour Virtuali Interattivi Immersivi», §7) | Il minuscolo è una proposta per la leggibilità; per la SEO è indifferente. |
| Confronto | **tour 360°**; nel testo anche «tour virtuale a 360 gradi» e, una volta, «virtual tour» | «360» senza simbolo nei titoli | Sono le varianti viste in SERP. |
| 3D | «tour virtuale 3D» solo come termine usato da chi cerca | Attribuire al SIII scansioni o modelli 3D senza conferma | `[DA VERIFICARE: tecnologia]` |
| Progetti | **Puglia Digitale**, **Città Digitali** (con l'accento; negli URL `/citta-digitali`) | «Puglia digitale», «Città Digitale» | Alla prima menzione in pagina: il nome del progetto con «di ITnode» o con il dominio del portale. |
| Domini | lapugliadigitale.it, cittadigitali.it (minuscolo) | — | Dominio canonico di Città Digitali `[DA VERIFICARE]` |
| Altri termini | destination marketing (minuscolo, in inglese), partite IVA | — | |

## 2. Quadro sintetico

| URL | Intento | Title (car.) | Meta description (car.) | H1 |
|---|---|---|---|---|
| `/` | Brand e categoria | ITnode \| Esperienze immersive per imprese e territori (53) | ITnode rende esplorabili sul Web gli spazi di imprese e territori con i Siti Interattivi Immersivi (SIII) e i progetti Puglia Digitale e Città Digitali. (152) | La tecnologia cambia. La curiosità ci accompagna da sempre. |
| `/siii` | Commerciale-informativo | SIII, Siti Interattivi Immersivi oltre il tour 360° \| ITnode (60) | Il SIII replica gli spazi della tua azienda in un ambiente da esplorare da desktop e smartphone: hotspot, prodotti, video, richieste e prenotazioni. (148) | SIII — Siti Interattivi Immersivi |
| `/puglia-digitale` | Brand del progetto + destination marketing | Puglia Digitale: destination marketing immersivo \| ITnode (57) | Puglia Digitale è il progetto di destination marketing di ITnode che digitalizza e valorizza città, borghi e imprese pugliesi con esperienze immersive. (151) | Puglia Digitale — Una piattaforma interattiva immersiva per la valorizzazione territoriale |
| `/citta-digitali` | Brand del progetto + adesione delle attività | Città Digitali: le attività del territorio online \| ITnode (58) | Città Digitali porta online le attività del territorio con tour virtuali, Siti Interattivi Immersivi e strumenti digitali. L’Italia in un unico portale. (152) | Città Digitali — Le attività del territorio, online senza perdere radici. |
| `/contatti` | Navigazionale e locale | Contatti \| ITnode, Acquaviva delle Fonti (BA) (45) | Parliamo del tuo prossimo spazio digitale: SIII, Puglia Digitale o Città Digitali. ITnode, Via Sant’Anna 34, Acquaviva delle Fonti (BA). Tel. 080 2466520. (154) | Parliamo del prossimo spazio digitale. |

Title e meta di `/privacy-policy`, `/cookie-policy` e 404 sono nella sezione 3.6.

## 3. Schede pagina

### 3.1 `/` Home

- **Intento**: navigazionale di brand e comprensione della categoria: chi è ITnode, cosa fa, dove si trova.
- **Tema principale**: ITnode ed esperienze digitali immersive che collegano spazi fisici, imprese e territorio.
- **Query e concetti**: ITnode; esperienze immersive per aziende (qualificate: sul Web); digitalizzazione territoriale (contesto).
- **Entità**: ITnode (Organization), fondatore Giacomo Lenoci (Person) `[DA VERIFICARE]`, SIII, Puglia Digitale, Città Digitali, tour virtuali interattivi e immersivi, digitalizzazione territoriale, Acquaviva delle Fonti (BA), Puglia. Nella timeline: IBM, MyComm, IcommLab, Leadstone.
- **H1**: quello delle linee guida (§7). Non contiene il tema, e va bene: in home l'entità è definita dal title, dal primo paragrafo (Blocco A) e dai dati strutturati. Niente testo nascosto nell'H1.

```text
H1  La tecnologia cambia. La curiosità ci accompagna da sempre.              §7 hero
H2  ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.        §7 intro
    p          Blocco A «Cos’è ITnode»
    p (grande) Una nuova infrastruttura digitale per connettere imprese, cittadini e visitatori.
H2  I tre mondi ITnode                                                       §8
    p   Blocco F «Come si collegano SIII, Puglia Digitale e Città Digitali»
    H3  SIII · Siti Interattivi Immersivi   01 · «Spazi reali. Esperienze digitali.» · CTA «Esplora SIII»
    H3  Puglia Digitale                     02 · «Un territorio. Migliaia di storie.» · CTA «Scopri Puglia Digitale»
    H3  Città Digitali                      03 · «Le attività del territorio, online senza perdere radici.» · CTA «Esplora Città Digitali»
H2  36 anni dentro l’innovazione. E ancora la stessa curiosità.              §9
    p           Blocco G «Chi ha fondato ITnode»
    ol          timeline con <time>: IBM · anni ’90 → prima azienda · 2002 → MyComm → IcommLab → Leadstone → oggi: ITnode, Puglia Digitale, Città Digitali
    blockquote  «È questo il futuro che mi appassiona e che stiamo costruendo giorno dopo giorno.» — Giacomo Lenoci
(facoltativo) sezione di chiusura con CTA «Parliamone» → /contatti          non prevista dalle linee guida
```

**Link interni in uscita**

| Anchor | Destinazione | Posizione |
|---|---|---|
| Puglia Digitale · Città Digitali · Siti Interattivi Immersivi | `/puglia-digitale` · `/citta-digitali` · `/siii` | nel testo del Blocco A |
| Esplora SIII · Scopri Puglia Digitale · Esplora Città Digitali | `/siii` · `/puglia-digitale` · `/citta-digitali` | capitoli 01–03 |
| Parliamone | `/contatti` | header (tutte le pagine) ed eventuale chiusura |

**In entrata**: logo in tutte le pagine (nome accessibile «ITnode, home»), primo elemento del breadcrumb.

**Note**
- E-E-A-T: nome, foto reali e percorso del fondatore; foto reale dell'evento Puglia Digitale `[DA FORNIRE: nome, luogo e data dell'evento per alt e didascalia]`; progetti reali collegati.
- Timeline: «10.000+ clienti» solo con una fonte documentata e specificando a quale azienda si riferisce `[DA VERIFICARE]`; altrimenti si toglie il numero. Da verificare anche l'abbinamento «prima azienda – 2002» e il riferimento dei «36 anni».
- Il nome del fondatore deve essere visibile (didascalia o firma della citazione): serve anche al markup Person.

### 3.2 `/siii`

- **Intento**: commerciale-valutativo (un'azienda valuta come portare online i propri spazi) più informativo (cos'è, in cosa differisce da un tour 360°).
- **Tema principale**: il Sito Interattivo Immersivo (SIII) come evoluzione del tour virtuale per le aziende.
- **Query e concetti**: sito interattivo immersivo, SIII (entità); tour virtuale interattivo per aziende, virtual tour aziendale, tour virtuale 3D per aziende (domanda); differenza tra tour 360° e sito immersivo (informativa). È l'unica pagina con «tour virtuale» come tema principale.
- **Entità**: SIII, Sito Interattivo Immersivo, tour 360°, tour virtuale, hotspot, desktop e smartphone, prodotti, video, richiesta di informazioni, prenotazione, azioni commerciali, ITnode; progetti Masseria Santella, Maison Miminà, D.L. Natura Dentro.
- **H1**: `SIII — Siti Interattivi Immersivi` (§10: le due righe della hero, un solo elemento H1).

```text
H1  SIII — Siti Interattivi Immersivi                                        §10 hero
    p (statement) Non raccontare la tua azienda. Falla esplorare.
H2  Cos’è un Sito Interattivo Immersivo                    [proposta]        §10
    p   Blocco B
H2  Tour 360° o Sito Interattivo Immersivo?                [proposta]        §10 comparazione
    p      Blocco C
    table  confronto (sotto)
H2  Cosa puoi fare dentro un SIII                          [proposta]        §10
    ul  esplorare gli ambienti · interagire con hotspot · vedere prodotti · guardare video ·
        richiedere informazioni · prenotare servizi · accedere ad azioni commerciali
H2  Perché scegliere un SIII                               [proposta]        §11 (solo benefici qualitativi)
    H3  Fiducia istantanea
    H3  Più coinvolgimento
    H3  Vendita diretta
    H3  Uno strumento commerciale sempre accessibile
H2  Entra. Esplora. Interagisci.                                             §12 showcase
    H3  Masseria Santella    p proprio (2–3 righe) · «Entra nell’esperienza»
    H3  Maison Miminà        p proprio · «Entra nell’esperienza»
    H3  D.L. Natura Dentro   p proprio · «Entra nell’esperienza»
H2  La tua azienda può diventare un’esperienza.                              §12 CTA finale
    CTA «Richiedi un’offerta» → form in pagina (#richiedi-offerta)
```

La sezione «Cosa puoi fare dentro un SIII» può fondersi con la definizione se la composizione lo richiede: in quel caso il Blocco B resta il paragrafo di apertura.

**Tabella di confronto** (HTML `<table>` con `<caption>`, non un'immagine: è il formato che i motori generativi estraggono meglio). La colonna «Tour 360°» è una descrizione generale della categoria `[DA VERIFICARE con ITnode]`: non cita concorrenti e non li denigra (pubblicità comparativa, D.Lgs. 145/2007).

| | Tour 360° | Sito Interattivo Immersivo (SIII) |
|---|---|---|
| A cosa serve | Soprattutto a mostrare un ambiente | A far esplorare l’impresa e a trasformare la visita in un contatto o in una vendita |
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
- Benefici solo qualitativi: niente «5–10 volte più tempo» né «migliore posizionamento Google» (§11).
- Le esperienze si aprono in un'altra scheda e non trasferiscono testo alla pagina. Ogni progetto ha quindi un paragrafo proprio `[DA FORNIRE: settore, località e cosa si può fare in ciascuna esperienza]`. La località di Masseria Santella è dedotta dal dominio cassanodigitale.it `[DA VERIFICARE]`.
- Mancano screenshot e cover delle esperienze `[DA FORNIRE]`.

### 3.3 `/puglia-digitale`

- **Intento**: brand del progetto (va disambiguato) e comprensione dell'offerta da parte di imprese ed enti; secondariamente destination marketing.
- **Tema principale**: Puglia Digitale, la piattaforma di destination marketing di ITnode per città, borghi e imprese pugliesi.
- **Query e concetti**: Puglia Digitale (con ITnode o lapugliadigitale), destination marketing Puglia, tour virtuali di città e borghi pugliesi, valorizzazione territoriale.
- **Entità**: Puglia Digitale, lapugliadigitale.it, ITnode, destination marketing, valorizzazione territoriale, città, borghi, imprese, Puglia (dalla costa all'entroterra), Acquaviva delle Fonti, Gravina in Puglia, Monopoli.
- **H1**: `Puglia Digitale — Una piattaforma interattiva immersiva per la valorizzazione territoriale`. Nome e sottotitolo (§13) stanno nello stesso H1: il nome grande, il sottotitolo più piccolo. Motivo: «Puglia Digitale» da solo coincide con l'agenda digitale della Regione e con un portale omonimo. Alternativa accettabile: H1 = «Puglia Digitale» e sottotitolo in `<p>`; in quel caso la disambiguazione resta affidata a title, meta e Blocco D.

```text
H1  Puglia Digitale — Una piattaforma interattiva immersiva per la valorizzazione territoriale   §13
    CTA «Visita il portale» → https://www.lapugliadigitale.it (nuova scheda)
H2  Dalla costa all’entroterra. Un territorio da esplorare.                  §13 concept
    p   Blocco D
H2  Puglia Digitale in numeri                              [proposta]        §14
    dl  30+ città · circa 200.000 partite IVA nei territori coinvolti · 60% del tessuto produttivo pugliese
        + nota con fonte e data dei dati
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
| cos’è un Sito Interattivo Immersivo | `/siii` | «Vendere attraverso l’esperienza» `[IPOTESI: le imprese di Puglia Digitale possono avere un SIII; le esperienze dello showcase sono su portali di questi luoghi]` |
| Città Digitali | `/citta-digitali` | chiusura «Gli altri mondi ITnode» |
| Contattaci | `#aderisci` | CTA finale |

**Note**
- I tre numeri sono dati forniti dal cliente (§14): vanno pubblicati con fonte e data `[DA VERIFICARE]` e formulati in modo che non sembrino imprese aderenti. «Circa 200.000 partite IVA» riguarda i *territori coinvolti*, non i clienti di ITnode. Nel testo accessibile «~» si legge «circa».
- Mancano le foto della Puglia e dei tre luoghi `[DA FORNIRE]`. Serve anche un testo di 2–3 righe per ciascun luogo `[DA FORNIRE]`.
- Non suggerire legami istituzionali con Regione o Consiglio regionale: non sono nelle linee guida.

### 3.4 `/citta-digitali`

- **Intento**: brand del progetto e adesione delle attività (B2B); il portale per i visitatori è esterno.
- **Tema principale**: Città Digitali, il portale che porta online le attività del territorio in Italia.
- **Query e concetti**: Città Digitali (brand), portale delle città digitali, tour virtuali delle attività commerciali, visibilità digitale delle attività locali.
- **Entità**: Città Digitali, cittadigitali.it, ITnode, tessuto imprenditoriale e commerciale italiano, tour virtuali, Siti Interattivi Immersivi, Varese, Altamura, Caltanissetta, video (VideoObject).
- **H1**: `Città Digitali — Le attività del territorio, online senza perdere radici.` Nome e statement (§17) stanno nello stesso H1, con la stessa logica di Puglia Digitale (omonimi: «città digitale», siti comunali, smart city). Il sottotitolo va in `<p>`.

```text
H1  Città Digitali — Le attività del territorio, online senza perdere radici.     §17
    p   Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per il tessuto
        imprenditoriale e commerciale italiano.     («Siti Interattivi Immersivi» → /siii)
    CTA «Visita il portale» → https://www.cittadigitali.it (nuova scheda)
H2  L’Italia in un unico portale.                                            §18
    p   Blocco E
    H3  Varese          p proprio · link → varesedigitale.it
    H3  Altamura        p proprio · link → altamuradigitale.com
    H3  Caltanissetta   p proprio · link → caltanissettadigitale.it
H2  [titolo del video: DA FORNIRE; proposta «Città Digitali in video»]      §19
    video full width con poster + p descrittivo visibile (1–2 frasi) + sottotitoli o trascrizione se c’è parlato
H2  Dal locale al nazionale.                                                 §20
    H3  Distanze ridotte, fiducia immediata
    H3  Maggiore coinvolgimento
    H3  Visibilità digitale
    H3  Differenziazione
    H3  La forza di un portale ad alto traffico      [DA VERIFICARE]
H2  La tua azienda merita più di una presenza online. Merita di essere esplorata.   §21
    CTA «Entra in Città Digitali» → form in pagina (#entra)
```

**Link interni in uscita**

| Anchor | Destinazione | Posizione |
|---|---|---|
| Siti Interattivi Immersivi | `/siii` | sottotitolo della hero |
| Visita il portale (Città Digitali, nuova scheda) | cittadigitali.it `[DA VERIFICARE: dominio]` | hero |
| Varese · Altamura · Caltanissetta (+ dominio, nuova scheda) | portali delle città | «L’Italia in un unico portale» |
| Puglia Digitale | `/puglia-digitale` | chiusura «Gli altri mondi ITnode» |
| Entra in Città Digitali | `#entra` (form) o portale: decide cro-specialist | CTA finale |

**Note**
- Nessuna cifra su tempi di visita, coinvolgimento o traffico («5–10 volte», «4 volte», «250.000 visite mensili», §20) senza un dato documentato. Anche «ad alto traffico» è un'affermazione da provare: se mancano i dati, la proposta è «La forza di un portale nazionale».
- Video: servono titolo, descrizione, data di pubblicazione, durata e poster per il markup VideoObject `[DA FORNIRE]`. Oggi il file è su un dominio railway.app, non raggiungibile da qui: meglio servirlo dal dominio definitivo (decidono web-performance-specialist e seo-technical).
- Mancano le immagini dei territori `[DA FORNIRE]`.

### 3.5 `/contatti`

- **Intento**: navigazionale (contattare ITnode) e locale (dove si trova).
- **Tema principale**: contatti di ITnode, Acquaviva delle Fonti (BA).
- **Entità**: ITnode, sede operativa (Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti, BA), telefono, cellulare, email, Giacomo Lenoci (LinkedIn), Città Digitali, Puglia Digitale.
- **H1**: `Parliamo del prossimo spazio digitale.` (§22)

```text
H1  Parliamo del prossimo spazio digitale.                                   §22
H2  Recapiti                                               [proposta]
    address  ITnode · Sede operativa · Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA)
             Telefono +39 080 2466520 (tel:) · Cellulare +39 335 1229785 (tel:) · info@itnode.it (mailto:)
             LinkedIn di Giacomo Lenoci (esterno)
H2  Scrivici                                               [proposta]        §23 form, CTA «Invia richiesta»
H2  I portali                                              [proposta]        §22
    Città Digitali → cittadigitali.it · Puglia Digitale → lapugliadigitale.it
```

**Link interni in uscita**: `/privacy-policy` (etichetta del consenso nel form); portali e LinkedIn sono esterni. **In entrata**: CTA dell'header («Parliamone» o «Contattaci»), navigazione, footer.

**Note (local SEO)**
- Nome, indirizzo e telefono come testo in `<address>`, identici in footer, dati strutturati, Google Business Profile e directory, con lo stesso formato ovunque.
- Il LinkedIn indicato è il profilo personale del fondatore: nel testo va scritto «LinkedIn di Giacomo Lenoci». Nei dati strutturati va nel `sameAs` del Person, non dell'Organization (da passare a seo-technical).
- Esiste una scheda Google Business Profile? `[DA VERIFICARE]`
- Niente mappa incorporata di terze parti senza consenso (cookie e performance): basta un link «Apri in Google Maps».

### 3.6 Pagine di servizio

| URL | Title (car.) | Meta description (car.) | Note |
|---|---|---|---|
| `/privacy-policy` | Privacy Policy \| ITnode (23) | Come ITnode tratta i dati personali raccolti con il sito e il modulo di contatto: titolare, finalità, basi giuridiche, tempi di conservazione e diritti. (152) | H1 «Privacy Policy». Indicizzazione: decide seo-technical. Il sito attuale ha `/informativa-privacy/` (redirect). |
| `/cookie-policy` | Cookie Policy \| ITnode (22) | Quali cookie e tecnologie simili usa il sito di ITnode, per quali finalità, per quanto tempo e come dare, negare o revocare il consenso in ogni momento. (152) | H1 «Cookie Policy». La meta va riallineata al testo definitivo della policy. |
| 404 | Pagina non trovata \| ITnode (27) | La pagina che cerchi non esiste più o è stata spostata. Riparti dalla home page di ITnode oppure esplora SIII, Puglia Digitale e Città Digitali. (144) | `noindex`, fuori dalla sitemap, stato HTTP 404. Link a `/`, `/siii`, `/puglia-digitale`, `/citta-digitali`. L'H1 lo scrive copywriter-brand. |

## 4. Blocchi di risposta (AEO/GEO)

Sono definizioni brevi e autosufficienti, scritte solo con i fatti delle linee guida: servono a essere citati da AI Overviews, ChatGPT e Perplexity e a fissare un'entità ITnode coerente.

**Regole**
- **Visibili e nel flusso editoriale**: primo paragrafo sotto l'heading indicato, nell'HTML statico. Niente accordion, tab, tooltip o testo nascosto.
- **Autosufficienti**: nominano l'entità per esteso (niente «noi» o «questo progetto») e si capiscono anche estratti dalla pagina.
- **Sempre le stesse parole**: se un blocco si riusa altrove (profili esterni, portali, Google Business Profile), si riprende identico o accorciato, senza riformularlo. Proposta per lo sviluppo: tenerli in un unico file di contenuti in `src/data/`.
- **Niente sezione FAQ né markup FAQPage**: le risposte stanno nelle sezioni editoriali. I dati strutturati (Organization, WebPage, Person, VideoObject) li scrive seo-technical in coerenza con questi testi.
- I copywriter possono rifinire lo stile, ma non aggiungere fatti. Un segnaposto ancora aperto non va pubblicato: il blocco si accorcia.

**A. Cos’è ITnode**
- **Dove**: home, sezione introduttiva, primo paragrafo sotto l'H2 «ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.»
- **Testo**: «ITnode è un’azienda con sede operativa ad Acquaviva delle Fonti, in provincia di Bari, che rende gli spazi fisici esplorabili sul Web. Realizza Siti Interattivi Immersivi (SIII) e ha creato Puglia Digitale e Città Digitali, due progetti di digitalizzazione territoriale che portano online luoghi, imprese e attività attraverso tour virtuali interattivi e immersivi. Il suo obiettivo è una nuova infrastruttura digitale che connetta imprese, cittadini e visitatori.»
- **Fonti**: §7, §8, §10, §12, §22, §35. La prima frase è anche il boilerplate da usare su Google Business Profile, LinkedIn aziendale e nelle pagine «chi siamo» dei portali.

**B. Cos’è un Sito Interattivo Immersivo (SIII)**
- **Dove**: `/siii`, sezione «Cos’è un Sito Interattivo Immersivo», primo paragrafo.
- **Testo**: «Un Sito Interattivo Immersivo (SIII) replica digitalmente gli spazi fisici di un’impresa e li trasforma in un ambiente navigabile da desktop e da smartphone. Chi lo visita può esplorare gli ambienti, interagire con gli hotspot, vedere i prodotti, guardare video, richiedere informazioni, prenotare servizi e accedere ad azioni commerciali. È la soluzione di ITnode per le aziende che, invece di raccontarsi, vogliono farsi esplorare.»
- **Fonti**: §8, §10.

**C. Tour 360° e Sito Interattivo Immersivo: la differenza**
- **Dove**: `/siii`, sezione comparativa, paragrafo prima della tabella.
- **Testo**: «Un tour 360° è pensato soprattutto per mostrare un ambiente: chi lo visita si guarda intorno e passa da un punto di vista all’altro. Un Sito Interattivo Immersivo (SIII) parte dall’esplorazione degli spazi, ma è un sito a tutti gli effetti: dentro l’ambiente si interagisce con hotspot, prodotti e video, si chiedono informazioni, si prenotano servizi e si accede ad azioni commerciali. In breve, il tour 360° fa vedere uno spazio; il SIII lo trasforma in uno strumento commerciale sempre accessibile.»
- **Fonti**: §10, §11. La descrizione del tour 360° (prima frase) è una definizione generale della categoria, non presa dalle linee guida `[DA VERIFICARE con ITnode]`.

**D. Cos’è Puglia Digitale**
- **Dove**: `/puglia-digitale`, sezione «Dalla costa all’entroterra. Un territorio da esplorare.», primo paragrafo.
- **Testo**: «Puglia Digitale è una piattaforma interattiva immersiva per la valorizzazione territoriale, creata da ITnode e online su lapugliadigitale.it. È un progetto di destination marketing che digitalizza e valorizza città, borghi e imprese della Puglia attraverso esperienze immersive, dalla costa all’entroterra. Tra i luoghi da esplorare ci sono Acquaviva delle Fonti, Gravina in Puglia e Monopoli.»
- **Fonti**: §7, §13, §15, §22.

**E. Cos’è Città Digitali**
- **Dove**: `/citta-digitali`, sezione «L’Italia in un unico portale.», primo paragrafo.
- **Testo**: «Città Digitali è il progetto di ITnode che porta online le attività del territorio senza che perdano le proprie radici. Offre al tessuto imprenditoriale e commerciale italiano tour virtuali, Siti Interattivi Immersivi e strumenti digitali, e riunisce in un unico portale, cittadigitali.it, città come Varese, Altamura e Caltanissetta.»
- **Fonti**: §7, §17, §18, §22. Il dominio va confermato `[DA VERIFICARE]`.

**F. SIII, Puglia Digitale e Città Digitali: come si collegano**
- **Dove**: home, sezione «I tre mondi ITnode», paragrafo prima dei tre capitoli.
- **Testo**: «SIII, Puglia Digitale e Città Digitali sono tre applicazioni concrete della stessa visione di ITnode: rendere gli spazi esplorabili digitalmente e usare questa tecnologia per valorizzare imprese e territori. Il SIII porta online gli spazi di una singola impresa, Puglia Digitale valorizza città, borghi e imprese della Puglia, Città Digitali riunisce in un unico portale le attività di città italiane come Varese, Altamura e Caltanissetta.»
- **Fonti**: §10, §13, §17, §18, §35.

**G. Chi ha fondato ITnode**
- **Dove**: home, sezione del fondatore, primo paragrafo sotto l'H2 e prima della timeline (la sezione si chiude con la citazione, §9).
- **Testo**: «ITnode è stata fondata da Giacomo Lenoci, che lavora nell’innovazione da 36 anni. Il suo percorso comprende IBM negli anni ’90, la prima azienda nel 2002, MyComm, IcommLab e Leadstone, e oggi ITnode con Puglia Digitale e Città Digitali.»
- **Fonti**: §9, §22 (profilo LinkedIn). `[DA VERIFICARE: nome del fondatore, ricavato dal profilo LinkedIn; anno da cui si contano i 36 anni; abbinamento «prima azienda – 2002»; ruolo in IBM]`. «10.000+ clienti» resta fuori finché non è documentato.

## Ipotesi da validare

- H1 composto (nome del progetto + descrittore) su `/puglia-digitale` e `/citta-digitali` per disambiguare dagli omonimi in SERP.
- Il SIII è un sito costruito sulla replica navigabile degli spazi, e il tour virtuale è il mezzo che rende gli spazi esplorabili. È la lettura di §7, §10 e §17, da confermare nel glossario.
- Le imprese aderenti a Puglia Digitale possono avere un SIII (le esperienze dello showcase sono su portali di luoghi di Puglia Digitale). Serve solo a giustificare il link da `/puglia-digitale` a `/siii`.
- Nessuna sezione FAQ è necessaria al lancio: i blocchi A–G coprono le domande principali.

## Domande aperte

**Per il cliente**
1. Che cosa significa la quarta «I» di SIII?
2. Che tecnologia usa il SIII: foto sferiche 360°, scansione 3D o modelli 3D? Da questo dipende l'uso di «tour virtuale 3D».
3. Qual è il dominio canonico di Città Digitali: www.cittadigitali.it o cittàdigitali.it?
4. Quali sono fonte e data dei numeri di Puglia Digitale (30+, circa 200.000, 60%) e di «10.000+ clienti»? Esistono dati documentati sul traffico dei portali?
5. Per ogni progetto dello showcase e per ogni luogo servono settore o descrizione, località, cosa si può fare, foto o screenshot.
6. Per il video servono titolo, descrizione, data e durata; ha una traccia parlata?
7. Esiste una scheda Google Business Profile? Quali profili ufficiali (Instagram @itnodedigital? pagina LinkedIn aziendale?) vanno collegati all'entità?

**Per altri membri**
- **brand-strategist**: adottare o correggere la terminologia della sezione 1 nel glossario; normalizzare «Siti Immersivi Interattivi» (§17) in «Siti Interattivi Immersivi».
- **seo-technical**: `sameAs` (LinkedIn del fondatore sul Person, non sull'Organization); BreadcrumbList solo con un breadcrumb visibile (proposta: riga «ITnode / SIII» sopra l'H1 delle pagine interne); redirect di `/informativa-privacy/`.
- **ux-designer**: nomi accessibili delle CTA ripetute; blocco «Gli altri mondi ITnode» sulle pagine di progetto; composizione dell'H1 su due livelli.
- **cro-specialist**: destinazione di «Entra in Città Digitali» (form o portale).

## Decisioni richieste

1. **H1 composti** su `/puglia-digitale` e `/citta-digitali`: ux-designer e copywriter-brand; creative-director in caso di conflitto con la composizione.
2. **Terminologia provvisoria** (sezione 1): brand-strategist nel glossario.
3. **Breadcrumb visibile** per supportare BreadcrumbList: seo-technical con ux-designer.
4. **Blocchi A–G in un file di contenuti condiviso** in fase di sviluppo: sessione principale.
