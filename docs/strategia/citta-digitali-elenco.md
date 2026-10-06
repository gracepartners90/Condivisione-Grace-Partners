---
titolo: Città Digitali · elenco delle città del progetto
owner: brand-strategist
contributi: [ui-designer, creative-director]
stato: in revisione
versione: 0.3
aggiornato: 2026-10-06
fonti: [docs/brief/linee-guida.md (§12, §15, §18, §22), docs/brief/brief-consolidato.md (D5, D7, N1, P2; glossario e omonimie), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (§6), docs/strategia/coordinate-luoghi.md (tabella 1), docs/decisioni/002-veridicita-staging-e-immagini-ai.md, src/data/site.ts e dist/ (sola lettura), WebFetch e WebSearch del 2026-10-05 (URL nel testo), risposte dell'utente del 2026-10-05 (dominio del portale, Martina Franca), commit eb691ee (dominio corretto nel sito), Wikidata Q52020 (Martina Franca), Q51863 e Q51822 (controllo incrociato), risposte dell'utente del 2026-10-06 (San Cataldo; città di Puglia Digitale)]
---

# Città Digitali · elenco delle città del progetto

**Perché.** Richiesta dell'utente del 2026-10-05: nel capitolo 03 della Home la mappa mostra 3 città. L'utente vuole tutte le città del progetto, con un puntino per ognuna e il nome solo per alcune, senza sovrapposizioni. La fonte che indica è la pagina «Tutte le città» del portale del cliente, cittàdigitali.it/tutte-le-citta.

**In breve.**
- **Le città sono 45**, tutte nella pagina «Tutte le città» di cittàdigitali.it: Puglia 31, Sicilia 6, Campania 4, Lazio 2, Calabria 1, Lombardia 1.
- **La pagina non si può leggere direttamente da qui** (§1). L'elenco viene dal riassunto dell'indice di WebSearch e ha superato tre controlli. Per togliere il `[DA VERIFICARE]` basta il testo o uno screenshot della pagina.
- **Coordinate per tutte e 45 le città.**
  - 44 vengono dal riquadro di Wikipedia in inglese, a 2 decimali, come per C11.
  - Martina Franca viene da Wikidata (P625): **40.70 · 17.33**. Su Wikipedia la lettura non è affidabile.
  - Per Martina Franca serve un'eccezione alla fonte unica, che decide il creative-director (§3).
- **Raccomandazione:**
  - un puntino per ogni città;
  - in attesa del testo della pagina, il nome solo per Varese, Altamura e Caltanissetta;
  - nessun numero senza testo confermato e data (§4).
- **Dominio del portale: chiuso.** L'utente ha confermato il 2026-10-05 che `cittadigitali.it`, senza accento, non è del cliente. Il portale è `cittàdigitali.it`, e il sito è già corretto (commit eb691ee, §5).

---

## 1. Fonti provate (2026-10-05)

| Fonte | Esito |
|---|---|
| `https://www.cittadigitali.it/tutte-le-citta`, `https://cittadigitali.it/tutte-le-citta` | Non raggiungibili: il nome a dominio non si risolve. WebFetch ha dato «getaddrinfo ENOTFOUND» sulla radice di entrambi; non è un blocco di policy. Nell'indice di ricerca il dominio senza accento ha due pagine di «CITTA' DIGITALI», un progetto diverso, con Biella, Lecce, Salerno, Trento e Treviso. **L'utente ha confermato il 2026-10-05 che il dominio non è del cliente** |
| `https://xn--cittdigitali-19a.it/tutte-le-citta/`, cioè cittàdigitali.it | WebFetch bloccato dalla policy di rete. Per le regole del proxy non ho riprovato e non ho cercato copie in cache o archivi, che servirebbero ad aggirare il blocco. **Con WebSearch** la pagina è nell'indice («Tutte le città - Città Digitali») e il riassunto riporta l'elenco completo |
| Altre pagine di cittàdigitali.it, con WebSearch | Pagine città: Massafra, Itri, Bitonto, Santeramo in Colle, Manfredonia, Caltanissetta. Le pagine «Il progetto», «Chi siamo», «Franchising», «Dati aziendali» e «Contatti» riportano ITNode Srl, Via Sant'Anna 34, Acquaviva delle Fonti, P.IVA IT08937270729 |
| `www2.cittàdigitali.it` («Le Città Digitali»), con WebSearch | Pagine comune di Altamura e Martina Franca. `[IPOTESI: è la piattaforma precedente]` |
| Portali delle città (varesedigitale.it e simili), lapugliadigitale.it | WebFetch bloccato dalla policy. lapugliadigitale.it non ha pagine nell'indice |
| en.wikipedia.org | Solo con WebSearch: coordinate dal riquadro dei comuni |

