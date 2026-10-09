---
titolo: "ADR 002 · Veridicità: testi del cliente in staging, conferma o riserva al go-live; immagini elaborate con AI"
owner: brand-strategist
contributi: [creative-director, sessione principale]
stato: proposta
versione: 0.8
aggiornato: 2026-10-09
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/review/2026-09-28-sito-veridicita-brand-strategist.md, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (§3.7, §3.8, §5.2, §6), docs/creativa/direzione-visiva.md (0.2: §4.2, §4.3, §7.3, §7.5; dalla 0.13: §4.5, §4.8), docs/decisioni/004-anteprima-su-railway.md, docs/contenuti/copy-deck/ (home, puglia-digitale, citta-digitali), codice letto il 2026-09-28 in sola lettura (src/pages/index.astro, src/pages/puglia-digitale.astro, src/pages/citta-digitali.astro, src/pages/siii.astro, src/lib/structured-data.ts, src/data/site.ts, src/data/media.ts, src/data/figures.ts), docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md (decisione 5, S1), docs/contenuti/alt-text.md (1.6), docs/review/2026-10-08-hero-siii-yes-brand-strategist.md, parole esatte dell'utente del 2026-10-08 riportate dalla sessione principale, codice letto il 2026-10-08 in sola lettura (src/data/media.ts, src/pages/siii.astro, src/data/asset-slots.ts, scripts/prelaunch-check.mjs, src/pages/index.astro; dist/ delle build di 1112c93 e c11734b), commit a5dac14 (controllo A7 per impresa) e c11734b (Home, capitolo 01), docs/review/2026-10-08-hero-siii-yes-creative-director.md, docs/creativa/direzione-visiva.md (0.20 e 0.21, §4.8), docs/review/2026-10-08-home-capitolo-siii-tana-di-aldo-creative-director.md, docs/contenuti/alt-text.md (1.11), docs/contenuti/copy-deck/home.md (1.8), commit 6c6f501, e406ecb e c112a4a, dist/ ricostruita con e406ecb e 6c6f501 (letta il 2026-10-09), ricerche web del 2026-10-08 (brief consolidato §8), src/assets/images/basilica-digitale.jpg e derivate/basilica-piattaforma.jpg (commit e398f46), src/pages/puglia-digitale.astro (righe 147–161), dist/puglia-digitale/index.html (letta il 2026-10-09), docs/decisioni/007-immagine-di-acquaviva-con-segni-grafici.md, docs/strategia/citta-digitali-elenco.md (riga 5), docs/review/2026-10-09-puglia-digitale-basilica-brand-strategist.md, docs/review/2026-10-09-puglia-digitale-basilica-creative-director.md (§3, §5), docs/decisioni/007-immagine-di-acquaviva-con-segni-grafici.md (1.2), docs/contenuti/alt-text.md (1.13), commit fd4f004 e 13c97a8, ricerche web del 2026-10-09 (brief consolidato §8), risposta dell'utente del 2026-10-09 («tutto autorizzato, vai e carica») al messaggio della sessione principale su consensi, conferme e diritti, commit 878d288]
---

# ADR 002 · Veridicità in staging e al go-live; immagini elaborate con AI

