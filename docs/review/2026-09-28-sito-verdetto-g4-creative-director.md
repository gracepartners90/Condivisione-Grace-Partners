---
titolo: Verdetto di gate G4 (go-live) e decisioni creative sul sito costruito
owner: creative-director
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md (§25, §31–35), docs/brief/brief-consolidato.md, docs/creativa/direzione-visiva.md (0.2), docs/ui/design-system.md, docs/ux/accessibilita.md, docs/ux/struttura-pagine.md, docs/performance/budget.md, docs/performance/architettura.md, docs/decisioni/001–005, le dieci review di Fase 5 in docs/review/ del 2026-09-28, commit fino a a96c54f (compresi 846f142, campi del form, e bb5e2b6, anteprima protetta), build dist/ delle 12:59 su http://localhost:4321, variante PUBLIC_SLOT_MODE=publish su http://localhost:4322, scripts/serve.mjs con Brotli su http://localhost:4390 (misure del preload), npm run check:launch e check:seo del 2026-09-28, screenshot e prove in pagina con Playwright 1.56 e Chromium 141]
---

# Verdetto di gate G4 · sito costruito

**Oggetto.** Sintesi delle review di Fase 5, decisioni che spettano al creative-director e verdetto di gate G4 (go-live) sulle otto pagine: `/`, `/siii/`, `/puglia-digitale/`, `/citta-digitali/`, `/contatti/`, `/privacy-policy/`, `/cookie-policy/`, `/404.html`.

**Come ho lavorato.**
- **Guardato il sito.**
  - Pagine intere di Home, SIII, Puglia Digitale, Città Digitali, Contatti e 404 a 390 e 1440 px, dopo aver fatto caricare le immagini `lazy`.
  - La variante «in pubblicazione» di Home, SIII e Puglia Digitale.
  - Il menu mobile aperto.
  - Ritagli a 2× e 3× per ritratti e bordi dell'orizzonte.
- **Provato in pagina le soluzioni prima di deciderle**, con CSS e DOM iniettati: nessun file in `src/` è stato toccato.
  - Riga di posizionamento della hero (I4) da 320 a 1440 px.
  - Statement dei capitoli (V4) e maschere dei ritratti (V6).
  - Campo visivo della hero su tablet (V14): incroci e tagli delle etichette da 700 a 1000 px, a riposo e con lo scorrimento.
  - Cascata «Entra. / Esplora. / Interagisci.», campi del form, colonne della 404.
- **Misurato il preload del font** su tre profili di rete, con e senza la riga del preload (ADR 005).
- **Eseguito** `npm run check:launch` (7 controlli non superati, tutti dati o materiali del cliente) e `npm run check:seo` (nessun problema).
- **Limiti.**
  - Solo Chromium.
  - Il video di Città Digitali, i portali e le esperienze SIII non sono raggiungibili dall'ambiente: non li ho visti.
  - La build servita è delle 12:59: non contiene il commit 846f142 (campi del form), che ho valutato con la stessa regola iniettata.

---

## In sintesi

- **Verdetto G4: approvato con condizioni.**
  - La build è approvata sul piano creativo e della qualità: il sito è riconoscibile come ITnode, fedele alla direzione visiva e dentro le soglie di accessibilità, performance e SEO del codice.
  - La **pubblicazione non è approvata** finché non sono chiuse le condizioni bloccanti del §5: dati e materiali del cliente, migrazione SEO, hosting, veridicità e le correzioni decise qui.
  - Il gate si supera solo con l'approvazione esplicita dell'utente. Poiché G1–G3 non sono mai stati approvati, quell'approvazione deve coprire anche i deliverable delle fasi precedenti (§5.1).
- **Le decisioni** (§3):
  - il preload del font resta (ADR 005);
  - V4 e V6 sì;
  - la riga di posizionamento va sotto l'H1 in `lead` (I4);
  - le porte di Puglia Digitale restano da ovest a est a tutte le larghezze (I11);
  - V10 e V14 sì; la sfumatura dell'orizzonte resta come eccezione registrata (S1);
  - i campi del form restano come li ha sistemati ui-designer (846f142);
  - ADR 003 è pronto per l'approvazione, ADR 002 dopo due ritocchi.
- **Cinque osservazioni nuove importanti** (§2):
  - la cascata «Entra. / Esplora. / Interagisci.» non scende a cascata;
  - tre coordinate hanno una precisione fittizia;
  - nella variante «in pubblicazione» i pannelli di `/siii/` rischiano di sembrare finte schermate;
  - il video non ha un poster reale;
  - il controllo di go-live non presidia due claim in riserva.
- **Il punto debole del sito non è nel codice:** mancano le prove visive, cioè le schermate delle esperienze SIII, le foto dei luoghi, il video e un ritratto reale. Il sito regge senza, ma il principio delle linee guida («fai in modo che il sito la faccia percepire») si compie davvero solo con quei materiali.

---

## 1. Sintesi critica

### 1.1 Il sito rispetto al risultato atteso (linee guida §35)

| Cosa deve capire il visitatore | Come il sito lo dice | Giudizio |
|---|---|---|
| ITnode rende gli spazi esplorabili digitalmente | Orizzonte della hero, «Documento» con i nodi sulla foto dell'evento, confronto Tour 360° / SIII, esperienze da aprire | Chiaro, con un limite: la frase che dice che cosa fa ITnode oggi sta nell'occhiello da 12 px (I4, decisione al §3.4) |
| Usa questa tecnologia per valorizzare imprese e territori | Manifesto, capitoli 02 e 03, pagine Puglia Digitale e Città Digitali con carte, porte e numeri | Chiaro |
| SIII, Puglia Digitale e Città Digitali sono tre applicazioni della stessa visione | Tre capitoli con rilevamento (000°, 120°, 240°), ponte «Gli altri mondi ITnode» in ogni pagina di prodotto, 404 con i tre mondi | Chiaro e coerente |
| «Non limitarti a raccontare l'immersione: falla percepire» | Il sito usa i gesti dell'esplorazione (orizzonte che ruota, aperture, nodi, confronto a due stati) | Riuscito come linguaggio. Il prodotto vero si prova solo fuori dal sito, in nuova scheda, e mancano le schermate. È il margine più grande, da colmare con gli asset e, dopo il lancio, con l'anteprima «Prova qui» (DV, Ipotesi) |

**Distintività.** Nessuna sezione potrebbe stare sul sito di un concorrente o di una web agency. La combinazione di bussola, coordinate vere, luoghi misurati in gradi e chilometri, tipografia editoriale e palette minerale è propria di ITnode. Toglie il rischio del «sito da software house» che le linee guida temevano.

### 1.2 Il «test ITnode», pagina per pagina (DV §8)

