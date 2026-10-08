---
titolo: Verdetto del creative-director · hero di /siii/ con il negozio YES
owner: creative-director
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-08
fonti: [richiesta della sessione principale del 2026-10-08 (domande 1–4) e sua integrazione (R4, R5, riserva della hero), src/assets/images/siii-yes-mobile-negozio.jpg (commit 1112c93), commit d97aa29 (alt definitivo), docs/review/2026-10-08-hero-siii-yes-brand-strategist.md, docs/review/2026-10-08-hero-siii-yes-web-performance-specialist.md, commit a5dac14 (controllo A7 per impresa), docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.3), docs/brief/brief-consolidato.md (A7, A8), docs/contenuti/alt-text.md (1.10), docs/contenuti/copy-deck/siii.md (1.4), docs/performance/budget.md (0.7, §4 e §7.4), docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md, docs/creativa/direzione-visiva.md (0.19 → 0.20), catture della sessione principale in scratchpad/yes/, staging http://127.0.0.1:4321 (build di 1112c93), prove del creative-director del 2026-10-08 in scratchpad/cd-yes/ (Playwright 1.56, Chromium 141, sharp 0.35; copia di HEAD con il derivato desktop, costruita e servita in locale)]
---

# Verdetto · hero di `/siii/` con il negozio YES

Dal commit 1112c93 la hero di `/siii/` mostra la schermata di un negozio con il logo «YES», da smartphone. L'ha chiesta l'utente («scusami usa questa non quella»), ed è già nell'anteprima. Questo verdetto la rivede (Fase 5). Non è un verdetto di gate: il G4 resta con le sue condizioni.

## In sintesi

- **Verdetto: approvato con modifiche.** La scelta dell'utente regge il sistema e lo allarga: dopo le strutture ricettive degli esempi, un negozio, con un'interfaccia che si legge al primo sguardo. Da correggere subito c'è una cosa sola: sulla Porta desktop l'interfaccia è tagliata in basso.
- **Decisioni:**

| # | Domanda | Decisione |
|---|---|---|
| 1 | Ritaglio per telefono | **In alto** (`position: 'top'`), com'è nel sito. È l'unica finestra pulita che tiene logo e menu, e sta nel budget. Nessuna patch |
| 2 | Coerenza della pagina | **Serve la riga con nome e comune** (decisione 5 del 2026-10-07), ma solo quando arrivano nome ufficiale, comune e consenso. Fino ad allora va bene così: il nome lo dicono il logo e l'alt. Nessun link nella hero. YES tra gli esempi è una scelta dell'utente, non necessaria |
| 3 | Porta desktop (in più) | **Derivato 3:5 senza l'interfaccia tagliata in basso**, finché non arriva una schermata pulita. La patch è pronta e verificata |
| 4 | R4 di brand-strategist | DV §4.8 estesa: consenso A7 per ogni impresa di cui il sito mostra una schermata, impresa per impresa |
| 5 | R5 di brand-strategist, «EGAN» | **Non ricade nel divieto.** È merce in vendita, non un canale che vende per l'impresa |
| 6 | Riserva della hero senza il consenso di YES (ADR 002 §3.1) | **Confermata**, con una nota sul ritaglio della sala (§5) |

- **Compressione:** valori del sito (AVIF 50). Nessuna eccezione, ed è giusto che la `quality` di prima sia stata tolta.
- **Documenti aggiornati:** direzione visiva 0.20 (§4.6, §4.8, §7.4, Ipotesi, Domande aperte, Decisioni richieste, punto 8).

## 1. Che cosa ho guardato

- **La schermata intera**, con lo zoom e un righello sulle quote dell'interfaccia.
- **Lo staging di 1112c93** a otto viewport: 360 × 640, 390 × 664, 390 × 844, 412 × 915, 820 × 1180, 1024 × 768, 1440 × 900 e 1920 × 1080. Per ognuna: dove comincia la porta, quanta se ne vede nella prima schermata, quale variante sceglie il browser.
  - Lo staging ha ancora l'alt provvisorio. L'alt definitivo di d97aa29 è in HEAD, e c'è nella mia copia.
- **I tre ancoraggi ricalcolati** con la pipeline di Astro (sharp 0.35). La variante da 1080 px nella build è identica, byte per byte, al ritaglio «top» ricalcolato.
- **La riga con il nome, provata in pagina** con tre lunghezze, a 320, 390, 820 e 1440 px, con e senza le spaziature di WCAG 1.4.12.
- **Una copia di HEAD con il derivato desktop**, costruita e servita in locale: catture, confronto con lo staging, `astro check`, `check:seo`, `check:launch`.
- **Le review in parallelo:** brand-strategist (R1–R5) e ADR 002 0.3; `alt-text.md` 1.10 e copy deck 1.4 di copywriter-content; budget 0.7, §7.4, di web-performance-specialist.

