---
titolo: Struttura delle pagine e form di contatto
owner: ux-designer
contributi: [creative-director, ui-designer, cro-specialist, copywriter-brand, copywriter-content, seo-content, seo-technical]
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/contenuti/copy-deck/, docs/contenuti/alt-text.md, docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md, docs/seo/specifiche-tecniche.md, docs/seo/mappa-keyword-url.md, docs/seo/dati-strutturati.md, src/scripts/, src/data/, src/components/]
---

# Struttura delle pagine e form di contatto

**Come si legge.** Per ogni pagina ci sono l'outline dei titoli e poi le sezioni nell'ordine del DOM, che coincide con l'ordine di lettura su mobile. Ogni sezione indica: scopo · contenuti · componente (LG §30) e variante · desktop · mobile · interazione e accessibilità.

**Fonti dei contenuti.**
- I testi sono nei copy deck (`docs/contenuti/copy-deck/`). Qui si citano solo quando decidono la struttura.
- Gli H1 sono quelli di `mappa-keyword-url.md` (seo-content).
- Ritmo, scala e trattamenti spettano al creative-director (`docs/creativa/direzione-visiva.md`) e a ui-designer. Qui ci sono solo struttura e comportamento.

## 0. Regole comuni

1. **Ordine.** Il DOM segue l'ordine di lettura mobile. Su desktop la griglia sposta i blocchi ma non ne cambia l'ordine: niente `order` né `row-reverse` su blocchi con link o pulsanti (1.3.2, 2.4.3).
2. **Titoli.**
   - Un solo H1, nella hero.
   - Gli statement grandi che non danno il titolo a una sezione sono `<p>`: la dimensione visiva non decide il livello.
   - Eyebrow e numeri dei capitoli non sono titoli; i numeri hanno `aria-hidden="true"`, perché l'ordine lo dà la lista (`<ol>`).
   - I componenti con titolo ricevono il livello come proprietà (`as`).