| Pagina | Senza logo è ITnode? | Dove siamo? | Cosa esploro? | È tutto vero? | Funziona ferma? | Esito |
|---|---|---|---|---|---|---|
| Home | Sì: orizzonte dei luoghi, rilevamenti dei capitoli, foto documento con nodi | Acquaviva, con gradi e distanze reali | Nodi sulla foto, rotazione, tre capitoli | Sì, con riserve: «10.000+» (I2), tre coordinate arrotondate (N2), ritratti AI dichiarati | Sì (390 px, movimento ridotto, senza JavaScript: verifiche UI e UX) | **Passa**. Da migliorare: I4, V4, V6 |
| SIII | Sì: «SIII» con le grazie, confronto sull'orizzonte, verbi in marquee | Imprese reali, con comune e portale | Confronto a due stati; tre esperienze in nuova scheda | Sì: benefici qualitativi; funzioni da confermare (N13) | Sì | **Passa**, ma la prova principale, le schermate, manca: il prodotto si vede solo fuori dal sito (N3) |
| Puglia Digitale | Sì: costa disegnata, porte per longitudine, scalinata dei numeri | Terra di Bari, tre comuni | Porte verso i portali, foto del maxischermo | Numeri da fonte (B3), foto AI dichiarata (B4) | Sì | **Passa** come sistema. Il carattere «territoriale ed emozionale» (LG §13) arriverà solo con le foto dei luoghi |
| Città Digitali | Sì: carta d'Italia a filo, città alla latitudine del loro nodo | Tre città vere | Video (non verificato), portali | «Ad alto traffico» da confermare (B2) | Sì | **Passa**, ma dipende dal video: senza file e senza poster la sezione più importante è un rettangolo scuro (N4) |
| Contatti | In parte: coordinate della sede, portali in tipografia | Sede reale | «Apri in Google Maps» | Dati societari incompleti (soglia 5) | Sì | **Funzionale.** La sezione Persona è la più debole del sito (N5) |
| 404 | Sì: «404°» | — | I tre mondi | — | Sì | **Passa.** Nodi decorativi da sistemare (S10, N6) |

### 1.3 La lista «Cosa evitare» (linee guida §33)

| Voce | Esito | Nota |
|---|---|---|
| Gradienti tech viola/blu | Assenti | Il blu segna solo l'interazione |
| Glow neon | Assenti | Il ping dei nodi parte una volta sola |
| Illustrazioni SaaS | Assenti | — |
| Pattern di circuiti elettronici | **Residuo nei ritratti** | Le «reti luminose» dei fondali generati si vedono ancora, soprattutto in Contatti (linee con piccoli nodi). V6 le riduce al minimo, il ritratto reale le toglie (DR3) |
| Stock photography corporate | Nessuno stock | I ritratti AI hanno però l'aria del ritratto aziendale da catalogo: altro motivo per lo shooting (DR3-c) |
| Dashboard finte | Assenti | Il rischio è nella variante «in pubblicazione» su `/siii/`: pannello scuro con titolo e punti (N3) |
| Eccesso di glassmorphism | Assente | — |
| Sequenze infinite di card | Assenti | Elenchi a zig-zag, a scala e sticky; capitoli; porte |
| Icone decorative | Assenti | Solo frecce funzionali |
| Testi centrati ovunque | Assenti | L'unico elemento centrato è il pulsante di riproduzione sulla copertina del video: un comando, non un testo |
| Animazioni aggressive | Assenti | Reveal, aperture e rotazione legata allo scroll; nessun loop autonomo |
| Layout identici per tutte le sezioni | Risolto (I6) | Il ritmo dei titoli ora varia; ogni pagina ha una temperatura sua |
| Estetica da template ThemeForest | Assente | — |

### 1.4 Coerenza tra le pagine

- **Il sistema tiene.**
  - Stessa scala, stesse superfici, stesse regole per header, breadcrumb, chiusura con Passaggio e form, ponte «Gli altri mondi ITnode» e firma in coordinate nel footer.
  - Le temperature della DV §7.2 sono rispettate: equilibrio in Home, notte in SIII, calce e terra in Puglia Digitale, notte cinematografica in Città Digitali, calce in Contatti.
- **Ogni pagina ha un momento firma**: l'orizzonte in Home, il «SIII» gigante e il confronto, la costa e i numeri, l'Italia e il video, i portali tipografici, il «404°».
- **Due incoerenze nell'uso dell'Orizzonte**, corrette dalle decisioni: la copertina del video ne aggiunge un secondo nella stessa schermata (V10); la 404 ha un orizzonte senza tacche con nodi blu decorativi (S10).

### 1.5 Cosa funziona e va protetto nelle iterazioni

1. **La hero «L'orizzonte dei luoghi».** Il titolo in piedi sulla linea, con i luoghi veri nella loro direzione, è l'idea del sito in un gesto. Niente immagini, CTA o animazioni aggiunte.
2. **Il Passaggio** come regola tipografica. Con V4 e la correzione della cascata (N1) diventa coerente ovunque.
3. **La disciplina del colore** dopo I1 e I2: il blu è interazione, la terra e l'arancio sono luoghi.
4. **La scalinata dei numeri** di Puglia Digitale e il **palco per latitudine** di Città Digitali (da 1280 px).
5. **La foto dell'evento trattata come documento**: nodi numerati, legenda che dice solo ciò che si vede, nessuna didascalia non verificata.
6. **La meccanica dell'onestà**: formule prudenti, note AI, variante «in pubblicazione» senza finte schermate, form che non simula mai un invio.
7. **La leggerezza**: pagine da 82 a 113 KB, LCP sul testo, zero terze parti. Qualunque aggiunta futura, come caroselli o librerie di motion, passa da web-performance-specialist.
8. **Il menu mobile**: numeri in mono, nomi in `display-l`, descrittori, punto del Nodo sulla voce corrente.

---

## 2. Osservazioni del creative-director

Sono le osservazioni nuove, non già presenti nelle review di dominio.

### N1 · [IMPORTANTE] La cascata «Entra. / Esplora. / Interagisci.» non scende a cascata

- **Dove.** `/siii/`, `#esempi-title`. `src/components/ui/Passage.astro`, regole `.passage--cascade`.
- **Problema.** «Esplora.» e «Interagisci.» hanno lo stesso rientro a ogni larghezza: 48 px a 390, 90,6 a 768, 151,7 a 1440. La regola del rientro di default (`.passage--indent-default .passage__reg + .passage__reg`) ha un selettore più pesante e vince su quella della cascata, che non si applica mai.
- **Motivazione.** DV §1.5: tre registri solo per questo titolo, «a cascata». È l'unico Passaggio a tre gradini del sito e introduce gli esempi: la scala è il gesto dell'entrare.
- **Proposta** (provata in pagina). In fondo allo `<style>` di `Passage.astro`, dopo le regole `--indent-default`; le due regole `.passage--cascade .passage__reg` attuali si tolgono. Esito: 48 e 96 px a 390 px («Interagisci.» finisce a 320 px su 370), 91 e 181 px a 768, 152 e 303 px a 1440; nessun rientro a 320 px.
  ```css
  /* Cascade (visual direction §1.5): each register steps one indent further than the previous
     one. Same selector weight as the default-indent rule and declared after it, so it wins at
     every width (today registers 2 and 3 get the same indent). */
  .passage--cascade .passage__reg + .passage__reg {
    padding-left: calc(var(--reg) * clamp(0px, (100vw - 20rem) * 0.7, min(1.2em, 3rem)));
  }

  @media (min-width: 43.75em) {
    .passage--cascade .passage__reg + .passage__reg {
      padding-left: calc(var(--reg) * var(--indent-step));
    }
  }

  @media (min-width: 64em) {
    .passage--cascade .passage__reg + .passage__reg {
      padding-left: calc(var(--reg) * var(--indent-step) * 2);
    }
  }
  ```

### N2 · [IMPORTANTE] Tre coordinate con precisione fittizia