| Campo | Valore |
|---|---|
| Stato | **Proposta, pronta per l'approvazione dell'utente.** Si approvano la regola (§1) e i testi di riserva (§3), cioè le parole esatte che vanno online se il cliente non conferma per iscritto entro il lancio. Dalla 0.3 anche le regole sul consenso delle imprese, la riserva della hero di `/siii/` (§3.1) e il testo della richiesta di consenso (§3.2). Dalla 0.4 anche la riserva del capitolo 01 della Home (§3.1). |
| Data | 2026-09-28; aggiornato il 2026-10-08 e il 2026-10-09 |
| Owner | brand-strategist (registro dei claim e scelta delle riserve, condizione C06); creative-director per le immagini |
| Versioni | 0.1: prima stesura. 0.2: allineata al codice e con le riserve scritte per esteso (verdetto G4, §3.7). 0.3: A7 vale per ogni impresa di cui il sito mostra una schermata, compreso il negozio YES nella hero di `/siii/`; consenso impresa per impresa, anche nel controllo di go-live (proposta); riga con nome e comune sotto la hero; nuova voce A8 (chi ha realizzato il SIII di YES); contesto dell'anteprima aggiornato (aperta dal 2026-09-29). 0.4: La Tana di Aldo nel capitolo 01 della Home, quindi le imprese sono cinque; A8 vale anche per La Tana di Aldo; riserva del capitolo 01; controllo per impresa applicato (a5dac14). 0.5: correzione di stato. Alt definitivo della Home e grafia «della Tana di Aldo»; vista da smartphone del capitolo 01 (e406ecb); righe con il nome preparate nei copy deck; riserva del capitolo 01 confermata dal creative-director. 0.6: nuova voce A9, l'immagine della basilica in «Il progetto» di `/puglia-digitale/` (e398f46); la foto dell'evento resta solo in Home. 0.7: A9 allineata all'ADR 007 1.2: il luogo va nella didascalia e l'alt non cambia; sostituto della riserva; controllo di go-live (fd4f004). 0.8: risposta dell'utente del 2026-10-09. A7 e i diritti di A9 sono registrati; A8 vale per conferma implicita; restano aperti i dati (nomi ufficiali, comuni, luogo, uso di AI); regole per conservare i consensi |

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
- Dal 2026-10-08 la hero di `/siii/` mostra un negozio con il logo «YES» (commit 1112c93). Non è tra i tre esempi della LG §12. L'utente l'ha chiesta con queste parole: «scusami usa questa non quella». Poco prima, per un'altra schermata, aveva scritto: «usa questa come immagine iniziale della sezione SIII». Non ha detto chi ha realizzato il SIII, né il nome ufficiale dell'impresa, né il comune.
- Dal 2026-10-08 il capitolo 01 (SIII) della Home mostra da desktop la sala della Tana di Aldo, al posto di quella di Masseria Santella (commit c11734b). Dal commit e406ecb, sui telefoni in verticale, mostra un ritaglio 4:5 della vista da smartphone della stessa esperienza. Le parole dell'utente, inviate con la vista desktop e quella da smartphone: «questo è per la home la sezione SII, quella orizzontale, poi nel caso avessi bisogno della versione mobile ce l hai». Anche qui l'utente non dice chi ha realizzato il SIII, né il nome ufficiale, né il comune, e non parla di consenso.
- Masseria Santella ora compare solo tra gli esempi di `/siii/`. Le imprese del sito che non vengono dalle linee guida sono due: YES e La Tana di Aldo.
- Dal 2026-10-09 la sezione «Il progetto» di `/puglia-digitale/` mostra la facciata di una basilica romanica con i segni grafici del portale, al posto della platea dell'evento (commit e398f46). Le parole dell'utente: «mentre questa è per la pagina puglia digitale dove si parla della piattaforma, al posto della platea tagliata che si vede», poi «questa». L'utente non ha detto niente su luogo, autore, diritti, uso di AI o provenienza. Il file non ha metadati.
- Il 2026-10-09 l'utente ha risposto, con queste parole, al messaggio della sessione principale su consensi, conferme e diritti: «tutto autorizzato, vai e carica». Il messaggio chiedeva:
  - per la basilica: se è San Nicola a Bari, da dove viene l'immagine, chi ne ha i diritti, se è stata fatta con l'AI;
  - per YES e La Tana di Aldo: nome ufficiale, comune, conferma che i due SIII li ha realizzati ITnode, consenso scritto delle imprese;
  - per Masseria Santella, Maison Miminà e D.L. Natura Dentro: il consenso.

  La sessione principale ha messo a `true` le cinque chiavi A7 e `basilicaProvenance` (A9) nel controllo di go-live (commit 878d288). Che cosa la risposta chiude e che cosa no è al §3.4.

## Opzioni considerate

1. **Pubblicare subito le riserve ovunque.** Pro: rischio minimo. Contro: cambia il significato dei testi del cliente prima che il cliente li abbia rivisti.
2. **Testi del cliente in staging; al go-live conferma scritta oppure riserva** (proposta). Pro: il cliente rivede il sito con le sue parole e risponde alle domande; nessun claim non verificato va in produzione. Contro: lo staging deve restare non indicizzabile; e, poiché dal 2026-09-29 è aperto a chi ha il link, serve il ritiro immediato dei contenuti contestati (§1).
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
  - Sotto la foto dell'evento, in Home e in Puglia Digitale: «Immagine elaborata con strumenti di intelligenza artificiale». Dal commit e398f46 la foto, e con lei la nota, è solo in Home: su `/puglia-digitale/` non c'è più (verificato il 2026-10-09 su `dist/`).
- **Altre correzioni già applicate:** etichetta del 60% (I9); esempi SIII senza coordinate accanto al nome dell'impresa (I10).

**Correzione rispetto alla versione 0.1.** La v0.1 diceva che il testo visibile della Home restava quello delle linee guida fino alla risposta del cliente. Non è più così: la riserva B1 è già nel codice, e quindi anche nell'anteprima, sia nel testo della Home sia nel JSON-LD.

**Verificato il 2026-10-08 (A7), sulla build di c11734b.**
- **Hero di `/siii/`** (`src/data/media.ts`, `siiiHeroScreen`).
  - Sui telefoni c'è la schermata `siii-yes-mobile-negozio.jpg`, con il ritaglio 4:5 ancorato in alto.
  - Da 64em c'è il derivato 3:5 `derivate/siii-yes-desktop-negozio.jpg`, senza l'interfaccia tagliata in basso (verdetto del creative-director del 2026-10-08, decisione 3).
  - Il logo «YES» resta in tutte e due, ma è piccolo: da circa 50 a 72 px di lato.
