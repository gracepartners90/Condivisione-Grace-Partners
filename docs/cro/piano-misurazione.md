---
titolo: Piano di misurazione
owner: cro-specialist
contributi: []
stato: bozza
versione: 0.4
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/cro/strategia-conversione.md, docs/review/2026-09-28-sito-conversione-cro-specialist.md, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md, docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, docs/decisioni/005-preload-del-font.md, docs/performance/budget.md, src/scripts/track.ts, src/scripts/form.ts, src/scripts/video.ts, src/scripts/immersive.ts, src/scripts/header.ts, src/data/site.ts, src/components/sections/LocationShowcase.astro, inventario degli attributi data-* nelle build del 2026-09-28 e del 2026-10-05]
---

# Piano di misurazione

> **In breve**
> - **Al lancio nessun analytics e nessun banner: confermato, a otto condizioni (§1).** L'informativa privacy e la cookie policy servono comunque.
> - Il markup nasce con gli attributi `data-*` già al loro posto e con una funzione `track()` che scrive solo in `window.dataLayer`, in memoria: nessuna richiesta di rete, nessuno storage. Quando si sceglierà uno strumento, basterà aggiungere un adattatore.
> - Anche senza analytics si misura ciò che conta davvero: le richieste ricevute per pagina e per prodotto, e come vanno a finire (registro delle richieste, §2).
> - Per attivare un analytics serve prima un ADR. Le strade sono due: uno strumento privacy-first configurato in modo da non richiedere consenso [DA VERIFICARE], oppure GA4 con un banner conforme al Garante e Consent Mode v2 in modalità Basic (§8).
> - **v0.2 (2026-09-28): tassonomia allineata al codice.** `data-cta-location` ha un elenco chiuso di 15 valori, tutti già usati nella build (§5.1): a quella data, **nessuna rinomina da fare nel codice**. `showcase`, `citta` e `contatti` escono dall'elenco. `form_view` ha la nuova definizione e `preview_start` è sospeso (§4).
> - **RUM delle prestazioni con `web-vitals`: sì, dopo il lancio e senza banner, ma solo alle dieci condizioni del §8.1**, compresa la conferma del consulente privacy. Se il consulente chiede il consenso, no.
> - **v0.3 e 0.4 (2026-10-05).**
>   - Nuovo link «Tutte le città sul portale ↗» su /citta-digitali/: `cta_id` e tipo confermati. `cta_location` corretto da `portale` a `luoghi`, la sezione in cui sta: applicato nel codice e verificato sulla build (§5.1).
>   - I domini arrivano agli eventi in punycode: **report e segmenti sui portali filtrano su `destination_id`**, non sul dominio (§4).
>   - Le etichette UTM dei portali diventano gli slug di `destination_id` (§7).

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
| 6 | Servizio del form senza cookie né script di tracciamento; Turnstile spento, oppure acceso ma senza pre-clearance | requisiti e opzioni nell'ADR 006 (proposta, `docs/decisioni/006-endpoint-del-form.md`) |
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
| Micro | Prova del prodotto | `outbound_click` di tipo `esperienza-siii` su /siii (al lancio non ci sono anteprime in iframe) | — | analytics |
| Micro | Interesse per i portali | `outbound_click` di tipo `portale` e `portale-luogo`, contati per `destination_id` | — | analytics |
| Micro | Video | `video_progress` al 50% / `video_start` | — | analytics |
| Salute | Errori d'invio | `form_error` di tipo `rete`, `timeout` o `server`; obiettivo: zero | log dell'endpoint | analytics |
| Salute | Tempo di prima risposta | ore tra la richiesta e il primo contatto | registro | registro |
| Salute | Prestazioni reali | LCP, INP e CLS al 75° percentile, per `page_type` e classe di dispositivo | — | RUM, se approvato (§8.1) |

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
| P1 | `outbound_click` | clic verso un altro dominio | `cta_id`, `cta_location`, `outbound_type`, `destination_id`, `link_url`, `link_domain` | micro, se di tipo `esperienza-siii` |
| P1 | `contact_click` | clic su `tel:` o `mailto:`, compresa la bozza email del fallback | `cta_id`, `cta_location`, `contact_method`; **mai `link_url`**, perché la bozza email contiene i dati dell'utente | **sì, secondaria** |
| P1 | `form_view` | form visibile almeno al 50%, **oppure** che occupa almeno metà dell'altezza dello schermo; una volta per pagina. La seconda condizione serve sugli schermi bassi, dove un form alto circa 1.300 px non arriva mai al 50% | `form_id`, `interest_preselected` | — |
| P1 | `form_start` | primo `input` o `change` in un campo visibile | `form_id`, `interest_preselected` | — |
| P1 | `form_submit` | **risposta 2xx dell'endpoint**, non il clic sul bottone | `form_id`; `interest` (le opzioni selezionate, ordinate e separate da virgola); `optional_fields` (i campi facoltativi compilati, per esempio `telefono,messaggio`) | **sì, principale** |
| P1 | `form_error` | errore di validazione o di invio | `form_id`, `error_type` (`validazione`, `rete`, `timeout`, `server`, `spam`, `endpoint-assente`), `error_fields` (nomi dei campi), `http_status` (solo per `server`) | — |
| P2 | `video_start` | primo fotogramma riprodotto (`playing`), una volta. Non `play`, che scatta anche quando il file poi non si carica | `video_id`, `video_title`, `video_trigger` (`autoplay`, `utente`) | — |
| P2 | `video_progress` | al 25, 50 e 75%, una volta ciascuno | `video_id`, `video_percent` | — |
| P2 | `video_complete` | al 97% della durata, una volta. Il video è in loop, quindi `ended` non scatta | `video_id` | — |
| P2 | `video_unmute` | l'utente attiva l'audio. Con l'autoplay muto è questo il vero segnale d'interesse | `video_id`, `video_current_time` | — |
| sospeso | `preview_start` | clic su «Avvia l'anteprima», cioè caricamento dell'iframe. **Al lancio non parte mai**: nessuna pagina include `immersive.ts`. Torna se dopo il lancio si attiva l'anteprima «Prova qui» (verdetto G4, §5.2), con `cta_location` `esempi` | `experience_id`, `cta_location` | micro |
| P3 | `section_view` | una sezione chiave visibile almeno al 50%, una volta. Non predisposto al lancio | `section_id` | — |
| P3 | `nav_click` | clic su una voce di menu o del footer | `nav_item`, `nav_location` (`header`, `menu-mobile`, `footer`) | — |
| P3 | `menu_open` | apertura del menu mobile | — | — |
| auto | `page_view` | lo gestisce lo strumento | `page_type` | — |