- **Dove.** `src/data/site.ts`: Monopoli (`lat: 40.95, lon: 17.3`), Caltanissetta (`lat: 37.49`), Cassano delle Murge (`lon: 16.77`). In pagina diventano «40.9500° N · 17.3000° E», «37.4900° N», «16.7700° E»: nella hero, nella carta della Puglia, nelle porte, nelle città di Città Digitali.
- **Problema.** Valori arrotondati mostrati con 4 decimali, cioè con zeri di riempimento. Gli altri quattro luoghi hanno 4 decimali, ma la fonte non è dichiarata. Una ricerca del 2026-09-28 restituisce per Monopoli valori diversi a seconda della fonte (40.9571 · 17.2905 e 40.9525 · 17.2986).
- **Motivazione.** DV §1.4: «Non si fa: coordinate inventate o arrotondate per effetto». Le coordinate sono l'unico ornamento ammesso proprio perché sono vere: una precisione finta ne tradisce il senso (soglia 1, nel suo spirito). Lo segnala anche brand-strategist (S1).
- **Proposta.** Regola aggiunta alla DV §1.4.
  - Tutti e sette i luoghi dalla stessa fonte (nodo del comune in OpenStreetMap, oppure Wikidata P625), con 4 decimali reali e la fonte in un commento in `site.ts`.
  - In alternativa, 2 decimali per tutti.
  - Rilevamenti e distanze si ricalcolano da soli (`src/lib/geo.ts`).
  - Chi: sessione principale per i dati (da una rete che raggiunge la fonte, oppure dal cliente); brand-strategist verifica.

### N3 · [IMPORTANTE, solo se si pubblica senza le schermate SIII] Pannelli «in pubblicazione» di `/siii/`: nome ripetuto e orizzonte da righello

- **Dove.** `/siii/`, esempi (`src/pages/siii.astro`, riga 237: `<Media asset={ex.slot} />`) e `SlotPending.astro`.
- **Problema.**
  - Tre pannelli scuri fino a 1339 × 837 px, ciascuno con il nome dell'impresa in alto a sinistra, ripetuto subito sotto nell'H3 in `display-l`.
  - Un pannello scuro con un titolo e tre punti rischia di leggersi come una finta schermata dell'esperienza.
  - Senza gradi, l'orizzonte a 12 colonne si legge come un righello (V9).
- **Motivazione.** Lista §33, «dashboard finte». DV §4.5: la variante è uno «spazio esplorabile astratto», non un'imitazione. Nella Home lo stesso pannello è già senza testo (O6).
- **Proposta.**
  - `<Media asset={ex.slot} pendingText={false} />`: la prop esiste già e la usa la Home.
  - Gradi ogni 45° sotto le tacche lunghe nei pannelli larghi almeno 700 px (V9 della verifica UI, proposta di ui-designer).
  - Nessun effetto sulle tecnologie assistive: la variante è `aria-hidden` e nome e luogo sono nell'H3 e nella riga accanto.
  - **Meglio ancora:** le tre schermate reali. Sono la prova più forte della pagina e il cliente può produrle in pochi minuti (§6).

### N4 · [IMPORTANTE] Video di Città Digitali: serve un poster reale

- **Dove.** `/citta-digitali/`, `#video`; `VideoSection.astro`, copertina.
- **Problema.** Oggi la copertina è una superficie `notte-2` con il pulsante di riproduzione. Chi non ha l'autoplay vede un rettangolo scuro di quasi tutto lo schermo: su mobile, con movimento ridotto o con Save-Data, e in ogni caso finché il video non parte. A 1440 px sono circa 900 px di vuoto nella sezione che le linee guida vogliono «di presenza importante» (§19).
- **Motivazione.** LG §27 (video poster) e §19. DV §7.6: «poster sempre presente».
- **Proposta.** Quando arriva il file, scelgo io il fotogramma. ui-designer prepara la copertina in AVIF e WebP responsive, come previsto in `architettura.md` (niente attributo `poster`). È parte della condizione C05 del §5.

### N5 · [SUGGERIMENTO] Contatti, sezione Persona: dopo K1 resta un nome in un campo vuoto

- **Dove.** `/contatti/`, `.ct-person`.
- **Problema.** Tolta la citazione fuori contesto (K1, corretto), restano un ritratto piccolo a sinistra e nome e ruolo in basso a destra, con un grande vuoto in mezzo. È la composizione più debole del sito.
- **Proposta.**
  - Un link al racconto già esistente, sotto il ruolo: per esempio «Il suo percorso →» verso `/#fondatore`. Il testo lo scrive copywriter-brand; non si attribuiscono frasi nuove al fondatore.
  - Quando arriveranno i dati (strategia di conversione §8, osservazione 14 di cro-specialist), la sezione può diventare «Ti risponde …» con una foto reale.

### N6 · [SUGGERIMENTO] 404: colonne dei mondi non allineate

- **Dove.** `/404.html`, terza colonna.
- **Problema.** Il nome «Città Digitali» sta 8 px più in alto degli altri due a 1440 px (758 contro 766) e 7 px a 1024. Il suo statement va su due righe e la griglia della voce distribuisce lo spazio in più.
- **Proposta.** `align-content: start` sulla voce del mondo, insieme a S10 (tacche sull'orizzonte e nodi dentro l'area dei link).

### N7 · [SUGGERIMENTO] Foto dell'evento: il nodo 2 sta sul busto dell'oratore

- **Dove.** Home, «Documento», nodo «Il palco dell'evento Puglia Digitale» (44%, 30%).
- **Problema.** Un segno d'interazione sul corpo di una persona non identificata, che il sito, correttamente, non nomina.
- **Proposta.** Spostarlo sul leggio o sul palco, a lato della figura. La posizione la misura ui-designer; il testo della legenda non cambia.

### N8 · [SUGGERIMENTO] Carta della hero di Puglia Digitale: etichette su due righe anche a 1440 px

- **Dove.** `/puglia-digitale/`, hero: «ACQUAVIVA DELLE / FONTI», «GRAVINA IN / PUGLIA».
- **Proposta.** Etichette su una riga da 1024 px; su mobile vanno bene su due.

### N9 · [SUGGERIMENTO] Porte «in pubblicazione»: coordinate ripetute

- **Dove.** `/puglia-digitale/`, `#luoghi`, variante `place`.
- **Problema.** Le coordinate compaiono dentro la porta e subito sotto l'H3.
- **Proposta.** Dentro la porta restano nome, nodo e rilevamento con la distanza (o «SEDE»): `.slot-pub--place .slot-pub__meta > span + span { display: none; }` a tutte le larghezze. DV §4.5 aggiornata.

### N10 · [IMPORTANTE] Il controllo di go-live non presidia due claim in riserva

- **Dove.** `scripts/prelaunch-check.mjs`.
- **Problema.** Il controllo copre i numeri di Puglia Digitale (B3), ma non «La forza di un portale ad alto traffico» (B2) né «10.000+ clienti, prima di ITnode» (I2). Tutti e due vanno online solo con una conferma scritta del cliente (ADR 002).
- **Proposta** (per la sessione principale):
  ```js
  // Veridicity reserves still open (ADR 002; review B2, I2). Set to true only with the client's
  // written confirmation, recorded in docs/.
  const CONFIRMED = { highTraffic: false, clients10k: false };
  // …in `checks`:
  {
    name: 'Claim senza conferma scritta: «ad alto traffico» (B2), «10.000+ clienti» (I2)',
    ok: (CONFIRMED.highTraffic || !/alto traffico/.test(page('citta-digitali/index.html')))
      && (CONFIRMED.clients10k || !/10\.000\+/.test(page('index.html'))),
  },
  {
    // Visual direction §1.4: digits as given by the source, never padded with zeros.
    name: 'Coordinate senza zeri di riempimento',
    ok: anyPage(/\d\.\d\d00°/).length === 0,
    detail: anyPage(/\d\.\d\d00°/),
  },
  ```

---

## 3. Decisioni

### 3.1 Preload del font (performance, osservazione 1): **si tiene**

