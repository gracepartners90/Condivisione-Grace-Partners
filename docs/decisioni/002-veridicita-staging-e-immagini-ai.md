---
titolo: "ADR 002 · Veridicità: testi del cliente in staging, conferma o riserva al go-live; immagini elaborate con AI"
owner: brand-strategist
contributi: [creative-director, sessione principale]
stato: proposta
versione: 0.3
aggiornato: 2026-10-08
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/review/2026-09-28-sito-veridicita-brand-strategist.md, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (§3.7, §3.8, §5.2, §6), docs/creativa/direzione-visiva.md (0.2: §4.2, §4.3, §7.3, §7.5; dalla 0.13: §4.5, §4.8), docs/decisioni/004-anteprima-su-railway.md, docs/contenuti/copy-deck/ (home, puglia-digitale, citta-digitali), codice letto il 2026-09-28 in sola lettura (src/pages/index.astro, src/pages/puglia-digitale.astro, src/pages/citta-digitali.astro, src/pages/siii.astro, src/lib/structured-data.ts, src/data/site.ts, src/data/media.ts, src/data/figures.ts), docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md (decisione 5, S1), docs/contenuti/alt-text.md (1.6), docs/review/2026-10-08-hero-siii-yes-brand-strategist.md, parole esatte dell'utente del 2026-10-08 riportate dalla sessione principale, codice letto il 2026-10-08 in sola lettura (src/data/media.ts, src/pages/siii.astro, src/data/asset-slots.ts, scripts/prelaunch-check.mjs; dist/ della build di 1112c93), ricerche web del 2026-10-08 (brief consolidato §8)]
---

# ADR 002 · Veridicità in staging e al go-live; immagini elaborate con AI

| Campo | Valore |
|---|---|
| Stato | **Proposta, pronta per l'approvazione dell'utente.** Si approvano la regola (§1) e i testi di riserva (§3), cioè le parole esatte che vanno online se il cliente non conferma per iscritto entro il lancio. Dalla 0.3 anche le regole sul consenso delle imprese, la riserva della hero di `/siii/` (§3.1) e il testo della richiesta di consenso (§3.2). |
| Data | 2026-09-28; aggiornato il 2026-10-08 |
| Owner | brand-strategist (registro dei claim e scelta delle riserve, condizione C06); creative-director per le immagini |
| Versioni | 0.1: prima stesura. 0.2: allineata al codice e con le riserve scritte per esteso (verdetto G4, §3.7). 0.3: A7 vale per ogni impresa di cui il sito mostra una schermata, compreso il negozio YES nella hero di `/siii/`; consenso impresa per impresa, anche nel controllo di go-live (proposta); riga con nome e comune sotto la hero; nuova voce A8 (chi ha realizzato il SIII di YES); contesto dell'anteprima aggiornato (aperta dal 2026-09-29) |

## Contesto

- La soglia n. 1 di CLAUDE.md vieta clienti, numeri, risultati e partnership inventati. Le linee guida chiedono di non cambiare il significato dei testi del cliente.
- Alcuni testi del cliente contengono affermazioni che il team non ha potuto verificare. Tra queste:
  - «ITnode ha creato Città Digitali e Puglia Digitale» (brief D1; esistono omonimie);
  - «La forza di un portale ad alto traffico», senza dati di traffico;
  - i numeri di Puglia Digitale, senza fonte né anno;
  - «10.000+ clienti, prima di ITnode», senza perimetro.
- Le foto del fondatore e la foto dell'evento sono generate o ritoccate con strumenti di AI (brief I7; il file della foto dell'evento porta la filigrana di un editor generativo). L'AI Act, art. 50, prevede obblighi di trasparenza.
- Lo staging esiste ed è fuori dai motori di ricerca: è l'anteprima su Railway, sempre `noindex` (ADR 004). Fino al 2026-09-29 era protetta da password; da allora è aperta a chi ha il link, per decisione dell'utente.
- Dal 2026-10-07 il sito mostra schermate vere delle esperienze SIII: Home, capitolo 01; `/siii/`, hero ed esempi. Mostrano spazi, loghi e nomi di imprese reali.
- Dal 2026-10-08 la hero di `/siii/` mostra un negozio con il logo «YES» (commit 1112c93). È l'unica impresa del sito che non viene dalle linee guida: non è tra i tre esempi della LG §12. L'utente l'ha chiesta con queste parole: «scusami usa questa non quella». Poco prima, per un'altra schermata, aveva scritto: «usa questa come immagine iniziale della sezione SIII». Non ha detto chi ha realizzato il SIII, né il nome ufficiale dell'impresa, né il comune.

