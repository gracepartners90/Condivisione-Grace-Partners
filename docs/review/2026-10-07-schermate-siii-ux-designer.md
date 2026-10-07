---
titolo: Schermate SIII nel sito · accessibilità e UX
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-07
fonti: [commit d06a3e9 (schermate) e 88d7083 (link sulla schermata, decisione dell'utente del 2026-10-07), src/pages/index.astro, src/pages/siii.astro, src/data/media.ts, src/components/ui/Media.astro, docs/contenuti/alt-text.md, docs/review/2026-10-07-schermate-siii-cro-specialist.md (oss. 1), docs/ux/accessibilita.md (0.8: §2.8, §2.14, Appendice D), docs/ux/struttura-pagine.md (HM-5, SI-1, SI-6), staging http://127.0.0.1:4321 (d06a3e9), copia del repository a fab6143 con 88d7083 (build servita in locale), Playwright 1.56 con Chromium 141, albero di accessibilità e hit test via CDP, axe-core 4.13 del 2026-10-07]
oggetto: ruolo e testi alternativi delle cinque schermate SIII, ordine di lettura, link sulla schermata degli esempi, nodi decorativi, ritaglio 4:5 della hero, colori forzati e zoom
---

# Schermate SIII nel sito · accessibilità e UX

## In sintesi
- **Le cinque schermate sono informative e tengono il testo alternativo.** Mostrano com'è fatto un SIII vero, cosa che il testo non può fare. L'ordine di lettura è giusto ovunque: nella hero dopo le CTA, negli esempi prima del nome, nel capitolo 01 tra statement e testo.
- **Il link sulla schermata degli esempi (decisione dell'utente, commit 88d7083) è conforme.**
  - Uno strato `<a>` trasparente sopra l'immagine, `tabindex="-1"` e `aria-hidden="true"`, verso l'esperienza in una nuova scheda.
  - axe non trova violazioni nuove. Nella tabulazione restano solo i tre CTA. Nell'albero di accessibilità ogni esempio ha l'immagine con il suo alt e un solo link.
  - Con il puntatore il clic funziona su tutta la schermata, cursore `pointer`, e apre la nuova scheda.
  - **Un limite, non bloccante.** Nell'esplorazione al tocco degli screen reader, sopra la schermata il dito trova lo strato nascosto, e l'albero risale a un contenitore senza nome. Lì dove chi vede ha un'area cliccabile, chi usa lo screen reader non sente nulla. L'immagine resta raggiungibile scorrendo, e il CTA porta all'esperienza. Da verificare con VoiceOver e TalkBack (§2.3). **Nessuna patch.**
- **Nodi decorativi nascosti sopra le schermate vere: giusto.** Non vanno allineati ai punti interattivi veri: li disegna già la schermata. Pulizia facoltativa: oggi quei nodi sono sempre nascosti e si possono togliere dal markup (§3).
- **Ritaglio 4:5 della hero sotto i 64em: accettabile.** Si perdono metà del logo, l'icona del menu in alto e due pulsanti del menu laterale in basso. Il testo alternativo resta vero. Ancorare l'immagine in alto salva il logo ma taglia metà del menu: non è meglio, e la composizione la decide il creative-director (§4).
- **Colori forzati e zoom 200% e 400%: in regola** (§5).
- **Una richiesta a copywriter-content:** togliere «il pulsante per entrare nell’esperienza» dagli alt dei tre esempi (§6.1).

## 1. Ruolo delle schermate e ordine di lettura

| Dove | Ruolo | Ordine di lettura (CDP, 390 e 1440 px) | Esito |
|---|---|---|---|
| Home, capitolo 01 (Masseria Santella dall'interno) | Informativa: mostra un SIII in uso, con il menu delle azioni e i punti interattivi. Il testo del capitolo ne parla in generale | H3 «SIII – Siti Interattivi Immersivi» → statement → immagine con l'alt → testo → «Esplora SIII» | Giusto. Un solo elemento focalizzabile nel capitolo, la CTA (HM-5) |
| `/siii/`, hero (Masseria Santella su smartphone) | Informativa: un SIII su un telefono | H1 → statement → «Esplora gli esempi» → «Richiedi un’offerta» → immagine con l'alt → H2 della sezione successiva | Giusto: a schermo l'immagine segue le CTA sul telefono e sta a destra su desktop |
| `/siii/`, esempi (vista d'apertura di ogni esperienza) | Informativa: com'è fatta l'esperienza che il CTA apre | Per ogni voce della lista: immagine con l'alt → H3 → luogo e portale → frase → «Entra nell’esperienza di … (si apre in una nuova scheda)» | Giusto. L'immagine prima del nome va bene, come nelle porte di Puglia Digitale: la voce della lista tiene tutto insieme (1.3.1), e l'ordine è quello visivo |

- **Decorative no.** Con `alt=""` si perderebbe l'unica descrizione di com'è fatto un SIII per chi non vede, e la pagina vende proprio quello.
- **Gli alt di `media.ts`** seguono gli schemi di `alt-text.md` e hanno lunghezze ragionevoli, da 173 a 201 caratteri. La revisione del testo spetta a copywriter-content (in corso); l'unica osservazione di accessibilità è in §6.1.

## 2. Link sulla schermata degli esempi (commit 88d7083)

Lo schema è deciso dall'utente: «metti il link anche sull'immagine… Il link deve aprire una nuova scheda». Qui verifico come è fatto.

### 2.1 Prove (copia a fab6143, build in locale)

| Prova | Esito |
|---|---|
| axe-core 4.13, `/siii/` e Home, a 390 e 1440 px, con e senza movimento ridotto, anche dopo aver fatto scorrere tutta la pagina | Nessuna violazione nuova: `aria-hidden-focus` passa, perché lo strato ha `tabindex="-1"`. L'unica segnalazione, `target-size` sul link «SIII» del footer a 390 px, c'è identica anche sullo staging senza strato. È un falso positivo di posizione: a fondo pagina l'header sticky copre il link; portato in vista, il link misura 30 × 44 px ed è libero |
| Ordine di tabulazione nella sezione, a 390, 1024 e 1440 px | Tre fermate: i tre «Entra nell’esperienza». Lo strato non entra |
| Albero di accessibilità | Per ogni esempio: immagine con l'alt → H3 → link. Lo strato non c'è (`ariaHiddenElement`) |
| Puntatore: clic al centro (il play) e in un angolo della schermata, nei tre esempi, a 390 e 1440 px | Nuova scheda sull'esperienza giusta; la pagina resta su `/siii/`. Cursore `pointer` su tutta la schermata |
| Area di tocco | Tutta la schermata, da 350 × 219 px in su: molto oltre i 24 × 24 px (2.5.8) |
| Azione predefinita delle tecnologie assistive sull'immagine (clic simulato sull'elemento, come fa Chromium per TalkBack) | Nessuna azione: lo strato è un fratello dell'immagine, non un antenato. Chi usa lo screen reader non apre per sbaglio una scheda toccando due volte l'immagine. Per VoiceOver da verificare su iPhone |
| Esplorazione al tocco (hit test del layout via CDP, poi il primo antenato non ignorato, come fanno le tecnologie assistive) | **Senza strato:** sotto il dito c'è l'immagine con il suo alt. **Con lo strato:** sotto il dito c'è lo strato nascosto, e l'albero risale a un contenitore senza nome, in tutti e tre gli esempi |
| Colori forzati (Appendice D.1 e D.2) | Nessun cambiamento: lo strato è trasparente e non ha focus da tastiera |

### 2.2 Verdetto sullo schema
**Conforme a WCAG 2.2 AA, e lo approvo.**
- Tastiera e screen reader hanno un solo link per esempio, il CTA, che dice la destinazione e la nuova scheda (2.4.4).
- Il puntatore ha l'area grande che la schermata promette con il suo play: la falsa affordance di `d06a3e9` è risolta.
- L'immagine tiene il suo alt, mentre lo schema che avvolge l'immagine nel link lo avrebbe perso: questo schema è migliore.

### 2.3 Il limite dell'esplorazione al tocco
- **Che cosa succede.** Lo strato è il primo elemento sotto il dito, ma è nascosto. Le tecnologie assistive risalgono allora al primo antenato esposto, un contenitore senza nome: VoiceOver e TalkBack non leggono l'immagine e neppure un link. Scorrendo con un dito, invece, l'immagine si legge come prima.
- **Perché non propongo una patch.** Le varianti costano più di quanto risolvono.
  - **Esporre lo strato come link,** con il nome del CTA: il tocco direbbe «Entra nell’esperienza…, link», ma chi scorre sentirebbe due link uguali per ogni esempio, sei nella sezione invece di tre.
  - **Dare un nome al contenitore** (`role="img"` con l'alt): il tocco direbbe la descrizione. Ma su iOS il doppio tocco sull'immagine può trovare lo strato e aprire una nuova scheda senza preavviso.
  - **Allungare il CTA sopra la schermata** con il posizionamento ad ancora del CSS: un solo link, letto anche al tocco. Però non tutti i browser lo supportano, e servirebbe un secondo meccanismo di riserva.
- **Da verificare** con VoiceOver su iPhone e TalkBack su Android. Se chi esplora al tocco si perde, la variante consigliata è la prima, con il nome identico al CTA.

## 3. Nodi decorativi sopra le schermate
- **Nasconderli è giusto; allinearli ai punti interattivi veri no.**
  - La schermata disegna già i suoi punti e il suo menu: due anelli sullo stesso punto sarebbero un doppione.
  - Nodi in posizioni inventate mostrerebbero punti interattivi che l'esperienza non ha (veridicità).
  - Il ping aggiunge movimento sopra un'immagine che non si muove.
  - Le posizioni cambierebbero con il ritaglio: 3:5 su desktop, 4:5 sui telefoni.
- **[SUGGERIMENTO] Pulizia del markup.** Con `image` `Media` disegna sempre la `<picture>`, mai lo slot. I tre nodi del capitolo 01 e i tre della hero sono quindi sempre nascosti, e la regola dipende da `:has()`: nei browser che non lo conoscono, comparirebbero sopra le schermate. Si possono togliere dal markup, insieme alle regole CSS dedicate. In `index.astro` va via anche l'import di `Node`; in `siii.astro` resta, perché `Node` serve altrove. Non cambia nulla a schermo.

## 4. Ritaglio 4:5 della hero sotto i 64em

| Larghezza | Riquadro | Che cosa si perde (taglio centrato, 12,5% sopra e sotto) |
|---|---|---|
| 320, 390 | 280 × 350, 350 × 437 | Metà del logo, l'icona del menu in alto a destra, gli ultimi due pulsanti del menu laterale, l'avatar in basso a destra |
| 600–1000 | 416 × 520 | Lo stesso |
| Da 1024 | 382 × 637 (3:5) | Niente |

- **Accettabile per l'accessibilità.** Restano visibili gli elementi che il testo alternativo nomina: la sala con la volta, il divanetto, la porta a vetri, il menu delle azioni (in parte) e il punto interattivo.
- **Provato anche il taglio ancorato in alto** (`position="50% 0%"`): logo e icona del menu interi, ma il menu laterale si ferma a metà. Non è meglio, è un altro compromesso. La composizione resta al creative-director (direzione visiva §7.4).

## 5. Colori forzati e zoom

| Prova | Esito |
|---|---|
| Colori forzati, Appendice D.1, `/` e `/siii/`, a 390 e 1440 px, staging e copia con lo strato | Ogni fermata del Tab ha il suo contorno; nessun segno sparisce, salvo il residuo accettato `a::after` |
| Colori forzati, Appendice D.2 | Solo i residui accettati (`.chapter__rule`, `.compare__horizon`). Le schermate sono immagini e restano |
| Zoom 200% (1280 × 800 → 640 × 400 px CSS) e 400% (320 × 256), `/siii/` e Home, con e senza le spaziature di 1.4.12 | Nessuno scorrimento orizzontale. L'header non è più sticky, come previsto sotto i 480 px di altezza. Schermate dentro la colonna: hero 416 × 520 e 280 × 350; esempi e capitolo 01 585 × 366 e 280 × 175. Gli strati coprono sempre tutta la schermata |

## 6. Altre osservazioni

### 6.1 [SUGGERIMENTO] Alt degli esempi: niente «pulsante» disegnato
- **Dove.** `src/data/media.ts`, `siiiExampleScreens`.
  - In `d06a3e9`: «…con il pulsante per entrare nell’esperienza e il menu delle azioni».
  - Nella revisione in corso di copywriter-content, non ancora committata: «…con il pulsante di avvio e il menu dell’esperienza».
- **Problema.** Chi usa lo screen reader sente di un pulsante che per lui non c'è: lo strato è nascosto, e il modo di entrare è il CTA che segue. «Pulsante di avvio» è già meno ambiguo di «pulsante per entrare», ma resta il nome di un comando.
- **Proposta.** Descrivere la vista, non i comandi disegnati: per esempio «…in una vista a piccolo pianeta, la schermata d’avvio dell’esperienza, con il menu». Non è bloccante, e il testo lo decide copywriter-content (`alt-text.md`).

### 6.2 Nota per gli strumenti
WAVE e altri validatori possono segnalare i tre strati come «link vuoti». È voluto: sono nascosti alle tecnologie assistive e fuori dalla tabulazione, e il link con il testo è il CTA.

## Verdetto di dominio (accessibilità)
**Schermate e link sull'immagine conformi a WCAG 2.2 AA.**
- Nessuna correzione obbligatoria.
- Restano tre suggerimenti: l'alt degli esempi (§6.1), la pulizia dei nodi (§3) e la verifica dell'esplorazione al tocco con VoiceOver e TalkBack (§2.3).
- Il verdetto di gate spetta al creative-director.

## Ipotesi da validare
- **Esplorazione al tocco** con VoiceOver (iOS) e TalkBack (Android) sopra gli esempi. La misura qui è un hit test di Chromium, non uno screen reader. `[DA FORNIRE: dispositivi o servizio di test]`
- **Colori forzati su Windows reale**, come per le carte. `[DA FORNIRE]`

## Domande aperte
- **copywriter-content:** alt dei tre esempi senza il pulsante disegnato (§6.1).
- **creative-director:** taglio della hero sotto i 64em, centrato o ancorato in alto (§4).

## Decisioni richieste
- **Sessione principale:** nessuna correzione obbligatoria. Facoltativo: togliere dal markup i nodi sempre nascosti (§3).
