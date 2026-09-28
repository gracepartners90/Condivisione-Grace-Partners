---
titolo: Copy deck · Puglia Digitale
owner: copywriter-content
contributi: [copywriter-brand, seo-content, cro-specialist, ux-designer]
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, src/data/site.ts, src/data/asset-slots.ts]
---

# Copy deck · Puglia Digitale

Pagina `/puglia-digitale`. Copre le sezioni 13, 14, 15 e 16 delle linee guida, la CTA finale e l'introduzione al form (sez. 23). Rispetto alla pagina SIII il carattere è più territoriale ed emozionale (sez. 13). I testi sono pronti da impaginare.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi, pensati per la scala della sez. 04. **verbatim**: frase delle linee guida da non modificare.
- **Link esterni**: nuova scheda (`target="_blank" rel="noopener"`), dichiarata nel nome accessibile. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3).
- **Microcopy del form**: è di copywriter-brand.

## Metadati

Proposta da validare con seo-content: manca ancora il brief SEO della pagina.

| Campo | Testo | Limite |
|---|---|---|
| URL | `/puglia-digitale` | — |
| Title | Puglia Digitale · Destination Marketing immersivo · ITnode | ≤ 60 |
| Meta description | Puglia Digitale è il progetto di Destination Marketing di ITnode: città, borghi e imprese pugliesi da esplorare online attraverso esperienze immersive. | 120–155 |
| og:title | Puglia Digitale · Un progetto ITnode | ≤ 60 |
| og:description | Dalla costa all’entroterra. Un territorio da esplorare. | ≤ 110 |
| Breadcrumb | Home › Puglia Digitale | — |

Nota SEO: il nome «Puglia Digitale» è usato anche da altri soggetti, tra cui i programmi di agenda digitale della Regione Puglia («Puglia Digitale 2020», «Puglia Digitale 2030») e il portale puglia-digitale.it di un'associazione (vedi Fonti). Title, meta description, eyebrow e prima frase della pagina associano sempre il nome a ITnode, così il progetto resta distinguibile.

## Struttura della pagina

| # | Sezione | Ancora | Componente suggerito (sez. 30) |
|---|---|---|---|
| 1 | Hero | — | Hero |
| 2 | Il progetto | `#progetto` | LargeStatement + testo editoriale |
| 3 | Fotografia dell'evento | — | Immagine a tutta larghezza con didascalia |
| 4 | Numeri | `#numeri` | Stats, grande impatto tipografico |
| 5 | I luoghi | `#luoghi` | LocationShowcase: tre porte d'accesso, non tre card |
| 6 | Perché aderire | `#perche-aderire` | BenefitsSection con numerazione grande |
| 7 | CTA finale e form | `#contatto` | CTASection + ContactForm |

## 1. Hero

**Eyebrow** · p · max 36
> Un progetto ITnode

**H1** · verbatim · max 16
> Puglia Digitale

**Sottotitolo** · p · verbatim · max 80
> Una piattaforma interattiva immersiva per la valorizzazione territoriale.

**CTA** · a → https://www.lapugliadigitale.it · verbatim
> Visita il portale →

**Nome accessibile della CTA**
> Visita il portale Puglia Digitale (si apre in una nuova scheda)

Note:
- L'eyebrow «Un progetto ITnode» è un fatto della sez. 07 («ITnode ha creato Città Digitali e Puglia Digitale») e distingue il progetto dagli omonimi.
- Visual: le linee guida chiedono immagini della Puglia, ma non ci sono negli asset (slot `puglia-paesaggio`). L'unica foto reale legata al progetto è quella dell'evento: vedi sezione 3.

## 2. Il progetto

**H2** · verbatim · max 60
> Dalla costa all’entroterra. Un territorio da esplorare.

**Testo 1** · p · max 260
> Puglia Digitale è un progetto di Destination Marketing: digitalizza e valorizza città, borghi e imprese attraverso esperienze immersive. Piazze, vie e attività diventano luoghi da visitare online, prima di partire e dopo il ritorno.

**Testo 2** · p · max 220
> Fare Destination Marketing significa promuovere un territorio come destinazione. Puglia Digitale lo fa mettendo in rete luoghi e imprese: chi cerca la Puglia non si limita a leggerla, la esplora.

