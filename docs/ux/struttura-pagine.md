---
titolo: Struttura delle pagine e form di contatto
owner: ux-designer
contributi: [creative-director, ui-designer, cro-specialist, copywriter-brand, copywriter-content, seo-content, seo-technical]
stato: in revisione
versione: 0.6
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/creativa/direzione-visiva.md (0.3; 0.7 per §1.4 e §7.6), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md, docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md, docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (L4, L6), staging http://localhost:4321 del 2026-10-05 (Città Digitali e Contatti; O4 al commit 5c4a6cb), docs/strategia/citta-digitali-elenco.md, docs/contenuti/copy-deck/, docs/contenuti/alt-text.md, docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md, docs/seo/specifiche-tecniche.md, docs/seo/mappa-keyword-url.md, docs/seo/dati-strutturati.md, src/scripts/, src/data/, src/components/]
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
   - Misure in Chromium sul font e sulla scala della direzione visiva (§ tipografia): Schibsted Grotesk, peso e tracking di ogni stile, minimo del `clamp()`, margini laterali di 20 px. La colonna utile è di 280, 320 e 350 px (a 320, 360 e 390 px).

   | Parola più lunga (stile, corpo minimo) | Larghezza | Occupa | Esito | Corpo max a 320 px |
   |---|---|---|---|---|
   | «~200.000» (`display-xxl`, 72 px) | 4,16 em | 300 px | **sfora a 320 px** (280); regge a 360 e 390 | 67 px |
   | «tecnologia» (`display-xl`, 52 px, H1 home primo registro) | 4,67 em | 243 px | regge | 59 px |
   | «un’esperienza.» (`display-l`, 40 px) | 6,58 em | 263 px | regge, con solo 17 px di margine | 42 px |
   | «l’innovazione.» / «all’entroterra.» (`display-l`, 40 px) | 6,21 / 6,07 em | 248 / 243 px | reggono | 45 / 46 px |
   | «imprenditoriale» (`display-m`, 28 px) | 6,66 em | 186 px | regge | 42 px |

   - La scala della direzione visiva abbassa già i minimi indicativi delle LG: da 64 a 52 px per l'H1, da 44 a 40 px per i titoli di sezione. Con 64 e 44 px, a 320 px sarebbero uscite dalla colonna, per esempio, «tecnologia» (299 px su 280) e «un’esperienza.» (290 px su 280).
   - Resta un solo caso: i numeri di Stats in `display-xxl`. Il minimo va abbassato a 4 rem al massimo (per esempio `clamp(4rem, 18vw, 17.5rem)`), oppure sotto i 360 px i numeri passano a `display-xl`.
   - Se una parola lunga cambia stile va rimisurata: «accompagna» in `display-xl` occuperebbe 303 px e sforerebbe, mentre in `display-m`, come previsto, regge.
   - Script di misura: `accessibilita.md`, Appendice B.
   - Ogni dimensione fluida contiene una parte in `rem`, mai solo `vw` (1.4.4).
   - `overflow-wrap: break-word` solo come rete di sicurezza. Niente `hyphens: auto` sui titoli display.
4. **Sticky, caroselli, scroll.**
   - Sezioni sticky solo con viewport di almeno 1024 × 720 px, e con l'elemento sticky più basso del viewport meno l'header. Su mobile diventano flusso normale.
   - Niente caroselli a scorrimento orizzontale, niente scroll-jacking.
   - Una sezione che trasforma lo scroll verticale in movimento orizzontale è ammessa solo per la timeline del fondatore, su desktop, alle condizioni di HM-6. La prima condizione è che nella parte che si muove non ci siano elementi focalizzabili.
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

Sette sezioni, come nel copy deck della home e nella direzione visiva (§7.3). I testi sono nel copy deck.

```text
H1  La tecnologia cambia. La curiosità ci accompagna da sempre.       (due registri nello stesso H1)
H2  ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.  (#chi-siamo: copre le sezioni HM-2, HM-3 e HM-4)
H2  I tre mondi ITnode                                               (#tre-mondi)
    H3  SIII · Siti Interattivi Immersivi · H3  Puglia Digitale · H3  Città Digitali
H2  36 anni dentro l’innovazione. E ancora la stessa curiosità.      (#fondatore; tappe senza H3)
H2  Il Web si può abitare. Cominciamo dal tuo spazio.                (chiusura)
```

### HM-1 · Hero — `Hero` variante `home`
- **Scopo.** Far sentire il concetto (spazio fisico → spazio digitale → persone → imprese → territorio) nei primi secondi. La hero «respira».
- **Contenuti** (copy deck; composizione della direzione visiva §5):
  - occhiello «ITnode — oltre i confini del Web tradizionale» (verdetto G4 §3.4);
  - H1 in due registri nello stesso `<h1>`;
  - riga di posizionamento in `lead`, «Esperienze digitali immersive per imprese e territori.», in un `<p>` subito dopo `</h1>` (I4, verdetto G4 §3.4): senza, l'H1 non dice che cosa fa ITnode e il test dei 5 secondi non si supera;
  - «orizzonte dei luoghi» (SVG con i luoghi reali);
  - didascalia dell'osservatore;
  - nessuna CTA: «Parliamone» è nell'header;
  - **nessun invito allo scorrimento** (decisione del G4, DV 0.3 §5). «Scorri per esplorare» è tolto: con il movimento ridotto, o senza animazioni legate allo scroll, l'orizzonte non ruota e l'invito prometterebbe qualcosa che non succede. La rotazione resta una scoperta per chi scorre.
