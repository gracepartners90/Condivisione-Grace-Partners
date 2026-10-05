---
titolo: Microcopy e UX writing
owner: copywriter-brand
contributi: [cro-specialist, ux-designer, creative-director, copywriter-content, seo-content, seo-technical, web-performance-specialist]
stato: in revisione
versione: 1.2
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/ux/sitemap.md, docs/creativa/direzione-visiva.md, docs/cro/strategia-conversione.md, docs/seo/mappa-keyword-url.md, docs/seo/dati-strutturati.md, docs/contenuti/alt-text.md, docs/contenuti/copy-deck/siii.md, docs/contenuti/copy-deck/contatti.md, docs/strategia/coordinate-luoghi.md, docs/seo/specifiche-tecniche.md, docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md, src/data/site.ts, src/components/layout/Footer.astro, dist/ (2026-10-05), src/scripts/form.ts, src/scripts/video.ts, src/scripts/marquee.ts, src/scripts/header.ts, src/scripts/immersive.ts, src/scripts/track.ts]
---

# Microcopy e UX writing

Testi di interfaccia pronti da impaginare, agganciati agli attributi già presenti nel codice (`src/scripts/`). Struttura e comportamento di header, menu, breadcrumb, footer e 404 sono quelli della sitemap di ux-designer (`docs/ux/sitemap.md`). Le decisioni di conversione sono di cro-specialist (`docs/cro/strategia-conversione.md`, §§ 3–8). Dove la proposta di microcopy di cro-specialist e questo documento differiscono, vale questo documento: la scelta finale spetta a copywriter-brand, come dice il § 8 della strategia. Grafie e convenzioni: `docs/contenuti/tone-of-voice.md`.

## Come leggere questo documento

- **Visibile**: il testo a schermo. **Nome accessibile**: ciò che leggono gli screen reader, quando è diverso (`aria-label` o testo nascosto `sr-only`). Il nome accessibile comincia sempre con il testo visibile (WCAG 2.5.3).
- **Aggancio**: attributo o variabile nel codice attuale.
- `{…}`: valore da inserire in sviluppo. Le marcature `[DA …]` non si pubblicano.
- **Frecce** → ↓ ↗ ↑: indicano l’icona SVG da usare (`aria-hidden="true"`), non un carattere (tone of voice, § 6).
- **Percorsi** con la barra finale, come prevedono le specifiche di seo-technical: `/siii/`, `/contatti/`.

## 1. Header

| Elemento | Visibile | Nome accessibile e attributi | Note |
|---|---|---|---|
| Skip link | Vai al contenuto | `href="#contenuto"`, verso `<main id="contenuto">` | Primo elemento raggiungibile con Tab; si vede solo quando riceve il focus. |
| Logo | immagine | `<img alt="ITnode">` dentro il link a `/`; sulla home il link ha `aria-current="page"` | Forma della sitemap UX. `alt-text.md` propone «ITnode – Home» e la mappa SEO «ITnode, home»: serve una forma sola, e decide ux-designer, che è owner dell’accessibilità. |
| Navigazione | — | `<nav aria-label="Principale">` | — |
| Voci | SIII · Puglia Digitale · Città Digitali · Contatti | `aria-current="page"` sulla voce della pagina corrente | Come `nav` in `src/data/site.ts`. |
| CTA | Parliamone | Link `<a>`: porta a `#richiesta` sulle pagine con form, a `/contatti/` su home, pagine legali e 404; `data-track="header-parliamone"` | Evidenziata, senza icona. |
| Sigla SIII (facoltativo) | SIII | `SIII<span class="sr-only"> – Siti Interattivi Immersivi</span>` | Da provare con NVDA e VoiceOver: la sigla potrebbe essere letta come una parola. |

## 2. Menu mobile a tutto schermo