Gli eventi video riprendono i nomi di GA4 (`video_start`, `video_progress`, `video_complete`, `video_percent`), così i report restano compatibili se si sceglie GA4.

**Domini nei report: si filtra su `destination_id`** (review di seo-technical del 2026-10-05, oss. 6).
- `link_url` e `link_domain` vengono da `el.href` e `el.hostname`, che il browser restituisce sempre in ASCII. Un dominio con caratteri accentati arriva in punycode: cittàdigitali.it diventa `xn--cittdigitali-19a.it`. Verificato con un clic sulla build del 2026-10-05: `"link_domain":"xn--cittdigitali-19a.it"`.
- Un filtro su `cittàdigitali.it`, o su `cittadigitali.it` (senza accento, il dominio di un progetto omonimo di altri), non troverebbe nulla.
- **Regola.** Report, segmenti, esplorazioni e conversioni sui portali si costruiscono su `destination_id` (`citta-digitali`, `puglia-digitale`, gli slug delle città), presente su ogni `outbound_click`, e su `outbound_type`. Il dominio si usa solo per un controllo puntuale, e in punycode.
- Lo slug resta stabile anche se un dominio cambia o viene corretto, come è successo per Città Digitali.

## 5. Attributi `data-*` da predisporre nel markup

| Dove | Attributo | Valori |
|---|---|---|
| `<body>` | `data-page-type` | `home`, `siii`, `puglia-digitale`, `citta-digitali`, `contatti`, `legale`, `404` |
| CTA, link, bottoni | `data-track` | `cta_click`, `outbound_click`, `contact_click`, `nav_click` |
| | `data-cta-id` | schema `<pagina>-<sezione>-<azione>`; l'elenco completo è nella strategia di conversione, §3–4. È una **chiave stabile**: non si interpreta e non si rinomina dopo il lancio. La sezione, nei report, si legge da `cta_location` |
| | `data-cta-location` | **elenco chiuso di 15 valori, §5.1** |
| | `data-interest` (facoltativo) | `siii`, `puglia-digitale`, `citta-digitali` |
| Link esterni | `data-outbound-type` | `esperienza-siii`, `portale`, `portale-luogo`, `social`, `mappa` |
| | `data-destination-id` | `masseria-santella`, `maison-mimina`, `dl-natura-dentro`, `puglia-digitale`, `citta-digitali`, `acquaviva`, `gravina`, `monopoli`, `varese`, `altamura`, `caltanissetta`, `linkedin-fondatore`, `google-maps` |
| `tel:` e `mailto:` | `data-contact-method` | `telefono` (il fisso), `cellulare`, `email`; `whatsapp` se si attiva quel canale |
| `form[data-contact-form]` | `data-form-id` | `richiesta-siii`, `richiesta-puglia-digitale`, `richiesta-citta-digitali`, `richiesta-contatti` |
| `[data-video]` | `data-video-id`, `data-video-title` | `citta-digitali`, «Città Digitali» |
| `[data-immersive]` | `data-experience-id` | sospeso con `preview_start`: gli stessi valori di `destination_id` usati per le esperienze |
| Sezioni chiave (P3) | `data-section-id` | non predisposto al lancio. Per esempio `siii-confronto`, `siii-esempi`, `pd-numeri`, `pd-perche-aderire`, `cd-video`, `home-fondatore` |
| Voci di menu (P3) | `data-nav-item`, `data-nav-location` | lo slug della pagina (`home`, `siii`, `puglia-digitale`, `citta-digitali`, `contatti`); `header`, `menu-mobile`, `footer` |

