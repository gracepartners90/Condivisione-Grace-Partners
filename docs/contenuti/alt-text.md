---
titolo: Testi alternativi delle immagini
owner: copywriter-content
contributi: [ux-designer, seo-content, copywriter-brand]
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [src/assets/images/, src/data/asset-slots.ts, src/components/ui/Media.astro, src/scripts/immersive.ts, docs/brief/linee-guida.md]
---

# Testi alternativi delle immagini

Testi alternativi dei 6 asset disponibili, dei 3 ritagli già creati in `src/assets/images/derivate/` e degli slot segnaposto elencati in `src/data/asset-slots.ts`. Ogni testo è pronto da inserire nell'attributo `alt`, o in `aria-label` / `title` dove indicato.

## Criteri

1. **Contesto prima di tutto.** L'alt dice ciò che conta dell'immagine in quel punto della pagina. Lo stesso file può avere alt diversi in pagine diverse.
2. **Niente «Immagine di» o «Foto di».** Il lettore di schermo annuncia già che si tratta di un'immagine.
3. **Una frase, con il punto finale, entro 150 caratteri circa.** Il punto crea una pausa naturale nella lettura.
4. **Niente keyword aggiunte per la SEO.** Il nome di un progetto compare solo se si vede nell'immagine.
5. **Nessuna ripetizione.** Se didascalia o testo accanto dicono già chi è e dove si trova, l'alt descrive solo il resto. Se non resta niente da aggiungere, `alt=""`.
6. **Immagine dentro un link che ha già un testo.** `alt=""`, altrimenti il nome del link viene letto due volte.
7. **Scritte nell'immagine** (fondali, slogan): si riportano solo se aiutano a capire la scena.
8. **Immagini generate o modificate con AI.** L'alt descrive ciò che si vede e non afferma che si tratti di un evento reale (vedi Rischi).
9. **Nome del fondatore.** «Giacomo Lenoci» viene dal profilo LinkedIn indicato nelle linee guida (sez. 22) e da fonti pubbliche. [DA VERIFICARE] Se non viene confermato, in ogni testo sostituire «Giacomo Lenoci» con «Il fondatore di ITnode» (o «il fondatore di ITnode» a metà frase).

## Asset disponibili

### `logo-itnode.png` · 192 × 114 px · PNG

Mostra la scritta «itNode» con la «o» a forma di anello blu, su una rete di linee verdi.

| Uso | Ruolo | alt |
|---|---|---|
| Header, link alla Home | funzionale | ITnode – Home |
| Footer, link alla Home | funzionale | ITnode – Home |
| Footer, senza link | informativo | ITnode |

Note:
- Nel logo si legge «itNode», le linee guida scrivono «ITnode». L'alt usa la grafia delle linee guida. Da fissare nel glossario con copywriter-brand.
- Con 192 px di larghezza il PNG è al limite sugli schermi ad alta densità. [DA FORNIRE: logo in formato SVG]

### `evento-puglia-digitale.jpg` · 1365 × 768 px · originale

Foto reale dell'evento: il fondatore parla sul palco davanti al fondale «Puglia Digitale – Evento regionale digitale – Puglia», con una platea numerosa. Sui maxischermi ai lati, due tour virtuali: a sinistra una città vista dall'alto con i loghi delle attività, a destra una piazza storica. L'immagine ha una cornice bianca, il marchio del progetto in alto a sinistra, la scritta «Digital Innovation for the Territory» e, in basso a destra, il segno di Gemini.

| Uso | alt |
|---|---|
| Sconsigliato: usare i ritagli in `derivate/` | Giacomo Lenoci sul palco dell’evento Puglia Digitale, davanti a una platea numerosa; sui maxischermi, due tour virtuali di città. |

### `derivate/evento-panoramica.jpg` · 1277 × 560 px · ritaglio senza cornice

| Uso | alt |
|---|---|
| Puglia Digitale, sezione 3, con la didascalia del copy deck (che nomina già fondatore ed evento) | Platea numerosa davanti al palco di Puglia Digitale; sui maxischermi ai lati, una città vista dall’alto e una piazza storica in tour virtuale. |
| Qualsiasi pagina, senza didascalia | Giacomo Lenoci parla sul palco dell’evento regionale Puglia Digitale davanti a una platea numerosa; sui maxischermi, due tour virtuali. |

### `derivate/evento-palco.jpg` · 942 × 500 px · ritaglio

| Uso | alt |
|---|---|
| Senza didascalia | Giacomo Lenoci sul palco di Puglia Digitale; accanto, su un maxischermo, il tour virtuale di una piazza storica. |
| Con la didascalia del copy deck | Il palco di Puglia Digitale e, sul maxischermo, il tour virtuale di una piazza storica. |

### `derivate/evento-quadrato.jpg` · 560 × 560 px · ritaglio

