---
titolo: Copy deck · Home
owner: copywriter-brand
contributi: [creative-director, seo-content, brand-strategist, cro-specialist, ux-designer, copywriter-content]
stato: in revisione
versione: 1.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/creativa/direzione-visiva.md, docs/ux/sitemap.md, docs/ux/struttura-pagine.md, docs/seo/mappa-keyword-url.md, docs/seo/dati-strutturati.md, docs/cro/strategia-conversione.md, docs/contenuti/tone-of-voice.md, docs/contenuti/alt-text.md, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, src/data/site.ts, src/components/ui/Horizon.astro]
---

# Copy deck · Home

Pagina `/`. Copre le sezioni 07, 08 e 09 delle linee guida e la chiusura con CTA verso i contatti, nell’ordine delle sette sezioni fissato dalla direzione visiva (`docs/creativa/direzione-visiva.md`, § 7.3). I testi sono pronti da impaginare. Le parti provvisorie sono elencate in fondo, in «Testi da sostituire con gli originali del cliente».

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle celle «Testo» delle tabelle. Tutto il resto sono note per design e sviluppo. Marcature e segnaposto (`[DA VERIFICARE]`, `[DA FORNIRE]`) non si pubblicano mai.
- **Tag**: livello semantico, non dimensione visiva. La pagina ha un solo H1. Le scale tipografiche (`display-xl`, `mono`…) sono della direzione visiva.
- **max (attuale)**: lunghezza massima consigliata e lunghezza attuale, in caratteri, spazi inclusi.
- **verbatim**: frase del cliente. Non si modifica.
- **A capo d’autore**: la barra rovesciata `\` a fine riga indica un a capo che sta nel contenuto (regola «Il Passaggio», direzione visiva § 1.5). Nel markup è un `<br>` oppure una riga separata.
- **Frecce**: → ↓ ↗ indicano quale icona usare. Nel sito sono SVG inline con `aria-hidden="true"`, mai caratteri: i font scelti non li contengono (direzione visiva, § 3).
- **Gulpease**: calcolato con uno script il 2026-09-28 con la formula 89 + (300 × frasi − 10 × lettere) / parole; ogni titolo o paragrafo conta almeno una frase. Titoli, statement, riga di posizionamento, paragrafi, legenda dei nodi, didascalie della timeline e citazione, esclusi occhielli, etichette mono, CTA e contatti: 72 nel complesso (348 parole). Il 69 della versione 1.0 veniva da un insieme di testi non documentato e non è riproducibile; i valori dei singoli testi sono confermati.
- **Riferimenti**: grafie, CTA e punteggiatura in `tone-of-voice.md`; testi alternativi in `alt-text.md` (copywriter-content); header, footer, form, marquee e 404 in `microcopy.md`; eventi `data-track` nella strategia di conversione, § 4.

## Metadati

Sono quelli di seo-content (`docs/seo/mappa-keyword-url.md`, § 2), recepiti senza modifiche.

| Campo | Testo | Car. |
|---|---|---|
| Title | ITnode \| Esperienze immersive per imprese e territori | 53 |
| Meta description | ITnode rende esplorabili sul Web gli spazi di imprese e territori con i Siti Interattivi Immersivi (SIII) e i progetti Puglia Digitale e Città Digitali. | 152 |
| og:title, og:description | Regola di seo-content: title senza suffisso e meta description | — |

## Struttura della pagina

| # | Sezione (direzione visiva § 7.3) | Ancora | Heading |
|---|---|---|---|
| 1 | Hero · «L’orizzonte dei luoghi» | — | H1 |
| 2 | Manifesto | `#chi-siamo` | H2 |
| 3 | Documento · foto dell’evento | — | nessuno (didascalia) |
| 4 | Infrastruttura · statement e marquee | — | nessuno (statement in `<p>`) |
| 5 | I tre mondi | `#tre-mondi` | H2 e tre H3 |
| 6 | Fondatore | `#fondatore` | H2 |
| 7 | Chiusura | — | H2 |

Scaletta degli heading, coerente con la mappa SEO (§ 3.1):

