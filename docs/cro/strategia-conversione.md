---
titolo: Strategia di conversione
owner: cro-specialist
contributi: []
stato: bozza
versione: 0.5
aggiornato: 2026-10-07
fonti: [docs/brief/linee-guida.md, src/scripts/form.ts, src/data/site.ts, src/data/asset-slots.ts, src/assets/images/, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/decisioni/006-endpoint-del-form.md, docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md, docs/review/2026-10-07-schermate-siii-cro-specialist.md, inventario dei cta_id nelle build del 2026-09-28, del 2026-10-05 e del 2026-10-07]
---

# Strategia di conversione

> **In breve**
> - La conversione principale è la **richiesta inviata dal form**. I form sono quattro: in fondo a /siii, /puglia-digitale e /citta-digitali, più quello di /contatti. Conversioni secondarie: clic su telefono ed email. Micro-conversioni: ingresso in un'esperienza SIII, visita ai portali.
> - Ogni vista ha **una sola CTA primaria**. Le CTA che portano al form puntano all'ancora `#richiesta`, e lì «Mi interessa» è già preselezionato sul prodotto della pagina.
> - CTA dell'header: **«Parliamone»**. Sulle pagine che hanno un form porta a `#richiesta`, sulle altre a `/contatti`.
> - Il campo email accetta **qualsiasi indirizzo valido**. Proposta: etichettarlo «Email» invece di «Email aziendale».
> - Se l'endpoint manca non si simula nulla: un avviso compare **prima dei campi**, e il fallback già presente in `form.ts` offre l'email precompilata e il telefono.
> - La fiducia si costruisce solo con prove vere: esperienze e portali reali, il percorso del fondatore, la sede in Puglia. **Tre foto hanno un simbolo compatibile con il watermark di Google Gemini**: prima di usarle come prova serve una verifica (§9).
> - **v0.2.** Le tabelle dei `cta_id` (§3–4) sono allineate alla build del 2026-09-28, con il nuovo `contatti-persona-percorso` e i link dentro il form. Le opzioni per l'endpoint sono nell'ADR 006, in stato di proposta (§7).
> - **v0.3 e 0.4 (2026-10-05).** Il portale di Città Digitali è **cittàdigitali.it**, con l'accento; nei link si scrive in punycode, `https://xn--cittdigitali-19a.it`. `cittadigitali.it`, senza accento, è un progetto omonimo di altri. Il portale di Puglia Digitale è lapugliadigitale.it, confermato dall'utente lo stesso giorno. Su /citta-digitali/ c'è un nuovo link «Tutte le città sul portale ↗» (`cd-portale-tutte-le-citta`, §4).
> - **v0.5 (2026-10-07).** Le schermate SIII sono nel sito. Su /siii/ anche la schermata di ogni esempio apre l'esperienza in una nuova scheda (`siii-showcase-<id>-schermata`, §4). Resta il consenso delle imprese (A7, §9).

## 1. Conversioni per audience

| Audience [IPOTESI: da confermare nel brief consolidato] | Che cosa cerca | Conversione principale | Secondarie e micro |
|---|---|---|---|
| Imprese interessate al SIII (strutture ricettive, negozi, produttori, showroom) | capire in cosa differisce da un tour 360°, vedere esempi, conoscere processo e tempi | form «Richiedi un'offerta» su /siii | telefono o email; ingresso in un'esperienza; anteprima |
| Imprese che vogliono entrare nei portali (Puglia e altre città) | cosa ottengono e chi ne fa già parte | form su /puglia-digitale e /citta-digitali | telefono o email; visita al portale e ai portali cittadini |
| Enti e Comuni [IPOTESI: la suggerisce il campo «Azienda / Ente»] | capire il progetto di destination marketing, parlare con una persona | form su /contatti, PD o CD | telefono |
| Visitatori, cittadini, turisti | esplorare il territorio | nessuna: non sono clienti di ITnode | visita ai portali, che per le imprese vale anche come prova |