- **Home, capitolo 01** (`src/data/media.ts`, `siiiHomeScreen`; `src/pages/index.astro`, capitolo 01).
  - Da 40em c'è la vista desktop `siii-la-tana-di-aldo-desktop-sala.jpg`, in 16:10, con il logo «La Tana di Aldo» in alto a sinistra.
  - Sui telefoni in verticale c'è il ritaglio 4:5 della vista da smartphone, `derivate/siii-la-tana-di-aldo-mobile-sala-4x5.jpg` (commit e406ecb). Il nome del file segue la convenzione, quindi il controllo A7 lo riconosce.
- **Nomi.** Gli alt nominano le due imprese: «Il negozio YES da smartphone: …» (definitivo, d97aa29) e «Il SIII della Tana di Aldo: …» (definitivo, 6c6f501, `alt-text.md` 1.11, uno per le due viste). In `dist/` i due nomi compaiono solo in questi alt: non sono nel testo visibile né nel JSON-LD. L'ho ricontrollato il 2026-10-09 sulla build con e406ecb e 6c6f501. Masseria Santella compare solo in `/siii/`, negli esempi.
- **Controllo di go-live** (`scripts/prelaunch-check.mjs`, righe 25–33 e 64–69). Dal commit a5dac14 è impresa per impresa: `SHOWCASE_CONSENT` ha cinque chiavi, compresa `la-tana-di-aldo`, tutte a `false`, e oggi il controllo elenca le cinque imprese. Riconosce anche il derivato di YES, perché il nome del file segue la convenzione `siii-<impresa>-desktop-<vista>`.

### 3. Riserve di go-live: i testi da approvare

| ID | Dove | Testo del cliente, oggi in staging | Conferma che serve | Al go-live senza conferma | Nel codice |
|---|---|---|---|---|---|
| **B1** | Home, «Chi siamo»; JSON-LD di tutte le pagine (`description`, `brand`) | «Ha creato Città Digitali e Puglia Digitale…» (LG §07) | D1: ruolo di ITnode in Puglia Digitale e titolare del marchio. D5: gestione di Città Digitali | La formula prudente del §2, nel testo e nel JSON-LD. Il nodo `brand` di Puglia Digitale resta sospeso. Il nodo `brand` di Città Digitali resta, salvo smentita del cliente su D5 | **Applicata** |
| **B2** | Città Digitali, «Come funziona», punto 05 | «La forza di un portale ad alto traffico» | Export degli analytics del portale, con metrica e periodo (N8) | Titolo «La forza di un portale nazionale»; il testo del punto non cambia | Da applicare alla scadenza |
| **B3** | Puglia Digitale, «I numeri dei territori coinvolti» | «30+ città coinvolte», «~200.000 partite IVA nei territori coinvolti», «60% del tessuto produttivo pugliese è in questi territori»; nota «Dati ITnode.» | «30+»: numero, perimetro (solo città pugliesi?), mese e anno. «~200.000» e «60%»: fonte, anno e definizione | «~200.000» e «60%» **non si pubblicano**. «30+» si pubblica solo con la conferma di numero e perimetro e con la nota «Dati ITnode, aggiornati a [mese anno].», nella composizione a un numero della DV §7.5 («30+» in `display-xxl` dalla colonna 3, etichetta e nota; titolo al singolare scritto da copywriter-brand). Senza conferma nemmeno del «30+», la sezione non si pubblica e il layout resta pronto | Da applicare alla scadenza |
| **I2** | Home, timeline del fondatore, tappa «Dal 2002» | «10.000+ clienti, prima di ITnode» | Perimetro: quali aziende, quale periodo, clienti o utenti (N5) | Il numero si toglie; la tappa resta con data e titolo (DV §7.3) | Da applicare alla scadenza |
| **I6** | Home, H2 «I tre mondi ITnode»; Puglia Digitale, CTA «Aderisci a Puglia Digitale» | Come a sinistra | D1 | **Se D1 dice «partner tecnologico»:** H2 «I tre mondi»; CTA «Porta la tua impresa in Puglia Digitale», a meno che il cliente confermi di gestire le adesioni. **Se D1 resta senza risposta:** H2 «I tre mondi»; la CTA resta, perché l'adesione è l'offerta delle linee guida (LG §16) | Da applicare alla scadenza |
| **Foto dell'evento** (B4, C07) | Home, «Documento» (ritagli Panorama e Città). Su Puglia Digitale c'era il ritaglio Schermo, tolto il 2026-10-09 (e398f46) | Foto con la filigrana di un editor generativo | L'originale dello scatto, senza cornice né sovrimpressioni, con luogo, data e autore; che cosa è stato modificato; conferma dell'informativa sulle riprese data ai partecipanti | Resta la nota «Immagine elaborata con strumenti di intelligenza artificiale» finché non arrivano l'originale e la conferma del cliente. Nessuna didascalia con data, luogo, nomi o numero di partecipanti; l'oratore non si nomina. Senza conferma dell'informativa, ui-designer stringe i ritagli su schermi e palco, escludendo i profili riconoscibili (DV §4.2), e il creative-director li verifica | Nota applicata; ritagli da fare se manca l'informativa |

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
| A7 | Consenso scritto di ogni impresa di cui il sito mostra una schermata: le tre degli esempi (LG §12); YES, nella hero di `/siii/`; La Tana di Aldo, nel capitolo 01 della Home. Le ultime due dal 2026-10-08 | Impresa per impresa, come nel §3.1: senza il suo consenso escono le sue schermate e la sua riga con il nome. **Confermato dall'utente il 2026-10-09 per le cinque imprese** («tutto autorizzato, vai e carica»; §3.4). Le riserve valgono se un consenso viene revocato |
| A8 | I SIII di YES e della Tana di Aldo li ha realizzati ITnode. Nessun testo visibile lo dice, ma lo presuppongono la hero della pagina che vende il SIII e il capitolo 01 della Home. L'alt della Home lo scrive: «Il SIII della Tana di Aldo» | Come A7 senza consenso: la schermata esce e si applica la riserva del §3.1. Si chiude impresa per impresa, con il consenso del §3.2, che lo dichiara, oppure con una riga dell'utente. **Dal 2026-10-09 vale per il go-live, per conferma implicita dell'utente** (§3.4); una conferma esplicita resta consigliata, non bloccante |
| A9 | L'immagine della basilica con i segni grafici del portale, in «Il progetto» di `/puglia-digitale/` (dal 2026-10-09). Provenienza, autore, diritti e uso di AI non sono noti; il luogo è `[DA VERIFICARE]` | Come nel §3.3: senza provenienza o diritti confermati non va in produzione. Con la provenienza confermata resta con la nota «Immagine elaborata digitalmente». Il luogo, solo se confermato, va nella didascalia prima della nota; l'alt non cambia. **Diritti autorizzati dall'utente il 2026-10-09** (§3.4): la condizione di go-live è soddisfatta. Luogo, provenienza, autore e uso di AI restano aperti |

