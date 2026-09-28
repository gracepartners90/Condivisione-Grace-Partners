---
titolo: "ADR 005 · Preload del carattere principale (Schibsted Grotesk)"
owner: creative-director
contributi: [web-performance-specialist]
stato: accettata
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/review/2026-09-28-sito-rimisura-performance-web-performance-specialist.md, docs/performance/budget.md, docs/performance/architettura.md, docs/creativa/direzione-visiva.md, misure del creative-director del 2026-09-28 (Playwright 1.56, Chromium 141, server scripts/serve.mjs con Brotli, build dist/ delle 12:59)]
---

# ADR 005 · Preload del carattere principale

| Campo | Valore |
|---|---|
| Stato | **Accettata** (decisione del creative-director al gate G4, sentito web-performance-specialist). Reversibile con i dati di campo. |
| Data | 2026-09-28 |
| Owner | creative-director; web-performance-specialist per le misure e il budget |

## Contesto

- **Il carattere è l'identità del sito.** La hero della Home non ha immagini: l'H1 «La tecnologia cambia.» (115 px su desktop, 52 px su mobile) è insieme il visual e l'elemento LCP. La «I» con le grazie di Schibsted Grotesk distingue «SIII» (direzione visiva §3.1).
- **La decisione del budget.** In Fase 5 si confrontano le varianti con e senza preload e si tiene quella con l'LCP migliore (`budget.md` §3). Il preload tocca l'identità, quindi web-performance-specialist ha chiesto l'assenso del creative-director (rimisura, §4.3 e osservazione 1).
- **Le misure di web-performance-specialist** (Lighthouse 13.5, stessa build, corse alternate):
  - senza preload l'LCP con throttling applicato migliora di 151 ms sulla Home e di 177 ms su `/siii/`; con il simulato è pari sulla Home e migliora di 145 ms su `/siii/`;
  - senza preload l'FCP simulato della Home è 1,51 s, 0,01 s sopra l'obiettivo di 1,5 s (effetto del modello Lantern, spiegato nella rimisura §4.2);
  - con il preload, sulla prima pagina e con rete lenta, il carattere di ripiego resta visibile 0,42 s (mediana); senza, 0,82 s;
  - il CLS resta 0–0,002 in entrambi i casi, grazie al ripiego con metriche corrette.
  - Con o senza preload, tempi e pesi restano dentro soglie e obiettivi: LCP applicato 0,86–1,04 s contro una soglia di 2,5 s.
- **Il meccanismo** (rimisura §4.2, sorgente di Chromium): un preload di font nel `<head>` rende il font «bloccante per il rendering». Il primo rendering attende il font per al massimo 100 ms dall'inserimento del `<body>`, oppure 1,5 s dall'avvio della navigazione. Senza preload, il font si richiede solo al primo layout.

## Misure aggiuntive del creative-director

La rimisura valuta il costo per l'identità solo su rete lenta. Ho misurato anche le connessioni veloci, dove si concentra il pubblico desktop (titolari di PMI ed enti, spesso in ufficio).

- **Metodo.**
  - `dist/` delle 12:59 servito da `scripts/serve.mjs` (Brotli), cache disattivata.
  - La variante senza preload toglie la riga del `<link rel="preload">` dall'HTML intercettato; nient'altro cambia.
  - Rete emulata via CDP. Momento dell'arrivo del carattere dall'evento `loadingdone` di `document.fonts`.
  - 5 caricamenti per variante e profilo, alternati.
  - «Ripiego visibile» = tempo tra il primo paint (FCP) e l'arrivo di Schibsted.
- **Risultati** (mediane; Home e `/siii/`):

  | Profilo | Con preload: FCP · ripiego visibile | Senza preload: FCP · ripiego visibile | Ripiego al primo paint (con / senza) |
  |---|---|---|---|
  | Fibra, desktop 1440 px (10 ms, 50 Mbit/s, CPU 1x) | 136 · **0 ms** / 120 · **0 ms** | 144 · 16 ms / 112 · 27 ms | **0/5** / 5/5 |
  | 4G veloce, 412 px (40 ms, 9 Mbit/s, CPU 2x) | 252 · 13 ms / 228 · 32 ms | 72 · 183 ms / 156 · 158 ms | 5/5 / 5/5 |
  | 4G lento, 412 px (150 ms, 1,6 Mbit/s, CPU 4x) | 616 · 184 ms / 580 · 234 ms | 336 · 694 ms / 360 · 626 ms | 5/5 / 5/5 |