## Opzioni considerate

1. **Pubblicare subito le riserve ovunque.** Pro: rischio minimo. Contro: cambia il significato dei testi del cliente prima che il cliente li abbia rivisti.
2. **Testi del cliente in staging; al go-live conferma scritta oppure riserva** (proposta). Pro: il cliente rivede il sito con le sue parole e risponde alle domande; nessun claim non verificato va in produzione. Contro: lo staging deve restare protetto e non indicizzabile.
3. **Pubblicare i testi del cliente così come sono.** Esclusa: viola la soglia n. 1 se un'affermazione risulta falsa.

## Decisione proposta

### 1. La regola (opzione 2)

- **Staging.** Mostra i testi del cliente e i materiali inviati dall'utente, per esempio le schermate SIII, con le domande allegate al link. Dove il codice applica già una riserva, il cliente vede la versione da lancio (§2).
- **Ritiro immediato.** Se un'impresa nega il consenso o chiede di togliere i suoi contenuti, questi escono subito anche dall'anteprima, che è aperta a chi ha il link. Non si aspetta il go-live.
- **Go-live.** Ogni claim del §3 va online solo in uno di due modi:
  - con una **conferma scritta del cliente**, registrata dalla brand-strategist nel registro dei claim del brief consolidato (§5), con data e forma (email o documento);
  - oppure nel **testo di riserva** della tabella del §3.
- **Chi fa che cosa.**
  - Il cliente risponde.
  - La brand-strategist registra la risposta e sceglie tra testo confermato e riserva.
  - La sessione principale applica.
  - `npm run check:launch` blocca la pubblicazione se una riserva senza conferma non è applicata (esteso come da N10 del verdetto G4).
- **Conferme tardive.** Una conferma che arriva dopo il lancio riporta online il testo del cliente senza un nuovo ADR: basta registrarla.

### 2. Che cosa è già applicato nel codice (verificato il 2026-09-28)

- **Home, «Chi siamo»** (`src/pages/index.astro`, righe 49–52). Dal commit 029a0ab usa la formula prudente del copy deck (regola DR4), non il testo delle linee guida:
  > «ITnode è un’azienda di Acquaviva delle Fonti, in provincia di Bari, che rende gli spazi fisici esplorabili sul Web. Crea Siti Interattivi Immersivi (SIII) per le imprese. Con i Tour Virtuali Interattivi Immersivi porta online luoghi, imprese e attività in due progetti di digitalizzazione territoriale: Città Digitali e Puglia Digitale.»
- **JSON-LD** (`src/lib/structured-data.ts`; testo in `src/data/site.ts`, riga 34).
  - `Organization.description` usa la formula prudente:
    > «ITnode rende esplorabili sul Web gli spazi reali di imprese e territori: crea Siti Interattivi Immersivi (SIII) e, con Città Digitali e Puglia Digitale, porta online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.»
  - Il nodo `brand` contiene solo Città Digitali: Puglia Digitale non è dichiarata come marchio di ITnode (riga 61).
- **Pagine Puglia Digitale e Città Digitali.** Formula prudente: «Con Puglia Digitale, ITnode porta online…», «con cui ITnode porta online…».
- **Note AI** (`src/data/media.ts`).
  - Sotto i ritratti: «Immagine generata o elaborata con strumenti di intelligenza artificiale».
  - Sotto la foto dell'evento, in Home e in Puglia Digitale: «Immagine elaborata con strumenti di intelligenza artificiale».
- **Altre correzioni già applicate:** etichetta del 60% (I9); esempi SIII senza coordinate accanto al nome dell'impresa (I10).

**Correzione rispetto alla versione 0.1.** La v0.1 diceva che il testo visibile della Home restava quello delle linee guida fino alla risposta del cliente. Non è più così: la riserva B1 è già nel codice, e quindi anche nell'anteprima, sia nel testo della Home sia nel JSON-LD.

