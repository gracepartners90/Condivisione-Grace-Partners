---
titolo: Ricontrollo della carta di /citta-digitali/ e dei colori forzati dopo c98f565
owner: ui-designer
contributi: []
stato: bozza
versione: 0.1
aggiornato: 2026-10-05
fonti: [commit c98f565, staging http://localhost:4321 (dist del 2026-10-05, 16:36), variante «in pubblicazione» http://localhost:4322, build provata della proposta (copia nello scratchpad), docs/review/2026-10-05-carta-citta-digitali-pagina-ui-designer.md, docs/review/2026-10-05-carta-citta-digitali-pagina-ux-designer.md, docs/ux/accessibilita.md (§2.14, §4.3, Appendice D), docs/creativa/direzione-visiva.md (0.7, §1.4), docs/ui/design-system.md (0.7, §1.8), misure Playwright 1.56 (Chromium 141) e axe-core 4.13 del 2026-10-05]
---

# Ricontrollo della carta di `/citta-digitali/` e dei colori forzati (commit c98f565)

## In sintesi

- **La carta applicata è quella provata.**
  - A 10 larghezze da 320 a 1920 px, con e senza la spaziatura di WCAG 1.4.12, la geometria è identica a quella della build della proposta: carta, 42 punti, 3 nodi, schede, legenda, altezza della sezione e della pagina.
  - Nel modo normale la sezione è identica pixel per pixel a 390, 768, 1024 e 1440 px.
  - L'unica differenza è voluta: la descrizione L6.
- **Accessibilità.**
  - La descrizione L6 si legge (138 caratteri) e l'albero di accessibilità è quello previsto.
  - axe: 0 violazioni.
  - Nei colori forzati punti e nodi sono in `CanvasText` con l'anello in `Canvas`, con la palette chiara e con la scura.
- **A 390 px la pagina cresce di 32,8 px:** 16 px di margine più 16,8 px di legenda. Sono i 32 px misurati dalla sessione principale.
- **Colori forzati: due casi che il controllo dell'Appendice D di `accessibilita.md` non vede.**
  - **CF1, pagina 404.** I tre nodi perdono il punto e mostrano sempre l'anello del passaggio del mouse, quindi diventano anelli vuoti. Spariscono anche le tacche della scala. C'è una correzione provata, solo CSS.
  - **CF2, tacche disegnate con gradienti.** Spariscono sul filo dei capitoli, nel confronto di SIII, nella variante «in pubblicazione» e nei segni di taglio dello staging. La linea resta. Proposta: residui accettati.
  - **CF3.** Un'aggiunta al controllo, per trovare questi casi.
- **Design system 0.7:** colori forzati in §1.8, carta di `/citta-digitali/` applicata in §2.4 e §3.8.

## 1. Rimisura della carta di `/citta-digitali/`

**Come.**
- **Confronto.** Lo staging (commit c98f565) contro la build della proposta, servita di nuovo dalla copia nello scratchpad. Le due build differiscono, in questa sezione, solo per la descrizione: P3 con i tre nomi, L6 senza.
- **Strumenti:** Playwright (Chromium 141) e axe-core 4.13.

| Prova | Esito |
|---|---|
| Geometria (320, 360, 390, 414, 768, 1024, 1100, 1280, 1440 e 1920 px, con e senza 1.4.12) | Identica alla build provata a tutte le 20 combinazioni: carta, 42 punti, 3 nodi Ø 10, posizioni delle schede, legenda, altezza della sezione e della pagina |
| Pixel della sezione `#portale` | Modo normale: identica a 390, 768, 1024 e 1440 px. Colori forzati: identica a 390 e 768. A 1024 e 1440 cambia solo il punto della voce corrente nell'header sticky, che ora resta (6 bis, F2) |
| Nodi accesi dalle schede | Focus su ogni «Esplora» e passaggio del mouse su ogni scheda: il nodo va a 15 px e si spegne quando il puntatore esce, a tutte le 10 larghezze |
| Legenda | 16 px sotto la carta. Su una riga da 360 px (alta 16,8–18,2 px), su due a 320. Con 1.4.12 va su due righe a 320, 360, 390 e 768 px. Mai sovrapposta né tagliata. Da 1280 px resta dentro la sezione, con almeno 195 px di margine |
| Crescita della pagina sotto 1024 px | 32,8 px a 390 (16 di margine più 16,8 di legenda); 49,6 a 320, dove la legenda va su due righe |
| Scorrimento orizzontale | Nessuno, da 320 a 1920 px, anche con 1.4.12 |
| Descrizione | `role="img"` con L6: «Carta d’Italia con le città di Città Digitali. Sono in Lombardia, Lazio, Campania, Puglia, Calabria e Sicilia, la maggior parte in Puglia.» (138 caratteri). La descrizione della Home è invariata |
| Albero di accessibilità (390 e 1440 px) | Figura «Ogni punto è una città di Città Digitali» → immagine con L6 → testo della legenda → lista delle tre città (H3 e link) |
| axe-core | 0 violazioni a 390 px, 1440 px e 1440 px con movimento ridotto. Voci da rivedere invariate: color-contrast (6, 9 e 4) e video-caption (1) |
| Colori forzati (palette chiara e scura, 390 e 1440 px) | Punti e nodi in `CanvasText` con l'anello in `Canvas`; legenda e costa nei colori del tema. Al focus su «Esplora» il link ha il contorno di sistema e il nodo si accende. Nessun buco nella costa |
| Peso dell'HTML (zlib livello 9) | 143,8 KB; 28,7 KB con gzip (+0,78 KB, compresi i blocchi dei colori forzati), 23,7 KB con brotli; budget T2 di 35 KB |

**Esito.** La carta è conforme alla proposta approvata (DV 0.7 §1.4, regola 9) e alla decisione di ux-designer sulla descrizione. Non c'è niente da correggere.
- Una nota per la DV, da allineare: §1.4 dice ancora che la descrizione di `/citta-digitali/` ha i tre nomi («Tra queste: Varese, Altamura e Caltanissetta»). Il sito usa L6, senza nomi.

## 2. Colori forzati: casi fuori dall'Appendice D

Il controllo dell'Appendice D cerca i segni il cui colore di fondo diventa quello della tela. Sullo staging trova solo il residuo accettato `a::after`, su tutte le 8 pagine, a 390 e 1440 px, con la palette chiara e con la scura. Ho verificato.

Due casi gli sfuggono, perché lì il segno non sta nel colore di fondo:
- **i gradienti:** nei colori forzati Chromium toglie `background-image`, e il calcolo dà `none` per ogni strato;
- **i contorni trasparenti:** un contorno trasparente a riposo viene dipinto nel colore del tema, quindi diventa visibile.

### CF1 · [SUGGERIMENTO] Pagina 404: i nodi diventano anelli vuoti e la scala perde le tacche

- **Dove.** `src/pages/404.astro`, `.nf__node` e `.nf__worlds::before` (DS §2.1, «Variante 404»).
- **Problema.**
  - **Il nodo.** Il punto è uno sfondo (`--node`) e sparisce. L'anello del passaggio del mouse e del focus è un contorno trasparente a riposo (`outline: 1px solid transparent`), e i colori forzati lo dipingono in `LinkText`. Così ognuno dei tre mondi mostra a riposo un anello vuoto, e passaggio del mouse e focus non cambiano più il nodo.
  - **La scala.** Le tacche ogni 5°, 15° e 45° sono gradienti e spariscono. Resta la linea, che è un bordo.
- **Motivazione.**
  - `accessibilita.md` §2.14: nei colori forzati non sparisce nessun segno che porti informazione e nessun indicatore di stato.
  - È lo stesso difetto di F4 sul Nodo: l'anello vuoto è il segno della sede.
  - La variante 404 è un Orizzonte (DS §2.1), e le tacche dell'Orizzonte, che sono tratti SVG, nei colori forzati restano.
  - Il focus resta visibile, perché il link ha il suo contorno di sistema: per questo la priorità è `[SUGGERIMENTO]`, come F2–F4.
- **Proposta.** In fondo agli stili della pagina:
  - punto in `LinkText`, perché sta dentro il link;
  - anello solo al passaggio del mouse e al focus;
  - tacche in `CanvasText`.

```diff
diff --git a/src/pages/404.astro b/src/pages/404.astro
index f401435..f97ca32 100644
--- a/src/pages/404.astro
+++ b/src/pages/404.astro
@@ -222,4 +222,26 @@ const worlds = [
       grid-column: 1 / span 8;
     }
   }
+
+  /* Forced colors (Windows contrast themes): the system paints backgrounds in its canvas colour, drops
+     gradients and paints the transparent outline that hides the ring at rest. Dot in the link colour,
+     ring only on hover and focus, ticks redrawn like the Horizon's (accessibilita.md §2.14). */
+  @media (forced-colors: active) {
+    .nf__worlds::before {
+      forced-color-adjust: none;
+      background:
+        linear-gradient(to right, CanvasText 0 1px, transparent 1px) 0 0 / calc(var(--deg) * 9) 20px repeat-x,
+        linear-gradient(to right, CanvasText 0 1px, transparent 1px) 0 0 / calc(var(--deg) * 3) 12px repeat-x,
+        linear-gradient(to right, CanvasText 0 1px, transparent 1px) 0 0 / var(--deg) 6px repeat-x;
+    }
+
+    .nf__node {
+      forced-color-adjust: none;
+      background: LinkText;
+    }
+
+    .nf__world-link:is(:hover, :focus-visible) .nf__node {
+      outline-color: LinkText;
+    }
+  }
 </style>
```

- **Provato** su una copia del repository al commit c98f565, con la patch, la build e nessuno stile iniettato.
  - `astro check`: 0 errori. `git apply --check` pulito sul repository.
  - Le altre 7 pagine restano identiche byte per byte allo staging.
  - **Colori forzati**, palette chiara e scura:
    - a riposo il punto è in `LinkText` e l'anello resta trasparente;
    - al focus e al passaggio del mouse l'anello è in `LinkText`, e il link ha il suo contorno di sistema;
    - le tacche ci sono.
  - **Modo normale:** pagina identica pixel per pixel a 390 e 1440 px, a riposo e con il focus su un mondo.
  - **Peso:** +0,05 KB con gzip.

### CF2 · [SUGGERIMENTO] Tacche disegnate con gradienti: residui da accettare

- **Dove** (misurato sullo staging e sulla variante «in pubblicazione»):
  - `.chapter__rule` (`ProjectShowcase.astro`): le tacche minori del filo dei capitoli, in `--line`;
  - `.compare__horizon` (`src/pages/siii.astro`): le tacche dell'orizzonte nel confronto di SIII, al 40%;
  - `.slot-pub__horizon` (`SlotPending.astro`): le tacche del filo nella variante «in pubblicazione»;
  - `.media-slot::before` (`Media.astro`): i segni di taglio dei segnaposto, solo in staging.
- **Problema.** Nei colori forzati spariscono, perché sono gradienti. Resta la linea, che è un bordo.
- **Motivazione.** Sono trame del filo, non segni che portano un dato.
  - Le tacche in `--line` sono decorative per regola (DS §1.1: sotto 3:1, «solo decorativo»).
  - La tacca che porta il rilevamento del capitolo è uno pseudo-elemento a sé, ed è già corretta dalla 6 bis.
  - La variante «in pubblicazione» è tutta `aria-hidden` e tipografica.
  - I segni di taglio non vanno in produzione.
- **Proposta.**
  - Aggiungerli ai residui accettati di §2.14.
  - Se ux-designer preferisce la coerenza con l'Orizzonte anche nella variante «in pubblicazione», la tecnica è quella di CF1: `forced-color-adjust: none` e il gradiente in `CanvasText`.

### CF3 · [SUGGERIMENTO] Il controllo dell'Appendice D non vede gradienti e contorni trasparenti

- **Dove.** `docs/ux/accessibilita.md`, Appendice D (`fc-check.mjs`).
- **Problema.** I due casi qui sopra passano il controllo: CF1 sulla 404 e le tacche di CF2.
- **Proposta.** Aggiungere un confronto tra modo normale e colori forzati, sugli stessi elementi:
  - un gradiente nel modo normale che nei colori forzati diventa `none`;
  - un contorno trasparente nel modo normale che nei colori forzati diventa visibile.
  - **Esito atteso sullo staging di oggi:**
    - sulle 8 pagine, tutti i casi di CF2 (`.media-slot::before` solo in staging; `.slot-pub__horizon` solo nella variante «in pubblicazione»);
    - sulla 404, le tacche e il contorno di `.nf__node` (CF1).
  - **Dopo CF1** restano solo i residui di CF2.

```js
// fc-extra.mjs: what the Appendix D scan cannot see, comparing normal mode and forced colors.
// (a) marks drawn with a gradient: forced colors set background-image to none;
// (b) rings hidden with a transparent outline at rest: forced colors paint them, always on.
import { chromium } from 'playwright';
const base = process.argv[2] ?? 'http://localhost:4321';
const pages = ['/', '/siii/', '/puglia-digitale/', '/citta-digitali/', '/contatti/', '/privacy-policy/', '/cookie-policy/', '/404.html'];
const collect = () => {
  const out = {};
  document.querySelectorAll('body *').forEach((el, i) => {
    for (const pseudo of [null, '::before', '::after']) {
      const s = getComputedStyle(el, pseudo);
      if (s.display === 'none' || (pseudo && s.content === 'none')) continue;
      out[`${i}${pseudo ?? ''}`] = {
        sig: `${el.tagName.toLowerCase()}.${el.classList[0] ?? ''}${pseudo ?? ''}`,
        grad: s.backgroundImage.includes('gradient') && s.maskImage === 'none',
        noImage: s.backgroundImage.split(',').every((x) => x.trim() === 'none'),
        outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 ? s.outlineColor : null,
      };
    }
  });
  return out;
};
const clear = (c) => !c || c === 'transparent' || /rgba\(.*,\s*0\)$/.test(c);
const browser = await chromium.launch();
for (const w of [390, 1440]) for (const path of pages) {
  const snap = {};
  for (const forced of ['none', 'active']) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce', forcedColors: forced });
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    snap[forced] = await page.evaluate(collect);
    await ctx.close();
  }
  const lost = new Set(), ringOn = new Set();
  for (const [k, n] of Object.entries(snap.none)) {
    const f = snap.active[k];
    if (!f) continue;
    if (n.grad && f.noImage) lost.add(n.sig);
    if (n.outline && clear(n.outline) && f.outline && !clear(f.outline)) ringOn.add(n.sig);
  }
  console.log(`${path} @${w}: gradienti persi ${[...lost].join(', ') || '—'} · contorni trasparenti dipinti ${[...ringOn].join(', ') || '—'}`);
}
await browser.close();
```

- **Collaudato così com'è** (Playwright 1.56, Chromium 141) con l'esito atteso qui sopra:
  - sullo staging;
  - sulla variante «in pubblicazione»;
  - sulla copia con CF1, dove la 404 risulta pulita.
  - Il confronto per indice regge perché nei due modi la pagina è la stessa build, con gli stessi elementi nello stesso ordine.

## Verdetto di dominio (UI)

- **Carta di `/citta-digitali/`: conforme.** Corrisponde alla proposta approvata e alla DV 0.7, con la descrizione L6 decisa da ux-designer. Resta da allineare la DV §1.4.
- **Colori forzati: P6 e 6 bis conformi** a §2.14, nelle pagine e negli stati che il controllo dell'Appendice D copre.
- **CF1–CF3 sono suggerimenti per ux-designer**, owner dell'accessibilità. Nessuno blocca il go-live, perché WCAG 2.2 AA non chiede di supportare i colori forzati. CF1 è l'unico caso in cui l'anello di uno stato resta sempre acceso.

## Ipotesi da validare

- **Colori forzati solo emulati in Chromium:** Windows con un tema reale `[DA FORNIRE: dispositivo o servizio di test]` (`accessibilita.md` §4.3). Che gradienti e contorni trasparenti si comportino così l'ho misurato solo in Chromium; Firefox con i colori sostituiti `[DA VERIFICARE]`.
- **Browser.** Le misure della carta valgono in Chromium; Safari iOS e Firefox `[DA VERIFICARE]`.

## Domande aperte

- **ux-designer:**
  - CF1;
  - i residui di CF2;
  - l'aggiunta CF3 all'Appendice D.
- **creative-director:** allineare la DV §1.4 alla descrizione L6 di `/citta-digitali/`.

## Decisioni richieste

1. **ux-designer:** CF1 (applicare la patch) e CF2 (accettare i residui o correggerli con la stessa tecnica).
2. **Sessione principale:** se CF1 passa, applicare la patch alla 404. Non serve altro: solo CSS, una pagina.
