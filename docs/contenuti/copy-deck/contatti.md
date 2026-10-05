---
titolo: Copy deck · Contatti
owner: copywriter-content
contributi: [copywriter-brand, seo-content, seo-technical, cro-specialist, ux-designer, creative-director]
stato: in revisione
versione: 1.5
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md (S1–S8, omonimie), docs/seo/mappa-keyword-url.md, docs/seo/specifiche-tecniche.md (§2.1, §2.2, §5.3, §5.4), docs/seo/dati-strutturati.md, docs/cro/strategia-conversione.md, docs/contenuti/tone-of-voice.md, docs/contenuti/microcopy.md, docs/creativa/direzione-visiva.md (§7.7, §7.8), docs/ux/struttura-pagine.md (§5), docs/strategia/coordinate-luoghi.md, docs/review/2026-09-28-sito-bozze-copywriter-content.md, docs/review/2026-09-28-sito-accessibilita-ux-designer.md (A7, §4), docs/review/2026-09-28-sito-verifica-accessibilita-ux-designer.md, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, docs/review/2026-10-05-omonimia-citta-digitali-seo-content.md, docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md (§5, §6), src/pages/contatti.astro, src/data/pages.ts, src/data/site.ts, src/data/media.ts, dist/ del 2026-10-05 (commit 2a038de)]
---

# Copy deck · Contatti

Pagina `/contatti/`. Copre la sezione 22 delle linee guida (LG) e l'introduzione al form (§23). I recapiti sono quelli forniti dal cliente, senza modifiche. I testi sono pronti da impaginare.

**Novità della v1.5 (2026-10-05)**
- **Risposte di ux-designer** (review della carta della pagina, §5 e §6): composizione di recapiti e form e testo nascosto « nella home» confermati come nel sito; `struttura-pagine.md` 0.5 allineata (V3 chiusa).

**Novità della v1.4 (2026-10-05)**
- **Dominio di Città Digitali.** È cittàdigitali.it, con l'accento; nei link `https://xn--cittdigitali-19a.it`. Il dominio senza accento indicato dalle LG (§22) è di un progetto omonimo di altri: non si cita e non si linka (conferma dell'utente del 2026-10-05; brief S7).
- **Dominio di Puglia Digitale.** lapugliadigitale.it, come nelle LG, confermato dall'utente il 2026-10-05: il link non cambia.
- **Verifica sul sito costruito.** Il documento ora descrive la pagina com'è: hero senza occhiello, coordinate e nota sul profilo LinkedIn nei recapiti, riga «Preferisci parlarne a voce?» sotto il form, portali con il nome come link, dati societari nell'ordine del sito. Le differenze ancora aperte sono nella sezione «Verifica sul sito».

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi. **verbatim**: frase delle LG; si cambia solo l'apostrofo tipografico.
- **Frecce** (tone of voice §6): → altra pagina, ↗ sito esterno in nuova scheda. Sempre `aria-hidden="true"`.
- **Link esterni**: `target="_blank" rel="noopener"`. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3) e dichiara la nuova scheda.
- **Dominio di Città Digitali.** Nel testo visibile e nei nomi accessibili si scrive «cittàdigitali.it», con la «à» composta (U+00E0). Negli `href` va il punycode, senza www: `https://xn--cittdigitali-19a.it` (specifiche SEO §5.3; tone of voice §5). Mai la forma senza accento, che è il dominio di un progetto omonimo (brief, omonimie e S7).
- **Fonti che prevalgono nel loro dominio**: brief consolidato (dati societari, S1–S8), mappa keyword→URL (metadati, heading), strategia di conversione (ordine dei blocchi, CTA, form), tone of voice (grafie).
- **Microcopy del form** (etichette, errori, stati, conferma, consenso): copywriter-brand e strategia di conversione §8.

## Metadati

Fa fede `docs/seo/mappa-keyword-url.md` §2 (owner seo-content). Copia per comodità:

| Campo | Testo | Limite |
|---|---|---|
| Title | Contatti \| ITnode, Acquaviva delle Fonti (BA) | ≤ 60 |
| Meta description | Parliamo del tuo prossimo spazio digitale: SIII, Puglia Digitale o Città Digitali. ITnode, Via Sant’Anna 34, Acquaviva delle Fonti (BA). Tel. 080 2466520. | 140–155 |
| Breadcrumb | Home › Contatti | — |