| Elemento | Visibile | Nome accessibile | Aggancio e note |
|---|---|---|---|
| Pulsante di apertura | Menu | Apri menu | `[data-menu-open]`, con `aria-haspopup="dialog"` e `aria-expanded` |
| Pulsante di chiusura | Chiudi | Chiudi menu | `[data-menu-close]`: è il primo elemento del pannello, nella stessa posizione di «Menu» |
| Pannello | — | `<dialog aria-label="Menu">` | `[data-mobile-menu]` |
| Voci | 01 SIII · 02 Puglia Digitale · 03 Città Digitali · Contatti | numeri `aria-hidden="true"` | voci alte almeno 48 px |
| CTA | Parliamone | — | `menu-mobile-parliamone` |
| Canali diretti | Chiama +39 080 2466520 · Scrivi a info@itnode.it | — | `tel:`, `mailto:`; `menu-mobile-telefono`, `menu-mobile-email` |

- **Nomi dei pulsanti.** La sitemap UX usa come nome il solo testo visibile («Menu», «Chiudi»). «Apri menu» e «Chiudi menu» come `aria-label` sono compatibili, perché contengono il testo visibile, e dicono l’azione in modo esplicito. Decide ux-designer; se preferisce il solo testo visibile, vale quello.
- **Descrittori delle voci**, dentro il link, sotto il nome: SIII → «Siti Interattivi Immersivi»; Puglia Digitale → «Dalla costa all’entroterra» (sitemap UX, testi del cliente). Per Città Digitali la sitemap indica «L’Italia in un unico portale», che però il brief ammette solo accompagnato dalle città reali (N12). In un menu le città non ci stanno: propongo «Le attività del territorio, online», dallo statement del § 17.

## 3. Footer

I blocchi, nell’ordine del DOM, sono quelli della sitemap UX (§ 6). I titoli dei gruppi sono `<h2>` in stile piccolo.

| # | Blocco | Testo | Note |
|---|---|---|---|
| 1 | Logo | immagine, `alt="ITnode"` | Link a `/`. |
| 2 | Navigazione | Titolo: Navigazione<br>Voci: SIII · Puglia Digitale · Città Digitali · Contatti | `<nav aria-label="Piè di pagina">` |
| 3 | Contatti | Titolo: Contatti<br>Sede operativa<br>Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA)<br>+39 080 2466520<br>info@itnode.it | In `<address>`. Telefono (`tel:+390802466520`, `footer-telefono`) ed email (`mailto:`, `footer-email`) sono link. Se sede legale e operativa coincidono: «Sede legale e operativa» (brief, S3). |
| 4 | Portali | Titolo: Portali<br>cittàdigitali.it ↗<br>lapugliadigitale.it ↗ | Nuova scheda. Nomi accessibili: «cittàdigitali.it, portale di Città Digitali (si apre in una nuova scheda)» e «lapugliadigitale.it, portale di Puglia Digitale (si apre in una nuova scheda)». Il dominio evita due link con lo stesso nome («Città Digitali») e destinazioni diverse. `footer-portale-citta-digitali`, `footer-portale-puglia-digitale`.<br>Il portale di Città Digitali è cittàdigitali.it, con l’accento (confermato dall’utente il 2026-10-05). Il «www.cittadigitali.it» delle linee guida (§ 22) è un progetto omonimo di altri: non si scrive né si linka mai. Testo visibile e nome accessibile con la «à»; `href` in punycode, `https://xn--cittdigitali-19a.it` (specifiche SEO, § 5.3; tone of voice, § 5). Nel sito è già così (verificato su `dist/` il 2026-10-05). |
| 5 | Riga legale | vedi sotto | — |
| 6 | Firma | ITnode · Acquaviva delle Fonti · 40.90° N · 16.85° E | Riga mono della direzione visiva (§ 7.8), `aria-hidden`: è una firma grafica, e nome e indirizzo sono già nel blocco Contatti. Coordinate del comune, non dell’indirizzo, a 2 decimali da una fonte unica (`docs/strategia/coordinate-luoghi.md`, §§ 2 e 5): non si presentano mai come posizione della sede. |