```text
H1  La tecnologia cambia. La curiosità ci accompagna da sempre.
H2  ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.
H2  I tre mondi ITnode
    H3  SIII · Siti Interattivi Immersivi
    H3  Puglia Digitale
    H3  Città Digitali
H2  36 anni dentro l’innovazione. E ancora la stessa curiosità.
H2  Il Web si può abitare. Cominciamo dal tuo spazio.
```

## 1. Hero · «L’orizzonte dei luoghi»

**Gerarchia di lettura**: occhiello → H1 in due registri → riga di posizionamento → didascalia dell’osservatore. È la decisione I4 del G4, opzione (a) (verdetto del creative-director, § 3.4). L’orizzonte, con le etichette dei luoghi, è decorativo e nascosto alle tecnologie assistive.

**Occhiello** · p · mono · prop `eyebrow` · max 64 (45)
> ITnode — oltre i confini del Web tradizionale

Spazio unificatore (U+00A0) tra «del» e «Web».

**H1** · verbatim · due registri nello stesso `<h1>` · max 60 (59)
> La tecnologia cambia.\
> La curiosità ci accompagna\
> da sempre.

**Riga di posizionamento** · p in `lead`, subito dopo `</h1>` e fuori dall’heading · prop `lead` · max 60 (54) · Gulpease 65
> Esperienze digitali immersive per imprese e territori.

Spazio unificatore (U+00A0) tra «per» e «imprese».

**Didascalia dell’osservatore** · p · mono · tre righe · la riga delle coordinate è `aria-hidden`
> Vista da Acquaviva delle Fonti\
> 40.8957° N · 16.8412° E\
> Distanze in linea d’aria

**Etichette dei luoghi sull’orizzonte** · dentro l’orizzonte `aria-hidden` · generate da `Horizon.astro` con i dati di `src/data/site.ts`
> Monopoli — 081° · 39 km

Formato: nome, trattino lungo, rilevamento, distanza in linea d’aria. I luoghi a meno di 12° l’uno dall’altro si raggruppano, con i nomi brevi: «Altamura · Gravina · Cassano — 253–265° · 6–36 km». Sotto i 700 px l’etichetta va su due righe, nome e rilevamento, senza distanza. Sull’orizzonte ci sono anche i gradi ogni 45°, con i punti cardinali: «090° E», «180° S», «270° O». Nel sorgente la maiuscola va solo all’iniziale; il maiuscolo lo applica il CSS.

Note:
- **Perché la riga di posizionamento sta in `lead`.** Il test dei cinque secondi si gioca su ciò che si legge subito dopo il titolo. Nell’occhiello, la frase che dice che cosa fa ITnode aveva il corpo più piccolo della pagina (12–13 px, mono) e a 1440 px stava 300 px sopra il titolo. In `lead` arriva dove l’occhio atterra dopo l’H1. Ha deciso il creative-director, sentiti copywriter-brand, cro-specialist (esperimento E1) e ui-designer. Il testo non cambia: cambia il suo posto nella gerarchia.
- **Punteggiatura.** Ora che è una frase, la riga prende la maiuscola iniziale e il punto finale, come gli statement del sito (tone of voice, § 8). L’occhiello resta senza punto.
- **L’occhiello porta il concetto.** «Oltre i confini del Web tradizionale» è il concetto centrale delle linee guida (§ 02: «Superare i confini del Web tradizionale»), nella forma già proposta come alternativa in questo copy deck. L’orizzonte lo mostra, l’occhiello lo nomina. Con il titolo del manifesto («un nuovo modo di abitare il Web») e quello della chiusura («Il Web si può abitare.») apre un filo che la pagina chiude in fondo. «Web» ha la maiuscola perché è un sostantivo (tone of voice, § 5).
- **Coerenza con voce e brief.**
  - Nessun fatto nuovo e nessuna parola da evitare.
  - La riga usa le parole del § 35 («imprese e territori») e del title della pagina; l’occhiello riprende il § 02. Nessuna delle due presenta ITnode come chi realizza siti (§§ 02, 07).
  - Test dello scambio: l’occhiello lo supera, perché nomina ITnode e il suo concetto. La riga lo supera di poco, grazie a «territori» e al contesto: per questo propongo le varianti per E1 qui sotto.
