# Memoria di progetto · copywriter-content

Solo lezioni e preferenze di lavoro. Fatti, claim e decisioni stanno in `docs/` (brief consolidato, mappa SEO, strategia CRO, tone of voice).

## Prima di scrivere (lezione del 2026-09-28)
- Il team lavora in parallelo: i documenti di riferimento possono comparire mentre scrivo. **Ricontrollare `docs/` prima di consegnare** e allinearsi a:
  - `docs/brief/brief-consolidato.md`: fonte di verità su fatti e claim (registro N/F/A/S, domande D, decisioni DR);
  - `docs/seo/mappa-keyword-url.md`: title, meta, heading, blocchi di risposta A–G (si rifinisce lo stile, non si cambiano i fatti);
  - `docs/cro/strategia-conversione.md`: CTA, ancora unica `#richiesta`, `cta_id`, preselezione di «Mi interessa», introduzioni dei form;
  - `docs/contenuti/tone-of-voice.md`: grafie, CTA ≤ 28 caratteri freccia compresa, frecce → ↓ ↗.
- Nella v1.0 avevo scritto «Un progetto ITnode» per Puglia Digitale e Città Digitali: è un'attribuzione non confermata (A1). Anche eyebrow e meta possono contenere claim: controllarli come il resto.

## Ambiente
- Bloccati: itnode.it, tutti i portali (*digitale.it/.com, cittàdigitali.it e l'omonimo senza accento), lapugliadigitale.it, railway.app (video), LinkedIn, consiglio.puglia.it, giacomolenoci.it, leccesette.it, tuttifranchising.it. WebFetch quasi sempre bloccato; WebSearch funziona: usare le sintesi dei risultati, citare URL e data, marcare [DA VERIFICARE].
- La scratchpad è condivisa con altri membri: lavorare solo in `scratchpad/copywriter-content/`.
- PIL non è installato: per le dimensioni delle immagini usare `file` (JPEG, PNG) o leggere l'header WebP con struct.

## Metodo che ha funzionato
- Formato del copy deck: etichetta in grassetto con tag, «max» e «verbatim»; testo pubblicabile in blocco `>`; tabelle di copy per schede ripetute. Con questo formato uno script estrae i testi, controlla i limiti di lunghezza e calcola Gulpease.
- Il checker (`copycheck.py`, in scratchpad) legge la prima occorrenza di «max» nell'etichetta: negli H1 su due righe scrivere prima il totale («max 72 in totale (riga 1: …)»). Nei title con `|` dentro le tabelle serve l'escape `\|`.
- Gulpease: i blocchi di risposta SEO, pieni di nomi di prodotto lunghi, scendono sotto 60. Spezzare le frasi, a parole invariate, lo riporta sopra 60.
- Gli H2 descrittivi della mappa SEO si possono tenere come heading piccoli, con lo statement creativo in `<p>` grande: tiene insieme SEO e art direction.
- Asset: ingrandire gli angoli delle immagini per cercare watermark (trovato il segno di Gemini su 3 foto su 5).

## QA sul sito costruito (lezione del 2026-09-28, Fase 5)
- Estrazione con Playwright (`createRequire('/opt/node22/lib/node_modules/')`): `innerText` applica il `text-transform` del CSS (maiuscolo) e include i testi `sr-only`; per il testo sorgente usare `textContent`, per i nomi accessibili `locator('body').ariaSnapshot()`. Una scansione dei nodi di testo e degli attributi (alt, aria-label, content, data-msg-*) trova apici dritti e spazi errati in un colpo solo.
- Trappole ricorrenti del markup Astro: un a capo tra `</a>` e il punto produce « .» visibile; un a capo prima di `<span class="sr-only">, …` produce « ,» nel nome accessibile. Controllarli sempre.
- Confrontare il sito con il copy deck riga per riga: la sessione principale può reintrodurre il testo originale del cliente che il copy deck aveva ammorbidito per veridicità (caso «Ha creato Città Digitali e Puglia Digitale», anche nel JSON-LD).
- Prima di scrivere una review, leggere quelle già in `docs/review/` della stessa data (brand-strategist, seo-technical) e rimandare alla loro numerazione invece di duplicare.
- Una citazione verbatim riusata su un’altra pagina può perdere l’antecedente («È questo il futuro…»): verificare il senso nel nuovo contesto.
- Spazio prima della virgola nei nomi accessibili («Città Digitali , portale…»): non dipende solo dall'a capo. Chromium tratta lo `sr-only` (position: absolute) come blocco e aggiunge uno spazio se il testo nascosto comincia con la punteggiatura. Il separatore « – » non lo produce. ux-designer l'ha già valutato (verifica del 2026-09-28, A7: non si sente, nessuna azione): non risegnalarlo, al massimo annotarlo.

## Allineare i copy deck al sito (lezione del 2026-10-05, Fase 5)
- A ogni incarico cercare in `docs/review/` le richieste rivolte a me («copywriter-content», «copy deck … va allineato»): alcune decisioni (K2 riga del telefono, T11 breadcrumb al posto dell'occhiello) erano rimaste non applicate nei miei deck per una settimana.
- Prima di dire che il sito sbaglia, cercare la decisione: direzione visiva §7.x, `struttura-pagine.md`, review di accessibilità. Spesso il sito segue una decisione presa dopo il copy deck: allora si allinea il deck e si cita la fonte.
- Se cambia l'ordine delle sezioni, tenere la numerazione del deck (altri documenti la citano) e aggiungere la colonna «Ordine nel sito».
- Il dominio omonimo (senza accento) non va scritto alla lettera nemmeno nelle note: descriverlo («il dominio senza accento delle LG §22»), così né un copia-incolla né una ricerca lo ripescano.
- Metodo collaudato: copiare `dist/` in `scratchpad/copywriter-content/` e servirla con `DIST_DIR=… PREVIEW_AUTH=off PORT=4391 node scripts/serve.mjs` (niente corse con le build degli altri). `verify-deck.mjs` controlla ogni blocco `>` e ogni tabella di copy contro `textContent`, nomi e descrizioni dell'albero di accessibilità (CDP), `href`, `data-cta-id` e `alt`.
- `copycheck.py` non legge come metadati una tabella che segue un'etichetta in grassetto: le lunghezze di una seconda tabella di title e meta vanno contate a parte.
- Lo staging di riferimento è `astro preview` su http://localhost:4321, che serve `dist/`: prima di usarlo controllare con `find src -newer dist/…` che la build sia aggiornata. Il mio server su 4391 va fermato con `kill <PID>`: `pkill -f "PORT=4391"` uccide la mia stessa shell.
- Lo script nel senso inverso (`reverse-check.mjs`) trova i testi del sito che il deck non riporta, fuori dal form: figure, marquee, didascalie, righe mono. `verify-deck2.mjs <porta> <deck>=<percorso>` è la versione con parametri. `alts.mjs` raccoglie alt, didascalie e `role="img"` di tutte le pagine.
- Riaprire anche le mie review precedenti: nella review di bozze del 2026-09-28 avevo scritto «allineo io il copy deck» (S3, Testo 03 di SIII), ed era rimasto da fare.
- L'ADR 002 (riserve di go-live, brand-strategist) contiene testi di riserva per i miei deck (B2, B3, I6, I7, I8, A7): riportarli nelle note delle sezioni e controllarne la lunghezza. La riserva I6 «Porta la tua impresa in Puglia Digitale» supera i 28 caratteri.
- Nelle tabelle di copy solo testi da pubblicare o valori del sito (slot, URL, `cta_id`): le note vanno fuori, altrimenti lo script le segnala come mancanti.
- Asset nuovo del cliente (lezione del 2026-10-06): angoli ingranditi 3 volte e metadati con `sharp` (lo script deve girare da una cartella che risolve i `node_modules` del repo; poi va tolto). Se l'uso di AI non è noto, la nota dice solo ciò che è certo («Immagine elaborata digitalmente»), e si preparano le formule per i casi confermati, riusando quelle già nel sito (ADR 002). La scelta per il go-live senza risposta spetta a brand-strategist con il consulente.
- La sessione principale committa versioni intermedie dei miei file mentre lavoro («lavoro in corso»): normale. Prima di consegnare, rileggere `git log` e le review nuove (es. direzione visiva 0.8, mappa 0.4 in corso) e aggiornare lo stato delle differenze aperte.

## Preferenze e correzioni ricevute
- (nessuna correzione diretta dell'utente finora)
