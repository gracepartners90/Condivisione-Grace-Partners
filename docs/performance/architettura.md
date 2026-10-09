---
titolo: Linee guida di architettura front-end e media
owner: web-performance-specialist
contributi: [ui-designer, creative-director, seo-technical, ux-designer]
stato: bozza
versione: 0.7
aggiornato: 2026-10-08
fonti: [docs/brief/linee-guida.md, docs/decisioni/001-stack-tecnologico.md, docs/decisioni/004-anteprima-su-railway.md, docs/decisioni/005-preload-del-font.md, docs/performance/budget.md, docs/creativa/direzione-visiva.md, docs/cro/piano-misurazione.md, codice in src/ e scripts/ al 2026-09-28 (commit c28dac1), al 2026-10-07 (commit d06a3e9) e al 2026-10-08 (commit 7326a1e, 1112c93, 2178f47 ed e406ecb), sorgente di Astro 7.3.5 (assets/services/sharp.js, assets/utils/hash.js) letto il 2026-10-08, prototipo di misura del 2026-09-28, docs/review/2026-09-28-sito-rimisura-performance-web-performance-specialist.md, docs/review/2026-09-28-sito-verdetto-g4-creative-director.md, docs/review/2026-10-07-schermate-siii-web-performance-specialist.md, docs/review/2026-10-08-hero-siii-yes-web-performance-specialist.md]
---

# Linee guida di architettura front-end e media

**A chi serve.** È il documento operativo per chi sviluppa: regole numerate e snippet pronti.
- Gli snippet marcati **(verificato)** sono stati compilati con Astro 7.3.5 e misurati il 2026-09-28 nel prototipo descritto in `budget.md` §7.2.
- I limiti numerici stanno in `budget.md`; lo stack in `docs/decisioni/001-stack-tecnologico.md`.

## 0. Le dieci regole

