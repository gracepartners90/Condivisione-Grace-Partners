---
titolo: Testi alternativi delle immagini
owner: copywriter-content
contributi: [ux-designer, seo-content, seo-technical, copywriter-brand]
stato: in revisione
versione: 1.1
aggiornato: 2026-09-28
fonti: [src/assets/images/, src/data/asset-slots.ts, src/components/ui/Media.astro, src/scripts/immersive.ts, docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/seo/specifiche-tecniche.md, docs/seo/mappa-keyword-url.md]
---

# Testi alternativi delle immagini

Testi alternativi dei 6 asset disponibili, dei 3 ritagli in `src/assets/images/derivate/` e degli slot segnaposto di `src/data/asset-slots.ts`. Ogni testo è pronto da inserire nell'attributo `alt`, o in `aria-label` / `title` dove indicato.

**Prima dell'uso.** Le quattro immagini del fondatore e la foto dell'evento sono sospese alla decisione DR3 del brief consolidato (§0.3). Proposta del brief: usare solo la foto reale dell'evento finché non arrivano ritratti reali. Le immagini generate o elaborate con AI non si usano come prova di eventi, né come `image` del nodo Person (mappa SEO §1). Questo file dà i testi alternativi per qualunque decisione, senza anticiparla.

## Criteri

1. **Contesto prima di tutto.** L'alt dice ciò che conta dell'immagine in quel punto della pagina. Lo stesso file può avere alt diversi in pagine diverse.
2. **Niente «Immagine di» o «Foto di».** Il lettore di schermo annuncia già che si tratta di un'immagine.
3. **Una frase, con il punto finale, entro 150 caratteri circa.** Il punto crea una pausa naturale nella lettura.
4. **Niente keyword aggiunte per la SEO.** Il nome di un progetto compare solo se si vede nell'immagine.
5. **Nessuna ripetizione.** Se didascalia o testo accanto dicono già chi è e dove si trova, l'alt descrive solo il resto. Se non resta niente da aggiungere, `alt=""`.
6. **Immagine dentro un link che ha già un testo:** `alt=""`, altrimenti il nome del link viene letto due volte.
7. **Scritte nell'immagine.** Si riportano solo se aiutano a capire la scena e se il loro uso è autorizzato. Payoff e slogan non confermati («Digital Innovation for the Territory», «La trasformazione digitale per città, imprese e persone») non si riportano (brief A6).
8. **Immagini generate o modificate con AI.** L'alt descrive ciò che si vede e non afferma che si tratti di un evento reale.
9. **Niente «regionale».** Gli alt dell'evento dicono «evento Puglia Digitale», senza riprendere la parola «regionale» del fondale, per non suggerire un legame istituzionale (brief A2 e §4).
10. **Nome del fondatore.** «Giacomo Lenoci» viene dal profilo LinkedIn indicato nelle LG (§22) e da fonti pubbliche. [DA VERIFICARE, brief F7] Se non viene confermato, in ogni testo «Giacomo Lenoci» diventa «Il fondatore di ITnode» (a inizio frase) o «il fondatore di ITnode».

## Asset disponibili

### `logo-itnode.png` · 192 × 114 px · PNG

Mostra la scritta «itNode» con la «o» a forma di anello blu, su una rete di linee verdi.

| Uso | Ruolo | alt |
|---|---|---|
| Header, link alla home | funzionale | ITnode |
| Footer, link alla home | funzionale | ITnode |
| Footer, senza link | informativo | ITnode |

Note:
- Le specifiche tecniche (§ testo alternativo) indicano `alt="ITnode"`; la mappa SEO propone come nome accessibile del link «ITnode, home». Entrambe rispettano WCAG 2.4.4: decide ux-designer. Qui vale la specifica tecnica.
- Nel logo si legge «itNode», nel testo si scrive «ITnode» (tone of voice §5, brief DR1).
- Con 192 px di larghezza il PNG è al limite sugli schermi ad alta densità. [DA FORNIRE: logo in SVG, brief §7]

### `evento-puglia-digitale.jpg` · 1365 × 768 px · originale

Foto reale dell'evento. Il fondatore parla sul palco davanti al fondale di Puglia Digitale, di fronte a una platea numerosa. Sui maxischermi ai lati ci sono due tour virtuali: a sinistra una città vista dall'alto con i loghi delle attività, a destra una piazza storica. Sull'immagine sono sovrapposti una cornice bianca, il marchio del progetto in alto a sinistra, una scritta in corsivo e, in basso a destra, il segno di Gemini.

| Uso | alt |
|---|---|
| Sconsigliato: meglio i ritagli in `derivate/` | Giacomo Lenoci sul palco dell’evento Puglia Digitale, davanti a una platea numerosa; sui maxischermi, due tour virtuali di città. |

### `derivate/evento-panoramica.jpg` · 1277 × 560 px · ritaglio senza cornice

| Uso | alt |
|---|---|
| Puglia Digitale, con la didascalia del copy deck (che nomina già il fondatore) | Platea numerosa davanti al palco di Puglia Digitale; sui maxischermi ai lati, una città vista dall’alto e una piazza storica in tour virtuale. |
| Qualsiasi pagina, senza didascalia | Giacomo Lenoci parla sul palco dell’evento Puglia Digitale davanti a una platea numerosa; sui maxischermi, due tour virtuali. |

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

Il fondatore parla sul palco con un telecomando in mano. Alle spalle, uno schermo con il logo di Città Digitali e una scritta; ai lati, un roll-up e un leggio con lo stesso logo; in primo piano, la platea di spalle. Aspetto generato o ritoccato con AI; nessun segno visibile nell'angolo.