- **Decisione.** Il preload di Schibsted Grotesk resta. Registrata in `docs/decisioni/005-preload-del-font.md`, con le condizioni per riaprirla.
- **Perché.**
  - La rimisura valuta il costo per l'identità solo su rete lenta. Ho misurato anche le connessioni veloci (ADR 005, «Misure aggiuntive»):
    - **fibra, desktop:** con il preload il titolo compare subito in Schibsted (0 caricamenti su 5 con il ripiego al primo paint); senza, in 5 su 5 compare in Arial e cambia forma dopo 1–2 fotogrammi;
    - **4G veloce:** il ripiego resta visibile 13–32 ms con il preload, 158–183 ms senza;
    - **4G lento:** 184–234 ms con il preload, 626–694 ms senza.
  - La hero è tipografica: lo scambio di forma dei glifi a 115 px è il primo gesto che il sito fa davanti a chi arriva.
  - Il guadagno di LCP senza preload (145–177 ms in laboratorio) non cambia la classe di nessuna metrica: con il preload l'LCP applicato è 1,01–1,04 s contro una soglia di 2,5 s, e tutti gli obiettivi del budget sono rispettati.
- **Conseguenze.** Nessuna modifica al codice. web-performance-specialist riallinea `budget.md` (§3, controllo n. 7, riga FCP del §2) e `architettura.md` (regola 4, §2, §12), che oggi danno il preload per tolto. DV §3.2 aggiornata con il rimando all'ADR.

### 3.2 V4 · Statement dei capitoli: **sì, prima del lancio**

- **Decisione.** Partenza in `display-l` 600, arrivo in `display-m` 400, `text-wrap: balance` sulle righe d'autore di tutti i Passaggi. Snippet: verifica UI, V4 (`ProjectShowcase.astro`: `secondSize="m"`; `Passage.astro`: `.line { text-wrap: balance; }`).
- **Perché.** Provato a 390, 1024 e 1440 px.
  - Capitoli 01 e 02: da 3 a 2 righe.
  - Capitolo 03: da 6 righe, di cui quattro di una parola a 1024 px, a 4 righe bilanciate.
  - Il Passaggio torna a leggersi come a capo d'autore, con la stessa voce d'arrivo della hero.
  - Il nome del capitolo (`display-m` 400) e l'arrivo condividono il gradino: leggero, pieno, leggero. È il ritmo voluto dentro un capitolo.
- **DV** §1.5 e §7.3 aggiornate.

### 3.3 V6 · Maschere dei ritratti: **sì, prima del lancio**

- **Decisione.** Home `#000 40% → transparent 74%`; Contatti `#000 36% → transparent 68%`. Snippet: verifica UI, V6.
- **Perché.** Confrontate a 2×.
  - In Home i grattacieli quasi spariscono.
  - In Contatti skyline e linee a nodi si riducono a tracce a basso contrasto dietro il braccio.
  - La figura resta intera: si ammorbidisce appena il bordo della manica.
  - È il massimo ottenibile dai derivati attuali: il resto lo risolve solo un ritratto reale.
- **DV** §4.3 aggiornata, con lo stato di DR3: (b) per il lancio, (c) appena possibile.

### 3.4 I4 · Riga di posizionamento della hero Home: **opzione (a), prima del lancio**

- **Decisione.**
  - La riga «Esperienze digitali immersive per imprese e territori.» va in `lead` sotto il secondo registro, come prescrive la DV §5.
  - L'occhiello diventa «ITnode — oltre i confini del Web tradizionale», alternativa già approvata nel copy deck.
- **Pareri sentiti.**
  - copywriter-brand (copy deck Home §1): il posizionamento sta nell'occhiello, perché l'H1 del cliente da solo non lo dice.
  - cro-specialist (esperimento E1): oggi lo dice «solo l'occhiello in maiuscoletto» e l'incertezza sulla proposta di valore frena chi prosegue.
  - ui-designer: raccomanda (a).
  - Il testo è lo stesso in tutti i documenti: cambia solo il posto nella gerarchia.
- **Perché (a).**
  - Il test dei 5 secondi si gioca sulla gerarchia di lettura: H1, poi ciò che sta subito sotto.
  - Oggi la frase che dice che cosa fa ITnode è nel corpo più piccolo della pagina (12–13 px, mono, `inchiostro-2`) e a 1440 px sta 300 px sopra il titolo, isolata nel cielo.
  - In `lead` (20–23 px) arriva nel punto in cui l'occhio atterra dopo il titolo. L'occhiello, liberato, porta il concetto centrale delle linee guida (§02).
- **Provata in pagina** da 320 a 1440 px:
  - a 1440 × 900 l'orizzonte scende dal 62% al 57% (la DV voleva circa il 58%) e la riga sta nella prima schermata;
  - a 1024 × 768 la hero intera sta nella prima schermata;
  - a 390 × 844 secondo registro, riga e didascalia stanno nella prima schermata;
  - l'elemento LCP atteso resta l'H1, molto più grande della riga: lo conferma la rimisura (C14).
- **Snippet** (sessione principale):
  ```astro
  <!-- src/pages/index.astro -->
  <Hero
    variant="home"
    eyebrow="ITnode — oltre i confini del Web tradizionale"
    registers={['La tecnologia cambia.', 'La curiosità ci accompagna\nda sempre.']}
    lead="Esperienze digitali immersive per imprese e territori."
    …
  />
  ```
  ```astro
  <!-- src/components/sections/Hero.astro: new prop `lead?: string`; right after </h1> -->
  {lead && <p class="hero-home__lead t-lead">{lead}</p>}
  ```
  ```css
  /* Hero.astro — only the declarations that change. Mobile rows gain a `lead` track between the
     second register and the caption. */
  .hero-home {
    grid-template-rows: [sky] auto [line] 0 [earth] auto [lead] auto [foot] auto;
  }

  /* Positioning line (visual direction §5): what ITnode does, in reading order right after the
     H1. A paragraph, not part of the heading. */
  .hero-home__lead {
    grid-column: 1 / -1;
    grid-row: lead;
    margin: var(--space-m) 0 0;
    position: relative;
    z-index: 1;
  }

  @media (min-width: 43.75em) {
    .hero-home__lead {
      padding-left: calc((100% + var(--gutter)) / var(--cols) * 2);
    }
  }

  @media (min-width: 64em) {
    /* Earth and lead are sized by their content: the horizon sits at ~57% at 1440 × 900. */
    .hero-home {
      grid-template-rows: [sky] 1fr [line] 0 [earth] auto [lead] auto;
    }

    .hero-home__lead {
      grid-column: 5 / span 7;
      padding-left: 0;
      padding-bottom: var(--space-xl); /* ends on the same line as the observer's caption */
      align-self: start;
    }

    .hero-home__caption {
      grid-row: earth / span 2; /* keeps align-self: end */
    }
  }
  ```
- **Dopo.**
  - copywriter-brand sposta nel copy deck (§1) la riga dall'occhiello al `lead`.
  - ux-designer riesegue reflow e spaziatura del testo a 320 px.
  - cro-specialist tiene E1 come verifica dopo il lancio: test dei 5 secondi con titolari di PMI.

### 3.5 I11 · Ordine delle porte di Puglia Digitale: **da ovest a est a tutte le larghezze**

- **Decisione.** Accolgo la proposta di ux-designer (opzione 1): Gravina → Acquaviva → Monopoli, come oggi nel codice. Nessuna modifica al codice. DV §7.5 aggiornata.
- **Perché.**
  - Su desktop le porte formano una fila che si legge da sinistra a destra.
  - Un DOM «dalla costa all'entroterra» manderebbe il focus da destra a sinistra (WCAG 2.4.3 e 1.3.2): un'inadempienza che nessuna ragione editoriale giustifica.
  - L'alternativa, la costa a sinistra su desktop, rovescerebbe la geografia, cioè il principio dei luoghi reali su cui si regge tutta la DV.
  - Il Passaggio «Dalla costa all'entroterra» sta due sezioni prima e resta vero come concetto della pagina: non ha bisogno che la pila lo ripeta.

