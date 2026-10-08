---
titolo: Review di veridicità · hero di /siii/ (YES) e capitolo 01 della Home (La Tana di Aldo)
owner: brand-strategist
contributi: []
stato: in revisione
versione: 1.1
aggiornato: 2026-10-08
fonti: [src/assets/images/siii-yes-mobile-negozio.jpg, src/assets/images/siii-la-tana-di-aldo-desktop-sala.jpg, src/data/media.ts, src/pages/siii.astro (righe 71–84), src/pages/index.astro (righe 128–130), scripts/prelaunch-check.mjs, dist/ delle build di 1112c93 e c11734b, commit a5dac14, d97aa29 e c11734b, parole esatte dell'utente del 2026-10-08 riportate dalla sessione principale, docs/decisioni/002-veridicita-staging-e-immagini-ai.md (0.4), docs/brief/brief-consolidato.md (0.6), docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md, docs/review/2026-10-08-hero-siii-yes-creative-director.md, docs/creativa/direzione-visiva.md (0.20: §4.5, §4.8), docs/contenuti/alt-text.md (1.6, 1.10), ricerche web del 2026-10-08 (brief consolidato §8)]
---

# Review · veridicità della hero di `/siii/` (YES) e del capitolo 01 della Home (La Tana di Aldo)

Fase 5. Il verdetto di dominio è al §5; il verdetto di gate spetta al creative-director.
- **Versione 1.0.** La hero di `/siii/` mostra da smartphone un negozio con il logo «YES» (commit 1112c93, in anteprima). Ne parlano i §1–§4.
- **Versione 1.1.** Il capitolo 01 (SIII) della Home mostra da desktop la sala de La Tana di Aldo (commit c11734b, in anteprima). Ne parla il §6. Gli input per l'utente ora sono un solo elenco (§4).

## In sintesi

- **In anteprima vanno bene tutte e due** (ADR 002 §1).
- **Al go-live no, finché per ciascuna impresa mancano due cose:**
  - il consenso scritto dell'impresa (A7);
  - la conferma che il SIII l'ha realizzato ITnode (A8).

  Il controllo di go-live blocca già la pubblicazione: è impresa per impresa dal commit a5dac14, e le cinque chiavi sono a `false`.
- **I nomi negli alt vanno bene**, alle stesse condizioni. Non nominare le imprese nel testo non toglie il bisogno del consenso (§2, §6).
- **Serve una richiesta all'utente**, in un solo elenco (§4). Il testo per le imprese è pronto (ADR 002 §3.2).
- **Aggiornati:**
  - ADR 002, versione 0.4, con la riserva del capitolo 01 della Home;
  - brief consolidato, versione 0.6 (A7, A8, consensi a cinque imprese, ricerche, D12).

## 1. Che cosa ho guardato (YES)

- **La schermata intera**, 1200 × 2000 px. Mostra:
  - il logo «YES» con «pure design 100% flowers», in alto a sinistra;
  - il menu in un cerchio bianco, in alto a destra;
  - le icone di WhatsApp, Facebook e Instagram a sinistra;
  - la parete verde, la scala verso il soppalco, gli scaffali di legno e un espositore con il marchio «EGAN»;
  - in basso, «APRI QUI», una freccia, un link «Privacy Polic…» e un pulsante tagliati dal bordo.

  Non ci sono persone.
- **Il ritaglio.**
  - Da 64em c'era tutta la schermata, in 3:5. Dal verdetto del creative-director del 2026-10-08 c'è un derivato 3:5 senza l'interfaccia tagliata in basso.
  - Sotto i 64em il ritaglio è 4:5, ancorato in alto: restano logo, menu, icone e soppalco; escono «APRI QUI», la freccia, il link e il pulsante.
- **Il codice e la build** (sola lettura). In tutto `dist/` «YES» compare solo nell'alt della hero.
- **Le altre schermate SIII**, per confrontare l'interfaccia.
- **Quattro ricerche web** del 2026-10-08: nessun riscontro (brief §8).

## 2. Il nome nell'alt: parere (YES)

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

**Stato al 2026-10-08 (v1.1).** L'alt definitivo (d97aa29) dice «Il negozio YES da smartphone: …»: la cautela è risolta.

## 3. Osservazioni (YES)

### R1 · [BLOCCANTE per il go-live] Consenso scritto di YES (A7)
- **Dove:** `/siii/`, hero; `src/data/media.ts`, `siiiHeroScreen`.
- **Problema:** la schermata mostra un'impresa reale con il suo logo, e l'alt ne riporta il nome. YES non è nelle linee guida e il suo consenso non è registrato.
- **Motivazione:** soglia 1 di CLAUDE.md; ADR 002, A7 (§3.1).
- **Proposta:**
  - chiedere il consenso con il testo dell'ADR 002 §3.2;
  - al go-live senza consenso, applicare la riserva della hero (ADR 002 §3.1): prima la sala di Masseria Santella, se Masseria Santella ha dato il consenso; altrimenti la variante «in pubblicazione» dello slot `siii-anteprima`;
  - se l'impresa dice di no, togliere la schermata subito anche dall'anteprima, che è aperta a chi ha il link (ADR 002 §1).
- **Stato:** la riserva della hero è confermata dal creative-director (verdetto del 2026-10-08, decisione 6).

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
- **Dove:** `scripts/prelaunch-check.mjs`, righe 22 e 54–60 della versione di 1112c93.
- **Problema:** `CONFIRMED.showcaseConsent` vale per tutte le imprese. Con tre consensi su quattro, o resta tutto bloccato, o con l'interruttore a `true` passa anche l'impresa che il consenso non l'ha dato.
- **Motivazione:** ADR 002 §3.1, consenso impresa per impresa.
- **Proposta:** la patch `scratchpad/bs-yes/prelaunch-check-a7-per-impresa.patch`.
  - **La mappa.** `SHOWCASE_CONSENT` ha una chiave per impresa, che è il prefisso del file: `masseria-santella`, `maison-mimina`, `dielle`, `yes`.
  - **Le chiavi non elencate.** Una schermata con una chiave che non è nella mappa fa fallire il controllo.
  - **Il dettaglio.** In caso di errore il controllo elenca impresa e pagina, per esempio `yes (/siii/index.html)`.
  - **Il resto dello script** non cambia.
  - `showcaseConsent` compare anche nella review CRO del 2026-10-07 (righe 94 e 105), ma lì è il diff di allora: non va toccata.
- **Stato:** applicata in a5dac14. Con c11734b la sessione principale ha aggiunto `la-tana-di-aldo`, e oggi il controllo elenca le cinque imprese.

### R4 · [IMPORTANTE] Riga con il nome sotto la hero: mancano nome ufficiale e comune
- **Dove:** hero di `/siii/`.
  - DV §4.8: «Ogni schermata reale dice di chi è lo spazio e dove sta».
  - Verdetto del creative-director del 2026-10-07, decisione 5.
- **Problema:**
  - la riga è «[nome] · [comune] ([provincia])», ma per YES abbiamo solo la lettura del logo;
  - la DV §4.8 parlava ancora del consenso «delle tre imprese».
- **Motivazione:** soglia 1. Un comune scritto senza fonte sarebbe un dato inventato.
- **Proposta:**
  - nessuna riga finché non arrivano nome, comune e consenso; poi il testo lo scrive copywriter-brand;
  - il creative-director estende la DV §4.8 a ogni impresa di cui il sito mostra una schermata.
- **Stato:** fatto nella DV 0.20 (verdetto del creative-director del 2026-10-08, decisioni 2 e 4). Per il capitolo 01 della Home vedi T3.

### R5 · [SUGGERIMENTO] Un marchio di terzi sul tavolo: «EGAN»
- **Dove:** la schermata, al centro, su un espositore.
- **Problema:** la DV §4.8 esclude le schermate in cui i marchi di terzi sono contenuto.
- **Valutazione:** per la veridicità non è un problema.
  - È merce in vendita nel negozio.
  - Non fa pensare a una partnership con ITnode e non contraddice «Vendita diretta», come facevano Airbnb e Booking.
  - Alla misura della hero si legge appena.
- **Proposta:** il creative-director, owner della DV §4.8, conferma che la regola qui non si applica.
- **Stato:** confermato (verdetto del creative-director del 2026-10-08, decisione 5).

## 4. Input da chiedere all'utente (YES e La Tana di Aldo)

Un solo elenco per le due imprese che non vengono dalle linee guida, più il consenso delle tre degli esempi.

| # | Domanda | Per chi | Segnaposto | Perché serve | Blocca il go-live? |
|---|---|---|---|---|---|
| 1 | Il SIII l'ha realizzato ITnode? | YES; La Tana di Aldo | `[DA VERIFICARE: realizzazione ITnode del SIII di YES (A8)]`; `[DA VERIFICARE: realizzazione ITnode del SIII de La Tana di Aldo (A8)]` | La hero di `/siii/` e il capitolo 01 della Home lo presuppongono; l'alt della Home lo scrive | Sì, se non arriva con il consenso |
| 2 | Qual è il nome ufficiale dell'impresa (insegna e, se diversa, ragione sociale), con la grafia esatta? | YES; La Tana di Aldo | `[DA FORNIRE: nome ufficiale di YES]`; `[DA FORNIRE: nome ufficiale de La Tana di Aldo]` | Alt e righe con il nome | No: senza, restano le letture dei loghi e le righe non ci sono |
| 3 | In quale comune e provincia si trova? | YES; La Tana di Aldo | `[DA FORNIRE: comune e provincia di YES]`; `[DA FORNIRE: comune e provincia de La Tana di Aldo]` | Righe con il nome (DV §4.8) | No: senza, le righe non ci sono |
| 4 | L'esperienza è online? A quale indirizzo? | YES; La Tana di Aldo | `[DA FORNIRE: indirizzo dell'esperienza di YES, se è online]`; `[DA FORNIRE: indirizzo dell'esperienza de La Tana di Aldo, se è online]` | Controllo in QA (la vista deve corrispondere all'esperienza) ed eventuale link | No |
| 5 | L'impresa ha dato il consenso scritto, oppure il contratto con ITnode prevede già l'uso nel portfolio? | YES; La Tana di Aldo | `[DA FORNIRE: consenso scritto di YES (A7)]`; `[DA FORNIRE: consenso scritto de La Tana di Aldo (A7)]` | Soglia 1 | Sì: senza, si applicano le riserve della hero e del capitolo 01 (ADR 002 §3.1) |
| 6 | Lo stesso consenso | Masseria Santella, Maison Miminà, D.L. Natura Dentro | `[DA FORNIRE: consenso scritto delle imprese degli esempi (A7)]` | Domanda aperta dal 2026-10-07. Le viste di Masseria Santella sono anche la prima riserva della hero e del capitolo 01 | Sì, impresa per impresa |

