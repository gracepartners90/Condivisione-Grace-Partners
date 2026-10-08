---
titolo: Legenda della carta del capitolo 03 della Home e testi collegati
owner: copywriter-brand
contributi: []
stato: in revisione
versione: 1.4
aggiornato: 2026-10-08
fonti: [docs/review/2026-10-08-carta-citta-digitali-nomi-ux-designer.md, commit 426e6dc e 5f2f757, richiesta della sessione principale del 2026-10-05 e del 2026-10-06, docs/review/2026-10-06-carta-puglia-intera-ui-designer.md (P2, P3), src/data/citta-digitali.json, src/lib/citta-digitali.ts, docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md (P2, P4, §4), docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md (§1–§3), docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md (P1–P4), dist/citta-digitali/index.html (testo della sezione e schede), docs/creativa/direzione-visiva.md 0.6 (§1.4, «Il punto-città»: accessibilità, legenda, elenco in testo; commit ea33cc1), docs/strategia/citta-digitali-elenco.md v0.2 (§1, §4, §5), docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md (§3, §5, O7), docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, docs/cro/strategia-conversione.md (righe 37–38 e 68), docs/contenuti/tone-of-voice.md (§§ 4, 5, 6, 7, 8), docs/contenuti/microcopy.md (§§ 3, 8), docs/contenuti/copy-deck/home.md (§ 5), src/pages/index.astro (anche le modifiche in corso della sessione principale), src/pages/citta-digitali.astro, src/components/layout/Footer.astro, src/data/site.ts, build di prova di ui-designer (scratchpad ui-mappa/site/dist) servita in locale, dist/ del 2026-10-05, misure Playwright (Chromium) del 2026-10-05]
---

# Legenda della carta del capitolo 03 · testi

**Oggetto.** I testi che accompagnano la nuova carta di Città Digitali nel capitolo 03 della Home: un puntino per città e il nome solo dove c’è spazio (proposta di ui-designer, P4). Riguarda la legenda sotto la carta, il link verso l’elenco delle città, il testo del capitolo e la descrizione della carta per chi usa uno screen reader. In fondo c’è l’allineamento dei miei documenti al dominio cittàdigitali.it.

**Versione 1.1: allineata alle decisioni del 2026-10-05.**
- **creative-director** (direzione visiva 0.6, §1.4): adotta la legenda della versione 1.0, «Ogni punto è una città di Città Digitali». Accetta la ripetizione come costo del nome del marchio. Niente numero nella Home, niente link nella legenda.
- **ux-designer** (review della carta, §3): la carta diventa un’immagine con una descrizione costruita dai dati (`role="img"`). Il link all’elenco va su `/citta-digitali/`, con il mio testo. Le due frasi della descrizione su regioni e nomi le rifinisco io (L4).
- Il mio link interno dalla Home, proposto nella versione 1.0, cade (L2).

**Come ho lavorato.**
- Ho letto la proposta di ui-designer, la review di ux-designer, la direzione visiva 0.6, l’elenco di brand-strategist (§4, veridicità), le review di seo-content e seo-technical sul dominio e la regola sui link esterni della strategia di conversione.
- Ho servito in locale la build di prova di ui-designer, con la carta a 45 puntini, e ho iniettato i testi candidati nella `figcaption`. Ho misurato gli a capo con uno script fino a 13 larghezze, da 320 a 1920 px, e a 8 larghezze anche con la spaziatura del testo di WCAG 1.4.12.
- Lunghezze e Gulpease sono calcolati con uno script.
- Nessun file in `src/` modificato.

## In sintesi: testi pronti

| Elemento | Testo | Car. | Stato |
|---|---|---|---|
| Legenda, `figcaption`, `t-label` | Ogni punto è una città di Città Digitali | 40 | **Adottata** (direzione visiva 0.6). Spazi unificatori tra «di», «Città» e «Digitali». Già così nelle modifiche in corso di `index.astro` |
| Descrizione della carta (`aria-label`) | Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Manfredonia, Itri, Bari, Altamura, Massafra, Cosenza, Caltanissetta e Caltagirone. | 241 | **Da applicare.** Rifinitura della terza frase, con le regole di L4. Il codice in corso ha ancora «Hanno il nome sulla carta…» |
| Link all’elenco, su `/citta-digitali/` | Tutte le città sul portale ↗ | 26 (28 con l’icona) | **Adottato** (ux-designer, direzione visiva 0.6). Nome accessibile: «Tutte le città sul portale Città Digitali (si apre in una nuova scheda)» |
| Link nella Home | Nessuno | — | Decisione di ux-designer e del creative-director; sono d’accordo (L2) |
| Testo del capitolo | Invariato | 152 | Non va ritoccato (L3) |