- **Mobile.** H1 → riga di posizionamento → orizzonte. L'H1 è interamente visibile nel primo viewport, a 360 × 640 e a 390 × 844.
- **Interazione e accessibilità.**
  - La riga di posizionamento è un paragrafo, fuori dal titolo. Ordine di lettura: occhiello → H1 → riga → didascalia (verificato in C14, anche a 320 px con le spaziature di 1.4.12).
  - L'orizzonte, con le etichette dei luoghi, è decorativo: SVG `aria-hidden`.
  - Ruota solo con lo scroll, mai da solo, quindi il criterio 2.2.2 non si applica. Con reduce resta fermo.
  - L'H1 è il candidato LCP: l'SVG in linea deve restare leggero.

### HM-2 · Manifesto — `LargeStatement` variante `manifesto` (`#chi-siamo`)
- **Contenuti.**
  - H2 verbatim.
  - `lead` di sintesi, nella formulazione provvisoria del brief §2.4 finché D1 è aperta. I nomi «Città Digitali» e «Puglia Digitale» sono link interni.
- **Desktop.** Statement su 10 colonne, lead sfalsato.
- **Mobile.** Statement → lead, senza sfalsamento.
- **Accessibilità.** Il text reveal anima righe, non lettere. Le maschere `overflow: hidden` si tolgono a fine animazione (1.4.12).

### HM-3 · Documento — figura editoriale (`Media` + `<figcaption>`, fuori da §30)
- **Contenuti.**
  - Foto dell'evento in `<picture>` con art direction: ritaglio «Panorama» su desktop, «Città» 4:5 su mobile.
  - I tre nodi numerati sull'immagine sono `aria-hidden` e non interattivi. La legenda è un `<ol>` di testo nella didascalia.
  - Didascalia con data e luogo solo se confermati (brief A4) `[DA VERIFICARE: provenienza della foto]`.
- **Titolo.** Nessun heading: la figura fa parte di `#chi-siamo`.

### HM-4 · Infrastruttura — statement in `<p>` + marquee legato allo scroll
- **Statement.** «Una nuova infrastruttura digitale / per connettere imprese, cittadini e visitatori.», in `<p>`: non è il titolo di una sezione.
- **Marquee.** «spazio fisico → spazio digitale → persone → imprese → territorio →».
  - La prima copia è leggibile, con le frecce SVG `aria-hidden`; le copie del ciclo sono `aria-hidden`.
  - Si muove con lo scroll e resta fermo con reduce (`accessibilita.md` §2.6).
- **Mobile.** Statement su 4 righe, marquee più lento.

### HM-5 · I tre mondi — `SectionIntro` + `ProjectShowcase` variante `chapter` (×3, `#tre-mondi`)
- **Scopo.** Far capire che SIII, Puglia Digitale e Città Digitali sono tre applicazioni della stessa visione. È lo snodo verso le tre pagine.
- **Contenuti per capitolo** (copy deck):
  - numero 01–03 e nome (H3), statement verbatim (LG §08), microdescrizione;
  - CTA interna: «Esplora SIII →», «Scopri Puglia Digitale →», «Esplora Città Digitali →». Nessun link esterno.
  - **Visual**
    - 01: soglia «Schermo» 16:10, slot `siii-masseria-santella`;
    - 02: carta della Puglia, finché non arriva una foto del territorio;
    - 03: carta d'Italia con un punto per ogni città di Città Digitali e i nomi dove c'è spazio, con la legenda di una riga in `<figcaption>` (nel sito dal commit 0a61546).
    - La carta 02 è decorativa (`aria-hidden`): i suoi luoghi sono nominati nella pagina di linea.
    - **La carta 03 non è decorativa.** Mostra dove sta la rete, e il testo del capitolo non lo dice. È un'immagine (`role="img"`) con una descrizione costruita dagli stessi dati: regioni da nord a sud, la regione più fitta, poi «Tra queste:» con i nomi disegnati sulla carta larga (forma L4 di copywriter-brand). Nessun numero finché il conteggio non è confermato. Nella Home niente elenco dei nomi, né nascosto né in un `<details>`. Decisione in `docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md`.
- **Desktop.** Tre capitoli grandi, non tre card, con composizioni speculari (direzione visiva). Dentro ogni capitolo, numero o visual possono essere sticky.
- **Mobile.** Per ogni capitolo: numero → nome → statement → visual → microdescrizione → CTA a tutta larghezza. Niente sticky, niente swipe.
- **Interazione e accessibilità.**
  - I capitoli sono un `<ol>`, con il numero grande `aria-hidden`.
  - Il link vero è la CTA. Se anche il visual è cliccabile, è un duplicato con `tabindex="-1"` e `aria-hidden="true"`.
  - Nessuna informazione che compaia solo al passaggio del mouse.

