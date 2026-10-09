---
titolo: Review di veridicità · immagine della basilica in «Il progetto» di /puglia-digitale/
owner: brand-strategist
contributi: []
stato: in revisione
versione: 1.1
aggiornato: 2026-10-09
fonti: [src/assets/images/basilica-digitale.jpg, src/assets/images/derivate/basilica-piattaforma.jpg (commit e398f46), src/pages/puglia-digitale.astro (righe 147–161), dist/puglia-digitale/index.html (letta il 2026-10-09), parole esatte dell'utente del 2026-10-09 riportate dalla sessione principale, docs/strategia/citta-digitali-elenco.md (riga 5), docs/decisioni/007-immagine-di-acquaviva-con-segni-grafici.md (1.1), docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.6), docs/brief/brief-consolidato.md (0.8), docs/contenuti/alt-text.md (1.11), ricerche web del 2026-10-09 (brief consolidato §8)]
---

# Review · veridicità dell'immagine della basilica in «Il progetto» di `/puglia-digitale/`

Fase 5. Dal commit e398f46 la sezione «Il progetto» di `/puglia-digitale/` mostra la facciata di una basilica con i segni grafici del portale, al posto della platea dell'evento. L'utente l'ha chiesta il 2026-10-09 con queste parole: «mentre questa è per la pagina puglia digitale dove si parla della piattaforma, al posto della platea tagliata che si vede», poi «questa». Non ha detto altro.

Il verdetto di dominio è al §6; il verdetto di gate spetta al creative-director.

## In sintesi

- **In anteprima va bene** (ADR 002 §1). La nota «Immagine elaborata digitalmente» è vera, e nessun testo dice qualcosa sul luogo.
- **Al go-live serve almeno la provenienza:** che l'immagine venga dal portale del cliente, o che il cliente o ITnode ne abbiano i diritti. È la nuova riserva A9 (ADR 002 §3.3).
- **Il luogo è molto probabilmente la basilica di San Nicola a Bari**, ma non è confermato: resta `[DA VERIFICARE]` (§2). È coerente con l'elenco delle città: Bari è una città di Puglia Digitale.
- **Il nome del luogo, per ora, non si usa**: né nell'alt né nella nota. Con la conferma dell'utente sì (§3).
- **Due punti per altri:**
  - per il consulente legale del cliente, l'art. 108 del Codice dei beni culturali (B3);
  - per il creative-director, il rischio che l'immagine sia attribuita a una delle tre città nominate nel testo accanto (B4).
- **Aggiornati:**
  - ADR 002, versione 0.6 (A9, §3.3);
  - brief consolidato, versione 0.8 (A9, materiali, fonti del §8, D13).

## 1. Che cosa ho guardato

- **Il file** `basilica-digitale.jpg`, 1200 × 2000 px, senza metadati, e il ritaglio 4:5 nel sito. Mostra:
  - la facciata in pietra chiara di una chiesa romanica tra due torri, su una piazza lastricata;
  - sopra, pannelli azzurri sospesi, segnaposto arancioni e linee luminose sul selciato;
  - ai lati, due edifici.

  Non ci sono persone né marchi leggibili. Il ritaglio tiene la facciata intera.
- **Il codice e la build** (sola lettura).
  - Nota «Immagine elaborata digitalmente».
  - Alt provvisorio senza il nome del luogo.
  - In `dist/puglia-digitale/index.html` non c'è più la foto dell'evento né la sua nota AI. Bari è nominata solo dalla carta della Puglia, nella hero della pagina.
- **L'elenco delle città** (`docs/strategia/citta-digitali-elenco.md`).
- **L'ADR 007 e `alt-text.md`**: le regole già in uso per le immagini del portale con i segni grafici.
- **Quattro ricerche web** del 2026-10-09:
  - due sulla facciata di San Nicola;
  - una sui portali del cliente;
  - una sull'art. 108 del D.Lgs. 42/2004.

  Le fonti sono nel brief, §8.

## 2. Il luogo

**Il confronto con la descrizione pubblica della basilica di San Nicola**

Fonti: it.wikipedia.org, «Basilica di San Nicola»; la scheda della basilica su famigliedellavisitazione.it; skuola.net. Le ho lette come snippet di ricerca il 2026-10-09; gli URL sono nel brief, §8.

| Elemento descritto | Nell'immagine |
|---|---|
| Facciata a salienti, tripartita | Sì |
| Due torri quadrate, tronche, di costruzione diversa | Sì: a sinistra più bassa, con archetti e un grande arco alla base; a destra più alta, con un'apertura ad arco in cima |
| Tre portali, quello centrale con il protiro su colonne | Sì |
| Tre grandi finestre sopra i portali | Sì |
| In alto cinque bifore e un piccolo rosone tondo (oculo) | Sì: una sotto l'oculo, due al centro, una per lato |
| Archetti pensili lungo i profili | Sì |

**Conclusione: molto probabile, non confermato.** La combinazione è molto specifica, ma resta `[DA VERIFICARE: è la basilica di San Nicola a Bari]`, per tre ragioni:
- è un confronto fatto da noi, non una fonte che dica che questa immagine è San Nicola;
- l'immagine è elaborata, e non sappiamo da dove viene;
- basta una riga dell'utente per confermarlo.

Il nome del file (`basilica-digitale.jpg`) non è una fonte.

**Coerenza con l'elenco: sì.**
- Bari è la riga 5 dell'elenco di Città Digitali (BA, Puglia, fonte «Portale cliente»). Quindi è tra le 31 città pugliesi di Puglia Digitale (conferma dell'utente del 2026-10-06).
- La carta della Puglia della stessa pagina disegna e nomina Bari.
- Se l'utente indicasse un altro luogo, va controllato che la città sia nell'elenco.

