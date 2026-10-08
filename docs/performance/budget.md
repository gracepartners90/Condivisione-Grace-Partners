---
titolo: Budget di performance
owner: web-performance-specialist
contributi: [seo-technical, cro-specialist, ui-designer]
stato: bozza
versione: 0.8
aggiornato: 2026-10-08
fonti: [docs/brief/linee-guida.md, docs/decisioni/001-stack-tecnologico.md, docs/decisioni/004-anteprima-su-railway.md, docs/decisioni/005-preload-del-font.md, docs/creativa/direzione-visiva.md, docs/cro/piano-misurazione.md, prototipo di misura del 2026-09-28 (§7.2), docs/review/2026-09-28-sito-performance-web-performance-specialist.md, docs/review/2026-09-28-sito-rimisura-performance-web-performance-specialist.md (§7.1), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (§3.1, C08), docs/review/2026-10-07-schermate-siii-web-performance-specialist.md (§7.3), docs/review/2026-10-08-hero-siii-yes-web-performance-specialist.md (§7.4), fonti web elencate nel §6.8]
---

# Budget di performance

Limiti che lo sviluppo deve rispettare dal primo commit, e il protocollo con cui li verifichiamo in Fase 5 e a ogni modifica che tocca media, font, JavaScript o terze parti.

**Convenzioni**
- KB = 1024 byte, come in Lighthouse.
- I pesi sono **trasferiti**, cioè compressi.
- Si misura al primo caricamento a cache vuota, senza scroll, in emulazione mobile.
- **Limite** = bloccante per il gate G4. **Obiettivo** = valore atteso; se lo si supera, serve una motivazione nell'audit.

## 1. Soglie sul campo (75° percentile, mobile)

| Metrica | Limite (soglia di CLAUDE.md) | Obiettivo di progetto |
|---|---|---|
| LCP | ≤ 2,5 s | ≤ 2,0 s |
| INP | ≤ 200 ms | ≤ 150 ms |
| CLS | ≤ 0,1 | ≤ 0,05 |
| TTFB (diagnostica) | ≤ 0,8 s | ≤ 0,6 s |

## 2. Tempi in laboratorio, per template

Lighthouse 13.5.0 in emulazione mobile, throttling simulato, mediana di 5 esecuzioni (§6).

| Template | URL |
|---|---|
| T1 Home | `/` |
| T2 Progetto | `/siii/`, `/puglia-digitale/`, `/citta-digitali/` |
| T3 Contatti | `/contatti/` |
| T4 Servizio | `/privacy-policy/`, `/cookie-policy/`, 404 (un URL inesistente) |

Le soglie valgono per tutti i template:

| Metrica | Limite | Obiettivo | Sito costruito, caso peggiore tra i template (§7.1, §7.3 e §7.4) |
|---|---|---|---|
| LCP | ≤ 2,5 s | ≤ 2,0 s | 1,80 s (`/siii/`, immagine LCP, §7.4; con throttling applicato 1,71 s) |
| FCP | ≤ 1,8 s | ≤ 1,5 s | 1,34 s (con il preload del font, ADR 005) |
| TBT | ≤ 200 ms | ≤ 100 ms | 0 ms |
| CLS | ≤ 0,1 | ≤ 0,05 | 0 |
| Speed Index | ≤ 3,4 s | ≤ 2,5 s | 1,34 s |
| Punteggio Performance | ≥ 90 | ≥ 95 | 99 |
| **LCP − FCP** con throttling applicato (`devtools`), pagine con LCP testuale | ≤ 200 ms | ≤ 100 ms | 0 ms |
| **Immagine LCP**, throttling applicato: inizio della richiesta rispetto alla fine del download del documento | ≤ +50 ms | prima della fine | `/siii/` (`1112c93`, schermata YES): da −25 a +14 ms; con `bae201c` da −25 a +5 ms. Con `lazy`: circa +300 ms |
| **Immagine LCP**, throttling applicato: ritardo di rendering (`lcp-breakdown-insight`) | ≤ 200 ms | ≤ 100 ms | 49–111 ms, mediana 62 ms (`/siii/`, `1112c93`; una corsa su 6 sopra l'obiettivo); con `bae201c` 41–71 ms |

**Perché serve la riga LCP − FCP.** Il throttling simulato non vede i ritardi dovuti alle animazioni.
- Un H1 che entra da `opacity: 0` sposta l'LCP di +0,66 s con throttling applicato, e di soli +0,05 s in quello simulato (§7.2).
- Sul sito costruito lo statement di `/siii/`, nascosto dal reveal, ha dato LCP − FCP = 935 ms con throttling applicato e 373 ms in quello simulato, dovuti al font (review del 2026-09-28).
- Dove l'LCP è testo (tutte le pagine tranne `/siii/`), LCP e FCP devono coincidere.

**Pagine con un'immagine LCP** (dal 2026-10-07: `/siii/`, porta della hero).
- **Perché le righe cambiano.** L'immagine arriva dopo il primo paint per natura (su `/siii/` circa 0,7 s con throttling applicato), quindi la riga LCP − FCP non si applica. Al suo posto valgono le due righe «Immagine LCP», che intercettano i due errori tipici:
  - **scoperta tardiva:** `lazy`, sfondo CSS, immagine inserita da script. Con `lazy` la richiesta della porta parte circa 300 ms dopo la fine del documento, e l'LCP peggiora di 271 ms;
  - **immagine nascosta da un'animazione:** ritardo di rendering alto.
- **Dove si leggono:**
  - l'inizio della richiesta in `audits['network-requests']` (`networkRequestTime` dell'immagine, `networkEndTime` del documento);
  - il ritardo di rendering in `audits['lcp-breakdown-insight']`.
- **Valgono anche le altre righe:** l'LCP resta entro limite e obiettivo con entrambi i metodi, e l'immagine rispetta il §4.
- **Dove l'immagine non è l'LCP** (verificato il 2026-10-08 su 26 viewport; dipende dall'impaginazione della hero, non dall'immagine).
  - Sui telefoni in verticale la porta comincia a y 546–569 px. Con meno di 600–640 px di altezza visibile, secondo la larghezza, l'LCP è la riga più grande dello statement. Per esempio: 320×568 e 320×620, 360×600, 375×580.
  - Su ogni telefono in orizzontale, da 568×320 a 932×430, la porta è tutta sotto la piega e l'LCP è il nome «SIII».
  - In questi casi valgono le regole delle pagine con LCP testuale (riga LCP − FCP). L'immagine resta in `priority` perché è l'LCP su tutte le altre viewport, compreso il dispositivo di Lighthouse (412×823); lì divide comunque la banda con il font (§3).
  - La review del 2026-10-07 («19 viewport su 19») misurava da 320×640 in su: il dato resta giusto per quelle viewport.

**FCP simulato e font.** Il sito tiene il preload di Schibsted Grotesk (ADR 005, §3). Le misure del §7.1 sono fatte con il preload, e l'obiettivo di 1,5 s è rispettato su tutti i template. Se un giorno il preload verrà tolto (condizioni del §3), vale questa avvertenza:
- il modello simulato (Lantern) tratta il font come una dipendenza dell'FCP, mentre con `font-display: swap` il testo si dipinge con il ripiego;
- senza preload l'FCP simulato cresce di 0,23–0,33 s (home a 1,51 s, 0,01 s sopra l'obiettivo), mentre quello applicato scende di 0,15–0,27 s: in 20 corse su 20 l'FCP applicato precede l'arrivo del font (rimisura del 2026-09-28, §4.2);
- in quel caso l'obiettivo di FCP si valuta con il throttling applicato.

**Altre categorie di Lighthouse (mobile).** Sono obiettivi proposti; soglia e verdetto spettano agli owner.

| Categoria | Obiettivo | Owner |
|---|---|---|
| Accessibilità | ≥ 95, puntando a 100. Non sostituisce l'audit WCAG. | ux-designer |
| Best Practices | ≥ 95 | — |
| SEO | 100 | seo-technical |

## 3. Pesi e richieste, per template

| Voce (trasferito, al caricamento) | T1 Home | T2 Progetto | T3 Contatti | T4 Servizio |
|---|---|---|---|---|
| Documento HTML (compresi CSS e SVG inline) | ≤ 40 KB | ≤ 35 KB | ≤ 25 KB | ≤ 20 KB |
| — di cui CSS (inline più esterno) | ≤ 15 KB | ≤ 15 KB | ≤ 15 KB | ≤ 12 KB |
| JavaScript di prima parte (totale) | ≤ 10 KB | ≤ 12 KB | ≤ 12 KB | ≤ 5 KB |
| JavaScript e richieste di terze parti | **0** | **0** | **0** | **0** |
| Font | 2 file, ≤ 75 KB | 2 file, ≤ 75 KB | 2 file, ≤ 75 KB | 2 file, ≤ 75 KB |
| Immagini (senza scroll) | ≤ 150 KB | ≤ 150 KB | ≤ 60 KB | ≤ 20 KB |
| Video | **0 byte** | **0 byte** | 0 | 0 |
| Peso totale | ≤ 300 KB | ≤ 300 KB | ≤ 200 KB | ≤ 130 KB |
| Richieste totali | ≤ 15 | ≤ 18 | ≤ 12 | ≤ 8 |

**Regole collegate**
- **Font.**
  - Al massimo **2 file** per pagina: Schibsted Grotesk variabile, 45,9 KB, e Fragment Mono 400, 24,8 KB (misurati).
  - **Un solo preload, in ogni pagina: il file di Schibsted Grotesk.** Fragment Mono e le immagini non vanno in preload. Decisione del creative-director al gate G4, sentito web-performance-specialist: `docs/decisioni/005-preload-del-font.md`.
    - **Meccanismo.** In Chromium un preload di font nel `<head>` blocca il primo rendering fino all'arrivo del font, oppure fino a 100 ms dopo l'inserimento del `<body>`, oppure fino a 1,5 s dall'avvio della navigazione. Vale anche con `font-display: swap`. Fonte: costanti `kMaxFCPDelay` (`render_blocking_resource_manager.cc`) e `kMaxBlockingTimeForRenderBlockingFonts` (`document_loader.cc`) nel sorgente di Chromium, ricontrollate il 2026-09-28.
    - **Costo**, rispetto alla variante senza preload (rimisura del 2026-09-28, §4): con throttling applicato l'LCP è più tardi di 151 ms sulla home e di 177 ms su `/siii/`, e resta 1,01–1,04 s; con throttling simulato è pari sulla home e più tardi di 145 ms su `/siii/`. CLS invariato (0–0,002).
    - **Beneficio** (misure del creative-director, ADR 005): con la fibra il titolo compare subito in Schibsted, senza scambio di carattere; su 4G veloce la finestra del ripiego scende da 158–183 a 13–32 ms, su 4G lento da 626–694 a 184–234 ms.
    - **Quando si riapre.** La decisione torna a web-performance-specialist, che può togliere il preload senza un nuovo assenso, se:
      - i dati di campo (RUM `web-vitals` o CrUX) mostrano un LCP mobile al 75° percentile sopra 2,0 s;
      - una nuova versione di Chromium cambia in modo misurabile il comportamento dei font in preload;
      - la hero smette di essere tipografica.
    - **Sorveglianza delle condizioni:** adottata nell'ADR 005 versione 1.1, con web-performance-specialist come owner. Protocollo, registro dei confronti e data del prossimo confronto sono in fondo a questo paragrafo.
  - Niente corsivi né altri pesi statici. Un terzo file richiede un'eccezione (§8).
