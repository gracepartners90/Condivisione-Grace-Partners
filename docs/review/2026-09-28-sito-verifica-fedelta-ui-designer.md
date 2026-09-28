---
titolo: Verifica di fedeltà UI dopo le correzioni (verso G4)
owner: ui-designer
contributi: []
stato: bozza
versione: 0.3
aggiornato: 2026-09-28
fonti: [docs/review/2026-09-28-sito-fedelta-ui-designer.md, docs/review/2026-09-28-sito-verifica-accessibilita-ux-designer.md, build del commit c025181 su http://localhost:4323 e http://localhost:4324 (ricontrollo), build del commit 007956d su http://localhost:4321 (reveal e campi del form), docs/creativa/direzione-visiva.md, docs/ui/design-system.md, docs/contenuti/copy-deck/home.md, src/styles/tokens.css, src/styles/global.css, src/components/, src/pages/, src/data/asset-slots.ts, staging http://localhost:4321 (build dei commit c67aa8e, e5cfc5b, 7c5f747), variante «in pubblicazione» http://localhost:4322 (PUBLIC_SLOT_MODE=publish), screenshot e misure Playwright (Chromium) del 2026-09-28]
---

# Verifica di fedeltà UI dopo le correzioni (verso G4)

**Oggetto.** Verifica delle osservazioni applicate dopo la mia review del 2026-09-28 (`docs/review/2026-09-28-sito-fedelta-ui-designer.md`, di seguito «review»). Pagine: `/`, `/siii/`, `/puglia-digitale/`, `/citta-digitali/`, `/contatti/`, `/privacy-policy/`, `/cookie-policy/`, `/404.html`. Poi la variante «in pubblicazione» dei segnaposto nelle 7 posizioni (8 istanze). Riferimenti: direzione visiva (DV) e design system (DS). Le scelte già accettate nella review non vengono riaperte.

**Come ho verificato.**
- **Pagine intere** a 320, 390, 768, 1024 e 1440 px, dopo lo scorrimento completo (reveal attivati), lette in fogli di confronto e in ritagli a risoluzione nativa (2× e 3× per tacche, «g» e ritratti).
- **Sonde DOM mirate** per ogni osservazione, a tutte le larghezze:
  - ogni nodo di testo confrontato con il viewport;
  - gradini di scala dei titoli in ordine di pagina;
  - colori calcolati di frecce, separatori, filetti, tacche e nodi;
  - posizione di nodi e città rispetto alle linee;
  - misura delle righe;
  - larghezza dell'invio.
- **Misure al pixel:**
  - inchiostro della «g» contro l'orizzonte, a 2×, con l'orizzonte nascosto nel passaggio d'inchiostro, a 1024, 1280, 1440, 1680 e 1920 px;
  - incroci tra richiami ed etichette degli orizzonti, a riposo e durante la rotazione (scroll 0, 150, 300 e 450 px).
- **Simulazioni in pagina** di ogni correzione proposta sotto, con CSS iniettato e le stesse misure prima e dopo: gli snippet di questa review sono già provati in Chromium.
- **Variante «in pubblicazione»:** HTML delle 5 pagine, sonda geometrica di ogni `.slot-pub` da 320 a 1440 px, ritagli a 2× a 390 e 1440, controllo delle porte a 320, 340, 360, 375, 390, 414, 600, 700 e 768 px.
- **Non verificati:** Safari e Firefox, tempi e curve delle animazioni, stati di hover, riproduzione del video (la sorgente è bloccata dall'ambiente, si vede lo stato di errore).

---

## In sintesi

- **Chiuse e conformi:** B1, I1, I6, I7, I12, I13, I14, S2, S3, S9, S11, S12, S13. Conformi anche le due correzioni extra: lo spazio in «Scrivi a info@itnode.it» e il contatore 01/05 dopo i salti di scorrimento.
- **Chiuse con un effetto collaterale da correggere:**
  - I2: la tacca entra nella prima cifra del rilevamento (V3);
  - I5: gli statement dei capitoli vanno a capo per il browser (V4).
- **Regressioni introdotte dalle correzioni:**
  - I9: il nodo «oggi» esce dall'orizzonte del tempo su desktop (V1);
  - I8: a 1024–1279 px Caltanissetta si sovrappone ad Altamura (V2).
- **In parte:**
  - I3: «g» e nodi a posto, file delle etichette ancora da sistemare (V5);
  - I10: skyline e «reti luminose» ancora leggibili (V6).
- **Aperte per decisione:** I4 (riga `lead` della hero) e I11 (ordine delle porte su mobile).
- **Variante «in pubblicazione»:** conforme a 390 e 1440 px nelle 8 istanze. Due correzioni prima di usarla:
  - sotto i 350 px le porte tagliano nome e coordinate (V7);
  - nella Home il nome del cliente va tolto (O6 di ux-designer, confermata).
- **Bloccanti di soglia nel dominio UI:** nessuno. B1 (reflow, WCAG 1.4.10) è chiusa.

---

## 1. Stato delle osservazioni della review

| # | Esito | Evidenza |
|---|---|---|
| **B1** | **Chiusa** | 0 px di scorrimento orizzontale e 0 righe di testo fuori viewport su tutte le 8 pagine a 320, 390, 768, 1024 e 1440 px (sonda su ogni nodo di testo, maschere del reveal comprese). `display-xl` a 320 px = 47,8 px; «Cominciamo» senza rientro a 320, rientro pieno da ~390 |
| **I1** | **Chiusa** | Frecce del marquee e «·» dei verbi in `--fg-2` (#A9AFB6 su notte). Filetti degli avvisi a 2 px `--fg`: calce sui form su notte, inchiostro su calce e nelle pagine legali |
| **I2** | Chiusa, **con V3** | Rilevamenti dei capitoli: tacca 1 × 20 px in `--fg`, raggio 0. «oggi»: punto Ø 10 più anello di 1 px (`outline`, scostamento 7 px), nessuna ombra. La tacca però entra nell'etichetta (V3) |
| **I3** | **In parte** | «g»: l'inchiostro più basso sta 2,2 · 0,7 · 1,7 · 1,2 · 2,2 px sopra la linea a 1024 · 1280 · 1440 · 1680 · 1920: tocca senza attraversare. Nodi Ø 10 senza anello, nessun contatto con le lettere a 390 e 1440. File delle etichette: aperta e più estesa di quanto avevo scritto (V5) |
| **I4** | Aperta | Riga `lead` non aggiunta: vedi Decisioni richieste, n. 3 |
| **I5** | Chiusa, **con V4** | Nome `display-m` a 400, statement `display-l`: la gerarchia è giusta. Ma in 6 colonne lo statement va a capo per il browser (V4) |
| **I6** | **Chiusa** | SIII: xxl → m → l → marquee xl (statement m) → m → cascata l → ponte s → l. Puglia Digitale: xl → l → numeri xxl → l → m → s → l. Lo statement di «Cosa si può fare» è in `m` e non in `s` come proponevo: lo accetto, perché il titolo della sezione è il marquee in `display-xl` |
| **I7** | **Chiusa** | Chiusura di Città Digitali in `l/l` a peso 600: la seconda riga non sale più |
| **I8** | **Regressione a 1024–1279 px** (V2) | Da 1280 px conforme: città alla quota del loro nodo, filetto costantemente 19–20 px sopra il nodo |
| **I9** | Mobile chiusa, **regressione su desktop** (V1) | Mobile: 64 px di filo in più prima di «oggi», nodo centrato sulla linea verticale (scarto 1 px). Desktop: colonna vuota corretta, ma il nodo cade 64 px sotto la linea |
| **I10** | **In parte** (V6) | Ritratto in Home 400 × 400 px da sorgente 400 e maschera 48% → 86% applicata. Lo skyline resta leggibile, in Contatti con le linee di rete |
| **I11** | Aperta | Non applicata per scelta di ux-designer: decide il creative-director, nessuna novità |
| **I12** | **Chiusa** | Scala sotto i 700 px con il numero sopra. Misura del testo: 36 → 32 caratteri per riga a 320 px (quarta voce), 46 → 42 a 390 |
| **I13** | **Chiusa** | Etichette del confronto a 12 px a 320 e 390, a 13 px da 1024 |
| **I14** | **Chiusa** | Copertina senza titolo, nodo di riproduzione (72 px, 56 su mobile), niente testo centrato. Nota sul secondo orizzonte in V10 |
| **S2, S3, S9, S11, S12, S13** | **Chiuse** | S2: «120°», «240°».<br>S3: nel menu solo il numero; i descrittori stanno su una riga anche a 320 px, compreso quello da 34 caratteri.<br>S9: invio a 280 e 350 px su form di 280 e 350.<br>S11: nessuna data fittizia.<br>S12: la coppia di coordinate non si spezza.<br>S13: filo in `--fg`, nodi e richiami in `--place` |
| Extra | **Conformi** | Lo spazio di «Scrivi a info@itnode.it» c'è da 320 a 1440 px. Il contatore 01/05 segue la regola dopo salti a fine pagina, di ritorno e in cima |
| S1, S4–S8, S10 | Non applicate | Suggerimenti, restano per dopo il lancio. S6 solo per l'avviso del form |

---

## 2. Osservazioni della verifica

### V1 [IMPORTANTE] Timeline: su desktop il nodo «oggi» esce dall'orizzonte del tempo (regressione di I9)

- **Dove.** `/`, `#fondatore`, da 1024 px. `src/components/sections/FounderTimeline.astro`: regola `.founder__stage--now { margin-top: var(--space-2xl); }` (riga 173), non annullata nel blocco `@media (min-width: 64em)`.
- **Problema.** Il margine di 64 px pensato per il filo verticale del mobile vale anche su desktop.
  - Il centro del nodo cade 65 px sotto la linea, a 1024 e a 1440 px.
  - Il nodo galleggia nel vuoto e il contenuto della tappa scende di 64 px rispetto alle altre tre.
- **Motivazione.**
  - DV §7.3, n. 6: «Solo "oggi" è un nodo» dell'orizzonte del tempo.
  - DV §1.1: i nodi stanno sulla linea.
  - DS §3.10.
  - È l'unico nodo della sezione ed è la chiusa del racconto.
- **Proposta** (provata: scarto dal centro della linea 1 px a 1024 e 1440).
  ```css
  /* FounderTimeline.astro, inside @media (min-width: 64em): «oggi» stands on the horizon of time like
     every other stage; the extra 64 px belong to the vertical line on phones only. */
  .founder__stage--now {
    grid-column: -2 / -1;
    margin-top: 0;
  }
  ```

### V2 [IMPORTANTE] Città Digitali, 1024–1279 px: Caltanissetta si sovrappone ad Altamura (regressione di I8)

- **Dove.** `/citta-digitali/`, `#portale`. `src/components/sections/LocationShowcase.astro`, blocco `@media (min-width: 64em)` della variante `italy` (righe 372–423).
- **Problema.** Le città sono posizionate in assoluto alla quota del nodo. Tra Altamura (59,2%) e Caltanissetta (90,8%) c'è il 31,6% dell'altezza della carta: a 1024 px sono 173 px, meno di un blocco città, che è alto circa 190 px.

  | Larghezza | Altamura → Caltanissetta | Aria sotto l'ultima riga (padding di sezione) |
  |---|---|---|
  | 1024 | **−19 px**: il filetto di Caltanissetta taglia «nell'entroterra barese.» | **−5 px**: l'ultima riga esce dalla sezione |
  | 1152 | 15 px | 22 px (125) |
  | 1280 · 1440 · 1920 | 34 · 56 · 71 px | 34 · 48 · 74 px (134 · 146 · 176) |

  A 1024 px, inoltre, «Caltanissetta» tocca «Esplora» (la parola è più larga della colonna del nome).
- **Motivazione.**
  - Leggibilità: un filetto attraversa il testo.
  - DS §1.3: la sezione deve conservare il suo `--section-pad`.
  - Il palco per latitudine (DV §7.6) vale dove la carta è abbastanza alta da reggerlo.
- **Proposta** (provata).
  - Da 1280 px (80em) resta il palco per latitudine, con 96 px riservati sotto la carta.
  - Tra 1024 e 1279 px le città tornano un elenco accanto alla carta.

  Esiti misurati:
  - a 1024 e 1152 px: 48 px tra i blocchi e aria piena (116 e 125 px);
  - da 1280 px: stessi stacchi di oggi e aria pari al padding di sezione (130, 144 e 170 px a 1280, 1440 e 1920).
  ```css
  /* LocationShowcase.astro — replaces the italy block at 64em */
  @media (min-width: 64em) {
    .places__italy { grid-template-rows: auto auto; row-gap: var(--space-2xl); }
    .places__copy { grid-column: 1 / span 7; grid-row: 1; }
    .places__map { grid-column: 7 / -1; grid-row: 2; max-width: none; }
    /* 1024–1279 px: the cities stay a list beside the map. */
    .places__cities { grid-column: 1 / span 5; grid-row: 2; }
  }

  /* From 1280 px the map is tall enough to set each city at its node's latitude: Altamura →
     Caltanissetta is 31.6% of the map (≥ 217 px), more than a city block (~175 px). */
  @media (min-width: 80em) {
    /* Caltanissetta hangs ~95 px below the map: keep the section's own bottom air. */
    .places__italy { padding-bottom: var(--space-3xl); }
    .places__cities { position: relative; align-self: stretch; display: block; padding: 0; }
    .city {
      position: absolute;
      inset-inline: 0;
      top: calc(var(--y, 0) * 1%);
      translate: 0 -1.2rem;
      grid-template-columns: minmax(0, 1fr) auto;
      column-gap: var(--space-m);
      align-items: baseline;
    }
    .city__name, .city__meta, .city__line { grid-column: 1; }
    .city__cta { grid-column: 2; grid-row: 1; }
  }
  ```

### V3 [IMPORTANTE] Capitoli: la tacca del rilevamento entra nella prima cifra

- **Dove.** `/`, apertura dei tre capitoli, a tutte le larghezze. `ProjectShowcase.astro`, `.chapter__bearing` (`top: 14px`) e `::before` (`top: -14px`, alta 20 px).
- **Problema.** La tacca da 20 px scende 6 px dentro l'etichetta e si attacca alla prima cifra: a 3× si legge «ǀ000°», «ǀ120°», «ǀ240°». È un effetto della correzione I2: prima lì c'era un punto.
- **Motivazione.** DV §1.1: le etichette stanno sotto le tacche. L'Orizzonte mette i gradi a 26 px sotto tacche da 20 px: stessa regola.
- **Proposta.**
  ```css
  /* ProjectShowcase.astro — the bearing label hangs 6 px under its 20 px tick, like the degree
     labels of the Horizon. */
  .chapter__bearing { top: 26px; }           /* was 14px */
  .chapter__bearing::before { top: -26px; }  /* was -14px: the tick still starts on the line */
  ```
  L'etichetta finisce a 43 px dalla linea, sotto il margine del filetto (76 px): nessun altro cambiamento.

### V4 [IMPORTANTE] Statement dei capitoli: a capo del browser in `display-l`

- **Dove.** `/`, `#tre-mondi`, statement in `ProjectShowcase.astro`, riga 45 (`size="l"`).
- **Problema.** In `display-l` le righe d'autore degli statement non stanno nelle colonne del testo e il browser le spezza:
  - capitolo 01: «Esperienze / digitali.» a 390, 1024 e 1280 px;
  - capitolo 02: «Migliaia di / storie.» a 390, 1024, 1280 e 1440 px;
  - capitolo 03: «online / senza / perdere / radici.» a 1024 px, cioè quattro righe da una parola e sei righe in tutto. A 1440 px sono cinque righe, con «perdere» e «radici.» sole.

  I Passaggi resi come `<p>` hanno `text-wrap: pretty`, non il `balance` dei titoli.
- **Motivazione.**
  - DV §1.5: gli a capo sono d'autore.
  - DS §1.2: `text-wrap: balance` sui titoli.
  - DV §3.2: `display-m` è «la seconda riga del Passaggio».
- **Proposta** (provata anche con il text reveal attivo). Passaggio canonico: partenza in `display-l` 600, arrivo in `display-m` 400, come il secondo registro della hero. In più, righe bilanciate in tutti i Passaggi.
  ```astro
  <!-- ProjectShowcase.astro -->
  <Passage as="p" registers={statement} size="l" secondSize="m" class="chapter__statement" />
  ```
  ```css
  /* Passage.astro — authored lines that still wrap are balanced whatever the tag (h2 passages
     already inherit it from the heading). */
  .line { text-wrap: balance; }
  ```
  Esiti misurati:
  - capitoli 01 e 02 su 2 righe a ogni larghezza da 390 a 1440 px;
  - capitolo 03 su 4 righe bilanciate, «Le attività / del territorio, ‖ online senza / perdere radici.», e su 2 righe a 768 px.

  Il `balance` cambia solo altri tre Passaggi, sempre in meglio: «Un tour 360° / è una visita.» a 390, e la partenza e l'arrivo di «Una nuova infrastruttura digitale…» a 1024 e 1440. Nessuna parola resta sola.
- **Decide.** Il creative-director, per il cambio di gradino dell'arrivo.

### V5 [IMPORTANTE] Orizzonti: il richiamo di un luogo attraversa l'etichetta di un altro (I3, punto 3)

- **Dove.**
  - Hero della Home, da 320 a 1440 px, a riposo e durante la rotazione: il richiamo di Caltanissetta attraversa «ALTAMURA · GRAVINA · CASSANO». A 1440 passa tra «ALTAMURA» e «·», e l'etichetta sembra legata al nodo di 213°.
  - Orizzonte di fine hero di Città Digitali (`.cd-horizon`), da 768 a 1280 px: il richiamo di Altamura attraversa «CALTANISSETTA — 213° · 448 KM».
  - File: `src/components/ui/Horizon.astro`, riga 84 (`row: gi % 2`).
- **Problema.** Le file si alternano a partire dalla prima. Così il luogo isolato tra due gruppi finisce nella fila bassa e il suo richiamo lungo taglia l'etichetta della fila alta.
- **Motivazione.**
  - DV §5: etichette su più file «per evitare sovrapposizioni».
  - DV §1.1: le etichette stanno sotto le tacche.
  - Veridicità del dato: un richiamo sull'etichetta sbagliata associa un luogo al rilevamento sbagliato.
- **Proposta** (provata). Le file partono dalla seconda. Esiti, sui due orizzonti a 320, 360, 390, 768, 1024, 1280, 1440 e 1920 px, a riposo e con la rotazione: zero incroci. La correzione vale sia per la hero sia per Città Digitali; la copertina del video non ha luoghi.
  ```ts
  // Horizon.astro — rows start from the lower one: the lone place between two groups rides the
  // upper row, so no leader crosses a label (verified 320–1920 px, hero and Città Digitali).
  // If the places change, re-run the crossing check.
  labels.push({ at: pos(b0), row: (gi + 1) % 2, full, compact, key: `${gi}${shift}`, anchor: anchorClasses(last + shift), end: pos(last + shift) });
  ```

### V6 [IMPORTANTE] Ritratti a inchiostro: skyline e «reti luminose» ancora leggibili (I10)

- **Dove.** `/`, `.founder__img` (400 × 400 px), e `/contatti/`, `.ct-person__portrait img` (315 × 420 px a 1440). Maschera attuale `#000 48% → transparent 86%`.
- **Problema.**
  - **Home:** i grattacieli con le finestre illuminate si leggono tra il 50% e il 75% della larghezza, nella metà bassa.
  - **Contatti:** tra il 55% e l'85% si vedono skyline e linee diagonali con piccoli nodi, cioè l'estetica «plexus».
  - Un taglio più stretto non basta: lo skyline sta dietro il braccio.
- **Motivazione.**
  - DV §4.3: la maschera serve ad «assorbire ciò che resta dello skyline».
  - Linee guida §33 e DV §1.3: niente reti di nodi collegati.
- **Proposta** (provata a 2× su entrambi i derivati: skyline e linee quasi scomparsi, figura integra, bordo del gomito appena ammorbidito).
  ```css
  /* FounderTimeline.astro */
  -webkit-mask-image: linear-gradient(to right, #000 40%, transparent 74%);
  mask-image: linear-gradient(to right, #000 40%, transparent 74%);
  /* contatti.astro (standing pose, narrower figure) */
  -webkit-mask-image: linear-gradient(to right, #000 36%, transparent 68%);
  mask-image: linear-gradient(to right, #000 36%, transparent 68%);
  ```
- **Decide.** Il creative-director: sono valori della DV.

### V7 [IMPORTANTE, solo se si pubblica con la variante] Porte «in pubblicazione» sotto i 350 px: nome e coordinate tagliati

- **Dove.** `/puglia-digitale/`, `#luoghi`, variante `place` di `src/components/ui/SlotPending.astro`. Porte larghe 102 px a 320, 110 a 340, 118 a 360.
- **Problema.**
  - **320 px:** «Acquaviva» supera di 15 px il margine interno e viene tagliato dal bordo («Acquaviv»). Le coordinate vanno su 3 righe ed escono dal fondo di 23–39 px, anche per Gravina e Monopoli.
  - **340 px:** l'ultima riga tocca il fondo.
  - **360 px:** restano 5 px.
  - **Da 375 px:** tutto conforme.
- **Motivazione.** DV §4.5: la variante deve essere «completa, senza richieste visibili». Un nome troncato sembra un errore. Nome e coordinate sono comunque nel testo accanto alla porta (H3 e `.door__coords`).
- **Proposta** (provata da 320 a 768 px: margine sul fondo di 14–46 px sotto i 390 px, nessun cambiamento da 390 px in su). Nelle porte strette si toglie ciò che il testo accanto già dice:
  ```css
  /* SlotPending.astro — narrow doors (phones under ~400 px): the coordinates, then the name, are
     already in the text beside the door. */
  @container (max-width: 8rem) {
    .slot-pub--place .slot-pub__meta > span + span { display: none; }
  }
  @container (max-width: 7rem) {
    .slot-pub--place .slot-pub__name { display: none; }
  }
  ```

### Suggerimenti (dopo il lancio)

| # | Dove | Problema e motivazione | Proposta |
|---|---|---|---|
| V8 | Variante «esperienza», 320 px (`asset-slots.ts`, `hotspots`) | L'anello dell'hotspot centrale (55, 44) arriva a 2 px dalla riga del luogo; il terzo (80, 53) a 3 px dall'orizzonte | `{ x: 55, y: 47 }` e `{ x: 80, y: 51 }` |
| V9 | Variante «esperienza», contenitori ≥ 700 px | L'orizzonte ha solo tacche e si legge come un righello; la mia proposta prevedeva i gradi ogni 45°, come nel Confronto (DV §1.1) | Etichette mono «000° N», «045°»… sotto le tacche lunghe, solo con `@container (min-width: 43.75rem)` |
| V10 | `/citta-digitali/`, copertina del video (`.video__cover-horizon`) | A 768–1024 px l'orizzonte della copertina e quello di fine hero stanno nella stessa schermata. DV §1.1: «più di un orizzonte per schermata» non si fa. L'orizzonte che «si apre nel video» è già quello di fine hero (DV §7.6) | Togliere l'orizzonte dalla copertina, che resta con il nodo di riproduzione (come su mobile) |
| V11 | Hero della Home, 320 px | «La / tecnologia / cambia.»: «La» resta solo, perché «La tecnologia» misura 282 px su 280 (DV §3.2 cita proprio questo caso) | `.hero-home__r1 { font-size: min(var(--fs-display-xl), 14.6vw); margin-bottom: 0.11em; }`: agisce solo sotto ~330 px; da 390 px nulla cambia |
| V12 | Menu mobile, `Header.astro`, riga 88 | «SCRIVI A INFO@ITNODE.IT»: l'email diventa maiuscola; nella banda della Home no (`t-as-is`) | `<span>Scrivi a <span class="t-as-is">{site.email}</span></span>` |
| V13 | Footer, 320 px | «P.IVA» a fine riga e il numero a capo | `white-space: nowrap` su «P.IVA 08937270729» |
| V14 | Hero della Home, 700–1023 px | A riposo si vedono etichette tagliate di nodi fuori campo («— 081° · 39 KM» a sinistra, «ALTAMURA · … 253–26» a destra). Con 150° centrati su 170° (DV §5) sono in vista solo Caltanissetta e i tagli | Campo di 200° anche su tablet (a 768 px: Monopoli a 42 px, Caltanissetta a 549, gruppo 703–749), da verificare insieme a V5. È un valore della DV: decide il creative-director |
| V15 | Città Digitali ≥ 1280 px | Il filetto di ogni città sta 19–20 px sopra il suo nodo | Facoltativo: filetto esattamente sulla latitudine (`translate: 0 -0.5px`, riserva `calc(var(--space-3xl) + 1.25rem)`): il nodo sta sul «parallelo» della città |
| V16 | Porte, 320 px (`.door__domain`) | «acquavivadigitale.c / om»: `overflow-wrap: anywhere` spezza dentro la parola | Punto di a capo prima del dominio di primo livello (`<wbr>` prima di «.com», «.it») |
| V17 | Confronto SIII, 320 px | Il chip «PRENOTAZIONE» tocca l'anello di «Informazioni» | Hotspot «Prenotazione» da x 83 a x 85, o chip sotto l'anello alternati |

Restano validi, per dopo il lancio, i suggerimenti non applicati della review: S1, S4, S5, S6 (pagine legali e lead), S7, S8 e S10.

### Conferme di composizione per la verifica di ux-designer

La verifica di accessibilità in parallelo (`docs/review/2026-09-28-sito-verifica-accessibilita-ux-designer.md`) chiede il parere UI su due punti. Li ho confrontati con le mie misure.
- **O4 · titolo di chiusura di `/siii/` da 1024 px: confermo la composizione proposta.**
  - «un'esperienza.» in `display-l` non sta in 5 colonne né a 1024 px (444 px su 382) né a 1440 (568 su 543).
  - Con la sesta colonna ci sta: 464 px a 1024, 657 a 1440.
  - Il titolo resta un blocco separato dal form, con almeno un gutter di stacco. Eyebrow e testo restano sulle colonne 1–5: la colonna 6 la usa solo il titolo.
  - La mia sonda degli a capo contava le parole, non le spezzature a metà parola, quindi non l'aveva visto.
- **O6 · variante «in pubblicazione» nella Home: confermo la variante senza nome e luogo** (solo orizzonte e hotspot, come nella hero di `/siii/`).
  - Il capitolo 01 parla del SIII in generale: il nome di un cliente sullo schermo aggiunge un'informazione che il testo non dà.
  - Senza testo lo schermo resta «spazio esplorabile astratto» (DV §4.5).
  - Su `/siii/` il nome resta, perché lì c'è l'H3 accanto.
  - Proposta: uno slot dedicato, per esempio `siii-capitolo` con `publish: { kind: 'experience', nodes: hotspots }` e la stessa richiesta d'asset di `siii-masseria-santella`. Oppure una prop di `Media` che sostituisce `publish`.
- **S3 di ux-designer:** coincide con V7, che ux-designer ha confermato per l'accessibilità.

---

## 3. Variante «in pubblicazione»: verifica visiva

**Controlli generali** (build `dist-publish`).
- **Richieste di servizio:** nessun «ASSET RICHIESTO» nell'HTML delle 5 pagine; nessun `data-asset-slot`.
- **Istanze:** 8 `data-asset-pending`, per 7 slot.
- **Superficie e ingresso:**
  - i nodi di pagina sovrapposti (`.worlds__hot`, `.siii-hero__node`) sono nascosti;
  - l'apertura si apre su tutte le istanze;
  - i rapporti sono esatti: 16:10, 4:5 → 3:5 nella hero di SIII, 3:5 nelle porte.
- **Contrasti:**
  - nome calce su notte-2: 14,5:1;
  - luogo testo-notte-2 su notte-2: 7,4:1;
  - nome inchiostro su pietra: 13,9:1;
  - metadati inchiostro-2 su pietra: 5,9:1;
  - nodo-luogo terra su pietra: 4,1:1, come grafica;
  - hotspot blu-node-chiaro su notte-2: 7,5:1.

| Posizione | Slot | 390 px | 1440 px | Note |
|---|---|---|---|---|
| Home, capitolo 01 | `siii-masseria-santella` | Conforme nella resa: nome `display-s` 600 e luogo in alto a sinistra, 3 hotspot all'altezza degli occhi, orizzonte al 62% | Conforme, 884 × 552 | Qui nome e luogo non sono nel testo accanto: variante senza testo (O6 di ux-designer, confermata sopra). V9 |
| SIII, hero | `siii-anteprima` | Conforme, 4:5; 3 hotspot a (30, 28), (70, 40), (44, 52) | Conforme, 3:5 (416 × 693) | Nessun testo: corretto, il nome è l'H1 accanto |
| SIII, esempio 1 | `siii-masseria-santella` | Conforme | Conforme, 1339 × 837 (12 colonne) | V9: su 12 colonne l'orizzonte senza gradi è il più debole |
| SIII, esempio 2 | `siii-maison-mimina` | Conforme | Conforme | — |
| SIII, esempio 3 | `siii-dielle` | Conforme | Conforme | A 320 px «Acquaviva delle Fonti (BA)» sfiora l'hotspot centrale (V8) |
| Puglia Digitale, porta ovest | `luogo-gravina` | Conforme: nome su 2 righe, nodo al 78% sul filo, «257° · 36 KM», coordinate su 2 righe spezzate a « · » | Conforme: nome 38 px (11cqi) su una riga | V7 sotto i 350 px |
| Puglia Digitale, porta centro | `luogo-acquaviva` | Conforme: «SEDE» al posto di rilevamento e distanza | Conforme | V7: il nome è tagliato a 320 px |
| Puglia Digitale, porta est | `luogo-monopoli` | Conforme | Conforme | V7 |

**Giudizio.** La variante regge da sola, come chiede la DV §4.5.
- Le porte leggono come luoghi: nome in piedi sull'orizzonte, nodo-luogo sul filo, dati sotto.
- Le esperienze leggono come «spazio esplorabile astratto»: nessuna finta schermata, nessun segno di servizio.
- Le tacche corte ogni 4cqi e lunghe ogni 12cqi funzionano su tutte le misure.
- Per il go-live con la variante servono V7 e, nella Home, la variante senza nome e luogo (O6 di ux-designer). V8 e V9 migliorano, ma possono aspettare.

---

## 4. Prima del G4 e dopo il lancio

**Necessario prima del G4** (regressioni e difetti visibili a larghezze standard):
- **V1:** «oggi» sull'orizzonte del tempo (1 riga CSS).
- **V2:** Città Digitali a 1024–1279 px (riorganizzazione di un blocco CSS).
- **O4 (ux-designer):** titolo di chiusura di `/siii/` sulle colonne 1–6, da 1024 px la parola si spezza o esce dalla colonna. Composizione confermata sopra.
- **V7 e O6 (ux-designer):** solo se si va online con la variante «in pubblicazione» (2 regole CSS; uno slot senza testo per la Home).

**Consigliato prima del G4, a costo minimo** (snippet già provati), oppure da accettare esplicitamente dal creative-director:
- **V3:** tacca ed etichetta dei capitoli.
- **V4:** statement dei capitoli.
- **V5:** file delle etichette.
- **V6:** valori della maschera dei ritratti.

**Dopo il lancio:**
- da questa verifica: V8–V17;
- dalla review: S1, S4–S8, S10;
- in attesa di decisione: I4, I11.

---

## Verdetto di dominio (UI) per il G4

**Fedele. Approvabile per il G4 dopo la correzione di V1, V2 e O4 di ux-designer; se si pubblica con la variante, anche di V7 e O6.**
- Le correzioni della review sono state applicate con cura e, dove le ho misurate, rispettano i valori proposti:
  - reflow a 320 px pulito su tutte le pagine;
  - «g» sull'orizzonte;
  - disciplina dei colori-segno;
  - ritmo dei titoli;
  - scala su mobile;
  - variante «in pubblicazione» completa.
- V1 e V2 sono regressioni visibili su larghezze standard (desktop e 1024 px). O4 è un titolo spezzato a metà parola da 1024 px. Le correzioni sono di poche righe e già provate.
- V3–V6 sono piccole e già provate: le raccomando prima del lancio. Se il tempo manca, il creative-director può accettarle esplicitamente e rimandarle.
- Nessuna soglia non negoziabile è violata nel dominio UI.

Il verdetto di gate spetta al creative-director.

## Ipotesi da validare

- **Browser.** Tutte le misure sono di Chromium. `text-wrap: balance` (V4) è supportato anche in Safari (17.5) e Firefox (121) secondo le mie conoscenze `[DA VERIFICARE]`. Dove manca, gli a capo restano quelli di oggi: è un miglioramento progressivo. La DV chiede comunque di riverificare la tipografia su Safari iOS.
- **Righe delle etichette (V5).** La regola «le file partono dalla seconda» è verificata sui luoghi attuali (hero e Città Digitali). Se cambiano i luoghi o i campi visivi, va ripetuta la misura degli incroci (script in scratchpad, riproducibile).
- **Soglia di 1280 px (V2).** Si basa sulla lunghezza attuale delle righe delle città: se il copy si allunga, rimisurare la distanza tra Altamura e Caltanissetta.
- **Maschere (V6).** Provate sui derivati attuali e su schermi 2×: se arriva il ritratto reale (DV §4.6, priorità 4), la maschera torna alla sola fusione con la carta.

## Domande aperte

- **creative-director:**
  - arrivo in `display-m` negli statement dei capitoli (V4);
  - valori delle maschere (V6);
  - orizzonte nella copertina del video (V10);
  - campo di 200° su tablet (V14);
  - le decisioni aperte I4 e I11.
- **copywriter-brand e cro-specialist:** per I4 il copy deck (`home.md`, §1) mette il posizionamento nel kicker, mentre la DV §5 lo vuole in una riga `lead` sotto l'H1. Il testo esiste già in entrambi i documenti: serve scegliere dove sta.
- **ux-designer:**
  - V2 lascia l'ordine del DOM e del focus invariato (nord → sud): confermare che l'elenco accanto alla carta a 1024–1279 px va bene;
  - V7 nasconde solo elementi `aria-hidden`: nessun effetto sulle tecnologie assistive.
- **Fuori dal mio dominio, lo segnalo:**
  - la Privacy Policy mostra ancora l'avviso «Testo in preparazione…», da sostituire prima del lancio (soglia 5);
  - footer e Contatti mostrano ragione sociale, P.IVA e sede operativa, ma mancano sede legale, REA e capitale sociale (soglia 5, come nella review).

## Decisioni richieste

1. **Correggere V1, V2 e O4 prima del G4** (sessione principale, snippet in §2 e nella verifica di ux-designer). Sono difetti, non scelte.
2. **V3–V6: applicare prima del G4 o accettare e rimandare** (creative-director). Raccomando di applicarle: costano poche righe e sono provate.
3. **I4, riga di posizionamento della hero:**
   - (a) come DV §5: kicker corto (per esempio «ITnode — oltre i confini del Web tradizionale», alternativa del copy deck) e riga `lead` «Esperienze digitali immersive per imprese e territori.» sotto l'H1;
   - (b) come il copy deck: resta il kicker attuale e si aggiorna la DV §5.

   Io raccomando (a) per il test dei 5 secondi. Decide il creative-director con copywriter-brand e cro-specialist.
4. **V7 e O6, se il go-live usa `PUBLIC_SLOT_MODE=publish`:**
   - applicare le due regole di contenitore (senza, a 320–345 px il nome di Acquaviva e le coordinate restano tagliati);
   - usare nella Home una variante senza nome e luogo.

---

## Ricontrollo dopo c025181

**Dove e come.** Build aggiornata del commit c025181 su http://localhost:4323 (staging) e http://localhost:4324 (variante «in pubblicazione»). Ho confrontato il diff con gli snippet di §2: V1, V2, V3, V5, V7, V8, V12, V16 e O6 corrispondono. V13 usa spazi non separabili (`nb()`) invece di `nowrap`: effetto equivalente. Poi ho rimisurato con le stesse sonde della verifica e guardato i ritagli, a 3× per le tacche.

| # | Esito | Misura sulla build nuova |
|---|---|---|
| **V1** | **Chiusa** | Centro del nodo «oggi» a 1 px dalla linea, a 1024 e 1440 px. Le quattro tappe partono alla stessa quota (33 px sotto la linea) |
| **V2** | **Chiusa** | 1024 e 1152 px: elenco accanto alla carta, stacchi 48/48 px, aria sotto l'ultima riga 116 e 125 px, pari al padding di sezione.<br>1280 e 1440 px: palco per latitudine, stacchi 165/34 e 201/56 px, aria 130 e 144 px (padding 134 e 146), filetto 19 px sopra il nodo.<br>Nessun contatto tra nome ed «Esplora» |
| **V5** | **Chiusa** | Zero incroci richiamo/etichetta sui due orizzonti (hero e Città Digitali) a 320, 390, 768, 1024, 1280, 1440 e 1920 px, a riposo e con lo scorrimento (0, 150, 300, 450 px) |
| **V3** | **Chiusa** | Tacca da 1 a 21 px sotto la linea, etichetta da 28 a 43 px: 7 px di stacco su «000° · N», «120°» e «240°» |
| **V7** | **Chiusa** | 320–340 px: filo, nodo e rilevamento, margine sul fondo 14–36 px.<br>360–375 px: nome e rilevamento, margine 42–46 px.<br>Da 390 px: invariato, margine 14 px.<br>Nessun testo tagliato |
| **O6** | **Chiusa** | Capitolo 01 della Home, variante «in pubblicazione»: nessun testo, 3 hotspot, nodi di pagina nascosti, a 390 e 1440 px |
| **O4** | **Chiusa** | Titolo di chiusura di `/siii/`: 3 righe, nessuna parola spezzata, con e senza movimento; 37 px dal form a 1024 px, 119 a 1440 |
| V16 | Chiusa | «acquavivadigitale / .com»: va a capo prima del dominio di primo livello |
| Non regressione | Superata | 34 combinazioni pagina × larghezza (8 pagine, 320–1440 px): nessuno scorrimento orizzontale, nessuna riga di testo fuori viewport, nessun errore JavaScript |

**Verdetto di dominio (UI) aggiornato per il G4: approvabile.**
- Le condizioni del verdetto precedente sono soddisfatte:
  - V1, V2 e O4 sono chiuse;
  - V7 e O6 lo sono anche per un go-live con la variante «in pubblicazione».
- In più sono chiusi V3 e V5, due dei quattro punti consigliati.
- **Restano al creative-director, da accettare o rimandare** (nessuno è un difetto di soglia):
  - V4: arrivo in `display-m` e `balance` negli statement dei capitoli;
  - V6: maschera dei ritratti;
  - i suggerimenti V9, V10, V14, V15, V17 e S1;
  - le decisioni I4 e I11.

  Tra questi raccomando ancora V4 e V6 prima del lancio: gli statement del capitolo 03 vanno a capo per il browser (fino a 6 righe a 1024 px), e lo skyline resta leggibile nei ritratti.
- Il verdetto di gate spetta al creative-director.

---

## Reveal senza CLS e campi del form

### Reveal a righe dopo 007956d: conforme

- **Dove.** Build su http://localhost:4321 con il commit 007956d, movimento attivo, a 390 e 1440 px. 27 Passaggi con reveal a righe:
  - Home: Chi siamo, Infrastruttura, tre capitoli, fondatore, chiusura;
  - SIII: definizione, confronto, cosa si può fare, esempi, chiusura;
  - Puglia Digitale: progetto, chiusura;
  - Città Digitali: chiusura.
- **Come.**
  - Ho rinviato di 60 s il timer che aggiunge `.is-revealed`, per congelare lo stato «salita finita, maschera ancora attiva». Poi ho confrontato al pixel quello stato con lo stato rivelato.
  - Stessa prova con la nuova regola annullata.
  - Fotogrammi della salita ogni ~110 ms a 1440 px (titolo del fondatore, cascata degli esempi di SIII).
- **Esito con la correzione.** In tutti i 27 casi: 0 pixel diversi, stessa altezza, righe ferme. Togliere la maschera non sposta nulla e alla fine della salita nessun glifo è tagliato.
- **Esito senza la correzione.** In ogni Passaggio a due registri il secondo registro scattava in su di 0,12 em al togliere della maschera:
  - 4,8 px a 390 e 10,3 px a 1440;
  - 13,8 px nella chiusura della Home;
  - 10,3 e 20,6 px nella cascata «Entra. / Esplora. / Interagisci.».
- **Effetto visivo.** Le righe salgono già alla spaziatura finale: è quello che descrive la DV §6 (ogni riga d'autore sale dalla propria maschera), e sparisce lo scatto finale. È un miglioramento: nessuna azione.

### Campi del form a due colonne (nota di ux-designer)

- **[IMPORTANTE] Dove.** `/puglia-digitale/` e `/citta-digitali/`, form di chiusura (`contact--wide`), da 1024 px. `ContactForm.astro`.
- **Problema.** I campi di una riga si allungano fino all'altezza del vicino che ha un suggerimento:
  - «Nome» e «Azienda» sono alti 68 px a 1440 (77 e 66 a 1024) contro 52;
  - dopo un invio vuoto «Nome» scende a 63.
- **Motivazione.** DS §3.15: i campi sono rettangoli di altezza uniforme. Un riquadro più alto sembra un'area di testo e rompe la griglia del form.
- **Le opzioni, misurate** a 1024 e 1440 px, a riposo, dopo un invio vuoto e con un solo errore nella riga (nome valido, email non valida):

  | Opzione | Riquadri | Etichette | Con un solo errore | Costo |
  |---|---|---|---|---|
  | oggi (`stretch`) | altezze diverse (52 contro 68–77 px), cime sfalsate di 15–35 px | allineate | sfalsati | — |
  | `align-content: start` (proposta ux-designer) | 52 px, cime sfalsate di 30–53 px in ogni riga | allineate | sfalsati | 1 riga |
  | **`align-content: end`** | **52 px, allineati** | ognuna a 8 px dal suo campo, sfalsate di 30–53 px | sfalsati di 30–53 px (l'altezza del messaggio), finché l'errore resta | 1 riga |
  | subgrid a 4 tracce (etichetta, suggerimento, campo, messaggio) | 52 px, allineati | a 8 px dal campo | **allineati** | ~22 px d'aria in più sotto ogni coppia a riposo: tra le righe dei campi ~54 px contro i 32 del resto del form |

  Scartata anche una subgrid con la traccia del messaggio solo in errore: con un solo errore rompe il posizionamento automatico e sfalsa di 71 px la riga successiva.
- **Preferenza UI: `align-content: end`.**
  - Nello stato che vedono tutti, a riposo, e dopo un invio vuoto (nome ed email sono obbligatori, i messaggi arrivano insieme) i riquadri formano una griglia pulita e alta uguale.
  - Ogni etichetta resta accanto al suo campo, e il ritmo del form (32 px tra le righe) non cambia.
  - Lo scostamento con un solo errore è transitorio e pari al messaggio: lo accetto.

  ```css
  /* ContactForm.astro, inside @media (min-width: 64em): the half fields of a row end on the same
     line — boxes aligned and equally tall, each label next to its field, the neighbour's hint
     between its label and its field. */
  .contact--wide .contact__field--half { align-content: end; }
  ```
- **Alternativa**, se ux-designer o il creative-director vogliono l'allineamento anche con un solo errore: subgrid a 4 tracce (provata), accettando più aria a riposo.
  ```css
  @supports (grid-template-rows: subgrid) {
    @media (min-width: 64em) {
      .contact--wide .contact__field--half { grid-row: span 4; grid-template-rows: subgrid; row-gap: var(--space-2xs); }
      .contact--wide .contact__field--half > .contact__label { grid-row: 1; }
      .contact--wide .contact__field--half > .contact__help { grid-row: 2; }
      .contact--wide .contact__field--half:not(:has(> .contact__help)) > .contact__label { grid-row: 2; align-self: end; }
      .contact--wide .contact__field--half > :is(input, textarea) { grid-row: 3; }
      .contact--wide .contact__field--half > .contact__error { grid-row: 4; }
    }
  }
  ```
- **Quando.** Consigliata prima del G4 perché costa una riga, ma non è bloccante.

**Verdetto UI.** Invariato: approvabile per il G4. Il reveal è approvato; per i campi del form raccomando `align-content: end`.
