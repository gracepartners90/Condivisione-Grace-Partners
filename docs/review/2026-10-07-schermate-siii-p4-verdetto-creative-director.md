---
titolo: Verdetto del creative-director · schermate SIII, capitolo 02 della Home (P4) e nuova foto dell'evento
owner: creative-director
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-07
fonti: [richieste della sessione principale del 2026-10-07 (sezioni A e B, decisioni 1–7, nuova foto dell'evento), le nove schermate in src/assets/images/siii-*.jpg, docs/review/2026-10-07-schermate-siii-cro-specialist.md, docs/review/2026-10-07-schermate-siii-ux-designer.md, docs/review/2026-10-07-schermate-siii-web-performance-specialist.md, docs/review/2026-10-07-carta-terra-di-bari-ux-designer.md, docs/review/2026-10-07-p4-verifica-build-ui-designer.md, docs/contenuti/alt-text.md (1.6), docs/contenuti/copy-deck/home.md (1.5), docs/creativa/direzione-visiva.md (0.12), docs/decisioni/002-veridicita-staging-e-immagini-ai.md, docs/decisioni/005-preload-del-font.md (1.2), staging http://127.0.0.1:4321 (build di d3eba9c), catture della sessione principale in scratchpad/siii-shots/ e scratchpad/p4-shots/, prove del creative-director del 2026-10-07 con Playwright 1.56 e Chromium 141 (scratchpad/cd-siii/)]
---

# Verdetto · schermate SIII, capitolo 02 della Home e foto dell'evento

Le novità sono già nell'anteprima, su richiesta dell'utente («pubblica prima, poi rivedete»). Questo verdetto le rivede (Fase 5). Non è un nuovo verdetto di gate: il G4 resta con le sue condizioni.

## In sintesi

- **A. Schermate SIII: approvate con modifiche.** Le viste scelte sono giuste e reggono il sistema: le schermate vere hanno preso il posto dei segnaposto senza cambiare una composizione. Prima del go-live resta bloccante il consenso delle tre imprese (A7).
- **B. P4 nel capitolo 02 della Home: approvata.** Con la Puglia intera nel 02 e l'Italia nel 03, il gesto «dalla regione all'Italia» è letterale.
- **Decisioni:**

| # | Domanda | Decisione |
|---|---|---|
| 1 | Hero di `/siii/`: sala o facciata | **La sala**, con il ritaglio 4:5 fatto in build (`mobileCrop`). La facciata no |
| 2 | Inquadratura 4:5 sotto i 64em | **Ancorata in basso**, né al centro né in alto |
| 3 | ADR 005: finestra del ripiego più lunga sulle reti lente | **Si accetta**, con la mitigazione del ritaglio 4:5 e una soglia di sorveglianza (ADR 005 1.3) |
| 4 | Nodi sopra le schermate vere | **Restano fuori**, e si tolgono anche dal markup |
| 5 | Riga con il nome sotto la hero | **Sì**, con il consenso A7. Vale anche per il capitolo 01 della Home |
| 6 | Qualità delle viste e coerenza con la direzione visiva | **Approvate.** Regole nella direzione visiva 0.13, §4.8 |
| 7 | Carta della Terra di Bari, ora senza uso | **Si toglie**, con la patch di ui-designer |

- **Nuova foto dell'evento per la Home** (§4): stessi formati e stessi nodi di oggi, ritagli ricalcolati per avere interi i due schermi. La nota AI resta, e nessuna didascalia con luogo e data. Va chiesto all'utente se aggiornare anche `/puglia-digitale/`.
- **Documenti aggiornati:** direzione visiva 0.13 (§1.4, §4.2, §4.6, §4.8 nuovo, §7.3, §7.4) e ADR 005 1.3.

## 1. Che cosa ho guardato

- **Le nove schermate**, intere, in due fogli di confronto: quattro desktop da 2000 × 1250 px e cinque da smartphone da 1200 × 2000 px.
- **Lo staging di d3eba9c**, con Playwright e Chromium a 1440 × 900 e 390 × 844 px:
  - la hero di `/siii/` con la sala e con la facciata della reception, montata al posto della sala per la prova;
  - il ritaglio 4:5 della hero sotto i 64em al centro, in alto e in basso, con la sala e con la facciata;
  - i capitoli 01, 02 e 03 della Home in sequenza.
- **Le catture della sessione principale:** esempi di `/siii/` a 390, 1024 e 1440 px, capitolo 01, capitolo 02 con P4.
- **Le cinque review** del 2026-10-07 e gli alt definitivi di `alt-text.md` 1.6.

## 2. A · Schermate SIII

### 2.1 Le decisioni

**1. Hero: la sala, con il ritaglio in build. La facciata no.**
- Nella hero la facciata, da sola, è l'immagine più forte: pietra bianca, porta azzurra, cielo. Messa accanto al titolo «SIII» fa tre cose che non vanno:
  - il blu saturo e la luce piena sulla notte tolgono il primo piano al titolo, che è il protagonista della pagina;
  - la metà bassa è un selciato stirato dalla proiezione, ben visibile a 416 × 693 px;
  - porterebbe l'LCP a 1,95–1,99 s in laboratorio, senza margine sull'obiettivo di 2,0 s.
- La sala mostra il prodotto in uso dentro uno spazio vero. I toni caldi stanno sulla notte (la temperatura della pagina, DV §7.2), e il punto interattivo sulla porta dice «esplora».
- **Con il ritaglio 4:5 in build** (osservazione 3 di web-performance-specialist):
  - sui telefoni la porta pesa il 23% in meno e l'LCP scende di 114 ms, a 1,58 s in laboratorio;
  - si accorcia anche la finestra del ripiego (decisione 3).

**2. Sotto i 64em: ritaglio 4:5 ancorato in basso.**
- A 390 × 844 la porta inizia a 550 px: nella prima schermata se ne vedono 294 px su 437. Conta quello che c'è in quella parte.
  - **Al centro**, cioè oggi: metà logo tagliato sul bordo, poi soffitto bianco. La sala arriva in fondo alla schermata.
  - **In alto**: logo intero e altro soffitto. La sala scende sotto la prima schermata, e il menu si ferma a metà.
  - **In basso**: menu intero, la volta, la lampada, il divano e il punto interattivo sulla porta, già nella prima schermata. Sul bordo non resta nessun elemento tagliato: si perdono solo soffitto vuoto, logo e icona del menu.
- Il testo alternativo resta vero: sala con la volta, porta a vetri, menu, punto interattivo. Il nome della masseria lo dice la riga della decisione 5.
- **Snippet** (con la patch `media-mobilecrop.patch` di web-performance-specialist):

```astro
<Media image={siiiHeroScreen.image} alt={siiiHeroScreen.alt} sizes="(min-width: 30rem) 26rem, 90vw" priority
  mobileCrop={{ ratio: 4 / 5, widths: [480, 640, 768, 1080], position: 'bottom' }} class="siii-hero__media" />
```

  - Se la patch non entra subito, `position="50% 100%"` sulla `<Media>` di oggi dà la stessa inquadratura con `object-fit`.
  - `[DA VERIFICARE]` sulla build: il ritaglio di sharp con `position: 'bottom'` deve coincidere con la mia prova (`object-position: 50% 100%`).

**3. ADR 005: si accetta la finestra del ripiego più lunga.**
- Sul 4G lento la finestra passa da 0,23–0,26 a 0,48–0,53 s. Con il 4G veloce cresce al massimo di 35 ms.
- L'LCP ha soglie, la finestra del ripiego no. Sulla pagina che vende il SIII la schermata è la prova più forte, e deve arrivare per prima.
- Il ritaglio della decisione 1 riduce la finestra da 967 a 805 ms in laboratorio e da 478 a 418 ms sul 4G lento, a 1,75x.
- **Sorveglianza:** se sull'host reale, in HTTP/2, la finestra supera i 600 ms sul 4G lento, web-performance-specialist prova la porta senza `fetchpriority` e sceglie con le misure, senza nuovo assenso.
- Registrato nell'ADR 005, versione 1.3.

**4. Nodi: restano fuori dalle schermate vere, e si tolgono dal markup.**
- I punti li disegna già l'interfaccia. I nostri sarebbero doppioni, o punti che l'esperienza non ha.
- Oggi sono nascosti con `:has()`: nei browser che non lo conoscono comparirebbero sopra le schermate, con il loro ping (ux-designer, §3).
- Nel capitolo 01 della Home e nella hero di `/siii/` si tolgono i tre `Node` e le regole CSS dedicate. La pulizia la fa la sessione principale, come propone.
- Se una schermata esce per il consenso A7 torna lo slot, e la sua variante «in pubblicazione» disegna da sé i suoi punti fermi (DV §4.5). I nodi non servono comunque.

**5. Riga con il nome: sì, nella hero di `/siii/` e anche nel capitolo 01 della Home.**
- È il dispositivo delle Coordinate applicato alla prova: di chi è lo spazio e dove sta. Negli esempi lo fanno già l'H3 e la riga del luogo.
- Una schermata vera senza nome si legge come un'immagine di repertorio. Il logo dentro la schermata, a quelle dimensioni, non si legge.
- **Come:**
  - una riga in `label` mono `--fg-2` sotto l'immagine, allineata al suo bordo sinistro, 8 px sotto (`--space-2xs`), su una riga;
  - testo di copywriter-brand, con la proposta di cro-specialist «Masseria Santella · Cassano delle Murge (BA)»;
  - markup e lettura li decide ux-designer, perché i testi alternativi nominano già la masseria;
  - nella Home non è un link: il capitolo resta con una sola CTA (HM-5).
- **Quando:** con la schermata, e con la stessa condizione A7. Se il consenso manca, escono insieme.

**6. Qualità delle viste: approvate.**

| Dove | Vista | Giudizio |
|---|---|---|
| Home, capitolo 01 | Masseria Santella, l'ingresso con la volta e la porta a vetri ad arco (16:10) | La migliore delle quattro viste desktop: luce, profondità, l'interfaccia ben leggibile. «Spazi reali. / Esperienze digitali.» si vede alla lettera. Il capitolo, prima un segnaposto, ora regge da solo |
| `/siii/`, hero | Masseria Santella da smartphone, la sala (3:5; 4:5 in basso sotto i 64em) | Con le decisioni 1 e 2 |
| `/siii/`, esempi | La schermata d'avvio di ogni esperienza: tre «piccoli pianeti» con il play | Onesta, perché è quello che si trova aprendo l'esperienza. Distintiva, perché a colpo d'occhio non è una foto. Le tre viste fanno una serie: stesso gesto, luoghi diversi. Il primo esempio è il più scuro nella soglia più grande, ma l'ordine viene dalle linee guida e continua la storia di Masseria Santella iniziata nella hero: si tiene |

- **Coerenza con la direzione visiva.**
  - §4.1: le schermate sono documenti del prodotto. Si tagliano, non si ritoccano, e non hanno cornici di dispositivi disegnate.
  - §7: le composizioni sono quelle previste, cioè Porta 3:5, Schermo 16:10 e la serie 12, 8 e 8 colonne. Cambia solo il contenuto.
  - Le regole sono nella direzione visiva 0.13, §4.8. Le righe del §7.3 e del §7.4 sono allineate al sito.
- **Il link sulla schermata degli esempi** (decisione dell'utente) è giusto: il play promette un clic e ora lo mantiene. Niente «↗» al passaggio del mouse, che è il facoltativo di cro-specialist: sopra un'immagine già fitta aggiunge rumore, e il CTA accanto dichiara la nuova scheda.

### 2.2 Osservazioni

**S1 · [BLOCCANTE per il go-live] Consenso delle tre imprese (A7)**
- **Dove:** Home, capitolo 01; `/siii/`, hero ed esempi.
- **Problema:** in `docs/` il consenso non è registrato. Le schermate non passano più dagli slot, quindi la variante «in pubblicazione» non le sostituisce da sola.
- **Motivazione:** soglia 1 (veridicità) e ADR 002, riserva A7.
- **Proposta:**
  - il controllo di go-live di cro-specialist (oss. 2), da applicare subito;
  - la conferma scritta dell'utente, che brand-strategist registra nel brief e nell'ADR 002;
  - se manca per un'impresa, via la sua schermata e la sua riga, e torna lo slot.

**S2 · [IMPORTANTE] La schermata dell'appartamento non va al lancio**
- **Dove:** `siii-masseria-santella-mobile-appartamento.jpg`, non in uso.
- **Problema:** i marchi di Airbnb e Booking sono contenuto della schermata. Fanno pensare a una partnership e contraddicono «Vendita diretta».
- **Proposta:** concordo con cro-specialist (oss. 3). La scelta su «Vendita diretta» passa dalla riserva I7, con brand-strategist e copywriter-brand. Nella direzione visiva diventa una regola (§4.8, «Marchi di terzi»).

**S3 · [IMPORTANTE, già applicata] Il primo esempio fermo a 1440 px**
- **Dove:** `/siii/`, primo esempio (d3eba9c).
- **Problema:** il controllo n. 8 del budget non passava (WebP 284 KB e JPEG 313 KB a 1920 px).
- **Valutazione:** approvata. Una vista «piccolo pianeta» è già morbida per la proiezione, e a 1,08x su retina la differenza non pesa.
- **Proposta:** la nitidezza sugli schermi retina larghi la controlla ui-designer, come chiede web-performance-specialist.

### 2.3 Cosa funziona e va protetto

- **Il sistema ha retto all'arrivo dei materiali veri.** Formati e posti dei segnaposto erano quelli giusti, e nessuna composizione è cambiata.
- **Nessun mockup di dispositivo.** La Porta e lo Schermo sono la cornice.
- **La promessa degli esempi:** la vista che si vede è quella che si apre.
- **Le schermate stanno sulla notte senza filtri.** Restano documenti.

## 3. B · P4 applicata

- **Verdetto: approvata.**
  - La build è la v3 provata. ui-designer l'ha verificata su 321 finestre, senza sovrapposizioni, con la regola 11 a un minimo di 13,9 px (7,6 con 1.4.12).
  - Nelle mie catture a 1440 e 390 px i capitoli 01, 02 e 03 si leggono in sequenza: notte, calce, pietra; carte speculari, prima la regione e poi l'Italia; la Puglia del 03 fa eco a quella del 02.
- **La correzione di ux-designer** (la Terra di Bari come immagine con una descrizione, 133e9a5) è superata da P4. Era giusta: il testo del capitolo non nominava i luoghi della carta. Nella direzione visiva ho corretto la frase che la dava per decorativa (§1.4).
- **Decisione 7: la carta della Terra di Bari si toglie.**
  - Nessuna pagina la usa.
  - Porta con sé coordinate sotto i nomi che la regola 8 non ammette più, e un secondo elenco di luoghi da tenere allineato con `site.ts`.
  - La patch di ui-designer non cambia nulla in pagina: 12 figure su 12 identiche pixel per pixel.
  - Come applicarla: `docs/review/2026-10-07-p4-verifica-build-ui-designer.md` §5, `npm run maps` e sha256 `b588d8da84d51006dae8ed96162d2783701f66dc6c5c3e856c68b70d5363a7fe`.
  - Se un giorno servisse di nuovo, c'è la storia del repository.
- **Direzione visiva:** §1.4 (accessibilità, «Dove», regola 8), §7.3 e Decisioni richieste, punto 6.

## 4. C · La nuova foto dell'evento per la Home: indicazioni sui ritagli

L'utente ha chiesto «aggiorna questa in home». Non ho ancora visto il file: queste indicazioni valgono per la prima versione dei ritagli, che poi rivedo nell'anteprima. Sono anche nella direzione visiva, §4.2.

- **Veridicità prima del ritaglio.**
  - La scena è la stessa, ma l'oratore ha un'altra posa: non è l'originale dello scatto, è un'altra elaborazione.
  - La nota «Immagine elaborata con strumenti di intelligenza artificiale» resta (B4, I7), finché il cliente non conferma per iscritto che la scena non è alterata.
  - Nessuna didascalia con luogo e data: legherebbe a un evento preciso una scena che non è un documento.
- **Stessi formati di oggi:** Panorama 2,27:1 per desktop e tablet, «Città» 4:5 per il telefono. Impaginato, nodi e legenda non si spostano, e lo scambio non causa CLS.
- **Panorama: usare lo spazio liberato.**
  - Oggi il ritaglio, per evitare la cornice, taglia lo schermo destro (sopra e a destra) e la parte alta del marchio sul fondale.
  - Il nuovo deve avere interi i due schermi e il marchio Puglia Digitale, con almeno il 2% dell'altezza di margine sopra. Sotto, la platea si taglia dove cade.
  - Con la stessa inquadratura di oggi (scala 1,225) l'area è all'incirca 0, 55, 1672 × 736 `[IPOTESI: da verificare sul file]`.
- **«Città» 4:5:** lo schermo sinistro intero, con il suo menu laterale, e la platea sotto. All'incirca 40, 120, 549 × 686 `[IPOTESI]`.
- **In tutti e due:** colore intatto, nessun profilo riconoscibile ai margini (A4), al massimo 1200 px CSS.
- **Nodi rimisurati da ui-designer:**
  1. sul contenuto dello schermo sinistro, non sul menu né sulla cornice;
  2. sul leggio accanto all'oratore, mai sulla persona (N7);
  3. sul contenuto dello schermo destro.

  Sul telefono resta solo il nodo 1.
- **Legenda e testo alternativo** descrivono solo ciò che si vede.
  - Se gli schermi mostrano il portale Puglia Digitale in modo diverso da oggi, le voci 1 e 3 si riscrivono: copywriter-brand la legenda, copywriter-content l'alt.
  - Nell'immagine di oggi il menu laterale c'è già: se resta così, i testi restano.
- **`/puglia-digitale/` non si tocca adesso**, come ha detto l'utente. Due pose diverse dello stesso oratore sullo stesso sito però si notano, e indeboliscono tutte e due le immagini. **Va chiesto all'utente** se aggiornare anche il ritaglio «Schermo» della pagina.

## 5. Stato delle review di dominio

| Review | Verdetto di dominio | Sintesi del creative-director |
|---|---|---|
| cro-specialist, schermate SIII | Approvato con modifiche | Accolte le osservazioni 1–4. Il facoltativo «↗» al passaggio del mouse no (§2.1) |
| ux-designer, schermate SIII | Conforme AA, tre suggerimenti | Accolti: alt degli esempi (già fatto, d211ba4), pulizia dei nodi (decisione 4), prova con VoiceOver e TalkBack quando ci sono i dispositivi. Il ritaglio l'ho deciso io (decisione 2) |
| web-performance-specialist, schermate SIII | Conforme, con una correzione bloccante | Il bloccante è applicato (d3eba9c). Ritaglio in build approvato (decisioni 1 e 2). ADR 005 aggiornato (decisione 3) |
| copywriter-content, `alt-text.md` 1.6 | Alt definitivi | Approvati. Con l'ancoraggio in basso l'alt della hero resta vero |
| ux-designer, carta della Terra di Bari | Correzione per il caso «P4 no» | Superata da P4. La frase sulla carta decorativa è corretta nella direzione visiva |
| ui-designer, verifica di P4 | Conforme | Approvata. La pulizia è decisa (decisione 7) |

## 6. Verdetto

- **A · Schermate SIII: approvato con modifiche.**
  - Da applicare ora:
    - il ritaglio in build, ancorato in basso (decisioni 1 e 2);
    - la pulizia dei nodi (decisione 4);
    - il controllo di go-live A7 (S1).
  - Quando ci sono testo e markup: la riga con il nome (decisione 5).
  - Bloccante per il go-live: il consenso A7.
- **B · P4: approvato.** La pulizia della carta della Terra di Bari si applica (decisione 7).
- **C · Foto dell'evento:** indicazioni date. Rivedo i ritagli nell'anteprima.

## Patch da applicare (sessione principale)

1. **Ritaglio in build della porta della hero.** La patch `scratchpad/siii-lcp/media-mobilecrop.patch` di web-performance-specialist, poi lo snippet della decisione 2. web-performance-specialist rimisura `/siii/`.
2. **Nodi.** Togliere i tre `Node` del capitolo 01 della Home e i tre della hero di `/siii/`, con le loro regole CSS. Nella Home va via anche l'import di `Node` (ux-designer, §3).
3. **Controllo A7 in `check:launch`:** il diff dell'osservazione 2 di cro-specialist.
4. **Pulizia della carta della Terra di Bari:** `scratchpad/ui-p4/diff/pulizia-terra-di-bari.patch`, `npm run maps`, sha256 `b588d8da…`, poi la build.
5. **Riga con il nome:** non è una patch mia. Prima il testo di copywriter-brand e la decisione di ux-designer su markup e lettura, poi l'implementazione secondo la direzione visiva §4.8.

## Ipotesi da validare

- Il ritaglio di sharp con `position: 'bottom'` coincide con la prova fatta con `object-position: 50% 100%` `[DA VERIFICARE]` sulla build.
- La finestra del ripiego su HTTP/2, all'host reale `[DA VERIFICARE]`: la soglia è nell'ADR 005 1.3.
- La nuova foto dell'evento ha la stessa inquadratura della vecchia `[IPOTESI]`: le aree del §4 vanno ricalcolate sul file.

## Domande aperte

- **Utente:**
  - il consenso scritto delle tre imprese (A7);
  - la nuova foto dell'evento: è l'originale dello scatto o un'elaborazione?
  - va aggiornata anche su `/puglia-digitale/`?
- **copywriter-brand:** il testo della riga con il nome (hero di `/siii/` e capitolo 01 della Home).
- **ux-designer:** markup e lettura della riga con il nome.

## Decisioni richieste

- **Sessione principale:** applicare le patch 1–4 e ricostruire.
- **Utente:** consenso A7 e le due domande sulla foto dell'evento.
- **brand-strategist e copywriter-brand:** riserva I7 su «Vendita diretta» (S2).