### 3.6 Suggerimenti visivi aperti

| Voce | Decisione | Quando | Chi |
|---|---|---|---|
| **V10** · due orizzonti nella stessa schermata a 768–1024 px su Città Digitali | **Sì.** Via l'orizzonte dalla copertina del video (`VideoSection.astro`: il `div.video__cover-horizon` con il suo `<Horizon>`, le regole CSS e l'import). Resta quello di fine hero, che «si apre nel video» | Prima del lancio | Sessione principale; ui-designer verifica |
| **V14** · campo visivo di 200° sul tablet | **Sì, solo per la hero della Home.** Oggi a 700–1023 px sono in vista solo Caltanissetta e due etichette tagliate, tra cui «— 081° · 39 KM» senza il nome di Monopoli. Con 200°, da 768 a 1023 px, a riposo le tre etichette sono intere, e nessun richiamo attraversa un'etichetta né a riposo né con lo scorrimento a 150, 300 e 450 px. Tra 700 e 767 px l'unico contatto è con il frammento di «Varese» dentro la dissolvenza del bordo. Snippet: `@media (min-width: 43.75em) { .hero--home .hero-home__horizon :global(.horizon) { --fov: 200; } }` in `Hero.astro`, con un selettore più pesante di quello del componente. L'orizzonte di Città Digitali resta a 150°: lì le città sono già in vista, e con 200° le etichette di Caltanissetta e Varese si sovrappongono da 700 a 900 px (misurato) | Prima del lancio | Sessione principale; ui-designer riesegue la sua misura degli incroci |
| **V9** · gradi sull'orizzonte della variante «esperienza» | **Sì, se si pubblica con la variante su `/siii/`** (con N3) | Prima del lancio, se serve | Sessione principale; ui-designer |
| **V15** · filetto esattamente sulla latitudine | Facoltativo | Dopo il lancio | ui-designer |
| **V17** · chip «PRENOTAZIONE» a 320 px | Sì | Dopo il lancio | ui-designer |
| **S1** · dissolvenza ai bordi dell'orizzonte | **Si tiene, come eccezione registrata** (DV §2): maschera di trasparenza di al massimo 2 rem, solo su tacche ed etichette, mai sulla linea. A 3× la differenza è netta: senza, «V» e «3» di Varese compaiono tagliati a metà a 390 px; con la dissolvenza si leggono come la striscia che continua oltre lo schermo | Nessuna modifica | — |
| **S4** · `display-m` a 600 | **Regola nuova** (DV §3.2): 400 per arrivi, descrittori, nomi dei capitoli e statement secondari; 600 ammesso quando `display-m` è il titolo di una sezione o di una voce. Il codice attuale è conforme | Nessuna modifica | ui-designer allinea il DS |
| **S5** · valori fuori scala | `.stat__value` sul token `display-xxl` dopo una verifica di ui-designer sulla scalinata a 1440 px; `--fs-ui` documentato nel DS | Dopo il lancio | ui-designer |
| **S6** · misura del testo | Pagine legali a 66 caratteri **insieme all'informativa definitiva** (C03); lead a 768 px dopo il lancio | Con C03 | Sessione principale |
| **S7** · segnaposto di staging | Nessuna azione: in produzione non compaiono | — | — |
| **S8** · porte strette su mobile | Sì, **quando arrivano le foto dei luoghi**: sotto i 1024 px porta a tutta colonna in 4:5, testo sotto. La variante «in pubblicazione» non ne ha bisogno (V7) | Con le foto | ui-designer; revisione del creative-director |
| **S10** · orizzonte della 404 | **Sì**, con N6: tacche sull'orizzonte e nodo dentro l'area del link di ogni mondo. Oggi i nodi sono blu e non interattivi, contro la DV §1.3 | Consigliato prima del lancio | Sessione principale; ui-designer |
| **Campi del form a due colonne** (nota di ux-designer) | **Confermo la scelta di ui-designer**, già applicata in 846f142: `align-content: end` sui campi appaiati, con riquadri alti uguali e allineati a riposo e dopo un invio vuoto. La proposta `align-content: start` è superata: allineava i riquadri in altezza ma li sfalsava di 30–53 px. Accetto lo scostamento transitorio con un solo errore nella riga. Se i test con utenti mostrassero esitazioni, c'è l'alternativa in subgrid già provata da ui-designer | Fatto | — |

### 3.7 ADR 002 e 003

- **ADR 003 · crawler di AI: pronto per l'approvazione del cliente, così com'è.**
  - Le opzioni sono chiare e la conseguenza di ciascuna è una riga di `robots.txt` più l'allineamento del pannello dell'hosting.
  - Consiglio l'opzione A, coerente con le linee guida §26 (AEO e GEO).
- **ADR 002 · veridicità e immagini AI: pronto dopo due ritocchi di brand-strategist**, da fare prima di inviarlo.
  1. **Allineare la frase sulla Home al codice.** L'ADR dice che il testo visibile della Home «resta quello delle linee guida finché il cliente risponde». Dal commit 029a0ab la Home usa invece la formula prudente del copy deck (DR4), e il JSON-LD non dichiara più Puglia Digitale come marchio di ITnode.
  2. **Scrivere nell'ADR le riserve di go-live, invece di rimandare alla review**, così l'utente approva testi precisi:
     - B1: formula prudente (già applicata) e nodo `brand` di Puglia Digitale sospeso;
     - B2: «La forza di un portale nazionale»;
     - B3: senza fonte non si pubblicano «~200.000» e «60%»; «30+» solo con conferma e data, con la composizione a un numero della DV §7.5;
     - I2: «10.000+» tolto senza conferma del perimetro;
     - I6: «I tre mondi» e «Porta la tua impresa in Puglia Digitale» se D1 dice «partner tecnologico»;
     - nota sulla foto dell'evento fino all'originale e alla conferma del cliente.

  Aggiungerei il mio parere aggiornato su DR3 (DV §4.3): (b) per il lancio, (c) appena possibile.

### 3.8 Altre decisioni affidate al creative-director dalle review

| Da | Voce | Decisione |
|---|---|---|
| ui-designer, review | B1-A, minimo di `display-xl` a 44 px sotto i 390 px | Confermata, già applicata. DV §3.2 aggiornata |
| ui-designer, review | Scostamenti dal DS: pillole «Mi interessa», controlli video testuali, anello di 1 px sui nodi del Documento, tacche con gradiente a stop netti | Accettati: coerenti con «il cerchio è l'interazione» e senza sfumature visibili |
| ui-designer, review | Variante tipografica «in pubblicazione» e flag `PUBLIC_SLOT_MODE` | Approvata, con N3 e N9 |
| ui-designer, review | Colore dei nodi-hotspot sulle foto (calce) | Calce sulle foto, per il contrasto su sfondi variabili; blu sulle superfici piatte |
| ui-designer, review | `display-l` in due sezioni consecutive di Città Digitali | Accettato: cambiano superficie (notte → calce) e composizione (carta per latitudine → elenco sticky). La regola §7.2 serve a evitare la monotonia, e qui non c'è |
| ux-designer | Didascalie dei punti caldi: opzione A o B | A, già applicata: su hover e focus cresce solo l'anello |
| web-performance-specialist, review | Elementi visibili al caricamento senza ingresso animato | Accettato, già applicato: l'LCP è visibile dal primo fotogramma |
| brand-strategist | «10.000+» al lancio (I2) | Con conferma del perimetro, opzione A, con l'etichetta confermata. Senza, opzione B: il numero si toglie e la tappa resta (DV §7.3) |
| brand-strategist | Numeri con il solo «30+» (B3) | Si pubblica un solo numero, in `display-xxl` dalla colonna 3, con etichetta e data; il titolo al singolare lo scrive copywriter-brand. Se neanche «30+» è confermato, la sezione non si pubblica (DV §7.5) |
| brand-strategist | Foto dell'evento (B4) | La nota AI è applicata e resta fino all'originale. Senza conferma dell'informativa sulle riprese, ui-designer stringe i ritagli su schermi e palco, escludendo i profili riconoscibili ai margini (DV §4.2), e io li verifico |
| copywriter-content | Citazione del fondatore in Contatti (K1) | Tolta, già applicata. Per la sezione rimasta vedi N5 |
| cro-specialist | Chiusura di Puglia Digitale senza link al portale (oss. 7) | Nessuna obiezione di identità; già applicata |

