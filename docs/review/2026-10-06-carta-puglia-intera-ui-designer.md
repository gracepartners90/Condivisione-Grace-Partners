---
titolo: Carta della hero di /puglia-digitale/ · la Puglia intera, un punto per ogni città di Puglia Digitale
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-10-06
fonti: [richiesta dell'utente del 2026-10-06 e conferme del 2026-10-06 (via sessione principale), docs/strategia/citta-digitali-elenco.md (0.3, §4), docs/creativa/direzione-visiva.md (0.9: §1.4 «Il punto-città», regole 1–9; §7.3; §7.5), docs/ui/design-system.md (0.7: §1.8, §2.4, §5.4), docs/ux/accessibilita.md (0.6: §2.14, Appendice D), docs/performance/budget.md (§3), src/data/citta-digitali.json, scripts/generate-maps.mjs, src/components/ui/MapItaly.astro, src/lib/citta-digitali.ts, src/pages/puglia-digitale.astro, src/pages/index.astro, Natural Earth 1:10m admin-0 (world-atlas 2.0.2), molisecoast.com «Foce Saccione – Bonifica Ramitelli» e Wikipedia «Bradano» (lette il 2026-10-06), repository al commit 43cb915 (base delle patch), build di prova con le modifiche (copie nello scratchpad, non versionate), misure Playwright 1.56 (Chromium 141) e axe-core 4.13 del 2026-10-06]
---

# Carta della hero di `/puglia-digitale/` · la Puglia intera, un punto per ogni città di Puglia Digitale

**Richiesta dell'utente** (2026-10-06): «per la puglia digitale l'immagine sotto la prima frase, dove si intravede un tratto di puglia, riusciamo a mettere la puglia intera? con i punti di tutte le città virtualizzate?»

**Conferme dell'utente** (2026-10-06, via sessione principale).
- **Le città virtualizzate** di Puglia Digitale sono le 31 città pugliesi di `src/data/citta-digitali.json`.
- **San Cataldo** è il comune siciliano: nel Salento non c'è un punto in più.
- **I nomi**, a parte i tre della pagina, sono letti dall'indice di ricerca e restano `[DA VERIFICARE]` per la grafia. L'elenco come insieme è confermato.

**Condizioni di brand-strategist** (`citta-digitali-elenco.md` 0.3, §4).
- La legenda può parlare delle città di Puglia Digitale, ma senza attribuire Puglia Digitale a ITnode.
- Niente «tutta la Puglia» e niente campiture.
- Sono subito solidi i nomi delle cinque città dei materiali di progetto: Acquaviva, Gravina, Monopoli, Altamura, Cassano. Gli altri valgono per l'anteprima.
- Nessun numero sulla carta.

## In sintesi

- **La Puglia intera, solo costa.** Una linea aperta, senza campitura e senza confine regionale, dalla foce del Saccione (confine con il Molise) a quella del Bradano (confine con la Basilicata), passando per il Gargano e Santa Maria di Leuca.
  - Un dato del confine regionale offline non c'è: né in `node_modules` né nel repository né nel sistema.
  - Un contorno chiuso farebbe comunque pensare a una copertura completa: brand-strategist, condizione 2; N12.
- **31 punti-città**, uno per ogni città di Puglia Digitale, nella posizione vera.
  - Acquaviva delle Fonti è il nodo con l'anello della sede; Gravina in Puglia e Monopoli sono nodi con il nome.
  - Gli altri nomi compaiono solo dove c'è spazio, con le regole della carta del capitolo 03 della Home: **7 nomi sui telefoni, 10 tra 400 e 660 px di carta, 12 sulla hero**.
- **Niente coordinate sotto i nomi** (DV §1.4, regola 8). Restano sotto i nomi delle tre porte della sezione «I luoghi».
- **I nomi dei mari**, «MARE ADRIATICO» e «MAR IONIO», stanno solo in mare, e solo sulle carte più larghe di 400 px. «MURGIA» si toglie: in mezzo ai punti si leggerebbe come il nome di una città.
- **Legenda e descrizione.**
  - Sotto la carta, una riga di legenda. Il testo lo scrive copywriter-brand; in prova uso la forma L1, «Ogni punto è una città di Puglia Digitale».
  - La carta diventa un'immagine con una descrizione costruita dagli stessi dati, con la nuova funzione `describePugliaDigitale` in `src/lib/citta-digitali.ts`.
- **Impaginato della hero.**
  - Su desktop la carta parte dalla colonna 3 come oggi ed è allineata a destra. È alta circa tre quarti della finestra e larga tra 640 e 1100 px.
  - A 1440 × 900 la fascia passa da 587 a 799 px. Su telefono la carta occupa tutta la larghezza: 350 × 275 px a 390.
- **Prove.**
  - Nessuna sovrapposizione in 222 formati di finestra, con e senza la spaziatura di WCAG 1.4.12.
  - Nessun nome a meno di 6 px dal nodo di un'altra città.
  - axe: 0 violazioni. Colori forzati a posto.
  - Peso: +2,1 KB gzip, cioè 26,8 KB su 35.
  - Home e `/citta-digitali/` restano identiche pixel per pixel.
- **Capitolo 02 della Home.** Il prototipo è pronto (P4): consiglio di allinearlo, ma come decisione a parte, dopo la pagina.
- **Immagini per l'utente**, nello scratchpad:
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-puglia/proposta-puglia-intera-pd-1440.png`
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-puglia/proposta-puglia-intera-pd-390.png`
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-puglia/oggi-e-proposta-1440.png` (oggi e proposta, affiancate)

## 1. Inquadratura (P1)

### Il confine regionale: che dati ci sono

| Dove | Che cosa c'è | Serve? |
|---|---|---|
| `node_modules` | `world-atlas` 2.0.2: confini nazionali (admin-0) e terre emerse a 1:10m, 1:50m, 1:110m | No: nessun confine regionale |
| Repository | `src/data/maps.json`, generato da `world-atlas` | No |
| Sistema | `iso-codes` (`iso_3166-2.json`): solo codici e nomi delle regioni, nessuna geometria | No |
| Rete (2026-10-06) | naturalearthdata.com e istat.it non raggiungibili. Il registro npm e raw.githubusercontent.com rispondono | Non scaricato: un dato nuovo è una dipendenza nuova, con licenza e attribuzione (ISTAT: CC BY), da decidere a parte |

**Proposta: solo costa.** Non è un ripiego.
- Una linea aperta non fa pensare a una copertura completa, mentre una regione chiusa sì (brand-strategist, condizione 2; N12).
- La Puglia si riconosce dalla costa: il Gargano, il tacco, il golfo di Taranto.

### La linea
- **Estremi.** I confini della Puglia sulla costa, presi sul vertice di Natural Earth più vicino a ciascuno.
  - **Nord:** foce del Saccione, confine con il Molise (molisecoast.com, «Foce Saccione – Bonifica Ramitelli», https://molisecoast.com/en/poi/mouth-of-saccione-torrent-bonifica-ramitelli/, letta il 2026-10-06). La fonte non dà coordinate; il vertice è a 41,93° N · 15,12° E.
  - **Sud:** foce del Bradano, confine con la Basilicata (Wikipedia, «Bradano», https://en.wikipedia.org/wiki/Bradano: 40°23′14″N 16°51′31″E; Treccani, «Bradano», https://www.treccani.it/enciclopedia/bradano/: l'ultimo tratto segna il confine; lette il 2026-10-06). Il vertice è a 0,7 km.
  - Il generatore si ferma se un estremo dista più di circa 2 km dalla costa.
- **Disegno.**
  - Stessa proiezione di tutte le carte.
  - Stessa levigatura della costa della Terra di Bari: Visvalingam a circa 1,65 km², poi una curva di Catmull-Rom sui vertici di Natural Earth.
  - Un solo tracciato di 2,5 KB, sotto gli 8 KB della DV.
- **Finestra.** La costa e le 31 città, con un margine del 3%: viewBox `0 0 1000 786`, 0,31 km per unità.
- **Isole Tremiti.** Natural Earth 1:10m non le ha. Comunque alla scala del telefono sarebbero un puntino, da confondere con un punto-città.
- **Le due estremità restano nette**, senza sfumature. La linea finisce dove finisce la Puglia.

### Impaginato
- **Hero, da 700 px di finestra.**
  - La figura è allineata a destra. Da 1024 px parte dalla colonna 3, come la costa di oggi.
  - Larghezza: `min(colonne 3–12, clamp(640px, 75svh × rapporto, 1100px))`.
  - La regione è 1,27:1, la striscia di oggi 2,23:1. Senza il limite in altezza, a 1440 px la carta sarebbe alta 873 px.
  - Con il limite, la carta è circa tre quarti della finestra e resta tra 640 e 1100 px. I nomi della classe «hero» sono calcolati proprio per quell'intervallo.
- **Telefono, sotto 700 px.** La carta occupa tutta la larghezza, da 280 a 632 px.
- **Disegno all'ingresso.** Invariato: l'otturatore scorre da ovest a est e scopre prima il Gargano, poi il Salento. La legenda sta fuori dall'otturatore. A metà animazione il bordo dell'otturatore tocca la legenda senza coprirla (misurato).
- **Misure.** A 1440 × 900 la carta è 859 × 675 px e la fascia 799 px (oggi 587). A 390 la carta è 350 × 275 px e la fascia 356 px (oggi 286).

## 2. Punti e nomi (P2)

- **Punti.** 31, nella posizione vera: il punto-città della DV §1.4, Ø 5 in `terra`, con l'anello nel colore della superficie.
  - Alla scala della regione nessuna coppia di punti si sovrappone, da 280 px in su. Le due città più vicine sono Locorotondo e Martina Franca, a 6,7 km.
- **La sede.**
  - Acquaviva delle Fonti è il nodo Ø 10 con l'anello Ø 26 della sede, come oggi.
  - I punti vicini si dipingono sopra l'anello, e il loro ritaglio lo interrompe come interrompe la costa.
- **Ordine dei nomi** (`nomiPuglia` nel file dati). Lo approva il creative-director.

| Livello | Città | Perché |
|---|---|---|
| Obbligatori | Acquaviva delle Fonti, Gravina in Puglia, Monopoli | Le tre località della pagina (porte, testo del progetto) |
| Solidi | Altamura, Cassano delle Murge | Materiali di progetto (brand-strategist, condizione 4) |
| Un nome per gruppo, solo in anteprima | Gargano (Manfredonia, San Giovanni Rotondo); Salento (Lecce, Nardò, Gallipoli, Copertino); Bari (Bari, Bitonto); costa a nord di Bari (Barletta, Andria, Trani, Bisceglie); Valle d'Itria e dintorni (Martina Franca, Alberobello, Locorotondo, Ostuni, Fasano, Cisternino, Putignano); Taranto (Massafra, Grottaglie); Brindisi (Brindisi, Francavilla Fontana) | Prima gli estremi, Gargano e Salento, che raccontano l'estensione; dentro ogni gruppo prima la città più grande e senza ambiguità, e Massafra e Manfredonia, che hanno la pagina sul portale |
| Poi | Lecce | Il capoluogo del Salento, dove c'è spazio, anche se il gruppo ha già Nardò |
| Senza nome | Polignano a Mare | Lettura ambigua, come nella Home (DV §1.4, regola 5) |

- **Risultato** (calcolato al build, ogni 5 px di larghezza della carta):

| Classe | Carta | Nomi |
|---|---|---|
| Stretta | 280–400 px (telefoni) | Manfredonia, Barletta, Bari, Monopoli, Acquaviva delle Fonti (su due righe, appeso), Gravina in Puglia (su due righe), Nardò |
| Larga | 400–660 px (finestre fino a 699 px) | In più: Lecce, Massafra, Ostuni |
| Hero | 640–1100 px | In più: Altamura, Brindisi. Tutti su una riga |

- **Al go-live senza il testo della pagina «Tutte le città»** si tolgono `gruppi` e `poi` e restano i nomi solidi (provato).
  - Telefoni e carte larghe: Acquaviva delle Fonti, Gravina in Puglia, Monopoli.
  - Hero: in più Altamura.
  - Cassano non entra mai: sta a 7 km da Acquaviva, dentro il suo anello.
- **Nuove regole del generatore**, solo per questa carta: la carta d'Italia resta identica byte per byte.
  1. **Nomi obbligatori su due righe sulle carte del telefono**, spezzati a uno spazio, mai sillabati: «Acquaviva / delle Fonti», «Gravina / in Puglia». È un'eccezione alla regola 6 della DV («su una riga»). Senza, sulle carte di 280–400 px Gravina non entra. Oggi la hero fa già andare a capo questi due nomi.
  2. **Un richiamo più lungo**, `drop3` a 56 px: lo stesso gesto di `drop` e `drop2`. Serve ad appendere «Acquaviva delle Fonti» sotto il gruppo della Murgia sui telefoni.
  3. **La sede tiene i nomi fuori dall'anello.** I nomi d'angolo stanno a 11 px invece di 8, e i richiami partono dall'anello. In CSS sono due proprietà personalizzate, `--corner` e `--leader-from`, senza regole in più.
  4. **6 px da ogni altro nodo con nome.** Così un nome non si legge mai come il nome del nodo accanto. Nel primo tentativo «ALTAMURA» stava proprio sopra il nodo di Gravina; con la regola non succede più.
  5. **I nomi dei mari sono ostacoli.** Il build si ferma se uno copre un punto o esce dalla carta. Sulle carte strette non si disegnano (DS §5.4: sui telefoni affollerebbero la costa).
- **Coordinate.** Le tolgo (DV §1.4, regola 8): con 31 punti, una seconda riga sotto ogni nome raddoppierebbe l'ingombro proprio nella Murgia. Le coordinate delle tre città restano sotto gli H3 delle porte.

## 3. Legenda e descrizione (P3)

- **Legenda.**
  - Una riga sotto la carta, in una `<figcaption>`, in `label` mono `--fg-2`, con gli spazi unificatori in «di Puglia Digitale». È lo stile della Home.
  - Il testo lo scrive copywriter-brand: in prova c'è la forma L1, «Ogni punto è una città di Puglia Digitale». Ho provato anche le formule di brand-strategist e una più lunga, con e senza 1.4.12: da 1 a 3 righe, mai fuori dalla pagina.

| Testo | 320 px | 390 px | 768 px e oltre |
|---|---|---|---|
| Ogni punto è una città di Puglia Digitale | 2 righe | 1 (2 con 1.4.12) | 1 |
| Le città di Puglia Digitale | 1 | 1 | 1 |
| Città virtualizzate con Puglia Digitale | 2 | 1 | 1 |
| Ogni punto è una città virtualizzata con Puglia Digitale | 2 (3 con 1.4.12) | 2 | 1 |

- **Descrizione.** La carta mostra più di quanto dica il testo accanto (31 punti), quindi diventa `role="img"` con un `aria-label` (regola di ux-designer). Oggi la fascia è tutta `aria-hidden`.
  - La funzione `describePugliaDigitale(names, office)` usa la forma L4: le province da nord a sud, quella con più città («più che altrove», perché Bari ne ha 13 su 31), i nomi della carta e la sede.
  - Testo di oggi, 379 caratteri:
    > Carta della Puglia con le città di Puglia Digitale. Sono nelle province di Foggia, Barletta-Andria-Trani, Bari, Brindisi, Taranto e Lecce, più che altrove in quella di Bari. Tra queste: Manfredonia, Barletta, Bari, Monopoli, Acquaviva delle Fonti, Altamura, Gravina in Puglia, Ostuni, Brindisi, Massafra, Lecce e Nardò. Un anello segna Acquaviva delle Fonti, dove ha sede ITnode.
  - **È lunga.** Si accorcia passando i soli nomi delle carte strette (circa 330 caratteri) o i soli nomi solidi (circa 260). Decidono copywriter-brand e ux-designer: la funzione accetta qualunque elenco.
  - **Nessun numero e nessun «tutta».** «Sono nelle province di…» elenca dove stanno le città, non dichiara una copertura. La frase sulla sede dice dove ha sede ITnode, senza attribuirle Puglia Digitale (condizione 1).
- **Albero di accessibilità** (390 e 1440 px): la figura, con il nome della legenda, poi l'immagine con la descrizione e il testo della legenda. La carta nascosta (l'altra variante) non entra nell'albero, perché è `display: none`.

## 4. Capitolo 02 della Home (P4, facoltativa)

**Oggi.** La carta della Terra di Bari con tre nodi e le coordinate.

**Prototipo.** La stessa carta compatta, con la legenda: provata a 161 larghezze, senza sovrapposizioni, anche con 1.4.12. Screenshot:
- `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-puglia/home02-1440.png`
- `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-puglia/home02-390.png`

| Pro | Contro |
|---|---|
| La condizione che la DV metteva al capitolo 02 è soddisfatta: l'utente ha confermato che le città di Puglia Digitale sono queste 31 (DV, «Domande aperte») | L'utente ha chiesto solo la pagina Puglia Digitale |
| I capitoli 02 e 03 diventano davvero «dalla regione all'Italia» (DV §7.3), con lo stesso segno | Le stesse città compaiono due volte in Home: nel capitolo 02 e nella Puglia del capitolo 03 |
| Home e pagina mostrano la stessa Puglia: la pagina non dice più del capitolo che la presenta | Peso della Home: +1,5 KB gzip, cioè 29,5 KB su 40 |
| La vecchia carta della Terra di Bari non serve più, e con lei il ritaglio `compact`/`frame` (pulizia dopo) | Sul telefono il capitolo cresce di 69 px; da 1024 px nulla, perché comanda la colonna del testo |

**Consiglio: allinearlo**, ma come decisione separata, dopo la pagina e con un sì dell'utente. Il capitolo 02 resta il posto della foto del territorio, quando arriverà (DV §7.3).

## 5. Componente e generatore (P5)

- **`scripts/generate-maps.mjs`.**
  - Nuova carta `pugliaRegione`. Le regole dei nomi diventano generali: classi in elenco, nomi solidi, due righe, `drop3`, sede, distanza dai nodi, nomi dei mari.
  - La carta d'Italia e la vecchia carta della Puglia escono identiche byte per byte. L'intero generatore impiega circa 0,6 s (oggi 0,4).
- **`src/data/citta-digitali.json`.** Nuovo blocco `nomiPuglia`, con l'ordine del §2.
- **`src/components/ui/MapItaly.astro`.**
  - Nuova prop `nameClass="hero"`: l'elemento largo della pagina usa i nomi della classe «hero».
  - I nomi su due righe, con l'a capo solo nelle classi in cui il build lo prevede. L'ho provato anche con l'a capo solo su una delle due classi.
  - La sede, con `--corner`, `--leader-from` e l'anello sotto i punti; il richiamo `drop3`.
  - Niente nomi dei mari sotto i 25rem per questa carta.
  - Su Home e `/citta-digitali/` cambia solo il CSS condiviso, e le pagine sono identiche pixel per pixel, anche nei colori forzati.
- **`src/lib/citta-digitali.ts`.** Nuova funzione `describePugliaDigitale`, con le stesse regole di `describeCittaDigitali`, che non cambia.
- **`src/pages/puglia-digitale.astro`.**
  - La fascia diventa una `<figure>` con le due carte, la legenda e la descrizione; non è più `aria-hidden`.
  - Il CSS fissa la larghezza della carta.
  - La patch parte dalla pagina del commit d60b95f, con la foto di Acquaviva nelle porte (ADR 007).
- **Come applicare.**
  1. Patch 1–5.
  2. `npm run maps`. Il nuovo `src/data/maps.json` deve avere sha256 `105441940a2415e003285cc58567138cc29ec5e80f144970e05518c98636f761`, identico a quello provato.
  3. Build.
  4. La patch 6 (Home) solo se P4 passa.
  - **Dopo P4**, in un secondo momento, si possono togliere la vecchia carta `puglia` dal generatore e da `maps.json`, e le prop `compact` e `frame` di `MapItaly`.

## 6. Snippet

Le patch 1–5, concatenate nell'ordine, sono un'unica patch per `git apply`; la 6 è facoltativa e va dopo.
- **Base di verifica.** `git apply --check` sul repository al commit 43cb915, senza modifiche in sospeso.
- **Prova da zero.** Su una copia pulita di 43cb915 con le patch 1–5, `npm run maps` dà lo sha256 del §5 e la build dà l'HTML di Home, `/puglia-digitale/` e `/citta-digitali/` identico byte per byte a quello provato.
- **Se la pagina cambia prima.** Con le foto di Gravina e Monopoli nelle porte (DV 0.10 §4.7, in corso) il contesto della patch 5 non combacia più, e `git apply` si ferma.
  - `git apply --3way` la fonde pulita, perché il repository ha la versione di partenza della pagina (blob 90d9cac).
  - Provato su una copia con una modifica simulata delle porte (import e voci di `photos`): la fusione aggiunge esattamente le righe della patch.
- **Ordine.** Le patch 1–5 si applicano pulite; la 6 si applica dopo.
- **Esito.** I file risultanti sono identici, uno per uno, a quelli delle copie provate.
- **Copie nello scratchpad:**
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-puglia/diff/proposta.patch`
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-puglia/diff/home-capitolo-02.patch`

#### 1 · `scripts/generate-maps.mjs`

```diff
diff --git a/scripts/generate-maps.mjs b/scripts/generate-maps.mjs
index 4b35b49..7b2c13c 100644
--- a/scripts/generate-maps.mjs
+++ b/scripts/generate-maps.mjs
@@ -13,6 +13,10 @@
 // - puglia: Italian coastline clipped to the Terra di Bari window, Visvalingam–Whyatt (drops
 //   sub-kilometre notches such as the harbour moles), then a centripetal Catmull–Rom curve
 //   through the remaining Natural Earth vertices: one open line, no fill.
+// - pugliaRegione: the whole coast of Puglia, from the mouth of the Saccione (border with Molise) to
+//   the mouth of the Bradano (border with Basilicata), smoothed like `puglia`: one open line, no fill,
+//   no regional border (Natural Earth admin-0 has none, and a closed outline would read as coverage:
+//   N12). One dot per city of Puglia Digitale, names where they fit (three classes of width).
 //
 // Run with: node scripts/generate-maps.mjs   (fails if a path exceeds 8 KB)
 import { readFile, writeFile } from 'node:fs/promises';
@@ -58,9 +62,12 @@ const CITIES = JSON.parse(await readFile('src/data/citta-digitali.json', 'utf8')
     // Same precision rule as every other place (visual direction §1.4): at most 2 decimals.
     for (const v of [c.lat, c.lon]) if (!/^-?\d+(\.\d{1,2})?$/.test(String(v))) throw new Error(`citta-digitali.json: ${c.id} has ${v}, use at most 2 decimals`);
   }
-  const named = [...CITIES.nomi.obbligatori, ...CITIES.nomi.gruppi.flat(), ...CITIES.nomi.poi];
-  const unknown = named.filter((id) => !ids.has(id));
-  if (unknown.length) throw new Error(`citta-digitali.json: names for unknown cities ${unknown.join(', ')}`);
+  for (const [key, nomi] of [['nomi', CITIES.nomi], ['nomiPuglia', CITIES.nomiPuglia]]) {
+    if (!nomi) continue;
+    const named = [...nomi.obbligatori, ...(nomi.solidi ?? []), ...nomi.gruppi.flat(), ...nomi.poi, ...(nomi.senzaNome ?? [])];
+    const unknown = named.filter((id) => !ids.has(id));
+    if (unknown.length) throw new Error(`citta-digitali.json: ${key} names unknown cities ${unknown.join(', ')}`);
+  }
 }
 
 const geometries = topology.objects.countries.geometries;
