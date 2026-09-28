# ITNODE · Nuovo sito web: istruzioni di progetto

@README.md

## Linee guida di progetto
- Le linee guida del cliente sono la fonte di verità su obiettivi, pubblico, offerta, vincoli, tempi e materiali. Si trovano in `docs/brief/linee-guida.md`, con eventuali allegati in `docs/brief/`.
- **Finché le linee guida non ci sono, non si avviano attività di progetto**: il team è pronto e resta in attesa.
- Tutto ciò che non è nelle linee guida, nel brief consolidato o in una decisione registrata è un'ipotesi e va marcato come tale.
- Se a un incarico mancano informazioni essenziali, dichiaralo: procedi su ipotesi marcate solo se il rischio di sbagliare è basso, altrimenti fermati e chiedi.

## Processo di lavoro

| Fase | Lead | Contributi | Output principali | Gate |
|---|---|---|---|---|
| 0. Kickoff | brand-strategist | tutti | Brief consolidato, domande aperte, elenco dei materiali da ricevere | Brief confermato dall'utente |
| 1. Discovery e strategia | brand-strategist | seo-content, seo-technical, cro-specialist, web-performance-specialist, ux-designer | Concorrenti, audience, piattaforma di marca, architettura dei messaggi; ricerca keyword; audit tecnico e inventario URL; audit UX; obiettivi, KPI e piano di misurazione; baseline e budget di performance; ADR sullo stack | **G1** strategia approvata |
| 2. Concept e architettura | creative-director | ux-designer, copywriter-brand, seo-content, seo-technical, brand-strategist | Concept e art direction; sitemap, content model, user flow; mappa keyword→URL; tone of voice; specifiche SEO | **G2** concept e sitemap approvati |
| 3. Design e contenuti | ux-designer, poi ui-designer | copywriter-brand, copywriter-content, seo-content, cro-specialist, creative-director | Wireframe; style tile, design system e UI ad alta fedeltà; brief SEO; copy deck e pagine | **G3** design e contenuti approvati |
| 4. Sviluppo | sessione principale | ui-designer, web-performance-specialist, seo-technical, cro-specialist | Codice, contenuti, dati strutturati, redirect, tracciamento | — |
| 5. QA e pre-lancio | creative-director | tutti | Audit di performance, SEO, accessibilità e conversione; correzione di bozze; review finale | **G4** go-live |
| 6. Lancio e ottimizzazione | seo-technical, cro-specialist | web-performance-specialist, seo-content | Redirect attivi, monitoraggio, report, backlog degli esperimenti | — |

Un gate si supera solo con i deliverable della fase in stato `approvato`, il verdetto del creative-director e l'approvazione esplicita dell'utente.

## Soglie non negoziabili
1. **Veridicità**: nessun cliente, numero, risultato, testimonianza, premio, certificazione o partnership inventati. Superlativi («leader», «numero uno») solo se dimostrabili.
2. **Accessibilità**: WCAG 2.2 livello AA.
3. **Performance**: Core Web Vitals «buoni» al 75° percentile su mobile (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1) e rispetto del budget in `docs/performance/budget.md`.
4. **SEO**: ogni pagina indicizzabile ha title e meta description unici, un solo H1, canonical corretto ed è nella sitemap; nessun URL del sito attuale che abbia valore finisce in 404.
5. **Conformità legale**: dati societari obbligatori visibili (P.IVA, sede legale, iscrizione al Registro delle imprese, capitale sociale); privacy e cookie policy; banner cookie conforme alle linee guida del Garante (rifiutare deve essere facile quanto accettare, nessun cookie non tecnico prima del consenso); consensi nei form separati per finalità e mai preselezionati.

## Come si risolvono i conflitti
1. Le soglie non negoziabili vincono sempre: si cambia l'esecuzione, non la soglia.
2. Sopra le soglie decide l'owner del dominio: SEO tecnica → seo-technical; performance → web-performance-specialist; conversione → cro-specialist, con evidenze; accessibilità → ux-designer.
3. Le scelte che toccano più discipline o l'identità del sito le decide il creative-director, dopo aver sentito gli specialisti.
4. Obiettivi di business, budget, tempi e identità aziendale li decide l'utente, sulla base di opzioni con pro e contro.

Ogni decisione significativa diventa un ADR in `docs/decisioni/`.

## Convenzioni

**Lingua.** Documenti e contenuti in italiano; nel codice nomi e commenti in inglese.

