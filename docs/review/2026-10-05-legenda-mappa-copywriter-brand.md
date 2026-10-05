---
titolo: Legenda della carta del capitolo 03 della Home e testi collegati
owner: copywriter-brand
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-05
fonti: [richiesta della sessione principale del 2026-10-05, docs/review/2026-10-05-mappa-citta-digitali-ui-designer.md (P2, P4, §4), docs/strategia/citta-digitali-elenco.md v0.2 (§1, §4, §5), docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md (§3, §5, O7), docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, docs/cro/strategia-conversione.md (righe 37–38 e 68), docs/cro/piano-misurazione.md (§ eventi, valori di data-cta-location), docs/contenuti/tone-of-voice.md (§§ 4, 5, 6, 8), docs/contenuti/microcopy.md (§§ 3, 8), docs/contenuti/copy-deck/home.md (§ 5), src/pages/index.astro, src/pages/citta-digitali.astro, src/components/layout/Footer.astro, src/data/site.ts, build di prova di ui-designer (scratchpad ui-mappa/site/dist) servita in locale, dist/ del 2026-10-05, misure Playwright (Chromium) del 2026-10-05]
---

# Legenda della carta del capitolo 03 · testi

**Oggetto.** I testi che accompagnano la nuova carta di Città Digitali nel capitolo 03 della Home: un puntino per città e il nome solo dove c’è spazio (proposta di ui-designer, P4). Riguarda la legenda sotto la carta, il link verso l’elenco delle città e il testo del capitolo. In fondo c’è l’allineamento dei miei documenti al dominio cittàdigitali.it.

**Come ho lavorato.**
- Ho letto la proposta di ui-designer, l’elenco di brand-strategist (§4, veridicità), le review di seo-content e seo-technical sul dominio e la regola sui link esterni della strategia di conversione.
- Ho servito in locale la build di prova di ui-designer, con la carta a 45 puntini, e ho iniettato i testi candidati nella `figcaption`. Ho misurato gli a capo con uno script a 13 larghezze, da 320 a 1920 px; con la spaziatura del testo di WCAG 1.4.12, a 5 larghezze.
- Lunghezze e Gulpease sono calcolati con uno script.
- Nessun file in `src/` modificato.

## In sintesi: testi pronti

| Elemento | Testo | Car. | Stato |
|---|---|---|---|
| Legenda, `figcaption`, `t-label` | Ogni punto è una città di Città Digitali | 40 | **Pronta.** Spazi unificatori (U+00A0) tra «di» e «Città» e tra «Città» e «Digitali» |
| Link all’elenco su `/citta-digitali/` (consigliato) | Tutte le città → | 14 (16 con l’icona) | Solo quando l’elenco sarà sulla pagina. Nome accessibile: «Tutte le città di Città Digitali» |
| Link alla pagina del portale (se scelto) | Tutte le città sul portale ↗ | 26 (28 con l’icona) | Solo se cro-specialist accetta un’eccezione alla sua regola. Nome accessibile: «Tutte le città sul portale Città Digitali (si apre in una nuova scheda)» |
| Testo del capitolo | Invariato | 152 | Non va ritoccato (L3) |
| Etichetta della carta come immagine (facoltativa) | Carta d’Italia con le città di Città Digitali | 45 | Solo se ux-designer dà alla carta `role="img"` (L4) |

Gli stessi testi sono nel copy deck della Home (v1.3, § 5, «Capitolo 03 con la carta di tutte le città»), da cui la sessione principale li applica.

---

## L1 · [IMPORTANTE] Legenda: «Ogni punto è una città di Città Digitali»

- **Dove.** `src/pages/index.astro`, capitolo 03, `<figcaption class="worlds__atlas-note t-label">` (proposta di ui-designer, P4 e patch 4).
- **Problema.** Le due proposte di ui-designer hanno un limite ciascuna.
  - «Un punto per ogni città di Città Digitali» dichiara che l’elenco è completo: ogni città ha il suo punto.
    - È vera solo se passa l’eccezione su Martina Franca; altrimenti i puntini sono 44 su 45.
    - Si regge su un elenco letto da un riassunto dell’indice, ancora `[DA VERIFICARE]`.
    - Diventa falsa il giorno in cui il portale aggiunge una città e la carta non viene aggiornata. Il portale ha una pagina «Franchising»: l’elenco è fatto per crescere.
  - «Le città di Città Digitali» è sempre vera, ma è un titolo, non una legenda: lascia indovinare che i puntini senza nome sono città.