- **A capo**, misurati con uno script da 320 a 1920 px il 2026-09-28, con DOM e CSS iniettati come nella prova del G4.
  - Senza spazi unificatori, l’occhiello va a capo dopo «del» (da 320 a 1023 px) e la riga dopo «per» (da 360 a 414 px e da 700 a 900 px).
  - Con i due spazi unificatori: «ITnode — oltre i confini / del Web tradizionale» ed «Esperienze digitali immersive / per imprese e territori.».
  - Da 1024 px stanno entrambi su una riga; la riga di posizionamento anche a 600 px.
- **Ordine di lettura per gli screen reader**: occhiello, H1, riga di posizionamento, «Vista da Acquaviva delle Fonti», «Distanze in linea d’aria». Coordinate, gradi ed etichette dei luoghi restano nascosti.
- **Nessuna CTA e nessun invito allo scorrimento**: la hero deve respirare (§ 07) e «Parliamone» è già nell’header. La terza riga della didascalia, «Distanze in linea d’aria», viene dalla review di veridicità (S2).
- **Coordinate e distanze** si calcolano dai dati di `src/data/site.ts` e seguono la regola della direzione visiva (§ 1.4; G4, N2): quattro decimali reali da un’unica fonte, oppure due per tutti i luoghi `[DA VERIFICARE]`. I valori qui sopra sono quelli di oggi e cambiano da soli con la condizione C11 (`docs/strategia/coordinate-luoghi.md`): il copy deck non va riallineato. Il punto decimale è quello della notazione cartografica (tone of voice, § 7).
- **H1**: primo registro «La tecnologia cambia.»; secondo registro «La curiosità ci accompagna / da sempre.», con l’a capo d’autore prima di «da sempre». Su mobile valgono gli a capo della direzione visiva (§ 5).

**Varianti della riga di posizionamento per E1** · dopo il lancio, con cro-specialist · al lancio resta la variante A

Il test dei cinque secondi con titolari di PMI (E1) dirà se la riga basta. Le varianti hanno la stessa posizione e la stessa scala.

| Variante | Testo | Car. | Gulpease | A capo a 390 px |
|---|---|---|---|---|
| A · controllo, al lancio | Esperienze digitali immersive per imprese e territori. | 54 | 65 | Esperienze digitali immersive / per imprese e territori. |
| B · il risultato, con un verbo | Rendiamo imprese e territori esplorabili sul Web. | 49 | 72 | Rendiamo imprese e territori / esplorabili sul Web. |
| C · il risultato, senza verbo | Spazi di imprese e territori, da esplorare sul Web. | 51 | 77 | Spazi di imprese e territori, / da esplorare sul Web. |

- **Perché provarle.** La prima cosa che il visitatore deve capire, per il § 35, è che «ITnode rende gli spazi esplorabili digitalmente». A dice la categoria, non il gesto; e «immersivo» può far pensare a visori o mostre immersive, che ITnode non fa (tone of voice, § 5) `[IPOTESI: da verificare con E1]`. B e C dicono che cosa succede: uno spazio reale diventa esplorabile sul Web, come chiede lo statement del cliente per il SIII («Non raccontare la tua azienda. Falla esplorare.», § 10).
- **Nessun fatto nuovo.** B parla al «noi», come «ci accompagna» nell’H1; C ha il ritmo degli statement del sito.
- **Spazi unificatori**: in B tra «sul» e «Web»; in C tra «da» ed «esplorare» e tra «sul» e «Web». Così vanno a capo come in tabella da 320 a 414 px e da 700 a 1023 px; a 600 px e da 1024 px stanno su una riga (misurato).

## 2. Manifesto

**Occhiello** · p · mono · facoltativo · max 20 (9)
> Chi siamo

**H2** · verbatim · max 70 (65) · è la frase «di grande importanza» del § 07
> ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.

