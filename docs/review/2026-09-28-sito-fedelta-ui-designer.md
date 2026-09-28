---
titolo: Review di fedeltà visiva del sito costruito
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/creativa/direzione-visiva.md, docs/ui/design-system.md, docs/brief/linee-guida.md (§33), src/styles/tokens.css, src/styles/global.css, src/components/, src/pages/, anteprima http://localhost:4321/ del 2026-09-28, screenshot e misure DOM con Playwright (Chromium)]
---

# Review di fedeltà visiva del sito costruito

**Oggetto.** Le otto pagine dell'anteprima (`/`, `/siii/`, `/puglia-digitale/`, `/citta-digitali/`, `/contatti/`, `/privacy-policy/`, `/cookie-policy/`, `/404.html`) confrontate con la direzione visiva (di seguito «DV») e con il design system (di seguito «DS»). Le scelte della sessione principale elencate nell'incarico (carta della Puglia nel capitolo 02, confronto SIII con Orizzonte e Nodi, costa con otturatore, porte per longitudine e latitudine, ordine di Città Digitali, ritratto DR3-b, 404°, segnaposto §4.5 «in lavorazione») non vengono riaperte: se ne segnalano solo i rischi concreti.

**Come ho verificato.**
- Screenshot a pagina intera a 390, 768, 1024 e 1440 px dopo lo scorrimento completo (reveal attivati), letti in fogli di confronto. Ritagli a risoluzione nativa per hero, capitoli, timeline, carte e chiusure.
- Una sonda DOM su tutte le pagine a 320, 390, 768, 1024 e 1440 px:
  - ogni testo visibile ricondotto al gradino di scala del token;
  - famiglie, pesi e corsivi;
  - contrasto testo/fondo;
  - accenti fuori posto (arancio su chiaro, sfondi e titoli blu);
  - raggi, ombre, gradienti e filtri;
  - scorrimento orizzontale;
  - misura delle righe;
  - bersagli sotto i 24 px.
- Un giro di tastiera completo a 1440 px (e a 390 in Home) per il focus visibile e coperto.
- Contenuto nascosto con `prefers-reduced-motion` e senza JavaScript, a 390 px.
- Stati: menu mobile aperto, header in cima e dopo lo scroll, form inviato vuoto (calce a 390, notte a 1440), focus su nodo, CTA, campo su notte e controlli video.
- **Non verificati:** tempi e curve delle animazioni, stati di hover, Safari e Firefox, nitidezza su schermi 2×, riproduzione del video. La sorgente è esterna ed è bloccata dall'ambiente (`ERR_TUNNEL_CONNECTION_FAILED`), quindi ho visto lo stato di errore.

---

## Cosa è fedele (verificato)

- **Impianto.** Le superfici seguono la mappa del ritmo (§7.3–7.7) su tutte le pagine, compresa la temperatura dominante: equilibrio in Home, notte in SIII e Città Digitali, calce e terra in Puglia Digitale, calce in Contatti. Il padding delle sezioni usa `--section-pad` (72 → 146 px) e `--section-pad-tight` sui ponti, senza valori sparsi.
- **Tipografia.**
  - Solo Schibsted Grotesk e Fragment Mono, anche nei campi dei form.
  - Solo pesi 400 e 600, nessun corsivo (anche `<address>` è corretto).
  - `text-wrap: balance` sui titoli, nessuna sillabazione automatica, un solo H1 per pagina.
  - Tracking e interlinee dei gradini display corrispondono ai token.
- **Colore.**
  - Nessun testo sotto soglia di contrasto nella sonda automatica (esclusi i testi sopra le foto, controllati a vista).
  - Nessun arancio su fondo chiaro: `--place` si risolve in terra.
  - Nessun pulsante, sfondo o titolo blu.
  - `color-scheme: dark` attivo sui form su notte.
- **Forme ed effetti.** Nessun raggio fuori sistema: rettangoli per soglie e campi, pillole e cerchi per l'interazione. Nessuna ombra sfumata, nessun `filter` o `backdrop-filter`, nessun gradiente decorativo.
- **Lista §33 delle linee guida.** Nessuna violazione, salvo un testo centrato (I14) e il rischio «layout identici» sul ritmo dei titoli di SIII (I6):
  - niente gradienti tech, neon, illustrazioni SaaS, circuiti o plexus;
  - niente stock, dashboard finte, glassmorphism;
  - niente griglie di card o icone decorative.
- **Robustezza.**
  - Nessuno scorrimento orizzontale a 390, 768, 1024 e 1440 px, su nessuna pagina.
  - Tutti i bersagli di almeno 24 px; CTA da 44 a 64 px.
  - Contenuto interamente visibile con movimento ridotto e senza JavaScript.
  - Focus visibile su ogni fermata del giro di tastiera:
    - doppio anello su foto e video;
    - anello sulle pillole del confronto e dei «Mi interessa» via `:has(:focus-visible)`;
    - skip link sopra l'header (`z-index` corretto).