**Controlli sull'elenco.** Il riassunto di WebSearch è generato e può sbagliare.
1. **Conteggio:** l'elenco ha 45 nomi, e tre risultati distinti dello stesso sito dichiarano «45 città connesse».
2. **Coerenza:** le otto pagine città trovate una per una sono tutte nell'elenco.
3. **Copertura:** l'elenco contiene le tre città delle linee guida (§18) e le quattro dei materiali di progetto (§12, §15).
4. **Ricerche per gruppo** (Cosenza; i quattro comuni vesuviani; i quattro comuni siciliani delle province di Catania e Ragusa): rimandano tutte alla pagina «Tutte le città». Valgono poco da sole, perché la ricerca conteneva già i nomi.

Resta possibile che un nome sia stato letto male. Il testo o uno screenshot della pagina chiudono il dubbio.

## 2. Elenco

**Stati.**
- **LG:** città di Città Digitali secondo le linee guida (§18).
- **Progetto:** presente nei materiali di progetto in un altro mondo (Puglia Digitale, LG §15; esempi SIII, LG §12) e nell'elenco di Città Digitali, quindi in entrambi `[DA VERIFICARE]`.
- **Portale cliente:** solo nell'elenco «Tutte le città» `[DA VERIFICARE: testo della pagina]`.
- **Puglia Digitale (conferma dell'utente del 2026-10-06).** Le città virtualizzate di Puglia Digitale sono le 31 città pugliesi dell'elenco, cioè le righe con regione «Puglia». Per tutte, l'appartenenza a entrambi i mondi è confermata: il `[DA VERIFICARE]` dello stato «Progetto» è chiuso per Acquaviva, Gravina, Monopoli e Cassano.

**Fonte dell'elenco (F).** https://xn--cittdigitali-19a.it/tutte-le-citta/ (cittàdigitali.it/tutte-le-citta), riassunto dell'indice di WebSearch, consultato il 2026-10-05.

**Coordinate.**
- **Fonte:** riquadro di Wikipedia in inglese, `https://en.wikipedia.org/wiki/<Nome>`, letto con WebSearch il 2026-10-05. Per le sette città della tabella 1 di `coordinate-luoghi.md` la lettura è del 2026-09-28.
- **Indirizzi che non seguono il nome:** `Gallipoli,_Apulia`, `San_Cataldo,_Sicily`, `Nard%C3%B2`.
- **Calcolo:** valore del riquadro convertito in gradi decimali e arrotondato a 2 decimali.
- **Eccezione:** Martina Franca viene da Wikidata P625 (https://www.wikidata.org/wiki/Q52020), letta il 2026-10-05 (§3).

**Portale.** È quello delle linee guida o la pagina della città su cittàdigitali.it. «—» vuol dire che non l'ho trovato, non che manchi. Nessun indirizzo `<città>digitale.it` è dedotto.

| # | Città | Prov. | Regione | Portale | Fonte | Stato | lat | lon | Riquadro Wikipedia |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Acquaviva delle Fonti | BA | Puglia | acquavivadigitale.com (LG §15) | F; LG §12, §15 | Progetto: Puglia Digitale, esempi SIII | 40.90 | 16.85 | 40°54′N 16°51′E |
| 2 | Alberobello | BA | Puglia | — | F | Portale cliente | 40.78 | 17.23 | 40°47′N 17°14′E |
| 3 | Altamura | BA | Puglia | altamuradigitale.com (LG §18); www2.cittàdigitali.it/comune/Altamura | F; LG §18 | LG | 40.82 | 16.55 | 40°49′N 16°33′E |
| 4 | Andria | BT | Puglia | — | F | Portale cliente | 41.22 | 16.30 | 41°13′N 16°18′E |
| 5 | Bari | BA | Puglia | — | F | Portale cliente | 41.13 | 16.87 | 41°07′31″N 16°52′00″E |
| 6 | Barletta | BT | Puglia | — | F | Portale cliente | 41.32 | 16.28 | 41°19′N 16°17′E |
| 7 | Bisceglie | BT | Puglia | — | F | Portale cliente | 41.24 | 16.51 | 41°14′35″N 16°30′19″E |
| 8 | Bitonto | BA | Puglia | cittàdigitali.it/bitonto | F | Portale cliente | 41.12 | 16.68 | 41°07′N 16°41′E |
| 9 | Brindisi | BR | Puglia | — | F | Portale cliente | 40.63 | 17.93 | 40°38′N 17°56′E |
| 10 | Caltagirone | CT | Sicilia | — | F | Portale cliente | 37.24 | 14.51 | 37°14′15″N 14°30′45″E |
| 11 | Caltanissetta | CL | Sicilia | caltanissettadigitale.it (LG §18); cittàdigitali.it/caltanissetta | F; LG §18 | LG | 37.49 | 14.06 | 37°29′25″N 14°03′45″E |
| 12 | Cassano delle Murge | BA | Puglia | cassanodigitale.it (LG §12) | F; LG §12 | Progetto: esempi SIII | 40.88 | 16.77 | 40°53′N 16°46′E |
| 13 | Chiaramonte Gulfi | RG | Sicilia | — | F | Portale cliente | 37.03 | 14.70 | 37°01′52″N 14°42′10″E |
| 14 | Cisternino | BR | Puglia | — | F | Portale cliente | 40.73 | 17.43 | 40°44′N 17°26′E |
| 15 | Comiso | RG | Sicilia | — | F | Portale cliente | 36.95 | 14.60 | 36°57′N 14°36′E |
| 16 | Copertino | LE | Puglia | — | F | Portale cliente | 40.27 | 18.05 | 40°16′N 18°03′E |
| 17 | Cosenza | CS | Calabria | — | F | Portale cliente | 39.30 | 16.25 | 39°18′N 16°15′E |
| 18 | Ercolano | NA | Campania | — | F | Portale cliente | 40.80 | 14.35 | 40°48′N 14°21′E |
| 19 | Fasano | BR | Puglia | — | F | Portale cliente | 40.83 | 17.37 | 40°50′N 17°22′E |
| 20 | Francavilla Fontana | BR | Puglia | — | F | Portale cliente | 40.53 | 17.58 | 40°32′N 17°35′E |
| 21 | Gallipoli | LE | Puglia | — | F | Portale cliente | 40.06 | 17.99 | 40°03′20″N 17°59′30″E |
| 22 | Gioia del Colle | BA | Puglia | — | F | Portale cliente | 40.80 | 16.93 | 40°48′N 16°56′E |
| 23 | Grammichele | CT | Sicilia | — | F | Portale cliente | 37.21 | 14.64 | 37°12′53″N 14°38′11″E |
| 24 | Gravina in Puglia | BA | Puglia | gravinadigitale.it (LG §15) | F; LG §15 | Progetto: Puglia Digitale | 40.82 | 16.42 | 40°49′N 16°25′E |
| 25 | Grottaglie | TA | Puglia | — | F | Portale cliente | 40.53 | 17.43 | 40°32′N 17°26′E |
| 26 | Itri | LT | Lazio | cittàdigitali.it/itri | F | Portale cliente | 41.28 | 13.53 | 41°17′N 13°32′E |
| 27 | Lecce | LE | Puglia | — | F | Portale cliente | 40.35 | 18.17 | 40°21′N 18°10′E |
| 28 | Locorotondo | BA | Puglia | — | F | Portale cliente | 40.76 | 17.33 | 40°45′21″N 17°19′35″E |
| 29 | Manfredonia | FG | Puglia | cittàdigitali.it/manfredonia | F | Portale cliente | 41.63 | 15.92 | 41°38′N 15°55′E |
| 30 | Martina Franca | TA | Puglia | www2.cittàdigitali.it/comune/Martina_Franca | F; indicazione dell'utente del 2026-10-05 | Portale cliente | 40.70 | 17.33 | Wikidata P625: 40°42′N 17°20′E (eccezione, §3) |
| 31 | Massafra | TA | Puglia | cittàdigitali.it/massafra | F | Portale cliente | 40.58 | 17.12 | 40°35′N 17°07′E |
| 32 | Monopoli | BA | Puglia | monopolidigitale.it (LG §15) | F; LG §12, §15 | Progetto: Puglia Digitale, esempi SIII | 40.95 | 17.30 | 40°57′N 17°18′E |
| 33 | Nardò | LE | Puglia | — | F | Portale cliente | 40.18 | 18.03 | 40°10′47″N 18°02′00″E |
| 34 | Ostuni | BR | Puglia | — | F | Portale cliente | 40.73 | 17.58 | 40°44′N 17°35′E |
| 35 | Polignano a Mare (nell'elenco «Polignano») | BA | Puglia | — | F | Portale cliente | 41.00 | 17.22 | 41°00′N 17°13′E |
| 36 | Pompei | NA | Campania | — | F | Portale cliente | 40.75 | 14.50 | 40°44′57″N 14°30′02″E |
| 37 | Putignano | BA | Puglia | — | F | Portale cliente | 40.85 | 17.12 | 40°51′N 17°07′E |
| 38 | San Cataldo | CL | Sicilia | — | F; provincia confermata dall'utente il 2026-10-06 | Portale cliente | 37.48 | 13.98 | 37°29′N 13°59′E |
| 39 | San Giovanni Rotondo | FG | Puglia | — | F | Portale cliente | 41.70 | 15.73 | 41°42′N 15°44′E |
| 40 | Santeramo in Colle | BA | Puglia | cittàdigitali.it/santeramo-in-colle | F | Portale cliente | 40.80 | 16.77 | 40°48′N 16°46′E |
| 41 | Terracina | LT | Lazio | — | F | Portale cliente | 41.28 | 13.25 | 41°17′N 13°15′E |
| 42 | Torre Annunziata | NA | Campania | — | F | Portale cliente | 40.75 | 14.45 | 40°45′N 14°27′E |
| 43 | Torre del Greco | NA | Campania | — | F | Portale cliente | 40.78 | 14.37 | 40°47′N 14°22′E |
| 44 | Trani | BT | Puglia | — | F | Portale cliente | 41.27 | 16.42 | 41°16′N 16°25′E |
| 45 | Varese | VA | Lombardia | varesedigitale.it (LG §18) | F; LG §18 | LG | 45.82 | 8.83 | 45°49′N 08°50′E |

**Due nomi letti come nel riassunto.**
- «Polignano»: l'unico comune con questo nome è Polignano a Mare (BA). La lettura resta `[DA VERIFICARE]`.
- «San Cataldo»: è il comune in provincia di Caltanissetta, non la marina di Lecce. L'ha confermato l'utente il 2026-10-06 («no sono 31 allora»): con la marina di Lecce le città pugliesi sarebbero state 32.

## 3. Coordinate: controlli ed eccezione per Martina Franca

- **Regola di C11:** una sola fonte, 2 decimali, cifre della fonte senza riempimento. Alla scala dell'Italia 0,01° vale circa 1 km: per posizionare un puntino basta e avanza.
- **Controllo di plausibilità:** ho confrontato ogni punto con la posizione della città rispetto ai comuni vicini. Tutti tornano tranne uno.
- **Martina Franca: coordinate da Wikidata, con un'eccezione alla fonte unica.**
  - **Wikipedia in inglese non dà una lettura affidabile.** Su quattro ricerche diverse:
    - in due il riassunto riporta 40°38′N 17°02′E, lo stesso valore di Mottola (ricerca separata);
    - in due, compresa la ricerca sul solo nome, non riporta alcuna coordinata.
  - **Fonte di riserva: Wikidata, proprietà P625** (https://www.wikidata.org/wiki/Q52020), letta con WebSearch il 2026-10-05: 40°42′N 17°20′E, quindi **40.70 · 17.33**.
  - **Perché è accettabile.**
    1. Wikidata P625 è una delle due fonti che la DV §1.4 indica per le coordinate.
    2. Ha la precisione al primo d'arco, come i valori di Wikipedia usati per quasi tutte le altre città: i 2 decimali valgono anche qui.
    3. Sui comuni vicini le due fonti differiscono al massimo di un primo, cioè meno di 2 km:
       - Cisternino: Wikidata 40°45′N 17°25′E (Q51863), Wikipedia 40°44′N 17°26′E;
       - Locorotondo: Wikidata 40°45′N 17°19′E (Q51822), Wikipedia 40°45′21″N 17°19′35″E.
    4. Sulla mappa le coordinate non si stampano. Alla scala dell'Italia 0,01° vale circa 1 km, meno di un pixel.
  - **Controllo di plausibilità.**
    - Rispetto ai comuni vicini della tabella: circa 7 km a sud di Locorotondo, 9 km da Cisternino, 21 km da Ostuni, 22 km da Massafra.
    - Il punto cade dentro il territorio comunale delimitato dai quattro punti estremi che Wikidata riporta per Martina Franca: latitudine da 40.58 a 40.80, longitudine da 17.17 a 17.48.
    - Il valore di Mottola (longitudine 17.03) cade invece fuori dal territorio, circa 11 km a ovest del suo punto più occidentale: conferma che era sbagliato.
  - **Eccezione alla DV §1.4** («tutti i luoghi dalla stessa fonte»). Riguarda una sola città e la decide il creative-director. Se non la accetta, il puntino resta fuori finché qualcuno non legge il riquadro di Wikipedia da una rete normale.
- **Gruppi di puntini vicini**, fino a circa 15 km l'uno dall'altro: alla scala dell'Italia si sovrappongono. Indicazione per il disegno di ui-designer.
  - Area vesuviana: Ercolano, Torre del Greco, Torre Annunziata, Pompei.
  - Sicilia: Caltanissetta e San Cataldo (circa 7 km); Caltagirone e Grammichele; Comiso e Chiaramonte Gulfi.
  - Murgia: Acquaviva delle Fonti, Cassano delle Murge, Santeramo in Colle, Gioia del Colle; Altamura e Gravina in Puglia.
  - Costa a nord di Bari: Barletta, Andria, Trani, Bisceglie.
  - Costa e Valle d'Itria: Polignano a Mare, Monopoli, Fasano, Putignano, Alberobello, Locorotondo, Martina Franca, Cisternino, Ostuni.
  - Salento: Lecce, Copertino, Nardò.
  - Tra Taranto e Brindisi: Grottaglie e Francavilla Fontana.

## 4. Raccomandazione di veridicità

L'utente ha indicato questa pagina come fonte primaria del cliente: le città che elenca valgono come «città del progetto». L'unica riserva riguarda la lettura, fatta da un riassunto.

| Domanda | Raccomandazione | Perché |
|---|---|---|
| Che cosa si pubblica subito come «città del progetto» | Un puntino per ciascuna delle 45 città. Quello di Martina Franca usa la fonte di riserva, se il creative-director accetta l'eccezione del §3 | Fonte primaria del cliente. Nel codice va un commento con fonte e data |
| Quali nomi in pagina | In attesa del testo della pagina: Varese, Altamura e Caltanissetta, già nominate dalle linee guida e nel testo del capitolo. Dopo la conferma, qualunque città dell'elenco; la scelta per leggibilità spetta a ui-designer e al creative-director | Un nome mostrato è una dichiarazione più esplicita di un puntino. I tre nomi delle linee guida sono certi |
| Un numero («N città») | Non ancora. «45 città» si può pubblicare con il testo della pagina confermato, una data («Dati ITnode, [mese anno]») e lo stesso numero di puntini | Il numero non è nelle linee guida, invecchia e deve corrispondere alla mappa: con Martina Franca i puntini sono 45. L'elenco può comprendere città della piattaforma precedente (www2) |
| Città in attesa di conferma | Le 42 città fuori dalla §18 delle linee guida, per la lettura dei nomi; la lettura «Polignano» | §1–§2. Martina Franca ha ora le coordinate (§3); San Cataldo è confermato (§2) |
| Legame con le «30+ città» di Puglia Digitale (N1) | **Confermato dall'utente il 2026-10-06**: le città virtualizzate di Puglia Digitale sono le 31 città pugliesi dell'elenco. L'utente aveva prima scritto «forse sono 32», poi ha confermato 31 chiarendo San Cataldo | «30+» ha ora elenco e perimetro (verdetto G4 §6, B5). In Puglia ogni città appartiene a entrambi i mondi |
| La legenda di una carta della Puglia può dire «città di Puglia Digitale»? | **Sì**, per i puntini delle 31 città pugliesi. Formule proposte: «Le città di Puglia Digitale» o «Città virtualizzate con Puglia Digitale»; il testo definitivo è di copywriter-brand. Condizioni: (1) nessuna formula che attribuisca Puglia Digitale a ITnode, come «le città ITnode», finché D1 è aperta; (2) niente «tutta la Puglia» né campiture della regione che facciano pensare a una copertura completa, con lo stesso criterio della carta d'Italia (N12); (3) un numero in legenda solo alle condizioni della riga sotto; (4) i nomi in carta sono subito ammessi per le cinque città dei materiali di progetto (Acquaviva, Gravina, Monopoli, Altamura, Cassano), per le altre dopo il testo della pagina | L'appartenenza è confermata dall'utente e l'elenco viene dal portale del cliente. Resta aperto solo il ruolo di ITnode (D1), che la legenda non tocca |
| «30+ città» ha un elenco: che cosa manca per pubblicarlo? | **Manca solo la data dei dati**, per la nota «Dati ITnode, aggiornati a [mese anno]» (regola B3 dell'ADR 002). Proposta: «aggiornati a ottobre 2026». È vera per costruzione: l'elenco del portale del cliente è stato consultato il 2026-10-05 e confermato dall'utente il 2026-10-06. Se l'utente non la accetta, la data la dà il cliente. Nella formulazione «30+» resta vero con 31 e regge anche se l'elenco cresce. «31» esatto è possibile, ma va aggiornato a ogni cambio e deve coincidere con i puntini della carta | Numero e perimetro sono confermati; la fonte è di prima parte («Dati ITnode»). «~200.000» e «60%» restano fuori senza fonte, anno e definizione (N2–N3): con l'elenco delle 31 città diventano almeno verificabili su dati pubblici per comune |

## 5. Scoperte da girare, fuori dalla mappa

- **Dominio del portale Città Digitali: chiuso il 2026-10-05.**
  - **Il problema, come era.**
    - Il sito usava `https://www.cittadigitali.it`, preso dalle linee guida (§22). In `dist/` l'indirizzo compariva 29 volte in 8 pagine: footer, Contatti, pagina Città Digitali (CTA e testo) e JSON-LD (`brand.url`).
    - Il 2026-10-05 quel nome non si risolveva, e l'indice lo associava a un progetto omonimo.
  - **Conferma dell'utente** (2026-10-05): «il dominio senza accento non è nostro». Il portale del cliente è `cittàdigitali.it`.
  - **Sito corretto nel commit eb691ee**, verificato in sola lettura in `src/`:
    - `portals.cittaDigitali` (`src/data/site.ts`, righe 55–58) ha `url` in punycode, `https://xn--cittdigitali-19a.it`, e `display` «cittàdigitali.it», con un commento sulla fonte;
    - il testo della pagina Città Digitali usa `${portal.display}`;
    - footer, Contatti, CTA e JSON-LD leggono lo stesso dato.
  - **Ancora aperto:** seo-technical verifica la parte tecnica.
  - **Registro:** l'omonimo senza accento è ora nel brief consolidato, tra le omonimie e alla riga S7.
- **Dati societari (C02).** La pagina «Dati aziendali» di cittàdigitali.it riporta per ITNode Srl il REA «BA-660035» e la PEC «itnode@pec.it»; la P.IVA coincide con quella del sito. Il capitale sociale non c'è. I valori sono `[DA VERIFICARE]` con la visura prima dell'uso (verdetto G4 §6, B1).
- **Fondatore (F7).** La pagina «Chi siamo» di cittàdigitali.it presenta Giacomo Lenoci come «CEO & Founder» `[DA VERIFICARE]`. Sostiene la parola «fondatore», ma riferita all'organizzazione di Città Digitali.

## Appendice · Dati per la mappa

Gli stessi valori della tabella del §2, nella forma del tipo `Place` di `src/data/site.ts`. Li inserisce la sessione principale; ui-designer li usa per il disegno.

```ts
// Città Digitali: page «Tutte le città», cittàdigitali.it (search-index summary, 2026-10-05).
// Coordinates: English Wikipedia infobox, 2 decimals; Martina Franca from Wikidata P625
// (Q52020), an exception to the single source (docs/strategia/citta-digitali-elenco.md §3).
// Fields: [id, name, province, region, lat, lon]
[
  ['acquaviva', 'Acquaviva delle Fonti', 'BA', 'Puglia', 40.9, 16.85],
  ['alberobello', 'Alberobello', 'BA', 'Puglia', 40.78, 17.23],
  ['altamura', 'Altamura', 'BA', 'Puglia', 40.82, 16.55],
  ['andria', 'Andria', 'BT', 'Puglia', 41.22, 16.3],
  ['bari', 'Bari', 'BA', 'Puglia', 41.13, 16.87],
  ['barletta', 'Barletta', 'BT', 'Puglia', 41.32, 16.28],
  ['bisceglie', 'Bisceglie', 'BT', 'Puglia', 41.24, 16.51],
  ['bitonto', 'Bitonto', 'BA', 'Puglia', 41.12, 16.68],
  ['brindisi', 'Brindisi', 'BR', 'Puglia', 40.63, 17.93],
  ['caltagirone', 'Caltagirone', 'CT', 'Sicilia', 37.24, 14.51],
  ['caltanissetta', 'Caltanissetta', 'CL', 'Sicilia', 37.49, 14.06],
  ['cassano', 'Cassano delle Murge', 'BA', 'Puglia', 40.88, 16.77],
  ['chiaramonte-gulfi', 'Chiaramonte Gulfi', 'RG', 'Sicilia', 37.03, 14.7],
  ['cisternino', 'Cisternino', 'BR', 'Puglia', 40.73, 17.43],
  ['comiso', 'Comiso', 'RG', 'Sicilia', 36.95, 14.6],
  ['copertino', 'Copertino', 'LE', 'Puglia', 40.27, 18.05],
  ['cosenza', 'Cosenza', 'CS', 'Calabria', 39.3, 16.25],
  ['ercolano', 'Ercolano', 'NA', 'Campania', 40.8, 14.35],
  ['fasano', 'Fasano', 'BR', 'Puglia', 40.83, 17.37],
  ['francavilla-fontana', 'Francavilla Fontana', 'BR', 'Puglia', 40.53, 17.58],
  ['gallipoli', 'Gallipoli', 'LE', 'Puglia', 40.06, 17.99],
  ['gioia-del-colle', 'Gioia del Colle', 'BA', 'Puglia', 40.8, 16.93],
  ['grammichele', 'Grammichele', 'CT', 'Sicilia', 37.21, 14.64],
  ['gravina', 'Gravina in Puglia', 'BA', 'Puglia', 40.82, 16.42],
  ['grottaglie', 'Grottaglie', 'TA', 'Puglia', 40.53, 17.43],
  ['itri', 'Itri', 'LT', 'Lazio', 41.28, 13.53],
  ['lecce', 'Lecce', 'LE', 'Puglia', 40.35, 18.17],
  ['locorotondo', 'Locorotondo', 'BA', 'Puglia', 40.76, 17.33],
  ['manfredonia', 'Manfredonia', 'FG', 'Puglia', 41.63, 15.92],
  ['martina-franca', 'Martina Franca', 'TA', 'Puglia', 40.7, 17.33], // Wikidata P625: 40°42′N 17°20′E (§3)
  ['massafra', 'Massafra', 'TA', 'Puglia', 40.58, 17.12],
  ['monopoli', 'Monopoli', 'BA', 'Puglia', 40.95, 17.3],
  ['nardo', 'Nardò', 'LE', 'Puglia', 40.18, 18.03],
  ['ostuni', 'Ostuni', 'BR', 'Puglia', 40.73, 17.58],
  ['polignano', 'Polignano a Mare', 'BA', 'Puglia', 41.0, 17.22],
  ['pompei', 'Pompei', 'NA', 'Campania', 40.75, 14.5],
  ['putignano', 'Putignano', 'BA', 'Puglia', 40.85, 17.12],
  ['san-cataldo', 'San Cataldo', 'CL', 'Sicilia', 37.48, 13.98],
  ['san-giovanni-rotondo', 'San Giovanni Rotondo', 'FG', 'Puglia', 41.7, 15.73],
  ['santeramo', 'Santeramo in Colle', 'BA', 'Puglia', 40.8, 16.77],
  ['terracina', 'Terracina', 'LT', 'Lazio', 41.28, 13.25],
  ['torre-annunziata', 'Torre Annunziata', 'NA', 'Campania', 40.75, 14.45],
  ['torre-del-greco', 'Torre del Greco', 'NA', 'Campania', 40.78, 14.37],
  ['trani', 'Trani', 'BT', 'Puglia', 41.27, 16.42],
  ['varese', 'Varese', 'VA', 'Lombardia', 45.82, 8.83],
]
```

Gli id di Acquaviva, Altamura, Caltanissetta, Cassano, Gravina, Monopoli e Varese coincidono con quelli già in `site.ts`.

## Ipotesi da validare

- `[IPOTESI: il riassunto dell'indice riporta i nomi esatti della pagina «Tutte le città».]` Si chiude con il testo o uno screenshot della pagina.
- `[IPOTESI: «Polignano» è Polignano a Mare (BA).]`
- `[IPOTESI: le pagine su www2 («Le Città Digitali») appartengono alla piattaforma precedente. Altamura e Martina Franca sono comunque nell'elenco attuale.]`
- Chiuse il 2026-10-06 con la conferma dell'utente, e quindi non più ipotesi:
  - San Cataldo è il comune in provincia di Caltanissetta;
  - le «30+ città» di Puglia Digitale sono le 31 città pugliesi dell'elenco.
- `[IPOTESI: tutte le 45 città hanno oggi attività online sul portale.]` L'elenco potrebbe comprendere città in avvio.

## Domande aperte

- **Per l'utente.** Testo o screenshot della pagina «Tutte le città»: chiude la lettura dei nomi.
- **Per il cliente**, da aggiungere all'elenco del verdetto G4 §6:
  1. Le 45 città della pagina «Tutte le città» sono tutte attive? A quale data è aggiornato l'elenco? (C7)
  2. Numeri di Puglia Digitale (N1–N3, B5). Va bene «Dati ITnode, aggiornati a ottobre 2026» per «30+»? Se no, a quale data? Per «~200.000» e «60%»: fonte, anno e definizione.
  3. REA e PEC della pagina «Dati aziendali» sono corretti? Qual è il capitale sociale? (B1)
- **Per il creative-director.** Accetta l'eccezione del §3 per Martina Franca?
- **Per ui-designer e creative-director.** Quali nomi mostrare oltre ai tre delle linee guida, dopo la conferma del testo.

## Decisioni richieste

- **Utente:**
  - approvare la regola del §4: puntini per tutte le città, nomi delle linee guida fino alla conferma del testo, numero solo con testo confermato e data. La correzione del dominio è già decisa e applicata (§5);
  - accettare «Dati ITnode, aggiornati a ottobre 2026» per «30+», oppure lasciare la data al cliente (§4).
- **copywriter-brand:** testo della legenda della carta della Puglia, alle condizioni del §4.
- **Creative-director:** eccezione alla DV §1.4 per Martina Franca (§3); revisione della proposta di mappa.
- **Sessione principale:**
  - inserire i dati dell'appendice con il commento sulla fonte, compresa la riga di Martina Franca;
  - aggiungere le domande del cliente all'elenco del verdetto G4 §6.
- **ui-designer:** disegno della mappa con i gruppi del §3.
- **seo-technical:** verifica tecnica del dominio, in corso.
- **brand-strategist:** dopo la conferma del testo, registrare l'elenco nel registro dei claim del brief consolidato.
