---
titolo: Brief consolidato
owner: brand-strategist
contributi: []
stato: bozza
versione: 0.6
aggiornato: 2026-10-08
fonti: [docs/brief/linee-guida.md, src/assets/images/, ricerche web del 2026-09-28 (sezione 8), ricerche web e risposte dell'utente del 2026-10-05 e del 2026-10-06 (docs/strategia/citta-digitali-elenco.md), richieste dell'utente del 2026-10-08 sulla hero di /siii/ e sul capitolo 01 della Home (parole esatte in A8), ricerche web del 2026-10-08 (sezione 8), docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.4)]
---

# Brief consolidato · Nuovo sito ITnode

Questo documento è la fonte di verità del team su fatti, entità e claim. Le linee guida del cliente (`docs/brief/linee-guida.md`, qui citate come «LG §n») prevalgono su tutto. Ciò che non viene dalle LG è marcato `[DA FORNIRE]`, `[DA VERIFICARE]` o `[IPOTESI]`.
**Prima di scrivere un numero, un nome o un'attribuzione, controllare il registro (sezione 5).**

## 0. Da sapere prima di iniziare

1. **Non è chiaro chi abbia creato Puglia Digitale.** Le LG (§07) dicono: «ITnode ha creato Città Digitali e Puglia Digitale». Secondo fonti pubbliche, però, un portale omonimo, puglia-digitale.it, è stato «creato dall'associazione Campo e controcampo con il contributo del Consiglio regionale». Le LG (§22) indicano invece lapugliadigitale.it. Finché il cliente non chiarisce i ruoli (D1), la frase non va pubblicata in questa forma: la formulazione provvisoria è in 2.4.
2. **Per ora il patrocinio non si può attribuire a ITnode.** Le fonti lo collegano all'associazione e al suo portale. Non si usa né il testo né il logo senza l'atto formale (D2).
3. **Foto del fondatore.** Le quattro immagini con skyline di grattacieli e reti luminose sembrano generate o ritoccate con AI: due portano il simbolo ✦ di Gemini, e tutte mostrano eventi «Città Digitali» di cui non abbiamo documentazione. Anche la foto reale dell'evento Puglia Digitale ha un ✦ in basso a destra, oltre a cornice, logo e firma sovrimpressi. Queste immagini non vanno usate come prova di eventi. Per i contenuti AI che ritraggono persone reali va valutato l'obbligo di trasparenza dell'AI Act (art. 50, in applicazione dal 2 agosto 2026) `[DA VERIFICARE con un consulente legale]`. Serve la decisione DR3.
4. **Città Digitali ha un modello in franchising** (fonti pubbliche) di cui le LG non parlano. Va chiarito se il sito deve rivolgersi anche a potenziali affiliati (D5).
5. **Mancano i testi originali** che le LG citano come «forniti»: il racconto del fondatore, i benefici del SIII, i motivi per aderire, il «come funziona». Mancano anche tutte le immagini dei luoghi (sezione 7). Senza questi materiali i copywriter dovrebbero scrivere da zero, con il rischio di inventare.

## 1. Quadro del progetto

| Voce | Sintesi | Fonte |
|---|---|---|
| Obiettivo del sito | Chi visita il sito deve percepire subito che ITnode costruisce esperienze che collegano spazio fisico, spazio digitale, persone, imprese e territorio. Il concept è «superare i confini del web tradizionale». Il sito stesso deve dimostrare questa idea: far percepire l'immersione, non limitarsi a raccontarla. | LG premessa, §02, §35 |
| Cosa ITnode non è | Non «una società che realizza siti web». Niente estetica da software house, web agency, startup SaaS o template. | LG §02, §03, §07 |
| Pagine | `/`, `/siii`, `/puglia-digitale`, `/citta-digitali`, `/contatti`, `/privacy-policy`, `/cookie-policy`, 404 | LG §06, §10, §22, §24; incarico |
| Conversione primaria | Richiesta di contatto o di offerta tramite il form (su SIII, Puglia Digitale, Città Digitali e Contatti) | LG §12, §16, §21, §23 `[IPOTESI: deduzione]` |
| Conversioni secondarie | Visita ai portali e alle esperienze (link esterni; le esperienze si aprono in una nuova scheda); telefono ed email | LG §12, §13, §17, §22 |
| Tono | Autorevole, innovativo, chiaro, contemporaneo; niente linguaggio da startup generica | LG §25 |
| Regole sui contenuti | I testi del cliente sono la fonte primaria. Si possono correggere, riordinare e titolare; non si possono inventare risultati, clienti, statistiche o partnership, né cambiare il significato. | LG §25, §11, §14, §20 |
| Regole sugli asset | Prima le foto reali. Niente stock e niente immagini AI generate da noi. Se un'immagine manca, si predispone lo spazio e la si chiede. | LG §31 |
| Qualità | WCAG 2.2 AA, Core Web Vitals, SEO/AEO/GEO, JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, Person, VideoObject) | LG §26–28; CLAUDE.md |
| Tempi, budget, KPI | Non indicati | `[DA FORNIRE]` |

## 2. Messaggi chiave

### 2.1 Le tre cose che il visitatore deve capire (LG §35)

| # | Messaggio | Dove lo dimostra il sito |
|---|---|---|
| 1 | ITnode rende gli spazi esplorabili digitalmente. | Hero e «nuovo modo di abitare il Web» (Home); confronto tour 360° / SIII; showcase «Entra. Esplora. Interagisci.» |
| 2 | ITnode usa questa tecnologia per valorizzare imprese e territori. | Benefici del SIII; Puglia Digitale (destination marketing, numeri, luoghi, perché aderire); Città Digitali (portale, video, come funziona) |
| 3 | SIII, Puglia Digitale e Città Digitali sono tre applicazioni concrete della stessa visione. | «I tre mondi» in Home (01–03); rimandi incrociati tra le tre pagine; campo «Mi interessa» del form |

### 2.2 Posizionamento in una frase

> **ITnode rende esplorabili online gli spazi reali di imprese, città e territori e li mette in rete su piattaforme territoriali proprie, Puglia Digitale e Città Digitali: una nuova infrastruttura digitale che connette imprese, cittadini e visitatori.** `[DA VERIFICARE «proprie» per Puglia Digitale: D1]`

- **Test dello scambio.** Se al posto di ITnode si mette una web agency o un fornitore di tour 360°, la frase non regge, perché manca la rete di portali territoriali. Se ci si mette un portale turistico, non regge nemmeno, perché manca la tecnologia per le imprese. Il differenziatore sta nella combinazione delle due cose, ma vale solo se ITnode gestisce davvero le piattaforme (D1, D5).
- **Il cambio di percezione (LG §02, §07):** da «chi realizza siti web» a «chi costruisce spazi digitali da esplorare e la rete che li collega».
- È una frase di posizionamento, non una tagline: la formulazione pubblica la scrive `copywriter-brand`.

### 2.3 Come si relazionano ITnode, SIII, Puglia Digitale e Città Digitali

**Verdetto.** La lettura «SIII come prodotto per le imprese, Puglia Digitale e Città Digitali come piattaforme territoriali» è **coerente con le LG**. Lo confermano tre passaggi: §07 li chiama «due progetti di digitalizzazione territoriale»; §10 dice che il SIII replica gli spazi dell'impresa; §17 dice che Città Digitali include i Siti Interattivi Immersivi. Servono però tre precisazioni.

