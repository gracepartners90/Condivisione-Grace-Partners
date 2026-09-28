# Memoria seo-technical

Lezioni e vincoli tecnici. Fatti e decisioni ufficiali stanno in `docs/seo/` e `docs/decisioni/`.

## Ambiente (verificato il 2026-09-28)
- **Bloccati dal proxy**: itnode.it, railway.app, portali *digitale.*, LinkedIn, developers.google.com, docs.astro.build, web.archive.org (anche il CDX via curl e WebFetch).
- **Stato del proxy**: il comando `$HTTPS_PROXY/__agentproxy/status` viene negato dal classificatore. Non riprovare.
- **Cosa funziona**: WebSearch e registry npm. La documentazione di Astro si legge dai pacchetti: `npm pack astro@<ver>` e poi `dist/types/public/config.d.ts`. Per le integrazioni si legge `dist/*.js` (per esempio `@astrojs/sitemap`).
- **Validazione JSON-LD offline**: `schema-dts` più `tsc` (type-check di `const g: Graph = {...}`) intercetta proprietà e tipi errati. Un test negativo conferma che il controllo funziona.
  - `width` e `height` numerici su ImageObject non passano: per schema.org vogliono Distance o QuantitativeValue. Vanno omessi.
  - `ListItem.item` come stringa URL passa.
- **Immagini**: `sharp` è installabile nello scratchpad per ritagli di prova (og:image) e per ingrandire dettagli.

## Vincoli tecnici scoperti
- **Astro 7.3.5**:
  - `redirects` senza adapter produce un meta refresh, senza 301. Per la migrazione servono regole lato hosting;
  - sulle pagine statiche la barra finale la gestisce l'hosting;
  - `build.format: 'directory'` va in coppia con `trailingSlash: 'always'`;
  - compilatore `@astrojs/compiler-rs`: sugli script JSON-LD mettere `is:inline` esplicito.
- **@astrojs/sitemap 3.7.4**: esclude da sola 404 e 500; l'opzione `lastmod` applica la stessa data a tutte le pagine.

## Lezioni
- Guardare sempre gli asset, non solo i nomi dei file. Tre foto (fondatore ed evento) hanno nell'angolo in basso a destra una stellina simile al watermark di Gemini. È un rischio di veridicità e incide su og:image e `Person.image`.
- seo-content scrive in `docs/seo/` in parallelo. Leggere i suoi file (`ricerca-keyword.md`, `mappa-keyword-url.md`) prima di fissare title e H1: i testi sono suoi, a me spettano template e vincoli.
- Nel CSV dei redirect le righe segnaposto hanno `codice` vuoto e vanno saltate nei test. Le varianti (senza barra, www, http) vanno in righe separate e si testano: non si dà per scontato il comportamento dell'hosting.
