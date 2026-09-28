---
titolo: Verifica di accessibilità dopo le correzioni (verso il G4)
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.1
aggiornato: 2026-09-28
fonti: [http://localhost:4321/ (build statica del commit 7c5f747, dist/ delle 11:30), http://localhost:4323/ e http://localhost:4324/ (commit c025181, ricontrollo), http://localhost:4322/ (stesso commit con PUBLIC_SLOT_MODE=publish), docs/review/2026-09-28-sito-accessibilita-ux-designer.md, docs/review/2026-09-28-sito-fedelta-ui-designer.md, docs/review/2026-09-28-sito-verifica-fedelta-ui-designer.md, docs/review/2026-09-28-sito-performance-web-performance-specialist.md, docs/ux/accessibilita.md, docs/ux/struttura-pagine.md, docs/ui/design-system.md, docs/creativa/direzione-visiva.md, docs/contenuti/copy-deck/puglia-digitale.md, src/, scripts/prelaunch-check.mjs, CLAUDE.md]
oggetto: verifica di A1–A7 e B1, giro da tastiera, variante «in pubblicazione» dei segnaposto, form su mobile dopo un invio vuoto, I11
---

# Verifica di accessibilità dopo le correzioni · verso il G4

## In sintesi
- **Aggiornamento dopo c025181:** O1–O6 e i suggerimenti S1–S5 sono applicati e verificati. Il verdetto aggiornato è in fondo, in «Ricontrollo dopo c025181».
- **Le correzioni reggono.** A1 (didascalie dei punti caldi) e A2 (numeri delle statistiche) sono chiuse e verificate sul codice costruito, non più con correzioni iniettate. Il reflow a 320 px (B1) è pulito su tutte le 8 pagine, da 320 a 1440 px e a 320 × 256.
- **Tastiera superata** su Home, /puglia-digitale/, /siii/, /citta-digitali/ e /contatti/, a 390 e 1440 px.
  - Focus non coperto (2.4.11): 159 prove pulite.
  - axe-core 4.13: 0 violazioni su 64 esecuzioni (staging e «publish», compresi menu aperto e form con errori).
- **Nessuna inadempienza WCAG 2.2 AA nella build di staging.** Restano le condizioni di go-live di A3: video, endpoint, asset.
- **Variante «in pubblicazione»: accettabile su /siii/ e /puglia-digitale/.** Sulla Home mostra «Masseria Santella · Cassano delle Murge (BA)», che nella pagina non è scritto altrove: va tolto prima di pubblicare in quella modalità (O6).
- **Form su mobile dopo un invio vuoto:** il pulsante resta operabile (72 tocchi su 72, anche con CPU 4x). Lo scorrimento verso il riepilogo è il comportamento previsto e dura circa 0,7 s. Il timeout di 30 s è un effetto del test, non del sito.
- **I11:** confermo un solo ordine a tutte le larghezze e consiglio ovest → est, com'è oggi. Non è accettabile un focus che su desktop vada da destra a sinistra.
- **Cinque osservazioni importanti nuove (O1–O5)**, emerse dalle prove più estese: spaziature con il movimento attivo, parole spezzate, form. Sono tutte provate in pagina e richiedono poche righe.

## 1. Metodo e limiti
- **Build.**
  - Staging: commit 7c5f747, `dist/` delle 11:30, servito su 4321.
  - Variante `PUBLIC_SLOT_MODE=publish`: stesso commit, costruita alla stessa ora, servita su 4322.
  - Durante la verifica la sessione principale ha cominciato ad applicare nel working tree le correzioni della verifica UI, tra cui V2, V7 e V16 (identica alla mia S1). Non sono nella build verificata: le ricontrollo nel giro dopo le correzioni.
- **Script** nello scratchpad della sessione, cartella `ux-verifica/`:
  - `clip.mjs` (ux-clip v2): confronta ogni riga di testo con l'intersezione di **tutti** i contenitori che ritagliano e con il viewport, e salta il testo trasparente (didascalie chiuse);
  - `breaks.mjs` (nuovo): trova le parole spezzate a metà nel layout normale;
  - `fixcheck.mjs` (ux-fixcheck v2): verifica A1, A2, A4, A6, A7, banda CTA e contatore sul codice costruito;
  - `probe.mjs` (giro di Tab con coordinate), `flows.mjs` (percorsi da tastiera e 2.4.11), `tapform.mjs` e `scrollsum.mjs` (form su mobile), `axe.mjs`.
- **Copertura.**
  - Larghezze 320, 360, 390, 640 (200% di 1280), 768, 1024 e 1440; 1920 e 2560 per le parole spezzate; 320 × 256 (400%).
  - Con e senza le spaziature di 1.4.12.
  - Con la riduzione del movimento e con il movimento attivo, dopo aver fatto scorrere tutta la pagina.
- **Limiti.**
  - Solo Chromium; nessuno screen reader né dispositivo reale.
  - Il video non si può ispezionare.
  - Zoom del solo testo al 200%: non è richiesto da 1.4.4, che lo zoom della pagina soddisfa (pulito a 640 px). Con il solo testo ingrandito alcuni domini del footer e alcune frasi sbordano: conta solo se si vuole andare oltre AA.

## 2. Esito delle verifiche

| Verifica | Esito | Evidenza |
|---|---|---|
| A1 · didascalie, desktop | Risolto | 3 nodi, con e senza movimento: hover 0, focus 0, Invio 1 (`aria-expanded="true"`), puntatore sulla didascalia 1, Esc 0 con il focus che resta sul nodo. Spazio apre e chiude; aprire un nodo chiude l'altro. Nessun `aria-controls` in pagina. |
| A1 · didascalie, mobile | Nuovo problema → O3 | Il tocco porta il nodo a `aria-expanded="true"`, ma la didascalia è `display: none` |
| A2 · statistiche | Risolto | `<wbr>` dopo il punto e `white-space: normal`. Senza spaziature: una riga. Con le spaziature: «~200.» / «000» a 320, 390 e 1440 px, senza tagli. Testi `sr-only` intatti. |
| Reflow (B1) | Risolto | Nessun testo tagliato e nessuno scorrimento orizzontale: 8 pagine da 320 a 1440 px, anche a 320 × 256 e con il movimento attivo. **B1-A confermata per l'accessibilità:** il minimo in rem rispetta 1.4.4 e «Cominciamo» sta nella colonna a 320 px. |
| Spaziatura del testo (1.4.12) | Quasi pulito → O5 | **Con la riduzione del movimento:** resta solo la Home a 320 px (23 px). **Con il movimento attivo:** i Passaggi sbordano anche a 390 px, fino a 55 px. **Tempo del video** (`aria-hidden`): perde 16 px a 320 px, residuo accettato. |
| Parole spezzate (nuovo controllo) | Due casi → O4, S1 | Titolo di chiusura di /siii/ da 1024 px in su, con la riduzione del movimento; dominio della porta a 320 px |
| A4 · reveal | Risolto | Nessun elemento visibile al caricamento parte nascosto (5 pagine × 2 larghezze). Il blocco che riceve il focus è opaco al 65–70% dopo 150 ms e al 97–98% dopo 400 ms; prima restava a 0 fino a 500 ms. |
| A5 · rete di sicurezza | Applicata, con un effetto collaterale → O4 | Titoli con `overflow-wrap: break-word`, dominio con `anywhere` |
| A6 · privacy e telefono | Quasi completo → S2 | Link fuori dall'etichetta ✔; etichetta alta 44 px ✔; telefono 125 × 43 ✔. La casella misura ancora 20 × 20 (specificità). |
| A7 · portali | Risolto | Titoli «Città Digitali, portale cittadigitali.it», avviso della nuova scheda in `aria-describedby`. Nel nome calcolato Chromium mette ancora uno spazio prima della virgola, perché lo `sr-only` è posizionato: non si sente, nessuna azione. |
| Banda CTA | Risolto | Testo «Scrivi a info@itnode.it», nome accessibile identico |
| Contatore 01/05 | Risolto | `aria-hidden`, senza elementi focalizzabili, corretto dopo salti a 3, 1, 5 e 2 |
| Ordine del focus | Superato | 5 pagine × 2 larghezze: sempre coerente con l'ordine visivo. **Porte:** Gravina → Acquaviva → Monopoli, da sinistra a destra su desktop e dall'alto in basso su mobile. **Contatti su desktop:** prima i recapiti, poi il form. |
| Percorsi da tastiera | Superato, con un difetto → O1 | **Skip link:** visibile e in cima entro 50 ms. **Menu modale:** il Tab gira nel dialog e passa solo per l'interfaccia del browser; Esc riporta il focus su «Menu». **«Parliamone»** (da header e da menu): focus sul titolo del form, non coperto. **Invio vuoto:** focus sul riepilogo; i link portano al campo con `aria-invalid` e `aria-describedby`. **Correzione dal vivo:** funziona. **Invio valido senza endpoint:** focus sul titolo del pannello, bozza email con i dati. |
| Focus non coperto (2.4.11) | Superato | 159 prove (scroll, focus, Shift+Tab) su 5 pagine × 2 larghezze |
| axe-core 4.13 | Superato | 0 violazioni su 64 esecuzioni: 8 pagine × 2 larghezze × 2 build, più menu aperto e form con errori |
| Segnaposto nella build «publish» | Superato | Nell'HTML nessun «Asset richiesto», `[DA FORNIRE]`, `[DA VERIFICARE]` o `[IPOTESI]` |
| Contrasti della variante «publish» | Superato | Nomi 14,54:1 (notte) e 13,88:1 (calce); righe mono 7,42:1 e 5,94:1 |

## 3. Risposte

### 3.1 La variante «in pubblicazione» rispetto ad A3
**Accettabile al go-live, con una correzione sulla Home (O6).**
- **Cosa risolve.** Il problema di A3 era un testo di servizio visibile a chi vede e nascosto a chi usa le tecnologie assistive. La variante lo elimina:
  - niente «Asset richiesto» e nessun elemento focalizzabile;
  - contrasti sopra 4,5:1;
  - stesso box (niente CLS) e nessuna finta schermata.
- **Confronto con l'albero di accessibilità.** Ho confrontato il testo visibile di ogni variante con l'albero di accessibilità della pagina:
  - **/siii/:** nome e luogo delle tre esperienze coincidono con gli H3 e le righe di luogo accanto. L'anteprima della hero non ha testo. ✔
  - **/puglia-digitale/:** il nome coincide con l'H3. Rilevamento, distanza e coordinate non sono scritti altrove, ma sono il segno grafico dei rilevamenti, già trattato così nella decisione T10 (coordinate `aria-hidden`). Per Acquaviva, «Sede» corrisponde alla riga «la città in cui ha sede ITnode». ✔
  - **Home:** «Masseria Santella» e «Cassano delle Murge (BA)» compaiono solo nella variante, perché il capitolo SIII non li nomina. Chi vede sa quale esperienza rappresenta lo schermo, chi usa uno screen reader no. È la stessa asimmetria di A3, in piccolo (1.3.1) → O6.
- **Condizioni.**
  - Con asset mancanti si pubblica solo con `PUBLIC_SLOT_MODE=publish`. Il controllo pre-lancio blocca già i segnaposto di staging.
  - O6 va corretta.
  - Quando arrivano le immagini vere, gli alt sono quelli di `docs/contenuti/alt-text.md`.
- **Nota visiva: V7 della verifica UI.** Nelle porte strette (320–360 px) la cornice taglia nome e coordinate della variante. È testo decorativo duplicato, quindi non si perde contenuto, ma il taglio si vede. La correzione è V7 dell'ui-designer, confermata per l'accessibilità in §3.5.

### 3.2 Il form dopo un invio vuoto su mobile
- **Il pulsante resta operabile.**
  - **Al tocco:** 72 tocchi su 72. Configurazioni: iPhone 13, iPhone 13 con CPU 4x, 412 × 823 touch con CPU 4x come nella prova di performance. Per ognuna: 4 pagine con il form, con il movimento attivo e con quello ridotto, 3 tocchi di fila.
  - **Da tastiera** (4 pagine × 2 larghezze): dopo l'invio vuoto il focus è sul riepilogo. Con 14 Tab, attraverso i link e i campi, si arriva a «Invia richiesta»; Invio rifà la validazione e riporta il focus sul riepilogo. Con il movimento attivo il pulsante entra in vista circa 0,8 s dopo il Tab, per lo scroll fluido (S6).
- **Lo scorrimento verso il riepilogo non è un problema: è il comportamento previsto** (`struttura-pagine.md` §7.4).
  - **Con il movimento attivo:**
    - la pagina prima resta ferma sul pulsante: sopra compaiono riepilogo ed errori, e lo scroll anchoring la sposta di 300 px;
    - poi scorre in modo fluido per circa 1.300 px e si ferma in circa 0,7 s, con il riepilogo a metà schermo, sotto l'header (bordo superiore a 259 px, header a 65).
  - **Con il movimento ridotto:** il salto è immediato (66 ms).
  - Il riepilogo ha il focus, un contorno visibile e i link ai campi.
- **Il timeout di 30 s non si riproduce.**
  - I 2 s del secondo `tap` di Playwright dipendono dai suoi controlli di azionabilità mentre la pagina scorre in modo fluido: Playwright riporta il pulsante in vista, interrompendo lo scorrimento verso il riepilogo, e aspetta che sia stabile. Un utente reale non fa nulla del genere.
  - Per le misure ripetute di web-performance-specialist: usare `reducedMotion: 'reduce'`, oppure aspettare la fine dello scroll e toccare con `page.touchscreen.tap` alle coordinate del pulsante.
- **Due difetti reali, intorno al form:** l'errore prematuro sulla casella privacy (O1) e il bordo d'errore che non compare (O2).

### 3.3 I11 · ordine delle porte di Puglia Digitale
**Confermo la mia posizione: un solo ordine a tutte le larghezze, ovest → est (Gravina → Acquaviva → Monopoli), com'è oggi nel codice.** Non accetto la proposta di I11: DOM Monopoli → Acquaviva → Gravina, con le porte posizionate per longitudine.
- **Su desktop le porte formano una fila.**
  - Sono alte circa 580 px, sfalsate di 50–130 px, si sovrappongono in altezza per circa l'80% e si leggono da sinistra a destra (screenshot a 1440 px).
  - Con la proposta di I11 il focus partirebbe dalla porta all'estrema destra e tornerebbe verso sinistra, al contrario della lettura: 2.4.3, e 1.3.2 con la tecnica C27 (ordine del DOM uguale all'ordine visivo).
