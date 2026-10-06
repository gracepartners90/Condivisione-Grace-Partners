---
titolo: "ADR 007 · Immagine di Acquaviva delle Fonti con i segni grafici del portale: eccezione alle linee guida §33"
owner: creative-director
contributi: [copywriter-content, brand-strategist]
stato: accettata
versione: 1.0
aggiornato: 2026-10-06
fonti: [docs/brief/linee-guida.md (§33), docs/creativa/direzione-visiva.md (0.9: §4.1, §4.2, §4.3, §4.5, §4.6, §4.7, §7.5), docs/decisioni/002-veridicita-staging-e-immagini-ai.md, docs/contenuti/alt-text.md (1.3), src/assets/images/acquaviva-digitale.webp (commit fd616d6), decisione dell'utente del 2026-10-06 riferita dalla sessione principale, prove di ritaglio del creative-director del 2026-10-06 (sharp; Playwright con Chromium sullo staging e sulla variante «in pubblicazione»)]
---

# ADR 007 · Immagine di Acquaviva delle Fonti con i segni grafici del portale

| Campo | Valore |
|---|---|
| Stato | **Accettata.** Decisione dell'utente del 2026-10-06, riferita dalla sessione principale. Il creative-director ne definisce l'esecuzione (direzione visiva §4.7). |
| Data | 2026-10-06 |
| Owner | utente per la decisione (identità); creative-director per immagini ed esecuzione; copywriter-content per testo alternativo e nota; brand-strategist per la veridicità (ADR 002) |

## Contesto

- **Il file.** `src/assets/images/acquaviva-digitale.webp`, 1248 × 832 px, senza metadati.
  - È l'immagine di Acquaviva del portale del cliente, cittàdigitali.it (`wp-content/uploads/2026/02/Acquaviva_digitale_image.webp`). L'ha fornita l'utente il 2026-10-06.
  - Mostra una piazza di Acquaviva con una grafica digitale sovrapposta: pannelli trasparenti azzurri e luminosi, segnaposto arancioni, scintille nel cielo, sparsi su tutta l'immagine.
  - Autore, data, diritti e uso di strumenti di AI non sono noti.
- **Dove va.** Nella porta 3:5 di Acquaviva delle Fonti, sezione «I luoghi» di `/puglia-digitale/`. Oggi c'è il segnaposto dichiarato, o la variante tipografica nella build «in pubblicazione».
- **Il conflitto.**
  - Le linee guida del cliente, §33 «IMPORTANTISSIMO — COSA EVITARE», escludono «glow neon gratuiti», «dashboard finte» ed «eccesso di glassmorphism».
  - La direzione visiva, §4.6, esclude per le foto dei luoghi le «mani su tablet con ologrammi».
  - La grafica dell'immagine ricade in questi divieti, e nessun ritaglio 3:5 la evita del tutto.
- **La scelta dell'utente.** La sessione principale gli ha spiegato il conflitto e gli ha proposto tre strade. La risposta: «lascia i segni grafici, segnano l'aspetto digitale della città».
  - Obiettivi e identità li decide l'utente (CLAUDE.md, «Come si risolvono i conflitti», punto 4).
  - Nessuna soglia non negoziabile è toccata, a condizione che la nota dica la verità sull'elaborazione (soglia 1, ADR 002).

## Opzioni considerate

1. **L'originale senza grafica.**
   - Pro: rispetta le linee guida §33 e il §4.6; è un documento; probabilmente ha una risoluzione maggiore.
   - Contro: non c'è ancora. Va chiesto al cliente, con tempi ignoti.
2. **Un ritocco con AI che tolga la grafica.**
   - Pro: si potrebbe fare subito.
   - Contro: sarebbe un'immagine alterata da noi, contro la direzione visiva §4.1 («mai immagini generate da noi») e §4.3 («mai ritocchi o estensioni generative»). Le parti ricostruite sarebbero inventate, e servirebbe comunque una nota di trasparenza.
3. **Aspettare.** Nella porta resta la variante tipografica.
   - Pro: nessun conflitto. La variante è progettata per reggere da sola (§4.5).
   - Contro: Acquaviva, la città della sede, resta senza immagine. L'utente vuole mostrare l'aspetto digitale della città adesso.
4. **L'immagine con i segni grafici** (scelta dell'utente).
   - Pro: un'immagine del cliente, subito. Per l'utente i segni raccontano la città digitale.
   - Contro: va contro le linee guida §33 e il §4.6. Risoluzione bassa per gli schermi ad alta densità. Provenienza e uso di AI ignoti.