1. **In Home i tre mondi sono alla pari.** LG §08 e §35 li presentano come tre capitoli numerati e come «tre applicazioni della stessa visione». La distinzione tra prodotto e piattaforma serve all'architettura dell'offerta e ai testi delle singole pagine, non a una gerarchia visiva.
2. **Anche le piattaforme vendono alle imprese.** Oltre al pubblico di visitatori, sia Puglia Digitale sia Città Digitali propongono un'adesione alle imprese: «Porta la tua impresa dentro Puglia Digitale» (§16) ed «Entra in Città Digitali» (§21).
3. **I SIII vivono dentro i portali.** Le tre esperienze dello showcase sono pubblicate su portali città (cassanodigitale.it, monopolidigitale.it, acquavivadigitale.com, §12). Il SIII è lo spazio dell'impresa; la piattaforma è la «città» in cui lo si trova. `[DA VERIFICARE: un SIII può stare anche sul dominio dell'impresa? D4]`

Nota: Puglia Digitale e Città Digitali condividono lo stesso simbolo (la «C» blu con la forma arancione). Formano una famiglia di marchi distinta dal logotipo ITnode.

**Modello proposto** `[IPOTESI da validare con D1, D4, D5]`

| Livello | Entità | Che cos'è | Scala | Per chi (principale) | Promessa (LG) | Azione |
|---|---|---|---|---|---|---|
| Marca madre | ITnode | L'azienda, la tecnologia e la visione: rendere esplorabili gli spazi reali | — | Tutti | «ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.» (§07) | Parliamone / Contattaci |
| 01 · Prodotto | SIII | Il sito dell'impresa trasformato in uno spazio navigabile, con funzioni commerciali | Un'impresa | Imprese e attività | «Non raccontare la tua azienda. Falla esplorare.» (§10) | Richiedi un'offerta |
| 02 · Piattaforma | Puglia Digitale | Piattaforma regionale di destination marketing: città, borghi e imprese della Puglia in esperienze immersive | Un territorio | Visitatori; imprese ed enti pugliesi | «Dalla costa all’entroterra. Un territorio da esplorare.» (§13) | Visita il portale · Contattaci |
| 03 · Piattaforma | Città Digitali | Rete e portale nazionale che porta online le attività delle città italiane | Una rete di città | Imprese e attività; visitatori | «Le attività del territorio, online senza perdere radici.» (§17) | Visita il portale · Entra in Città Digitali |

- **Filo narrativo per la Home** `[PROPOSTA per creative-director e copywriter-brand]`: dalla singola impresa al territorio fino alla rete di città. Non va implicata una copertura nazionale completa: le città si nominano sempre (N12).
- **Motivo ricorrente:** la curiosità apre la Home («La curiosità ci accompagna da sempre», §07) e torna nella sezione del fondatore («E ancora la stessa curiosità», §09). Lega marca e fondatore; va usata come filo del racconto, non come claim.
- **Sovrapposizione chiarita (conferma dell'utente del 2026-10-06).** Le città di Puglia Digitale sono le 31 città pugliesi dell'elenco di Città Digitali (`docs/strategia/citta-digitali-elenco.md`). In Puglia una città appartiene quindi a entrambi i mondi. Altamura (LG §18, sotto Città Digitali) e Acquaviva, Gravina e Monopoli (LG §15, sotto Puglia Digitale) sono tutte nell'elenco. Il resto di D5 (origine, franchising) è ancora aperto.

### 2.4 Gerarchia dei messaggi per pagina

I testi tra «» sono delle LG. Le note rimandano al registro (sezione 5).

**Home (LG §07–09)**

| Livello | Messaggio | Note |
|---|---|---|
| H1 | «La tecnologia cambia. La curiosità ci accompagna da sempre.» | Hero che respira, senza paragrafi |
| 2 | «ITnode nasce dall’idea di creare un nuovo modo di abitare il Web.» | Frase di massima importanza (§07) |
| 3 | «ITnode ha creato Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale che portano online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.» → «Una nuova infrastruttura digitale per connettere imprese, cittadini e visitatori.» | «ha creato» `[DA VERIFICARE]` (A1). Versione provvisoria fino a D1: «Con Città Digitali e Puglia Digitale, ITnode porta online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.» |
| 4 | I tre mondi: 01 SIII «Spazi reali. Esperienze digitali.» · 02 Puglia Digitale «Un territorio. Migliaia di storie.» · 03 Città Digitali «Le attività del territorio, online senza perdere radici.» | CTA: «Esplora SIII →», «Scopri Puglia Digitale →», «Esplora Città Digitali →». Capitolo 01: dal 2026-10-08 la schermata del SIII de La Tana di Aldo da desktop (richiesta dell'utente); il nome è solo nell'alt. A7, A8 |
| 5 | Fondatore: «36 anni dentro l’innovazione. E ancora la stessa curiosità.» → timeline → «È questo il futuro che mi appassiona e che stiamo costruendo giorno dopo giorno.» | Testo di base `[DA FORNIRE]`; N4, N5, F1–F7, sezione 6 |
| CTA | «Parliamone» oppure «Contattaci» | La scelta spetta a cro-specialist |

**SIII (LG §10–12)**

| Livello | Messaggio | Note |
|---|---|---|
| H1 | «SIII» · «Siti Interattivi Immersivi» | Scioglimento della sigla: D3 |
| Statement | «Non raccontare la tua azienda. Falla esplorare.» | |
| Visual | Schermata di un SIII da smartphone: dal 2026-10-08 il negozio YES (richiesta dell'utente) | Il testo non nomina l'impresa: il nome è solo nell'alt. A7, A8 |
| 2 | Il SIII replica digitalmente gli spazi fisici dell'impresa: un ambiente navigabile da desktop e smartphone. | |
| 3 | Differenza tra tour 360° e Sito Interattivo Immersivo; cosa si può fare: esplorare gli ambienti, interagire con hotspot, vedere prodotti, guardare video, richiedere informazioni, prenotare servizi, accedere ad azioni commerciali. | Criteri del confronto `[DA FORNIRE]` (D4); N13 |
| 4 | Benefici: «Fiducia istantanea» · «Più coinvolgimento» · «Vendita diretta» · «Uno strumento commerciale sempre accessibile» | Solo in forma qualitativa (N6, N9, N13); testi `[DA FORNIRE]` |
| 5 | «Entra. Esplora. Interagisci.»: Masseria Santella, Maison Miminà, D.L. Natura Dentro → «Entra nell’esperienza →» (nuova scheda) | Schermate ricevute il 2026-10-07; A7 |
| Chiusura | «La tua azienda può diventare un’esperienza.» → «Richiedi un’offerta →» + form | |

**Puglia Digitale (LG §13–16)**

| Livello | Messaggio | Note |
|---|---|---|
| H1 | «Puglia Digitale» · «Una piattaforma interattiva immersiva per la valorizzazione territoriale.» | Carattere più territoriale ed emozionale rispetto a SIII (§13) |
| Concept | «Dalla costa all’entroterra. Un territorio da esplorare.» Progetto di destination marketing che digitalizza e valorizza città, borghi e imprese con esperienze immersive → «Visita il portale →» | Portale: lapugliadigitale.it, confermato dall'utente il 2026-10-05 (S7). Ruolo di ITnode `[DA VERIFICARE]` (D1) |
| Numeri | «30+ Città» · «~200.000 Partite IVA nei territori coinvolti» · «60% del tessuto produttivo pugliese» | Dati del cliente, con nota sulla fonte (N1–N3) |
| Luoghi | «I luoghi»: Acquaviva delle Fonti, Gravina in Puglia, Monopoli → «Esplora →» | Foto `[DA FORNIRE]` |
| Perché aderire | 01 «Aperti al mondo, 24/7» · 02 «Vendere attraverso l’esperienza» · 03 «La forza della rete» · 04 «Continuare la relazione oltre il viaggio» | Testi `[DA FORNIRE]` |
| Chiusura | «Porta la tua impresa dentro Puglia Digitale.» → «Contattaci →» + form | |

**Città Digitali (LG §17–21)**

| Livello | Messaggio | Note |
|---|---|---|
| H1 | «Città Digitali» · «Le attività del territorio, online senza perdere radici.» | |
| Sottotitolo | «Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano.» → «Visita il portale →» | Le LG scrivono «Siti Immersivi Interattivi»: da allineare (DR2) |
| 2 | «L’Italia in un unico portale.»: Varese, Altamura, Caltanissetta | Nominare sempre le città reali (N12) |
| 3 | Video Città Digitali a tutta larghezza o quasi a tutto schermo | File e poster `[DA FORNIRE]` (S8) |
| 4 | «Dal locale al nazionale.»: 01 «Distanze ridotte, fiducia immediata» · 02 «Maggiore coinvolgimento» · 03 «Visibilità digitale» · 04 «Differenziazione» · 05 «La forza di un portale ad alto traffico» | Forma qualitativa; «alto traffico» `[DA VERIFICARE]` (N8, N10); testi `[DA FORNIRE]` |
| Chiusura | «La tua azienda merita più di una presenza online. Merita di essere esplorata.» → «Entra in Città Digitali →» + form | |

**Contatti (LG §22–23):** H1 «Parliamo del prossimo spazio digitale.»; poi sede, telefoni, email, LinkedIn e portali (S3–S7) e il form, con la CTA «Invia richiesta».

## 3. Audience

Dedotte dalle LG. Dove si parla di dubbi e di processo decisionale si tratta di `[IPOTESI]` da validare.

| Segmento | Chi | Cosa cerca sul sito | Dubbi da sciogliere `[IPOTESI]` | Azione attesa | Pagine |
|---|---|---|---|---|---|
| **A. Imprese e attività** (primario) | PMI e attività locali, per esempio strutture ricettive come Masseria Santella (Cassano delle Murge); poi commercio, servizi, produzione | Cos'è un SIII e in cosa è diverso da un sito o da un tour 360°; esempi veri da provare; cosa ottiene l'impresa; perché entrare in un portale; costi, tempi, impegno richiesto | Costa troppo? Porta clienti? Serve solo al turismo? Chi lo aggiorna? | Richiesta di offerta o di contatto (form con «Mi interessa») | /siii, /citta-digitali, /puglia-digitale, /contatti |
| **B. Enti e territori** | Comuni (sindaco, assessori al turismo, alle attività produttive, all'innovazione), associazioni, consorzi turistici | Come si digitalizza una città o un borgo; esempi di portali; ruolo dell'ente; credibilità (fondatore, eventi) | Procedure di acquisto pubblico, costi, gestione dei contenuti nel tempo, affidabilità del fornitore | Contatto o incontro (form con «Nome Azienda / Ente») | /puglia-digitale, /citta-digitali, Home, /contatti |
| **C. Cittadini e visitatori** | Turisti che preparano un viaggio, residenti, curiosi | Esplorare luoghi e attività | — | Andare al portale o all'esperienza (link esterni) | Home (tre mondi), luoghi, showcase |
| **D. Potenziali affiliati Città Digitali** (da chiarire) | Imprenditori interessati al franchising: dato da fonti pubbliche, non presente nelle LG | Modello, esclusiva territoriale, investimento | — | `[DA DECIDERE]` (D5, DR5) | — |
| **E. Stampa, partner, istituzioni** (secondario) | Giornalisti, organizzatori di eventi, partner | Chi c'è dietro, i progetti, i contatti | — | Contatto, LinkedIn | Home (fondatore), /contatti |

- **Chi decide** `[IPOTESI]`: nelle piccole imprese decide il titolare, spesso da smartphone. Negli enti decidono più figure: chi promuove il progetto a livello politico e chi lo acquista (dirigente o RUP), con i tempi e i vincoli delle procedure. Non sappiamo ancora se i Comuni siano clienti o partner (D8).
- **Da segnalare a cro-specialist:** l'etichetta «Email aziendale *» (LG §23) può scoraggiare le microimprese che usano un indirizzo personale.

## 4. Glossario delle entità

| Entità (grafia ufficiale) | Definizione | Varianti e regole d'uso | Fonte |
|---|---|---|---|
| **ITnode** | Società che progetta esperienze digitali immersive e piattaforme di digitalizzazione territoriale. Ha sede ad Acquaviva delle Fonti (BA). | Nei testi si scrive sempre «ITnode». Varianti trovate: «itNode» (logotipo: resta com'è, ma non si riproduce nel testo), «ItNode» (title del sito attuale), «ITNode Srl» (LinkedIn e contatti di Città Digitali). Proposta in DR1. | LG, uso costante; logo; ricerche web |
| **ITNODE S.r.l.** | Ragione sociale. | Solo nei contesti legali: footer, privacy e cookie policy, `legalName` nel JSON-LD. Grafia esatta da visura `[DA VERIFICARE]`. | ufficiocamerale.it |
| **SIII** · Sito Interattivo Immersivo (plurale: Siti Interattivi Immersivi) | Il sito di un'impresa trasformato in un ambiente navigabile, da desktop e smartphone, che replica gli spazi fisici. Include hotspot, prodotti, video, richieste di informazioni, prenotazioni e azioni commerciali. | Genere maschile: «il SIII», «i SIII» (§10). Alla prima occorrenza in ogni pagina: «SIII – Sito Interattivo Immersivo». L'ordine corretto è «Interattivo Immersivo» (premessa, §10, §26); in §17 le LG scrivono «Siti Immersivi Interattivi», da allineare (DR2). **La sigla ha tre «I», ma lo scioglimento ne spiega due:** manca il significato della terza `[DA FORNIRE]` (D3). | LG premessa, §10, §17, §26 |
| **Tour Virtuale Interattivo Immersivo** | La tecnologia con cui ITnode porta online luoghi, imprese e attività: un tour navigabile arricchito da elementi interattivi. | Rapporto con il SIII `[IPOTESI: il tour è l'ambiente navigabile; il SIII aggiunge contenuti e funzioni commerciali]` (D4). Varianti per la SEO, da usare in modo descrittivo e non come nomi di prodotto: «tour virtuale interattivo», «tour virtuale 3D» (§26). «3D» solo se la tecnologia lo è davvero (D4). | LG §07, §26 |
| **tour 360°** | Categoria generica: immagini panoramiche a 360° da navigare, con interazione limitata. È il termine di confronto per spiegare il SIII, non un prodotto ITnode. | Minuscolo nel testo; «360°» senza spazio. | LG §10 |
| **hotspot** | Punto interattivo dentro l'ambiente che apre un contenuto o un'azione (scheda prodotto, video, richiesta). | Minuscolo e invariabile. | LG §10 |
| **Puglia Digitale** | Piattaforma interattiva immersiva di destination marketing per valorizzare il territorio pugliese: digitalizza città, borghi e imprese con esperienze immersive. Portale: lapugliadigitale.it (LG §22), confermato dall'utente il 2026-10-05. | Per le omonimie vedi la tabella sotto. Il marchio porta il simbolo ® sulla foto dell'evento: registrazione `[DA VERIFICARE]` (A5). | LG §07, §13, §22; utente, 2026-10-05 |
| **Città Digitali** | Rete e portale nazionale che porta online le attività imprenditoriali e commerciali delle città italiane con tour virtuali, SIII e strumenti digitali («L’Italia in un unico portale»). | Sempre «Città Digitali»: accento, due maiuscole, plurale. Portale: **cittàdigitali.it**, con l'accento; nei link si scrive in punycode, `xn--cittdigitali-19a.it`. Le LG (§22) scrivono «www.cittadigitali.it», che non è del cliente (conferma dell'utente del 2026-10-05; vedi omonimie e S7). Simbolo ®: `[DA VERIFICARE]` (A5). | LG §17–18, §22; ricerche web; utente, 2026-10-05 |
| **portale città** (per esempio «Acquaviva Digitale») | Il portale di una singola città della rete: luoghi, attività, esperienze. | Grafia dei nomi dei portali `[DA VERIFICARE]`. I domini alternano .it e .com: si usano esattamente come nelle LG. | LG §12, §15, §18 |
| **digitalizzazione territoriale** | Portare online, in forma esplorabile, i luoghi, le imprese e le attività di un territorio. | Minuscolo. | LG premessa, §07 |
| **destination marketing** | Promozione di una destinazione per attrarre visitatori. Per ITnode è la funzione di Puglia Digitale. | Le LG scrivono «Destination Marketing». Proposta: minuscolo nel testo corrente, maiuscole solo nei titoli (DR2). | LG §13, §26 |
| **abitare il Web** | Idea fondativa: «trasferire online tutte le realtà produttive, professionali e commerciali di un territorio». | «Web» con la maiuscola, come nelle LG. Il concetto compare già nei progetti precedenti del fondatore: è un tema coerente e di lungo periodo. | LG §07; lecittadigitali.it |
| **esperienze immersive per aziende** | Termine descrittivo usato nelle ricerche, non un nome di prodotto. | — | LG §26 |
| **Fondatore** | Giacomo Lenoci `[DA VERIFICARE nome e ruolo da indicare]` | Le LG non lo nominano: riportano solo l'URL del suo profilo LinkedIn (§22). | LG §09, §22; ricerche web |