| Uso | alt |
|---|---|
| Senza didascalia | Giacomo Lenoci parla alla platea dell’evento Puglia Digitale, con il logo del progetto alle spalle. |
| Accanto a un testo che lo nomina | Sul palco dell’evento Puglia Digitale, davanti a una platea numerosa. |

### `fondatore-palco-citta-digitali.jpg` · 896 × 1178 px

Il fondatore, in abito grigio, in piedi su un palco. Alle spalle, uno schermo con il logo di Città Digitali, uno skyline stilizzato e una scritta tagliata dall'inquadratura. In primo piano, persone sedute di spalle. Aspetto generato o ritoccato con AI; in basso a destra, il segno di Gemini.

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci in piedi sul palco, davanti a uno schermo con il logo di Città Digitali e uno skyline stilizzato. |
| Sezione del fondatore in Home, con il nome nel testo | In piedi sul palco, davanti allo schermo di Città Digitali. |

### `fondatore-braccia-conserte.jpg` · 1094 × 1438 px

Il fondatore a figura intera, a braccia conserte, in abito scuro e cravatta, sorridente. Sullo sfondo, il logo di Città Digitali e uno skyline stilizzato blu e arancione. Aspetto generato o ritoccato con AI; nessun segno visibile nell'angolo.

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci, fondatore di ITnode, a braccia conserte davanti al logo di Città Digitali e a uno skyline stilizzato. |
| Sezione del fondatore in Home, con il nome nel testo | Giacomo Lenoci a braccia conserte, in abito scuro. |

### `fondatore-in-piedi.jpg` · 896 × 1178 px

Il fondatore a figura intera, in abito blu e cravatta grigia, con le mani unite davanti a sé. Stesso sfondo con il logo di Città Digitali e lo skyline stilizzato. Aspetto generato o ritoccato con AI; in basso a destra, il segno di Gemini.

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci, fondatore di ITnode, in abito blu davanti al logo di Città Digitali e a uno skyline stilizzato. |
| Sezione del fondatore in Home, con il nome nel testo | Giacomo Lenoci in abito blu, sorridente. |

### `fondatore-presentazione-platea.webp` · 1536 × 1024 px

Il fondatore parla sul palco con un telecomando in mano. Alle spalle, lo schermo di Città Digitali con la frase «La trasformazione digitale per città, imprese e persone» e le parole «Innovazione · Sostenibilità · Opportunità». Ai lati, un roll-up e un leggio con il logo di Città Digitali; in primo piano, la platea di spalle. Aspetto generato o ritoccato con AI; nessun segno visibile nell'angolo.

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci parla a una platea; alle spalle, lo schermo di Città Digitali: «La trasformazione digitale per città, imprese e persone». |
| Sezione del fondatore in Home, con il nome nel testo | Sul palco, davanti alla platea e allo schermo di Città Digitali. |

## Slot segnaposto

Gli id sono quelli di `src/data/asset-slots.ts`. L'alt definitivo si scrive solo dopo aver visto l'immagine: qui ci sono lo schema da seguire e l'alt da usare nel codice.

| Slot | Pagina | alt quando arriva l'immagine | Note |
|---|---|---|---|
| `siii-masseria-santella` | /siii | Masseria Santella nel suo Sito Interattivo Immersivo: [DA FORNIRE: ambiente inquadrato], con i punti interattivi. | Se l'immagine è dentro il link della scheda: `alt=""`. |
| `siii-maison-mimina` | /siii | Maison Miminà nel suo Sito Interattivo Immersivo: [DA FORNIRE: ambiente inquadrato], con i punti interattivi. | Come sopra. |
| `siii-dielle` | /siii | D.L. Natura Dentro nel suo Sito Interattivo Immersivo: [DA FORNIRE: ambiente inquadrato], con i punti interattivi. | Come sopra. |
| `puglia-paesaggio` | /puglia-digitale, hero | [Luogo]: [soggetto], [dettaglio che lo rende riconoscibile]. | L'alt attuale «Paesaggio pugliese» è troppo generico: va nominato il luogo reale della foto. |
| `luogo-monopoli` | /puglia-digitale | [Soggetto della foto], senza ripetere «Monopoli». | Il nome della città è già nel titolo della scheda. Se tutta la scheda è un link: `alt=""`. |
| `luogo-acquaviva` | /puglia-digitale | [Soggetto della foto], senza ripetere il nome della città. | Come sopra. |
| `luogo-gravina` | /puglia-digitale | [Soggetto della foto], senza ripetere il nome della città. | Come sopra. |
| `luogo-varese` | /citta-digitali | [Soggetto della foto], senza ripetere il nome della città. | Come sopra. |
| `luogo-altamura` | /citta-digitali | [Soggetto della foto], senza ripetere il nome della città. | Come sopra. |
| `luogo-caltanissetta` | /citta-digitali | [Soggetto della foto], senza ripetere il nome della città. | Come sopra. |
| `video-poster` | /citta-digitali | Nessun alt: il poster è un attributo di `<video>`. | Se il poster viene mostrato come `<img>` prima del caricamento: `alt=""`. Il nome lo portano l'H2 «Città Digitali, in movimento.» e il pulsante di riproduzione. |

