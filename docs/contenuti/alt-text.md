---
titolo: Testi alternativi delle immagini
owner: copywriter-content
contributi: [ux-designer, seo-content, seo-technical, copywriter-brand]
stato: in revisione
versione: 1.5
aggiornato: 2026-10-07
fonti: [src/assets/images/ (con le 9 schermate dei SIII inviate dall'utente il 2026-10-07, commit d06a3e9; acquaviva-digitale.webp, gravina-digitale.webp e monopoli-digitale.webp, fornite dall'utente il 2026-10-06), screenshot di controllo della sessione principale del 2026-10-07 (scratchpad, non versionati), docs/decisioni/007-immagine-di-acquaviva-con-segni-grafici.md (1.1), conferma dell'utente del 2026-10-06 sull'associazione delle immagini alle città, decisione dell'utente del 2026-10-06 sui segni grafici, prove di ritaglio del creative-director (scratchpad, non versionate), scripts/prepare-assets.mjs, src/data/asset-slots.ts, src/data/media.ts, src/components/ui/Media.astro, src/components/ui/SlotPending.astro, src/components/ui/MapItaly.astro, src/pages/index.astro, src/pages/siii.astro, src/pages/puglia-digitale.astro, src/pages/contatti.astro, src/data/pages.ts, src/scripts/immersive.ts, docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/decisioni/002-veridicita-staging-e-immagini-ai.md (A7, I7, I8), docs/review/2026-09-28-sito-veridicita-brand-strategist.md (B4), docs/review/2026-09-28-sito-bozze-copywriter-content.md, docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (L4, L6), docs/ux/accessibilita.md (sigla SIII, carte), docs/creativa/direzione-visiva.md (§4.3, §4.5, §7.4–§7.7), docs/seo/specifiche-tecniche.md, docs/seo/mappa-keyword-url.md, staging http://127.0.0.1:4321 e variante «in pubblicazione» http://127.0.0.1:4322 del 2026-10-07 (commit d06a3e9)]
---

# Testi alternativi delle immagini

Testi alternativi delle immagini del sito: i 18 file del cliente in `src/assets/images/` (9 immagini e 9 schermate dei SIII), i 9 ritagli in `src/assets/images/derivate/` (generati da `scripts/prepare-assets.mjs`) e gli slot segnaposto di `src/data/asset-slots.ts`. Ogni testo è pronto da inserire nell'attributo `alt`, o in `aria-label` / `title` dove indicato. Per le immagini già nel sito c'è il testo pubblicato, verificato sullo staging del 2026-10-07.

**Novità della v1.5 (2026-10-07).** Le 9 schermate dei SIII inviate dall'utente.
- Alt definitivi per le 5 nel sito: Home, capitolo 01; hero ed esempi di `/siii/`. Sostituiscono i provvisori del commit d06a3e9 (Differenze aperte, V2).
- Alt pronti per le 4 non usate, con e senza il nome dell'impresa nel testo accanto.
- Nuovo criterio 12, per le schermate di un'esperienza.
- Gli slot dei SIII sono coperti, come quelli delle porte di Gravina in Puglia e Monopoli, ora nel sito (commit c0b3708).
- «Altri testi alternativi» segue le carte di oggi: descrizione della Home con 5 nomi, nuova descrizione L7 della Puglia.

**Novità della v1.4 (2026-10-06).** Due nuovi file del cliente, `gravina-digitale.webp` e `monopoli-digitale.webp`, per le porte di Gravina in Puglia e Monopoli: testo alternativo per il ritaglio centrale, varianti e nota. La foto di Acquaviva è nel sito (commit d60b95f), con l'alt della prova A.

**Novità della v1.3 (2026-10-06).** Nuovo file del cliente, `acquaviva-digitale.webp`, per la porta di Acquaviva su `/puglia-digitale/`: testo alternativo per il ritaglio centrale e per gli altri due candidati, nota sotto la foto nei tre casi possibili sull'uso di AI, risposta sulla fonte.

**Novità della v1.2 (2026-10-05).** Il documento ora descrive il sito com'è.
- Nuova tabella «Nel sito», con alt e didascalie pubblicati.
- I ritagli sono quelli rigenerati da `prepare-assets.mjs`. I tre della v1.1 non esistono più: evento-panoramica, il vecchio evento-palco ed evento-quadrato.
- Negli alt delle foto dell'evento l'oratore non si nomina (B4).
- Negli slot c'è `siii-anteprima`. Non ci sono più `puglia-paesaggio`, `luogo-varese`, `luogo-altamura` e `luogo-caltanissetta`: la hero di Puglia Digitale ha la linea della costa, e le schede delle città di `/citta-digitali/` non hanno foto.
- I segnaposto vuoti sono nascosti agli screen reader, come proponevo.

**Decisioni già applicate** (ADR 002, in stato di proposta; direzione visiva §4.3):
- ritratti del fondatore solo in monocromia «inchiostro», con la nota «Immagine generata o elaborata con strumenti di intelligenza artificiale» (DR3-b, I5);
- foto dell'evento con la nota «Immagine elaborata con strumenti di intelligenza artificiale», finché non arriva l'originale dello scatto (B4).

Le immagini generate o elaborate con AI non si usano come prova di eventi, né come `image` del nodo Person (mappa SEO §1).

## Criteri

1. **Contesto prima di tutto.** L'alt dice ciò che conta dell'immagine in quel punto della pagina. Lo stesso file può avere alt diversi in pagine diverse.
2. **Niente «Immagine di» o «Foto di».** Il lettore di schermo annuncia già che si tratta di un'immagine.
3. **Una frase, con il punto finale, entro 150 caratteri circa.** Il punto crea una pausa naturale nella lettura.
4. **Niente keyword aggiunte per la SEO.** Il nome di un progetto compare solo se si vede nell'immagine o se il contesto lo dice.
5. **Nessuna ripetizione.** Se didascalia o testo accanto dicono già chi è e dove si trova, l'alt descrive solo il resto. Se non resta niente da aggiungere, `alt=""`.
6. **Immagine dentro un link che ha già un testo:** `alt=""`, altrimenti il nome del link viene letto due volte.
7. **Scritte nell'immagine.** Si riportano solo se aiutano a capire la scena e se il loro uso è autorizzato. Payoff e slogan non confermati («Digital Innovation for the Territory», «La trasformazione digitale per città, imprese e persone») non si riportano (brief A6).
8. **Immagini generate o modificate con AI.** L'alt descrive ciò che si vede e non afferma che si tratti di un evento reale.
9. **Niente «regionale».** Gli alt dell'evento dicono «evento Puglia Digitale», senza riprendere la parola «regionale» del fondale, per non suggerire un legame istituzionale (brief A2 e §4).
10. **Nome del fondatore.** «Giacomo Lenoci» viene dal profilo LinkedIn indicato nelle LG (§22) e da fonti pubbliche. [DA VERIFICARE, brief F7] Se non viene confermato, in ogni testo «Giacomo Lenoci» diventa «Il fondatore di ITnode» (a inizio frase) o «il fondatore di ITnode».
11. **Oratore delle foto dell'evento.** Non si nomina finché il cliente non conferma chi è (review di veridicità, B4; ADR 002). Vale per alt e didascalie.
12. **Schermate di un'esperienza.** Prima il luogo, poi l'interfaccia, in termini generali: «il menu», «i punti interattivi», «il pulsante di avvio», «le frecce di navigazione». Niente elenco delle icone, e nessuna funzione che la schermata non mostri. Scritte e marchi dell'impresa o di terzi non si trascrivono (criterio 7), e neppure numeri: sarebbero affermazioni.

## Nel sito (staging del 2026-10-07)

| Pagina e punto | File | Testo alternativo | Testo visibile accanto |
|---|---|---|---|
| Home, «L’evento Puglia Digitale», da desktop | `derivate/evento-panorama.jpg` | La platea dell’evento Puglia Digitale; sul maxischermo a sinistra del palco, il tour virtuale di una città vista dall’alto. | Legenda dei tre punti (copy deck della Home) e la nota «Immagine elaborata con strumenti di intelligenza artificiale» |
| Home, stesso punto, su mobile (stesso `<picture>`) | `derivate/evento-citta.jpg` | Lo stesso testo: vale per entrambi i ritagli | Come sopra |
| Home, «I tre mondi», capitolo 01 «SIII» | `siii-masseria-santella-desktop-interno.jpg` | Il SIII di Masseria Santella: una sala con la volta bianca e una porta a vetri ad arco aperta sugli altri ambienti, con il menu e i punti interattivi. | Prima: l'H3 «SIII – Siti Interattivi Immersivi» e «Spazi reali. Esperienze digitali.»; dopo: il testo del capitolo. Nessuna didascalia |
| Home, «Il fondatore» | `derivate/fondatore-ritratto.jpg`, da `fondatore-braccia-conserte.jpg` | Giacomo Lenoci a braccia conserte, in abito scuro. | Nota «Immagine generata o elaborata con strumenti di intelligenza artificiale»; nome e ruolo nella firma |
| SIII, hero | `siii-masseria-santella-mobile-sala.jpg` | Masseria Santella da smartphone: una sala con la volta bianca e una porta a vetri aperta sulla stanza accanto, con il menu e un punto interattivo. | Prima: l'H1 «SIII – Siti Interattivi Immersivi», «Non raccontare la tua azienda. Falla esplorare.» e i due link. Nessuna didascalia |
| SIII, «Esempi», Masseria Santella | `siii-masseria-santella-desktop-ingresso.jpg` | Il cancello d’ingresso tra gli alberi, in una vista a piccolo pianeta, con il pulsante di avvio e il menu dell’esperienza. | Dopo: l'H3 con il nome, luogo e portale, il testo della scheda e il link «Entra nell’esperienza ↗». Nessuna didascalia |
| SIII, «Esempi», Maison Miminà | `siii-maison-mimina-desktop-ingresso.jpg` | La vetrina su una strada alberata, in una vista a piccolo pianeta, con il pulsante di avvio e la barra con posizione, sito web e social. | Come sopra |
| SIII, «Esempi», D.L. Natura Dentro | `siii-dielle-desktop-ingresso.jpg` | Il vialetto d’ingresso tra le siepi, sotto una palma, in una vista a piccolo pianeta, con il pulsante di avvio e il menu dell’esperienza. | Come sopra |
| Puglia Digitale, sezione 2 | `derivate/evento-schermo.jpg` | La platea dell’evento Puglia Digitale davanti al maxischermo con il tour virtuale di una piazza storica. | Nota «Immagine elaborata con strumenti di intelligenza artificiale» |
| Puglia Digitale, «I luoghi», porta di Gravina in Puglia | `derivate/gravina-porta.jpg`, da `gravina-digitale.webp` | La facciata in pietra di una chiesa con un grande rosone e una finestra tonda; sopra, pannelli digitali azzurri. | Nota «Immagine elaborata digitalmente»; nome della città nel titolo della porta |
| Puglia Digitale, «I luoghi», porta di Acquaviva delle Fonti | `derivate/acquaviva-porta.jpg`, da `acquaviva-digitale.webp` | Una piazza con un palazzo sul fondo, oltre una ringhiera e uno spazio ribassato in pietra; sopra, segnaposto arancioni e pannelli digitali azzurri. | Nota «Immagine elaborata digitalmente»; nome della città nel titolo della porta |
| Puglia Digitale, «I luoghi», porta di Monopoli | `derivate/monopoli-porta.jpg`, da `monopoli-digitale.webp` | Un muro imbiancato con un balconcino rosso e una bicicletta rossa con un cesto di fiori; sopra, una fascia di pannelli digitali azzurri e segnaposto. | Nota «Immagine elaborata digitalmente»; nome della città nel titolo della porta |
| Contatti, «Persona» | `derivate/fondatore-contatti.jpg`, da `fondatore-in-piedi.jpg` | Giacomo Lenoci in abito scuro, sorridente. | Nota «Immagine generata o elaborata con strumenti di intelligenza artificiale»; nome e ruolo nell'H2 |
| Header e footer, logo | wordmark SVG (`Wordmark.astro`), non il PNG del cliente | `role="img"`, `aria-label` «ITnode» | — |
| Immagine social di tutte le pagine | `public/og/default.jpg`, tipografica: wordmark, «Esperienze digitali immersive per imprese e territori.», coordinate e orizzonte | `og:image:alt` «ITnode: esperienze digitali immersive per imprese e territori» (`src/data/pages.ts`, owner seo-technical) | — |

Note:
- Alt della foto dell'evento: per la Home è quello della review di bozze del 2026-09-28; per Puglia Digitale è quello già nel sito, registrato nella review di veridicità (P4). Corrispondono ai ritagli: li ho ricontrollati sui file il 2026-10-05. Nessuna immagine del sito sta dentro un link. Nel ritaglio di Puglia Digitale il palco e il fondale non si vedono.
- Gli alt dei ritratti sono quelli di questo documento per i casi con il nome nel testo, adattati alla monocromia: niente colori che l'immagine trattata non mostra più (`src/data/media.ts`).
- L'`og:image:alt` descrive l'immagine social di oggi, che è tipografica. La proposta della v1.1, con il fondatore sul palco, non vale più.
- **Schermate dei SIII: alt definitivi.** Nella tabella ci sono quelli della v1.5. Nel sito del 2026-10-07 (commit d06a3e9) ci sono ancora i provvisori: vanno sostituiti in `src/data/media.ts` (V2). Le schermate non hanno didascalia e non stanno dentro un link. Sopra le schermate i punti animati del sito sono nascosti.
- **Home e hero di `/siii/`.** L'alt nomina Masseria Santella, perché il testo accanto non lo fa. Non ripete «Siti Interattivi Immersivi», che è nel titolo subito prima (criterio 5). La sigla SIII è quella del testo accanto: come la leggono gli screen reader si verifica in Fase 5 (`docs/ux/accessibilita.md`).
- **Ritaglio della hero.** Da 1024 px l'immagine è 3:5, come il file; sotto è 4:5. Il ritaglio 4:5 toglie in alto parte del logo e in basso le ultime icone del menu: l'alt vale per tutti e due.
- **Esempi di `/siii/`: l'alt non nomina l'impresa.** Nel DOM l'H3 con il nome arriva subito dopo l'immagine. Ripeterlo allungherebbe la lettura di ogni scheda (criterio 5). «Siti Interattivi Immersivi» lo dice già l'introduzione della sezione.
- **Esempi di `/siii/`: «pulsante di avvio».** Descrive il simbolo play senza attribuirgli una funzione non verificata. Così non si confonde con il link «Entra nell’esperienza», che chiude la scheda.

## File del cliente (`src/assets/images/`)

### `acquaviva-digitale.webp` · 1248 × 832 px · WebP · per la porta di Acquaviva

Una piazza in pieno sole, vista da dietro una ringhiera su un muro in pietra. Sul fondo un palazzo color ocra con balconi; a destra una lunga fila di edifici in pietra e intonaco chiaro, con un lampione; a sinistra case colorate e un albero; in primo piano, uno spazio ribassato in pietra con una scala. Sulla foto c'è una grafica digitale: pannelli trasparenti azzurri con disegni e icone, segnaposto arancioni e piccole scintille di luce.

- **Provenienza.** Immagine del portale del cliente, cittàdigitali.it, incollata dall'utente il 2026-10-06 (commit fd616d6). Il file non ha metadati. Autore, data e uso di strumenti AI non sono noti: li ha chiesti la sessione principale all'utente. [DA FORNIRE]
- **Decisione dell'utente** (2026-10-06): i segni grafici restano, perché «segnano l'aspetto digitale della città». Per questo l'alt li descrive.
- **Uso.** Porta 3:5 di Acquaviva delle Fonti, sezione «I luoghi» di `/puglia-digitale/`, al posto del segnaposto `luogo-acquaviva`. **Nel sito dal commit d60b95f**: ritaglio del creative-director (x 388, y 36, 462 × 770 px sull'originale; `derivate/acquaviva-porta.jpg`), con l'alt della prova A e la nota «Immagine elaborata digitalmente» (ADR 007).
- **Indizi sull'AI** (osservati il 2026-10-06, non conclusivi). Le dimensioni, 1248 × 832 come il 1024 × 1024 delle immagini di Gravina e Monopoli, sono formati 3:2 e 1:1 comuni nell'uscita dei generatori di immagini, ma anche nei ridimensionamenti [DA VERIFICARE]. Agli angoli, ingranditi 3 volte, non c'è il segno visibile di Gemini. I pannelli contengono segni illeggibili, frequenti nella grafica generata con AI ma anche in quella disegnata. La foto sotto la grafica ha una prospettiva e un'architettura coerenti. [DA VERIFICARE con l'utente]

**Testo alternativo.** Il nome della città non si ripete, perché è nel titolo della porta, subito sotto (criterio 5). Il nome della piazza non c'è, perché non è verificato. La grafica digitale si descrive, perché per l'utente ha un significato.

| Ritaglio | alt | Caratteri |
|---|---|---|
| **Centrale** (prova B): il palazzo sul fondo, la ringhiera, il muro in pietra, la fila di edifici a destra | Una piazza con un palazzo sul fondo e una fila di edifici a destra, oltre una ringhiera; sopra, segnaposto arancioni e un pannello digitale azzurro. | 148 |
| Prova A, e i ritagli simili che il creative-director sta provando: in più lo spazio ribassato in primo piano e più pannelli | Una piazza con un palazzo sul fondo, oltre una ringhiera e uno spazio ribassato in pietra; sopra, segnaposto arancioni e pannelli digitali azzurri. | 147 |
| Prova C: la fila di edifici con il lampione, il palazzo solo in parte | Una fila di edifici in pietra e intonaco chiaro, con un lampione, oltre una ringhiera; sopra, segnaposto arancioni e pannelli digitali azzurri. | 143 |

Regole per qualunque ritaglio:
- si descrive solo ciò che il riquadro mostra, dal fondo al primo piano, poi la grafica;
- la grafica si nomina sempre per quello che c'è nel riquadro: «segnaposto arancioni», «un pannello» o «pannelli» digitali azzurri. Le scintille sono un dettaglio minore e si possono lasciare fuori;
- niente nomi di luoghi, niente «storico», «antico» o «centro storico», che non sono verificati;
- una frase, entro 150 caratteri circa.

**Nota sotto la foto.** Segue la regola dell'ADR 002: un'immagine elaborata ha una nota di trasparenza, e la nota dice solo ciò che è certo. In `label` mono sotto la foto, dentro la porta, come la nota dei ritratti; senza punto finale (tone of voice §8); letta anche dagli screen reader.

| Caso | Nota | Caratteri |
|---|---|---|
| **Adesso**, uso di AI non noto (la formula più sicura) | Immagine elaborata digitalmente | 31 |
| L'utente conferma l'AI solo per la grafica (la foto è vera) | Immagine elaborata con strumenti di intelligenza artificiale | 60 |
| L'utente conferma che l'immagine è generata con AI, foto compresa | Immagine generata con strumenti di intelligenza artificiale | 59 |
| L'utente conferma l'AI, ma non chiarisce quale parte | Immagine generata o elaborata con strumenti di intelligenza artificiale | 71 |
| Niente AI: foto vera, grafica aggiunta a mano | Foto con grafica digitale aggiunta | 34 |
| Niente AI, autore noto che chiede il credito | Foto di [DA FORNIRE: autore], con grafica digitale aggiunta | — |

- **Perché la prima è la più sicura.** È vera in ogni caso: la grafica sovrapposta è un'elaborazione digitale certa. Non afferma un uso di AI che non è dimostrato, e non lo esclude.
- **Il suo limite.** Se l'utente conferma l'AI, la nota va cambiata prima del go-live con la riga giusta della tabella. Due delle tre formule con l'AI sono già nel sito: «elaborata» per la foto dell'evento, «generata o elaborata» per i ritratti (ADR 002). «Generata» da sola vale se tutta l'immagine è sintetica.
- **Se al go-live la risposta manca.** La scelta spetta a brand-strategist, owner dell'ADR 002, con il parere del consulente legale, perché le due strade hanno rischi opposti. La formula dei ritratti, «generata o elaborata con strumenti di intelligenza artificiale», copre l'art. 50 dell'AI Act, ma affermerebbe un uso di AI non dimostrato. Restare su «elaborata digitalmente» è vero, ma potrebbe non bastare se l'AI c'è (Rischi, 3).
- **Fonte: non va nella didascalia.** L'immagine viene dal portale del cliente, quindi non è un contenuto di terzi da citare. Su `/puglia-digitale/`, poi, «cittàdigitali.it» sotto la foto legherebbe l'immagine a un altro progetto, e il rapporto tra i due è chiarito solo per l'elenco delle città. La provenienza resta qui e nel commit. Il credito serve solo se l'autore è un fotografo che lo chiede: allora vale l'ultima riga della tabella. [DA FORNIRE: autore e diritti]

### `gravina-digitale.webp` · 1024 × 1024 px · WebP · per la porta di Gravina in Puglia

Una chiesa in pietra vista di scorcio, sotto un cielo azzurro con nuvole. A sinistra una cupola; al centro la lunga fiancata con finestre strette e lo spigolo con un pinnacolo; a destra la facciata con un grande rosone, una finestra tonda e un piccolo portale sormontato da una statua; in basso, una ringhiera. Sulla foto, pannelli trasparenti azzurri con disegni e piccole luci; nessun segnaposto.

- **Provenienza.** Immagine del portale del cliente, mandata dall'utente il 2026-10-06 (commit 808c901), senza metadati. Che sia Gravina in Puglia l'ha confermato l'utente il 2026-10-06. Il nome della chiesa non si scrive: è confermata la città, non che sia la cattedrale. Autore, data e uso di AI non sono noti. [DA FORNIRE]
- **Segni grafici:** restano per decisione dell'utente, come per Acquaviva (ADR 007, v1.1).
- **Nel sito dal commit c0b3708.** Il creative-director ha scelto il ritaglio spostato a destra, con il rosone: x 444, y 30, 580 × 967 px, `derivate/gravina-porta.jpg`. Nel sito ci sono l'alt della seconda riga della tabella e la nota «Immagine elaborata digitalmente».

| Ritaglio | alt | Caratteri |
|---|---|---|
| **Centrale, a tutta altezza** | Una chiesa in pietra vista di scorcio, con una finestra tonda e un piccolo portale sormontato da una statua; sopra, pannelli digitali azzurri. | 141 |
| Spostato a destra, con il rosone | La facciata in pietra di una chiesa con un grande rosone e una finestra tonda; sopra, pannelli digitali azzurri. | 111 |
| Spostato a sinistra, con la cupola | Una chiesa in pietra con una cupola a sinistra e una lunga fiancata con finestre strette; sopra, pannelli digitali azzurri. | 122 |

### `monopoli-digitale.webp` · 1024 × 1024 px · WebP · per la porta di Monopoli

Una strada dai muri imbiancati. Al centro una bicicletta rossa con un cesto di fiori appoggiata al muro, sotto un balconcino rosso con piante; sul muro una telecamera e due insegne; a destra una porta ad arco in legno scuro; per terra, lastre di pietra. Sulla foto, una fascia di pannelli trasparenti azzurri con grafici, collegati da linee, e segnaposto arancioni.

- **Provenienza.** Come per Gravina: portale del cliente, utente, 2026-10-06 (commit 808c901), senza metadati; associazione a Monopoli confermata dall'utente il 2026-10-06. Le insegne sul muro non si trascrivono: sono illeggibili e non aiutano a capire la scena (criterio 7). Autore, data e uso di AI non sono noti. [DA FORNIRE]
- **Segni grafici:** restano per decisione dell'utente, come per Acquaviva (ADR 007, v1.1).
- **Nel sito dal commit c0b3708.** Il creative-director ha scelto un ritaglio a tutta altezza, poco a sinistra del centro: x 154, y 0, 614 × 1023 px, `derivate/monopoli-porta.jpg`. Nel sito ci sono l'alt «Centrale», che vale anche per questo ritaglio, e la nota «Immagine elaborata digitalmente».

| Ritaglio | alt | Caratteri |
|---|---|---|
| **Centrale, a tutta altezza** | Un muro imbiancato con un balconcino rosso e una bicicletta rossa con un cesto di fiori; sopra, una fascia di pannelli digitali azzurri e segnaposto. | 149 |
| Spostato a destra, con la porta ad arco | Una bicicletta rossa con un cesto di fiori contro un muro imbiancato, accanto a una porta ad arco; sopra, pannelli digitali azzurri e segnaposto. | 143 |

**Nota sotto le due foto.** «Immagine elaborata digitalmente», come per Acquaviva e per le stesse ragioni: la grafica sovrapposta è un'elaborazione certa, l'uso di AI non è noto. Con la risposta dell'utente si cambia con la tabella della sezione di Acquaviva. Stesse regole per gli alt di qualunque ritaglio: dal fondo al primo piano, poi la grafica; niente nomi di luoghi né «storico» o «antico»; una frase entro 150 caratteri circa.

### Schermate dei SIII · 9 file JPG · inviate dall'utente il 2026-10-07

Schermate delle esperienze di Masseria Santella, Maison Miminà e D.L. Natura Dentro: 4 da desktop (2000 × 1250 px, 16:10) e 5 da smartphone (1200 × 2000 px, 3:5). Ognuna mostra un luogo reale ripreso a 360° e, sopra, l'interfaccia dell'esperienza: il nome o il logo dell'impresa, i punti interattivi e un menu di icone. Secondo l'esperienza, le icone sono per informazioni, foto, video, contatti, posizione e social; in Masseria Santella c'è anche la pianta. Le tre viste da desktop dell'ingresso sono «a piccolo pianeta», con un pulsante di avvio al centro.

- **Provenienza.** Inviate dall'utente il 2026-10-07 (commit d06a3e9). Cinque sono nel sito; le altre quattro restano a disposizione del creative-director.
- **Schema degli alt** (criterio 12). Se il nome dell'impresa non è nel testo accanto: «Il SIII di [impresa]: …» per le viste da desktop, «[impresa] da smartphone: …» per quelle da smartphone. Se il nome è accanto: solo la scena, con «vista da smartphone» quando serve. Niente specie di alberi non certe: si dice «alberi», non «pini».
- **Scritte e marchi** (criterio 7). Non si trascrivono loghi e nomi delle imprese, insegne, «IL NOSTRO TEAM», la scritta dell'appartamento di Masseria Santella e i marchi di Airbnb e Booking.com, la targa di un finanziamento pubblico. «Reception» sì, perché dice che cosa sono la porta e la scala.
- **Ritratto in basso a destra.** C'è nelle cinque schermate di Masseria Santella e in quella interna di Maison Miminà: il ritratto di una donna, in un cerchio. Gli alt non lo descrivono, perché non sappiamo chi sia né a che cosa serva (Domande, 6).

| File | Che cosa mostra | Nel sito |
|---|---|---|
| `siii-masseria-santella-desktop-interno.jpg` | Una sala con la volta bianca, un muro in pietra e un mobile in legno. Al centro una porta a vetri ad arco, aperta su un corridoio in pietra; a destra una porta azzurra aperta sul giardino. Due punti interattivi | Home, capitolo 01 |
| `siii-masseria-santella-desktop-ingresso.jpg` | A piccolo pianeta: il cancello in ferro tra due pilastri bianchi, circondato da alberi alti e dal cielo. Pulsante di avvio al centro | `/siii/`, primo esempio |
| `siii-masseria-santella-mobile-sala.jpg` | Una sala con la volta bianca: una nicchia con brocche verdi e una lampada, un divanetto, un termosifone. A destra una porta a vetri ad arco, aperta sulla stanza accanto, con un punto interattivo | `/siii/`, hero |
| `siii-masseria-santella-mobile-reception.jpg` | Una facciata in pietra, con il piano di sopra in intonaco bianco e una loggia. Al centro la porta azzurra a due battenti sotto la scritta «RECEPTION»; davanti, un cortile lastricato e degli orci. Punti interattivi sulla porta e accanto | Non usata. Per la hero supera il budget dell'immagine LCP (commit d06a3e9) |
| `siii-masseria-santella-mobile-appartamento.jpg` | Un ambiente con le travi bianche a vista, una lampada in fibra intrecciata, un armadio bianco e una scala in pietra che scende. Sovrimpressi: la scritta «Appartamento deluxe con 3 camere da letto», i marchi di Airbnb e Booking.com e due frecce, una con la scritta «RECEPTION» | Non usata |
| `siii-maison-mimina-desktop-ingresso.jpg` | A piccolo pianeta: la vetrina d'angolo del negozio, con insegne, su una strada con auto e alberi. Pulsante di avvio al centro. In basso, una barra con il nome e le icone di posizione, sito web, Facebook e Instagram | `/siii/`, secondo esempio |
| `siii-maison-mimina-mobile-interno.jpg` | Una sala dal soffitto nero: una parete di piante con un'insegna luminosa, un grande divano capitonné di velluto verde, poltroncine verdi. Sul bancone bianco, le icone di telefono ed email. In basso, il logo deformato dalla proiezione e la barra con WhatsApp, posizione e Facebook | Non usata |
| `siii-dielle-desktop-ingresso.jpg` | A piccolo pianeta: un edificio bianco con il cancello d'ingresso, il vialetto tra due siepi, una palma, altri alberi e auto parcheggiate, sotto un cielo di nuvole. Pulsante di avvio al centro. In alto il logo, a sinistra il menu | `/siii/`, terzo esempio |
| `siii-dielle-mobile-ingresso.jpg` | Il vialetto tra due siepi fino al cancello in metallo, nel muro bianco con l'insegna. Dietro, un edificio bianco; a destra una palma. Sul cancello l'icona per entrare. In alto il logo, a sinistra il menu | Non usata |

**Testi alternativi.** Per le cinque nel sito, il testo è nella tabella «Nel sito». Qui ci sono gli alt per gli altri contesti, e per le quattro non usate.

| File | Contesto | alt | Caratteri |
|---|---|---|---|
| `…-santella-desktop-interno.jpg` | Nel sito | Vedi «Nel sito» | 150 |
| `…-santella-desktop-interno.jpg` | Con il nome nel testo accanto | Una sala con la volta bianca e una porta a vetri ad arco aperta sugli altri ambienti, con il menu e i punti interattivi. | 120 |
| `…-santella-desktop-ingresso.jpg` | Nel sito | Vedi «Nel sito» | 122 |
| `…-santella-desktop-ingresso.jpg` | Senza il nome accanto | Il SIII di Masseria Santella: il cancello d’ingresso tra gli alberi, in una vista a piccolo pianeta, con il pulsante di avvio e il menu. | 136 |
| `…-santella-mobile-sala.jpg` | Nel sito | Vedi «Nel sito» | 146 |
| `…-santella-mobile-sala.jpg` | Con il nome nel testo accanto | Una sala con la volta bianca e una porta a vetri aperta sulla stanza accanto, vista da smartphone, con il menu e un punto interattivo. | 134 |
| `…-santella-mobile-reception.jpg` | Senza il nome accanto | Masseria Santella da smartphone: la porta azzurra della reception in una facciata di pietra e intonaco bianco, con il menu e i punti interattivi. | 145 |
| `…-santella-mobile-reception.jpg` | Con il nome nel testo accanto | La porta azzurra della reception in una facciata di pietra e intonaco bianco, vista da smartphone, con il menu e i punti interattivi. | 133 |
| `…-santella-mobile-appartamento.jpg` | Senza il nome accanto | Masseria Santella da smartphone: un ambiente con le travi a vista e una scala in pietra verso la reception, con le frecce di navigazione e il menu. | 147 |
| `…-santella-mobile-appartamento.jpg` | Con il nome nel testo accanto | Un ambiente con le travi a vista e una scala in pietra verso la reception, visto da smartphone, con le frecce di navigazione e il menu. | 135 |
| `…-mimina-desktop-ingresso.jpg` | Nel sito | Vedi «Nel sito» | 136 |
| `…-mimina-desktop-ingresso.jpg` | Senza il nome accanto | Il SIII di Maison Miminà: la vetrina su una strada alberata, in una vista a piccolo pianeta, con il pulsante di avvio. | 118 |
| `…-mimina-mobile-interno.jpg` | Senza il nome accanto | Maison Miminà da smartphone: una sala con un divano di velluto verde e un bancone bianco con le icone di telefono ed email. | 123 |
| `…-mimina-mobile-interno.jpg` | Con il nome nel testo accanto | Una sala con un divano di velluto verde e un bancone bianco con le icone di telefono ed email, vista da smartphone. | 115 |
| `…-dielle-desktop-ingresso.jpg` | Nel sito | Vedi «Nel sito» | 137 |
| `…-dielle-desktop-ingresso.jpg` | Senza il nome accanto | Il SIII di D.L. Natura Dentro: il vialetto d’ingresso tra le siepi, sotto una palma, in una vista a piccolo pianeta, con il pulsante di avvio. | 142 |
| `…-dielle-mobile-ingresso.jpg` | Senza il nome accanto | D.L. Natura Dentro da smartphone: il vialetto tra le siepi fino al cancello d’ingresso, con l’icona per entrare e il menu. | 122 |
| `…-dielle-mobile-ingresso.jpg` | Con il nome nel testo accanto | Il vialetto tra le siepi fino al cancello d’ingresso, visto da smartphone, con l’icona per entrare e il menu. | 109 |
| Le due di D.L. Natura Dentro nello stesso `<picture>` | Un solo alt per le due sorgenti | Il vialetto d’ingresso tra le siepi, sotto una palma, con l’icona per entrare e il menu dell’esperienza. | 104 |

Gulpease degli alt della v1.5: da 52 a 62, 58 sull'insieme (obiettivo per i testi descrittivi: almeno 50). Ogni alt è una frase sola.

- **Una vista da smartphone come sorgente mobile dello stesso `<picture>`.** L'alt è uno solo e deve valere per tutte e due le sorgenti. Funziona se le due schermate mostrano lo stesso luogo, come le due di D.L. Natura Dentro: si toglie ciò che una delle due non ha, cioè la vista a piccolo pianeta e il pulsante di avvio (ultima riga). Le viste da smartphone di Masseria Santella e Maison Miminà mostrano altri ambienti, quindi non si abbinano all'ingresso da desktop.
- **Schermata dell'appartamento.** Gli alt non riportano la scritta né i marchi. Chi vede l'immagine, però, li legge. «3 camere da letto» è un'affermazione dell'impresa. I marchi di Airbnb e Booking.com dicono che dall'esperienza si prenota: è proprio ciò che la riserva I7 dell'ADR 002 lega alla conferma del cliente. Prima di usarla serve quella conferma.

### `logo-itnode.png` · 192 × 114 px · PNG

Mostra la scritta «itNode» con la «o» a forma di anello blu, su una rete di linee verdi. **Nel sito non si usa**: header e footer hanno il wordmark SVG, e il logo PNG dei dati strutturati si genera dal wordmark (`npm run brand`).

| Uso | Ruolo | alt |
|---|---|---|
| Header, link alla home | funzionale | ITnode |
| Footer, link alla home | funzionale | ITnode |
| Footer, senza link | informativo | ITnode |

Note:
- Nel sito il nome accessibile del link del logo è «ITnode», come nelle specifiche tecniche.
- Nel logo si legge «itNode», nel testo si scrive «ITnode» (tone of voice §5, brief DR1).
- [DA FORNIRE: logo vettoriale ufficiale, positivo e negativo, brief §7]

### `evento-puglia-digitale.jpg` · 1365 × 768 px · originale

Foto dell'evento. Un oratore parla sul palco davanti al fondale di Puglia Digitale, di fronte a una platea numerosa. Sui maxischermi ai lati ci sono due tour virtuali: a sinistra una città vista dall'alto con i loghi delle attività, a destra una piazza storica. Sull'immagine sono sovrapposti una cornice bianca, il marchio del progetto in alto a sinistra, una scritta in corsivo e, in basso a destra, il segno di Gemini. **Nel sito non si usa intera**: è la fonte dei quattro ritagli dell'evento.

| Uso | alt |
|---|---|
| Sconsigliato: meglio i ritagli in `derivate/` | Un oratore sul palco dell’evento Puglia Digitale, davanti a una platea numerosa; sui maxischermi, due tour virtuali di città. |

### `fondatore-braccia-conserte.jpg` · 1094 × 1438 px

Il fondatore a figura intera, a braccia conserte, in abito scuro e cravatta, sorridente. Sullo sfondo, il logo di Città Digitali e uno skyline stilizzato blu e arancione. Aspetto generato o ritoccato con AI; nessun segno visibile nell'angolo. **Nel sito** si usa il ritaglio `fondatore-ritratto.jpg` (Home).

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci, fondatore di ITnode, a braccia conserte davanti al logo di Città Digitali e a uno skyline stilizzato. |
| Sezione del fondatore in Home, con il nome nel testo | Giacomo Lenoci a braccia conserte, in abito scuro. |

### `fondatore-in-piedi.jpg` · 896 × 1178 px

Il fondatore a figura intera, in abito blu e cravatta grigia, con le mani unite davanti a sé. Stesso sfondo con il logo di Città Digitali e lo skyline stilizzato. Aspetto generato o ritoccato con AI; in basso a destra, il segno di Gemini. **Nel sito** si usa il ritaglio `fondatore-contatti.jpg` (Contatti).

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci, fondatore di ITnode, in abito blu davanti al logo di Città Digitali e a uno skyline stilizzato. |
| Con il nome nel testo, a colori | Giacomo Lenoci in abito blu, sorridente. |
| Con il nome nel testo, in monocromia (Contatti) | Giacomo Lenoci in abito scuro, sorridente. |

### `fondatore-palco-citta-digitali.jpg` · 896 × 1178 px · non usata nel sito

Il fondatore, in abito grigio, in piedi su un palco. Alle spalle, uno schermo con il logo di Città Digitali, uno skyline stilizzato e una scritta tagliata dall'inquadratura. In primo piano, persone sedute di spalle. Aspetto generato o ritoccato con AI; in basso a destra, il segno di Gemini.

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci in piedi sul palco, davanti a uno schermo con il logo di Città Digitali e uno skyline stilizzato. |
| Sezione del fondatore in Home, con il nome nel testo | In piedi sul palco, davanti allo schermo di Città Digitali. |

### `fondatore-presentazione-platea.webp` · 1536 × 1024 px · non usata nel sito

Il fondatore parla sul palco con un telecomando in mano. Alle spalle, uno schermo con il logo di Città Digitali e una scritta; ai lati, un roll-up e un leggio con lo stesso logo; in primo piano, la platea di spalle. Aspetto generato o ritoccato con AI; nessun segno visibile nell'angolo.

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci parla a una platea, davanti a uno schermo con il logo di Città Digitali. |
| Sezione del fondatore in Home, con il nome nel testo | Sul palco, davanti alla platea e allo schermo di Città Digitali. |

Le due immagini non usate mostrano il fondatore sul palco di eventi Città Digitali: valgono i Rischi 1 e 2. Se un giorno si usano, si applica la stessa nota dei ritratti (I5).

## Ritagli (`src/assets/images/derivate/`)

Generati da `scripts/prepare-assets.mjs` (`npm run assets`). Gli alt dei ritagli usati sono nella tabella «Nel sito». Le schermate dei SIII non hanno ritagli: il sito usa i file interi, e dove il riquadro ha un'altra proporzione li adatta con il CSS (note di «Nel sito»).

| File | Formato | Da | Che cosa mostra | Uso nel sito | alt |
|---|---|---|---|---|---|
| `evento-panorama.jpg` | 1272 × 560 px | `evento-puglia-digitale.jpg` | Platea, palco con l'oratore e i due maxischermi, senza cornice | Home, da desktop | Vedi «Nel sito» |
| `evento-citta.jpg` | 448 × 560 px | come sopra | Il maxischermo con la città vista dall'alto e la platea | Home, su mobile | Vedi «Nel sito» |
| `evento-schermo.jpg` | 438 × 548 px | come sopra | Il maxischermo con la piazza storica e la platea | Puglia Digitale, sezione 2 | Vedi «Nel sito» |
| `evento-palco.jpg` | 448 × 560 px | come sopra | L'oratore sul palco davanti al fondale di Puglia Digitale, e la platea | Non usato | Un oratore sul palco dell’evento Puglia Digitale, davanti alla platea. |
| `acquaviva-porta.jpg` | 462 × 770 px | `acquaviva-digitale.webp` | La piazza con il palazzo sul fondo, la ringhiera, lo spazio ribassato e la grafica digitale | Puglia Digitale, porta di Acquaviva | Vedi «Nel sito» |
| `gravina-porta.jpg` | 580 × 967 px | `gravina-digitale.webp` | La facciata della chiesa con il rosone, la finestra tonda, il piccolo portale con la statua e la grafica digitale | Puglia Digitale, porta di Gravina in Puglia | Vedi «Nel sito» |
| `monopoli-porta.jpg` | 614 × 1023 px | `monopoli-digitale.webp` | Il muro imbiancato con il balconcino rosso, la bicicletta con il cesto di fiori, la fascia di pannelli e i segnaposto | Puglia Digitale, porta di Monopoli | Vedi «Nel sito» |
| `fondatore-ritratto.jpg` | 480 × 480 px | `fondatore-braccia-conserte.jpg` | Ritratto a mezzo busto, a braccia conserte | Home, «Il fondatore» | Vedi «Nel sito» |
| `fondatore-contatti.jpg` | 420 × 560 px | `fondatore-in-piedi.jpg` | Ritratto a mezzo busto, sorridente | Contatti, «Persona» | Vedi «Nel sito» |

## Slot segnaposto

Gli id sono quelli di `src/data/asset-slots.ts`. L'alt definitivo si scrive solo dopo aver visto l'immagine. Oggi resta in attesa solo il poster del video; gli altri slot sono coperti dai file del cliente, e restano dichiarati in `asset-slots.ts`.

| Slot | Pagina | alt quando arriva l'immagine | Note |
|---|---|---|---|
| `siii-masseria-santella` | Home (capitolo 01), /siii (esempi) | Sostituito dalle schermate: `siii-masseria-santella-desktop-interno.jpg` nella Home, `siii-masseria-santella-desktop-ingresso.jpg` su /siii (vedi «Nel sito») | Le schermate non stanno dentro il link «Entra nell’esperienza»: serve l'alt. Se un giorno la scheda diventa tutta un link: `alt=""`. |
| `siii-maison-mimina` | /siii (esempi) | Sostituito dalla schermata `siii-maison-mimina-desktop-ingresso.jpg` (vedi «Nel sito») | Come sopra. |
| `siii-dielle` | /siii (esempi) | Sostituito dalla schermata `siii-dielle-desktop-ingresso.jpg` (vedi «Nel sito») | Come sopra. |
| `siii-anteprima` | /siii, hero | Sostituito dalla schermata `siii-masseria-santella-mobile-sala.jpg` (vedi «Nel sito») | Sopra la schermata, i tre nodi decorativi sono nascosti (commit d06a3e9). |
| `luogo-gravina` | /puglia-digitale (I luoghi) | Sostituito dalla foto: `derivate/gravina-porta.jpg` (vedi «Nel sito») | Ritaglio scelto dal creative-director (sezione del file). |
| `luogo-acquaviva` | /puglia-digitale (I luoghi) | Sostituito dalla foto: `derivate/acquaviva-porta.jpg` (vedi «Nel sito») | — |
| `luogo-monopoli` | /puglia-digitale (I luoghi) | Sostituito dalla foto: `derivate/monopoli-porta.jpg` (vedi «Nel sito») | Ritaglio scelto dal creative-director (sezione del file). |
| `video-poster` | /citta-digitali | Nessun alt: il poster è un attributo di `<video>`. | Oggi la copertina del video è tipografica e il poster non c'è (`preload="none"`). Se il poster viene mostrato come `<img>` prima del caricamento: `alt=""`. Il nome lo portano l'H2 «Città Digitali, in movimento.» e il pulsante di riproduzione. |

Note:
- **Segnaposto vuoti: nascosti agli screen reader.** In staging il segnaposto dichiara l'asset richiesto, con formato e contenuto, ed è `aria-hidden`. Nella variante «in pubblicazione» (`SlotPending`) è decorativo e `aria-hidden` anche lui (`Media.astro`). Nessuno screen reader annuncia un'immagine che non c'è: era la proposta della v1.1, decisa da ux-designer (`docs/ux/accessibilita.md` §2.8).
- **Il campo `alt` di `asset-slots.ts` non è il testo da pubblicare.** I segnaposto non hanno alt, quindi oggi il campo non si usa. Quando arriva un file, l'alt va preso da questa tabella: per i luoghi, per esempio, il campo contiene il solo nome della città («Monopoli»), che ripeterebbe il titolo della scheda (criterio 5). Vedi «Differenze aperte», V1.
- **Slot tolti nella v1.2.** `puglia-paesaggio`: la hero di Puglia Digitale finisce sulla linea della costa (direzione visiva §7.5). `luogo-varese`, `luogo-altamura`, `luogo-caltanissetta`: le schede delle città di `/citta-digitali/` non hanno foto (direzione visiva §7.6), e gli slot non esistono più in `asset-slots.ts`.

## Altri testi alternativi

| Elemento | Attributo | Testo |
|---|---|---|
| Carta del capitolo 03 della Home | `aria-label` della carta (`role="img"`), modello di copywriter-brand (L4) con i soli nomi disegnati a ogni larghezza (decisione di ux-designer del 2026-10-06) | Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Itri, Altamura, Cosenza e Caltanissetta. |
| Carta di `/citta-digitali/` | `aria-label` della carta (`role="img"`), testo di copywriter-brand (L6) | Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. |
| Carta della Puglia, hero di `/puglia-digitale/` | `aria-label` della carta (`role="img"`), testo di copywriter-brand (L7) | Carta della Puglia con le città di Puglia Digitale, più numerose nella provincia di Bari. Tra queste: Manfredonia, Barletta, Bari, Monopoli, Gravina in Puglia e Nardò. Un anello segna Acquaviva delle Fonti, sede di ITnode. |
| Carta della Terra di Bari (Home, capitolo 02), orizzonti (Home, Città Digitali), schermo della figura di confronto (SIII), punti animati sopra le schermate dei SIII | `aria-hidden` | Decorativi: ciò che mostrano lo dicono il testo e le didascalie accanto. I punti animati sopra le schermate sono anche nascosti alla vista |
| Video Città Digitali | `aria-labelledby` verso l'H2 della sezione | Città Digitali, in movimento. |
| Numeri di Puglia Digitale | testo visivamente nascosto | Più di 30 città coinvolte · Circa 200.000 partite IVA nei territori coinvolti · Il 60% del tessuto produttivo pugliese si trova nei territori coinvolti |
| Anteprima immersiva (predisposta, non al lancio: oggi nessuna pagina la usa) | `title` dell'iframe (`data-embed-title`) | Anteprima interattiva di Masseria Santella · Anteprima interattiva di Maison Miminà · Anteprima interattiva di D.L. Natura Dentro |

Le tre descrizioni delle carte sono costruite dagli stessi dati dei punti (`src/lib/citta-digitali.ts`) e non contengono numeri. Quando l'elenco delle città sarà in testo su `/citta-digitali/`, la descrizione di quella carta si toglie e la carta torna `aria-hidden` (copy deck di Città Digitali, sezione 2).

## Verifica sul sito (2026-10-07)

**Metodo.** Staging http://127.0.0.1:4321, build del commit d06a3e9 (nessun file di `src/` più recente di `dist/`), e variante «in pubblicazione» su http://127.0.0.1:4322.
- Con Playwright (Chromium) ho letto le 8 pagine: tutti gli `img` con alt e didascalia, ogni elemento con `role="img"`, i segnaposto, il video e l'`og:image:alt`.
- Su `/` e `/siii/` ho letto l'albero di accessibilità, a 1440 e 390 px, per vedere che cosa c'è prima e dopo ogni schermata, e il riquadro in cui la schermata è mostrata.
- Ho guardato le 9 schermate originali, gli screenshot di controllo della sessione principale e i ritagli di Gravina e Monopoli.
- La verifica precedente, del 2026-10-05, era sulla build del commit 5c4a6cb.

**Esito.**
- Gli alt pubblicati descrivono le immagini che li usano.
- Nessuna immagine informativa è senza alt, e nessun segnaposto è esposto agli screen reader.
- La variante «in pubblicazione» ha le stesse schermate e gli stessi alt.
- Restano da applicare gli alt definitivi delle schermate (V2).

**Differenze aperte.**

| # | Dove | Differenza | Proposta | Chi decide |
|---|---|---|---|---|
| V1 | `src/data/asset-slots.ts`, campo `alt` degli slot | Contiene testi che non sono quelli di questo documento, per esempio il solo nome della città per i luoghi. Oggi non si usa | Quando si collega un file, prendere l'alt da qui. Nessuna modifica necessaria finché i file non arrivano | Sessione principale |
| V2 | `src/data/media.ts`, alt delle 5 schermate dei SIII | Sono i provvisori del commit d06a3e9: più lunghi di 150 caratteri, con «Sito Interattivo Immersivo» ripetuto dopo il titolo, «pini» e «palme» non certi, e il «pulsante per entrare nell’esperienza» | Sostituirli con quelli della tabella «Nel sito» | Sessione principale |
| V3 | `docs/contenuti/copy-deck/siii.md` (v1.2) | Descrive le schermate come mancanti: slot `siii-anteprima` nella hero, «Le schermate mancano» negli esempi | Allineare il copy deck alle schermate nel sito | copywriter-content, con il prossimo incarico |
| V4 | `docs/contenuti/copy-deck/home.md`, descrizione della carta del capitolo 03 | Riporta la versione con 9 nomi; il sito ha quella con i soli 5 nomi disegnati a ogni larghezza | Allineare il copy deck al sito | copywriter-brand |

## Rischi

1. **Immagini generate o modificate con AI** (brief §0.3). Tre immagini su cinque hanno in basso a destra il segno visibile che Gemini applica alle immagini create o modificate con la sua app: `evento-puglia-digitale.jpg`, `fondatore-in-piedi.jpg` e `fondatore-palco-citta-digitali.jpg`. L'ho verificato su ritagli ingranditi degli angoli. Le altre due foto del fondatore hanno lo stesso aspetto. Anche la foto dell'evento, indicata come reale, è quindi passata da uno strumento di AI: almeno per cornice e scritte, forse per altro. Nel sito ritratti e foto dell'evento hanno la nota di trasparenza (ADR 002).
2. **Veridicità (soglia 1).** Le foto mostrano il fondatore sul palco di eventi Città Digitali, con platea, ma non abbiamo documentazione di quegli eventi. Se non sono avvenuti così, le immagini diventano prove non vere. Gli alt descrivono ciò che si vede senza affermare che l'evento sia reale, ma l'immagine comunica comunque quel messaggio. Le due foto sul palco di Città Digitali oggi non sono nel sito.
3. **Obbligo di trasparenza.** Dal 2 agosto 2026 si applica l'art. 50 del Regolamento UE 2024/1689 (AI Act). Chi pubblica immagini generate o manipolate con AI che somigliano a persone, oggetti, luoghi o eventi esistenti, e che possono sembrare autentiche, deve dichiararne l'origine artificiale (par. 4; definizione di «deep fake» all'art. 3, punto 60). Riguarda anche i luoghi: per l'immagine di Acquaviva conta, se nella foto c'è AI. I ritagli eliminano il segno visibile, ma non l'eventuale obbligo. La nota oggi nel sito risponde a questo rischio. [DA VERIFICARE con il consulente legale: se la nota basta]
4. **Persone riconoscibili in platea** (brief A4; B4; condizione C07 del verdetto G4). Servono l'informativa sulle riprese o le liberatorie. Altrimenti ui-designer stringe i ritagli su schermi e palco, senza profili riconoscibili.
5. **Richiesta al cliente** (brief D9). Indicare quali foto sono scatti reali non alterati e fornire l'originale della foto dell'evento, senza cornice né modifiche, con data, luogo e autore. Se possibile, fornire anche ritratti reali del fondatore.
6. **Immagini dei luoghi** (Acquaviva delle Fonti, Gravina in Puglia, Monopoli). Autore, data, diritti e uso di AI non sono noti. La nota «Immagine elaborata digitalmente» è vera, ma va rivista con la risposta (sezione di Acquaviva). La risoluzione è più bassa della specifica dello slot: un ritaglio 3:5 è alto 770–1023 px, contro i 2400 px di `asset-slots.ts`. Lo valutano il creative-director e web-performance-specialist.
7. **Consenso delle imprese degli esempi** (ADR 002, A7). Le schermate di Masseria Santella, Maison Miminà e D.L. Natura Dentro sono nel sito dal commit d06a3e9, anche nella variante «in pubblicazione». La riserva A7 le subordina al consenso delle tre imprese. Senza consenso, si torna alla variante «in pubblicazione», con nomi e link. [DA VERIFICARE: consenso, e in che forma]
8. **Scritte e marchi nelle schermate.** Gli alt non trascrivono numeri né marchi, ma chi vede le schermate li legge. Le cinque nel sito mostrano solo loghi, nomi e insegne delle imprese. La schermata dell'appartamento mostrerebbe anche «3 camere da letto» e i marchi di due siti di prenotazione (sezione delle schermate; ADR 002, I7).
9. **Ritratto nelle schermate.** Nelle schermate di Masseria Santella e in quella interna di Maison Miminà c'è il ritratto di una donna, in un cerchio in basso a destra. Se è una persona reale, servono le stesse garanzie delle persone riconoscibili (Rischio 4). Se è un'immagine generata con AI, brand-strategist valuta se serve una nota, come per i ritratti (ADR 002).

## Ipotesi da validare

- [DA VERIFICARE: la persona nelle foto è Giacomo Lenoci, fondatore di ITnode (F7)]
- [IPOTESI: la foto dell'evento Puglia Digitale è reale nella scena e nelle persone, ed è stata modificata con AI solo per cornice e scritte (brief I7)]
- [IPOTESI: le schermate dei SIII mostrano le esperienze come sono pubblicate oggi. Se un'esperienza cambia, la schermata e il suo alt vanno rifatti.]

## Domande aperte

1. Quali immagini sono fotografie reali, e quali sono generate o modificate con AI (D9)?
2. Il cliente ha l'originale della foto dell'evento, con data, luogo e autore (A4, B4)?
3. Le persone in platea sono state informate delle riprese, o ci sono le liberatorie (C07)?
4. Immagine di Acquaviva: chi è l'autore, quando è stata fatta, chi ha i diritti, e se la foto o la grafica sono state fatte con strumenti di AI? Il cliente vuole un credito sotto la foto?
5. Masseria Santella, Maison Miminà e D.L. Natura Dentro hanno dato il consenso a mostrare le schermate delle loro esperienze (A7)?
6. Chi è la donna nel ritratto in basso a destra delle schermate di Masseria Santella e di Maison Miminà, e che cosa fa nell'esperienza?

## Decisioni richieste

- **Utente, con il consulente legale del cliente**: se la nota di trasparenza basta per l'art. 50 dell'AI Act (ADR 002).
- **Sessione principale**: alt definitivi delle schermate in `src/data/media.ts` (V2). Quando arrivano altri file, prendere gli alt da questo documento (V1).
- **Utente, con brand-strategist** (owner dell'ADR 002): consenso delle tre imprese degli esempi (A7). Senza, variante «in pubblicazione».
- **creative-director**: se usa una schermata da smartphone nello stesso `<picture>` di una da desktop, l'alt è uno solo. Per D.L. Natura Dentro è nella tabella delle schermate; per le altre serve una nuova proposta.
- **brand-strategist, con il consulente legale**: la nota delle immagini dei luoghi se al go-live manca la risposta sull'AI.

## Fonti consultate

Consultate il 2026-09-28, salvo dove indicato. Il 2026-10-07 non ho consultato nuove fonti web.

- Segno visibile e SynthID sulle immagini create o modificate con Gemini: https://support.google.com/gemini/answer/17405358 · https://blog.google/products/gemini/updated-image-editing-model/
- AI Act, art. 50 e art. 113 (applicazione dal 2 agosto 2026): https://eur-lex.europa.eu/eli/reg/2024/1689/oj · https://www.agendadigitale.eu/sicurezza/obblighi-di-trasparenza-ai-act-cosa-devono-fare-le-aziende-dal-2-agosto-2026/
- Formati d'uscita di un generatore di immagini, 1024 × 1024 per l'1:1 e 1248 × 832 per il 3:2 (indizio sull'AI delle immagini dei luoghi), consultata il 2026-10-06: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-image
- Giacomo Lenoci e ITNODE SRL: https://www.linkedin.com/in/giacomo-lenoci/ (titolo del profilo nei risultati di ricerca) · https://www.dnb.com/business-directory/company-profiles.itnode_srl.4bfa0c62ba90f9b5adfcece44bd5a18e.html
