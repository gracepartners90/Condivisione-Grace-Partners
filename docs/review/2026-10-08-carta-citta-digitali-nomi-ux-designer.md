---
titolo: Carta d'Italia di /citta-digitali/ con i nomi delle città · verifica di accessibilità
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.4
aggiornato: 2026-10-08
fonti: [richiesta dell'utente del 2026-10-08 riferita dalla sessione principale («la mappa in città digitali, mettiamo anche lì qualche nome di città tra le più importanti»), commit 426e6dc, src/components/sections/LocationShowcase.astro, src/components/ui/MapItaly.astro, src/lib/citta-digitali.ts, src/pages/citta-digitali.astro, src/pages/index.astro, docs/ux/accessibilita.md (0.10, §2.8 e §2.14, Appendici A e D), docs/ux/struttura-pagine.md (0.10, CD-2 e HM-5), docs/creativa/direzione-visiva.md (0.15, §1.4), docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md (L6), docs/review/2026-10-06-descrizione-carta-home-ux-designer.md (regola dei nomi, scelta B), staging http://127.0.0.1:4321 a 426e6dc, copia del repository a 426e6dc con la patch (build in locale), albero di accessibilità via CDP (Chromium 141) e axe-core 4.13 del 2026-10-08; per §6: docs/review/2026-10-08-carta-citta-digitali-nomi-ui-designer.md (§2.2 e patch B), commit 5f2f757, b71268e (L8) e a95b5c6 (patch A), copie della HEAD c2d368a con e senza la patch B (build in locale); per §7: docs/review/2026-10-08-schede-citta-digitali-1412-in-build-ui-designer.md (§4 e §7, variante B2), commit 474e2df (patch B) e 21faf34, copie della HEAD 21faf34 con la patch B e con la variante B2 (build in locale; la B uguale byte per byte allo staging, la B2 alla build di ui-designer); per §8: docs/review/2026-10-08-schede-citta-digitali-1412-creative-director.md (§2 variante E, §3 proposta M), commit 51d23cd e d5ad7b0, staging http://127.0.0.1:4321 (d5ad7b0, B2 ed E), build della B su :4362 e di B2, E e M su :4392]
oggetto: carta d'Italia della sezione «L'Italia in un unico portale» di /citta-digitali/, dopo il commit 426e6dc; dalla 1.1 anche le schede delle città con le spaziature di 1.4.12 (§6); dalla 1.2 la variante B2 (§7); dalla 1.3 la variante E e la proposta M (§8); nella 1.4 lo stato di M, adottata e applicata
---

# Carta d'Italia di `/citta-digitali/` con i nomi delle città

## In sintesi
- **Variante E, nel sito dal commit d5ad7b0: conforme a 1.4.12, 1.3.2 e 2.4.3 (§8, aggiunto nella 1.3).**
  - Con le spaziature «Caltanissetta» resta intero, e «Esplora» va sotto il nome.
  - Lo scarto tra ordine a schermo e ordine del DOM è quello di prima: «Esplora» si vede accanto o sotto il nome, ma si legge dopo la descrizione. Il nome del link è completo e la scheda ha una sola fermata, quindi né il senso né l'ordine del focus cambiano.
- **Proposta M: sì, la consiglio.** Aggiornamento: ui-designer l'ha adottata senza il ripiego con `@supports` (commit aef5d32), ed è nel sito dal commit ae91aa2. Con i testi di oggi non cambia nulla, e con le spaziature dell'utente lascia il posto alle sue. Con testi più lunghi, e nel ripiego senza unità di contenitore, il filetto della scheda dopo resta a 27 px dal testo invece di 3. Con M il ripiego con `@supports` non serve più per l'accessibilità: se ui-designer lo vuole per l'impaginato, è compatibile.
- **[IMPORTANTE] Variante B2 al posto della patch B: sì (§7, aggiunto nella 1.2).**
  - Con la B2 le schede stanno sempre dentro la sezione, qualunque sia la lunghezza del testo. Con la B bastano 4 parole in più nella descrizione di Caltanissetta perché, con le spaziature, il testo esca dalla sezione e diventi illeggibile sul fondo chiaro di quella dopo.
  - Il resto non cambia. Senza spaziature l'impaginato è identico; nessun testo si copre; ordine di lettura, Tab e scheda → nodo restano uguali.
  - Il ripiego dei browser senza unità di contenitore è accessibile. Ho un suggerimento per l'impaginato, a ui-designer.
- **[IMPORTANTE] Schede da 1280 px con le spaziature di 1.4.12: scelgo la patch B di ui-designer (§6, aggiunto nella 1.1).**
  - Il problema l'ha trovato ui-designer, ed era presente già prima di 426e6dc. Con le spaziature «Caltanissetta» passa sotto «Esplora ↗», e tra 1280 e 1345 px il testo di Altamura tocca o copre l'inizio della scheda di Caltanissetta.
  - Con la patch B, provata sulla HEAD c2d368a, non si copre più nulla, e senza spaziature non cambia niente.
  - La soglia a 86em non basta: da 1376 px «Caltanissetta» resta sotto il link, e a 1280 e 1366 px toglie l'allineamento a tutti.
- **La carta con i nomi, così com'è nel commit 426e6dc, è accessibile.** Le schede accanto no: vedi il punto sopra.
  - È un'immagine con una descrizione, e i nomi disegnati sono `aria-hidden`.
  - L'ordine di lettura non cambia, e il nodo si accende dalla scheda con il mouse e con la tastiera.
  - Colori forzati, zoom e spaziature del testo non fanno perdere nulla sulla carta.
  - Sulla carta, nessun problema bloccante o importante.
- **Un suggerimento, con patch (§3).** La descrizione è quella del capitolo 03 della Home, quindi nomina anche Varese, Altamura e Caltanissetta. Chi usa lo screen reader sente queste tre città quattro volte di fila: nel testo, nello statement, nella descrizione e nelle schede. Propongo di togliere dalla descrizione le città che hanno una scheda: «… Tra queste: Itri e Cosenza.», 166 caratteri invece di 199.
  - **Applicato** nel commit 5f2f757. Poi copywriter-brand ha scelto la formula L8 (commit b71268e): «… Tra queste anche Itri e Cosenza.», 171 caratteri.
- **Per questa carta la L6 non vale più.** La carta ora disegna città che il testo non nomina: Itri e Cosenza a ogni larghezza, Bari e Caltagirone da 1024 px. Ho aggiornato:
  - `docs/ux/accessibilita.md` 0.11: riga «Carte» di §2.8, regola dei nomi d'esempio, registro;
  - `docs/ux/struttura-pagine.md` 0.11: CD-2, e HM-5 per la P4 già applicata.
- **Sono da allineare anche documenti di altri membri** (§5):
  - la direzione visiva §1.4, regola 9: «la carta non porta nomi»;
  - la descrizione L6 in `alt-text.md` e nel copy deck di Città Digitali.

  **Allineati** dagli owner: direzione visiva 0.17, `alt-text.md` 1.9, copy deck di Città Digitali 1.5.

## 1. Che cosa è cambiato con 426e6dc
- **Nomi.** `LocationShowcase` ha una nuova opzione, `cityDots.names`. Con questa opzione la carta usa gli stessi nomi della carta del capitolo 03 della Home (`<MapItaly map="italia" cities>`). Misurati sulla staging:

  | Finestra | Larghezza della carta | Nomi |
  |---|---|---|
  | 320–1023 px | 280–352 px, cioè al massimo 25rem | 5: Varese, Itri, Altamura, Cosenza, Caltanissetta |
  | da 1024 px | 463–730 px | 7: i cinque, più Bari e Caltagirone |

- **Descrizione.** `describeCittaDigitali(italyNamesAtEveryWidth())` dà la stessa descrizione del capitolo 03, di 199 caratteri: «Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Itri, Altamura, Cosenza e Caltanissetta.»
- **Legenda.** Resta la L1 in `<figcaption>`: «Ogni punto è una città di Città Digitali».

## 2. Verifica sulla staging (426e6dc)

| Prova | Come | Esito |
|---|---|---|
| Ordine di lettura | Albero di accessibilità via CDP, da 320 a 1440 px | Le voci arrivano in quest'ordine: H2 «L’Italia in un unico portale.», testo, statement, «Tutte le città sul portale ↗», immagine con la descrizione, legenda, poi le tre schede Varese, Altamura e Caltanissetta (H3 e «Esplora …»). L'ordine è lo stesso a ogni larghezza |
| Testo dentro l'immagine | Albero e DOM | I 7 nomi sono tutti `aria-hidden`, e lo è anche l'`<svg>`. L'immagine è una foglia: nessun nome si legge due volte |
| Esplorazione al tocco (emulata) | `DOM.getNodeForLocation` e primo antenato non ignorato, a 390 e 1440 px. Toccati ogni nome, un nodo e un punto | Ogni tocco legge l'immagine con la sua descrizione, e la legenda si legge da sola |
| Tastiera | Giro di Tab | La carta non ha fermate. Nella sezione restano il link al portale e i tre «Esplora» |
| Scheda → nodo | Focus su «Esplora» e mouse sulla scheda, a 320, 390, 768, 1024 e 1440 px | Il nodo si ingrandisce di 1,5 volte e si spegne all'uscita. Nodo ingrandito e anello stanno a 4,3–5,8 px dal nome della città, e non coprono altri nomi. Con i colori forzati il nodo ingrandito è in `CanvasText`. È solo un'eco visiva, perché le città sono già nominate nelle schede: non c'è nulla da annunciare |
| Sovrapposizioni, reflow | Da 320 a 1440 px, con e senza le spaziature di 1.4.12 | Nessun nome si sovrappone o esce dalla carta, e la pagina non scorre in orizzontale. Misuravo solo i nomi della carta, non le schede tra loro: vedi §6 |
| Contrasto | Colori calcolati, a 390 e 1440 px | Nomi 16,5:1, in Fragment Mono da 12 e 13 px. Punti e nodi 6,4:1 sul fondo della sezione, oltre il 3:1 di 1.4.11 |
| Colori forzati | Appendici D.1 e D.2, palette scura e chiara, a 390 e 1440 px | Nessun segnale. I 45 segni e i nomi sono in `CanvasText`, la linea di richiamo di Altamura si vede e ogni fermata ha il suo contorno |
| Zoom | 150%, 200% (640 × 400) e 400% (320 × 256) | Nessuna sovrapposizione, nessuno scorrimento orizzontale, e la legenda resta nella pagina |
| axe-core 4.13 e Appendice A | `/citta-digitali/` e Home, a 390 e 1280 px | Nessun problema: violazioni, ancore e focus coperto dall'header |

## 3. [SUGGERIMENTO] Descrizione senza le città delle schede
- **Dove.** `src/pages/citta-digitali.astro`, `cityDots.label`.
- **Problema.** Sulla staging, chi usa lo screen reader sente le tre città delle schede quattro volte in pochi secondi:
  1. nel testo, «… città come Varese, Altamura e Caltanissetta.»;
  2. nello statement, «Da Varese a Caltanissetta, passando per Altamura…»;
  3. nella descrizione della carta;
  4. nelle schede, subito dopo la legenda.

  La descrizione è il terzo passaggio, e sono 3 nomi su 5. L'informazione che la carta aggiunge al testo sono le regioni, la regione più fitta, Itri e Cosenza.
- **Motivazione.**
  - WCAG 1.1.1 è rispettato anche oggi. Il problema è l'efficienza: è lo stesso ragionamento della L6 del 2026-10-05, che toglieva i nomi perché le tre città erano già nel testo e nelle schede.
  - La regola di `accessibilita.md` §2.8 vuole che la descrizione dica ciò che la carta aggiunge al testo accanto.
  - Le città delle schede hanno ora lo stesso trattamento della sede nella L7: la sede ha la sua frase e non si ripete tra gli esempi.
- **Perché non tornare alla L6, senza nomi.** Toglierebbe a chi usa lo screen reader due città, Itri e Cosenza, che chi vede legge sulla carta a ogni larghezza. La regola dei nomi d'esempio (decisione del 2026-10-06) vuole nella descrizione tutti i nomi disegnati a ogni larghezza, salvo le eccezioni di §2.8.
- **Perché la Home resta com'è** (5 nomi, scelta B):
  - nel capitolo 03 non ci sono schede;
  - il testo nomina le tre città una volta sola, e dopo la carta.

  Lì chi usa lo screen reader le sente due volte, ed è la carta a presentarle per prima.
- **Proposta.** La descrizione del capitolo 03, senza le città delle schede (166 caratteri, sotto il tetto di 250):
  > Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Itri e Cosenza.

  La patch filtra i nomi con l'elenco `cities` delle schede, già presente nella pagina. Se cambiano le città delle schede o i nomi disegnati, la descrizione si aggiorna da sola.

  Copia della patch: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ux-cdn/cd-names.patch`.

```diff
diff --git a/src/pages/citta-digitali.astro b/src/pages/citta-digitali.astro
index 21d8d73..23585b2 100644
--- a/src/pages/citta-digitali.astro
+++ b/src/pages/citta-digitali.astro
@@ -97,9 +97,11 @@ const cities = italyPlaces.map((p) => ({
     location="luoghi"
     cityDots={{
       // Legend: copywriter-brand L1. The map draws the names of the Home map (user, 2026-10-08: «qualche
-      // nome di città tra le più importanti»); its text alternative names those drawn at every width.
+      // nome di città tra le più importanti»). Its text alternative names those drawn at every width,
+      // except the cities of the cards: screen readers hear them in the text before the map and in the
+      // cards right after it (ux-designer, 2026-10-08; L6).
       legend: 'Ogni punto è una città di Città Digitali',
-      label: describeCittaDigitali(italyNamesAtEveryWidth()),
+      label: describeCittaDigitali(italyNamesAtEveryWidth().filter((name) => !cities.some((c) => c.name === name))),
       names: true,
     }}
     allPlaces={{
```

- **Prove sulla copia (base 426e6dc).**
  - `git apply --check` passa sul repository.
  - `astro check` dà 0 errori e 0 avvisi.
  - Rispetto alla build della stessa base cambia solo l'`aria-label` della carta di `/citta-digitali/`. Le altre pagine sono identiche byte per byte.
  - axe e Appendice A non segnalano problemi su `/citta-digitali/`, a 390 e 1280 px.
  - All'esplorazione al tocco ogni nome, nodo e punto legge la nuova descrizione, di 166 caratteri.
  - A schermo non cambia nulla.

## 4. Regola aggiornata
Ho aggiornato i nomi d'esempio in `docs/ux/accessibilita.md` §2.8, riga «Carte».
- **Regola.** Si nominano quelli disegnati a ogni larghezza, classe più stretta compresa, con due eccezioni:
  - la sede, che ha la sua frase;
  - le città che hanno una scheda propria nella stessa sezione della carta, perché si sentono nelle schede.
- **Ambito.** «Stessa sezione» è voluto. Sulla hero di `/puglia-digitale/`, Monopoli e Gravina in Puglia restano nella descrizione L7: le loro porte sono in un'altra sezione, «I luoghi», più in basso.

## 5. Documenti
**Aggiornati (miei):**
- `docs/ux/accessibilita.md` 0.11:
  - riga «Carte» di §2.8: carta di `/citta-digitali/` con i nomi; Puglia intera nel capitolo 02 della Home con la P4; regola dei nomi d'esempio;
  - registro: nuova riga del 2026-10-08. La riga della L6 (2026-10-05) e quella della Terra di Bari (2026-10-07) sono segnate come superate;
  - «Decisioni richieste»: la patch da applicare.
- `docs/ux/struttura-pagine.md` 0.11:
  - CD-2: nomi, scheda → nodo, descrizione;
  - HM-5: la carta 02 è la Puglia intera con la L7, e la Terra di Bari non c'è più.

**Da allineare (non miei):**
- **creative-director**, `docs/creativa/direzione-visiva.md` §1.4:
  - la regola 9 dice che la carta accanto a schede non porta nomi: la richiesta dell'utente la supera;
  - i conteggi, «quella di `/citta-digitali/` 138» caratteri e «42 punti e i 3 nodi delle schede, senza nomi (regola 9)»;
  - la descrizione L6 citata come vigente.
- **copywriter-content**:
  - `docs/contenuti/alt-text.md`, riga «Carta di `/citta-digitali/`»;
  - `docs/contenuti/copy-deck/citta-digitali.md`, «Descrizione della carta» (ancora la L6) e «Dettagli della carta» («Nessun nome sulla carta»).

## 6. [IMPORTANTE] Schede da 1280 px con le spaziature di 1.4.12 (decisione del 2026-10-08)
- **Fonte.** `docs/review/2026-10-08-carta-citta-digitali-nomi-ui-designer.md` §2.2, con la patch B nel §5.
- **Dove.** `src/components/sections/LocationShowcase.astro`, variante `italy`, regole da 80em. Le schede sono in posizione assoluta, ognuna alla latitudine del suo nodo: una scheda più alta non sposta la successiva.
- **Problema.** Ho misurato sulla build della HEAD c2d368a, con le spaziature di `accessibilita.md` §4.3, in 131 finestre da 1280 a 1920 px:
  - **«Caltanissetta» passa sotto «Esplora ↗» a ogni finestra**, da 28 a 105 px. Il titolo è largo quanto la parola, quindi la rete di sicurezza `overflow-wrap` non scatta;
  - **il testo di Altamura copre l'inizio della scheda di Caltanissetta**, fino a 37,5 px a 1280 px. Le due schede si toccano ancora a 1345 px, e fino a 1380 px restano meno di 3,5 px tra l'una e l'altra.

  È WCAG 1.4.12, livello AA, quindi una soglia del progetto. Il problema c'era già prima di 426e6dc.
- **La mia verifica non l'aveva visto.** Nella prova del §2 misuravo i nomi della carta contro punti, nodi e bordi, ma non i blocchi di testo delle schede tra loro. Ho corretto la procedura in `accessibilita.md` §4.3.
- **Decisione: patch B.**
  - **Corregge i due problemi per costruzione.** Le schede tornano nel flusso, e una scheda più alta spinge in basso la successiva invece di coprirla. Vale per qualunque testo più lungo, non solo per le spaziature della prova.
  - **Senza spaziature non cambia nulla.**
  - **Ordine del DOM, albero di accessibilità e ordine di tabulazione restano identici.**
  - **Il costo tocca solo chi applica le spaziature:** le schede scendono sotto la latitudine del loro nodo. L'associazione tra scheda e nodo però non dipende più dall'allineamento:
    - dal commit 426e6dc la carta scrive i tre nomi accanto ai nodi;
    - l'ordine da nord a sud è lo stesso;
    - il nodo si accende dalla scheda.
- **Alternativa scartata: la soglia del layout allineato a 86em.**
  - Da sola non basta: da 1376 px «Caltanissetta» resta sotto «Esplora ↗». Servirebbe comunque la regola del titolo della patch B.
  - Sopra la soglia le schede restano in posizione assoluta, con meno di 3,5 px tra Altamura e Caltanissetta fino a 1380 px: basta una riga in più per tornare a coprirsi.
  - A 1280 e 1366 px, due larghezze comuni dei portatili, toglierebbe l'allineamento a tutti, per un problema che riguarda solo chi applica le spaziature.
- **Prove della patch B sulla HEAD c2d368a.** Copie mie con e senza la patch, build in locale.

| Prova | Esito |
|---|---|
| `git apply --check` | Passa sulla HEAD c2d368a. Due blocchi entrano con 4 righe di scarto |
| Senza spaziature, 184 finestre da 320 a 1920 px | Schede, carta, legenda e sezione restano dove sono nella HEAD, entro 0,04 px. Su `/puglia-digitale/` cambia solo il CSS, che nessun elemento della pagina usa |
| Con le spaziature di 1.4.12, 131 finestre da 1280 a 1920 px | Nessun testo copre la scheda successiva: restano almeno 42,9 px. «Caltanissetta» va a capo dentro la sua colonna, ad almeno 24 px da «Esplora ↗». L'ultima scheda resta nella sezione, con almeno 17 px di margine. Nessuno scorrimento orizzontale |
| Con le spaziature, da 320 a 1279 px | Come la HEAD: sotto i 1280 px la patch non tocca l'elenco |
| Caratteri predefiniti a 20 e 24 px (`Page.setFontSizes` via CDP), da 1600 a 2560 px | Nessuna sovrapposizione, come nella HEAD: le soglie dei layout seguono la dimensione dei caratteri |
| Albero di accessibilità e Tab, a 390, 1024, 1280, 1440 e 1920 px, con e senza spaziature | Sequenza identica alla HEAD: H2, testo, statement, link al portale, carta, legenda, poi Varese, Altamura e Caltanissetta. Il Tab passa dal link al portale ai tre «Esplora» |
| Scheda → nodo, a 1280, 1440 e 1920 px, con e senza spaziature | Il focus su «Esplora» accende solo il suo nodo, che si spegne all'uscita. Il mouse accende il nodo su tutta la fascia della scheda, dal suo filetto a quello della successiva: sotto il testo di Varese la fascia arriva a 230 px. Si accende un nodo alla volta, e le fasce non arrivano mai sulla carta (125–154 px di stacco) |
| axe-core 4.13 e Appendice A, `/citta-digitali/` e `/puglia-digitale/`, a 390 e 1280 px | Nessun problema |

- **Costi accettati.**
  - Con le spaziature le schede scendono fino a 196 px sotto il loro nodo (Caltanissetta, a 1280 px), e la sezione si allunga.
  - Il titolo «Caltanissetta» va a capo a metà parola, senza trattino. Succede lo stesso in ogni titolo del sito: è la rete di sicurezza `overflow-wrap` (A5).
  - La fascia che accende il nodo arriva fino alla scheda successiva.
    - È un'eco visiva: non mostra contenuti e non c'è nulla da chiudere, quindi 1.4.13 non si applica.
    - Tastiera e focus non cambiano.
- **Patch.** È quella di ui-designer, senza modifiche: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/diff/citta-digitali-schede-1412.patch`. Il diff è nella sua review, §5.

## 7. [IMPORTANTE] Variante B2 al posto della patch B (decisione del 2026-10-08)
- **Fonte.** `docs/review/2026-10-08-schede-citta-digitali-1412-in-build-ui-designer.md`: §4 per i due effetti della B e la proposta, §7 per la patch.
- **Stato.** La patch B è nel sito dal commit 474e2df. La B2 è una patch di poche righe sopra la B:
  - calcola le latitudini sull'altezza della carta, ricavata dalla larghezza della griglia con le unità di contenitore (`container-type: inline-size` su `.places__italy`, `--map-h` in `cqw`), e non più sull'altezza dell'elenco;
  - lascia scendere l'ultima scheda sotto la carta al massimo di `--space-4xl`. Oltre, cresce la riga, e con lei la sezione.
- **Il problema della B, per 1.4.12.**
  - Con le spaziature l'elenco diventa più alto della carta, e le percentuali si calcolano sull'elenco cresciuto. Il contenuto supera l'elenco e consuma l'aria in fondo alla sezione: ne restano 17–24 px.
  - La sezione dopo ha il fondo calce, e il testo delle schede è chiaro. Basta un testo un po' più lungo perché l'ultima riga esca dalla sezione e non si legga più.
  - È una perdita di contenuto con le spaziature dell'utente, cioè una mancanza di 1.4.12, e nessun controllo automatico la vede.
- **Decisione: la B2 sostituisce la B.**
  - Toglie la dipendenza dalla lunghezza del testo. Con le spaziature, sotto l'ultima scheda restano sempre almeno 145 px, anche con 32 parole in più.
  - Senza spaziature cambia nulla.
  - Con le spaziature si sposta solo la scheda che deve: oggi Caltanissetta. È anche la risposta alla domanda sull'allineamento che avevo posto al creative-director nel §6.
  - Ordine del DOM, albero di accessibilità, ordine di tabulazione e scheda → nodo restano quelli della B.
- **Prove, con il metodo di `accessibilita.md` §4.3.** Copie mie della HEAD 21faf34: una con la B, uguale byte per byte allo staging, e una con la B2, uguale byte per byte alla build di ui-designer. La patch passa `git apply --check` sulla HEAD.

| Prova | Patch B | Variante B2 |
|---|---|---|
| Senza spaziature, 188 finestre da 320 a 1920 px | — | Posizioni identiche alla B entro 0,04 px. La sezione è identica byte per byte, in immagine, a 1024, 1280, 1366, 1440 e 1920 px |
| Con le spaziature, 131 finestre da 1280 a 1920 px: testi che si coprono | Nessuno: almeno 42,9 px tra le schede e 24,1 px tra titolo e «Esplora» | Uguale |
| Con le spaziature: discesa sotto il proprio nodo | Varese 11–29 px, Altamura 50–135, Caltanissetta 77–215 | Varese 0, Altamura 0, Caltanissetta 12–80 |
| Con le spaziature: aria sotto l'ultima scheda | 17–24 px | 145–187 px |
| Testi più lunghi, 65 finestre da 1280 a 1920 px, con le spaziature: +4, +8, +16 e +32 parole a Caltanissetta; +4, +8 e +16 ad Altamura; +16 a Varese; +8 a tutte e tre | Il testo esce dalla sezione in 7 casi su 9, fino a 196 px; in un altro restano 0,7 px. Con +4 parole a Caltanissetta esce di 10 px, a 1920 px | Mai: sempre almeno 145 px sotto l'ultima scheda. Nessun testo copre la scheda successiva |
| Gli stessi testi, senza spaziature | Con +32 parole a Caltanissetta il testo esce di 49 px | Sempre almeno 106 px |
| Caratteri predefiniti del browser a 20 e 24 px, con le spaziature, da 1600 a 2560 px | Nessuna sovrapposizione; 18–35 px in fondo | Nessuna sovrapposizione; 181–262 px in fondo. Varese e Altamura restano al loro nodo |
| Albero di accessibilità e Tab, a 390, 1280, 1440 e 1920 px, con e senza spaziature | — | Identici alla B |
| Scheda → nodo, a 1280, 1440 e 1920 px, con e senza spaziature | — | Uguale alla B: si accende solo il proprio nodo, un nodo alla volta, mai dalla carta. Con le spaziature la fascia vuota sotto Varese è di 90–141 px invece di circa 200 |
| axe-core 4.13 e Appendice A | — | Nessun problema a 390 e 1280 px. Con le spaziature, 0 violazioni a 1280 e 1920 px |

- **Testi un po' più lunghi senza spaziature.** Con 16 parole in più ad Altamura, la scheda sotto parte 3 px dopo l'ultima riga. Succede con la B e con la B2: il testo non si copre, ma il filetto tocca quasi la riga. Lo segnalo per l'impaginato; per 1.4.12 non è un problema.
- **Ripiego senza unità di contenitore** (Safari prima della 16, Firefox prima della 110).
  - **Come l'ho provato.** In Chromium ho reso non valido `--map-h`, come fa un browser che non conosce `cqw`: `height` e `min-height` tornano ai valori iniziali. Ho anche tolto `container-type`.
  - **Esito.** Le schede si impilano dall'alto della carta, senza latitudine. Nessun testo si copre e nessuno scorrimento orizzontale. Con le spaziature restano almeno 145 px sotto l'ultima scheda, anche con i testi più lunghi e con i caratteri a 24 px.
  - L'ordine di lettura è quello del DOM, quindi non cambia.
  - **Accessibile: lo accetto.**
  - **[SUGGERIMENTO] per ui-designer.** Nel ripiego le schede si toccano: tra il testo di una scheda e il filetto della successiva restano 3 px. Un blocco `@supports not (width: 1cqw)` potrebbe rimettere l'elenco della fascia 1024–1279 px (`display: grid` con `gap: var(--space-xl)`, senza `::before`). L'ho provato emulando il ripiego: 51 px tra le schede e nessuna sovrapposizione. È una scelta di impaginato, non una condizione.
- **Limiti della B2, già scritti da ui-designer.**
  - La formula vale finché la carta occupa le colonne 7 / −1 di 12. Se cambiano le colonne, le schede si disallineano ma non si coprono, perché restano nel flusso.
  - Le unità di contenitore vanno riprovate in Safari e Firefox reali. `[DA VERIFICARE]`
- **«Caltaniss / etta».** Per l'accessibilità vanno bene sia l'a capo di oggi sia `hyphens: auto`: non si perde nulla. Decide il creative-director.
- **Patch.** `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/diff/citta-digitali-schede-1412-b2.patch`, quella di ui-designer, senza modifiche. Il testo è nella sua review, §7.

## 8. Variante E nel sito e proposta M (verifica del 2026-10-08)
- **Fonte.** Verdetto del creative-director, `docs/review/2026-10-08-schede-citta-digitali-1412-creative-director.md`: §2 per la variante E, §3 per la proposta M.
- **Che cosa fa E.** Da 80em la scheda passa da griglia a flex che va a capo, con `order` 1, 2 e 3: nome, «Esplora» spinto a destra (`margin-inline-start: auto`), poi regione e descrizione su righe loro.
  - Quando nome e «Esplora» stanno su una riga, l'impaginato è quello di prima.
  - Quando non ci stanno, «Esplora» va sotto il nome, sul bordo destro, e il nome resta intero.
  - Il DOM non cambia: nome, regione, descrizione, «Esplora».
- **Che cosa fa M.** Da 80em, un margine di `--space-m` sotto la descrizione di ogni scheda tranne l'ultima.
- **Prove, con il metodo di `accessibilita.md` §4.3.** Staging d5ad7b0 (B2 ed E) su :4321, B su :4362, B2 con E e M su :4392.

| Prova | E (nel sito) | E con M |
|---|---|---|
| Senza spaziature, 202 finestre da 320 a 2560 px | Posizioni identiche alla B entro 0,04 px: schede, nome, «Esplora», carta, legenda, sezione | Identica a E: 0 px |
| Con le spaziature, 146 finestre da 1280 a 2560 px | Nessun testo si copre, né dentro una scheda né tra due schede (almeno 42,9 px). Il nome resta su una riga, ad almeno 4,1 px dal bordo della scheda. «Esplora» va sotto il nome solo per Caltanissetta. Varese e Altamura restano al loro nodo, e Caltanissetta scende di 12–51 px. Sotto l'ultima scheda restano 145–187 px. Nessuno scorrimento orizzontale | Identica a E: 0 px. Il margine dei paragrafi dell'utente sostituisce M |
| Testi più lunghi, 65 finestre da 1280 a 1920 px: 10 varianti, da +4 parole su una scheda a +32 su tutte e tre, con e senza spaziature | Mai testo fuori dalla sezione: almeno 106 px in fondo senza spaziature, 145 con. Nessuna sovrapposizione. Senza spaziature però il filetto della scheda dopo arriva a 3 px dal testo (+16 parole ad Altamura, o +32 su tutte, a 1370 px) | Lo stesso, con almeno 27 px tra il testo e il filetto della scheda dopo |
| Caratteri predefiniti a 20 e 24 px, da 1600 a 2560 px, con e senza spaziature | Nessuna sovrapposizione, nome intero (con le spaziature, a 20 px, ad almeno 3,4 px dal bordo), almeno 179 px in fondo | Identica a E |
| Ripiego senza unità di contenitore, emulato, con i testi di oggi e con +8 parole su tutte | Schede impilate dall'alto senza sovrapposizioni, almeno 145 px in fondo. Senza spaziature però tra le schede restano 3 px | Almeno 27 px tra le schede |
| Albero di accessibilità e Tab, a 390, 1280, 1440 e 1920 px, con e senza spaziature | Identici alla B. Il Tab passa dal link al portale ai tre «Esplora» | Identici |
| Focus con le spaziature, a 1280 e 1920 px | Ogni «Esplora», anche quello andato sotto il nome, arriva a schermo, non è coperto dall'header e ha il suo contorno (2 px). Bersaglio di 44 px | — |
| Scheda → nodo, con mouse e tastiera, con e senza spaziature | Si accende solo il proprio nodo, un nodo alla volta, mai dalla carta | — |
| axe-core 4.13 e Appendice A | Nessun problema; 0 violazioni anche con le spaziature, a 1280 e 1920 px | Lo stesso |

- **1.3.2, Sequenza significativa: conforme.**
  - A schermo una scheda si legge nome, «Esplora», regione, descrizione: «Esplora» sta accanto al nome, o sotto se non ci sta. Nel DOM, e quindi per lo screen reader, «Esplora» viene dopo la descrizione.
  - È lo stesso scarto della B e della B2, dove «Esplora» stava nella seconda colonna della prima riga.
  - Il senso non cambia. Il link ha un nome completo, «Esplora Caltanissetta su caltanissettadigitale.it (si apre in una nuova scheda)». La sequenza del DOM è sensata: prima la città, poi l'azione. Il fallimento F1 (posizione CSS che cambia il significato) non si applica.
- **2.4.3, Ordine del focus: conforme.** «Esplora» è l'unica fermata della scheda. L'ordine del Tab è quello delle schede, da nord a sud, uguale all'ordine a schermo dall'alto in basso, e non cambia con le spaziature.
- **1.4.12: conforme, e migliore della B2 per chi usa le spaziature.** Il nome non si spezza più a metà parola. Se non sta nemmeno nella scheda intera, resta la rete `overflow-wrap` dei titoli (A5): nelle prove non è mai successo.
- **Parere su M: favorevole.**
  - Nessun effetto con i testi di oggi.
  - Con le spaziature non si somma al margine dell'utente.
  - Con testi più lunghi, e nel ripiego, un filetto a 3 px dal testo si legge come una sottolineatura della riga sopra. Così la scheda dopo sembra cominciare prima, e il raggruppamento a colpo d'occhio si perde. Con M lo stacco resta di 27 px.
  - Non è una soglia, ma aiuta chi legge con fatica.
- **M e il ripiego con `@supports`.**
  - Per l'accessibilità M basta. Copre con una regola sola sia i testi lunghi sia il ripiego, a cui dà 27 px tra le schede.
  - L'elenco con `@supports not (width: 1cqw)`, che avevo suggerito nel §7, resta una scelta di impaginato: darebbe al ripiego lo stacco dell'elenco tra 1024 e 1279 px. È compatibile con M, e non ho obiezioni.
  - Decide ui-designer.
- **Stato.** ui-designer ha adottato M senza il ripiego con `@supports` (aef5d32), applicata in ae91aa2. La sessione principale ha ripetuto le prove di questo paragrafo sullo staging di ae91aa2:
  - geometria identica a d5ad7b0, con e senza spaziature;
  - con i testi più lunghi senza spaziature, e nel ripiego, almeno 27 px prima del filetto;
  - con i caratteri a 20 e 24 px nessuna sovrapposizione;
  - axe senza violazioni.

## Verdetto di dominio (accessibilità)
- **La carta con i nomi è conforme a WCAG 2.2 AA per gli aspetti verificati, così com'è in 426e6dc.** I criteri verificati sono 1.1.1, 1.3.1, 1.3.2, 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 2.1.1, 2.4.3 e 2.4.7, più i colori forzati di §2.14.
- **La patch di §3 è applicata** (5f2f757), con la formula L8 (b71268e).
- **Le schede della stessa sezione, da 1280 px, non rispettavano 1.4.12** (§6). Il problema c'era già prima di 426e6dc.
  - Con la patch B, nel sito dal commit 474e2df, lo rispettano con il testo di oggi.
  - Con la variante B2 lo rispettano qualunque sia la lunghezza del testo (§7). B2 ed E sono nel sito dal commit d5ad7b0.
  - **La variante E è conforme a 1.4.12, 1.3.2 e 2.4.3** (§8).
  - M, consigliata per l'accessibilità, è adottata e nel sito dal commit ae91aa2, senza il ripiego con `@supports`.
  - Anche il ripiego senza unità di contenitore è accessibile.
- Il verdetto di gate spetta al creative-director, che decide anche l'impaginato della B2 e l'a capo di «Caltanissetta».

## Ipotesi da validare
- Con screen reader reali (NVDA, VoiceOver) la descrizione si legge come nome dell'immagine, come per le altre carte. `[DA FORNIRE: dispositivi o servizio di test]`
- «Tra queste anche Itri e Cosenza» (L8) si capisce senza ripetere le tre città delle schede: chi ascolta le ha appena sentite e le ritrova subito dopo.
- **Browser.** Le misure di §6 e §7 sono in Chromium. Le schede vanno riprovate con le spaziature anche in Safari e Firefox. Con la B2 serve anche una prova delle unità di contenitore (Safari 16 e successivi, Firefox 110 e successivi). `[DA VERIFICARE]`
- **Margine in fondo alla sezione.** Con la B restavano 17 px, e la prova andava ripetuta a ogni cambio di testo. Con la B2 la sezione contiene sempre le schede: la prova si ripete solo se cambiano le colonne della griglia.
- **Ripiego.** Ho emulato i browser senza `cqw` in Chromium, rendendo non valido il valore. Il comportamento reale va visto su un browser vecchio. `[DA VERIFICARE]`

## Domande aperte
- **Chiuse:**
  - la formula della descrizione: L8 di copywriter-brand;
  - la regola 9 della direzione visiva, allineata nella 0.17.
- **Chiuse dal verdetto del creative-director (51d23cd):**
  - impaginato della B2;
  - a capo di «Caltanissetta»: variante E, senza `hyphens`.
- **Chiusa:** M adottata da ui-designer, senza il ripiego a elenco con `@supports` (aef5d32).

## Decisioni richieste
- **Chiuse:**
  - M, applicata in ae91aa2 e riprovata sullo staging dalla sessione principale (§8, «Stato»);
  - B2 ed E, applicate in d5ad7b0 e verificate (§8);
  - la patch di §3, applicata;
  - la patch B, applicata in 474e2df e sostituita dalla B2;
  - direzione visiva, `alt-text.md` e copy deck, allineati.
