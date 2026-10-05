---
titolo: Sitemap e navigazione
owner: ux-designer
contributi: [cro-specialist, seo-technical, seo-content, ui-designer, creative-director]
stato: bozza
versione: 0.2
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/cro/strategia-conversione.md, docs/cro/piano-misurazione.md, docs/seo/specifiche-tecniche.md, docs/seo/mappa-keyword-url.md, src/data/site.ts, src/data/pages.ts, src/scripts/header.ts, src/components/layout/Breadcrumbs.astro]
---

# Sitemap e navigazione

Architettura e comportamento di header, menu mobile, breadcrumb e footer, pronti per lo sviluppo (Astro statico). Il documento definisce struttura e comportamento; stile e ritmo spettano al creative-director (`docs/creativa/direzione-visiva.md`) e a ui-designer. Le sezioni delle pagine sono in `docs/ux/struttura-pagine.md`, i requisiti di accessibilità in `docs/ux/accessibilita.md`.

## 1. Sitemap

```text
https://itnode.it/
├── /siii/              SIII · Siti Interattivi Immersivi     T2 Linea      indicizzata
├── /puglia-digitale/   Puglia Digitale                        T2 Linea      indicizzata
├── /citta-digitali/    Città Digitali                         T2 Linea      indicizzata
├── /contatti/          Contatti                               T3 Contatti   indicizzata
├── /privacy-policy/    Privacy Policy                         T4 Legale     indicizzata (¹)
├── /cookie-policy/     Cookie Policy                          T4 Legale     indicizzata (¹)
└── 404.html            Pagina non trovata                     T5 404        noindex, fuori sitemap, stato HTTP 404
```
(¹) Condizioni in `docs/seo/specifiche-tecniche.md` §1.2.

- **Un solo livello sotto la home.** Le tre linee sono pari grado: sono i «tre mondi» 01–02–03 (LG §08, §35). Compaiono sempre nello stesso ordine, SIII → Puglia Digitale → Città Digitali, in header, menu mobile, footer, home e blocchi «Continua a esplorare».
- **Crescita.** Eventuali pagine future (casi, luoghi, articoli) vanno al secondo livello, in una cartella dedicata decisa con seo-technical, senza toccare il menu. `[IPOTESI]`
- **URL.** Sono canonici con la barra finale (`trailingSlash: 'always'`, specifiche SEO §1.3). Anche i link interni usano la barra finale: `/siii/`, mai `/siii`.
- **Ancore stabili** (usate da CTA, tracciamento e test):

| Ancora | Dove | Uso |
|---|---|---|
| `#contenuto` | `<main>` di ogni pagina | skip link |
| `#richiesta` | blocco del form su /siii/, /puglia-digitale/, /citta-digitali/, /contatti/ | «Parliamone» e link secondari delle hero. Adottata anche dai copy deck v1.1. |
| `#esempi` | showcase di /siii/ | CTA della hero SIII |
| altre ancore di sezione | quelle indicate nei copy deck (`#cos-e`, `#benefici`, `#numeri`, `#luoghi`, `#video`, `#recapiti`, `#portali`…) | link profondi; nessuna CTA le usa |

- **Parametro** `?interesse=siii|puglia-digitale|citta-digitali` (anche più valori), solo su /contatti/: preseleziona «Mi interessa». Il canonical resta senza parametro.

## 2. Inventario dei template

| Template | Pagine | Composizione | Breadcrumb | Form |
|---|---|---|---|---|
| T1 Home | `/` | Hero, manifesto, tre mondi, fondatore, chiusura | no | no: la chiusura porta a /contatti/ |
| T2 Linea | /siii/, /puglia-digitale/, /citta-digitali/ | Componenti composti in modo diverso per pagina, non un layout fisso: hero di linea → sezioni → chiusura con form → «Continua a esplorare» | sì | sì, con «Mi interessa» preselezionato |
| T3 Contatti | /contatti/ | Hero compatta, recapiti e form, portali, dati societari | sì | sì, senza preselezione |
| T4 Legale | /privacy-policy/, /cookie-policy/ | Testo lungo | sì | no |
| T5 404 | — | Messaggio e vie d'uscita | no | no |

Tutti i template condividono lo skip link, l'Header con il MobileMenu e il Footer. Etichette, URL e contatti arrivano da una sola fonte (`src/data/site.ts`, `src/data/pages.ts`), così i nomi sono identici ovunque (WCAG 3.2.4).

## 3. Header

