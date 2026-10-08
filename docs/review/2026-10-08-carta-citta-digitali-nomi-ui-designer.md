---
titolo: /citta-digitali/, carta d'Italia con i nomi delle città · verifica e proposte
owner: ui-designer
contributi: []
stato: in revisione
versione: 0.1
aggiornato: 2026-10-08
fonti: [richiesta dell'utente del 2026-10-08 riferita dalla sessione principale («la mappa in città digitali, mettiamo anche lì qualche nome di città tra le più importanti»), commit 426e6dc e 5f2f757, docs/review/2026-10-08-carta-citta-digitali-nomi-ux-designer.md, docs/creativa/direzione-visiva.md (0.15, §1.4: regole 2, 3, 4, 6, 7, 9 e 11), docs/ux/accessibilita.md (0.11: §2.8 e prova di 1.4.12), docs/review/2026-10-06-regola-11-carte-ui-designer.md (sonde e metri), src/data/citta-digitali.json, scripts/generate-maps.mjs, staging http://127.0.0.1:4321 (build di 426e6dc), build di prova nello scratchpad (5b1834b, 426e6dc, 5f2f757 e 5f2f757 con le patch), misure Playwright 1.56 (Chromium 141), axe-core 4.13 e sharp del 2026-10-08]
---

# /citta-digitali/, carta d'Italia con i nomi delle città

**Richiesta** (sessione principale, 2026-10-08). Dopo una richiesta dell'utente, la carta della sezione «L'Italia in un unico portale» disegna i nomi della carta della Home (commit 426e6dc). I punti da verificare:
1. regola 11 e sovrapposizioni, anche con 1.4.12, da 320 a 1920 px, con attenzione alle carte oltre i 480 px;
2. da 1280 px, allineamento delle schede alla latitudine dei nodi, con i nomi sulla carta;
3. oltre i 560 px di carta, posto per altri nomi tra le città più importanti, per esempio Lecce o Taranto;
4. aggiornamento del design system.

**Base delle misure.**
- La build di 426e6dc, identica byte per byte allo staging in tutte e 8 le pagine.
- Dopo è arrivato 5f2f757 (ux-designer). Cambia solo la descrizione della carta: «… Tra queste: Itri e Cosenza.», 166 caratteri.
- Le prove finali delle patch sono sulla HEAD 5f2f757.

## In sintesi

- **Regola 11 e sovrapposizioni: conformi.**
  - Nessun nome copre altri nomi, punti o nodi, nessuno esce dalla carta e nessuno passa a meno di 6 px da un altro nodo con nome. Vale in 321 finestre, con e senza 1.4.12.
  - Oltre i 480 px di carta la distanza minima cresce con la carta: da 19,9 px fino a 30,1 px sopra i 720 px.
  - Il minimo resta quello della Home, sulle carte strette: 7,2 px con 1.4.12 (metro del generatore), 8,4 px col metro del creative-director.
- **Schede e nomi convivono.**
  - Da 1280 px restano almeno 253 px tra le schede e il nome più vicino.
  - L'allineamento delle schede ai nodi non è cambiato: il filetto sta 19,2 px sopra il nodo, come prima del commit.
- **[IMPORTANTE] Due problemi di 1.4.12 nelle schede, già presenti prima di 426e6dc** (§2.2):
  - «Caltanissetta» passa sotto «Esplora ↗» a ogni finestra da 1280 px, fino a 105 px;
  - tra 1280 e 1375 px il testo di Altamura copre l'inizio della scheda di Caltanissetta, fino a 41 px.

  La patch B è provata. Senza le spaziature dell'utente a schermo non cambia nulla; con le spaziature non si copre più niente.
- **Più nomi sulle carte larghe: sì, uno, Lecce** (§3).
  - **Taranto non è una città di Città Digitali**: non è tra le 45 dell'elenco, quindi non ha un punto e non si può nominare.
  - Lecce entra da 565 px di carta, appesa a 40 px.
  - Brindisi non entra a nessuna larghezza.
  - Manfredonia entrerebbe, ma il suo nome copre la punta del Gargano; Andria finirebbe nella zona più fitta, sopra ALTAMURA.
  - **Proposta, patch A provata:** una terza classe di larghezza per la carta d'Italia, da 36rem (576 px), solo su `/citta-digitali/`.
    - Tiene i 7 nomi dove sono.
    - Aggiunge, se c'è spazio, le città di una lista breve, `nomi.ampie`: Lecce e Brindisi, i due capoluoghi ancora senza nome.
    - Oggi entra Lecce: 8 nomi da circa 1270 px di finestra.
  - Decide il creative-director, perché la proposta cambia le regole 2, 7 e 9 della direzione visiva (§4).
- **Design system** aggiornato alla 0.14.

## 1. Regola 11 e sovrapposizioni (punto 1)

**Come.** Le sonde della review della regola 11 (2026-10-06), sulla carta di `#portale`:
- 321 finestre, da 320 a 1920 px ogni 5, con e senza le spaziature di WCAG 1.4.12;
- nomi e richiami contro punti, nodi, altri nomi e bordo della carta;
- regola 11 con due metri:
  - quello del generatore, dal bordo dell'anello di ritaglio al riquadro del nome;
  - quello del creative-director, dal bordo dipinto del nodo all'etichetta.

| Larghezza della carta | Finestre | Nomi | Minimo della regola 11, metro del generatore |
|---|---|---|---|
| 280–352 px (strette) | 320–1020 px | 5: Varese, Itri, Altamura, Cosenza, Caltanissetta | 8,4 px (7,2 con 1.4.12), Altamura → Cosenza, a 280 px |
| 463–480 px | 1024–1060 px | 7: in più Bari e Caltagirone | 19,1 px, Altamura → Bari |
| 480–560 px | 1065–1230 px | 7 | 19,9 px |
| 560–640 px | 1235–1405 px | 7 | 23,2 px |
| 640–720 px | 1410–1575 px | 7 | 26,7 px |
| 720–731 px | da 1580 px | 7 | 30,1 px |

- **Risultato.** In tutte le 642 misure (321 finestre, con e senza 1.4.12):
  - nessuna sovrapposizione e nessun nome fuori dalla carta;
  - nessuna distanza sotto i 6 px;
  - nessuno scorrimento orizzontale.
- **Metro del creative-director:** minimo 9,6 px, 8,4 con 1.4.12, sempre a 280 px.
- **Sopra i 400 px** i minimi sono uguali con e senza 1.4.12.
- **Oltre i 480 px.** Le classi del generatore erano provate fino a 480 px.
  - In pagina la distanza minima cresce con la carta, come previsto: i nomi restano di 13 px e i nodi si allontanano.
  - Ho fatto girare il generatore con la classe larga estesa fino a 576 px. Dà gli stessi nomi nelle stesse posizioni, quindi la classe larga vale, anche col metro del generatore, su tutte le carte di `/citta-digitali/` fino a 576 px.
  - La patch A la estende così (§3.2).

## 2. Schede e nomi da 1280 px (punto 2)

### 2.1 Convivenza e allineamento

| Prova | Esito |
|---|---|
| Nomi contro schede, legenda e colonna del testo (321 finestre, con e senza 1.4.12) | Nessuna sovrapposizione. Il nome più vicino a una scheda è a 106 px, a 350 px di finestra, con le schede sotto la carta. La legenda è a 38 px (37 con 1.4.12), la colonna del testo a 82 px |
| Da 1280 px, spazio tra le schede e il nome più a sinistra | Almeno 253 px, a 1280 px: è CALTANISSETTA, ancorato a sinistra del nodo |
| Allineamento, 1280–1920 px | Il filetto di ogni scheda sta 19,2 px (1,2rem) sopra il centro del suo nodo, per le tre città, a ogni finestra, con e senza 1.4.12. È uguale alla build di 5b1834b, prima del commit: carta, legenda e schede sono nella stessa posizione, entro 0,04 px |
| Lettura | Varese, Altamura e Caltanissetta hanno ora due nomi quasi alla stessa altezza: il titolo della scheda a sinistra, l'etichetta accanto al nodo. Si legge come un'eco, e il nodo che si accende dalla scheda ha accanto il suo nome. Nessuna correzione |

### 2.2 [IMPORTANTE] Schede da 1280 px con le spaziature di 1.4.12 (problema precedente a 426e6dc)

- **Dove:** `src/components/sections/LocationShowcase.astro`, variante `italy`, regole da 80em.
- **Problema.** Con le spaziature del testo di 1.4.12, nella prova di `accessibilita.md` con lo spazio dopo i paragrafi:
  - **«Caltanissetta» passa sotto «Esplora ↗»**, a ogni finestra da 1280 a 1920 px e fino a 105 px.
    - La scheda ha `justify-items: start`, quindi il titolo è largo quanto la parola.
    - Per questo `overflow-wrap: break-word` non scatta mai.
  - **Il testo di Altamura copre l'inizio della scheda di Caltanissetta** tra 1280 e 1375 px di finestra, fino a 41 px.
    - Le schede sono in posizione assoluta: una scheda più alta non sposta la successiva.
    - Succede anche senza lo spazio dopo i paragrafi, fino a 11,5 px tra 1280 e 1330.
  - La build di 5b1834b fa lo stesso: il problema non viene dai nomi. Le prove di 1.4.12 dei giorni scorsi misuravano nomi e legenda, non le schede tra loro.
- **Motivazione.** WCAG 1.4.12, livello AA, soglia del progetto: con le spaziature dell'utente nessun testo deve sovrapporsi o perdersi.
- **Proposta: patch B** (§5).
  - Le schede tornano nel flusso.
    - La lista parte alla latitudine della prima città.
    - Ogni scheda è alta almeno quanto lo scarto di latitudine fino alla successiva, in percentuale dell'altezza della carta.
    - Così una scheda più alta sposta la successiva invece di coprirla.
  - Il titolo ha `max-width: 100%`: se la parola non entra nella colonna, va a capo dentro la colonna. È la rete di sicurezza già prevista per i titoli.
- **Prove**, sulla HEAD 5f2f757 con la patch, contro la stessa HEAD senza:
  - **senza spaziature** cambia nulla:
    - in 321 finestre schede, carta, legenda e altezza della sezione restano nella stessa posizione, entro 0,04 px;
    - Home e `/puglia-digitale/` sono identiche pixel per pixel, a pagina intera, a 390 e 1440 px;
  - **con 1.4.12, da 1280 a 1920 px:**
    - nessun testo sopra la scheda successiva: almeno 39 px di spazio;
    - nessun titolo sotto il suo link: almeno 24 px;
    - l'ultima scheda resta dentro la sezione, con almeno 14 px di margine;
  - `astro check` dà 0 errori e 0 avvisi; axe-core 4.13 dà 0 violazioni a 390 e 1440 px.
- **Costi da accettare.**
  - Con le spaziature dell'utente la riga della carta si allunga, e le schede scendono sotto la loro latitudine: Altamura fino a 116 px, Caltanissetta fino a 196 px. Nulla si perde e nulla si copre.
  - La zona che accende il nodo al passaggio del mouse ora arriva fino al filetto della scheda successiva, perché la scheda è più alta. È la fascia della carta che le appartiene. Tastiera e focus non cambiano.
- **Alternativa più semplice: la soglia del layout per latitudine passa da 80em a 86em (1376 px).**
  - Sotto quella soglia le schede stanno in elenco accanto alla carta, come tra 1024 e 1279 px.
  - Ma così l'allineamento si perde per tutti a 1280 e a 1366 px, due larghezze comuni dei portatili. Non la consiglio.
- **Decide** ux-designer, owner dell'accessibilità, poi il creative-director per l'impaginato.
- **Immagini:**
  - oggi, 1280 px con 1.4.12: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/shots/now1412-1280.png`;
  - con la patch B, 1280 e 1600 px con 1.4.12: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/shots/final1412-1280.png` e `…/final1412-1600.png`.

## 3. Più nomi oltre i 560 px (punto 3)

### 3.1 Che cosa entra

**Come.** Ho fatto girare il generatore sulla classe 576–731 px, con le sue regole (3, 4, 6 e 11) e il metro di 1.4.12. I 7 nomi delle carte larghe restano fermi al loro posto.

| Città | Esito |
|---|---|
| **Taranto** | Non è tra le 45 città di Città Digitali di `citta-digitali.json`: non ha un punto e non può avere un nome (veridicità). Le città della rete più vicine sono Massafra e Grottaglie |
| **Lecce** | Entra solo appesa a 40 px a sinistra del nodo (`drop2-l`), da 565 px di carta. A destra il nome uscirebbe dalla carta. Le altre posizioni coprono i punti di Copertino, Gallipoli o Francavilla Fontana. Il nodo con nome più vicino è a 34 px (30 con 1.4.12) |
| **Brindisi** | Non entra a tutte le larghezze della classe. Appesa a 24 px entra solo fra 555 e 690 px, appesa a 40 px solo da 615 px; con Lecce, a nessuna larghezza |
| Manfredonia | Entra solo sull'angolo in alto a destra (`ne`). Ma il fondo del nome copre la punta del Gargano, il segno più riconoscibile della costa pugliese (immagine) |
| Massafra | Entra appesa a 40 px, ma il fondo del nome copre 28–64 px di costa del golfo di Taranto. Non è tra le città più grandi |
| Andria, Barletta, Trani | Ne entra una, Andria, sull'angolo in basso a sinistra, nella zona più fitta. «ANDRIA» sta sopra «ALTAMURA», a sinistra del nodo di Altamura, e si può leggere come il suo nome (immagine) |
| Monopoli, Ostuni, Fasano, Bisceglie, Bitonto, Gravina in Puglia, Santeramo in Colle | Nessuna posizione libera |
| Martina Franca, Torre del Greco, Ercolano, Pompei, Acquaviva delle Fonti | Il nodo nasconderebbe il punto di una città vicina (regola 4) |

- **L'ordine editoriale di `nomi` non porta Lecce.** Una classe nuova con quell'ordine aggiungerebbe Manfredonia e Massafra, perché i loro gruppi vengono prima.
- **Immagini:**
  - Manfredonia sul Gargano, a 1440 px (a sinistra oggi, a destra con il nome): `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/shots/cmp-gargano-1440.png`;
  - Andria, a 1280, 1440 e 1600 px: `…/shots/prop2-puglia.png`.

### 3.2 Proposta: una terza classe per la carta d'Italia, solo su `/citta-digitali/` (patch A)

- **Classe «ampie»**, da 36rem (576 px) a 731 px, la larghezza massima della carta su `/citta-digitali/`: 6 colonne su 12, in una pagina di 100rem.
  - Vale solo per questa carta: le altre carte d'Italia non superano i 30rem.
  - I 7 nomi delle carte larghe restano dove sono, quindi quando la carta cresce non si spostano.
  - Si aggiungono le città di una lista nuova e breve in `citta-digitali.json`, `nomi.ampie`: `["lecce", "brindisi"]`. Ognuna entra solo se c'è spazio a ogni larghezza della classe.
  - La lista segue il criterio dell'utente, «tra le più importanti»: sono i due capoluoghi ancora senza nome.
  - L'ordine dei gruppi, già approvato, non cambia.
  - Oggi entra Lecce: 8 nomi sulle carte da 576 px, cioè da circa 1270 px di finestra. Sotto i 36rem Lecce resta un punto, come ora.
- **Classe larga estesa a 576 px nel generatore** (400–576 px invece di 400–480). Nomi e posizioni restano gli stessi, ma ora sono controllati su tutte le larghezze reali di `/citta-digitali/`.
- **Componente.** `MapItaly` ha una prop nuova, `large`, che passa solo `LocationShowcase` quando la carta disegna i nomi.
- **Descrizione: non cambia.** Nomina solo i nomi disegnati a ogni larghezza, come chiede la regola di ux-designer, quindi resta «… Tra queste: Itri e Cosenza.».
- **Prove.** Patch A sulla HEAD 5f2f757. Le due patch insieme danno gli stessi file in un ordine e nell'altro.
  - `npm run maps` sulla copia con la patch dà lo stesso `maps.json` della patch (sha256 `6c6ec4c6…`).
    - Restano identici la carta della Puglia, i tracciati, i nomi e le posizioni delle classi strette e larghe.
    - La regola 11 resta a 6,7 px.
  - `astro check`: 0 errori e 0 avvisi.
  - Sonde del §1 sulla build: nessuna sovrapposizione e nessuna distanza sotto i 6 px in 321 finestre, con e senza 1.4.12. I minimi per larghezza sono quelli della tabella del §1.
  - Lecce:
    - fino a 575 px di carta è un punto di 5 px senza nome; da 576 px è un nodo di 10 px con il nome;
    - nei colori forzati nodo e richiamo sono in `CanvasText`, l'anello in `Canvas`.
  - axe-core 4.13: 0 violazioni a 390 e 1440 px.
  - Home e `/puglia-digitale/`:
    - le carte e le pagine intere sono identiche pixel per pixel;
    - nel loro HTML entrano solo le 4 regole CSS della classe nuova, che lì non trovano elementi.
  - Pesi con Brotli, le due patch insieme: Home +20 byte, `/puglia-digitale/` +92, `/citta-digitali/` +134. Il CSS inline arriva al massimo a 10,83 KB, su 15.
- **Immagine:** Lecce a 1280 px, a sinistra oggi, a destra con la patch: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/shots/cmp-map-1280.png`.

## 4. Documenti da allineare

- **Direzione visiva §1.4** (creative-director).
  - **Regola 9** («la carta non porta nomi»): superata dalla richiesta dell'utente del 2026-10-08. Il resto della regola vale ancora:
    - il nodo Ø 10 segna una città nominata;
    - i nodi si accendono dalla scheda;
    - niente anello né richiami verso le schede.
  - **Regola 7:** con la patch A, la carta d'Italia di `/citta-digitali/` ha tre classi.
  - **Regola 2:** la lista `ampie`, con il criterio dell'utente.
  - **«Risultato al 2026-10-06»:** la carta di `/citta-digitali/` ha 5 nomi sulle carte strette e 7 sulle larghe; 8 con la patch A.
  - **Principio da valutare:** un nome non copre la forma che rende riconoscibile la costa, come la punta del Gargano. Oggi lo controllo a occhio, perché il generatore non conosce la costa.
- **Testo alternativo e copy deck** (L6): già segnalati da ux-designer, review del 2026-10-08 §5.
- **Design system:** aggiornato alla 0.14 (§2.2, §2.4, §3.8, §5.4, §6).

## 5. Patch

Si applicano sulla HEAD 5f2f757, una indipendente dall'altra e in qualunque ordine; `git apply --check` passa per tutte e due.
- **Patch A**, nomi delle carte «ampie»: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/diff/citta-digitali-carta-nomi-ampie.patch`.
  - Comprende `maps.json` rigenerato. Dopo l'applicazione, `npm run maps` deve dare lo stesso file, con sha256 `6c6ec4c6a33ec5a84b7f2a1910fc7a9509da033087a4e87369e74227a65b304a`.
- **Patch B**, schede con 1.4.12: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/diff/citta-digitali-schede-1412.patch`.

**Patch A**

```diff
diff --git a/src/data/citta-digitali.json b/src/data/citta-digitali.json
index 2842c04..9ea5f80 100644
--- a/src/data/citta-digitali.json
+++ b/src/data/citta-digitali.json
@@ -65,6 +65,7 @@
       ["caltagirone", "grammichele", "comiso", "chiaramonte-gulfi"]
     ],
     "poi": ["acquaviva", "gravina", "monopoli", "cassano", "massafra", "itri", "bitonto", "santeramo", "manfredonia", "martina-franca", "bari", "lecce", "brindisi", "cosenza", "pompei"],
