---
titolo: Review di performance · Hero di /siii/ con la schermata del negozio YES
owner: web-performance-specialist
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-08
fonti: [commit 1112c93 (schermata YES nella hero di /siii/), commit 9118087 (solo memorie, nessun effetto sulla build), commit 7326a1e (prop quality di Media, poi tolta), docs/performance/budget.md (0.6, aggiornato a 0.7), docs/performance/architettura.md (0.4, aggiornato a 0.5), docs/decisioni/005-preload-del-font.md (1.3), docs/review/2026-10-07-schermate-siii-web-performance-specialist.md, dist/ dello staging del 2026-10-08 alle 14:34 (identica alla build di 1112c93 fatta in un worktree), build di controllo aaf4760, misure Lighthouse 13.5.0 e Playwright 1.56.1 del 2026-10-08 (14:37–14:54 UTC), sharp 0.35.5 del progetto, sorgente di Astro 7.3.5 (assets/services/sharp.js, assets/utils/hash.js)]
---

# Review di performance · Hero di `/siii/` con la schermata YES

**Oggetto.** Il commit `1112c93` mette nella porta della hero di `/siii/` la schermata del negozio YES (1200 × 2000), inviata dall'utente il 2026-10-08.
- Sotto 64em il ritaglio 4:5 è ancorato in alto. La compressione è quella del sito (AVIF 50, WebP 75, JPEG 75), con le larghezze predefinite.
- La prop `quality` di `Media`, aggiunta in `7326a1e`, è tolta.
- La porta è l'immagine LCP della pagina, con `priority`.

Rispondo alle richieste della sessione principale:
1. budget e controllo n. 8, con il mio giro completo: varianti per dispositivo, controlli statici, Lighthouse, profili di rete;
2. parere sul meccanismo della prop `quality`;
3. aggiornamento del budget, con la nota sulle viewport dove l'LCP è il testo.

Non ho modificato `src/` e non propongo patch: non servono.

**In breve.**
- **Budget rispettato e controllo n. 8 vuoto.**
  - Porta da 27,3–54,0 KB sui telefoni (limite 60 KB) e da 24,7–72,7 KB su desktop fino a 2x (limite 150 KB).
  - Tutti i controlli statici superati.
- **LCP di `/siii/` dentro l'obiettivo sul dispositivo di riferimento.**
  - Simulato: 1,80 s, come il controllo.
  - Throttling applicato: 1,71 s contro 1,61 s del controllo, cioè +6%, sotto la regola del +10%.
  - Desktop 0,40 s; CLS 0; 133,0 KB e 8 richieste.
- **Finestra del carattere di ripiego sotto la soglia** di 600 ms dell'ADR 005 1.3: 447 ms a 1,75x e 464 ms a 3x sul 4G lento.
- **Un effetto nuovo, non bloccante (osservazione 2).**
  - Sul 4G lento la porta, più pesante di prima, arriva insieme al font in preload.
  - Lo scambio di carattere ricalcola il layout di tutta la pagina in un task di 157–172 ms con CPU 4x, e a volte rimanda il disegno della porta.
  - Su 13 caricamenti a 1,75x, l'LCP mediano è 948 ms contro 800 ms del controllo: lontano da 2,0 s.
- **Elemento LCP.**
  - La porta su 22 dispositivi su 24.
  - Sotto 600–640 px di altezza visibile in verticale, e col telefono in orizzontale, l'LCP è il testo, con LCP = FCP. La nota è aggiunta al budget.
- **Ancoraggio (osservazione 1).**
  - In alto il ritaglio sta nel budget, con 6,0 KB di margine a 1080w.
  - In basso peserebbe 64,2 KB, e servirebbe una qualità per formato: AVIF 48 o 46.
- **La prop `quality` era il meccanismo giusto,** ed è giusto averla tolta: con questa immagine non serve (§3).

## 1. Condizioni di test