Esempio:

```html
<body data-page-type="siii">
  <a href="#richiesta" data-track="cta_click" data-cta-id="header-parliamone" data-cta-location="header">Parliamone</a>

  <a href="https://www.cassanodigitale.it/masseriasantella/" target="_blank" rel="noopener"
     data-track="outbound_click" data-cta-id="siii-showcase-masseria-santella" data-cta-location="esempi"
     data-outbound-type="esperienza-siii" data-destination-id="masseria-santella">
    Entra nell'esperienza<span class="sr-only"> di Masseria Santella (si apre in una nuova scheda)</span><!-- Arrow: inline SVG, aria-hidden -->
  </a>
</body>

<body data-page-type="contatti">
  <a href="tel:+390802466520" data-track="contact_click" data-cta-id="contatti-telefono"
     data-cta-location="recapiti" data-contact-method="telefono">+39 080 2466520</a>

  <form data-contact-form data-form-id="richiesta-contatti" data-endpoint="" action="" method="post">…</form>
</body>
```

### 5.1 Valori di `data-cta-location`

`cta_location` dice **in che tipo di sezione** sta l'elemento; `page_type` dice in quale pagina. Insieme danno la posizione: per esempio `hero` su `siii`. L'elenco è chiuso: un valore nuovo si aggiunge prima qui, poi nel codice, e il test 2 del §9 fallisce sui valori fuori elenco.

Inventario della build del 2026-10-05 (commit `ce276be`): 155 elementi tracciati con `data-cta-location`, esclusi i `nav_click`, su 8 pagine, con i 15 valori dell'elenco e nessuno fuori elenco. L'unica novità rispetto al 2026-09-28 è il link `cd-portale-tutte-le-citta`. Era uscito con `portale` ed è stato corretto in `luoghi` (in fondo a questo paragrafo).

| Valore | Dove | `cta_id` | Pagine |
|---|---|---|---|
| `header` | «Parliamone» nella barra | `header-parliamone` | tutte |
| `menu-mobile` | menu a schermo intero: Parliamone, telefono, email | `menu-mobile-parliamone`, `menu-mobile-telefono`, `menu-mobile-email` | tutte |
| `hero` | CTA della hero | `siii-hero-esempi`, `siii-hero-offerta`, `pd-hero-portale`, `pd-hero-richiesta`, `cd-hero-portale`, `cd-hero-richiesta` | SIII, PD, CD |
| `capitolo` | i tre capitoli della Home | `home-capitolo-siii`, `home-capitolo-puglia-digitale`, `home-capitolo-citta-digitali` | Home |
| `benefici` | CTA dopo i benefici | `siii-benefici-offerta` | SIII |
| `esempi` | le tre esperienze, sezione `#esempi` | `siii-showcase-masseria-santella`, `siii-showcase-maison-mimina`, `siii-showcase-dl-natura-dentro` | SIII |
| `luoghi` | città con il loro portale: «I luoghi» su PD; «L'Italia in un unico portale» (`#portale`) su CD, compreso il link «Tutte le città sul portale» | `pd-luoghi-gravina`, `pd-luoghi-acquaviva`, `pd-luoghi-monopoli`, `cd-citta-varese`, `cd-citta-altamura`, `cd-citta-caltanissetta`, `cd-portale-tutte-le-citta` | PD, CD |
| `sezione` | link nel testo di una sezione | `home-fondatore-linkedin`, `pd-progetto-portale`, `legale-email` | Home, PD, pagine legali |
| `chiusura` | chiusura con CTA e recapiti | `home-chiusura-parliamone`, `home-chiusura-email`, `home-chiusura-telefono` | Home. Su SIII, PD e CD la chiusura è il form: nessun bottone |
| `form` | ogni link dentro il componente del form: avviso, telefono sotto il form, pannelli di successo, errore e ripiego | `<form_id>-avviso-email`, `<form_id>-ripiego-bozza-email`, `<form_id>-successo-portale` e gli altri della strategia, §4 | SIII, PD, CD, Contatti |
| `recapiti` | canali diretti di Contatti: telefono, cellulare, email, mappa, LinkedIn | `contatti-telefono`, `contatti-mobile`, `contatti-email`, `contatti-mappa`, `contatti-linkedin` | Contatti |
| `persona` | sezione Persona di Contatti: «Scopri il suo percorso →» verso `/#fondatore` | `contatti-persona-percorso` | Contatti |
| `portali` | blocco dei portali di Contatti | `contatti-portale-puglia-digitale`, `contatti-portale-citta-digitali` | Contatti |
| `footer` | recapiti e portali nel footer | `footer-telefono`, `footer-email`, `footer-portale-puglia-digitale`, `footer-portale-citta-digitali` | tutte |
| `404` | corpo della pagina 404 | `404-siii`, `404-puglia-digitale`, `404-citta-digitali`, `404-parliamone`, `404-email` | 404 |