### HM-6 · Fondatore — `FounderTimeline` (`#fondatore`)
- **Scopo.** Credibilità e continuità: 36 anni di innovazione che arrivano a ITnode, e un volto.
- **Contenuti.**
  - H2 verbatim.
  - Racconto `[DA FORNIRE: testo originale del fondatore]`.
  - Timeline.
  - «10.000+ clienti» come momento numerico, agganciato alla tappa Leadstone con la sua attribuzione: mai vicino a ITnode (brief N5).
  - Citazione di chiusura verbatim in `<blockquote>`.
  - Attribuzione visibile: nome, ruolo e link «Giacomo Lenoci su LinkedIn ↗» `[DA VERIFICARE: nome e ruolo, brief F7]`. Nome, ruolo e link visibili sono le condizioni per il markup Person (`dati-strutturati.md` §7).
- **Immagine.**
  - Dipende da DR3 (brief), che è una decisione dell'utente. La direzione visiva chiude sulla foto reale «Palco» (DR3-a).
  - Le scene con palco e platea non si presentano come eventi reali se non sono documentate.
- **Timeline.**
  - `<ol>` di tappe, nell'ordine e con i dubbi del brief §6. Ogni tappa ha periodo (facoltativo, in `<time>` se c'è una data), titolo e dettaglio di ≤ 120 caratteri.
  - Nessun H3, così la navigazione per titoli del lettore di schermo non si riempie.
  - È ordinale, non in scala: le date mancanti non si inventano.
- **Desktop.**
  - Composizione editoriale, non «foto a sinistra, biografia a destra» (LG §09).
  - La direzione visiva prevede un «orizzonte del tempo» orizzontale e sticky, che trasla con lo scroll. È accettabile a queste condizioni:
    1. **Nella parte che trasla non c'è nulla di focalizzabile.** Le tre voci di «oggi» (ITnode, Puglia Digitale, Città Digitali), che sono link, stanno in un nodo fermo alla fine della sezione, non sul binario che si muove. Altrimenti chi usa la tastiera potrebbe dare il focus a un link fuori dallo schermo.
    2. Il testo delle tappe è un vero `<ol>` nell'ordine del DOM, letto indipendentemente dalla posizione visiva. La linea e le tacche sono `aria-hidden`.
    3. Solo con viewport di almeno 1024 × 720 px, con l'elemento sticky più basso del viewport meno l'header, e con un percorso di scroll breve: al massimo una volta e mezza l'altezza del viewport.
    4. Lo scroll resta quello nativo: rotella, Spazio e Pagina giù funzionano normalmente. Nessuna libreria di smooth scroll.
    5. Con `prefers-reduced-motion` diventa una griglia statica, come già previsto.
  - Senza queste condizioni: timeline verticale.
- **Mobile.** Linea verticale a sinistra, tappe in pila, niente sticky; poi immagine e citazione.

### HM-7 · Chiusura — `CTASection` variante `band`
- **Scopo.** Il passo successivo per chi arriva in fondo. In home niente form: le LG lo prevedono solo nelle pagine di linea e in Contatti.
- **Contenuti** (copy deck):
  - H2;
  - CTA «Parliamone →» verso `/contatti/`;
  - email e telefono come contatti rapidi.
- **Mobile.** CTA a tutta larghezza, poi email e telefono come righe alte almeno 44 px.

## 2. SIII `/siii/`