### 3.1 A7 · Consenso delle imprese di cui il sito mostra le schermate

**Regole.**
- **Impresa per impresa.** Il consenso di un'impresa copre solo le sue schermate e il suo nome. Se un consenso manca, le altre imprese non si fermano.
- **Che cosa copre:** il nome, il comune, il logo e le schermate del SIII dell'impresa nel sito di ITnode (Home e `/siii/`) e, se l'esperienza è online, il link.
- **Forma.** Basta la conferma scritta dell'utente, impresa per impresa, con la data e la forma del consenso: email dell'impresa, documento o clausola del contratto con ITnode. L'originale resta al cliente. La brand-strategist registra la conferma nel brief consolidato (§5, «Consensi delle imprese»). Se l'utente non indica la forma, la conferma si registra lo stesso, con la forma `[DA FORNIRE]`, non bloccante.
- **Conservazione** (dal 2026-10-09).
  - **Chi tiene i consensi** e l'autorizzazione all'uso dell'immagine della basilica: il cliente. `[DA FORNIRE: nome e ruolo di chi li conserva]`.
  - **Dove:** `[DA FORNIRE: archivio o cartella del cliente in cui sono conservati]`.
  - **Che cosa deve restare, per ogni impresa:** chi ha autorizzato e con quale ruolo; che cosa è autorizzato (nome, logo, schermate, link); dove (Home, `/siii/`); da quando, e fino a revoca; come si revoca (info@itnode.it).
  - **Nel repository va solo il registro:** impresa, data, forma, custode. Non le email né i documenti, che contengono dati personali e al sito non servono.
  - **Revoca.** Vale il ritiro immediato del §1. La sessione principale mette a `false` la chiave dell'impresa, e il controllo blocca la pubblicazione finché la schermata è nel sito.
- **Riga con il nome.** Sotto la hero di `/siii/` e sotto il capitolo 01 della Home va una riga con il nome e il comune (DV §4.8; verdetto del creative-director del 2026-10-07, decisione 5). Va online solo con il consenso dell'impresa e solo con nome ufficiale e comune confermati. Se il consenso manca, schermata e riga escono insieme. Per YES e La Tana di Aldo nome ufficiale e comune non ci sono: finché non arrivano, hero e capitolo 01 restano senza riga, e il nome sta solo nell'alt.
  - **Testi già pronti, non pubblicati:** hero, «YES · {comune} ({provincia})» (verdetto del creative-director del 2026-10-08, decisione 2); capitolo 01, «La Tana di Aldo · [DA FORNIRE: comune] ([DA FORNIRE: sigla della provincia])» (copy deck della Home 1.8).
  - **Con le riserve** la riga è «Masseria Santella · Cassano delle Murge (BA)», alle stesse condizioni: consenso di Masseria Santella e comune confermato (`[DA VERIFICARE]` nel copy deck di `/siii/`).
- **Nomi delle schede degli esempi.** Nome, luogo e link delle tre imprese degli esempi vengono dalle linee guida (LG §12): restano anche senza consenso, come le schede. Fuori dalle schede il nome di un'impresa va online solo con il suo consenso.

