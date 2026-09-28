---
titolo: Microcopy e UX writing
owner: copywriter-brand
contributi: [cro-specialist, ux-designer, copywriter-content, seo-content, seo-technical, web-performance-specialist]
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/cro/strategia-conversione.md, docs/seo/mappa-keyword-url.md, docs/seo/dati-strutturati.md, docs/contenuti/alt-text.md, docs/contenuti/copy-deck/siii.md, docs/contenuti/copy-deck/contatti.md, src/data/site.ts, src/scripts/form.ts, src/scripts/video.ts, src/scripts/marquee.ts, src/scripts/header.ts, src/scripts/immersive.ts, src/scripts/track.ts]
---

# Microcopy e UX writing

Testi di interfaccia pronti da impaginare, agganciati agli attributi già presenti nel codice (`src/scripts/`). Recepiscono le decisioni di conversione di cro-specialist (`docs/cro/strategia-conversione.md`, §§ 3–8). Dove la sua proposta di microcopy e questo documento differiscono, vale questo documento: la scelta finale spetta a copywriter-brand, come indica il § 8 della strategia. Grafie e convenzioni: `docs/contenuti/tone-of-voice.md`.

## Come leggere questo documento

- **Visibile**: il testo a schermo. **Nome accessibile**: ciò che leggono gli screen reader, quando è diverso (`aria-label` o testo nascosto `sr-only`). Il nome accessibile comincia sempre con il testo visibile (WCAG 2.5.3).
- **Aggancio**: attributo o variabile nel codice attuale.
- `{…}`: valore da inserire in sviluppo. Le marcature `[DA …]` non si pubblicano.
- Percorsi con la barra finale, come prevedono le specifiche di seo-technical: `/siii/`, `/contatti/`.

## 1. Header e navigazione

| Elemento | Visibile | Nome accessibile e attributi | Note |
|---|---|---|---|
| Link per saltare la navigazione | Vai al contenuto principale | `href="#contenuto"` sul `<main id="contenuto">` | Primo elemento raggiungibile con Tab; nascosto finché non riceve il focus. |
| Logo | immagine | Testo alternativo in `alt-text.md`: «ITnode – Home» | La mappa SEO scrive «ITnode, home»: va usata una sola forma (proposta: quella di `alt-text.md`). |
| Navigazione | — | `<nav aria-label="Menu principale">` | — |
| Voci | SIII · Puglia Digitale · Città Digitali · Contatti | `aria-current="page"` sulla pagina attiva | Come `nav` in `src/data/site.ts`. |
| CTA dell’header | Parliamone | Porta a `#richiesta` sulle pagine con form, altrimenti a `/contatti/`; `data-track="header-parliamone"` | Evidenziata, senza freccia (cro-specialist, § 3). |
| Sigla SIII (facoltativo) | SIII | `SIII<span class="sr-only"> – Siti Interattivi Immersivi</span>` | Da provare con NVDA e VoiceOver: la sigla potrebbe essere letta come una parola. |

## 2. Menu mobile a schermo intero

| Elemento | Visibile | Nome accessibile | Aggancio |
|---|---|---|---|
| Pulsante di apertura | Menu | Apri menu | `[data-menu-open]`, con `aria-expanded` |
| Pulsante di chiusura | Chiudi | Chiudi menu | `[data-menu-close]` |
| Finestra | — | `aria-label="Menu"` sul `<dialog>` | `[data-mobile-menu]` |
| Voci | SIII · Puglia Digitale · Città Digitali · Contatti | — | — |
| CTA dopo le voci | Parliamone | — | `menu-mobile-parliamone` |
| Canali diretti | Chiama +39 080 2466520 · Scrivi a info@itnode.it | — | `tel:`, `mailto:`; `menu-mobile-telefono`, `menu-mobile-email` |

**Descrittori delle voci** (facoltativi, sotto il nome, dentro lo stesso link, al massimo 40 caratteri):

