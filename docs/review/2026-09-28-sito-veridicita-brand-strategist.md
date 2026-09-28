---
titolo: Review di veridicità del sito costruito (Fase 5, soglia 1)
owner: brand-strategist
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
oggetto: sito costruito (src/pages, src/components, src/data, src/lib/structured-data.ts, dist/)
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/contenuti/copy-deck/, src/pages/*.astro, src/components/**, src/data/site.ts, src/data/figures.ts, src/data/media.ts, src/data/pages.ts, src/data/asset-slots.ts, src/lib/structured-data.ts, src/scripts/track.ts, dist/**/*.html, src/assets/images/derivate/, public/og/default.jpg]
---

# Review di veridicità · sito costruito

**Soglia di riferimento:** CLAUDE.md, soglia 1 (niente clienti, numeri, risultati, testimonianze, premi, certificazioni o partnership inventati; superlativi solo se dimostrabili), più il registro dei claim del brief consolidato (sezione 5) e LG §11, §14, §20, §25, §31.

**Perimetro e limiti.**
- Ho letto il testo visibile di tutte le pagine indicizzabili, i dati in `src/data/`, il JSON-LD e il suo output in `dist/`. Ho guardato le immagini pubblicate: foto dell'evento, ritratto del fondatore, immagine Open Graph.
- Dal nostro ambiente non sono raggiungibili portali, esperienze SIII, LinkedIn e il video su railway.app. Link e contenuto del video quindi **non sono verificati**.
- `docs/creativa/direzione-visiva.md` l'ho consultata solo attraverso i riferimenti nel codice.

**In breve.**
- Il sito non contiene superlativi, premi, certificazioni, patrocini, partnership, loghi istituzionali, simboli ®, né i claim esclusi dal registro (N6–N9, X1–X2).
- Restano cinque punti che bloccano il go-live, nessuno dei quali blocca lo staging:
  - l'attribuzione di Puglia Digitale, ripetuta nel JSON-LD di 7 pagine;
  - «portale ad alto traffico»;
  - la fonte dei numeri di Puglia Digitale;
  - la provenienza AI della foto dell'evento;
  - i dati societari.
- Ognuno ha un testo di riserva, quindi il go-live non dipende dalle risposte del cliente. Fanno eccezione i dati societari, che vanno forniti.

## 1. Registro dei claim sul sito

Stati:
- **OK**: conforme al registro.
- **Da verificare**: serve una conferma o una fonte.
- **Da fornire**: manca il dato.
- **Non conforme**: il testo attuale non rispetta il registro.

Rischio: A = alto, M = medio, B = basso. Nella colonna «Azione» i codici rimandano alle osservazioni della sezione 2.

### Home (`src/pages/index.astro`)

| # | Dove | Testo sul sito | Fonte | Stato | Rischio | Azione |
|---|---|---|---|---|---|---|
| H1 | Hero, occhiello | «ITnode — esperienze digitali immersive per imprese e territori» | LG §02, §35 | OK | B | — |
| H2 | Hero, didascalia e orizzonte | «Vista da Acquaviva delle Fonti · 40.8957° N · 16.8412° E», gradi e km verso sei città | Coordinate pubbliche dei comuni; calcolo in `src/lib/geo.ts` | Da verificare | B | S1, S2 |
| H3 | Chi siamo | «ITnode è un’azienda di Acquaviva delle Fonti, in provincia di Bari, che rende gli spazi fisici esplorabili sul Web. Crea Siti Interattivi Immersivi (SIII) per le imprese.» | LG §07, §10, §22 | OK | B | — |
| H4 | Chi siamo (righe 50–52) | «Ha creato Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale…» | LG §07; A1 | Da verificare (D1, D5) | A | **B1** |
| H5 | Evento (righe 56–67) | Legenda «L’evento Puglia Digitale»; hotspot «Il palco dell’evento Puglia Digitale», «Vista aerea a 360° di una città, con le attività in evidenza», «Una piazza storica esplorabile a 360°» | A4; il file sorgente porta la filigrana ✦ di Gemini | Da verificare (D9) | A | **B4** |
| H6 | Passaggio | «Una nuova infrastruttura digitale per connettere imprese, cittadini e visitatori.» | LG §07 | OK | B | — |
| H7 | Tre mondi, H2 | «I tre mondi ITnode» | LG §08; copy deck home §5 | Da verificare (dipende da D1) | M | I6 |
| H8 | 01 SIII | «…guarda prodotti e video, chiede informazioni e prenota.» | LG §10; N13 | OK, con la riserva N13 | B | I7 |
| H9 | 02 Puglia Digitale | «Un territorio. Migliaia di storie.» · «Un progetto di destination marketing che digitalizza città, borghi e imprese della Puglia…» | LG §08, §13; N11 | OK | B | — |
| H10 | 03 Città Digitali | «Varese, Altamura, Caltanissetta: città diverse, un unico portale.» | LG §17–18; N12 | OK | B | — |
| H11 | Fondatore, H2 | «36 anni dentro l’innovazione.» | LG §09; N4 | OK (il numero invecchia) | B | S4 |
| H12 | Fondatore, lead | «ITnode è stata fondata da Giacomo Lenoci, che lavora nell’innovazione da 36 anni. Il suo percorso comincia con IBM negli anni ’90…» | Nome dal profilo LinkedIn (LG §22); F1, F7 | Da verificare | M | I1, I3 |
| H13 | Timeline | «Anni ’90 · IBM» · «— · La prima azienda» · «Dal 2002 · MyComm · iComm Lab · Leadstone» | LG §09; F1–F6 | Da verificare (anni, grafia di «IcommLab») | B | I3 |
| H14 | Timeline, tappa 3 | «10.000+ clienti, prima di ITnode» | LG §09; N5 | Dato del cliente; perimetro da verificare | M | I2 |
| H15 | Citazione e firma | «È questo il futuro che mi appassiona…» · «Giacomo Lenoci, fondatore di ITnode» | LG §09; F7 | OK il testo; ruolo da verificare | B | I1 |
| H16 | Ritratto | Ritratto monocromo con la nota «Immagine elaborata con strumenti di intelligenza artificiale» | DR3-b; D9 | Da verificare (generato o elaborato?) | M | I5 |
| H17 | JSON-LD Person | `name` Giacomo Lenoci, `jobTitle` «Fondatore», `sameAs` LinkedIn, senza immagine | F7; S6 | Da verificare | M | I1 |