**Al go-live, senza consenso scritto:**

| Impresa | Dove nel sito | Perché c'è | Al go-live senza consenso |
|---|---|---|---|
| Masseria Santella | `/siii/`, primo esempio. Le sue viste sono anche la prima riserva della hero e del capitolo 01 della Home | LG §12 | La schermata esce e torna lo slot con la variante «in pubblicazione» (DV §4.5). La scheda dell'esempio resta, senza la schermata (LG §12). Le due riserve che usano le sue viste non sono disponibili |
| Maison Miminà | `/siii/`, secondo esempio | LG §12 | La schermata esce e torna lo slot con la variante «in pubblicazione». La scheda resta |
| D.L. Natura Dentro | `/siii/`, terzo esempio | LG §12 | Come Maison Miminà |
| YES | `/siii/`, hero. Il nome è solo nell'alt | Richiesta dell'utente del 2026-10-08 | La schermata esce insieme al suo alt, e il nome non resta in nessun punto del sito. Nella hero va, in quest'ordine: (1) la sala di Masseria Santella da smartphone, se Masseria Santella ha dato il consenso. È la hero approvata dal creative-director il 2026-10-07 (decisioni 1 e 2, ritaglio ancorato in basso): è già misurata e ha il suo alt in `alt-text.md`. (2) Altrimenti la variante «in pubblicazione» dello slot `siii-anteprima` (DV §4.5). Un'altra schermata con consenso può prendere il posto della (1) solo con il parere del creative-director e la misura di web-performance-specialist, perché è l'elemento LCP. La riserva è confermata dal creative-director (verdetto del 2026-10-08, decisione 6) |
| La Tana di Aldo | Home, capitolo 01: vista desktop e, sui telefoni in verticale, vista da smartphone. Il nome è solo nell'alt | Richiesta dell'utente del 2026-10-08 | Escono tutte e due le viste insieme al loro alt, e il nome non resta in nessun punto del sito. Nel capitolo va, in quest'ordine: (1) l'interno di Masseria Santella da desktop (`siii-masseria-santella-desktop-interno.jpg`), 16:10 a ogni larghezza, se Masseria Santella ha dato il consenso. È la vista approvata per il capitolo dal creative-director il 2026-10-07, è stata nella Home fino a c11734b e ha il suo alt in `alt-text.md`. La riga è «Masseria Santella · Cassano delle Murge (BA)», alle stesse condizioni. (2) Altrimenti la variante «in pubblicazione» del capitolo (DV §4.5), senza nome né luogo. La riserva è confermata dal creative-director (verdetto del 2026-10-08 sul capitolo 01, decisione 6) ed è una modifica di soli dati in `src/data/media.ts`. Un'altra schermata con consenso entra solo con il parere del creative-director e la misura di web-performance-specialist (controllo n. 8 del budget) |

- **I8 non cambia.** «Tre Siti Interattivi Immersivi già online» conta gli esempi con il link, non la hero né il capitolo 01 della Home.
- **Controllo di go-live: impresa per impresa** (commit a5dac14, con la patch della review del 2026-10-08, R3).
  - `SHOWCASE_CONSENT` ha una chiave per impresa, il prefisso del file: `masseria-santella`, `maison-mimina`, `dielle`, `yes`, `la-tana-di-aldo`.
  - Una schermata con una chiave non elencata fa fallire il controllo, così una nuova impresa non passa inosservata.
  - A ogni consenso registrato nel brief, la sessione principale mette a `true` la chiave dell'impresa.
  - I file derivati seguono la convenzione `siii-<impresa>-desktop-<vista>` (DV §4.8): con un altro nome il controllo non li riconoscerebbe.

### 3.2 Richiesta di consenso: testo proposto