3. **Headline su mobile: la parola più lunga deve stare nella colonna a 320 px** (reflow, 1.4.10).
   - Misure in Chromium: Inter 700, tracking −0,02 em, margini laterali di 20 px. Con Inter 600 e Liberation Sans 700 i valori cambiano di ±2 px.

   | Parola più lunga (dove) | Larghezza | Corpo max a 320 px | a 360 px | a 390 px |
   |---|---|---|---|---|
   | «un’esperienza.» (H2 di chiusura SIII) | 6,96 em | 40 px | 45 px | 50 px |
   | «l’innovazione.» (H2 fondatore) | 6,57 em | 42 px | 48 px | 53 px |
   | «all’entroterra.» (H2 Puglia Digitale) | 6,35 em | 44 px | 50 px | 55 px |
   | «accompagna» (H1 home) | 6,13 em | 45 px | 52 px | 57 px |
   | «Interagisci.» (H2 esempi SIII) | 5,25 em | 53 px | 60 px | 66 px |
   | «~200.000» (Stats) | 4,75 em | 58 px | 67 px | 73 px |
   | «Interattivi» (H1 SIII, seconda riga) | 4,49 em | 62 px | 71 px | 77 px |

   - I minimi «indicativi» delle LG (64 px per l'H1, 44 px per i titoli di sezione) sotto i 400 px vanno abbassati: l'H1 della home a 64 px esce dalla colonna anche a 390 px.
   - Si ricalcola con il font scelto (script di misura riusabile, vedi `accessibilita.md` §3).
   - Ogni dimensione fluida contiene una parte in `rem`, mai solo `vw` (1.4.4).
   - `overflow-wrap: break-word` solo come rete di sicurezza. Niente `hyphens: auto` sui titoli display.
4. **Sticky, caroselli, scroll.**
   - Sezioni sticky solo con viewport di almeno 1024 × 720 px, e con l'elemento sticky più basso del viewport meno l'header. Su mobile diventano flusso normale.
   - Niente caroselli a scorrimento orizzontale, niente scroll-jacking, niente sezioni «pinned» che trasformano lo scroll verticale in movimento orizzontale.
   - Il form non sta mai dentro una sezione sticky.
5. **Motion e JavaScript.**
   - Tutto il contenuto è visibile senza JavaScript e con `prefers-reduced-motion: reduce`: lo fa già `reveal.ts`.
   - Il text reveal anima righe o parole, mai lettere singole.
6. **Link esterni** (esperienze, portali, luoghi, LinkedIn, mappa).
   - Nuova scheda con `rel="noopener"`, senza `noreferrer`.
   - Freccia `↗` con `aria-hidden`.
   - Testo visivamente nascosto con destinazione e «(si apre in una nuova scheda)».
   - Esempio: `Esplora<span class="visually-hidden"> Monopoli su monopolidigitale.it (si apre in una nuova scheda)</span><span aria-hidden="true"> ↗</span>`.
   - I link interni restano nella stessa scheda. Nei copy deck alcune CTA esterne hanno `→`: diventano `↗` (convenzione di cro-specialist).
7. **Visual mancanti.**
   - Ogni slot ha un rapporto d'aspetto fisso (niente CLS) e passa da `Media.astro` con l'id di `asset-slots.ts`.
   - Nessuna immagine stock o generata.
   - Gli slot vuoti non si annunciano come immagini: vedi `accessibilita.md` §2.8.
8. **Niente griglie di card.** Capitoli, liste numerate, composizioni. Stessi componenti, variante diversa per pagina (§6).

## 1. Home `/`

```text
H1  La tecnologia cambia. La curiosità ci accompagna da sempre.
H2  ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.
H2  [DA SCRIVERE: titolo dei tre mondi, ≤ 45 caratteri]
    H3  SIII · H3  Puglia Digitale · H3  Città Digitali
H2  36 anni dentro l’innovazione. E ancora la stessa curiosità.
    H3  una per tappa della timeline (o nessuna: vedi HM-4)
H2  [DA SCRIVERE: titolo della chiusura, ≤ 60 caratteri]
```

### HM-1 · Hero — `Hero` variante `home`
- **Scopo.** Far sentire il concetto (spazio fisico → spazio digitale → persone → imprese → territorio) nei primi secondi. La hero «respira».
- **Contenuti.**
  - H1 verbatim.
  - Elemento visivo o di motion su spazio e territorio, scelto dal creative-director tra materiali reali: brief §7 P3 (brevi clip dei tour senza audio) o un estratto muto del video di Città Digitali `[DA FORNIRE: file]`. Qui niente foto del fondatore.
  - `[IPOTESI]` Riga descrittiva facoltativa di ≤ 70 caratteri, che dica la categoria (esperienze digitali immersive per imprese e territori): aiuta il test dei 5 secondi. Decidono creative-director e cro-specialist.
  - Nessuna CTA commerciale (strategia di conversione §4).
- **Desktop.** H1 su 2–3 righe alla scala massima, visual accanto o dietro il testo. La hero non supera l'altezza del viewport e lascia intravedere l'inizio della sezione successiva, così si capisce che la pagina continua.
- **Mobile.**
  - L'H1 viene prima del visual ed è interamente visibile nel primo viewport, a 360 × 640 e a 390 × 844.
  - Corpo dell'H1 secondo §0.3: circa 45 px a 320 px e 57 px a 390 px.
  - Visual sotto l'H1, oppure come sfondo con velatura.
- **Interazione e accessibilità.**
  - Visual decorativo (`alt=""` o `aria-hidden`).
  - Se si muove da solo per più di 5 s, serve un pulsante di pausa oppure un movimento legato allo scroll. Con reduce resta fermo su un fotogramma.
  - L'H1 è il candidato LCP su mobile: nessun visual pesante prima di lui.

### HM-2 · Manifesto — `LargeStatement` variante `manifesto`
- **Scopo.** Dire chi è ITnode subito dopo la hero. È la frase con «grande importanza» (LG §07).
- **Contenuti.**
  - H2 verbatim.
  - Paragrafo di sintesi, nella formulazione provvisoria del brief §2.4 finché D1 è aperta. I nomi «Città Digitali» e «Puglia Digitale» sono link interni.
  - Concetto in evidenza come secondo statement `<p>`: «Una nuova infrastruttura digitale per connettere imprese, cittadini e visitatori.».
  - Facoltativo: la catena spazio fisico → spazio digitale → persone → imprese → territorio come elemento tipografico, in testo reale con le frecce `aria-hidden`.
- **Desktop.** Statement alla scala dei titoli di sezione, allineato a sinistra. Sintesi in una colonna stretta e sfalsata, concetto a scala intermedia.
- **Mobile.** Statement → sintesi → concetto, con paragrafi brevi.
- **Accessibilità.** Le maschere del text reveal (`overflow: hidden`) si tolgono a fine animazione, altrimenti con spaziature del testo aumentate le righe restano tagliate (1.4.12).

### HM-3 · I tre mondi — `SectionIntro` + `ProjectShowcase` variante `chapter` (×3)
- **Scopo.** Far capire che SIII, Puglia Digitale e Città Digitali sono tre applicazioni della stessa visione. È lo snodo verso le tre pagine.
- **Contenuti per capitolo.**
  - Numero 01–03 e nome (H3).
  - Statement verbatim (LG §08).
  - Microdescrizione `[DA SCRIVERE: ≤ 160 caratteri]`.
  - CTA interna: «Esplora SIII →», «Scopri Puglia Digitale →», «Esplora Città Digitali →». Nessun link esterno (strategia di conversione §4).
  - **Visual**
    - 01: slot `siii-masseria-santella` (stessa schermata dello showcase);
    - 02: `derivate/evento-quadrato.jpg` o `evento-panoramica.jpg` (vedi il rischio sulla provenienza);
    - 03: slot `video-poster`.
- **Desktop.**
  - Tre capitoli grandi, non tre card, ognuno con una composizione diversa (alternanza e scala: creative-director).
  - Dentro ogni capitolo, numero o visual possono essere sticky.
- **Mobile.** Per ogni capitolo: numero + nome → statement → visual → microdescrizione → CTA a tutta larghezza. Niente sticky, niente swipe.
- **Interazione e accessibilità.**
  - I capitoli sono un `<ol>`.
  - Il link vero è la CTA. Se anche il visual è cliccabile, è un duplicato con `tabindex="-1"` e `aria-hidden="true"`.
  - Nessuna informazione che compaia solo al passaggio del mouse.

### HM-4 · Fondatore — `FounderTimeline`
- **Scopo.** Credibilità e continuità: 36 anni di innovazione che arrivano a ITnode, e un volto.
- **Contenuti.**
  - H2 verbatim.
  - Racconto in 2–3 paragrafi brevi `[DA FORNIRE: testo originale del fondatore]`.
  - Timeline.
  - Citazione di chiusura verbatim in `<blockquote>`.
  - Attribuzione visibile: nome, ruolo e link «Giacomo Lenoci su LinkedIn ↗» `[DA VERIFICARE: nome e ruolo, brief F7]`. Nome, ruolo e link visibili sono le condizioni per il markup Person (`dati-strutturati.md` §7).
- **Ritratto.**
  - Dipende da DR3 (brief), che è una decisione dell'utente.
  - La composizione deve funzionare anche senza ritratto, per esempio con il ritaglio `derivate/evento-palco.jpg`, e senza presentare come eventi reali le scene con palco e platea.
- **Timeline.**
  - `<ol>` di tappe, ognuna con periodo (facoltativo, in `<time>` se c'è una data), titolo e dettaglio di ≤ 120 caratteri.
  - Le tappe sono quelle delle LG §09, nell'ordine e con i dubbi del brief §6.
  - «10.000+ clienti» si attribuisce solo alle aziende precedenti, mai a ITnode (brief N5).
  - Se le tappe restano brevi, sono voci della lista senza H3, per non riempire di titoli la navigazione del lettore di schermo.
- **Desktop.**
  - Composizione editoriale, non «foto a sinistra, biografia a destra» (LG §09).
  - Timeline orizzontale solo se tutte le tappe stanno nel viewport senza scorrimento orizzontale; altrimenti verticale, con il ritratto sticky.
- **Mobile.** Ritratto → testo → timeline verticale → citazione. Nessun elemento sticky.
- **Accessibilità.** La linea e l'avanzamento legato allo scroll sono decorativi (`aria-hidden`) e restano fermi con reduce. L'alt del ritratto è in `alt-text.md` e non dà per reale un evento non documentato.

### HM-5 · Chiusura — `CTASection` variante `band`
- **Scopo.** Il passo successivo per chi arriva in fondo. In home niente form: le LG lo prevedono solo nelle pagine di linea e in Contatti.
- **Contenuti.**
  - Titolo `[DA SCRIVERE]`.
  - CTA «Parliamone →» verso `/contatti/`.
  - Telefono ed email come alternative (strategia di conversione §4).
- **Mobile.** CTA a tutta larghezza, poi telefono ed email come righe alte almeno 44 px.

## 2. SIII `/siii/`

```text
H1  SIII · Siti Interattivi Immersivi            (due righe nello stesso H1)
H2  Il sito diventa un luogo.                    (#cos-e)
H2  Un tour 360° è una visita. Un SIII è un sito. (#tour-360-o-siii)
H2  Una visita che diventa azione.               (#cosa-puoi-fare)
H2  Cosa cambia per la tua impresa.              (#benefici)  → H3 ×4
H2  Entra. Esplora. Interagisci.                 (#esempi)    → H3 ×3
H2  La tua azienda può diventare un’esperienza.  (chiusura)
    H3  [titolo del form, dal copy deck]         (#richiesta)
H2  Continua a esplorare                         [PROPOSTA]
```
I testi dei titoli sono quelli del copy deck SIII; qui interessano i livelli.

### SI-1 · Hero — `Hero` variante `line` (con breadcrumb)
- **Contenuti.**
  - Breadcrumb Home / SIII.
  - Eyebrow.
  - H1 su due righe: `<h1>SIII <span>Siti Interattivi Immersivi</span></h1>`.
  - Statement `<p>`.
  - CTA primaria «Esplora gli esempi ↓» → `#esempi`.
  - Link secondario «Richiedi un’offerta ↓» → `#richiesta`.
  - Visual: slot `siii-masseria-santella`, oppure `ImmersivePreview` variante `poster`.
- **Desktop.** «SIII» alla scala massima (quattro caratteri: può essere enorme). La seconda riga dell'H1 e lo statement vanno su scale diverse. Visual grande.
- **Mobile.** Breadcrumb → eyebrow → H1 → statement → CTA → visual.

### SI-2 · Che cos'è il SIII — `SectionIntro` + `LargeStatement`
- **Scopo.** Definizione della pagina: autosufficiente e citabile.
- **Struttura.** La definizione sta subito sotto l'H2, senza elementi in mezzo (copy deck SIII §2).
- **Mobile.** Stesso ordine; colonna di testo di massimo 70 caratteri circa su desktop.

### SI-3 · Tour 360° o SIII — blocco di confronto (specifico della pagina, fuori da §30)
- **Scopo.** Rendere subito chiara la differenza (LG §10).
- **Contenuti.** Tabella a 3 righe × 2 colonne del copy deck, con `<caption>` visivamente nascosta, `<th scope="col">` e `<th scope="row">`.
- **Desktop.** Tabella vera, con la colonna SIII visivamente dominante. Niente icone ✓/✗ come unica informazione.
- **Mobile** (< 768 px): ogni riga diventa un blocco, con l'aspetto confrontato come etichetta e le due celle una sotto l'altra, ciascuna preceduta dal nome della colonna.
  - Cambiare `display` degli elementi di tabella fa perdere la semantica in alcuni browser: vanno rimessi i ruoli ARIA espliciti (`table`, `rowgroup`, `row`, `columnheader`, `rowheader`, `cell`).
  - Le etichette di colonna visibili si generano con `::before { content: attr(data-label) / ""; }`, che il lettore di schermo non legge perché le intestazioni gliele dà già la tabella.
  - `<thead>` resta nel DOM, visivamente nascosto.
- **Da non fare.** Niente slider prima/dopo da trascinare (2.5.7). Da verificare in Fase 5 con VoiceOver iOS e NVDA.

### SI-4 · Cosa permette di fare — elenco tipografico (dentro `SectionIntro`)
- **Contenuti.** `<ul>` di 7 voci. Azione e complemento stanno nello stesso `<li>`: non sono titoli.
- **Desktop.** Azione a scala grande, complemento piccolo, eventualmente su due colonne sfalsate.
- **Mobile.** Una colonna. L'azione alla scala del lead, perché «Accedere alle azioni commerciali» è la voce più lunga.

### SI-5 · Benefici — `BenefitsSection` variante `alternating`
- **Contenuti.**
  - 4 benefici: H3 verbatim più testo.
  - Nessun dato quantitativo.
  - Modulo facoltativo «Dato documentato» (valore, etichetta, fonte, periodo), visibile solo con tutti i campi compilati (copy deck CD §4).
- **Desktop.** Layout alternati con numerazione grande e scala variabile.
- **Mobile.** Lista verticale: numero → titolo → testo. Il titolo 04 va su tre righe: va previsto.
- **Accessibilità.** `<ol>` con numeri `aria-hidden`.

### SI-6 · Esempi — `SectionIntro` + `ProjectShowcase` variante `experience` (×3) + `ImmersivePreview`
- **Contenuti per esempio** (copy deck §6):
  - nome (H3), luogo, portale, frase;
  - CTA «Entra nell’esperienza ↗» (esterna, nuova scheda), con nome accessibile completo;
  - schermata: slot `siii-*`, `[DA FORNIRE]`.
- **Desktop.** Tre showcase grandi, non tre card in fila: per esempio uno per fascia, oppure uno grande e due medi (creative-director).
- **Mobile.** Impilati; schermata a tutta larghezza; CTA a tutta larghezza.
- **Anteprima immersiva** (`immersive.ts`)
  - Al lancio: schermata più link.
  - Il pulsante «Avvia l’anteprima» si mostra solo da 1024 px in su, e solo dopo tre verifiche:
    - i portali permettono l'incorporamento;
    - non impostano cookie non tecnici senza consenso;
    - il viewer non trattiene il focus.
  - Su mobile mai iframe in pagina: il trascinamento per guardarsi intorno si scontra con lo scroll della pagina, e l'esperienza in una scheda a tutto schermo funziona meglio.
  - Dopo il caricamento:
    - l'iframe ha un `title` (copy deck);
    - subito dopo l'iframe, nel DOM, c'è un pulsante «Chiudi l’anteprima» che ripristina la schermata e riporta il focus su «Avvia l’anteprima» (**da aggiungere** a `immersive.ts`);
    - accanto, la nota «L’anteprima carica contenuti da …».

### SI-7 · Ponte — riga editoriale con due link interni
Viene dopo gli esempi, prima della chiusura: spiega dove vivono gli esempi, con i link a /puglia-digitale/ e /citta-digitali/. Non va spostata tra la CTA e il form.

### SI-8 · Chiusura e form — `CTASection` variante `form` + `ContactForm` (preselezione `siii`)
- **Struttura.**
  - `<section>` con l'H2 statement e la CTA «Richiedi un’offerta ↓» verso `#richiesta`.
  - Poi il blocco del form `id="richiesta"`: titolo H3 (`tabindex="-1"`, riceve il focus all'arrivo dall'ancora), introduzione, form (§7), alternative «Preferisci parlarne a voce?» con `tel:`.
- **Desktop.** Statement a tutta larghezza. Sotto, a sinistra titolo, introduzione e alternative; a destra il form, largo al massimo 40 rem circa.
- **Mobile.** Statement (corpo secondo §0.3: «un’esperienza.» ≤ 40 px a 320 px) → CTA → titolo → introduzione → form → alternative.
- **Nota sul copy deck.** La CTA punta al titolo del form, non «al primo campo»: su mobile il focus su un campo aprirebbe la tastiera prima che si capisca dove si è arrivati.

### SI-9 · Continua a esplorare — `ProjectShowcase` variante `compact` → 02 Puglia Digitale `[PROPOSTA]`
- **Contenuti.** Numero, nome e statement della linea successiva, con un link. Gli stessi dati dei capitoli della home.
- **Posizione.** Dopo il form, per chi non ha compilato. Su SIII il creative-director può ometterlo, perché la riga Ponte fa già un lavoro simile.

## 3. Puglia Digitale `/puglia-digitale/`

```text
H1  Puglia Digitale · Una piattaforma interattiva immersiva per la valorizzazione territoriale.
H2  Dalla costa all’entroterra. Un territorio da esplorare.   (#progetto)
H2  [titolo dei numeri, copy deck §4]                          (#numeri)
H2  I luoghi                                                   (#luoghi)          → H3 ×3
H2  [titolo di «Perché aderire», copy deck §6]                 (#perche-aderire)  → H3 ×4
H2  Porta la tua impresa dentro Puglia Digitale.               (chiusura)
    H3  [titolo del form, dal copy deck]                        (#richiesta)
H2  Continua a esplorare                                       [PROPOSTA]
```
L'H1 su due righe segue `mappa-keyword-url.md`: il sottotitolo sta dentro l'H1. Il copy deck lo tiene come `<p>` separato e va allineato.

### PD-1 · Hero — `Hero` variante `line`, carattere territoriale
- **Contenuti.**
  - Breadcrumb ed eyebrow.
  - H1 su due righe.
  - CTA primaria «Visita il portale ↗» → lapugliadigitale.it.
  - Link secondario «Porta la tua impresa in Puglia Digitale ↓» → `#richiesta` (strategia di conversione §4).
  - Visual: slot `puglia-paesaggio` `[DA FORNIRE]`.
- **Desktop.** Più emozionale di SIII: la fotografia è protagonista (creative-director).
- **Mobile.** H1 → CTA → link secondario → foto. Se il testo sta sulla foto: velatura con contrasto verificato sull'area peggiore.

### PD-2 · Il progetto — `LargeStatement` variante `territory`
- **Contenuti.** H2 verbatim e due paragrafi (copy deck §2); la prima frase è la definizione della pagina.
- **Desktop.** Statement grande, testo in colonna sfalsata.
- **Mobile.** Statement (per «all’entroterra.» ≤ 44 px a 320 px) → testo.
- **Facoltativo.** Marquee tipografico con i nomi dei comuni aderenti `[DA FORNIRE: elenco verificato]`, legato allo scroll oppure con pausa (`accessibilita.md` §2.6).

### PD-3 · Fotografia dell'evento — figura editoriale a tutta larghezza (`Media` + `<figcaption>`, fuori da §30)
- **Contenuti.**
  - `<picture>` con art direction: `derivate/evento-panoramica.jpg` su desktop, `derivate/evento-palco.jpg` su mobile.
  - Didascalia del copy deck §3.
  - `[DA VERIFICARE: provenienza]`: il file originale porta il segno di Gemini (brief §0.3).
- **Mobile.** Ritaglio verticale; la didascalia sotto l'immagine, mai sovrapposta.

### PD-4 · Numeri — `Stats` variante `impact`
- **Contenuti.**
  - «30+», «~200.000», «60%» con le etichette del copy deck.
  - Nota con fonte e anno (soltanto se forniti).
  - L'H2 dice che i numeri descrivono i territori coinvolti, non le imprese iscritte al portale.
- **Desktop.** Tre numeri alla scala massima, in composizione asimmetrica.
- **Mobile.** Un numero per riga, con l'etichetta sotto. Corpo del numero vincolato: «~200.000» ≤ 58 px a 320 px e ≤ 73 px a 390 px.
- **Accessibilità.**
  - `<ul>`, con numero ed etichetta nello stesso `<li>`.
  - Simbolo visivo `aria-hidden` più testo nascosto «circa» e «oltre», altrimenti si sente «tilde» e «più».
  - Niente conteggio animato. Se il creative-director lo vuole: valore finale già nel DOM, animazione `aria-hidden`, spenta con reduce.

### PD-5 · I luoghi — `LocationShowcase` variante `doors`
- **Contenuti per luogo** (copy deck §5):
  - nome (H3), riga geografica, dominio;
  - CTA «Esplora ↗» con nome accessibile completo;
  - foto: slot `luogo-*` `[DA FORNIRE]`.
  - `[PROPOSTA]` Sotto Monopoli e Acquaviva delle Fonti, un link a `/siii/#esempi`: Maison Miminà e D.L. Natura Dentro sono pubblicati su quei portali.
- **Desktop.** Tre «porte»: immagini verticali alte, composte in modo non uniforme.
- **Mobile.** Impilate a tutta larghezza (rapporto 4:5 dello slot). Nome e CTA sempre visibili: non si rivelano al passaggio del mouse.
- **Accessibilità.** `<ul>`. Se l'intera scheda è cliccabile, l'immagine ha `alt=""` (`alt-text.md`).

### PD-6 · Perché aderire — `BenefitsSection` variante `numbered`
- **Contenuti.** Eyebrow, H2, quattro motivi (H3 verbatim) con testo.
- **Desktop.** Numerazione grande e composizione dinamica: sfalsata, a scale diverse.
- **Mobile.** Lista verticale, numeri più piccoli, niente sticky.

### PD-7 · Chiusura e form — `CTASection` variante `form` + `ContactForm` (preselezione `puglia-digitale`)
Stessa struttura di SI-8: H2 verbatim, CTA «Contattaci ↓» → `#richiesta`, poi titolo, introduzione e form del copy deck §7.

### PD-8 · Continua a esplorare → 03 Città Digitali `[PROPOSTA]`

## 4. Città Digitali `/citta-digitali/`

```text
H1  Città Digitali · Le attività del territorio, online senza perdere radici.
H2  L’Italia in un unico portale.          (#portale)        → H3 ×3
H2  [titolo del video, copy deck §3]        (#video)
H2  Dal locale al nazionale.                (#come-funziona)  → H3 ×5
H2  La tua azienda merita più di una presenza online. Merita di essere esplorata.
    H3  [titolo del form, dal copy deck]    (#richiesta)
H2  Continua a esplorare                    [PROPOSTA]
```
Anche qui l'H1 su due righe segue `mappa-keyword-url.md`: lo statement sta dentro l'H1. Il copy deck va allineato.

### CD-1 · Hero — `Hero` variante `line`
- **Contenuti.**
  - Breadcrumb ed eyebrow.
  - H1 su due righe.
  - Sottotitolo `<p>`: «Siti Interattivi Immersivi» va nella forma di SIII (brief DR2).
  - CTA primaria «Visita il portale ↗» → cittadigitali.it.
  - Link secondario «Porta la tua attività in Città Digitali ↓» → `#richiesta`.
  - Visual: slot `video-poster` oppure una foto di un territorio `[DA FORNIRE]`.
- **Mobile.** H1 → sottotitolo → CTA → link secondario → visual.

### CD-2 · L'Italia in un unico portale — `LocationShowcase` variante `italy`
- **Contenuti** (copy deck §2): tre città da nord a sud, ciascuna con nome (H3), regione, riga, dominio, CTA «Esplora ↗» e foto (slot `luogo-*`).
- **Desktop.** Composizione nord → sud di forte impatto, diversa dalle «porte» di Puglia Digitale: regione e coordinate di `site.ts` in evidenza.
- **Mobile.** Impilate nello stesso ordine nord → sud.

### CD-3 · Video — `VideoSection` variante `full-bleed`
- **Contenuti.**
  - Eyebrow, H2 e testo breve (copy deck §3): sono anche `name` e `description` del VideoObject.
  - `<video aria-labelledby="{id dell'H2}" preload="none" playsinline poster>`.
  - Sotto il player, `<details>` «Leggi la descrizione del video» `[DA SCRIVERE dopo la visione]`.
  - Sottotitoli `<track kind="captions" srclang="it">` se c'è parlato `[DA VERIFICARE]`.
  - File da ospitare sul sito, non sull'host di Railway `[DA FORNIRE]`.
- **Desktop.** A tutta larghezza, quasi a tutto schermo (al massimo `100svh` meno l'header).
  - Controlli minimi sovrapposti: Riproduci/Pausa, Audio, Sottotitoli (se esistono), Schermo intero.
  - Autoplay muto solo se il video non ha audio essenziale: lo gestisce già `video.ts`, con metà del video visibile, e mai con reduce o Save-Data.
- **Mobile.**
  - A tutta larghezza nel rapporto del video (16:9, salvo una versione verticale facoltativa `[DA FORNIRE]`).
  - `[IPOTESI da concordare con web-performance-specialist]` Niente autoplay: poster e grande pulsante di riproduzione, per il consumo di dati e perché in verticale il 16:9 è piccolo.
  - Riproduzione in linea; schermo intero disponibile.
- **Interazione.**
  - Durante l'autoplay il pulsante Pausa è sempre visibile (2.2.2).
  - L'audio si attiva solo su richiesta.
  - I controlli sono `<button>` di almeno 44 × 44 px, visibili al focus e al tocco, non solo al passaggio del mouse.
  - Etichette dei pulsanti: vedi `accessibilita.md` §2.7 (in `video.ts` va corretto l'uso di `aria-pressed`).

### CD-4 · Dal locale al nazionale — `BenefitsSection` variante `sticky`
- **Contenuti.**
  - Eyebrow, H2 e testo con link a `/siii/`.
  - Cinque concetti (H3 verbatim) con testo.
  - Modulo «Dato documentato» nascosto per impostazione: «5–10 volte», «4 volte» e «250.000 visite mensili» compaiono solo con la fonte.
- **Desktop.**
  - Colonna sinistra sticky con l'H2 e un indicatore 01/05 decorativo (`aria-hidden`); a destra i concetti che scorrono.
  - Sticky solo da 1024 × 720 px in su, e solo se la colonna sticky è più bassa del viewport meno l'header.
- **Mobile.** Niente sticky: H2, poi lista numerata. L'indicatore sparisce.
- **Accessibilità.**
  - `<ol>`.
  - Nessun elemento interattivo nella colonna sticky, così non può coprire il focus.

### CD-5 · Chiusura e form — `CTASection` variante `form` + `ContactForm` (preselezione `citta-digitali`)
- **Struttura.** Come SI-8: H2 su due livelli tipografici (copy deck §5), CTA «Entra in Città Digitali ↓» → `#richiesta`, titolo, introduzione e form.
- **Perché la freccia ↓.** «Entra in Città Digitali» si può leggere come «visita il portale». La freccia verso il basso e l'introduzione del form chiariscono che si tratta di aderire.

### CD-6 · Continua a esplorare → 01 SIII `[PROPOSTA]`

## 5. Contatti `/contatti/`

```text
H1  Parliamo del prossimo spazio digitale.
H2  Recapiti            (#recapiti, può essere visivamente nascosto)
H2  Scrivici            (#richiesta)
H2  I portali           (#portali)
H2  Dati societari      (#dati-societari)
```
**Differenza dal copy deck.** Il form viene prima dei portali. I portali sono un'uscita secondaria: su mobile non devono spingere il form più in basso.

### CT-1 · Hero — `Hero` variante `compact`
- **Contenuti.** Breadcrumb, eyebrow, H1 verbatim, lead.
- **Niente CTA «Scrivici ↓».** Su desktop il form è già nel primo viewport. Su mobile lo stesso salto lo fa «Parliamone» nella barra (→ `#richiesta`).
- **Obiettivo di layout.** A 1280 × 800 recapiti e inizio del form stanno nel primo viewport; a 390 × 844 almeno i canali diretti.

### CT-2 · Recapiti e CT-3 · Form — due colonne su desktop
- **Recapiti.**
  - `<address>` con `<dl>` (copy deck §2), in questo ordine: Telefono, Mobile, Email, Sede operativa (con «Indicazioni stradali ↗», un semplice link senza mappa incorporata), LinkedIn («Giacomo Lenoci su LinkedIn ↗»).
  - Prima vengono i canali diretti (strategia di conversione §4): da mobile, chiamare e scrivere sono i compiti più probabili `[IPOTESI]`.
  - Numeri di telefono con spazi non separabili.
- **Form.** `ContactForm` senza preselezione. `?interesse=` è supportato. Titolo H2, introduzione e alternativa «Preferisci parlarne a voce?» (copy deck §4).
- **Desktop.** Recapiti a sinistra, in una colonna stretta; form a destra.
- **Mobile.** Recapiti come righe da toccare (almeno 48 px) → form.

### CT-4 · I portali — due righe editoriali
Per ogni portale: nome (H3), frase, link esterno con il dominio visibile (`↗`) e link interno «Scopri il progetto →» (copy deck §3).

### CT-5 · Dati societari — blocco testuale piccolo in `<dl>`
Gli stessi dati del footer, da completare prima del go-live (soglia 5).

## 6. Componenti: varianti e dove si usano

| Componente (LG §30) | Varianti | Dove |
|---|---|---|
| Header | stati `top` e `scrolled`; tema chiaro o scuro dello stato `top` | tutte le pagine |
| MobileMenu | `<dialog>` modale | tutte, sotto i 1024 px |
| Footer | — | tutte |
| Hero | `home`, `line`, `compact` | HM-1; SI-1, PD-1, CD-1; CT-1, pagine legali, 404 |
| SectionIntro | titolo e introduzione, allineamenti diversi | HM-3, SI-2, SI-4, SI-6, PD-5, CD-2 |
| LargeStatement | `manifesto`, `territory` | HM-2, SI-2, PD-2 |
| ProjectShowcase | `chapter`, `experience`, `compact` | HM-3; SI-6; «Continua a esplorare» e 404 |
| LocationShowcase | `doors`, `italy` | PD-5, CD-2 |
| ImmersivePreview | `poster` (al lancio), `facade` (dopo le verifiche di SI-6) | SI-1, SI-6 |
| FounderTimeline | — | HM-4 |
| BenefitsSection | `alternating`, `numbered`, `sticky` | SI-5, PD-6, CD-4: una variante per pagina, così le tre pagine non si somigliano (il creative-director può riassegnarle) |
| Stats | `impact`, più il modulo «Dato documentato» dentro BenefitsSection | PD-4; SI-5 e CD-4 solo con fonte |
| VideoSection | `full-bleed` | CD-3 |
| CTASection | `band`, `form` | HM-5; SI-8, PD-7, CD-5 |
| ContactForm | proprietà `formId`, `preselect`, `title`, `headingLevel` | SI-8, PD-7, CD-5, CT-3 |

- **Fuori da §30, già esistenti o necessari:**
  - `Breadcrumbs` (esiste) e `Media` (esiste);
  - SkipLink;
  - ExternalLink: freccia, testo nascosto, `rel`, attributi `data-*`;
  - ContactDetails: i recapiti usati nel footer, in Contatti e accanto ai form;
  - il blocco di confronto di SI-3 e la figura di PD-3, specifici di una sola pagina.

## 7. Form di contatto (`ContactForm`, `src/scripts/form.ts`)

Qui ci sono struttura, validazione, stati e accessibilità. Il microcopy completo e il contratto con l'endpoint sono nella strategia di conversione (§6–8).

### 7.1 Struttura
- **Impaginazione.**
  - Una colonna, etichette sempre visibili sopra i campi, suggerimenti tra etichetta e campo; nessun placeholder al posto dell'etichetta.
  - In testa: «I campi con * sono obbligatori.»; i campi facoltativi hanno «(facoltativo)» nell'etichetta.
- **Markup del form.**
  - `<form data-contact-form data-form-id="richiesta-…" method="post" action="{endpoint}" aria-labelledby="{id del titolo}">`: con un nome accessibile il form diventa un landmark.
  - `novalidate` lo aggiunge lo script. Senza JavaScript restano la validazione nativa e l'invio in POST all'endpoint.
- **Ordine dei campi.** `[PROPOSTA condivisa con cro-specialist]`
  1. Mi interessa
  2. Nome e cognome
  3. Email
  4. Telefono
  5. Azienda o ente
  6. Messaggio
  7. Privacy
  8. «Invia richiesta»

  «Mi interessa» sta in cima: sulle pagine di linea è già spuntato e conferma il contesto; la posizione resta la stessa anche in Contatti (3.2.3). L'ordine delle LG resta accettabile.
- **Dimensioni.**
  - Campi alti almeno 44 px, con testo di almeno 16 px (sotto i 16 px iOS ingrandisce la pagina).
  - Checkbox di almeno 24 × 24 px, con l'etichetta cliccabile.
  - Pulsante alto almeno 44 px, a tutta larghezza su mobile.

### 7.2 Campi

| Campo (etichetta visibile) | `name` | Tipo e attributi | `autocomplete` | Obbl. | Validazione | Messaggio d'errore |
|---|---|---|---|---|---|---|
| Mi interessa | `interesse` | 3 checkbox (`siii`, `puglia-digitale`, `citta-digitali`) in `<fieldset>` con `<legend>`; suggerimento «Puoi sceglierne più di uno.» | — | no | — | — |
| Nome e cognome * | `nome` | `text`, `maxlength="100"` | `name` | sì | non vuoto, spazi esclusi | «Inserisci nome e cognome.» |
| Email * | `email` | `type="email"`, `maxlength="254"`, `spellcheck="false"`, `autocapitalize="off"`, `pattern` di cro-specialist | `email` | sì | formato valido; nessun dominio escluso: Gmail, PEC e indirizzi istituzionali vanno bene | vuoto: «Inserisci il tuo indirizzo email.» · formato: «Controlla l’email: per esempio nome@azienda.it» |
| Telefono (facoltativo) | `telefono` | `type="tel"`, `pattern="[0-9 +\-\.\(\)\/]{6,20}"` | `tel` | no | solo se compilato | «Controlla il numero: usa cifre, spazi e +, per esempio +39 080 1234567.» |
| Azienda o ente (facoltativo) | `azienda` | `text`, `maxlength="150"` | `organization` | no | — | — |
| Messaggio (facoltativo) | `messaggio` | `textarea`, `rows="5"`, `maxlength="2000"`, suggerimento specifico per pagina | — | no | al massimo 2.000 caratteri | — |
| Privacy * | `privacy` | checkbox, mai preselezionata; etichetta «Ho letto l’[informativa privacy]» | — | sì | spuntata | «Per inviare la richiesta conferma di aver letto l’informativa privacy.» |
| (nascosto) | `_gotcha` | honeypot (§7.6) | `off` | — | deve restare vuoto | — |
| (aggiunti all'invio) | `_elapsed_ms`, `_page`, `_form` | aggiunti da `form.ts` | — | — | controllati dall'endpoint | — |

- **Etichetta dell'email.** Le LG dicono «Email aziendale»; cro-specialist propone «Email»; decide il cliente. In entrambi i casi nessun blocco sui domini.
- **Privacy.**
  - È una presa visione, non un consenso (strategia di conversione §6) `[DA VERIFICARE con il consulente privacy]`.
  - Il link all'informativa si apre in una nuova scheda, con l'avviso, così chi lo apre non perde i dati inseriti.
  - Eventuali consensi futuri (per esempio marketing) vanno in caselle separate, facoltative e non preselezionate.
- **Parametro nell'URL.** `?interesse=` oggi funziona con parametri ripetuti (`?interesse=siii&interesse=citta-digitali`). La strategia di conversione parla di valori separati da virgola: le due cose vanno allineate.

### 7.3 «Mi interessa» preselezionato
- **In build**, niente JavaScript: la proprietà `preselect` scrive `checked`.
  - /siii/ → `siii`
  - /puglia-digitale/ → `puglia-digitale`
  - /citta-digitali/ → `citta-digitali`
  - /contatti/ → nessuna
- **Su /contatti/** `?interesse=` preseleziona via script, solo se la pagina non ha già una preselezione.
- **Non è un consenso.** È una scelta di argomento, visibile e modificabile. La regola «mai caselle preselezionate» riguarda i consensi.

### 7.4 Validazione ed errori
- **Quando.**
  - All'uscita dal campo, solo se l'utente ci ha scritto: errori di formato, oppure campo obbligatorio svuotato. Chi scorre i campi con Tab non riceve errori prematuri.
  - I campi obbligatori mai toccati si segnalano all'invio.
  - Dopo la comparsa di un errore, il campo si rivalida a ogni modifica e l'errore sparisce appena il valore è corretto (già così in `form.ts`).
- **Dove.**
  - Il messaggio sta tra etichetta (e suggerimento) e campo, non sotto: resta visibile con la tastiera virtuale aperta e vicino all'etichetta per chi usa l'ingrandimento. Per la privacy, sopra la riga della checkbox.
  - Testo più icona `aria-hidden`, non solo colore.
  - Prefisso visivamente nascosto «Errore:».
- **ARIA.**
  - Campo con errore: `aria-invalid="true"` e `aria-describedby="{id}-hint {id}-error"`, con l'id dell'errore presente solo quando c'è.
  - Quando l'errore è corretto, spariscono entrambi (già così in `form.ts`).
- **Riepilogo all'invio.**
  - Riquadro in testa al form (`[data-form-summary]`, `tabindex="-1"`) con la frase «Per inviare la richiesta, controlla questi campi:», in `<p>` e non come titolo.
  - Sotto, l'elenco degli errori come link ai campi, nell'ordine del form.
  - Il focus va sul riepilogo. Niente `role="alert"`: con lo spostamento del focus l'annuncio sarebbe doppio.
- **Pulsante di invio.** Mai disabilitato per la validazione. Durante l'invio ha `aria-disabled="true"`, non `disabled`, che toglierebbe il focus.
- **Area di stato.** Una sola `role="status"` (`[data-form-status]`), presente nel DOM fin dal caricamento e vuota, solo per «Invio in corso…». Gli altri stati spostano il focus.
- **Dati conservati.** In ogni caso di errore i dati restano nei campi (3.3.7).

### 7.5 Stati

| Stato | Quando | Cosa vede l'utente | Focus e annunci |
|---|---|---|---|
| Pronto | caricamento | form con la preselezione della pagina | — |
| Endpoint assente | `PUBLIC_FORM_ENDPOINT` vuoto in build | **Avviso già al caricamento, prima dei campi** (da aggiungere in build): l'invio online non è attivo, con email e telefono. All'invio valido il form si nasconde e compare il pannello di ripiego: «Prepara l’email con i tuoi dati» (`mailto:` precompilato), indirizzo in chiaro, telefono. **Mai un messaggio di successo.** | focus sul titolo del pannello |
| Errori di validazione | invio con campi non validi | riepilogo ed errori sui campi; dati intatti | focus sul riepilogo |
| Invio in corso | invio valido | pulsante «Invio in corso…», `aria-busy` sul form, clic ripetuti ignorati | stato: «Invio in corso…» |
| Inviato | risposta 2xx | pannello di conferma al posto del form: email e interessi letti **prima** di `form.reset()`; prossimi passi solo se confermati `[DA FORNIRE]` | focus sul titolo del pannello |
| Errore di invio | risposta 4xx/5xx, rete assente, timeout di 15 s | pannello d'errore sopra il pulsante, con alternative ed email precompilata; il form resta compilato | focus sul titolo del pannello |
| Honeypot compilato | campo `_gotcha` non vuoto | lo stesso pannello d'errore onesto, mai un finto successo | come sopra |

- **Pannelli.** I pannelli di conferma, ripiego ed errore iniziano con un titolo con `tabindex="-1"`: `form.ts` oggi dà il focus al contenitore, meglio darlo al titolo.
- **Go-live.** In produzione l'endpoint deve esistere prima del lancio (strategia di conversione, decisione 1). Lo stato «endpoint assente» è una rete di sicurezza, non una condizione di lancio.

### 7.6 Antispam, senza CAPTCHA
Vale quanto previsto dalla strategia di conversione §7:
1. **Honeypot `_gotcha`.**
   - Il contenitore sta fuori schermo, non in `display: none`, e ha `aria-hidden="true"`.
   - Il campo ha `tabindex="-1"`, `autocomplete="off"` e l'etichetta «Lascia vuoto questo campo».
2. **Tempo minimo.** L'endpoint mette in quarantena, non cancella, gli invii con `_elapsed_ms` inferiore a 3000 ms. Se manca il valore (utente senza JavaScript), l'invio non si scarta.
3. **Limite di frequenza** per IP sull'endpoint, più la stessa validazione del client ripetuta sul server.
4. **Cloudflare Turnstile**: predisposto ma spento, si attiva solo se serve. Niente CAPTCHA con prove visive o cognitive.

## Ipotesi da validare
- Mobile senza autoplay del video (CD-3): da concordare con web-performance-specialist e creative-director.
- Su /contatti/, da mobile si chiama o si scrive più spesso di quanto si compili il form: per questo l'ordine dei recapiti mette prima i canali diretti.
- «Mi interessa» in cima al form riduce l'impegno percepito senza togliere chiarezza.
- «Continua a esplorare» è utile in fondo alle tre pagine di linea.
- Le composizioni reggono senza gli asset mancanti, grazie agli slot a rapporto fisso.

## Domande aperte
- **creative-director**: visual della hero della home (HM-1); ritratto nella sezione fondatore in attesa di DR3; eventuale assegnazione diversa delle varianti di BenefitsSection.
- **copywriter-content e copywriter-brand**: allineare nei copy deck:
  - l'ancora `#richiesta`;
  - le frecce `↓` e `↗`;
  - le CTA di chiusura che puntano al titolo del form;
  - l'H1 su due righe di Puglia Digitale e Città Digitali (`mappa-keyword-url.md`);
  - l'ordine di Contatti (form prima dei portali).
  
  Serve anche il copy della home: titolo dei tre mondi, microdescrizioni, chiusura.
- **seo-content**: conferma degli H1 su due righe anche nei copy deck; testo dei link del blocco «Continua a esplorare».
- **cro-specialist**: conferma della CTA di chiusura come link `↓` al titolo del form, invece di trasformarla nel titolo del form; formato di `?interesse=` (parametri ripetuti o virgole).
- **Cliente**: testi originali (brief §7 P1), asset, endpoint del form, tempi di risposta garantiti.

## Decisioni richieste
- **Sviluppo** (sessione principale), correzioni al codice esistente:
  - in `form.ts`, focus sul titolo dei pannelli e avviso di endpoint assente reso in build;
  - in `immersive.ts`, pulsante «Chiudi l’anteprima» e anteprima solo da 1024 px;
  - in `video.ts`, stati dei pulsanti (`accessibilita.md` §2.7);
  - il template 404 non mostra il breadcrumb.
- **creative-director**: approvare l'impostazione per le sezioni sticky, i caroselli e le headline su mobile (§0.3–0.4). Sono vincoli di accessibilità, quindi soglie; il modo di rispettarli resta alla direzione visiva.