## 2. Ritaglio per telefono: in alto (decisione 1)

**Quote dell'interfaccia sull'originale** (1200 × 2000 px, in altezza):

| Elemento | y |
|---|---|
| Menu, in alto a destra | 30–143 |
| Logo «YES», in alto a sinistra | 152–324 |
| Icone di WhatsApp, Facebook e Instagram, a sinistra | 688–1312 |
| «APRI QUI», tagliata dall'esperienza stessa («APRI QL») | 1721–1735 |
| Freccia | 1806–1980 |
| Link «Privacy Polic…» e pulsante «Go», tagliati dal bordo dello schermo | 1928–2000 |

**Le finestre 4:5** (1200 × 1500) **che non tagliano nulla sono due:** quella con il bordo superiore tra 0 e circa 15 px, e quella in basso. Tra il menu e il logo ci sono 9 px: troppo pochi per un bordo.

| Ancoraggio | Che cosa resta sul bordo | AVIF a 1080 px | Giudizio |
|---|---|---|---|
| In alto | Nulla di tagliato. Il bordo inferiore attraversa l'espositore, che è scena | **54,0 KB** | Scelto |
| Al centro | Il bordo superiore taglia il logo | 59,4 KB | No |
| In basso | Entrano i tre difetti della schermata: l'etichetta tagliata, il link e il pulsante tagliati dal bordo | 64,2 KB, oltre i 60 del budget | No |

**Nella prima schermata**, ancorata in alto:
- a 390 × 664 della porta si vedono 114 px, e sono il logo e il menu: si capisce subito che è la schermata di un'app (a 360 × 640, 94 px, lo stesso);
- a 390 × 844 se ne vedono 294 su 437: logo, menu, WhatsApp, la scala, il soppalco e le lampade;
- a 412 × 915, 359 su 463.

**Verificato.** Il file nella build coincide con la posizione «top» di sharp. È una parola chiave, quindi non serve una patch.

## 3. Coerenza della pagina (decisione 2)

**Com'è oggi.**
- La hero mostra un'impresa che non è nelle linee guida e che il testo non nomina.
- Il logo si legge: circa 50 px di lato su un telefono, 61 px da 64em (72 px con il derivato del §4).
- L'alt la nomina: «Il negozio YES da smartphone: …» (d97aa29).

**Che cosa manca, e perché conta.**
- **Dove sta.** Una schermata vera senza luogo perde il dispositivo delle Coordinate, che la distingue da un'immagine di repertorio (DV §4.8). Il logo dice di chi è lo spazio, non dove.
- **Di chi è, rispetto agli esempi.** La CTA accanto all'immagine è «Esplora gli esempi», e porta a tre imprese diverse.
  - Con la sala di Masseria Santella la storia continuava nel primo esempio. Con YES chi cerca quel negozio tra gli esempi non lo trova.
  - Peggio: potrebbe attribuirlo a un'altra impresa.
- **Il nome da solo.** «YES» in un cerchio, senza altro intorno, può leggersi come la parola inglese. copywriter-content l'ha notato per l'alt, e ha scritto «Il negozio YES».

**Decisione.**
- **La risposta è la riga già decisa il 2026-10-07: «YES · {comune} ({provincia})»**, in `label` mono sotto la porta.
  - Arriva solo con il nome ufficiale, il comune e il consenso (ADR 002 §3.1).
  - Una riga con il solo nome ripeterebbe il logo. Un comune senza fonte sarebbe un dato inventato (soglia 1).
  - **Fino ad allora va bene così**, anche al go-live, se ci sono A7 e A8: il nome lo dicono il logo e l'alt. È un `[IMPORTANTE]`, non un blocco.
- **La riga non è un link.** La hero ha già due azioni, e un'uscita verso un altro sito prima di leggere la pagina la indebolisce. Se arriva l'indirizzo dell'esperienza, il link si valuta con cro-specialist, che decide sulla conversione.
- **YES tra gli esempi** come quarto, con la sua schermata d'avvio e l'indirizzo, chiuderebbe del tutto il giro. Le linee guida però ne indicano tre: è una scelta dell'utente, e non è necessaria.
- **«Tre Siti Interattivi Immersivi già online»**, negli esempi, resta vero: conta gli esempi con il link, non la hero (ADR 002, I8).