Il cellulare (+39 335 1229785) e il profilo LinkedIn del fondatore restano sulla pagina Contatti: la sitemap non li prevede nel footer. Il `sameAs` di Person è coperto dal link a LinkedIn nella sezione del fondatore in Home.

**Riga legale e copyright**

> © {anno} ITNODE S.r.l. · P.IVA 08937270729 · Sede legale: Via Sant’Anna, 34 – 70021 Acquaviva delle Fonti (BA) · C.F. e iscrizione al Registro delle imprese di Bari n. 08937270729 · REA BA-{numero} · Capitale sociale € {importo} i.v.

Seguono i link: Privacy Policy · Cookie Policy · Preferenze cookie (quest’ultimo solo se esiste un banner di consenso, § 10.3).

- `{anno}` si genera in build; un piccolo script lo aggiorna se il sito non viene ricompilato a inizio anno (sitemap UX).
- Nella riga legale l’indirizzo usa il trattino medio, perché il punto a metà altezza separa già le voci.
- La riga deve essere completa al go-live (soglia 5 di CLAUDE.md, art. 2250 del Codice civile). Finché i dati non sono confermati, `rea` e `shareCapital` restano vuoti in `src/data/site.ts` e i due elementi non compaiono: il go-live resta bloccato.

| Dato | Valore | Stato e fonte |
|---|---|---|
| Ragione sociale | ITNODE S.r.l. | `[DA VERIFICARE: grafia da visura]` ufficiocamerale.it e atoka.io, dagli estratti di ricerca del 2026-09-28 |
| P.IVA | 08937270729 | `[DA VERIFICARE]` stesse fonti |
| C.F. e numero di iscrizione al Registro delle imprese | 08937270729 | `[DA VERIFICARE]` per le S.r.l. di norma coincidono con la P.IVA |
| Registro delle imprese | Bari | `[DA VERIFICARE]` la sede è nel comune di Acquaviva delle Fonti (BA) |
| REA | BA-660035 | `[DA VERIFICARE]` valore letto solo nell’estratto di un risultato di ricerca (atoka.io / ufficiocamerale.it, 2026-09-28): la pagina non è raggiungibile dal nostro ambiente |
| Capitale sociale | € 10.000,00 | `[DA VERIFICARE]` stessa origine; «i.v.» solo se interamente versato |
| Socio unico | — | `[DA VERIFICARE]` se la società è unipersonale va indicato |

## 4. Modulo di contatto

Il componente è lo stesso su SIII, Puglia Digitale, Città Digitali e Contatti, nella sezione `#richiesta`. Titolo e introduzione del form li scrive, pagina per pagina, chi cura la pagina (copywriter-content). Qui c’è tutto il resto.

### 4.1 Testi fissi

| Elemento | Testo | Aggancio e note |
|---|---|---|
| Nome accessibile del form | il titolo del form della pagina | `aria-labelledby` sul titolo. Se il titolo manca: `aria-label="Modulo di contatto"`. |
| Riga sotto l’introduzione | La richiesta è senza impegno. I campi con * sono obbligatori. | L’asterisco nelle etichette è `aria-hidden`: l’obbligo lo comunica `required`. |
| Avviso prima dei campi, solo se il modulo non è attivo | Il modulo online non è ancora attivo. Per ora scrivici a info@itnode.it o chiamaci al +39 080 2466520. Se compili i campi, all’invio prepariamo un’email già pronta da spedire. | Da rendere in build quando `data-endpoint` è vuoto (cro-specialist, § 7). Così nessuno compila il modulo credendo che parta. |
| Pulsante di invio | Invia richiesta | Testo del cliente (§ 23). |
| Stato di invio | Invio in corso… | `data-msg-sending` sul form, letto da `[data-form-status]`. Il pulsante resta «Invia richiesta», con `aria-disabled="true"`. |
| Messaggio generico di campo mancante | Compila questo campo. | `data-msg-required` sul form: vale solo se un campo non ha il suo messaggio. |

### 4.2 Campi

