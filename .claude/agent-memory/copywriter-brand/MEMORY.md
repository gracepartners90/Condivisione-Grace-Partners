# Memoria di progetto · copywriter-brand

Solo lezioni di metodo, formule approvate o rifiutate e feedback. Voce, grafie e convenzioni stanno in `docs/contenuti/tone-of-voice.md`; fatti e claim in `docs/brief/brief-consolidato.md`.

## Feedback del cliente sui testi
- Nessuno, al 2026-09-28.

## Formule
- Da non riproporre: «Da un’impresa a un territorio, fino all’Italia» e simili. Suggeriscono una copertura nazionale che il brief vieta (N12). Al suo posto: «Un’impresa. Un territorio. Una rete di città.»
- Nella timeline del fondatore, i numeri del percorso vanno etichettati in modo che non si possano attribuire a ITnode: «10.000+ clienti, prima di ITnode».
- Rifiutata dal creative-director al G4 (I4): la frase di posizionamento nell’occhiello. Il test dei cinque secondi si gioca su ciò che sta subito sotto l’H1: la frase che dice che cosa fa ITnode non va mai nel corpo più piccolo della pagina. L’occhiello porta il concetto, il `lead` il posizionamento.
- Link verso una sezione di un’altra pagina: verbo più oggetto, e la destinazione nel testo nascosto se il visibile non la dice («Scopri il suo percorso» più « nella home»). Gli esempi di testo del creative-director («Il suo percorso →») vanno confrontati con le regole CTA del tone of voice, motivando la differenza.

## Lezioni di metodo (2026-09-28)
- Il team lavora in parallelo e i documenti arrivano mentre scrivo. Prima di chiudere, ricontrollare `docs/` e `src/`: brief consolidato (registro dei claim, codici A/N/F/S, regole DR), mappa SEO (title, heading, blocchi di risposta A–G), strategia CRO (CTA, form, microcopy proposto), `alt-text.md` e copy deck di copywriter-content. Qui hanno cambiato l’apertura della Home, l’header e il form.
- La struttura del copy deck si fissa solo dopo aver letto `docs/creativa/direzione-visiva.md` (§ 7, mappa del ritmo) e `docs/ux/struttura-pagine.md`, `docs/ux/sitemap.md`. Qui sono arrivati dopo la prima stesura e hanno cambiato molto: la Home è passata a sette sezioni, la hero ha solo kicker, H1 e didascalia, le frecce sono icone SVG (→ altra pagina, ↓ stessa pagina, ↗ esterno), l’H1 della 404 deve stare in 40 caratteri e le microdescrizioni in 160. I limiti di lunghezza di ux-designer vanno verificati con lo script.
- Il microcopy va agganciato al codice. Leggere `src/scripts/*.ts` e `src/data/site.ts` per attributi (`data-msg-*`, `data-label-*`), pannelli (`[data-form-success|failure|fallback]`) e percorsi canonici con la barra finale.
- Gulpease con uno script (`89 + (300 × frasi − 10 × lettere) / parole`). I nomi di prodotto lunghi e i domini abbassano l’indice: spezzare le frasi. Ricontrollare i numeri dichiarati nei documenti: ne avevo scritti due a memoria, ed erano sbagliati.
- Asset: tre immagini hanno la filigrana di Gemini, e i metadati sono vuoti. Niente didascalie che affermino eventi, luoghi o date.
- Rete: giacomolenoci.it, icommlab.com e ufficiocamerale.it sono bloccati. Gli estratti di WebSearch servono solo a marcare `[DA VERIFICARE]`, mai come fonte da pubblicare (per esempio REA e capitale sociale).
- Quando un altro membro propone del microcopy (qui cro-specialist, § 8), va recepito e rifinito, non riscritto da capo. Motivare solo le differenze, per esempio le formule non neutre («richiamato») o un numero d’esempio che si potrebbe comporre davvero.