| Voce | Descrittore |
|---|---|
| SIII | Siti Interattivi Immersivi |
| Puglia Digitale | Un territorio da esplorare |
| Città Digitali | Le attività del territorio, online |
| Contatti | Parliamo del prossimo spazio digitale |

## 3. Footer

| Elemento | Testo | Note |
|---|---|---|
| Payoff sotto il logo | Esperienze digitali immersive per imprese e territori. | È la stessa riga di posizionamento della hero. |
| Titolo della navigazione | Esplora | `<nav aria-label="Esplora">`; voci: SIII · Puglia Digitale · Città Digitali · Contatti |
| Titolo dei recapiti | Contatti | — |
| Sede | Sede operativa<br>Via Sant’Anna, 34<br>70021 Acquaviva delle Fonti (BA) | Se sede legale e operativa coincidono: «Sede legale e operativa» (brief, S3). |
| Telefono | Telefono · +39 080 2466520 | `tel:+390802466520`; `footer-telefono` |
| Mobile | Mobile · +39 335 1229785 | `tel:+393351229785` |
| Email | Email · info@itnode.it | `mailto:`; `footer-email` |
| LinkedIn | LinkedIn · Giacomo Lenoci ↗ | Nome accessibile: «Giacomo Lenoci su LinkedIn (si apre in una nuova scheda)». È un profilo personale e va presentato come tale (brief, S6). |
| Titolo dei portali | Portali | — |
| Portali | Città Digitali · cittadigitali.it ↗<br>Puglia Digitale · lapugliadigitale.it ↗ | Il link è il dominio, così non si confonde con le voci di navigazione che hanno lo stesso nome. Nome accessibile: «cittadigitali.it, portale di Città Digitali (si apre in una nuova scheda)». `footer-portale-citta-digitali`, `footer-portale-puglia-digitale` |
| Link legali | Privacy Policy · Cookie Policy | «Gestisci i cookie» si aggiunge solo se arriva un banner di consenso (§ 10.3). |
| Torna su (facoltativo) | Torna all’inizio ↑ | Link a `#top`; la freccia è `aria-hidden`. |

**Riga legale e copyright**

> © {anno} ITNODE S.r.l. · Sede legale: Via Sant’Anna, 34 – 70021 Acquaviva delle Fonti (BA) · P.IVA, C.F. e iscrizione al Registro delle imprese di Bari n. 08937270729 · REA BA-{numero} · Capitale sociale € {importo} i.v.

- `{anno}` è dinamico. Con un sito statico si aggiorna a ogni build: serve una build a gennaio, oppure uno script che aggiorni l’anno nel browser.
- La riga deve essere completa al go-live (soglia 5 di CLAUDE.md, art. 2250 del Codice civile). Finché i dati non sono confermati, `rea` e `shareCapital` restano vuoti in `src/data/site.ts` e i due elementi non compaiono.

| Dato | Valore | Stato e fonte |
|---|---|---|
| Ragione sociale | ITNODE S.r.l. | `[DA VERIFICARE: grafia da visura]` ufficiocamerale.it e atoka.io, dagli estratti di ricerca del 2026-09-28 |
| P.IVA | 08937270729 | `[DA VERIFICARE]` stesse fonti |
| C.F. e numero di iscrizione al Registro delle imprese | 08937270729 | `[DA VERIFICARE]` per le S.r.l. di norma coincidono con la P.IVA |
| Registro delle imprese | Bari | `[DA VERIFICARE]` sede nel comune di Acquaviva delle Fonti (BA) |
| REA | BA-660035 | `[DA VERIFICARE]` valore letto solo nell’estratto di un risultato di ricerca (atoka.io / ufficiocamerale.it, 2026-09-28): la pagina non è raggiungibile dal nostro ambiente |
| Capitale sociale | € 10.000,00 | `[DA VERIFICARE]` stessa origine; «i.v.» solo se interamente versato |
| Socio unico | — | `[DA VERIFICARE]` se la società è unipersonale, va indicato |

