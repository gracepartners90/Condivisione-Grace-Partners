---
titolo: "ADR 007 · Immagini con i segni grafici del portale su /puglia-digitale/ (le porte di «I luoghi» e la basilica di «Il progetto»): eccezione alle linee guida §33"
owner: creative-director
contributi: [copywriter-content, brand-strategist]
stato: accettata
versione: 1.2
aggiornato: 2026-10-09
fonti: [docs/brief/linee-guida.md (§33), docs/creativa/direzione-visiva.md (0.9: §4.1, §4.2, §4.3, §4.5, §4.6, §4.7, §7.5), docs/decisioni/002-veridicita-staging-e-immagini-ai.md, docs/contenuti/alt-text.md (1.3), src/assets/images/acquaviva-digitale.webp (commit fd616d6), src/assets/images/gravina-digitale.webp e monopoli-digitale.webp (commit 808c901), conferma dell'associazione alle città da parte dell'utente del 2026-10-06, decisione dell'utente del 2026-10-06 riferita dalla sessione principale, prove di ritaglio del creative-director del 2026-10-06 (sharp; Playwright con Chromium sullo staging e sulla variante «in pubblicazione»), src/assets/images/basilica-digitale.jpg e derivate/basilica-piattaforma.jpg (commit e398f46), decisione dell'utente del 2026-10-09 riferita dalla sessione principale, docs/review/2026-10-09-puglia-digitale-basilica-creative-director.md e prove del creative-director del 2026-10-09 (sharp; Playwright con Chromium sullo staging di e398f46)]
---

# ADR 007 · Immagini con i segni grafici del portale su `/puglia-digitale/`

| Campo | Valore |
|---|---|
| Stato | **Accettata.** Decisioni dell'utente del 2026-10-06 (versioni 1.0 e 1.1) e del 2026-10-09 (versione 1.2), riferite dalla sessione principale. Il creative-director ne definisce l'esecuzione (direzione visiva §4.7). |
| Data | 2026-10-06; estesa il 2026-10-09 |
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

## Estensione a Gravina in Puglia e Monopoli (versione 1.1, 2026-10-06)

- **Decisione dell'utente**, riferita dalla sessione principale. Ha mandato le immagini equivalenti del portale (`gravina-digitale.webp` e `monopoli-digitale.webp`, 1024 × 1024, senza metadati) e ha esteso loro l'eccezione. Ha confermato l'associazione alle città: «è giusto».
- **Esecuzione** (direzione visiva §4.7): stesse regole, cioè colore intatto, nessun ritocco, la stessa nota, il testo alternativo di copywriter-content.
  - **Gravina:** riquadro x 444, y 30, 580 × 967, senza pannelli tagliati. La foto è una vista dal basso e l'orizzonte è fuori campo: il riquadro tiene la facciata intera.
  - **Monopoli:** riquadro x 154, y 0, 614 × 1023. È il male minore: i pannelli formano una fascia continua, e per tenere intere bicicletta e targa si taglia il pannello più tenue (a destra, dentro per circa il 60%). Il pannello grande sulla porta resta fuori.
- **Perimetro.** Le tre immagini della serie del portale, nelle tre porte di «I luoghi». Per ogni altro uso serve una nuova decisione dell'utente.

## Estensione a «Il progetto»: la basilica (versione 1.2, 2026-10-09)

- **Decisione dell'utente**, riferita dalla sessione principale. Ha mandato un'immagine con questa richiesta: «mentre questa è per la pagina puglia digitale dove si parla della piattaforma, al posto della platea tagliata che si vede», e poi: «questa».
- **Il file.** `src/assets/images/basilica-digitale.jpg`, 1200 × 2000 px, senza EXIF.
  - Mostra la facciata in pietra chiara di una basilica romanica tra due torri, su una piazza, sotto un cielo blu.
  - Sopra c'è una grafica come quella delle porte, ma più forte: segnaposto arancioni sulla facciata, pannelli azzurri nel cielo, linee luminose e grandi «dashboard» sul selciato.
  - Sembra la basilica di San Nicola a Bari, ma è `[DA VERIFICARE]`. Anche la provenienza è `[DA VERIFICARE]`: il portale del cliente, come le porte, oppure no. Restano ignoti anche autore, data, diritti e uso di strumenti di AI.
- **Dove va.** `/puglia-digitale/`, sezione «Il progetto», 4:5 accanto al testo sulla piattaforma, al posto del ritaglio «Schermo» della foto dell'evento (commit e398f46).
- **Il conflitto è lo stesso, più marcato.** Le linee guida §33 escludono «dashboard finte» e «glow neon gratuiti»: qui ci sono tutti e due, sul selciato.
  - Un 4:5 che tenga intera la facciata e lasci fuori le «dashboard» (da y 1495) esiste, ma solo con la facciata in fondo al riquadro: per esempio x 20, y 50, 1140 × 1425, con il piede della facciata all'86%. Il cielo blu prende quasi metà dell'immagine, il selciato sparisce con la piazza, e il bordo destro passa a 10 px dalla torre. L'ho provato e scartato: perde il rapporto del 58% delle porte e la parte che per l'utente racconta la piattaforma.
  - L'utente ha scelto l'immagine per quello che racconta: la piattaforma sopra un luogo vero. Obiettivi e identità li decide lui (CLAUDE.md, «Come si risolvono i conflitti», punto 4). Nessuna soglia è toccata, a condizione che la nota dica la verità (soglia 1, ADR 002).