1. **HTML statico e completo;** il JS migliora, non costruisce.
2. **Zero terze parti al caricamento.** Nessuna richiesta verso altri domini prima di un gesto dell'utente.
3. **L'LCP è il testo dell'H1:** visibile dal primo frame. Mai `opacity: 0`, `visibility: hidden`, `clip` totale o testo diviso in parole.
4. **Font:** due file, **un solo preload, Schibsted Grotesk** (ADR 005: scelta d'identità, con un costo di LCP misurato in `budget.md` §3), `font-display: swap`, fallback metrici.
5. **Immagini** solo con `Media.astro` o `ArtDirectedMedia.astro`: AVIF e WebP, `sizes` corretto, `width` e `height`, `lazy` di default.
6. **Video:** 0 byte finché non serve. Niente attributo `poster`: la copertina è un `<picture>` lazy.
7. **Iframe** solo dopo un clic (facade); `preconnect` solo all'intenzione.
8. **Animazioni** solo su `transform` e `opacity`. Motion legato allo scroll solo in CSS (scroll-driven) e **scritto con le proprietà longhand**.
9. **Nessun listener di scroll.** IntersectionObserver per stati e visibilità; gestori brevi che cedono il main thread.
10. **Ogni modifica a media, font, JS o terze parti** si misura con la procedura di `budget.md` §6.

## 1. Configurazione di Astro (verificato)

```js
// astro.config.mjs
// @ts-check
import { defineConfig, fontProviders, sharpImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://itnode.it',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // All CSS inline: no render-blocking request. Switch to 'auto' if a page exceeds 15 KB (br) of CSS.
    inlineStylesheets: 'always',
  },
  image: {
    // Measured on the real assets: sharp defaults (WebP/JPEG q80) weigh 20–35% more for no visible gain.
    service: sharpImageService({
      avif: { quality: 50 },
      webp: { quality: 75 },
      jpeg: { quality: 75, mozjpeg: true },
    }),
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-sans',
      // 'system-ui' → metric fallbacks for Roboto (Android), Helvetica Neue (Apple), Segoe UI, Arial.
      fallbacks: ['system-ui'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2'],
            weight: '400 900',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Fragment Mono',
      cssVariable: '--font-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [
          {
            src: ['@fontsource/fragment-mono/files/fragment-mono-latin-400-normal.woff2'],
            weight: '400',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
  integrations: [sitemap()],
});
```

**Dipendenze da aggiungere:** `npm i @fontsource-variable/schibsted-grotesk@^5.3.0 @fontsource/fragment-mono@^5.3.0`.

**Insidie verificate**

| Insidia | Cosa succede | Regola |
|---|---|---|
| `compressHTML` vale `'jsx'` per impostazione predefinita | Gli spazi tra elementi generati con `.map()` spariscono: «Latecnologiacambia.» | Lo spazio va scritto esplicitamente (§6.4). |
| Minificatore CSS: Lightning CSS 1.33 in Vite 8.3.1 | Fonde `animation` e `animation-timeline` in uno shorthand che Chromium 141 scarta, quindi l'animazione non parte. Passare i target a `vite.css.lightningcss` **non** risolve. | Proprietà longhand (§6.5), più il controllo n. 3 di `budget.md` §6.3. |
| Font con i provider `fontsource()` o `npm()` | La build scarica i file da api.fontsource.org o da jsDelivr, bloccati in questo ambiente. | Solo `fontProviders.local()` con il percorso del pacchetto. |
| `astro dev` e `astro preview` | Rilevano l'agente AI e partono in background (fermarli con `astro dev stop` e `astro preview stop`). `preview` non comprime. | Per misurare si usa `scripts/serve.mjs` (ADR 004; `budget.md` §6.1). |

## 2. Font

**Implementazione nel sito** (`src/layouts/BaseLayout.astro`, letta il 2026-09-28): `@font-face` scritti a mano e **un solo preload**, quello di Schibsted Grotesk (ADR 005).

```astro
---
// src/layouts/BaseLayout.astro (frontmatter)
import schibstedUrl from '@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2?url';
import fragmentUrl from '@fontsource/fragment-mono/files/fragment-mono-latin-400-normal.woff2?url';
// fontFaces: one @font-face per family, font-display: swap, Latin unicode-range
---
<!-- head, before the @font-face rules: the only preload of the site (ADR 005). as, type and crossorigin are all required -->
<link rel="preload" href={schibstedUrl} as="font" type="font/woff2" crossorigin />
<style is:inline set:html={fontFaces}></style>
```

```css
/* global.css — metric-matched fallbacks: the swap to Schibsted Grotesk causes no layout shift */
@font-face {
  font-family: 'Schibsted Grotesk Fallback';
  src: local('Arial'), local('ArialMT'), local('Liberation Sans'), local('Helvetica');
  size-adjust: 104.49%; ascent-override: 93.46%; descent-override: 24.67%; line-gap-override: 0%;
}
@font-face { /* Android has no Arial */
  font-family: 'Schibsted Grotesk Fallback Roboto';
  src: local('Roboto');
  size-adjust: 104.72%; ascent-override: 93.25%; descent-override: 24.62%; line-gap-override: 0%;
}
/* tokens.css */
:root {
  --font-sans: 'Schibsted Grotesk Variable', 'Schibsted Grotesk Fallback', 'Schibsted Grotesk Fallback Roboto', sans-serif;
  --font-mono: 'Fragment Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
}
```

**Alternativa equivalente: la Fonts API** di Astro (§1), verificata nel prototipo.
- `<Font cssVariable="--font-sans" preload />` e `<Font cssVariable="--font-mono" />`: il preload solo sulla prima.
- Genera un `@font-face` con `font-display: swap` e cinque facce di ripiego (BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial) con le metriche calcolate.
- Emette il `<link rel="preload">` solo con l'attributo `preload`.

**Perché il preload resta** (ADR 005, decisione del creative-director al gate G4; `budget.md` §3):
- **Meccanismo.** In Chromium un `<link rel="preload">` di font dichiarato prima del `<body>` blocca il primo rendering fino all'arrivo del font, oppure fino a 100 ms dopo l'inserimento del `<body>`, oppure fino a 1,5 s dalla navigazione. Vale anche con `font-display: swap`.
- **Beneficio d'identità.** La hero è tipografica e l'H1 è il visual. Con la fibra il titolo compare subito in Schibsted, senza scambio di carattere; su 4G la finestra del ripiego scende da 158–694 ms a 13–234 ms (misure del creative-director, ADR 005).
- **Costo.** Con throttling applicato l'LCP arriva 151 ms (home) e 177 ms (`/siii/`) più tardi che senza preload, e resta 1,01–1,04 s. CLS invariato.
- **Riapertura.** Con dati di campo sopra 2,0 s di LCP mobile al 75° percentile, con un cambio di Chromium o con una hero non più tipografica, la decisione torna a web-performance-specialist (ADR 005, «Quando si riapre»; sorveglianza proposta nella nota del `budget.md` §3).
- **Misura.** Il throttling simulato di Lighthouse modella il font come bloccante per l'FCP e dà risultati opposti a quello applicato: per le decisioni sui font vale il throttling applicato (`budget.md` §2).

**Regole**
- **Preload.** Uno solo per pagina, sul file di Schibsted Grotesk, con `as="font"`, `type="font/woff2"` e `crossorigin`: senza `crossorigin` il preload non viene riutilizzato e il font si scarica due volte. Mai in preload Fragment Mono o le immagini. Controllo n. 7 di `budget.md` §6.3.
- **Pesi.** Solo il file latino variabile `wght` 400–900 e il mono 400: niente corsivi, niente altri file.
  - Il testo in corsivo usa un tono o un peso diverso, deciso da ui-designer.
  - Il falso corsivo generato dal browser va evitato.
- **Fallback.** Ogni sistema deve trovare una faccia di ripiego con metriche corrette: Arial o Helvetica, e Roboto per Android (implementazione sopra). Con la Fonts API si usa `fallbacks: ['system-ui']`: con `'sans-serif'` Astro genererebbe il ripiego solo per Arial, che su Android non esiste.
- **Glifi.** I sottoinsiemi latini coprono accenti, « », ’, –, —, …, €, ° e ·, ma **non** → ↗ ≈ ′ ″.
  - Frecce e simboli sono SVG inline con `aria-hidden="true"`.
  - Un glifo mancante verrebbe preso da un font di sistema.
- **Niente animazioni di `font-variation-settings`** né del peso: ricalcolano il layout del testo a ogni frame.

## 3. Immagini

### 3.1 Un solo punto d'ingresso

Si usa `src/components/ui/Media.astro`, già nel repository.
- **Formati:** AVIF, WebP e JPEG di ripiego.
- **Larghezze:** 480, 768, 1080, 1440 e 1920 px, limitate all'originale (Astro non ingrandisce).
- **Attributi:** `lazy` e `async` di default; con `priority` diventano `eager`, `sync` e `fetchpriority="high"`.

```astro
<Media image={platea} alt="…" sizes="(min-width: 64rem) 40vw, 100vw" />
<Media slot="luogo-monopoli" />   <!-- asset not yet available: dimensioned slot -->
```

- **Sorgenti.** Tutte le foto stanno in `src/assets/images/`, mai in `public/`: in `public/` non vengono ottimizzate.
  - Ritagli e derivati vanno in `src/assets/images/derivate/`.
- **Dimensioni massime delle sorgenti:** lato lungo 2400 px, JPEG di qualità 90 o superiore.
  - Le foto aeree e panoramiche non si pubblicano mai all'originale: le varianti le genera `astro:assets`.
- **Segnaposto** (`Media` con `slot`): la proporzione è riservata con `aspect-ratio` e il segnaposto non scarica niente. Un eventuale SVG decorativo sta inline, entro 2 KB.

### 3.2 Immagine LCP

**Dal 2026-10-07 `/siii/` ha un'immagine LCP:** la schermata nella porta della hero, `Media` con `priority` (commit `d06a3e9`). Dal 2026-10-08 è la schermata del negozio YES, con il ritaglio 4:5 ancorato in alto (commit `1112c93`). Le altre pagine hanno hero tipografiche. Regole per ogni immagine LCP:
- un solo `priority` per pagina, sul tag `<img>` nell'HTML. Niente `background-image` CSS: il preload scanner non lo vede;
- `priority` anche quando l'immagine è in parte sotto la piega, se resta l'elemento LCP. Sulla porta di `/siii/`, con `lazy` l'LCP peggiora di 271 ms;
- nessun `loading="lazy"`, nessun `<link rel="preload">` aggiuntivo: la porta viene richiesta prima della fine del download del documento;
- nessuna animazione d'ingresso che parta da nascosta (§6.1). La porta riceve subito `is-inview`;
- pesi del `budget.md` §4 per ogni variante che un telefono può scaricare, densità 3x compresa.
- **Se su mobile l'immagine si vede con un'altra proporzione** (la porta è 3:5 su desktop e 4:5 su mobile), si ritaglia in build invece di lasciar tagliare `object-fit` (§3.4).

**Dove la porta non è l'elemento LCP** (verificato il 2026-10-08; dipende dall'impaginazione, non dall'immagine).
- Sui telefoni in verticale la porta comincia a y 546–569 px. Diventa l'LCP quando se ne vedono almeno 52–74 px, cioè con un'altezza visibile di almeno 600–640 px, secondo la larghezza. Con meno altezza vince la riga più grande dello statement.
- Col telefono in orizzontale la porta è tutta sotto la piega e l'LCP è il nome «SIII».
- In pratica hanno l'LCP testuale i telefoni con poco spazio verticale nel browser: un Android con lo schermo di 640 dp meno la barra dell'indirizzo, e probabilmente un iPhone SE in Safari [DA VERIFICARE sul dispositivo: altezza visibile con le barre del browser, stimata intorno ai 550 px].
- `priority` resta giusto, perché su tutte le altre viewport la porta è l'LCP. Dove non lo è, l'immagine non pesa sull'LCP ma divide comunque la banda con il font in preload (`budget.md` §3).

**Se l'immagine non sta nel budget con i valori del sito** (AVIF 50, WebP 75, JPEG 75), le leve in quest'ordine:
1. ancoraggio e ritaglio (`mobileCrop`, §3.4), da scegliere con il creative-director;
2. larghezze (`widths`, `mobileCrop.widths`) adeguate alla resa del §3.3;
3. solo dopo, una qualità per formato per quella sola immagine.
   - Il meccanismo è stato provato nel commit `7326a1e`, con la prop `quality` di `Media`, e tolto in `1112c93` perché la nuova immagine non ne aveva bisogno: si recupera dalla storia.
   - Per il solo ritaglio dei telefoni esiste dal commit `e406ecb`: `mobileCrop.quality` (§3.4).
   - Si sceglie il gradino più alto che rispetta i pesi del `budget.md` §4. In sharp l'AVIF va a gradini: qualità vicine danno lo stesso file (q40 = q41, q42 = q43, q45 = q46).
   - In Astro 7.3.5 `getImage` passa a sharp un solo parametro per immagine, `quality`. Il servizio lo unisce alle opzioni di `astro.config.mjs` per formato, quindi `mozjpeg` resta. `chromaSubsampling` ed `effort` valgono invece per tutto il sito.
   - Il valore va accanto all'immagine in `src/data/media.ts`, e si rimisura a ogni cambio d'immagine.
   - Va controllato anche il WebP di ripiego, che con le trame fitte è il formato più vicino al controllo n. 8.

Misure:
- prototipo, foto evento in hero con `priority`: LCP 1,51 s (variante AVIF 750w, 30 KB);
- `/siii/`, porta 3:5 da 768w e 33,6 KB: LCP 1,80 s simulato, 1,70 s con throttling applicato (`budget.md` §7.3);
- `/siii/` con la schermata YES, ritaglio 4:5 in alto da 768w e 34,3 KB: LCP 1,80 s simulato, 1,71 s con throttling applicato (`budget.md` §7.4).

### 3.3 `sizes` per slot della griglia a 12 colonne

`sizes` descrive la larghezza **resa** dell'immagine.
- Sopra i 64rem vale la griglia; sotto, l'immagine è a tutta larghezza.
- Si sbaglia per eccesso di al massimo il 10%, mai per difetto.
- Nell'attributo `sizes` le variabili CSS non sono ammesse.

| Slot (direzione visiva) | `sizes` [IPOTESI: contenitore massimo di 1200 px, da confermare con ui-designer] |
|---|---|
| A filo, tutta la viewport (video, sezioni immersive) | `100vw` |
| 12 colonne (foto «Panorama», showcase largo) | `(min-width: 80rem) 1200px, 100vw` |
| 8 colonne (showcase a destra o a sinistra) | `(min-width: 80rem) 800px, (min-width: 64rem) 66vw, 100vw` |
| 5 colonne (ritaglio 4:5 in soglia, luoghi) | `(min-width: 80rem) 500px, (min-width: 64rem) 40vw, 100vw` |
| 4 colonne o meno (timeline, didascalie) | `(min-width: 64rem) 25vw, 50vw` |

**Verifica.** Nel report di Lighthouse, l'audit «Improve image delivery» (`image-delivery-insight`) non deve segnalare immagini sovradimensionate.

### 3.4 Art direction: ritaglio diverso tra mobile e desktop (verificato)

Si usa solo quando cambia il ritaglio; altrimenti basta `Media`.

**Stessa immagine, proporzione diversa su mobile.** C'è una via più semplice del componente qui sotto: il prop `mobileCrop` di `Media.astro`, applicato nel commit `bae201c` (review del 2026-10-07, §6).
- Sotto 64em sharp ritaglia l'immagine in build (fit cover), con larghezze proprie; sopra resta l'immagine intera.
- Senza il prop, l'HTML di tutte le pagine resta identico.
- Sulla porta di `/siii/`, a parità di inquadratura (sala di Masseria Santella, 2026-10-07): 25,8 KB invece di 33,6 KB a 768 px e 39,5 KB invece di 51,4 KB a 1080 px.
- **L'ancoraggio (`position`: `top`, `centre`, `bottom`) cambia anche il peso**, perché cambia la porzione d'immagine codificata. Lo sceglie il creative-director per l'inquadratura, e ogni cambio si rimisura. Con la schermata YES (commit `1112c93`), a 1080w: 54,0 KB in alto, 64,2 KB in basso, oltre il limite di 60 KB del `budget.md` §4.
- **Derivato per il desktop** (`mobileCrop.image`, dal commit `2178f47`).
  - Se `image` è un ritaglio pensato per il desktop, i telefoni ritagliano un'altra sorgente, di solito l'originale.
  - La larghezza del derivato è il massimo delle varianti desktop, perché Astro non ingrandisce. Oltre la densità «larghezza del derivato / larghezza resa» le varianti sono sotto risoluzione.
  - Con la schermata YES, 1014 px su 416 px di resa: sotto risoluzione oltre 2,44x, all'81% a 3x.
  - Il derivato si prepara in `scripts/prepare-assets.mjs`, senza ridimensionare, in JPEG di qualità 90 o più (§3.1).
- **Dove vale il ritaglio** (`mobileCrop.media`, dal commit `e406ecb`): per default sotto 64em, oppure dove dice la media query. Per esempio `'(max-width: 39.99em)'` per i soli telefoni in verticale, come nel capitolo 01 della Home. La proporzione del box va cambiata in CSS con lo stesso breakpoint, e le sorgenti del ritaglio hanno `width` e `height` propri: nessuno spostamento del layout.
- **Qualità del solo ritaglio** (`mobileCrop.quality: { avif?, webp? }`, dal commit `e406ecb`): le altre sorgenti restano ai valori del sito. Si usa con le regole del §3.2. Capitolo 01 della Home: AVIF 40, scelto da web-performance-specialist il 2026-10-08 (review del 2026-10-08, §8).

```astro
<Media image={screen} alt="…" sizes="(min-width: 30rem) 26rem, 90vw" priority
  mobileCrop={{ ratio: 4 / 5, widths: [480, 640, 768, 1080], position: 'top' }} />
```

```astro
---
// src/components/ui/ArtDirectedMedia.astro
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

interface Props { mobile: ImageMetadata; desktop: ImageMetadata; alt: string; sizes?: string; priority?: boolean; class?: string }
const { mobile, desktop, alt, sizes = '100vw', priority = false, class: className } = Astro.props;
const fit = (img: ImageMetadata, widths: number[]) => [...new Set([...widths.filter((w) => w < img.width), img.width])];
const wm = fit(mobile, [480, 768, 1080]);
const wd = fit(desktop, [1080, 1440, 1920]);
const [mAvif, mWebp, mJpg, dAvif, dWebp] = await Promise.all([
  getImage({ src: mobile, format: 'avif', widths: wm }),
  getImage({ src: mobile, format: 'webp', widths: wm }),
  getImage({ src: mobile, format: 'jpg', widths: wm }),
  getImage({ src: desktop, format: 'avif', widths: wd }),
  getImage({ src: desktop, format: 'webp', widths: wd }),
]);
const wide = '(min-width: 64rem)';
---
<picture class={className}>
  <!-- width/height on <source>: the desktop crop has its own ratio, no CLS -->
  <source media={wide} type="image/avif" srcset={dAvif.srcSet.attribute} sizes={sizes} width={desktop.width} height={desktop.height} />
  <source media={wide} type="image/webp" srcset={dWebp.srcSet.attribute} sizes={sizes} width={desktop.width} height={desktop.height} />
  <source type="image/avif" srcset={mAvif.srcSet.attribute} sizes={sizes} />
  <source type="image/webp" srcset={mWebp.srcSet.attribute} sizes={sizes} />
  <img src={mJpg.src} srcset={mJpg.srcSet.attribute} sizes={sizes} width={mobile.width} height={mobile.height} alt={alt}
    loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'sync' : 'async'} fetchpriority={priority ? 'high' : undefined} />
</picture>
```

**Nota sui ritagli attuali.** `evento-panoramica.jpg` (1277×560) e `evento-quadrato.jpg` (560×560) sono più piccoli della loro resa su desktop con DPR 2: la variante più grande resta l'originale. È un limite di nitidezza, non di peso; lo valuta ui-designer.

## 4. Video di Città Digitali (`VideoSection`)

### 4.1 Markup: contratto con `src/scripts/video.ts`

```astro
---
// src/components/VideoSection.astro
import Media from './ui/Media.astro';
import type { ImageMetadata } from 'astro';
interface Props { id: string; title: string; cover?: ImageMetadata; captions?: string }
const { id, title, cover, captions } = Astro.props;
---
<section class="video" aria-label={title}>
  <div class="video__frame aperture" data-video data-reveal data-autoplay="true" data-video-id={id} data-video-title={title} data-state="paused">
    <video class="video__media" muted playsinline preload="none" width="1920" height="1080" aria-label={title}>
      <!-- Order matters: the first playable, matching source wins. Target files: §4.3 -->
      <source src="/video/citta-digitali-1080.av1.v1.mp4" type='video/mp4; codecs="av01.0.08M.08"' media="(min-width: 64rem)" />
      <source src="/video/citta-digitali-1080.h264.v1.mp4" type="video/mp4" media="(min-width: 64rem)" />
      <source src="/video/citta-digitali-720.av1.v1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
      <source src="/video/citta-digitali-720.h264.v1.mp4" type="video/mp4" />
      {captions && <track kind="captions" src={captions} srclang="it" label="Italiano" />}
    </video>
    {cover ? <Media image={cover} alt="" sizes="100vw" class="video__cover" /> : <Media slot="video-poster" class="video__cover" />}
    <div class="video__controls">
      <button type="button" class="video__btn" data-video-toggle aria-pressed="false" aria-label="Riproduci il video"><!-- svg --></button>
      <button type="button" class="video__btn" data-video-mute aria-pressed="false" aria-label="Attiva l’audio"><!-- svg --></button>
      <span class="video__time mono" data-video-time aria-hidden="true">00:00</span>
    </div>
  </div>
</section>
```

**Fase transitoria.** Finché non ci sono i file transcodificati, si usa una sola sorgente:
- `<source src="https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2" type="video/mp4">`;
- con `preload="none"`, nessuna richiesta parte verso railway.app prima dell'avvio.

**Perché niente attributo `poster`.** Chromium 141 scarica il `poster` subito, anche con `preload="none"` e con il video 5000 px sotto la piega (verificato). Inoltre il `poster` non ha `srcset`. La copertina è quindi un `<picture>` lazy, in AVIF e responsive, sovrapposto al video.

```css
.video__frame { position: relative; block-size: min(100svh, 56.25vw); background: var(--notte); }
@media (max-width: 63.99rem) { .video__frame { block-size: auto; aspect-ratio: 16 / 9; } }
.video__media, .video__cover, .video__cover img { position: absolute; inset: 0; inline-size: 100%; block-size: 100%; object-fit: cover; }
.video__cover { transition: opacity 0.4s; }
[data-video][data-state='playing'][data-ready] .video__cover { opacity: 0; pointer-events: none; }
```

### 4.2 Comportamento: requisiti per `video.ts`

Lo script esistente copre già buona parte dei requisiti:
- `preload="none"`;
- autoplay muto solo con almeno il 50% in viewport;
- niente autoplay con `prefers-reduced-motion` o Save-Data;
- pausa quando il video esce dalla viewport, gestione di `play()` rifiutato, `aria-pressed`.

**Da aggiungere**

```ts
// 1. No autoplay on 2G / slow-2g either (Chromium only; elsewhere the API is missing → allowed).
const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
const lowData = Boolean(conn?.saveData) || /(^|-)2g$/.test(conn?.effectiveType ?? '');

// 2. Hide the cover on the first rendered frame ('playing'), not on 'play': avoids a black flash.
video.addEventListener('playing', () => { root.dataset.ready = ''; }, { once: true });

// 3. Time readout: write only when the displayed second changes (timeupdate fires ~4 times per second).
const time = root.querySelector<HTMLElement>('[data-video-time]');
let shown = -1;
video.addEventListener('timeupdate', () => {
  const s = Math.floor(video.currentTime);
  if (!time || s === shown) return;
  shown = s;
  time.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
});
```

**Regole**
- Controlli nativi disattivati, al loro posto i pulsanti minimi della direzione visiva, raggiungibili da tastiera, con etichetta ed evidenza del focus.
- Se nel video c'è parlato, servono i sottotitoli (`<track>`) [DA FORNIRE].
- **Costo dell'autoplay su mobile.** 15 s di autoplay costano circa 3,7 MB a 720p H.264 (2 Mbit/s) o circa 2,2 MB in AV1. Decisione richiesta: vedi in fondo.

### 4.3 Preparazione dei file (quando arriva la sorgente)

```bash
# Starting points: check the average bitrate with ffprobe and tune -crf until the budget is met (budget.md §4).
ffmpeg -i sorgente.mp4 -vf scale=-2:1080 -c:v libx264 -profile:v high -preset slow -crf 23 -maxrate 4M -bufsize 8M \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart citta-digitali-1080.h264.v1.mp4
ffmpeg -i sorgente.mp4 -vf scale=-2:720 -c:v libx264 -profile:v high -preset slow -crf 24 -maxrate 2M -bufsize 4M \
  -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart citta-digitali-720.h264.v1.mp4
ffmpeg -i sorgente.mp4 -vf scale=-2:1080 -c:v libsvtav1 -preset 6 -crf 35 -g 240 -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart citta-digitali-1080.av1.v1.mp4
ffmpeg -i sorgente.mp4 -vf scale=-2:720 -c:v libsvtav1 -preset 6 -crf 37 -g 240 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart citta-digitali-720.av1.v1.mp4
ffmpeg -ss 00:00:03 -i sorgente.mp4 -frames:v 1 -q:v 2 src/assets/images/video-citta-digitali-copertina.jpg
```

- **`+faststart`** mette l'indice all'inizio del file: senza, la riproduzione aspetta il download completo.
- **Nomi versionati** (`.v1.`): cache di un anno con `immutable`. Per cambiare il video si cambia il nome.
- **Limite di 25 MiB per file** (se l'hosting è Cloudflare, ADR 001). A 4 Mbit/s corrispondono circa 50 s di 1080p. Oltre, si abbassa il bitrate o si usa uno storage dedicato.
- **Server.** Deve rispondere alle richieste `Range` con 206: Safari su iOS non riproduce senza. Verifica: `curl -sI -r 0-1023 <url>` → `206 Partial Content`.
- **AV1 su mobile.** Se su un Android di fascia media la sorgente AV1 a 720p perde fotogrammi (decodifica software), si toglie e resta solo H.264.

## 5. Anteprime immersive (`ImmersivePreview`, facade)

Contratto con `src/scripts/immersive.ts`, già nel repository.

```astro
<figure class="immersive" data-immersive data-embed-src={url} data-embed-title={`${name}: esperienza interattiva`} data-experience-id={id}>
  <div class="immersive__stage aperture" data-immersive-stage data-reveal>
    <Media slot={slotId} class="immersive__cover" />
    <button type="button" class="immersive__load" data-immersive-load>Esplora qui l’anteprima interattiva</button>
  </div>
  <figcaption>
    {name}
    <a href={url} target="_blank" rel="noopener">Entra nell’esperienza<!-- svg arrow --><span class="visually-hidden"> (si apre in una nuova scheda)</span></a>
  </figcaption>
</figure>
```

**Da aggiungere a `immersive.ts`**

```ts
// Warm up the connection only on intent (hover or focus), once per origin.
const warm = () => {
  const origin = new URL(src).origin;
  if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;
  document.head.append(Object.assign(document.createElement('link'), { rel: 'preconnect', href: origin }));
};
trigger.addEventListener('pointerenter', warm, { once: true });
trigger.addEventListener('focus', warm, { once: true });
// Inside the click handler, before inserting the iframe:
iframe.referrerPolicy = 'strict-origin-when-cross-origin';
```

**Regole**
- **Nell'HTML nessun `<iframe>`:** controllo n. 4 di `budget.md` §6.3. Al caricamento, 0 connessioni verso i portali.
- **Proposta per i dispositivi mobili.** Su `(max-width: 63.99rem), (pointer: coarse)` il pulsante di anteprima non si mostra e resta solo il link in nuova scheda. Ragioni:
  - un viewer 3D dentro una pagina che scorre, su un telefono di fascia media, contende memoria e main thread;
  - intrappola il gesto di scroll.
  - Decidono ux-designer e creative-director.
- **Framing.** Va verificato che i portali consentano l'incorporamento (`X-Frame-Options`, `frame-ancestors`) [DA VERIFICARE: i domini sono bloccati dall'ambiente]. Se non lo consentono, si mostra solo il link.
- **Cookie.** Se l'iframe imposta cookie non tecnici, la cosa riguarda anche il piano CRO e la cookie policy (piano di misurazione §1, condizione 3).

## 6. Motion

### 6.1 Regole generali

- **Proprietà.** Si animano solo `transform` e `opacity`, che girano sul compositor. Due eccezioni, a condizione che si ripetano una volta sola, durino al massimo 1,2 s e riguardino un elemento alla volta:
  - `clip-path`, che ridipinge a ogni frame: 124 paint in 1 s, contro 4 di un'animazione equivalente in `transform` e `opacity` (misurato su Chromium 141);
  - `stroke-dashoffset`, per il disegno della costa.
- **Dove scrivere il motion.** Tutto dentro `@media (prefers-reduced-motion: no-preference)`: con la preferenza di movimento ridotto la pagina è statica e completa.
- **Elemento LCP.** L'H1 della hero non parte mai nascosto. Ammessi: nessuna animazione, oppure un ingresso solo in `transform` da stato visibile, di durata ≤ 600 ms.
  - Misurato: un fade da `opacity: 0` porta l'LCP da 0,82 a 1,49 s; lo stesso ingresso in solo `transform` resta a 0,82 s.
- **`will-change`.** Solo durante l'animazione, oppure al massimo su 3 elementi fissi per pagina. Le scroll-driven animations non ne hanno bisogno.
- **Durate.** 200–700 ms per l'interfaccia, 1000 ms per l'apertura. Al massimo 6 elementi animati insieme.
- **Numeri.** Le statistiche sono nell'HTML con il valore finale: niente contatori che scorrono.

### 6.2 Reveal

Lo script esistente, `src/scripts/reveal.ts`, fa già la cosa giusta:
- lo stato nascosto dipende da `.reveal-ready`, che mette lo script stesso: senza JS il contenuto è visibile;
- usa un solo IntersectionObserver.

Non si mette `data-reveal` sugli elementi visibili al caricamento. In più, dal 2026-09-28, `reveal.ts` non nasconde mai ciò che è già a schermo all'avvio, a qualsiasi altezza di viewport:
- legge le posizioni di tutti gli elementi;
- marca con `is-inview` quelli già visibili;
- solo alla fine aggiunge `reveal-ready`.

Verificato fotogramma per fotogramma su 5 pagine e 4 viewport (`budget.md` §6.4).

**Lo stato nascosto non deve cambiare l'altezza del blocco.** Se la maschera cambia le dimensioni, il blocco si accorcia o si allunga quando la maschera viene tolta, e il contenuto sotto si sposta durante la lettura (CLS).
- Esempio misurato: la maschera del reveal a righe usa padding e margini negativi; tra una riga e l'altra i margini collassano, e il passage mascherato risulta più alto di 3–20 px.
- Correzione provata: `.passage__reg` in flex a colonna mentre la maschera è attiva (rimisura del 2026-09-28, osservazione 2).

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal-ready [data-reveal]:not([data-reveal='words'], .aperture) {
    transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
  }
  .reveal-ready [data-reveal]:not([data-reveal='words'], .aperture, .is-inview) {
    opacity: 0;
    transform: translate3d(0, 1.5rem, 0);
  }
}
```

### 6.3 «Apertura» dall'orizzonte, in versione composita

L'effetto della direzione visiva (da una fessura orizzontale all'immagine intera, con scala da 1,06 a 1) si ottiene con due otturatori del colore della superficie che traslano: 6 paint in 1 s invece di 124 (misurato).

```css
.aperture { position: relative; overflow: clip; }
.aperture::before, .aperture::after {
  content: ''; position: absolute; inset-inline: 0; z-index: 1; block-size: 46%;
  background: var(--surface); pointer-events: none;
  transform: translateY(-101%);               /* open by default: no JS, reduced motion */
}
.aperture::before { inset-block-start: 0; }
.aperture::after { inset-block-end: 0; transform: translateY(101%); }
@media (prefers-reduced-motion: no-preference) {
  .aperture::before, .aperture::after, .aperture img { transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1); }
  .reveal-ready .aperture:not(.is-inview)::before,
  .reveal-ready .aperture:not(.is-inview)::after { transform: none; }        /* closed: 8% slit */
  .reveal-ready .aperture:not(.is-inview) img { transform: scale(1.06); }
}
```

`--surface` è il colore della sezione: calce, pietra o notte.

Se ui-designer preferisce comunque `clip-path`, valgono le condizioni del §6.1: una volta sola, un elemento alla volta, mai su un elemento LCP.

### 6.4 Text reveal parola per parola (verificato)

```astro
---
// src/components/ui/SplitWords.astro — never on the hero H1 (LCP)
interface Props { text: string; as?: 'h2' | 'h3' | 'p'; class?: string }
const { text, as: Tag = 'h2', class: className } = Astro.props;
const words = text.trim().split(/\s+/);
---
<Tag class:list={['split', className]} data-reveal="words">
  {words.map((word, i) => (
    <>
      {i > 0 && ' '}
      <span class="split__w"><span class="split__i" style={`--i: ${Math.min(i, 12)}`}>{word}</span></span>
    </>
  ))}