Gli stessi testi sono nel copy deck della Home (v1.4, § 5, «Capitolo 03 con la carta di tutte le città»), da cui la sessione principale li applica.

---

## L1 · [IMPORTANTE] Legenda: «Ogni punto è una città di Città Digitali» (adottata)

- **Dove.** `src/pages/index.astro`, capitolo 03, `<figcaption class="worlds__atlas-note t-label">`.
- **Problema.** Le due proposte di ui-designer avevano un limite ciascuna.
  - «Un punto per ogni città di Città Digitali» dichiara che l’elenco è completo: ogni città ha il suo punto.
    - È vera solo finché ogni città dell’elenco ha il suo punto. Oggi sono 45 su 45, con l’eccezione su Martina Franca.
    - Si regge su un elenco letto da un riassunto dell’indice, ancora `[DA VERIFICARE]`.
    - Diventa falsa il giorno in cui il portale aggiunge una città e la carta non viene aggiornata. Il portale ha una pagina «Franchising»: l’elenco è fatto per crescere.
  - «Le città di Città Digitali» è sempre vera, ma è un titolo, non una legenda: lascia indovinare che i puntini senza nome sono città.
- **Motivazione.**
  - Soglia 1, veridicità: una dichiarazione di completezza è un claim quantitativo implicito. Vale la stessa regola del numero (`citta-digitali-elenco.md` §4).
  - «Ogni punto è una città…» rovescia la frase: dice qualcosa di ogni punto, non di ogni città. È vera per ciascun punto pubblicato e resta vera se il portale cresce. «Punto» vale anche per i nodi con il nome, che sono punti più grandi.
  - Voce: è testo d’interfaccia, funzionale e senza battute (tone of voice, § 4). Niente numero, niente superlativo, niente punto finale, come le etichette (§ 8). Il maiuscolo lo applica il CSS.
- **Testo.**
  > Ogni punto è una città di Città Digitali
  - Nel sorgente: `Ogni punto è una città di&nbsp;Città&nbsp;Digitali`, come nelle modifiche in corso di `index.astro`. Il nome del marchio non si spezza, e la preposizione resta con il nome.
  - **Misure sulla build di prova**, con la carta a 45 puntini (tabella «Misure»):
    - una riga da 360 a 1920 px; a 390 px occupa 309 px su 350, a 1440 px 351 su 480;
    - a 320 px due righe: «Ogni punto è una città / di Città Digitali». Senza gli spazi unificatori l’a capo cadrebbe dopo «di»;
    - con la spaziatura di WCAG 1.4.12 va su due righe dove la carta è larga fino a circa 400 px, e su una da 435 px. Mai testo tagliato o fuori dalla carta.
  - Gulpease 85.
- **Numero.** La direzione visiva 0.6 lo tiene fuori dalla Home: quando ci saranno le condizioni di brand-strategist, andrà nell’elenco di `/citta-digitali/`, con la data. È quello che avevo proposto.
  - Per la data vale la nuova regola del tone of voice (§ 7): «aggiornato a ottobre 2026», «ad aprile 2026»; «al» solo con il giorno. La forma «elenco al [mese anno]» della proposta di ui-designer non va usata.
- **[SUGGERIMENTO] Nota per il creative-director, non bloccante.** Con la carta diventata immagine, lo screen reader legge «Città Digitali» due volte di fila: la descrizione comincia con «Carta d’Italia con le città di Città Digitali.», poi arriva la legenda.
  - Se si vuole evitarlo, la correzione più economica è nella legenda: «Ogni punto è una città del portale» (34 caratteri).
    - Il nome del progetto lo dà già la descrizione, e «del portale» riprende «un unico portale» del testo.
    - Sta su una riga a tutte le larghezze misurate, anche a 320 px.
  - Non lo chiedo: la ripetizione è breve e la decisione è presa. Lo segnalo perché la descrizione è stata decisa in parallelo alla legenda.