**Nel sito** (`src/data/pages.ts`, build del 2026-10-05) title e meta sono diversi:
| Campo | Testo | Caratteri |
|---|---|---|
| Title | Contatti, Acquaviva delle Fonti (BA) \| ITnode | 45 |
| Meta description | Parliamo del tuo prossimo spazio digitale: SIII, Puglia Digitale o Città Digitali. ITnode, Via Sant’Anna, 34, Acquaviva delle Fonti (BA). Tel. 080 2466520. | 155 |

Note:
- **Raccomando la versione del sito** (vedi «Verifica sul sito», V1). Il title segue lo schema delle specifiche SEO (§2.1, «‹Titolo pagina› | ITnode»), da cui si ricava anche `og:title`. L'indirizzo con la virgola è quello di footer, pagina e dati strutturati. L'avevo proposto il 2026-09-28 (review di bozze, K3 e K4), e lo chiede anche seo-technical (specifiche §2.2).
- Decide seo-content, owner dei metadati. Il sito non va riportato alla versione della mappa.

## Struttura della pagina

Ordine della strategia di conversione §4: prima i canali diretti, poi il form. Su desktop recapiti e form stanno affiancati; su mobile i recapiti vengono prima.

| # | Sezione | Ancora | Componente suggerito (§30) |
|---|---|---|---|
| 1 | Hero | — | Hero, variante compatta |
| 2 | Recapiti | `#recapiti` | `<address>` con `<dl>` |
| 3 | Scrivici | `#richiesta` | ContactForm |
| 4 | Persona | — | Ritratto a inchiostro, nome e ruolo, link al racconto in Home (direzione visiva §7.7) |
| 5 | I portali | `#portali` | Due righe editoriali |
| 6 | Dati societari | `#dati-societari` | Blocco testuale piccolo |

Nel sito le sezioni 1–3 stanno nella stessa fascia della hero; l'ordine coincide con questa tabella.

## 1. Hero

**Eyebrow.** Non c'è. Sulle pagine interne il breadcrumb («Home / Contatti») prende il posto dell'occhiello: è una decisione della sessione principale (direzione visiva §7.8; review di accessibilità del 2026-09-28, T11). La v1.3 proponeva «Contatti».

**H1** · verbatim · max 40
> Parliamo del prossimo spazio digitale.

**Lead** · p · max 160
> Hai un’impresa da rendere esplorabile o un territorio da valorizzare? Raccontacelo: scrivici o chiamaci.

Note:
- Nessuna CTA nella hero (strategia di conversione §4): i canali diretti sono subito sotto.
- L'H1 non contiene «Contatti»: la parola è nel breadcrumb, nel title e nella voce di menu (mappa SEO §3.5).
- «Un territorio da valorizzare» si rivolge anche agli enti, previsti dal campo «Azienda o ente» del form (LG §23: «Nome Azienda / Ente»).

## 2. Recapiti

**H2** · max 24 · visivamente nascosto (`sr-only`)
> Recapiti

**Recapiti** · copy · `<address>` con una `<dl>`, in quest'ordine
| Etichetta (`dt`) | Valore e link (`dd`) | Destinazione | Nome accessibile del link | `cta_id` |
|---|---|---|---|---|
| Telefono | +39 080 2466520 | `tel:+390802466520` | — | contatti-telefono |
| Mobile | +39 335 1229785 | `tel:+393351229785` | — | contatti-mobile |
| Email | info@itnode.it | `mailto:info@itnode.it` | — | contatti-email |
| Sede operativa | Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA) · riga mono «Acquaviva delle Fonti · 40.90° N · 16.85° E» · link «Apri in Google Maps ↗» | https://www.google.com/maps/search/?api=1&query=Via%20Sant%27Anna%2034%2C%2070021%20Acquaviva%20delle%20Fonti%20BA | Apri in Google Maps la sede operativa di ITnode (si apre in una nuova scheda) | contatti-mappa |
| LinkedIn | Giacomo Lenoci ↗ · sotto, «Profilo personale del fondatore» | https://www.linkedin.com/in/giacomo-lenoci/ | Giacomo Lenoci su LinkedIn (si apre in una nuova scheda) | contatti-linkedin |

