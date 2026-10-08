---
titolo: Schede di /citta-digitali/ con le spaziature dell'utente (WCAG 1.4.12) · verdetto sull'impaginato
owner: creative-director
contributi: []
stato: in revisione
versione: 1.1
aggiornato: 2026-10-08
fonti: [richieste della sessione principale del 2026-10-08 (conferma dell'impaginato della patch B; poi B o B2 e a capo del nome lungo), commit 474e2df (patch B), 21faf34 e 0da39e4, docs/review/2026-10-08-carta-citta-digitali-nomi-ux-designer.md (1.2, §6 e §7), docs/review/2026-10-08-carta-citta-digitali-nomi-ui-designer.md (§2.2, patch B), docs/review/2026-10-08-schede-citta-digitali-1412-in-build-ui-designer.md (§4, §5 e §7, variante B2), docs/ux/accessibilita.md (0.13, riga «Spaziatura del testo» e §4.3), docs/ui/design-system.md (0.15, §3.8), docs/creativa/direzione-visiva.md (0.17, §1.4 regola 9, §3.2, §7.6), staging http://127.0.0.1:4321 (build di 474e2df), build di prima della patch http://127.0.0.1:4360, build B2 di ui-designer http://127.0.0.1:4381, catture della sessione principale (scratchpad/b-main/) e di ui-designer (scratchpad/ui-1412b/shots/), copie della HEAD con B2 ed E e con B2, E e M (build in locale, porte 4391 e 4392), prove del creative-director con Playwright 1.56, Chromium 141, axe-core 4.13 e sharp (scratchpad/cd-1412/), risultati di ricerca sulla sillabazione delle parole con la maiuscola (2026-10-08, sotto); per la 1.1: commit d5ad7b0 (B2 ed E), 884a042 (ux-designer, review 1.3), aef5d32 (ui-designer, review 0.2, design system 0.16), ae91aa2 (M) e 4b8778a (design system 0.17, review 0.3)]
oggetto: sezione «L'Italia in un unico portale» di /citta-digitali/ da 1280 px, con le spaziature del testo dell'utente
---

# Schede di `/citta-digitali/` con le spaziature dell'utente

**Richiesta** (sessione principale, 2026-10-08, Fase 5). Con le spaziature del testo di WCAG 1.4.12 le schede delle città tornano nel flusso (patch B, nel sito dal commit 474e2df). Mi si chiede:
- se l'impaginato va bene con la B o con la variante B2 di ui-designer;
- come deve andare a capo un nome lungo («Caltaniss / etta»);
- se serve, la direzione visiva 0.18.

Il mio sì alla B2 era condizionato a quello di ux-designer: è arrivato nel commit 0da39e4.

**Base delle prove.**
- **Build:** B sullo staging (4321), B2 di ui-designer (4381), e due copie mie della HEAD:
  - B2 con «Esplora» a capo (E), sulla porta 4391;
  - B2 con E e l'aria minima (M), sulla porta 4392.
- **Metodo.** Playwright 1.56 e Chromium 141, con il movimento ridotto. Le letture si ripetono finché due coincidono. Le spaziature sono quelle di `accessibilita.md` §4.3.
- **Geometria visibile:** le righe di testo di nome, regione e descrizione, «Esplora», i filetti, la carta e la sezione. Le larghezze dei paragrafi, che non si vedono, sono escluse.
- **Vincoli rispettati.** Non ho toccato `src/`, `design-system.md` né `accessibilita.md`, e non ho committato. Le patch sono nello scratchpad.

## In sintesi

| # | Domanda | Decisione |
|---|---|---|
| 1 | Impaginato con le spaziature: B o B2 | **B2.** Varese e Altamura restano al loro nodo, scende solo Caltanissetta, e la sezione tiene la sua aria. Sostituisce la B prima del go-live |
| 2 | «Caltaniss / etta» | **Né accettarlo né `hyphens: auto`.** «Esplora» va a capo sotto il nome solo quando il nome non gli sta accanto (variante E). Il nome resta intero. Senza spaziature non cambia nulla, nemmeno un pixel |
| 3 | Filetto a 3 px dal testo, se una descrizione si allunga (nota di ux-designer) | **[SUGGERIMENTO]** Un margine minimo sotto le descrizioni (M). Con le spaziature dell'utente viene sostituito dal suo, quindi non si somma. Con i testi di oggi non cambia nulla |
| 4 | Direzione visiva | **0.18**: §1.4 regola 9, §3.2 «A capo», §7.6 riga 3, ipotesi e decisioni |

**Verdetto: approvato con modifiche.** B2 ed E vanno applicate insieme, prima del go-live. M è facoltativa.

**Stato (versione 1.1).** Tutto applicato e verificato: B2 ed E nel commit d5ad7b0, M nel commit ae91aa2. Dettagli nel §5 e in fondo.

## 1. Impaginato con le spaziature: la B2 (decisione)

**Che cosa ho guardato.**
- Le catture della sessione principale a 1280 e 1920 px, prima e dopo la B, con e senza spaziature.
- Le coppie B / B2 di ui-designer, compresa quella con 4 parole in più.
- Le mie catture di B, B2 e B2 con E a 1280, 1440 e 1920 px, nella stessa posizione di scorrimento.

**Misure con le spaziature**, nelle mie sonde. B: 67 finestre da 1280 a 1920 px. B2 ed E: 257 finestre da 1280 a 2560 px, ogni 5.

| | B (nel sito) | B2 | B2 + E |
|---|---|---|---|
| Varese sotto il suo nodo | 11–29 px | 0 | 0 |
| Altamura sotto il suo nodo | 50–135 px | 0 | 0 |
| Caltanissetta sotto il suo nodo | 77–215 px | 12–80 px | 12–51 px |
| Aria sotto l'ultima scheda | 17–24 px | 145–187 px | 145–187 px |
| «Caltanissetta» | su 2 righe, spezzato | su 2 righe, spezzato | su 1 riga |
| Tra il testo di una scheda e la successiva | almeno 42,9 px | almeno 42,9 px | almeno 42,9 px |

| Finestra | Caltanissetta sotto il nodo: B · B2 · E | Aria in fondo: B · B2 ed E |
|---|---|---|
| 1280 | 215 · 80 · 51 px | 18 · 145 px |
| 1440 | 131 · 32 · 32 | 22 · 157 |
| 1600 | 77 · 12 · 12 | 22 · 168 |
| 1920 | 132 · 27 · 27 | 17 · 187 |

**Perché la B2.**
- **La latitudine è il gesto della sezione.** Le Coordinate (§1.4) dicono che le città stanno dove stanno. Con la B, chi usa le spaziature lo perde per tutte e tre le schede, anche dove non serve. Con la B2 resta per Varese e Altamura, e Caltanissetta scende solo di quanto le serve per non essere coperta. È la regola giusta per ogni allineamento a una quota: **si sposta solo ciò che deve spostarsi.**
- **L'aria in fondo è composizione, non avanzo.** Con la B sotto l'ultima scheda restano 17–24 px, contro i 133–173 px della stessa sezione senza spaziature (ui-designer, §2): la sezione sembra tagliata. Ed è fragile, come hanno misurato ui-designer e ux-designer: con 4 parole in più il testo esce dalla sezione, chiaro su chiaro.
- **Senza spaziature non cambia nulla.** ui-designer e ux-designer hanno misurato la B2 identica alla B pixel per pixel. Le mie sonde lo confermano.

**Costi accettati.**
- La formula dipende dalla carta sulle colonne 7 / −1. È scritta nel componente e nel design system.
- Senza unità di contenitore (Safari prima della 16, Firefox prima della 110) le schede si impilano dall'alto, senza latitudine. Il ripiego è accessibile (ux-designer), ma in quel caso i filetti toccano il testo, a 3 px. Il suggerimento del §3 lo risolve.
- Il mio «va bene» alla patch B, dato in precedenza, è superato dalla B2.

## 2. [IMPORTANTE] Il nome lungo: va a capo «Esplora», non il nome (variante E)

- **Dove.** `src/components/sections/LocationShowcase.astro`, variante `italy`, regole da 80em: `.city`, `.city__name`, `.city__cta`, `.city__meta`, `.city__line`.
- **Problema.** Con le spaziature, «Caltanissetta» si spezza dentro la parola, senza trattino. Diventa «Caltaniss / etta» a 1280 e 1920 px e «Caltanisse / tta» a 1366 e 1440. È un titolo in `display-m`: a quel corpo, la seconda riga si legge come una parola a sé.
  - A 1280 px la parola intera chiede circa 434 px. La colonna accanto a «Esplora» ne dà 337,7, la scheda intera 481 (misure di ui-designer e mie).
- **Motivazione.**
  - **Le spaziature le usa chi fa fatica a leggere:** persone con dislessia o con una vista bassa. Una parola spezzata senza trattino è proprio l'ostacolo che le spaziature vogliono togliere. La soglia è rispettata, perché non si perde nulla, ma il risultato è il peggiore per chi ne ha più bisogno.
  - **Nella tipografia editoriale italiana** i titoli non si dividono, e i nomi propri ancora meno. La direzione visiva lo dice già (§3.2): «nessuna sillabazione automatica nei titoli».
  - **Craft.** È l'unico punto della sezione che, con le spaziature, sembra un errore.
- **Le strade, e perché scelgo la quarta.**
  1. **Accettare** (consiglio di ui-designer). Conforme, ma lascia il problema a chi ha più bisogno di leggere bene.
  2. **`hyphens: auto`.** No, per quattro motivi:
     - va contro la regola del §3.2;
     - qui non è verificabile, perché questo Chromium non ha i dizionari;
     - sulle parole con la maiuscola i browser non danno garanzie. Firefox dalla versione 68 non le sillaba, salvo lingue come il tedesco, e lo stesso è stato discusso per WebKit e Chromium (fonti in fondo, `[DA VERIFICARE]`);
     - quando funziona, il nome resta comunque diviso.
     Lo stesso vale per un trattino morbido scritto nel nome (`&shy;`): è sillabazione anche quello, e in più mette un carattere nel testo dell'H3.
  3. **«Esplora» sotto il testo per tutti.** No: cambierebbe l'impaginato di tutti, e toglierebbe la colonna di «Esplora» a destra.
  4. **«Esplora» va sotto il nome solo quando il nome non gli sta accanto (variante E).** Sì.
- **Come funziona.**
  - Da 80em la scheda passa dalla griglia a due colonne a un flex che va a capo.
  - Il nome viene per primo, poi «Esplora» spinto a destra (`margin-inline-start: auto`). Regione e descrizione seguono, ognuna su una riga sua.
  - Quando nome e «Esplora» stanno su una riga, è l'impaginato di oggi: senza spaziature succede sempre.
  - Quando non ci stanno, «Esplora» va sotto il nome, sempre sul bordo destro, e il nome prende tutta la scheda.
  - Se il nome non sta nemmeno nella scheda intera, resta la rete `overflow-wrap` di tutti i titoli (A5).
  - L'ordine nel DOM non cambia.
- **«Esplora» a destra, non a sinistra.** Ho provato le due versioni, in `scratchpad/cd-1412/u-1280.png` e `u-1920.png`: B, B2, E a destra, E a sinistra.
  - **A destra** «Esplora» resta nella colonna delle azioni delle altre due schede: l'occhio e il puntatore lo trovano dove l'hanno appena trovato. E sul lato sinistro della scheda nome, regione e descrizione restano in fila, senza niente in mezzo.
  - **A sinistra** il link starebbe tra il nome e le sue coordinate, e romperebbe la colonna di destra.
- **Prove sul codice vero** (copia della HEAD con B2 ed E, porta 4391):

| Prova | Esito |
|---|---|
| Senza spaziature, 449 finestre da 320 a 2560 px, ogni 5 | identica alla B2: 0 px su 43.802 valori |
| Senza spaziature, caratteri predefiniti a 20 e 24 px, 97 finestre da 1600 a 2560 px | identica alla B2: 0 px |
| Pagine intere al pixel: `/citta-digitali/` a 1280, 1440 e 1920 px, `/puglia-digitale/` a 1440 | 0 pixel diversi. A 1920 px una prima cattura dava 7.731 pixel diversi nel titolo fermo di «Dal locale al nazionale», fuori dalla sezione; ripetuta due volte, 0 |
| Con le spaziature, sotto i 1280 px (192 finestre) | identica alla B2: 0 px su 19.604 valori |
| Con le spaziature, 257 finestre da 1280 a 2560 px | «Caltanissetta» su una riga in tutte. «Esplora» va sotto il nome solo lì; Varese e Altamura restano accanto al loro, ad almeno 64,9 px. Nessuna sovrapposizione, nessuno scorrimento orizzontale. Tra le schede almeno 42,9 px, in fondo 145–187 px |
| Con le spaziature e i caratteri a 20 e 24 px, da 1600 a 2560 px | nome intero, nessuna sovrapposizione, 181–262 px in fondo |
| Margine del nome intero dentro la scheda | almeno 4,1 px (a 1970 px, dove il corpo arriva al massimo, 76 px); 3,4 px a 2560 px con i caratteri a 20 px |
| axe-core 4.13 | 0 violazioni a 390, 1280 e 1440 px, e con le spaziature a 1280 e 1920 |
| `astro check` e pesi | 0 errori e 0 avvisi. Cambia solo il CSS del componente su `/citta-digitali/` e `/puglia-digitale/`: −8 byte, ±33 con Brotli. La Home è identica |

- **Un effetto in più, con le spaziature.** Tra 1280 e circa 1430 px la descrizione di una scheda prende la sua misura di 34ch, invece della colonna rimasta accanto a «Esplora» (354–413 px).
  - Con i testi di oggi, senza spaziature, non cambia nessuna riga.
  - Con le spaziature, a 1280–1330 px, Varese e Altamura perdono una riga: per questo Caltanissetta scende di 51 px invece che di 80.
  - Una descrizione futura più lunga andrebbe a capo a 34ch, la misura che il design system dichiara già per `.city__line`. Va bene.
- **Da confermare** (non decido io):
  - **ux-designer**, per 1.4.12, 1.3.2 e 2.4.3. Con le spaziature l'ordine a schermo di Caltanissetta è nome, «Esplora», regione, descrizione; nel DOM «Esplora» è ultimo. È lo stesso scarto di oggi, dove «Esplora» sta già sulla prima riga. Il link è l'unica fermata della scheda, quindi il Tab non cambia, e nemmeno il bersaglio (44 px) e la fascia che accende il nodo.
  - **ui-designer**, per la fedeltà e il design system (§3.8).
- **Se una delle due verifiche trova un problema**, si toglie E e si torna alla strada 1, mai alla 2.
- **Patch:** `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/cd-1412/diff/citta-digitali-schede-esplora-a-capo.patch`. Si applica dopo la B2 (blob di partenza `782a040`); il testo è nel paragrafo «Patch».

## 3. [SUGGERIMENTO] Aria minima tra una scheda e la successiva (M)

- **Dove.** Stesse regole da 80em: `.city:not(:last-child) .city__line`.
- **Problema** (nota di ux-designer, review 1.2 §7). Senza spaziature, con 16 parole in più nella descrizione di Altamura, il filetto della scheda dopo arriva a 3 px dall'ultima riga; con 8 parole, a 6,1 px. Succede con la B, con la B2 e con E.
  - Succede anche nel ripiego senza unità di contenitore, con i testi di oggi: le schede si impilano a 3 px.
- **Motivazione.** Non è un problema di accessibilità, perché nulla si copre. Ma un filetto che tocca il testo è un difetto di composizione: il filetto apre la scheda dopo e deve avere aria sopra.
- **Proposta.** Da 80em, un margine di `--space-m` sotto la descrizione di ogni scheda tranne l'ultima.
  - Finché il testo sta nella sua fascia di latitudine, il margine è assorbito dall'altezza minima della scheda e non sposta nulla.
  - Con le spaziature dell'utente la sua regola sui paragrafi (`margin-bottom: 2em !important`) lo sostituisce, quindi non si somma: l'aria resta la sua.
- **Prove** (copia con B2, E e M, porta 4392).

  | Prova | Esito |
  |---|---|
  | Testi di oggi, 449 finestre da 320 a 2560 px | identica a E: 0 px senza spaziature (43.802 valori), 0 px con le spaziature (45.818 valori) |
  | +8 e +16 parole ad Altamura, senza spaziature | 27 px tra l'ultima riga e il filetto, invece di 6,1 e 3 |
  | +16 parole ad Altamura o a Caltanissetta, con le spaziature | nessuna sovrapposizione; almeno 42,9 px tra le schede, 145–187 px in fondo |
  | Ripiego senza unità di contenitore, emulato | 27 px tra le schede invece di 3: si legge come un elenco ordinato (`scratchpad/cd-1412/shots/nocq-1440.png`) |
  | axe-core 4.13, `astro check` | 0 violazioni; 0 errori e 0 avvisi |

- **Rapporto con il suggerimento di ux-designer** (`@supports not (width: 1cqw)`, elenco come tra 1024 e 1279 px). Le due proposte sono compatibili. M è una regola sola e copre anche i testi lunghi; l'elenco darebbe al ripiego 48 px invece di 24. Decide ui-designer.
- **Patch:** `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/cd-1412/diff/citta-digitali-schede-aria-minima.patch`, da applicare dopo E.

## 4. Che cosa funziona, e va protetto

- **Senza spaziature l'impaginato è quello approvato:** i filetti 1,2rem sopra i nodi, il vuoto sotto Varese come distanza vera fino ad Altamura, Caltanissetta che scende nella riserva in fondo. Nessuna delle tre patch lo tocca.
- **I nomi accanto ai nodi** (426e6dc) tengono il legame tra scheda e nodo anche quando una scheda scende.
- **La colonna di «Esplora» a destra.** È il punto in cui le tre schede si allineano come azioni.
- **L'ordine da nord a sud**, uguale a schermo, nel DOM e nel Tab, a ogni larghezza.

## 5. Stato delle review di dominio

- **ux-designer** (accessibilità): B2 sì (0da39e4). E conforme a 1.3.2, 1.4.12 e 2.4.3, parere favorevole su M (884a042, review 1.3).
- **ui-designer** (UI): B fedele alla patch, B2 proposta e consigliata (21faf34). Fedeltà di E confermata, M adottata senza il ripiego `@supports`, design system 0.16 (aef5d32, review 0.2). M registrata come applicata nel design system 0.17 (4b8778a, review 0.3).

## 6. Verdetto

**Approvato con modifiche.**
- **B2: approvata per l'impaginato.** La condizione, il sì di ux-designer, c'è. Sostituisce la B prima del go-live.
- **E: da applicare con la B2**, nello stesso passaggio e con la stessa prova sullo staging. Senza spaziature non cambia nulla, quindi può entrare subito nell'anteprima. ux-designer e ui-designer la verificano sullo staging: se trovano un problema, si toglie E e resta l'a capo di oggi.
- **M: facoltativa**, se ui-designer la adotta.
- Il G4 resta approvato con le sue condizioni. Questo verdetto non le cambia.

## Patch da applicare (sessione principale)

**Applicate:** B2 ed E nel commit d5ad7b0, M nel commit ae91aa2. Senza spaziature la pagina è identica: geometria da 320 a 2560 px, pixel a 390, 1024, 1280, 1440, 1920 e 2560 px (verifiche della sessione principale).

In quest'ordine, sulla HEAD 0da39e4. Ho controllato che le tre si applichino in fila (`git apply --check`) e che diano esattamente il file provato.
1. **B2** di ui-designer: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/diff/citta-digitali-schede-1412-b2.patch`.
2. **E**, «Esplora» a capo: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/cd-1412/diff/citta-digitali-schede-esplora-a-capo.patch`.
3. **M**, aria minima, se adottata: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/cd-1412/diff/citta-digitali-schede-aria-minima.patch`.

Al posto di 2 e 3 si può usare la patch unica `…/cd-1412/diff/citta-digitali-schede-esplora-e-aria.patch`, che dà lo stesso file. Le sonde per ripetere le prove sullo staging sono in `…/cd-1412/`: `probe-a.mjs`, `probe-p.mjs`, `cmpv.mjs`, `sum.mjs` e `axe-e.mjs`.

E e M insieme, sopra la B2:

```diff
diff --git a/src/components/sections/LocationShowcase.astro b/src/components/sections/LocationShowcase.astro
index 782a040..f35ceb7 100644
--- a/src/components/sections/LocationShowcase.astro
+++ b/src/components/sections/LocationShowcase.astro
@@ -546,12 +546,17 @@ const listStyle = [
       top: 100%;
     }
 
+    /* The name and «Esplora» share the first line, «Esplora» at the right edge. When the name does not fit
+       beside it (WCAG 1.4.12 text spacing, a longer name), «Esplora» wraps under the name, still at the right
+       edge, and the name takes the whole card instead of breaking inside the word. Region and text follow on
+       lines of their own. Without text spacing nothing moves (creative-director, 2026-10-08). */
     .city {
       min-height: calc(var(--to-next, 0) * var(--map-h) / 100);
-      grid-template-columns: minmax(0, 1fr) auto;
+      display: flex;
+      flex-wrap: wrap;
       column-gap: var(--space-m);
       align-items: baseline;
-      align-content: start;
+      align-content: flex-start;
     }
 
     /* The last city may hang below the map into the section's bottom air (93–102 px today), as far as
@@ -560,20 +565,27 @@ const listStyle = [
       margin-bottom: calc(-1 * var(--space-4xl));
     }
 
-    /* A long name breaks inside its column (WCAG 1.4.12) instead of running under «Esplora». */
+    /* A name wider than the whole card still breaks inside it: the titles' safety net (overflow-wrap). */
     .city__name {
+      order: 1;
       max-width: 100%;
     }
 
-    .city__name,
+    .city__cta {
+      order: 2;
+      margin-inline-start: auto;
+    }
+
     .city__meta,
     .city__line {
-      grid-column: 1;
+      order: 3;
+      flex-basis: 100%;
     }
 
-    .city__cta {
-      grid-column: 2;
-      grid-row: 1;
+    /* At least --space-m between a city's last line and the next city's rule, should a text outgrow its
+       latitude band. User text spacing (WCAG 1.4.12) replaces it with its own paragraph spacing. */
+    .city:not(:last-child) .city__line {
+      margin-bottom: var(--space-m);
     }
   }
```

**Immagini** (in `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/cd-1412/`):
- con le spaziature, B, B2 e B2 con E: `shots/cmp-1280-1412.png`, `shots/cmp-1440-1412.png`, `shots/cmp-1920-1412.png`;
- «Esplora» a destra e a sinistra: `u-1280.png` e `u-1920.png` (B, B2, E a destra, E a sinistra);
- ripiego senza unità di contenitore, E ed E con M: `shots/nocq-1440.png`.

## Ipotesi da validare

- **Browser.** Le misure sono in Chromium 141. In Safari e Firefox, con e senza spaziature, vanno riprovati `[DA VERIFICARE]`:
  - le unità di contenitore della B2;
  - l'a capo di «Esplora» con l'allineamento sulla linea di base;
  - il nome intero. Da 1970 px lascia solo 4,1 px dentro la scheda. Se un browser lo disegna più largo, scatta la rete di oggi, e l'a capo potrebbe lasciare una o due lettere sulla seconda riga.
- **Sillabazione delle parole con la maiuscola.** I comportamenti di Firefox, WebKit e Chromium vengono dai riassunti di una ricerca del 2026-10-08. Le pagine non sono raggiungibili da questo ambiente (DNS) `[DA VERIFICARE]`. Non cambia la decisione, che poggia sulla regola del §3.2:
  - [WebKit Bugzilla 197889, nomi propri e `hyphens: auto`](https://bugs.webkit.org/show_bug.cgi?id=197889);
  - [CSS WG, public-css-archive, maggio 2019](https://lists.w3.org/Archives/Public/public-css-archive/2019May/0317.html) e [la risposta del maggio 2019](https://lists.w3.org/Archives/Public/public-css-archive/2019May/0348.html);
  - [public-css-archive, aprile 2022](https://lists.w3.org/Archives/Public/public-css-archive/2022Apr/0413.html);
  - [QuirksMode, test di `hyphens: auto` (2023)](https://quirksmode.org/booktests/css-is-fantastisch.html).
- **Testi più lunghi.** Le prove con 4–32 parole in più sono casi di prova, non testi previsti.

## Domande aperte

- **Chiuse:**
  - ux-designer: E conforme a 1.3.2, 1.4.12 e 2.4.3, M favorevole (884a042);
  - ui-designer: fedeltà di E confermata, M adottata al posto del ripiego con `@supports` (aef5d32).
- Nessuna domanda per il cliente.

## Decisioni richieste

- **Chiuse:**
  - sessione principale: B2 ed E applicate in d5ad7b0, M in ae91aa2, con le prove sullo staging;
  - ux-designer e ui-designer: verifiche di E e M (884a042, aef5d32).
- **Aperta, non bloccante:** la prova delle schede con le spaziature in Safari e Firefox (Ipotesi da validare).
- **Utente:** nessuna decisione nuova. La direzione visiva, ora alla 0.19, resta da approvare con le altre (DV, Decisioni richieste, punto 5).