Non fisso obiettivi numerici finché mancano [DA FORNIRE: valore medio di un contratto SIII e di un'adesione, contatti al mese oggi e obiettivo, chi gestisce le richieste, durata del ciclo di vendita].

## 2. Regole comuni per le CTA

1. **Una CTA primaria per vista.** Accanto può esserci al massimo una secondaria, in forma di link testuale.
2. **L'etichetta descrive l'azione e mantiene la promessa.** Una CTA che porta al form non deve sembrare un link al portale, e viceversa.
3. **La freccia indica dove si va**: `→` per un'altra pagina del sito, `↓` per un'ancora nella stessa pagina, `↗` per un sito esterno. Le icone hanno `aria-hidden="true"`.
4. **Link esterni** (esperienze, portali, LinkedIn, mappa): `target="_blank" rel="noopener"`, **senza `noreferrer`**, così i portali di ITnode vedono arrivare il traffico da itnode.it. Il nome accessibile contiene la destinazione e «(si apre in una nuova scheda)», per esempio «Esplora Monopoli (si apre in una nuova scheda)».
5. **Ancora del form**: la sezione del form ha `id="richiesta"` e `scroll-margin-top` pari all'altezza dell'header sticky. Il titolo del form ha `tabindex="-1"` e riceve il focus quando si arriva dall'ancora.
6. **Click-to-call**: `tel:+390802466520` e `tel:+393351229785` (già in `site.ts`). Il numero resta visibile per intero anche su desktop.
7. **Tracciamento**: ogni CTA porta gli attributi `data-*` definiti in `docs/cro/piano-misurazione.md` §5. Il `cta_id` di ogni CTA è nelle tabelle che seguono; il valore di `cta_location` è nell'elenco chiuso del piano, §5.1. I `cta_id` sono chiavi stabili: dopo il lancio non si rinominano.

## 3. Header e menu mobile

| Elemento | Ruolo | Destinazione | `cta_id` |
|---|---|---|---|
| Logo | navigazione | `/` | — |
| SIII · Puglia Digitale · Città Digitali · Contatti | navigazione | pagine | — (evento `nav_click`, opzionale) |
| **Parliamone**, evidenziata | CTA primaria dell'header | `#richiesta` su /siii, /puglia-digitale, /citta-digitali e /contatti; `/contatti` su home, pagine legali e 404 | `header-parliamone` |
| Menu a schermo intero: le quattro voci, poi **Parliamone**, poi «Chiama +39 080 2466520» e «Scrivi a info@itnode.it» | CTA e canali alternativi | come sopra; `tel:`, `mailto:` | `menu-mobile-parliamone`, `menu-mobile-telefono`, `menu-mobile-email` |

- **Perché «Parliamone».** «Contatti» è già una voce di menu. «Parliamone» separa l'azione dal luogo, riprende l'hero di /contatti («Parliamo del prossimo spazio digitale») e chiede un impegno minimo. «Contattaci» resta la CTA di chiusura di Puglia Digitale, come vuole il brief.
- **Destinazione diversa per pagina.** Su una pagina prodotto, `#richiesta` porta al form di quella pagina con il contesto già scelto: un passaggio in meno e nessuna perdita di contesto. Nel componente Header basta una prop (`ctaHref`).
- **Barra mobile** [IPOTESI da verificare con ui-designer]: se da 360 px in su c'è spazio, «Parliamone» compare in forma compatta nella barra sticky accanto a «Menu». Altrimenti resta solo nel menu.

## 4. Gerarchia delle CTA per pagina

### Home `/`
| Sezione | CTA | Ruolo | Destinazione | `cta_id` |
|---|---|---|---|---|
| Hero | nessuna CTA e nessun invito allo scorrimento: la hero deve respirare, e «Parliamone» è nell'header (direzione visiva, §5) | — | — | — |
| Capitolo 01 SIII | Esplora SIII → | primaria del capitolo | `/siii` | `home-capitolo-siii` |
| Capitolo 02 | Scopri Puglia Digitale → | primaria del capitolo | `/puglia-digitale` | `home-capitolo-puglia-digitale` |
| Capitolo 03 | Esplora Città Digitali → | primaria del capitolo | `/citta-digitali` | `home-capitolo-citta-digitali` |
| Fondatore | nessuna CTA commerciale dentro il racconto; il profilo LinkedIn nella timeline ↗ | uscita (`social`) | profilo LinkedIn | `home-fondatore-linkedin` |
| **Chiusura**, dopo la frase del fondatore | Parliamone →, con telefono ed email come alternative | primaria + alternative | `/contatti`, `tel:`, `mailto:` | `home-chiusura-parliamone`, `home-chiusura-telefono`, `home-chiusura-email` |

Nei capitoli della home niente link esterni: prima si approfondisce sul sito, i portali stanno nelle pagine dedicate.

### SIII `/siii`
| Sezione | CTA | Ruolo | Destinazione | `cta_id` |
|---|---|---|---|---|
| Hero | **Esplora gli esempi ↓** | primaria | `#esempi` (sezione Esempi) | `siii-hero-esempi` |
| Hero | Richiedi un'offerta ↓ | secondaria, link testuale | `#richiesta` | `siii-hero-offerta` |
| Dopo i benefici | Richiedi un'offerta ↓ | primaria della vista | `#richiesta` | `siii-benefici-offerta` |
| Esempi (`#esempi`), tre esperienze | Entra nell'esperienza ↗ | uscita in nuova scheda | URL in `siiiShowcase` | `siii-showcase-masseria-santella`, `siii-showcase-maison-mimina`, `siii-showcase-dl-natura-dentro` |
| Esempi, schermata d'apertura con il play (dal 2026-10-07) | tutta la schermata è un link, solo per il puntatore: tastiera e screen reader usano il CTA | stessa uscita del CTA, in nuova scheda (decisione dell'utente) | URL in `siiiShowcase` | lo stesso id del CTA con `-schermata`, per esempio `siii-showcase-masseria-santella-schermata` |
| Esempi, anteprima in iframe | Avvia l'anteprima | coinvolgimento | facade che carica l'iframe | **non attiva al lancio**: evento `preview_start` sospeso (piano §4) |
| Chiusura | «La tua azienda può diventare un'esperienza.» seguita dal form, **senza bottone**: la chiusura è il form stesso (§5) | primaria | form con SIII preselezionato | nessun `cta_id`; evento `form_submit` |
| Pannello di successo del form | Torna agli esempi ↑ | ritorno alla prova | `#esempi` | `richiesta-siii-successo-esempi` |

Perché la hero porta agli esempi: il SIII è un prodotto nuovo e la prova più forte è provarlo. Chi è già convinto ha comunque il link secondario al form.