---

## 4. Stato delle review di dominio

| Dominio (owner) | Verdetto di dominio | Che cosa resta per il go-live |
|---|---|---|
| Fedeltà UI (ui-designer) | Approvabile (ricontrollo dopo c025181; campi del form in 846f142) | V4 e V6, decise qui; suggerimenti del §3.6 |
| Accessibilità (ux-designer) | Conforme WCAG 2.2 AA nel perimetro provato (Chromium): 0 violazioni axe su 64 esecuzioni, 159 prove di focus non coperto | A3: sottotitoli o descrizione del video, endpoint del form, asset o variante «in pubblicazione». Da provare: screen reader reali, Safari e Firefox |
| Performance (web-performance-specialist) | Conforme: LCP applicato 0,93–1,04 s, CLS 0, pagine da 82 a 113 KB, zero terze parti | Controlli sul file video (≤ 25 MiB, faststart, `Range`, 720p e 1080p); hosting: header, compressione e TTFB reale; rimisura breve dopo le modifiche del G4 |
| SEO tecnica (seo-technical) | Build approvata con riserva, go-live bloccato | Oss. 1: inventario degli URL e redirect. Oss. 2: hosting configurato e verificato. Oss. 3: ADR 003 da approvare. Oss. 4: video su itnode.it. L'oss. 5 è chiusa: `npm run check:seo` è nel repository e passa su tutte le 8 pagine |
| Conversione (cro-specialist) | Approvato con modifiche | Oss. 1–3 dipendono dal cliente (asset, dati societari, endpoint). Le oss. 4–8 sono applicate |
| Bozze (copywriter-content) | Non pronto per il go-live | Solo punti che dipendono dal cliente: dati societari, informativa, descrizione del video, fonti dei numeri, D9; C1 con la riserva. Le correzioni di testo sono applicate |
| Veridicità (brand-strategist) | Staging sì: anteprima protetta e non indicizzabile (ADR 004, condizione 1); go-live no finché B1–B5 restano aperti | B1 chiusa con la formula prudente (testo e JSON-LD). B4 chiusa con la nota; resta l'informativa sulle riprese. B2 e B3 con riserva pronta. B5 non ha riserva |

---

## 5. Verdetto di gate G4

### 5.1 Verdetto

**Approvato con condizioni.**
- **La build è approvata.** È fedele alla direzione visiva, supera il test ITnode e la lista §33, e rispetta nel codice le soglie di accessibilità, performance e SEO. Le correzioni che chiedo (C10–C14) sono piccole, già provate e non richiedono un nuovo passaggio di gate: le verificano gli owner di dominio.
- **La pubblicazione non è approvata** finché non sono chiuse le condizioni bloccanti C01–C14. Alcune dipendono dal cliente o dall'utente e non hanno alternativa: dati societari, informativa privacy, inventario degli URL, scelta dell'hosting.
- **Sui gate precedenti.** G1, G2 e G3 non sono mai stati approvati formalmente dall'utente: il lavoro ha seguito il metodo delle linee guida (§34) fino alla build. Nessun deliverable è oggi in stato «approvato». Perché G4 sia superato servono:
  1. questo verdetto;
  2. l'approvazione esplicita dell'utente del G4 e, retroattivamente, dei deliverable di G1–G3 (brief consolidato, strategia di conversione e piano di misurazione, ricerca keyword, budget di performance e ADR 001 per G1; direzione visiva, sitemap, mappa keyword→URL, specifiche SEO, dati strutturati, tone of voice per G2; struttura delle pagine, accessibilità, design system, copy deck, microcopy, alt text, architettura di performance per G3). In alternativa, una dichiarazione esplicita dell'utente che accetta il metodo §34 al posto dei gate intermedi;
  3. il passaggio dei deliverable allo stato «approvato», a cura dei rispettivi owner, dopo l'approvazione.

### 5.2 Condizioni

**Bloccanti per la pubblicazione, dipendono dal cliente o dall'utente**

| ID | Condizione | Chi la chiude | Soglia o motivo |
|---|---|---|---|
| C01 | Approvazione dell'utente: G4, G1–G3 retroattivi (§5.1) e decisioni DR1, DR2, DR3, logo per il web | Utente; poi gli owner aggiornano gli stati | CLAUDE.md, gate |
| C02 | Dati societari obbligatori: sede legale (e se coincide con quella operativa), Registro delle imprese e numero REA, capitale sociale (versato o no); conferma di ragione sociale e P.IVA | Cliente, con la visura; sessione principale in `site.ts`; brand-strategist verifica | Soglia 5 (`check:launch` n. 1) |
| C03 | Privacy Policy definitiva del consulente; Cookie Policy rivista con l'hosting e il servizio del form; misura del testo delle pagine legali (S6) | Cliente e consulente; copywriter-content impagina | Soglia 5 (`check:launch` n. 4) |
| C04 | Endpoint del form scelto, registrato in un ADR e provato. In alternativa, accettazione scritta dell'utente di partire con il ripiego «email già compilata», con una scadenza | Utente o cliente; sessione principale; cro-specialist traccia la bozza email | Conversione principale (`check:launch` n. 3) |
| C05 | Video di Città Digitali: file e permesso di ospitarlo sul sito; transcodifica 720p e 1080p entro 25 MiB, faststart, `Range`; sottotitoli o descrizione secondo il contenuto; nessun lampeggiamento; nessun claim escluso nel video; poster reale (N4). In alternativa, decisione dell'utente di pubblicare senza la sezione video fino all'arrivo del materiale | Cliente per file e informazioni; web-performance-specialist, ux-designer, copywriter-content, brand-strategist; creative-director per il fotogramma | Soglie 1, 2, 3 (`check:launch` n. 6 e 7) |
| C06 | Veridicità: risposte del cliente oppure riserve applicate. B2 portale «ad alto traffico»; B3 numeri; I2 «10.000+»; I6 e D1 «I tre mondi» e «Aderisci»; I1 e F7 fondatore; I7 e N13 funzioni del SIII; I8 esperienze online al lancio; A7 consenso delle imprese; I3 timeline | Cliente risponde; brand-strategist decide la riserva; sessione principale applica | Soglia 1 (`check:launch` n. 5 e N10) |
| C07 | Foto dell'evento: conferma dell'informativa sulle riprese ai partecipanti, altrimenti ritagli ristretti (§3.8) | Cliente e consulente; ui-designer; creative-director verifica | Diritti delle persone ritratte |
| C08 | Hosting di produzione scelto (ADR 001) e configurato: 404 con stato 404, 301 per barra finale, `http` e `www`, nessuna copia su sottodomini tecnici, header e compressione verificati, TTFB misurato dall'Italia, pannello allineato all'ADR 003; Search Console verificata via DNS prima del cambio | Utente sceglie; seo-technical, web-performance-specialist, sessione principale | Soglie 3 e 4 |
| C09 | Inventario degli URL del sito attuale e mappa dei redirect completa, `_redirects` generato dal CSV e provato in staging | Cliente (export di Search Console o accesso); seo-technical | Soglia 4 |

