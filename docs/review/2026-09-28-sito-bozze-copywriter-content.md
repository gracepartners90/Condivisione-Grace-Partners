---
titolo: Correzione di bozze finale del sito costruito (Fase 5)
owner: copywriter-content
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
oggetto: testi visibili, nomi accessibili, testi alternativi e metadati di /, /siii/, /puglia-digitale/, /citta-digitali/, /contatti/, /privacy-policy/, /cookie-policy/, /404.html
fonti: [http://localhost:4321/, dist/, src/pages/*.astro, src/components/**, src/data/site.ts, src/data/pages.ts, src/data/asset-slots.ts, src/data/media.ts, src/data/figures.ts, src/lib/structured-data.ts, docs/contenuti/copy-deck/*.md, docs/contenuti/microcopy.md, docs/contenuti/tone-of-voice.md, docs/contenuti/alt-text.md, docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/review/2026-09-28-sito-veridicita-brand-strategist.md]
---

# Correzione di bozze · sito costruito

## Metodo

- Testi estratti dall’anteprima (http://localhost:4321/) con Playwright, a 1440 e a 390 px. Per ogni pagina: testo a schermo (`innerText`, con il maiuscolo applicato dal CSS), testo sorgente (`textContent`) e albero di accessibilità (`ariaSnapshot`), cioè i nomi che leggono gli screen reader.
- Controllo automatico su tutti i nodi di testo e sugli attributi `alt`, `aria-label`, `title`, `content` dei meta e `data-msg-*`. Pattern cercati: apici e virgolette dritti, virgolette inglesi, tre punti, doppi spazi, spazio prima della punteggiatura, «E’», grafie errate dei nomi, «e-mail», «on-line», «a 360 gradi», ordine «Immersivo Interattivo», parole da evitare.
- Confronto con copy deck, microcopy e guida di stile. Ho cercato alla lettera nelle linee guida (LG) più di 50 frasi ed etichette del cliente.
- Title e meta description misurati. Indice Gulpease calcolato con uno script sui paragrafi di `main`.
- Ho aperto uno per uno i cinque ritagli in uso (`src/assets/images/derivate/`) per verificare i testi alternativi.
- Ho letto la review di veridicità di brand-strategist della stessa data. Dove i punti coincidono rimando alla sua numerazione (B1–B5) e parlo solo del testo.

## Esito in sintesi

**Che cosa è già a posto**
- **Tipografia.** Zero apici dritti, virgolette dritte o inglesi nel testo e negli attributi delle 8 pagine. Le virgolette basse ci sono dove servono («È questo il futuro…»), «È» è sempre accentata e i puntini di sospensione sono un carattere solo («Invio in corso…»).
- **Nomi.** ITnode, SIII, Città Digitali e Puglia Digitale sono scritti bene ovunque. «Siti Immersivi Interattivi» compare solo nel sottotitolo di Città Digitali, come previsto.
- **Verbatim.** Tutte le frasi del cliente sono fedeli alle LG. L’unica normalizzazione è «Nome e cognome» (tone of voice § 8).
- **CTA.** Etichette identiche a quelle della guida di stile, § 6. Tutti i link esterni dichiarano la nuova scheda e le CTA ripetute hanno nomi accessibili univoci («Entra nell’esperienza di…», «Esplora Gravina in Puglia su…»).
- **Metadati.** Title unici, tra 22 e 60 caratteri. Meta description tra 144 e 154 caratteri.
- **Form e 404.** Testi del modulo (etichette, aiuti, errori, stati, ripiego) e della 404 conformi alla microcopy.
- **Numeri e immagini.** I numeri di Puglia Digitale hanno il testo sciolto per le tecnologie assistive. I segnaposto sono nascosti agli screen reader. Gli alt dei ritratti e della foto di Puglia Digitale corrispondono a ciò che si vede.

**Che cosa va corretto**

| Priorità | Voci | Note |
|---|---|---|
| [BLOCCANTE] | H1, C1, P1, H2, T3 | Veridicità e dati legali, in comune con brand-strategist (B1–B5). H1 si corregge subito: basta tornare al testo del copy deck. |
| [BLOCCANTE] per G4 | T2, C2, L1 | Dipendono da materiali del cliente: asset, video, informativa. |
| [IMPORTANTE] | T1, K1, L2, L3, L4, Q1 | Correzioni di testo, tutte fattibili subito. |
| [SUGGERIMENTO] | 22 voci | Rifiniture, allineamenti, note per i copy deck. |

---

## Trasversali (più pagine)

### [IMPORTANTE] T1 · Spazio prima del punto nell’avviso del modulo
- **Dove:** `src/components/sections/ContactForm.astro:64-68`. Si vede su /siii/, /puglia-digitale/, /citta-digitali/ e /contatti/.
- **Attuale:** «…o chiamaci al +39 080 2466520 . Se compili i campi, all’invio prepariamo un’email già pronta da spedire.»
- **Corretto:** «…o chiamaci al +39 080 2466520. Se compili i campi, all’invio prepariamo un’email già pronta da spedire.» Nel markup il punto va subito dopo il link, senza a capo: `…{site.phone.display}</a>. Se compili…`, come già alla riga 220.
- **Motivazione:** refuso visibile su quattro pagine. L’a capo tra `</a>` e il punto diventa uno spazio.

### [BLOCCANTE per G4] T2 · Segnaposto degli asset visibili
- **Dove:** hero e capitolo 01 della Home, hero ed esempi di /siii/, luoghi di /puglia-digitale/ («ASSET RICHIESTO · SCREENSHOT», «ASSET RICHIESTO · FOTO», con le specifiche).
- **Problema:** sono testi di lavoro. Linguisticamente sono corretti (vedi T8) e sono nascosti agli screen reader, ma non possono essere online al lancio.
- **Proposta:** prima di G4, sostituirli con gli asset del cliente oppure togliere lo slot.
- **Motivazione:** correzione di bozze finale: nessun testo interno visibile al pubblico.

### [BLOCCANTE] T3 · Dati societari incompleti (footer, Contatti, Privacy) · = B5 di brand-strategist
- **Dove:** riga legale del footer (tutte le pagine); /contatti/#dati-societari; /privacy-policy/, «Chi tratta i dati».
- **Attuale:** footer «© 2026 ITNODE S.r.l. · P.IVA 08937270729». Contatti: «Ragione sociale · Partita IVA · Sede operativa».
- **Corretto:** la riga della microcopy, § 3: «© {anno} ITNODE S.r.l. · P.IVA … · Sede legale: Via Sant’Anna, 34 – 70021 Acquaviva delle Fonti (BA) · C.F. e iscrizione al Registro delle imprese di Bari n. … · REA BA-… · Capitale sociale € … i.v.». In Contatti, «Sede legale» (oppure «Sede legale e operativa», se coincidono: S3), con Registro delle imprese e REA, capitale sociale e PEC. `[DA FORNIRE: dati da visura, S1–S4]`
- **Motivazione:** soglia 5. Nei «Dati societari» il dato obbligatorio è la sede legale, non quella operativa.

### [SUGGERIMENTO] T4 · Spazio prima della virgola nei nomi accessibili dei portali
- **Dove:** `src/components/layout/Footer.astro:82-83` (tutte le pagine) e `src/pages/contatti.astro:177-178` (H3 della sezione «I portali»).
- **Attuale** (nome accessibile): «cittadigitali.it , portale di Città Digitali (si apre in una nuova scheda)» · «Città Digitali , portale cittadigitali.it (si apre in una nuova scheda)».
- **Corretto:** «cittadigitali.it, portale di Città Digitali (si apre in una nuova scheda)» · «Città Digitali, portale cittadigitali.it (si apre in una nuova scheda)». Nel markup, `{p.display}` e `{p.name}` vanno attaccati allo `<span class="sr-only">`, sulla stessa riga.
- **Motivazione:** punteggiatura. In Contatti il testo è dentro un H3, quindi compare anche nell’elenco dei titoli degli screen reader.

### [SUGGERIMENTO] T5 · Numeri di telefono senza spazi non separabili fuori da Contatti
- **Dove:** `Footer.astro:57`, `Header.astro:86` (menu mobile, «Chiama …») e `CTASection.astro:79` (chiusura della Home, «Chiama …»). In Contatti la funzione `nb()` (`contatti.astro:20`) li mette già, e nel form li protegge la classe `.contact__nowrap`.
- **Attuale:** «+39 080 2466520» con spazi normali (U+0020).
- **Corretto:** «+39 080 2466520» con U+00A0. Conviene spostare `nb()` in un modulo comune e usarla in quei tre punti. Lo spazio non separabile non va messo in `site.phone.display`, che finisce anche nel `telephone` del JSON-LD (`structured-data.ts:42`, `:55`).
- **Motivazione:** tone of voice § 7. Il numero non deve andare a capo.

### [SUGGERIMENTO] T6 · Titoli su due righe senza separatore per chi li ascolta
- **Dove:** H1 di /siii/, /puglia-digitale/ e /citta-digitali/; H3 «SIII» nella Home; H2 del fondatore in /contatti/.
- **Attuale** (testo letto): «SIII Siti Interattivi Immersivi» · «Puglia Digitale Una piattaforma interattiva immersiva…» · «Giacomo Lenoci Fondatore di ITnode».
- **Corretto:** un separatore visivamente nascosto tra le due righe: «SIII – Siti Interattivi Immersivi» (forma del glossario), «Puglia Digitale – Una piattaforma…», «Città Digitali – Le attività del territorio…», «Giacomo Lenoci, fondatore di ITnode». Nel markup: `<span class="sr-only"> – </span>`, oppure `, ` nel caso del fondatore.
- **Motivazione:** chi ascolta sente due frasi attaccate, e lo stesso testo è quello che i motori leggono nell’H1. Decidono ux-designer e seo-content.

### [SUGGERIMENTO] T7 · Domini ed email in maiuscolo
- **Dove:** chiusura della Home («SCRIVI A INFO@ITNODE.IT»), esempi di /siii/ («CASSANODIGITALE.IT»…), luoghi di /puglia-digitale/, portali di /contatti/.
- **Proposta:** `text-transform: none` su domini e indirizzi email. Il resto dell’etichetta mono resta in maiuscolo.
- **Motivazione:** tone of voice § 5 (domini in minuscolo, come nelle LG). Un indirizzo in maiuscolo si riconosce e si ricopia peggio. Owner: ui-designer.

### [SUGGERIMENTO] T8 · «Porta 3:5» nelle specifiche dei segnaposto
- **Dove:** `src/data/asset-slots.ts:25` e `:50`.
- **Attuale:** «Porta 3:5, lato lungo di almeno 2400 px.» · «Porta 3:5, almeno 1200 × 2000 px.»
- **Corretto:** «Formato verticale 3:5, lato lungo di almeno 2400 px.» · «Formato verticale 3:5, almeno 1200 × 2000 px.»
- **Motivazione:** «Porta» è il nome interno di un formato della direzione visiva. Il cliente, che rivede l’anteprima e deve fornire gli asset, non lo conosce. Il punto vale finché i segnaposto sono visibili (T2).

### [SUGGERIMENTO] T9 · Testi alternativi previsti per quando arriveranno le immagini
- **Dove:** `src/data/asset-slots.ts:28` (luoghi: `alt: name`), `:39` («Anteprima dell’esperienza immersiva di {name}»), `:53` e `:65` («Copertina del video di Città Digitali»).
- **Problema:** oggi non si leggono, perché i segnaposto sono nascosti. Con le immagini vere, invece, `alt: name` ripeterebbe il nome della città già presente nell’H3.
- **Corretto:** gli schemi di `docs/contenuti/alt-text.md`, «Slot segnaposto». Per i luoghi: il soggetto della foto senza il nome della città, oppure `alt=""` se la scheda intera è un link. Per le schermate: «{nome} nel suo Sito Interattivo Immersivo: {ambiente}, con i punti interattivi.». Per il poster del video: nessun alt.
- **Motivazione:** criteri 5 e 6 di alt-text.md. Si scrivono dopo aver visto le immagini.

### [SUGGERIMENTO] T10 · Coordinate lette dagli screen reader
- **Dove:** esempi di /siii/ («Cassano delle Murge (BA) 40.8906° N · 16.7700° E cassanodigitale.it»), luoghi di /puglia-digitale/ e città di /citta-digitali/, sede in /contatti/ («Acquaviva delle Fonti · 40.8957° N · 16.8412° E»).
- **Problema:** le coordinate sono un segno grafico, ma vengono lette per intero. Per D.L. Natura Dentro, poi, sono quelle di Acquaviva e coincidono con la sede di ITnode: sembrano l’indirizzo dell’impresa.
- **Proposta:** `aria-hidden="true"` sulle coordinate, come già per l’orizzonte e i rilevamenti. Decide ux-designer.

### [SUGGERIMENTO] T11 · Divergenze strutturali dai copy deck (nessun errore di testo)
Le registro per aggiornare i copy deck. Se sono scelte volute, non serve intervenire sul sito.
- Mancano gli occhielli della hero su /siii/ («Esperienze immersive per aziende»), /puglia-digitale/ («Destination marketing») e /citta-digitali/ («Digitalizzazione territoriale»). Al loro posto c’è il breadcrumb.
- Il separatore del breadcrumb è «/»; la microcopy, § 11, indica «›».
- «Gli altri mondi ITnode» sta prima della chiusura con il form; i copy deck lo mettevano dopo.
- Su /citta-digitali/ il video viene prima di «L’Italia in un unico portale». Le schede delle città non mostrano il dominio, che però c’è nel nome accessibile.
- Su /puglia-digitale/ la foto dell’evento sta in «Dalla costa all’entroterra», non accanto a «La forza della rete». L’ordine dei luoghi (Gravina, Acquaviva, Monopoli) va dall’entroterra alla costa, cioè al contrario del titolo della sezione.
- Testi presenti nel sito ma non nei copy deck. Sono tutti corretti e, dove serve, nascosti agli screen reader: le distanze nelle etichette dell’orizzonte («Monopoli — 081° · 39 km»: valori ricontrollati a campione con un calcolo approssimato, coerenti), le etichette della carta («Mare Adriatico», «Murgia»), il marquee dei verbi su /siii/, il link su «lapugliadigitale.it» nel Blocco D, il pulsante «Schermo intero» del video, la nota AI dei ritratti. Per gli altri testi fuori copy deck vedi K1, K3 e P2.

---

## Home (/)

### [BLOCCANTE] H1 · «Ha creato Città Digitali e Puglia Digitale» · = B1 di brand-strategist
- **Dove:** `src/pages/index.astro:50` (lead del Manifesto) e `src/lib/structured-data.ts:40` (`description` dell’Organization, in 7 pagine).
- **Attuale:** «…Crea Siti Interattivi Immersivi (SIII) per le imprese. Ha creato Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale che portano online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.»
- **Corretto** (versione provvisoria del copy deck Home, § 2): «ITnode è un’azienda di Acquaviva delle Fonti, in provincia di Bari, che rende gli spazi fisici esplorabili sul Web. Crea Siti Interattivi Immersivi (SIII) per le imprese. Con i Tour Virtuali Interattivi Immersivi porta online luoghi, imprese e attività in due progetti di digitalizzazione territoriale: Città Digitali e Puglia Digitale.» I link restano gli stessi. Nel JSON-LD va la stessa frase, oppure una delle formule di B1 (owner: seo-technical).
- **Motivazione:** registro dei claim, A1 «Da verificare»; regola DR4; soglia 1. La pagina Puglia Digitale evita l’attribuzione («Con Puglia Digitale, ITnode porta online…») e la Home la contraddice. Il testo provvisorio porta anche il Gulpease del paragrafo da 49 a 52. Se il cliente ha già risposto a D1, basta registrare la decisione e aggiornare A1: il punto decade.

### [BLOCCANTE] H2 · Foto dell’evento senza la nota sull’AI, al contrario dei ritratti · = B4 di brand-strategist
- **Dove:** `index.astro:57-59` (Home) e `puglia-digitale.astro:98`.
- **Problema:** i due ritratti hanno la nota «Immagine elaborata con strumenti di intelligenza artificiale» (`media.ts:12`). La foto dell’evento non ce l’ha, eppure nell’originale c’è la filigrana di Gemini (alt-text.md, Rischi 1) e il sito la usa come documento di un evento reale.
- **Corretto:** la stessa nota, nella stessa posizione e con la stessa forma dei ritratti, finché il cliente non chiarisce che cosa è stato modificato (D9). Il testo lo decidono brand-strategist e il consulente legale del cliente.
- **Motivazione:** coerenza tra le immagini; soglia 1; AI Act, art. 50 (alt-text.md, Rischi 3).

### [SUGGERIMENTO] H3 · Alt della foto dell’evento: «maxischermi» anche dove se ne vede uno
- **Dove:** `index.astro:59`. È lo stesso alt per `evento-panorama` (desktop, due schermi visibili) e `evento-citta` (mobile, uno schermo solo, quello a sinistra).
- **Attuale:** «La platea dell’evento Puglia Digitale davanti ai maxischermi, con un tour virtuale a 360° di una città vista dall’alto.»
- **Corretto:** «La platea dell’evento Puglia Digitale; sul maxischermo a sinistra del palco, il tour virtuale di una città vista dall’alto.» (123 caratteri)
- **Motivazione:** criteri 1 e 3 di alt-text.md: la frase è vera per entrambi i ritagli, e palco e piazza sono già nella legenda. Tolgo «a 360°», che dalla foto non si vede. Resta nella legenda, che è un testo della direzione visiva.

### [SUGGERIMENTO] H4 · Trattino della timeline letto come paragrafo
- **Dove:** sezione #fondatore, tappa 2, colonna «Quando».
- **Attuale** (letto dallo screen reader): «—».
- **Proposta:** `aria-hidden="true"` sul trattino. La tappa si capisce anche senza data.
- **Motivazione:** un segno grafico non deve essere letto. Decide ux-designer.

### [SUGGERIMENTO] H5 · Legenda senza «regionale»: corretta, ma il copy deck va allineato
- **Dove:** `index.astro:64`, «Il palco dell’evento Puglia Digitale».
- **Nota:** il copy deck della Home (§ 3) dice ancora «Il palco dell’evento regionale Puglia Digitale». Il sito fa bene a togliere «regionale» (alt-text.md, criterio 9; brief A2). Va aggiornato il copy deck (copywriter-brand), non il sito.

---

## SIII (/siii/)

### [SUGGERIMENTO] S1 · Azione e complemento letti senza pausa
- **Dove:** `src/pages/siii.astro:26`, elenco «Cosa si può fare dentro un SIII».
- **Attuale** (screen reader, e testo che estraggono i motori): «Interagire con gli hotspot i punti attivi che aprono contenuti e azioni.»
- **Corretto:** una virgola visivamente nascosta dopo l’azione (`Interagire con gli hotspot<span class="sr-only">,</span>`), così si legge «Interagire con gli hotspot, i punti attivi che aprono contenuti e azioni.». In alternativa si cambia il testo del complemento in «per aprire contenuti e azioni.», ma si perde l’unica definizione di «hotspot» della pagina.
- **Motivazione:** punteggiatura. Le altre sei voci si leggono bene anche di seguito.

### [SUGGERIMENTO] S2 · Didascalia della figura: «guardi» anche nel SIII
- **Dove:** `siii.astro:134`.
- **Attuale:** «SIII · apri, guardi, chiedi, prenoti»
- **Corretto:** «SIII · apri, esplori, chiedi, prenoti»
- **Motivazione:** il selettore oppone «Tour 360° — guardi» a «SIII — agisci». Se il SIII «guarda» anche lui, il contrasto si indebolisce. Gli altri testi della figura sono corretti e coerenti con il Blocco C e con la tabella: la legenda, «Tour 360° · ti guardi intorno» e le due didascalie.

### [SUGGERIMENTO] S3 · Beneficio 03, frase unica da 25 parole (Gulpease 44)
- **Dove:** `siii.astro:212`.
- **Attuale:** «Prodotti e servizi si mostrano nel loro contesto reale, e il passo successivo parte dallo stesso ambiente: una richiesta, una prenotazione, un’azione commerciale.»
- **Corretto:** «Prodotti e servizi si mostrano nel loro contesto reale. E il passo successivo parte dallo stesso ambiente: una richiesta, una prenotazione, un’azione commerciale.» (Gulpease 57)
- **Motivazione:** tone of voice § 3.7. Le parole non cambiano. Allineo io il copy deck.

---

## Puglia Digitale (/puglia-digitale/)

### [BLOCCANTE] P1 · Nota sotto i numeri: «Dati ITnode.» · = B3 di brand-strategist
- **Dove:** `src/data/figures.ts:11`, che usa il ripiego senza data.
- **Attuale:** «Dati ITnode.»
- **Corretto:** la formula di B3, quando arrivano i dati: «Città: dati ITnode, aggiornati a [mese anno]. Partite IVA e tessuto produttivo: elaborazione ITnode su dati [fonte], [anno].» `[DA FORNIRE: mese, anno e fonti, N1–N3]`
- **Motivazione:** il copy deck ammetteva la nota senza data solo con una decisione di brand-strategist. Brand-strategist ha deciso di no.

### [SUGGERIMENTO] P2 · «Visita il portale ↗» nella chiusura
- **Dove:** `puglia-digitale.astro:165`, tra l’H2 «Porta la tua impresa dentro Puglia Digitale.» e il form «Contattaci».
- **Problema:** non è nel copy deck, dove la chiusura porta al form, e su Città Digitali la chiusura equivalente non ce l’ha. Il testo è corretto.
- **Proposta:** toglierlo, oppure metterlo su entrambe le pagine. Decide cro-specialist (strategia di conversione, § 4).

---

## Città Digitali (/citta-digitali/)

### [BLOCCANTE] C1 · «La forza di un portale ad alto traffico» · = B2 di brand-strategist
- **Dove:** `src/pages/citta-digitali.astro:113`.
- **Attuale:** «La forza di un portale ad alto traffico» (titolo del cliente, § 20).
- **Corretto**, se il traffico non viene documentato prima del lancio: «La forza di un portale nazionale». Il testo sotto resta invariato: è già qualitativo.
- **Motivazione:** «ad alto traffico» afferma un dato che non c’è (N8, N10); soglia 1. È la formula di riserva del brief e del copy deck.

### [BLOCCANTE per G4] C2 · Video senza descrizione testuale
- **Dove:** sezione «Città Digitali, in movimento.».
- **Attuale:** «Il progetto Città Digitali, raccontato per immagini.»: presenta il video, ma non lo descrive.
- **Proposta:** una descrizione di 3–5 frasi in un blocco richiudibile sotto il player («Leggi la descrizione del video»), più i sottotitoli se nel video si parla. La scrivo io appena posso vedere il video: railway.app è bloccato da questo ambiente. Se il video non ha audio, va tolto il pulsante «Audio».
- **Motivazione:** soglia 2 (WCAG 1.2.1, 1.2.3 e 1.2.5; 1.2.2 se c’è parlato).

**Verifica della differenza voluta.** Il sottotitolo verbatim «Tour virtuali, Siti Immersivi Interattivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano.» è corretto e senza link, come previsto finché manca DR2. Nella stessa pagina il Blocco E scrive «Siti Interattivi Immersivi»: l’incoerenza si risolve solo con la decisione DR2.

---

## Contatti (/contatti/)

### [IMPORTANTE] K1 · Blocco del fondatore non previsto e citazione fuori contesto
- **Dove:** `src/pages/contatti.astro:140-155` (figura, H2 «Giacomo Lenoci / Fondatore di ITnode», citazione alla riga 153).
- **Attuale:** «È questo il futuro che mi appassiona e che stiamo costruendo giorno dopo giorno.», subito dopo il form.
- **Problema:** il blocco non è nel copy deck di Contatti. Soprattutto, «È questo il futuro» rimanda al racconto che precede la citazione nella Home (copy deck Home, § 6). Qui viene dopo il form e «questo» non si riferisce a niente: la frase del cliente cambia significato.
- **Corretto:** togliere la citazione da Contatti e tenere ritratto, nome, ruolo e nota AI. Se serve un collegamento, si può aggiungere un link alla sezione #fondatore della Home. Non si scrive una frase nuova da attribuire al fondatore.
- **Motivazione:** i testi del cliente si usano senza cambiarne il significato (tone of voice § 3.6). Il nome resta `[DA VERIFICARE: F7]`. Decide creative-director.

### [SUGGERIMENTO] K2 · «Preferisci parlarne a voce? Chiamaci al …» sotto il pulsante
- **Dove:** `ContactForm.astro:220`, su tutte e quattro le pagine con il form.
- **Nota:** la riga viene da `docs/ux/struttura-pagine.md` ed è corretta. Su /contatti/, però, è ridondante: telefono, cellulare ed email sono nel blocco «Recapiti», subito sopra, e il copy deck di Contatti v1.1 l’aveva tolta per questo. Proposta: nasconderla solo su /contatti/. Decide ux-designer.

### [SUGGERIMENTO] K3 · Title diverso dalla mappa SEO
- **Dove:** `src/data/pages.ts` (voce di /contatti/).
- **Attuale:** «Contatti, Acquaviva delle Fonti (BA) | ITnode». La mappa SEO (§ 2) e il copy deck hanno «Contatti | ITnode, Acquaviva delle Fonti (BA)».
- **Proposta:** tenere la versione del sito, che ha lo stesso suffisso « | ITnode» delle altre pagine, e allineare la mappa (seo-content).

### [SUGGERIMENTO] K4 · Indirizzo nella meta description
- **Attuale:** «…ITnode, Via Sant’Anna 34, Acquaviva delle Fonti (BA). Tel. 080 2466520.»
- **Corretto:** «…ITnode, Via Sant’Anna, 34, Acquaviva delle Fonti (BA). Tel. 080 2466520.» (155 caratteri)
- **Motivazione:** stessa forma dell’indirizzo in footer, pagina e dati strutturati (mappa SEO, § 3.5).

**Verifica della differenza voluta.** «Profilo personale del fondatore» è corretta: etichetta breve, senza punto finale (tone of voice § 8). L’alt del ritratto, «Giacomo Lenoci in abito scuro, sorridente.», corrisponde al ritaglio `fondatore-contatti`.

---

## Privacy Policy (/privacy-policy/)

### [BLOCCANTE per G4] L1 · Avviso «Testo in preparazione»
- **Dove:** `src/pages/privacy-policy.astro:19`.
- **Attuale:** «Testo in preparazione. Qui trovi ciò che è già certo; l’informativa completa, validata dal consulente privacy di ITnode, sarà pubblicata prima del lancio del sito.»
- **Problema:** come avviso per l’anteprima è corretto. Online, però, «prima del lancio del sito» diventa falso il giorno stesso del lancio, e un’informativa parziale non basta (art. 13 GDPR).
- **Proposta:** al go-live, l’informativa completa del consulente al posto dell’avviso e del testo breve.
- **Motivazione:** soglie 1 e 5.

### [IMPORTANTE] L2 · La meta description promette contenuti che la pagina non ha
- **Dove:** `src/data/pages.ts:63`.
- **Attuale:** «Come ITnode tratta i dati personali raccolti con il sito e il modulo di contatto: titolare, finalità, basi giuridiche, tempi di conservazione e diritti.»
- **Corretto**, finché il testo resta breve: «Come ITnode tratta i dati personali inviati con il modulo di contatto: chi è il titolare, quali dati raccoglie, perché li usa e quali diritti hai.» (146 caratteri). Con l’informativa completa torna valida la versione attuale.
- **Motivazione:** la pagina non parla né di basi giuridiche né di tempi di conservazione.

### [IMPORTANTE] L3 · «Il sito raccoglie dati personali solo quando compili il modulo di contatto.»
- **Dove:** `privacy-policy.astro:29`.
- **Problema:** non è un fatto certo, eppure la pagina promette «ciò che è già certo». Chi ospita il sito di norma registra dati tecnici di navigazione, come l’indirizzo IP, che sono dati personali. In più, oggi il modulo non invia niente: prepara un’email.
- **Corretto:** «Il sito raccoglie i dati che inserisci nel modulo di contatto. I campi sono:». La frase sui dati di navigazione la scrive il consulente, quando è noto l’hosting. `[DA VERIFICARE con il consulente privacy e con seo-technical per l’hosting]`
- **Motivazione:** soglie 1 e 5.

### [IMPORTANTE] L4 · «I tuoi diritti»: elenco parziale, manca il reclamo al Garante
- **Dove:** `privacy-policy.astro:49`.
- **Attuale:** «Puoi chiedere in ogni momento di accedere ai tuoi dati, di correggerli o di cancellarli scrivendo a info@itnode.it.»
- **Corretto:** «Puoi chiedere in ogni momento di accedere ai tuoi dati, di correggerli o di cancellarli, e di esercitare gli altri diritti previsti dagli articoli 15–22 del GDPR, scrivendo a info@itnode.it. Puoi anche presentare reclamo al Garante per la protezione dei dati personali.»
- **Motivazione:** così com’è, l’elenco sembra completo. Diritti e reclamo sono previsti dalla legge (art. 13, par. 2, lett. b e d, GDPR), non sono dati del cliente. `[DA VERIFICARE con il consulente]`

### [SUGGERIMENTO] L5 · Frase del titolare, catena di virgole
- **Dove:** `privacy-policy.astro:23`.
- **Attuale:** «Il titolare del trattamento è ITNODE S.r.l., Via Sant’Anna, 34, 70021 Acquaviva delle Fonti (BA), partita IVA 08937270729.»
- **Corretto:** «Il titolare del trattamento è ITNODE S.r.l., con sede in Via Sant’Anna, 34 – 70021 Acquaviva delle Fonti (BA), partita IVA 08937270729.» `[DA VERIFICARE: la sede legale, S3]`
- **Motivazione:** leggibilità. Il trattino medio nell’indirizzo è la forma della riga legale (microcopy, § 3).

### [SUGGERIMENTO] L6 · Elenco dei campi, articoli non uniformi
- **Attuale:** «…azienda o ente, facoltativo; i progetti che ti interessano, facoltativo; il messaggio, facoltativo.»
- **Corretto:** «…azienda o ente, facoltativo; progetti che ti interessano, facoltativo; messaggio, facoltativo.»
- **Motivazione:** le prime quattro voci sono senza articolo.

---

## Cookie Policy (/cookie-policy/)

### [IMPORTANTE] Q1 · L’introduzione promette «come puoi gestirli», ma la pagina non lo spiega
- **Dove:** `src/pages/cookie-policy.astro:17`.
- **Attuale:** «Questa pagina spiega quali cookie e strumenti simili usa il sito di ITnode, a che cosa servono e come puoi gestirli.»
- **Corretto:** una sezione breve «Come gestire i cookie»: «Puoi bloccare o cancellare i cookie dalle impostazioni del tuo browser. Se blocchi i cookie tecnici, alcune parti del sito potrebbero non funzionare.» (Gulpease 61). Se non si aggiunge la sezione, l’introduzione diventa: «Questa pagina spiega quali cookie e strumenti simili usa il sito di ITnode e a che cosa servono.» `[DA VERIFICARE con il consulente]`
- **Motivazione:** la promessa e il contenuto devono coincidere.

### [SUGGERIMENTO] Q2 · «Siti collegati», frase lunga (Gulpease 49)
- **Attuale:** «Le esperienze immersive e i portali collegati, come Città Digitali e Puglia Digitale, si aprono in una nuova scheda e sono siti distinti, ciascuno con la propria informativa.»
- **Corretto:** «Le esperienze immersive e i portali collegati, come Città Digitali e Puglia Digitale, sono siti distinti, ciascuno con la propria informativa. Si aprono in una nuova scheda.» (Gulpease 59)

**Verifica delle differenze volute.** Il paragrafo sulle anteprime in iframe è stato tolto, ed è coerente con il sito: su /siii/ ci sono solo link esterni. «Gli unici cookie che può usare sono tecnici, necessari al suo funzionamento: non richiedono il tuo consenso.» è corretta. La nuova meta description è corretta, coerente con il testo e lunga 145 caratteri.

---

## 404

### [SUGGERIMENTO] N1 · «home page» nella meta description
- **Dove:** `src/data/pages.ts:77`.
- **Attuale:** «…Riparti dalla home page di ITnode oppure esplora SIII, Puglia Digitale e Città Digitali.»
- **Corretto:** «…Riparti dalla home di ITnode oppure esplora SIII, Puglia Digitale e Città Digitali.» (139 caratteri: la pagina è `noindex`, quindi il limite di 140 non vincola)
- **Motivazione:** stessa parola della CTA «Torna alla home».

**Verifica della differenza voluta.** I testi coincidono con la microcopy, § 9: occhiello, H1, testo, i tre mondi, contatto, ritorno alla home e segnalazione. La numerazione 01–03 è sostituita dai rilevamenti 000°, 120° e 240°, nascosti agli screen reader.

---

## Leggibilità

Indice Gulpease calcolato con uno script sui paragrafi di `main` di almeno 8 parole, dall’albero di accessibilità (89 + (300 × frasi − 10 × lettere) / parole). Obiettivo: almeno 60 per i testi rivolti a tutti, almeno 50 per quelli descrittivi.

| Pagina | Gulpease | Paragrafo più basso |
|---|---|---|
| Home | 54,8 | Lead del Manifesto (49). Con la versione di H1 sale a 52. |
| SIII | 63,4 | Beneficio 03 (44), vedi S3 |
| Puglia Digitale | 64,0 | Blocco D (46), blocco di risposta SEO |
| Città Digitali | 63,8 | Sottotitolo verbatim del cliente (42) |
| Contatti | 66,9 | Descrittore di Puglia Digitale (45), testo del cliente |
| Privacy Policy | 61,5 | «I tuoi diritti» (57) |
| Cookie Policy | 58,1 | «Siti collegati» (49), vedi Q2 |
| 404 | 75,3 | — |

## Verdetto di dominio (correzione di bozze)

**Non pronto per il go-live.** Le bozze sono quasi pulite: niente errori di apostrofi, virgolette, accenti o grafie dei nomi, e i verbatim del cliente sono fedeli. Si possono correggere subito, senza aspettare il cliente, H1 (tornare al testo provvisorio del copy deck, anche nel JSON-LD), T1, K1, L2, L3, L4 e Q1, più C1 se il traffico non verrà documentato. Restano bloccanti per G4, perché dipendono da materiali del cliente, T2 (asset), T3 (dati societari), C2 (video), L1 (informativa completa) e i punti di veridicità P1 e H2, che decidono brand-strategist e il cliente. Il verdetto di gate spetta al creative-director.

## Ipotesi da validare

- [IPOTESI: «Ha creato» nella Home non viene da una decisione registrata. Nel brief A1 è ancora «Da verificare» e in `docs/decisioni/` c’è solo l’ADR 001, sullo stack.]
- [IPOTESI: l’hosting registrerà dati tecnici di navigazione, come l’indirizzo IP. In `dist/` ci sono `_headers` e `_redirects`, tipici di un hosting statico con CDN.] `[DA VERIFICARE con seo-technical]`
- [IPOTESI: il video di Città Digitali ha una traccia audio, visto che il player ha il pulsante «Audio».]

## Domande aperte

- **Per il cliente** (tramite la sessione principale): ruolo di ITnode in Puglia Digitale (D1); dati societari da visura (S1–S4); informativa privacy completa; file del video raggiungibile, oppure la sua descrizione, con presenza di parlato e durata; documentazione del traffico del portale (N8, N10); mese, anno e fonti dei numeri di Puglia Digitale (N1–N3); che cosa è stato modificato con Gemini nella foto dell’evento (D9).
- **Per ux-designer:** separatori nei titoli su due righe (T6); coordinate e trattino della timeline nascosti agli screen reader (T10, H4); riga «Preferisci parlarne a voce?» su /contatti/ (K2); occhielli della hero (T11).
- **Per cro-specialist:** link al portale nella chiusura di Puglia Digitale (P2).
- **Per seo-content:** title di Contatti nella mappa (K3); separatore negli H1 (T6).
- **Per ui-designer:** domini ed email senza maiuscolo (T7).

## Decisioni richieste

- **Utente:** D1 e l’attribuzione nella Home (H1); DR2 per il sottotitolo di Città Digitali; etichetta «Email aziendale *» o «Email *». Oggi il sito usa la variante «Email aziendale *» con l’aiuto «Va bene anche un indirizzo personale: ti risponderemo lì.»: è corretta, ma la decisione è ancora aperta (microcopy, § 4.2). Titolo «36 anni…», da aggiornare ogni anno.
- **brand-strategist:** nota sotto i numeri (P1 = B3) e titolo del concetto 05 (C1 = B2).
- **creative-director:** blocco del fondatore e citazione in Contatti (K1).
- **Consulente legale del cliente:** nota AI sulla foto dell’evento (H2); testi completi di Privacy Policy e Cookie Policy (L1–L4, Q1).