Le domande del creative-director su YES (una schermata pulita, YES tra gli esempi) sono nel suo verdetto del 2026-10-08 (Y4, Y5): qui non si duplicano.

**Testo pronto per l'utente:**

> Per le due schermate SIII che ci avete mandato oggi, il negozio YES (prima sezione della pagina SIII) e La Tana di Aldo (sezione SIII della Home), ci servono quattro cose per ciascuna:
> 1. la conferma che quel SIII l'ha realizzato ITnode;
> 2. il nome ufficiale dell'impresa, con il comune e la provincia;
> 3. l'indirizzo dell'esperienza, se è online;
> 4. il consenso scritto dell'impresa a comparire sul sito con nome, logo e schermata. Il testo da mandare è pronto. Se il contratto con ITnode prevede già l'uso nel portfolio, basta dircelo.
>
> Lo stesso consenso serve per Masseria Santella, Maison Miminà e D.L. Natura Dentro.

## 5. Verdetto di dominio

- **Anteprima:** conforme alla soglia 1, per YES e per La Tana di Aldo.
- **Go-live:** nessuna delle due è pubblicabile senza A7 e A8.
  - Il controllo di go-live le blocca già.
  - Le riserve della hero e del capitolo 01 sono definite (ADR 002 §3.1). Quella della hero è confermata dal creative-director; quella del capitolo 01 è da confermare (T3).
