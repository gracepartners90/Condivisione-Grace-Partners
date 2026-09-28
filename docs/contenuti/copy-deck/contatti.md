---
titolo: Copy deck · Contatti
owner: copywriter-content
contributi: [copywriter-brand, seo-content, seo-technical, cro-specialist, ux-designer]
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, src/data/site.ts]
---

# Copy deck · Contatti

Pagina `/contatti`. Copre la sezione 22 delle linee guida e l'introduzione al form (sez. 23). I recapiti sono quelli forniti dal cliente, senza modifiche. I testi sono pronti da impaginare.

## Come leggere questo documento

- **Testo da pubblicare**: è nei blocchi citati (`>`) e nelle tabelle marcate come copy. Tutto il resto sono note per design e sviluppo.
- **Tag**: livello semantico, non dimensione visiva. **max**: caratteri, spazi inclusi. **verbatim**: frase delle linee guida da non modificare.
- **Link esterni**: nuova scheda (`target="_blank" rel="noopener"`), dichiarata nel nome accessibile.
- **Microcopy del form** (etichette, errori, stati, conferma, consenso privacy): è di copywriter-brand.

## Metadati

Proposta da validare con seo-content: manca ancora il brief SEO della pagina.

| Campo | Testo | Limite |
|---|---|---|
| URL | `/contatti` | — |
| Title | Contatti · ITnode · Acquaviva delle Fonti (BA) | ≤ 60 |
| Meta description | Parliamo del prossimo spazio digitale. Scrivi a ITnode o chiama la sede di Acquaviva delle Fonti (BA) per SIII, Puglia Digitale e Città Digitali. | 120–155 |
| og:title | Contatti · ITnode | ≤ 60 |
| og:description | Parliamo del prossimo spazio digitale. | ≤ 110 |
| Breadcrumb | Home › Contatti | — |

## Struttura della pagina

| # | Sezione | Ancora | Componente suggerito (sez. 30) |
|---|---|---|---|
| 1 | Hero | — | Hero, variante compatta |
| 2 | Recapiti | `#recapiti` | Lista editoriale (`<address>` + `<dl>`) |
| 3 | I portali | `#portali` | Due righe editoriali |
| 4 | Form | `#contatto` | ContactForm |
| 5 | Dati societari | `#dati-societari` | Blocco testuale piccolo |

## 1. Hero

**Eyebrow** · p · max 24
> Contatti

**H1** · verbatim · max 40
> Parliamo del prossimo spazio digitale.

**Lead** · p · max 160
> Un’impresa da rendere esplorabile, un territorio da valorizzare, una domanda su SIII, Puglia Digitale o Città Digitali: scrivici o chiamaci.

**CTA** · a → `#contatto` · max 24 · facoltativa, da validare con cro-specialist
> Scrivici ↓

Note:
- L'H1 non contiene la parola «Contatti»: la portano l'eyebrow, il title e il breadcrumb. Da confermare con seo-content.
- «Un territorio da valorizzare» si rivolge agli enti, che il form prevede nel campo «Nome Azienda / Ente» (sez. 23).

## 2. Recapiti

**H2** · max 24 · può essere visivamente nascosto
> Recapiti

**Recapiti** · copy · `<address>` con una `<dl>`
| Etichetta (`dt`) | Valore (`dd`) | Link | Nome accessibile del link |
|---|---|---|---|
| Sede operativa | Via Sant’Anna, 34 · 70021 Acquaviva delle Fonti (BA) | «Indicazioni stradali →» → https://www.google.com/maps/search/?api=1&query=Via%20Sant%27Anna%2034%2C%2070021%20Acquaviva%20delle%20Fonti%20BA | Indicazioni stradali per la sede operativa di ITnode (si apre in una nuova scheda) |
| Telefono | +39 080 2466520 | `tel:+390802466520` | — |
| Mobile | +39 335 1229785 | `tel:+393351229785` | — |
| Email | info@itnode.it | `mailto:info@itnode.it` | — |
| LinkedIn | Giacomo Lenoci | https://www.linkedin.com/in/giacomo-lenoci/ | Giacomo Lenoci su LinkedIn (si apre in una nuova scheda) |

Note:
- Valori verbatim dalla sez. 22 e già presenti in `src/data/site.ts`. Nei numeri di telefono usare spazi non separabili, così non vanno a capo.
- Il link a Google Maps è una proposta: è un semplice link, senza mappa incorporata, quindi nessun cookie di terze parti prima del consenso. Una mappa incorporata richiederebbe il consenso (soglia 5).
- Il profilo LinkedIn è personale. Come testo del link uso il nome visibile nell'indirizzo del profilo. [DA VERIFICARE: nome e ruolo. Se ITnode ha una pagina aziendale su LinkedIn, valutare di aggiungerla]
- [DA FORNIRE, facoltativo: orari in cui si risponde al telefono]

## 3. I portali

**H2** · verbatim · max 24
> I portali