### SIII (`src/pages/siii.astro`)

| # | Dove | Testo sul sito | Fonte | Stato | Rischio | Azione |
|---|---|---|---|---|---|---|
| S-1 | Definizione | «Un Sito Interattivo Immersivo (SIII) replica digitalmente gli spazi fisici di un’impresa…» | LG §10 | OK | B | — |
| S-2 | Confronto | Tabella tour 360° / SIII («Soprattutto a mostrare un ambiente», «Di norma rimanda ad altri canali») | LG §10; criteri `[DA FORNIRE]` (D4) | Da verificare | B | S5 |
| S-3 | Cosa si può fare (riga 183) | «Nel tuo SIII, chi ti visita può: … Prenotare i servizi … Accedere alle azioni commerciali» | LG §10; N13 | Da verificare (funzioni incluse o opzionali?) | M | I7 |
| S-4 | Benefici | «Fiducia istantanea», «Più coinvolgimento», «Vendita diretta», «Uno strumento commerciale sempre accessibile», con testi qualitativi | LG §11; N6 e N9 esclusi; N13 | OK; «Vendita diretta» da verificare | B | I7 |
| S-5 | Esempi (riga 230) | «Tre Siti Interattivi Immersivi già online.» | LG §12; S7 | Da verificare (link non controllati) | M | I8 |
| S-6 | Esempi | Masseria Santella, Maison Miminà, D.L. Natura Dentro | LG §12; A7 | Da fornire (consenso, nomi ufficiali) | M | I10 |
| S-7 | Esempi, riga luogo | «Cassano delle Murge (BA) · 40.8906° N · 16.7700° E», «Monopoli (BA) · 40.9500° N · 17.3000° E», «Acquaviva delle Fonti (BA) · 40.8957° N · 16.8412° E» | Comuni dedotti dai domini dei portali; coordinate del centro del comune | Non conforme: le coordinate del comune sono presentate come posizione dell’impresa | M | I10 |
| S-8 | JSON-LD Service | «SIII – Siti Interattivi Immersivi»; la descrizione include «prenotare servizi» | LG §10; D3; N13 | OK con riserve | B | — |

### Puglia Digitale (`src/pages/puglia-digitale.astro`)

| # | Dove | Testo sul sito | Fonte | Stato | Rischio | Azione |
|---|---|---|---|---|---|---|
| P1 | Hero | «Una piattaforma interattiva immersiva per la valorizzazione territoriale.» | LG §13 | OK | B | — |
| P2 | Progetto | «online su lapugliadigitale.it» | LG §22; D1; S7 | Da verificare | M | Domanda 1 |
| P3 | Progetto | «Con Puglia Digitale, ITnode porta online luoghi, imprese e attività…» | Formula provvisoria del brief (2.4) | OK | B | Va adottata anche in Home e nel JSON-LD (B1) |
| P4 | Foto (righe 94–102) | Alt «La platea dell’evento Puglia Digitale davanti al maxischermo con il tour virtuale di una piazza storica.» | A4 | Da verificare (D9) | A | **B4** |
| P5 | Numeri | «30+ città coinvolte» | LG §14; N1 | Dato del cliente; data e perimetro da fornire | M | **B3**, I9 |
| P6 | Numeri | «~200.000 partite IVA nei territori coinvolti» | LG §14; N2 | Da fornire (fonte, anno, definizione) | A | **B3** |
| P7 | Numeri | «60% del tessuto produttivo pugliese» | LG §14; N3 | Da fornire (come P6); etichetta ambigua | A | **B3**, I9 |
| P8 | Numeri, nota | «Dati ITnode.» | `src/data/figures.ts` | Non sufficiente per N2–N3 | — | **B3** |
| P9 | Luoghi | Righe su Monopoli, Acquaviva («la città in cui ha sede ITnode»), Gravina | Conoscenza generale; LG §22 | OK | B | — |
| P10 | Perché aderire | Quattro benefici qualitativi | LG §16 (titoli) | OK | B | — |
| P11 | CTA e form | «Aderisci a Puglia Digitale» · «ti spieghiamo come entrare in Puglia Digitale» | LG §16 | OK se ITnode gestisce le adesioni (D1) | M | I6 |

