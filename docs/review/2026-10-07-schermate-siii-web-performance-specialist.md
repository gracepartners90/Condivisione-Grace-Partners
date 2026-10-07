---
titolo: Review di performance · Schermate SIII nel sito, /siii/ con un'immagine LCP
owner: web-performance-specialist
contributi: []
stato: in revisione
versione: 1.1
aggiornato: 2026-10-07
fonti: [commit d06a3e9 (schermate SIII), docs/performance/budget.md (0.4), docs/performance/architettura.md, docs/decisioni/005-preload-del-font.md (1.1 e 1.3), docs/decisioni/004-anteprima-su-railway.md, dist/ del 2026-10-07 alle 08:43 (d06a3e9), build di controllo 09dcd17, varianti costruite in un worktree della scratchpad, misure Lighthouse 13.5.0 e Playwright 1.56.1 del 2026-10-07 (08:51–09:41 UTC), sharp 0.35.5 del progetto; §7: commit bae201c (dist/ delle 11:20) e f28649a, misure delle 11:25–11:42 UTC]
---

# Review di performance · Schermate SIII nel sito

**Oggetto.** Il commit `d06a3e9` mette nel sito le schermate SIII inviate dall'utente il 2026-10-07:
- la porta della hero di `/siii/`, in `priority`: è la prima immagine LCP del sito;
- il capitolo 01 della Home e i tre esempi di `/siii/`, in `lazy`.

Rispondo alle quattro domande della sessione principale: misure e budget, `priority` e `sizes`, la facciata della reception, aggiornamento del budget. Non ho modificato file in `src/`. La patch per `Media.astro` è provata in un worktree della scratchpad (§6).

**In breve.**
- **`/siii/` con l'immagine LCP rispetta il budget del template T2.**
  - LCP simulato 1,80 s (obiettivo 2,0 s); con throttling applicato 1,70 s; desktop 0,40 s.
  - 8 richieste e 132,1 KB, di cui 34,0 KB di immagini; CLS 0.
- **L'immagine LCP rispetta il §4 su ogni dispositivo**: 18–58 KB, a seconda della densità di pixel.
- **Domanda 2.**
  - **`priority` è giusto anche su mobile**: la porta è l'elemento LCP a tutte le 19 viewport provate, anche a 320×640, dove se ne vedono 71 px. In `lazy` l'LCP peggiora di 271 ms.
  - **I `sizes` sono corretti** (da 0 a +9%, mai sottostimati).
- **Un bloccante, non nella porta.** Il primo esempio di `/siii/` non supera il controllo n. 8 del budget: WebP da 284 KB e JPEG da 313 KB a 1920 px. Correzione di una riga, provata (osservazione 1).
- **Effetto nuovo sull'ADR 005.** L'immagine in alta priorità divide la banda con il font in preload. Sulle reti lente il carattere di ripiego resta visibile 250–300 ms in più; sul 4G veloce, al massimo 35 ms. Decide il creative-director (osservazione 2).
- **Domanda 3: la facciata si può fare, ma solo con l'art direction.**
  - Sotto 64em si scarica un ritaglio 4:5 fatto in build, con larghezze fino a 768 px: 57,8 KB su ogni telefono, qualità invariata.
  - LCP 1,95 s simulato e 1,99 s applicato: dentro l'obiettivo, ma senza margine.
  - Patch di `Media.astro` provata: senza il nuovo prop l'HTML di tutte le pagine resta identico.
- **Consigliato:** lo stesso ritaglio per la sala di oggi. −23% di byte su mobile, −114 ms di LCP in laboratorio, nessuna differenza visibile (osservazione 3).

## 1. Condizioni di test

- **Build misurata:** `dist/` del 2026-10-07 alle 08:43, cioè `d06a3e9` (albero di lavoro pulito).
  - I commit successivi, fino a `133e9a5`, cambiano solo testi alternativi, un link trasparente sopra le schermate degli esempi e la descrizione di una carta. Nessun effetto su immagini, richieste o LCP (verificato sul diff).
- **Controllo:** `09dcd17`, il commit precedente, costruito in un worktree della scratchpad.
- **Varianti:**
  - copie di `dist/` con una sola modifica: porta `lazy`, porta `eager` senza `fetchpriority`;
  - build della patch di `Media.astro` (§6): sala con ritaglio 4:5, facciata con ritaglio 4:5.
- **Server:** `scripts/serve.mjs` su porte mie (8094–8099).
  - Non ho usato `astro preview` su 4321, che non comprime (`budget.md` §6.1), né il server Python su 4322.
- **Lighthouse 13.5.0**, Chromium 141, preset mobile predefinito (Moto G Power, 412×823, 1,75x); preset desktop solo per `/siii/`.
  - 68 corse tra le 08:51 e le 09:31 UTC, alternate tra le varianti; `benchmarkIndex` 1461–2919, carico 0,3–2,1.
- **Playwright 1.56.1:**
  - geometria a 19 viewport, da 320 a 2560 px e da 1x a 3x;
  - tre profili di rete con CPU rallentata:
    - laboratorio di Lighthouse: 562,5 ms di latenza, 1,47 Mbit/s, CPU 4x;
    - 4G veloce: 40 ms, 9 Mbit/s, CPU 2x;
    - 4G lento: 150 ms, 1,6 Mbit/s, CPU 4x;
  - CLS durante la lettura;
  - reveal fotogramma per fotogramma.