Note:
- Valori verbatim dalla §22, già in `src/data/site.ts`. Nei numeri di telefono vanno spazi non separabili, così non vanno a capo (tone of voice §7). Nome, indirizzo e telefono devono essere identici qui, nel footer, nei dati strutturati e sui profili esterni (mappa SEO §3.5).
- «Sede operativa» diventa «Sede legale e operativa» se il cliente conferma che i due indirizzi coincidono (brief S3).
- **Riga delle coordinate** (direzione visiva §7.7): nome del comune e coordinate del comune in mono, in maiuscolo da CSS, nascoste agli screen reader (`aria-hidden`). Sono quelle del comune, non dell'indirizzo, e nessun testo le presenta come posizione della sede (`coordinate-luoghi.md` §5).
- Google Maps: un link, niente mappa incorporata, quindi nessun cookie di terze parti prima del consenso (soglia 5).
- LinkedIn: il profilo è personale (brief S6), e lo dice la nota «Profilo personale del fondatore», un'etichetta breve senza punto finale (tone of voice §8). Era nel sito ma non nel copy deck; la review di bozze del 2026-09-28 l'aveva verificata come corretta. [DA VERIFICARE: nome, F7] Se ITnode ha una pagina aziendale, va aggiunta [DA FORNIRE].

## 3. Scrivici

**H2** · max 32
> Scrivici

**Introduzione del form** · p · max 160
> Scrivici di cosa hai bisogno: ti ricontattiamo noi.

Note:
- Testo della strategia di conversione §8, adottato così com'è.
- «Mi interessa»: nessuna preselezione, salvo il parametro `?interesse=` (strategia di conversione §5). `form_id` richiesta-contatti. Pulsante: «Invia richiesta» (§23). Verificato sulla build del 2026-10-05: nessuna casella spuntata.
- **Sotto il pulsante resta «Preferisci parlarne a voce? Chiamaci al +39 080 2466520.»**, come in tutti i form del sito. Su mobile i recapiti stanno circa 1000–1300 px più in alto: la riga offre l'alternativa nel momento di esitazione o di errore. È la decisione di ux-designer sulla mia proposta di toglierla qui (review di accessibilità del 2026-09-28, §4, K2). La v1.3 diceva ancora che la riga era tolta.
- Microcopy del form (copywriter-brand, `microcopy.md` §4): sotto «Messaggio» il suggerimento «Raccontaci che cosa vuoi rendere esplorabile: uno spazio, un’attività, un territorio.»; dopo l'invio, le azioni «Esplora SIII», «Scopri Puglia Digitale» ed «Esplora Città Digitali».
- Il form non simula l'invio se manca l'endpoint (§23): finché manca, un avviso prima dei campi offre email e telefono, e il ripiego è in `src/scripts/form.ts`.

## 4. Persona

Tra il form e i portali: ritratto, nome e ruolo del fondatore, poi un link al suo racconto in Home. La composizione è quella della direzione visiva (§7.7), con il ritratto a inchiostro (DR3-b). La citazione del fondatore non c'è più: fuori dal racconto della Home cambiava significato (review di bozze, K1). Il link risponde all'osservazione N5 del verdetto G4.

**Ritratto** · `figure` · immagine e testi in `src/data/media.ts` (`founderPortraitContacts`)
| Elemento | Testo |
|---|---|
| Testo alternativo | Giacomo Lenoci in abito scuro, sorridente. |
| Nota di trasparenza · `figcaption` · mono | Immagine generata o elaborata con strumenti di intelligenza artificiale |

**H2** · nome e ruolo nello stesso heading, su due livelli · dati di `founder` in `src/data/site.ts` · [DA VERIFICARE: nome e ruolo, F7]
> Giacomo Lenoci\
> Fondatore di ITnode