| Campo (`name`) | Etichetta | Aiuto sotto il campo | Attributi | Messaggi di errore |
|---|---|---|---|---|
| `nome` | Nome e cognome * | — | `required`, `autocomplete="name"`, `maxlength="100"` | Vuoto (`data-msg-required`): Scrivi nome e cognome.<br>Troppo lungo (`data-msg-long`): Nome e cognome: usa al massimo 100 caratteri. |
| `email` | Email * | Ti risponderemo a questo indirizzo. | `type="email"`, `required`, `autocomplete="email"`, `spellcheck="false"`, `autocapitalize="off"`, `pattern` di cro-specialist | Vuoto: Scrivi il tuo indirizzo email.<br>Formato (`data-msg-type` e `data-msg-pattern`): Controlla l’email: per esempio nome@azienda.it. |
| `telefono` | Telefono (facoltativo) | Se preferisci, ti richiamiamo noi. | `type="tel"`, `autocomplete="tel"`, `pattern` di cro-specialist | Formato (`data-msg-pattern`): Controlla il numero: puoi usare cifre, spazi e il segno + del prefisso internazionale. |
| `azienda` | Azienda o ente (facoltativo) | — | `autocomplete="organization"`, `maxlength="150"` | Troppo lungo: Azienda o ente: usa al massimo 150 caratteri. |
| `interesse` (`fieldset`) | Legenda: Mi interessa (facoltativo)<br>Opzioni: SIII – Sito Interattivo Immersivo · Puglia Digitale · Città Digitali | Puoi sceglierne più di uno. | Checkbox con i valori di `interests` in `src/data/site.ts`; `data-label` per l’email precompilata: «SIII», «Puglia Digitale», «Città Digitali» | — |
| `messaggio` | Messaggio (facoltativo) | Su /siii/: Che spazio vorresti far esplorare? Per esempio una struttura ricettiva, un negozio, uno showroom.<br>Su /puglia-digitale/ e /citta-digitali/: In quale città lavori e di cosa si occupa la tua attività?<br>Su /contatti/: Raccontaci che cosa vuoi rendere esplorabile: uno spazio, un’attività, un territorio. | `maxlength="2000"` | Troppo lungo: Il messaggio è troppo lungo: usa al massimo 2.000 caratteri. |
| `privacy` (checkbox) | Ho letto l’informativa privacy * | Usiamo i tuoi dati solo per rispondere a questa richiesta. `[DA VERIFICARE con l’informativa]` | `required`, **mai preselezionata**. «informativa privacy» è un link a `/privacy-policy/` in nuova scheda, per non perdere i dati già inseriti; nome accessibile del link: «informativa privacy (si apre in una nuova scheda)» | Non spuntata: Per inviare la richiesta, conferma di aver letto l’informativa privacy. |
| `_gotcha` (antispam) | Non compilare questo campo | — | Fuori schermo, contenitore con `aria-hidden="true"`, `tabindex="-1"`, `autocomplete="off"` | — |

Note:
- **«Email» invece di «Email aziendale».** È la proposta di cro-specialist (§ 6): il campo accetta qualsiasi indirizzo valido, e «aziendale» farebbe esitare chi usa Gmail o una PEC. Cambia un’etichetta del § 23, quindi serve la conferma del cliente. Se il cliente vuole tenere «Email aziendale *», l’aiuto diventa: «Va bene anche un indirizzo personale: ti risponderemo lì.»
- **«Azienda o ente»** riformula «Nome Azienda / Ente» (§ 23), con lo stesso significato.
- **Campi facoltativi** marcati con «(facoltativo)», oltre all’asterisco sugli obbligatori (cro-specialist, § 6).
- **Formule neutre**: «ti richiamiamo noi», non «sarai richiamato». Il messaggio d’errore del telefono non contiene un numero d’esempio che si potrebbe comporre davvero.
- **Casella privacy**: è una presa visione, non un consenso. Rispondere a una richiesta si basa sulla richiesta stessa. `[DA VERIFICARE con il consulente privacy del cliente]` Se un giorno servisse un consenso per comunicazioni commerciali: casella separata, facoltativa, mai preselezionata. Per esempio: «Voglio ricevere aggiornamenti su progetti e iniziative di ITnode (facoltativo).»
- **Preselezione di «Mi interessa»** in base alla pagina: è un dato di contesto, non un consenso (cro-specialist, § 5).
- **Ordine dei campi**: cro-specialist suggerisce di portare «Mi interessa» in cima. I testi funzionano in entrambi gli ordini.

