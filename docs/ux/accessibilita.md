---
titolo: Requisiti e verifica di accessibilità (WCAG 2.2 AA)
owner: ux-designer
contributi: [ui-designer, web-performance-specialist, cro-specialist, seo-technical, copywriter-content]
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/contenuti/alt-text.md, docs/cro/strategia-conversione.md, docs/seo/specifiche-tecniche.md, src/scripts/, src/components/, "https://w3c.github.io/wcag/techniques/css/C43 (2026-09-28, dai risultati di ricerca: w3.org è bloccato dall'ambiente)", "axe-core 4.13.0 e @axe-core/playwright 4.13.0 dal registry npm (2026-09-28)"]
---

# Requisiti e verifica di accessibilità (WCAG 2.2 AA)

**Obiettivo.** WCAG 2.2 livello AA su tutte le pagine, 404 e pagine legali comprese. È una soglia non negoziabile (CLAUDE.md), anche se le LG §28 scrivono «dove ragionevolmente applicabile».

**Contenuti di terze parti.** Portali ed esperienze SIII aperti in iframe o in nuova scheda non sono sotto il nostro controllo. Garantiamo l'accesso (link, nome, alternativa testuale) e verifichiamo che non intrappolino il focus.

**Ruoli.** Owner dei requisiti: ux-designer (dominio accessibilità, regola 2 dei conflitti). I token li definisce ui-designer, l'implementazione è della sessione principale.

## 1. Riferimenti rapidi

| Tema | Dove è definito |
|---|---|
| Header sticky, menu mobile, breadcrumb, footer | `docs/ux/sitemap.md` §3–6 |
| Outline dei titoli per pagina, regole mobile | `docs/ux/struttura-pagine.md` §0–5 |
| Form: campi, errori, stati | `docs/ux/struttura-pagine.md` §7 |
| Testi alternativi | `docs/contenuti/alt-text.md` |

## 2. Requisiti

### 2.1 Struttura, lingua, titoli
| Requisito | Regola operativa | Criteri |
|---|---|---|
| Lingua | `<html lang="it">`. Frasi intere in un'altra lingua con `lang`: per esempio un marquee con le parole chiave inglesi di LG §02 («Immersive, Interactive, Territory…») ha `lang="en"`. Nomi di marchi e termini entrati nell'uso non ne hanno bisogno. | 3.1.1, 3.1.2 |
| Landmark | `header`, `<nav aria-label="Principale">`, `<nav aria-label="Percorso">` (breadcrumb), `<main id="contenuto">`, `footer` con `<nav aria-label="Piè di pagina">`, `<form>` con nome, `<dialog>` del menu con nome. Nessun'altra `region`: niente `aria-label` sulle `section`. | 1.3.1, 2.4.1 |
| Skip link | «Vai al contenuto» è il primo elemento focalizzabile, visibile al focus e non coperto dall'header. Il bersaglio è `main#contenuto` **senza `tabindex` permanente**. Verificato in Chromium: dopo lo skip link il Tab successivo arriva al primo elemento del contenuto. Con `tabindex="-1"` fisso, invece, ogni clic nel contenuto sposta su `main` il punto di partenza della navigazione, e il Tab riparte dall'inizio. Se un browser o un lettore di schermo di riferimento non segue l'ancora, si aggiunge `tabindex="-1"` solo all'attivazione e lo si toglie al `blur`. | 2.4.1, 2.4.3 |
| Titoli | Un solo H1; nessun salto di livello; statement, eyebrow e numeri non sono titoli (outline in `struttura-pagine.md`). | 1.3.1, 2.4.6 |
| Title della pagina | Unico e descrittivo, da `src/data/pages.ts`. | 2.4.2 |
| Ordine | L'ordine del DOM è l'ordine di lettura mobile; su desktop la griglia non riordina gli elementi interattivi. | 1.3.2, 2.4.3 |
| Liste | Capitoli, benefici, timeline: `<ol>`. Luoghi, numeri, azioni del SIII: `<ul>`. Recapiti: `<dl>` in `<address>`. | 1.3.1 |
| Sigla SIII | L'espansione «Siti Interattivi Immersivi» sta sempre accanto, nello stesso H1. Niente `aria-label` per correggere la pronuncia. Come la leggono NVDA e VoiceOver va verificato in Fase 5. | 3.1.4 (AAA, buona pratica) |

