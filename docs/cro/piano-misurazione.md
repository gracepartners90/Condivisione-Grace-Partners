---
titolo: Piano di misurazione
owner: cro-specialist
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/cro/strategia-conversione.md, src/scripts/form.ts, src/scripts/video.ts, src/scripts/immersive.ts, src/scripts/header.ts, src/data/site.ts]
---

# Piano di misurazione

> **In breve**
> - **Al lancio nessun analytics e nessun banner: confermato, a otto condizioni (§1).** L'informativa privacy e la cookie policy servono comunque.
> - Il markup nasce con gli attributi `data-*` già al loro posto e con una funzione `track()` che scrive solo in `window.dataLayer`, in memoria: nessuna richiesta di rete, nessuno storage. Quando si sceglierà uno strumento, basterà aggiungere un adattatore.
> - Anche senza analytics si misura ciò che conta davvero: le richieste ricevute per pagina e per prodotto, e come vanno a finire (registro delle richieste, §2).
> - Per attivare un analytics serve prima un ADR. Le strade sono due: uno strumento privacy-first configurato in modo da non richiedere consenso [DA VERIFICARE], oppure GA4 con un banner conforme al Garante e Consent Mode v2 in modalità Basic (§8).

## 1. Al lancio: niente tracciamento, niente banner

**Confermo, con una precisazione.** Secondo le linee guida del Garante del 10 giugno 2021, il banner serve solo se si usano cookie o altri strumenti di tracciamento non tecnici. Con i soli cookie tecnici, o senza cookie, basta l'informativa. La cookie policy prevista dal brief resta e dichiara che cosa c'è e che cosa non c'è.

La premessa regge solo se **tutte** queste condizioni sono vere:

| # | Condizione | Stato nel codice al 2026-09-28 |
|---|---|---|
| 1 | Nessuno script di analytics, pixel, heatmap, registrazione di sessione o test A/B | rispettata: nessuno presente |
| 2 | Font self-hosted, niente Google Fonts da CDN (trasmetterebbe l'IP del visitatore a Google) | rispettata: nessun riferimento; va mantenuta |
| 3 | Nessun contenuto di terze parti che imposti cookie al caricamento: mappe incorporate, YouTube, Vimeo, widget social | rispettata. La sede su /contatti è un **link** a Maps, non una mappa incorporata |
| 4 | Anteprime immersive dietro una facade, cioè l'iframe si carica solo al clic. **Prima di attivarle**, verificare quali cookie impostano i portali incorporati. Se impostano cookie non tecnici ci sono tre strade: disattivarli nella versione incorporata (i portali sono di ITnode), mostrare un avviso e trattare l'anteprima come contenuto soggetto a consenso, oppure rinunciare all'iframe e usare schermata e nuova scheda | la facade c'è già in `immersive.ts`. La verifica dei cookie è [DA FARE da una rete che raggiunga i portali] |
| 5 | Video servito da un'infrastruttura che non imposta cookie. Oggi arriva da `itnode-website-production.up.railway.app`: meglio servirlo dallo stesso dominio o dalla stessa CDN del sito, anche per la performance (da concordare con web-performance-specialist). Se resta dov'è, va citato nell'informativa | da decidere |
| 6 | Servizio del form senza cookie né script di tracciamento; Turnstile spento, oppure acceso ma senza pre-clearance | da verificare nell'ADR sull'endpoint |
| 7 | Cookie dell'hosting o della CDN solo tecnici (per esempio la protezione dai bot), elencati nella cookie policy | hosting da decidere |
| 8 | `localStorage` e `sessionStorage` usati solo per funzioni tecniche: nessun salvataggio di UTM o identificativi | rispettata |

La verifica prima del go-live si fa con Playwright (§9, test 1).

## 2. Cosa si misura comunque, senza cookie

| Fonte | Cosa fornisce | Note |
|---|---|---|
| Endpoint del form | richieste valide per pagina (`_page`) e per interesse; spam in quarantena | il payload contiene solo i campi del form, `_page` e `_elapsed_ms`, nessun dato di navigazione |
| **Registro delle richieste** (foglio condiviso o CRM) | per ogni contatto: data, canale (form, telefono, email), pagina o form, interesse, tipo di richiedente (impresa o ente), città, esito (qualificato, offerta inviata, contratto), valore [DA FORNIRE] | è la misura che conta davvero. Lo compila chi gestisce le richieste |
| Google Search Console | impressioni, clic e query da Google | nessun tag sul sito (verifica via DNS). Owner: seo-technical |
| Statistiche aggregate dell'hosting (facoltative) | visite approssimative, senza alcuno script | includono i bot: danno solo un ordine di grandezza |

Il limite va detto chiaramente: senza analytics non si costruisce una baseline del comportamento (conversione per pagina, clic in uscita, video). Ogni settimana senza strumento è una settimana di baseline persa. Consiglio di decidere entro il primo mese dal lancio (§8).

## 3. KPI

| Livello | KPI | Definizione | Fonte al lancio | Fonte con analytics |
|---|---|---|---|---|
| Business | Richieste qualificate al mese, per prodotto | richieste ritenute pertinenti da chi le gestisce | registro | registro |
| Business | Da richiesta a offerta a contratto | tassi di passaggio tra le tre fasi | registro | registro |
| Conversione | Richieste inviate dal form | `form_submit` per `form_id` | endpoint | analytics |
| Conversione | Contatti diretti | `contact_click`: indica un'intenzione, non una conversione certa | — | analytics |
| Conversione | Tasso di conversione per pagina | `form_submit` / visite della pagina | — | analytics |
| Diagnosi | Completamento del form | `form_submit` / `form_start`; errori per campo da `form_error` | — | analytics |
| Diagnosi | Raggiungimento del form | `form_view` / visite della pagina | — | analytics |
| Micro | Prova del prodotto | `outbound_click` di tipo `esperienza` e `preview_start` su /siii | — | analytics |
| Micro | Interesse per i portali | `outbound_click` di tipo `portale` e `portale-citta` | — | analytics |
| Micro | Video | `video_progress` al 50% / `video_start` | — | analytics |
| Salute | Errori d'invio | `form_error` di tipo `rete`, `timeout` o `server`; obiettivo: zero | log dell'endpoint | analytics |
| Salute | Tempo di prima risposta | ore tra la richiesta e il primo contatto | registro | registro |

Nessun target numerico finché non arrivano i dati di business [DA FORNIRE]. Proposta: fissarli dopo 8–12 settimane di dati.

## 4. Tassonomia degli eventi

**Convenzioni**
- Nomi degli eventi in `snake_case`, nella forma oggetto_azione.
- Chiavi dei parametri in `snake_case`, in inglese.
- **Valori in kebab-case**, coerenti con gli slug e con i valori di `interesse` già presenti in `site.ts` (`siii`, `puglia-digitale`, `citta-digitali`).
- `page_type` si aggiunge in automatico a ogni evento.
- **Nessun dato personale negli eventi**: mai il contenuto dei campi, mai email o telefono dell'utente. Si inviano solo nomi di campo e valori da elenchi chiusi.

| Priorità | Evento | Quando | Parametri | Conversione |
|---|---|---|---|---|
| P1 | `cta_click` | clic su una CTA interna (verso una pagina o un'ancora) | `cta_id`, `cta_location`, `cta_text`, `link_url`, `interest` (se pertinente) | — |
| P1 | `outbound_click` | clic verso un altro dominio | `cta_id`, `cta_location`, `outbound_type`, `destination_id`, `link_url`, `link_domain` | micro, se di tipo `esperienza` |
| P1 | `contact_click` | clic su `tel:` o `mailto:`, compresa la bozza email del fallback | `cta_id`, `cta_location`, `contact_method`; **mai `link_url`**, perché la bozza email contiene i dati dell'utente | **sì, secondaria** |
| P1 | `form_view` | form visibile almeno al 50%, una volta per pagina | `form_id`, `interest_preselected` | — |
| P1 | `form_start` | primo `input` o `change` in un campo visibile | `form_id`, `interest_preselected` | — |
| P1 | `form_submit` | **risposta 2xx dell'endpoint**, non il clic sul bottone | `form_id`; `interest` (le opzioni selezionate, ordinate e separate da virgola); `optional_fields` (i campi facoltativi compilati, per esempio `telefono,messaggio`) | **sì, principale** |
| P1 | `form_error` | errore di validazione o di invio | `form_id`, `error_type` (`validazione`, `rete`, `timeout`, `server`, `spam`, `endpoint-assente`), `error_fields` (nomi dei campi), `http_status` (solo per `server`) | — |
| P2 | `video_start` | primo avvio | `video_id`, `video_title`, `video_trigger` (`autoplay`, `utente`) | — |
| P2 | `video_progress` | al 25, 50 e 75%, una volta ciascuno | `video_id`, `video_percent` | — |
| P2 | `video_complete` | fine del video (`ended`) | `video_id` | — |
| P2 | `video_unmute` | l'utente attiva l'audio. Con l'autoplay muto è questo il vero segnale d'interesse | `video_id`, `video_current_time` | — |
| P2 | `preview_start` | clic su «Avvia l'anteprima», cioè caricamento dell'iframe | `experience_id`, `cta_location` | micro |
| P3 | `section_view` | una sezione chiave visibile almeno al 50%, una volta | `section_id` | — |
| P3 | `nav_click` | clic su una voce di menu o del footer | `nav_item`, `nav_location` (`header`, `menu-mobile`, `footer`) | — |
| P3 | `menu_open` | apertura del menu mobile | — | — |
| auto | `page_view` | lo gestisce lo strumento | `page_type` | — |

Gli eventi video riprendono i nomi di GA4 (`video_start`, `video_progress`, `video_complete`, `video_percent`), così i report restano compatibili se si sceglie GA4.

## 5. Attributi `data-*` da predisporre nel markup

| Dove | Attributo | Valori |
|---|---|---|
| `<body>` | `data-page-type` | `home`, `siii`, `puglia-digitale`, `citta-digitali`, `contatti`, `legale`, `404` |
| CTA, link, bottoni | `data-track` | `cta_click`, `outbound_click`, `contact_click`, `nav_click` |
| | `data-cta-id` | schema `<pagina>-<sezione>-<azione>`; l'elenco completo è nella strategia di conversione, §3–4 |
| | `data-cta-location` | `header`, `menu-mobile`, `hero`, `capitolo`, `sezione`, `showcase`, `luoghi`, `citta`, `chiusura`, `form`, `contatti`, `footer`, `404` |
| | `data-interest` (facoltativo) | `siii`, `puglia-digitale`, `citta-digitali` |
| Link esterni | `data-outbound-type` | `esperienza`, `portale`, `portale-citta`, `social`, `mappa` |
| | `data-destination-id` | `masseria-santella`, `maison-mimina`, `dl-natura-dentro`, `lapugliadigitale`, `cittadigitali`, `acquaviva`, `gravina`, `monopoli`, `varese`, `altamura`, `caltanissetta`, `linkedin-fondatore`, `mappa-sede` |
| `tel:` e `mailto:` | `data-contact-method` | `telefono`, `mobile`, `email`; `whatsapp` se si attiva quel canale |
| `form[data-contact-form]` | `data-form-id` | `richiesta-siii`, `richiesta-puglia-digitale`, `richiesta-citta-digitali`, `richiesta-contatti` |
| `[data-video]` | `data-video-id`, `data-video-title` | `citta-digitali`, «Città Digitali» |
| `[data-immersive]` | `data-experience-id` | gli stessi valori di `destination_id` usati per le esperienze |
| Sezioni chiave (P3) | `data-section-id` | per esempio `siii-confronto`, `siii-esempi`, `pd-numeri`, `pd-perche-aderire`, `cd-video`, `home-fondatore` |
| Voci di menu (P3) | `data-nav-item` | lo slug della pagina |

Esempio:

```html
<body data-page-type="siii">
  <a href="#richiesta" data-track="cta_click" data-cta-id="header-parliamone" data-cta-location="header">Parliamone</a>

  <a href="https://www.cassanodigitale.it/masseriasantella/" target="_blank" rel="noopener"
     data-track="outbound_click" data-cta-id="siii-showcase-masseria-santella" data-cta-location="showcase"
     data-outbound-type="esperienza" data-destination-id="masseria-santella">
    Entra nell'esperienza<span class="visually-hidden"> Masseria Santella (si apre in una nuova scheda)</span><span aria-hidden="true"> ↗</span>
  </a>

  <a href="tel:+390802466520" data-track="contact_click" data-cta-id="contatti-telefono"
     data-cta-location="contatti" data-contact-method="telefono">+39 080 2466520</a>

  <form data-contact-form data-form-id="richiesta-siii" data-endpoint="" action="" method="post">…</form>
</body>
```

## 6. Regole di implementazione

1. **`src/scripts/track.ts`** espone `track(event, params)`, che aggiunge `page_type` ed esegue `(window.dataLayer ||= []).push({ event, ...params })`. Con `?debug_tracking` nell'URL scrive anche in console. Al lancio l'array resta in memoria: nessuna richiesta di rete, nessuno storage.
2. **Un solo listener delegato**: un `click` su `document` che risale con `closest('[data-track]')`. Legge il `dataset`, converte le chiavi da camelCase a snake_case e aggiunge `link_url`, `link_domain` e `cta_text` (il testo visibile ripulito, al massimo 100 caratteri). Per `contact_click` non aggiunge `link_url`. Non blocca mai la navigazione.
3. **Hook negli script esistenti**
   - `form.ts`:
     - `form_view`, con un IntersectionObserver;
     - `form_start`, al primo input;
     - `form_submit`, dopo `response.ok`;
     - `form_error`, con `error_type` ricavato dal caso: riepilogo di validazione → `validazione`; honeypot → `spam`; endpoint vuoto → `endpoint-assente`; `AbortError` → `timeout`; `TypeError` → `rete`; `HTTP 4xx/5xx` → `server`, con `http_status`.
   - `video.ts`:
     - `video_start` al primo `play`, con `autoplay` se il video è partito in muto dall'IntersectionObserver;
     - `video_progress` su `timeupdate`;
     - `video_complete` su `ended`;
     - `video_unmute` dal bottone dell'audio.
   - `immersive.ts`: `preview_start` nel click del trigger.
   - `header.ts`: `menu_open` (priorità P3).
4. **Niente doppi conteggi.** Se si attiva GA4, nella «misurazione avanzata» vanno spenti «Clic in uscita» e «Interazioni con i moduli»: li sostituiscono i nostri eventi.
5. **Nessun dato personale negli URL**: nessun campo del form in query string o nei redirect.
6. **`rel="noopener"` senza `noreferrer`** sui link ai portali (strategia di conversione, §2).

## 7. Convenzioni UTM

- Tutto minuscolo, parole separate da `-`. Mai UTM sui link interni a itnode.it.
- `utm_source`: `linkedin`, `newsletter`, `lapugliadigitale`, `cittadigitali`, `<città>digitale` (per esempio `monopolidigitale`), `evento-<nome>`, `brochure`.
- `utm_medium`: `social`, `email`, `referral`, `qr`, `cpc`, `print`.
- `utm_campaign`: `aaaa-mm-<nome>`, per esempio `2026-10-lancio-sito`.
- `utm_content`: la posizione del link, per esempio `footer-credit` o `post-<id>`.

Usi tipici:
- QR code a eventi e su brochure: `/contatti?interesse=puglia-digitale&utm_source=evento-<nome>&utm_medium=qr&utm_campaign=…`.
- Link «Realizzato da ITnode» dai portali e dalle esperienze verso itnode.it: `utm_medium=referral&utm_source=<portale>&utm_content=<posizione>` [DA VERIFICARE che questi link esistano].

In GA4 i medium `qr` e `print` richiedono un gruppo di canali personalizzato, altrimenti finiscono in «Unassigned».

## 8. Quando si attiva un analytics

**Prima si registra un ADR** in `docs/decisioni/`. Owner: cro-specialist, insieme a web-performance-specialist per il peso degli script e l'effetto sull'INP.

| Opzione | Pro | Contro |
|---|---|---|
| A. Strumento privacy-first (per esempio Matomo, in cloud UE o self-hosted, o un altro strumento senza cookie con server nell'UE), configurato secondo le condizioni con cui il Garante assimila gli analytics ai cookie tecnici: solo statistiche aggregate, un solo sito, IP mascherato almeno nel quarto ottetto, nessun incrocio né cessione dei dati, vincoli contrattuali con il fornitore | niente banner; dati completi, senza perdite per chi rifiuta; script leggeri | nessuna integrazione con Google Ads. L'assimilazione ai tecnici degli strumenti senza cookie va confermata dal consulente [DA VERIFICARE] |
| B. GA4, ed eventualmente Google Ads | gratuito; integrazione con Ads e Search Console | banner obbligatorio; si perdono i dati di chi rifiuta; script più pesanti; trasferimento di dati negli USA, che richiede DPA e una base per il trasferimento (DPF) |

**Se si sceglie B, serve tutto questo:**
1. **CMP e banner conformi alle linee guida del Garante**
   - La X chiude il banner e lascia attivi solo i cookie tecnici.
   - «Rifiuta» è evidente quanto «Accetta».
   - Le scelte granulari stanno al secondo livello.
   - Lo scroll non vale come consenso e non ci sono cookie wall.
   - Il banner non si ripropone prima di 6 mesi, salvo cambiamenti.
   - I consensi vengono registrati.
   - Nel footer c'è un link permanente «Preferenze cookie», perché revocare deve essere facile quanto accettare.
   - La CMP è compatibile con Consent Mode v2, preferibilmente tra quelle certificate da Google.
2. **Consent Mode v2 in modalità Basic**: nessun tag Google si carica prima del consenso, come richiede la regola di progetto «nessun tag non tecnico prima del consenso».
   - Default `denied` per `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization`; `security_storage` a `granted`; aggiornamento quando l'utente sceglie.
   - Mappatura delle categorie: «Statistiche» → `analytics_storage`; «Marketing» → `ad_storage`, `ad_user_data`, `ad_personalization`.
   - La modalità Advanced, che invia ping senza cookie prima del consenso, non conviene. La modellazione comportamentale di GA4 funziona solo con l'implementazione Advanced e richiede almeno 1.000 eventi al giorno con consenso negato per almeno 7 giorni, più almeno 1.000 utenti al giorno con consenso concesso in almeno 7 dei 28 giorni precedenti: soglie verosimilmente fuori portata per questo sito [IPOTESI sul traffico, DA FORNIRE].
3. **Configurazione di GA4**
   - Conservazione dei dati a 14 mesi.
   - Google Signals e personalizzazione degli annunci spenti, salvo campagne Ads.
   - Filtri per il traffico interno e degli sviluppatori.
   - Dimensioni personalizzate per i parametri del §4.
   - `form_submit` come evento chiave (`contact_click` eventualmente come secondario).
   - Nessun dato personale.
4. **Google Ads**, solo se si fanno campagne: i segnali `ad_user_data` e `ad_personalization` servono per le funzioni di misurazione e remarketing sugli utenti del SEE. `form_submit` si importa come conversione.
5. **Aggiornare** informativa privacy e cookie policy: strumenti, finalità, durata, trasferimenti.
6. **Adattatore**: uno script che legge `window.dataLayer`, o si aggancia a `track()`, e inoltra gli eventi allo strumento. Con l'opzione B si carica solo dopo il consenso; con l'opzione A subito.
7. **Verifica** con Playwright (§9, test 5) prima della pubblicazione.

## 9. Verifiche con Playwright

Li scrivo io appena la build è pronta.
1. **Nessun tracciamento al lancio.** Per ogni pagina: contesto pulito, caricamento, scroll fino in fondo. Nessun cookie, o solo i tecnici elencati nella policy. Nessuna richiesta verso domini fuori dall'allowlist, che comprende il sito, l'host del video e l'endpoint (quest'ultimo solo all'invio).
2. **Markup**
   - Ogni `a[href^="http"]` esterno ha `data-track="outbound_click"`, `target="_blank"` e un `rel` che contiene `noopener` ma non `noreferrer`.
   - Ogni `tel:` e `mailto:` ha `data-track="contact_click"`.
   - Ogni `[data-track]` ha `data-cta-id` e `data-cta-location`.
   - `<body>` ha `data-page-type`.
3. **Eventi**: il clic su ogni elemento tracciato produce in `window.dataLayer` l'evento giusto, con i parametri obbligatori e **senza dati personali**.
4. **Form**
   - Endpoint vuoto: l'avviso è visibile prima dei campi; all'invio non parte alcuna richiesta di rete; viene registrato `form_error` con `error_type` `endpoint-assente`.
   - Endpoint simulato con `page.route`, risposta 200: compare il pannello di successo con il focus e viene registrato `form_submit`.
   - Risposta 500: messaggio d'errore, dati conservati, `form_error` di tipo `server`.
   - Nessuna risposta entro 15 s: `form_error` di tipo `timeout`.
   - Preselezione corretta su /siii, /puglia-digitale, /citta-digitali e su `/contatti?interesse=citta-digitali`.
5. **Dopo l'attivazione** (opzione B): nessuna richiesta a domini Google prima del consenso; nessuna nemmeno dopo «Rifiuta» o la X; dopo «Accetta», eventi con i parametri giusti.

## 10. Sperimentazione

Al lancio i test A/B non hanno senso. La dimensione del campione per variante è circa n ≈ 16·p(1−p)/Δ², con potenza dell'80% e α = 0,05. Con una conversione del 2% e un miglioramento del 25% (Δ = 0,5 punti percentuali) servono circa 12.500 visite per variante, cioè circa 25.000 visite della pagina [IPOTESI: per un sito B2B di nicchia sono probabilmente molti mesi di traffico; traffico reale DA FORNIRE].

Si parte con metodi qualitativi:
- cinque test moderati con titolari di PMI pugliesi;
- il feedback di chi gestisce le richieste (domande ricorrenti, obiezioni);
- l'analisi degli errori del form.

Il backlog degli esperimenti si apre dopo il lancio, in `docs/cro/backlog-esperimenti.md`.

## 11. Fonti
- Garante per la protezione dei dati personali, [Linee guida cookie e altri strumenti di tracciamento, 10 giugno 2021](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876) e [FAQ sui cookie](https://www.garanteprivacy.it/faq/cookie). Il sito del Garante è bloccato dall'ambiente: il contenuto è stato verificato il 2026-09-28 attraverso i risultati di ricerca e due sintesi, [Filodiritto](https://www.filodiritto.com/i-cookie-nuove-linee-guida-dal-garante) e [Cyber Security 360](https://www.cybersecurity360.it/legal/privacy-dati-personali/utilizzo-dei-cookie-analitici-e-consenso-degli-interessati-ecco-le-regole).
- Google, [Consent mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode) e [Behavioral modeling for consent mode](https://support.google.com/analytics/answer/11161109), per le soglie di idoneità alla modellazione. Consultati il 2026-09-28 attraverso i risultati di ricerca.
- Cloudflare, [Turnstile, pre-clearance](https://developers.cloudflare.com/turnstile/get-started/pre-clearance/): il cookie `cf_clearance` viene impostato solo con la pre-clearance attiva. Consultato il 2026-09-28.
- Codice esistente letto il 2026-09-28: `src/scripts/form.ts`, `video.ts`, `immersive.ts`, `header.ts`, `src/data/site.ts`, `astro.config.mjs`.

## Ipotesi da validare
- Il traffico del sito non basta per test A/B né per la modellazione di Consent Mode (§8, §10).
- I portali e le esperienze SIII non impostano cookie non tecnici quando vengono incorporati come anteprima.
- Esistono link «Realizzato da ITnode» dai portali verso itnode.it.

## Domande aperte
- [DA FORNIRE] Traffico e richieste del sito attuale, e lo strumento di analytics in uso oggi, se c'è.
- [DA FORNIRE] Chi tiene il registro delle richieste, e se esiste già un CRM.
- [DA FORNIRE] Il cliente prevede campagne Google Ads? Da questo dipende la scelta tra le opzioni A e B.
- [DA VERIFICARE] Cookie impostati dai portali e dalle esperienze: servono una verifica da una rete non bloccata o un export dal cliente.
- [DA VERIFICARE, con il consulente privacy] Uno strumento senza cookie è assimilabile ai cookie tecnici? Turnstile va citato nell'informativa?

## Decisioni richieste
1. **Nessun analytics al lancio, nessun banner**: confermare, alle condizioni del §1. Decide il cliente.
2. **Strumento di analytics**, opzione A o B, con un ADR entro il primo mese dal lancio. Decide il cliente; owner cro-specialist, insieme a web-performance-specialist.
3. **Hosting del video** (stesso dominio o CDN invece di railway.app). Decidono web-performance-specialist e la sessione principale.
4. **Anteprime immersive con iframe**: attivarle solo dopo la verifica dei cookie (§1, condizione 4). Decidono sessione principale e cliente.