- **Build misurata:** `1112c93`, costruita in un worktree della scratchpad.
  - È identica byte per byte alla `dist/` dello staging (build delle 14:34, servita da `astro preview` su 4321). L'ho copiata senza fermarla né ricostruirla.
  - `9118087` cambia solo le memorie.
- **Controllo:** `aaf4760`, il commit prima del cambio di hero. Per `/siii/` è uguale a `bae201c`, la base del `budget.md` §7.3: sala di Masseria Santella, ritaglio 4:5 in basso.
  - Rispetto al controllo cambiano solo `/siii/index.html` e i file della porta.
  - Le altre 7 pagine sono identiche byte per byte, quindi non servono rimisure altrove.
- **Server:** `scripts/serve.mjs` (ADR 004: Brotli e header di produzione) su porte mie, 8103 e 8104. Non ho misurato su `astro preview`, che non comprime (`budget.md` §6.1).
- **Lighthouse 13.5.0**, Chromium 141, preset mobile predefinito (Moto G Power, 412×823, 1,75x) e preset desktop.
  - 28 corse alternate con il controllo, 14:39–14:47 UTC.
  - `benchmarkIndex` 1585–2181, carico 0,8–2,0.
- **Playwright 1.56.1:**
  - variante scaricata, peso, `sizes` ed elemento LCP su 24 dispositivi, con un contesto nuovo e senza cache per ogni caso;
  - elemento LCP su 26 viewport basse o in orizzontale; su 3 di queste, LCP e FCP con la rete di laboratorio e CPU 4x;
  - tre profili di rete con la CPU rallentata, 5 caricamenti per variante, alternati:
    - laboratorio di Lighthouse: 562,5 ms di latenza, 1,47 Mbit/s, CPU 4x;
    - 4G veloce: 40 ms, 9 Mbit/s, CPU 2x;
    - 4G lento: 150 ms, 1,6 Mbit/s, CPU 4x;
  - sul 4G lento a 1,75x, altri 8 caricamenti per variante con i task lunghi, e 2 tracce del main thread.
- **Codifiche:** sharp 0.35.5 del progetto, con i parametri di Astro. Riproduce al decimo di KB i file della build.
- **Limiti:**
  - il server locale va in HTTP/1.1, quindi le priorità di HTTP/2 (`fetchpriority`) non si vedono;
  - l'anteprima su Railway resta irraggiungibile da qui.

## 2. Budget e controllo n. 8 (domanda 1)

### 2.1 Immagine LCP: variante scaricata e peso per dispositivo (`budget.md` §4)

Playwright, un contesto nuovo per caso, senza cache. Tra parentesi il controllo (sala di Masseria Santella).

| Dispositivo (viewport, densità) | Pixel necessari | Sorgente e variante | AVIF | WebP di ripiego |
|---|---|---|---|---|
| Telefono 320×568 a 2x; tablet Android 800×1280 a 1,5x | 575–624 | ritaglio 4:5, 640w | **27,3 KB** (21,4) | 40,7 KB |
| Telefoni da 375 a 412 px a 1,75–2x (Moto G di Lighthouse compreso) | 648–670 | ritaglio 4:5, 768w | **34,3 KB** (26,8) | 51,0 KB |
| Telefoni da 2,6x a 4x (360, 390, 393, 412, 430 px), telefono in orizzontale a 3x, tablet a 2x sotto 64em (768 e 820 px) | 832–1285 | ritaglio 4:5, 1080w | **54,0 KB** (40,7) | 76,8 KB |
| Desktop a 1x, da 1024 a 2560 px | 382–416 | intera 3:5, 480w | 24,7 KB (18,0) | 36,0 KB |
| Desktop a 1,25x e 1,5x (Windows al 125% e al 150%) | 520–624 | intera 3:5, 768w | 46,6 KB (33,6) | 66,7 KB |
| Desktop a 2x (1440 e 2560 px), iPad Pro 12,9 in verticale e tablet in orizzontale a 2x | 764–832 | intera 3:5, 1080w | 72,7 KB (51,4) | 100,1 KB |
| Solo da 64em con densità oltre 2,6x | oltre 1080 | intera 3:5, 1200w | 83,7 KB (58,3) | 112,8 KB |