- **Componenti.**
  - Header e menu mobile rispettano struttura e misure; voce corrente con il punto del Nodo; header di SIII su notte.
  - Il footer ha la firma in coordinate.
  - Segnaposto conformi a §4.5: segni di taglio, etichetta mono, descrizione, formato.
  - Coordinate ovunque a 4 decimali in mono.
  - Foto evento intatta e a 1200 px CSS al massimo.

**Scostamenti che accetto** (aggiorno io il DS, nessuna azione sul codice):
- «Mi interessa» come pillole selezionabili invece delle caselle in riga: coerenti con la regola «il cerchio è l'interazione».
- «Audio» e «Schermo intero» come pillole testuali invece di icone in cerchi da 44 px: più chiare.
- Anello scuro di 1 px (ombra a raggio pieno, senza sfocatura) sui nodi del Documento: è un tratto, non un'ombra.
- Tacche disegnate con `repeating-linear-gradient` a stop netti: nessuna sfumatura visibile.

---

## Osservazioni

### B1 [BLOCCANTE] Scorrimento orizzontale di 42 px a 320 px in Home

- **Dove.** `/`, 320 px, `section#chiusura` (Passaggio «Il Web si può abitare. / Cominciamo dal tuo spazio.»). File: `src/styles/tokens.css` (`--fs-display-xl`), `src/components/ui/Passage.astro` (righe 128–150).
- **Problema.** Il secondo registro è in `display-xl` al minimo di 52 px. «Cominciamo» misura circa 293 px e con il rientro mobile (`min(1.2em, 3rem)` = 48 px) arriva a circa 341 px, su 280 utili. La pagina scorre di 42 px in orizzontale. È l'unico caso su tutto il sito: la mia tabella di reflow nel DS non conteneva questa parola, arrivata dopo con il copy.
- **Motivazione.** WCAG 2.2 1.4.10 (Reflow, AA): soglia 2, non negoziabile.
- **Proposta A (raccomandata, sistemica).** Abbassare il minimo del token e rendere fluido il rientro sotto i 390 px. A 390 px e oltre non cambia nulla: `1.79rem + 6vw` vale già 52 px a 390. Esiti:
  - a 320 px: 47,8 px, rientro 0, «Cominciamo» 270 px su 280 utili;
  - a 360 px: 283 + 28 px su 320 utili.

  ```css
  /* tokens.css — 2.75 rem minimum: the longest display-xl word fits 280 px at 320; 52 px from 390 up, unchanged. */
  --fs-display-xl: clamp(2.75rem, 1.79rem + 6vw, 9.375rem);
  ```
  ```css
  /* Passage.astro — second-register offset shrinks to 0 at 320 px, full 1.2em (max 3 rem) from ~390 px. */
  .passage--indent-default .passage__reg + .passage__reg {
    padding-left: clamp(0px, (100vw - 20rem) * 0.7, min(1.2em, 3rem));
  }
  /* same rule for the cascade variant */
  padding-left: calc(var(--reg) * clamp(0px, (100vw - 20rem) * 0.7, min(1.2em, 3rem)));
  ```
- **Proposta B (locale).** Nella chiusura della Home, secondo registro un gradino sotto (`secondSize="l"`, ammesso dal Passaggio): 225 + 48 = 273 px a 320. Cambia però anche il desktop.
- **Decide.** Il creative-director, perché A cambia un valore della DV. Chiede la conferma a11y a ux-designer. Dopo la correzione, riverificare a 320 px con zoom al 200%.

### I1 [IMPORTANTE] Arancio e terra usati fuori dai luoghi

- **Dove.**
  - `/`, marquee della sezione Infrastruttura: frecce in arancio. `src/components/sections/Marquee.astro`, righe 75–86.
  - `/siii/`, marquee dei verbi: separatori a punto arancio. Stesso file.
  - Avviso «Il modulo online non è ancora attivo…» nei form: filetto sinistro `--place`. `ContactForm.astro`, riga 322.
  - Avviso delle pagine legali. `LegalPage.astro`, riga 59.
- **Problema.** `--place` colora frecce, punti di elenco e filetti di avviso.
- **Motivazione.** DV §2: arancio e terra «segnano esclusivamente luoghi e simboli numerici». Se segnano anche altro, perdono significato. Il punto tra i verbi è inoltre un nodo usato come puntino d'elenco (DV §1.3, «Non si fa»).
- **Proposta.**
  ```css
  /* Marquee.astro */
  .marquee__item :global(.marquee__arrow) { color: var(--fg-2); }
  ```
  ```astro
  <!-- Marquee.astro: the verb separator is a glyph, not a node («·» is in both fonts) -->
  <span class="marquee__sep" aria-hidden="true">·</span>
  <style>.marquee__sep { color: var(--fg-2); }</style>
  ```
  ```css
  /* ContactForm.astro .contact__notice · LegalPage.astro notice */
  border-left: 2px solid var(--fg);
  ```

