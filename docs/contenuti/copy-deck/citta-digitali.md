---
titolo: Copy deck · Città Digitali
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer, web-performance-specialist]
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, src/data/site.ts, src/data/asset-slots.ts, src/scripts/video.ts]
---

# Copy deck · Città Digitali

Pagina `/citta-digitali`. Copre le sezioni 17, 18, 19, 20 e 21 delle linee guida e l'introduzione al form (sez. 23). I testi sono pronti da impaginare.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi, pensati per la scala della sez. 04. **verbatim**: frase delle linee guida da non modificare.
- **Link esterni**: nuova scheda (`target="_blank" rel="noopener"`), dichiarata nel nome accessibile. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3).
- **Microcopy del form e dei controlli video**: è di copywriter-brand. Le etichette predefinite sono in `src/scripts/video.ts`.

## Metadati

Proposta da validare con seo-content: manca ancora il brief SEO della pagina.

| Campo | Testo | Limite |
|---|---|---|
| URL | `/citta-digitali` | — |
| Title | Città Digitali · L’Italia in un unico portale · ITnode | ≤ 60 |
| Meta description | Città Digitali è il progetto di ITnode che porta online le attività del territorio con tour virtuali e Siti Interattivi Immersivi, in un unico portale. | 120–155 |
| og:title | Città Digitali · Un progetto ITnode | ≤ 60 |
| og:description | Le attività del territorio, online senza perdere radici. | ≤ 110 |
| Breadcrumb | Home › Città Digitali | — |

## Struttura della pagina

| # | Sezione | Ancora | Componente suggerito (sez. 30) |
|---|---|---|---|
| 1 | Hero | — | Hero |
| 2 | L'Italia in un unico portale | `#portale` | LocationShowcase ad alto impatto visivo |
| 3 | Video | `#video` | VideoSection a tutta larghezza |
| 4 | Dal locale al nazionale | `#come-funziona` | Sezione sticky o composizione numerata, niente card |
| 5 | CTA finale e form | `#contatto` | CTASection + ContactForm |

## 1. Hero

**Eyebrow** · p · max 36
> Un progetto ITnode

**H1** · verbatim · max 16
> Città Digitali

**Statement** · p · verbatim · max 60
> Le attività del territorio, online senza perdere radici.

**Sottotitolo** · p · verbatim · max 120
> Tour virtuali, Siti Immersivi Interattivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano.

**CTA** · a → https://www.cittadigitali.it · verbatim
> Visita il portale →

**Nome accessibile della CTA**
> Visita il portale Città Digitali (si apre in una nuova scheda)

Note:
- Il sottotitolo è verbatim, ma inverte l'ordine del nome del prodotto: «Siti Immersivi Interattivi», mentre la pagina SIII usa «Siti Interattivi Immersivi» (sez. 10). Propongo di allinearlo a «Siti Interattivi Immersivi»: stesso nome ovunque, entità più chiara per i motori di ricerca. Serve la conferma del cliente (vedi Decisioni richieste).
- Parola lunga nel sottotitolo: «imprenditoriale» (15 caratteri). Alla scala del sottotitolo non crea problemi. Non portarlo alla scala dei titoli.

## 2. L'Italia in un unico portale

**H2** · verbatim · max 40
> L’Italia in un unico portale.

**Testo** · p · max 100
> Da Varese a Caltanissetta, passando per Altamura: città diverse, un’unica rete da esplorare.

**Schede delle città** · copy · da nord a sud, come nelle linee guida
| Campo | Città 1 | Città 2 | Città 3 |
|---|---|---|---|
| Nome · H3 · max 16 | Varese | Altamura | Caltanissetta |
| Regione · p · max 16 | Lombardia | Puglia | Sicilia |
| Riga · p · max 60 | La città giardino, tra il lago e le Prealpi. | Sull’altopiano dell’Alta Murgia, nell’entroterra barese. | Capoluogo di provincia nel cuore della Sicilia. |
| Dominio · p | varesedigitale.it | altamuradigitale.com | caltanissettadigitale.it |
| CTA · a · max 16 | Esplora → | Esplora → | Esplora → |
| Nome accessibile della CTA | Esplora Varese su varesedigitale.it (si apre in una nuova scheda) | Esplora Altamura su altamuradigitale.com (si apre in una nuova scheda) | Esplora Caltanissetta su caltanissettadigitale.it (si apre in una nuova scheda) |
| URL | https://www.varesedigitale.it | https://www.altamuradigitale.com | https://www.caltanissettadigitale.it |
| Immagine (slot) | `luogo-varese` | `luogo-altamura` | `luogo-caltanissetta` |

Note:
- La regione è l'elemento che fa percepire «l'Italia»: va in evidenza, per esempio insieme alle coordinate già presenti in `src/data/site.ts`.
- Le righe contengono un solo fatto geografico, verificato su fonti pubbliche (vedi Fonti). La sez. 18 non prevede una CTA: «Esplora →» è ripresa dalla sez. 15 per coerenza tra le due pagine.
- Le immagini dei territori mancano (slot `luogo-*`).

## 3. Video