@@ -222,33 +229,42 @@ function toCurvePath(lines, decimals) {
   return d;
 }
 
-// ─── Names on the map of Città Digitali ───
-// Two classes of map width, the same 25rem threshold as the coordinates in MapItaly.astro:
-// narrow maps (phones, and the 1024 px desktop at 382 px) and wide maps (up to 30rem).
+// ─── Names on the maps with city dots ───
+// Classes of map width per map. italia: two, at the same 25rem threshold as the coordinates in
+// MapItaly.astro, narrow maps (phones, and the 1024 px desktop at 382 px) and wide maps (up to
+// 30rem). pugliaRegione: three, narrow and wide on the compact map (the same 25rem threshold) and
+// hero on the wide map of /puglia-digitale/ (another element).
 // Each name takes one position around its node: beside it, on a corner, or hanging below it on a
 // vertical leader, the gesture of the Horizon labels (design system §2.1). A name is shown only if
-// it covers no dot, no node, no other name and no other leader at every width of its class.
+// it covers no dot, no node, no other name, no other leader and no area name at every width of its
+// class, and stays inside the map.
 // Metrics: mono label at 13 px, uppercase, with the user text spacing of WCAG 1.4.12 (0.12em
 // tracking, line-height 1.5). Offsets match the anchor rules in MapItaly.astro.
