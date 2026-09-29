---
titolo: Ricontrollo UI delle correzioni approvate dopo C14 (C14-1, N7, N8, C14-4)
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-09-29
fonti: [docs/creativa/direzione-visiva.md (0.4), docs/review/2026-09-28-sito-verifica-fedelta-ui-designer.md (sezione «Verifica C14 dopo il verdetto G4»), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/ui/design-system.md, commit 4674f8a e 100b578, staging http://localhost:4321 (dist, commit 100b578), variante «in pubblicazione» http://localhost:4322 (dist-publish, commit 100b578), script c14fix.mjs della sessione principale (scratchpad/tools), misure Playwright (Chromium) del 2026-09-29]
---

# Ricontrollo UI delle correzioni approvate dopo C14

## In sintesi

- **Le correzioni applicate in 100b578 corrispondono agli snippet e alla DV 0.4.** Confermo le misure della sessione principale:
  - C14-1: etichetta del gruppo murgiano che sporge di 7 px a 320 (nella dissolvenza), intera nella dissolvenza da 340 a 375 px, intera e fuori dalla dissolvenza da 380 px; nessun incrocio da 320 a 699 px;
  - N7: nodo 2 a (36,0%, 31,0%), sul leggio;
  - N8: nomi della carta su una riga da 800 px;
  - C14-4: nodo della 404 centrato sulla tacca (scarto 0,0 px).
- **R1 [IMPORTANTE], nuovo.** Con il centro a 238° Varese entra ancora, ma non esce mai dalla dissolvenza del bordo prima che la sua etichetta scivoli sotto l'header. La DV §5 chiede «Scorrendo entra Varese», e il creative-director ha chiesto proprio questa verifica.
  - Proposta: su mobile i +60° della rotazione si compiono nei primi 60svh di scorrimento invece che in 100svh. È una regola in `Hero.astro`, provata: Varese resta fuori dalla dissolvenza per 70–140 px di scorrimento, e il gruppo murgiano a riposo resta come oggi.
  - **Correggo la mia verifica C14.** Lì avevo scritto «Con la rotazione (+60°) Varese entra ancora». Guardavo la fine della rotazione, che su mobile arriva quando l'orizzonte è già sotto l'header.
- **R2 [SUGGERIMENTO].** La DV §3.2 elenca i ponti «Gli altri mondi ITnode» tra gli usi di `display-m` a 400, ma nel sito il ponte è in `display-s` 400, con l'occhiello in mono.
- **Design system alla versione 0.4**, allineato alla DV 0.4.
- **Verdetto UI.** C14-1, N7, N8, C14-4 e C14-5 sono conformi. R1 è consigliato prima del lancio e lo decide il creative-director. Nessun bloccante di soglia.

## Dove e come

- **Build.** Staging http://localhost:4321 (`dist`) e variante «in pubblicazione» http://localhost:4322 (`dist-publish`), entrambe dal commit 100b578. `src/` non è stato toccato: le alternative sono provate con CSS iniettato.
- **Misure.** Playwright (Chromium), sonde DOM. Le etichette si misurano sull'inchiostro del testo (Range), non sui box. La dissolvenza è di 2rem (32 px) per lato.
- **C14-1 a riposo.** Da 320 a 699 px ogni 10 px, più 375 e 414, a 844 px di altezza.
- **C14-1 durante la rotazione.**
  - Scorrimento da 0 a 700 px ogni 10 px, con due fotogrammi di attesa a ogni passo.
  - Conta come visibile solo ciò che sta sotto l'header sticky (64 px su mobile).
  - Nove larghezze da 320 a 699 px e sette formati di telefono, da 360 × 640 a 430 × 932.
  - Confronto con il centro di prima (250°) e con cinque alternative.
- **N7** a 390, 700, 768, 1024 e 1440 px. **N8** a 14 larghezze da 390 a 1920 px, più le carte della Home a 390, 768, 1024 e 1440. **C14-4** a 390, 768, 1024 e 1440 px, a 2×, anche con il focus.
- **Non regressione.** Reflow su 8 pagine × 5 larghezze, in staging e in pubblicazione. Peso di `display-m` su 8 pagine a 1440 px.

## Esito

| # | Esito | Misura |
|---|---|---|
| **C14-1** · a riposo | **Conforme** (DV 0.4 §5) | Gruppo murgiano: sporge di 7 px a 320 e tocca il bordo a 330. Tra 340 e 375 px è intero nella dissolvenza (7–30 px dal bordo); da 380 a 699 px è intero e fuori dalla dissolvenza.<br>Caltanissetta è intera e fuori dalla dissolvenza a ogni larghezza. Varese non è in vista a riposo: al massimo 2 etichette, come chiede la DV |
| **C14-1** · incroci | **Conforme** | Nessun richiamo attraversa un'etichetta da 320 a 699 px, a scroll da 0 a 400 px ogni 10 (sette larghezze), oltre ai quattro scroll della misura della sessione principale |
| **C14-1** · rotazione | **Da correggere: R1** | Varese entra in parte a 110–240 px di scorrimento ed è intera a 310–340 px. Non esce mai dalla dissolvenza prima che la sua etichetta passi sotto l'header (340–380 px). La parte non sfumata arriva al massimo al 39–73% (40% a 390 × 844). Con il centro a 250° era fuori dalla dissolvenza da 230–280 px |
| **N7** | **Conforme** | Nodo 2 a (36,0%, 31,0%) a 700, 768, 1024 e 1440 px, sul piano del leggio, di lato all'oratore (ritagli a 768 e 1440). Bersaglio di 44 × 44 px. Sotto i 700 px (ritaglio «Città») il nodo 2 non c'è e la legenda mostra solo la voce 01. La legenda non cambia |
| **N8** | **Conforme** | Hero di `/puglia-digitale/`: a 768 e 780 px (carta di 706 e 717 px) Acquaviva resta su due righe; da 800 a 1920 px tutti i nomi stanno su una riga.<br>Nessuna sovrapposizione tra testi e nodi e niente fuori carta, a ogni larghezza.<br>La carta compatta a 390 px e le carte dei capitoli della Home (350–480 px) non cambiano |
| **C14-4** | **Conforme** | Nodo della 404 centrato sulla tacca del suo rilevamento: scarto 0,0 px a 390, 768, 1024 e 1440 (a 120° e 240° cade sulla tacca dei 15°). Con il focus, l'anello di 26 px è centrato sul nodo |
| **C14-5** | **Conforme** | Il commento d'intestazione di `SlotPending.astro` descrive N3 e N9 |
| **Peso di `display-m`** | **Conforme** (DV 0.4 §3.2) | A 600: i tre Passaggi interamente in `display-m` di `/siii/` in tutti e due i registri e i titoli H2/H3 (video, città, «Perché…», Persona, H1 della 404). A 400: gli arrivi che scendono di gradino, i descrittori, i nomi dei capitoli, la citazione, lo statement dei mondi, il marquee e i numeri «01–05». Per i ponti vedi R2 |
| Non regressione | Superata | 80 combinazioni (8 pagine × 5 larghezze, staging e pubblicazione): nessuno scorrimento orizzontale, nessuna riga di testo fuori viewport |

## R1 [IMPORTANTE] Hero della Home su mobile: Varese non esce dalla dissolvenza mentre è in vista

- **Dove.** `/`, orizzonte della hero sotto i 700 px, durante lo scorrimento.
  - `src/components/ui/Horizon.astro`: la rotazione usa `animation-timeline: scroll(root block)` con `animation-range: 0 100svh`.
  - `src/components/sections/Hero.astro`: centro mobile a 238° (C14-1).
- **Problema.**
  - L'orizzonte passa sotto l'header sticky dopo 290–330 px di scorrimento, le sue etichette dopo 340–380 px. In quel momento la rotazione è a circa 24° dei 60° previsti (a 390 × 844: 340 / 844 × 60°).
  - Varese (313°) entra dal bordo destro solo in quest'ultimo tratto. La sua etichetta diventa intera a 310–340 px e non esce mai dalla dissolvenza: la parte non sfumata arriva al massimo al 40% a 390 × 844, al 36–62% sugli altri telefoni provati. Si legge «VARE», con «SE» che svanisce; poi l'etichetta sparisce sotto l'header.
  - Prima di C14-1, con il centro a 250°, Varese era intera e fuori dalla dissolvenza per 70–150 px di scorrimento. Spostare il centro di 12° ha spostato anche questo momento.
- **Motivazione.**
  - DV §5, mobile: «Scorrendo entra Varese». È la condizione che il creative-director ha chiesto di ricontrollare.
  - La rotazione è la scoperta della hero: «resta una scoperta per chi scorre» (DV §5). Se il luogo che entra resta sfumato sul bordo, la scoperta non si vede.
  - La dissolvenza (DV §2) serve ai luoghi che escono o stanno fuori campo, non al luogo nuovo che la rotazione deve mostrare.
- **Opzioni misurate.** CSS iniettato, da 320 a 699 px, scroll da 0 a 400 px ogni 10. «Finestra» è lo scorrimento durante il quale l'etichetta di Varese è intera, fuori dalla dissolvenza e sotto l'header.

  | Opzione | Gruppo murgiano a riposo | Varese mentre è in vista | Incroci | Costo |
  |---|---|---|---|---|
  | Oggi: 238°, +60° in 100svh | intero da 340 px, fuori dalla dissolvenza da 380 | mai fuori dalla dissolvenza (39–73%) | nessuno | — |
  | Centro 244° | sporge a 320 e 360 px (26 e 1 px), nella dissolvenza a 390 | finestra di 10–60 px solo a 320 e da 480 px; a 360–414 mai (87–93%) | nessuno | rinuncia in parte a C14-1 |
  | Centro 250° (prima di C14-1) | esce dal bordo fino a 390 px | finestra di 70–150 px | nessuno | riapre C14-1 |
  | 238°, +80° in 100svh | come oggi | finestra di 10–80 px (10 px a 390) | nessuno | cambia un valore della DV (+60°) |
  | 238°, +60° in 70svh | come oggi | finestra di 30–100 px | nessuno | finestra breve sui telefoni comuni |
  | **238°, +60° in 60svh** | **come oggi** | **finestra di 70–140 px** | **nessuno** | **una regola; su mobile la rotazione è più rapida** |
  | 238°, +60° in 50svh | come oggi | finestra di 120–180 px | nessuno | rotazione ancora più rapida |

- **Proposta: +60° nei primi 60svh, solo nella hero della Home e solo su mobile.**
  - Il gruppo murgiano a riposo non cambia: C14-1 resta com'è.
  - Varese ha una finestra simile a quella di prima di C14-1.
  - Sui sette formati di telefono provati la finestra è di 70–90 px di scorrimento: 200–290 px a 360 × 640, 260–340 a 390 × 844, 290–370 a 430 × 932.
  - Tra 260 e 290 px, a 390 × 844, sono in vista insieme linea, nodo ed etichetta di Varese.
  - La rotazione resta lineare e legata allo scorrimento, e si ferma quando ci si ferma. La striscia graduata trasla più in fretta: a 390 px da 0,28 a 0,46 px per pixel di scorrimento, a 699 px da 0,50 a 0,83. Resta più lenta della pagina.
  ```css
  /* src/components/sections/Hero.astro. Phones: the +60° happen in the first 60svh of scroll, while
     the horizon is still visible below the sticky header. With 100svh only ~24° are ever seen and
     Varese never leaves the edge fade (UI recheck R1). Heavier than the component's own rule, so
     tablets, desktop and the Città Digitali horizon keep 0–100svh. */
  @media (max-width: 43.74em) and (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: scroll()) {
      .hero--home .hero-home__horizon :global(.horizon__strip) {
        animation-range-end: 60svh;
      }
    }
  }
  ```
  - Snippet provato così com'è: longhand, senza `!important`, per peso del selettore.
    - A 390 × 844 la rotazione della Home va da 0 a 506 px di scorrimento.
    - Da 768 px, e su Città Digitali, resta da 0 a 844 px.
    - Con il movimento ridotto non cambia nulla: l'orizzonte resta fermo.
    - Nessun incrocio da 320 a 699 px.
  - Nessun effetto sulla performance: è la stessa animazione di `transform`, con un intervallo diverso.
- **Testo proposto per la DV §5.**
  - Mobile: «Scorrendo entra Varese: su mobile i +60° si compiono nei primi 60svh, finché l'orizzonte è in vista sotto l'header».
  - «Movimento»: allineare «`animation-timeline: view()`» all'implementazione, che è `scroll(root block)` con un intervallo.
- **Chi decide.** Il creative-director: rotazione e resa mobile sono valori della DV §5. ux-designer conferma per il movimento (il movimento ridotto non cambia); la sessione principale applica.
- **Quando.** Prima del lancio, consigliato. Non è un difetto di soglia: l'orizzonte è `aria-hidden`.

## R2 [SUGGERIMENTO] DV §3.2: i ponti non sono in `display-m`

- **Dove.** DV §3.2, regola del peso di `display-m`, voce «400»: «… i ponti "Gli altri mondi ITnode"».
- **Problema.** Nel sito il ponte (`sections/Bridge.astro`, su `/siii/`, `/puglia-digitale/` e `/citta-digitali/`) ha l'occhiello «Gli altri mondi ITnode» in `label` mono (13 px) e la frase in `display-s` a 400. Nessun ponte usa `display-m` (misura a 1440 px).
- **Motivazione.** La regola elenca gli usi reali del sito. Un esempio sbagliato può portare qualcuno a «correggere» il ponte verso `display-m`.
- **Proposta.** Togliere i ponti dall'elenco di `display-m`. Il design system annota che la frase del ponte usa `display-s` a 400 perché non è un titolo: vale la regola generale, 600 per i titoli e 400 per il resto (DS §1.2).
- **Chi decide.** Il creative-director, alla prossima revisione della DV.

## Design system allineato (versione 0.4)

In `docs/ui/design-system.md`:
- **peso di `display-m`** secondo la DV 0.4 §3.2, con gli usi misurati; `display-s` a 400 nella frase del ponte (R2);
- **C14-1, N7, N8 e C14-4** passano da proposte a decisioni applicate: centro mobile a 238° (§2.1), nodo 2 sul leggio (§3.9), nomi della carta su una riga con la soglia di 45rem sulla carta (§2.4, §5.4), nodo della 404 sulla tacca (§2.1);
- **quota dell'orizzonte mobile** al 42% della prima schermata (§3.4), senza più la domanda aperta;
- **R1** come proposta aperta (§2.1, §1.6), con le domande e le decisioni richieste aggiornate;
- **versione 0.4** e nuova riga in §6 (verifiche).

## Verdetto di dominio (UI)

**Conformi: C14-1, N7, N8, C14-4 e C14-5.** Corrispondono agli snippet della verifica C14 e alla DV 0.4, a tutte le larghezze provate, in staging e in pubblicazione.
- **R1** nasce da C14-1 e da un mio errore di misura nella verifica C14: lo raccomando prima del lancio, con lo snippet qui sopra. Decide il creative-director.
- **R2** è un allineamento di testo della DV.
- Nessun bloccante di soglia. Il verdetto di gate spetta al creative-director.

## Ipotesi da validare

- Le misure sono in Chromium. Dove le scroll-driven animations non sono supportate, l'orizzonte resta fermo e Varese non entra, come la DV già accetta. Resa e unità `svh` vanno riverificate su Safari iOS e Firefox `[DA VERIFICARE]`.
- La finestra di R1 dipende dall'altezza dell'header mobile (64 px) e dalla quota dell'orizzonte (circa il 42%): se cambiano, si rimisura.

## Domande aperte

- **creative-director:** R1, cioè quale opzione tra quelle misurate; R2, il testo della DV §3.2; allineare la DV §5 «Movimento» all'implementazione (`scroll(root block)` con un intervallo, non `view()`).
- **ux-designer:** conferma che una rotazione mobile più rapida non crea problemi di movimento: 0,46–0,83 px per pixel di scorrimento, sempre legata allo scorrimento e ferma con il movimento ridotto.

## Decisioni richieste

1. **R1** (creative-director): su mobile, +60° nei primi 60svh di scorrimento nella hero della Home. In alternativa, accettare che Varese entri solo sfumata.
2. **R2** (creative-director): togliere i ponti dall'elenco di `display-m` nella DV §3.2.
