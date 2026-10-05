---
titolo: Mappa del capitolo 03 della Home · tutte le città di Città Digitali, nomi solo dove c'è spazio
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-10-05
fonti: [richiesta dell'utente del 2026-10-05 (via sessione principale), docs/strategia/citta-digitali-elenco.md v0.2 (§2, §3, §4, appendice; commit 9042e52 e 9b7c5c4), docs/creativa/direzione-visiva.md (0.5: §1.3, §1.4, §2, §7.3, §7.6), docs/ui/design-system.md (0.5: §1.5, §2.1, §2.3, §2.4, §5.4), docs/performance/budget.md (§3), docs/ux/accessibilita.md, src/components/ui/MapItaly.astro, src/pages/index.astro, scripts/generate-maps.mjs, src/data/maps.json, staging http://localhost:4321 (dist, commit 1211ed0), build di prova con le modifiche proposte (copia in scratchpad, non versionata), misure Playwright (Chromium) del 2026-10-05]
---

# Mappa del capitolo 03 · tutte le città di Città Digitali, nomi solo dove c'è spazio

**Richiesta.** L'utente vuole tutte le città del progetto, con un puntino per ognuna e il nome solo per alcune, senza sovrapposizioni. Ha confermato come fonte la pagina «Tutte le città» del portale, e ha chiesto altri nomi oltre a Varese, Altamura e Caltanissetta.

**Elenco.** È quello di brand-strategist (`citta-digitali-elenco.md` v0.2):
- 45 città: Puglia 31, Sicilia 6, Campania 4, Lazio 2, Calabria 1, Lombardia 1;
- coordinate a 2 decimali dalla fonte unica di C11, tranne Martina Franca (Wikidata P625: eccezione da decidere).

## In sintesi

- **45 puntini, uno per città.** Ø 5 px, colore `--place`, con un anello di 1,5 px nel colore della superficie che li tiene distinti dove si affollano. Senza il nome sono la metà del nodo con nome (Ø 10): stessa famiglia, gerarchia leggibile. Se l'eccezione su Martina Franca non passa, il suo puntino si toglie e i puntini sono 44.
- **I nomi dipendono dalla larghezza della carta.** Due classi, con la stessa soglia di 25rem già usata per le coordinate:
  - carte strette (finestre fino a circa 440 px, e da 1024 a circa 1070 px, dove la carta è larga 382–400 px): 5 nomi, cioè Varese, Altamura, Caltanissetta, Itri e Cosenza;
  - carte larghe (oltre 400 px: finestre da circa 445 a 1023 px e da circa 1070 px in su, 1440 compreso): 9 nomi, cioè i 5 precedenti più Manfredonia, Bari, Massafra e Caltagirone.
- **Come si scelgono i nomi.**
  - **Ordine editoriale.** Prima le tre città del testo del capitolo; poi un nome per regione o gruppo, così la carta racconta l'estensione del progetto; dentro ogni gruppo la fonte più solida.
  - **Calcolo.** Lo spazio lo calcola il generatore delle carte: un nome compare solo se non copre nessun puntino, nodo, altro nome o richiamo, a ogni larghezza della sua classe.
  - **Tre regole fisse.** Un nome non deve nascondere il puntino di un'altra città. «Polignano» e «San Cataldo» restano senza nome. Nessun numero.
- **Posizione dei nomi.** Accanto al nodo, su un angolo o appesi sotto con un richiamo verticale, come le etichette dell'Orizzonte. Altamura, nel cuore della Murgia, è appesa: è l'unico modo per non coprire i puntini intorno.
- **Prove.** Ho costruito il sito in una copia nello scratchpad, con le modifiche proposte e i dati reali.
  - Nessuna sovrapposizione a 18 larghezze da 320 a 1920 px, anche con la spaziatura del testo di WCAG 1.4.12.
  - Nessuno scorrimento orizzontale; HTML della Home +1,1 KB gzip, dentro il budget.
  - Le modifiche si applicano pulite al repository: verificato con `git apply --check`, senza toccare `src/`.
- **Limite noto.** Due città troppo vicine al nome di un'altra restano sotto il suo nodo: San Cataldo sotto Caltanissetta (7 km) a ogni larghezza, Gravina sotto Altamura (11 km) fino a 350 px. Alla scala dell'Italia sono lo stesso punto. Restano nell'elenco testuale.
- **Decide il creative-director:** l'aggiunta del segno «punto-città» al dispositivo delle Coordinate, la scelta dei nomi e l'eccezione di Martina Franca.

## 1. Il disegno

### P1 · Puntini

- **Dove.** `src/components/ui/MapItaly.astro`, carta `italia` del capitolo 03 della Home, superficie `pietra`.
- **Problema.** Oggi la carta mostra 3 nodi. Le città del progetto sono 45, molte nella provincia di Bari: alla scala dell'Italia, tra 280 e 480 px di carta, distano pochi pixel.
- **Motivazione.**
  - DV §1.4: dati geografici veri come unico ornamento. I puntini sono le città reali, uno per città: non una trama né una «mappa a puntini» decorativa, che la DV vieta.
  - DV §7.6 (N12): nessuna campitura che suggerisca una copertura dell'Italia intera. I puntini mostrano la distribuzione vera, densa in Puglia e rada altrove.
- **Proposta.**
  - **Punto-città:** cerchio pieno Ø 5 px in `--place` (`terra` su chiaro, 4,09:1 su `pietra`: sopra la soglia di 3:1 per la grafica; `arancio-segnale` su notte).
  - **Anello:** 1,5 px nel colore della superficie (`box-shadow: 0 0 0 1.5px var(--bg)`).
    - Separa ogni puntino dalla costa e dai vicini.
    - Dove si sovrappongono, i puntini restano distinti come monete impilate: ognuno taglia il precedente con il suo anello.
    - È un tratto, non un'ombra: è la tecnica già accettata per l'anello dei nodi sulle foto (DS §1.5).
  - **Nodo con nome:** resta il Ø 10 della DV §1.3, con lo stesso anello quando la carta ha i puntini.
  - **Non sono nodi interattivi** (DS §2.3): niente anello esterno, niente ping, niente hover. La regola «al massimo 5 nodi per immagine» non li riguarda.
  - **Ordine di pittura:** i puntini da nord a sud, poi i nodi con nome sopra.
- **Misure provate.** Ho confrontato Ø 4, 5 e 6 px, con anello da 1 e da 1,5 px, sul gruppo più fitto, a 390 e 1440 px.
  - Ø 4 si perde sulle città isolate; Ø 6 fa del gruppo pugliese una macchia.
  - Ø 5 con anello da 1,5 tiene insieme le due cose.

### P2 · Nomi: quali e dove

- **Dove.** `scripts/generate-maps.mjs` (scelta e posizione, calcolate al build); `MapItaly.astro` (classi di posizione); `src/data/citta-digitali.json` (ordine dei candidati).
- **Problema.** Con 45 città i nomi non stanno tutti, e quelli che stanno cambiano con la larghezza della carta: 280 px a 320, 350 a 390, 382 a 1024, 480 da 600 a 1023 e da 1280 in su.
- **Motivazione.** WCAG 2.2 AA: nessun testo sovrapposto. Indicazione dell'utente: più nomi oltre ai tre del testo, scelti per leggibilità; su mobile possono essere meno.
- **Regola dei candidati** (ordine editoriale, in `nomi` del file dati):
  1. **Obbligatori:** le tre città del testo del capitolo (linee guida §18): Varese, Altamura, Caltanissetta.
  2. **Un nome per regione o gruppo**, nell'ordine che racconta l'estensione del progetto: Lazio, Campania, Calabria, poi i gruppi pugliesi (costa e Valle d'Itria, Gargano, Bari e costa nord, Taranto, Salento, Brindisi), poi la Sicilia del sud-est.
     - Dentro ogni gruppo vince la fonte più solida: materiali di progetto, poi pagine trovate sul portale (Massafra, Itri, Bitonto, Santeramo in Colle, Manfredonia, Martina Franca), poi le città grandi e senza ambiguità.
  3. **Altri nomi per fonte**, se resta spazio.
  - **Mai un nome** per «Polignano» e «San Cataldo», finché il cliente non chiarisce quale comune sono: il puntino resta.
- **Regola dello spazio** (calcolata al build; nessun JavaScript nella pagina):
  - **Posizioni del nome:** accanto al nodo (destra o sinistra, come oggi: i nomi a est pendono a sinistra); su uno dei quattro angoli; o appeso sotto il nodo con un richiamo verticale di 1 px in `--place`, a 24 o 40 px.
    - Il richiamo è il gesto delle etichette dell'Orizzonte (DS §2.1): il nome pende dal suo luogo.
  - **Quando un nome compare:** se non copre nessun puntino, nodo, altro nome o richiamo e resta dentro la carta, a ogni larghezza della sua classe, controllata ogni 5 px.
    - Le misure sono quelle peggiori dell'etichetta mono: 13 px, maiuscolo, con la spaziatura di WCAG 1.4.12.
    - Il generatore prova tutte le combinazioni di posizioni dei nomi della classe (ricerca con ritorno indietro), non solo la prima libera per ciascuno.
  - **Un nome non deve nascondere un altro puntino.** Il nome trasforma il puntino in nodo (Ø 10 più l'anello): se a una larghezza il nodo coprirebbe per intero il puntino di un'altra città, il nome si scarta. La regola non vale per i tre obbligatori (§4).
  - **Classi annidate:** le carte larghe partono dai nomi delle strette, così un nome può solo comparire quando la carta cresce. Una città con nome solo sulle carte larghe è un puntino Ø 5 sulle strette.
  - **Se un nome obbligatorio non ha spazio:**
    - sulle carte strette si nasconde, con un avviso nel build (il testo accanto lo nomina);
    - sulle carte larghe il build si ferma: decide una persona.
- **Risultato con l'elenco reale** (45 città, Martina Franca compresa):

  | Classe | Larghezze della carta | Dove | Nomi | Posizione |
  |---|---|---|---|---|
  | Stretta | 280–400 px (fino a 25rem) | finestre fino a circa 440 px; desktop da 1024 a circa 1070 px (carta da 382 px) | **Varese**, **Altamura**, **Caltanissetta**, **Itri**, **Cosenza** | e, appeso a sinistra (24 px), w, nw, w |
  | Larga | da 400 px fino a 480 | finestre da circa 445 a 1023 px; desktop da circa 1070 px | le 5 precedenti più **Manfredonia**, **Bari**, **Massafra**, **Caltagirone** | Varese e, Altamura appeso (24 px), Caltanissetta w, Itri sw, Cosenza se, Manfredonia w, Bari ne, Massafra appeso (40 px), Caltagirone e |

  | Nome | Gruppo | Perché |
  |---|---|---|
  | Varese, Altamura, Caltanissetta | Lombardia, Murgia, Sicilia | Obbligatori: nel testo del capitolo e nelle linee guida |
  | Itri | Lazio | Pagina trovata sul portale (prima di Terracina) |
  | Cosenza | Calabria | Unica città della regione; grande e senza ambiguità |
  | Manfredonia | Gargano | Pagina trovata sul portale; solo sulle carte larghe |
  | Bari | Bari e costa nord | Città grande; Bitonto, con la pagina sul portale, non ha spazio |
  | Massafra | Taranto | Pagina trovata sul portale; appesa, a 40 px |
  | Caltagirone | Sicilia, sud-est | Città grande; solo sulle carte larghe |

  **Senza nome, e perché.**
  - **Campania:** Pompei, Ercolano, Torre del Greco e Torre Annunziata distano tra 2,7 e 7,6 km. Il nodo con nome nasconderebbe il puntino vicino, e il nome non ha una posizione libera.
  - **Costa e Valle d'Itria, Salento, Brindisi:** nessuna posizione libera a nessuna larghezza: è la zona più fitta.
  - **Murgia oltre Altamura:** nessuno spazio libero, oppure il nodo nasconderebbe un vicino.
  - **Comiso:** stava sulle carte strette nella prima prova, ma il suo nodo nascondeva Chiaramonte Gulfi; ora tiene il nome Caltagirone, sulle carte larghe.
  - **Robustezza:** con le coordinate di Martina Franca il risultato non cambia.

### P3 · Gruppi fitti

- **Dove.** Murgia, costa e Valle d'Itria, costa a nord di Bari, area vesuviana, Salento, Sicilia (`citta-digitali-elenco.md` §3).
- **Problema.** Alla scala dell'Italia una città a meno di 10 km da un'altra cade a 2–4 px di distanza. La coppia più vicina, Ercolano e Torre del Greco (2,7 km), è a 0,8–1,3 px.
- **Motivazione.** Un puntino per città, nessuna coordinata spostata (DV §1.4: mai coordinate «arrotondate per effetto»).
- **Proposta.**
  - **Posizioni vere, senza spostamenti né aggregati.** Niente bolle con numeri: un conteggio è un claim (P4).
  - **Monete impilate:** l'anello di ogni puntino taglia il precedente, così un gruppo si legge come «tanti luoghi qui», non come una macchia.
  - **Nessun nome dentro un gruppo**, a meno che non trovi una posizione libera fuori dal gruppo: il caso di Altamura appesa.
  - **Scartata: una lente sulla Terra di Bari** dentro la carta. Aggiungerebbe un riquadro e un'altra scala in uno spazio di 382–480 px. La carta della Puglia del capitolo 02 è già il gesto «dalla regione all'Italia» (DV §7.3), anche se racconta Puglia Digitale.
- **Limite noto** (vedi §4): San Cataldo sotto Caltanissetta; Gravina sotto Altamura fino a 350 px.

### P4 · Numeri e legenda

- **Dove.** Sotto la carta, nel capitolo 03.
- **Problema.**
  - I puntini senza nome hanno bisogno di una spiegazione.
  - Un numero («45 città») è un claim: per brand-strategist (§4) si pubblica solo con il testo della pagina confermato, una data e lo stesso numero di puntini.
- **Proposta.**
  - **Nessun numero sulla carta né nella legenda**, finché non ci sono le tre condizioni di brand-strategist.
  - **Una riga di legenda in mono** (`label`, `--fg-2`) sotto la carta, in una `<figcaption>`: è testo reale, fuori dalla carta `aria-hidden`. Il testo lo scrive copywriter-brand. Due possibilità:
    - «Le città di Città Digitali»: sempre vera;
    - «Un punto per ogni città di Città Digitali»: vera solo se ogni città dell'elenco ha il suo puntino. Quindi solo se passa l'eccezione su Martina Franca; altrimenti i puntini sarebbero 44 su 45.
  - **Quando le condizioni ci sono,** il numero può entrare nella stessa riga con la data: «[N] città · elenco al [mese anno]».
- **Accessibilità.** La carta resta `aria-hidden`. L'elenco completo in testo lo verifica ux-designer: la legenda può portarci con un link, se l'elenco sta su `/citta-digitali/`.

### P5 · Componente, dati e generatore

- **Dove.** `src/data/citta-digitali.json` (nuovo), `scripts/generate-maps.mjs`, `src/components/ui/MapItaly.astro`, `src/pages/index.astro`.
- **Problema.**
  - Un luogo che non è in `maps.json` ricade sulla proiezione di ripiego, che non è allineata alla costa.
  - Le coordinate stanno in due posti, `site.ts` e il generatore.
- **Proposta.**
  - **Un file dati solo**, `src/data/citta-digitali.json`. Lo legge il generatore; è pronto per l'elenco testuale.
    - Contiene le 45 città dell'appendice di brand-strategist e l'ordine editoriale dei nomi (`nomi`).
    - Il generatore controlla: id doppi, più di 2 decimali (regola di C11), nomi riferiti a città che non esistono, città fuori dalla carta.
  - **Il generatore** proietta tutte le città con la stessa proiezione delle carte, sceglie i nomi e le loro posizioni per classe di larghezza, e scrive in `maps.json`:
    - `places`: le città con nome, con `anchor: { wide, narrow }`, dove `narrow` vale `'none'` se il nome non c'è sulle carte strette;
    - `dots`: le altre.
    - `PLACES` resta solo per la carta della Puglia.
  - **API di `MapItaly`:** nuova prop `cities` (booleana); `places` diventa facoltativa.
    - Con `cities` la carta disegna i nomi e i puntini di `maps.json` e toglie le coordinate (l'utente: «anche senza coordinate»).
    - Senza `cities` tutto resta com'è: la carta di Città Digitali, con le etichette spente, ha lo stesso markup di oggi (verificato).
  - **Home:** `<MapItaly map="italia" cities class="worlds__map" />` dentro una `<figure>`, con la legenda di P4.
- **Performance.** HTML e CSS statici, nessun JavaScript.
  - 36 puntini e 9 luoghi con nome aggiungono 9,4 KB all'HTML della Home, 1,1 KB con gzip: 27,4 KB su 40 (budget §3).
  - Il calcolo dei nomi gira solo in `npm run maps`: l'intero generatore impiega circa mezzo secondo.

#### 1 · `src/data/citta-digitali.json` (nuovo)

Le città vengono dall'appendice di `citta-digitali-elenco.md` v0.2, nello stesso ordine alfabetico. `nomi` è la proposta di ordine dei candidati, e la decide il creative-director.

```json
{
  "fonte": "Pagina «Tutte le città» di cittàdigitali.it, indicata e confermata dall'utente (2026-10-05). Coordinate: docs/strategia/citta-digitali-elenco.md v0.2 (Wikipedia in inglese, 2 decimali; Martina Franca da Wikidata P625, eccezione da decidere).",
  "citta": [
    { "id": "acquaviva", "name": "Acquaviva delle Fonti", "province": "BA", "region": "Puglia", "lat": 40.9, "lon": 16.85 },
    { "id": "alberobello", "name": "Alberobello", "province": "BA", "region": "Puglia", "lat": 40.78, "lon": 17.23 },
    { "id": "altamura", "name": "Altamura", "province": "BA", "region": "Puglia", "lat": 40.82, "lon": 16.55 },
    { "id": "andria", "name": "Andria", "province": "BT", "region": "Puglia", "lat": 41.22, "lon": 16.3 },
    { "id": "bari", "name": "Bari", "province": "BA", "region": "Puglia", "lat": 41.13, "lon": 16.87 },
    { "id": "barletta", "name": "Barletta", "province": "BT", "region": "Puglia", "lat": 41.32, "lon": 16.28 },
    { "id": "bisceglie", "name": "Bisceglie", "province": "BT", "region": "Puglia", "lat": 41.24, "lon": 16.51 },
    { "id": "bitonto", "name": "Bitonto", "province": "BA", "region": "Puglia", "lat": 41.12, "lon": 16.68 },
    { "id": "brindisi", "name": "Brindisi", "province": "BR", "region": "Puglia", "lat": 40.63, "lon": 17.93 },
    { "id": "caltagirone", "name": "Caltagirone", "province": "CT", "region": "Sicilia", "lat": 37.24, "lon": 14.51 },
    { "id": "caltanissetta", "name": "Caltanissetta", "province": "CL", "region": "Sicilia", "lat": 37.49, "lon": 14.06 },
    { "id": "cassano", "name": "Cassano delle Murge", "province": "BA", "region": "Puglia", "lat": 40.88, "lon": 16.77 },
    { "id": "chiaramonte-gulfi", "name": "Chiaramonte Gulfi", "province": "RG", "region": "Sicilia", "lat": 37.03, "lon": 14.7 },
    { "id": "cisternino", "name": "Cisternino", "province": "BR", "region": "Puglia", "lat": 40.73, "lon": 17.43 },
    { "id": "comiso", "name": "Comiso", "province": "RG", "region": "Sicilia", "lat": 36.95, "lon": 14.6 },
    { "id": "copertino", "name": "Copertino", "province": "LE", "region": "Puglia", "lat": 40.27, "lon": 18.05 },
    { "id": "cosenza", "name": "Cosenza", "province": "CS", "region": "Calabria", "lat": 39.3, "lon": 16.25 },
    { "id": "ercolano", "name": "Ercolano", "province": "NA", "region": "Campania", "lat": 40.8, "lon": 14.35 },
    { "id": "fasano", "name": "Fasano", "province": "BR", "region": "Puglia", "lat": 40.83, "lon": 17.37 },
    { "id": "francavilla-fontana", "name": "Francavilla Fontana", "province": "BR", "region": "Puglia", "lat": 40.53, "lon": 17.58 },
    { "id": "gallipoli", "name": "Gallipoli", "province": "LE", "region": "Puglia", "lat": 40.06, "lon": 17.99 },
    { "id": "gioia-del-colle", "name": "Gioia del Colle", "province": "BA", "region": "Puglia", "lat": 40.8, "lon": 16.93 },
    { "id": "grammichele", "name": "Grammichele", "province": "CT", "region": "Sicilia", "lat": 37.21, "lon": 14.64 },
    { "id": "gravina", "name": "Gravina in Puglia", "province": "BA", "region": "Puglia", "lat": 40.82, "lon": 16.42 },
    { "id": "grottaglie", "name": "Grottaglie", "province": "TA", "region": "Puglia", "lat": 40.53, "lon": 17.43 },
    { "id": "itri", "name": "Itri", "province": "LT", "region": "Lazio", "lat": 41.28, "lon": 13.53 },
    { "id": "lecce", "name": "Lecce", "province": "LE", "region": "Puglia", "lat": 40.35, "lon": 18.17 },
    { "id": "locorotondo", "name": "Locorotondo", "province": "BA", "region": "Puglia", "lat": 40.76, "lon": 17.33 },
    { "id": "manfredonia", "name": "Manfredonia", "province": "FG", "region": "Puglia", "lat": 41.63, "lon": 15.92 },
    { "id": "martina-franca", "name": "Martina Franca", "province": "TA", "region": "Puglia", "lat": 40.7, "lon": 17.33 },
    { "id": "massafra", "name": "Massafra", "province": "TA", "region": "Puglia", "lat": 40.58, "lon": 17.12 },
    { "id": "monopoli", "name": "Monopoli", "province": "BA", "region": "Puglia", "lat": 40.95, "lon": 17.3 },
    { "id": "nardo", "name": "Nardò", "province": "LE", "region": "Puglia", "lat": 40.18, "lon": 18.03 },
    { "id": "ostuni", "name": "Ostuni", "province": "BR", "region": "Puglia", "lat": 40.73, "lon": 17.58 },
    { "id": "polignano", "name": "Polignano a Mare", "province": "BA", "region": "Puglia", "lat": 41.0, "lon": 17.22 },
    { "id": "pompei", "name": "Pompei", "province": "NA", "region": "Campania", "lat": 40.75, "lon": 14.5 },
    { "id": "putignano", "name": "Putignano", "province": "BA", "region": "Puglia", "lat": 40.85, "lon": 17.12 },
    { "id": "san-cataldo", "name": "San Cataldo", "province": "CL", "region": "Sicilia", "lat": 37.48, "lon": 13.98 },
    { "id": "san-giovanni-rotondo", "name": "San Giovanni Rotondo", "province": "FG", "region": "Puglia", "lat": 41.7, "lon": 15.73 },
    { "id": "santeramo", "name": "Santeramo in Colle", "province": "BA", "region": "Puglia", "lat": 40.8, "lon": 16.77 },
    { "id": "terracina", "name": "Terracina", "province": "LT", "region": "Lazio", "lat": 41.28, "lon": 13.25 },
    { "id": "torre-annunziata", "name": "Torre Annunziata", "province": "NA", "region": "Campania", "lat": 40.75, "lon": 14.45 },
    { "id": "torre-del-greco", "name": "Torre del Greco", "province": "NA", "region": "Campania", "lat": 40.78, "lon": 14.37 },
    { "id": "trani", "name": "Trani", "province": "BT", "region": "Puglia", "lat": 41.27, "lon": 16.42 },
    { "id": "varese", "name": "Varese", "province": "VA", "region": "Lombardia", "lat": 45.82, "lon": 8.83 }
  ],
  "nomi": {
    "obbligatori": ["varese", "altamura", "caltanissetta"],
    "gruppi": [
      ["varese"],
      ["altamura", "gravina", "acquaviva", "cassano", "santeramo", "gioia-del-colle"],
      ["caltanissetta"],
      ["itri", "terracina"],
      ["pompei", "ercolano", "torre-del-greco", "torre-annunziata"],
      ["cosenza"],
      ["monopoli", "martina-franca", "fasano", "putignano", "alberobello", "locorotondo", "cisternino", "ostuni"],
      ["manfredonia", "san-giovanni-rotondo"],
      ["bitonto", "bari", "barletta", "andria", "trani", "bisceglie"],
      ["massafra", "grottaglie", "francavilla-fontana"],
      ["lecce", "copertino", "nardo", "gallipoli"],
      ["brindisi"],
      ["caltagirone", "grammichele", "comiso", "chiaramonte-gulfi"]
    ],
    "poi": ["acquaviva", "gravina", "monopoli", "cassano", "massafra", "itri", "bitonto", "santeramo", "manfredonia", "martina-franca", "bari", "lecce", "brindisi", "cosenza", "pompei"],
    "senzaNome": ["polignano", "san-cataldo"]
  }
}
```

#### 2 · `scripts/generate-maps.mjs`

Provato: con i dati qui sopra dà i nomi e le posizioni della tabella di P2, in circa mezzo secondo per tutto il generatore.

```diff
--- a/scripts/generate-maps.mjs
+++ b/scripts/generate-maps.mjs
@@ -40,14 +40,29 @@
 // Coordinates of the places: same values and source as src/data/site.ts (visual direction §1.4,
 // docs/strategia/coordinate-luoghi.md). Keep the two lists aligned, then run `npm run maps`.
 const PLACES = {
-  varese: { name: 'Varese', lat: 45.82, lon: 8.83 },
-  altamura: { name: 'Altamura', lat: 40.82, lon: 16.55 },
-  caltanissetta: { name: 'Caltanissetta', lat: 37.49, lon: 14.06 },
   acquaviva: { name: 'Acquaviva delle Fonti', lat: 40.9, lon: 16.85 },
   gravina: { name: 'Gravina in Puglia', lat: 40.82, lon: 16.42 },
   monopoli: { name: 'Monopoli', lat: 40.95, lon: 17.3 },
 };
 
+// Città Digitali on the «italia» map (Home chapter 03): one dot per city, names where they fit.
+// Single source: src/data/citta-digitali.json (cities from the page «Tutte le città» of
+// cittàdigitali.it; coordinates from docs/strategia/citta-digitali-elenco.md). The order of the
+// candidate names is an editorial choice (`nomi`), the room for them is computed below.
+const CITIES = JSON.parse(await readFile('src/data/citta-digitali.json', 'utf8'));
+{
+  const ids = new Set();
+  for (const c of CITIES.citta) {
+    if (ids.has(c.id)) throw new Error(`citta-digitali.json: duplicate id ${c.id}`);
+    ids.add(c.id);
+    // Same precision rule as every other place (visual direction §1.4): at most 2 decimals.
+    for (const v of [c.lat, c.lon]) if (!/^-?\d+(\.\d{1,2})?$/.test(String(v))) throw new Error(`citta-digitali.json: ${c.id} has ${v}, use at most 2 decimals`);
+  }
+  const named = [...CITIES.nomi.obbligatori, ...CITIES.nomi.gruppi.flat(), ...CITIES.nomi.poi];
+  const unknown = named.filter((id) => !ids.has(id));
+  if (unknown.length) throw new Error(`citta-digitali.json: names for unknown cities ${unknown.join(', ')}`);
+}
+
 const geometries = topology.objects.countries.geometries;
 const byId = (id) => geometries.find((g) => g.id === id);
 const ITALY = '380', SAN_MARINO = '674', VATICAN = '336';
@@ -207,6 +222,114 @@
   return d;
 }
 
+// ─── Names on the map of Città Digitali ───
+// Two classes of map width, the same 25rem threshold as the coordinates in MapItaly.astro:
+// narrow maps (phones, and the 1024 px desktop at 382 px) and wide maps (up to 30rem).
+// Each name takes one position around its node: beside it, on a corner, or hanging below it on a
+// vertical leader, the gesture of the Horizon labels (design system §2.1). A name is shown only if
+// it covers no dot, no node, no other name and no other leader at every width of its class.
+// Metrics: mono label at 13 px, uppercase, with the user text spacing of WCAG 1.4.12 (0.12em
+// tracking, line-height 1.5). Offsets match the anchor rules in MapItaly.astro.
+const LABEL = { advance: 9.6, pad: 2, line: 19.5, node: 6.5, dot: 4, clear: 1, indent: 8 }; // node and dot radii include the 1.5 px knockout ring
+const NAME_CLASSES = { narrow: [280, 400], wide: [400, 480] }; // px; .worlds__map is 280 px at 320 and 30rem at most
+const STEP = 5;
+const DROPS = { 'drop-r': 24, 'drop-l': 24, 'drop2-r': 40, 'drop2-l': 40 }; // px from the node centre to the first line
+const ANCHORS = {
+  e: (w, h) => [14, -h / 2],
+  w: (w, h) => [-14 - w, -h / 2],
+  ne: (w, h) => [8, -8 - h],
+  se: () => [8, 8],
+  nw: (w, h) => [-8 - w, -8 - h],
+  sw: (w) => [-8 - w, 8],
+  'drop-r': (w, h) => [0, DROPS['drop-r'] - h / 2],
+  'drop-l': (w, h) => [-w, DROPS['drop-l'] - h / 2],
+  'drop2-r': (w, h) => [0, DROPS['drop2-r'] - h / 2],
+  'drop2-l': (w, h) => [-w, DROPS['drop2-l'] - h / 2],
+};
+const anchorOrder = (p, view) => p.x / view.width > 0.55 // as on every map: eastern names hang left
+  ? ['w', 'e', 'ne', 'se', 'nw', 'sw', 'drop-l', 'drop-r', 'drop2-l', 'drop2-r']
+  : ['e', 'w', 'ne', 'se', 'nw', 'sw', 'drop-r', 'drop-l', 'drop2-r', 'drop2-l'];
+
+const circleHitsBox = (cx, cy, r, [x0, y0, x1, y1]) => {
+  const nx = Math.max(x0, Math.min(cx, x1)), ny = Math.max(y0, Math.min(cy, y1));
+  return (cx - nx) ** 2 + (cy - ny) ** 2 < r * r;
+};
+const boxesHit = (a, b, m) => a[0] < b[2] + m && a[2] > b[0] - m && a[1] < b[3] + m && a[3] > b[1] - m;
+const widthRange = ([from, to]) => { const r = []; for (let w = from; w <= to; w += STEP) r.push(w); return r; };
+
+/** Box (and leader, for drops) of the name of `p` with `anchor`, at map width `W`. */
+function nameGeometry(p, anchor, W, view) {
+  const k = W / view.width, cx = p.x * k, cy = p.y * k;
+  const w = p.name.length * LABEL.advance + 2 * LABEL.pad + (DROPS[anchor] ? LABEL.indent : 0), h = LABEL.line;
+  const [ox, oy] = ANCHORS[anchor](w, h);
+  return { k, box: [cx + ox, cy + oy, cx + ox + w, cy + oy + h], leader: DROPS[anchor] ? [cx - 0.5, cy + LABEL.node, cx + 0.5, cy + DROPS[anchor]] : null };
+}
+
+/** Anchors for every city of `named` together (backtracking), or null if they do not all fit at `widths`. */
+function placeNames(named, cities, view, widths, budget = 300000) {
+  const others = cities.filter((c) => !named.includes(c));
+  const free = (p, a) => widths.every((W) => {
+    const { k, box, leader } = nameGeometry(p, a, W, view);
+    if (box[0] < 0 || box[1] < 0 || box[2] > W || box[3] > view.height * k) return false;
+    const touches = (x, y, r) => circleHitsBox(x * k, y * k, r + LABEL.clear, box) || (leader && circleHitsBox(x * k, y * k, r + LABEL.clear, leader));
+    return !others.some((d) => touches(d.x, d.y, LABEL.dot)) && !named.some((q) => q !== p && touches(q.x, q.y, LABEL.node));
+  });
+  const options = named.map((p) => anchorOrder(p, view).filter((a) => free(p, a)).map((a) => ({ a, geo: widths.map((W) => nameGeometry(p, a, W, view)) })));
+  if (options.some((o) => o.length === 0)) return null;
+  const clash = (g1, g2) => g1.some((A, i) => { const B = g2[i]; return boxesHit(A.box, B.box, LABEL.clear) || (A.leader && boxesHit(A.leader, B.box, LABEL.clear)) || (B.leader && boxesHit(A.box, B.leader, LABEL.clear)); });
+  const order = named.map((_, i) => i).sort((i, j) => options[i].length - options[j].length); // most constrained first
+  const chosen = [];
+  let steps = 0;
+  const search = (n) => {
+    if (n === order.length) return true;
+    const i = order[n];
+    for (const o of options[i]) {
+      if (++steps > budget) return false;
+      if (order.slice(0, n).every((j) => !clash(chosen[j].geo, o.geo))) { chosen[i] = o; if (search(n + 1)) return true; }
+    }
+    return false;
+  };
+  return search(0) ? Object.fromEntries(named.map((p, i) => [p.id, chosen[i].a])) : null;
+}
+
+/**
+ * Names per class, in the editorial order of `nomi`: the required names (those of the chapter
+ * text), then one name per group (the first that fits), then the others. The wide class starts
+ * from the narrow names, so names only appear as the map grows. Returns { id: { wide, narrow } },
+ * 'none' where the name is not shown. A required name may be missing on narrow maps (warning:
+ * the chapter text names it beside the map); the build stops if it does not fit on wide maps.
+ */
+function chooseNames(cities, nomi, view) {
+  const byId = Object.fromEntries(cities.map((c) => [c.id, c]));
+  const excluded = new Set(nomi.senzaNome ?? []);
+  // A name turns its dot into a node (Ø 10 and its ring): it must not hide another city's dot.
+  const hidesDot = (c, widths) => widths.some((W) => cities.some((d) => d !== c && Math.hypot(d.x - c.x, d.y - c.y) * (W / view.width) + LABEL.dot - 1.5 <= LABEL.node));
+  const grow = (start, widths, strict) => {
+    let named = [], anchors = {};
+    const add = (id) => {
+      const c = byId[id];
+      if (!c || excluded.has(id) || named.includes(c)) return false;
+      if (!nomi.obbligatori.includes(id) && hidesDot(c, widths)) return false;
+      const r = placeNames([...named, c], cities, view, widths);
+      if (r) { named = [...named, c]; anchors = r; }
+      return Boolean(r);
+    };
+    for (const id of [...start, ...nomi.obbligatori]) {
+      if (add(id) || named.some((n) => n.id === id) || !nomi.obbligatori.includes(id)) continue;
+      if (strict) throw new Error(`italia: no room for the required name ${byId[id].name}`);
+      console.warn(`italia: no room for ${byId[id].name} on narrow maps: name hidden there`);
+    }
+    for (const group of nomi.gruppi) if (!group.some((id) => named.some((n) => n.id === id))) group.some(add);
+    nomi.poi.forEach(add);
+    return { ids: named.map((n) => n.id), anchors };
+  };
+  const narrow = grow([], widthRange(NAME_CLASSES.narrow), false);
+  const wide = grow(narrow.ids, widthRange(NAME_CLASSES.wide), true);
+  const lost = narrow.ids.filter((id) => !wide.ids.includes(id));
+  if (lost.length) console.warn(`italia: ${lost.join(', ')} named on narrow maps but not on wide ones`);
+  return Object.fromEntries(wide.ids.map((id) => [id, { wide: wide.anchors[id], narrow: narrow.anchors[id] ?? 'none' }]));
+}
+
 // ─── Map builders ───
 
 /** Linear window: projected km → viewBox units (origin top-left, `width` units wide). */
@@ -245,6 +368,16 @@
   const T = windowTransform([bx0 - padKm, by0 - padKm, bx1 + padKm, by1 + padKm], width);
   const lines = projected.map((ring) => simplifyRing(ring.map(T.apply), tolerance)).filter((r) => r.length >= 3);
   const path = toPath(lines, { closed: true, decimals });
+  // Città Digitali: every city a dot; names where they fit, per class of width.
+  const cities = CITIES.citta.map((c) => {
+    const [x, y] = T.apply(projection([c.lon, c.lat]));
+    return { id: c.id, name: c.name, lat: c.lat, lon: c.lon, x: +x.toFixed(1), y: +y.toFixed(1), xPct: +((x / T.width) * 100).toFixed(2), yPct: +((y / T.height) * 100).toFixed(2) };
+  });
+  const outside = cities.filter((c) => c.x < 0 || c.y < 0 || c.x > T.width || c.y > T.height);
+  if (outside.length) throw new Error(`italia: outside the map: ${outside.map((c) => c.id).join(', ')}`);
+  const anchors = chooseNames(cities, CITIES.nomi, { width: T.width, height: T.height });
+  const named = cities.filter((c) => anchors[c.id]);
+  const dots = cities.filter((c) => !anchors[c.id]).sort((a, b) => a.y - b.y); // north first: southern dots paint on top
   return {
     description: 'Italia con le isole maggiori e minori (≥ ' + minIslandKm2 + ' km²): contorno chiuso, solo tratto.',
     viewBox: `0 0 ${T.width} ${T.height}`,
@@ -253,7 +386,8 @@
     subpaths: lines.length,
     path,
     bytes: Buffer.byteLength(path),
-    places: ['varese', 'altamura', 'caltanissetta'].map((id) => placeEntry(id, T)),
+    places: named.map((p) => ({ ...p, anchor: anchors[p.id] })),
+    dots: dots.map(({ id, x, y, xPct, yPct }) => ({ id, x, y, xPct, yPct })),
   };
 }
 
```

#### 3 · `src/components/ui/MapItaly.astro`

```diff
--- a/src/components/ui/MapItaly.astro
+++ b/src/components/ui/MapItaly.astro
@@ -9,7 +9,9 @@
 import { formatCoords } from '../../lib/geo';
 
 type MapPlace = { id: string; name: string; lat: number; lon: number };
-type PlacePoint = { id: string; x: number; y: number; role?: string };
+type LabelAnchor = { wide: string; narrow: string };
+type PlacePoint = { id: string; name?: string; lat?: number; lon?: number; x: number; y: number; role?: string; anchor?: LabelAnchor };
+type MapDot = { id: string; x: number; y: number };
 type MapLabel = { text: string; x: number; y: number; anchor?: 'start' | 'middle' | 'end' };
 type MapData = {
   viewBox: string;
@@ -17,11 +19,19 @@
   path: string;
   places: PlacePoint[] | Record<string, { x: number; y: number }>;
   labels?: MapLabel[];
+  /** Città Digitali: the cities without a name (scripts/generate-maps.mjs). */
+  dots?: MapDot[];
 };
 
 interface Props {
   map: 'italia' | 'puglia';
-  places: MapPlace[];
+  /** Named places; with `cities` they come from maps.json. */
+  places?: MapPlace[];
+  /**
+   * Città Digitali (Home chapter 03): every city of src/data/citta-digitali.json, one dot each,
+   * names where they fit at every width (anchors computed by scripts/generate-maps.mjs). No coordinates.
+   */
+  cities?: boolean;
   showLabels?: boolean;
   /** Puglia: crop to the stretch of coast around the places. */
   compact?: boolean;
@@ -32,7 +42,7 @@
   class?: string;
 }
 
-const { map, places, showLabels = true, compact = false, home, frame, class: className } = Astro.props;
+const { map, places = [], cities = false, showLabels = true, compact = false, home, frame, class: className } = Astro.props;
 
 const files = import.meta.glob<{ default: Record<string, unknown> }>('../../data/maps.json', { eager: true });
 const raw = Object.values(files)[0]?.default as { maps?: Record<string, MapData> } & Record<string, MapData> | undefined;
@@ -55,18 +65,24 @@
 const [vbX, vbY, vbW, vbH] = viewBox.split(/\s+/).map(Number);
 const pct = (x: number, y: number) => ({ left: ((x - vbX) / vbW) * 100, top: ((y - vbY) / vbH) * 100 });
 
+// Named places first, then the dots: every city of the map has a projected position.
 const lookup = (id: string) => {
   const list = data?.places;
-  if (Array.isArray(list)) return list.find((p) => p.id === id);
-  return list?.[id] ? { id, ...list[id] } : undefined;
+  const named = Array.isArray(list) ? list.find((p) => p.id === id) : list?.[id] ? { id, ...list[id] } : undefined;
+  return named ?? data?.dots?.find((d) => d.id === id);
 };
 
-const points = places.map((p) => {
-  const pt = lookup(p.id) ?? project(p.lat, p.lon);
+const placeList: MapPlace[] =
+  cities && Array.isArray(data?.places) ? data.places.map((p) => ({ id: p.id, name: p.name ?? p.id, lat: p.lat ?? 0, lon: p.lon ?? 0 })) : places;
+const points = placeList.map((p) => {
+  const pt: Partial<PlacePoint> & { x: number; y: number } = lookup(p.id) ?? project(p.lat, p.lon);
   const pos = pct(pt.x, pt.y);
-  // Labels of places in the eastern part of the map hang to the left, so they stay inside it.
-  return { ...p, ...pos, isHome: p.id === home, labelLeft: pos.left > 55 };
+  // Names placed at build time (Città Digitali) carry an anchor per class of width; without one,
+  // labels of places in the eastern part of the map hang to the left, so they stay inside it.
+  const anchor = cities ? pt.anchor : undefined;
+  return { ...p, ...pos, anchor, isHome: p.id === home, labelLeft: !anchor && pos.left > 55 };
 });
+const dots = cities ? (data?.dots ?? []).map((d) => pct(d.x, d.y)) : [];
 const labels = (data?.labels ?? []).map((l) => ({ ...l, ...pct(l.x, l.y) }));
 
 // Graticule every degree (fallback only).
@@ -83,7 +99,7 @@
 }
 ---
 
-<div class:list={['map', `map--${map}`, { 'map--fallback': !data, 'map--compact': compact || Boolean(frame) }, className]} style={`aspect-ratio: ${vbW} / ${vbH}`} aria-hidden="true">
+<div class:list={['map', `map--${map}`, { 'map--fallback': !data, 'map--compact': compact || Boolean(frame), 'map--cities': cities }, className]} style={`aspect-ratio: ${vbW} / ${vbH}`} aria-hidden="true">
   <svg class="map__svg" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" focusable="false">
     {data ? <path class="map__coast" d={data.path} vector-effect="non-scaling-stroke" /> : <path class="map__grid" d={graticule.join('')} vector-effect="non-scaling-stroke" />}
   </svg>
@@ -95,14 +111,20 @@
         </span>
       ))
   }
+  {dots.map((d) => <span class="map__dot" style={`left: ${d.left.toFixed(2)}%; top: ${d.top.toFixed(2)}%`} />)}
   {
     points.map((p, i) => (
-      <span class:list={['map__place', { 'map__place--home': p.isHome, 'map__place--label-left': p.labelLeft }]} style={`left: ${p.left}%; top: ${p.top}%; --i: ${i}`} data-place={p.id}>
+      <span
+        class:list={['map__place', { 'map__place--home': p.isHome, 'map__place--label-left': p.labelLeft }]}
+        style={`left: ${p.left}%; top: ${p.top}%; --i: ${i}`}
+        data-place={p.id}
+        data-narrow={p.anchor?.narrow === 'none' ? 'dot' : undefined}
+      >
         <span class="map__node" />
         {showLabels && (
-          <span class="map__label t-label">
+          <span class="map__label t-label" data-anchor={p.anchor?.wide} data-anchor-narrow={p.anchor && p.anchor.narrow !== p.anchor.wide ? p.anchor.narrow : undefined}>
             <span>{p.name}</span>
-            <span class="map__coords">{formatCoords(p)}</span>
+            {!cities && <span class="map__coords">{formatCoords(p)}</span>}
           </span>
         )}
       </span>
@@ -225,6 +247,96 @@
     text-align: right;
   }
 
+  /* Città Digitali (Home chapter 03): one dot per city without a name. Half the named node, same
+     colour: a place, not a hotspot. A knockout ring in the surface colour keeps every dot distinct
+     where they crowd and where they cross the coastline (a stroke, not a shadow: DS §1.5). */
+  .map__dot {
+    position: absolute;
+    width: 5px;
+    height: 5px;
+    margin: -2.5px 0 0 -2.5px;
+    border-radius: 50%;
+    background: var(--place);
+    box-shadow: 0 0 0 1.5px var(--bg);
+  }
+
+  .map--cities .map__node {
+    box-shadow: 0 0 0 1.5px var(--bg);
+  }
+
+  /* Names on one line: their room is computed for one line at build time. */
+  .map--cities .map__label > span:first-child {
+    max-width: none;
+    white-space: nowrap;
+  }
+
+  /* Names placed at build time around their node (scripts/generate-maps.mjs): beside it (e, w),
+     on a corner (ne, se, nw, sw), or hanging below it on a vertical leader, like the Horizon labels
+     (drop: first line 24 px below the node, drop2: 40 px; -r/-l: name right or left of the leader). */
+  .map__label[data-anchor] {
+    inset: auto;
+  }
+
+  .map__label[data-anchor='e'] { left: 14px; top: -0.7em; }
+  .map__label[data-anchor='w'] { right: 14px; top: -0.7em; justify-items: end; text-align: right; }
+  .map__label[data-anchor='ne'] { left: 8px; bottom: 8px; }
+  .map__label[data-anchor='se'] { left: 8px; top: 8px; }
+  .map__label[data-anchor='nw'] { right: 8px; bottom: 8px; justify-items: end; text-align: right; }
+  .map__label[data-anchor='sw'] { right: 8px; top: 8px; justify-items: end; text-align: right; }
+  .map__label[data-anchor^='drop'] { --drop: 24px; top: calc(var(--drop) - 0.7em); }
+  .map__label[data-anchor^='drop2'] { --drop: 40px; }
+  .map__label[data-anchor$='-r'] { left: 0; padding-left: 8px; }
+  .map__label[data-anchor$='-l'] { right: 0; padding-right: 8px; justify-items: end; text-align: right; }
+
+  .map__label[data-anchor^='drop']::before {
+    content: '';
+    position: absolute;
+    top: calc(0.7em - var(--drop) + 6.5px); /* from the node's knockout ring… */
+    height: calc(var(--drop) - 6.5px); /* …down to the middle of the first line */
+    width: 1px;
+    background: var(--place);
+  }
+
+  .map__label[data-anchor$='-r']::before { left: 0; }
+  .map__label[data-anchor$='-l']::before { right: 0; }
+
+  /* Narrow maps (up to 25rem, like the coordinates below): the narrow anchor where it differs; a
+     city without room for its name there is drawn as a dot. */
+  @container (max-width: 25rem) {
+    .map__label[data-anchor-narrow] {
+      inset: auto;
+      padding-inline: 0;
+      justify-items: start;
+      text-align: left;
+    }
+
+    .map__label[data-anchor-narrow]::before { content: none; }
+    .map__label[data-anchor-narrow='none'] { display: none; }
+    .map__place[data-narrow='dot'] .map__node { left: -2.5px; top: -2.5px; width: 5px; height: 5px; }
+    .map__label[data-anchor-narrow='e'] { left: 14px; top: -0.7em; }
+    .map__label[data-anchor-narrow='w'] { right: 14px; top: -0.7em; justify-items: end; text-align: right; }
+    .map__label[data-anchor-narrow='ne'] { left: 8px; bottom: 8px; }
+    .map__label[data-anchor-narrow='se'] { left: 8px; top: 8px; }
+    .map__label[data-anchor-narrow='nw'] { right: 8px; bottom: 8px; justify-items: end; text-align: right; }
+    .map__label[data-anchor-narrow='sw'] { right: 8px; top: 8px; justify-items: end; text-align: right; }
+    .map__label[data-anchor-narrow^='drop'] { --drop: 24px; top: calc(var(--drop) - 0.7em); }
+    .map__label[data-anchor-narrow^='drop2'] { --drop: 40px; }
+    .map__label[data-anchor-narrow$='-r'] { left: 0; padding-left: 8px; }
+    .map__label[data-anchor-narrow$='-l'] { right: 0; padding-right: 8px; justify-items: end; text-align: right; }
+
+    .map__label[data-anchor-narrow^='drop']::before {
+      content: '';
+      position: absolute;
+      top: calc(0.7em - var(--drop) + 6.5px);
+      height: calc(var(--drop) - 6.5px);
+      width: 1px;
+      background: var(--place);
+    }
+
+    .map__label[data-anchor-narrow$='-r']::before { left: 0; right: auto; }
+    .map__label[data-anchor-narrow$='-l']::before { right: 0; left: auto; }
+  }
+
   .map__coords {
     color: var(--fg-2);
   }
```

#### 4 · `src/pages/index.astro`

La legenda è un segnaposto: il testo lo scrive copywriter-brand (P4).

```diff
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -15,7 +15,7 @@
 import Media from '../components/ui/Media.astro';
 import MapItaly from '../components/ui/MapItaly.astro';
 import Node from '../components/ui/Node.astro';
-import { horizonPlaces, italyPlaces, pugliaPlaces, office, founder } from '../data/site';
+import { horizonPlaces, pugliaPlaces, office, founder } from '../data/site';
 import { founderPortrait, eventPhotoNote } from '../data/media';
 import { bearing, distanceKm, formatCoords } from '../lib/geo';
 import { pageGraph, person, ids } from '../lib/structured-data';
@@ -141,7 +141,10 @@
         text="Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per imprese e attività. Varese, Altamura, Caltanissetta: città diverse, un unico portale."
         cta={{ label: 'Esplora Città Digitali', href: '/citta-digitali/', id: 'home-capitolo-citta-digitali' }}
       >
-        <MapItaly slot="visual" map="italia" places={italyPlaces} class="worlds__map" />
+        <figure slot="visual" class="worlds__atlas">
+          <MapItaly map="italia" cities class="worlds__map" />
+          <figcaption class="worlds__atlas-note t-label">Un punto per ogni città di Città Digitali</figcaption>
+        </figure>
       </ProjectShowcase>
     </ol>
   </section>
@@ -266,4 +269,19 @@
     max-width: 30rem;
     margin-inline: auto;
   }
+
+  /* Chapter 03: the map and its one-line legend share the width of the map. */
+  .worlds__atlas {
+    max-width: 30rem;
+    margin: 0 auto;
+  }
+
+  .worlds__atlas :global(.worlds__map) {
+    max-width: none;
+  }
+
+  .worlds__atlas-note {
+    margin-top: var(--space-s);
+    color: var(--fg-2);
+  }
 </style>
```

**Poi:** `npm run maps`, poi build. Con questi quattro file non serve altro: la carta di `/citta-digitali/` e quella della Puglia non cambiano.

## 2. Prove

**Come.**
- Ho copiato nello scratchpad `src/`, `public/`, `scripts/` e la configurazione, con `node_modules` collegato e la cache di Astro nella copia.
- Ho applicato le quattro modifiche qui sopra, generato `maps.json` con l'elenco reale (45 città) e costruito il sito.
- `astro check`: 0 errori, 0 avvisi. Le tre patch si applicano pulite al repository: verificato con `git apply --check`, senza modificarlo.
- Misure con Playwright (Chromium) sulla build servita in locale:
  - per ogni nome visibile, il riquadro del testo con il suo fondo e il richiamo, confrontati con ogni puntino (raggio con anello e 1 px di margine), con ogni nodo, con gli altri nomi e con il bordo della carta;
  - 18 larghezze di finestra: 320, 340, 360, 375, 390, 414, 480, 600, 699, 700, 768, 900, 1023, 1024, 1100, 1280, 1440 e 1920 px.

| Prova | Esito |
|---|---|
| Sovrapposizioni dei nomi (testo, fondo, richiami) con puntini, nodi, altri nomi e bordo | **Nessuna**, a tutte le 18 larghezze |
| Stessa prova con la spaziatura del testo di WCAG 1.4.12 (interlinea 1,5, tracking 0,12em, spazio tra parole 0,16em) | **Nessuna**, a tutte le 18 larghezze |
| Nomi per classe | 5 sulle carte strette (finestre da 320 a 414 e 1024 px), 9 sulle larghe (da 480 px, e da 1100 px); le città con nome solo sulle larghe sono puntini Ø 5 sulle strette (misurato) |
| Reflow della Home (320, 390, 768, 1024, 1440 px) | Nessuno scorrimento orizzontale, nessun testo fuori viewport; la legenda va su 2 righe solo a 320 px |
| Carta di `/citta-digitali/` | Stesso markup di oggi (posizioni e classi) |
| Peso dell'HTML della Home | +9,4 KB, +1,1 KB con gzip: 27,4 KB su 40 (budget §3) |
| Stress test con posizioni di prova dichiarate, mai nel sito: 10, 25, 40 e 50 punti, di cui fino a 29 tra la provincia di Bari e i dintorni | Generatore senza errori. Con 50 punti il nome di Caltanissetta non ha spazio sulle carte strette: si nasconde con un avviso, come previsto |

**Screenshot** (a 2×, nello scratchpad, non versionati) a 390, 1024 e 1440 px. Il gruppo pugliese si legge come tanti luoghi, non come una macchia. Altamura e Massafra sono appese, con il richiamo in `--place`. Sulle carte larghe Bari sta sul mare, Manfredonia a ovest del suo nodo, Caltagirone a est.

## 3. Coerenza con la direzione visiva e con il design system

| Riferimento | Come la proposta lo rispetta | Da decidere |
|---|---|---|
| DV §1.4, «Non si fa: mappe a puntini, pin in stile Google, coordinate arrotondate per effetto» | Un puntino per città reale, nella sua posizione vera; niente pin, niente trama | Il nuovo segno «punto-città» nel dispositivo delle Coordinate (creative-director) |
| DV §1.4, fonte unica a 2 decimali | Controllo nel generatore (più di 2 decimali fermano il build) | Martina Franca da Wikidata P625 (eccezione) |
| DV §7.6, N12 | Solo contorno, nessuna campitura; i puntini mostrano una distribuzione vera, densa in Puglia | — |
| DV §1.3 e DS §2.3 (Nodo) | I puntini non sono nodi: niente anello, ping né hover. Il nodo con nome resta Ø 10 | — |
| DS §1.5 (nessuna ombra) | L'anello è un tratto pieno nel colore della superficie, come l'anello già accettato sui nodi delle foto | Estendere la tecnica ai puntini delle carte (creative-director) |
| DS §2.1 (richiami dell'Orizzonte) | I nomi appesi usano lo stesso gesto: 1 px in `--place`, verticale, il nome sotto | — |
| DS §1.2 (etichette mono) | Nomi in `label` mono, `--fg`, con il fondo nel colore della superficie già usato sulle carte; mai sillabati, sempre su una riga | — |
| Coordinate sotto i nomi | Tolte nella carta del capitolo (l'utente: «anche senza coordinate»); restano su `/citta-digitali/` | Conferma del creative-director |

Dopo la decisione aggiorno il design system: §2.4 (Coordinate: punto-città, nomi per classe, legenda), §5.4 (carte: `dots`, `anchor`, file dati) e §1.5 (anello dei puntini).

## 4. Limiti noti

- **Città sotto il nodo di un nome obbligatorio.** San Cataldo è a 7 km da Caltanissetta: il suo puntino resta sotto il nodo a ogni larghezza. Gravina, a 11 km, resta sotto Altamura fino a 350 px di carta. Alla scala dell'Italia sono lo stesso punto; restano nell'elenco testuale. Per gli altri nomi la regola li esclude: è il motivo per cui Pompei e Comiso non hanno il nome.
- **Gruppi stretti.** Ercolano e Torre del Greco (2,7 km) distano meno di 1,5 px: si vedono come un puntino con uno spicchio.
- **Misure in Chromium.** Le misure dell'etichetta mono sono quelle di Chromium, che arrotonda l'avanzamento dei glifi di Fragment Mono al pixel (7 px fino a circa 12,4 px di corpo, 8 px oltre). Il generatore usa un margine (9,6 px per carattere, con la spaziatura di 1.4.12). Safari iOS e Firefox `[DA VERIFICARE]`.
- **Testo ingrandito solo nelle impostazioni del browser** (non con lo zoom della pagina): le etichette, in rem, crescono più della carta, e i margini potrebbero non bastare. Lo zoom della pagina, che è quello di WCAG 1.4.4, non cambia nulla.

## Verdetto di dominio (UI)

**Proposta pronta per la decisione del creative-director.**
- Risponde alla richiesta dell'utente: tutte le città, nomi solo dove stanno, più dei tre del testo, nessuna sovrapposizione a nessuna larghezza.
- Rispetta le soglie: WCAG 2.2 AA (nessun testo sovrapposto, anche con 1.4.12), performance (nessun JavaScript, +1,1 KB gzip), veridicità (nessun numero; nomi solo dall'elenco confermato dall'utente; Polignano e San Cataldo senza nome).
- Le scelte aperte (segno nuovo, ordine dei nomi, eccezione di Martina Franca, testo della legenda) sono del creative-director, di brand-strategist e di copywriter-brand. L'elenco testuale lo verifica ux-designer.

## Ipotesi da validare

- I nomi della pagina «Tutte le città» sono quelli del riassunto letto da brand-strategist (`citta-digitali-elenco.md` §1): fino al testo della pagina restano `[DA VERIFICARE]`, anche sulla carta.
- Le 45 città sono tutte attive sul portale (domanda al cliente, `citta-digitali-elenco.md`).
- Le misure valgono in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`.

## Domande aperte

- **creative-director:**
  - il segno «punto-città» e l'anello nel colore della superficie;
  - l'ordine dei candidati in `nomi`;
  - i nomi appesi con il richiamo;
  - le coordinate tolte dalla carta del capitolo;
  - una terza classe di larghezza per il desktop a 1024 px (carta di 382 px), che oggi mostra 5 nomi come i telefoni (costa una regola CSS in più per posizione).
- **brand-strategist:** l'eccezione di Martina Franca (coordinate da Wikidata) e quando si potrà pubblicare il numero.
- **copywriter-brand:** il testo della legenda (P4).
- **ux-designer:** dove sta l'elenco completo in testo. La sezione «L'Italia in un unico portale» di `/citta-digitali/` oggi è disegnata per 3 città allineate alla latitudine (DV §7.6), e con 45 città va ripensata.

## Decisioni richieste

1. **creative-director:** adottare la proposta (P1–P5), con l'ordine dei nomi e la legenda.
2. **creative-director, sentito brand-strategist:** l'eccezione alla fonte unica per Martina Franca. Se non passa, il suo puntino si toglie e la legenda non può dire «un punto per ogni città».
3. **Sessione principale:** applicare le quattro modifiche, poi `npm run maps` e build. Poi rifaccio la misura sulla build di staging.