### 2.2 Tastiera e focus
| Requisito | Regola operativa | Criteri |
|---|---|---|
| Tutto da tastiera | Menu, CTA, pulsanti del video, anteprime immersive, pausa del marquee, form. Niente scorciatoie da tastiera globali. | 2.1.1, 2.1.4 |
| Nessuna trappola | Il menu è modale per scelta: Esc e «Chiudi» lo chiudono sempre. Iframe immersivi: pulsante «Chiudi l’anteprima» subito dopo, e verifica che il Tab esca dall'iframe. | 2.1.2 |
| Focus visibile | `:focus-visible` su tutti gli elementi interattivi. Contorno di almeno 2 px, scostamento di almeno 2 px, contrasto di almeno 3:1 con i colori adiacenti. Su foto e video, doppio anello chiaro e scuro. Mai `outline: none` senza un sostituto. | 2.4.7, 1.4.11 |
| Focus non coperto | `html { scroll-padding-top: calc(var(--header-h) + 1rem) }` (applicato in `global.css`) e nessuno `scroll-margin-top` in aggiunta (tecnica C43). Le colonne sticky non contengono elementi interattivi e non si sovrappongono al contenuto che scorre. Un eventuale banner dei cookie non copre il focus: `scroll-padding-bottom` pari alla sua altezza, oppure spazio riservato. | 2.4.11 |
| Menu mobile | È un `<dialog>` modale. Il focus parte da «Chiudi» e resta nel menu; Esc lo chiude e il focus torna su «Menu». Scegliendo un'ancora della stessa pagina, il focus va al bersaglio (già così in `header.ts`). Dettagli in `sitemap.md` §4. | 2.4.3, 4.1.2 |
| Arrivo dalle ancore | `#richiesta`: focus sul titolo del form (`tabindex="-1"`), mai su un campo. `#esempi`: scroll alla sezione. | 2.4.3 |
| Nessun cambio di contesto | Focus o selezione, per esempio in «Mi interessa», non inviano, non ricaricano e non spostano. | 3.2.1, 3.2.2 |

### 2.3 Puntatore e target
| Requisito | Regola operativa | Criteri |
|---|---|---|
| Dimensione minima | Almeno 24 × 24 px CSS per ogni target. Fanno eccezione i link dentro una frase e i target con spazio sufficiente intorno. | 2.5.8 |
| Obiettivo di progetto | Almeno 44 × 44 px per: pulsante «Menu» e «Chiudi», CTA, controlli del video, pausa del marquee, pulsanti del form, righe di telefono ed email su mobile. Voci del menu mobile alte almeno 48 px. Checkbox di almeno 24 × 24 px, con l'etichetta cliccabile. | 2.5.8 (buona pratica) |
| Niente trascinamento | Nessuna funzione che richieda trascinamento o gesti: niente slider prima/dopo nel confronto, niente caroselli a swipe, nessun iframe immersivo su mobile. | 2.5.1, 2.5.7 |
| Etichetta nel nome | Il nome accessibile inizia con il testo visibile. Per disambiguare si aggiunge testo nascosto dopo quello visibile, mai un `aria-label` che lo sostituisce (per esempio «Esplora» + « Monopoli su monopolidigitale.it (si apre in una nuova scheda)»). | 2.5.3 |
| Attivazione | Si usano `button` e `a` nativi, che si attivano al rilascio. | 2.5.2 |

### 2.4 Colore e contrasto (da verificare sui token appena esistono)
**Soglie**
- Testo almeno 4,5:1.
- Testo grande almeno 3:1: da 24 px, oppure da 18,66 px in grassetto.
- Almeno 3:1 anche per: bordi dei campi, componenti, icone informative, indicatori di focus.
- Link nel testo sottolineati. Errori con testo e icona, mai solo con il colore.

**Coppie da misurare** (owner ui-designer; esito in §4.4)
1. Testo principale e secondario (eyebrow, didascalie, footer, riga legale) su ogni superficie: chiara, scura, di accento.
2. Testo dei link del breadcrumb. Oggi hanno `opacity: 0.72`: si misura il colore risultante, e meglio sarebbe un colore di token.
3. Testo del pulsante sul suo fondo. Bordo o fondo del pulsante rispetto alla pagina, se serve a riconoscerlo come pulsante.
4. Bordi dei campi e anello di focus rispetto a entrambi i colori adiacenti.
5. Testo e icone di errore.
6. Header nello stato `top` sopra la hero (area peggiore di foto o video) e nello stato `scrolled`.
7. Testo sopra foto, poster e video con velatura: si misura sull'area più chiara del fotogramma o del ritaglio più sfavorevole, anche su mobile.
8. Icone dei controlli video sopra il video (almeno 3:1).
9. Colori dei marchi Puglia Digitale e Città Digitali (blu, arancione), se entrano nella UI. L'arancione su fondo chiaro di solito non raggiunge 4,5:1: non si usa per il testo `[DA VERIFICARE sui valori reali]`.
10. Numeri di Stats e numeri decorativi, se sono in colore d'accento.