- **Ingrandimento dello schermo.** A ogni Tab, chi lo usa sposterebbe la lente da un bordo all'altro della fila.
- **Coerenza.** In tutto il sito le file si percorrono da sinistra a destra: header, colonne del footer, nodi della foto, colonne del form.
- **L'argomento editoriale è debole.**
  - «Dalla costa all'entroterra» è il titolo della sezione #progetto, due sezioni prima delle porte, con i numeri in mezzo.
  - L'introduzione delle porte dice «Scegli da dove entrare», senza un verso.
  - Il copy deck dichiara l'ordine una «scelta editoriale, reversibile», con testi validi anche nell'ordine delle LG.
- **Alternative accettabili per l'accessibilità** (sceglie il creative-director):
  1. **[consigliata] Ovest → est ovunque.** Nessuna modifica al codice. Su mobile la pila va dall'entroterra alla costa: il creative-director accetta lo scostamento da DV §7.5 n. 4 e DS §3.8.
  2. **Dalla costa all'entroterra ovunque**, con una composizione desktop che si legga Monopoli → Acquaviva → Gravina da sinistra a destra. Questa però contraddice la geografia (est a sinistra) e il principio dei «luoghi reali» della direzione visiva.
- **Non accettabile:**
  - un ordine del DOM diverso dall'ordine visivo a qualunque larghezza (riordino con `order`, `*-reverse` o posizionamento nella griglia);
  - un focus che va da destra a sinistra.