**Slot ancora vuoti.** `Media.astro` oggi espone il segnaposto con `role="img"` e come `aria-label` l'alt dell'immagine futura. Un lettore di schermo annuncerebbe così un'immagine che non c'è. Propongo, finché lo slot è vuoto, `aria-hidden="true"` sul segnaposto, oppure un'etichetta che dichiari l'assenza, per esempio «Fotografia di Monopoli in arrivo». Decisione di ux-designer.

## Altri testi alternativi

| Elemento | Attributo | Testo |
|---|---|---|
| Anteprima immersiva, Masseria Santella | `title` dell'iframe (`data-embed-title`) | Anteprima interattiva di Masseria Santella |
| Anteprima immersiva, Maison Miminà | `title` dell'iframe | Anteprima interattiva di Maison Miminà |
| Anteprima immersiva, D.L. Natura Dentro | `title` dell'iframe | Anteprima interattiva di D.L. Natura Dentro |
| Video Città Digitali | `aria-labelledby` verso l'H2 della sezione | Città Digitali, in movimento. |
| Open Graph, se l'immagine condivisa è `evento-panoramica.jpg` | `og:image:alt` | Giacomo Lenoci sul palco dell’evento Puglia Digitale, davanti a una platea numerosa. |

## Rischi

1. **Immagini generate o modificate con AI.** Tre immagini su cinque hanno in basso a destra il segno visibile che Gemini applica alle immagini create o modificate con la sua app: `evento-puglia-digitale.jpg`, `fondatore-in-piedi.jpg` e `fondatore-palco-citta-digitali.jpg` (verificato su ritagli ingranditi degli angoli). Le altre due foto del fondatore hanno lo stesso aspetto. Anche la foto dell'evento, indicata come reale, è quindi passata da uno strumento di AI: almeno per la cornice e le scritte, forse per altro.
2. **Veridicità (soglia 1).** Le foto mostrano il fondatore sul palco di eventi Città Digitali, con platea. Se quegli eventi non sono avvenuti così, le immagini diventano prove non vere. I testi alternativi descrivono ciò che si vede senza affermare che l'evento sia reale, ma l'immagine comunica comunque quel messaggio.
3. **Obbligo di trasparenza.** Dal 2 agosto 2026 si applica l'art. 50 del Regolamento UE 2024/1689 (AI Act). Chi pubblica immagini generate o manipolate con AI che somigliano a persone o eventi reali, e che possono sembrare autentiche, deve dichiararne l'origine artificiale (par. 4). I ritagli in `derivate/` eliminano il segno visibile, ma non l'eventuale obbligo. [DA VERIFICARE con il consulente legale del cliente] Se l'obbligo si applica, testo proposto per la didascalia: «Immagine elaborata con l’intelligenza artificiale.»
4. **Richiesta al cliente.** Indicare quali foto sono scatti reali non alterati e fornire l'originale della foto dell'evento, senza cornice e senza modifiche. Se possibile, fornire foto reali del fondatore da usare nella sezione dedicata.

## Ipotesi da validare

- [DA VERIFICARE: la persona nelle foto è Giacomo Lenoci, fondatore di ITnode]
- [IPOTESI: la foto dell'evento Puglia Digitale è reale nella scena e nelle persone, ed è stata modificata con AI solo per cornice e scritte]

## Domande aperte

1. Quali immagini sono fotografie reali, e quali sono generate o modificate con AI?
2. Il cliente ha l'originale della foto dell'evento?
3. Grafia ufficiale del marchio: «ITnode» (linee guida) o «itNode» (logo)?

## Decisioni richieste

- **Cliente, con il proprio consulente legale**: uso delle immagini elaborate con AI ed eventuale dichiarazione in didascalia.
- **ux-designer**: comportamento accessibile degli slot vuoti.

## Fonti consultate

Consultate il 2026-09-28.

- Segno visibile e SynthID sulle immagini create o modificate con Gemini: https://support.google.com/gemini/answer/17405358 · https://blog.google/products/gemini/updated-image-editing-model/
- AI Act, art. 50 e art. 113 (applicazione dal 2 agosto 2026): https://eur-lex.europa.eu/eli/reg/2024/1689/oj · https://www.agendadigitale.eu/sicurezza/obblighi-di-trasparenza-ai-act-cosa-devono-fare-le-aziende-dal-2-agosto-2026/
- Giacomo Lenoci e ITNODE SRL: https://www.linkedin.com/in/giacomo-lenoci/ (titolo del profilo nei risultati di ricerca) · https://www.dnb.com/business-directory/company-profiles.itnode_srl.4bfa0c62ba90f9b5adfcece44bd5a18e.html