**Valori della v0.1 che escono dall'elenco**
- `showcase` → `esempi`: è il nome dell'ancora e della CTA «Esplora gli esempi», ed è italiano come gli altri valori.
- `citta` → `luoghi`: su PD e CD è lo stesso tipo di sezione, e nei report le due pagine si confrontano sulla stessa riga.
- `contatti` → `recapiti`: `contatti` si confonderebbe con `page_type=contatti` e con la voce di menu.

**Dei valori presenti al 2026-09-28 nessuno va rinominato nel codice.** L'unica correzione riguarda il link aggiunto il 2026-10-05, qui sotto. Resta una rinomina facoltativa, in codice oggi non incluso in nessuna pagina: in `src/scripts/immersive.ts`, riga 23, `cta_location: 'showcase'` diventa `'esempi'`. Va fatta solo se si riattiva l'anteprima.

I `cta_id` con la vecchia parola di sezione (`siii-showcase-*`, `cd-citta-*`) restano come sono: sono chiavi, e cambiarle non porta alcun beneficio.

**Link «Tutte le città sul portale ↗» su /citta-digitali/ (dal 2026-10-05)**

Porta alla pagina del portale con l'elenco completo delle città (review di ux-designer del 2026-10-05, §3.2). È una prova dell'estensione della rete. Sta a metà pagina, lontano dal form, e si apre in una nuova scheda: va bene anche per la conversione.

