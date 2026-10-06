---
titolo: Carta della Puglia intera nella hero di /puglia-digitale/ · descrizione e verifica di accessibilità
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-06
fonti: [docs/review/2026-10-06-carta-puglia-intera-ui-designer.md (P1–P5), docs/review/2026-10-05-legenda-mappa-copywriter-brand.md (v1.3, L7, commit a8bc4ba), docs/strategia/citta-digitali-elenco.md (0.3, §4), docs/ux/accessibilita.md (0.6: §2.8, §2.14, Appendice D), src/lib/citta-digitali.ts, src/pages/puglia-digitale.astro, src/data/maps.json, staging http://localhost:4321 e variante «in pubblicazione» http://localhost:4322 (commit b113efb), copia del repository con la descrizione L7 (build servita in locale, non versionata), Playwright 1.56 con Chromium 141 (colori forzati emulati, palette chiara e scura), albero di accessibilità via CDP, axe-core 4.13 del 2026-10-06]
oggetto: lunghezza e contenuto della descrizione della carta della Puglia intera; verifica sulla staging di albero di accessibilità, ordine di lettura della hero e colori forzati, comprese le foto delle porte di «I luoghi»
---

# Carta della Puglia intera · descrizione e verifica di accessibilità

## In sintesi
- **Descrizione: si applica L7 di copywriter-brand, 222 caratteri.** Testo:
  > Carta della Puglia con le città di Puglia Digitale, più numerose nella provincia di Bari. Tra queste: Manfredonia, Barletta, Bari, Monopoli, Gravina in Puglia e Nardò. Un anello segna Acquaviva delle Fonti, sede di ITnode.
  - **Nomi:** quelli che la carta disegna a ogni larghezza, da nord a sud, senza la sede, che ha la sua frase. Ogni nome detto è sulla carta anche al telefono.
  - **Al go-live senza il testo della pagina «Tutte le città»** la descrizione diventa da sola di 186 caratteri: «… Tra queste: Monopoli e Gravina in Puglia. Un anello segna Acquaviva delle Fonti, sede di ITnode.» (provato).
  - **Tetto per tutte le descrizioni delle carte: 250 caratteri** nella versione più lunga. Oggi: Home 241, `/citta-digitali/` 138, `/puglia-digitale/` 222.
- **Snippet pronto e provato** (§2). `src/lib/citta-digitali.ts` e `src/pages/puglia-digitale.astro`; la descrizione esce uguale al testo di L7, carattere per carattere. Home e `/citta-digitali/` non cambiano.
- **Verifica sulla staging (commit b113efb): nessun problema.**
  - Albero di accessibilità e ordine di lettura della hero corretti da 320 a 1440 px.
  - Colori forzati in regola su tutte le pagine (Appendice D.1 e D.2), staging e «in pubblicazione».
  - Le foto delle porte reggono nei colori forzati.
  - L'unica correzione è la descrizione.

## 1. Descrizione: la decisione

| Versione | Caratteri | Esito |
|---|---|---|
| Di oggi (ui-designer): province elencate, 12 nomi della hero, frase della sede | 379 | Scartata |
| L7, nomi disegnati a ogni larghezza | 222 | **Scelta** |
| L7 con i nomi della hero | 267 | Scartata |
| L7 con i soli nomi solidi | 186 | È quella del go-live, e ci si arriva da soli togliendo i nomi dell'anteprima |

**Perché L7.**
- **Un nome accessibile si sente tutto d'un fiato.** Chi usa uno screen reader non può scorrerlo come un testo: 379 caratteri, con 12 nomi di fila, sono più di quanto si trattenga all'ascolto. L7 ha tre frasi brevi e 6 nomi.
- **Dice ciò che la carta aggiunge al testo:**
  - che cosa mostra: le città di Puglia Digitale;
  - dove si addensano: nella provincia di Bari;
  - qualche nome che dà l'estensione: Manfredonia a nord, Nardò a sud;
  - che cosa significa l'anello: la sede di ITnode.
- **Toglie due difetti della versione di oggi.**
  - L'elenco delle sei province è l'elenco di tutte le province: all'ascolto vale come «tutta la Puglia», che brand-strategist esclude (§4, condizione 2). Sulla carta d'Italia l'elenco delle regioni invece informa, perché sono 6 su 20.
  - Acquaviva delle Fonti compariva due volte.
- **Ogni nome detto è sulla carta a ogni larghezza.** Con i nomi della hero, 5 dei 12 (Altamura, Ostuni, Brindisi, Massafra, Lecce) non si vedono sulla carta dei telefoni.
- **Regge con qualunque elenco.**
  - «La maggior parte» solo sopra la metà; in caso di parità la frase non nomina nessuna provincia.
  - Nessun numero, nessun «tutta».
- **E la Home?** Resta com'è: 241 caratteri, sotto il tetto, con i nomi della carta larga dopo «Tra queste», veri a ogni larghezza. Se un giorno si rigenera la carta del capitolo 03, si allinea alla regola «nomi disegnati a ogni larghezza».
- **Legenda:** «Ogni punto è una città di Puglia Digitale» (L1 e L7). Per l'accessibilità va bene: spiega il segno, sta in `<figcaption>` e si legge subito dopo la carta.

## 2. Snippet

Base: commit b113efb. `astro check` dà 0 errori. Nella build la descrizione è identica al testo di L7 su entrambe le carte della pagina (larga e compatta); Home e `/citta-digitali/` restano identiche allo staging. Copia della patch: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ux-pd/l7.patch`.

```diff
diff --git a/src/lib/citta-digitali.ts b/src/lib/citta-digitali.ts
index c4c89d9..d10bf50 100644
--- a/src/lib/citta-digitali.ts
+++ b/src/lib/citta-digitali.ts
@@ -40,15 +40,18 @@ const unknownProvince = [...perProvince.keys()].filter((p) => !PROVINCES[p]);
 if (unknownProvince.length) throw new Error(`lib/citta-digitali.ts: add ${unknownProvince.join(', ')} to PROVINCES`);
 
 /**
- * Text alternative of the map of Puglia with the cities of Puglia Digitale, in the same form: the
- * provinces north → south, the one with most cities, the names the map draws on wide screens, and the
- * office when the map rings it. Never «tutta la Puglia» nor a number (brand-strategist, §4).
- * Wording to be refined by copywriter-brand.
+ * Text alternative of the map of Puglia with the cities of Puglia Digitale (copywriter-brand, L7):
+ * the province with most cities, the names the map draws at every width (north → south, without the
+ * office) and the office, which the map rings. No list of provinces: all six would read as «tutta la
+ * Puglia». Never a number (brand-strategist, §4). About 220 characters: an accessible name is read in
+ * one breath (ux-designer, 2026-10-06).
  */
 export function describePugliaDigitale(names: string[] = [], office?: string): string {
-  const provinces = Object.keys(PROVINCES).filter((p) => perProvince.has(p)).map((p) => PROVINCES[p]);
-  const [most, mostCount] = [...perProvince].sort((a, b) => b[1] - a[1])[0];
+  const [[most, mostCount], second] = [...perProvince].sort((a, b) => b[1] - a[1]);
+  // «la maggior parte» only above half; on a tie no province is named.
+  const quota = mostCount > puglia.length / 2 ? 'la maggior parte' : 'più numerose';
+  const where = second && second[1] === mostCount ? '' : `, ${quota} nella provincia di ${PROVINCES[most]}`;
   const among = names.length ? ` Tra queste: ${andList(names)}.` : '';
-  const ring = office ? ` Un anello segna ${office}, dove ha sede ITnode.` : '';
-  return `Carta della Puglia con le città di Puglia Digitale. Sono nelle province di ${andList(provinces)}, ${shareOf(mostCount, puglia.length)} in quella di ${PROVINCES[most]}.${among}${ring}`;
+  const ring = office ? ` Un anello segna ${office}, sede di ITnode.` : '';
+  return `Carta della Puglia con le città di Puglia Digitale${where}.${among}${ring}`;
 }
diff --git a/src/pages/puglia-digitale.astro b/src/pages/puglia-digitale.astro
index acdc011..f4afa6e 100644
--- a/src/pages/puglia-digitale.astro
+++ b/src/pages/puglia-digitale.astro
@@ -56,16 +56,18 @@ const photos: Record<string, { image: typeof acquavivaPorta; alt: string; note:
   },
 };
 // The whole coast of Puglia with a dot for every city of Puglia Digitale (visual direction §1.4, §7.5).