### 3.4 S9 della review UI · posizione e icona dei messaggi di errore
- **Posizione: il messaggio resta sotto il campo, com'è oggi.** Aggiorno `struttura-pagine.md` §7.4, che diceva «tra etichetta e campo».
  - Il form rivalida dal vivo e toglie l'errore alla prima battuta corretta. Con il messaggio sopra, il campo in cui si sta scrivendo salirebbe di una o due righe sotto il dito.
  - Lo stesso testo è nel link del riepilogo che porta al campo, e viene letto insieme al campo (`aria-describedby`).
  - ui-designer allinea il DS §3.15.
- **Icona e prefisso: sì**, come chiede il DS → S5. Li ho provati in pagina: l'icona «!» non viene letta e la descrizione del campo diventa «Errore: Scrivi nome e cognome.».
- **Bordo d'errore:** è nel codice ma non viene applicato → O2.
- **Riepilogo:** bordo pieno o filetto sinistro è una scelta visiva, indifferente per l'accessibilità. Decide ui-designer.

### 3.5 Domande della verifica UI (`docs/review/2026-09-28-sito-verifica-fedelta-ui-designer.md`)
- **V2 · Città Digitali a 1024–1279 px, città in elenco accanto alla carta: confermato.** Ho provato la regola in pagina a 1024, 1152, 1279, 1280 e 1440 px:
  - l'ordine del DOM coincide con l'ordine visivo, Varese → Altamura → Caltanissetta;
  - i link «Esplora» non si sovrappongono;
  - la sovrapposizione di 19 px tra Altamura e Caltanissetta, che oggi c'è a 1024 px, sparisce.