- **Esecuzione** (direzione visiva §4.7). È quella delle porte: il ritaglio fa il lavoro, la grafica non si tocca.
  - **Riquadro sull'originale: x 0, y 400, 1200 × 1500**, 4:5, come la foto sostituita.
    - Il piede della facciata (y 1272) cade al 58%, la quota dell'orizzonte delle porte.
    - Sopra il primo pannello del cielo restano 140 px; sotto la linea luminosa a tutta larghezza (y 1841–1846), 54 px. Nessun pannello è tagliato in alto o in basso.
    - A tutta larghezza il ritaglio non aggiunge tagli ai lati. I due pannelli tagliati sul bordo destro, uno nel cielo e la «dashboard» grande del selciato, lo sono già nell'originale.
  - **Colore intatto**, nessun ritocco. Derivato con lo script degli asset (`placeCrops`).
  - **Nota:** «Immagine elaborata digitalmente», nella `<figcaption>`, come le porte. Testo di copywriter-content con la regola dell'ADR 002.
  - **Testo alternativo** di copywriter-content: descrive la facciata e i segni, senza il nome del luogo finché non è verificato.
  - **Compressione:** AVIF 40 solo per questa immagine. Ha la decisione di web-performance-specialist; per l'art direction va bene.
- **Perimetro.** Questa immagine, in questa sezione.
  - Con lei `/puglia-digitale/` ha quattro immagini con i segni del portale: la basilica e le tre porte. È il massimo. Su questa pagina e sulle altre ogni nuova immagine con segni grafici richiede una nuova decisione dell'utente.
  - Il resto del sito resta alle linee guida §33 e alla direzione visiva §4.6. L'eccezione non diventa uno stile: niente pannelli, «dashboard» o glow disegnati da noi, da nessuna parte.
- **Conseguenze proprie.**
  - La foto dell'evento esce da `/puglia-digitale/` e resta solo nella Home. Il derivato `evento-schermo.jpg` non serve più e si toglie dallo script degli asset (verdetto del 2026-10-09). Non è la riserva di questa sezione: l'utente l'ha tolta.
  - Se il luogo è confermato, la `<figcaption>` lo dice prima della nota, per esempio «Bari, basilica di San Nicola · Immagine elaborata digitalmente» `[IPOTESI]`. Così nessuno attribuisce la basilica ad Acquaviva, Gravina o Monopoli, le città nominate nel testo accanto. Testo di copywriter-content, verifica di brand-strategist.
  - Se l'immagine esce, decide l'utente tra un'altra immagine e la sezione senza immagine, con un impaginato da rivedere con ui-designer.

## Conseguenze

- Le tre porte di «I luoghi» hanno le immagini del portale, della stessa serie e con la stessa nota. Le varianti tipografiche restano pronte, se un'immagine venisse ritirata.
- Dalla versione 1.2 anche «Il progetto» ha un'immagine con i segni grafici, con la stessa nota. È la più carica della pagina (§«Estensione a «Il progetto»»).
- Sugli schermi desktop ad alta densità l'immagine è morbida: il derivato non si ingrandisce. La richiesta dell'originale ad alta risoluzione resta aperta (direzione visiva §4.6).
- Il prossimo controllo delle linee guida §33 su questa porta trova un'eccezione registrata, non un difetto da segnalare.
- La nota cambia quando il cliente risponde sull'uso di AI, con le formule di `docs/contenuti/alt-text.md`. Se al go-live la risposta manca, decide brand-strategist con il consulente legale (ADR 002).

## Quando si rivede

- Arriva l'originale senza grafica, o una versione ad alta risoluzione: si propone all'utente di sostituirla. Per la basilica vale lo stesso.
- Il luogo della basilica è confermato: la `<figcaption>` lo aggiunge.
- Il cliente chiarisce autore, diritti e uso di AI: cambiano la nota ed eventualmente il credito.
- L'utente cambia idea: si torna all'opzione 1 o 3.

## Ipotesi da validare

- `[IPOTESI: la foto sotto la grafica è una foto reale di Acquaviva delle Fonti.]` La prospettiva e l'architettura sono coerenti, ma non è una prova (`alt-text.md`, «Indizi sull'AI»).
- `[IPOTESI: il cliente può usare l'immagine sul sito di ITnode.]` È sul suo portale, ma i diritti dell'autore non sono noti.
- `[DA VERIFICARE: la basilica è San Nicola a Bari; l'immagine viene dal portale del cliente.]`

## Domande aperte

- **Per l'utente o il cliente:** autore, data, diritti e uso di AI delle quattro immagini; i nomi della piazza di Acquaviva, della chiesa di Gravina e della basilica; da dove viene l'immagine della basilica; gli originali senza grafica e ad alta risoluzione.

## Decisioni richieste

- **Utente:** nessuna, oltre alle risposte sulla provenienza. Le estensioni a Gravina e Monopoli (versione 1.1) e alla basilica (versione 1.2) sono decise.
- **Sessione principale:**
  - generare i derivati con lo script degli asset, con i riquadri del §4.7;
  - collegarli alle porte con i testi alternativi e la nota di copywriter-content;
  - per la basilica (1.2): già fatto in e398f46. Resta da togliere `evento-schermo.jpg` (patch del verdetto del 2026-10-09).