</Tag>
```

```css
.split__w { display: inline-block; overflow: clip; padding-block: 0.15em; margin-block: -0.15em; vertical-align: top; } /* room for È, g, p */
@media (prefers-reduced-motion: no-preference) {
  .reveal-ready [data-reveal='words'] .split__i { display: inline-block; transition: transform 0.7s var(--ease-out) calc(var(--i) * 40ms); }
  .reveal-ready [data-reveal='words']:not(.is-inview) .split__i { transform: translate3d(0, 110%, 0); }
}
```

- Lo spazio `{i > 0 && ' '}` è obbligatorio, per via di `compressHTML: 'jsx'`.
- Lo split si fa al build, per parole. Mai per righe o per lettere: le righe richiedono misure a runtime, le lettere sono vietate dalla direzione visiva.

### 6.5 Parallax, rotazione dell'orizzonte, marquee: scroll-driven in longhand (verificato)

**Costo misurato sul sito** (2026-09-28, CPU 4x, scroll con la rotella). Lo scroll resta fluido e senza task lunghi, ma non è a costo zero sul main thread:
- con il motion attivo lo stile si ricalcola a ogni frame, circa 6,5 ms per frame sulla home (37–39% di main thread occupato);
- con movimento ridotto il costo scende a circa 2 ms per frame (12%).

Ogni nuovo effetto legato allo scroll si misura con la traccia del `budget.md` §6.4.

```css
/* Parallax: max ±6% (48 px), at most 1 image per screen, inside an overflow: clip frame */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .parallax img {
      animation-name: parallax;
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: view();
      animation-range: cover;
    }
    .marquee__track {                       /* scroll-linked, never autonomous (direzione visiva §6) */
      animation-name: marquee;
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: view();
      animation-range: cover;
    }
  }
}
@keyframes parallax { from { transform: translateY(-6%) scale(1.12); } to { transform: translateY(6%) scale(1.12); } }
/* Scroll distance of a view() timeline = viewport height + band height: 45svh ≈ 0.4× for a band of about 1 line; tune with ui-designer.
   The track must be wider than 100vw + 45svh (duplicate the text). */
