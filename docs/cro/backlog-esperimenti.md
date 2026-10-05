---
titolo: Backlog degli esperimenti
owner: cro-specialist
contributi: []
stato: bozza
versione: 0.2
aggiornato: 2026-10-05
fonti: [docs/review/2026-09-28-sito-conversione-cro-specialist.md (§5), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (§3.4, §3.6, §3.8), docs/creativa/direzione-visiva.md (§5), docs/contenuti/copy-deck/home.md (§1), docs/cro/piano-misurazione.md (§8.1, §10), docs/cro/strategia-conversione.md]
---

# Backlog degli esperimenti

> **In breve**
> - **Nessun test A/B al lancio**: il traffico non basta (§1). Si lavora con test qualitativi e con confronti prima/dopo, letti con cautela.
> - **Primo esperimento: E1**, la riga di posizionamento della hero della Home, **A contro B**, con un test dei 5 secondi con titolari di PMI. Non richiede traffico. Al lancio resta A; se B vince, decide il creative-director.
> - E2, E4 ed E5 aspettano dati o decisioni del cliente. E3 è chiuso: la modifica è stata applicata prima del lancio, senza test.

## 1. Regole

- **Formato.** Ogni ipotesi si scrive «Se… allora… perché…», con un punteggio ICE: impatto, fiducia e facilità da 1 a 10, e come punteggio la media dei tre.
- **Prima dei dati**: metrica primaria, metodo e regola di decisione si scrivono prima di vedere i risultati.
- **Metodi.** Test con utenti e test dei 5 secondi; feedback di chi gestisce le richieste; sondaggi brevi; registrazioni di sessione solo con il consenso.
- **Nessuna manipolazione**: niente urgenza o scarsità false, niente confirmshaming, nessuna CTA che promette qualcosa che la pagina dopo non mantiene.
- **Stati**: proposto, pronto, in corso, concluso, chiuso senza test.

**Campione.** Per variante servono circa n ≈ 16·p(1−p)/Δ² osservazioni, con potenza dell'80% e α = 0,05.

| Metrica | Valori di partenza [IPOTESI] | Campione per variante |
|---|---|---|
| Conversione di una pagina | p = 2%, Δ = 0,5 punti | circa 12.500 visite |
| Completamento del form | p = 30%, Δ = 6 punti | circa 930 `form_start` |
| Clic dalla Home verso i capitoli | p = 30%, Δ = 6 punti | circa 930 visite della Home |
| Risposte corrette in un test dei 5 secondi | dal 50 all'80% | circa 40 persone |

Per un sito B2B di nicchia sono mesi di traffico, e al lancio non c'è né uno strumento di analytics né uno di test. Per questo si parte dai metodi qualitativi.

## 2. Backlog

| # | Esperimento | ICE (I · C · E → media) | Stato | In attesa di |
|---|---|---|---|---|
| **E1** | Riga di posizionamento della hero della Home: A contro B | 6 · 5 · 8 → 6,3 | **pronto** | partecipanti (§3) |
| E2 | Passi reali e volto di chi risponde accanto al form | 7 · 6 · 6 → 6,3 | proposto | processo, tempi, chi risponde e foto reale [DA FORNIRE] |
| E4 | Etichetta «Email» invece di «Email aziendale» | 4 · 5 · 9 → 6,0 | proposto | decisione del cliente (verdetto G4, §6, A.9) |
| E5 | Primaria della hero di PD e CD: la richiesta invece del portale | 5 · 4 · 8 → 5,7 | proposto | 8–12 settimane di dati con uno strumento di analytics |
| E3 | Chiusura di PD senza l'uscita verso il portale | — | chiuso senza test | — (§5) |

Il punteggio di E5 era 5,3 nella review di conversione: la media corretta di 5, 4 e 8 è 5,7.

## 3. E1 · Riga di posizionamento della hero della Home: A contro B

**Varianti.** Testi del copy deck della Home (§1); scelta dello sfidante del creative-director (direzione visiva, §5).

| Variante | Testo | Ruolo |
|---|---|---|
| **A** | «Esperienze digitali immersive per imprese e territori.» | controllo, online al lancio |
| **B** | «Rendiamo imprese e territori esplorabili sul Web.» | sfidante |
| C | «Spazi di imprese e territori, da esplorare sul Web.» | **di riserva, non si testa**: non dice chi fa che cosa e somiglia al motto di un portale. Si riprende solo se B fallisce per una ragione che C risolve |