### Puglia Digitale `/puglia-digitale`
| Sezione | CTA | Ruolo | Destinazione | `cta_id` |
|---|---|---|---|---|
| Hero | **Visita il portale ↗** | primaria (uscita, nuova scheda) | lapugliadigitale.it | `pd-hero-portale` |
| Hero | link testuale verso il form (etichetta attuale nel copy deck: «Aderisci a Puglia Digitale ↓») | secondaria | `#richiesta` | `pd-hero-richiesta` |
| Il progetto | link in linea a lapugliadigitale.it ↗ | uscita | portale | `pd-progetto-portale` |
| Numeri | nessuna CTA; nota con fonte e anno | — | — | — |
| I luoghi, tre città | Esplora ↗ | uscita | portali cittadini in `pugliaPlaces` | `pd-luoghi-acquaviva`, `pd-luoghi-gravina`, `pd-luoghi-monopoli` |
| Perché aderire (01–04) | nessuna all'interno | — | — | — |
| Chiusura | «Porta la tua impresa dentro Puglia Digitale.» seguita dal form, **senza bottone e senza uscita verso il portale** (review di conversione, oss. 7, applicata) | primaria | form con Puglia Digitale preselezionato | nessun `cta_id`; evento `form_submit` |

Il portale di Puglia Digitale è **lapugliadigitale.it**: confermato dall'utente il 2026-10-05. Il sito lo linka già come `https://www.lapugliadigitale.it` (`src/data/site.ts`). Nei report si filtra comunque su `destination_id` `puglia-digitale` (piano di misurazione, §4).

### Città Digitali `/citta-digitali`
| Sezione | CTA | Ruolo | Destinazione | `cta_id` |
|---|---|---|---|---|
| Hero | **Visita il portale ↗** | primaria (uscita, nuova scheda) | cittàdigitali.it; nel link `https://xn--cittdigitali-19a.it` | `cd-hero-portale` |
| Hero | link testuale verso il form (etichetta attuale nel copy deck: «Aderisci a Città Digitali ↓») | secondaria | `#richiesta` | `cd-hero-richiesta` |
| L'Italia in un unico portale (`#portale`), tre città | Esplora ↗ | uscita; `cta_location` `luoghi`, come su PD | portali in `italyPlaces` | `cd-citta-varese`, `cd-citta-altamura`, `cd-citta-caltanissetta` |
| L'Italia in un unico portale, dopo lo statement | Tutte le città sul portale ↗ (dal 2026-10-05) | uscita, prova dell'estensione della rete; `cta_location` `luoghi`, corretto il 2026-10-05 (piano di misurazione, §5.1) | pagina «Tutte le città» del portale, `https://xn--cittdigitali-19a.it/tutte-le-citta/` | `cd-portale-tutte-le-citta` |
| Video | avvio e audio | coinvolgimento | — | eventi `video_*` |
| Dal locale al nazionale | nessuna | — | — | — |
| Chiusura | «La tua azienda merita…» seguita dal form, **senza bottone** | primaria | form con Città Digitali preselezionato | nessun `cta_id`; evento `form_submit` |

Il titolo del form di CD, «Entra in Città Digitali», si può leggere anche come «visita il portale». L'introduzione del form scioglie il dubbio dicendo cosa succede (§8).

