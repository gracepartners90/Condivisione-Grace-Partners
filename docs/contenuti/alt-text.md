---
titolo: Testi alternativi delle immagini
owner: copywriter-content
contributi: [ux-designer, seo-content, seo-technical, copywriter-brand]
stato: in revisione
versione: 1.3
aggiornato: 2026-10-06
fonti: [src/assets/images/ (con acquaviva-digitale.webp, fornita dall'utente il 2026-10-06), decisione dell'utente del 2026-10-06 sui segni grafici, prove di ritaglio del creative-director (scratchpad, non versionate), scripts/prepare-assets.mjs, src/data/asset-slots.ts, src/data/media.ts, src/components/ui/Media.astro, src/components/ui/SlotPending.astro, src/pages/index.astro, src/pages/puglia-digitale.astro, src/pages/contatti.astro, src/data/pages.ts, src/scripts/immersive.ts, docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/decisioni/002-veridicita-staging-e-immagini-ai.md, docs/review/2026-09-28-sito-veridicita-brand-strategist.md (B4), docs/review/2026-09-28-sito-bozze-copywriter-content.md, docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (L4, L6), docs/creativa/direzione-visiva.md (§4.3, §4.5, §7.4–§7.7), docs/seo/specifiche-tecniche.md, docs/seo/mappa-keyword-url.md, staging http://localhost:4321 del 2026-10-05 (commit 5c4a6cb)]
---

# Testi alternativi delle immagini

Testi alternativi delle immagini del sito: i 7 file del cliente in `src/assets/images/`, i 6 ritagli in `src/assets/images/derivate/` (generati da `scripts/prepare-assets.mjs`) e gli slot segnaposto di `src/data/asset-slots.ts`. Ogni testo è pronto da inserire nell'attributo `alt`, o in `aria-label` / `title` dove indicato. Per le immagini già nel sito c'è il testo pubblicato, verificato sullo staging del 2026-10-05.

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

## Nel sito (staging del 2026-10-05)

| Pagina e punto | File | Testo alternativo | Testo visibile accanto |
|---|---|---|---|
| Home, «L’evento Puglia Digitale», da desktop | `derivate/evento-panorama.jpg` | La platea dell’evento Puglia Digitale; sul maxischermo a sinistra del palco, il tour virtuale di una città vista dall’alto. | Legenda dei tre punti (copy deck della Home) e la nota «Immagine elaborata con strumenti di intelligenza artificiale» |
| Home, stesso punto, su mobile (stesso `<picture>`) | `derivate/evento-citta.jpg` | Lo stesso testo: vale per entrambi i ritagli | Come sopra |
| Home, «Il fondatore» | `derivate/fondatore-ritratto.jpg`, da `fondatore-braccia-conserte.jpg` | Giacomo Lenoci a braccia conserte, in abito scuro. | Nota «Immagine generata o elaborata con strumenti di intelligenza artificiale»; nome e ruolo nella firma |
| Puglia Digitale, sezione 2 | `derivate/evento-schermo.jpg` | La platea dell’evento Puglia Digitale davanti al maxischermo con il tour virtuale di una piazza storica. | Nota «Immagine elaborata con strumenti di intelligenza artificiale» |
| Contatti, «Persona» | `derivate/fondatore-contatti.jpg`, da `fondatore-in-piedi.jpg` | Giacomo Lenoci in abito scuro, sorridente. | Nota «Immagine generata o elaborata con strumenti di intelligenza artificiale»; nome e ruolo nell'H2 |
| Header e footer, logo | wordmark SVG (`Wordmark.astro`), non il PNG del cliente | `role="img"`, `aria-label` «ITnode» | — |
| Immagine social di tutte le pagine | `public/og/default.jpg`, tipografica: wordmark, «Esperienze digitali immersive per imprese e territori.», coordinate e orizzonte | `og:image:alt` «ITnode: esperienze digitali immersive per imprese e territori» (`src/data/pages.ts`, owner seo-technical) | — |

Note:
- Alt della foto dell'evento: per la Home è quello della review di bozze del 2026-09-28; per Puglia Digitale è quello già nel sito, registrato nella review di veridicità (P4). Corrispondono ai ritagli: li ho ricontrollati sui file il 2026-10-05. Nessuna immagine del sito sta dentro un link. Nel ritaglio di Puglia Digitale il palco e il fondale non si vedono.
- Gli alt dei ritratti sono quelli di questo documento per i casi con il nome nel testo, adattati alla monocromia: niente colori che l'immagine trattata non mostra più (`src/data/media.ts`).
- L'`og:image:alt` descrive l'immagine social di oggi, che è tipografica. La proposta della v1.1, con il fondatore sul palco, non vale più.

## File del cliente (`src/assets/images/`)

### `acquaviva-digitale.webp` · 1248 × 832 px · WebP · per la porta di Acquaviva

Una piazza in pieno sole, vista da dietro una ringhiera su un muro in pietra. Sul fondo un palazzo color ocra con balconi; a destra una lunga fila di edifici in pietra e intonaco chiaro, con un lampione; a sinistra case colorate e un albero; in primo piano, uno spazio ribassato in pietra con una scala. Sulla foto c'è una grafica digitale: pannelli trasparenti azzurri con disegni e icone, segnaposto arancioni e piccole scintille di luce.

- **Provenienza.** Immagine del portale del cliente, cittàdigitali.it, incollata dall'utente il 2026-10-06 (commit fd616d6). Il file non ha metadati. Autore, data e uso di strumenti AI non sono noti: li ha chiesti la sessione principale all'utente. [DA FORNIRE]
- **Decisione dell'utente** (2026-10-06): i segni grafici restano, perché «segnano l'aspetto digitale della città». Per questo l'alt li descrive.
- **Uso.** Porta 3:5 di Acquaviva delle Fonti, sezione «I luoghi» di `/puglia-digitale/`, al posto del segnaposto `luogo-acquaviva`. Il ritaglio lo sceglie il creative-director. Non è ancora nel sito.
- **Indizi sull'AI** (osservati il 2026-10-06, non conclusivi). Agli angoli, ingranditi 3 volte, non c'è il segno visibile di Gemini. I pannelli contengono segni illeggibili, frequenti nella grafica generata con AI ma anche in quella disegnata. La foto sotto la grafica ha una prospettiva e un'architettura coerenti. [DA VERIFICARE con l'utente]

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

Generati da `scripts/prepare-assets.mjs` (`npm run assets`). Gli alt dei ritagli usati sono nella tabella «Nel sito».

| File | Formato | Da | Che cosa mostra | Uso nel sito | alt |
|---|---|---|---|---|---|
| `evento-panorama.jpg` | 1272 × 560 px | `evento-puglia-digitale.jpg` | Platea, palco con l'oratore e i due maxischermi, senza cornice | Home, da desktop | Vedi «Nel sito» |
| `evento-citta.jpg` | 448 × 560 px | come sopra | Il maxischermo con la città vista dall'alto e la platea | Home, su mobile | Vedi «Nel sito» |
| `evento-schermo.jpg` | 438 × 548 px | come sopra | Il maxischermo con la piazza storica e la platea | Puglia Digitale, sezione 2 | Vedi «Nel sito» |
| `evento-palco.jpg` | 448 × 560 px | come sopra | L'oratore sul palco davanti al fondale di Puglia Digitale, e la platea | Non usato | Un oratore sul palco dell’evento Puglia Digitale, davanti alla platea. |
| `fondatore-ritratto.jpg` | 480 × 480 px | `fondatore-braccia-conserte.jpg` | Ritratto a mezzo busto, a braccia conserte | Home, «Il fondatore» | Vedi «Nel sito» |
| `fondatore-contatti.jpg` | 420 × 560 px | `fondatore-in-piedi.jpg` | Ritratto a mezzo busto, sorridente | Contatti, «Persona» | Vedi «Nel sito» |

## Slot segnaposto

Gli id sono quelli di `src/data/asset-slots.ts`. L'alt definitivo si scrive solo dopo aver visto l'immagine: qui ci sono lo schema da seguire e le regole d'uso.

| Slot | Pagina | alt quando arriva l'immagine | Note |
|---|---|---|---|
| `siii-masseria-santella` | Home (capitolo 01), /siii (esempi) | Masseria Santella nel suo Sito Interattivo Immersivo: [DA FORNIRE: ambiente inquadrato], con i punti interattivi. | Nel sito la schermata non sta dentro il link «Entra nell’esperienza»: serve l'alt. Se un giorno la scheda diventa tutta un link: `alt=""`. |
| `siii-maison-mimina` | /siii (esempi) | Maison Miminà nel suo Sito Interattivo Immersivo: [DA FORNIRE: ambiente inquadrato], con i punti interattivi. | Come sopra. |
| `siii-dielle` | /siii (esempi) | D.L. Natura Dentro nel suo Sito Interattivo Immersivo: [DA FORNIRE: ambiente inquadrato], con i punti interattivi. | Come sopra. |
| `siii-anteprima` | /siii, hero | [DA FORNIRE: nome dell'esperienza] su smartphone: [DA FORNIRE: ambiente inquadrato], con i punti interattivi. | Un'esperienza SIII vista da smartphone, in verticale. Se la schermata viene da uno dei tre esempi, l'alt lo nomina. I tre nodi sovrapposti sono decorativi. |
| `luogo-gravina` | /puglia-digitale (I luoghi) | [Soggetto della foto], senza ripetere il nome della città. | Il nome della città è già nel titolo della scheda, subito accanto. La foto non sta dentro il link «Esplora». |
| `luogo-acquaviva` | /puglia-digitale (I luoghi) | Il file c'è: `acquaviva-digitale.webp`, con alt e nota nella sezione «File del cliente» | Il segnaposto resta finché la sessione principale non collega il ritaglio scelto dal creative-director. |
| `luogo-monopoli` | /puglia-digitale (I luoghi) | [Soggetto della foto], senza ripetere il nome della città. | Come sopra. |
| `video-poster` | /citta-digitali | Nessun alt: il poster è un attributo di `<video>`. | Oggi la copertina del video è tipografica e il poster non c'è (`preload="none"`). Se il poster viene mostrato come `<img>` prima del caricamento: `alt=""`. Il nome lo portano l'H2 «Città Digitali, in movimento.» e il pulsante di riproduzione. |

Note:
- **Segnaposto vuoti: nascosti agli screen reader.** In staging il segnaposto dichiara l'asset richiesto, con formato e contenuto, ed è `aria-hidden`. Nella variante «in pubblicazione» (`SlotPending`) è decorativo e `aria-hidden` anche lui (`Media.astro`). Nessuno screen reader annuncia un'immagine che non c'è: era la proposta della v1.1, decisa da ux-designer (`docs/ux/accessibilita.md` §2.8).
- **Il campo `alt` di `asset-slots.ts` non è il testo da pubblicare.** I segnaposto non hanno alt, quindi oggi il campo non si usa. Quando arriva un file, l'alt va preso da questa tabella: per i luoghi, per esempio, il campo contiene il solo nome della città («Monopoli»), che ripeterebbe il titolo della scheda (criterio 5). Vedi «Differenze aperte», V1.
- **Slot tolti nella v1.2.** `puglia-paesaggio`: la hero di Puglia Digitale finisce sulla linea della costa (direzione visiva §7.5). `luogo-varese`, `luogo-altamura`, `luogo-caltanissetta`: le schede delle città di `/citta-digitali/` non hanno foto (direzione visiva §7.6), e gli slot non esistono più in `asset-slots.ts`.

## Altri testi alternativi

| Elemento | Attributo | Testo |
|---|---|---|
| Carta del capitolo 03 della Home | `aria-label` della carta (`role="img"`), testo di copywriter-brand (L4) | Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Manfredonia, Itri, Bari, Altamura, Massafra, Cosenza, Caltanissetta e Caltagirone. |
| Carta di `/citta-digitali/` | `aria-label` della carta (`role="img"`), testo di copywriter-brand (L6) | Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. |
| Linea della costa (Puglia Digitale), orizzonti (Home, Città Digitali), schermo della figura di confronto (SIII) | `aria-hidden` | Decorativi: ciò che mostrano lo dicono il testo e le didascalie accanto |
| Video Città Digitali | `aria-labelledby` verso l'H2 della sezione | Città Digitali, in movimento. |
| Numeri di Puglia Digitale | testo visivamente nascosto | Più di 30 città coinvolte · Circa 200.000 partite IVA nei territori coinvolti · Il 60% del tessuto produttivo pugliese si trova nei territori coinvolti |
| Anteprima immersiva (non al lancio) | `title` dell'iframe (`data-embed-title`) | Anteprima interattiva di Masseria Santella · Anteprima interattiva di Maison Miminà · Anteprima interattiva di D.L. Natura Dentro |

Le due descrizioni delle carte sono costruite dagli stessi dati dei punti (`src/lib/citta-digitali.ts`) e non contengono numeri. Quando l'elenco delle città sarà in testo su `/citta-digitali/`, la descrizione di quella carta si toglie e la carta torna `aria-hidden` (copy deck di Città Digitali, sezione 2).

## Verifica sul sito (2026-10-05)

**Metodo.** Staging http://localhost:4321, build che corrisponde al commit 5c4a6cb. Ho letto con Playwright (Chromium) le 8 pagine: tutti gli `img` con alt e didascalia, ogni elemento con `role="img"`, i segnaposto, il video e l'`og:image:alt`. Poi ho confrontato i file in `derivate/` con le immagini.

**Esito.** Gli alt pubblicati descrivono i ritagli che li usano. Nessuna immagine informativa è senza alt, e nessun segnaposto è esposto agli screen reader. Questo documento ora coincide con il sito.

**Differenze aperte.**

| # | Dove | Differenza | Proposta | Chi decide |
|---|---|---|---|---|
| V1 | `src/data/asset-slots.ts`, campo `alt` degli slot | Contiene testi che non sono quelli di questo documento, per esempio il solo nome della città per i luoghi. Oggi non si usa | Quando si collega un file, prendere l'alt da qui. Nessuna modifica necessaria finché i file non arrivano | Sessione principale |

## Rischi

1. **Immagini generate o modificate con AI** (brief §0.3). Tre immagini su cinque hanno in basso a destra il segno visibile che Gemini applica alle immagini create o modificate con la sua app: `evento-puglia-digitale.jpg`, `fondatore-in-piedi.jpg` e `fondatore-palco-citta-digitali.jpg`. L'ho verificato su ritagli ingranditi degli angoli. Le altre due foto del fondatore hanno lo stesso aspetto. Anche la foto dell'evento, indicata come reale, è quindi passata da uno strumento di AI: almeno per cornice e scritte, forse per altro. Nel sito ritratti e foto dell'evento hanno la nota di trasparenza (ADR 002).
2. **Veridicità (soglia 1).** Le foto mostrano il fondatore sul palco di eventi Città Digitali, con platea, ma non abbiamo documentazione di quegli eventi. Se non sono avvenuti così, le immagini diventano prove non vere. Gli alt descrivono ciò che si vede senza affermare che l'evento sia reale, ma l'immagine comunica comunque quel messaggio. Le due foto sul palco di Città Digitali oggi non sono nel sito.
3. **Obbligo di trasparenza.** Dal 2 agosto 2026 si applica l'art. 50 del Regolamento UE 2024/1689 (AI Act). Chi pubblica immagini generate o manipolate con AI che somigliano a persone, oggetti, luoghi o eventi esistenti, e che possono sembrare autentiche, deve dichiararne l'origine artificiale (par. 4; definizione di «deep fake» all'art. 3, punto 60). Riguarda anche i luoghi: per l'immagine di Acquaviva conta, se nella foto c'è AI. I ritagli eliminano il segno visibile, ma non l'eventuale obbligo. La nota oggi nel sito risponde a questo rischio. [DA VERIFICARE con il consulente legale: se la nota basta]
4. **Persone riconoscibili in platea** (brief A4; B4; condizione C07 del verdetto G4). Servono l'informativa sulle riprese o le liberatorie. Altrimenti ui-designer stringe i ritagli su schermi e palco, senza profili riconoscibili.
5. **Richiesta al cliente** (brief D9). Indicare quali foto sono scatti reali non alterati e fornire l'originale della foto dell'evento, senza cornice né modifiche, con data, luogo e autore. Se possibile, fornire anche ritratti reali del fondatore.
6. **Immagine di Acquaviva.** Autore, data, diritti e uso di AI non sono noti. La nota «Immagine elaborata digitalmente» è vera, ma va rivista con la risposta (sezione del file). La risoluzione è più bassa della specifica dello slot: un ritaglio 3:5 è alto 832 px, contro i 2400 px di `asset-slots.ts`. Lo valutano il creative-director e web-performance-specialist.

## Ipotesi da validare

- [DA VERIFICARE: la persona nelle foto è Giacomo Lenoci, fondatore di ITnode (F7)]
- [IPOTESI: la foto dell'evento Puglia Digitale è reale nella scena e nelle persone, ed è stata modificata con AI solo per cornice e scritte (brief I7)]

## Domande aperte

1. Quali immagini sono fotografie reali, e quali sono generate o modificate con AI (D9)?
2. Il cliente ha l'originale della foto dell'evento, con data, luogo e autore (A4, B4)?
3. Le persone in platea sono state informate delle riprese, o ci sono le liberatorie (C07)?
4. Immagine di Acquaviva: chi è l'autore, quando è stata fatta, chi ha i diritti, e se la foto o la grafica sono state fatte con strumenti di AI? Il cliente vuole un credito sotto la foto?

## Decisioni richieste

- **Utente, con il consulente legale del cliente**: se la nota di trasparenza basta per l'art. 50 dell'AI Act (ADR 002).
- **Sessione principale**: quando arrivano i file degli slot, prendere gli alt da questo documento (V1).
- **creative-director**: ritaglio della foto di Acquaviva. Se non è il centrale, l'alt è nella tabella della sezione del file, o segue le sue regole.
- **brand-strategist, con il consulente legale**: la nota della foto di Acquaviva se al go-live manca la risposta sull'AI.

## Fonti consultate

Consultate il 2026-09-28. Il 2026-10-05 non ho consultato nuove fonti web.

- Segno visibile e SynthID sulle immagini create o modificate con Gemini: https://support.google.com/gemini/answer/17405358 · https://blog.google/products/gemini/updated-image-editing-model/
- AI Act, art. 50 e art. 113 (applicazione dal 2 agosto 2026): https://eur-lex.europa.eu/eli/reg/2024/1689/oj · https://www.agendadigitale.eu/sicurezza/obblighi-di-trasparenza-ai-act-cosa-devono-fare-le-aziende-dal-2-agosto-2026/
- Giacomo Lenoci e ITNODE SRL: https://www.linkedin.com/in/giacomo-lenoci/ (titolo del profilo nei risultati di ricerca) · https://www.dnb.com/business-directory/company-profiles.itnode_srl.4bfa0c62ba90f9b5adfcece44bd5a18e.html