- **I nomi negli alt:** approvati alle stesse condizioni.
  - L'alt definitivo di YES risolve la cautela del §2.
  - L'alt de La Tana di Aldo può restare com'è, se arriva A8 (§6).

## 6. Aggiornamento (v1.1): La Tana di Aldo nel capitolo 01 della Home

Dal commit c11734b il capitolo 01 (SIII) della Home mostra da desktop la sala de La Tana di Aldo, al posto di quella di Masseria Santella. L'utente l'ha mandata con la vista desktop e quella da smartphone, con queste parole: «questo è per la home la sezione SII, quella orizzontale, poi nel caso avessi bisogno della versione mobile ce l hai». Non ha detto altro: niente su chi ha realizzato il SIII, sul nome ufficiale, sul comune o sul consenso.

### 6.1 Che cosa ho guardato

- **La schermata intera**, 2000 × 1250 px. Mostra:
  - il logo «La Tana di Aldo» in alto a sinistra, con sopra l'etichetta «APRI QUI» e una freccia;
  - la sala con la volta in pietra e i tavoli apparecchiati, con la ringhiera della scala in primo piano;
  - in basso, le icone di WhatsApp, Facebook, Instagram e della posizione, e il link «Informativa sulla Privacy».

  Non ci sono persone, né marchi di terzi oltre alle icone dell'interfaccia.