**Bloccanti per la pubblicazione, a carico del team** (non dipendono dal cliente)

| ID | Condizione | Chi la chiude |
|---|---|---|
| C10 | Correzioni decise qui: I4 (§3.4), V4 (§3.2), V6 (§3.3), V10 e V14 (§3.6), cascata (N1) | Sessione principale applica; ui-designer verifica la fedeltà; ux-designer riesegue parole spezzate, testo tagliato e giro da tastiera su Home e `/siii/`; copywriter-brand allinea il copy deck (I4) |
| C11 | Coordinate secondo la regola della DV §1.4 (N2) | Sessione principale; brand-strategist verifica la fonte |
| C12 | Se manca anche un asset: build di produzione con `PUBLIC_SLOT_MODE=publish`; su `/siii/` pannelli senza testo e con i gradi (N3, V9) | Sessione principale; ui-designer |
| C13 | Controllo di go-live esteso (N10) e verde; `check:seo` verde; Rich Results Test e validator.schema.org su Home e Città Digitali | Sessione principale; seo-technical |
| C14 | Rimisura breve di performance (Home e `/siii/`) e verifica di accessibilità dopo C10–C12 | web-performance-specialist; ux-designer |

**Consigliati prima del lancio, non bloccanti**
- Le tre schermate delle esperienze SIII: sono la prova più forte della pagina di prodotto (§6, materiali, punto 1).
- S10 e N6 (404), N7 (nodo sul palco), N9 (coordinate ripetute nelle porte), N5 (Contatti, sezione Persona).

**Dopo il lancio**
- Suggerimenti: V15, V17, S5, S6 (lead), S8 con le foto dei luoghi.
- Anteprima «Prova qui» delle esperienze SIII, se i portali permettono l'incorporamento e se il consenso sui cookie lo consente.
- Shooting del fondatore e dei luoghi.
- RUM `web-vitals`, se approvato.
- Backlog degli esperimenti di cro-specialist (E1 per primo).
- Prove con screen reader reali, Safari e Firefox.

### 5.3 Che cosa è pronto nella build e che cosa manca dal cliente

| Pronto nella build | Manca dal cliente o dall'utente |
|---|---|
| Otto pagine complete, design system, contenuti, form con tutti gli stati e senza invii simulati | Dati societari, informativa privacy definitiva |
| Accessibilità: nessuna inadempienza AA nel perimetro provato | Sottotitoli o descrizione del video, che dipendono dal contenuto |
| Performance dentro il budget su tutti i template | File del video e permesso di ospitarlo; hosting |
| Dati strutturati, sitemap, robots, canonical, 404; controlli `check:seo` e `check:launch` nel repository | Inventario degli URL attuali; DNS; decisione sui crawler di AI |
| Formule prudenti, note AI, riserve pronte per ogni claim | Risposte alle domande di veridicità (D1, D5, D7, F7, N5, N8, N13, D9, A7) |
| Variante «in pubblicazione» per ogni asset mancante | Schermate SIII, foto dei luoghi, originale della foto dell'evento, logo vettoriale, ritratto reale |
| Anteprima su Railway protetta da password e non indicizzabile (ADR 004) | Endpoint del form, oppure l'accettazione del ripiego |

### 5.4 Percorso fino alla pubblicazione

1. **Subito.**
   - L'utente approva (C01) e invia al cliente l'elenco del §6, con il link dell'anteprima e la password.
   - Decide hosting (ADR 001), endpoint (C04), ADR 002 e 003.
2. **In parallelo.** La sessione principale applica C10–C13; ui-designer, ux-designer e web-performance-specialist verificano (C14).
3. **Staging sull'hosting scelto.** seo-technical configura e scrive la checklist di lancio (`docs/seo/checklist-lancio.md`); si provano redirect e normalizzazioni.
4. **Arrivo dei materiali.**
   - La sessione principale li integra.
   - Il creative-director rivede ogni asset, sceglie il poster del video e controlla i ritagli; ui-designer verifica le misure.
   - Non serve un nuovo gate.
5. **Scadenza concordata con il cliente.**
   - Ciò che non è confermato va online con la riserva (ADR 002).
   - Dati societari, informativa, inventario degli URL e hosting non hanno riserva: senza, non si pubblica.
6. **Via libera.** `check:launch`, `check:seo` e i test di staging verdi, poi l'approvazione finale dell'utente, poi il cambio DNS e il monitoraggio di seo-technical.

---

## 6. Da girare al cliente

