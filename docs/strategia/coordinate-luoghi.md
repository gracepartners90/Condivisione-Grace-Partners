---
titolo: Coordinate dei luoghi · fonte, precisione e valori da applicare
owner: brand-strategist
contributi: [creative-director]
stato: in revisione
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/creativa/direzione-visiva.md (0.2, §1.4), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (N2, C11), src/data/site.ts, src/lib/geo.ts, src/components/ui/Horizon.astro, src/data/asset-slots.ts, src/pages/contatti.astro, scripts/generate-maps.mjs, scripts/og/og-card.html, WebSearch del 2026-09-28 (URL nella tabella 1)]
---

# Coordinate dei luoghi

**Perché.** Verdetto G4, N2 e condizione C11: tre coordinate sono arrotondate e mostrate con zeri di riempimento (Monopoli «40.9500° N · 17.3000° E», Caltanissetta «37.4900° N», Cassano delle Murge «16.7700° E»), e nessuna ha una fonte dichiarata. La regola della DV §1.4 chiede una fonte unica per tutti e sette i luoghi: 4 decimali reali, oppure 2 decimali per tutti.

**In breve.**
- **La fonte unica non è raggiungibile da questo ambiente.** Wikidata, OpenStreetMap e Wikipedia sono bloccati dalla policy di rete (§1), che vieta di aggirare i blocchi.
- **WebSearch restituisce per tutti e sette i comuni le coordinate del riquadro di Wikipedia in inglese.** È una fonte unica, ma con la precisione del primo d'arco (circa 1,8 km), salvo Caltanissetta, al secondo. Bastano per il ripiego a 2 decimali, non per i 4 decimali.
- **Proposta.**
  1. **Strada consigliata:** 4 decimali reali da OpenStreetMap. L'utente apre da un browser il link pronto del §4, circa 2 minuti, e ci passa il risultato. Io verifico, la sessione principale applica.
  2. **Ripiego, se i valori OSM non arrivano quando la sessione principale applica C10–C13:** i valori della **tabella 1**, a 2 decimali per tutti i luoghi, da Wikipedia.
- **Sede:** la coordinata del comune va bene per `office`, alle condizioni del §5. Non serve quella dell'indirizzo.

---

## 1. Fonti provate il 2026-09-28

| Fonte | Host | Esito |
|---|---|---|
| Wikidata (P625) | `query.wikidata.org`, `www.wikidata.org` | Bloccati dalla policy di rete |
| OpenStreetMap | `nominatim.openstreetmap.org`, `overpass-api.de`, `api.openstreetmap.org` | Bloccati |
| Wikipedia | `it.wikipedia.org`, `en.wikipedia.org`, `geohack.toolforge.org` | Bloccati |
| Altre fonti | `www.geonames.org`, `www.tuttitalia.it`, `www.comuni-italiani.it` | Bloccati |
| Servizi che ridistribuiscono Wikidata e OSM | `qlever.cs.uni-freiburg.de`, `photon.komoot.io`, `overpass.kumi.systems` | Bloccati. Li ho provati prima di leggere la regola del proxy (`/root/.ccr/README.md`: un blocco di policy si segnala, non si aggira), poi mi sono fermato |
| WebSearch | — | Funziona, ma restituisce un riassunto generato e i link, non il testo della pagina. I valori letti così restano `[DA VERIFICARE]` |

Nessuna richiesta conteneva dati personali.

## 2. Tabella 1 · Valori pronti per il ripiego (2 decimali, fonte unica)

**Fonte:** Wikipedia in inglese, riquadro della voce del comune. Valori letti il 2026-09-28 dal riassunto di WebSearch, perché le pagine non sono raggiungibili da qui: tutti `[DA VERIFICARE]`. La verifica è aprire i sette URL da un browser (§6).

**Conversione:** decimale = gradi + primi/60 + secondi/3600, arrotondato a 2 decimali.

