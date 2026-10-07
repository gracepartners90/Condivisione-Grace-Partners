# ITNODE · Nuovo sito web

Repository di progetto per il nuovo sito di ITNODE. Il lavoro è svolto da un team di specialisti: subagent di Claude Code definiti in [`.claude/agents/`](.claude/agents/) e coordinati dalla sessione principale di Claude.

> **Stato:** G4 approvato con condizioni dal creative-director: build approvata, pubblicazione non ancora ([verdetto](docs/review/2026-09-28-sito-verdetto-g4-creative-director.md)) · condizioni a carico del team (C10–C14) chiuse, salvo la prova dei dati strutturati con gli strumenti di Google (C13), da fare nello staging dell'hosting scelto · restano le condizioni che dipendono dal cliente e dall'utente (C01–C09) · in attesa dell'approvazione dell'utente (G4 e, retroattivamente, G1–G3) · anteprima su Railway aperta a chi ha il link e fuori dai motori di ricerca ([ADR 004](docs/decisioni/004-anteprima-su-railway.md)).

## Il team

| Ruolo | Membro | Focus | Deliverable principali |
|---|---|---|---|
| Creative Director | `creative-director` | Visione creativa e qualità finale | Concept, art direction, verdetti ai gate |
| Brand Strategist | `brand-strategist` | Discovery, posizionamento, messaggi | Brief consolidato, analisi dei concorrenti, audience, piattaforma di marca, architettura dei messaggi e dell'offerta |
| Senior UX/UI Designer | `ux-designer` | UX: architettura dell'informazione, percorsi, accessibilità | Sitemap, content model, user flow, wireframe, requisiti di accessibilità |
| Senior UX/UI Designer | `ui-designer` | UI: linguaggio visivo e design system | Style tile, design system e token, prototipi ad alta fedeltà, review di fedeltà |
| SEO Specialist | `seo-technical` | SEO tecnica e migrazione | Audit tecnico, specifiche SEO, redirect map, dati strutturati, checklist di lancio |
| SEO Specialist | `seo-content` | SEO dei contenuti e local SEO | Ricerca keyword, mappa keyword→URL, brief SEO, local SEO, piano editoriale |
| CRO Specialist | `cro-specialist` | Conversione, misurazione, sperimentazione | Strategia di conversione, piano di misurazione, backlog degli esperimenti |
| Web Performance Specialist | `web-performance-specialist` | Core Web Vitals, architettura front-end, media pesanti | Baseline, budget di performance, architettura, audit |
| Senior Copywriter | `copywriter-brand` | Voce di marca e copy di conversione | Tone of voice, copy deck delle pagine chiave, microcopy |
| Senior Copywriter | `copywriter-content` | Contenuti di approfondimento e SEO copywriting | Pagine di servizio e di settore, case study, FAQ, articoli, eventuale versione inglese |

### Perché due membri per alcuni ruoli
- **Senior UX/UI Designer ×2**: il sito richiede sia un'architettura solida (struttura, percorsi, accessibilità) sia un linguaggio visivo distintivo. Due senior con focus diverso lavorano in parallelo e si rivedono a vicenda.
- **SEO Specialist ×2**: il rifacimento è una migrazione (redirect, indicizzazione, dati strutturati) e insieme una sfida di contenuti e di ricerca locale: sono due mestieri diversi.
- **Senior Copywriter ×2**: la voce di marca e il copy di conversione richiedono una mano diversa dai contenuti di approfondimento ottimizzati per la ricerca.
- **Ruoli singoli** (Creative Director, Brand Strategist, CRO Specialist, Web Performance Specialist): un solo owner garantisce una visione unitaria e decisioni chiare.

## Come lavorare con il team
- **Chiedi il risultato, Claude coordina.** «Prepariamo la strategia di posizionamento»: Claude coinvolge i membri giusti, in parallelo quando possibile.
- **Chiama un membro per nome.** «Chiedi a `seo-technical` di preparare la redirect map.»
- **Review di squadra.** «Fai rivedere al team il wireframe della homepage»: review parallele degli specialisti, poi sintesi e verdetto del Creative Director.
- **Gestione del team.** Il comando `/agents` elenca e modifica i membri; ogni file in `.claude/agents/` è un membro del team.

