---
titolo: Review di conversione delle schermate SIII pubblicate
owner: cro-specialist
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-07
fonti: [commit d06a3e9, src/pages/siii.astro, src/pages/index.astro, src/data/media.ts, src/components/ui/Media.astro, src/styles/global.css (.aperture), scripts/prelaunch-check.mjs, src/assets/images/siii-*.jpg, staging http://127.0.0.1:4321 (commit d06a3e9), schermate in scratchpad/siii-shots/, docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md, docs/decisioni/002-veridicita-staging-e-immagini-ai.md (A7, I7), docs/brief/brief-consolidato.md (A7, N13), fonti web in fondo]
---

# Review di conversione · schermate SIII nel sito

**Oggetto.** Le schermate delle esperienze SIII inviate dall'utente il 2026-10-07 (commit `d06a3e9`): capitolo 01 della Home; hero ed «Esempi» di `/siii/`. Le quattro domande della sessione principale: il pulsante play, le viste scelte, la schermata con Airbnb e Booking, il piano di misurazione.

> **In breve**
> - **Il pulsante play è un clic a vuoto, e va risolto prima del lancio.** È largo fino a 97 px, sotto c'è solo un'immagine, il cursore non cambia, non parte nessun evento. Nel primo esempio, quando il play è al centro dello schermo, il CTA non si vede né a 1440 né a 1024 px. **Scelgo il link ridondante, ma tracciato come `outbound_click`, non `cta_click`**: la destinazione è un altro dominio. La patch è provata su una copia (oss. 1). L'accessibilità la decide ux-designer.
> - **Le tre viste vanno bene per la conversione.** La sala nella hero mostra il prodotto in uso ed è veloce. La vista d'apertura degli esempi è la stessa schermata che il visitatore trova aprendo l'esperienza, quindi la promessa è mantenuta. L'interno della Home mostra le azioni commerciali dentro lo spazio.
> - **Il consenso delle tre imprese (A7) non è registrato**, e le schermate oggi si vedono nell'anteprima aperta. Le schermate non passano più dagli slot, quindi `PUBLIC_SLOT_MODE=publish` non le sostituisce: senza consenso il ripiego è manuale. Propongo un controllo di go-live che blocca finché il consenso non è registrato (oss. 2).
> - **La schermata con Airbnb e Booking: non al lancio.** I loghi possono far pensare a una partnership, che i due marchi vietano senza permesso scritto. E mostra una prenotazione che si chiude su piattaforme terze, in contrasto con il beneficio «Vendita diretta» di `/siii/` (oss. 3).
> - **Piano di misurazione:** nessun evento nuovo. Con la patch arrivano tre `outbound_click` sulle schermate (`siii-showcase-<id>-schermata`), da leggere insieme al CTA nel KPI «Prova del prodotto».

## 1. Metodo
- **Codice letto**, senza modifiche a `src/`: il diff di `d06a3e9`, `siii.astro` (esempi, righe 225–268), `index.astro` (capitolo 01), `media.ts`, `Media.astro`, la regola `.aperture` in `global.css`, `scripts/prelaunch-check.mjs`.
- **Schermate**: le nove inviate dall'utente, in `src/assets/images/`, e le catture in `scratchpad/siii-shots/` (esempi, prima schermata di `/siii/`, capitolo 01 della Home a 390, 1024 e 1440 px).
- **Prove con Playwright 1.56 e Chromium 141** sullo staging `http://127.0.0.1:4321`:
  - clic al centro di ogni schermata, cioè sul play, a 1440 × 900 e 390 × 844: elemento sotto il puntatore, cursore, eventi in `window.dataLayer`, nuove schede, navigazione;
  - posizione del CTA rispetto alla schermata, a 1440 × 900, 1024 × 768 e 390 × 844;
  - nodi decorativi sopra le schermate vere (hero di `/siii/`, capitolo 01).
- **Patch provata su una copia del codice** nello scratchpad: build, clic, ordine del focus, albero di accessibilità e axe-core 4.13 a 390 e 1440 px. `git apply --check` conferma che la patch si applica al repository.

## 2. Esito delle verifiche

| Prova | Esito |
|---|---|
| Play degli esempi, oggi | **Clic a vuoto** su tutti e tre gli esempi, a ogni larghezza: sotto il puntatore c'è l'`IMG`, cursore `auto`, nessun evento, nessuna nuova scheda, nessuna navigazione. Diametro stimato del play: circa 97 px nel primo esempio a 1440 px (schermata 1339 × 837), 64 px negli altri due (884 × 552), 25 px a 390 px (350 × 219) |
| CTA visibile con il play al centro dello schermo | Esempio 1: **no** a 1440 × 900 (il CTA sta 147 px sotto una schermata alta 837 px) e a 1024 × 768 (174 px sotto). Esempi 2 e 3: sì, il CTA sta accanto alla schermata. A 390 px: sì, per tutti |
| Nodi decorativi sopra le schermate vere | Nascosti: 0 visibili su 3, nella hero di `/siii/` e nel capitolo 01, a 390 e 1440 px |
| CTA «Entra nell'esperienza» nel codice | `outbound_click`, `esperienza-siii`, `cta_location` `esempi`: corretto. **Non è `cta_click`**, come diceva la richiesta |
| Patch dell'oss. 1, sulla copia | Clic sul play: link sotto il puntatore, cursore `pointer`, nuova scheda verso l'esperienza, un `outbound_click` con i parametri giusti. Ordine del focus invariato (i tre CTA). Albero di accessibilità: per ogni esperienza l'immagine con il suo testo alternativo e un solo link. **axe: nessuna violazione** a 390 e 1440 px |

Payload del clic sulla schermata, con la patch:

```json
{"event":"outbound_click","page_type":"siii","cta_id":"siii-showcase-masseria-santella-schermata","cta_location":"esempi","outbound_type":"esperienza-siii","destination_id":"masseria-santella","link_url":"https://www.cassanodigitale.it/masseriasantella/","link_domain":"www.cassanodigitale.it"}
```

## 3. Osservazioni

### 1. [IMPORTANTE, prima del go-live] Il pulsante play degli esempi non risponde
- **Dove:** `/siii/#esempi`, `src/pages/siii.astro`, `.example__screen` (righe 237–243).
- **Problema:**
  - La vista d'apertura ha un grande play al centro. È il segno più forte di «clicca qui» che un'immagine possa avere, e non fa nulla.
  - Nel primo esempio, quello più grande, chi guarda il play non vede il CTA: deve scorrere per trovarlo (tabella del §2).
  - Il tentativo non lascia traccia: non si può sapere quante persone ci provano.
- **Motivazione:**
  - LIFT: il clic a vuoto toglie chiarezza e aggiunge ansia, con il dubbio «il sito non funziona?», proprio sulla prova più forte della pagina (strategia, §9).
  - Regola di progetto: nessun elemento che promette qualcosa che poi non mantiene.
  - Entrare in un'esperienza è la micro-conversione della pagina (KPI «Prova del prodotto», piano §3): un clic a vuoto è una micro-conversione persa.
- **Le opzioni:**

  | Opzione | Effetto sulla conversione | Esito |
  |---|---|---|
  | Lasciare com'è | Clic a vuoto a ogni visita curiosa, non misurabile | No |
  | **Schermata come link ridondante verso l'esperienza** | Il play mantiene la promessa: si apre la stessa schermata, nell'esperienza vera, in una nuova scheda come il CTA | **Scelta** |
  | Togliere il play: ritocco o altra vista | Ritoccare l'interfaccia di un cliente altera una prova. Per Maison Miminà e D.L. Natura Dentro non ci sono altre viste 16:10 | No |
  | Anteprima «Prova qui» nella pagina: il play carica l'esperienza in un iframe | È la soluzione migliore, ma è prevista dopo il lancio (verdetto G4) e richiede la verifica dei cookie dei portali (piano, §1, condizione 4) e una misura di performance | Dopo il lancio. Il link resta finché non c'è |

- **Proposta:** un link sopra la schermata, con la stessa destinazione e la stessa nuova scheda del CTA.
  - **Tracciamento:**
    - `outbound_click`, **non `cta_click`**: la destinazione è un altro dominio, e `cta_click` vale solo per le destinazioni interne (piano, §4). Con `cta_click` il clic uscirebbe dal KPI «Prova del prodotto»;
    - `cta_id` `siii-showcase-<id>-schermata`, con lo stesso prefisso del CTA della stessa esperienza. Un filtro «inizia con» li prende tutti e due, l'id esatto li distingue;
    - `cta_location` `esempi`; `outbound_type` `esperienza-siii`; `destination_id` uguale a quello del CTA.
  - **Accessibilità** (decide ux-designer): il link copre l'immagine senza contenerla, è fuori dall'ordine di tabulazione (`tabindex="-1"`) e nascosto alle tecnologie assistive (`aria-hidden="true"`).
    - Tastiera e screen reader hanno già il CTA, che ha un nome completo: per ogni esperienza resta un solo link.
    - L'immagine resta esposta con il suo testo alternativo. Mettendola dentro il link, il testo alternativo sparirebbe con `aria-hidden`, oppure diventerebbe il nome di un secondo link.
  - **Facoltativo** (ui-designer): al passaggio del mouse, un piccolo «↗» sulla schermata, per ricordare che si apre una nuova scheda come per il CTA. Il cursore a mano basta già a dire che è cliccabile.

  ```diff
  --- a/src/pages/siii.astro
  +++ b/src/pages/siii.astro
  @@ -240,6 +240,22 @@
                     alt={siiiExampleScreens[ex.id].alt}
                     sizes={i === 0 ? '(min-width: 100rem) 1488px, 93vw' : '(min-width: 100rem) 983px, (min-width: 64em) 62vw, 92vw'}
                   />
  +                {/* The screenshot's play button invites a click: the whole screenshot opens the experience,
  +                    like the CTA. Pointer-only shortcut, out of the tab order and hidden from assistive
  +                    technology, which already have «Entra nell'esperienza» (CRO review of 2026-10-07). */}
  +                <a
  +                  class="example__screen-link"
  +                  href={ex.url}
  +                  target="_blank"
  +                  rel="noopener"
  +                  tabindex="-1"
  +                  aria-hidden="true"
  +                  data-track="outbound_click"
  +                  data-cta-id={`siii-showcase-${ex.id}-schermata`}
  +                  data-cta-location="esempi"
  +                  data-outbound-type="esperienza-siii"
  +                  data-destination-id={ex.id}
  +                />
                 </div>
                 <div class="example__body" data-reveal>
                   <h3 class="example__name">{ex.name}</h3>
  @@ -778,6 +794,13 @@
       grid-column: 1 / -1;
     }
   
  +  /* Covers the screenshot under the aperture shutters (z-index 2, no pointer events). */
  +  .example__screen-link {
  +    position: absolute;
  +    inset: 0;
  +    z-index: 1;
  +  }
  +
     .example__body {
       display: grid;
       gap: var(--space-s);
  ```

  `.aperture` ha già `position: relative`, e le sue due ante (`z-index: 2`) non intercettano i clic (`pointer-events: none`): il link funziona anche durante l'apertura. Esito delle prove nel §2.

### 2. [BLOCCANTE per il go-live, già condizione C06] Consenso delle tre imprese (A7) non registrato
- **Dove:** cinque schermate in uso (Home, capitolo 01; `/siii/`, hero ed esempi). In `docs/` il consenso non risulta: il brief consolidato (A7, P2) e l'ADR 002 lo danno ancora come da ricevere. Il commit dice «inviate dall'utente», che non è il consenso delle imprese.
- **Problema:**
  - Le schermate mostrano nome, logo e ambienti di Masseria Santella, Maison Miminà e D.L. Natura Dentro. Oggi si vedono nell'anteprima, aperta a chiunque abbia il link (ADR 004).
  - La riserva dell'ADR 002 per A7 dice «senza consenso, nessuna schermata: resta la variante "in pubblicazione"». Ma le schermate ora entrano con `image=` e non dagli slot: `PUBLIC_SLOT_MODE=publish` non le sostituisce più, e `check:launch` non se ne accorge.
- **Motivazione:** soglia 1 (veridicità); strategia §9 («Tre esperienze SIII reali: [DA VERIFICARE] che il cliente possa citarle»). Per la conversione conta anche la fiducia: un'impresa citata senza consenso che chiede di essere tolta dopo il lancio è un danno, non una prova.
- **Proposta:**
  1. L'utente conferma per iscritto il consenso delle tre imprese; brand-strategist chiude A7 nel brief e nell'ADR 002.
  2. Fino ad allora, un controllo di go-live che blocca. L'ho provato su una copia della build: senza conferma dà `NO` su `/` e `/siii/`, con la conferma dà `OK`.

  ```diff
  --- a/scripts/prelaunch-check.mjs
  +++ b/scripts/prelaunch-check.mjs
  @@ -19,7 +19,7 @@
   
   // Veridicity reserves still open (ADR 002; veracity review B2, I2; G4 verdict N10). Set to true
   // only with the client's written confirmation, recorded in docs/.
  -const CONFIRMED = { highTraffic: false, clients10k: false };
  +const CONFIRMED = { highTraffic: false, clients10k: false, showcaseConsent: false };
   const anyPage = (re) => pages.filter((p) => re.test(p.html)).map((p) => p.path.replace(dist, ''));
   
   const checks = [
  @@ -51,6 +51,12 @@
       ok: anyPage(/\d\.\d{3,}° [NSEO]/).length === 0,
       detail: anyPage(/\d\.\d{3,}° [NSEO]/),
     },
  +  {
  +    // ADR 002, A7: screenshots of the three businesses only with their written consent, recorded in docs/.
  +    name: 'Schermate delle esperienze SIII con il consenso scritto delle imprese (A7)',
  +    ok: CONFIRMED.showcaseConsent || anyPage(/_astro\/siii-(masseria-santella|maison-mimina|dielle)-/).length === 0,
  +    detail: anyPage(/_astro\/siii-(masseria-santella|maison-mimina|dielle)-/),
  +  },
     { name: 'Video di Città Digitali ospitato sul sito (non su railway.app)', ok: anyPage(/railway\.app/).length === 0, detail: anyPage(/railway\.app/) },
   ];
  ```

  3. Se al go-live il consenso manca per una sola impresa, si toglie la sua schermata e si torna allo slot (`<Media asset={ex.slot} pendingText={false} />`); nome e link restano (LG §12).

### 3. [IMPORTANTE] La schermata con Airbnb e Booking: non al lancio
- **Dove:** `src/assets/images/siii-masseria-santella-mobile-appartamento.jpg`, non in uso: «Appartamento deluxe con 3 camere da letto», con i loghi Airbnb e Booking.com come punti attivi.
- **Il valore c'è:** è l'unica schermata che mostra il passo dalla visita alla prenotazione, il beneficio che interessa di più alle strutture ricettive, il primo pubblico del SIII (strategia, §1).
- **Problemi:**
  1. **I loghi di terzi possono far pensare a una partnership.** Sul sito di ITnode, in un contesto promozionale, si possono leggere come «ITnode è partner di Airbnb e Booking». Le linee guida di Airbnb vietano l'uso del logo senza permesso scritto e ogni uso che faccia pensare a una partnership. Quelle di Booking Holdings non permettono usi che suggeriscano un'approvazione senza accordo scritto. È anche la soglia 1: nessuna partnership inventata, nemmeno per implicazione.
  2. **Contraddice «Vendita diretta».** Su `/siii/` uno dei benefici si intitola «Vendita diretta». Per un albergatore «diretta» vuol dire senza intermediari, e questa schermata mostra la prenotazione che si chiude su due intermediari. Chi arriva da qui al form con l'idea di un motore di prenotazione proprio diventa un contatto meno qualificato, e poi resta deluso.
  3. **Consenso A7**, come per le altre schermate (oss. 2).
- **Proposta:**
  - **Non usarla al lancio.**
  - **Usarla come prova interna per I7** (ADR 002), passando la questione a brand-strategist e copywriter-brand. Da Masseria Santella si arriva alla prenotazione, ma sui canali della struttura. Senza una conferma del cliente che esistono SIII con prenotazione o vendita diretta, conviene applicare la riserva I7: «Dalla visita alla vendita» al posto di «Vendita diretta», e «…chiede informazioni e, dove previsto, prenota.» nella Home.
  - **Se in futuro serve una prova della prenotazione**: chiedere al cliente una schermata di un'azione senza marchi di terzi, per esempio il pannello informazioni o una richiesta di disponibilità [DA FORNIRE]. In alternativa si usa questa, con permesso dei marchi o con una didascalia che dica che cosa si vede, «i canali di prenotazione della struttura», e solo dopo un parere di brand-strategist.

### 4. [SUGGERIMENTO] Hero di `/siii/`: dire di chi è lo spazio
- **Dove:** hero di `/siii/`, schermata su smartphone.
- **Problema:** chi guarda vede il logo di Masseria Santella senza contesto. Il testo alternativo nomina la struttura, la pagina no.
- **Motivazione:** una prova specifica convince più di una generica. Il nome lega la hero agli esempi verso cui porta la CTA primaria, «Esplora gli esempi ↓».
- **Proposta:** una riga in mono sotto il telefono, per esempio «Masseria Santella · Cassano delle Murge (BA)», nello stile dei luoghi del sito. Solo con il consenso A7. Testo di copywriter-brand; decide il creative-director, perché tocca la hero.

### 5. [SUGGERIMENTO] Home e hero: schermate con icone che sembrano cliccabili
- **Dove:** capitolo 01 della Home e hero di `/siii/`. Il menu delle azioni (telefono, email, WhatsApp, mappa) e i punti dell'esperienza sono nell'immagine.
- **Problema:** il rischio di clic a vuoto è minore che con il play, ma c'è.
- **Proposta:** nessuna modifica ora. Nella Home un link verso l'esperienza aggiungerebbe un'uscita al capitolo, contro la regola «nei capitoli della Home niente link esterni» (strategia, §4). Da osservare nei test con utenti (backlog, §6).

## 4. Le viste scelte: che cosa pesa sulla conversione

| Vista | Effetto sulla conversione | Esito |
|---|---|---|
| **Hero di `/siii/`**: la sala con la volta, su smartphone | Mostra il prodotto in uso dentro uno spazio vero, con le azioni commerciali nel menu, e il «da smartphone» del testo. La facciata della reception dice «ospitalità» un po' meglio, ma pesa 78 KB e sforerebbe il budget LCP: la velocità della prima schermata conta di più | **Ok.** Suggerimento all'oss. 4 |
| **Esempi**: la vista d'apertura, «piccolo pianeta» con il play | È la schermata che si trova aprendo l'esperienza: la promessa del CTA «Entra nell'esperienza» è mantenuta. Il «piccolo pianeta» incuriosisce e si distingue a colpo d'occhio da una foto | **Ok, con l'oss. 1** |
| **Home, capitolo 01**: l'interno con il menu delle azioni e l'assistente | Mostra che dentro lo spazio si chiede e si contatta, coerente con il testo del capitolo. Nessun play, quindi poco rischio di clic a vuoto | **Ok.** Per «e prenota» vedi oss. 3 |

## 5. Piano di misurazione
- **Nessun evento nuovo.** Con la patch dell'oss. 1 si aggiungono tre elementi `outbound_click` (`siii-showcase-<id>-schermata`, `cta_location` `esempi`, `outbound_type` `esperienza-siii`). Gli elementi tracciati passano da 155 a 158 e i valori restano nell'elenco chiuso (inventario della build con la patch).
- **KPI «Prova del prodotto»:** conta il CTA e la schermata, distinti dal `cta_id`. Il rapporto tra i due dirà se le persone entrano dalla schermata, e servirà a decidere sull'anteprima «Prova qui».
- **Il link sulla schermata non ha testo visibile**, quindi non manda `cta_text`: si legge dal `cta_id`.
- **Regola ribadita nel piano:** un link verso un altro dominio è sempre `outbound_click`, anche se ripete un CTA.
- Aggiornati `docs/cro/piano-misurazione.md` (v0.5), `docs/cro/strategia-conversione.md` (v0.5) e `docs/cro/backlog-esperimenti.md` (v0.3).

## 6. Verdetto di dominio

**Conversione: approvato con modifiche.**
- **Prima del go-live:**
  - l'oss. 1, con la patch, dopo il via libera di ux-designer sull'accessibilità;
  - l'oss. 2: consenso registrato, oppure le schermate tolte; il controllo di go-live è consigliato subito;
  - l'oss. 3: la scelta su «Vendita diretta» passa dalla riserva I7 dell'ADR 002.
- **Facoltative:** oss. 4 e 5.

La sintesi e il verdetto di gate spettano al creative-director.

## 7. Fonti
- Airbnb, [Trademark Guidelines](https://www.airbnb.com/help/article/3233): uso dei loghi solo con permesso scritto, nessun uso che faccia pensare a partnership, sponsorizzazione o approvazione. Consultate il 2026-10-07 attraverso i risultati di ricerca: il sito non è stato aperto dall'ambiente.
- Booking Holdings, [Brand Guidelines](https://www.bookingholdings.com/brand-guidelines/): nessun uso che suggerisca approvazione, sponsorizzazione o proprietà senza accordo scritto. Consultate il 2026-10-07 attraverso i risultati di ricerca. Le regole specifiche del logo Booking.com per terzi sono [DA VERIFICARE].
- Prove del 2026-10-07: staging del commit `d06a3e9`; copia del codice con la patch, fuori dal repository; Playwright 1.56, Chromium 141, axe-core 4.13.

## Ipotesi da validare
- [IPOTESI] Chi vede il play prova a cliccarlo. Lo dirà il rapporto tra clic sulla schermata e clic sul CTA, quando ci sarà uno strumento di analytics, e prima ancora i test con utenti.
- [IPOTESI] Per le strutture ricettive «vendita diretta» significa prenotazione senza intermediari: da verificare nelle interviste di E1 o con chi gestisce le richieste.

## Domande aperte
- **Utente:** le tre imprese hanno dato il consenso scritto a comparire con nome e schermate (A7)?
- **Cliente:** in qualche SIII la prenotazione o la vendita avviene senza piattaforme terze (I7, N13)? C'è una schermata di un'azione commerciale senza marchi di terzi?
- **ux-designer:** il link sopra la schermata, fuori dall'ordine del focus e nascosto alle tecnologie assistive, è accettabile (oss. 1)?

## Decisioni richieste
- **ux-designer:** accessibilità del link ridondante (oss. 1).
- **Sessione principale:** applicare le patch delle oss. 1 e 2, dopo il via libera di ux-designer per la prima.
- **Utente e brand-strategist:** consenso A7 (oss. 2); riserva I7 su «Vendita diretta» e «prenota» (oss. 3).
- **creative-director:** sintesi; didascalia della hero (oss. 4).
