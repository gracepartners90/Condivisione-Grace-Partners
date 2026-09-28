---
titolo: Direzione visiva
owner: creative-director
contributi: [ui-designer, web-performance-specialist, ux-designer]
stato: in revisione
versione: 0.2
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/brief/brief-consolidato.md, docs/creativa/analisi-riferimento.md, docs/ux/sitemap.md, docs/contenuti/copy-deck/home.md, src/assets/images/, test tipografici, cromatici e fotografici del 2026-09-28 (Playwright 1.56, sharp 0.34), review di Fase 5 in docs/review/ (2026-09-28), docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/decisioni/005-preload-del-font.md]
---

# Direzione visiva ITnode: Editorial × Technology × Immersive

**L'idea.** Il sito è un orizzonte che si può esplorare. Un luogo si capisce guardandosi intorno: ITnode porta questo gesto sul Web e trasforma spazi fisici in spazi digitali in cui entrare, muoversi e scegliere. Il sito non lo racconta, lo usa:
- titoli che stanno in piedi su una linea d'orizzonte;
- luoghi veri misurati in gradi e coordinate;
- immagini in cui si entra;
- punti che rispondono.

Tutto il resto è tipografia e aria.

**Come si usa questo documento.** Le scelte qui sono **decisioni**. Il `ui-designer` le traduce in token e componenti: può rinominare i token, ma per cambiare un valore passa da una review del creative-director. I valori in pixel sono misurati, non stimati (test del 2026-09-28).

**Modifiche della versione 0.2 (gate G4, 2026-09-28).** Decisioni prese sul sito costruito, motivate nel verdetto `docs/review/2026-09-28-sito-verdetto-g4-creative-director.md`:
- §1.4: regola sulla precisione delle coordinate.
- §1.5: la cascata rientra di un passo per registro; negli statement dei capitoli l'arrivo scende a `display-m`.
- §2: seconda eccezione alle sfumature, la dissolvenza ai bordi della finestra dell'Orizzonte.
- §3.2: `display-m` a 600 ammesso come titolo di sezione o di voce; il preload di Schibsted resta (ADR 005).
- §4.3: stato di DR3 e nuove maschere dei ritratti.
- §4.5: variante «in pubblicazione» delle esperienze SIII senza nome e con i gradi.
- §5: campo visivo di 200° anche su tablet, occhiello corto.
- §7.3–7.8: statement dei capitoli, «10.000+» senza conferma, numeri con il solo «30+», porte di Puglia Digitale da ovest a est a tutte le larghezze, copertina del video senza orizzonte, nodi della 404.

---

## 1. Quattro dispositivi firma

Il concept delle linee guida (spazio fisico → spazio digitale → persone → imprese → territorio) diventa quattro segni riconoscibili, più una regola tipografica.

| Dispositivo | Anello del concept | In una riga |
|---|---|---|
| **L'Orizzonte** | spazio fisico | Una linea graduata da 0° a 360°, come la bussola di un tour virtuale |
| **La Soglia** | spazio digitale | Ogni immagine è un'apertura a spigoli vivi in cui si entra |
| **Il Nodo** | persone e imprese | La «o» di itNode diventa il segno di tutto ciò che si può toccare |
| **Le Coordinate** | territorio | L'unico ornamento ammesso è un dato geografico vero |
| *Regola tipografica:* **Il Passaggio** | il salto da un mondo all'altro | Ogni statement ha due registri: partenza e arrivo, sfalsati |

### 1.1 L'Orizzonte (spazio fisico)

- **Cos'è.** Una linea di 1 px all'altezza dello sguardo, graduata come la bussola di un visore a 360°:
  - tacche ogni 5° (alte 6 px), 15° (12 px) e 45° (20 px);
  - etichette mono solo ogni 45°: «045°», e ai cardinali «000° N», «090° E», «180° S», «270° O».
  - Sopra la linea c'è il cielo, lo spazio del titolo; sotto c'è la terra, lo spazio dei dati.
- **Dove.**
  - Hero della Home: in movimento, vedi §5.
  - Apertura dei tre capitoli in Home: statica, con il rilevamento del capitolo (01 = 000°, 02 = 120°, 03 = 240°: tre direzioni della stessa visione).
  - Timeline del fondatore: diventa orizzonte del tempo.
  - Pagina 404.
- **Come si costruisce.** SVG generato al build da un file di dati (componente Astro), in unità relative e senza JavaScript per il disegno. Il JavaScript o le scroll-driven animations servono solo a traslarlo.
- **Si fa.**
  - Le tacche scendono sotto la linea e le etichette stanno sotto le tacche.
  - Sopra la linea c'è solo il titolo.
  - La linea va a tutta larghezza, oltre i margini, solo nella hero.
- **Non si fa.** Curve, prospettive 3D, bagliori, mirini, numeri di «telemetria» inventati, più di un orizzonte per schermata.

### 1.2 La Soglia (spazio digitale)

- **Cos'è.** Foto, video e anteprime non sono «card»: sono aperture rettangolari a spigoli vivi. All'ingresso nella viewport si aprono dall'orizzonte, da una fessura orizzontale all'immagine intera (§6).
- **Formati**, presi dall'architettura e non dai template:

  | Nome | Proporzione | Uso |
  |---|---|---|
  | Porta | 3:5 | luoghi |
  | Ritratto | 4:5 | persone, ritagli verticali della foto evento |
  | Schermo | 16:10 | esperienze SIII, portali |
  | Panorama | 2,27:1 (foto evento), 21:9 (panorami futuri) | documenti larghi |
  | Video | 16:9 | video Città Digitali |

- **Regola del rettangolo e del cerchio.** Il rettangolo è lo spazio (immagini, campi dei form: raggio 0). Il cerchio è l'interazione (nodi e pulsanti a pillola). Non esistono altri raggi.
- **Non si fa.** Angoli arrotondati sulle immagini, ombre, cornici decorative, vetro smerigliato, più di una soglia in movimento per schermata.

### 1.3 Il Nodo (persone e imprese)

- **Cos'è.** La «o» del logo, un anello blu, diventa il segno di ciò che si può esplorare: un punto pieno di Ø 10 px e un anello di 1 px con Ø 26 px.
  - **Blu** (`blu-node`) = interazione, cioè un hotspot.
  - **Terra/arancio** = luogo.
- **Perché.** Nei tour di ITnode le imprese sono punti nello spazio: lo si vede sugli schermi della foto evento, con i loghi delle attività sulla vista aerea della città. Il nodo è il punto in cui una persona incontra un'impresa.
- **Dove.**
  - Hotspot numerati sulla foto evento e sulle anteprime SIII.
  - Confronto Tour 360° / SIII.
  - Luoghi sulle carte e sull'orizzonte.
  - Voce attiva del menu: un punto prima dell'etichetta.
  - Favicon: l'anello.
- **Interazione.**
  - È sempre un `<button>` o un `<a>` reale.
  - Hover e focus: l'anello cresce (×1,4) e compare un'etichetta mono con una sola linea di richiamo.
  - Focus visibile di 2 px.
- **Non si fa.** Nodi decorativi o come puntini d'elenco; reti di nodi collegati da linee (l'estetica «plexus»); pulsazioni infinite; più di 5 nodi per immagine.

### 1.4 Le Coordinate (territorio)

- **Cos'è.** Dati geografici veri come unico ornamento:
  - coordinate in gradi decimali a 4 cifre, per esempio «40.8957° N · 16.8412° E»;
  - rilevamento e distanza dalla sede di Acquaviva delle Fonti, per esempio «MONOPOLI · 081° · 39 KM»;
  - cartografia a filo.
- **Dove.** Orizzonte della hero, carta della Puglia, porte dei luoghi, carta d'Italia, didascalie degli showcase (dove si trova l'impresa), Contatti (sede e link «Apri in Mappe»), firma del footer.
- **Come.**
  - Contorni da Natural Earth 1:10m (pubblico dominio), semplificati: al massimo 8 KB per carta.
  - Una sola proiezione per tutte le carte.
  - Tratto di 1 px con `vector-effect: non-scaling-stroke`.
  - Coordinate da OpenStreetMap o Wikipedia, con 4 decimali.
- **Dati di lavoro** (calcolati il 2026-09-28): `[DA VERIFICARE]` prima della pubblicazione.

  | Luogo | Coordinate | Da Acquaviva | Distanza | Mondo |
  |---|---|---|---|---|
  | Acquaviva delle Fonti (sede) | 40.8957° N · 16.8412° E | — | — | ITnode, Puglia Digitale, SIII (D.L. Natura Dentro) |
  | Cassano delle Murge | 40.8906° N · 16.7700° E | 265° | 6 km | SIII (Masseria Santella) |
  | Altamura | 40.8286° N · 16.5528° E | 253° | 25 km | Città Digitali |
  | Gravina in Puglia | 40.8196° N · 16.4231° E | 257° | 36 km | Puglia Digitale |
  | Monopoli | 40.9500° N · 17.3000° E | 081° | 39 km | Puglia Digitale, SIII (Maison Miminà) |
  | Caltanissetta | 37.4900° N · 14.0617° E | 213° | 448 km | Città Digitali |
  | Varese | 45.8206° N · 8.8251° E | 313° | 848 km | Città Digitali |

  L'associazione tra showcase SIII e comune è dedotta dall'indirizzo del portale (acquavivadigitale, cassanodigitale, monopolidigitale). `[DA VERIFICARE]`