| Luogo | lat | lon | Fonte: valore del riquadro | URL | Data |
|---|---|---|---|---|---|
| Acquaviva delle Fonti (anche `office`) | 40.90 | 16.85 | Wikipedia (en): 40°54′N 16°51′E | https://en.wikipedia.org/wiki/Acquaviva_delle_Fonti | 2026-09-28, via WebSearch |
| Gravina in Puglia | 40.82 | 16.42 | Wikipedia (en): 40°49′N 16°25′E | https://en.wikipedia.org/wiki/Gravina_in_Puglia | 2026-09-28, via WebSearch |
| Monopoli | 40.95 | 17.30 | Wikipedia (en): 40°57′N 17°18′E | https://en.wikipedia.org/wiki/Monopoli | 2026-09-28, via WebSearch |
| Varese | 45.82 | 8.83 | Wikipedia (en): 45°49′N 08°50′E | https://en.wikipedia.org/wiki/Varese | 2026-09-28, via WebSearch |
| Altamura | 40.82 | 16.55 | Wikipedia (en): 40°49′N 16°33′E | https://en.wikipedia.org/wiki/Altamura | 2026-09-28, via WebSearch |
| Caltanissetta | 37.49 | 14.06 | Wikipedia (en): 37°29′25″N 14°03′45″E | https://en.wikipedia.org/wiki/Caltanissetta | 2026-09-28, via WebSearch |
| Cassano delle Murge | 40.88 | 16.77 | Wikipedia (en): 40°53′N 16°46′E | https://en.wikipedia.org/wiki/Cassano_delle_Murge | 2026-09-28, via WebSearch |

**Note.**
- **Gli zeri finali di «40.90» e «17.30» sono cifre reali:** 40°54′ è esattamente 40,90. A 2 decimali per tutti non c'è riempimento, e la regola «mai precisioni diverse nella stessa pagina» è rispettata.
- **Controllo di coerenza con i valori di lavoro di oggi.**
  - Le due serie distano al massimo circa 1,3 km (Altamura, latitudine); le altre meno di 1 km; Monopoli coincide.
  - A 2 decimali cambiano 3 cifre su 14 rispetto all'arrotondamento dei valori di oggi: la longitudine di Acquaviva (16.84 → 16.85) e le latitudini di Altamura (40.83 → 40.82) e di Cassano (40.89 → 40.88).
  - Alla scala di un comune nessuna delle due serie è sbagliata: la cifra la decide la fonte dichiarata.
- **I valori da scrivere nei dati sono quelli a 2 decimali**, non la conversione piena. Così chi rifà il calcolo con le coordinate mostrate ottiene gli stessi gradi e chilometri.

## 3. Effetto su rilevamenti e distanze

Calcoli fatti a mano con le formule di `src/lib/geo.ts`: rilevamento iniziale sul cerchio massimo, haversine con R = 6371,0088 km. Il metodo riproduce i valori della DV §1.4 calcolati con quelli di oggi.

| Luogo, da Acquaviva | Oggi (valori di lavoro) | Con la tabella 1 |
|---|---|---|
| Monopoli | 081° · 39 km | 081° · 38 km |
| Cassano delle Murge | 265° · 6 km | 252° · 7 km |
| Altamura | 253° · 25 km | 251° · 27 km |
| Gravina in Puglia | 257° · 36 km | 256° · 37 km |
| Caltanissetta | 213° · 448 km | 213° · 449 km |
| Varese | 313° · 848 km | 313° · 848 km |

- **Orizzonte della Home.**
  - Il componente unisce in un'etichetta i luoghi a meno di 12° l'uno dall'altro, quindi non nascono etichette nuove.
  - L'etichetta di gruppo passa da «Altamura · Gravina · Cassano — 253–265° · 6–36 km» ad «Altamura · Cassano · Gravina — 251–256° · 7–37 km».
  - ui-designer rifà la misura degli incroci (V14), come chiede il commento in `Horizon.astro`.
- **Città Digitali e porte di Puglia Digitale:** Altamura 251° · 27 km, Caltanissetta 449 km, Gravina 256° · 37 km, Monopoli 081° · 38 km.
- **Perché consiglio comunque la strada OSM.**
  - Con coordinate precise al chilometro, il rilevamento di un luogo a 7 km è incerto di circa ±10°. Lo spostamento di Cassano (da 265° a 252°) è tutto qui.
  - Per i luoghi lontani l'effetto è trascurabile.
  - La hero è fatta di gradi: con 4 decimali reali i gradi di Cassano, Altamura e Gravina diventano affidabili.

## 4. Strada consigliata · 4 decimali reali da OpenStreetMap

