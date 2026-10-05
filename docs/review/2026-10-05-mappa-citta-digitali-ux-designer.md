---
titolo: Carta del capitolo 03 con tutte le città di Città Digitali · alternativa testuale e posto dell'elenco completo
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.1
aggiornato: 2026-10-05
fonti: [docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md (P1–P5), docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (L1, L2, L4), docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md (§5), docs/creativa/direzione-visiva.md (versione in corso del 2026-10-05, §1.4 punto-città), docs/strategia/citta-digitali-elenco.md v0.2 (§1, §4), docs/ux/struttura-pagine.md (HM-5, CD-1, CD-2), docs/ux/accessibilita.md (§2.8, §4.2 n. 4), docs/cro/strategia-conversione.md (§4), src/pages/index.astro, src/components/ui/MapItaly.astro, src/data/site.ts, build di prova della proposta UI su http://localhost:4333, staging su http://localhost:4321 (commit 73b041c), prove in pagina con Playwright (Chromium 141) e albero di accessibilità via CDP del 2026-10-05, WCAG 2.2 (1.1.1, 1.3.1, 1.3.2, 2.4.3, 2.4.4, 2.5.3, 2.5.8)]
oggetto: alternativa testuale della carta del capitolo 03 della Home (un punto per ognuna delle 45 città, nomi dove c'è spazio); posto dell'elenco completo; dominio del portale nei documenti UX
---

# Carta del capitolo 03 · alternativa testuale e posto dell'elenco completo

## In sintesi
- **La carta diventa un'immagine con una descrizione** (`role="img"` e `aria-label`), invece di restare `aria-hidden`.
  - Con 45 punti la carta dice una cosa che il testo del capitolo non dice: dove sono le città del portale, e che sono molte più delle tre nominate.
  - La descrizione nasce dagli stessi dati della carta: regioni da nord a sud, la regione con più città, i nomi disegnati sulla carta larga. Niente numeri.
  - La legenda resta una riga in `<figcaption>`: «Ogni punto è una città di Città Digitali», di copywriter-brand (L1). La descrizione comincia con la loro etichetta (L4).
- **L'elenco completo non va nella Home.** Va su `/citta-digitali/`, nella sezione «L'Italia in un unico portale»: un link «Tutte le città sul portale ↗» alla pagina del portale, fonte dell'elenco, nella colonna del testo.
  - Nella Home ogni capitolo ha un solo elemento focalizzabile, la CTA (HM-5 e strategia di conversione §4: «Nessun link esterno»).
- **Niente elenco nascosto di 45 nomi e niente `<details>` nella Home.** I 42 nomi oltre le linee guida sono ancora `[DA VERIFICARE]`, e scriverli in testo è una dichiarazione più forte dei punti (brand-strategist §4).
  - Quando il testo della pagina «Tutte le città» sarà confermato, l'elenco completo potrà stare su `/citta-digitali/`, visibile a tutti, per regione, con fonte e data.
- **Domini allineati.** `sitemap.md` e `struttura-pagine.md` ora dicono cittàdigitali.it, con link `https://xn--cittdigitali-19a.it`. Il dominio senza accento è un progetto omonimo di altri.
- **Provato in pagina.**
  - Nell'albero di accessibilità di Chromium la carta è un'immagine con la descrizione, e i nomi disegnati non vengono letti una seconda volta.
  - Il capitolo resta con un solo elemento focalizzabile.
  - Su `/citta-digitali/` il link ha lo stesso ordine nel DOM e a schermo da 320 a 1440 px, anche con le spaziature di 1.4.12.

## 1. Che cosa dice la carta
| Chi guarda | Che cosa riceve oggi (proposta UI, build su 4333) |
|---|---|
| Chi vede, carta larga (da circa 445 px di finestra) | Molti punti, fitti in Puglia, altri in Sicilia, Campania, Lazio, Calabria e Lombardia; 9 nomi: Varese, Manfredonia, Itri, Bari, Altamura, Massafra, Cosenza, Caltanissetta, Caltagirone; la legenda |
| Chi vede, carta stretta (telefoni) | Gli stessi punti; 5 nomi: Varese, Itri, Altamura, Cosenza, Caltanissetta; la legenda |
| Chi usa uno screen reader | Solo la figura «Un punto per ogni città di Città Digitali». La carta è `aria-hidden`: nessuna indicazione su dove stanno le città, e dei nomi disegnati solo i tre già scritti nel testo del capitolo |

- **Che cosa conta.** Lo scopo della carta è mostrare l'estensione della rete: molte città, dalla Lombardia alla Sicilia, quasi tutte in Puglia. Più alcuni nomi d'esempio. È questo che l'alternativa deve dare (1.1.1: stesso scopo; 1.3.1: l'informazione data dal disegno disponibile anche in testo).
- **Che cosa non conta.** Il numero esatto: chi vede non conta 45 punti, e un numero oggi non si può pubblicare (brand-strategist §4). L'alternativa non lo dice, come la legenda.
- **Equivalenza.** La descrizione nomina le 9 città della carta larga. Chi usa uno screen reader riceve almeno quello che vede chi ha la carta più ricca, e nessun nome che la carta non mostri.

## 2. Opzioni valutate

| Opzione | Accessibilità | Veridicità | Peso e struttura | Esito |
|---|---|---|---|---|
| A. Legenda in `<figcaption>`, carta `aria-hidden` (proposta UI) | Non basta: la legenda dice che cosa sono i punti, non dove stanno né quali città hanno il nome | — | Nessun costo | Si tiene la legenda, si aggiunge B |
| **B. Carta con `role="img"` e descrizione dai dati, legenda corta** | Stesso scopo della carta (1.1.1). Nomi della carta inclusi. Una sola fermata in lettura, nessun elemento focalizzabile in più | Dice solo ciò che i punti e i nomi già mostrano; nessun numero | Circa 0,3 KB di HTML | **Scelta** |
| C. Elenco nascosto (`sr-only`) dei 45 nomi | Dà a chi usa uno screen reader 45 voci da attraversare nel capitolo: più di quanto vede chi guarda, e molto più lungo | Pubblica in testo 42 nomi ancora da verificare | Testo nascosto con molti nomi di luogo: rischio di sembrare riempimento di parole chiave | Scartata |
| D. `<details>` con i 45 nomi nella Home | Accessibile, ma aggiunge un secondo elemento focalizzabile al capitolo | Come C | Un controllo in più nella Home, che deve restare essenziale | Scartata |
| E. Link a «Tutte le città» nella legenda della Home | Accessibile, ma secondo elemento focalizzabile e link esterno nel capitolo (HM-5; strategia di conversione §4) | La fonte è del cliente | Porta via dalla Home verso il portale, in concorrenza con «Esplora Città Digitali» | Scartata nella Home |
| **F. Link a «Tutte le città» su `/citta-digitali/`** | Nome completo con la nuova scheda annunciata; ordine del focus coerente | Rimanda alla fonte del cliente, senza copiare nomi da verificare | Un link nella pagina dove si parla del portale, accanto a «Visita il portale» | **Scelta** |
| G. Elenco completo su `/citta-digitali/`, visibile a tutti | Il migliore, quando i nomi saranno certi | Solo dopo la conferma del testo della pagina, con data (brand-strategist §4) | Circa 0,6 KB con gzip; la sezione oggi è disegnata per 3 città | **Dopo la conferma** |

## 3. Decisione e snippet

### 3.1 Home, capitolo 03: carta come immagine con descrizione
- **Dove.**
  - `src/components/ui/MapItaly.astro`: nuova prop `label`.
  - `src/pages/index.astro`: descrizione costruita dai dati e passata alla carta.
- **Regole.**
  - **Senza `label` la carta resta `aria-hidden`.** Vale per la carta della Puglia (capitolo 02) e per quella di `/citta-digitali/`, i cui luoghi sono nominati nel testo accanto.
  - **Con `label` la carta è un'immagine con un nome.** Le etichette disegnate sono figlie di un'immagine, quindi non vengono lette di nuovo. L'`<svg>` della costa va marcato `aria-hidden`: senza, Chromium lo espone come un'immagine vuota dentro la carta (misurato).
  - **La descrizione si costruisce dagli stessi dati della carta** (`citta-digitali.json` e `maps.json`). Se cambiano l'elenco o i nomi che hanno spazio, la descrizione cambia con loro.
  - **Nessun numero,** finché brand-strategist non lo autorizza (§4). Quando arriverà, entrerà insieme nella legenda e nella descrizione.
  - **Testi.** La legenda (L1) e la prima frase della descrizione (L4) sono di copywriter-brand. Le due frasi su regioni e nomi sono in forma funzionale: copywriter-brand le può rifinire. Come la legenda, la descrizione non dichiara che l'elenco è completo («ogni città»): resta vera anche con 44 punti o con nuove città.
- **Snippet.**
  ```astro
  ---
  // src/components/ui/MapItaly.astro — Props
  /**
   * Text alternative (WCAG 1.1.1). Give it when the map shows something the text beside it does not
   * say (chapter 03: where the cities of Città Digitali are). Without it the map is decorative.
   */
  label?: string;
  ---
  <div
    class:list={['map', `map--${map}`, { /* … */ }, className]}
    style={`aspect-ratio: ${vbW} / ${vbH}`}
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
  >
    <svg class="map__svg" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
  ```
  ```astro
  ---
  // src/pages/index.astro — frontmatter
  import cittaDigitali from '../data/citta-digitali.json';
  import maps from '../data/maps.json';

  // Text alternative of the chapter 03 map (WCAG 1.1.1, 1.3.1), from the same data as the dots and the
  // names: regions north → south, the one with most cities, the names drawn on wide maps (narrow maps
  // show fewer). No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
  const REGIONS = ['Lombardia', 'Lazio', 'Campania', 'Puglia', 'Calabria', 'Sicilia']; // ISTAT order
  const perRegion = new Map<string, number>();
  for (const c of cittaDigitali.citta) perRegion.set(c.region, (perRegion.get(c.region) ?? 0) + 1);
  const unknown = [...perRegion.keys()].filter((r) => !REGIONS.includes(r));
  if (unknown.length) throw new Error(`index.astro: add ${unknown.join(', ')} to REGIONS`);
  const regions = REGIONS.filter((r) => perRegion.has(r));
  const mostCities = [...perRegion].sort((a, b) => b[1] - a[1])[0][0];
  const named = [...maps.maps.italia.places].sort((a, b) => b.lat - a.lat).map((p) => p.name);
  const andList = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}` : (xs[0] ?? ''));
  // First sentence by copywriter-brand (L4); the other two are functional wording they can polish.
  const mapLabel = `Carta d’Italia con le città di Città Digitali. Sono in ${andList(regions)}, la maggior parte in ${mostCities}. Hanno il nome sulla carta ${andList(named)}.`;
  ---
  <figure slot="visual" class="worlds__atlas">
    <MapItaly map="italia" cities label={mapLabel} class="worlds__map" />
    <figcaption class="worlds__atlas-note t-label">Ogni punto è una città di&nbsp;Città&nbsp;Digitali</figcaption>
  </figure>
  ```
  Con i dati di oggi la descrizione è: «Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Hanno il nome sulla carta Varese, Manfredonia, Itri, Bari, Altamura, Massafra, Cosenza, Caltanissetta e Caltagirone.» (255 caratteri).
- **Ordine di lettura del capitolo:** nome (H3) → statement → figura (immagine con la descrizione, poi la legenda) → testo del capitolo → «Esplora Città Digitali».

### 3.2 `/citta-digitali/`, «L'Italia in un unico portale»: link alla fonte dell'elenco
- **Dove.** `src/components/sections/LocationShowcase.astro`, variante `italy`, dentro `.places__copy`, dopo lo statement.
- **Perché lì.**
  - **Ordine.** Nella colonna del testo il link ha lo stesso ordine nel DOM e a schermo a ogni larghezza (provato da 320 a 1440 px). Dopo l'elenco delle città, invece, da 1280 px comparirebbe sopra Caltanissetta, che è posizionata in assoluto per latitudine, e il focus andrebbe al contrario della lettura (2.4.3, 1.3.2).
  - **Pagina giusta.** È la pagina che parla del portale: il link sta accanto a «Visita il portale ↗» della hero. Nella Home la CTA del capitolo porta già qui.
- **Snippet.** Il testo è quello di copywriter-brand per il link al portale (L2, b). Il link sta su `/citta-digitali/`, la pagina dedicata, come vuole la regola della strategia di conversione. `cta_id` e posizione li conferma cro-specialist.
  ```astro
  <p class="places__all">
    <a
      class="places__all-link"
      href="https://xn--cittdigitali-19a.it/tutte-le-citta/"
      target="_blank"
      rel="noopener"
      data-track="outbound_click"
      data-cta-id="cd-portale-tutte-le-citta"
      data-cta-location="portale"
      data-outbound-type="portale"
    >
      Tutte le città sul portale<span class="sr-only"> Città Digitali (si apre in una nuova scheda)</span>
      <Arrow dir="external" />
    </a>
  </p>
  <style>
    /* Standalone link: the same comfortable target as the «Esplora» CTAs (44 px). */
    .places__all-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      min-height: var(--tap-min);
      font-weight: var(--fw-strong);
    }
  </style>
  ```
  - **Nome accessibile:** «Tutte le città sul portale Città Digitali (si apre in una nuova scheda)». Inizia con il testo visibile (2.5.3) ed è unico nella pagina (2.4.4).
  - **Link:** in punycode, come in `site.ts`. Indirizzo esatto della pagina `[DA VERIFICARE: da una rete che raggiunge il portale]`; viene dall'indice di ricerca.
- **Dopo la conferma del testo** di «Tutte le città» (brand-strategist §4), l'elenco può arrivare anche sul sito, nel formato di seo-content (§5):
  - un solo elenco, qui o subito dopo, visibile a tutti;
  - per regione, con i nomi ufficiali e la sigla della provincia;
  - link solo agli indirizzi verificati;
  - fonte e data, con gli stessi dati della carta;
  - eventualmente in un `<details>` «Tutte le città del portale».

  La sezione andrà ridisegnata per un elenco lungo (ui-designer, creative-director). Le tre città con la loro scheda restano gli esempi in evidenza.

### 3.3 Risposte a copywriter-brand (L2, L4)
- **Carta `aria-hidden` con un link, oppure `role="img"` con l'etichetta di L4?** `role="img"`. La loro etichetta è la prima frase della descrizione, ma da sola non basta. Dice che cosa rappresenta la carta, non dove stanno le città né quali hanno il nome: chi usa uno screen reader avrebbe meno di chi guarda (1.1.1). Un link all'elenco non sostituisce l'alternativa della carta, perché porta altrove.
- **Link nella Home, interno (a) o esterno (b)?** Nessuno dei due nel capitolo.
  - Il capitolo resta con una sola CTA, come i capitoli 01 e 02 (HM-5; `accessibilita.md` §4.2 n. 4).
  - La CTA «Esplora Città Digitali» porta già alla pagina in cui sta, o starà, l'elenco: nella prima sezione dopo la hero.
  - Quando l'elenco sarà su `/citta-digitali/`, un link interno nella legenda sarebbe accessibile, con nome diverso dalla CTA. Per coerenza tra i tre capitoli lo sconsiglio comunque; se il creative-director lo vuole, va bene per l'accessibilità.
- **Dove sta l'elenco, e con quale ancora?** Su `/citta-digitali/`, in «L'Italia in un unico portale» (`#portale`). Oggi c'è il link alla fonte (§3.2), poi l'elenco nel formato di seo-content.
- **Link al portale:** su `/citta-digitali/`, con il loro testo di L2 (b).