### 4.3 Riepilogo degli errori

| Elemento | Testo | Aggancio |
|---|---|---|
| Titolo | Per inviare la richiesta, controlla questi campi: | `[data-form-summary]`, che riceve il focus |
| Voci | Il messaggio d’errore di ogni campo, come link al campo | `[data-form-summary-list]` |

Ogni messaggio nomina già il proprio campo. Per questo nel riepilogo basta il messaggio: oggi `form.ts` antepone l’etichetta («Nome e cognome: Scrivi nome e cognome.»), una ripetizione che conviene togliere.

### 4.4 Esiti dell’invio

**Conferma** · `[data-form-success]` · il pannello prende il posto del form e il focus va sul titolo

| Elemento | Testo |
|---|---|
| Titolo | Richiesta inviata. Grazie. |
| Testo | Abbiamo ricevuto la tua richiesta e ti risponderemo a {email}. Se l’indirizzo non è giusto, scrivici a info@itnode.it. |
| Passo successivo | Vuoi parlarne subito? Chiamaci al +39 080 2466520. |
| Un’azione, in base alla pagina | /siii/: Torna agli esempi ↑ (a `#esempi`) · /puglia-digitale/ e /citta-digitali/: Visita il portale ↗ · /contatti/: Esplora SIII → · Scopri Puglia Digitale → · Esplora Città Digitali → |

- `{email}` va dentro `[data-success-email]`: il codice lo riempie già.
- Tempi di risposta `[DA FORNIRE]`: si aggiungono solo se il cliente li garantisce («…ti risponderemo a {email} entro {tempo}.»).

**Errore di invio** · `[data-form-failure]` · rete, timeout o server; i dati restano nel form

| Elemento | Testo |
|---|---|
| Titolo | La richiesta non è stata inviata. |
| Testo | Non siamo riusciti a inviarla: può dipendere dalla connessione o dai nostri sistemi. I tuoi dati sono ancora qui: riprova tra poco. |
| Alternativa | Se non funziona, mandaci la stessa richiesta via email o chiamaci al +39 080 2466520. |
| Pulsante | Apri l’email già compilata (`[data-mailto-draft]`) |

Lo stesso pannello compare se il campo antispam è compilato: mai un finto successo.

**Modulo non ancora attivo** · `[data-form-fallback]` · nessun endpoint configurato

| Elemento | Testo |
|---|---|
| Titolo | Il modulo online non è ancora attivo. |
| Testo | La tua richiesta non è stata inviata, ma non devi riscriverla: abbiamo preparato un’email con i dati che hai inserito. Aprila e inviala dal tuo programma di posta. |
| Pulsante | Apri l’email già compilata (`[data-mailto-draft]`) |
| Alternativa | Se non si apre nulla, scrivici a info@itnode.it o chiamaci al +39 080 2466520 (mobile +39 335 1229785). |

Il form non simula l’invio (§ 23). Chi usa una webmail potrebbe non vedere aprirsi niente: per questo indirizzo e telefono restano scritti per esteso.

### 4.5 Email precompilata (`mailtoDraft` in `form.ts`)

Oggetto: `Richiesta dal sito ITnode · {interessi}`, oppure `Richiesta dal sito ITnode` se non ci sono interessi selezionati.

```text
Nome e cognome: {nome}
Email: {email}
Telefono: {telefono}
Azienda o ente: {azienda}
Mi interessa: {interessi}

Messaggio:
{messaggio}
```