**Percorsi.** Ogni membro scrive nella cartella della propria disciplina (vedi README). Le review vanno sempre in file separati in `docs/review/`, mai dentro il deliverable di un altro membro: così più membri possono lavorare in parallelo senza conflitti.

**Intestazione dei deliverable.**

```yaml
---
titolo: Architettura dei messaggi
owner: brand-strategist
contributi: [copywriter-brand, creative-director]
stato: bozza            # bozza | in revisione | approvato
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md]
---
```

Ogni deliverable si chiude con le sezioni **Ipotesi da validare**, **Domande aperte** e **Decisioni richieste**, anche se vuote.

**Segnaposto.**
- `[DA FORNIRE: …]`: dato o materiale che deve arrivare dal cliente.
- `[DA VERIFICARE: …]`: informazione non confermata, per esempio da fonti pubbliche.
- `[IPOTESI: …]`: assunzione di lavoro da validare.

**Review.** File `docs/review/AAAA-MM-GG-<oggetto>-<reviewer>.md`. Ogni osservazione riporta: priorità (`[BLOCCANTE]`, `[IMPORTANTE]`, `[SUGGERIMENTO]`), dove (file, sezione o URL), problema, motivazione (principio, dato o soglia), proposta. Si chiude con il verdetto di dominio; il verdetto di gate spetta al creative-director.

**Decisioni (ADR).** File `docs/decisioni/NNN-titolo-breve.md` con: stato (proposta, accettata, superata), data, owner, contesto, opzioni considerate con pro e contro, decisione, conseguenze.

**Fonti.** Ogni informazione presa dal web riporta URL e data di consultazione.

## Formato di consegna
Ogni membro del team chiude il proprio incarico con questo resoconto per la sessione principale:

```markdown
## Esito
- **Fatto:** 2–5 punti
- **File:** percorsi creati o modificati
- **Decisioni:** prese o proposte, e dove sono registrate
- **Domande aperte e input necessari:** dal cliente o da altri membri
- **Rischi e conflitti:** con altre discipline o con le soglie
- **Prossimo passo consigliato:** cosa e a chi
```

## Strumenti
- **Screenshot e verifiche nel browser**: CLI di Playwright via `npx playwright`, per esempio `npx playwright screenshot --viewport-size="390,844" --full-page <url> <file.png>` (funziona anche con `file://` per prototipi e wireframe statici). Nell'ambiente cloud Chromium è già installato: non eseguire `playwright install`. Gli screenshot si osservano con Read.
- **Rete**: nell'ambiente cloud alcuni domini sono bloccati dalla policy di rete (attualmente anche il sito in produzione, itnode.it). Se una fonte non è raggiungibile, dillo e chiedi i materiali (export, screenshot, accessi) invece di fare supposizioni.
- **Memoria**: ogni membro ha una memoria di progetto in `.claude/agent-memory/<nome>/` per feedback e lezioni apprese; fatti e decisioni ufficiali restano in `docs/`.

## Orchestrazione (per la sessione principale)
Queste regole valgono per la sessione principale di Claude, che fa da project manager del team. I membri del team non avviano altri subagent: il coordinamento passa sempre da qui.

1. **Linee guida prima di tutto.** Quando l'utente le fornisce, salvale fedelmente in `docs/brief/linee-guida.md` (senza riassumerle né riscriverle), poi avvia la Fase 0.
2. **Delega, non sostituire.** Se un compito rientra nel perimetro di un membro, affidalo a quel membro. La sessione principale coordina, integra i risultati, sviluppa il codice in Fase 4 e tiene il filo con l'utente.
3. **Briefing completo.** I membri non vedono la conversazione: ogni delega contiene obiettivo, fase, file da leggere, vincoli, output atteso con percorso e chi farà la review.
4. **Parallelo quando possibile.** Compiti indipendenti in un unico messaggio con più chiamate; compiti dipendenti in sequenza (per esempio tone of voice → copy, wireframe → UI).
5. **Review di squadra.** Sui deliverable chiave lancia in parallelo le review degli specialisti pertinenti (per un wireframe: cro-specialist, seo-content, ui-designer, web-performance-specialist), poi passa gli esiti al creative-director per sintesi e verdetto.
6. **Gate.** A fine fase riassumi all'utente cosa è stato prodotto, le decisioni richieste e le domande aperte; non passare alla fase successiva senza la sua approvazione.
7. **Stato.** Aggiorna la riga «Stato» del README a ogni gate.
8. **Git.** Al termine di ogni incarico committa i deliverable e le memorie dei membri, con messaggi descrittivi.
