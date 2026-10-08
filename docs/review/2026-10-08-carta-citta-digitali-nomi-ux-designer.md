---
titolo: Carta d'Italia di /citta-digitali/ con i nomi delle città · verifica di accessibilità
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-08
fonti: [richiesta dell'utente del 2026-10-08 riferita dalla sessione principale («la mappa in città digitali, mettiamo anche lì qualche nome di città tra le più importanti»), commit 426e6dc, src/components/sections/LocationShowcase.astro, src/components/ui/MapItaly.astro, src/lib/citta-digitali.ts, src/pages/citta-digitali.astro, src/pages/index.astro, docs/ux/accessibilita.md (0.10, §2.8 e §2.14, Appendici A e D), docs/ux/struttura-pagine.md (0.10, CD-2 e HM-5), docs/creativa/direzione-visiva.md (0.15, §1.4), docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md (L6), docs/review/2026-10-06-descrizione-carta-home-ux-designer.md (regola dei nomi, scelta B), staging http://127.0.0.1:4321 a 426e6dc, copia del repository a 426e6dc con la patch (build in locale), albero di accessibilità via CDP (Chromium 141) e axe-core 4.13 del 2026-10-08]
oggetto: carta d'Italia della sezione «L'Italia in un unico portale» di /citta-digitali/, dopo il commit 426e6dc
---

# Carta d'Italia di `/citta-digitali/` con i nomi delle città

## In sintesi
- **La carta con i nomi, così com'è nel commit 426e6dc, è accessibile.**
  - È un'immagine con una descrizione, e i nomi disegnati sono `aria-hidden`.
  - L'ordine di lettura non cambia, e il nodo si accende dalla scheda con il mouse e con la tastiera.
  - Colori forzati, zoom e spaziature del testo non fanno perdere nulla.
  - Nessun problema bloccante o importante.
- **Un suggerimento, con patch (§3).** La descrizione è quella del capitolo 03 della Home, quindi nomina anche Varese, Altamura e Caltanissetta. Chi usa lo screen reader sente queste tre città quattro volte di fila: nel testo, nello statement, nella descrizione e nelle schede. Propongo di togliere dalla descrizione le città che hanno una scheda: «… Tra queste: Itri e Cosenza.», 166 caratteri invece di 199.
- **Per questa carta la L6 non vale più.** La carta ora disegna città che il testo non nomina: Itri e Cosenza a ogni larghezza, Bari e Caltagirone da 1024 px. Ho aggiornato:
  - `docs/ux/accessibilita.md` 0.11: riga «Carte» di §2.8, regola dei nomi d'esempio, registro;
  - `docs/ux/struttura-pagine.md` 0.11: CD-2, e HM-5 per la P4 già applicata.
- **Sono da allineare anche documenti di altri membri** (§5):
  - la direzione visiva §1.4, regola 9: «la carta non porta nomi»;
  - la descrizione L6 in `alt-text.md` e nel copy deck di Città Digitali.

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
| Sovrapposizioni, reflow | Da 320 a 1440 px, con e senza le spaziature di 1.4.12 | Nessun nome si sovrappone o esce dalla carta, e la pagina non scorre in orizzontale |
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

## Verdetto di dominio (accessibilità)
**La carta con i nomi è conforme a WCAG 2.2 AA per gli aspetti verificati, così com'è in 426e6dc.** I criteri verificati sono 1.1.1, 1.3.1, 1.3.2, 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 2.1.1, 2.4.3 e 2.4.7, più i colori forzati di §2.14.

La patch di §3 è un suggerimento: toglie una ripetizione a chi usa lo screen reader e allinea la pagina alla regola aggiornata. La consiglio prima del go-live, ma non è una condizione. Il verdetto di gate spetta al creative-director.

## Ipotesi da validare
- Con screen reader reali (NVDA, VoiceOver) la descrizione si legge come nome dell'immagine, come per le altre carte. `[DA FORNIRE: dispositivi o servizio di test]`
- «Tra queste: Itri e Cosenza» si capisce anche senza dire che le tre città delle schede sono sulla carta: chi ascolta le ha appena sentite e le ritrova subito dopo.

## Domande aperte
- **copywriter-brand**: va bene «Tra queste:» con due soli nomi? In alternativa: «Tra le altre: Itri e Cosenza.». La patch usa la formula comune alle carte, senza testi nuovi.
- **creative-director**: allineare la regola 9 di §1.4 alla carta con i nomi.

## Decisioni richieste
- **Sessione principale (sviluppo)**: applicare la patch di §3, se si accetta il suggerimento.
- **creative-director**: aggiornare la direzione visiva §1.4 (§5).
- **copywriter-content**: aggiornare `alt-text.md` e il copy deck di Città Digitali con la descrizione scelta (§5).
