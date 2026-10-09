---
titolo: Copy deck · Home
owner: copywriter-brand
contributi: [creative-director, seo-content, brand-strategist, cro-specialist, ux-designer, copywriter-content]
stato: in revisione
versione: 1.8
aggiornato: 2026-10-09
fonti: [staging http://127.0.0.1:4321 con la build di e406ecb (HTML della Home identico il 2026-10-08 e il 2026-10-09), prove Playwright del 2026-10-08 e del 2026-10-09 sullo staging (Chromium, scratchpad, non versionate), commit e406ecb (vista da smartphone della Tana di Aldo sui telefoni), 6c6f501 (copy deck 1.7 e alt definitivo), c11734b (schermata della Tana di Aldo nel capitolo 01, richiesta dell'utente del 2026-10-08), 3e25c42 (Puglia intera nel capitolo 02, P4), bae201c (carta della Terra di Bari tolta dal codice), 920e497 (foto dell'evento senza cornice), 3bfe9b2 (ritratto del fondatore centrato), docs/review/2026-10-08-home-capitolo-siii-tana-di-aldo-creative-director.md, docs/review/2026-10-08-hero-siii-yes-brand-strategist.md (1.1, §4 e §6), docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.4: A7, A8, §3.1), docs/creativa/direzione-visiva.md (0.21: §1.4, §4.1, §4.2, §4.5, §4.8, §7.3), docs/contenuti/alt-text.md (1.11), docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (1.4: L1, L4, L7, L8), docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/ux/sitemap.md, docs/ux/struttura-pagine.md, docs/ux/accessibilita.md (§2.8), docs/seo/mappa-keyword-url.md, docs/seo/dati-strutturati.md, docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md (§5), docs/contenuti/tone-of-voice.md, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/review/2026-09-28-sito-bozze-copywriter-content.md (H5, T6), docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md, docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md, docs/review/2026-10-06-descrizione-carta-home-ux-designer.md, docs/strategia/coordinate-luoghi.md, docs/strategia/citta-digitali-elenco.md, src/pages/index.astro, src/pages/siii.astro, src/components/sections/ProjectShowcase.astro, src/components/sections/CTASection.astro, src/components/ui/Horizon.astro, src/data/site.ts, src/data/media.ts, src/data/maps.json, src/lib/citta-digitali.ts, src/styles/global.css (t-label)]
---

# Copy deck · Home

Pagina `/`. Copre le sezioni 07, 08 e 09 delle linee guida e la chiusura con CTA verso i contatti, nell’ordine delle sette sezioni fissato dalla direzione visiva (`docs/creativa/direzione-visiva.md`, § 7.3). I testi sono pronti da impaginare. Le parti provvisorie sono elencate in fondo, in «Testi da sostituire con gli originali del cliente».

**Versione 1.8 (2026-10-09): il copy deck descrive di nuovo la Home com’è, sulla build di e406ecb.** Nessun testo pubblicato cambia. Rispetto alla 1.7:
- capitolo 01: la riga «Visual» di copywriter-content è rivista e accolta. In più ci sono la vista da smartphone sotto i 40em (commit e406ecb), la riserva confermata dal creative-director e il modello della riga con il nome, con i segnaposto e gli a capo misurati (blocco «Capitolo 01 con la schermata della Tana di Aldo»);
- capitolo 02: la carta della Puglia intera con le città di Puglia Digitale, con legenda e descrizione L7, al posto della carta della Terra di Bari, che non è più nel sito (commit 3e25c42 e bae201c; blocco «Capitolo 02 con la carta della Puglia»);
- documento: la didascalia decisa dal creative-director, «L’evento Puglia Digitale · {luogo}, {data}», e la foto senza cornice (commit 920e497);
- allineamenti al codice: `data-cta-id` al posto di `data-track` nelle tabelle, i contatti della chiusura su due righe senza separatore, i nomi della tappa «Oggi» in elenco, il numero del capitolo in un `p`, il separatore nascosto dell’H3 «SIII», «000° N» tra i gradi dell’orizzonte, il ritratto centrato;
- Gulpease ricalcolato con la legenda del capitolo 02; Ipotesi, Domande aperte e Decisioni richieste aggiornate.

**Versione 1.7 (2026-10-08).** Capitolo 01: la schermata del SIII della Tana di Aldo al posto di quella di Masseria Santella (commit c11734b, richiesta dell’utente), con il testo alternativo di `alt-text.md` 1.11. Aggiornamento di copywriter-content su richiesta della sessione principale, solo nella riga «Visual» e nella nota del capitolo 01: da rivedere per copywriter-brand (rivista e accolta nella 1.8). Nessun testo della Home cambia.

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
- **Gulpease**: calcolato con uno script con la formula 89 + (300 × frasi − 10 × lettere) / parole; ogni titolo o paragrafo conta almeno una frase. Insieme dei testi: titoli (H1 e H2), statement, riga di posizionamento, paragrafi, legenda dei nodi del documento, legende delle carte dei capitoli 02 e 03, didascalie della timeline, compresa «10.000+ clienti, prima di ITnode», e citazione; esclusi occhielli, nomi e descrittori dei capitoli, etichette mono, CTA, contatti, testi alternativi e descrizioni delle carte. Ricalcolato il 2026-10-09 sui testi dello staging: 72 nel complesso (364 parole). Senza la legenda del capitolo 02, nel sito dal 2026-10-07, l’insieme è quello della versione 1.5: 356 parole e 71,9, cioè lo stesso 72. Il 69 della versione 1.0 veniva da un insieme di testi non documentato e non è riproducibile; i valori dei singoli testi sono confermati.
- **Riferimenti**: grafie, CTA e punteggiatura in `tone-of-voice.md`; testi alternativi in `alt-text.md` (copywriter-content); header, footer, form, marquee e 404 in `microcopy.md`; eventi (`data-track`) e chiavi delle CTA (`data-cta-id`) nella strategia di conversione, § 4, e nel piano di misurazione, § 5.

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
    H3  SIII – Siti Interattivi Immersivi
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

Formato: nome, trattino lungo, rilevamento, distanza in linea d’aria. I luoghi a meno di 12° l’uno dall’altro si raggruppano, con i nomi brevi in ordine di rilevamento. Le quattro etichette di oggi: «Monopoli — 081° · 38 km», «Caltanissetta — 213° · 449 km», «Altamura · Cassano · Gravina — 251–256° · 7–37 km», «Varese — 313° · 848 km». Sotto i 700 px l’etichetta va su due righe, nome e rilevamento, senza distanza. Sull’orizzonte ci sono anche i gradi ogni 45°, con i punti cardinali: «000° N», «090° E», «180° S», «270° O». Nel sorgente la maiuscola va solo all’iniziale; il maiuscolo lo applica il CSS.

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

**Didascalia** · p · mono · solo con l’originale dello scatto, luogo e data confermati · oggi non pubblicata
> L’evento Puglia Digitale · {luogo}, {data}

Note:
- **Quando si pubblica.** Servono tre conferme: l’originale dello scatto, cioè che la scena non è alterata, il luogo e la data (brief, A4; direzione visiva, § 4.2). Su un’immagine elaborata con strumenti di intelligenza artificiale non va nessuna didascalia con luogo e data: legherebbe a un evento preciso una scena che non è un documento (direzione visiva, § 4.1, regola 2). Fino ad allora la foto resta con la legenda e la nota sull’immagine. `[DA FORNIRE: originale dello scatto, con luogo, data e autore]`
- **Testo deciso** dal creative-director nella direzione visiva 0.13 (§ 4.2), sulla proposta della versione 1.5 di questo documento. Senza «regionale», come il nodo 2: non deve suggerire un legame istituzionale (brief, A2). Comincia con il nome della sezione. Se l’autore è noto ed è d’accordo, si aggiunge «· foto {autore}».
- Nessun numero di partecipanti, se non documentato.
- **La foto.** Dal 2026-10-07 i due ritagli vengono dalla versione senza cornice, scritte e ✦ (commit 920e497). È un’altra elaborazione della stessa scena, non l’originale dello scatto: l’oratore ha un’altra posa (direzione visiva, § 4.2).
- **Nota sull’immagine.** Resta finché non arrivano l’originale dello scatto e la conferma del cliente (review di veridicità, B4; ADR 002).
- **Testo alternativo** (`alt-text.md`, `derivate/evento-panorama.jpg` da desktop e `derivate/evento-citta.jpg` sotto i 700 px, stesso testo): «La platea dell’evento Puglia Digitale; sul maxischermo a sinistra del palco, il tour virtuale di una città vista dall’alto.»

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
| Numero | p `aria-hidden="true"` · 2 | 01 | 02 | 03 |
| Rilevamento | mono, `aria-hidden="true"` | 000° · N | 120° | 240° |
| Nome | H3 · 16 | SIII | Puglia Digitale | Città Digitali |
| Descrittore | seconda riga dell’H3, più piccola, dopo un separatore nascosto alla vista (`<span class="sr-only"> – </span>`, T6): nome accessibile «SIII – Siti Interattivi Immersivi» · 30 | Siti Interattivi Immersivi | — | — |
| Statement | p, due registri · 60 | Spazi reali.<br>Esperienze digitali. | Un territorio.<br>Migliaia di storie. | Le attività del territorio,<br>online senza perdere radici. |
| Microdescrizione | p · 160 (struttura UX) | Il SIII replica digitalmente gli spazi della tua impresa. Chi entra li esplora da desktop e smartphone, guarda prodotti e video, chiede informazioni e prenota. | Un progetto di destination marketing che digitalizza città, borghi e imprese della Puglia. E li valorizza con esperienze immersive. | Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per imprese e attività. Varese, Altamura, Caltanissetta: città diverse, un unico portale. |
| Lunghezza e Gulpease | — | 159 · 61 | 131 · 63 | 152 · 56 |
| CTA | a · verbatim · 28 | Esplora SIII → | Scopri Puglia Digitale → | Esplora Città Digitali → |
| Destinazione | — | `/siii/` | `/puglia-digitale/` | `/citta-digitali/` |
| `data-cta-id` | evento `cta_click`, `data-cta-location="capitolo"` | `home-capitolo-siii` | `home-capitolo-puglia-digitale` | `home-capitolo-citta-digitali` |
| Visual | — | Schermata reale del SIII della Tana di Aldo, dall’interno della sala, in due viste della stessa esperienza: da 40em la vista desktop intera, 16:10 (`siii-la-tana-di-aldo-desktop-sala.jpg`, commit c11734b); sotto i 40em, sui telefoni in verticale, un ritaglio 4:5 della vista da smartphone (`derivate/siii-la-tana-di-aldo-mobile-sala-4x5.jpg`, commit e406ecb). Un solo testo alternativo per le due viste (`alt-text.md` 1.11): «Il SIII della Tana di Aldo: una sala con la volta in pietra e i tavoli apparecchiati, vista dalla scala, e l’interfaccia dell’esperienza.» Nessun nodo decorativo sopra la schermata (tolti dal markup nel commit bae201c). La riga con il nome non è pubblicata. Dettagli: blocco «Capitolo 01 con la schermata della Tana di Aldo», qui sotto | Carta della Puglia intera con le città di Puglia Digitale, compatta, la stessa della hero di `/puglia-digitale/` (P4, approvata dall’utente il 2026-10-07; commit 3e25c42). Un punto per città, l’anello della sede su Acquaviva delle Fonti, i nomi dove c’è spazio, nessuna coordinata. Legenda, descrizione e nomi: blocco «Capitolo 02 con la carta della Puglia», qui sotto | Carta d’Italia con le città del portale, un punto ciascuna. Nomi dove c’è spazio (regola 11 della direzione visiva 0.12): 7 sulle carte larghe (Varese, Itri, Bari, Altamura, Cosenza, Caltanissetta, Caltagirone), 5 su quelle strette (senza Bari e Caltagirone). Legenda e descrizione: blocco «Capitolo 03 con la carta di tutte le città», qui sotto |

Note:
- Gli statement sono gli esempi del § 08, invariati, con l’a capo d’autore dopo il primo punto (01 e 02) e dopo la virgola (03).
- Il blocco F è accorciato: la sua seconda frase, cioè che cosa fa ciascun progetto, è distribuita nelle microdescrizioni, sotto il rispettivo H3.
- Lo statement di sezione è in uso, subito dopo l’H2. Segue il filo narrativo del brief (2.3): dalla singola impresa al territorio, fino alla rete di città, una parola per capitolo. Non lascia intendere che tutta l’Italia sia coperta (N12). Se si usa, va su una riga: la regola del Passaggio ammette tre registri solo per «Entra. Esplora. Interagisci.».
- 01: le funzioni del SIII sono quelle del § 10. Il descrittore scioglie la sigla alla prima occorrenza, come l’hero della pagina SIII.
- 02: nessuna attribuzione della creazione di Puglia Digitale (A1). «destination marketing» con `lang="en"`.
- 03: ordine «Siti Interattivi Immersivi» uniformato (il § 17 scrive «Siti Immersivi Interattivi»: brief, DR2). «Imprese e attività» riassume il «tessuto imprenditoriale e commerciale italiano» del § 17; la scala nazionale la dicono le tre città del § 18, nominate come chiede N12 e coincidenti con i nodi della carta.
- **Visual**, come nel sito al 2026-10-09 (build di e406ecb): la schermata reale nel capitolo 01, con una vista apposta per i telefoni in verticale; la carta della Puglia intera nel 02; la carta d’Italia con tutte le città nel 03 (direzione visiva 0.21, § 7.3). Le carte dei capitoli 02 e 03 sono un unico gesto, dalla regione all’Italia. La carta della Terra di Bari, nel capitolo 02 fino al 2026-10-07, non è più nel sito né nel codice (commit 3e25c42 e bae201c). I testi dei capitoli non cambiano con i visual.
- Niente link esterni nei capitoli: prima si approfondisce sul sito (cro-specialist). Le CTA hanno testi diversi tra loro, quindi non serve un nome accessibile aggiuntivo.

**Capitolo 01 con la schermata della Tana di Aldo** · vista desktop nel sito dal commit c11734b (richiesta dell’utente del 2026-10-08); vista da smartphone sui telefoni in verticale dal commit e406ecb (verdetto del creative-director del 2026-10-08: `docs/review/2026-10-08-home-capitolo-siii-tana-di-aldo-creative-director.md`) · testo alternativo di copywriter-content (`alt-text.md` 1.11)

| Elemento | Tag e stile | Testo o file | Note |
|---|---|---|---|
| Vista desktop | `<img>` nello Schermo 16:10, da 40em (640 px), quindi anche su tablet e telefoni in orizzontale | `siii-la-tana-di-aldo-desktop-sala.jpg`, intera | La sala con la volta in pietra vista dalla scala; sopra, l’interfaccia: il logo, «APRI QUI», le icone di WhatsApp, Facebook, Instagram e della posizione, il link alla privacy. «APRI QUI» tocca il logo: si lascia com’è, ed è chiesta all’utente una vista desktop senza la sovrapposizione (verdetto, decisione 3 e H4) |
| Vista da smartphone | `<source>` dello stesso `<picture>`, sotto i 40em, 4:5 a tutta larghezza | `derivate/siii-la-tana-di-aldo-mobile-sala-4x5.jpg`, ritaglio della vista da smartphone (x 120, y 650, 1080 × 1350) | La sala, la ringhiera della scala e le icone di WhatsApp, Facebook e Instagram. Il logo non c’è: sui telefoni il nome lo dice il testo alternativo e, quando arriverà, la riga |
| Testo alternativo | `alt` dell’unico `<img>`, per le due viste · 137 caratteri · Gulpease 55 | Il SIII della Tana di Aldo: una sala con la volta in pietra e i tavoli apparecchiati, vista dalla scala, e l’interfaccia dell’esperienza. | Rivisto e approvato: note qui sotto |
| Riga con il nome | `t-label`, `--fg-2`, sotto lo Schermo e fuori dall’apertura · oggi non pubblicata | La Tana di Aldo · [DA FORNIRE: comune] ([DA FORNIRE: sigla della provincia]) | Modello, condizioni e a capo: «Riga con il nome sotto la schermata», qui sotto |
| Nodi | — | Nessuno | Tolti dal markup nel commit bae201c: i punti li disegna già l’interfaccia (direzione visiva, § 4.8) |
| Link | — | Solo la CTA del capitolo | La schermata non è un link, e la riga nemmeno (HM-5) |

Note sul capitolo 01:
- **Revisione della 1.7.** La riga «Visual» di copywriter-content corrispondeva al sito di allora: la tengo nella sostanza. Ho aggiunto la vista da smartphone, che il creative-director in quel momento stava valutando, e ho raccolto i dettagli in questo blocco.
- **Testo alternativo: lo approvo, per tutte e due le viste.**
  - Nel ritaglio per i telefoni si vedono la volta in pietra, i tavoli apparecchiati, la ringhiera della scala e tre icone dell’interfaccia: ogni parte dell’alt è vera anche lì. L’ho verificato sul derivato e sullo staging a 390 px.
  - «Della Tana di Aldo»: quando un nome comincia con l’articolo, l’articolo si unisce alla preposizione, come si dice a voce.
  - Nomina l’impresa perché il testo accanto non lo fa. La microdescrizione resta generale, sul SIII, e non cambia.
  - «La Tana di Aldo» è letto dal logo `[DA VERIFICARE: nome con cui l’impresa si presenta, con la grafia esatta]`. Se il nome confermato è diverso, cambia solo il nome, nell’alt e nella riga.
- **Consenso e realizzazione (A7, A8): bloccanti per il go-live** (verdetto del creative-director, H1; review di brand-strategist del 2026-10-08, T1 e T2).
  - Il consenso dell’impresa a comparire con nome, logo e schermate non è registrato.
  - Manca anche la conferma che il SIII l’ha realizzato ITnode: lo presuppone il capitolo e lo afferma l’alt («Il SIII della Tana di Aldo»).
  - Senza consenso e conferma, al lancio vale la riserva dell’ADR 002 (§ 3.1), confermata dal creative-director:
    1. escono le due viste della Tana di Aldo, con il loro alt;
    2. torna l’interno di Masseria Santella da desktop, 16:10 a ogni larghezza, se Masseria Santella ha dato il consenso, con il suo alt (`alt-text.md`) e con la riga «Masseria Santella · Cassano delle Murge (BA)» alle stesse condizioni;
    3. altrimenti la variante «in pubblicazione» del capitolo, senza nome né luogo (direzione visiva, § 4.5).
  - In nessuno dei tre casi cambiano i testi del capitolo.

**Riga con il nome sotto la schermata** · decisa dal creative-director (direzione visiva 0.21, § 4.8; verdetto del 2026-10-08, H3) · testo di copywriter-brand · oggi non pubblicata

Forma: `{nome dell’impresa} · {comune} ({sigla della provincia})`. Per il capitolo 01, da completare con i dati dell’impresa:
> La Tana di Aldo · [DA FORNIRE: comune] ([DA FORNIRE: sigla della provincia])

Nel sorgente: `La&nbsp;Tana&nbsp;di&nbsp;Aldo&nbsp;· {comune}&nbsp;({sigla})`, con spazi unificatori anche tra le parole del comune. L’unico spazio normale è quello dopo «·».

- **Va online solo con i dati e il consenso:** il nome con cui l’impresa si presenta, nella grafia confermata, il comune e la sigla della provincia; il consenso scritto (A7) e la conferma che il SIII l’ha realizzato ITnode (A8), che valgono per la schermata. Fino ad allora nessuna riga, e il nome resta solo nell’alt (ADR 002, § 3.1).
  - Le domande per l’utente sono già nella review di brand-strategist del 2026-10-08 (§ 4, punti 1, 2, 3 e 5): non si chiedono due volte.
  - Nessun comune si ricava dalla schermata o da ricerche: sarebbe un dato inventato (soglia 1).
- **Nome.** Quello dell’insegna, non la ragione sociale: senza forma giuridica (niente «S.r.l.» o «S.n.c.»), come i nomi delle schede degli esempi di `/siii/`. Nel sorgente la maiuscola sta solo dove la vuole il nome; il maiuscolo lo applica `t-label`.
- **Luogo.** Il comune, non la frazione né l’indirizzo, con la sigla della provincia di due lettere tra parentesi, come nella riga del luogo delle schede degli esempi di `/siii/`.
- **A capo.** Misurati sullo staging di e406ecb (il 2026-10-08 e il 2026-10-09), con lo stile di `t-label` e la larghezza dello Schermo, in Chromium. Il carattere è monospaziato, quindi conta il numero di caratteri: una riga ne tiene 36 a 320 px, 42 a 360, 46 a 390 e 72 a 1024.
  - L’unico punto d’a capo è lo spazio dopo «·». Così il testo resta su una riga quando c’è spazio, altrimenti va su due: «La Tana di Aldo ·» / «{comune} ({sigla})».
  - Su una riga da 320 px in su con un comune fino a 13 caratteri; da 390 px fino a 22; da 600 px con qualunque comune provato, fino a 39 caratteri.
  - Senza spazi unificatori la sigla può restare da sola a capo (a 412 px, con un comune di 25 caratteri), e un comune di più parole si spezza dopo la preposizione: «Masseria Santella · Cassano delle / Murge (BA)», a 320 e 360 px.
  - Con la spaziatura del testo di WCAG 1.4.12, a 320 px la seconda riga regge un comune fino a 28 caratteri, senza scorrimento orizzontale. Con un comune più lungo, gli spazi del comune tornano normali.
- **Lettura per gli screen reader.** Markup e lettura li decide ux-designer (verdetto, H3). Propongo che si senta «La Tana di Aldo, {comune} ({sigla})»: il «·» in uno `<span aria-hidden="true">` e una virgola `sr-only`, come i separatori nascosti dei titoli (T6). Se il «·» resta leggibile, secondo lo screen reader e le sue impostazioni lo si sente per nome oppure non lo si sente affatto, e allora nome e comune arrivano attaccati `[DA VERIFICARE con gli screen reader in Fase 5, come la sigla SIII]`.
- **Testo alternativo con la riga.** Quando la riga va online, il nome non va ripetuto: l’alt passa alla variante «Con il nome nel testo accanto» di `alt-text.md` (copywriter-content), «Una sala con la volta in pietra e i tavoli apparecchiati, vista dalla scala, con l’interfaccia dell’esperienza.» (111 caratteri).
- **Riserva.** Con l’interno di Masseria Santella la riga è «Masseria Santella · Cassano delle Murge (BA)» (44 caratteri; direzione visiva, § 4.8), alle stesse condizioni.
  - Nel sorgente: `Masseria&nbsp;Santella&nbsp;· Cassano&nbsp;delle&nbsp;Murge&nbsp;(BA)`. A 320 e 360 px va su due righe, «Masseria Santella ·» / «Cassano delle Murge (BA)»; da 390 px su una. Con la spaziatura di 1.4.12 resta su due righe fino a 390 px.
  - L’alt è quello di Masseria Santella «Con il nome nel testo accanto» (`alt-text.md`, 120 caratteri).
- **Non è un link** (HM-5). Nessun numero e nessun aggettivo: dice solo di chi è lo spazio e dove sta.

**Capitolo 02 con la carta della Puglia** · nel sito dal commit 3e25c42 (2026-10-07; P4, approvata dall’utente: «sì, mettila») · la carta della hero di `/puglia-digitale/`, compatta · legenda e descrizione L7 (`docs/review/2026-10-05-legenda-mappa-copywriter-brand.md`), adottate da ux-designer e dal creative-director (direzione visiva, § 1.4)

| Elemento | Tag e stile | Testo | Note |
|---|---|---|---|
| Legenda | `figcaption` · `t-label` · max 41 (41) | Ogni punto è una città di Puglia Digitale | Forma di L1, la stessa del capitolo 03: in tutto il sito i punti si leggono in un modo solo. Spazi unificatori tra «di», «Puglia» e «Digitale» (`di&nbsp;Puglia&nbsp;Digitale`). Una riga da 360 px; a 320 px «Ogni punto è una città / di Puglia Digitale». Con la spaziatura di WCAG 1.4.12 va su due righe dove la carta è stretta, mai fuori dalla carta (misurato il 2026-10-09). Nessun numero |
| Descrizione della carta | `aria-label` della carta con `role="img"` · costruita dai dati (`describePugliaDigitale`, `src/lib/citta-digitali.ts`) · 222 caratteri · Gulpease 64 | Carta della Puglia con le città di Puglia Digitale, più numerose nella provincia di Bari. Tra queste: Manfredonia, Barletta, Bari, Monopoli, Gravina in Puglia e Nardò. Un anello segna Acquaviva delle Fonti, sede di ITnode. | Uguale a quella della hero di `/puglia-digitale/`. Modello: «Carta della Puglia con le città di Puglia Digitale, {quota} nella provincia di {provincia}. Tra queste: {nomi}. Un anello segna {sede}, sede di ITnode.» «più numerose» per la provincia con più città, «la maggior parte» solo sopra la metà; con una parità la prima frase si ferma prima della virgola. I nomi sono quelli disegnati a ogni larghezza, da nord a sud, senza la sede, che ha la sua frase. Niente numeri, niente elenco delle province, mai «tutta la Puglia» (L7). Al go-live senza il testo della pagina «Tutte le città» del portale restano i nomi solidi: «… Tra queste: Monopoli e Gravina in Puglia. …» (186 caratteri) |
| Nomi sulla carta | `aria-hidden`, dentro la carta | Sulle carte larghe, oltre i 400 px (25rem), 10 nomi: Manfredonia, Barletta, Bari, Monopoli, Acquaviva delle Fonti con l’anello, Gravina in Puglia, Ostuni, Massafra, Lecce e Nardò, più «Mare Adriatico» e «Mar Ionio». Su quelle strette, fino a 400 px (i telefoni e la finestra di 1024 px, misurati il 2026-10-09), 7: senza Ostuni, Massafra, Lecce e i due mari | Nessuna coordinata sotto i nomi (direzione visiva, § 1.4). I nomi delle carte strette sono quelli della descrizione, più la sede: ogni nome detto è sulla carta anche al telefono |
| Link | — | Nessuno nel capitolo | Una sola CTA per capitolo (HM-5); i link al portale stanno su `/puglia-digitale/` |
| Microdescrizione | p | Invariata | Resta vera con la carta della Puglia intera: dice «città, borghi e imprese della Puglia», non quante né tutte |

- Chi usa uno screen reader sente «Puglia Digitale» nella descrizione e poi nella legenda. È la stessa ripetizione del capitolo 03, accettata come costo del nome del marchio (direzione visiva, § 1.4).
- La frase della sede dice dove sta ITnode, non di chi è il progetto: nessuna attribuzione di Puglia Digitale a ITnode (A1, D1).

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
- Tappa 4: è l’unico nodo esplorabile. Nel sito i tre nomi sono un elenco (`ul`), uno sotto l’altro e senza «·». «Puglia Digitale» → `/puglia-digitale/`, «Città Digitali» → `/citta-digitali/`; «ITnode» resta testo, perché siamo già sulla sua home.

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
- **Ritratto**: `derivate/fondatore-ritratto.jpg`, da `fondatore-braccia-conserte.jpg`, nel trattamento «inchiostro», con il ritaglio centrato dal 2026-10-07 (commit 3bfe9b2; direzione visiva 0.14, § 4.3), senza didascalia su luoghi, date o eventi. Testo alternativo (`alt-text.md`): «Giacomo Lenoci a braccia conserte, in abito scuro.» La nota resta finché il cliente non chiarisce la provenienza dell’immagine. La scelta dell’immagine resta dell’utente (brief, DR3): il sito usa l’opzione (b), che l’ADR 002 propone per il lancio.
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

**CTA** · a → `/contatti/` · max 28 (12) · `data-cta-id="home-chiusura-parliamone"` (evento `cta_click`, `data-cta-location="chiusura"`)
> Parliamone →

**Contatti rapidi** · `ul` di due voci, una sotto l’altra, senza separatore · mono (`t-label`), con l’indirizzo email nella sua grafia (`t-as-is`) e il numero con spazi unificatori · link `mailto:info@itnode.it` e `tel:+390802466520` · `data-cta-id` `home-chiusura-email` e `home-chiusura-telefono` (evento `contact_click`)
> Scrivi a info@itnode.it\
> Chiama +39 080 2466520

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
| Documento, legenda e didascalia | I tre nodi; la didascalia «L’evento Puglia Digitale · {luogo}, {data}», non pubblicata | Direzione visiva, § 4.2 | Città e piazza sugli schermi, chi parla; l’originale dello scatto, con luogo, data e autore (A4) |
| Capitolo 01, riga con il nome | Nessuna: «La Tana di Aldo · [DA FORNIRE: comune] ([DA FORNIRE: sigla della provincia])» è pronta ma non pubblicata | Direzione visiva, § 4.8 | Il nome con cui l’impresa si presenta, il comune e la provincia, il consenso scritto (A7) e la conferma che il SIII l’ha realizzato ITnode (A8): review di brand-strategist del 2026-10-08, § 4 |
| Microdescrizioni dei capitoli | 01, 02 e 03 | §§ 10, 13, 17 e 18 | Le eventuali descrizioni originali dei tre progetti |
| Testi scritti per la Home | Occhiello e riga di posizionamento della hero, altri occhielli, «Un’impresa. Un territorio. Una rete di città.», chiusura | Headline, microcopy e CTA consentiti dal § 25; l’occhiello della hero riprende il § 02 | Solo l’approvazione: non sostituiscono testi del cliente |

## Ipotesi da validare

- La riga di posizionamento in `lead`, subito sotto l’H1, basta a far capire in cinque secondi che cosa fa ITnode e per chi. Si verifica dopo il lancio con E1 (cro-specialist), anche con le varianti B e C della sezione 1.
- «Un’impresa. Un territorio. Una rete di città.» descrive bene la relazione tra i tre mondi (brief, 2.3 e I2).
- Il 2002 appartiene a MyComm o alla prima azienda: in entrambi i casi «Dal 2002» sulla tappa 3 resta vero.
- «10.000+ clienti» si riferisce alle aziende del percorso del fondatore prima di ITnode (brief, N5).
- `[IPOTESI: «La Tana di Aldo» è il nome con cui l’impresa si presenta, con questa grafia.]` È la lettura del logo (ADR 002). Se il nome è diverso, cambiano l’alt e la riga del capitolo 01, non il resto.
- `[DA VERIFICARE: il SIII della Tana di Aldo l’ha realizzato ITnode (A8).]` Lo presuppone il capitolo 01 e lo afferma l’alt.
- Le misure della riga con il nome e delle legende valgono in Chromium, sullo staging di e406ecb; Safari e Firefox `[DA VERIFICARE]`.

## Domande aperte

- **Per il cliente** (tramite la sessione principale): nome e ruolo del fondatore; il testo narrativo del § 09; ruolo in IBM e anno di inizio dei 36 anni; nome e anno della prima azienda; anni di MyComm, iComm Lab e Leadstone; perimetro e fonte di «10.000+ clienti»; ruolo di ITnode in Puglia Digitale (D1); l’originale della foto dell’evento, con luogo, data e autore, e le città sugli schermi.
- **Per il cliente, sulla Tana di Aldo**: le domande della riga con il nome sono già nella review di brand-strategist del 2026-10-08 (§ 4, punti 1, 2, 3 e 5): nome, comune e provincia, consenso, chi ha realizzato il SIII. Non vanno ripetute.
- **Per seo-content**: va bene l’accorciamento dei blocchi A, F e G? E la regola «un segnaposto aperto non si pubblica» applicata a «prima azienda · 2002»?

Chiuse nella 1.8:
- **ux-designer, carta della Terra di Bari** del capitolo 02 senza descrizione: ha avuto la sua descrizione (commit 133e9a5), poi è uscita dal sito con la P4 (commit 3e25c42 e bae201c). La carta della Puglia intera ha la descrizione L7.
- **creative-director, «regionale» nella didascalia** della foto dell’evento: tolto, con il testo «L’evento Puglia Digitale · {luogo}, {data}» (direzione visiva 0.13, § 4.2).

## Decisioni richieste

- **Riga con il nome sotto il capitolo 01** (ux-designer, verdetto del creative-director, H3): markup e lettura, quando arrivano i dati. Il testo è pronto (sezione 5, «Riga con il nome sotto la schermata»). Da decidere: la riga come `figcaption` di una figura che contiene lo Schermo, e il «·» nascosto con una virgola per gli screen reader. La stessa scelta vale per la riga sotto la hero di `/siii/`.
- **«10.000+ clienti» al lancio**: decisa al G4 (verdetto del creative-director, § 3.8). Con la conferma del perimetro vale l’opzione A, con l’etichetta confermata; senza, l’opzione B: il numero si toglie e la tappa resta.
- **Varianti B e C della riga di posizionamento** (cro-specialist): se includerle nel test E1 dopo il lancio (sezione 1). Parere del creative-director (direzione visiva, § 5): si prova B come sfidante principale; C resta di riserva.
- **Titolo del fondatore** (utente): «36 anni…», da aggiornare ogni anno, oppure l’alternativa senza numero.
- **Immagine della sezione fondatore** (utente, sentito creative-director): DR3 del brief. Oggi il sito usa l’opzione (b), il ritratto a braccia conserte trattato a inchiostro, con la nota; l’ADR 002 la propone per il lancio e un ritratto reale appena possibile.