### 2.5 Testo, zoom, reflow
| Requisito | Regola operativa | Criteri |
|---|---|---|
| Ingrandimento del testo | Ogni dimensione fluida contiene una parte in `rem` (`clamp(… rem, … rem + … vw, … rem)`), mai solo `vw`. | 1.4.4 |
| Reflow | A 320 px CSS niente scorrimento orizzontale. Ogni headline ha un corpo minimo che fa stare nella colonna la sua parola più lunga (misure in `struttura-pagine.md` §0.3, script in Appendice B). Le tabelle, su mobile, si impilano oppure scorrono in un contenitore focalizzabile con nome. | 1.4.10 |
| Spaziatura del testo | Niente altezze fisse né `overflow: hidden` permanente sui contenitori di testo. Le maschere del text reveal si tolgono a fine animazione. | 1.4.12 |
| Contenuto al passaggio o al focus | Nessuna informazione solo al passaggio del mouse. Ciò che compare al passaggio compare anche al focus e al tocco, si chiude con Esc e resta finché serve. | 1.4.13 |
| Orientamento | Nessun blocco. | 1.3.4 |

### 2.6 Movimento
- Il movimento è un miglioramento: lo attiva `@media (prefers-reduced-motion: no-preference)`.
- Senza JavaScript tutto è visibile: gli stati iniziali nascosti valgono solo con `reveal-ready`, come già in `reveal.ts`.
- Nessun lampeggiamento sopra le 3 volte al secondo, anche nel video (2.3.1).

| Movimento | Con `reduce` |
|---|---|
| Reveal allo scroll, text reveal | Nessuno: testo e immagini già al loro posto |
| Parallax, immagini che si muovono con lo scroll, scale leggere | Fermi |
| Marquee | Fermo e leggibile per intero |
| Autoplay del video | Assente: poster e pulsante di riproduzione (già in `video.ts`) |
| Scroll fluido verso le ancore | `scroll-behavior: auto` |
| Apertura del menu, cambio di stato dell'header | Istantanei |
| Timeline del fondatore che trasla, indicatore 01/05 | Fermi: la timeline diventa una griglia statica |
| Transizione tra pagine (`@view-transition`, direzione visiva) | Nessuna: `@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none; } }` |

