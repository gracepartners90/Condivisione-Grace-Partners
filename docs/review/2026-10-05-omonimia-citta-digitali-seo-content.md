---
titolo: Review SEO dei contenuti · omonimia di «Città Digitali» e dominio del portale
owner: seo-content
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md (§17–§22), docs/brief/brief-consolidato.md (glossario, omonimie, A1, A2, D1, D5, S7, X1), docs/strategia/citta-digitali-elenco.md (§1, §2, §4, §5), docs/seo/ricerca-keyword.md (§2.1), docs/seo/mappa-keyword-url.md (§3.4, §4), docs/seo/specifiche-tecniche.md (§5.3), docs/seo/dati-strutturati.md (§5.1), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (§6), dist/ (build del commit eb691ee, sola lettura), src/ (sola lettura), WebSearch del 2026-10-05 (URL nel testo e in Fonti)]
---

# Review SEO dei contenuti · omonimia di «Città Digitali» (Fase 5)

## Perimetro e metodo

- **Oggetto.**
  - I miei documenti: `docs/seo/ricerca-keyword.md` e `docs/seo/mappa-keyword-url.md`, che citavano il dominio sbagliato del portale.
  - La ricerca di marca «città digitali» e le sue varianti.
  - La pagina `/citta-digitali/` e il capitolo 03 della Home, nella build `dist/` del commit eb691ee.
  - Le implicazioni SEO locali dell'elenco delle 45 città (`docs/strategia/citta-digitali-elenco.md`).
- **Strumenti.**
  - WebSearch il 2026-10-05, 27 query. Le principali:
    - «"città digitali"», «citta digitali», «cittadigitali.it», «cittàdigitali.it»;
    - il nome con ITnode, Giacomo Lenoci, iComm Lab, Banca Sella, franchising, tour virtuali, portale;
    - il nome con Varese, Lecce, Caltanissetta, Altamura;
    - «città digitale» al singolare;
    - le linee guida di Google Business Profile.
  - Uno script sulla build per title, meta, heading, testo visibile, JSON-LD e occorrenze dei domini.
  - Uno script per contare i caratteri delle proposte.
- **Limiti.**
  - **SERP approssimata.** WebSearch interroga un indice statunitense, non la SERP di google.it. Non dà volumi né riquadri «Le persone hanno chiesto anche».
  - **Riassunti generati.** I riassunti dell'indice sono generati automaticamente: ciò che viene solo da lì è `[DA VERIFICARE]`.
  - **Portale del cliente.** È bloccato dalla policy di rete: non ho usato WebFetch, né copie in cache o archivi.
  - **Registro dei domini.** rdap.nic.it è bloccato dal proxy (403): non so se cittadigitali.it è libero o registrato.
  - **Codice.** Non ho modificato `src/`: qui ci sono solo proposte.

## Esito in sintesi

| Area | Esito |
|---|---|
| Documenti seo-content | Corretti: 4 citazioni in `ricerca-keyword.md`, 6 in `mappa-keyword-url.md`. Una lettura era sbagliata (i «due domini» di Città Digitali) ed è corretta (§1) |
| Dominio nel sito | Conforme dopo eb691ee. In `dist/` il dominio senza accento non compare mai, in nessuna delle 8 pagine. I link e il JSON-LD usano il punycode, il testo visibile l'accento |
| Rischio di confusione nella ricerca di marca | Alto sugli indirizzi e sull'attribuzione, medio nelle SERP (§2) |
| Title, H1, testi | Title, H1 e Blocco E vanno bene così (§3). Consigliate una meta description con ITnode (O3) e il dominio visibile vicino alla CTA della hero (O4) |
| Dati strutturati | Il nodo Brand è corretto. Tre proposte a seo-technical (O6) |
| Documenti di altri membri | 7 file citano ancora il dominio senza accento (O7) |
| Elenco delle città | Un solo elenco su `/citta-digitali/`, nessuna pagina locale (§5) |

## 1. Correzioni nei miei documenti

| Documento | Dove | Prima | Dopo | Tipo |
|---|---|---|---|---|
| `ricerca-keyword.md` | §2, punto 4 | «Città Digitali ha omonimi e due domini»: cittadigitali.it letto come secondo dominio del progetto | Un solo portale, cittàdigitali.it; cittadigitali.it è «CITTA' DIGITALI», un progetto di altri | Lettura sbagliata |
| `ricerca-keyword.md` | §3, riga Città Digitali | «cittàdigitali.it, cittadigitali.it» fra le pagine della marca | Portale, omonimi e significato generico in voci separate | Lettura sbagliata |
| `ricerca-keyword.md` | Domande aperte, 3 | «www.cittadigitali.it o cittàdigitali.it?» | Chiusa il 2026-10-05 | Dominio |
| `ricerca-keyword.md` | Fonti | Link a cittadigitali.it fra le fonti di Città Digitali | Etichettato come omonimo, non del cliente | Dominio |
| `mappa-keyword-url.md` | §1, Terminologia, Domini | cittadigitali.it | cittàdigitali.it; negli `href` `https://xn--cittdigitali-19a.it` | Dominio |
| `mappa-keyword-url.md` | §3.4, Entità | cittadigitali.it | cittàdigitali.it, con gli omonimi da cui distinguerlo | Dominio |
| `mappa-keyword-url.md` | §3.4, scaletta | https://www.cittadigitali.it | cittàdigitali.it, `https://xn--cittdigitali-19a.it` | Dominio |
| `mappa-keyword-url.md` | §3.4, link in uscita | cittadigitali.it (dominio da verificare) | cittàdigitali.it; forma finale secondo le specifiche §5.3 | Dominio |
| `mappa-keyword-url.md` | §3.5, scaletta | cittadigitali.it | cittàdigitali.it | Dominio |
| `mappa-keyword-url.md` | §4, Blocco E | «…in un unico portale, cittadigitali.it…» | cittàdigitali.it. Nel sito era già corretto (eb691ee) | Dominio |