- **Pesi delle codifiche:** sharp 0.35.5 del progetto, con i parametri di Astro. Riproduce al decimo di KB i file della build.
- **Limiti:**
  - il server locale va in HTTP/1.1: le priorità di HTTP/2 (`fetchpriority`) non si vedono;
  - l'anteprima su Railway, aperta dal 2026-09-29, resta irraggiungibile da qui (proxy, 403);
  - l'API di PageSpeed Insights risponde 429: quota giornaliera anonima esaurita (2026-10-07).

## 2. Misure e budget (domanda 1)

### 2.1 Tempi

| Pagina e metodo | Corse | Nuova build | Controllo | Budget |
|---|---|---|---|---|
| `/siii/` mobile, simulato: FCP / LCP | 5 | 1,25 / **1,80 s** (immagine) | 1,28 / 1,65 s (testo) | LCP ≤ 2,0 s obiettivo, ≤ 2,5 s limite |
| `/siii/` mobile, applicato: FCP / LCP | 6 / 3 | 1,02 / **1,70 s** (1,67–1,73) | 1,06 / 1,06 s | idem |
| `/siii/` desktop, simulato: FCP / LCP | 3 | 0,31 / 0,40 s (immagine) | 0,31 / 0,40 s («SIII») | idem |
| `/` mobile, simulato: FCP / LCP | 5 | 1,19 / 1,73 s | 1,18 / 1,65 s | idem |
| `/` mobile, applicato: FCP = LCP | 3 | 1,02 s | 1,03 s | idem |

- **TBT:** 0 con il simulato; 40 ms su `/siii/` con l'applicato (controllo 66 ms). **CLS:** 0 in tutte le corse. **Punteggio:** 99 su `/siii/` (controllo 100), 100 sulla Home.
- **Home.** Le richieste del caricamento sono le stesse 7 del controllo: lo scarto dell'LCP simulato (1,73 contro 1,65 s) è un gradino del modello, non una differenza reale (rimisura del 2026-09-28, §3.1). Con throttling applicato l'LCP è pari (1,02 contro 1,03 s) e resta la riga dell'H1.
- **Regola del +10% (`budget.md` §8).** Su `/siii/` l'LCP cresce del 9% con il simulato e da 1,06 a 1,70 s con l'applicato.
  - **Motivazione:** l'elemento LCP cambia per scelta di contenuto. Prima era il testo, dipinto con il primo paint; ora è la schermata della hero, che il verdetto G4 indicava come la prova più forte della pagina.
  - Resta sotto l'obiettivo di 2,0 s in ogni profilo misurato sul dispositivo di riferimento.
  - Sui profili 4G reali: 0,33–0,38 s con il 4G veloce, 0,92–1,10 s con il 4G lento (§3.3).

### 2.2 Pesi e richieste (trasferiti, al caricamento, senza scroll)

| Pagina | Documento | JS | Font | Immagini | Totale | Richieste | Limiti del budget §3 |
|---|---|---|---|---|---|---|---|
| `/siii/` mobile (T2) | 21,3 KB | 4,9 KB | 71,1 KB, 2 file | **34,0 KB**, 1 file | **132,1 KB** | 8 | documento 35, JS 12, font 75, immagini 150, totale 300 KB; 18 richieste |
| `/siii/` desktop | 21,3 KB | 4,9 KB | 71,1 KB | 18,4 KB | 116,5 KB | 8 | idem |
| `/siii/`, controllo | 20,5 KB | 4,9 KB | 71,1 KB | 0 | 97,3 KB | 7 | — |
| `/` mobile (T1), simulato | 22,7 KB | 2,4 KB | 71,1 KB | 19,5 KB | 116,4 KB | 7 | documento 40, JS 10, immagini 150, totale 300 KB; 15 richieste |
| `/` mobile, applicato | 22,7 KB | 2,4 KB | 71,1 KB | 38,6 KB, 2 file | 135,5 KB | 8 | idem |

- Tutto dentro il budget, con zero terze parti.
- **Home con rete lenta.** Chromium scarica in anticipo anche la schermata `lazy` del capitolo 01 (19,1 KB), perché su rete lenta la distanza di caricamento anticipato cresce. È lo stesso comportamento già visto per il ritratto di Contatti (rimisura del 2026-09-28, §3.3).

### 2.3 Immagine LCP: variante scaricata e peso (`budget.md` §4)

| Dispositivo (viewport, densità) | Pixel necessari | Variante | AVIF | WebP di ripiego |
|---|---|---|---|---|
| 320 a 2x, 375 a 2x, 412 a 1,75x (Lighthouse) | 560–670 | 768w | **33,6 KB** | 43,7 KB |
| 360 a 3x, 390 a 3x, 412 a 2,625x; da 480 a 820 px a 2x | 832–1050 | 1080w | **51,4 KB** | 66,8 KB |
| 430 a 3x | 1161 | 1200w | **58,3 KB** | 75,0 KB |
| Desktop a 1x (da 1024 a 2560 px) | 382–416 | 480w | 18,0 KB | 22,9 KB |
| Desktop a 2x | 832 | 1080w | 51,4 KB | 66,8 KB |

- **Budget dell'immagine LCP rispettato:** fino a 58,3 KB su ogni telefono (limite 60 KB), fino a 51,4 KB su desktop (limite 150 KB). I telefoni a 3x scaricano la 1080w o la 1200w, non la 768w: anche quelle stanno sotto i 60 KB.
- **Fasi dell'LCP con throttling applicato** (Moto G, 6 corse):
  - TTFB: 5–7 ms;
  - attesa prima della richiesta: 649–673 ms;
  - download: 966–1008 ms;
  - rendering: 37–70 ms.