### Città Digitali (`src/pages/citta-digitali.astro`)

| # | Dove | Testo sul sito | Fonte | Stato | Rischio | Azione |
|---|---|---|---|---|---|---|
| C1 | Hero, sottotitolo (riga 55) | «Tour virtuali, Siti Immersivi Interattivi e strumenti digitali…» | LG §17, riportato alla lettera; DR2 | OK, ma la grafia non è coerente con il resto del sito | B | S3 |
| C2 | Portale | «Città Digitali è la rete e il portale nazionale con cui ITnode porta online…» · «Riunisce in un unico portale, cittadigitali.it, città come Varese, Altamura e Caltanissetta.» | LG §17–18; N12; D5 | OK (formula provvisoria) | B | — |
| C3 | Come funziona 01–04 | Titoli delle LG e testi qualitativi | LG §20 | OK | B | — |
| C4 | Come funziona 05 (riga 113) | «La forza di un portale ad alto traffico» | LG §20; N10 (dipende da N8) | Da verificare | A | **B2** |
| C5 | Video | «Il progetto Città Digitali, raccontato per immagini.»; file su un dominio di staging di terzi | LG §19; S8 | Contenuto non visionato | M | I4 |

### Contatti, footer, pagine legali

| # | Dove | Testo sul sito | Fonte | Stato | Rischio | Azione |
|---|---|---|---|---|---|---|
| K1 | Recapiti, footer | Telefono, cellulare, email | LG §22; S5 | OK | B | — |
| K2 | Recapiti, footer, dati societari | «Sede operativa · Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA)» | LG §22; S3 | OK come sede operativa; la sede legale non è indicata | A (soglia 5) | **B5** |
| K3 | Recapiti, footer, immagine OG | «Acquaviva delle Fonti · 40.8957° N · 16.8412° E» | Coordinate del comune | Da verificare | B | S1 |
| K4 | LinkedIn | «Profilo personale del fondatore» | LG §22; S6 | OK | B | — |
| K5 | Persona | «Giacomo Lenoci · Fondatore di ITnode», citazione, ritratto con nota AI | F7; DR3-b | Da verificare | M | I1, I5 |
| K6 | Dati societari, footer | «ITNODE S.r.l.» · «P.IVA 08937270729» | ufficiocamerale.it, atoka.io; S1–S2 | Da verificare (visura) | M | **B5** |
| K7 | Dati societari, footer | REA, capitale sociale, sede legale | S4 | Da fornire | A (soglia 5) | **B5** |
| K8 | Cookie policy (riga 21) | «Il sito non usa cookie di profilazione né cookie di statistica…» | `src/scripts/track.ts`: nessuna richiesta di rete, nessun cookie | OK con il codice attuale | B | Da ricontrollare se si attiva un analytics o se il video resta su un dominio di terzi |
| K9 | Privacy | «Il titolare del trattamento è ITNODE S.r.l., Via Sant’Anna…» | S1, S3 | Da verificare (visura; il testo spetta al consulente) | M | **B5** |

### Dati strutturati e metadati

| # | Dove | Contenuto | Fonte | Stato | Rischio | Azione |
|---|---|---|---|---|---|---|
| J1 | `Organization.description`, in 7 pagine su 8 (tutte tranne la 404) | «ITnode ha creato Città Digitali e Puglia Digitale…» | LG §07; A1 | Da verificare | A | **B1** |
| J2 | `Organization.brand` | Brand «Puglia Digitale» (url lapugliadigitale.it) e «Città Digitali» | D1, D5 | Da verificare | A per Puglia Digitale | **B1** |
| J3 | `legalName`, `vatID`, `address` | «ITNODE S.r.l.», «IT08937270729», Via Sant’Anna 34 | S1–S3 | Da verificare (visura) | M | **B5** |
| J4 | VideoObject | Non pubblicato: mancano miniatura e data | — | OK | — | — |
| J5 | Meta description e immagine OG | Descrizione della Home neutra; immagine OG solo tipografica, con le coordinate | `src/data/pages.ts`; `public/og/default.jpg` | OK | B | — |

## 2. Osservazioni

### [BLOCCANTE] B1 · Chi ha creato Puglia Digitale: la frase compare in Home e nel JSON-LD di tutte le pagine
- **Dove:**
  - `src/pages/index.astro` (righe 50–52);
  - `src/lib/structured-data.ts` (righe 39–40, `description`; righe 59–74, `brand`), ripetuto in `dist/` in 7 pagine su 8;
  - confronto con `src/pages/puglia-digitale.astro` (riga 86) e `src/pages/citta-digitali.astro` (riga 81).
- **Problema:**
  - La Home e il JSON-LD dicono «ha creato Città Digitali e Puglia Digitale».
  - Le pagine Puglia Digitale e Città Digitali usano invece la formula provvisoria («Con Puglia Digitale, ITnode porta online…», «con cui ITnode porta online»).
  - Lo stesso fatto è quindi detto in due modi diversi. Il JSON-LD lo ripete anche sulle pagine che, nel testo visibile, lo evitano.
  - Il nodo `brand` dichiara Puglia Digitale un marchio di ITnode.
