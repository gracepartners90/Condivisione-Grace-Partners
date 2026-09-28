---
titolo: Copy deck · Contatti
owner: copywriter-content
contributi: [copywriter-brand, seo-content, seo-technical, cro-specialist, ux-designer]
stato: in revisione
versione: 1.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/seo/mappa-keyword-url.md, docs/cro/strategia-conversione.md, docs/contenuti/tone-of-voice.md, src/data/site.ts]
---

# Copy deck · Contatti

Pagina `/contatti/`. Copre la sezione 22 delle linee guida (LG) e l'introduzione al form (§23). I recapiti sono quelli forniti dal cliente, senza modifiche. I testi sono pronti da impaginare.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi. **verbatim**: frase delle LG; si cambia solo l'apostrofo tipografico.
- **Frecce** (tone of voice §6): → altra pagina, ↗ sito esterno in nuova scheda. Sempre `aria-hidden="true"`.
- **Link esterni**: `target="_blank" rel="noopener"`. Il nome accessibile inizia con il testo visibile (WCAG 2.5.3) e dichiara la nuova scheda.
- **Fonti che prevalgono nel loro dominio**: brief consolidato (dati societari, S1–S8), mappa keyword→URL (metadati, heading), strategia di conversione (ordine dei blocchi, CTA, form), tone of voice (grafie).
- **Microcopy del form** (etichette, errori, stati, conferma, consenso): copywriter-brand e strategia di conversione §8.

## Metadati

Fa fede `docs/seo/mappa-keyword-url.md` §2 (owner seo-content). Copia per comodità:

| Campo | Testo | Limite |
|---|---|---|
| Title | Contatti \| ITnode, Acquaviva delle Fonti (BA) | ≤ 60 |
| Meta description | Parliamo del tuo prossimo spazio digitale: SIII, Puglia Digitale o Città Digitali. ITnode, Via Sant’Anna 34, Acquaviva delle Fonti (BA). Tel. 080 2466520. | 140–155 |
| Breadcrumb | Home › Contatti | — |

## Struttura della pagina

Ordine della strategia di conversione §4: prima i canali diretti, poi il form. Su desktop recapiti e form stanno affiancati; su mobile i recapiti vengono prima.

| # | Sezione | Ancora | Componente suggerito (§30) |
|---|---|---|---|
| 1 | Hero | — | Hero, variante compatta |
| 2 | Recapiti | `#recapiti` | `<address>` con `<dl>` |
| 3 | Scrivici | `#richiesta` | ContactForm |
| 4 | I portali | `#portali` | Due righe editoriali |
| 5 | Dati societari | `#dati-societari` | Blocco testuale piccolo |

## 1. Hero

**Eyebrow** · p · max 24
> Contatti

**H1** · verbatim · max 40
> Parliamo del prossimo spazio digitale.

**Lead** · p · max 160
> Hai un’impresa da rendere esplorabile o un territorio da valorizzare? Raccontacelo: scrivici o chiamaci.

Note:
- Nessuna CTA nella hero (strategia di conversione §4): i canali diretti sono subito sotto.
- L'H1 non contiene «Contatti»: la parola è nell'eyebrow, nel title e nel breadcrumb (mappa SEO §3.5).
- «Un territorio da valorizzare» si rivolge anche agli enti, previsti dal campo «Nome Azienda / Ente» (§23).

## 2. Recapiti

**H2** · max 24 · può essere visivamente nascosto
> Recapiti

**Recapiti** · copy · `<address>` con una `<dl>`, in quest'ordine
| Etichetta (`dt`) | Valore e link (`dd`) | Destinazione | Nome accessibile del link | `cta_id` |
|---|---|---|---|---|
| Telefono | +39 080 2466520 | `tel:+390802466520` | — | contatti-telefono |
| Mobile | +39 335 1229785 | `tel:+393351229785` | — | contatti-mobile |
| Email | info@itnode.it | `mailto:info@itnode.it` | — | contatti-email |
| Sede operativa | Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA) · link «Apri in Google Maps ↗» | https://www.google.com/maps/search/?api=1&query=Via%20Sant%27Anna%2034%2C%2070021%20Acquaviva%20delle%20Fonti%20BA | Apri in Google Maps la sede operativa di ITnode (si apre in una nuova scheda) | contatti-mappa |
| LinkedIn | Giacomo Lenoci ↗ | https://www.linkedin.com/in/giacomo-lenoci/ | Giacomo Lenoci su LinkedIn (si apre in una nuova scheda) | contatti-linkedin |

Note:
- Valori verbatim dalla §22, già in `src/data/site.ts`. Nei numeri di telefono vanno spazi non separabili, così non vanno a capo (tone of voice §7). Nome, indirizzo e telefono devono essere identici qui, nel footer, nei dati strutturati e sui profili esterni (mappa SEO §3.5).
- «Sede operativa» diventa «Sede legale e operativa» se il cliente conferma che i due indirizzi coincidono (brief S3).
- Google Maps: un link, niente mappa incorporata, quindi nessun cookie di terze parti prima del consenso (soglia 5).
- LinkedIn: il profilo è personale (brief S6). L'etichetta «LinkedIn» più il nome lo rendono chiaro. [DA VERIFICARE: nome, F7] Se ITnode ha una pagina aziendale, va aggiunta [DA FORNIRE].

## 3. Scrivici

**H2** · max 32
> Scrivici

**Introduzione del form** · p · max 160
> Scrivici di cosa hai bisogno: ti ricontattiamo noi.