## 3. Il nome del luogo si può usare? (per copywriter-content e creative-director)

- **Oggi no**, né nell'alt né nella nota né nel testo.
  - È la regola già in uso per la serie del portale: in `alt-text.md` niente nomi di luoghi non verificati.
  - Per Gravina in Puglia l'utente ha confermato la città, ma non che la chiesa sia la cattedrale, e il nome della chiesa non si scrive.
- **Con la conferma dell'utente sì:**
  - l'alt può nominare «la basilica di San Nicola, a Bari» (copywriter-content);
  - il creative-director valuta se mettere «Bari» nella nota sotto l'immagine. Aiuterebbe anche per B4.
- **Se l'utente conferma solo la città:** «Bari» sì, il nome della basilica no, come per Gravina.
- **Suggerimento per l'alt di oggi.** «Basilica» presuppone l'identificazione. Finché il luogo non è confermato, la descrizione neutra è «chiesa romanica», come nell'alt di Gravina («la facciata in pietra di una chiesa»). Decide copywriter-content. Il resto dell'alt corrisponde all'immagine.

**Stato al 2026-10-09 (v1.1).** Il creative-director ha deciso diversamente sul posto del nome (verdetto del 2026-10-09, §5; ADR 007 1.2), e l'ADR 002 §3.3, punto 3, è allineato.
- Con la conferma, il luogo va nella didascalia sotto l'immagine, prima della nota, non nell'alt: «Bari, basilica di San Nicola · Immagine elaborata digitalmente», oppure «Bari · Immagine elaborata digitalmente» con la sola città.
- L'alt non cambia, perché il luogo si sentirebbe due volte. L'alt definitivo (13c97a8, `alt-text.md` 1.13) dice «chiesa».
- Per la veridicità va bene: il nome resta subordinato alla conferma, e la didascalia chiude anche B4.

## 4. Osservazioni