## Processo in breve
0. **Kickoff**: linee guida, brief consolidato, domande aperte, materiali.
1. **Discovery e strategia**: mercato, concorrenti, audience, sito attuale, obiettivi e KPI, stack. *Gate G1*
2. **Concept e architettura**: idea creativa, sitemap, mappa keyword→URL, tone of voice. *Gate G2*
3. **Design e contenuti**: wireframe, design system, UI, copy. *Gate G3*
4. **Sviluppo**: implementazione con performance, SEO e tracciamento integrati.
5. **QA e pre-lancio**: audit completi e revisione finale. *Gate G4: go-live*
6. **Lancio e ottimizzazione**: migrazione, monitoraggio, esperimenti.

Le regole operative complete (fasi, soglie di qualità, convenzioni, orchestrazione) sono in [CLAUDE.md](CLAUDE.md).

## Il sito

Astro 7, output statico (ADR in [`docs/decisioni/001-stack-tecnologico.md`](docs/decisioni/001-stack-tecnologico.md)). Node 22.12 o successivo.

```bash
npm install
npm run dev       # sviluppo su http://localhost:4321
npm run build     # build statica in dist/
npm run preview   # anteprima della build
npm start         # server della build per Railway (scripts/serve.mjs, porta da PORT)
npm run assets    # rigenera i ritagli e i ritratti da src/assets/images/
npm run brand     # rigenera favicon e logo PNG dal wordmark SVG
npm run maps      # rigenera le carte (Natural Earth) in src/data/maps.json
npm run og        # rigenera l'immagine social public/og/default.jpg
```

Pagine: `/`, `/siii/`, `/puglia-digitale/`, `/citta-digitali/`, `/contatti/`, `/privacy-policy/`, `/cookie-policy/` e la pagina 404.

**Modulo di contatto.** L'indirizzo che riceve le richieste si imposta con la variabile d'ambiente `PUBLIC_FORM_ENDPOINT` al momento della build (POST `multipart/form-data`, risposta 2xx). Finché è vuota, il sito lo dichiara prima dei campi e all'invio prepara un'email già compilata: nessun invio viene simulato.

### Anteprima su Railway

Il repository è pronto per Railway ([ADR 004](docs/decisioni/004-anteprima-su-railway.md)): Railway installa le dipendenze, esegue `npm run build` e avvia `npm start`. Il server (`scripts/serve.mjs`, senza dipendenze) applica `_headers` e `_redirects` come farebbe un altro host, comprime con brotli o gzip e risponde al controllo di salute su `/healthz`.

1. In Railway: **New Project → Deploy from GitHub repo**, scegli questo repository (oppure aggiungi un servizio al progetto esistente).
2. Nel servizio: **Settings → Source → Branch**, scegli il branch da mostrare (oggi `claude/itnode-site-team-build-u58cb9`). A ogni push Railway ricostruisce l'anteprima.
3. **Settings → Networking → Generate Domain** per avere l'indirizzo `….up.railway.app`.

| Variabile | Effetto |
|---|---|
| `PREVIEW_AUTH` | **Obbligatoria per l'anteprima** su Railway (senza, e senza `INDEXING=on`, ogni pagina risponde 503): `utente:password` la protegge; `off` la apre a chiunque abbia il link, sempre fuori dai motori di ricerca. Dal 2026-09-29 l'anteprima è aperta (`off`), per decisione dell'utente del 2026-09-28 (ADR 004) |
| `PUBLIC_SLOT_MODE=publish` | Variante «in pubblicazione» al posto dei segnaposto degli asset |
| `PUBLIC_FORM_ENDPOINT` | Indirizzo che riceve il modulo, quando esiste |
| `INDEXING=on` | Solo in produzione: toglie l'intestazione `X-Robots-Tag: noindex, nofollow`, presente di default |