### I2 [IMPORTANTE] Nodi blu decorativi e alone del nodo «oggi»

- **Dove.**
  - `/`, apertura dei tre capitoli: punto blu all'inizio del filetto graduato, a 000°, 120° e 240°. `ProjectShowcase.astro`, `.chapter__bearing::before` (circa righe 81–90).
  - `/`, timeline del fondatore, tappa «oggi»: `FounderTimeline.astro`, righe 158–165, `box-shadow: 0 0 0 7px color-mix(in srgb, var(--node) 16%, transparent)`.
- **Problema.**
  - Il punto dei capitoli è un nodo blu non interattivo.
  - L'alone di «oggi» è un disco blu traslucido di 7 px, non l'anello da 1 px del Nodo.
- **Motivazione.** DV §1.3: blu = interazione; «Non si fa: nodi decorativi». Anatomia del Nodo: punto Ø 10 e anello da 1 px Ø 26. §2: niente bagliori.
- **Proposta.**
  ```css
  /* ProjectShowcase.astro — the chapter bearing is a 45° tick (20 px), not a node */
  .chapter__bearing::before { width: 1px; height: 20px; border-radius: 0; background: var(--fg); }
  ```
  ```css
  /* FounderTimeline.astro — node anatomy: dot Ø10 + 1 px ring Ø26 */
  .founder__stage--now .founder__tick { box-shadow: none; outline: 1px solid var(--node); outline-offset: 7px; }
  ```

### I3 [IMPORTANTE] Hero della Home: la «g» attraversa l'orizzonte, i nodi toccano le lettere, a 390 px un richiamo taglia un'etichetta

- **Dove.** `/`, hero, a 1440 e a 390 px. File: `src/components/sections/Hero.astro`, riga 143, e `ui/Horizon.astro`.
- **Problema.**
  1. **La «g».** A 1440 px la «g» di «tecnologia» scende sotto la linea di circa 0,13 em, circa 15 px. È una stima dallo screenshot, coerente con le metriche: interlinea 0,92 e `margin-bottom: -0.035em`. Il commento nel codice dice il contrario.
  2. **Nodi e lettere.** Gli anelli dei nodi-luogo (Ø 26) stanno sulla linea e toccano il piede delle lettere:
     - a 1440 px, Monopoli sotto la «L»;
     - a 390 px, Caltanissetta sotto la «c» di «cambia.» e il gruppo murgiano sul punto finale.
  3. **Richiamo ed etichetta.** A 390 px il richiamo di Caltanissetta (fila 2) attraversa l'etichetta «253–265°» del gruppo (fila 1).
- **Motivazione.** DV §5: la «g» tocca l'orizzonte senza attraversarlo; sopra la linea c'è solo il titolo. DV §1.1: etichette leggibili, al massimo 2 su mobile, senza sovrapposizioni.
- **Proposta.**
  ```css
  /* Hero.astro — baseline raised by the descender depth: the «g» touches the horizon, never crosses it.
     Start value; tune with an overlay until the lowest ink of «g» sits on the line (±1 px). */
  margin-bottom: calc(var(--fs-display-xl) * 0.105); /* was * -0.035 */
  ```
  - **Nodi.** Nella hero i nodi-luogo diventano solo punto Ø 10, senza anello: sono `aria-hidden` e non hanno hover. Con la linea di base rialzata, il punto non tocca più le lettere; l'anello resta negli altri contesti.
  - **Etichette.** Nuova regola di impaginazione: se il box di un'etichetta in fila 1 copre l'ascissa del richiamo di un'etichetta in fila 2, si scambiano le file. A 390 px: Caltanissetta in fila 1, il gruppo murgiano in fila 2.

### I4 [IMPORTANTE] Hero della Home: manca la riga di posizionamento in `lead`

- **Dove.** `/`, hero. `src/pages/index.astro`, riga 32 (`eyebrow="ITnode — esperienze digitali immersive per imprese e territori"`), e `Hero.astro`, riga 47, che non ha un campo `lead`.
- **Problema.** La frase che dice che cosa fa ITnode sta nell'occhiello mono da 12–13 px, sopra l'H1. Sotto il secondo registro manca la riga in `lead` (20–23 px, colonne 5–11).
- **Motivazione.** DV §5: «È la riga che fa superare il test dei 5 secondi: l'H1 da solo non dice che cosa fa ITnode». Nel corpo più piccolo della pagina non regge quel ruolo.
- **Proposta.** Prop `lead` nella variante `home`: `<p class="hero-home__lead t-lead">{lead}</p>` dopo l'`<h1>`. Desktop colonne 5–11, 24–32 px sotto il secondo registro; mobile dopo il secondo registro. Occhiello corto o assente. Il testo lo confermano copywriter-brand e cro-specialist.