```text
H1  SIII · Siti Interattivi Immersivi            (due righe nello stesso H1)
H2  Il sito diventa un luogo.                    (#cos-e)
H2  Un tour 360° è una visita. Un SIII è un sito. (#tour-360-o-siii)
H2  Una visita che diventa azione.               (#cosa-puoi-fare)
H2  Cosa cambia per la tua impresa.              (#benefici)  → H3 ×4
H2  Entra. Esplora. Interagisci.                 (#esempi)    → H3 ×3
H2  La tua azienda può diventare un’esperienza.  (chiusura)
    H3  Richiedi un’offerta                      (#richiesta: titolo del form)
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

### SI-5 · Benefici — `BenefitsSection` variante `zigzag` («zig-zag» nella direzione visiva)
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
Viene dopo gli esempi, prima della chiusura: spiega dove vivono gli esempi, con i link a /puglia-digitale/ e /citta-digitali/. Non va spostata tra lo statement di chiusura e il form.

### SI-8 · Chiusura e form — `CTASection` variante `form` + `ContactForm` (preselezione `siii`)
- **La CTA delle LG diventa il titolo del form.** Nella composizione della direzione visiva il form sta accanto allo statement (desktop) o subito sotto (mobile). Un link che fa scorrere di pochi pixel sarebbe inutile (strategia di conversione §5; copy deck §8). Il titolo (H3) è quindi «Richiedi un’offerta», senza freccia e senza link.
- **Struttura.**
  - `<section>` con l'H2 statement.
  - Poi il blocco del form `id="richiesta"`: titolo H3 (`tabindex="-1"`, riceve il focus quando si arriva dall'ancora), introduzione, form (§7), alternativa «Preferisci parlarne a voce?» con `tel:`.
- **Chi arriva a `#richiesta`.** «Parliamone» nell'header e il link secondario della hero. Arrivano sul titolo del form, non sul primo campo: su mobile il focus su un campo aprirebbe la tastiera prima che si capisca dove si è arrivati.
- **Desktop.** Statement a sinistra (colonne 1–5), form a destra (colonne 7–12, largo al massimo 40 rem circa).
- **Mobile.** Statement (corpo secondo §0.3) → titolo → introduzione → form → alternativa.

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
    H3  Contattaci                                             (#richiesta: titolo del form)
H2  Continua a esplorare                                       [PROPOSTA]
```
L'H1 su due righe segue `mappa-keyword-url.md` e il copy deck: il sottotitolo sta dentro l'H1.

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
- **Mobile.** Statement → testo. «all’entroterra.» in `display-l` regge anche a 320 px (§0.3).
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
- **Mobile.** Un numero per riga, con l'etichetta sotto. Corpo del numero vincolato: «~200.000» ≤ 67 px a 320 px (§0.3).
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
- **Ordine `[IMPORTANTE]`: lo stesso a tutte le larghezze.**
  - Oggi la direzione visiva mette le porte, su desktop, secondo la longitudine (Gravina, Acquaviva, Monopoli, da sinistra a destra), e su mobile le impila dalla costa all'entroterra (Monopoli, Acquaviva, Gravina). Un solo DOM non può seguire entrambi gli ordini: su uno dei due layout il Tab andrebbe da destra a sinistra, al contrario della lettura (2.4.3).
  - Due soluzioni, sceglie il creative-director:
    - ordine geografico ovest → est ovunque;
    - dalla costa all'entroterra ovunque, con la composizione desktop che non segue la longitudine.
  - **Stato (verifica del 2026-09-28).** Il codice segue la prima soluzione: ovest → est a tutte le larghezze, con ordine del focus verificato.
  - **Posizione ux-designer su I11 della review UI.** La proposta di I11 non è accettata. Con il DOM Monopoli → Acquaviva → Gravina e le porte posizionate per longitudine, su desktop il focus andrebbe da destra a sinistra, al contrario della lettura della fila: 2.4.3, e 1.3.2 con la tecnica C27.
  - **Decisione del creative-director** (verdetto G4 §3.5): ovest → est a tutte le larghezze, come nel codice.
  - **Raccomandazione (accolta):** ovest → est. «Dalla costa all'entroterra» è il titolo di #progetto, due sezioni prima; il copy deck dichiara l'ordine reversibile. Motivazione completa in `docs/review/2026-09-28-sito-verifica-accessibilita-ux-designer.md` §3.3.
- **Accessibilità.** `<ul>`. Se l'intera scheda è cliccabile, l'immagine ha `alt=""` (`alt-text.md`).

### PD-6 · Perché aderire — `BenefitsSection` variante `staircase` («scala» nella direzione visiva)
- **Contenuti.** Eyebrow, H2, quattro motivi (H3 verbatim) con testo.
- **Desktop.** Numerazione grande e composizione dinamica: sfalsata, a scale diverse.
- **Mobile.** Lista verticale, numeri più piccoli, niente sticky.

### PD-7 · Chiusura e form — `CTASection` variante `form` + `ContactForm` (preselezione `puglia-digitale`)
Stessa struttura di SI-8: H2 verbatim, poi il blocco `#richiesta` con il titolo H3 «Contattaci» (la CTA delle LG, senza link), introduzione e form (copy deck §7).

### PD-8 · Continua a esplorare → 03 Città Digitali `[PROPOSTA]`

## 4. Città Digitali `/citta-digitali/`

```text
H1  Città Digitali · Le attività del territorio, online senza perdere radici.
H2  Città Digitali, in movimento.           (#video)
H2  L’Italia in un unico portale.           (#portale)        → H3 ×3
H2  Dal locale al nazionale.                (#come-funziona)  → H3 ×5
H2  Gli altri mondi ITnode                  (ponte)
H2  La tua azienda merita più di una presenza online. Merita di essere esplorata.   (#chiusura)
    H3  Entra in Città Digitali             (#richiesta: titolo del form)
```
Anche qui l'H1 su due righe segue `mappa-keyword-url.md` e il copy deck: lo statement sta dentro l'H1, dopo un separatore nascosto alla vista (T6).

**Ordine del sito** (direzione visiva §7.6; copy deck, «Struttura della pagina»): CD-1, CD-3, CD-2, CD-4, CD-6, CD-5. Il video viene prima del portale, e il ponte prima della chiusura, così il form resta l'ultima sezione. Gli ID restano quelli delle versioni precedenti, perché altri documenti li citano; qui le schede seguono l'ordine del sito.

### CD-1 · Hero — `Hero` variante `line`
- **Contenuti** (come nel sito; testi nel copy deck §1).
  - **Breadcrumb** «Home / Città Digitali», nella barra sopra la hero, prima di `<main>`.
  - **Nessun occhiello.** Sulle pagine interne il suo posto lo prende il breadcrumb (direzione visiva §7.8; T11).
  - **H1 su due registri**, con il separatore nascosto « – »: il nome accessibile è «Città Digitali – Le attività del territorio, online senza perdere radici.» (T6).
  - **Sottotitolo** `<p>`, verbatim dalle LG («Siti Immersivi Interattivi»). Se l'utente approva la DR2 del brief, diventa «Siti Interattivi Immersivi», con link a `/siii/` (copy deck §1).
  - **CTA primaria** «Visita il portale ↗» → cittàdigitali.it, con il link in punycode `https://xn--cittdigitali-19a.it`. Nome accessibile: «Visita il portale Città Digitali (si apre in una nuova scheda)». cittadigitali.it senza accento è un progetto omonimo di altri.
  - **Dominio sotto la CTA primaria** (O4 di seo-content, commit 5c4a6cb): «cittàdigitali.it» in mono, come testo semplice e non come link. Aiuta a riconoscere il dominio con l'accento e a distinguerlo dall'omonimo.
  - **Link secondario** «Aderisci a Città Digitali ↓» → `#richiesta`. È la forma breve del copy deck, entro i 28 caratteri della guida di stile.
  - **Ordine del DOM:** pulsante, dominio, «Aderisci». Da 640 px «Aderisci» sta accanto al pulsante e il dominio sotto il pulsante. Il dominio si legge subito dopo il suo pulsante, come una didascalia, e non aggiunge fermate al Tab: l'ordine del focus resta uguale a quello visivo (verifica del 2026-10-05).
  - **Visual.** L'Orizzonte di Città Digitali chiude la hero: rilevamenti e distanze dalla sede verso Varese, Altamura e Caltanissetta. È `aria-hidden`, perché le tre città sono nel testo della pagina. Nella hero non ci sono né foto né poster.
- **Mobile.** Breadcrumb → H1 → sottotitolo → CTA → dominio → link secondario → Orizzonte.

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
  - Etichette dei pulsanti: cambiano con lo stato, senza `aria-pressed` (`accessibilita.md` §2.7; già così in `video.ts`).

### CD-2 · L'Italia in un unico portale — `LocationShowcase` variante `italy` (`#portale`)
- **Contenuti** (copy deck §2): H2, paragrafo, statement, link all'elenco delle città, carta, tre città.
- **Città.** Varese, Altamura e Caltanissetta, da nord a sud. Per ognuna:
  - nome (H3);
  - regione in `label`, con le coordinate del comune (`aria-hidden`);
  - riga;
  - CTA «Esplora ↗», con un nome accessibile completo che comprende il dominio della città.

  Niente dominio visibile e niente foto (direzione visiva §7.6; copy deck, V2).
- **Link all'elenco** «Tutte le città sul portale ↗» → `https://xn--cittdigitali-19a.it/tutte-le-citta/` `[DA VERIFICARE: indirizzo]`.
  - Sta nella colonna del testo, dopo lo statement: lì l'ordine del DOM coincide con l'ordine visivo a ogni larghezza. Dopo l'elenco delle città, da 1280 px, non coinciderebbe.
  - Annuncia la nuova scheda e ha un nome unico nella pagina.
- **Carta con il punto-città** (direzione visiva 0.7, §1.4 e §7.6; proposta di ui-designer P1–P5, da applicare prima del go-live).
  - Un punto per ogni città del portale, con i tre nodi delle schede in evidenza e nessun nome sulla carta.
  - Legenda L1 in `<figcaption>`: «Ogni punto è una città di Città Digitali».
  - **Accessibilità, finché l'elenco completo non sta accanto.** La carta è `role="img"` con la descrizione L6, senza nomi: «Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia.» Le tre città sono già nel testo prima della carta e nelle schede subito dopo (decisione del 2026-10-05).
  - **Con l'elenco completo accanto** la descrizione si toglie, e carta e legenda tornano insieme `aria-hidden`. Le condizioni sono in `docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md` §3.4.
- **Elenco completo**, dopo la conferma del testo della pagina del portale (`docs/strategia/citta-digitali-elenco.md` §4).
  - Sta in questa sezione: visibile a tutti, oppure in un `<details>` con un sommario che dica che cosa contiene.
  - È ordinato per regione, con fonte e data.
  - La sezione va ridisegnata per un elenco lungo. Le tre città restano gli esempi in evidenza.
- **Desktop.**
  - Da 1280 px: carta a destra e città allineate alla latitudine del loro nodo.
  - Tra 1024 e 1279 px: città in elenco accanto alla carta, con l'ordine del DOM uguale all'ordine visivo.
  - Hover o focus su una città accende il suo nodo. È un'eco visiva: le città sono già nominate nella lista.
- **Mobile.** Carta in alto con la legenda, poi le città in pila nello stesso ordine, da nord a sud.

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

### CD-6 · Ponte «Gli altri mondi ITnode» — `Bridge`
Riga editoriale con i link interni a `/puglia-digitale/` e `/siii/` (copy deck §6).
- Viene dopo «Dal locale al nazionale» e prima della chiusura, come la riga ponte di SIII (SI-7): il form resta l'ultima sezione della pagina.
- Sostituisce la proposta «Continua a esplorare → 01 SIII».

### CD-5 · Chiusura e form — `CTASection` variante `form` + `ContactForm` (preselezione `citta-digitali`)
- **Struttura.** Come SI-8: H2 su due livelli tipografici (copy deck §5), poi il blocco `#richiesta` con il titolo H3 «Entra in Città Digitali», senza link, l'introduzione e il form.
- **Perché così.** Come pulsante, «Entra in Città Digitali» si potrebbe leggere come «visita il portale». Come titolo del form, seguito dall'introduzione («ti spieghiamo come entrare in Città Digitali»), dice chiaramente che si tratta di aderire.

## 5. Contatti `/contatti/`

```text
H1  Parliamo del prossimo spazio digitale.
H2  Recapiti                               (#recapiti, visivamente nascosto)
H2  Scrivici                               (#richiesta)
H2  Giacomo Lenoci, Fondatore di ITnode    (Persona)
H2  I portali                              (#portali)
H2  Dati societari                         (#dati-societari)
```
Il form viene prima dei portali, come nel copy deck: i portali sono un'uscita secondaria e su mobile non devono spingere il form più in basso. Ordine del sito: CT-1, CT-2, CT-3, CT-6, CT-4, CT-5.

### CT-1 · Hero compatta (in `contatti.astro`)
- **Contenuti.**
  - Breadcrumb «Home / Contatti», nella barra sopra la hero.
  - H1 verbatim.
  - Lead.
  - **Nessun occhiello:** il suo posto lo prende il breadcrumb (direzione visiva §7.8; copy deck di Contatti, V3).
- **Niente CTA «Scrivici ↓».** Su desktop il form è già nel primo viewport. Su mobile lo stesso salto lo fa «Parliamone» nella barra (→ `#richiesta`).
- **Primo viewport** (misure del 2026-10-05 sullo staging).
  - A 390 × 844 ci stanno i tre canali diretti: la riga dell'email finisce a 748 px.
  - A 1280 × 800 ci stanno i tre canali, il titolo e l'introduzione del form.
  - Il primo campo comincia a 978 px finché il form mostra l'avviso «Il modulo online non è ancora attivo».

### CT-2 · Recapiti e CT-3 · Form — affiancati da 1024 px
- **Ordine del DOM, uguale all'ordine di lettura a tutte le larghezze** (direzione visiva §7.7; copy deck §2 e §3).
  1. **Recapiti**, in un `<address>` con una `<dl>` e l'H2 «Recapiti» visivamente nascosto:
     - Telefono, Mobile, Email;
     - Sede operativa, con la riga delle coordinate del comune (`aria-hidden`) e il link «Apri in Google Maps ↗»;
     - LinkedIn, con la nota «Profilo personale del fondatore».
  2. **Form** (`#richiesta`), con l'H2 «Scrivici».

  Prima vengono i canali diretti (strategia di conversione §4); sede e LinkedIn chiudono il blocco dei recapiti, prima del form. Numeri di telefono con spazi non separabili.
- **Form.** `ContactForm` senza preselezione; `?interesse=` è supportato. Titolo H2, introduzione e alternativa «Preferisci parlarne a voce?» (copy deck §3).
- **Desktop, da 1024 px.** Recapiti a sinistra e form a destra, affiancati dall'alto. L'ordine del focus, recapiti → form, è quello della lettura.
- **Mobile.** Recapiti come righe da toccare, alte almeno 48 px, poi il form.
- **Composizione confermata** da ux-designer il 2026-10-05: è la decisione che chiedeva il copy deck di Contatti.

### CT-6 · Persona — ritratto, nome e ruolo, link al racconto in Home
- **Contenuti** (copy deck §4; direzione visiva §7.7):
  - ritratto con il suo alt;
  - H2 «Giacomo Lenoci, Fondatore di ITnode»;
  - link «Scopri il suo percorso →» → `/#fondatore`.
- **Accessibilità.** Il testo nascosto « nella home» sta subito dopo il testo visibile, e il nome accessibile diventa «Scopri il suo percorso nella home» (2.4.4, 2.5.3). Confermato da ux-designer il 2026-10-05. La forma del testo visibile la decide il creative-director.
- **Posizione.** Dopo il form e prima dei portali: su mobile non toglie spazio ai canali né al form.
- Il numero CT-6 tiene stabili gli ID che altri documenti citano.

### CT-4 · I portali — due righe editoriali
Per ogni portale, Città Digitali e Puglia Digitale:
- **nome come link esterno dentro l'H3.** Il nome accessibile è, per esempio, «Città Digitali, portale cittàdigitali.it»; la nuova scheda è annunciata con `aria-describedby` (A7). Il link di Città Digitali è in punycode;
- frase;
- dominio in mono, `aria-hidden`;
- link interno alla pagina del progetto: «Esplora Città Digitali», «Scopri Puglia Digitale».

Le etichette sono nel copy deck §5.

### CT-5 · Dati societari — blocco testuale piccolo in `<dl>`
Gli stessi dati del footer, da completare prima del go-live (soglia 5).

## 6. Componenti: varianti e dove si usano

| Componente (LG §30) | Varianti | Dove |
|---|---|---|
| Header | stati `top` e `scrolled`; tema chiaro o scuro dello stato `top` | tutte le pagine |
| MobileMenu | `<dialog>` modale | tutte, sotto i 1024 px |
| Footer | — | tutte |
| Hero | `home`, `line`, `compact` | HM-1; SI-1, PD-1, CD-1; CT-1, pagine legali, 404 |
| SectionIntro | titolo e introduzione, allineamenti diversi | HM-5, SI-2, SI-4, SI-6, PD-5, CD-2 |
| LargeStatement | `manifesto`, `territory` | HM-2, HM-4, SI-2, PD-2 |
| ProjectShowcase | `chapter`, `experience`, `compact` | HM-5; SI-6; «Continua a esplorare» e 404 |
| LocationShowcase | `doors`, `italy` | PD-5, CD-2 |
| ImmersivePreview | `poster` (al lancio), `facade` (dopo le verifiche di SI-6) | SI-1, SI-6 |
| FounderTimeline | — | HM-6 |
| BenefitsSection | `zigzag`, `staircase`, `sticky` (nella direzione visiva: zig-zag, scala, sticky) | SI-5, PD-6, CD-4: una variante per pagina, come nella direzione visiva, così le tre pagine non si somigliano |
| Stats | `impact`, più il modulo «Dato documentato» dentro BenefitsSection | PD-4; SI-5 e CD-4 solo con fonte |
| VideoSection | `full-bleed` | CD-3 |
| CTASection | `band`, `form` | HM-7; SI-8, PD-7, CD-5 |
| ContactForm | proprietà `formId`, `preselect`, `title`, `headingLevel` | SI-8, PD-7, CD-5, CT-3 |

- **Fuori da §30, già esistenti o necessari:**
  - `Breadcrumbs` (esiste) e `Media` (esiste);
  - SkipLink;
  - ExternalLink: freccia, testo nascosto, `rel`, attributi `data-*`;
  - ContactDetails: i recapiti usati nel footer, in Contatti e accanto ai form;
  - il blocco di confronto di SI-3 e la figura di PD-3, specifici di una sola pagina.

## 7. Form di contatto (`ContactForm`, `src/scripts/form.ts`)

Qui ci sono struttura, validazione, stati e accessibilità. I testi (etichette, aiuti, errori, pannelli) sono in `docs/contenuti/microcopy.md` §4. Il contratto con l'endpoint e l'antispam sono nella strategia di conversione (§7).

### 7.1 Struttura
- **Impaginazione.**
  - Una colonna, etichette sempre visibili sopra i campi, suggerimenti tra etichetta e campo; nessun placeholder al posto dell'etichetta.
  - In testa la riga sugli obbligatori (microcopy.md §4.1). I campi facoltativi hanno «(facoltativo)» nell'etichetta.
- **Markup del form.**
  - `<form data-contact-form data-form-id="richiesta-…" method="post" action="{endpoint}" aria-labelledby="{id del titolo}">`: con un nome accessibile il form diventa un landmark.
  - `novalidate` lo aggiunge lo script (`form.noValidate = true` in `initForm`). Senza JavaScript restano la validazione nativa e l'invio in POST all'endpoint.
  - **Perché serve** (applicato e verificato il 2026-09-28). Senza `novalidate`, quando si invia un form con campi obbligatori vuoti il browser mostra i suoi fumetti e non genera l'evento `submit`. Riepilogo e messaggi personalizzati non comparirebbero mai.
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
Etichette, suggerimenti e messaggi d'errore sono in `docs/contenuti/microcopy.md` §4.2 (copywriter-brand), che resta la fonte dei testi. Qui ci sono tipi, obbligatorietà e regole.

| Campo | `name` | Tipo e attributi | `autocomplete` | Obbl. | Validazione |
|---|---|---|---|---|---|
| Mi interessa (facoltativo) | `interesse` | 3 checkbox (`siii`, `puglia-digitale`, `citta-digitali`) in `<fieldset>` con `<legend>` | — | no | — |
| Nome e cognome | `nome` | `text`, `maxlength="100"`, `required` | `name` | sì | non vuoto, spazi esclusi |
| Email | `email` | `type="email"`, `maxlength="254"`, `spellcheck="false"`, `autocapitalize="off"`, `pattern` di cro-specialist, `required` | `email` | sì | formato valido; nessun dominio escluso: Gmail, PEC e indirizzi istituzionali vanno bene |
| Telefono (facoltativo) | `telefono` | `type="tel"`, `pattern="[0-9 +\-\.\(\)\/]{6,20}"` | `tel` | no | solo se compilato |
| Azienda o ente (facoltativo) | `azienda` | `text`, `maxlength="150"` | `organization` | no | — |
| Messaggio (facoltativo) | `messaggio` | `textarea`, `rows="5"`, `maxlength="2000"` | — | no | al massimo 2.000 caratteri |
| Privacy | `privacy` | checkbox, `required`, mai preselezionata; «informativa privacy» è un link | — | sì | spuntata |
| (nascosto) | `_gotcha` | honeypot (§7.6) | `off` | — | deve restare vuoto |
| (aggiunti all'invio) | `_elapsed_ms`, `_page`, `_form` | li aggiunge `form.ts` | — | — | controllati dall'endpoint |

- **Etichetta dell'email.** Le LG dicono «Email aziendale»; cro-specialist e copywriter-brand propongono «Email»; decide il cliente. In entrambi i casi nessun blocco sui domini.
- **Asterisco.** Negli obbligatori è `aria-hidden`: l'obbligo lo comunica `required` (microcopy.md §4.1).
- **Posizione dei suggerimenti.** Tra etichetta e campo, anche se microcopy.md chiama la colonna «Aiuto sotto il campo»: quella colonna indica il testo, la posizione la decide questa specifica. Letto prima del campo, il suggerimento resta visibile con la tastiera virtuale e con i menu di completamento automatico.
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
  - Una casella conta come «toccata» solo dopo che è stata spuntata o tolta: il suo `value` («letta») non è mai vuoto e non dice nulla sull'interazione (verifica del 2026-09-28, O1).
  - I campi obbligatori mai toccati si segnalano all'invio.
  - Dopo la comparsa di un errore, il campo si rivalida a ogni modifica e l'errore sparisce appena il valore è corretto (già così in `form.ts`).
- **Dove** (decisione del 2026-09-28 sulla domanda S9 della review UI; sostituisce «tra etichetta e campo»):
  - **Il messaggio sta sotto il campo**; per la privacy, sotto la riga d'aiuto. Il form rivalida dal vivo e toglie l'errore alla prima battuta corretta: con il messaggio sopra, il campo in cui si sta scrivendo salirebbe sotto il dito. Lo stesso testo è nel link del riepilogo che porta al campo, ed è letto con il campo (`aria-describedby`).
  - Testo più icona «!» non letta (`content: '!' / ''`), non solo colore.
  - Prefisso visivamente nascosto «Errore:».
  - Campo con bordo `--error` di 2 px ottenuto con 1 px di bordo più 1 px di ombra interna, senza spostamenti (DS §3.15).
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
| Endpoint assente | `PUBLIC_FORM_ENDPOINT` vuoto in build | **Avviso già al caricamento, prima dei campi** (presente nella build): l'invio online non è attivo, con email e telefono. All'invio valido il form si nasconde e compare il pannello di ripiego: «Prepara l’email con i tuoi dati» (`mailto:` precompilato), indirizzo in chiaro, telefono. **Mai un messaggio di successo.** | focus sul titolo del pannello |
| Errori di validazione | invio con campi non validi | riepilogo ed errori sui campi; dati intatti | focus sul riepilogo |
| Invio in corso | invio valido | «Invio in corso…» visibile accanto al pulsante con un indicatore `aria-hidden`; il pulsante resta «Invia richiesta» con `aria-disabled="true"` (microcopy.md §4.1); `aria-busy` sul form; clic ripetuti ignorati | stato: «Invio in corso…» |
| Inviato | risposta 2xx | pannello di conferma al posto del form: email e interessi letti **prima** di `form.reset()`; prossimi passi solo se confermati `[DA FORNIRE]` | focus sul titolo del pannello |
| Errore di invio | risposta 4xx/5xx, rete assente, timeout di 15 s | pannello d'errore sopra il pulsante, con alternative ed email precompilata; il form resta compilato | focus sul titolo del pannello |
| Honeypot compilato | campo `_gotcha` non vuoto | lo stesso pannello d'errore onesto, mai un finto successo | come sopra |

- **Pannelli.** I pannelli di conferma, ripiego ed errore iniziano con un titolo con `tabindex="-1"`, che riceve il focus (verificato il 2026-09-28).
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
- **creative-director**: ritratto nella sezione fondatore in attesa di DR3; ordine delle porte (PD-5); condizioni per la timeline (HM-6); minimo di `display-xxl` (§0.3).
- **copywriter-content e copywriter-brand.** I copy deck v1.1 sono già allineati su ancora `#richiesta`, H1 su due righe e ordine di Contatti. Restano tre punti:
  - le CTA verso un'ancora della stessa pagina usano ancora `→`. Per esempio «Richiedi un’offerta →» nella hero SIII va a `#richiesta`: la convenzione di cro-specialist vuole `↓`;
  - la regola «la CTA di chiusura diventa il titolo del form» oggi è condizionata («se il form è già visibile»). Va resa fissa: con la composizione della direzione visiva il form è sempre accanto o subito sotto (SI-8);
  - manca il testo del blocco «Continua a esplorare», se viene approvato.
- **seo-content**: testo dei link del blocco «Continua a esplorare».
- **cro-specialist**: formato di `?interesse=`. `form.ts` legge parametri ripetuti (`?interesse=siii&interesse=citta-digitali`), la strategia di conversione parla di valori separati da virgola.
- **Cliente**: testi originali (brief §7 P1), asset, endpoint del form, tempi di risposta garantiti.

## Decisioni richieste
- **Sviluppo** (sessione principale), correzioni al codice esistente:
  - in `form.ts`, `novalidate` impostato dallo script, focus sul titolo dei pannelli e avviso di endpoint assente reso in build;
  - in `immersive.ts`, pulsante «Chiudi l’anteprima» e anteprima solo da 1024 px;
  - il template 404 non mostra il breadcrumb.
- **creative-director**:
  - ordine delle porte in PD-5, lo stesso a tutte le larghezze;
  - timeline del fondatore alle condizioni di HM-6, cioè link di «oggi» fuori dal binario che si muove;
  - minimo di `display-xxl` per i numeri di Stats (§0.3).
- **creative-director**: approvare l'impostazione per le sezioni sticky, i caroselli e le headline su mobile (§0.3–0.4). Sono vincoli di accessibilità, quindi soglie; il modo di rispettarli resta alla direzione visiva.