- **Il codice e la build di c11734b** (sola lettura).
  - In tutto `dist/` «La Tana di Aldo» compare solo nell'alt del capitolo.
  - La Home non nomina più Masseria Santella, che resta solo negli esempi di `/siii/`.
- **Il controllo A7:** elenca `la-tana-di-aldo (/index.html)`, con le altre quattro imprese.
- **Otto ricerche web** del 2026-10-08 su La Tana di Aldo: nessun riscontro (brief §8).

### 6.2 Il nome nell'alt: parere

L'alt provvisorio è: «Il SIII de La Tana di Aldo: una sala con la volta in pietra e i tavoli apparecchiati, vista dalla scala, e l’interfaccia dell’esperienza.»
- **Per la veridicità va bene**, alle condizioni di YES: il consenso (T1) e la conferma di A8 (T2).
- **La descrizione corrisponde alla vista:** volta, tavoli apparecchiati, ringhiera della scala in primo piano, interfaccia.
- **Il nome è nell'immagine.** Il logo occupa circa un settimo della larghezza: da desktop si legge, al telefono appena `[IPOTESI: stima dalle misure del file e del capitolo]`.
- **Segue lo schema di `alt-text.md`** per le viste da desktop senza il nome nel testo accanto, cioè «Il SIII di [impresa]: …», lo stesso usato finora per Masseria Santella.
- **Una differenza rispetto a YES.** Qui l'alt scrive «Il SIII de…»: è un'affermazione in parole, non solo un'immagine. Per questo A8 pesa di più. Con la conferma l'alt va bene così; senza, al go-live la schermata esce insieme al suo alt (ADR 002 §3.1).
- **Non nominare l'impresa nel testo del capitolo non riduce il bisogno del consenso**, per le stesse ragioni di YES (§2).

### 6.3 Osservazioni

#### T1 · [BLOCCANTE per il go-live] Consenso scritto de La Tana di Aldo (A7)
- **Dove:** Home, capitolo 01; `src/data/media.ts`, `siiiHomeScreen`.
- **Problema:** la schermata mostra logo e nome di un'impresa reale che non è nelle linee guida, e il suo consenso non è registrato.
- **Motivazione:** soglia 1; ADR 002 §3.1 (0.4).
- **Proposta:**
  - chiedere il consenso con il testo dell'ADR 002 §3.2, nella variante «nella Home»;
  - al go-live senza consenso, applicare la riserva del capitolo (ADR 002 §3.1). Prima l'interno di Masseria Santella da desktop, se Masseria Santella ha dato il consenso. Altrimenti la variante «in pubblicazione» del capitolo, senza il nome di un'impresa che non ha dato il consenso;
  - se l'impresa dice di no, togliere la schermata subito anche dall'anteprima (ADR 002 §1).

