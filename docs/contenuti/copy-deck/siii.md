---
titolo: Copy deck · SIII (Siti Interattivi Immersivi)
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer]
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, src/data/site.ts, src/data/asset-slots.ts]
---

# Copy deck · SIII

Pagina `/siii`. Copre le sezioni 10, 11 e 12 delle linee guida, la CTA finale e l'introduzione al form (sez. 23). I testi sono pronti da impaginare.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag** (H1, H2, H3, p, a, button): indica il livello semantico, non la dimensione visiva.
- **max**: lunghezza massima consigliata in caratteri, spazi inclusi. Tiene conto della scala della sez. 04 (H1 fino a 150 px, titoli di sezione fino a 100 px, minimo 44 px su mobile). Oltre questa soglia il testo va a capo troppe volte su uno schermo da 390 px.
- **verbatim**: frase fornita dalle linee guida. Non si modifica.
- **Link esterni**: si aprono in una nuova scheda (`target="_blank" rel="noopener"`) e il nome accessibile lo dichiara. Il nome accessibile inizia sempre con il testo visibile (WCAG 2.5.3) e si ottiene con testo visivamente nascosto o `aria-label`. Per tre CTA con lo stesso testo visibile, il nome accessibile deve essere diverso (WCAG 2.4.4).
- **Microcopy del form** (etichette, errori, stati, consenso privacy): è di copywriter-brand. Qui ci sono solo titolo e introduzione del form di questa pagina.

## Metadati

Proposta da validare con seo-content: manca ancora il brief SEO della pagina.

| Campo | Testo | Limite |
|---|---|---|
| URL | `/siii` | — |
| Title | SIII, Siti Interattivi Immersivi per aziende · ITnode | ≤ 60 |
| Meta description | Il Sito Interattivo Immersivo replica gli spazi della tua azienda: chi visita li esplora da desktop e smartphone, vede prodotti e video, ti contatta. | 120–155 |
| og:title | SIII · Siti Interattivi Immersivi | ≤ 60 |
| og:description | Non raccontare la tua azienda. Falla esplorare. | ≤ 110 |
| Breadcrumb | Home › SIII | — |

## Struttura della pagina

| # | Sezione | Ancora | Componente suggerito (sez. 30) |
|---|---|---|---|
| 1 | Hero | — | Hero |
| 2 | Che cos'è il SIII | `#cos-e` | SectionIntro + LargeStatement |
| 3 | Tour 360° o SIII | `#tour-360-o-siii` | Confronto a due colonne (tabella) |
| 4 | Cosa permette di fare | `#cosa-puoi-fare` | Elenco tipografico, niente card |
| 5 | Benefici | `#benefici` | BenefitsSection: numeri grandi, layout alternato o sticky |
| 6 | Esempi | `#esempi` | ProjectShowcase + ImmersivePreview |
| 7 | Ponte verso gli altri progetti | — | Riga editoriale con due link |
| 8 | CTA finale e form | `#richiedi-offerta` | CTASection + ContactForm |

## 1. Hero

**Eyebrow** · p · max 36
> Esperienze immersive per aziende

**H1** · verbatim · max 32 in totale (riga 1: 4, riga 2: 26) · due righe nello stesso H1: «SIII» alla scala piena, «Siti Interattivi Immersivi» più piccola (vedi nota)
> SIII\
> Siti Interattivi Immersivi

**Statement** · p · verbatim · max 50
> Non raccontare la tua azienda. Falla esplorare.

**CTA primaria** · a → `#esempi` · max 28 · proposta, da validare con cro-specialist
> Esplora gli esempi ↓

**CTA secondaria** · a → `#richiedi-offerta` · max 28
> Richiedi un’offerta →

