---
titolo: Direzione visiva
owner: creative-director
contributi: [ui-designer, web-performance-specialist, ux-designer, brand-strategist, copywriter-brand]
stato: in revisione
versione: 0.14
aggiornato: 2026-10-07
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/creativa/analisi-riferimento.md, docs/ux/sitemap.md, docs/contenuti/copy-deck/home.md, src/assets/images/, test tipografici, cromatici e fotografici del 2026-09-28 (Playwright 1.56, sharp 0.34), review di Fase 5 in docs/review/ (2026-09-28), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/decisioni/005-preload-del-font.md, docs/strategia/coordinate-luoghi.md (0.3), docs/review/2026-09-29-sito-ricontrollo-c14-ui-designer.md, docs/review/2026-09-29-rotazione-orizzonte-mobile-ux-designer.md, docs/ux/accessibilita.md (§2.6), misure della rotazione del 2026-09-29 (Playwright, Chromium 141, build del commit 100b578), richieste dell'utente del 2026-10-05 sulla carta di Città Digitali, docs/strategia/citta-digitali-elenco.md (0.2), docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md, docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md (§5), build di prova della carta del 2026-10-05 (http://localhost:4333, copia di ui-designer) e controllo del creative-director con Playwright (Chromium) a 16 larghezze, docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md e la sua build di prova (scratchpad ui-cdpage), docs/contenuti/copy-deck/citta-digitali.md (1.2, verifica V3), docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md (L6, §3.4, §6), docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md (O4), staging del commit c98f565 e prova in pagina di O4 (Playwright, Chromium, da 320 a 1920 px, anche con la spaziatura di WCAG 1.4.12), src/assets/images/acquaviva-digitale.webp (immagine del portale del cliente, fornita dall'utente il 2026-10-06), decisione dell'utente del 2026-10-06 sui segni grafici (riferita dalla sessione principale), docs/contenuti/alt-text.md (1.3), docs/decisioni/007-immagine-di-acquaviva-con-segni-grafici.md, prove di ritaglio del creative-director del 2026-10-06 (sharp, Playwright), richiesta dell'utente del 2026-10-06 sulla Puglia intera e sue conferme (riferite dalla sessione principale), docs/review/2026-10-06-carta-puglia-intera-ui-designer.md (P1–P5), docs/review/2026-10-06-carta-puglia-intera-ux-designer.md, docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (1.3, L7), docs/strategia/citta-digitali-elenco.md (0.3, §4), docs/ux/accessibilita.md (0.7), staging dei commit b113efb e 0d106e7 e controllo del creative-director con Playwright (Chromium) da 320 a 2560 px, prova del generatore delle carte con la regola dei 6 px sulla carta d'Italia (copia nello scratchpad, 2026-10-06), docs/review/2026-10-06-regola-11-carte-ui-designer.md (R1–R3) e le sue immagini di confronto (scratchpad ui-apart), schermate SIII inviate dall'utente il 2026-10-07 (src/assets/images/siii-*.jpg), review del 2026-10-07 in docs/review/ (schermate SIII: cro-specialist, ux-designer, web-performance-specialist; carta della Terra di Bari: ux-designer; verifica di P4: ui-designer), docs/contenuti/alt-text.md (1.6), docs/contenuti/copy-deck/home.md (1.5, didascalia della foto dell'evento), staging di d3eba9c e prove del creative-director del 2026-10-07 (Playwright, Chromium: hero di /siii/ con la sala e con la facciata, ritagli 4:5 al centro, in alto e in basso; capitoli 01–03 della Home)]
---

# Direzione visiva ITnode: Editorial × Technology × Immersive

**L'idea.** Il sito è un orizzonte che si può esplorare. Un luogo si capisce guardandosi intorno: ITnode porta questo gesto sul Web e trasforma spazi fisici in spazi digitali in cui entrare, muoversi e scegliere. Il sito non lo racconta, lo usa:
- titoli che stanno in piedi su una linea d'orizzonte;
- luoghi veri misurati in gradi e coordinate;
- immagini in cui si entra;
- punti che rispondono.

Tutto il resto è tipografia e aria.

**Come si usa questo documento.** Le scelte qui sono **decisioni**. Il `ui-designer` le traduce in token e componenti: può rinominare i token, ma per cambiare un valore passa da una review del creative-director. I valori in pixel sono misurati, non stimati (test del 2026-09-28).

**Modifiche della versione 0.2 (gate G4, 2026-09-28).** Decisioni prese sul sito costruito, motivate nel verdetto `docs/review/2026-09-28-sito-verdetto-g4-creative-director.md`:
- §1.4: regola sulla precisione delle coordinate.
- §1.5: la cascata rientra di un passo per registro; negli statement dei capitoli l'arrivo scende a `display-m`.
- §2: seconda eccezione alle sfumature, la dissolvenza ai bordi della finestra dell'Orizzonte.
- §3.2: `display-m` a 600 ammesso come titolo di sezione o di voce; il preload di Schibsted resta (ADR 005).
- §4.3: stato di DR3 e nuove maschere dei ritratti.
- §4.5: variante «in pubblicazione» delle esperienze SIII senza nome e con i gradi.
- §5: campo visivo di 200° anche su tablet, occhiello corto.
- §7.3–7.8: statement dei capitoli, «10.000+» senza conferma, numeri con il solo «30+», porte di Puglia Digitale da ovest a est a tutte le larghezze, copertina del video senza orizzonte, nodi della 404.

**Modifiche della versione 0.3 (dopo il G4, 2026-09-28).**
- §1.4, §5, §7.8, Ipotesi: coordinate pubblicate a 2 decimali da una fonte unica, con i nuovi rilevamenti e il limite noto sul rilevamento di Cassano delle Murge. La condizione C11 è chiusa (`docs/strategia/coordinate-luoghi.md`).
- §5: niente invito allo scorrimento («Scorri per esplorare») e didascalia dell'osservatore su tre righe; parere sulle varianti della riga di posizionamento per il test E1.

**Modifiche della versione 0.4 (dopo la verifica C14 di ui-designer, 2026-09-29).**
- §1.5 e §3.2: peso di `display-m` precisato. I Passaggi interamente in `display-m` stanno a 600 in tutti e due i registri; l'arrivo è a 400 solo quando scende di gradino.
- §4.2: nodo 2 della foto dell'evento sul leggio (36%, 31%), non sul busto dell'oratore (N7).
- §5, mobile: centro dell'orizzonte a 238° invece di 250° (C14-1); orizzonte al 42% della prima schermata, valore misurato al posto della stima del 55%.

**Modifiche della versione 0.5 (dopo il ricontrollo UI e il parere di accessibilità su R1, 2026-09-29).**
- §5, mobile: la rotazione della hero si compie nei primi `max(60svh, 60vw)` di scorrimento invece che in 100svh. Così Varese entra intera mentre l'orizzonte è ancora in vista sotto l'header (R1 di ui-designer), e la striscia non va mai più veloce della pagina, nemmeno con il telefono in orizzontale (limite di ux-designer).
- §5 «Movimento», §1.1 e §6: descritta l'implementazione reale, cioè `scroll(root block)` con un intervallo e non `view()`. Documentata la rotazione di +40° dell'orizzonte di Città Digitali. Aggiunta la regola «mai più veloce della pagina» (`docs/ux/accessibilita.md` §2.6).
- §3.2: i ponti «Gli altri mondi ITnode» escono dagli usi di `display-m`, perché la loro frase è in `display-s` a 400 (R2).
- Ipotesi da validare e Decisioni richieste: verifiche della rotazione su Safari iOS; la versione da approvare è la 0.5.

**Modifiche della versione 0.6 (carta del capitolo 03 della Home con tutte le città di Città Digitali, 2026-10-05).** L'utente ha chiesto tutte le città del progetto: un punto per ognuna, il nome solo per alcune, senza sovrapposizioni, e più nomi oltre a Varese, Altamura e Caltanissetta. Le decisioni sulla proposta di ui-designer (P1–P5) sono motivate qui.
- §1.4: nuovo segno del dispositivo delle Coordinate, il **punto-città**. Comprende le regole dei nomi, la legenda di copywriter-brand, l'alternativa testuale decisa da ux-designer e il posto dell'elenco in testo. Eccezione alla fonte unica per le coordinate di Martina Franca (Wikidata P625).
- §1.3: il limite di 5 nodi riguarda gli hotspot su foto e anteprime, non i luoghi sulle carte.
- §7.3: il capitolo 03 della Home passa alla nuova carta, con la legenda e senza coordinate sotto i nomi. §7.6: la sezione «L'Italia in un unico portale» va ripensata per l'elenco completo, con i criteri del §1.4.
- Ipotesi da validare, Domande aperte e Decisioni richieste aggiornate.

**Modifiche della versione 0.7 (carta di `/citta-digitali/` con tutte le città, 2026-10-05).** Decisioni sulla proposta di ui-designer (`docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md`, P1–P5).
- §1.4, «Il punto-città»: la carta di `/citta-digitali/` passa al punto-città, con i tre nodi delle schede e nessun nome sulla carta. Regola nuova per le carte accanto a schede; legenda e descrizione anche lì.
- §7.6, sezione 3: punto 2 deciso. Righe 1 e 5 allineate al sito: nella hero «Visita il portale ↗» con il link secondario «Aderisci a Città Digitali ↓»; nella chiusura «Entra in Città Digitali» è il titolo del form, non una CTA (verifica V3 di copywriter-content).

**Modifiche della versione 0.8 (2026-10-05).**
- §1.4, «Accessibilità»: la carta di `/citta-digitali/` ha la descrizione L6, senza nomi, per decisione di ux-designer. La regola per quando arriva l'elenco è confermata, con le sue quattro condizioni. La descrizione della Home è di 241 caratteri, non 255.
- §7.6, sezione 1: il dominio «cittàdigitali.it» sotto «Visita il portale ↗», in `label` mono (O4 di seo-content, approvata). Sezione 3: stato aggiornato, carta applicata con la descrizione L6.

**Modifiche della versione 0.9 (2026-10-06).**
- §4.7, nuovo: l'immagine di Acquaviva delle Fonti del portale del cliente, con i suoi segni grafici, entra nella porta di Acquaviva su `/puglia-digitale/`. È un'eccezione decisa dall'utente alle linee guida §33 e al §4.6, registrata con le sue parole e nell'ADR 007. Contiene ritaglio in pixel, colore, nota, testo alternativo, coerenza con le altre porte e condizioni per rivederla.
- §4.6 e §7.5 (riga 4): rimandi al §4.7.

**Modifiche della versione 0.10 (2026-10-06).** §4.7: l'utente estende l'eccezione a Gravina in Puglia e Monopoli, con le immagini equivalenti del portale. Ci sono i riquadri delle due porte, e per Monopoli il male minore, motivato.

**Modifiche della versione 0.11 (la Puglia intera nella hero di `/puglia-digitale/`, 2026-10-06).** L'utente ha chiesto la Puglia intera, con i punti di tutte le città virtualizzate. Qui ci sono le decisioni sulla proposta di ui-designer (`docs/review/2026-10-06-carta-puglia-intera-ui-designer.md`, P1–P5), che l'anteprima mostra già per scelta dell'utente.
- §1.4, «Il punto-città»: la hero di `/puglia-digitale/` passa al punto-città, con 31 punti.
  - Regola 6 estesa: due righe per i nomi obbligatori sulle carte compatte della Puglia, e il richiamo di 56 px.
  - Regola 7 riscritta: le classi di larghezza per carta.
  - Regole nuove: 10 (la sede), 11 (6 px dai nodi con nome), 12 (i nomi dei mari).
  - In più: ordine dei nomi, risultato, limiti accettati, accessibilità e veridicità della nuova carta.
- §1.4, regola 11: sulla carta del capitolo 03 della Home due nomi stanno a meno di 6 px dal nodo di un'altra città. È una correzione chiesta a ui-designer.
- §1.4, «Dove» delle Coordinate: l'elenco degli usi segue la regola 8. Le carte con il punto-città non hanno coordinate, che restano nelle schede delle città di `/citta-digitali/`.
- §7.5, riga 1: la hero di `/puglia-digitale/` è riscritta, e «MURGIA» esce.
- §7.3, riga 5: il creative-director consiglia la stessa carta nel capitolo 02 della Home (P4). Decide l'utente.
- Ipotesi da validare, Domande aperte e Decisioni richieste aggiornate.

**Modifiche della versione 0.12 (regola 11 su tutte le carte, 2026-10-06).** Decisioni sulla proposta di ui-designer (`docs/review/2026-10-06-regola-11-carte-ui-designer.md`, R1–R3).
- §1.4, regola 11: la carta del capitolo 03 della Home è corretta con R1 e R2. Ha 7 nomi sulle carte larghe e non mette San Giovanni Rotondo; la sua descrizione scende a 218 caratteri.
- §1.4, regola 8 e «Dove» delle Coordinate: con R3 nessuna carta porta coordinate, compresa la Terra di Bari del capitolo 02 della Home. È la correzione di un `[BLOCCANTE]` trovato da ui-designer: lì le coordinate di Monopoli coprivano il testo.
- §7.3, riga 5, e Decisioni richieste, punto 6: allineati.

**Modifiche della versione 0.13 (schermate SIII, P4 applicata, foto dell'evento, 2026-10-07).** Decisioni nel verdetto `docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md`.
- §4.8, nuovo: le schermate SIII, cioè dove e quale, ritaglio della hero ancorato in basso, niente nodi, marchi di terzi, la riga con il nome sotto la hero di `/siii/` e sotto il capitolo 01 della Home, consenso A7, schermate non usate. §4.6: schermate ricevute.
- §4.2: la didascalia senza «regionale» e solo con l'originale dello scatto; indicazioni per i ritagli della nuova versione della foto chiesta dall'utente per la Home.
- §1.4: la Puglia intera anche nel capitolo 02 della Home (P4, approvata dall'utente). Nessuna carta è più decorativa. La carta d'Italia della Home ha la descrizione di 199 caratteri con 5 nomi, decisa da ux-designer. La carta della Terra di Bari esce anche dal codice.
- §7.3, riga 5, e §7.4, righe 1 e 6: allineate al sito. Decisioni richieste, punto 6: P4 decisa.

**Modifiche della versione 0.14 (2026-10-07).** §4.3: eccezione per centrare il ritratto della Home, su segnalazione dell'utente («non è centrata»). Si tolgono dallo sfondo le lettere del marchio che il ritaglio taglierebbe e si usa una nuova maschera. Il ritratto di Contatti resta com'è.


Il concept delle linee guida (spazio fisico → spazio digitale → persone → imprese → territorio) diventa quattro segni riconoscibili, più una regola tipografica.

| Dispositivo | Anello del concept | In una riga |
|---|---|---|
| **L'Orizzonte** | spazio fisico | Una linea graduata da 0° a 360°, come la bussola di un tour virtuale |
| **La Soglia** | spazio digitale | Ogni immagine è un'apertura a spigoli vivi in cui si entra |
| **Il Nodo** | persone e imprese | La «o» di itNode diventa il segno di tutto ciò che si può toccare |
| **Le Coordinate** | territorio | L'unico ornamento ammesso è un dato geografico vero |
| *Regola tipografica:* **Il Passaggio** | il salto da un mondo all'altro | Ogni statement ha due registri: partenza e arrivo, sfalsati |

### 1.1 L'Orizzonte (spazio fisico)

- **Cos'è.** Una linea di 1 px all'altezza dello sguardo, graduata come la bussola di un visore a 360°:
  - tacche ogni 5° (alte 6 px), 15° (12 px) e 45° (20 px);
  - etichette mono solo ogni 45°: «045°», e ai cardinali «000° N», «090° E», «180° S», «270° O».
  - Sopra la linea c'è il cielo, lo spazio del titolo; sotto c'è la terra, lo spazio dei dati.
- **Dove.**
  - Hero della Home: in movimento, vedi §5.
  - Fine della hero di Città Digitali: centrato su 263°, a metà tra Caltanissetta (213°) e Varese (313°); ruota di +40° allo scroll (§5, «Movimento») e si apre nel video (§7.6).
  - Apertura dei tre capitoli in Home: statica, con il rilevamento del capitolo (01 = 000°, 02 = 120°, 03 = 240°: tre direzioni della stessa visione).
  - Timeline del fondatore: diventa orizzonte del tempo.
  - Pagina 404.
- **Come si costruisce.** SVG generato al build da un file di dati (componente Astro), in unità relative e senza JavaScript per il disegno. Il JavaScript o le scroll-driven animations servono solo a traslarlo.
- **Si fa.**
  - Le tacche scendono sotto la linea e le etichette stanno sotto le tacche.
  - Sopra la linea c'è solo il titolo.
  - La linea va a tutta larghezza, oltre i margini, solo nella hero.
- **Non si fa.** Curve, prospettive 3D, bagliori, mirini, numeri di «telemetria» inventati, più di un orizzonte per schermata.

### 1.2 La Soglia (spazio digitale)

- **Cos'è.** Foto, video e anteprime non sono «card»: sono aperture rettangolari a spigoli vivi. All'ingresso nella viewport si aprono dall'orizzonte, da una fessura orizzontale all'immagine intera (§6).
- **Formati**, presi dall'architettura e non dai template:

  | Nome | Proporzione | Uso |
  |---|---|---|
  | Porta | 3:5 | luoghi |
  | Ritratto | 4:5 | persone, ritagli verticali della foto evento |
  | Schermo | 16:10 | esperienze SIII, portali |
  | Panorama | 2,27:1 (foto evento), 21:9 (panorami futuri) | documenti larghi |
  | Video | 16:9 | video Città Digitali |

- **Regola del rettangolo e del cerchio.** Il rettangolo è lo spazio (immagini, campi dei form: raggio 0). Il cerchio è l'interazione (nodi e pulsanti a pillola). Non esistono altri raggi.
- **Non si fa.** Angoli arrotondati sulle immagini, ombre, cornici decorative, vetro smerigliato, più di una soglia in movimento per schermata.

### 1.3 Il Nodo (persone e imprese)

- **Cos'è.** La «o» del logo, un anello blu, diventa il segno di ciò che si può esplorare: un punto pieno di Ø 10 px e un anello di 1 px con Ø 26 px.
  - **Blu** (`blu-node`) = interazione, cioè un hotspot.
  - **Terra/arancio** = luogo.
- **Perché.** Nei tour di ITnode le imprese sono punti nello spazio: lo si vede sugli schermi della foto evento, con i loghi delle attività sulla vista aerea della città. Il nodo è il punto in cui una persona incontra un'impresa.
- **Dove.**
  - Hotspot numerati sulla foto evento e sulle anteprime SIII.
  - Confronto Tour 360° / SIII.
  - Luoghi sulle carte e sull'orizzonte.
  - Voce attiva del menu: un punto prima dell'etichetta.
  - Favicon: l'anello.
- **Interazione.**
  - È sempre un `<button>` o un `<a>` reale.
  - Hover e focus: l'anello cresce (×1,4) e compare un'etichetta mono con una sola linea di richiamo.
  - Focus visibile di 2 px.
- **Non si fa.** Nodi decorativi o come puntini d'elenco; reti di nodi collegati da linee (l'estetica «plexus»); pulsazioni infinite; più di 5 nodi per immagine.
  - Il limite di 5 vale per gli hotspot su foto e anteprime. Sulle carte i luoghi con nome non sono hotspot: quanti sono lo decidono le regole dei nomi del punto-città (§1.4).

### 1.4 Le Coordinate (territorio)

- **Cos'è.** Dati geografici veri come unico ornamento:
  - coordinate in gradi decimali, con le cifre che la fonte garantisce: oggi 2, per esempio «40.90° N · 16.85° E» (regola di precisione qui sotto);
  - rilevamento e distanza da Acquaviva delle Fonti, il comune della sede, per esempio «MONOPOLI · 081° · 38 KM»;
  - cartografia a filo.
- **Dove.** Orizzonte della hero, porte dei luoghi, schede delle città di `/citta-digitali/`, didascalie degli showcase (dove si trova l'impresa), Contatti (sede e link «Apri in Mappe»), firma del footer.
  - Nel capitolo 03 della Home la carta d'Italia usa il punto-città, con i nomi senza coordinate (vedi «Il punto-città», in fondo al paragrafo).
- **Come.**
  - Contorni da Natural Earth 1:10m (pubblico dominio), semplificati: al massimo 8 KB per carta.
  - Una sola proiezione per tutte le carte.
  - Tratto di 1 px con `vector-effect: non-scaling-stroke`.
  - Coordinate da un'unica fonte dichiarata per tutti i luoghi, con le cifre che quella fonte garantisce (regola qui sotto). Fonte, conversione e verifica: `docs/strategia/coordinate-luoghi.md` (brand-strategist).
- **Dati pubblicati** (G4, condizione C11 chiusa il 2026-09-28).
  - Fonte: riquadro della voce di Wikipedia in inglese di ogni comune, in gradi e primi (Caltanissetta anche in secondi), convertiti e arrotondati a 2 decimali (circa 1 km).
  - Rilevamenti e distanze sono calcolati da questi valori in `src/lib/geo.ts`. Gli stessi valori vanno nella firma del footer e nell'immagine social.
  - I valori sono stati letti tramite WebSearch e superano un controllo incrociato entro 1,4 km. La lettura diretta delle sette pagine resta `[DA VERIFICARE]`, non bloccante.

  | Luogo | Coordinate | Da Acquaviva | Distanza | Mondo |
  |---|---|---|---|---|
  | Acquaviva delle Fonti (comune della sede) | 40.90° N · 16.85° E | — | — | ITnode, Puglia Digitale, SIII (D.L. Natura Dentro) |
  | Cassano delle Murge | 40.88° N · 16.77° E | 252° (incerto di circa ±10°, vedi sotto) | 7 km | SIII (Masseria Santella) |
  | Altamura | 40.82° N · 16.55° E | 251° | 27 km | Città Digitali |
  | Gravina in Puglia | 40.82° N · 16.42° E | 256° | 37 km | Puglia Digitale |
  | Monopoli | 40.95° N · 17.30° E | 081° | 38 km | Puglia Digitale, SIII (Maison Miminà) |
  | Caltanissetta | 37.49° N · 14.06° E | 213° | 449 km | Città Digitali |
  | Varese | 45.82° N · 8.83° E | 313° | 848 km | Città Digitali |

  Sull'orizzonte della Home i tre luoghi murgiani, a meno di 12° l'uno dall'altro, formano un'unica etichetta: «Altamura · Cassano · Gravina — 251–256° · 7–37 km».

  L'associazione tra showcase SIII e comune è dedotta dall'indirizzo del portale (acquavivadigitale, cassanodigitale, monopolidigitale). `[DA VERIFICARE]`

  **Città di Città Digitali** (2026-10-05). Le 45 città della pagina «Tutte le città» del portale del cliente hanno coordinate dalla stessa fonte e con gli stessi 2 decimali, tranne Martina Franca (eccezione qui sotto). Elenco, fonti e controlli sono in `docs/strategia/citta-digitali-elenco.md` (brand-strategist). Sulla carta del capitolo 03 le coordinate non si stampano: posizionano i punti (vedi «Il punto-città»).

- **Precisione (regola del G4).** Le cifre mostrate sono quelle della fonte, mai completate con zeri.
  - **Opzione principale:** tutti i luoghi dalla stessa fonte (nodo del centro del comune in OpenStreetMap, oppure Wikidata P625), con 4 decimali reali; la fonte si scrive in un commento accanto ai dati.
  - **Ripiego:** se la fonte unica non è disponibile prima del lancio, 2 decimali per tutti i luoghi (circa 1 km: la precisione onesta del «centro di un comune»).
  - Mai precisioni diverse nella stessa pagina.
  - **Stato al 2026-09-28: applicato il ripiego (C11).**
    - Il sito costruito mostrava tre valori arrotondati con zeri di riempimento: «40.9500 · 17.3000» per Monopoli, «37.4900» per Caltanissetta, «16.7700» per Cassano delle Murge. Una ricerca dava per Monopoli valori diversi a seconda della fonte.
    - OpenStreetMap e Wikidata non erano raggiungibili: policy di rete, e l'API Overpass ha risposto 406 anche all'utente.
    - Oggi tutti i luoghi hanno 2 decimali dalla stessa fonte. Gli zeri di «40.90» e «17.30» sono cifre vere (40°54′ = 40,90°), non riempimento.
    - Il controllo di go-live blocca qualunque coordinata con più di 2 decimali.
  - **Limite noto.** Con coordinate precise al chilometro, il rilevamento di un luogo vicino è incerto.
    - Per Cassano delle Murge, a 7 km, l'incertezza è di circa ±10° (stima di brand-strategist): «252°» indica una direzione, non una misura.
    - Per gli altri luoghi, da 27 km in su, l'incertezza è trascurabile.
    - Sull'orizzonte Cassano non ha un'etichetta propria, perché sta nel gruppo murgiano. Il suo rilevamento non va citato da solo in nessun testo.
  - **Dopo il lancio, facoltativo.** Si torna a 4 decimali reali per tutti, dai nodi `place` di OpenStreetMap, quando qualcuno del team lavora da una rete che li raggiunge (`coordinate-luoghi.md` §4). L'incertezza su Cassano scende sotto il grado.
  - **Eccezione per Martina Franca** (accettata dal creative-director il 2026-10-05).
    - Le coordinate vengono da Wikidata P625 (Q52020): 40.70 · 17.33. Il riquadro di Wikipedia in inglese non dava una lettura affidabile: in due ricerche su quattro riportava il valore di Mottola (`citta-digitali-elenco.md` §3).
    - È accettabile per quattro motivi:
      - Wikidata P625 è una delle due fonti dell'opzione principale, qui sopra;
      - ha la stessa precisione al primo d'arco, quindi gli stessi 2 decimali, e la regola «mai precisioni diverse nella stessa pagina» resta rispettata;
      - sui comuni vicini le due fonti differiscono al massimo di un primo, meno di 2 km;
      - il punto cade dentro il territorio comunale, mentre il valore di Mottola ne restava fuori.
    - Senza l'eccezione la carta avrebbe 44 punti su 45 città: una città del progetto mancherebbe, senza un motivo che il visitatore possa vedere.
    - La fonte si scrive accanto al dato, nel file dati della carta.
    - **Altre eccezioni**, se serviranno: solo dall'altra fonte dell'opzione principale, con la stessa precisione, con un controllo incrociato sui comuni vicini e con la fonte accanto al dato. Le decide il creative-director.

- **Non si fa.** Pattern topografici decorativi, mappe del mondo a puntini, pin in stile Google, coordinate inventate o arrotondate per effetto.

#### Il punto-città (2026-10-05)

Nasce dalla richiesta dell'utente di mostrare tutte le città di Città Digitali. Le decisioni sulla proposta di ui-designer (`docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md`, P1–P5) sono queste. Dal 2026-10-06 il segno vale anche per la Puglia intera di `/puglia-digitale/`, con le 31 città di Puglia Digitale (`docs/review/2026-10-06-carta-puglia-intera-ui-designer.md`; sotto, «La carta della Puglia intera»).

- **Cos'è.** Un punto per ogni luogo reale di un elenco con una fonte dichiarata, nella sua posizione vera. È un dato, non una trama: dice «qui c'è una città del progetto».
- **Segno.**
  - Cerchio pieno di Ø 5 px in `--place`: `terra` sulle superfici chiare (4,09:1 su `pietra`), `arancio-segnale` su `notte`.
  - Anello pieno di 1,5 px nel colore della superficie. Ritaglia il punto dalla costa e dai vicini. È un tratto, non un'ombra: la stessa tecnica dell'anello dei nodi sulle foto.
  - Con il nome, il punto diventa il nodo-luogo del §1.3 (Ø 10), con lo stesso anello. Senza nome resta Ø 5: metà del nodo, stessa famiglia, gerarchia leggibile.
- **Comportamento.** Non è interattivo e non si muove: niente anello esterno, ping, hover, focus né comparsa a cascata.
- **Accessibilità** (decisione di ux-designer, owner dell'accessibilità: `docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md` §3.1).
  - La carta del capitolo 03 è un'immagine con una descrizione costruita dagli stessi dati (`role="img"` e `aria-label`): le regioni da nord a sud, la regione con più città, poi «Tra queste:» con i nomi che la carta disegna a ogni larghezza. Nessun numero. Oggi sono 199 caratteri e 5 nomi: Varese, Itri, Altamura, Cosenza e Caltanissetta (decisione di ux-designer del 2026-10-06, la stessa regola della L7). Prima erano 241 caratteri e 9 nomi, poi 218 e 7 con la regola 11. Le frasi su regioni e nomi le può rifinire copywriter-brand.
  - È una condizione di soglia (WCAG 1.1.1 e 1.3.1): con 45 punti, una carta `aria-hidden` darebbe solo a chi vede dove stanno le città.
  - L'`<svg>` della costa è `aria-hidden`, e i nomi disegnati non si leggono una seconda volta.
  - Legenda ed elenco in testo completano l'informazione (sotto).
  - Una carta resta `aria-hidden` solo se tutti i suoi luoghi sono già nominati dal testo accanto (`docs/ux/accessibilita.md` §2.8). Oggi nessuna carta del sito è in questo caso: ognuna è un'immagine con una descrizione.
    - La carta della Terra di Bari del capitolo 02 della Home non lo era: il testo del capitolo non nomina i suoi luoghi (ux-designer, `docs/review/2026-10-07-carta-terra-di-bari-ux-designer.md`). Dal 2026-10-07 non è più nel sito: l'ha sostituita la Puglia intera (P4), e il codice che la disegnava si toglie.
  - **La Puglia intera nella hero di `/puglia-digitale/` e nel capitolo 02 della Home.** È un'immagine con la descrizione L7 di copywriter-brand, scelta da ux-designer (`docs/review/2026-10-06-carta-puglia-intera-ux-designer.md`), uguale nei due posti. Sono 222 caratteri: la provincia con più città, poi i nomi che la carta disegna a ogni larghezza, da nord a sud, poi la frase della sede.
    - Non elenca le province: tutte e sei, all'ascolto, varrebbero «tutta la Puglia».
    - Al go-live con i soli nomi solidi scende da sola a 186 caratteri.
  - **Tetto:** 250 caratteri per ogni descrizione di carta, nella versione più lunga (ux-designer, `docs/ux/accessibilita.md` 0.7). Oggi la carta d'Italia della Home ne ha 199, quella di `/citta-digitali/` 138, la Puglia intera 222 (su `/puglia-digitale/` e nel capitolo 02 della Home).
  - Anche la carta di `/citta-digitali/` è un'immagine con una descrizione, finché l'elenco completo non le sta accanto. La descrizione è la L6 di copywriter-brand, senza nomi (138 caratteri): «Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia.» I tre nomi non servono, perché chi usa uno screen reader li incontra nel testo prima della carta e nelle schede subito dopo (decisione di ux-designer, `docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md` §3). «Tra queste: …» compare solo dove la carta disegna nomi, cioè sulla Home.
  - **Quando arriva l'elenco in testo** si toglie la descrizione, e carta e legenda tornano insieme `aria-hidden`, perché la legenda spiega solo ciò che si vede. Regola confermata da ux-designer, a quattro condizioni; se ne manca una, la carta tiene la descrizione L6:
    - l'elenco è completo, dallo stesso file dati;
    - è raggruppato per regione, con il nome della regione;
    - sta accanto, nella stessa sezione;
    - è visibile, o in un `<details>` con un sommario che dica che cosa contiene, mai solo per i lettori di schermo.
  - In nessuno dei due casi cambia qualcosa a schermo.
- **Posizioni vere.**
  - Mai spostate per fare spazio, mai aggregate in bolle o in numeri.
  - Dove i punti si sovrappongono si impilano come monete: ogni anello ritaglia il punto precedente, e il gruppo si legge come «tanti luoghi qui», non come una macchia. Si dipingono da nord a sud, poi i nodi con nome.
  - Alla scala dell'Italia città a meno di circa 10 km coincidono. Limiti accettati al 2026-10-05, tutti con le città nell'elenco in testo:
    - San Cataldo resta sotto il nodo di Caltanissetta;
    - Gravina resta sotto quello di Altamura fino a 350 px di carta;
    - Ercolano e Torre del Greco si leggono come un punto con uno spicchio.
- **Dove.** Solo sulle carte. Oggi sono quattro:
  - le due carte d'Italia con le città di Città Digitali: capitolo 03 della Home (§7.3) e sezione «L'Italia in un unico portale» di `/citta-digitali/` (§7.6);
  - la carta della Puglia intera con le 31 città di Puglia Digitale, nella hero di `/puglia-digitale/` (§7.5);
  - la stessa carta, compatta, nel capitolo 02 della Home (P4, approvata dall'utente il 2026-10-07: «sì, mettila»; §7.3).
- **Nomi.** Le regole valgono per ogni carta con il punto-città. Le applica il generatore delle carte al build, senza JavaScript in pagina.
  1. **Obbligatori:** le città nominate dal testo accanto alla carta. Sulle carte d'Italia sono Varese, Altamura e Caltanissetta (LG §18). Sulla carta della Puglia sono Acquaviva delle Fonti, Gravina in Puglia e Monopoli, le tre località della pagina. Se uno non entra sulle carte della classe più larga il build si ferma. Sulle altre si nasconde con un avviso, e prima di pubblicare decide il creative-director.
  2. **Poi un nome per regione o gruppo**, nell'ordine che racconta l'estensione del progetto.
     - Carte d'Italia: prima le regioni fuori dalla Puglia, poi i gruppi pugliesi, poi la seconda area siciliana.
     - Carta della Puglia (`nomiPuglia`): dopo gli obbligatori vengono i nomi solidi dei materiali di progetto (Altamura e Cassano delle Murge). Poi un nome per gruppo, prima i due estremi, Gargano e Salento, che raccontano l'estensione; poi Bari, la costa a nord di Bari, la Valle d'Itria, Taranto e Brindisi; infine Lecce.
     - Dentro ogni gruppo vince la fonte più solida: prima linee guida e materiali di progetto, poi le pagine città trovate sul portale del cliente, poi le città grandi e senza ambiguità.
     - L'ordine è una scelta editoriale. Sta nel file dati (`nomi`, `nomiPuglia`) e lo approva il creative-director. Quelli proposti da ui-designer sono approvati: per l'Italia il 2026-10-05, per la Puglia il 2026-10-06.
  3. **Spazio.** Un nome compare solo se non copre punti, nodi, altri nomi o richiami e se resta dentro la carta, a ogni larghezza della sua classe. Il controllo si fa ogni 5 px, con le misure peggiori dell'etichetta mono e con la spaziatura di WCAG 1.4.12.
  4. **Un nome non nasconde un'altra città.** Il nodo con nome è più grande del punto: se coprirebbe il punto di un'altra città, il nome si scarta. Fanno eccezione solo gli obbligatori.
  5. **Mai un nome per una lettura ambigua** finché il cliente non la chiarisce: oggi «Polignano», sulla carta d'Italia e su quella della Puglia. Il punto resta. «San Cataldo» l'ha chiarito l'utente il 2026-10-06 (è il comune siciliano), ma il suo punto resta comunque sotto il nodo di Caltanissetta.
  6. **Forma.**
     - Il nome sta accanto al nodo, su un angolo, oppure appeso sotto con un richiamo verticale di 1 px in `--place`, il gesto delle etichette dell'Orizzonte.
     - I richiami sono di 24, 40 o 56 px (`drop`, `drop2`, `drop3`), mai più lunghi: oltre, il nome si stacca dal suo nodo e diventa una didascalia.
     - Quello di 56 px è l'ultima prova prima di scartare un nome, e vale solo sulla carta della Puglia, dove i nomi obbligatori devono uscire dal gruppo fitto della Murgia. Oggi lo usa solo Acquaviva delle Fonti, sulle carte compatte.
     - Il nome è in `label` mono `--fg`, con il fondo nel colore della superficie, e non è mai sillabato.
     - **Sta su una riga.** Unica eccezione: sulle carte compatte della Puglia (finestre sotto i 700 px) i nomi obbligatori possono andare su due righe.
       - Si spezzano a uno spazio, e la preposizione va a capo con ciò che segue: «Acquaviva / delle Fonti», «Gravina / in Puglia», mai «Gravina in / Puglia». Con i nomi di oggi lo fa già la regola del generatore, che cerca la riga più lunga più corta possibile. Per un nome nuovo si controlla a occhio.
       - Il generatore prova prima una riga.
       - Senza l'eccezione Gravina resterebbe senza nome sui telefoni. Sulla carta della hero, da 640 px, tutti i nomi stanno su una riga.
  7. **Classi di larghezza della carta**, annidate: quando la carta cresce un nome può solo comparire, mai sparire.
     - Carte d'Italia: due classi, strette fino a 25rem (400 px) e larghe oltre.
     - Carta della Puglia: tre classi. Sulle carte compatte (finestre sotto i 700 px) ci sono le strette, da 280 a 400 px, e le larghe, da 400 a 660 px. La carta della hero, da 700 px di finestra, ha una classe sua, da 640 a 1100 px, perché la sua larghezza segue l'altezza della finestra (§7.5).
  8. **Niente coordinate sotto i nomi, su nessuna carta, e niente numeri sulle carte con il punto-città.** Le coordinate restano negli altri usi del dispositivo (sopra, «Dove»). Su `/puglia-digitale/` restano sotto i nomi delle tre porte di «I luoghi».
     - L'ultima carta con le coordinate sotto i nomi era quella della Terra di Bari, nel capitolo 02 della Home. Le ha perse il 2026-10-06 (R3 di ui-designer): lì le coordinate di Monopoli coprivano l'anello della sede e, tra 1075 e 1135 px, il nome di Acquaviva delle Fonti. Con la spaziatura di WCAG 1.4.12 il testo copriva altro testo.
     - Dal 2026-10-07 quella carta non c'è più. Il capitolo 02 mostra la Puglia intera (P4), e il creative-director ha deciso di togliere la carta dal generatore e dal componente, con le prop che disegnavano le coordinate (pulizia di ui-designer, `docs/review/2026-10-07-p4-verifica-build-ui-designer.md` §5). Se servisse di nuovo, si riparte dalla storia del repository e dalle regole di questo paragrafo.
  9. **Carte accanto a schede** (`/citta-digitali/`). Se le città in evidenza sono nominate da schede allineate alla loro latitudine, la carta non porta nomi.
     - Le città delle schede sono nodi Ø 10, tutte le altre punti. Il nodo Ø 10 segna sempre una città nominata: dal nome sulla carta o dalla sua scheda.
     - I nodi si accendono dalla scheda (×1,5 in 250 ms), come prima: è un'eco visiva della scheda, non un'interazione della carta.
     - I punti restano senza stati, anche quando arriverà l'elenco in testo. Accenderli dall'elenco si decide solo con il disegno di quella sezione.
     - Niente anello attorno ai nodi delle schede, che darebbe un significato falso (§1.3: l'anello segna ciò che si esplora, e sulle carte la sede), e niente richiami dalle schede ai nodi, che attraverserebbero i punti della Puglia.
  10. **La sede** (anello Ø 26, §1.3) tiene i nomi fuori dall'anello.
      - I nomi d'angolo stanno a 11 px invece di 8, e i richiami partono dall'anello, non dal nodo.
      - I punti vicini si dipingono sopra l'anello, e il loro ritaglio lo interrompe come interrompe la costa: l'anello non nasconde mai una città.
  11. **Almeno 6 px tra un nome e il nodo con nome di un'altra città**, richiamo compreso. Così un nome non si legge mai come il nome del nodo accanto: nel primo tentativo di ui-designer, «ALTAMURA» stava sopra il nodo di Gravina. La regola vale per ogni carta.
      - **Nel generatore** la regola vale per ogni carta di cui calcola i nomi (R1 di ui-designer). Un controllo finale ferma il build se un nome scende sotto i 6 px. La misura è quella della regola 3: il caso peggiore, con la spaziatura di WCAG 1.4.12, dal bordo dell'anello di ritaglio.
      - **Carta della Puglia:** rispettata, ed esce identica con R1. Il minimo misurato dal creative-director in pagina, da 320 a 1920 px, è di 9,8 px.
      - **Carta del capitolo 03 della Home: corretta** (R1 e R2, decisione del creative-director del 2026-10-06).
        - **Il difetto.** «MANFREDONIA» passava a 3,5–5,9 px dal nodo di Itri, con finestre da 445 a 490 px e da 1075 a 1225 px, e «MASSAFRA» fino a 4,1 px da quello di Cosenza. A colpo d'occhio Manfredonia sembrava nel Lazio e Massafra in Calabria.
        - **Le preferenze 1 e 2 non bastano.** Nessuna posizione tiene «MANFREDONIA» a 6 px da Itri tra 400 e 480 px di carta: le altre escono dalla carta o coprono un punto. Massafra la rispetta solo da 435 px, e servirebbe una terza classe di larghezza, con il nome appeso in Basilicata.
        - **Decisione: 7 nomi sulle carte larghe**, cioè Varese, Itri, Bari, Altamura, Cosenza, Caltanissetta e Caltagirone. Manfredonia e Massafra tornano punti. È la preferenza 2 applicata nome per nome: restano i nomi che rispettano la regola a ogni larghezza della classe. Le carte strette non cambiano.
        - **San Giovanni Rotondo no** (R2: sulla carta d'Italia il gruppo del Gargano, in `nomi`, tiene solo Manfredonia). L'unica posizione libera per il suo nome, 20 caratteri, lo stende dal Tirreno all'Adriatico all'altezza del Lazio e dell'Abruzzo, e il fondo interrompe due tratti di costa. Si leggerebbe come la didascalia dell'Italia centrale, non come una città del Gargano, e la sua fonte è più debole. Meglio un nome in meno che un nome che si legge come un'area: è lo stesso principio della regola 12. Se un giorno la carta cresce, Manfredonia torna da sola.
        - **Prove di ui-designer:** distanza minima in pagina di 8,4 px (7,2 con 1.4.12), nessuna sovrapposizione in 321 finestre, axe senza violazioni. La descrizione scende a 218 caratteri.
  12. **Nomi dei mari**, come «MARE ADRIATICO» e «MAR IONIO», in `label` mono `--fg-2`.
      - Stanno solo in mare, e solo sulle carte più larghe di 25rem: sui telefoni affollerebbero la costa (DS §5.4).
      - Per i nomi delle città sono ostacoli come i punti. Il build si ferma se un nome di mare copre un punto o esce dalla carta.
      - Tra i punti non va nessun nome di area, per esempio «MURGIA», «SALENTO» o «GARGANO»: si leggerebbe come il nome di una città.
- **Risultato al 2026-10-06, carta della Home** (con la regola 11): 45 città; sulle carte larghe 38 punti e 7 nomi, sulle strette 40 punti e 5 nomi. Sulla carta di `/citta-digitali/`: 42 punti e i 3 nodi delle schede, senza nomi (regola 9).
  - Carte strette (finestre fino a circa 440 px e da 1024 a circa 1070 px): Varese, Altamura (appeso), Caltanissetta, Itri e Cosenza.
  - Carte larghe: in più Bari e Caltagirone. Itri passa a destra del nodo, Cosenza a sinistra, sul Tirreno. Manfredonia e Massafra, con il nome fino al 2026-10-06, sono punti (regola 11).
  - Nessuna sovrapposizione da 320 a 1920 px, anche con la spaziatura di WCAG 1.4.12 (misure di ui-designer, 321 finestre).
  - La Campania non ha un nome. Le sue quattro città distano tra 2,7 e 7,6 km, e il nodo con nome di una ne nasconderebbe un'altra. Si vede dai punti, e i nomi sono nell'elenco in testo.
- **Niente terza classe per il desktop a 1024 px.**
  - Tra 1024 e circa 1070 px la carta misura 382–400 px e mostra i 5 nomi delle carte strette: un insieme completo e leggibile.
  - Una terza classe costa una regola per ogni posizione e un'altra serie di prove, per una fascia stretta di larghezze.
  - Abbassare la soglia a 380, 370 o 360 px peggiora la scelta (prova con il generatore). Spariscono Massafra e Manfredonia, entrambe con la pagina sul portale, ed entra San Giovanni Rotondo, con una fonte più debole.
  - Se in futuro servono più nomi a 1024 px, la leva è l'impaginato: una carta di almeno 400 px.
- **Se cambiano elenco o coordinate,** si rigenera la carta e si rimisura. Se cambia la scelta dei nomi, la rivede il creative-director.
- **Legenda: «Ogni punto è una città di Città Digitali»** (copywriter-brand, `docs/review/2026-10-05-legenda-mappa-copywriter-brand.md` L1: adottata).
  - Una riga di testo reale sotto la carta, in una `<figcaption>`, in `label` mono `--fg-2`, con spazi unificatori in «di Città Digitali». Sta su una riga da 360 px; a 320 px va su due.
  - **Perché questa e non «Un punto per ogni città».** Descrive ogni punto e non promette che l'elenco sia completo, quindi resta vera se il portale aggiunge una città prima che la carta si aggiorni. Una dichiarazione di completezza è un claim quantitativo implicito. La ripetizione «città di Città Digitali» è il costo del nome del marchio.
  - **Niente parole che dicano più di quanto sappiamo**, come «aderenti», «partner», «comuni» o «attive». La pagina del cliente si chiama «Tutte le città».
  - **Nessun numero nella Home.** Quando ci saranno le tre condizioni di brand-strategist (testo della pagina confermato, data, stesso numero di punti), il numero va nell'elenco di `/citta-digitali/`, con la data: si aggiorna in un posto solo.
  - **Nessun link nella legenda.** Il capitolo resta con una sola CTA, come i capitoli 01 e 02 (ux-designer, HM-5), e «Esplora Città Digitali» porta già alla pagina dell'elenco.
  - **Su `/citta-digitali/`** la stessa legenda sta sotto la carta, senza link: il link alla fonte è già nella colonna del testo. Da 1280 px esce dal flusso e occupa lo spazio sotto la carta, così le città restano alla latitudine dei loro nodi. Tra 1024 e 1279 px resta nella colonna della carta e non sposta nulla. Sotto i 1024 px, con la carta in alto e le città in pila, le schede scendono di 33 px (49 a 320 px, dove la legenda va su due righe).
- **Elenco in testo** (posto deciso da ux-designer: `/citta-digitali/`, sezione «L'Italia in un unico portale», ancora `#portale`).
  - **Subito:** un link alla fonte del cliente, «Tutte le città sul portale ↗», nella colonna del testo, dopo lo statement (ux-designer §3.2, testo di copywriter-brand L2-b). Rimanda alla pagina da cui vengono punti e nomi.
    - Posizione confermata dal creative-director, con una prova in pagina a 1440 e 390 px: il link chiude lo statement «… un'unica rete da esplorare.» e precede le tre città.
    - Dopo l'elenco delle città no: da 1280 px l'ordine a schermo non sarebbe più quello del DOM (ux-designer).
  - **Con il testo della pagina confermato:** l'elenco completo in testo, visibile a tutti, con i criteri di seo-content (review del 2026-10-05, §5):
    - un solo elenco, su quella pagina;
    - per regione, con le regioni da nord a sud come sulla carta (Lombardia, Lazio, Campania, Puglia, Calabria, Sicilia);
    - dentro ogni regione le città in ordine alfabetico, con il nome ufficiale del comune e la sigla della provincia;
    - lo stesso file dati della carta, così elenco e punti non possono divergere;
    - link solo verso indirizzi verificati, mai dedotti;
    - fonte e data dell'elenco, ed eventualmente il numero, alle condizioni di brand-strategist.
  - **Mai nella Home** un elenco di nomi, né nascosto né in un `<details>`: romperebbe il ritmo del capitolo e pubblicherebbe in testo nomi ancora da verificare.
  - La sezione va ridisegnata per un elenco lungo (§7.6). Un `<details>` sulla pagina si valuta con il disegno.
- **Veridicità.**
  - Punti e nomi vengono dalla pagina «Tutte le città» del portale del cliente, indicata dall'utente. La pagina è stata letta da un riassunto dell'indice di ricerca, quindi i nomi restano `[DA VERIFICARE]` (`docs/strategia/citta-digitali-elenco.md` §1, §4).
  - **Anteprima:** la carta si mostra subito con tutti i nomi che le regole ammettono, come chiede l'utente: 7 sulle carte larghe dal 2026-10-06, 9 prima della regola 11.
  - **Go-live:** serve il testo o uno screenshot della pagina. Se al lancio non c'è, si pubblicano i punti con i soli tre nomi obbligatori (`nomi` ridotto agli obbligatori). La descrizione della carta segue da sola, perché nasce dagli stessi dati.
- **La carta della Puglia intera** (hero di `/puglia-digitale/`, 2026-10-06). È la proposta di ui-designer (P1–P5), approvata dal creative-director: inquadratura, punti, nomi, legenda e descrizione, componente e generatore.
  - **Solo costa.** Una linea aperta dalla foce del Saccione (confine con il Molise) a quella del Bradano (confine con la Basilicata), passando per il Gargano e Santa Maria di Leuca. Le estremità restano nette: la linea finisce dove finisce la Puglia.
    - Niente confine regionale e niente campitura: una regione chiusa farebbe pensare a una copertura completa (N12; brand-strategist, condizione 2). La Puglia si riconosce dalla costa.
    - Un confine scaricato (ISTAT o Natural Earth admin-1) non serve: sarebbe una dipendenza nuova, con licenza e attribuzione, per un segno che non vogliamo.
    - Stessa proiezione e stessa levigatura delle altre carte. Le Isole Tremiti mancano, perché Natural Earth 1:10m non le ha; al telefono, del resto, sembrerebbero un punto-città.
  - **Risultato al 2026-10-06.** I punti sono 31, e da 280 px di carta in su nessuna coppia si sovrappone: le città più vicine, Locorotondo e Martina Franca, distano 6,7 km. Acquaviva delle Fonti è il nodo con l'anello della sede.
    - Carte compatte strette (telefoni, 280–400 px): 7 nomi. Sono Manfredonia, Barletta, Bari, Monopoli, Acquaviva delle Fonti (su due righe, appesa a 56 px), Gravina in Puglia (su due righe) e Nardò.
    - Carte compatte larghe (400–660 px): 10 nomi, cioè in più Lecce, Massafra e Ostuni.
    - Carta della hero (640–1100 px): 12 nomi, cioè in più Altamura (appesa) e Brindisi, tutti su una riga.
    - Nessuna sovrapposizione in 222 formati di finestra, con e senza la spaziatura di WCAG 1.4.12 (misure di ui-designer).
    - Il creative-director ha ricontrollato la pagina a 320, 390, 700, 768, 1024, 1280, 1440 e 1920 px, e la distanza dei nomi dai nodi da 320 a 1920 px.
  - **Limiti accettati** (creative-director, 2026-10-06).
    - **Cassano delle Murge e l'anello della sede.** Cassano sta a 7,1 km da Acquaviva.
      - Fino a circa 400 px di carta il suo punto è dentro l'anello, e tra 400 e 770 px l'anello lo attraversa. Sui telefoni succede lo stesso con Santeramo in Colle e Gioia del Colle.
      - Il ritaglio dei punti interrompe l'anello, quindi le città si vedono.
      - È il costo della sede in mezzo al gruppo più fitto, come San Cataldo sotto Caltanissetta.
    - **«OSTUNI» e «NARDÒ» attraversano la costa.** Il fondo nel colore della superficie la interrompe sotto il nome (DS §2.4), come fanno le carte stampate con le linee sotto i nomi. È un ritaglio, non un alone luminoso. Il nome resta leggibile e accanto al suo nodo.
    - **Il vuoto a sinistra su desktop è respiro.** La regione è più alta che larga e la carta sta a destra, così la hero diventa una diagonale: il titolo in alto a sinistra, la Puglia in basso a destra, lungo l'asse della regione.
      - Il vuoto sotto i pulsanti dà aria alle CTA.
      - Lì non entra nulla: niente decorazioni, niente seconda immagine.
    - **Sui portatili la prima schermata mostra solo l'inizio della carta.**
      - Da 1280 a 1536 px di finestra si vede dal 18 al 36% della carta, cioè il Gargano; il resto arriva con lo scorrimento. La striscia di prima, a 1440 × 900, si vedeva per circa metà.
      - Su telefoni e tablet in verticale la carta è quasi tutta nella prima schermata (87–100%).
      - Il disegno all'ingresso parte al caricamento, quindi sui portatili si vede solo in parte. Va bene: il movimento aggiunge, non spiega (§8, domanda 5).
      - Niente disegno legato allo scorrimento, che nasconderebbe parti della carta finché non si scorre.
      - Se l'utente vuole la Puglia intera nella prima schermata anche sui portatili, l'unica via è affiancarla al titolo, da circa 1280 px. Costa una carta più piccola (circa 450–550 px, 10 nomi invece di 12) e una hero divisa in due colonne, uno schema comune: il creative-director non la consiglia.
  - **Legenda: «Ogni punto è una città di Puglia Digitale»** (copywriter-brand, L7, nella forma di L1). È la stessa riga mono sotto la carta, con gli spazi unificatori in «di Puglia Digitale»: in tutto il sito i punti si leggono in un modo solo.
  - **Veridicità.**
    - L'utente ha confermato il 2026-10-06 che le città virtualizzate di Puglia Digitale sono le 31 città pugliesi dell'elenco (`docs/strategia/citta-digitali-elenco.md` 0.3).
    - Nessun numero e nessun «tutta la Puglia». Nessuna formula attribuisce Puglia Digitale a ITnode: la frase della sede dice dove sta ITnode, non di chi è il progetto (brand-strategist, condizioni 1–3).
    - **Anteprima:** si mostrano subito anche i nomi oltre ai solidi, come nella Home.
    - **Go-live senza il testo della pagina «Tutte le città»:** si tolgono `gruppi` e `poi` da `nomiPuglia`.
      - Restano Acquaviva delle Fonti, Gravina in Puglia e Monopoli, più Altamura sulla carta della hero.
      - Cassano non entra mai, perché sta dentro l'anello.
      - La descrizione segue da sola.
- **Non si fa.**
  - Punti decorativi o a trama, come retini, griglie o «mappe a puntini»: quelle sono texture, non dati, e il divieto del dispositivo («Non si fa», sopra) resta.
  - Punti senza un luogo reale dietro, o spostati per estetica.
  - Bolle con numeri, cluster riassuntivi, heatmap, campiture di copertura (N12).
  - Pin, aloni, pulsazioni.

### 1.5 Regola tipografica: Il Passaggio

- **Cos'è.** Gli statement si compongono su due registri:
  - la prima riga è il punto di partenza, ciò che si conosce;
  - la seconda è l'arrivo, ciò che ITnode rende possibile, sfalsata verso destra.
- **Perché.** Le linee guida sono già scritte così:
  - «Spazi reali. / Esperienze digitali.»
  - «Un territorio. / Migliaia di storie.»
  - «Non raccontare la tua azienda. / Falla esplorare.»
  - «Dal locale / al nazionale.»
  - «La tecnologia cambia. / La curiosità ci accompagna da sempre.»

  Il salto di riga è il confine che il sito supera.
- **Regole.**
  - Rientro della seconda riga: 2 colonne su desktop, 1 su tablet, 1,2 em su mobile.
  - Gli a capo sono d'autore: stanno nel contenuto come righe separate, non vengono dal browser. Se una riga d'autore non entra nella colonna, va a capo bilanciata (`text-wrap: balance` su ogni riga, qualunque sia il tag).
  - Massimo 2 registri; 3 solo per «Entra. / Esplora. / Interagisci.», a cascata: ogni registro rientra di un passo in più del precedente (desktop 2 e 4 colonne, tablet 1 e 2, mobile 1,2 em e 2,4 em; a 320 px nessun rientro).
  - Mai centrato.
  - La seconda riga può scendere di un gradino di scala (§3), mai salire.
  - **Il peso segue il gradino.** La partenza è sempre a 600. L'arrivo è a 400 quando scende a `display-m`; resta a 600 quando resta allo stesso gradino della partenza, anche se questa è in `display-m` (§3.2).
  - **Statement dei capitoli della Home:** partenza in `display-l` 600, arrivo in `display-m` 400, come il secondo registro della hero. In `display-l` pieno l'arrivo andava a capo per il browser fino a 6 righe (verifica UI, V4).

---

## 2. Palette

**Principio: calce, pietra, inchiostro e notte. Il blu è raro, l'arancio segna i luoghi.**
- **Neutri minerali.** La base viene dai materiali del territorio: la calce dei centri storici, la pietra calcarea della Murgia.
- **Inchiostro.** Per l'autorevolezza editoriale.
- **Notte.** Un nero appena bluastro per lo spazio digitale.
- **Perché non è il «blu tech».** Il blu del logo è un blu acciaio smorzato (#3C71A5), non elettrico: segna solo ciò che è interattivo e non diventa mai sfondo né gradiente.
- **Temperatura con significato.** Superfici chiare e calde = spazio fisico e territorio; superfici scure e fredde = spazio digitale e immersione.

| Token | Hex | Ruolo | Contrasto (WCAG) |
|---|---|---|---|
| `calce` | #F3F1EC | Fondo principale (spazio fisico) | inchiostro 16,3:1 |
| `pietra` | #E4DFD5 | Superficie alternata, «terra» della hero, segnaposto su chiaro | inchiostro 13,9:1 |
| `inchiostro` | #141413 | Testo, pulsante primario su chiaro, cartografia | — |
| `inchiostro-2` | #55514A | Testo secondario, etichette mono su chiaro | 7,0 su calce · 5,9 su pietra |
| `notte` | #0F1317 | Superfici scure (spazio digitale), footer | calce 16,5:1 |
| `notte-2` | #1A2027 | Superficie rialzata su scuro: segnaposto, campi dei form | calce 14,5:1 |
| `testo-notte-2` | #A9AFB6 | Testo secondario ed etichette su scuro | 8,4 su notte · 7,4 su notte-2 |
| `blu-node` | #3C71A5 | La «o» del logo; nodi-hotspot e anello di focus su chiaro | 4,5 su calce · 3,9 su pietra (su pietra solo come grafica) |
| `blu-node-scuro` | #2D5A87 | Sottolineatura dei link, testo blu su chiaro quando serve, hover | 6,4 su calce · 5,4 su pietra |
| `blu-node-chiaro` | #8DB3DC | Nodi-hotspot, link e focus su scuro | 8,5 su notte |
| `terra` | #A65308 | Nodo-luogo e accento su chiaro | 4,8 su calce · 4,1 su pietra |
| `arancio-segnale` | #E07F1F | Nodo-luogo e accento su scuro; simboli dei numeri (+ ~ %) | 6,4 su notte · **mai su chiaro** (2,6:1) |
| `linea` / `linea-notte` | #CCC5B7 / #2B333D | Filetti decorativi | decorativi |
| `bordo-campo` / `bordo-campo-notte` | #7A7468 / #6E7680 | Bordi dei campi dei form | 4,1 su calce · 3,5 su pietra / 4,1 su notte |
| `errore` / `errore-notte` | #B42318 / #FF8A7A | Messaggi di errore | 5,8 / 8,1 |
| `successo` / `successo-notte` | #2E6B3F / #86CFA0 | Conferma di invio | 5,7 / 10,2 |
| `selezione` | #BFDDD8 | Solo `::selection` (il verde-acqua della trama del logo) | inchiostro 12,8:1 |

**Regole d'uso.**
- **Proporzioni indicative per pagina.** Calce circa 55%, notte circa 25%, pietra circa 15%, accenti al massimo 5%.
- **Pulsante primario.** Inchiostro pieno con testo calce su fondo chiaro; calce pieno con testo inchiostro su fondo scuro. **Mai pulsanti blu.**
- **Il blu non fa mai da sfondo** di sezione, non entra in gradienti e non colora i titoli.
- **Link nel testo.** Colore `inchiostro` con sottolineatura di 1 px in `blu-node-scuro`, che diventa 2 px all'hover; su scuro, `calce` con sottolineatura in `blu-node-chiaro`. Così il blu resta raro e il link non dipende solo dal colore.
- **L'arancio va solo su scuro**: su chiaro si usa `terra`. Entrambi segnano esclusivamente luoghi e simboli numerici.
- **Niente gradienti, ombre, bagliori, glassmorphism.** Le sfumature ammesse sono due, entrambe maschere di trasparenza e mai di colore:
  - la maschera che fonde il ritratto con la carta (§4.3);
  - la dissolvenza ai bordi della finestra dell'Orizzonte (G4, 2026-09-28): al massimo 2 rem per lato, solo su tacche ed etichette, mai sulla linea, che resta piena da bordo a bordo. È il bordo di un'inquadratura: dice che la striscia graduata continua oltre lo schermo. Senza, le etichette dei luoghi fuori campo vengono tagliate a metà parola («V» di Varese a 390 px).
- **Il verde-acqua della trama del logo** vive solo come colore di selezione del testo: un dettaglio per chi lo scopre.

**Rapporto con i marchi.** Colori campionati il 2026-09-28 (valori indicativi):
- ITnode: «o» #3C71A5, dal PNG del logo.
- Portali, dalle foto: arancio circa #E6882D, azzurro circa #3E94CA, blu scuro circa #132D41.

`[DA FORNIRE: codici colore ufficiali]`. I marchi Puglia Digitale e Città Digitali compaiono come marchi, dai file originali, e non diventano la palette del sito ITnode. Del loro sistema entra solo l'arancio del segnaposto a goccia, come colore dei luoghi.

---

## 3. Tipografia

### 3.1 Scelta

- **Carattere principale: Schibsted Grotesk**, versione variabile con pesi 400–900.
  - Disegnato da Bakken & Bæck per il gruppo editoriale Schibsted, licenza OFL 1.1, disponibile come `@fontsource-variable/schibsted-grotesk`.
  - Il file latino pesa 47 KB e copre tutti i pesi.
- **Secondo carattere: Fragment Mono 400**, licenza OFL, `@fontsource/fragment-mono`.
  - File latino da 25 KB.
  - Solo per etichette, gradi, coordinate e numeri di sezione: il livello «dati» del sito.

**Perché Schibsted Grotesk.** Abbiamo confrontato sei candidati sul copy vero della hero a 1440 e 390 px.
1. **Nasce per l'editoria.** È un grottesco contemporaneo pensato per news e magazine digitali: dà la «sicurezza tipografica» chiesta dal riferimento senza l'aria da startup.
2. **La «I» maiuscola ha le grazie.** È la ragione decisiva. «Il SIII», «ITnode» e «1» restano distinguibili a ogni corpo; con Instrument Sans e Host Grotesk, «Il SIII» si legge «Il Slll». Per un marchio di prodotto fatto di tre I è un requisito, non un gusto.
3. **Un solo file serve tutto.** Titoli a 600 e testo a 400; ha anche le cifre tabellari (`tnum`).
4. **Tiene i corpi estremi.** Solido a 260 px («~200.000», «SIII») e leggibile a 17–20 px; accenti italiani, apostrofo tipografico e « » verificati.
5. **Non è un default SaaS.** Inter, Geist, Manrope e Poppins sono stati esclusi a priori.

**Scartati.**
- Instrument Sans e Host Grotesk: ambiguità I/l.
- Hanken Grotesk: generico.
- Epilogue: troppo largo, da moda.
- Archivo: 90 KB con l'asse di larghezza e un'aria da news sportive.

### 3.2 Scala

La scala è fluida, con i valori misurati a 390 e 1440 px.

| Token | Uso | `font-size` | 390 px | 1440 px | Peso | Interlinea | Tracking |
|---|---|---|---|---|---|---|---|
| `display-xxl` | Numeri giganti, «SIII», numerazione dei capitoli | `clamp(4.5rem, 18vw, 17.5rem)` | 72 | 259 | 600 | 0,82 | −0,045em |
| `display-xl` | H1 delle hero | `clamp(2.75rem, 1.79rem + 6vw, 9.375rem)` (G4: minimo di 44 px sotto i 390 px, per il reflow a 320 px) | 52 | 115 | 600 | 0,92 | −0,035em |
| `display-l` | H2 di sezione, statement principali | `clamp(2.5rem, 6vw, 6.25rem)` | 40 | 86 | 600 | 0,98 | −0,03em |
| `display-m` | Seconda riga del Passaggio, statement secondari, nomi dei capitoli | `clamp(1.75rem, 4.2vw, 4.75rem)` | 28 | 60 | 400; 600 come partenza di un Passaggio o come titolo (vedi Regole) | 1,04 | −0,022em |
| `display-s` | Titoli di voce: benefici, luoghi, tappe, step; frase dei ponti «Gli altri mondi ITnode» | `clamp(1.375rem, 2.2vw, 2.25rem)` | 22 | 32 | 600; 400 nella frase dei ponti, che non è un titolo | 1,1 | −0,015em |
| `lead` | Paragrafi d'apertura | `clamp(1.25rem, 1.6vw, 1.625rem)` | 20 | 23 | 400 | 1,4 | −0,005em |
| `body` | Testo corrente | `clamp(1.0625rem, 0.95rem + 0.35vw, 1.25rem)` | 17 | 20 | 400 | 1,55 | 0 |
| `small` | Didascalie, microcopy, note legali | `0.9375rem` | 15 | 15 | 400 | 1,5 | 0 |
| `label` (mono) | Etichette, gradi, coordinate, numeri di sezione | `clamp(0.75rem, 0.7rem + 0.15vw, 0.8125rem)` | 12 | 13 | 400 | 1,4 | +0,06em, maiuscolo |

**Rispetto alle linee guida (§04).** Su desktop i valori coincidono (H1 a 8vw fino a 150 px; H2 a 6vw fino a 100 px; body a 20 px, dentro 18–21). Cambiano solo i minimi, e le misure lo motivano:
- **H1: 52 px invece di 64.** A 64 px «La tecnologia» occupa 381 px e non entra nei 350 px utili di uno schermo da 390; andrebbe a capo lasciando «La» da solo.
- **H2: 40 px invece di 44.** Mantiene un rapporto di 1,3 con l'H1 anche su mobile.

**Regole.**
- **Pesi.** Due soli: 600 per i titoli e il grassetto nel testo, 400 per tutto il resto. Niente corsivi. Maiuscolo solo nelle etichette mono.
  - **Peso di `display-m`** (G4, suggerimento S4 della review UI; precisato dopo la verifica C14).
    - **600** quando è la partenza di un Passaggio. I Passaggi composti interamente in `display-m` stanno a 600 in tutti e due i registri, perché l'arrivo non scende di gradino e quindi non cambia voce: su `/siii/` «Non raccontare la tua azienda. / Falla esplorare.», «Il sito diventa un luogo.», «Una visita che diventa azione.».
    - **600** anche quando è il titolo (H2 o H3) di una sezione o di una voce: il titolo del video, i nomi delle città, «Perché aderire a Puglia Digitale».
    - **400** quando è l'arrivo che scende da una partenza più grande (hero della Home, capitoli), un descrittore («Siti Interattivi Immersivi»), il nome di un capitolo, una citazione, o una frase di raccordo non composta come Passaggio («Un’impresa. Un territorio. Una rete di città.»).
    - Nel sito costruito la resa è già questa.
    - I ponti «Gli altri mondi ITnode» non usano `display-m` (R2 del ricontrollo UI, 2026-09-29). Hanno l'occhiello in `label` mono e la frase in `display-s` a 400, perché la frase non è un titolo: vale la regola generale dei pesi. La versione 0.4 li citava qui per errore.
- **Scala tra sezioni.** Due titoli consecutivi non usano mai lo stesso gradino di scala (vedi la colonna «Titolo» in §7).
- **Misura.** Il body sta al massimo a 66 caratteri, il lead a 42. I titoli si governano con colonne e a capo d'autore.
- **A capo.** `text-wrap: balance` sui titoli, `text-wrap: pretty` sui paragrafi; nessuna sillabazione automatica nei titoli; `lang="it"` sul documento.
- **Frecce delle CTA.** Sono SVG inline con tratto 1,5 px e terminazioni squadrate, mai glifi: → e ↗ **mancano** nei sottoinsiemi latini di entrambi i font (verificato).
- **Coordinate.** Sempre in gradi decimali: ′ e ″ mancano in quasi tutti i sottoinsiemi latini.
- **Numeri approssimati.** «~200.000» ha un testo accessibile «circa 200.000», perché i lettori di schermo pronuncerebbero «tilde».
- **Caricamento.** Schibsted va in preload con `font-display: swap` e un font di ripiego con metriche corrette (`size-adjust`) per non generare CLS. Fragment Mono non va in preload. Confermato al G4 dopo il confronto di Fase 5: il preload resta (ADR 005, con le condizioni per riaprire la decisione).

---

## 4. Immagini

### 4.1 Tre regole

1. **Una foto reale è un documento.** Si taglia, non si ritocca, e la didascalia dice solo fatti verificati.
2. **Una foto non documentale non finge di esserlo.** I ritratti del fondatore con fondali generati si usano solo se l'utente lo decide (DR3, §4.3). In quel caso si trasformano: monocromia a inchiostro, taglio stretto, nota di trasparenza e nessuna didascalia che li leghi a un evento.
3. **Dove manca un'immagine, lo spazio resta progettato.** In lavorazione mostra un segnaposto dichiarato, in pubblicazione una variante tipografica (§4.5). Mai stock, mai immagini generate da noi.

### 4.2 Foto dell'evento Puglia Digitale (`evento-puglia-digitale.jpg`, 1365 × 768)

È l'unica fotografia documentale disponibile e contiene tutto il concept in un'immagine:
- il palco con il fondatore e il marchio Puglia Digitale;
- due maxischermi con tour virtuali a 360° (una vista aerea di città con le attività come punti; una piazza storica);
- una platea numerosa e reale.

**Ritagli**, con coordinate in pixel sull'originale. Tutti escludono la cornice bianca, il marchio in sovrimpressione in alto a sinistra, la scritta «Digital Innovation for the Territory» e il simbolo ✦.

| Ritaglio | Area (x, y, larghezza × altezza) | Formato | Uso |
|---|---|---|---|
| **Panorama** | 46, 124, 1272 × 560 | 2,27:1 | Home §3 «Documento» (desktop e tablet) |
| **Città** | 46, 124, 448 × 560 | 4:5 | Home §3 su mobile: lo schermo con la città vista dall'alto a 360° e la platea |
| **Palco** | 470, 124, 448 × 560 | 4:5 | Home §6, chiusura della timeline del fondatore (opzione DR3-a, §4.3) |
| **Schermo** | 880, 124, 438 × 548 | 4:5 | Puglia Digitale §2: la piazza a 360° sul maxischermo e chi la guarda |

In Home la foto compare al massimo due volte, in ritagli con soggetti diversi.

- **Colore.** Intatto: nessun filtro, viraggio o duotono. Solo esportazione ottimizzata in AVIF e WebP.
- **Limite di risoluzione.** Il ritaglio pulito misura 1272 px: la foto non va mai a tutto schermo e resta al massimo a 1200 px CSS. Sugli schermi ad alta densità si ammorbidisce, quindi l'originale è la prima richiesta (§4.6).
- **Nodi sul Panorama.** Sono pulsanti numerati, con una legenda sotto la foto sempre visibile su mobile. La legenda descrive solo ciò che si vede, senza fatti da verificare. Posizioni in percentuale del ritaglio:
  1. Schermo sinistro (13%, 18%): «Una città vista dall'alto a 360°: le attività sono punti da aprire».
  2. Palco, sul leggio accanto all'oratore (36%, 31%): «Il palco». Il nome di chi parla si aggiunge solo dopo la conferma (registro F7). Nella versione 0.1 il nodo stava a (44%, 30%), sul busto di una persona non identificata: un segno d'interazione non va sul corpo di qualcuno (G4, N7; posizione misurata da ui-designer, C14-2).
  3. Schermo destro (84%, 17%): «Una piazza storica esplorabile a 360°».
- **Didascalia.** Servono tre cose: l'originale dello scatto, cioè la conferma che la scena non è alterata; il luogo; la data (brief consolidato, registro A4). Solo allora va in mono il testo di copywriter-brand (2026-10-07): «L'evento Puglia Digitale · {luogo}, {data}». Se l'autore è noto ed è d'accordo, si aggiunge «· foto {autore}».
  - Senza «regionale», come nel nodo 2: non deve suggerire un legame istituzionale (brief, A2). È anche il nome della sezione.
  - Nessun numero di partecipanti se non documentato.
  - Su un'immagine elaborata con strumenti di intelligenza artificiale non va nessuna didascalia con luogo e data: legherebbe a un evento preciso una scena che non è un documento (§4.1, regola 2).
- **Persone in platea (A4).** I ritagli scelti mostrano la platea di spalle, ma la liberatoria o l'informativa dell'evento va comunque verificata. Senza, si stringono i ritagli sui due schermi e sul palco, escludendo i profili ai margini.
- **Nota di veridicità.** La sovrimpressione con il simbolo ✦ in basso a destra somiglia al segno che lasciano alcuni strumenti di editing generativo; la scritta «Digital Innovation for the Territory» non si usa (A6). Va chiesto il file originale senza sovrimpressioni e la conferma che la scena non è stata alterata.
- **Nuova versione per la Home** (richiesta dell'utente del 2026-10-07: «aggiorna questa in home»). Indicazioni del creative-director prima di vedere il file (`docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md`, §4). I ritagli li rivedo nell'anteprima.
  - **Che cos'è.** La stessa scena senza cornice, logo, scritta e ✦, più grande (circa 1672 × 941 px). Ma l'oratore ha un'altra posa, quindi è un'altra elaborazione, non l'originale dello scatto.
    - La nota «Immagine elaborata con strumenti di intelligenza artificiale» resta (B4, I7), e nessuna didascalia con luogo e data.
    - Cambia solo con la conferma scritta del cliente che la scena non è alterata.
  - **Stessi formati di oggi.** Panorama 2,27:1 per desktop e tablet, «Città» 4:5 per il telefono: impaginato, nodi e legenda non si spostano, e lo scambio non causa CLS. Le aree si ricalcolano sul file nuovo.
  - **Panorama: usare lo spazio liberato.** Oggi il ritaglio taglia lo schermo destro, sopra e a destra, e la parte alta del marchio sul fondale, per evitare la cornice. Il nuovo ritaglio contiene interi i due schermi e il marchio Puglia Digitale del fondale, con un margine sopra di almeno il 2% dell'altezza. Sotto, la platea si taglia dove cade.
    - Se l'inquadratura è la stessa di oggi (scala 1,225), l'area è all'incirca su tutta la larghezza: 0, 55, 1672 × 736 `[IPOTESI: da verificare sul file]`.
  - **«Città» 4:5:** lo schermo sinistro intero, con il suo menu laterale, e la platea sotto. Più o meno 40, 120, 549 × 686 `[IPOTESI]`.
  - **In tutti e due:** colore intatto; nessun profilo riconoscibile ai margini (A4); mai più di 1200 px CSS, come oggi.
  - **Nodi:** gli stessi tre, rimisurati da ui-designer sui ritagli nuovi.
    1. Sul contenuto dello schermo sinistro, non sul menu né sulla cornice.
    2. Sul leggio accanto all'oratore, mai sulla persona (N7).
    3. Sul contenuto dello schermo destro.

    Sul telefono resta solo il nodo 1.
  - **Legenda e testo alternativo:** descrivono solo ciò che si vede.
    - Se sugli schermi si legge il portale Puglia Digitale con il suo menu, le voci 1 e 3 si riscrivono: legenda di copywriter-brand, testo alternativo di copywriter-content.
    - Se non cambia nulla di visibile, restano.
  - **`/puglia-digitale/`** (ritaglio «Schermo», §2) tiene la versione di oggi, perché l'utente ha detto «in home». Ma due pose diverse dello stesso oratore sullo stesso sito si notano, e indeboliscono tutte e due le immagini. Va chiesto all'utente se aggiornare anche quella pagina (Domande aperte).

### 4.3 Ritratti del fondatore (decisione DR3, in attesa dell'utente)

Le quattro foto hanno fondali con skyline di grattacieli e reti luminose: è l'estetica vietata dalle linee guida (§33), estranea al territorio (in Puglia non ci sono grattacieli) e con segni di generazione o ritocco con AI (brief consolidato, I7). Il brief consolidato registra la scelta come **DR3**: decide l'utente, sentito il creative-director.

**Stato al G4 (2026-09-28).**
- Il sito costruito applica (b), scelta della sessione principale in attesa della conferma dell'utente (ADR 002).
- Nel frattempo la review di veridicità ha messo la stessa nota AI anche sotto la foto dell'evento (B4): il vantaggio di (a), «un documento invece di un ritratto», vale solo quando arriva l'originale dello scatto.
- **Parere aggiornato: (b) per il lancio, con le maschere più strette qui sotto; (c) appena possibile.** Il ritratto reale resta il miglioramento più forte dell'intero sito: toglie le note AI, lo skyline e l'aria da ritratto aziendale.

**Parere iniziale del creative-director (Fase 2, superato dall'aggiornamento qui sopra): opzione (a) subito, (c) appena possibile.**
- **(a)** La sezione del fondatore si chiude sulla foto reale: il ritaglio «Palco», con il fondatore sul palco davanti a una sala piena. Che sia lui lo dice la descrizione degli asset `[DA VERIFICARE: D6]`. È un documento, non un ritratto, ed è più forte di un ritratto da studio. In Contatti la sezione «Persona» diventa tipografica (§7.7).
- **(c)** Uno shooting reale (§4.6, priorità 4) sostituisce o affianca il «Palco».
- **Perché non (b).** Un'immagine realistica di una persona reale in una scena generata:
  - rientra negli obblighi di trasparenza dell'AI Act (art. 50, dal 2 agosto 2026, fonte citata nel brief consolidato);
  - contraddice la promessa del sito, rendere esplorabili spazi veri;
  - porta dentro l'estetica vietata.

**Se l'utente sceglie (b)**, le specifiche sono pronte e testate:

| File | Decisione con (b) | Taglio (x, y, l × a) | Uso |
|---|---|---|---|
| `fondatore-braccia-conserte.jpg` | Usata | testa e spalle, centrata: 445, 36, 480 × 480 (1:1), con le lettere del marchio tolte dallo sfondo (eccezione del 2026-10-07, sotto). Prima: 566, 36, 480 × 480 | Home, chiusura della timeline, al massimo 400 px CSS |
| `fondatore-in-piedi.jpg` | Usata | 470, 40, 420 × 560 (3:4) | Contatti, al massimo 320 px CSS |
| `fondatore-palco-citta-digitali.jpg` | Scartata anche con (b) | — | Palco, platea e schermo con marchio la farebbero leggere come documentazione di un evento che non possiamo verificare; porta il simbolo ✦ |
| `fondatore-presentazione-platea.webp` | Scartata anche con (b) | — | Stessa ragione |

Con (b), sotto ogni ritratto va una nota mono: «Immagine generata o elaborata con strumenti di intelligenza artificiale» finché il cliente non chiarisce la provenienza (review di veridicità, I5), con testo definitivo e verifica legale a cura di brand-strategist e consulente.

**Trattamento «inchiostro»** (testato), solo con (b):
1. Luminanza pesata sul canale blu (0,15 R + 0,25 G + 0,6 B), con contrasto ×1,2 e −30: lo skyline azzurro si schiarisce quasi fino alla carta.
2. Mappatura dei toni da `inchiostro` #141413 a `calce` #F3F1EC.
3. Maschera CSS che fonde il lato destro nella carta, per assorbire ciò che resta dello skyline. Valori del G4, provati a 2× sui derivati (verifica UI, V6):
   - Home, `fondatore-braccia-conserte`: `linear-gradient(to right, #000 80%, transparent 100%)` dal 2026-10-07, con il ritaglio centrato. Lì a destra resta poco skyline, in basso, e basta una sfumatura sul bordo. Prima era `#000 40%, transparent 74%`;
   - Contatti, `fondatore-in-piedi` (figura più stretta): `linear-gradient(to right, #000 36%, transparent 68%)`.

   Con questi valori grattacieli e linee a nodi quasi spariscono e la figura resta intera, con il bordo del braccio appena ammorbidito. Il valore iniziale (62% → 100%) e il successivo (48% → 86%) lasciavano leggibili skyline e «reti luminose».

I derivati si generano con uno script sharp versionato nel repository; gli originali restano intatti. La sfumatura verso la carta presuppone che il ritratto stia su fondo `calce` (vedi §7).

- **Mai:** versioni a colori, scontorni, ritocchi o estensioni generative, didascalie con luoghi e date, inquadrature «dal vivo sul palco».
- **Eccezione del 2026-10-07: il ritratto della Home centrato.** L'utente ha scritto: «quella in basso di Giacomo non è centrata».
  - **Il problema.** Il ritaglio di prima (566) stava a destra del marchio «Città Digitali», che nell'originale è subito a sinistra del fondatore. Così la testa finiva al 24% della larghezza, e la destra si scioglieva nella carta: si leggeva come un errore.
  - **Perché il ritaglio da solo non basta.** Qualunque riquadro centrato sulla testa più largo di 240 px contiene le ultime lettere del marchio, tagliate: «À» e «ALI». A 240 px la risoluzione non regge i 400 px CSS.
  - **Che cosa è ammesso, e niente altro.**
    - Si tolgono le lettere del marchio che il ritaglio taglierebbe, riempiendole con il fondo chiaro circostante.
    - Dove l'ultima «I» copriva la spalla, il bordo della giacca si ricostruisce sulla linea misurata ai due lati.
    - Lo script sharp è deterministico e versionato in `scripts/prepare-assets.mjs`. Nessuno strumento generativo, originale intatto.
    - Volto e figura non si toccano, e il resto dello sfondo, skyline compreso, resta com'è: lo assorbono il trattamento «inchiostro» e la maschera.
  - **Perché è un'eccezione accettabile.**
    - Il ritratto non è un documento (DR3-b) e lo dichiara: la nota AI resta.
    - L'intervento toglie solo un segno grafico sovrapposto, cioè fa ciò che il ritaglio non può fare senza decentrare la figura.
    - Non rende l'immagine più credibile come fotografia, e non cambia la persona.
  - **Contatti no.** Il ritratto di `/contatti/` (`fondatore-in-piedi`) ha lo stesso schema, ma centrarlo vorrebbe dire togliere più lettere («TÀ» e «TALI», una sulla spalla) e lo skyline a sinistra in basso e a destra. Sarebbe un ritocco più ampio, per una pagina dove l'utente non l'ha chiesto, quindi resta com'è. Se l'utente lo chiede, si usa lo stesso metodo e il creative-director rivede il risultato.
  - **La soluzione vera resta il ritratto reale** (opzione c, §4.6, priorità 4): toglie nota, skyline e ritocchi in un colpo solo.
- **Alt:** «Ritratto di Giacomo Lenoci, fondatore di ITnode». `[DA VERIFICARE: nome]`

### 4.4 Logo

- **Stato del file.** `logo-itnode.png` misura 192 × 114 px ed è **completamente opaco**: ha un fondo bianco, non è trasparente. Su `calce` e `notte` è inutilizzabile, quindi serve un ridisegno vettoriale.
- **Anatomia, da rispettare nel ridisegno.** Wordmark «it» + «N» + «o» + «de» in un sans geometrico nero e bold. La «o» è un anello #3C71A5 con il vuoto interno spostato in alto a destra, quindi più spesso a sinistra e in basso. Dietro c'è una trama poligonale verde-acqua (circa #BFDDD8).
- **Versione web proposta** (decide il cliente):
  - solo il wordmark, senza trama;
  - «it», «N» e «de» in `inchiostro` su chiaro e in `calce` su scuro; la «o» sempre #3C71A5, che su `notte` regge 3,6:1 come elemento grafico;
  - altezza di 28 px su desktop e 24 px su mobile;
  - area di rispetto pari all'altezza della «o».
  - La trama resta per i formati grandi, se il cliente la vuole.
- **Favicon.** L'anello della «o» su fondo calce.

### 4.5 Segnaposto degli asset mancanti

**In lavorazione** (staging e review col cliente), il segnaposto dichiara che cosa serve:
- stesso formato dell'asset finale, così che la sostituzione non causi CLS;
- superficie `pietra` su chiaro o `notte-2` su scuro, filetto di 1 px (`linea`);
- quattro segni di taglio a «L» di 12 px agli angoli, a 8 px dal bordo;
- in alto a sinistra, un'etichetta mono: «ASSET RICHIESTO · FOTO», «· SCREENSHOT» o «· POSTER VIDEO»;
- in basso a sinistra, la descrizione in `small`, per esempio: «Monopoli: il porto vecchio dal molo, luce naturale, orizzonte visibile. Porta 3:5, lato lungo di almeno 2400 px.»;
- in basso a destra, il formato («3:5») e, se è un luogo, le coordinate.

**In pubblicazione**, se l'asset non è arrivato, un flag nel contenuto (per esempio `asset: pending`) mostra una **variante tipografica** completa, senza richieste visibili:
- **luogo:** nome in `display-m`, coordinate e nodo su un filo d'orizzonte;
- **esperienza SIII:** nome, luogo, e orizzonte con i nodi (lo «spazio esplorabile» astratto);
- **poster del video:** superficie `notte`, titolo e pulsante di riproduzione.

Precisazioni del G4, sul sito costruito (flag `PUBLIC_SLOT_MODE=publish`):
- **Esperienze SIII: niente nome né luogo dentro il pannello**, né in Home né su `/siii/`: su `/siii/` li dicono l'H3 e la riga del luogo subito accanto. Un pannello scuro con un titolo e dei punti rischia di leggersi come una finta schermata. Nei pannelli larghi almeno 700 px, sotto le tacche lunghe vanno i gradi ogni 45° (V9 della verifica UI), come nel Confronto: senza, l'orizzonte si legge come un righello.
- **Luoghi:** dentro la porta restano nome, nodo e rilevamento con la distanza (o «SEDE»). Le coordinate stanno già sotto l'H3 accanto e non si ripetono.
- **Poster del video:** vale solo finché il file non è ospitato sul sito. Con il video pubblicato il poster è un fotogramma reale, scelto dal creative-director.

**Mai:** riquadri grigi con icona «immagine», icone di immagine rotta, lorem ipsum, stock, immagini generate.

### 4.6 Asset da chiedere, in ordine di priorità

L'elenco coincide con i materiali mancanti del brief consolidato (§7). Qui si aggiungono formati, risoluzioni e direzione fotografica.

1. **Foto evento:** originale ad alta risoluzione senza cornice e scritte, con luogo, data e autore.
2. **Screenshot delle tre esperienze SIII** (Masseria Santella, Maison Miminà, D.L. Natura Dentro): **ricevuti il 2026-10-07 e in uso** (§4.8). Le viste desktop sono di 2000 × 1250 px: se possibile, le stesse a 2560 × 1600 per gli schermi grandi. Resta da registrare il consenso scritto delle tre imprese (A7).
3. **Video Città Digitali:** il file, o il permesso di ospitarlo, un poster, la durata e l'indicazione se c'è parlato (in quel caso servono i sottotitoli).
4. **Un ritratto reale del fondatore**, in un luogo vero (ufficio o Acquaviva), con luce naturale e senza schermi alle spalle.
5. **Foto dei luoghi.**
   - Acquaviva delle Fonti, Gravina in Puglia, Monopoli: Porta 3:5, lato lungo di almeno 2400 px. Per le tre città oggi si usano le immagini del portale con i segni grafici (§4.7); resta valida la richiesta degli originali senza grafica e ad alta risoluzione.
   - Varese, Altamura, Caltanissetta: Porta 3:5 o Schermo 16:10.
6. **Marchi vettoriali** di ITnode, Puglia Digitale e Città Digitali, con i codici colore.
7. **L'elenco delle 30+ città** di Puglia Digitale, per la carta ed eventualmente un marquee.

**Direzione fotografica per le foto da produrre.** Il riferimento è «Viaggio in Italia» (1984, Luigi Ghirri e altri): luoghi ordinari guardati con attenzione, inquadrature frontali, orizzonte in vista, luce naturale, colori veri. Le persone sono ritratte al lavoro nei loro spazi.
- **No:** droni saturi, HDR, tramonti da cartolina, visori VR, mani su tablet con ologrammi, folklore.

### 4.7 Immagini dei luoghi dal portale del cliente: Acquaviva delle Fonti, Gravina in Puglia, Monopoli (eccezione dell'utente, 2026-10-06)

- **File.** `src/assets/images/acquaviva-digitale.webp`, 1248 × 832 px, senza metadati.
  - È l'immagine di Acquaviva del portale del cliente, cittàdigitali.it (`wp-content/uploads/2026/02/Acquaviva_digitale_image.webp`). L'ha fornita l'utente il 2026-10-06.
  - Autore, data, diritti e uso di strumenti di AI non sono noti `[DA FORNIRE]`.
- **Che cosa mostra.**
  - Una piazza in pieno sole: sul fondo un palazzo color ocra, a destra una fila di edifici in pietra con un lampione, in primo piano una ringhiera e uno spazio ribassato in pietra.
  - Sopra la foto c'è una grafica digitale: pannelli trasparenti azzurri e luminosi, segnaposto arancioni, scintille nel cielo.
  - Il nome della piazza e degli edifici non è verificato `[DA VERIFICARE]`: non si scrive in nessun testo.
- **L'eccezione.**
  - La grafica va contro le linee guida §33 («NO glow neon gratuiti», «NO dashboard finte», «NO eccesso di glassmorphism») e contro la direzione fotografica del §4.6 («mani su tablet con ologrammi»).
  - L'utente l'ha scelta sapendolo, tra tre alternative: l'originale senza grafica, un ritocco con AI, l'attesa. Le sue parole: **«lascia i segni grafici, segnano l'aspetto digitale della città»**.
  - Obiettivi e identità li decide l'utente (CLAUDE.md, «Come si risolvono i conflitti», punto 4). L'eccezione si registra e non si riapre: ADR 007.
- **Perimetro.** Vale per le tre immagini del portale, nelle tre porte della sezione «I luoghi» di `/puglia-digitale/`: prima Acquaviva, poi Gravina e Monopoli, per estensione decisa dall'utente (sotto).
  - Non diventa uno stile del sito: altrove valgono le linee guida §33 e il §4.6.
  - Per estenderla ad altre immagini serve una nuova decisione dell'utente.
- **Il ritaglio fa il lavoro.** La grafica non si tocca: niente ritocchi, cancellazioni o estensioni. È il ritaglio a scegliere quanta grafica entra.
  - **Riquadro sull'originale: x 388, y 36, 462 × 770 px**, 3:5 esatto.
  - **Pannelli.** Tre pannelli grandi delimitano una fascia libera larga 462 px: a sinistra uno in alto (fino a x 386) e uno in basso (fino a x 383), a destra uno da x 850. È l'unico 3:5 che non taglia a metà nessun pannello sul bordo (bordi misurati colonna per colonna).
  - **Segni che restano.** Dentro restano i segni piccoli: tre pannelli piccoli, quattro segnaposto e le scintille. Il segno voluto dall'utente si vede, e la piazza resta il soggetto.
  - **Orizzonte.** La linea più forte della foto, la ringhiera sul fondo della piazza (y 483 sull'originale), cade al 58% dell'altezza. È la quota dell'orizzonte nelle varianti tipografiche delle altre due porte (§4.5) e il rapporto tra cielo e terra della hero: le tre porte guardano alla stessa altezza.
  - **Punto di fuga.** La strada che si allontana tra il palazzo e la fila di edifici converge al 52% della larghezza: un'inquadratura frontale, come chiede il §4.6.
  - **Nodo della porta.** Su desktop il nodo e il filo dell'orizzonte arrivano all'angolo in alto a sinistra, dove c'è solo cielo, senza pannelli né segnaposto.
  - **Scartati.** I ritagli a tutta altezza, 499 × 832, tagliano sempre un pannello grande sul bordo. Quelli più stretti (300 × 500, 260 × 433) andrebbero ingranditi già a densità 1.
- **Colore: intatto**, come la foto dell'evento (§4.2). Nessun filtro, viraggio o monocromia.
  - La monocromia a inchiostro del §4.3 serve ad assorbire i fondali generati dietro una persona.
  - Qui spegnerebbe i segni che l'utente ha voluto, e il colore vero della pietra è il soggetto del luogo.
- **Derivato.** Si genera con lo script versionato degli asset (`scripts/prepare-assets.mjs`, `npm run assets`), dall'originale intatto, senza ridimensionare né correggere il colore.
- **Risoluzione.** 462 × 770 basta a densità 1, perché la porta misura al massimo 387 × 645 px CSS (a 1920 px), e basta sui telefoni.
  - Sugli schermi desktop ad alta densità si ammorbidisce: a 1440 px servirebbero 696 × 1160.
  - Il derivato non si ingrandisce mai. Resta valida la richiesta dell'originale ad alta risoluzione (§4.6).
- **Nota sotto la foto.** Sta in una `<figcaption>` subito sotto l'immagine, dentro la porta: la stessa forma della foto dell'evento (§4.2) e dei ritratti (§4.3).
  - Larga quanto l'immagine, 8 px sotto (`--space-2xs`), in mono alla misura `label`, senza maiuscolo, in `--fg-2`.
  - È testo reale, letto anche dagli screen reader: nell'ordine di lettura viene dopo l'immagine e prima del nome della porta.
  - Su mobile resta nella colonna dell'immagine (circa 130 px a 390 px): con la nota di oggi sono due righe. Una nota più lunga di 4 righe a 390 px va accorciata.
  - Il testo è di copywriter-content (`docs/contenuti/alt-text.md`), con la regola dell'ADR 002: dice solo ciò che è certo. Oggi è «Immagine elaborata digitalmente», e cambia quando il cliente chiarisce l'uso di AI.
  - Nessun credito né fonte sotto la foto, salvo richiesta dell'autore.
- **Testo alternativo.** Lo scrive copywriter-content. Descrive ciò che il riquadro mostra, dal fondo al primo piano e poi i segni grafici, senza il nome della piazza.
- **Gravina in Puglia e Monopoli** (estensione decisa dall'utente il 2026-10-06, con le immagini equivalenti del portale). L'utente ha confermato l'associazione alle città: «è giusto». Valgono le stesse regole: colore intatto, nessun ritocco, la stessa nota, il testo alternativo di copywriter-content.
  - **Gravina** (`gravina-digitale.webp`, 1024 × 1024): una chiesa con il rosone; che sia la cattedrale è `[DA VERIFICARE]`, quindi nessun testo la nomina.
    - **Riquadro: x 444, y 30, 580 × 967.** È pulito, senza pannelli tagliati: i due pannelli a sinistra finiscono a x 437, quello grande in basso comincia a x 452, e a destra il riquadro arriva al bordo dell'immagine.
    - Dentro restano quattro pannelli: uno sul frontone, uno grande in basso a sinistra, uno accanto alla nicchia, uno tenue sotto il rosone.
    - La foto guarda la facciata dal basso e l'orizzonte è fuori campo, quindi la regola del 58% non si applica. Il riquadro tiene la facciata intera, dal pinnacolo del frontone alla soglia del portale; la base del timpano della porta laterale cade al 63%.
  - **Monopoli** (`monopoli-digitale.webp`, 1024 × 1024): una strada imbiancata, una bicicletta rossa, una targa rossa e una finestra con la ringhiera.
    - **Riquadro: x 154, y 0, 614 × 1023**, a tutta altezza.
    - **È il male minore.** I pannelli formano una fascia continua, e un 3:5 che tenga intere la bicicletta e la targa rossa deve tagliarne uno. Taglio quello più tenue, biancastro, a destra a metà altezza: resta dentro per circa il 60%.
    - A sinistra il bordo del riquadro coincide con il bordo di un pannello piccolo (x 154), senza frammenti. Resta fuori il pannello grande sulla porta scura (da x 774), che sarebbe il taglio più visibile.
    - Il davanzale della finestra cade al 61% dell'altezza, vicino al 58%.
  - **Risoluzione.** 580 × 967 e 614 × 1023 sono meglio di Acquaviva: bastano a densità 1 ovunque e sui telefoni, e si ammorbidiscono poco sui desktop ad alta densità.
- **Le tre porte insieme.** Provate in pagina a 1440 e 390 px: tre immagini della stessa serie, con la stessa nota, nessun pannello grande tagliato sul bordo e la linea principale vicina al 58% dove c'è un orizzonte. Le varianti tipografiche restano pronte, se un'immagine venisse ritirata.
- **Quando si rivede.**
  - Se arrivano gli originali senza grafica, o ad alta risoluzione.
  - Se il cliente chiarisce autore e uso di AI: cambia la nota (ADR 002).
  - Se l'utente cambia idea.

### 4.8 Schermate delle esperienze SIII (2026-10-07)

L'utente ha inviato il 2026-10-07 nove schermate delle esperienze di Masseria Santella, Maison Miminà e D.L. Natura Dentro: quattro da desktop, 2000 × 1250 px, e cinque da smartphone, 1200 × 2000 px (`src/assets/images/siii-*.jpg`). Le decisioni sono nel verdetto `docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md`.

- **Sono documenti del prodotto.** Si tagliano, non si ritoccano (§4.1, regola 1).
  - Colori intatti e nessun filtro.
  - Nessuna cornice di telefono o di browser disegnata intorno: la Porta e lo Schermo sono già la cornice (§1.2).
  - Nessun segno nostro sopra.
  - L'interfaccia resta com'è: menu, logo dell'impresa, punti interattivi, assistente. È la prova che un SIII è un sito.
- **Dove e quale.**

  | Dove | Schermata | Formato | Perché |
  |---|---|---|---|
  | Home, capitolo 01 | `siii-masseria-santella-desktop-interno.jpg`: l'ingresso con la volta, la porta a vetri ad arco e il menu | Schermo 16:10, colonne 5–12 | È la vista più luminosa e profonda: fa vedere alla lettera «Spazi reali. / Esperienze digitali.» |
  | `/siii/`, hero | `siii-masseria-santella-mobile-sala.jpg`: la sala con la volta, da smartphone | Porta 3:5 da 64em; sotto, 4:5 ancorata in basso | Il prodotto in uso dentro uno spazio vero. I toni caldi stanno sulla notte e lasciano il primo piano al titolo. È l'elemento LCP e sta nel budget |
  | `/siii/`, esempi | la schermata d'avvio di ogni esperienza (`…-desktop-ingresso.jpg`), un «piccolo pianeta» con il play | Schermo 16:10: 12 colonne, poi 8 a destra e 8 a sinistra; il primo fino a 1440 px (controllo n. 8 del budget) | È la vista che si trova aprendo l'esperienza, quindi la promessa del play e del CTA è mantenuta. Le tre viste fanno una serie: stesso gesto, luoghi diversi. Per decisione dell'utente la schermata è anche un link all'esperienza, in una nuova scheda |

- **Ritaglio della hero sotto i 64em: 4:5 ancorato in basso.**
  - Al centro, la porta si apre su metà del logo e su un soffitto bianco. In alto, mostra il logo intero e taglia il menu a metà, e la sala scende sotto la prima schermata.
  - In basso, nella prima schermata a 390 px ci sono il menu, la sala e il punto interattivo sulla porta. Sul bordo non resta nessun elemento tagliato: perde solo soffitto vuoto, logo e icona del menu.
  - Il ritaglio si fa in build (`mobileCrop` di web-performance-specialist), così i telefoni scaricano solo i pixel che mostrano.
- **Nessun nodo sopra le schermate vere.** I punti li disegna già l'interfaccia: i nostri sarebbero doppioni, o punti che l'esperienza non ha (§1.3, veridicità). I nodi restano sui segnaposto e sulle varianti «in pubblicazione» (§4.5).
- **Marchi di terzi.**
  - Le icone social del menu fanno parte dell'interfaccia e restano.
  - Non si usano schermate in cui i marchi di terzi sono contenuto, come Airbnb e Booking nella schermata dell'appartamento. Farebbero pensare a una partnership e contraddirebbero «Vendita diretta» (cro-specialist, oss. 3; riserva I7).
- **Ogni schermata reale dice di chi è lo spazio e dove sta.** È il dispositivo delle Coordinate applicato alla prova (§1.4), e distingue una schermata vera da un'immagine di repertorio.
  - Negli esempi lo fanno già l'H3 e la riga del luogo.
  - Nella hero di `/siii/` (proposta di cro-specialist, approvata) e nel capitolo 01 della Home (estensione del creative-director) va una riga sotto l'immagine.
  - La riga è in `label` mono `--fg-2`, allineata al bordo sinistro dell'immagine, 8 px sotto (`--space-2xs`), su una riga.
  - Il testo lo scrive copywriter-brand; la proposta è «Masseria Santella · Cassano delle Murge (BA)».
  - Markup e lettura li decide ux-designer, perché i testi alternativi nominano già la masseria.
  - Nel capitolo della Home la riga non è un link: il capitolo resta con una sola CTA (HM-5).
- **Consenso (A7).** Nomi, righe e schermate delle tre imprese vanno online solo con il loro consenso scritto (ADR 002). Il controllo di go-live di cro-specialist lo presidia. Se manca per un'impresa, si tolgono la sua schermata e la sua riga, e torna lo slot (§4.5).
- **Non usate.**
  - La facciata della reception, da smartphone. È l'immagine più forte da sola, ma il blu saturo e la luce piena sulla notte tolgono il primo piano al titolo, e il selciato in basso è stirato dalla proiezione. In più porterebbe l'LCP al limite dell'obiettivo (1,99 s in laboratorio).
  - L'appartamento: ha i marchi di terzi.
  - Da smartphone, l'interno di Maison Miminà e l'ingresso di D.L. Natura Dentro: per pagina basta un telefono.

---

## 5. Hero della Home: «L'orizzonte dei luoghi»

**Idea.** Guardarsi intorno da Acquaviva delle Fonti:
- un orizzonte a 360° porta i luoghi veri in cui lavora ITnode, nella loro direzione e alla loro distanza reali;
- Monopoli e il mare a est (081°), l'entroterra murgiano a ovest (251–256°), Caltanissetta (213°) e Varese (313°) più lontano;
- scorrendo, lo sguardo ruota;
- il titolo sta in piedi su questa linea: è il gesto di un tour a 360°, fatto con tipografia e dati invece che con foto.

### Desktop (≥ 1024 px)

**Campi e titolo**
- **Altezza.** `min(100svh, 960px)`, con un minimo di 640 px. Il bordo alto della sezione successiva deve affacciarsi.
- **Due campi.**
  - «Cielo» `calce` in alto, circa il 58% dell'altezza.
  - «Terra» `pietra` in basso, che prosegue senza stacco nella sezione successiva.
  - Il confine tra i due campi è l'orizzonte.
- **Testi.** Vengono dal copy deck della Home (`docs/contenuti/copy-deck/home.md`). Nessuna CTA nella hero: «Parliamone» è nell'header.
- **Occhiello** (mono, `inchiostro-2`, colonne 1–7): «ITnode — oltre i confini del Web tradizionale» (alternativa già nel copy deck della Home). Decisione del G4: l'occhiello porta il nome e il concetto delle linee guida (§02); che cosa fa ITnode lo dice la riga di posizionamento in `lead`, non l'occhiello (I4).
- **H1, primo registro.**
  - «La tecnologia cambia.» in `display-xl`: a 1440 px misura 115 px di corpo e occupa circa 1117 px, l'83% della misura, lasciando margine contro gli a capo imprevisti.
  - La linea di base sta sopra l'orizzonte di una distanza pari alla profondità dei discendenti: la «g» di «tecnologia» tocca l'orizzonte senza attraversarlo.
- **H1, secondo registro** (nello stesso `<h1>`).
  - «La curiosità ci accompagna / da sempre.» in `display-m` a peso 400, dalla colonna 5, 48–72 px sotto l'orizzonte.
  - Due righe, con a capo d'autore.
- **Riga di posizionamento** (`lead`, colonne 5–11, 24–32 px sotto il secondo registro): «Esperienze digitali immersive per imprese e territori.» È la riga che fa superare il test dei 5 secondi: l'H1 da solo non dice che cosa fa ITnode.
  - È un `<p>` dopo l'`<h1>`, non dentro. La didascalia dell'osservatore (colonne 1–4) si allinea in basso con la riga.
  - Provato in pagina al G4: a 1440 × 900 l'orizzonte scende al 57% dell'altezza (era il 62%) e la riga sta nella prima schermata; a 1024 × 768 la hero intera sta nella prima schermata.
  - **Varianti per il test E1, dopo il lancio** (copy deck della Home, §1). Parere del creative-director per il backlog di cro-specialist:
    - si prova **B**, «Rendiamo imprese e territori esplorabili sul Web.», come sfidante principale della riga attuale;
    - **C** resta di riserva: non dice chi fa che cosa e somiglia a un motto da portale.
    - Tutte e due stanno nella composizione senza modifiche, con la stessa posizione, la stessa scala e gli stessi a capo misurati.

**Orizzonte e luoghi**
- **Orizzonte.**
  - A tutta larghezza, oltre i margini.
  - Campo visivo di 200° sulla larghezza della finestra, centrato su 170°: si vedono Monopoli, Caltanissetta e il gruppo Altamura–Gravina–Cassano.
- **Nodi-luogo** (`terra`) sulla linea.
  - Le etichette mono stanno **sotto** le tacche, con una linea di richiamo, su un massimo di 3 file per evitare sovrapposizioni.
  - I luoghi a meno di 12° l'uno dall'altro si raggruppano in un'unica etichetta, in ordine di rilevamento: «ALTAMURA · CASSANO · GRAVINA — 251–256° · 7–37 KM».
  - Sopra la linea non va nessuna etichetta: lo spazio è del titolo.
- **Didascalia dell'osservatore** (mono, colonne 1–4, allineata in basso con la riga di posizionamento), su tre righe:
  - «Vista da Acquaviva delle Fonti»;
  - «40.90° N · 16.85° E» (`aria-hidden`, come gli altri segni grafici);
  - «Distanze in linea d'aria» (review di veridicità, S2).
- **Nessun invito allo scorrimento** (decisione del G4, su proposta di copywriter-brand). La versione 0.1 prevedeva «Scorri per esplorare», indicato per errore come testo del copy deck: il copy deck non l'ha mai previsto e il sito non lo mostra. Si toglie anche dalla struttura UX (HM-1) e dal design system, per tre ragioni:
  - con il movimento ridotto, o dove le scroll-driven animations non sono supportate, l'orizzonte non ruota, e l'invito prometterebbe qualcosa che non succede;
  - con la riga di posizionamento la hero ha già quattro livelli di testo, e deve respirare (LG §07);
  - «scorri per esplorare» è una formula da template.

  La rotazione resta una scoperta per chi scorre, non una promessa.

### Tablet (700–1023 px)

- Stessa struttura.
- Campo visivo di 200°, come su desktop (G4). Con 150° erano in vista solo Caltanissetta e due etichette tagliate dal bordo, tra cui quella di Monopoli senza il nome («— 081° · …»). Con 200°, da 768 a 1023 px, a riposo le tre etichette sono intere, e nessun richiamo attraversa un'etichetta né a riposo né durante la rotazione. Tra 700 e 767 px il richiamo del gruppo murgiano tocca il frammento di «Varese» che entra dal bordo destro, dentro la dissolvenza (§2): residuo accettato. Vale solo per l'orizzonte della hero della Home. Quello di Città Digitali resta a 150° su tablet: le sue tre città stanno già in vista, e con 200° le etichette di Caltanissetta e Varese si sovrappongono da 700 a 900 px (misurato).
- Secondo registro dalla colonna 3 di 8.

### Mobile (< 700 px)

- **Altezza.** Sul contenuto più 96 px, non forzata a 100svh.
  - L'orizzonte cade a circa il 42% della prima schermata: 352 px su 844 a 390 × 844, misurato al G4 (verifica UI, C14).
  - È la quota che lascia stare nella stessa schermata secondo registro, riga di posizionamento e didascalia. Il 55% della versione 0.1 era una stima dello schizzo, prima della riga di posizionamento e della didascalia su tre righe.
- **H1.** «La tecnologia / cambia.» su due righe (52 px; «La tecnologia» occupa 310 px su 350). Il secondo registro è a 28 px, su due righe a 390 px («La curiosità ci accompagna / da sempre.»), senza rientro: lo separa l'orizzonte.
- **Orizzonte.**
  - Campo visivo di 100°, centrato su 238° (G4, C14-1).
    - Con le coordinate di C11 il gruppo murgiano parte da 251°. Con il centro a 250° stava oltre il centro, e la sua etichetta, che in quel caso pende a sinistra del nodo, usciva dal bordo: di 6 px a 390 px («LTAMURA…») e di 46 px a 320.
    - A 238° l'etichetta è intera e fuori dalla dissolvenza da 390 px in su. Tra 340 e 375 px è intera dentro la dissolvenza; a 320 px sporge di 7 px, residuo accettato.
    - Caltanissetta resta in vista a sinistra; nessun incrocio da 320 a 699 px, anche durante la rotazione.
    - Tra 238° e 250° non c'è nessun luogo, quindi nessun'altra etichetta cambia lato. Tablet e desktop non cambiano.
    - Se cambiano i luoghi o le coordinate, si rimisura (design system §2.1).
  - Al massimo 2 etichette visibili alla volta, in formato compatto (nome e rilevamento, senza distanza) e su due file alternate. Nello schizzo a 390 px le etichette complete si sovrapponevano.
  - **Scorrendo entra Varese** (G4, R1 del ricontrollo UI, 2026-09-29).
    - Su mobile i +60° si compiono nei primi `max(60svh, 60vw)` di scorrimento, non in 100svh. Con il telefono in verticale vale 60svh.
    - **Perché.** L'orizzonte passa sotto l'header sticky dopo 240–330 px di scorrimento, le sue etichette dopo 290–380 px. Con 100svh, a quel punto la rotazione era tra 24° e 34° dei 60°, e Varese restava sfumata sul bordo («VARES») fino a sparire sotto l'header. Il centro a 238° (C14-1) aveva spostato proprio questo momento.
    - **Con 60svh** Varese è intera, fuori dalla dissolvenza e sotto l'header per 70–130 px di scorrimento: per esempio 260–330 px a 390 × 844, 200–280 a 360 × 640, 290–360 a 430 × 932. A riposo non cambia nulla: C14-1 resta com'è.
    - **Perché `60vw`.** È la corsa della striscia: 60° su un campo di 100°. Così l'intervallo non è mai più corto della corsa e la striscia non va mai più veloce della pagina (parere di ux-designer).
      - Con il telefono in verticale la striscia va a 0,46–0,56 px per pixel di scorrimento, 0,83 a 699 × 844. Con 100svh andava a 0,28–0,34.
      - Sui telefoni in orizzontale sotto i 700 px l'header non è sticky e il motivo di R1 non c'è. Lì il limite porta la striscia a 1,00 px per pixel, invece di 1,78 con 60svh e di 1,07 con 100svh.
    - **Quando si rimisura.** Se cambiano il campo visivo mobile, la rotazione, la quota dell'orizzonte o l'altezza dell'header. Con un altro campo, `60vw` diventa (rotazione ÷ campo) × 100vw.
- **Sotto l'orizzonte**, in ordine: secondo registro, riga di posizionamento (20 px), didascalia dell'osservatore. Il totale misurato sta in una schermata da 390 × 844.
- **Header.** Segue la sitemap UX (§4): logo, «Parliamone» compatto e «Menu».

### Movimento

- **Al caricamento.**
  - Nessuna animazione sull'H1, che è l'elemento LCP.
  - Tacche ed etichette compaiono in dissolvenza (500 ms, dopo il primo rendering).
  - Ogni nodo fa un solo «ping» (l'anello si espande e svanisce, 1000 ms, a cascata di 120 ms).
- **Allo scroll.**
  - La riga graduata trasla orizzontalmente, in modo lineare e legato allo scroll, a partire dalla cima della pagina:
    - hero della Home: +60° nei primi 100svh su tablet e desktop, nei primi `max(60svh, 60vw)` su mobile (vedi sopra);
    - orizzonte di Città Digitali: +40° nei primi 100svh.
  - Si ferma quando l'utente si ferma, senza inerzia propria.
  - **L'intervallo si sceglie guardando la finestra visibile.** Conta la parte di rotazione che si vede mentre l'orizzonte è in vista sotto l'header, non quella che si compie dopo.
  - **Mai più veloce della pagina**: al massimo 1 px di spostamento per pixel di scorrimento, anche con il telefono in orizzontale (`docs/ux/accessibilita.md` §2.6).
    - Misura del 2026-09-29, con R1 provata in pagina: da 0,18 a 1,00 px per pixel sui due orizzonti. I formati sono 9, da 360 × 640 a 1440 × 900, con quattro telefoni in orizzontale (568 × 320, 640 × 360, 667 × 375, 915 × 412).
    - Nella hero della Home su mobile il limite è scritto nella regola (`max(…)`). Altrove lo garantiscono campo visivo e rotazione: se cambiano, si rimisura.
- **Implementazione.**
  - CSS scroll-driven animations: `animation-timeline: scroll(root block)` con `animation-range: 0 100svh`, dentro `@supports (animation-timeline: scroll())` e `prefers-reduced-motion: no-preference`. Nella hero della Home su mobile vale `animation-range-end: max(60svh, 60vw)`.
  - Proprietà sempre scritte una per una, mai con lo shorthand `animation`: il minificatore lo fonderebbe con `animation-timeline` in una regola non valida.
  - La versione 0.1 indicava `view()`, che non si usa. L'orizzonte è già in vista al caricamento: con l'intervallo predefinito di una timeline di vista la rotazione partirebbe già avanzata, e l'inquadratura a riposo misurata (C14-1) non sarebbe più quella. La timeline dello scorrimento della pagina parte da zero in cima alla pagina e rende l'intervallo esplicito.
  - Dove non sono supportate, orizzonte statico e nessun polyfill.
  - Un eventuale fallback in JavaScript vanilla (listener passivo più `requestAnimationFrame`, al massimo 1 KB) lo decide `web-performance-specialist`.
- **`prefers-reduced-motion`.** Orizzonte statico sull'inquadratura iniziale, niente ping né dissolvenze.

### Accessibilità e performance

- L'orizzonte è `aria-hidden`: i luoghi hanno link veri più avanti. Kicker e didascalia sono testo reale.
- Nessuna immagine nella hero: LCP = testo dell'H1. L'SVG inline pesa al massimo 6 KB ed è generato al build; nessun JavaScript per il layout.

### Perché non una foto nella hero

- **Risoluzione e formato.** L'unica foto reale utile esce a 1272 px: si ammorbidirebbe a tutto schermo e peserebbe sull'LCP.
- **Tema.** È la documentazione di un evento, mentre l'H1 parla di curiosità.
- **Dove va la foto.** Arriva subito dopo, come «Documento» (Home §3), dove ha il posto e la misura giusti.

### Evoluzione

Quando arriverà un panorama equirettangolare reale (per esempio una piazza di Acquaviva), il campo «terra» diventerà una finestra su quel panorama, allineata agli stessi gradi dell'orizzonte.

---

## 6. Motion

**Principio.** Il movimento è uno sguardo che si sposta: rotazioni, aperture, ingressi. Accompagna la lettura, non la interrompe. Ogni movimento deve dire «esplorazione, spazio, immersione»; se non lo dice, non c'è.

**Token.**
- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (ingressi)
- `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` (aperture, menu)
- Durate: 150, 250, 500, 700, 1000 e 1400 ms.

| Movimento | Dove | Come | Durata | Easing |
|---|---|---|---|---|
| **Reveal** | Blocchi di testo, immagini, voci di elenco | `opacity` 0→1 e `translateY` 24 px→0; una volta sola; cascata di 80 ms, al massimo 4 elementi | 700 ms | ease-out |
| **Text reveal** | Statement a registri (Il Passaggio) | Ogni riga d'autore sale da una maschera (`translateY` 105%→0); cascata di 90 ms | 700 ms | ease-out |
| **Apertura** (movimento firma) | Immagini, video, showcase | `clip-path: inset(46% 0 46% 0)` → `inset(0)`, con l'immagine che scala 1,06→1: si apre dall'orizzonte | 1000 ms | ease-in-out |
| **Parallax controllato** | Al massimo 1 immagine per schermata | `translateY` dell'immagine dentro la sua soglia, ±6% (massimo 48 px), legato allo scroll | scroll | lineare |
| **Rotazione dell'orizzonte** | Hero della Home; fine della hero di Città Digitali | `translateX` della striscia graduata legato allo scroll: +60° nella Home, +40° su Città Digitali; mai più veloce della pagina. Vedi §5 | scroll | lineare |
| **Marquee tipografico** | Al massimo 1 per pagina | `translateX` legato allo scroll (circa 0,4× la velocità di scroll); mai moto autonomo | scroll | lineare |
| **Disegno di linea** | Carte, costa pugliese, orizzonte del tempo | `stroke-dashoffset` 100%→0, una volta | 1400 ms | ease-in-out |
| **Ping del nodo** | Nodi, all'ingresso della sezione | Anello che scala 1→1,8 con `opacity` 1→0, una volta | 1000 ms | ease-out |
| **Hover e focus del nodo** | Nodi | Anello ×1,4, comparsa dell'etichetta | 250 ms | ease-out |
| **Hover dei link** | Link testuali | Sottolineatura da 1 a 2 px e cambio di colore | 150 ms | ease-out |
| **Hover delle CTA** | Pulsanti e CTA con freccia | Freccia che trasla di 4 px verso destra; cambio di fondo | 250 ms | ease-out |
| **Hover della soglia** | Showcase, porte dei luoghi | Immagine che scala 1→1,03; solo con `(hover: hover) and (pointer: fine)` | 700 ms | ease-out |
| **Menu mobile** | Apertura e chiusura | Dissolvenza con lieve traslazione del pannello; voci a cascata di 40 ms, al massimo 300 ms in tutto; il pannello si usa subito. Dialog modale, focus ed Esc come da sitemap UX (§4) | 250 / 150 ms | ease-out |
| **Header sticky** | Dopo il primo scroll | Compaiono il fondo pieno (`calce`, o `notte` sulle pagine con hero scura) e il filetto; l'altezza non cambia (niente CLS). Durata entro i 200 ms della sitemap UX (§3.3) | 150 ms | ease-out |
| **Transizione tra pagine** | Tutte | View transition cross-document solo CSS (`@view-transition { navigation: auto; }`): dissolvenza, header persistente; dove non è supportata, navigazione normale | 250 ms | ease-out |
| **Video** | Città Digitali | Apertura più autoplay muto solo quando è nella viewport; pausa quando esce | — | — |

**Marquee e WCAG 2.2.2.** Il marquee è legato allo scroll: non parte da solo e si ferma quando lo scroll si ferma. Per questo non ricade nel criterio 2.2.2 (Pausa, stop, nascondi) e il controllo di pausa previsto nel copy deck della Home non serve. Se in futuro si scegliesse un moto autonomo, il controllo tornerebbe obbligatorio. La conferma spetta a `ux-designer`, owner dell'accessibilità.

**Regole tecniche.**
- Si animano solo `transform`, `opacity` e `clip-path`.
- `will-change` solo durante l'animazione.
- Un unico IntersectionObserver condiviso.
- Il legato allo scroll passa da CSS scroll-driven animations dentro `@supports`, con un fallback statico.
- Nessun movimento legato allo scroll va più veloce della pagina: al massimo 1 px di spostamento per pixel di scorrimento, anche con il telefono in orizzontale (`docs/ux/accessibilita.md` §2.6). Se l'intervallo è in `svh`, lo si limita con la corsa dell'elemento, come nella hero della Home (§5).
- **Senza JavaScript tutto il contenuto è visibile.** Lo stato nascosto iniziale si applica solo quando lo script conferma il supporto.

**Da evitare.**
- Scroll-jacking, librerie di smooth scroll, cursori personalizzati, preloader.
- Easing a rimbalzo o elastici, rotazioni e flip 3D, sfocature animate (`filter`).
- Animazioni lettera per lettera; parallax sul testo.
- Loop autonomi (ammessi solo il video e i controlli dell'utente).
- Animazioni su `width`, `height`, `top`, `left` o `font-variation-settings`.
- Qualunque ritardo prima che il contenuto sia leggibile.

**`prefers-reduced-motion: reduce`.**
- Niente reveal: il contenuto è subito visibile.
- Aperture già aperte.
- Parallax, rotazione e marquee fermi; il marquee diventa una riga statica.
- Linee già disegnate.
- Niente autoplay del video, che mostra poster e pulsante di riproduzione.
- View transition disattivate.
- Restano i cambi di colore all'hover e al focus.

---

## 7. Mappa del ritmo

### 7.1 Vocabolario delle composizioni

Tra parentesi, il componente delle linee guida (§30) di cui ogni composizione è una variante.

- **Statement** (LargeStatement): una frase in `display-l` o `display-xl` e molta aria.
- **Passaggio** (LargeStatement, variante a registri): due righe sfalsate.
- **Documento** (ImmersivePreview, variante foto): foto reale in soglia, con nodi numerati e legenda.
- **Capitolo** (ProjectShowcase): numero gigante, nome, statement, visual, microdescrizione e CTA, in tre impaginati diversi.
- **Numeri** (Stats): numeri in `display-xxl` a scalinata, con etichette mono e fonte.
- **Carta** (LocationShowcase, variante geografica): cartografia a filo con i nodi-luogo.
- **Porte** (LocationShowcase): aperture verticali 3:5 disposte secondo la geografia reale.
- **Elenco** (BenefitsSection), in tre varianti: *zig-zag* (numeri giganti alternati), *scala* (ogni voce rientra di una colonna), *sticky* (titolo fermo, voci che scorrono).
- **Confronto** (ImmersivePreview, variante a due stati): la stessa immagine senza e con nodi.
- **Marquee**: fascia tipografica legata allo scroll.
- **Video** (VideoSection): quasi a tutto schermo, che si apre dall'orizzonte.
- **Timeline** (FounderTimeline): orizzonte del tempo.
- **Chiusura** (CTASection e ContactForm): Passaggio, CTA e form.

### 7.2 Regole del ritmo

- Due sezioni consecutive non hanno mai la stessa composizione né lo stesso gradino di scala del titolo.
- La superficie cambia almeno ogni due sezioni. Le sequenze sulla stessa superficie sono volute e dichiarate: la «terra» della Home, la «notte» cinematografica di Città Digitali.
- Ogni pagina contiene almeno:
  - un momento di statement;
  - un momento di dati o di prova reale;
  - un momento di esplorazione (nodi, apertura, esperienza da aprire);
  - una chiusura con CTA.
- Per pagina, al massimo: una sezione sticky, un marquee, un video.
- Ogni pagina ha una **temperatura dominante**, così nessuna pagina è uguale alle altre:

  | Pagina | Temperatura dominante |
  |---|---|
  | Home | equilibrio tra chiaro e scuro |
  | SIII | notte: tecnologia, immersione |
  | Puglia Digitale | calce e terra: territorio, emozione |
  | Città Digitali | notte cinematografica: video, carta notturna |
  | Contatti | calce: funzionale |

### 7.3 Home

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | «L'orizzonte dei luoghi» (§5): H1 in due registri sull'orizzonte graduato con i luoghi reali | calce / pietra | `display-xl` | vedi §5 |
| 2 | Manifesto | Statement su 10 colonne: «ITnode nasce dall'idea di creare un nuovo modo di abitare il Web.»; sotto, sfalsato (colonne 7–11), il `lead` di sintesi su Città Digitali e Puglia Digitale | pietra (la terra continua) | `display-l` | statement e poi lead, senza sfalsamento |
| 3 | Documento | Foto evento «Panorama» su 12 colonne (al massimo 1200 px), apertura, 3 nodi numerati, legenda; didascalia solo con data e luogo confermati (A4) | pietra | — (legenda) | ritaglio «Città» 4:5; legenda sotto |
| 4 | Infrastruttura | Passaggio «Una nuova infrastruttura digitale / per connettere imprese, cittadini e visitatori.»; in basso, marquee legato allo scroll: «spazio fisico → spazio digitale → persone → imprese → territorio →» (frecce SVG) | **notte** (primo ingresso nel digitale) | `display-l`, marquee in `display-m` | statement su 4 righe; marquee più lento |
| 5 | I tre mondi | Tre Capitoli, ognuno aperto da un tratto d'orizzonte con il suo rilevamento. **01 SIII** (000°, notte): «01» in `display-xxl` sulle colonne 1–4, statement «Spazi reali. / Esperienze digitali.» sulle colonne 5–12, soglia Schermo 16:10 con la schermata reale di Masseria Santella (l'ingresso, §4.8) sulle colonne 5–12, senza nodi e con sotto la riga mono del nome e del luogo (con il consenso A7), micro e CTA in basso a sinistra. **02 Puglia Digitale** (120°, calce): la carta della Puglia intera della hero di `/puglia-digitale/`, compatta, con i punti-città, la legenda e la descrizione (§1.4), sulle colonne 1–5; numero in alto a destra, testo sulle colonne 7–12. È la P4, approvata dall'utente il 2026-10-07 («sì, mettila»): il gesto «dalla regione all'Italia» è letterale, perché le stesse città si vedono da vicino nel capitolo 02 e da lontano nel 03. Quando arriverà una foto del territorio, prenderà il posto della carta. **03 Città Digitali** (240°, pietra): carta d'Italia a filo sulle colonne 8–12, con un punto-città per ogni città del progetto e i nomi dove c'è spazio (5 sulle carte strette, 7 sulle larghe; §1.4), senza coordinate sotto i nomi e con una riga di legenda in mono sotto la carta; testo sulle colonne 1–6. Le carte di 02 e 03 sono un unico gesto: dalla regione all'Italia, con impaginati speculari | notte → calce → pietra | numeri `display-xxl`, nomi `display-m`, statement `display-l` → `display-m` 400 (§1.5) | ogni capitolo in quest'ordine: numero, nome, statement, visual, micro, CTA |
| 6 | Fondatore | Passaggio «36 anni dentro l'innovazione. / E ancora la stessa curiosità.» e poi l'orizzonte del tempo **orizzontale e sticky**. Le tappe sono tacche (IBM · anni '90 · prima azienda · 2002 MyComm · IcommLab · Leadstone · oggi: ITnode, Puglia Digitale, Città Digitali). «10.000+ clienti» è un momento numerico in `display-l`, agganciato alla tappa Leadstone con la sua attribuzione (registro N5: clienti delle aziende fondate prima di ITnode) e separato da «oggi» da almeno una tappa di spazio: mai vicino al logo o ai nomi dei prodotti ITnode. Solo «oggi» è un nodo, perché è esplorabile: le sue tre voci sono link alle pagine. Si chiude sulla foto reale «Palco» (DR3-a; ritratto a inchiostro solo con DR3-b) e sulla frase finale in `display-m` | calce | `display-l` | linea verticale a sinistra, tappe in pila, niente sticky |
| 7 | Chiusura | Passaggio, CTA «Parliamone» e contatti rapidi in mono (email, telefono) | notte | `display-xl` | CTA a tutta larghezza |
| — | Footer | Vedi §7.8 | notte | — | colonne in pila |

**Timeline.** È ordinale, non in scala: le date di IcommLab, Leadstone e ITnode sono `[DA FORNIRE]` e una scala in anni le inventerebbe. L'ordine delle tappe segue il brief consolidato (§6), che può ancora cambiare. Con `prefers-reduced-motion` diventa una griglia statica a 4 colonne.

**«10.000+» al lancio (G4, review di veridicità I2).** Si pubblica solo se il cliente conferma il perimetro (quali aziende, quale periodo, clienti o utenti); l'etichetta diventa quella confermata. Senza conferma il numero si toglie e la tappa resta con titolo e data: la timeline regge anche senza un momento numerico, e la colonna vuota prima di «oggi» resta come tempo che passa.

**Rapporto con il copy deck.** Il copy deck raggruppa le sezioni 2–4 in un'unica «Chi siamo» (ancora `#chi-siamo`). I testi sono gli stessi, distribuiti su tre composizioni: l'ancora va sulla sezione 2 e il marquee chiude la sezione 4.

### 7.4 SIII (`/siii`)

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | H1 = «SIII» in `display-xxl` più «Siti Interattivi Immersivi» in `display-m`; Passaggio «Non raccontare la tua azienda. / Falla esplorare.»; a destra una soglia Porta 3:5 con la schermata reale di Masseria Santella da smartphone (la sala, §4.8), senza nodi. Sotto la porta, la riga mono «Masseria Santella · Cassano delle Murge (BA)», con il consenso A7 | notte | `display-xxl` | la porta passa sotto il testo, in 4:5 ancorata in basso (ritaglio in build), con la riga sotto |
| 2 | Definizione | `lead` grande su 7 colonne e `body` sfalsato: il SIII replica gli spazi dell'impresa, navigabili da desktop e smartphone | calce | `display-s` | una colonna |
| 3 | Confronto | Una sola immagine Schermo 16:10 con interruttore accessibile a due stati. «Tour 360° — guardi»: solo orizzonte. «SIII — agisci»: compaiono i nodi (prodotto, video, informazioni, prenotazione). Sotto, 3 righe di differenze in tabella tipografica | pietra | `display-l` | interruttore a tutta larghezza; tabella in pila |
| 4 | Cosa puoi fare | Marquee di verbi in `display-xl` presi dalle 7 azioni delle linee guida (§10), per esempio «Esplora · Interagisci · Guarda · Chiedi · Prenota»; il testo definitivo è del copywriter e nessun verbo può promettere più di quanto il SIII fa. Sotto, l'elenco accessibile delle 7 azioni su due colonne | notte | marquee | elenco in una colonna |
| 5 | Benefici | Elenco *zig-zag*: 4 benefici, numeri `display-xxl` alternati a sinistra e a destra, una idea per schermata; solo formulazioni qualitative (linee guida §11) | calce | `display-s` per voce | numero sopra il testo |
| 6 | Showcase | Passaggio a cascata «Entra. / Esplora. / Interagisci.», poi tre soglie Schermo 16:10 di larghezze diverse (12 colonne; 8 a destra; 8 a sinistra), ognuna con la schermata d'avvio dell'esperienza (§4.8). Per decisione dell'utente la schermata è anche un link all'esperienza, in una nuova scheda, solo per il puntatore. Nome in `display-l`, luogo e portale in mono, CTA «Entra nell'esperienza ↗» (nuova scheda, dichiarata). Nomi e immagini delle imprese solo con il loro consenso (A7) | notte | `display-l` | soglie a tutta larghezza in pila |
| 7 | Chiusura | Passaggio «La tua azienda può diventare un'esperienza.» sulle colonne 1–5, CTA «Richiedi un'offerta →», form sulle colonne 7–12 | calce | `display-l` | statement, poi form |

### 7.5 Puglia Digitale (`/puglia-digitale`)

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | H1 «Puglia Digitale» con il sottotitolo, CTA «Visita il portale ↗» e link «Aderisci a Puglia Digitale ↓». Sotto, **la Puglia intera** (2026-10-06, richiesta dell'utente; §1.4, «La carta della Puglia intera»). La costa è un'unica linea aperta, dal Saccione al Bradano, senza confine regionale né campitura, e si disegna all'ingresso da ovest a est. C'è un punto-città per ognuna delle 31 città di Puglia Digitale. Acquaviva delle Fonti ha l'anello della sede, Gravina in Puglia e Monopoli hanno il nome, gli altri nomi compaiono dove c'è spazio; «MARE ADRIATICO» e «MAR IONIO» stanno in mare. Niente coordinate sotto i nomi (restano nelle porte di «I luoghi») e niente «MURGIA», che tra i punti sembrerebbe una città. Sotto la carta la legenda in mono; la carta è un'immagine con la descrizione L7. **Impaginato da 700 px:** carta allineata a destra, alta circa tre quarti della finestra, larga da 640 a 1100 px e mai oltre le colonne 3–12. La hero diventa una diagonale, con il titolo in alto a sinistra e la Puglia in basso a destra; il vuoto sotto i pulsanti è respiro | calce | `display-xl` | la stessa carta, compatta, a tutta larghezza sotto i pulsanti (da 280 a 632 px), con la legenda: 7 nomi sui telefoni, 10 sulle carte più larghe |
| 2 | Concetto e documento | Passaggio «Dalla costa all'entroterra. / Un territorio da esplorare.»; ritaglio «Schermo» 4:5 in soglia sulle colonne 1–5 (persone che esplorano una piazza pugliese sul maxischermo), testo sul Destination Marketing sulle colonne 7–11; didascalia solo con data e luogo (A4) | pietra | `display-l` | foto a tutta larghezza, poi testo |
| 3 | Numeri | Scalinata: «30+», «~200.000», «60%» in `display-xxl`, ognuno sfalsato di 2 colonne verso destra e verso il basso; simboli + ~ % in `arancio-segnale`; etichette mono. Sotto i numeri, la nota mono «Dati ITnode, aggiornati a [mese anno]» (registro N1–N3). L'etichetta di «~200.000» chiarisce che è il bacino economico dei territori, non le imprese presenti sulla piattaforma (N2). Testi del copywriter | notte | numeri `display-xxl` | numeri in pila allineati a sinistra (72 px: «~200.000» occupa 309 px su 350). **Se al lancio resta solo «30+»** (riserva B3: gli altri due numeri non si pubblicano senza fonte): un solo numero in `display-xxl` dalla colonna 3, etichetta e nota con la data; il titolo si adatta al singolare (copywriter-brand). Se neanche «30+» è confermato, la sezione non si pubblica e il layout resta pronto |
| 4 | I luoghi | Titolo «I luoghi»; tre Porte 3:5 posizionate in orizzontale secondo la **longitudine reale** (Gravina a ovest, Acquaviva al centro, Monopoli a est), con un lieve sfalsamento verticale, su un filo d'orizzonte; nome in `display-s`, coordinate, «Esplora →». Nelle tre porte, le immagini del portale con i segni grafici e la loro nota (§4.7, eccezione dell'utente); le varianti tipografiche restano pronte | calce | `display-l` | pila **da ovest a est**, come la fila desktop e l'ordine del focus: Gravina → Acquaviva → Monopoli (decisione del G4, al posto di «dalla costa all'entroterra»: WCAG 1.3.2 e 2.4.3, un solo ordine a tutte le larghezze) |
| 5 | Perché aderire | Elenco *scala*: le 4 voci rientrano ciascuna di una colonna rispetto alla precedente; numeri in `display-xl`, titoli in `display-s` | pietra | `display-m` | rientri di 16 px |
| 6 | Chiusura | Passaggio «Porta la tua impresa / dentro Puglia Digitale.», CTA «Contattaci →», form su due colonne sotto lo statement; link secondario al portale | notte | `display-l` | form a una colonna |

### 7.6 Città Digitali (`/citta-digitali`)

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | H1 «Città Digitali», Passaggio «Le attività del territorio, / online senza perdere radici.», sottotitolo, CTA «Visita il portale ↗» verso cittàdigitali.it (nuova scheda), con sotto il suo indirizzo «cittàdigitali.it» in `label` mono (O4, sotto), e link secondario «Aderisci a Città Digitali ↓» verso il form della chiusura; nessuna immagine: la hero finisce su un orizzonte che si apre nel video | calce | `display-xl` | — |
| 2 | Video | A tutta larghezza, altezza `min(100svh, 56.25vw)`; apertura dall'orizzonte; controlli minimi (un nodo play/pausa in basso a sinistra, audio, tempo in mono); poster sempre presente: un fotogramma reale del video, scelto dal creative-director quando arriva il file. La copertina non ha un proprio orizzonte (G4, V10): a 768–1024 px sarebbe il secondo nella stessa schermata (§1.1), e il gesto dell'orizzonte che si apre nel video lo fa già quello di fine hero | notte | — (etichetta mono) | 16:9 a tutta larghezza; niente autoplay con Save-Data o reduced motion |
| 3 | L'Italia in un unico portale | Carta d'Italia a filo in `calce` su una colonna alta a destra, con un punto-città `arancio-segnale` per ogni città di Città Digitali e i 3 nodi delle città in evidenza (§1.4); legenda in mono sotto la carta. A sinistra l'H2, il testo, lo statement e il link alla fonte «Tutte le città sul portale ↗», poi le tre città **allineate alla latitudine del loro nodo** (Varese in alto, Altamura al centro, Caltanissetta in basso), con coordinate e «Esplora ↗»; al focus o hover su una città si accende il suo nodo. La carta è solo contorno: nessuna campitura che faccia pensare a una copertura dell'Italia intera (N12). **Stato al 2026-10-05.** (1) Link alla fonte: nel sito. (2) Punto-città: applicato (commit c98f565), come deciso dal creative-director sulla proposta di ui-designer (P1–P5). Ci sono 42 punti senza nome e i 3 nodi delle schede, che si accendono come prima; sulla carta nessun nome. La legenda L1 sta sotto la carta e da 1280 px esce dal flusso. La carta è un'immagine con la descrizione L6, senza nomi, finché l'elenco non le sta accanto (ux-designer). (3) Con il testo della pagina del cliente confermato: l'elenco completo, con i criteri del §1.4 («Il punto-città», elenco in testo), e la sezione ridisegnata per un elenco lungo, con ux-designer. La descrizione si toglie, e carta e legenda tornano `aria-hidden`, alle quattro condizioni del §1.4 («Accessibilità») | notte (continua il buio del video) | `display-l` | carta piccola in alto con la legenda, città in pila |
| 4 | Dal locale al nazionale | Elenco *sticky*: titolo e indicatore mono «01/05» fermi a sinistra, i 5 concetti scorrono a destra; spazio predisposto per dati documentati, nascosto finché non arrivano (linee guida §20) | calce | `display-l` | elenco numerato, niente sticky |
| 5 | Chiusura | Passaggio «La tua azienda merita più di una presenza online. / Merita di essere esplorata.» in `display-xl`; sotto, il form, con «Entra in Città Digitali» come titolo del form e non come CTA. Il form sta subito sotto lo statement, e un link che lo raggiunge sarebbe inutile (`struttura-pagine.md` CD-5; verifica V3 di copywriter-content) | notte | `display-xl` | form a una colonna |


**O4 · Il dominio sotto la CTA della hero** (proposta di seo-content, approvata dal creative-director il 2026-10-05; favorevoli copywriter-content e ux-designer).
- **Perché.** Chi cerca il portale lo cerca qui, e il nome ha un omonimo senza accento che non è del cliente. Vedere «cittàdigitali.it» proprio sotto il pulsante insegna la grafia giusta e dice dove porta il pulsante. È lo stesso gesto degli indirizzi dei portali in Contatti, e il dominio è un dato: in mono, come le coordinate.
- **Dove.** Sotto «Visita il portale ↗», come didascalia del pulsante, allineata al suo bordo sinistro, 8 px sotto (`--space-2xs`). Non sotto tutta la riga delle CTA: su mobile finirebbe sotto «Aderisci», che porta al form e non al portale.
- **Come.**
  - Testo semplice, non un link: nessuna fermata in più al Tab e nessun doppione del pulsante.
  - `label` mono in minuscolo, come ogni dominio (`t-label t-as-is`), in `--fg-2`. Il testo viene da `portal.display`, mai scritto a mano.
  - Resta leggibile dagli screen reader, perché il nome accessibile del pulsante non contiene il dominio (ux-designer).
  - Ordine nel DOM: pulsante, dominio, «Aderisci». È anche l'ordine di lettura.
  - **Impaginato.** Da 40em (640 px) «Aderisci» sta accanto al pulsante, centrato sulla sua altezza, e il dominio sotto il pulsante. Sotto i 40em le tre righe vanno in pila, con 16 px prima di «Aderisci».
  - Perché 40em e non il primo punto in cui stanno affiancati: da 640 px i due link stanno su una riga anche con la spaziatura di WCAG 1.4.12; più stretti verrebbero compressi.
- **Provato** in pagina sullo staging del commit c98f565 e su una build di prova con lo snippet (Chromium), da 320 a 1920 px, anche con la spaziatura di WCAG 1.4.12: nessuno scorrimento orizzontale, nessun testo compresso, il dominio su una riga. La hero cresce di circa 26 px.

### 7.7 Contatti (`/contatti`)

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero e form | H1 «Parliamo del prossimo spazio digitale.» su 12 colonne. Sotto, sulle colonne 1–4, la scheda contatti: sede con coordinate e «Apri in Mappe ↗» (nessuna mappa incorporata), telefono, cellulare, email, LinkedIn. Sulle colonne 6–12 il form | calce | `display-xl` | H1, poi email e telefono come tap target, poi form, poi il resto |
| 2 | Persona | Con DR3-a (raccomandata): composizione tipografica, con nome e ruolo in `display-m` `[DA VERIFICARE: F7]`, una riga del fondatore e link al profilo LinkedIn etichettato come personale (S6). Con DR3-b: ritratto a inchiostro (`fondatore-in-piedi`, al massimo 320 px) con nota di trasparenza | calce (la sfumatura del ritratto lo richiede) | `display-m` | ritratto, se c'è, al 60% della larghezza |
| 3 | Portali | Due righe tipografiche a tutta larghezza: «Città Digitali ↗» e «Puglia Digitale ↗» in `display-l`, URL in mono, filetti; all'hover la freccia avanza | notte | `display-l` | righe in pila |

### 7.8 Elementi fissi e pagine di servizio

- **Header.** Struttura, ordine del focus e stati sono quelli della sitemap UX (§3); qui c'è solo l'aspetto.
  - Logo a sinistra; a destra le 4 voci come testo e «Parliamone» come pillola `inchiostro`.
  - La voce corrente ha il punto del Nodo prima dell'etichetta: non si basa solo sul colore.
  - Sotto i 1024 px: logo, «Parliamone» compatto e «Menu» testuale.
  - Sulle pagine con hero scura (SIII) lo stato iniziale è su `notte`.
- **Menu mobile.** Struttura e comportamento dalla sitemap UX (§4); l'aspetto:
  - pannello a tutto schermo su `notte`;
  - numeri «01», «02», «03» in mono (`aria-hidden`), nomi in `display-l`, descrittori in `small` e `testo-notte-2`;
  - «Parliamone» come pillola `calce`, telefono ed email in mono.
  - I rilevamenti dei capitoli (000°, 120°, 240°) restano in Home: nel menu sarebbero rumore.
- **Breadcrumb** (sitemap UX §5). Sulle pagine interne sta sopra l'H1 della hero, in `label` mono, e prende il posto dell'occhiello: `inchiostro-2` su chiaro, `testo-notte-2` su scuro.
- **Footer.** Blocchi e ordine della sitemap UX (§6), su `notte`. L'ultima riga, in mono, è la firma: «ITnode · Acquaviva delle Fonti · 40.90° N · 16.85° E». Le coordinate sono quelle del comune, non dell'indirizzo, e nessun testo le presenta come posizione della sede (`coordinate-luoghi.md` §5).
- **404.** Su calce: «404°» in `display-xxl`, perché su una bussola non esiste, come la pagina. Un orizzonte con i tre mondi come nodi a 000°, 120° e 240° porta alle pagine. Il copy è del copywriter.
  - Precisazioni del G4: l'orizzonte ha le tacche (senza, a 390 px una linea con tre punti sembra uno slider). Ogni nodo sta dentro l'area del link del suo mondo, perché il blu è interazione (§1.3). Le tre colonne sono allineate in alto.
- **Privacy e cookie.** Su calce, testo su 7 colonne, numeri di sezione in mono. Nessun dispositivo firma: pagine silenziose.

---

## 8. Il «test ITnode»

Cinque domande per ogni sezione, a ogni review. Basta un «no» per riprogettare la sezione.

1. **Se tolgo il logo, è ancora ITnode?** Almeno uno dei quattro dispositivi, oppure un asset o un dato reale di ITnode, deve renderla inconfondibile. Se potrebbe stare sul sito di qualunque azienda tech, si rifà (linee guida §32).
2. **Dove siamo?** La sezione è ancorata a un luogo, a una persona, a uno spazio o a un dato reale, oppure a un anello esplicito della catena spazio fisico → digitale → persone → imprese → territorio.
3. **Cosa posso esplorare qui?** C'è un gesto di esplorazione (un nodo, un'apertura, una rotazione, un'esperienza da aprire) o almeno un invito chiaro a farlo. Non basta raccontare l'immersione: bisogna farla percepire.
4. **È tutto vero?** Ogni nome, numero, immagine e affermazione è reale, attribuito e verificabile. I dati del cliente sono dichiarati come tali; nessuna immagine generata da noi; nessun beneficio quantitativo senza fonte.
5. **Funziona anche ferma?** Deve restare chiara, bella e veloce in quattro condizioni:
   - con `prefers-reduced-motion`;
   - senza JavaScript;
   - a 390 px;
   - su rete lenta.

   Il movimento aggiunge esplorazione, non sostiene la comprensione. E la sezione è diversa da quella che la precede (§7.2).

---

## Ipotesi da validare

- **Font.** Schibsted Grotesk (47 KB, in preload) e Fragment Mono (25 KB, senza preload) stanno nel budget dei font: confermato dalle misure di Fase 5. Il preload resta per decisione del G4 (ADR 005); il suo effetto su Safari iOS non è misurato.
- **Motion.** CSS scroll-driven animations e view transition cross-document come miglioramento progressivo, senza polyfill.
  - Stato al 2026-09-28, da fonti web: supportate in Chromium e in Safari 26 (le view transition da Safari 18.2).
  - Su Firefox le fonti sono discordanti `[DA VERIFICARE]`: lì l'esperienza resta statica.
  - Le misure della rotazione (§5) sono in Chromium. Su Safari iOS vanno riverificate `[DA VERIFICARE]`: la resa, l'unità `svh` dentro `max()` negli intervalli e la sensazione con lo scorrimento a inerzia, che la striscia segue.
- **Coordinate, rilevamenti e distanze** (§1.4): 2 decimali da una fonte unica, il riquadro di Wikipedia in inglese. I valori sono letti tramite WebSearch e superano un controllo incrociato. Resta `[DA VERIFICARE]`, non bloccante, la lettura diretta delle sette pagine. Il rilevamento di Cassano delle Murge è incerto di circa ±10°.
- **Dimensioni tipografiche** (§3.2 e §5): verificate su Chromium con i font reali, da riverificare su Safari iOS nei prototipi del `ui-designer`.
- **Anteprima immersiva «Prova qui»** (iframe dell'esperienza SIII caricato solo al clic), in aggiunta all'apertura in nuova scheda chiesta dalle linee guida. Dipende da due verifiche:
  - se i portali permettono l'incorporamento (`X-Frame-Options`, `frame-ancestors`) `[DA VERIFICARE]`;
  - dalla gestione del consenso sui cookie dei portali, di competenza di `seo-technical` e dei riferimenti legali.

  Finché non è validata, vale solo la nuova scheda. Al G4 resta un lavoro per dopo il lancio: è la leva più forte per far provare l'immersione sul sito, ma può far cadere la premessa «nessun banner cookie» se i portali impostano cookie di terze parti.
- **Carte.** Natural Earth 1:10m è in pubblico dominio. Se servisse il confine regionale ufficiale, i limiti amministrativi ISTAT richiedono l'attribuzione.
- **Città di Città Digitali** (§1.4, «Il punto-città»).
  - I 45 nomi vengono dal riassunto dell'indice di ricerca della pagina «Tutte le città» `[DA VERIFICARE]`. Il testo o uno screenshot della pagina chiude il dubbio, ed è la condizione per pubblicare i nomi oltre ai tre delle linee guida.
  - «Polignano» è letto come Polignano a Mare (BA) `[IPOTESI]`, e sulle carte resta senza nome. «San Cataldo» è il comune in provincia di Caltanissetta (confermato dall'utente il 2026-10-06); il suo punto resta sotto il nodo di Caltanissetta.
  - Le misure delle etichette sono in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`.
  - Con il testo ingrandito dalle sole impostazioni del browser, le etichette crescono più della carta e i margini potrebbero non bastare. Lo zoom della pagina, quello di WCAG 1.4.4, non cambia nulla.
- **Carta della Puglia intera** (§1.4).
  - Oltre ai cinque nomi solidi (Acquaviva, Gravina, Monopoli, Altamura, Cassano), la grafia dei nomi è `[DA VERIFICARE]`. L'elenco come insieme è confermato dall'utente.
  - L'estremo nord della costa è il vertice di Natural Earth più vicino alla foce del Saccione `[DA VERIFICARE]`, ininfluente a questa scala.
  - Misure in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`, compresa la larghezza della carta della hero, che dipende da `svh`.
- **Schermate SIII** (§4.8).
  - Il ritaglio 4:5 della hero ancorato in basso è provato con `object-position` in Chromium. Il ritaglio in build (`mobileCrop`, posizione «bottom» di sharp) deve dare la stessa inquadratura `[DA VERIFICARE]` sulla build.
  - La nitidezza del primo esempio, fermo a 1440 px, sugli schermi ad alta densità larghi `[DA VERIFICARE]` (ui-designer).
  - L'esplorazione al tocco con VoiceOver e TalkBack sopra gli esempi, dove la schermata è un link solo per il puntatore `[DA VERIFICARE]` (ux-designer).

## Domande aperte

Le domande sui materiali e sui fatti sono già registrate nel brief consolidato e qui non si duplicano:
- D3: la quarta «I» di SIII;
- D6: il fondatore;
- D7: i numeri;
- D9: le immagini e l'originale della foto evento;
- §7: i materiali mancanti.

Da aggiungere, per la parte visiva:
- **Immagini dei luoghi dal portale (§4.7).** Autore, data, diritti e uso di AI; i nomi della piazza di Acquaviva e della chiesa di Gravina; gli originali senza grafica e ad alta risoluzione.
- **Foto evento.** La scena, oltre alla sovrimpressione, è stata ritoccata con strumenti generativi? Il simbolo ✦ lo fa sospettare.
- **Colori.** Codici ufficiali (HEX o Pantone) di ITnode, Puglia Digitale e Città Digitali.
- **Video Città Digitali.** C'è parlato? Se sì, i sottotitoli sono obbligatori (WCAG 1.2.2). Serve il file per scegliere il fotogramma del poster.
- **Riferimento.** Screenshot di aprildunford.com (vedi `analisi-riferimento.md`).
- **Persone nella foto dell'evento.** Ai partecipanti è stata data un'informativa sulle riprese? Senza, i ritagli si stringono sui due schermi e sul palco, escludendo i profili riconoscibili ai margini (§4.2).
- **Nuova versione della foto dell'evento (§4.2).** È l'originale dello scatto o un'elaborazione? La posa dell'oratore è diversa: finché il cliente non conferma che la scena non è alterata, restano la nota AI e nessuna didascalia con luogo e data.
- **Foto dell'evento su `/puglia-digitale/`.** L'utente ha chiesto la nuova versione «in home». La aggiorniamo anche nella pagina, così sul sito c'è una sola versione della scena? Decide l'utente.
- **Elenco delle città di Città Digitali.** Le domande al cliente (città attive, data dell'elenco) sono in `docs/strategia/citta-digitali-elenco.md` e non si duplicano qui. Il legame con le «30+ città» di Puglia Digitale l'ha confermato l'utente il 2026-10-06: sono le 31 città pugliesi dell'elenco. Per la parte visiva, quindi, anche la carta del capitolo 02 della Home può passare al punto-città (P4). Il creative-director la consiglia, ma l'utente non l'aveva chiesta: decide lui (Decisioni richieste, punto 6).

## Decisioni richieste

1. **Logo per il web.** Proposta: wordmark senza trama poligonale. Pro: leggibile a 24–28 px e coerente con il divieto di pattern tecnologici. Contro: la trama sparisce dall'uso quotidiano. È una decisione del cliente perché tocca l'identità.
2. **Ritratti del fondatore: DR3 del brief consolidato.** Parere del creative-director:
   - **(a) subito**: la foto reale «Palco» chiude la sezione del fondatore;
   - **(c) il prima possibile**: shooting reale.

   Le opzioni:
   - (a) Pro: vera, disponibile, forte. Contro: il fondatore è piccolo nell'inquadratura; è un documento, non un ritratto.
   - (b) Ritratti attuali con trattamento a inchiostro e nota di trasparenza. Pro: disponibili, volto in primo piano. Contro: obblighi di trasparenza (AI Act, art. 50), fondali generati attenuati ma non eliminati, risoluzione limitata, contraddizione con la promessa di autenticità del sito.
   - (c) Pro: autenticità piena. Contro: costo e tempi.

   Le specifiche per (a) e (b) sono pronte (§4.3). Nota: l'incarico chiedeva di usare le foto del fondatore; DR3 e l'AI Act sono i motivi nuovi per cui il creative-director raccomandava (a).

   **Aggiornamento del G4:** il sito applica (b). Anche la foto dell'evento porta ora la nota AI (B4), quindi (a) ha perso il suo vantaggio finché non arriva l'originale. Parere: (b) con le maschere del §4.3 per il lancio, (c) appena possibile. Decide l'utente, con l'ADR 002.
3. **Produzione fotografica dei luoghi** (6 località) **e del ritratto del fondatore**: budget e tempi. Senza, il sito va online con le varianti tipografiche (§4.5), progettate per reggere da sole.
4. **Concept della hero** («L'orizzonte dei luoghi»): pubblica i luoghi con direzione e distanza dalla sede di Acquaviva. Doveva essere approvato al gate G2 insieme a questa direzione visiva; G2 non è mai stato approvato formalmente, quindi l'approvazione va data ora, insieme al G4.
5. **Approvazione di questa direzione visiva (versione 0.14)** da parte dell'utente, retroattiva per il G2: è la condizione perché passi allo stato «approvato».
6. **Capitolo 02 della Home con la Puglia intera (P4 di ui-designer): decisa.** L'utente l'ha approvata il 2026-10-07 («sì, mettila»), e la Home la mostra dal commit 3e25c42, con la legenda e la descrizione L7. La carta della Terra di Bari non è più usata, e si toglie dal generatore e dal componente (decisione del creative-director del 2026-10-07, sulla proposta di ui-designer).
