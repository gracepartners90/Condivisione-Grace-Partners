---
titolo: Review di performance · Hero di /siii/ con la schermata del negozio YES
owner: web-performance-specialist
contributi: []
stato: in revisione
versione: 1.3
aggiornato: 2026-10-09
fonti: [§8: commit e406ecb (ritaglio 4:5 della vista da smartphone sotto 40em, src/assets/images/derivate/siii-la-tana-di-aldo-mobile-sala-4x5.jpg, opzioni mobileCrop.media e mobileCrop.quality di Media), dist/ dello staging delle 15:55 (identica alla build di e406ecb fatta in un worktree), build di controllo 6c6f501, misure sharp, Lighthouse e Playwright delle 15:59–16:12 UTC; §7: commit c11734b (Home, capitolo 01 con src/assets/images/siii-la-tana-di-aldo-desktop-sala.jpg) e 6c6f501 (solo l'alt), dist/ dello staging delle 15:27 (identica alla build di c11734b fatta in un worktree), build di controllo 2178f47, misure Lighthouse e Playwright delle 15:32–15:45 UTC, patch scratchpad/perf-yes/home-ch01-1440.patch; §6: commit 2178f47 (derivato desktop src/assets/images/derivate/siii-yes-desktop-negozio.jpg da scripts/prepare-assets.mjs, opzione mobileCrop.image di Media), dist/ dello staging delle 15:03 (identica alla build di 2178f47 fatta in un worktree), misure Playwright delle 15:05–15:06 UTC; commit 1112c93 (schermata YES nella hero di /siii/), commit 9118087 (solo memorie, nessun effetto sulla build), commit 7326a1e (prop quality di Media, poi tolta), docs/performance/budget.md (0.6, aggiornato a 0.7 e poi a 0.8), docs/performance/architettura.md (0.4, aggiornato a 0.5 e poi a 0.6), docs/decisioni/005-preload-del-font.md (1.3), docs/review/2026-10-07-schermate-siii-web-performance-specialist.md, dist/ dello staging del 2026-10-08 alle 14:34 (identica alla build di 1112c93 fatta in un worktree), build di controllo aaf4760, misure Lighthouse 13.5.0 e Playwright 1.56.1 del 2026-10-08 (14:37–14:54 UTC), sharp 0.35.5 del progetto, sorgente di Astro 7.3.5 (assets/services/sharp.js, assets/utils/hash.js)]
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

Non ho modificato `src/`. Per la hero di `/siii/` non servono patch; per il capitolo 01 della Home (§7) ne propongo una, provata (osservazione 3).

**Aggiornamento dopo `2178f47` (§6).** Su desktop la porta usa un derivato 3:5 di 1014 × 1690, senza le parti tagliate in fondo alla schermata; i telefoni scaricano gli stessi file di prima.
- Desktop: 22,2–60,4 KB invece di 24,7–83,7. Controllo n. 8 vuoto.
- Oltre 2,44x il desktop riceve meno pixel di quelli che chiede (81% a 3x), per un limite del derivato, non del codice.
- Verdetto invariato: conforme, senza patch.

**Aggiornamento dopo `e406ecb` (§8): Home, capitolo 01 con il ritaglio 4:5 sui telefoni.**
- AVIF 40 per il solo ritaglio: confermato. È il gradino più alto dentro gli obiettivi del budget §4.
- Nessuna variante pesa più di prima. La Home con la rete lenta di laboratorio pesa 167,7 KB invece di 168,6; LCP = FCP.
- L'osservazione 3 è applicata. Controllo n. 8 vuoto. Nessuna patch.

**Aggiornamento dopo `c11734b` (§7): Home, capitolo 01 con La Tana di Aldo.**
- La schermata pesa il doppio, ma l'LCP della Home non cambia: resta il testo, con LCP = FCP. Anche la finestra del ripiego non cambia.
- Il peso al caricamento cresce di 19,2 KB solo con la rete lenta di laboratorio, dove Chromium scarica la schermata in anticipo.
- Il WebP da 1920w (195,3 KB) è dentro il controllo n. 8, ma a 4,7 KB dal limite. Propongo una patch provata: WebP e JPEG fino a 1440, AVIF fino a 1920 solo da 1,5 dppx (osservazione 3).

**In breve** (misure di `1112c93`).
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

### 3. [SUGGERIMENTO, consigliato prima del lancio] Home, capitolo 01: WebP e JPEG fino a 1440, AVIF fino a 1920 solo da 1,5 dppx
*Aggiunta il 2026-10-08 con `c11734b`; misure nel §7. **Applicata in `e406ecb`, dentro la patch del creative-director, e verificata (§8).***
- **Dove:** `src/pages/index.astro`, `Media` del capitolo 01 (schermata de La Tana di Aldo).
- **Problema.** Con le larghezze predefinite il WebP da 1920w pesa 195,3 KB: 4,7 KB dal limite di 200 KB del controllo n. 8. Il controllo oggi è superato, ma basta un piccolo cambio di ritaglio, di sorgente o di encoder per farlo fallire al prelancio. Il JPEG da 1920w pesa 249,8 KB, su 300.
- **Motivazione.** `budget.md` §6.3, controllo n. 8. La stessa regola è già applicata al primo esempio di `/siii/`, una schermata dello stesso tipo (`d4511be`, review del 2026-10-07, §8): l'AVIF grande va solo dove serve, WebP e JPEG si fermano a 1440.
- **Proposta: patch provata**, in `scratchpad/perf-yes/home-ch01-1440.patch`. Una sola modifica in `src/pages/index.astro`; `git apply --check` passa su `6c6f501`.

  ```astro
  <Media
    image={siiiHomeScreen.image}
    alt={siiiHomeScreen.alt}
    sizes="(min-width: 100rem) 983px, (min-width: 64em) 62vw, 92vw"
    widths={[480, 768, 1080, 1440]}
    hiDpiAvifWidths={[1600, 1920]}
  />
  ```

  - WebP fino a 141,3 KB e JPEG fino a 168,1 KB. Controllo n. 8 vuoto, con 58,7 KB di margine sul WebP.
  - AVIF scelto uguale in 13 casi su 14. Fa eccezione il desktop 1280×800 a 2x, che prende la nuova 1600w (103,2 KB) invece della 1920w (128,3 KB); la 1600w gli basta.
  - Markup equivalente (stesse classi, `src`, `alt`, `sizes`, `loading`), più la sorgente `(min-resolution: 1.5dppx)`. Le altre pagine sono identiche byte per byte.
  - Costo: solo i browser senza AVIF, sui desktop a 2x, ricevono il WebP da 1440w invece che da 1920w (81% dei pixel a 1440×900).
- **Per il creative-director.** Se sui telefoni si userà la vista mobile della stessa esperienza, dal lato performance conviene ritagliarla in build (per esempio 4:5, come la porta di `/siii/`, con `mobileCrop` e `mobileCrop.image`). Una vista 3:5 intera sarebbe molto più alta della 16:10, e peserebbe di più proprio dove la rete lenta la fa scaricare in anticipo. Va rimisurata.

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

## 6. Rimisura dopo `2178f47`: derivato per il desktop

**Cosa cambia.** Lo ha chiesto il creative-director, per togliere «APRI QUI» tagliata, «Privacy Polic…» e «Go» in fondo alla schermata intera.
- Da 64em la porta mostra un derivato 3:5: `src/assets/images/derivate/siii-yes-desktop-negozio.jpg`, 1014 × 1690.
  - È ritagliato senza ridimensionamento (x 0, y 0) da `scripts/prepare-assets.mjs`.
  - È salvato in JPEG q92 con `mozjpeg`, quindi rispetta la regola delle sorgenti dell'`architettura.md` §3.1 (qualità 90 o più).
- Sotto 64em `Media` ritaglia l'originale, grazie alla nuova opzione `mobileCrop.image`.

**Condizioni.**
- La build di `2178f47`, fatta in un worktree, è identica byte per byte allo staging delle 15:03.
- Controllo: la build di `1112c93` misurata stamattina.
- Varianti con Playwright su 17 casi, con un contesto nuovo e senza cache per ogni caso (15:05–15:06 UTC).
- `scripts/serve.mjs` su porte mie.

**Verifiche.**
- **Telefoni invariati.**
  - I file del ritaglio 4:5 sono gli stessi di `1112c93`, byte per byte.
  - Il Moto G scarica la 768w (34,3 KB), un telefono a 3x la 1080w (54,0 KB).
  - Le altre 7 pagine sono identiche.
- **Box invariato.** Il derivato ha la stessa proporzione 3:5 (1014/1690 = 0,6). L'`<img>` ha `width="1014" height="1690"`, e `--media-ratio` cambia valore ma non proporzione: nessun effetto sul CLS.
- **Controlli statici:** superati tutti, n. 8 compreso. Il file più grande è il JPEG da 1014w, 127,0 KB contro 300; il WebP più grande è di 82,4 KB.

| Schermo da 64em | Pixel necessari | Variante | AVIF (prima, schermata intera) | Pixel ricevuti / necessari |
|---|---|---|---|---|
| Desktop a 1x, da 1024 a 2560 px | 382–416 | 480w | **22,2 KB** (24,7) | pieni |
| Desktop a 1,25x e 1,5x | 520–624 | 768w | **41,8 KB** (46,6) | pieni |
| Desktop a 2x (1024, 1440 e 1920 px); iPad Pro a 2x, in verticale e in orizzontale | 764–832 | 1014w | **60,4 KB** (72,7) | pieni |
| Desktop a 2,25x (4K al 225%) | 936 | 1014w | 60,4 KB (72,7) | pieni |
| Desktop a 2,5x (4K al 250%) | 1040 | 1014w | 60,4 KB (72,7) | **97%** |
| Desktop a 2,75x (4K al 275%) | 1144 | 1014w | 60,4 KB (83,7) | **89%** |
| Desktop a 3x (4K al 300%) | 1248 | 1014w | 60,4 KB (83,7) | **81%** (prima 96%) |

- **Pesi:** da −2,5 KB a 1x a −23,3 KB a 2,75–3x. L'LCP desktop non può peggiorare: il preset desktop di Lighthouse (1x) scarica 22,2 invece di 24,7 KB. Non ho rifatto le corse, perché su mobile i file sono gli stessi.
- **Sotto risoluzione oltre 2,44x** (oltre 2,65x a 1024 px, dove la colonna è di 382 px).
  - Il derivato non ha più di 1014 px e Astro non ingrandisce. Non è un limite del codice: più pixel non esistono, se non riprendendo la parte tagliata.
  - Riguarda soprattutto i portatili Windows con schermo 4K al 250–300%. I Mac e gli iPad sono a 2x, dove i pixel bastano.
  - A 3x la porta ha 2,44 pixel d'immagine per pixel CSS: resta un'immagine ad alta densità, appena più morbida nei dettagli d'interfaccia.
  - La scelta tra questa morbidezza e le parti tagliate in fondo è d'inquadratura, quindi del creative-director. Dal lato performance va bene così.
- **Elemento LCP:** la porta in 17 casi su 17.

**Esito della rimisura: conforme, senza patch.** Aggiornati il `budget.md` 0.8 (riga «Immagine LCP» del §4 e §7.4) e l'`architettura.md` 0.6 (§3.4, `mobileCrop.image`).

## 7. Home, capitolo 01 con La Tana di Aldo (`c11734b`)

**Cosa cambia.** Il capitolo 01 della Home mostra la schermata da desktop de La Tana di Aldo (2000 × 1250, `lazy`) al posto della sala di Masseria Santella. La volta in pietra pesa circa il doppio:

| Formato | 480w | 768w | 1080w | 1440w | 1920w | Prima, 1920w |
|---|---|---|---|---|---|---|
| AVIF | 17,5 | 37,8 | 63,0 | 90,6 | 128,3 KB | 70,9 KB |
| WebP | 29,2 | 62,6 | 99,3 | 141,3 | **195,3 KB** | 92,9 KB |
| JPEG | 27,5 | 62,6 | 109,6 | 168,1 | 249,8 KB | 147,4 KB |

**Condizioni.**
- La build di `c11734b`, fatta in un worktree, è identica allo staging delle 15:27. Rispetto al controllo `2178f47` cambiano solo `index.html` e i file della schermata. `6c6f501`, arrivato dopo, cambia solo l'alt.
- Lighthouse 13.5.0 sulla Home: 3 corse simulate e 5 con throttling applicato per variante, alternate (15:33–15:38 UTC, `benchmarkIndex` 1336–2105).
- Playwright: variante scaricata su 12 dispositivi dopo lo scroll, e i tre profili di rete con 5 caricamenti per variante.

**Peso e LCP della Home (domanda 1).**

| Metodo | La Tana di Aldo | Controllo |
|---|---|---|
| Simulato: FCP / LCP (3 corse) | 1,27 / 1,65 s | 1,19 / 1,65 s |
| Applicato: FCP = LCP (5 corse) | 1,16 s (1,06–1,24) | 1,19 s (1,14–1,32) |
| Peso al caricamento: simulato; applicato | 130,4 KB, 7 richieste; **168,6 KB**, 8 | 130,3 KB, 7; 149,4 KB, 8 |
| Schermata del capitolo 01 al caricamento | solo con l'applicato: 38,2 KB | solo con l'applicato: 19,1 KB |

- **L'LCP non cambia.** È la riga dell'H1, con LCP = FCP in tutte le corse.
  - La schermata `lazy` parte dopo il primo rendering (circa 340–500 ms dopo la fine del documento), quindi non può ritardare un LCP testuale.
  - Con la rete lenta di laboratorio Chromium allarga la distanza di caricamento anticipato e la scarica durante il caricamento, come già annotato nel §7.3 del budget. Ora pesa 38,2 KB invece di 19,1 al Moto G.
- **Profili di rete** (Playwright, mediane di 5 caricamenti):
  - laboratorio di Lighthouse: schermata scaricata durante il caricamento in 5 casi su 5, 37,8 KB a 1,75x e 63,0 KB a 3x (prima 18,7 e 31,5). LCP = FCP: 1052 contro 1076 ms a 1,75x, 1056 contro 1036 ms a 3x. Finestra del ripiego: 685 contro 703 ms, e 654 contro 702 ms;
  - 4G veloce e 4G lento: la schermata non viene scaricata durante il caricamento. LCP = FCP e finestra del ripiego nel rumore (sul 4G lento 345 contro 313 ms a 1,75x, con casi singoli tra 137 e 409 ms).
- **Pesi dentro il T1:** con throttling applicato 168,6 KB su 300, immagini 70,8 KB su 150. La differenza di 19,2 KB c'è solo nel caso della rete lenta di laboratorio.
- **Variante scaricata dopo lo scroll:**
  - 768w (37,8 KB) sui telefoni a 1,75–2x;
  - 1080w (63,0 KB) a 390 px 3x e su ogni desktop a 1x;
  - 1440w (90,6 KB) a 430 px 3x e sui tablet a 2x;
  - 1920w (128,3 KB) sui desktop a 2x.
  - Dentro gli obiettivi del budget §4 per le foto a tutta larghezza: ≤ 70 KB a 1080 px, ≤ 150 KB a 1920 px.
- **A margine, non dovuto a `c11734b`.** Il controllo misura 130,3 KB e 1,19 s, contro 117,2 KB e 1,04 s della base del budget §7.3 (`bae201c`).
  - In mezzo c'è la nuova foto dell'evento (`920e497`, 2026-10-07), che entra nel caricamento con 32,6 KB.
  - L'LCP resta lontano dall'obiettivo. La differenza (14%) supera però la regola del +10%, e due tornate diverse non bastano a dirne la causa.
  - Annotato come [DA VERIFICARE] nel budget §7.5: serve una rimisura dedicata della Home, alternando `bae201c` e la build attuale.

**Il WebP a 195,3 KB (domanda 2).**
- Non serve un intervento per rispettare il budget: il controllo n. 8 è superato.
- **Consiglio la patch dell'osservazione 3**, prima del lancio, per il margine (da 4,7 a 58,7 KB) e per coerenza con il primo esempio di `/siii/`.
- Le larghezze vengono prima della qualità per immagine (`architettura.md` §3.2), e qui bastano: l'AVIF grande resta agli schermi che lo usano.

## 8. Home, capitolo 01: ritaglio 4:5 sui telefoni in verticale (`e406ecb`)

**Cosa cambia.** È la patch del creative-director, che comprende anche l'osservazione 3.
- Sotto 40em la porta del capitolo 01 mostra un ritaglio 4:5 della vista da smartphone: `src/assets/images/derivate/siii-la-tana-di-aldo-mobile-sala-4x5.jpg`, 1080 × 1350, JPEG q92 da `scripts/prepare-assets.mjs`.
  - Il box passa a 4:5 in CSS con lo stesso breakpoint.
  - Le sorgenti del ritaglio hanno `width="1080" height="1350"`, quindi nessuno spostamento del layout.
- Due nuove opzioni di `Media`: `mobileCrop.media`, che dice dove vale il ritaglio, e `mobileCrop.quality`, la qualità del solo ritaglio. Qui AVIF 40, da confermare da parte mia.
- Da 40em resta la vista desktop: WebP e JPEG fino a 1440, AVIF fino a 1920 solo da 1,5 dppx.

**Condizioni.**
- La build di `e406ecb`, fatta in un worktree, è identica allo staging delle 15:55. Il 2026-10-09, dopo il riavvio del contenitore, lo staging serve ancora la stessa build: `/` e `/siii/` sono identiche byte per byte, e dopo `e406ecb` nessun commit tocca il sito.
- Controllo: `6c6f501`, il sito subito prima. Cambiano solo `index.html` e i file de La Tana; `/siii/` e le altre pagine sono identiche byte per byte.
- Misure:
  - sharp del progetto, che riproduce la build al decimo di KB;
  - Playwright su 20 dispositivi;
  - Lighthouse con throttling applicato, 5 corse per variante, alternate (16:04–16:07 UTC);
  - profili Playwright con 5 e 8 caricamenti.

**Qualità del ritaglio (domanda 1): AVIF 40, confermato.**

| AVIF | 480 / 640 / 768 / 1080w | SSIM Y a 768w / 1080w |
|---|---|---|
| **40** (= 41) | 17,8 / 28,0 / **36,8** / **61,3 KB** | 0,905 / 0,930 |
| 42 (= 43) | 19,2 / 30,0 / 39,3 / 65,2 KB | 0,912 / 0,935 |
| 44 | 20,5 / 31,9 / 41,7 / 69,2 KB | 0,917 / 0,939 |
| 45 (= 46) | 23,0 / 35,5 / 46,2 / 76,2 KB | 0,928 / 0,946 |
| 50 (valori del sito) | 27,7 / 43,2 / 55,7 / 91,4 KB | 0,943 / 0,958 |

- **Perché 40.**
  - Gli obiettivi del budget §4 per le foto a tutta larghezza sono ≤ 45 KB a 828 px e ≤ 70 KB a 1080 px. Il gradino 40 li rispetta tutti e due con margine: circa 43 KB a 828 px, per estrapolazione, e 61,3 KB a 1080 px.
  - Il gradino 42 sarebbe al limite a 828 px (circa 45,7 KB) per 0,005–0,007 di SSIM in più. Il 44 e il 45 escono dall'obiettivo a 828 px, e il 45 anche a 1080 px.
  - Il peso che la rete lenta fa scaricare in anticipo resta quello di prima: 36,8 KB al Moto G, contro i 37,8 della vista desktop.
  - L'immagine è `lazy` e non è l'LCP. Per la direzione artistica il creative-director ha già dato il suo assenso al 40.
- **WebP del ritaglio a 75:** fino a 134,6 KB, dentro il controllo n. 8. Riguarda solo i browser senza AVIF. Con il 65 scenderebbe a 118,4 KB: non ne vale la pena.
- **Il meccanismo `mobileCrop.quality` va bene.** È la qualità per formato del §3, limitata al ritaglio. Il nome dei file cambia solo per le sorgenti del ritaglio: le altre immagini del sito sono identiche.

**Varianti scelte (domanda 2).** AVIF, tra parentesi la build precedente.

| Dispositivo | Variante | Peso |
|---|---|---|
| Telefoni in verticale a 1,75–2x (375, 412 px) | ritaglio 4:5, 768w | 36,8 KB (37,8, vista 16:10) |
| Telefoni in verticale da 2,6x a 3x (360, 390, 412, 430 px) | ritaglio 4:5, 1080w | 61,3 KB (63,0; 90,6 a 430 px) |
| 320 px a 2x | ritaglio 4:5, 640w | 28,0 KB (37,8) |
| Tablet sotto 40em (600 px a 2x) | ritaglio 4:5, 1080w | 61,3 KB (90,6) |
| Telefono in orizzontale (844 px a 3x) | vista 16:10, 1920w | 128,3 KB (uguale) |
| Tablet da 40em a 2x (768, 820, 1024 px) | vista 16:10, 1440w o 1600w | 90,6 o 103,2 KB (90,6 o 128,3) |
| Desktop a 1x (da 1280 a 2560 px) | vista 16:10, 1080w | 63,0 KB (uguale) |
| Desktop a 2x | vista 16:10, 1440w a 1024 px, 1600w a 1280 px, 1920w da 1440 px | 90,6 / 103,2 / 128,3 KB (90,6 / 128,3 / 128,3) |

- **Nessuna variante pesa più di prima.**
- A 430 px a 3x il ritaglio dà il 91% dei pixel che servono (1080 su 1187): è il massimo del derivato, per un'immagine `lazy` su uno schermo a 3x.
- **Controlli statici:** superati tutti, n. 8 vuoto. Il WebP più grande è il 1440w della vista desktop, 141,3 KB.

**Peso della Home con la rete lenta di laboratorio.**

| Misura | `e406ecb` | Controllo |
|---|---|---|
| Lighthouse, applicato (5 corse): FCP = LCP | 1,13 s (1,05–1,21) | 1,18 s (1,05–1,26) |
| Lighthouse, applicato: peso e richieste | 167,7 KB, 8 | 168,6 KB, 8 |
| Lighthouse, applicato: capitolo 01 scaricato in anticipo | 37,2 KB (ritaglio 4:5) | 38,2 KB (vista 16:10) |
| Playwright, rete di laboratorio, 1,75x: immagini al caricamento, finestra del ripiego | 68,9 KB, 655 ms | 70,0 KB, 713 ms |
| Playwright, rete di laboratorio, 3x: immagini al caricamento, finestra del ripiego | 93,4 KB, 680 ms | 95,2 KB, 706 ms |
| Playwright, 4G lento, 8 caricamenti: FCP = LCP a 1,75x / 3x | 640 / 680 ms | 640 / 668 ms |

- **Il peso con la rete lenta non cresce:** −0,9 KB con Lighthouse. L'LCP resta il testo, con LCP = FCP.
- **Sul 4G lento** la schermata non si scarica durante il caricamento. Una prima tornata di 5 caricamenti dava 764 contro 668 ms a 1,75x; con 8 caricamenti l'FCP è uguale, quindi era rumore.

**Esito: conforme, senza patch.** Aggiornati il `budget.md` 0.10 (§4 e §7.5) e l'`architettura.md` 0.7 (§3.2 e §3.4, `mobileCrop.media` e `mobileCrop.quality`).

## Verdetto di dominio

**Aggiornamento dopo `e406ecb` (§8):** Home conforme, senza patch. AVIF 40 del ritaglio confermato, osservazione 3 applicata e verificata.

**Aggiornamento dopo `c11734b` (§7):** Home conforme. LCP invariato, peso dentro il T1 e controllo n. 8 superato. Patch consigliata per il margine del WebP (osservazione 3).

**Aggiornamento dopo `2178f47` (§6):** invariato. Il derivato desktop pesa meno a ogni densità, i telefoni non cambiano, e il controllo n. 8 resta vuoto.

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

- **creative-director:**
  - hero di `/siii/`: nessuna, se l'ancoraggio resta in alto. Altrimenti osservazione 1: qualità per formato (AVIF 48 o 46) solo per questa immagine, e nuova misura;
  - Home, capitolo 01: chiusa. La vista da smartphone, ritagliata 4:5 in build, è in `e406ecb` e verificata (§8). Ogni nuovo cambio d'immagine o di ritaglio si rimisura.
- **web-performance-specialist (io):** chiusa. AVIF 40 per il ritaglio del capitolo 01 (`mobileCrop.quality`), decisa sulle misure del §8.
- **cro-specialist:** la decisione sul RUM `web-vitals`, già richiesta nel `budget.md`, serve anche per sorvegliare l'osservazione 2 sul campo.
- **Sessione principale:**
  - nessuna patch da applicare: l'osservazione 3 è in `e406ecb`;
  - resta la prova della finestra del ripiego sull'host (domanda 1);
  - programmare con me la rimisura dedicata della Home (budget §7.5, [DA VERIFICARE]).
