---
titolo: Copy deck · SIII (Siti Interattivi Immersivi)
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer]
stato: in revisione
versione: 1.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/seo/mappa-keyword-url.md, docs/cro/strategia-conversione.md, src/data/site.ts, src/data/asset-slots.ts]
---

# Copy deck · SIII

Pagina `/siii/`. Copre le sezioni 10, 11 e 12 delle linee guida (LG), la chiusura e l'introduzione al form (§23). I testi sono pronti da impaginare.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag** (H1, H2, H3, p, a, button): indica il livello semantico, non la dimensione visiva. Un H2 può essere piccolo come un'etichetta e uno statement in `<p>` grande come un titolo.
- **max**: lunghezza massima consigliata in caratteri, spazi inclusi. Tiene conto della scala della §04 (H1 fino a 150 px, titoli di sezione fino a 100 px, minimo 44 px su mobile). Oltre questa soglia il testo va a capo troppe volte su uno schermo da 390 px.
- **verbatim**: frase fornita dalle LG. Si cambia solo l'apostrofo tipografico (’).
- **Frecce** (tone of voice §6; strategia di conversione §4): → altra pagina o form, ↓ sezione della pagina nei link secondari, ↗ sito esterno in nuova scheda. La freccia è decorativa (`aria-hidden="true"`).
- **Link esterni**: `target="_blank" rel="noopener"`. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3) e aggiunge destinazione e «(si apre in una nuova scheda)» con testo visivamente nascosto. Tre CTA con lo stesso testo visibile hanno nomi accessibili diversi (WCAG 2.4.4).
- **Fonti che prevalgono nel loro dominio**: brief consolidato (fatti e claim), mappa keyword→URL (heading, metadati, blocchi di risposta), strategia di conversione (CTA, ancore, form). Le differenze sono elencate in «Allineamenti».
- **Microcopy del form** (etichette, errori, stati, consenso): copywriter-brand e strategia di conversione §8.

## Metadati

Fa fede `docs/seo/mappa-keyword-url.md` §2 (owner seo-content). Copia per comodità:

| Campo | Testo | Limite |
|---|---|---|
| Title | SIII, Siti Interattivi Immersivi oltre il tour 360° \| ITnode | ≤ 60 |
| Meta description | Il SIII replica gli spazi della tua azienda in un ambiente da esplorare da desktop e smartphone: hotspot, prodotti, video, richieste e prenotazioni. | 140–155 |
| Breadcrumb | Home › SIII | — |

`og:title` e `og:description` seguono le specifiche tecniche: title senza suffisso, description uguale alla meta.

## Struttura della pagina

| # | Sezione | Ancora | Componente suggerito (§30) |
|---|---|---|---|
| 1 | Hero | — | Hero |
| 2 | Cos’è un Sito Interattivo Immersivo | `#cos-e` | SectionIntro + LargeStatement |
| 3 | Tour 360° o Sito Interattivo Immersivo? | `#tour-360` | Statement + tabella di confronto |
| 4 | Cosa si può fare dentro un SIII | `#cosa-si-puo-fare` | Elenco tipografico, niente card |
| 5 | Perché scegliere un SIII | `#benefici` | BenefitsSection: numeri grandi, layout alternato o sticky |
| 6 | Entra. Esplora. Interagisci. | `#esempi` | ProjectShowcase + ImmersivePreview |
| 7 | Chiusura e form | `#richiesta` | CTASection + ContactForm |
| 8 | Gli altri mondi ITnode | — | Riga editoriale con due link |

## 1. Hero

**Eyebrow** · p · max 36
> Esperienze immersive per aziende

**H1** · verbatim · max 32 in totale (riga 1: 4, riga 2: 26) · due righe nello stesso H1: «SIII» alla scala piena, «Siti Interattivi Immersivi» più piccola
> SIII\
> Siti Interattivi Immersivi