- **Budget dell'immagine LCP rispettato.** Fino a 54,0 KB su ogni telefono (limite 60 KB) e fino a 83,7 KB su desktop (limite 150 KB).
- **Il margine è sottile solo a 1080w: 6,0 KB.** È la variante di tutti i telefoni da 2,6x in su: gli iPhone a 3x e gli Android con schermo Full HD o superiore (osservazione 1).
- **Rispetto al controllo:**
  - +7,5 KB al Moto G e +13,3 KB a 3x;
  - +6,7 KB su desktop a 1x e +21,3 KB su desktop a 2x;
  - varianti scelte uguali in 24 casi su 24.
- **Browser senza AVIF** (iOS 15 e precedenti): WebP fino a 76,8 KB sui telefoni. La pagina resta nel limite «Immagini» del §3 (150 KB) e nel peso totale.
- **`sizes`:** tutto entro la regola dell'`architettura.md` §3.3.
  - Da 0 a +1% sui telefoni e sui desktop da 1280 px.
  - −3% col telefono in orizzontale, dove la porta è sotto la piega e non è l'LCP.
  - +9% a 1024 px, già noto (review del 2026-10-07, §3.2): a 2x fa scegliere la 1080w al posto della 768w (72,7 invece di 46,6 KB).
- **JPEG:** fino a 174,5 KB. Lo `src` di ripiego (1200w, 174,5 KB) non viene scaricato dai browser con `srcset`.

### 2.2 Controlli statici (`budget.md` §6.3)

| # | Esito |
|---|---|
| 1 | Superato: un solo `fetchpriority="high"`, sulla porta di `/siii/`, senza `lazy`. Le altre pagine ne hanno 0 |
| 2–7 | Superati. Il n. 7 dà `1 1` in 8 pagine su 8, con 2 file `.woff2` |
| 8 | **Superato: vuoto.** Il file più vicino al limite è il WebP desktop da 1200w, 112,8 KB contro 200. Nessuna foto in `public/` |

- **Nessuno spostamento del layout al caricamento** (CLS 0 in tutte le corse, §2.3):
  - l'`<img>` ha `width="1200" height="2000"`;
  - le sorgenti del ritaglio hanno `width="1080" height="1350"`.

### 2.3 Tempi e pesi (Lighthouse, corse alternate)

| Pagina e metodo | Corse | YES (`1112c93`) | Controllo (`aaf4760`) | Budget |
|---|---|---|---|---|
| `/siii/` mobile, simulato: FCP / LCP | 5 | 1,25 / **1,80 s** (1,65–1,80) | 1,26 / 1,81 s (1,65–1,86) | LCP ≤ 2,0 s obiettivo, ≤ 2,5 s limite |
| `/siii/` mobile, applicato: FCP / LCP | 6 | 1,06 / **1,71 s** (1,68–1,80) | 1,08 / 1,61 s (1,60–1,64) | idem |
| `/siii/` desktop, simulato: FCP / LCP | 3 | 0,32 / 0,40 s (0,40–0,50) | 0,31 / 0,40 s | idem |

- **TBT:** 0 con il simulato; 68 ms con l'applicato (controllo 79 ms). **CLS:** 0 in tutte le corse. **Punteggio:** 99–100.
- **Pesi al caricamento:**
  - mobile: 133,0 KB e 8 richieste, di cui 34,8 KB per la porta (768w AVIF, peso trasferito). Controllo: 125,4 KB, porta da 27,2 KB;
  - desktop: 123,3 KB, porta da 25,1 KB (480w). Controllo: 116,6 KB, porta da 18,4 KB;
  - limiti del T2: totale 300 KB, immagini 150 KB, 18 richieste.
