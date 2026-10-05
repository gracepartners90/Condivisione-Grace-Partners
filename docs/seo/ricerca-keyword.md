---
titolo: Ricerca keyword e analisi degli intenti (qualitativa)
owner: seo-content
contributi: [brand-strategist, seo-technical]
stato: bozza
versione: 0.3
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, osservazione delle SERP con WebSearch del 2026-09-28 e del 2026-10-05 (URL nella sezione Fonti), conferma dell'utente del 2026-10-05 sul dominio del portale Città Digitali (docs/strategia/citta-digitali-elenco.md §5), docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md]
---

# Ricerca keyword e analisi degli intenti

**A cosa serve.** Capire come le persone cercano i concetti del sito, con quale intento, e quale pagina di ITnode deve rispondere. Alimenta `docs/seo/mappa-keyword-url.md` (title, meta, H1, scaletta, blocchi di risposta).

## 1. Metodo e limiti (da leggere prima dei risultati)

- **Fonte.** Osservazione delle SERP con WebSearch il 2026-09-28. Lo strumento interroga un indice statunitense, non la SERP di google.it: con query italiane restituisce risultati italiani, ma resta un'approssimazione. Per esempio «tour 360°» senza altre parole restituisce risultati internazionali.
- **Non disponibili.** Volumi di ricerca, Search Console, Keyword Planner, riquadri «Le persone hanno chiesto anche». Anche i suggerimenti di Google non sono accessibili: `suggestqueries.google.com` è bloccato dalla policy di rete (403).
- **Pagine non aperte.** WebFetch è bloccato anche sulle fonti giornalistiche e istituzionali provate (consiglio.puglia.it, bariexperience.com, varesenews.it, leccesette.it), oltre che su itnode.it e sui portali. Tutto ciò che viene da queste fonti si basa sugli estratti della ricerca ed è `[DA VERIFICARE]`.
- **Nessun volume in numeri.** La colonna «Segnale di domanda» è una stima qualitativa `[IPOTESI]`, ricavata dalla composizione della SERP (quanti fornitori, guide, software e pagine prezzi presidiano la query). Va sostituita con dati reali appena disponibili.
- **Aggiornamento del 2026-10-05.** Ricerca di marca su «Città Digitali» (sezione 2.1) e correzione del dominio del portale: è cittàdigitali.it, con l'accento. La lettura del 2026-09-28 sui «due domini» era sbagliata (punto 4). Il portale è bloccato dalla policy di rete: le informazioni vengono dagli estratti di WebSearch, senza copie in cache né archivi.

## 2. Cosa emerge