Note:
- La seconda riga dell'H1 non può stare alla scala piena: «Interattivi» (11 caratteri) a 64 px supera la larghezza utile di uno schermo da 390 px. Consiglio la scala dei titoli di sezione.
- Markup consigliato: `<h1>SIII <span>Siti Interattivi Immersivi</span></h1>`. Il nome accessibile resta «SIII Siti Interattivi Immersivi».
- Niente paragrafo nella hero: la definizione arriva subito dopo, nella sezione 2.

## 2. Che cos'è il SIII

**Eyebrow** · p · max 36
> Che cos’è il SIII

**H2** · max 45
> Il sito diventa un luogo.

**Testo** · p · max 320
> Un Sito Interattivo Immersivo (SIII) replica digitalmente gli spazi fisici della tua impresa e li trasforma in un ambiente navigabile da desktop e da smartphone. Chi lo visita non legge una pagina che parla di te: entra, si muove tra gli ambienti e trova al loro interno prodotti, video e informazioni.

Note:
- La prima frase è la definizione della pagina: autosufficiente e citabile da AI Overviews e motori di risposta. Deve restare subito sotto l'H2, senza elementi in mezzo.
- Contenuto tratto dalla sez. 10 («replica digitalmente gli spazi fisici dell'impresa creando un ambiente navigabile da desktop e smartphone»).

## 3. Tour 360° o SIII

**Eyebrow** · p · max 36
> Tour 360° o SIII?

**H2** · max 50
> Un tour 360° è una visita. Un SIII è un sito.

**Testo** · p · max 320
> Un tour 360° permette di guardare un luogo da ogni angolazione. Il SIII parte dagli spazi reali della tua impresa e ne fa un sito: chi lo visita esplora, interagisce e, dallo stesso ambiente, chiede informazioni, prenota o accede alle tue azioni commerciali.

**Tabella di confronto** · table · copy · celle max 110
| | Tour 360° | Sito Interattivo Immersivo (SIII) |
|---|---|---|
| Che cos’è | Una visita virtuale in immagini a 360°. | Un sito che replica i tuoi spazi reali, navigabile da desktop e smartphone. |
| Cosa fa chi visita | Si guarda intorno e passa da un punto all’altro. | Esplora gli ambienti, apre gli hotspot, vede i prodotti, guarda i video. |
| A cosa serve | A far conoscere un luogo. | A far conoscere la tua impresa e a trasformare la visita in una richiesta, una prenotazione o una vendita. |

Note:
- Serve una tabella HTML vera (`<table>`, `<th scope="col">`, `<th scope="row">`) con `<caption>` visivamente nascosta: «Differenze tra tour 360° e Sito Interattivo Immersivo». Su mobile le righe si impilano e ogni cella ripete l'intestazione di colonna.
- Il confronto è costruito su cosa fa chi visita, non sulla tecnologia. Anche il SIII può usare immagini a 360°: la sintesi di ricerca della pagina «Il progetto» del portale Città Digitali cita la tecnologia VR 360 (vedi Fonti). Per questo non vanno aggiunte righe del tipo «il tour 360° non permette di…»: molti tour 360° hanno punti interattivi e l'affermazione sarebbe falsa.

## 4. Cosa permette di fare

**Eyebrow** · p · max 36
> Dentro il SIII

**H2** · max 45
> Una visita che diventa azione.

**Introduzione all’elenco** · p · max 60
> Nel tuo SIII, chi ti visita può:

**Elenco** · ul · copy
| # | Azione (grande) · max 36 | Complemento (piccolo) · max 55 |
|---|---|---|
| 1 | Esplorare gli ambienti | spostandosi liberamente da uno spazio all’altro. |
| 2 | Interagire con gli hotspot | i punti attivi che aprono contenuti e azioni. |
| 3 | Vedere i prodotti | nello spazio in cui li proponi. |
| 4 | Guardare i video | dentro l’esperienza. |
| 5 | Richiedere informazioni | nel momento in cui nasce l’interesse. |
| 6 | Prenotare i servizi | mentre li sta scoprendo. |
| 7 | Accedere alle azioni commerciali | che hai scelto di proporre. |

Note:
- Le sette azioni sono quelle della sez. 10, con i soli articoli aggiunti. Il complemento spiega l'azione senza aggiungere funzioni.
- Markup: `<ul>` con azione e complemento nello stesso `<li>`. Non sono titoli.
- Resa visiva: elenco tipografico (azione a scala grande, complemento piccolo), non sette card con icona.

## 5. Benefici

**Eyebrow** · p · max 36
> Benefici

**H2** · max 45
> Cosa cambia per la tua impresa.

**Beneficio 01** · H3 · verbatim · max 45
> Fiducia istantanea

**Testo 01** · p · max 180
> Chi entra nei tuoi spazi online sa già cosa troverà dal vivo. Mostrare il luogo reale, così com’è, crea fiducia fin dal primo contatto.

**Beneficio 02** · H3 · verbatim · max 45
> Più coinvolgimento

**Testo 02** · p · max 180
> Un ambiente da esplorare invita a restare. Chi visita sceglie il percorso, apre i contenuti e si sofferma sui dettagli che preferisce.

**Beneficio 03** · H3 · verbatim · max 45
> Vendita diretta

**Testo 03** · p · max 180
> Prodotti e servizi si mostrano nel loro contesto reale, e il passo successivo avviene nello stesso ambiente: una richiesta, una prenotazione, un’azione commerciale.

**Beneficio 04** · H3 · verbatim · max 45
> Uno strumento commerciale sempre accessibile

**Testo 04** · p · max 180
> Il tuo spazio resta aperto anche quando la sede è chiusa, da desktop e da smartphone. E per farlo visitare a un cliente basta un link.

Note:
- La numerazione (01–04) è decorativa: `aria-hidden="true"`, perché l'ordine è già nell'HTML.
- Nessun dato quantitativo, come chiede la sez. 11: niente «5–10 volte più tempo», niente «migliore posizionamento Google». Se il cliente fornisce un dato documentato, si aggiunge sotto il beneficio con lo stesso modulo «Dato documentato» previsto per Città Digitali (valore, etichetta, fonte, periodo).
- «Uno strumento commerciale sempre accessibile» (44 caratteri) è il titolo più lungo: su mobile va su tre righe alla scala H3. Tenerne conto nel layout alternato.

## 6. Esempi

**Eyebrow** · p · max 36
> Esempi

**H2** · verbatim · max 45
> Entra. Esplora. Interagisci.

**Testo** · p · max 140
> Tre Siti Interattivi Immersivi già online. Aprili ed esplorali, da desktop o da smartphone.

**Schede degli esempi** · copy · una colonna per esempio
| Campo | Esempio 1 | Esempio 2 | Esempio 3 |
|---|---|---|---|
| Nome · H3 · max 30 | Masseria Santella | Maison Miminà | D.L. Natura Dentro |
| Luogo · p · max 30 | Cassano delle Murge (BA) | Monopoli (BA) | Acquaviva delle Fonti (BA) |
| Portale · p · max 30 | cassanodigitale.it | monopolidigitale.it | acquavivadigitale.com |
| Frase · p · max 90 | Varca l’ingresso di una masseria e attraversane gli spazi, ambiente dopo ambiente. | Entra in Maison Miminà e scoprine gli ambienti come se fossi lì. | Muoviti negli spazi di D.L. Natura Dentro senza spostarti da dove sei. |
| CTA · a · verbatim | Entra nell’esperienza → | Entra nell’esperienza → | Entra nell’esperienza → |
| Nome accessibile della CTA | Entra nell’esperienza di Masseria Santella (si apre in una nuova scheda) | Entra nell’esperienza di Maison Miminà (si apre in una nuova scheda) | Entra nell’esperienza di D.L. Natura Dentro (si apre in una nuova scheda) |
| URL | https://www.cassanodigitale.it/masseriasantella/ | https://www.monopolidigitale.it/maisonmimina/ | https://www.acquavivadigitale.com/dielle/ |
| Immagine (slot) | `siii-masseria-santella` | `siii-maison-mimina` | `siii-dielle` |

**Anteprima immersiva** (solo se si usa l'iframe caricato al clic, `src/scripts/immersive.ts`) · copy
| Campo | Esempio 1 | Esempio 2 | Esempio 3 |
|---|---|---|---|
| Pulsante · button · max 24 | Avvia l’anteprima | Avvia l’anteprima | Avvia l’anteprima |
| Nome accessibile del pulsante | Avvia l’anteprima di Masseria Santella | Avvia l’anteprima di Maison Miminà | Avvia l’anteprima di D.L. Natura Dentro |
| Nota sotto il pulsante · p · max 70 | L’anteprima carica contenuti da cassanodigitale.it. | L’anteprima carica contenuti da monopolidigitale.it. | L’anteprima carica contenuti da acquavivadigitale.com. |
| Titolo dell’iframe (`data-embed-title`) | Anteprima interattiva di Masseria Santella | Anteprima interattiva di Maison Miminà | Anteprima interattiva di D.L. Natura Dentro |

Note:
- Le frasi usano solo ciò che è noto: nome, luogo e il fatto che si tratta di un SIII. «Masseria» è nel nome della struttura. Non attribuire settori, servizi o risultati finché il cliente non li fornisce.
- Il luogo di Masseria Santella non si ricava dal solo dominio (esistono più comuni chiamati Cassano). Cassano delle Murge risulta da più schede pubbliche della struttura (vedi Fonti). [DA VERIFICARE con il cliente]
- Monopoli e Acquaviva delle Fonti si ricavano dal dominio e dalla sez. 15 delle linee guida.
- La nota sotto il pulsante serve alla trasparenza: l'anteprima carica un sito di terze parti. La gestione dei cookie di quel sito va verificata (vedi Rischi).

## 7. Ponte verso gli altri progetti

**Testo** · p · max 120 · due link interni
> Dalla singola impresa all’intero territorio: la stessa visione dà vita a Puglia Digitale e Città Digitali.

Link: «Puglia Digitale» → `/puglia-digitale`; «Città Digitali» → `/citta-digitali`. La frase riprende la sez. 35 («tre applicazioni concrete della stessa visione») e la sez. 07.

## 8. CTA finale e form

**H2** · verbatim · max 45
> La tua azienda può diventare un’esperienza.

**CTA** · a → `#richiedi-offerta` (primo campo del form) · verbatim
> Richiedi un’offerta →

**Titolo del form** · H3 · max 32
> Parlaci dei tuoi spazi

**Introduzione del form** · p · max 160
> Descrivi la tua attività e cosa vorresti far fare a chi ti visita: ti ricontattiamo per preparare un’offerta.

Note:
- Campo «Mi interessa»: SIII preselezionato. È un dato di contesto, non un consenso, quindi la regola sui consensi non preselezionati non si applica. Il consenso privacy resta non preselezionato.
- Il pulsante di invio è «Invia richiesta» (sez. 23, verbatim).
- Parola lunga nel titolo: «un’esperienza.» è un blocco unico di 14 caratteri. A 44 px su 390 px è al limite: prevedere `hyphens: auto` con `lang="it"` oppure una scala minima leggermente più bassa.

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Hero | Esplora gli esempi ↓ | `#esempi` |
| Hero | Richiedi un’offerta → | `#richiedi-offerta` |
| Sezione 7 | Puglia Digitale | `/puglia-digitale` |
| Sezione 7 | Città Digitali | `/citta-digitali` |

Link in entrata proposti: da `/citta-digitali` (anchor «Sito Interattivo Immersivo», sezione «Dal locale al nazionale») e dalla Home (capitolo 01, CTA «Esplora SIII →», di copywriter-brand).

## Testi originali mancanti

- **Benefici (sez. 11).** Le linee guida chiedono di «trasformare i contenuti forniti», ma i testi originali non sono nel repository. Le descrizioni sono scritte solo a partire dai titoli dei benefici e dalla definizione della sez. 10. [DA FORNIRE: testi originali dei quattro benefici]
- **Esempi (sez. 12).** Le frasi sono ridotte al minimo verificabile. [DA FORNIRE: per ogni esempio, il settore e che cosa si trova dentro l'esperienza (ambienti, prodotti, prenotazione). Con questi dati la frase diventa più concreta]
- **Che cos'è, confronto, elenco (sez. 10).** Scritti solo con i fatti della sez. 10.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 32 | 404 | 1.983 | **63,7** |
| Tutti i testi principali | 55 | 482 | 2.389 | 73,7 |

Obiettivo: almeno 60 per il grande pubblico, almeno 50 per i testi tecnici B2B. Esito: obiettivo raggiunto; il valore di riferimento è quello dei soli paragrafi, più prudente. Lo stesso script ha controllato 69 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description.

## Ipotesi da validare

- [IPOTESI: la sigla SIII corrisponde a «Sito Interattivo Immersivo». La sigla ha quattro lettere e il nome tre parole. Il testo abbina i due termini come fa la sez. 10, senza sciogliere la sigla lettera per lettera]
- [IPOTESI: i tre esempi sono stati realizzati da ITnode e le imprese hanno autorizzato l'uso del nome e delle schermate. La pagina non lo afferma in modo esplicito, ma il contesto lo lascia intendere]
- [IPOTESI: ogni SIII può includere tutte le azioni della sez. 10 (prenotazione, azioni commerciali), a seconda di come è configurato. Per questo il testo usa «può»]
- [DA VERIFICARE: Masseria Santella si trova a Cassano delle Murge (BA)]

## Domande aperte

1. Che cosa significa esattamente la sigla SIII?
2. Per i tre esempi: settore, cosa si può fare nell'esperienza, autorizzazione a pubblicare nome e schermate.
3. Esistono dati documentati sul comportamento dei visitatori, per esempio il tempo di permanenza? Servono fonte e periodo.
4. Il SIII sostituisce il sito aziendale o lo affianca? La risposta rafforza o corregge il titolo «Un SIII è un sito».
5. Per un futuro blocco FAQ, utile per i motori di risposta: tempi di realizzazione, cosa serve all'impresa (sopralluogo, riprese), aggiornamenti, dove viene pubblicato il SIII.

## Decisioni richieste

- **cro-specialist**: CTA della hero («Esplora gli esempi ↓» più «Richiedi un’offerta →») e preselezione di «SIII» nel form.
- **creative-director**: approvazione del titolo del confronto «Un tour 360° è una visita. Un SIII è un sito.».
- **ux-designer e web-performance-specialist**: anteprime immersive (iframe al clic) oppure solo schermate. Da decidere anche sulla base della verifica privacy dei siti incorporati.

## Rischi

- **Cookie di terze parti nelle anteprime.** L'iframe carica un portale esterno che potrebbe impostare cookie non tecnici. Il clic su «Avvia l’anteprima» non equivale a un consenso ai sensi delle linee guida del Garante. Serve una verifica prima del lancio (soglia 5).

## Fonti consultate

Consultate il 2026-09-28. I domini *digitale.it/.com, cittadigitali.it e itnode.it sono bloccati dall'ambiente: le informazioni sui portali vengono solo da risultati di ricerca.

- Masseria Santella a Cassano delle Murge: https://www.booking.com/hotel/it/masseria-santella.de.html · https://www.airbnb.com/rooms/1293305982740194325 · https://www.facebook.com/masseriasantella/
- Città Digitali e tecnologia VR 360 (sintesi di ricerca, pagina non consultabile direttamente): https://xn--cittdigitali-19a.it/il-progetto/
- Maison Miminà, D.L. Natura Dentro: nessun risultato pubblico trovato.