-// Text alternative: the provinces, the names drawn on the wide map (north → south) and the office.
-type RegionPlace = { name: string; lat: number; role?: string; anchor: { hero: string } };
+// Text alternative (copywriter-brand, L7): the names drawn at every width, north → south, so that every
+// name said is on the map on a phone too; the office has its own sentence.
+type RegionPlace = { name: string; lat: number; role?: string; anchor: Record<'hero' | 'wide' | 'narrow', string> };
 const region = maps.maps.pugliaRegione;
 const [, , regionW, regionH] = region.viewBox.split(' ').map(Number);
 const regionPlaces = region.places as RegionPlace[];
+const drawnAtEveryWidth = (p: RegionPlace) => (['hero', 'wide', 'narrow'] as const).every((c) => p.anchor[c] && p.anchor[c] !== 'none');
 const mapLabel = describePugliaDigitale(
-  regionPlaces.filter((p) => p.anchor.hero !== 'none').sort((a, b) => b.lat - a.lat).map((p) => p.name),
+  regionPlaces.filter((p) => p.role !== 'sede' && drawnAtEveryWidth(p)).sort((a, b) => b.lat - a.lat).map((p) => p.name),
   regionPlaces.find((p) => p.role === 'sede')?.name,
 );
-// Legend: copywriter-brand writes the final text (brand-strategist §4: the cities of Puglia Digitale).
+// Legend: copywriter-brand, L7 (the form of L1; brand-strategist §4: the cities of Puglia Digitale).
 const legend = 'Ogni punto è una città di\u00a0Puglia\u00a0Digitale';
 
 const locations = pugliaPlaces.map((p) => ({
```

## 3. Verifica sulla staging (commit b113efb)

| Prova | Esito |
|---|---|
| Albero di accessibilità della carta (CDP e snapshot di Playwright), a 320, 390, 699, 700, 1024 e 1440 px | Una sola immagine «Carta della Puglia…» per larghezza: l'altra carta è `display: none`. Nessun testo sotto l'immagine (nomi e mari `aria-hidden`), `<svg>` nascosti, nessun elemento focalizzabile nella figura. Dopo l'immagine, la legenda |
| Ordine di lettura della hero | H1 «Puglia Digitale – Una piattaforma interattiva immersiva per la valorizzazione territoriale.» → «Visita il portale Puglia Digitale (si apre in una nuova scheda)» → «Aderisci a Puglia Digitale» → carta → legenda → H2 «Dalla costa all’entroterra…», uguale a ogni larghezza. La carta segue la hero, come a schermo |
| Colori forzati, Appendice D.1: 8 pagine, a 390 e 1440 px, staging e «in pubblicazione» | Ogni fermata del Tab ha il suo contorno. Nessun segno sparisce, salvo il residuo accettato `a::after` (sottolineatura al passaggio del mouse dell'header) |
| Colori forzati, Appendice D.2 | Nessun gradiente perso né contorno trasparente dipinto su `/puglia-digitale/` e sulla 404. Altrove solo i residui accettati di CF2 |
| Carta nei colori forzati, palette chiara e scura, a 390 e 1440 px | 31 segni su 31 in `CanvasText` (nessuno nel colore della tela), anello della sede e richiamo visibili, nomi dei mari leggibili, costa continua |
| Porte di «I luoghi» con le foto, nei colori forzati | Le foto restano. La nota «Immagine elaborata digitalmente» sta sotto la foto, nel colore del testo del tema, leggibile. Nomi, righe ed «Esplora» visibili. I fili delle porte restano (6 bis) |
| Porte, ordine di lettura | In ogni voce della lista: immagine con il testo alternativo → nota → nome (H3) → riga → «Esplora…». Il Tab passa solo per i tre «Esplora», da ovest a est |
| axe-core 4.13 sulla copia con L7: `/puglia-digitale/`, Home e `/citta-digitali/`, a 390 e 1440 px, con menu aperto e form inviato vuoto | 0 violazioni in 13 esecuzioni |

**Ordine «immagine → nota → nome» nelle porte: va bene.** Chi naviga per titoli arriva sul nome dopo la foto, ma la voce della lista tiene insieme foto, nota, nome ed «Esplora» (1.3.1), e l'ordine coincide con quello visivo (1.3.2). La nota sta nella `<figcaption>` della foto, quindi resta legata all'immagine che qualifica.

## Verdetto di dominio (accessibilità)
**La carta della Puglia intera è conforme a WCAG 2.2 AA, e anche ai colori forzati.**
- La descrizione di oggi, 379 caratteri, è un'alternativa equivalente e non viola alcun criterio, ma è lunga e ha i due difetti di §1. La sostituisce L7 con lo snippet di §2: non è bloccante, ma va fatto prima del go-live.
- Il verdetto di gate spetta al creative-director.

## Ipotesi da validare
- **Screen reader reali** (NVDA, VoiceOver): la descrizione si legge per intero come nome dell'immagine, seguita dalla legenda. `[DA FORNIRE: dispositivi o servizio di test]`
- **Windows con un tema a contrasto reale**: qui i colori forzati sono solo emulati. `[DA FORNIRE]`
- I nomi della carta oltre Acquaviva, Gravina, Monopoli, Altamura e Cassano restano `[DA VERIFICARE]` per la grafia (proposta di ui-designer). La descrizione li segue: al go-live senza il testo della pagina restano Monopoli e Gravina in Puglia.

## Domande aperte
- **creative-director:** l'ordine dei nomi e la carta (P1–P5) restano alla sua decisione. La descrizione segue i dati, qualunque sia la scelta.

## Decisioni richieste
- **Sessione principale:** applicare lo snippet di §2 (due file), poi la build. Nessun'altra correzione.