**Lead** · p · max 360 (336) · Gulpease 52 · blocco di risposta A di seo-content, rifinito
> ITnode è un’azienda di Acquaviva delle Fonti, in provincia di Bari, che rende gli spazi fisici esplorabili sul Web. Crea Siti Interattivi Immersivi (SIII) per le imprese. Con i Tour Virtuali Interattivi Immersivi porta online luoghi, imprese e attività in due progetti di digitalizzazione territoriale: Città Digitali e Puglia Digitale.

Link interni nel lead: «Siti Interattivi Immersivi» → `/siii/`; «Città Digitali» → `/citta-digitali/`; «Puglia Digitale» → `/puglia-digitale/`.

Note:
- **Perché non c’è «ITnode ha creato».** Il § 07 dice «ITnode ha creato Città Digitali e Puglia Digitale», ma per Puglia Digitale il ruolo di ITnode va chiarito (brief: A1, D1). Fino alla risposta vale la regola DR4: il testo presenta i due progetti senza attribuirne la creazione. Versione da pubblicare dopo la conferma: «ITnode è un’azienda di Acquaviva delle Fonti, in provincia di Bari, che rende gli spazi fisici esplorabili sul Web. Crea Siti Interattivi Immersivi (SIII) per le imprese. Ha creato Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale che portano online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.»
- **Rispetto al blocco A di seo-content** ho fatto tre cose. Ho tolto l’ultima frase («Il suo obiettivo è una nuova infrastruttura digitale…»), perché la sezione 4 la dice con le parole del cliente. Ho scritto «crea» invece di «realizza», per non presentare ITnode come chi realizza siti (§ 07). Ho spezzato il periodo lungo: il Gulpease passa da 45 (blocco A) a 52; la frase del § 07, da sola, è a 36.

## 3. Documento · foto dell’evento

**Legenda dei nodi** · `ol` sotto la foto, sempre visibile su mobile · testi della direzione visiva (§ 4.2)

| Nodo | Testo | Verifica |
|---|---|---|
| 1 · schermo sinistro | Vista aerea a 360° di una città, con le attività in evidenza | `[DA VERIFICARE: quale città]` |
| 2 · palco | Il palco dell’evento regionale Puglia Digitale | `[DA VERIFICARE: chi parla]` |
| 3 · schermo destro | Una piazza storica esplorabile a 360° | `[DA VERIFICARE: quale luogo]` |

Nome accessibile dei nodi, che sono pulsanti numerati: il numero seguito dal testo della legenda, per esempio «1 – Vista aerea a 360° di una città, con le attività in evidenza».

**Didascalia** · p · mono · solo con luogo e data confermati
> Puglia Digitale, evento regionale · {luogo}, {data}

Note:
- La didascalia si pubblica solo quando luogo e data sono confermati (brief, A4). Fino ad allora la foto resta accompagnata dalla sola legenda. `[DA FORNIRE: luogo, data e autore della foto]`
- Nessun numero di partecipanti. In basso a destra dell’originale c’è la filigrana ✦ di Gemini: i ritagli la escludono, ma serve l’originale senza sovrimpressioni e la conferma che la scena non è stata alterata (direzione visiva, § 4.2).
- Testo alternativo: `alt-text.md`, voce `derivate/evento-panoramica.jpg`.

## 4. Infrastruttura

**Statement** · p · verbatim · due registri · max 85 (81)
> Una nuova infrastruttura digitale\
> per connettere imprese, cittadini e visitatori.

**Marquee** · `aria-hidden="true"` su tutte le copie · il testo si ripete in continuo
> spazio fisico → spazio digitale → persone → imprese → territorio →

Note:
- Lo statement è il concetto che il § 07 chiede di evidenziare. È un `<p>`, non un heading (mappa SEO).
- Il marquee è la catena del concept (§ 02), con le frecce del testo del cliente in SVG. Tutto minuscolo, perché il testo scorre in un anello continuo senza inizio di frase. Il controllo di pausa è obbligatorio (WCAG 2.2.2): testi in `microcopy.md`, § 6.

## 5. I tre mondi ITnode