Tra i due livelli c'è una virgola nascosta alla vista (`sr-only`): lo screen reader legge «Giacomo Lenoci, Fondatore di ITnode» (review di accessibilità del 2026-09-28, T6). In Chromium il nome calcolato ha uno spazio prima della virgola («Giacomo Lenoci , Fondatore di ITnode»), perché lo `sr-only` è posizionato. Non si sente: è lo stesso caso dei portali, per cui ux-designer ha deciso di non intervenire (verifica di accessibilità del 2026-09-28, A7). Se un giorno lo si volesse togliere, il separatore degli H1 (« – ») non lo produce: «Giacomo Lenoci – Fondatore di ITnode», provato in Chromium il 2026-10-05.

**Link al racconto del fondatore** · a → `/#fondatore` · sotto il ruolo · max 28 (22 più la freccia)
> Scopri il suo percorso →

| Campo | Valore |
|---|---|
| Testo visibile | Scopri il suo percorso |
| Testo per gli screen reader | « nella home», con lo spazio iniziale, in uno `<span class="sr-only">` subito dopo il testo visibile |
| Nome accessibile | Scopri il suo percorso nella home |
| Icona | → in SVG con `aria-hidden="true"`, attaccata all'ultima parola (tone of voice §6) |
| Markup | `Scopri il suo percorso<span class="sr-only"> nella home</span><Arrow dir="right" />`, come il link «Apri in Google Maps» dei recapiti |
| Destinazione | `/#fondatore`, sezione «Il fondatore» della Home; stessa scheda |
| Tracciamento | `data-track="cta_click"`, `data-cta-id="contatti-persona-percorso"`, `data-cta-location="persona"`: il nome della sezione, scelto dalla sessione principale al posto di «sezione». È nell'elenco del piano di misurazione (§5.1) |
| Stato | Applicato nel sito (commit bd78d79). Verificato il 2026-09-28 sulla build: una riga, nome accessibile «Scopri il suo percorso nella home». Riverificato il 2026-10-05 |

Alternativa: «Il suo percorso →» (15), la forma proposta dal creative-director. È più editoriale, ma non ha il verbo: nel sito ogni freccia accompagna un verbo con il suo oggetto (tone of voice §6, regola 1), quindi per coerenza propongo la forma con il verbo. Con l'alternativa il testo nascosto non cambia: «Il suo percorso nella home».

Note:
- **Nessuna frase nuova attribuita al fondatore** (K1, N5). Il link parla di lui in terza persona e non riassume il racconto: rimanda al testo che c'è già.
- **Perché «percorso».** Il racconto in Home comincia proprio così: «Il suo percorso comincia con IBM…». Chi clicca trova subito ciò che il link promette. Verificato il 2026-09-28 a 390 e a 1440 px: aprendo `/#fondatore`, occhiello, titolo e primo paragrafo della sezione sono visibili sotto l'header. Provato in pagina con il link iniettato: sta su una riga da 320 a 1920 px.
- **Perché il testo nascosto.** «Scopri il suo percorso» non dice che si cambia pagina: lo dice la freccia →, ma solo a chi la vede. « nella home» aggiunge la destinazione al nome accessibile, che comincia comunque con il testo visibile (tone of voice §6, regola 6; WCAG 2.5.3). Per il criterio 2.4.4 basterebbe già il titolo che precede, con nome e ruolo (tecnica H80): il testo nascosto serve a chi scorre l'elenco dei link. ux-designer, owner dell'accessibilità, l'ha confermato il 2026-10-05 (review della carta della pagina, §6).
- **Se il nome non viene confermato** (F7): propongo come H2 «Il fondatore di ITnode», la stessa formula prevista per la Home; il link resta com'è.
- **Evoluzione possibile** (review di conversione, osservazione 14; verdetto G4, N5). Se il cliente conferma che è il fondatore a rispondere alle richieste, e arriva una sua foto reale, la sezione può diventare «Ti risponde Giacomo Lenoci», insieme al blocco «Cosa succede dopo» della strategia di conversione (§8). Fino ad allora non si scrive. [DA FORNIRE: chi risponde alle richieste, tempi garantiti, foto reale]

## 5. I portali

**H2** · verbatim · max 24 · in `label`
> I portali

