# Memoria di progetto: cro-specialist

Solo lezioni apprese e note di lavoro. Fatti e decisioni ufficiali stanno in `docs/cro/` e `docs/decisioni/`.

## Lezioni apprese
- 2026-09-28 · Prima di elencare una foto tra le prove di fiducia, controlla da dove viene: ingrandisci gli angoli e guarda i metadati. Nel primo set di asset tre file avevano in basso a destra una stella a quattro punte compatibile con il watermark di Gemini, senza metadati EXIF, XMP o C2PA. Il ritaglio delle derivate la elimina, quindi va controllato l'originale.
- 2026-09-28 · Lo sviluppo parte in parallelo alle specifiche. Prima di scrivere, leggi `src/scripts/` e `src/data/site.ts`, così nomi dei campi, valori e attributi combaciano con il codice. Qui i campi del form sono in italiano (`nome`, `email`, `telefono`, `azienda`, `interesse`, `messaggio`) e i valori in kebab-case.
- 2026-09-28 · Dall'ambiente non si raggiungono garanteprivacy.it, privacy.it, cloudflare.com, itnode.it né i portali. Per le fonti normative serve WebSearch, dichiarando nelle Fonti che la verifica è indiretta. I cookie dei portali vanno verificati da un'altra rete o chiesti al cliente.
- 2026-09-28 · Attenzione ai parametri automatici come `link_url` sui `mailto:`: la bozza email del fallback contiene i dati dell'utente e finirebbe negli eventi.

## Da riprendere
- Quando esiste una build, scrivere i test Playwright del piano di misurazione, §9.
- Dopo il lancio, aprire `docs/cro/backlog-esperimenti.md` usando i feedback di chi gestisce le richieste.