**H2** · max 45 (18) · può avere la scala visiva di un’etichetta
> I tre mondi ITnode

Alternativa, se la composizione chiede un titolo più forte: H2 «Un’impresa. Un territorio. Una rete di città.» (45, entro il limite della struttura UX) e «I tre mondi ITnode» come occhiello mono. La mappa SEO indica «I tre mondi ITnode» come H2: con l’alternativa va avvisato seo-content.

**Testo** · p · max 200 (193) · Gulpease 52 · blocco di risposta F di seo-content, accorciato
> SIII, Puglia Digitale e Città Digitali sono tre applicazioni concrete della stessa visione. ITnode rende esplorabili gli spazi reali e usa questa tecnologia per valorizzare imprese e territori.

**Statement di sezione** · p · facoltativo, su una riga (non a registri) · max 50 (45)
> Un’impresa. Un territorio. Una rete di città.

**I tre capitoli** · copy · una colonna per capitolo, nell’ordine della direzione visiva: numero, nome, statement, visual, microdescrizione, CTA

| Elemento | Tag · max | 01 | 02 | 03 |
|---|---|---|---|---|
| Numero | span `aria-hidden="true"` · 2 | 01 | 02 | 03 |
| Rilevamento | mono, `aria-hidden="true"` | 000° | 120° | 240° |
| Nome | H3 · 16 | SIII | Puglia Digitale | Città Digitali |
| Descrittore | seconda riga dell’H3, più piccola · 30 | Siti Interattivi Immersivi | — | — |
| Statement | p, due registri · 60 | Spazi reali.<br>Esperienze digitali. | Un territorio.<br>Migliaia di storie. | Le attività del territorio,<br>online senza perdere radici. |
| Microdescrizione | p · 160 (struttura UX) | Il SIII replica digitalmente gli spazi della tua impresa. Chi entra li esplora da desktop e smartphone, guarda prodotti e video, chiede informazioni e prenota. | Un progetto di destination marketing che digitalizza città, borghi e imprese della Puglia. E li valorizza con esperienze immersive. | Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per imprese e attività. Varese, Altamura, Caltanissetta: città diverse, un unico portale. |
| Lunghezza e Gulpease | — | 159 · 61 | 131 · 63 | 152 · 56 |
| CTA | a · verbatim · 28 | Esplora SIII → | Scopri Puglia Digitale → | Esplora Città Digitali → |
| Destinazione | — | `/siii/` | `/puglia-digitale/` | `/citta-digitali/` |
| `data-track` | — | `home-capitolo-siii` | `home-capitolo-puglia-digitale` | `home-capitolo-citta-digitali` |
| Visual | — | Schermo 16:10 con tre nodi: schermata di un SIII `[DA FORNIRE]` (slot `siii-*`) | Ritaglio «Schermo» 4:5 della foto dell’evento | Carta d’Italia con tre nodi: Varese, Altamura, Caltanissetta |

Note:
- Gli statement sono gli esempi del § 08, invariati, con l’a capo d’autore dopo il primo punto (01 e 02) e dopo la virgola (03).
- Il blocco F è accorciato: la sua seconda frase, cioè che cosa fa ciascun progetto, è distribuita nelle microdescrizioni, sotto il rispettivo H3.
- Lo statement di sezione è facoltativo. Segue il filo narrativo del brief (2.3): dalla singola impresa al territorio, fino alla rete di città, una parola per capitolo. Non lascia intendere che tutta l’Italia sia coperta (N12). Se si usa, va su una riga: la regola del Passaggio ammette tre registri solo per «Entra. Esplora. Interagisci.».
- 01: le funzioni del SIII sono quelle del § 10. Il descrittore scioglie la sigla alla prima occorrenza, come l’hero della pagina SIII.
- 02: nessuna attribuzione della creazione di Puglia Digitale (A1). «destination marketing» con `lang="en"`.
- 03: ordine «Siti Interattivi Immersivi» uniformato (il § 17 scrive «Siti Immersivi Interattivi»: brief, DR2). «Imprese e attività» riassume il «tessuto imprenditoriale e commerciale italiano» del § 17; la scala nazionale la dicono le tre città del § 18, nominate come chiede N12 e coincidenti con i nodi della carta.
- Visual: la direzione visiva (§ 7.3) e la struttura UX (HM-3) indicano soluzioni diverse per i capitoli 02 e 03 (ritaglio «Schermo» e carta d’Italia contro foto intera e poster del video). I testi valgono in entrambi i casi; decide creative-director.
- Niente link esterni nei capitoli: prima si approfondisce sul sito (cro-specialist). Le CTA hanno testi diversi tra loro, quindi non serve un nome accessibile aggiuntivo.