- **Motivazione:**
  - Le fonti pubbliche attribuiscono il portale omonimo puglia-digitale.it all'associazione Campo&Controcampo (brief A1, D1). Esiste anche il programma regionale «Puglia Digitale».
  - Nei dati strutturati il claim arriva a motori di ricerca e assistenti AI, che lo riprendono e lo tengono in cache. Correggerlo dopo è difficile.
  - Registro A1: «Da verificare»; regola DR4: niente «ha creato» per Puglia Digitale fino a D1. Il copy deck della Home (riga 253) prevedeva la versione provvisoria.
- **Proposta:**
  - **Staging:** si può mostrare al cliente la frase delle LG, a patto che lo staging non sia indicizzabile e che la domanda D1 accompagni il link.
  - **Go-live senza conferma scritta**, Home:
    > «ITnode è un’azienda di Acquaviva delle Fonti, in provincia di Bari, che rende gli spazi fisici esplorabili sul Web. Crea Siti Interattivi Immersivi (SIII) per le imprese e, con Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale, porta online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.»
  - **Go-live senza conferma scritta**, `Organization.description`:
    > «ITnode rende esplorabili sul Web gli spazi reali di imprese e territori: crea Siti Interattivi Immersivi (SIII) e, con Città Digitali e Puglia Digitale, porta online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.»
  - **Go-live senza conferma scritta**, `brand`: il nodo Puglia Digitale si toglie finché D1 è aperta (la forma del riferimento da `about` la decide seo-technical). Città Digitali resta se in staging il cliente conferma di gestirla (D5).
  - **Dopo D1:**
    - (a) ITnode è ideatore e titolare del marchio e del portale: si usa il testo delle LG ovunque, pagine interne comprese.
    - (b) ITnode è partner tecnologico: «Ha creato Città Digitali e fornisce la tecnologia di Puglia Digitale: due progetti di digitalizzazione territoriale che…».
  - **Verifica utile:** il logo sulla foto dell'evento porta il simbolo ®. Una ricerca del titolare del marchio «Puglia Digitale» nelle banche dati UIBM o EUIPO chiuderebbe D1 con un documento.

### [BLOCCANTE] B2 · «La forza di un portale ad alto traffico»
- **Dove:** `src/pages/citta-digitali.astro`, riga 113.
- **Problema:**
  - «Ad alto traffico» afferma un dato di traffico, e il dato non c'è (N8 non documentato).
  - Il testo del punto è qualitativo e corretto; il titolo no.
- **Motivazione:**
  - Registro N10: «Da verificare, dipende da N8».
  - È un argomento di vendita rivolto alle imprese: si applica la disciplina sulla pubblicità ingannevole (D.Lgs. 145/2007).
  - Il copy deck (citta-digitali.md, righe 166 e 232) prevede già la riserva.
- **Proposta:**
  - Staging: invariato, con la richiesta dei dati al cliente.
  - Go-live senza export degli analytics: titolo «La forza di un portale nazionale».
  - Se il dato arriva: titolo invariato e, se il cliente lo vuole, il numero con la formula N8: «Oltre [N] visite al mese su [portale] (media [periodo], fonte [strumento])».

### [BLOCCANTE] B3 · Numeri di Puglia Digitale: la nota «Dati ITnode.» non basta per le partite IVA e la quota del tessuto produttivo
- **Dove:** `src/pages/puglia-digitale.astro` (righe 106–116); `src/data/figures.ts`.
- **Problema:**
  - «~200.000 partite IVA» e «60% del tessuto produttivo pugliese» non sono dati di ITnode: derivano da registri pubblici (Registro imprese, Anagrafe tributaria). La nota «Dati ITnode.» ne sbaglia quindi la provenienza.
  - I due numeri, inoltre, tornano solo con una certa definizione. Se 200.000 è il 60%, la base è di circa 333.000, un ordine di grandezza vicino alle imprese pugliesi (373.787 registrate al 31/12/2025, Movimprese, dato da snippet). Se però si contano tutte le partite IVA, che includono i professionisti, la base cresce e il 60% non regge (brief N3).
- **Motivazione:**
  - Registro N2–N3: «Utilizzabile, con fonte [DA FORNIRE: fonte, anno, definizione]».
  - Il copy deck (puglia-digitale.md, riga 103) affida a me la scelta tra la nota senza data e il rinvio della sezione.
- **Decisione di dominio** (brand-strategist, owner del registro):
  - **Staging:** i tre numeri restano con «Dati ITnode.», così il cliente li rivede e li conferma.
  - **Go-live con i dati completi:**
    > «Città: dati ITnode, aggiornati a [mese anno]. Partite IVA e tessuto produttivo: elaborazione ITnode su dati [fonte], [anno].»
  - **Go-live senza fonte per N2–N3:** i due numeri non si pubblicano.
    - «30+ città coinvolte» si pubblica se il cliente conferma numero e perimetro, con «Dati ITnode, aggiornati a [mese anno]». È un dato di prima parte, quindi la sola data è accettabile.
    - Se un numero da solo non regge la composizione, creative-director decide se rinviare l'intera sezione. Il layout resta pronto.