### I5 [IMPORTANTE] Capitoli della Home: gerarchia tra nome e statement invertita

- **Dove.** `/`, sezione `#tre-mondi`. `ProjectShowcase.astro`: `.chapter__name` (riga 119) in `display-l`, statement `<Passage size="m">` (riga 45).
- **Problema.** Il nome («SIII», «Puglia Digitale», «Città Digitali») è più grande dello statement («Spazi reali. / Esperienze digitali.»).
- **Motivazione.** DV §7.3: «numeri `display-xxl`, nomi `display-m`». Lo statement è il Passaggio che porta il messaggio (DV §7.1: statement in `display-l`/`xl`).
- **Proposta.**
  ```css
  .chapter__name { font-size: var(--fs-display-m); font-weight: var(--fw-regular);
    line-height: var(--lh-display-m); letter-spacing: var(--tr-display-m); }
  ```
  ```astro
  <Passage as="p" registers={statement} size="l" class="chapter__statement" />
  ```
  Con la proposta B1-A le parole degli statement stanno a 320 px («Esperienze» a 40 px ≈ 220 px). Decide il creative-director.

### I6 [IMPORTANTE] Ritmo dei titoli piatto in SIII e Puglia Digitale

- **Dove.**
  - `/siii/`: i titoli visibili di Definizione (`#cos-e`), Confronto (`#tour-360`), Cosa puoi fare, Benefici e Showcase sono tutti in `display-l`. Gli H2 veri sono etichette mono.
  - `/puglia-digitale/`: «I luoghi» e «Perché aderire a Puglia Digitale» sono entrambi in `display-l`.
- **Problema.** Fino a cinque sezioni di fila hanno lo stesso gradino di titolo. È il rischio «layout identici per tutte le sezioni» della lista §33.
- **Motivazione.** DV §7.2: due sezioni consecutive non hanno mai lo stesso gradino. DV §7.4 e §7.5 danno gradini diversi.
- **Proposta.**
  - **SIII:** Definizione con statement in `display-m` e paragrafo in `lead` su 7 colonne, come da DV. Cosa puoi fare con lo statement in `display-s`: il titolo della sezione è il marquee in `display-xl`. Benefici con H2 in `display-m` e titoli di voce in `display-s` (oggi `display-m`, DV: `display-s`). Sequenza risultante: xxl → m → l → xl (marquee) → m → l → (ponte) → l.
  - **Puglia Digitale:** «Perché aderire a Puglia Digitale» in `display-m` (DV §7.5, n. 5).

### I7 [IMPORTANTE] Città Digitali, chiusura: il secondo registro sale di due gradini

- **Dove.** `/citta-digitali/`, `section#chiusura`: `h2.passage.passage--m.passage--second-xl`.
- **Problema.** «La tua azienda merita più di una presenza online.» è in `display-m` a 400; «Merita di essere esplorata.» è in `display-xl` a 600.
- **Motivazione.** DV §1.5: la seconda riga «può scendere di un gradino, mai salire». DS §2.5: «Non si fa: seconda riga più grande della prima». DV §7.6: Passaggio in `display-xl`.
- **Proposta.** Nella pagina: `size="xl" secondSize="same"`. Se la prima riga risulta troppo lunga a 390 px (circa 6 righe), `size="l" secondSize="same"`. In entrambi i casi il Passaggio resta corretto.

### I8 [IMPORTANTE] Città Digitali: le città non sono allineate alla latitudine del loro nodo

- **Dove.** `/citta-digitali/`, `section#portale`, a 1024 e 1440 px. `LocationShowcase.astro`, variante `italy`, riga 118. Il commento del file (righe 7–8) descrive l'allineamento, ma il codice non lo applica.
- **Problema.** Carta piccola in alto a destra; città in un elenco sotto il testo, circa 600 px più in basso dei loro nodi. In basso a destra resta un grande vuoto.
- **Motivazione.** DV §7.6, n. 3: carta «su una colonna alta a destra» e città «allineate alla latitudine del loro nodo». DS §3.8 prevede di usare `yPct` di `maps.json`: Varese 12,9%, Altamura 59,2%, Caltanissetta 90,8%.
- **Proposta.** Titolo e testo sopra, a tutta larghezza o sulle colonne 1–6. Sotto, un palco con la carta a destra e le città posizionate alla quota del nodo.
  ```astro
  <li class="city" data-place-link={c.id} style={`--y: ${place.yPct}`}>  <!-- place from maps.italia.places -->
  ```
  ```css
  @media (min-width: 64em) {
    .places--italy .places__stage { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--gutter); }
    .places--italy .places__map { grid-column: 7 / -1; grid-row: 1; }            /* aspect-ratio 1000 / 1180.8 */
    .places--italy .places__cities { grid-column: 1 / 6; grid-row: 1; position: relative; }
    .places--italy .city { position: absolute; inset-inline: 0; top: calc(var(--y) * 1%); translate: 0 -0.6em; }
  }
  ```
  - **A 1440 px:** carta larga circa 660 px e alta circa 780. Le città cadono a circa 100, 462 e 708 px; con voci alte circa 140 px non si sovrappongono.
  - **Sotto i 1024 px:** resta la pila nord → sud.