**Eyebrow** · p · max 36
> Video

**H2** · max 45
> Città Digitali, in movimento.

**Testo** · p · max 120
> Il progetto Città Digitali, raccontato per immagini.

**Descrizione testuale del video** · p · da scrivere dopo la visione
> [DA SCRIVERE dopo la visione del video: 3–5 frasi su che cosa mostra, in ordine]

Note:
- Il video (`https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2`) non è raggiungibile da questo ambiente: titolo e descrizione restano volutamente generici. Non descrivono scene che nessuno del team ha visto.
- Nome accessibile: `<video aria-labelledby>` collegato all'H2.
- Accessibilità (WCAG 2.2 AA): se il video ha parlato servono i sottotitoli (1.2.2); se le informazioni sono solo visive serve la descrizione testuale (1.2.1, 1.2.3, 1.2.5). La descrizione va in un blocco richiudibile sotto il player (`<details>`), con il titolo «Leggi la descrizione del video» (microcopy da confermare con copywriter-brand).
- Dati strutturati VideoObject: `name` = H2, `description` = Testo (deve coincidere con il testo visibile, sez. 26). Mancano `thumbnailUrl` (slot `video-poster`), `uploadDate` e `duration`. [DA FORNIRE]

## 4. Dal locale al nazionale

**Eyebrow** · p · max 36
> Come funziona

**H2** · verbatim · max 30
> Dal locale al nazionale.

**Testo** · p · max 200 · link interno su «Sito Interattivo Immersivo» → `/siii`
> Con un tour virtuale o un Sito Interattivo Immersivo, la tua attività resta radicata nel suo territorio e, dentro un portale nazionale, diventa visitabile da chiunque, ovunque si trovi.

**Concetto 01** · H3 · verbatim · max 45
> Distanze ridotte, fiducia immediata

**Testo 01** · p · max 180
> Chi ti trova online può entrare nella tua attività prima di raggiungerla. Vedere il luogo reale accorcia le distanze e rende più semplice il primo contatto.

**Concetto 02** · H3 · verbatim · max 45
> Maggiore coinvolgimento

**Testo 02** · p · max 180
> Una pagina si scorre, uno spazio si esplora. Chi ti visita decide il percorso e ti scopre un dettaglio alla volta.

**Concetto 03** · H3 · verbatim · max 45
> Visibilità digitale

**Testo 03** · p · max 180
> Sei online con i tuoi spazi reali, dentro un portale dedicato al territorio. Chi esplora la tua città può incontrare anche te.

**Concetto 04** · H3 · verbatim · max 45
> Differenziazione

**Testo 04** · p · max 180
> Una foto mostra, un’esperienza immersiva fa entrare. È ciò che rende la tua attività riconoscibile, oltre la semplice presenza online.

**Concetto 05** · H3 · verbatim · max 45
> La forza di un portale ad alto traffico

**Testo 05** · p · max 180
> Non parti da zero: entri in un portale che riunisce città e imprese. I visitatori che arrivano per un luogo possono fermarsi anche da te.

Note:
- Numerazione 01–05 decorativa (`aria-hidden="true"`). Sezione sticky o composizione editoriale numerata, non cinque card (sez. 20).
- Nessun claim numerico: «5–10 volte», «4 volte» e «250.000 visite mensili» non compaiono.
- Il titolo 05 è verbatim, ma «ad alto traffico» è già un'affermazione sul traffico. Il testo resta qualitativo. Se il cliente non documenta il traffico, propongo il titolo «La forza di un portale condiviso» (vedi Decisioni richieste).

### Modulo «Dato documentato» (predisposto, nascosto per impostazione)

Ogni concetto può mostrare un dato sotto il testo. Il dato compare solo se tutti e quattro i campi sono compilati e la documentazione del cliente è stata controllata. Altrimenti il concetto mostra solo il testo qualitativo.

| Campo | Contenuto | max |
|---|---|---|
| Valore | Il numero, per esempio un moltiplicatore o un totale | 10 |
| Etichetta | Che cosa misura, in chiaro | 50 |
| Fonte | Strumento o documento, per esempio lo strumento di analytics del portale | 60 |
| Periodo | Intervallo di rilevazione | 30 |

Resa: `[Valore]` in grande, sotto `[Etichetta]`, poi in piccolo «Fonte: [Fonte], [Periodo]».

