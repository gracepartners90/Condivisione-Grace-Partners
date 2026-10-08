---
titolo: Review di veridicità · hero di /siii/ con la schermata YES
owner: brand-strategist
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-08
fonti: [src/assets/images/siii-yes-mobile-negozio.jpg, src/data/media.ts (righe 62–65), src/pages/siii.astro (righe 71–84), scripts/prelaunch-check.mjs, dist/ della build di 1112c93, parole esatte dell'utente del 2026-10-08 riportate dalla sessione principale, docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.3), docs/brief/brief-consolidato.md (0.5), docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md, docs/creativa/direzione-visiva.md (§4.5, §4.8), docs/contenuti/alt-text.md (1.6), ricerche web del 2026-10-08 (brief consolidato §8)]
---

# Review · veridicità della hero di `/siii/` (schermata YES)

Fase 5. La hero di `/siii/` mostra da smartphone un negozio con il logo «YES» (commit 1112c93, in anteprima). Il verdetto di dominio è in fondo; il verdetto di gate spetta al creative-director.

## In sintesi

- **In anteprima va bene** (ADR 002 §1).
- **Al go-live no, finché mancano due cose:**
  - il consenso scritto dell'impresa (A7);
  - la conferma che il SIII l'ha realizzato ITnode (A8).

  Il controllo di go-live blocca già la pubblicazione.
- **Il nome nell'alt va bene**, alle stesse condizioni. Non nominare l'impresa nel testo non toglie il bisogno del consenso (§2).
- **Serve una richiesta all'utente**, con sei punti (§4). Il testo per le imprese è pronto (ADR 002 §3.2).
- **Aggiornati:**
  - ADR 002, versione 0.3;
  - brief consolidato, versione 0.5 (A7, A8, consensi, D12).
- **Patch del controllo:** `scratchpad/bs-yes/prelaunch-check-a7-per-impresa.patch` (R3).

## 1. Che cosa ho guardato

- **La schermata intera**, 1200 × 2000 px. Mostra:
  - il logo «YES» con «pure design 100% flowers», in alto a sinistra;
  - il menu in un cerchio bianco, in alto a destra;
  - le icone di WhatsApp, Facebook e Instagram a sinistra;
  - la parete verde, la scala verso il soppalco, gli scaffali di legno e un espositore con il marchio «EGAN»;
  - in basso, «APRI QUI», una freccia, un link «Privacy Polic…» e un pulsante tagliati dal bordo.

  Non ci sono persone.
- **Il ritaglio.**
  - Da 64em c'è tutta la schermata, in 3:5.
  - Sotto i 64em il ritaglio è 4:5, ancorato in alto: restano logo, menu, icone e soppalco; escono «APRI QUI», la freccia, il link e il pulsante.
- **Il codice e la build** (sola lettura). In tutto `dist/` «YES» compare solo nell'alt della hero.
- **Le altre schermate SIII**, per confrontare l'interfaccia.
- **Quattro ricerche web** del 2026-10-08: nessun riscontro (brief §8).

## 2. Il nome nell'alt: parere

**Per la veridicità va bene**, con il consenso (R1) e la conferma di A8 (R2).
- **Il nome è già nell'immagine.** Il logo resta a ogni larghezza, ma è piccolo: circa 60 px di lato da 64em, circa 50 px su un telefono largo 390 px. «YES» si legge appena; «pure design 100% flowers» no `[IPOTESI: stima dalle misure del file e della porta]`. L'alt non aggiunge un'informazione che l'immagine non ha: la rende accessibile.
- **Segue la regola di `alt-text.md`** per le schermate da smartphone senza il nome nel testo accanto, cioè «[impresa] da smartphone: …», la stessa usata finora per la hero.
- **La descrizione corrisponde alla vista** in tutti e due i ritagli: parete verde, scala, soppalco, scaffali, menu, contatti.

**Non nominare l'impresa nel testo non riduce il bisogno del consenso.**
- L'alt è testo pubblico: lo leggono gli screen reader, sta nell'HTML e lo usa la ricerca per immagini.
- In più, il logo identifica l'impresa.

**Una cautela: «YES» è la lettura del logo, non un nome confermato.** Il nome ufficiale può essere diverso, per esempio con «pure design».
- **Proposta a copywriter-content**, owner dell'alt, finché il nome non è confermato: dire solo ciò che si vede, «Il negozio con il logo YES, da smartphone: …».
- **Da verificare con ux-designer:** «YES» da solo, a inizio frase, uno screen reader può leggerlo come la parola inglese.
- **Con il nome confermato** si torna allo schema «[impresa] da smartphone: …». Se arriva la riga con il nome (R4), l'alt passa alla variante senza nome, come già previsto in `alt-text.md`.

## 3. Osservazioni

### R1 · [BLOCCANTE per il go-live] Consenso scritto di YES (A7)
- **Dove:** `/siii/`, hero; `src/data/media.ts`, `siiiHeroScreen`.
- **Problema:** la schermata mostra un'impresa reale con il suo logo, e l'alt ne riporta il nome. YES non è nelle linee guida e il suo consenso non è registrato.
- **Motivazione:** soglia 1 di CLAUDE.md; ADR 002, A7 (0.3, §3.1).
- **Proposta:**
  - chiedere il consenso con il testo dell'ADR 002 §3.2;
  - al go-live senza consenso, applicare la riserva della hero (ADR 002 §3.1): prima la sala di Masseria Santella, se Masseria Santella ha dato il consenso; altrimenti la variante «in pubblicazione» dello slot `siii-anteprima`;
  - se l'impresa dice di no, togliere la schermata subito anche dall'anteprima, che è aperta a chi ha il link (ADR 002 §1).

### R2 · [IMPORTANTE] Chi ha realizzato il SIII di YES (A8)
- **Dove:** hero di `/siii/`.
- **Problema:**
  - la hero della pagina che vende il SIII dice, senza parole, «questo è un SIII di ITnode»;
  - l'utente non l'ha detto: ha scritto «scusami usa questa non quella»;
  - per i tre esempi questa base viene dalle linee guida (LG §12), per YES no.
- **Riscontri:**
  - in rete, nessuno;
  - l'interfaccia è compatibile con quella di Masseria Santella e Maison Miminà: menu in un cerchio bianco in alto a destra e icone di contatto tonde. È un indizio, non una prova.
- **Motivazione:** soglia 1. Presentare come proprio il lavoro di un altro fornitore sarebbe pubblicità ingannevole (D.Lgs. 145/2007).
- **Proposta:**
  - in anteprima la schermata resta;
  - per il go-live serve la conferma. Può arrivare con il consenso, perché il testo del §3.2 dice «il SIII che ITnode ha realizzato per…», oppure con una riga dell'utente;
  - la voce è registrata come A8 nel brief.

### R3 · [IMPORTANTE] Il controllo A7 ha un solo interruttore per quattro imprese
- **Dove:** `scripts/prelaunch-check.mjs`, righe 22 e 54–60.
- **Problema:** `CONFIRMED.showcaseConsent` vale per tutte le imprese. Con tre consensi su quattro, o resta tutto bloccato, o con l'interruttore a `true` passa anche l'impresa che il consenso non l'ha dato.
- **Motivazione:** ADR 002 §3.1, consenso impresa per impresa.
- **Proposta:** la patch `scratchpad/bs-yes/prelaunch-check-a7-per-impresa.patch`.
  - **La mappa.** `SHOWCASE_CONSENT` ha una chiave per impresa, che è il prefisso del file: `masseria-santella`, `maison-mimina`, `dielle`, `yes`.
  - **Le chiavi non elencate.** Una schermata con una chiave che non è nella mappa fa fallire il controllo.
  - **Il dettaglio.** In caso di errore il controllo elenca impresa e pagina, per esempio `yes (/siii/index.html)`.
  - **Il resto dello script** non cambia.
  - **Per applicarla:** `git apply --check`, poi `git apply`. Le due righe di contesto vuote non hanno lo spazio iniziale, e `git apply` le accetta lo stesso.
  - **Come verificarla.** Sulla build attuale il controllo A7 deve fallire ed elencare le quattro imprese.
  - `showcaseConsent` compare anche nella review CRO del 2026-10-07 (righe 94 e 105), ma lì è il diff di allora: non va toccata.

### R4 · [IMPORTANTE] Riga con il nome sotto la hero: mancano nome ufficiale e comune
- **Dove:** hero di `/siii/`.
  - DV §4.8: «Ogni schermata reale dice di chi è lo spazio e dove sta».
  - Verdetto del creative-director del 2026-10-07, decisione 5.
- **Problema:**
  - la riga è «[nome] · [comune] ([provincia])», ma per YES abbiamo solo la lettura del logo;
  - la DV §4.8 parla ancora del consenso «delle tre imprese».
- **Motivazione:** soglia 1. Un comune scritto senza fonte sarebbe un dato inventato.
- **Proposta:**
  - nessuna riga finché non arrivano nome, comune e consenso; poi il testo lo scrive copywriter-brand;
  - il creative-director estende la DV §4.8 a ogni impresa di cui il sito mostra una schermata.

### R5 · [SUGGERIMENTO] Un marchio di terzi sul tavolo: «EGAN»
- **Dove:** la schermata, al centro, su un espositore.
- **Problema:** la DV §4.8 esclude le schermate in cui i marchi di terzi sono contenuto.
- **Valutazione:** per la veridicità non è un problema.
  - È merce in vendita nel negozio.
  - Non fa pensare a una partnership con ITnode e non contraddice «Vendita diretta», come facevano Airbnb e Booking.
  - Alla misura della hero si legge appena.
- **Proposta:** il creative-director, owner della DV §4.8, conferma che la regola qui non si applica.

## 4. Input da chiedere all'utente

| # | Domanda | Segnaposto | Perché serve | Blocca il go-live? |
|---|---|---|---|---|
| 1 | Il SIII di YES l'ha realizzato ITnode? | `[DA VERIFICARE: realizzazione ITnode del SIII di YES (A8)]` | La hero lo presuppone | Sì, se non arriva con il consenso |
| 2 | Qual è il nome ufficiale dell'impresa (insegna e, se diversa, ragione sociale), con la grafia esatta? | `[DA FORNIRE: nome ufficiale di YES]` | Alt e riga con il nome | No: senza, resta la lettura del logo e la riga non c'è |
| 3 | In quale comune e provincia si trova? | `[DA FORNIRE: comune e provincia di YES]` | Riga con il nome (DV §4.8) | No: senza, la riga non c'è |
| 4 | L'esperienza è online? A quale indirizzo? | `[DA FORNIRE: indirizzo dell'esperienza di YES, se è online]` | Controllo in QA (la vista deve corrispondere all'esperienza) ed eventuale link | No |
| 5 | L'impresa ha dato il consenso scritto, oppure il contratto con ITnode prevede già l'uso nel portfolio? | `[DA FORNIRE: consenso scritto di YES (A7)]` | Soglia 1 | Sì: senza, si applica la riserva della hero |
| 6 | Lo stesso consenso, per Masseria Santella, Maison Miminà e D.L. Natura Dentro | `[DA FORNIRE: consenso scritto delle imprese degli esempi (A7)]` | Domanda aperta dal 2026-10-07 | Sì, impresa per impresa |

**Testo pronto per l'utente:**

> Per la schermata YES nella prima sezione della pagina SIII ci servono quattro cose:
> 1. la conferma che quel SIII l'ha realizzato ITnode;
> 2. il nome ufficiale del negozio, con il comune e la provincia;
> 3. l'indirizzo dell'esperienza, se è online;
> 4. il consenso scritto del negozio a comparire sul sito con nome, logo e schermata. Il testo da mandargli è pronto. Se il contratto con ITnode prevede già l'uso nel portfolio, basta dircelo.
>
> Lo stesso consenso serve per Masseria Santella, Maison Miminà e D.L. Natura Dentro.

## 5. Verdetto di dominio

- **Anteprima:** conforme alla soglia 1.
- **Go-live:** YES non è pubblicabile senza A7 e A8. Il controllo di go-live lo blocca già, e la riserva della hero è definita (ADR 002 §3.1).
- **Il nome nell'alt:** approvato alle stesse condizioni, con la proposta del §2 finché il nome non è confermato.

## Ipotesi da validare

- `[IPOTESI: «YES» è il nome con cui l'impresa si presenta.]` È la lettura del logo.
- `[IPOTESI: le misure del logo sono stimate.]` Il riquadro misura circa 175 px su 1200; la porta è larga 26rem da 64em e 90vw al telefono.
- `[IPOTESI: il testo dell'ADR 002 §3.2 basta come consenso.]` Lo verifica il consulente legale del cliente.

## Domande aperte

- **Utente:** i sei punti del §4.
- **creative-director:**
  - la DV §4.8 per ogni impresa (R4);
  - «EGAN» (R5);
  - la riserva della hero (ADR 002 §3.1).
- **ux-designer:** come si legge «YES» a inizio alt (§2).

## Decisioni richieste

- **Utente:**
  - approvare l'ADR 002 §3.1 e §3.2;
  - inoltrare la richiesta di consenso alle quattro imprese.
- **Sessione principale:**
  - applicare e verificare la patch di R3;
  - mettere a `true` la chiave di un'impresa solo dopo la registrazione del consenso nel brief.
- **creative-director:** R4, R5 e la riserva della hero.
- **copywriter-content:** l'alt della hero (§2).
- **copywriter-brand:** la riga con il nome, quando arrivano nome e comune.