- **V7 · testo della variante nelle porte strette: confermato.** Nasconde solo elementi `aria-hidden`, il cui contenuto è già nel testo accanto (H3 e `.door__coords`): nessun effetto sulle tecnologie assistive. Sostituisce la mia proposta S3, che dava lo stesso risultato con una sola soglia.
- **V4 · `.line { text-wrap: balance }` in `Passage.astro`: compatibile con O5** (stesso componente). Provate insieme a O4, con e senza movimento e con le spaziature, da 320 a 1920 px: nessuna parola spezzata e nessun testo tagliato.
- **V16** coincide con la mia S1: la prova a 320 px conferma il risultato.

## 4. Osservazioni

### O1 · [IMPORTANTE] Errore prematuro sulla casella privacy
- **Dove:** `src/scripts/form.ts`, gestore `blur` in `fields.forEach`; tutte le pagine con il form.
- **Problema.**
  - Chi scorre il form con Tab senza toccare nulla vede comparire «Per inviare la richiesta, conferma di aver letto l’informativa privacy.» appena lascia la casella, che diventa `aria-invalid="true"`.
  - **Causa:** la condizione `field.value !== ''` è sempre vera per una casella, perché il suo `value` è «letta».
- **Motivazione.**
  - `struttura-pagine.md` §7.4: «Chi scorre i campi con Tab non riceve errori prematuri».
  - Gli errori prematuri disorientano chi naviga da tastiera e chi usa uno screen reader (3.3.1; euristica «prevenzione degli errori»).
  - Succedono proprio dove l'utente passa per leggere l'informativa.
- **Proposta, provata** con il bundle modificato al volo:
  - senza toccare la casella: nessun errore;
  - spuntata e poi tolta: errore;
  - di nuovo spuntata: l'errore sparisce;
  - telefono «abc»: errore all'uscita dal campo;
  - invio vuoto: la casella è segnalata.

  ```ts
  // form.ts: a checkbox always has a value («letta»): only a real change marks it as touched.
  field.addEventListener('blur', () => {
    const typed = field.type !== 'checkbox' && field.value !== '';
    if (typed || field.dataset.touched === 'true') validate(field);
  });
  ```

### O2 · [IMPORTANTE] Il bordo d'errore dei campi non viene applicato
- **Dove:** `src/components/sections/ContactForm.astro`, regola `.contact [aria-invalid='true']`.
- **Problema.**
  - Dopo un invio vuoto, «Nome e cognome» ed «Email» restano con il bordo grigio da 1 px (`rgb(122, 116, 104)`).
  - **Causa:** con gli attributi di Astro la regola dell'errore (specificità 0,4,0) perde contro quella base dei campi, `.contact input:is(...)` (0,4,1). Resta solo il messaggio rosso.
- **Motivazione.**
  - DS §3.15: «errore: bordo 2 px `--error` (senza spostamenti)».
  - Non è un'inadempienza, perché il messaggio identifica l'errore in testo (3.3.1).
  - In un form lungo, però, il bordo è ciò che fa trovare a colpo d'occhio i campi da correggere, soprattutto su mobile.