**Omonimie ed entità esterne**

| Nome | Che cos'è | Regola |
|---|---|---|
| puglia-digitale.it · Associazione culturale Campo&Controcampo | Portale di tour virtuali delle città pugliesi, con contributo e patrocinio del Consiglio regionale | Non citarlo né linkarlo. Il portale di Puglia Digitale del cliente è lapugliadigitale.it (conferma dell'utente del 2026-10-05). Resta aperto il rapporto tra i due progetti (D1, A1) |
| «Puglia Digitale», «PugliaDigitale2030» (Regione Puglia) | Programmi regionali per la trasformazione digitale | Non suggerire mai un legame istituzionale (anche per la SEO: stessa query) |
| «Città Digitale», cittadigitale.it | Un altro operatore, che fa siti per i Comuni | Scrivere sempre «Città Digitali», al plurale |
| «CITTA' DIGITALI», cittadigitali.it (senza accento) | Progetto di altri, indicizzato con Biella, Lecce, Salerno, Trento e Treviso. Il 2026-10-05 il dominio non si risolveva | Non è del cliente (conferma dell'utente del 2026-10-05), anche se le LG §22 lo indicano. Non citarlo né linkarlo: il portale è cittàdigitali.it |
| «Le Città Digitali», lecittadigitali.it | Iniziativa precedente di iComm Lab e Leadstone | Solo come riferimento storico (D5) |
| iComm Lab, Leadstone, MyComm, IBM | Tappe del percorso del fondatore | Solo nella timeline, senza loghi di terzi |