**L'osservazione basata sul dominio sbagliato.** È una sola.
- **I fatti erano giusti.** Il 2026-09-28 avevo annotato il titolo «CITTA' DIGITALI» e la pagina su Biella.
- **L'interpretazione no.** Li avevo letti come un secondo dominio di Città Digitali, invece che come un omonimo.
- **Dove è finita.** Nella mia memoria e nella domanda sul «dominio canonico». Non è finita in testi pubblicati.
- **Da dove veniva il dominio sbagliato.** Dalle linee guida (§22), non dalla ricerca.

**Controllate e confermate.**
- **«3D» e «360°»** (ricerca keyword, Ipotesi): gli estratti erano del portale con l'accento. Lo conferma la ricerca del 2026-10-05.
- **ITNode Srl** fra i dati della pagina Contatti: era il portale con l'accento.
- **Nessun'altra osservazione** dei miei documenti si basava su pagine di cittadigitali.it.

**Nuovo nei documenti.**
- `ricerca-keyword.md` §2.1: la ricerca di marca del 2026-10-05.
- `mappa-keyword-url.md` §3.4:
  - regole sulle omonimie;
  - la variante della meta description;
  - le regole per l'elenco delle città;
  - il franchising, aggiornato con la SERP di oggi.

## 2. La ricerca di marca «città digitali» (2026-10-05)

### 2.1 Che cosa compare nelle SERP