**Verificato il 2026-10-08 (A7), sulla build di 1112c93.**
- **Hero di `/siii/`** (`src/data/media.ts`, righe 62–65; `src/pages/siii.astro`, righe 71–84). Mostra la schermata `siii-yes-mobile-negozio.jpg`. Sui telefoni il ritaglio 4:5 è ancorato in alto, quindi il logo «YES» resta nell'immagine a ogni larghezza. È piccolo, però: circa 60 px di lato da 64em e circa 50 px su un telefono largo 390 px.
- **Nome.** L'alt provvisorio nomina l'impresa: «YES da smartphone: …». In tutto `dist/` «YES» compare solo lì: non è nel testo visibile né nel JSON-LD.
- **Controllo di go-live** (`scripts/prelaunch-check.mjs`, righe 22 e 54–60). Blocca la pubblicazione se nella build c'è una schermata SIII (`_astro/siii-…-desktop-` o `-mobile-`) e `CONFIRMED.showcaseConsent` non è `true`. Copre anche la hero: in `dist/siii/index.html` i file `siii-yes-mobile-negozio.*` compaiono in cinque righe (214–219). L'interruttore però è uno solo per quattro imprese (§3.1).

### 3. Riserve di go-live: i testi da approvare

| ID | Dove | Testo del cliente, oggi in staging | Conferma che serve | Al go-live senza conferma | Nel codice |
|---|---|---|---|---|---|
| **B1** | Home, «Chi siamo»; JSON-LD di tutte le pagine (`description`, `brand`) | «Ha creato Città Digitali e Puglia Digitale…» (LG §07) | D1: ruolo di ITnode in Puglia Digitale e titolare del marchio. D5: gestione di Città Digitali | La formula prudente del §2, nel testo e nel JSON-LD. Il nodo `brand` di Puglia Digitale resta sospeso. Il nodo `brand` di Città Digitali resta, salvo smentita del cliente su D5 | **Applicata** |
| **B2** | Città Digitali, «Come funziona», punto 05 | «La forza di un portale ad alto traffico» | Export degli analytics del portale, con metrica e periodo (N8) | Titolo «La forza di un portale nazionale»; il testo del punto non cambia | Da applicare alla scadenza |
| **B3** | Puglia Digitale, «I numeri dei territori coinvolti» | «30+ città coinvolte», «~200.000 partite IVA nei territori coinvolti», «60% del tessuto produttivo pugliese è in questi territori»; nota «Dati ITnode.» | «30+»: numero, perimetro (solo città pugliesi?), mese e anno. «~200.000» e «60%»: fonte, anno e definizione | «~200.000» e «60%» **non si pubblicano**. «30+» si pubblica solo con la conferma di numero e perimetro e con la nota «Dati ITnode, aggiornati a [mese anno].», nella composizione a un numero della DV §7.5 («30+» in `display-xxl` dalla colonna 3, etichetta e nota; titolo al singolare scritto da copywriter-brand). Senza conferma nemmeno del «30+», la sezione non si pubblica e il layout resta pronto | Da applicare alla scadenza |
| **I2** | Home, timeline del fondatore, tappa «Dal 2002» | «10.000+ clienti, prima di ITnode» | Perimetro: quali aziende, quale periodo, clienti o utenti (N5) | Il numero si toglie; la tappa resta con data e titolo (DV §7.3) | Da applicare alla scadenza |
| **I6** | Home, H2 «I tre mondi ITnode»; Puglia Digitale, CTA «Aderisci a Puglia Digitale» | Come a sinistra | D1 | **Se D1 dice «partner tecnologico»:** H2 «I tre mondi»; CTA «Porta la tua impresa in Puglia Digitale», a meno che il cliente confermi di gestire le adesioni. **Se D1 resta senza risposta:** H2 «I tre mondi»; la CTA resta, perché l'adesione è l'offerta delle linee guida (LG §16) | Da applicare alla scadenza |
| **Foto dell'evento** (B4, C07) | Home, «Documento» (ritagli Panorama e Città); Puglia Digitale (ritaglio Schermo) | Foto con la filigrana di un editor generativo | L'originale dello scatto, senza cornice né sovrimpressioni, con luogo, data e autore; che cosa è stato modificato; conferma dell'informativa sulle riprese data ai partecipanti | Resta la nota «Immagine elaborata con strumenti di intelligenza artificiale» finché non arrivano l'originale e la conferma del cliente. Nessuna didascalia con data, luogo, nomi o numero di partecipanti; l'oratore non si nomina. Senza conferma dell'informativa, ui-designer stringe i ritagli su schermi e palco, escludendo i profili riconoscibili (DV §4.2), e il creative-director li verifica | Nota applicata; ritagli da fare se manca l'informativa |