### 3.4 Rispetto alla direzione visiva in corso (§1.4, punto-città)
- **«La carta resta `aria-hidden`; legenda ed elenco in testo danno a tutti la stessa informazione.»** Per l'accessibilità non basta.
  - La legenda dice che cosa è un punto, non dove stanno i punti né quali città hanno il nome.
  - L'elenco in testo starà su un'altra pagina e uscirà solo dopo la conferma del testo del portale.
  - Nella Home, quindi, chi usa uno screen reader non riceverebbe l'informazione della carta (1.1.1, 1.3.1; soglia 2).
  - La descrizione di §3.1 non cambia nulla di visivo: punti, nomi, legenda e ritmo del capitolo restano quelli decisi. Chiedo al creative-director di allineare la frase del §1.4: «La carta è un'immagine con una descrizione costruita dagli stessi dati; legenda ed elenco in testo completano l'informazione».
- **«Elenco in testo: dove, lo decide ux-designer.»**
  - Su `/citta-digitali/`, nella sezione «L'Italia in un unico portale» (`#portale`), visibile a tutti.
  - Criteri della direzione visiva, che coincidono con quelli di seo-content: per regione da nord a sud, città in ordine alfabetico con nome ufficiale e sigla della provincia, stesso file dati della carta, link solo verificati, fonte e data, pubblicazione dopo la conferma del testo.
  - Fino ad allora, il link alla pagina del portale di §3.2.