## 6. Il fondatore

**Occhiello** · p · mono · facoltativo · max 20 (12)
> Il fondatore

**H2** · titolo proposto dal cliente (§ 09) · due registri · max 64 (59)
> 36 anni dentro l’innovazione.\
> E ancora la stessa curiosità.

Alternativa senza numero, che non invecchia: «Dagli anni ’90 dentro l’innovazione. / Con la stessa curiosità.» (61).

**Lead** · p · max 260 (250) · Gulpease 63 · blocco di risposta G di seo-content, rifinito · provvisorio
> ITnode è stata fondata da Giacomo Lenoci, che lavora nell’innovazione da 36 anni. Il suo percorso comincia con IBM negli anni ’90 e passa per la prima azienda, MyComm, iComm Lab e Leadstone. Oggi continua con ITnode, Puglia Digitale e Città Digitali.

**Timeline** · `ol` · orizzonte del tempo ordinale, non in scala · soli elementi del § 09

| # | Quando · max 12 | Tappa · max 45 | Didascalia o numero · max 60 |
|---|---|---|---|
| 1 | Anni ’90 | IBM | L’inizio del percorso. |
| 2 | — | La prima azienda | Il primo passo da imprenditore. |
| 3 | Dal 2002 | MyComm · iComm Lab · Leadstone | **10.000+** clienti, prima di ITnode |
| 4 | Oggi | ITnode · Puglia Digitale · Città Digitali | La stessa curiosità, applicata a spazi, imprese e territori. |

- Tappa 3: «10.000+» è il momento numerico in `display-l`. Testo accessibile: «Oltre 10.000 clienti, prima di ITnode».
- Tappa 4: è l’unico nodo esplorabile. «Puglia Digitale» → `/puglia-digitale/`, «Città Digitali» → `/citta-digitali/`; «ITnode» resta testo, perché siamo già sulla sua home.

**Citazione** · `blockquote` dentro `figure` · verbatim · chiude la sezione, dopo il ritratto (§ 09)
> È questo il futuro che mi appassiona e che stiamo costruendo giorno dopo giorno.

**Firma** · `figcaption` · max 40 (35)
> Giacomo Lenoci, fondatore di ITnode

**Link al profilo** · a · facoltativo · nuova scheda
> Giacomo Lenoci su LinkedIn ↗