### I9 [IMPORTANTE] Timeline del fondatore: «10.000+» a contatto con «oggi»

- **Dove.** `/`, `#fondatore`, a tutte le larghezze. `FounderTimeline.astro`.
- **Problema.** Il momento numerico è agganciato alla tappa «MyComm · iComm Lab · Leadstone», che è subito accanto (desktop) o subito sopra (mobile) a «oggi: ITnode, Puglia Digitale, Città Digitali».
- **Motivazione.** DV §7.3, n. 6 (registro N5): «separato da «oggi» da almeno una tappa di spazio: mai vicino al logo o ai nomi dei prodotti ITnode». È una salvaguardia di veridicità (soglia 1): l'etichetta «clienti, prima di ITnode» da sola non basta.
- **Proposta.** Una colonna vuota graduata prima di «oggi», senza cambiare il DOM:
  - Astro: `style={`--stages: ${stages.length + 1}`}`;
  - CSS: `.founder__stage--now { grid-column: -2 / -1; }` (se la griglia usa `repeat(var(--stages), …)`);
  - mobile: `.founder__stage--now { margin-top: var(--space-3xl); }`, con il filo verticale che continua.

  Il brand-strategist valuti se alzarla a bloccante.

### I10 [IMPORTANTE] Ritratti a inchiostro: lo skyline resta visibile

- **Dove.** `/`, chiusura della timeline (`.founder__img`, 429 × 429 px CSS da una sorgente di 400 px), e `/contatti/`, sezione Persona.
- **Problema.**
  - Nella fascia tra il 62% e il 90% della larghezza i grattacieli si leggono ancora come grigi chiari su calce.
  - In Home il ritratto supera i 400 px CSS previsti ed è ingrandito.
- **Motivazione.** DV §4.3: la maschera serve ad «assorbire ciò che resta dello skyline». Lo skyline è l'estetica vietata (§33) ed estranea al territorio. DS §1.7: Home ≤ 400 px CSS.
- **Proposta.**
  ```css
  /* FounderTimeline.astro, contatti.astro — proposal, the values are the creative-director's */
  mask-image: linear-gradient(to right, #000 48%, transparent 86%);
  .founder__portrait :global(.founder__img) { max-width: 25rem; } /* 400 px, the source size */
  ```
  In alternativa, o insieme, un taglio più stretto nei derivati: in Home 566, 36, 440 × 440 invece di 480 × 480. Si rigenera con lo script sharp, lasciando intatti gli originali. Decide il creative-director.

### I11 [IMPORTANTE] Puglia Digitale su mobile: porte nell'ordine sbagliato

- **Dove.** `/puglia-digitale/`, `#luoghi`, sotto i 700 px (e anche a 768 px). `LocationShowcase.astro`, variante `doors`, riga 73.
- **Problema.** La pila va da Gravina ad Acquaviva a Monopoli.
- **Motivazione.** DV §7.5, n. 4, e DS §3.8: su mobile la pila è «dalla costa all'entroterra: Monopoli → Acquaviva → Gravina». Lo chiede il Passaggio della sezione precedente, «Dalla costa all'entroterra».
- **Proposta.** Ordine nel DOM Monopoli → Acquaviva → Gravina; su desktop la posizione resta data da `--x` e `--y`. Sul desktop l'ordine del focus diventa est → ovest: lo conferma ux-designer.

### I12 [IMPORTANTE] Puglia Digitale, «Perché aderire» su mobile: testo a 19–24 caratteri per riga

- **Dove.** `/puglia-digitale/`, `#perche-aderire`, a 320 e 390 px. `BenefitsSection.astro`, righe 263–266.
- **Problema.** Nella variante scala il numero (`display-xl`) sta accanto al testo e i rientri si sommano. Alla quarta voce, a 320 px, il corpo va a circa 19 caratteri per riga.
- **Motivazione.** Leggibilità: misura minima ragionevole di circa 35 caratteri. DV §7.5 su mobile chiede solo «rientri di 16 px».
- **Proposta.**
  ```css
  @media (max-width: 43.74em) {
    .benefits--scala .benefits__item { grid-template-columns: minmax(0, 1fr); row-gap: var(--space-2xs); } /* number above */
  }
  ```
  A 390 px la colonna di testo passa da circa 200 a 302 px.

### I13 [IMPORTANTE] SIII, confronto: etichette dei nodi a 10 px su mobile