**Statement** · p · verbatim · max 50
> Non raccontare la tua azienda. Falla esplorare.

**CTA primaria** · a → `#esempi` · max 28 · `cta_id` siii-hero-esempi
> Esplora gli esempi ↓

**CTA secondaria** · link testuale → `#richiesta` · verbatim · `cta_id` siii-hero-offerta
> Richiedi un’offerta →

Note:
- La seconda riga dell'H1 non può stare alla scala piena: «Interattivi» (11 caratteri) a 64 px supera la larghezza utile di uno schermo da 390 px. Markup: `<h1>SIII <span>Siti Interattivi Immersivi</span></h1>`.
- Nessun paragrafo nella hero: la definizione arriva subito dopo.
- CTA confermate dalla strategia di conversione §4: la prova più forte del SIII è provarlo.

## 2. Cos’è un Sito Interattivo Immersivo

**H2** · max 45 · resa piccola, da etichetta
> Cos’è un Sito Interattivo Immersivo

**Statement** · p · max 45 · resa grande
> Il sito diventa un luogo.

**Testo** · p · blocco di risposta B · max 420
> Un Sito Interattivo Immersivo (SIII) replica digitalmente gli spazi fisici di un’impresa e li trasforma in un ambiente navigabile da desktop e da smartphone. Chi lo visita non legge una pagina: entra, esplora gli ambienti e trova al loro interno prodotti, video, informazioni e azioni commerciali. È la soluzione di ITnode per le aziende che, invece di raccontarsi, vogliono farsi esplorare.

Note:
- Primo paragrafo sotto l'H2, nell'HTML statico, senza elementi in mezzo: è il testo che AI Overviews e motori di risposta estraggono.
- Rispetto al Blocco B della mappa SEO, la seconda frase è accorciata: l'elenco completo delle funzioni è nella sezione 4, subito sotto. I fatti non cambiano.

## 3. Tour 360° o Sito Interattivo Immersivo?

**H2** · max 45 · resa piccola, da etichetta
> Tour 360° o Sito Interattivo Immersivo?

**Statement** · p · max 50 · resa grande
> Un tour 360° è una visita. Un SIII è un sito.

**Testo** · p · blocco di risposta C · max 500
> Un tour 360° è pensato soprattutto per mostrare un ambiente: chi lo visita si guarda intorno e passa da un punto di vista all’altro. Un Sito Interattivo Immersivo (SIII) parte dall’esplorazione degli spazi, ma è un sito a tutti gli effetti. Nell’ambiente si interagisce con hotspot, prodotti e video, e da lì si chiedono informazioni, si prenotano servizi e si accede ad azioni commerciali. Il tour 360° fa vedere uno spazio; il SIII lo trasforma in uno strumento commerciale sempre accessibile.

**Tabella di confronto** · table · copy · celle max 120
| | Tour 360° | Sito Interattivo Immersivo (SIII) |
|---|---|---|
| A cosa serve | Soprattutto a mostrare un ambiente. | A far esplorare l’impresa e a trasformare la visita in una richiesta, una prenotazione o un’azione commerciale. |
| Cosa fa chi visita | Si guarda intorno e passa da un punto di vista all’altro. | Esplora gli ambienti, interagisce con gli hotspot, vede prodotti e video. |
| Azioni previste | Di norma rimanda ad altri canali. | Richiede informazioni, prenota servizi, accede ad azioni commerciali. |
| Ruolo | Un contenuto da guardare. | Uno strumento commerciale sempre accessibile. |

