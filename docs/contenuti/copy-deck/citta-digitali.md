---
titolo: Copy deck · Città Digitali
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer, web-performance-specialist]
stato: in revisione
versione: 1.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/seo/mappa-keyword-url.md, docs/seo/dati-strutturati.md, docs/cro/strategia-conversione.md, docs/contenuti/tone-of-voice.md, src/data/site.ts, src/data/asset-slots.ts, src/scripts/video.ts]
---

# Copy deck · Città Digitali

Pagina `/citta-digitali/`. Copre le sezioni 17, 18, 19, 20 e 21 delle linee guida (LG) e l'introduzione al form (§23). I testi sono pronti da impaginare.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi, per la scala della §04. **verbatim**: frase delle LG; si cambia solo l'apostrofo tipografico.
- **Frecce** (tone of voice §6): → altra pagina o form, ↓ sezione della pagina nei link secondari, ↗ sito esterno in nuova scheda. Sempre `aria-hidden="true"`.
- **Link esterni**: `target="_blank" rel="noopener"`. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3) e dichiara la nuova scheda.
- **Fonti che prevalgono nel loro dominio**: brief consolidato (fatti e claim), mappa keyword→URL (heading, metadati, blocchi di risposta), strategia di conversione (CTA, ancore, form), tone of voice (grafie e convenzioni).
- **Attribuzione.** Non si scrive che ITnode ha creato Città Digitali (brief A1, D5). Formula provvisoria: «con cui ITnode porta online».

## Metadati

Fa fede `docs/seo/mappa-keyword-url.md` §2 (owner seo-content). Copia per comodità:

| Campo | Testo | Limite |
|---|---|---|
| Title | Città Digitali: le attività del territorio online \| ITnode | ≤ 60 |
| Meta description | Città Digitali porta online le attività di città come Varese, Altamura e Caltanissetta con tour virtuali, Siti Interattivi Immersivi e strumenti digitali. | 140–155 |
| Breadcrumb | Home › Città Digitali | — |

## Struttura della pagina

| # | Sezione | Ancora | Componente suggerito (§30) |
|---|---|---|---|
| 1 | Hero | — | Hero |
| 2 | L’Italia in un unico portale | `#portale` | LocationShowcase ad alto impatto visivo |
| 3 | Video | `#video` | VideoSection a tutta larghezza |
| 4 | Dal locale al nazionale | `#come-funziona` | Sezione sticky o composizione numerata, niente card |
| 5 | Chiusura e form | `#richiesta` | CTASection + ContactForm |
| 6 | Gli altri mondi ITnode | — | Riga editoriale con due link |

## 1. Hero

**Eyebrow** · p · max 36
> Digitalizzazione territoriale

**H1** · verbatim · max 72 in totale (riga 1: 14, riga 2: 56) · due righe nello stesso H1: nome alla scala piena, statement alla scala dei titoli di sezione
> Città Digitali\
> Le attività del territorio, online senza perdere radici.

**Sottotitolo** · p · verbatim · max 120
> Tour virtuali, Siti Immersivi Interattivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano.

**CTA primaria** · a → https://www.cittadigitali.it · verbatim · `cta_id` cd-hero-portale
> Visita il portale ↗

**Nome accessibile della CTA primaria**
> Visita il portale Città Digitali (si apre in una nuova scheda)

**CTA secondaria** · link testuale → `#richiesta` · max 28 · `cta_id` cd-hero-richiesta
> Aderisci a Città Digitali ↓

Note:
- H1 composto da nome e statement, come nella mappa SEO §2: distingue il progetto dagli omonimi («città digitale», smart city).
- **Sottotitolo e DR2.** Le LG scrivono «Siti Immersivi Interattivi», con l'ordine invertito rispetto al nome del prodotto. Se l'utente approva la DR2 del brief, il testo diventa «Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano.», con link da «Siti Interattivi Immersivi» a `/siii/` (mappa SEO). Finché la decisione manca, resta verbatim e senza link.
- CTA secondaria: la strategia di conversione propone «Porta la tua attività in Città Digitali» (39 caratteri). La guida di stile fissa un massimo di 28 caratteri, quindi propongo «Aderisci a Città Digitali ↓», da confermare con cro-specialist. Evito «Entra in Città Digitali» nella hero perché, accanto a «Visita il portale ↗», si confonderebbe con il link al portale.
- Parola lunga nel sottotitolo: «imprenditoriale» (15 caratteri). Alla scala del sottotitolo non crea problemi.

## 2. L’Italia in un unico portale