- **Chi.** L'utente, da un browser qualunque, oppure chiunque abbia una rete che raggiunge OSM. Non serve il cliente: sono dati pubblici.
- **Come.** Aprire questo link, che restituisce un JSON con i nodi dei sette comuni, e salvare o incollare il risultato:
  ```text
  https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A90%5D%3Barea%5B%22ISO3166-1%22%3D%22IT%22%5D%5Badmin_level%3D2%5D-%3E.it%3Bnode%28area.it%29%5B%22place%22~%22%5E%28city%7Ctown%7Cvillage%29%24%22%5D%5B%22name%22~%22%5E%28Acquaviva%20delle%20Fonti%7CGravina%20in%20Puglia%7CMonopoli%7CAltamura%7CCassano%20delle%20Murge%7CVarese%7CCaltanissetta%29%24%22%5D%3Bout%20body%3B
  ```
  In alternativa, incollare la query in https://overpass-turbo.eu, premere «Esegui» e aprire la scheda «Dati».
  ```text
  [out:json][timeout:90];
  area["ISO3166-1"="IT"][admin_level=2]->.it;
  node(area.it)["place"~"^(city|town|village)$"]["name"~"^(Acquaviva delle Fonti|Gravina in Puglia|Monopoli|Altamura|Cassano delle Murge|Varese|Caltanissetta)$"];
  out body;
  ```
- **Quale nodo.** Il nodo `place` con lo stesso nome. Se ce n'è più di uno, quello con il tag `wikidata` uguale all'identificativo del comune.
  - Identificativi dai risultati di WebSearch del 2026-09-28: Acquaviva delle Fonti Q51810, Gravina in Puglia Q51829, Monopoli Q51835, Altamura Q19306, Caltanissetta Q13680, Cassano delle Murge Q51820.
  - Varese: `[DA VERIFICARE]`.
- **Come si scrivono.** Da 7 a 4 decimali per arrotondamento, sempre cifre della fonte. Accanto a ogni luogo va un commento con l'id del nodo e la data, per esempio `// OSM node 123456789 (place=town), 2026-09-29`. `formatCoords` resta a 4 decimali.
- **Attenzione al controllo di go-live.** Se un valore reale arrotondato finisce in «00», il controllo proposto in N10 (`/\d\.\d\d00°/`) lo segnala per errore. In quel caso va aggiunta un'eccezione con l'id del nodo, non si cambia la cifra.
- **Perché non Wikidata.** `[IPOTESI: per questi comuni P625 ha la stessa precisione al primo d'arco del riquadro di Wikipedia, da cui in gran parte deriva.]` Se è così, Wikidata darebbe di nuovo 40.95 · 17.3 per Monopoli, cioè i valori segnalati in N2. Wikidata va bene solo se la precisione dichiarata (`wikibase:geoPrecision`) è almeno di 0,0001°.

## 5. La sede

- **Oggi.** `office` ha le coordinate del comune di Acquaviva delle Fonti, identiche a quelle del luogo «Acquaviva» (`src/data/site.ts`, righe 97–98 e 102).
- **Parere: va bene come punto di osservazione e come firma. Non serve la coordinata di Via Sant'Anna 34.** Le condizioni:
  1. **Nessun testo presenta le coordinate come posizione della sede.** Oggi è così:
     - hero: «Vista da Acquaviva delle Fonti» (`index.astro`, riga 35);
     - footer: «ITnode · Acquaviva delle Fonti · …» (`Footer.astro`, riga 104);
     - Contatti: «Acquaviva delle Fonti · …» sotto l'indirizzo (`contatti.astro`, riga 82).

     Mai «Sede · [coordinate]». L'etichetta «SEDE» nella porta di Acquaviva va bene, perché nomina la città: con N9 le coordinate non si ripetono dentro la porta.
  2. **«Apri in Google Maps» continua a cercare l'indirizzo**, non le coordinate (`contatti.astro`, riga 18).
  3. **Stessa fonte e stesso tipo di punto degli altri sei luoghi.** Rilevamenti e distanze vanno da comune a comune, come dice la didascalia «Vista da Acquaviva delle Fonti».
- **Perché non l'indirizzo.**
  - Sarebbe l'unico punto preso da un'altra fonte (un geocodificatore o un rilievo), contro la regola della fonte unica.
  - I 4 decimali di un indirizzo geocodificato sono spesso interpolati.
  - Nessun testo del sito ne ha bisogno.