Note:
- Tabella HTML vera (`<table>`, `<th scope="col">`, `<th scope="row">`) con `<caption>` visivamente nascosta: «Differenze tra tour 360° e Sito Interattivo Immersivo». Su mobile le righe si impilano e ogni cella ripete l'intestazione di colonna.
- Il Testo è il Blocco C della mappa SEO con le frasi spezzate per la leggibilità (Gulpease) e «da lì» per la prenotazione (N13). Righe e contenuti della tabella sono quelli della mappa SEO §3.2, con ritocchi di stile. Il confronto riguarda la categoria, non concorrenti. Le formule prudenti («soprattutto», «di norma») restano: molti tour 360° hanno punti interattivi. I criteri vanno confermati da ITnode (brief D4).
- «Da lì si prenotano servizi»: la prenotazione parte dall'ambiente, anche se si conclude su un sistema esterno (brief N13).

## 4. Cosa si può fare dentro un SIII

**H2** · max 45 · resa piccola, da etichetta
> Cosa si può fare dentro un SIII

**Statement** · p · max 45 · resa grande
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
- Le sette azioni sono quelle della §10, con i soli articoli aggiunti. Il complemento spiega l'azione senza aggiungere funzioni.
- Markup: `<ul>`, con azione e complemento nello stesso `<li>`. Resa: elenco tipografico, non sette card con icona.

## 5. Perché scegliere un SIII

**H2** · max 45
> Perché scegliere un SIII

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
> Prodotti e servizi si mostrano nel loro contesto reale, e il passo successivo parte dallo stesso ambiente: una richiesta, una prenotazione, un’azione commerciale.

**Beneficio 04** · H3 · verbatim · max 45
> Uno strumento commerciale sempre accessibile

**Testo 04** · p · max 180
> Il tuo spazio resta aperto anche quando la sede è chiusa, da desktop e da smartphone. E per farlo visitare a un cliente basta un link.

**CTA dopo i benefici** · facoltativa · a → `#richiesta` · verbatim · `cta_id` siii-benefici-offerta
> Richiedi un’offerta →

Note:
- Numerazione 01–04 decorativa (`aria-hidden="true"`).
- Solo benefici qualitativi (§11; brief N6, N9): niente «5–10 volte più tempo», niente «migliore posizionamento Google». Se arriva un dato documentato, si aggiunge sotto il beneficio con il modulo «Dato documentato» di Città Digitali (valore, etichetta, fonte, periodo).
- «Vendita diretta» dice che il passo successivo «parte» dall'ambiente, non che l'acquisto avvenga dentro il SIII (brief N13).
- «Uno strumento commerciale sempre accessibile» (44 caratteri) è il titolo più lungo: su mobile va su tre righe alla scala H3.

## 6. Entra. Esplora. Interagisci.

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
| CTA · a · verbatim | Entra nell’esperienza ↗ | Entra nell’esperienza ↗ | Entra nell’esperienza ↗ |
| Nome accessibile della CTA | Entra nell’esperienza di Masseria Santella (si apre in una nuova scheda) | Entra nell’esperienza di Maison Miminà (si apre in una nuova scheda) | Entra nell’esperienza di D.L. Natura Dentro (si apre in una nuova scheda) |
| URL | https://www.cassanodigitale.it/masseriasantella/ | https://www.monopolidigitale.it/maisonmimina/ | https://www.acquavivadigitale.com/dielle/ |
| `cta_id` | siii-showcase-masseria-santella | siii-showcase-maison-mimina | siii-showcase-dl-natura-dentro |
| Immagine (slot) | `siii-masseria-santella` | `siii-maison-mimina` | `siii-dielle` |

**Anteprima immersiva** · solo con l'iframe caricato al clic (`src/scripts/immersive.ts`) · copy
| Campo | Esempio 1 | Esempio 2 | Esempio 3 |
|---|---|---|---|
| Pulsante · button · max 24 | Avvia l’anteprima | Avvia l’anteprima | Avvia l’anteprima |
| Nome accessibile del pulsante | Avvia l’anteprima di Masseria Santella | Avvia l’anteprima di Maison Miminà | Avvia l’anteprima di D.L. Natura Dentro |
| Nota sotto il pulsante · p · max 70 | L’anteprima carica contenuti da cassanodigitale.it. | L’anteprima carica contenuti da monopolidigitale.it. | L’anteprima carica contenuti da acquavivadigitale.com. |
| Titolo dell’iframe (`data-embed-title`) | Anteprima interattiva di Masseria Santella | Anteprima interattiva di Maison Miminà | Anteprima interattiva di D.L. Natura Dentro |

