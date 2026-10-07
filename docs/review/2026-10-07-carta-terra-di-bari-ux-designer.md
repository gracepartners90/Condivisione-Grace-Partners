---
titolo: Carta della Terra di Bari nel capitolo 02 della Home · decorativa o con descrizione
owner: ux-designer
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-07
fonti: [segnalazione di copywriter-brand del 2026-10-07 (proposte a e b, riferite dalla sessione principale), src/pages/index.astro (capitolo 02), src/components/ui/MapItaly.astro, src/data/site.ts (pugliaPlaces), src/lib/citta-digitali.ts, docs/ux/accessibilita.md (0.9, §2.8), docs/ux/struttura-pagine.md (0.9, HM-5), docs/creativa/direzione-visiva.md (§1.4), docs/review/2026-10-06-carta-puglia-intera-ux-designer.md (L7), staging http://127.0.0.1:4321, copia del repository a f3c6698 con lo snippet (build in locale), albero di accessibilità via CDP (Chromium 141) e axe-core 4.13 del 2026-10-07]
oggetto: alternativa testuale della carta del capitolo 02 della Home nel caso «P4 no»
---

# Carta della Terra di Bari nel capitolo 02 della Home

## In sintesi
- **Decisione, per il caso «P4 no»: la carta diventa un'immagine con una descrizione.** È la proposta (a) di copywriter-brand, con il testo suo, 114 caratteri:
  > Carta della Terra di Bari con Gravina in Puglia e Monopoli. Un anello segna Acquaviva delle Fonti, sede di ITnode.
- **Snippet provato su una copia di f3c6698** (§3): `describeTerraDiBari` in `src/lib/citta-digitali.ts` e `label` sulla `MapItaly` del capitolo 02. Cambiano solo gli attributi della carta; a schermo nulla.
- **Se l'utente approva P4**, la carta del capitolo 02 diventa la Puglia intera con la descrizione L7, e lo snippet non serve.

## 1. La segnalazione
### [IMPORTANTE] La carta del capitolo 02 è `aria-hidden`, ma il testo accanto non nomina i suoi luoghi
- **Dove.** `src/pages/index.astro`, capitolo 02: `<MapItaly map="puglia" places={pugliaPlaces} home="acquaviva" compact …>`.
- **Problema.** La carta disegna, a ogni larghezza misurata (320, 390, 1024 e 1440 px):
  - Acquaviva delle Fonti, con l'anello della sede;
  - Gravina in Puglia e Monopoli;
  - «Mare Adriatico» e «Murgia».

  Il capitolo invece dice solo «Un territorio. Migliaia di storie.» e «Un progetto di destination marketing che digitalizza città, borghi e imprese della Puglia. E li valorizza con esperienze immersive.» Chi vede legge tre nomi di luogo e il segno della sede; chi usa lo screen reader non riceve nulla.
- **Motivazione.** WCAG 1.1.1 e 1.3.1. La regola di `accessibilita.md` §2.8 dice che una carta è decorativa solo se i suoi luoghi sono già scritti nel testo accanto. Qui la premessa non vale: il testo non li nomina, e i luoghi compaiono solo nella pagina di Puglia Digitale, a un clic di distanza. Avevo dato la carta per decorativa, nel documento e nella direzione visiva, senza ricontrollare il testo: la correzione è mia.

## 2. Scelta tra le due proposte
- **(a) Descrizione: sì.**
  - Non tocca la microdescrizione approvata.
  - Segue lo schema delle altre carte: la L7 di `/puglia-digitale/`, con i nomi disegnati e una frase a parte per la sede.
  - Il testo di copywriter-brand dice esattamente ciò che la carta disegna. I nomi sono in ordine da ovest a est, come si legge la striscia di costa; la sede ha la sua frase e non si ripete. I nomi delle aree sono riassunti in «Terra di Bari».
  - 114 caratteri, ben sotto il tetto di 250.
- **(b) Nomi nel testo: no.** Cambierebbe una microdescrizione approvata, per un effetto che la descrizione ottiene senza cambiare nulla di visibile.

## 3. Snippet

Base: commit f3c6698. Sulla copia:
- `astro check` dà 0 errori;
- la descrizione è il testo di copywriter-brand, carattere per carattere;
- rispetto alla build della stessa base, nella Home cambiano solo gli attributi della carta (`role="img"` e `aria-label` al posto di `aria-hidden`), e le altre pagine sono identiche byte per byte.

Copia della patch: `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ux-tdb/tdb.patch`.

```diff
diff --git a/src/lib/citta-digitali.ts b/src/lib/citta-digitali.ts
index 63f3e55..1ab398a 100644
--- a/src/lib/citta-digitali.ts
+++ b/src/lib/citta-digitali.ts
@@ -56,3 +56,16 @@ export function describePugliaDigitale(names: string[] = [], office?: string): s
   const ring = office ? ` Un anello segna ${office}, sede di ITnode.` : '';
   return `Carta della Puglia con le città di Puglia Digitale${where}.${among}${ring}`;
 }
+
+/**
+ * Text alternative of the map of the Terra di Bari (Home chapter 02): the text beside it names no
+ * place, so the map is an image. The places it names, west → east as the strip reads, without the
+ * office, then the office with its ring: the schema of L7 (copywriter-brand; ux-designer, 2026-10-07).
+ */
+export function describeTerraDiBari(places: { id: string; name: string; lon: number }[], office?: string): string {
+  const names = places.filter((p) => p.id !== office).sort((a, b) => a.lon - b.lon).map((p) => p.name);
+  const home = places.find((p) => p.id === office)?.name;
+  const among = names.length ? ` con ${andList(names)}` : '';
+  const ring = home ? ` Un anello segna ${home}, sede di ITnode.` : '';
+  return `Carta della Terra di Bari${among}.${ring}`;
+}
diff --git a/src/pages/index.astro b/src/pages/index.astro
index 0ad85df..b75f620 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -22,7 +22,7 @@ import { pageGraph, person, ids } from '../lib/structured-data';
 import eventoPanorama from '../assets/images/derivate/evento-panorama.jpg';
 import eventoCitta from '../assets/images/derivate/evento-citta.jpg';
 import maps from '../data/maps.json';
-import { describeCittaDigitali } from '../lib/citta-digitali';
+import { describeCittaDigitali, describeTerraDiBari } from '../lib/citta-digitali';
 
 const places = horizonPlaces.map((p) => ({ id: p.id, name: p.name, bearing: bearing(office, p), km: distanceKm(office, p) }));
 const schema = pageGraph('home', [person()], { about: ids.organization });
@@ -34,6 +34,8 @@ const drawnAtEveryWidth = (p: { anchor?: { wide?: string; narrow?: string } }) =
 const mapLabel = describeCittaDigitali(
   [...maps.maps.italia.places].filter(drawnAtEveryWidth).sort((a, b) => b.lat - a.lat).map((p) => p.name),
 );
+// Text alternative of the chapter 02 map: the chapter text names none of its places (ux-designer, 2026-10-07).
+const pugliaLabel = describeTerraDiBari(pugliaPlaces, 'acquaviva');
 ---
 
 <BaseLayout page="home" schema={schema}>
@@ -138,7 +140,7 @@ const mapLabel = describeCittaDigitali(
         text="Un progetto di destination marketing che digitalizza città, borghi e imprese della Puglia. E li valorizza con esperienze immersive."
         cta={{ label: 'Scopri Puglia Digitale', href: '/puglia-digitale/', id: 'home-capitolo-puglia-digitale' }}
       >
-        <MapItaly slot="visual" map="puglia" places={pugliaPlaces} home="acquaviva" compact class="worlds__map worlds__map--puglia" />
+        <MapItaly slot="visual" map="puglia" places={pugliaPlaces} home="acquaviva" compact label={pugliaLabel} class="worlds__map worlds__map--puglia" />
       </ProjectShowcase>
 
       <ProjectShowcase
```

- La funzione costruisce la descrizione dagli stessi dati della carta (`pugliaPlaces`): se cambiano luoghi o nomi, la descrizione li segue.
- Se passa P4, la funzione e il `label` si tolgono insieme alla vecchia carta.

## 4. Prove sulla copia

| Prova | Esito |
|---|---|
| Albero di accessibilità del capitolo 02 (CDP, 390 e 1440 px) | H3 «Puglia Digitale» → statement → immagine con la descrizione → testo → «Scopri Puglia Digitale». Nessun testo sotto l'immagine: nomi e aree sono già `aria-hidden` |
| Elementi focalizzabili nella carta | Nessuno. Il capitolo resta con una sola CTA (HM-5) |
| axe-core 4.13, Home, a 390 e 1440 px, con menu aperto | 0 violazioni |
| A schermo | Nessun cambiamento: cambiano solo attributi |

## Verdetto di dominio (accessibilità)
**Oggi, nel caso «P4 no», la carta del capitolo 02 non rispetta 1.1.1 e 1.3.1: i nomi che disegna arrivano solo a chi vede. Con lo snippet di §3 è conforme.** È una correzione da fare prima del go-live, se P4 non passa. Il verdetto di gate spetta al creative-director.

## Ipotesi da validare
- Screen reader reali (NVDA, VoiceOver): la descrizione si legge come nome dell'immagine, come per le altre carte. `[DA FORNIRE: dispositivi o servizio di test]`

## Domande aperte
- **creative-director:** allineare la direzione visiva §1.4. La frase per cui la carta della Puglia è decorativa perché «i suoi luoghi sono nominati dal testo accanto» non vale per il capitolo 02 della Home.
- **Utente:** P4 è ancora aperta. Se passa, questa decisione decade.

## Decisioni richieste
- **Sessione principale:** se P4 non passa, applicare lo snippet di §3 e ricostruire. Se passa, applicare la patch 6 v3 di ui-designer: la descrizione L7 arriva con lei.