Note:
- Testo della strategia di conversione §8, adottato così com'è.
- «Mi interessa»: nessuna preselezione, salvo il parametro `?interesse=` (strategia di conversione §5). `form_id` richiesta-contatti. Pulsante: «Invia richiesta» (§23).
- Il form non simula l'invio se manca l'endpoint (§23): il ripiego con email e telefono è già in `src/scripts/form.ts`.

## 4. I portali

**H2** · verbatim · max 24
> I portali

**Portali** · copy · una riga per portale
| Campo | Portale 1 | Portale 2 |
|---|---|---|
| Nome · H3 · max 20 | Città Digitali | Puglia Digitale |
| Frase · p · max 80 | Le attività del territorio, online senza perdere radici. | Una piattaforma interattiva immersiva per la valorizzazione territoriale. |
| Link esterno · a | cittadigitali.it ↗ | lapugliadigitale.it ↗ |
| Nome accessibile del link esterno | cittadigitali.it, portale di Città Digitali (si apre in una nuova scheda) | lapugliadigitale.it, portale di Puglia Digitale (si apre in una nuova scheda) |
| URL esterno | https://www.cittadigitali.it | https://www.lapugliadigitale.it |
| `cta_id` | contatti-portale-citta-digitali | contatti-portale-puglia-digitale |
| Link interno · a · max 28 | Esplora Città Digitali → | Scopri Puglia Digitale → |
| URL interno | `/citta-digitali/` | `/puglia-digitale/` |

Note:
- Le frasi sono lo statement della §17 e il sottotitolo della §13: stesse parole, stessa voce.
- I link interni usano le stesse etichette dei capitoli della Home: stessa azione, stessa etichetta (tone of voice §6).
- Dominio di Città Digitali da verificare in QA (cittadigitali.it o cittàdigitali.it: brief, glossario).

## 5. Dati societari

**H2** · max 24
> Dati societari

**Dati societari** · copy · da completare prima della pubblicazione (soglia 5)
| Voce | Valore |
|---|---|
| Ragione sociale | ITNODE S.r.l. [DA VERIFICARE: grafia da visura, S1] |
| Sede legale | Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA) [DA VERIFICARE: da visura, S3] |
| Partita IVA | 08937270729 [DA VERIFICARE: da visura, S2] |
| Registro delle imprese | [DA FORNIRE: ufficio, numero di iscrizione e numero REA, S4] |
| Capitale sociale | [DA FORNIRE: importo versato, S4] |
| PEC | [DA VERIFICARE: indirizzo trovato su fonte pubblica, da confermare, S4] |

Note:
- Gli stessi dati vanno nel footer di tutte le pagine (§24 e soglia 5). Qui compaiono per completezza, vicino ai recapiti.
- [DA VERIFICARE: se la società ha un socio unico o è in liquidazione, va indicato]

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| I portali | Esplora Città Digitali → · Scopri Puglia Digitale → | `/citta-digitali/` · `/puglia-digitale/` |
| Form, consenso | informativa privacy (microcopy di copywriter-brand) | `/privacy-policy/` |

In entrata: la CTA «Parliamone» dell'header dalle pagine senza form, la navigazione, il footer, la chiusura della Home.

## Allineamenti con gli altri documenti

| Punto | Scelta in questo documento | Motivo |
|---|---|---|
| Ordine dei blocchi | Recapiti, form, portali, dati societari | Strategia di conversione §4 (canali diretti subito sotto la hero). |
| Hero | Nessuna CTA; lead riscritto senza i nomi dei tre progetti | Strategia di conversione §4. I nomi dei progetti sono già nel campo «Mi interessa» e nei portali. |
| Form | Introduzione della strategia di conversione §8 | Stesso testo in tutto il team. Tolta la riga «Preferisci parlarne a voce?» della v1.0: i canali diretti sono già sopra il form. |
| Link alla mappa | «Apri in Google Maps ↗» | Mappa SEO §3.5 e strategia di conversione (sostituisce «Indicazioni stradali» della v1.0). |

## Testi originali mancanti

Nessuno per i recapiti, completi nelle LG. Il lead e l'introduzione al form sono testi nuovi, scritti con i soli dati forniti. Mancano i dati societari obbligatori.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL, recapiti e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | 5 | 38 | 241 | **65,1** |
| Tutti i testi principali | 12 | 53 | 338 | 93,2 |

Obiettivo (tone of voice §3): almeno 60 per i testi rivolti a tutti, almeno 50 per i testi descrittivi. Esito: raggiunto. Il valore di riferimento è quello dei soli paragrafi, più prudente. Lo stesso script ha controllato 14 elementi con limite di lunghezza (nessuno supera il massimo) e i limiti di title e meta description.

## Ipotesi da validare

- [IPOTESI: il profilo LinkedIn indicato è quello del fondatore, Giacomo Lenoci (brief F7)]
- [IPOTESI: la sede operativa riceve visite. Il link a Google Maps ha senso solo in questo caso]

## Domande aperte

1. Dati societari completi: sede legale, REA, capitale sociale versato, PEC, eventuale socio unico (brief S1–S4, D10).
2. Esiste una pagina aziendale LinkedIn di ITnode (S6)?
3. Orari di risposta al telefono, se il cliente vuole indicarli.
4. Tempi di risposta al form: se c'è un impegno reale (per esempio «entro due giorni lavorativi»), diventa una rassicurazione. Senza conferma non si scrive.

## Decisioni richieste

- **ux-designer**: composizione affiancata o in colonna di recapiti e form; posizione dei dati societari (pagina e footer).
- **cro-specialist**: conferma del lead senza CTA.
