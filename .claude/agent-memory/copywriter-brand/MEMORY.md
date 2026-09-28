# Memoria di progetto · copywriter-brand

Solo lezioni di metodo, formule approvate o rifiutate e feedback. Voce, grafie e convenzioni stanno in `docs/contenuti/tone-of-voice.md`; fatti e claim in `docs/brief/brief-consolidato.md`.

## Feedback del cliente sui testi
- Nessuno, al 2026-09-28.

## Formule
- Da non riproporre: «Da un’impresa a un territorio, fino all’Italia» e simili. Suggeriscono una copertura nazionale che il brief vieta (N12). Al suo posto: «Un’impresa. Un territorio. Una rete di città.»
- Nella timeline del fondatore, i numeri del percorso vanno etichettati in modo che non si possano attribuire a ITnode: «10.000+ clienti, prima di ITnode».

## Lezioni di metodo (2026-09-28)
- Il team lavora in parallelo e i documenti arrivano mentre scrivo. Prima di chiudere, ricontrollare `docs/` e `src/`: brief consolidato (registro dei claim, codici A/N/F/S, regole DR), mappa SEO (title, heading, blocchi di risposta A–G), strategia CRO (CTA, form, microcopy proposto), `alt-text.md` e copy deck di copywriter-content. Qui hanno cambiato l’apertura della Home, l’header e il form.
- Il microcopy va agganciato al codice. Leggere `src/scripts/*.ts` e `src/data/site.ts` per attributi (`data-msg-*`, `data-label-*`), pannelli (`[data-form-success|failure|fallback]`) e percorsi canonici con la barra finale.
- Gulpease con uno script (`89 + (300 × frasi − 10 × lettere) / parole`). I nomi di prodotto lunghi e i domini abbassano l’indice: spezzare le frasi. Ricontrollare i numeri dichiarati nei documenti: ne avevo scritti due a memoria, ed erano sbagliati.
- Asset: tre immagini hanno la filigrana di Gemini, e i metadati sono vuoti. Niente didascalie che affermino eventi, luoghi o date.
- Rete: giacomolenoci.it, icommlab.com e ufficiocamerale.it sono bloccati. Gli estratti di WebSearch servono solo a marcare `[DA VERIFICARE]`, mai come fonte da pubblicare (per esempio REA e capitale sociale).
- Quando un altro membro propone del microcopy (qui cro-specialist, § 8), va recepito e rifinito, non riscritto da capo. Motivare solo le differenze, per esempio le formule non neutre («richiamato») o un numero d’esempio che si potrebbe comporre davvero.