**Portali** · copy · una riga per portale
| Campo | Portale 1 | Portale 2 |
|---|---|---|
| Nome · H3 · link esterno · max 20 | Città Digitali ↗ | Puglia Digitale ↗ |
| Testo per gli screen reader, subito dopo il nome (`sr-only`) | «, portale cittàdigitali.it» | «, portale lapugliadigitale.it» |
| Nome accessibile del link e del titolo | Città Digitali, portale cittàdigitali.it | Puglia Digitale, portale lapugliadigitale.it |
| Descrizione accessibile del link | Si apre in una nuova scheda. | Si apre in una nuova scheda. |
| URL esterno | https://xn--cittdigitali-19a.it | https://www.lapugliadigitale.it |
| `cta_id` | contatti-portale-citta-digitali | contatti-portale-puglia-digitale |
| Frase · p · max 80 | Le attività del territorio, online senza perdere radici. | Una piattaforma interattiva immersiva per la valorizzazione territoriale. |
| Dominio visibile · p · mono · `aria-hidden` | cittàdigitali.it | lapugliadigitale.it |
| Link interno · a · max 28 | Esplora Città Digitali → | Scopri Puglia Digitale → |
| URL interno | `/citta-digitali/` | `/puglia-digitale/` |

Note:
- Le frasi sono lo statement della §17 e il sottotitolo della §13: stesse parole, stessa voce.
- I link interni usano le stesse etichette dei capitoli della Home: stessa azione, stessa etichetta (tone of voice §6).
- **Composizione.** Il nome del portale è il link esterno, in grande, con ↗ (direzione visiva §7.7). Il dominio si legge sotto la frase, in mono. Agli screen reader è nascosto perché è già nel nome del link.
- **Nuova scheda.** È annunciata con una descrizione (`aria-describedby`, un solo elemento nella pagina con il testo «Si apre in una nuova scheda.»). Così nell'elenco dei titoli lo screen reader legge «Città Digitali, portale cittàdigitali.it», senza l'avviso (ux-designer, review di accessibilità del 2026-09-28, A7). In Chromium il nome calcolato ha uno spazio prima della virgola: non si sente, nessuna azione (verifica di accessibilità, A7).
- **Questa forma sostituisce quella della v1.3**, che aveva un link a parte con il dominio, per di più senza accento. Il sito la usa dal 2026-09-28.
- **Dominio di Città Digitali** confermato dall'utente il 2026-10-05 (brief S7): nel testo «cittàdigitali.it», con la «à» composta; nel link il punycode, senza www (specifiche SEO §5.3).
- **Dominio di Puglia Digitale** confermato dall'utente il 2026-10-05: lapugliadigitale.it, come nelle LG §22 (brief S7). Il link resta `https://www.lapugliadigitale.it`, con www come nelle LG, finché la verifica da una rete normale non dice altro (specifiche SEO §5.4). Il dominio quasi omonimo, con il trattino, è di un'altra organizzazione: non si cita e non si linka (brief, omonimie).

## 6. Dati societari

**H2** · max 24 · in `label`
> Dati societari

**Dati societari** · copy · nell'ordine del sito · da completare prima della pubblicazione (soglia 5)
| Voce | Valore |
|---|---|
| Ragione sociale | ITNODE S.r.l. [DA VERIFICARE: grafia da visura, S1] |
| Partita IVA | 08937270729 [DA VERIFICARE: da visura, S2] |
| Sede operativa | Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA) |
| Sede legale | [DA VERIFICARE: da visura, S3. Se coincide con la sede operativa, le due voci diventano una sola, «Sede legale e operativa»] |
| Registro delle imprese e REA | [DA VERIFICARE: ufficio, numero di iscrizione e numero REA. I valori candidati sono nel brief (S4): vanno confermati con la visura] |
| Capitale sociale | [DA FORNIRE: importo versato, S4] |
| PEC | [DA VERIFICARE: valore candidato nel brief, S4] Facoltativa: non è tra i dati obbligatori della soglia 5 |