Note:
- Le frasi usano solo ciò che è noto: nome, luogo e il fatto che si tratta di un SIII. «Masseria» è nel nome della struttura. Non attribuire settori, servizi o risultati finché il cliente non li fornisce.
- Luogo di Masseria Santella: il dominio dice solo «Cassano», ma Cassano delle Murge risulta da più schede pubbliche della struttura (brief §8). [DA VERIFICARE con il cliente]
- La nota sotto il pulsante serve alla trasparenza, perché l'anteprima carica un sito di terze parti (vedi Rischi).

## 7. Chiusura e form

**H2** · verbatim · max 45
> La tua azienda può diventare un’esperienza.

**CTA** · a → `#richiesta` · verbatim · `cta_id` siii-chiusura-offerta
> Richiedi un’offerta →

**Introduzione del form** · p · max 160
> Raccontaci il tuo spazio: ti ricontattiamo per capire cosa far esplorare e prepararti un’offerta.

Note:
- Se il form è già visibile sotto la chiusura, la CTA diventa il titolo del form (H3 «Richiedi un’offerta», senza freccia): è inutile un pulsante che fa scorrere di pochi pixel (strategia di conversione §5).
- «Mi interessa»: SIII preselezionato in build (`form_id` richiesta-siii). È un dato di contesto, non un consenso. La casella privacy resta sempre vuota. Pulsante: «Invia richiesta» (§23).
- Parola lunga nel titolo: «un’esperienza.» è un blocco di 14 caratteri, al limite a 44 px su 390 px. Prevedere `hyphens: auto` con `lang="it"` o una scala minima leggermente più bassa.

## 8. Gli altri mondi ITnode

**H2** · max 36
> Gli altri mondi ITnode

**Testo** · p · max 130 · due link interni
> Dalla singola impresa all’intero territorio: la stessa visione si ritrova in Puglia Digitale e Città Digitali.

Link: «Puglia Digitale» → `/puglia-digitale/`; «Città Digitali» → `/citta-digitali/`. La frase riprende la §35 («tre applicazioni concrete della stessa visione») senza dire chi ha creato i progetti (brief A1). Posizione: dopo il form, come chiusura della pagina (proposta per ux-designer, mappa SEO §3.2).

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Hero | Esplora gli esempi ↓ | `#esempi` |
| Hero, sezione 5, sezione 7 | Richiedi un’offerta → | `#richiesta` |
| Sezione 8 | Puglia Digitale · Città Digitali | `/puglia-digitale/` · `/citta-digitali/` |

In entrata: Home (Blocco A e capitolo 01), `/citta-digitali/` («Sito Interattivo Immersivo» nella sezione «Dal locale al nazionale» e nel blocco finale), `/puglia-digitale/` (blocco finale), navigazione e footer.

## Allineamenti con gli altri documenti

| Punto | Scelta in questo documento | Motivo |
|---|---|---|
| Ancora del form | `#richiesta` | Strategia di conversione §2 e §5. La mappa SEO usa `#richiedi-offerta`: va allineata. |
| H2 della sezione 4 | «Cosa si può fare dentro un SIII» (la mappa propone «Cosa puoi fare…») | L'elenco descrive ciò che fa chi visita, mentre la pagina parla all'impresa: la forma impersonale evita l'ambiguità del «tu». |
| Statement sotto gli H2 descrittivi | Gli H2 sono quelli della mappa SEO. Le frasi grandi sono `<p>` | Tiene insieme ricerca (heading descrittivi) e direzione creativa (grandi statement). |
| Blocco B | Seconda frase accorciata | Evita di ripetere l'elenco della sezione 4. Fatti invariati. |
| Freccia delle CTA esterne | ↗ | Strategia di conversione §4. Il testo resta quello delle LG. |