## Decisione

**Opzione 4**, con l'esecuzione decisa dal creative-director nella direzione visiva §4.7.

- **Il ritaglio fa il lavoro.** La grafica non si tocca. Il riquadro (x 388, y 36, 462 × 770 px sull'originale) non taglia a metà nessun pannello sul bordo e tiene solo i segni piccoli: tre pannelli piccoli, quattro segnaposto, le scintille.
  - La linea della ringhiera sul fondo della piazza cade al 58%, la quota dell'orizzonte delle altre porte.
  - Il punto di fuga cade al centro.
- **Colore intatto**, come la foto dell'evento (§4.2): nessun filtro né monocromia.
- **Nota di trasparenza** in una `<figcaption>` sotto l'immagine, dentro la porta. Testo di copywriter-content con la regola dell'ADR 002; oggi «Immagine elaborata digitalmente».
- **Testo alternativo** di copywriter-content: descrive anche i segni grafici, perché per l'utente hanno un significato. Il nome della piazza non c'è, perché non è verificato.
- **Perimetro.** Solo questa immagine, in questa porta. Non è uno stile del sito. Per altre immagini con segni grafici, comprese le eventuali equivalenti di Gravina e Monopoli, serve una nuova decisione dell'utente.

## Conseguenze

- Una delle tre porte di «I luoghi» ha un'immagine; le altre due restano tipografiche finché non arrivano immagini. Una sola foto nella porta centrale, la città della sede, si legge.
- Sugli schermi desktop ad alta densità l'immagine è morbida: il derivato non si ingrandisce. La richiesta dell'originale ad alta risoluzione resta aperta (direzione visiva §4.6).
- Il prossimo controllo delle linee guida §33 su questa porta trova un'eccezione registrata, non un difetto da segnalare.
- La nota cambia quando il cliente risponde sull'uso di AI, con le formule di `docs/contenuti/alt-text.md`. Se al go-live la risposta manca, decide brand-strategist con il consulente legale (ADR 002).

## Quando si rivede

- Arriva l'originale senza grafica, o una versione ad alta risoluzione: si propone all'utente di sostituirla.
- Il cliente chiarisce autore, diritti e uso di AI: cambiano la nota ed eventualmente il credito.
- L'utente cambia idea: si torna all'opzione 1 o 3.

## Ipotesi da validare

- `[IPOTESI: la foto sotto la grafica è una foto reale di Acquaviva delle Fonti.]` La prospettiva e l'architettura sono coerenti, ma non è una prova (`alt-text.md`, «Indizi sull'AI»).
- `[IPOTESI: il cliente può usare l'immagine sul sito di ITnode.]` È sul suo portale, ma i diritti dell'autore non sono noti.

## Domande aperte

- **Per l'utente o il cliente:** autore, data, diritti e uso di AI dell'immagine; il nome della piazza; l'originale senza grafica e ad alta risoluzione; le immagini equivalenti di Gravina e Monopoli dal portale.

## Decisioni richieste

- **Utente:** se arriveranno le immagini equivalenti di Gravina e Monopoli con i segni grafici, decidere se estendere loro l'eccezione.
- **Sessione principale:**
  - generare il derivato con lo script degli asset, con il riquadro del §4.7;
  - collegarlo alla porta con il testo alternativo e la nota di copywriter-content.