- **Dove.** `/siii/`, `#tour-360`, a 320 e 390 px: `.compare__hot-label` (PRODOTTO, VIDEO, INFORMAZIONI, PRENOTAZIONE).
- **Problema.** Etichette mono maiuscole a 10 px, sotto il minimo del token `label` (12 px).
- **Motivazione.** DS §1.2: `label` da 12 px al minimo. Sono l'unica spiegazione dentro la figura.
- **Proposta.** Sotto i 700 px, nodi numerati da 1 a 4 e legenda numerata sotto la figura, come nel Documento: le etichette nella figura diventano `aria-hidden` o spariscono. In alternativa minima, `font-size: var(--fs-label)` con file alternate.

### I14 [IMPORTANTE] Città Digitali, video: titolo di copertina centrato e ripetuto

- **Dove.** `/citta-digitali/`, `#video`. `VideoSection.astro`, righe 169–175 (`text-align: center`).
- **Problema.**
  - La copertina tipografica centra «Città Digitali, in movimento.».
  - Lo stesso titolo è anche l'H2 subito sopra.
- **Motivazione.** DV §1.5 e DS §1.2: mai testo centrato, tranne le etichette dei gradi. Lista §33.
- **Proposta.**
  ```css
  .video__cover-title { text-align: start; align-self: end; } /* bottom-left, above the controls row */
  ```
  La copertina tiene il titolo e l'H2 diventa un'etichetta mono («VIDEO», come in DV §7.6), oppure il contrario. Il copywriter decide quale riga resta.

### Suggerimenti

| # | Dove | Problema e motivazione | Proposta |
|---|---|---|---|
| S1 | Hero Home, orizzonte di Città Digitali (`.horizon__view`) | Maschera sfumata di 32 px ai bordi: la DV §2 ammette solo la maschera del ritratto | `mask-image: none; overflow: clip;` oppure eccezione registrata dal creative-director |
| S2 | Apertura dei capitoli: «120° · ESE», «240° · OSO» | Sigle approssimate (ESE = 112,5°): DV §1.1 dà le lettere solo ai cardinali | «120°», «240°» senza sigla; «000° N» resta |
| S3 | Menu mobile, `Header.astro`, riga 72 | «01 · 000°»: DV §7.8 dice che i rilevamenti nel menu «sarebbero rumore». Il descrittore di Città Digitali («Le attività del territorio, online») ha 34 caratteri e resta a metà | `{item.num}` senza rilevamento; descrittore di al massimo 32 caratteri dal copywriter |
| S4 | `display-m` a 600 in `.video__title`, `.city__name`, `.benefits__name` (SIII), primo registro dei Passaggi `m` | Nella scala della DV `display-m` è a 400: è la voce dell'«arrivo» | Peso 400 dove `display-m` fa da titolo di voce, oppure passaggio a `display-s` (600) |
| S5 | Valori fuori scala: voci dell'header e «Menu» a 16 px; `.stat__value` con un clamp proprio (64 → 240 px, contro 56 → 280 del token: a 1440 px 240 invece di 259); descrizione dei segnaposto a 13 px sotto i 700 px (`Media.astro`, riga 174) | Un solo posto per le misure (DS §1.2) | Token `--fs-ui: 1rem` per i controlli dell'header, documentato; `.stat__value { font-size: var(--fs-display-xxl) }`; descrizione a `--fs-small` |
| S6 | Misura del testo: pagine legali a circa 85 caratteri per riga a 1440 px; lead a circa 60 a 768 px; avviso del form a circa 93 | Body ≤ 66ch, lead ≤ 42ch (DV §3.2) | `max-width: var(--measure-body)` su `.legal p, .legal li, .contact__notice`; `var(--measure-lead)` sui lead |
| S7 | Segnaposto (staging) | Formato in basso a sinistra su mobile; «Porta 3:5» dichiarato su un taglio 4:5 (hero SIII mobile); nelle porte strette il segno di taglio tocca «3:5» | Formato sempre in basso a destra; descrizione con il formato mobile; a meno di 160 px di larghezza, solo etichetta e formato |
| S8 | Porte di Puglia Digitale a 390 e 768 px | Porta larga circa 130 px: una foto vera sarebbe un francobollo | Sotto i 1024 px, porta di 2 colonne su 4 (o 4 su 8), oppure a tutta colonna in 4:5 con il testo sotto |
| S9 | Form | Invio non a tutta larghezza su mobile (DS §3.15); riepilogo errori con bordo pieno invece del filetto sinistro; messaggi sotto il campo e senza icona (DS: sopra, con «!») | Invio `inline-size: 100%` sotto i 700 px; per posizione dei messaggi e icona decide ux-designer, poi allineo il DS |
| S10 | `/404.html` | Orizzonte senza tacche; a 390 px una linea con un punto sembra uno slider; i nodi non fanno parte dei link | Variante 404 di `Horizon.astro` con tacche; nodo dentro l'area del link di ogni mondo |
| S11 | Timeline, tappa «La prima azienda» | La data mancante è resa con «–» visibile | Nessuna etichetta: la tacca basta, finché la data è `[DA FORNIRE]` |
| S12 | Firma del footer su mobile | Si spezza tra «40.8957° N ·» e «16.8412° E» | `white-space: nowrap` sulla coppia di coordinate |
| S13 | Porte di Puglia Digitale, filo d'orizzonte | Da verificare: il filo sembra in terra; i richiami verso i luoghi sì, il filo no | Filo in `--fg` e richiami in `--place` |