## L2 · [IMPORTANTE] Link all’elenco: su `/citta-digitali/`, non nella Home (adottato)

- **Dove.** Home, capitolo 03; `/citta-digitali/`, sezione «L’Italia in un unico portale.» (`#portale`).
- **Decisione** di ux-designer (review della carta, §3.2 e §3.3), confermata dal creative-director (direzione visiva 0.6). La condivido.
  - Nella Home nessun link nel capitolo: resta una sola CTA, come nei capitoli 01 e 02 (HM-5). La regola della strategia di conversione è rispettata: «Nei capitoli della home niente link esterni: prima si approfondisce sul sito, i portali stanno nelle pagine dedicate» (riga 68).
  - Su `/citta-digitali/`, nella colonna del testo di «L’Italia in un unico portale.», dopo lo statement, un link alla pagina «Tutte le città» del portale, con il mio testo.
- **Il mio link interno della versione 1.0** («Tutte le città →» dalla Home all’elenco) cade. Avrebbe aggiunto un secondo elemento focalizzabile al capitolo, e la CTA «Esplora Città Digitali →» porta già alla pagina dell’elenco.
- **Testo del link su `/citta-digitali/`.**

  | Campo | Valore |
  |---|---|
  | Testo visibile | Tutte le città sul portale |
  | Icona | **↗, non →**: esce dal sito e apre una nuova scheda (tone of voice, § 6, regola 3). L’esempio della richiesta aveva → |
  | Testo nascosto, dopo il testo visibile | « Città Digitali (si apre in una nuova scheda)» |
  | Nome accessibile | Tutte le città sul portale Città Digitali (si apre in una nuova scheda) |
  | Destinazione | `https://xn--cittdigitali-19a.it/tutte-le-citta/`: punycode, `https`, senza www (specifiche SEO, §5.3) `[DA VERIFICARE: indirizzo esatto da una rete che raggiunge il portale]` |
  | Attributi | `target="_blank" rel="noopener"`, senza `noreferrer` (strategia di conversione, riga 38) |
  | Tracciamento | Quello dello snippet di ux-designer (`cd-portale-tutte-le-citta`, posizione `portale`), da confermare con cro-specialist |

- **Perché un’etichetta senza verbo.** La regola delle CTA chiede verbo e oggetto (tone of voice, § 6, regola 1). Qui il testo nomina la destinazione: la pagina del portale si chiama «Tutte le città» (indice di ricerca, `citta-digitali-elenco.md` §1).
  - È lo stesso schema dei link che nominano un portale, come «cittàdigitali.it ↗» nel footer: chi clicca trova il titolo che il link gli ha promesso.
  - Sta nei 28 caratteri della regola, icona compresa. Con un verbo, «Vedi tutte le città sul portale ↗», arriverebbe a 33, senza dire di più.
- **Accanto a «Visita il portale ↗»** della hero le due etichette non si confondono: una porta alla home del portale, l’altra al suo elenco delle città.
- **Registrato nel tone of voice** (v1.3, § 6): la riga del link nella tabella delle CTA e, nella regola 1, l’eccezione dei link che nominano la loro destinazione.
- **Per copywriter-content:** il link va anche nel copy deck di Città Digitali, nella sezione «L’Italia in un unico portale».

## L3 · [SUGGERIMENTO] Testo del capitolo: resta com’è

- **Dove.** `src/pages/index.astro`, capitolo 03, `text`; copy deck della Home, § 5.
- **Testo.** «Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per imprese e attività. Varese, Altamura, Caltanissetta: città diverse, un unico portale.» (152 caratteri su 160, Gulpease 56).
- **Perché non cambia.**
  - Resta vero con la carta piena. Le tre città del testo sono i nomi obbligatori della carta, visibili a ogni larghezza (proposta di ui-designer, P2; direzione visiva 0.6): testo e carta dicono la stessa cosa.
  - Non contiene numeri e non suggerisce una copertura dell’Italia intera (brief, N12).
  - Nomina solo le tre città certe, quelle delle linee guida (§ 18). Le altre restano `[DA VERIFICARE]` finché non arriva il testo della pagina del portale (`citta-digitali-elenco.md`, §4).
  - seo-content arriva alla stessa conclusione (review sull’omonimia, §3).