### [BLOCCANTE] B4 · Foto dell'evento: provenienza AI e persone riconoscibili
- **Dove:**
  - `src/pages/index.astro`, righe 56–67 (`evento-panorama.jpg`, `evento-citta.jpg`);
  - `src/pages/puglia-digitale.astro`, righe 94–102 (`evento-schermo.jpg`).
- **Problema:**
  - Il sito usa la foto come documento («L’evento Puglia Digitale»), ma il file sorgente porta la filigrana ✦ di Gemini (brief §0.3, I7). Nei ritagli la filigrana non si vede più.
  - Un'immagine passata da un editor generativo di norma viene rigenerata dal modello per intero, non solo nelle parti ritoccate `[DA VERIFICARE con consulente legale]`. Anche i volti del pubblico e i contenuti sugli schermi potrebbero quindi essere sintetici.
  - I ritratti hanno la nota di trasparenza (DR3-b), le foto dell'evento no: il criterio non è coerente.
  - In platea ci sono volti di profilo riconoscibili:
    - nella vista panoramica, ai bordi sinistro e destro;
    - nel ritaglio della pagina Puglia Digitale, l'uomo con il cappellino al centro.
- **Motivazione:**
  - Soglia 1: un'immagine elaborata con AI e presentata come documento di un evento è una prova non verificata.
  - AI Act, art. 50 (DR3-b).
  - Registro A4: servono le liberatorie o l'informativa dell'evento, altrimenti si ritaglia.
  - Le didascalie attuali sono corrette: niente data, luogo, numeri di partecipanti o nome dell'oratore. Vanno mantenute così.
- **Proposta:**
  - **Soluzione preferita:** l'originale dello scatto, senza cornice, logo e firma (brief, materiali P2). I ritagli si rifanno dall'originale e la nota non serve.
  - **Nel frattempo, prima del go-live:** la stessa nota dei ritratti sotto entrambe le foto (nella Home, nella `caption` di ImmersivePreview; nella pagina Puglia Digitale, in una `figcaption`): «Immagine elaborata con strumenti di intelligenza artificiale.»
  - **Persone:** se il cliente non conferma l'informativa sulle riprese, si ritagliano o si sfocano i volti di profilo riconoscibili. La decisione legale spetta al consulente.
  - Non va identificato l'oratore sul palco finché il cliente non lo conferma.

### [BLOCCANTE] B5 · Dati societari: da verificare con la visura e incompleti
- **Dove:**
  - `src/data/site.ts` (righe 7–31);
  - `src/components/layout/Footer.astro` (righe 12–17, 50–54);
  - `src/pages/contatti.astro` (righe 197–231);
  - pagina privacy;
  - JSON-LD `legalName`, `vatID`, `address`.
- **Problema:**
  - Ragione sociale e P.IVA vengono da fonti pubbliche secondarie.
  - Mancano REA, capitale sociale e sede legale: il sito indica solo la «Sede operativa».
- **Motivazione:**
  - Soglia 5 (dati societari obbligatori) e soglia 1 (dati legali non confermati).
  - Registro S1–S4.
- **Proposta:**
  - Con la visura: «ITNODE S.r.l. · Sede legale e operativa: Via Sant’Anna 34, 70021 Acquaviva delle Fonti (BA) · Registro delle imprese di Bari e REA n. [DA FORNIRE] · Capitale sociale € [DA FORNIRE] [«i.v.» solo se interamente versato] · P.IVA 08937270729».
  - Se le sedi sono diverse, vanno indicate su due righe.
  - La forma esatta la conferma il consulente legale.

### [IMPORTANTE] I1 · Nome e ruolo del fondatore
- **Dove:**
  - Home, lead e firma;
  - Contatti, blocco persona («Fondatore di ITnode»);
  - JSON-LD Person (`jobTitle` «Fondatore»), `Organization.founder`.
- **Problema:** le LG non nominano il fondatore. Il nome viene dal profilo LinkedIn, che indica il ruolo «CEO». «Fondata da» e «Fondatore» sono quindi un'inferenza (F7).
- **Proposta:**
  - Chiedere conferma in staging.
  - Se ci sono più soci fondatori: «co-fondatore».
  - Se il cliente preferisce il titolo di LinkedIn: «fondatore e CEO di ITnode», da allineare nei tre punti e nel JSON-LD.

### [IMPORTANTE] I2 · «10.000+ clienti, prima di ITnode»
- **Dove:** Home, timeline, tappa 3 (`src/pages/index.astro`, riga 155).
- **Problema:**
  - Il dato viene dalle LG ed è etichettato bene («prima di ITnode»). Resta però accanto alla tappa «Oggi · ITnode» ed è l'unico numero grande della Home: chi scorre può attribuirlo a ITnode.
  - Non sappiamo quali aziende, quale periodo e se si tratta di clienti o di utenti (N5).