- **«Niente seconda CTA» nella legenda.** È in linea con la mia scelta: nessun link nel capitolo della Home (§3.3).

## 4. Prove in pagina
CSS e attributi iniettati con Playwright, senza toccare `src/`. Capitolo 03 sulla build di prova della proposta UI (4333); `/citta-digitali/` sullo staging (4321), che ha già il dominio corretto.

| Prova | Esito |
|---|---|
| Albero di accessibilità di Chromium (CDP), capitolo 03 con `role="img"`, descrizione finale e legenda L1, a 390 e 1440 px | La carta è un nodo `image` con la descrizione (255 caratteri). Senza `aria-hidden`, l'`<svg>` della costa compariva come immagine vuota dentro la carta; con `aria-hidden` sparisce. La legenda sta su una riga (350 e 480 px). **Precisazione del 2026-10-05, sulla build:** nell'albero interno di CDP i nomi disegnati compaiono ancora come testo sotto l'immagine. Chromium però espone `role="img"` come foglia alle API di accessibilità, quindi i nomi non arrivano allo screen reader (`docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md` §3.5) |
| Figura | Contiene l'immagine e la `<figcaption>`; Chromium espone la didascalia come contenuto, quindi la legenda si legge una volta |
| Elementi focalizzabili nel capitolo | Uno solo, «Esplora Città Digitali», a 390 e 1440 px |
| Link «Tutte le città» nella colonna del testo, a 320, 390, 768, 1024, 1280 e 1440 px, con e senza le spaziature di 1.4.12 | Ordine del focus uguale all'ordine visivo, prima delle tre «Esplora»; nessuno scorrimento orizzontale; nome unico nella pagina |
| Stesso link messo dopo l'elenco delle città | A 1440 px compare 1.500 px sopra la fine dell'ultima città: ordine visivo diverso dal DOM. **Scartato** |