Il cliente o l'utente lo manda a ogni impresa. `[IPOTESI: il consulente legale del cliente lo rivede prima dell'invio]`

> **Oggetto:** Il vostro SIII sul sito di ITnode
>
> Buongiorno,
> stiamo preparando il nuovo sito di ITnode e vorremmo mostrare il SIII che ITnode ha realizzato per [nome dell'impresa] come esempio del nostro lavoro. Useremmo [una schermata / alcune schermate] dell'esperienza, con il logo che vi compare, e scriveremmo il vostro nome e il comune[, con il link all'esperienza]. Le immagini sarebbero [nella pagina dedicata ai SIII / nella Home].
> Ci autorizzate? Basta rispondere a questa email. Potrete chiederci di toglierle in qualsiasi momento scrivendo a info@itnode.it.

- La frase «il SIII che ITnode ha realizzato per [nome dell'impresa]» serve anche ad A8: un sì dell'impresa la conferma.
- Se il contratto di ITnode con l'impresa prevede già l'uso nel portfolio, basta dirlo nella conferma dell'utente (§3.1, «Forma»).

### 3.3 A9 · L'immagine della basilica in «Il progetto» di `/puglia-digitale/`

**Che cosa sappiamo** (verificato il 2026-10-09; dettagli nella review `docs/review/2026-10-09-puglia-digitale-basilica-brand-strategist.md`).
- **Il file.** `src/assets/images/basilica-digitale.jpg`, 1200 × 2000 px, senza metadati. Nel sito c'è il ritaglio 4:5 `derivate/basilica-piattaforma.jpg` (`src/pages/puglia-digitale.astro`, righe 147–161).
- **La scena.** La facciata di una chiesa romanica in pietra chiara tra due torri, su una piazza. Sopra ci sono pannelli azzurri, segnaposto arancioni e linee luminose sul selciato: lo stile delle immagini del portale dell'ADR 007. Non ci sono persone né marchi.
- **Il luogo, molto probabile ma non confermato: la basilica di San Nicola a Bari.**
  - La facciata corrisponde, elemento per elemento, alla descrizione pubblica della basilica: facciata a salienti tra due torri quadrate, tronche e diverse tra loro; tre portali, quello centrale con il protiro su colonne; tre monofore sopra i portali; in alto cinque bifore e un oculo. Fonti: it.wikipedia.org, «Basilica di San Nicola», e la scheda della basilica su famigliedellavisitazione.it, lette come snippet di ricerca il 2026-10-09 (brief consolidato §8).
  - È un confronto fatto da noi, non una fonte che dica che questa immagine è San Nicola. Resta `[DA VERIFICARE]`.
- **Coerenza con le città.** Bari è nell'elenco di Città Digitali (`docs/strategia/citta-digitali-elenco.md`, riga 5), e quindi tra le 31 città pugliesi di Puglia Digitale (conferma dell'utente del 2026-10-06). Nella stessa pagina la carta della Puglia disegna e nomina Bari.
- **Nel sito oggi.**
  - Nota «Immagine elaborata digitalmente». È vera: la grafica sovrapposta è un'elaborazione certa.
  - Alt definitivo, senza il nome del luogo: «La facciata in pietra chiara di una chiesa tra due torri; sopra, segnaposto arancioni, pannelli digitali azzurri e linee luminose sulla piazza.» (13c97a8, `alt-text.md` 1.13). Dice «chiesa», come per Gravina.
  - Nessun testo accanto all'immagine nomina Bari o la basilica.
- **Che cosa non sappiamo:** se viene dal portale del cliente, e da quale pagina; chi l'ha fatta; chi ne ha i diritti; se per la foto o per la grafica è stata usata l'AI. Sul portale non abbiamo trovato una pagina di Bari (ricerca del 2026-10-09).

**Al go-live.**
1. **Provenienza.** L'immagine va online solo se l'utente conferma che viene dal portale del cliente, come le immagini dell'ADR 007, o che il cliente o ITnode ne hanno i diritti. Altrimenti esce. Il sostituto l'ha deciso il creative-director (ADR 007 1.2; verdetto del 2026-10-09, §3):
   - subito, nello stesso riquadro 4:5, la variante «in pubblicazione» con l'orizzonte e i nodi, senza nome (DV §4.5). Lo slot lo aggiunge la sessione principale, se la riserva scatta;
   - poi, con l'utente, una foto vera di un luogo pugliese con i diritti, o un'altra immagine del portale con provenienza confermata;
   - la foto dell'evento non torna, perché l'utente l'ha tolta da qui.

   Il controllo di go-live c'è dal commit fd4f004: `CONFIRMED.basilicaProvenance` in `scripts/prelaunch-check.mjs`, da mettere a `true` solo con la risposta dell'utente registrata nel brief (A9).
2. **Nota.** Con la provenienza confermata e l'uso di AI non noto resta «Immagine elaborata digitalmente», come per le immagini dell'ADR 007. Se il cliente dice che è stata usata l'AI, la nota cambia con le formule di `alt-text.md`. Se al go-live la risposta manca, decide la brand-strategist con il consulente legale (`alt-text.md`).
3. **Nome del luogo.** Si usa solo con la conferma dell'utente. Allora va nella didascalia sotto l'immagine, prima della nota, e l'alt non cambia, perché il luogo si sentirebbe due volte (ADR 007 1.2; verdetto del creative-director del 2026-10-09, §5; `alt-text.md` 1.13). Le varianti pronte:
   - luogo confermato: «Bari, basilica di San Nicola · Immagine elaborata digitalmente»;
   - solo la città: «Bari · Immagine elaborata digitalmente».

   Il testo esatto è di copywriter-content; la verifica, con la risposta dell'utente, è della brand-strategist. La didascalia chiude anche il rischio che l'immagine venga attribuita alle tre città nominate nel paragrafo accanto (review del 2026-10-09, B4). Senza conferma, nessun nome da nessuna parte, come oggi.
4. **Bene culturale.** Se l'immagine riproduce un bene culturale in consegna a un'amministrazione pubblica, usarla per promuovere un'impresa può richiedere una concessione e un canone (D.Lgs. 42/2004, art. 108). Fonte: testo dell'articolo pubblicato dall'Archivio di Stato di Prato (cultura.gov.it), letto come snippet di ricerca il 2026-10-09. `[DA VERIFICARE con il consulente legale]`. La stessa domanda vale per le chiese delle immagini dell'ADR 007, come quella di Gravina in Puglia. Se serve una concessione e non c'è, vale il punto 1.

### 3.4 La risposta dell'utente del 2026-10-09: che cosa chiude e che cosa no

La risposta è: «tutto autorizzato, vai e carica». Chiude le **autorizzazioni**, ma **non dà i dati**.

| Voce | Che cosa chiude | Che cosa resta aperto | Effetto sul sito |
|---|---|---|---|
| **A7**, consensi delle cinque imprese | Il consenso di Masseria Santella, Maison Miminà, D.L. Natura Dentro, YES e La Tana di Aldo, come conferma scritta dell'utente (§3.1) | Forma del consenso di ogni impresa e chi la conserva `[DA FORNIRE]`, non bloccante (§3.1, «Conservazione») | Le schermate e gli alt che nominano le imprese possono andare online. Le riserve del §3.1 valgono solo in caso di revoca |
| **A8**, i SIII di YES e della Tana di Aldo sono di ITnode | Per il go-live, sì, come conferma implicita | Una conferma esplicita `[DA VERIFICARE, non bloccante: i SIII di YES e della Tana di Aldo li ha realizzati ITnode]` | Le schermate restano; nessun testo aggiunge altro sulla paternità |
| **A9**, immagine della basilica | I diritti d'uso: l'utente dice che è autorizzata, quindi il punto 1 del §3.3 è soddisfatto | Da dove viene (portale o altro) e chi l'ha fatta `[DA FORNIRE]`; uso di AI `[DA FORNIRE]`; luogo `[DA VERIFICARE]`; art. 108 `[DA VERIFICARE con il consulente legale]`, perché la domanda non era nel messaggio all'utente | L'immagine resta. La nota resta «Immagine elaborata digitalmente». La didascalia resta senza luogo |
| **Righe con il nome** (hero di `/siii/`, capitolo 01 della Home) | Niente: servono nome ufficiale e comune | Nomi ufficiali, comuni e province di YES e della Tana di Aldo `[DA FORNIRE]` | Restano spente. Il nome delle due imprese resta solo negli alt |
| **Indirizzi delle esperienze** di YES e della Tana di Aldo | Niente: non erano nel messaggio | `[DA FORNIRE, se sono online]` | Nessun link; non blocca |

**Perché A8 è chiusa solo come conferma implicita.**
- **La regola del §3.2 non basta.** Vale per un sì dato al testo del §3.2, che dichiara «il SIII che ITnode ha realizzato per…». Non sappiamo con quale testo, né in quale forma, le imprese hanno dato il consenso.
- **Ma vale la seconda strada dell'A8**, «una riga dell'utente».
  - La risposta arriva a un messaggio che chiedeva esplicitamente la «conferma che i due SIII li ha realizzati ITnode».
  - Le schermate le ha mandate l'utente stesso come SIII, cioè come prodotto di ITnode.
  - Il rischio di sbagliare è basso.
- **Il limite.** «Autorizzato» parla di permessi, non di chi ha fatto il lavoro. Per questo la registro come conferma implicita, e una riga esplicita resta consigliata.

**La nota della basilica al go-live.** L'uso di AI resta senza risposta. Decisione provvisoria della brand-strategist, in attesa del consulente legale (punto 2 del §3.3): resta «Immagine elaborata digitalmente», che è vera. Se il cliente o il consulente indicano un uso di AI, si passa alla formula di `alt-text.md`. Vale anche per le tre immagini dell'ADR 007.

**«Vai e carica».** Vale come via libera alle immagini e ai consensi di questo ADR. Le altre condizioni del G4 hanno le loro verifiche: per esempio i dati societari, la Privacy Policy e l'endpoint del modulo.

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
  - per A7, impresa per impresa: applicato in a5dac14 (§3.1).

  Il controllo passa solo con la riserva applicata o con la conferma registrata.
- L'anteprima resta fuori dai motori di ricerca (ADR 004) ed è aperta a chi ha il link dal 2026-09-29. Per questo vale il ritiro immediato del §1. Il sito non contiene `noindex` legati all'ambiente (specifiche SEO §3.2).
- Uno shooting reale del fondatore e dei luoghi toglie le note AI e rafforza la promessa del sito: spazi veri.

## Ipotesi da validare

- La nota proposta basta per l'art. 50 dell'AI Act `[DA VERIFICARE con il consulente legale]`.
- `[IPOTESI: i testi di riserva rispettano la voce di marca. copywriter-brand li rivede, senza cambiarne il significato: «I tre mondi», «Porta la tua impresa in Puglia Digitale», il titolo al singolare dei numeri, la frase I7 della Home.]`
- `[IPOTESI: il testo del §3.2 basta come consenso. Lo verifica il consulente legale del cliente.]`
- `[DA VERIFICARE, non bloccante dal 2026-10-09: i SIII di YES e della Tana di Aldo li ha realizzati ITnode (A8).]`
  - Lo presuppongono le richieste dell'utente. Il 2026-10-09 l'ha confermato in modo implicito, con «tutto autorizzato, vai e carica» (§3.4).
  - In rete non c'è traccia né delle imprese né delle esperienze (ricerche del 2026-10-08).
  - Le due interfacce si somigliano tra loro: l'etichetta «APRI QUI» con la freccia, le icone di contatto tonde con una foglia. Somigliano anche a quelle di Masseria Santella e Maison Miminà. È un indizio, non una prova.
- `[IPOTESI: «YES» e «La Tana di Aldo» sono i nomi con cui le imprese si presentano.]` Sono le letture dei loghi; quello di YES dice anche «pure design 100% flowers».
- `[DA VERIFICARE: l'immagine di «Il progetto» mostra la basilica di San Nicola a Bari (A9).]` Molto probabile per il confronto con la descrizione pubblica (§3.3), ma non confermato.
- `[IPOTESI: sotto la grafica c'è una foto reale.]` I dettagli dell'architettura corrispondono alla descrizione pubblica, ma non è una prova (`alt-text.md`, «Indizi sull'AI»).
- `[DA VERIFICARE con il consulente legale: art. 108 del D.Lgs. 42/2004 per le immagini di beni culturali usate a scopo promozionale (§3.3, punto 4).]`

