# Memoria di progetto · ux-designer

Lezioni apprese e pattern. Fatti e decisioni ufficiali stanno in `docs/` (soprattutto `docs/ux/`).

## Modo di lavorare in questo team (2026-09-28)
- Il team lavora in parallelo e veloce: prima di scrivere e **prima di consegnare** ricontrolla `git status`, `git log` e i documenti nuovi (copy deck, `docs/cro/`, `docs/seo/`, `docs/creativa/direzione-visiva.md`, `docs/contenuti/microcopy.md`) e il codice in `src/`. La sessione principale committa i deliverable intermedi e applica subito le correzioni al codice: tieni aggiornato lo stato del registro in `accessibilita.md` §3 e §4.4.
- **Review parallele sugli stessi file.** Controlla `docs/review/` anche a metà lavoro, compresi i file non tracciati. Esempio: la verifica UI (V1–V17) si sovrapponeva alla mia (V7 = S3, V16 = S1). Rinvia alla proposta dell'owner del dominio invece di duplicarla, e rispondi alle domande che ti fanno lì.
- Chi possiede cosa, per non duplicare:
  - testi e microcopy: copy deck e `microcopy.md`;
  - CTA e form: strategia di conversione;
  - URL e H1: specifiche SEO e mappa keyword;
  - scala tipografica e composizioni: direzione visiva e design system.

  Nei miei documenti: struttura, ordine, comportamento, accessibilità, con rinvii a quelle fonti.
- Le deleghe esplicite a ux-designer arrivano scritte negli altri documenti: cercale con `grep -rn "ux-designer" docs/`. Esempi: slot vuoti, etichetta del breadcrumb, dettaglio della nuova scheda, conferma sul marquee.
- Non modifico `src/`, `public/`, `scripts/`: propongo snippet provati in pagina. Per provare una correzione JS senza toccare il codice, modifico al volo il bundle servito con `page.route` (cerca lo snippet minificato in `dist/_astro/`).

## Tecniche di verifica che funzionano (ambiente cloud)
- Playwright globale 1.56.1 (`createRequire('/opt/node22/lib/node_modules/')`), Chromium revisione 1194 in `/opt/pw-browsers`; axe-core 4.13 si inietta con `addScriptTag` dal file `axe.min.js`. In alternativa, installa nello scratchpad `playwright@1.56.1` e `@axe-core/playwright@4.13.0`.
- `AxeBuilder` vuole pagine create da `browser.newContext()`, non da `browser.newPage()`.
- In axe-core 4.13 la regola `target-size` è disattivata di default: parte solo con `withTags([... 'wcag22aa'])`.
- La regola axe `aria-dialog-name` vale solo per `role="dialog"` esplicito, non per `<dialog>` nativo: controlla con `page.getByRole('dialog', { name: /\S/ })`.
- `<dialog>` modale nativo: dopo l'ultimo elemento il Tab passa per l'interfaccia del browser (`activeElement` = body) e poi torna nel dialog. Non è una fuga: controlla che non arrivi mai alla pagina dietro.
- Header sticky e focus (2.4.11): Chromium centra gli elementi che ricevono il focus fuori schermo, quindi un giro di Tab non mostra il problema. Servono due prove:
  - salto alle ancore;
  - scroll, focus programmatico sul primo elemento visibile, poi Shift+Tab.

  Script collaudato in `accessibilita.md`, Appendice A.
