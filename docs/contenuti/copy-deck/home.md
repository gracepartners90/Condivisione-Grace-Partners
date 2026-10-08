---
titolo: Copy deck · Home
owner: copywriter-brand
contributi: [creative-director, seo-content, brand-strategist, cro-specialist, ux-designer, copywriter-content]
stato: in revisione
versione: 1.7
aggiornato: 2026-10-08
fonti: [commit c11734b (schermata della Tana di Aldo nel capitolo 01, richiesta dell'utente del 2026-10-08), docs/contenuti/alt-text.md (1.11), docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.3, A7), docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/creativa/direzione-visiva.md (0.12), docs/ux/sitemap.md, docs/ux/struttura-pagine.md, docs/ux/accessibilita.md (§2.8), docs/seo/mappa-keyword-url.md, docs/seo/dati-strutturati.md, docs/cro/strategia-conversione.md, docs/contenuti/tone-of-voice.md, docs/contenuti/alt-text.md (1.5), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/review/2026-09-28-sito-bozze-copywriter-content.md (H5), docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md, docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md, docs/review/2026-10-05-legenda-mappa-copywriter-brand.md, docs/review/2026-10-06-descrizione-carta-home-ux-designer.md, docs/strategia/coordinate-luoghi.md, docs/strategia/citta-digitali-elenco.md, src/pages/index.astro, src/data/site.ts, src/data/media.ts, src/data/maps.json, src/lib/citta-digitali.ts, src/components/ui/Horizon.astro, build di HEAD 326f354 del 2026-10-07 (copia nello scratchpad), prove Playwright del 2026-10-07]
---

# Copy deck · Home

Pagina `/`. Copre le sezioni 07, 08 e 09 delle linee guida e la chiusura con CTA verso i contatti, nell’ordine delle sette sezioni fissato dalla direzione visiva (`docs/creativa/direzione-visiva.md`, § 7.3). I testi sono pronti da impaginare. Le parti provvisorie sono elencate in fondo, in «Testi da sostituire con gli originali del cliente».

**Versione 1.7 (2026-10-08).** Capitolo 01: la schermata del SIII della Tana di Aldo al posto di quella di Masseria Santella (commit c11734b, richiesta dell’utente), con il testo alternativo di `alt-text.md` 1.11. Aggiornamento di copywriter-content su richiesta della sessione principale, solo nella riga «Visual» e nella nota del capitolo 01: da rivedere per copywriter-brand. Nessun testo della Home cambia.

**Versione 1.6 (2026-10-08).** Regola «Tra queste anche» per le carte la cui descrizione lascia fuori città già nominate accanto (sezione 5, capitolo 03). Nessun testo della Home cambia.

**Versione 1.5 (2026-10-07): il copy deck descrive il sito com’è oggi.** Nessun testo approvato è cambiato. Rispetto alla 1.4:
- capitolo 01: la schermata reale del SIII di Masseria Santella, con il suo testo alternativo, e i nodi decorativi nascosti;
- capitolo 02: la carta della Terra di Bari, che il copy deck non descriveva;
- capitolo 03: la descrizione B, con i 5 nomi disegnati a ogni larghezza, e i 7 nomi delle carte larghe dopo la regola 11;
- documento: il nodo 2 senza «regionale» (review di bozze, H5), il nome della sezione, la nota sull’immagine e la legenda ridotta al nodo 1 sotto i 700 px;
- fondatore: testo alternativo e nota del ritratto; virgolette della citazione;
- ordine della sezione «I tre mondi», rilevamento del capitolo 01, Gulpease ricalcolato, domande e decisioni aggiornate.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle celle «Testo» delle tabelle. Tutto il resto sono note per design e sviluppo. Marcature e segnaposto (`[DA VERIFICARE]`, `[DA FORNIRE]`) non si pubblicano mai.
- **Tag**: livello semantico, non dimensione visiva. La pagina ha un solo H1. Le scale tipografiche (`display-xl`, `mono`…) sono della direzione visiva.
- **max (attuale)**: lunghezza massima consigliata e lunghezza attuale, in caratteri, spazi inclusi.
- **verbatim**: frase del cliente. Non si modifica.
- **A capo d’autore**: la barra rovesciata `\` a fine riga indica un a capo che sta nel contenuto (regola «Il Passaggio», direzione visiva § 1.5). Nel markup è un `<br>` oppure una riga separata.
- **Frecce**: → ↓ ↗ indicano quale icona usare. Nel sito sono SVG inline con `aria-hidden="true"`, mai caratteri: i font scelti non li contengono (direzione visiva, § 3).
- **Gulpease**: calcolato con uno script con la formula 89 + (300 × frasi − 10 × lettere) / parole; ogni titolo o paragrafo conta almeno una frase. Insieme dei testi: titoli, statement, riga di posizionamento, paragrafi, legenda dei nodi del documento, legenda della carta del capitolo 03, didascalie della timeline e citazione; esclusi occhielli, etichette mono, CTA e contatti. Ricalcolato il 2026-10-07 sui testi del sito: 72 nel complesso (356 parole). Il 69 della versione 1.0 veniva da un insieme di testi non documentato e non è riproducibile; i valori dei singoli testi sono confermati.
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
| 3 | Documento · foto dell’evento | — | nessuno; la sezione ha il nome «L’evento Puglia Digitale» (`aria-label`) |
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
> 40.90° N · 16.85° E\
> Distanze in linea d’aria

**Etichette dei luoghi sull’orizzonte** · dentro l’orizzonte `aria-hidden` · generate da `Horizon.astro` con i dati di `src/data/site.ts`
> Monopoli — 081° · 38 km

Formato: nome, trattino lungo, rilevamento, distanza in linea d’aria. I luoghi a meno di 12° l’uno dall’altro si raggruppano, con i nomi brevi in ordine di rilevamento. Le quattro etichette di oggi: «Monopoli — 081° · 38 km», «Caltanissetta — 213° · 449 km», «Altamura · Cassano · Gravina — 251–256° · 7–37 km», «Varese — 313° · 848 km». Sotto i 700 px l’etichetta va su due righe, nome e rilevamento, senza distanza. Sull’orizzonte ci sono anche i gradi ogni 45°, con i punti cardinali: «090° E», «180° S», «270° O». Nel sorgente la maiuscola va solo all’iniziale; il maiuscolo lo applica il CSS.

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
- **Coordinate, rilevamenti e distanze** si calcolano dai dati di `src/data/site.ts`, con il ripiego della direzione visiva (§ 1.4): 2 decimali per tutti i luoghi, da un’unica fonte, il riquadro della voce del comune su Wikipedia in inglese (`docs/strategia/coordinate-luoghi.md`, v0.3; C11 chiusa il 2026-09-28). Per Acquaviva è la coordinata del comune, non dell’indirizzo della sede: nessun testo la presenta come posizione della sede. Resta `[DA VERIFICARE]` solo la lettura diretta della fonte, che non blocca il lancio. I valori citati qui sono esempi: se i dati cambiano, per esempio con i 4 decimali dopo il lancio, vanno riallineati anche qui. Il punto decimale è quello della notazione cartografica (tone of voice, § 7).
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

**Nome della sezione** · `aria-label` della `<section>` · prop `legendTitle`
> L’evento Puglia Digitale

**Legenda dei nodi** · `ol` sotto la foto, sempre visibile · testi della direzione visiva (§ 4.2). Sotto i 700 px il ritaglio «Città» mostra solo il nodo 1, e la legenda solo la sua voce; i nodi 2 e 3, con le loro voci, compaiono da 700 px

| Nodo | Testo | Verifica |
|---|---|---|
| 1 · schermo sinistro | Vista aerea a 360° di una città, con le attività in evidenza | `[DA VERIFICARE: quale città]` |
| 2 · palco | Il palco dell’evento Puglia Digitale | `[DA VERIFICARE: chi parla]`. Senza «regionale», come nel sito (review di bozze, H5; brief, A2). Il nodo sta sul leggio, accanto all’oratore, non sulla persona (direzione visiva, § 4.2; G4, N7) |
| 3 · schermo destro | Una piazza storica esplorabile a 360° | `[DA VERIFICARE: quale luogo]` |

Nome accessibile dei nodi, che sono pulsanti numerati: il numero seguito dal testo della legenda, per esempio «1 – Vista aerea a 360° di una città, con le attività in evidenza».

**Nota sull’immagine** · `figcaption` · testo di `eventPhotoNote` in `src/data/media.ts`
> Immagine elaborata con strumenti di intelligenza artificiale

**Didascalia** · p · mono · solo con luogo e data confermati · oggi non pubblicata
> Puglia Digitale, evento regionale · {luogo}, {data}

Note:
- La didascalia si pubblica solo quando luogo e data sono confermati (brief, A4). Fino ad allora la foto resta accompagnata dalla legenda e dalla nota sull’immagine. `[DA FORNIRE: luogo, data e autore della foto]`
- Nessun numero di partecipanti. In basso a destra dell’originale c’è la filigrana ✦ di Gemini: i ritagli la escludono, ma serve l’originale senza sovrimpressioni e la conferma che la scena non è stata alterata (direzione visiva, § 4.2).
- **Nota sull’immagine.** Resta finché non arrivano l’originale dello scatto e la conferma del cliente (review di veridicità, B4; ADR 002).
- **«regionale» nella didascalia** `[DA DECIDERE]`. Il sito l’ha tolto dal nodo 2 per non suggerire un legame istituzionale (brief, A2), ma la didascalia di riserva lo contiene ancora, come la direzione visiva (§ 4.2). Propongo «L’evento Puglia Digitale · {luogo}, {data}», con lo stesso nome della sezione. Decide il creative-director; finché luogo e data non arrivano, in pagina non cambia nulla.
- **Testo alternativo** (`alt-text.md`, `derivate/evento-panorama.jpg` da desktop e `derivate/evento-citta.jpg` su mobile, stesso testo): «La platea dell’evento Puglia Digitale; sul maxischermo a sinistra del palco, il tour virtuale di una città vista dall’alto.»

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

Alternativa non adottata (nel sito l’H2 è «I tre mondi ITnode», in scala di etichetta): H2 «Un’impresa. Un territorio. Una rete di città.» (45, entro il limite della struttura UX) e «I tre mondi ITnode» come occhiello mono. La mappa SEO indica «I tre mondi ITnode» come H2: con l’alternativa va avvisato seo-content.

**Statement di sezione** · p · su una riga (non a registri) · max 50 (45) · nel sito, subito dopo l’H2
> Un’impresa. Un territorio. Una rete di città.

**Testo** · p · max 200 (193) · Gulpease 52 · blocco di risposta F di seo-content, accorciato · dopo lo statement
> SIII, Puglia Digitale e Città Digitali sono tre applicazioni concrete della stessa visione. ITnode rende esplorabili gli spazi reali e usa questa tecnologia per valorizzare imprese e territori.

**I tre capitoli** · copy · una colonna per capitolo, nell’ordine della direzione visiva: numero, nome, statement, visual, microdescrizione, CTA

| Elemento | Tag · max | 01 | 02 | 03 |
|---|---|---|---|---|
| Numero | span `aria-hidden="true"` · 2 | 01 | 02 | 03 |
| Rilevamento | mono, `aria-hidden="true"` | 000° · N | 120° | 240° |
| Nome | H3 · 16 | SIII | Puglia Digitale | Città Digitali |
| Descrittore | seconda riga dell’H3, più piccola · 30 | Siti Interattivi Immersivi | — | — |
| Statement | p, due registri · 60 | Spazi reali.<br>Esperienze digitali. | Un territorio.<br>Migliaia di storie. | Le attività del territorio,<br>online senza perdere radici. |
| Microdescrizione | p · 160 (struttura UX) | Il SIII replica digitalmente gli spazi della tua impresa. Chi entra li esplora da desktop e smartphone, guarda prodotti e video, chiede informazioni e prenota. | Un progetto di destination marketing che digitalizza città, borghi e imprese della Puglia. E li valorizza con esperienze immersive. | Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per imprese e attività. Varese, Altamura, Caltanissetta: città diverse, un unico portale. |
| Lunghezza e Gulpease | — | 159 · 61 | 131 · 63 | 152 · 56 |
| CTA | a · verbatim · 28 | Esplora SIII → | Scopri Puglia Digitale → | Esplora Città Digitali → |
| Destinazione | — | `/siii/` | `/puglia-digitale/` | `/citta-digitali/` |
| `data-track` | — | `home-capitolo-siii` | `home-capitolo-puglia-digitale` | `home-capitolo-citta-digitali` |
| Visual | — | Schermata reale del SIII della Tana di Aldo, vista dall’interno (`siii-la-tana-di-aldo-desktop-sala.jpg`, commit c11734b). Testo alternativo (`alt-text.md` 1.11): «Il SIII della Tana di Aldo: una sala con la volta in pietra e i tavoli apparecchiati, vista dalla scala, e l’interfaccia dell’esperienza.» Sopra la schermata non ci sono nodi decorativi: sono stati tolti dal markup (commit bae201c) | Carta compatta della Terra di Bari, `aria-hidden`: Acquaviva delle Fonti, con l’anello della sede, Gravina in Puglia e Monopoli, più «Mare Adriatico» e «Murgia». Nessuna coordinata sotto i nomi (direzione visiva 0.12, R3) | Carta d’Italia con le città del portale, un punto ciascuna. Nomi dove c’è spazio (regola 11 della direzione visiva 0.12): 7 sulle carte larghe (Varese, Itri, Bari, Altamura, Cosenza, Caltanissetta, Caltagirone), 5 su quelle strette (senza Bari e Caltagirone). Legenda e descrizione: blocco «Capitolo 03 con la carta di tutte le città», qui sotto |

Note:
- Gli statement sono gli esempi del § 08, invariati, con l’a capo d’autore dopo il primo punto (01 e 02) e dopo la virgola (03).
- Il blocco F è accorciato: la sua seconda frase, cioè che cosa fa ciascun progetto, è distribuita nelle microdescrizioni, sotto il rispettivo H3.
- Lo statement di sezione è in uso, subito dopo l’H2. Segue il filo narrativo del brief (2.3): dalla singola impresa al territorio, fino alla rete di città, una parola per capitolo. Non lascia intendere che tutta l’Italia sia coperta (N12). Se si usa, va su una riga: la regola del Passaggio ammette tre registri solo per «Entra. Esplora. Interagisci.».
- 01: le funzioni del SIII sono quelle del § 10. Il descrittore scioglie la sigla alla prima occorrenza, come l’hero della pagina SIII.
- 02: nessuna attribuzione della creazione di Puglia Digitale (A1). «destination marketing» con `lang="en"`.
- 03: ordine «Siti Interattivi Immersivi» uniformato (il § 17 scrive «Siti Immersivi Interattivi»: brief, DR2). «Imprese e attività» riassume il «tessuto imprenditoriale e commerciale italiano» del § 17; la scala nazionale la dicono le tre città del § 18, nominate come chiede N12 e coincidenti con i nodi della carta.
- **Visual**, come nel sito al 2026-10-07: schermata reale nel capitolo 01, carta della Terra di Bari nel 02, carta d’Italia con tutte le città nel 03 (direzione visiva 0.12, § 7.3). La carta della Puglia intera è approvata per la hero di `/puglia-digitale/`; nel capitolo 02 arriva solo se l’utente approva la proposta P4 (direzione visiva, § 7.3). I testi dei capitoli non cambiano con i visual.
- **01, schermata della Tana di Aldo** (dal 2026-10-08; prima, la vista interna di Masseria Santella). Il testo alternativo nomina l’impresa, perché il testo accanto non lo fa; la microdescrizione resta generale, sul SIII, e non cambia. Il nome è letto dal logo `[DA VERIFICARE]`.
  - Il consenso dell’impresa a comparire con nome e immagini non è ancora registrato (brief, A7; ADR 002 0.3, impresa per impresa). Per cro-specialist è bloccante per il go-live (review del 2026-10-07, oss. 2): senza consenso, al lancio la schermata non si pubblica (ADR 002).
  - Il creative-director valuta la vista da smartphone della stessa esperienza per i telefoni: l’alt vale anche per quella (`alt-text.md`, «Ritaglio della Home»).
- Niente link esterni nei capitoli: prima si approfondisce sul sito (cro-specialist). Le CTA hanno testi diversi tra loro, quindi non serve un nome accessibile aggiuntivo.

**Capitolo 03 con la carta di tutte le città** · nel sito dal commit 0a61546 (2026-10-05), con la descrizione B dal commit 4b90180 (2026-10-06) · proposta di ui-designer, decisa nella direzione visiva; alternativa testuale di ux-designer · motivazioni e misure: `docs/review/2026-10-05-legenda-mappa-copywriter-brand.md`

| Elemento | Tag e stile | Testo | Note |
|---|---|---|---|
| Legenda | `figcaption` · `t-label` · max 40 (40) | Ogni punto è una città di Città Digitali | Adottata dal creative-director (direzione visiva 0.6, § 1.4). Spazi unificatori tra «di», «Città» e «Digitali» (`di&nbsp;Città&nbsp;Digitali`). Una riga da 360 px; a 320 px «Ogni punto è una città / di Città Digitali». Nessun numero nella Home: quando si potrà, va nell’elenco di `/citta-digitali/`. Mai «Un punto per ogni città», che dichiara la completezza dell’elenco |
| Descrizione della carta | `aria-label` della carta con `role="img"` (decisione di ux-designer) · costruita dai dati (`describeCittaDigitali`, `src/lib/citta-digitali.ts`) · 199 caratteri | Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia. Tra queste: Varese, Itri, Altamura, Cosenza e Caltanissetta. | Forma B (ux-designer, review del 2026-10-06). Modello: «… Sono in {regioni da nord a sud}, {quota} {regione con più città}. Tra queste: {nomi disegnati a ogni larghezza, da nord a sud}.» I nomi d’esempio sono quelli della carta stretta, così ogni nome detto è sulla carta anche al telefono (stessa regola della L7; `accessibilita.md`, § 2.8). «la maggior parte in» solo se quella regione ha più della metà delle città, altrimenti «più che altrove in». Niente numeri, mai «ogni» o «tutte» (review, L4). **Variante «Tra queste anche {nomi}.»** (2026-10-08, review L8): solo quando la descrizione lascia fuori città che chi ascolta ha appena sentito accanto alla carta. Oggi vale per `/citta-digitali/`, senza le tre città delle schede: «… Tra queste anche Itri e Cosenza.» (171 caratteri). Sulla Home resta «Tra queste:», perché la descrizione dice tutti i nomi disegnati a ogni larghezza |
| Link | — | Nessuno nel capitolo | Una sola CTA per capitolo (ux-designer, HM-5) e niente link esterni nei capitoli della Home (strategia di conversione). Il link «Tutte le città sul portale ↗» va su `/citta-digitali/`, sezione «L’Italia in un unico portale.» (review, L2) |
| Microdescrizione | p | Invariata | Resta vera con la carta piena: le tre città del testo sono i nomi obbligatori della carta, visibili a ogni larghezza |

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

**Citazione** · `blockquote` dentro `figure` · verbatim · chiude la sezione, dopo il ritratto (§ 09) · nel sito tra virgolette basse («»)
> È questo il futuro che mi appassiona e che stiamo costruendo giorno dopo giorno.

**Firma** · `figcaption` · max 40 (35)
> Giacomo Lenoci, fondatore di ITnode

**Link al profilo** · a · nuova scheda · nome accessibile «Giacomo Lenoci su LinkedIn (si apre in una nuova scheda)»
> Giacomo Lenoci su LinkedIn ↗

**Nota sotto il ritratto** · testo di `media.ts` (DR3-b)
> Immagine generata o elaborata con strumenti di intelligenza artificiale

Note:
- **Nome e ruolo** `[DA VERIFICARE]` (brief, F7): «Giacomo Lenoci» e «fondatore» sono visibili nel lead e nella firma. Servono al nodo Person dei dati strutturati (`jobTitle` «Fondatore»: `dati-strutturati.md`, § 7). Il link a LinkedIn in questa sezione giustifica il `sameAs`. Se il nome non viene confermato: «il fondatore di ITnode», e niente Person.
- **«36 anni»**: dato del cliente, utilizzabile (N4). Presuppone il 1990 `[DA VERIFICARE]` e va aggiornato ogni anno; in alternativa, il titolo senza numero.
- **Perché «Dal 2002» sta sulla tappa 3 e la tappa 2 non ha data.** La sequenza del § 09 («prima azienda, 2002, MyComm») si può leggere in due modi: «prima azienda nel 2002» (così la scaletta di seo-content) oppure «MyComm nel 2002» (così il brief, I5, e la direzione visiva). «Dal 2002» sulla tappa 3 è vero con entrambe le letture. Se la timeline si disegna a tacche, «2002» resta una tacca a sé tra «La prima azienda» e «MyComm», senza testo che dica a quale delle due appartiene, finché il cliente non risponde (F3).
- **«10.000+ clienti»** si usa solo nel percorso del fondatore e non va mai attribuito a ITnode (N5). Per questo l’etichetta dice «prima di ITnode». Non va accostato al logo o ai progetti ITnode, né impaginato dentro la tappa «Oggi». Perimetro e fonte restano `[DA VERIFICARE]`. seo-content propone di toglierlo finché non è documentato: vedi «Decisioni richieste».
- **iComm Lab**: grafia da confermare. Il § 09 scrive «IcommLab».
- **Markup**: `<ol>`, con `<time datetime="2002">` solo sulle date complete; «Anni ’90» e «Oggi» restano testo semplice.
- **Citazione**: «È questo il futuro» rimanda a ciò che la precede. Con i testi provvisori, il riferimento è la tappa «Oggi»; con il racconto originale del cliente sarà il suo ultimo paragrafo.
- **Ritratto**: `derivate/fondatore-ritratto.jpg`, da `fondatore-braccia-conserte.jpg`, nel trattamento «inchiostro», senza didascalia su luoghi, date o eventi (direzione visiva, § 4.3). Testo alternativo (`alt-text.md`): «Giacomo Lenoci a braccia conserte, in abito scuro.» La nota resta finché il cliente non chiarisce la provenienza dell’immagine. La scelta dell’immagine resta dell’utente (brief, DR3): il sito usa l’opzione (b), che l’ADR 002 propone per il lancio.
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
- **Per ux-designer**: la carta della Terra di Bari del capitolo 02 è `aria-hidden` e disegna «Acquaviva delle Fonti», «Gravina in Puglia» e «Monopoli». La direzione visiva (§ 1.4) e `accessibilita.md` (§ 2.8) la danno per decorativa perché i suoi luoghi sarebbero «già scritti nel testo accanto», ma il testo del capitolo 02 non li nomina. Due strade: una descrizione della carta, per esempio «Carta della Terra di Bari con Gravina in Puglia e Monopoli. Un anello segna Acquaviva delle Fonti, sede di ITnode.» (da ovest a est, come le porte di `/puglia-digitale/`; stesso schema della L7, senza ripetere la sede), oppure i tre nomi nel testo, che però cambierebbe una microdescrizione approvata. Decide ux-designer.
- **Per il creative-director**: «regionale» nella didascalia di riserva della foto dell’evento (sezione 3) e nella direzione visiva (§ 4.2). Il sito l’ha già tolto dal nodo 2.

## Decisioni richieste

- **«10.000+ clienti» al lancio**: decisa al G4 (verdetto del creative-director, § 3.8). Con la conferma del perimetro vale l’opzione A, con l’etichetta confermata; senza, l’opzione B: il numero si toglie e la tappa resta.
- **Varianti B e C della riga di posizionamento** (cro-specialist): se includerle nel test E1 dopo il lancio (sezione 1). Parere del creative-director (direzione visiva, § 5): si prova B come sfidante principale; C resta di riserva.
- **Titolo del fondatore** (utente): «36 anni…», da aggiornare ogni anno, oppure l’alternativa senza numero.
- **Immagine della sezione fondatore** (utente, sentito creative-director): DR3 del brief. Oggi il sito usa l’opzione (b), il ritratto a braccia conserte trattato a inchiostro, con la nota; l’ADR 002 la propone per il lancio e un ritratto reale appena possibile.