---

## Proposta: variante tipografica «in pubblicazione» dei segnaposto (DV §4.5)

**Perché serve al gate.** Oggi i segnaposto dichiarano «ASSET RICHIESTO»: vanno bene in staging, ma sono un bloccante di contenuto al go-live se gli asset non arrivano. Sono sette:
- porta hero di SIII;
- schermo del capitolo 01;
- tre esempi SIII;
- tre porte dei luoghi.

Il poster video esiste già in forma tipografica (la copertina di Città Digitali, da allineare a sinistra: I14).

**Il disegno.** Stesso box e stesso `aspect-ratio` dello slot (niente CLS), superficie `--slot-bg`, nessuna richiesta visibile, tutto `aria-hidden`. Nome e luogo sono già nel testo accanto, e non ci sono elementi focalizzabili.
- **Luogo** (porta 3:5):
  - un filo d'orizzonte al 58% dell'altezza, lo stesso rapporto cielo/terra della hero, con tacche da 5°;
  - il nome in `display-m` a 400 in piedi sopra il filo;
  - il nodo-luogo (`--place`) sul filo, verso destra;
  - sotto il filo, in mono: rilevamento e distanza dalla sede, poi le coordinate («081° · 39 KM · 40.9500° N · 17.3000° E»); per Acquaviva «SEDE · 40.8957° N · 16.8412° E».
- **Esperienza SIII** (schermo 16:10, porta 3:5 nella hero): è la figura del confronto senza etichette:
  - orizzonte graduato con i gradi ogni 45°;
  - tre anelli-hotspot `--node` fermi, senza ping;
  - in alto a sinistra il nome in `display-s` e il luogo in mono.
- **Poster video:** superficie notte, titolo in basso a sinistra, nodo di riproduzione nei controlli (già così, meno la centratura).

**L'implementazione.**
```ts
// src/data/asset-slots.ts — explicit flag: the preview build is also a production build
export const SLOT_MODE = import.meta.env.PUBLIC_SLOT_MODE === 'publish' ? 'publish' : 'staging';
// each slot gains: publish: { kind: 'place' | 'experience', name, meta, nodes? } (meta from lib/geo.ts, not hard-coded)
```
```astro
---
// src/components/ui/SlotPending.astro — publication variant of a missing asset (direction §4.5)
interface Props { kind: 'place' | 'experience'; ratio: string; name: string; meta?: string; nodes?: { x: number; y: number }[] }
const { kind, ratio, name, meta, nodes = [] } = Astro.props;
---
<div class:list={['slot-pub', `slot-pub--${kind}`]} style={`aspect-ratio: ${ratio}`} aria-hidden="true">
  <p class="slot-pub__name">{name}</p>
  <span class="slot-pub__horizon"></span>
  {kind === 'place' && <span class="slot-pub__node" />}
  {kind === 'experience' && nodes.map((n) => <span class="slot-pub__hot" style={`left:${n.x}%;top:${n.y}%`} />)}
  {meta && <p class="slot-pub__meta t-label">{meta}</p>}
</div>
<style>
  .slot-pub { position: relative; overflow: clip; container-type: inline-size; background: var(--slot-bg); color: var(--fg); }
  .slot-pub__horizon { position: absolute; inset-inline: 0; top: 58%; height: 6px; border-top: 1px solid var(--fg);
    background: repeating-linear-gradient(to right, var(--fg) 0 1px, transparent 1px 4cqi) top / 100% 6px no-repeat; }
  .slot-pub__name { position: absolute; inset-inline: 8cqi; bottom: calc(42% + 1.5rem); margin: 0;
    font-size: clamp(var(--fs-display-s), 11cqi, var(--fs-display-m)); font-weight: var(--fw-regular);
    line-height: var(--lh-display-m); letter-spacing: var(--tr-display-m); text-wrap: balance; }
  .slot-pub__meta { position: absolute; inset-inline: 8cqi; top: calc(58% + 1.25rem); margin: 0; color: var(--fg-2); }
  .slot-pub__node, .slot-pub__hot { position: absolute; width: 0.625rem; aspect-ratio: 1; border-radius: 50%;
    translate: -50% -50%; outline: 1px solid currentColor; outline-offset: 7px; } /* dot Ø10 + ring Ø26 */
  .slot-pub__node { left: 78%; top: 58%; background: var(--place); color: var(--place); }
  .slot-pub__hot { background: var(--node); color: var(--node); }
  .slot-pub--experience .slot-pub__horizon { top: 62%; }
  .slot-pub--experience .slot-pub__name { inset-block: 6cqi auto; font-size: var(--fs-display-s); font-weight: var(--fw-strong); }
  .slot-pub--experience .slot-pub__meta { top: calc(6cqi + 2.5em); }
</style>
```
- **In `Media.astro`:** con lo slot senza immagine, `SLOT_MODE === 'publish'` mostra `<SlotPending {...slot.publish} ratio={ratio} />`, altrimenti il segnaposto attuale.
- **Guardia di build:** con `PUBLIC_SLOT_MODE=publish`, la build fallisce se in `dist/` compare «ASSET RICHIESTO».
- **Costo:** zero byte di immagini. Il nome si adatta da 22 px (porta da 130 px) a 60 px con `cqi`.