- **Proposta:** confermo la proposta del copy deck (home.md, riga 276).
  - **Staging:** opzione A, cioè il numero pubblicato con «prima di ITnode».
  - **Go-live:** A solo se il cliente conferma il perimetro. Allora l'etichetta diventa «clienti delle aziende guidate da Giacomo Lenoci prima di ITnode», se è corretto.
  - Senza conferma: opzione B, si toglie il numero e resta la tappa.

### [IMPORTANTE] I3 · Anni e grafie della timeline
- **Dove:** Home, timeline e lead.
- **Problema:**
  - «Dal 2002» resta vero sia se il 2002 è l'anno della prima azienda sia se è quello di MyComm (copy deck home.md, riga 265). Non lo è più se MyComm nasce prima del 2002.
  - Scrivendo «comincia con IBM» si presuppone che IBM sia la prima tappa dei 36 anni.
  - «iComm Lab» segue le fonti pubbliche, mentre le LG scrivono «IcommLab» (F5).
- **Proposta:** il testo può restare com'è, ma servono le risposte alle domande 6 e 7 prima del go-live.

### [IMPORTANTE] I4 · Il video di Città Digitali non è stato visionato
- **Dove:** `src/pages/citta-digitali.astro`, riga 75; file su `itnode-website-production.up.railway.app`.
- **Problema:**
  - Pubblichiamo un contenuto che nessuno del team ha visto, perché il dominio è bloccato dal nostro ambiente.
  - Se contiene numeri (per esempio «250.000 visite», «5–10 volte»), loghi istituzionali, il patrocinio o claim sul franchising (X1), il sito pubblicherebbe proprio i claim che il registro esclude.
- **Proposta:**
  - Prima del go-live il video lo guarda chi ha accesso, oppure il cliente invia il file (S8), e si elencano i claim presenti a schermo.
  - Se il video contiene claim esclusi, va montata una versione senza quei claim, oppure non si pubblica.

### [IMPORTANTE] I5 · Formulazione della nota AI sui ritratti
- **Dove:** `src/data/media.ts`, riga 12.
- **Problema:**
  - «Elaborata» è corretto se si tratta di foto reali ritoccate.
  - Se le immagini sono generate, la nota minimizza. Il brief (§0.3) le descrive «generate o ritoccate con AI»: la provenienza non è confermata (D9).
- **Proposta:**
  - Fino alla risposta del cliente: «Immagine generata o elaborata con strumenti di intelligenza artificiale.»
  - «Elaborata» torna se il cliente conferma che si tratta di foto reali ritoccate.
  - Lo sfondo con i grattacieli, in parte visibile nel ritratto della Home, non rappresenta un luogo né un evento: va bene.

### [IMPORTANTE] I6 · Coerenza dell'attribuzione tra le pagine
- **Dove:**
  - «I tre mondi ITnode» (Home, riga 88);
  - «Aderisci a Puglia Digitale» e il form «ti spieghiamo come entrare in Puglia Digitale» (Puglia Digitale, righe 57 e 175).
- **Problema:** entrambe le formule presuppongono che Puglia Digitale sia di ITnode, o almeno che ITnode ne gestisca le adesioni.
- **Proposta:**
  - Si decide con D1, insieme a B1.
  - Se la risposta è (b), cioè partner tecnologico: H2 «I tre mondi» oppure «Tre mondi, una visione». La CTA resta se ITnode porta le imprese nel portale; altrimenti diventa «Porta la tua impresa in Puglia Digitale».

### [IMPORTANTE] I7 · Funzioni del SIII presentate come sempre incluse
- **Dove:**
  - `src/pages/siii.astro`, riga 183 («Nel tuo SIII, chi ti visita può:») e righe 24–31;
  - beneficio «Vendita diretta»;
  - Home 01 («…chiede informazioni e prenota»).
- **Problema:** su una pagina di vendita, l'elenco promette tutte le funzioni, prenotazione compresa. Non sappiamo se siano standard o opzionali, né se prenotazione e acquisto avvengano nel SIII o su sistemi esterni (N13).
- **Proposta:**
  - Se le funzioni sono opzionali: «Nel tuo SIII, in base alle funzioni che scegli, chi ti visita può:».
  - «Vendita diretta» resta se il cliente conferma che la vendita o la prenotazione partono dall'ambiente. Il testo attuale è già prudente.
  - In caso contrario, il titolo diventa «Dalla visita alla vendita».

### [IMPORTANTE] I8 · «Tre Siti Interattivi Immersivi già online»
- **Dove:** `src/pages/siii.astro`, riga 230, e i link dello showcase.
- **Problema:** l'affermazione è vera solo se le tre esperienze rispondono al lancio. Dal nostro ambiente non sono raggiungibili (S7).
- **Proposta:** controllare i link nella QA pre-lancio da una rete che li raggiunge (seo-technical o sessione principale). Un link che non risponde va tolto.

### [IMPORTANTE] I9 · Etichette dei numeri: il 60% e il perimetro dei 30+
- **Dove:** `src/pages/puglia-digitale.astro`, righe 112–114.
- **Problema:**
  - «60% del tessuto produttivo pugliese» si può leggere come «il 60% delle imprese pugliesi è su Puglia Digitale».
  - Se il perimetro delle «30+ città» comprende città fuori dalla Puglia (per esempio quelle di Città Digitali), sulla pagina Puglia Digitale il numero è fuorviante (I6 del brief).
