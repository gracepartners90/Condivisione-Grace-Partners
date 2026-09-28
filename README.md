# ITNODE · Nuovo sito web

Repository di progetto per il nuovo sito di ITNODE. Il lavoro è svolto da un team di specialisti: subagent di Claude Code definiti in [`.claude/agents/`](.claude/agents/) e coordinati dalla sessione principale di Claude.

> **Stato:** team costruito · in attesa delle linee guida di progetto.

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

## Struttura del repository

```text
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