### 3.1 Anatomia e ordine del focus
L'ordine del DOM coincide con l'ordine del focus:
1. Skip link «Vai al contenuto» → `#contenuto`. Visibile solo al focus, sopra l'header.
2. Logo → `/`. È un `<img alt="ITnode">` dentro il link e non è un heading. Sulla home il link ha `aria-current="page"`.
3. `<nav aria-label="Principale">`: SIII · Puglia Digitale · Città Digitali · Contatti. La voce della pagina corrente ha `aria-current="page"` e un indicatore visivo che non si basa solo sul colore (per esempio un filetto).
4. CTA «Parliamone».
5. Pulsante «Menu», solo sotto i 1024 px.

Le voci di navigazione esistono nell'HTML anche quando il menu è chiuso (specifiche SEO §3.5).

**Due `nav`.** Con il menu mobile in un `<dialog>` servono due elementi di navigazione:
- il `nav` della barra, visibile su desktop e, senza JavaScript, anche su mobile;
- il `nav` dentro il dialog.

Entrambi hanno `aria-label="Principale"`: non si vedono mai insieme, perché il `nav` della barra è in `display: none` sotto i 1024 px quando c'è JavaScript, e il dialog chiuso non è esposto. Le voci vengono entrambe da `nav` in `src/data/site.ts`.

### 3.2 CTA dell'header: «Parliamone» (scelta, concordata con cro-specialist)
- **Perché non «Contattaci».** Accanto alla voce «Contatti» sarebbe quasi la stessa etichetta con la stessa destinazione: due scelte che sembrano uguali aggiungono rumore (legge di Hick) e fanno chiedere quale sia la differenza.
- **Perché «Parliamone».** Distingue l'azione (avviare una conversazione) dal luogo (Contatti, cioè i recapiti). Il registro è conversazionale e l'impegno percepito basso. Riprende l'H1 di /contatti/ («Parliamo del prossimo spazio digitale.»). Con 10 caratteri sta nella barra mobile.
- **Destinazione**
  - Sulle pagine con form (/siii/, /puglia-digitale/, /citta-digitali/, /contatti/): `#richiesta` della pagina stessa. Il form ha già «Mi interessa» preselezionato: un passaggio in meno e nessuna perdita di contesto.
  - Su home, pagine legali e 404: `/contatti/` (strategia di conversione §3).
- **Arrivo sul form.** Si scorre alla sezione e il focus passa al titolo del form (`tabindex="-1"`), non al primo campo: su mobile il focus su un campo aprirebbe la tastiera e nasconderebbe il contesto.
- È un link (`<a>`), non un pulsante. Stessa etichetta e stessa posizione su tutte le pagine (3.2.3, 3.2.6). Attributi di tracciamento: piano di misurazione §5 (`cta_id` `header-parliamone`).

### 3.3 Sticky «dopo il primo scroll»

| | Stato `top` | Stato `scrolled` |
|---|---|---|
| Quando | La sentinella è visibile (pagina in cima) | La sentinella esce dal viewport, dopo circa 16 px di scroll |
| Posizione | In cima alla pagina | Resta agganciato in alto |
| Aspetto | Fondo trasparente sulla hero, senza bordo. Il tema chiaro o scuro dipende dalla hero della pagina | Fondo pieno e filetto inferiore; il logo si può ridurre, ma solo con `transform` |
| Altezza | `--header-h` | Invariata: nessuna variazione di layout (CLS 0) |

Regole:
- **Nessun salto quando si aggancia.** `position: sticky; top: 0` è attivo fin dal caricamento. Se la hero deve scorrere sotto l'header trasparente, compensa con `margin-top: calc(-1 * var(--header-h))`.
- **Cambio di stato.** Lo gestisce un `IntersectionObserver` su una sentinella (`[data-scroll-sentinel]`) posta a circa 16 px dall'inizio del `body`, come già fa `header.ts`. Niente listener sullo scroll (INP). L'header riceve `data-scrolled` e cambia solo la presentazione, via CSS.
- **Transizioni** di colore e bordo ≤ 200 ms. Con `prefers-reduced-motion: reduce`, nessuna transizione.
- **Sempre visibile.** Niente «nascondi scorrendo in giù»: l'header è compatto e la sua posizione deve restare prevedibile.
- **Eccezione per gli schermi bassi.** Con viewport alto meno di 480 px (smartphone in orizzontale, zoom al 400%) l'header non è sticky (`@media (max-height: 29.99em)`), perché occuperebbe una parte eccessiva dello schermo (1.4.10).
- **Focus e ancore mai sotto l'header:**
  - `html { scroll-padding-top: calc(var(--header-h) + 1rem); }` (2.4.11, tecnica C43);
  - una sola compensazione: niente `scroll-margin-top` sulle sezioni, altrimenti gli scostamenti si sommano;
  - verificato in Chromium: senza questa regola, ancore ed elementi raggiunti con Shift+Tab finiscono sotto l'header; con la regola, no (script in `accessibilita.md`).