### B1 · [BLOCCANTE per il go-live] Provenienza e diritti dell'immagine (A9)
- **Dove:** `/puglia-digitale/`, «Il progetto»; `src/pages/puglia-digitale.astro`, righe 147–161.
- **Problema:**
  - il file non ha metadati, e l'utente non ha detto da dove viene;
  - sul portale non abbiamo trovato una pagina di Bari;
  - lo stile ricorda le immagini del portale dell'ADR 007, ma non è una prova;
  - se l'immagine non è del cliente (di un terzo, da un archivio di immagini, generata da qualcuno), usarla sul sito di ITnode pone un problema di diritti, e va contro le linee guida §31, che escludono le immagini stock.
- **Motivazione:** soglia 1; linee guida §31; ADR 002 §3.3.
- **Proposta:**
  - chiedere all'utente le risposte del §5;
  - al go-live senza conferma, l'immagine esce. Il sostituto lo sceglie il creative-director con l'utente: la foto dell'evento, che l'utente ha chiesto di togliere, non torna in automatico;
  - se lo ritiene utile, la sessione principale aggiunge a `check:launch` un controllo come per A7: se nella build c'è `basilica-piattaforma` e la provenienza non è registrata nel brief, il go-live non passa.

### B2 · [IMPORTANTE] La nota e l'uso di AI
- **Dove:** la `figcaption` «Immagine elaborata digitalmente».
- **Problema:**
  - la nota è vera, perché la grafica sovrapposta è un'elaborazione certa;
  - non sappiamo però se per la foto o per la grafica è stata usata l'AI. Se una foto realistica di un luogo vero fosse generata o alterata con l'AI, l'art. 50 dell'AI Act potrebbe chiedere una nota diversa.
- **Indizi:** i dettagli dell'architettura corrispondono a quelli dell'edificio descritto (§2). Non c'è un segno evidente di generazione, ma non è una prova (`alt-text.md`, «Indizi sull'AI»).
- **Motivazione:** ADR 002 §3.3, punto 2, e §4; le formule di `alt-text.md`.
- **Proposta:**
  - la nota resta com'è;
  - se il cliente dice che è stata usata l'AI, si passa alla formula di `alt-text.md`;
  - se al go-live la risposta manca, decide la brand-strategist con il consulente legale, come per le immagini dell'ADR 007.

### B3 · [IMPORTANTE] Immagine di un bene culturale e uso promozionale
- **Dove:** questa immagine. La stessa domanda vale per le immagini dell'ADR 007 con edifici storici, come la chiesa di Gravina in Puglia.
- **Problema:** l'immagine mostra con ogni probabilità un monumento.
  - Per l'art. 108 del Codice dei beni culturali, le riproduzioni di beni culturali in consegna a un'amministrazione pubblica pagano un canone, fissato dall'autorità che li ha in consegna, salvo gli usi senza scopo di lucro.
  - Secondo una fonte divulgativa, le riproduzioni che promuovono l'immagine, il marchio o l'attività di chi le usa sono considerate a scopo di lucro.
  - Il sito di ITnode è comunicazione d'impresa.
- **Motivazione:** diritti. Fonti: il testo dell'articolo pubblicato dall'Archivio di Stato di Prato, su cultura.gov.it, e un articolo di we-wealth.com, letti come snippet il 2026-10-09 (brief §8).
- **Proposta:**
  - è una domanda per il consulente legale del cliente: `[DA VERIFICARE]` se la norma si applica a questi edifici, e se serve una concessione;
  - da parte mia non blocca, finché il consulente non risponde;
  - se serve una concessione e non c'è, vale la riserva di B1.

### B4 · [IMPORTANTE] Il rischio di attribuire l'immagine a un'altra città
- **Dove:** il paragrafo accanto all'immagine, che dice: «Tra i luoghi da esplorare ci sono Acquaviva delle Fonti, Gravina in Puglia e Monopoli».
- **Problema:** l'immagine mostra con ogni probabilità Bari, senza nominarla. Chi non riconosce la basilica può attribuirla a una delle tre città del testo. Niente di falso è scritto, quindi non è un blocco.
- **Motivazione:** soglia 1, perché un accostamento può indurre in errore. È lo stesso ragionamento del creative-director per la hero di YES, che «potrebbe attribuirlo a un'altra impresa».
- **Proposta:**
  - con il luogo confermato, nominarlo come al §3;
  - senza conferma l'immagine può restare così. Il creative-director valuta se basta.