**Note alla tabella.**
- **B1, dopo la risposta a D1.**
  - (a) ITnode è ideatore e titolare di marchio e portale: si usa il testo delle linee guida ovunque e si ripristina il nodo `brand`.
  - (b) ITnode è partner tecnologico: «Ha creato Città Digitali e fornisce la tecnologia di Puglia Digitale: due progetti di digitalizzazione territoriale che…», più la riserva I6.
- **I6 senza risposta.** Decisione della brand-strategist, come owner del registro: «I tre mondi» costa una parola e toglie l'unico possessivo della Home che attribuisce Puglia Digitale a ITnode.
- **I6, caso limite.** Se D1 dicesse che ITnode non porta nemmeno le imprese dentro il portale, nessuna riserva testuale basta. Vanno ridiscussi con il cliente la chiusura della pagina (titolo, CTA e form) e il titolo «Perché aderire a Puglia Digitale».

**Altre riserve della condizione C06**, già registrate nella review di veridicità e nel verdetto G4 (§6):

| ID | Claim | Al go-live senza conferma |
|---|---|---|
| I1, I3 | Nome e ruolo del fondatore; anni e grafie della timeline | Escono come sono (dati delle linee guida e del profilo indicato dal cliente; rischio basso). Con la risposta si allineano Home, Contatti e JSON-LD (per esempio «co-fondatore» o «fondatore e CEO») |
| I4 | Video di Città Digitali | Si pubblica solo dopo che qualcuno del team l'ha visto e ha elencato ciò che compare a schermo. Se contiene claim esclusi dal registro, non si pubblica, oppure si monta una versione senza quei claim |
| I5 | Provenienza dei ritratti | Nota «Immagine generata o elaborata con strumenti di intelligenza artificiale». «Elaborata» da sola torna solo se il cliente conferma che sono foto reali ritoccate |
| I7 | Funzioni del SIII (`/siii/` e capitolo 01 della Home) | «Nel tuo SIII, in base alle funzioni che scegli, chi ti visita può:». «Vendita diretta» diventa «Dalla visita alla vendita», a meno che il cliente confermi che prenotazione o vendita partono dall'esperienza. Nella Home, al posto di «…chiede informazioni e prenota.», proposta «…chiede informazioni e, dove previsto, prenota.» (rifinitura di copywriter-brand) |
| I8 | «Tre Siti Interattivi Immersivi già online» | Un'esperienza che al lancio non risponde si toglie, e il numero nel testo si adegua |
| A7 | Consenso scritto di ogni impresa di cui il sito mostra una schermata: le tre degli esempi (LG §12) e YES, nella hero di `/siii/` dal 2026-10-08 | Impresa per impresa, come nel §3.1: senza il suo consenso escono le sue schermate e la sua riga con il nome |
| A8 | Il SIII di YES l'ha realizzato ITnode. Nessun testo lo dice, ma la hero della pagina che vende il SIII lo presuppone | Come A7 senza consenso: la schermata esce e la hero passa alla riserva del §3.1. Si chiude con il consenso del §3.2, che lo dichiara, oppure con una riga dell'utente |

### 3.1 A7 · Consenso delle imprese di cui il sito mostra le schermate

**Regole.**
- **Impresa per impresa.** Il consenso di un'impresa copre solo le sue schermate e il suo nome. Se un consenso manca, le altre imprese non si fermano.
- **Che cosa copre:** il nome, il comune, il logo e le schermate del SIII dell'impresa nel sito di ITnode (Home e `/siii/`) e, se l'esperienza è online, il link.
- **Forma.** Basta la conferma scritta dell'utente, impresa per impresa, con la data e la forma del consenso: email dell'impresa, documento o clausola del contratto con ITnode. L'originale resta al cliente. La brand-strategist registra la conferma nel brief consolidato (§5, «Consensi delle imprese»).
- **Riga con il nome.** Sotto la hero di `/siii/` e sotto il capitolo 01 della Home va una riga con il nome e il comune (DV §4.8; verdetto del creative-director del 2026-10-07, decisione 5). Va online solo con il consenso dell'impresa e solo con nome ufficiale e comune confermati. Se il consenso manca, schermata e riga escono insieme. Per YES nome e comune non ci sono: finché non arrivano, la hero resta senza riga e il nome sta solo nell'alt.

**Al go-live, senza consenso scritto:**