| Affermazione citata nelle linee guida | Concetto probabile | Cosa serve per pubblicarla |
|---|---|---|
| «5–10 volte» | 02 Maggiore coinvolgimento | [DA FORNIRE: che cosa misura (per esempio il tempo di permanenza), rispetto a che cosa, fonte, periodo] |
| «4 volte» | [DA VERIFICARE: non è chiaro a quale concetto si riferisca] | [DA FORNIRE: che cosa misura, fonte, periodo] |
| «250.000 visite mensili» | 05 La forza di un portale ad alto traffico | [DA FORNIRE: export dell'analytics del portale, periodo, definizione di «visita»] |

## 5. CTA finale e form

**H2** · verbatim · max 80 · due frasi su due livelli tipografici (vedi nota)
> La tua azienda merita più di una presenza online. Merita di essere esplorata.

**CTA** · a → `#contatto` (primo campo del form) · verbatim
> Entra in Città Digitali →

**Titolo del form** · H3 · max 32
> Parlaci della tua attività

**Introduzione del form** · p · max 160
> Dicci cosa fai e in quale città lavori: ti spieghiamo come entrare in Città Digitali.

Note:
- Con 77 caratteri, il titolo alla scala piena occupa 6–7 righe su mobile. Consiglio la prima frase alla scala del lead e «Merita di essere esplorata.» alla scala piena, dentro lo stesso H2.
- La CTA porta al form, che segue (sez. 21), e non al portale, già linkato nella hero. Da confermare con cro-specialist.
- Campo «Mi interessa»: Città Digitali preselezionato (dato di contesto, non consenso). Consenso privacy mai preselezionato. Pulsante: «Invia richiesta».

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Sezione 4, Testo | Sito Interattivo Immersivo | `/siii` |
| Sezione 5 | Entra in Città Digitali → | `#contatto` |

Link in entrata: dalla pagina SIII (sezione 7) e dalla Home (capitolo 03, CTA «Esplora Città Digitali →»).

## Testi originali mancanti

- **Dal locale al nazionale (sez. 20).** Le linee guida chiedono di presentare «i cinque concetti forniti» e citano tre affermazioni numeriche, ma i testi originali non sono nel repository. I testi sono scritti solo a partire dai titoli dei concetti. [DA FORNIRE: testi originali e documentazione dei dati]
- **Video (sez. 19).** Contenuto non visto. Titolo e testo sono generici. [DA FORNIRE: accesso al file o descrizione, presenza di parlato, durata, data di pubblicazione, eventuale trascrizione]
- **Città (sez. 18).** Una riga per città, con un fatto geografico da fonti pubbliche citate.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 17 | 199 | 1.003 | **64,2** |
| Tutti i testi principali | 34 | 274 | 1.463 | 72,8 |

Obiettivo: almeno 60 per il grande pubblico, almeno 50 per i testi tecnici B2B. Esito: obiettivo raggiunto; il valore di riferimento è quello dei soli paragrafi, più prudente. Lo stesso script ha controllato 37 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description.

## Ipotesi da validare

- [DA VERIFICARE: indirizzo del portale. Le linee guida indicano https://www.cittadigitali.it, mentre i risultati di ricerca mostrano le pagine del progetto su cittàdigitali.it (con l'accento, in forma tecnica `xn--cittdigitali-19a.it`). Verificare che il link delle linee guida funzioni e porti al sito giusto]
- [IPOTESI: le attività entrano in Città Digitali con un tour virtuale o con un Sito Interattivo Immersivo, come dice il sottotitolo della sez. 17]
- [IPOTESI: il portale riunisce città di diverse regioni, come mostrano Varese, Altamura e Caltanissetta. Il testo non dice «tutta Italia» e non indica un numero di città]

## Domande aperte

1. A che cosa si riferiscono «5–10 volte» e «4 volte», e con quale documentazione?
2. Esiste un export dell'analytics del portale per le «250.000 visite mensili»?
3. Contenuto del video: parlato o solo musica, durata, data. Serve anche un file accessibile da questo ambiente (railway.app è bloccato).
4. Città Digitali risulta anche un franchising (vedi Fonti). La pagina deve parlare anche ai potenziali affiliati, o solo alle imprese?
5. Rapporto con Puglia Digitale: stessa rete o progetti distinti?

## Decisioni richieste

- **Cliente, tramite la sessione principale**: allineare il sottotitolo a «Siti Interattivi Immersivi» oppure lasciarlo com'è.
- **Cliente e cro-specialist**: tenere il titolo 05 «La forza di un portale ad alto traffico» solo con dati documentati, altrimenti usare «La forza di un portale condiviso».
- **cro-specialist**: destinazione della CTA «Entra in Città Digitali →» (form, non portale).

## Fonti consultate

Consultate il 2026-09-28. I portali e railway.app sono bloccati dall'ambiente: le informazioni sui portali vengono solo da risultati di ricerca.

- Varese, «città giardino», lago e Prealpi: https://en.wikipedia.org/wiki/Varese · https://www.comune.varese.it/vivere_il_comune/territorio/territorio_1.html
- Altamura, altopiano dell'Alta Murgia, entroterra barese: https://en.wikipedia.org/wiki/Altamura · https://www.sapere.it/enciclopedia/Altamura.html
- Caltanissetta, capoluogo nel cuore della Sicilia: https://www.visitsicily.info/luogo/caltanissetta/ · https://www.bellasicilia.it/caltanissetta-il-capoluogo-di-provincia-nel-cuore-della-sicilia/
- Città Digitali su cittàdigitali.it (solo sintesi di ricerca): https://xn--cittdigitali-19a.it/il-progetto/ · https://xn--cittdigitali-19a.it/caltanissetta/
- Città Digitali come franchising (solo sintesi di ricerca): https://xn--cittdigitali-19a.it/franchising/ · https://www.infofranchising.it/citta-digitali-franchising-pubblicita-aziende/
