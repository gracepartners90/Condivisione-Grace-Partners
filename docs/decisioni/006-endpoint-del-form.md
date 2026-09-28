---
titolo: "ADR 006 · Endpoint del modulo di contatto"
owner: cro-specialist
contributi: []
stato: proposta
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/cro/strategia-conversione.md (§7), docs/cro/piano-misurazione.md (§1, §9), docs/decisioni/001-stack-tecnologico.md (§3.6), docs/decisioni/004-anteprima-su-railway.md, docs/review/2026-09-28-sito-conversione-cro-specialist.md (oss. 3), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md (C04), src/scripts/form.ts, src/components/sections/ContactForm.astro, scripts/serve.mjs, public/_headers]
---

# ADR 006 · Endpoint del modulo di contatto

| | |
|---|---|
| Stato | **Proposta**. Da decidere prima del go-live: è la condizione C04 del G4. |
| Data | 2026-09-28 |
| Owner | cro-specialist per requisiti e conversione; sessione principale per l'implementazione; web-performance-specialist e seo-technical per hosting e verifiche |
| Decide | l'utente, o il cliente attraverso l'utente |

> **In breve**
> - **Consiglio l'opzione A**: una piccola funzione sullo stesso dominio del sito riceve la richiesta e la inoltra per email con un provider che tiene i dati nell'UE, per esempio Scaleway Transactional Email. Nessun cookie, nessuno script in più nelle pagine, nessun CORS. Si può provare subito sull'anteprima di Railway, prima di scegliere l'hosting.
> - **B** è un servizio di form gestito con sede e dati nell'UE: niente codice, ma un fornitore nuovo, giovane e ancora da verificare.
> - **C** è partire senza endpoint, con l'email già compilata: solo con l'accettazione scritta dell'utente e una data entro cui attivare A o B.

## Contesto

- **Il form è la conversione principale**: quattro form, in fondo a /siii, /puglia-digitale e /citta-digitali e su /contatti.
- **Oggi `PUBLIC_FORM_ENDPOINT` è vuota.** Il sito lo dichiara prima dei campi e all'invio prepara un'email già compilata: nessun invio simulato. Il ripiego però dipende da un client di posta configurato, che su desktop spesso manca, e le richieste non si possono contare (review di conversione, oss. 3).
- **Il contratto di `form.ts`**, che l'endpoint deve rispettare:
  - `POST` `multipart/form-data` all'indirizzo di `data-endpoint`, con `Accept: application/json` e un timeout di 15 s;
  - risposta `2xx`: pannello di successo ed evento `form_submit`; qualunque altra risposta: pannello d'errore, dati conservati nel form, bozza email;
  - campi: `nome`, `email`, `telefono`, `azienda`, `interesse` (da zero a tre valori), `messaggio`, `privacy`, più `_elapsed_ms`, `_page` e `_form`;
  - l'honeypot `_gotcha` lo controlla `form.ts` e lo toglie dal payload. Al server arriva compilato solo dagli invii senza JavaScript, quasi sempre bot che scrivono direttamente all'endpoint, e questi invii non hanno `_elapsed_ms`.
- **Senza JavaScript** il form fa un `POST` nativo verso `action`, con lo stesso formato.
- **Hosting.** Quello di produzione non è deciso (ADR 001, §3.6: Cloudflare proposto, poi Netlify e Railway). L'anteprima è su Railway con `scripts/serve.mjs` (ADR 004), che oggi risponde solo a `GET` e `HEAD`. In `public/_headers` non c'è una Content-Security-Policy: oggi nessun vincolo su `connect-src` o `form-action`.
- **Vincoli di progetto**: nessun cookie non tecnico, zero terze parti al caricamento (`docs/performance/budget.md`), nessun CAPTCHA inaccessibile, consensi separati e mai preselezionati.
- L'ADR 001 chiamava questa decisione «ADR 002», ma quel numero è andato alla veridicità: questo è l'ADR 006.

## Requisiti minimi, per qualunque opzione

