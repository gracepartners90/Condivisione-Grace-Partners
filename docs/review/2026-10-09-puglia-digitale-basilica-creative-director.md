---
titolo: Verdetto del creative-director · la basilica con i segni grafici in «Il progetto» di /puglia-digitale/
owner: creative-director
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-09
fonti: [richiesta della sessione principale del 2026-10-09 (domande 1–5) e sua integrazione (luogo, B1, B4, riserva A9, «Bari» nella nota), parole dell'utente del 2026-10-09 riferite dalla sessione principale, src/assets/images/basilica-digitale.jpg e derivate/basilica-piattaforma.jpg (commit e398f46), docs/review/2026-10-09-puglia-digitale-basilica-brand-strategist.md, docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.6, §3.3, A9), commit fd4f004 (controllo di go-live A9), docs/decisioni/007-immagine-di-acquaviva-con-segni-grafici.md (1.1 → 1.2), docs/creativa/direzione-visiva.md (0.21 → 0.22), docs/brief/linee-guida.md (§33), catture della sessione principale in scratchpad/nicola/, staging http://127.0.0.1:4321 (build di e398f46), prove del creative-director del 2026-10-09 in scratchpad/cd-nicola/ (sharp 0.35; Playwright 1.56 e Chromium 141; copia di HEAD senza il derivato «Schermo», costruita in locale)]
---

# Verdetto · la basilica in «Il progetto» di `/puglia-digitale/`

Dal commit e398f46 la sezione «Il progetto» di `/puglia-digitale/` mostra una basilica con i segni grafici del portale, al posto della platea dell'evento. L'utente l'ha chiesto il 2026-10-09: «mentre questa è per la pagina puglia digitale dove si parla della piattaforma, al posto della platea tagliata che si vede», e poi «questa». Questo verdetto rivede l'esecuzione (Fase 5). Non è un verdetto di gate.

## In sintesi

- **Verdetto: approvato con modifiche.**
  - Il ritaglio e l'inserimento sono giusti, e seguono le regole delle porte.
  - Da applicare: la rimozione del derivato «Schermo», che non usa più nessuno.
  - Da chiedere all'utente: luogo, provenienza e originale.
- **Decisioni:**

| # | Domanda | Decisione |
|---|---|---|
| 1 | Ritaglio e inserimento | **Approvati**: x 0, y 400, 1200 × 1500, con il piede della facciata al 58%. Va corretta una frase: due pannelli sono tagliati sul bordo destro, ma lo erano già nell'originale |
| 2 | ADR 007 | **Esteso, versione 1.2**, con la decisione dell'utente. Perimetro: quattro immagini su `/puglia-digitale/`, ed è il massimo. Riserva A9 indicata |
| 3 | DV §4.7 | **Aggiornata, versione 0.22**: blocco della basilica, perimetro, §4.2, §4.6, §7.5 |
| 4 | `evento-schermo.jpg` | **Si toglie** dallo script degli asset e dal repository. Patch provata |
| 5 | Il luogo e B4 | Nessun nome finché l'utente non conferma. Con la conferma, il luogo va nella `<figcaption>` prima della nota. Nel frattempo non serve altro |

## 1. Che cosa ho guardato

- **L'originale** (1200 × 2000) e il derivato, che coincide con il riquadro dichiarato. Profili dei pixel azzurri della grafica per trovare pannelli e linee vicino ai bordi.
- **Le catture della sessione principale:** i tre ritagli, il confronto tra AVIF 50 e 40, la sezione a 1440 e a 390 px.
- **La pagina intera** a 1440 e 390 px sullo staging, con tutte le immagini caricate: la basilica nella sequenza della pagina, accanto alle porte.
- **Un ritaglio alternativo** che lascia fuori le «dashboard» del selciato, a confronto con quello nel sito.
- **Una copia di HEAD senza `evento-schermo.jpg`**, costruita e confrontata con lo staging.
- **La review di brand-strategist** (B1–B4) e l'ADR 002 0.6, §3.3 (A9).

## 2. Ritaglio e inserimento (domanda 1)

**Il riquadro: x 0, y 400, 1200 × 1500, approvato.**
- **Quota.** Il piede della facciata è a y 1272, cioè al 58% del riquadro: la quota dell'orizzonte delle porte che ne hanno uno (Acquaviva al 58%, Monopoli al 61%).
- **Bordi in alto e in basso: puliti.**
  - Sopra il primo pannello del cielo (y 540) restano 140 px.
  - Il bordo inferiore cade 54 px sotto la linea luminosa a tutta larghezza (y 1841–1846) e 112 px sotto la cornice delle «dashboard» (y 1786–1788).
- **Ai lati il ritaglio non aggiunge tagli,** perché è a tutta larghezza.
  - Sul bordo destro due pannelli sono tagliati: uno nel cielo, a y 600–880, e la «dashboard» grande del selciato. Lo erano già nell'originale.
  - Nessun ritaglio che tenga intera la facciata lo evita. È il male minore, come a Monopoli.
  - La frase del commit «nessun pannello è tagliato ai lati» va letta così. Nella direzione visiva e nell'ADR è scritta corretta.
- **Gli scartati:**

| Riquadro | Perché no |
|---|---|
| Da y 300 | Il bordo inferiore cade a 12 px dalla cornice delle «dashboard» |
| Da y 500 | Il primo pannello arriva a 40 px dal bordo superiore, e il piede della facciata sale al 51% |
| x 20, y 50, 1140 × 1425: l'unico 4:5 con la facciata intera che lascia fuori le «dashboard» | La facciata finisce in fondo, con il piede all'86%. Il cielo blu prende quasi metà dell'immagine, il selciato sparisce con la piazza, e il bordo destro passa a 10 px dalla torre. Toglie proprio la parte che per l'utente racconta la piattaforma |

**L'inserimento: approvato.**
- È la stessa composizione di prima: 4:5 in soglia sulle colonne 1–5, testo sulle colonne 7–11, a tutta larghezza su mobile.
- La nota «Immagine elaborata digitalmente» è in `<figcaption>` fuori dall'apertura, come nelle porte. Colore intatto, nessun ritocco.
- **Nella pagina, la sequenza regge:** carta, basilica, numeri, porte. La basilica e le porte hanno la stessa nota e l'orizzonte alla stessa quota, e si leggono come una serie.
- **Il limite.** È l'immagine più carica del sito.
  - Il blu del cielo è la massa di colore più forte della pagina, e le «dashboard» del selciato sono la grafica più marcata: il conflitto con le linee guida §33 è più evidente che nelle porte (B1 di brand-strategist).
  - L'ha scelta l'utente per quello che racconta. L'esecuzione la tiene stretta: resta alla misura della foto che sostituisce, mai più grande e mai in apertura di pagina. Su questa pagina non entrano altre immagini con segni grafici.
- **Compressione: AVIF 40 va bene per l'art direction.** Nel confronto con AVIF 50 si ammorbidisce appena il selciato, e le linee della grafica restano nette. La conferma è di web-performance-specialist.

## 3. ADR 007, versione 1.2 (domanda 2)

Il perimetro della 1.1 diceva: «Per ogni altro uso serve una nuova decisione dell'utente». La decisione c'è, con le parole dell'utente. Nell'ADR ho aggiunto la sezione «Estensione a «Il progetto»: la basilica (versione 1.2)», che contiene:
- **il file e la scena**, con il luogo e la provenienza `[DA VERIFICARE]`;
- **il conflitto con le linee guida §33**, più marcato, e la prova del ritaglio che lo eviterebbe, scartato;
- **l'esecuzione**: riquadro, quota, nota, alt, compressione;
- **il perimetro**: quattro immagini su `/puglia-digitale/`, la basilica e le tre porte. È il massimo: ogni altra immagine con segni grafici, qui o altrove, richiede una nuova decisione dell'utente. L'eccezione non diventa uno stile: niente pannelli, «dashboard» o glow disegnati da noi;
- **la regola del nome del luogo** e il punto su B4 (§5);
- **la riserva al go-live** (A9 dell'ADR 002 §3.3), con il sostituto indicato. Si applica senza provenienza e diritti confermati, o senza concessione se il consulente la ritiene necessaria (B3):
  1. **subito:** nello stesso riquadro 4:5 la variante «in pubblicazione» con l'orizzonte e i nodi, senza nome (§4.5). Non servono immagini né diritti, l'impaginato resta lo stesso e lo scambio non causa CLS. Lo slot oggi non esiste: se la riserva scatta, la sessione principale lo aggiunge in `asset-slots.ts`, e ui-designer ne controlla la resa a 4:5;
  2. **poi, con l'utente:** una foto vera di un luogo pugliese con i diritti (direzione visiva §4.6), o un'altra immagine del portale con provenienza confermata;
  3. **la foto dell'evento non torna:** l'utente l'ha tolta da qui.

## 4. Il derivato «Schermo» (domanda 4): si toglie

- **Perché.**
  - Nessuna pagina lo usa dal commit e398f46.
  - L'utente l'ha tolto da quella sezione, quindi non può fare da riserva.
  - Un derivato pronto e inutilizzato invita a riusarlo per errore.
  - Se servisse, la riga è nella storia del repository, e la sorgente resta (`evento-puglia-digitale.jpg`).
- **`evento-palco.jpg` invece resta:** è legato a DR3-a, una decisione ancora aperta con l'utente (§4.3).
- **La patch, provata.** File: `scratchpad/cd-nicola/togli-evento-schermo.patch`.
  - Toglie la riga da `eventCrops` e aggiorna il commento in `scripts/prepare-assets.mjs`.
  - Cancella `src/assets/images/derivate/evento-schermo.jpg`: la patch è binaria e contiene la cancellazione.
  - `git apply --check` passa su 38e45c6.
- **Verificato sulla copia:** `npm run assets` lascia identici gli altri undici derivati, e tutte le pagine della build sono identiche byte per byte allo staging.
- **Nei documenti.** La direzione visiva §4.2 lo segna come non più in uso. In `alt-text.md` e nel copy deck di `/puglia-digitale/` le righe che lo citano le aggiorna copywriter-content.

## 5. Il luogo, B4 e «Bari» nella nota

- **Il nome.** Molto probabilmente è la basilica di San Nicola a Bari (ADR 002 §3.3), ma è `[DA VERIFICARE]`. Finché l'utente non lo conferma non si usa da nessuna parte: né nell'alt, né nella nota, né nel testo. È la regola della chiesa di Gravina.
- **«Bari» nella nota, con la conferma: sì.**
  - Il luogo va nella `<figcaption>`, prima della nota: almeno la città, e il monumento se confermato. Per esempio «Bari, basilica di San Nicola · Immagine elaborata digitalmente» `[IPOTESI]`.
  - Stessa misura e stesso stile della nota di oggi; il testo esatto è di copywriter-content, la verifica di brand-strategist.
  - È il dispositivo delle Coordinate, e chiude B4: nessuno attribuisce più la basilica ad Acquaviva, Gravina o Monopoli, le città nominate nel paragrafo accanto.
- **B4 nel frattempo: non serve altro.**
  - Niente di falso è scritto, e ogni indizio sul luogo sarebbe un'affermazione non verificata.
  - Le porte, più in basso nella stessa pagina, mostrano le tre città con le loro immagini e i loro nomi.
  - Il rischio dura quanto la risposta dell'utente: la domanda va fatta subito.

## 6. Cosa funziona e va protetto

- **La richiesta dell'utente è eseguita con le regole che già reggono le porte.** Il ritaglio fa il lavoro, la grafica non si tocca, la nota è la stessa, la quota dell'orizzonte è la stessa.
- **La serie:** quattro immagini che si leggono insieme, invece di una foto dell'evento elaborata tra immagini del portale.
- **Una sola versione della foto dell'evento sul sito**, nella Home. Chiude anche la domanda aperta del 2026-10-07 sulle due pose dell'oratore.
- **Il controllo di go-live per A9** (fd4f004): la riserva non dipende dalla memoria di qualcuno.

## 7. Osservazioni

**N1 · [BLOCCANTE per il go-live] Provenienza e diritti dell'immagine (A9)**
- **Dove:** `/puglia-digitale/`, «Il progetto».
- **Problema e motivazione:** quelli di B1 di brand-strategist; soglia 1 e linee guida §31.
- **Proposta:** le domande della review di brand-strategist, §5. Senza risposta, la riserva del §3.

**N2 · [IMPORTANTE] Il luogo non è nominato**
- **Dove:** «Il progetto», `<figcaption>` e alt.
- **Problema:** chi non riconosce la basilica può attribuirla a una delle tre città nominate accanto (B4).
- **Motivazione:** DV §4.8, «Ogni schermata reale dice di chi è lo spazio e dove sta», applicato a un luogo; soglia 1 per il nome.
- **Proposta:** chiedere subito la conferma all'utente; poi il luogo nella `<figcaption>`, come al §5.

**N3 · [IMPORTANTE] Il derivato «Schermo» inutilizzato**
- **Dove:** `scripts/prepare-assets.mjs`; `src/assets/images/derivate/evento-schermo.jpg`.
- **Proposta:** la patch del §4.

**N4 · [SUGGERIMENTO] L'originale senza grafica**
- **Dove:** `src/assets/images/basilica-digitale.jpg`.
- **Problema:** è l'immagine più carica del sito, in conflitto con le linee guida §33 (B1).
- **Proposta:** chiederlo con le altre domande. Se arriva, si propone all'utente di usarlo (ADR 007, «Quando si rivede»).

## 8. Stato delle review di dominio

| Review | Verdetto di dominio | Sintesi del creative-director |
|---|---|---|
| brand-strategist, basilica (B1–B4) | Go-live solo con provenienza e diritti (A9) | Accolte. Il sostituto e il nome del luogo sono decisi al §3 e al §5, e scritti nell'ADR 007 1.2 |
| copywriter-content, alt e nota | In corso | La nota resta «Immagine elaborata digitalmente»; con la conferma, il luogo prima della nota (§5) |
| web-performance-specialist, compressione | In corso | AVIF 40 va bene per l'art direction |

## 9. Verdetto

**Approvato con modifiche.**
- Da applicare: la patch del §4 (N3).
- Da chiedere all'utente: luogo, provenienza e diritti, originale senza grafica (N1, N2, N4).
- Bloccante per il go-live: la provenienza o i diritti (N1). Il controllo c'è già.

## Patch da applicare (sessione principale)

1. `git apply scratchpad/cd-nicola/togli-evento-schermo.patch`. Tocca `scripts/prepare-assets.mjs` e cancella `src/assets/images/derivate/evento-schermo.jpg`.
2. `npm run assets`: gli altri undici derivati restano identici.
3. La build: tutte le pagine identiche a quelle di oggi.

## Ipotesi da validare

- `[DA VERIFICARE: la basilica è San Nicola a Bari; l'immagine viene dal portale del cliente.]`
- `[DA VERIFICARE con il consulente legale: art. 108 del Codice dei beni culturali]` (B3). Vale anche per la chiesa di Gravina dell'ADR 007.
- Le prove in pagina sono in Chromium 141; Safari e Firefox `[DA VERIFICARE]`.

## Domande aperte

- **Utente:** quale luogo è; da dove viene l'immagine, chi l'ha fatta e con quali diritti; se c'è l'originale senza grafica. Sono le domande del §5 della review di brand-strategist, e qui non si duplicano.
- **Consulente legale del cliente:** l'art. 108 (B3).

## Decisioni richieste

- **Sessione principale:** la patch del §4; inoltrare le domande all'utente.
- **Utente:** le risposte, e l'approvazione dell'ADR 007 1.2 insieme all'ADR 002 §3.3.
- **web-performance-specialist:** AVIF 40 per questa immagine.