Da allineare nel codice: oggi l’etichetta è «Azienda / Ente:» e manca «Messaggio:».

### 4.6 Risposta automatica

Solo se il sistema che riceve le richieste la prevede.

```text
Oggetto: Abbiamo ricevuto la tua richiesta

Gentile {nome e cognome},

grazie per averci scritto. Abbiamo ricevuto la tua richiesta e ti risponderemo a questo indirizzo.
[DA FORNIRE: tempi di risposta indicativi, solo se garantiti]

Ecco che cosa ci hai inviato:
{riepilogo dei campi compilati}

Se vuoi aggiungere qualcosa, rispondi pure a questa email.

ITnode
Via Sant’Anna, 34 – 70021 Acquaviva delle Fonti (BA)
+39 080 2466520 · info@itnode.it

Hai ricevuto questa email perché hai compilato il modulo di contatto sul sito di ITnode.
Informativa privacy: {URL di /privacy-policy/}
```

## 5. Video

| Controllo | Visibile (facoltativo) | Nome accessibile | Aggancio |
|---|---|---|---|
| Riproduci | Riproduci | Riproduci il video | `data-label-play` |
| Pausa | Pausa | Metti in pausa il video | `data-label-pause` |
| Audio disattivato, da attivare | Audio | Attiva l’audio | `data-label-unmute` |
| Audio attivo, da disattivare | Audio | Disattiva l’audio | `data-label-mute` |
| Errore di caricamento | Il video non si è caricato. Ricarica la pagina o riprova più tardi. | — | `data-state="error"` |
| Sottotitoli, se il video ha una traccia parlata | Sottotitoli | Attiva i sottotitoli · Disattiva i sottotitoli | `[DA VERIFICARE]` se c’è parlato, i sottotitoli sono obbligatori (WCAG 1.2.2) |
| Contenitore | — | `aria-label="Video: Città Digitali"` | Titolo e descrizione del video: copywriter-content |

**Nota per lo sviluppo.** Oggi `video.ts` cambia il nome del pulsante («Riproduci il video» / «Metti in pausa il video») e imposta anche `aria-pressed`. Uno screen reader leggerebbe «Metti in pausa il video, premuto»: due segnali in contrasto. Basta uno dei due: il nome che cambia, senza `aria-pressed`, oppure un nome fisso con `aria-pressed`. Consiglio il nome che cambia. Lo stesso vale per l’audio e per il marquee. Decide ux-designer, owner dell’accessibilità.

## 6. Marquee

| Controllo | Visibile | Nome accessibile | Aggancio |
|---|---|---|---|
| Pausa | Pausa | Metti in pausa lo scorrimento | `data-label-pause` |
| Ripresa | Riprendi | Riprendi lo scorrimento | `data-label-play` |

- Il controllo è obbligatorio se il movimento dura più di 5 secondi (WCAG 2.2.2).
- Le copie del testo che scorre sono `aria-hidden="true"` (mappa SEO, regole comuni). Il testo del marquee della Home è nel copy deck, sezione 4.
- Con `prefers-reduced-motion` il marquee resta fermo e il pulsante si può nascondere.

## 7. Anteprime immersive (`immersive.ts`)

I testi sono quelli del copy deck SIII (copywriter-content, sezione 6), adottati come standard del componente.

| Elemento | Testo | Aggancio |
|---|---|---|
| Pulsante | Avvia l’anteprima | `[data-immersive-load]`; nome accessibile: «Avvia l’anteprima di {nome}» |
| Nota sotto il pulsante | L’anteprima carica contenuti da {dominio}. | — |
| Titolo dell’iframe | Anteprima interattiva di {nome} | `data-embed-title` |
| Alternativa sempre visibile | Entra nell’esperienza ↗ | nuova scheda; nome accessibile: «Entra nell’esperienza di {nome} (si apre in una nuova scheda)» |
| Nota se il sito esterno usa cookie non tecnici | L’anteprima carica contenuti da {dominio}, che potrebbe usare cookie propri. Avviandola, accetti di caricarli. Cookie Policy | `[DA VERIFICARE con il consulente legale]` se basta come consenso specifico; altrimenti niente anteprima e solo il link «Entra nell’esperienza ↗» |