- **Motivazione.**
  - Soglia 1, veridicità: una dichiarazione di completezza è un claim quantitativo implicito. Vale la stessa regola del numero (`citta-digitali-elenco.md` §4).
  - «Ogni punto è una città…» rovescia la frase: dice qualcosa di ogni punto, non di ogni città. È vera per ciascun puntino pubblicato, con o senza Martina Franca, e resta vera se il portale cresce.
  - Spiega il segno: chi vede i puntini senza nome sa che cosa sono. «Punto» vale anche per i nodi con il nome, che sono punti più grandi.
  - Voce: è testo d’interfaccia, funzionale e senza battute (tone of voice, § 4). Niente numero, niente superlativo, niente punto finale, come le etichette (§ 8). Il maiuscolo lo applica il CSS: nel sorgente «è», «città» e «Città Digitali» si scrivono come in tabella.
  - La ripetizione «città di Città Digitali» è il costo del nome del marchio. L’alternativa «Ogni punto è una città del portale» riprende «un unico portale» del testo, ma da sola non dice quale portale: lo screen reader la legge come didascalia della figura, fuori contesto. Scartata.
- **Proposta.**
  > Ogni punto è una città di Città Digitali
  - Nel sorgente, come per la hero: `{'Ogni punto è una città di\u00a0Città\u00a0Digitali'}`. Il nome del marchio non si spezza, e la preposizione resta con il nome.
  - **Misure sulla build di prova**, con la carta a 45 puntini:
    - una riga da 360 a 1920 px; a 390 px occupa 309 px su 350, a 1440 px 351 su 480;
    - a 320 px, con gli spazi unificatori, due righe: «Ogni punto è una città / di Città Digitali». Senza, l’a capo cadrebbe dopo «di»;
    - con la spaziatura di WCAG 1.4.12 va su due righe dove la carta è larga fino a circa 400 px (misurato a 320, 360, 390 e 1024 px), con lo stesso a capo, e su una dove è larga 480 px (1440 px). Mai testo tagliato o fuori dalla carta.
  - Gulpease 85.
- **Quando il numero si potrà pubblicare.** Le condizioni sono quelle di brand-strategist: testo della pagina confermato, data, stesso numero di puntini.
  - Consiglio di tenerlo fuori dalla Home e di metterlo solo nell’elenco di `/citta-digitali/`, con la data (seo-content, §5.4). Così il numero si aggiorna in un posto solo.
  - Se il creative-director lo vuole anche qui: seconda riga «[N] città · elenco al [mese anno]», sotto la legenda, con lo stesso numero dei puntini.

## L2 · [IMPORTANTE] Link verso l’elenco: interno, non al portale

- **Dove.** La stessa `figcaption`, su una seconda riga sotto la legenda. L’alternativa testuale della carta la decide ux-designer; i link esterni nei capitoli li decide cro-specialist.
- **Problema.**
  - La carta è `aria-hidden` e mostra solo 5–9 nomi: serve una strada verso l’elenco completo.
  - Il link alla pagina «Tutte le città» del portale va contro una regola della strategia di conversione: «Nei capitoli della home niente link esterni: prima si approfondisce sul sito, i portali stanno nelle pagine dedicate» (`strategia-conversione.md`, riga 68).
  - seo-content raccomanda un solo elenco, su `/citta-digitali/`, e nessun elenco di nomi nella Home, né visibile né nascosto (review sull’omonimia, §3 e §5).
- **Motivazione.** Un link esterno nel capitolo porterebbe fuori dal sito chi non ha ancora visto `/citta-digitali/`. La CTA del capitolo, «Esplora Città Digitali →», fa già l’altra strada.
- **Proposta (a), consigliata: link interno**, solo quando l’elenco sarà su `/citta-digitali/`.

  | Campo | Valore |
  |---|---|
  | Testo visibile | Tutte le città |
  | Icona | → in SVG, `aria-hidden="true"`, attaccata all’ultima parola: porta a un’altra pagina del sito (tone of voice, § 6, regola 3) |
  | Testo nascosto, dopo il testo visibile | « di Città Digitali», con lo spazio iniziale, in `<span class="sr-only">` |
  | Nome accessibile | Tutte le città di Città Digitali |
  | Destinazione | `/citta-digitali/#portale`, se l’elenco va nella sezione «L’Italia in un unico portale.»; altrimenti l’ancora della sezione dell’elenco `[IPOTESI: la decide ux-designer]` |
  | Tracciamento | `data-track="cta_click"`, `data-cta-id="home-capitolo-citta-digitali-elenco"`, `data-cta-location="capitolo"` `[IPOTESI: da confermare con cro-specialist]` |

  - La CTA del capitolo e questo link vanno sulla stessa pagina ma in punti diversi, con etichette diverse: non sono la stessa azione.
  - Finché l’elenco non c’è, niente link. La legenda basta per chi vede la carta; l’alternativa testuale la decide ux-designer (L4).
