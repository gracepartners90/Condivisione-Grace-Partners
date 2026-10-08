---
titolo: Verdetto del creative-director · capitolo 01 della Home con La Tana di Aldo
owner: creative-director
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-08
fonti: [richiesta della sessione principale del 2026-10-08 (domande 1–5) e sua integrazione (T3, T4, riserva del capitolo 01), parole dell'utente del 2026-10-08 riportate dalla sessione principale («questo è per la home la sezione SII, quella orizzontale, poi nel caso avessi bisogno della versione mobile ce l hai»), src/assets/images/siii-la-tana-di-aldo-desktop-sala.jpg (commit c11734b), vista da smartphone dal commit 7326a1e (sha256 eacd34da…), commit 6c6f501 (alt definitivo), docs/review/2026-10-08-hero-siii-yes-brand-strategist.md (1.1, §6), docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.4, commit 6ba7f9f), docs/review/2026-10-08-hero-siii-yes-web-performance-specialist.md (§7 e osservazione 3, commit e2afd6c), docs/performance/budget.md (0.9, §4 e §7.5), docs/contenuti/alt-text.md (1.11), docs/creativa/direzione-visiva.md (0.20 → 0.21), catture della sessione principale in scratchpad/tana-home/, staging http://127.0.0.1:4321 (build di c11734b), prove del creative-director del 2026-10-08 in scratchpad/cd-tana-home/ (Playwright 1.56, Chromium 141, sharp 0.35; copie di HEAD con la vista da smartphone, costruite e servite in locale)]
---

# Verdetto · capitolo 01 della Home con La Tana di Aldo

Dal commit c11734b il capitolo 01 (SIII) della Home mostra la vista desktop de La Tana di Aldo, al posto dell'interno di Masseria Santella. L'utente l'ha mandata con la vista da smartphone della stessa esperienza, «nel caso avessi bisogno della versione mobile». Questo verdetto la rivede (Fase 5). Non è un verdetto di gate.

## In sintesi

- **Verdetto: approvato con modifiche.** La vista desktop è giusta per il capitolo. Sui telefoni in verticale serve la vista da smartphone: la patch è pronta e verificata.
- **Decisioni:**

| # | Domanda | Decisione |
|---|---|---|
| 1 | Art direction del capitolo | **Regge**, da 40em con la vista desktop intera, 16:10 |
| 2 | Vista da smartphone sui telefoni | **Sì, sotto i 40em.** Un ritaglio 4:5 della vista da smartphone, x 120, y 650, 1080 × 1350. Con AVIF 40 pesa quanto la vista desktop di oggi sui telefoni. La qualità la decide web-performance-specialist |
| 3 | «APRI QUI» sovrapposta al logo | **Resta.** Nessun ritaglio la toglie senza togliere il logo. Si chiede una vista desktop senza sovrapposizione |
| 4 | T3 di brand-strategist | DV §4.8 allineata: cinque imprese, La Tana di Aldo nel capitolo 01, riga «La Tana di Aldo · {comune} ({provincia})» con i dati e il consenso |
| 5 | T4 di brand-strategist | Accolta: nome, luogo e link degli esempi restano anche senza consenso (LG §12); altrove il nome va online solo con il consenso |
| 6 | Riserva del capitolo 01 (ADR 002 §3.1) | **Confermata**, con una precisazione: escono tutte e due le viste de La Tana di Aldo (§5) |

- **Documenti aggiornati:** direzione visiva 0.21 (§4.8, §7.3, Ipotesi, Domande aperte, Decisioni richieste, punto 9).

## 1. Che cosa ho guardato

- **Le due viste**, intere e ingrandite: la desktop (2000 × 1250) e quella da smartphone (1200 × 2000), recuperata dal commit 7326a1e.
- **Lo staging di c11734b** a sei viewport, da 360 × 640 a 1920 × 1080: il capitolo intero e lo Schermo, con dimensioni e variante scelta.
- **Quattro ritagli 4:5 per i telefoni**, pesati con la pipeline di Astro a tre qualità e provati nel capitolo con un'immagine di prova (390 × 844).
- **Due copie di HEAD con la vista da smartphone**, costruite e servite in locale, a otto viewport compresi il telefono in orizzontale e il tablet: confronto con lo staging, `astro check`, `check:seo`, `check:launch`. In una copia ho provato anche la riserva, cioè il capitolo senza la vista da smartphone.
- **Le review in parallelo:** brand-strategist 1.1 (§6) e ADR 002 0.4; `alt-text.md` 1.11 di copywriter-content; budget 0.9 e osservazione 3 di web-performance-specialist.

## 2. Art direction del capitolo (decisione 1)

**Funziona.**
- **«Spazi reali. / Esperienze digitali.» alla lettera.** Uno spazio vero, una sala con la volta in pietra, e sopra l'interfaccia dell'esperienza: logo, «APRI QUI», le icone di WhatsApp, Facebook, Instagram e della posizione, il link alla privacy.
- **Profondità e soglia.** Il muro a sinistra porta lo sguardo verso l'arco in fondo, e la ringhiera della scala in primo piano fa entrare nella sala: è il gesto della Soglia (§1.2).
- **Sulla notte.** La pietra calda è la temperatura giusta per il capitolo. A 1440 px lo Schermo misura 884 × 552 e regge sotto lo statement senza togliergli il primo piano.
- **Sistema.** Stesso Schermo 16:10 sulle colonne 5–12, nessun nodo sopra, nessuna cornice disegnata.

**Che cosa manca, come per YES.**
- Il luogo, e un nome che non sia solo nel logo e nell'alt. La riga «La Tana di Aldo · {comune} ({provincia})» arriva solo con nome ufficiale, comune e consenso (§5).
- «Esplora SIII» porta a `/siii/`, dove La Tana di Aldo non c'è. La riga dice di chi è lo spazio. Il capitolo resta con una sola CTA (HM-5), quindi niente link all'esperienza.

## 3. Sui telefoni: la vista da smartphone (decisione 2)

**Il problema di oggi.** A 390 px la vista desktop misura 350 × 219.
- Le icone diventano di circa 12 px e il link alla privacy è illeggibile: l'interfaccia sparisce.
- Resta la foto di una sala, e «Esperienze digitali» non si vede.

**La soluzione: la vista da smartphone della stessa esperienza, in 4:5**, che l'utente ha offerto per questo.
- Mostra il SIII com'è su un telefono, a 350 × 437, con le icone dei contatti di circa 39 px.
- Con due viste il capitolo mostra anche «da desktop e smartphone» del testo accanto.

**I ritagli provati** (vista da smartphone; AVIF a 768 e 1080 px):

| Ritaglio | Che cosa mostra | q50 | q40 | Giudizio |
|---|---|---|---|---|
| **x 120, y 650, 1080 × 1350** (derivato) | Sala, scala e tre icone intere. Fuori il condizionatore e quasi tutta la volta | 55,7 / 91,4 | **36,8 / 61,3** | Scelto |
| Ancorato in basso | Come sopra, con il condizionatore nell'angolo in alto a sinistra e più volta | 62,4 / 101,2 | 40,8 / 68,2 | No |
| Ancorato in alto | Logo, comandi, la volta stirata dalla proiezione; la sala in fondo | 71,0 / 113,4 | 47,1 / 77,1 | No |
| Un 4:5 della vista desktop | Al massimo 1000 px di larghezza, meno di quanto serve a 3x; secondo dove cade, un'icona tagliata o il muro | — | — | No |

- **Il riquadro scelto** è il 4:5 più grande che lascia fuori il condizionatore (x 0–120) e tiene le tre icone intere: 55 px sopra il bordo inferiore, 37 px dal sinistro. È a piena risoluzione: 1080 px per i telefoni a 3x.
  - Non contiene il logo, che nella vista da smartphone sta in alto, sopra la volta stirata. Sui telefoni il nome lo dicono l'alt e, quando arriva, la riga (H3).
- **La qualità.**
  - Con i valori del sito (AVIF 50) il ritaglio supera gli obiettivi del budget per le foto: 55,7 KB a 768 contro 45 a 828, 91,4 KB a 1080 contro 70.
  - Con AVIF 40, solo per questo ritaglio, pesa 17,8 / 28,0 / 36,8 / 61,3 KB a 480 / 640 / 768 / 1080: quanto la vista desktop di oggi sui telefoni (37,8 e 63,0 KB), dentro gli obiettivi.
  - Conta anche dove la rete lenta di laboratorio fa scaricare la schermata durante il caricamento (budget §7.5): lì non pesa più di oggi.
  - Ho confrontato 50 e 40 ingrandendo il dettaglio due volte: 40 ammorbidisce un poco la grana della pietra, ma la ringhiera e le icone restano nette. Alla densità dei telefoni la differenza non si vede.
  - **Per l'art direction AVIF 40 va bene.** Decide web-performance-specialist, che può anche scegliere i valori del sito con un'eccezione motivata: è una riga della patch.
- **Solo sotto i 40em.**
  - Tablet e telefoni in orizzontale tengono la vista desktop, che lì è larga e si legge: 755 × 472 a 820 px, 777 × 486 a 844 × 390.
  - Con il limite di 64em un tablet avrebbe un'immagine 4:5 alta 940 px, e un telefono in orizzontale una più alta dello schermo.
- **Il ritmo dei tre capitoli sui telefoni.** Le immagini sono la foto 4:5 a 350 × 437, la Puglia a 350 × 308, l'Italia a 350 × 446: una foto e due carte, quindi tre cose diverse. Il capitolo 01 cresce da 959 a 1178 px.

**La patch, provata.** File: `scratchpad/cd-tana-home/home-capitolo01-telefono-con-1440.patch`. Contiene anche le larghezze dell'osservazione 3 di web-performance-specialist (WebP e JPEG fino a 1440, AVIF fino a 1920 solo da 1,5 dppx), perché toccano la stessa `<Media>`.
- **`Media.astro`:** `mobileCrop` accetta `media`, cioè dove vale il ritaglio, e `quality`, solo per il ritaglio. Le altre `Media` del sito non cambiano.
- **`scripts/prepare-assets.mjs`:** il derivato `siii-la-tana-di-aldo-mobile-sala-4x5.jpg`, che segue la convenzione letta dal controllo A7.
- **`src/data/media.ts`:** `mobileImage` facoltativo in `siiiHomeScreen`. **`src/pages/index.astro`:** il ritaglio e una regola CSS per il 4:5, legata a una classe che c'è solo con `mobileImage`.
- **Verificato sulla copia di HEAD:**
  - `/siii/`, Puglia Digitale, Città Digitali, Contatti, le due policy e la 404 sono identiche byte per byte allo staging;
  - nella Home cambiano solo la `<picture>` del capitolo e una regola CSS;
  - le sorgenti sono in quest'ordine: telefono sotto i 40em (AVIF e WebP fino a 1080), AVIF fino a 1920 da 1,5 dppx, AVIF e WebP fino a 1440. Il WebP più pesante è 141,3 KB;
  - varianti scelte: 4:5 da 1080 px a 360, 390 e 412 px; vista desktop a 820, 844 × 390, 1024, 1440 e 1920;
  - `astro check`: 0 errori; `check:seo`: nessun problema; `check:launch`: il controllo A7 elenca `la-tana-di-aldo (/index.html)`;
  - **la riserva è una modifica di soli dati.** Senza `mobileImage` in `media.ts` il capitolo torna alla sola vista desktop, senza 4:5 e senza file del ritaglio.
- **L'alt** di copywriter-content (6c6f501) vale per tutte e due le viste, come ha già scritto in `alt-text.md` 1.11: volta, tavoli, scala, interfaccia.

## 4. «APRI QUI» sovrapposta al logo (decisione 3)

- **Che cosa si vede.** Nella vista desktop, in alto a sinistra, la «o» di «Aldo» copre la «A» di «APRI QUI», e il cerchio della freccia tocca l'anello del logo: si legge «di Aldo PRI QUI». Nella vista da smartphone logo ed etichetta sono separati.
- **Si lascia com'è.**
  - È l'interfaccia dell'esperienza, almeno a quella larghezza di finestra: le schermate si tagliano, non si ritoccano (§4.1).
  - Un ritaglio non può togliere l'etichetta senza togliere il logo, perché i due si toccano. Il logo è l'unico segno visibile di chi è lo spazio.
  - Ogni 16:10 più piccolo della schermata perderebbe risoluzione sui desktop ad alta densità: 983 px CSS chiedono 1966 px.
  - È in un angolo, piccola rispetto alla sala. Non è l'interfaccia tagliata in fondo che su YES si vedeva subito.
- **Sui telefoni non c'è:** il ritaglio della vista da smartphone non contiene il logo.
- **Richiesta all'utente:** una vista desktop in cui l'etichetta non tocchi il logo, per esempio a un'altra larghezza di finestra. Se si sovrappone anche dal vivo, va corretta nell'esperienza. Lo stesso file con lo stesso formato si sostituisce senza toccare il codice.

## 5. I punti di brand-strategist

**T3 · DV §4.8 allineata.**
- Nella tabella «Dove e quale» il capitolo 01 ha la vista de La Tana di Aldo, con il ritaglio per i telefoni.
- La riga del capitolo è «La Tana di Aldo · {comune} ({provincia})», solo con nome ufficiale, comune e consenso. Fino ad allora nessuna riga.
- Le imprese sono cinque.

**T4 · I nomi degli esempi: accolta.** Nella DV §4.8, «Consenso (A7)», ora c'è scritto:
- nome, luogo e link delle tre imprese degli esempi vengono dalle linee guida e restano nelle loro schede anche senza consenso;
- fuori dalle schede (testo, righe, alt) il nome di un'impresa va online solo con il suo consenso.

**Riserva del capitolo 01 (ADR 002 §3.1): confermata**, con una precisazione:
1. escono tutte e due le viste de La Tana di Aldo, con il ritaglio per i telefoni, e il loro alt;
2. torna l'interno di Masseria Santella da desktop, 16:10 a ogni larghezza, se Masseria Santella ha dato il consenso. È la vista approvata il 2026-10-07, con il suo alt, e con la riga «Masseria Santella · Cassano delle Murge (BA)» alle stesse condizioni;
3. altrimenti la variante «in pubblicazione» del capitolo, senza nome né luogo (§4.5).

Con la patch la riserva è una modifica di soli dati in `src/data/media.ts`: `image` e `alt` di Masseria Santella, senza `mobileImage`. Un'altra schermata con consenso entra solo con il mio parere e la misura di web-performance-specialist.

## 6. Cosa funziona e va protetto

- **La scelta dell'utente:** uno spazio pugliese vero e caldo, non da cartolina, con l'interfaccia del prodotto sopra.
- **Due viste della stessa esperienza:** desktop su schermi larghi, smartphone sui telefoni. È il prodotto, mostrato com'è dove lo si guarda.
- **I pesi:** con AVIF 40 sul ritaglio, i telefoni non scaricano più di oggi.
- **Il lavoro in parallelo:** l'alt vale per le due viste; il controllo A7 per impresa vede anche il derivato; la proposta di web-performance-specialist sulle larghezze è nella stessa patch.

## 7. Osservazioni

**H1 · [BLOCCANTE per il go-live] Consenso de La Tana di Aldo e conferma che il SIII è di ITnode (A7, A8)**
- **Dove:** Home, capitolo 01.
- **Problema e motivazione:** quelli di T1 e T2 di brand-strategist; soglia 1 e ADR 002 §3.1.
- **Proposta:** la richiesta dell'ADR 002 §3.2. Senza risposta, la riserva confermata al §5.

**H2 · [IMPORTANTE] Sui telefoni l'interfaccia della vista desktop sparisce**
- **Dove:** Home, capitolo 01, sotto i 40em.
- **Problema:** a 350 × 219 icone di circa 12 px e privacy illeggibile; si vede una foto, non un sito.
- **Motivazione:** DV §4.8, «L'interfaccia resta com'è: … È la prova che un SIII è un sito».
- **Proposta:** la patch del §3.

**H3 · [IMPORTANTE] Riga con il nome e il comune sotto il capitolo**
- **Dove:** Home, capitolo 01.
- **Problema:** il luogo non c'è, e su `/siii/` La Tana di Aldo non compare.
- **Motivazione:** DV §4.8; decisione 5 del 2026-10-07; soglia 1, perché un comune senza fonte sarebbe inventato.
- **Proposta:** quando arrivano nome ufficiale, comune e consenso, il testo lo scrive copywriter-brand e markup e lettura li decide ux-designer, fuori dall'apertura come per la hero di `/siii/`. Non è un link (HM-5).

**H4 · [SUGGERIMENTO] Una vista desktop senza la sovrapposizione**
- **Dove:** `src/assets/images/siii-la-tana-di-aldo-desktop-sala.jpg`.
- **Problema:** «APRI QUI» sotto la «o» del logo (§4).
- **Proposta:** chiedere all'utente la stessa vista a un'altra larghezza di finestra, oppure dopo una correzione dell'esperienza.

## 8. Stato delle review di dominio

| Review | Verdetto di dominio | Sintesi del creative-director |
|---|---|---|
| brand-strategist, 1.1, §6 | Go-live solo con A7 e A8 | Accolte T1 e T2. T3 e T4 applicate nella DV, riserva confermata (§5) |
| copywriter-content, `alt-text.md` 1.11 | Alt definitivo, nel sito da 6c6f501 | Approvato. Vale per le due viste |
| web-performance-specialist, §7 e osservazione 3 | Conforme; patch consigliata sulle larghezze | Accolta, dentro la patch del §3. Dopo la patch va rimisurata la Home sui telefoni, e va decisa la qualità del ritaglio |

## 9. Verdetto

**Approvato con modifiche.**
- Da applicare ora: la patch del §3 (H2), che contiene anche quella di web-performance-specialist.
- Quando ci sono nome, comune e consenso: la riga sotto il capitolo (H3).
- Bloccante per il go-live: il consenso de La Tana di Aldo e la conferma A8 (H1).

## Patch da applicare (sessione principale)

1. **La vista da smartphone torna nel repository**, come originale intatto:
   - comando: `git show 7326a1e:src/assets/images/siii-la-tana-di-aldo-mobile-sala.jpg > src/assets/images/siii-la-tana-di-aldo-mobile-sala.jpg`;
   - sha256 atteso: `eacd34da71384368ba929b053e53c1c9bd49c7c14457d111d62d51c36405662d`.
2. **`git apply scratchpad/cd-tana-home/home-capitolo01-telefono-con-1440.patch`.**
   - `git apply --check` passa su a3a4ecc.
   - Non va applicata anche `scratchpad/perf-yes/home-ch01-1440.patch`: è già dentro.
   - C'è anche `home-capitolo01-telefono.patch`, la stessa senza le larghezze di web-performance-specialist, nel caso lui preferisca applicarle a parte.
3. **`npm run assets`.**
   - Genera `src/assets/images/derivate/siii-la-tana-di-aldo-mobile-sala-4x5.jpg`, 1080 × 1350, sha256 `14ef01963073ec1f04ade5c2e87a464a77fab036150398ece74b177344e940b0`.
   - Gli altri dieci derivati restano identici.
4. **La build. Verifiche:**
   - sotto i 40em il capitolo usa `siii-la-tana-di-aldo-mobile-sala-4x5.*` (AVIF fino a 61,3 KB), da 40em la vista desktop;
   - le altre pagine sono identiche;
   - `check:launch`, controllo A7, elenca `la-tana-di-aldo (/index.html)`.
5. **Se web-performance-specialist sceglie i valori del sito**, si toglie `quality: { avif: 40 }` in `src/pages/index.astro`: 55,7 e 91,4 KB a 768 e 1080, con un'eccezione da motivare nel budget.

## Ipotesi da validare

- `[DA VERIFICARE: il SIII de La Tana di Aldo l'ha realizzato ITnode (A8)]`; `[IPOTESI: «La Tana di Aldo» è il nome con cui l'impresa si presenta]` (ADR 002 0.4).
- `[DA VERIFICARE: «APRI QUI» si sovrappone al logo anche dal vivo, o solo a quella larghezza di finestra]`.
- Il passaggio a 40em e il ritaglio sono provati in Chromium 141; Safari e Firefox `[DA VERIFICARE]`.

## Domande aperte

- **Utente:**
  - una vista desktop de La Tana di Aldo senza la sovrapposizione (H4);
  - consenso, A8, nome ufficiale, comune: le domande sono quelle della review di brand-strategist e del brief, e non si duplicano.
- **web-performance-specialist:** la qualità del ritaglio per telefono, AVIF 40 o i valori del sito con un'eccezione (§3).
- **ux-designer:** markup e lettura della riga con il nome, quando arriva (H3).

## Decisioni richieste

- **Sessione principale:** i passi 1–4 delle patch, poi la build.
- **web-performance-specialist:** la qualità del ritaglio e la rimisura della Home sui telefoni dopo la patch.
- **Utente:** la vista desktop senza sovrapposizione (H4); l'ADR 002 §3.1 e §3.2 per La Tana di Aldo, già richiesti da brand-strategist.