## 5. Veridicità, peso e altre note
- **Veridicità.**
  - La descrizione dice solo ciò che i punti e i nomi disegnati già mostrano: regioni, la Puglia come regione più fitta, i nomi della carta.
  - I nomi oltre Varese, Altamura e Caltanissetta compaiono nella descrizione solo se il creative-director li tiene sulla carta. Brand-strategist (§4) raccomanda le sole tre città delle linee guida fino alla conferma del testo: la descrizione segue automaticamente quella scelta.
- **Peso.** Circa 0,3 KB di HTML nella Home e 0,4 KB su `/citta-digitali/`, prima della compressione; nessun JavaScript.
- **Contrasto e uso del colore** (dalla proposta UI, verificati sui valori):
  - i punti in `terra` su `pietra` hanno 4,09:1, sopra il 3:1 della grafica che serve a capire (1.4.11);
  - punti e nodi con nome si distinguono anche per la misura, non solo per il colore (1.4.1).
- **Build di prova su 4333.** È costruita da una copia precedente alla correzione del dominio: i link al portale sono ancora `https://www.cittadigitali.it`. Va ricostruita prima delle misure finali. Il codice in `src/` e lo staging su 4321 sono già corretti.

## 6. Documenti UX allineati
- **`docs/ux/sitemap.md` (v0.2):** portali del footer «cittàdigitali.it ↗», con link `https://xn--cittdigitali-19a.it`, più la nota sull'omonimo senza accento.
- **`docs/ux/struttura-pagine.md` (v0.4):**
  - CD-1: CTA della hero verso cittàdigitali.it (punycode nel link);
  - HM-5: carta del capitolo 03 con alternativa testuale;
  - CD-2: link alla fonte dell'elenco e regola per l'elenco completo.
