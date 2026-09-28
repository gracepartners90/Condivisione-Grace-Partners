---
titolo: Review di performance del sito costruito (Fase 5)
owner: web-performance-specialist
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/performance/budget.md, docs/performance/architettura.md, docs/decisioni/001-stack-tecnologico.md, dist/ (build del 2026-09-28 alle 10:32, commit a6de19d), misure Lighthouse 13.5.0 e Playwright 1.56.1 del 2026-09-28]
---

# Review di performance del sito costruito

**Oggetto.** Il sito in `dist/` (8 URL), confrontato con `docs/performance/budget.md` e `docs/performance/architettura.md`. È una review: non ho modificato codice né file di altri membri.

**In breve**
- **Pesi, richieste, JavaScript, terze parti, font e controlli statici: tutto dentro il budget** su tutti i template. Ogni pagina pesa 82–113 KB e fa 6–8 richieste, con zero terze parti.
- **Tempi con throttling simulato:** LCP 1,51–1,73 s, TBT 0, CLS ≤ 0,002 e punteggio 100 su tutte le pagine.
- **Un bloccante, su `/siii/`.** Lo statement della hero parte nascosto dal reveal a righe. Con throttling applicato l'LCP arriva 0,94 s dopo l'FCP, contro un limite di 0,2 s. Il throttling simulato non lo vede.
- **INP stimato.** Caso peggiore 128 ms, alla prima apertura del menu: sotto il limite di 200 ms. L'obiettivo di 100 ms è mancato solo alla prima apertura e alla prima chiusura del menu (104 ms).
- **Video: resta il rischio principale del go-live.** Il file è su Railway e da qui non è verificabile (il proxy risponde 403).

## 1. Condizioni di test

- **Build:** `dist/` del 2026-09-28 alle 10:32, commit `a6de19d`. Nessun file di `src/` risulta più recente della build.
- **Server:** server di misura del `budget.md` §6.6 (copia nella scratchpad: `scripts/perf/` non esiste ancora nel repository, vedi osservazione 4).
  - Brotli q11 calcolato a ogni richiesta, `immutable` su `/_astro/*`, HTTP/1.1, 127.0.0.1:8080.
  - Non ho usato `astro preview`: non comprime e manda `no-cache`.
- **Lighthouse 13.5.0**, la versione del budget, con Chromium 141 headless e il preset mobile predefinito: Moto G Power 412×823, DPR 1,75, RTT 150 ms, 1,6 Mbit/s, CPU 4x.
  - Throttling simulato: 5 esecuzioni per home, `/siii/` e `/citta-digitali/`; 3 per le altre pagine.
  - Throttling applicato (`devtools`): 3 esecuzioni per home, `/siii/` e `/citta-digitali/`.
  - `benchmarkIndex` tra 1844 e 2727.
- **Playwright 1.56.1** con CPU 4x per l'INP (metodo del `budget.md` §6.4) e per la traccia dello scroll.
- **Limiti noti.**
  - Il TTFB di laboratorio (57–205 ms) comprende la compressione Brotli q11 fatta a ogni richiesta: in produzione sarà diverso.
  - Il video non si carica: `itnode-website-production.up.railway.app` risponde `403` dal proxy dell'ambiente (verificato il 2026-09-28).
  - **Correzione rispetto al budget §6.1:** l'ambiente ha Liberation Sans, che la faccia di ripiego `local('Liberation Sans')` intercetta. Il CLS dello swap misurato qui quindi **non** è sovrastimato: è rappresentativo di un ripiego con metriche di Arial.
- **Confronto con l'esito della sessione principale.** La sessione principale ha usato Lighthouse 12.8.2 su `astro preview`, senza compressione: i numeri sono coerenti (LCP simulato 1,7 s), ma non confrontabili con il budget.

## 2. Baseline di laboratorio del sito costruito

Queste misure sostituiscono il prototipo (`budget.md` §7) come riferimento per le regressioni: vale la regola del +10% del `budget.md` §8.

### 2.1 Tempi con throttling simulato (mediane)