Note:
- **Nome e ruolo** `[DA VERIFICARE]` (brief, F7): «Giacomo Lenoci» e «fondatore» sono visibili nel lead e nella firma. Servono al nodo Person dei dati strutturati (`jobTitle` «Fondatore»: `dati-strutturati.md`, § 7). Il link a LinkedIn in questa sezione giustifica il `sameAs`. Se il nome non viene confermato: «il fondatore di ITnode», e niente Person.
- **«36 anni»**: dato del cliente, utilizzabile (N4). Presuppone il 1990 `[DA VERIFICARE]` e va aggiornato ogni anno; in alternativa, il titolo senza numero.
- **Perché «Dal 2002» sta sulla tappa 3 e la tappa 2 non ha data.** La sequenza del § 09 («prima azienda, 2002, MyComm») si può leggere in due modi: «prima azienda nel 2002» (così la scaletta di seo-content) oppure «MyComm nel 2002» (così il brief, I5, e la direzione visiva). «Dal 2002» sulla tappa 3 è vero con entrambe le letture. Se la timeline si disegna a tacche, «2002» resta una tacca a sé tra «La prima azienda» e «MyComm», senza testo che dica a quale delle due appartiene, finché il cliente non risponde (F3).
- **«10.000+ clienti»** si usa solo nel percorso del fondatore e non va mai attribuito a ITnode (N5). Per questo l’etichetta dice «prima di ITnode». Non va accostato al logo o ai progetti ITnode, né impaginato dentro la tappa «Oggi». Perimetro e fonte restano `[DA VERIFICARE]`. seo-content propone di toglierlo finché non è documentato: vedi «Decisioni richieste».
- **iComm Lab**: grafia da confermare. Il § 09 scrive «IcommLab».
- **Markup**: `<ol>`, con `<time datetime="2002">` solo sulle date complete; «Anni ’90» e «Oggi» restano testo semplice.
- **Citazione**: «È questo il futuro» rimanda a ciò che la precede. Con i testi provvisori, il riferimento è la tappa «Oggi»; con il racconto originale del cliente sarà il suo ultimo paragrafo.
- **Ritratto**: `fondatore-braccia-conserte.jpg` nel trattamento «inchiostro», senza didascalia su luoghi, date o eventi (direzione visiva, § 4.3). Il testo alternativo va allineato tra direzione visiva («Ritratto di Giacomo Lenoci, fondatore di ITnode») e `alt-text.md`, dove decide copywriter-content. La scelta dell’immagine resta dell’utente (brief, DR3).
- Nessuna CTA dentro il racconto (cro-specialist).

## 7. Chiusura

**Occhiello** · p · mono · facoltativo · max 24 (18)
> Il prossimo spazio

**H2** · due registri · max 60 (49)
> Il Web si può abitare.\
> Cominciamo dal tuo spazio.

Alternative: «Hai uno spazio / da far esplorare?» (32) · «Il prossimo spazio da esplorare / può essere il tuo.» (50).

**Testo** · p · facoltativo · max 160 (153) · Gulpease 58
> Un’impresa, un’attività, un territorio: raccontaci che cosa vuoi rendere esplorabile. Ti aiutiamo a scegliere tra SIII, Puglia Digitale e Città Digitali.

**CTA** · a → `/contatti/` · max 28 (12) · `data-track="home-chiusura-parliamone"`
> Parliamone →

**Contatti rapidi** · mono · link `mailto:info@itnode.it` e `tel:+390802466520` · `data-track` `home-chiusura-email` e `home-chiusura-telefono`
> Scrivi a info@itnode.it · Chiama +39 080 2466520

Note:
- L’H2 chiude il cerchio aperto da «un nuovo modo di abitare il Web» e supera il test dello scambio, perché riprende l’idea fondativa di ITnode.
- «Parliamone» è la stessa etichetta della CTA dell’header (cro-specialist, ux-designer). Porta alla pagina Contatti, il cui H1 è «Parliamo del prossimo spazio digitale.». Sulla Home la destinazione è un’altra pagina, quindi la freccia è →.
- I contatti rapidi hanno le stesse etichette del menu mobile.
- «Ti aiutiamo a scegliere» promette un orientamento, non un risultato `[IPOTESI: chi risponde alle richieste aiuta a scegliere il progetto adatto]`. La direzione visiva prevede Passaggio, CTA e contatti: il testo si toglie se la composizione non ha spazio.
- La Home non ha un form: le linee guida non lo prevedono.

## Testi da sostituire con gli originali del cliente