#### T2 · [IMPORTANTE] Chi ha realizzato il SIII de La Tana di Aldo (A8)
- **Dove:** Home, capitolo 01, e il suo alt.
- **Problema:**
  - l'utente non lo dice, ma l'alt sì: «Il SIII de La Tana di Aldo»;
  - il capitolo è quello che presenta il prodotto di ITnode.
- **Riscontri:**
  - in rete, nessuno;
  - l'interfaccia è molto simile a quella di YES: l'etichetta «APRI QUI» con la freccia in un cerchio con una foglia, le icone di contatto tonde con la foglia, il link alla privacy. Fa pensare a uno stesso autore per le due esperienze, ma non dice quale. È un indizio, non una prova.
- **Motivazione:** soglia 1; D.Lgs. 145/2007.
- **Proposta:** come R2. Nel brief, A8 ora vale per tutte e due le imprese.

#### T3 · [IMPORTANTE] Riga con il nome sotto il capitolo 01 e direzione visiva
- **Dove:** Home, capitolo 01; DV §4.8 (0.20).
- **Problema:**
  - la riga del capitolo (decisione 5 del 2026-10-07) è «[nome] · [comune] ([provincia])», e per La Tana di Aldo mancano nome ufficiale e comune;
  - la DV §4.8 indica ancora, per il capitolo 01, la vista e la riga di Masseria Santella, ed elenca quattro imprese.
- **Motivazione:** soglia 1, perché un comune senza fonte sarebbe inventato; coerenza tra la direzione visiva e il sito.
- **Proposta:**
  - nessuna riga finché non arrivano nome, comune e consenso;
  - il creative-director allinea la DV §4.8: vista del capitolo, riga, elenco delle cinque imprese e riserva del capitolo 01 (ADR 002 §3.1).

#### T4 · [SUGGERIMENTO] I nomi nelle schede degli esempi
- **Dove:** DV §4.8, «Consenso (A7)»: «Nome, logo, riga e schermate di ogni impresa vanno online solo con il suo consenso scritto».
- **Problema:** presa alla lettera, la frase toglierebbe anche nome e link delle schede degli esempi, se manca il consenso. L'ADR 002 invece li tiene, perché vengono dalle linee guida (LG §12).
- **Proposta:** precisare nella DV che nome, luogo e link delle schede degli esempi restano anche senza consenso. Fuori dalle schede, il nome di un'impresa va online solo con il suo consenso (ADR 002 §3.1, «Nomi delle schede degli esempi»).

## Ipotesi da validare

- `[IPOTESI: «YES» e «La Tana di Aldo» sono i nomi con cui le imprese si presentano.]` Sono le letture dei loghi.
- `[IPOTESI: le misure dei loghi sono stimate.]`
  - Il riquadro di YES misura circa 175 px su 1200; la porta è larga 26rem da 64em e 90vw al telefono.
  - Il logo de La Tana di Aldo misura circa 280 px su 2000; il capitolo è largo 62vw da 64em e 92vw al telefono.
- `[IPOTESI: il testo dell'ADR 002 §3.2 basta come consenso.]` Lo verifica il consulente legale del cliente.

## Domande aperte

- **Utente:** i sei punti del §4.
- **creative-director:**
  - T3, cioè DV §4.8 per il capitolo 01 e la riserva del capitolo;
  - T4, i nomi nelle schede degli esempi.
- **ux-designer:** nessuna. La domanda su «YES» a inizio alt è superata dall'alt definitivo.

## Decisioni richieste

- **Utente:**
  - approvare l'ADR 002 §3.1 e §3.2 (versione 0.4);
  - inoltrare la richiesta di consenso alle cinque imprese.
- **Sessione principale:** mettere a `true` la chiave di un'impresa solo dopo la registrazione del consenso nel brief.
- **creative-director:** T3, T4 e la riserva del capitolo 01.
- **copywriter-content:** rendere definitivo l'alt del capitolo 01 (§6.2). Per la veridicità va bene così, se arriva A8.
- **copywriter-brand:** le righe con il nome sotto la hero e sotto il capitolo 01, quando arrivano nome e comune.