| URL | Esecuzioni | FCP | LCP | TBT | CLS | Speed Index | Punteggio | Elemento LCP |
|---|---|---|---|---|---|---|---|---|
| `/` | 5 | 1,19 s | 1,73 s | 0 | 0 | 1,19 s | 100 | riga dell'H1 «La tecnologia cambia.» |
| `/siii/` | 5 | 1,29 s | 1,66 s | 0 | 0,002 | 1,29 s | 100 | statement «Non raccontare la tua azienda.» |
| `/puglia-digitale/` | 3 | 1,26 s | 1,73 s | 0 | 0 | 1,26 s | 100 | descrittore dell'H1 |
| `/citta-digitali/` | 5 | 1,26 s | 1,67 s | 0 | 0 | 1,26 s | 100 | sottotitolo della hero |
| `/contatti/` | 3 | 1,15 s | 1,51 s | 0 | 0 | 1,15 s | 100 | H1 |
| `/privacy-policy/` | 3 | 0,99 s | 1,51 s | 0 | 0 | 0,99 s | 100 | paragrafo |
| `/cookie-policy/` | 3 | 0,98 s | 1,51 s | 0 | 0 | 0,98 s | 100 | paragrafo |
| `/404.html` | 3 | 0,99 s | 1,51 s | 0 | 0 | 0,99 s | 100 | paragrafo |

- **Budget §2:** limiti e obiettivi rispettati ovunque (LCP ≤ 2,0 s, FCP ≤ 1,5 s, TBT ≤ 100 ms, CLS ≤ 0,05, Speed Index ≤ 2,5 s, punteggio ≥ 95).
- **Rispetto al prototipo** (FCP 0,90 s, LCP 1,35 s): +0,1–0,4 s. Le cause sono il documento reale (8,7–21,5 KB contro 1,8 KB) e il TTFB del server di misura.

### 2.2 Throttling applicato: la riga LCP − FCP del budget

| URL | FCP | LCP | LCP − FCP (mediana) | TBT | CLS | Esito (limite ≤ 200 ms) |
|---|---|---|---|---|---|---|
| `/` | 1,00 s | 1,00 s | 0 ms | 53 ms | 0 | superato |
| `/citta-digitali/` | 1,06 s | 1,06 s | 0 ms | 40 ms | 0 | superato |
| `/siii/` | 1,02 s | **1,98 s** | **935 ms** (916, 980, 935) | 64 ms | 0,002 | **non superato**: osservazione 1 |

### 2.3 Pesi e richieste (trasferiti, al caricamento, senza scroll)

| URL | Documento | di cui CSS inline (br) | JS | Font | Immagini | Totale | Richieste | Esito |
|---|---|---|---|---|---|---|---|---|
| `/` (T1) | 20,6 KB | 8,9 KB | 1,7 KB | 70,7 KB, 2 file | 19,2 KB | 112,6 KB | 7 | entro il budget |
| `/siii/` (T2) | 19,5 KB | 9,8 KB | 3,9 KB | 70,7 KB | 0 | 94,5 KB | 7 | entro il budget |
| `/puglia-digitale/` (T2) | 18,6 KB | 9,3 KB | 3,9 KB | 70,7 KB | 16,7 KB | 110,4 KB | 8 | entro il budget |
| `/citta-digitali/` (T2) | 21,5 KB | 9,5 KB | 5,1 KB | 70,7 KB | 0; video 0 byte | 97,8 KB | 8 | entro il budget |
| `/contatti/` (T3) | 13,8 KB | 6,5 KB | 3,9 KB | 70,7 KB | 0 | 88,8 KB | 7 | entro il budget |
| `/privacy-policy/` (T4) | 9,5 KB | 4,8 KB | 1,7 KB | 70,7 KB | 0 | 82,3 KB | 6 | entro il budget |
| `/cookie-policy/` (T4) | 9,2 KB | 4,8 KB | 1,7 KB | 70,7 KB | 0 | 82,0 KB | 6 | entro il budget |
| `/404.html` (T4) | 8,7 KB | 4,9 KB | 1,7 KB | 70,7 KB | 0 | 81,6 KB | 6 | entro il budget |

- **Terze parti:** 0 richieste su tutte le pagine.
- **Immagini a caricamento.** Su home e Puglia Digitale l'unica immagine scaricata è una foto `lazy`, scaricata perché rientra nella distanza di caricamento anticipato di Chromium, con priorità bassa: non è sopra la piega.
- **Il font è la voce che pesa di più:** 70,7 KB, dal 63% all'86% del peso della pagina.
- **DOM:** 354–574 elementi.
- **HTML non compresso:** 46–135 KB, di cui 23–64 KB di CSS inline. Con Brotli diventano 8–21 KB.
- **`compressHTML: false`:** gli spazi di indentazione valgono 2–8,5 KB non compressi e circa 1 KB con Brotli. È un costo trascurabile.

### 2.4 INP in laboratorio (Playwright, CPU 4x, 412×823 touch, 3 ripetizioni)