## Testi originali mancanti

- **Benefici (§11).** Le LG chiedono di «trasformare i contenuti forniti», ma i testi originali non sono nel repository (brief §7, P1). Le descrizioni sono scritte solo a partire dai titoli dei benefici e dalla definizione della §10. [DA FORNIRE: testi originali dei quattro benefici]
- **Esempi (§12).** Le frasi sono ridotte al minimo verificabile. [DA FORNIRE: per ogni esempio, il settore e che cosa si trova dentro l'esperienza (ambienti, prodotti, prenotazione)]
- **Cos’è, confronto, elenco (§10).** Scritti solo con i fatti della §10 e con i blocchi di risposta della mappa SEO.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, statement, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 37 | 450 | 2.321 | **62,1** |
| Tutti i testi principali | 64 | 545 | 2.819 | 72,5 |

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. I blocchi di risposta della mappa SEO, pieni di nomi di prodotto lunghi, abbassano l'indice: per questo alcune frasi sono state spezzate, a parole invariate. Lo stesso script ha controllato 69 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description.

## Ipotesi da validare

- [IPOTESI: la sigla SIII corrisponde a «Sito Interattivo Immersivo». La sigla ha tre «I» e lo scioglimento ne spiega due (brief D3). Il testo abbina sigla e nome come la §10, senza spiegare le lettere una per una]
- [IPOTESI: i tre esempi sono realizzati da ITnode e le imprese hanno autorizzato nome e schermate (brief A7). La pagina non lo afferma in modo esplicito]
- [IPOTESI: ogni SIII può includere tutte le azioni della §10, a seconda di come è configurato. Per questo il testo usa «può»]
- [DA VERIFICARE: Masseria Santella si trova a Cassano delle Murge (BA)]

## Domande aperte

1. Che cosa significa la terza «I» di SIII (brief D3)?
2. Per i tre esempi: settore, cosa si può fare nell'esperienza, consenso a pubblicare nome e schermate (A7).
3. Acquisto e prenotazione avvengono dentro il SIII o su sistemi esterni (N13)?
4. Esistono dati documentati sul comportamento dei visitatori, per esempio il tempo di permanenza, con fonte e periodo (D7)?
5. Il SIII vive sempre dentro un portale città o anche sul dominio dell'impresa (D4)? La risposta conferma o corregge lo statement «Un SIII è un sito».

## Decisioni richieste

- **creative-director**: approvazione dello statement «Un tour 360° è una visita. Un SIII è un sito.» e della regola «H2 piccolo + statement grande».
- **seo-content**: allineare l'ancora `#richiesta` e l'H2 della sezione 4 nella mappa.
- **ux-designer e web-performance-specialist**: anteprime immersive (iframe al clic) oppure solo schermate, anche in base alla verifica dei cookie dei portali.

## Rischi

- **Cookie di terze parti nelle anteprime.** L'iframe carica un portale esterno che potrebbe impostare cookie non tecnici. Il clic su «Avvia l’anteprima» non equivale a un consenso secondo le linee guida del Garante. Va verificato prima del lancio (soglia 5).

## Fonti consultate

Consultate il 2026-09-28. I portali e itnode.it sono bloccati dall'ambiente: le informazioni sui portali vengono solo da risultati di ricerca.

- Masseria Santella a Cassano delle Murge: https://www.booking.com/hotel/it/masseria-santella.de.html · https://masseria-santella.apuliahotelspage.com/en/ · https://www.facebook.com/masseriasantella/
- Città Digitali e tecnologia VR 360 (solo sintesi di ricerca): https://xn--cittdigitali-19a.it/il-progetto/
- Maison Miminà, D.L. Natura Dentro: nessun risultato pubblico trovato.