- **La richiesta parte presto.** Comincia a 654–679 ms, prima che finisca il download del documento (679–684 ms): il preload scanner trova l'immagine. L'attesa è quasi tutta latenza emulata e arrivo dell'HTML. Un `<link rel="preload">` farebbe guadagnare al massimo qualche decina di ms: non serve (`architettura.md` §3.2).
- **Nessun ritardo di rendering.** La porta riceve subito `is-inview`, quindi non parte chiusa (§4).

### 2.4 Controlli statici (`budget.md` §6.3)

| # | Esito |
|---|---|
| 1 | Superato: un solo `fetchpriority="high"`, sulla porta di `/siii/`, senza `lazy`. Le altre pagine ne hanno 0 |
| 2–7 | Superati. Il n. 7 dà `1 1` in 8 pagine su 8 |
| 8 | **Non superato**: primo esempio di `/siii/`, osservazione 1 |

Il comando del n. 8 segnalava anche gli originali delle foto, che Astro copia in `_astro/` senza che nessuna pagina li richiami. L'ho affinato: ora controlla solo i file che le pagine fanno scaricare, cioè i candidati di `srcset` e le `<img>` fuori da `<picture>` (`budget.md` §6.3).

## 3. `priority` e `sizes` (domanda 2)

### 3.1 La porta è l'elemento LCP ovunque

| Viewport | Inizio della porta (y) | Area visibile al caricamento | Elemento LCP |
|---|---|---|---|
| 320×640 a 2x | 569 | 19 880 px² (71 px di altezza) | porta |
| 390×844 a 3x | 550 | 102 900 px² | porta |
| 412×823 a 1,75x | 556 | 99 057 px² | porta |
| 768×1024 a 2x | 555 | 195 104 px² | porta |
| 1024×768 e oltre | 168–189 | 229 200–288 288 px² | porta |

- La porta è l'elemento LCP in 19 viewport su 19, da 320 a 2560 px. Anche a 320×640 i suoi 71 px visibili superano in area la riga più grande dello statement (17 385 px²).
- **Se la porta non fosse in `priority`** (stessa build, una sola modifica, throttling applicato):

| Porta | LCP | Attesa prima della richiesta |
|---|---|---|
| `priority` (oggi): `eager`, `fetchpriority="high"` | **1,70 s** | 649–673 ms |
| `lazy` | 1,97 s (**+271 ms**) | 968–1018 ms: la richiesta parte dopo il layout |
| `eager` senza `fetchpriority` | 1,70 s | 651–652 ms |

- **Risposta.** `priority` va bene anche dove la porta è a metà sotto la piega: è comunque l'elemento LCP, e con `lazy` la richiesta partirebbe circa 300 ms più tardi.
  - `fetchpriority="high"` non cambia niente in laboratorio, perché il server locale va in HTTP/1.1.
  - Su HTTP/2, l'host reale, è ciò che fa partire l'immagine prima delle altre risorse: va tenuto.
- **Reveal:** in 8 caricamenti (4 viewport, Home e `/siii/`) la porta riceve subito `is-inview` e nessun elemento della prima viewport è nascosto in nessun fotogramma. Nessun ritardo di rendering.

### 3.2 `sizes`