## 5. Registro dei fatti e dei claim

Gli stati possibili sono tre:
- **Utilizzabile:** dato del cliente; si usa come fornito, alle condizioni indicate.
- **Da verificare:** serve una conferma o una fonte prima di pubblicare.
- **Non utilizzabile:** non si usa come claim; al suo posto va la forma qualitativa indicata.

Le regole di riferimento sono la soglia 1 di CLAUDE.md e LG §11, §14, §20. Per la comunicazione rivolta alle imprese vale anche la disciplina sulla pubblicità ingannevole (D.Lgs. 145/2007).

**Numeri e risultati**

| ID | Claim | Fonte | Stato | Formulazione consigliata e condizioni |
|---|---|---|---|---|
| N1 | «30+ Città» | LG §14; elenco e perimetro: utente, 2026-10-06 | Utilizzabile; manca la data | «30+ città», con la nota «Dati ITnode, aggiornati a [mese anno]».<br>**Elenco e perimetro:** le 31 città pugliesi dell'elenco di Città Digitali (`docs/strategia/citta-digitali-elenco.md`), confermate dall'utente il 2026-10-06; l'utente aveva prima scritto «forse sono 32». San Cataldo è in provincia di Caltanissetta e non conta.<br>**Data dei dati:** `[DA FORNIRE]`. Proposta: «ottobre 2026», cioè l'elenco consultato il 2026-10-05 e confermato il 2026-10-06; serve l'accordo dell'utente o del cliente.<br>I 16 comuni di luglio 2025 (26 previsti per fine 2025, bariseranews.it) sono il perimetro di puglia-digitale.it, il progetto dell'associazione: non si usano. |
| N2 | «~200.000 Partite IVA nei territori coinvolti» | LG §14 | Utilizzabile, con fonte | «~200.000 partite IVA operano nei territori coinvolti». Deve essere chiaro che si tratta del bacino economico dei territori, **non delle imprese presenti sulla piattaforma**. `[DA FORNIRE: fonte, anno, definizione]` |
| N3 | «60% del tessuto produttivo pugliese» | LG §14 | Utilizzabile, con fonte | Valgono le condizioni di N2. Verifica di coerenza: se 200.000 corrisponde al 60%, la base è circa 333.000. È un ordine di grandezza compatibile con le imprese pugliesi attive: le registrate erano 373.787 al 31/12/2025 secondo Movimprese. Non torna invece se la base sono tutte le partite IVA. Serve la definizione. |
| N4 | «36 anni dentro l’innovazione» | LG §09 | Utilizzabile | Presuppone un inizio nel 1990 `[DA VERIFICARE]`. Il numero invecchia: va calcolato dall'anno di inizio oppure aggiornato ogni anno. |
| N5 | «10.000+ clienti» | LG §09 | Utilizzabile solo nel percorso del fondatore | «Oltre 10.000 clienti nelle aziende fondate e guidate da [nome] prima di ITnode» `[DA VERIFICARE: quali aziende, quale periodo, come sono contati]`. **Mai attribuirlo a ITnode** e mai accostarlo al logo o ai prodotti ITnode. |
| N6 | «5–10 volte più tempo» | LG §11 | Non utilizzabile | Forma qualitativa: «Più coinvolgimento: chi visita non scorre una pagina, esplora uno spazio.» Il layout si predispone per il dato nel caso arrivi una fonte (analytics con metrica, periodo e termine di confronto). |
| N7 | «4 volte» | LG §20 | Non utilizzabile | Non sappiamo a cosa si riferisca. `[DA FORNIRE: testo originale e fonte]` (D7) |
| N8 | «250.000 visite mensili» | LG §20 | Non utilizzabile finché non è documentato | Serve un export degli analytics con portale, metrica (visite, sessioni o utenti) e periodo. Se documentato: «Oltre 250.000 visite al mese su [portale] (media [periodo], fonte [strumento])». |
| N9 | «migliore posizionamento Google» | LG §11 | Non utilizzabile | Nessuno può garantire un posizionamento, quindi niente promesse SEO. Forma qualitativa: «Una presenza online più ricca e riconoscibile.» |
| N10 | «La forza di un portale ad alto traffico» (titolo del punto 05) | LG §20 | Da verificare | Dipende da N8. Senza dati: «La forza di un portale nazionale» `[PROPOSTA]`. |
| N11 | «Migliaia di storie» | LG §08 | Utilizzabile | Frase evocativa riferita al territorio, non al numero di contenuti del portale. |
| N12 | «L’Italia in un unico portale.» | LG §18 | Utilizzabile (titolo) | Va sempre accompagnato dalle città realmente presenti, senza lasciar intendere che sia coperta tutta l'Italia. |
| N13 | Funzioni del SIII (§10) e «Vendita diretta» (§11) | LG §10–11 | Utilizzabile; «Vendita diretta» da verificare | Va verificato se acquisto e prenotazione avvengono dentro il SIII o su sistemi esterni, e quali funzioni sono opzionali. |