## 4. Modulo di contatto

Il componente è lo stesso su SIII, Puglia Digitale, Città Digitali e Contatti. Titolo e introduzione del form li scrive, pagina per pagina, chi cura la pagina (copywriter-content). Qui c’è tutto il resto.

### 4.1 Testi fissi

| Elemento | Testo | Aggancio e note |
|---|---|---|
| Nome accessibile del form | il titolo del form della pagina | `aria-labelledby` sul titolo. Se il titolo manca: `aria-label="Modulo di contatto"`. |
| Riga sotto l’introduzione | La richiesta è senza impegno. I campi con * sono obbligatori. | L’asterisco nelle etichette è `aria-hidden`: l’obbligo lo comunica `required`. |
| Avviso prima dei campi, solo se il modulo non è attivo | Il modulo online non è ancora attivo. Per ora scrivici a info@itnode.it o chiamaci al +39 080 2466520. Se compili i campi, all’invio prepariamo un’email già pronta da spedire. | Da rendere in build quando `data-endpoint` è vuoto (cro-specialist, § 7). Così nessuno compila il modulo credendo che parta. Gulpease 73. |
| Pulsante di invio | Invia richiesta | Testo del cliente (§ 23). |
| Stato di invio | Invio in corso… | `data-msg-sending` sul form, letto da `[data-form-status]`. Il pulsante resta «Invia richiesta» con `aria-disabled="true"`. |
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
| Un’azione, in base alla pagina | /siii/: Entra in un’esperienza → (a `#esempi`) · /puglia-digitale/ e /citta-digitali/: Visita il portale ↗ · /contatti/: Esplora SIII → · Scopri Puglia Digitale → · Esplora Città Digitali → |

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

**Nota per lo sviluppo.** Oggi `video.ts` cambia il nome del pulsante («Riproduci il video» / «Metti in pausa il video») e imposta anche `aria-pressed`. Uno screen reader leggerebbe «Metti in pausa il video, premuto»: due segnali in contrasto. Basta uno dei due: il nome che cambia, senza `aria-pressed`, oppure un nome fisso con `aria-pressed`. Consiglio il nome che cambia. Lo stesso vale per l’audio e per il marquee. La decisione spetta a ux-designer (accessibilità).

## 6. Marquee

| Controllo | Visibile | Nome accessibile | Aggancio |
|---|---|---|---|
| Pausa | Pausa | Metti in pausa lo scorrimento | `data-label-pause` |
| Ripresa | Riprendi | Riprendi lo scorrimento | `data-label-play` |

- Il controllo è obbligatorio se il movimento dura più di 5 secondi (WCAG 2.2.2).
- Le copie del testo che scorre sono `aria-hidden="true"` (mappa SEO, regole comuni).
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
- Segno visivo: ↗ con `aria-hidden="true"` (tone of voice, § 6).
- CTA ripetute con lo stesso testo: il nome accessibile comincia dal testo visibile e aggiunge la destinazione, per esempio «Esplora<span class="sr-only"> Acquaviva delle Fonti su acquavivadigitale.com (si apre in una nuova scheda)</span>» (mappa SEO, regole comuni).

## 9. Pagina 404

Title e meta description sono di seo-content: title «Pagina non trovata \| ITnode», `noindex`, stato HTTP 404.

| Elemento | Tag | Testo |
|---|---|---|
| Occhiello | p | Errore 404 |
| Titolo | H1 | Questa pagina non esiste. Il resto è tutto da esplorare. |
| Testo | p | Forse l’indirizzo contiene un errore di battitura, oppure la pagina è stata spostata. Riparti da qui: |
| Link | ul | Esplora SIII → · Scopri Puglia Digitale → · Esplora Città Digitali → · Torna alla home → |
| Contatto | p + a | Cercavi qualcos’altro? Parliamone → (a `/contatti/`) |
| Segnalazione | p | Hai trovato un link che non funziona sul nostro sito? Segnalacelo a info@itnode.it. |

