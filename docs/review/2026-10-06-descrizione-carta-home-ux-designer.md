---
titolo: Descrizione della carta del capitolo 03 della Home · 7 nomi o 5
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-06
fonti: [docs/creativa/direzione-visiva.md (0.12, §1.4 «Accessibilità»), docs/ui/design-system.md (0.8, domande aperte), docs/ux/accessibilita.md (0.7, §2.8 «Carte»), docs/review/2026-10-06-carta-puglia-intera-ux-designer.md (L7), docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (L4, L7), src/data/maps.json (maps.italia.places, sha256 a0279e68…), src/pages/index.astro, src/lib/citta-digitali.ts, staging http://localhost:4321 (commit 3edfc79), copia del repository con lo snippet (build in locale, non versionata), albero di accessibilità via CDP (Chromium 141) del 2026-10-06]
oggetto: quali nomi d'esempio nella descrizione della carta d'Italia del capitolo 03, dopo la regola 11 (R1, R2)
---

# Descrizione della carta del capitolo 03 della Home · 7 nomi o 5

## In sintesi
- **Decisione: B, i 5 nomi disegnati a ogni larghezza.** Testo, 199 caratteri:
  > Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Itri, Altamura, Cosenza e Caltanissetta.
- **Una sola regola per tutte le carte con il punto-città:** i nomi d'esempio sono quelli disegnati a ogni larghezza. Cade l'eccezione della Home in `accessibilita.md` §2.8 (0.8).
- **Snippet** per `src/pages/index.astro`, più un commento in `src/lib/citta-digitali.ts` (§3). L'ho provato su una copia di 3edfc79: cambia solo la descrizione, e nulla di visibile. Per questo non serve il passaggio dal creative-director.

## 1. La scelta

### [IMPORTANTE] Nomi d'esempio della carta del capitolo 03: B (5 nomi)
- **Dove.** `src/pages/index.astro`, `mapLabel` (oggi righe 30–31), passato a `MapItaly` come `aria-label` della carta del capitolo 03.
- **Problema.** Dopo la regola 11 (R1, R2) la descrizione dice i 7 nomi della carta larga (A, 218 caratteri). Bari e Caltagirone, però, sulla carta stretta dei telefoni non hanno il nome: lì sono solo punti. Sulla pagina di Puglia Digitale, invece, la descrizione dice i soli nomi disegnati a ogni larghezza (L7). Le due carte seguono due regole diverse.
- **Motivazione.**
  - **WCAG 1.1.1: A e B sono entrambe alternative equivalenti.** Lo scopo della carta è mostrare dove sta la rete, e lo dicono le prime due frasi: le regioni da nord a sud e la regione più fitta. I nomi sono esempi («Tra queste»). B non perde informazione:
    - Bari è in Puglia, già detta tra le regioni, nominata come la più fitta e rappresentata da Altamura;
    - Caltagirone è in Sicilia, già detta e rappresentata da Caltanissetta;
    - l'estensione da nord a sud la danno Varese e Caltanissetta, che restano.
  - **Coerenza con ciò che si vede.** Con B ogni nome detto è sulla carta a ogni larghezza: anche chi usa lo screen reader su un telefono, e magari ci vede in parte, ritrova in pagina i nomi che sente. Con A, due nomi su sette mancano sulla carta del telefono.
  - **Coerenza con la L7.** Una regola sola per tutte le carte, generata dagli stessi dati: la classe di larghezza più stretta decide i nomi della descrizione. Regge anche ai cambi dei nomi: con la regola 11 sono passati da 9 a 7, e lo snippet non va toccato.
  - **Lunghezza.** 199 caratteri contro 218. Sono entrambe sotto il tetto di 250, quindi la lunghezza non decide, ma va nella stessa direzione.
  - **Perché la regola della «carta più ricca» non vale più.** Il 2026-10-05 l'avevo motivata così: chi usa uno screen reader riceve almeno quello che vede chi ha la carta più larga. Vale per l'informazione, non per gli esempi. Le regioni e la regione più fitta sono informazione, e B le dice tutte; i nomi in più non aggiungono né una regione né un estremo.
- **Nomi già nel testo del capitolo.** Il testo che segue la carta («Varese, Altamura, Caltanissetta: città diverse, un unico portale.») ripete tre dei cinque nomi. Va bene così, e non vale la soluzione della pagina di Città Digitali (L6).
  - Qui la carta disegna quei nomi, e la descrizione dice ciò che la carta mostra.
  - L'ordine di lettura del capitolo, misurato, è: nome (H3) → statement → carta → legenda → testo → «Esplora Città Digitali». I tre nomi si sentono due volte, non quattro.
- **Proposta.** Filtrare i nomi disegnati a ogni larghezza, cioè `anchor.wide` e `anchor.narrow` diversi da `'none'`: snippet in §3.

## 2. Che cosa cambia
- **A schermo, nulla.** L'HTML della Home è identico allo staging, salvo l'`aria-label` della carta. Le altre pagine sono identiche byte per byte.
- **Per chi usa uno screen reader:** la terza frase dice 5 nomi invece di 7. Prima frase, seconda frase e legenda restano uguali.
- **Le altre descrizioni restano uguali:** `/citta-digitali/` 138 caratteri, `/puglia-digitale/` 222.

## 3. Snippet

Base: commit 3edfc79. Sulla copia `astro check` dà 0 errori, la descrizione della Home è il testo di B (199 caratteri) e `git apply --check` è pulito sul repository. Copia della patch: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ux-home/home-b.patch`.

```diff
diff --git a/src/lib/citta-digitali.ts b/src/lib/citta-digitali.ts
index d10bf50..63f3e55 100644
--- a/src/lib/citta-digitali.ts
+++ b/src/lib/citta-digitali.ts
@@ -2,9 +2,10 @@
  * Text alternatives of the maps with the cities of Città Digitali (WCAG 1.1.1, 1.3.1), built from the
  * same data as the dots: regions north → south, the region with most cities, then the names the map draws.
  * No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
- * Wording: copywriter-brand (L4, L6). «Tra queste» only when the map draws names (narrow maps draw
- * fewer than wide ones, so they are examples). A map that draws none, like the one of /citta-digitali/
- * whose nodes are named by the cards beside it, gets no third sentence (ux-designer, 2026-10-05).
+ * Wording: copywriter-brand (L4, L6, L7). «Tra queste» only when the map draws names, and only the names
+ * drawn at every width, so that each one is on the map on a phone too (ux-designer, 2026-10-06). A map
+ * that draws none, like the one of /citta-digitali/ whose nodes are named by the cards beside it, gets no
+ * third sentence (ux-designer, 2026-10-05).
  */
 import cittaDigitali from '../data/citta-digitali.json';
 
@@ -21,7 +22,7 @@ const inRegion = (r: string) => (r === 'Lazio' ? `nel ${r}` : `in ${r}`);
 /** «la maggior parte» only above half; otherwise «più che altrove» (copywriter-brand, L4). */
 const shareOf = (count: number, total: number) => (count > total / 2 ? 'la maggior parte' : 'più che altrove');
 
-/** `names`: the names the map draws on wide screens, north → south; none for a map without names. */
+/** `names`: the names the map draws at every width, north → south; none for a map without names. */
 export function describeCittaDigitali(names: string[] = []): string {
   const regions = REGIONS.filter((r) => perRegion.has(r));
   const [mostRegion, mostCount] = [...perRegion].sort((a, b) => b[1] - a[1])[0];
diff --git a/src/pages/index.astro b/src/pages/index.astro
index b6467d6..9e6bae7 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -27,8 +27,13 @@ import { describeCittaDigitali } from '../lib/citta-digitali';
 const places = horizonPlaces.map((p) => ({ id: p.id, name: p.name, bearing: bearing(office, p), km: distanceKm(office, p) }));
 const schema = pageGraph('home', [person()], { about: ids.organization });
 
-// Text alternative of the chapter 03 map: the names drawn on wide maps (narrow maps show fewer).
-const mapLabel = describeCittaDigitali([...maps.maps.italia.places].sort((a, b) => b.lat - a.lat).map((p) => p.name));
+// Text alternative of the chapter 03 map: the names drawn at every width, north → south, so that every
+// name said is on the map on a phone too (rule of copywriter-brand L7; ux-designer, 2026-10-06).
+const drawnAtEveryWidth = (p: { anchor?: { wide?: string; narrow?: string } }) =>
+  (['wide', 'narrow'] as const).every((c) => p.anchor?.[c] && p.anchor[c] !== 'none');
+const mapLabel = describeCittaDigitali(
+  [...maps.maps.italia.places].filter(drawnAtEveryWidth).sort((a, b) => b.lat - a.lat).map((p) => p.name),
+);
 ---
 
 <BaseLayout page="home" schema={schema}>
```

- Lo snippet filtra tutte e due le classi, non solo `anchor.narrow`: così regge anche a un nome che, in futuro, fosse disegnato solo sulla carta stretta.
- Il nome della funzione è lo stesso di `src/pages/puglia-digitale.astro`.

## Verdetto di dominio (accessibilità)
**B, conforme a WCAG 2.2 AA come A, e coerente con la regola delle carte.** La regola di `accessibilita.md` §2.8 diventa una sola, «nomi disegnati a ogni larghezza», senza eccezioni (versione 0.8). Il verdetto di gate spetta al creative-director; qui non cambia nulla di visibile.

## Ipotesi da validare
- **Screen reader reali** (NVDA, VoiceOver): la descrizione si legge per intero come nome dell'immagine, poi la legenda. Già tra le ipotesi delle review precedenti. `[DA FORNIRE: dispositivi o servizio di test]`

## Domande aperte
- **copywriter-brand:** nessuna sul testo. La forma resta L4 con «Tra queste:», cambiano solo i nomi.

## Decisioni richieste
- **Sessione principale:** applicare lo snippet di §3, poi la build. Basta il controllo della descrizione: nient'altro cambia.