- **Dominio.** Nel testo si scrive «cittàdigitali.it»; nei link `https://xn--cittdigitali-19a.it`, la forma decisa da seo-technical. `cittadigitali.it`, senza accento, è di un progetto omonimo: non va mai né nei link né nei testi (conferma dell'utente del 2026-10-05).
- **Il link «Tutte le città sul portale» va bene anche per la conversione.** Mostra l'estensione della rete con la fonte del cliente, senza numeri da verificare. Sta a metà pagina, lontano dal form, e si apre in una nuova scheda. La chiusura resta senza uscite verso il portale, come su PD. Nella Home, invece, nessun link esterno nel capitolo 03: resta la sola CTA «Esplora Città Digitali →».

### Contatti `/contatti`
| Blocco | CTA | Ruolo | Destinazione | `cta_id` |
|---|---|---|---|---|
| Hero «Parliamo del prossimo spazio digitale.» | — | — | — | — |
| Recapiti (`#recapiti`), subito sotto la hero (compatti su mobile) | Telefono · Mobile · Email | alternative a basso attrito | `tel:`, `mailto:` | `contatti-telefono`, `contatti-mobile`, `contatti-email` |
| Recapiti, sede operativa | Apri in Google Maps ↗: **un link, non una mappa incorporata** (vedi piano di misurazione §1) | uscita | URL di Google Maps | `contatti-mappa` |
| Recapiti, LinkedIn | «Giacomo Lenoci su LinkedIn ↗»: il profilo è personale, non una pagina aziendale | uscita | profilo LinkedIn | `contatti-linkedin` |
| Form | **Invia richiesta** | primaria | endpoint | evento `form_submit` |
| Persona | «Scopri il suo percorso →», dopo nome e ruolo del fondatore (verdetto G4, N5) | approfondimento, fiducia | `/#fondatore` | `contatti-persona-percorso` |
| Portali (`#portali`) | Città Digitali ↗ · Puglia Digitale ↗ | uscita | portali | `contatti-portale-citta-digitali`, `contatti-portale-puglia-digitale` |

Tutti gli elementi di Recapiti hanno `cta_location` `recapiti`; il link della sezione Persona ha `persona`; i portali `portali` (piano, §5.1).

Su desktop il form e i canali stanno affiancati e si vedono senza scorrere. Su mobile vengono prima i canali (tre righe da toccare), poi il form. [IPOTESI: se il team preferisce ricevere richieste scritte piuttosto che telefonate, l'ordine si inverte. DA FORNIRE.]

### Footer, pagine legali e 404
- **Footer**: telefono ed email come link (`footer-telefono`, `footer-email`), portali con ↗ (`footer-portale-citta-digitali`, `footer-portale-puglia-digitale`), dati societari obbligatori, link a Privacy Policy e Cookie Policy.
- **Privacy e Cookie Policy**: nessuna CTA oltre a quella dell'header; l'indirizzo email nel testo è tracciato come `legale-email` (`contact_click`, `cta_location` `sezione`).
- **404**: i tre mondi (→) e «Parliamone» verso `/contatti` (`404-siii`, `404-puglia-digitale`, `404-citta-digitali`, `404-parliamone`), più l'email per segnalare un link rotto (`404-email`).

### Link dentro il form

Hanno tutti `cta_location` `form`. `<form_id>` vale `richiesta-siii`, `richiesta-puglia-digitale`, `richiesta-citta-digitali` o `richiesta-contatti`.

| Dove | Link | `cta_id` | Evento |
|---|---|---|---|
| Avviso prima dei campi, se manca l'endpoint | email, telefono | `<form_id>-avviso-email`, `<form_id>-avviso-telefono` | `contact_click` |
| Sotto il form | telefono | `<form_id>-telefono` | `contact_click` |
| Pannello di successo | email, telefono | `<form_id>-successo-email`, `<form_id>-successo-telefono` | `contact_click` |
| Pannello di successo, azione di contesto | SIII: «Torna agli esempi ↑»; PD e CD: il portale ↗; Contatti: i tre mondi | `richiesta-siii-successo-esempi`; `<form_id>-successo-portale`; `richiesta-contatti-successo-siii`, `richiesta-contatti-successo-puglia-digitale`, `richiesta-contatti-successo-citta-digitali` | `cta_click`; `outbound_click` per il portale |
| Pannello d'errore | telefono, bozza email | `<form_id>-errore-telefono`, `<form_id>-errore-bozza-email` | `contact_click` |
| Pannello di ripiego, senza endpoint | bozza email, email, telefono, cellulare | `<form_id>-ripiego-bozza-email`, `<form_id>-ripiego-email`, `<form_id>-ripiego-telefono`, `<form_id>-ripiego-mobile` | `contact_click` |

Finché manca l'endpoint, i `cta_id` che finiscono in `-bozza-email` sono la conversione di riferimento: si contano come «richiesta preparata», non come richiesta certa.

## 5. Form: posizione e preselezione

| Pagina | Posizione | `form_id` | Preselezione di «Mi interessa» |
|---|---|---|---|
| /siii | in fondo, dentro la sezione di chiusura | `richiesta-siii` | `siii` |
| /puglia-digitale | in fondo, dopo «Perché aderire» | `richiesta-puglia-digitale` | `puglia-digitale` |
| /citta-digitali | in fondo, dopo la CTA di chiusura | `richiesta-citta-digitali` | `citta-digitali` |
| /contatti | subito dopo i canali diretti | `richiesta-contatti` | nessuna, salvo `?interesse=` (valori ammessi, anche più d'uno separati da virgola) |

- **La preselezione si fa in build**: il componente scrive `checked` (per esempio con `preselect={['siii']}`) e non serve JavaScript. Il parametro `?interesse=` su /contatti è un miglioramento progressivo da aggiungere a `form.ts`, utile per QR code e campagne.
- **Non è una casella preselezionata vietata.** Non si tratta di un consenso né di un'aggiunta a pagamento: riflette il contesto della pagina, è visibile e si cambia con un clic. Le caselle di consenso restano sempre vuote.
- Se il form segue subito la CTA di chiusura ed è già visibile, la CTA può diventare il titolo del form: meglio evitare un bottone che fa scorrere la pagina di pochi pixel.
- Il form non va dentro sezioni sticky o con scroll controllato, e nessun reveal deve ritardare l'uso dei campi.
- Layout: una sola colonna, etichette sopra i campi, bottone a tutta larghezza su mobile, campi con testo di almeno 16 px (sotto quella soglia iOS ingrandisce la pagina).

## 6. Campi del form (brief §23): revisione

| Brief | Etichetta proposta | `name` in `form.ts` | Obbligatorio | Attributi | Validazione e messaggio |
|---|---|---|---|---|---|
| Nome e Cognome * | Nome e cognome | `nome` | sì | `autocomplete="name"`, `maxlength="100"` | vuoto → «Inserisci nome e cognome.» |
| Email aziendale * | **Email** | `email` | sì | `type="email"`, `autocomplete="email"`, `spellcheck="false"`, `autocapitalize="off"`, `pattern="[^@\s]+@[^@\s]+\.[^@\s]{2,}"` | qualsiasi indirizzo valido; **nessun blocco** di domini gratuiti o PEC → «Controlla l'email: per esempio nome@azienda.it» (stesso testo in `data-msg-type` e `data-msg-pattern`) |
| Telefono | Telefono *(facoltativo)* | `telefono` | no | `type="tel"`, `autocomplete="tel"`, `pattern="[0-9 +\-\.\(\)\/]{6,20}"` | solo se compilato → «Controlla il numero: usa cifre, spazi e +, per esempio +39 080 1234567.» |
| Nome Azienda / Ente | Azienda o ente *(facoltativo)* | `azienda` | no | `autocomplete="organization"` | — |
| Mi interessa | «Mi interessa», in `fieldset` con `legend`; suggerimento «Puoi sceglierne più di uno.» | `interesse` | no | checkbox con valori `siii`, `puglia-digitale`, `citta-digitali` | — |
| Messaggio | Messaggio *(facoltativo)* | `messaggio` | no | `maxlength="2000"` | — |
| Checkbox privacy * | Ho letto l'[informativa privacy] | `privacy` [DA VERIFICARE nel componente] | sì | mai preselezionata; il link si apre in una nuova scheda per non perdere i dati già inseriti | non spuntata → «Per inviare la richiesta conferma di aver letto l'informativa privacy.» |

I due `pattern` sono stati provati con i flag `u` e `v`: i browser attuali compilano l'attributo `pattern` con il flag `v`, che rifiuta alcune scritture accettate da `u`.

**«Email aziendale» deve accettare qualsiasi email valida?** Sì. Molte delle imprese a cui si rivolge ITnode (strutture ricettive, negozi, artigiani) usano Gmail, Libero o Alice. Gli enti usano indirizzi istituzionali o PEC. A chi risponde basta un indirizzo che funzioni. L'aggettivo «aziendale» fa sorgere il dubbio «la mia Gmail va bene?», cioè attrito, senza alcun beneficio: il vincolo comunque non verrebbe applicato. Per qualificare il contatto c'è già il campo «Azienda o ente». Se il cliente vuole tenere «aziendale», bisogna aggiungere «va bene anche un indirizzo personale», che è una soluzione peggiore.

**Casella privacy.** Rispondere a una richiesta si basa sulla richiesta stessa (misure precontrattuali), non sul consenso. Quindi la casella è una presa visione («Ho letto l'informativa»), non un «acconsento». Al lancio non ci sono consensi marketing. Se in futuro arrivano una newsletter o comunicazioni commerciali, serve una casella separata, facoltativa e non preselezionata. [DA VERIFICARE con il consulente privacy del cliente, insieme al testo dell'informativa, che è DA FORNIRE.]

**Da non aggiungere**:
- CAPTCHA a immagini: sono inaccessibili.
- «Come ci hai conosciuto?»: lo chiede chi richiama.
- Nome e cognome in due campi separati.
- Un campo «Città»: su PD e CD la città la chiede già il suggerimento del messaggio.

**Ordine** [SUGGERIMENTO]: portare «Mi interessa» in cima. È la domanda più facile, sulle pagine prodotto è già spuntata e dà subito un senso alla richiesta. Lasciare l'ordine del brief resta accettabile.

## 7. Invio, stati e antispam

La logica di base esiste già in `src/scripts/form.ts`. Qui fisso il contratto con l'endpoint e le integrazioni che mancano.

**Endpoint configurabile.** `PUBLIC_FORM_ENDPOINT`, letta in build, finisce in `data-endpoint` e nell'attributo `action`, che serve se JavaScript è disattivato. Il servizio si sceglie con l'**ADR 006** (`docs/decisioni/006-endpoint-del-form.md`, in stato di proposta), che contiene i requisiti minimi e le opzioni con pro e contro:
- **A, consigliata**: una funzione sullo stesso dominio del sito, sull'hosting scelto, che invia la richiesta per email con un provider che tiene i dati nell'UE;
- **B**: un servizio di form gestito, con sede e dati nell'UE;
- **C**: nessun endpoint al lancio, con il ripiego «email già compilata», accettato per iscritto e con una scadenza.

Requisiti, qualunque sia la scelta (il dettaglio è nell'ADR 006):
- `POST` `multipart/form-data`. Risposta `2xx` con JSON se va a buon fine, anche per le richieste messe in quarantena; `4xx`/`5xx` con JSON se fallisce; sempre entro i 15 s del timeout di `form.ts`. CORS solo verso l'origine del sito, se l'endpoint sta su un altro dominio;
- validazione ripetuta lato server: campi obbligatori, formato dell'email, lunghezze;
- notifica a [DA FORNIRE: destinatario, per esempio info@itnode.it] con `Reply-To` uguale all'email del richiedente, e con `_page` e gli interessi nell'oggetto. **Nessuna risposta automatica al richiedente**: trasformerebbe l'endpoint in un modo per mandare email a indirizzi qualsiasi;
- nessun cookie e nessuno script di tracciamento;
- dati conservati solo nell'UE e solo per il tempo indicato nell'informativa; nessun log del contenuto delle richieste.

**Stati del form**
| Stato | Cosa vede l'utente | Nota per lo sviluppo |
|---|---|---|
| Endpoint assente | **Un avviso prima dei campi**: «Il modulo online non è ancora attivo. Per ora scrivici a info@itnode.it o chiamaci al +39 080 2466520.» All'invio compare il pannello di fallback: «Prepara l'email con i tuoi dati» (mailto precompilato), indirizzo in chiaro, telefono | **Da aggiungere**: l'avviso va reso in build quando `data-endpoint` è vuoto. Oggi l'utente lo scopre solo dopo aver compilato tutto |
| Errori di validazione | errori sotto i campi, riepilogo con link ai campi, focus sul riepilogo; i dati restano | già presente |
| Invio in corso | il bottone diventa «Invio in corso…» e non si può inviare due volte | usare `aria-disabled` invece di `disabled`: `disabled` toglie il focus a chi usa tastiera o screen reader |
| Successo | il pannello di conferma prende il posto del form, con il focus sul titolo | testi al §8; leggere email e interessi **prima** di `form.reset()` e inserirli nel pannello |
| Errore di rete, timeout (15 s) o server | messaggio con le alternative; i dati restano nel form | già presente, bozza email compresa |
| Honeypot compilato | lo stesso pannello d'errore onesto, **mai un finto successo** | già presente |

**Antispam a livelli, senza alcun peso per l'utente**
1. **Honeypot** `_gotcha`, già presente: il campo sta fuori schermo, in un contenitore con `aria-hidden="true"`, e ha `tabindex="-1"` e `autocomplete="off"`. `form.ts` lo controlla prima dell'invio e lo toglie dal payload: al server arriva compilato solo dagli invii senza JavaScript, quasi sempre bot che scrivono direttamente all'endpoint. Il server li mette in quarantena.
2. **Tempo minimo**: `_elapsed_ms` viene già inviato. Il server considera sospetti gli invii arrivati meno di 3000 ms dopo il caricamento, e quelli senza `_elapsed_ms` (senza JavaScript). Meglio la **quarantena** (per esempio l'oggetto «[Da controllare]», da rivedere ogni settimana) della cancellazione: un falso positivo è un contatto perso.
3. **Limite di frequenza** per IP sull'endpoint.
4. **Cloudflare Turnstile, predisposto ma spento.** Si accende solo se lo spam lo rende necessario, impostando `PUBLIC_TURNSTILE_SITE_KEY`:
   - modalità «managed» o «invisible»;
   - script caricato al primo focus su un campo, non al caricamento della pagina;
   - token verificato lato server;
   - **pre-clearance disattivata**, perché è quella che imposta il cookie `cf_clearance`;
   - Turnstile va citato nell'informativa [DA VERIFICARE con il consulente privacy].

## 8. Microcopy proposto

Il registro è il «tu», come nei testi del brief. La scelta finale spetta a copywriter-brand.

| Dove | Testo |
|---|---|
| Introduzione del form SIII | «Raccontaci il tuo spazio: ti ricontattiamo per capire cosa far esplorare e prepararti un'offerta.» |
| Introduzione del form PD | «Raccontaci la tua impresa: ti spieghiamo come entrare in Puglia Digitale.» |
| Introduzione del form CD | «Raccontaci la tua attività: ti spieghiamo come entrare in Città Digitali.» |
| Introduzione del form Contatti | «Scrivici di cosa hai bisogno: ti ricontattiamo noi.» |
| Sotto l'introduzione | «La richiesta è senza impegno. I campi con * sono obbligatori.» |
| Opzioni di «Mi interessa» | «SIII – Sito Interattivo Immersivo» · «Puglia Digitale» · «Città Digitali» |
| Suggerimento sotto Telefono | «Lascialo se preferisci essere richiamato.» |
| Suggerimento sotto Messaggio, SIII | «Che spazio vorresti far esplorare? Per esempio una struttura ricettiva, un negozio, uno showroom.» |
| Suggerimento sotto Messaggio, PD e CD | «In quale città lavori e di cosa si occupa la tua attività?» |
| Accanto alla privacy | «Usiamo i tuoi dati solo per rispondere a questa richiesta.» [DA VERIFICARE con l'informativa] |
| Bottone, poi invio in corso | «Invia richiesta», poi «Invio in corso…» |
| Riepilogo degli errori | «Per inviare la richiesta, controlla questi campi:» |
| Conferma: titolo | «Richiesta inviata. Grazie.» |
| Conferma: testo | «Abbiamo ricevuto la tua richiesta{ su <interessi>}. Ti risponderemo a <email>{ entro <tempo>}. Se l'indirizzo non è giusto, scrivici a info@itnode.it.» Il tempo va indicato solo se garantito [DA FORNIRE]; senza interessi selezionati si omette «su <interessi>» |
| Conferma: passo successivo | «Vuoi parlarne subito? Chiamaci al +39 080 2466520.» più una sola azione legata al contesto: su SIII «Entra in un'esperienza», su PD e CD «Visita il portale ↗», su Contatti i tre mondi |
| Errore di rete o server | «Non siamo riusciti a inviare la richiesta. I tuoi dati sono ancora qui: riprova tra poco, oppure scrivici a info@itnode.it o chiamaci al +39 080 2466520.» |
| Fallback senza endpoint | «La richiesta non è stata inviata perché il modulo online non è ancora attivo.» Poi «Prepara l'email con i tuoi dati» · «Chiama +39 080 2466520» |
| «Cosa succede dopo», accanto al form (solo con dati confermati dal cliente) | 1. Leggiamo la tua richiesta · 2. Ti ricontattiamo per capire spazio e obiettivi · 3. Ti proponiamo una soluzione. [DA FORNIRE: processo reale e tempi] |

Esclusi: urgenza o scarsità, tempi di risposta non garantiti, confirmshaming.

## 9. Elementi di fiducia: cosa c'è e dove usarlo

| Prova | Stato | Dove | Regola d'uso |
|---|---|---|---|
| Tre esperienze SIII reali | fornite dal cliente. Schermate ricevute il 2026-10-07 e in uso (capitolo 01 della Home; hero ed esempi di /siii/). [DA VERIFICARE] che siano online. [DA FORNIRE] il consenso scritto delle tre imprese (A7): senza, le schermate non vanno online (review di conversione del 2026-10-07, oss. 2) | showcase di /siii, dove anche la schermata apre l'esperienza; hero di /siii; capitolo 01 della home | è la prova più forte, perché si può provare. Indicare nome, tipo di attività e luogo; nessun risultato attribuito senza dati. Niente schermate con marchi di terzi in vista, per esempio Airbnb o Booking: possono far pensare a una partnership (stessa review, oss. 3) |
| Portali reali: 2 principali e 6 cittadini | forniti. Città Digitali è su cittàdigitali.it e Puglia Digitale su lapugliadigitale.it (conferme dell'utente del 2026-10-05). [DA VERIFICARE] che tutti siano online e aggiornati: dall'ambiente di lavoro non sono raggiungibili | hero di PD e CD, «I luoghi», «L'Italia in un unico portale», Contatti, footer | la copertura da nord a sud (Varese, Altamura, Caltanissetta) dimostra «L'Italia in un unico portale». Dal 2026-10-05 la carta del capitolo 03 della Home mostra le città del portale, e /citta-digitali/ rimanda alla pagina «Tutte le città»: l'estensione della rete si vede senza pubblicare numeri da verificare. Tutti i link vanno controllati prima del lancio |
| Numeri PD: 30+ città, ~200.000 partite IVA, 60% | forniti. [DA VERIFICARE] fonte e anno di riferimento | sezione Numeri di /puglia-digitale | sono dati **dei territori coinvolti, non clienti di ITnode**: le etichette non devono far pensare il contrario. Nota con fonte e anno. Il componente Stats non mostra un numero privo di fonte |
| Percorso del fondatore: 36 anni, IBM, 2002, MyComm, IcommLab, Leadstone | fornito | sezione fondatore della home. Volto e nome anche su /contatti, ma solo se è lui a gestire le richieste [DA VERIFICARE] | senza superlativi |
| «10.000+ clienti» | fornito. [DA VERIFICARE] a quale azienda e a quale periodo si riferisce | timeline del fondatore | va attribuito all'azienda giusta; mai a ITnode, se non è così |
| Foto dell'evento Puglia Digitale | **[DA VERIFICARE] provenienza.** Nell'originale, in basso a destra, c'è una stella a quattro punte compatibile con il watermark visibile di Google Gemini. I ritagli in `derivate/` la escludono, ma il ritaglio non risolve la questione | /puglia-digitale, vicino a «La forza della rete»; capitolo 02 della home | si può presentare come documentazione di un evento solo se è una foto reale. [DA FORNIRE: originale senza cornice, nome, luogo e data dell'evento.] Nessun numero di partecipanti non documentato |
| Quattro foto del fondatore | **[DA VERIFICARE].** `fondatore-in-piedi.jpg` e `fondatore-palco-citta-digitali.jpg` hanno lo stesso simbolo; tutte hanno sfondi stilizzati | sezione fondatore | usabili come ritratti, se il cliente le approva. Le scene con palco e platea (`fondatore-palco-citta-digitali`, `fondatore-presentazione-platea`) **non vanno presentate come eventi reali** senza conferma. Eventuali obblighi di trasparenza per i contenuti generati con AI (AI Act, art. 50): [DA VERIFICARE con il consulente legale] |
| Sede operativa ad Acquaviva delle Fonti e numero fisso | forniti | /contatti, footer, vicino ai form | la presenza sul territorio rassicura le PMI pugliesi |
| Dati societari: ragione sociale, P.IVA, REA, capitale sociale, sede legale | ragione sociale e P.IVA in `site.ts` da fonte pubblica [DA VERIFICARE]; REA e capitale [DA FORNIRE] | footer | è una soglia legale e insieme un segnale di serietà |
| Video di Città Digitali | fornito | /citta-digitali | mostra il prodotto in funzione |
| «5–10 volte», «4 volte», «250.000 visite mensili» | non documentati | «Dal locale al nazionale» | solo in forma qualitativa finché mancano fonte, periodo e metrica; il layout è pronto per accoglierli |
| Testimonianze, loghi di clienti, patrocini, stampa | assenti | vicino ai form | [DA FORNIRE] con consenso scritto. Nessuna invenzione |

Pubblicare numeri o immagini non veritieri non viola solo la soglia di veridicità: nei rapporti tra imprese si applica anche la disciplina sulla pubblicità ingannevole (D.Lgs. 145/2007).

## 10. Rischi di attrito

| # | Rischio | Impatto | Mitigazione | Chi |
|---|---|---|---|---|
| 1 | Lancio senza endpoint: la conversione principale non funziona | alto | avviso prima dei campi e fallback onesto; **decidere l'endpoint prima del go-live** (ADR 006, condizione C04 del G4) | cliente, sessione principale |
| 2 | Mancano le schermate SIII e le foto dei luoghi: per capire il prodotto bisogna uscire dal sito | ridotto: le schermate SIII sono arrivate il 2026-10-07, le foto di Gravina e Monopoli il 2026-10-06 | resta il consenso delle imprese (A7); anteprime con facade solo se i portali non impostano cookie non tecnici | cliente |
| 3 | Nessuna informazione su processo, tempi e modalità di adesione | medio | blocco «Cosa succede dopo» con dati reali | cliente, copywriter |
| 4 | Link verso i portali già nella hero di PD e CD | medio | apertura in nuova scheda; link secondario al form nella hero; chiusure forti | ux-designer |
| 5 | CTA ambigue («Entra in Città Digitali», «Esplora») | medio | introduzione del form esplicita; `↗` e destinazione nel nome accessibile | copywriter-brand |
| 6 | «Email aziendale» e privacy formulata come consenso | medio | «Email»; «Ho letto l'informativa» | cliente, consulente privacy |
| 7 | Motion, sezioni sticky e pagine lunghe allontanano il form su mobile | medio | niente scroll-jacking; CTA dell'header sempre raggiungibile; form fuori dalle sezioni sticky | ux-designer, ui-designer |
| 8 | Portali lenti, datati o irraggiungibili | alto sulla fiducia | verifica di tutti i link, da una rete che li raggiunga, prima del lancio | QA |
| 9 | Immagini generate o ritoccate presentate come prove | alto sulla fiducia | verifica della provenienza; file originali | cliente, creative-director |
| 10 | Richieste senza un responsabile, o risposte lente | alto | nominare un responsabile; tenere un registro delle richieste (piano di misurazione §2) | cliente |
| 11 | Spam | medio | antispam a livelli, con quarantena | sviluppo |

## 11. Fonti
- Watermark visibile di Google Gemini (stella a quattro punte in basso a destra): [Google AI Developers Forum](https://discuss.ai.google.dev/t/regression-forced-visible-star-watermark-breaks-gemini-nano-banana-pro-image-to-image-and-flow-frame-to-video-workflows/114193) e [spiegazione del simbolo](https://removegeminiwatermarkai.com/blogs/what-is-gemini-watermark-sparkle-symbol), consultati il 2026-09-28. Il riscontro è solo visivo: i file non contengono metadati di provenienza (EXIF, XMP, C2PA), quindi non è una prova.
- Turnstile, cookie `cf_clearance` solo con pre-clearance: [Cloudflare Turnstile docs, pre-clearance](https://developers.cloudflare.com/turnstile/get-started/pre-clearance/), consultato il 2026-09-28 attraverso i risultati di ricerca (cloudflare.com è bloccato dall'ambiente).
- Codice esistente letto il 2026-09-28: `src/scripts/form.ts`, `src/data/site.ts`, `src/data/asset-slots.ts`, `scripts/prepare-assets.mjs`.
- v0.2: `cta_id` ricavati dalla build del commit `9948b57` (2026-09-28), generata in una cartella temporanea: ogni `a` e `button` con `data-track` nelle 8 pagine. Pagine lette: `src/pages/contatti.astro`, `siii.astro`, `puglia-digitale.astro`, `citta-digitali.astro`; `src/components/sections/ContactForm.astro`, `CTASection.astro`, `LocationShowcase.astro`.
- v0.3, 2026-10-05:
  - dominio di Città Digitali e forma dei link: conferma dell'utente del 2026-10-05 e decisione di seo-technical in `docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md`;
  - dominio di Puglia Digitale, lapugliadigitale.it: conferma dell'utente del 2026-10-05, riferita dalla sessione principale (v0.4);
  - v0.5, 2026-10-07: schermate SIII e link sulla schermata degli esempi, `docs/review/2026-10-07-schermate-siii-cro-specialist.md` (commit `d06a3e9` e `88d7083`);
  - nuovo link: `docs/review/2026-10-05-mappa-citta-digitali-ux-designer.md`, §3.2;
  - inventario della build del commit `2a038de`: rispetto al 2026-09-28 cambia solo il nuovo link.

## Ipotesi da validare
- Audience e peso relativo di imprese ed enti (§1).
- Il fondatore è la persona che risponde alle richieste.
- Da 360 px in su c'è spazio per «Parliamone» nella barra mobile.
- Su /contatti il team preferisce il telefono ai form, o il contrario.

## Domande aperte
- [DA FORNIRE] Chi riceve e gestisce le richieste, e con quali tempi di risposta garantiti.
- [DA FORNIRE] Valore medio di un contratto SIII e di un'adesione ai portali; contatti al mese oggi; eventuali dati del sito attuale.
- [DA FORNIRE] Processo di lavoro del SIII (sopralluogo, riprese, tempi). Come si aderisce a PD e CD: se l'adesione costa e che cosa serve all'impresa.
- [DA FORNIRE] Orari in cui si risponde al telefono. Il numero mobile è su WhatsApp, e lo volete come canale? Se sì, si aggiunge un link `wa.me` (evento `contact_click`, metodo `whatsapp`).
- [DA VERIFICARE] Provenienza delle foto con la stella a quattro punte; file originali e dati dell'evento.
- [DA VERIFICARE] Fonte e anno dei numeri PD; a chi si riferisce «10.000+ clienti».
- [DA VERIFICARE] Consenso a citare le tre attività dello showcase.
- [DA VERIFICARE] Il sito attuale su Railway ha già un endpoint per i contatti?
- [DA FORNIRE] I testi del cliente citati nel brief (storia del fondatore, benefici del SIII, motivi per aderire): non sono nel repository.

## Decisioni richieste
1. **Endpoint del form e servizio di invio**: opzioni A, B e C nell'ADR 006 (proposta), da chiudere prima del go-live (condizione C04 del G4). Decide l'utente o il cliente; la parte tecnica è della sessione principale.
2. **Etichetta «Email» invece di «Email aziendale», casella privacy come presa visione.** Decide il cliente, con il consulente privacy.
3. **CTA dell'header «Parliamone»**, con destinazione `#richiesta` sulle pagine che hanno un form. Decidono creative-director e ux-designer.
4. **Uso delle foto con la stella a quattro punte.** Decidono cliente e creative-director, dopo la verifica.
