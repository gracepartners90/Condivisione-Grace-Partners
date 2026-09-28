---
titolo: Rimisura di performance dopo le correzioni (Fase 5, verso G4)
owner: web-performance-specialist
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/review/2026-09-28-sito-performance-web-performance-specialist.md, docs/performance/budget.md, docs/performance/architettura.md, dist/ (build del 2026-09-28 alle 11:30, commit 7c5f747), build «in pubblicazione» della sessione principale (PUBLIC_SLOT_MODE=publish, 11:30), misure Lighthouse 13.5.0 e Playwright 1.56.1 del 2026-09-28 (11:36–12:40 UTC), sorgente di Chromium (render_blocking_resource_manager.cc, document_loader.cc, consultato il 2026-09-28)]
---

# Rimisura di performance dopo le correzioni

**Oggetto.** Il sito in `dist/` dopo i commit `c67aa8e`, `e5cfc5b` e `7c5f747`, confrontato con la mia review precedente (`docs/review/2026-09-28-sito-performance-web-performance-specialist.md`, d'ora in poi «la review») e con `docs/performance/budget.md`. È una review: non ho modificato file in `src/`, `public/` o `scripts/`. Ho aggiornato solo i miei documenti in `docs/performance/`.

**In breve**
- **Bloccante 1 risolto.** Su `/siii/`, con throttling applicato, l'LCP passa da 1,98 a **1,04 s** e l'LCP − FCP da 935 a **0 ms**, in 5 corse su 5. Tutte e cinque le pagine misurate hanno LCP = FCP. Nessun elemento `[data-reveal]` o `.aperture` risulta nascosto nella prima viewport, in nessun fotogramma del caricamento (5 pagine × 4 viewport).
- **Budget rispettato su tutti i template:** tempi, pesi, JavaScript, font, terze parti e gli 8 controlli statici.
  - Nessuna regressione dell'LCP.
  - Sull'INP il caso peggiore sale da 128 a 200 ms solo perché ora il campione è più ampio: la build della review, rimisurata nelle stesse condizioni, arriva a 184 ms (§5).
- **Preload del font: decido di toglierlo** (riga 42 di `BaseLayout.astro`).
  - Con throttling applicato l'LCP migliora di 151 ms sulla home e di 177 ms su `/siii/`. Con quello simulato resta pari sulla home e migliora di 145 ms su `/siii/`.
  - Il sorgente di Chromium spiega perché: un font in preload blocca il primo rendering.
  - Costo per l'identità: sulla prima pagina, con rete lenta, il carattere di ripiego resta visibile 0,4–0,5 s in più. Serve l'assenso di creative-director.
- **INP entro il limite, ma senza margine sulla prima apertura del menu:** mediana 128 ms e massimo 200 ms su 19 pagine nuove. Non è una regressione (build della review: mediana 136, massimo 184). La causa è un ricalcolo di stile dell'intero documento all'apertura.
- **Contatore 01/05 di Città Digitali:** conforme al budget. Costa 37–116 ms di main thread ogni 2 s circa di scroll nella sezione (CPU 4x), senza task lunghi. Propongo una variante senza listener di scroll, provata: stesso comportamento, circa due terzi di costo in meno.
- **Variante «in pubblicazione»:** non cambia né l'LCP né il CLS. Stesse scatole, stesse immagini, 0 byte per i segnaposto.
- **Nuovo, non bloccante.** Il reveal a righe genera piccoli spostamenti di layout durante la lettura (CLS fino a 0,016), già presenti nella build della review. Una correzione CSS di 4 righe, provata, li azzera.
- **Anteprima su Railway (ADR 004):** il server è conforme su cache e compressione, e con esso i tempi di Lighthouse restano gli stessi. Manca il supporto alle richieste `Range`, che servirà quando il video passerà in `/video/` (osservazione 6, correzione provata).
- **Tre correzioni alla review** (§11):
  - la traccia dello scroll del §2.6 era stata fatta su una pagina ferma: lo scroll touch sintetico non scorre (§6);
  - il costo per l'identità del preload era una stima: ora è misurato (§4);
  - il caso peggiore dell'INP del menu si basava su un solo campione (§5).

## 1. Condizioni di test

- **Build misurata:** `dist/` del 2026-09-28 alle 11:30:40, commit `7c5f747`.
  - Verificato nella build: lo statement della hero SIII non ha `data-reveal`;
  - il nuovo `reveal.ts` è nel bundle `BaseLayout…PO_SpvFL.js`;
  - `_headers` contiene le regole per `/og/*` e `/brand/*`.
- **Server.** Server di misura del `budget.md` §6.6: Brotli q11 calcolato a ogni richiesta, `immutable` su `/_astro/*`, HTTP/1.1, su 127.0.0.1.
  - 8080: `dist/`.
  - 8082: copia di `dist/` senza la riga del preload, identica per il resto (verificato con `cmp`).
  - 8083: la build «in pubblicazione» della sessione principale (`scratchpad/dist-publish`), servita con lo stesso server. La porta 4322 (python, senza compressione) l'ho usata solo per un controllo di CLS e LCP.
  - 8081: copia della build della review (`a6de19d`, senza preload), per i confronti di regressione.
  - 8084–8089: copie di prova, ciascuna con una sola modifica (§5, §6 e §8).
- **Lighthouse 13.5.0**, la versione del budget e della review. Non ho usato la 12 installata nella scratchpad: i numeri non sarebbero confrontabili.
  - Chromium 141.0.7390.37 headless, preset mobile predefinito: Moto G Power 412×823, DPR 1,75, RTT 150 ms, 1,6 Mbit/s, CPU 4x.
  - 86 corse tra le 11:36 e le 12:35 UTC, `benchmarkIndex` 1642–2690.
  - Carico della macchina: 0,2 a riposo, 2–4 durante le corse (4 CPU).
  - Le varianti del confronto sul preload sono alternate corsa per corsa, per neutralizzare la deriva dell'ambiente.
- **Playwright 1.56.1** con CPU 4x:
  - INP secondo il metodo del `budget.md` §6.4;
  - tracce del main thread;
  - controllo del reveal fotogramma per fotogramma, con la rete del throttling applicato di Lighthouse (latenza 562,5 ms, 1,47 Mbit/s).
- **Limiti noti:**
  - il TTFB di laboratorio (65–234 ms) comprende la compressione Brotli fatta a ogni richiesta. Non sposta le mediane: con `scripts/serve.mjs` dell'ADR 004, che comprime all'avvio (TTFB locale circa 1 ms), home e `/siii/` danno gli stessi tempi (§9);
  - il video su `railway.app` non è raggiungibile (403 dal proxy);
  - **commit arrivati durante le misure.** `c025181` (12:33, fedeltà UI e accessibilità) e `9703461` (12:45, anteprima su Railway) cambiano `src/`, ma `dist/` non è stato ricostruito: tutte le misure riguardano `7c5f747`. Le modifiche sono piccole e non toccano `reveal.ts`, `BaseLayout.astro`, il contatore né lo script del menu; `Passage` riceve solo `overflow-wrap: anywhere`. Il rischio per le conclusioni è basso; la rimisura breve dopo la prossima build lo chiude.

## 2. Osservazione 1 della review: verifica

| `/siii/`, throttling applicato | Review (build delle 10:32) | Review, build delle 10:58 | Rimisura (`7c5f747`) |
|---|---|---|---|
| FCP (mediana) | 1,02 s | 1,02 s | 1,04 s |
| LCP (mediana) | 1,98 s | 1,98 s | **1,04 s** |
| LCP − FCP, singole corse | 916, 980, 935 ms | 953, 958, 957 ms | **0, 0, 0, 0, 0 ms** |
| Elemento LCP | statement | statement | statement «Non raccontare la tua azienda.» |

- **Le altre pagine.** Con throttling applicato LCP − FCP = 0 in tutte le corse: home (5), Puglia Digitale (3), Città Digitali (3) e Contatti (3).
- **Controllo fotogramma per fotogramma.**
  - Condizioni: CPU 4x e rete lenta; 5 pagine; viewport 412×823, 390×844, 768×1024 e 1440×900; 220–230 fotogrammi per caricamento.
  - A ogni fotogramma ho controllato che nessun elemento nella viewport avesse opacità sotto 1, righe traslate o otturatori chiusi. Risultato: **0 casi**.
  - Gli elementi già a schermo all'avvio ricevono subito `is-inview`: la porta della hero SIII (tutte le viewport), l'H2 della home a 390 e 768 px, il video di Città Digitali e l'H2 di Puglia Digitale a 768 px.
- **Verdetto sull'osservazione 1: risolta.**

## 3. Tempi, pesi e controlli statici

### 3.1 Throttling simulato (mediane)

| URL | Corse | FCP | LCP | TBT | CLS | Speed Index | Punteggio | Elemento LCP | Review: FCP / LCP |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 5 | 1,18 s | 1,66 s | 0 | 0 | 1,18 s | 100 | riga dell'H1 «La tecnologia cambia.» | 1,19 / 1,73 s |
| `/siii/` | 5 | 1,28 s | 1,66 s | 0 | 0 (era 0,002) | 1,28 s | 100 | statement della hero | 1,29 / 1,66 s |
| `/puglia-digitale/` | 3 | 1,16 s | 1,59 s | 0 | 0 | 1,16 s | 100 | descrittore dell'H1 | 1,26 / 1,73 s |
| `/citta-digitali/` | 10 | 1,34 s | 1,67 s | 0 | 0 | 1,34 s | 99–100 | sottotitolo della hero | 1,26 / 1,67 s |
| `/contatti/` | 3 | 1,14 s | 1,51 s | 0 | 0 | 1,14 s | 100 | H1 | 1,15 / 1,51 s |
| `/privacy-policy/` | 3 | 0,99 s | 1,36 s | 0 | 0 | 0,99 s | 100 | paragrafo | 0,99 / 1,51 s |
| `/cookie-policy/` | 3 | 1,03 s | 1,36 s | 0 | 0 | 1,03 s | 100 | paragrafo | 0,98 / 1,51 s |
| `/404.html` | 3 | 0,99 s | 1,51 s | 0 | 0 | 0,99 s | 100 | paragrafo | 0,99 / 1,51 s |

- **Budget §2:** tutti i limiti e gli obiettivi sono rispettati.
- **LCP simulato.** Il modello restituisce valori a gradini (1,36, 1,51, 1,59, 1,66 e 1,73 s): scarti di un gradino tra review e rimisura non indicano una modifica.
- **FCP di Città Digitali:** +0,08 s rispetto alla review (mediana di 10 corse). L'LCP è invariato e l'obiettivo di 1,5 s è rispettato.
  - Le corse si dividono in due gruppi: 1,27–1,30 s e 1,37–1,41 s, più una anomala a 1,54 s con `benchmarkIndex` 1798.
  - La causa non è isolata. Non dipende dal reflow forzato di `reveal.ts` (§9): le corse con il reflow valgono 1,30, 1,38 e 1,54 s, quelle senza arrivano anche a 1,37–1,41 s.
  - Il TTFB del server di laboratorio non sposta le mediane di home e `/siii/` (§1); su questa pagina non l'ho verificato.
  - Con throttling applicato l'FCP di Città Digitali è 1,01 s, contro 1,06 s nella review: nessun peggioramento reale.

### 3.2 Throttling applicato: la riga LCP − FCP

| URL | Corse | FCP | LCP | LCP − FCP | TBT | CLS | Review |
|---|---|---|---|---|---|---|---|
| `/` | 5 | 1,01 s | 1,01 s | 0 ms | 52 ms | 0 | 1,00 / 1,00 s |
| `/siii/` | 5 | 1,04 s | 1,04 s | **0 ms** | 54 ms | 0 | 1,02 / **1,98 s** |
| `/puglia-digitale/` | 3 | 1,02 s | 1,02 s | 0 ms | 36 ms | 0 | — |
| `/citta-digitali/` | 3 | 1,01 s | 1,01 s | 0 ms | 30 ms | 0 | 1,06 / 1,06 s |
| `/contatti/` | 3 | 0,93 s | 0,93 s | 0 ms | 7 ms | 0 | — |

Limite ≤ 200 ms e obiettivo ≤ 100 ms rispettati ovunque.

### 3.3 Pesi e richieste (trasferiti, al caricamento, senza scroll)

| URL | Documento | di cui CSS inline (br) | JS | Font | Immagini | Totale | Richieste | Review: totale |
|---|---|---|---|---|---|---|---|---|
| `/` (T1) | 20,9 KB | 9,2 KB | 2,0 KB, 2 file | 70,7 KB | 19,2 KB | 113,2 KB | 7 | 112,6 KB |
| `/siii/` (T2) | 19,9 KB | 10,1 KB | 4,2 KB, 3 file | 70,7 KB | 0 | 95,3 KB | 7 | 94,5 KB |
| `/puglia-digitale/` (T2) | 19,2 KB | 9,8 KB | 4,2 KB | 70,7 KB | 16,7 KB | 111,2 KB | 8 | 110,4 KB |
| `/citta-digitali/` (T2) | 22,1 KB | 9,9 KB | 5,5 KB, 4 file | 70,7 KB | 0; video 0 | 98,7 KB | 8 | 97,8 KB |
| `/contatti/` (T3) | 14,2 KB | 6,9 KB | 4,2 KB | 70,7 KB | 0 | 89,6 KB | 7 | 88,8 KB |
| T4 (privacy, cookie, 404) | 8,7–9,6 KB | 4,9 KB | 2,0 KB | 70,7 KB | 0 | 81,8–82,6 KB | 6 | 81,6–82,3 KB |

- **Tutti i valori sono dentro il budget §3**, con zero terze parti.
- **JavaScript:** +0,3–0,4 KB per pagina (nuove funzioni in `track.ts` e `reveal.ts`).
  - Lo script del contatore è inline: 1,1 KB non compresso insieme a quello della carta, nessuna richiesta.
- **Immagini su Contatti.** Con throttling applicato viene scaricato anche il ritratto `lazy` (9,5 KB), che rientra nella distanza di caricamento anticipato di Chromium su rete lenta. Il budget T3 (60 KB) resta rispettato.
- **DOM:** 179–583 elementi (`/siii/` 583, home 554).

### 3.4 Controlli statici (`budget.md` §6.3)

Tutti superati, con i comandi del budget:
- 0 `fetchpriority="high"`;
- 0 `<img>` o `<source>` di art direction senza dimensioni;
- 0 shorthand `animation` con timeline di scroll;
- 0 iframe;
- `<video>` con `preload="none"`, senza `poster` né `autoplay`;
- 0 risorse esterne;
- 1 preload per pagina, 2 file `.woff2`;
- 0 AVIF o WebP oltre i 200 KB. `public/og/default.jpg` resta l'eccezione già accettata.

Gli SVG inline pesano al massimo 7,0 KB (carta dell'Italia, limite 20 KB).

## 4. Preload del font: confronto e decisione

### 4.1 Misure (stessa build, unica differenza la riga del preload; corse alternate)

| Pagina e throttling | Con preload: FCP / LCP | Senza preload: FCP / LCP | Differenza sull'LCP |
|---|---|---|---|
| `/`, applicato (5 corse) | 1,01 / 1,01 s | **0,86 / 0,86 s** | **−151 ms** |
| `/siii/`, applicato (5 corse) | 1,04 / 1,04 s | **0,78 / 0,86 s** | **−177 ms** |
| `/`, simulato (5 corse) | 1,18 / 1,66 s | 1,51 / 1,66 s | pari (+1 ms) |
| `/siii/`, simulato (5 corse) | 1,28 / 1,66 s | 1,51 / **1,51 s** | **−145 ms** |
| home a 768×1024, Playwright con rete lenta (3 caricamenti) | 1,04–1,08 s (LCP = FCP) | 0,88–0,93 s (LCP = FCP) | circa −150 ms |

- **CLS:** 0 con il preload; 0 senza, salvo una corsa della home a 0,002. Il ripiego con metriche corrette funziona.
- **Una corsa senza preload su `/siii/`** ha LCP − FCP = 245 ms: il primo paint conteneva solo la parte alta, durante un task lungo (TBT 244 ms). La mediana resta 0 ms.
- **Arrivo del carattere definitivo** (fine del download, throttling applicato):
  - con il preload: 1,43–1,52 s;
  - senza: 1,51–2,04 s, cioè 0,22–0,28 s più tardi (mediana).
- **Tempo in cui si vede il ripiego** (dall'FCP all'arrivo del font), in mediana:
  - home: 0,42 s con il preload, 0,82 s senza;
  - `/siii/`: 0,43 s con il preload, 0,96 s senza.

### 4.2 Perché i due metodi danno risultati opposti

- **Il meccanismo sta nel sorgente di Chromium.** Un `<link rel="preload">` di font dichiarato prima del `<body>` rende il font «bloccante per il rendering».
  - Il primo rendering attende il font, oppure uno di due timer: 100 ms dall'inserimento del `<body>`, se restano solo font a bloccare (`kMaxFCPDelay`), oppure 1500 ms dall'avvio della navigazione (`kMaxBlockingTimeForRenderBlockingFonts`).
  - Fonti, consultate il 2026-09-28: [render_blocking_resource_manager.cc](https://raw.githubusercontent.com/chromium/chromium/main/third_party/blink/renderer/core/loader/render_blocking_resource_manager.cc), [render_blocking_resource_manager.h](https://raw.githubusercontent.com/chromium/chromium/main/third_party/blink/renderer/core/loader/render_blocking_resource_manager.h), [document_loader.cc](https://raw.githubusercontent.com/chromium/chromium/main/third_party/blink/renderer/core/loader/document_loader.cc).
  - Il comportamento vale per qualsiasi `font-display`, `swap` compreso.
  - Nelle corse con throttling applicato si vede così: con il preload il primo layout parte a circa 1,0 s (lo mostra la richiesta di Fragment Mono), senza a 0,66–0,97 s.
- **Il throttling simulato (Lantern) lo modella al contrario.**
  - Nella corsa di riferimento, senza rallentamento, il font arriva prima dell'FCP. Lantern lo tratta quindi come una dipendenza dell'FCP e, senza preload, lo mette in fondo alla catena: +0,23–0,33 s di FCP.
  - Con throttling applicato, invece, in **tutte e 20** le corse l'FCP arriva **prima** del font (0,36–1,05 s prima). Il testo si dipinge con il ripiego, come prevede `swap`.
  - Il peggioramento dell'FCP simulato è quindi un limite del modello, non un ritardo reale.
- **Per l'LCP**, che è la Core Web Vital, la variante senza preload è migliore o pari in tutti e 4 i confronti.

### 4.3 Decisione (owner del dominio performance)

**Si toglie il preload.** È la regola che il budget §3 fissava per la Fase 5: tenere la variante con l'LCP migliore.

- **Costo per l'identità.** Sulla **prima pagina** di una visita, con rete lenta, il carattere di ripiego resta visibile 0,4–0,5 s in più (§4.1). Il font arriva 0,2–0,3 s più tardi.
  - Dalla seconda pagina in poi non cambia niente: i font restano in cache con `immutable`.
  - Lo spostamento di layout resta 0–0,002 grazie al ripiego con metriche corrette.
- **Serve l'assenso di creative-director**, perché la scelta tocca l'identità. Se creative-director preferisce il preload, si tiene: entrambe le varianti rispettano ampiamente soglie e obiettivi di LCP.
- **Motivazione per il budget.** Senza preload l'FCP simulato della home è 1,51 s, 0,01 s sopra l'obiettivo di 1,5 s (il limite è 1,8 s). La motivazione è il §4.2: l'FCP reale scende.
- **Budget e architettura aggiornati:** `budget.md` §3, controllo n. 7 e nuova baseline al §7.1; `architettura.md` regola 4, §2 e §12.

## 5. INP (Playwright, CPU 4x, 412×823 touch, 3 ripetizioni)

| Interazione | Durate (ms) | Peggiore | Review | Obiettivo ≤ 100 ms | Limite ≤ 200 ms |
|---|---|---|---|---|---|
| Apertura del menu (`<dialog>`) | 200 · 112 · 112 | 200 | 128 · 80 · 64 | mancato | rispettato, senza margine |
| Chiusura del menu | 88 · 88 · 112 | 112 | 104 · 80 · 80 | mancato di poco | rispettato |
| Nodo della foto evento (home) | 64 · 32 · 48 | 64 | 80 · 40 · 40 | rispettato | rispettato |
| Interruttore «Tour 360° / SIII» | 104 · 32 · 80 e 48 · 64 · 56 | 104 | 88 · 56 · 40 e 40 · 56 · 40 | mancato di 4 ms alla prima | rispettato |
| Invio del form con errori, 3 volte | 104 · 48 · 48 | 104 | 96 (ripetizioni fallite) | mancato di 4 ms alla prima | rispettato |
| Invio del form valido (endpoint assente) | 72 | 72 | 56 | rispettato | rispettato |
| Play e audio del video (solo il gestore) | 88 · 32 · 32 e 32 · 32 · 40 | 88 | 88 · 24 · 40 e 40 · 40 · 32 | rispettato | rispettato |

**Prima apertura del menu, con più campioni** (pagina nuova a ogni prova):

| Build | Campioni | Mediana | Massimo |
|---|---|---|---|
| Attuale, con preload (8080) | 19 | 128 ms | 200 ms |
| Attuale, senza preload (8082) | 6 | 136 ms | 160 ms |
| Build della review, `a6de19d` (8081) | 6 | 136 ms | 184 ms |
| Attuale senza la regola `html:has(dialog[open]) { overflow: hidden }` (8084) | 6 | 136 ms | 144 ms |

- **Non è una regressione.** La review aveva un solo campione della prima apertura (128 ms); con 19 campioni la coda arriva al limite (75° percentile 152 ms, massimo 200 ms).
- **Il blocco dello scroll non c'entra:** nello stesso lotto, senza la regola la mediana è 136 ms, con la regola 120 ms.
- **Dove va il tempo** (traccia, 3 prove):
  - il gestore del click dura 70–99 ms;
  - quasi tutto è **un unico ricalcolo di stile su 631 elementi**, cioè tutto il documento: 52–80 ms;
  - poi il layout del solo dialog: 139 oggetti su 761, 8–15 ms.
  - La causa più probabile è l'inerzia che `showModal()` applica al resto della pagina [DA VERIFICARE].
- **Prova rapida con `content-visibility: auto`** sulle 6 sezioni fuori schermo della home:
  - gli elementi ricalcolati si dimezzano (631 → 302, stile 31–48 ms);
  - la durata dell'interazione però resta nel rumore (mediana 120 → 112 ms, 6 campioni);
  - gli effetti collaterali sul motion non sono verificati. Non la propongo.
- **Osservazione 10 della review: non si riproduce più.** Con lo stesso script, i tre invii con errori consecutivi riescono tutti; il tap richiede 208, 84 e 97 ms. È chiusa.

## 6. Scroll e contatore 01/05 di Città Digitali

### 6.1 Correzione del metodo della review

- **Lo scroll touch sintetico non scorre la pagina.** Con Chromium 141 headless e l'emulazione mobile di Playwright, `Input.synthesizeScrollGesture` con sorgente `touch` sposta la pagina di **0 px in 12 prove su 12** (home e Città Digitali, da 0 e da 2225 px, punti di partenza a 400 e 658 px).
- La stessa richiesta con sorgente `mouse` (rotella) scorre 1496–1500 px.
- **La traccia del §2.6 della review era quindi su una pagina ferma.** I suoi numeri non valgono: main thread al 10%, nessun Layout né Paint.
- Le misure qui sotto usano la rotella. Il metodo è ora scritto nel `budget.md` §6.4.

### 6.2 Misure (CPU 4x, rotella a 1500 px/s)

| Scenario | Main thread occupato | Task più lungo | Task oltre 50 ms | Note |
|---|---|---|---|---|
| Home, mobile, 3000 px dall'inizio (build attuale) | 779–834 ms su 2,1 s (37–39%) | 18–29 ms | 0 | stile a ogni frame (118–123), 66–70 Paint, 7–9 Layout |
| Stesso scenario, build della review | 811–832 ms (38–39%) | 28–29 ms | 0 | nessuna regressione |
| Stesso scenario, con `prefers-reduced-motion: reduce` | 241–260 ms (12%) | 8–11 ms | 0 | 2 ricalcoli di stile, 10 Paint: il motion vale circa 26 punti |
| Città Digitali, mobile, 3000 px dall'inizio (build attuale) | 534–645 ms (25–31%) | 16–23 ms | 0 | il contatore si attiva nell'ultimo tratto |
| Stesso scenario, build della review | 556–581 ms (26–28%) | 17–22 ms | 0 | — |
| Sezione dei benefici, mobile 412×823, 2512 px, con contatore | 573–686 ms (32–39%) | 17–22 ms (una corsa su sei: 135 ms, isolato) | 0 (1 isolato) | contatore nascosto sotto 64em, ma lo script lavora |
| Stesso scenario, senza contatore | 479–520 ms (27–29%) | 17–19 ms | 0 | — |
| Sezione dei benefici, desktop 1440×900, 2847 px, con contatore | 517–625 ms (26–31%) | 20–25 ms | 0 | rAF a ogni frame: mediana 0,8–1,2 ms, massimo 7,4–14,2 ms; 01→05 corretto |
| Stesso scenario, variante IntersectionObserver (§8, osservazione 3) | 479–557 ms (24–28%) | 13–21 ms | 0 | nessun rAF né lettura di layout; 01→05 identico |
| Stesso scenario, senza contatore | 432–540 ms (22–27%) | 14–20 ms | 0 | — |

- **Contatore: conforme al budget.**
  - Nessun task oltre 50 ms è attribuibile: quello da 135 ms non si è ripetuto in altre 4 corse, dove il massimo è 17–22 ms.
  - Il costo, a coppie alternate nello stesso lotto, è di 37–116 ms ogni 2 s circa di scroll nella sezione, cioè 2–6 punti di main thread con CPU 4x, circa 1 ms per frame.
  - Sull'INP l'effetto è trascurabile: lo scroll non è un'interazione, e il contatore aggiunge al ritardo d'ingresso di un tap durante lo scroll al massimo un rAF (≤ 14 ms).
- **Motion durante lo scroll.** In `architettura.md` §6.5 le animazioni legate allo scroll erano date «sul compositor». Lo scroll resta fluido e senza task lunghi, ma il main thread ricalcola lo stile a ogni frame: circa 6,5 ms per frame con CPU 4x sulla home, contro 2 ms con movimento ridotto. È un costo accettabile e invariato rispetto alla build della review. Lo annoto nell'architettura e non propongo interventi per G4.

## 7. Variante «in pubblicazione» dei segnaposto

| URL | Variante | Simulato: FCP / LCP | Applicato: FCP = LCP | CLS | Elemento LCP | Peso, richieste |
|---|---|---|---|---|---|---|
| `/siii/` | normale | 1,28 / 1,66 s (5 corse) | 1,04 s (5) | 0 | statement | 95,3 KB, 7 |
| `/siii/` | in pubblicazione | 1,29 / 1,66 s (3) | 1,05 s (3) | 0 | statement | 95,2 KB, 7 |
| `/puglia-digitale/` | normale | 1,16 / 1,59 s (3) | 1,02 s (3) | 0 | descrittore dell'H1 | 111,2 KB, 8 |
| `/puglia-digitale/` | in pubblicazione | 1,29 / 1,73 s (3) | 1,02 s (3) | 0 | descrittore dell'H1 | 111,2 KB, 8 |

- **Puglia Digitale, LCP simulato.** Lo scarto (1,59 contro 1,73 s) è un effetto dei gradini del modello: le singole corse valgono 1,36, 1,59 e 1,73 s per la normale e 1,66, 1,73 e 1,74 s per l'altra. Con throttling applicato l'LCP è identico, e l'elemento LCP è lo stesso.
- **Controllo con Playwright:** `/`, `/siii/` e `/puglia-digitale/`, a 412×823, 320×640 e 1440×900, con scroll completo.
  - Altezze di pagina identiche in tutti i 9 casi.
  - Scatole dei segnaposto identiche; in 4 casi c'è una differenza di 1 px, per arrotondamento dello stesso rapporto (per esempio 1415×885 contro 1414×884). `container-type: inline-size` non fa collassare nessuna scatola.
  - CLS durante lo scroll uguale tra le due varianti.
  - Immagini scaricate identiche: 0 byte per i segnaposto.
  - Elemento LCP identico. Anche su 4322 (server python) CLS ed elemento LCP coincidono.
- **Verdetto: la variante non cambia né l'LCP né il CLS.**

## 8. Osservazioni

### 1. [IMPORTANTE] Togliere il preload del font (dopo l'assenso di creative-director)

- **Dove.** `src/layouts/BaseLayout.astro:42`.
- **Problema.** In Chromium il preload blocca il primo rendering fino all'arrivo del font o a un timer. Il testo, che è l'LCP di ogni pagina, compare quindi più tardi: 151 ms sulla home e 177 ms su `/siii/` con throttling applicato (§4).
- **Motivazione.**
  - `budget.md` §3: in Fase 5 si tiene la variante con l'LCP migliore.
  - Misure: LCP migliore o pari in 4 confronti su 4.
  - Il meccanismo è confermato dal sorgente di Chromium.
- **Proposta.** Eliminare la riga; l'import `schibstedUrl` resta, perché serve al `@font-face` della riga 34.

```astro
<!-- src/layouts/BaseLayout.astro — delete line 42 -->
<link rel="preload" href={schibstedUrl} as="font" type="font/woff2" crossorigin />
```

- Dopo la modifica: controllo n. 7 del budget = **0** `rel="preload"` per pagina.
- Rimisura breve di `/` e `/siii/` con 3 corse per metodo: la faccio io su richiesta.
- **Documenti di altri membri da allineare** se la decisione viene confermata:
  - `docs/ui/design-system.md`, tabella dei font (ui-designer);
  - `docs/creativa/direzione-visiva.md` §caricamento dei font (creative-director);
  - `docs/decisioni/001-stack-tecnologico.md` (owner dell'ADR).

### 2. [SUGGERIMENTO, consigliato prima del go-live] Il reveal a righe sposta il layout durante la lettura

- **Dove.**
  - `src/styles/global.css:333-337`: la maschera `.reveal-ready [data-reveal='lines']:not(.is-revealed) .line { overflow: clip; padding-block: 0.12em; margin-block: -0.12em }`.
  - `src/components/ui/Passage.astro`.
- **Problema.**
  - Tra una riga e l'altra i margini negativi adiacenti **collassano** in uno solo, quindi il padding non viene compensato: finché c'è la maschera il passage è più alto di 3–20 px.
  - Quando `reveal.ts` aggiunge `is-revealed`, il blocco si accorcia e tutto ciò che sta sotto risale.
  - Misurato con ResizeObserver e Layout Instability API, durante uno scroll completo:

| Pagina, viewport | CLS durante la lettura, oggi | Con la correzione proposta |
|---|---|---|
| `/`, 412×823 | 0,0161 (3 spostamenti) | 0 |
| `/`, 1440×900 | 0,0143 (2) | 0 |
| `/siii/`, 1440×900 | 0,0135 (1) | 0 |
| `/siii/`, 320×640 | 0,0075 (1) | 0 |
| `/puglia-digitale/`, 412×823 | 0–0,0060 (dipende dal momento) | 0 |
| `/citta-digitali/`, 412 e 1440 | 0 (un ridimensionamento fuori viewport) | 0 |

- **Motivazione.**
  - Il CLS sul campo conta anche gli spostamenti durante la lettura: lo scroll non è un input che li esclude.
  - Oggi siamo molto sotto l'obiettivo di 0,05, quindi non blocca.
  - Il difetto c'era già nella build della review (0,0042 per spostamento sulla home), e la correzione costa 4 righe.
- **Proposta.** Due varianti provate, entrambe con CLS 0, nessun ridimensionamento e layout finale identico al pixel (altezze di pagina e di ogni passage) su 7 combinazioni di pagina e viewport. Consiglio la prima, che lascia intatta la geometria della maschera.

```css
/* src/styles/global.css — inside the existing @media (prefers-reduced-motion: no-preference)
   block, right after the `.line` mask rule */
  /* In a column flexbox the lines' negative margins do not collapse: the masked passage is
     exactly as tall as the revealed one, so dropping the mask moves nothing (no layout shift). */
  .reveal-ready [data-reveal='lines']:not(.is-revealed) .passage__reg {
    display: flex;
    flex-direction: column;
  }
```

  - Alternativa: sostituire padding e margini negativi con `clip-path: inset(-0.12em -0.5em)` sulla `.line`.
  - ui-designer dia un'occhiata all'animazione una volta applicata: durante la salita le righe stanno già alla distanza finale, invece che 0,12 em più distanziate.

### 3. [SUGGERIMENTO] Contatore 01/05: stessa funzione senza listener di scroll

- **Dove.** `src/components/sections/BenefitsSection.astro:90-120`.
- **Problema.**
  - Il costo è dentro il budget (§6).
  - Il listener di scroll, però, fa `getBoundingClientRect()` di 5 voci a ogni frame e forza il ricalcolo dello stile dentro il rAF (92–95 volte in 2 s).
  - Contraddice la regola 9 di `architettura.md`: «Nessun listener di scroll».
- **Motivazione.** Variante provata su una copia della build, con 1440×900 e 1024×768:
  - stessi valori del contatore in circa 30 posizioni e dopo ogni salto (Home, End, àncora, ritorno in cima, cronologia);
  - main thread 479–557 ms contro 517–580 ms del contatore attuale e 432–493 ms senza contatore;
  - in ognuna delle 3 coppie la variante costa meno. In mediana aggiunge 24 ms alla pagina senza contatore, contro i 68 ms del contatore attuale: circa due terzi in meno.
- **Proposta.** Sostituire lo `<script>` con:

```astro
<script>
  // Decorative 01/05 indicator: the last item whose top has passed the middle of the viewport.
  // One IntersectionObserver whose root is the whole area above that line (huge top margin,
  // bottom half cut off): an item intersects it exactly when its top is above the middle, also
  // after jumps (anchors, Home key, history). No scroll listener, no layout reads.
  document.querySelectorAll<HTMLElement>('.benefits--sticky').forEach((section) => {
    const out = section.querySelector<HTMLElement>('[data-benefits-current]');
    const items = [...section.querySelectorAll<HTMLElement>('[data-benefit]')];
    if (!out || !items.length || !('IntersectionObserver' in window)) return;
    const passed = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) passed.add(entry.target);
          else passed.delete(entry.target);
        }
        const current = items.filter((item) => passed.has(item)).at(-1) ?? items[0];
        const value = current.dataset.benefit ?? '';
        if (out.textContent !== value) out.textContent = value;
      },
      { rootMargin: '100000px 0px -50% 0px' },
    );
    items.forEach((item) => observer.observe(item));
  });
</script>
```

- **Limite della prova:** verificata solo su Chromium 141. Su Safari va controllata una volta a mano [DA VERIFICARE].

### 4. [SUGGERIMENTO] Menu mobile: la prima apertura è al limite nella coda

- **Dove.** `src/components/layout/Header.astro` e `src/scripts/header.ts`.
- **Problema.** Prima apertura: mediana 128 ms, 75° percentile 152 ms, massimo 200 ms su 19 pagine nuove (§5). Il gestore è corretto; il costo è un ricalcolo di stile di tutto il documento (52–80 ms con CPU 4x).
- **Motivazione.**
  - Il limite di `budget.md` §5 (≤ 200 ms) è rispettato in tutti i campioni; l'obiettivo di 100 ms no.
  - Non è una regressione, e il laboratorio con CPU 4x emula un telefono più lento della fascia media attuale [IPOTESI].
- **Proposta.**
  - Nessun intervento per G4.
  - Dopo il lancio serve un dato di campo: RUM con `web-vitals` (decisione aperta con cro-specialist, `budget.md` §6.7), oppure una prova su un Android reale.
  - Se il valore supera i 100 ms, le leve sono il numero di elementi del DOM e il costo dei selettori; `content-visibility` da sola non basta (§5).

### 5. [SUGGERIMENTO] Automatizzare i controlli (osservazione 4 della review, ancora aperta)

- **Dove.** `scripts/perf/` non esiste; `scripts/prelaunch-check.mjs` non contiene controlli di performance.
- **Problema.** Due dei problemi di questa rimisura li avrebbe trovati un controllo automatico:
  - il reveal nella prima viewport;
  - il CLS durante lo scroll.
  - E il metodo manuale può sbagliare, come lo scroll touch che non scorre.
- **Proposta.** Come nella review: `scripts/perf/serve.mjs`, `lighthouse.mjs` e `checks.mjs`, più due controlli Playwright:
  - nessun elemento nascosto nella prima viewport, fotogramma per fotogramma;
  - CLS durante uno scroll completo con la rotella.
  - Li scrivo io su richiesta: gli script di questa rimisura sono pronti.
  - Non serve più un `scripts/perf/serve.mjs`: il server di misura può essere `scripts/serve.mjs` dell'ADR 004, che dà gli stessi tempi (§9). Ho aggiornato il `budget.md` §6.

### 6. [IMPORTANTE] `scripts/serve.mjs` (anteprima su Railway) ignora le richieste `Range`

- **Dove.** `scripts/serve.mjs`, funzione `send()`; ADR 004.
- **Problema.**
  - Una richiesta `Range: bytes=0-1023` riceve 200 con il file intero, senza `Accept-Ranges`. Verificato con un MP4 di prova da 300 000 byte in `/video/`.
  - Oggi il video viene ancora da `railway.app`, quindi non incide.
  - Diventa un difetto quando il video passerà in `/video/` servito da questo server, come raccomandano l'osservazione 2 della review e l'ADR 001: Safari su iOS riproduce un video solo se il server risponde 206, e senza `Range` ogni spostamento nel video riscarica il file dall'inizio.
- **Motivazione.** `architettura.md` §4.3 (`Range` → 206, obbligatorio per Safari su iOS) e osservazione 2 della review.
- **Proposta.** Aggiungere in `send()`, subito prima di `const [encoding, body] = encodingFor(req, file);`, il blocco seguente. È provato su una copia:
  - 206 con i byte giusti (verificati con `cmp`) per `0-1023`, `1000-` e `-500`;
  - estremo oltre la fine ridotto alla dimensione del file;
  - 416 per `300000-` e `5-2`;
  - l'HTML compresso ignora `Range`, come consentito.

```js
  // Media (never compressed): single byte ranges. Safari on iOS plays a video only with 206.
  if (!file.br) headers['Accept-Ranges'] = 'bytes';
  const range = !file.br && status === 200 && /^bytes=(\d*)-(\d*)$/.exec(String(req.headers.range ?? ''));
  if (range && (range[1] || range[2])) {
    const size = file.body.length;
    const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    if (start > end || start >= size) {
      res.writeHead(416, { ...headers, 'Content-Range': `bytes */${size}` });
      return res.end();
    }
    headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
    headers['Content-Length'] = end - start + 1;
    res.writeHead(206, headers);
    return res.end(req.method === 'HEAD' ? undefined : file.body.subarray(start, end + 1));
  }
```

- Un file video da 25 MiB resta in memoria come il resto del sito: con un solo video è accettabile.

## 9. Note senza intervento

- **ADR 004, anteprima su Railway: conferma di dominio su cache e compressione.** Ho misurato `scripts/serve.mjs` in locale sul `dist/` di `7c5f747`, con `DIST_DIR` e `PORT`.
  - Header corretti:
    - HTML con Brotli, `must-revalidate`, ETag e 304;
    - gzip come ripiego;
    - `/_astro/*` con `max-age=31536000, immutable`; OG e favicon a 86 400 s;
    - 404 vera e 301 per la barra finale;
    - `X-Robots-Tag: noindex` nell'anteprima.
  - La compressione avviene all'avvio, non a ogni richiesta: TTFB locale 0,7–1,1 ms, contro 164–217 ms del mio server di laboratorio.
  - Lighthouse con questo server (3 corse per metodo):
    - home: simulato 1,18 / 1,65 s, applicato 1,04 s;
    - `/siii/`: simulato 1,25 / 1,65 s, applicato 1,07 s.
    - Sono gli stessi valori del server di laboratorio.
  - **Conforme**, con la sola condizione dell'osservazione 6 per il video. Il TTFB reale da Railway (una sola regione) resta da misurare sull'anteprima pubblicata (osservazione 3 della review).

- **Reflow forzato di `reveal.ts`.**
  - L'insight `forced-reflow` di Lighthouse lo segnala in 4 corse simulate su 35 (3 su Città Digitali, 1 sulla home) e in nessuna delle 19 corse con throttling applicato: 30–37 ms senza rallentamento, quando il modulo gira prima del primo layout.
  - Con throttling applicato il modulo esegue dopo il primo paint e non incide su FCP, LCP e TBT: BaseLayout si scarica tra 0,68 e 1,27 s, `track.js` tra 1,28 e 1,85 s, e l'FCP è a circa 1,0 s.
  - Se il RUM mostrerà un FCP peggiore nelle visite ripetute, esiste un'alternativa senza letture di layout: un IntersectionObserver per la prima passata.
- **Catena dei moduli `BaseLayout` → `track.js`.** `track.js` parte solo dopo l'arrivo di `BaseLayout`: 0,57 s di catena con throttling applicato. Il menu diventa utilizzabile a circa 1,85 s su 4G lenta. Nessun effetto su LCP e CLS: il CLS è 0 anche nelle corse applicate, che comprendono quel momento. Da valutare dopo il lancio.
- **Osservazione 9 (video in `loop`):** risolta. `video_complete` scatta al 97% dentro il listener `timeupdate` già esistente; il costo è trascurabile.
- **`form.ts`:** `form_view` usa un IntersectionObserver a 21 soglie, che si disconnette alla prima vista. Nessun costo misurabile nelle interazioni (§5).

## 10. Stato delle osservazioni della review

| # | Oggetto | Stato |
|---|---|---|
| 1 | Reveal dello statement SIII [BLOCCANTE] | **risolta** (§2) |
| 2 | Video su Railway non verificabile | **aperta**: condizione per il go-live, invariata |
| 3 | Hosting e verifiche dopo il deploy | **aperta**: condizione per il go-live. Il server dell'anteprima su Railway è conforme su cache e compressione (§9); il TTFB reale va misurato sull'anteprima pubblicata |
| 4 | Automazione dei controlli | aperta (osservazione 5 qui) |
| 5 | Preload del font | **decisa**: togliere (osservazione 1 qui) |
| 6 | Prima apertura del menu | aggiornata con più campioni (osservazione 4 qui) |
| 7 | `sizes` della panoramica e dei ritratti | aperta, invariata: valori ancora quelli della review |
| 8 | Nitidezza delle sorgenti | aperta, dipende dagli asset [DA FORNIRE] |
| 9 | `video_complete` con `loop` | **risolta** |
| 10 | Tap sul pulsante dopo un invio con errori | **non riprodotta**, chiusa (§5) |
| 11 | Cache di `/og/*`, `/brand/*`, `apple-touch-icon.png` | **applicata** (verificata in `dist/_headers`) |

## 11. Correzioni alla review del 2026-09-28

- **§2.6, traccia dello scroll.** Era stata fatta con lo scroll touch sintetico, che in questo ambiente non scorre la pagina. I dati corretti sono al §6.2 di questa rimisura. La conclusione «nessun task lungo» resta valida; «nessun Layout né Paint» e «main thread al 10%» no.
- **Osservazione 5, costo per l'identità.** La stima di «0,1–0,2 s di ripiego in più» è sostituita dal dato misurato: 0,4–0,5 s in più (mediana), sulla prima pagina con rete lenta (§4.1).
- **Osservazione 6, caso peggiore dell'INP.** Il valore di 128 ms si basava su una sola prima apertura. Con 19 campioni: mediana 128 ms, massimo 200 ms (§5).

## Verdetto di dominio

**Conforme per G4.** Il bloccante è risolto, e tempi, pesi, JavaScript, font, terze parti, INP, CLS e controlli statici sono dentro il budget su tutti i template.

Restano due condizioni per il go-live, invariate rispetto alla review:
- i quattro controlli sul file video (osservazione 2 della review). Se il video passa in `/video/` servito da `scripts/serve.mjs`, la condizione comprende il supporto alle richieste `Range` (osservazione 6);
- le verifiche sull'anteprima dell'hosting scelto (osservazione 3 della review), compreso il TTFB reale da Railway se la produzione resterà lì.

Consigliati prima del go-live, non bloccanti:
- togliere il preload, dopo l'assenso di creative-director (osservazione 1);
- la correzione CSS del reveal a righe (osservazione 2).

## Ipotesi da validare

- [IPOTESI: il blocco del rendering dovuto al preload riguarda Chrome su Android, che produce i dati CrUX. Su Safari per iOS l'effetto del preload non è misurato: senza preload il testo compare con il ripiego Helvetica, che ha metriche corrette.]
- [IPOTESI: CPU 4x su questa macchina emula un telefono più lento della fascia media attuale; sul campo l'INP del menu sarà più basso che in laboratorio.]
- [DA VERIFICARE: la causa del ricalcolo di stile dell'intero documento all'apertura del menu, probabilmente l'inerzia applicata da `showModal()`.]
- [DA VERIFICARE: la variante IntersectionObserver del contatore su Safari, con un `rootMargin` molto grande.]
- [DA VERIFICARE, dalla review: dimensione, bitrate, `+faststart` e supporto delle richieste `Range` del video su Railway; CLS dello swap su un Android e un iPhone reali.]

## Domande aperte

1. **Per l'utente.** Quale hosting? L'ADR 001 è ancora una proposta.
2. **Per il cliente.** Chi fornisce il file sorgente del video e il permesso di ospitarlo con il sito?
3. **Per il cliente.** C'è un Android di fascia media o una chiave API di PageSpeed Insights per una verifica sul campo prima del lancio? Servirebbe anche per l'INP del menu.
4. **Per cro-specialist e l'utente.** RUM con `web-vitals` dopo il lancio, senza cookie: sì o no? È l'unico modo di sapere come si comportano sul campo il menu e il font senza preload.

## Decisioni richieste

- **creative-director:** accettare che, senza preload, il carattere di ripiego resti visibile 0,4–0,5 s in più sulla prima pagina con rete lenta (osservazione 1). In alternativa, chiedere di mantenere il preload: resta dentro soglie e obiettivi.
- **Sessione principale:**
  - applicare l'osservazione 1 dopo l'assenso di creative-director e l'osservazione 2 dopo un'occhiata di ui-designer all'animazione; facoltativamente l'osservazione 3;
  - applicare l'osservazione 6 a `scripts/serve.mjs` prima di spostare il video in `/video/`;
  - poi ricostruire `dist/`, che comprenderà anche `c025181`, e richiamarmi per una rimisura breve di `/` e `/siii/`;
  - eseguire o far eseguire i controlli sul video (osservazione 2 della review).
- **ui-designer, creative-director e l'owner dell'ADR 001:** allineare i propri documenti se il preload viene tolto (osservazione 1).
- **Utente:** hosting e sede definitiva del video.
- **cro-specialist:** RUM `web-vitals` dopo il lancio, da inserire nell'ADR sull'analytics.