Note:
- La prima frase del Testo 1 è la definizione della pagina (sez. 13), autosufficiente per i motori di risposta.
- Parola lunga nel titolo: «all’entroterra.» è un blocco unico di 15 caratteri. A 44 px su uno schermo da 390 px rischia di uscire dalla colonna. Prevedere `hyphens: auto` con `lang="it"` oppure una scala minima più bassa per questo titolo.
- «Destination Marketing» con le iniziali maiuscole, come nelle linee guida (da confermare nel glossario con copywriter-brand).

## 3. Fotografia dell'evento

**Immagine**: `src/assets/images/derivate/evento-panoramica.jpg` (oppure `evento-palco.jpg` su mobile). Testo alternativo in `docs/contenuti/alt-text.md`.

**Didascalia** · figcaption · max 100
> Puglia Digitale, evento regionale digitale: Giacomo Lenoci, fondatore di ITnode, sul palco.

Note:
- È l'unica foto reale del progetto: platea numerosa e tour virtuali sui maxischermi. Racconta la rete meglio di qualsiasi paesaggio generico.
- La didascalia riprende la scritta sul fondale («Evento regionale digitale – Puglia»). Non aggiungere enti organizzatori o patrocini: non sono documentati.
- [DA VERIFICARE: nome del fondatore. Viene dal profilo LinkedIn indicato nelle linee guida e da fonti pubbliche. Se non viene confermato: «Puglia Digitale, evento regionale digitale: il fondatore di ITnode sul palco.»]
- [DA FORNIRE: data e luogo dell'evento. Con questi dati la didascalia diventa una prova concreta, per esempio «Bari, marzo 2026»]
- Anche la foto originale porta in basso a destra il segno di Gemini (vedi Rischi).

## 4. Numeri

**H2** · max 45
> I numeri dei territori coinvolti

**Numeri** · copy · componente Stats
| # | Valore (visivo) · max 10 | Didascalia · max 45 | Testo per le tecnologie assistive |
|---|---|---|---|
| 1 | 30+ | città coinvolte | Oltre 30 città coinvolte |
| 2 | ~200.000 | partite IVA nei territori coinvolti | Circa 200.000 partite IVA nei territori coinvolti |
| 3 | 60% | del tessuto produttivo pugliese | Il 60% del tessuto produttivo pugliese |

**Nota sotto i numeri** · p · max 70 · da pubblicare solo se il cliente fornisce la data
> Dati ITnode, aggiornati a [DA FORNIRE: mese e anno].

Note:
- Valori e didascalie sono quelli della sez. 14, trattati come dati forniti dal cliente. Unico adattamento: «Città» diventa «città coinvolte», per coerenza con «territori coinvolti».
- L'H2 dice a che cosa si riferiscono i numeri: descrivono i territori coinvolti, non le imprese che hanno aderito al portale. Nessuna didascalia deve diventare «200.000 imprese in Puglia Digitale» o «il 60% delle imprese pugliesi aderisce».
- Markup: il valore visivo va con `aria-hidden="true"` e accanto il testo per le tecnologie assistive, visivamente nascosto. Senza questo accorgimento alcuni lettori di schermo leggono «tilde 200.000».
- Nessun'altra statistica (sez. 14).

## 5. I luoghi

**H2** · verbatim · max 20
> I luoghi

**Testo** · p · max 90
> Tre città, tre porte d’accesso al territorio. Scegli da dove entrare.

**Schede dei luoghi** · copy · una colonna per luogo, nell'ordine dalla costa all'entroterra
| Campo | Luogo 1 | Luogo 2 | Luogo 3 |
|---|---|---|---|
| Nome · H3 · max 24 | Monopoli | Acquaviva delle Fonti | Gravina in Puglia |
| Riga · p · max 80 | Sulla costa adriatica, tra il porto antico e il centro storico. | Nell’entroterra barese, la città in cui ha sede ITnode. | La città che prende il nome dalla sua gravina, nell’Alta Murgia. |
| Dominio · p | monopolidigitale.it | acquavivadigitale.com | gravinadigitale.it |
| CTA · a · verbatim | Esplora → | Esplora → | Esplora → |
| Nome accessibile della CTA | Esplora Monopoli su monopolidigitale.it (si apre in una nuova scheda) | Esplora Acquaviva delle Fonti su acquavivadigitale.com (si apre in una nuova scheda) | Esplora Gravina in Puglia su gravinadigitale.it (si apre in una nuova scheda) |
| URL | https://www.monopolidigitale.it | https://www.acquavivadigitale.com | https://www.gravinadigitale.it |
| Immagine (slot) | `luogo-monopoli` | `luogo-acquaviva` | `luogo-gravina` |

Note:
- Ordine proposto: dalla costa all'entroterra, come il titolo della sezione 2. Le linee guida elencano Acquaviva, Gravina e Monopoli: se si preferisce quell'ordine, i testi restano validi. In `src/data/site.ts` basta riordinare `pugliaPlaces`.
- Ogni riga contiene un solo fatto geografico, verificato su fonti pubbliche (vedi Fonti), più il legame con ITnode per Acquaviva (sede operativa, sez. 22). Non ci sono informazioni sui contenuti dei portali, che non si possono consultare.
- Le fotografie dei luoghi mancano (slot `luogo-*`): è l'asset più importante per il carattere territoriale della pagina.

## 6. Perché aderire

**Eyebrow** · p · max 36
> Per le imprese

**H2** · max 45
> Perché aderire a Puglia Digitale

**Motivo 01** · H3 · verbatim · max 45
> Aperti al mondo, 24/7

**Testo 01** · p · max 180
> La tua impresa resta visitabile a ogni ora, da chiunque e da qualunque luogo. Il portale è aperto anche quando tu hai chiuso.

**Motivo 02** · H3 · verbatim · max 45
> Vendere attraverso l’esperienza

**Testo 02** · p · max 180
> Chi esplora i tuoi spazi scopre prodotti e servizi nel loro contesto reale. La vendita comincia da un’esperienza, non da una vetrina.

**Motivo 03** · H3 · verbatim · max 45
> La forza della rete

**Testo 03** · p · max 180
> La tua attività non è sola online: entra in un portale che riunisce città, borghi e imprese del territorio. Chi arriva per un luogo può scoprire anche te.

**Motivo 04** · H3 · verbatim · max 45
> Continuare la relazione oltre il viaggio

**Testo 04** · p · max 180
> Il viaggio finisce, il legame no. Chi ti ha conosciuto in Puglia può tornare a trovarti online, rivedere i tuoi spazi e ricontattarti da casa.

Note:
- Numerazione grande (01–04) con `aria-hidden="true"`. Composizione dinamica, non quattro card identiche (sez. 16).
- Nessun dato quantitativo sul traffico o sulle vendite.

## 7. CTA finale e form

**H2** · verbatim · max 50
> Porta la tua impresa dentro Puglia Digitale.

**CTA** · a → `#contatto` (primo campo del form) · verbatim
> Contattaci →

**Titolo del form** · H3 · max 32
> Parlaci della tua impresa

**Introduzione del form** · p · max 160
> Raccontaci cosa fai e dove ti trovi: ti spieghiamo come entrare nel portale.

Note:
- Campo «Mi interessa»: Puglia Digitale preselezionato (dato di contesto, non consenso). Consenso privacy mai preselezionato.
- Pulsante di invio: «Invia richiesta» (sez. 23, verbatim).

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Sezione 7 | Contattaci → | `#contatto` |
| Testo 1, sezione 2 (facoltativo) | esperienze immersive | `/siii` |

Il link da «esperienze immersive» a `/siii` è facoltativo e va usato solo se il cliente conferma che le imprese entrano nel portale con un SIII. L'indizio c'è: l'esempio Maison Miminà è pubblicato su monopolidigitale.it. [DA VERIFICARE]

Link in entrata: dalla pagina SIII (sezione 7) e dalla Home (capitolo 02, CTA «Scopri Puglia Digitale →»).

## Testi originali mancanti

- **Perché aderire (sez. 16).** Le linee guida chiedono di «riorganizzare i contenuti forniti», ma i testi originali non sono nel repository. Le descrizioni sono scritte solo a partire dai quattro titoli e dal concept della sez. 13. [DA FORNIRE: testi originali]
- **Il progetto (sez. 13).** Scritto con i soli fatti della sez. 13, più una definizione generale di Destination Marketing.
- **I luoghi (sez. 15).** Una riga per luogo, con un fatto geografico da fonti pubbliche citate.
- **Numeri (sez. 14).** [DA FORNIRE: fonte e data di riferimento dei tre dati]

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 19 | 229 | 1.138 | **64,2** |
| Tutti i testi principali | 38 | 307 | 1.592 | 74,3 |

Obiettivo: almeno 60 per il grande pubblico, almeno 50 per i testi tecnici B2B. Esito: obiettivo raggiunto; il valore di riferimento è quello dei soli paragrafi, più prudente. Lo stesso script ha controllato 35 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description.

## Ipotesi da validare

- [DA VERIFICARE: «60% del tessuto produttivo pugliese» indica la quota di imprese pugliesi che si trova nei territori coinvolti. Le didascalie e l'H2 della sezione 4 si basano su questa lettura]
- [IPOTESI: «30+ città» indica i comuni coinvolti nel progetto, cioè gli stessi territori delle 200.000 partite IVA]
- [IPOTESI: il portale ufficiale del progetto è https://www.lapugliadigitale.it (sez. 22) e non ha legami con puglia-digitale.it]
- [DA VERIFICARE: nome del fondatore nella didascalia]

## Domande aperte

1. Qual è la fonte dei tre numeri, e a quale data si riferiscono?
2. Qual è il rapporto tra Puglia Digitale e Città Digitali? Per esempio: Puglia Digitale è la declinazione regionale della rete? Serve per i link tra le due pagine.
3. Le imprese entrano nel portale con un SIII, con un tour virtuale o con entrambi?
4. Data, luogo e numero di partecipanti (se documentato) dell'evento nella fotografia.
5. ITnode ha rapporti con la Regione Puglia, con il portale puglia-digitale.it o con i progetti omonimi? Se non ne ha, la pagina non deve lasciarli intendere. Se ne ha, vanno documentati prima di citarli.

## Decisioni richieste

- **creative-director e ux-designer**: ordine dei luoghi (dalla costa all'entroterra oppure quello delle linee guida) e posizione della fotografia dell'evento.
- **seo-content**: strategia di distinzione del nome «Puglia Digitale» dagli omonimi (title, meta description, dati strutturati).

## Rischi

- **Omonimia.** «Puglia Digitale» è anche il nome dei programmi di agenda digitale della Regione Puglia e di un altro portale di tour virtuali. Un visitatore potrebbe credere che il progetto sia istituzionale, e la fotografia con la scritta «Evento regionale» rafforza questa lettura. Nessun testo deve suggerire patrocini o collaborazioni non documentati (soglia 1).
- **Foto elaborata con AI.** La foto originale dell'evento ha nell'angolo il segno visibile che Gemini applica alle immagini create o modificate con l'app. I ritagli in `derivate/` lo eliminano. Vedi `docs/contenuti/alt-text.md`, sezione Rischi.

## Fonti consultate

Consultate il 2026-09-28. I portali del progetto e itnode.it sono bloccati dall'ambiente.

- Monopoli, costa adriatica, porto antico e centro storico: https://it.wikipedia.org/wiki/Monopoli_(Italia) · https://www.tuttitalia.it/puglia/60-monopoli/
- Acquaviva delle Fonti, entroterra della provincia di Bari: https://www.italia.it/en/puglia/acquaviva-delle-fonti · https://en.wikipedia.org/wiki/Acquaviva_delle_Fonti
- Gravina in Puglia, nome dalla gravina e sede del Parco nazionale dell'Alta Murgia: https://www.cittaslow.it/citta/gravina-puglia · https://en.wikipedia.org/wiki/Alta_Murgia_National_Park
- Omonimi «Puglia Digitale»: https://www.regione.puglia.it/web/trasformazione-digitale/puglia-digitale-2030 · https://www.regione.puglia.it/web/trasformazione-digitale/puglia-digitale · https://puglia-digitale.it/ · https://www.consiglio.puglia.it/-/tour-virtuali-delle-citt%C3%A0-pugliesi (solo sintesi di ricerca)