| # | Requisito | Perché |
|---|---|---|
| 1 | **Dati nell'UE.** Le richieste si conservano solo in sistemi nell'UE: la casella che le riceve ed eventuali archivi. Chi le tratta anche solo in transito (hosting, invio email) ha un DPA. Se è un fornitore extra UE, serve una base per il trasferimento (DPF o clausole contrattuali standard), da citare nell'informativa | GDPR, capo V; condizione C03 del G4 |
| 2 | **Nessun cookie, nessuno script di terze parti.** La risposta dell'endpoint non contiene `Set-Cookie`; le pagine non caricano script del fornitore. Se un giorno servisse Turnstile: caricato al primo focus su un campo, senza pre-clearance (strategia, §7) | piano di misurazione, §1, condizione 6; budget di performance |
| 3 | **Antispam senza attrito per chi scrive.** Lato server: honeypot `_gotcha`; tempo minimo (`_elapsed_ms` sotto i 3000 ms, oppure assente); limite di frequenza per IP (per esempio 5 invii in 10 minuti, poi `429`); dimensione massima (per esempio 64 KB, poi `413`); validazione di campi obbligatori, formato dell'email e lunghezze | strategia, §7 |
| 4 | **Quarantena, mai cancellazione silenziosa.** Le richieste sospette arrivano comunque, marcate (per esempio l'oggetto «[Da controllare]»), e si rivedono ogni settimana. Alla pagina si risponde `2xx`: la richiesta è stata ricevuta davvero, quindi non è un finto successo | un falso positivo è un contatto perso |
| 5 | **Contratto con `form.ts`.** `2xx` con JSON se va a buon fine; `4xx`/`5xx` con JSON se fallisce; risposta entro 15 s. CORS solo verso l'origine del sito e dell'anteprima, se l'endpoint sta su un altro dominio. Senza JavaScript: una pagina HTML minima di conferma con il link per tornare al sito | `src/scripts/form.ts` |
| 6 | **Notifica.** A [DA FORNIRE: destinatario, per esempio info@itnode.it], con `Reply-To` uguale all'email del richiedente e con interessi e `_page` nell'oggetto. Mittente su un dominio di itnode.it autenticato con SPF e DKIM, allineati a DMARC: serve l'accesso al DNS (condizione C08). **Nessuna risposta automatica al richiedente**: trasformerebbe l'endpoint in un modo per mandare email a indirizzi qualsiasi. Il pannello di successo dice già che cosa succede dopo | recapito delle email e sicurezza |
| 7 | **Minimizzazione.** Nessun log del contenuto delle richieste; l'IP resta solo in memoria, per il limite di frequenza. Conservazione per il tempo indicato nell'informativa [DA FORNIRE dal consulente]. Nessun uso di marketing | GDPR, art. 5 |
| 8 | **Provato prima del go-live**, in staging: richiesta valida ricevuta per email; invio rapido e honeypot in quarantena; `429` oltre il limite; nessun `Set-Cookie`; CORS rifiutato da un'altra origine, se serve. Con Playwright (piano, §9, test 4 e 7) e con un'email vera ricevuta | condizione C04 («scelto, registrato in un ADR e provato») |

## Opzioni considerate

### A. Funzione sullo stesso dominio del sito, con invio da un provider email nell'UE (consigliata)

**Come funziona.** `PUBLIC_FORM_ENDPOINT=/api/richiesta`. La richiesta arriva all'hosting del sito, che controlla, marca gli invii sospetti e manda l'email. La logica è una sola funzione (richiesta → dati del form → controlli → email → JSON), portabile tra gli hosting:
- **Railway** (anteprima oggi, produzione se si sceglie l'opzione C dell'ADR 001): una route `POST` in `scripts/serve.mjs`, con il servizio nella regione EU West (Amsterdam). Node 22 legge il `multipart` e chiama l'API del provider senza nuove dipendenze.
- **Cloudflare** (opzione A dell'ADR 001): un Worker nello stesso progetto, come l'ADR 001 già prevede.
- **Netlify**: una Function. Regione dell'esecuzione [DA VERIFICARE].

**Invio dell'email**, tre possibilità:
- **Scaleway Transactional Email** (Francia). Secondo la sua documentazione, tutta la piattaforma è gestita da Scaleway nell'UE, senza sub-responsabili extra UE, e i dati sono ospitati e trattati interamente nell'UE. Gratis fino a 300 email al mese, poi a consumo. Invio via API o SMTP; richiede SPF e DKIM sul dominio.
- **Brevo** (Francia), che secondo fonti secondarie tiene i dati nell'UE [DA VERIFICARE piano, condizioni e DPA].
- **Il server SMTP della casella del cliente**: nessun nuovo fornitore per l'email. In Node richiede una dipendenza (per esempio `nodemailer`) [DA FORNIRE: provider di posta di itnode.it].
- Non consiglio l'invio integrato di Cloudflare (Email Sending dai Workers): è in beta pubblica dal 16 aprile 2026, richiede il piano a pagamento ed è di un fornitore statunitense, quindi non aiuta il requisito 1.

Verificato il 2026-09-28 con Node 22.22.2: `Request.formData()` legge il `multipart` del form senza librerie.

| Pro | Contro |
|---|---|
| Stesso dominio: niente CORS, niente script nelle pagine, nessuna modifica a una futura CSP | Codice da scrivere e mantenere: circa 100–150 righe [IPOTESI], più i test |
| Contratto identico a quello di `form.ts`; quarantena e limiti sotto controllo | Chiave dell'API da custodire tra le variabili dell'hosting |
| Nessun nuovo fornitore per ricevere la richiesta: la tratta l'hosting, che tratta già le visite. L'unico fornitore in più è quello dell'email | Servono SPF e DKIM sul dominio di invio, quindi l'accesso al DNS (C08) |
| Si prova subito sull'anteprima di Railway, prima della scelta dell'hosting: C04 chiede un endpoint «provato» | Se la produzione non va su Railway, la route si porta in un Worker o in una Function |
| Costo: dentro l'hosting; per l'email basta il piano gratuito [IPOTESI: decine di richieste al mese] | Railway e Cloudflare sono aziende statunitensi: trattano la richiesta in transito con il loro DPA [DA VERIFICARE da una rete che raggiunga i documenti]. Su Cloudflare il punto di presenza è il più vicino al visitatore, e l'elaborazione nell'UE non è garantita senza le funzioni di localizzazione dei piani Enterprise [DA VERIFICARE] |
| Lo stesso endpoint può ricevere il RUM delle prestazioni, se approvato (piano, §8.1) | Nessun archivio consultabile oltre alla casella email: a questi volumi basta |

### B. Servizio di form gestito, con sede e dati nell'UE

**Come funziona.** `PUBLIC_FORM_ENDPOINT` è l'indirizzo del servizio. Dalla ricerca del 2026 emergono tre candidati; nessuno dei loro siti è raggiungibile dall'ambiente, quindi tutto è [DA VERIFICARE]:
- **Formdall**: ospitato in Germania, dati cifrati, IP conservato solo come hash giornaliero; un captcha proof-of-work ospitato da loro, senza cookie;
- **SimplyForms**: inoltro verso la casella senza conservare le richieste, sede e server nell'UE, DPA ed elenco dei sub-responsabili pubblicati;
- **Forminit**: società registrata nel Regno Unito, dati su AWS in Irlanda.

| Pro | Contro |
|---|---|
| Nessun codice lato server | Fornitori giovani: rischio di continuità proprio sulla conversione principale |
| Pannello con archivio, esportazione e filtri antispam mantenuti dal fornitore | Un responsabile del trattamento in più: DPA, sub-responsabili e sede da verificare |
| Indipendente dalla scelta dell'hosting | Dominio diverso: CORS dal lato del fornitore; con una futura CSP, `connect-src` e `form-action` da aprire |
| Piani gratuiti o economici [DA VERIFICARE] | Alcuni filtri scartano lo spam in silenzio o mostrano un successo anche quando la richiesta viene scartata: contatti persi senza che nessuno lo sappia. La quarantena va verificata |
| | Alcune protezioni richiedono uno script del fornitore (captcha, proof-of-work): è una terza parte. Si accetta solo se si carica all'interazione e dopo il via libera di web-performance-specialist |
| | Da verificare anche la risposta JSON con `Accept: application/json` e il significato del `2xx` rispetto a `form.ts` |

### C. Nessun endpoint al lancio: ripiego «email già compilata», con una scadenza

**Come funziona.** Il sito esce com'è: avviso prima dei campi e, all'invio, la bozza email. Serve l'accettazione scritta dell'utente e una data entro cui attivare A o B (verdetto G4, C04).

| Pro | Contro |
|---|---|
| Nessun lavoro, nessun fornitore nuovo | La conversione principale dipende da un client di posta configurato, che su desktop spesso manca |
| Già onesto e già provato: nessun invio simulato | Le richieste non si contano; al più si conta il clic sulla bozza (`<form_id>-ripiego-bozza-email`), cioè una «richiesta preparata», non certa |
| | L'avviso «Il modulo online non è ancora attivo» su tutti e quattro i form pesa sulla fiducia proprio nel momento della decisione |

### Escluse

- **Formspree e servizi simili con i dati negli Stati Uniti.** Formspree è ospitato su AWS negli Stati Uniti e si basa sulle clausole contrattuali standard: contrario al requisito 1.
- **Netlify Forms**, possibile solo con l'hosting su Netlify. Tutte le richieste passano dal filtro antispam di Akismet, un servizio terzo, e la regione dei dati non risulta dalle fonti consultate [DA VERIFICARE]. Si riconsidera solo se l'hosting sarà Netlify.
- **reCAPTCHA e CAPTCHA a immagini**: terze parti con cookie, e inaccessibili.

## Decisione proposta

1. **Opzione A**, con Scaleway Transactional Email, oppure con il server SMTP del cliente se preferisce non aggiungere un fornitore.
2. Si implementa prima sull'anteprima di Railway, in `scripts/serve.mjs`, e si prova con i test del requisito 8. Poi si porta sull'hosting di produzione, quando sarà scelto (ADR 001).
3. **B** resta l'alternativa se il cliente non vuole codice da mantenere, dopo la verifica dei punti segnati [DA VERIFICARE].
4. **C** solo con l'accettazione scritta dell'utente e una data [IPOTESI: entro 30 giorni dal lancio]. Nel frattempo si conta la bozza email.

## Conseguenze

- **Sessione principale**: route `POST /api/richiesta`; variabili `PUBLIC_FORM_ENDPOINT`, chiave del provider e destinatario; una richiesta `GET` sullo stesso indirizzo risponde `405`; test del requisito 8.
- **Utente e cliente**: account del provider email; record SPF e DKIM nel DNS (C08); destinatario delle richieste; chi controlla la quarantena ogni settimana.
- **Consulente privacy** (C03): informativa con finalità, base giuridica (misure precontrattuali), conservazione e fornitori (hosting e provider email); cookie policy senza cookie del form.
- **seo-technical**: `/api/` fuori dalla sitemap; nessun effetto sull'indicizzazione.
- **web-performance-specialist**: nessun effetto sul peso delle pagine; tempo di risposta dell'endpoint sotto il timeout.
- **cro-specialist**: test 4 e 7 del piano sull'endpoint reale; registro delle richieste (piano, §2); revisione dello spam con chi risponde, nelle prime settimane.

## Fonti

Consultate il 2026-09-28. Il sito di Railway, la sua documentazione, Brevo e i servizi di form candidati non sono raggiungibili dall'ambiente: dove non indicato, le informazioni vengono dai risultati di ricerca e vanno verificate.
- Scaleway, [Transactional Email FAQ](https://www.scaleway.com/en/docs/transactional-email/faq/), letta direttamente nel sorgente pubblico della documentazione ([scaleway/docs-content](https://github.com/scaleway/docs-content/blob/main/pages/transactional-email/faq.mdx), validazione del 2025-09-24): dati nell'UE, nessun sub-responsabile extra UE, piano gratuito da 300 email al mese, SPF e DKIM obbligatori.
- Railway, [Regions](https://docs.railway.com/deployments/regions) (regione EU West ad Amsterdam, scelta per servizio) e [Data Processing Addendum](https://railway.com/legal/dpa) (DPA con clausole contrattuali standard): attraverso i risultati di ricerca.
- Brevo, [Data storage location](https://help.brevo.com/hc/en-us/articles/360001005510-Data-storage-location): attraverso i risultati di ricerca.
- Cloudflare, [Email Sending in public beta](https://developers.cloudflare.com/changelog/post/2026-04-16-email-sending-public-beta/) (dal 16 aprile 2026, piano Workers a pagamento) e [prezzi di Workers](https://www.cloudflare.com/plans/developer-platform-pricing/) (100.000 richieste al giorno nel piano gratuito): attraverso i risultati di ricerca.
- Netlify, [Spam filters](https://docs.netlify.com/manage/forms/spam-filters/): attraverso i risultati di ricerca.
- Formspree, [Security](https://formspree.io/security/): attraverso i risultati di ricerca.
- Servizi di form con dati nell'UE: [confronto di SimplyForms](https://simplyforms.app/en/form-backend-comparison), [guida di Forminit](https://forminit.com/blog/best-form-backend-services-2026/) e [Formdall su mcpservers.org](https://mcpservers.org/servers/formdall-de). Sono in gran parte fonti dei fornitori stessi: attraverso i risultati di ricerca.
- Codice letto il 2026-09-28: `src/scripts/form.ts`, `src/components/sections/ContactForm.astro`, `scripts/serve.mjs`, `public/_headers`, `railway.json`.

## Ipotesi da validare

- [IPOTESI] Le richieste sono poche decine al mese: bastano i piani gratuiti.
- [IPOTESI] Il servizio dell'anteprima su Railway si può spostare o creare nella regione EU West senza effetti sul resto (ADR 004 non indica la regione attuale).
- [IPOTESI] La logica dell'opzione A sta in circa 100–150 righe, senza nuove dipendenze se l'email passa da un'API.

## Domande aperte

- [DA FORNIRE] A quale indirizzo devono arrivare le richieste, e chi controlla la quarantena?
- [DA FORNIRE] Chi fornisce oggi la posta di itnode.it? Il cliente preferisce usare quel server SMTP?
- [DA VERIFICARE] Regione attuale del servizio dell'anteprima su Railway (con il connettore Railway, sessione principale).
- [DA VERIFICARE] Il sito attuale su Railway ha già un endpoint per i contatti?

## Decisioni richieste

- **Utente o cliente**: opzione A, B o C. Per C, la data entro cui attivare A o B.
- **Utente**: provider dell'email (Scaleway, Brevo o SMTP del cliente) e accesso al DNS per SPF e DKIM.
- **seo-technical e web-performance-specialist**: parere sulla coerenza con l'hosting di produzione, quando sarà scelto (ADR 001).
