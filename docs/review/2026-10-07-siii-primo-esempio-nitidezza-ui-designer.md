---
titolo: /siii/, primo esempio · nitidezza sugli schermi retina larghi (S3)
owner: ui-designer
contributi: []
stato: bozza
versione: 0.2
aggiornato: 2026-10-07
fonti: [docs/review/2026-10-07-schermate-siii-p4-verdetto-creative-director.md (S3), docs/review/2026-10-07-schermate-siii-web-performance-specialist.md (§8: decisione (b) e requisiti), repository al commit 52d3213, docs/review/2026-10-07-schermate-siii-web-performance-specialist.md (osservazione 1), docs/performance/budget.md (0.6: §4, controllo n. 8), astro.config.mjs (qualità AVIF 50, WebP 75, JPEG 75 mozjpeg), src/assets/images/siii-masseria-santella-desktop-ingresso.jpg (2000 × 1250), build di f28649a (scratchpad/dist-link, http://127.0.0.1:4360; 83d3a3f cambia solo documenti), build di prova con la patch (copia nello scratchpad, non versionata), misure Playwright 1.56 (Chromium 141) e sharp del 2026-10-07]
---

# /siii/, primo esempio · nitidezza sugli schermi retina larghi (S3)

**Richiesta** (sessione principale, 2026-10-07): la verifica S3 del verdetto del creative-director.
- **Il caso.** Dopo il limite a 1440 px (d3eba9c), bisogna controllare la nitidezza del primo esempio di `/siii/` sugli schermi retina larghi. La sorgente è di 2000 × 1250 px.
- **Il vincolo.** Il controllo n. 8 vieta i file WebP o AVIF sopra i 200 KB e i JPEG sopra i 300 KB.
- **La consegna.** Se propongo un compromesso, devo provarlo e dare la patch. Il limite resta di web-performance-specialist, a cui rivolgo le domande del §5.

**Aggiornamento, versione 0.2.** web-performance-specialist ha scelto la strada (b): una sorgente AVIF solo per gli schermi da 1,5 dppx in su (review di performance §8). Patch e prove sono nel §6. La patch `avifWidths` del §4 è superata e non va applicata.

## In sintesi

- **Sugli schermi 1x nessun problema.** La variante da 1440 px copre i 1188–1488 px della schermata resa, con 0,97–1,21 pixel dell'immagine per pixel.
- **Sugli schermi 2x la differenza si vede, nei dettagli fini.**
  - La variante da 1440 px dà 0,48–0,61 pixel dell'immagine per pixel del dispositivo: il browser la ingrandisce da 1,6 a 2,1 volte.
  - Nei contorni resta il 63–78% dell'energia della sorgente intera, contro il 93–96% della variante da 1920 px.
  - Si vede nella scritta del logo, nelle icone del menu, nelle sbarre del cancello e nel cartello; nel fogliame poco (§2, immagini).
  - Il «1,08x» della review di performance è la densità per pixel CSS. Su uno schermo 2x vuol dire 0,54 pixel dell'immagine per pixel del dispositivo.
- **Una variante da 1600 o 1800 px in tutti i formati non sta nei limiti.**
  - In WebP pesa 223 e 264 KB, oltre i 200.
  - Il JPEG starebbe nei limiti fino a 1800 px (284 KB).
  - L'AVIF resta sotto i 200 KB fino alla sorgente intera: 193 KB a 2000 px.
- **Prima proposta, strada (a): varianti in più solo in AVIF** (§4, superata). L'AVIF del primo esempio arrivava a 1920 px per tutti, con una variante da 1600 anche per gli schermi 1x larghi (+18,5 KB).
- **Strada scelta da web-performance-specialist: la (b)** (review di performance §8). Una sorgente AVIF solo per gli schermi da 1,5 dppx in su, con tutte le larghezze fino a 1920 px. Patch e prove nel §6:
  - sugli schermi 2x di desktop e tablet si scarica la variante da 1920 px (173,7 KB invece di 116,9);
  - schermi 1x e telefoni ricevono gli stessi file di oggi;
  - AVIF normale, WebP e JPEG restano fermi a 1440 px, e il controllo n. 8 resta vuoto;
  - tutto il resto del sito ha lo stesso HTML byte per byte, compresa la hero di `/siii/`.
- **L'obiettivo del §4 del budget** (150 KB per un AVIF a tutta larghezza a 1920 px; qui 173,7) è superato con la motivazione di web-performance-specialist: immagine `lazy` sotto la piega, solo sugli schermi 2x. Il risultato visivo resta del creative-director, se lo vuole vedere.
- **Immagini:**
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-s3/s3-confronto-1440x2.png`: logo e cancello a 1440 × 900 px a 2×, in pixel del dispositivo; a sinistra la variante da 1440 px, a destra quella da 1920;
  - `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-s3/zoom-script-1440-vs-1920.png`: la scritta del logo ingrandita 3 volte; sopra 1440, sotto 1920.

## 1. Quale variante riceve chi

| Finestra | Schermata resa | Oggi (max 1440w) | Con la strada (b), §6 |
|---|---|---|---|
| 1280 × 800, 1× | 1188 px | 1440w, 1,21 | invariato |
| 1440 × 900, 1× | 1339 px | 1440w, 1,08 | invariato |
| da 1600 px, 1× | 1488 px | 1440w, 0,97 | invariato |
| 1280 × 800, 2× | 2376 px del dispositivo | 1440w, 0,61 | 1920w, 0,81 |
| 1440 × 900, 2× | 2678 | 1440w, 0,54 | 1920w, 0,72 |
| 1512 × 982, 2× | 2813 | 1440w, 0,51 | 1920w, 0,68 |
| 1728 e 1920, 2× | 2976 | 1440w, 0,48 | 1920w, 0,65 |

- I numeri sono i pixel dell'immagine per pixel del dispositivo. Il browser sceglie l'AVIF in tutti i casi provati (Chromium).
- Tutte le righe sono provate sulla build con la patch del §6.
- Con la strada (a) del §4, superata, le finestre 1x da 1600 px in su avrebbero ricevuto la variante da 1600 px (1,08).

## 2. Nitidezza

**Come.**
- La schermata è resa a 1440 × 900 e a 1728 × 1117 px a 2×, una volta per ciascuna variante AVIF: 1440, 1600, 1800, 1920 e 2000 px, cioè la sorgente intera.
- Le varianti hanno le impostazioni del progetto e sono identiche byte per byte a quelle che produce Astro.
- Si fotografano quattro zone in pixel del dispositivo: logo, menu, cancello, fogliame.
- Si misurano l'energia dei contorni (Tenengrad, gradiente di Sobel) e il PSNR rispetto alla resa della sorgente intera.

| Zona (1440 × 900, 2×) | 1440w | 1600w | 1800w | 1920w |
|---|---|---|---|---|
| Logo con la scritta | 66% | 74% | 88% | 93% |
| Menu | 70% | 75% | 87% | 94% |
| Cancello e cartello | 71% | 80% | 89% | 95% |
| Fogliame | 78% | 84% | 92% | 96% |

- A 1728 × 1117 i valori sono quasi gli stessi: con 1440w dal 63% al 76%, con 1920w dal 93% al 96%.
- **A occhio** (immagini):
  - con 1440w la scritta «Masseria Santella» e le icone hanno tratti più spessi e impastati;
  - le sbarre del cancello e il cartello perdono definizione;
  - con 1920w si leggono quasi come nella sorgente.
- La vista «piccolo pianeta» è morbida per la proiezione nel fogliame, dove infatti la differenza pesa meno; non lo è nell'interfaccia sovrapposta.

## 3. Pesi e controllo n. 8

Impostazioni del progetto (`astro.config.mjs`). KB da 1024 byte, come in `budget.md`.

| Larghezza | AVIF | WebP | JPEG |
|---|---|---|---|
| 1440 (oggi il massimo) | 116,9 | 192,6 | 200,9 |
| 1600 | 135,4 | 223,3 oltre | 236,9 |
| 1800 | 159,3 | 263,5 oltre | 284,3 |
| 1920 | 173,7 | 284,3 oltre | 313,2 oltre |
| 2000 (sorgente) | 193,2 | 306,6 oltre | 348,6 oltre |

- **Variante uniforme a 1600 o 1800 px: non sta nei limiti**, per colpa del WebP.
- **Solo AVIF: sta nei limiti** fino a 2000 px. Propongo 1920, che dà il 93–96% della sorgente con 26 KB di margine sul limite; a 2000 px il margine sarebbe di 7 KB.

## 4. Proposta e patch (superata dal §6)

> Questa è la strada (a). web-performance-specialist ha scelto la (b): vale la patch del §6.

- **`Media.astro`, nuova prop `avifWidths`:** larghezze in più solo in AVIF, oltre `widths`. Con questa prop `Media` costruisce le sorgenti da sé, come già fa per `mobileCrop`:
  - AVIF con `widths` più `avifWidths`;
  - WebP e JPEG con le sole `widths`.

  I browser senza AVIF si fermano a 1440 px.
- **`siii.astro`:** `avifWidths={i === 0 ? [1600, 1920] : undefined}` sul primo esempio.
  - Il 1600 serve agli schermi 1x da 1600 px in su: senza, sceglierebbero il 1920 (+56,8 KB) invece di ingrandire del 3% il 1440.
- **Effetti:**
  - schermi 2x: +56,8 KB in AVIF, su un'immagine sotto la piega e in `lazy`, che non entra nell'LCP né nel peso al caricamento;
  - schermi 1x da 1600 px: +18,5 KB;
  - tutti gli altri: nulla.
- **Prove** sulla build di f28649a con la patch:
  - `astro check` 0 errori, 0 avvisi;
  - controllo n. 8 (comando del §6.3 di `budget.md`) vuoto;
  - le altre 7 pagine identiche byte per byte;
  - su `/siii/` cambia solo il `<picture>` del primo esempio. La hero, che passa dallo stesso codice di `Media`, ha lo stesso HTML;
  - l'`<img>` ha gli stessi attributi di prima, in un altro ordine;
  - candidati scelti come nel §1.
- **`git apply --check`** sul repository ai commit f28649a e 83d3a3f, che ha lo stesso `src/`: passa.
- **Copia:** `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-s3/diff/siii-esempio-avif-retina.patch`.

```diff
diff --git a/src/components/ui/Media.astro b/src/components/ui/Media.astro
index 6a03b35..2027046 100644
--- a/src/components/ui/Media.astro
+++ b/src/components/ui/Media.astro
@@ -33,6 +33,12 @@ interface Props {
    * pixels they show, not a taller image that object-fit crops (docs/performance/budget.md §4).
    */
   mobileCrop?: { ratio: number; widths?: number[]; position?: string };
+  /**
+   * Extra widths in AVIF only, beyond `widths`: sharper on 2x screens for a detailed image whose WebP
+   * and JPEG at those widths would break the per-file limits of docs/performance/budget.md (check 8).
+   * Browsers without AVIF stop at `widths`.
+   */
+  avifWidths?: number[];
   class?: string;
 }
 
@@ -47,6 +53,7 @@ const {
   position = '50% 50%',
   pendingText = true,
   mobileCrop,
+  avifWidths,
   class: className,
 } = Astro.props;
 
@@ -59,24 +66,29 @@ const usableWidths = image
   ? [...new Set([...widths.filter((w) => w < image.width), Math.min(image.width, Math.max(...widths))])]
   : [];
 
-// Art direction (mobileCrop): mobile sources cropped by sharp (fit cover), then the full image.
+// AVIF may go further than the other formats (avifWidths), never beyond the source.
+const avifUsableWidths =
+  image && avifWidths ? [...new Set([...usableWidths, ...avifWidths.filter((w) => w <= image.width)])].sort((a, b) => a - b) : usableWidths;
+
+// Sources built here instead of <Picture> when a format or a viewport needs its own widths:
+// art direction (mobileCrop: mobile sources cropped by sharp, fit cover) and/or AVIF-only widths.
 const MOBILE_MEDIA = '(max-width: 63.99em)';
 const art =
-  image && mobileCrop
+  image && (mobileCrop || avifWidths)
     ? await (async () => {
-        const mWidths = [...new Set((mobileCrop.widths ?? [480, 640, 768]).filter((w) => w <= image.width))];
-        const mWidth = Math.max(...mWidths);
-        const mHeight = Math.round(mWidth / mobileCrop.ratio);
-        const crop = { src: image, width: mWidth, height: mHeight, widths: mWidths, fit: 'cover' as const, position: mobileCrop.position ?? 'centre' };
         const full = { src: image, widths: usableWidths };
-        const [mAvif, mWebp, avif, webp, jpg] = await Promise.all([
-          getImage({ ...crop, format: 'avif' }),
-          getImage({ ...crop, format: 'webp' }),
-          getImage({ ...full, format: 'avif' }),
+        const [avif, webp, jpg] = await Promise.all([
+          getImage({ src: image, widths: avifUsableWidths, format: 'avif' }),
           getImage({ ...full, format: 'webp' }),
           getImage({ ...full, format: 'jpg' }),
         ]);
-        return { mAvif, mWebp, avif, webp, jpg, mWidth, mHeight };
+        if (!mobileCrop) return { avif, webp, jpg, mobile: undefined };
+        const mWidths = [...new Set((mobileCrop.widths ?? [480, 640, 768]).filter((w) => w <= image.width))];
+        const mWidth = Math.max(...mWidths);
+        const mHeight = Math.round(mWidth / mobileCrop.ratio);
+        const crop = { src: image, width: mWidth, height: mHeight, widths: mWidths, fit: 'cover' as const, position: mobileCrop.position ?? 'centre' };
+        const [mAvif, mWebp] = await Promise.all([getImage({ ...crop, format: 'avif' }), getImage({ ...crop, format: 'webp' })]);
+        return { avif, webp, jpg, mobile: { avif: mAvif, webp: mWebp, width: mWidth, height: mHeight } };
       })()
     : undefined;
 ---
@@ -84,8 +96,8 @@ const art =
 {
   image && art ? (
     <picture class="media-picture" style={`--media-ratio: ${aspect}`}>
-      <source media={MOBILE_MEDIA} type="image/avif" srcset={art.mAvif.srcSet.attribute} sizes={sizes} width={art.mWidth} height={art.mHeight} />
-      <source media={MOBILE_MEDIA} type="image/webp" srcset={art.mWebp.srcSet.attribute} sizes={sizes} width={art.mWidth} height={art.mHeight} />
+      {art.mobile && <source media={MOBILE_MEDIA} type="image/avif" srcset={art.mobile.avif.srcSet.attribute} sizes={sizes} width={art.mobile.width} height={art.mobile.height} />}
+      {art.mobile && <source media={MOBILE_MEDIA} type="image/webp" srcset={art.mobile.webp.srcSet.attribute} sizes={sizes} width={art.mobile.width} height={art.mobile.height} />}
       <source type="image/avif" srcset={art.avif.srcSet.attribute} sizes={sizes} />
       <source type="image/webp" srcset={art.webp.srcSet.attribute} sizes={sizes} />
       <img
diff --git a/src/pages/siii.astro b/src/pages/siii.astro
index a3307f0..ebc9a3f 100644
--- a/src/pages/siii.astro
+++ b/src/pages/siii.astro
@@ -247,6 +247,7 @@ const phrases: Record<string, string> = {
                   alt={siiiExampleScreens[ex.id].alt}
                   sizes={i === 0 ? '(min-width: 100rem) 1488px, 93vw' : '(min-width: 100rem) 983px, (min-width: 64em) 62vw, 92vw'}
                   widths={i === 0 ? [480, 768, 1080, 1440] : undefined}
+                  avifWidths={i === 0 ? [1600, 1920] : undefined}
                 />
                 {/* The whole screenshot opens the experience too, in a new tab (user, 2026-10-07). For pointers
                     only: keyboard and screen readers have the CTA below, and the image keeps its alt. */}
```

## 5. Per web-performance-specialist

- **Peso.** Accetti +56,8 KB in AVIF sugli schermi 2x e +18,5 KB sugli schermi 1x da 1600 px, per un'immagine in `lazy` sotto la piega?
- **Obiettivo del §4.** L'AVIF a 1920 px pesa 173,7 KB contro i 150 KB indicati per una foto a tutta larghezza: lo stesso caso del 1080 che avevi già accettato, cioè una vista ricca di dettagli. Lo accetti?
- **Alternativa più parca, non costruita.** Una sorgente AVIF con `media="(min-resolution: 1.5dppx)"` e larghezze fino a 1920, prima di quella normale:
  - gli schermi 1x non cambierebbero affatto, quindi senza i +18,5 KB;
  - costa più markup in `Media`.

  Se la preferisci, la preparo.

## 6. Strada (b): la sorgente AVIF per gli schermi ad alta densità

**Che cosa fa la patch.**
- **`Media.astro`, nuova prop `hiDpiAvifWidths`.** Aggiunge una sorgente `<source type="image/avif" media="(min-resolution: 1.5dppx)">` prima di quella AVIF normale.
  - Ha **tutte** le larghezze: quelle di `widths` più quelle della prop, cioè 480, 768, 1080, 1440, 1600 e 1920. Così i telefoni da 1,75x a 3x continuano a scegliere in base al bisogno (requisito 1).
  - Per le larghezze comuni usa gli stessi file della sorgente AVIF normale, con le stesse URL: si aggiungono solo il 1600 e il 1920.
- **Le altre sorgenti non cambiano** (requisito 2): AVIF normale, WebP e JPEG si fermano a 1440 px, con gli stessi file di oggi.
- **Con `mobileCrop`** le sorgenti mobili restano per prime (requisito 3).
  - La hero di `/siii/` non usa la nuova prop, e il suo HTML resta identico byte per byte.
  - Per questo la nuova sorgente è scritta sulla stessa riga della sorgente mobile WebP: su una riga a parte, nelle istanze senza la prop avrebbe lasciato una riga vuota in più.
- **`siii.astro`:** `hiDpiAvifWidths={i === 0 ? [1600, 1920] : undefined}` sul primo esempio.

**Prove** (requisito 4), sulla build di 52d3213 con la patch, confrontata con quella senza:

| Prova | Esito |
|---|---|
| Controllo n. 8 (comando del §6.3 di `budget.md`) | Vuoto |
| Altre pagine | Le 7 pagine diverse da `/siii/` sono identiche byte per byte |
| `/siii/` | Su 4 `<picture>`, cambia solo quello del primo esempio. La hero e gli altri due esempi sono identici byte per byte, come il resto della pagina |
| Primo esempio | Sorgente nuova con 480, 768, 1080, 1440, 1600 e 1920 px (AVIF da 20,8 a 173,7 KB); AVIF normale, WebP e JPEG con le stesse URL e larghezze di oggi |
| `astro check` | 0 errori, 0 avvisi |
| Riproducibilità | La patch, applicata a una copia pulita di 52d3213, dà gli stessi file della build provata; `git apply --check` sul repository passa |

**Varianti scelte** (Chromium; la sorgente usata è la prima la cui `media` è vera):

| Schermo | Oggi | Con la patch | Atteso |
|---|---|---|---|
| 1280 × 800, 1× | 1440w | 1440w, AVIF normale | 1440w ✓ |
| 1440 × 900, 1× | 1440w | 1440w, AVIF normale | 1440w ✓ |
| 1600 × 1000, 1× | 1440w | 1440w, AVIF normale | 1440w ✓ |
| 1920 × 1080, 1× | 1440w | 1440w, AVIF normale | 1440w ✓ |
| 1440 × 900, 2× | 1440w | **1920w**, AVIF alta densità | 1920w ✓ |
| 1024 × 768, 2× | 1440w | **1920w**, AVIF alta densità (servono 1894 px) | 1920w o 1600w ✓ |
| 390 × 844, 3× | 1440w | 1440w, AVIF alta densità | come oggi ✓ |
| 412 × 823, 1,75× | 768w | 768w, AVIF alta densità | come oggi ✓ |
| 430 × 932, 3× | 1440w | 1440w, AVIF alta densità | come oggi ✓ |

- **Sui telefoni la sorgente cambia, ma il file no:** stessa larghezza e stessa URL. A 390 × 844 a 3× il browser sceglie il 1440 già oggi, perché `sizes` vale 93vw, cioè 363 px, e 363 × 3 supera i 1080 px.
- **Gli altri schermi 2x del §1** (1280 × 800, 1512 × 982, 1600 × 1000, 1728 × 1117 e 1920 × 1080) scelgono anche loro il 1920w dalla sorgente ad alta densità; oggi ricevono il 1440w.
- **Copia della patch:** `/tmp/claude-0/-home-user-itnode/fe3c835e-6b29-5abd-af6c-2c27dd8f28f0/scratchpad/ui-s3b/diff/siii-esempio-avif-hidpi.patch` (si applica su 52d3213).

```diff
diff --git a/src/components/ui/Media.astro b/src/components/ui/Media.astro
index 6a03b35..b8469b7 100644
--- a/src/components/ui/Media.astro
+++ b/src/components/ui/Media.astro
@@ -33,6 +33,14 @@ interface Props {
    * pixels they show, not a taller image that object-fit crops (docs/performance/budget.md §4).
    */
   mobileCrop?: { ratio: number; widths?: number[]; position?: string };
+  /**
+   * Extra AVIF widths for screens of 1.5 dppx and more (desktops and tablets at 2x), for a detailed
+   * image that would look soft there. They go in a source with media="(min-resolution: 1.5dppx)" that
+   * has every width, these included, so phones at 1.75x–3x keep choosing by need. The other AVIF, WebP
+   * and JPEG sources stop at `widths`: WebP and JPEG at these widths would break the per-file limits
+   * of docs/performance/budget.md (check 8).
+   */
+  hiDpiAvifWidths?: number[];
   class?: string;
 }
 
@@ -47,6 +55,7 @@ const {
   position = '50% 50%',
   pendingText = true,
   mobileCrop,
+  hiDpiAvifWidths,
   class: className,
 } = Astro.props;
 
@@ -59,24 +68,32 @@ const usableWidths = image
   ? [...new Set([...widths.filter((w) => w < image.width), Math.min(image.width, Math.max(...widths))])]
   : [];
 
-// Art direction (mobileCrop): mobile sources cropped by sharp (fit cover), then the full image.
+// Sources built here instead of <Picture> when a viewport or a screen density needs its own widths.
+// - Art direction (mobileCrop): mobile sources cropped by sharp (fit cover), first, so they win below 64em.
+// - High density (hiDpiAvifWidths): an AVIF source for 1.5 dppx and more with every width, before the
+//   normal sources. It sits on the line of the mobile WebP source, so the HTML of the instances without
+//   it (the hero of /siii/) stays the same byte for byte. Without either prop Media renders <Picture>.
 const MOBILE_MEDIA = '(max-width: 63.99em)';
+const HIDPI_MEDIA = '(min-resolution: 1.5dppx)';
+const hiDpiWidths =
+  image && hiDpiAvifWidths ? [...new Set([...usableWidths, ...hiDpiAvifWidths.filter((w) => w <= image.width)])].sort((a, b) => a - b) : undefined;
 const art =
-  image && mobileCrop
+  image && (mobileCrop || hiDpiWidths)
     ? await (async () => {
-        const mWidths = [...new Set((mobileCrop.widths ?? [480, 640, 768]).filter((w) => w <= image.width))];
-        const mWidth = Math.max(...mWidths);
-        const mHeight = Math.round(mWidth / mobileCrop.ratio);
-        const crop = { src: image, width: mWidth, height: mHeight, widths: mWidths, fit: 'cover' as const, position: mobileCrop.position ?? 'centre' };
         const full = { src: image, widths: usableWidths };
-        const [mAvif, mWebp, avif, webp, jpg] = await Promise.all([
-          getImage({ ...crop, format: 'avif' }),
-          getImage({ ...crop, format: 'webp' }),
+        const [avif, webp, jpg, hiDpi] = await Promise.all([
           getImage({ ...full, format: 'avif' }),
           getImage({ ...full, format: 'webp' }),
           getImage({ ...full, format: 'jpg' }),
+          hiDpiWidths ? getImage({ src: image, widths: hiDpiWidths, format: 'avif' }) : undefined,
         ]);
-        return { mAvif, mWebp, avif, webp, jpg, mWidth, mHeight };
+        if (!mobileCrop) return { avif, webp, jpg, hiDpi, mobile: undefined };
+        const mWidths = [...new Set((mobileCrop.widths ?? [480, 640, 768]).filter((w) => w <= image.width))];
+        const mWidth = Math.max(...mWidths);
+        const mHeight = Math.round(mWidth / mobileCrop.ratio);
+        const crop = { src: image, width: mWidth, height: mHeight, widths: mWidths, fit: 'cover' as const, position: mobileCrop.position ?? 'centre' };
+        const [mAvif, mWebp] = await Promise.all([getImage({ ...crop, format: 'avif' }), getImage({ ...crop, format: 'webp' })]);
+        return { avif, webp, jpg, hiDpi, mobile: { avif: mAvif, webp: mWebp, width: mWidth, height: mHeight } };
       })()
     : undefined;
 ---
@@ -84,8 +101,8 @@ const art =
 {
   image && art ? (
     <picture class="media-picture" style={`--media-ratio: ${aspect}`}>
-      <source media={MOBILE_MEDIA} type="image/avif" srcset={art.mAvif.srcSet.attribute} sizes={sizes} width={art.mWidth} height={art.mHeight} />
-      <source media={MOBILE_MEDIA} type="image/webp" srcset={art.mWebp.srcSet.attribute} sizes={sizes} width={art.mWidth} height={art.mHeight} />
+      {art.mobile && <source media={MOBILE_MEDIA} type="image/avif" srcset={art.mobile.avif.srcSet.attribute} sizes={sizes} width={art.mobile.width} height={art.mobile.height} />}
+      {art.mobile && <source media={MOBILE_MEDIA} type="image/webp" srcset={art.mobile.webp.srcSet.attribute} sizes={sizes} width={art.mobile.width} height={art.mobile.height} />}{art.hiDpi && <source media={HIDPI_MEDIA} type="image/avif" srcset={art.hiDpi.srcSet.attribute} sizes={sizes} />}
       <source type="image/avif" srcset={art.avif.srcSet.attribute} sizes={sizes} />
       <source type="image/webp" srcset={art.webp.srcSet.attribute} sizes={sizes} />
       <img
diff --git a/src/pages/siii.astro b/src/pages/siii.astro
index a3307f0..e9eb336 100644
--- a/src/pages/siii.astro
+++ b/src/pages/siii.astro
@@ -247,6 +247,7 @@ const phrases: Record<string, string> = {
                   alt={siiiExampleScreens[ex.id].alt}
                   sizes={i === 0 ? '(min-width: 100rem) 1488px, 93vw' : '(min-width: 100rem) 983px, (min-width: 64em) 62vw, 92vw'}
                   widths={i === 0 ? [480, 768, 1080, 1440] : undefined}
+                  hiDpiAvifWidths={i === 0 ? [1600, 1920] : undefined}
                 />
                 {/* The whole screenshot opens the experience too, in a new tab (user, 2026-10-07). For pointers
                     only: keyboard and screen readers have the CTA below, and the image keeps its alt. */}
```

## Verdetto di dominio (UI)

**Il limite a 1440 px va bene sugli schermi 1x, ma sugli schermi 2x rende visibilmente più morbidi i dettagli dell'interfaccia** della prima schermata, che è la più grande della pagina (12 colonne).
- La strada (b), scelta da web-performance-specialist, porta il 1920 dove serve e non cambia nulla sugli schermi 1x né sui telefoni.
- La patch del §6 rispetta i requisiti 1–4 della review di performance: è pronta.

## Ipotesi da validare

- **Browser.** Misure in Chromium. Anche Safari (da iOS 16 e macOS 13) e Firefox (dalla versione 93) scelgono l'AVIF; i browser più vecchi ricevono il WebP fino a 1440 px, come oggi. `[DA VERIFICARE]` su Safari e Firefox reali.
- **Compatibilità della sorgente ad alta densità.** Un browser che non riconosce `min-resolution` la salta e usa le sorgenti normali, come oggi. È il caso dei Safari precedenti al 16, che non hanno comunque l'AVIF (review di performance §8, requisito 5).
- **La misura dei contorni** (Tenengrad) è un indicatore, non una soglia. Il giudizio visivo è nelle due immagini.

## Domande aperte

- Nessuna: le domande del §5 le ha chiuse web-performance-specialist con la scelta (b) (review di performance §8).

## Decisioni richieste

1. **Sessione principale:** applicare la patch del §6. Non serve una rimisura Lighthouse (review di performance §8).
2. **web-performance-specialist:** il ricontrollo delle prove dopo l'applicazione.
3. **creative-director:** il risultato visivo, se lo vuole vedere; le immagini sono quelle del §2.
