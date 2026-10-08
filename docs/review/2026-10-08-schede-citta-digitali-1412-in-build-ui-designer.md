---
titolo: Schede di /citta-digitali/ con WCAG 1.4.12, patch B nella build · verifica di fedeltà e variante B2
owner: ui-designer
contributi: []
stato: in revisione
versione: 0.1
aggiornato: 2026-10-08
fonti: [commit 474e2df (patch B applicata dalla sessione principale), docs/review/2026-10-08-carta-citta-digitali-nomi-ux-designer.md (1.1, §6: scelta della patch B), docs/review/2026-10-08-carta-citta-digitali-nomi-ui-designer.md (§2.2 e §5: patch B), docs/ux/accessibilita.md (0.12, riga «Spaziatura del testo» e §4.3), docs/ui/design-system.md (0.14), docs/creativa/direzione-visiva.md (0.17, §1.4), staging http://127.0.0.1:4321 (build di 474e2df), build di prima della patch http://127.0.0.1:4360, misure della sessione principale in scratchpad/b-main/, sonde di ux-designer in scratchpad/ux-1412/ (probe.mjs, probe-font.mjs), copia pulita di 474e2df con e senza la variante B2 (build in locale), Playwright 1.56 (Chromium 141), axe-core 4.13 e sharp 0.35 del 2026-10-08]
oggetto: sezione «L'Italia in un unico portale» di /citta-digitali/ da 1280 px, dopo il commit 474e2df
---

# Schede di `/citta-digitali/` con WCAG 1.4.12: la patch B nella build

**Richiesta** (sessione principale, 2026-10-08, Fase 5). La patch B, scelta da ux-designer al posto della soglia a 86em, è applicata senza modifiche nel commit 474e2df, già pubblicato. Le richieste:
1. confermare che la build corrisponde alla patch e guardare la sezione a 1280, 1366, 1440 e 1920 px, senza spaziature e poi con le spaziature;
2. allineare il design system se descrive le schede in posizione assoluta (versione 0.15), registrando il comportamento con le spaziature dell'utente;
3. scrivere questa review, con il verdetto di dominio.

**Base delle misure.**
- **Staging** (4321): build di 474e2df. È identica, file per file, alla build di prova di ux-designer e a una mia build pulita (§1).
- **Build di prima** (4360): HEAD c2d368a senza la patch, identica alla build di confronto di ux-designer.
- **Metodo.** Misure relative alla sezione, ripetute finché due letture coincidono, con il CSS di prova di `accessibilita.md` §4.3. Chromium 141.
- **Vincoli rispettati.** Non ho toccato `src/` né `docs/creativa/`. La correzione che propongo (§4) è una patch nello scratchpad, già provata.

## In sintesi

- **La build corrisponde alla patch.** Ci sono tre prove (§1):
  - il file del commit è identico alla patch applicata alla base;
  - lo staging è identico, file per file, alla build provata da ux-designer e a una mia build pulita di 474e2df;
  - il CSS compilato contiene esattamente le regole della patch.
- **Senza spaziature non cambia nulla** a 1280, 1366, 1440 e 1920 px (§2):
  - filetti 19,2 px sopra il nodo e ritmo verticale come prima;
  - legenda 17 px sotto la carta, aria in fondo invariata;
  - geometria entro 0,03 px; carta e legenda identiche al pixel.
- **Con le spaziature non si copre più nulla** (§3):
  - almeno 42,9 px tra le schede e 24,1 px tra titolo e link;
  - «Caltanissetta» va a capo dentro la sua colonna.
- **[IMPORTANTE] Due effetti che la patch B lascia, con una variante provata, B2** (§4).
  - **Le schede scendono più del necessario.** Con le spaziature scendono tutte e tre, anche Varese (fino a 29 px) e Altamura (fino a 135 px), che non ne avrebbero bisogno. Basterebbe spostare Caltanissetta di 12–80 px.
  - **Il margine in fondo è sottile.** Sotto l'ultima scheda restano 17–24 px. Con quattro parole in più nella descrizione di Caltanissetta, a 1920 px il testo esce dalla sezione e finisce chiaro sul fondo calce della sezione successiva. Oggi 1.4.12 è rispettato, ma solo con il testo attuale.
  - **La variante B2** calcola le latitudini sull'altezza della carta. Senza spaziature è identica pixel per pixel. Con le spaziature tiene Varese e Altamura alla loro latitudine, sposta solo Caltanissetta e lascia 145–187 px in fondo, anche con testi più lunghi.
  - Decidono ux-designer (1.4.12) e il creative-director (impaginato).
- **Design system 0.15** (§6). Le schede sono descritte nel flusso, con il comportamento sotto le spaziature dell'utente. Sono allineate anche la patch A (a95b5c6) e la descrizione L8 (b71268e).

## 1. Fedeltà: la build corrisponde alla patch

| Prova | Come | Esito |
|---|---|---|
| File | patch B applicata a `LocationShowcase.astro` di 474e2df^ (blob `edb1fe3`), confrontata con il file del commit | identici (blob `e72ee4b`). La HEAD non ha più toccato il file. Applicata «senza modifiche», come dice il commit |
| Build | md5 dei 165 file di `dist/` dello staging | identica alla build di prova di ux-designer (HEAD c2d368a con la patch B: fra le due basi cambiano solo documenti) e a una mia build pulita di 474e2df da `git archive`. La build del 4360 è identica alla sua build senza patch |
| Markup | `<ol>` e `<li>` della sezione | `--first: 12.92` sull'elenco; `--to-next: 46.32` e `31.53` su Varese e Altamura, cioè le differenze delle `--y` di prima (59,24 − 12,92; 90,77 − 59,24). Nessuna `--y` |
| CSS compilato | regole della sezione | Da 80em: tolte `position: relative` dall'elenco e `position: absolute`, `inset-inline`, `top` e `translate` dalle schede. Aggiunti `::before` con `calc(var(--first) * 1% - 1.2rem)`, `min-height` e `align-content: start` sulle schede, `max-width: 100%` sul titolo. Sotto gli 80em nessuna regola cambia |
| Pagine | differenze tra le due build | Cambiano solo `/citta-digitali/` (markup e CSS) e `/puglia-digitale/`, dove cambia solo il CSS del componente, che lì nessun elemento usa |

## 2. Senza spaziature: 1280, 1366, 1440 e 1920 px

| Finestra | Filetto sopra il nodo (Varese, Altamura, Caltanissetta) | Dal testo al filetto successivo | Titolo → «Esplora» | Legenda sotto la carta | Aria sotto l'ultima scheda | Aria sotto la legenda | Sezione |
|---|---|---|---|---|---|---|---|
| 1280 | 19,2 · 19,3 · 19,2 px | 168,7 · 36,6 px | 203,5 · 143,9 · 46,0 px | 17 px | 133,0 px | 198,4 px | 1741,6 px |
| 1366 | 19,2 · 19,3 · 19,2 | 188,4 · 48,8 | 225,5 · 164,1 · 61,4 | 17 | 140,8 | 204,4 | 1814,2 |
| 1440 | 19,2 · 19,3 · 19,2 | 204,2 · 58,6 | 246,3 · 182,0 · 73,6 | 17 | 146,6 | 209,6 | 1876,9 |
| 1920 | 19,2 · 19,3 · 19,2 | 232,6 · 74,1 | 259,5 · 181,8 · 49,0 | 17 | 173,1 | 240,0 | 2084,0 |

- **Uguale a prima.** La build di prima dà gli stessi valori a tutte e quattro le larghezze. Tra le due build filetti, nodi, titoli, link, testi, carta, legenda, colonna del testo e altezza della sezione differiscono al massimo di 0,03 px. Nelle 322 finestre da 320 a 1920 px il massimo è 0,04 px, come nelle misure della sessione principale (40 finestre) e di ux-designer (184).
- **A occhio.**
  - I filetti corrono per tutta la colonna 1–5 e ognuno sta poco sopra il suo nodo.
  - Il vuoto sotto Varese è la distanza in latitudine fino ad Altamura, come prima.
  - Il passo più stretto resta Altamura → Caltanissetta a 1280 px (36,6 px), come prima.
  - La legenda sta sotto la carta. In fondo Caltanissetta scende sotto la carta nei 96 px riservati, e la sezione chiude con la sua aria.
- **Pixel.** Carta e legenda sono identiche al pixel. Nelle schede cambia solo l'arrotondamento del testo: per ogni scheda lo spostamento intero migliore è (0, 0). La riga descrittiva di Varese a 1280 px cade 1 px più in alto: a 2× coincide spostandola di 2 pixel del dispositivo. Non si vede.
- **Riquadri delle schede.** Ora ogni scheda è alta quanto la sua fascia di latitudine. A schermo non cambia nulla, perché la scheda ha solo il filetto in alto. Cambia la zona che accende il nodo al passaggio del mouse, già accettata da ux-designer.
- **Immagini** (in `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-1412b/shots/`):
  - staging: `B0-1280.png`, `B0-1366.png`, `B0-1440.png`, `B0-1920.png`;
  - prima della patch: `P0-*.png`;
  - a 2×: `*-row2x.png`;
  - differenza amplificata del testo di Varese: `sbs-varese-1280.png`.

## 3. Con le spaziature di 1.4.12: a occhio e con le misure

| Finestra | Sotto la latitudine (Varese, Altamura, Caltanissetta) | Quanto servirebbe | Tra le schede | Titolo → «Esplora» | Aria sotto l'ultima scheda |
|---|---|---|---|---|---|
| 1280 | 29,4 · 134,8 · 215,2 px | 0 · 0 · 80,5 px | 199,0 · 42,9 px | 140,1 · 64,9 · 57,3 px | 18,2 px |
| 1366 | 22,1 · 101,2 · 155,1 | 0 · 0 · 41,5 | 189,3 · 55,4 | 159,6 · 81,8 · 32,9 | 22,7 |
| 1440 | 18,6 · 85,3 · 130,8 | 0 · 0 · 32,1 | 192,3 · 56,4 | 178,5 · 97,1 · 45,7 | 22,4 |
| 1920 | 18,7 · 85,8 · 131,5 | 0 · 0 · 26,6 | 211,0 · 62,1 | 179,1 · 80,3 · 70,3 | 17,0 |

- **Nessuna sovrapposizione** in 130 finestre da 1280 a 1920 px. Tra le schede restano almeno 42,9 px, tra titolo e link almeno 24,1 px, e la pagina non scorre in orizzontale. I problemi di prima sono risolti: con la build del 4360, a 1280 px, il testo di Altamura copriva la scheda di Caltanissetta per 37,5 px e il titolo passava sotto «Esplora ↗».
- **«Quanto servirebbe»:** è la discesa minima. Ogni scheda scende solo se la precedente, con il suo testo, è più alta dello scarto di latitudine.
- **«Caltanissetta»** va su due righe in tutte le 130 finestre: «Caltaniss / etta» a 1280 e 1920 px, «Caltanisse / tta» a 1366 e 1440.
  - È la rete di sicurezza `overflow-wrap` dei titoli (A5). Il titolo largo al massimo quanto la colonna la fa scattare.
  - In Chromium il punto di a capo può cambiare di una lettera tra un calcolo dell'impaginato e l'altro della stessa pagina. In alcune catture la stessa finestra mostra una lettera in più sulla prima riga. In tutti e due i casi il titolo resta nella colonna.
- **A occhio.**
  - A 1280 px il filetto di Varese sta all'altezza del nodo invece che 19 px sopra; Altamura e Caltanissetta scendono sempre di più.
  - In fondo il testo dell'ultima scheda arriva a 17–23 px dalla fine della sezione, molto meno dell'aria in alto.
  - Sotto la legenda resta una colonna vuota di 305 px e più.
  - Si legge ancora l'ordine da nord a sud, e i nomi accanto ai nodi tengono il legame con le schede.
- **Immagini:** `B1-1280.png`, `B1-1920.png`, `pair-B1-1366-1440.png`; prima della patch, `P1-*.png`.

## 4. [IMPORTANTE] Le schede scendono più del necessario e il margine in fondo dipende dal testo: variante B2

- **Dove.** `src/components/sections/LocationShowcase.astro`, regole da 80em: `.places__cities::before` e `.city` (`min-height`).
- **Problema.**
  1. **Con le spaziature l'elenco diventa più alto della carta.** La riga prende l'altezza della somma delle schede: 914,6 px contro i 687 della carta, a 1280 px. Le percentuali di `--first` e `--to-next` si calcolano sull'elenco cresciuto, non sulla carta, quindi tutte le schede scendono in proporzione. Varese scende di 11–29 px e Altamura di 51–135, quando la discesa necessaria è zero per tutte e due (tabella del §3).
  2. **Il contenuto supera l'elenco di 210–255 px e consuma l'aria in fondo alla sezione**, che scende a 17–24 px. La sezione dopo è su calce, e il testo delle schede è chiaro: se esce, non si legge più. Ho allungato la descrizione di una scheda con parole di prova:

     | Testo aggiunto, con le spaziature | 1280 px | 1920 px |
     |---|---|---|
     | nessuno | 18,2 px in fondo | 17,0 px |
     | Caltanissetta, +4 parole (+1 riga) | 0,1 px | **−10,3 px: l'ultima riga esce dalla sezione** |
     | Caltanissetta, +8 parole (+2 righe a 1280, +1 a 1920) | **−26,7 px** | **−10,3 px** |
     | Altamura, +8 parole (+2 righe) | **−16,8 px** | 0,5 px |

     Senza spaziature succede lo stesso con un testo molto più lungo: con 32 parole in più (+6 righe), a 1280 px Caltanissetta esce di 48,6 px.
- **Motivazione.**
  - WCAG 1.4.12, livello AA, è una soglia del progetto. Oggi è rispettato, ma con 17 px di margine: la prossima modifica del testo delle schede può romperlo senza che nessuno se ne accorga, e il guasto è testo invisibile.
  - ux-designer l'ha già messo tra le ipotesi da rifare a ogni cambio di testo. La variante B2 toglie la necessità della prova.
  - L'allineamento perso con le spaziature è più grande del necessario. È proprio il costo che il creative-director sta valutando.
- **Proposta: variante B2**, una patch di poche righe sopra la B. Si applica alla HEAD 474e2df: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-cdn/diff/citta-digitali-schede-1412-b2.patch`. Il testo completo è nel §7.
  - **Altezza della carta in CSS.** L'altezza si ricava dalla larghezza delle sue 6 colonne, 7 / −1: `--map-h: calc((50cqw - var(--gutter) / 2) * var(--map-ratio))`. Il contenitore è la griglia della sezione (`container-type: inline-size`). `--map-ratio` arriva da `maps.json` (1180,8 / 1000 = 1,1808), lo stesso dato dell'`aspect-ratio` della carta.
  - **Latitudini sulla carta, non sull'elenco.** `::before` e `min-height` usano `--map-h` al posto delle percentuali. Le misure non dipendono più dall'elenco: si sposta solo la scheda che deve spostarsi, e la riga cresce con il contenuto vero.
  - **L'ultima scheda può scendere sotto la carta al massimo di `--space-4xl`** (8rem): `margin-bottom: calc(-1 * var(--space-4xl))`. Oggi, senza spaziature, ne scende 93–102 px. Se serve più spazio, cresce la riga e la sezione tiene la sua aria.
- **Prove della variante B2.** Copia pulita di 474e2df con la patch, build in locale.

  | Prova | Patch B (staging) | Variante B2 |
  |---|---|---|
  | `astro check` | 0 errori, 0 avvisi | 0 errori, 0 avvisi (gli stessi 2 suggerimenti della HEAD) |
  | Senza spaziature, 322 finestre da 320 a 1920 px | — | identica allo staging entro 0,04 px; sezione identica pixel per pixel a 1280, 1366, 1440 e 1920 px (0 pixel diversi) |
  | Con le spaziature, sotto i 1280 px (192 finestre) | — | identica allo staging |
  | Con le spaziature, da 1280 a 1920 px (130 finestre): sotto la latitudine | Varese 11–29 px, Altamura 51–135, Caltanissetta 77–215 | Varese 0, Altamura 0, Caltanissetta 12–80 px, cioè il minimo in ogni finestra |
  | Tra le schede, titolo → «Esplora», scorrimento orizzontale | 42,9 px, 24,1 px, nessuno | uguali |
  | Aria sotto l'ultima scheda | 17–24 px | 145–187 px |
  | +1, +2 e +4 righe in Altamura o Caltanissetta, a 1280 e 1920 px | fino a −26,7 px (testo fuori dalla sezione) | sempre 145,3 px a 1280 e 187 a 1920 |
  | Senza spaziature, da +1 a +6 righe in Caltanissetta | fino a −48,6 px | almeno 105,9 px |
  | Caratteri predefiniti a 20 e 24 px, con le spaziature, da 1600 a 2560 px | 17,7–35,2 px in fondo | 181–262 px; Varese e Altamura con il filetto 1,2rem sopra il nodo |
  | axe-core 4.13, a 390, 1280 e 1440 px e con le spaziature a 1280 e 1920 | 0 violazioni | 0 violazioni |
  | Scheda → nodo, con mouse e tastiera | si accende solo il proprio nodo | uguale. Con le spaziature la fascia di Varese è di 318 px invece di 424 |
  | Colori forzati | filetti e testi nei colori di sistema | uguale |
  | HTML e pesi | — | cambiano solo `/citta-digitali/` (5 regole CSS e lo stile dell'`<ol>`) e il CSS di `/puglia-digitale/`: +57 e +10 byte con Brotli |

- **Limiti e costi.**
  - **La formula dipende dalla carta sulle colonne 7 / −1 di 12.** Se cambiano le colonne, cambia `--map-h`: lo dice il commento nel componente, e il design system lo registra.
  - **Unità di contenitore.** Servono da Safari 16 e Firefox 110. Dove mancano, `--map-h` non vale: le schede si impilano dall'alto, senza latitudine ma senza coprirsi.
  - **Riserva di `--space-4xl`.** Senza spaziature restano 26 px di margine. Se la descrizione di Caltanissetta crescesse di due righe, la sezione si allungherebbe di qualche pixel invece di lasciar scendere il testo: un effetto innocuo.
- **Decide** ux-designer per 1.4.12, poi il creative-director per l'impaginato. La sessione principale applica la patch.
  - Comando: `git apply` sulla HEAD 474e2df. La patch porta l'indice del blob di partenza, quindi funziona anche `--3way`.
  - Dopo l'applicazione si ripetono le prove della tabella. Gli script sono nello scratchpad.
- **Immagini:**
  - con le spaziature, staging a sinistra e B2 a destra: `pair-1412-1280-B-vs-B2.png` e `pair-1412-1920-B-vs-B2.png`;
  - +4 parole a 1920 px: `pair-sens-1920-calt4.png`;
  - B2: `C1-*.png` con le spaziature e `C0-*.png` senza.

## 5. Per il creative-director: l'impaginato con le spaziature

Il creative-director sta valutando l'impaginato con le spaziature. Qui do solo i dati che servono, senza decidere per la direzione visiva.
- **Allineamento.**
  - Con la patch B scendono tutte e tre le schede.
  - Con la B2 Varese e Altamura restano alla latitudine e scende solo Caltanissetta, di 12–80 px: 80 a 1280 px, 41 a 1366, 32 a 1440, 27 a 1920.
  - Lo spostamento di Caltanissetta non si può togliere: con le spaziature la scheda di Altamura è più alta dello scarto di latitudine.
- **«Caltaniss / etta».** Con le spaziature, a 1280 px, la parola intera chiede circa 434 px e la colonna del titolo gliene dà 337,7. Le strade possibili:
  1. **Accettare.** È la rete di sicurezza di tutti i titoli del sito (A5), e scatta solo con le spaziature dell'utente.
  2. **`hyphens: auto` sul titolo.** Darebbe «Caltanis-setta» con il trattino, nei browser che hanno il dizionario italiano. Il Chromium di prova non ha dizionari: non sillaba né l'italiano né l'inglese. Quindi `[DA VERIFICARE]` su Chrome desktop, Safari e Firefox. Senza dizionario resta l'a capo di oggi.
  3. **«Esplora ↗» sotto il testo da 80em, come tra 1024 e 1279 px.** Il titolo avrebbe la colonna intera. Ma cambierebbe l'impaginato per tutti, per un caso che riguarda solo chi applica le spaziature.

  Consiglio la prima.

## 6. Design system: versione 0.15

`docs/ui/design-system.md`:
- **§3.8, `italy`.** Le schede sono nel flusso, non più in posizione assoluta con `top: yPct%`: `::before` con `--first`, `min-height` con `--to-next`, `max-width: 100%` sul titolo. Con le spaziature dell'utente le schede scendono sotto il loro nodo e un nome lungo va a capo dentro la colonna, con le misure della build. In più la proposta B2, e la fascia che accende il nodo.
- **§2.4.** Nella regola 9 le schede possono scendere sotto il nodo con le spaziature. Patch A applicata. Descrizione L8 di 171 caratteri.
- **§5.4.** La patch A è registrata come applicata: `places` e `dots` 8 e 37, ancore `{ large, wide, narrow }`, `nomi.ampie`.
- **§6.** Due righe: la verifica della patch B nella build e la variante B2.
- **Ipotesi, domande e decisioni.** Chiuse la patch A e la scelta tra B e 86em. Aperta la variante B2. Nuove ipotesi su browser, colonne e punto di a capo.

## 7. Patch della variante B2

Si applica alla HEAD 474e2df (`git apply --check` passa). Applicata al file della HEAD, dà esattamente il file provato. La build della copia con questa patch è identica, file per file, a quella misurata.

```diff
diff --git a/src/components/sections/LocationShowcase.astro b/src/components/sections/LocationShowcase.astro
index e72ee4b..782a040 100644
--- a/src/components/sections/LocationShowcase.astro
+++ b/src/components/sections/LocationShowcase.astro
@@ -79,7 +79,8 @@ const doors = west.map((l) => ({
 // Italy: north → south, each city at the height of its node on the map (yPct of maps.json, named
 // places or dots: a city may be either, depending on the names of the Home map).
 type ItalyPoint = { id: string; yPct: number };
-const italia = (maps as { maps?: { italia?: { places?: ItalyPoint[]; dots?: ItalyPoint[] } } }).maps?.italia;
+type ItalyMap = { width?: number; height?: number; places?: ItalyPoint[]; dots?: ItalyPoint[] };
+const italia = (maps as { maps?: { italia?: ItalyMap } }).maps?.italia;
 const italyPoints: ItalyPoint[] = [...(italia?.places ?? []), ...(italia?.dots ?? [])];
 const north = [...locations]
   .sort((a, b) => b.lat - a.lat)
@@ -91,6 +92,15 @@ const gapToNext = (i: number) => {
   const [a, b] = [north[i]?.y, north[i + 1]?.y];
   return a !== undefined && b !== undefined ? +(b - a).toFixed(2) : undefined;
 };
+// The map's height over its width (its aspect-ratio): from 80em the CSS computes the map's height from the
+// width of its columns.
+const mapRatio = italia?.width && italia?.height ? +(italia.height / italia.width).toFixed(6) : undefined;
+const listStyle = [
+  north[0]?.y !== undefined ? `--first: ${north[0].y}` : '',
+  mapRatio !== undefined ? `--map-ratio: ${mapRatio}` : '',
+]
+  .filter(Boolean)
+  .join('; ');
 ---
 
 <section id={id} class:list={['places', `places--${variant}`, `surface-${surface}`]} aria-labelledby={`${id}-title`}>
@@ -189,7 +199,7 @@ const gapToNext = (i: number) => {
               <MapItaly map="italia" places={north} showLabels={false} class="places__map-svg" />
             )}
           </div>
-          <ol role="list" class="places__cities" style={north[0]?.y !== undefined ? `--first: ${north[0].y}` : undefined}>
+          <ol role="list" class="places__cities" style={listStyle || undefined}>
             {north.map((c, i) => (
               <li class="city" data-place-link={c.id} style={gapToNext(i) !== undefined ? `--to-next: ${gapToNext(i)}` : undefined}>
                 <h3 class="city__name">{c.name}</h3>
@@ -500,14 +510,19 @@ const gapToNext = (i: number) => {
   /* From 1280 px each city stands at the latitude of its node: Altamura → Caltanissetta is
      31.6% of the map (≥ 217 px), more than a city block (~175 px). */
   @media (min-width: 80em) {
-    /* Caltanissetta hangs ~95 px below the map: keep the section's own bottom air. */
+    /* Caltanissetta hangs ~95 px below the map: keep the section's own bottom air. The grid is also the
+       container whose width gives the cities the map's height (cqw, below). */
     .places__italy {
       padding-bottom: var(--space-3xl);
+      container-type: inline-size;
     }
 
-    /* As tall as the map (stretched in its row), so that the latitudes below are % of the map's height. If
-       the cities need more room than the map (WCAG 1.4.12 text spacing), the row grows: nothing overflows. */
+    /* The latitudes below are shares of the map's height, computed from the map's width (columns 7 / -1:
+       half the grid less half a gutter) and its aspect ratio, not % of the list. When the cities need more
+       room than the map (WCAG 1.4.12 text spacing), only the cities that must move do, and the row grows
+       with them: the section always contains them. */
     .places__cities {
+      --map-h: calc((50cqw - var(--gutter) / 2) * var(--map-ratio, 0));
       align-self: stretch;
       display: block;
       padding: 0;
@@ -517,7 +532,7 @@ const gapToNext = (i: number) => {
     .places__cities::before {
       content: '';
       display: block;
-      height: calc(var(--first, 0) * 1% - 1.2rem);
+      height: calc(var(--first, 0) * var(--map-h) / 100 - 1.2rem);
     }
 
     /* The cities stand at the latitude of their node: the legend must not lengthen the map's row. */
@@ -532,13 +547,19 @@ const gapToNext = (i: number) => {
     }
 
     .city {
-      min-height: calc(var(--to-next, 0) * 1%);
+      min-height: calc(var(--to-next, 0) * var(--map-h) / 100);
       grid-template-columns: minmax(0, 1fr) auto;
       column-gap: var(--space-m);
       align-items: baseline;
       align-content: start;
     }
 
+    /* The last city may hang below the map into the section's bottom air (93–102 px today), as far as
+       --space-4xl; if it needs more (WCAG 1.4.12), the row grows instead and the section keeps its air. */
+    .city:last-child {
+      margin-bottom: calc(-1 * var(--space-4xl));
+    }
+
     /* A long name breaks inside its column (WCAG 1.4.12) instead of running under «Esplora». */
     .city__name {
       max-width: 100%;
```

## Verdetto di dominio (UI)

- **Fedeltà: conforme.** La build di 474e2df è la patch B, senza differenze. Senza le spaziature dell'utente l'impaginato è quello approvato, a tutte le larghezze.
- **Con le spaziature non si copre più nulla.** WCAG 1.4.12 è rispettato con il testo attuale.
- **[IMPORTANTE] Consiglio la variante B2 prima del go-live.** Toglie la dipendenza dal testo attuale: oggi bastano quattro parole in più per far uscire il testo dalla sezione. In più riduce l'allineamento perso al minimo necessario, e senza spaziature resta identica pixel per pixel.
- Il verdetto di gate spetta al creative-director.

## Ipotesi da validare

- **Browser.** Le misure sono in Chromium 141. Safari iOS e Firefox, con e senza spaziature, `[DA VERIFICARE]`, per la patch B e per la variante B2. Nella B2 le unità di contenitore servono da Safari 16 e Firefox 110.
- **«Quattro parole in più» è un caso di prova, non un testo previsto.** Indica di quanto può crescere una descrizione prima che, con le spaziature, il testo esca dalla sezione.
- **Punto di a capo.** In Chromium il punto in cui «Caltanissetta» si spezza può variare di una lettera tra due calcoli dell'impaginato della stessa pagina. Non cambia l'esito delle prove.

## Domande aperte

- **ux-designer:** la variante B2 va bene per 1.4.12? Toglie il margine di 17 px che la sua review mette tra le ipotesi da riprovare a ogni cambio di testo.
- **creative-director:** con la B2 l'allineamento con le spaziature regge? E «Caltaniss / etta» resta come oggi (§5)?

## Decisioni richieste

- **ux-designer, poi creative-director:** adottare la variante B2 (§4).
- **Sessione principale:** se approvata, applicare la patch del §7 e ripetere sullo staging le prove delle schede con le spaziature, compresa quella dei testi più lunghi.
