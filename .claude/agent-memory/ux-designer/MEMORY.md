# Memoria di progetto · ux-designer

Lezioni apprese e pattern. Fatti e decisioni ufficiali stanno in `docs/` (soprattutto `docs/ux/`).

## Modo di lavorare in questo team (2026-09-28)
- Il team lavora in parallelo e veloce: prima di scrivere e **prima di consegnare** ricontrolla `git status`, `git log` e i documenti nuovi (copy deck, `docs/cro/`, `docs/seo/`, `docs/creativa/direzione-visiva.md`, `docs/contenuti/microcopy.md`) e il codice in `src/`. La sessione principale committa i deliverable intermedi e applica subito le correzioni al codice: tieni aggiornato lo stato del registro in `accessibilita.md` §3.
- Chi possiede cosa, per non duplicare:
  - testi e microcopy: copy deck e `microcopy.md`;
  - CTA e form: strategia di conversione;
  - URL e H1: specifiche SEO e mappa keyword;
  - scala tipografica e composizioni: direzione visiva.
  
  Nei miei documenti: struttura, ordine, comportamento, accessibilità, con rinvii a quelle fonti.
- Le deleghe esplicite a ux-designer arrivano scritte negli altri documenti: cercale con `grep -rn "ux-designer" docs/`. Esempi: slot vuoti, etichetta del breadcrumb, dettaglio della nuova scheda, conferma sul marquee.

## Tecniche di verifica che funzionano (ambiente cloud)
- Playwright globale 1.56.1, Chromium revisione 1194 in `/opt/pw-browsers`. Per gli script di prova installa nel scratchpad `playwright@1.56.1` e `@axe-core/playwright@4.13.0`.
- `AxeBuilder` vuole pagine create da `browser.newContext()`, non da `browser.newPage()`.
- In axe-core 4.13 la regola `target-size` è disattivata di default: parte solo con `withTags([... 'wcag22aa'])`.
- La regola axe `aria-dialog-name` vale solo per `role="dialog"` esplicito, non per `<dialog>` nativo: controlla con `page.getByRole('dialog', { name: /\S/ })`.
- Header sticky e focus (2.4.11): Chromium centra gli elementi che ricevono il focus fuori schermo, quindi un giro di Tab non mostra il problema. Servono due prove:
  - salto alle ancore;
  - scroll, focus programmatico sul primo elemento visibile, poi Shift+Tab.

  Script collaudato in `accessibilita.md`, Appendice A.
- `tabindex="-1"` fisso su `<main>`: ogni clic nel contenuto sposta lì il punto di partenza del Tab. Lo skip link funziona anche senza.
- Senza `novalidate`, se ci sono campi `required` vuoti il browser non genera `submit`: la validazione personalizzata non parte (verificato).
- Misurare le headline in Chromium con il font reale (`@fontsource-variable/*` da npm) prima di dare numeri sul reflow (Appendice B). Con font diversi i risultati cambiano di molto.
- `pkill -f "<pattern>"` uccide anche la shell che contiene il pattern: usa `cmd & PID=$!` e poi `kill $PID`.

## Pattern approvati o condivisi
- CTA dell'header «Parliamone» → `#richiesta` sulle pagine con form, `/contatti/` altrove (condiviso con cro-specialist).
- Chiusure delle pagine di linea: la CTA delle LG diventa il titolo H3 del form, senza link (cro, copy e direzione visiva d'accordo).
- Menu mobile in `<dialog>` modale (scelta del codice): «Chiudi» dentro il dialog nella posizione di «Menu». Servono il blocco dello scroll via `:has()` e il focus al bersaglio sulle ancore della stessa pagina.
- Marquee legato allo scroll: il criterio 2.2.2 non si applica e non serve la pausa (confermato come owner dell'accessibilità).
- Sezioni che traslano con lo scroll (la timeline del fondatore): ammesse solo senza elementi focalizzabili nella parte che si muove.

## Da tenere d'occhio
- Ordine diverso tra desktop e mobile nelle composizioni della direzione visiva (per esempio le porte dei luoghi): un solo DOM non può seguire due ordini.
- Immagini con il segno di Gemini: alt e didascalie non devono presentare come reali eventi non documentati (brief DR3).
