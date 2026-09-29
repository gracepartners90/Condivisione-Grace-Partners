---
titolo: Parere di accessibilità sulla rotazione più rapida dell'orizzonte su mobile (R1)
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-09-29
fonti: [docs/review/2026-09-29-sito-ricontrollo-c14-ui-designer.md (R1), src/components/ui/Horizon.astro, src/components/sections/Hero.astro, src/components/layout/Header.astro, docs/creativa/direzione-visiva.md §5, docs/ux/accessibilita.md §2.6, http://localhost:4321/ (dist del commit 100b578), CLAUDE.md]
oggetto: proposta R1 di ui-designer (su mobile i +60° della rotazione dell'orizzonte nei primi 60svh invece che in 100svh), rispetto a WCAG 2.2 (2.2.2, 2.3.3), ai disturbi vestibolari e alla lettura delle etichette
---

# Parere di accessibilità · rotazione più rapida dell'orizzonte su mobile (R1)

## In sintesi
- **Via libera a R1 sui telefoni in verticale.**
  - La striscia resta legata allo scorrimento, lineare e più lenta della pagina: 0,46–0,56 px per pixel di scorrimento, contro gli 0,28–0,34 di oggi.
  - Con il movimento ridotto non si muove.
  - Non riguarda 2.2.2, e 2.3.3 resta rispettato.
- **Una condizione, sui telefoni in orizzontale.** Sotto i 700 px di larghezza la regola vale anche lì, ma 60svh è molto corto. La striscia correrebbe a 1,78 px per pixel, quasi il doppio della pagina e di traverso: è il movimento più a rischio per chi ha disturbi vestibolari. In orizzontale, poi, l'header non è sticky, quindi il motivo di R1 non c'è.
- **Proposta, provata.** `animation-range-end: max(60svh, 60vw)`. In verticale è identica a R1 su tutti i formati provati. In orizzontale la striscia non supera mai la velocità della pagina: 1,00 px per pixel, meno degli 1,07 di oggi.

## 1. Metodo
- **Build.** Staging su http://localhost:4321/, `dist` del commit 100b578. Snippet iniettato in pagina con Playwright (Chromium 141); movimento attivo, emulazione touch.
- **Formati.**
  - Telefoni in verticale: 320 × 568, 360 × 640, 375 × 667, 390 × 844, 414 × 896, 430 × 932.
  - Finestra stretta: 699 × 844.
  - Telefoni in orizzontale sotto i 700 px: 568 × 320, 640 × 360, 667 × 375.
- **Misura.**
  - Scorrimento istantaneo ogni 10 px, da 0 a 110% dell'altezza; traslazione della striscia letta dalla matrice di `transform`.
  - «Velocità»: massimo di traslazione laterale per pixel di scorrimento.
  - «Vista»: corsa percorsa mentre la linea dell'orizzonte è in vista sotto l'header.
- **Limiti.** Solo Chromium. Nessuna prova con persone con disturbi vestibolari né su iOS reale. Il supporto di Safari alle animazioni legate allo scorrimento è `[DA VERIFICARE]`; dove manca, `@supports` le esclude e l'orizzonte resta fermo.

## 2. Misure

| Formato | Header | Oggi (100svh) | R1 (60svh) | R1 con limite (`max(60svh, 60vw)`) |
|---|---|---|---|---|
| 320 × 568 | sticky | 0,34 px/px · vista 88 px | 0,56 · vista 146 px | identica a R1 |
| 360 × 640 | sticky | 0,34 · vista 78 px | 0,56 · vista 129 px | identica a R1 |
| 375 × 667 | sticky | 0,34 · vista 81 px | 0,56 · vista 135 px | identica a R1 |
| 390 × 844 | sticky | 0,28 · vista 78 px (33%) | 0,46 · vista 129 px (55%) · fine a 510 px | identica a R1 |
| 414 × 896 | sticky | 0,28 · vista 83 px | 0,46 · vista 139 px | identica a R1 |
| 430 × 932 | sticky | 0,28 · vista 86 px | 0,46 · vista 143 px | identica a R1 |
| 699 × 844 | sticky | 0,50 · vista 159 px | 0,83 · vista 265 px | identica a R1 |
| 568 × 320 | statico | 1,07 · corsa 341 px in 320 px | **1,78** · corsa 341 px in 200 px | **1,00** · corsa in 341 px |
| 640 × 360 | statico | 1,07 · corsa 384 px in 360 px | **1,78** · corsa 384 px in 220 px | **1,00** |
| 667 × 375 | statico | 1,07 · corsa 400 px in 380 px | **1,78** · corsa 400 px in 230 px | **1,00** |
| Movimento ridotto (390 × 844, 667 × 375) | — | fermo (`transform: none`) | fermo | fermo |

La corsa totale è sempre 0,6 × la larghezza (+60° su un campo di 100°). R1 non la cambia: cambia solo lo scorrimento su cui si compie. Per questo la velocità dipende dalle proporzioni della finestra, e nei formati bassi e larghi cresce.

## 3. Criteri e rischi

| Tema | Esito | Perché |
|---|---|---|
| 2.2.2 Pausa, stop, nascondi (A) | Non si applica, come oggi | La rotazione non parte da sola: si muove solo mentre si scorre e si ferma con lo scorrimento. È lineare, senza inerzia propria (stessa decisione del marquee, `accessibilita.md` §2.6). |
| 2.3.3 Animazione da interazioni (AAA, buona pratica) | Rispettato | Con `prefers-reduced-motion: reduce` l'animazione non esiste (`animation-name: none`), anche con lo snippet: è dentro `(prefers-reduced-motion: no-preference)` e non può riattivarla. |
| 2.3.1 Lampeggiamenti | Nessun rischio | Linea sottile con tacche ed etichette, nessuna variazione di luminanza su aree ampie |
| Disturbi vestibolari | Accettabile in verticale; da limitare in orizzontale | **Rischio:** movimento laterale mentre si scorre in verticale, una direzione diversa dallo scorrimento (lo schema del parallasse). **Lo contengono:** banda sottile, ampiezza fissa, movimento limitato al primo tratto, nessuno zoom né rotazione vera, controllato dall'utente, fermo con il movimento ridotto. In verticale resta sotto la metà della velocità della pagina (≤ 0,56 sui telefoni). In orizzontale R1 lo porterebbe a 1,78 volte la pagina, e non c'è motivo di farlo. |
| Lettura delle etichette | Migliora | A riposo le etichette si leggono sempre, perché la striscia si ferma quando ci si ferma. Con R1 Varese esce dalla dissolvenza mentre è in vista: finestra di 70–140 px di scorrimento, misurata da ui-designer. L'orizzonte è `aria-hidden` e i luoghi sono scritti altrove: nessuna informazione dipende dal movimento. |

## 4. Osservazione

### R1-a · [IMPORTANTE] Telefoni in orizzontale: con R1 la striscia correrebbe quasi al doppio della pagina
- **Dove:** `src/components/sections/Hero.astro`, regola proposta in R1 (`@media (max-width: 43.74em)`). Vale anche per i telefoni in orizzontale larghi meno di 700 px (568 × 320, 640 × 360, 667 × 375).
- **Problema.**
  - In orizzontale 60svh vale 192–225 px, mentre la corsa della striscia resta 341–400 px. La striscia trasla di 1,78 px per ogni pixel di scorrimento verticale e compie tutta la rotazione in 200–230 px.
  - Qui l'header non è sticky (sotto i 480 px di altezza è statico), quindi il motivo di R1, cioè vedere Varese prima che l'orizzonte passi sotto l'header, non si presenta. Oggi l'orizzonte si vede per l'83–91% della rotazione.
- **Motivazione.**
  - Un movimento più veloce della pagina e perpendicolare allo scorrimento è quello che più spesso dà fastidio a chi ha disturbi vestibolari. Non tutte queste persone impostano il movimento ridotto.
  - WCAG non fissa una soglia. Come regola di progetto propongo che un elemento legato allo scorrimento non si muova mai più in fretta della pagina (≤ 1 px per px).
- **Proposta, provata.** Un limite nella stessa regola: l'intervallo non è mai più corto della corsa della striscia (60vw, cioè 0,6 × la larghezza con il campo mobile di 100°).
  - In verticale 60svh è sempre maggiore di 60vw, quindi la regola è identica a R1 su tutti i formati provati: stessa velocità, stessa finestra per Varese.
  - In orizzontale la velocità scende a 1,00, meno di oggi.

  ```css
  /* src/components/sections/Hero.astro. Phones: the +60° happen in the first 60svh (UI recheck R1),
     but never over less scroll than the strip travels (60vw = 0.6 × width with the 100° mobile
     field): the strip never moves faster than the page, also on landscape phones (ux-designer). */
  @media (max-width: 43.74em) and (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: scroll()) {
      .hero--home .hero-home__horizon :global(.horizon__strip) {
        animation-range-end: max(60svh, 60vw);
      }
    }
  }
  ```

  Nella prova ho iniettato la regola con `!important`, perché il CSS iniettato non ha gli attributi di Astro. Nel componente vale il peso del selettore, già verificato da ui-designer per R1. Se il campo visivo mobile cambia, `60vw` va ricalcolato come percentuale del campo: 60° diviso per il campo.
- **Coerenza con il resto del sito.**
  - Il marquee legato allo scorrimento (Home e `/siii/`) resta tra 0,43 e 0,50 px per pixel a 320 × 568, 390 × 844, 667 × 375 e 1440 × 900.
  - Oggi solo l'orizzonte in orizzontale supera di poco la regola (1,07). Con il limite scende a 1,00; senza R1 lo stesso limite si scriverebbe `max(100svh, 60vw)`. È una differenza minima e non la considero bloccante.
- **Alternativa accettabile.** R1 così com'è, ma solo in verticale: `@media (max-width: 43.74em) and (orientation: portrait) and (prefers-reduced-motion: no-preference)`. In orizzontale resterebbe la velocità di oggi, 1,07. Preferisco il limite, che copre anche finestre basse non orientate e non supera mai la velocità della pagina.

## Verdetto di dominio (accessibilità)
**Via libera a R1 con il limite `max(60svh, 60vw)`, oppure con la restrizione al formato verticale.** Senza l'una o l'altra, niente via libera per i telefoni in orizzontale.
- In tutti i casi valgono tre condizioni, già rispettate dallo snippet:
  - la regola resta dentro `prefers-reduced-motion: no-preference` e `@supports`;
  - la rotazione resta lineare e legata allo scorrimento, senza inerzia propria;
  - la corsa totale non cambia (+60°).
- Nessuna soglia non negoziabile è toccata: WCAG 2.2 AA resta rispettato con o senza R1. La decisione sulla rotazione (DV §5) resta del creative-director.

## Ipotesi da validare
- La soglia «mai più veloce della pagina» è una regola di progetto: WCAG non fissa numeri. Andrebbe confermata con persone con disturbi vestibolari, se si faranno test con utenti `[DA FORNIRE: partecipanti o servizio di test]`.
- Su iOS la quantità di moto dello scorrimento continua dopo che il dito si alza, e la striscia continua con lei. È sempre movimento iniziato dall'utente, ma la sensazione su un dispositivo reale va provata.

## Domande aperte
- **creative-director:** limite `max(60svh, 60vw)` oppure restrizione al formato verticale. Il testo della DV §5 proposto da ui-designer può aggiungere «mai più rapidi della pagina».

## Decisioni richieste
- **creative-director:** decidere R1 (DV §5) e, se lo accoglie, con quale delle due forme accettabili.
- **Sessione principale:** applicare la forma scelta. Dopo l'applicazione basta rieseguire la misura della velocità (script `ux-verifica/r1-motion.mjs` nello scratchpad) su un formato verticale e uno orizzontale.
