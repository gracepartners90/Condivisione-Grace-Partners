---
titolo: Regola 11 · verifica di fedeltà sulla build (R1, R2, R3)
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-10-06
fonti: [docs/review/2026-10-06-regola-11-carte-ui-designer.md (R1–R3, patch 6 v2), docs/creativa/direzione-visiva.md (0.12: §1.4, regole 8 e 11), docs/review/2026-10-06-descrizione-carta-home-ux-designer.md, docs/ux/accessibilita.md (0.8), commit 3edfc79 e 4b90180, staging http://localhost:4321 (build di 3edfc79), variante «in pubblicazione» http://localhost:4322, build con la descrizione B (scratchpad/dist-b), build di prova con la patch 6 v3 (copia nello scratchpad, non versionata), misure Playwright 1.56 (Chromium 141) e axe-core 4.13 del 2026-10-06]
---

# Regola 11 · verifica di fedeltà sulla build (R1, R2, R3)

**Richiesta** (sessione principale, 2026-10-06). R1, R2 e R3 sono applicati nel commit 3edfc79 (direzione visiva 0.12). Mi si chiede di:
1. rimisurare la regola 11 sulla build in due punti:
   - la carta del capitolo 03 della Home da 320 a 1440 px, con le carte di 280, 400 e 480 px come larghezze critiche;
   - la carta compatta del capitolo 02, senza coordinate, tra 400 e 480 px di carta;
   - in tutte e due le build, staging e «in pubblicazione»;
2. chiudere il design system alla versione 0.9;
3. scrivere qui l'esito.

**Aggiornamento in corso d'opera.** ux-designer ha scelto la descrizione B per la carta del capitolo 03 (commit 4b90180): solo i nomi disegnati a ogni larghezza.

## In sintesi

- **Conforme: la build corrisponde alla proposta.**
  - `scripts/generate-maps.mjs`, `src/data/citta-digitali.json` e `src/components/ui/MapItaly.astro` sono identici byte per byte ai file che avevo provato.
  - `src/data/maps.json` ha sha256 `a0279e6849468dce4fcf4222c33e4a3fd988ee564618fafbc5fe89e44db75090`.
  - Le 8 pagine dello staging hanno lo stesso HTML, byte per byte, della build di prova con R1, R2 e R3.
  - Nella variante «in pubblicazione» le due carte della Home hanno lo stesso markup dello staging.
- **Capitolo 03, carta d'Italia.**
  - Nessun nome e nessun richiamo a meno di 6 px dal nodo di un'altra città nominata, in 225 finestre da 320 a 1440 px, con e senza la spaziatura di WCAG 1.4.12, in tutte e due le build.
  - Minimo dal bordo dell'anello, cioè la misura del generatore: 8,4 px (7,2 con 1.4.12).
  - Minimo dal bordo dipinto del nodo, la misura del creative-director: 9,6 px (8,4).
  - Nessuna sovrapposizione. I nomi sono quelli della proposta: 5 sulle carte strette, 7 sulle larghe.
- **Capitolo 02, carta della Terra di Bari senza coordinate.**
  - Tra 400 e 480 px di carta: 286 finestre, nessun problema. Minimo 19,2 px dal bordo dipinto (17,7 dall'anello).
  - Su tutte le 321 finestre, da 320 a 1920 px: nessun problema e nessuna coordinata visibile, con e senza 1.4.12.
- **Descrizione del capitolo 03 (scelta B di ux-designer, 4b90180):** 199 caratteri, 5 nomi. A schermo non cambia nulla: tra lo staging e la build con B cambia solo l'`aria-label`.
- **Scarto trovato: nessuno nella build. La patch 6 (P4) però va rifatta.**
  - Con 4b90180 la v2 non si applica più: il contesto di `index.astro` è cambiato.
  - Così com'è, la v2 dichiarerebbe una seconda volta `drawnAtEveryWidth`, che ora esiste già.
  - Pronta la **patch 6 v3**, che riusa la funzione di ux-designer. Provata su 4b90180 (§4).

## 1. Che cosa è applicato

| Controllo | Esito |
|---|---|
| File applicati e file provati | Identici byte per byte: generatore, dati, `MapItaly.astro` con R3 |
| `src/data/maps.json` | sha256 `a0279e68…5090`, quello atteso |
| Staging (4321) e build di prova R1+R2+R3 | Stesso HTML, byte per byte, per tutte le 8 pagine |
| Variante «in pubblicazione» (4322) | Le due carte della Home hanno lo stesso markup dello staging |
| Build con la descrizione B (`dist-b`) | Rispetto allo staging cambia solo l'`aria-label` della carta del capitolo 03; le altre pagine sono identiche |

## 2. Capitolo 03: la carta d'Italia

**Come.** Finestre da 320 a 1440 px ogni 5, cioè 225 per build, per tutte e due le build. Si misura con la spaziatura normale e con quella di 1.4.12.
- **Regola 11:** distanza tra il nome (testo) o il richiamo e il nodo di ogni altra città nominata nella stessa larghezza. Due misure:
  - dal bordo dell'anello di ritaglio, raggio 6,5 px, come il generatore;
  - dal bordo dipinto, raggio 5 px, come il creative-director.
- **Sovrapposizioni:** nomi e richiami contro punti, nodi, altri nomi e bordo della carta.

| Carta | Finestre | Nomi | Minimo dall'anello | Con 1.4.12 | Coppia |
|---|---|---|---|---|---|
| 280–300 px (critica: 280) | 320–340 | 5 | 8,4 px | 7,2 | Altamura (appeso) → Cosenza, a 280 |
| 300–380 px | 340–420 | 5 | 11,6 | 10,4 | Altamura → Cosenza |
| 380–400 px (critica: sotto 400) | 420–440, 1025–1070 | 5 | 24,7 | 23,5 | Altamura → Cosenza |
| 400–420 px (critica: sopra 400) | 445–465, 1075–1115 | 7 | 16,4 | 16,4 | Altamura → Bari |
| 420–460 px | 465–505, 1115–1225 | 7 | 17,2 | 17,2 | Altamura → Bari |
| 460–480 px (critica: 480) | 510–1020, 1230–1440 | 7 | 19,0 | 19,0 | Altamura → Bari |

- **Esito**, identico nelle due build:
  - nessuna distanza sotto i 6 px e nessuna sovrapposizione;
  - minimo assoluto 8,4 px dall'anello (7,2 con 1.4.12), 9,6 px dal bordo dipinto (8,4);
  - i numeri della proposta: 8,4 e 7,2 in pagina, 6,7 nel generatore, che misura il caso peggiore.
- **Nomi**, come nella proposta:
  - carte strette (280–399,7 px): Varese, Itri, Altamura, Cosenza, Caltanissetta;
  - carte larghe (401,6–480 px): in più Bari e Caltagirone;
  - Manfredonia e Massafra sono punti.

## 3. Capitolo 02: la carta della Terra di Bari senza coordinate

**Come.** Finestre da 320 a 1920 px ogni 5, cioè 321 per build. Si misura sul testo (rettangoli di Range), con le due misure dei nodi (anello della sede: 13 px dipinto, 13,5 nel generatore), con e senza 1.4.12. Si controlla anche che nessuna coordinata sia visibile.

| Ambito | Finestre | Problemi | Minimo dal bordo dipinto | Dall'anello |
|---|---|---|---|---|
| Carte di 400–480 px | 286 | 0 | 19,2 px (Acquaviva → Monopoli, a 1075) | 17,7 |
| Le stesse, con 1.4.12 | 286 | 0 | 36,9 px (Gravina → Acquaviva) | 36,4 |
| Tutte, 320–1920 px | 321 | 0 | 9,3 px (a 280 di carta) | 7,8 |
| Tutte, con 1.4.12 | 321 | 0 | 11,1 px | 10,6 |

- **Esito:** identico nelle due build. Nessuna coordinata visibile a nessuna larghezza. Il `[BLOCCANTE]` della review R1–R3 è chiuso: oggi le coordinate di Monopoli sull'anello della sede non ci sono più, in nessuna delle 214 finestre in cui stavano.
- **Immagini:**
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-apart/verify-build/staging-cap02-1075.png`
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-apart/verify-build/staging-cap02-460.png`

## 4. Patch 6 v3 (P4), allineata a 4b90180

- **Perché una v3.**
  - 4b90180 ha riscritto in `index.astro` le righe che la v2 usa come contesto. Oggi la v2 non si applica: `git apply` si ferma su `src/pages/index.astro:15`.
  - La v2 dichiarerebbe anche una seconda `drawnAtEveryWidth`.
- **Che cosa fa la v3.** Le stesse modifiche della v2 per il capitolo 02, ma la descrizione usa la funzione `drawnAtEveryWidth` di ux-designer, la stessa del capitolo 03. Per le due carte della Home c'è così una regola sola, i nomi disegnati a ogni larghezza.
- **Prove** sulla build di 4b90180 con la v3:
  - `astro check` 0 errori e 0 avvisi;
  - capitolo 02 senza sovrapposizioni in 321 finestre, con e senza 1.4.12; regola 11 con minimo 13,9 px (7,6 con 1.4.12);
  - axe 0 violazioni;
  - le altre pagine identiche alla build `dist-b`.
- **Descrizioni della Home con la v3:**
  - capitolo 02: «Carta della Puglia con le città di Puglia Digitale, più numerose nella provincia di Bari. Tra queste: Manfredonia, Barletta, Bari, Monopoli, Gravina in Puglia e Nardò. Un anello segna Acquaviva delle Fonti, sede di ITnode.» (222 caratteri, identica a `/puglia-digitale/`);
  - capitolo 03: la B (199 caratteri).
- **Peso:** Home 28,7 KB gzip su 40 con la v3, 27,3 KB senza. Qui KB vale 1024 byte, come in `budget.md`; le review precedenti del 2026-10-06 davano i pesi in migliaia di byte (29,4 e 27,9), quindi i margini veri sono un poco più ampi.
- **Copia:** `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-apart/diff/6-v3-home-capitolo-02.patch`. La v2 è superata.

```diff
diff --git a/src/pages/index.astro b/src/pages/index.astro
index 9e6bae7..1d45f10 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -15,14 +15,14 @@ import CTASection from '../components/sections/CTASection.astro';
 import Media from '../components/ui/Media.astro';
 import MapItaly from '../components/ui/MapItaly.astro';
 import Node from '../components/ui/Node.astro';
-import { horizonPlaces, pugliaPlaces, office, founder } from '../data/site';
+import { horizonPlaces, office, founder } from '../data/site';
 import { founderPortrait, eventPhotoNote } from '../data/media';
 import { bearing, distanceKm, formatCoords } from '../lib/geo';
 import { pageGraph, person, ids } from '../lib/structured-data';
 import eventoPanorama from '../assets/images/derivate/evento-panorama.jpg';
 import eventoCitta from '../assets/images/derivate/evento-citta.jpg';
 import maps from '../data/maps.json';
-import { describeCittaDigitali } from '../lib/citta-digitali';
+import { describeCittaDigitali, describePugliaDigitale } from '../lib/citta-digitali';
 
 const places = horizonPlaces.map((p) => ({ id: p.id, name: p.name, bearing: bearing(office, p), km: distanceKm(office, p) }));
 const schema = pageGraph('home', [person()], { about: ids.organization });
@@ -34,6 +34,15 @@ const drawnAtEveryWidth = (p: { anchor?: { wide?: string; narrow?: string } }) =
 const mapLabel = describeCittaDigitali(
   [...maps.maps.italia.places].filter(drawnAtEveryWidth).sort((a, b) => b.lat - a.lat).map((p) => p.name),
 );
+// Chapter 02: the whole of Puglia with the cities of Puglia Digitale, as on /puglia-digitale/ (compact map).
+// Same rule for its text alternative (copywriter-brand, L7): the names drawn at every width, north → south,
+// without the office, which has its own sentence.
+type RegionPlace = { name: string; lat: number; role?: string; anchor: Record<'wide' | 'narrow', string> };
+const regionPlaces = maps.maps.pugliaRegione.places as RegionPlace[];
+const pugliaLabel = describePugliaDigitale(
+  regionPlaces.filter((p) => p.role !== 'sede' && drawnAtEveryWidth(p)).sort((a, b) => b.lat - a.lat).map((p) => p.name),
+  regionPlaces.find((p) => p.role === 'sede')?.name,
+);
 ---
 
 <BaseLayout page="home" schema={schema}>
@@ -138,7 +147,10 @@ const mapLabel = describeCittaDigitali(
         text="Un progetto di destination marketing che digitalizza città, borghi e imprese della Puglia. E li valorizza con esperienze immersive."
         cta={{ label: 'Scopri Puglia Digitale', href: '/puglia-digitale/', id: 'home-capitolo-puglia-digitale' }}
       >
-        <MapItaly slot="visual" map="puglia" places={pugliaPlaces} home="acquaviva" compact class="worlds__map worlds__map--puglia" />
+        <figure slot="visual" class="worlds__atlas">
+          <MapItaly map="pugliaRegione" cities home="acquaviva" label={pugliaLabel} class="worlds__map" />
+          <figcaption class="worlds__atlas-note t-label">Ogni punto è una città di&nbsp;Puglia&nbsp;Digitale</figcaption>
+        </figure>
       </ProjectShowcase>
 
       <ProjectShowcase
```

## Verdetto di dominio (UI)

**Conforme.**
- R1, R2 e R3 sono applicati come provati.
- La regola 11 è rispettata su tutte le carte con nomi della Home, in tutte e due le build.
- Il `[BLOCCANTE]` della carta della Terra di Bari è chiuso.
- La patch 6 per P4 è aggiornata alla v3, pronta per il sì dell'utente.

## Ipotesi da validare

- **Browser.** Misure in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`, come per le altre carte.

## Domande aperte

- **Utente:** P4, con la patch 6 v3.

## Decisioni richieste

- **Sessione principale:** se l'utente approva P4, applicare la patch 6 v3, non la v2.