Note:
- **Nel sito oggi** compaiono ragione sociale, partita IVA e sede operativa. «Registro delle imprese e REA» e «Capitale sociale» compaiono quando i valori sono inseriti in `src/data/site.ts` (`rea`, `shareCapital`). Sede legale e PEC non hanno ancora un campo. Se la sede legale coincide con quella operativa basta cambiare l'etichetta in «Sede legale e operativa»; un campo nuovo serve solo se è diversa, o se il cliente vuole pubblicare la PEC.
- Gli stessi dati vanno nel footer di tutte le pagine (§24 e soglia 5). Qui compaiono per completezza, vicino ai recapiti. Sono la condizione C02 del verdetto G4.
- [DA VERIFICARE: se la società ha un socio unico o è in liquidazione, va indicato]

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Persona | Scopri il suo percorso → | `/#fondatore` |
| I portali | Esplora Città Digitali → · Scopri Puglia Digitale → | `/citta-digitali/` · `/puglia-digitale/` |
| Form, consenso | informativa privacy (microcopy di copywriter-brand) | `/privacy-policy/` |
| Form, dopo l'invio | Esplora SIII · Scopri Puglia Digitale · Esplora Città Digitali (microcopy di copywriter-brand) | `/siii/` · `/puglia-digitale/` · `/citta-digitali/` |

In entrata: la CTA «Parliamone» dell'header dalle pagine senza form, la navigazione, il footer, la chiusura della Home.

Link esterni: Google Maps e LinkedIn nei recapiti, i due portali nella sezione 5, più il footer. Nella build del 2026-10-05 i due link al portale di Città Digitali (sezione 5 e footer) usano il punycode senza www, e il dominio senza accento non compare mai.

## Allineamenti con gli altri documenti

| Punto | Scelta in questo documento | Motivo |
|---|---|---|
| Ordine dei blocchi | Recapiti, form, persona, portali, dati societari | Strategia di conversione §4 (canali diretti subito sotto la hero). |
| Hero | Nessun occhiello e nessuna CTA; lead senza i nomi dei tre progetti | Occhiello: direzione visiva §7.8 (T11). CTA: strategia di conversione §4. I nomi dei progetti sono già nel campo «Mi interessa» e nei portali. |
| Form | Introduzione della strategia di conversione §8; sotto il pulsante, «Preferisci parlarne a voce?» | Stesso testo in tutto il team. La riga sotto il pulsante resta per decisione di ux-designer (K2). |
| Link alla mappa | «Apri in Google Maps ↗» | Mappa SEO §3.5 e strategia di conversione (sostituisce «Indicazioni stradali» della v1.0). |
| Sezione Persona | Aggiunta nella v1.2 (copywriter-brand): ritratto, nome e ruolo, link «Scopri il suo percorso →» | Era nel sito ma non nel copy deck. Direzione visiva §7.7 (DR3-b); citazione tolta per la review di bozze (K1); link dal verdetto G4 (N5). |
| Portali | Nome come link esterno; dominio in mono; nuova scheda nella descrizione | Direzione visiva §7.7; ux-designer, A7. |
| Dominio di Città Digitali | cittàdigitali.it nel testo; `https://xn--cittdigitali-19a.it` nel link | Conferma dell'utente del 2026-10-05 (brief S7); specifiche SEO §5.3. Sostituisce il dominio senza accento delle LG §22, che è di un progetto omonimo di altri. |

## Verifica sul sito (2026-10-05)

**Metodo.**
- Build `dist/` del 2026-10-05, che corrisponde al commit 2a038de. L'ho copiata e servita in locale. Dopo quel commit `contatti.astro`, `pages.ts` e `site.ts` non sono cambiati.
- Testi letti dal DOM (`textContent`), nomi accessibili dall'albero di accessibilità di Chromium, a 390 e a 1440 px. Confronto con `src/pages/contatti.astro`, `src/data/pages.ts` e `src/data/site.ts`.
- Uno script controlla che ogni testo da pubblicare di questo documento compaia nella pagina, carattere per carattere.

**Esito.** I testi da pubblicare di questo documento sono nel sito, identici, con due eccezioni: title e meta, che nel sito sono diversi da quelli della mappa (V1), e i dati societari che il cliente deve ancora fornire (V2). Lo script trova 58 testi su 62: i 4 mancanti sono le voci dei dati societari senza valore. Rispetto alla v1.3 ho allineato sei punti: in ognuno il sito seguiva una decisione registrata.

