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
- 2026-09-28 · Per allineare la tassonomia al codice, parti dalla build, non dal grep sui sorgenti. I valori passano anche da prop con default (`CTASection` → `chiusura`, `LocationShowcase` → `luoghi`), e un grep su `location=` conta anche `data-nav-location`. `npx astro build --outDir <scratchpad>` costruisce in circa 2 s senza toccare `dist/` né il working tree; poi basta una regex su `<a|button … data-track>` per l'inventario per pagina.
- 2026-09-28 · Uno script nel repository non è per forza attivo: `immersive.ts` esiste ma nessuna pagina lo importa. Controlla gli import prima di contare un evento come vivo.
- 2026-09-28 · Ricalcola sempre le medie ICE: nella review E5 era scritto 5,3, la media di 5, 4 e 8 è 5,7.
- 2026-09-28 · Rete: bloccati anche docs.railway.com, railway.com, help.brevo.com e i siti dei piccoli servizi di form (simplyforms.app, postto.dev). raw.githubusercontent.com funziona: la documentazione di Scaleway si legge dal repository `scaleway/docs-content`. Cerca sempre un sorgente pubblico su GitHub prima di accontentarti dei risultati di ricerca.
- 2026-09-28 · Endpoint del form: `form.ts` controlla l'honeypot e lo toglie dal payload, quindi al server arriva pieno solo dai POST senza JavaScript. Lato server: quarantena marcata, mai scarto; risposta 2xx anche per la quarantena; nessuna risposta automatica al richiedente, altrimenti l'endpoint diventa un relay di spam.
- 2026-09-28 · RUM senza cookie: per l'EDPB (linee guida 2/2023) anche uno script che fa inviare dati dal dispositivo rientra nell'art. 5(3). L'argomento giusto non è «niente cookie», ma l'assimilazione del Garante (prima parte, ottimizzazione, aggregati), da far confermare al consulente.

## Da riprendere
- Scrivere i test Playwright del piano (§9) nel repository, compresi il test 2 con gli elenchi chiusi, il 6 (RUM) e il 7 (endpoint). Base: gli script della review del 2026-09-28.
- E1: quando il creative-director fissa il momento, preparare le due schermate A e B con Playwright sull'anteprima (sostituendo il testo in pagina), la traccia della sessione e la griglia di codifica con copywriter-brand.
- ADR 006: dopo la scelta dell'utente, passarlo ad «accettata» e provare l'endpoint in staging (requisito 8).
- RUM: se l'utente dice sì, scrivere le dieci condizioni del piano §8.1 nell'ADR sull'analytics con web-performance-specialist.
- Dopo il lancio: registro delle richieste e feedback di chi risponde nel backlog (§7).