Le variabili `PUBLIC_*` entrano nella build: dopo averle cambiate serve un nuovo deploy.

Railway ricostruisce l'anteprima solo quando un push cambia i file che entrano nella build (`watchPatterns` in `railway.json`: `src/`, `public/`, `scripts/`, configurazione e dipendenze). I commit di sola documentazione (`docs/`, `.claude/`) non avviano un deploy.

### Asset da fornire

Ogni spazio in attesa di un asset mostra un segnaposto dichiarato con formato e contenuto richiesti. L'elenco completo, con specifiche, è in [`src/data/asset-slots.ts`](src/data/asset-slots.ts); le priorità e la direzione fotografica sono in [`docs/creativa/direzione-visiva.md`](docs/creativa/direzione-visiva.md) §4.6.

Se al go-live alcuni asset mancano ancora, la build con `PUBLIC_SLOT_MODE=publish` sostituisce i segnaposto con la loro variante tipografica «in pubblicazione» (direzione visiva §4.5): stesso formato, nessuna richiesta visibile, zero byte di immagini. `npm run check:launch` elenca queste varianti come informazione, senza bloccare.

| Asset | Formato | Dove |
|---|---|---|
| Schermate delle esperienze SIII: **ricevute il 2026-10-07 e in uso** (desktop 2000 × 1250 px, mobile 1200 × 2000 px). Se possibile, le viste desktop anche a 2560 × 1600 px per gli schermi grandi | 16:10 | Home (capitolo SIII), /siii/ (hero ed esempi) |
| Foto reali di Monopoli, Acquaviva delle Fonti, Gravina in Puglia | Porta 3:5, lato lungo di almeno 2400 px | /puglia-digitale/ (I luoghi) |
| Video di Città Digitali: file sorgente e permesso di ospitarlo, fotogramma di copertina, durata, sottotitoli se c'è parlato | 16:9, poster 1920 × 1080 px | /citta-digitali/ (video) |
| Foto evento Puglia Digitale originale, senza cornice né sovrimpressioni, con luogo, data e autore | originale ad alta risoluzione | Home, /puglia-digitale/ |
| Logo vettoriale ufficiale di ITnode (positivo e negativo) e codici colore; marchi di Puglia Digitale e Città Digitali | SVG | header, footer, favicon, immagine social |
| Un ritratto reale del fondatore, in un luogo vero | 4:5 | facoltativo: sostituisce i ritratti elaborati con AI |

Dati da fornire o confermare: dati societari (REA, capitale sociale, sede legale, PEC), data di aggiornamento dei numeri di Puglia Digitale, testo della Privacy Policy dal consulente, endpoint del modulo, hosting e DNS.

## Struttura del repository

```text
src/
  pages/             le pagine del sito
  components/        ui/ (dispositivi e primitive), sections/, layout/, seo/
  data/              dati del sito, metadati, segnaposto, carte
  lib/, scripts/     dati strutturati, geografia, script del browser
  styles/            token e stili globali
  assets/            immagini del cliente e derivati, wordmark
public/              favicon, logo PNG, immagine social, robots.txt, _headers, _redirects
scripts/             generatori di derivati, favicon, carte e immagine social; controlli SEO e di go-live; server per Railway
.claude/
  agents/            il team: un file per membro
  agent-memory/      memoria di progetto dei membri (feedback e lezioni apprese)
docs/
  brief/             linee guida e brief consolidato
  strategia/         brand-strategist
  creativa/          creative-director
  ux/                ux-designer
  ui/                ui-designer
  contenuti/         copywriter-brand, copywriter-content
  seo/               seo-technical, seo-content
  cro/               cro-specialist
  performance/       web-performance-specialist
  review/            review incrociate e verdetti ai gate
  decisioni/         registro delle decisioni (ADR)
```

Le cartelle vengono create man mano che il team produce i deliverable.