**La riga, provata in pagina** (inserita fuori dall'apertura, sullo staging, con testi di prova della stessa lunghezza):

| Caratteri | 320 px | 390 px | 820 px | 1440 px | Con WCAG 1.4.12 |
|---|---|---|---|---|---|
| 23 | 1 riga | 1 riga | 1 riga | 1 riga | 1 riga ovunque |
| 32 | 1 riga | 1 riga | 1 riga | 1 riga | 2 righe solo a 320 px |
| 42 | 2 righe | 1 riga | 1 riga | 1 riga | 2 righe a 320, 390 e 1440 px |

- In nessun caso c'è scorrimento orizzontale. La riga è allineata alla porta a ogni larghezza, 8 px sotto.
- **Sta fuori dall'apertura.** `.aperture` ha `overflow: clip`, e i due scuri che si aprono all'ingresso la coprirebbero. Per esempio la porta diventa una `figure`, con l'apertura sull'immagine e la riga nella `figcaption`. Markup e lettura li decide ux-designer.

## 4. Porta desktop: l'interfaccia tagliata in basso (decisione 3)

**Il problema.** Da 64em la porta mostra la schermata intera, che finisce con tre difetti:
- «APRI QUI» tagliata dall'esperienza stessa: si legge «APRI QL»;
- il link «Privacy Polic…» e il pulsante «Go», tagliati dal bordo dello schermo.

A 1440 × 900 la porta è tutta nella prima schermata, quindi si vedono subito; a 1024 × 768 si vede l'etichetta. È la prima immagine della pagina che vende il prodotto: un'interfaccia tagliata non si legge come onestà, si legge come un prodotto non finito. E la riga con il nome, quando arriva, starebbe proprio sotto quell'angolo.

**Opzioni.**

| Opzione | Pro | Contro |
|---|---|---|
| (a) La schermata intera, com'è | Nessun lavoro; c'è anche il menu | I tre difetti, nella prima schermata |
| (b) Un derivato 3:5 che si ferma sopra l'etichetta | Pulita subito. Negozio ed espositore più grandi del 18%, il logo da 61 a 72 px. Più leggera | Il menu esce; serve una piccola modifica a `Media` |
| (c) La stessa vista pulita, dall'utente | La soluzione vera: schermata intera, menu compreso | Dipende dall'utente. Se l'etichetta è tagliata anche dal vivo, va prima corretta nell'esperienza |
| (d) Un'altra proporzione della Porta su desktop | — | No: la Porta 3:5 è una composizione del sistema (§1.2) |
| (e) Togliere i difetti con un ritocco | — | No: le schermate si tagliano, non si ritoccano (§4.1) |

**Decisione: (b) adesso, (c) richiesta all'utente.** Quando arriva la schermata pulita, la porta torna alla schermata intera.
- **Il riquadro sull'originale è x 0, y 0, 1014 × 1690.**
  - Un 3:5 che si ferma sopra l'etichetta è alto al massimo 1700 px, quindi largo al massimo 1020: tiene il logo e le icone, e lascia fuori il menu.
  - Si ferma 31 px sopra l'etichetta, e a destra 29 px prima del montante del soppalco, che resta fuori intero.
  - Il menu resta nel ritaglio dei telefoni.
- **L'alt di d97aa29 resta vero:** «l'interfaccia dell'esperienza» vale anche senza il menu.
- **Verificato sulla copia di HEAD con la patch:**
  - le altre sei pagine e la 404 sono identiche byte per byte; su `/siii/` cambia solo la `<picture>` della hero;
  - le varianti dei telefoni sono gli stessi file di oggi;
  - pesi del derivato: AVIF 22,2 / 41,8 / 60,4 KB (480, 768, 1014 px) invece di 24,7–83,7; WebP fino a 82,4 KB, JPEG fino a 127,0 KB, quindi il controllo n. 8 passa;
  - `astro check`: 0 errori; `check:seo`: nessun problema;
  - `check:launch`: il controllo A7 vede la hero, anche nella versione per impresa di a5dac14 (`yes (/siii/index.html)`).
- **Il nome del file conta.** Il derivato si chiama `siii-yes-desktop-negozio.jpg`, come le altre schermate (`siii-<impresa>-desktop-<vista>`). Con un nome diverso il controllo A7 per impresa di brand-strategist non l'avrebbe riconosciuto: il prefisso è la chiave dell'impresa.

## 5. I punti di brand-strategist

**R4 · Consenso per ogni impresa: fatto.** La DV §4.8 ora dice: nome, logo, riga e schermate di ogni impresa vanno online solo con il suo consenso scritto, impresa per impresa. Le imprese sono Masseria Santella, Maison Miminà, D.L. Natura Dentro e YES; per YES serve anche A8.

**R5 · «EGAN»: non ricade nel divieto.**
- La regola sui marchi di terzi esclude le schermate in cui un marchio è un canale che vende o prenota per conto dell'impresa, come Airbnb e Booking. Esclude anche quelle in cui un marchio fa pensare a una collaborazione con ITnode. In tutti e due i casi c'è di mezzo «Vendita diretta».
- «EGAN» è sull'espositore della merce: è il contenuto del negozio, come i prodotti su uno scaffale. Alla misura della hero si legge appena, e nei testi non si trascrive.
- La regola, così precisata, è nella DV §4.8.

**Riserva della hero senza il consenso di YES (ADR 002 §3.1): confermata.**
- Prima la sala di Masseria Santella, se Masseria Santella ha dato il consenso, ancorata in basso come deciso il 2026-10-07. Altrimenti la variante «in pubblicazione» dello slot `siii-anteprima`.
- Una nota per quando la sala torna:
  - si torna anche all'immagine intera su desktop, senza il derivato di YES;
  - il ritaglio «bottom» in build va verificato sulla build, come chiedeva il verdetto del 2026-10-07;
  - la riga con il nome segue la stessa regola: «Masseria Santella · Cassano delle Murge (BA)», con il comune `[DA VERIFICARE]` del copy deck.
- Un'altra schermata con consenso entra solo con il mio parere e la misura di web-performance-specialist, come scrive l'ADR.

## 6. Cosa funziona e va protetto

- **La vista.** Un negozio vero e contemporaneo, con l'interfaccia che si legge al primo sguardo: il logo dice di chi è, il menu e i contatti dicono che è un sito. Dopo masseria, maison e un vialetto tra le siepi, un negozio parla a un pubblico più largo di imprese.
- **Accanto al titolo regge.** È luminosa quanto la sala di prima (luminanza media 137–139 su 255, contro 131–140), con colori più saturi: legno caldo e parete verde. A 1440 e a 390 px «SIII» resta il protagonista.
- **Il sistema.** Stessa Porta, stesso budget, stessa compressione del sito, nessun nodo sopra la schermata, nessuna cornice disegnata.
- **Il lavoro in parallelo è coerente.** L'alt nomina l'interfaccia in blocco, e quindi vale per ogni ritaglio, compreso il derivato. Il consenso è per impresa, con la riserva della hero. Il budget è rimisurato.

## 7. Osservazioni

**Y1 · [BLOCCANTE per il go-live] Consenso di YES e conferma che il SIII è di ITnode (A7, A8)**
- **Dove:** hero di `/siii/`.
- **Problema e motivazione:** quelli di R1 e R2 di brand-strategist; soglia 1 e ADR 002 §3.1.
- **Proposta:** la richiesta dell'ADR 002 §3.2. Senza risposta, la riserva confermata al §5.

**Y2 · [IMPORTANTE] Porta desktop: interfaccia tagliata in basso**
- **Dove:** `/siii/`, hero, da 64em.
- **Problema:** «APRI QL», «Privacy Polic…» e «Go» tagliati, nella prima schermata a 1440 × 900.
- **Motivazione:** craft. È l'immagine che deve provare la qualità del prodotto (§4).
- **Proposta:** la patch `scratchpad/cd-yes/ripiego-desktop-yes.patch` (sotto), finché non arriva la schermata pulita (Y4).

**Y3 · [IMPORTANTE] Riga con il nome e il comune sotto la hero**
- **Dove:** `/siii/`, hero.
- **Problema:** il luogo non c'è, e accanto a «Esplora gli esempi» il negozio può essere attribuito a un'altra impresa (§3).
- **Motivazione:** DV §4.8, «Ogni schermata reale dice di chi è lo spazio e dove sta»; decisione 5 del 2026-10-07.
- **Proposta:** quando arrivano nome ufficiale, comune e consenso, il testo lo scrive copywriter-brand e markup e lettura li decide ux-designer. Le misure sono al §3. L'alt passa alla variante senza il nome (`alt-text.md`).

**Y4 · [SUGGERIMENTO] Una schermata pulita di YES**
- **Dove:** `src/assets/images/siii-yes-mobile-negozio.jpg`.
- **Problema:** la vista ha il riquadro della privacy aperto e l'etichetta «APRI QUI» tagliata.
- **Proposta:** chiedere all'utente la stessa vista, 1200 × 2000 px, dopo aver chiuso il riquadro della privacy. Se l'etichetta è tagliata anche dal vivo, è un difetto del SIII: va corretto nell'esperienza prima della nuova schermata. Con quella, la porta desktop torna alla schermata intera.

**Y5 · [SUGGERIMENTO] YES anche tra gli esempi**
- **Dove:** `/siii/`, «Entra. Esplora. Interagisci.».
- **Problema:** chi vede YES nella hero non può aprirlo.
- **Proposta:** decide l'utente. Servirebbero la schermata d'avvio da desktop e l'indirizzo dell'esperienza, e la serie degli esempi passerebbe da tre a quattro soglie, con ui-designer.

## 8. Stato delle review di dominio

| Review | Verdetto di dominio | Sintesi del creative-director |
|---|---|---|
| brand-strategist, veridicità della hero YES | Anteprima conforme; go-live solo con A7 e A8 | Accolte R1–R3. R4 e R5 decise al §5, la riserva confermata |
| copywriter-content, `alt-text.md` 1.10 e copy deck 1.4 | Alt definitivo | Approvato. Vale anche per il derivato desktop |
| web-performance-specialist, hero YES (budget 0.7, §7.4) | Conforme, senza patch, a due condizioni: ritaglio in alto, 4G lento sorvegliato | Accolta: l'ancoraggio resta in alto. Con la patch del §4 la variante desktop cambia, ed è più leggera: va rimisurata |

## 9. Verdetto

**Approvato con modifiche.**
- Da applicare ora: la patch della porta desktop (Y2).
- Quando ci sono nome, comune e consenso: la riga sotto la hero (Y3).
- Bloccante per il go-live: il consenso di YES e la conferma A8 (Y1), come per le altre tre imprese.

## Patch da applicare (sessione principale)

1. **Porta desktop di YES (Y2).**
   - `git apply scratchpad/cd-yes/ripiego-desktop-yes.patch`. Il controllo `git apply --check` su HEAD passa.
   - La patch tocca `scripts/prepare-assets.mjs` (il nuovo riquadro), `src/components/ui/Media.astro` (`mobileCrop.image`, facoltativo), `src/data/media.ts` e `src/pages/siii.astro`.
   - Poi `npm run assets`. Genera `src/assets/images/derivate/siii-yes-desktop-negozio.jpg`, 1014 × 1690, sha256 `63728986ccf866cc7823266312fc21ef1127b8be6a621cb9af7ebf3511b44d14`. Gli altri nove derivati restano identici.
   - Poi la build. Verifiche:
     - da 64em la hero usa `siii-yes-desktop-negozio.*` (AVIF fino a 60,4 KB), sotto i 64em gli stessi file di oggi;
     - le altre pagine sono identiche;
     - `check:launch`, controllo A7, vede la hero.
   - Poi web-performance-specialist rimisura `/siii/` su desktop.
2. **Controllo A7 per impresa:** già applicato (a5dac14, patch di brand-strategist). Riconosce anche il derivato, grazie al nome: sulla copia con la patch 1 elenca `yes (/siii/index.html)`.

## Ipotesi da validare

- `[DA VERIFICARE: il SIII di YES l'ha realizzato ITnode (A8)]`; `[IPOTESI: «YES» è il nome con cui l'impresa si presenta]` (ADR 002 0.3).
- `[DA VERIFICARE: «APRI QUI» è tagliata anche nell'esperienza dal vivo]`. L'indirizzo dell'esperienza non è noto.
- Le misure in pagina sono in Chromium 141; la riga con il nome va riprovata in Safari e Firefox quando c'è il testo vero `[DA VERIFICARE]`.

## Domande aperte

- **Utente:**
  - la stessa vista di YES, pulita (Y4);
  - YES anche tra gli esempi? (Y5);
  - consenso, A8, nome ufficiale, comune e indirizzo: le domande sono quelle della review di brand-strategist, §4, e non si duplicano.
- **ux-designer:** markup e lettura della riga con il nome, fuori dall'apertura (§3).
- **copywriter-brand:** il testo della riga, quando arrivano nome e comune.
- **cro-specialist:** un link all'esperienza di YES nella hero, se arriva l'indirizzo (§3). Il mio parere è contrario.

## Decisioni richieste

- **Sessione principale:** applicare la patch 1 e ricostruire.
- **Utente:** la schermata pulita (Y4); YES tra gli esempi (Y5); l'ADR 002 §3.1 e §3.2, già richiesti da brand-strategist.
- **web-performance-specialist:** rimisurare la variante desktop della hero dopo la patch 1.