-const LABEL = { advance: 9.6, pad: 2, line: 19.5, node: 6.5, dot: 4, clear: 1, indent: 8 }; // node and dot radii include the 1.5 px knockout ring
+const LABEL = { advance: 9.6, pad: 2, line: 19.5, node: 6.5, dot: 4, ring: 13.5, clear: 1, indent: 8, areaMax: 104 }; // node and dot radii include the 1.5 px knockout ring; ring: the office; areaMax: 8em
 const NAME_CLASSES = { narrow: [280, 400], wide: [400, 480] }; // px; .worlds__map is 280 px at 320 and 30rem at most
 const STEP = 5;
-const DROPS = { 'drop-r': 24, 'drop-l': 24, 'drop2-r': 40, 'drop2-l': 40 }; // px from the node centre to the first line
+const DROPS = { 'drop-r': 24, 'drop-l': 24, 'drop2-r': 40, 'drop2-l': 40, 'drop3-r': 56, 'drop3-l': 56 }; // px from the node centre to the first line
+// Vertical offsets from the first line (top: -0.7em in CSS), so that names on two lines grow downwards.
 const ANCHORS = {
-  e: (_w, h) => [14, -h / 2],
-  w: (w, h) => [-14 - w, -h / 2],
+  e: () => [14, -LABEL.line / 2],
+  w: (w) => [-14 - w, -LABEL.line / 2],
   ne: (_w, h) => [8, -8 - h],
   se: () => [8, 8],
   nw: (w, h) => [-8 - w, -8 - h],
   sw: (w) => [-8 - w, 8],
-  'drop-r': (_w, h) => [0, DROPS['drop-r'] - h / 2],
-  'drop-l': (w, h) => [-w, DROPS['drop-l'] - h / 2],
-  'drop2-r': (_w, h) => [0, DROPS['drop2-r'] - h / 2],
-  'drop2-l': (w, h) => [-w, DROPS['drop2-l'] - h / 2],
+  'drop-r': () => [0, DROPS['drop-r'] - LABEL.line / 2],
+  'drop-l': (w) => [-w, DROPS['drop-l'] - LABEL.line / 2],
+  'drop2-r': () => [0, DROPS['drop2-r'] - LABEL.line / 2],
+  'drop2-l': (w) => [-w, DROPS['drop2-l'] - LABEL.line / 2],
+  'drop3-r': () => [0, DROPS['drop3-r'] - LABEL.line / 2],
+  'drop3-l': (w) => [-w, DROPS['drop3-l'] - LABEL.line / 2],
 };