- **Proposta (b): link alla pagina del portale**, solo se ux-designer la sceglie e cro-specialist accetta l’eccezione alla riga 68.

  | Campo | Valore |
  |---|---|
  | Testo visibile | Tutte le città sul portale |
  | Icona | **↗, non →**: esce dal sito e apre una nuova scheda (tone of voice, § 6, regola 3). L’esempio della richiesta aveva → |
  | Testo nascosto, dopo il testo visibile | « Città Digitali (si apre in una nuova scheda)» |
  | Nome accessibile | Tutte le città sul portale Città Digitali (si apre in una nuova scheda) |
  | Destinazione | `https://xn--cittdigitali-19a.it/tutte-le-citta/`: punycode, `https`, senza www, come vuole seo-technical (specifiche, §5.3) `[DA VERIFICARE: indirizzo esatto da una rete che raggiunge il portale]` |
  | Attributi | `target="_blank" rel="noopener"`, senza `noreferrer` (strategia di conversione, riga 38) |
  | Tracciamento | `data-track="outbound_click"`, `data-cta-id="home-capitolo-citta-digitali-elenco"`, `data-cta-location="capitolo"`, `data-outbound-type="portale"`, `data-destination-id="citta-digitali-elenco"` `[IPOTESI: da confermare con cro-specialist]` |

- **Perché un’etichetta senza verbo.** La regola delle CTA chiede verbo e oggetto (tone of voice, § 6, regola 1). Qui però il link è una voce della legenda, e il testo nomina ciò che si trova all’arrivo: l’elenco di tutte le città.
  - Per il link al portale è anche il titolo della pagina, «Tutte le città» (indice di ricerca, `citta-digitali-elenco.md` §1). È lo stesso schema dei link che nominano un portale, come «cittàdigitali.it ↗» nel footer: chi clicca trova il titolo che il link gli ha promesso.
  - Le due etichette stanno nei 28 caratteri della regola, icona compresa: 16 e 28. Con un verbo diventerebbero «Vedi tutte le città →» e «Vedi tutte le città sul portale ↗» (33 caratteri con l’icona, oltre il limite): più lunghe, senza dire di più.
- **Misure.** Con il testo in `t-label` e l’icona, i due link stanno su una riga da 320 a 1920 px: 125–140 px il link interno, 218–245 px quello esterno.
- **Per ux-designer e ui-designer.** L’area di tocco è di almeno 24 × 24 px (WCAG 2.5.8). Il link sta su una riga sua, così la legenda resta su una riga da 360 px.

## L3 · [SUGGERIMENTO] Testo del capitolo: resta com’è

- **Dove.** `src/pages/index.astro`, capitolo 03, `text`; copy deck della Home, § 5.
- **Testo.** «Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per imprese e attività. Varese, Altamura, Caltanissetta: città diverse, un unico portale.» (152 caratteri su 160, Gulpease 56).
- **Perché non cambia.**
  - Resta vero con la carta piena. Le tre città del testo sono i nomi obbligatori della carta, visibili a ogni larghezza (proposta di ui-designer, P2): testo e carta dicono la stessa cosa.
  - Non contiene numeri e non suggerisce una copertura dell’Italia intera (brief, N12).
  - Nomina solo le tre città certe, quelle delle linee guida (§ 18). Le altre restano `[DA VERIFICARE]` finché non arriva il testo della pagina del portale (`citta-digitali-elenco.md`, §4).
  - seo-content arriva alla stessa conclusione (review sull’omonimia, §3).
- **Scartate.**
  - «Da Varese a Caltanissetta…»: suggerisce una copertura continua da nord a sud (N12).
  - «… e molte altre»: una quantità vaga è comunque un claim.
  - «… e le altre città sulla carta»: rimanda a una carta che gli screen reader non leggono.

## L4 · [SUGGERIMENTO] Se la carta diventa un’immagine: il testo dell’etichetta

- **Dove.** `MapItaly.astro`, carta del capitolo 03. La scelta è di ux-designer.
- **Problema.** Con la carta `aria-hidden`, lo screen reader legge solo la didascalia, «Ogni punto è una città di Città Digitali», cioè la legenda di un’immagine che non percepisce.
- **Proposta.** Due strade, per ux-designer:
  - la carta resta `aria-hidden`, e l’equivalente testuale è il link all’elenco (L2);
  - la carta diventa `role="img"` con un’etichetta, e la didascalia ne è la legenda. Il testo dell’etichetta è «Carta d’Italia con le città di Città Digitali» (45 caratteri).
- In entrambi i casi niente elenco di nomi nascosto (seo-content, §5) e nessun numero.

## L5 · [IMPORTANTE] Dominio nei miei documenti (osservazione O7 di seo-content)