**Percorso del fondatore**

| ID | Claim | Fonte | Stato | Formulazione consigliata e condizioni |
|---|---|---|---|---|
| F1 | IBM | LG §09 | Da verificare | Ruolo e anni `[DA FORNIRE]`; non abbiamo trovato riscontri pubblici. Solo testo, niente logo IBM (marchio di terzi). |
| F2 | «anni ’90», «prima azienda» | LG §09 | Da verificare | Nome e anno di fondazione della prima azienda. |
| F3 | «2002» | LG §09 | Da verificare | A quale tappa si riferisce: prima azienda o MyComm? |
| F4 | MyComm | LG §09 | Da verificare | Nessun riscontro pubblico trovato. Grafia e attività `[DA FORNIRE]`. |
| F5 | IcommLab | LG §09 | Da verificare (grafia) | Le fonti pubbliche scrivono «iComm Lab» (LinkedIn, Città Digitali) e «iCommLab» (sito). Come anno di fondazione compaiono sia il 2015 (icommlab.com) sia il 2016 (portali di franchising). |
| F6 | Leadstone | LG §09 | Da verificare (anno) | Piattaforma di e-commerce e marketing di iComm Lab, lanciata intorno a ottobre 2020 (blog iComm Lab). Non va ripreso il suo claim «prima stazione digitale». |
| F7 | Giacomo Lenoci, CEO di ITnode | Titolo del profilo LinkedIn; URL in LG §22 | Da verificare | Formulazione da confermare: «Giacomo Lenoci, fondatore di ITnode», con il ruolo. Serve anche per il JSON-LD Person. |

**Attribuzioni, riconoscimenti, materiali**