- **Proposta:**
  - Etichetta: «del tessuto produttivo pugliese è in questi territori».
  - srText: «Il 60% del tessuto produttivo pugliese si trova nei territori coinvolti».
  - Per il 30+ serve la conferma del perimetro (domanda 4).

### [IMPORTANTE] I10 · Esempi SIII: consenso, comuni e coordinate
- **Dove:**
  - `src/data/site.ts`, righe 103–107;
  - `src/pages/siii.astro`, righe 242–246.
- **Problema:**
  - Accanto al nome di ogni impresa compaiono le coordinate del centro del comune, con quattro decimali. Si leggono come la posizione dell'impresa, e non lo sono. Masseria Santella, per esempio, è una masseria in campagna.
  - Per D.L. Natura Dentro le coordinate sono identiche a quelle della sede ITnode.
  - Per Monopoli la precisione è apparente: «40.9500° N · 17.3000° E».
  - I comuni di Maison Miminà e D.L. Natura Dentro sono dedotti dal dominio del portale `[IPOTESI]`.
  - Il consenso delle imprese a comparire con nome e immagine non è confermato (A7).
- **Proposta:**
  - Riga del luogo senza coordinate: «Cassano delle Murge (BA) · cassanodigitale.it».
  - In alternativa, le coordinate reali fornite dall'impresa, con il suo consenso.
  - Chiedere al cliente nomi ufficiali, comuni e consenso (domanda 9).

### [SUGGERIMENTO] S1 · Coordinate: verifica e precisione coerente
- **Dove:** hero della Home, luoghi, città, footer, Contatti, immagine OG, segnaposto dei luoghi (`src/data/asset-slots.ts`).
- **Problema e proposta:**
  - I valori sono plausibili come centri comunali: li ho confrontati a memoria, senza una fonte aperta, quindi restano `[DA VERIFICARE]`.
  - Alcuni sono arrotondati ma mostrati con quattro decimali (Monopoli «40.9500 / 17.3000», Caltanissetta «37.4900»).
  - Prima del lancio vanno verificati su una fonte ufficiale (per esempio ISTAT o Wikidata), usando quattro decimali reali, oppure due decimali ovunque.
  - Nel riquadro Contatti le coordinate sono etichettate con il nome del comune, sotto l'indirizzo: va bene, purché non vengano presentate come posizione della sede.

### [SUGGERIMENTO] S2 · Distanze dell'orizzonte
- **Dove:** `src/components/ui/Horizon.astro` (testo `full`).
- **Proposta:** aggiungere «in linea d'aria» al testo accessibile o alla didascalia, per esempio «Vista da Acquaviva delle Fonti · distanze in linea d’aria».

### [SUGGERIMENTO] S3 · Grafia di «Siti Interattivi Immersivi» (DR2)
- **Dove:** `src/pages/citta-digitali.astro`, riga 55, contro la riga 81 della stessa pagina, la Home e il JSON-LD.
- **Proposta:** approvare la DR2 prima del go-live, così la stessa entità ha lo stesso nome ovunque. Non è un problema di veridicità ma di coerenza dell'entità, anche per SEO e AEO.

### [SUGGERIMENTO] S4 · «36 anni» invecchia
- **Proposta:**
  - Calcolare gli anni a partire dall'anno di inizio, quando il cliente lo conferma (N4).
  - Oppure mettere un controllo annuale nel piano di manutenzione.
  - Nel 2027 il testo diventa falso se non si aggiorna.

### [SUGGERIMENTO] S5 · Confronto tra tour 360° e SIII
- **Proposta:**
  - Mantenere le cautele «soprattutto» e «di norma»: descrivono una categoria generica senza nominare concorrenti, e questo va bene.
  - Chiedere al cliente di validare i criteri del confronto (D4).

### [SUGGERIMENTO] S6 · Registrare le scelte di veridicità
- **Proposta:** registrare in un ADR la regola «staging con i testi del cliente, go-live con conferma scritta oppure con la riserva» e la scelta DR3-b. Oggi in `docs/decisioni/` c'è solo l'ADR 001.

## 3. Cosa è già a posto
- Nessun «leader», «primo», «migliore», «numero uno», «garantito» o «esclusivo». «Unico» compare solo in «L’Italia in un unico portale» e «un’unica rete», sempre con le città nominate (N12).
- Nessun premio, certificazione, patrocinio, partnership, logo istituzionale o simbolo ®. Nessun legame con la Regione Puglia o con puglia-digitale.it.
- Niente N6–N9 («5–10 volte», «4 volte», «250.000 visite», «posizionamento Google»); benefici solo qualitativi.
- Il componente Stats non si rende senza nota della fonte. Nel JSON-LD, Person è senza immagine e VideoObject non viene pubblicato senza dati reali.
- Le didascalie dell'evento non riportano date, luoghi, numeri di partecipanti o nomi non confermati. Il profilo LinkedIn è etichettato come personale.
- La cookie policy è coerente con `src/scripts/track.ts`. L'immagine OG e la meta description della Home sono neutre.
- Le pagine Puglia Digitale e Città Digitali usano già la formula prudente.