| Uso | alt |
|---|---|
| Senza testo accanto che lo nomini | Giacomo Lenoci parla a una platea, davanti a uno schermo con il logo di Città Digitali. |
| Sezione del fondatore in Home, con il nome nel testo | Sul palco, davanti alla platea e allo schermo di Città Digitali. |

## Slot segnaposto

Gli id sono quelli di `src/data/asset-slots.ts`. L'alt definitivo si scrive solo dopo aver visto l'immagine: qui ci sono lo schema da seguire e le regole d'uso.

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

**Slot ancora vuoti.** Oggi `Media.astro` espone il segnaposto con `role="img"` e, come `aria-label`, l'alt dell'immagine futura: un lettore di schermo annuncerebbe un'immagine che non c'è. Propongo, finché lo slot è vuoto, `aria-hidden="true"` sul segnaposto, oppure un'etichetta che dichiari l'assenza, per esempio «Fotografia di Monopoli in arrivo». Decide ux-designer.

## Altri testi alternativi

| Elemento | Attributo | Testo |
|---|---|---|
| Anteprima immersiva, Masseria Santella | `title` dell'iframe (`data-embed-title`) | Anteprima interattiva di Masseria Santella |
| Anteprima immersiva, Maison Miminà | `title` dell'iframe | Anteprima interattiva di Maison Miminà |
| Anteprima immersiva, D.L. Natura Dentro | `title` dell'iframe | Anteprima interattiva di D.L. Natura Dentro |
| Video Città Digitali | `aria-labelledby` verso l'H2 della sezione | Città Digitali, in movimento. |
| Numeri di Puglia Digitale | testo visivamente nascosto | Più di 30 città coinvolte · Circa 200.000 partite IVA nei territori coinvolti · Il 60% del tessuto produttivo pugliese |

L'`og:image:alt` è nelle specifiche tecniche di seo-technical (§ Open Graph). Se il nome del fondatore viene confermato, può diventare: «Giacomo Lenoci sul palco dell’evento Puglia Digitale, davanti a una platea numerosa.».

## Rischi

1. **Immagini generate o modificate con AI** (brief §0.3). Tre immagini su cinque hanno in basso a destra il segno visibile che Gemini applica alle immagini create o modificate con la sua app: `evento-puglia-digitale.jpg`, `fondatore-in-piedi.jpg` e `fondatore-palco-citta-digitali.jpg`. L'ho verificato su ritagli ingranditi degli angoli. Le altre due foto del fondatore hanno lo stesso aspetto. Anche la foto dell'evento, indicata come reale, è quindi passata da uno strumento di AI: almeno per cornice e scritte, forse per altro.
2. **Veridicità (soglia 1).** Le foto mostrano il fondatore sul palco di eventi Città Digitali, con platea, ma non abbiamo documentazione di quegli eventi. Se non sono avvenuti così, le immagini diventano prove non vere. Gli alt descrivono ciò che si vede senza affermare che l'evento sia reale, ma l'immagine comunica comunque quel messaggio.
3. **Obbligo di trasparenza.** Dal 2 agosto 2026 si applica l'art. 50 del Regolamento UE 2024/1689 (AI Act). Chi pubblica immagini generate o manipolate con AI che somigliano a persone o eventi reali, e che possono sembrare autentiche, deve dichiararne l'origine artificiale (par. 4). I ritagli in `derivate/` eliminano il segno visibile, ma non l'eventuale obbligo. [DA VERIFICARE con il consulente legale del cliente] Se l'obbligo si applica, testo proposto per la didascalia: «Immagine elaborata con l’intelligenza artificiale.»
4. **Persone riconoscibili in platea** (brief A4). Servono liberatorie o l'informativa dell'evento. Altrimenti si usa un ritaglio senza volti riconoscibili.
5. **Richiesta al cliente** (brief D9). Indicare quali foto sono scatti reali non alterati e fornire l'originale della foto dell'evento, senza cornice né modifiche, con data e luogo. Se possibile, fornire anche ritratti reali del fondatore.

## Ipotesi da validare

- [DA VERIFICARE: la persona nelle foto è Giacomo Lenoci, fondatore di ITnode (F7)]
- [IPOTESI: la foto dell'evento Puglia Digitale è reale nella scena e nelle persone, ed è stata modificata con AI solo per cornice e scritte (brief I7)]

## Domande aperte

1. Quali immagini sono fotografie reali, e quali sono generate o modificate con AI (D9)?
2. Il cliente ha l'originale della foto dell'evento, con data e luogo (A4)?
3. Le liberatorie delle persone in platea sono disponibili?

## Decisioni richieste

- **Utente, sentito creative-director** (DR3): quali immagini del fondatore usare. Con il consulente legale del cliente: eventuale dichiarazione in didascalia.
- **ux-designer**: nome accessibile del logo («ITnode» o «ITnode, home») e comportamento degli slot vuoti.

## Fonti consultate

Consultate il 2026-09-28.

- Segno visibile e SynthID sulle immagini create o modificate con Gemini: https://support.google.com/gemini/answer/17405358 · https://blog.google/products/gemini/updated-image-editing-model/
- AI Act, art. 50 e art. 113 (applicazione dal 2 agosto 2026): https://eur-lex.europa.eu/eli/reg/2024/1689/oj · https://www.agendadigitale.eu/sicurezza/obblighi-di-trasparenza-ai-act-cosa-devono-fare-le-aziende-dal-2-agosto-2026/
- Giacomo Lenoci e ITNODE SRL: https://www.linkedin.com/in/giacomo-lenoci/ (titolo del profilo nei risultati di ricerca) · https://www.dnb.com/business-directory/company-profiles.itnode_srl.4bfa0c62ba90f9b5adfcece44bd5a18e.html