## Domande aperte

- **Per il cliente** (verdetto G4, §6, punti B3, B5–B10). In particolare:
  - ruolo in Puglia Digitale (D1);
  - traffico del portale;
  - fonte e data dei numeri;
  - perimetro di «10.000+»;
  - originale e informativa della foto dell'evento;
  - provenienza dei ritratti;
  - consensi delle cinque imprese: **autorizzati dall'utente il 2026-10-09**. Restano la forma di ogni consenso e chi li conserva (§3.1, «Conservazione»);
  - per YES e La Tana di Aldo: nome ufficiale, comune e provincia; indirizzo dell'esperienza, se è online; se possibile, una conferma esplicita di A8 (brief consolidato, D12);
  - per l'immagine della basilica (A9): diritti **autorizzati il 2026-10-09**. Restano: da dove viene e chi l'ha fatta, se è stata usata l'AI, se è la basilica di San Nicola a Bari, l'originale (brief consolidato, D13);
  - funzioni del SIII;
  - video.
- **Per l'utente:**
  - entro quale data il cliente deve rispondere, prima che si applichino le riserve?
  - chi conserva i consensi e l'autorizzazione sulla basilica, e dove (§3.1, «Conservazione»)?

## Decisioni richieste

- **Utente:**
  - approvazione della regola del §1;
  - approvazione dei testi di riserva del §3;
  - DR3: (b) per il lancio e (c) appena possibile, con budget e tempi dello shooting;
  - scadenza per le risposte del cliente;
  - approvazione del §3.1 (consenso impresa per impresa, riserve della hero e del capitolo 01 della Home) e del §3.3 (A9). I consensi e i diritti sono autorizzati dal 2026-10-09 (§3.4);
  - i dati ancora aperti del §3.4: nomi ufficiali e comuni di YES e della Tana di Aldo, il luogo e l'uso di AI della basilica, la custodia dei consensi.
