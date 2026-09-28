---
titolo: Review di accessibilità e usabilità del sito costruito
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [http://localhost:4321/ (build del 2026-09-28, commit 05b9b16), src/, docs/ux/accessibilita.md, docs/ux/struttura-pagine.md, docs/ux/sitemap.md, docs/contenuti/microcopy.md, docs/review/2026-09-28-sito-bozze-copywriter-content.md, docs/review/2026-09-28-sito-conversione-cro-specialist.md, CLAUDE.md]
oggetto: WCAG 2.2 AA e usabilità di /, /siii/, /puglia-digitale/, /citta-digitali/, /contatti/, /privacy-policy/, /cookie-policy/, /404.html
---

# Review di accessibilità e usabilità · sito costruito (Fase 5)

## In sintesi
- Il sito è solido: ordine del focus, focus visibile, header sticky, menu, form, tabella, movimento e nuove schede funzionano come previsto.
- Due difetti WCAG AA, piccoli ma reali, **bloccano il G4**:
  - A1: le didascalie dei punti caldi non rispettano 1.4.13.
  - A2: i numeri delle statistiche vengono tagliati con la spaziatura del testo (1.4.12).

  Le correzioni sono di poche righe e le ho già provate in pagina.
- Restano le **condizioni di go-live** già note (A3): video senza sottotitoli né descrizione, segnaposto degli asset, endpoint del form.
- Chiudo anche le decisioni che copywriter-content e cro-specialist mi hanno delegato (§ 4).

## 1. Metodo e limiti
- **Pagine e larghezze.**
  - Tutte le pagine a 390 e a 1440 px.
  - Reflow e spaziatura del testo anche a 320 px.
  - Zoom al 400% emulato con una viewport di 320 × 256.
- **Movimento.** Prove sia con `prefers-reduced-motion: reduce` (geometria esatta, niente scroll fluido) sia senza (reveal, autoplay).
- **Strumenti.** Script Playwright scritti per questa review, nello scratchpad della sessione:
  - `ux-probe`: giro completo di Tab con coordinate, indicatore di focus, copertura dell'header, target, nomi dei link, titoli e landmark;
  - `ux-dyn` e `ux-dyn2`: 1.4.13, interruttore, video, 1.4.12, 320 × 256, contrasto non testuale, 2.4.11 con Shift+Tab dopo lo scroll;
  - `ux-clip`: testo visibile tagliato dai contenitori con `overflow` nascosto (Appendice);
  - `ux-fixcheck`: prova in pagina delle correzioni A1 e A2.

  Screenshot in `shots/ux-*`.
- **Già verificato dalla sessione principale**, non ripetuto:
  - axe-core con 0 violazioni;
  - Lighthouse 100;
  - nessuno scorrimento orizzontale da 320 a 1920 px;
  - contenuti visibili senza JavaScript;
  - flussi di skip link, menu con Esc, «Parliamone», riepilogo errori e ripiego email.
- **Limiti.**
  - Solo Chromium.
  - Nessuno screen reader reale, nessun dispositivo reale.
  - Il video non si può ispezionare (host bloccato).

## 2. Verifiche superate

| Area | Esito | Evidenza |
|---|---|---|
| Ordine del focus | Coerente con l'ordine visivo su tutte le pagine, a 390 e a 1440 px | **Porte di Puglia Digitale:** Gravina → Acquaviva → Monopoli, stesso ordine del DOM a tutte le larghezze (da ovest a est su desktop, dall'alto in basso su mobile). **Esempi SIII a zig-zag:** percorsi dall'alto in basso. **Contatti su desktop:** prima la colonna «Recapiti», poi il form. **Città Digitali:** nella colonna sticky non ci sono elementi focalizzabili. |
| Trappole e focus su elementi nascosti | Nessuna trappola | Il honeypot ha `tabindex="-1"`, è fuori schermo (left −9999 px) e `aria-hidden`. Le copie del marquee e i duplicati visivi non ricevono il focus. |
| Focus visibile (2.4.7, 1.4.11) | Sempre visibile | **Contorno 2 px:** colore per superficie, #3C71A5 su calce (≈ 4,5:1). **Doppio anello calce + inchiostro:** sui nodi delle foto e sui comandi video. **Interruttore Tour 360°/SIII:** contorno sull'etichetta via `:has()` (screenshot a 390 e a 1440 px). |
| Focus non coperto (2.4.11) | Superato | Scroll, focus sul primo elemento visibile, poi Shift+Tab: nessun elemento sotto l'header su 5 pagine × 2 larghezze. |
| Zoom al 400% (320 × 256) | Superato | L'header diventa `position: relative`. Il `<dialog>` del menu scorre (`overflow-y: auto`): con Tab si arriva all'ultimo link, che resta in vista. |
| Struttura | Superato | **Titoli:** un H1 per pagina, gerarchia senza salti. **Landmark:** `banner`, `nav` «Principale» e «Menu principale», `nav` «Percorso», `main`, `contentinfo`. **Loghi:** nome «ITnode». **Breadcrumb:** ultima voce con `aria-current="page"`. |
| Link e nuove schede | Superato | Tutti i `target="_blank"` dichiarano la nuova scheda. Nessun nome di link uguale per destinazioni diverse. «Esplora ↗» e «Entra nell'esperienza ↗» hanno un nome completo che comincia con il testo visibile (2.5.3). |
| Tabella di confronto (/siii/) | Superato | A 390 px, impilata, conserva ruoli e intestazioni di colonna e di riga. Le etichette `::before` usano `content: attr(data-label) / ""` e non vengono lette due volte. |
| Interruttore Tour 360°/SIII | Superato | Radio nativi dentro `fieldset` con `legend`: un solo Tab, frecce funzionanti, didascalia aggiornata. Stato selezionato a 13,9:1 sulla superficie. |
| Form | Superato | **Campi:** etichette sempre visibili, aiuti collegati, `required`. **Errori:** solo all'uscita da un campo già toccato; riepilogo con link ai campi. **Stati:** `noValidate`, messaggio «Invio in corso…» in `role="status"`, focus sul titolo del pannello di esito. **Consensi:** nessuno preselezionato. |
| Contrasto non testuale | Superato | Bordi dei campi a 4,11:1 su calce e 4,06:1 su notte. Caselle native. |
| Movimento (2.2.2, 2.3.3) | Superato | **Nessuna animazione infinita**, tutte dentro `prefers-reduced-motion: no-preference`. **Marquee e orizzonte:** legati allo scroll, quindi 2.2.2 non si applica. **Autoplay del video:** solo da 1024 px, muto, mai con reduce; la pausa si raggiunge subito dopo le CTA della hero. |
| Target (2.5.8) | Superato | Nessun controllo sotto i 24 px fuori dalle eccezioni: link nel testo, caselle con etichetta cliccabile e spaziatura sufficiente. |
| Testo nascosto alle tecnologie assistive | Superato, con un'eccezione (A3) | Orizzonte, mappe, rilevamenti, didascalie dei nodi, valori delle statistiche e domini hanno sempre un equivalente leggibile: legenda, elenco, `sr-only` o nome del link. Fa eccezione il testo dei segnaposto «Asset richiesto». |