## 8. Link esterni e nuove schede

- Al nome accessibile si aggiunge « (si apre in una nuova scheda)», con lo spazio iniziale.
- Si aprono in una nuova scheda: esperienze SIII (§ 12), portali e portali dei luoghi, profilo LinkedIn e informativa privacy richiamata dal form.
- Icona ↗ in SVG con `aria-hidden="true"` (tone of voice, § 6).
- CTA ripetute con lo stesso testo: il nome accessibile comincia dal testo visibile e aggiunge la destinazione, per esempio «Esplora<span class="sr-only"> Acquaviva delle Fonti su acquavivadigitale.com (si apre in una nuova scheda)</span>» (mappa SEO, regole comuni).

## 9. Pagina 404

Title e meta description sono di seo-content: title «Pagina non trovata \| ITnode», `noindex`, stato HTTP 404, niente breadcrumb (sitemap UX, § 7).

| Elemento | Tag | Testo | Limite |
|---|---|---|---|
| Occhiello | p · mono | Errore 404 | — |
| Titolo | H1 | Questa pagina non esiste. | ≤ 40 (25) |
| Testo | p | Forse l’indirizzo contiene un errore, oppure la pagina è stata spostata. Tutto il resto è da esplorare: riparti da qui. | ≤ 140 (119) · Gulpease 72 |
| I tre mondi | variante compatta dei capitoli della Home | 01 SIII · Spazi reali. Esperienze digitali. · Esplora SIII →<br>02 Puglia Digitale · Un territorio. Migliaia di storie. · Scopri Puglia Digitale →<br>03 Città Digitali · Le attività del territorio, online senza perdere radici. · Esplora Città Digitali → | — |
| Contatto | p + a | Cercavi qualcos’altro? Parliamone → (a `/contatti/`) | — |
| Home | a | Torna alla home → | — |
| Segnalazione | p | Hai trovato un link che non funziona sul nostro sito? Segnalacelo a info@itnode.it. | — |

- Alternativa per l’H1: «Qui la mappa finisce.» (21). È più evocativa, ma dice meno chiaramente che la pagina non c’è.
- I link riusano le etichette della Home: stessa azione, stessa etichetta. `data-track`: `404-siii`, `404-puglia-digitale`, `404-citta-digitali`, `404-parliamone` (cro-specialist).

## 10. Cookie

### 10.1 Cookie Policy: testo introduttivo

È la versione per il lancio. Il piano di misurazione non prevede strumenti di analisi attivi (`src/scripts/track.ts`: niente richieste di rete, niente cookie, niente archiviazione). L’elenco dei cookie (nome, fornitore, finalità, durata) si compila dopo l’audit tecnico, e il testo lo valida chi ha la responsabilità legale `[DA FORNIRE]`.

> Questa pagina spiega quali cookie e strumenti simili usa il sito di ITnode, a che cosa servono e come puoi gestirli.
>
> Il sito non usa cookie di profilazione né cookie di statistica. Usa solo cookie tecnici, necessari a farlo funzionare: non richiedono il tuo consenso.
>
> Alcune pagine offrono anteprime di esperienze immersive ospitate su altri siti. Un’anteprima si carica solo se la avvii: da quel momento il sito che la ospita può usare i propri cookie, descritti nella sua informativa.
>
> I portali collegati sono siti distinti, ciascuno con la propria informativa.
>
> Per domande sui cookie e sui tuoi dati scrivi a info@itnode.it.
>
> Ultimo aggiornamento: {data}

- `[DA VERIFICARE con l’audit tecnico]` Se il sito non imposta nessun cookie, nemmeno tecnico, la seconda frase diventa: «Il sito non usa cookie di profilazione né cookie di statistica, e non ha bisogno di cookie per funzionare.»
- `[DA VERIFICARE]` L’indirizzo per le richieste privacy potrebbe essere un altro (per esempio la PEC).