- **Contrasto** garantito in entrambi gli stati. Se nello stato `top` l'header sta su foto o video, serve una velatura.
- `data-site-header` sull'header: serve ai test di Fase 5.

### 3.4 Desktop (≥ 1024 px, cioè `64em`, come in `header.ts`)
- Logo a sinistra. A destra le voci, come testo, e «Parliamone», con trattamento da pulsante.
- Voci e CTA alte almeno 44 px (il minimo AA è 24 × 24).
- Nessun sottomenu.
- `[IPOTESI]` Il breakpoint va confermato con il font definitivo: si passa al menu mobile prima che le voci vadano a capo o si sovrappongano, anche con lo zoom del solo testo.

## 4. Menu mobile a tutto schermo (< 1024 px)

**Barra mobile**
- Contiene logo, «Parliamone» compatto e il pulsante «Menu».
- Da 360 px in su «Parliamone» sta nella barra. Sotto i 360 px, o se con il font definitivo non ci sta senza sovrapposizioni, resta solo nel pannello.
- Pulsante: `<button type="button" aria-haspopup="dialog" aria-expanded="false" data-menu-open>Menu</button>`, con testo visibile e area ≥ 44 × 44 px.

**Pannello.** È un `<dialog>` aperto con `showModal()`, come in `header.ts`. Il dialog modale fornisce di serie il contenimento del focus, la chiusura con Esc e lo sfondo inerte.

| Aspetto | Comportamento |
|---|---|
| Nome | `<dialog aria-label="Menu">`, oppure `aria-labelledby` verso un titolo visivamente nascosto |
| Apertura | Clic o tocco, Invio o Spazio sul pulsante. Il pannello copre tutto lo schermo (`100dvh`). |
| Primo elemento | Il pulsante «Chiudi» (`data-menu-close`), nella stessa posizione in cui c'era «Menu»: chi apre trova la chiusura nello stesso punto. `showModal()` gli dà il focus perché è il primo elemento focalizzabile. |
| Contenuto, in ordine | 1. «01 SIII», «02 Puglia Digitale», «03 Città Digitali», «Contatti»: voci grandi, alte almeno 48 px, con i numeri `aria-hidden`. Sotto ogni linea, un descrittore di una riga preso dalle LG: «Siti Interattivi Immersivi», «Dalla costa all’entroterra», «L’Italia in un unico portale». Il descrittore sta dentro il link e ne arricchisce il nome.<br>2. «Parliamone».<br>3. «Chiama +39 080 2466520» (`tel:`) e «Scrivi a info@itnode.it» (`mailto:`).<br>Nient'altro (legge di Hick). |
| Ordine del focus | Chiudi → SIII → Puglia Digitale → Città Digitali → Contatti → Parliamone → telefono → email, poi di nuovo Chiudi. La pagina sotto è inerte. |
| Chiusura | «Chiudi», Esc da qualunque punto, scelta di una voce, passaggio a ≥ 1024 px (già in `header.ts`). Alla chiusura il focus torna a «Menu», **tranne** nel caso della riga seguente. |
| Voce che punta alla stessa pagina | È il caso di «Parliamone» su una pagina con form (`#richiesta`). Prima si chiude il dialog, poi si scorre alla sezione e il focus va al titolo del form, non su «Menu». Già così in `header.ts`. |
| Blocco dello scroll | `showModal()` non blocca lo scroll della pagina sotto. Serve `html:has(dialog[data-mobile-menu][open]) { overflow: hidden; }` (già in `Header.astro`) con `scrollbar-gutter: stable` su `html`. Il pannello scorre da solo se non entra nello schermo (`overflow-y: auto; overscroll-behavior: contain`). Alla chiusura la posizione di lettura non cambia. |
| Motion | Dissolvenza o traslazione ≤ 250 ms; l'eventuale ingresso scalato delle voci dura al massimo 300 ms in tutto. Con reduce, apertura istantanea. Il pannello si può usare subito, senza aspettare la fine dell'animazione. |
| Senza JavaScript | Il pulsante resta nascosto (lo mostra lo script) e le quattro voci si vedono nella barra, disposte su una o due righe. Tutte le pagine restano raggiungibili anche dal footer. |