1. **«Sito Interattivo Immersivo» e «SIII» non sono termini di ricerca consolidati.** Nessun risultato li usa come nome di un prodotto. In SERP compaiono articoli sul «web design immersivo» e installazioni fisiche (sale e pareti immersive). Conseguenza: ITnode può appropriarsi della definizione, con un vantaggio per AEO e GEO, ma la domanda di ricerca va intercettata con i termini che le persone usano già: *tour virtuale interattivo*, *virtual tour per aziende*, *tour virtuale 3D*, *tour 360°*.
2. **Il mercato del tour virtuale e del tour 360° è affollato e basato sul prezzo.** Fotografi certificati Google Street View, rivenditori Matterport, software (3DVista, CloudPano, Kuula) e pagine «quanto costa un virtual tour». Il SIII si distingue per funzione: è un sito con azioni commerciali, non un contenuto da guardare. La comparazione tour 360°/SIII chiesta dalle linee guida (§10) è anche la scelta SEO giusta: la SERP informativa più ricca è proprio quella sulla «differenza tra tour 360 e tour 3D».
3. **«Puglia Digitale» è un nome conteso.** L'intento dominante è istituzionale: l'agenda digitale della Regione Puglia (Puglia Digitale 2020, PugliaDigitale2030). Esiste inoltre un portale omonimo, puglia-digitale.it, realizzato dall'associazione Campo e controcampo con il contributo del Consiglio regionale, con tour virtuali di Alberobello, Gallipoli, Martina Franca, Monopoli, Ostuni, Polignano, San Giovanni Rotondo e Trani `[DA VERIFICARE: estratti di consiglio.puglia.it, TTG Italia, Leccesette]`. Tutti e otto i comuni sono anche nell'elenco «Tutte le città» di cittàdigitali.it (`docs/strategia/citta-digitali-elenco.md`, 2026-10-05): è un indizio utile per D1, non una prova. La pagina di ITnode deve disambiguare sempre, con il nome del progetto, «ITnode», il dominio lapugliadigitale.it e «destination marketing». Le conseguenze sull'attribuzione del progetto sono nel brief consolidato (§0 e A1).
4. **«Città Digitali» ha un solo portale, cittàdigitali.it, e diversi omonimi.** *Corretto il 2026-10-05.*
   - **L'errore.** Il 2026-09-28 avevo letto cittadigitali.it, senza accento, come un secondo dominio del progetto. Non lo è: ha il titolo «CITTA' DIGITALI» e una pagina su Biella, cioè è un progetto di altri. L'utente ha confermato il 2026-10-05 che quel dominio non è del cliente, anche se le linee guida (§22) lo indicano.
   - **Il portale del cliente** è cittàdigitali.it, con l'accento (`xn--cittdigitali-19a.it`). Le sue pagine Contatti e Dati aziendali riportano ITNode Srl.
   - **Gli altri risultati in SERP:**
     - schede di franchising: Infofranchising, BeTheBoss, AprireInFranchising, TuttiFranchising, Franchising.cloud;
     - l'iniziativa precedente «Le Città Digitali» (Leadstone, iComm Lab);
     - «Città Digitale» al singolare (cittadigitale.it), un prodotto per i siti dei Comuni;
     - il significato generico: il neologismo Treccani «città digitale», le smart city di AgID, le classifiche ICity Rank.
   - **Dettagli** nella sezione 2.1.
5. **Anche il brand è ambiguo.** Cercando «ITnode» si trovano ITNODE S.r.l. (Instagram @itnodedigital, registri camerali, itnode.it), ma anche ITNode (Australia, assistenza informatica per studi dentistici), IT NoDe (Gurugram, India) e Webnode. Sul Web la grafia è incoerente: ItNode, iTNode, ITNODE. Il nome «Giacomo Lenoci» ha diversi omonimi (LinkedIn mostra 6 profili). Servono una definizione dell'entità identica ovunque e collegamenti `sameAs` corretti nei dati strutturati.
6. **I concetti «ombrello» hanno SERP non commerciali.** «Digitalizzazione territoriale» è dominata da PA, PNRR, AgID e articoli accademici. «Destination marketing Puglia» è dominata da Pugliapromozione, Regione Puglia e tesi di laurea. Una pagina di servizio di ITnode non ha possibilità realistiche su queste query di testa: vanno usate come entità di contesto (definizioni, testo), non come query primarie.
7. **«Esperienze immersive per aziende» porta a VR/AR ed eventi fisici** (sale immersive, fiere, laser show, formazione). Per ITnode serve solo se qualificata: esperienze immersive *sul Web*, da desktop e smartphone.

### 2.1 Ricerca di marca «Città Digitali» (2026-10-05)

**Query provate con WebSearch:**
- «"città digitali"», «citta digitali», «cittadigitali.it», «cittàdigitali.it»;
- il nome insieme a ITnode, Giacomo Lenoci, iComm Lab, franchising, tour virtuali e portale;
- il nome insieme ad alcune città: Varese, Lecce, Caltanissetta, Altamura.

La valutazione del rischio e le raccomandazioni sono nella review `docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md`.