### 10.2 Quando servirà il consenso

Al lancio il banner non serve: è richiesto solo per cookie o strumenti non tecnici. Se in futuro si attiva uno strumento di statistica o un altro cookie non tecnico, servono i testi del § 10.3, il pulsante «Modifica le preferenze sui cookie» nella Cookie Policy (sitemap UX, § 7) e questa variante della seconda frase della policy:

> Oltre ai cookie tecnici, il sito usa cookie di statistica solo se ci dai il consenso. Puoi darlo, negarlo o revocarlo quando vuoi da «Preferenze cookie», in fondo a ogni pagina.

### 10.3 Testi del banner, per quando servirà

| Elemento | Testo | Note |
|---|---|---|
| Titolo | Cookie | — |
| Testo | Usiamo cookie tecnici, necessari al funzionamento del sito. Con il tuo consenso useremmo anche cookie di statistica, per capire come viene usato il sito e migliorarlo. Puoi cambiare idea quando vuoi da «Preferenze cookie», in fondo a ogni pagina. | Più il link «Cookie Policy». Finalità da allineare al piano di misurazione. |
| Pulsanti | Accetta tutti · Rifiuta · Personalizza | «Accetta tutti» e «Rifiuta» hanno lo stesso peso visivo e stanno sullo stesso livello (Garante privacy, linee guida sui cookie del 2021). |
| Chiusura (X) | — | Nome accessibile: «Chiudi senza accettare». Chiudere equivale a rifiutare i cookie non tecnici. |
| Pannello delle preferenze | Necessari · Sempre attivi<br>Statistica<br>Salva le mie scelte | Gli interruttori non tecnici sono spenti di default. |
| Link nel footer | Preferenze cookie | Riapre il pannello (sitemap UX, § 6). |

## 11. Altri testi di servizio

| Elemento | Testo | Note |
|---|---|---|
| Breadcrumb | Home › {pagina} | `<nav aria-label="Percorso">` con un `<ol>`; l’etichetta della pagina è identica a quella del menu; separatore `aria-hidden`. Solo sulle pagine interne (sitemap UX, § 5). |
| Torna su (facoltativo) | Torna all’inizio ↑ | Link a `#top`; non previsto dalla sitemap. |
| Caricamento | Caricamento… | Per gli stati generici. |

## Ipotesi da validare

- Al lancio il sito non usa cookie di statistica: il piano di misurazione è predisposto ma spento (`track.ts`).
- Le anteprime immersive si caricano solo al clic. Se i siti incorporati impostano cookie non tecnici, la nota del § 7 basta come consenso specifico `[DA VERIFICARE]`.
- La sede operativa coincide con la sede legale (brief, S3).

## Domande aperte

- **Per il cliente** (tramite la sessione principale): conferma dell’etichetta «Email» al posto di «Email aziendale»; tempi di risposta garantiti, se ci sono; dati societari (denominazione esatta, REA, capitale sociale versato, eventuale socio unico); indirizzo per le richieste privacy; testo dell’informativa privacy.
- **Per ux-designer**: `aria-label` «Apri menu» e «Chiudi menu» in aggiunta al testo visibile (§ 2); `aria-pressed` insieme al nome che cambia su video e marquee (§ 5); descrittore di Città Digitali nel menu mobile (N12); forma unica del nome accessibile del logo.
- **Per seo-technical o web-performance-specialist**: l’audit dei cookie al lancio (hosting, CDN, font, video, anteprime), che decide la frase del § 10.1.

## Decisioni richieste

- **Etichetta del campo email** (utente, su proposta di cro-specialist): «Email *» oppure «Email aziendale *» con l’aiuto alternativo.
- **Nota di consenso sulle anteprime immersive** (consulente legale del cliente, poi creative-director): basta come consenso specifico, oppure niente iframe e solo link esterni.