## 5. Breadcrumb
- **Dove.** Su tutte le pagine interne, in cima alla hero, sopra l'H1. Mai sulla home né sulla 404: `crumbsFor('404')` in `pages.ts` restituisce una traccia, ma il template 404 non la deve mostrare.
- **Posizione nel DOM.** Subito prima di `<main id="contenuto">`, così lo skip link porta direttamente all'H1. L'ordine visivo resta uguale a quello del DOM.
- **Markup.** È quello di `Breadcrumbs.astro`: `<nav aria-label="Percorso">` con un `<ol>`. L'ultima voce è la pagina corrente, senza link e con `aria-current="page"`. L'etichetta «Percorso» è la scelta definitiva: è breve e il lettore di schermo la annuncia come «Percorso, navigazione».
- **Voci.** «Home» → `/`, poi l'etichetta della pagina, identica a quella del menu (da `pages.ts`): SIII, Puglia Digitale, Città Digitali, Contatti, Privacy Policy, Cookie Policy.
- **Separatore decorativo, non letto.** È in uno `<span aria-hidden="true">`, come in `Breadcrumbs.astro`.
- **Contrasto.** I link usano il token `--fg-2` invece dell'opacità: il contrasto va misurato sulle superfici reali (almeno 4,5:1).
- **Target.** Ogni link è alto almeno 24 px, come nell'implementazione attuale: `padding-block` da 0,35 rem.
- **BreadcrumbList.** Stessi nomi, stesso ordine e URL assoluti canonici della traccia visibile (seo-technical).

## 6. Footer

| # | Blocco (ordine DOM = ordine su mobile) | Contenuto |
|---|---|---|
| 1 | Logo | Link a `/`. Serve la versione per fondo scuro se il footer è scuro `[DA FORNIRE: logo SVG positivo e negativo]`. |
| 2 | Navigazione | `<nav aria-label="Piè di pagina">`: SIII · Puglia Digitale · Città Digitali · Contatti |
| 3 | Contatti | `<address>`: Sede operativa, Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA); +39 080 2466520 (`tel:`); info@itnode.it (`mailto:`) |
| 4 | Portali | «cittàdigitali.it ↗» (link `https://xn--cittdigitali-19a.it`) e «lapugliadigitale.it ↗», esterni, in nuova scheda |
| 5 | Riga legale | © {anno} ITNODE S.r.l. `[DA VERIFICARE]` · P.IVA 08937270729 `[DA VERIFICARE]` · Sede legale `[DA FORNIRE]` · Registro delle imprese e REA `[DA FORNIRE]` · Capitale sociale `[DA FORNIRE]` · Privacy Policy · Cookie Policy · «Preferenze cookie» (solo se esiste un banner di consenso) |

- **Dominio di Città Digitali.** Il portale del cliente è cittàdigitali.it, con l'accento, confermato dall'utente il 2026-10-05. Nei link va in punycode (`https://xn--cittdigitali-19a.it`), nel testo visibile con l'accento. cittadigitali.it, senza accento, è un progetto omonimo di altri: mai come link né come etichetta.
- **Portali etichettati con il dominio.** LG §24 elenca tra i link anche «Città Digitali» e «Puglia Digitale». Le stesse etichette però sono già nella navigazione verso le pagine interne: con il dominio si evitano due link con lo stesso nome e destinazioni diverse (2.4.4, 3.2.4).
- **Titoli dei gruppi**: `<h2>` in stile piccolo («Navigazione», «Contatti», «Portali»). Servono a chi naviga per titoli.
- **Anno**: generato in build. Un piccolo script lo aggiorna se il sito non viene ricompilato a inizio anno.
- **Desktop**: logo più tre colonne (Navigazione, Contatti, Portali) e riga legale in fondo.
- **Mobile**: impilato nello stesso ordine; voci di navigazione, telefono ed email come righe alte almeno 44 px.
- **Dati societari**: completi prima del go-live (soglia 5, art. 2250 c.c.). `site.ts` mostra REA e capitale solo se valorizzati: finché mancano, la riga è incompleta e il go-live è bloccato.

## 7. Pagine legali e 404

