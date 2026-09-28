---
titolo: "ADR 003 · Politica per i crawler di AI (robots.txt)"
owner: seo-technical
contributi: [sessione principale]
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/seo/specifiche-tecniche.md, docs/review/2026-09-28-sito-seo-tecnica-seo-technical.md]
---

# ADR 003 · Politica per i crawler di AI

| Campo | Valore |
|---|---|
| Stato | **Proposta**. Decide il cliente. |
| Data | 2026-09-28 |
| Owner | seo-technical |

## Contesto

Le linee guida chiedono visibilità anche nelle risposte dei motori generativi (§26). Le specifiche SEO (§3.1) descrivono le opzioni. Il `public/robots.txt` del repository applica già l'opzione A. Alcuni hosting (per esempio Cloudflare con AI Crawl Control o con il robots.txt gestito) possono scavalcare il file del repository.

## Opzioni considerate

- **A. Accesso aperto** (consigliata): tutti i crawler ammessi. Pro: massima presenza nelle risposte e nelle citazioni dei motori generativi; i testi presentano l'azienda e non c'è nulla da proteggere. Contro: i testi possono finire nei dati di addestramento.
- **B e C** (specifiche SEO §3.1): blocco dei crawler di addestramento, oppure di tutti i crawler di AI. Pro: controllo sull'uso dei contenuti. Contro: meno presenza nelle risposte generative.

## Decisione proposta

Opzione A: `User-agent: *` con `Disallow:` vuoto e la riga `Sitemap`. Sull'hosting scelto vanno disattivate le funzioni che riscrivono robots.txt o bloccano i crawler per impostazione predefinita.

## Conseguenze

- Il check di lancio verifica che `https://itnode.it/robots.txt` risponda 200 con il contenuto del repository.
- Se il cliente sceglie B o C, cambia solo `public/robots.txt` e questo ADR passa a «superata».

## Ipotesi da validare

- Il cliente non ha vincoli contrattuali sull'uso dei testi.

## Domande aperte

- Nessuna.

## Decisioni richieste

- **Cliente:** scelta tra A, B e C.