-const anchorOrder = (p, view) => p.x / view.width > 0.55 // as on every map: eastern names hang left
-  ? ['w', 'e', 'ne', 'se', 'nw', 'sw', 'drop-l', 'drop-r', 'drop2-l', 'drop2-r']
-  : ['e', 'w', 'ne', 'se', 'nw', 'sw', 'drop-r', 'drop-l', 'drop2-r', 'drop2-l'];
+const anchorOrder = (p, view, long = false) => (p.x / view.width > 0.55 // as on every map: eastern names hang left
+  ? ['w', 'e', 'ne', 'se', 'nw', 'sw', 'drop-l', 'drop-r', 'drop2-l', 'drop2-r', ...(long ? ['drop3-l', 'drop3-r'] : [])]
+  : ['e', 'w', 'ne', 'se', 'nw', 'sw', 'drop-r', 'drop-l', 'drop2-r', 'drop2-l', ...(long ? ['drop3-r', 'drop3-l'] : [])]);
+// The office (ring Ø 26): corner names sit 11 px out instead of 8, clear of the ring, and leaders
+// start from the ring (--corner and --leader-from of .map__place--home in MapItaly.astro).
+const HOME_CORNER = 11;
 
 const circleHitsBox = (cx, cy, r, [x0, y0, x1, y1]) => {
   const nx = Math.max(x0, Math.min(cx, x1)), ny = Math.max(y0, Math.min(cy, y1));
@@ -257,24 +273,67 @@ const circleHitsBox = (cx, cy, r, [x0, y0, x1, y1]) => {
 const boxesHit = (a, b, m) => a[0] < b[2] + m && a[2] > b[0] - m && a[1] < b[3] + m && a[3] > b[1] - m;
 const widthRange = ([from, to]) => { const r = []; for (let w = from; w <= to; w += STEP) r.push(w); return r; };
 
-/** Box (and leader, for drops) of the name of `p` with `anchor`, at map width `W`. */
-function nameGeometry(p, anchor, W, view) {
+/** A name on two lines, broken at the space that makes the longer line shortest (never hyphenated). */
+function twoLines(name) {
+  const words = name.split(' ');
+  let best = null;
+  for (let i = 1; i < words.length; i++) {
+    const lines = [words.slice(0, i).join(' '), words.slice(i).join(' ')];
+    const longest = Math.max(...lines.map((l) => l.length));
+    if (!best || longest < best.longest) best = { lines, longest };
+  }
+  return best?.lines ?? null;
+}
+
+/** Box (and leader, for drops) of the name of `p` with `anchor`, at map width `W`; `home`: p is the office. */
+function nameGeometry(p, anchor, W, view, lines = [p.name], home = false) {
   const k = W / view.width, cx = p.x * k, cy = p.y * k;
-  const w = p.name.length * LABEL.advance + 2 * LABEL.pad + (DROPS[anchor] ? LABEL.indent : 0), h = LABEL.line;
-  const [ox, oy] = ANCHORS[anchor](w, h);
-  return { k, box: [cx + ox, cy + oy, cx + ox + w, cy + oy + h], leader: DROPS[anchor] ? [cx - 0.5, cy + LABEL.node, cx + 0.5, cy + DROPS[anchor]] : null };
+  const w = Math.max(...lines.map((l) => l.length)) * LABEL.advance + 2 * LABEL.pad + (DROPS[anchor] ? LABEL.indent : 0), h = lines.length * LABEL.line;
+  let [ox, oy] = ANCHORS[anchor](w, h);
+  if (home && anchor.length === 2) { // corners: ne, se, nw, sw
+    const d = HOME_CORNER - 8;
+    ox += anchor[1] === 'e' ? d : -d;
+    oy += anchor[0] === 's' ? d : -d;
+  }
+  return { k, box: [cx + ox, cy + oy, cx + ox + w, cy + oy + h], leader: DROPS[anchor] ? [cx - 0.5, cy + (home ? LABEL.ring : LABEL.node), cx + 0.5, cy + DROPS[anchor]] : null };
 }
 
-/** Anchors for every city of `named` together (backtracking), or null if they do not all fit at `widths`. */
-function placeNames(named, cities, view, widths, budget = 300000) {
+/** Box of an area name (sea, uplands) at map width `W`: as .map__area, at most 8em wide, centred vertically. */
+function areaBox(a, W, view) {
+  const k = W / view.width, x = a.x * k, y = a.y * k;
+  const words = a.text.split(' ');
+  const lines = [];
+  for (const word of words) {
+    const last = lines.at(-1);
+    if (last && (last.length + 1 + word.length) * LABEL.advance <= LABEL.areaMax) lines[lines.length - 1] = `${last} ${word}`;
+    else lines.push(word);
+  }
+  const w = Math.max(...lines.map((l) => l.length)) * LABEL.advance + 2 * LABEL.pad, h = lines.length * LABEL.line;
+  const x0 = a.anchor === 'end' ? x - w : a.anchor === 'middle' ? x - w / 2 : x;
+  return [x0, y - h / 2, x0 + w, y + h / 2];
+}
+
+/**
+ * Anchors (and line breaks) for every city of `named` together (backtracking), or null if they do not
+ * all fit at `widths`. `opts.home`: id of the office (its ring keeps other names away, its own name
+ * stays beside it); `opts.areas`: area names to keep clear; `opts.wrap`: ids that may break on two lines;
+ * `opts.longDrops`: leaders of 56 px too; `opts.apart`: px between a name and the other named nodes, so
+ * that a name never reads as the name of the node beside it.
+ */
+function placeNames(named, cities, view, widths, { home = null, areas = [], wrap = [], longDrops = false, apart = LABEL.clear } = {}, budget = 300000) {
   const others = cities.filter((c) => !named.includes(c));
-  const free = (p, a) => widths.every((W) => {
-    const { k, box, leader } = nameGeometry(p, a, W, view);
+  const radius = (q) => (q.id === home ? LABEL.ring : LABEL.node);
+  const free = (p, a, lines) => widths.every((W) => {
+    const { k, box, leader } = nameGeometry(p, a, W, view, lines, p.id === home);
     if (box[0] < 0 || box[1] < 0 || box[2] > W || box[3] > view.height * k) return false;
     const touches = (x, y, r) => circleHitsBox(x * k, y * k, r + LABEL.clear, box) || (leader && circleHitsBox(x * k, y * k, r + LABEL.clear, leader));
-    return !others.some((d) => touches(d.x, d.y, LABEL.dot)) && !named.some((q) => q !== p && touches(q.x, q.y, LABEL.node));
+    if (areas.some((ar) => boxesHit(box, areaBox(ar, W, view), LABEL.clear) || (leader && boxesHit(leader, areaBox(ar, W, view), LABEL.clear)))) return false;
+    return !others.some((d) => touches(d.x, d.y, LABEL.dot)) && !named.some((q) => q !== p && touches(q.x, q.y, radius(q) + apart - LABEL.clear));
   });
-  const options = named.map((p) => anchorOrder(p, view).filter((a) => free(p, a)).map((a) => ({ a, geo: widths.map((W) => nameGeometry(p, a, W, view)) })));
+  const layouts = (p) => [[p.name], ...(wrap.includes(p.id) && twoLines(p.name) ? [twoLines(p.name)] : [])];
+  const options = named.map((p) => layouts(p).flatMap((lines) => anchorOrder(p, view, longDrops)
+    .filter((a) => free(p, a, lines))
+    .map((a) => ({ a, lines, geo: widths.map((W) => nameGeometry(p, a, W, view, lines, p.id === home)) }))));
   if (options.some((o) => o.length === 0)) return null;
   const clash = (g1, g2) => g1.some((A, i) => { const B = g2[i]; return boxesHit(A.box, B.box, LABEL.clear) || (A.leader && boxesHit(A.leader, B.box, LABEL.clear)) || (B.leader && boxesHit(A.box, B.leader, LABEL.clear)); });
   const order = named.map((_, i) => i).sort((i, j) => options[i].length - options[j].length); // most constrained first
@@ -289,45 +348,57 @@ function placeNames(named, cities, view, widths, budget = 300000) {
     }
     return false;
   };
-  return search(0) ? Object.fromEntries(named.map((p, i) => [p.id, chosen[i].a])) : null;
+  return search(0) ? Object.fromEntries(named.map((p, i) => [p.id, { anchor: chosen[i].a, lines: chosen[i].lines }])) : null;
 }
 
 /**
- * Names per class, in the editorial order of `nomi`: the required names (those of the chapter
- * text), then one name per group (the first that fits), then the others. The wide class starts
- * from the narrow names, so names only appear as the map grows. Returns { id: { wide, narrow } },
- * 'none' where the name is not shown. A required name may be missing on narrow maps (warning:
- * the chapter text names it beside the map); the build stops if it does not fit on wide maps.
+ * Names per class of width, in the editorial order of `nomi`: the required names (those of the text
+ * beside the map), the solid names (project materials), then one name per group (the first that
+ * fits), then the others. Classes go from the narrowest; each starts from the names of the previous
+ * one, so names only appear as the map grows. Returns { id: { anchor: { [class]: position | 'none' },
+ * lines? } }, with `lines` holding the classes where a name allowed on two lines breaks. A required
+ * name may be missing from a class with a warning (the text beside the map names it), except in the
+ * last class, where the build stops.
  */
-function chooseNames(cities, nomi, view) {
+function chooseNames(cities, nomi, view, { id = 'italia', classes = [{ name: 'narrow', range: NAME_CLASSES.narrow }, { name: 'wide', range: NAME_CLASSES.wide }], wrap = [], ...opts } = {}) {
   const byId = Object.fromEntries(cities.map((c) => [c.id, c]));
   const excluded = new Set(nomi.senzaNome ?? []);
   // A name turns its dot into a node (Ø 10 and its ring): it must not hide another city's dot.
   const hidesDot = (c, widths) => widths.some((W) => cities.some((d) => d !== c && Math.hypot(d.x - c.x, d.y - c.y) * (W / view.width) + LABEL.dot - 1.5 <= LABEL.node));
-  const grow = (start, widths, strict) => {
-    let named = [], anchors = {};
-    const add = (id) => {
-      const c = byId[id];
-      if (!c || excluded.has(id) || named.includes(c)) return false;
-      if (!nomi.obbligatori.includes(id) && hidesDot(c, widths)) return false;
-      const r = placeNames([...named, c], cities, view, widths);
-      if (r) { named = [...named, c]; anchors = r; }
+  const grow = (start, widths, strict, wrapIds, label, areas) => {
+    let named = [], placed = {};
+    const add = (cid) => {
+      const c = byId[cid];
+      if (!c || excluded.has(cid) || named.includes(c)) return false;
+      if (!nomi.obbligatori.includes(cid) && hidesDot(c, widths)) return false;
+      const r = placeNames([...named, c], cities, view, widths, { ...opts, wrap: wrapIds, areas });
+      if (r) { named = [...named, c]; placed = r; }
       return Boolean(r);
     };
-    for (const id of [...start, ...nomi.obbligatori]) {
-      if (add(id) || named.some((n) => n.id === id) || !nomi.obbligatori.includes(id)) continue;
-      if (strict) throw new Error(`italia: no room for the required name ${byId[id].name}`);
-      console.warn(`italia: no room for ${byId[id].name} on narrow maps: name hidden there`);
+    for (const cid of [...start, ...nomi.obbligatori]) {
+      if (add(cid) || named.some((n) => n.id === cid) || !nomi.obbligatori.includes(cid)) continue;
+      if (strict) throw new Error(`${id}: no room for the required name ${byId[cid].name}`);
+      console.warn(`${id}: no room for ${byId[cid].name} on ${label} maps: name hidden there`);
     }
-    for (const group of nomi.gruppi) if (!group.some((id) => named.some((n) => n.id === id))) group.some(add);
+    (nomi.solidi ?? []).forEach(add);
+    for (const group of nomi.gruppi) if (!group.some((gid) => named.some((n) => n.id === gid))) group.some(add);
     nomi.poi.forEach(add);
-    return { ids: named.map((n) => n.id), anchors };
+    return { ids: named.map((n) => n.id), placed };
   };
-  const narrow = grow([], widthRange(NAME_CLASSES.narrow), false);
-  const wide = grow(narrow.ids, widthRange(NAME_CLASSES.wide), true);
-  const lost = narrow.ids.filter((id) => !wide.ids.includes(id));
-  if (lost.length) console.warn(`italia: ${lost.join(', ')} named on narrow maps but not on wide ones`);
-  return Object.fromEntries(wide.ids.map((id) => [id, { wide: wide.anchors[id], narrow: narrow.anchors[id] ?? 'none' }]));
+  const results = [];
+  classes.forEach((c, i) => {
+    const prev = results.at(-1);
+    results.push({ name: c.name, ...grow(prev?.ids ?? [], widthRange(c.range), i === classes.length - 1, c.wrap ? wrap : [], c.name, c.areas === false ? [] : (opts.areas ?? [])) });
+    const lost = (prev?.ids ?? []).filter((cid) => !results.at(-1).ids.includes(cid));
+    if (lost.length) console.warn(`${id}: ${lost.join(', ')} named on ${prev.name} maps but not on ${c.name} ones`);
+  });
+  const last = results.at(-1);
+  return Object.fromEntries(last.ids.map((cid) => {
+    const entry = { anchor: Object.fromEntries([...results].reverse().map((r) => [r.name, r.placed[cid]?.anchor ?? 'none'])) };
+    const broken = results.filter((r) => r.placed[cid]?.lines.length > 1);
+    if (broken.length) entry.lines = Object.fromEntries(broken.map((r) => [r.name, r.placed[cid].lines]));
+    return [cid, entry];
+  }));
 }
 
 // ─── Map builders ───
@@ -375,7 +446,8 @@ function buildItalia({ width = 1000, minIslandKm2 = 18, tolerance = 1.1, decimal
   });
   const outside = cities.filter((c) => c.x < 0 || c.y < 0 || c.x > T.width || c.y > T.height);
   if (outside.length) throw new Error(`italia: outside the map: ${outside.map((c) => c.id).join(', ')}`);
-  const anchors = chooseNames(cities, CITIES.nomi, { width: T.width, height: T.height });
+  const names = chooseNames(cities, CITIES.nomi, { width: T.width, height: T.height });
+  const anchors = Object.fromEntries(Object.entries(names).map(([cid, n]) => [cid, n.anchor]));
   const named = cities.filter((c) => anchors[c.id]);
   const dots = cities.filter((c) => !anchors[c.id]).sort((a, b) => a.y - b.y); // north first: southern dots paint on top
   return {
@@ -432,9 +504,90 @@ function buildPuglia({ width = 1600, minArea = 200, decimals = 1 } = {}) {
   };
 }
 
+// Ends of the coast of Puglia, where the line starts and stops (the Natural Earth vertex nearest each):
+// - north, mouth of the Saccione, border with Molise (molisecoast.com, «Foce Saccione – Bonifica
+//   Ramitelli», read 2026-10-06; the source gives no coordinates: point read on the Natural Earth coast);
+// - south, mouth of the Bradano, border with Basilicata (Wikipedia «Bradano», 40°23′14″N 16°51′31″E;
+//   Treccani «Bradano»: its last stretch marks the border; both read 2026-10-06).
+const PUGLIA_COAST_ENDS = { north: { lon: 15.13, lat: 41.93 }, south: { lon: 16.8587, lat: 40.3873 } };
+// Area names at sea, where no city stands (visual direction §7.5: names of the sea in mono).
+const PUGLIA_AREAS = [
+  { text: 'MARE ADRIATICO', lat: 41.5, lon: 17.7, anchor: 'middle' },
+  { text: 'MAR IONIO', lat: 40.05, lon: 17.35, anchor: 'middle' },
+];
+// px of map width. The compact map of /puglia-digitale/ (windows up to 699 px) switches at 25rem like
+// every map: narrow, then wide; the hero map has its own class. Names may break on two lines only on
+// the compact map, and only the required ones (they are long: «Acquaviva delle Fonti», «Gravina in Puglia»).
+// The sea names are not drawn on narrow maps (design system §5.4: on phones they would crowd the coast).
+const PUGLIA_NAME_CLASSES = [
+  { name: 'narrow', range: [280, 400], wrap: true, areas: false },
+  { name: 'wide', range: [400, 660], wrap: true },
+  { name: 'hero', range: [640, 1100] }, // the page keeps the wide map between 640 and 1100 px
+];
+
+/**
+ * The whole coast of Puglia as one open line (no fill, no regional border: N12), with one dot per
+ * city of Puglia Digitale (the cities of Puglia in src/data/citta-digitali.json) and names where they fit.
+ */
+function buildPugliaRegione({ width = 1000, minAreaKm2 = 1.65, decimals = 1, pad = 0.03, office = 'acquaviva' } = {}) {
+  const coast = mesh(topology, topology.objects.countries, (a, b) => a === b && a.id === ITALY);
+  const nearest = ({ lon, lat }) => {
+    let best = null;
+    coast.coordinates.forEach((line, li) => line.forEach(([x, y], i) => {
+      const d = Math.hypot((x - lon) * Math.cos((lat * Math.PI) / 180), y - lat);
+      if (!best || d < best.d) best = { d, li, i };
+    }));
+    return best;
+  };
+  const a = nearest(PUGLIA_COAST_ENDS.north), b = nearest(PUGLIA_COAST_ENDS.south);
+  if (a.li !== b.li || a.i >= b.i) throw new Error('pugliaRegione: the two ends are not on one coast line, north to south');
+  if (Math.max(a.d, b.d) > 0.02) throw new Error('pugliaRegione: an end is more than ~2 km from the coast');
+  const lonlat = coast.coordinates[a.li].slice(a.i, b.i + 1);
+  const projected = lonlat.map((c) => projection(c));
+  const cities = CITIES.citta.filter((c) => c.region === 'Puglia');
+  const anchorsKm = [...projected, ...cities.map((c) => projection([c.lon, c.lat]))];
+  const xs = anchorsKm.map((p) => p[0]), ys = anchorsKm.map((p) => p[1]);
+  const [bx0, by0, bx1, by1] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
+  const padKm = (bx1 - bx0) * pad;
+  const T = windowTransform([bx0 - padKm, by0 - padKm, bx1 + padKm, by1 + padKm], width);
+  const minArea = minAreaKm2 * T.s * T.s; // same smoothing as the Terra di Bari coast, in km²
+  const line = simplifyArea(projected.map(T.apply), minArea);
+  const path = toCurvePath([line], decimals);
+  const view = { width: T.width, height: T.height };
+  const points = cities.map((c) => {
+    const [x, y] = T.apply(projection([c.lon, c.lat]));
+    return { id: c.id, name: c.name, lat: c.lat, lon: c.lon, x: +x.toFixed(1), y: +y.toFixed(1), xPct: +((x / T.width) * 100).toFixed(2), yPct: +((y / T.height) * 100).toFixed(2) };
+  });
+  const areas = PUGLIA_AREAS.map((l) => labelEntry(l.text, l.lat, l.lon, T, l.anchor));
+  // Area names stand at sea: they must cover no dot (nor the office ring) at any width, and stay inside.
+  for (const ar of areas) for (const W of PUGLIA_NAME_CLASSES.filter((c) => c.areas !== false).flatMap((c) => widthRange(c.range))) {
+    const k = W / view.width, box = areaBox(ar, W, view);
+    if (box[0] < 0 || box[1] < 0 || box[2] > W || box[3] > view.height * k) throw new Error(`pugliaRegione: ${ar.text} leaves the map at ${W} px`);
+    const hit = points.find((c) => circleHitsBox(c.x * k, c.y * k, (c.id === office ? LABEL.ring : LABEL.node) + LABEL.clear, box));
+    if (hit) throw new Error(`pugliaRegione: ${ar.text} covers ${hit.id} at ${W} px`);
+  }
+  const names = chooseNames(points, CITIES.nomiPuglia, view, { id: 'pugliaRegione', classes: PUGLIA_NAME_CLASSES, home: office, areas, wrap: CITIES.nomiPuglia.obbligatori, longDrops: true, apart: 6 });
+  const named = points.filter((c) => names[c.id]);
+  const dots = points.filter((c) => !names[c.id]).sort((p, q) => p.y - q.y); // north first: southern dots paint on top
+  return {
+    description: 'Costa della Puglia dalla foce del Saccione (confine con il Molise) alla foce del Bradano (confine con la Basilicata): linea aperta levigata (Catmull-Rom sui vertici Natural Earth), solo tratto, senza confini regionali.',
+    coastEnds: PUGLIA_COAST_ENDS,
+    viewBox: `0 0 ${T.width} ${T.height}`,
+    width: T.width, height: T.height,
+    kmPerUnit: +(1 / T.s).toFixed(4),
+    subpaths: 1,
+    path,
+    bytes: Buffer.byteLength(path),
+    places: named.map((p) => ({ ...p, ...(p.id === office ? { role: 'sede' } : {}), anchor: names[p.id].anchor, ...(names[p.id].lines ? { lines: names[p.id].lines } : {}) })),
+    dots: dots.map(({ id, x, y, xPct, yPct }) => ({ id, x, y, xPct, yPct })),
+    labels: areas,
+  };
+}
+
 const italia = buildItalia();
 const puglia = buildPuglia();
-for (const [id, m] of Object.entries({ italia, puglia })) {
+const pugliaRegione = buildPugliaRegione();
+for (const [id, m] of Object.entries({ italia, puglia, pugliaRegione })) {
   if (m.bytes > MAX_PATH_BYTES) throw new Error(`${id}: path is ${m.bytes} B, over ${MAX_PATH_BYTES} B`);
   console.log(`${id}: viewBox ${m.viewBox}, ${m.subpaths} subpaths, path ${m.bytes} B`);
 }
@@ -444,7 +597,7 @@ const out = {
   generatedBy: 'scripts/generate-maps.mjs',
   projection: { ...PROJECTION, scale: EARTH_RADIUS_KM, note: 'Lambert conformal conic; one projection for every map' },
   coordinatesNote: 'Coordinate a 2 decimali da una fonte unica (riquadro Wikipedia dei comuni, 2026-09-28): docs/strategia/coordinate-luoghi.md.',
-  maps: { italia, puglia },
+  maps: { italia, puglia, pugliaRegione },
 };
 await writeFile('src/data/maps.json', JSON.stringify(out, null, 2) + '\n');
 console.log('src/data/maps.json written');
```

#### 2 · `src/data/citta-digitali.json`

```diff
diff --git a/src/data/citta-digitali.json b/src/data/citta-digitali.json
index 4e205bf..6c53587 100644
--- a/src/data/citta-digitali.json
+++ b/src/data/citta-digitali.json
@@ -66,5 +66,20 @@
     ],
     "poi": ["acquaviva", "gravina", "monopoli", "cassano", "massafra", "itri", "bitonto", "santeramo", "manfredonia", "martina-franca", "bari", "lecce", "brindisi", "cosenza", "pompei"],
     "senzaNome": ["polignano", "san-cataldo"]
+  },
+  "nomiPuglia": {
+    "obbligatori": ["acquaviva", "gravina", "monopoli"],
+    "solidi": ["altamura", "cassano"],
+    "gruppi": [
+      ["manfredonia", "san-giovanni-rotondo"],
+      ["lecce", "nardo", "gallipoli", "copertino"],
+      ["bari", "bitonto"],
+      ["barletta", "andria", "trani", "bisceglie"],
+      ["martina-franca", "alberobello", "locorotondo", "ostuni", "fasano", "cisternino", "putignano"],
+      ["massafra", "grottaglie"],
+      ["brindisi", "francavilla-fontana"]
+    ],
+    "poi": ["lecce"],
+    "senzaNome": ["polignano"]
   }
 }
```

#### 3 · `src/components/ui/MapItaly.astro`

```diff
diff --git a/src/components/ui/MapItaly.astro b/src/components/ui/MapItaly.astro
index aefc403..cf610c1 100644
--- a/src/components/ui/MapItaly.astro
+++ b/src/components/ui/MapItaly.astro
@@ -10,8 +10,20 @@
 import { formatCoords } from '../../lib/geo';
 
 type MapPlace = { id: string; name: string; lat: number; lon: number };
-type LabelAnchor = { wide: string; narrow: string };
-type PlacePoint = { id: string; name?: string; lat?: number; lon?: number; x: number; y: number; role?: string; anchor?: LabelAnchor };
+/** Position of a name per class of map width (scripts/generate-maps.mjs); 'none' where it is not shown. */
+type LabelAnchor = { wide: string; narrow: string; hero?: string };
+type PlacePoint = {
+  id: string;
+  name?: string;
+  lat?: number;
+  lon?: number;
+  x: number;
+  y: number;
+  role?: string;
+  anchor?: LabelAnchor;
+  /** Classes where a long required name breaks on two lines (never hyphenated). */
+  lines?: { narrow?: string[]; wide?: string[] };
+};
 type MapDot = { id: string; x: number; y: number };
 type MapLabel = { text: string; x: number; y: number; anchor?: 'start' | 'middle' | 'end' };
 type MapData = {
@@ -25,7 +37,7 @@ type MapData = {
 };
 
 interface Props {
-  map: 'italia' | 'puglia';
+  map: 'italia' | 'puglia' | 'pugliaRegione';
   /** Named places; with `cities` they come from maps.json. */
   places?: MapPlace[];
   /**
@@ -37,6 +49,12 @@ interface Props {
    */
   cities?: boolean | 'dots';
   showLabels?: boolean;
+  /**
+   * Maps with city dots and names in classes of width (pugliaRegione): `hero` draws the names of the
+   * wide map of /puglia-digitale/. Without it the map draws its `wide` names, and the `narrow` ones
+   * under 25rem.
+   */
+  nameClass?: 'hero';
   /** Puglia: crop to the stretch of coast around the places. */
   compact?: boolean;
   /** Id of the place drawn as the office (ring around the node). */
@@ -51,7 +69,7 @@ interface Props {
   class?: string;
 }
 
-const { map, places = [], cities = false, showLabels = true, compact = false, home, frame, label, class: className } = Astro.props;
+const { map, places = [], cities = false, nameClass, showLabels = true, compact = false, home, frame, label, class: className } = Astro.props;
 
 const files = import.meta.glob<{ default: Record<string, unknown> }>('../../data/maps.json', { eager: true });
 const raw = Object.values(files)[0]?.default as { maps?: Record<string, MapData> } & Record<string, MapData> | undefined;
@@ -61,6 +79,7 @@ const data: MapData | undefined = raw?.maps?.[map] ?? raw?.[map];
 const BOUNDS = {
   italia: { minLon: 6.5, maxLon: 18.6, minLat: 36.5, maxLat: 47.2 },
   puglia: { minLon: 15.8, maxLon: 17.8, minLat: 40.4, maxLat: 41.35 },
+  pugliaRegione: { minLon: 14.9, maxLon: 18.7, minLat: 39.6, maxLat: 42.1 },
 }[map];
 const W = 400;
 const kx = Math.cos(((BOUNDS.minLat + BOUNDS.maxLat) / 2) * (Math.PI / 180));
@@ -83,23 +102,32 @@ const lookup = (id: string) => {
 
 // Places stored in maps.json for this map (Città Digitali: the cities named on the Home map).
 const mapPlaces = Array.isArray(data?.places) ? data.places : [];
+// With `cities`, the name of each place in this element's class: the wide one (and the narrow one under
+// 25rem), or the hero one. A place without a name in the class is a dot here.
+const nameIn = (p: Partial<PlacePoint>) => (nameClass === 'hero' ? p.anchor?.hero : p.anchor?.wide);
+const namedHere = cities === true ? mapPlaces.filter((p) => nameIn(p) && nameIn(p) !== 'none') : [];
 const placeList: MapPlace[] =
-  cities === true && mapPlaces.length ? mapPlaces.map((p) => ({ id: p.id, name: p.name ?? p.id, lat: p.lat ?? 0, lon: p.lon ?? 0 })) : places;
+  cities === true && mapPlaces.length ? namedHere.map((p) => ({ id: p.id, name: p.name ?? p.id, lat: p.lat ?? 0, lon: p.lon ?? 0 })) : places;
 const points = placeList.map((p) => {
   const pt: Partial<PlacePoint> & { x: number; y: number } = lookup(p.id) ?? project(p.lat, p.lon);
   const pos = pct(pt.x, pt.y);
   // Names placed at build time (Città Digitali) carry an anchor per class of width; without one,
   // labels of places in the eastern part of the map hang to the left, so they stay inside it.
-  const anchor = cities === true ? pt.anchor : undefined;
-  return { ...p, ...pos, anchor, isHome: p.id === home, labelLeft: !anchor && pos.left > 55 };
+  const wide = cities === true ? nameIn(pt) : undefined;
+  const narrow = cities === true && nameClass !== 'hero' ? pt.anchor?.narrow : undefined;
+  // A long required name on two lines: always, or only on narrow or only on wide maps.
+  const lines = nameClass === 'hero' ? undefined : (pt.lines?.narrow ?? pt.lines?.wide);
+  const breakOn = pt.lines?.narrow && pt.lines?.wide ? 'always' : pt.lines?.narrow ? 'narrow' : pt.lines?.wide ? 'wide' : undefined;
+  return { ...p, ...pos, anchor: wide ? { wide, narrow: narrow ?? wide } : undefined, lines, breakOn, isHome: p.id === home, labelLeft: !wide && pos.left > 55 };
 });
-// Dots: with `cities` the unnamed cities; with `cities="dots"` every city that is not a node here.
+// Dots: with `cities` the unnamed cities (and the cities named only in other classes); with
+// `cities="dots"` every city that is not a node here.
 const nodeIds = new Set(placeList.map((p) => p.id));
 const dotPoints =
   cities === 'dots'
     ? [...mapPlaces, ...(data?.dots ?? [])].filter((c) => !nodeIds.has(c.id)).sort((a, b) => a.y - b.y)
     : cities
-      ? (data?.dots ?? [])
+      ? [...mapPlaces.filter((p) => !nodeIds.has(p.id)), ...(data?.dots ?? [])].sort((a, b) => a.y - b.y)
       : [];
 const dots = dotPoints.map((d) => pct(d.x, d.y));
 const labels = (data?.labels ?? []).map((l) => ({ ...l, ...pct(l.x, l.y) }));
@@ -146,7 +174,15 @@ if (!data) {
         <span class="map__node" />
         {showLabels && (
           <span class="map__label t-label" data-anchor={p.anchor?.wide} data-anchor-narrow={p.anchor && p.anchor.narrow !== p.anchor.wide ? p.anchor.narrow : undefined} aria-hidden="true">
-            <span>{p.name}</span>
+            {p.lines ? (
+              <span>
+                {p.lines[0]}{' '}
+                <br class="map__br" data-on={p.breakOn} />
+                {p.lines[1]}
+              </span>
+            ) : (
+              <span>{p.name}</span>
+            )}
             {!cities && <span class="map__coords">{formatCoords(p)}</span>}
           </span>
         )}
@@ -295,27 +331,29 @@ if (!data) {
 
   /* Names placed at build time around their node (scripts/generate-maps.mjs): beside it (e, w),
      on a corner (ne, se, nw, sw), or hanging below it on a vertical leader, like the Horizon labels
-     (drop: first line 24 px below the node, drop2: 40 px; -r/-l: name right or left of the leader). */
+     (drop: first line 24 px below the node, drop2: 40 px, drop3: 56 px; -r/-l: name right or left of
+     the leader). */
   .map__label[data-anchor] {
     inset: auto;
   }
 
   .map__label[data-anchor='e'] { left: 14px; top: -0.7em; }
   .map__label[data-anchor='w'] { right: 14px; top: -0.7em; justify-items: end; text-align: right; }
-  .map__label[data-anchor='ne'] { left: 8px; bottom: 8px; }
-  .map__label[data-anchor='se'] { left: 8px; top: 8px; }
-  .map__label[data-anchor='nw'] { right: 8px; bottom: 8px; justify-items: end; text-align: right; }
-  .map__label[data-anchor='sw'] { right: 8px; top: 8px; justify-items: end; text-align: right; }
+  .map__label[data-anchor='ne'] { left: var(--corner, 8px); bottom: var(--corner, 8px); }
+  .map__label[data-anchor='se'] { left: var(--corner, 8px); top: var(--corner, 8px); }
+  .map__label[data-anchor='nw'] { right: var(--corner, 8px); bottom: var(--corner, 8px); justify-items: end; text-align: right; }
+  .map__label[data-anchor='sw'] { right: var(--corner, 8px); top: var(--corner, 8px); justify-items: end; text-align: right; }
   .map__label[data-anchor^='drop'] { --drop: 24px; top: calc(var(--drop) - 0.7em); }
   .map__label[data-anchor^='drop2'] { --drop: 40px; }
+  .map__label[data-anchor^='drop3'] { --drop: 56px; }
   .map__label[data-anchor$='-r'] { left: 0; padding-left: 8px; }
   .map__label[data-anchor$='-l'] { right: 0; padding-right: 8px; justify-items: end; text-align: right; }
 
   .map__label[data-anchor^='drop']::before {
     content: '';
     position: absolute;
-    top: calc(0.7em - var(--drop) + 6.5px); /* from the node's knockout ring… */
-    height: calc(var(--drop) - 6.5px); /* …down to the middle of the first line */
+    top: calc(0.7em - var(--drop) + var(--leader-from, 6.5px)); /* from the node's knockout ring… */
+    height: calc(var(--drop) - var(--leader-from, 6.5px)); /* …down to the middle of the first line */
     width: 1px;
     background: var(--place);
   }
@@ -323,6 +361,27 @@ if (!data) {
   .map__label[data-anchor$='-r']::before { left: 0; }
   .map__label[data-anchor$='-l']::before { right: 0; }
 
+  /* The office on maps with city dots: corner names sit 11 px out, clear of the ring, and leaders
+     start from the ring (the build places them so). Dots paint over the ring, and their knockout cuts
+     it like the coastline; the map is its own stacking context, so the ring stays above the surface. */
+  .map--cities {
+    isolation: isolate;
+  }
+
+  .map--cities .map__place--home {
+    --corner: 11px;
+    --leader-from: 13.5px;
+  }
+
+  .map--cities .map__place--home .map__node::after {
+    z-index: -1;
+  }
+
+  /* A long required name on two lines, in the classes where the build placed it so. */
+  .map__br[data-on='narrow'] {
+    display: none;
+  }
+
   /* Narrow maps (up to 25rem, like the coordinates below): the narrow anchor where it differs; a
      city without room for its name there is drawn as a dot. */
   @container (max-width: 25rem) {
@@ -338,26 +397,33 @@ if (!data) {
     .map__place[data-narrow='dot'] .map__node { left: -2.5px; top: -2.5px; width: 5px; height: 5px; }
     .map__label[data-anchor-narrow='e'] { left: 14px; top: -0.7em; }
     .map__label[data-anchor-narrow='w'] { right: 14px; top: -0.7em; justify-items: end; text-align: right; }
-    .map__label[data-anchor-narrow='ne'] { left: 8px; bottom: 8px; }
-    .map__label[data-anchor-narrow='se'] { left: 8px; top: 8px; }
-    .map__label[data-anchor-narrow='nw'] { right: 8px; bottom: 8px; justify-items: end; text-align: right; }
-    .map__label[data-anchor-narrow='sw'] { right: 8px; top: 8px; justify-items: end; text-align: right; }
+    .map__label[data-anchor-narrow='ne'] { left: var(--corner, 8px); bottom: var(--corner, 8px); }
+    .map__label[data-anchor-narrow='se'] { left: var(--corner, 8px); top: var(--corner, 8px); }
+    .map__label[data-anchor-narrow='nw'] { right: var(--corner, 8px); bottom: var(--corner, 8px); justify-items: end; text-align: right; }
+    .map__label[data-anchor-narrow='sw'] { right: var(--corner, 8px); top: var(--corner, 8px); justify-items: end; text-align: right; }
     .map__label[data-anchor-narrow^='drop'] { --drop: 24px; top: calc(var(--drop) - 0.7em); }
     .map__label[data-anchor-narrow^='drop2'] { --drop: 40px; }
+    .map__label[data-anchor-narrow^='drop3'] { --drop: 56px; }
     .map__label[data-anchor-narrow$='-r'] { left: 0; padding-left: 8px; }
     .map__label[data-anchor-narrow$='-l'] { right: 0; padding-right: 8px; justify-items: end; text-align: right; }
 
     .map__label[data-anchor-narrow^='drop']::before {
       content: '';
       position: absolute;
-      top: calc(0.7em - var(--drop) + 6.5px);
-      height: calc(var(--drop) - 6.5px);
+      top: calc(0.7em - var(--drop) + var(--leader-from, 6.5px));
+      height: calc(var(--drop) - var(--leader-from, 6.5px));
       width: 1px;
       background: var(--place);
     }
 
     .map__label[data-anchor-narrow$='-r']::before { left: 0; right: auto; }
     .map__label[data-anchor-narrow$='-l']::before { right: 0; left: auto; }
+
+    .map__br[data-on='narrow'] { display: inline; }
+    .map__br[data-on='wide'] { display: none; }
+
+    /* The whole of Puglia on a phone: no sea names, which would crowd the coast (design system §5.4). */
+    .map--pugliaRegione .map__area { display: none; }
   }
 
   .map__coords {
```

#### 4 · `src/lib/citta-digitali.ts`

```diff
diff --git a/src/lib/citta-digitali.ts b/src/lib/citta-digitali.ts
index fa0a3f7..c4c89d9 100644
--- a/src/lib/citta-digitali.ts
+++ b/src/lib/citta-digitali.ts
@@ -1,6 +1,6 @@
 /**
- * Text alternative of a map with the cities of Città Digitali (WCAG 1.1.1, 1.3.1), built from the same
- * data as the dots: regions north → south, the region with most cities, then the names the map draws.
+ * Text alternatives of the maps with the cities of Città Digitali (WCAG 1.1.1, 1.3.1), built from the
+ * same data as the dots: regions north → south, the region with most cities, then the names the map draws.
  * No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
  * Wording: copywriter-brand (L4, L6). «Tra queste» only when the map draws names (narrow maps draw
  * fewer than wide ones, so they are examples). A map that draws none, like the one of /citta-digitali/
@@ -18,11 +18,37 @@ if (unknown.length) throw new Error(`lib/citta-digitali.ts: add ${unknown.join('
 const andList = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}` : (xs[0] ?? ''));
 const inRegion = (r: string) => (r === 'Lazio' ? `nel ${r}` : `in ${r}`);
 
+/** «la maggior parte» only above half; otherwise «più che altrove» (copywriter-brand, L4). */
+const shareOf = (count: number, total: number) => (count > total / 2 ? 'la maggior parte' : 'più che altrove');
+
 /** `names`: the names the map draws on wide screens, north → south; none for a map without names. */
 export function describeCittaDigitali(names: string[] = []): string {
   const regions = REGIONS.filter((r) => perRegion.has(r));
   const [mostRegion, mostCount] = [...perRegion].sort((a, b) => b[1] - a[1])[0];
-  const share = mostCount > cittaDigitali.citta.length / 2 ? 'la maggior parte' : 'più che altrove';
+  const share = shareOf(mostCount, cittaDigitali.citta.length);
   const among = names.length ? ` Tra queste: ${andList(names)}.` : '';
   return `Carta d’Italia con le città di Città Digitali. Sono in ${andList(regions)}, ${share} ${inRegion(mostRegion)}.${among}`;
 }
+
+// The cities of Puglia Digitale are the cities of Puglia in the list (user, 2026-10-06:
+// docs/strategia/citta-digitali-elenco.md §4). Provinces north → south, by their capital.
+const PROVINCES: Record<string, string> = { FG: 'Foggia', BT: 'Barletta-Andria-Trani', BA: 'Bari', BR: 'Brindisi', TA: 'Taranto', LE: 'Lecce' };
+const puglia = cittaDigitali.citta.filter((c) => c.region === 'Puglia');
+const perProvince = new Map<string, number>();
+for (const c of puglia) perProvince.set(c.province, (perProvince.get(c.province) ?? 0) + 1);
+const unknownProvince = [...perProvince.keys()].filter((p) => !PROVINCES[p]);
+if (unknownProvince.length) throw new Error(`lib/citta-digitali.ts: add ${unknownProvince.join(', ')} to PROVINCES`);
+
+/**
+ * Text alternative of the map of Puglia with the cities of Puglia Digitale, in the same form: the
+ * provinces north → south, the one with most cities, the names the map draws on wide screens, and the
+ * office when the map rings it. Never «tutta la Puglia» nor a number (brand-strategist, §4).
+ * Wording to be refined by copywriter-brand.
+ */
+export function describePugliaDigitale(names: string[] = [], office?: string): string {
+  const provinces = Object.keys(PROVINCES).filter((p) => perProvince.has(p)).map((p) => PROVINCES[p]);
+  const [most, mostCount] = [...perProvince].sort((a, b) => b[1] - a[1])[0];
+  const among = names.length ? ` Tra queste: ${andList(names)}.` : '';
+  const ring = office ? ` Un anello segna ${office}, dove ha sede ITnode.` : '';
+  return `Carta della Puglia con le città di Puglia Digitale. Sono nelle province di ${andList(provinces)}, ${shareOf(mostCount, puglia.length)} in quella di ${PROVINCES[most]}.${among}${ring}`;
+}
```

#### 5 · `src/pages/puglia-digitale.astro`

```diff
diff --git a/src/pages/puglia-digitale.astro b/src/pages/puglia-digitale.astro
index 90d9cac..ba7e27d 100644
--- a/src/pages/puglia-digitale.astro
+++ b/src/pages/puglia-digitale.astro
@@ -20,6 +20,8 @@ import { figures } from '../data/figures';
 import { eventPhotoNote } from '../data/media';
 import { placeSlot } from '../data/asset-slots';
 import { pageGraph } from '../lib/structured-data';
+import { describePugliaDigitale } from '../lib/citta-digitali';
+import maps from '../data/maps.json';
 import eventoSchermo from '../assets/images/derivate/evento-schermo.jpg';
 import acquavivaPorta from '../assets/images/derivate/acquaviva-porta.jpg';
 
@@ -42,6 +44,19 @@ const photos: Record<string, { image: typeof acquavivaPorta; alt: string; note:
     note: 'Immagine elaborata digitalmente',
   },
 };
+// The whole coast of Puglia with a dot for every city of Puglia Digitale (visual direction §1.4, §7.5).
+// Text alternative: the provinces, the names drawn on the wide map (north → south) and the office.
+type RegionPlace = { name: string; lat: number; role?: string; anchor: { hero: string } };
+const region = maps.maps.pugliaRegione;
+const [, , regionW, regionH] = region.viewBox.split(' ').map(Number);
+const regionPlaces = region.places as RegionPlace[];
+const mapLabel = describePugliaDigitale(
+  regionPlaces.filter((p) => p.anchor.hero !== 'none').sort((a, b) => b.lat - a.lat).map((p) => p.name),
+  regionPlaces.find((p) => p.role === 'sede')?.name,
+);
+// Legend: copywriter-brand writes the final text (brand-strategist §4: the cities of Puglia Digitale).
+const legend = 'Ogni punto è una città di\u00a0Puglia\u00a0Digitale';
+
 const locations = pugliaPlaces.map((p) => ({
   id: p.id,
   name: p.name,
@@ -73,13 +88,16 @@ const locations = pugliaPlaces.map((p) => ({
     </div>
   </Hero>
 
-  <!-- The coast of the Terra di Bari as one line across the page, drawn on entry. -->
-  <div class="pd-coast surface-calce" aria-hidden="true">
+  <!-- The whole coast of Puglia as one line, a dot for every city of Puglia Digitale, drawn on entry. -->
+  <div class="pd-coast surface-calce">
     <div class="wrap">
-      <div class="pd-coast__draw">
-        <MapItaly map="puglia" places={pugliaPlaces} home="acquaviva" frame="0 24 1600 716" class="pd-coast__map pd-coast__map--wide" />
-        <MapItaly map="puglia" places={pugliaPlaces} home="acquaviva" compact class="pd-coast__map pd-coast__map--compact" />
-      </div>
+      <figure class="pd-coast__atlas" style={`--ratio: ${(regionW / regionH).toFixed(4)}`}>
+        <div class="pd-coast__draw">
+          <MapItaly map="pugliaRegione" cities nameClass="hero" home="acquaviva" label={mapLabel} class="pd-coast__map pd-coast__map--wide" />
+          <MapItaly map="pugliaRegione" cities home="acquaviva" label={mapLabel} class="pd-coast__map pd-coast__map--compact" />
+        </div>
+        <figcaption class="pd-coast__note t-label">{legend}</figcaption>
+      </figure>
     </div>
   </div>
 
@@ -229,10 +247,20 @@ const locations = pugliaPlaces.map((p) => ({
     overflow-x: clip;
   }
 
+  .pd-coast__atlas {
+    margin: 0;
+  }
+
   .pd-coast__draw {
     position: relative;
   }
 
+  /* Legend under the map, like the maps of Città Digitali (visual direction §1.4). */
+  .pd-coast__note {
+    margin-top: var(--space-s);
+    color: var(--fg-2);
+  }
+
   .pd-coast :global(.pd-coast__map--wide) {
     display: none;
   }
@@ -245,12 +273,20 @@ const locations = pugliaPlaces.map((p) => ({
     .pd-coast :global(.pd-coast__map--compact) {
       display: none;
     }
+
+    /* The whole region, against the right edge: as wide as the band, about three quarters of the
+       window tall, and between 640 and 1100 px wide: the names are placed for that range
+       (scripts/generate-maps.mjs, class «hero»). */
+    .pd-coast__atlas {
+      width: min(100%, clamp(640px, 75svh * var(--ratio), 1100px));
+      margin-inline-start: auto;
+    }
   }
 
-  /* The coast crosses the page from the third column to the right edge. */
+  /* From the third column to the right edge, as the coast did. */
   @media (min-width: 64em) {
-    .pd-coast__draw {
-      margin-left: calc((100% + var(--gutter)) / 12 * 2);
+    .pd-coast__atlas {
+      width: min(100% - (100% + var(--gutter)) / 12 * 2, clamp(640px, 75svh * var(--ratio), 1100px));
     }
   }
 
```

#### 6 · `src/pages/index.astro`: capitolo 02 (P4, facoltativa)

```diff
diff --git a/src/pages/index.astro b/src/pages/index.astro
index b6467d6..aad2d9e 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -15,20 +15,27 @@ import CTASection from '../components/sections/CTASection.astro';
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
+type RegionPlace = { name: string; lat: number; role?: string; anchor: { wide: string } };
+const regionPlaces = maps.maps.pugliaRegione.places as RegionPlace[];
+const pugliaLabel = describePugliaDigitale(
+  regionPlaces.filter((p) => p.anchor.wide !== 'none').sort((a, b) => b.lat - a.lat).map((p) => p.name),
+  regionPlaces.find((p) => p.role === 'sede')?.name,
+);
 ---
 
 <BaseLayout page="home" schema={schema}>
@@ -133,7 +140,10 @@ const mapLabel = describeCittaDigitali([...maps.maps.italia.places].sort((a, b)
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

## 7. Prove

**Come.**
- **Copie del sito nello scratchpad.** Una con la proposta, una con la proposta più P4, e una di confronto con il repository di oggi. Le build sono servite in locale.
  - Le copie coincidono con il commit 43cb915, salvo le immagini di Gravina e Monopoli (commit 808c901), arrivate dopo e non ancora usate dal sito.
- **Staging.** Lo staging (4321 e 4322) era spento: non l'ho riavviato e ho servito le copie su altre porte.
  - A fine incarico era di nuovo acceso. Il 4321 serve lo stesso HTML della copia di confronto, byte per byte, per Home, `/puglia-digitale/` e `/citta-digitali/`: le misure di «oggi» valgono anche per lo staging.
- **Strumenti.** Playwright 1.56 (Chromium 141) e axe-core 4.13.

| Prova | Esito |
|---|---|
| `astro check` e build | 0 errori, 0 avvisi (2 suggerimenti già presenti); 8 pagine |
| Sovrapposizioni, sulla pagina resa: nomi, richiami e nomi dei mari contro punti, nodi, anello della sede, altri nomi e bordo della carta | Nessuna in 222 formati: finestre da 320 a 1920 px ogni 10 (altezza 900) e altezze da 600 a 1200 a 1440 px (carta hero da 640 a 1100 px). Carte strette 280–397 px, larghe 406–632, hero 640–1100 |
| Stessa prova con la spaziatura di WCAG 1.4.12 | Nessuna sovrapposizione in 222 formati |
| Nomi a meno di 6 px dal nodo di un'altra città | Nessuno |
| Scorrimento orizzontale e legenda | Nessuno scorrimento da 320 a 1920 px, anche con 1.4.12; legenda sempre dentro la pagina |
| A capo condizionale (`<br>` con `display`) | Due righe solo sotto i 25rem, o solo sopra: provato in Chromium |
| Nomi al go-live (solo solidi) | Telefoni e carte larghe: Acquaviva, Gravina, Monopoli; hero: in più Altamura. Nessun errore |
| axe-core | 0 violazioni a 390 px, 1440 px e 1440 px con movimento ridotto. Le voci da rivedere in più sono i testi della carta sotto l'otturatore del disegno, come già oggi per le etichette della costa |
| Colori forzati (Appendice D, D.1 e D.2), 8 pagine | Restano solo i residui accettati: `a::after`, le tacche a gradiente. Sulla carta punti, nodi, anello, richiami, nomi e legenda sono nei colori del tema, con la palette chiara e con la scura |
| Home e `/citta-digitali/` | Identiche pixel per pixel a 390 e 1440 px, nel modo normale e nei colori forzati |
| Peso dell'HTML (zlib livello 9) | `/puglia-digitale/`: +16,3 KB, +2,1 KB con gzip, cioè 26,8 KB su 35 (T2); brotli +1,7 KB. Home e `/citta-digitali/`: +1,0 KB, +0,14 KB con gzip (CSS condiviso). Con P4 la Home arriva a 29,5 KB gzip su 40 |
| P4, capitolo 02 della Home | Nessuna sovrapposizione a 161 larghezze, con e senza 1.4.12; axe 0 violazioni |

## 8. Limiti noti

- **Cassano e l'anello della sede.** Cassano sta a 7,1 km da Acquaviva.
  - Fino a circa 400 px di carta il suo punto sta dentro l'anello; tra 400 e 770 px l'anello lo attraversa, e il ritaglio del punto lo interrompe.
  - Santeramo e Gioia del Colle (13 km) fanno lo stesso sui telefoni, tra 216 e 420 px.
  - È il costo della sede in mezzo al gruppo più fitto, come San Cataldo sotto Caltanissetta (DV §1.4).
- **Nomi sulla costa.** «OSTUNI» e «NARDÒ» attraversano la linea di costa; il fondo nel colore della superficie la interrompe sotto il nome, come già sulla carta di oggi (DS §2.4).
- **Su desktop resta un vuoto a sinistra.** La regione è più alta che larga rispetto alla striscia, e la carta allineata a destra lascia vuote le colonne sotto i pulsanti. Lo considero respiro, non un difetto; il creative-director lo valuta.
- **Misure in Chromium.** Safari iOS e Firefox `[DA VERIFICARE]`, come per le altre carte.

## 9. Alternative scartate

- **Il confine regionale da un dato scaricato** (Natural Earth admin-1 da GitHub o ISTAT): da decidere a parte, con licenza, attribuzione e peso. Una regione chiusa farebbe comunque pensare a una copertura.
- **Una campitura della regione:** vietata (N12; brand-strategist, condizione 2).
- **Sul telefono, il ritaglio sulla Terra di Bari:** non sarebbe la Puglia intera che l'utente chiede.
- **Nomi sempre su una riga:** su 280–400 px di carta Gravina resterebbe senza nome.
- **Le coordinate sotto i nomi:** regola 8, e il doppio dell'ingombro nel gruppo più fitto.
- **«MURGIA» tra i punti:** si leggerebbe come una città.
- **Un solo elemento con tre classi in query di contenitore** al posto di due elementi: risparmierebbe circa 1 KB gzip, ma vorrebbe un'altra serie di regole d'ancoraggio. Si può fare dopo, se servisse peso.

## Verdetto di dominio (UI)

**Proposta pronta per la decisione del creative-director.**
- **Risponde alla richiesta dell'utente.** Mostra la Puglia intera sotto la prima frase, con un punto per ogni città di Puglia Digitale, nelle due varianti della hero.
- **Rispetta le soglie.**
  - Accessibilità: descrizione, nessuna sovrapposizione anche con 1.4.12, reflow, 0 violazioni axe, colori forzati.
  - Performance: nessun JavaScript, +2,1 KB gzip, 26,8 KB su 35.
  - Veridicità: niente campitura né confine, nessun numero; nomi oltre i solidi solo in anteprima, con l'ordine pronto per il go-live.
- **Decisioni da prendere.** Le nuove regole del §2 (due righe, `drop3`, sede, distanza dai nodi) estendono la DV §1.4: le decide il creative-director. Il capitolo 02 della Home è una decisione a parte.

## Ipotesi da validare

- **Grafia dei nomi.** Oltre ai tre della pagina, i nomi restano `[DA VERIFICARE]` (`citta-digitali-elenco.md` §1, §4). L'elenco come insieme è confermato dall'utente.
- **Foce del Saccione.** La fonte non dà coordinate: il punto è il vertice di Natural Earth più vicino al confine `[DA VERIFICARE]`, ininfluente a questa scala (un vertice ogni 3–5 km).
- **Browser.** Misure in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`.

## Domande aperte

- **creative-director:**
  - le nuove regole del §2;
  - l'ordine dei nomi;
  - l'impaginato della hero (allineata a destra, tre quarti della finestra);
  - «MURGIA» tolta;
  - il capitolo 02 della Home (P4).
- **copywriter-brand:** il testo della legenda; la descrizione, se più corta.
- **ux-designer:** la descrizione di 379 caratteri, oppure una più corta.
- **Utente** (se P4 passa): l'allineamento del capitolo 02 della Home, che non aveva chiesto.

## Decisioni richieste

1. **creative-director:** adottare P1–P3 e P5 per la hero di `/puglia-digitale/`, con le estensioni della DV §1.4 e della §7.5, riga 1.
2. **creative-director, poi utente:** P4, il capitolo 02 della Home.
3. **Sessione principale:** applicare le patch 1–5, eseguire `npm run maps` (controllo sha256), fare la build; la 6 solo con P4.
   - Dopo la decisione aggiorno il design system (§2.4, §5.4, §6) e rifaccio le prove sulla build di staging.