**T4 · Privacy Policy e Cookie Policy**
- **Struttura.** H1 «Privacy Policy» o «Cookie Policy». Data di ultimo aggiornamento in `<time>`. Indice con ancore se le sezioni sono più di quattro. Poi H2 e H3.
- **Tabelle** (per esempio l'elenco dei cookie) con `<caption>` e `<th scope>`; su mobile scorrono in un contenitore focalizzabile con nome, oppure diventano liste.
- **Lettura.** Colonna di massimo 70 caratteri circa; nessuna animazione.
- **Cookie Policy.** Pulsante «Modifica le preferenze sui cookie», solo se esiste un banner, con la stessa funzione del link nel footer.
- **Testi**: `[DA FORNIRE: testi del titolare o del consulente privacy; elenco reale dei cookie dopo lo sviluppo]`.

**T5 · 404**
- **Contenuto.** H1 `[DA SCRIVERE: pagina non trovata, ≤ 40 caratteri]` e una frase di spiegazione (≤ 140 caratteri).
- **Vie d'uscita.** I tre mondi, con gli stessi dati dei capitoli della home in variante compatta, poi «Parliamone» verso /contatti/ e il link alla home. Nessuna ricerca: il sito statico non ha un motore interno.
- **Indicizzazione.** `noindex`, fuori sitemap, niente breadcrumb, canonical o JSON-LD. Lo stato HTTP 404 lo serve l'hosting (specifiche SEO §3.4).
- **Migrazione.** I vecchi URL con valore vanno in redirect 301 (redirect map di seo-technical), non sulla 404.

## 8. Collegamenti trasversali tra le tre linee
Principio: sono «tre applicazioni concrete della stessa visione» (LG §35). Ogni pagina porta alle altre due, ma nessun link verso le altre linee si mette tra la CTA di chiusura e il form, per non distrarre dalla conversione.

| Da | Verso | Dove | Forma |
|---|---|---|---|
| Home | /siii/, /puglia-digitale/, /citta-digitali/ | Capitoli «I tre mondi» | CTA dei capitoli |
| Home | /puglia-digitale/, /citta-digitali/ | Paragrafo di sintesi del manifesto | Link nel testo (formulazione provvisoria del brief §2.4) |
| /siii/ | /puglia-digitale/, /citta-digitali/ | Riga «Ponte» dopo gli esempi (copy deck SIII §7) | Link nel testo |
| /puglia-digitale/ | /siii/#esempi | «I luoghi»: Monopoli ↔ Maison Miminà, Acquaviva delle Fonti ↔ D.L. Natura Dentro. Gli esempi sono pubblicati su quei portali, come mostrano i loro URL. | Riga sotto il luogo `[PROPOSTA per copywriter-content]` |
| /citta-digitali/ | /siii/ | Testo di «Dal locale al nazionale» (copy deck CD §4) e sottotitolo della hero | Link nel testo |
| Ogni pagina di linea | Linea successiva | Blocco «Continua a esplorare», dopo il form, in sequenza circolare: SIII → Puglia Digitale → Città Digitali → SIII | `ProjectShowcase` compatto `[PROPOSTA]` |
| /contatti/ | Pagine e portali | Sezione «I portali»: link interno alla pagina del progetto e link esterno al portale (etichette nel copy deck) | Link |
| Tutte | Tutte | Header e footer | Navigazione |
| 404 | Home, tre linee, contatti | Corpo della pagina | Link |

Il testo dei link è descrittivo (nome della destinazione) e va concordato con seo-content. La freccia segue la convenzione di cro-specialist: `→` per un'altra pagina, `↓` per un'ancora nella stessa pagina, `↗` per un sito esterno, sempre `aria-hidden`.

## Ipotesi da validare
- Breakpoint del menu a 1024 px (`64em`): va confermato con il font definitivo e con lo zoom del solo testo.
- «Parliamone» sta nella barra mobile da 360 px in su.
- Con viewport alto meno di 480 px l'header non è sticky: gli utenti di zoom elevato ne beneficiano, e per gli smartphone in orizzontale non è un problema.
- Il blocco «Continua a esplorare» serve a chi arriva in fondo senza compilare il form. Da confermare con creative-director (ritmo) e cro-specialist.

## Domande aperte
- **creative-director**: tema dello stato `top` dell'header per pagina, chiaro o scuro, a seconda della hero.
- **copywriter-content e copywriter-brand**: le CTA verso un'ancora della stessa pagina usano `↓`, non `→` (convenzione di cro-specialist). Nei copy deck v1.1 alcune usano ancora `→`.
- **seo-technical**: conferma dell'etichetta «Percorso» per il breadcrumb, al posto di «Percorso di navigazione» (lasciata alla scelta di ux-designer).
- **Cliente**: logo in SVG, positivo e negativo; dati societari mancanti; esistenza di un banner di consenso (dipende dagli strumenti scelti nel piano di misurazione).

## Decisioni richieste
- **creative-director e ux-designer** (richiesta da cro-specialist): CTA dell'header «Parliamone» con destinazione `#richiesta` sulle pagine con form. Proposta di ux-designer: approvare.
- **Sviluppo** (sessione principale): le correzioni di header, menu e breadcrumb richieste in questo documento sono già applicate. Resta il template 404, che non deve mostrare il breadcrumb.
