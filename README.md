# ITNODE · Nuovo sito web

Repository di progetto per il nuovo sito di ITNODE. Il lavoro è svolto da un team di specialisti: subagent di Claude Code definiti in [`.claude/agents/`](.claude/agents/) e coordinati dalla sessione principale di Claude.

> **Stato:** sito costruito secondo il metodo delle linee guida (fasi 1–5) · review finale del team in corso · gate G1–G4 in attesa dell'approvazione del cliente · mancano gli asset e i dati elencati sotto.

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
npm run assets    # rigenera i ritagli e i ritratti da src/assets/images/
npm run brand     # rigenera favicon e logo PNG dal wordmark SVG
npm run maps      # rigenera le carte (Natural Earth) in src/data/maps.json
npm run og        # rigenera l'immagine social public/og/default.jpg
```

Pagine: `/`, `/siii/`, `/puglia-digitale/`, `/citta-digitali/`, `/contatti/`, `/privacy-policy/`, `/cookie-policy/` e la pagina 404.

**Modulo di contatto.** L'indirizzo che riceve le richieste si imposta con la variabile d'ambiente `PUBLIC_FORM_ENDPOINT` al momento della build (POST `multipart/form-data`, risposta 2xx). Finché è vuota, il sito lo dichiara prima dei campi e all'invio prepara un'email già compilata: nessun invio viene simulato.

### Asset da fornire

Ogni spazio in attesa di un asset mostra un segnaposto dichiarato con formato e contenuto richiesti. L'elenco completo, con specifiche, è in [`src/data/asset-slots.ts`](src/data/asset-slots.ts); le priorità e la direzione fotografica sono in [`docs/creativa/direzione-visiva.md`](docs/creativa/direzione-visiva.md) §4.6.

Se al go-live alcuni asset mancano ancora, la build con `PUBLIC_SLOT_MODE=publish` sostituisce i segnaposto con la loro variante tipografica «in pubblicazione» (direzione visiva §4.5): stesso formato, nessuna richiesta visibile, zero byte di immagini. `npm run check:launch` elenca queste varianti come informazione, senza bloccare.

| Asset | Formato | Dove |
|---|---|---|
| Schermate delle esperienze SIII: Masseria Santella, Maison Miminà, D.L. Natura Dentro | 16:10, almeno 2560 × 1600 px, più la vista mobile | Home (capitolo SIII), /siii/ (esempi) |
| Un'esperienza SIII vista da smartphone | 3:5, almeno 1200 × 2000 px | /siii/ (hero) |
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
scripts/             generatori di derivati, favicon, carte e immagine social
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