| ID | Claim | Fonte | Stato | Formulazione consigliata e condizioni |
|---|---|---|---|---|
| A1 | «ITnode ha creato Città Digitali e Puglia Digitale» | LG §07 | Da verificare | Secondo le fonti pubbliche Puglia Digitale (puglia-digitale.it) è stato «creato dall'associazione Campo e controcampo», mentre Città Digitali «nasce dalla visione di Giacomo Lenoci, CEO di iComm Lab». Fino alla risposta a D1 si usa la versione provvisoria indicata in 2.4. Se i ruoli risultano distinti, una formulazione possibile è «realizzato con la tecnologia ITnode». |
| A2 | Patrocinio della Presidenza del Consiglio regionale della Puglia | consiglio.puglia.it; cittàdigitali.it/chi-siamo; bariseranews.it | Non utilizzabile (per ora) | Le fonti lo collegano all'associazione Campo&Controcampo e al portale puglia-digitale.it (contributo, cofinanziamento, uso del logo). La pagina «Chi siamo» di Città Digitali lo cita invece per Città Digitali, insieme a «8 comuni». Serve l'atto con beneficiario, iniziativa e periodo. Se confermato: «[Progetto] ha ricevuto il patrocinio della Presidenza del Consiglio regionale della Puglia ([anno])»; il logo solo con autorizzazione. |
| A3 | Partnership tra BariExperience.com e Puglia Digitale | bariexperience.com (articolo del 23/07/2026, da snippet) | Da verificare | Può essere una prova di terzi per il destination marketing, ma prima va capito se riguarda il Puglia Digitale di ITnode. |
| A4 | Evento «Puglia Digitale · Evento regionale digitale · Puglia» | Foto negli asset | Utilizzabile come immagine; dettagli `[DA FORNIRE]` | Didascalia solo con data e luogo confermati; nessun numero di partecipanti se non documentato. In platea ci sono persone riconoscibili: vanno verificate liberatorie o informativa dell'evento, altrimenti si ritaglia. |
| A5 | Simbolo ® sui marchi Puglia Digitale e Città Digitali | Loghi nelle foto | Da verificare | Il ® si usa nei testi solo se abbiamo il numero di registrazione. |
| A6 | Payoff «Digital Innovation for the Territory» (foto dell'evento) e «La trasformazione digitale per città, imprese e persone» (immagini AI) | Asset | Da verificare | Sono payoff ufficiali? Finché non lo sappiamo, non si usano. |
| A7 | Schermate e nomi delle imprese nel sito: Masseria Santella, Maison Miminà, D.L. Natura Dentro (esempi di `/siii/`); YES (hero di `/siii/`) e La Tana di Aldo (Home, capitolo 01), tutte e due dal 2026-10-08 | LG §12; utente, 2026-10-08 | Utilizzabile in anteprima; al go-live solo con il consenso | Serve il consenso scritto di ogni impresa a comparire con nome, logo e schermate, registrato nella tabella qui sotto con data e forma (ADR 002 §3.1; testo della richiesta nel §3.2). Vanno confermati anche i nomi ufficiali. Nome, luogo e link delle schede degli esempi restano anche senza consenso (LG §12). |
| A8 | I SIII di YES e de La Tana di Aldo li ha realizzati ITnode | Utente, 2026-10-08.<br>**YES:** «scusami usa questa non quella», dopo aver scritto, per un'altra schermata, «usa questa come immagine iniziale della sezione SIII».<br>**La Tana di Aldo**, con la vista desktop e quella da smartphone: «questo è per la home la sezione SII, quella orizzontale, poi nel caso avessi bisogno della versione mobile ce l hai» | Da verificare | Nessun testo visibile lo dice. Lo presuppongono la hero della pagina che vende il SIII e il capitolo 01 della Home; l'alt della Home lo scrive («Il SIII de La Tana di Aldo»).<br>Si chiude impresa per impresa, con il consenso (il testo dell'ADR 002 §3.2 lo dichiara) o con una riga dell'utente.<br>«YES» e «La Tana di Aldo» sono le letture dei loghi; quello di YES dice anche «pure design 100% flowers». Per tutte e due: nome ufficiale, comune e provincia `[DA FORNIRE]`; indirizzo dell'esperienza `[DA FORNIRE, se è online]`.<br>In rete nessun riscontro (sezione 8). |

**Consensi delle imprese (A7)**

Si aggiorna a ogni conferma dell'utente, con data e forma (ADR 002 §3.1). Il controllo di go-live è impresa per impresa dal commit a5dac14: a ogni conferma registrata qui, la sessione principale mette a `true` la chiave dell'impresa in `SHOWCASE_CONSENT`.

| Impresa | Dove nel sito | Chiave nel controllo | Consenso | Data e forma |
|---|---|---|---|---|
| Masseria Santella | `/siii/`, primo esempio | `masseria-santella` | Non ricevuto | — |
| Maison Miminà | `/siii/`, secondo esempio | `maison-mimina` | Non ricevuto | — |
| D.L. Natura Dentro | `/siii/`, terzo esempio | `dielle` | Non ricevuto | — |
| YES | `/siii/`, hero | `yes` | Non ricevuto | — |
| La Tana di Aldo | Home, capitolo 01 | `la-tana-di-aldo` | Non ricevuto | — |

**Dati societari e contatti** (obbligatori nel footer: soglia 5 di CLAUDE.md)

| ID | Dato | Fonte | Stato | Uso e condizioni |
|---|---|---|---|---|
| S1 | Ragione sociale: ITNODE S.r.l. | ufficiocamerale.it, atoka.io | Da verificare (visura) | Footer, privacy, JSON-LD |
| S2 | P.IVA 08937270729 | ufficiocamerale.it, atoka.io | Da verificare (visura) | Footer |
| S3 | Sede legale: Via Sant'Anna 34, 70021 Acquaviva delle Fonti (BA) | ufficiocamerale.it | Da verificare | Le LG (§22) indicano lo stesso indirizzo come «Sede Operativa». Se coincidono: «Sede legale e operativa». |
| S4 | REA, capitale sociale versato, PEC | PEC «itnode@pec.it» secondo ufficiocamerale.it e la pagina «Dati aziendali» di cittàdigitali.it; REA «BA-660035» dalla stessa pagina (WebSearch, 2026-10-05) | REA e PEC: da verificare (visura). Capitale sociale: `[DA FORNIRE]` | Obbligatori. La pagina del cliente riporta anche la P.IVA 08937270729, che coincide con S2 |
| S5 | Tel. +39 080 2466520 · Mobile +39 335 1229785 · info@itnode.it | LG §22 | Utilizzabile | Altri indirizzi trovati online (g.lenoci@, contatti@itnode.it) non si usano senza indicazione del cliente. |
| S6 | LinkedIn: https://www.linkedin.com/in/giacomo-lenoci/ | LG §22 | Utilizzabile | È un profilo personale: va etichettato come tale. Esiste una pagina aziendale? `[DA FORNIRE]` |
| S7 | Portali e URL (cittàdigitali.it, lapugliadigitale.it, portali città, esperienze) | LG §12, §15, §18, §22; conferma dell'utente del 2026-10-05 | Città Digitali e Puglia Digitale: confermati. Portali delle città ed esperienze: utilizzabili, link da verificare | **Città Digitali:** il portale del cliente è **cittàdigitali.it**, con l'accento, che nei link si scrive `https://xn--cittdigitali-19a.it`. «www.cittadigitali.it» delle LG §22 non è del cliente (conferma dell'utente del 2026-10-05): il 2026-10-05 non si risolveva ed era indicizzato come un progetto omonimo. Il sito è corretto (commit eb691ee); seo-technical verifica la parte tecnica. Elenco delle città: `docs/strategia/citta-digitali-elenco.md`. **Puglia Digitale:** il portale è **lapugliadigitale.it**, confermato dall'utente il 2026-10-05; il sito usa già `https://www.lapugliadigitale.it` (LG §22). puglia-digitale.it è il portale dell'associazione Campo&Controcampo (vedi omonimie). Resta aperto il ruolo di ITnode (D1, A1). **Portali delle singole città** (varesedigitale.it e gli altri, LG §12, §15, §18) **ed esperienze:** la domanda all'utente è ancora senza risposta. Non sono raggiungibili dal nostro ambiente: i link si controllano in QA. |
| S8 | Video: https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2 | LG §19 | Utilizzabile; hosting da verificare | Sta su un dominio di staging di terzi: chiedere il file per ospitarlo insieme al sito. |

**Claim trovati online, assenti dalle LG: da non riprendere**

| ID | Claim | Fonte | Stato |
|---|---|---|---|
| X1 | «Format registrato unico e non replicabile in Italia», «rientro in 30 giorni», «mercato da 1,6 miliardi di euro l'anno» | Portali di franchising di Città Digitali | Non utilizzabile |
| X2 | «Prima stazione digitale italiana» (Leadstone), «top player» (iComm Lab) | leadstone.it, icommlab.com | Non utilizzabile |

## 6. Timeline del fondatore

Contiene solo gli elementi delle LG (§09), nell'ordine più probabile. Gli indizi pubblici servono solo ad aiutare il cliente a rispondere.

| # | Tappa (LG) | Lettura più probabile `[IPOTESI]` | Domanda per il cliente |
|---|---|---|---|
| 1 | IBM · anni ’90 | Il percorso inizia in IBM nei primi anni '90 (1990, se «36 anni» vale per il 2026) | In che anno e con quale ruolo? |
| 2 | Prima azienda | Prima impresa fondata dopo IBM | Come si chiamava e quando è nata? Coincide con MyComm? |
| 3 | 2002 · MyComm | 2002 è l'anno di nascita di MyComm | «2002» si riferisce a MyComm o alla prima azienda? Di cosa si occupava MyComm? |
| 4 | IcommLab | Tappa successiva (secondo le fonti pubbliche: iComm Lab, 2015 o 2016) | Anno e grafia corretta? |
| 5 | Leadstone | Piattaforma nata dentro iComm Lab (secondo le fonti pubbliche: 2020) | Anno? È un prodotto di iComm Lab o un'azienda autonoma? |
| 6 | 10.000+ clienti | Totale accumulato nel percorso prima di ITnode | Di quali aziende, in che periodo, contati come? |
| 7 | Oggi · ITnode | Nascita di ITnode | In che anno nasce ITnode? |
| 8 | Puglia Digitale | Progetto di ITnode | Anno di avvio e ruolo di ITnode (D1)? |
| 9 | Città Digitali | Progetto di ITnode | Le fonti pubbliche la fanno nascere prima, come «Le Città Digitali» di iComm Lab/Leadstone: è così? Quando passa a ITnode? L'ordine delle tappe 8 e 9 va confermato. |
| — | Chiusura | «È questo il futuro che mi appassiona e che stiamo costruendo giorno dopo giorno.» (citazione in prima persona) | Ci inviate il testo narrativo citato in LG §09? `[DA FORNIRE]` |

## 7. Materiali mancanti (in ordine di priorità)

P1 blocca le pagine; P2 incide sulla credibilità; P3 è un miglioramento.

| Pr. | Materiale | Uso nel sito | Note |
|---|---|---|---|
| P1 | Testi originali: racconto del fondatore, benefici del SIII, motivi per aderire a Puglia Digitale, «come funziona» di Città Digitali | Home (fondatore), /siii, /puglia-digitale, /citta-digitali | Le LG li citano come forniti, ma nel repository non ci sono |
| P1 | Dati societari: denominazione esatta, REA, capitale sociale versato, PEC; conferma della sede legale | Footer, privacy e cookie policy, JSON-LD Organization | Obbligatori |
| P1 | Testi (o dati) per privacy e cookie policy: titolare, finalità, destinatari, strumenti di analisi, terze parti (video, eventuali embed) | /privacy-policy, /cookie-policy, consensi del form | Dal cliente o da un consulente legale |
| P1 | Destinatario e sistema di ricezione del form (email, CRM, servizio) | Form su quattro pagine | LG §23: niente invio simulato senza endpoint |
| P1 | Schermate delle esperienze SIII | Home, capitolo 01; /siii, hero ed esempi | **Ricevute:** le tre degli esempi il 2026-10-07; il 2026-10-08 YES per la hero e La Tana di Aldo per il capitolo 01 della Home (vista desktop, in uso, e vista da smartphone) |
| P1 | Foto dei luoghi con diritti d'uso: Acquaviva delle Fonti, Gravina in Puglia, Monopoli; Varese, Altamura, Caltanissetta | «I luoghi» in /puglia-digitale; «L’Italia in un unico portale» in /citta-digitali | Ideali i fotogrammi dei tour: sono insieme immagine e prova |
| P1 | Immagini della Puglia (costa, entroterra, borghi) con diritti d'uso | Hero e concept di /puglia-digitale | Niente stock (LG §31) |
| P1 | Marchi Puglia Digitale e Città Digitali in vettoriale (SVG) con le regole d'uso | Tre mondi, pagine, footer | |
| P1 | Logo ITnode in vettoriale (SVG), versione positiva e negativa | Header, footer, favicon, Open Graph | Quello attuale è un raster piccolo |
| P1 | Ritratto reale del fondatore, oppure la conferma d'uso delle immagini attuali | Sezione fondatore, JSON-LD Person | DR3 |
| P2 | Originale della foto dell'evento, senza cornice, logo e firma; data e luogo | Home, Puglia Digitale | A4 |
| P2 | File del video Città Digitali, fotogramma per il poster, sottotitoli se c'è parlato | /citta-digitali (VideoObject) | S8; i sottotitoli servono all'accessibilità |
| P2 | Fonti dei numeri: data per «30+»; fonte, anno e definizione per «~200.000» e «60%». L'elenco delle città c'è (31 città pugliesi, conferma dell'utente del 2026-10-06) | Sezione numeri di /puglia-digitale | N1–N3 |
| P2 | Atto di patrocinio e autorizzazione all'uso del logo | Eventuale fascia di fiducia | A2 |
| P2 | Consenso scritto di ogni impresa di cui il sito mostra le schermate, e nomi ufficiali. Per YES e La Tana di Aldo anche: chi ha realizzato il SIII, comune e provincia, indirizzo dell'esperienza | /siii (hero ed esempi), Home (capitolo 01) | A7, A8. Senza consenso, al go-live si applicano le riserve dell'ADR 002 §3.1 |
| P3 | Dati analytics per «5–10 volte», «4 volte», «250.000 visite mensili» | Layout dei numeri già predisposto | Solo se il cliente vuole mostrarli |
| P3 | URL incorporabili delle esperienze, se i portali permettono l'embed | Anteprime immersive dello showcase | Da valutare con web-performance-specialist |
| P3 | Brevi clip dei tour, senza audio | Hero e momenti di motion | Alternativa reale alle immagini AI |
| P3 | Pagina LinkedIn aziendale e altri profili ufficiali | Footer, `sameAs` nel JSON-LD | |
| P3 | Numeri di registrazione dei marchi | Uso del simbolo ® | A5 |

## 8. Fonti web consultate (2026-09-28)

**Limiti.** I domini seguenti sono bloccati dal nostro ambiente, quindi le pagine non sono state aperte: aprildunford.com, itnode.it, tutti i portali (*digitale.it/.com, cittadigitali.it, lapugliadigitale.it), railway.app, LinkedIn, consiglio.puglia.it, giacomolenoci.it, leccesette.it, ttgitalia.com. Le informazioni riportate vengono dagli snippet dei risultati di ricerca e restano `[DA VERIFICARE]` finché il cliente non le conferma o non si controlla la pagina.

| URL | Cosa riporta |
|---|---|
| https://www.ufficiocamerale.it/2699/itnode-srl | ITNODE S.R.L., P.IVA 08937270729, Via Sant'Anna 34, Acquaviva delle Fonti; produzione di software; PEC |
| https://atoka.io/public/it/azienda/itnode-srl/f13b20496969 | Dati societari di Itnode Srl |
| https://www.consiglio.puglia.it/-/tour-virtuali-delle-citt%C3%A0-pugliesi | Puglia Digitale (puglia-digitale.it) creato dall'associazione Campo e controcampo con il contributo del Consiglio regionale; 8 comuni nella prima fase |
| https://bariseranews.it/2025/07/08/gravina-nella-rete-del-turismo-virtuale-e-immersivo/ | Progetto dell'associazione Campo&Controcampo, patrocinato e cofinanziato; 16 comuni, 26 previsti per fine 2025, tra cui Gravina |
| https://www.gravinalife.it/notizie/puglia-digitale-gravina-nella-rete-del-turismo-virtuale-e-immersivo | Stesso contenuto |
| https://xn--cittdigitali-19a.it/chi-siamo/ | Città Digitali nasce dalla visione di Giacomo Lenoci (CEO di iComm Lab); cita il patrocinio e 8 comuni; contatti di ITNode Srl |
| https://xn--cittdigitali-19a.it/franchising/ · https://www.infofranchising.it/citta-digitali-franchising-pubblicita-aziende/ · https://www.aprireinfranchising.it/citta-digitali-franchising-pubblicita-aziende | Modello in franchising di Città Digitali; claim X1 |
| https://www.lecittadigitali.it/iniziativa | «Le Città Digitali» di iComm Lab tramite Leadstone; il concetto di «abitare il Web» |
| https://www.icommlab.com/about-us/ | iComm Lab, CEO Giacomo Lenoci, fondata nel 2015 |
| https://blog.icommlab.com/leadstone-e-commerce-per-tutti/ | Lancio di Leadstone (2020) |
| https://it.linkedin.com/in/giacomo-lenoci | Titolo del profilo: CEO di ITNODE Srl |
| https://www.bariexperience.com/en/news-events/digital-tourism-destination-marketing-virutal-tour-bari-partnership-pugliadigitale-bariexperience/ | Partnership tra BariExperience.com e Puglia Digitale |
| https://www.regione.puglia.it/web/competitivita-e-innovazione/puglia-digitale | Omonimia: programma regionale «Puglia Digitale» |
| https://www.cittadigitale.it/ | Omonimia: «Città Digitale», siti per i Comuni |
| https://infocamere.it/movimprese/ | Movimprese: 373.787 imprese registrate in Puglia al 31/12/2025 (dato da snippet; fonte primaria da verificare) |
| https://www.agendadigitale.eu/sicurezza/art-50-ai-act-la-trasparenza-diventa-operativa-cosa-cambia-dal-2-agosto/ | AI Act, art. 50: dal 2 agosto 2026 l'obbligo di trasparenza sui deep fake spetta a chi usa il sistema (deployer) |
| https://masseria-santella.apuliahotelspage.com/en/ | Masseria Santella: struttura ricettiva a Cassano delle Murge |

**Ricerche del 2026-10-08 (A8).** Quattro ricerche (WebSearch) non hanno trovato né l'impresa del logo «YES · pure design 100% flowers» né la sua esperienza:
- `"YES" "pure design" "100% flowers" negozio`;
- `"Yes pure design" fiori`;
- `"yespuredesign" OR "yes pure design" OR "yes puredesign" flowers Puglia`;
- `YES fiori design negozio`, limitata a cittàdigitali.it, lapugliadigitale.it, acquavivadigitale.com, cassanodigitale.it e monopolidigitale.it.

Nessun risultato contiene il nome. Comune e indirizzo dell'esperienza restano `[DA FORNIRE]`.

**Ricerche del 2026-10-08 (A8, La Tana di Aldo).** Otto ricerche (WebSearch) non hanno trovato né l'impresa né la sua esperienza:
- `"La Tana di Aldo" ristorante Puglia`;
- `"latanadialdo" digitale tour virtuale`;
- `"Tana di Aldo" pizzeria OR ristorante OR braceria Bari`;
- `"La Tana di Aldo" facebook instagram`;
- `"La Tana di Aldo"`;
- `Tana di Aldo`, limitata a cittàdigitali.it, lapugliadigitale.it, acquavivadigitale.com, cassanodigitale.it e monopolidigitale.it;
- `"Tana di Aldo" Massafra` e `Tana di Aldo Massafra`, la seconda limitata a massafradigitale.it e cittàdigitali.it.

Le due ricerche su Massafra seguivano una pagina del portale restituita dalla ricerca precedente, che però non contiene il nome: non è una pista. Nessun risultato contiene il nome. Comune e indirizzo dell'esperienza restano `[DA FORNIRE]`.

## Ipotesi da validare

- I1. La conversione primaria è la richiesta tramite form; la visita ai portali è secondaria.
- I2. Il SIII è il prodotto; Puglia Digitale e Città Digitali sono piattaforme che propongono anche un'adesione alle imprese (modello in 2.3).
- I3. Il SIII è costruito su un Tour Virtuale Interattivo Immersivo ed è pubblicato su un portale città.
- I4. Le imprese sono il segmento primario. Gli enti sono un segmento di valore, con un processo d'acquisto diverso.
- I5. «36 anni» significa un percorso iniziato nel 1990; «2002» è l'anno di MyComm.
- I6. «~200.000» e «60%» si riferiscono ai territori delle 31 città di Puglia Digitale. Per «30+ città» non è più un'ipotesi: sono le 31 città pugliesi dell'elenco di Città Digitali (conferma dell'utente del 2026-10-06).
- I7. I quattro ritratti del fondatore sono generati o elaborati con AI. La foto dell'evento è reale, ma elaborata.
- A8 (registro). I SIII di YES e de La Tana di Aldo li ha realizzati ITnode: lo presuppongono le richieste dell'utente, che però non lo dicono.

## Domande aperte

Per il cliente, in ordine di priorità.

- **D1. Puglia Digitale.** Che ruolo ha ITnode rispetto all'associazione Campo&Controcampo e al portale puglia-digitale.it: ideatore e titolare del marchio, partner tecnologico o altro? (Il portale, lapugliadigitale.it, è confermato dall'utente il 2026-10-05: resta aperto solo il ruolo.)
- **D2. Patrocinio.** A chi è stato concesso e per quale progetto? Potete inviarci l'atto e l'eventuale autorizzazione all'uso del logo?
- **D3. SIII.** Qual è lo scioglimento di ogni lettera (S = Sito, I = Interattivo, I = Immersivo, I = ?)? Confermate l'ordine «Interattivo Immersivo»?
- **D4. SIII e tour.** Il SIII è un Tour Virtuale Interattivo Immersivo con funzioni commerciali oppure un prodotto diverso? Si basa su foto a 360° o su modelli 3D? Vive sempre dentro un portale città o anche sul dominio dell'impresa? In concreto, cosa lo distingue da un tour 360°?
- **D5. Città Digitali.** È nata come «Le Città Digitali» di iComm Lab/Leadstone e oggi appartiene a ITnode? Il franchising è attivo, e il sito deve rivolgersi anche ai potenziali affiliati? (La convivenza con Puglia Digitale per le città pugliesi è chiarita: le 31 città pugliesi dell'elenco di Città Digitali sono le città di Puglia Digitale, conferma dell'utente del 2026-10-06.)
- **D6. Fondatore.** Nome e ruolo da indicare; conferma della timeline (domande della sezione 6); il testo narrativo citato nelle LG.
- **D7. Numeri.**
  - «30+ città»: elenco e perimetro sono chiariti (le 31 città pugliesi, conferma dell'utente del 2026-10-06). Manca la data dei dati: va bene «ottobre 2026»?
  - «~200.000 partite IVA» e «60%»: fonte, anno e definizione. Con l'elenco delle 31 città si possono anche verificare su dati pubblici per comune.
  - Avete dati documentati per «5–10 volte», «4 volte» (4 volte cosa?) e «250.000 visite mensili»?
- **D8. Enti pubblici.** I Comuni sono clienti che acquistano, partner che aderiscono, o entrambe le cose?
- **D9. Immagini.** Le foto del fondatore sono generate o elaborate con AI? Avete foto reali (ritratto, eventi) e l'originale della foto dell'evento Puglia Digitale, con data e luogo?
- **D10. Nome e dati legali.** Confermate «ITnode» nei testi, lasciando invariato il logotipo «itNode»? Ci inviate REA, capitale sociale versato e PEC? Sede legale e sede operativa coincidono?
- **D11. Form.** A quale indirizzo o sistema devono arrivare le richieste?
- **D12. Imprese di cui il sito mostra le schermate (A7, A8).**
  - Masseria Santella, Maison Miminà, D.L. Natura Dentro, YES e La Tana di Aldo hanno dato il consenso scritto a comparire con nome, logo e schermate? Il testo della richiesta è pronto (ADR 002 §3.2). Oppure il contratto con ITnode prevede già l'uso nel portfolio?
  - YES e La Tana di Aldo, per ciascuna: il SIII l'ha realizzato ITnode? Qual è il nome ufficiale dell'impresa, e in quale comune e provincia si trova? L'esperienza è online, e a quale indirizzo?

## Decisioni richieste

- **DR1. Grafia del nome** (decide l'utente, perché riguarda l'identità aziendale). Proposta: «ITnode» nei testi, «ITNODE S.r.l.» nei contesti legali, logotipo «itNode» invariato. Per i dati strutturati: `name` «ITnode», `legalName` «ITNODE S.r.l.», con le varianti in `alternateName` (da definire con seo-technical).
- **DR2. Convenzioni di grafia.** Proposta: «Sito Interattivo Immersivo» ovunque (quindi si corregge LG §17); minuscolo per le categorie generiche (tour 360°, destination marketing, digitalizzazione territoriale). Vanno recepite nella guida di stile di copywriter-brand; serve la conferma dell'utente perché cambiano testi del cliente.
- **DR3. Immagini del fondatore** (decide l'utente, sentito creative-director). Opzioni:
  - (a) usare solo la foto reale dell'evento finché non arrivano ritratti reali;
  - (b) usare un'immagine AI come ritratto, dichiarandolo, senza riferimenti a eventi e dopo una verifica legale;
  - (c) attendere nuove foto.

  Proposta: (a), e poi (c) appena arrivano le foto.
- **DR4. Regola di lavoro per lo sviluppo, fino alle risposte a D1, D2 e D7.** Proposta:
  - per Puglia Digitale non si scrive «ha creato» (si usa la versione provvisoria);
  - nessun patrocinio;
  - numeri sempre con la nota sulla fonte;
  - benefici solo in forma qualitativa;
  - layout dei numeri predisposto ma vuoto.
- **DR5. Potenziali affiliati.** Se il franchising è attivo, va deciso se prevedere un percorso per gli affiliati (incide su sitemap e form; dipende da D5).