**Portali** · copy · una riga per portale
| Campo | Portale 1 | Portale 2 |
|---|---|---|
| Nome · H3 · max 20 | Città Digitali | Puglia Digitale |
| Frase · p · max 80 | Le attività del territorio, online senza perdere radici. | Una piattaforma interattiva immersiva per la valorizzazione territoriale. |
| Link esterno · a | cittadigitali.it ↗ | lapugliadigitale.it ↗ |
| Nome accessibile del link esterno | Portale Città Digitali, cittadigitali.it (si apre in una nuova scheda) | Portale Puglia Digitale, lapugliadigitale.it (si apre in una nuova scheda) |
| URL esterno | https://www.cittadigitali.it | https://www.lapugliadigitale.it |
| Link interno · a · max 24 | Scopri il progetto → | Scopri il progetto → |
| Nome accessibile del link interno | Scopri il progetto Città Digitali | Scopri il progetto Puglia Digitale |
| URL interno | `/citta-digitali` | `/puglia-digitale` |

Note:
- Le frasi sono lo statement della sez. 17 e il sottotitolo della sez. 13: stesse parole, stessa voce.
- L'icona «↗» è decorativa (`aria-hidden="true"`): la nuova scheda è dichiarata nel nome accessibile.
- Due link per riga: il portale esterno richiesto dalla sez. 22 e la pagina interna del progetto (collegamento interno).

## 4. Form

**H2** · max 32
> Scrivici

**Introduzione del form** · p · max 160
> Compila il modulo: ti ricontattiamo per capire insieme da dove partire.

**Alternativa al form** · p · max 70 · il numero è un link `tel:`
> Preferisci parlarne a voce? Chiama il +39 080 2466520.

Note:
- Campo «Mi interessa»: nessuna preselezione in questa pagina, perché manca un contesto.
- Pulsante di invio: «Invia richiesta» (sez. 23, verbatim). Il resto del microcopy è di copywriter-brand.
- Il form non deve simulare l'invio se non esiste ancora un endpoint (sez. 23).

## 5. Dati societari

**H2** · max 24
> Dati societari

**Dati societari** · copy · da completare prima della pubblicazione (soglia 5)
| Voce | Valore |
|---|---|
| Ragione sociale | ITNODE S.r.l. [DA VERIFICARE] |
| Sede legale | [DA FORNIRE] |
| Partita IVA | 08937270729 [DA VERIFICARE] |
| Registro delle imprese | [DA FORNIRE: ufficio e numero di iscrizione, numero REA] |
| Capitale sociale | [DA FORNIRE: importo e quota versata] |

Note:
- Ragione sociale e partita IVA vengono da `src/data/site.ts`, dove sono marcate come ricavate da un registro pubblico. Vanno confermate dal cliente.
- Gli stessi dati vanno anche nel footer, su tutte le pagine (sez. 24 e soglia 5).
- [DA VERIFICARE: se la società ha un socio unico, va indicato; lo stesso vale per un'eventuale liquidazione]

## Collegamenti interni

| Da | Anchor | Verso |
|---|---|---|
| Hero | Scrivici ↓ | `#contatto` |
| I portali | Scopri il progetto → | `/citta-digitali`, `/puglia-digitale` |

## Testi originali mancanti

Nessuno per i recapiti, che sono completi nelle linee guida. Il lead, l'introduzione al form e l'alternativa telefonica sono nuovi e usano solo dati forniti. Mancano i dati societari obbligatori.

## Leggibilità

Indice Gulpease calcolato con uno script sui testi principali (titoli, paragrafi, tabelle di copy; esclusi eyebrow, CTA, URL, recapiti e metadati). Formula: 89 + (300 × frasi − 10 × lettere) / parole.

| Insieme | Frasi | Parole | Lettere | Gulpease |
|---|---|---|---|---|
| Paragrafi e tabelle | — | — | — | — |
| Tutti i testi principali | — | — | — | — |

## Ipotesi da validare

- [IPOTESI: il profilo LinkedIn indicato è quello del fondatore, Giacomo Lenoci]
- [IPOTESI: la sede operativa è anche il luogo dove si ricevono visite. Il link «Indicazioni stradali» ha senso solo in questo caso]

## Domande aperte

1. Dati societari completi: sede legale, REA, capitale sociale, eventuale socio unico.
2. Esiste una pagina aziendale LinkedIn di ITnode, da affiancare o sostituire al profilo personale?
3. Orari di risposta telefonica, se il cliente vuole indicarli.
4. Tempi di risposta al form: se c'è un impegno reale (per esempio «entro due giorni lavorativi»), può diventare una rassicurazione. Senza conferma non va scritto.

## Decisioni richieste

- **cro-specialist**: CTA «Scrivici ↓» nella hero e riga «Preferisci parlarne a voce?» accanto al form.
- **ux-designer**: link a Google Maps (sì o no) e posizione dei dati societari (pagina e footer).