Larghezza dichiarata da `sizes` rispetto a quella resa, a 19 viewport (regola dell'`architettura.md` §3.3: mai per difetto, al massimo +10% per eccesso):

| Immagine | `sizes` | Scarto |
|---|---|---|
| Porta della hero di `/siii/` | `(min-width: 30rem) 26rem, 90vw` | 0% da 375 a 2560 px; +3% a 320 px; +9% a 1024 px (la colonna è 382 px, non 416) |
| Esempio 1 di `/siii/` | `(min-width: 100rem) 1488px, 93vw` | da 0 a +6% |
| Esempi 2 e 3 di `/siii/` | `(min-width: 100rem) 983px, (min-width: 64em) 62vw, 92vw` | da 0 a +5% |
| Home, capitolo 01 | idem | da 0 a +5% |

- **Tutti corretti.**
- **Fuori da questo commit:** il ritratto del fondatore sulla Home (`(min-width: 64rem) 400px, 70vw`) sovrastima del 33–56% tra 768 e 1024 px. È l'osservazione 7 della review di Fase 5, ancora aperta.

### 3.3 Profili di rete (Playwright, mediane di 3 caricamenti)

| Profilo | Viewport | LCP oggi (immagine) | LCP controllo (testo) | Immagine scaricata |
|---|---|---|---|---|
| Laboratorio di Lighthouse | 412 a 1,75x | 1792 ms | 968 ms | 768w, 33,6 KB |
| Laboratorio di Lighthouse | 390 a 3x | 1968 ms | 984 ms | 1080w, 51,4 KB |
| 4G veloce | 412 a 1,75x | 328 ms | 240 ms | 768w |
| 4G veloce | 390 a 3x | 380 ms | 236 ms | 1080w |
| 4G lento | 412 a 1,75x | 920 ms | 592 ms | 768w |
| 4G lento | 390 a 3x | 1100 ms | 568 ms | 1080w |

## 4. CLS

- **Al caricamento:** 0 in tutte le 68 corse di Lighthouse. Il box della porta è fissato dall'`aspect-ratio`, e l'immagine ha `width` e `height`.
- **Durante la lettura:** 0 su `/siii/` e sulla Home, a 320, 390, 412, 768 e 1440 px, sia nella nuova build sia nel controllo. Nessun cambio d'altezza dei passage.

## 5. Osservazioni

### 1. [BLOCCANTE] Controllo n. 8: il primo esempio di `/siii/` supera i limiti nei formati di ripiego

- **Dove.** `src/pages/siii.astro`, esempi; immagine `siii-masseria-santella-desktop-ingresso.jpg`, 2000×1250.
- **Problema.**
  - Varianti oltre i limiti del controllo n. 8 (`budget.md` §6.3):
    - WebP a 1920 px: **284,3 KB** (limite 200 KB);
    - JPEG a 1920 px: **313,2 KB** (limite 300 KB).
  - In AVIF la stessa variante pesa 173,7 KB, oltre i 150 KB del §4 per una foto a tutta larghezza a 1920 px.
  - È una vista «piccolo pianeta» con molti dettagli (alberi), più pesante di una foto a parità di qualità.
  - La scaricano gli schermi desktop larghi o a 2x. WebP e JPEG solo i browser senza AVIF.
- **Motivazione.** Il controllo n. 8 è bloccante per il go-live. Le altre due schermate degli esempi stanno nei limiti: WebP fino a 170,6 KB, JPEG fino a 211,2 KB.
- **Proposta.** Fermare a 1440 px solo il primo esempio. Provata con una build: il controllo n. 8 risulta pulito, e il nuovo massimo è AVIF 116,9 KB, WebP 192,6 KB, JPEG 200,9 KB.

```astro
<!-- src/pages/siii.astro, examples: add this prop to the existing <Media> -->
widths={i === 0 ? [480, 768, 1080, 1440] : undefined}
```

- **Effetto collaterale, da guardare con ui-designer.**
  - Su un desktop a 2x la schermata (1339 px resi) riceve la 1440w: 1,08x invece di 1,43x, quindi un po' meno nitida sugli schermi retina larghi.
  - Gli schermi da 1600 px in su a 1x ricevono la 1440w per 1488 px resi: un ingrandimento del 3%, invisibile.
- **Obiettivo mancato, con motivazione.** A 1080 px la variante AVIF pesa 76,7 KB, contro i 70 KB del §4. La lascio così: l'immagine è sotto la piega e in `lazy`, non tocca LCP né peso iniziale, e il dettaglio della vista la rende più pesante di una foto.

### 2. [IMPORTANTE] L'immagine LCP allunga la finestra del carattere di ripiego (ADR 005)

- **Dove.** `/siii/`, hero: la porta in `priority` e il preload di Schibsted Grotesk (`BaseLayout.astro`).
- **Problema.**
  - Immagine e font arrivano insieme e si dividono la banda, quindi il font in preload arriva più tardi. Il titolo resta nel carattere di ripiego più a lungo.
  - Mediane di 3 caricamenti, dal primo paint all'arrivo del font:

| Profilo | Oggi, 412 a 1,75x / 390 a 3x | Controllo, senza immagine | Differenza |
|---|---|---|---|
| Laboratorio di Lighthouse | 967 / 937 ms | 664 / 686 ms | **+251–303 ms** |
| 4G lento | 478 / 530 ms | 230 / 262 ms | **+248–268 ms** |
| 4G veloce | 63 / 26 ms | 29 / 25 ms | +1–34 ms |

- **Motivazione.** L'ADR 005 tiene il preload proprio per ridurre questa finestra (identità, titolo da 52 a 115 px).
  - Sul 4G veloce e con la fibra l'effetto è trascurabile.
  - Sulle reti lente la finestra raddoppia, pur restando sotto la mezza secondo sul 4G lento.
  - Nessuna soglia del budget è toccata.
- **Proposta.**
  - Decide il creative-director. La mia raccomandazione è accettarlo: l'LCP è una Core Web Vital con soglie, la finestra del ripiego è una scelta estetica.
  - Togliere `fetchpriority` all'immagine non è una leva verificata. In laboratorio, su HTTP/1.1, non cambia l'LCP (§3.1); la finestra del ripiego per quella variante non l'ho misurata, e su HTTP/2 va provata sull'host.
  - Il ritaglio 4:5 (osservazione 3) la riduce un poco: 805 contro 967 ms in laboratorio e 418 contro 478 ms sul 4G lento, a 1,75x.
  - **Sorveglianza dell'ADR 005.** Su `/siii/` l'LCP è ora l'immagine, e il preload non lo sposta più: il confronto con e senza preload resta significativo per l'LCP solo sulla Home. Su `/siii/` va registrata la finestra del ripiego. Lo aggiorno nel `budget.md` §3.

### 3. [SUGGERIMENTO, consigliato prima del lancio] Ritaglio 4:5 in build anche per la sala di oggi

- **Dove.** `src/components/ui/Media.astro` (patch del §6) e la porta di `src/pages/siii.astro`.
- **Problema.**
  - Sotto 64em la porta è 4:5, ma il browser scarica l'immagine 3:5 e `object-fit` ne taglia sopra e sotto il 25%.
  - Un quarto dei byte dell'immagine LCP non si vede.
- **Motivazione.** Misure con la patch applicata, throttling applicato e profili Playwright:

| | Oggi | Con ritaglio 4:5 |
|---|---|---|
| Moto G a 1,75x (768w) | 33,6 KB | **25,8 KB** |
| Telefoni a 3x (1080w) | 51,4 KB | **39,5 KB** |
| LCP Lighthouse, applicato | 1,70 s | **1,58 s** (−114 ms) |
| LCP, 4G lento a 1,75x | 920 ms | **760 ms** |
| Totale `/siii/` | 132,1 KB | 124,4 KB |

  - L'inquadratura a 390 px è identica a quella di oggi: confrontata sulla schermata.
  - Su desktop non cambia niente: stesse varianti, stessi hash.
- **Proposta.** Applicare la patch del §6 e passare il prop alla porta:

```astro
<Media image={siiiHeroScreen.image} alt={siiiHeroScreen.alt} sizes="(min-width: 30rem) 26rem, 90vw" priority
  mobileCrop={{ ratio: 4 / 5, widths: [480, 640, 768, 1080] }} class="siii-hero__media" />
```

### 4. [SUGGERIMENTO] Inquadratura mobile della porta

- **Dove.** Porta della hero sotto 64em: oggi con `object-fit`, oppure con la patch.
- **Problema.** Nel formato 4:5 il ritaglio centrale taglia la parte alta della schermata: il logo circolare di Masseria Santella a metà e il menu in alto a destra.
- **Motivazione.** È una scelta visiva. Non tocca la performance.
- **Proposta.** Se il creative-director vuole conservare la parte alta, si sceglie la posizione del ritaglio:
  - con la patch: `mobileCrop={{ …, position: 'top' }}`;
  - senza la patch: `position="50% 0%"`.
  - Il peso resta lo stesso.

## 6. La facciata della reception dentro il budget (domanda 3)

### 6.1 Opzioni misurate (AVIF, KB; sharp con i parametri di Astro)

| Facciata | 640 px | 768 px | 828 px | 1080 px | 1200 px |
|---|---|---|---|---|---|
| 3:5 intera, q50 (come la sala oggi) | 53,4 | 69,7 | 77,9 | 111,4 | 132,5 |
| 3:5, q45 | 44,4 | 57,8 | 64,8 | 92,4 | 108,8 |
| 3:5, q40 | 34,2 | 44,4 | 49,3 | 70,8 | 83,5 |
| **Ritaglio 4:5, q50** | 43,7 | **57,8** | 64,5 | 93,0 | 108,8 |
| Ritaglio 4:5, q45 | 36,2 | 47,9 | 53,5 | 77,9 | 90,5 |

- **La qualità da sola non basta.** I telefoni a 3x chiedono 1050–1160 px: anche a q40 la variante da 1080 pesa 70,8 KB.
- **Il sottocampionamento del colore 4:2:0 non conviene:** guadagna appena il 2–4% (misurato).
- **La strada è l'art direction:**
  - sotto 64em, un ritaglio 4:5 fatto in build, con larghezze fino a 768 px: 57,8 KB su ogni telefono, densità 3x compresa (768w per 351 px resi, cioè 2,2x);
  - sopra, l'immagine 3:5 intera con larghezze fino a 1080 px: 34,3 KB a 1x e 111,4 KB a 2x, entro i 150 KB desktop;
  - qualità invariata, q50.
- **Perché fermarsi a 1080 su desktop.** La variante WebP da 1200 px pesa 201,3 KB e non supererebbe il controllo n. 8; a 1080 px il massimo è 174,4 KB.

### 6.2 Misure della facciata con la patch (build reale)

| | Sala oggi | Facciata, ritaglio 4:5 |
|---|---|---|
| Immagine LCP, mobile | 33,6 KB (1,75x) / 51,4 KB (3x) | **57,8 KB** su ogni telefono |
| LCP Lighthouse, simulato / applicato | 1,80 / 1,70 s | **1,95 / 1,99 s** |
| LCP Playwright, 4G veloce (1,75x / 3x) | 328 / 380 ms | 368 / 352 ms |
| LCP Playwright, 4G lento (1,75x / 3x) | 920 / 1100 ms | 1084 / 1096 ms |
| Ripiego del font, laboratorio / 4G lento (1,75x) | 967 / 478 ms | 919 / 470 ms |
| Totale `/siii/`, richieste | 132,1 KB, 8 | 156,3 KB, 8 |
| Controllo n. 8, con larghezze desktop fino a 1080 | — | superato (WebP al massimo 174,4 KB, JPEG 272,7 KB) |

- **Dal lato performance si può fare:** tutti i limiti del budget sono rispettati.
- **Costo rispetto alla sala:** circa +0,3 s di LCP nel profilo di laboratorio. L'obiettivo di 2,0 s resta rispettato, ma senza margine (1,99 s applicato). Sulle reti 4G reali la differenza è di 0–160 ms.
- **Ripiego del WebP** (browser senza AVIF, per esempio iOS precedente al 16.4): 92,2 KB a 768 px.
- **Testo alternativo:** se si sceglie la facciata, lo riscrive copywriter-content.
- **Le altre viste mobili, ritagliate 4:5 a 768 px:**
  - «appartamento» di Masseria Santella: 30,8 KB;
  - Maison Miminà, interno: 53,2 KB;
  - D.L. Natura Dentro, ingresso: 65,2 KB, quindi servirebbero larghezze fino a 640 px (50,1 KB).

### 6.3 La patch di `Media.astro`

Aggiunge un prop facoltativo, `mobileCrop`.
- Con `mobileCrop`, Media scrive un `<picture>` in cui le sorgenti sotto 64em sono ritagliate da sharp in build (fit cover), con larghezze proprie; sopra resta l'immagine intera.
- Senza `mobileCrop`, il codice è quello di oggi.

Prove:
- build con la sola patch: HTML delle 8 pagine identico byte per byte a quello attuale, stesso elenco di file;
- `astro check`: 0 errori, 0 warning, gli stessi 2 hint di prima;
- `git apply --check` superato anche su `133e9a5`.

La patch completa è in `scratchpad/siii-lcp/media-mobilecrop.patch`. Il testo:

```diff
--- a/src/components/ui/Media.astro
+++ b/src/components/ui/Media.astro
@@ -8,7 +8,7 @@
  * Rectangles are space: radius 0, no shadows (§1.2).
  */
 import type { ImageMetadata } from 'astro';
-import { Picture } from 'astro:assets';
+import { Picture, getImage } from 'astro:assets';
 import SlotPending from './SlotPending.astro';
 import { assetSlots, SLOT_MODE, type AssetSlotId } from '../../data/asset-slots';
 import { formatCoords } from '../../lib/geo';
@@ -27,6 +27,12 @@ interface Props {
   /** Publish variant only: false drops name and place where the text around does not say them
       (they would be visible but hidden from assistive technology, WCAG 1.3.1). */
   pendingText?: boolean;
+  /**
+   * Art direction below 64em: the same image cropped to another ratio at build time (e.g. 4 / 5
+   * for a 3:5 door shown 4:5 on phones), with its own widths. Phones then download only the
+   * pixels they show, not a taller image that object-fit crops (docs/performance/budget.md §4).
+   */
+  mobileCrop?: { ratio: number; widths?: number[]; position?: string };
   class?: string;
 }
 
@@ -40,6 +46,7 @@ const {
   priority = false,
   position = '50% 50%',
   pendingText = true,
+  mobileCrop,
   class: className,
 } = Astro.props;
 
@@ -51,10 +58,51 @@ const aspect = ratio ?? (image ? `${image.width} / ${image.height}` : (slot?.rat
 const usableWidths = image
   ? [...new Set([...widths.filter((w) => w < image.width), Math.min(image.width, Math.max(...widths))])]
   : [];
+
+// Art direction (mobileCrop): mobile sources cropped by sharp (fit cover), then the full image.
+const MOBILE_MEDIA = '(max-width: 63.99em)';
+const art =
+  image && mobileCrop
+    ? await (async () => {
+        const mWidths = [...new Set((mobileCrop.widths ?? [480, 640, 768]).filter((w) => w <= image.width))];
+        const mWidth = Math.max(...mWidths);
+        const mHeight = Math.round(mWidth / mobileCrop.ratio);
+        const crop = { src: image, width: mWidth, height: mHeight, widths: mWidths, fit: 'cover' as const, position: mobileCrop.position ?? 'centre' };
+        const full = { src: image, widths: usableWidths };
+        const [mAvif, mWebp, avif, webp, jpg] = await Promise.all([
+          getImage({ ...crop, format: 'avif' }),
+          getImage({ ...crop, format: 'webp' }),
+          getImage({ ...full, format: 'avif' }),
+          getImage({ ...full, format: 'webp' }),
+          getImage({ ...full, format: 'jpg' }),
+        ]);
+        return { mAvif, mWebp, avif, webp, jpg, mWidth, mHeight };
+      })()
+    : undefined;
 ---
 
 {
-  image ? (
+  image && art ? (
+    <picture class="media-picture" style={`--media-ratio: ${aspect}`}>
+      <source media={MOBILE_MEDIA} type="image/avif" srcset={art.mAvif.srcSet.attribute} sizes={sizes} width={art.mWidth} height={art.mHeight} />
+      <source media={MOBILE_MEDIA} type="image/webp" srcset={art.mWebp.srcSet.attribute} sizes={sizes} width={art.mWidth} height={art.mHeight} />
+      <source type="image/avif" srcset={art.avif.srcSet.attribute} sizes={sizes} />
+      <source type="image/webp" srcset={art.webp.srcSet.attribute} sizes={sizes} />
+      <img
+        src={art.jpg.src}
+        srcset={art.jpg.srcSet.attribute}
+        sizes={sizes}
+        alt={alt}
+        loading={priority ? 'eager' : 'lazy'}
+        fetchpriority={priority ? 'high' : 'auto'}
+        decoding={priority ? 'sync' : 'async'}
+        style={`object-position: ${position}`}
+        width={image.width}
+        height={image.height}
+        class:list={['media', className]}
+      />
+    </picture>
+  ) : image ? (
     <Picture
       src={image}
       alt={alt}
```

**Uso per la facciata**, se il creative-director la sceglie. In `src/data/media.ts`, `siiiHeroScreen.image` diventa l'import di `siii-masseria-santella-mobile-reception.jpg`, con un nuovo alt. Poi, nella porta:

```astro
<Media image={siiiHeroScreen.image} alt={siiiHeroScreen.alt} sizes="(min-width: 30rem) 26rem, 90vw" priority
  widths={[480, 768, 1080]} mobileCrop={{ ratio: 4 / 5, widths: [480, 640, 768] }} class="siii-hero__media" />
```

## 7. Rimisura dopo `bae201c` (2026-10-07, pomeriggio)

**Cosa è cambiato.**
- `d3eba9c`: primo esempio fino a 1440 px (osservazione 1).
- `bae201c`, dal verdetto del creative-director:
  - la patch `mobileCrop` del §6, senza modifiche;
  - nella porta, ritaglio 4:5 ancorato in basso, con larghezze 480–1080;
  - tolti i nodi decorativi del capitolo 01 della Home e della hero;
  - tolta la carta della Terra di Bari.
- `f28649a` aggiunge soltanto `position="50% 100%"` alla porta, cioè l'`object-position` del JPEG di ripiego: nessun effetto su risorse o LCP.

**Condizioni.**
- Build `dist/` del 2026-10-07 alle 11:20 (`bae201c`), servita da `scripts/serve.mjs`.
- Confronto con `d06a3e9` ricostruito in un worktree: l'HTML di `/siii/` è identico per dimensione a quello del mattino (147.593 byte).
- 40 corse Lighthouse alternate (11:25–11:36 UTC, `benchmarkIndex` 1612–2623, carico 0,7–3,4) e Playwright con 5 caricamenti per variante e profilo.

### 7.1 LCP di `/siii/` (domanda 1)

| Metodo | `bae201c` | `d06a3e9` | Differenza |
|---|---|---|---|
| Mobile, simulato (5 corse) | 1,27 / **1,80 s** | 1,27 / 1,80 s | stesso gradino del modello |
| Mobile, applicato (6 corse) | 1,06 / **1,61 s** (1,60–1,65) | 1,07 / 1,73 s (1,69–1,85) | **−111 ms** |
| Desktop, simulato (3 corse) | 0,32 / 0,40 s | 0,32 / 0,40 s | pari (sorgenti desktop invariate) |
| Playwright, 4G lento, 412 a 1,75x | 796 ms | 936 ms | −140 ms |
| Playwright, 4G lento, 390 a 3x | 1108 ms | 1140 ms | −32 ms |
| Playwright, 4G veloce, 412 a 1,75x / 390 a 3x | 328 / 404 ms | 344 / 384 ms | nel rumore |

- **Pesi:** 125,4 KB, 8 richieste, di cui 27,2 KB per la porta (prima 132,1 KB e 34,0 KB). CLS 0, punteggio 99–100.
- **Varianti scaricate:** a 320 px 640w (21,4 KB), al Moto G 768w (26,8 KB), a 3x 1080w (40,7 KB, prima 51,4 o 58,3). Da 1024 px restano le sorgenti desktop. La porta è l'elemento LCP a tutte le viewport provate.
- **Fasi dell'LCP con throttling applicato:**
  - inizio della richiesta: da 25 ms prima a 5 ms dopo la fine del documento;
  - download: 885–892 ms invece di 966–997;
  - rendering: 41–71 ms.
- **Correzione alla riga del budget.** Ho riformulato la riga del `budget.md` §2 sull'inizio della richiesta con una tolleranza di 50 ms. La formula «prima della fine del documento» era troppo rigida: anche `d06a3e9` arriva una volta a +44 ms, mentre con `lazy` si è a circa +300 ms.
- **Controlli statici:** superati tutti, n. 8 compreso (`bae201c`).

### 7.2 Finestra del carattere di ripiego sul 4G lento (domanda 2, soglia di 600 ms dell'ADR 005 1.3)

| Viewport | `bae201c`: mediana e caricamenti | `d06a3e9`: mediana e caricamenti |
|---|---|---|
| 412 a 1,75x | **449 ms** [340, 441, 449, 470, 506] | 447 ms [534, 431, 439, 447, 541] |
| 390 a 3x | **483 ms** [484, 457, 483, 427, 669] | 520 ms [415, 579, 416, 520, 586] |

- **In laboratorio è sotto la soglia di 600 ms**, con 117–151 ms di margine sulla mediana.
- Un caricamento a 3x è arrivato a 669 ms. La soglia va letta sulla mediana; i casi singoli vanno annotati.
- Il ritaglio non accorcia la finestra a 1,75x (449 contro 447 ms), e a 3x la riduce di 37 ms. Il suo guadagno è sull'LCP, non sul font.
- **Limite.** L'ADR fissa la soglia sull'host reale in HTTP/2; qui il server va in HTTP/1.1. Per la prova sull'host c'è uno script portabile: provato in locale, dà 432 ms a 1,75x e 441 ms a 3x. Va eseguito da una postazione che raggiunge l'anteprima:

```js
// siii-fallback.mjs — fallback-font window and LCP of /siii/ on «4G lento» (ADR 005 1.3, threshold 600 ms).
// Setup, once:  npm init -y && npm i playwright@1.56.1 && npx playwright install chromium
// Usage:        node siii-fallback.mjs https://itnode-sito-production.up.railway.app/siii/ 5
import { chromium } from 'playwright';

const [url, loadsArg = '5'] = process.argv.slice(2);
if (!url) throw new Error('usage: node siii-fallback.mjs <url of /siii/> [loads]');
const PROFILE = { latency: 150, down: 1600, cpu: 4 }; // 4G lento: 150 ms, 1.6 Mbit/s, CPU 4x
const DEVICES = {
  '412x823 1,75x': { viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true },
  '390x844 3x': { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor((s.length - 1) / 2)]; };
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
for (const [name, device] of Object.entries(DEVICES)) {
  const rows = [];
  for (let i = 0; i < Number(loadsArg); i++) {
    const ctx = await browser.newContext(device);
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: PROFILE.cpu });
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: PROFILE.latency, downloadThroughput: (PROFILE.down * 1024) / 8, uploadThroughput: (675 * 1024) / 8 });
    await page.addInitScript(() => {
      window.__lcp = 0; window.__font = null;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      document.fonts.addEventListener('loadingdone', (ev) => { if (!window.__font && ev.fontfaces.some((f) => f.family.startsWith('Schibsted'))) window.__font = performance.now(); });
    });
    await page.goto(url, { waitUntil: 'load', timeout: 90000 });
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => ({ fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0, lcp: window.__lcp, font: window.__font }));
    rows.push({ ...r, window: r.font === null ? NaN : Math.max(0, r.font - r.fcp) });
    await ctx.close();
  }
  const w = rows.map((r) => Math.round(r.window));
  console.log(`${name}: ripiego visibile mediana ${median(w)} ms [${w.join(', ')}] · LCP mediana ${Math.round(median(rows.map((r) => r.lcp)))} ms · soglia 600 ms: ${median(w) > 600 ? 'SUPERATA' : 'rispettata'}`);
}
await browser.close();
```

### 7.3 Riga di controllo sulla Home (domanda 3)

| Metodo | `bae201c` | `d06a3e9` |
|---|---|---|
| Simulato (3 corse): FCP / LCP | 1,17 / 1,65 s | 1,17 / 1,58 s |
| Applicato (3 corse): FCP = LCP | 1,04 s | 1,00 s |
| Peso, richieste | 117,2 KB, 7 (applicato: 136,3 KB, 8) | 116,4 KB, 7 (applicato: 135,5 KB, 8) |

- **L'LCP resta la riga dell'H1.**
- **Scarti nel rumore:** un gradino del modello nel simulato e +4% con 3 corse applicate, sotto la regola del +10%.
- Il documento pesa 0,8 KB in più per il capitolo 02 con la Puglia intera (P4): la carta della Terra di Bari tolta pesava meno di quella nuova.

### 7.4 Verdetto della rimisura

**Conforme.**
- Il ritaglio in build fa quello che prometteva: −111 ms di LCP con throttling applicato e −6,8 KB di immagine al Moto G, senza effetti sul desktop.
- Budget rispettato e controlli statici superati.
- La finestra del ripiego sul 4G lento è sotto i 600 ms in laboratorio. Resta da provarla sull'host reale in HTTP/2, con lo script del §7.2.

## Verdetto di dominio

**Aggiornamento del 2026-10-07, dopo `bae201c`.** La correzione bloccante è applicata (`d3eba9c`), e così il ritaglio in build (osservazione 3). Il verdetto diventa **conforme senza condizioni di performance**, salvo la prova della finestra del ripiego sull'host (§7.2). Il testo che segue è il verdetto del mattino.

**Conforme, con una correzione bloccante.**
- `/siii/` con la schermata come immagine LCP rispetta tempi, pesi, richieste e CLS del template T2 e il budget dell'immagine LCP, su ogni dispositivo.
- `priority` e `sizes` sono corretti. La Home non cambia.
- **Prima del go-live:** il primo esempio di `/siii/` va fermato a 1440 px (osservazione 1), altrimenti il controllo n. 8 resta rosso.
- **Consigliato:** il ritaglio 4:5 della porta su mobile (osservazione 3).
- **La facciata è approvabile dal lato performance solo con l'art direction (§6).** Avrebbe un LCP al limite dell'obiettivo nel profilo di laboratorio.
- **L'effetto sul font in preload** (osservazione 2) è una decisione d'identità del creative-director.

## Ipotesi da validare

- [IPOTESI: su HTTP/2, all'host reale, `fetchpriority="high"` anticipa l'immagine rispetto a font e script più di quanto si veda in HTTP/1.1. L'effetto sulla finestra del ripiego (osservazione 2) potrebbe quindi essere un po' maggiore. Si verifica sull'anteprima con PageSpeed Insights o WebPageTest (`budget.md` §6.8).]
- [IPOTESI: la quota di visite da browser senza AVIF (Safari precedente al 16.4) è piccola. Ricevono il WebP: 43,7–75,0 KB per la porta di oggi, 92,2 KB per la facciata ritagliata.]
- [DA VERIFICARE: nitidezza del primo esempio a 1440w su schermi retina (osservazione 1), con ui-designer.]

## Domande aperte

1. **Chiusa** (verdetto del creative-director del 2026-10-07): porta con la sala, ritaglio 4:5 ancorato in basso.
2. **Per l'utente o il cliente:** dall'Italia, PageSpeed Insights (pagespeed.web.dev) sull'anteprima aperta, per `/siii/` e la Home. Da qui l'API risponde 429 e l'host è irraggiungibile.
3. **Per l'utente o la sessione principale:** chi esegue lo script del §7.2 sull'anteprima, da una postazione che la raggiunge, per la soglia di 600 ms dell'ADR 005 1.3?

## Decisioni richieste

**Aggiornamento del 2026-10-07, dopo `bae201c`:**
- tutte le voci qui sotto sono chiuse:
  - osservazione 1 applicata in `d3eba9c`;
  - patch e ritaglio applicati in `bae201c`;
  - decisioni del creative-director prese: sala, finestra del ripiego accettata con soglia di 600 ms (ADR 005 1.3), ritaglio in basso.
- Resta da decidere chi fa la prova sull'host (domanda 3).

Registro del mattino:

- **Sessione principale:**
  - applicare l'osservazione 1, bloccante: una riga in `siii.astro`;
  - se approvate, applicare la patch del §6 con il ritaglio per la porta (osservazione 3, o la facciata);
  - poi ricostruire `dist/`. Io rimisuro brevemente `/siii/`.
- **creative-director:**
  - sala o facciata;
  - accettare o no la finestra del ripiego più lunga sulle reti lente (osservazione 2);
  - inquadratura mobile (osservazione 4).
- **ui-designer:** nitidezza del primo esempio a 1440w su retina (osservazione 1).
- **copywriter-content:** il testo alternativo della facciata, se viene scelta.