**Marquee (2.2.2 Pausa, stop, nascondi).** Se si muove da solo per più di 5 secondi insieme ad altro contenuto, serve un modo per fermarlo.
- **Soluzione adottata** (direzione visiva; **confermata da ux-designer**): il marquee è legato allo scroll. Si muove solo quando l'utente scorre e si ferma con lui: non parte da solo, quindi il criterio 2.2.2 non si applica e non serve un pulsante di pausa. Per questo `marquee.ts` è stato rimosso.
- **Se in futuro si sceglie un moto autonomo** il controllo torna obbligatorio: pulsante di pausa visibile accanto al marquee, raggiungibile da tastiera, di almeno 24 × 24 px (obiettivo 44), prima del marquee nel DOM.
- **Copie per il ciclo.** Hanno `aria-hidden="true"`.
- **Marquee decorativi.** Se ripetono contenuti presenti altrove come testo (i verbi del SIII sopra l'elenco delle 7 azioni, la catena spazio fisico → territorio), l'intero blocco è `aria-hidden`.

### 2.7 Video e pulsanti a due stati
| Requisito | Regola operativa | Criteri |
|---|---|---|
| Niente audio automatico | Autoplay solo muto; l'audio si attiva solo su richiesta. | 1.4.2 |
| Pausa | Durante l'autoplay il pulsante Pausa è visibile e raggiungibile subito. | 2.2.2 |
| Controlli | `<button>`: Riproduci/Pausa, Audio, Sottotitoli (se esiste la traccia), Schermo intero. Visibili al focus e al tocco, non solo al passaggio del mouse; almeno 44 × 44 px; contrasto di almeno 3:1 sul video. | 2.1.1, 4.1.2, 1.4.11 |
| Stato dei pulsanti a due stati | **Una sola tecnica:** l'etichetta cambia («Riproduci il video» ↔ «Metti in pausa il video», «Attiva l’audio» ↔ «Disattiva l’audio») **senza** `aria-pressed`. Usarle entrambe fa annunciare «Metti in pausa il video, premuto», che si contraddice. `video.ts` è già corretto. | 4.1.2 |
| Nome | `<video aria-labelledby="{id dell'H2}">`. | 4.1.2 |
| Alternative | Parlato: sottotitoli WebVTT in italiano (1.2.2). Informazioni solo visive: descrizione testuale in `<details>` «Leggi la descrizione del video» sotto il player (1.2.3). A livello AA serve la descrizione audio (1.2.5) se il video mostra informazioni che non sono né nell'audio né nel testo della pagina. La soluzione più semplice è scrivere il testo della pagina in modo che copra tutto ciò che il video mostra. Da decidere dopo averlo visto `[DA VERIFICARE: durata, audio, parlato]`. | 1.2.1–1.2.5 |

### 2.8 Immagini e slot vuoti
| Requisito | Regola operativa | Criteri |
|---|---|---|
| Testi alternativi | Quelli di `alt-text.md`. Decorative: `alt=""`. Logo: `alt="ITnode"`. Immagine dentro un link che ha già testo: `alt=""`. | 1.1.1 |
| Testo nelle immagini | Niente testo significativo dentro le immagini. La foto dell'evento ha cornice e scritta sovrimpresse: si usano i ritagli in `derivate/`, e l'originale resta `[DA FORNIRE]`. | 1.4.5 |
| Veridicità | Tre immagini hanno il segno di Gemini e tutte e quattro le foto del fondatore sembrano elaborate. Alt e didascalie descrivono ciò che si vede, senza presentare come reali eventi non documentati (soglia 1; brief DR3). | 1.1.1 |
| **Slot vuoti (decisione)** | Finché un asset manca, il segnaposto di `Media.astro` ha `aria-hidden="true"`, senza `role="img"` né `aria-label`: prima annunciava l'alt dell'immagine futura, cioè un'immagine che non c'era. Già corretto. L'etichetta visiva «Asset in arrivo» serve solo a chi rivede lo staging. In produzione nessuno slot resta vuoto: si riempie o si toglie dalla composizione (checklist §4.3). | 1.1.1, 4.1.2 |

### 2.9 Link e nuove schede
| Requisito | Regola operativa | Criteri |
|---|---|---|
| Nuova scheda (decisione) | Tutti i link esterni si aprono in una nuova scheda: esperienze, portali, luoghi, LinkedIn, mappa. Nel link: freccia `↗` con `aria-hidden` e testo visivamente nascosto «(si apre in una nuova scheda)», dopo il nome della destinazione. Stessa resa ovunque. I link interni mai in nuova scheda. `rel="noopener"`, senza `noreferrer`. | G201; 3.2.4 |
| Scopo del link | CTA ripetute («Esplora», «Entra nell’esperienza», «Visita il portale») completate con testo nascosto (luogo, esperienza, portale). Niente «clicca qui». | 2.4.4 |
| Frecce | `→`, `↓` e `↗` sempre `aria-hidden`. | 1.1.1 |
| Telefono ed email | `tel:` e `mailto:` con il numero o l'indirizzo visibile come testo del link. Nei numeri, spazi non separabili. | 2.4.4 |

### 2.10 Form
Tutto il comportamento è in `struttura-pagine.md` §7. Criteri coperti:
- etichette visibili e associate (1.3.1, 3.3.2);
- `autocomplete` su nome, email, telefono e organizzazione (1.3.5);
- errori identificati in testo e suggeriti (3.3.1, 3.3.3);
- riepilogo con focus;
- stato «Invio in corso…» annunciato (4.1.3);
- dati mai persi (3.3.7);
- nessun CAPTCHA.

### 2.11 Contenuti immersivi (iframe dei SIII)
- **Caricamento solo su richiesta.** Pulsante «Avvia l’anteprima di …»; accanto, la nota su quale sito viene caricato.
- **Iframe.** Ha un `title` descrittivo. Dopo il caricamento il focus entra nell'iframe (come fa `immersive.ts`). Subito dopo l'iframe c'è «Chiudi l’anteprima», che riporta allo stato iniziale e rimette il focus sul pulsante.
- **Solo da 1024 px in su.** Su mobile c'è solo il link in nuova scheda.
- **Alternativa sempre presente.** Nome, luogo, frase descrittiva e link all'esperienza, anche senza anteprima.
- **Movimento.** Nessuna rotazione automatica, se il viewer la permette di disattivare `[DA VERIFICARE]`. Nota breve prima del caricamento: «Esperienza a 360°: ti muovi con mouse, dita o tastiera».
- **Consenso.** Se l'iframe imposta cookie non tecnici, si carica solo dopo il consenso (soglia 5).

### 2.12 Coerenza e aiuto
| Requisito | Regola operativa | Criteri |
|---|---|---|
| Navigazione coerente | Header, menu e footer con le stesse voci, nello stesso ordine, su tutte le pagine. | 3.2.3 |
| Identificazione coerente | Stesse etichette per le stesse funzioni: «Parliamone», le frecce, «(si apre in una nuova scheda)». | 3.2.4 |
| Aiuto coerente | I recapiti (telefono, email) stanno nel footer, sempre nello stesso ordine. Accanto a ogni form, le alternative «Preferisci parlarne a voce?» sono sempre nella stessa posizione rispetto al form. | 3.2.6 |

### 2.13 Criteri non applicabili (con motivo)
- **1.2.4 Sottotitoli in diretta**: nessun contenuto in diretta.
- **2.2.1 Tempo regolabile**: nessun limite di tempo. I 3 secondi dell'antispam sono un minimo lato server, non un limite per l'utente.
- **3.3.4 Prevenzione degli errori**: il form non comporta impegni legali o finanziari.
- **3.3.8 Autenticazione accessibile**: nessun login.
- **2.5.4 Azionamento tramite movimento**: nessuna funzione del sito usa il movimento del dispositivo. Il viewer in iframe è di terzi e compare solo su desktop.

## 3. Problemi già individuati (prima della build)

| # | Problema | Dove | Criterio | Soluzione | Owner | Stato |
|---|---|---|---|---|---|---|
| 1 | Con i minimi delle LG (64 e 44 px) alcune headline sarebbero uscite dalla colonna a 320 px, per esempio «tecnologia» (299 px su 280). Con la scala della direzione visiva (Schibsted Grotesk) resta solo «~200.000» in `display-xxl`: 300 px su 280. | tipografia | 1.4.10 | Minimo di `display-xxl` ≤ 4 rem, oppure numeri in `display-xl` sotto i 360 px (`struttura-pagine.md` §0.3) | creative-director, ui-designer | aperto |
| 2 | Senza `scroll-padding-top`, ancore ed elementi raggiunti con Shift+Tab finiscono sotto l'header sticky (verificato in Chromium con una pagina di prova) | header | 2.4.11 | `scroll-padding-top` su `html`; niente `scroll-margin-top` | sviluppo | risolto (`global.css`) |
| 3 | Chiudendo il menu su un'ancora della stessa pagina, il focus torna su «Menu» | `header.ts` | 2.4.3 | Focus al bersaglio (titolo del form) | sviluppo | risolto (`header.ts`) |
| 4 | `<dialog>` del menu senza nome; scroll della pagina non bloccato con il menu aperto | `header.ts` e markup | 4.1.2; usabilità | `aria-label="Menu"`; `html:has(dialog[open]) { overflow: hidden }` | sviluppo | risolto (`Header.astro`) |
| 5 | Etichetta che cambia **e** `aria-pressed` sugli stessi pulsanti | `video.ts`, `marquee.ts` | 4.1.2 | Solo cambio di etichetta | sviluppo | risolto: `video.ts` corretto, `marquee.ts` rimosso |
| 6 | Slot vuoti annunciati come immagini | `Media.astro` | 1.1.1 | `aria-hidden="true"` sul segnaposto | sviluppo | risolto (commit `ca49129`) |
| 7 | Separatore del breadcrumb letto («barra») e `opacity` sul testo dei link | `Breadcrumbs.astro` | 1.3.1; 1.4.3 | Separatore in `<span aria-hidden>`; colore di token `--fg-2` al posto dell'opacità | sviluppo, ui-designer | risolto; resta da misurare il contrasto di `--fg-2` (§2.4) |
| 8 | Focus sul contenitore dei pannelli del form invece che sul titolo. Lo script non imposta `novalidate`: se manca anche nel markup, la validazione nativa blocca `submit` e il riepilogo non compare. | `form.ts` | 2.4.3, 3.3.1, 4.1.3 | Titolo con `tabindex="-1"` come bersaglio; `form.noValidate = true` in `initForm` | sviluppo | da correggere |
| 9 | Anteprima immersiva senza un modo per uscirne e disponibile anche su mobile | `immersive.ts` | 2.1.2, 2.5.7 | «Chiudi l’anteprima»; solo da 1024 px | sviluppo | da correggere |
| 10 | Foto con segno di Gemini, cornice e scritta sovrimpresse | asset | soglia 1; 1.4.5 | Brief DR3; ritagli `derivate/`; originali `[DA FORNIRE]` | cliente, creative-director | aperto |
| 11 | Video non ispezionabile (host bloccato): audio, parlato, lampeggiamenti sconosciuti | `/citta-digitali/` | 1.2.x, 2.3.1 | File sul sito; sottotitoli e descrizione dopo la visione | cliente, copywriter-content | aperto |
| 12 | Iframe dei portali: comportamento da tastiera e cookie non noti | `/siii/` | 2.1.2; soglia 5 | Anteprima solo dopo le verifiche; al lancio, link | sviluppo, QA | aperto |
| 13 | Timeline del fondatore orizzontale, sticky e traslata dallo scroll, con i link di «oggi» sul binario che si muove: si potrebbe dare il focus a un link fuori dallo schermo | home, direzione visiva §7.3 | 2.4.7, 2.4.11 | Nessun elemento focalizzabile nella parte che trasla; condizioni in `struttura-pagine.md` HM-6 | creative-director, sviluppo | aperto |
| 14 | Porte dei luoghi in ordine diverso tra desktop (longitudine) e mobile (dalla costa all'entroterra) | `/puglia-digitale/` | 2.4.3, 1.3.2 | Stesso ordine a tutte le larghezze (`struttura-pagine.md` PD-5) | creative-director | aperto |

## 4. Checklist di verifica (Fase 5)

### 4.1 Automatica: axe-core via Playwright
- **Preparazione**: `npm i -D playwright@1.56.1 @axe-core/playwright@4.13.0`.
  - La versione 1.56.x corrisponde al Chromium già installato nell'ambiente (revisione 1194): non eseguire `playwright install`.
  - Il markup deve avere `data-site-header`, `data-menu-open` e `form[data-contact-form]`.
- **Esecuzione**: `npm run build && npm run preview`, poi `BASE_URL=http://localhost:4321 node tests/a11y.mjs` (script in Appendice A, provato su pagine di test con difetti noti).
- **Copertura.** Tutte le pagine più un URL inesistente, a 390 × 844 e 1280 × 800, con `prefers-reduced-motion: reduce` per non misurare elementi a metà animazione. Tag `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`.
- **Tag `wcag22aa`: serve anche a `target-size`.** In axe-core 4.13 la regola `target-size` è disattivata di default: parte solo se si filtra per `wcag22aa`.
- **Cosa controlla**
  1. Violazioni axe.
  2. Ancore interne che finiscono sotto l'header.
  3. Elementi raggiunti con Shift+Tab dopo uno scroll e coperti dall'header (2.4.11).
  4. Menu mobile aperto: violazioni axe, nome del `<dialog>` (axe lo controlla solo per `role="dialog"` esplicito), focus nel menu, ritorno del focus dopo Esc.
  5. Form inviato vuoto: violazioni con gli errori visibili.
- **Criterio di uscita.** Zero violazioni `critical` e `serious`. Le altre vengono classificate e registrate in §4.4.

### 4.2 Percorso da sola tastiera
Va eseguito a 1280 px e a 390 px (con l'emulazione del dispositivo o il ridimensionamento). Ogni passo ha un esito atteso.

1. **`/`, primo Tab**: compare «Vai al contenuto», in alto e sopra l'header. Invio, poi Tab: il focus arriva al primo elemento interattivo del contenuto.
2. **Header**: logo → SIII → Puglia Digitale → Città Digitali → Contatti → Parliamone. Anello di focus visibile ovunque; voce corrente marcata non solo dal colore.
3. **Contenuto**: ordine uguale a quello visivo. Nessun focus su elementi nascosti (menu chiuso, copie del marquee, duplicati dei visual). Nessun elemento con il focus sotto l'header, anche con Shift+Tab dopo aver scorso con la rotella.
4. **Capitoli della home**: un solo elemento focalizzabile per capitolo, la CTA.
5. **Marquee** (se si anima da solo): la pausa si raggiunge e funziona con Invio e Spazio.
6. **Mobile, menu**: Tab fino a «Menu», poi Invio → focus su «Chiudi». Tab gira solo dentro il menu. Esc lo chiude e il focus torna su «Menu». Su `/siii/`, «Parliamone» nel menu → menu chiuso, pagina su `#richiesta`, focus sul titolo del form.
7. **`/siii/`**
   - «Esplora gli esempi ↓» porta a `#esempi`.
   - Le CTA degli esempi annunciano la nuova scheda.
   - Con l'anteprima attiva: «Avvia l’anteprima» → iframe → Tab esce su «Chiudi l’anteprima» → il focus torna al pulsante.
   - Confronto: leggibile come tabella con il lettore di schermo, su desktop e su mobile.
8. **Form (su ogni pagina che lo ha)**
   - Invio a vuoto → focus sul riepilogo; i link del riepilogo portano ai campi.
   - Errori corretti → spariscono.
   - Invio → «Invio in corso…» annunciato → pannello con il focus sul titolo.
   - Errore di rete (simulato con `page.route` solo in test) → dati intatti e alternative visibili.
   - Il link all'informativa apre una nuova scheda e annuncia la nuova scheda.
9. **`/citta-digitali/`, video**: Riproduci/Pausa e Audio si usano con Invio e Spazio. Nulla parte con l'audio. Con reduce nessun autoplay; con l'autoplay attivo la pausa si raggiunge subito.
10. **404**: tutte le vie d'uscita raggiungibili. Stato HTTP 404 verificato con `curl -I`.

### 4.3 Altre verifiche
- **Zoom.**
  - 200% a 1280 px: nessuna perdita di contenuto o di funzione.
  - 400%, cioè 320 × 256 CSS px: niente scorrimento orizzontale; headline dentro la colonna; header non sticky (altezza sotto i 480 px).
- **Spaziatura del testo (1.4.12).** Si inietta questo CSS: `* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important } p { margin-bottom: 2em !important }`. Risultato atteso: niente testo tagliato o sovrapposto.
- **Movimento ridotto.** Impostazione del sistema operativo, oltre all'emulazione: niente animazioni, contenuto completo.
- **Contrasto.** Tutte le coppie di §2.4, sui token e sulle aree peggiori di foto e video, con esito registrato.
- **Target.** Regola `target-size` di axe, più una prova su dispositivo reale per menu, form e controlli video.
- **Lettori di schermo**, prova rapida. Ambienti: NVDA con Firefox o Chrome su Windows; VoiceOver con Safari su iOS. Cosa controllare: elenco dei titoli e dei landmark, menu, form (errori e stati), tabella di confronto, video, annuncio della nuova scheda, lettura di «SIII».
- **Prima del go-live.**
  - Nessuno slot vuoto; nessun testo segnaposto (`[DA FORNIRE]`, `[DA VERIFICARE]`) in pagina.
  - Endpoint del form configurato.
  - Sottotitoli e descrizione del video presenti, se servono.
- **Limiti dell'ambiente.** Qui c'è solo Chromium: le prove con Firefox, WebKit, VoiceOver e dispositivi reali richiedono un altro ambiente `[DA FORNIRE: dispositivi o servizio di test]`.

### 4.4 Registro dei problemi (da compilare in Fase 5)

| Data | Pagina e stato | Problema | Criterio | Gravità | Soluzione | Owner | Verificato |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — |

## Ipotesi da validare
- Lo skip link senza `tabindex` permanente funziona con i browser e i lettori di schermo di riferimento: verificato solo in Chromium.
- Il video si può rendere accessibile con sottotitoli e descrizione testuale, senza una versione con descrizione audio.
- I portali che ospitano i SIII non impostano cookie non tecnici all'interno dell'iframe.

## Domande aperte
- **Cliente**:
  - il video ha parlato o musica, e lampeggiamenti?
  - quali foto sono scatti reali?
  - c'è un banner di consenso (dipende dagli strumenti di misura)?
  - ci sono dispositivi o un servizio per i test fuori da Chromium?
- **ui-designer**: valori dei token per misurare le coppie di §2.4; corpi minimi delle headline con il font scelto.
- **seo-technical**: conferma dell'etichetta «Percorso» per il breadcrumb.

## Decisioni richieste
- **Sessione principale (sviluppo)**: applicare le correzioni 8 e 9 di §3 (`form.ts`, `immersive.ts`). Le correzioni 2–7 sono già applicate.
- **creative-director**: problemi 1, 13 e 14 di §3. Sono vincoli di accessibilità; come rispettarli resta una scelta della direzione visiva.
- **Utente, con creative-director**: DR3 sulle immagini del fondatore (problema 10). Incide sulla veridicità e sugli alt.
- **web-performance-specialist**: autoplay del video solo su desktop (`struttura-pagine.md` CD-3).

## Appendice A · `tests/a11y.mjs`
Provato il 2026-09-28 su pagine di test:
- rileva le ancore e gli elementi coperti dall'header senza `scroll-padding-top`, e passa quando la regola c'è;
- rileva `target-size` e un contrasto insufficiente;
- rileva il `<dialog>` senza nome.

```js
// Fase 5 · accessibilità automatica: axe-core + focus non coperto dall'header sticky (2.4.11)
// Prerequisiti: npm i -D playwright@1.56.1 @axe-core/playwright@4.13.0   (1.56.x = Chromium preinstallato)
// Uso: npm run build && npm run preview, poi BASE_URL=http://localhost:4321 node tests/a11y.mjs
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const PAGES = (process.env.PAGES ?? '/,/siii/,/puglia-digitale/,/citta-digitali/,/contatti/,/privacy-policy/,/cookie-policy/,/pagina-inesistente/').split(',');
const VIEWPORTS = { mobile: { width: 390, height: 844 }, desktop: { width: 1280, height: 800 } };
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const HEADER = '[data-site-header]';

const browser = await chromium.launch();
let problems = 0;
const report = (vp, path, msg) => { problems++; console.log(`[${vp}] ${path} · ${msg}`); };

for (const [vp, viewport] of Object.entries(VIEWPORTS)) {
  for (const path of PAGES) {
    // AxeBuilder richiede browser.newContext(); reducedMotion evita falsi positivi durante i reveal
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: 'networkidle' });

    // 1. axe-core (il tag wcag22aa attiva anche target-size, disattivata di default)
    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    for (const v of violations) report(vp, path, `${v.impact} · ${v.id} · ${v.help} · nodi: ${v.nodes.length}`);

    // 2. Ancore interne (#contenuto, #richiesta, #esempi): il bersaglio non parte sotto l'header
    const anchors = await page.$$eval('a[href^="#"]:not([href="#"])', as => [...new Set(as.map(a => a.getAttribute('href')))]);
    for (const hash of anchors) {
      const covered = await page.evaluate(([h, sel]) => {
        const t = document.getElementById(decodeURIComponent(h.slice(1)));
        if (!t) return false;
        location.hash = ''; location.hash = h;
        return t.getBoundingClientRect().top < document.querySelector(sel).getBoundingClientRect().bottom - 1;
      }, [hash, HEADER]);
      if (covered) report(vp, path, `ancora ${hash}: il bersaglio parte sotto l'header`);
    }

    // 3. Scroll manuale + Shift+Tab: l'elemento precedente non resta coperto dall'header
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 120) {
      const ready = await page.evaluate(([y, sel]) => {
        window.scrollTo(0, y);
        const hb = document.querySelector(sel).getBoundingClientRect().bottom;
        const q = 'main a[href], main button, main input, main select, main textarea, main summary, main [tabindex="0"]';
        const first = [...document.querySelectorAll(q)].find(el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.top >= hb && r.bottom <= innerHeight;
        });
        first?.focus({ preventScroll: true });
        return !!first;
      }, [y, HEADER]);
      if (!ready) continue;
      await page.keyboard.press('Shift+Tab');
      const r = await page.evaluate(sel => {
        const el = document.activeElement, hd = document.querySelector(sel);
        if (!el || el === document.body || hd.contains(el)) return null;
        const b = el.getBoundingClientRect(), h = hd.getBoundingClientRect();
        return { covered: b.top >= h.top && b.bottom <= h.bottom, label: (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40) };
      }, HEADER);
      if (r?.covered) report(vp, path, `focus coperto dall'header: «${r.label}»`);
    }
    // 4. Stati da controllare con axe: menu mobile aperto, form inviato vuoto (errori visibili)
    if (vp === 'mobile' && (await page.$('[data-menu-open]'))) {
      await page.click('[data-menu-open]');
      const { violations: menu } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      for (const v of menu) report(vp, path, `menu aperto · ${v.impact} · ${v.id} · ${v.help}`);
      // axe controlla il nome solo per role="dialog" esplicito, non per <dialog>: verifica diretta
      if (!(await page.getByRole('dialog', { name: /\S/ }).count())) report(vp, path, 'menu aperto · il <dialog> non ha un nome accessibile');
      if (!(await page.evaluate(() => !!document.activeElement?.closest('dialog[open]')))) report(vp, path, 'menu aperto · il focus non è nel menu');
      await page.keyboard.press('Escape');
      if (!(await page.evaluate(() => document.activeElement?.matches('[data-menu-open]')))) report(vp, path, 'menu chiuso con Esc · il focus non torna su «Menu»');
    }
    if (await page.$('form[data-contact-form]')) {
      await page.click('form[data-contact-form] [type="submit"]');
      const { violations: form } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      for (const v of form) report(vp, path, `form con errori · ${v.impact} · ${v.id} · ${v.help}`);
    }
    await context.close();
  }
}
await browser.close();
console.log(problems ? `Problemi: ${problems}` : 'Nessun problema rilevato');
process.exitCode = problems ? 1 : 0;
```

## Appendice B · `tests/headline-fit.mjs`
Calcola il corpo massimo che fa stare la parola più lunga di ogni headline nella colonna a 320, 360 e 390 px. Serve per fissare i minimi dei `clamp()` con il font definitivo. Esempio d'uso: `node tests/headline-fit.mjs src/assets/fonts/<font>.woff2 700 -0.02 20` (argomenti: file del font, peso, tracking in em, margine laterale in px).

```js
// Fase 3–5 · massimo corpo delle headline che sta nella colonna mobile (WCAG 1.4.10)
// Uso: node tests/headline-fit.mjs <font.woff2> <peso> <tracking-em> [margine-laterale-px]
import { chromium } from 'playwright';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [font, weight = '700', tracking = '-0.02', margin = '20'] = process.argv.slice(2);
const WORDS = ['un’esperienza.', 'l’innovazione.', 'all’entroterra.', 'accompagna', 'Interagisci.', '~200.000', 'Interattivi'];
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:T;src:url("${pathToFileURL(resolve(font))}");font-weight:${weight}}
span{font:${weight} 100px T;letter-spacing:${tracking}em;white-space:nowrap;position:absolute}</style><span id="s"></span>`;
const file = join(mkdtempSync(join(tmpdir(), 'fit-')), 'fit.html');
writeFileSync(file, html);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(file).href);
await page.evaluate((w) => document.fonts.load(`${w} 100px T`), weight);
for (const word of WORDS) {
  const em = await page.evaluate((t) => { const s = document.getElementById('s'); s.textContent = t; return s.getBoundingClientRect().width / 100; }, word);
  const max = (vw) => Math.floor((vw - 2 * Number(margin)) / em);
  console.log(`${word.padEnd(16)} ${em.toFixed(2)} em · max 320: ${max(320)} px · 360: ${max(360)} px · 390: ${max(390)} px`);
}
await browser.close();
```
