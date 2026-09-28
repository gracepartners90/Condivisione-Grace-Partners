# Memoria di progetto: creative-director

Lezioni e preferenze. Le decisioni ufficiali stanno in `docs/creativa/` e `docs/decisioni/`: qui non si duplicano.

## Ambiente e strumenti (lezioni del 2026-09-28)
- **Bloccati** (sia curl sia WebFetch): aprildunford.com, web.archive.org, archive.ph, itnode.it, i portali *digitale.*, railway.app, LinkedIn e molte rassegne di design (nanoglobals, knapsackcreative, sitebuilderreport).
- **Funzionano:** WebSearch (restituisce solo sintesi testuali, mai il layout), il registry npm, Google Fonts.
- **Non interrogare lo stato del proxy** (`/__agentproxy/status`): la richiesta è stata negata. Se una fonte è bloccata, dichiararlo e chiedere screenshot o materiali.
- **Analisi immagini:** installare `sharp` nella scratchpad.
  - L'ordine interno delle operazioni di sharp non segue quello delle chiamate: estrarre i canali dal buffer raw in JS.
  - Per un composite seguito da un resize servono due passaggi.
- **Misure tipografiche:** fontkit fallisce su `getVariation` con i WOFF2. Si misura in Chromium con la libreria Playwright globale (`require(\`${npm root -g}/playwright\`)`), aprendo un file HTML via `file://`: con `setContent` i font locali non si caricano.
- **Test visivi:** schizzi HTML in scratchpad più `npx playwright screenshot` a 1440 e 390 px, osservati con Read. Mostrano problemi che a memoria non si vedono: overflow dei numeri giganti su mobile, ambiguità I/l.

## Insidie scoperte sugli asset e sui font
- **Logo PNG:** completamente opaco, con fondo bianco (non trasparente); la «o» è un anello #3C71A5 con il vuoto spostato in alto a destra.
- **Foto evento:** la sovrimpressione con il simbolo ✦ in basso a destra può essere un segno di editing generativo. Chiedere sempre l'originale.
- **Foto del fondatore:** fondali generati (skyline). Una monocromia pesata sul canale blu li schiarisce; una maschera verso la carta li assorbe.
- **Sottoinsiemi latini @fontsource:** non includono → ↗ ≈ e spesso nemmeno ′ ″. Frecce in SVG, coordinate in gradi decimali.
- **La «I» maiuscola** di Schibsted Grotesk ha le grazie: è il motivo per cui è stato scelto (disambigua «Il SIII»). Con qualunque alternativa, verificare sempre la resa di «Il SIII».

## Lezioni di processo
- **Prima di chiudere un deliverable, rileggere `docs/` per intero.** Altri membri lavorano in parallelo e possono aver registrato regole vincolanti nel frattempo: registro dei claim e decisioni DR nel brief consolidato, vincoli di motion e menu nella sitemap UX, elementi della hero nel copy deck. Il 2026-09-28 la bozza andava contro DR3, A4 e N5 e i vincoli UX, ed è stata riallineata prima della consegna.
- **Istruzioni in conflitto.** Quando un'istruzione della sessione principale confligge con una decisione aperta nel brief (per esempio «usare i ritratti» contro DR3), si danno il parere e le specifiche per entrambe le opzioni e si segnala il conflitto nella consegna.

## Preferenze e feedback del cliente
- Nessun feedback diretto ancora ricevuto sul piano creativo. Aggiornare dopo il gate G2.