| Entità in SERP | Che cos'è | Quando compare |
|---|---|---|
| cittàdigitali.it | Portale del cliente: Il progetto, Chi siamo, Franchising, Dati aziendali, Contatti, Tutte le città, pagine città | Su quasi tutte le query di marca, ma raramente da solo in testa |
| Facebook @cittadigitali, Instagram @citta_digitali | Profili del progetto `[DA VERIFICARE con il cliente]` | In testa a «città digitali» e alle varianti con le città |
| «CITTA' DIGITALI», cittadigitali.it | Progetto di altri con Biella, Lecce, Salerno, Trento e Treviso. Negli estratti è legato a Banca Sella («Biella Città Digitale») `[DA VERIFICARE]`. Il 2026-10-05 il dominio non si risolveva, ma le pagine sono ancora nell'indice | Con le query sul dominio, anche con l'accento, e con le sue città |
| «Le Città Digitali», lecittadigitali.it, Leadstone | Iniziativa precedente di iComm Lab, dello stesso fondatore | Su «città digitali», con «Giacomo Lenoci» o «iComm Lab», con Lecce |
| «città digitale», smart city | Significato generico: Treccani, ICity Rank di FPA, AgID, articoli su governance e decarbonizzazione | Su «città digitali» senza altre parole |
| «Città Digitale», cittadigitale.it | Altro operatore: siti per i Comuni | Con le query sul dominio e al singolare |
| Schede di franchising, IT System | Terze parti che descrivono il progetto del cliente. Il ruolo di IT System (itsystemonline.it) è `[DA VERIFICARE]` | Con «franchising», «tour virtuali», «portale» e le città |

**Cosa ne ricavo.**
- **Accenti.** Il motore li ignora: «citta digitali» e «città digitali» danno la stessa SERP. I domini invece restano distinti: chi digita l'indirizzo senza accento non arriva al portale.
- **Query di marca senza altre parole.** È condivisa con il significato generico. Con un modificatore (tour virtuali, portale, franchising, il nome di una città, ITnode) la SERP parla quasi solo del progetto del cliente.
- **Attribuzione.** Con «Giacomo Lenoci» o «iComm Lab», gli estratti attribuiscono l'idea di Città Digitali a iComm Lab. Lo fa anche la pagina Chi siamo del portale, mentre Dati aziendali e Contatti riportano ITNode Srl.
- **Query locali.** A «Città Digitali Caltanissetta» risponde la pagina città del portale. È il risultato giusto, e itnode.it non deve contenderlo.

## 3. Concetti analizzati