| Query | Primi risultati | Lettura |
|---|---|---|
| «"città digitali"», «citta digitali» | Profili [Instagram @citta_digitali](https://www.instagram.com/citta_digitali/) e [Facebook @cittadigitali](https://www.facebook.com/cittadigitali). [Treccani](https://www.treccani.it/vocabolario/citta-digitale_(Neologismi)/), «città digitale», neologismo. Articoli generici ([ElettricoMagazine](https://elettricomagazine.it/attualita-news/citta-digitali-tecnologia-rinnovabili-decarbonizzazione/), [Strategie Amministrative](https://www.strategieamministrative.it/dettaglio-news/201610181239-le-citta-digitali-tecnologia-partecipazione-e-governance/)). Il portale: [Il progetto](https://xn--cittdigitali-19a.it/il-progetto/), [Chi siamo](https://xn--cittdigitali-19a.it/chi-siamo/). [Leadstone](https://www.leadstone.it/citta_digitali.html). [Canale YouTube «Città Digitale»](https://www.youtube.com/channel/UCCNwgXUikrzPr4XAxxF7poQ) | Con e senza accento la SERP è la stessa. La marca divide la pagina con il significato generico e con l'iniziativa precedente |
| «cittadigitali.it», «cittàdigitali.it» | Le pagine del portale: Home, Il progetto, Franchising, [Dati aziendali](https://xn--cittdigitali-19a.it/dati-aziendali/), Contatti, Chi siamo. Poi [«CITTA' DIGITALI»](http://www.cittadigitali.it/) e [«BIELLA CITTA' DIGITALE»](http://www.cittadigitali.it/biella/index.htm), [cittadigitale.it](https://www.cittadigitale.it/) e Facebook | Nella query il motore non distingue i due domini: l'omonimo compare anche quando si cerca il dominio giusto |
| «"Città Digitali" ITnode» | Facebook, Treccani, AgID, [IT System](https://www.itsystemonline.it/citta-digitali/), Contatti, Dati aziendali e Chi siamo del portale, [ZeroUno](https://www.zerounoweb.it/cio-innovation/pa-digitale/smart-city-in-italia-quali-sono-le-citta-digitali-nel-nostro-paese/) (smart city), [itnode.it](https://itnode.it/) (sito attuale) | Il legame con ITNode Srl passa dalle pagine di servizio del portale e dal sito attuale |
| «"Città Digitali" "Giacomo Lenoci"», «"Città Digitali" "iComm Lab"», «"Le Città Digitali" …» | Il [LinkedIn del fondatore](https://www.linkedin.com/in/giacomo-lenoci/), Leadstone, [lecittadigitali.it](https://www.lecittadigitali.it/iniziativa), [giacomolenoci.it](https://www.giacomolenoci.it/il_nuovo_progetto.html), il [blog di iComm Lab](https://blog.icommlab.com/lettera-aperta-del-nostro-d-dott-giacomo-lenoci/) | I riassunti attribuiscono l'idea di Città Digitali a iComm Lab («nasce dalla visione di Giacomo Lenoci, CEO di iComm Lab»), come la pagina Chi siamo del portale (brief A1) |
| «"CITTA' DIGITALI" Biella Lecce Salerno Trento Treviso», «"Biella città digitale" …» | cittadigitali.it, home e [Serate digitali](http://www.cittadigitali.it/biella/serate-digitali.htm). [Banca Sella, corsi di e-commerce a Biella](https://www.sellagroup.eu/-/economia-digitale-banca-sella-organizza-un-nuovo-corso-di-e-commerce-a-biella). [ICity Rank 2025](https://www.forumpa.it/citta-territori/icity-rank-2025-le-16-citta-leader-dellinnovazione-in-italia/). [Tutte le città](https://xn--cittdigitali-19a.it/tutte-le-citta/) del portale | L'omonimo è un progetto con cinque città, legato a Banca Sella («Biella Città Digitale») `[DA VERIFICARE]`. Lecce è anche nell'elenco del cliente |
| «citta digitali franchising», «Città Digitali portale tour virtuali attività» | Directory di franchising ([Infofranchising](https://www.infofranchising.it/citta-digitali-franchising-pubblicita-aziende/), [BeTheBoss](https://www.betheboss.it/franchising/citta-digitali/), [AprireInFranchising](https://www.aprireinfranchising.it/citta-digitali-franchising-pubblicita-aziende), [TuttiFranchising](https://www.tuttifranchising.it/citta-digitali-trasformazione-digitale-pmi/), [Franchising.cloud](https://www.franchising.cloud/citta-digitali-franchising-pubblicita-e-digital-transformation-pmi/)), le pagine Franchising, Il progetto e Home del portale, IT System, [«comuni digitali A domicilio»](https://www.franchising.cloud/comuni-a-domicilio/) | Con un modificatore la SERP parla solo del progetto del cliente, ma soprattutto per bocca di terzi e con claim non utilizzabili (X1) |
| «"Città Digitali" Lecce», «… Caltanissetta», «… Varese» | Lecce: profili, «Tutte le città», IT System, [lecittadigitali.it](https://www.lecittadigitali.it/), Leadstone. Caltanissetta: la [pagina città del portale](https://xn--cittdigitali-19a.it/caltanissetta/). Varese: [VareseNews](https://www.varesenews.it/2026/04/varese-diventa-digitale-la-citta-si-puo-visitare-in-3d-con-un-click/2561725/) e [varesedigitale.it](https://varesedigitale.it/) | Alle query locali rispondono il portale e i portali delle città. Con Lecce torna l'iniziativa precedente |
| «"città digitale" significato smart city» | [Doppiozero](https://www.doppiozero.com/citta-digitale-e-smart-city-due-concetti-distinti), Agenda Digitale, osservatori sulle smart city | Intento informativo, fuori dal perimetro del sito |

### 2.2 Rischio di confusione

| Omonimo | Dove si sovrappone | Rischio | Livello |
|---|---|---|---|
| **«CITTA' DIGITALI»**, cittadigitali.it (di altri) | Stesso nome; dominio uguale salvo l'accento; Lecce in entrambi gli elenchi | **Sugli indirizzi.** Chi digita o copia l'indirizzo senza accento non arriva al portale. Il 2026-10-05 il dominio non si risolveva: se tornasse attivo, porterebbe al sito di altri. È già successo una volta: le linee guida (§22) e il sito fino a eb691ee. **Nelle SERP** compare solo con le query sul dominio e con le sue città | Alto sugli indirizzi, basso nelle SERP |
| **«Le Città Digitali»**, lecittadigitali.it (iComm Lab, Leadstone) | Nome quasi uguale, stesso fondatore, stesso concetto («abitare il Web»). Anche le città si sovrappongono: Lecce in SERP; Altamura e Martina Franca su www2.cittàdigitali.it, secondo `citta-digitali-elenco.md` §1 | **Attribuzione.** Indice e portale legano l'idea a iComm Lab, il sito a ITnode. Un motore generativo può rispondere che Città Digitali è di iComm Lab, o fondere le due iniziative | Alto per i motori generativi, medio nelle SERP |
| **Significato generico** («città digitale», smart city) | La query esatta senza altre parole | **Diluizione**: Treccani, ICity Rank e articoli occupano metà della SERP di marca. Chi cerca il progetto aggiunge di solito una parola (portale, tour virtuali, il nome di una città) | Medio. Non si combatte con la pagina: si aggira con i modificatori |
| **«Città Digitale»** al singolare, cittadigitale.it | Singolare e plurale; stesso pubblico degli enti (siti per i Comuni) | Un Comune che cerca «città digitale» trova un altro fornitore | Basso-medio |
| **Terze parti** (directory di franchising, IT System) | Non sono omonimi: parlano del progetto del cliente | Danno forma alla SERP di marca, con un tono da franchising e claim esclusi (X1) | Basso per la confusione |

### 2.3 Che cosa può fare il sito, e che cosa no

- **Il sito può:**
  - definire l'entità sempre con le stesse parole;
  - legarla a ITnode e al dominio con l'accento, nel testo e nei dati strutturati;
  - non citare e non linkare gli omonimi.

  Lo fa già, dopo eb691ee (§3).
- **Il sito non può:**
  - recuperare chi digita il dominio senza accento (O1);
  - correggere la pagina Chi siamo del portale e i profili (O2);
  - correggere le schede delle directory.

  Sono interventi fuori dal sito, che dipendono dal cliente.

## 3. Raccomandazioni per testi e dati strutturati

| Elemento | Raccomandazione | Perché |
|---|---|---|
| Title di `/citta-digitali/` | **Resta** «Città Digitali: le attività del territorio online \| ITnode» (58 caratteri) | Il nome è in testa, per la query di marca. «Le attività del territorio» lo separa dal significato generico. ITnode è nel suffisso. Una variante con «tour virtuali» sovrapporrebbe la pagina a `/siii/`, l'unica che ha «tour virtuale» come tema principale (ricerca keyword §4) |
| Meta description | **Variante con ITnode** (O3) | È il riassunto che i motori riprendono più spesso |
| H1 | **Resta** «Città Digitali» + «Le attività del territorio, online senza perdere radici.» | Il descrittore separa il nome dal significato generico. ITnode nell'H1 non serve: lo danno il title, il nome del sito, il Blocco E e i dati strutturati. Niente testo nascosto nell'H1 |
| Hero | **Dominio visibile** vicino a «Visita il portale» (O4) | Insegna la grafia giusta proprio dove si cerca il portale |
| Blocco E («L'Italia in un unico portale») | **Resta identico** | È la definizione che lega il nome a ITnode e a cittàdigitali.it, con la formula prudente di A1 e D5. Va ripresa uguale sul portale e sui profili (O2) |
| Altri testi della pagina | **Regole:** <ul><li>nel testo sorgente sempre «Città Digitali»: plurale, accento, due maiuscole (maiuscolo o maiuscoletto solo da CSS);</li><li>mai «città digitale», «Citta' Digitali» o «CITTA' DIGITALI»;</li><li>nessuna citazione né link a cittadigitali.it, lecittadigitali.it, Leadstone, cittadigitale.it;</li><li>nessun contenuto sul significato generico (smart city): non è l'intento della pagina.</li></ul> | §2.2 |
| Capitolo 03 della Home | **Resta com'è**: H3 «Città Digitali», testo con Varese, Altamura e Caltanissetta, CTA «Esplora Città Digitali» verso `/citta-digitali/`. **Con la mappa a 45 puntini** non serve un elenco di nomi nella Home, né visibile né nascosto: l'elenco completo sta su `/citta-digitali/` (§5) | Il legame con ITnode lo danno «I tre mondi ITnode» e il Blocco A della Home. Una pagina, un intento. Niente testo nascosto |
| Ancore verso il portale | **Restano**: «Visita il portale» con «Città Digitali» nel nome accessibile; nel footer e in Contatti il dominio con l'accento è visibile | Già conformi in `dist/` |
| Dati strutturati | **Tre proposte** a seo-technical (O6) | Coerenza tra testo e markup, entità distinte |

## 4. Osservazioni

### O1 · [IMPORTANTE] Chi digita l'indirizzo senza accento non arriva al portale

- **Dove.** Fuori dal sito: il dominio cittadigitali.it e ogni materiale che scrive il portale senza accento. Le linee guida §22 lo scrivevano così.
- **Problema.**
  - Il 2026-10-05 cittadigitali.it non si risolveva, e l'indice lo associa a «CITTA' DIGITALI» (http://www.cittadigitali.it/).
  - Chi sente «Città Digitali» e scrive l'indirizzo lo scrive spesso senza accento: per abitudine, con tastiere straniere, in campi che non accettano lettere accentate. Oggi trova un errore.
  - Se il dominio tornasse attivo, troverebbe il sito di altri.
- **Motivazione.**
  - Nelle query il motore ignora gli accenti, nei domini no (§2.1).
  - La ricerca di marca comincia spesso da un indirizzo digitato o copiato.
  - L'errore è già successo una volta, proprio nelle linee guida.
- **Proposta.**
  1. seo-technical, o il cliente, controlla lo stato di cittadigitali.it da una rete normale (whois): libero, registrato da altri, in scadenza.
  2. Se è libero, l'utente valuta con il cliente se registrarlo e reindirizzarlo con un 301 verso `https://xn--cittdigitali-19a.it/`, `www` compreso. È una decisione di business.
  3. Se è di altri, si scrive sempre l'indirizzo con l'accento nei materiali a stampa e nei video, meglio insieme a un QR code. Nelle bio dei profili si controlla che il link mostri l'accento e non `xn--`.
  4. Sul sito non serve altro: il dominio è già scritto con l'accento ovunque (§1).

### O2 · [IMPORTANTE] La definizione di Città Digitali non è la stessa su sito, portale e profili

- **Dove.**
  - itnode.it/citta-digitali/, Blocco E: «la rete e il portale nazionale con cui ITnode porta online…».
  - [cittàdigitali.it/chi-siamo/](https://xn--cittdigitali-19a.it/chi-siamo/): l'idea «nasce dalla visione di Giacomo Lenoci, CEO di iComm Lab» (brief A1).
  - [Dati aziendali](https://xn--cittdigitali-19a.it/dati-aziendali/) e Contatti del portale: ITNode Srl.
  - Profili Facebook e Instagram; schede delle directory.
- **Problema.** Tre versioni dello stesso soggetto: ITnode sul sito, iComm Lab nel Chi siamo, ITNode Srl nei dati societari. I riassunti dell'indice del 2026-10-05 riprendono già la versione iComm Lab.
- **Motivazione.**
  - Per essere citati correttamente dai motori generativi serve una definizione dell'entità coerente su sito e profili esterni.
  - Con un'iniziativa precedente così vicina («Le Città Digitali», stesso fondatore), la coerenza è il modo più semplice per tenere distinte le due entità.
- **Proposta.**
  1. Dopo le risposte a B4 e D5 (verdetto G4 §6), brand-strategist fissa la definizione ufficiale. Oggi è il Blocco E.
  2. Il cliente la riprende identica:
     - nella pagina Chi siamo del portale;
     - nelle bio dei profili, con un link a itnode.it.
  3. Se D5 conferma che Città Digitali continua «Le Città Digitali», la pagina Chi siamo lo dice in modo esplicito, con le parole che sceglierà brand-strategist. Così i motori leggono due entità collegate, non la stessa.
  4. Alla stessa condizione, la timeline della Home può nominare «Le Città Digitali» come tappa del fondatore. Oggi non la nomina. Decidono copywriter-brand e brand-strategist.
  5. Se può, il cliente aggiorna le schede delle directory con la stessa definizione, senza i claim X1. Non dipende da noi.

### O3 · [SUGGERIMENTO] Meta description di `/citta-digitali/` con ITnode

- **Dove.** `src/data/pages.ts`, voce `citta-digitali.description`; mappa keyword→URL §2 e §3.4.
- **Problema.** La meta attuale non nomina ITnode. Nella SERP di marca il legame si vede solo dal nome del sito e dal suffisso del title, che Google può riscrivere.
- **Motivazione.** I motori, anche quelli generativi, usano spesso la meta come riassunto della pagina. Con l'attribuzione a iComm Lab che circola (O2), ripetere il legame con ITnode costa poco.
- **Proposta.**
  > Città Digitali è il portale con cui ITnode porta online le attività di città come Varese, Altamura e Caltanissetta con tour virtuali e strumenti digitali.
  - **Verifiche:** 154 caratteri, contati con uno script; unica fra le pagine del sito.
  - **Formula:** è quella prudente di A1 e D5, la stessa del Blocco E.
  - **Cosa toglie:** «Siti Interattivi Immersivi», che resta nel testo e nel sottotitolo.
  - **Come si applica:** se l'utente la accetta, la sessione principale aggiorna `pages.ts`, e la `description` del WebPage nel JSON-LD si aggiorna da sola. Io aggiorno la mappa §2.

### O4 · [SUGGERIMENTO] Il dominio con l'accento visibile vicino alla CTA della hero

- **Dove.** `/citta-digitali/`, hero, CTA «Visita il portale».
- **Problema.** Nella hero il portale è un pulsante senza indirizzo. Il dominio con l'accento si vede solo nel Blocco E, dopo il video, e nel footer.
- **Motivazione.** Chi arriva dalla SERP di marca cerca il portale proprio lì. Vedere «cittàdigitali.it» insegna la grafia giusta (O1). Non è un fattore di posizionamento.
- **Proposta.** Una riga breve sotto la CTA con «cittàdigitali.it», come già in Contatti.
  - Decidono copywriter-content e ux-designer.
  - Serve il creative-director se cambia la composizione della hero.

### O5 · [SUGGERIMENTO] «Le Città Digitali» su www2 dello stesso dominio del portale

- **Dove.** Fuori dal sito: `www2.cittàdigitali.it`, che secondo `citta-digitali-elenco.md` §1 ha il nome «Le Città Digitali» e pagine comune di Altamura e Martina Franca.
- **Problema.** Sullo stesso dominio convivono due nomi, «Le Città Digitali» e «Città Digitali». Per le stesse città ci possono essere pagine doppie, su www2 e sul portale.
- **Motivazione.** Pagine doppie si contendono le query locali e confermano ai motori la fusione delle due entità (O2).
- **Proposta.** Dopo la risposta a D5, il cliente:
  - consolida www2 sul portale principale, con un 301 da ogni pagina verso la sua corrispondente;
  - oppure la esclude dall'indice, se deve restare online.

  seo-technical dà l'indicazione tecnica. Non tocca il sito ITnode.

### O6 · [SUGGERIMENTO] Dati strutturati del Brand Città Digitali, per seo-technical

- **Dove.** `src/lib/structured-data.ts` (`organization().brand`); `docs/seo/dati-strutturati.md` §5.1.
- **Stato attuale: corretto.** Dopo eb691ee il nodo Brand ha `url` `https://xn--cittdigitali-19a.it/` e un `@id` stabile, e la WebPage di `/citta-digitali/` ha `about` verso il Brand. La forma dell'indirizzo è decisa nelle specifiche §5.3: senza www, punycode nel markup. Io mi allineo.
- **Proposte.**
  1. **`sameAs` solo con i profili ufficiali**, confermati dal cliente. Oggi i candidati sono https://www.facebook.com/cittadigitali e https://www.instagram.com/citta_digitali/ `[DA VERIFICARE]`.
     - Mai cittadigitali.it, lecittadigitali.it, cittadigitale.it, Leadstone, IT System o le directory: unirebbero entità diverse.
  2. **`description` dalla prima frase del Blocco E**, che è visibile in pagina e nomina ITnode: «Rete e portale nazionale con cui ITnode porta online le attività del territorio, senza che perdano le proprie radici.» (117 caratteri).
     - Oggi la `description` riprende il sottotitolo della hero, ma nell'ordine della DR2, diverso da quello visibile. Lo ha già segnalato seo-technical (review del 2026-09-28, oss. 9).
  3. **Nessun `alternateName`** per il Brand: né «Le Città Digitali», né «CITTA' DIGITALI», né la grafia senza accento, che il motore gestisce già da solo.
- **Da non fare.** Nessun `logo` del Brand finché non arriva il marchio vettoriale ufficiale (verdetto G4 §6, C5).
- **Motivazione.** Il markup deve corrispondere al testo visibile. Con omonimi così vicini, `sameAs` e `description` sono i due segnali che separano le entità.

### O7 · [IMPORTANTE] Sette documenti del team citano ancora il dominio senza accento

- **Dove.** Righe al 2026-10-05:

  | Owner | File e righe | Che cosa |
  |---|---|---|
  | copywriter-content | `docs/contenuti/copy-deck/citta-digitali.md`, righe 57, 78, 254 | CTA della hero, testo del Blocco E, nota da verificare |
  | copywriter-content | `docs/contenuti/copy-deck/contatti.md`, righe 145–147, 155 | Link, nome accessibile, URL e nota del blocco Portali |
  | copywriter-brand | `docs/contenuti/microcopy.md`, riga 57 | Footer, Portali |
  | copywriter-brand | `docs/contenuti/tone-of-voice.md`, riga 71 | La regola «Domini… esattamente come nelle linee guida»: per questo dominio le linee guida sono sbagliate |
  | ux-designer | `docs/ux/sitemap.md`, riga 149 | Footer, Portali |
  | ux-designer | `docs/ux/struttura-pagine.md`, riga 356 | CTA della hero di Città Digitali |
  | cro-specialist | `docs/cro/strategia-conversione.md`, riga 97 | Destinazione della CTA della hero |

  - I documenti di seo-technical sono già aggiornati (specifiche §5.3, dati strutturati §5.1).
  - `docs/cro/piano-misurazione.md`, riga 198, non è un errore: `cittadigitali` è un'etichetta `utm_source` e deve restare in ASCII.
  - Le linee guida §22 restano com'erano: sono la fonte del cliente, e la correzione è registrata nel brief (S7, omonimie).
  - Le review del 2026-09-28 sono storiche e non si toccano.
- **Problema.** Copy deck, microcopy e struttura delle pagine sono le fonti da cui si scrivono testi e codice. Chi li riprende reintroduce il dominio sbagliato, com'è successo con le linee guida.
- **Motivazione.** Soglia SEO e veridicità: il sito deve linkare il portale del cliente, non un omonimo.
- **Proposta.**
  1. Ogni owner corregge i propri file; coordina la sessione principale.
  2. seo-technical aggiunge a `check:seo` o `check:launch` un controllo che fallisce se nella build compare `cittadigitali.it` senza accento.

## 5. Città dell'elenco: implicazioni SEO locali

Valgono quando il testo della pagina «Tutte le città» è confermato e i nomi escono dal `[DA VERIFICARE]` (`citta-digitali-elenco.md` §4).

**Che cosa conviene.**
1. **Un solo elenco**, su `/citta-digitali/`, nella sezione «L'Italia in un unico portale» o subito dopo. In HTML, come lista raggruppata per regione.
2. **Nomi ufficiali dei comuni, con la sigla della provincia**: «Polignano a Mare (BA)», «San Cataldo (CL)». Aiutano persone e motori a distinguere: San Cataldo è anche una marina di Lecce.
3. **Un link per ogni città** verso la sua pagina sul portale o verso il portale della città, solo se l'indirizzo è verificato. Niente indirizzi dedotti (`citta-digitali-elenco.md` §2).
4. **Data e fonte** dell'elenco, per esempio «Elenco aggiornato a [mese anno]».
   - I dati stanno in un punto solo (`src/data/site.ts`), condiviso con la mappa: elenco e puntini non possono divergere.
5. **Il numero** («45 città») solo alle condizioni di brand-strategist: testo confermato, data, stesso numero di puntini.

**Che cosa porta.**
- **Prova di N12.** L'entità Città Digitali si lega a città reali: «L'Italia in un unico portale» resta vera, perché si vedono le città.
- **Motori generativi.** Una fonte verificabile per domande come «in quali città è presente Città Digitali?».
- **Link utili.** I link portano alle pagine città del portale, che sono i risultati giusti per le query locali (§2.1).
- **Query locali per itnode.it.** L'effetto è piccolo, ed è giusto così.

**Che cosa evitare.**
1. **Pagine locali su itnode.it**, una per città o del tipo «tour virtuali a [città]». Sarebbero doorway page senza contenuto proprio, in concorrenza con le pagine città del portale e con i portali delle città.
2. **Elenchi nascosti o paragrafi di nomi in fila** (keyword stuffing), ed elenchi di nomi nella Home.
3. **Le città come aree servite di Google Business Profile.**
   - Le aree servite non dovrebbero andare oltre circa 2 ore di guida dalla sede, e sono al massimo 20 ([Google](https://support.google.com/business/answer/9157481?hl=en)). Varese e la Sicilia sono molto più lontane da Acquaviva.
   - La scheda di ITnode descrive l'azienda di Acquaviva delle Fonti.
4. **Una scheda Google Business Profile che unisce i nomi** («ITnode – Città Digitali»). Le linee guida non lo ammettono ([Google](https://support.google.com/business/answer/3038177?hl=en)).
   - Una scheda separata per Città Digitali, allo stesso indirizzo, è possibile solo se il marchio opera in modo indipendente `[DA VERIFICARE con il cliente]`.
   - Altrimenti Città Digitali va fra i servizi e nella descrizione della scheda ITnode.
5. **Nomi di città nel title e nella meta**, oltre ai tre attuali.

**Rischi specifici.**
- **Lecce.** È anche nell'elenco dell'omonimo «CITTA' DIGITALI», e nella SERP di «Città Digitali Lecce» compare l'iniziativa precedente. La difesa migliore è il link alla pagina giusta del portale.
- **Otto comuni pugliesi**: Alberobello, Gallipoli, Martina Franca, Monopoli, Ostuni, Polignano a Mare, San Giovanni Rotondo, Trani.
  - Sono gli stessi della prima fase di puglia-digitale.it, il portale dell'associazione Campo e controcampo con il contributo del Consiglio regionale (ricerca keyword §2, punto 3).
  - Elencarli va bene, se sono sul portale del cliente. I testi però non devono far pensare a un ruolo nel progetto regionale (D1, A2).
  - Per brand-strategist è un indizio utile per D1.
- **Le 31 città pugliesi.** Se sono anche le «30+ città» di Puglia Digitale (ipotesi di brand-strategist), le pagine `/citta-digitali/` e `/puglia-digitale/` rischiano di elencare le stesse città. Proposta:
  - l'elenco completo solo su `/citta-digitali/`;
  - `/puglia-digitale/` tiene i suoi tre luoghi e rimanda all'elenco, se D5 conferma il perimetro comune.
- **Città della piattaforma precedente.** Se l'elenco ne comprende alcune, il link va alla pagina del portale principale, non a www2 (O5).

**Dati strutturati.** L'elenco non ha bisogno di markup: non produce risultati arricchiti. È facoltativo, a giudizio di seo-technical, aggiungere nodi `City` in `mentions` della WebPage, con `sameAs` a Wikidata e solo per le città visibili. Può servire per i nomi ambigui.

## Verdetto di dominio (SEO dei contenuti)

**Conforme, con raccomandazioni.**
- **Il sito.** Dopo eb691ee scrive e linka il portale giusto in ogni pagina. `/citta-digitali/` distingue il nome dagli omonimi nel title, nell'H1, nel Blocco E e nei dati strutturati.
- **Nessuna osservazione blocca la pubblicazione.**
- **Restano:**
  - due rischi che il sito da solo non chiude: O1 e O2, che dipendono dal cliente;
  - due miglioramenti piccoli: O3 e O4;
  - una pulizia sul portale: O5;
  - le proposte a seo-technical: O6;
  - l'allineamento dei documenti del team: O7.

Il verdetto di gate spetta al creative-director.

## Fonti

Consultate il 2026-10-05, tramite gli estratti dei risultati di WebSearch. Le pagine non sono state aperte. Per il portale del cliente, bloccato dalla policy di rete, non ho cercato copie in cache né archivi.

- **Portale del cliente:**
  - [Home](https://xn--cittdigitali-19a.it/), [Il progetto](https://xn--cittdigitali-19a.it/il-progetto/), [Chi siamo](https://xn--cittdigitali-19a.it/chi-siamo/), [Franchising](https://xn--cittdigitali-19a.it/franchising/), [Dati aziendali](https://xn--cittdigitali-19a.it/dati-aziendali/), [Contatti](https://xn--cittdigitali-19a.it/contatti/), [Tutte le città](https://xn--cittdigitali-19a.it/tutte-le-citta/), [Caltanissetta](https://xn--cittdigitali-19a.it/caltanissetta/);
  - profili: [Facebook](https://www.facebook.com/cittadigitali), [Instagram](https://www.instagram.com/citta_digitali/).
- **Omonimo senza accento:** [CITTA' DIGITALI](http://www.cittadigitali.it/), [Biella Città Digitale](http://www.cittadigitali.it/biella/index.htm), [Serate digitali](http://www.cittadigitali.it/biella/serate-digitali.htm), [Banca Sella, corso di e-commerce a Biella](https://www.sellagroup.eu/-/economia-digitale-banca-sella-organizza-un-nuovo-corso-di-e-commerce-a-biella).
- **Iniziativa precedente:** [Le Città Digitali](https://www.lecittadigitali.it/), [l'iniziativa](https://www.lecittadigitali.it/iniziativa), [Leadstone](https://www.leadstone.it/citta_digitali.html), [giacomolenoci.it, il nuovo progetto](https://www.giacomolenoci.it/il_nuovo_progetto.html), [blog di iComm Lab](https://blog.icommlab.com/lettera-aperta-del-nostro-d-dott-giacomo-lenoci/), [LinkedIn del fondatore](https://www.linkedin.com/in/giacomo-lenoci/).
- **Significato generico:** [Treccani](https://www.treccani.it/vocabolario/citta-digitale_(Neologismi)/), [ElettricoMagazine](https://elettricomagazine.it/attualita-news/citta-digitali-tecnologia-rinnovabili-decarbonizzazione/), [Strategie Amministrative](https://www.strategieamministrative.it/dettaglio-news/201610181239-le-citta-digitali-tecnologia-partecipazione-e-governance/), [FPA, ICity Rank 2025](https://www.forumpa.it/citta-territori/icity-rank-2025-le-16-citta-leader-dellinnovazione-in-italia/), [ZeroUno](https://www.zerounoweb.it/cio-innovation/pa-digitale/smart-city-in-italia-quali-sono-le-citta-digitali-nel-nostro-paese/), [Doppiozero](https://www.doppiozero.com/citta-digitale-e-smart-city-due-concetti-distinti).
- **Al singolare:** [cittadigitale.it](https://www.cittadigitale.it/), [canale YouTube «Città Digitale»](https://www.youtube.com/channel/UCCNwgXUikrzPr4XAxxF7poQ).
- **Terze parti:**
  - [IT System](https://www.itsystemonline.it/citta-digitali/);
  - directory: [Infofranchising](https://www.infofranchising.it/citta-digitali-franchising-pubblicita-aziende/), [BeTheBoss](https://www.betheboss.it/franchising/citta-digitali/), [AprireInFranchising](https://www.aprireinfranchising.it/citta-digitali-franchising-pubblicita-aziende), [TuttiFranchising](https://www.tuttifranchising.it/citta-digitali-trasformazione-digitale-pmi/), [Franchising.cloud](https://www.franchising.cloud/citta-digitali-franchising-pubblicita-e-digital-transformation-pmi/), [«comuni digitali A domicilio»](https://www.franchising.cloud/comuni-a-domicilio/).
- **Città:** [VareseNews](https://www.varesenews.it/2026/04/varese-diventa-digitale-la-citta-si-puo-visitare-in-3d-con-un-click/2561725/), [varesedigitale.it](https://varesedigitale.it/).
- **Sito attuale nell'indice:** [itnode.it](https://itnode.it/).
- **Google Business Profile:** [linee guida per rappresentare l'attività](https://support.google.com/business/answer/3038177?hl=en), [aree servite](https://support.google.com/business/answer/9157481?hl=en).

## Ipotesi da validare

- `[IPOTESI: i profili Facebook @cittadigitali e Instagram @citta_digitali sono del progetto del cliente.]`
- `[IPOTESI: «CITTA' DIGITALI» di cittadigitali.it è l'iniziativa «Biella Città Digitale» di Banca Sella, o è legata a essa.]` Viene solo dagli estratti.
- `[IPOTESI: IT System è un affiliato o un rivenditore di Città Digitali.]`
- `[IPOTESI: la SERP di google.it per «città digitali» somiglia a quella dell'indice usato da WebSearch.]`
- `[IPOTESI: www2.cittàdigitali.it, «Le Città Digitali», è la piattaforma precedente.]` L'ipotesi è di brand-strategist.

## Domande aperte

- **Per il cliente**, tramite l'utente, da aggiungere all'elenco del verdetto G4 §6:
  1. Sapete chi possiede cittadigitali.it, senza accento? Se è libero, vi interessa registrarlo? (O1)
  2. I profili Facebook @cittadigitali e Instagram @citta_digitali sono vostri? (O6)
  3. La pagina Chi siamo del portale attribuisce l'idea a iComm Lab: la aggiornate insieme alla risposta a D5? (O2)
  4. IT System (itsystemonline.it) è un vostro affiliato? (§2.1)
  5. www2.cittàdigitali.it è ancora online? Va dismesso o reindirizzato? (O5)
  6. Esiste, o volete, una scheda Google Business Profile per Città Digitali, separata da quella di ITnode? (§5)
- **Per seo-technical:**
  - lo stato del dominio senza accento (O1);
  - le proposte sul Brand (O6);
  - il controllo di regressione (O7).
- **Per brand-strategist:**
  - la definizione ufficiale dopo B4 e D5 (O2);
  - gli otto comuni in comune con puglia-digitale.it, come indizio per D1 (§5).
- **Per copywriter-content e ux-designer:** O4.

## Decisioni richieste

- **Utente**, con il cliente:
  - registrare il dominio senza accento, se è libero (O1);
  - accettare la meta description di O3.
- **Sessione principale:**
  - applicare O3 in `src/data/pages.ts`, se accettata;
  - coordinare la correzione di O7 fra gli owner;
  - aggiungere le domande per il cliente all'elenco del verdetto G4 §6.
- **seo-technical:** O6 e il controllo di regressione di O7.
- **copywriter-content e ux-designer:** O4; il creative-director, se cambia la composizione della hero.
- **brand-strategist:** O2, dopo B4 e D5.
- **seo-content:** le correzioni ai miei documenti sono già fatte (§1). Aggiorno la mappa §2 quando O3 è decisa.