- **Scartate.**
  - «Da Varese a Caltanissetta…»: suggerisce una copertura continua da nord a sud (N12).
  - «… e molte altre»: una quantità vaga è comunque un claim.
  - «… e le altre città sulla carta»: rimanda a una carta che non tutti vedono.

## L4 · [IMPORTANTE] Descrizione della carta: rifinitura

- **Dove.** `src/pages/index.astro`, `mapLabel` (snippet di ux-designer, §3.1, già nelle modifiche in corso), passato a `MapItaly` come `aria-label` di un `role="img"`.
- **Decisione di ux-designer:** la carta è un’immagine con una descrizione costruita dagli stessi dati della carta. La prima frase è la mia etichetta della versione 1.0, «Carta d’Italia con le città di Città Digitali.»; le altre due le rifinisco io (anche la direzione visiva 0.6 lo prevede).
- **Testo di ux-designer** (255 caratteri, Gulpease 58,5): «… Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Hanno il nome sulla carta Varese, Manfredonia, Itri, Bari, Altamura, Massafra, Cosenza, Caltanissetta e Caltagirone.»
- **Problema.** La terza frase ha due difetti.
  - Il soggetto arriva dopo il verbo, in fondo a un elenco di nove nomi: all’ascolto si capisce tardi chi «ha il nome».
  - Sulle carte strette, cioè sui telefoni, i nomi disegnati sono 5, non 9: su un telefono «hanno il nome sulla carta» è falso per quattro città. La scelta di ux-designer di dire comunque i 9 nomi è giusta: a chi non vede va almeno quello che vede chi ha la carta più ricca. È la frase che non deve legarli al disegno.
- **Proposta.**
  > Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Manfredonia, Itri, Bari, Altamura, Massafra, Cosenza, Caltanissetta e Caltagirone.
  - 241 caratteri, Gulpease 59,3. «Tra queste» presenta i nomi come esempi: è vero a ogni larghezza.
  - **Modello per il codice:** `Carta d’Italia con le città di Città Digitali. Sono in ${regioni}, ${quota} ${regione}. Tra queste: ${nomi}.`
- **Regole, perché resti vera con qualunque dato.**
  - **Regioni:** da nord a sud, con «e» prima dell’ultima, come nello snippet.
  - **«la maggior parte in»** solo se quella regione ha più della metà delle città: oggi la Puglia ne ha 31 su 45 (69%). Altrimenti «più che altrove in», che è vera per costruzione.
  - **Preposizione:** «in» va bene per le sei regioni di oggi. Se la regione con più città diventasse il Lazio, servirebbe «nel». Il controllo `REGIONS` dello snippet obbliga già a rivedere il codice quando entra una regione nuova: va rivista anche la frase.
  - **Nomi:** quelli che il creative-director tiene sulla carta larga, da nord a sud. Se al go-live restano solo i tre obbligatori (direzione visiva 0.6, «Veridicità»), la frase diventa «Tra queste: Varese, Altamura e Caltanissetta.» (descrizione di 184 caratteri, Gulpease 69).
  - **Mai un numero**, finché mancano le condizioni di brand-strategist. Mai «ogni città» o «tutte»: la descrizione, come la legenda, non dichiara che l’elenco è completo.

## L5 · [IMPORTANTE] Dominio nei miei documenti (osservazione O7 di seo-content)

- **Dove.** `docs/contenuti/tone-of-voice.md`, § 5 (righe «Città Digitali» e «Domini»); `docs/contenuti/microcopy.md`, § 3 (footer, Portali).
- **Problema.** I due documenti scrivevano il portale senza accento, «cittadigitali.it», come le linee guida (§ 22). È un progetto omonimo di altri. Il portale del cliente è cittàdigitali.it, confermato dall’utente il 2026-10-05.
- **Fatto.**
  - **Tone of voice, v1.3.**
    - La riga «Domini» scrive cittàdigitali.it e spiega da dove viene l’eccezione alle linee guida: testo visibile e nomi accessibili in Unicode, con la «à» composta; `href` in punycode (specifiche SEO, §5.3); mai la forma senza accento, nemmeno a stampa.
    - La riga «Città Digitali» vieta «CITTA’ DIGITALI», che è il nome dell’omonimo.
  - **Microcopy, v1.2.** Footer, blocco Portali: «cittàdigitali.it ↗». Nome accessibile: «cittàdigitali.it, portale di Città Digitali (si apre in una nuova scheda)». È come nel sito, verificato su `dist/` il 2026-10-05.
