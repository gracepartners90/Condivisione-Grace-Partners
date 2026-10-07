---
titolo: Review di conversione delle schermate SIII pubblicate
owner: cro-specialist
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-07
fonti: [commit d06a3e9 e 88d7083, src/pages/siii.astro, src/pages/index.astro, src/data/media.ts, src/components/ui/Media.astro, src/styles/global.css (.aperture), scripts/prelaunch-check.mjs, src/assets/images/siii-*.jpg, staging http://127.0.0.1:4321 (commit d06a3e9), schermate in scratchpad/siii-shots/, decisione dell'utente del 2026-10-07 riferita dalla sessione principale, docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md, docs/decisioni/002-veridicita-staging-e-immagini-ai.md (A7, I7), docs/brief/brief-consolidato.md (A7, N13), fonti web in fondo]
---

# Review di conversione · schermate SIII nel sito

**Oggetto.** Le schermate delle esperienze SIII inviate dall'utente il 2026-10-07: capitolo 01 della Home; hero ed «Esempi» di `/siii/` (commit `d06a3e9`). Poi il link sulle schermate degli esempi, deciso dall'utente lo stesso giorno (commit `88d7083`). Le domande della sessione principale: il pulsante play, le viste scelte, la schermata con Airbnb e Booking, il piano di misurazione.

> **In breve**
> - **Il pulsante play era un clic a vuoto. Ora la schermata apre l'esperienza in una nuova scheda**, per decisione dell'utente (commit `88d7083`). Prima della modifica: play largo fino a 97 px, sotto solo un'immagine, nessun evento; nel primo esempio, con il play al centro dello schermo, il CTA non si vedeva né a 1440 né a 1024 px.
> - **Nomi degli eventi verificati sulla build di `88d7083`.** Immagine e CTA mandano tutti e due `outbound_click`, di tipo `esperienza-siii`, con lo stesso `destination_id`. Si distinguono per il `cta_id`: `siii-showcase-<id>-schermata` per l'immagine, `siii-showcase-<id>` per il CTA. Focus invariato, axe senza violazioni.
> - **Le tre viste vanno bene per la conversione.** La sala nella hero mostra il prodotto in uso ed è veloce. La vista d'apertura degli esempi è la stessa schermata che il visitatore trova aprendo l'esperienza, quindi la promessa è mantenuta. L'interno della Home mostra le azioni commerciali dentro lo spazio.
> - **Il consenso delle tre imprese (A7) non è registrato**, e le schermate oggi si vedono nell'anteprima aperta. Le schermate non passano più dagli slot, quindi `PUBLIC_SLOT_MODE=publish` non le sostituisce: senza consenso il ripiego è manuale. Propongo un controllo di go-live che blocca finché il consenso non è registrato (oss. 2).
> - **La schermata con Airbnb e Booking: non al lancio.** I loghi possono far pensare a una partnership, che i due marchi vietano senza permesso scritto. E mostra una prenotazione che si chiude su piattaforme terze, in contrasto con il beneficio «Vendita diretta» di `/siii/` (oss. 3).

## 1. Metodo
- **Codice letto**, senza modifiche a `src/`: i diff di `d06a3e9` e `88d7083`, `siii.astro` (esempi), `index.astro` (capitolo 01), `media.ts`, `Media.astro`, la regola `.aperture` in `global.css`, `scripts/prelaunch-check.mjs`.
- **Schermate**: le nove inviate dall'utente, in `src/assets/images/`, e le catture in `scratchpad/siii-shots/` (esempi, prima schermata di `/siii/`, capitolo 01 della Home a 390, 1024 e 1440 px).
- **Prove con Playwright 1.56 e Chromium 141.**
  - Sullo staging di `d06a3e9`:
    - clic al centro di ogni schermata, cioè sul play, a 1440 × 900 e 390 × 844, con elemento sotto il puntatore, cursore, eventi in `window.dataLayer`, nuove schede e navigazione;
    - posizione del CTA rispetto alla schermata, a 1440 × 900, 1024 × 768 e 390 × 844;
    - nodi decorativi sopra le schermate vere.
  - Sulla build di `88d7083`, generata fuori da `dist/`:
    - inventario degli attributi `data-*`;
    - clic sull'immagine e sul CTA, con le richieste esterne simulate;
    - ordine del focus;
    - axe-core 4.13 a 390 e 1440 px.
- **Controllo di go-live dell'oss. 2** provato su una copia dello script, fuori dal repository.

## 2. Esito delle verifiche

| Prova | Esito |
|---|---|
| Play degli esempi prima del link (`d06a3e9`) | **Clic a vuoto** su tutti e tre gli esempi, a ogni larghezza: sotto il puntatore c'è l'`IMG`, cursore `auto`, nessun evento, nessuna nuova scheda, nessuna navigazione. Diametro stimato del play: circa 97 px nel primo esempio a 1440 px (schermata 1339 × 837), 64 px negli altri due (884 × 552), 25 px a 390 px (350 × 219) |
| CTA visibile con il play al centro dello schermo | Esempio 1: **no** a 1440 × 900 (il CTA sta 147 px sotto una schermata alta 837 px) e a 1024 × 768 (174 px sotto). Esempi 2 e 3: sì, il CTA sta accanto alla schermata. A 390 px: sì, per tutti |
| Nodi decorativi sopra le schermate vere | Nascosti: 0 visibili su 3, nella hero di `/siii/` e nel capitolo 01, a 390 e 1440 px |
| Link sull'immagine (`88d7083`) | Clic sul play: link sotto il puntatore, cursore `pointer`, nuova scheda verso l'esperienza, un `outbound_click`. Ordine del focus: solo i tre CTA. Per ogni esperienza l'albero di accessibilità ha l'immagine con il suo testo alternativo e un solo link |
| axe sulla build di `88d7083` | Nessuna violazione a 1440 px. A 390 px compaiono errori di contrasto solo se axe gira mentre i testi stanno ancora entrando in dissolvenza (`data-reveal`): dopo l'ingresso, e con il movimento ridotto, nessuna violazione. Non dipendono dal link |
| Inventario degli attributi (`88d7083`) | 158 elementi tracciati con `data-cta-location`, esclusi i `nav_click`; 15 valori, tutti nell'elenco chiuso del piano. Rispetto a prima, solo i tre link sulle schermate |

Payload a confronto, primo esempio, uguali a 390 e a 1440 px:

```json
{"event":"outbound_click","page_type":"siii","cta_id":"siii-showcase-masseria-santella-schermata","cta_location":"esempi","outbound_type":"esperienza-siii","destination_id":"masseria-santella","link_url":"https://www.cassanodigitale.it/masseriasantella/","link_domain":"www.cassanodigitale.it"}
{"event":"outbound_click","page_type":"siii","cta_id":"siii-showcase-masseria-santella","cta_location":"esempi","outbound_type":"esperienza-siii","destination_id":"masseria-santella","cta_text":"Entra nell’esperienza","link_url":"https://www.cassanodigitale.it/masseriasantella/","link_domain":"www.cassanodigitale.it"}
```

## 3. Osservazioni

### 1. [IMPORTANTE, risolta] Il pulsante play degli esempi: ora la schermata apre l'esperienza
- **Dove:** `/siii/#esempi`, `src/pages/siii.astro`, `.example__screen` e `.example__screen-link`.
- **Decisione dell'utente del 2026-10-07:** «metti il link anche sull'immagine non solo su Entra nell'esperienza. Il link deve aprire una nuova scheda, non nella stessa». Applicata nel commit `88d7083`.
- **Perché è la scelta giusta anche per la conversione:**
  - La vista d'apertura ha un grande play al centro, il segno più forte di «clicca qui» che un'immagine possa avere. Prima del link non faceva nulla, e il tentativo non lasciava traccia.
  - Nel primo esempio, quello più grande, chi guardava il play non vedeva il CTA (§2).
  - Entrare in un'esperienza è la micro-conversione della pagina (KPI «Prova del prodotto», piano §3). Il link mantiene la promessa del play: si apre la stessa schermata, nell'esperienza vera.
- **Nomi degli eventi verificati** (§2):
  - immagine e CTA mandano lo stesso evento, `outbound_click`, con `outbound_type` `esperienza-siii`, `cta_location` `esempi` e lo stesso `destination_id`. È corretto: la destinazione è un altro dominio, e `cta_click` vale solo per le destinazioni interne (piano, §4);
  - si distinguono per il `cta_id`: `siii-showcase-<id>-schermata` per l'immagine, `siii-showcase-<id>` per il CTA. Un filtro «inizia con» `siii-showcase-<id>` li prende tutti e due;
  - l'immagine non ha testo visibile, quindi non manda `cta_text`. Per distinguere i due clic non si usa `cta_text`, si usa il `cta_id`.
- **Dettagli di implementazione, conformi:**
  - `z-index: 3` mette lo strato sopra le ante dell'apertura, che comunque non intercettano i clic (`pointer-events: none`);
  - il link è fuori dall'ordine di tabulazione e nascosto alle tecnologie assistive: per ogni esperienza resta un solo link, il CTA, e l'immagine conserva il suo testo alternativo.

  La conferma di accessibilità spetta a ux-designer.
- **Facoltativo** (ui-designer): al passaggio del mouse, un piccolo «↗» sulla schermata, per ricordare che si apre una nuova scheda come per il CTA. Il cursore a mano basta già a dire che è cliccabile.
- **Dopo il lancio:** l'anteprima «Prova qui», in cui il play carica l'esperienza nella pagina, resta l'evoluzione possibile (verdetto G4). Richiede la verifica dei cookie dei portali (piano, §1, condizione 4) e una misura di performance. Il rapporto tra clic sull'immagine e clic sul CTA aiuterà a decidere (§5).

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

  3. Se al go-live il consenso manca per una sola impresa, si toglie la sua schermata, con il suo link, e si torna allo slot (`<Media asset={ex.slot} pendingText={false} />`); nome, CTA e link all'esperienza restano (LG §12).

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
| **Esempi**: la vista d'apertura, «piccolo pianeta» con il play | È la schermata che si trova aprendo l'esperienza: la promessa del play e del CTA «Entra nell'esperienza» è mantenuta. Il «piccolo pianeta» incuriosisce e si distingue a colpo d'occhio da una foto | **Ok**, con il link dell'oss. 1 |
| **Home, capitolo 01**: l'interno con il menu delle azioni e l'assistente | Mostra che dentro lo spazio si chiede e si contatta, coerente con il testo del capitolo. Nessun play, quindi poco rischio di clic a vuoto | **Ok.** Per «e prenota» vedi oss. 3 |

## 5. Piano di misurazione
Aggiornati `docs/cro/piano-misurazione.md` (v0.5), `docs/cro/strategia-conversione.md` (v0.5) e `docs/cro/backlog-esperimenti.md` (v0.3).
- **Nessun evento nuovo.** I tre link sulle schermate usano `outbound_click`, come il CTA. Gli elementi tracciati passano da 155 a 158 e i valori restano nell'elenco chiuso.
- **Immagine e CTA nel KPI «Prova del prodotto».** Il KPI conta tutti e due. Si distinguono con il `cta_id`:
  - fine in `-schermata`: clic sull'immagine;
  - altrimenti: clic sul CTA.

  Il rapporto tra i due dice se le persone entrano dalla schermata. Servirà per decidere sull'anteprima «Prova qui».
- **Persone, non clic.** Chi clicca prima l'immagine e poi il CTA conta due volte: per sapere quante persone entrano in un'esperienza si contano le sessioni con almeno un `outbound_click` di tipo `esperienza-siii`.
- **Il link sull'immagine non ha `cta_text`.** Nei report risulta senza valore: si legge dal `cta_id`.
- **Regola ribadita nel piano:** un link verso un altro dominio è sempre `outbound_click`, anche se ripete un CTA. `cta_click` solo per le destinazioni interne.

## 6. Verdetto di dominio

**Conversione: approvato con modifiche.**
- **Oss. 1 chiusa.** Il link sull'immagine è applicato in `88d7083` e il tracciamento è corretto. Resta la conferma di accessibilità di ux-designer.
- **Prima del go-live:**
  - l'oss. 2: consenso registrato, oppure le schermate tolte; il controllo di go-live è consigliato subito;
  - l'oss. 3: la scelta su «Vendita diretta» passa dalla riserva I7 dell'ADR 002.
- **Facoltative:** oss. 4 e 5.

La sintesi e il verdetto di gate spettano al creative-director.

## 7. Fonti
- Airbnb, [Trademark Guidelines](https://www.airbnb.com/help/article/3233): uso dei loghi solo con permesso scritto, nessun uso che faccia pensare a partnership, sponsorizzazione o approvazione. Consultate il 2026-10-07 attraverso i risultati di ricerca: il sito non è stato aperto dall'ambiente.
- Booking Holdings, [Brand Guidelines](https://www.bookingholdings.com/brand-guidelines/): nessun uso che suggerisca approvazione, sponsorizzazione o proprietà senza accordo scritto. Consultate il 2026-10-07 attraverso i risultati di ricerca. Le regole specifiche del logo Booking.com per terzi sono [DA VERIFICARE].
- Prove del 2026-10-07: staging del commit `d06a3e9`; build del commit `88d7083` fuori da `dist/`, con le richieste esterne simulate; Playwright 1.56, Chromium 141, axe-core 4.13.

## Ipotesi da validare
- [IPOTESI] Chi vede il play prova a cliccarlo. Lo dirà il rapporto tra clic sulla schermata e clic sul CTA, quando ci sarà uno strumento di analytics, e prima ancora i test con utenti.
- [IPOTESI] Per le strutture ricettive «vendita diretta» significa prenotazione senza intermediari: da verificare nelle interviste di E1 o con chi gestisce le richieste.

## Domande aperte
- **Utente:** le tre imprese hanno dato il consenso scritto a comparire con nome e schermate (A7)?
- **Cliente:** in qualche SIII la prenotazione o la vendita avviene senza piattaforme terze (I7, N13)? C'è una schermata di un'azione commerciale senza marchi di terzi?
- **ux-designer:** conferma di accessibilità del link sull'immagine, fuori dall'ordine del focus e nascosto alle tecnologie assistive (oss. 1).

## Decisioni richieste
- **ux-designer:** accessibilità del link sull'immagine (oss. 1).
- **Sessione principale:** applicare il controllo di go-live dell'oss. 2.
- **Utente e brand-strategist:** consenso A7 (oss. 2); riserva I7 su «Vendita diretta» e «prenota» (oss. 3).
- **creative-director:** sintesi; didascalia della hero (oss. 4).