- **Righe «Immagine LCP» del `budget.md` §2** (throttling applicato, 6 corse):
  - inizio della richiesta rispetto alla fine del documento: da −25 a +14 ms (limite +50 ms). Il preload scanner trova la porta come prima;
  - ritardo di rendering: 49–111 ms, mediana 62 ms (limite 200 ms, obiettivo 100 ms; una corsa su 6 sopra l'obiettivo). Controllo: 42–56 ms;
  - download: 963–1000 ms contro 882–890 ms del controllo.
- **Regola del +10% (`budget.md` §8).**
  - Con throttling applicato l'LCP cresce di 100 ms, cioè del 6%: sotto la regola. Il simulato resta sullo stesso gradino del modello.
  - La differenza viene quasi tutta dal download: 7,6 KB in più, che si dividono la banda con il font in preload.

### 2.4 Profili di rete e finestra del carattere di ripiego (ADR 005 1.3)

Playwright, mediane di 5 caricamenti per variante, alternati.

| Profilo | Viewport | LCP YES | LCP controllo | Porta scaricata | Ripiego visibile, YES / controllo |
|---|---|---|---|---|---|
| Laboratorio di Lighthouse | 412 a 1,75x | 1800 ms | 1664 ms | 768w, 34,3 KB | 916 / 834 ms |
| Laboratorio di Lighthouse | 390 a 3x | 2040 ms | 1980 ms | 1080w, 54,0 KB | 934 / 951 ms |
| 4G veloce | 412 a 1,75x | 384 ms | 404 ms | 768w | 54 / 0 ms |
| 4G veloce | 390 a 3x | 460 ms | 464 ms | 1080w | 0 / 0 ms |
| 4G lento | 412 a 1,75x | 1116 ms (948 ms su 13 caricamenti) | 796 ms (800 ms su 13) | 768w | **447** / 394 ms |
| 4G lento | 390 a 3x | 1160 ms | 1120 ms | 1080w | **464** / 428 ms |

- **Soglia dell'ADR 005 1.3 rispettata in laboratorio:** 447 e 464 ms sul 4G lento, contro 600 ms.
  - Il caso singolo più alto è di 547 ms.
  - La prova formale resta da fare sull'host, in HTTP/2.
- **4G veloce:** nessuna differenza apprezzabile.
- **A 3x con la rete di laboratorio l'LCP è 2,04 s,** 40 ms sopra l'obiettivo di 2,0 s; il controllo era a 1,98 s.
  - L'obiettivo del budget si misura sul dispositivo di Lighthouse (1,75x), dove è rispettato con tutti e due i metodi. Il limite di 2,5 s resta lontano.
  - È lo stesso ordine di grandezza della review del 2026-10-07: 1968 ms a 3x, con la porta 3:5 intera.
- **4G lento a 1,75x.** La mediana di 5 caricamenti (1116 ms) è gonfiata da una distribuzione bimodale (osservazione 2). Con 13 caricamenti la mediana è 948 contro 800 ms.

### 2.5 Elemento LCP: viewport basse e telefono in orizzontale

Playwright su 26 viewport, senza throttling. Conta solo la geometria della hero, uguale con qualunque immagine: col controllo i risultati sono gli stessi.

| Viewport | Porta: inizio (y) e parte visibile | Elemento LCP |
|---|---|---|
| 320×568, 320×580, 320×600, 320×620 a 2x | da y 567–569; 1–51 px | riga più grande dello statement (17 388 px²) |
| 320×640 e 320×667 | 71 e 98 px | porta |
| 360×568, 360×580, 360×600 | da y 546; 22–54 px | statement |
| 360×620, 360×640, 360×667 | 74–121 px | porta |
| 375×568, 375×580 | da y 548; 20 e 32 px | statement (14 427 px²) |
| 375×600 e oltre | 52 px e più | porta |
| Telefono in orizzontale: 568×320, 640×360, 667×375, 740×360, 780×360, 844×390, 915×412, 932×430 a 3x | 0 px, sotto la piega | nome «SIII» |

- **Confine.** Sui telefoni in verticale la porta è l'LCP con almeno 600–640 px di altezza visibile, secondo la larghezza. Sotto, e su ogni telefono in orizzontale, l'LCP è il testo della hero.
- **Quali telefoni.** L'LCP è testuale dove il browser lascia poco spazio verticale: un Android con lo schermo di 640 dp meno la barra dell'indirizzo, e probabilmente un iPhone SE in Safari [DA VERIFICARE: altezza visibile stimata intorno ai 550 px].
- **Dispositivo di riferimento.** Il dispositivo di Lighthouse (412×823) e i telefoni con uno schermo alto hanno la porta come LCP. Sui 24 dispositivi del §2.1 è così in 22 casi; fanno eccezione 320×568 e il telefono in orizzontale.
- **LCP testuale = FCP.** Con la rete di laboratorio e CPU 4x, a 320×568, 375×580 e 844×390, LCP = FCP (1,02–1,09 s) in 9 caricamenti su 9. La riga LCP − FCP del budget vale 0 ms.
- **Correzione.** La review del 2026-10-07 diceva «19 viewport su 19, da 320 a 2560 px»: era giusto per quelle viewport, tutte alte almeno 640 px. Ho aggiunto il confine al `budget.md` §2 e all'`architettura.md` §3.2.
- **Conseguenze sul codice: nessuna.**
  - `priority` resta giusto, perché sulle altre viewport la porta è l'LCP: con `lazy` l'LCP peggiorerebbe di circa 270 ms (review del 2026-10-07, §3.1).
  - Dove l'LCP è il testo, l'immagine divide comunque la banda con il font in preload.

## 3. La prop `quality` di `Media` (domanda 2)

Aggiunta in `7326a1e` e tolta in `1112c93`, perché la schermata YES sta nel budget con i valori del sito. Il parere serve per la prossima immagine che non ci stesse, per esempio la YES con il ritaglio ancorato in basso (osservazione 1).

- **Il meccanismo era quello giusto.**
  - In Astro 7.3.5 `getImage` passa a sharp un solo parametro di codifica per immagine: `quality`. Il servizio sharp lo unisce alle opzioni di `astro.config.mjs` per quel formato, quindi per il JPEG `mozjpeg` resta attivo (`resolveSharpEncoderOptions` in `node_modules/astro/dist/assets/services/sharp.js`).
  - Serve un valore per formato. I valori del sito sono diversi (AVIF 50, WebP 75, JPEG 75) e `<Picture>` accetta una sola qualità per tutti i formati: per questo la prop attivava il `<picture>` costruito a mano, come `mobileCrop`.
  - Nessun effetto sul resto del sito.
    - Sulla build di `7326a1e` le altre 7 pagine erano identiche byte per byte alla build precedente, e le altre immagini avevano gli stessi nomi di file.
    - Il nome dipende da `src`, `width`, `height`, `format`, `quality`, `fit`, `position` e `background` (`utils/hash.js`); per le altre immagini `quality` resta indefinita.
- **Le alternative suggerite non si applicano a una sola immagine.** `chromaSubsampling` ed `effort` sono opzioni del servizio sharp in `astro.config.mjs` e valgono per tutto il sito.
  - Per una sola immagine servirebbe un servizio d'immagine personalizzato, che legga un'opzione in più e la aggiunga a `propertiesToHash`: senza, due codifiche diverse della stessa immagine avrebbero lo stesso nome di file.
  - Applicate a tutto il sito cambierebbero ogni AVIF e i tempi di build. Il 4:2:0 era già stato misurato il 2026-10-07: dal 2 al 4% in meno sulle schermate SIII. Non conviene.
- **Condizioni d'uso, se servirà di nuovo** (ora nell'`architettura.md` §3.2):
  - prima ancoraggio, ritaglio e larghezze, poi la qualità;
  - il valore accanto all'immagine, in `src/data/media.ts`, e una nuova misura a ogni cambio d'immagine;
  - controllo anche del WebP di ripiego, che con le trame fitte è il formato più vicino al controllo n. 8.