- **Restano**, nei documenti di copywriter-content: `copy-deck/contatti.md`, righe 145–147 e 155, e `copy-deck/citta-digitali.md`, righe 57, 78 e 254. Li corregge il loro owner (O7).

## L6 · [IMPORTANTE] Descrizione della carta su `/citta-digitali/`: senza «Tra queste»

> **Superata il 2026-10-08** (L8): dal commit 426e6dc la carta di `/citta-digitali/` disegna anche dei nomi. La regola di fondo resta: la descrizione non ripete le città che chi ascolta sente accanto alla carta.

- **Dove.** `/citta-digitali/`, «L’Italia in un unico portale.» (`#portale`): proposta di ui-designer (`docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md`, P3), che dà alla carta `role="img"` con la forma di L4 a tre nomi.
- **Problema.** Su questa pagina «Tra queste: Varese, Altamura e Caltanissetta.» ripete nomi che chi usa uno screen reader ha appena sentito, e che sente di nuovo subito dopo.
  - Prima della carta: il paragrafo («… città come Varese, Altamura e Caltanissetta.») e lo statement («Da Varese a Caltanissetta, passando per Altamura…»).
  - Subito dopo la carta e la legenda: le tre schede, ciascuna con il nome (H3) e la regione, letta anche dallo screen reader: «Lombardia», «Puglia», «Sicilia».
  - Qui la carta non disegna nomi: i tre nodi più grandi corrispondono alle schede. «Tra queste» presenta i nomi come esempi presi dalla carta, ma la carta non ne mostra.
- **Motivazione.**
  - WCAG 1.1.1 si valuta nel contesto. La sola informazione che la carta aggiunge al testo accanto è dove stanno tutte le altre città. Che le tre in evidenza siano Varese, Altamura e Caltanissetta, e in quale regione, lo dicono il paragrafo e le schede.
  - È anche il criterio di ux-designer: nessun nome che la carta non mostri (review della mappa, §1).
  - Nella Home la terza frase serve, perché lì i nomi sono disegnati sulla carta e il testo accanto ne nomina solo tre.
- **Testo per `/citta-digitali/`:**
  > Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia.
  - 138 caratteri, Gulpease 67. Valgono le regole di L4 per la quota e per la preposizione.
- **Per la funzione condivisa** (`describeCittaDigitali`, P4 di ui-designer): la frase «Tra queste: …» si scrive solo quando la carta disegna dei nomi. La pagina passa un elenco vuoto, e la frase non c’è. La Home non cambia.
- **Legenda:** L1 anche qui, «Ogni punto è una città di Città Digitali».

## L7 · [IMPORTANTE] Carta della Puglia intera nella hero di `/puglia-digitale/` (2026-10-06)

- **Dove.** Proposta di ui-designer, `docs/review/2026-10-06-carta-puglia-intera-ui-designer.md` (P3): 31 punti, uno per ogni città di Puglia Digitale, nomi dove c’è spazio, anello della sede su Acquaviva delle Fonti; funzione `describePugliaDigitale` in `src/lib/citta-digitali.ts`.
- **Condizioni** (brand-strategist, `citta-digitali-elenco.md` 0.3, §4): si può dire «città di Puglia Digitale»; nessuna formula che attribuisca Puglia Digitale a ITnode (D1 aperta); niente «tutta la Puglia»; nessun numero.
- **Legenda**, nella forma di L1:
  > Ogni punto è una città di Puglia Digitale
  - 41 caratteri, spazi unificatori in «di Puglia Digitale». Una riga da 390 px; a 320 px «Ogni punto è una città / di Puglia Digitale» (misure di ui-designer, P3).
  - Preferita alle formule di brand-strategist: «Le città di Puglia Digitale» non spiega il segno; «Città virtualizzate con Puglia Digitale» usa un termine tecnico che il tone of voice non adotta. La forma è la stessa delle carte di Città Digitali: un solo modo di leggere i punti in tutto il sito.