| Interazione | Durate (ms) | Peggiore | Obiettivo ≤ 100 ms | Limite ≤ 200 ms |
|---|---|---|---|---|
| Apertura del menu (`<dialog>`) | 128 · 80 · 64 | 128 | mancato alla prima apertura | superato |
| Chiusura del menu | 104 · 80 · 80 | 104 | mancato di poco | superato |
| Nodo della foto evento (home) | 80 · 40 · 40 | 80 | superato | superato |
| Interruttore «Tour 360° / SIII» | 88 · 56 · 40 e 40 · 56 · 40 | 88 | superato | superato |
| Invio del form con errori | 96 (ripetizioni non misurabili, osservazione 10) | 96 | superato | superato |
| Invio del form valido (stato «endpoint assente») | 56 | 56 | superato | superato |
| Play e audio del video (solo il gestore: il file non si carica) | 88 · 24 · 40 e 40 · 40 · 32 | 88 | superato | superato |

- **Taratura dell'ambiente:** un gestore leggero misura circa 40 ms. L'Event Timing arrotonda a 8 ms.
- **Nessun task lungo** nelle interazioni. Il costo sta nella presentazione del frame, non nei gestori: per esempio l'apertura del menu fa 2 ms di elaborazione e 109 ms di presentazione.

### 2.5 Controlli statici (`budget.md` §6.3)