- **Precisione (regola del G4).** Le cifre mostrate sono quelle della fonte, mai completate con zeri.
  - **Opzione principale:** tutti i luoghi dalla stessa fonte (nodo del centro del comune in OpenStreetMap, oppure Wikidata P625), con 4 decimali reali; la fonte si scrive in un commento accanto ai dati.
  - **Ripiego:** se la fonte unica non è disponibile prima del lancio, 2 decimali per tutti i luoghi (circa 1 km: la precisione onesta del «centro di un comune»).
  - Mai precisioni diverse nella stessa pagina.
  - Nel sito costruito Monopoli (40.9500 · 17.3000), Caltanissetta (37.4900) e Cassano delle Murge (16.7700) sono arrotondati e mostrati con 4 decimali: vanno corretti. Una ricerca del 2026-09-28 restituisce per Monopoli valori diversi a seconda della fonte (40.9571 · 17.2905 e 40.9525 · 17.2986): per questo serve un'unica fonte dichiarata.

- **Non si fa.** Pattern topografici decorativi, mappe del mondo a puntini, pin in stile Google, coordinate inventate o arrotondate per effetto.

### 1.5 Regola tipografica: Il Passaggio

- **Cos'è.** Gli statement si compongono su due registri:
  - la prima riga è il punto di partenza, ciò che si conosce;
  - la seconda è l'arrivo, ciò che ITnode rende possibile, sfalsata verso destra.
- **Perché.** Le linee guida sono già scritte così:
  - «Spazi reali. / Esperienze digitali.»
  - «Un territorio. / Migliaia di storie.»
  - «Non raccontare la tua azienda. / Falla esplorare.»
  - «Dal locale / al nazionale.»
  - «La tecnologia cambia. / La curiosità ci accompagna da sempre.»

  Il salto di riga è il confine che il sito supera.
- **Regole.**
  - Rientro della seconda riga: 2 colonne su desktop, 1 su tablet, 1,2 em su mobile.
  - Gli a capo sono d'autore: stanno nel contenuto come righe separate, non vengono dal browser. Se una riga d'autore non entra nella colonna, va a capo bilanciata (`text-wrap: balance` su ogni riga, qualunque sia il tag).
  - Massimo 2 registri; 3 solo per «Entra. / Esplora. / Interagisci.», a cascata: ogni registro rientra di un passo in più del precedente (desktop 2 e 4 colonne, tablet 1 e 2, mobile 1,2 em e 2,4 em; a 320 px nessun rientro).
  - Mai centrato.
  - La seconda riga può scendere di un gradino di scala (§3), mai salire.
  - **Statement dei capitoli della Home:** partenza in `display-l` 600, arrivo in `display-m` 400, come il secondo registro della hero. In `display-l` pieno l'arrivo andava a capo per il browser fino a 6 righe (verifica UI, V4).

---

## 2. Palette