Quando il creative-director l'approva, faccio io la verifica visiva sulle sette posizioni.

---

## Verdetto di dominio (UI)

**Fedele nell'impianto, non ancora approvabile per G4.** La dimostrazione sta in «Cosa è fedele»: dispositivi firma, palette, scala, superfici, componenti e stati corrispondono alla DV e al DS. Il sito passa il «test ITnode» sezione per sezione, salvo i punti sopra.
- **Bloccante:** B1, reflow a 320 px (soglia 2), da chiudere prima di G4.
- **Importanti:** I1–I14 vanno corrette o accettate esplicitamente dal creative-director prima del go-live:
  - disciplina dei colori-segno: I1, I2;
  - hero e ritmo: I3–I7;
  - carte, porte e timeline: I8, I9, I11;
  - ritratti: I10;
  - leggibilità su mobile: I12, I13;
  - centratura: I14.
- **Suggerimenti:** si possono pianificare dopo.

Il verdetto di gate spetta al creative-director.

## Ipotesi da validare

- **La «g».** L'attraversamento della «g» nella hero (I3, circa 0,13 em) è stimato da screenshot e metriche: va confermato con la sovrapposizione in pagina prima di fissare il valore.
- **Città Digitali.** L'allineamento per latitudine (I8) presuppone la carta sulle colonne 7–12 a 1024 e 1440 px: con carte più strette le voci si avvicinano e va ricontrollato lo spazio tra Altamura e Caltanissetta.
- **Motion.** Le animazioni (aperture, text reveal, rotazione dell'orizzonte, marquee) non sono in questa review: la verifica statica dice solo che il contenuto è visibile anche fermo.
- **Browser.** Safari iOS e Firefox non sono stati provati: la DV (Ipotesi) chiede di riverificare lì le misure tipografiche.

## Domande aperte

- **creative-director:**
  - valore del minimo di `display-xl` (B1-A) o soluzione locale (B1-B);
  - nuova maschera o nuovo taglio dei ritratti (I10);
  - eccezione per la sfumatura ai bordi dell'orizzonte (S1);
  - colore dei nodi-hotspot sulle foto (DS §2.3, ancora calce);
  - la DV §7.6 assegna `display-l` sia a «L'Italia in un unico portale» sia a «Dal locale al nazionale», consecutive, in contrasto con §7.2: si tiene?
- **ux-designer:**
  - ordine del focus delle porte su desktop dopo I11;
  - posizione e icona dei messaggi di errore (S9);
  - conferma a11y della proposta B1-A.
- **copywriter-brand:**
  - riga di posizionamento e occhiello della hero (I4);
  - quale titolo resta sul video (I14);
  - descrittore di Città Digitali nel menu (S3).
- **brand-strategist:** se la vicinanza tra «10.000+» e «oggi» (I9) è bloccante per la veridicità.
- **Fuori dal mio dominio, lo segnalo:** footer e «Dati societari» di Contatti mostrano ragione sociale, P.IVA e sede operativa. Sede legale, REA e capitale sociale mancano: soglia 5, go-live bloccato finché non arrivano (`[DA FORNIRE]`, DS §3.3).

## Decisioni richieste

1. **B1: correzione del reflow a 320 px.** Opzione A (token più rientro fluido, sistemica, a 390 px non cambia nulla) oppure B (secondo registro della chiusura in `display-l`, locale, cambia anche il desktop). Raccomandata: A.
2. **Accettazione degli scostamenti elencati in «Cosa è fedele»:** pillole «Mi interessa», controlli video testuali, tratto di 1 px sui nodi del Documento, tacche via gradiente a stop netti. Con il sì, li porto nel DS.
3. **Variante tipografica «in pubblicazione» dei segnaposto:** approvazione del disegno e del flag `PUBLIC_SLOT_MODE`, così la sessione principale la implementa prima di G4.
