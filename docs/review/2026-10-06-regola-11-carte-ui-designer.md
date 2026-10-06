---
titolo: Regola 11 su tutte le carte · correzione della carta d'Italia del capitolo 03 della Home
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-10-06
fonti: [docs/creativa/direzione-visiva.md (0.11: §1.4 «Il punto-città», regole 3, 6, 7, 11; §7.3), richiesta della sessione principale del 2026-10-06 con l'ordine di preferenza del creative-director, docs/ux/accessibilita.md (0.7: tetto di 250 caratteri), docs/review/2026-10-06-carta-puglia-intera-ui-designer.md (P4, patch 6), docs/review/2026-10-06-carta-puglia-intera-ux-designer.md (L7), docs/performance/budget.md (§3), scripts/generate-maps.mjs, src/data/citta-digitali.json, src/components/ui/MapItaly.astro, src/pages/index.astro, src/lib/citta-digitali.ts, repository al commit e9f845d (base delle patch), staging http://localhost:4321 (build di e9f845d), build di prova con le modifiche (copie nello scratchpad, non versionate), misure Playwright 1.56 (Chromium 141) e axe-core 4.13 del 2026-10-06]
---

# Regola 11 su tutte le carte · correzione della carta d'Italia del capitolo 03 della Home

**Richiesta** (sessione principale, 2026-10-06).
- **Regola 11** (DV 0.11 §1.4): ogni nome, richiamo compreso, sta ad almeno 6 px dai nodi con nome delle altre città.
- **Cosa non va oggi**, secondo le misure del creative-director sulla carta del capitolo 03 della Home:
  - «MANFREDONIA» passa a 3,5–5,9 px dal nodo di Itri;
  - «MASSAFRA» arriva a 4,1 px da quello di Cosenza.
- **Ordine di preferenza del creative-director:**
  1. tenere i 9 nomi, cambiando le posizioni;
  2. altrimenti, la serie di nomi della carta stretta fino alla larghezza da cui la regola vale;
  3. per ultima, un'altra scelta di nomi.
- **Vincoli:** la descrizione della Home resta sotto i 250 caratteri. La regola va nel generatore, così vale per tutte le carte. La patch 6 (P4) resta pronta e allineata.

## In sintesi

- **Nel generatore la regola 11 vale per ogni carta con i nomi calcolati** (patch R1): oggi la carta d'Italia e la Puglia intera.
  - Ogni posizione di nome la rispetta. Un controllo finale rimisura il risultato e ferma il build se un nome scende sotto i 6 px.
  - Il generatore stampa la distanza minima: 6,7 px su entrambe le carte.
  - La misura è quella della regola 3: l'etichetta nel caso peggiore, con la spaziatura di WCAG 1.4.12, e il nodo con il suo anello di ritaglio.
  - La Puglia intera esce identica byte per byte.
- **Le preferenze 1 e 2 non salvano Manfredonia.**
  - Nessuna posizione tiene «MANFREDONIA» a 6 px da Itri a ogni larghezza delle carte larghe (400–480 px): al massimo arriva a 4,6 px, a 480.
  - Le altre posizioni escono dalla carta o coprono un punto: San Giovanni Rotondo, Terracina, Ercolano, Pompei.
  - Massafra rispetta la regola solo da 435 px di carta, e servirebbe una terza classe di larghezza.
- **Proposta (P1 e P2): 7 nomi sulle carte larghe.** Varese, Itri, Bari, Altamura, Cosenza, Caltanissetta, Caltagirone.
  - Escono Manfredonia e Massafra e non ne entra nessuno. È la preferenza 2 applicata nome per nome: restano i nomi per cui la regola vale già.
  - Sulle carte strette non cambia nulla: 5 nomi, immagine identica pixel per pixel a 390 px.
  - Serve una riga di dati (patch R2): sulla carta d'Italia il gruppo del Gargano tiene solo Manfredonia. Senza, il generatore sceglie San Giovanni Rotondo, il cui nome attraversa la penisola dal Tirreno all'Adriatico (§4).
- **Descrizione della Home:** 218 caratteri (oggi 241). **Peso:** −0,09 KB gzip.
- **Prove** sulle pagine rese, finestre da 320 a 1920 px ogni 5:
  - nessuna sovrapposizione, con e senza la spaziatura di 1.4.12;
  - distanza minima in pagina 8,4 px (7,2 con 1.4.12), misurata come il generatore;
  - axe: 0 violazioni;
  - le altre sette pagine identiche byte per byte allo staging.
- **Trovato in più, `[BLOCCANTE]` per il go-live: la carta della Terra di Bari del capitolo 02 della Home** (§6).
  - I suoi nomi li posiziona il CSS, non il generatore. Sulle carte di 400–480 px le coordinate di Monopoli coprono l'anello della sede in 214 finestre su 321.
  - A 1075–1135 px coprono anche il nome di Acquaviva delle Fonti; con la spaziatura di 1.4.12 il testo copre testo.
  - Il difetto c'era già prima delle carte di oggi.
  - Esce con P4, che toglie quella carta dalla Home, oppure, se l'utente dice no a P4, con la patch R3: nessuna coordinata sulla carta compatta.
- **Patch 6 v2 (P4).** Il capitolo 02 con la Puglia intera ha ora la descrizione L7 di `/puglia-digitale/`, identica (222 caratteri).
  - Regola 11: minimo 13,9 px in pagina (7,6 con 1.4.12).
  - Nessuna sovrapposizione in 321 finestre.
- **sha256 di `src/data/maps.json`** dopo `npm run maps`:
  - con R1 e R2: `a0279e6849468dce4fcf4222c33e4a3fd988ee564618fafbc5fe89e44db75090`;
  - con la sola R1, cioè la variante con San Giovanni Rotondo: `444a31fd9516358bb7eb922a44ef617b4e0b11e0c361381922a4747b6c5f8133`.
- **Immagini** (a sinistra oggi, a destra la proposta):
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-apart/proposta-regola11-cap03-450.png` (carta di 406 px)
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-apart/proposta-regola11-cap03-1440.png` (480 px)
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-apart/alternativa-sgr-cap03-1440.png` (oggi e la variante con San Giovanni Rotondo)
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-apart/cap02-terra-di-bari-1075.png` (capitolo 02 a 1075 px: oggi, patch R3, P4)

## 1. Come misura il generatore

- **Stessa misura della regola 3.**
  - Etichetta mono a 13 px con la spaziatura di 1.4.12: 9,6 px per carattere, riga di 19,5 px, 2 px di fondo per lato.
  - Nodo con nome di raggio 6,5 px (Ø 10 più l'anello di ritaglio di 1,5 px), anello della sede di 13,5 px.
  - Ogni 5 px di larghezza della carta, a ogni larghezza della classe.
- **«Richiamo compreso».** Contano sia il riquadro del nome sia il richiamo.
- **Due livelli.**
  - La ricerca delle posizioni scarta quelle a meno di 6 px.
  - Poi `checkApart` rimisura il risultato finale di ogni carta e ferma il build. Se domani cambia la ricerca, la regola non si perde in silenzio.
- **In pagina, con la spaziatura normale, il margine è più ampio.** Il creative-director misura dal bordo dipinto del nodo (raggio 5) al riquadro dell'etichetta: con la proposta il minimo è 9,6 px, e 8,4 con 1.4.12.
- **Perché il caso peggiore.** Con la spaziatura di 1.4.12 «MANFREDONIA» oggi sta a meno di 6 px da Itri a quasi ogni larghezza delle carte larghe, con un minimo di 2,2 px. È la condizione che il generatore usa per tutte le altre regole.
- **Carte non coperte dal generatore.**
  - Sulla carta di `/citta-digitali/` i nomi non ci sono (regola 9).
  - Sulla carta della Terra di Bari li posiziona il CSS (§6). Lì il controllo si fa in pagina.

## 2. Preferenza 1: tenere i 9 nomi cambiando le posizioni

Non basta. La ricerca del generatore prova già tutte le posizioni di tutti i nomi insieme: con la regola 11 non esiste una combinazione con Manfredonia, e nemmeno una con Massafra.

**Manfredonia** (carte larghe, 400–480 px):

| Posizione | Esito |
|---|---|
| `w` (oggi) | No, a nessuna larghezza: 1,2 px dal nodo di Itri a 400 px, 4,6 a 480 |
| `e`, `ne`, `se`, `drop-r`, `drop2-r`, `drop3-r` | Escono dalla carta: a est di Manfredonia restano 97–117 px, il nome ne chiede 118–124 |
| `nw` | Solo fino a 440 px: da 445 copre il punto di San Giovanni Rotondo |
| `sw` | Copre il punto di Terracina |
| `drop-l`, `drop2-l` | Coprono il punto di Ercolano, e `drop-l` anche quello di Terracina |
| `drop3-l` (56 px, oggi solo sulla carta della Puglia) | Solo a 400–410 px; poi copre Pompei ed Ercolano |

**Massafra:**
- `drop2-l` (oggi) rispetta la regola solo da 435 px: sotto, il nome sta a meno di 6 px dal nodo di Cosenza.
- `sw` e `drop-l` sono libere, ma si sovrappongono al nome di Altamura.
  - Altamura è obbligatoria e ha solo `drop-l` e `drop2-l`.
  - Le altre posizioni di Altamura escono dalla carta o coprono un punto: Ercolano, Andria, Acquaviva, Brindisi, Copertino.
- `w` copre Cassano o Gravina, `nw` copre Acquaviva. Le posizioni a est escono dalla carta.

## 3. Preferenza 2: la serie stretta fino a dove la regola vale

- **Per Manfredonia non c'è una soglia.**
  - Nel caso peggiore «MANFREDONIA» non arriva a 6 px da Itri prima dei 480 px, la carta più larga del capitolo.
  - In pagina, con la spaziatura normale, ci arriva da 460 px (misura del creative-director), ma con 1.4.12 mai.
  - Alzare la soglia della classe, a 430 come a 460, non basta.
- **Per Massafra la soglia c'è: 435 px.**
  - Ma vorrebbe una terza classe di larghezza solo sulla carta d'Italia: un'altra serie di posizioni in `MapItaly.astro` e una query di contenitore a 27,1875rem.
  - E il nome resterebbe appeso a 40 px sotto il nodo, in Basilicata. È l'altra metà del problema che il creative-director ha visto: Massafra «in Calabria».
- **Applicata nome per nome, la preferenza 2 dà la proposta.**
  - I due nomi che a nessuna larghezza della classe rispettano la regola restano punti.
  - Gli altri sette restano, con la regola rispettata ovunque.
  - Non serve un nome nuovo, quindi non serve la preferenza 3.

## 4. Preferenza 3: San Giovanni Rotondo (sconsigliata)

- **Che cosa fa il generatore.** Con la sola R1 segue l'ordine editoriale: nel gruppo del Gargano, dopo Manfredonia, viene San Giovanni Rotondo. Ne escono 8 nomi.
- **Il problema.** «SAN GIOVANNI ROTONDO» sono 20 caratteri: 196 px su una carta di 400, la metà.
  - L'unica posizione libera è `nw`, a sinistra del nodo: il nome attraversa la penisola dal Tirreno all'Adriatico, all'altezza di Lazio e Abruzzo.
  - Il suo fondo interrompe due tratti di costa.
  - Si legge come la didascalia dell'Italia centrale, non come il nome di una città del Gargano (`alternativa-sgr-cap03-1440.png`).
- **Proposta: sulla carta d'Italia il gruppo del Gargano tiene solo Manfredonia** (patch R2, una riga di `nomi`).
  - Se un giorno la carta crescesse, Manfredonia tornerebbe da sola, dove la regola lo permette.
  - La carta della Puglia (`nomiPuglia`) non cambia.
  - L'ordine dei nomi è una scelta editoriale: decide il creative-director.

## 5. Proposta (P1, P2)

| Classe | Oggi | Proposta |
|---|---|---|
| Strette, 280–400 px (finestre 320–440 e 1025–1070) | Varese, Itri, Altamura (appeso), Cosenza, Caltanissetta | Invariata, pixel per pixel |
| Larghe, 400–480 px (finestre 445–1020 e da 1075) | In più: Manfredonia, Bari, Massafra (appeso), Caltagirone | In più: Bari, Caltagirone. Itri passa a destra del nodo, Cosenza a sinistra (sul Tirreno) |

- **Puglia** ha due nomi, Bari e Altamura. I punti, 31 su 45, dicono il resto, e la legenda resta «Ogni punto è una città di Città Digitali».
- **Descrizione della Home**, costruita dagli stessi dati: «Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Itri, Bari, Altamura, Cosenza, Caltanissetta e Caltagirone.»
  - Sono 218 caratteri, sotto il tetto di 250.
  - Come oggi, cita i nomi delle carte larghe. Se ux-designer vuole la regola della L7, cioè i soli nomi disegnati a ogni larghezza, i nomi scendono a cinque: basta cambiare il filtro in `index.astro`.
- **Come applicare.**
  1. Patch R1 e R2 (insieme sono `regola-11.patch`).
  2. `npm run maps`: sha256 `a0279e6849468dce4fcf4222c33e4a3fd988ee564618fafbc5fe89e44db75090`.
  3. Build.
  - Se il creative-director preferisce San Giovanni Rotondo, solo R1: sha256 `444a31fd9516358bb7eb922a44ef617b4e0b11e0c361381922a4747b6c5f8133`.

## 6. Le altre carte

| Carta | Dove | Regola 11 |
|---|---|---|
| `pugliaRegione` | hero di `/puglia-digitale/`, e con P4 il capitolo 02 della Home | Rispettata. Esce identica byte per byte. Minimo del generatore 6,7 px: «MASSAFRA», appeso a destra, verso il nodo di Nardò a 400 px |
| `italia`, modo `cities="dots"` | `/citta-digitali/` | Nessun nome sulla carta (regola 9). HTML identico byte per byte |
| `puglia` (Terra di Bari) | capitolo 02 della Home | **Non rispettata, e con sovrapposizioni.** Nomi e coordinate li posiziona il CSS: il generatore non li vede |

**La carta della Terra di Bari, `[BLOCCANTE]` per il go-live.**
- **Dove:** `src/pages/index.astro` (capitolo 02) e `src/components/ui/MapItaly.astro` (`.map__coords`).
- **Problema.** Sopra i 25rem di carta compaiono le coordinate. L'etichetta di Monopoli, appesa a sinistra del nodo, scende con la sua seconda riga sull'anello della sede. Misure sul testo (rettangoli di Range, non i riquadri):

| Finestre (carta) | Problema |
|---|---|
| 445–485 (402–439 px) | Le coordinate di Monopoli coprono l'anello della sede; fino a 470 le coordinate di Gravina escono dal riquadro della carta |
| 490–505 (444–458 px) | Le coordinate di Monopoli a meno di 6 px dall'anello |
| 870–1020 (480 px) | Coprono l'anello |
| 1075–1135 (402–425 px) | Coprono anche il nome di Acquaviva delle Fonti; Gravina esce dal riquadro |
| 1140–1230 (427–461 px) | Coprono l'anello; Gravina esce dal riquadro |
| 1235–1920 (463–480 px) | Coprono l'anello |

- **Con la spaziatura di 1.4.12** i problemi salgono a 286 finestre su 321. A 445–455 e a 1075–1185 il testo copre il testo: è una perdita di contenuto (WCAG 1.4.12, soglia AA).
- **Non è un effetto delle carte di oggi.** La stessa geometria c'è sulla build del commit 43cb915, prima della Puglia intera, e la soglia delle coordinate a 25rem è del commit 93c3f49.
- **Proposta, in ordine.**
  1. **P4**, già consigliata dal creative-director: la carta della Terra di Bari esce dalla Home. Decide l'utente.
  2. **Se l'utente dice no a P4, patch R3:** nessuna coordinata sulla carta compatta, che oggi c'è solo nel capitolo 02 della Home.
     - Sulla build: 0 problemi in 321 finestre, con e senza 1.4.12; +5 byte gzip per pagina.
     - Le coordinate dei tre luoghi restano dove servono: sotto gli H3 delle porte di `/puglia-digitale/` e nella didascalia dell'osservatore della hero.
     - La DV §1.4 («Dove») elenca questa carta tra gli usi delle coordinate: decide il creative-director.

## 7. Capitolo 02 della Home con la Puglia intera (P4, patch 6 v2)

- **Cosa cambia rispetto alla patch 6** della review del 2026-10-06 sulla Puglia intera: solo la descrizione.
  - Segue la L7 di `/puglia-digitale/`: i nomi disegnati a ogni larghezza della carta compatta, da nord a sud, senza la sede, che ha la sua frase.
  - Il testo è identico a quello della pagina, 222 caratteri: «Carta della Puglia con le città di Puglia Digitale, più numerose nella provincia di Bari. Tra queste: Manfredonia, Barletta, Bari, Monopoli, Gravina in Puglia e Nardò. Un anello segna Acquaviva delle Fonti, sede di ITnode.»
- **Regola 11.** Allineata per costruzione: la carta è la stessa `pugliaRegione`, con R1 o senza.
- **Prove** sulla build con R1, R2 e la patch 6 v2:
  - nessuna sovrapposizione in 321 finestre, con e senza 1.4.12;
  - minimo in pagina 13,9 px, 7,6 con 1.4.12;
  - axe 0 violazioni;
  - albero di accessibilità: due figure, ognuna con la sua legenda e la sua immagine descritta.
- **Peso:** Home 29,4 KB gzip su 40.
- **Base:** la patch si applica al commit e9f845d, da sola o dopo R1–R3.

## 8. Snippet

- **Base di verifica.** `git apply --check` sul repository al commit e9f845d, senza modifiche in sospeso, per ogni patch da sola e per R1 con R2.
- **Prova da zero.** Su una copia pulita di e9f845d:
  - R1 dà `maps.json` con sha256 `444a31fd…`, identico a quello provato;
  - R1 con R2 dà `a0279e68…`. La build dà HTML identico byte per byte a quello provato per Home, `/puglia-digitale/`, `/citta-digitali/`, `/siii/`, `/contatti/` e 404;
  - con la patch 6 v2 la Home è identica a quella provata, e così con R3 le tre pagine con carte;
  - `astro check`: 0 errori, 0 avvisi, i 2 suggerimenti di sempre.
- **Copie nello scratchpad:** `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-apart/diff/` (`regola-11.patch` = R1 + R2, `R3-mapitaly-compact.patch`, `6-v2-home-capitolo-02.patch`).

#### R1 · `scripts/generate-maps.mjs`: la regola 11 per tutte le carte

```diff
diff --git a/scripts/generate-maps.mjs b/scripts/generate-maps.mjs
index 7b2c13c..f096ef4 100644
--- a/scripts/generate-maps.mjs
+++ b/scripts/generate-maps.mjs
@@ -237,10 +237,12 @@ function toCurvePath(lines, decimals) {
 // Each name takes one position around its node: beside it, on a corner, or hanging below it on a
 // vertical leader, the gesture of the Horizon labels (design system §2.1). A name is shown only if
 // it covers no dot, no node, no other name, no other leader and no area name at every width of its
-// class, and stays inside the map.
+// class, and stays inside the map. On every map a name, leader included, also keeps 6 px from the
+// nodes of the other named cities, so that it never reads as the name of the node beside it (visual
+// direction §1.4, rule 11): the build checks the result again and stops if a name breaks the rule.
 // Metrics: mono label at 13 px, uppercase, with the user text spacing of WCAG 1.4.12 (0.12em
 // tracking, line-height 1.5). Offsets match the anchor rules in MapItaly.astro.
-const LABEL = { advance: 9.6, pad: 2, line: 19.5, node: 6.5, dot: 4, ring: 13.5, clear: 1, indent: 8, areaMax: 104 }; // node and dot radii include the 1.5 px knockout ring; ring: the office; areaMax: 8em
+const LABEL = { advance: 9.6, pad: 2, line: 19.5, node: 6.5, dot: 4, ring: 13.5, clear: 1, indent: 8, areaMax: 104, apart: 6 }; // node and dot radii include the 1.5 px knockout ring; ring: the office; areaMax: 8em; apart: rule 11, from the knockout ring
 const NAME_CLASSES = { narrow: [280, 400], wide: [400, 480] }; // px; .worlds__map is 280 px at 320 and 30rem at most
 const STEP = 5;
 const DROPS = { 'drop-r': 24, 'drop-l': 24, 'drop2-r': 40, 'drop2-l': 40, 'drop3-r': 56, 'drop3-l': 56 }; // px from the node centre to the first line
@@ -271,6 +273,7 @@ const circleHitsBox = (cx, cy, r, [x0, y0, x1, y1]) => {
   return (cx - nx) ** 2 + (cy - ny) ** 2 < r * r;
 };
 const boxesHit = (a, b, m) => a[0] < b[2] + m && a[2] > b[0] - m && a[1] < b[3] + m && a[3] > b[1] - m;
+const pointToBox = (x, y, [x0, y0, x1, y1]) => Math.hypot(Math.max(x0 - x, 0, x - x1), Math.max(y0 - y, 0, y - y1));
 const widthRange = ([from, to]) => { const r = []; for (let w = from; w <= to; w += STEP) r.push(w); return r; };
 
 /** A name on two lines, broken at the space that makes the longer line shortest (never hyphenated). */
@@ -317,10 +320,9 @@ function areaBox(a, W, view) {
  * Anchors (and line breaks) for every city of `named` together (backtracking), or null if they do not
  * all fit at `widths`. `opts.home`: id of the office (its ring keeps other names away, its own name
  * stays beside it); `opts.areas`: area names to keep clear; `opts.wrap`: ids that may break on two lines;
- * `opts.longDrops`: leaders of 56 px too; `opts.apart`: px between a name and the other named nodes, so
- * that a name never reads as the name of the node beside it.
+ * `opts.longDrops`: leaders of 56 px too.
  */
-function placeNames(named, cities, view, widths, { home = null, areas = [], wrap = [], longDrops = false, apart = LABEL.clear } = {}, budget = 300000) {
+function placeNames(named, cities, view, widths, { home = null, areas = [], wrap = [], longDrops = false } = {}, budget = 300000) {
   const others = cities.filter((c) => !named.includes(c));
   const radius = (q) => (q.id === home ? LABEL.ring : LABEL.node);
   const free = (p, a, lines) => widths.every((W) => {
@@ -328,7 +330,7 @@ function placeNames(named, cities, view, widths, { home = null, areas = [], wrap
     if (box[0] < 0 || box[1] < 0 || box[2] > W || box[3] > view.height * k) return false;
     const touches = (x, y, r) => circleHitsBox(x * k, y * k, r + LABEL.clear, box) || (leader && circleHitsBox(x * k, y * k, r + LABEL.clear, leader));
     if (areas.some((ar) => boxesHit(box, areaBox(ar, W, view), LABEL.clear) || (leader && boxesHit(leader, areaBox(ar, W, view), LABEL.clear)))) return false;
-    return !others.some((d) => touches(d.x, d.y, LABEL.dot)) && !named.some((q) => q !== p && touches(q.x, q.y, radius(q) + apart - LABEL.clear));
+    return !others.some((d) => touches(d.x, d.y, LABEL.dot)) && !named.some((q) => q !== p && touches(q.x, q.y, radius(q) + LABEL.apart - LABEL.clear));
   });
   const layouts = (p) => [[p.name], ...(wrap.includes(p.id) && twoLines(p.name) ? [twoLines(p.name)] : [])];
   const options = named.map((p) => layouts(p).flatMap((lines) => anchorOrder(p, view, longDrops)
@@ -351,6 +353,30 @@ function placeNames(named, cities, view, widths, { home = null, areas = [], wrap
   return search(0) ? Object.fromEntries(named.map((p, i) => [p.id, { anchor: chosen[i].a, lines: chosen[i].lines }])) : null;
 }
 
+/**
+ * Rule 11 on a result of chooseNames: the smallest gap, in px, between a name (leader included) and
+ * the node of another city named in the same class, over every width of every class. Stops the build
+ * under LABEL.apart.
+ */
+function checkApart(id, result, cities, view, classes, home) {
+  const byId = Object.fromEntries(cities.map((c) => [c.id, c]));
+  let min = Infinity;
+  for (const c of classes) {
+    const shown = Object.entries(result).filter(([, e]) => e.anchor[c.name] !== 'none')
+      .map(([cid, e]) => ({ p: byId[cid], anchor: e.anchor[c.name], lines: e.lines?.[c.name] ?? [byId[cid].name] }));
+    for (const W of widthRange(c.range)) for (const a of shown) {
+      const { k, box, leader } = nameGeometry(a.p, a.anchor, W, view, a.lines, a.p.id === home);
+      for (const b of shown) {
+        if (b === a) continue;
+        const gap = Math.min(...[box, leader].filter(Boolean).map((r) => pointToBox(b.p.x * k, b.p.y * k, r))) - (b.p.id === home ? LABEL.ring : LABEL.node);
+        if (gap < LABEL.apart) throw new Error(`${id}: ${a.p.name} is ${gap.toFixed(1)} px from the node of ${b.p.name} on ${c.name} maps at ${W} px (visual direction §1.4, rule 11)`);
+        min = Math.min(min, gap);
+      }
+    }
+  }
+  return min;
+}
+
 /**
  * Names per class of width, in the editorial order of `nomi`: the required names (those of the text
  * beside the map), the solid names (project materials), then one name per group (the first that
@@ -393,12 +419,15 @@ function chooseNames(cities, nomi, view, { id = 'italia', classes = [{ name: 'na
     if (lost.length) console.warn(`${id}: ${lost.join(', ')} named on ${prev.name} maps but not on ${c.name} ones`);
   });
   const last = results.at(-1);
-  return Object.fromEntries(last.ids.map((cid) => {
+  const result = Object.fromEntries(last.ids.map((cid) => {
     const entry = { anchor: Object.fromEntries([...results].reverse().map((r) => [r.name, r.placed[cid]?.anchor ?? 'none'])) };
     const broken = results.filter((r) => r.placed[cid]?.lines.length > 1);
     if (broken.length) entry.lines = Object.fromEntries(broken.map((r) => [r.name, r.placed[cid].lines]));
     return [cid, entry];
   }));
+  const gap = checkApart(id, result, cities, view, classes, opts.home);
+  console.log(`${id}: names at least ${gap.toFixed(1)} px from the other named nodes (rule 11)`);
+  return result;
 }
 
 // ─── Map builders ───
@@ -566,7 +595,7 @@ function buildPugliaRegione({ width = 1000, minAreaKm2 = 1.65, decimals = 1, pad
     const hit = points.find((c) => circleHitsBox(c.x * k, c.y * k, (c.id === office ? LABEL.ring : LABEL.node) + LABEL.clear, box));
     if (hit) throw new Error(`pugliaRegione: ${ar.text} covers ${hit.id} at ${W} px`);
   }
-  const names = chooseNames(points, CITIES.nomiPuglia, view, { id: 'pugliaRegione', classes: PUGLIA_NAME_CLASSES, home: office, areas, wrap: CITIES.nomiPuglia.obbligatori, longDrops: true, apart: 6 });
+  const names = chooseNames(points, CITIES.nomiPuglia, view, { id: 'pugliaRegione', classes: PUGLIA_NAME_CLASSES, home: office, areas, wrap: CITIES.nomiPuglia.obbligatori, longDrops: true });
   const named = points.filter((c) => names[c.id]);
   const dots = points.filter((c) => !names[c.id]).sort((p, q) => p.y - q.y); // north first: southern dots paint on top
   return {
```

#### R2 · `src/data/citta-digitali.json`: il gruppo del Gargano sulla carta d'Italia

```diff
diff --git a/src/data/citta-digitali.json b/src/data/citta-digitali.json
index 6c53587..2842c04 100644
--- a/src/data/citta-digitali.json
+++ b/src/data/citta-digitali.json
@@ -57,7 +57,7 @@
       ["pompei", "ercolano", "torre-del-greco", "torre-annunziata"],
       ["cosenza"],
       ["monopoli", "martina-franca", "fasano", "putignano", "alberobello", "locorotondo", "cisternino", "ostuni"],
-      ["manfredonia", "san-giovanni-rotondo"],
+      ["manfredonia"],
       ["bitonto", "bari", "barletta", "andria", "trani", "bisceglie"],
       ["massafra", "grottaglie", "francavilla-fontana"],
       ["lecce", "copertino", "nardo", "gallipoli"],
```

#### R3 · `src/components/ui/MapItaly.astro`: la carta compatta senza coordinate (solo se P4 non passa)

```diff
diff --git a/src/components/ui/MapItaly.astro b/src/components/ui/MapItaly.astro
index cf610c1..9775bbc 100644
--- a/src/components/ui/MapItaly.astro
+++ b/src/components/ui/MapItaly.astro
@@ -437,6 +437,12 @@ if (!data) {
     }
   }
 
+  /* The compact frame (Home chapter 02, at most 30rem): names only at every width. With the
+     coordinates, those of Monopoli would cover the office ring and the name of Acquaviva. */
+  .map--compact .map__coords {
+    display: none;
+  }
+
   /* The compact frame crops the coastline: clip it to the frame. */
   .map--compact .map__svg {
     overflow: clip;
```

#### Patch 6 v2 · `src/pages/index.astro`: capitolo 02 con la Puglia intera (P4, con il sì dell'utente)

```diff
diff --git a/src/pages/index.astro b/src/pages/index.astro
index b6467d6..4e1bd9e 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -15,20 +15,30 @@ import CTASection from '../components/sections/CTASection.astro';
 import Media from '../components/ui/Media.astro';
 import MapItaly from '../components/ui/MapItaly.astro';
 import Node from '../components/ui/Node.astro';
-import { horizonPlaces, pugliaPlaces, office, founder } from '../data/site';
+import { horizonPlaces, office, founder } from '../data/site';
 import { founderPortrait, eventPhotoNote } from '../data/media';
 import { bearing, distanceKm, formatCoords } from '../lib/geo';
 import { pageGraph, person, ids } from '../lib/structured-data';
 import eventoPanorama from '../assets/images/derivate/evento-panorama.jpg';
 import eventoCitta from '../assets/images/derivate/evento-citta.jpg';
 import maps from '../data/maps.json';
-import { describeCittaDigitali } from '../lib/citta-digitali';
+import { describeCittaDigitali, describePugliaDigitale } from '../lib/citta-digitali';
 
 const places = horizonPlaces.map((p) => ({ id: p.id, name: p.name, bearing: bearing(office, p), km: distanceKm(office, p) }));
 const schema = pageGraph('home', [person()], { about: ids.organization });
 
 // Text alternative of the chapter 03 map: the names drawn on wide maps (narrow maps show fewer).
 const mapLabel = describeCittaDigitali([...maps.maps.italia.places].sort((a, b) => b.lat - a.lat).map((p) => p.name));
+// Chapter 02: the whole of Puglia with the cities of Puglia Digitale, as on /puglia-digitale/ (compact map).
+// Text alternative as on that page (copywriter-brand, L7): the names drawn at every width of the compact
+// map, north → south, so that every name said is on the map on a phone too; the office has its own sentence.
+type RegionPlace = { name: string; lat: number; role?: string; anchor: Record<'wide' | 'narrow', string> };
+const regionPlaces = maps.maps.pugliaRegione.places as RegionPlace[];
+const drawnAtEveryWidth = (p: RegionPlace) => (['wide', 'narrow'] as const).every((c) => p.anchor[c] && p.anchor[c] !== 'none');
+const pugliaLabel = describePugliaDigitale(
+  regionPlaces.filter((p) => p.role !== 'sede' && drawnAtEveryWidth(p)).sort((a, b) => b.lat - a.lat).map((p) => p.name),
+  regionPlaces.find((p) => p.role === 'sede')?.name,
+);
 ---
 
 <BaseLayout page="home" schema={schema}>
@@ -133,7 +143,10 @@ const mapLabel = describeCittaDigitali([...maps.maps.italia.places].sort((a, b)
         text="Un progetto di destination marketing che digitalizza città, borghi e imprese della Puglia. E li valorizza con esperienze immersive."
         cta={{ label: 'Scopri Puglia Digitale', href: '/puglia-digitale/', id: 'home-capitolo-puglia-digitale' }}
       >
-        <MapItaly slot="visual" map="puglia" places={pugliaPlaces} home="acquaviva" compact class="worlds__map worlds__map--puglia" />
+        <figure slot="visual" class="worlds__atlas">
+          <MapItaly map="pugliaRegione" cities home="acquaviva" label={pugliaLabel} class="worlds__map" />
+          <figcaption class="worlds__atlas-note t-label">Ogni punto è una città di&nbsp;Puglia&nbsp;Digitale</figcaption>
+        </figure>
       </ProjectShowcase>
 
       <ProjectShowcase
```

## 9. Prove

- **Come.** Copie del sito nello scratchpad, servite in locale: la proposta (R1 e R2), la variante con San Giovanni Rotondo (solo R1), la proposta con la patch 6 v2 e con R3. Il confronto è con lo staging (4321, build di e9f845d).
- **Strumenti.** Playwright 1.56 (Chromium 141), axe-core 4.13.
- **Misure in pagina.** Ogni 5 px di finestra da 320 a 1920, dopo una prima misura a vuoto: subito dopo il caricamento una finestra può essere misurata prima che l'impaginato si assesti.

| Prova | Esito |
|---|---|
| Oggi, capitolo 03, misura del creative-director (bordo del nodo, riquadro dell'etichetta) | «MANFREDONIA» → Itri sotto i 6 px a 445–490 e 1075–1225, minimo 3,5 px; «MASSAFRA» → Cosenza a 445–455 e 1075–1110, minimo 3,8 px. Con 1.4.12: 2,2 e 2,5 px |
| Proposta, capitolo 03: sovrapposizioni di nomi e richiami con punti, nodi, altri nomi e bordo | Nessuna in 321 finestre, con e senza 1.4.12 |
| Proposta, regola 11 in pagina | Minimo 8,4 px (7,2 con 1.4.12) dall'anello del nodo; 9,6 px (8,4) dal bordo dipinto. Coppia: Altamura → Cosenza sulle carte di 280 px, come oggi |
| Regola 11 nel generatore | 6,7 px sulla carta d'Italia e sulla Puglia intera; build fermo sotto i 6 |
| Carte strette | Immagine a 390 px identica byte per byte a oggi |
| Altre pagine | Le sette pagine diverse dalla Home identiche byte per byte allo staging |
| axe-core, Home | 0 violazioni a 390, 1440 e 1440 con movimento ridotto; le stesse voci da rivedere dello staging |
| Peso della Home (zlib 9) | 28,0 → 27,9 KB gzip; con la patch 6 v2 29,4 su 40; con R3 +5 byte |
| Terra di Bari, oggi | 214 finestre su 321 con problemi (286 con 1.4.12); con R3 nessuna; con P4 la carta non c'è |
| `astro check` | 0 errori, 0 avvisi (2 suggerimenti di sempre) |
| Colori forzati | Nessun CSS nuovo con R1, R2 e la patch 6 v2; R3 toglie soltanto le coordinate |

## 10. Limiti e alternative scartate

- **La Puglia, sulla carta d'Italia, ha due nomi.** Con la regola 11 e un nome per gruppo non c'è spazio per un terzo che non attraversi la penisola: i nomi del gruppo di Bari, come Andria e Trani, starebbero, ma il gruppo ha già Bari. I 31 punti raccontano la densità.
- **Misure in Chromium.** Safari iOS e Firefox `[DA VERIFICARE]`, come per le altre carte.
- **Scartate:**
  - **una terza classe da 435 px per Massafra:** CSS in più per un nome appeso in Basilicata (§3);
  - **la misura con la spaziatura normale nel generatore:** salverebbe Manfredonia da 460 px, ma con 1.4.12 il nome tornerebbe a 2,2 px da Itri. Ogni altra regola usa il caso peggiore;
  - **togliere il nome di Itri:** il Lazio resterebbe senza nome, e la regola 2 vuole prima le regioni fuori dalla Puglia;
  - **un margine più largo a est della carta:** l'Italia rimpicciolirebbe a ogni larghezza, a danno di tutti gli altri nomi.

## Verdetto di dominio (UI)

**Proposta pronta per la decisione del creative-director.**
- La regola 11 è nel generatore per tutte le carte che ne calcolano i nomi, con un controllo che ferma il build.
- La carta del capitolo 03 la rispetta con 7 nomi, senza nomi nuovi e senza perdere nulla sulle carte strette.
- La carta della Terra di Bari del capitolo 02 è `[BLOCCANTE]` per il go-live finché resta sulla Home. Le due uscite sono pronte: P4 o R3.

## Ipotesi da validare

- **Metro della regola 11.** Il caso peggiore, come per la regola 3, misurato dall'anello di ritaglio del nodo. Se il creative-director intende 6 px in pagina con la spaziatura normale, la proposta li rispetta comunque, con margine.
- **Browser.** Le misure sono in Chromium. Safari iOS e Firefox `[DA VERIFICARE]`.

## Domande aperte

- **creative-director:**
  - P1 e P2, oppure la variante con San Giovanni Rotondo;
  - R3, se l'utente dice no a P4.
- **ux-designer:** la descrizione della Home cita i nomi delle carte larghe, come oggi (218 caratteri). Vuoi applicarle la regola della L7, cioè i soli nomi disegnati a ogni larghezza?
- **Utente:** P4, che oltre ad allineare i capitoli 02 e 03 toglie dalla Home la carta difettosa.

## Decisioni richieste

1. **creative-director:** adottare R1 (regola 11 nel generatore) e R2 (Gargano senza San Giovanni Rotondo sulla carta d'Italia).
2. **creative-director, poi utente:** P4 con la patch 6 v2. Se l'utente dice no, R3.
3. **Sessione principale:**
   - applicare R1 e R2;
   - eseguire `npm run maps` e controllare lo sha256;
   - fare la build;
   - poi la patch 6 v2 oppure R3.
   - Dopo, rimisuro sullo staging.