## 3. Osservazioni

### A1 · [BLOCCANTE] Didascalie dei punti caldi su hover e focus
- **Dove:** `/`, sezione «L'evento Puglia Digitale» (1 nodo a 390 px, 3 a 1440 px).
  - `src/components/sections/ImmersivePreview.astro`: regola `.document__node:hover .document__callout, .document__btn:focus-visible + .document__callout, …`, `pointer-events: none` e `top: calc(100% + 0.25rem)` su `.document__callout`, `aria-controls` sul pulsante.
  - `src/scripts/nodes.ts`.
- **Problema.** La didascalia compare al passaggio del puntatore e al focus da tastiera e copre parte della foto (screenshot `ux-hotspot-focus-1440.png`). Misure a 1440 px:
  - portando il puntatore sulla didascalia, la didascalia sparisce (opacità da 1 a 0);
  - con il focus sul nodo, Esc non la chiude, perché `nodes.ts` chiude solo le didascalie aperte con il clic.

  Inoltre `aria-controls` punta a un elemento `aria-hidden`.
- **Motivazione:** WCAG 1.4.13 Contenuto con hover o focus (AA). Il contenuto aggiuntivo deve poter essere chiuso senza spostare puntatore o focus, e deve restare visibile quando ci si passa sopra. Soglia non negoziabile 2.
- **Proposta, opzione A (consigliata).** La didascalia compare solo quando il nodo è aperto, con clic, tocco, Invio o Spazio. L'anello che si allarga su hover e focus resta come segnale. Senza contenuto che compare su hover o focus, 1.4.13 non si applica.
  - L'Esc di `nodes.ts` funziona già.
  - Il nome del pulsante contiene già l'etichetta, e la legenda sotto la foto è l'alternativa completa.
  - **Provata in pagina:** hover 0, focus 0, Invio 1, Esc 0, e il focus resta sul nodo.

  ```css
  /* ImmersivePreview.astro: sostituisce la regola con tre selettori */
  .document__btn[aria-expanded='true'] + .document__callout {
    opacity: 1;
  }
  ```

  ```diff
  - aria-controls={`${id}-label-${i + 1}`}
  ```
