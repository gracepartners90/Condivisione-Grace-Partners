---
titolo: "ADR 004 · Anteprima del sito su Railway"
owner: sessione principale
contributi: [web-performance-specialist, seo-technical, brand-strategist]
stato: accettata
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/decisioni/001-stack-tecnologico.md, public/_headers, public/_redirects]
---

# ADR 004 · Anteprima del sito su Railway

| | |
|---|---|
| Stato | **Accettata** per l'anteprima (decisione dell'utente del 2026-09-28). L'hosting di produzione resta aperto: ADR 001 §3.6. |
| Data | 2026-09-28 |
| Owner | Sessione principale; web-performance-specialist per cache e compressione; seo-technical per l'indicizzazione |

## Contesto
- L'utente vuole vedere il sito online, su Railway, prima del verdetto di go-live (G4).
- Il cliente usa già Railway: lì c'è anche il file del video di Città Digitali (ADR 001, «Hosting attuale»).
- Dall'ambiente di lavoro Railway non è raggiungibile (policy di rete) e non c'è un token: il deploy non si può lanciare da qui.
- Il sito dichiara le sue regole di hosting in `_headers` e `_redirects`, un formato che Railway non legge.
- L'anteprima contiene testi e dati ancora da confermare (ADR 002) e segnaposto degli asset: non deve finire nei motori di ricerca.

## Opzioni considerate

| Opzione | Pro | Contro |
|---|---|---|
| **A. Railway collegato al repository GitHub** (scelta) | Nessun token nell'ambiente di lavoro; nuovo deploy a ogni push sul branch; stesso account del cliente | La configurazione iniziale del servizio la fa l'utente (tre passi, README); origine in una sola regione |
| B. Railway da riga di comando, da questa sessione | Deploy controllato da qui | Railway bloccato dalla policy di rete; servirebbe un token, visibile solo in una nuova sessione |
| C. Anteprima su un altro host (ADR 001, opzioni A e B) | `_headers` e `_redirects` nativi, CDN | Non è la piattaforma indicata dall'utente |

Per il server su Railway:

| Opzione | Pro | Contro |
|---|---|---|
| **Server Node senza dipendenze** (scelto, `scripts/serve.mjs`) | Applica gli stessi `_headers` e `_redirects` di ogni host; brotli e gzip calcolati all'avvio; ETag e 304; `noindex` e password configurabili; nessuna dipendenza da mantenere | Codice nostro, da tenere allineato se cambiano le regole |
| `astro preview` | Già disponibile | Non pensato per la produzione; non applica `_headers` né `_redirects` |
| Caddy o nginx in un container | Server maturi | Configurazione da duplicare in un altro formato; ADR 001 nota che brotli richiede file precompressi |

## Decisione
- Anteprima su Railway con il repository collegato: build `npm run build`, avvio `npm start`, controllo di salute su `/healthz` (`railway.json`); Node 22 (`.node-version`).
- Il server applica `_headers` e `_redirects`, gestisce la barra finale (`trailingSlash: 'always'`) e serve `404.html` con stato 404.
- Anteprima fuori dai motori di ricerca: `X-Robots-Tag: noindex, nofollow` di default, tolto solo con `INDEXING=on`.
- Accesso protetto da password con `PREVIEW_AUTH=utente:password`. Su Railway l'anteprima senza password non si apre (503): è la prima condizione del brand-strategist per lo staging (review di veridicità §4, «non indicizzabile e con accesso protetto»). In locale il server resta aperto, perché è anche il server di misura della performance (`budget.md` §6).

## Conseguenze
- Le istruzioni per l'utente sono nel README, sezione «Anteprima su Railway».
- Se la produzione andrà su Railway: dominio personalizzato, `INDEXING=on`, e una verifica del TTFB fuori dall'Italia da parte di web-performance-specialist (origine in una sola regione, ADR 001). Se andrà altrove, il server resta solo per le anteprime.
- Il video di Città Digitali resta su un host esterno (ADR 001, punto 7): condizione di go-live invariata.
- web-performance-specialist ha confermato cache, compressione e tempi del server (rimisura del 2026-09-28, §9); il supporto alle richieste `Range` per il video è stato aggiunto (osservazione 6). Resta la conferma di seo-technical sulla politica di indicizzazione dell'anteprima.

## Ipotesi da validare
- Railway costruisce il progetto con le impostazioni di `railway.json` e `.node-version` senza configurazioni aggiuntive nel pannello [DA VERIFICARE al primo deploy].

## Domande aperte
- Il servizio va nel progetto Railway del sito attuale o in un progetto nuovo? Decide l'utente.

## Decisioni richieste
- Utente: hosting di produzione (ADR 001 §3.6).
