---
titolo: Review di conversione e misurazione del sito costruito
owner: cro-specialist
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md, docs/contenuti/microcopy.md, src/scripts/track.ts, src/scripts/form.ts, src/scripts/video.ts, src/components/sections/ContactForm.astro, src/components/ui/Cta.astro, src/components/ui/Media.astro, src/components/layout/Header.astro, src/components/layout/Footer.astro, src/data/site.ts, src/pages/, http://localhost:4321/]
---

# Review di conversione e misurazione del sito costruito

> **In breve**
> - **Verdetto di dominio: approvato con modifiche** per chiudere la Fase 5. **Il sito non è pronto per il go-live** finché restano aperti tre bloccanti: segnaposto «Asset richiesto» visibili, dati societari incompleti, endpoint del form non deciso.
> - I percorsi e la gerarchia delle CTA seguono la strategia. Le frecce sono coerenti e l'ancora `#richiesta` porta il focus sul titolo del form, senza finire sotto l'header.
> - Il form si comporta bene in tutti gli stati provati: vuoto, errori, invio riuscito, errore 500, timeout, ripiego senza endpoint. Non simula mai un invio e **non scrive dati personali negli eventi**.
> - Tutti gli eventi P1 hanno il loro aggancio. Prima di collegare uno strumento vanno corretti tre difetti: `form_view` non parte sugli schermi piccoli; i link dei pannelli del form non sono tracciati, compresa la bozza email, che al lancio è l'unico segnale di una richiesta; lo stesso portale ha due `destination_id` diversi.
> - Su 8 pagine e 2 viewport non ci sono cookie, né storage, né richieste verso terzi. Unica eccezione: il video di /citta-digitali, che su desktop arriva da railway.app. La premessa «nessun banner al lancio» regge, ma la condizione 5 del piano resta aperta.

## 1. Metodo e perimetro

- **Pagine**: `/`, `/siii/`, `/puglia-digitale/`, `/citta-digitali/`, `/contatti/`, `/privacy-policy/`, `/cookie-policy/`, `/404.html`, con viewport 390×844 e 1440×900. `form_view` anche a 375×600, 360×640 e 390×664.
- **Eventi**: ho cliccato ogni elemento `[data-track]` di ogni pagina (22–30 per pagina), con la navigazione bloccata, e ho controllato il payload in `window.dataLayer`: parametri obbligatori, chiavi ammesse, assenza di `link_url` su `contact_click`.
- **Form** (su /siii, 390 px): invio vuoto; invio senza endpoint (la build reale); endpoint simulato con `page.route` che risponde 200, 500 o non risponde (timeout di 15 s). Ho usato dati di prova riconoscibili (`Zzmario`, `zztest@example.it`, `0001122`, `ZZAzienda`, `ZZmessaggio`) e dopo ogni flusso, e dopo il clic sulla bozza email, li ho cercati nel dataLayer. Ho provato anche `?interesse=` su /contatti.
- **Rete e consenso**: su ogni pagina e viewport ho scorso fino in fondo, poi ho registrato le richieste verso domini diversi da localhost, i cookie, `localStorage` e `sessionStorage`.
- **Evidenze**: gli script e le schermate stanno nello scratchpad della sessione, non nel repository: `cro/audit.mjs`, `cro/check2.mjs`, `shots/cro-mobile-hero.png`, `shots/cro-desktop-chiusura.png`, `shots/cro-form-stati.png`. I test del §9 del piano vanno portati nel repository (vedi §5).
- **Non verificabile da qui**: raggiungibilità dei portali e delle esperienze, cookie di railway.app, dell'hosting e del futuro endpoint. Questi domini sono bloccati dalla rete dell'ambiente.

## 2. Esito delle verifiche

