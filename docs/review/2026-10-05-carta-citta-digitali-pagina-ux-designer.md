---
titolo: Carta di /citta-digitali/ · colori forzati (P6) e descrizione della carta (P3 e L6)
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-05
fonti: [docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md (P1–P6, commit f5f28fe), docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (v1.2, L4 e L6, commit e13e717), docs/creativa/direzione-visiva.md (0.7, §1.4 «Il punto-città» e §7.6, commit c60fb3e), docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md, docs/contenuti/copy-deck/citta-digitali.md (1.2, V2), docs/contenuti/copy-deck/contatti.md (1.4, V3 e «Decisioni richieste»), docs/ux/accessibilita.md, docs/ux/struttura-pagine.md, src/components/ (MapItaly, Horizon, Node, SlotPending, Header, LocationShowcase, ProjectShowcase, FounderTimeline, VideoSection, ImmersivePreview), staging http://localhost:4321, copia del sito con le patch 1–6 di ui-designer, L6 e la patch 6 bis (build servita su http://localhost:4341; variante «publish» su 4342), Playwright 1.56 con Chromium 141 (colori forzati emulati, palette chiara e scura), albero di accessibilità via CDP, axe-core 4.13 del 2026-10-05]
oggetto: decisione su P6 (colori forzati) estesa al resto del sito; descrizione della carta di /citta-digitali/ tra P3 (ui-designer) e L6 (copywriter-brand); regola per quando arriva l'elenco in testo; allineamento di struttura-pagine.md al sito costruito
---

# Carta di `/citta-digitali/` · colori forzati e descrizione della carta

## In sintesi
- **P6 approvata, da applicare prima del go-live.** Nei colori forzati (temi a contrasto di Windows) nodi, punti e richiami di tutte le carte spariscono, e i punti aprono buchi nella costa. La patch di ui-designer li rimette, e nel modo normale non cambia un pixel.
  - Provato su 4 carte, a 390 e 1440 px, con la palette chiara e quella scura.
  - Diventa una regola di progetto, oltre WCAG 2.2 AA (`accessibilita.md` §2.14): nei colori forzati non deve sparire nessun segno che porta informazione e nessun indicatore di focus o di stato.
- **Lo stesso difetto c'è nel resto del sito.** Il più serio: **il focus non si vede** sui controlli del video di Città Digitali e sui nodi della foto della Home (F1). L'anello è un'ombra, e i colori forzati tolgono le ombre.
  - Spariscono anche il punto della voce corrente nel menu (F2), nodi e richiami dell'Orizzonte e delle porte (F3), e altri segni (F4).
  - Patch 6 bis: 9 componenti, solo CSS, 82 righe. Nel modo normale le schermate restano identiche, anche con il focus. Nei colori forzati ogni fermata del Tab ha il suo contorno, su 7 pagine, a 390 e 1440 px.
- **Descrizione della carta di `/citta-digitali/`: L6, senza i tre nomi.** Testo da applicare:
  > Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia.
  - In codice: la frase «Tra queste: …» si scrive solo quando la carta disegna dei nomi; la pagina non ne passa. La descrizione della Home non cambia (identica byte per byte).
  - Motivo: su questa pagina la carta non disegna nomi, e le tre città sono già nel testo prima e nelle schede subito dopo. WCAG 1.1.1 si valuta nel contesto (§3).
- **Regola per quando arriva l'elenco in testo: confermata**, a quattro condizioni (§3.4). Si toglie `label`, e carta e legenda tornano insieme `aria-hidden`.
- **`struttura-pagine.md` 0.5 allineata al sito costruito.** Città Digitali: CD-1, CD-2, ordine e ponte. Contatti: CT-1, CT-2/CT-3, CT-4 e la sezione Persona (§5).

## 1. P6 · Colori forzati sulle carte: approvata

**Che cosa succede oggi** (staging, colori forzati emulati in Chromium).
- I nodi, i punti e i richiami delle carte sono disegnati come sfondi. Nei colori forzati il sistema dipinge gli sfondi nel colore della tela (`Canvas`), quindi spariscono:
  - 3 nodi su 3 nel capitolo 02 della Home e nella hero di Puglia Digitale;
  - 45 su 45 nel capitolo 03;
  - 3 su 3 su `/citta-digitali/`, oggi.
  - Resta solo l'anello della sede, che è un bordo.
- Sulla costa, il punto di Monopoli e quelli pugliesi del capitolo 03 lasciano un buco nella linea.
- I nomi restano, senza il luogo a cui si riferiscono.

**Decisione.** P6 si applica così com'è, prima del go-live.
- **Non è una soglia.** WCAG 2.2 AA non chiede di sostenere i colori forzati.
- **Chi li usa.** I temi a contrasto servono a persone ipovedenti, spesso le stesse che navigano da tastiera, ed è il modo in cui leggono il sito. Una carta senza i suoi luoghi perde il dato che deve mostrare.
- **Costo nullo.** La patch agisce solo dentro `@media (forced-colors: active)`. Nel modo normale le carte restano identiche pixel per pixel: capitoli 02 e 03 della Home e hero di Puglia Digitale, a 390 e 1440 px.
- **Tecnica corretta.** `forced-color-adjust: none` solo sui segni, sempre insieme a colori di sistema: `CanvasText` per il segno, `Canvas` per l'anello che lo ritaglia. Così i segni seguono la palette scelta dall'utente invece di imporre i colori del marchio.
- **Vale anche altrove.** Firefox applica le stesse regole quando l'utente sostituisce i colori delle pagine.

## 2. Colori forzati nel resto del sito (patch 6 bis)

Ho cercato in tutte le pagine, a 390 e 1440 px, i segni disegnati solo come sfondo e senza bordo né contorno, e ho controllato con un giro di Tab ogni fermata del focus nei colori forzati.

### F1 · [IMPORTANTE] Focus invisibile sui controlli del video e sui nodi della foto
- **Dove.**
  - `/citta-digitali/`, controlli del video: «Riproduci il video», «Disattiva l’audio», «Guarda a schermo intero». Componente `VideoSection.astro`.
  - Home, nodi 1–3 sulla foto del documento. Componente `ImmersivePreview.astro`.
- **Problema.** L'anello del focus è un `box-shadow` (il doppio anello `--focus-ring-media`) con `outline: none`. I colori forzati tolgono le ombre, quindi su questi 6 pulsanti il focus non si vede.
  - Sui video non cambia nulla.
  - Sui nodi resta solo l'ingrandimento dell'anello, che è un segnale debole.
- **Motivazione.** `accessibilita.md` §2.2: «Mai `outline: none` senza un sostituto». Il sostituto c'è, ma non sopravvive ai colori forzati. Nel modo normale 2.4.7 è rispettato, quindi non è una soglia. È però l'unico punto in cui chi usa il tema a contrasto perde il focus.
- **Proposta.** `outline: 2px solid transparent; outline-offset: 2px` al posto di `outline: none`.
  - Nel modo normale il contorno trasparente non si vede: schermate identiche con il focus, a 390 e 1440 px.
  - Nei colori forzati il sistema lo disegna nel suo colore.

### F2 · [SUGGERIMENTO] La voce corrente del menu perde il suo segno
- **Dove.** `Header.astro`: il punto prima della voce corrente, nell'header e nel menu mobile.
- **Problema.** Il punto è uno sfondo e sparisce: nell'header e nel menu nessuna voce risulta marcata come corrente.
- **Motivazione.** È lo stato «voce corrente, non solo con il colore» di `accessibilita.md` §4.2, punto 2. `aria-current` resta per gli screen reader, e breadcrumb e H1 dicono comunque dove si è.
- **Proposta.** Nei colori forzati il punto in `LinkText`, il colore dei link del tema.

### F3 · [SUGGERIMENTO] Orizzonte e porte: spariscono nodi e richiami
- **Dove.**
  - Orizzonte nella hero della Home (8 nodi) e sotto la hero di Città Digitali (4 nodi), con i loro richiami. Componente `Horizon.astro`.
  - Puglia Digitale, porte da desktop: nodi e fili verso le porte. Componente `LocationShowcase.astro`.
- **Problema.** Lo stesso di P6. I nomi e i gradi restano senza il punto a cui si riferiscono, e i nodi aprono buchi nella linea dell'orizzonte e nel filo delle porte.
- **Proposta.** Lo stesso blocco di P6: segni in `CanvasText`.

### F4 · [SUGGERIMENTO] Altri segni
- **Il Nodo** (`Node.astro`: punti caldi di SIII, nella hero e negli esempi, e del capitolo 01 della Home). Il punto sparisce e resta il solo anello. Ma l'anello vuoto è il segno della sede: due segni diversi diventano uguali.
- **Tacche dei capitoli** (`ProjectShowcase.astro`) e **timeline del fondatore** (`FounderTimeline.astro`: tacche e punto di «Oggi»).
- **Variante «publish» dei segnaposto** (`SlotPending.astro`): nodi e punti caldi. Provata con una build `PUBLIC_SLOT_MODE=publish`.
- **Proposta.** Lo stesso blocco, con `outline-color: CanvasText` dove il segno ha anche un anello come contorno.

### Residui accettati
- Sottolineatura dei link dell'header al passaggio del mouse: è solo un effetto di hover, e il focus ha il suo contorno.
- Cerchio rosso dell'icona d'errore: «!» resta come testo, insieme al messaggio e al prefisso «Errore:».
- Fondo della pillola selezionata di «Mi interessa»: la casella nativa resta visibile e spuntata.
- Fondo dei pulsanti: i pulsanti hanno un bordo, che resta.
- Fondo del punto numerato dei nodi della foto: il numero resta dentro l'anello.
- Le tende che aprono le immagini (`.aperture`) e il pannello dietro l'Orizzonte sono superfici, non segni.

### Patch 6 bis
Si applica da sola, oppure prima o dopo le patch 1–6 di ui-designer e L6 (§3.3). L'ho verificato con `git apply --check` sul repository al commit c60fb3e, in tre ordini diversi. Con tutte le patch applicate i file sono identici, uno per uno, a quelli della copia provata. Copia della patch: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ux-p6/diff/forced-extra.patch`.

```diff
diff --git a/src/components/layout/Header.astro b/src/components/layout/Header.astro
index ede17a9..85c5406 100644
--- a/src/components/layout/Header.astro
+++ b/src/components/layout/Header.astro
@@ -391,4 +391,14 @@ const menuItems = [
       transform: none;
     }
   }
+
+  /* Forced colors (Windows contrast themes): the system paints every background in its canvas colour,
+     so marks drawn as backgrounds would vanish. Draw them in a system colour (accessibilita.md §2.14). */
+  @media (forced-colors: active) {
+    .site-header__nav a[aria-current='page']::before,
+    .mobile-menu__list a[aria-current='page'] .mobile-menu__name::before {
+      forced-color-adjust: none;
+      background: LinkText;
+    }
+  }
 </style>
diff --git a/src/components/sections/FounderTimeline.astro b/src/components/sections/FounderTimeline.astro
index 2ce2ba1..4fa3027 100644
--- a/src/components/sections/FounderTimeline.astro
+++ b/src/components/sections/FounderTimeline.astro
@@ -333,4 +333,15 @@ const { eyebrow, title, lead, stages, portrait, portraitAlt = '', portraitNote,
       padding-bottom: var(--space-xl);
     }
   }
+
+  /* Forced colors (Windows contrast themes): the system paints every background in its canvas colour,
+     so marks drawn as backgrounds would vanish. Draw them in a system colour (accessibilita.md §2.14). */
+  @media (forced-colors: active) {
+    .founder__tick,
+    .founder__stage--now .founder__tick {
+      forced-color-adjust: none;
+      background: CanvasText;
+      outline-color: CanvasText;
+    }
+  }
 </style>
diff --git a/src/components/sections/ImmersivePreview.astro b/src/components/sections/ImmersivePreview.astro
index 6947507..b921ee8 100644
--- a/src/components/sections/ImmersivePreview.astro
+++ b/src/components/sections/ImmersivePreview.astro
@@ -212,9 +212,11 @@ const ratioSmall = smallImage ? `${smallImage.width} / ${smallImage.height}` : r
     transform: scale(1.4);
   }
 
-  /* Double ring: readable on light and dark parts of the photo. */
+  /* Double ring: readable on light and dark parts of the photo. The transparent outline is the ring of
+     forced colors (Windows contrast themes), which drop shadows (accessibilita.md §2.14). */
   .document__btn:focus-visible {
-    outline: none;
+    outline: 2px solid transparent;
+    outline-offset: 2px;
   }
 
   .document__btn:focus-visible .document__ring {
diff --git a/src/components/sections/LocationShowcase.astro b/src/components/sections/LocationShowcase.astro
index d373a50..c6b169c 100644
--- a/src/components/sections/LocationShowcase.astro
+++ b/src/components/sections/LocationShowcase.astro
@@ -502,4 +502,14 @@ const north = [...locations]
       grid-row: 1;
     }
   }
+
+  /* Forced colors (Windows contrast themes): the system paints every background in its canvas colour,
+     so marks drawn as backgrounds would vanish. Draw them in a system colour (accessibilita.md §2.14). */
+  @media (forced-colors: active) {
+    .door__leader,
+    .door__leader::after {
+      forced-color-adjust: none;
+      background: CanvasText;
+    }
+  }
 </style>
diff --git a/src/components/sections/ProjectShowcase.astro b/src/components/sections/ProjectShowcase.astro
index ac9f105..a84d0e4 100644
--- a/src/components/sections/ProjectShowcase.astro
+++ b/src/components/sections/ProjectShowcase.astro
@@ -217,4 +217,13 @@ const { number, bearing, name, descriptor, statement, text, cta, layout, surface
       align-self: center;
     }
   }
+
+  /* Forced colors (Windows contrast themes): the system paints every background in its canvas colour,
+     so marks drawn as backgrounds would vanish. Draw them in a system colour (accessibilita.md §2.14). */
+  @media (forced-colors: active) {
+    .chapter__bearing::before {
+      forced-color-adjust: none;
+      background: CanvasText;
+    }
+  }
 </style>
diff --git a/src/components/sections/VideoSection.astro b/src/components/sections/VideoSection.astro
index 19a71cf..e95613f 100644
--- a/src/components/sections/VideoSection.astro
+++ b/src/components/sections/VideoSection.astro
@@ -211,8 +211,11 @@ const titleId = `${id}-title`;
     color: var(--inchiostro);
   }
 
+  /* Double ring on the video. The transparent outline is the ring of forced colors (Windows contrast
+     themes), which drop shadows (accessibilita.md §2.14). */
   .video__btn:focus-visible {
-    outline: none;
+    outline: 2px solid transparent;
+    outline-offset: 2px;
     box-shadow: var(--focus-ring-media);
   }
 
diff --git a/src/components/ui/Horizon.astro b/src/components/ui/Horizon.astro
index 171fc6d..6649844 100644
--- a/src/components/ui/Horizon.astro
+++ b/src/components/ui/Horizon.astro
@@ -372,4 +372,14 @@ groups.forEach((group, gi) => {
       transform: translateX(calc(var(--rotate) / -540 * 100%));
     }
   }
+
+  /* Forced colors (Windows contrast themes): the system paints every background in its canvas colour,
+     so marks drawn as backgrounds would vanish. Draw them in a system colour (accessibilita.md §2.14). */
+  @media (forced-colors: active) {
+    .horizon__node,
+    .horizon__label::before {
+      forced-color-adjust: none;
+      background: CanvasText;
+    }
+  }
 </style>
diff --git a/src/components/ui/Node.astro b/src/components/ui/Node.astro
index b1c112e..28c88c0 100644
--- a/src/components/ui/Node.astro
+++ b/src/components/ui/Node.astro
@@ -102,4 +102,17 @@ const { kind = 'hotspot', number, ping = false, class: className, style } = Astr
   :global(button:focus-visible) > .node .node__ring {
     transform: scale(1.4);
   }
+
+  /* Forced colors (Windows contrast themes): the system paints every background in its canvas colour,
+     so marks drawn as backgrounds would vanish. Draw them in a system colour (accessibilita.md §2.14). */
+  @media (forced-colors: active) {
+    .node__dot {
+      forced-color-adjust: none;
+      background: CanvasText;
+    }
+
+    .node__num {
+      color: Canvas;
+    }
+  }
 </style>
diff --git a/src/components/ui/SlotPending.astro b/src/components/ui/SlotPending.astro
index e4b37f3..9ca69a5 100644
--- a/src/components/ui/SlotPending.astro
+++ b/src/components/ui/SlotPending.astro
@@ -185,4 +185,15 @@ const lines = meta.map((line) => line.split(' · ').map(nb).join(' · '));
     letter-spacing: var(--tr-display-s);
     font-weight: var(--fw-strong);
   }
+
+  /* Forced colors (Windows contrast themes): the system paints every background in its canvas colour,
+     so marks drawn as backgrounds would vanish. Draw them in a system colour (accessibilita.md §2.14). */
+  @media (forced-colors: active) {
+    .slot-pub__node,
+    .slot-pub__hot {
+      forced-color-adjust: none;
+      background: CanvasText;
+      outline-color: CanvasText;
+    }
+  }
 </style>
```

## 3. Descrizione della carta di `/citta-digitali/`: L6

### 3.1 Decisione
**La carta resta un'immagine con una descrizione (P3), ma senza i tre nomi (L6 di copywriter-brand).** Testo da applicare, 138 caratteri:
> Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia.

La legenda resta L1 in `<figcaption>`: «Ogni punto è una città di Città Digitali».

### 3.2 Perché
- **WCAG 1.1.1 si valuta nel contesto.** L'alternativa deve dare lo stesso scopo dell'immagine. Su questa pagina la carta aggiunge al testo una sola cosa: dove stanno tutte le altre città. Le due frasi di L6 la danno, con le regioni da nord a sud e la regione più fitta.
- **Le tre città in evidenza sono già nel testo, con il loro luogo.** Chi usa uno screen reader le incontra:
  - prima della carta: nel paragrafo («città come Varese, Altamura e Caltanissetta») e nello statement («Da Varese a Caltanissetta, passando per Altamura»);
  - subito dopo: nelle schede, ciascuna con il nome (H3) e la regione («Lombardia», «Puglia», «Sicilia»).

  Con «Tra queste» le sentirebbe una quarta volta nella stessa sezione.
- **La relazione tra nodi e schede la dà già la struttura.** Le tre città sono le sole con una scheda, e la scheda dice la regione. L'allineamento alla latitudine e l'accensione del nodo sono l'eco visiva di quella lista (1.3.1).
- **È il criterio con cui ho deciso la Home:** la descrizione nomina ciò che la carta mostra, e nessun nome che la carta non mostri. Su questa pagina la carta non disegna nomi.
- **Regge anche fuori contesto.** Chi salta da un'immagine all'altra sente una descrizione completa della carta, cioè la rete e la sua estensione. Le tre città arrivano con la lettura della sezione.
- **Perché non P3.** La richiesta di ui-designer, nominare ciò che la carta mette in evidenza, è giusta in generale. Qui però l'informazione è già accanto, nella stessa sezione e nell'ordine di lettura. Ripeterla non aggiunge equivalenza, solo lunghezza.

### 3.3 In codice
- **Funzione condivisa** (`describeCittaDigitali`, P4 di ui-designer): `names` diventa facoltativo, e la frase «Tra queste: …» si scrive solo se ci sono nomi.
- **Pagina:** `describeCittaDigitali()`, senza nomi.
- **Home:** passa i 9 nomi della carta larga. Il risultato è identico a oggi: stessa etichetta, carattere per carattere, sullo staging e sulla build provata.
- La patch si applica dopo le patch 1–5 di ui-designer. Copia: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ux-p6/diff/l6.patch`.

```diff
diff --git a/src/lib/citta-digitali.ts b/src/lib/citta-digitali.ts
index 3cdaa18..fa0a3f7 100644
--- a/src/lib/citta-digitali.ts
+++ b/src/lib/citta-digitali.ts
@@ -1,8 +1,10 @@
 /**
  * Text alternative of a map with the cities of Città Digitali (WCAG 1.1.1, 1.3.1), built from the same
- * data as the dots: regions north → south, the region with most cities, then the cities the map
- * names or highlights. No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
- * Wording: copywriter-brand (L4), «Tra queste» because a map may name only some of the cities.
+ * data as the dots: regions north → south, the region with most cities, then the names the map draws.
+ * No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
+ * Wording: copywriter-brand (L4, L6). «Tra queste» only when the map draws names (narrow maps draw
+ * fewer than wide ones, so they are examples). A map that draws none, like the one of /citta-digitali/
+ * whose nodes are named by the cards beside it, gets no third sentence (ux-designer, 2026-10-05).
  */
 import cittaDigitali from '../data/citta-digitali.json';
 
@@ -16,10 +18,11 @@ if (unknown.length) throw new Error(`lib/citta-digitali.ts: add ${unknown.join('
 const andList = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}` : (xs[0] ?? ''));
 const inRegion = (r: string) => (r === 'Lazio' ? `nel ${r}` : `in ${r}`);
 
-/** `names`: the cities the map names or highlights, north → south. */
-export function describeCittaDigitali(names: string[]): string {
+/** `names`: the names the map draws on wide screens, north → south; none for a map without names. */
+export function describeCittaDigitali(names: string[] = []): string {
   const regions = REGIONS.filter((r) => perRegion.has(r));
   const [mostRegion, mostCount] = [...perRegion].sort((a, b) => b[1] - a[1])[0];
   const share = mostCount > cittaDigitali.citta.length / 2 ? 'la maggior parte' : 'più che altrove';
-  return `Carta d’Italia con le città di Città Digitali. Sono in ${andList(regions)}, ${share} ${inRegion(mostRegion)}. Tra queste: ${andList(names)}.`;
+  const among = names.length ? ` Tra queste: ${andList(names)}.` : '';
+  return `Carta d’Italia con le città di Città Digitali. Sono in ${andList(regions)}, ${share} ${inRegion(mostRegion)}.${among}`;
 }
diff --git a/src/pages/citta-digitali.astro b/src/pages/citta-digitali.astro
index bd2d0ed..2bb03ef 100644
--- a/src/pages/citta-digitali.astro
+++ b/src/pages/citta-digitali.astro
@@ -93,9 +93,10 @@ const cities = italyPlaces.map((p) => ({
     surface="notte"
     location="luoghi"
     cityDots={{
-      // Legend: copywriter-brand L1. Text alternative until the full list of cities is in this section.
+      // Legend: copywriter-brand L1. Text alternative while the full list of cities is not in this
+      // section; no names: the map draws none, the cards beside it name its three nodes (L6).
       legend: 'Ogni punto è una città di\u00a0Città\u00a0Digitali',
-      label: describeCittaDigitali([...cities].sort((a, b) => b.lat - a.lat).map((c) => c.name)),
+      label: describeCittaDigitali(),
     }}
     allPlaces={{
       // Source of the full list of cities until it is confirmed and published here (citta-digitali-elenco.md §4).
```

### 3.4 Quando arriva l'elenco in testo: regola confermata
**Si toglie `label`, e carta e legenda tornano insieme `aria-hidden`.** La legenda spiega solo ciò che si vede: letta da sola, parlerebbe di punti che lo screen reader non incontra. Vale a quattro condizioni:
1. **Completo:** l'elenco contiene ogni città disegnata come punto, dallo stesso file dati della carta.
2. **Raggruppato per regione**, con il nome della regione: così dice anche dove stanno le città e quale regione è la più fitta. Il numero arriva solo alle condizioni di brand-strategist.
3. **Accanto:** nella stessa sezione `#portale`, subito dopo la carta o dopo le schede.
4. **Visibile, oppure in un `<details>`** il cui sommario dica che cosa contiene, per esempio «Tutte le città del portale, per regione». Un elenco solo nascosto (`sr-only`) non va bene.

Se una condizione manca, la carta tiene la descrizione di L6.

### 3.5 Albero di accessibilità (build con P1–P5 e L6)
- **Ordine di lettura della sezione** (CDP, 390 e 1440 px):
  1. H2 «L’Italia in un unico portale.»;
  2. paragrafo e statement;
  3. «Tutte le città sul portale Città Digitali (si apre in una nuova scheda)»;
  4. immagine con la descrizione L6;
  5. legenda;
  6. Varese (H3), «Lombardia», riga, «Esplora Varese su varesedigitale.it (si apre in una nuova scheda)», e così le altre due.
- **Stato futuro** (carta e figura `aria-hidden`): la lettura passa dal link alle schede, e nessuna immagine resta senza nome.
- **Due precisazioni sulle misure, anche rispetto alla mia review della carta della Home.**
  - **Nomi disegnati.** Nell'albero interno che CDP restituisce, sotto l'immagine compaiono ancora come testo i nomi disegnati: sulla Home a 390 px Varese, Itri, Altamura, Cosenza e Caltanissetta. Chromium però espone `role="img"` come foglia alle API di accessibilità, perché per ARIA i figli di un'immagine sono solo presentazionali. Lo conferma anche l'albero ARIA di Playwright: un'immagine con il suo nome e nient'altro. La conclusione della review della Home resta valida (i nomi non si leggono una seconda volta), ma l'osservazione «nessun figlio» va letta così. Da confermare con NVDA e VoiceOver (vedi «Ipotesi da validare»).
  - **Nome della figura.** In Chromium 141 la figura non prende il nome dalla `<figcaption>`, e la legenda si legge una volta, come contenuto. Altri browser possono dare alla figura il nome della didascalia: allora la legenda si sentirebbe due volte, entrando nella figura e leggendola. È il comportamento normale delle figure e non richiede interventi.

## 4. Prove

| Prova | Esito |
|---|---|
| P6, colori forzati emulati: capitoli 02 e 03 della Home, hero di Puglia Digitale e `/citta-digitali/` con P1, a 390 e 1440 px, palette chiara e scura | Senza P6: tutti i nodi, i punti e i richiami hanno lo sfondo nel colore della tela, e la costa ha dei buchi. Con P6: tutti in `CanvasText`, con l'anello in `Canvas` |
| P6 e 6 bis nel modo normale | Schermate identiche pixel per pixel allo staging. Carte: capitoli 02 e 03 e Puglia Digitale, a 390 e 1440 px. Altri dispositivi: header, menu mobile, Orizzonte (Home a 390 e 1440, Città Digitali a 390), porte, controlli del video con il focus (390 e 1440), nodo della foto con il focus, nodi di SIII, timeline, tacca del capitolo |
| Giro di Tab nei colori forzati, 7 pagine, a 390 e 1440 px | Prima: 6 pulsanti senza focus visibile (3 del video e 3 nodi della foto). Con 6 bis: ogni fermata ha il suo contorno, in tutte le 14 combinazioni |
| Ricerca dei segni che spariscono (script dell'Appendice D di `accessibilita.md`), 7 pagine, a 390 e 1440 px | Staging: Orizzonte, porte, Nodo, carte, tacche, timeline, voce corrente dell'header e del menu. Con 6 bis resta solo la sottolineatura dei link dell'header al passaggio del mouse (residuo accettato) |
| Variante «publish» nei colori forzati | Nodi e punti caldi in `CanvasText` sulla Home, su SIII e su Puglia Digitale; colori invariati nel modo normale |
| axe-core 4.13 sulla build con P1–P6, L6 e 6 bis: 8 pagine, a 390 e 1440 px, più menu aperto e form inviato vuoto | 0 violazioni in 32 esecuzioni |
| Descrizioni | `/citta-digitali/`: L6, 138 caratteri. Home: 241 caratteri, identica allo staging |
| Patch | `git apply --check` pulito al commit c60fb3e, in tre ordini; build senza errori; con le patch applicate i file sono identici a quelli della copia provata. Cambiare il paragrafo citato nei commenti (§2.14) non cambia la build |

Le schermate prima e dopo (colori forzati, palette chiara e scura) sono nello scratchpad e non sono versionate.

## 5. Documenti UX allineati
- **`docs/ux/struttura-pagine.md` 0.5** (segnalazioni V2 e V3 di copywriter-content).
  - Città Digitali:
    - outline e ordine del sito: video prima del portale, ponte prima della chiusura;
    - CD-1 senza occhiello, con il breadcrumb, il link «Aderisci a Città Digitali ↓» e l'Orizzonte decorativo come chiusura della hero;
    - CD-2 con le schede come nel sito (regione con coordinate, niente dominio visibile né foto), la carta con il punto-città, la descrizione L6 e la regola di §3.4;
    - CD-6 diventa il ponte «Gli altri mondi ITnode».
  - Contatti:
    - CT-1 senza occhiello e con le misure del primo viewport;
    - CT-2 e CT-3 con l'ordine e la composizione del sito;
    - CT-4 con il nome come link nell'H3;
    - nuova scheda CT-6 Persona.
- **`docs/ux/accessibilita.md` 0.5.**
  - §2.2: il focus resta visibile anche nei colori forzati.
  - §2.8: regola delle carte con la pagina di Città Digitali.
  - Nuovo §2.14 sui colori forzati, con la regola e la prova.
  - §4.3: verifica nei colori forzati, con lo script collaudato in Appendice D.
  - §4.4: P6, F1–F4 e L6 a registro.

## 6. Risposte alle altre domande rivolte a ux-designer nei copy deck
- **Contatti, composizione di recapiti e form: confermata come nel sito.**
  - Da 1024 px affiancati: recapiti a sinistra, form a destra.
  - Sotto, in colonna: recapiti, poi form.
  - L'ordine del focus coincide con quello di lettura a tutte le larghezze.
  - A 390 × 844 i tre canali diretti stanno nel primo viewport.
- **Contatti, testo nascosto « nella home»: confermato.** Il nome accessibile è «Scopri il suo percorso nella home».
  - Comincia con il testo visibile (2.5.3) e dice la destinazione a chi scorre l'elenco dei link (2.4.4).
  - Ricontrollato sullo staging del 2026-10-05.
  - Se il creative-director sceglie «Il suo percorso →», il testo nascosto resta lo stesso.
- **Città Digitali, dominio visibile sotto le CTA della hero** (proposta O4 di seo-content, nota di copywriter-content). Per l'usabilità sono favorevole: aiuta a riconoscere il dominio con l'accento e a distinguerlo dall'omonimo.
  - Forma: «cittàdigitali.it» come testo semplice, non come link, nello stile mono dei portali di Contatti.
  - Accessibilità: non aggiunge fermate al Tab. Può restare leggibile dagli screen reader, perché il nome della CTA non contiene il dominio.
  - Decide il creative-director, perché cambia la composizione della hero.

## Verdetto di dominio (accessibilità)
**P1–P5 con L6 al posto della descrizione a tre nomi: conformi a WCAG 2.2 AA.**
- **Colori forzati, sopra la soglia.** P6 e F1 vanno applicati prima del go-live. F2–F4 sono consigliati nella stessa patch, perché non costano nulla nel modo normale.
- **Nessuna di queste decisioni cambia qualcosa a schermo nel modo normale.**
- Il verdetto di gate spetta al creative-director.

## Ipotesi da validare
- **Windows con un tema a contrasto reale** (per esempio «Notte» e «Deserto»), con Edge e Firefox. Qui i colori forzati sono solo emulati in Chromium. `[DA FORNIRE: dispositivo Windows o servizio di test]`
- **Screen reader reali** (NVDA con Chrome e Firefox, VoiceOver con Safari).
  - Le due carte si leggono come immagini con la descrizione, senza i nomi disegnati.
  - La legenda si sente una volta, o due se il browser dà alla figura il nome della didascalia.
  - Già tra le ipotesi della review della Home.
- I nomi della pagina «Tutte le città» restano `[DA VERIFICARE]` (`citta-digitali-elenco.md` §4). L6 non ne nomina nessuno.

## Domande aperte
- **creative-director:**
  - allineare la direzione visiva 0.7, §1.4 («Accessibilità») e §7.6, sezione 3, punto 2: la carta di `/citta-digitali/` ha la descrizione L6, senza «Tra queste»;
  - nello stesso paragrafo la descrizione della Home oggi è di 241 caratteri, non 255;
  - dominio visibile sotto le CTA della hero di Città Digitali (§6).
- **copywriter-content:** nel copy deck di Città Digitali (sezione 2), legenda L1 e descrizione L6 al posto della descrizione a tre nomi.
- **ui-designer:** P6 e 6 bis nel design system: i segni delle Coordinate e gli anelli di focus nei colori forzati.

## Decisioni richieste
- **Sessione principale.** Nell'ordine, ciascuna con `git apply`:
  1. patch 1–5 di ui-designer (P1–P5, adottate nella direzione visiva 0.7);
  2. patch L6 (§3.3);
  3. patch 6 di ui-designer (P6);
  4. patch 6 bis (§2).

  Poi la build. Le patch 6 e 6 bis si possono applicare anche da sole, se P1–P5 slittano. Dopo l'applicazione rifaccio il giro di Tab nei colori forzati e l'albero di accessibilità sulla build di staging.
- **creative-director:** allineare la direzione visiva su L6 (vedi «Domande aperte»).