- **Dove.** `docs/contenuti/tone-of-voice.md`, § 5 (righe «Città Digitali» e «Domini»); `docs/contenuti/microcopy.md`, § 3 (footer, Portali).
- **Problema.** I due documenti scrivevano il portale senza accento, «cittadigitali.it», come le linee guida (§ 22). È un progetto omonimo di altri. Il portale del cliente è cittàdigitali.it, confermato dall’utente il 2026-10-05.
- **Fatto.**
  - **Tone of voice, v1.3.** La riga «Domini» scrive cittàdigitali.it e dice da dove viene l’eccezione alle linee guida: testo visibile e nomi accessibili in Unicode, con la «à» composta; `href` in punycode (specifiche SEO, §5.3); mai la forma senza accento, nemmeno a stampa. La riga «Città Digitali» vieta «CITTA’ DIGITALI», che è il nome dell’omonimo.
  - **Microcopy, v1.2.** Footer, blocco Portali: «cittàdigitali.it ↗». Nome accessibile: «cittàdigitali.it, portale di Città Digitali (si apre in una nuova scheda)». È come nel sito, verificato su `dist/` il 2026-10-05.
- **Restano**, nei documenti di copywriter-content: `copy-deck/contatti.md`, righe 145–147 e 155, e `copy-deck/citta-digitali.md`, righe 57, 78 e 254. Li corregge il loro owner (O7).

## Misure

Build di prova di ui-designer, carta a 45 puntini, larghezza della figura tra 280 e 480 px. Testi iniettati nella `figcaption`; Chromium.

| Finestra (px) | Larghezza della carta (px) | Legenda proposta | «Un punto per ogni città…» | «Le città di Città Digitali» | Link interno · esterno |
|---|---|---|---|---|---|
| 320 | 280 | 2 righe: «Ogni punto è una città / di Città Digitali» | 2 righe | 1 riga | 1 riga · 1 riga |
| 360–414 | 320–372 | 1 riga | 1 riga | 1 riga | 1 riga · 1 riga |
| 480–768 | 435–480 | 1 riga | 1 riga | 1 riga | 1 riga · 1 riga |
| 1024–1100 | 382–411 | 1 riga | 1 riga | 1 riga | 1 riga · 1 riga |
| 1280–1920 | 480 | 1 riga | 1 riga | 1 riga | 1 riga · 1 riga |

Con la spaziatura del testo di WCAG 1.4.12 la legenda proposta va su due righe a 320, 360, 390 e 1024 px (carta da 280 a 382 px) e su una a 1440 px (carta da 480 px), sempre senza testo tagliato. Le altre larghezze non le ho misurate con la spaziatura.

## Verdetto di dominio (copy)

**Testi pronti.**
- La legenda si può applicare subito, insieme alla carta. È vera qualunque sia la decisione su Martina Franca e sui nomi mostrati.
- Il link aspetta due decisioni: l’alternativa testuale (ux-designer) e la regola dei link esterni nei capitoli (cro-specialist). Se dovesse prevalere un’altra disciplina, decide il creative-director.
- Il testo del capitolo resta com’è.

Il verdetto di gate spetta al creative-director.

## Ipotesi da validare

- `[IPOTESI: la pagina del portale si intitola «Tutte le città» e il suo indirizzo è https://xn--cittdigitali-19a.it/tutte-le-citta/.]` Viene dall’indice di ricerca (`citta-digitali-elenco.md`, §1); si verifica da una rete che raggiunge il portale.
- `[IPOTESI: l’elenco completo andrà su /citta-digitali/, nella sezione «L’Italia in un unico portale.» (#portale) o in una sezione sua.]` Lo decide ux-designer, con seo-content.
- Le misure valgono in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`, come per la carta (proposta di ui-designer, §4).

## Domande aperte

- **ux-designer:** carta `aria-hidden` con un link all’elenco, oppure `role="img"` con l’etichetta di L4? Dove sta l’elenco, e con quale ancora?
- **cro-specialist:** confermi «niente link esterni nei capitoli» anche per questo caso, e quindi il link interno? Confermi gli attributi di tracciamento di L2?
- **brand-strategist:** la proposta di ui-designer mostra 9 nomi. La tua raccomandazione (§4) era di mostrare, fino al testo della pagina, solo Varese, Altamura e Caltanissetta. La legenda vale in entrambi i casi; la scelta è tua e del creative-director.

## Decisioni richieste

- **creative-director:** adottare la legenda di L1 al posto delle due proposte di P4.
- **ux-designer e cro-specialist:** link interno (a) o esterno (b), e da quando. Senza decisione, nessun link: la legenda resta da sola.
- **Sessione principale:**
  - nella patch 4 di ui-designer (`index.astro`), sostituire il testo della `figcaption` con quello di L1, con gli spazi unificatori;
  - aggiungere il link solo dopo la decisione.