- **CSS.** Resta tutto inline finché sta entro 15 KB per pagina. Oltre, si torna a `inlineStylesheets: 'auto'` e si rimisura.
- **JavaScript.**
  - Nessun task oltre 50 ms durante il caricamento o le interazioni.
  - Moduli sopra i 5 KB, non necessari al primo rendering, solo con `import()` dinamico.
- **Terze parti.** Zero al caricamento, su tutte le pagine.
  - Questo vale anche per i domini dei portali, per railway.app e per i preconnect statici.
  - Ogni futura aggiunta (analytics, antispam del form) passa da un ADR con cro-specialist, con un proprio budget di peso e di INP.

**Sorveglianza del preload (ADR 005, versioni 1.1 e 1.2).** La mia nota sull'ADR è stata accolta il 2026-09-28 (nella 1.2 anche le 6 corse per variante): due numeri corretti (+72–280 ms di primo paint su 4G; finestra del ripiego da 2,7 a 14 volte più lunga senza preload), FCP simulato tolto dai contro, sorveglianza adottata. La decisione sul preload resta del creative-director; la sorveglianza spetta a web-performance-specialist.
- **Dati di campo.** RUM `web-vitals` senza cookie dopo il lancio, raccomandato dall'ADR. Senza RUM la condizione «LCP mobile al 75° percentile sopra 2,0 s» non può scattare, e CrUX è improbabile con il traffico del sito (§6.7). La decisione è aperta con cro-specialist e l'utente.
- **Confronto in laboratorio** su `/` e `/siii/`, a ogni aggiornamento maggiore del Chromium di misura e comunque ogni tre mesi:
  - stessa build, con la sola riga del preload tolta; throttling applicato, corse alternate con e senza preload;
  - **almeno 6 corse per variante**, non 3. Le singole coppie oscillano molto: nel confronto C14 da 106 a 361 ms. Con le prime 3 corse la stima su `/siii/` era 282 ms, con 6 è 201 ms;
  - il ritardo è la differenza tra le mediane dell'LCP con e senza preload;
  - si controllano anche le costanti `kMaxFCPDelay` (100 ms) e `kMaxBlockingTimeForRenderBlockingFonts` (1500 ms) nel sorgente di Chromium;
  - facoltativo, dal metodo dell'ADR: la finestra del ripiego su 4G veloce, con l'evento `loadingdone` di `document.fonts`.
- **Soglia.** Si riapre se il ritardo supera 300 ms su una delle due pagine, oppure se cambiano le due costanti. In quel caso web-performance-specialist toglie il preload e ne informa il creative-director.
- **Dal 2026-10-07 l'LCP di `/siii/` è un'immagine** (§7.3), che il preload non sposta: per l'LCP il confronto resta significativo sulla Home. Su `/siii/` si registra la finestra del ripiego.
  - L'immagine in alta priorità divide la banda con il font: in laboratorio la finestra sale da 664 a 967 ms, sul 4G lento da 230 a 478 ms; sul 4G veloce resta sotto i 70 ms.
  - L'effetto è segnalato al creative-director: review del 2026-10-07, osservazione 2.
  - **Soglia dell'ADR 005, versione 1.3:** se sull'host reale, in HTTP/2, la finestra supera **600 ms sul profilo 4G lento**, web-performance-specialist prova la porta senza `fetchpriority="high"` e sceglie con le misure. L'LCP deve restare entro 2,0 s.
  - **In laboratorio, dopo il ritaglio 4:5** (`bae201c`, HTTP/1.1, mediane di 5 caricamenti): 449 ms a 1,75x e 483 ms a 3x, quindi sotto la soglia.
    - Un caricamento a 3x è arrivato a 669 ms: si valuta la mediana.
    - La prova formale va fatta sull'host reale, perché le priorità di HTTP/2 qui non si vedono.
  - **Con la schermata YES** (`1112c93`, 2026-10-08, mediane di 5 caricamenti alternati col controllo `aaf4760`): 447 ms a 1,75x e 464 ms a 3x, contro 394 e 428 ms del controllo. Sotto la soglia di 600 ms; caso singolo più alto 547 ms.
  - **Effetto nuovo sull'LCP, visto con la schermata YES.** Sul 4G lento la porta e il font finiscono di scaricarsi quasi insieme (846–925 e 919–928 ms, a 1,75x). Lo scambio di carattere ricalcola il layout di tutta la pagina in un task di 157–172 ms con CPU 4x.
    - Se la porta arriva subito dopo, aspetta la fine di quel task: in 6 caricamenti su 13 l'LCP passa da 0,92–0,95 a 1,04–1,16 s.
    - Mediana di 13 caricamenti: 948 ms contro 800 ms del controllo, dove la porta (26,8 KB) arrivava prima del font.
    - Resta lontano dall'obiettivo di 2,0 s. Si sorveglia insieme alla finestra del ripiego; dettaglio nella review del 2026-10-08, osservazione 2.

**Registro dei confronti**

| Data | Build misurata | Chromium | Corse per variante | Home: LCP con / senza preload, ritardo | `/siii/`: LCP con / senza preload, ritardo | Costanti | Esito |
|---|---|---|---|---|---|---|---|
| 2026-09-28 | `7c5f747` (rimisura, §4) | 141.0.7390.37 | 5 | 1,01 / 0,86 s, **+151 ms** | 1,04 / 0,86 s, **+177 ms** | 100 e 1500 ms | Sotto 300 ms |
| 2026-09-28 | Build del G4 (14:20, contenuto di `f1b6780`; rimisura, «Rimisura C14») | 141.0.7390.37 | 6 | 1,04 / 0,84 s, **+204 ms** | 1,03 / 0,83 s, **+201 ms** | 100 e 1500 ms, invariate | Sotto 300 ms: il preload resta |

**Prossimo confronto:** al primo aggiornamento maggiore del Chromium di misura (oggi 141, con Playwright 1.56.1) e comunque **entro lunedì 28 dicembre 2026**. Poi ogni tre mesi dall'ultimo confronto.

## 4. Budget per componente e media

| Componente | Budget |
|---|---|
| Immagine LCP (dal 2026-10-07: la porta della hero di `/siii/`; dal 2026-10-08 con la schermata del negozio YES) | Unica immagine con `priority` (`eager`, `fetchpriority="high"`, `decoding="sync"`), mai `lazy`: anche quando è in parte sotto la piega, se resta l'elemento LCP (dove non lo è: §2). Pesi in AVIF: ≤ 60 KB in **ogni variante che un telefono può scaricare**, densità 3x compresa (fino a 1200 px), e ≤ 150 KB nelle varianti desktop. Per i browser senza AVIF valgono il limite «Immagini» del §3 e il controllo n. 8. Se su mobile l'immagine si vede con un'altra proporzione, si ritaglia in build (`Media` con `mobileCrop`, dal commit `bae201c`). Se il desktop usa un derivato, i telefoni ritagliano l'originale (`mobileCrop.image`, dal commit `2178f47`). L'ancoraggio del ritaglio cambia il peso: ogni cambio si rimisura. Se l'immagine non sta nei pesi con i valori del sito, si seguono le leve dell'`architettura.md` §3.2. **Misurato con la schermata YES, dal commit `2178f47`** (telefoni: ritaglio 4:5 dell'originale, in alto; desktop: derivato 3:5 di 1014 × 1690). Telefoni: 27,3–54,0 KB (640w–1080w; margine di 6,0 KB a 1080w). Desktop: 22,2–60,4 KB (480w–1014w; con `1112c93` erano 24,7–83,7). Il derivato non supera i 1014 px e Astro non ingrandisce, quindi da 64em, oltre 2,44x, il desktop riceve meno pixel di quelli che chiede: 97% a 2,5x, 89% a 2,75x, 81% a 3x. Con la schermata intera, a 3x, si arrivava al 96%. WebP di ripiego fino a 76,8 KB sui telefoni e 82,4 KB su desktop (§7.4). Con la sala di Masseria Santella erano 21,4–40,7 e 18,0–51,4 KB (§7.3). |
| Foto a tutta larghezza | ≤ 45 KB a 828 px, ≤ 70 KB a 1080 px, ≤ 150 KB a 1920 px (AVIF). Riferimento misurato: foto evento a 1080 px = 49,6 KB. Obiettivi: se si superano, serve una motivazione. **Eccezione motivata (2026-10-07), primo esempio di `/siii/`.** È una schermata ricca di dettagli d'interfaccia, in `lazy` sotto la piega. Ha 76,7 KB a 1080 px. Solo gli schermi da 1,5 dppx in su ricevono l'AVIF fino a 1920 px (173,7 KB), perché lì la variante da 1440 si vede più morbida. Gli schermi 1x restano a 1440 px, WebP e JPEG pure. Applicata in `d4511be` e verificata il 2026-10-07: varianti scelte come previsto in 10 casi su 10, controllo n. 8 vuoto. Dettaglio nella review del 2026-10-07, §8. |
| Foto a metà pagina o ritratto | ≤ 45 KB a 828 px (AVIF); i ritratti del fondatore misurano 32–40 KB. |
| SVG della hero (orizzonte) | Inline, ≤ 6 KB non compresso (limite fissato dalla direzione visiva). |
| Carte (Puglia, Italia) | Inline, ≤ 20 KB non compresso ciascuna; tracciati semplificati con SVGO, precisione a 1 decimale. |
| Copertina del video | `<picture>` lazy, non l'attributo `poster`. Pesi: ≤ 60 KB a 828 px, ≤ 150 KB a 1920 px. |
| Video, bitrate e file | 0 byte finché la sezione non è a metà viewport (autoplay consentito) o finché non c'è un clic. H.264: ≤ 2 Mbit/s a 720p, ≤ 4 Mbit/s a 1080p. AV1: circa −40%. Ogni file ≤ 25 MiB, con `+faststart`. |
| Anteprime immersive (iframe) | 0 byte e 0 connessioni al caricamento. Preconnect solo all'intenzione (hover o focus); iframe solo dopo il clic. |
| Visual in Canvas (se si userà) | ≤ 5 KB di JS, avviato dopo `load`, ≤ 4 ms di script per frame con CPU 4x, fermo fuori viewport. |
| Marquee, parallax, orizzonte | 0 KB di JS: solo CSS scroll-driven, da scrivere con le proprietà longhand (architettura §6.5). |

