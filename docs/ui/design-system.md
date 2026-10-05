---
titolo: Design system
owner: ui-designer
contributi: [creative-director, ux-designer, web-performance-specialist]
stato: bozza
versione: 0.6
aggiornato: 2026-10-05
fonti: [docs/creativa/direzione-visiva.md (0.6), docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md, docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md, docs/review/2026-10-05-legenda-mappa-copywriter-brand.md, docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md, docs/strategia/citta-digitali-elenco.md (0.2), src/data/citta-digitali.json, scripts/generate-maps.mjs, commit 0a61546 e 2a038de, docs/review/2026-09-29-sito-ricontrollo-c14-ui-designer.md, docs/review/2026-09-29-rotazione-orizzonte-mobile-ux-designer.md, docs/ux/accessibilita.md (§2.6), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/strategia/coordinate-luoghi.md (0.3), docs/decisioni/005-preload-del-font.md, docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/ux/sitemap.md, docs/ux/struttura-pagine.md, docs/ux/accessibilita.md, docs/performance/budget.md, docs/performance/architettura.md, docs/contenuti/microcopy.md, docs/contenuti/copy-deck/home.md, docs/seo/specifiche-tecniche.md, docs/review/2026-09-28-sito-fedelta-ui-designer.md, docs/review/2026-09-28-sito-verifica-fedelta-ui-designer.md, src/styles/tokens.css, src/styles/global.css, src/components/, src/pages/, misure Playwright 1.56 e sharp 0.35 del 2026-09-28 (staging http://localhost:4321, variante «in pubblicazione» http://localhost:4322)]
---

> **Versione 0.6.** Allineata alla direzione visiva 0.6 e alla carta del capitolo 03 della Home applicata in 0a61546 e 2a038de.
> - **Il punto-città** è un nuovo segno del dispositivo delle Coordinate: un punto Ø 5 px per ogni città di Città Digitali, con l'anello nel colore della superficie (§1.5, §2.4).
> - **I nomi** si scelgono al build per due classi di larghezza della carta: 5 sulle carte strette, 9 sulle larghe, senza sovrapposizioni.
> - **Legenda e accessibilità:** la legenda è «Ogni punto è una città di Città Digitali». La carta è un'immagine con una descrizione costruita dagli stessi dati (`role="img"`, `aria-label`).
> - **Dati:** un file solo, `src/data/citta-digitali.json`, letto dal generatore delle carte (§5.4).
> - **Aperto:** per la carta di `/citta-digitali/` c'è una proposta per il creative-director (`docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md`).
>
> La 0.5 aveva chiuso R1 e R2 (rotazione mobile dell'orizzonte in `max(60svh, 60vw)`, ponti in `display-s`). La 0.4 aveva reso decisioni applicate C14-1, N7, N8 e C14-4; la 0.3 aveva allineato il sistema al verdetto del G4. Le proposte ancora aperte portano il numero dell'osservazione (S5, i token di §7, la carta di `/citta-digitali/`): restano proposte finché il creative-director non le decide.

# Design system ITnode

**Cos'è.** Le regole operative per costruire e far crescere il sito senza perdere il linguaggio della direzione visiva. Le **decisioni** (palette, scala, dispositivi firma, motion, ritmo) sono del creative-director in `docs/creativa/direzione-visiva.md`: qui diventano token, componenti e regole d'uso. Un valore diverso dalla direzione visiva compare solo come proposta, nella sezione 7.

**Dove sta cosa.**

| Cosa | File |
|---|---|
| Token (custom properties) | `src/styles/tokens.css` |
| Stili di base, tipografia, stati di motion | `src/styles/global.css` |
| Componenti | `src/components/` (`layout/`, `sections/`, `ui/`) |
| Logo, favicon, logo per i dati strutturati | `src/assets/brand/itnode-wordmark.svg`, `public/favicon.*`, `public/apple-touch-icon.png`, `public/brand/logo-itnode.png` (script: `scripts/generate-brand.mjs`) |
| Carte | `src/data/maps.json` (script: `scripts/generate-maps.mjs`) |
| Immagine social | `public/og/default.jpg` (sorgente e script: `scripts/og/`) |
| Asset mancanti e segnaposto | `src/data/asset-slots.ts` |

**Tre regole prima di tutto.**
1. Ogni sezione dichiara una superficie (`surface-calce`, `surface-pietra`, `surface-notte`): i colori dei componenti arrivano dai token semantici della superficie, mai da un esadecimale.
2. Il rettangolo è lo spazio (raggio 0), il cerchio è l'interazione (pillola e nodi). Nessun altro raggio, nessuna ombra, nessun gradiente.
3. Nessun componente senza stato di focus visibile, senza variante mobile ripensata e senza versione ferma (`prefers-reduced-motion`, niente JavaScript).

---

## 1. Fondamenta

### 1.1 Colore

**Palette** (valori della direzione visiva §2; nomi dei token in `tokens.css`).

| Token | Hex | Ruolo |
|---|---|---|
| `--calce` | #F3F1EC | Fondo principale, «cielo» (spazio fisico) |
| `--pietra` | #E4DFD5 | Superficie alternata, «terra» della hero, segnaposto su chiaro |
| `--inchiostro` | #141413 | Testo, pulsante primario su chiaro, cartografia su chiaro |
| `--inchiostro-2` | #55514A | Testo secondario, etichette mono su chiaro |
| `--notte` | #0F1317 | Superfici scure (spazio digitale), footer, menu mobile |
| `--notte-2` | #1A2027 | Superficie rialzata su scuro: segnaposto, campi |
| `--testo-notte-2` | #A9AFB6 | Testo secondario ed etichette su scuro |
| `--blu-node` | #3C71A5 | La «o» del logo; nodi-hotspot e focus su calce |
| `--blu-node-scuro` | #2D5A87 | Sottolineatura dei link su chiaro, focus su pietra |
| `--blu-node-chiaro` | #8DB3DC | Nodi-hotspot, link e focus su scuro |
| `--terra` | #A65308 | Nodo-luogo e simboli numerici su chiaro |
| `--arancio-segnale` | #E07F1F | Nodo-luogo e simboli numerici su scuro, **mai su chiaro** |
| `--linea` / `--linea-notte` | #CCC5B7 / #2B333D | Filetti decorativi |
| `--bordo-campo` / `--bordo-campo-notte` | #7A7468 / #6E7680 | Bordi dei campi |
| `--errore` / `--errore-notte` | #B42318 / #FF8A7A | Messaggi di errore |
| `--successo` / `--successo-notte` | #2E6B3F / #86CFA0 | Conferma di invio |
| `--selezione` | #BFDDD8 | Solo `::selection` (il verde-acqua della trama del logo) |

**Token semantici per superficie** (i componenti usano solo questi).

| Token | `surface-calce` | `surface-pietra` | `surface-notte` |
|---|---|---|---|
| `--bg` | calce | pietra | notte |
| `--fg` · `--fg-2` | inchiostro · inchiostro-2 | inchiostro · inchiostro-2 | calce · testo-notte-2 |
| `--line` | linea | linea | linea-notte |
| `--link-underline` | blu-node-scuro | blu-node-scuro | blu-node-chiaro |
| `--focus` | blu-node | blu-node-scuro | blu-node-chiaro |
| `--node` (hotspot) | blu-node | blu-node | blu-node-chiaro |
| `--place` (luogo) | terra | terra | arancio-segnale |
| `--field-bg` · `--field-border` | calce · bordo-campo | calce · bordo-campo | notte-2 · bordo-campo-notte |
| `--btn-bg` · `--btn-fg` | inchiostro · calce | inchiostro · calce | calce · inchiostro |
| `--error` · `--success` | errore · successo | errore · successo | errore-notte · successo-notte |
| `--slot-bg` (segnaposto) | pietra | calce | notte-2 |
| `--wordmark` (lettere del logo) | inchiostro | inchiostro | calce |

**Contrasti misurati** (formula WCAG 2.x, calcolati il 2026-09-28 sui valori esadecimali). Soglie: testo 4,5:1; testo grande (≥ 24 px, o ≥ 18,66 px in grassetto) 3:1; componenti, bordi, icone informative e focus 3:1.

| Coppia | Rapporto | Uso ammesso |
|---|---|---|
| inchiostro su calce · su pietra | 16,33 · 13,88 | ogni testo |
| inchiostro-2 su calce · su pietra | 6,99 · 5,94 | ogni testo |
| calce su notte · su notte-2 | 16,52 · 14,54 | ogni testo |
| testo-notte-2 su notte · su notte-2 | 8,43 · 7,42 | ogni testo |
| blu-node su calce | 4,54 | testo (al limite), grafica, focus |
| blu-node su pietra · su notte · su notte-2 | 3,86 · 3,64 · 3,20 | **solo grafica** (nodi, anello del logo), mai testo |
| blu-node-scuro su calce · su pietra | 6,36 · 5,41 | testo blu quando serve, sottolineature, focus |
| blu-node-chiaro su notte · su notte-2 | 8,54 · 7,51 | link, nodi, focus su scuro |
| terra su calce | 4,82 | testo breve, simboli, nodi |
| terra su pietra | 4,09 | **solo grafica e testo grande** (nodi, simboli dei numeri in display) |
| arancio-segnale su notte · su notte-2 | 6,42 · 5,65 | testo, simboli, nodi |
| arancio-segnale su calce | 2,57 | **vietato** |
| linea su calce · su pietra · linea-notte su notte | 1,52 · 1,29 · 1,46 | **solo decorativo**: mai l'unico confine di un componente |
| bordo-campo su calce · su pietra | 4,11 · 3,49 | bordi dei campi e dei controlli |
| bordo-campo-notte su notte · su notte-2 | 4,06 · 3,57 | bordi dei campi su scuro |
| errore su calce · su pietra | 5,82 · 4,95 | messaggi di errore |
| errore-notte su notte · su notte-2 | 8,14 · 7,16 | messaggi di errore su scuro |
| successo su calce · su pietra | 5,65 · 4,81 | conferma |
| successo-notte su notte · su notte-2 | 10,17 · 8,94 | conferma su scuro |
| calce su blu-node (cifra nel nodo numerato) | 4,54 | cifra del nodo su chiaro |
| pietra su blu-node | 3,86 | **non** per la cifra del nodo (vedi §7, n. 5) |
| inchiostro su selezione | 12,77 | testo selezionato |
| pietra su calce · notte-2 su notte | 1,18 · 1,14 | cambio di superficie: decorativo, mai confine di un controllo |

Queste misure rispondono alle «coppie da misurare» di `docs/ux/accessibilita.md` §2.4, punti 1, 2 (il breadcrumb ora usa `--fg-2`, non più l'opacità: 6,99 e 5,94), 3, 4, 5, 9 e 10. Restano da misurare in pagina: header nello stato `top` su foto o video (punto 6), testo su foto (7), controlli sul video (8).

**Regole d'uso.**
- Proporzioni per pagina: calce ~55%, notte ~25%, pietra ~15%, accenti ≤ 5%.
- Il blu non fa mai da sfondo di sezione, non entra in gradienti, non colora i titoli; **mai pulsanti blu**.
- Link nel testo: colore del testo più sottolineatura di 1 px in `--link-underline`, 2 px all'hover. Il link non dipende dal solo colore.
- Arancio solo su scuro; su chiaro si usa `--terra`. Entrambi segnano solo luoghi e simboli numerici (+ ~ %).
- Niente gradienti, ombre, bagliori, trasparenze vetrose. Due sfumature ammesse, entrambe maschere di trasparenza e mai di colore (direzione §2, G4):
  - la maschera del ritratto verso la carta (§1.7);
  - la dissolvenza ai bordi della finestra dell'Orizzonte: al massimo 2rem per lato, solo su tacche ed etichette, mai sulla linea, che resta piena da bordo a bordo (§2.1; S1, eccezione registrata).
- Colori dei marchi Puglia Digitale e Città Digitali: solo dentro i loro loghi, mai nella UI.

### 1.2 Tipografia

| Famiglia | File | Uso | Caricamento |
|---|---|---|---|
| Schibsted Grotesk Variable (400–900), OFL 1.1 | `@fontsource-variable/schibsted-grotesk`, latin, WOFF2 45,9 KB | tutto il testo e i titoli | preload (confermato al G4: ADR 005, con le condizioni per riaprire la decisione), `font-display: swap`, fallback con metriche (`Schibsted Grotesk Fallback` su Arial, `… Fallback Roboto` su Android) |
| Fragment Mono 400, OFL 1.1 | `@fontsource/fragment-mono`, latin, WOFF2 24,8 KB | etichette, gradi, coordinate, numeri di sezione | senza preload |

**Copertura verificata** (2026-09-28, confronto delle larghezze con due font di ripiego): entrambi i font contengono à è é ì ò ù À È É Ì Ò Ù ç « » ’ ‘ “ ” – — … ° · € × ↑ ↓ ′ ″. **Mancano → e ↗** (e №): le frecce sono sempre SVG inline (§1.5), anche ↑ e ↓, per avere lo stesso tratto.

**Scala** (valori in px alle larghezze indicate; `clamp()` con parte in `rem`, WCAG 1.4.4).

| Token · classe | Uso | 320 | 390 | 768 | 1024 | 1440 | Peso | Interl. | Tracking |
|---|---|---|---|---|---|---|---|---|---|
| `--fs-display-xxl` · `.t-display-xxl` | numeri giganti, «SIII», «404°», numeri dei capitoli | 59,5* | 72 | 139 | 185 | 259 | 600 | 0,82 | −0,045em |
| `--fs-display-xl` · `.t-display-xl` | H1 delle hero, chiusure forti | 47,8* | 52 | 75 | 90 | 115 | 600 | 0,92 | −0,035em |
| `--fs-display-l` · `.t-display-l` | H2 di sezione, statement | 40 | 40 | 57 | 68 | 86 | 600 | 0,98 | −0,03em |
| `--fs-display-m` · `.t-display-m` | arrivo del Passaggio che scende di gradino, descrittori, nomi dei capitoli, citazioni (400); partenza di un Passaggio o titolo di una sezione o di una voce (600) | 28 | 28 | 39 | 47 | 60 | 400 · 600 (regole sotto) | 1,04 | −0,022em |
| `--fs-display-s` · `.t-display-s` | titoli di voce (benefici, luoghi, tappe); frase dei ponti «Gli altri mondi ITnode» | 22 | 22 | 26 | 28 | 32 | 600; 400 nella frase dei ponti, che non è un titolo | 1,1 | −0,015em |
| `--fs-lead` · `.t-lead` | paragrafi d'apertura (≤ 42ch) | 20 | 20 | 21 | 22 | 23 | 400 | 1,4 | −0,005em |
| `--fs-body` · `.t-body` | testo corrente (≤ 66ch) | 17 | 17 | 18 | 19 | 20 | 400 | 1,55 | 0 |
| `--fs-small` · `.t-small` | didascalie, microcopy, note legali, etichette dei campi | 15 | 15 | 15 | 15 | 15 | 400/600 | 1,5 | 0 |
| `--fs-label` · `.t-label` | etichette mono maiuscole, gradi, coordinate | 12 | 12 | 12 | 13 | 13 | 400 | 1,4 | +0,06em |

\* Sotto i 390 px i due gradini più grandi scendono per il reflow (WCAG 1.4.10): minimi `3.5rem` (`clamp(3.5rem, 0.16rem + 17.8vw, 17.5rem)`) e `2.75rem` (`clamp(2.75rem, 1.79rem + 6vw, 9.375rem)`). Da 390 px in su i valori della direzione non cambiano. Applicati il 2026-09-28 (§7, n. 1, e review, B1).

**Reflow a 320 px** (colonna utile 280 px; Schibsted reale, tracking dei token; misure Chromium). Verificato il 2026-09-28 su tutte le pagine a 320, 390, 768, 1024 e 1440 px: nessuna riga di testo fuori viewport.

| Parola più lunga | Token | Larghezza a 320 px | Esito |
|---|---|---|---|
| «~200.000» | display-xxl, 59,5 px | 250 px | ok |
| «Cominciamo» (chiusura della Home, secondo registro) | display-xl, 47,8 px, rientro 0 a 320 px (§2.5) | 270 px | ok |
| «La tecnologia» (primo registro H1) | display-xl, 47,8 px | 282 px | va a capo lasciando «La» da solo: non è un'uscita; correzione facoltativa in V11 |
| «tecnologia» · «esplorata.» | display-xl, 47,8 px | 224 · 214 px | ok |
| «un’esperienza.» · «l’innovazione.» · «infrastruttura» | display-l, 40 px | 264 · 245 · 239 px | ok |
| «accompagna» · «infrastruttura» | display-m, 28 px | 159 · 160 px | ok |

**Regole.**
- Due pesi: 600 per titoli e grassetto, 400 per il resto. Niente corsivi. Maiuscolo solo nelle etichette mono.
- **Peso di `display-m`** (direzione 0.4 §3.2 e §1.5, regola del G4 su S4, precisata dopo la verifica C14). Il peso segue il gradino. Il codice è conforme (misura del 2026-09-29 su 8 pagine a 1440 px):
  - **600 come partenza di un Passaggio.** I Passaggi composti interamente in `display-m` stanno a 600 in tutti e due i registri, perché l'arrivo non scende di gradino e quindi non cambia voce: su `/siii/` l'hero «Non raccontare la tua azienda. / Falla esplorare.», «Il sito diventa un luogo.», «Una visita che diventa azione.»;
  - **600 come titolo** (H2 o H3) di una sezione o di una voce: titolo del video, nomi delle città, «Perché scegliere un SIII», «Perché aderire a Puglia Digitale», nome della sezione Persona in Contatti, H1 della 404;
  - **400** quando è l'arrivo che scende da una partenza più grande (secondo registro della hero della Home, arrivo degli statement dei capitoli e del fondatore), un descrittore (hero di linea), il nome di un capitolo, una citazione (fondatore) o una frase di raccordo non composta come Passaggio («Un’impresa. Un territorio. Una rete di città.»); anche il marquee della Home e i numeri «01–05» di Città Digitali, che non sono titoli.
- **`display-s`** è a 600 come titolo di voce e a 400 nella frase dei ponti («Gli altri mondi ITnode», `sections/Bridge.astro`), che non è un titolo: l'occhiello del ponte è in `label` mono. I ponti non usano `display-m` (direzione 0.5 §3.2, R2, decisa).
- Due titoli consecutivi non usano lo stesso gradino; la seconda riga di un Passaggio può scendere di un gradino, mai salire.
- `text-wrap: balance` sui titoli, `pretty` sui paragrafi; niente sillabazione nei titoli; `lang="it"`. Un Passaggio è sempre un titolo, anche quando è un `<p>`: le sue righe d'autore si bilanciano (`.passage .line { text-wrap: balance }` in `Passage.astro`: applicato, V4, verificato in C14).
- A capo d'autore nel contenuto (righe separate o `<br>`), mai affidati al browser; su mobile si rivedono con il copy deck.
- Numeri approssimati: il simbolo è `aria-hidden` e il testo nascosto dice «circa» / «oltre».
- Cifre tabellari (`tnum`) in tabelle, coordinate e tempi del video.
- Mai testo centrato, tranne le etichette dei gradi sotto le tacche.

### 1.3 Spaziatura

Base 4/8 px. I token di spazio sono fissi; i padding di sezione sono fluidi.

| Token | rem | px | Uso tipico |
|---|---|---|---|
| `--space-3xs` | 0,25 | 4 | distanza etichetta–valore, icona–testo piccolo |
| `--space-2xs` | 0,5 | 8 | interno dei chip, gap delle etichette mono |
| `--space-xs` | 0,75 | 12 | etichetta–campo, righe di una legenda |
| `--space-s` | 1 | 16 | paragrafo–paragrafo, gap minimo tra controlli |
| `--space-m` | 1,5 | 24 | titolo di voce–testo, campo–campo |
| `--space-l` | 2 | 32 | occhiello–titolo grande, testo–CTA |
| `--space-xl` | 3 | 48 | gruppi dentro una sezione |
| `--space-2xl` | 4 | 64 | blocchi di una composizione |
| `--space-3xl` | 6 | 96 | stacco tra statement e contenuto |
| `--space-4xl` | 8 | 128 | aria editoriale su desktop |
| `--space-5xl` | 12 | 192 | aria delle aperture di capitolo (solo ≥ 1024 px) |
| `--section-pad` | fluido | 72 → 146 (390 → 1440) | padding verticale delle sezioni |
| `--section-pad-tight` | fluido | 48 → 90 | sezioni in sequenza sulla stessa superficie |

**Ritmo.** Occhiello → titolo: `--space-l`. Titolo display → lead: `--space-xl`. Lead → body: `--space-m`. Testo → CTA: `--space-l`. Tra le voci di un elenco editoriale: `--space-3xl` su desktop, `--space-xl` su mobile. Su mobile si scende di un gradino, non si comprime tutto in proporzione.

### 1.4 Griglia e breakpoint

| Breakpoint | Intervallo | Colonne | Margine (`--page-margin`) | Gutter (`--gutter`) | Colonna | Header |
|---|---|---|---|---|---|---|
| mobile | < 700 px (`< 43.75em`) | 4 | 20 px | 16 px | 75 px a 390 | 64 px, logo 24 px, «Parliamone» compatto, «Menu» |
| tablet | 700–1023 px | 8 | 31 px a 768 | 19 px a 768 | 72 px a 768 | come mobile |
| desktop | ≥ 1024 px (`64em`) | 12 | 38 → 51 px (1024 → 1440) | 22 → 27 px | 59 → 87 px | 76 px, logo 28 px, 4 voci e «Parliamone» |
| contenitore | `--page-max` 1600 px | — | — | — | — | — |

- Mobile first: il DOM segue l'ordine di lettura mobile; su desktop la griglia sposta i blocchi, non ne cambia l'ordine (niente `order` sui blocchi con link).
- Rientri del Passaggio: 2 colonne su desktop, 1 su tablet, 1,2em su mobile; nella cascata a tre registri 2 e 4 colonne, 1 e 2, 1,2 e 2,4em, nessuno a 320 px (§2.5, N1).
- A tutta larghezza (oltre i margini) solo l'Orizzonte della hero e il Video.
- Sticky solo con viewport ≥ 1024 × 720 px e con l'elemento sticky più basso del viewport meno l'header.
- Breakpoint nei media query sempre in `em` (43.75em, 64em): seguono lo zoom del testo.

### 1.5 Forme, filetti, icone

| Elemento | Regola |
|---|---|
| Raggio 0 | immagini e soglie, campi, pannelli del form, tabelle, segnaposto, banner |
| Pillola (`--radius-pill`) | pulsanti e CTA con fondo o bordo, interruttore del confronto, toggle delle preferenze cookie |
| Cerchio (50%) | nodi, punti-città delle carte (Ø 5), pulsanti dei controlli video (44 px) |
| Filetto decorativo | 1 px `--line`: divisori, righe di tabella, contorno dei segnaposto |
| Bordo di controllo | 1 px `--field-border` (≥ 3:1); 2 px `--error` in errore, senza spostamenti di layout (ombra interna o bordo già riservato) |
| Focus | contorno 2 px `--focus`, scostamento 3 px; su foto e video doppio anello calce + inchiostro (`--focus-ring-media`) |
| Ombre, gradienti, sfocature | nessuno. Tre tecniche accettate perché disegnano un tratto, non una sfumatura: le tacche con `repeating-linear-gradient` a stop netti; l'anello scuro di 1 px (ombra a raggio pieno, senza sfocatura) attorno ai nodi su foto; l'anello di 1,5 px nel colore della superficie (`box-shadow: 0 0 0 1.5px var(--bg)`) attorno ai punti-città e ai nodi delle carte con i punti, che li ritaglia dalla costa e dai vicini (direzione 0.6 §1.4) |

**Icone.** Solo funzionali, mai decorative. SVG inline 24 × 24, tratto 1,5 px, terminazioni squadrate, `fill: none`, `currentColor`, `aria-hidden="true"`; il nome sta nel testo del controllo.

| Icona | Dove | Dimensione |
|---|---|---|
| → freccia destra | link a un'altra pagina | 0,9em del testo |
| ↓ freccia giù | ancora nella stessa pagina (`#richiesta`, `#esempi`) | 0,9em |
| ↗ freccia esterna | sito esterno, nuova scheda | 0,9em |
| ↑ freccia su | «Torna all'inizio» (facoltativo) | 0,9em |
| riproduci · pausa | nodo dei controlli del video | 20 px in pulsanti da 44 px |
| — | «Audio», «Schermo intero» (e «Sottotitoli», se servono) | pillole testuali da 44 px: più chiare delle icone (accettato il 2026-09-28) |
| chiudi (×) | anteprima, banner cookie | 20 px in pulsanti da 44 px |
| errore (!) | messaggi di errore dei campi e riepilogo | 16 px, accanto al testo |

«Menu» e «Chiudi» del menu mobile sono testo, non icone.

### 1.6 Motion

**Token:** `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (ingressi) · `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` (aperture, menu) · `--dur-150` `--dur-250` `--dur-500` `--dur-700` `--dur-1000` `--dur-1400`.

| Movimento | Funzione (una sola) | Token | Con `prefers-reduced-motion` |
|---|---|---|---|
| Reveal | far entrare un blocco nella lettura | 700 ease-out, cascata 80 ms, max 4 | visibile subito |
| Text reveal | leggere un Passaggio riga per riga: ogni riga d'autore sale dalla propria maschera (padding 0,12em, margine −0,12em; registri in colonna flex finché la maschera c'è, così le righe salgono già alla spaziatura finale e togliere la maschera non sposta nulla: CLS 0, verificato al pixel) | 700 ease-out, cascata 90 ms | visibile subito |
| Apertura (firma) | entrare in un'immagine dall'orizzonte | 1000 ease-in-out; otturatori in `transform` (già in `global.css`) | aperta |
| Parallax | profondità di una sola immagine per schermata | scroll, ±6% max 48 px | fermo |
| Rotazione dell'orizzonte | guardarsi intorno | `translateX` della striscia graduata, lineare e legato allo scorrimento della pagina (`scroll(root block)`), senza inerzia propria: hero della Home +60° nei primi 100svh su tablet e desktop e nei primi `max(60svh, 60vw)` su mobile (R1); fine della hero di Città Digitali +40° nei primi 100svh. Mai più veloce della pagina. Nessun invito a scorrere: è una scoperta, non una promessa (direzione §5) | inquadratura iniziale (`animation-name: none`) |
| Marquee | la catena del concept | scroll, ~0,4× la velocità (0,43–0,50 px per pixel di scorrimento, misura di ux-designer) | riga statica |
| Disegno di linea | tracciare costa e orizzonte del tempo | 1400 ease-in-out (direzione) · ≤ 1200 (performance): da allineare | già disegnata |
| Ping del nodo | segnalare un punto esplorabile | 1000 ease-out, una volta, cascata 120 ms | niente |
| Hover e focus del nodo | aprire l'etichetta | 250 ease-out, anello ×1,4 | solo cambio di colore |
| Hover dei link · delle CTA | risposta al puntatore | 150 · 250 ease-out; freccia +4 px | cambio di colore |
| Hover della soglia | invito a entrare | 700 ease-out, scala 1,03, solo `(hover: hover) and (pointer: fine)` | niente |
| Menu mobile | apertura del pannello | 250 / 150 ease-out, voci a cascata 40 ms (≤ 300 ms) | istantaneo |
| Header sticky | fondo pieno dopo il primo scroll | 150 ease-out | istantaneo |
| View transition | continuità tra pagine | 250 ease-out, solo CSS | disattivata |

**Movimento legato allo scorrimento** (orizzonte, marquee; direzione 0.5 §5 e §6, `accessibilita.md` §2.6).
- Lineare, senza inerzia propria, fermo quando l'utente smette di scorrere; dentro `prefers-reduced-motion: no-preference` e `@supports (animation-timeline: scroll())`.
- **Mai più veloce della pagina:** al massimo 1 px di spostamento per pixel di scorrimento, anche con il telefono in orizzontale. Se l'intervallo è in `svh`, lo si limita con la corsa dell'elemento, come `max(60svh, 60vw)` nella hero della Home: `60vw` è la corsa della striscia, 60° su un campo di 100°. Con un altro campo o un'altra rotazione diventa (rotazione ÷ campo) × 100vw.
- **L'intervallo si sceglie guardando la finestra visibile:** conta la parte di movimento che si vede sotto l'header sticky, non lo stato finale (R1).
- Timeline dello scorrimento della pagina (`scroll(root block)`) con un intervallo esplicito, non `view()`: l'orizzonte è già in vista al caricamento, e con una timeline di vista la rotazione partirebbe già avanzata.

**Regole tecniche.** Solo `transform`, `opacity` (e `clip-path` dove non si può evitare). Un solo IntersectionObserver. Scroll-driven animations dentro `@supports`, con proprietà longhand (lo shorthand viene scartato dopo la build: `architettura.md` §6.5). Senza JavaScript tutto è visibile. Vietati: scroll-jacking, smooth scroll di libreria, easing elastici, flip 3D, animazioni di `filter`, lettera per lettera, loop autonomi, ritardi prima della leggibilità.

### 1.7 Immagini e formati (La Soglia)

| Formato | Rapporto | Uso |
|---|---|---|
| Porta | 3:5 | luoghi (Porte di Puglia Digitale) |
| Ritratto | 4:5 | ritagli verticali della foto evento |
| Quadrato | 1:1 | ritratto del fondatore in Home (`fondatore-braccia-conserte`, taglio 566, 36, 480 × 480) |
| Ritratto 3:4 | 3:4 | ritratto in Contatti (`fondatore-in-piedi`, taglio 470, 40, 420 × 560) |
| Schermo | 16:10 | esperienze SIII, portali |
| Panorama | 2,27:1 (foto evento), 21:9 (panorami futuri) | documenti larghi |
| Video | 16:9 | video Città Digitali |

- **Foto documentali:** colore intatto, solo tagli (§4.2 della direzione); AVIF/WebP; mai oltre 1200 px CSS per la foto evento.
- **Nodi sulle foto:** calce, per il contrasto su sfondi variabili (decisione del G4, §2.3); mai sul corpo di una persona, sempre su un oggetto o un luogo della scena (N7).
- **Foto dell'evento senza conferma dell'informativa sulle riprese (C07):** ritagli stretti su schermi e palco, senza i profili riconoscibili ai margini (direzione §4.2). Li prepara ui-designer se la conferma non arriva; li verifica il creative-director.
- **Ritratti del fondatore (DR3).** Il sito applica (b), scelta della sessione principale in attesa della conferma dell'utente (ADR 002); parere del creative-director: (b) per il lancio, (c) appena possibile (direzione §4.3). Trattamento «inchiostro»: luminanza pesata sul blu, contrasto ×1,2 −30, mappatura inchiostro → calce, maschera verso destra. Solo su fondo `calce` (la sfumatura va verso la carta). Home ≤ 400 px CSS (`max-width: 25rem`), Contatti ≤ 320 px CSS.
  - **Maschera** (decisione del G4, direzione §4.3; applicata e verificata in C14): Home `linear-gradient(to right, #000 40%, transparent 74%)`; Contatti, figura più stretta, `linear-gradient(to right, #000 36%, transparent 68%)`. I valori precedenti (62% → 100% e 48% → 86%) lasciavano leggibili skyline e «reti luminose»; questi sono il massimo ottenibile dai derivati attuali.
  - Un taglio più stretto non basta: lo skyline sta dietro il braccio. Sotto, in mono `small`: «Immagine generata o elaborata con strumenti di intelligenza artificiale» (`src/data/media.ts`) `[DA VERIFICARE: testo definitivo di brand-strategist e consulente legale]`. Mai a colori, mai con didascalie di luogo o data, mai le due immagini scartate (§4.3).
  - **Contatti, sezione Persona:** ritratto, nome e ruolo (`display-m` 600, H2) e, sotto, il link «Scopri il suo percorso nella home →» verso `/#fondatore`, 32 px sotto il nome, alto 44 px (N5, applicato).
- **Testo sopra le immagini:** di norma no. Se serve, velatura piena misurata sull'area peggiore del ritaglio più sfavorevole (≥ 4,5:1).
- **Rapporto fisso sempre dichiarato** (`aspect-ratio`): la sostituzione di un segnaposto non genera CLS.

---

## 2. Dispositivi firma

### 2.1 L'Orizzonte (`ui/Horizon.astro`)

| | |
|---|---|
| **Anatomia** | linea 1 px `--fg`; tacche sotto la linea ogni 5° (6 px), 15° (12 px), 45° (20 px); etichette `label` mono solo ogni 45° («045°»; cardinali «000° N», «090° E», «180° S», «270° O»), 26 px sotto la linea, cioè sotto le tacche; nodi-luogo `--place` sulla linea (nella hero solo il punto Ø 10: sono `aria-hidden` e non interattivi) con etichetta sotto e linea di richiamo (max 3 file); dissolvenza ai bordi della finestra (maschera di trasparenza di 2rem per lato su tacche ed etichette, mai sulla linea: eccezione della direzione §2, S1) |
| **File delle etichette** | Nessun richiamo attraversa un'etichetta. Le file si alternano a partire dalla seconda (`row = (gruppo + 1) % 2` in `Horizon.astro`). Così il luogo isolato tra due gruppi sta nella fila alta e il suo richiamo resta corto. Le etichette dei luoghi oltre il centro si appendono a sinistra del nodo (centri per breakpoint calcolati al build). Verificato da 320 a 1920 px, a riposo e in rotazione, sulla hero e su Città Digitali (applicato in c025181, V5); rimisurato in C14 dopo le coordinate nuove (C11) e il campo di 200° sul tablet (V14): nessun incrocio. **Se cambiano luoghi, coordinate, centri o campi visivi, si rimisura**: con C11 il gruppo murgiano è passato oltre il centro mobile e la sua etichetta ha cambiato lato (C14-1, risolto con il centro a 238°). Si misurano anche gli ingressi durante la rotazione, sotto l'header sticky (R1). **Si rimisura anche** se cambiano il campo visivo mobile, la rotazione, la quota dell'orizzonte o l'altezza dell'header |
| **Varianti** | *hero* (Home: a tutta larghezza; desktop e tablet 200° centrati su 170°, con il tablet dalla decisione del G4 su V14, solo per la Home; mobile 100° centrato su 238°, max 2 etichette compatte: decisione della direzione 0.4 §5 su C14-1, applicata in 100b578. Il gruppo murgiano a riposo è intero da 340 px e fuori dalla dissolvenza da 380; a 320 sporge di 7 px, residuo accettato. Durante la rotazione (+60° in `max(60svh, 60vw)`: R1, direzione 0.5 §5, applicata in df66be6) Varese entra intera e fuori dalla dissolvenza mentre è ancora sotto l'header: 260–330 px di scorrimento a 390 × 844, 200–280 a 360 × 640. La striscia va a 0,46–0,56 px per pixel in verticale e a 1,00 con il telefono in orizzontale, dove l'header non è sticky); *hero di linea* (Città Digitali, fine hero: 100°, 150° e 200° su mobile, tablet e desktop, centro 263°, rotazione +40°; sul tablet resta a 150°, perché con 200° Caltanissetta e Varese si sovrappongono da 700 a 900 px); *capitolo* (tratto statico con il rilevamento, 01 = 000°, 02 = 120°, 03 = 240°: una tacca 1 × 20 px `--fg` all'inizio del filo, non un nodo, e l'etichetta 26 px sotto la linea, mai sulla tacca, V3, applicato); *tempo* (timeline del fondatore, tappe ordinali, non in scala); *404* (vedi sotto) |
| **Variante 404** | Linea 1 px `--fg` graduata come l'Orizzonte: tacche sotto la linea ogni 5°, 15° e 45° (6, 12, 20 px), con 360° pari a tre colonne più i loro gutter, così 120° e 240° cadono esattamente all'inizio della seconda e della terza colonna (`--deg: calc((100% + var(--gutter)) / 72)`, unità di 5°). I tre mondi a 000°, 120°, 240°: ogni nodo (punto `--node` Ø 10) sta dentro l'area del link del suo mondo, perché il blu è interazione, e mostra l'anello Ø 26 su hover e focus. Colonne allineate in alto (`align-content: start`). Sotto i 1024 px i mondi vanno in pila e solo il primo nodo sta sulla linea (S10, N6, applicati e verificati in C14). Il nodo è centrato sulla tacca del suo rilevamento (`left: -4.5px`: C14-4, applicato in 100b578, scarto misurato 0,0 px) |
| **Stati** | statico; rotazione legata allo scorrimento della pagina (+60° nella Home, +40° su Città Digitali; lineare, mai più veloce della pagina: §1.6); con reduced motion inquadratura iniziale |
| **Accessibilità** | `aria-hidden`: i luoghi hanno link veri altrove; didascalia dell'osservatore in testo reale |
| **Performance** | SVG inline generato al build, ≤ 6 KB, niente JS per il disegno |
| **Non si fa** | curve, prospettive, bagliori, mirini, numeri di telemetria inventati, più di un orizzonte per schermata (per questo la copertina del video non ne ha uno, V10), etichette sopra la linea, inviti allo scorrimento: la rotazione resta una scoperta per chi scorre, non una promessa (direzione §5, 0.3) |

### 2.2 La Soglia (`global.css` `.aperture` + `ui/Media.astro`)

| | |
|---|---|
| **Anatomia** | rettangolo a spigoli vivi con rapporto fisso (§1.7); immagine `object-fit: cover`; eventuale didascalia mono sotto, mai sopra |
| **Varianti** | foto, schermata, poster del video, segnaposto (§4) |
| **Stati** | chiusa (fessura) → aperta (movimento firma, una volta); hover 1,03 solo con puntatore fine; focus del link collegato: doppio anello attorno alla soglia |
| **Accessibilità** | `alt` da `alt-text.md`; se il link vero è la CTA, l'immagine cliccabile è un duplicato `tabindex="-1"` e `aria-hidden` |
| **Non si fa** | angoli arrotondati, ombre, cornici, vetro, più di una soglia in movimento per schermata |

### 2.3 Il Nodo (`ui/Node.astro`)

| | |
|---|---|
| **Anatomia** | punto pieno Ø 10 px + anello 1 px Ø 26 px, concentrici; variante numerata: punto Ø 20 px con cifra mono 11 px |
| **Varianti** | *hotspot* (`--node`, blu = interazione); *luogo* (`--place`, terra/arancio); *voce corrente del menu* (solo punto, 8 px, prima dell'etichetta); *favicon* (l'anello) |
| **Stati** | default · hover/focus: anello ×1,4 in 250 ms e comparsa dell'etichetta mono con una linea di richiamo · focus: contorno 2 px · attivo/aperto: etichetta visibile finché serve, chiusura con Esc · ping: una volta all'ingresso (1,8×, 1000 ms) |
| **Su foto** | il nodo deve reggere su ogni zona dell'immagine. Decisione del G4 (verdetto §3.8): **calce sulle foto**, per il contrasto su sfondi variabili; **blu sulle superfici piatte**. Sulle foto (`ImmersivePreview`, Documento): punto calce con cifra notte, anello calce con un tratto scuro di 1 px (ombra a raggio pieno, senza sfocatura: accettato come tratto, §1.5). Il nodo sta su un oggetto o un luogo della scena, mai sul corpo di una persona (N7) |
| **Cifra del nodo numerato** | calce su punto blu-node (4,54:1) sulle superfici chiare; notte su punto blu-node-chiaro sulle scure. Mai `--bg` su pietra (3,86:1) |
| **Accessibilità** | sempre `<button>` o `<a>` reale; area di tocco ≥ 44 × 44 px attorno al disegno di 26 px; il contenuto dell'etichetta è anche nella legenda sempre visibile; niente informazioni solo all'hover |
| **Non si fa** | nodi decorativi o come puntini d'elenco, reti di nodi collegati (plexus), pulsazioni infinite, più di 5 hotspot su una foto o un'anteprima. I luoghi sulle carte non contano: sono nodi-luogo e punti-città, non hotspot (direzione 0.6 §1.3) |

### 2.4 Le Coordinate (`ui/MapItaly.astro`, `lib/geo.ts`, `data/maps.json`, `data/citta-digitali.json`)

| | |
|---|---|
| **Anatomia** | riga mono: «40.90° N · 16.85° E» (gradi decimali, 2 cifre: la precisione della fonte); rilevamento e distanza da Acquaviva delle Fonti, il comune della sede: «MONOPOLI · 081° · 38 KM»; cartografia a filo (§5.4); nodo-luogo Ø 10 in `--place`; **punto-città** Ø 5 in `--place` (sotto) |
| **Varianti** | *riga* (didascalie, sotto l'H3 delle porte, città, footer: «ITnode · Acquaviva delle Fonti · 40.90° N · 16.85° E»; Contatti: «Acquaviva delle Fonti · 40.90° N · 16.85° E» sotto l'indirizzo); *carta Puglia* (costa aperta, nodi `--place`, etichette «MARE ADRIATICO», «MURGIA»; nomi dei luoghi su una riga nelle carte larghe almeno 45rem: N8, applicata in 100b578); *carta Italia del capitolo 03 della Home* (contorno chiuso, tutte le città di Città Digitali con il punto-città, nomi dove c'è spazio, legenda, nessuna coordinata: prop `cities` e `label`, applicata in 0a61546); *carta Italia di `/citta-digitali/`* (contorno chiuso, i 3 nodi delle schede accanto; la versione con i punti è proposta in `docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md`) |
| **Punto-città** (direzione 0.6 §1.4) | Un punto per ogni luogo reale di un elenco con una fonte dichiarata, nella sua posizione vera: è un dato, non una trama. Cerchio pieno Ø 5 px in `--place` (`terra` su chiaro, 4,09:1 su `pietra`; `arancio-segnale` su notte), con un anello pieno di 1,5 px nel colore della superficie (§1.5). Con il nome diventa il nodo-luogo Ø 10, con lo stesso anello: metà del nodo, stessa famiglia. Non è interattivo e non si muove: niente anello esterno, ping, hover, focus né comparsa a cascata. Dove i punti si sovrappongono si impilano come monete, dipinti da nord a sud, poi i nodi con nome. Mai spostati per fare spazio, mai aggregati in bolle o in numeri |
| **Nomi sulle carte con il punto-città** | Scelti e posizionati al build da `scripts/generate-maps.mjs` (§5.4), senza JavaScript in pagina. Ordine dei candidati in `nomi` del file dati: obbligatori (le città nominate dal testo accanto: Varese, Altamura, Caltanissetta), poi un nome per regione o gruppo con la fonte più solida, poi gli altri. Un nome compare solo se non copre punti, nodi, altri nomi o richiami e resta dentro la carta, a ogni larghezza della sua classe; non deve nascondere il punto di un'altra città (tranne gli obbligatori); mai per una lettura ambigua («Polignano», «San Cataldo»). Forma: `label` mono `--fg`, su una riga, con il fondo `--bg`; accanto al nodo (e, w), su un angolo (ne, se, nw, sw) o appeso sotto con un richiamo verticale di 1 px in `--place` a 24 o 40 px (drop, drop2), il gesto dell'Orizzonte. Due classi annidate: carte strette fino a 25rem, larghe oltre; quando la carta cresce un nome può solo comparire. Risultato al 2026-10-05: 5 nomi sulle strette (Varese, Altamura appeso, Caltanissetta, Itri, Cosenza), 9 sulle larghe (più Manfredonia, Bari, Massafra appeso, Caltagirone); sulle strette questi quattro sono punti |
| **Legenda** | «Ogni punto è una città di Città Digitali» (copywriter-brand, L1): una riga di testo reale in `<figcaption>`, `label` mono `--fg-2`, `--space-s` sotto la carta, con spazi unificatori in «di Città Digitali»; una riga da 360 px, due a 320. Nessun numero e nessun link |
| **Stati** | la carta si disegna una volta all'ingresso; su `/citta-digitali/` il nodo di una città si accende (×1,5, 250 ms) quando la sua scheda riceve hover o focus (`pointerenter` e `focusin` in `LocationShowcase.astro`: uno script di poche righe); i punti-città non hanno stati |
| **Accessibilità** | Una carta i cui luoghi sono tutti nominati dal testo accanto è decorativa: `aria-hidden` (carta della Puglia, carta di `/citta-digitali/` di oggi). Una carta che mostra più di quanto dice il testo è un'immagine con un nome: `role="img"` e `aria-label` costruito dagli stessi dati (regioni da nord a sud, la regione con più città, i nomi disegnati sulla carta larga; forma L4 di copywriter-brand, nessun numero); l'`<svg>` della costa è sempre `aria-hidden` e i nomi disegnati non si leggono una seconda volta (ux-designer, review del 2026-10-05 §3.1). Coordinate in testo reale. L'elenco completo in testo andrà su `/citta-digitali/`, sezione «L'Italia in un unico portale» |
| **Dati** (direzione §1.4, `docs/strategia/coordinate-luoghi.md`; C11 chiusa) | Una sola fonte e una sola precisione per tutti i luoghi: riquadro della voce di Wikipedia in inglese di ogni comune, convertito e arrotondato a 2 decimali (circa 1 km). Valori in `src/data/site.ts`, con la fonte in commento; formattazione solo da `formatCoords` (`toFixed(2)`); rilevamenti e distanze calcolati in `lib/geo.ts`, mai scritti a mano. Gli zeri di «40.90» e «17.30» sono cifre vere, non riempimento. Mai precisioni diverse nella stessa pagina: il controllo di go-live blocca qualunque coordinata con più di 2 decimali. Il rilevamento di Cassano delle Murge (7 km, incerto di circa ±10°) non si cita mai da solo. Le coordinate della sede sono quelle del comune: nessun testo le presenta come posizione della sede (mai «Sede · [coordinate]»; «SEDE» nella porta di Acquaviva va bene, perché nomina la città). Dopo il lancio, facoltativo: 4 decimali reali per tutti dai nodi `place` di OpenStreetMap |
| **Dati delle città di Città Digitali** | `src/data/citta-digitali.json`: le 45 città della pagina «Tutte le città» di cittàdigitali.it (`id`, `name`, `province`, `region`, `lat`, `lon`), con la stessa fonte e gli stessi 2 decimali degli altri luoghi; Martina Franca da Wikidata P625, eccezione accettata, con `coordSource` accanto al dato. Lo stesso file alimenterà l'elenco in testo, così punti ed elenco non possono divergere |
| **Non si fa** | pattern topografici, mappe a puntini, pin in stile Google, campiture che suggeriscano una copertura dell'Italia intera (N12); punti spostati o aggregati per fare spazio; bolle con numeri; numeri o conteggi senza le condizioni di brand-strategist (testo della pagina confermato, data, stesso numero di punti); nomi su letture ambigue |

### 2.5 Il Passaggio (`ui/Passage.astro`, `sections/LargeStatement.astro`)

| | |
|---|---|
| **Anatomia** | due registri su righe d'autore: partenza (gradino N) e arrivo (gradino N o N−1), sfalsato a destra |
| **Varianti** | *statement* (`display-l`/`xl`); *hero* (primo registro sopra l'orizzonte, secondo sotto); *cascata a 3* (solo «Entra. / Esplora. / Interagisci.»: ogni registro rientra di un passo in più del precedente, desktop 2 e 4 colonne, tablet 1 e 2, mobile 1,2 e 2,4em, nessun rientro a 320 px. Misurato in C14: 48/96 px a 390, 91/181 a 768, 108/215 a 1024, 152/303 a 1440; «Interagisci.» finisce dentro la colonna a ogni larghezza. La regola della cascata ha lo stesso peso di quella del rientro di default ed è dichiarata dopo, così vince: N1, applicato) |
| **Rientro** | 2 colonne desktop · 1 colonna tablet · su mobile `clamp(0px, (100vw - 20rem) * 0.7, min(1.2em, 3rem))`: 0 a 320 px, 1,2em (max 48 px) da ~390 px, così le parole più lunghe stanno nella colonna (B1). Nessun rientro se lo separa l'orizzonte. La colonna del rientro si calcola sulla larghezza del Passaggio divisa per le colonne della pagina: in un blocco di 6 colonne «2 colonne» valgono circa una colonna di pagina |
| **Gradini** | partenza `display-l`/`xl` (o `display-m`) a 600; arrivo nello stesso gradino o un gradino sotto. **Il peso segue il gradino** (direzione 0.4 §1.5): l'arrivo è a 400 quando scende a `display-m`, resta a 600 quando resta al gradino della partenza. Quando le righe d'autore non stanno nella colonna, l'arrivo scende di un gradino (da `display-l` a `display-m` 400, il Passaggio canonico come nella hero) invece di lasciarle spezzare al browser. Statement dei capitoli della Home: partenza `display-l` 600, arrivo `display-m` 400, anche nel primo capitolo per coerenza della sequenza (decisione del G4 su V4, applicata: 2, 2 e 4 righe bilanciate da 320 a 390 px e da 1024 px in su; a 768 px anche il terzo sta in 2). Un Passaggio interamente in `display-m` resta quindi a 600 nei due registri (§1.2) |
| **Stati** | text reveal riga per riga (le maschere si tolgono a fine animazione: WCAG 1.4.12) |
| **Accessibilità** | un solo elemento (`h1`, `h2` o `p`), righe come `<span>` a blocco: il lettore di schermo legge una frase |
| **Non si fa** | centrare, più di 2 registri (tranne la cascata), seconda riga più grande della prima, a capo lasciati al browser |

---

## 3. Componenti (linee guida §30)

### 3.1 Inventario

| Componente | File | Varianti (prop) | Composizioni della direzione §7.1 | Dove (sezioni numerate come nella direzione §7.3–7.7) |
|---|---|---|---|---|
| Header | `layout/Header.astro` | stato `top`/`scrolled`; tema chiaro/scuro | — | tutte |
| MobileMenu | in `Header.astro` | `<dialog>` modale | — | tutte, < 1024 px |
| Footer | `layout/Footer.astro` | — | — | tutte |
| Hero | `sections/Hero.astro` | `home` · `line` · `compact` | L'orizzonte dei luoghi; hero di linea; hero compatta | Home 1; SIII 1, Puglia Digitale 1, Città Digitali 1; Contatti 1, legali, 404 |
| SectionIntro | `sections/SectionIntro.astro` | `size` l/m/s/label, `as` h2/h3 | — | apre Capitoli, Elenco, Porte, Carta |
| LargeStatement | `sections/LargeStatement.astro` | `manifesto` · `passage` | Statement; Passaggio | Home 2 e 4, SIII 2, Puglia Digitale 2 |
| ProjectShowcase | `sections/ProjectShowcase.astro` | `layout` a/b/c (capitolo); da aggiungere `experience`, `compact` | Capitolo | Home 5; SIII 6; «Continua a esplorare», 404 |
| LocationShowcase | `sections/LocationShowcase.astro` | `doors` · `italy` | Porte; Carta | Puglia Digitale 4; Città Digitali 3 (le carte dei capitoli 02 e 03 in Home 5 usano `ui/MapItaly.astro`) |
| ImmersivePreview | `sections/ImmersivePreview.astro` | `document` (attuale) · `compare` · `facade` | Documento; Confronto | Home 3; SIII 3; SIII 1 e 6 |
| FounderTimeline | `sections/FounderTimeline.astro` | — | Timeline | Home 6 |
| BenefitsSection | `sections/BenefitsSection.astro` | `zigzag` · `scala` · `sticky` | Elenco | SIII 5; Puglia Digitale 5; Città Digitali 4 |
| Stats | `sections/Stats.astro` | — (scalinata) | Numeri | Puglia Digitale 3 (in SIII 5 e Città Digitali 4 solo come «Dato documentato» con fonte) |
| VideoSection | `sections/VideoSection.astro` | — (a tutta larghezza) | Video | Città Digitali 2 |
| CTASection | `sections/CTASection.astro` | `band` · `form` | Chiusura | Home 7; SIII 7, Puglia Digitale 6, Città Digitali 5 |
| ContactForm | `sections/ContactForm.astro` + `scripts/form.ts` | `formId`, `preselect`, `title`, `headingLevel` | Chiusura | SIII 7, Puglia Digitale 6, Città Digitali 5, Contatti 1 |
| Di supporto | `ui/Cta`, `ui/Arrow`, `layout/Breadcrumbs`, `ui/Media`, `ui/SlotPending` (§4), `sections/Marquee`, `sections/Bridge`, `ui/Wordmark`, `ui/MapItaly` | — | Marquee | trasversali (Bridge = riga «Ponte» di SIII) |

**Regola della variazione.** Uno stesso componente non compare due volte di seguito con la stessa variante, e due sezioni consecutive non hanno la stessa composizione né lo stesso gradino del titolo (direzione §7.2). Le varianti di BenefitsSection sono una per pagina.

### 3.2 Header e MobileMenu

| | Header | MobileMenu |
|---|---|---|
| **Anatomia** | skip link · logo (link a `/`) · 4 voci testuali · «Parliamone» pillola · «Menu» (< 1024) | «Chiudi» nella posizione di «Menu» · voci «01 SIII», «02 Puglia Digitale», «03 Città Digitali», «Contatti» (solo il numero in mono `aria-hidden`, senza rilevamento; nomi `display-l` nella direzione, nella build un corpo proprio `clamp(2rem, 1.2rem + 4vw, 3.25rem)`, 35 px a 390 e 50 a 768, da riportare su un token con S5 dopo il lancio; descrittori `small` `--fg-2`) · «Parliamone» pillola calce · telefono ed email in mono, l'indirizzo email con `t-as-is` (minuscolo, V12, applicato) |
| **Superficie** | `top`: trasparente sul tema della hero (SIII su notte); `scrolled`: fondo pieno e filetto `--line`, stessa altezza | notte, a tutto schermo (`100dvh`) |
| **Stati** | voce: hover sottolineatura 1 px; corrente: punto del Nodo 8 px + `aria-current`; CTA: hover inversione a contorno; focus 2 px | voci alte ≥ 48 px; corrente con punto; apertura 250 ms, voci a cascata ≤ 300 ms |
| **Misure** | altezza 64 / 76 px; logo 24 / 28 px; controlli ≥ 44 px | — |
| **Limiti** | etichette invariate (da `site.ts`); «Parliamone» 10 caratteri | descrittori su una riga a 320 px: misurato fino a 34 caratteri («Le attività del territorio, online») |
| **Accessibilità** | ordine del DOM = focus; header non sticky con viewport alto < 480 px | `<dialog>` con `showModal()`, Esc, focus di ritorno su «Menu» o sul bersaglio dell'ancora |

### 3.3 Footer

- **Anatomia** (ordine DOM = mobile): logo calce · Navigazione · Contatti (`<address>`) · Portali (dominio + ↗) · riga legale · firma mono.
- **Superficie** notte. Titoli dei gruppi `<h2>` in `label` mono `--fg-2`; voci `body`; riga legale `small` `--fg-2`; firma `label`.
- **Firma:** «ITnode · Acquaviva delle Fonti · 40.90° N · 16.85° E», coordinate del comune dalla fonte unica (§2.4), mai presentate come posizione della sede.
- **A capo:** la coppia di coordinate della firma non si spezza mai (`white-space: nowrap`); lo stesso vale per «P.IVA», «REA» e i loro numeri, legati con spazi non separabili (V13, applicato).
- **Dati societari obbligatori:** ragione sociale, P.IVA, sede legale, Registro delle imprese e REA, capitale sociale. Senza i valori `[DA FORNIRE]` la riga è incompleta e **il go-live è bloccato** (soglia 5).
- **Mobile:** blocchi impilati, righe di telefono, email e voci alte ≥ 44 px.
- «Preferenze cookie» compare solo se esiste un banner (§3.18).

### 3.4 Hero

| Variante | Anatomia | Desktop | Mobile |
|---|---|---|---|
| `home` | occhiello mono «ITnode — oltre i confini del Web tradizionale» (nome e concetto delle linee guida §02) · H1 in due registri · riga di posizionamento in `lead`, un `<p>` dopo l'`<h1>`: «Esperienze digitali immersive per imprese e territori.» (che cosa fa ITnode) · Orizzonte con i luoghi · didascalia dell'osservatore su tre righe: «Vista da Acquaviva delle Fonti», «40.90° N · 16.85° E» (`aria-hidden`), «Distanze in linea d'aria». Nessun invito allo scorrimento (direzione §5, 0.3) | cielo calce / terra pietra; H1 `display-xl` in piedi sull'orizzonte (la «g» lo tocca); secondo registro e riga dalla colonna 5 (riga sulle colonne 5–11, 25 px sotto il secondo registro), didascalia sulle colonne 1–4 allineata in basso con la riga (scarto misurato 2–3 px). Orizzonte al 57% a 1440 × 900 (misurato 56,7%); a 1024 × 768 la hero intera sta nella prima schermata. Tablet: secondo registro e riga dalla colonna 3 di 8 | H1 su due righe; sotto l'orizzonte secondo registro, riga (20 px, 2 righe) e didascalia; tutta la hero in 390 × 844 (fondo a 789 px). Orizzonte a circa il 42% della prima schermata (352 px su 844 a 390 × 844: direzione 0.4 §5, valore misurato al posto della stima del 55%). Secondo registro su due righe a 390 px. Orizzonte 100° centrato su 238°, rotazione di +60° in `max(60svh, 60vw)` di scorrimento (§1.6, §2.1) |
| `line` | breadcrumb · occhiello · H1 = nome + descrittore nello stesso `<h1>` · Passaggio o sottotitolo · CTA primaria + link secondario · visual | SIII: «SIII» in `display-xxl` su notte, Porta 3:5 con 3 nodi; PD: carta della costa che attraversa la pagina; CD: finisce su un orizzonte che si apre nel video | breadcrumb → occhiello → H1 → testo → CTA → visual |
| `compact` | breadcrumb · H1 `display-xl` · lead | Contatti: H1 su 12 colonne, sotto scheda recapiti e form | H1 → canali diretti → form |

- **Limiti:** H1 home ≤ 60 caratteri; nome di linea ≤ 20; descrittore ≤ 40; occhiello ≤ 64 (oggi 45: una riga da 1024 px, due sotto); riga di posizionamento ≤ 54 caratteri, su una riga da 1024 px in su (oggi 527 px su 543 disponibili a 1024), altrimenti a 1024 × 768 la hero esce dalla prima schermata. Le varianti B e C del test E1 stanno nella stessa composizione (490–520 px, una riga).
- **LCP:** l'H1 non si anima al caricamento; nessuna immagine sopra l'H1 su mobile.

### 3.5 SectionIntro

Occhiello mono (≤ 40 caratteri) · titolo (`as` h2/h3, gradino da `size`) · introduzione `lead` facoltativa (≤ 42ch). Sempre allineata a sinistra; il titolo può stare su 6–10 colonne, l'introduzione sfalsata di 1–2 colonne. Non contiene mai CTA: l'azione sta nel contenuto della sezione.

### 3.6 LargeStatement

| Variante | Anatomia | Desktop | Mobile |
|---|---|---|---|
| `manifesto` | statement `display-l` su 10 colonne + `lead` sfalsato sulle colonne 7–11 + eventuale secondo statement `p` | molta aria sopra e sotto (`--space-4xl`) | statement → lead, senza sfalsamento |
| `passage` | due registri (§2.5) | rientro 2 colonne | rientro 1,2em |

Limiti: statement ≤ 90 caratteri, lead ≤ 280. Il livello (`h2` o `p`) lo decide la struttura, non la dimensione.

### 3.7 ProjectShowcase

| Variante | Anatomia | Composizione |
|---|---|---|
| `chapter` (layout a/b/c) | tratto d'orizzonte con rilevamento (tacca da 20 px, etichetta sotto) · numero `display-xxl` (`aria-hidden`) · nome `display-m` 400 (H3), descrittore `display-s` `--fg-2` · statement: Passaggio `display-l` con arrivo `display-m` (§2.5, V4) · visual · micro `lead` (≤ 160 caratteri) · CTA → | a = 01 SIII su notte, numero colonne 1–4, soglia Schermo 16:10 con 3 nodi; b = 02 Puglia Digitale su calce, carta Puglia colonne 1–5, testo 7–12; c = 03 Città Digitali su pietra, carta Italia colonne 8–12 con il punto-città, i nomi dove c'è spazio e la legenda sotto, in una `<figure>` larga al massimo 30rem (§2.4), testo 1–6. Una sola CTA nel capitolo |
| `experience` | soglia Schermo 16:10 · nome `display-l` (H3) · luogo e coordinate mono · frase · «Entra nell'esperienza ↗» · eventuale «Avvia l'anteprima» | tre larghezze diverse: 12 colonne; 8 a destra; 8 a sinistra |
| `compact` | numero · nome · statement · link | «Continua a esplorare» e 404: una riga tipografica, non una card |

Stati: hover della soglia 1,03 (puntatore fine); focus sulla CTA; il visual cliccabile è un duplicato inerte. Mobile: numero → nome → statement → visual → micro → CTA a tutta larghezza; niente sticky né swipe.

### 3.8 LocationShowcase

| Variante | Anatomia | Desktop | Mobile |
|---|---|---|---|
| `doors` (Puglia Digitale) | per luogo: Porta 3:5 · nome `display-s` (H3) · coordinate · dominio · «Esplora ↗»; un filo d'orizzonte comune in `--fg`, nodi-luogo e richiami verso le porte in `--place` | tre porte in orizzontale secondo la **longitudine reale** (Gravina, Acquaviva, Monopoli), lieve sfalsamento verticale | pila **da ovest a est** (Gravina → Acquaviva → Monopoli), come la fila desktop e l'ordine del focus: un solo ordine a tutte le larghezze (decisione del G4 su I11, direzione §7.5; WCAG 1.3.2 e 2.4.3). Con le foto dei luoghi, sotto i 1024 px porta a tutta colonna in 4:5 e testo sotto (S8, quando arrivano le foto) |
| `italy` (Città Digitali) | carta a filo (§5.4) + testo con il link «Tutte le città sul portale ↗» (prop `allPlaces`: nella colonna del testo, dopo lo statement, 44 px; ux-designer §3.2) + lista delle città con coordinate e «Esplora ↗». Proposta per la carta con i punti: `docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md` | Carta Italia sulle colonne 7–12. Da 1280 px (80em) le città stanno sulle colonne 1–5 **alla latitudine del loro nodo** (`top: yPct%` di `maps.json`, filetto ~20 px sopra il nodo), con 96 px riservati sotto la carta per Caltanissetta. Tra 1024 e 1279 px, elenco accanto alla carta: lì il 31,6% tra Altamura e Caltanissetta (173 px a 1024) è meno di un blocco città (~190 px) (V2, applicato) | carta piccola in alto, città in pila nord → sud |

Stati: hover/focus sulla città → il suo nodo si accende (×1,5, script con `pointerenter` e `focusin`). Nome e CTA sempre visibili. Lista `<ol>`; se l'immagine della porta è cliccabile, `alt=""` e duplicato inerte. Le carte dei capitoli della Home usano `ui/MapItaly.astro` direttamente, non questo componente.

### 3.9 ImmersivePreview

| Variante | Anatomia | Stati |
|---|---|---|
| `document` (foto evento, Home §3) | soglia Panorama 2,27:1 (mobile: ritaglio «Città» 4:5) · ≤ 3 nodi numerati calce (§2.3) · legenda numerata sempre visibile · didascalia mono solo con data e luogo confermati · nota AI sotto la foto finché non arriva l'originale. Nodi in percentuale del ritaglio: 1 schermo sinistro (13,3%, 18%; nel ritaglio «Città» 37,7%, 18%); 2 palco, sul leggio accanto all'oratore (36%, 31%), mai sul corpo di una persona (direzione 0.4 §4.2, N7, applicato in 100b578), solo Panorama; 3 schermo destro (85%, 16%), solo Panorama | nodo: default; hover/focus: cresce solo l'anello (opzione A di ux-designer, WCAG 1.4.13); aperto con clic, Invio o Spazio: etichetta (Esc chiude) |
| `compare` (SIII §3) | una soglia Schermo 16:10 · interruttore a due stati «Tour 360° — guardi» / «SIII — agisci» · tabella di 3 righe sotto | stato 1: solo orizzonte; stato 2: compaiono i nodi (prodotto, video, informazioni, prenotazione); cambio in `opacity`/`transform` |
| `facade` (anteprima SIII) | poster (schermata) · «Avvia l'anteprima» (pillola, nome «Avvia l'anteprima di {nome}») · nota «L'anteprima carica contenuti da {dominio}.» · «Entra nell'esperienza ↗» sempre visibile | poster → caricamento («Caricamento…» in `role="status"`, pulsante `aria-disabled`, nessuna animazione in loop) → caricata (iframe con `title`, poi «Chiudi l'anteprima» e «Schermo intero») → errore (messaggio e link esterno) |

- **Interruttore:** due pillole affiancate in un `fieldset` con `legend` visivamente nascosta (radio nativi): niente trascinamento (2.5.7). Selezionata: fondo `--btn-bg`; non selezionata: contorno `--field-border`.
- **Facade:** solo ≥ 1024 px e solo dopo le verifiche (embed consentito, nessun cookie non tecnico, focus non trattenuto). Su mobile mai iframe: resta il link in nuova scheda.
- **Schermo intero:** sul contenitore dell'anteprima (Fullscreen API), pulsante 44 px, nome «Schermo intero» / «Esci dallo schermo intero»; se l'API manca, il pulsante non si mostra.

### 3.10 FounderTimeline

- **Anatomia:** Passaggio «36 anni dentro l'innovazione. / E ancora la stessa curiosità.» (arrivo `display-m` 400) · orizzonte del tempo (tappe = tacche; periodo in mono, titolo `display-s`, dettaglio ≤ 120 caratteri `small`; una data mancante non mostra nulla, la tacca basta) · momento numerico «10.000+ clienti» in `display-l` agganciato a Leadstone, con attribuzione (N5) e lontano almeno una tappa da «oggi», **solo con la conferma del perimetro** (quali aziende, quale periodo, clienti o utenti) e con l'etichetta confermata; senza conferma il numero si toglie, la tappa resta con titolo e data e la colonna vuota prima di «oggi» resta come tempo che passa (direzione §7.3, I2) · «oggi» è l'unico nodo (punto Ø 10 più anello di 1 px, scostamento 7 px, sul filo), con tre link (ITnode, Puglia Digitale, Città Digitali) · chiusura: ritratto a inchiostro 1:1 (DR3 (b), in attesa della conferma dell'utente; ≤ 400 px, su calce, con nota di trasparenza) + citazione `display-m` in `<blockquote>` + firma mono + «Giacomo Lenoci su LinkedIn ↗» `[DA VERIFICARE: F7]`.
- **Distanza tra «10.000+» e «oggi»:** su desktop una colonna vuota del filo (`--stages` = tappe + 1, «oggi» in `grid-column: -2 / -1`); su mobile 64 px di filo in più. Il margine del mobile non vale su desktop: lì «oggi» sta sul filo come le altre tappe (V1, applicato).
- **Desktop:** orizzontale e sticky solo se tutte le tappe stanno nel viewport; nessun elemento focalizzabile sul binario che trasla (problema 13 di `accessibilita.md`).
- **Mobile:** linea verticale a sinistra, tappe in pila, niente sticky. **Reduced motion:** griglia statica a 4 colonne.
- **Scala:** ordinale, mai in anni (le date mancano).

### 3.11 BenefitsSection

| Variante | Anatomia | Desktop | Mobile |
|---|---|---|---|
| `zigzag` (SIII) | 4 voci: numero `display-xxl` `aria-hidden` · titolo `display-s` (H3) · testo `body` | numeri alternati a sinistra e a destra, una idea per schermata | numero sopra il testo |
| `scala` (Puglia Digitale) | 4 voci: numero `display-xl` · titolo `display-s` · testo | ogni voce rientra di una colonna | numero sopra il testo, rientri di 16 px (a 320 px la quarta voce resta a 32 caratteri per riga) |
| `sticky` (Città Digitali) | titolo e indicatore «01/05» mono (`aria-hidden`) fermi a sinistra; 5 concetti a destra | sticky solo ≥ 1024 × 720 | lista numerata, niente indicatore |

- **H2 della sezione** con `titleSize`: `display-m` in SIII e Puglia Digitale, `display-l` in Città Digitali, così due sezioni consecutive non condividono il gradino (DV §7.2).
- Contenuto qualitativo (N6–N10). Modulo **«Dato documentato»** (valore `display-l`, etichetta, fonte, periodo in mono): si mostra solo con tutti e quattro i campi.
- `<ol>`; nessun elemento interattivo nella colonna sticky.

### 3.12 Stats

- **Anatomia:** per numero: valore `display-xxl` (simbolo + ~ % in `--place`: arancio su notte, terra su chiaro) · etichetta mono sotto (≤ 60 caratteri) · nota mono in fondo «Dati ITnode, aggiornati a [mese anno]» `[DA FORNIRE]`.
- **Desktop:** scalinata, ogni numero sfalsato di 2 colonne verso destra e verso il basso. **Mobile:** in pila, allineati a sinistra (con il minimo di §7, n. 1, «~200.000» sta nella colonna anche a 320 px).
- **Un solo numero** (riserva B3 del G4, direzione §7.5): se al lancio resta solo «30+», un solo valore in `display-xxl` dalla colonna 3, con etichetta e nota con la data; titolo al singolare (copywriter-brand). Se neanche «30+» è confermato, la sezione non si pubblica e il layout resta pronto. «~200.000» e «60%» non si pubblicano senza fonte.
- **Scala:** `.stat__value` ha un clamp proprio (64 → 240 px); dopo il lancio passa al token `--fs-display-xxl`, dopo una verifica della scalinata a 1440 px (S5).
- **Accessibilità:** `<ul>`; simbolo `aria-hidden` + «circa»/«oltre» nascosti; niente conteggio animato (se richiesto: valore finale nel DOM, animazione `aria-hidden`, spenta con reduced motion).
- **Solo numeri verificati:** l'etichetta di «~200.000» chiarisce che è il bacino dei territori, non le imprese sul portale (N2).

### 3.13 VideoSection

- **Anatomia:** soglia Video a tutta larghezza (altezza `min(100svh − header, 56.25vw)`) · copertina sempre presente · controlli in basso a sinistra: nodo riproduci/pausa (cerchio 44 px), pillole testuali «Audio» e «Schermo intero» (e «Sottotitoli» se c'è parlato), tempo in mono; fondo notte al 72% con bordo calce al 60% · sotto: `<details>` «Leggi la descrizione del video».
- **Copertina** (finché manca il fotogramma del cliente, in staging e in pubblicazione): superficie notte-2 e nodo di riproduzione (anello di 1 px, 72 px; 56 px su mobile). Nessun titolo: il titolo è l'H2 sopra (review, I14). Nessun orizzonte: con quello di fine hero sarebbero due nella stessa schermata a 768–1024 px, e il gesto dell'orizzonte che si apre nel video lo fa già quello (decisione del G4 su V10, applicata: sulla pagina resta un solo orizzonte).
- **Poster reale** (N4, condizione C05): quando arriva il file, il creative-director sceglie il fotogramma; ui-designer prepara la copertina in AVIF e WebP responsive, senza attributo `poster` (`architettura.md`).
- **Stati:** poster · in riproduzione (pausa sempre visibile durante l'autoplay) · in pausa · muto/audio · caricamento · errore («Il video non si è caricato…», microcopy §5).
- **Contrasto:** fondo notte al 72% e bordo calce al 60%. Su un fotogramma bianco il fondo risultante (circa #525558) regge 7:1 col fotogramma e 6,6:1 col testo calce; su un fotogramma nero regge il bordo (circa 7:1). Quindi ≥ 3:1 su qualunque fotogramma. Niente velature a gradiente.
- **Autoplay muto** solo in viewport, mai con reduced motion o Save-Data; su mobile poster e pulsante `[IPOTESI della struttura pagine]`.
- **Poster mancante:** la copertina tipografica qui sopra vale in entrambe le modalità; non si mostra un segnaposto «POSTER VIDEO».

### 3.14 CTASection

| Variante | Anatomia | Desktop | Mobile |
|---|---|---|---|
| `band` (Home) | Passaggio `display-xl` · «Parliamone →» pillola grande · email e telefono in mono | su notte, Passaggio a sinistra, CTA sotto il secondo registro | CTA a tutta larghezza, recapiti come righe da 44 px |
| `form` (pagine di linea) | statement `display-l` · CTA «… ↓» verso `#richiesta` · blocco form (titolo H3 con `tabindex="-1"`, introduzione, alternative) | *impilata* (Puglia Digitale, Città Digitali): statement a tutta larghezza; sotto, testo a sinistra e form a destra (≤ 40rem). *Affiancata* (SIII, DV §7.4): statement a sinistra e form sulle colonne 7–12. Il titolo può usare la sesta colonna, perché «un'esperienza.» in `display-l` chiede 6,6 em; eyebrow e testo restano sulle colonne 1–5 (O4 della verifica di ux-designer) | statement → CTA → titolo → form → alternative |

Nessun link verso altre pagine tra la CTA e il form.

### 3.15 ContactForm

| Elemento | Specifica |
|---|---|
| Etichetta | `small` 15 px, peso 600, `--fg`, sempre visibile sopra il campo; «(facoltativo)» nell'etichetta dei campi facoltativi; «*» per gli obbligatori con la frase «I campi con * sono obbligatori.» in testa |
| Suggerimento | `small` `--fg-2`, tra etichetta e campo |
| Campo | altezza ≥ 48 px, testo `body` (≥ 16 px: niente zoom su iOS), padding 12 × 16 px, raggio 0, fondo `--field-bg`, bordo 1 px `--field-border` |
| Form a due colonne (≥ 1024 px) | i campi di una riga finiscono sulla stessa linea (`.contact--wide .contact__field--half { align-content: end }`): riquadri allineati e alti uguali (52 px), ogni etichetta a 8 px dal suo campo, il suggerimento del vicino tra la sua etichetta e il suo campo. Mai riquadri allungati dal vicino. Con un solo errore nella riga i riquadri si sfalsano dell'altezza del messaggio finché l'errore resta: accettato. Applicato in 846f142 e confermato dal creative-director al G4 (verdetto §3.6); se i test con utenti mostrassero esitazioni, c'è l'alternativa in subgrid già provata nella verifica UI |
| Stati del campo | hover: bordo `--fg` · focus: contorno 2 px `--focus` + bordo `--fg` · errore: bordo 2 px `--error` (senza spostamenti) + messaggio sotto il campo (decisione di ux-designer, 2026-09-28) con icona (!) e prefisso nascosto «Errore:» · compilato valido: nessun segno verde |
| Checkbox | quadrato 24 × 24, raggio 0, bordo `--field-border`; selezionata: fondo `--fg`, segno di spunta `--bg` tratto 2 px; etichetta cliccabile; privacy **mai preselezionata**; «Mi interessa» (scelta di argomento, non consenso) preselezionata in build sulle pagine di linea |
| Gruppo «Mi interessa» | `fieldset` + `legend` (`small` 600); pillole selezionabili (bordo `--field-border`, raggio pillola, casella nativa visibile; selezionata: fondo `--fg`, testo `--bg`), a capo quando serve; focus sulla pillola via `:has(:focus-visible)`. Accettate il 2026-09-28: coerenti con «il cerchio è l'interazione» |
| Avviso «modulo non attivo» | prima dei campi, solo senza endpoint: fondo `--slot-bg`, filetto sinistro 2 px `--fg` (mai `--place`), testo `small`, larghezza ≤ 66ch |
| Invio | pillola primaria «Invia richiesta», altezza 52 px, a tutta larghezza sotto i 700 px; in corso: «Invio in corso…», `aria-disabled`, nessuno spinner; **mai disabilitato** per la validazione |
| Riepilogo errori | riquadro raggio 0 con bordo 2 px `--error` (la build ha il bordo pieno; il filetto solo a sinistra resta la proposta S9, decide ux-designer); frase in `<p>` 600; link ai campi; riceve il focus |
| Pannelli (inviato, errore, endpoint assente) | riquadro raggio 0, filetto 1 px `--line` con filetto sinistro 3 px `--success` (inviato) o `--error` (errore); titolo `display-s` con `tabindex="-1"` che riceve il focus; mai un finto successo |
| Su notte | fondo `notte-2`, bordo `bordo-campo-notte`, testo calce; `color-scheme: dark` sulla superficie (§7, n. 8); autofill ricolorato sul fondo del campo |
| Honeypot | fuori schermo, `aria-hidden`, `tabindex="-1"` |

### 3.16 Cta, link e Breadcrumbs

| Elemento | Specifica |
|---|---|
| `primary` | pillola `--btn-bg`/`--btn-fg`, bordo 1 px dello stesso colore, testo 600, altezza ≥ 44 px, padding 0,75em × 1,35em; hover: fondo trasparente e testo `--fg`; freccia +4 px |
| `ghost` | pillola trasparente; bordo proposto `--field-border` invece di `--line` (§7, n. 10) |
| `link` | testo 600 con filetto inferiore 1 px `--link-underline`, 2 px all'hover |
| `large` | testo `lead`: solo nelle chiusure |
| Frecce | → altra pagina, ↓ stessa pagina, ↗ esterno (nuova scheda, testo nascosto «(si apre in una nuova scheda)») |
| Breadcrumbs | `label` mono, `--fg-2` per i link (sottolineati), `--fg` per la pagina corrente; separatore «/» `aria-hidden`; target ≥ 24 px; sopra l'H1 al posto dell'occhiello |

### 3.17 Marquee (`sections/Marquee.astro`)

Una riga tipografica `display-m` (Home, catena del concept con frecce SVG) o `display-xl` (SIII, verbi). Legata allo scroll (~0,4×), mai moto autonomo; copie `aria-hidden`; l'elenco accessibile sta nel testo (SIII: le 7 azioni in `<ul>`). Reduced motion: riga statica che va a capo. Max 1 per pagina.

### 3.18 CookieBanner (predisposto: al lancio non serve)

Al lancio nessun cookie non tecnico e nessun banner (piano di misurazione §1). Se servirà:

| Elemento | Specifica |
|---|---|
| Posizione | fissa in basso; su desktop riquadro a sinistra largo ≤ 40rem; altezza ≤ 30% del viewport; nessuno sfondo oscurante; il contenuto resta usabile |
| Superficie | `notte-2` con bordo 1 px `bordo-campo-notte` (≥ 3:1 anche su pagine notte) |
| Contenuto | titolo «Cookie» (mono) · testo `small` (microcopy §10.3) · link «Cookie Policy» |
| Pulsanti | «Accetta tutti» e «Rifiuta»: **stessa variante, stessa dimensione, stessa riga, stesso peso** (Garante 2021) · «Personalizza» come link · X 44 px «Chiudi senza accettare» = rifiuto |
| Preferenze | `<dialog>`; interruttori a pillola; «Necessari · Sempre attivi» fisso; «Statistica» spento di default; «Salva le mie scelte» |
| Accessibilità | primo nel DOM dopo lo skip link; `scroll-padding-bottom` pari alla sua altezza (il focus non finisce sotto il banner); link permanente «Preferenze cookie» nel footer |
| Performance | HTML e CSS nostri, script ≤ 3 KB, posizione fissa (niente CLS) |

---

## 4. Segnaposto degli asset mancanti

**In lavorazione** (staging e review col cliente): il segnaposto dichiara che cosa serve.

| Parte | Specifica |
|---|---|
| Superficie | `--slot-bg` (pietra su calce, calce su pietra, notte-2 su notte), filetto 1 px `--line` |
| Segni di taglio | 4 «L» da 12 px agli angoli, a 8 px dal bordo, 1 px `--fg-2` |
| In alto a sinistra | `label` mono: «ASSET RICHIESTO · FOTO» / «· SCREENSHOT» / «· POSTER VIDEO» |
| In basso a sinistra | descrizione `small` da `asset-slots.ts` (soggetto, luce, formato, lato lungo minimo) |
| In basso a destra | formato («3:5») e, per un luogo, coordinate in mono |
| Formato | lo stesso dell'asset finale (niente CLS) |
| Accessibilità | il segnaposto non si annuncia come immagine (`accessibilita.md` §2.8) |

**In pubblicazione** (`PUBLIC_SLOT_MODE=publish` al build, `SLOT_MODE` in `asset-slots.ts`): variante tipografica completa, senza richieste visibili. Il componente è `ui/SlotPending.astro`: lo rende `Media.astro` al posto del segnaposto quando lo slot non ha immagine. Il flag è esplicito, perché anche l'anteprima è una build di produzione.

| Parte | Specifica |
|---|---|
| Box | stesso contenitore e stesso `aspect-ratio` dello slot (niente CLS alla sostituzione), `--slot-bg`, `overflow: clip`, `container-type: inline-size`; zero byte di immagini |
| Accessibilità | tutto `aria-hidden`, nessun elemento focalizzabile. Quindi la variante mostra solo testo che la pagina dice già accanto; se non lo dice, la variante resta senza testo (WCAG 1.3.1) |
| Marcatura | `data-asset-pending="<slot>"`; `npm run check:launch` elenca le istanze come informazione, senza bloccare. Nessun «ASSET RICHIESTO» nell'HTML (verificato su 5 pagine) |
| Orizzonte | filo di 1 px `--fg`; tacche disegnate con gradienti a stop netti: nel luogo corte (6 px) ogni `4cqi` e lunghe (12 px) ogni `12cqi`; nell'esperienza lunghe ogni `12.5cqi` da `6cqi` (i 45° della riga dei gradi) e corte a un terzo |
| **Luogo** (porta 3:5) | filo al 58% (il rapporto cielo/terra della hero); nome in piedi sul filo, 1,25rem sopra, `clamp(display-s, 11cqi, display-m)` a 400; nodo-luogo `--place` (punto Ø 10 e anello Ø 26, fermo) al 78% sul filo; sotto il filo, 1,5rem, una riga mono `--fg-2`: «rilevamento · distanza» (o «SEDE» per Acquaviva), che va a capo solo tra i segmenti « · ». Le coordinate non si ripetono: stanno già sotto l'H3 accanto (decisione del G4 su N9, a tutte le larghezze: `.slot-pub--place .slot-pub__meta > span + span { display: none; }`). Rilevamento e distanza vengono da `lib/geo.ts`, mai scritti a mano. Verificato in C14 sulla build di pubblicazione: «256° · 37 KM» Gravina, «SEDE» Acquaviva, «081° · 38 KM» Monopoli |
| **Luogo, porte strette** | sotto `7rem` di larghezza si toglie anche il nome, che è nell'H3 accanto: a 320 px (porte da 102 px) restano filo, nodo e rilevamento. Senza, a 320–345 px il nome viene tagliato (V7, applicato) |
| **Esperienza SIII** (schermo 16:10; porta 4:5 → 3:5 nella hero di SIII) | filo al 62%; tre hotspot `--node` fermi (punto e anello, niente ping) all'altezza degli occhi: (22, 50), (55, 47), (80, 51) negli schermi (V8, applicato); (30, 28), (70, 40), (44, 52) nella hero. **Nessun testo dentro il pannello**, né in Home né su `/siii/`: nome e luogo li dicono l'H3 e la riga accanto, e un pannello scuro con un titolo e dei punti si leggerebbe come una finta schermata (decisione del G4 su N3; prop `pendingText={false}` di `Media.astro` su tutte le istanze). Nei pannelli larghi almeno 700 px (`@container (min-width: 43.75rem)`), gradi ogni 45° sotto le tacche lunghe, lettere solo ai cardinali («000° N», «045°», …): tacche lunghe ogni `12.5cqi` a partire da `6cqi`, gradi alle stesse posizioni (6% + 12,5% × n), scarto misurato 0,0 px (V9, applicato). Sotto i 700 px niente gradi: il righello sarebbe fitto |
| Con la pagina | i nodi che la pagina sovrappone alla soglia (`.worlds__hot`, `.siii-hero__node`) si nascondono quando c'è `.slot-pub`; l'apertura (`.aperture`) vale anche per `.slot-pub` |
| **Poster del video** | la copertina tipografica di §3.13, uguale in entrambe le modalità |

**Mai:** riquadri grigi con icona «immagine», icone di immagine rotta, lorem ipsum, stock, immagini generate.

---

## 5. Asset di marca

### 5.1 Logo: `src/assets/brand/itnode-wordmark.svg`

> **Ridisegno provvisorio** (2026-09-28), fatto sul PNG del cliente (192 × 114 px, opaco). Va sostituito con il vettoriale ufficiale `[DA FORNIRE: logo SVG positivo e negativo, con codici colore]`. La decisione sulla versione web senza trama poligonale è del cliente (direzione §4.4).

| | |
|---|---|
| **Come è fatto** | «it» in Montserrat 500 e «N» «d» «e» in Montserrat 700 (OFL 1.1), convertiti in tracciati con opentype.js; corpi e posizioni ricavati per minimi quadrati sulla copertura anti-aliasing del PNG. Su 23 famiglie provate, Montserrat è l'unica che spiega bene entrambe le parti: «Nde» in 700 con scarto dell'1,9% dell'inchiostro (alla pari solo Lexend 700) e «it» in 500 con il 5,1% (Lexend non scende sotto il 13,9%). La «o» è un anello costruito da due ellissi ruotate di −13° e adattate allo stesso PNG (scarto 2,5%) |
| **Anatomia rilevata** | «it» più leggero e all'87% del corpo di «Node»; anello più alto dell'occhio medio, spesso in alto (~19% dell'altezza), più sottile in basso (~15%) e a sinistra (~10%), un filo a destra (~2%). **Nota per il creative-director:** la direzione §4.4 descrive il vuoto «spostato in alto a destra»; la misura dice «a destra e un poco in basso» |
| **File** | solo tracciati (nessun `<text>`), `viewBox="0 0 1317 303"` stretto sul segno, 1,7 KB (comandi relativi, precisione 0,1 unità); lettere `fill="currentColor"`, anello `#3C71A5`; nessun `role`, `title` o `aria-label` nel file (li aggiunge `Wordmark.astro`) |
| **Colori** | lettere `--wordmark` (inchiostro su chiaro, calce su scuro); anello sempre #3C71A5 (3,64:1 su notte, come grafica) |
| **Misure** | 24 px di altezza su mobile, 28 px su desktop; minimo 20 px (sotto si usa l'anello, cioè la favicon) |
| **Area di rispetto** | pari all'altezza dell'anello (≈ 0,83 × l'altezza del logo): 20 px a 24, 23 px a 28 |
| **Uso** | sempre inline con `Wordmark.astro` (il colore segue la superficie); `<img src>` solo dove il colore è fisso, sapendo che lì le lettere diventano nere |
| **Nome accessibile** | «ITnode» sul link alla home (sulla home `aria-current="page"`) |
| **Non si fa** | ricolorare l'anello, separarlo dal wordmark, deformare, contornare, ombreggiare, rimettere la trama sotto i 200 px di larghezza, scrivere «itNode» nel testo corrente |

### 5.2 Favicon e icona touch

| File | Contenuto |
|---|---|
| `public/favicon.svg` | l'anello su quadrato calce (raggio 0), viewBox 32; ridisegnato per i 16 px: stessa rotazione ed eccentricità del logo, anello più spesso (lato sottile ≈ 1,3 px a 16 px) |
| `public/favicon.ico` | 16, 32 e 48 px (PNG dentro ICO) |
| `public/apple-touch-icon.png` | 180 × 180, opaco, quadrato calce pieno (gli angoli li arrotonda iOS), anello a metà altezza |

```html
<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

Rigenerazione: `node scripts/generate-brand.mjs` (riscrive anche wordmark e logo PNG).

### 5.3 Logo per i dati strutturati: `public/brand/logo-itnode.png`

1024 × 1024, RGB opaco, wordmark inchiostro su calce al 78% della larghezza, 18 KB. URL stabile per `Organization.logo` (`dati-strutturati.md`): quando arriva il vettoriale ufficiale si rigenera con lo stesso nome.

### 5.4 Carte: `src/data/maps.json`

**Fonte e metodo.** Natural Earth 1:10m Admin 0 (pubblico dominio) dal pacchetto `world-atlas` 2.0.2 (`countries-10m.json`, già generalizzato e quantizzato), con `topojson-client` e `d3-geo`. **Una sola proiezione:** conica conforme di Lambert, paralleli standard 37,5° e 45,5°, meridiano centrale 12,5° E. Ogni carta è una finestra lineare sulla stessa proiezione. Rigenerazione: `node scripts/generate-maps.mjs` (si ferma se un tracciato supera 8 KB).

| Carta | viewBox | Tracciato | Contenuto |
|---|---|---|---|
| `italia` | `0 0 1000 1180.8` | 6,9 KB, 15 sottotracciati chiusi | Italia con San Marino e Vaticano fusi (niente buchi), isole ≥ 18 km² (le più piccole diventano puntini); Douglas–Peucker a ~1 km. Luoghi: le 45 città di Città Digitali da `src/data/citta-digitali.json`, divise in `places` (9 con nome e posizione del nome) e `dots` (36) |
| `puglia` | `0 0 1600 857.2` (desktop) · `viewBoxCompact` `273.6 59.8 1059.2 721.1` (mobile, Home 02) | 0,5 KB, **una sola linea aperta** | costa della Terra di Bari da Barletta a oltre Monopoli; Visvalingam–Whyatt (toglie i moli del porto di Bari) e curva di Catmull-Rom centripeta sui vertici Natural Earth. Luoghi: Gravina, Acquaviva (sede), Monopoli; etichette «MARE ADRIATICO», «MURGIA» |

**Struttura dei dati** (per carta): `viewBox`, `width`, `height`, `kmPerUnit`, `path`, `bytes`, `places[]` (`id`, `name`, `lat`, `lon`, `x`, `y`, `xPct`, `yPct`, eventuale `role: "sede"`; per `italia` anche `anchor: { wide, narrow }`, con `narrow: "none"` dove il nome non c'è sulle carte strette), `labels[]` (`text`, `x`, `y`, `xPct`, `yPct`, `anchor`); per `italia` anche `dots[]` (`id`, `x`, `y`, `xPct`, `yPct`, da nord a sud); per `puglia` anche `window` (gradi della finestra) e `viewBoxCompact`.

**File dati delle città: `src/data/citta-digitali.json`.**
- `fonte`: pagina «Tutte le città» di cittàdigitali.it e documento delle coordinate.
- `citta[]`: `id`, `name`, `province`, `region`, `lat`, `lon`; `coordSource` quando la fonte è un'eccezione (Martina Franca).
- `nomi`: ordine editoriale dei nomi (`obbligatori`, `gruppi`, `poi`) e letture ambigue senza nome (`senzaNome`). Lo approva il creative-director.
- Il generatore si ferma su id doppi, coordinate con più di 2 decimali, nomi riferiti a città che non esistono, città fuori dalla carta.

**Nomi sulla carta d'Italia** (calcolo al build, `generate-maps.mjs`; regole in §2.4).
- **Classi:** strette 280–400 px di carta, larghe 400–480 px (`.worlds__map`: 280 px a 320 di finestra, 30rem al massimo). Controllo ogni 5 px.
- **Misure del nome:** 9,6 px per carattere, riga di 19,5 px, 2 px di fondo per lato. È il caso peggiore dell'etichetta mono a 13 px con la spaziatura di WCAG 1.4.12; in Chromium l'avanzamento dei glifi di Fragment Mono è arrotondato al pixel.
- **Raggi:** nodo 6,5 px, punto 4 px, entrambi con l'anello; 1 px di margine.
- **Posizioni** (spostamenti dal centro del nodo, uguali alle regole CSS di `MapItaly.astro`): e e w a 14 px; angoli a 8 px; drop e drop2 con la prima riga a 24 e 40 px sotto il nodo e il richiamo dal bordo dell'anello.
- **Scelta:** ricerca con ritorno indietro tra le posizioni di tutti i nomi della classe, prima i più vincolati. Le carte larghe partono dai nomi delle strette.
- **Errori:** un nome obbligatorio senza spazio sulle carte larghe ferma il build; sulle strette si nasconde con un avviso. L'intero generatore impiega circa mezzo secondo.

**Come si usa.**
- SVG `aria-hidden` con un solo `<path>`: `fill: none; stroke: var(--fg); stroke-width: 1; vector-effect: non-scaling-stroke; stroke-linejoin: round`.
- Nodi ed etichette in HTML sopra l'SVG, posizionati con `left: xPct%; top: yPct%` (o ricalcolati sul `viewBoxCompact`, come fa già `MapItaly.astro`). Il contenitore ha `aspect-ratio` pari al viewBox.
- Colore dei nodi: `--place` (terra su chiaro, arancio su notte).
- Etichette d'area in `label` mono con tracking largo; su mobile si tolgono o diventano legenda: in 390 px si sovrappongono alla costa.
- **Disegno della linea:** con `vector-effect: non-scaling-stroke` il tratteggio si calcola in px dello schermo e `pathLength` non vale (verificato in Chromium: con `stroke-dashoffset` a metà la costa resta intera). Due strade: (a) raccomandata, un otturatore nel colore della superficie che scorre in `transform` nella direzione della linea (ovest → est per la Puglia, nord → sud per l'Italia), come le aperture; (b) `pathLength="1"` e `stroke-dashoffset` **senza** `non-scaling-stroke`, con `stroke-width` in unità del viewBox per ogni breakpoint.
- Città Digitali: l'ordine verticale delle città si allinea a `yPct` dei nodi (Varese 12,9%, Altamura 59,2%, Caltanissetta 90,8%). Le tre sono obbligatorie, quindi stanno sempre in `places`; la proposta per la pagina legge anche `dots`.
- Punti-città e nomi in HTML sopra l'SVG, come i nodi: 36 punti e 9 luoghi con nome aggiungono 9,4 KB all'HTML della Home, 1,1 KB con gzip.
- Peso: 7 KB e 0,5 KB inline, dentro i limiti di `budget.md` (≤ 20 KB) e della direzione (≤ 8 KB).
- Coordinate dei luoghi dalla fonte unica a 2 decimali (§2.4; `generate-maps.mjs` legge gli stessi valori, `maps.json` rigenerato con C11). Per un confine regionale ufficiale servirebbero i limiti ISTAT (con attribuzione).
- **Etichette dei luoghi:** i nomi lunghi vanno a capo nelle carte piccole («Acquaviva delle / Fonti»); nelle carte larghe almeno 45rem (720 px) stanno su una riga (N8, applicata in 100b578 con `@container (min-width: 45rem)` in `MapItaly.astro`: hero di `/puglia-digitale/` da 800 px di viewport; a 768 px Acquaviva resta su due righe; le carte dei capitoli in Home, al massimo 480 px, non cambiano). Le coordinate si tolgono sotto i 25rem.

### 5.5 Immagine social: `public/og/default.jpg`

| | |
|---|---|
| **File** | 1200 × 630, JPEG sRGB, 4:4:4, 45 KB |
| **Composizione** | card tipografica su calce/pietra come la hero della Home: wordmark in alto a sinistra, coordinate di Acquaviva delle Fonti, il comune della sede («40.90° N · 16.85° E», rigenerata con C11), in alto a destra, «Esperienze digitali immersive» in piedi sull'orizzonte, orizzonte graduato a tutta larghezza (060°–260°, tacche ogni 5°, etichette ogni 45°), «per imprese e territori.» nella terra con rientro di 2 colonne |
| **Sorgente** | `scripts/og/og-card.html` (impaginata a 2× del sistema: nei feed la card si vede a 500–600 px) |
| **Comando** | `node scripts/og/build-og.mjs` → inserisce il wordmark attuale, cattura con `npx playwright screenshot` a 1200 × 630, converte con sharp e controlla misure e peso (< 300 KB) |
| **Varianti** | parametri `theme=notte`, `line1`, `line2`: per una card per pagina (`/og/siii.jpg` su notte, ecc.) si aggiunge una voce a `VARIANTS` |
| **Alt** | `og:image:alt` = «ITnode: esperienze digitali immersive per imprese e territori» (`pages.ts`) |
| **Regole** | niente foto del fondatore, niente immagini generate; testo essenziale nella fascia centrale (i ritagli quadrati tagliano i lati) |

---

## 6. Verifiche eseguite (2026-09-28 – 2026-10-05)

| Oggetto | Come | Esito |
|---|---|---|
| Wordmark | sovrapposizione del SVG al PNG ingrandito ×8 (contorni e tinta), Playwright + Read | contorni coincidenti; scarto massimo sub-pixel sull'attacco della diagonale della «N» |
| Wordmark a 20–64 px su calce, pietra, notte | pagina di prova | leggibile da 20 px; anello riconoscibile su notte |
| Favicon a 16, 32, 48 px | estrazione dall'ICO, ingrandimento a pixel | anello ed eccentricità leggibili a 16 px |
| Carte | render a 390, 768, 1280, 1440 px su calce e notte, con nodi ed etichette | costa leggibile come costa; nodi sui luoghi; a 390 px le etichette d'area vanno in legenda |
| Disegno della linea | `pathLength` + `stroke-dashoffset` con e senza `non-scaling-stroke` | incompatibili insieme (§5.4) |
| Immagine social | render e lettura a 1200 × 630, variante notte | nessun testo tagliato; 45 KB |
| Copertura dei glifi | Schibsted e Fragment Mono, latin | italiano completo; mancano → ↗ № |
| Reflow a 320 px | larghezza delle parole più lunghe al corpo minimo | prima misura: «~200.000» usciva dalla colonna (§7, n. 1); dopo i nuovi minimi, nessuna riga fuori viewport su 8 pagine da 320 a 1440 px (sonda su ogni nodo di testo, verifica del 2026-09-28) |
| «g» sull'orizzonte della hero | screenshot a 2× con l'orizzonte nascosto, riga più bassa d'inchiostro contro la linea, 1024–1920 px | 0,7–2,2 px sopra la linea: tocca senza attraversare |
| Richiami ed etichette degli orizzonti | box delle etichette e ascissa dei richiami, 320–1920 px, scroll 0/150/300/450 | incroci nella hero (fino a 1440 px) e su Città Digitali (768–1280); zero incroci con le file che partono dalla seconda (§2.1, V5) |
| A capo dei Passaggi | righe visive per ogni riga d'autore, 320–1440 px, con e senza `text-wrap: balance` | il browser spezza gli statement dei capitoli; con arrivo `display-m` e `balance`, 2 righe (01, 02) e 4 bilanciate (03) (§2.5, V4) |
| Variante «in pubblicazione» | HTML di 5 pagine; sonda geometrica di 8 istanze da 320 a 1440 px; ritagli a 2× a 390 e 1440 | nessuna richiesta visibile; conforme da 360 px in su; porte tagliate sotto i 350 px (§4, V7) |
| Maschera dei ritratti | tre valori a confronto sui due derivati, a 2× | 40/74 (Home) e 36/68 (Contatti) assorbono skyline e linee di rete (§1.7, V6); applicati e letti nel CSS calcolato in C14 |
| **Verifica C14** (dopo il verdetto G4) | Playwright a 320, 390, 768, 1024, 1440 px su staging e variante «in pubblicazione»; sonde DOM, screenshot a 1× e 2× | I4, V4, V6, V10, V14, N1, N5, S10, N6, N3, V9, N9, C11 conformi; un punto nuovo, C14-1 (review di verifica, sezione C14) |
| Coordinate (C11) | HTML di 8 pagine, ricerca di ogni coordinata | nessun valore con più di 2 decimali; una sola precisione per pagina; firma, didascalie, porte e carte dalla stessa fonte |
| Richiami ed etichette dopo C11 e V14 | 20 larghezze da 320 a 1920 px, scroll 0/150/300/450; tra 700 e 767 px ogni 10 px, scroll 0–700 a passi di 50 | nessun incrocio nella hero e su Città Digitali; sul tablet tre etichette intere; a riposo l'etichetta del gruppo murgiano esce dal bordo a 320–390 px (C14-1) |
| Reflow dopo C10–C12 | 8 pagine × 5 larghezze, staging e pubblicazione | 80 su 80 senza scorrimento orizzontale né testo fuori viewport |
| Peso di `display-m` (S4) | stili calcolati su 8 pagine a 1440 px | conforme alla regola del G4 (§1.2) |
| Etichette della carta di Puglia Digitale (N8) | regola iniettata, 720–1920 px, sovrapposizioni al livello del testo | una riga da 800 px di viewport; nessuna sovrapposizione, niente fuori schermo; carte della Home invariate |
| Nodo 2 del Documento (N7) | griglia al 1% sul ritaglio Panorama, anteprima a 2× | leggio a (36%, 30,7%): il nodo cade sul piano del leggio, di lato alla figura |
| **Ricontrollo del 2026-09-29** (commit 100b578) | etichette a riposo da 320 a 699 px ogni 10; rotazione da 0 a 700 px di scorrimento ogni 10, sotto l'header sticky, su 9 larghezze e 7 formati di telefono; N7, N8, C14-4 e reflow su staging e pubblicazione | C14-1, N7, N8, C14-4 conformi; Varese non esce dalla dissolvenza mentre è in vista (R1); reflow 80 su 80 |
| Chiusura di R1 (commit df66be6) | misura del creative-director (`verify-build.mjs`) e della sessione principale (`c14fix.mjs`) sulla build, riletta da ui-designer | fine dell'intervallo 506,4 px a 390 × 844, 384 a 360 × 640, 400,2 a 667 × 375; tablet, desktop e Città Digitali invariati. Varese intera 260–330 px a 390 × 844 e 200–280 a 360 × 640; velocità 0,46, 0,56 e 1,00 px per pixel; nessun incrocio da 320 a 699 px; `animation-name: none` con il movimento ridotto |
| Carta del capitolo 03, proposta (2026-10-05) | build completa di una copia del sito con le modifiche e l'elenco reale; nomi, fondi e richiami contro punti, nodi, altri nomi e bordo a 18 larghezze da 320 a 1920 px, con e senza la spaziatura di WCAG 1.4.12; reflow; peso | nessuna sovrapposizione; reflow pulito; Home +1,1 KB gzip; stress test a 10–50 posizioni di prova senza errori |
| Carta del capitolo 03, applicata (commit 0a61546 e 2a038de) | sonda del creative-director a 16 larghezze, con e senza 1.4.12 (32 combinazioni); `maps.json` confrontato con l'uscita provata | nessuna sovrapposizione; 5 nomi fino a 397 px di carta, 9 da 404; 36 punti; legenda su una riga da 360 px; `maps.json` identico a quello provato |

---

## 7. Revisione dei token

Letto `src/styles/tokens.css` (5,5 KB, versione delle 09:38) e, per il contesto, `global.css` il 2026-09-28. I valori derivano correttamente dalla direzione visiva: le scale fluide danno esattamente i px misurati a 390 e 1440 (verificato), i contrasti tornano, le superfici sono coerenti. Proposte puntuali (le applica la sessione principale; i cambi di valore passano dal creative-director).

**Stato dopo la verifica del 2026-09-28** (`tokens.css` riletto):
- **Applicati:** n. 1; n. 5 (`--node-ink`); n. 7 (`--focus-width`, `--focus-offset`, `--focus-ring-media`, usato da video e Documento); n. 8 (`color-scheme: dark`); n. 10 (`--btn-ghost-border`, usato da `Cta`). In più, il nuovo minimo di `--fs-display-xl` a `2.75rem` (review, B1).
- **In parte:** n. 4. I rapporti porta, ritratto, schermo, panorama e video esistono, ma segnaposto e componenti usano ancora stringhe; mancano quadrato e 3:4.
- **Aperti:** n. 3, 6, 9, 11, 12 e 13 (nuovo, dal verdetto del G4 su S5: dopo il lancio).
- Riletto il 2026-09-28 per la verifica C14: nessun token cambiato dal G4.

| # | Priorità | Token | Valore attuale | Valore proposto | Motivo | Decide |
|---|---|---|---|---|---|---|
| 1 | [BLOCCANTE] | `--fs-display-xxl` | `clamp(4.5rem, 0.16rem + 17.8vw, 17.5rem)` | `clamp(3.5rem, 0.16rem + 17.8vw, 17.5rem)` | A 320 px «~200.000» misura 302 px su 280 utili: scorrimento orizzontale (WCAG 1.4.10, soglia AA). Con il nuovo minimo vale 59,5 px (250 px) a 320; a 390 e 1440 resta 72 e 259 px come nella direzione | creative-director (valore), ux-designer (conferma a11y) |
| 2 | — (risolto) | `--font-sans` | nella prima lettura mancava `'Schibsted Grotesk Fallback Roboto'` | già applicato nella versione delle 09:38: `'Schibsted Grotesk Variable', 'Schibsted Grotesk Fallback', 'Schibsted Grotesk Fallback Roboto', sans-serif` | Senza il fallback con metriche, su Android lo swap del font avrebbe generato CLS | nessuna azione |
| 3 | [SUGGERIMENTO] | `--font-mono` | `'Fragment Mono', ui-monospace, …` | aggiungere un `'Fragment Mono Fallback'` con `size-adjust` (su Menlo/Consolas/Courier New) | Etichette e coordinate cambiano larghezza allo swap; piccolo CLS nelle righe mono | web-performance-specialist |
| 4 | [IMPORTANTE] | nuovi: rapporti della Soglia | — (stringhe in `asset-slots.ts` e nei componenti) | `--ratio-porta: 3 / 5; --ratio-ritratto: 4 / 5; --ratio-quadrato: 1 / 1; --ratio-3-4: 3 / 4; --ratio-schermo: 16 / 10; --ratio-panorama: 1272 / 560; --ratio-panorama-21: 21 / 9; --ratio-video: 16 / 9;` | Un solo posto per i formati della direzione §1.2; segnaposto e immagini usano lo stesso valore (niente CLS alla sostituzione) | sessione principale |
| 5 | [IMPORTANTE] | nuovo: `--node-ink` | `.node__num { color: var(--bg) }` in `Node.astro` | `--node-ink: var(--calce)` in `:root`/`surface-calce`/`surface-pietra`, `var(--notte)` in `surface-notte`; la cifra usa `--node-ink` | Oggi la variante numerata di `Node.astro` non è ancora usata (il Documento ha nodi propri, calce con cifra notte), ma su una superficie pietra la cifra da 11 px sarebbe pietra su blu-node: 3,86:1 < 4,5 (1.4.3). Calce su blu-node 4,54:1, notte su blu-node-chiaro 8,54:1 | sessione principale |
| 6 | [SUGGERIMENTO] | nuovi: misure del Nodo | locali in `Node.astro` (1.625rem, 0.625rem, 1.25rem, scale 1.4 e 1.8) | `--node-ring: 1.625rem; --node-dot: 0.625rem; --node-dot-num: 1.25rem; --node-hover-scale: 1.4; --node-ping-scale: 1.8; --node-halo: 2px;` | Il Nodo compare in 6 componenti (hotspot, luoghi, carte, orizzonte, menu, 404): misure in un solo posto | sessione principale |
| 7 | [IMPORTANTE] | nuovi: focus | `outline: 2px solid var(--focus); outline-offset: 3px` scritto in `global.css` | `--focus-width: 2px; --focus-offset: 3px; --focus-ring-media: 0 0 0 2px var(--calce), 0 0 0 4px var(--inchiostro);` | `accessibilita.md` §2.2 chiede il doppio anello su foto e video (soglie, hotspot, controlli del video): oggi manca un valore condiviso | ux-designer |
| 8 | [IMPORTANTE] | `.surface-notte` | nessun `color-scheme` (vale `light` da `html`) | aggiungere `color-scheme: dark;` a `.surface-notte` | I form di chiusura di Puglia Digitale e Città Digitali stanno su notte: controlli nativi, barre di scorrimento della textarea e autofill resterebbero chiari | sessione principale |
| 9 | [SUGGERIMENTO] | nuovi: Orizzonte | locali in `Horizon.astro` (6, 12, 20) | `--tick-5: 6px; --tick-15: 12px; --tick-45: 20px;` | Stesse tacche in hero, capitoli, timeline, 404 e immagine social | sessione principale |
| 10 | [SUGGERIMENTO] | nuovo: `--btn-ghost-border` | `.cta--ghost { border-color: var(--line) }` (1,52:1) | `--btn-ghost-border: var(--field-border)` (4,11:1 su calce, 4,06:1 su notte con `bordo-campo-notte`) | La pillola ghost con il filetto decorativo sembra disattivata; il testo basta per 1.4.11, ma il contorno deve leggersi come controllo | creative-director |
| 11 | [SUGGERIMENTO] | nuovi: logo e icone | altezze del logo in `Wordmark.astro`; tratto delle frecce nei componenti | `--logo-h: 1.5rem` (1.75rem da 64em); `--stroke-icon: 1.5px` | Misure della direzione §4.4 e §3.1 in un solo posto | sessione principale |
| 12 | [SUGGERIMENTO] | motion del disegno di linea | `--dur-1400` (direzione) | decidere tra 1400 ms (direzione §6) e ≤ 1200 ms (`architettura.md` §6.6) e fissare `--dur-draw` | Due documenti danno valori diversi per lo stesso movimento | creative-director con web-performance-specialist |
| 13 | [SUGGERIMENTO] | nuovo: `--fs-ui` | voci dell'header e «Menu» a `1rem` scritto nei componenti | `--fs-ui: 1rem` (16 px, peso 600) per i controlli dell'header, fuori dalla scala editoriale e documentato qui (S5, verdetto del G4) | Un solo posto per le misure: oggi è l'unico corpo fuori scala del sito, insieme al clamp di `.stat__value` (§3.12) | sessione principale, dopo il lancio |

Nota fuori dai token, per la sessione principale: in `global.css` la maschera del text reveal si toglieva con un'animazione di `overflow` (`@keyframes unclip`), animabile solo in modo discreto. **Risolta:** ora `reveal.ts` aggiunge `.is-revealed` a fine animazione e la maschera si toglie con la classe (1.4.12).

---

## Ipotesi da validare

- Il carattere del logo è Montserrat (500 per «it», 700 per «Node»): l'adattamento sul PNG lo indica con forza, ma solo il file originale lo conferma.
- Le isole sotto i 18 km² possono restare fuori dalla carta d'Italia (a quella scala diventano puntini).
- La costa della Terra di Bari levigata con Catmull-Rom è un'interpretazione grafica corretta: passa per tutti i vertici di Natural Earth rimasti e non aggiunge dati.
- L'immagine social su calce è la predefinita; la variante notte serve per pagine a dominante notte (SIII, Città Digitali).
- Le coordinate dei sette luoghi sono state lette dal riquadro di Wikipedia tramite WebSearch e superano un controllo incrociato entro 1,4 km; la lettura diretta delle pagine resta `[DA VERIFICARE]`, non bloccante (direzione §1.4). Che le coordinate della sede siano quelle del comune, non dell'indirizzo, è deciso (`coordinate-luoghi.md` §5).
- Le regole dalla versione 0.2 in poi sono misurate in Chromium: `text-wrap: balance`, file delle etichette, centri dell'orizzonte, soglia di 1280 px delle città, varianti strette delle porte, gradi della variante «esperienza» e query di contenitore delle carte vanno riverificate su Safari iOS e Firefox `[DA VERIFICARE]`. Per la rotazione anche la resa, l'unità `svh` dentro `max()` negli intervalli e la sensazione con lo scorrimento a inerzia, che la striscia segue (direzione 0.5).
- La regola delle file delle etichette (§2.1), i centri dell'orizzonte e la soglia delle città (§3.8) dipendono dai luoghi, dalle coordinate e dal copy attuali: se cambiano, si rimisura (C11 lo ha dimostrato: C14-1).
- La carta delle città è misurata in Chromium. Le misure del nome nel generatore hanno margine (spaziatura di 1.4.12), ma Safari iOS e Firefox `[DA VERIFICARE]`.
- Se l'utente ingrandisce solo il testo dalle impostazioni del browser, i nomi della carta crescono più della carta e i margini potrebbero non bastare. Lo zoom della pagina non cambia nulla.
- I nomi della pagina «Tutte le città» sono quelli letti da brand-strategist: fino al testo della pagina restano `[DA VERIFICARE]`, anche sulla carta.

## Domande aperte

- **Cliente:** logo vettoriale ufficiale (positivo e negativo) e codici colore; conferma che la trama poligonale resta fuori dalla versione web; dati societari mancanti del footer.
- **creative-director:**
  - proposta per la carta di `/citta-digitali/` con i punti (`docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md`);
  - descrizione dell'anello nella direzione §4.4 (la misura dice «vuoto a destra e un poco in basso»);
  - durata del disegno di linea (§7, n. 12);
  - tecnica del disegno delle carte (otturatore o tratteggio, §5.4).
- **ux-designer:** conferma dell'area di tocco di 44 px attorno ai nodi da 26 px. Decisi: rotazione mobile con il limite `max(60svh, 60vw)` (parere del 2026-09-29); messaggi di errore sotto il campo con «!»; allineamento `end` dei campi appaiati (G4).
- **ux-designer:** elenco completo delle città in testo su `/citta-digitali/`, quando il testo della pagina del cliente è confermato (direzione 0.6 §1.4).
- **web-performance-specialist:** fallback con metriche per Fragment Mono (§7, n. 3).
- **brand-strategist e consulente legale:** testo della nota di trasparenza sotto i ritratti a inchiostro.

## Decisioni richieste

1. **Adozione dei token ancora aperti** (§7, nn. 3, 4 per la parte mancante, 6, 9, 11 e 12): nessuno cambia valori della direzione, li mette in un solo posto.
2. **Carta di `/citta-digitali/` con i punti** (creative-director, prima del go-live): proposta e snippet in `docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md`.
3. **Logo provvisorio in produzione:** va online il ridisegno finché non arriva il vettoriale ufficiale? Proposta: sì, con sostituzione allo stesso percorso (`src/assets/brand/itnode-wordmark.svg`, `public/brand/logo-itnode.png`), rigenerando favicon e immagine social con i due script.