- **Descrizione.** Il testo di oggi (379 caratteri, Gulpease 57) è lungo per un nome accessibile, che lo screen reader legge tutto d’un fiato. Ha anche due problemi di contenuto.
  - L’elenco di tutte e sei le province si legge come una copertura completa della regione, cioè quasi un «tutta la Puglia».
  - «Acquaviva delle Fonti» compare due volte, tra i nomi e nella frase dell’anello.
- **Testo proposto** (222 caratteri, Gulpease 64):
  > Carta della Puglia con le città di Puglia Digitale, più numerose nella provincia di Bari. Tra queste: Manfredonia, Barletta, Bari, Monopoli, Gravina in Puglia e Nardò. Un anello segna Acquaviva delle Fonti, sede di ITnode.
  - **Modello:** `Carta della Puglia con le città di Puglia Digitale, ${quota} nella provincia di ${provincia}. Tra queste: ${nomi}. Un anello segna ${sede}, sede di ITnode.`
  - **Quota:** «più numerose» per la provincia con più città (oggi Bari, 13 su 31); «la maggior parte» solo sopra la metà. In caso di parità la frase si ferma prima della virgola. «Provincia di Bari» come nel resto del sito («in provincia di Bari», Home).
  - **Nomi:** quelli che la carta disegna a ogni larghezza, cioè le carte strette, da nord a sud, senza la sede, che ha la sua frase. Così ogni nome detto è sulla carta anche al telefono, e Manfredonia e Nardò danno l’estensione senza dichiararla.
  - **Al go-live senza il testo della pagina** restano i nomi solidi: «Tra queste: Monopoli e Gravina in Puglia.» (descrizione di 186 caratteri, Gulpease 70).
  - **Se ux-designer vuole i nomi della hero**, la carta più ricca: «Tra queste: Manfredonia, Barletta, Bari, Monopoli, Altamura, Gravina in Puglia, Ostuni, Brindisi, Massafra, Lecce e Nardò.» (267 caratteri in tutto).
  - **Sede:** «sede di ITnode» dice dove sta l’azienda, senza attribuirle Puglia Digitale (condizione 1). Nessun numero, nessun «tutte».

## L8 · [IMPORTANTE] `/citta-digitali/` con i nomi: «Tra queste anche Itri e Cosenza.» (2026-10-08)

- **Dove.** `src/lib/citta-digitali.ts`, `describeCittaDigitali`; `src/pages/citta-digitali.astro`, descrizione della carta d’Italia (commit 5f2f757).
- **Contesto.** Dal commit 426e6dc la carta di `/citta-digitali/` disegna i nomi della carta della Home. ux-designer ha tolto dalla descrizione le tre città delle schede: chi usa lo screen reader le sente già nel paragrafo e nello statement prima della carta, e nelle schede subito dopo (review del 2026-10-08). Restano i due nomi disegnati a ogni larghezza: Itri e Cosenza.
- **Problema.** «Tra queste: Itri e Cosenza.» è corretta, ma con due nomi soli li presenta come gli esempi della carta. Sulla carta, però, le città in evidenza sono le tre delle schede. «Tra le altre: Itri e Cosenza.», l’alternativa di ux-designer, ha bisogno di un antecedente che la descrizione non contiene. Se la si ascolta da sola, per esempio dall’elenco delle immagini dello screen reader, non dice «altre» rispetto a che cosa, e si può sentire come il modo di dire «tra l’altro».
- **Decisione** (copywriter-brand, owner delle formule L4, L6 e L7):
  > Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste anche Itri e Cosenza.
  - 171 caratteri, Gulpease 73.
  - «Tra queste» tiene la radice comune a tutte le carte; «queste» rimanda alle città della prima frase, quindi la descrizione si regge anche da sola. «anche» dice che ci sono altre città oltre a queste, senza nominarle di nuovo e senza farne gli esempi principali.
  - Vale con un nome solo («Tra queste anche Itri.») e con molti. Con nessun nome, nessuna terza frase, come oggi.