- **Proposta, provata** in pagina:
  - bordo rosso di 1 px più 1 px di ombra interna (#B42318, 5,82:1 su calce);
  - il campo resta alto 48 px, nessuno spostamento;
  - con il focus resta il contorno blu da 2 px.

  ```css
  /* ContactForm.astro, replaces `.contact [aria-invalid='true']`: same selector shape as the base
     field rule, so it wins; the second pixel is an inset shadow, so nothing moves (DS §3.15). */
  .contact input:is([type='text'], [type='email'], [type='tel'])[aria-invalid='true'],
  .contact textarea[aria-invalid='true'] {
    border-color: var(--error);
    box-shadow: inset 0 0 0 1px var(--error);
  }
  ```

### O3 · [IMPORTANTE] Su mobile il nodo della foto è un pulsante che non mostra nulla
- **Dove:** `/`, «L’evento Puglia Digitale», sotto i 700 px. `ImmersivePreview.astro`, `@media (max-width: 43.74em) { .document__callout { display: none; } }`.
- **Problema.**
  - Su mobile c'è un solo nodo, un pulsante da 44 × 44. Il tocco lo porta a `aria-expanded="true"`, ma la didascalia resta `display: none`: si ingrandisce solo l'anello.
  - Chi tocca non ottiene nulla; lo screen reader annuncia «espanso» senza che cambi niente.
- **Motivazione.**
  - Un comando che si attiva senza effetto è un'affordance falsa (euristica «visibilità dello stato del sistema»).
  - Lo stato «espanso» deve corrispondere a un contenuto mostrato (4.1.2).
  - Su desktop lo stesso comando funziona: il comportamento deve essere uguale a tutte le larghezze.
- **Proposta, provata** a 320, 360, 390 e 414 px, con e senza spaziature:
  - la didascalia resta dentro la foto (a 320 px occupa da 25 a 217 px su 320);
  - il secondo tocco la chiude.

  ```css
  /* ImmersivePreview.astro, @media (max-width: 43.74em): replaces `.document__callout { display: none; }`.
     A disclosure must disclose on phones too; mobile nodes sit between 30% and 70% of the width,
     so 60vw keeps the callout inside the photo. */
  .document__callout {
    max-width: min(16rem, 60vw);
  }
  ```

  In `src/scripts/nodes.ts` il commento iniziale («Hover and focus also reveal the label via CSS») dopo A1 non è più vero: «Hover and focus only grow the ring; the label shows when the node is open (WCAG 1.4.13).»

### O4 · [IMPORTANTE] /siii/: su desktop il titolo di chiusura si spezza a metà parola
- **Dove:** `/siii/`, `#chiusura`, H2 «La tua azienda può diventare un’esperienza.», da 1024 px in su. In `CTASection.astro`, variante `form` affiancata, il titolo occupa le colonne 1–5.
- **Problema.**
  - **Con la riduzione del movimento e senza JavaScript** il titolo si spezza a metà parola:
    - a 1024 px: «La tua / azienda può / diventare / un’esperien / za.»;
    - a 1280, 1920 e 2560 px: «un’esperienz / a.»;
    - a 1440 px il punto finisce da solo sull'ultima riga.
  - **Con il movimento attivo** le righe sono `inline-block`: la parola non si spezza, ma esce dalla colonna di 21–62 px, nel margine.
  - **Causa:** «un’esperienza.» in `display-l` misura 6,6 em (444 px a 1024 px) e la colonna è larga 382 px. Così la rete di sicurezza di A5 (`overflow-wrap: break-word` sui titoli) scatta anche nel layout normale.
- **Motivazione.**
  - È il titolo che chiude la pagina e introduce il form. Una parola spezzata senza trattino si legge male, soprattutto per chi ha difficoltà di lettura, e il difetto colpisce proprio chi ha chiesto di ridurre il movimento.
  - Non è un'inadempienza AA, ma la stessa pagina non deve avere due rese di cui una rotta.
  - La rete di sicurezza serve per le impostazioni dell'utente: nel layout normale non deve mai scattare.
- **Proposta, provata** da 1024 a 2560 px:
  - il titolo usa la sesta colonna, oggi vuota;
  - nessuna parola spezzata; tra il titolo e il form restano almeno 22 px;
  - con il movimento attivo la resa resta quella di oggi; con la riduzione si passa dalle 5 righe spezzate alle stesse 3.

  La composizione la conferma ui-designer.

  ```css
  /* CTASection.astro, @media (min-width: 64em): the title leaves the 1 / span 5 group. */
  .cta-section--form.cta-section--side .cta-section__eyebrow,
  .cta-section--form.cta-section--side .cta-section__body {
    grid-column: 1 / span 5;
  }
  /* The title may use the empty sixth column: «un’esperienza.» in display-l needs 6.6 em. */
  .cta-section--form.cta-section--side :global(.cta-section__title) {
    grid-column: 1 / span 6;
  }
  ```

### O5 · [IMPORTANTE] Con la spaziatura del testo i Passaggi escono dalla colonna (1.4.12)
- **Dove:** componente `Passage.astro`. Casi con le spaziature di 1.4.12:

  | Movimento | Pagina e larghezza | Testo | Sbordamento |
  |---|---|---|---|
  | ridotto | Home, 320 px | «Una nuova infrastruttura digitale» | 23 px |
  | attivo | Home, 320 px | anche «36 anni dentro l’innovazione» e «Cominciamo dal tuo spazio.» | 45 px |
  | attivo | Home, 390 px | «Cominciamo dal tuo spazio.» | 55 px |
  | attivo | /puglia-digitale/, 320 px | «Dalla costa all’entroterra.» | 32 px |
  | attivo | /siii/, 320 px | «La tua azienda può diventare…» | 48 px |
- **Problema.**
  - Con la riduzione del movimento, i Passaggi in `<p>` non hanno la rete di sicurezza: A5 l'ha messa solo sui titoli.
  - Con il movimento attivo, le righe del text reveal restano `inline-block` anche dopo l'animazione. `break-word` non riduce la loro larghezza minima (lo fa solo `anywhere`): la parola lunga allarga la riga e la pagina scorre in orizzontale.
- **Motivazione.**
  - Non si perde contenuto, perché lo si raggiunge scorrendo: non è un'inadempienza di 1.4.12.
  - Però 390 px è la larghezza di riferimento su mobile, e chi usa un foglio di stile per la spaziatura si trova il titolo tagliato dal bordo dello schermo.
- **Proposta, provata** su tutte le pagine a 320, 360, 390 e 768 px, con movimento e spaziature: nessuno sbordamento.
  - Il layout normale non cambia: 60 confronti (6 pagine × 5 larghezze × 2 modi di movimento) con le stesse altezze e le stesse righe.
  - L'unica differenza è il titolo di O4, che con O4 applicata sta nella colonna.

  ```css
  /* Passage.astro */
  .passage {
    /* Safety net for user text spacing (WCAG 1.4.12). «anywhere», not «break-word»: the text-reveal
       lines are inline-blocks, and only «anywhere» lowers their min-content width. */
    overflow-wrap: anywhere;
  }
  ```

### O6 · [BLOCCANTE solo per un go-live in modalità «publish» senza la schermata di Masseria Santella] Home: nome e luogo visibili ma nascosti
- **Dove:** `/`, capitolo 01 SIII; `src/pages/index.astro:111` (`<Media asset="siii-masseria-santella" />`), con `PUBLIC_SLOT_MODE=publish`.
- **Problema.** La variante mostra «Masseria Santella» e «Cassano delle Murge (BA)» con `aria-hidden="true"`, ma il capitolo non li nomina. Chi vede sa che lo schermo rappresenta un'esperienza reale di un cliente; chi usa uno screen reader no.
- **Motivazione:** 1.3.1, perché un'informazione data con la presentazione deve essere disponibile anche in testo. È la stessa asimmetria che rendeva bloccante A3. Soglia 2.
- **Proposta.**
  - **[consigliata]** Sulla Home, una variante senza nome e luogo, cioè solo orizzonte e nodi, come la hero di /siii/. Per esempio uno slot dedicato con `publish: { kind: 'experience', nodes: hotspots }`, oppure una prop di `Media` che sostituisce `publish`. Su /siii/ il nome resta, perché lì c'è l'H3.
  - **In alternativa**, se il creative-director vuole il nome anche in Home: solo lì, `role="img"` e `aria-label="Masseria Santella, Cassano delle Murge (BA)"` sul contenitore della variante. L'etichetta dice ciò che è scritto, senza descrivere una schermata che non c'è.

### Suggerimenti

| # | Dove | Problema | Proposta |
|---|---|---|---|
| S1 (= V16 della verifica UI) | `LocationShowcase.astro`, `.door__domain` | A 320 px si legge «acquavivadigitale.c / om»: effetto di `anywhere` (A5) | `<wbr />` prima dell'ultimo punto: `{d.display.slice(0, d.display.lastIndexOf('.'))}<wbr />{d.display.slice(d.display.lastIndexOf('.'))}`. Provato: a 320 px «acquavivadigitale / .com»; con le spaziature anche «monopolidigitale / .it»; da 360 px non cambia nulla. |
| S2 | `ContactForm.astro`, casella privacy (A6) | Misura ancora 20 × 20: `.contact input[type='checkbox']` vince su `.contact__field--check input` | Dopo la regola base: `.contact__field--check input[type='checkbox'] { width: 1.5rem; height: 1.5rem; }`; togliere le misure da `.contact__field--check input`. Provato: 24 × 24. |
| S3 (→ V7 della verifica UI) | `SlotPending.astro` | Nelle porte sotto i 120 px (320–360 px) nome e rilevamento vengono tagliati dalla cornice | Adottare V7 dell'ui-designer, confermata per l'accessibilità (§3.5). A 390 px, solo con le spaziature, resta un taglio su testo decorativo duplicato: nessuna perdita di contenuto. |
| S4 | `scripts/prelaunch-check.mjs` | La condizione A3 sul video (sottotitoli o descrizione) non è presidiata | Nuovo controllo: `{ name: 'Video di Città Digitali: sottotitoli (<track>) o descrizione testuale (A3)', ok: /<track kind="captions"\|Leggi la descrizione del video/.test(page('citta-digitali/index.html')) }`. È un presidio minimo: quale alternativa serve dipende dal contenuto del video. Provato sulla build: oggi «NO», con un `<track>` «OK». |
| S5 | `form.ts` (`showError`) e `ContactForm.astro` (decisione S9) | Il messaggio non ha l'icona né il prefisso «Errore:» previsti dal DS e da `struttura-pagine.md` | In `showError`: `error.replaceChildren(Object.assign(document.createElement('span'), { className: 'sr-only', textContent: 'Errore: ' }), messageFor(field, form));`. CSS: `.contact__error::before { content: '!' / ''; display: inline-grid; place-items: center; width: 1rem; height: 1rem; margin-inline-end: 0.4em; border-radius: 50%; background: var(--error); color: var(--bg); font-size: 0.75rem; line-height: 1; vertical-align: 0.1em; }`. Provato: descrizione letta «Errore: Scrivi nome e cognome.»; l'icona non viene letta. |
| S6 (dopo il lancio) | `global.css`, `html { scroll-behavior: smooth }` | In Chromium lo scroll fluido vale anche per gli spostamenti del focus e per la ricerca nella pagina. Chi usa la tastiera senza ridurre il movimento vede l'elemento con il focus entrare in vista 0,5–0,8 s dopo il Tab: stesso effetto che A4 ha tolto al reveal. Non è un'inadempienza, perché il focus arriva a schermo. | Da valutare dopo il lancio: scorrimento fluido solo sui link alle ancore della stessa pagina, via script, lasciando immediati gli spostamenti del focus. Va integrato con la gestione del focus delle ancore già in `header.ts`, quindi non lo propongo prima del G4. |

## 5. Stato delle osservazioni della review precedente

| Voce | Stato |
|---|---|
| A1 | Chiusa su desktop; su mobile → O3 |
| A2 | Chiusa |
| A3 | Aperta. **Video:** serve l'input del cliente. **Endpoint:** da configurare. **Asset:** risolvibile con la variante «publish», dopo O6. |
| A4 | Chiusa |
| A5 | Applicata. Effetti collaterali: O4 e S1. Residuo accettato: il tempo del video a 320 px con le spaziature (`aria-hidden`, informazione accessoria). |
| A6 | Etichetta e telefono chiusi; la casella → S2 |
| A7 | Chiusa |

Il registro in `docs/ux/accessibilita.md` (§3 e §4.4) è aggiornato con questi esiti.

## Verdetto di dominio (accessibilità) per il G4
**Conforme a WCAG 2.2 AA nel perimetro verificato (Chromium), con condizioni di go-live.**
- La build di staging non ha inadempienze AA. A1 e A2 sono chiuse sul codice costruito; reflow, tastiera, focus e axe sono puliti.
- **Condizioni di go-live** (bloccano il lancio, non il giudizio sul codice):
  1. **A3, video di Città Digitali:** sottotitoli e/o descrizione secondo il contenuto; nessun lampeggiamento oltre 3 volte al secondo.
  2. **A3, endpoint del form:** configurato e provato. È già nel controllo pre-lancio.
  3. **A3, asset:** se ne manca anche uno, build con `PUBLIC_SLOT_MODE=publish` **e** O6 corretta.
- **O1–O5:** vanno corrette, oppure accettate esplicitamente dal creative-director, prima del go-live. Sono poche righe, già provate.
- **S1–S5** si possono pianificare; **S6** è per dopo il lancio.
- Dopo le correzioni rieseguo `breaks.mjs`, `clip.mjs` (con movimento e spaziature) e il percorso del form.

Il verdetto di gate spetta al creative-director.

## Ipotesi da validare
- **Screen reader reali** (NVDA con Chrome o Firefox, VoiceOver su iOS). Da provare:
  - l'annuncio di «espanso» sul nodo;
  - la descrizione «Errore:» (S5);
  - il riepilogo come gruppo;
  - la lettura dei titoli dei portali.

  `[DA FORNIRE: dispositivi o servizio di test]`
- **Safari iOS e Firefox.** Da verificare il supporto di:
  - `content: '!' / ''` (S5): se manca, la regola viene ignorata e l'icona non compare, senza danni;
  - `:has()` nell'interruttore;
  - `overflow-wrap: anywhere` dentro le righe `inline-block` (O5).
- **Scroll fluido su iOS:** la durata dello scorrimento verso il riepilogo (0,7 s in Chromium) può essere diversa.

## Domande aperte
- **Cliente, tramite la sessione principale:** il video di Città Digitali ha parlato o solo musica? Ci sono lampeggiamenti? Quanto dura? Chi scrive sottotitoli e descrizione?
- **creative-director:**
  - I11, ordine delle porte;
  - O6, se il nome in Home si toglie o si espone;
  - O4, la sesta colonna del titolo, con ui-designer.
- **ui-designer:**
  - composizione di O4;
  - allineamento del DS §3.15 alla decisione S9: messaggio sotto il campo, icona, bordo senza spostamenti.

## Decisioni richieste
- **creative-director:**
  - I11: ovest → est ovunque (consigliata), oppure dalla costa all'entroterra ovunque con una nuova composizione desktop;
  - O1–O5: correggerle o accettarle esplicitamente prima del go-live;
  - O6: opzione consigliata o alternativa.
- **Sessione principale:**
  - applicare O1–O5 e S1 (= V16), S2, S4, S5; per le porte strette V7 della verifica UI, al posto di S3;
  - per la produzione, build con `PUBLIC_SLOT_MODE=publish` se mancano asset.
- **web-performance-specialist:**
  - chiudere la segnalazione sul `tap`: non si riproduce, è un effetto del test;
  - usare `reducedMotion: 'reduce'` nelle prove con tocchi ripetuti.

## Ricontrollo dopo c025181
- **Build verificate.**
  - Commit c025181: staging su http://localhost:4323/ (`dist-next`) e variante `PUBLIC_SLOT_MODE=publish` su http://localhost:4324/ (`dist-next-pub`), entrambe costruite alle 12:28.
  - Prima di misurare ho controllato che i file serviti contengano le correzioni (O1–O6, S1, S2, S5, V7) e che `src/` coincida con il commit. La porta 4321 serve ancora la build precedente e non è stata usata.
- **Controlli rifatti:**
  - parole spezzate da 320 a 2560 px, con e senza movimento, su staging e «publish»;
  - testo tagliato con e senza le spaziature di 1.4.12, con il movimento ridotto e attivo, da 320 a 1440 px e a 320 × 256;
  - percorso del form da tastiera e al tocco;
  - prove mirate delle correzioni;
  - axe-core e focus non coperto (2.4.11).

| Voce | Esito | Evidenza |
|---|---|---|
| O1 · errore prematuro | Chiusa | Tab sulla casella non toccata: nessun errore e nessun `aria-invalid` (4 pagine × 2 larghezze). Spuntata e tolta: errore; spuntata di nuovo: l'errore sparisce. Nei percorsi da tastiera, 0 errori prematuri. |
| O2 · bordo d'errore | Chiusa | 1 px di bordo più 1 px di ombra interna in `--error`: #B42318 sulle superfici chiare, #FF8A7A sulle superfici notte di Puglia Digitale e Città Digitali. Il campo non cambia altezza per il bordo. |
| O3 · nodo su mobile | Chiusa | A 320, 390 e 414 px, con e senza spaziature, il tocco mostra la didascalia dentro la foto e il secondo tocco la chiude. A1 su desktop invariata: hover 0, focus 0, Invio 1, Esc 0 con il focus sul nodo. |
| O4 · titolo di /siii/ | Chiusa | Nessuna parola spezzata da 320 a 2560 px, con e senza movimento |
| O5 · Passaggi e spaziatura | Chiusa | Con movimento e spaziature nessun Passaggio fuori colonna, da 320 a 1440 px |
| O6 · variante in Home | Chiusa | La variante della Home non mostra testo. Su /siii/ nomi e luoghi sono negli H3 e nelle righe accanto. Su /puglia-digitale/ restano fuori dall'albero di accessibilità solo rilevamenti e coordinate, il segno grafico di T10. Nessun «Asset richiesto». |
| S1 (= V16) · dominio | Chiusa | A 320 px «acquavivadigitale / .com» |
| S2 · casella privacy | Chiusa | 24 × 24 px |
| S3 (→ V7) · porte strette | Chiusa | A 320 e 340 px nome e coordinate sono nascosti; a 360 px solo le coordinate; tutto il testo mostrato sta dentro la porta. A 360–390 px, solo con le spaziature dell'utente, resta un taglio su testo decorativo duplicato: residuo accettato. |
| S4 · controllo pre-lancio | Applicata | Sulla nuova build la voce del video risponde «NO», come deve finché mancano sottotitoli o descrizione |
| S5 · icona e prefisso | Chiusa | Descrizione accessibile del campo «Errore: Scrivi nome e cognome.»; icona con `content: "!" / ""`, non letta; prefisso nascosto alla vista; link del riepilogo senza prefisso |
| Regressioni | Nessuna | **axe-core 4.13:** 0 violazioni su 64 esecuzioni (staging e «publish», con menu aperto e form con errori). **2.4.11:** 159 prove pulite. **Percorsi da tastiera:** invariati (skip link, menu, «Parliamone», riepilogo, correzione dal vivo, pannello senza endpoint). **Tocchi ripetuti dopo un invio vuoto:** 36 su 36. **Unico residuo:** il tempo del video (`aria-hidden`) a 320 px con le spaziature. |

**Nota fuori dal mio dominio, per ui-designer.**
- **Cosa succede.** Nel form a due colonne, da 1024 px, «Nome» e «Azienda» sono alti 68 px contro i 52 di «Email» e «Telefono»: la griglia li allunga per pareggiare la riga d'aiuto del campo accanto. Dopo un invio vuoto «Nome» passa a 63 px. Era così anche nella build precedente.
- **Correzione provata.** `.contact__field { align-content: start; }` porta tutti i campi a 52 px, e con gli errori niente si muove. In cambio, le cime dei campi di una riga non sono più allineate: è una scelta visiva.
- Per l'accessibilità non cambia nulla.

### Verdetto di dominio aggiornato (accessibilità) per il G4
**Conforme a WCAG 2.2 AA nel perimetro verificato (Chromium).** O1–O6 sono chiuse: nel mio dominio non restano osservazioni importanti aperte. Restano le condizioni di go-live di A3, che non dipendono dal codice:
1. **Video di Città Digitali:** sottotitoli e/o descrizione secondo il contenuto, e nessun lampeggiamento oltre 3 volte al secondo. Il controllo pre-lancio ora lo presidia (S4).
2. **Endpoint del form:** configurato e provato.
3. **Asset:** se ne manca anche uno, build di produzione con `PUBLIC_SLOT_MODE=publish`, che ora è conforme anche nella Home.

S6 resta per dopo il lancio. Restano valide le ipotesi da validare sopra: screen reader reali, Safari e Firefox. Il verdetto di gate spetta al creative-director.