| Impresa | Dove nel sito | Perché c'è | Al go-live senza consenso |
|---|---|---|---|
| Masseria Santella | Home, capitolo 01; `/siii/`, primo esempio | LG §12 | Le sue schermate escono e tornano gli slot con la variante «in pubblicazione» (DV §4.5). La scheda dell'esempio resta, senza la schermata (LG §12). La riga con il nome del capitolo 01 non va online |
| Maison Miminà | `/siii/`, secondo esempio | LG §12 | La schermata esce e torna lo slot con la variante «in pubblicazione». La scheda resta |
| D.L. Natura Dentro | `/siii/`, terzo esempio | LG §12 | Come Maison Miminà |
| YES | `/siii/`, hero. Il nome è solo nell'alt | Richiesta dell'utente del 2026-10-08 | La schermata esce insieme al suo alt, e il nome non resta in nessun punto del sito. Nella hero va, in quest'ordine: (1) la sala di Masseria Santella da smartphone, se Masseria Santella ha dato il consenso. È la hero approvata dal creative-director il 2026-10-07 (decisioni 1 e 2, ritaglio ancorato in basso): è già misurata e ha il suo alt in `alt-text.md`. (2) Altrimenti la variante «in pubblicazione» dello slot `siii-anteprima` (DV §4.5). Un'altra schermata con consenso può prendere il posto della (1) solo con il parere del creative-director e la misura di web-performance-specialist, perché è l'elemento LCP |

- **I8 non cambia.** «Tre Siti Interattivi Immersivi già online» conta gli esempi con il link, non la hero.
- **Controllo di go-live (proposta).** Oggi `check:launch` ha un solo interruttore per tutte le imprese (`CONFIRMED.showcaseConsent`). Con tre consensi su quattro resterebbe tutto bloccato, oppure, con l'interruttore a `true`, passerebbe anche l'impresa senza consenso.
  - La proposta è un interruttore per impresa, con chiave il prefisso del file: `masseria-santella`, `maison-mimina`, `dielle`, `yes`.
  - Una schermata con una chiave non elencata fa fallire il controllo, così una nuova impresa non passa inosservata.
  - La patch è in `scratchpad/bs-yes/prelaunch-check-a7-per-impresa.patch` (review del 2026-10-08, R3). La applica la sessione principale.

### 3.2 Richiesta di consenso: testo proposto

Il cliente o l'utente lo manda a ogni impresa. `[IPOTESI: il consulente legale del cliente lo rivede prima dell'invio]`

> **Oggetto:** Il vostro SIII sul sito di ITnode
>
> Buongiorno,
> stiamo preparando il nuovo sito di ITnode e vorremmo mostrare il SIII che ITnode ha realizzato per [nome dell'impresa] come esempio del nostro lavoro. Useremmo [una schermata / alcune schermate] dell'esperienza, con il logo che vi compare, e scriveremmo il vostro nome e il comune[, con il link all'esperienza]. Le immagini sarebbero nella pagina dedicata ai SIII[ e nella Home].
> Ci autorizzate? Basta rispondere a questa email. Potrete chiederci di toglierle in qualsiasi momento scrivendo a info@itnode.it.

- La frase «il SIII che ITnode ha realizzato per [nome dell'impresa]» serve anche ad A8: un sì dell'impresa la conferma.
- Se il contratto di ITnode con l'impresa prevede già l'uso nel portfolio, basta dirlo nella conferma dell'utente (§3.1, «Forma»).

### 4. Immagini elaborate con AI (DR3)

- **Ritratti del fondatore: opzione (b)**, scelta della sessione principale in attesa dell'utente.
  - Si pubblicano solo in monocromia «inchiostro», con taglio stretto e maschere del G4: Home da `#000 40%` a `transparent 74%`; Contatti da `#000 36%` a `transparent 68%` (DV §4.3).
  - Nessuna didascalia che li leghi a luoghi o eventi.
  - Sotto, la nota I5.
- **Parere aggiornato del creative-director** (DV §4.3, 2026-09-28): **(b) per il lancio, (c) appena possibile.**
  - Il ritratto reale resta il miglioramento più forte dell'intero sito: toglie le note AI, lo skyline e l'aria da ritratto aziendale.
  - Il parere iniziale, (a) subito, è superato. Il vantaggio di (a), «un documento invece di un ritratto», vale solo con l'originale della foto dell'evento, che oggi porta anch'essa la nota AI.
  - La brand-strategist concorda. (b) con la nota è coerente con la soglia 1 perché l'immagine è dichiarata e non documenta nulla; (c) toglie il problema alla radice.