## 5. INP: le interazioni da misurare

In laboratorio con Playwright (§6.4): CPU rallentata 4 volte, 3 ripetizioni, conta il caso peggiore.
- **Obiettivo:** ≤ 100 ms per interazione.
- **Limite:** ≤ 200 ms.

| Interazione | Pagine |
|---|---|
| Apertura e chiusura del menu mobile (`<dialog>`) | tutte |
| Invio del form con errori (messaggi e riepilogo) | contatti e pagine con form |
| Invio del form valido, fino allo stato «in invio» | contatti e pagine con form |
| Play, pausa e audio del video | `/citta-digitali/` |
| Attivazione dell'anteprima immersiva, fino all'inserimento dell'iframe (escluso il contenuto di terzi) | `/siii/` |
| Interruttore del confronto «Tour 360° / SIII» | `/siii/` |
| Focus e hover sulle città della carta | `/puglia-digitale/`, `/citta-digitali/` |

## 6. Come verifichiamo

Si verifica in Fase 5 e, durante lo sviluppo, a ogni modifica che tocca media, font, JavaScript o terze parti.

### 6.1 Condizioni di test (da riportare in ogni audit)

- **Build di produzione** (`npm run build`), servita in locale con **Brotli** e con gli header di cache di produzione.
  - Dal 2026-09-28 il server di misura è `scripts/serve.mjs` dell'ADR 004: applica `_headers` e `_redirects` e comprime all'avvio.
  - Verificato: dà le stesse mediane di Lighthouse del server del §6.6, che resta come riserva.
  - `astro preview` non va bene: non comprime e manda `Cache-Control: no-cache` (verificato).
- **Strumenti:**
  - Lighthouse 13.5.0 via `npx`;
  - Chromium 141 di Playwright in `/opt/pw-browsers/chromium`;
  - preset mobile predefinito: emulazione Moto G Power 412×823, DPR 1,75, RTT 150 ms, 1,6 Mbit/s, CPU 4x.
- **Esecuzioni:**
  - 5 con throttling simulato, di cui si prende la **mediana**;
  - 3 con throttling applicato (`--throttling-method=devtools`), per la riga LCP − FCP e per il CLS dei font.
- **Dati da annotare:** `benchmarkIndex` (1950–2420 in questo ambiente il 2026-09-28) e il commit misurato.
- **Limiti noti del laboratorio:**
  - il server di misura è locale: HTTP/1.1 senza TLS e senza rete vera, TTFB di circa 1 ms con `scripts/serve.mjs` (65–234 ms con il server di riserva del §6.6, che comprime a ogni richiesta). Compressione, cache, protocollo e latenza dell'host reale si verificano sull'host (§6.8);
  - l'ambiente non ha Arial, Roboto né Helvetica, ma ha **Liberation Sans**, che la faccia di ripiego intercetta con le metriche di Arial (verificato il 2026-09-28). Il CLS dello swap misurato qui rappresenta quindi un ripiego con metriche di Arial: non è sovrastimato. Resta da verificare su Android (Roboto) e iPhone (Helvetica).

### 6.2 Procedura

```bash
npm run build
DIST_DIR=dist PORT=8080 node scripts/serve.mjs &   # ADR 004: _headers, Brotli computed at start-up

# 5 runs per URL, simulated throttling: take the median
for i in 1 2 3 4 5; do
  CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 http://127.0.0.1:8080/ \
    --only-categories=performance --chrome-flags="--headless=new --no-sandbox" \
    --output=json --output-path=.perf/home-$i.json --quiet
done

# 3 runs with applied throttling: LCP − FCP and font CLS
CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 http://127.0.0.1:8080/ \
  --only-categories=performance --throttling-method=devtools \
  --chrome-flags="--headless=new --no-sandbox" --output=json --output-path=.perf/home-dt-1.json --quiet

# Once per URL, all categories, HTML report attached to the audit
CHROME_PATH=/opt/pw-browsers/chromium npx -y lighthouse@13.5.0 http://127.0.0.1:8080/ \
  --chrome-flags="--headless=new --no-sandbox" --output=html --output-path=.perf/home.html --quiet
```

**Dove leggere i valori nel JSON**
- **Tempi e punteggio:**
  - `audits['largest-contentful-paint' | 'first-contentful-paint' | 'total-blocking-time' | 'cumulative-layout-shift' | 'speed-index'].numericValue`;
  - `categories.performance.score`.
- **Pesi e richieste:** `audits['resource-summary']` per tipo di risorsa e `audits['network-requests']`, con host e priorità di ogni richiesta.
- **Elemento LCP e sue fasi:** `audits['lcp-breakdown-insight']`.

**Dove salvare i risultati**
- La cartella `.perf/` non va versionata.
- Le mediane finiscono nell'audit `docs/performance/audit/AAAA-MM-GG-<oggetto>.md`.
- In Fase 4 si può automatizzare tutto in `scripts/perf/lighthouse.mjs`, con 5 esecuzioni per URL, le mediane e il confronto con queste tabelle. Lo script di riferimento esiste già nel prototipo e lo scrive web-performance-specialist su richiesta.
- `@lhci/cli` 0.15.1 resta un'opzione per la CI, ma usa Lighthouse 12.6.1: i numeri non sono confrontabili con quelli della 13.5.

### 6.3 Controlli statici sulla build (bloccanti)

