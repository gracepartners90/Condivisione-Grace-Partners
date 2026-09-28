---
titolo: Coordinate dei luoghi · fonte, precisione e valori da applicare
owner: brand-strategist
contributi: [creative-director, sessione principale]
stato: in revisione
versione: 0.2
aggiornato: 2026-09-28
fonti: [docs/creativa/direzione-visiva.md (0.2, §1.4), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (N2, C11), src/data/site.ts, src/lib/geo.ts, src/components/ui/Horizon.astro, src/data/asset-slots.ts, src/pages/contatti.astro, scripts/generate-maps.mjs, scripts/og/og-card.html, WebSearch del 2026-09-28 (URL nella tabella 1 e al §1), esito del link Overpass aperto dall'utente (riferito dalla sessione principale il 2026-09-28)]
---

# Coordinate dei luoghi

**Perché.** Verdetto G4, N2 e condizione C11: tre coordinate sono arrotondate e mostrate con zeri di riempimento (Monopoli «40.9500° N · 17.3000° E», Caltanissetta «37.4900° N», Cassano delle Murge «16.7700° E»), e nessuna ha una fonte dichiarata. La regola della DV §1.4 chiede una fonte unica per tutti e sette i luoghi: 4 decimali reali, oppure 2 decimali per tutti.

**In breve.**
- **Non c'è una fonte unica a 4 decimali disponibile prima del lancio.**
  - Wikidata, OpenStreetMap e Wikipedia sono bloccati dalla policy di rete di questo ambiente.
  - Il link Overpass (OSM) aperto dall'utente ha risposto «406 Not Acceptable»; all'utente non si chiede altro.
  - L'ultimo tentativo con WebSearch, un sito alla volta, non ha trovato nessuna fonte che esponga le coordinate al secondo d'arco per tutti e sette i comuni (§1).
- **Decisione: si applica il ripiego della DV §1.4.** Sono 2 decimali per tutti i luoghi, dalla tabella 1: fonte unica Wikipedia in inglese, riquadro del comune.
  - Lo confermo come verifica di C11: la fonte è dichiarata ed è la stessa per tutti, nessuna cifra è di riempimento, il controllo incrociato è superato (§2).
  - Lo applica la sessione principale nei file del §6.
- **Effetto visibile:** cambiano alcuni gradi e chilometri, soprattutto per Cassano delle Murge (da 265° a 252°). Resta una sola etichetta di gruppo sull'orizzonte della Home (§3).
- **Sede:** la coordinata del comune va bene per `office`, alle condizioni del §5.

---

## 1. Fonti provate il 2026-09-28

**Primo giro: lettura diretta.**

| Fonte | Host | Esito |
|---|---|---|
| Wikidata (P625) | `query.wikidata.org`, `www.wikidata.org` | Bloccati dalla policy di rete |
| OpenStreetMap | `nominatim.openstreetmap.org`, `overpass-api.de`, `api.openstreetmap.org` | Bloccati. Il link Overpass aperto dall'utente da un browser ha risposto 406 |
| Wikipedia | `it.wikipedia.org`, `en.wikipedia.org`, `geohack.toolforge.org` | Bloccati |
| Altre fonti | `www.geonames.org`, `www.tuttitalia.it`, `www.comuni-italiani.it` | Bloccati |
| Servizi che ridistribuiscono Wikidata e OSM | `qlever.cs.uni-freiburg.de`, `photon.komoot.io`, `overpass.kumi.systems` | Bloccati. Li ho provati prima di leggere la regola del proxy (`/root/.ccr/README.md`: un blocco di policy si segnala, non si aggira), poi mi sono fermato |

**Secondo giro: WebSearch limitata a un sito per volta**, così la fonte resta la stessa per tutti i comuni. Si cercavano i secondi d'arco, che garantiscono 4 decimali reali (±0,0003°).

| Sito | Risultato |
|---|---|
| tuttitalia.it | Pagine trovate per tutti e sette i comuni; nessun riassunto riporta i valori delle coordinate |
| it.wikipedia.org | Nessun valore per nessuno dei sette: l'indice non espone il riquadro delle voci dei comuni |
| en.wikipedia.org | Valori per tutti e sette, al primo d'arco; Caltanissetta al secondo. È la fonte della tabella 1 |
| geonames.org | Acquaviva delle Fonti 40.8970, 16.8433, plausibile. Monopoli 40.7409, 17.2944, **sbagliato**: circa 23 km a sud della città. Negli altri cinque casi nessun valore, e in due il riassunto ha proposto valori «a memoria», scartati |
| dateandtime.info, comuni-italiani.it, indettaglio.it, comuniecitta.it, mapcarta.com | Nessun valore sul comune di prova (Acquaviva delle Fonti); non estese agli altri |

**Lezione.** Un riassunto di WebSearch può inventare cifre, come per GeoNames su Monopoli. Si usano solo valori che superano un controllo incrociato con una serie indipendente (§2).

Nessuna richiesta conteneva dati personali.

## 2. Tabella 1 · Valori da applicare (2 decimali, fonte unica)

**Fonte:** Wikipedia in inglese, riquadro della voce del comune. Valori letti il 2026-09-28 dal riassunto di WebSearch, perché le pagine non sono raggiungibili da qui.

**Conversione:** decimale = gradi + primi/60 + secondi/3600, arrotondato a 2 decimali.

| Luogo | lat | lon | Fonte: valore del riquadro | URL | Data |
|---|---|---|---|---|---|
| Acquaviva delle Fonti (anche `office`) | 40.90 | 16.85 | 40°54′N 16°51′E | https://en.wikipedia.org/wiki/Acquaviva_delle_Fonti | 2026-09-28, via WebSearch |
| Gravina in Puglia | 40.82 | 16.42 | 40°49′N 16°25′E | https://en.wikipedia.org/wiki/Gravina_in_Puglia | 2026-09-28, via WebSearch |
| Monopoli | 40.95 | 17.30 | 40°57′N 17°18′E | https://en.wikipedia.org/wiki/Monopoli | 2026-09-28, via WebSearch |
| Varese | 45.82 | 8.83 | 45°49′N 08°50′E | https://en.wikipedia.org/wiki/Varese | 2026-09-28, via WebSearch |
| Altamura | 40.82 | 16.55 | 40°49′N 16°33′E | https://en.wikipedia.org/wiki/Altamura | 2026-09-28, via WebSearch |
| Caltanissetta | 37.49 | 14.06 | 37°29′25″N 14°03′45″E | https://en.wikipedia.org/wiki/Caltanissetta | 2026-09-28, via WebSearch |
| Cassano delle Murge | 40.88 | 16.77 | 40°53′N 16°46′E | https://en.wikipedia.org/wiki/Cassano_delle_Murge | 2026-09-28, via WebSearch |

**Verifica (C11, brand-strategist).**
- **Fonte:** dichiarata e unica per tutti e sette.
- **Cifre:** nessuna è di riempimento. Gli zeri di «40.90» e «17.30» sono cifre vere, perché 40°54′ è esattamente 40,90. La precisione è la stessa ovunque.
- **Controllo incrociato superato.**
  - Ogni valore cade entro 1,4 km dai valori di lavoro di oggi, che sono una serie indipendente: al massimo circa 1,3 km (Altamura, latitudine); Monopoli coincide.
  - Per Acquaviva anche GeoNames (40.8970, 16.8433) sta entro 0,7 km.
  - Un errore di lettura come quello di GeoNames su Monopoli (23 km) sarebbe stato scartato.
- **Rischio residuo:** riguarda al massimo la seconda cifra decimale, non il luogo. Resta `[DA VERIFICARE]` solo la lettura diretta delle sette pagine: si può fare in qualsiasi momento da una rete normale e non blocca il lancio.

**Rispetto ai valori di oggi arrotondati a 2 decimali** cambiano 3 cifre su 14: la longitudine di Acquaviva (16.84 → 16.85) e le latitudini di Altamura (40.83 → 40.82) e di Cassano (40.89 → 40.88).

**Nei dati vanno scritti i valori a 2 decimali**, non la conversione piena. Così chi rifà il calcolo con le coordinate mostrate ottiene gli stessi gradi e chilometri.

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
- **Limite noto.** Con coordinate precise al chilometro, il rilevamento di un luogo a 7 km (Cassano) è incerto di circa ±10°. Per i luoghi lontani è trascurabile. È il motivo per tornare ai 4 decimali dopo il lancio (§4).

## 4. Dopo il lancio: 4 decimali reali (facoltativo)

- Non si persegue prima del lancio: il link Overpass ha risposto 406 e all'utente non si chiede altro.
- Quando qualcuno del team lavorerà da una rete che raggiunge OpenStreetMap, per esempio seo-technical durante i controlli post-lancio:
  - si leggono i nodi `place` dei sette comuni, con la stessa query incollata nell'interfaccia web https://overpass-turbo.eu invece dell'API;
  - si sceglie il nodo con il tag `wikidata` uguale all'identificativo del comune: Acquaviva delle Fonti Q51810, Gravina in Puglia Q51829, Monopoli Q51835, Altamura Q19306, Caltanissetta Q13680, Cassano delle Murge Q51820 (dai risultati di WebSearch); Varese `[DA VERIFICARE]`;
  - si torna a 4 decimali per tutti, con l'id del nodo in un commento.
  ```text
  [out:json][timeout:90];
  area["ISO3166-1"="IT"][admin_level=2]->.it;
  node(area.it)["place"~"^(city|town|village)$"]["name"~"^(Acquaviva delle Fonti|Gravina in Puglia|Monopoli|Altamura|Cassano delle Murge|Varese|Caltanissetta)$"];
  out body;
  ```
- Wikidata non basta, se per questi comuni P625 è al primo d'arco come Wikipedia, da cui in gran parte deriva `[IPOTESI]`.

## 5. La sede

- **Oggi.** `office` ha le coordinate del comune di Acquaviva delle Fonti, identiche a quelle del luogo «Acquaviva» (`src/data/site.ts`, righe 97–98 e 102). Con la tabella 1 restano identiche: 40.90 · 16.85.
- **Parere: va bene come punto di osservazione e come firma. Non serve la coordinata di Via Sant'Anna 34.** Le condizioni:
  1. **Nessun testo presenta le coordinate come posizione della sede.** Oggi è così:
     - hero: «Vista da Acquaviva delle Fonti» (`index.astro`, riga 35);
     - footer: «ITnode · Acquaviva delle Fonti · …» (`Footer.astro`, riga 104);
     - Contatti: «Acquaviva delle Fonti · …» sotto l'indirizzo (`contatti.astro`, riga 82).

     Mai «Sede · [coordinate]». L'etichetta «SEDE» nella porta di Acquaviva va bene, perché nomina la città: con N9 le coordinate non si ripetono dentro la porta.
  2. **«Apri in Google Maps» continua a cercare l'indirizzo**, non le coordinate (`contatti.astro`, riga 18).
  3. **Stessa fonte e stesso tipo di punto degli altri sei luoghi.** Rilevamenti e distanze vanno da comune a comune, come dice la didascalia.
- **Perché non l'indirizzo.**
  - Sarebbe l'unico punto preso da un'altra fonte, contro la regola della fonte unica.
  - Con 2 decimali, cioè circa 1 km, la differenza tra indirizzo e comune è comunque sotto la precisione mostrata `[IPOTESI]`.
- **Quando servirebbe.** Se si aggiungono coordinate `geo` ai dati strutturati (oggi assenti: `structured-data.ts` pubblica solo `address`) o una mappa con un segnaposto. In quel caso:
  - la fonte è il segnaposto verificato della scheda Google Business Profile del cliente, oppure un rilievo sul posto confermato dal cliente `[DA FORNIRE]`;
  - il formato lo decidono seo-technical e seo-content.
- **Ritocco di testo, non bloccante.** DV §1.4, design system e commenti del codice dicono «dalla sede»: meglio «da Acquaviva delle Fonti, il comune della sede».

## 6. Dove si applicano i valori (per la sessione principale)

Le coordinate sono duplicate in quattro file del codice: vanno aggiornate tutte insieme, oppure lette da `site.ts`.

| File | Che cosa |
|---|---|
| `src/data/site.ts` | `office`, `pugliaPlaces`, `italyPlaces`, Cassano in `horizonPlaces`: valori della tabella 1 e commento con la fonte (sotto) |
| `src/lib/geo.ts` | `formatCoords` passa a `toFixed(2)`, con il commento aggiornato (sotto) |
| `src/data/asset-slots.ts`, righe 93–95 | Valori duplicati: meglio importarli da `site.ts` |
| `scripts/generate-maps.mjs`, righe 40–48 e 311 | `PLACES` duplicato e `coordinatesNote` «DA VERIFICARE»; poi `npm run maps` |
| `scripts/og/og-card.html`, riga 93 | «40.90° N · 16.85° E»; poi `npm run og` |
| `scripts/prelaunch-check.mjs` (N10) | Con 2 decimali, al posto del controllo sugli zeri: nessuna coordinata con più di 2 decimali, per esempio `anyPage(/\d\.\d{3,}° [NSEO]/).length === 0` |
| Documenti | Esempi e tabelle con i valori di oggi: DV §1.4, §5 e §7.8 (creative-director); `docs/ui/design-system.md`, righe 311–312 (ui-designer); `docs/contenuti/microcopy.md`, riga 59, `docs/contenuti/tone-of-voice.md`, riga 130, `docs/contenuti/copy-deck/home.md`, riga 74 (copywriter-brand) |

**Testi proposti per i commenti** (in inglese, come il codice):
```ts
// src/data/site.ts, above the places
/**
 * Places. Coordinates from the English Wikipedia infobox of each comune (degrees and minutes;
 * seconds for Caltanissetta), read on 2026-09-28, converted to decimal degrees and rounded to
 * 2 decimals (~1 km): one source, one precision for every place (visual direction §1.4,
 * fallback; docs/strategia/coordinate-luoghi.md). The office is the town of Acquaviva delle
 * Fonti, not the street address. Bearings and distances are computed in src/lib/geo.ts.
 */
// per place, e.g.: lat: 40.95, lon: 17.3, // 40°57′N 17°18′E

// src/lib/geo.ts
/** "40.90° N · 16.85° E" — decimal degrees, 2 digits, the precision of the source (visual direction §1.4). */
```

**Poi:**
- `npm run check:launch`;
- ui-designer rifà la misura degli incroci dell'orizzonte in Home e Città Digitali;
- io confronto i valori pubblicati con la tabella 1 (chiusura di C11).

## Ipotesi da validare

- `[IPOTESI: i riassunti di WebSearch riportano correttamente i valori dei riquadri di Wikipedia.]` Il controllo incrociato del §2 limita l'eventuale errore alla seconda cifra decimale; la lettura diretta delle pagine lo chiude.
- `[IPOTESI: Wikidata P625 per questi comuni è al primo d'arco, come Wikipedia.]` Per questo i 4 decimali, dopo il lancio, vanno presi da OSM (§4).
- `[DA VERIFICARE: Masseria Santella si trova a Cassano delle Murge.]` È la ragione per cui Cassano sta sull'orizzonte (domanda B9 del verdetto G4, §6). Se il cliente la smentisce, Cassano esce dall'orizzonte.

## Domande aperte

- **Per il cliente.** Nessuna sulle coordinate dei comuni, che sono dati pubblici. Due domande collegate:
  - il comune di ciascun esempio SIII (già nella domanda B9);
  - solo se serviranno coordinate `geo` nei dati strutturati, la posizione della sede sulla scheda Google Business Profile.
- **Per il creative-director.** A 2 decimali la firma in coordinate si accorcia («40.90° N · 16.85° E»). La regola lo prevede già. Resta da aggiornare la DV §1.4 con fonte e valori.

## Decisioni richieste

- **Sessione principale:** applicare la tabella 1 nei file del §6; rigenerare carte e immagine social; adeguare il controllo di go-live.
- **Creative-director:** conferma che il ripiego vale per ogni occorrenza, firma del footer e immagine social comprese; aggiornamento della DV §1.4.
- **ui-designer:** misura degli incroci dell'orizzonte dopo il cambio.
- **Dopo il lancio, facoltativo:** ritorno a 4 decimali da OSM (§4), con una nuova verifica della brand-strategist.