**Principio: calce, pietra, inchiostro e notte. Il blu è raro, l'arancio segna i luoghi.**
- **Neutri minerali.** La base viene dai materiali del territorio: la calce dei centri storici, la pietra calcarea della Murgia.
- **Inchiostro.** Per l'autorevolezza editoriale.
- **Notte.** Un nero appena bluastro per lo spazio digitale.
- **Perché non è il «blu tech».** Il blu del logo è un blu acciaio smorzato (#3C71A5), non elettrico: segna solo ciò che è interattivo e non diventa mai sfondo né gradiente.
- **Temperatura con significato.** Superfici chiare e calde = spazio fisico e territorio; superfici scure e fredde = spazio digitale e immersione.

| Token | Hex | Ruolo | Contrasto (WCAG) |
|---|---|---|---|
| `calce` | #F3F1EC | Fondo principale (spazio fisico) | inchiostro 16,3:1 |
| `pietra` | #E4DFD5 | Superficie alternata, «terra» della hero, segnaposto su chiaro | inchiostro 13,9:1 |
| `inchiostro` | #141413 | Testo, pulsante primario su chiaro, cartografia | — |
| `inchiostro-2` | #55514A | Testo secondario, etichette mono su chiaro | 7,0 su calce · 5,9 su pietra |
| `notte` | #0F1317 | Superfici scure (spazio digitale), footer | calce 16,5:1 |
| `notte-2` | #1A2027 | Superficie rialzata su scuro: segnaposto, campi dei form | calce 14,5:1 |
| `testo-notte-2` | #A9AFB6 | Testo secondario ed etichette su scuro | 8,4 su notte · 7,4 su notte-2 |
| `blu-node` | #3C71A5 | La «o» del logo; nodi-hotspot e anello di focus su chiaro | 4,5 su calce · 3,9 su pietra (su pietra solo come grafica) |
| `blu-node-scuro` | #2D5A87 | Sottolineatura dei link, testo blu su chiaro quando serve, hover | 6,4 su calce · 5,4 su pietra |
| `blu-node-chiaro` | #8DB3DC | Nodi-hotspot, link e focus su scuro | 8,5 su notte |
| `terra` | #A65308 | Nodo-luogo e accento su chiaro | 4,8 su calce · 4,1 su pietra |
| `arancio-segnale` | #E07F1F | Nodo-luogo e accento su scuro; simboli dei numeri (+ ~ %) | 6,4 su notte · **mai su chiaro** (2,6:1) |
| `linea` / `linea-notte` | #CCC5B7 / #2B333D | Filetti decorativi | decorativi |
| `bordo-campo` / `bordo-campo-notte` | #7A7468 / #6E7680 | Bordi dei campi dei form | 4,1 su calce · 3,5 su pietra / 4,1 su notte |
| `errore` / `errore-notte` | #B42318 / #FF8A7A | Messaggi di errore | 5,8 / 8,1 |
| `successo` / `successo-notte` | #2E6B3F / #86CFA0 | Conferma di invio | 5,7 / 10,2 |
| `selezione` | #BFDDD8 | Solo `::selection` (il verde-acqua della trama del logo) | inchiostro 12,8:1 |

**Regole d'uso.**
- **Proporzioni indicative per pagina.** Calce circa 55%, notte circa 25%, pietra circa 15%, accenti al massimo 5%.
- **Pulsante primario.** Inchiostro pieno con testo calce su fondo chiaro; calce pieno con testo inchiostro su fondo scuro. **Mai pulsanti blu.**
- **Il blu non fa mai da sfondo** di sezione, non entra in gradienti e non colora i titoli.
- **Link nel testo.** Colore `inchiostro` con sottolineatura di 1 px in `blu-node-scuro`, che diventa 2 px all'hover; su scuro, `calce` con sottolineatura in `blu-node-chiaro`. Così il blu resta raro e il link non dipende solo dal colore.
- **L'arancio va solo su scuro**: su chiaro si usa `terra`. Entrambi segnano esclusivamente luoghi e simboli numerici.
- **Niente gradienti, ombre, bagliori, glassmorphism.** Le sfumature ammesse sono due, entrambe maschere di trasparenza e mai di colore:
  - la maschera che fonde il ritratto con la carta (§4.3);
  - la dissolvenza ai bordi della finestra dell'Orizzonte (G4, 2026-09-28): al massimo 2 rem per lato, solo su tacche ed etichette, mai sulla linea, che resta piena da bordo a bordo. È il bordo di un'inquadratura: dice che la striscia graduata continua oltre lo schermo. Senza, le etichette dei luoghi fuori campo vengono tagliate a metà parola («V» di Varese a 390 px).
- **Il verde-acqua della trama del logo** vive solo come colore di selezione del testo: un dettaglio per chi lo scopre.

**Rapporto con i marchi.** Colori campionati il 2026-09-28 (valori indicativi):
- ITnode: «o» #3C71A5, dal PNG del logo.
- Portali, dalle foto: arancio circa #E6882D, azzurro circa #3E94CA, blu scuro circa #132D41.

`[DA FORNIRE: codici colore ufficiali]`. I marchi Puglia Digitale e Città Digitali compaiono come marchi, dai file originali, e non diventano la palette del sito ITnode. Del loro sistema entra solo l'arancio del segnaposto a goccia, come colore dei luoghi.

---

## 3. Tipografia

### 3.1 Scelta

- **Carattere principale: Schibsted Grotesk**, versione variabile con pesi 400–900.
  - Disegnato da Bakken & Bæck per il gruppo editoriale Schibsted, licenza OFL 1.1, disponibile come `@fontsource-variable/schibsted-grotesk`.
  - Il file latino pesa 47 KB e copre tutti i pesi.
- **Secondo carattere: Fragment Mono 400**, licenza OFL, `@fontsource/fragment-mono`.
  - File latino da 25 KB.
  - Solo per etichette, gradi, coordinate e numeri di sezione: il livello «dati» del sito.

**Perché Schibsted Grotesk.** Abbiamo confrontato sei candidati sul copy vero della hero a 1440 e 390 px.
1. **Nasce per l'editoria.** È un grottesco contemporaneo pensato per news e magazine digitali: dà la «sicurezza tipografica» chiesta dal riferimento senza l'aria da startup.
2. **La «I» maiuscola ha le grazie.** È la ragione decisiva. «Il SIII», «ITnode» e «1» restano distinguibili a ogni corpo; con Instrument Sans e Host Grotesk, «Il SIII» si legge «Il Slll». Per un marchio di prodotto fatto di tre I è un requisito, non un gusto.
3. **Un solo file serve tutto.** Titoli a 600 e testo a 400; ha anche le cifre tabellari (`tnum`).
4. **Tiene i corpi estremi.** Solido a 260 px («~200.000», «SIII») e leggibile a 17–20 px; accenti italiani, apostrofo tipografico e « » verificati.
5. **Non è un default SaaS.** Inter, Geist, Manrope e Poppins sono stati esclusi a priori.

**Scartati.**
- Instrument Sans e Host Grotesk: ambiguità I/l.
- Hanken Grotesk: generico.
- Epilogue: troppo largo, da moda.
- Archivo: 90 KB con l'asse di larghezza e un'aria da news sportive.

### 3.2 Scala

La scala è fluida, con i valori misurati a 390 e 1440 px.

| Token | Uso | `font-size` | 390 px | 1440 px | Peso | Interlinea | Tracking |
|---|---|---|---|---|---|---|---|
| `display-xxl` | Numeri giganti, «SIII», numerazione dei capitoli | `clamp(4.5rem, 18vw, 17.5rem)` | 72 | 259 | 600 | 0,82 | −0,045em |
| `display-xl` | H1 delle hero | `clamp(2.75rem, 1.79rem + 6vw, 9.375rem)` (G4: minimo di 44 px sotto i 390 px, per il reflow a 320 px) | 52 | 115 | 600 | 0,92 | −0,035em |
| `display-l` | H2 di sezione, statement principali | `clamp(2.5rem, 6vw, 6.25rem)` | 40 | 86 | 600 | 0,98 | −0,03em |
| `display-m` | Seconda riga del Passaggio, statement secondari, nomi dei capitoli | `clamp(1.75rem, 4.2vw, 4.75rem)` | 28 | 60 | 400 | 1,04 | −0,022em |
| `display-s` | Titoli di voce: benefici, luoghi, tappe, step | `clamp(1.375rem, 2.2vw, 2.25rem)` | 22 | 32 | 600 | 1,1 | −0,015em |
| `lead` | Paragrafi d'apertura | `clamp(1.25rem, 1.6vw, 1.625rem)` | 20 | 23 | 400 | 1,4 | −0,005em |
| `body` | Testo corrente | `clamp(1.0625rem, 0.95rem + 0.35vw, 1.25rem)` | 17 | 20 | 400 | 1,55 | 0 |
| `small` | Didascalie, microcopy, note legali | `0.9375rem` | 15 | 15 | 400 | 1,5 | 0 |
| `label` (mono) | Etichette, gradi, coordinate, numeri di sezione | `clamp(0.75rem, 0.7rem + 0.15vw, 0.8125rem)` | 12 | 13 | 400 | 1,4 | +0,06em, maiuscolo |

**Rispetto alle linee guida (§04).** Su desktop i valori coincidono (H1 a 8vw fino a 150 px; H2 a 6vw fino a 100 px; body a 20 px, dentro 18–21). Cambiano solo i minimi, e le misure lo motivano:
- **H1: 52 px invece di 64.** A 64 px «La tecnologia» occupa 381 px e non entra nei 350 px utili di uno schermo da 390; andrebbe a capo lasciando «La» da solo.
- **H2: 40 px invece di 44.** Mantiene un rapporto di 1,3 con l'H1 anche su mobile.

**Regole.**
- **Pesi.** Due soli: 600 per i titoli e il grassetto nel testo, 400 per tutto il resto. Niente corsivi. Maiuscolo solo nelle etichette mono.
  - `display-m` è a 400 quando fa da voce d'arrivo del Passaggio, descrittore, nome di capitolo o statement secondario. È ammesso a 600 quando è il titolo (H2 o H3) di una sezione o di una voce: il titolo del video, i nomi delle città, «Perché aderire a Puglia Digitale» (G4, suggerimento S4 della review UI).
- **Scala tra sezioni.** Due titoli consecutivi non usano mai lo stesso gradino di scala (vedi la colonna «Titolo» in §7).
- **Misura.** Il body sta al massimo a 66 caratteri, il lead a 42. I titoli si governano con colonne e a capo d'autore.
- **A capo.** `text-wrap: balance` sui titoli, `text-wrap: pretty` sui paragrafi; nessuna sillabazione automatica nei titoli; `lang="it"` sul documento.
- **Frecce delle CTA.** Sono SVG inline con tratto 1,5 px e terminazioni squadrate, mai glifi: → e ↗ **mancano** nei sottoinsiemi latini di entrambi i font (verificato).
- **Coordinate.** Sempre in gradi decimali: ′ e ″ mancano in quasi tutti i sottoinsiemi latini.
- **Numeri approssimati.** «~200.000» ha un testo accessibile «circa 200.000», perché i lettori di schermo pronuncerebbero «tilde».
- **Caricamento.** Schibsted va in preload con `font-display: swap` e un font di ripiego con metriche corrette (`size-adjust`) per non generare CLS. Fragment Mono non va in preload. Confermato al G4 dopo il confronto di Fase 5: il preload resta (ADR 005, con le condizioni per riaprire la decisione).

---

## 4. Immagini

### 4.1 Tre regole

1. **Una foto reale è un documento.** Si taglia, non si ritocca, e la didascalia dice solo fatti verificati.
2. **Una foto non documentale non finge di esserlo.** I ritratti del fondatore con fondali generati si usano solo se l'utente lo decide (DR3, §4.3). In quel caso si trasformano: monocromia a inchiostro, taglio stretto, nota di trasparenza e nessuna didascalia che li leghi a un evento.
3. **Dove manca un'immagine, lo spazio resta progettato.** In lavorazione mostra un segnaposto dichiarato, in pubblicazione una variante tipografica (§4.5). Mai stock, mai immagini generate da noi.

### 4.2 Foto dell'evento Puglia Digitale (`evento-puglia-digitale.jpg`, 1365 × 768)

È l'unica fotografia documentale disponibile e contiene tutto il concept in un'immagine:
- il palco con il fondatore e il marchio Puglia Digitale;
- due maxischermi con tour virtuali a 360° (una vista aerea di città con le attività come punti; una piazza storica);
- una platea numerosa e reale.

**Ritagli**, con coordinate in pixel sull'originale. Tutti escludono la cornice bianca, il marchio in sovrimpressione in alto a sinistra, la scritta «Digital Innovation for the Territory» e il simbolo ✦.

| Ritaglio | Area (x, y, larghezza × altezza) | Formato | Uso |
|---|---|---|---|
| **Panorama** | 46, 124, 1272 × 560 | 2,27:1 | Home §3 «Documento» (desktop e tablet) |
| **Città** | 46, 124, 448 × 560 | 4:5 | Home §3 su mobile: lo schermo con la città vista dall'alto a 360° e la platea |
| **Palco** | 470, 124, 448 × 560 | 4:5 | Home §6, chiusura della timeline del fondatore (opzione DR3-a, §4.3) |
| **Schermo** | 880, 124, 438 × 548 | 4:5 | Puglia Digitale §2: la piazza a 360° sul maxischermo e chi la guarda |

In Home la foto compare al massimo due volte, in ritagli con soggetti diversi.

- **Colore.** Intatto: nessun filtro, viraggio o duotono. Solo esportazione ottimizzata in AVIF e WebP.
- **Limite di risoluzione.** Il ritaglio pulito misura 1272 px: la foto non va mai a tutto schermo e resta al massimo a 1200 px CSS. Sugli schermi ad alta densità si ammorbidisce, quindi l'originale è la prima richiesta (§4.6).
- **Nodi sul Panorama.** Sono pulsanti numerati, con una legenda sotto la foto sempre visibile su mobile. La legenda descrive solo ciò che si vede, senza fatti da verificare. Posizioni in percentuale del ritaglio:
  1. Schermo sinistro (13%, 18%): «Una città vista dall'alto a 360°: le attività sono punti da aprire».
  2. Palco (44%, 30%): «Il palco». Il nome di chi parla si aggiunge solo dopo la conferma (registro F7).
  3. Schermo destro (84%, 17%): «Una piazza storica esplorabile a 360°».
- **Didascalia.** Nessuna finché data e luogo non sono confermati (brief consolidato, registro A4). Poi, in mono: «Puglia Digitale, evento regionale · [luogo] · [data] · foto [autore]». Nessun numero di partecipanti se non documentato.
- **Persone in platea (A4).** I ritagli scelti mostrano la platea di spalle, ma la liberatoria o l'informativa dell'evento va comunque verificata. Senza, si stringono i ritagli sui due schermi e sul palco, escludendo i profili ai margini.
- **Nota di veridicità.** La sovrimpressione con il simbolo ✦ in basso a destra somiglia al segno che lasciano alcuni strumenti di editing generativo; la scritta «Digital Innovation for the Territory» non si usa (A6). Va chiesto il file originale senza sovrimpressioni e la conferma che la scena non è stata alterata.

### 4.3 Ritratti del fondatore (decisione DR3, in attesa dell'utente)

Le quattro foto hanno fondali con skyline di grattacieli e reti luminose: è l'estetica vietata dalle linee guida (§33), estranea al territorio (in Puglia non ci sono grattacieli) e con segni di generazione o ritocco con AI (brief consolidato, I7). Il brief consolidato registra la scelta come **DR3**: decide l'utente, sentito il creative-director.

**Stato al G4 (2026-09-28).**
- Il sito costruito applica (b), scelta della sessione principale in attesa della conferma dell'utente (ADR 002).
- Nel frattempo la review di veridicità ha messo la stessa nota AI anche sotto la foto dell'evento (B4): il vantaggio di (a), «un documento invece di un ritratto», vale solo quando arriva l'originale dello scatto.
- **Parere aggiornato: (b) per il lancio, con le maschere più strette qui sotto; (c) appena possibile.** Il ritratto reale resta il miglioramento più forte dell'intero sito: toglie le note AI, lo skyline e l'aria da ritratto aziendale.

**Parere iniziale del creative-director (Fase 2, superato dall'aggiornamento qui sopra): opzione (a) subito, (c) appena possibile.**
- **(a)** La sezione del fondatore si chiude sulla foto reale: il ritaglio «Palco», con il fondatore sul palco davanti a una sala piena. Che sia lui lo dice la descrizione degli asset `[DA VERIFICARE: D6]`. È un documento, non un ritratto, ed è più forte di un ritratto da studio. In Contatti la sezione «Persona» diventa tipografica (§7.7).
- **(c)** Uno shooting reale (§4.6, priorità 4) sostituisce o affianca il «Palco».
- **Perché non (b).** Un'immagine realistica di una persona reale in una scena generata:
  - rientra negli obblighi di trasparenza dell'AI Act (art. 50, dal 2 agosto 2026, fonte citata nel brief consolidato);
  - contraddice la promessa del sito, rendere esplorabili spazi veri;
  - porta dentro l'estetica vietata.

**Se l'utente sceglie (b)**, le specifiche sono pronte e testate:

| File | Decisione con (b) | Taglio (x, y, l × a) | Uso |
|---|---|---|---|
| `fondatore-braccia-conserte.jpg` | Usata | testa e spalle: 566, 36, 480 × 480 (1:1) | Home, chiusura della timeline, al massimo 400 px CSS |
| `fondatore-in-piedi.jpg` | Usata | 470, 40, 420 × 560 (3:4) | Contatti, al massimo 320 px CSS |
| `fondatore-palco-citta-digitali.jpg` | Scartata anche con (b) | — | Palco, platea e schermo con marchio la farebbero leggere come documentazione di un evento che non possiamo verificare; porta il simbolo ✦ |
| `fondatore-presentazione-platea.webp` | Scartata anche con (b) | — | Stessa ragione |

Con (b), sotto ogni ritratto va una nota mono: «Immagine generata o elaborata con strumenti di intelligenza artificiale» finché il cliente non chiarisce la provenienza (review di veridicità, I5), con testo definitivo e verifica legale a cura di brand-strategist e consulente.

**Trattamento «inchiostro»** (testato), solo con (b):
1. Luminanza pesata sul canale blu (0,15 R + 0,25 G + 0,6 B), con contrasto ×1,2 e −30: lo skyline azzurro si schiarisce quasi fino alla carta.
2. Mappatura dei toni da `inchiostro` #141413 a `calce` #F3F1EC.
3. Maschera CSS che fonde il lato destro nella carta, per assorbire ciò che resta dello skyline. Valori del G4, provati a 2× sui derivati (verifica UI, V6):
   - Home, `fondatore-braccia-conserte`: `linear-gradient(to right, #000 40%, transparent 74%)`;
   - Contatti, `fondatore-in-piedi` (figura più stretta): `linear-gradient(to right, #000 36%, transparent 68%)`.

   Con questi valori grattacieli e linee a nodi quasi spariscono e la figura resta intera, con il bordo del braccio appena ammorbidito. Il valore iniziale (62% → 100%) e il successivo (48% → 86%) lasciavano leggibili skyline e «reti luminose».

I derivati si generano con uno script sharp versionato nel repository; gli originali restano intatti. La sfumatura verso la carta presuppone che il ritratto stia su fondo `calce` (vedi §7).

- **Mai:** versioni a colori, scontorni, ritocchi o estensioni generative, didascalie con luoghi e date, inquadrature «dal vivo sul palco».
- **Alt:** «Ritratto di Giacomo Lenoci, fondatore di ITnode». `[DA VERIFICARE: nome]`

### 4.4 Logo

- **Stato del file.** `logo-itnode.png` misura 192 × 114 px ed è **completamente opaco**: ha un fondo bianco, non è trasparente. Su `calce` e `notte` è inutilizzabile, quindi serve un ridisegno vettoriale.
- **Anatomia, da rispettare nel ridisegno.** Wordmark «it» + «N» + «o» + «de» in un sans geometrico nero e bold. La «o» è un anello #3C71A5 con il vuoto interno spostato in alto a destra, quindi più spesso a sinistra e in basso. Dietro c'è una trama poligonale verde-acqua (circa #BFDDD8).
- **Versione web proposta** (decide il cliente):
  - solo il wordmark, senza trama;
  - «it», «N» e «de» in `inchiostro` su chiaro e in `calce` su scuro; la «o» sempre #3C71A5, che su `notte` regge 3,6:1 come elemento grafico;
  - altezza di 28 px su desktop e 24 px su mobile;
  - area di rispetto pari all'altezza della «o».
  - La trama resta per i formati grandi, se il cliente la vuole.
- **Favicon.** L'anello della «o» su fondo calce.

### 4.5 Segnaposto degli asset mancanti

**In lavorazione** (staging e review col cliente), il segnaposto dichiara che cosa serve:
- stesso formato dell'asset finale, così che la sostituzione non causi CLS;
- superficie `pietra` su chiaro o `notte-2` su scuro, filetto di 1 px (`linea`);
- quattro segni di taglio a «L» di 12 px agli angoli, a 8 px dal bordo;
- in alto a sinistra, un'etichetta mono: «ASSET RICHIESTO · FOTO», «· SCREENSHOT» o «· POSTER VIDEO»;
- in basso a sinistra, la descrizione in `small`, per esempio: «Monopoli: il porto vecchio dal molo, luce naturale, orizzonte visibile. Porta 3:5, lato lungo di almeno 2400 px.»;
- in basso a destra, il formato («3:5») e, se è un luogo, le coordinate.

**In pubblicazione**, se l'asset non è arrivato, un flag nel contenuto (per esempio `asset: pending`) mostra una **variante tipografica** completa, senza richieste visibili:
- **luogo:** nome in `display-m`, coordinate e nodo su un filo d'orizzonte;
- **esperienza SIII:** nome, luogo, e orizzonte con i nodi (lo «spazio esplorabile» astratto);
- **poster del video:** superficie `notte`, titolo e pulsante di riproduzione.

Precisazioni del G4, sul sito costruito (flag `PUBLIC_SLOT_MODE=publish`):
- **Esperienze SIII: niente nome né luogo dentro il pannello**, né in Home né su `/siii/`: su `/siii/` li dicono l'H3 e la riga del luogo subito accanto. Un pannello scuro con un titolo e dei punti rischia di leggersi come una finta schermata. Nei pannelli larghi almeno 700 px, sotto le tacche lunghe vanno i gradi ogni 45° (V9 della verifica UI), come nel Confronto: senza, l'orizzonte si legge come un righello.
- **Luoghi:** dentro la porta restano nome, nodo e rilevamento con la distanza (o «SEDE»). Le coordinate stanno già sotto l'H3 accanto e non si ripetono.
- **Poster del video:** vale solo finché il file non è ospitato sul sito. Con il video pubblicato il poster è un fotogramma reale, scelto dal creative-director.

**Mai:** riquadri grigi con icona «immagine», icone di immagine rotta, lorem ipsum, stock, immagini generate.

### 4.6 Asset da chiedere, in ordine di priorità

L'elenco coincide con i materiali mancanti del brief consolidato (§7). Qui si aggiungono formati, risoluzioni e direzione fotografica.

1. **Foto evento:** originale ad alta risoluzione senza cornice e scritte, con luogo, data e autore.
2. **Screenshot delle tre esperienze SIII** (Masseria Santella, Maison Miminà, D.L. Natura Dentro): desktop 16:10 da almeno 2560 px e mobile. In alternativa, un accesso per catturarli: i portali sono bloccati dal nostro ambiente.
3. **Video Città Digitali:** il file, o il permesso di ospitarlo, un poster, la durata e l'indicazione se c'è parlato (in quel caso servono i sottotitoli).
4. **Un ritratto reale del fondatore**, in un luogo vero (ufficio o Acquaviva), con luce naturale e senza schermi alle spalle.
5. **Foto dei luoghi.**
   - Acquaviva delle Fonti, Gravina in Puglia, Monopoli: Porta 3:5, lato lungo di almeno 2400 px.
   - Varese, Altamura, Caltanissetta: Porta 3:5 o Schermo 16:10.
6. **Marchi vettoriali** di ITnode, Puglia Digitale e Città Digitali, con i codici colore.
7. **L'elenco delle 30+ città** di Puglia Digitale, per la carta ed eventualmente un marquee.

**Direzione fotografica per le foto da produrre.** Il riferimento è «Viaggio in Italia» (1984, Luigi Ghirri e altri): luoghi ordinari guardati con attenzione, inquadrature frontali, orizzonte in vista, luce naturale, colori veri. Le persone sono ritratte al lavoro nei loro spazi.
- **No:** droni saturi, HDR, tramonti da cartolina, visori VR, mani su tablet con ologrammi, folklore.

---

## 5. Hero della Home: «L'orizzonte dei luoghi»

**Idea.** Guardarsi intorno da Acquaviva delle Fonti:
- un orizzonte a 360° porta i luoghi veri in cui lavora ITnode, nella loro direzione e alla loro distanza reali;
- Monopoli e il mare a est (081°), l'entroterra murgiano a ovest (253–265°), Caltanissetta (213°) e Varese (313°) più lontano;
- scorrendo, lo sguardo ruota;
- il titolo sta in piedi su questa linea: è il gesto di un tour a 360°, fatto con tipografia e dati invece che con foto.

### Desktop (≥ 1024 px)

**Campi e titolo**
- **Altezza.** `min(100svh, 960px)`, con un minimo di 640 px. Il bordo alto della sezione successiva deve affacciarsi.
- **Due campi.**
  - «Cielo» `calce` in alto, circa il 58% dell'altezza.
  - «Terra» `pietra` in basso, che prosegue senza stacco nella sezione successiva.
  - Il confine tra i due campi è l'orizzonte.
- **Testi.** Vengono dal copy deck della Home (`docs/contenuti/copy-deck/home.md`). Nessuna CTA nella hero: «Parliamone» è nell'header.
- **Occhiello** (mono, `inchiostro-2`, colonne 1–7): «ITnode — oltre i confini del Web tradizionale» (alternativa già nel copy deck della Home). Decisione del G4: l'occhiello porta il nome e il concetto delle linee guida (§02); che cosa fa ITnode lo dice la riga di posizionamento in `lead`, non l'occhiello (I4).
- **H1, primo registro.**
  - «La tecnologia cambia.» in `display-xl`: a 1440 px misura 115 px di corpo e occupa circa 1117 px, l'83% della misura, lasciando margine contro gli a capo imprevisti.
  - La linea di base sta sopra l'orizzonte di una distanza pari alla profondità dei discendenti: la «g» di «tecnologia» tocca l'orizzonte senza attraversarlo.
- **H1, secondo registro** (nello stesso `<h1>`).
  - «La curiosità ci accompagna / da sempre.» in `display-m` a peso 400, dalla colonna 5, 48–72 px sotto l'orizzonte.
  - Due righe, con a capo d'autore.
- **Riga di posizionamento** (`lead`, colonne 5–11, 24–32 px sotto il secondo registro): «Esperienze digitali immersive per imprese e territori.» È la riga che fa superare il test dei 5 secondi: l'H1 da solo non dice che cosa fa ITnode.
  - È un `<p>` dopo l'`<h1>`, non dentro. La didascalia dell'osservatore (colonne 1–4) si allinea in basso con la riga.
  - Provato in pagina al G4: a 1440 × 900 l'orizzonte scende al 57% dell'altezza (era il 62%) e la riga sta nella prima schermata; a 1024 × 768 la hero intera sta nella prima schermata.

**Orizzonte e luoghi**
- **Orizzonte.**
  - A tutta larghezza, oltre i margini.
  - Campo visivo di 200° sulla larghezza della finestra, centrato su 170°: si vedono Monopoli, Caltanissetta e il gruppo Altamura–Gravina–Cassano.
- **Nodi-luogo** (`terra`) sulla linea.
  - Le etichette mono stanno **sotto** le tacche, con una linea di richiamo, su un massimo di 3 file per evitare sovrapposizioni.
  - I luoghi a meno di 12° l'uno dall'altro si raggruppano in un'unica etichetta: «ALTAMURA · GRAVINA · CASSANO — 253–265°».
  - Sopra la linea non va nessuna etichetta: lo spazio è del titolo.
- **Didascalia dell'osservatore e invito allo scorrimento** (mono, colonne 1–4, allineati al secondo registro):
  - «Vista da Acquaviva delle Fonti — 40.8957° N · 16.8412° E»;
  - sotto, «Scorri per esplorare» (dal copy deck, `aria-hidden`). Qui l'invito descrive quello che succede davvero: scorrendo, l'orizzonte ruota.

### Tablet (700–1023 px)

- Stessa struttura.
- Campo visivo di 200°, come su desktop (G4). Con 150° erano in vista solo Caltanissetta e due etichette tagliate dal bordo, tra cui «— 081° · 39 KM» senza il nome di Monopoli. Con 200°, da 768 a 1023 px, a riposo le tre etichette sono intere, e nessun richiamo attraversa un'etichetta né a riposo né durante la rotazione. Tra 700 e 767 px il richiamo del gruppo murgiano tocca il frammento di «Varese» che entra dal bordo destro, dentro la dissolvenza (§2): residuo accettato. Vale solo per l'orizzonte della hero della Home. Quello di Città Digitali resta a 150° su tablet: le sue tre città stanno già in vista, e con 200° le etichette di Caltanissetta e Varese si sovrappongono da 700 a 900 px (misurato).
- Secondo registro dalla colonna 3 di 8.

### Mobile (< 700 px)

- **Altezza.** Sul contenuto più 96 px, non forzata a 100svh; l'orizzonte cade a circa il 55% della prima schermata.
- **H1.** «La tecnologia / cambia.» su due righe (52 px; «La tecnologia» occupa 310 px su 350). Il secondo registro è a 28 px su tre righe, senza rientro: lo separa l'orizzonte.
- **Orizzonte.**
  - Campo visivo di 100°, centrato su 250° (il gruppo murgiano, con Caltanissetta al margine).
  - Al massimo 2 etichette visibili alla volta, in formato compatto (nome e rilevamento, senza distanza) e su due file alternate. Nello schizzo a 390 px le etichette complete si sovrapponevano.
  - Scorrendo entra Varese.
- **Sotto l'orizzonte**, in ordine: secondo registro, riga di posizionamento (20 px), didascalia dell'osservatore e invito allo scorrimento. Il totale misurato sta in una schermata da 390 × 844.
- **Header.** Segue la sitemap UX (§4): logo, «Parliamone» compatto e «Menu».

### Movimento

- **Al caricamento.**
  - Nessuna animazione sull'H1, che è l'elemento LCP.
  - Tacche ed etichette compaiono in dissolvenza (500 ms, dopo il primo rendering).
  - Ogni nodo fa un solo «ping» (l'anello si espande e svanisce, 1000 ms, a cascata di 120 ms).
- **Allo scroll.**
  - La riga graduata trasla orizzontalmente: +60° di rotazione mentre la hero esce dalla viewport, in modo lineare e legato allo scroll.
  - Si ferma quando l'utente si ferma.
- **Implementazione.**
  - CSS scroll-driven animations (`animation-timeline: view()`) dentro `@supports`.
  - Dove non sono supportate, orizzonte statico e nessun polyfill.
  - Un eventuale fallback in JavaScript vanilla (listener passivo più `requestAnimationFrame`, al massimo 1 KB) lo decide `web-performance-specialist`.
- **`prefers-reduced-motion`.** Orizzonte statico sull'inquadratura iniziale, niente ping né dissolvenze.

### Accessibilità e performance

- L'orizzonte è `aria-hidden`: i luoghi hanno link veri più avanti. Kicker e didascalia sono testo reale.
- Nessuna immagine nella hero: LCP = testo dell'H1. L'SVG inline pesa al massimo 6 KB ed è generato al build; nessun JavaScript per il layout.

### Perché non una foto nella hero

- **Risoluzione e formato.** L'unica foto reale utile esce a 1272 px: si ammorbidirebbe a tutto schermo e peserebbe sull'LCP.
- **Tema.** È la documentazione di un evento, mentre l'H1 parla di curiosità.
- **Dove va la foto.** Arriva subito dopo, come «Documento» (Home §3), dove ha il posto e la misura giusti.

### Evoluzione

Quando arriverà un panorama equirettangolare reale (per esempio una piazza di Acquaviva), il campo «terra» diventerà una finestra su quel panorama, allineata agli stessi gradi dell'orizzonte.

---

## 6. Motion

**Principio.** Il movimento è uno sguardo che si sposta: rotazioni, aperture, ingressi. Accompagna la lettura, non la interrompe. Ogni movimento deve dire «esplorazione, spazio, immersione»; se non lo dice, non c'è.

**Token.**
- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (ingressi)
- `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` (aperture, menu)
- Durate: 150, 250, 500, 700, 1000 e 1400 ms.

| Movimento | Dove | Come | Durata | Easing |
|---|---|---|---|---|
| **Reveal** | Blocchi di testo, immagini, voci di elenco | `opacity` 0→1 e `translateY` 24 px→0; una volta sola; cascata di 80 ms, al massimo 4 elementi | 700 ms | ease-out |
| **Text reveal** | Statement a registri (Il Passaggio) | Ogni riga d'autore sale da una maschera (`translateY` 105%→0); cascata di 90 ms | 700 ms | ease-out |
| **Apertura** (movimento firma) | Immagini, video, showcase | `clip-path: inset(46% 0 46% 0)` → `inset(0)`, con l'immagine che scala 1,06→1: si apre dall'orizzonte | 1000 ms | ease-in-out |
| **Parallax controllato** | Al massimo 1 immagine per schermata | `translateY` dell'immagine dentro la sua soglia, ±6% (massimo 48 px), legato allo scroll | scroll | lineare |
| **Rotazione dell'orizzonte** | Hero Home | Vedi §5 | scroll | lineare |
| **Marquee tipografico** | Al massimo 1 per pagina | `translateX` legato allo scroll (circa 0,4× la velocità di scroll); mai moto autonomo | scroll | lineare |
| **Disegno di linea** | Carte, costa pugliese, orizzonte del tempo | `stroke-dashoffset` 100%→0, una volta | 1400 ms | ease-in-out |
| **Ping del nodo** | Nodi, all'ingresso della sezione | Anello che scala 1→1,8 con `opacity` 1→0, una volta | 1000 ms | ease-out |
| **Hover e focus del nodo** | Nodi | Anello ×1,4, comparsa dell'etichetta | 250 ms | ease-out |
| **Hover dei link** | Link testuali | Sottolineatura da 1 a 2 px e cambio di colore | 150 ms | ease-out |
| **Hover delle CTA** | Pulsanti e CTA con freccia | Freccia che trasla di 4 px verso destra; cambio di fondo | 250 ms | ease-out |
| **Hover della soglia** | Showcase, porte dei luoghi | Immagine che scala 1→1,03; solo con `(hover: hover) and (pointer: fine)` | 700 ms | ease-out |
| **Menu mobile** | Apertura e chiusura | Dissolvenza con lieve traslazione del pannello; voci a cascata di 40 ms, al massimo 300 ms in tutto; il pannello si usa subito. Dialog modale, focus ed Esc come da sitemap UX (§4) | 250 / 150 ms | ease-out |
| **Header sticky** | Dopo il primo scroll | Compaiono il fondo pieno (`calce`, o `notte` sulle pagine con hero scura) e il filetto; l'altezza non cambia (niente CLS). Durata entro i 200 ms della sitemap UX (§3.3) | 150 ms | ease-out |
| **Transizione tra pagine** | Tutte | View transition cross-document solo CSS (`@view-transition { navigation: auto; }`): dissolvenza, header persistente; dove non è supportata, navigazione normale | 250 ms | ease-out |
| **Video** | Città Digitali | Apertura più autoplay muto solo quando è nella viewport; pausa quando esce | — | — |

**Marquee e WCAG 2.2.2.** Il marquee è legato allo scroll: non parte da solo e si ferma quando lo scroll si ferma. Per questo non ricade nel criterio 2.2.2 (Pausa, stop, nascondi) e il controllo di pausa previsto nel copy deck della Home non serve. Se in futuro si scegliesse un moto autonomo, il controllo tornerebbe obbligatorio. La conferma spetta a `ux-designer`, owner dell'accessibilità.

**Regole tecniche.**
- Si animano solo `transform`, `opacity` e `clip-path`.
- `will-change` solo durante l'animazione.
- Un unico IntersectionObserver condiviso.
- Il legato allo scroll passa da CSS scroll-driven animations dentro `@supports`, con un fallback statico.
- **Senza JavaScript tutto il contenuto è visibile.** Lo stato nascosto iniziale si applica solo quando lo script conferma il supporto.

**Da evitare.**
- Scroll-jacking, librerie di smooth scroll, cursori personalizzati, preloader.
- Easing a rimbalzo o elastici, rotazioni e flip 3D, sfocature animate (`filter`).
- Animazioni lettera per lettera; parallax sul testo.
- Loop autonomi (ammessi solo il video e i controlli dell'utente).
- Animazioni su `width`, `height`, `top`, `left` o `font-variation-settings`.
- Qualunque ritardo prima che il contenuto sia leggibile.

**`prefers-reduced-motion: reduce`.**
- Niente reveal: il contenuto è subito visibile.
- Aperture già aperte.
- Parallax, rotazione e marquee fermi; il marquee diventa una riga statica.
- Linee già disegnate.
- Niente autoplay del video, che mostra poster e pulsante di riproduzione.
- View transition disattivate.
- Restano i cambi di colore all'hover e al focus.

---

## 7. Mappa del ritmo

### 7.1 Vocabolario delle composizioni

Tra parentesi, il componente delle linee guida (§30) di cui ogni composizione è una variante.

- **Statement** (LargeStatement): una frase in `display-l` o `display-xl` e molta aria.
- **Passaggio** (LargeStatement, variante a registri): due righe sfalsate.
- **Documento** (ImmersivePreview, variante foto): foto reale in soglia, con nodi numerati e legenda.
- **Capitolo** (ProjectShowcase): numero gigante, nome, statement, visual, microdescrizione e CTA, in tre impaginati diversi.
- **Numeri** (Stats): numeri in `display-xxl` a scalinata, con etichette mono e fonte.
- **Carta** (LocationShowcase, variante geografica): cartografia a filo con i nodi-luogo.
- **Porte** (LocationShowcase): aperture verticali 3:5 disposte secondo la geografia reale.
- **Elenco** (BenefitsSection), in tre varianti: *zig-zag* (numeri giganti alternati), *scala* (ogni voce rientra di una colonna), *sticky* (titolo fermo, voci che scorrono).
- **Confronto** (ImmersivePreview, variante a due stati): la stessa immagine senza e con nodi.
- **Marquee**: fascia tipografica legata allo scroll.
- **Video** (VideoSection): quasi a tutto schermo, che si apre dall'orizzonte.
- **Timeline** (FounderTimeline): orizzonte del tempo.
- **Chiusura** (CTASection e ContactForm): Passaggio, CTA e form.

### 7.2 Regole del ritmo

- Due sezioni consecutive non hanno mai la stessa composizione né lo stesso gradino di scala del titolo.
- La superficie cambia almeno ogni due sezioni. Le sequenze sulla stessa superficie sono volute e dichiarate: la «terra» della Home, la «notte» cinematografica di Città Digitali.
- Ogni pagina contiene almeno:
  - un momento di statement;
  - un momento di dati o di prova reale;
  - un momento di esplorazione (nodi, apertura, esperienza da aprire);
  - una chiusura con CTA.
- Per pagina, al massimo: una sezione sticky, un marquee, un video.
- Ogni pagina ha una **temperatura dominante**, così nessuna pagina è uguale alle altre:

  | Pagina | Temperatura dominante |
  |---|---|
  | Home | equilibrio tra chiaro e scuro |
  | SIII | notte: tecnologia, immersione |
  | Puglia Digitale | calce e terra: territorio, emozione |
  | Città Digitali | notte cinematografica: video, carta notturna |
  | Contatti | calce: funzionale |

### 7.3 Home

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | «L'orizzonte dei luoghi» (§5): H1 in due registri sull'orizzonte graduato con i luoghi reali | calce / pietra | `display-xl` | vedi §5 |
| 2 | Manifesto | Statement su 10 colonne: «ITnode nasce dall'idea di creare un nuovo modo di abitare il Web.»; sotto, sfalsato (colonne 7–11), il `lead` di sintesi su Città Digitali e Puglia Digitale | pietra (la terra continua) | `display-l` | statement e poi lead, senza sfalsamento |
| 3 | Documento | Foto evento «Panorama» su 12 colonne (al massimo 1200 px), apertura, 3 nodi numerati, legenda; didascalia solo con data e luogo confermati (A4) | pietra | — (legenda) | ritaglio «Città» 4:5; legenda sotto |
| 4 | Infrastruttura | Passaggio «Una nuova infrastruttura digitale / per connettere imprese, cittadini e visitatori.»; in basso, marquee legato allo scroll: «spazio fisico → spazio digitale → persone → imprese → territorio →» (frecce SVG) | **notte** (primo ingresso nel digitale) | `display-l`, marquee in `display-m` | statement su 4 righe; marquee più lento |
| 5 | I tre mondi | Tre Capitoli, ognuno aperto da un tratto d'orizzonte con il suo rilevamento. **01 SIII** (000°, notte): «01» in `display-xxl` sulle colonne 1–4, statement «Spazi reali. / Esperienze digitali.» sulle colonne 5–12, soglia Schermo 16:10 (segnaposto SIII) con 3 nodi sulle colonne 5–12, micro e CTA in basso a sinistra. **02 Puglia Digitale** (120°, calce): carta della Puglia a filo (costa, con i nodi `terra` di Acquaviva, Gravina e Monopoli) sulle colonne 1–5, numero in alto a destra, testo sulle colonne 7–12; quando arriverà una foto del territorio, prenderà il posto della carta. **03 Città Digitali** (240°, pietra): carta d'Italia a filo con 3 nodi sulle colonne 8–12, testo sulle colonne 1–6. Le carte di 02 e 03 sono un unico gesto: dalla regione all'Italia, con impaginati speculari | notte → calce → pietra | numeri `display-xxl`, nomi `display-m`, statement `display-l` → `display-m` 400 (§1.5) | ogni capitolo in quest'ordine: numero, nome, statement, visual, micro, CTA |
| 6 | Fondatore | Passaggio «36 anni dentro l'innovazione. / E ancora la stessa curiosità.» e poi l'orizzonte del tempo **orizzontale e sticky**. Le tappe sono tacche (IBM · anni '90 · prima azienda · 2002 MyComm · IcommLab · Leadstone · oggi: ITnode, Puglia Digitale, Città Digitali). «10.000+ clienti» è un momento numerico in `display-l`, agganciato alla tappa Leadstone con la sua attribuzione (registro N5: clienti delle aziende fondate prima di ITnode) e separato da «oggi» da almeno una tappa di spazio: mai vicino al logo o ai nomi dei prodotti ITnode. Solo «oggi» è un nodo, perché è esplorabile: le sue tre voci sono link alle pagine. Si chiude sulla foto reale «Palco» (DR3-a; ritratto a inchiostro solo con DR3-b) e sulla frase finale in `display-m` | calce | `display-l` | linea verticale a sinistra, tappe in pila, niente sticky |
| 7 | Chiusura | Passaggio, CTA «Parliamone» e contatti rapidi in mono (email, telefono) | notte | `display-xl` | CTA a tutta larghezza |
| — | Footer | Vedi §7.8 | notte | — | colonne in pila |

**Timeline.** È ordinale, non in scala: le date di IcommLab, Leadstone e ITnode sono `[DA FORNIRE]` e una scala in anni le inventerebbe. L'ordine delle tappe segue il brief consolidato (§6), che può ancora cambiare. Con `prefers-reduced-motion` diventa una griglia statica a 4 colonne.

**«10.000+» al lancio (G4, review di veridicità I2).** Si pubblica solo se il cliente conferma il perimetro (quali aziende, quale periodo, clienti o utenti); l'etichetta diventa quella confermata. Senza conferma il numero si toglie e la tappa resta con titolo e data: la timeline regge anche senza un momento numerico, e la colonna vuota prima di «oggi» resta come tempo che passa.

**Rapporto con il copy deck.** Il copy deck raggruppa le sezioni 2–4 in un'unica «Chi siamo» (ancora `#chi-siamo`). I testi sono gli stessi, distribuiti su tre composizioni: l'ancora va sulla sezione 2 e il marquee chiude la sezione 4.

### 7.4 SIII (`/siii`)

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | H1 = «SIII» in `display-xxl` più «Siti Interattivi Immersivi» in `display-m`; Passaggio «Non raccontare la tua azienda. / Falla esplorare.»; a destra una soglia Porta 3:5 con anteprima SIII (segnaposto) e 3 nodi | notte | `display-xxl` | la porta passa sotto il testo, in 4:5 |
| 2 | Definizione | `lead` grande su 7 colonne e `body` sfalsato: il SIII replica gli spazi dell'impresa, navigabili da desktop e smartphone | calce | `display-s` | una colonna |
| 3 | Confronto | Una sola immagine Schermo 16:10 con interruttore accessibile a due stati. «Tour 360° — guardi»: solo orizzonte. «SIII — agisci»: compaiono i nodi (prodotto, video, informazioni, prenotazione). Sotto, 3 righe di differenze in tabella tipografica | pietra | `display-l` | interruttore a tutta larghezza; tabella in pila |
| 4 | Cosa puoi fare | Marquee di verbi in `display-xl` presi dalle 7 azioni delle linee guida (§10), per esempio «Esplora · Interagisci · Guarda · Chiedi · Prenota»; il testo definitivo è del copywriter e nessun verbo può promettere più di quanto il SIII fa. Sotto, l'elenco accessibile delle 7 azioni su due colonne | notte | marquee | elenco in una colonna |
| 5 | Benefici | Elenco *zig-zag*: 4 benefici, numeri `display-xxl` alternati a sinistra e a destra, una idea per schermata; solo formulazioni qualitative (linee guida §11) | calce | `display-s` per voce | numero sopra il testo |
| 6 | Showcase | Passaggio a cascata «Entra. / Esplora. / Interagisci.», poi tre soglie Schermo 16:10 di larghezze diverse (12 colonne; 8 a destra; 8 a sinistra), nome in `display-l`, luogo e coordinate in mono, CTA «Entra nell'esperienza →» (nuova scheda, dichiarata). Nomi e immagini delle imprese solo con il loro consenso (A7) | notte | `display-l` | soglie a tutta larghezza in pila |
| 7 | Chiusura | Passaggio «La tua azienda può diventare un'esperienza.» sulle colonne 1–5, CTA «Richiedi un'offerta →», form sulle colonne 7–12 | calce | `display-l` | statement, poi form |

### 7.5 Puglia Digitale (`/puglia-digitale`)

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | H1 «Puglia Digitale» con sottotitolo e CTA «Visita il portale →»; la costa pugliese è un'unica linea che attraversa la pagina e si disegna all'ingresso, con i nodi `terra` di Acquaviva, Gravina e Monopoli e le etichette mono «MARE ADRIATICO» e «MURGIA» | calce | `display-xl` | carta ritagliata sulla Terra di Bari, sotto il titolo |
| 2 | Concetto e documento | Passaggio «Dalla costa all'entroterra. / Un territorio da esplorare.»; ritaglio «Schermo» 4:5 in soglia sulle colonne 1–5 (persone che esplorano una piazza pugliese sul maxischermo), testo sul Destination Marketing sulle colonne 7–11; didascalia solo con data e luogo (A4) | pietra | `display-l` | foto a tutta larghezza, poi testo |
| 3 | Numeri | Scalinata: «30+», «~200.000», «60%» in `display-xxl`, ognuno sfalsato di 2 colonne verso destra e verso il basso; simboli + ~ % in `arancio-segnale`; etichette mono. Sotto i numeri, la nota mono «Dati ITnode, aggiornati a [mese anno]» (registro N1–N3). L'etichetta di «~200.000» chiarisce che è il bacino economico dei territori, non le imprese presenti sulla piattaforma (N2). Testi del copywriter | notte | numeri `display-xxl` | numeri in pila allineati a sinistra (72 px: «~200.000» occupa 309 px su 350). **Se al lancio resta solo «30+»** (riserva B3: gli altri due numeri non si pubblicano senza fonte): un solo numero in `display-xxl` dalla colonna 3, etichetta e nota con la data; il titolo si adatta al singolare (copywriter-brand). Se neanche «30+» è confermato, la sezione non si pubblica e il layout resta pronto |
| 4 | I luoghi | Titolo «I luoghi»; tre Porte 3:5 posizionate in orizzontale secondo la **longitudine reale** (Gravina a ovest, Acquaviva al centro, Monopoli a est), con un lieve sfalsamento verticale, su un filo d'orizzonte; nome in `display-s`, coordinate, «Esplora →» | calce | `display-l` | pila **da ovest a est**, come la fila desktop e l'ordine del focus: Gravina → Acquaviva → Monopoli (decisione del G4, al posto di «dalla costa all'entroterra»: WCAG 1.3.2 e 2.4.3, un solo ordine a tutte le larghezze) |
| 5 | Perché aderire | Elenco *scala*: le 4 voci rientrano ciascuna di una colonna rispetto alla precedente; numeri in `display-xl`, titoli in `display-s` | pietra | `display-m` | rientri di 16 px |
| 6 | Chiusura | Passaggio «Porta la tua impresa / dentro Puglia Digitale.», CTA «Contattaci →», form su due colonne sotto lo statement; link secondario al portale | notte | `display-l` | form a una colonna |

### 7.6 Città Digitali (`/citta-digitali`)

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | H1 «Città Digitali», Passaggio «Le attività del territorio, / online senza perdere radici.», sottotitolo, CTA «Visita il portale →»; nessuna immagine: la hero finisce su un orizzonte che si apre nel video | calce | `display-xl` | — |
| 2 | Video | A tutta larghezza, altezza `min(100svh, 56.25vw)`; apertura dall'orizzonte; controlli minimi (un nodo play/pausa in basso a sinistra, audio, tempo in mono); poster sempre presente: un fotogramma reale del video, scelto dal creative-director quando arriva il file. La copertina non ha un proprio orizzonte (G4, V10): a 768–1024 px sarebbe il secondo nella stessa schermata (§1.1), e il gesto dell'orizzonte che si apre nel video lo fa già quello di fine hero | notte | — (etichetta mono) | 16:9 a tutta larghezza; niente autoplay con Save-Data o reduced motion |
| 3 | L'Italia in un unico portale | Carta d'Italia a filo in `calce` su una colonna alta a destra, con 3 nodi `arancio-segnale`; a sinistra l'H2 e le tre città **allineate alla latitudine del loro nodo** (Varese in alto, Altamura al centro, Caltanissetta in basso), con coordinate e «Esplora →»; al focus o hover su una città si accende il suo nodo. La carta è solo contorno: nessuna campitura che faccia pensare a una copertura dell'Italia intera (N12) | notte (continua il buio del video) | `display-l` | carta piccola in alto, città in pila |
| 4 | Dal locale al nazionale | Elenco *sticky*: titolo e indicatore mono «01/05» fermi a sinistra, i 5 concetti scorrono a destra; spazio predisposto per dati documentati, nascosto finché non arrivano (linee guida §20) | calce | `display-l` | elenco numerato, niente sticky |
| 5 | Chiusura | Passaggio «La tua azienda merita più di una presenza online. / Merita di essere esplorata.» in `display-xl`, CTA «Entra in Città Digitali →» e form sotto | notte | `display-xl` | form a una colonna |

### 7.7 Contatti (`/contatti`)

| # | Sezione | Composizione | Superficie | Titolo | Mobile |
|---|---|---|---|---|---|
| 1 | Hero e form | H1 «Parliamo del prossimo spazio digitale.» su 12 colonne. Sotto, sulle colonne 1–4, la scheda contatti: sede con coordinate e «Apri in Mappe ↗» (nessuna mappa incorporata), telefono, cellulare, email, LinkedIn. Sulle colonne 6–12 il form | calce | `display-xl` | H1, poi email e telefono come tap target, poi form, poi il resto |
| 2 | Persona | Con DR3-a (raccomandata): composizione tipografica, con nome e ruolo in `display-m` `[DA VERIFICARE: F7]`, una riga del fondatore e link al profilo LinkedIn etichettato come personale (S6). Con DR3-b: ritratto a inchiostro (`fondatore-in-piedi`, al massimo 320 px) con nota di trasparenza | calce (la sfumatura del ritratto lo richiede) | `display-m` | ritratto, se c'è, al 60% della larghezza |
| 3 | Portali | Due righe tipografiche a tutta larghezza: «Città Digitali ↗» e «Puglia Digitale ↗» in `display-l`, URL in mono, filetti; all'hover la freccia avanza | notte | `display-l` | righe in pila |

### 7.8 Elementi fissi e pagine di servizio

- **Header.** Struttura, ordine del focus e stati sono quelli della sitemap UX (§3); qui c'è solo l'aspetto.
  - Logo a sinistra; a destra le 4 voci come testo e «Parliamone» come pillola `inchiostro`.
  - La voce corrente ha il punto del Nodo prima dell'etichetta: non si basa solo sul colore.
  - Sotto i 1024 px: logo, «Parliamone» compatto e «Menu» testuale.
  - Sulle pagine con hero scura (SIII) lo stato iniziale è su `notte`.
- **Menu mobile.** Struttura e comportamento dalla sitemap UX (§4); l'aspetto:
  - pannello a tutto schermo su `notte`;
  - numeri «01», «02», «03» in mono (`aria-hidden`), nomi in `display-l`, descrittori in `small` e `testo-notte-2`;
  - «Parliamone» come pillola `calce`, telefono ed email in mono.
  - I rilevamenti dei capitoli (000°, 120°, 240°) restano in Home: nel menu sarebbero rumore.
- **Breadcrumb** (sitemap UX §5). Sulle pagine interne sta sopra l'H1 della hero, in `label` mono, e prende il posto dell'occhiello: `inchiostro-2` su chiaro, `testo-notte-2` su scuro.
- **Footer.** Blocchi e ordine della sitemap UX (§6), su `notte`. L'ultima riga, in mono, è la firma: «ITnode · Acquaviva delle Fonti · 40.8957° N · 16.8412° E».
- **404.** Su calce: «404°» in `display-xxl`, perché su una bussola non esiste, come la pagina. Un orizzonte con i tre mondi come nodi a 000°, 120° e 240° porta alle pagine. Il copy è del copywriter.
  - Precisazioni del G4: l'orizzonte ha le tacche (senza, a 390 px una linea con tre punti sembra uno slider). Ogni nodo sta dentro l'area del link del suo mondo, perché il blu è interazione (§1.3). Le tre colonne sono allineate in alto.
- **Privacy e cookie.** Su calce, testo su 7 colonne, numeri di sezione in mono. Nessun dispositivo firma: pagine silenziose.

---

## 8. Il «test ITnode»

Cinque domande per ogni sezione, a ogni review. Basta un «no» per riprogettare la sezione.

1. **Se tolgo il logo, è ancora ITnode?** Almeno uno dei quattro dispositivi, oppure un asset o un dato reale di ITnode, deve renderla inconfondibile. Se potrebbe stare sul sito di qualunque azienda tech, si rifà (linee guida §32).
2. **Dove siamo?** La sezione è ancorata a un luogo, a una persona, a uno spazio o a un dato reale, oppure a un anello esplicito della catena spazio fisico → digitale → persone → imprese → territorio.
3. **Cosa posso esplorare qui?** C'è un gesto di esplorazione (un nodo, un'apertura, una rotazione, un'esperienza da aprire) o almeno un invito chiaro a farlo. Non basta raccontare l'immersione: bisogna farla percepire.
4. **È tutto vero?** Ogni nome, numero, immagine e affermazione è reale, attribuito e verificabile. I dati del cliente sono dichiarati come tali; nessuna immagine generata da noi; nessun beneficio quantitativo senza fonte.
5. **Funziona anche ferma?** Deve restare chiara, bella e veloce in quattro condizioni:
   - con `prefers-reduced-motion`;
   - senza JavaScript;
   - a 390 px;
   - su rete lenta.

   Il movimento aggiunge esplorazione, non sostiene la comprensione. E la sezione è diversa da quella che la precede (§7.2).

---

## Ipotesi da validare

- **Font.** Schibsted Grotesk (47 KB, in preload) e Fragment Mono (25 KB, senza preload) stanno nel budget dei font: confermato dalle misure di Fase 5. Il preload resta per decisione del G4 (ADR 005); il suo effetto su Safari iOS non è misurato.
- **Motion.** CSS scroll-driven animations e view transition cross-document come miglioramento progressivo, senza polyfill.
  - Stato al 2026-09-28, da fonti web: supportate in Chromium e in Safari 26 (le view transition da Safari 18.2).
  - Su Firefox le fonti sono discordanti `[DA VERIFICARE]`: lì l'esperienza resta statica.
- **Coordinate, rilevamenti e distanze** (§1.4): calcolati da coordinate pubbliche approssimate `[DA VERIFICARE]` prima della pubblicazione, con la regola di precisione del G4 (una sola fonte e 4 decimali reali, oppure 2 decimali per tutti).
- **Dimensioni tipografiche** (§3.2 e §5): verificate su Chromium con i font reali, da riverificare su Safari iOS nei prototipi del `ui-designer`.
- **Anteprima immersiva «Prova qui»** (iframe dell'esperienza SIII caricato solo al clic), in aggiunta all'apertura in nuova scheda chiesta dalle linee guida. Dipende da due verifiche:
  - se i portali permettono l'incorporamento (`X-Frame-Options`, `frame-ancestors`) `[DA VERIFICARE]`;
  - dalla gestione del consenso sui cookie dei portali, di competenza di `seo-technical` e dei riferimenti legali.

  Finché non è validata, vale solo la nuova scheda. Al G4 resta un lavoro per dopo il lancio: è la leva più forte per far provare l'immersione sul sito, ma può far cadere la premessa «nessun banner cookie» se i portali impostano cookie di terze parti.
- **Carte.** Natural Earth 1:10m è in pubblico dominio. Se servisse il confine regionale ufficiale, i limiti amministrativi ISTAT richiedono l'attribuzione.

## Domande aperte

Le domande sui materiali e sui fatti sono già registrate nel brief consolidato e qui non si duplicano:
- D3: la quarta «I» di SIII;
- D6: il fondatore;
- D7: i numeri;
- D9: le immagini e l'originale della foto evento;
- §7: i materiali mancanti.

Da aggiungere, per la parte visiva:
- **Foto evento.** La scena, oltre alla sovrimpressione, è stata ritoccata con strumenti generativi? Il simbolo ✦ lo fa sospettare.
- **Colori.** Codici ufficiali (HEX o Pantone) di ITnode, Puglia Digitale e Città Digitali.
- **Video Città Digitali.** C'è parlato? Se sì, i sottotitoli sono obbligatori (WCAG 1.2.2). Serve il file per scegliere il fotogramma del poster.
- **Riferimento.** Screenshot di aprildunford.com (vedi `analisi-riferimento.md`).
- **Persone nella foto dell'evento.** Ai partecipanti è stata data un'informativa sulle riprese? Senza, i ritagli si stringono sui due schermi e sul palco, escludendo i profili riconoscibili ai margini (§4.2).

## Decisioni richieste

1. **Logo per il web.** Proposta: wordmark senza trama poligonale. Pro: leggibile a 24–28 px e coerente con il divieto di pattern tecnologici. Contro: la trama sparisce dall'uso quotidiano. È una decisione del cliente perché tocca l'identità.
2. **Ritratti del fondatore: DR3 del brief consolidato.** Parere del creative-director:
   - **(a) subito**: la foto reale «Palco» chiude la sezione del fondatore;
   - **(c) il prima possibile**: shooting reale.

   Le opzioni:
   - (a) Pro: vera, disponibile, forte. Contro: il fondatore è piccolo nell'inquadratura; è un documento, non un ritratto.
   - (b) Ritratti attuali con trattamento a inchiostro e nota di trasparenza. Pro: disponibili, volto in primo piano. Contro: obblighi di trasparenza (AI Act, art. 50), fondali generati attenuati ma non eliminati, risoluzione limitata, contraddizione con la promessa di autenticità del sito.
   - (c) Pro: autenticità piena. Contro: costo e tempi.

   Le specifiche per (a) e (b) sono pronte (§4.3). Nota: l'incarico chiedeva di usare le foto del fondatore; DR3 e l'AI Act sono i motivi nuovi per cui il creative-director raccomandava (a).

   **Aggiornamento del G4:** il sito applica (b). Anche la foto dell'evento porta ora la nota AI (B4), quindi (a) ha perso il suo vantaggio finché non arriva l'originale. Parere: (b) con le maschere del §4.3 per il lancio, (c) appena possibile. Decide l'utente, con l'ADR 002.
3. **Produzione fotografica dei luoghi** (6 località) **e del ritratto del fondatore**: budget e tempi. Senza, il sito va online con le varianti tipografiche (§4.5), progettate per reggere da sole.
4. **Concept della hero** («L'orizzonte dei luoghi»): pubblica i luoghi con direzione e distanza dalla sede di Acquaviva. Doveva essere approvato al gate G2 insieme a questa direzione visiva; G2 non è mai stato approvato formalmente, quindi l'approvazione va data ora, insieme al G4.
5. **Approvazione di questa direzione visiva (versione 0.2)** da parte dell'utente, retroattiva per il G2: è la condizione perché passi allo stato «approvato».