+    "ampie": ["lecce", "brindisi"],
     "senzaNome": ["polignano", "san-cataldo"]
   },
   "nomiPuglia": {
diff --git a/scripts/generate-maps.mjs b/scripts/generate-maps.mjs
index 3b130fd..29b884b 100644
--- a/scripts/generate-maps.mjs
+++ b/scripts/generate-maps.mjs
@@ -58,7 +58,7 @@ const CITIES = JSON.parse(await readFile('src/data/citta-digitali.json', 'utf8')
   }
   for (const [key, nomi] of [['nomi', CITIES.nomi], ['nomiPuglia', CITIES.nomiPuglia]]) {
     if (!nomi) continue;
-    const named = [...nomi.obbligatori, ...(nomi.solidi ?? []), ...nomi.gruppi.flat(), ...nomi.poi, ...(nomi.senzaNome ?? [])];
+    const named = [...nomi.obbligatori, ...(nomi.solidi ?? []), ...nomi.gruppi.flat(), ...nomi.poi, ...(nomi.ampie ?? []), ...(nomi.senzaNome ?? [])];
     const unknown = named.filter((id) => !ids.has(id));
     if (unknown.length) throw new Error(`citta-digitali.json: ${key} names unknown cities ${unknown.join(', ')}`);
   }
@@ -201,10 +201,12 @@ function toCurvePath(lines, decimals) {
 }
 
 // ─── Names on the maps with city dots ───
-// Classes of map width per map. italia: two, at the same 25rem threshold as the coordinates in
-// MapItaly.astro, narrow maps (phones, and the 1024 px desktop at 382 px) and wide maps (up to
-// 30rem). pugliaRegione: three, narrow and wide on the compact map (the same 25rem threshold) and
-// hero on the wide map of /puglia-digitale/ (another element).
+// Classes of map width per map. italia: three, nested. Narrow maps (phones, and the Home at 1024 px,
+// 382 px) and wide maps switch at 25rem, the threshold of MapItaly.astro; the large class, from 36rem,
+// only exists on /citta-digitali/ (MapItaly `large`), the one map that grows past 36rem: it keeps the
+// wide names where they are and adds, where they fit, the cities of `nomi.ampie` (the most important ones
+// not yet named: user, 2026-10-08). pugliaRegione: three, narrow and wide on the compact map (the same
+// 25rem threshold) and hero on the wide map of /puglia-digitale/ (another element).
 // Each name takes one position around its node: beside it, on a corner, or hanging below it on a
 // vertical leader, the gesture of the Horizon labels (design system §2.1). A name is shown only if
 // it covers no dot, no node, no other name, no other leader and no area name at every width of its
@@ -214,7 +216,9 @@ function toCurvePath(lines, decimals) {
 // Metrics: mono label at 13 px, uppercase, with the user text spacing of WCAG 1.4.12 (0.12em
 // tracking, line-height 1.5). Offsets match the anchor rules in MapItaly.astro.
 const LABEL = { advance: 9.6, pad: 2, line: 19.5, node: 6.5, dot: 4, ring: 13.5, clear: 1, indent: 8, areaMax: 104, apart: 6 }; // node and dot radii include the 1.5 px knockout ring; ring: the office; areaMax: 8em; apart: rule 11, from the knockout ring
-const NAME_CLASSES = { narrow: [280, 400], wide: [400, 480] }; // px; .worlds__map is 280 px at 320 and 30rem at most
+// px. Home chapter 03 (.worlds__map): 280 px at 320, 30rem at most. /citta-digitali/ (.places__map): 280–352 px
+// under 64em, then 6 of the 12 columns, 463 px at 1024 and 730 px from 1600 (the page is 100rem at most).
+const NAME_CLASSES = { narrow: [280, 400], wide: [400, 576], large: [576, 731] };
 const STEP = 5;
 const DROPS = { 'drop-r': 24, 'drop-l': 24, 'drop2-r': 40, 'drop2-l': 40, 'drop3-r': 56, 'drop3-l': 56 }; // px from the node centre to the first line
 // Vertical offsets from the first line (top: -0.7em in CSS), so that names on two lines grow downwards.
@@ -291,9 +295,10 @@ function areaBox(a, W, view) {
  * Anchors (and line breaks) for every city of `named` together (backtracking), or null if they do not
  * all fit at `widths`. `opts.home`: id of the office (its ring keeps other names away, its own name
  * stays beside it); `opts.areas`: area names to keep clear; `opts.wrap`: ids that may break on two lines;
- * `opts.longDrops`: leaders of 56 px too.
+ * `opts.longDrops`: leaders of 56 px too; `opts.fixed`: { id: { anchor, lines } } of names that keep
+ * the position they have in the previous class.
  */
-function placeNames(named, cities, view, widths, { home = null, areas = [], wrap = [], longDrops = false } = {}, budget = 300000) {
+function placeNames(named, cities, view, widths, { home = null, areas = [], wrap = [], longDrops = false, fixed = {} } = {}, budget = 300000) {
   const others = cities.filter((c) => !named.includes(c));
   const radius = (q) => (q.id === home ? LABEL.ring : LABEL.node);
   const free = (p, a, lines) => widths.every((W) => {
@@ -304,7 +309,7 @@ function placeNames(named, cities, view, widths, { home = null, areas = [], wrap
     return !others.some((d) => touches(d.x, d.y, LABEL.dot)) && !named.some((q) => q !== p && touches(q.x, q.y, radius(q) + LABEL.apart - LABEL.clear));
   });
   const layouts = (p) => [[p.name], ...(wrap.includes(p.id) && twoLines(p.name) ? [twoLines(p.name)] : [])];
-  const options = named.map((p) => layouts(p).flatMap((lines) => anchorOrder(p, view, longDrops)
+  const options = named.map((p) => (fixed[p.id] ? [fixed[p.id].lines] : layouts(p)).flatMap((lines) => (fixed[p.id] ? [fixed[p.id].anchor] : anchorOrder(p, view, longDrops))
     .filter((a) => free(p, a, lines))
     .map((a) => ({ a, lines, geo: widths.map((W) => nameGeometry(p, a, W, view, lines, p.id === home)) }))));
   if (options.some((o) => o.length === 0)) return null;
@@ -352,23 +357,25 @@ function checkApart(id, result, cities, view, classes, home) {
  * Names per class of width, in the editorial order of `nomi`: the required names (those of the text
  * beside the map), the solid names (project materials), then one name per group (the first that
  * fits), then the others. Classes go from the narrowest; each starts from the names of the previous
- * one, so names only appear as the map grows. Returns { id: { anchor: { [class]: position | 'none' },
+ * one, so names only appear as the map grows; in a class with `keep` they also stay where they are,
+ * and a class with `candidates` adds only the cities of that list of `nomi`.
+ * Returns { id: { anchor: { [class]: position | 'none' },
  * lines? } }, with `lines` holding the classes where a name allowed on two lines breaks. A required
  * name may be missing from a class with a warning (the text beside the map names it), except in the
  * last class, where the build stops.
  */
-function chooseNames(cities, nomi, view, { id = 'italia', classes = [{ name: 'narrow', range: NAME_CLASSES.narrow }, { name: 'wide', range: NAME_CLASSES.wide }], wrap = [], ...opts } = {}) {
+function chooseNames(cities, nomi, view, { id = 'italia', classes = [{ name: 'narrow', range: NAME_CLASSES.narrow }, { name: 'wide', range: NAME_CLASSES.wide }, { name: 'large', range: NAME_CLASSES.large, keep: true, candidates: 'ampie' }], wrap = [], ...opts } = {}) {
   const byId = Object.fromEntries(cities.map((c) => [c.id, c]));
   const excluded = new Set(nomi.senzaNome ?? []);
   // A name turns its dot into a node (Ø 10 and its ring): it must not hide another city's dot.
   const hidesDot = (c, widths) => widths.some((W) => cities.some((d) => d !== c && Math.hypot(d.x - c.x, d.y - c.y) * (W / view.width) + LABEL.dot - 1.5 <= LABEL.node));
-  const grow = (start, widths, strict, wrapIds, label, areas) => {
+  const grow = (start, widths, strict, wrapIds, label, areas, fixed = {}, only = null) => {
     let named = [], placed = {};
     const add = (cid) => {
       const c = byId[cid];
       if (!c || excluded.has(cid) || named.includes(c)) return false;
       if (!nomi.obbligatori.includes(cid) && hidesDot(c, widths)) return false;
-      const r = placeNames([...named, c], cities, view, widths, { ...opts, wrap: wrapIds, areas });
+      const r = placeNames([...named, c], cities, view, widths, { ...opts, wrap: wrapIds, areas, fixed });
       if (r) { named = [...named, c]; placed = r; }
       return Boolean(r);
     };
@@ -377,15 +384,19 @@ function chooseNames(cities, nomi, view, { id = 'italia', classes = [{ name: 'na
       if (strict) throw new Error(`${id}: no room for the required name ${byId[cid].name}`);
       console.warn(`${id}: no room for ${byId[cid].name} on ${label} maps: name hidden there`);
     }
-    (nomi.solidi ?? []).forEach(add);
-    for (const group of nomi.gruppi) if (!group.some((gid) => named.some((n) => n.id === gid))) group.some(add);
-    nomi.poi.forEach(add);
+    if (only) only.forEach(add);
+    else {
+      (nomi.solidi ?? []).forEach(add);
+      for (const group of nomi.gruppi) if (!group.some((gid) => named.some((n) => n.id === gid))) group.some(add);
+      nomi.poi.forEach(add);
+    }
     return { ids: named.map((n) => n.id), placed };
   };
   const results = [];
   classes.forEach((c, i) => {
     const prev = results.at(-1);
-    results.push({ name: c.name, ...grow(prev?.ids ?? [], widthRange(c.range), i === classes.length - 1, c.wrap ? wrap : [], c.name, c.areas === false ? [] : (opts.areas ?? [])) });
+    const fixed = c.keep && prev ? prev.placed : {};
+    results.push({ name: c.name, ...grow(prev?.ids ?? [], widthRange(c.range), i === classes.length - 1, c.wrap ? wrap : [], c.name, c.areas === false ? [] : (opts.areas ?? []), fixed, c.candidates ? (nomi[c.candidates] ?? []) : null) });
     const lost = (prev?.ids ?? []).filter((cid) => !results.at(-1).ids.includes(cid));
     if (lost.length) console.warn(`${id}: ${lost.join(', ')} named on ${prev.name} maps but not on ${c.name} ones`);
   });
diff --git a/src/data/maps.json b/src/data/maps.json
index 17471aa..40f86db 100644
--- a/src/data/maps.json
+++ b/src/data/maps.json
@@ -40,6 +40,7 @@
           "xPct": 81.23,
           "yPct": 59.24,
           "anchor": {
+            "large": "drop-l",
             "wide": "drop-l",
             "narrow": "drop-l"
           }
@@ -54,6 +55,7 @@
           "xPct": 83.71,
           "yPct": 56.26,
           "anchor": {
+            "large": "ne",
             "wide": "ne",
             "narrow": "none"
           }
@@ -68,6 +70,7 @@
           "xPct": 65.22,
           "yPct": 93.03,
           "anchor": {
+            "large": "e",
             "wide": "e",
             "narrow": "none"
           }
@@ -82,6 +85,7 @@
           "xPct": 61.23,
           "yPct": 90.77,
           "anchor": {
+            "large": "w",
             "wide": "w",
             "narrow": "w"
           }
@@ -96,6 +100,7 @@
           "xPct": 79.47,
           "yPct": 73.45,
           "anchor": {
+            "large": "w",
             "wide": "w",
             "narrow": "w"
           }
@@ -110,10 +115,26 @@
           "xPct": 56.11,
           "yPct": 55.59,
           "anchor": {
+            "large": "e",
             "wide": "e",
             "narrow": "nw"
           }
         },
+        {
+          "id": "lecce",
+          "name": "Lecce",
+          "lat": 40.35,
+          "lon": 18.17,
+          "x": 950,
+          "y": 743.4,
+          "xPct": 95,
+          "yPct": 62.96,
+          "anchor": {
+            "large": "drop2-l",
+            "wide": "none",
+            "narrow": "none"
+          }
+        },
         {
           "id": "varese",
           "name": "Varese",
@@ -124,6 +145,7 @@
           "xPct": 19.5,
           "yPct": 12.92,
           "anchor": {
+            "large": "e",
             "wide": "e",
             "narrow": "e"
           }
@@ -340,13 +362,6 @@
           "xPct": 88.71,
           "yPct": 61.61
         },
-        {
-          "id": "lecce",
-          "x": 950,
-          "y": 743.4,
-          "xPct": 95,
-          "yPct": 62.96
-        },
         {
           "id": "copertino",
           "x": 940.5,
diff --git a/src/components/ui/MapItaly.astro b/src/components/ui/MapItaly.astro
index 866e8bb..8bd3efe 100644
--- a/src/components/ui/MapItaly.astro
+++ b/src/components/ui/MapItaly.astro
@@ -9,7 +9,7 @@
  */
 type MapPlace = { id: string; name: string; lat: number; lon: number };
 /** Position of a name per class of map width (scripts/generate-maps.mjs); 'none' where it is not shown. */
-type LabelAnchor = { wide: string; narrow: string; hero?: string };
+type LabelAnchor = { wide: string; narrow: string; hero?: string; large?: string };
 type PlacePoint = {
   id: string;
   name?: string;
@@ -39,10 +39,10 @@ interface Props {
   places?: MapPlace[];
   /**
    * Città Digitali: every city of src/data/citta-digitali.json, one dot each (visual direction §1.4).
-   * - `true` (Home chapter 03): names where they fit at every width (anchors computed by
-   *   scripts/generate-maps.mjs). No coordinates.
-   * - `'dots'` (/citta-digitali/): the cities in `places` are the nodes, named by the cards beside the
-   *   map; every other city is a dot. Use with `showLabels={false}`.
+   * - `true` (Home chapter 03; /citta-digitali/, with `large`): names where they fit at every width
+   *   (anchors computed by scripts/generate-maps.mjs). No coordinates.
+   * - `'dots'`: the cities in `places` are the nodes, named by the cards beside the map; every other
+   *   city is a dot. Use with `showLabels={false}` (/citta-digitali/ until 2026-10-08).
    */
   cities?: boolean | 'dots';
   showLabels?: boolean;
@@ -52,6 +52,12 @@ interface Props {
    * under 25rem.
    */
   nameClass?: 'hero';
+  /**
+   * Città Digitali on /citta-digitali/, the one map of Italy wider than 36rem: from that width it also
+   * draws the names of the large class (scripts/generate-maps.mjs), and the wide names stay where they
+   * are. Below 36rem those cities are dots. Use with `cities`.
+   */
+  large?: boolean;
   /** Id of the place drawn as the office (ring around the node). */
   home?: string;
   /**
@@ -62,7 +68,7 @@ interface Props {
   class?: string;
 }
 
-const { map, places = [], cities = false, nameClass, showLabels = true, home, label, class: className } = Astro.props;
+const { map, places = [], cities = false, nameClass, large = false, showLabels = true, home, label, class: className } = Astro.props;
 
 const files = import.meta.glob<{ default: Record<string, unknown> }>('../../data/maps.json', { eager: true });
 const raw = Object.values(files)[0]?.default as { maps?: Record<string, MapData> } & Record<string, MapData> | undefined;
@@ -97,7 +103,9 @@ const mapPlaces = Array.isArray(data?.places) ? data.places : [];
 // With `cities`, the name of each place in this element's class: the wide one (and the narrow one under
 // 25rem), or the hero one. A place without a name in the class is a dot here.
 const nameIn = (p: Partial<PlacePoint>) => (nameClass === 'hero' ? p.anchor?.hero : p.anchor?.wide);
-const namedHere = cities === true ? mapPlaces.filter((p) => nameIn(p) && nameIn(p) !== 'none') : [];
+// With `large`, the cities named only on large maps are places too: dots below 36rem, named nodes from 36rem.
+const largeOnly = (p: Partial<PlacePoint>) => large && !(nameIn(p) && nameIn(p) !== 'none') && Boolean(p.anchor?.large && p.anchor.large !== 'none');
+const namedHere = cities === true ? mapPlaces.filter((p) => (nameIn(p) && nameIn(p) !== 'none') || largeOnly(p)) : [];
 const placeList: MapPlace[] =
   cities === true && mapPlaces.length ? namedHere.map((p) => ({ id: p.id, name: p.name ?? p.id, lat: p.lat ?? 0, lon: p.lon ?? 0 })) : places;
 const points = placeList.map((p) => {
@@ -105,12 +113,13 @@ const points = placeList.map((p) => {
   const pos = pct(pt.x, pt.y);
   // Names placed at build time (Città Digitali) carry an anchor per class of width; without one,
   // labels of places in the eastern part of the map hang to the left, so they stay inside it.
-  const wide = cities === true ? nameIn(pt) : undefined;
-  const narrow = cities === true && nameClass !== 'hero' ? pt.anchor?.narrow : undefined;
+  const from = cities === true && largeOnly(pt) ? 'large' : undefined;
+  const wide = cities === true ? (from ? pt.anchor?.large : nameIn(pt)) : undefined;
+  const narrow = cities === true && nameClass !== 'hero' && !from ? pt.anchor?.narrow : undefined;
   // A long required name on two lines: always, or only on narrow or only on wide maps.
   const lines = nameClass === 'hero' ? undefined : (pt.lines?.narrow ?? pt.lines?.wide);
   const breakOn = pt.lines?.narrow && pt.lines?.wide ? 'always' : pt.lines?.narrow ? 'narrow' : pt.lines?.wide ? 'wide' : undefined;
-  return { ...p, ...pos, anchor: wide ? { wide, narrow: narrow ?? wide } : undefined, lines, breakOn, isHome: p.id === home, labelLeft: !wide && pos.left > 55 };
+  return { ...p, ...pos, anchor: wide ? { wide, narrow: narrow ?? wide } : undefined, from, lines, breakOn, isHome: p.id === home, labelLeft: !wide && pos.left > 55 };
 });
 // Dots: with `cities` the unnamed cities (and the cities named only in other classes); with
 // `cities="dots"` every city that is not a node here.
@@ -162,6 +171,7 @@ if (!data) {
         style={`left: ${p.left}%; top: ${p.top}%; --i: ${i}`}
         data-place={p.id}
         data-narrow={p.anchor?.narrow === 'none' ? 'dot' : undefined}
+        data-from={p.from}
       >
         <span class="map__node" />
         {showLabels && (
@@ -417,6 +427,15 @@ if (!data) {
     .map--pugliaRegione .map__area { display: none; }
   }
 
+  /* Names of the large class (`large`, /citta-digitali/): a dot below 36rem, a named node from 36rem. */
+  .map__place[data-from='large'] .map__node { left: -2.5px; top: -2.5px; width: 5px; height: 5px; }
+  .map__place[data-from='large'] .map__label { display: none; }
+
+  @container (min-width: 36rem) {
+    .map__place[data-from='large'] .map__node { left: -5px; top: -5px; width: 10px; height: 10px; }
+    .map__place[data-from='large'] .map__label { display: grid; }
+  }
+
   /* Windows contrast themes (forced colors): the system paints every background in its canvas
      colour, so nodes, dots and leaders would vanish, and dots would cut gaps in the coastline. Draw
      them in the text colour of the theme; the knockout ring takes the canvas colour. */
diff --git a/src/components/sections/LocationShowcase.astro b/src/components/sections/LocationShowcase.astro
index 27847fa..edb1fe3 100644
--- a/src/components/sections/LocationShowcase.astro
+++ b/src/components/sections/LocationShowcase.astro
@@ -7,7 +7,8 @@
  * - `italy` (Città Digitali): outline map of Italy on the right, cities on the left aligned
  *   to the latitude of their node; hovering or focusing a city lights its node. With
  *   `cityDots`, every other city of Città Digitali is a dot on the map (visual direction §1.4); with
- *   `cityDots.names`, the map also draws the names of the Home map, where they fit.
+ *   `cityDots.names`, the map also draws the names of the Home map, where they fit, and from 36rem
+ *   those of the large class (MapItaly `large`).
  * Every «Esplora ↗» opens the town portal in a new tab, announced to assistive technology.
  */
 import Media from '../ui/Media.astro';
@@ -54,7 +55,10 @@ interface Props {
    * is not in the text beside it; without it the map and its legend stay aria-hidden (the legend only
    * explains what is seen).
    */
-  /** `names`: the map draws the names of the Home map (chapter 03) instead of leaving them to the cards. */
+  /**
+   * `names`: the map draws the names of the Home map (chapter 03) instead of leaving them to the cards,
+   * and from 36rem those of the large class too (MapItaly `large`).
+   */
   cityDots?: { legend: string; label?: string; names?: boolean };
 }
 
@@ -168,7 +172,7 @@ const north = [...locations]
             {cityDots ? (
               <figure class="places__atlas" aria-hidden={cityDots.label ? undefined : 'true'}>
                 {cityDots.names ? (
-                  <MapItaly map="italia" cities label={cityDots.label} class="places__map-svg" />
+                  <MapItaly map="italia" cities large label={cityDots.label} class="places__map-svg" />
                 ) : (
                   <MapItaly map="italia" places={north} cities="dots" showLabels={false} label={cityDots.label} class="places__map-svg" />
                 )}
```

**Patch B**

```diff
diff --git a/src/components/sections/LocationShowcase.astro b/src/components/sections/LocationShowcase.astro
index 27847fa..fc1990d 100644
--- a/src/components/sections/LocationShowcase.astro
+++ b/src/components/sections/LocationShowcase.astro
@@ -80,6 +80,13 @@ const italyPoints: ItalyPoint[] = [...(italia?.places ?? []), ...(italia?.dots ?
 const north = [...locations]
   .sort((a, b) => b.lat - a.lat)
   .map((l) => ({ ...l, y: italyPoints.find((p) => p.id === l.id)?.yPct }));
+// From 80em each city stands at the latitude of its node: the list starts at the first latitude, and each
+// city is at least as tall as the gap to the next one (in % of the map's height). A taller city (WCAG 1.4.12
+// text spacing) pushes the next one down instead of covering it.
+const gapToNext = (i: number) => {
+  const [a, b] = [north[i]?.y, north[i + 1]?.y];
+  return a !== undefined && b !== undefined ? +(b - a).toFixed(2) : undefined;
+};
 ---
 
 <section id={id} class:list={['places', `places--${variant}`, `surface-${surface}`]} aria-labelledby={`${id}-title`}>
@@ -178,9 +185,9 @@ const north = [...locations]
               <MapItaly map="italia" places={north} showLabels={false} class="places__map-svg" />
             )}
           </div>
-          <ol role="list" class="places__cities">
-            {north.map((c) => (
-              <li class="city" data-place-link={c.id} style={c.y !== undefined ? `--y: ${c.y}` : undefined}>
+          <ol role="list" class="places__cities" style={north[0]?.y !== undefined ? `--first: ${north[0].y}` : undefined}>
+            {north.map((c, i) => (
+              <li class="city" data-place-link={c.id} style={gapToNext(i) !== undefined ? `--to-next: ${gapToNext(i)}` : undefined}>
                 <h3 class="city__name">{c.name}</h3>
                 <p class="city__meta t-label">
                   {c.region && <span>{c.region}</span>}
@@ -494,13 +501,21 @@ const north = [...locations]
       padding-bottom: var(--space-3xl);
     }
 
+    /* As tall as the map (stretched in its row), so that the latitudes below are % of the map's height. If
+       the cities need more room than the map (WCAG 1.4.12 text spacing), the row grows: nothing overflows. */
     .places__cities {
-      position: relative;
       align-self: stretch;
       display: block;
       padding: 0;
     }
 
+    /* From the top of the map to the first city's rule, 1.2rem above its node. */
+    .places__cities::before {
+      content: '';
+      display: block;
+      height: calc(var(--first, 0) * 1% - 1.2rem);
+    }
+
     /* The cities stand at the latitude of their node: the legend must not lengthen the map's row. */
     .places__atlas {
       position: relative;
@@ -513,13 +528,16 @@ const north = [...locations]
     }
 
     .city {
-      position: absolute;
-      inset-inline: 0;
-      top: calc(var(--y, 0) * 1%);
-      translate: 0 -1.2rem;
+      min-height: calc(var(--to-next, 0) * 1%);
       grid-template-columns: minmax(0, 1fr) auto;
       column-gap: var(--space-m);
       align-items: baseline;
+      align-content: start;
+    }
+
+    /* A long name breaks inside its column (WCAG 1.4.12) instead of running under «Esplora». */
+    .city__name {
+      max-width: 100%;
     }
 
     .city__name,
```

## Verdetto di dominio (UI)

- **426e6dc è conforme al design system.** Rispetta la direzione visiva salvo la regola 9, che va aggiornata.
  - La carta con i nomi rispetta la regola 11 e non si sovrappone a nulla da 320 a 1920 px, con e senza 1.4.12.
  - Le schede restano alla latitudine dei loro nodi.
- **Da correggere, anche se precedenti al commit:** i due problemi di 1.4.12 delle schede (§2.2), con la patch B.
- **Proposta:** la classe «ampie» con Lecce (patch A), se il creative-director la approva.

## Ipotesi da validare

- **Browser.** Le misure sono in Chromium. Query di contenitore, classi e richiami vanno riverificati su Safari iOS e Firefox, come per le altre carte `[DA VERIFICARE]`.
- **Criterio della lista.** «Le più importanti» qui vuol dire «capoluoghi di provincia» `[IPOTESI: criterio dell'utente, da confermare]`. Con un altro criterio, per esempio la popolazione, entrerebbe anche Andria, con il problema del §3.1.
- **Larghezza massima.** I 731 px valgono finché la pagina è di 100rem e la carta occupa 6 colonne su 12. Se l'impaginato cambia, si aggiornano la classe e le prove.

## Domande aperte

- **Per il creative-director:**
  - va bene Lecce appesa a 40 px?
  - Manfredonia resta senza nome anche sulle carte più larghe, finché nessuna posizione la tiene lontana dalla punta del Gargano?
- **Per ux-designer:** la patch B o la soglia a 86em?

## Decisioni richieste

1. **creative-director:**
   - la classe «ampie» e la lista `nomi.ampie` (patch A);
   - l'aggiornamento delle regole 2, 7 e 9 della direzione visiva.
2. **ux-designer, poi creative-director:** la correzione di 1.4.12 delle schede (patch B), oppure l'alternativa della soglia.
3. **Sessione principale:** applicare le patch approvate, nell'ordine che preferisce.