| # | Controllo | Comando di esempio (vuoto o conforme = superato) |
|---|---|---|
| 1 | Al massimo un `fetchpriority="high"` per pagina, mai insieme a `loading="lazy"` | `for f in $(find dist -name '*.html'); do echo "$f $(grep -o 'fetchpriority="high"' "$f" \| wc -l)"; done` → ogni valore ≤ 1 (non usare `grep -c`: l'HTML minificato sta su una riga) |
| 2 | Ogni `<img>` ha `width` e `height` | `grep -rhoE '<img [^>]*>' dist --include='*.html' \| grep -cvE 'width="[0-9]+"[^>]*height="[0-9]+"\|height="[0-9]+"[^>]*width="[0-9]+"'` → 0 |
| 3 | Nessuno shorthand `animation` con timeline di scroll (sarebbe scartato dal browser) | `grep -rhoE 'animation:[^;}]*(view\|scroll)\(' dist` → vuoto |
| 4 | Nessun `<iframe>` nell'HTML (solo facade) | `grep -rl '<iframe' dist --include='*.html'` → vuoto |
| 5 | `<video>` senza `autoplay` e senza `poster` | `grep -rhoE '<video[^>]*>' dist --include='*.html' \| grep -E 'autoplay\|poster='` → vuoto |
| 6 | Nessuno script, CSS, font o preconnect esterno | `grep -rhoE '<script[^>]+src="https?://[^"]*"\|<link[^>]+rel="(stylesheet\|preload\|modulepreload\|preconnect\|dns-prefetch)"[^>]*href="https?://[^"]*"' dist --include='*.html'` → vuoto |
| 7 | Esattamente un `rel="preload"` per pagina: il WOFF2 di Schibsted Grotesk, con `as="font"`, `type="font/woff2"` e `crossorigin` (§3, ADR 005; senza `crossorigin` il font si scarica due volte). Al massimo 2 file `.woff2` | `for f in $(find dist -name '*.html'); do echo "$f $(grep -oE '<link[^>]*rel="preload"[^>]*>' "$f" \| grep -c 'schibsted-grotesk[^"]*\.woff2" as="font" type="font/woff2" crossorigin') $(grep -o 'rel="preload"' "$f" \| wc -l)"; done` → ogni riga finisce con `1 1` (provato il 2026-09-28: 8 pagine su 8; senza `crossorigin` dà `0 1`); `find dist -name '*.woff2' \| wc -l` → ≤ 2 |
| 8 | Tra le immagini che le pagine fanno scaricare, nessun AVIF o WebP sopra i 200 KB e nessun JPEG sopra i 300 KB; nessuna foto in `public/` | comando qui sotto → vuoto. `find public -type f \( -name '*.jpg' -o -name '*.webp' -o -name '*.avif' \) ! -path 'public/og/*'` → vuoto |

**Comando del controllo n. 8** (affinato il 2026-10-07).
- Considera solo i file che le pagine fanno scaricare: i candidati di `srcset` di ogni `<source>` e `<img>`, e le `<img>` fuori da `<picture>`.
- Esclude due tipi di file che nessun browser moderno scarica:
  - gli originali che Astro copia in `_astro/` senza che nessuna pagina li richiami;
  - lo `src` di ripiego dentro `<picture>`, usato solo da browser senza `srcset`.
- Il comando precedente (`find … -size +200k`) segnalava anche i file esclusi, quindi dava falsi positivi.
- Provato sulla build `d06a3e9`: segnala le due varianti del primo esempio di `/siii/` (review del 2026-10-07, osservazione 1); sulla build di controllo `09dcd17` risulta vuoto.

```bash
node -e '
const fs = require("fs"), path = require("path"), D = "dist";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".html") ? [path.join(d, e.name)] : []);
const html = walk(D).map((f) => fs.readFileSync(f, "utf8")).join("\n");
const urls = new Set();
for (const m of html.matchAll(/srcset="([^"]+)"/g)) for (const c of m[1].split(/,\s+/)) urls.add(c.trim().split(/\s+/)[0]);
for (const m of html.replace(/<picture[\s\S]*?<\/picture>/g, "").matchAll(/<img[^>]+src="([^"]+)"/g)) urls.add(m[1]);
for (const u of urls) {
  const f = path.join(D, u); if (!u.startsWith("/") || !fs.existsSync(f)) continue;
  const kb = fs.statSync(f).size / 1024, lim = /\.(avif|webp)$/.test(u) ? 200 : /\.jpe?g$/.test(u) ? 300 : Infinity;
  if (kb > lim) console.log(`${kb.toFixed(1)} KB ${u}`);
}'
```

### 6.4 INP, scroll e reveal in laboratorio (Playwright)

```js
// scripts/perf/inp.mjs — usage: node scripts/perf/inp.mjs <url> <selector> [<selector>…]
import { createRequire } from 'node:module';
const require = createRequire('/opt/node22/lib/node_modules/'); // global Playwright 1.56.1
const { chromium } = require('playwright');
const [url, ...selectors] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await (await ctx.newCDPSession(page)).send('Emulation.setCPUThrottlingRate', { rate: 4 });
await page.addInitScript(() => {
  window.__events = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (e.interactionId) window.__events.push({ target: e.target?.outerHTML.slice(0, 60), d: e.duration });
  }).observe({ type: 'event', durationThreshold: 16, buffered: true });
});
await page.goto(url, { waitUntil: 'load' });
for (const sel of selectors) for (let i = 0; i < 3; i++) { await page.tap(sel); await page.waitForTimeout(400); }
const events = await page.evaluate(() => window.__events);
console.log('worst interaction (ms):', Math.max(0, ...events.map((e) => e.d)), events);
await browser.close();
```

Taratura del 2026-09-28:
- un gestore leggero (cambio di classe) misura **40 ms**;
- un gestore con 150 ms di lavoro sincrono misura **176 ms**.

Il metodo distingue quindi bene i casi.

**Prima apertura del menu.** Il caso peggiore dell'INP è la prima interazione su una pagina nuova. Si misura su almeno 6 caricamenti distinti, non con le ripetizioni sulla stessa pagina. Riferimento del 2026-09-28: mediana 128 ms, massimo 200 ms su 19 caricamenti.

**Traccia dello scroll** (main thread durante lo scroll, CPU 4x):
- si usa `Input.synthesizeScrollGesture` con `gestureSourceType: 'mouse'` (rotella) e `browser.startTracing`;
- **non** la sorgente `touch`: con Chromium 141 headless e l'emulazione mobile di Playwright non scorre la pagina (0 px in 12 prove su 12, verificato il 2026-09-28);
- si controlla sempre che `scrollY` sia cambiato;
- si contano i task oltre 50 ms (limite: nessuno) e gli eventi `UpdateLayoutTree`, `Layout` e `Paint`.

```js
await cdp.send('Input.synthesizeScrollGesture', { x: 206, y: 411, yDistance: -3000, speed: 1500, gestureSourceType: 'mouse' });
```

Riferimento del 2026-09-28, home a 412×823 su 3000 px: main thread al 37–39% con il motion e al 12% con movimento ridotto; nessun task lungo.

**Reveal e CLS durante la lettura** (Playwright):
- **Reveal:** a ogni fotogramma del caricamento, con CPU 4x e la rete del throttling applicato, nessun `[data-reveal]` o `.aperture` nella viewport deve avere opacità sotto 1, righe traslate o otturatori chiusi. Si controlla a 412×823, 390×844, 768×1024 e 1440×900.
- **CLS durante la lettura:** Layout Instability API durante uno scroll completo con la rotella, a scatti di 400 px ogni 120 ms.
  - Il valore si somma al CLS del caricamento, e il totale ha gli stessi limite (0,1) e obiettivo (0,05) del §2.
  - Ogni spostamento con una causa individuabile si corregge anche se il totale è sotto l'obiettivo.
  - Riferimento del 2026-09-28: fino a 0,016, dovuto al reveal a righe (rimisura, osservazione 2).

### 6.5 Esito e report

- **Superato:** tutti i limiti del §2 e del §3, tutti i controlli del §6.3 e tutte le interazioni del §5 sotto il limite.
- **Per il go-live** servono anche le verifiche sull'hosting del §6.8 (condizione C08 del verdetto G4).
- **Obiettivi mancati:** motivazione nell'audit e correzione pianificata. **Limiti mancati:** blocco del gate G4.
- **Contenuto dell'audit** (`docs/performance/audit/`):
  - condizioni di test;
  - mediane per URL;
  - confronto con il budget;
  - problemi ordinati per impatto;
  - correzioni con il guadagno misurato.

### 6.6 Server locale di misura di riserva

Da usare solo se `scripts/serve.mjs` (ADR 004) non è disponibile. Comprime a ogni richiesta, quindi il TTFB locale sale a 65–234 ms, ma le mediane di Lighthouse restano le stesse (verificato il 2026-09-28).

```js
// Minimal static server that mimics production: Brotli for text, long cache for hashed assets.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import zlib from 'node:zlib';

const [root = 'dist', port = '8080'] = process.argv.slice(2);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.json': 'application/json', '.txt': 'text/plain', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };
const compressible = new Set(['.html', '.css', '.js', '.svg', '.xml', '.json', '.txt']);

http.createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://local').pathname);
  let file = join(root, path);
  if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, 'index.html');
  const found = await stat(file).catch(() => null);
  if (!found) file = join(root, '404.html');
  let body = await readFile(file).catch(() => null);
  if (!body) return res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
  const ext = extname(file);
  const headers = { 'content-type': types[ext] ?? 'application/octet-stream',
    'cache-control': path.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate' };
  if (compressible.has(ext) && /\bbr\b/.test(req.headers['accept-encoding'] ?? '')) {
    body = zlib.brotliCompressSync(body, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } });
    Object.assign(headers, { 'content-encoding': 'br', vary: 'Accept-Encoding' });
  }
  res.writeHead(found ? 200 : 404, { ...headers, 'content-length': body.length }).end(body);
}).listen(Number(port), '127.0.0.1', () => console.log(`http://127.0.0.1:${port}`));
```

### 6.7 Dopo il lancio

- **CrUX e rapporto Core Web Vitals di Search Console.** Solo se il traffico basta, cosa improbabile per un sito B2B di nicchia [IPOTESI].
  - L'API PageSpeed Insights risponde dall'ambiente, ma la quota anonima è esaurita (errore 429 il 2026-09-28): serve una chiave API [DA FORNIRE].
- **RUM con `web-vitals` 6.2.2** (3,0 KB con Brotli), caricato dopo `load`: si attiva solo con una decisione.
  - Il piano CRO prevede zero script di misura al lancio.
  - Proposta: un invio senza cookie né identificatori all'endpoint del sito, da valutare nell'ADR sull'analytics con cro-specialist [DA VERIFICARE la base giuridica].
  - Misura LCP, INP, CLS e TTFB degli utenti reali. È anche l'unico modo di sorvegliare la prima condizione di riapertura dell'ADR 005 (§3).
- **Controllo mensile** sul sito in produzione, confrontato con i valori di questo documento:
  - procedura del §6.2;
  - script e Lighthouse del §6.8, dall'Italia;
  - PageSpeed Insights sul dominio pubblico.

### 6.8 Hosting: header, compressione e TTFB dall'Italia (condizione C08)

**Perché.** In laboratorio il sito è servito in locale, senza rete vera (§6.1). Solo sull'host si vedono:
- la compressione che arriva davvero al browser. Il budget del documento (§3) vale solo con l'HTML compresso: la home pesa 133 KB non compressa, 20,8 KB con Brotli e 25,9 KB con gzip, contro un limite di 40 KB (build del 2026-09-28 alle 13:59);
- cache, protocollo e latenza reali.

**Quando e dove**

| Momento | Host | Valore dell'esito |
|---|---|---|
| Ora | Anteprima su Railway (ADR 004): progetto `itnode-anteprima`, regione europe-west4 (Amsterdam), https://itnode-sito-production.up.railway.app. Dal 2026-09-29 è aperta a chi ha il link e resta fuori dai motori di ricerca (`PREVIEW_AUTH=off`, decisione dell'utente) | Prova dell'opzione C dell'ADR 001 e misura di riferimento. Bloccante solo se la produzione resterà su Railway |
| Prima del cambio DNS | Staging dell'hosting di produzione scelto | **Bloccante per il go-live** (C08) |
| Il giorno del lancio, poi ogni mese | Produzione, `https://itnode.it` | Controllo, più PageSpeed Insights (§6.7) |

**Chi misura.** Una persona in Italia: l'utente o il cliente [DA DEFINIRE]. Dal 2026-09-29 l'anteprima è aperta (ADR 004): non servono credenziali, e allo script basta lasciare vuoto l'utente. Se la password verrà rimessa, valgono le istruzioni con le credenziali.
- L'ambiente di lavoro non raggiunge l'host: il proxy di rete rifiuta `*.up.railway.app` (403, verificato il 2026-09-28).
- web-performance-specialist legge l'output e scrive l'audit.

**Già verificato in locale** (rimisura del 2026-09-28, §9; commit `007956d`): `scripts/serve.mjs` applica `_headers`, comprime con Brotli e gzip all'avvio, risponde 304 con l'ETag e 206 alle richieste `Range`. Sull'host resta da vedere che cosa cambia l'infrastruttura davanti al server.
- **Edge di Railway e compressione: fonti discordanti.**
  - Una risposta dello staff di Railway, non datata, dice che il proxy non inoltra le risposte compresse.
  - La documentazione della CDN di Railway, che si attiva per servizio ed è spenta di default, dice che con la CDN attiva l'edge comprime da sé.
  - Un'osservazione di terzi (10 settembre 2026) riporta che con la CDN attiva la compressione dipende dall'ordine di `Accept-Encoding`: per questo lo script manda l'intestazione di Chrome.
  - Se l'HTML arrivasse non compresso, il limite del documento (§3) salterebbe su tutti i template.
- **Protocollo.** Railway documenta HTTP/1.1 e HTTP/2 verso internet e TLS 1.2 o superiore. HTTP/3 non risulta [DA VERIFICARE sull'anteprima].
- **Sospensione.** Con la modalità Serverless il servizio si ferma dopo 5–10 minuti senza traffico in uscita; la prima richiesta successiva è lenta e può rispondere 502.

#### Controlli su header e compressione

Valori attesi su qualsiasi host.
- **Bloccante:** blocca il go-live (C08).
- **Da correggere:** si corregge prima del lancio, senza bloccarlo.
- **Diagnostica:** si annota nell'audit.

| # | Richiesta | Atteso | Se non è così |
|---|---|---|---|
| H1 | HTML (`/`, `/siii/`, `/privacy-policy/`) con l'`Accept-Encoding` di Chrome | `content-encoding: br` (gzip o zstd ammessi: restano nel §3); byte trasferiti entro il limite del §3 per il template | Bloccante |
| H2 | HTML | `cache-control: public, max-age=0, must-revalidate` o `no-cache`, con `ETag` o `Last-Modified`; con `If-None-Match` risponde 304 | Bloccante: senza rivalidazione una nuova pubblicazione non arriva, oppure una pagina vecchia chiede asset che non esistono più |
| H3 | Asset con hash in `/_astro/`: JS, WOFF2, AVIF | `cache-control: public, max-age=31536000, immutable`; JS compresso; WOFF2 e AVIF senza `content-encoding` | Cache diversa: bloccante, perché il preload del font (ADR 005) conta sul font già in cache dalla seconda pagina. File binari ricompressi: da correggere |
| H4 | `/favicon.svg`, `/og/*`, `/brand/*` | `max-age=86400` | Da correggere |
| H5 | Risposte compresse | `vary: Accept-Encoding` | Da correggere |
| H6 | Protocollo | HTTP/2 (`HTTP/2 200`, ALPN `h2`); HTTP/3 (`alt-svc` con `h3`) preferibile | Senza HTTP/2: bloccante (ADR 001 §3.6, requisito 1). Senza HTTP/3: diagnostica |
| H7 | TLS | TLS 1.3 | Diagnostica: con TLS 1.2 ogni nuova connessione costa un RTT in più |
| H8 | `Range: bytes=0-1023` su un file binario: oggi il WOFF2, poi i file di `/video/` | 206, `content-range`, 1024 byte | Bloccante prima di pubblicare il video in `/video/`, perché Safari su iOS non lo riproduce; oggi diagnostica |
| H9 | `http://`, `www.` e URL senza barra finale | Arrivano al canonico con un solo 301; il canonico risponde 200 senza redirect | Da correggere se i salti sono più di uno: ogni salto si somma al TTFB. Le regole sono di seo-technical |
| H10 | Tutte | Nessun `set-cookie` | Da correggere, con cro-specialist e seo-technical (soglia 5 di CLAUDE.md) |
| H11 | Solo se l'anteprima è protetta: HTML e asset **senza** credenziali | 401 per tutti | Bloccante per un'anteprima protetta. Dal 2026-09-29 l'anteprima è aperta per decisione dell'utente (ADR 004): il controllo resta valido solo se la password verrà rimessa |

#### TTFB dall'Italia

- **Che cosa.** Il tempo tra la richiesta e il primo byte della risposta, su una connessione nuova: DNS, TCP, TLS e attesa. È la grandezza del TTFB di campo (CrUX, `web-vitals`), senza i redirect.
- **Da dove.** Almeno due reti in Italia: una fissa (fibra o FTTC) e una mobile (4G o 5G, anche l'hotspot di un telefono). Meglio se una delle due è in Puglia, dove ha sede il cliente [IPOTESI: una parte rilevante del pubblico è pugliese].
- **Campione.** 20 richieste a `/` per rete, una al secondo, ognuna su una connessione nuova. Si riportano mediana, 75° percentile e massimo.

| Misura | Obiettivo | Limite | Note |
|---|---|---|---|
| TTFB su rete mobile, 75° percentile | ≤ 0,6 s | ≤ 0,8 s | Come il §1. Sopra il limite il go-live è bloccato |
| TTFB su rete fissa, 75° percentile | ≤ 0,3 s | — | Diagnostica: oltre, si cerca la causa |
| Attesa oltre l'RTT (edge e server), mediana | ≤ 50 ms | — | Diagnostica: oltre 100 ms si controllano regione, instradamento e CPU del servizio |
| Prima richiesta dopo almeno 15 minuti senza traffico | ≤ 0,8 s, stato 200 | — | In produzione la sospensione del servizio va spenta: **bloccante**. Sull'anteprima: diagnostica |
| Da fuori Italia (ADR 004, se la produzione resta su Railway) | — | — | Diagnostica, con lo script da una postazione all'estero o con WebPageTest (punto 3): il pubblico è italiano |

#### Come si misura

**1. Script `curl`: il metodo principale.**
- Funziona su macOS e Linux; su Windows con WSL o Git Bash.
- Chiede utente e password all'avvio e li tiene in un file temporaneo privato: non finiscono nella cronologia della shell, nell'elenco dei processi né nell'output, che si può incollare nell'audit così com'è.
- Provato il 2026-09-28 su `scripts/serve.mjs` in locale con password, anche con `"` e `\` nella password, e su un host HTTPS pubblico.
- Si esegue una volta per rete: `bash hosting-check.sh https://itnode-sito-production.up.railway.app 20`.
- Per la prova della sospensione si esegue dopo almeno 15 minuti senza richieste all'host, e si legge la riga 1.
- La sessione principale può salvarlo in `scripts/perf/hosting-check.sh`.

```bash
#!/usr/bin/env bash
# Hosting check for G4 condition C08 (docs/performance/budget.md §6.8): headers, compression,
# protocol and cold TTFB, measured from the network the script runs on.
# Run it from Italy twice: on a fixed line and on a mobile connection (phone hotspot, 4G/5G).
# Usage:  bash hosting-check.sh <base-url> [runs]
#   e.g.  bash hosting-check.sh https://itnode-sito-production.up.railway.app 20
# Needs bash and curl 7.70+. The password is asked at run time and kept in a private temporary
# file: it never appears in the shell history or in the process list.
set -u
H="${1:?usage: bash hosting-check.sh <base-url> [runs]}"; H="${H%/}"; N="${2:-20}"
CFG=$(mktemp); RAW=$(mktemp); trap 'rm -f "$CFG" "$RAW"' EXIT; chmod 600 "$CFG"
read -r -p 'Utente (invio se il sito è pubblico): ' U
if [ -n "$U" ]; then
  read -r -s -p 'Password: ' P; echo
  printf 'user = "%s"\n' "$(printf '%s:%s' "$U" "$P" | sed 's/[\\"]/\\&/g')" > "$CFG"; unset P
fi
AE='Accept-Encoding: gzip, deflate, br, zstd'   # what Chrome sends
c() { curl -K "$CFG" -sS --max-time 30 "$@"; }
T='%{time_namelookup} %{time_connect} %{time_appconnect} %{time_starttransfer} %{http_code}\n'
pct() { sort -n | awk '{v[NR]=$1} END {if (NR) printf "mediana %.3f · p75 %.3f · max %.3f s (n=%d)\n", v[int((NR+1)/2)], v[int(NR*0.75+0.999)], v[NR], NR}'; }

echo "== $H · $(date '+%Y-%m-%d %H:%M %Z')"
# 1. First request: after 15+ minutes without traffic it shows a sleeping service waking up.
c -o /dev/null -H "$AE" -w "$T" "$H/" |
  awk '{printf "1. Prima richiesta: HTTP %s, TTFB %.3f s (se il sito era fermo da 15 minuti: tempo di risveglio)\n", $5, $4}'

PAGE=$(c --compressed "$H/")
FONT=$(printf '%s' "$PAGE" | grep -oE '/_astro/[A-Za-z0-9._-]+\.woff2' | head -1)
JS=$(printf '%s' "$PAGE" | grep -oE '/_astro/[A-Za-z0-9._-]+\.js' | head -1)
IMG=$(printf '%s' "$PAGE" | grep -oE '/_astro/[A-Za-z0-9._-]+\.avif' | head -1)

echo '2. Header e compressione (valori attesi: budget.md §6.8)'
for p in / /siii/ /privacy-policy/ "$JS" "$FONT" "$IMG" /favicon.svg; do
  [ -n "$p" ] || continue
  echo "   -- $p"
  c -o /dev/null -D - -H "$AE" -w 'trasferiti: %{size_download} byte\n' "$H$p" | tr -d '\r' |
    grep -iE '^(HTTP/|content-encoding|cache-control|etag|last-modified|vary|accept-ranges|alt-svc|strict-transport-security|set-cookie|server:|x-railway-edge|x-robots-tag|age:|x-cache|trasferiti)' |
    sed 's/^/      /'
done

ET=$(c -o /dev/null -D - -H "$AE" "$H/" | tr -d '\r' | awk 'tolower($1) == "etag:" {print $2}')
if [ -n "$ET" ]; then
  c -o /dev/null -H "$AE" -H "If-None-Match: $ET" -w "3. Rivalidazione dell'HTML con If-None-Match: HTTP %{http_code} (atteso 304)\n" "$H/"
else
  echo "3. Rivalidazione dell'HTML: nessun ETag (serve ETag o Last-Modified)"
fi
[ -n "$FONT" ] && c -o /dev/null -r 0-1023 -w "4. Range 0-1023 su un file binario: HTTP %{http_code}, %{size_download} byte (atteso 206 e 1024)\n" "$H$FONT"
printf '5. Connessione: '
c -v -o /dev/null "$H/" 2>&1 | grep -iE 'SSL connection using|ALPN.*accepted' | sed -E 's/^\* *//' | paste -s -d ';' -
echo
if [ -n "$U" ]; then
  printf '6. Senza credenziali (atteso 401 per tutti): '
  for p in / "$FONT" "$IMG"; do [ -n "$p" ] && curl -s -o /dev/null --max-time 30 -w "$p %{http_code}  " "$H$p"; done
  echo
fi
printf '7. Redirect: '
# After a redirect curl writes the credentials into url_effective: strip them before printing.
for u in "${H/https:/http:}/" "$H/siii"; do
  c -o /dev/null -L -w "$u → %{url_effective} (%{num_redirects} salti)  " "$u"
done | sed -E 's#://[^/@ ]*@#://#g'
echo

echo "8. TTFB a freddo: $N richieste a / (nuova connessione ogni volta, una al secondo)"
for i in $(seq "$N"); do c -o /dev/null -H "$AE" -w "$T" "$H/" >> "$RAW"; sleep 1; done
row() { printf '   %-38s ' "$1"; }
row 'TTFB (DNS + TCP + TLS + attesa)'; awk '{print $4}' "$RAW" | pct
row 'di cui DNS'; awk '{print $1}' "$RAW" | pct
row "RTT verso l'edge (handshake TCP)"; awk '{print $2 - $1}' "$RAW" | pct
row 'attesa dopo la connessione'; awk '{print $4 - ($3 > 0 ? $3 : $2)}' "$RAW" | pct
row "attesa oltre l'RTT (edge e server)"; awk '{print $4 - ($3 > 0 ? $3 : $2) - ($2 - $1)}' "$RAW" | pct
awk '$5 != 200 {n++} END {if (n) printf "   ATTENZIONE: %d risposte diverse da 200\n", n}' "$RAW"
echo '   Soglie (budget.md §6.8): rete mobile p75 ≤ 0,6 s (obiettivo) e ≤ 0,8 s (limite); rete fissa p75 ≤ 0,3 s (atteso).'
echo "Nell'audit: incolla questo output con città, operatore e tipo di rete (fibra, FTTC, 4G, 5G)."
```

**2. Lighthouse dalla stessa postazione** (con Node 22 e Chrome installati).
- È la procedura del §6.2, con le credenziali in un file di intestazioni da cancellare subito dopo.
- Provato il 2026-09-28 sul server locale con password: tutte le richieste passano (200), e FCP e LCP coincidono con il §7.1 (1,18 e 1,65 s).

```bash
read -r -s -p 'Password: ' P; echo
printf '{"Authorization":"Basic %s"}' "$(printf 'itnode:%s' "$P" | base64 | tr -d '\n')" > auth.json; unset P
for i in 1 2 3 4 5; do
  npx -y lighthouse@13.5.0 https://itnode-sito-production.up.railway.app/ --extra-headers=auth.json \
    --only-categories=performance --chrome-flags="--headless=new" --output=json --output-path=home-$i.json --quiet
done
rm auth.json   # it holds the password
```

Dove leggere i valori nel JSON:
- `audits['server-response-time'].numericValue`: attesa del server osservata sulla rete reale. Con il throttling simulato è il valore vero. Con `--throttling-method=devtools` comprende la latenza emulata (562,5 ms), quindi non serve per il TTFB;
- `audits['document-latency-insight'].details.items`: `usesCompression`, `serverResponseIsFast` (attesa ≤ 600 ms) e `noRedirects` devono valere `true`;
- `audits['network-requests'].details.items[].protocol`: `h2` per ogni richiesta;
- FCP e LCP, da confrontare con il §7.1: contano la forma e l'ordine di grandezza. La CPU di quella postazione non è la nostra: si annota `benchmarkIndex`.

**3. WebPageTest da Milano: facoltativo.**
- Il piano gratuito Starter offre 300 test al mese e circa 30 località, e Milano risulta tra queste [DA VERIFICARE al momento del test]. I test privati sono solo nel piano Pro.
- Impostazioni: Chrome, emulazione mobile (Moto G), connessione 4G, 5 esecuzioni, solo la prima visita. Credenziali nella scheda «Auth» [DA VERIFICARE che esista ancora].
- **Attenzione.** Il risultato è visibile a chiunque abbia il link, con le schermate dell'anteprima e i dettagli delle richieste, che possono comprendere le credenziali.
  - Con l'anteprima protetta: solo con una password temporanea, da cambiare subito dopo.
  - Serviva l'assenso di brand-strategist, perché le schermate mostrano testi non ancora confermati (ADR 002). Dal 2026-09-29 l'anteprima è comunque aperta a chi ha il link (ADR 004): il risultato del test non espone niente di più.

**4. PageSpeed Insights: sull'anteprima solo se è aperta.**
- Non gestisce l'autenticazione: con la password riceve 401.
- **Dal 2026-09-29 l'anteprima è aperta**, quindi chiunque può provarla dal browser su pagespeed.web.dev, senza chiave.
  - Dà i dati di laboratorio sull'host reale: LCP, compressione (`document-latency-insight`), protocollo, cache.
  - Non dà il TTFB dall'Italia: misura da un data center di Google scelto in base a chi lancia il test, per l'Europa nei Paesi Bassi [DA VERIFICARE].
  - Dall'ambiente di lavoro l'API risponde 429 (quota anonima esaurita, provato anche il 2026-10-07).
- In produzione serve anche per i dati di campo CrUX (se ci sono) e per il controllo mensile (§6.7).

**5. Pannello e registri di Railway** (sessione principale con il connettore Railway, oppure l'utente dal pannello).
- **Impostazioni del servizio:**
  - regione europe-west4;
  - modalità Serverless spenta, obbligatoria in produzione;
  - CDN spenta sull'anteprima, per prudenza: una pagina protetta non deve passare da una cache condivisa (incidente di Railway del 30 marzo 2026, in cui risposte autenticate sono state servite ad altri utenti).
  - Le richieste con `Authorization` non passano dalla cache della CDN: le misure sull'anteprima non la vedono. Se in produzione la CDN sarà attiva, si ripetono H1–H3 senza credenziali sul dominio pubblico, guardando `age` e `x-cache`.
- **Log HTTP delle richieste della prova** [DA VERIFICARE i nomi dei campi]:
  - `edgeRegion`;
  - `downstreamProto`, atteso HTTP/2;
  - `upstreamRqDuration`, il tempo del server: pochi millisecondi;
  - `totalDuration`;
  - `txBytes`: circa 21 KB per `/`, se la compressione arriva al browser.
- **Intestazioni di Railway.** `X-Railway-Edge` indica il punto di presenza che ha servito la richiesta. Con la richiesta `X-Railway-Debug: 1` l'edge aggiunge intestazioni sull'instradamento.

#### Esito e report

- **Audit** in `docs/performance/audit/AAAA-MM-GG-hosting-<host>.md`, con:
  - host e piano;
  - luogo, operatore e tipo di rete;
  - data e ora;
  - output completo dello script;
  - mediane di Lighthouse;
  - confronto con il §7.1 e con le tabelle di questo paragrafo.
- **C08, parte di performance, superata** quando:
  - H1, H2, H3 e H6 sono conformi, e anche H8 se il video è sull'host;
  - il TTFB su rete mobile è entro 0,8 s al 75° percentile;
  - in produzione la sospensione del servizio è spenta.
- Il resto di C08 spetta a seo-technical: 404, redirect, `http` e `www`, sottodomini tecnici, ADR 003, Search Console.

**Fonti web del §6.8.** Consultate il 2026-09-28 attraverso i risultati di ricerca, salvo dove indicato: le pagine di Railway e di WebPageTest non sono raggiungibili dall'ambiente.
- Railway, documentazione: [Specs & Limits](https://docs.railway.com/networking/public-networking/specs-and-limits), [Edge Networking](https://docs.railway.com/networking/edge-networking), [CDN](https://docs.railway.com/networking/cdn), [Serverless](https://docs.railway.com/reference/app-sleeping), [Logs](https://docs.railway.com/observability/logs), [Regions](https://docs.railway.com/deployments/regions.md), [Incident report del 30 marzo 2026](https://blog.railway.com/p/incident-report-march-30-2026-accidental-cdn-caching).
- Railway Help Station: [Compression not working on Railway, works on Local](https://station.railway.com/questions/compression-not-working-on-railway-work-05b6801b), [Add gzip by default or option to enable it on Railway's edge proxy](https://station.railway.com/feedback/add-gzip-by-default-or-option-to-enable-bcb38e00).
- Osservazione di terzi sulla CDN di Railway: [issue #149 di knakamura13/oc-food-recs](https://github.com/knakamura13/oc-food-recs/issues/149), del 2026-09-10, letta direttamente.
- WebPageTest: [prezzi (LogicMonitor)](https://www.logicmonitor.com/pricing/web-performance-optimization), [piano Starter (TrustRadius)](https://www.trustradius.com/products/catchpoint-webpagetest/pricing), [autenticazione (Web Performance Calendar, 2015)](https://calendar.perfplanet.com/2015/using-webpagetest-authentication/).
- PageSpeed Insights: [About PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about), [località dei server (Swift Performance)](https://swiftperformance.io/tldr/pagespeed-insights-server-locations/), [proxy per la Basic Auth (GitHub)](https://github.com/learntoswim/page-speed-proxy).
- Lighthouse 13.5.0: sorgente del pacchetto npm (`server-response-time`, `document-latency-insight`, flag `--extra-headers`), letto il 2026-09-28.

## 7. Misure di riferimento

### 7.1 Sito costruito (rimisura del 2026-09-28, commit `7c5f747`)

Sono la base per la regola del +10% del §8. Condizioni: quelle del §6.1, con Lighthouse 13.5.0, Chromium 141, `benchmarkIndex` 1642–2690 e build con il preload del font. Dettaglio e confronti in `docs/review/2026-09-28-sito-rimisura-performance-web-performance-specialist.md`.

**Per `/siii/` la base è il §7.4** dal 2026-10-08, e prima era il §7.3 (dal 2026-10-07): la porta della hero è l'immagine LCP. La riga di `/siii/` qui sotto resta come storico.

| URL (template) | Simulato: FCP / LCP (corse) | Applicato: FCP = LCP (corse) | TBT sim. / appl. | CLS | Peso, richieste | JS | Elemento LCP |
|---|---|---|---|---|---|---|---|
| `/` (T1) | 1,18 / 1,66 s (5) | 1,01 s (5) | 0 / 52 ms | 0 | 113,2 KB, 7 | 2,0 KB | riga dell'H1 |
| `/siii/` (T2) | 1,28 / 1,66 s (5) | 1,04 s (5) | 0 / 54 ms | 0 | 95,3 KB, 7 | 4,2 KB | statement della hero |
| `/puglia-digitale/` (T2) | 1,16 / 1,59 s (3) | 1,02 s (3) | 0 / 36 ms | 0 | 111,2 KB, 8 | 4,2 KB | descrittore dell'H1 |
| `/citta-digitali/` (T2) | 1,34 / 1,67 s (10) | 1,01 s (3) | 0 / 30 ms | 0 | 98,7 KB, 8 | 5,5 KB | sottotitolo della hero |
| `/contatti/` (T3) | 1,14 / 1,51 s (3) | 0,93 s (3) | 0 / 7 ms | 0 | 89,6 KB, 7 | 4,2 KB | H1 |
| T4 (privacy, cookie, 404) | 0,99–1,03 / 1,36–1,51 s (3) | — | 0 / — | 0 | 81,8–82,6 KB, 6 | 2,0 KB | paragrafo |

- **Il preload del font resta** (ADR 005): le righe della tabella restano la base di riferimento.
- **Rimisura C14 dopo il verdetto G4** (build del 2026-09-28 alle 14:20, contenuto di `f1b6780`). Home e `/siii/` sono invariate rispetto a questa tabella e a una build di controllo misurata in alternanza:
  - simulato: 1,18 / 1,65 s e 1,28 / 1,65 s;
  - applicato: 1,05 e 1,03 s su 9 corse;
  - CLS 0, anche durante la lettura;
  - 115,1 e 97,1 KB.
  - La base resta questa tabella. Dettaglio nella review della rimisura, sezione «Rimisura C14 dopo il verdetto G4».
- **Variante senza preload** (copia della stessa build, §3), da usare solo come confronto per le condizioni di riapertura dell'ADR 005:
  - `/`: simulato 1,51 / 1,66 s; applicato 0,86 s.
  - `/siii/`: simulato 1,51 / 1,51 s; applicato FCP 0,78 s e LCP 0,86 s.
- **INP**, caso peggiore: prima apertura del menu, mediana 128 ms e massimo 200 ms su 19 caricamenti. Le altre interazioni restano tra 32 e 112 ms.
- **Scroll:** nessun task oltre 50 ms. Main thread al 37–39% sulla home e al 25–31% su Città Digitali, con CPU 4x e motion attivo.
- **Pesi:** HTML 8,7–22,1 KB, di cui CSS inline 4,9–10,1 KB con Brotli; DOM 179–583 elementi; zero terze parti.

### 7.2 Prototipo del 2026-09-28

**Il prototipo:** scheletro Astro 7.3.5 costruito nella scratchpad con gli asset reali.
- HTML statico, CSS inline, uno script di reveal inline (IntersectionObserver).
- 12 sezioni di testo; foto con `astro:assets` (AVIF q50, WebP q75).
- Condizioni del §6.1.

| Variante | Throttling | FCP | LCP | CLS | Peso | Note |
|---|---|---|---|---|---|---|
| **G. Hero tipografica: Schibsted in preload, Fragment Mono** | simulato, mediana 5 | 0,90 s | 1,35 s | 0 | 72,5 KB, 3 richieste | TBT 0; HTML 1,8 KB; font 45,9 + 24,8 KB; LCP = blocco di testo dell'H1 |
| G | applicato, mediana 3 | 0,79 s | 0,79 s | 0,026 | | CLS dovuto allo swap dei due font (sovrastimato, §6.1) |
| A. Foto evento in hero con `priority` (font di prova) | simulato | 0,84 s | 1,51 s | 0 | 76 KB | variante scelta: AVIF 750w, 30 KB |
| B. Hero tipografica con preload (font di prova) | simulato / applicato | 0,84 / 0,82 s | 1,21 / 0,82 s | 0 / 0,013 | 47 KB | — |
| C. Come B, H1 con fade da `opacity: 0` (200 ms più 800 ms) | simulato / applicato | 0,88 / 0,82 s | 1,26 / **1,49 s** | 0 | 47 KB | **+0,66 s di LCP** visibili solo col throttling applicato |
| D. Come B, senza preload del font | simulato / applicato | **1,20** / 0,73 s | 1,21 / 0,73 s | 0,013 / 0,013 | 47 KB | risultati opposti: nel simulato il preload anticipa l'FCP di 0,36 s; nell'applicato lo ritarda di circa 0,1 s |
| E. Come B, H1 con ingresso solo `transform` | applicato | 0,82 s | 0,82 s | 0,013 | 47 KB | nessun ritardo |

**Immagini reali codificate con sharp 0.35.5** (KB per larghezza):

| Sorgente | AVIF q50 a 828 / 1080 / 1280 px | WebP q75 a 828 / 1080 px | Default di sharp (WebP q80) a 828 px |
|---|---|---|---|
| Evento Puglia Digitale (1365×768) | 33,5 / 49,6 / 61,3 | 56,1 / 78,7 | 66,3 |
| Fondatore, braccia conserte (1094×1438) | 34,6 / 47,4 / — | 53,2 / 72,7 | 63,7 |
| Fondatore, platea (1536×1024) | 28,5 / 40,4 / 50,2 | 43,6 / 61,6 | 52,1 |

- Confronto visivo con ingrandimento 2x su un volto: AVIF q50 è indistinguibile a 1x; q45 impasta la texture del tessuto; q60 costa +36%.
- **Default:** q50. q60 solo per i ritratti in primo piano, su richiesta di ui-designer.

### 7.3 Schermate SIII: `/siii/` con un'immagine LCP (2026-10-07, commit `d06a3e9` e `bae201c`)

Condizioni del §6.1: `scripts/serve.mjs`, Lighthouse 13.5.0, Chromium 141. Corse alternate:
- `d06a3e9` contro il commit precedente `09dcd17` (mattino; `benchmarkIndex` 1461–2919);
- `bae201c`, con il ritaglio in build della porta (`mobileCrop` 4:5 ancorato in basso), contro `d06a3e9` ricostruito (11:24–11:36 UTC; `benchmarkIndex` 1612–2623, carico 0,7–3,4).

Dettaglio, varianti e profili di rete: `docs/review/2026-10-07-schermate-siii-web-performance-specialist.md`, §§2–6 e §7.

**Base fino al 2026-10-08, `bae201c`** (poi la base di `/siii/` è il §7.4, con la schermata YES):

| URL | Simulato: FCP / LCP (corse) | Applicato: FCP / LCP (corse) | Desktop, simulato: FCP / LCP | TBT sim. / appl. | CLS | Peso, richieste | Immagini | Elemento LCP |
|---|---|---|---|---|---|---|---|---|
| `/siii/` (T2) | 1,27 / **1,80 s** (5) | 1,06 / **1,61 s** (6) | 0,32 / 0,40 s (3) | 0 / 55 ms | 0 | 125,4 KB, 8 | 27,2 KB (porta, ritaglio 4:5, 768w AVIF) | **porta della hero** (schermata della sala di Masseria Santella) |
| `/` (T1) | 1,17 / 1,65 s (3) | 1,04 / 1,04 s (3) | — | 0 / 64 ms | 0 | 117,2 KB, 7 (applicato: 136,3 KB, 8) | 19,5 KB (applicato: 38,6 KB) | riga dell'H1 |

**Storico, `d06a3e9`** (porta 3:5, senza ritaglio):

| URL | Simulato: FCP / LCP (corse) | Applicato: FCP / LCP (corse) | Desktop, simulato: FCP / LCP | TBT sim. / appl. | CLS | Peso, richieste | Immagini | Elemento LCP |
|---|---|---|---|---|---|---|---|---|
| `/siii/` (T2) | 1,25 / 1,80 s (5) | 1,02 / 1,70 s (6) | 0,31 / 0,40 s (3) | 0 / 40 ms | 0 | 132,1 KB, 8 | 34,0 KB (porta, 768w AVIF) | porta della hero |
| `/` (T1) | 1,19 / 1,73 s (5) | 1,02 / 1,02 s (3) | — | 0 / 47 ms | 0 | 116,4 KB, 7 (applicato: 135,5 KB, 8) | 19,5 KB (applicato: 38,6 KB) | riga dell'H1, come prima |

- **Ritaglio in build (`bae201c`)** contro `d06a3e9` ricostruito, nella stessa tornata:
  - LCP applicato 1,61 contro 1,73 s (−111 ms);
  - simulato allo stesso gradino (1,80 s);
  - desktop invariato;
  - porta di 27,2 KB invece di 34,0 al Moto G.
  - Sul 4G lento, Playwright: LCP 796 contro 936 ms a 1,75x, 1108 contro 1140 ms a 3x.
- **Home con `bae201c`:** sono cambiati il capitolo 02 (P4) e i nodi del capitolo 01, quindi il documento pesa +0,8 KB.
  - L'LCP resta il testo: 1,04 contro 1,00 s applicato (3 corse); simulato un gradino sotto. Nessuna regressione oltre il rumore.

- **`/siii/` rispetto al controllo** (testo come LCP): simulato 1,65 s, applicato 1,06 s.
  - L'aumento supera la regola del +10% del §8. È motivato: l'elemento LCP è cambiato per scelta di contenuto, e l'LCP resta sotto l'obiettivo di 2,0 s.
  - Sui profili 4G reali: 0,33–0,38 s con il 4G veloce, 0,92–1,10 s con il 4G lento.
- **Home:** stesse richieste del controllo. Con throttling applicato Chromium scarica in anticipo anche la schermata `lazy` del capitolo 01 (19,1 KB). L'LCP resta il testo (1,02 contro 1,03 s).
- **Immagine LCP per dispositivo, con `bae201c`** (tra parentesi `d06a3e9`):
  - 640w, 21,4 KB a 320 px e 2x (prima 768w, 33,6 KB);
  - 768w, 26,8 KB al Moto G di Lighthouse e fino a 2x (prima 33,6);
  - 1080w, 40,7 KB sui telefoni da 2,6x a 3x e sui tablet sotto 64em (prima 51,4 o 58,3 KB);
  - desktop invariato: 480w, 18,0 KB a 1x; 1080w, 51,4 KB a 2x.
  - Tutte dentro il §4.
- **Controlli statici:**
  - `bae201c`: superati tutti, n. 8 compreso;
  - `d06a3e9`: n. 8 non superato per il primo esempio, poi corretto in `d3eba9c` con larghezze fino a 1440 px.

### 7.4 Schermata YES nella hero di `/siii/` (2026-10-08, commit `1112c93`)

**Cosa cambia.** La porta mostra la schermata del negozio YES (1200 × 2000), con il ritaglio 4:5 ancorato in alto sotto 64em, la compressione del sito e le larghezze predefinite. Le altre pagine sono identiche byte per byte al controllo.

**Condizioni del §6.1.** `scripts/serve.mjs`, Lighthouse 13.5.0, Chromium 141.
- 28 corse alternate tra `1112c93` e il controllo `aaf4760` (14:39–14:47 UTC, `benchmarkIndex` 1585–2181, carico 0,8–2,0). Per `/siii/` il controllo è uguale a `bae201c`: sala di Masseria Santella, ritaglio in basso.
- Playwright per varianti, elemento LCP e profili di rete.
- Dettaglio: `docs/review/2026-10-08-hero-siii-yes-web-performance-specialist.md`.

**Base attuale, `1112c93`:**

| URL | Simulato: FCP / LCP (corse) | Applicato: FCP / LCP (corse) | Desktop, simulato: FCP / LCP | TBT sim. / appl. | CLS | Peso, richieste | Immagini | Elemento LCP |
|---|---|---|---|---|---|---|---|---|
| `/siii/` (T2) | 1,25 / **1,80 s** (5) | 1,06 / **1,71 s** (6) | 0,32 / 0,40 s (3) | 0 / 68 ms | 0 | 133,0 KB, 8 | 34,8 KB (porta, ritaglio 4:5 in alto, 768w AVIF) | **porta della hero** (schermata del negozio YES), salvo le viewport del §2 |

- **Controllo nella stessa tornata:** simulato 1,26 / 1,81 s; applicato 1,08 / 1,61 s; desktop 0,31 / 0,40 s; 125,4 KB e 27,2 KB di porta.
- **Regola del +10% del §8:** con throttling applicato l'LCP cresce del 6% (+100 ms). La differenza viene tutta dal download della porta (963–1000 contro 882–890 ms); il simulato resta sullo stesso gradino del modello.
- **Immagine LCP per dispositivo** (tra parentesi il controllo):
  - 640w, 27,3 KB (21,4): 320 px a 2x, tablet a 1,5x;
  - 768w, 34,3 KB (26,8): da 375 a 412 px a 1,75–2x, Moto G compreso;
  - 1080w, 54,0 KB (40,7): telefoni da 2,6x a 4x, telefono in orizzontale, tablet a 2x sotto 64em. È la variante con meno margine: 6,0 KB;
  - desktop con la schermata intera (`1112c93`): 480w, 24,7 KB (18,0) a 1x; 768w, 46,6 KB (33,6) a 1,25–1,5x; 1080w, 72,7 KB (51,4) a 2x; 1200w, 83,7 KB (58,3) solo oltre 2,6x;
  - **desktop con il derivato 3:5 di 1014 × 1690 (dal commit `2178f47`, verificato su 17 casi):**
    - 480w, 22,2 KB a 1x; 768w, 41,8 KB a 1,25–1,5x; 1014w, 60,4 KB da 2x in su, compresi gli iPad Pro a 2x;
    - oltre 2,44x è sotto risoluzione: 97% dei pixel necessari a 2,5x, 89% a 2,75x, 81% a 3x;
    - telefoni: stessi file di `1112c93`, byte per byte;
  - WebP di ripiego: 40,7–76,8 KB sui telefoni, fino a 82,4 KB su desktop (112,8 KB con la schermata intera).
  - Tempi di `1112c93` non rimisurati: sui telefoni i file sono gli stessi, su desktop l'immagine pesa meno a ogni densità.
  - Tutte dentro il §4.
- **Ancoraggio.** Con il ritaglio in basso la 1080w peserebbe 64,2 KB, oltre il §4: servirebbe una qualità per formato (`architettura.md` §3.2).
- **Elemento LCP:** la porta in 22 casi su 24 dispositivi. Sulle viewport basse e col telefono in orizzontale è il testo (§2). Lì, con la rete di laboratorio e CPU 4x, LCP = FCP (1,02–1,09 s) in 9 caricamenti su 9.
- **Profili di rete** (Playwright, mediane di 5 caricamenti, LCP di YES e del controllo):
  - laboratorio di Lighthouse: 1800 contro 1664 ms a 1,75x; 2040 contro 1980 ms a 3x;
  - 4G veloce: 384 contro 404 ms a 1,75x; 460 contro 464 ms a 3x;
  - 4G lento: 1116 contro 796 ms a 1,75x (su 13 caricamenti 948 contro 800 ms, per l'effetto descritto nel §3); 1160 contro 1120 ms a 3x.
  - A 3x, con la rete di laboratorio, l'LCP è 2,04 s: 40 ms sopra l'obiettivo di 2,0 s, mentre il controllo era a 1,98 s. L'obiettivo del §2 si misura sul dispositivo di Lighthouse (1,75x), dove è rispettato, e il limite di 2,5 s resta lontano.
- **Finestra del ripiego** (§3): 447 ms a 1,75x e 464 ms a 3x sul 4G lento, sotto la soglia di 600 ms.
- **Controlli statici:** superati tutti, n. 8 compreso.

## 8. Eccezioni e modifiche

- **Owner.** Il budget lo modifica solo web-performance-specialist.
- **Eccezioni.** Un'eccezione, per esempio un terzo font, uno script di terze parti o un'immagine fuori limite, richiede:
  - un ADR con il costo misurato e l'alternativa scartata;
  - il parere di creative-director se tocca l'identità.
- **Regressioni.** Se una modifica peggiora LCP o INP di oltre il 10% rispetto all'audit precedente, va giustificata anche se resta sotto il limite.

## Ipotesi da validare
- **Superata il 2026-10-07:** l'ipotesi «nessuna pagina avrà una foto come LCP». Dal commit `d06a3e9` l'LCP di `/siii/` è la porta della hero (§7.3), e valgono la riga «Immagine LCP» del §4 e le righe «Immagine LCP» del §2.
- [IPOTESI: sulle altre pagine l'LCP resta testo. È verificato sulla Home il 2026-10-07, mentre Puglia Digitale e Città Digitali non sono state rimisurate dopo le foto e le carte del 2026-10-06. Va controllato al primo audit.]
- [IPOTESI: su HTTP/2, all'host reale, `fetchpriority="high"` anticipa l'immagine LCP rispetto al font più di quanto si veda in laboratorio (HTTP/1.1). Da verificare sull'anteprima, per la finestra del ripiego (§3).]
- [IPOTESI: il blocco del rendering dovuto al preload del font (§3, ADR 005) riguarda Chrome, quindi i dati CrUX. Su Safari per iOS l'effetto del preload non è misurato.]
- [IPOTESI: le misure sull'anteprima fatte con le credenziali passano dall'edge di Railway ma non dalla sua CDN, perché le richieste con `Authorization` non vanno in cache (§6.8). Rappresentano quindi una produzione su Railway senza CDN.]
- [DA VERIFICARE sull'anteprima (§6.8): l'edge di Railway inoltra la compressione del server; HTTP/2 attivo; modalità Serverless spenta.]
- [DA VERIFICARE: CLS dello swap dei font su un Android di fascia media reale (Roboto) e su iPhone (Helvetica Neue). In laboratorio, con Liberation Sans, è 0–0,002.]
- [DA VERIFICARE: INP della prima apertura del menu su un Android di fascia media reale (in laboratorio fino a 200 ms).]
- [DA VERIFICARE: altezza visibile di un iPhone SE in Safari, con le barre del browser, stimata intorno ai 550 px. Se è sotto i 600 px, su quel telefono l'LCP di `/siii/` è il testo e non la porta (§2). Il RUM `web-vitals`, se adottato, lo dirà con l'elemento LCP per dispositivo.]

## Domande aperte
1. È disponibile un Android di fascia media per una verifica sul campo prima del lancio, oppure un servizio di test su dispositivi reali?
2. Il cliente ha un accesso a Search Console per i dati sul campo del sito attuale? Per l'anteprima aperta basta PageSpeed Insights dal browser; la chiave API serve solo per automatizzare.
3. Chi esegue in Italia le verifiche sull'hosting del §6.8, e da quali reti (una fissa e una mobile, meglio se una in Puglia)?

## Decisioni richieste
- **Utente:**
  - hosting di produzione (ADR 001; condizione C08): le verifiche del §6.8 si ripetono sullo staging dell'host scelto;
  - chi misura dall'Italia (domanda 3). Con l'anteprima aperta (dal 2026-09-29) non servono credenziali, e si può usare anche PageSpeed Insights dal browser (§6.8, punto 4).
- **brand-strategist:** superata la richiesta di assenso per WebPageTest. Con l'anteprima aperta per decisione dell'utente (ADR 004), il risultato del test non espone niente di più.
- **cro-specialist:** RUM `web-vitals` senza cookie dopo il lancio, sì o no, da inserire nell'ADR sull'analytics. Serve per l'INP del menu, per il TTFB reale e per la prima condizione di riapertura dell'ADR 005 (nota del §3).
- **creative-director:** nessuna decisione aperta sulla performance.
  - Hero di `/siii/` con la schermata YES (2026-10-08): il ritaglio ancorato in alto sta nel §4 con i valori del sito. Se si preferisse l'ancoraggio in basso, servirebbero una qualità per formato e una nuova misura (review del 2026-10-08, osservazione 1).
  - Chiuse il 2026-10-07:
    - porta con la sala, ritaglio 4:5 ancorato in basso (superata il 2026-10-08 dalla schermata YES, ancorata in alto);
    - finestra del ripiego accettata, con la soglia di sorveglianza di 600 ms dell'ADR 005, versione 1.3;
    - 6 corse per variante, nell'ADR 005 versione 1.2.
- **ui-designer:** chiuso. La patch della sorgente AVIF per gli schermi da 1,5 dppx in su è applicata (`d4511be`) e verificata (review del 2026-10-07, §8).
- **Sessione principale:**
  - fatto:
    - primo esempio di `/siii/` fino a 1440 px (`d3eba9c`);
    - patch `mobileCrop` di `Media.astro` (`bae201c`);
    - sorgente AVIF per gli schermi da 1,5 dppx in su (`d4511be`);
  - creare prima del lancio `scripts/perf/lighthouse.mjs` e `checks.mjs` (§6), con il comando del controllo n. 8 del §6.3 e i controlli Playwright del §6.4 (reveal fotogramma per fotogramma e CLS durante la lettura);
  - far misurare la finestra del ripiego di `/siii/` sul 4G lento in HTTP/2, sull'anteprima aperta o sullo staging (soglia di 600 ms, §3), da una postazione che raggiunge l'host:
    - con lo script Playwright della review del 2026-10-07 (§7, `profiles2.mjs`, Node 22 e Playwright);
    - oppure con la filmstrip di WebPageTest, profilo 4G.
  - durante la prova dall'Italia, leggere con il connettore Railway i log HTTP (§6.8, punto 5).
  - Fatto: `scripts/perf/hosting-check.sh` è salvato; le impostazioni del servizio Railway sono lette e conformi (regione `europe-west4-drams3a`, una replica, modalità Serverless spenta, nessuna CDN); il server di misura c'è già (`scripts/serve.mjs`, con le richieste `Range` dal commit `007956d`); `.perf/` è in `.gitignore`.