- **Quando servirebbe.** Se si aggiungono coordinate `geo` ai dati strutturati (oggi assenti: `structured-data.ts` pubblica solo `address`) o una mappa con un segnaposto. In quel caso:
  - la fonte è il segnaposto verificato della scheda Google Business Profile del cliente, oppure un rilievo sul posto confermato dal cliente `[DA FORNIRE]`;
  - il formato lo decidono seo-technical e seo-content.
- **Due ritocchi di testo, non bloccanti.**
  - La DV §1.4, il design system e i commenti del codice dicono «dalla sede»: meglio «da Acquaviva delle Fonti, il comune della sede».
  - Commento proposto per `office`: `// Observer point for bearings and distances: the town of Acquaviva delle Fonti, same source as the other places (not the office street address).`

## 6. Dove si applicano i valori (per la sessione principale)

Le coordinate sono duplicate in quattro file del codice: vanno aggiornate tutte insieme, oppure lette da `site.ts`.

| File | Che cosa |
|---|---|
| `src/data/site.ts` | `office`, `pugliaPlaces`, `italyPlaces`, Cassano in `horizonPlaces`. Commento con fonte, URL e data (tabella 1 o id dei nodi OSM) al posto di «must be checked before launch» |
| `src/lib/geo.ts` | Con il ripiego, `formatCoords` passa a `toFixed(2)`, e il commento a «2 digits (visual direction §1.4, fallback)». Con OSM resta a 4 |
| `src/data/asset-slots.ts`, righe 93–95 | Valori duplicati: meglio importarli da `site.ts` |
| `scripts/generate-maps.mjs`, righe 40–48 e 311 | `PLACES` duplicato e `coordinatesNote` «DA VERIFICARE»; poi `npm run maps` |
| `scripts/og/og-card.html`, riga 93 | Coordinate della sede nell'immagine social; poi `npm run og` |
| Documenti | Esempi e tabelle con i valori di oggi: DV §1.4, §5 e §7.8 (creative-director); `docs/ui/design-system.md`, righe 311–312 (ui-designer); `docs/contenuti/microcopy.md`, riga 59, `docs/contenuti/tone-of-voice.md`, riga 130, `docs/contenuti/copy-deck/home.md`, riga 74 (copywriter-brand) |

**Poi:**
- `npm run check:launch` con N10;
- ui-designer rifà la misura degli incroci dell'orizzonte in Home e Città Digitali;
- io confronto i valori pubblicati con la fonte (C11).

## Ipotesi da validare

- `[IPOTESI: i riassunti di WebSearch riportano correttamente i valori dei riquadri di Wikipedia.]` Si verifica aprendo i sette URL della tabella 1.
- `[IPOTESI: Wikidata P625 per questi comuni è al primo d'arco, come Wikipedia.]` Per questo la strada a 4 decimali è OSM.
- `[IPOTESI: i nodi OSM dei sette comuni hanno il tag wikidata e cadono entro circa 1 km dai valori di lavoro.]` Se è così, con 4 decimali l'orizzonte cambia di pochi gradi.
- `[DA VERIFICARE: Masseria Santella si trova a Cassano delle Murge.]` È la ragione per cui Cassano sta sull'orizzonte (domanda B9 del verdetto G4, §6). Se il cliente la smentisce, Cassano esce dall'orizzonte.

## Domande aperte

- **Per l'utente.**
  - Può aprire il link del §4 da un browser e passarci il risultato?
  - In alternativa, può aprire i sette URL della tabella 1 per confermare i valori del ripiego?
- **Per il cliente.** Nessuna domanda sulle coordinate dei comuni, che sono dati pubblici. Due domande collegate:
  - il comune di ciascun esempio SIII (già nella domanda B9);
  - solo se serviranno coordinate `geo` nei dati strutturati, la posizione della sede sulla scheda Google Business Profile.
- **Per il creative-director.** A 2 decimali la firma in coordinate si accorcia («40.90° N · 16.85° E»). La regola lo prevede già. La domanda è solo se aspettare i valori OSM prima di applicare C11.

## Decisioni richieste

- **Utente:** quale strada seguire, (1) OSM, consigliata, oppure (2) il ripiego della tabella 1.
- **Creative-director:** conferma che il ripiego vale per ogni occorrenza, firma del footer e immagine social comprese, e l'aggiornamento della DV §1.4.
- **Sessione principale:** applicare la strada scelta nei file del §6 e rigenerare carte e immagine social.
- **ui-designer:** misura degli incroci dell'orizzonte dopo il cambio.