- **Sessione principale:**
  - alla scadenza, applicare le riserve rimaste senza conferma; estendere `check:launch` (C13);
  - le chiavi A7 e `basilicaProvenance` sono a `true` dal commit 878d288. Se un'impresa revoca il consenso, la sua chiave torna a `false` e vale il ritiro immediato (§1).
- **creative-director:** il 2026-10-08 ha allineato la DV §4.8 (0.21) al capitolo 01, ha precisato i nomi delle schede degli esempi e ha confermato la riserva del capitolo 01 (verdetto sul capitolo 01, decisioni 4–6). Per A9 ha deciso il 2026-10-09, nell'ADR 007 1.2: il sostituto se l'immagine esce (§3.3, punto 1) e il luogo nella didascalia (punto 3).
- **Consulente legale del cliente:** art. 108 del D.Lgs. 42/2004 per le immagini di beni culturali (§3.3, punto 4).
- **copywriter-brand:** titolo al singolare per il solo «30+»; rifinitura della frase I7 della Home. Le righe con il nome sotto la hero e sotto il capitolo 01 sono pronte (§3.1): vanno completate quando arrivano nome e comune di YES e della Tana di Aldo.
- **copywriter-content:** l'alt del capitolo 01 è definitivo (6c6f501, `alt-text.md` 1.11). Per A9 l'alt è definitivo (13c97a8, `alt-text.md` 1.13) e non cambia con la conferma. Con la risposta dell'utente scrive la didascalia, con una delle varianti del §3.3, punto 3.