## 4. Verdetto di dominio (veridicità)

**Staging per la review del cliente: sì, a tre condizioni.**
1. Lo staging non è indicizzabile e ha un accesso protetto: testi e JSON-LD contengono claim non verificati.
2. Il link parte insieme alle domande della sezione «Domande aperte». La review del cliente è il momento più economico per chiudere D1, D5, D6, D7, D9, D10 e A7.
3. Consigliato, non obbligatorio: prima dello staging applicare le correzioni che non dipendono dal cliente, così il cliente vede la versione da lancio:
   - nota AI sulle foto dell'evento (B4);
   - «generata o elaborata» (I5);
   - riga del luogo senza coordinate negli esempi SIII (I10);
   - etichetta del 60% (I9).

**Go-live (G4): no, finché restano aperti B1–B5.**
- Per B1, B2 e B3 esiste una riserva che consente il lancio anche senza risposta del cliente:
  - B1: formula provvisoria e nodo `brand` Puglia Digitale tolto;
  - B2: «portale nazionale»;
  - B3: via N2–N3.
- B4 si chiude con l'originale della foto oppure con la nota e il ritaglio.
- B5 richiede i dati della visura: non ha riserva.
- Gli IMPORTANTI I1–I10 sono condizioni di G4, da chiudere con una conferma del cliente oppure con la riserva indicata in ciascuno.

## Ipotesi da validare
- Il 2002 è l'anno della prima azienda o di MyComm; in entrambi i casi MyComm non è anteriore al 2002 (I3).
- «30+», «~200.000» e «60%» si riferiscono ai territori di Puglia Digitale (I6 del brief).
- I ritratti sono generati o elaborati con AI; la foto dell'evento è reale ma è passata da Gemini (I7 del brief).
- Maison Miminà si trova a Monopoli e D.L. Natura Dentro ad Acquaviva delle Fonti: deduzione dai domini dei portali.
- Le coordinate sono quelle dei centri comunali, corrette entro circa 1 km (verifica a memoria).

## Domande aperte
Per il cliente, da inviare con il link di staging, in ordine di priorità. Per ogni domanda basta una risposta breve.

1. **Puglia Digitale (D1).** Il ruolo di ITnode è: (a) ideatore e titolare del marchio e del portale lapugliadigitale.it; (b) partner tecnologico; (c) altro? Chi è il titolare del marchio «Puglia Digitale» con ®?
2. **Città Digitali (D5).** Oggi ITnode gestisce Città Digitali ed è titolare del marchio e del portale? (sì/no)
3. **Traffico (N8, N10).** Avete un export degli analytics del portale con metrica e periodo? Se no, confermate il titolo «La forza di un portale nazionale»?
4. **Numeri (N1–N3).** Mese e anno dei dati. Le «30+ città» sono solo pugliesi? Quali sono la fonte e l'anno di «~200.000 partite IVA» e «60%», e cosa intendete per «tessuto produttivo»?
5. **Fondatore (F7).** «Giacomo Lenoci, fondatore di ITnode» è corretto? È l'unico fondatore?
6. **10.000+ clienti (N5).** Di quali aziende, in quale periodo, contati come?
7. **Timeline (F1–F5).** A cosa si riferisce il 2002? Come si chiamava la prima azienda? Si scrive «iComm Lab» o «IcommLab»? Il percorso comincia in IBM?
8. **Immagini (D9).** I ritratti sono foto reali ritoccate o immagini generate? Potete inviarci l'originale della foto dell'evento, dirci cosa è stato modificato con Gemini, data e luogo, e se ai partecipanti è stata data un'informativa sulle riprese?
9. **Esempi SIII (A7).** Le tre imprese hanno dato il consenso a comparire con nome e immagini? Nomi ufficiali e comuni sono corretti?
10. **Funzioni del SIII (N13).** Prenotazione e azioni commerciali sono incluse in ogni SIII o sono opzionali? Avvengono dentro il SIII o su sistemi esterni?
11. **Dati societari (S1–S4).** Visura: REA, capitale sociale versato, sede legale (coincide con la sede operativa?).
12. **Video (S8).** Il video contiene numeri, loghi istituzionali o claim? Potete inviarci il file?

## Decisioni richieste
- **All'utente:**
  - approvare le riserve di go-live per B1 (formula provvisoria e nodo `brand` Puglia Digitale sospeso), B2 («portale nazionale») e B3 (N2–N3 non pubblicati senza fonte), da applicare se il cliente non risponde entro il lancio;
  - approvare la DR2 (grafia «Siti Interattivi Immersivi»).
- **Al creative-director:**
  - «10.000+» al lancio: opzione A se il perimetro è confermato, altrimenti B (I2);
  - pubblicare o rinviare la sezione dei numeri con il solo «30+» (B3);
  - nota o ritaglio delle foto dell'evento (B4).
- **Alla sessione principale:**
  - staging protetto e non indicizzabile;
  - controllo dei link e visione del video da una rete che li raggiunge (I4, I8);
  - ADR sulla regola «staging e go-live» per i claim (S6).
- **Già presa (brand-strategist, owner del registro):** la regola sulla nota dei numeri descritta in B3.