**H2** · verbatim · max 40
> L’Italia in un unico portale.

**Testo** · p · blocco di risposta E · max 420
> Città Digitali è la rete e il portale nazionale con cui ITnode porta online le attività del territorio, senza che perdano le proprie radici. Offre al tessuto imprenditoriale e commerciale italiano tour virtuali, Siti Interattivi Immersivi e strumenti digitali. Riunisce in un unico portale, cittadigitali.it, città come Varese, Altamura e Caltanissetta.

**Statement** · p · max 100 · resa grande
> Da Varese a Caltanissetta, passando per Altamura: città diverse, un’unica rete da esplorare.

**Schede delle città** · copy · da nord a sud, come nelle LG
| Campo | Città 1 | Città 2 | Città 3 |
|---|---|---|---|
| Nome · H3 · max 16 | Varese | Altamura | Caltanissetta |
| Regione · p · max 16 | Lombardia | Puglia | Sicilia |
| Riga · p · max 60 | La città giardino, tra il lago e le Prealpi. | Sull’altopiano dell’Alta Murgia, nell’entroterra barese. | Capoluogo di provincia nel cuore della Sicilia. |
| Dominio · p | varesedigitale.it | altamuradigitale.com | caltanissettadigitale.it |
| CTA · a · max 16 | Esplora ↗ | Esplora ↗ | Esplora ↗ |
| Nome accessibile della CTA | Esplora Varese su varesedigitale.it (si apre in una nuova scheda) | Esplora Altamura su altamuradigitale.com (si apre in una nuova scheda) | Esplora Caltanissetta su caltanissettadigitale.it (si apre in una nuova scheda) |
| URL | https://www.varesedigitale.it | https://www.altamuradigitale.com | https://www.caltanissettadigitale.it |
| `cta_id` | cd-citta-varese | cd-citta-altamura | cd-citta-caltanissetta |
| Immagine (slot) | `luogo-varese` | `luogo-altamura` | `luogo-caltanissetta` |

Note:
- Il Testo è il Blocco E della mappa SEO, con le stesse parole; l'ultima frase è spezzata in due per la leggibilità (Gulpease). È il primo paragrafo sotto l'H2, nell'HTML statico. Nomina le città reali, come chiede il brief (N12): «L’Italia in un unico portale» non deve far pensare a una copertura completa del Paese.
- La regione è l'elemento che fa percepire «l'Italia»: va in evidenza, per esempio insieme alle coordinate già presenti in `src/data/site.ts`.
- Le righe contengono un solo fatto geografico, verificato su fonti pubbliche (vedi Fonti). La §18 non prevede una CTA: «Esplora ↗» è ripresa dalla §15 per coerenza con Puglia Digitale.
- Le immagini dei territori mancano (slot `luogo-*`). [DA FORNIRE]

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
- Il video (`https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2`) non è raggiungibile da questo ambiente: titolo e testo restano volutamente generici e non descrivono scene che nessuno del team ha visto. La mappa SEO indica come segnaposto «Città Digitali in video»: il titolo definitivo si sceglie dopo la visione.
- Nome accessibile: `<video aria-labelledby>` collegato all'H2.
- Accessibilità (WCAG 2.2 AA): se nel video si parla servono i sottotitoli (1.2.2); se le informazioni sono solo visive serve la descrizione testuale (1.2.1, 1.2.3, 1.2.5). La descrizione va in un blocco richiudibile sotto il player (`<details>`), con il titolo «Leggi la descrizione del video» (microcopy da confermare con copywriter-brand).
- Dati strutturati VideoObject (`docs/seo/dati-strutturati.md`): `name` è l'H2 senza punto finale, `description` è il Testo; devono coincidere con il testo visibile (§26). Mancano `thumbnailUrl` (slot `video-poster`), `uploadDate` e `duration`. Finché mancano, il nodo non si pubblica. [DA FORNIRE]

## 4. Dal locale al nazionale

**Eyebrow** · p · max 36
> Come funziona

**H2** · verbatim · max 30
> Dal locale al nazionale.

**Testo** · p · max 200 · link interno su «Sito Interattivo Immersivo (SIII)» → `/siii/`
> Con un tour virtuale o un Sito Interattivo Immersivo (SIII), la tua attività resta radicata nel suo territorio e, dentro un portale nazionale, diventa visitabile da chiunque, ovunque si trovi.

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
- Numerazione 01–05 decorativa (`aria-hidden="true"`). Sezione sticky o composizione editoriale numerata, non cinque card (§20). Nessuna sezione sticky deve contenere il form (strategia di conversione §5).
- Nessun claim numerico: «5–10 volte», «4 volte» e «250.000 visite mensili» non compaiono (brief N6–N8).
- Il titolo 05 è verbatim, ma «ad alto traffico» è già un'affermazione sul traffico (brief N10). Il testo resta qualitativo. Se il cliente non documenta il traffico, il titolo diventa «La forza di un portale nazionale», come propone il brief.