| Area | Esito | Evidenza |
|---|---|---|
| CTA dell'header «Parliamone» | ok | Porta a `#richiesta` su SIII, PD, CD e Contatti, a `/contatti/` su home, pagine legali e 404. Nella barra mobile si vede a 390 px (121×44). Dopo il clic su /puglia-digitale a 390 px il focus va su `#richiesta-title`, che sta a 171 px dal bordo, sotto un header alto 65 px |
| Gerarchia per pagina | ok, con un'eccezione (oss. 5) | Home: hero senza CTA, tre capitoli, chiusura «Parliamone» con email e telefono. SIII: «Esplora gli esempi ↓» come primaria, «Richiedi un'offerta ↓» come link. PD e CD: «Visita il portale ↗» come primaria, «Aderisci a … ↓» come link. Contatti: telefono, mobile ed email nella prima schermata mobile |
| Frecce | ok | `↓` sulle ancore, `→` verso le pagine, `↗` verso l'esterno; «Torna agli esempi ↑» nel pannello di successo |
| Link esterni | ok | Tutti con `target="_blank"` e `rel="noopener"`, senza `noreferrer`. Il nome accessibile dice «(si apre in una nuova scheda)» |
| Distanza tra chiusura e form (mobile) | ok | SIII 237 px, CD 325 px, PD 374 px (in mezzo c'è il link al portale, oss. 5) |
| `cta_id` | ok | Nessun duplicato nella stessa pagina, nessuna ancora rotta, `data-page-type` presente su tutte le 8 pagine |
| Stati del form | ok | Errori: riepilogo con link ai campi e focus, sotto un header con `scroll-padding-top: 80px`. Successo: pannello con focus sul titolo, email ripetuta, telefono e azione di contesto. 500 e timeout: pannello d'errore, dati conservati, bozza email. Senza endpoint: avviso prima dei campi, pannello di ripiego con bozza, telefono e mobile |
| Eventi del form | ok, tranne `form_view` (oss. 4) | `form_error` di tipo `validazione` (`error_fields: nome,email,privacy`), `endpoint-assente`, `server` (`http_status: 500`) e `timeout`; `form_submit` solo dopo la risposta 2xx |
| Dati personali | ok | Zero occorrenze dei dati di prova nel dataLayer, in tutti i flussi. Il payload inviato contiene `interesse, nome, email, telefono, azienda, messaggio, privacy, _elapsed_ms, _page, _form`, senza `_gotcha` |
| Consenso al lancio | ok, con una condizione aperta | Nessun cookie, nessuno storage, nessuna richiesta verso terzi, font self-hosted. Unica richiesta esterna: `itnode-website-production.up.railway.app` (media) su /citta-digitali a 1440 px |

Payload di `form_submit` osservato con l'endpoint simulato:

```json
{"event":"form_submit","page_type":"siii","form_id":"richiesta-siii","interest":"siii","optional_fields":"telefono,azienda,messaggio"}
```

## 3. Osservazioni

### 1. [BLOCCANTE per il go-live] Segnaposto «Asset richiesto» visibili dove dovrebbero esserci le prove
- **Dove:** `src/components/ui/Media.astro`, righe 67–72. Otto riquadri: 1 in home; 4 su /siii, di cui uno nella prima schermata mobile, subito sotto le CTA della hero; 3 «Asset richiesto · Foto» su /puglia-digitale. Li nasconde `aria-hidden`, ma restano visibili.
- **Problema:** chi valuta un fornitore digitale vede un sito non finito proprio nei punti che dovrebbero convincerlo, cioè le schermate delle esperienze SIII e i luoghi.
- **Motivazione:** secondo la strategia (§9), le esperienze SIII sono la prova più forte perché si possono provare. Nel modello LIFT, un segnaposto aumenta l'ansia e contraddice la promessa della pagina («Falla esplorare»).
- **Proposta:** [DA FORNIRE] le 3 schermate SIII, le 3 foto dei luoghi e l'asset della home, con una data. In ogni caso, **in produzione nessuna scritta di servizio deve essere visibile**. Basta un flag di build, per esempio in `Media.astro`:
  ```ts
  // Service placeholders only in previews; production never shows «Asset richiesto».
  const showSlots = import.meta.env.PUBLIC_SHOW_ASSET_SLOTS === 'true';
  ```
  Se uno slot resta vuoto al lancio, si nasconde il media e la card dell'esperienza tiene nome, tipo, luogo ed «Entra nell'esperienza ↗». Il trattamento va deciso con ui-designer.

### 2. [BLOCCANTE per il go-live] Dati societari incompleti
- **Dove:** `src/data/site.ts`, righe 19–30 (`rea: ''`, `shareCapital: ''`); `src/components/layout/Footer.astro`, righe 11–16; `src/pages/contatti.astro`, righe 199–227.
- **Problema:** oggi si vedono solo ragione sociale, P.IVA e sede operativa. REA e capitale sociale compaiono solo se valorizzati, e ora sono vuoti; la sede legale manca del tutto. La build passa senza alcun segnale.
- **Motivazione:** è la soglia non negoziabile n. 5 di CLAUDE.md. Per le PMI e per gli enti è anche un segnale di serietà, e sta vicino al form di /contatti.
- **Proposta:** [DA FORNIRE] numero REA con ufficio del Registro delle imprese, capitale sociale (con «i.v.» se versato), sede legale (anche se coincide con quella operativa). La P.IVA viene da una fonte pubblica: [DA VERIFICARE] con il cliente. Nella checklist di lancio di seo-technical va aggiunto un controllo sulla build che fallisce se mancano:
  ```sh
  # Pre-deploy: mandatory company data must be in the built pages (CLAUDE.md, threshold 5).
  for s in "REA" "Capitale sociale" "Sede legale"; do grep -q "$s" dist/contatti/index.html || { echo "Manca: $s"; exit 1; }; done
  ```

### 3. [BLOCCANTE per il go-live, salvo scelta esplicita del cliente] Endpoint del form
- **Dove:** `PUBLIC_FORM_ENDPOINT` vuoto. In `docs/decisioni/` c'è solo l'ADR 001.
- **Problema:** senza endpoint la conversione principale non esiste e non si può contare. Il ripiego è onesto e funziona, ma dipende da un client di posta configurato, che su desktop spesso manca. Tutti e quattro i form mostrano l'avviso «Il modulo online non è ancora attivo».
- **Motivazione:** strategia §10, rischio 1 (impatto alto); KPI «Richieste inviate dal form» del piano (§3).
- **Proposta:** scegliere il servizio e registrarlo in un ADR prima del G4, con i requisiti della strategia §7 (nessun cookie né script, DPA, dati nell'UE, quarantena dello spam). Se il cliente sceglie di lanciare comunque, va scritto in un ADR con una scadenza, e nel frattempo va tracciata la bozza email (oss. 5, punto a), che diventa la conversione di riferimento.

### 4. [IMPORTANTE] `form_view` non parte sugli schermi piccoli
- **Dove:** `src/scripts/form.ts`, righe 64–75.
- **Problema:** l'evento richiede che il 50% del form sia visibile, ma il form è alto 1.303–1.326 px. Su uno schermo alto meno di circa 660 px quella soglia non si raggiunge mai.

  | Viewport | Rapporto massimo possibile | `form_view` |
  |---|---|---|
  | 375×600 | 0,45 | non parte |
  | 360×640 | 0,48 | non parte |
  | 390×664 | 0,50–0,51 | parte al limite |
  | 390×844 e desktop | > 0,5 | parte |

  Con il riepilogo degli errori il form si allunga e il problema peggiora. Anche sugli schermi grandi `form_view` arriva tardi: chi arriva dall'ancora vede il titolo e i primi campi, e può iniziare a scrivere prima che sia visibile metà del form. Nei flussi automatici `form_start` precede `form_view`.
- **Motivazione:** i KPI «Raggiungimento del form» e il funnel `form_view` → `form_start` → `form_submit` (piano, §3) risulterebbero distorti proprio sui telefoni piccoli, cioè dove l'attrito è maggiore.
- **Proposta:** considerare visto il form quando ne è visibile metà oppure quando occupa metà dello schermo. La definizione nel piano la aggiorno io.
  ```ts
  // form_view: half of the form visible, or the form filling half of the viewport (tall forms, small screens).
  const viewObserver = new IntersectionObserver(
    ([entry]) => {
      const rootH = entry.rootBounds?.height ?? window.innerHeight;
      if (entry.intersectionRatio < 0.5 && entry.intersectionRect.height < rootH * 0.5) return;
      track('form_view', { form_id: formId, interest_preselected: preselected });
      viewObserver.disconnect();
    },
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
  );
  ```

### 5. [IMPORTANTE] Link di contatto e di uscita senza tracciamento, compresa la bozza email
- **Dove:** `src/components/sections/ContactForm.astro`: avviso prima dei campi (righe 61–71), pannello di successo (224–250), pannello d'errore (252–259), pannello di ripiego (261–274). Poi il link in linea a lapugliadigitale.it nella sezione «Il progetto» di /puglia-digitale, e il `mailto:` nel testo delle pagine legali e della 404.
- **Problema:** nessuno di questi link ha `data-track`. Il più importante è «Apri l'email già compilata»: senza endpoint è l'unico segnale che una richiesta è stata preparata, e oggi non viene contato.
- **Motivazione:** il piano (§4) definisce `contact_click` «compresa la bozza email del fallback» come conversione secondaria. Il test 2 del §9 fallisce su 10–12 link per ogni pagina con il form (12 su PD, 11 su CD, 10 su SIII e Contatti).
- **Proposta:** aggiungere gli attributi. Sulla bozza deve restare `contact_click`, perché `track.ts` omette `link_url` solo per quell'evento e l'`href` della bozza contiene i dati dell'utente.
  ```astro
  <a class="contact__draft" href={`mailto:${site.email}`} data-mailto-draft
     data-track="contact_click" data-cta-id={`${formId}-ripiego-bozza-email`}
     data-cta-location="form" data-contact-method="email">Apri l’email già compilata</a>
  ```
  | Link | `cta_id` | Evento e parametri |
  |---|---|---|
  | Bozza nel pannello di ripiego | `<formId>-ripiego-bozza-email` | `contact_click`, `email` |
  | Bozza nel pannello d'errore | `<formId>-errore-bozza-email` | `contact_click`, `email` |
  | Email e telefono nell'avviso | `<formId>-avviso-email`, `<formId>-avviso-telefono` | `contact_click` |
  | Email, telefono e mobile nel ripiego | `<formId>-ripiego-email`, `-ripiego-telefono`, `-ripiego-mobile` | `contact_click` |
  | Email e telefono nel successo e telefono nell'errore | `<formId>-successo-email`, `-successo-telefono`, `-errore-telefono` | `contact_click` |
  | Portale nel successo di PD e CD | `<formId>-successo-portale` | `outbound_click`, `portale`, `puglia-digitale` o `citta-digitali` |
  | Link in linea su PD, «Il progetto» | `pd-progetto-portale` | `outbound_click`, `portale`, `puglia-digitale` |
  | `mailto:` nelle pagine legali e nella 404 | `legale-email`, `404-email` | `contact_click`, `email` |

  Per tutti `data-cta-location="form"`, tranne il link su PD e il `mailto:` delle pagine legali (`sezione`) e della 404 (`404`).

### 6. [IMPORTANTE] Lo stesso portale ha due `destination_id`
- **Dove:** `src/components/layout/Footer.astro`, righe 18–20 (`id: 'cittadigitali'`, e lo stesso per Puglia Digitale), confrontato con `pd-hero-portale`, `pd-chiusura-portale`, `cd-hero-portale` e `contatti-portale-*`.
- **Problema:** il footer invia `lapugliadigitale` e `cittadigitali`, il resto del sito `puglia-digitale` e `citta-digitali`. Nei report i clic verso lo stesso portale finirebbero divisi in due righe.
- **Motivazione:** convenzioni del piano (§4): valori in kebab-case, coerenti con gli slug e con `interest`.
- **Proposta:** usare ovunque `puglia-digitale` e `citta-digitali`, cioè due valori da cambiare nel footer. Nello stesso passaggio, facoltativo: su /citta-digitali le città hanno `cta_location="portale"`, mentre su PD la stessa sezione usa `luoghi`. Meglio `luoghi` anche lì (`LocationShowcase.astro`, circa riga 131). Gli altri valori del codice diversi dal piano sono chiari e li adotto nel piano (Decisioni richieste, punto 4).

### 7. [IMPORTANTE] Chiusura di Puglia Digitale: un'uscita tra lo statement e il form
- **Dove:** `src/pages/puglia-digitale.astro`, righe 157–170 (`secondary` di `CTASection`). A 390 px lo statement sta a y 5.562, «Visita il portale ↗» a y 5.868, il form a y 5.936.
- **Problema:** subito sotto «Porta la tua impresa dentro Puglia Digitale.» l'unica azione visibile è un link che porta fuori dal sito. Si può leggere come «per entrare, vai sul portale», mentre l'adesione passa dal form. Su mobile, chi apre una nuova scheda spesso non torna.
- **Motivazione:** LIFT (distrazione e chiarezza nel punto di decisione); strategia §2, regole 1–2 (la secondaria deve sostenere la conversione e l'etichetta deve mantenere la promessa). Città Digitali non ha questo link, quindi le due pagine sono incoerenti. Il portale compare già come primaria nella hero, poi nella sezione «Il progetto», nel footer e nel pannello di successo.
- **Proposta:** togliere `secondary` dalla chiusura di PD. In alternativa, spostarlo sotto il form: «Prima vuoi vedere il portale? Visita lapugliadigitale.it ↗».

### 8. [IMPORTANTE] Numeri di Puglia Digitale: l'etichetta del 60% è ambigua
- **Dove:** sezione «Numeri» di /puglia-digitale: «60% del tessuto produttivo pugliese», con la nota «Dati ITnode.» (`src/data/figures.ts`).
- **Problema:** le prime due etichette sono chiare («città coinvolte», «partite IVA nei territori coinvolti»). La terza si può leggere come «il 60% delle imprese pugliesi è in Puglia Digitale». Con la nota «Dati ITnode.» il lettore attribuisce a ITnode anche un dato che probabilmente è statistico.
- **Motivazione:** soglia di veridicità; strategia §9 («le etichette non devono far pensare» che siano clienti); D.Lgs. 145/2007 sulla pubblicità ingannevole tra imprese. La nota non la riapro: segnalo solo l'ambiguità dell'etichetta.
- **Proposta:** «del tessuto produttivo pugliese è nei territori coinvolti» [DA VERIFICARE con il cliente che il dato significhi questo]. Se le cifre vengono da fonti pubbliche (Infocamere, ISTAT), la nota diventa «Elaborazione ITnode su dati <fonte>, <anno>» [DA FORNIRE].

### 9. [SUGGERIMENTO] «Aderisci a …» porta a un form intitolato «Contattaci»
- **Dove:** hero di PD e CD (`pd-hero-richiesta`, `cd-hero-richiesta`); titolo del form «Contattaci» su PD ed «Entra in Città Digitali» su CD.
- **Problema:** «Aderisci» promette un'iscrizione, mentre il form è una richiesta di informazioni («ti spieghiamo come entrare»). Su PD, poi, il titolo cambia parola e il visitatore perde la traccia.
- **Motivazione:** message match; strategia §2, regola 2.
- **Proposta** (decide copywriter-brand): nella hero «Chiedi come aderire ↓», e lo stesso testo come titolo del form. Oppure si tiene «Aderisci a Puglia Digitale» anche come titolo del form, e l'introduzione chiarisce che il primo passo è una richiesta.

### 10. [SUGGERIMENTO] Casella privacy e link in linea piccoli su mobile
- **Dove:** `ContactForm.astro`, righe 186–204 e 219–221, e avviso prima dei campi. Misure a 390 px: casella privacy 20×20, etichetta alta 25 px con dentro il link all'informativa; link telefono ed email nel testo alti 19 px.
- **Problema:** la casella privacy è l'ultimo passo obbligatorio di ogni invio. Toccando il testo si rischia di aprire l'informativa in una nuova scheda invece di spuntare la casella. Il telefono sotto il form è il canale alternativo principale, ma si tocca con difficoltà.
- **Motivazione:** ogni ostacolo nell'ultimo passo pesa sul completamento. I link in linea rientrano nell'eccezione del criterio 2.5.8, ma restano scomodi. La decisione sull'accessibilità spetta a ux-designer.
- **Proposta:** casella di almeno 24 px (meglio 28) ed etichetta con padding fino a 44 px di altezza; area di tocco più ampia per i link in linea senza cambiare il layout, per esempio `.contact__alt a, .contact__notice a { padding-block: 0.6em; }`.

### 11. [SUGGERIMENTO] Parametro `?interesse=` con più valori separati da virgola
- **Dove:** `src/scripts/form.ts`, riga 56. Risultati: `?interesse=citta-digitali` → ok; `?interesse=siii&interesse=puglia-digitale` → ok; `?interesse=siii,puglia-digitale` → nessuna preselezione.
- **Motivazione:** la strategia (§5) prevede valori separati da virgola, più comodi nei QR code e nelle campagne.
- **Proposta:**
  ```ts
  const fromQuery = new URLSearchParams(window.location.search)
    .getAll('interesse')
    .flatMap((value) => value.split(','))
    .map((value) => value.trim());
  ```

### 12. [SUGGERIMENTO] Irrobustire `track.ts`
- **Dove:** `src/scripts/track.ts`, righe 35–40.
- **Problema:** (a) il listener inoltra *tutti* gli attributi `data-*` dell'elemento cliccato: oggi quelli vuoti vengono scartati, ma un attributo aggiunto in futuro potrebbe portare dati non previsti. (b) `cta_text` include il testo per i lettori di schermo, per esempio «Entra nell'esperienza di Masseria Santella (si apre in una nuova scheda)»: nei report i valori diventano rumorosi.
- **Proposta:**
  ```ts
  // Forward only the documented keys (docs/cro/piano-misurazione.md §5).
  const KEYS = ['ctaId', 'ctaLocation', 'interest', 'outboundType', 'destinationId', 'contactMethod', 'navItem', 'navLocation'] as const;
  for (const key of KEYS) if (el.dataset[key]) params[toSnake(key)] = el.dataset[key];
  // Visible label only, without screen-reader text.
  const label = el.querySelector('.cta__label')?.textContent ?? el.textContent ?? '';
  params.cta_text = label.replace(/\s+/g, ' ').trim().slice(0, 100);
  ```

### 13. [SUGGERIMENTO] Dettagli del form e del video
- **Avviso e ripiego ripetuti.** Dopo l'invio senza endpoint, sopra il pannello «Il modulo online non è ancora attivo.» resta l'avviso con lo stesso messaggio. Nel ramo `!endpoint` di `form.ts` si può nascondere: `container.querySelector('[data-form-inactive]')?.setAttribute('hidden', '')`.
- **`video_start`.** Oggi parte sull'evento `play`, che scatta anche quando il file poi non si carica (`video.ts`, righe 85–88). Meglio agganciarlo a `playing`, una volta sola.
- **`preview_start`.** Senza anteprime in iframe l'evento non parte mai. Lo tolgo dal piano: per il KPI «Prova del prodotto» basta `outbound_click` con `outbound_type=esperienza-siii`.

### 14. [SUGGERIMENTO] Fiducia vicino ai form delle pagine prodotto
- **Dove:** chiusure di SIII, PD e CD.
- **Problema:** accanto al form ci sono «senza impegno», l'uso dei dati e il telefono. Mancano chi risponde e che cosa succede dopo. Su /contatti il fondatore c'è, ma sotto il form, con un ritratto «elaborato con strumenti di intelligenza artificiale». La nota è corretta e trasparente, ma una foto reale è una prova più forte.
- **Proposta:** quando arrivano i dati, aggiungere il blocco «Cosa succede dopo» (strategia §8) e una riga «Ti risponde <nome>» con una foto reale [DA FORNIRE: processo, tempi garantiti, chi risponde, foto reale].

## 4. Prima di collegare uno strumento di analytics

**Cosa manca nel codice**
1. Correggere le osservazioni 4, 5 e 6; consigliate anche la 12 e la 13.
2. Scrivere un adattatore che legge `window.dataLayer`, o si aggancia a `track()`, e inoltra gli eventi. Il formato `{ event, ...params }` è già compatibile con GTM. Con gtag.js diretto va tradotto in `gtag('event', name, params)`.
3. Portare nel repository i test Playwright del piano (§9) e farli girare prima di ogni deploy. Gli script dello scratchpad coprono già i test 1–4.

**Cosa comporta per il consenso**
- **Opzione A** (strumento privacy-first configurato secondo le condizioni del Garante): nessun banner. Vanno però aggiornate cookie policy e informativa, e l'assimilazione ai cookie tecnici va confermata dal consulente [DA VERIFICARE].
- **Opzione B** (GA4, ed eventualmente Google Ads):
  - banner e CMP conformi al Garante, con Consent Mode v2 in modalità Basic;
  - link permanente «Preferenze cookie» nel footer e policy aggiornate;
  - la premessa «nessun banner» cade;
  - l'adattatore si carica solo dopo il consenso e **inoltra solo gli eventi successivi**, senza rileggere quelli già presenti nel dataLayer;
  - si perdono i dati di chi rifiuta.
- **In entrambi i casi** la cookie policy deve citare l'host del video (condizione 5, oggi railway.app) e il servizio del form (condizione 6).

**Conversioni da configurare**: `form_submit` come evento chiave. Finché manca l'endpoint si usa invece `contact_click` con `cta_id` che finisce in `-bozza-email`, da presentare come «richiesta preparata», non come richiesta certa.

## 5. Backlog degli esperimenti dopo il lancio (aggiornamento)

Il backlog si apre dopo il lancio in `docs/cro/backlog-esperimenti.md`. Un test A/B qui non è realistico:
- conversione di pagina: con p = 2% e Δ = 0,5 punti servono circa 16·0,02·0,98/0,005² ≈ 12.500 visite per variante;
- completamento del form: con p = 30% e Δ = 6 punti servono circa 930 `form_start` per variante.

Si parte quindi con metodi qualitativi e con confronti prima/dopo, letti con cautela.

| # | Ipotesi | ICE (I·C·E) | Metrica | Metodo |
|---|---|---|---|---|
| E1 | Se nella prima schermata della home si capisce subito che cosa fa ITnode (oggi lo dice solo l'occhiello in maiuscoletto), allora più visitatori proseguono verso i capitoli, perché si riduce l'incertezza sulla proposta di valore | 6·5·8 = 6,3 | test dei 5 secondi (almeno 4 persone su 5 sanno dire che cosa fa ITnode); poi clic su `home-capitolo-*` rispetto alle visite della home | 5 test moderati con titolari di PMI |
| E2 | Se accanto al form compaiono i passi reali e il volto di chi risponde, allora sale il completamento, perché cala l'ansia | 7·6·6 = 6,3 | `form_submit` / `form_start`; domande ricorrenti raccolte da chi risponde | prima/dopo, più feedback commerciale; richiede i dati del cliente |
| E3 | Se la chiusura di PD non ha l'uscita verso il portale (se l'oss. 7 non si applica al lancio), allora più visitatori arrivati al form lo iniziano | 5·5·9 = 6,3 | `form_start` / `form_view` su PD rispetto a CD | prima/dopo; registrazioni di sessione solo con consenso |
| E4 | Se l'etichetta diventa «Email» invece di «Email aziendale», allora calano esitazioni ed errori sul campo | 4·5·9 = 6,0 | `form_error` con `email` in `error_fields`; abbandoni dopo `form_start` | interviste; decide il cliente |
| E5 | Se la primaria della hero di PD e CD diventa la richiesta e il portale scende a link, allora salgono le richieste, a costo di meno visite al portale, che però fanno da prova | 5·4·8 = 5,3 | `form_view` e `form_submit` rispetto a `outbound_click` di tipo `portale` | decisione dopo 8–12 settimane di dati, non A/B |

Da osservare nei test con utenti: nella prima schermata di SIII, PD e CD ci sono due bottoni pieni, «Parliamone» nell'header e la primaria della hero, che portano in posti diversi. Oggi non propongo modifiche, ma va verificato se crea esitazione.

## 6. Verdetto di dominio

**Conversione e misurazione: approvato con modifiche** per chiudere la Fase 5.
- **Prima del go-live** vanno chiuse le osservazioni 1, 2 e 3 (bloccanti) e le osservazioni 7 e 8.
- **Prima di collegare qualsiasi strumento di analytics** vanno corrette le osservazioni 4, 5 e 6.
- Il resto può seguire dopo il lancio.

Il verdetto di gate spetta al creative-director.

## 7. Fonti
- Documenti di progetto: `docs/cro/strategia-conversione.md`, `docs/cro/piano-misurazione.md`, `docs/contenuti/microcopy.md`, `docs/brief/brief-consolidato.md`, `docs/contenuti/alt-text.md`.
- Codice letto il 2026-09-28: `src/scripts/track.ts`, `form.ts`, `video.ts`; `src/components/sections/ContactForm.astro`; `src/components/ui/Cta.astro`, `Media.astro`; `src/components/layout/Header.astro`, `Footer.astro`; `src/data/site.ts`; `src/pages/*.astro`.
- Verifiche con Playwright sull'anteprima `http://localhost:4321/` il 2026-09-28. Script e schermate nello scratchpad della sessione (§1).
- Nessuna fonte web nuova. Le fonti normative sono quelle del piano di misurazione (§11).

## Ipotesi da validare
- Una quota rilevante del traffico mobile arriva da schermi con meno di circa 660 px di altezza utile, quindi il difetto di `form_view` pesa sui dati [IPOTESI: da verificare con i dati del primo mese].
- Senza endpoint, una parte dei visitatori desktop non ha un client di posta configurato e perde la richiesta al clic sulla bozza.
- Il 60% indica la quota del tessuto produttivo pugliese che si trova nei territori coinvolti.
- Il traffico non basta per test A/B, né sulla conversione di pagina né sul completamento del form.

## Domande aperte
- [DA FORNIRE] Le 3 schermate SIII, le 3 foto dei luoghi di PD e l'asset della home, con la data di consegna.
- [DA FORNIRE] Numero REA e ufficio del Registro delle imprese, capitale sociale, sede legale. [DA VERIFICARE] La P.IVA.
- [DA FORNIRE] Il servizio del form, il destinatario delle richieste, chi risponde e con quali tempi garantiti.
- [DA VERIFICARE] Significato e fonte primaria del 60% e delle 200.000 partite IVA; data di aggiornamento dei numeri.
- [DA VERIFICARE] Fonte di «10.000+ clienti, prima di ITnode». L'attribuzione alle aziende precedenti è corretta, ma il dato va documentato.
- [DA VERIFICARE] Foto dell'evento Puglia Digitale, presentata come «L'evento Puglia Digitale»: serve l'originale senza sovrimpressioni e la conferma che la scena non è alterata (brief consolidato, punto 3).
- [DA VERIFICARE, da una rete non bloccata] Portali ed esperienze online e aggiornati; nessun cookie da railway.app sul video.
- [DA FORNIRE] Una foto reale del fondatore, se è lui a rispondere alle richieste.

## Decisioni richieste
1. **Endpoint del form**: ADR prima del G4, oppure accettazione esplicita e scritta del lancio senza endpoint, con una scadenza. Decide il cliente; la parte tecnica è della sessione principale.
2. **Slot senza asset in produzione**: nessuna scritta di servizio visibile (flag di build); trattamento dello slot vuoto. Decidono creative-director e ui-designer, se gli asset non arrivano in tempo.
3. **Chiusura di PD senza il link al portale** (oss. 7). È una decisione di dominio della conversione e la applico io come owner, salvo obiezioni del creative-director per ragioni di identità.
4. **Tassonomia**. Adotto nel piano (v0.2) i valori del codice: `esperienza-siii`, `portale-luogo`, `google-maps`, `cellulare`, e come location `recapiti`, `benefici`, `esempi`, `portali`. Nel codice vanno cambiati `destination_id` dei portali nel footer e, facoltativamente, la location delle città di CD (oss. 6). Lo stesso aggiornamento del piano porta la nuova definizione di `form_view` e toglie `preview_start`. Owner: cro-specialist; modifica del codice: sessione principale.
5. **Etichetta «Aderisci a …» e titolo del form di PD** (oss. 9). Decide copywriter-brand.