- **Foto dell'evento.** Solo ritagli, con le regole della riga «Foto dell'evento» del §3.
- **Come si tolgono le note**, sempre dopo il parere del consulente legale del cliente:
  - ritratti: interruttore `showAiNote` in `src/data/media.ts`;
  - foto dell'evento: costante `eventPhotoNote` nello stesso file, oggi sempre visibile. La nota si toglie quando arrivano l'originale dello scatto e la conferma del cliente.

## Conseguenze

- Il cliente riceve le domande con il link dell'anteprima (verdetto G4, §6) e una **scadenza**, fissata dall'utente. Alla scadenza si applicano le riserve dei claim senza conferma.
- La sessione principale estende `check:launch`:
  - con N10 del verdetto G4, per B2 e I2;
  - con la stessa logica, se lo ritiene utile, per I6 e I7;
  - per A7, impresa per impresa (§3.1; patch in `scratchpad/bs-yes/`).

  Il controllo passa solo con la riserva applicata o con la conferma registrata.
- L'anteprima resta fuori dai motori di ricerca (ADR 004) ed è aperta a chi ha il link dal 2026-09-29. Per questo vale il ritiro immediato del §1. Il sito non contiene `noindex` legati all'ambiente (specifiche SEO §3.2).
- Uno shooting reale del fondatore e dei luoghi toglie le note AI e rafforza la promessa del sito: spazi veri.

## Ipotesi da validare

- La nota proposta basta per l'art. 50 dell'AI Act `[DA VERIFICARE con il consulente legale]`.
- `[IPOTESI: i testi di riserva rispettano la voce di marca. copywriter-brand li rivede, senza cambiarne il significato: «I tre mondi», «Porta la tua impresa in Puglia Digitale», il titolo al singolare dei numeri, la frase I7 della Home.]`
- `[IPOTESI: il testo del §3.2 basta come consenso. Lo verifica il consulente legale del cliente.]`
- `[DA VERIFICARE: il SIII di YES l'ha realizzato ITnode (A8).]` Lo presuppone la richiesta dell'utente, che però non lo dice. In rete non c'è traccia né dell'impresa né dell'esperienza (ricerche del 2026-10-08). L'interfaccia somiglia a quella di Masseria Santella e Maison Miminà, ma questo è un indizio, non una prova.
- `[IPOTESI: «YES» è il nome con cui l'impresa si presenta.]` È la lettura del logo, che dice anche «pure design 100% flowers».

## Domande aperte

- **Per il cliente** (verdetto G4, §6, punti B3, B5–B10). In particolare:
  - ruolo in Puglia Digitale (D1);
  - traffico del portale;
  - fonte e data dei numeri;
  - perimetro di «10.000+»;
  - originale e informativa della foto dell'evento;
  - provenienza dei ritratti;
  - consenso scritto di ogni impresa di cui il sito mostra le schermate: Masseria Santella, Maison Miminà, D.L. Natura Dentro e YES (§3.1; testo nel §3.2);
  - per YES: chi ha realizzato il SIII (A8); nome ufficiale, comune e provincia; indirizzo dell'esperienza, se è online (brief consolidato, D12);
  - funzioni del SIII;
  - video.
- **Per l'utente:**
  - entro quale data il cliente deve rispondere, prima che si applichino le riserve?
  - il contratto di ITnode con le imprese prevede già l'uso nel portfolio? Se sì, per A7 basta dirlo (§3.1, «Forma»).

## Decisioni richieste

- **Utente:**
  - approvazione della regola del §1;
  - approvazione dei testi di riserva del §3;
  - DR3: (b) per il lancio e (c) appena possibile, con budget e tempi dello shooting;
  - scadenza per le risposte del cliente;
  - approvazione del §3.1 (consenso impresa per impresa, riserva della hero) e del testo del §3.2, da inoltrare alle quattro imprese.
- **Sessione principale:**
  - alla scadenza, applicare le riserve rimaste senza conferma; estendere `check:launch` (C13);
  - applicare la patch di A7 per impresa (§3.1). A ogni consenso registrato nel brief, mettere a `true` la chiave dell'impresa.
- **creative-director:** estendere la DV §4.8, che parla del consenso «delle tre imprese», a ogni impresa di cui il sito mostra una schermata; confermare la riserva della hero (§3.1).
- **copywriter-brand:** titolo al singolare per il solo «30+»; rifinitura della frase I7 della Home; la riga con il nome della hero, quando arrivano nome e comune di YES.
- **copywriter-content:** l'alt della hero (review del 2026-10-08, §2).