### Modulo «Dato documentato» (predisposto, nascosto per impostazione)

Ogni concetto può mostrare un dato sotto il testo. Il dato compare solo se tutti e quattro i campi sono compilati e la documentazione del cliente è stata controllata; altrimenti il concetto mostra solo il testo qualitativo.

| Campo | Contenuto | max |
|---|---|---|
| Valore | Il numero, per esempio un moltiplicatore o un totale | 10 |
| Etichetta | Che cosa misura, in chiaro | 50 |
| Fonte | Strumento o documento, per esempio lo strumento di analytics del portale | 60 |
| Periodo | Intervallo di rilevazione | 30 |

Resa: `[Valore]` in grande, sotto `[Etichetta]`, poi in piccolo «Fonte: [Fonte], [Periodo]». Testo accessibile sciolto, come per i numeri di Puglia Digitale.

| Affermazione citata nelle LG | Concetto probabile | Cosa serve per pubblicarla |
|---|---|---|
| «5–10 volte» | 02 Maggiore coinvolgimento | [DA FORNIRE: che cosa misura (per esempio il tempo di permanenza), rispetto a che cosa, fonte, periodo] (N6) |
| «4 volte» | [DA VERIFICARE: non è chiaro a quale concetto si riferisca] | [DA FORNIRE: che cosa misura, fonte, periodo] (N7) |
| «250.000 visite mensili» | 05 La forza di un portale ad alto traffico | [DA FORNIRE: export dell'analytics del portale, metrica, periodo] (N8). Formula del brief se documentato: «Oltre 250.000 visite al mese su [portale] (media [periodo], fonte [strumento])» |

## 5. Chiusura e form

**H2** · verbatim · max 80 · due frasi su due livelli tipografici (vedi nota)
> La tua azienda merita più di una presenza online. Merita di essere esplorata.

**CTA** · a → `#richiesta` · verbatim · `cta_id` cd-chiusura-entra
> Entra in Città Digitali →

**Introduzione del form** · p · max 160
> Raccontaci la tua attività: ti spieghiamo come entrare in Città Digitali.

Note:
- Con 77 caratteri, il titolo alla scala piena occupa 6–7 righe su mobile. Consiglio la prima frase alla scala del lead e «Merita di essere esplorata.» alla scala piena, dentro lo stesso H2.
- La CTA porta al form, non al portale, già collegato nella hero (strategia di conversione §4). L'introduzione del form scioglie l'ambiguità: dice che cosa succede dopo. È il testo della strategia di conversione §8, adottato così com'è.
- Se il form è già visibile, la CTA diventa il titolo del form (H3 «Entra in Città Digitali», senza freccia).
- «Mi interessa»: Città Digitali preselezionato in build (`form_id` richiesta-citta-digitali). Casella privacy sempre vuota. Pulsante: «Invia richiesta».

## 6. Gli altri mondi ITnode

**H2** · max 36
> Gli altri mondi ITnode

**Testo** · p · max 150 · due link interni
> Dalla rete di città alla singola impresa: la stessa visione si ritrova in Puglia Digitale e nei Siti Interattivi Immersivi (SIII).

Link: «Puglia Digitale» → `/puglia-digitale/`; «Siti Interattivi Immersivi (SIII)» → `/siii/`. Posizione: dopo il form, come chiusura della pagina (proposta per ux-designer, mappa SEO §3.4).

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Hero | Aderisci a Città Digitali ↓ | `#richiesta` |
| Sezione 4, Testo | Sito Interattivo Immersivo (SIII) | `/siii/` |
| Sezione 5 | Entra in Città Digitali → | `#richiesta` |
| Sezione 6 | Puglia Digitale · Siti Interattivi Immersivi (SIII) | `/puglia-digitale/` · `/siii/` |

In entrata: Home (capitolo 03, «Esplora Città Digitali →»), blocchi finali di `/siii/` e `/puglia-digitale/`, `/contatti/` (I portali), navigazione e footer.

## Allineamenti con gli altri documenti

| Punto | Scelta in questo documento | Motivo |
|---|---|---|
| Ancora del form | `#richiesta` | Strategia di conversione. La mappa SEO usa `#entra`: va allineata. |
| Eyebrow della hero | «Digitalizzazione territoriale» | Sostituisce «Un progetto ITnode» della v1.0, un'attribuzione non confermata (A1, D5). |
| CTA secondaria della hero | «Aderisci a Città Digitali ↓» | Massimo 28 caratteri (tone of voice §6), nessuna confusione con il link al portale. |
| Titolo di riserva del concetto 05 | «La forza di un portale nazionale» | Brief N10 e mappa SEO (sostituisce la mia proposta «condiviso» della v1.0). |
| Video | H2 «Città Digitali, in movimento.» | Alternativa al segnaposto della mappa SEO; decisione finale dopo la visione. |

## Testi originali mancanti

- **Dal locale al nazionale (§20).** Le LG chiedono di presentare «i cinque concetti forniti» e citano tre affermazioni numeriche, ma i testi originali non sono nel repository (brief §7, P1). I testi sono scritti solo a partire dai titoli dei concetti. [DA FORNIRE: testi originali e documentazione dei dati]
- **Video (§19).** Contenuto non visto; titolo e testo generici. [DA FORNIRE: file accessibile o descrizione, presenza di parlato, durata, data di pubblicazione, eventuale trascrizione]
- **Città (§18).** Una riga per città, con un fatto geografico da fonti pubbliche citate.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, statement, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 20 | 255 | 1.324 | **60,6** |
| Tutti i testi principali | 37 | 343 | 1.855 | 67,3 |

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. I blocchi di risposta della mappa SEO, pieni di nomi di prodotto lunghi, abbassano l'indice: per questo alcune frasi sono state spezzate, a parole invariate. Lo stesso script ha controllato 39 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description.

## Ipotesi da validare

- [DA VERIFICARE: indirizzo del portale. Le LG indicano https://www.cittadigitali.it, mentre i risultati di ricerca mostrano le pagine del progetto su cittàdigitali.it, con l'accento (in forma tecnica `xn--cittdigitali-19a.it`). Il link va controllato in QA]
- [IPOTESI: le attività entrano in Città Digitali con un tour virtuale o con un Sito Interattivo Immersivo, come dice il sottotitolo della §17]
- [IPOTESI: il portale riunisce città di più regioni, come mostrano Varese, Altamura e Caltanissetta. Il testo non dice «tutta Italia» e non indica un numero di città]

## Domande aperte

1. A che cosa si riferiscono «5–10 volte» e «4 volte», e con quale documentazione (D7)?
2. Esiste un export dell'analytics del portale per le «250.000 visite mensili» (N8)?
3. Contenuto del video: parlato o solo musica, durata, data; serve un file accessibile da questo ambiente (railway.app è bloccato) (S8).
4. Il sito deve rivolgersi anche ai potenziali affiliati del franchising (D5, DR5)?
5. Città Digitali e Puglia Digitale: stessa rete o progetti distinti? Come convivono per le città pugliesi come Altamura (D5)?

## Decisioni richieste

- **Utente, tramite la sessione principale** (DR2): allineare il sottotitolo a «Siti Interattivi Immersivi».
- **Cliente e cro-specialist** (N10): titolo 05 «La forza di un portale ad alto traffico» solo con dati documentati, altrimenti «La forza di un portale nazionale».
- **cro-specialist**: etichetta della CTA secondaria della hero.
- **seo-content**: allineare l'ancora `#richiesta` nella mappa.

## Fonti consultate

Consultate il 2026-09-28. I portali e railway.app sono bloccati dall'ambiente: le informazioni sui portali vengono solo da risultati di ricerca.

- Varese, «città giardino», lago e Prealpi: https://en.wikipedia.org/wiki/Varese · https://www.comune.varese.it/vivere_il_comune/territorio/territorio_1.html
- Altamura, altopiano dell'Alta Murgia, entroterra barese: https://en.wikipedia.org/wiki/Altamura · https://www.sapere.it/enciclopedia/Altamura.html
- Caltanissetta, capoluogo nel cuore della Sicilia: https://www.visitsicily.info/luogo/caltanissetta/ · https://www.bellasicilia.it/caltanissetta-il-capoluogo-di-provincia-nel-cuore-della-sicilia/
- Città Digitali su cittàdigitali.it e franchising (solo sintesi di ricerca): https://xn--cittdigitali-19a.it/il-progetto/ · https://xn--cittdigitali-19a.it/caltanissetta/ · https://xn--cittdigitali-19a.it/franchising/