| Dove | Testo attuale | Da dove viene | Che cosa serve |
|---|---|---|---|
| Manifesto, lead | «ITnode è un’azienda di Acquaviva delle Fonti…» | § 07 e blocco A di seo-content; versione provvisoria per la regola DR4 | Il ruolo di ITnode in Puglia Digitale (D1). Dopo la conferma, la versione con «Ha creato» (nota alla sezione 2) |
| Fondatore, lead | «ITnode è stata fondata da Giacomo Lenoci…» | Solo gli elementi del § 09 e il blocco G | Il testo narrativo del fondatore citato dal § 09 `[DA FORNIRE]`; conferma di nome e ruolo (F7) |
| Timeline, didascalie delle tappe 1, 2 e 4 | «L’inizio del percorso.», «Il primo passo da imprenditore.», «La stessa curiosità, applicata a spazi, imprese e territori.» | Scritte per la Home, senza fatti nuovi | Ruolo in IBM, nome e anno della prima azienda, anni e attività di MyComm, iComm Lab e Leadstone (F1–F6) |
| Timeline, tappa 3 | «Dal 2002» e «10.000+ clienti, prima di ITnode» | § 09, nella lettura più prudente | A quale tappa appartiene il 2002; perimetro e fonte di «10.000+» (N5) |
| Documento, legenda e didascalia | I tre nodi e «Puglia Digitale, evento regionale» | Direzione visiva, § 4.2 | Città e piazza sugli schermi, chi parla, luogo, data e autore della foto (A4) |
| Microdescrizioni dei capitoli | 01, 02 e 03 | §§ 10, 13, 17 e 18 | Le eventuali descrizioni originali dei tre progetti |
| Testi scritti per la Home | Occhiello e riga di posizionamento della hero, altri occhielli, «Un’impresa. Un territorio. Una rete di città.», chiusura | Headline, microcopy e CTA consentiti dal § 25; l’occhiello della hero riprende il § 02 | Solo l’approvazione: non sostituiscono testi del cliente |

## Ipotesi da validare

- La riga di posizionamento in `lead`, subito sotto l’H1, basta a far capire in cinque secondi che cosa fa ITnode e per chi. Si verifica dopo il lancio con E1 (cro-specialist), anche con le varianti B e C della sezione 1.
- «Un’impresa. Un territorio. Una rete di città.» descrive bene la relazione tra i tre mondi (brief, 2.3 e I2).
- Il 2002 appartiene a MyComm o alla prima azienda: in entrambi i casi «Dal 2002» sulla tappa 3 resta vero.
- «10.000+ clienti» si riferisce alle aziende del percorso del fondatore prima di ITnode (brief, N5).

## Domande aperte

- **Per il cliente** (tramite la sessione principale): nome e ruolo del fondatore; il testo narrativo del § 09; ruolo in IBM e anno di inizio dei 36 anni; nome e anno della prima azienda; anni di MyComm, iComm Lab e Leadstone; perimetro e fonte di «10.000+ clienti»; ruolo di ITnode in Puglia Digitale (D1); luogo, data e autore della foto dell’evento, con le città sugli schermi.
- **Per seo-content**: va bene l’accorciamento dei blocchi A, F e G? E la regola «un segnaposto aperto non si pubblica» applicata a «prima azienda · 2002»?
- **Per creative-director e copywriter-content**: un solo testo alternativo per il ritratto del fondatore.
- **Per creative-director, con ux-designer e ui-designer**: la direzione visiva (§ 5), la struttura UX (HM-1) e il design system prevedono sotto la didascalia «Scorri per esplorare», indicato come testo «dal copy deck». Il copy deck non l’ha mai previsto e il sito non lo mostra. Propongo di toglierlo dai tre documenti: con la riga di posizionamento la hero ha già quattro livelli di testo, e con il movimento ridotto l’orizzonte non ruota, quindi l’invito prometterebbe qualcosa che non succede. Se invece si tiene, il testo è «Scorri per esplorare», `aria-hidden` e nascosto con `prefers-reduced-motion: reduce`.

## Decisioni richieste

- **«10.000+ clienti» al lancio**: decisa al G4 (verdetto del creative-director, § 3.8). Con la conferma del perimetro vale l’opzione A, con l’etichetta confermata; senza, l’opzione B: il numero si toglie e la tappa resta.
- **Varianti B e C della riga di posizionamento** (cro-specialist): se includerle nel test E1 dopo il lancio (sezione 1).
- **Titolo del fondatore** (utente): «36 anni…», da aggiornare ogni anno, oppure l’alternativa senza numero.
- **Immagine della sezione fondatore** (utente, sentito creative-director): DR3 del brief. La direzione visiva propone il ritratto a braccia conserte, trattato a inchiostro.