| Attributo | Nel codice | Esito |
|---|---|---|
| `data-track` | `outbound_click` | confermato |
| `data-cta-id` | `cd-portale-tutte-le-citta` | **confermato**: pagina `cd`, sezione `portale` (l'ancora `#portale`), azione `tutte-le-citta`. Unico nel sito |
| `data-cta-location` | `luoghi` (prima `portale`) | **corretto** il 2026-10-05, commit `ce276be` |
| `data-outbound-type` | `portale` | confermato: è una pagina del portale nazionale, non il portale di una città (`portale-luogo`) |
| `data-destination-id` | `citta-digitali` | confermato: è lo stesso valore degli altri 11 link al portale |

Perché `luoghi` e non `portale`:
- **Stessa sezione, stesso valore.** Il link sta in «L'Italia in un unico portale», come le tre città, che hanno `luoghi`. Con `portale` i clic della stessa sezione finirebbero su due righe.
- **Il tipo di destinazione c'è già.** `outbound_type` distingue il portale (`portale`) dai portali delle città (`portale-luogo`), e il `cta_id` distingue il link: non serve un valore di posizione in più.
- **`portale` accanto a `portali`** (Contatti) sarebbero due valori quasi uguali per due cose diverse: nei report si confondono.
- **È la stessa divisione già corretta** per questa sezione nella review di conversione del 2026-09-28 (oss. 6).
- Con `portale` il test 2 del §9 fallisce: il valore è fuori elenco.

**Correzione applicata** dalla sessione principale nel commit `ce276be`. In `src/components/sections/LocationShowcase.astro`, nel link `places__all-link`, il valore scritto a mano è diventato quello della sezione, come per le città dello stesso componente. Sulla pagina vale `luoghi`, che è anche il default.

```diff
-                  data-cta-location="portale"
+                  data-cta-location={location}
```

Provata il 2026-10-05 prima su una copia del codice, poi ricontrollata sulla build del commit `ce276be`: il link esce con `cta_location` `luoghi`. Il payload di un clic, a 390 e a 1440 px, è questo:

```json
{"event":"outbound_click","page_type":"citta-digitali","cta_id":"cd-portale-tutte-le-citta","cta_location":"luoghi","outbound_type":"portale","destination_id":"citta-digitali","cta_text":"Tutte le città sul portale","link_url":"https://xn--cittdigitali-19a.it/tutte-le-citta/","link_domain":"xn--cittdigitali-19a.it"}
```

## 6. Regole di implementazione

1. **`src/scripts/track.ts`** espone `track(event, params)`, che aggiunge `page_type` ed esegue `(window.dataLayer ||= []).push({ event, ...params })`. Con `?debug_tracking` nell'URL scrive anche in console. Al lancio l'array resta in memoria: nessuna richiesta di rete, nessuno storage.
2. **Un solo listener delegato**: un `click` su `document` che risale con `closest('[data-track]')`. Legge il `dataset`, converte le chiavi da camelCase a snake_case e aggiunge `link_url`, `link_domain` e `cta_text` (il testo visibile ripulito, al massimo 100 caratteri). Per `contact_click` non aggiunge `link_url`. Non blocca mai la navigazione.
3. **Hook negli script esistenti**
   - `form.ts`:
     - `form_view`, con un IntersectionObserver a soglie multiple e la doppia condizione del §4;
     - `form_start`, al primo input;
     - `form_submit`, dopo `response.ok`;
     - `form_error`, con `error_type` ricavato dal caso: riepilogo di validazione → `validazione`; honeypot → `spam`; endpoint vuoto → `endpoint-assente`; `AbortError` → `timeout`; `TypeError` → `rete`; `HTTP 4xx/5xx` → `server`, con `http_status`.
   - `video.ts`:
     - `video_start` al primo `playing`, con `autoplay` se il video è partito in muto dall'IntersectionObserver;
     - `video_progress` su `timeupdate`;
     - `video_complete` al 97%, perché il video è in loop;
     - `video_unmute` dal bottone dell'audio.
   - `immersive.ts`: `preview_start` nel click del trigger. Sospeso: lo script non è incluso in nessuna pagina (§4).
   - `header.ts`: `menu_open` (priorità P3).
   - `track.ts`: inoltra solo le chiavi documentate al §5 e, come `cta_text`, solo l'etichetta visibile, senza il testo per i lettori di schermo.
4. **Niente doppi conteggi.** Se si attiva GA4, nella «misurazione avanzata» vanno spenti «Clic in uscita» e «Interazioni con i moduli»: li sostituiscono i nostri eventi.
5. **Nessun dato personale negli URL**: nessun campo del form in query string o nei redirect.
6. **`rel="noopener"` senza `noreferrer`** sui link ai portali (strategia di conversione, §2).

## 7. Convenzioni UTM

- Tutto minuscolo, parole separate da `-`. Mai UTM sui link interni a itnode.it.
- `utm_source`: `linkedin`, `newsletter`, `evento-<nome>`, `brochure`. Per i portali di ITnode, **lo stesso valore di `destination_id`** (§5): `puglia-digitale`, `citta-digitali` e, per il portale di una città, lo slug della città (per esempio `monopoli`). Una pagina di città che sta sul portale di Città Digitali usa `citta-digitali`, con la città in `utm_content`.
  - **Perché lo slug e non il dominio.** I domini cambiano o sono in verifica: Città Digitali è su cittàdigitali.it, mentre `cittadigitali` senza accento è il dominio di un progetto omonimo; quelli delle città sono in verifica (review di seo-technical del 2026-10-05, oss. 2). Puglia Digitale resta su lapugliadigitale.it, confermato dall'utente il 2026-10-05. Lo slug invece resta in ogni caso.
  - **Una sola chiave nei due sensi.** Lo stesso valore lega il traffico mandato a un portale (`outbound_click` con quel `destination_id`) e quello che ne arriva (sessioni con quella `utm_source`).
  - **Sostituisce** `lapugliadigitale`, `cittadigitali` e `<città>digitale` della v0.2. Nessun link li usa ancora, e conviene cambiare adesso, prima che finiscano in QR code stampati.
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
   - Dimensioni personalizzate per i parametri del §4, compreso `destination_id`: su questa dimensione, non sul dominio, si costruiscono report e segmenti dei portali (§4, «Domini nei report»).
   - `form_submit` come evento chiave (`contact_click` eventualmente come secondario).
   - Nessun dato personale.
4. **Google Ads**, solo se si fanno campagne: i segnali `ad_user_data` e `ad_personalization` servono per le funzioni di misurazione e remarketing sugli utenti del SEE. `form_submit` si importa come conversione.
5. **Aggiornare** informativa privacy e cookie policy: strumenti, finalità, durata, trasferimenti.
6. **Adattatore**: uno script che legge `window.dataLayer`, o si aggancia a `track()`, e inoltra gli eventi allo strumento. Con l'opzione B si carica solo dopo il consenso; con l'opzione A subito.
7. **Verifica** con Playwright (§9, test 5) prima della pubblicazione.

### 8.1 RUM delle prestazioni con `web-vitals`: parere

**Sì, dopo il lancio e senza banner, ma solo se valgono tutte le dieci condizioni della tabella.** Se il consulente privacy ritiene che serva il consenso, **no**: un banner solo per il RUM non si giustifica, e la sorveglianza dell'ADR 005 resta quella di laboratorio.

**A che cosa serve.** È l'unico modo di sorvegliare la prima condizione di riapertura dell'ADR 005 (LCP mobile al 75° percentile sopra 2,0 s), l'INP del menu e il TTFB reale. Con il traffico del sito, CrUX è improbabile (`docs/performance/budget.md`, §6.7).

**Perché senza consenso, e perché solo a condizioni**
- L'art. 5(3) della direttiva ePrivacy vale anche senza cookie. Per l'EDPB (linee guida 2/2023) anche uno script che fa inviare informazioni dal dispositivo è un accesso al terminale. Quindi conta l'esenzione, non l'assenza di cookie.
- Il Garante (linee guida del 10 giugno 2021) assimila ai cookie tecnici gli strumenti di analisi usati dal titolare per ottimizzare il sito, con statistiche in forma aggregata, senza incroci e senza cessioni a terzi. La CNIL include espressamente la misura delle prestazioni tra le finalità della misura d'audience esente dal consenso. [DA VERIFICARE con il consulente privacy che il RUM configurato così rientri nell'assimilazione.]
- La proposta di Digital Omnibus (nuovo art. 88a del GDPR, 19 novembre 2025) esenterebbe la misura aggregata del proprio servizio. È però ancora una proposta: non ci si può contare.