- **Non valutato:** quali valori convengano a parità di peso, con un confronto SSIM. Con la schermata YES non serve.

## 4. Osservazioni

### 1. [IMPORTANTE] L'ancoraggio del ritaglio è un vincolo di peso, non solo d'inquadratura
- **Dove:** `src/pages/siii.astro`, porta della hero, `mobileCrop.position: 'top'`.
- **Problema.** Peso della 1080w per ancoraggio, con i valori del sito (sharp del progetto, che riproduce la build al decimo di KB):

  | Ancoraggio | AVIF 480 / 640 / 768 / 1080w | WebP 1080w |
  |---|---|---|
  | In alto (oggi) | 18,5 / 27,3 / 34,3 / **54,0 KB** | 76,8 KB |
  | Al centro | 20,1 / 30,1 / 37,3 / **59,4 KB** | 81,9 KB |
  | In basso | 21,5 / 32,3 / 40,7 / **64,2 KB** | 89,0 KB |

  - Solo l'ancoraggio in alto lascia margine (6,0 KB).
  - Al centro si sta nel limite per 0,6 KB.
  - In basso si esce dal budget su tutti i telefoni da 2,6x in su e sui tablet a 2x.
- **Motivazione.** `budget.md` §4, «Immagine LCP»: AVIF ≤ 60 KB in ogni variante che un telefono può scaricare.
- **Proposta.**
  - Tenere l'ancoraggio in alto. Secondo il commit tiene in vista logo, menu, icone dei contatti e soppalco.
  - Se il creative-director preferisse il basso, servirebbe una qualità per formato solo per questa immagine, con il meccanismo di `7326a1e` (§3), e poi una nuova misura. In basso, a 1080w:
    - AVIF 48: 56,8 KB, SSIM sulla luminanza 0,9653 contro 0,9697 dei valori del sito (AVIF 47 dà lo stesso file);
    - AVIF 46: 53,6 KB, SSIM 0,9628, con un margine simile a quello di oggi (AVIF 45 dà lo stesso file);
    - WebP 75: 89,0 KB, dentro il controllo n. 8.
  - La differenza visiva va giudicata dal creative-director: il peso non lo decide.