| Concetto | Varianti viste in SERP | Intento dominante | Pagine in SERP | Segnale di domanda `[IPOTESI]` | Pagina ITnode | Ruolo |
|---|---|---|---|---|---|---|
| Sito interattivo immersivo | sito immersivo, sito web immersivo 3D, web design immersivo; «SIII» assente | Informativo-ispirazionale, non consolidato | Articoli e liste di siti immersivi, installazioni fisiche (pareti, sale), scenari del MiC per il patrimonio | Molto basso: termine proprietario | `/siii` | Entità da definire (primaria per AEO/GEO) |
| Tour virtuale interattivo | virtual tour interattivo, tour virtuali multimediali, tour con hotspot | Misto: informativo («cos'è») e commerciale («realizzazione») | Glossari, software (3DVista), tutorial YouTube, esempi culturali (Pantheon), fornitori | Medio | `/siii` | Query secondaria di domanda |
| Tour virtuale 3D per aziende | virtual tour 3D, tour 3D navigabili, Matterport, showroom virtuale 3D | Commerciale-valutativo | Fornitori (anche certificati Matterport), guide «cosa sono e vantaggi», software | Medio-basso | `/siii` | Query secondaria; «3D» solo se la tecnologia è confermata |
| Tour 360° | tour virtuale 360 gradi, virtual tour 360, tour Google Street View, «quanto costa» | Commerciale (servizio a listino) + informativo (differenze 360/3D) | Fornitori locali e fotografi Google, pagine prezzi, confronti 360 vs 3D, Wikipedia «Visita virtuale» | Alto (termine di testa, ambiguo senza «virtuale») | `/siii`, sezione comparativa | Termine di confronto, non query primaria |
| Digitalizzazione territoriale | digitalizzazione dei territori, territori digitali, PNRR | Informativo-istituzionale (PA) | AgID, Liguria Digitale, Agenda Digitale, ANCI, atenei, Urbismap; un solo blog aziendale (Pagine Sì) | Medio, ma fuori target | `/` | Entità di contesto |
| Destination marketing Puglia | destination management, marketing territoriale, branding dei borghi | Informativo-istituzionale | Pugliapromozione (DMS, ARET), Regione Puglia, tesi, premi; per la variante generica guide e consulenti | Basso | `/puglia-digitale` | Entità e query secondaria |
| Esperienze immersive per aziende | esperienza immersiva aziendale, VR/AR per aziende | Commerciale, orientato a VR/AR ed eventi | Agenzie VR/AR, eventi e fiere, laser show, employee engagement, blog | Medio | `/`, `/siii` | Secondaria, solo qualificata («sul Web») |
| Città Digitali | Città Digitali franchising, Città Digitali + città, citta digitali (senza accento: stessa SERP), città digitale (singolare), smart city | Misto: navigazionale (portale), franchising, informativo (significato generico) | Portale cittàdigitali.it e profili social; schede franchising; omonimi: «CITTA' DIGITALI» (cittadigitali.it, di altri), «Le Città Digitali» (iniziativa precedente), «Città Digitale» (cittadigitale.it); significato generico (Treccani, ICity Rank, AgID) | Basso-medio, frammentato | `/citta-digitali` | Brand ed entità primaria, da disambiguare (sezione 2.1) |
| Puglia Digitale | Puglia Digitale 2030, agenda digitale Puglia, tour virtuali città pugliesi | Navigazionale-istituzionale, dominato da omonimi | Regione Puglia, Agenda Digitale, stampa locale, portale omonimo puglia-digitale.it, notizia BariExperience | Medio, ma per altre entità | `/puglia-digitale` | Brand ed entità primaria, da disambiguare |
| ITnode (brand) | ItNode, ITNODE srl, itnode digital | Navigazionale | Registri camerali, social, itnode.it, omonimi esteri | Basso | `/` | Brand |
| Giacomo Lenoci (persona) | — | Navigazionale | Profili social e LinkedIn di più omonimi, giacomolenoci.it, YouTube | Basso | `/`, sezione fondatore | Entità Person |

**Modificatori locali.** «Virtual tour aziende Bari Puglia» restituisce fornitori locali (fotografi Google), directory (italiavirtualtour.it), Italia.it e la notizia BariExperience–Puglia Digitale. La domanda locale esiste, ma si presidia con Google Business Profile e con indirizzo, nome e telefono coerenti su `/contatti`, non con pagine locali duplicate (niente doorway page).

## 4. Implicazioni per le pagine: una pagina, un intento

| Pagina | Intento che presidia |
|---|---|
| `/` | Brand ITnode e categoria («esperienze immersive» per imprese e territori); «digitalizzazione territoriale» come entità di contesto. Nessuna query commerciale di dettaglio. |
| `/siii` | Unica pagina per la domanda commerciale e informativa sui tour virtuali per aziende (interattivo, 3D, 360°) e sulla differenza tra tour 360° e sito immersivo. |
| `/puglia-digitale` | Brand Puglia Digitale (disambiguato), destination marketing, tour virtuali di città, borghi e imprese pugliesi. |
| `/citta-digitali` | Brand Città Digitali insieme a ITnode, portale per le attività del territorio in Italia, adesione delle attività. Non contende al portale cittàdigitali.it la query di marca senza altre parole né le query locali delle sue pagine città. |
| `/contatti` | Navigazionale e locale (indirizzo, nome e telefono coerenti ovunque). |

**Regola contro la cannibalizzazione.** «Tour virtuale» è il tema principale solo di `/siii`. Nelle pagine di progetto i tour virtuali sono il mezzo e sono sempre legati al territorio («tour virtuali di città, borghi e imprese»), con link a `/siii`.

## 5. Opportunità fuori perimetro (per il piano editoriale, non per il lancio)

- Una guida «Tour 360°, tour 3D e Sito Interattivo Immersivo: le differenze». La SERP informativa è ricca e il formato giusto è l'articolo.
- «Quanto costa un tour virtuale», con un intento commerciale forte: solo se ITnode vuole parlare di prezzi o di come si costruisce un preventivo.
- Rassegna stampa come prova di esperienza e autorevolezza (E-E-A-T), per esempio l'articolo di VareseNews (aprile 2026) sul lancio del portale di Varese con Giacomo Lenoci `[DA VERIFICARE: letto solo l'estratto]`.

## Ipotesi da validare

- I segnali di domanda della tabella sono stime qualitative, basate sulla SERP dello strumento (indice statunitense). Vanno confermati con Keyword Planner o Search Console.
- Nel breve periodo `/puglia-digitale` difficilmente si posizionerà per «Puglia Digitale» senza altre parole, a causa degli omonimi istituzionali `[IPOTESI]`. Sono più raggiungibili «Puglia Digitale ITnode», «lapugliadigitale» e «tour virtuali Puglia».
- Negli estratti di cittàdigitali.it e VareseNews la tecnologia di ITnode è descritta sia come «3D» sia come «360°». Non basta per attribuire al SIII una tecnologia specifica. Il 2026-10-05 ho ricontrollato la fonte: gli estratti sono del portale con l'accento («ambienti 3D immersivi», «VR 360°»), non dell'omonimo.

## Domande aperte

1. **Per il cliente.** Può darci accesso in lettura a Google Search Console di itnode.it (e dei portali, se possibile) e, se esiste, a Google Ads/Keyword Planner?
2. **Per il cliente e seo-technical.** Il sito attuale ha pagine con traffico o link? In SERP compare almeno `itnode.it/informativa-privacy/`, che serve anche alla mappa dei redirect.
3. **Per il cliente.**
   - **Città Digitali: chiusa il 2026-10-05.** Il portale è cittàdigitali.it; cittadigitali.it, senza accento, non è del cliente (conferma dell'utente).
   - **Ancora aperta:** per Acquaviva il portale è acquavivadigitale.com (linee guida) o esiste anche acquavivadigitale.it?
4. **Già nel brief consolidato.** Le seguenti domande hanno effetto anche sulla SEO e si seguono lì:
   - D1: il rapporto tra Puglia Digitale e il portale puglia-digitale.it;
   - A3: la collaborazione con BariExperience;
   - D5 e DR5: il franchising di Città Digitali, che se attivo richiede una pagina per «Città Digitali franchising»;
   - D4: la tecnologia del SIII, da cui dipende l'uso di «tour virtuale 3D».
5. **Per il cliente, dalla ricerca di marca del 2026-10-05** (dettagli nella review dello stesso giorno, O1 e O6):
   - i profili Facebook @cittadigitali e Instagram @citta_digitali sono ufficiali?
   - IT System (itsystemonline.it) è un affiliato o un rivenditore di Città Digitali?
   - il dominio cittadigitali.it, senza accento, è libero o registrato da altri?

## Decisioni richieste

- Confermare la ripartizione degli intenti tra le pagine (sezione 4). Owner: seo-content; conferma di brand-strategist e ux-designer.
- I dati mancanti non bloccano lo sviluppo.

## Fonti

Consultate il 2026-09-28 tramite gli estratti dei risultati di WebSearch, salvo il blocco «Ricerca di marca Città Digitali», del 2026-10-05. Le pagine non sono state aperte perché WebFetch è bloccato. Per il portale del cliente, bloccato dalla policy di rete, non ho cercato copie in cache né archivi.

- **Sito interattivo immersivo.** [Medium](https://medium.com/this-is-digital-experience/10-siti-incredibili-dove-lesperienza-immersiva-diventa-un-viaggio-nell-ambiente-virtuale-f15a39a1f71b), [Navigaweb](https://www.navigaweb.net/2014/04/10-siti-visivamente-straordinari-con.html), [Evoluzione Informatica](https://www.evoluzioneinformatica.it/2026/02/web-design-immersivo-nel-2026-cose-e-perche-sta-cambiando-il-modo-di-progettare-i-siti/), [Ecomic MiC](https://ecomic.cultura.gov.it/dpaas/scenari/esperienze-immersive-interattive/), [Aurora Meccanica](https://www.aurorameccanica.it/welcome/sala-immersiva-2/), [Collettivo Digitale](https://www.collettivodigitale.it/soluzioni/ambienti-immersivi-interattivi).
- **Tour virtuale interattivo.** [GlossarioMarketing](https://www.glossariomarketing.it/significato/virtual-tour/), [3DVista](https://www.3dvista.com/it/project/video-turistico-interattivo-a-360-gradi/), [YouTube](https://www.youtube.com/watch?v=SW0IrhL0Gjc), [Pantheon](https://www.pantheonroma.com/en/virtual-tour-pantheon/), [virtualtour-360.it](https://www.virtualtour-360.it/), [Emmebistudio](https://www.emmebistudio.com/video-3d/virtual-tour-interattivi).
- **Tour virtuale 3D per aziende e showroom.** [Webinarpro](https://webinarpro.it/organizzare-eventi-online/virtual-tour/), [Utopix](https://www.utopix.it/tour-virtuali-per-aziende/), [Tredigraph](https://www.tredigraph.com/virtual-tour/), [Blanc Animation](https://www.blancanimation.com/blog/virtual-tour-360-3d), [CloudPano](https://www.cloudpano.com/), [Living3D](https://living3d.it/news/virtual-tour-per-showroom/), [Store3D](https://www.store3d.it/).
- **Tour 360°.** Query senza «virtuale»: [Microsoft Support](https://support.microsoft.com/en-us/office/add-a-360-virtual-tour-to-a-sharepoint-space-d4d3c8c5-7656-4d9c-9096-e82eb0b5098b), [U2 360° Tour](https://en.wikipedia.org/wiki/U2_360%C2%B0_Tour), [AirPano](https://www.airpano.com/), [Kuula](https://kuula.co/). Servizio: [Trexya](https://www.trexya.it/servizi/web-marketing/virtual-tour-360/), [360tourvirtuali](https://360tourvirtuali.com/), [4Real Studio](https://www.4realstudio.com/virtual-tour-360-aziendale-1366/). Differenze: [Panoee](https://panoee.com/virtual-tour-vs-3d-tour), [Realsee](https://www.realsee.ai/blogs/news/difference-between-3d-virtual-tour-360), [R2M Solution](https://www.r2msolution.com/it/tour-virtuali-3d-e-tour-360-differenze-vantaggi-e-perche-matterport-cambia-le-regole/), [Exploora](https://exploora.it/virtual-tour-360/), [Interactivelab](https://www.interactivelab.it/tipologie-virtual-tour/), [Wikipedia](https://it.wikipedia.org/wiki/Visita_virtuale). Prezzi: [Tutor Comunicazione](https://www.tutorcomunicazione.com/quanto-costa-un-virtual-tour-google/), [360virtualtours.it](https://www.360virtualtours.it/google-costi-listino-prezzi.html), [Immensive](https://www.immensive.it/en/prezzi/).
- **Digitalizzazione territoriale.** [AgID](https://www.agid.gov.it/it/agenzia/il-supporto-pa/territori-digitali), [Liguria Digitale](https://www.liguriadigitale.it/pnrr-competence-center/pnrr-digitalizzazione-territoriale.html), [Agenda Digitale](https://www.agendadigitale.eu/cittadinanza-digitale/digitalizzazione-dei-territori-lanalisi-dellosservatorio-polimi-su-regioni-e-comuni-italiani/), [Urbismap](https://www.urbismap.it/news/digitalizzazione-dei-comuni-rapporto-2025/), [Pagine Sì](https://www.paginesispa.it/blog/marketing/turismo-e-sviluppo-territoriale-la-digitalizzazione-come-leva-strategica-per-enti-e-imprese-locali/).
- **Destination marketing Puglia.** [DMS Puglia](https://www.dms.puglia.it/portal/web/guest/chi-siamo), [ARET Pugliapromozione](https://aret.regione.puglia.it/en/gestione-destinazione), [Tesi Unipd](https://thesis.unipd.it/handle/20.500.12608/11181), [Regione Puglia](https://press.regione.puglia.it/-/-puglia-destination-go-ecco-le-10-tappe-in-tutta-la-regione), [Italia Economy](https://italiaeconomy.it/destination-marketing/), [Anna Bruno](https://www.annabruno.it/destinazione-marketing/).
- **Esperienze immersive per aziende.** [Protocube Reply](https://protocube.it/esperienze-immersive-vr-ar/), [Digityze](https://www.digityze.it/esperienze-immersive-eventi-fiere/), [Laser Entertainment](https://www.laserentertainment.com/esperienze-immersive/), [WAY Experience](https://wayexperience.it/blog/employee-engagement-attraverso-esperienze-immersive), [W&E](https://www.wegroups.eu/esperienza-immersiva).
- **Città Digitali.** [Infofranchising](https://www.infofranchising.it/citta-digitali-franchising-pubblicita-aziende/), [BeTheBoss](https://www.betheboss.it/franchising/citta-digitali/), [cittàdigitali.it: il progetto](https://xn--cittdigitali-19a.it/il-progetto/), [contatti](https://xn--cittdigitali-19a.it/contatti/), [franchising](https://xn--cittdigitali-19a.it/franchising/), [omonimo «CITTA' DIGITALI», senza accento, non del cliente](http://www.cittadigitali.it/), [omonimo «Città Digitale»](https://www.cittadigitale.it/), [Treccani](https://www.treccani.it/vocabolario/citta-digitale_(Neologismi)/), [AgID](https://www.agid.gov.it/it/node/1835), [Leadstone, «Le Città Digitali»](https://www.leadstone.it/citta_digitali.html), [IT System](https://www.itsystemonline.it/citta-digitali/), [VareseNews](https://www.varesenews.it/2026/04/varese-diventa-digitale-la-citta-si-puo-visitare-in-3d-con-un-click/2561725/).
- **Ricerca di marca Città Digitali (2026-10-05).**
  - Portale del cliente: [Home](https://xn--cittdigitali-19a.it/), [Chi siamo](https://xn--cittdigitali-19a.it/chi-siamo/), [Dati aziendali](https://xn--cittdigitali-19a.it/dati-aziendali/), [Tutte le città](https://xn--cittdigitali-19a.it/tutte-le-citta/), [Caltanissetta](https://xn--cittdigitali-19a.it/caltanissetta/). Profili: [Facebook](https://www.facebook.com/cittadigitali), [Instagram](https://www.instagram.com/citta_digitali/).
  - Omonimo senza accento: [CITTA' DIGITALI](http://www.cittadigitali.it/), [Biella Città Digitale](http://www.cittadigitali.it/biella/index.htm), [Serate digitali](http://www.cittadigitali.it/biella/serate-digitali.htm), [Banca Sella, corso di e-commerce a Biella](https://www.sellagroup.eu/-/economia-digitale-banca-sella-organizza-un-nuovo-corso-di-e-commerce-a-biella).
  - Iniziativa precedente: [Le Città Digitali](https://www.lecittadigitali.it/), [l'iniziativa](https://www.lecittadigitali.it/iniziativa), [Leadstone](https://www.leadstone.it/citta_digitali.html), [giacomolenoci.it, il nuovo progetto](https://www.giacomolenoci.it/il_nuovo_progetto.html), [blog di iComm Lab](https://blog.icommlab.com/lettera-aperta-del-nostro-d-dott-giacomo-lenoci/).
  - Significato generico: [Treccani](https://www.treccani.it/vocabolario/citta-digitale_(Neologismi)/), [ElettricoMagazine](https://elettricomagazine.it/attualita-news/citta-digitali-tecnologia-rinnovabili-decarbonizzazione/), [Strategie Amministrative](https://www.strategieamministrative.it/dettaglio-news/201610181239-le-citta-digitali-tecnologia-partecipazione-e-governance/), [FPA, ICity Rank 2025](https://www.forumpa.it/citta-territori/icity-rank-2025-le-16-citta-leader-dellinnovazione-in-italia/), [ZeroUno](https://www.zerounoweb.it/cio-innovation/pa-digitale/smart-city-in-italia-quali-sono-le-citta-digitali-nel-nostro-paese/), [Doppiozero](https://www.doppiozero.com/citta-digitale-e-smart-city-due-concetti-distinti).
  - Al singolare: [cittadigitale.it](https://www.cittadigitale.it/), [canale YouTube «Città Digitale»](https://www.youtube.com/channel/UCCNwgXUikrzPr4XAxxF7poQ).
  - Terze parti: [IT System](https://www.itsystemonline.it/citta-digitali/), [TuttiFranchising](https://www.tuttifranchising.it/citta-digitali-trasformazione-digitale-pmi/), [Franchising.cloud](https://www.franchising.cloud/citta-digitali-franchising-pubblicita-e-digital-transformation-pmi/), [AprireInFranchising](https://www.aprireinfranchising.it/citta-digitali-franchising-pubblicita-aziende).
  - Città: [varesedigitale.it](https://varesedigitale.it/), [VareseNews](https://www.varesenews.it/2026/04/varese-diventa-digitale-la-citta-si-puo-visitare-in-3d-con-un-click/2561725/).
- **Puglia Digitale.** [Regione Puglia, Puglia Digitale](https://www.regione.puglia.it/web/trasformazione-digitale/puglia-digitale), [Puglia Digitale 2030](https://www.regione.puglia.it/web/trasformazione-digitale/puglia-digitale-2030), [Agenda Digitale](https://www.agendadigitale.eu/cittadinanza-digitale/agenda-pugliadigitale2030-cosi-territorio-e-imprese-partecipano-alla-trasformazione-digitale/), [Consiglio regionale](https://www.consiglio.puglia.it/-/tour-virtuali-delle-citt%C3%A0-pugliesi), [TTG Italia](https://www.ttgitalia.com/incoming/189968-puglia-digitale-passeggiate-virtuali-tra-i-tesori-della-regione-PXTG402805), [Leccesette](https://www.leccesette.it/turismo/95001/con-puglia-digitale-tour-virtuali-nelle-citta-pugliesi.html), [BariExperience](https://www.bariexperience.com/en/news-events/digital-tourism-destination-marketing-virutal-tour-bari-partnership-pugliadigitale-bariexperience/), [BariToday: altra piattaforma di tour virtuali in Puglia](https://www.baritoday.it/attualita/due-mari-progetto-tour-virtuali-scoperta-puglia-nascosta.html).
- **Brand e persona.** [Instagram @itnodedigital](https://www.instagram.com/itnodedigital/), [Ufficio Camerale](https://www.ufficiocamerale.it/2699/itnode-srl), [Dun & Bradstreet](https://www.dnb.com/business-directory/company-profiles.itnode_srl.4bfa0c62ba90f9b5adfcece44bd5a18e.html), [ITNode Australia](https://itnode.com.au/), [IT NoDe India](https://www.facebook.com/itnodein/), [itnode.it/informativa-privacy/](https://itnode.it/informativa-privacy/), [LinkedIn Giacomo Lenoci](https://it.linkedin.com/in/giacomo-lenoci), [omonimi su LinkedIn](https://it.linkedin.com/pub/dir/Giacomo/Lenoci/it-0-Italia), [giacomolenoci.it](https://www.giacomolenoci.it/), [YouTube](https://www.youtube.com/channel/UCxv2uVOcOo3g5Q5fQEQrmOw).
- **Locale.** [Italiavirtualtour Bari](http://bari.italiavirtualtour.it/?id_cat=62), [Italia.it](https://www.italia.it/en/puglia/things-to-do/virtual-tours-in-puglia), [We Are Web Agency](https://www.wearewebagency.it/realizzazioni/google-virtual-tour-360.html).
