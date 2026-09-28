# Memoria di progetto: cro-specialist

Solo lezioni apprese e note di lavoro. Fatti e decisioni ufficiali stanno in `docs/cro/` e `docs/decisioni/`.

## Lezioni apprese
- 2026-09-28 · Prima di elencare una foto tra le prove di fiducia, controlla da dove viene: ingrandisci gli angoli e guarda i metadati. Nel primo set di asset tre file avevano in basso a destra una stella a quattro punte compatibile con il watermark di Gemini, senza metadati EXIF, XMP o C2PA. Il ritaglio delle derivate la elimina, quindi va controllato l'originale.
- 2026-09-28 · Lo sviluppo parte in parallelo alle specifiche. Prima di scrivere, leggi `src/scripts/` e `src/data/site.ts`, così nomi dei campi, valori e attributi combaciano con il codice. Qui i campi del form sono in italiano (`nome`, `email`, `telefono`, `azienda`, `interesse`, `messaggio`) e i valori in kebab-case.
- 2026-09-28 · Dall'ambiente non si raggiungono garanteprivacy.it, privacy.it, cloudflare.com, itnode.it né i portali. Per le fonti normative serve WebSearch, dichiarando nelle Fonti che la verifica è indiretta. I cookie dei portali vanno verificati da un'altra rete o chiesti al cliente.
- 2026-09-28 · Attenzione ai parametri automatici come `link_url` sui `mailto:`: la bozza email del fallback contiene i dati dell'utente e finirebbe negli eventi.
- 2026-09-28 · Un IntersectionObserver con soglia 0,5 non scatta mai se l'elemento è alto più del doppio dello schermo. Il form (circa 1.300 px) non generava `form_view` a 375×600 e 360×640. Per gli eventi di visibilità, misura l'altezza dell'elemento e prova sempre anche schermi bassi.
- 2026-09-28 · Nella ricerca dei segnaposto non basta `[DA …`: gli slot di `Media.astro` mostrano «Asset richiesto · …» con `aria-hidden`. Sfuggono ai controlli di accessibilità, ma si vedono. Cerca il testo reale dello slot.
- 2026-09-28 · Il rendering condizionale di dati obbligatori («si mostra solo se valorizzato», come REA e capitale sociale) fa passare la build senza alcun segnale. Proponi sempre un controllo pre-deploy che fallisce.
- 2026-09-28 · Tecniche di verifica che funzionano: (1) un listener `click` in cattura su `window` con `preventDefault` permette di cliccare ogni `[data-track]` e leggere il payload senza navigare. (2) Per provare successo ed errori senza endpoint, riscrivi l'HTML con `page.route` (valorizzando `data-endpoint`, senza gli header `content-length` e `content-encoding`) e rispondi all'endpoint con `access-control-allow-origin: *`. (3) Compila il form con dati riconoscibili (prefisso `zz`) e cercali nel dataLayer serializzato.
- 2026-09-28 · Gli script di verifica nello scratchpad si perdono a fine sessione: i test del piano §9 vanno portati nel repository.

## Da riprendere
- Dopo le correzioni della sessione principale (review del 2026-09-28, oss. 4–6): portare il piano di misurazione alla v0.2. Tassonomia allineata al codice, nuova definizione di `form_view`, via `preview_start`.
- Scrivere i test Playwright del piano (§9) nel repository. Base: gli script della review del 2026-09-28.
- Dopo il lancio: aprire `docs/cro/backlog-esperimenti.md` partendo da E1–E5 della review e dai feedback di chi gestisce le richieste.