### 2. [SUGGERIMENTO] Sul 4G lento la porta può aspettare il ricalcolo del layout dello scambio di carattere
- **Dove:** `/siii/`, porta della hero e preload di Schibsted Grotesk (ADR 005).
- **Problema.**
  - Sul 4G lento a 1,75x la porta (34,3 KB) finisce di scaricarsi a 846–925 ms, quasi insieme al font in preload (919–928 ms nelle tracce).
  - Lo scambio di carattere ricalcola il layout di tutta la pagina: un task di 157–172 ms con CPU 4x, di cui 108–125 ms di Layout (2 tracce del main thread). Non è JavaScript.
  - Se la porta arriva prima del task viene dipinta dopo 35–67 ms. Se arriva insieme o subito dopo, aspetta la fine del task: il ritardo di rendering sale a 169–228 ms.
  - Su 13 caricamenti: LCP 948 ms di mediana contro 800 ms del controllo, con 6 caricamenti su 13 tra 1,04 e 1,16 s.
  - Il controllo, con la porta da 26,8 KB, la riceveva a 734–790 ms, prima del font.
  - Con la rete di Lighthouse la porta arriva dopo il font, e l'effetto quasi non compare: ritardo di rendering 49–111 ms, mediana 62.
- **Motivazione.**
  - `budget.md` §8, regressioni oltre il 10%. Con Lighthouse la crescita è del 6%, sotto la regola. Sul profilo 4G lento a 1,75x è del 18%: è un profilo di controllo, non quello di riferimento.
  - L'LCP resta lontano dall'obiettivo di 2,0 s.