> **Nuovo sito ITnode: che cosa ci serve per andare online**
>
> Il sito è costruito e potete vederlo nell'anteprima protetta (link e password a parte). Per pubblicarlo ci servono alcune decisioni, dati e materiali. Per ogni punto indichiamo che cosa succede se non arriva in tempo: dove c'è un'alternativa, il sito esce comunque, con testi prudenti o con varianti grafiche già pronte. Dove non c'è, il sito non può andare online.
>
> **A. Decisioni**
> 1. **Approvazione del lavoro.** Strategia, direzione visiva (l'idea «L'orizzonte dei luoghi», con i luoghi indicati per direzione e distanza dalla sede di Acquaviva), struttura delle pagine, testi e sito in anteprima.
> 2. **Hosting e dominio.** Dove pubblicare il sito (proposte: Cloudflare, Netlify o Railway, con pro e contro nel documento dedicato) e chi gestisce il DNS di itnode.it. *Senza: non si pubblica.*
> 3. **Modulo di contatto.** A quale servizio e a quale indirizzo devono arrivare le richieste. Requisiti: dati conservati nell'UE, nessun cookie, protezione dallo spam. *Senza:* possiamo partire con un modulo che prepara un'email già compilata, se ci confermate per iscritto questa scelta e una data entro cui attivare il servizio.
> 4. **Motori di ricerca basati sull'AI.** Se il sito può essere letto dai crawler di AI. Consigliamo di sì, per comparire nelle risposte dei motori generativi. *Senza:* resta l'accesso aperto.
> 5. **Regola sui testi da verificare e sulle immagini elaborate con AI.** Al lancio i testi non confermati escono nella versione prudente che vi mostriamo; le immagini elaborate con AI portano una nota di trasparenza.
> 6. **Ritratto del fondatore.** Pubblicare i ritratti attuali in bianco e nero con la nota «Immagine generata o elaborata con strumenti di intelligenza artificiale», oppure organizzare un ritratto fotografico reale. Consigliamo i ritratti attuali per il lancio e uno scatto reale appena possibile.
> 7. **Grafie.** «ITnode» nei testi e «ITNODE S.r.l.» nei dati legali, con il logotipo «itNode» invariato. «Siti Interattivi Immersivi» anche nel sottotitolo di Città Digitali, dove le vostre linee guida scrivono «Siti Immersivi Interattivi».
> 8. **Logo per il web.** Solo la scritta, senza la trama poligonale, che resta per gli usi grandi.
> 9. **Modulo.** Etichetta «Email aziendale» (con la nota che va bene anche un indirizzo personale) oppure «Email».
> 10. **«36 anni dentro l'innovazione».** Chi aggiorna il numero ogni anno, oppure l'anno di inizio, per calcolarlo in automatico.
>
> **B. Dati e conferme**
> 1. **Dati societari dalla visura:** sede legale (coincide con la sede operativa di Via Sant'Anna 34?), iscrizione al Registro delle imprese e numero REA, capitale sociale (interamente versato?), PEC. Conferma di «ITNODE S.r.l.» e della P.IVA 08937270729. *Senza: non si pubblica (obbligo di legge).*
> 2. **Informativa privacy definitiva** dal vostro consulente, che tenga conto dell'hosting e del servizio del modulo, e revisione della cookie policy. *Senza: non si pubblica.*
> 3. **Puglia Digitale.** Il ruolo di ITnode: ideatore e titolare del marchio e del portale lapugliadigitale.it, partner tecnologico o altro? Chi è titolare del marchio registrato? *Senza:* il sito presenta Puglia Digitale senza dire che l'ha creata ITnode.
> 4. **Città Digitali.** ITnode la gestisce ed è titolare di marchio e portale? *Senza:* testo prudente.
> 5. **Numeri di Puglia Digitale.** Mese e anno dei dati. Le «30+ città» sono tutte pugliesi (ci mandate l'elenco)? Fonte, anno e definizione di «~200.000 partite IVA» e «60% del tessuto produttivo». *Senza:* le partite IVA e la percentuale non si pubblicano; «30+» esce solo con la data.
> 6. **Traffico del portale Città Digitali.** Un export degli analytics con metrica e periodo. *Senza:* il titolo diventa «La forza di un portale nazionale».
> 7. **Fondatore.** «Giacomo Lenoci, fondatore di ITnode» è corretto? È l'unico fondatore? Per «10.000+ clienti»: di quali aziende, in che periodo, contati come? Per la timeline: a che cosa si riferisce il 2002, come si chiamava la prima azienda, si scrive «iComm Lab» o «IcommLab», il percorso comincia in IBM? *Senza:* il numero dei clienti si toglie; il resto esce com'è.
> 8. **Immagini.** I ritratti sono foto reali ritoccate o immagini generate? Che cosa è stato modificato con Gemini nella foto dell'evento? Data, luogo e autore della foto; ai partecipanti è stata data un'informativa sulle riprese? *Senza:* resta la nota AI e stringiamo le inquadrature per escludere le persone riconoscibili.
> 9. **Esempi SIII.** Masseria Santella, Maison Miminà e D.L. Natura Dentro hanno dato il consenso a comparire con nome e immagini? Nomi e comuni sono corretti? Le tre esperienze resteranno online? Prenotazione e azioni commerciali sono incluse in ogni SIII o sono opzionali, e avvengono dentro il SIII o su sistemi esterni? *Senza:* le schermate delle esperienze non si pubblicano senza il consenso delle imprese; un'esperienza non più online si toglie; le funzioni si descrivono come «in base alle funzioni che scegli».
> 10. **Video di Città Digitali.** Il file originale e il permesso di ospitarlo sul nuovo sito; durata; c'è parlato? Ci sono numeri, loghi istituzionali o affermazioni sui risultati? Data di prima pubblicazione. *Senza:* il video resta fuori finché non è pronto.
> 11. **Colori ufficiali** (HEX o Pantone) di ITnode, Puglia Digitale e Città Digitali.
> 12. **Il significato della quarta «I» di SIII.**
>
> **C. Materiali**
> 1. **Schermate delle tre esperienze SIII** (Masseria Santella, Maison Miminà, D.L. Natura Dentro): formato 16:10, almeno 2560 × 1600 px, più la vista da smartphone. Sono la prova più forte della pagina SIII: le raccomandiamo prima del lancio. *Senza:* al loro posto una grafica astratta.
> 2. **Un'esperienza SIII vista da smartphone:** verticale 3:5, almeno 1200 × 2000 px.
> 3. **Foto reali di Monopoli, Acquaviva delle Fonti e Gravina in Puglia:** verticale 3:5, lato lungo di almeno 2400 px. Luoghi quotidiani guardati con attenzione, luce naturale, orizzonte visibile. No droni saturi, HDR, tramonti da cartolina, visori VR. *Senza:* varianti tipografiche già pronte.
> 4. **Foto dell'evento Puglia Digitale originale**, senza cornice, logo né scritte sovrapposte, alla massima risoluzione.
> 5. **Logo ITnode vettoriale ufficiale** (positivo e negativo) e **marchi di Puglia Digitale e Città Digitali** in SVG.
> 6. **Un ritratto reale del fondatore** in un luogo vero (ufficio o Acquaviva), luce naturale, formato 4:5. Facoltativo, ma è il miglioramento più forte del sito.
> 7. **Elenco delle 30+ città** di Puglia Digitale.
>
> **D. Accessi**
> 1. Per non perdere le visite del sito attuale: **export di Google Search Console** (Pagine, Prestazioni degli ultimi 16 mesi, Link), **sitemap attuale**, oppure accesso al CMS o all'hosting attuale. *Senza: non si pubblica*, perché gli indirizzi del vecchio sito finirebbero in errore.
> 2. **Accesso al DNS** di itnode.it, o il contatto di chi lo gestisce.
> 3. Che cosa fare del **servizio Railway «itnode-website-production»**, che oggi ospita il video e forse il sito attuale: spegnerlo o reindirizzarlo dopo il lancio, così che non resti online una copia del vecchio sito.
> 4. **Profili ufficiali** (per esempio la pagina aziendale LinkedIn) e **domini definitivi dei portali**.
> 5. Facoltativo: uno smartphone Android di fascia media o un servizio di test su dispositivi reali, per una verifica sul campo prima del lancio.

---

## Ipotesi da validare

- [IPOTESI: le decisioni prese su prove in pagina (I4, V4, V6, V14, N1) si comportano come misurato anche una volta scritte nei componenti. La verifica spetta agli owner in C10 e C14.]
- [IPOTESI: il preload del font si comporta sul campo come in laboratorio con Chromium; Safari per iOS non è misurato (ADR 005).]
- [IPOTESI: il video di Città Digitali è coerente con il registro dei claim. Nessuno del team l'ha visto.]
- [IPOTESI: le schermate SIII si possono catturare dalle esperienze pubbliche con il consenso delle imprese (A7).]
- Tutte le verifiche visive di questa review sono su Chromium: Safari iOS resta da provare per tipografia, `text-wrap: balance`, `:has()` e subgrid (DV, Ipotesi).

## Domande aperte

- **Per il cliente:** quelle del §6, che raccolgono D1, D3, D5, D7, D9, D10, D11 del brief consolidato e le domande della review di veridicità.
- **Per l'utente:** il messaggio al cliente parte insieme all'anteprima? Con quale scadenza per le risposte, oltre la quale si applicano le riserve?
- **Per web-performance-specialist:** conferma che la rimisura breve dopo C10 vede ancora l'H1 come elemento LCP della Home, con la nuova riga in `lead`.
- **Per ux-designer:** conferma che il nuovo `<p>` della hero (I4) e la cascata (N1) non introducono testo tagliato con la spaziatura di 1.4.12 a 320 px.

## Decisioni richieste

- **Utente:**
  - approvazione del G4 alle condizioni del §5 e, retroattivamente, di G1–G3 (§5.1);
  - hosting e DNS (ADR 001);
  - endpoint del form, o accettazione scritta del ripiego con una scadenza (C04);
  - ADR 002 (dopo i ritocchi del §3.7) e ADR 003;
  - DR1, DR2, DR3 e logo per il web;
  - eventuale lancio senza la sezione video (C05);
  - budget e tempi per lo shooting del fondatore e dei luoghi.
- **Sessione principale:** applicare C10–C13 e N5–N9 dove indicato; far rimisurare e verificare (C14); inviare il §6 con l'anteprima.
- **brand-strategist:** ritocchi dell'ADR 002 (§3.7); fonte unica delle coordinate (N2).
- **web-performance-specialist:** riallineare `budget.md` e `architettura.md` all'ADR 005.
- **ui-designer:** allineare il design system a S4 e alla DV 0.2; verificare C10 e C12.
- **copywriter-brand:** copy deck della Home (I4); titolo della sezione dei numeri al singolare, se servirà (B3); link della sezione Persona in Contatti (N5).