@keyframes marquee { to { transform: translateX(-45svh); } }
```

- **Mai lo shorthand `animation: … ;` insieme ad `animation-timeline`.** Dopo la build diventa `animation: linear both parallax view()`, che Chromium scarta: nessuna animazione (verificato).
- **Rotazione dell'orizzonte nella hero:** stesso schema, con `animation-range: exit` sulla hero. Si trasforma la `<svg>` intera o un contenitore HTML, non i nodi interni dell'SVG.
- **Senza supporto** (Firefox oggi) il contenuto è statico. **Nessun ripiego in JS** con listener di scroll.
- **Marquee:** il testo duplicato per la continuità ha `aria-hidden="true"`. Legato allo scroll, non si muove da solo: il pulsante di pausa di `marquee.ts` non serve più (§12) [ux-designer confermi la lettura del criterio WCAG 2.2.2].

### 6.6 Visual della hero e carte

- **SVG inline**, entro i limiti di `budget.md` §4, generato al build; nessun JS per il layout.
- **Disegno della costa** con `stroke-dashoffset`: una volta, ≤ 1,2 s, all'ingresso nella viewport.
- **Canvas**, se mai servirà:
  - JS ≤ 5 KB, caricato con `import()` dopo `load`;
  - DPR limitato a 2;
  - fermo fuori viewport (IntersectionObserver) e a scheda nascosta (`visibilitychange`);
  - statico con movimento ridotto; nessuna libreria WebGL.
- **Interruttore del confronto e hover sulla carta:** solo un cambio di classe o di attributo, con transizioni in `opacity` e `transform`. INP ≤ 100 ms (`budget.md` §5).

## 7. Contenuti fuori schermo

```css
.policy section, .site-footer { content-visibility: auto; contain-intrinsic-size: auto 900px; }
```

- **Dove sì:** le sezioni delle pagine Privacy e Cookie (testo lungo) e il footer.
- **Dove no:** le sezioni con sticky, scroll-driven animations, `.aperture`, `[data-reveal]` o elementi che debordano. Il contenimento taglia ciò che esce dal box e sospende il rendering dei figli.
- **Altezza stimata.** `contain-intrinsic-size` è obbligatorio, con l'altezza stimata della sezione, per non far saltare la barra di scorrimento.
- **Condizione.** Resta solo se riduce il rendering di almeno 10 ms con CPU 4x (pannello Performance): altrimenti si toglie.

## 8. Navigazione tra pagine (verificato in build)

```astro
<!-- BaseLayout head: prefetch on intent, Chromium only, 0 KB of JS -->
<script type="speculationrules" is:inline>
  {"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"selector_matches":"[target=_blank], [download]"}}]},"eagerness":"moderate"}]}
</script>
```

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
  ::view-transition-old(root), ::view-transition-new(root) { animation-duration: 250ms; }
}
.site-header { view-transition-name: site-header; } /* at most 2 named elements per page */
```

- **Niente `<ClientRouter />`** (ADR 001 §3.5).
- **Solo prefetch, non prerender:** il prerender eseguirebbe gli script (video, tracciamento) prima della visita. Si potrà rivalutare con cro-specialist se si attiverà un analytics.

## 9. JavaScript e INP

- **Organizzazione.**
  - Uno `<script>` per componente, con import dei moduli di `src/scripts/`. Astro li raggruppa e li carica solo nelle pagine che usano il componente.
  - Gli script piccoli, sotto circa 4 KB, vengono inseriti nell'HTML: nessuna richiesta (verificato con lo script di reveal).
- **Niente listener di `scroll`, `resize` o `mousemove` per gli effetti.** Si usano IntersectionObserver, ResizeObserver, `matchMedia` e il CSS scroll-driven.
  - **«Voce corrente» di un elenco** (per esempio il contatore 01/05): un solo IntersectionObserver con `rootMargin: '100000px 0px -50% 0px'`. La radice è tutta l'area sopra la metà della viewport, quindi una voce la interseca esattamente quando il suo bordo superiore ha superato la metà, anche dopo i salti.
  - Provato il 2026-09-28: stesso comportamento del listener di scroll, nessuna lettura di layout, circa due terzi di costo in meno (rimisura, osservazione 3).
- **Gestori.** Fanno subito solo ciò che l'utente vede (classe, attributo, testo). Il resto (tracciamento, lavoro non urgente) va dopo aver ceduto il main thread:

```ts
// src/scripts/yield.ts
export const yieldToMain = (): Promise<void> =>
  'scheduler' in globalThis && 'yield' in (globalThis as any).scheduler
    ? (globalThis as any).scheduler.yield()
    : new Promise((resolve) => setTimeout(resolve, 0));

// usage in a handler
button.addEventListener('click', async () => {
  menu.showModal();                 // visible feedback first
  await yieldToMain();
  track('menu_open');               // then the rest
});
```

- **Letture e scritture del layout.** Mai una lettura (`getBoundingClientRect`, `offsetHeight`) dopo una scrittura nello stesso gestore: forza il reflow (audit `forced-reflow-insight` di Lighthouse 13).
- **Form.** Validazione al `submit` e al `blur`, mai a ogni tasto. Nessuna libreria.
- **Moduli sopra i 5 KB** non necessari al primo rendering: `import()` dinamico su visibilità o `requestIdleCallback`.

## 10. Terze parti

**Al lancio: zero**, come conferma anche il piano CRO. Sono vietati al caricamento:
- Google Fonts, Tag Manager e Analytics, pixel;
- embed di YouTube e Vimeo, mappe incorporate, widget social (compreso LinkedIn), chat;
- icone da CDN, captcha.

Mappe e LinkedIn sono **link**. **Se in futuro si aggiungono:**
- **Analytics.** ADR con cro-specialist. Script caricato solo dopo il consenso, dopo `load` e su idle; budget e misura dell'INP prima del via.

```ts
export function loadAfterConsent(src: string) {
  const inject = () => document.head.append(Object.assign(document.createElement('script'), { src, async: true }));
  'requestIdleCallback' in window ? requestIdleCallback(inject, { timeout: 3000 }) : setTimeout(inject, 1500);
}
```

- **Antispam del form (Turnstile o simili).** Caricato al primo `focusin` nel form, mai all'apertura della pagina.
- **Banner cookie.** Se servirà: HTML e CSS nostri, script ≤ 3 KB, posizione fissa (niente CLS), altezza sotto il 30% della viewport. Un blocco di testo grande può diventare l'elemento LCP.

## 11. Hosting, cache e compressione

| Risorsa | `Cache-Control` | Note |
|---|---|---|
| `/_astro/*` (CSS, JS, font, immagini: nomi con hash) | `public, max-age=31536000, immutable` | |
| `/video/*` (nomi versionati `.vN.`) | `public, max-age=31536000, immutable` | richieste `Range` → 206 |
| HTML, `sitemap-*.xml`, `robots.txt` | `public, max-age=0, must-revalidate` | con ETag: rivalidazione a 304 |
| Favicon (`/favicon.svg`, `/favicon.ico`) | `public, max-age=86400` | sempre presenti: evitano una richiesta in 404 |

Esempio per Cloudflare (file `public/_headers`) [DA VERIFICARE sull'account scelto]:

```text
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/video/*
  Cache-Control: public, max-age=31536000, immutable
```

- **`Cache-Control` sulla regola `/*`: no.** Se due regole impostano lo stesso header, i valori si uniscono [DA VERIFICARE su Workers].
- **Protocolli e compressione:** Brotli o zstd per i testi, HTTP/2 e HTTP/3 attivi.
- **Redirect e normalizzazioni:** secondo le specifiche SEO §1.4.
- **Server Node dell'anteprima (`scripts/serve.mjs`, ADR 004).** Verificato il 2026-09-28: applica le regole di questa tabella da `_headers`, comprime all'avvio (TTFB locale circa 1 ms), risponde con ETag e 304 e, dal commit `007956d`, con 206 alle richieste `Range`.
- **Verifica sull'host reale.** Header, compressione, protocollo e TTFB dall'Italia si controllano sull'anteprima e poi sullo staging dell'hosting scelto, con le tabelle e lo script di `budget.md` §6.8 (condizione C08 del verdetto G4).
- **Se la produzione resterà su Railway** (ADR 001, opzione C), oltre al `budget.md` §6.8:
  - modalità Serverless spenta: un servizio sospeso risponde lento, o con un 502, alla prima richiesta;
  - compressione: va verificato che l'edge inoltri quella del server, perché le fonti sono discordanti;
  - HTTP/3 non risulta disponibile [DA VERIFICARE]: resta HTTP/2, ammesso dai requisiti dell'ADR 001 §3.6;
  - CDN di Railway: da decidere. Se attiva, i controlli H1–H3 si ripetono senza credenziali sul dominio pubblico.

## 12. Adeguamenti al codice esistente (per la sessione principale)

Stato letto il 2026-09-28 alle 09:35, compresa la build in `dist/` delle 09:33. Il codice cambia in parallelo: ricontrollare prima di intervenire.

**Stato al 2026-09-28, commit `c28dac1`.** Tutti gli interventi di questa sezione risultano applicati (review di performance del 2026-09-28, §4; rimisura, §8). Il testo che segue resta come registro. I tre punti rimasti dopo la rimisura sono chiusi così:
- **preload del font** (`src/layouts/BaseLayout.astro:42`): **resta**, per decisione del creative-director (ADR 005). Nessuna modifica al codice;
- **maschera del reveal a righe**, che cambiava l'altezza dei passage (§6.2): applicata la correzione in flex a colonna (`global.css`, commit `007956d`);
- **contatore di `BenefitsSection`**: ora usa un IntersectionObserver invece del listener di scroll (§9; commit `007956d`).

**Da correggere subito: rotazione dell'orizzonte non funzionante.**
- In `src/components/ui/Horizon.astro`, `.horizon__strip` usa `animation: horizon-rotate linear both;` più `animation-timeline: scroll(root block)`.
- Nella build diventa `animation:linear both horizon-rotate scroll(root)`, che il browser scarta: oggi la rotazione non parte (verificato su `dist/`).
- Correzione:

```css
.horizon__strip {
  animation-name: horizon-rotate;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-timeline: scroll(root block);
  animation-range: 0 100svh;
}
```

**Da correggere: fallback metrico dei font su Android** (applicato: faccia `'Schibsted Grotesk Fallback Roboto'` in `global.css` e in `--font-sans`, §2).
- `src/layouts/BaseLayout.astro` scrive i `@font-face` a mano: `swap` è corretto. Il preload di Schibsted Grotesk resta (ADR 005).
- Il ripiego `'Schibsted Grotesk Fallback'` in `global.css` usa solo `local('Arial' | 'ArialMT' | 'Liberation Sans' | 'Helvetica')`, nessuno dei quali esiste su Android. Sul telefono di riferimento lo swap non è compensato.
- I valori per Arial coincidono con quelli calcolati da Astro. Le soluzioni sono due:
  - (a) passare alla Fonts API del §1, che genera tutti i ripieghi;
  - (b) aggiungere la faccia Roboto, con i valori calcolati da Astro per Schibsted Grotesk:

```css
@font-face {
  font-family: 'Schibsted Grotesk Fallback Roboto';
  src: local('Roboto');
  size-adjust: 104.72%;
  ascent-override: 93.25%;
  descent-override: 24.62%;
}
/* tokens.css */
--font-sans: 'Schibsted Grotesk Variable', 'Schibsted Grotesk Fallback', 'Schibsted Grotesk Fallback Roboto', sans-serif;
```

**Altri interventi**

| File | Intervento |
|---|---|
| `astro.config.mjs` | Aggiungere `build.inlineStylesheets: 'always'` e `image.service` (§1). Oggi il CSS esce come file esterno che blocca il rendering: `index.*.css`, 26,7 KB, circa 6 KB compresso, dentro il budget se inline. |
| `src/styles/global.css` | L'apertura usa `clip-path` (`inset(46% 0 46% 0)`, 1000 ms): vedi §6.3 e le decisioni richieste. `@view-transition` è già presente. |
| `src/components/layout/Header.astro` | La transizione in `clip-path` del menu (250 ms, un elemento, avviata dall'utente) è accettabile: verificarne l'INP (`budget.md` §5). |
| `src/components/ui/Media.astro` | Conforme. `sizes` vale `'100vw'` per default: per le immagini non a filo va passato sempre, secondo il §3.3. |
| `src/scripts/video.ts` | Controllo 2G, copertina nascosta a `playing`, tempo scritto una volta al secondo (§4.2); nessun `poster` nel markup. |
| `src/scripts/immersive.ts` | Preconnect all'intenzione e `referrerPolicy` (§5); anteprima inline solo su desktop, se approvata. |
| `src/scripts/marquee.ts` | Rimosso: coerente con il marquee legato allo scroll (§6.5). |
| `src/scripts/reveal.ts`, `header.ts`, `form.ts` | Conformi. Verificare l'INP (`budget.md` §5) e spostare `track()` dopo `yieldToMain()` (§9). |
| Layout di base | Aggiungere le speculation rules (§8). |
| `.gitignore` | Aggiungere `.perf/`. |

## 13. Checklist per ogni componente

- [ ] **Foto:** passano da `Media` o `ArtDirectedMedia`, con `sizes` secondo il §3.3; nessuna in `public/`.
- [ ] **Priorità:** nessun `priority`, salvo l'unica immagine LCP.
- [ ] **Animazioni:**
  - [ ] dentro `no-preference`, solo `transform` e `opacity`;
  - [ ] scroll-driven in longhand;
  - [ ] niente `data-reveal` sopra la piega;
  - [ ] lo stato nascosto ha le stesse dimensioni di quello finale (nessun CLS durante la lettura).
- [ ] **Script:** nessun listener di scroll; gestori con feedback immediato; tracciamento dopo `yieldToMain()`.
- [ ] **Terze parti:** nessuna risorsa esterna al caricamento; iframe solo dopo un clic.
- [ ] **Verifica:** controlli di `budget.md` §6.3 verdi; mediana di Lighthouse entro il budget del template.

## Ipotesi da validare
- [IPOTESI: contenitore massimo di 1200 px e cambio di griglia a 64rem, usati nel §3.3; da allineare con il design system di ui-designer.]
- [IPOTESI: il video ha audio e dura più di 15 s, come suggeriscono i controlli audio e tempo della direzione visiva. Durata, audio e sottotitoli sono DA FORNIRE.]
- [DA VERIFICARE: i portali (cassanodigitale.it, monopolidigitale.it, acquavivadigitale.com) consentono l'incorporamento in iframe.]
- [DA VERIFICARE: il server attuale del video su railway.app risponde alle richieste `Range` (206).]

## Domande aperte
1. Durata del video, presenza di parlato e file sorgente in alta qualità: chi li fornisce e quando?
2. Dopo il lancio: il cliente vuole l'anteprima inline delle esperienze anche su smartphone, o basta il link in nuova scheda?

## Decisioni richieste
- **Utente:** hosting di produzione (ADR 001). Le verifiche sull'host seguono `budget.md` §6.8.
- **Sessione principale:** se la produzione resterà su Railway, modalità Serverless spenta e una scelta sulla CDN (§11).
- **Chiuse dalla versione 0.2:**
  - autoplay del video solo da 64em; su mobile copertina e pulsante di play (`src/scripts/video.ts`);
  - «apertura» composita a otturatori (§6.3, `global.css`);
  - marquee legato allo scroll senza pulsante di pausa: per ux-designer il criterio 2.2.2 non si applica (review di accessibilità del 2026-09-28);
  - anteprima immersiva inline: rinviata a dopo il lancio (verdetto G4, §5.2);
  - preload del font: resta (ADR 005).
