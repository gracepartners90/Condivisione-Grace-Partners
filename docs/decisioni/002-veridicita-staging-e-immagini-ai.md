---
titolo: "ADR 002 · Veridicità: testi del cliente in staging, conferme per il go-live; immagini elaborate con AI"
owner: brand-strategist
contributi: [creative-director, sessione principale]
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/review/2026-09-28-sito-veridicita-brand-strategist.md, docs/creativa/direzione-visiva.md]
---

# ADR 002 · Veridicità in staging e al go-live; immagini elaborate con AI

| Campo | Valore |
|---|---|
| Stato | **Proposta**. La regola va approvata dall'utente; le formulazioni di riserva le conferma il cliente. |
| Data | 2026-09-28 |
| Owner | brand-strategist (registro dei claim); creative-director per le immagini |

## Contesto

- La soglia n. 1 di CLAUDE.md vieta clienti, numeri, risultati e partnership inventati. Le linee guida chiedono di non cambiare il significato dei testi del cliente.
- Alcuni testi del cliente contengono affermazioni che il team non ha potuto verificare. Tra queste:
  - «ITnode ha creato Città Digitali e Puglia Digitale» (brief D1, omonimie);
  - «La forza di un portale ad alto traffico», che non ha dati di traffico;
  - i numeri di Puglia Digitale, che hanno fonte e anno da fornire;
  - «10.000+ clienti, prima di ITnode».
- Le foto disponibili del fondatore e la foto dell'evento sono generate o ritoccate con strumenti di AI (brief I7; filigrana di un editor generativo sul file della foto evento). L'AI Act, art. 50, prevede obblighi di trasparenza.

## Opzioni considerate

1. **Pubblicare subito le formulazioni di riserva ovunque.** Pro: rischio minimo. Contro: cambia il significato dei testi del cliente prima che il cliente li abbia rivisti.
2. **Testi del cliente in staging, conferma scritta o riserva al go-live** (proposta della brand-strategist). Pro: il cliente rivede il sito con le sue parole e risponde alle domande. Nessun claim non verificato va in produzione. Contro: lo staging deve essere protetto e non indicizzabile.
3. **Pubblicare i testi del cliente così come sono.** Esclusa: viola la soglia n. 1 se un'affermazione risulta falsa.

## Decisione proposta

- **Testi.** Si adotta l'opzione 2. Cosa è già applicato nel codice:
  - il JSON-LD usa già la formula prudente (`site.description`) e non dichiara Puglia Digitale come marchio di ITnode;
  - il testo visibile della Home resta quello delle linee guida finché il cliente risponde;
  - i testi di riserva sono nella review della brand-strategist (B1, B2, B3, I2).
- **Immagini elaborate con AI** (scelta DR3-b della sessione principale).
  - Ritratti del fondatore:
    - si pubblicano solo in monocromia «inchiostro»;
    - taglio stretto;
    - nessuna didascalia che li leghi a luoghi o eventi;
    - nota: «Immagine generata o elaborata con strumenti di intelligenza artificiale».
  - Foto dell'evento:
    - si pubblica solo come ritaglio, senza didascalie con data, luogo o nomi;
    - nota: «Immagine elaborata con strumenti di intelligenza artificiale»;
    - quando arrivano l'originale dello scatto e le liberatorie, la nota si toglie (`src/data/media.ts`).
  - Le note si spengono con un solo interruttore (`showAiNote` in `src/data/media.ts`), solo dopo il parere del consulente legale del cliente.

## Conseguenze

- Prima del go-live il cliente deve rispondere alle domande della review di veridicità. Per ogni domanda senza risposta si pubblica il testo di riserva.
- Lo staging va protetto (accesso con password o equivalente). Il sito non contiene `noindex` legati all'ambiente (specifiche SEO §3.2).
- Uno shooting reale (fondatore, luoghi) toglie la necessità delle note AI e rafforza la promessa del sito: spazi veri.

## Ipotesi da validare

- La nota proposta basta per l'art. 50 dell'AI Act [DA VERIFICARE con il consulente legale].

## Domande aperte

- Il cliente ha l'originale della foto dell'evento e le liberatorie o l'informativa delle riprese?

## Decisioni richieste

- **Utente:** approvazione della regola «staging con i testi del cliente, go-live con conferma scritta o riserva» e della scelta DR3-b.