| # | Condizione |
|---|---|
| 1 | **Finalità esclusiva**: le prestazioni tecniche del sito (LCP, INP, CLS, FCP, TTFB), per le soglie di CLAUDE.md e per l'ADR 005. Nessun uso di marketing, profilazione o analisi del comportamento; nessun incrocio con il registro delle richieste |
| 2 | **Prima parte**: `web-vitals` dentro il bundle del sito, nessuna CDN. Invio con `navigator.sendBeacon` a un endpoint del sito, per esempio lo stesso dell'ADR 006 (opzione A). Nessun fornitore di analytics |
| 3 | **Nessun cookie, nessuno storage, nessun identificativo**: niente `localStorage` né `sessionStorage`. L'`id` che `web-vitals` genera per ogni pagina non si invia |
| 4 | **Payload chiuso**: `metric`, `value`, `rating`, `page_type`, `device_class` (`mobile` o `desktop`, dalla larghezza della finestra), `navigation_type`. Per LCP e INP, facoltativo, il selettore dell'elemento (versione `attribution`). Mai URL con query string, user agent, risoluzione dello schermo o tipo di connessione |
| 5 | **IP non registrato** dall'endpoint, al più tenuto in memoria per il limite di frequenza. Log dell'hosting con conservazione breve [DA VERIFICARE con l'hosting scelto] |
| 6 | **Solo aggregati**: si leggono i p75 per `page_type`, classe di dispositivo e periodo. Valori grezzi cancellati entro 30 giorni [IPOTESI]. Un p75 si legge solo con almeno 100 campioni per combinazione nel periodo [IPOTESI, da fissare con web-performance-specialist] |
| 7 | **Peso e INP**: caricamento dopo `load` con `import()`; 3,0 KB con Brotli, 4,9 KB nella versione `attribution`. Budget e verifica di web-performance-specialist |
| 8 | **Trasparenza**: citato nella cookie policy come strumento di misura tecnica, senza cookie (condizione C03 del G4) |
| 9 | **Conferma scritta del consulente privacy** prima dell'attivazione |
| 10 | **Verifica con Playwright** prima della pubblicazione (§9, test 6) |

Se in futuro si attiva GA4 con il banner (opzione B), il RUM resta separato e di prima parte: non passa da GA4.

La decisione va registrata nell'ADR sull'analytics, oppure in un ADR dedicato se arriva prima. Owner: cro-specialist, con web-performance-specialist per peso e soglie. Decide l'utente.

## 9. Verifiche con Playwright

Li scrivo io appena la build è pronta.
1. **Nessun tracciamento al lancio.** Per ogni pagina: contesto pulito, caricamento, scroll fino in fondo. Nessun cookie, o solo i tecnici elencati nella policy. Nessuna richiesta verso domini fuori dall'allowlist, che comprende il sito, l'host del video e l'endpoint (quest'ultimo solo all'invio).
2. **Markup**
   - Ogni `a[href^="http"]` esterno ha `data-track="outbound_click"`, `target="_blank"` e un `rel` che contiene `noopener` ma non `noreferrer`.
   - Ogni `tel:` e `mailto:` ha `data-track="contact_click"`.
   - Ogni `[data-track]` ha `data-cta-id` e `data-cta-location`, tranne i `nav_click`, che hanno `data-nav-item` e `data-nav-location`.
   - Ogni valore di `data-cta-location`, `data-outbound-type`, `data-destination-id` e `data-contact-method` appartiene agli elenchi del §5 e del §5.1.
   - `<body>` ha `data-page-type`.
3. **Eventi**: il clic su ogni elemento tracciato produce in `window.dataLayer` l'evento giusto, con i parametri obbligatori e **senza dati personali**. Ogni `outbound_click` ha `destination_id` e `outbound_type`; i link ai domini con caratteri accentati hanno `link_domain` in punycode.
4. **Form**
   - Endpoint vuoto: l'avviso è visibile prima dei campi; all'invio non parte alcuna richiesta di rete; viene registrato `form_error` con `error_type` `endpoint-assente`.
   - Endpoint simulato con `page.route`, risposta 200: compare il pannello di successo con il focus e viene registrato `form_submit`.
   - Risposta 500: messaggio d'errore, dati conservati, `form_error` di tipo `server`.
   - Nessuna risposta entro 15 s: `form_error` di tipo `timeout`.
   - Preselezione corretta su /siii, /puglia-digitale, /citta-digitali e su `/contatti?interesse=citta-digitali`.
5. **Dopo l'attivazione** (opzione B): nessuna richiesta a domini Google prima del consenso; nessuna nemmeno dopo «Rifiuta» o la X; dopo «Accetta», eventi con i parametri giusti.
6. **RUM, se approvato** (§8.1): nessun cookie e nessuno storage; il beacon parte solo verso l'endpoint del sito, dopo `load`; il payload contiene solo le chiavi ammesse, senza `id`, URL con query string o user agent.
7. **Endpoint del form**, quando c'è (ADR 006): richiesta valida ricevuta e con risposta 2xx; invio troppo rapido o con honeypot compilato in quarantena, mai scartato; limite di frequenza con risposta 429; nessun `Set-Cookie` nella risposta; CORS rifiutato da un'altra origine, se l'endpoint non è sullo stesso dominio.

## 10. Sperimentazione

Al lancio i test A/B non hanno senso. La dimensione del campione per variante è circa n ≈ 16·p(1−p)/Δ², con potenza dell'80% e α = 0,05. Con una conversione del 2% e un miglioramento del 25% (Δ = 0,5 punti percentuali) servono circa 12.500 visite per variante, cioè circa 25.000 visite della pagina [IPOTESI: per un sito B2B di nicchia sono probabilmente molti mesi di traffico; traffico reale DA FORNIRE].

Si parte con metodi qualitativi:
- cinque test moderati con titolari di PMI pugliesi;
- il feedback di chi gestisce le richieste (domande ricorrenti, obiezioni);
- l'analisi degli errori del form.

Il backlog degli esperimenti è in `docs/cro/backlog-esperimenti.md`. Il primo è E1, la riga di posizionamento della hero della Home, A contro B, con un test dei 5 secondi: non richiede traffico.

## 11. Fonti
- Garante per la protezione dei dati personali, [Linee guida cookie e altri strumenti di tracciamento, 10 giugno 2021](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876) e [FAQ sui cookie](https://www.garanteprivacy.it/faq/cookie). Il sito del Garante è bloccato dall'ambiente: il contenuto è stato verificato il 2026-09-28 attraverso i risultati di ricerca e due sintesi, [Filodiritto](https://www.filodiritto.com/i-cookie-nuove-linee-guida-dal-garante) e [Cyber Security 360](https://www.cybersecurity360.it/legal/privacy-dati-personali/utilizzo-dei-cookie-analitici-e-consenso-degli-interessati-ecco-le-regole).
- Google, [Consent mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode) e [Behavioral modeling for consent mode](https://support.google.com/analytics/answer/11161109), per le soglie di idoneità alla modellazione. Consultati il 2026-09-28 attraverso i risultati di ricerca.
- Cloudflare, [Turnstile, pre-clearance](https://developers.cloudflare.com/turnstile/get-started/pre-clearance/): il cookie `cf_clearance` viene impostato solo con la pre-clearance attiva. Consultato il 2026-09-28.
- Codice esistente letto il 2026-09-28: `src/scripts/track.ts`, `form.ts`, `video.ts`, `immersive.ts`, `header.ts`, `src/data/site.ts`, `astro.config.mjs`.
- Inventario degli attributi `data-*` (v0.2): build del commit `9948b57`, generata il 2026-09-28 in una cartella temporanea, fuori da `dist/`. Un solo script ha letto ogni `a` e `button` con `data-track` nelle 8 pagine.
- RUM e consenso (§8.1), consultati il 2026-09-28 attraverso i risultati di ricerca, perché i siti delle autorità non sono raggiungibili dall'ambiente:
  - EDPB, [Guidelines 2/2023 on Technical Scope of Art. 5(3) of ePrivacy Directive](https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en), versione 2.0 adottata il 7 ottobre 2024;
  - Garante, linee guida del 10 giugno 2021 (link sopra), sull'assimilazione degli analytics ai cookie tecnici; sintesi in [Ratio Iuris](https://ratioiuris.it/ladeguamento-dei-siti-web-alle-linee-guida-sui-cookie-2021-del-garante-privacy/);
  - CNIL, [Cookies : solutions pour les outils de mesure d'audience](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience), sulla misura delle prestazioni tra le finalità esenti;
  - Digital Omnibus, art. 88a del GDPR ancora in proposta: [Taylor Wessing](https://www.taylorwessing.com/en/global-data-hub/2026/the-digital-omnibus-proposal/gdh---the-digital-omnibus---cookies) e [Osborne Clarke](https://www.osborneclarke.com/insights/digital-omnibus-reshapes-eu-cookie-rules-leaves-banner-fatigue-largely-intact).
- v0.3, 2026-10-05:
  - dominio di Città Digitali confermato dall'utente il 2026-10-05 e forma dei link decisa da seo-technical: `docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md` (decisione di dominio e oss. 6);
  - posto e testo del nuovo link: `docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md`, §3.2;
  - inventario sulla build del commit `2a038de`, generata in una cartella temporanea fuori da `dist/` e confrontata riga per riga con quella del 2026-09-28;
  - correzione provata su una copia del codice, fuori dal repository: clic in Chromium 141 con Playwright 1.56, navigazione bloccata, lettura di `window.dataLayer`;
  - v0.4: inventario ricontrollato sulla build del commit `ce276be`, generata fuori da `dist/`; dominio di Puglia Digitale confermato dall'utente il 2026-10-05, riferito dalla sessione principale.

## Ipotesi da validare
- Il traffico del sito non basta per test A/B né per la modellazione di Consent Mode (§8, §10).
- I portali e le esperienze SIII non impostano cookie non tecnici quando vengono incorporati come anteprima.
- Esistono link «Realizzato da ITnode» dai portali verso itnode.it.
- Il RUM configurato secondo il §8.1 è assimilabile agli strumenti tecnici e non richiede il consenso.
- Con il traffico del sito, 100 campioni per template e classe di dispositivo si raggiungono in un periodo utile (§8.1, condizione 6).

## Domande aperte
- [DA FORNIRE] Traffico e richieste del sito attuale, e lo strumento di analytics in uso oggi, se c'è.
- [DA FORNIRE] Chi tiene il registro delle richieste, e se esiste già un CRM.
- [DA FORNIRE] Il cliente prevede campagne Google Ads? Da questo dipende la scelta tra le opzioni A e B.
- [DA VERIFICARE] Cookie impostati dai portali e dalle esperienze: servono una verifica da una rete non bloccata o un export dal cliente.
- [DA VERIFICARE, con il consulente privacy] Uno strumento senza cookie è assimilabile ai cookie tecnici? Il RUM del §8.1 lo è? Turnstile va citato nell'informativa?

## Decisioni richieste
1. **Nessun analytics al lancio, nessun banner**: confermare, alle condizioni del §1. Decide il cliente.
2. **Strumento di analytics**, opzione A o B, con un ADR entro il primo mese dal lancio. Decide il cliente; owner cro-specialist, insieme a web-performance-specialist.
3. **Hosting del video** (stesso dominio o CDN invece di railway.app). Decidono web-performance-specialist e la sessione principale.
4. **Anteprime immersive con iframe**: attivarle solo dopo la verifica dei cookie (§1, condizione 4). Decidono sessione principale e cliente.
5. **RUM delle prestazioni** (§8.1): sì alle dieci condizioni, dopo la conferma del consulente privacy. Decide l'utente; owner cro-specialist e web-performance-specialist.
6. **Endpoint del form**: opzioni nell'ADR 006 (proposta). Decide l'utente o il cliente prima del go-live (condizione C04 del G4).
7. **`cta_location` del link «Tutte le città sul portale»**: chiusa il 2026-10-05. Valore `luoghi`, applicato nel commit `ce276be` e verificato sulla build.
8. **Etichette UTM dei portali uguali a `destination_id`** (§7). Decisione di cro-specialist, prima di qualunque link o QR code con UTM.