- **Opzione B (solo se la direzione visiva vuole tenere l'hover).**
  - Didascalia attaccata al nodo, senza lo spazio di 0,25 rem.
  - `pointer-events: auto` e `visibility: visible` solo quando è visibile; `visibility: hidden` quando non lo è, altrimenti intercetta i clic sulla foto.
  - Esc che chiude anche le didascalie aperte da hover o focus: attributo `data-dismissed` su `[data-nodes]`, azzerato a `pointerleave` e `focusout`.

  Richiede più codice e più casi da provare.

### A2 · [BLOCCANTE] Numeri delle statistiche tagliati con la spaziatura del testo
- **Dove:** `/puglia-digitale/`, «I numeri dei territori coinvolti». `src/components/sections/Stats.astro`: `.stat__value { white-space: nowrap }` dentro `.stats { overflow-x: clip }`.
- **Problema.** Con le spaziature del criterio 1.4.12, «~200.000» esce dalla colonna e la sezione lo taglia (screenshot `ux-spacing-stats-390.png`):
  - a 390 px si legge «~200.00» e l'etichetta «partite IVA nei territori coinvolt»;
  - a 1440 px il numero sborda di 160 px (x da 432 a 1600).

  Valore ed etichetta sono `aria-hidden`, con un testo `sr-only` per gli screen reader. Chi vede, però, non ha altro modo di leggerli. Il test «nessuno scorrimento orizzontale» non può accorgersene, perché la sezione ritaglia invece di far scorrere la pagina. Senza spaziature, da 320 a 1920 px, il numero entra: il problema n. 1 del registro è risolto.
- **Motivazione:** 1.4.12 Spaziatura del testo (AA): nessuna perdita di contenuto con le spaziature dell'utente. Soglia 2.
- **Proposta.** Un solo punto in cui il numero può andare a capo, dopo il separatore delle migliaia, usato solo quando non entra. «30+», «60%» e «~200» restano uniti: tra cifre e simboli non ci sono punti di a capo. L'etichetta torna a capo da sola, perché la cella non si allarga più. **Provata in pagina** a 320, 390 e 1440 px:
  - senza spaziature, tutto su una riga come oggi;
  - con le spaziature, nessun taglio: «~200.» e «000» su due righe.

  ```astro
  <!-- Stats.astro: al posto di {s.value} -->
  {s.value.split('.').map((part, j, all) => <>{part}{j < all.length - 1 && <>.<wbr /></>}</>)}
  ```

  ```css
  .stat__value {
    white-space: normal; /* era nowrap: l'unico punto di a capo è il <wbr> */
  }
  ```

### A3 · [BLOCCANTE per il G4] Condizioni di pubblicazione ancora aperte
- **Video di Città Digitali.**
  - **Dove:** `src/pages/citta-digitali.astro:83`.
  - **Problema:** `<VideoSection>` è senza `captions`, quindi senza `<track>`. Il contenuto non si può ispezionare (registro n. 11).
  - **Motivazione:** 1.2.1–1.2.5 e 2.3.1.
  - **Proposta.** Prima del go-live bisogna vederlo.
    - Solo musica: è di fatto un video senza parlato; basta un testo accanto al video che descriva ciò che si vede (1.2.1).
    - Con parlato: file `.vtt` da passare a `captions` (1.2.2), più descrizione audio o versione descritta (1.2.5).
    - In tutti i casi: nessun lampeggiamento oltre 3 volte al secondo (2.3.1).
- **Segnaposto degli asset.** Il testo «Asset richiesto…» si vede ma è nascosto alle tecnologie assistive (A e B ricevono informazioni diverse).
  - Al go-live non deve restare nessuno slot.
  - Le immagini vere vanno pubblicate con gli alt di `docs/contenuti/alt-text.md` (review di copywriter-content, T9).
- **Endpoint del form.** Configurato e provato con errore di rete simulato (checklist § 4.2, punto 8).

### A4 · [SUGGERIMENTO] Focus su blocchi non ancora rivelati
- **Dove:** `src/scripts/reveal.ts`, tutte le pagine con movimento attivo.
- **Problema.** Con Tab si arriva a un link dentro un blocco non ancora rivelato. La pagina scorre, ma l'elemento resta trasparente finché l'IntersectionObserver non scatta, poi compare in 700 ms. In Home «Esplora SIII» ha opacità 0 a 50, 250 e 500 ms e 0,98 a 900 ms.
- **Motivazione.** Non è un'inadempienza, perché il focus poi si vede. Però chi usa la tastiera insegue per quasi un secondo un focus invisibile a ogni capitolo (2.4.7; euristica «visibilità dello stato del sistema»).
- **Proposta:**

  ```ts
  // reveal.ts, dentro l'if: rivela subito il blocco che riceve il focus
  document.addEventListener('focusin', (event) => {
    let el = (event.target as Element).closest<HTMLElement>('[data-reveal], .aperture');
    while (el) {
      el.classList.add('is-inview', 'is-revealed');
      el = el.parentElement?.closest<HTMLElement>('[data-reveal], .aperture') ?? null;
    }
  });
  ```

### A5 · [SUGGERIMENTO] Parole lunghe a 320 px con la spaziatura del testo
- **Dove.** Solo a 320 px con le spaziature di 1.4.12; da 390 px è tutto a posto.
  - H1 della Home: la riga «La tecnologia cambia.» arriva a 343 px su 320 e viene tagliata da `.hero { overflow: clip }`. Probabilmente è la parola «tecnologia», che non può andare a capo.
  - `.door__domain` «acquavivadigitale.com» su /puglia-digitale/: esce di 4 px.
  - `.video__time` su /citta-digitali/.
- **Motivazione.** 1.4.12 non fissa una larghezza, ma la combinazione di schermo piccolo e foglio di stile personale esiste.
- **Proposta:** una rete di sicurezza che non cambia nulla quando la parola entra.

  ```css
  /* global.css */
  :is(h1, h2, h3) { overflow-wrap: break-word; }
  .door__domain { overflow-wrap: anywhere; }
  ```

### A6 · [SUGGERIMENTO] Casella privacy e telefono sotto il form (decisione sulla review cro-specialist, n. 10)
- **Dove:** `src/components/sections/ContactForm.astro`, casella `#f-privacy` e paragrafo `.contact__alt`.
- **Problema.**
  - La casella misura 20 × 20 px.
  - Il link all'informativa è dentro la `<label>`. Il nome della casella diventa quindi «Ho letto l'informativa privacy (si apre in una nuova scheda)», e sul telefono chi tocca il testo rischia di aprire l'informativa invece di spuntare la casella.
  - I link nel testo, alti 19 px, rientrano nell'eccezione di 2.5.8.
- **Decisione (owner dell'accessibilità).** Il criterio 2.5.8 è rispettato. Le tre modifiche seguenti migliorano l'usabilità:
  1. **Link fuori dall'etichetta.** Etichetta «Ho letto l'informativa privacy *», tutta cliccabile. Il link va nella riga di aiuto, collegata con `aria-describedby`. Testo definitivo a copywriter-brand (`microcopy.md`).
  2. **Casella di 24 × 24 px** (`width` e `height: 1.5rem`); resa visiva a ui-designer.
  3. **Area di tocco più ampia per il telefono sotto il pulsante:** `.contact__alt a { display: inline-block; padding-block: 0.625rem; }`. Sta da solo sulla sua riga, lontano da altri target. Da non applicare ai link dell'avviso in cima al form: lì email e telefono stanno su righe consecutive a 23 px di distanza, le aree ingrandite si sovrapporrebbero e un tocco sull'email aprirebbe il telefono.

### A7 · [SUGGERIMENTO] «Nuova scheda» dentro i titoli dei portali (Contatti)
- **Dove:** `src/pages/contatti.astro:166-180` (H3 della sezione «I portali»). Nel footer (`Footer.astro:82-83`) c'è lo stesso spazio prima della virgola (T4 di copywriter-content).
- **Problema.** Nell'elenco dei titoli dello screen reader si legge «Città Digitali , portale cittadigitali.it (si apre in una nuova scheda)».
- **Proposta.**
  - Attaccare lo `<span class="sr-only">` al nome (T4).
  - Spostare l'avviso in una descrizione, con un solo elemento per pagina:

  ```astro
  <a href={p.url} target="_blank" rel="noopener" aria-describedby="nuova-scheda">{p.name}<span class="sr-only">, portale {p.display}</span><Arrow dir="external" class="ct-portal__arrow" /></a>
  <!-- una volta nella pagina -->
  <span id="nuova-scheda" hidden>Si apre in una nuova scheda.</span>
  ```

  Il titolo diventa «Città Digitali, portale cittadigitali.it», e l'avviso si sente comunque quando il link riceve il focus.

## 4. Decisioni sulle voci delegate a ux-designer

| Voce | Da | Decisione | Note |
|---|---|---|---|
| T4 · spazio prima della virgola nei nomi dei portali | copywriter-content | **Sì** | Insieme ad A7 |
| T6 · separatore nei titoli su due righe | copywriter-content | **Sì** | `<span class="sr-only"> – </span>` negli H1 di /siii/, /puglia-digitale/ e /citta-digitali/ e nell'H3 «SIII» della Home; `, ` nell'H2 del fondatore in /contatti/. Il testo dell'H1 lo conferma seo-content. |
| T10 · coordinate lette dagli screen reader | copywriter-content | **Sì**: `aria-hidden="true"` sulle coordinate | Sono un segno grafico, come orizzonte e rilevamenti. Per D.L. Natura Dentro coincidono con la sede di ITnode e sembrano l'indirizzo dell'impresa. |
| H4 · trattino della timeline letto come paragrafo | copywriter-content | **Sì**: `aria-hidden="true"` sul trattino | La tappa si capisce anche senza data |
| K2 · «Preferisci parlarne a voce?» su /contatti/ | copywriter-content | **No, la riga resta** | Su mobile i «Recapiti» sono a circa 1000–1300 px sopra il pulsante: la riga offre l'alternativa nel momento di esitazione o di errore. Il form resta uguale su tutte le pagine (3.2.6 riguarda l'ordine, non la presenza, ma un componente coerente aiuta). Il copy deck di Contatti va allineato. |
| T11 · occhielli della hero | copywriter-content | Già deciso | Il breadcrumb sostituisce l'occhiello (decisione della sessione principale). Nessuna azione. |
| n. 10 · casella privacy e link piccoli | cro-specialist | Vedi A6 | 2.5.8 rispettato; miglioramenti di usabilità |

## 5. Stato del registro (`docs/ux/accessibilita.md` § 3), da riportare nel documento

| n. | Stato verificato oggi |
|---|---|
| 1 | Risolto senza spaziatura (da 320 a 1920 px). Con la spaziatura → A2. |
| 2 | Risolto e verificato: Shift+Tab dopo lo scroll, 5 pagine × 2 larghezze |
| 3, 4, 5 | Risolti. A 320 × 256 il menu scorre e l'header non è sticky. |
| 6 | Risolto. Resta la condizione di go-live A3. |
| 7 | Risolto. `aria-current="page"` presente. |
| 8 | Risolto: `form.noValidate` e focus sul titolo del pannello |
| 9, 12 | Non più applicabili: nessun iframe. `src/scripts/immersive.ts` non è importato da nessuna pagina (codice inutilizzato; decide la sessione principale se toglierlo). |
| 10 | Deciso dalla sessione principale (trattamento «inchiostro» e nota AI) |
| 11 | Aperto → A3 |
| 13 | Risolto: la timeline del fondatore non trasla più (nessuna trasformazione nel componente) |
| 14 | Risolto: stesso ordine a tutte le larghezze |

## Verdetto di dominio (accessibilità)
**Da correggere prima del G4.**
- A1 e A2 sono inadempienze WCAG 2.2 AA, quindi toccano la soglia 2. Sono piccole e hanno una correzione già provata.
- Dopo le correzioni, rieseguo `ux-clip` e `ux-fixcheck` e ripeto il giro da tastiera sulla Home e su /puglia-digitale/. Se l'esito è pulito, per il mio dominio il sito è conforme.
- A3 resta condizione del go-live: video, slot, endpoint.
- A4–A7 sono miglioramenti consigliati e non bloccano.

Il verdetto di gate spetta al creative-director.

## Ipotesi da validare
- **Screen reader reali:** lettura di «SIII», separatori dei titoli (T6), riepilogo errori (il focus va su un gruppo), tabella impilata. Da provare con NVDA con Chrome o Firefox e con VoiceOver su iOS `[DA FORNIRE: dispositivi o servizio di test]`.
- **Supporto dei browser:**
  - `content: attr() / ""` (Chrome, Safari ≥ 17.4, Firefox ≥ 128): nei browser più vecchi l'etichetta della tabella verrebbe letta due volte, senza danni;
  - `:has()` dell'interruttore (Safari ≥ 15.4, Firefox ≥ 121): senza supporto, il focus resterebbe sull'input invisibile. Da provare su WebKit e Firefox.
- **Zoom:** emulato con le dimensioni della viewport; manca una prova con lo zoom reale del browser.
- **Spaziatura del testo:** provata con il CSS standard del bookmarklet; le estensioni reali possono comportarsi diversamente.

## Domande aperte
- **Video di Città Digitali** (per il cliente, tramite la sessione principale): c'è parlato o solo musica? Ci sono lampeggiamenti? Quanto dura? Chi scrive sottotitoli e descrizione (cliente, copywriter-content)?
- **Punti caldi** (ui-designer, creative-director): opzione A o B (A1)?

## Decisioni richieste
- **creative-director, sentito ui-designer:** opzione A (consigliata) o B per le didascalie dei punti caldi. Per l'accessibilità vanno bene entrambe, se realizzate come descritto.
- **Sessione principale:** confermare le condizioni A3 (video, slot, endpoint) tra i requisiti del G4 e applicare A1 e A2.
- **seo-content:** testo del separatore negli H1 (T6).

## Appendice · Controllo del testo tagliato (1.4.10, 1.4.12)
Il test «nessuno scorrimento orizzontale» non vede il testo tagliato da un contenitore con `overflow: hidden` o `clip`. Questa funzione, eseguita in pagina con e senza le spaziature di 1.4.12, confronta ogni riga di testo con il contenitore che ritaglia più vicino. Esclude le fasce decorative che sbordano per scelta (orizzonte, marquee, mappe, segnaposto). Va aggiunta ai test di Fase 5 (`accessibilita.md`, Appendice A).

```js
const clipped = () => {
  const skip = '.sr-only,.horizon,.marquee,.compare__screen,.media-slot,.map,[hidden],dialog:not([open]),.skip-link,.contact__trap';
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const t = walker.currentNode;
    const el = t.parentElement;
    if (!t.textContent.trim() || el.closest(skip)) continue;
    let clip = el.parentElement;
    while (clip && clip !== document.body && !/(hidden|clip)/.test(getComputedStyle(clip).overflowX + getComputedStyle(clip).overflowY)) clip = clip.parentElement;
    const b = clip && clip !== document.body ? clip.getBoundingClientRect() : { left: 0, right: innerWidth, top: -Infinity, bottom: Infinity };
    const range = document.createRange();
    range.selectNodeContents(t);
    for (const r of range.getClientRects()) {
      if (r.width > 0.5 && (r.right > b.right + 1 || r.left < b.left - 1 || r.bottom > b.bottom + 1)) { out.push(`${el.className} "${t.textContent.trim().slice(0, 24)}"`); break; }
    }
  }
  return out;
};
```