| Punto | v1.3 | Sito, ora anche qui | Decisione |
|---|---|---|---|
| Dominio di Città Digitali | Senza accento, come nelle LG §22 | cittàdigitali.it; `href` in punycode | Utente, 2026-10-05 (commit eb691ee) |
| Portali | Nome in H3 e un link a parte con il dominio | Nome come link nell'H3; dominio in mono; nuova scheda nella descrizione | Direzione visiva §7.7; ux-designer, A7 |
| Occhiello della hero | «Contatti» | Breadcrumb | Sessione principale; direzione visiva §7.8 (T11) |
| Recapiti | Senza coordinate e senza nota sotto LinkedIn | Riga delle coordinate; «Profilo personale del fondatore» | Direzione visiva §7.7; review di bozze del 2026-09-28 |
| Riga sotto il form | Tolta | «Preferisci parlarne a voce? Chiamaci al +39 080 2466520.» | ux-designer, K2 |
| Dati societari | Sede legale prima della partita IVA | Ordine e voci del sito; Registro delle imprese e capitale solo quando ci sono i valori | `contatti.astro` (sessione principale); soglia 5 |

**Differenze aperte.**

| # | Dove | Differenza | Proposta | Chi decide |
|---|---|---|---|---|
| V1 | Title e meta: `src/data/pages.ts` e mappa SEO §2 | Sito: «Contatti, Acquaviva delle Fonti (BA) \| ITnode» e «Via Sant’Anna, 34,». Mappa: «Contatti \| ITnode, Acquaviva delle Fonti (BA)» e «Via Sant’Anna 34,» | Adottare nella mappa la versione del sito (K3, K4; specifiche SEO §2.2). Il sito non cambia | seo-content |
| V2 | Dati societari | Mancano sede legale, Registro delle imprese e REA, capitale sociale (soglia 5) | Dati dal cliente con la visura; poi i valori in `site.ts` e, se la sede legale è diversa, un campo per mostrarla | Cliente (C02); sessione principale |
| V3 | `docs/ux/struttura-pagine.md` CT-1 | Citava l'occhiello nella hero | **Chiusa il 2026-10-05**: `struttura-pagine.md` 0.5 descrive la pagina come il sito | ux-designer |

## Testi originali mancanti

Nessuno per i recapiti, completi nelle LG. Il lead e l'introduzione al form sono testi nuovi, scritti con i soli dati forniti. Mancano i dati societari obbligatori.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL, recapiti e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 5 | 38 | 241 | **65,1** |
| Tutti i testi principali | 13 | 58 | 368 | 92,8 |

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. Lo stesso script ha controllato 14 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description, sia nella versione della mappa (45 e 154 caratteri) sia in quella del sito (45 e 155). Ricalcolato il 2026-10-05: il totale comprende ora la sezione Persona, aggiunta nella v1.2.

## Ipotesi da validare

- [IPOTESI: il profilo LinkedIn indicato è quello del fondatore, Giacomo Lenoci (brief F7)]
- [IPOTESI: la sede operativa riceve visite. Il link a Google Maps ha senso solo in questo caso]
- [IPOTESI: il link della sezione Persona non sottrae richieste. Sta dopo il form, e la sezione del fondatore in Home è seguita dalla chiusura con «Parliamone →», che riporta qui]
- [DA VERIFICARE: risposta dei due portali da una rete normale: risoluzione del dominio, HTTPS, forma con o senza www. È bloccante per il go-live dei link (seo-technical, review del dominio, oss. 1; specifiche SEO §5.3 e §5.4)]

## Domande aperte

1. Dati societari completi: sede legale, REA, capitale sociale versato, PEC, eventuale socio unico (brief S1–S4, D10).
2. Esiste una pagina aziendale LinkedIn di ITnode (S6)?
3. Orari di risposta al telefono, se il cliente vuole indicarli.
4. Tempi di risposta al form: se c'è un impegno reale (per esempio «entro due giorni lavorativi»), diventa una rassicurazione. Senza conferma non si scrive.
5. Chi risponde alle richieste? Se è il fondatore, la sezione Persona può diventare «Ti risponde…» (sezione 4, evoluzione possibile).

## Decisioni richieste

- **seo-content**: title e meta della mappa allineati al sito (V1).
- **cro-specialist**: conferma del lead senza CTA.
- **creative-director**: forma del link della sezione Persona, «Scopri il suo percorso →» (proposta) o «Il suo percorso →».