A e B hanno la stessa posizione (`lead` sotto l'H1), la stessa scala e gli a capo già misurati: cambia solo il testo.

**Ipotesi.** Se la riga sotto l'H1 dice il risultato con un verbo (B) invece della categoria (A), allora più titolari di PMI, dopo 5 secondi, sapranno dire che ITnode rende i loro spazi esplorabili sul Web. Perché B descrive il gesto e il risultato, mentre «immersive» può far pensare a visori o a mostre immersive, che ITnode non fa (copy deck della Home, §1, [IPOTESI] di copywriter-brand).

**Metriche**
- **Primaria**: la quota di partecipanti che rispondono in modo corretto alla domanda aperta «Che cosa fa questa azienda?», secondo la griglia qui sotto.
- **Secondarie**:
  - la quota che indica i destinatari giusti, cioè imprese e territori, alla domanda «Per chi lavora?»;
  - la quota che cita visori, realtà virtuale, mostre o eventi immersivi: è il fraintendimento atteso con A;
  - la risposta a «Potrebbe servire alla tua attività?» (sì, no, non so).
- **Dopo il lancio, solo come lettura**: i clic su `home-capitolo-*` rispetto alle visite della Home, prima e dopo un eventuale cambio. Richiede uno strumento di analytics e non decide nulla da sola (§1).

**Metodo: test dei 5 secondi, a gruppi separati**
- **Ogni persona vede una sola variante.** Chi ha visto A sa già che cosa fa ITnode, e la seconda risposta sarebbe falsata.
- **Partecipanti**: 8–10 per variante [IPOTESI], titolari o responsabili di PMI del target (strutture ricettive, negozi, produttori, showroom) in Puglia, che non conoscono ITnode e non ne sono clienti o fornitori. Assegnazione alternata, bilanciando tipo di attività e dispositivo. Il reclutamento passa dalla rete del cliente [DA FORNIRE: 16–20 contatti disponibili].
- **Stimolo**: la prima schermata della Home a 390 × 844 px, header compreso, identica nelle due varianti tranne la riga. Le due schermate si producono con Playwright sull'anteprima, sostituendo il testo in pagina: nessuna modifica al codice. Se il reclutamento lo permette, un secondo giro su desktop a 1440 × 900 px.
- **Procedura**: 5 secondi di esposizione, poi cinque domande aperte in quest'ordine, senza suggerire parole:
  1. Che cosa fa questa azienda?
  2. Per chi lavora?
  3. Che cosa ti aspetti di trovare continuando?
  4. Potrebbe servire alla tua attività?
  5. Ricordi una parola o una frase?
- **Modalità**: sessione moderata di circa 10 minuti, a distanza o in presenza, condotta da cro-specialist o da una persona del team, **non dal fondatore**: davanti a lui le risposte sarebbero più gentili che vere. Si può unire alle osservazioni del §6.
- **Privacy**: note anonime; nessuna registrazione audio o video senza un consenso scritto.

**Griglia di codifica**, fissata prima del test

| Codice | Risposta a «Che cosa fa questa azienda?» |
|---|---|
| Corretta | rende luoghi, spazi o attività esplorabili, visitabili o navigabili online: per esempio visite virtuali, tour, «entrare» in un'attività dal Web |
| Parziale | categoria vicina, ma senza il gesto: per esempio «fa siti», «digitalizza le imprese», «marketing del territorio» |
| Errata | visori o realtà virtuale, mostre o eventi immersivi, videogiochi, agenzia generica, «non so» |

Due persone codificano in modo indipendente, senza sapere quale variante ha visto il partecipante; i disaccordi si risolvono prima di aprire i risultati per variante.

**Regola di decisione**, scritta prima del test

| Esito | Decisione |
|---|---|
| B supera A di almeno 30 punti percentuali di risposte corrette (3 persone su 10), e non introduce un fraintendimento nuovo in più di una persona su 10 | si propone B al creative-director |
| A è pari o migliore, oppure B lo supera di meno di 10 punti | resta A |
| Differenza tra 10 e 30 punti | secondo giro di 8–10 persone per variante, se il reclutamento lo permette; altrimenti decide il creative-director, pesando anche i fraintendimenti citati |
| Nessuna delle due arriva al 60% di risposte corrette | il problema non è solo la riga: si riapre la gerarchia della hero con creative-director e copywriter-brand |

**Limiti.** Con 8–10 persone per variante l'esito è indicativo, non statistico: per una differenza di 30 punti con potenza dell'80% ne servirebbero circa 40 per variante (§1). Per questo la regola chiede una differenza ampia, e conta anche la qualità delle risposte.

**Chi**
- cro-specialist: protocollo, conduzione, analisi;
- copywriter-brand: varianti e griglia di codifica;
- creative-director: decisione finale, perché la riga fa parte della hero;
- cliente: contatti dei partecipanti.

**Quando.** Il test non richiede traffico. Il verdetto G4 lo colloca dopo il lancio (§5.2); si può svolgere anche prima, sulle schermate dell'anteprima, ma la scelta del testo online resta del creative-director (direzione visiva, §5: al lancio resta A).

**Costo.** Nessun codice per il test. Se si adotta B: il testo della prop `lead` in `src/pages/index.astro` e l'allineamento del copy deck.

## 4. Gli altri esperimenti aperti

### E2 · Passi reali e volto di chi risponde accanto al form
- **Ipotesi.** Se accanto ai form compaiono i passi reali («Cosa succede dopo») e il volto di chi risponde, allora sale il completamento del form, perché cala l'ansia su che cosa succede dopo l'invio.
- **Metrica.** Al lancio, senza analytics: richieste valide per settimana e per form, dall'endpoint, prima e dopo. Con uno strumento: `form_submit` / `form_start`. In più, le domande ricorrenti raccolte da chi richiama.
- **Metodo.** Prima/dopo, non A/B; feedback di chi gestisce le richieste.
- **Dipende da** processo reale, tempi garantiti, nome di chi risponde e foto reale [DA FORNIRE] (strategia, §8; verdetto G4, N5).

### E4 · Etichetta «Email» invece di «Email aziendale»
- **Ipotesi.** Se l'etichetta è «Email» invece di «Email aziendale», allora calano esitazioni ed errori sul campo, perché chi usa Gmail, Libero o Alice non si chiede se il suo indirizzo va bene.
- **Metrica.** Con uno strumento: `form_error` con `email` in `error_fields`, e gli abbandoni dopo `form_start`. Senza: le osservazioni nei test con utenti e la quota di indirizzi personali che arrivano.
- **Metodo.** Osservazione nei test con utenti; decide il cliente (verdetto G4, §6, A.9).

### E5 · Primaria della hero di PD e CD: la richiesta invece del portale
- **Ipotesi.** Se la CTA primaria della hero di Puglia Digitale e Città Digitali diventa la richiesta, e il portale scende a link, allora salgono le richieste da queste pagine. Il costo sono meno visite ai portali, che però fanno da prova.
- **Metrica.** `form_view` e `form_submit` di PD e CD, rispetto agli `outbound_click` di tipo `portale`, contati per `destination_id` (`puglia-digitale`, `citta-digitali`) e non per dominio (piano di misurazione, §4). Su CD, dal 2026-10-05, tra le uscite verso il portale c'è anche «Tutte le città sul portale» (`cd-portale-tutte-le-citta`): va letta a parte, perché non è un'alternativa alla richiesta ma una prova.
- **Metodo.** Decisione dopo 8–12 settimane di dati, non A/B. Richiede uno strumento di analytics (piano, §8).

## 5. Chiusi

| # | Esperimento | Esito |
|---|---|---|
| E3 | Chiusura di PD senza l'uscita verso il portale | **Applicato prima del lancio, senza test** (verdetto G4, §3.8: nessuna obiezione di identità). Da osservare quando ci sarà uno strumento: `form_start` / `form_view` su PD rispetto a CD |

## 6. Da osservare nei test con utenti

Non sono esperimenti: sono domande da tenere presenti nelle sessioni di E1 o nei test moderati.
- Nella prima schermata di SIII, PD e CD ci sono due bottoni pieni, «Parliamone» nell'header e la primaria della hero, che portano in posti diversi. Creano esitazione?
- «Aderisci a …» nella hero di PD e CD porta a un form intitolato «Contattaci» (PD) o «Entra in Città Digitali» (CD). Si capisce che il primo passo è una richiesta, non un'iscrizione? (review di conversione, oss. 9)
- Contatti, sezione Persona: il link «Scopri il suo percorso» si nota? Serve a chi sta per scrivere? (verdetto G4, N5)
- Form a due colonne su desktop: i campi appaiati creano esitazioni? Se sì, c'è l'alternativa in subgrid già provata da ui-designer (verdetto G4, §3.6).

## 7. Registro degli esiti

Vuoto. Ogni esperimento concluso riporta qui data, campione, risultato, decisione e chi l'ha presa.

## Ipotesi da validare

- [IPOTESI] Il traffico del sito non basta per test A/B, né sulla conversione né sui clic della Home (§1).
- [IPOTESI] Il cliente può mettere a disposizione 16–20 titolari di PMI per E1.
- [IPOTESI] «Immersive» evoca in parte del target visori o mostre immersive (copy deck della Home, §1): E1 lo verifica.

## Domande aperte

- [DA FORNIRE] Contatti di PMI del target, disponibili per un test di circa 10 minuti.
- [DA FORNIRE] I dati per E2: processo reale, tempi garantiti, chi risponde, una foto reale.
- Per il creative-director: E1 si svolge dopo il lancio, come nel verdetto G4, oppure anche prima, sulle schermate dell'anteprima?

## Decisioni richieste

- **creative-director**: quando svolgere E1 e, a test concluso, quale riga pubblicare.
- **Cliente**: reclutamento dei partecipanti di E1; etichetta del campo email (E4).
- **Utente**: uno strumento di analytics entro il primo mese dal lancio (piano, §8), senza il quale E5 e le letture quantitative restano ferme.