| # | Controllo | Esito |
|---|---|---|
| 1 | Al massimo un `fetchpriority="high"` per pagina | superato (0: nessuna immagine LCP) |
| 2 | `width` e `height` su ogni `<img>` | superato |
| 3 | Nessuno shorthand `animation` con timeline di scroll | superato: orizzonte e marquee in longhand |
| 4 | Nessun `<iframe>` nell'HTML | superato |
| 5 | `<video>` senza `autoplay` né `poster` | superato (`preload="none"`) |
| 6 | Nessuna risorsa esterna | superato (verso l'esterno solo link) |
| 7 | Un solo preload per pagina, 2 file `.woff2` | superato |
| 8 | Nessun AVIF o WebP oltre i 200 KB, nessuna foto in `public/` | superato. `public/og/default.jpg` è l'immagine di condivisione e non viene mostrata nelle pagine: eccezione accettata. |

Anche gli SVG inline sono dentro i limiti:
- orizzonte: 1,1 KB (limite 6 KB);
- carta dell'Italia: 7,0 KB (limite 20 KB);
- carta della Puglia: meno di 1 KB.

### 2.6 Motion e scroll

- **Traccia dello scroll.** Ho fatto uno scroll touch di 3000 px in 2,2 s, con CPU 4x, su home e Città Digitali.
  - Nessun evento Layout né Paint sul main thread.
  - 27–36 ricalcoli di stile (20–24 ms in tutto), main thread occupato per il 10%, nessun task lungo.
  - Rotazione dell'orizzonte e marquee girano sul compositor, come previsto (`architettura.md` §6.5).
- **Animazioni attive a riposo.** Restano solo le due legate allo scroll (`ScrollTimeline` e `ViewTimeline`). Tutte le altre hanno 1 iterazione e poi terminano: nessuna animazione infinita.
- **Proprietà animate:** solo `transform` e `opacity`.
  - Unica eccezione: il `clip-path` del menu (250 ms, un elemento, avviato dall'utente), già accettato in `architettura.md` §12.
- **Movimento ridotto** (`reducedMotion: 'reduce'`): niente `reveal-ready`, nessuna animazione attiva, orizzonte e marquee statici. Superato.
- **Navigazione:** view transition dentro `no-preference`, speculation rules in prefetch `moderate`. Conforme ad `architettura.md` §8.

### 2.7 Immagini: `sizes` contro la resa reale

- **Formati e priorità.** Tutte le foto sono in AVIF, con WebP e JPEG di ripiego, `lazy` e con dimensioni. Nessuna è sopra la piega e nessuna è l'elemento LCP.
- **Art direction della foto evento** (`ImmersivePreview.astro`). Il ritaglio stretto sotto 43,75em e la panoramica sopra funzionano, ciascuno con `width` e `height` corretti sul `<source>`: CLS 0.

| Immagine (pagina) | Viewport | Resa | Slot secondo `sizes` | File scelto | Nota |
|---|---|---|---|---|---|
| Foto evento, ritaglio stretto (home) | 412 @1,75 | 412 px | 412 px | 448w, 19,0 KB | corretto; sorgente più piccola del necessario (721 px) |
| Foto evento, panoramica (home) | 768 @2 | 706 px | 722 px | 1272w, 49,9 KB | corretto |
| idem | 1024 @1 | 947 px | 963 px | **1272w, 49,9 KB** | lo slot supera di 3 px la variante 960w (33,9 KB): +16 KB (osservazione 7) |
| idem | 1440 @2 | 1200 px | 1200 px | 1272w | corretto; sorgente più piccola del necessario (2400 px) |
| Ritratto del fondatore (home) | 768 @2 | 344 px | **538 px** (+56%) | 480w | nessun effetto oggi: una sola variante |
| idem | 1024 @1 | 301 px | **400 px** (+33%) | 480w | idem |
| idem | 1440 @2 | 429 px | 400 px (−7%) | 480w | slot per difetto |
| Ritratto (contatti) | 1024 @1 | 220 px | **320 px** (+45%) | 420w | nessun effetto oggi |
| Evento, schermo (Puglia Digitale) | 412 @1,75 / 1440 @2 | 371 / 542 px | 412 / 518 px | 438w | entro ±11% |

## 3. Osservazioni

### 1. [BLOCCANTE] `/siii/`: lo statement della hero parte nascosto e ritarda l'LCP di 0,94 s

- **Dove.**
  - `src/pages/siii.astro:65`: `<Passage … class="siii-hero__statement" />`, con reveal a righe attivo per impostazione predefinita.
  - `src/scripts/reveal.ts`.
  - Lo stesso schema, senza effetto sull'LCP, riguarda:
    - la porta della hero SIII (`.siii-hero__door.aperture`, riga 70), sia su mobile sia su desktop;
    - l'H2 `passage` della home, su mobile (412×823).
- **Problema.**
  - `reveal.ts` aggiunge `reveal-ready` a tutti gli elementi, anche a quelli già nella prima viewport.
  - Con throttling applicato lo script gira prima del primo paint. Le righe dello statement partono quindi traslate fuori dal loro contenitore, compaiono solo quando l'IntersectionObserver risponde e la transizione le porta in vista.
  - Su mobile lo statement è l'elemento LCP della pagina.
  - Con throttling simulato il difetto non si vede (LCP − FCP simulato 373 ms, dovuto al font); senza throttling la pagina lampeggia: visibile, poi nascosta, poi animata.
- **Motivazione.**
  - `budget.md` §2: LCP − FCP con throttling applicato ≤ 200 ms. Misurato: **935 ms** (mediana di 3; singole esecuzioni 916, 980 e 935 ms). L'LCP applicato è 1,98 s, contro 1,00 s della home e 1,06 s di Città Digitali, che non hanno il difetto.
  - `architettura.md` regola 3 e §6.2: l'LCP è visibile dal primo frame; niente `data-reveal` sugli elementi visibili al caricamento.
  - Sul campo, con un FCP al 75° percentile di 1,6–1,8 s, 0,9 s in più portano l'LCP oltre la soglia di 2,5 s.
- **Proposta.** Due interventi, entrambi piccoli.
  - **(a) Correzione generale in `reveal.ts`.** Gli elementi già in vista all'avvio non vengono mai nascosti. Protegge tutte le pagine e tutte le altezze di viewport, compresi l'H2 della home su mobile e la porta SIII.

```ts
// src/scripts/reveal.ts — inside the existing `if (...)`, replacing the current body
const observer = new IntersectionObserver(/* unchanged callback and options */);
// Elements already on screen at start-up are shown as they are: never hidden, never re-animated
// (LCP visible from the first frame). Read every position first, then write: one layout, no thrashing.
const vh = window.innerHeight;
const onScreen = Array.from(elements, (el) => {
  const r = el.getBoundingClientRect();
  return r.top < vh && r.bottom > 0;
});
elements.forEach((el, i) => {
  if (onScreen[i]) el.classList.add('is-inview', 'is-revealed');
  else observer.observe(el);
});
root.classList.add('reveal-ready'); // last: hidden states apply only to below-the-fold elements
```

  - **(b) Per chiarezza, nella hero SIII:** `<Passage as="p" … class="siii-hero__statement" reveal={false} />`.
    - Se creative-director vuole comunque un ingresso, l'unico ammesso sull'elemento LCP è un movimento solo in `transform` che parte da stato visibile, entro 600 ms (`architettura.md` §6.1).
  - **Verifica dopo la correzione.** La faccio io, su richiesta.
    - 3 corse con `--throttling-method=devtools` su `/siii/` e sulla home: LCP − FCP ≤ 200 ms, atteso 0.
    - Controllo Playwright: nessun `[data-reveal]` né `.aperture` nascosto nella prima viewport, a 412×823 e a 1440×900.

### 2. [IMPORTANTE] Video di Città Digitali: il file su Railway non è verificabile

- **Dove.** `src/data/site.ts:53` (`…up.railway.app/public/video/citta-digitali.mp4?v=2`) e `src/components/sections/VideoSection.astro`.
- **Già corretto:**
  - 0 byte al caricamento (verificato: nessuna richiesta media);
  - `preload="none"`, niente `poster`, copertina tipografica a 0 byte;
  - autoplay muto solo da 64em con metà sezione visibile, mai con movimento ridotto, Save-Data o 2G;
  - pausa fuori viewport.
- **Problema.**
  - Da qui l'host risponde `403` (il proxy blocca `railway.app`). Non posso verificare dimensione, bitrate, risoluzione, codec, `+faststart`, supporto delle richieste `Range` né header di cache.
  - C'è **una sola sorgente per tutti i dispositivi.** Chi preme play su uno smartphone scarica lo stesso file del desktop, di bitrate ignoto.
  - Al primo play parte una connessione verso un'origine terza (DNS, TCP e TLS, circa 0,3–0,6 s su mobile) prima del primo fotogramma.
- **Motivazione.**
  - `budget.md` §4: H.264 ≤ 2 Mbit/s a 720p e ≤ 4 Mbit/s a 1080p, ogni file ≤ 25 MiB con `+faststart`.
  - `architettura.md` §4.3: `Range` → 206, obbligatorio per Safari su iOS.
  - ADR 001 §4.7: il video va ospitato con il sito, non a lungo termine su Railway.
  - Se il file supera i 25 MiB, su Cloudflare Workers non si pubblica.
- **Proposta.**
  - **Prima del go-live, da una rete che raggiunge Railway** (sessione principale o cliente), servono questi quattro controlli. Mi servono gli output:

```bash
URL='https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2'
curl -sI "$URL" | grep -iE 'content-length|content-type|accept-ranges|cache-control'
curl -s -o /dev/null -w '%{http_code}\n' -r 0-1023 "$URL"            # expected: 206
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=codec_name,width,height,bit_rate -of compact "$URL"
ffprobe -v trace "$URL" 2>&1 | grep -m2 -oE "type:'(moov|mdat)'"      # moov before mdat = faststart
```

  - **Soluzione di lancio consigliata:**
    - transcodifica secondo `architettura.md` §4.3: 720p per mobile, 1080p per desktop, H.264; AV1 facoltativo;
    - file in `/video/` sullo stesso dominio, dove la regola `immutable` di `public/_headers` c'è già;
    - elementi `<source media="(min-width: 64em)">` al posto dell'attributo `src`.
  - **Se al lancio resta su Railway:** i quattro controlli sopra devono passare. In più serve un `preconnect` all'intenzione, cioè al `pointerenter` o al `focus` del pulsante play; su desktop, quando la sezione è a una viewport di distanza.

### 3. [IMPORTANTE] Hosting non ancora deciso: `_headers` vale solo su Cloudflare o Netlify, e servono verifiche dopo il deploy

- **Dove.** `public/_headers`, `public/_redirects` e ADR 001 (stato «Proposta»: l'hosting lo decide l'utente).
- **Cosa va già bene in `_headers`:**
  - `immutable` su `/_astro/*` e `/video/*`, favicon a 1 giorno;
  - HTML lasciato alla rivalidazione predefinita;
  - la regola `/*` contiene solo header di sicurezza, senza `Cache-Control`: nessuna fusione di valori.
- **Problema.**
  - Se l'hosting resterà Railway (ADR 001, opzione C), `_headers` e `_redirects` vengono ignorati: cache, redirect e compressione vanno riscritti nella configurazione di Caddy o nginx.
  - Brotli, HTTP/3 e TTFB dall'Italia non si possono misurare prima del deploy.
- **Motivazione.**
  - `budget.md` §1: TTFB ≤ 0,8 s, obiettivo 0,6 s.
  - `architettura.md` §11.
  - Il budget del documento vale solo con Brotli: senza compressione la home passa da 20,6 a 128,7 KB.
- **Proposta.** Sull'anteprima dell'hosting scelto, prima di G4:

```bash
H=https://<anteprima>
curl -sI -H 'accept-encoding: br' "$H/" | grep -iE 'content-encoding|cache-control|etag|alt-svc'  # br, must-revalidate, ETag, h3
curl -sI "$H/_astro/schibsted-grotesk-latin-wght-normal.Bb8VGrTG.woff2" | grep -i cache-control  # max-age=31536000, immutable
curl -s -o /dev/null -w '%{http_code}\n' "$H/pagina-inesistente/"                              # 404
curl -s -o /dev/null -w 'TTFB %{time_starttransfer}\n' "$H/"                                   # from Italy
```

Poi rifaccio la procedura del `budget.md` §6.2 sull'anteprima.

### 4. [IMPORTANTE] La verifica del budget non è automatizzata

- **Dove.** `scripts/perf/` non esiste e il repository non ha CI (nessuna cartella `.github/`).
- **Problema.**
  - Il budget prevede di verificare nel tempo, a ogni modifica di media, font, JS o terze parti (`budget.md` §6).
  - Oggi la verifica esiste solo come procedura manuale, e gli script di misura stanno in una scratchpad che può sparire.
  - Il bloccante 1 è il tipo di regressione che un controllo automatico con throttling applicato avrebbe fermato.
- **Motivazione.**
  - `budget.md` §6.2 e §6.6.
  - Decisione richiesta alla sessione principale nel budget, ancora aperta.
- **Proposta.**
  - Creare `scripts/perf/serve.mjs` (testo già nel `budget.md` §6.6), `scripts/perf/lighthouse.mjs` e `scripts/perf/checks.mjs`, con gli 8 controlli statici e il controllo «nessun reveal nella prima viewport».
  - Aggiungere a `package.json`:

```json
"perf:serve": "node scripts/perf/serve.mjs dist 8080",
"perf:lh": "node scripts/perf/lighthouse.mjs",
"perf:check": "node scripts/perf/checks.mjs"
```

  - Li scrivo io su richiesta: le versioni usate per questa review sono pronte.

### 5. [SUGGERIMENTO] Preload del font: il confronto sulle pagine vere favorisce la variante senza

- **Dove.** `src/layouts/BaseLayout.astro:42`.
- **Problema.** Il `budget.md` §3 prevede di confrontare in Fase 5 le varianti con e senza preload, e di tenere quella con l'LCP migliore. Ho misurato una copia di `dist/` senza la riga del preload:

| Pagina, throttling | Con preload: FCP / LCP | Senza preload: FCP / LCP |
|---|---|---|
| `/`, applicato (3 corse) | 1,00 / 1,00 s | **0,87 / 0,87 s** (−136 ms) |
| `/`, simulato (3 corse) | 1,19 / 1,73 s | 1,51 / 1,74 s |
| `/siii/`, applicato | 1,02 / 1,98 s | 0,89 / 2,16 s (LCP falsato dal bloccante 1) |
| `/siii/`, simulato | 1,29 / 1,66 s | 1,51 / **1,51 s** |

- **Motivazione.**
  - Sull'LCP la variante senza preload è migliore o pari in tutti i confronti non falsati; il CLS resta 0–0,002.
  - Il preload anticipa solo il momento in cui il carattere definitivo sostituisce il ripiego, che ha le stesse metriche e quindi non sposta il layout.
  - Il vantaggio del preload nell'FCP simulato è un effetto del modello Lantern, come già nel prototipo.
- **Proposta.**
  - Per ora non toccare niente.
  - Dopo la correzione del bloccante 1 ripeto il confronto su `/siii/`. Se il risultato si conferma, si toglie la riga 42 e aggiorno il budget (§3 e controllo n. 7).
  - Costo per l'identità: con una rete lenta si vede il carattere di ripiego per circa 0,1–0,2 s in più. Lo segnalo a creative-director.

### 6. [SUGGERIMENTO] Menu mobile: prima apertura a 128 ms (obiettivo 100 ms)

- **Dove.** `src/components/layout/Header.astro` e `src/scripts/header.ts`.
- **Problema.**
  - Il gestore è corretto: prima `showModal()`, poi `yieldToMain()`, poi il tracciamento (2 ms di elaborazione).
  - Il tempo sta nella presentazione del primo frame (109 ms), che comprende:
    - l'invalidazione di stile di `html:has(dialog[data-mobile-menu][open])`;
    - il primo layout del dialog a `100dvh`;
    - l'avvio delle transizioni `clip-path`, `overlay` e `display`.
  - Dalla seconda apertura in poi si scende a 64–80 ms.
- **Motivazione.** `budget.md` §5: obiettivo ≤ 100 ms, limite ≤ 200 ms. Il limite è rispettato con ampio margine.
- **Proposta.** Nessun intervento per G4. Dopo il lancio lo teniamo d'occhio: se il RUM confermerà valori sopra i 100 ms, analizzerò la traccia della prima apertura.

### 7. [SUGGERIMENTO] `sizes` da allineare alla resa reale (panoramica della home e ritratti)

- **Dove.**
  - `src/components/sections/ImmersivePreview.astro`: il `sizes` predefinito `(min-width: 80rem) 1200px, 94vw`.
  - Il ritratto della home (`founder__img`, `sizes="(min-width: 64rem) 400px, 70vw"`).
  - Il ritratto di Contatti (`sizes="(min-width: 64em) 320px, 60vw"`).
- **Problema.**
  - **Panoramica.** A 1024 px la resa è di 947 px, ma lo slot è di 963 px. Supera di 3 px la variante 960w e il browser scarica la 1272w: 49,9 KB invece di 33,9.
  - **Ritratti.** Tra 768 e 1279 px lo slot sovrastima la resa del 33–56%. Oggi non costa niente, perché ogni ritratto ha una sola variante; costerà quando arriveranno sorgenti più grandi.
- **Motivazione.** `architettura.md` §3.3: `sizes` sbaglia per eccesso al massimo del 10%, mai per difetto.
- **Proposta.** Valori da ricontrollare a 1280 px con lo script di questa review:
  - panoramica: `(min-width: 80rem) 1200px, calc(100vw - 4rem)`;
  - ritratto della home: `(min-width: 80rem) 430px, (min-width: 64rem) 30vw, (min-width: 43.75em) 45vw, 70vw`;
  - ritratto di Contatti: `(min-width: 80rem) 320px, (min-width: 64em) 22vw, 60vw`.

### 8. [SUGGERIMENTO] Nitidezza delle sorgenti (per ui-designer; non è un problema di peso)

- **Dove.** Le immagini in `src/assets/images/`.
- **Problema.** Diverse sorgenti sono più piccole dei pixel richiesti:

| Immagine | Sorgente | Pixel richiesti |
|---|---|---|
| Foto evento, ritaglio stretto | 448 px | 721 px a 412 @1,75 |
| Ritratto della home | 480 px | 857 px a 1440 @2 |
| Evento, schermo (Puglia Digitale) | 438 px | 1085 px a 1440 @2 |
| Ritratto di Contatti | 420 px | 630 px a 1440 @2 |
| Panoramica | 1272 px | 2400 px a 1440 @2 |

- **Motivazione.** C'è margine di peso: il budget ammette 45 KB a 828 px e 70 KB a 1080 px in AVIF, e oggi queste foto pesano 8–20 KB.
- **Proposta.** Se su schermi ad alta densità la morbidezza si nota, servono sorgenti più grandi [DA FORNIRE]. La pipeline genera già le varianti.

### 9. [SUGGERIMENTO] Video in `loop`: `ended` non scatta mai

- **Dove.** `VideoSection.astro` (attributo `loop`) e `src/scripts/video.ts` (`video_complete` su `ended`).
- **Problema.**
  - Con `loop` l'evento `ended` non arriva: `video_complete` non verrà mai tracciato.
  - Su desktop l'autoplay continua a decodificare finché la sezione resta visibile per metà.
- **Motivazione.** Il costo per la performance è basso, perché la decodifica è hardware e il file resta in cache se è piccolo. Il tracciamento, invece, è sbagliato.
- **Proposta.** Da decidere con cro-specialist:
  - togliere `loop` dopo il primo avvio fatto dall'utente;
  - oppure tracciare il completamento con `timeupdate`, quando `currentTime` torna indietro.

### 10. [SUGGERIMENTO] Form di Contatti: dopo un invio con errori il pulsante non risulta «cliccabile» per Playwright

- **Dove.** `/contatti/`, `src/components/sections/ContactForm.astro`.
- **Problema.**
  - Il primo invio con errori misura 96 ms.
  - Le due ripetizioni seguenti sono fallite: `tap` non è riuscito per 30 s, perché il pulsante non risultava visibile, stabile, abilitato e non coperto.
  - Dopo il timeout l'invio valido è riuscito (56 ms). Non ho indagato la causa.
- **Motivazione.** Potrebbe essere un elemento che copre il pulsante dopo lo spostamento del focus sul riepilogo degli errori, per esempio l'header fisso. È un rischio UX, non di performance [DA VERIFICARE].
- **Proposta.** Prova manuale della sessione principale su 390×844: invio vuoto, poi di nuovo tap su «Invia». Se il problema c'è, va segnalato a ux-designer.

### 11. [SUGGERIMENTO] Cache di `/og/*`, `/brand/*` e `apple-touch-icon.png`

- **Dove.** `public/_headers`.
- **Problema.** Senza regola, questi file si rivalidano a ogni richiesta. L'impatto è minimo: nessuno è sul percorso di caricamento.
- **Proposta.**

```text
/og/*
  Cache-Control: public, max-age=86400
/brand/*
  Cache-Control: public, max-age=86400
/apple-touch-icon.png
  Cache-Control: public, max-age=86400
```

## 4. Conforme, senza osservazioni

- **CSS inline** su ogni pagina: 4,8–9,8 KB con Brotli, entro i 12 e 15 KB del budget. Nessuna richiesta che blocca il rendering: l'audit `render-blocking` di Lighthouse è superato.
- **JavaScript:** 1,7–5,1 KB per pagina, suddiviso per componente.
  - `ContactForm` e `VideoSection` si caricano solo dove servono.
  - Nessun listener di scroll.
  - `yieldToMain()` prima del tracciamento nel menu.
  - Il tracciamento resta in memoria, senza richieste di rete.
- **Font:**
  - 2 file WOFF2 self-hosted, sottoinsieme latino con `unicode-range`, `font-display: swap`;
  - ripieghi metrici per Arial, Helvetica e Liberation Sans e, ora, anche per Roboto: la correzione di `architettura.md` §12 è applicata;
  - CLS dello swap 0–0,002.
- **Animazioni scroll-driven** in longhand, sul compositor, dentro `no-preference` e `@supports`; con movimento ridotto la pagina è statica.
- **Nessuna immagine sopra la piega** e nessuna in `lazy` sopra la piega. L'LCP è testo su tutte le pagine; le pagine senza il difetto dell'osservazione 1 hanno LCP = FCP con throttling applicato.
- **Zero terze parti** e zero connessioni esterne al caricamento, video compreso.
- **Audit di Lighthouse (insight)** superati su tutte le pagine: `image-delivery`, `cls-culprits`, `forced-reflow`, `dom-size`, `font-display`, `third-parties`, `cache`.

## Verdetto di dominio

**Non ancora conforme per G4.** C'è un bloccante: l'osservazione 1, cioè l'LCP − FCP di `/siii/` con throttling applicato, 935 ms contro un limite di 200.

Dopo la correzione proposta, che richiede pochi minuti, e la mia rimisura, il dominio performance è **conforme**, a due condizioni per il go-live:
- i quattro controlli sul file video (osservazione 2);
- le verifiche sull'anteprima dell'hosting scelto (osservazione 3).

Pesi, richieste, JS, font, terze parti, INP, motion e controlli statici sono già dentro il budget su tutti i template.

## Ipotesi da validare

- [IPOTESI: il throttling applicato rappresenta il comportamento reale del preload del font meglio del modello simulato. Da confermare con il RUM dopo il lancio o con un dispositivo reale.]
- [IPOTESI: in produzione il TTFB sarà più basso che in laboratorio, dove il server comprime con Brotli q11 a ogni richiesta (57–205 ms).]
- [DA VERIFICARE: dimensione, bitrate, `+faststart` e supporto delle richieste `Range` del video su Railway (osservazione 2).]
- [DA VERIFICARE: CLS dello swap su un Android reale, con il ripiego Roboto, e su iPhone, con Helvetica. In laboratorio, con Liberation Sans e le metriche di Arial, è 0–0,002.]

## Domande aperte

1. **Per l'utente.** Quale hosting? L'ADR 001 è ancora una proposta. Dalla scelta dipendono le verifiche dell'osservazione 3 e il limite di 25 MiB per il video.
2. **Per il cliente.** Chi fornisce il file sorgente del video, con durata e risoluzione, e il permesso di ospitarlo con il sito?
3. **Per il cliente.** C'è un Android di fascia media, un servizio di test su dispositivi reali o una chiave API di PageSpeed Insights per una verifica prima del lancio?

## Decisioni richieste

- **Sessione principale:**
  - correggere il bloccante 1 (`reveal.ts` più `reveal={false}` nella hero SIII) e chiamarmi per la rimisura;
  - eseguire i controlli dell'osservazione 2 da una rete che raggiunge Railway, oppure chiederli al cliente.
- **creative-director:** accettare che gli elementi già visibili al caricamento compaiano senza ingresso, cioè lo statement della hero SIII, la porta SIII e l'H2 della home su mobile. In alternativa, solo un ingresso in `transform` che parte da stato visibile.
- **Utente:** hosting (ADR 001) e sede definitiva del video.
- **cro-specialist:** come tracciare il completamento del video in `loop` (osservazione 9).
- **web-performance-specialist:** decisione sul preload del font dopo la rimisura (osservazione 5); poi aggiornamento del `budget.md` con la baseline del §2.