- **Lettura.**
  - Su connessione veloce il preload elimina lo scambio di carattere: il titolo compare subito in Schibsted. Senza preload, in 5 caricamenti su 5 il titolo compare in Arial e cambia forma dopo 1–2 fotogrammi.
  - Su 4G il preload riduce la finestra del ripiego da 160–180 ms a 13–32 ms (veloce) e da 630–690 ms a 180–230 ms (lento), al costo di un primo paint più tardi di 100–280 ms.
  - I valori assoluti di questa emulazione non sono confrontabili con Lighthouse: conta il confronto tra le due varianti nelle stesse condizioni.

## Opzioni considerate

| Opzione | Pro | Contro |
|---|---|---|
| **A. Togliere il preload** (proposta di web-performance-specialist) | LCP migliore di 145–177 ms con rete lenta; un `<link>` in meno | Lo scambio di carattere si vede su ogni prima visita, anche con la fibra; con 4G il titolo resta nel carattere di ripiego 3–6 volte più a lungo; FCP simulato della Home 0,01 s sopra l'obiettivo |
| **B. Tenere il preload** (scelta) | Nessuno scambio visibile su connessione veloce; finestra del ripiego ridotta a un terzo su 4G; è la configurazione della direzione visiva (§3.2) e del design system; tutti gli obiettivi del budget rispettati | Primo paint più tardi di 100–280 ms su rete mobile, sempre con ampio margine sulla soglia di 2,5 s |

## Decisione

**Si tiene il preload di Schibsted Grotesk.** Fragment Mono resta senza preload.

- **Perché.**
  - Sopra le soglie, e con margini ampi in entrambe le varianti, prevale l'identità: la tipografia è il visual della hero. Uno scambio di forma dei glifi a 115 px è il primo gesto che il sito compie davanti a chi arriva.
  - Il guadagno di LCP (circa 150 ms in laboratorio) non cambia la classe di nessuna metrica.
- **Quando si riapre.** La decisione torna a web-performance-specialist, che può togliere il preload senza nuovo assenso, se accade una di queste cose:
  - i dati di campo (RUM `web-vitals` o CrUX), una volta disponibili, mostrano un LCP mobile al 75° percentile sopra 2,0 s;
  - una nuova versione di Chromium cambia il comportamento dei font in preload in modo misurabile;
  - la hero smette di essere tipografica, per esempio con un panorama reale (direzione visiva §5, «Evoluzione»).

## Conseguenze

- **Codice.** Nessuna modifica: `BaseLayout.astro` ha già il preload (riga 42).
- **Documenti da riallineare** (li aggiorna web-performance-specialist, owner):
  - `docs/performance/budget.md`: §3 («Nessun preload dei font»), controllo n. 7 (torna a «un solo preload per pagina, Schibsted») e riga FCP del §2;
  - `docs/performance/architettura.md`: regola 4, §2, §12 e i passaggi che danno per tolto il preload.
- **Nessun cambio** a `docs/ui/design-system.md` (tabella dei font: già «preload») né alla direzione visiva (§3.2, aggiornata solo con il rimando a questo ADR).
- La baseline di laboratorio del `budget.md` §7.1 è già misurata con il preload: resta valida.

## Ipotesi da validare

- [IPOTESI: sul campo, con dispositivi reali, il comportamento è quello misurato in laboratorio con Chromium. Su Safari per iOS l'effetto del preload non è misurato.]
- [IPOTESI: la maggioranza delle visite da desktop avviene su connessioni veloci, dove il preload elimina lo scambio di carattere.]

## Domande aperte

- Nessuna. Il RUM `web-vitals` senza cookie, dopo il lancio, è già una domanda aperta di web-performance-specialist e cro-specialist: servirebbe anche a verificare questa decisione.

## Decisioni richieste

- Nessuna all'utente. È una decisione di arbitrato del creative-director (CLAUDE.md, «Come si risolvono i conflitti», punto 3).