- **Quando si usa.** Solo quando la descrizione lascia fuori città che chi ascolta ha appena sentito accanto alla carta, come le città con una scheda. Negli altri casi resta «Tra queste: {nomi}.»: Home, capitolo 03 (5 nomi) e hero di `/puglia-digitale/` (la sede è esclusa ma ha la sua frase, «Un anello segna…»).
- **Righe per il codice** (le applica la sessione principale):
  - in `src/lib/citta-digitali.ts`, firma e terza frase:
    ```ts
    export function describeCittaDigitali(names: string[] = [], { besides = false }: { besides?: boolean } = {}): string {
    ```
    ```ts
    const among = names.length ? (besides ? ` Tra queste anche ${andList(names)}.` : ` Tra queste: ${andList(names)}.`) : '';
    ```
    con un commento sulla prop: `besides`: true quando `names` lascia fuori città già nominate accanto alla carta (le schede di `/citta-digitali/`), copywriter-brand L8;
  - in `src/pages/citta-digitali.astro`, la chiamata con il filtro di oggi:
    ```ts
    label: describeCittaDigitali(italyNamesAtEveryWidth().filter((name) => !cities.some((c) => c.name === name)), { besides: true }),
    ```
  - La Home e la carta della Puglia non cambiano.
- **Registrato** nel copy deck della Home (v1.6, sezione 5, riga «Descrizione della carta»).

## Misure

Build di prova di ui-designer, carta a 45 puntini, larghezza della figura tra 280 e 480 px. Testi iniettati nella `figcaption`; Chromium.

| Finestra (px) | Carta (px) | «Ogni punto è una città di Città Digitali» | Con la spaziatura di 1.4.12 | «Ogni punto è una città del portale» (nota di L1) |
|---|---|---|---|---|
| 320 | 280 | 2 righe: «Ogni punto è una città / di Città Digitali» | 2 righe | 1 riga |
| 360–390 | 320–350 | 1 riga | 2 righe | 1 riga |
| 480–768 | 435–480 | 1 riga | 1 riga | 1 riga |
| 1024 | 382 | 1 riga | 2 righe | 1 riga |
| 1440 | 480 | 1 riga | 1 riga | 1 riga |

- «… di Città Digitali» è misurata a 320, 360, 375, 390, 414, 480, 600, 768, 1024, 1100, 1280, 1440 e 1920 px; con la spaziatura di 1.4.12, a 320, 360, 375, 390, 480, 768, 1024 e 1440 px. «… del portale» a queste ultime otto larghezze. Mai testo tagliato o fuori dalla carta.
- Le due proposte di ui-designer: «Un punto per ogni città di Città Digitali» va su due righe a 320 px; «Le città di Città Digitali» sta su una riga a ogni larghezza.

## Verdetto di dominio (copy)

**Testi pronti.**
- La legenda adottata è vera qualunque sia la decisione su Martina Franca e sui nomi mostrati, e resta vera se il portale aggiunge città.
- La descrizione della carta va aggiornata nella terza frase (L4).
- Il link su `/citta-digitali/` è pronto, nella forma decisa da ux-designer e dal creative-director.
- Il testo del capitolo resta com’è.

Il verdetto di gate spetta al creative-director.

## Ipotesi da validare

- `[IPOTESI: la pagina del portale si intitola «Tutte le città» e il suo indirizzo è https://xn--cittdigitali-19a.it/tutte-le-citta/.]` Viene dall’indice di ricerca (`citta-digitali-elenco.md`, §1); si verifica da una rete che raggiunge il portale.
- Le misure valgono in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`, come per la carta (proposta di ui-designer, §4).

## Domande aperte

- **creative-director:** la nota di L1 sulla doppia lettura di «Città Digitali» per gli screen reader. Non bloccante.
- **cro-specialist:** confermi il tracciamento del link su `/citta-digitali/` (snippet di ux-designer)?
- **brand-strategist:** la descrizione dice i nomi che il creative-director tiene sulla carta. Oggi sono 9 nell’anteprima, e al go-live 3 se il testo della pagina non arriva (direzione visiva 0.6). La tua raccomandazione (§4) era di tenere i tre delle linee guida fino al testo della pagina: la descrizione segue in automatico la scelta.

## Decisioni richieste

- **Sessione principale**, nelle modifiche in corso di `index.astro`:
  - in `mapLabel`, la terza frase diventa «Tra queste: ${nomi}.», e la quota segue la regola di L4 («la maggior parte in» solo sopra la metà, altrimenti «più che altrove in»);
  - la `figcaption` è già giusta;
  - su `/citta-digitali/`, il link di L2;
  - se passa la carta con i punti anche su `/citta-digitali/`, la descrizione di L6, senza «Tra queste».