- `tabindex="-1"` fisso su `<main>`: ogni clic nel contenuto sposta lì il punto di partenza del Tab. Lo skip link funziona anche senza.
- Senza `novalidate`, se ci sono campi `required` vuoti il browser non genera `submit`: la validazione personalizzata non parte (verificato).
- Misurare le headline in Chromium con il font reale (`@fontsource-variable/*` da npm) prima di dare numeri sul reflow (Appendice B). Con font diversi i risultati cambiano di molto.
- `pkill -f "<pattern>"` uccide anche la shell che contiene il pattern: usa `cmd & PID=$!` e poi `kill $PID`.
- In Bash `cd X && (A) & (B) & wait` manda in background anche il `cd`: `B` e i comandi successivi girano nella cartella di partenza. Negli script paralleli usa sempre percorsi assoluti.
- **QA del sito costruito.**
  - **Correzioni applicate ≠ correzioni efficaci.** Con Astro ogni selettore composto riceve un attributo `[data-astro-cid]`, quindi una regola come `.contact [aria-invalid]` perde contro `.contact input:is(...)`. Due correzioni applicate (bordo d'errore, casella da 24 px) non avevano effetto. Verifica sempre gli stili calcolati, mai il sorgente. Nelle prove con CSS iniettato serve `!important`.
  - **Movimento attivo e ridotto danno layout diversi:** con il movimento le righe del text reveal sono `inline-block`. Ogni controllo tipografico va fatto nei due modi, e con il movimento dopo aver fatto scorrere tutta la pagina.
  - `overflow-wrap: break-word` non riduce la larghezza minima di un `inline-block`: serve `anywhere`.
  - Una rete di sicurezza `overflow-wrap` può spezzare parole anche nel layout normale, quando la colonna è più stretta della parola. Dopo averla aggiunta, controlla le parole spezzate da 320 a 2560 px nei due modi di movimento (`midWordBreaks()`, `accessibilita.md` Appendice C).
  - «Nessuno scorrimento orizzontale» non vede il testo tagliato da `overflow: clip/hidden`. Serve `clipped()` v2 (Appendice C): intersezione di tutti i contenitori che ritagliano, testo trasparente escluso, con e senza le spaziature di 1.4.12.
  - Giro di Tab per la geometria: sempre con `reducedMotion: 'reduce'`. Con il movimento lo scroll fluido (`html { scroll-behavior: smooth }`) vale anche per il focus e l'elemento entra in vista 0,5–0,8 s dopo il Tab. Per riconoscere la fine del giro, marca gli elementi visitati (`data-*`).
  - Testo visibile ma `aria-hidden`: confrontalo con l'albero di accessibilità della pagina (`locator('body').ariaSnapshot()`). Se è un duplicato va bene; se è un'informazione unica è un problema di 1.3.1.
  - `tap` di Playwright con scroll fluido: dopo uno spostamento del focus il secondo tocco impiega circa 2 s (controlli di azionabilità), ma non è un problema per gli utenti. Per tocchi ripetuti usa `reducedMotion: 'reduce'` o `page.touchscreen.tap` alle coordinate.
  - Le caselle hanno sempre un `value`: `value !== ''` non indica un'interazione (errore prematuro, O1).
  - Prova di 1.4.13: hover sul nodo, poi puntatore sulla didascalia; focus sul nodo, poi Esc.
  - **Albero di accessibilità vero:** per nomi e figure usa CDP (`Accessibility.getFullAXTree`); in CDP il ruolo è `image`. Un `<svg>` dentro un `role="img"` compare come immagine vuota: va `aria-hidden`. In Chromium 141 la figura non prende il nome dalla `<figcaption>` (fonti del nome: solo aria-labelledby, aria-label, title), che resta contenuto.
  - **CDP non è la piattaforma.** Sotto un `role="img"` CDP mostra ancora i testi figli come StaticText non ignorati, ma Chromium espone l'immagine come foglia alle API di accessibilità (`AXNode::IsLeaf`, figli solo presentazionali). Anche `ariaSnapshot` di Playwright elenca i testi figli dopo il nome (`'img "…"': Altamura …`): non è una prova di foglia. Per non dipendere dal browser: testi disegnati `aria-hidden` (verificato il 2026-10-05, dopo un errore nella review della pagina §3.5).
  - **Mai citare uno snapshot troncato** (`slice(0, 200)`): avevo letto una riga tagliata e concluso «nessun figlio». Stampa per intero la riga dell'elemento che conta.
  - **Confronti di pixel tra staging e copia:** prima controlla che partano dallo stesso commit. Un cambio più in alto nella pagina (O4 nella hero) sposta la carta di frazioni di pixel e l'elemento risulta «diverso». Confronta con una build di base della stessa copia (`git stash`, `astro build --outDir dist-base`, `git stash pop`).
  - **Colori forzati (emulati):** `newContext({ forcedColors: 'active', colorScheme: 'dark' | 'light' })` dà la palette scura o chiara. Gli sfondi diventano `Canvas` (alpha conservato), le ombre spariscono, bordi, contorni e testo prendono i colori di sistema; un contorno trasparente diventa visibile. `getComputedStyle` restituisce i colori forzati: un segno sparisce se il suo `backgroundColor` è uguale a quello del `body`. Script in `accessibilita.md` Appendice D.
  - **Colori forzati, casi che il controllo dei colori di fondo non vede:** i gradienti spariscono (`background-image` diventa `none`, uno per strato) e i contorni trasparenti vengono dipinti, quindi un anello nascosto a riposo resta sempre acceso. Usa anche l'Appendice D.2 (di ui-designer).
  - **La 404 con un server statico:** `python3 -m http.server` risponde a `/pagina-inesistente/` con la sua pagina d'errore, non con quella del sito. Usa `/404.html`, che funziona con ogni server: l'avevo saltata nel primo controllo dei colori forzati.
  - **Processi in background nella stessa chiamata:** con `cmd &` senza `wait` vengono chiusi quando la shell finisce, e l'output resta a metà. Usa `cmd & P=$!; …; wait $P`.
  - **Contorni con transizione:** subito dopo il Tab `outline-width` può valere ancora 0. Aspetta circa 350 ms prima di leggerlo, altrimenti campi e pulsanti risultano senza focus per errore.
  - **Test con elementi iniettati:** dagli un attributo unico (`data-test`); se condividono la classe con quelli veri, `.last()` e simili selezionano l'elemento sbagliato.
  - **Ordine di un link aggiunto accanto a contenuti posizionati in assoluto** (città per latitudine da 1280 px): confronta ordine del DOM e ordine visivo a ogni larghezza. La colonna di testo è il posto sicuro.
  - **Movimento legato allo scorrimento:** misura la traslazione per pixel di scorrimento, campionando `transform` dopo `scrollTo({ behavior: 'instant' })` e due `requestAnimationFrame`. Con `scrollTo` normale lo scroll fluido resta indietro e falsa totali e fine. La velocità dipende dalle proporzioni della finestra, quindi prova sempre i telefoni in orizzontale sotto i 700 px (568 × 320, 667 × 375): lì gli intervalli in `svh` si accorciano. Regola di progetto (`accessibilita.md` §2.6): mai più veloce della pagina, limite con `max(…svh, …vw)`.
  - Prima di proporre una correzione, provala in pagina iniettando CSS e DOM: così la review dice «provata», non «dovrebbe». Controlla anche che non cambi il layout normale (confronto di box e righe con e senza la regola).
  - **Copia con le patch:** copia di `src/`, `public/`, `scripts/` e configurazione nello scratchpad, `node_modules` collegato, `git init` e commit per ogni passo: `git diff` dà patch pulite e `git apply --check` prova gli ordini. `astro build` impiega circa 3 s; `--outDir dist-pub` con `PUBLIC_SLOT_MODE=publish` dà la variante «publish» accanto. `python3 -m http.server` continua a servire `dist` anche dopo una nuova build.
  - **Ricontrolli:** la build aggiornata può essere servita su un'altra porta (es. `python3 -m http.server` su 4323/4324, con gli URL con la barra finale), mentre 4321 resta sulla build vecchia. Prima di misurare, cerca nei file serviti i marcatori delle correzioni (CSS minificato, bundle JS, HTML) e confronta `src/` con il commit. Script del ricontrollo del 2026-09-28: `ux-verifica/recheck-fixes.mjs` più `breaks.mjs`, `clip.mjs`, `flows.mjs` e `axe.mjs` con l'URL come argomento.

## Pattern approvati o condivisi
- CTA dell'header «Parliamone» → `#richiesta` sulle pagine con form, `/contatti/` altrove (condiviso con cro-specialist).
- Chiusure delle pagine di linea: la CTA delle LG diventa il titolo H3 del form, senza link (cro, copy e direzione visiva d'accordo).
- Menu mobile in `<dialog>` modale (scelta del codice): «Chiudi» dentro il dialog nella posizione di «Menu». Servono il blocco dello scroll via `:has()` e il focus al bersaglio sulle ancore della stessa pagina.
- Marquee legato allo scroll: il criterio 2.2.2 non si applica e non serve la pausa (confermato come owner dell'accessibilità).
- Sezioni che traslano con lo scroll (la timeline del fondatore): ammesse solo senza elementi focalizzabili nella parte che si muove.
- Didascalie sui nodi delle foto: si aprono solo con clic, tocco o tastiera (`aria-expanded`), mai su hover o focus: così 1.4.13 non si applica. Opzione A adottata e verificata sul desktop. Su mobile la didascalia deve comparire anche lì: un pulsante «espanso» che non mostra nulla non va bene (O3).
- Numeri grandi con `nowrap` (display): `<wbr>` dopo il separatore delle migliaia e `white-space: normal`. Stesso metodo per i domini: `<wbr>` prima del dominio di primo livello.
- Link in linea: niente `padding-block` per ingrandire l'area di tocco se stanno su righe consecutive, perché le aree si sovrappongono. Va bene solo per un link da solo sulla sua riga.
- Decisioni sulle voci delegate da copywriter-content (2026-09-28):
  - sì al separatore `sr-only` nei titoli su due righe;
  - `aria-hidden` su coordinate e trattino della timeline (T10: coordinate, rilevamenti e distanze sono un segno grafico);
  - la riga «Preferisci parlarne a voce?» resta anche su /contatti/.
- **Messaggi di errore dei campi (decisione S9, 2026-09-28):**
  - sotto il campo, perché il form rivalida dal vivo e un messaggio sopra farebbe saltare il campo;
  - icona «!» non letta (`content: '!' / ''`) e prefisso nascosto «Errore:»;
  - bordo d'errore da 2 px ottenuto con 1 px di bordo più ombra interna, senza spostamenti.
- **Variante «in pubblicazione» dei segnaposto (`SlotPending`):** ammessa al go-live se il suo testo visibile è già nella pagina o è il segno grafico dei rilevamenti. Sulla Home il nome dell'esperienza non c'è nel testo, quindi niente nome o nome esposto (O6).
- **Ordine delle porte (I11):** un solo ordine a tutte le larghezze; un focus da destra a sinistra su desktop non è accettabile. Deciso dal creative-director (verdetto G4 §3.5): ovest → est, come nel codice.
- Città Digitali 1024–1279 px, città in elenco accanto alla carta (V2 della verifica UI): confermato, ordine del DOM uguale all'ordine visivo.
- **Carte (2026-10-05):** decorative solo se i luoghi sono scritti nel testo accanto. Quando la carta mostra informazione propria (capitolo 03 con tutte le città), diventa `role="img"` con una descrizione costruita dagli stessi dati della carta, senza numeri non confermati. Mai elenchi nascosti di nomi: veridicità (nomi `[DA VERIFICARE]`) e rischio di testo nascosto. L'elenco completo sta nella pagina di linea, visibile, oppure come link alla fonte del cliente; nella Home ogni capitolo resta con una sola CTA.
- **Dominio di Città Digitali:** cittàdigitali.it con l'accento, link in punycode `https://xn--cittdigitali-19a.it`; cittadigitali.it senza accento è un progetto omonimo di altri.
- **Descrizioni delle carte (2026-10-05, L6):** la descrizione dice ciò che la carta aggiunge al testo accanto. I nomi solo se la carta li disegna («Tra queste:»), mai per ripetere città già lette subito prima e subito dopo: 1.1.1 si valuta nel contesto. Con l'elenco completo accanto (stessa sezione, tutte le città, per regione), carta e legenda `aria-hidden` insieme.
- **Lunghezza delle descrizioni delle carte (2026-10-06, L7):** al massimo 250 caratteri, perché il nome accessibile si sente tutto d'un fiato. Nomi d'esempio: quelli disegnati a ogni larghezza, senza la sede, che ha la sua frase. Niente elenco di tutte le suddivisioni (tutte le province = «tutta la Puglia»); sì all'elenco delle regioni d'Italia, perché sono una parte.
- **Colori forzati (2026-10-05):** requisito di progetto oltre AA (`accessibilita.md` §2.14). Segni disegnati come sfondo → `forced-color-adjust: none` solo sul segno, con `CanvasText`, `Canvas` o `LinkText`, mai colori del marchio. Focus fatto di `box-shadow` → `outline: 2px solid transparent`, mai `none`. Ogni nuovo segno nasce con il suo blocco; prova con l'Appendice D.

## Da tenere d'occhio
- Ordine diverso tra desktop e mobile nelle composizioni della direzione visiva (per esempio le porte dei luoghi): un solo DOM non può seguire due ordini.
- Immagini con il segno di Gemini: alt e didascalie non devono presentare come reali eventi non documentati (brief DR3).
- Titoli in colonne strette su desktop (varianti affiancate): la parola più lunga deve stare nella colonna, altrimenti la rete di sicurezza la spezza (O4, /siii/).
- Il video di Città Digitali resta la condizione A3 più incerta: senza il file non si sa se servono sottotitoli, descrizione o entrambi.