- **`docs/ux/accessibilita.md` (v0.4), §2.8:** regola per le carte, decorative oppure con alternativa testuale.

## Verdetto di dominio (accessibilità)
**Conforme a WCAG 2.2 AA, a una condizione: la carta del capitolo 03 esce con l'alternativa testuale di §3.1.** Con 45 punti e la carta `aria-hidden`, come nella proposta UI e nella direzione visiva in corso, l'informazione nuova sarebbe solo visiva: inadempienza di 1.1.1 e 1.3.1. La condizione non cambia nulla di visivo. Il link di §3.2 è consigliato e non bloccante: rende raggiungibile a tutti l'elenco completo dalla fonte del cliente. Il verdetto di gate spetta al creative-director, che decide anche la proposta di mappa.

## Ipotesi da validare
- **Screen reader reali** (NVDA e VoiceOver): la descrizione di 255 caratteri si legge per intero come nome dell'immagine, e la figura con legenda non la ripete. `[DA FORNIRE: dispositivi o servizio di test]`
- I nomi della pagina «Tutte le città» sono quelli letti da brand-strategist (`citta-digitali-elenco.md` §1): fino al testo della pagina restano `[DA VERIFICARE]`, sulla carta e nella descrizione.

## Domande aperte
- **copywriter-brand:** rifinitura delle due frasi della descrizione su regioni e nomi (§3.1). Legenda (L1), etichetta (L4) e testo del link (L2, b) sono adottati.
- **creative-director:** quali nomi sulla carta prima della conferma del testo (tutti e 9, oppure solo i 3 delle linee guida come raccomanda brand-strategist); la descrizione segue.
- **cro-specialist:** `cta_id` e posizione del link in uscita su `/citta-digitali/`. È in linea con la regola «i portali stanno nelle pagine dedicate»; nella Home nessun link in più.
- **ui-designer:** resa del link nella colonna del testo; ridisegno della sezione per l'elenco completo, quando ci sarà.

## Decisioni richieste
- **Sessione principale:** applicare §3.1 insieme alla proposta di mappa (prop `label`, `svg` `aria-hidden`, descrizione dai dati) e §3.2 su `/citta-digitali/`.
- **creative-director:**
  - nomi sulla carta prima della conferma del testo;
  - posto del link (colonna del testo, consigliato);
  - allineare la frase sul comportamento della carta nella direzione visiva §1.4 (§3.4).
- **brand-strategist:** quando si può pubblicare l'elenco completo su `/citta-digitali/`, e con quale data.