## 5. Input da chiedere all'utente

| # | Domanda | Segnaposto | Blocca il go-live? |
|---|---|---|---|
| 1 | Da dove viene l'immagine: dal portale del cliente (da quale pagina) o da altro? | `[DA FORNIRE: provenienza dell'immagine della basilica (A9)]` | Sì |
| 2 | Chi l'ha fatta e chi ne ha i diritti? Si può usare sul sito di ITnode? | `[DA FORNIRE: autore e diritti dell'immagine della basilica (A9)]` | Sì, se la risposta 1 non basta. Se viene dal portale, vale l'ipotesi dell'ADR 007 sui diritti |
| 3 | Per la foto o per la grafica è stata usata l'intelligenza artificiale? | `[DA FORNIRE: uso di AI nell'immagine della basilica]` | No: senza risposta resta la nota di oggi, e decide la brand-strategist con il consulente legale |
| 4 | È la basilica di San Nicola a Bari? | `[DA VERIFICARE: è la basilica di San Nicola a Bari]` | No: senza conferma, nessun nome |
| 5 | C'è l'originale senza grafica, o a risoluzione maggiore? | `[DA FORNIRE: originale dell'immagine della basilica]` | No, è facoltativo |

**Per il consulente legale del cliente:** l'art. 108 del D.Lgs. 42/2004 si applica a questa immagine e a quelle dell'ADR 007 con edifici storici? `[DA VERIFICARE]`

**Testo pronto per l'utente:**

> Per l'immagine della basilica che ci avete mandato per la pagina Puglia Digitale ci servono quattro risposte:
> 1. da dove viene: è del portale, e di quale pagina, oppure l'ha fatta qualcun altro?
> 2. chi ne ha i diritti, e se possiamo usarla sul sito di ITnode;
> 3. se per la foto o per la grafica è stata usata l'intelligenza artificiale;
> 4. se è la basilica di San Nicola a Bari.
>
> Se avete anche l'originale senza grafica, o a risoluzione maggiore, mandatecelo.

## 6. Verdetto di dominio

- **Anteprima:** conforme alla soglia 1. La nota è vera, e non c'è nessuna affermazione sul luogo.
- **Go-live:** solo con la provenienza o i diritti confermati (A9, B1). La nota resta finché il cliente non risponde sull'AI (B2). Il nome del luogo si usa solo con la conferma (§3).
- **Diritti sul bene culturale:** al consulente legale (B3).

## Ipotesi da validare

- `[DA VERIFICARE: è la basilica di San Nicola a Bari.]` Molto probabile (§2).
- `[IPOTESI: è un'immagine del portale del cliente, della stessa serie dell'ADR 007.]` Lo suggerisce solo lo stile.
- `[IPOTESI: sotto la grafica c'è una foto reale.]`

## Domande aperte

- **Utente:** i cinque punti del §5.
- **Consulente legale del cliente:** l'art. 108 (B3).
- **creative-director**, nell'estensione dell'ADR 007:
  - il sostituto, se l'immagine esce (B1);
  - «Bari» nella nota, quando il luogo è confermato (§3, B4).
- **copywriter-content:** «chiesa» o «basilica» nell'alt, finché il luogo non è confermato (§3).

## Decisioni richieste

- **Utente:** rispondere al §5 e approvare l'ADR 002 §3.3 (A9).
- **creative-director:** B1 e B4, nell'estensione dell'ADR 007.
- **copywriter-content:** l'alt (§3).
- **Sessione principale:** inoltrare le domande del §5 e, se lo ritiene utile, il controllo di go-live per A9 (B1).