- Alternativa per l’H1: «Qui la mappa finisce. Il resto è da esplorare.» Più evocativa, ma dice meno chiaramente che la pagina non c’è.
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

### 10.2 Banner

Al lancio non serve: il banner è richiesto solo per cookie o strumenti non tecnici. Se in futuro si attiva uno strumento di statistica o altri cookie non tecnici, servono i testi del § 10.3 e la variante della policy qui sotto.

> Oltre ai cookie tecnici, il sito usa cookie di statistica solo se ci dai il consenso. Puoi darlo, negarlo o revocarlo quando vuoi da «Gestisci i cookie», in fondo a ogni pagina.

### 10.3 Testi del banner, per quando servirà

| Elemento | Testo | Note |
|---|---|---|
| Titolo | Cookie | — |
| Testo | Usiamo cookie tecnici, necessari al funzionamento del sito. Con il tuo consenso useremmo anche cookie di statistica, per capire come viene usato il sito e migliorarlo. Puoi cambiare idea quando vuoi da «Gestisci i cookie», in fondo a ogni pagina. | Più il link «Cookie Policy». Finalità da allineare al piano di misurazione. |
| Pulsanti | Accetta tutti · Rifiuta · Personalizza | «Accetta tutti» e «Rifiuta» hanno lo stesso peso visivo e stanno sullo stesso livello (Garante privacy, linee guida sui cookie del 2021). |
| Chiusura (X) | — | Nome accessibile: «Chiudi senza accettare». Chiudere equivale a rifiutare i cookie non tecnici. |
| Pannello delle preferenze | Necessari · Sempre attivi<br>Statistica<br>Salva le mie scelte | Interruttori non tecnici spenti di default. |
| Link nel footer | Gestisci i cookie | Riapre il pannello. |

## 11. Altri testi di servizio

| Elemento | Testo | Note |
|---|---|---|
| Breadcrumb, se visibile | Home › {pagina} | `<nav aria-label="Percorso di navigazione">`; separatore `aria-hidden`. Prima voce «Home» come nel copy deck SIII, oppure «ITnode» come propone seo-content: da allineare. |
| Torna su | Torna all’inizio ↑ | facoltativo |
| Caricamento | Caricamento… | per stati generici |

## Ipotesi da validare

- Al lancio il sito non usa cookie di statistica: il piano di misurazione è predisposto ma spento (`track.ts`).
- Le anteprime immersive si caricano solo al clic. Se i siti incorporati impostano cookie non tecnici, la nota del § 7 basta come consenso specifico: `[DA VERIFICARE]`.
- La sede operativa coincide con la sede legale (brief, S3).

## Domande aperte

- **Per il cliente** (tramite la sessione principale): conferma dell’etichetta «Email» al posto di «Email aziendale»; tempi di risposta garantiti, se ci sono; dati societari (denominazione esatta, REA, capitale sociale versato, eventuale socio unico); indirizzo per le richieste privacy; testo dell’informativa privacy.
- **Per ux-designer**: `aria-pressed` insieme al nome che cambia su video e marquee (§ 5); descrittori delle voci nel menu mobile.
- **Per copywriter-content**: una sola forma per il nome accessibile del logo («ITnode – Home» in `alt-text.md`, «ITnode, home» nella mappa SEO); prima voce del breadcrumb.
- **Per seo-technical o web-performance-specialist**: l’audit dei cookie al lancio (hosting, CDN, font, video), che decide la frase del § 10.1.

## Decisioni richieste

- **Etichetta del campo email** (utente, su proposta di cro-specialist): «Email *» oppure «Email aziendale *» con l’aiuto alternativo.
- **Nota di consenso sulle anteprime immersive** (consulente legale del cliente, poi creative-director): basta come consenso specifico, oppure niente iframe e solo link esterni.