## Lezioni di metodo (G4, 2026-09-28)
- Righe brevi e grandi (occhielli, lead della hero, titoli): misurare gli a capo con uno script da 320 a 1920 px, iniettando DOM e CSS come fa il creative-director (`cd-g4/test-i4.mjs` nello scratchpad). Lo spazio unificatore tra preposizione e nome («del Web», «per imprese», «da esplorare») rende gli a capo semantici; si scrive nel copy deck, nel punto esatto.
- Un indice Gulpease complessivo si dichiara solo con l’insieme dei testi usato: il 69 della Home v1.0 non era riproducibile. I valori per singolo testo lo erano.
- La sessione principale committa i documenti mentre li scrivo: per rileggere le mie modifiche, diff dal commit precedente all’incarico, non da `git status`.
- Nei copy deck di copywriter-content tocco solo la sezione richiesta e gli allineamenti al codice nella stessa sezione (qui l’etichetta del 60%, I9). Il resto lo segnalo: per esempio l’ordine dei luoghi di Puglia Digitale, deciso al G4 e non ancora nel copy deck.
- Sbagliato scrivere «il copy deck non va riallineato» per valori calcolati dal codice: gli esempi letterali nei documenti (coordinate, rilevamenti, distanze) invecchiano e qualcuno li reintroduce. Quando cambiano i dati li cerco con grep in tutti i miei documenti (per esempio `[0-9]\.[0-9]{3,}°`, «km», «°») e li riallineo, con versione e data. Dal 2026-09-28 le coordinate sono a 2 decimali (C11).
- Tracciamento: la sessione principale ha scelto `data-cta-location="persona"`, cioè il nome della sezione, al posto del generico «sezione». Conferma di cro-specialist attesa: fino ad allora propongo il nome della sezione.
- Dopo che i testi sono applicati, li rimisuro sul sito servito, senza iniezioni. Qui è servito a confermare spazi unificatori (U+00A0 nell’HTML), a capo e nome accessibile del link.

## Lezioni di metodo (carta di Città Digitali, 2026-10-05)
- Legende e didascalie di dati: dire qualcosa di ogni segno («Ogni punto è una città del portale»), non di ogni elemento dell’insieme («Un punto per ogni città»). La prima resta vera se un punto manca o se l’elenco cresce; la seconda è un claim di completezza.
- Testi costruiti dai dati (descrizioni per screen reader, conteggi): scrivere anche le regole dei casi limite, perché restino veri con qualunque dato. Per esempio «la maggior parte» solo sopra la metà, altrimenti «più che altrove»; le preposizioni con le regioni («nel Lazio»); i nomi legati al disegno solo se valgono a ogni larghezza.
- Una descrizione accessibile si scrive per il suo contesto: stessi dati, frasi diverse se il testo accanto dice già una parte. Su `/citta-digitali/` paragrafo e schede nominano le tre città, quindi la descrizione si ferma alle regioni (review della legenda, L6).
- Elencare tutte le province o regioni di un territorio suona come una copertura completa: l’effetto è quasi quello di «tutta la Puglia». Meglio dire dove si concentrano le città e dare come esempi nomi agli estremi (Manfredonia, Nardò). Nelle descrizioni accessibili, nessun nome detto due volte (review della legenda, L7).
- Le review degli altri che chiedono di aggiornare un mio documento vanno recepite subito: la H5 della review di bozze (nodo 2 senza «regionale», 2026-09-28) è rimasta nove giorni nel copy deck della Home. Per allineare un copy deck al sito: costruisco HEAD in una copia (`git archive` più `astro build --outDir` nello scratchpad, senza toccare `dist/`), estraggo i testi, compresi alt, `aria-label` e testo nascosto (`cb-home-v/tools/extract.py`), e confronto ogni citazione del copy deck.
- Prima di proporre un link in un capitolo della Home: una sola CTA per capitolo (ux-designer, HM-5) e niente link esterni (strategia di conversione). Il posto dei link ai portali sono le pagine dedicate.
- Le review degli altri arrivano mentre scrivo, e qui hanno cambiato due proposte su tre (review di ux-designer, direzione visiva 0.6). Prima di chiudere: `git status`, `git log` e `ls -t docs/review/`.
- Un documento «in lavorazione» non è una decisione. Ho riscritto la legenda seguendo un criterio della direzione visiva non ancora committata, e intanto il creative-director aveva adottato la mia versione 1.0, accettando la ripetizione. Prima di cambiare una raccomandazione guardo se l’owner ha già deciso. Una decisione presa non si riapre: un argomento nuovo diventa una nota non bloccante.
- Le linee guida possono sbagliare un dato: il dominio di Città Digitali era quello di un omonimo. Una regola «come nelle linee guida» va scritta con le eccezioni registrate nel brief (S7).
- Le build di prova degli altri sono nello scratchpad (per esempio `ui-mappa/site/dist`): si servono con `python3 -m http.server` su una porta libera e ci si misurano i testi veri, invece di ricostruire il layout.