- **Proposta.**
  - Nessun intervento ora: la crescita è motivata dalla scelta dell'immagine e resta nel budget.
  - Da sorvegliare insieme alla finestra del ripiego (`budget.md` §3). Dopo il lancio, il RUM `web-vitals` con l'attribuzione dell'LCP, se adottato, separa il ritardo di rendering dal download.
  - Se un giorno servisse intervenire, la leva è il costo dello scambio di carattere, non l'immagine. Per esempio `content-visibility: auto` sulle sezioni lontane dalla piega senza reveal né aperture (`architettura.md` §7), da misurare prima.

## 5. Aggiornamenti a budget e architettura (domanda 3)

- **`budget.md` 0.7:**
  - §2, tabella: LCP del caso peggiore e righe «Immagine LCP» con i valori di `1112c93`;
  - §2, «Pagine con un'immagine LCP»: nuovo punto «Dove l'immagine non è l'LCP», per le viewport basse e il telefono in orizzontale (§2.5);
  - §3, sorveglianza del preload: finestra del ripiego con la schermata YES ed effetto sull'LCP del 4G lento (§2.4, osservazione 2);
  - §4, «Immagine LCP»: pesi della schermata YES, browser senza AVIF, ancoraggio e rimando alle leve dell'architettura;
  - §7.4 nuovo, con la base attuale di `/siii/`; §7.1 e §7.3 rimandano lì;
  - un punto [DA VERIFICARE] sull'iPhone SE e la voce per il creative-director sull'ancoraggio.
- **`architettura.md` 0.5:**
  - §3.2: la schermata YES, dove la porta non è l'LCP, le leve quando un'immagine non sta nel budget (con il parere sulla qualità per formato) e le misure;
  - §3.4: `mobileCrop` risultava «non ancora applicato», mentre lo è da `bae201c`. Aggiunto l'effetto dell'ancoraggio sul peso.

## Verdetto di dominio

**Conforme, senza patch.**
- `/siii/` con la schermata YES rispetta tempi, pesi, richieste e CLS del template T2.
- Rispetta il budget dell'immagine LCP su ogni dispositivo, con i valori di compressione del sito.
- Il controllo n. 8 è vuoto, e tutti i controlli statici sono superati.
- **Due condizioni d'esecuzione:**
  - il ritaglio resta ancorato in alto; se si sposta, serve una qualità per formato e una nuova misura (osservazione 1);
  - l'effetto sul 4G lento si sorveglia, senza interventi ora (osservazione 2).
- Resta aperta, come prima, la prova della finestra del ripiego sull'host reale, in HTTP/2.

## Ipotesi da validare

- [IPOTESI: su HTTP/2, all'host reale, `fetchpriority="high"` anticipa la porta rispetto al font più di quanto si veda qui in HTTP/1.1.
  - La finestra del ripiego potrebbe allungarsi un po'.
  - La coincidenza con lo scambio di carattere (osservazione 2) potrebbe diventare più rara, perché la porta arriverebbe prima.
  - Si verifica sull'host con lo script della review del 2026-10-07, §7.2.]
- [IPOTESI: la quota di visite da browser senza AVIF (iOS 15 e precedenti) è piccola. Ricevono il WebP: 40,7–76,8 KB sui telefoni.]
- [DA VERIFICARE: altezza visibile di un iPhone SE in Safari, stimata intorno ai 550 px. Se è sotto i 600 px, l'LCP di `/siii/` su quel telefono è il testo (§2.5).]

## Domande aperte

1. **Per l'utente o la sessione principale** (aperta dal 2026-10-07): chi esegue sull'anteprima lo script della finestra del ripiego (review del 2026-10-07, §7.2), da una postazione che la raggiunge, per la soglia di 600 ms dell'ADR 005 1.3?

## Decisioni richieste

- **creative-director:** nessuna, se l'ancoraggio resta in alto. Altrimenti osservazione 1: qualità per formato (AVIF 48 o 46) solo per questa immagine, e nuova misura.
- **cro-specialist:** la decisione sul RUM `web-vitals`, già richiesta nel `budget.md`, serve anche per sorvegliare l'osservazione 2 sul campo.
- **Sessione principale:** nessuna patch da applicare. Resta la prova della finestra del ripiego sull'host (domanda 1).
