---
titolo: "ADR 001 · Stack tecnologico e hosting"
owner: web-performance-specialist
contributi: [seo-technical]
stato: bozza
versione: 0.1
aggiornato: 2026-09-28
fonti: [docs/brief/linee-guida.md, docs/creativa/direzione-visiva.md, docs/seo/specifiche-tecniche.md, docs/cro/piano-misurazione.md, registry npm e CHANGELOG di Astro consultati il 2026-09-28, prototipo di misura del 2026-09-28 (docs/performance/budget.md §7)]
---

# ADR 001 · Stack tecnologico e hosting

| Campo | Valore |
|---|---|
| Stato | **Proposta**. Lo stack va confermato da seo-technical e dalla sessione principale; l'hosting è una decisione dell'utente. |
| Data | 2026-09-28 |
| Owner | web-performance-specialist; seo-technical per rendering, URL e hosting |

## 1. Contesto

- **Il sito.** Otto URL: sette pagine più la 404. Contenuti editoriali statici, un form, un video, tre anteprime di esperienze esterne. Nessuna area riservata e nessun contenuto personalizzato per utente.
- **Linee guida.**
  - §27: il sito deve essere veloce nonostante il carattere visuale, senza librerie enormi.
  - §05: motion elegante, nel rispetto di `prefers-reduced-motion`.
  - §19: video grande, autoplay muto solo se appropriato.
  - §30: componenti riusabili.
- **Soglie di CLAUDE.md.** Core Web Vitals «buoni» al 75° percentile su mobile, più il budget in `docs/performance/budget.md`.
- **Direzione visiva** (`docs/creativa/direzione-visiva.md`):
  - hero senza foto, quindi l'LCP è il testo dell'H1;
  - font Schibsted Grotesk e Fragment Mono;
  - motion legato allo scroll;
  - per pagina, al massimo un video, un marquee e una sezione sticky.
- **Codice esistente.** Lo scheletro Astro 7 è già nel repository (`package.json`, `astro.config.mjs`, `src/scripts/*.ts`, `src/components/ui/Media.astro`). Questo ADR lo conferma e fissa ciò che manca.
- **Hosting attuale.** Il cliente usa Railway, dove oggi c'è anche il file del video. Dall'ambiente di lavoro itnode.it e railway.app non sono raggiungibili.

## 2. Verifiche svolte il 2026-09-28

**Versioni sul registry npm**

| Pacchetto | Versione | Note |
|---|---|---|
| `astro` | 7.3.5 (del 2026-09-24) | 7.0.0 è del 2026-06-22. Richiede Node ≥ 22.12.0; l'ambiente ha Node 22.22.2 |
| `vite` (dipendenza di Astro) | 8.3.1 | il minificatore CSS predefinito è Lightning CSS 1.33.0 (vedi §6, rischi) |
| `sharp` | 0.35.5 | Astro 7 richiede ≥ 0.35.4. I binari precompilati funzionano (libvips 8.18.7) |
| `@astrojs/sitemap` | 3.7.4 | già in uso |
| `@fontsource-variable/schibsted-grotesk` | 5.3.0 | file latino variabile 400–900: 45,7 KB |
| `@fontsource/fragment-mono` | 5.3.0 | file latino 400: 24,6 KB |
| `lighthouse` | 13.5.0 | `@lhci/cli` 0.15.1 include ancora Lighthouse 12.6.1 |
| `web-vitals` | 6.2.2 | 3,0 KB Brotli; 4,9 KB nella versione attribution |
| `playwright` | 1.63.0 | nell'ambiente c'è la 1.56.1, con Chromium 141.0.7390.37 |

Le API di Astro 7 sono state verificate sul codice del pacchetto e con una build reale: la documentazione ufficiale non è raggiungibile dall'ambiente.
- `<Image>` e `<Picture>`:
  - `priority` produce `loading="eager"`, `decoding="sync"` e `fetchpriority="high"`;
  - senza `priority`, tutte le immagini sono `lazy` e `async`.
- `<Picture>` produce solo WebP, se non si passa `formats`. Il fallback di un JPEG resta JPEG.
- La **Fonts API** è stabile:
  - si configura con `fonts` al primo livello della configurazione;
  - `<Font preload>` emette il preload;
  - i fallback metrici sono generati in automatico.
- `compressHTML` vale `'jsx'` per impostazione predefinita (CHANGELOG 7.0.0, PR #16965).

**Prototipo di misura.** Una build Astro 7.3.5 con gli asset reali, misurata con Lighthouse 13.5.0 in emulazione mobile. Numeri completi in `budget.md` §7.
- Hero tipografica con i due font scelti: LCP 1,35 s, TBT 0 ms, CLS 0, peso totale 73 KB.
- Hero con foto in `priority`: LCP 1,51 s.

**Costo delle librerie di motion escluse**, misurato con Brotli:

| Libreria | Peso |
|---|---|
| GSAP 3.15.0 | 25,1 KB |
| ScrollTrigger | 15,8 KB |
| SplitText | 3,2 KB |
| Lenis 1.3.26 | 4,8 KB |
| **Totale** | **48,9 KB**, 4 volte il budget JS di un'intera pagina (12 KB) |

## 3. Opzioni considerate

### 3.1 Framework e rendering

| Opzione | Pro | Contro |
|---|---|---|
| **A. Astro 7.3 con output statico** (scelta) | HTML completo al build e 0 KB di JS di framework. Gli script dei componenti sono raggruppati e deduplicati per pagina: il code splitting è automatico, e gli script piccoli vengono inseriti nell'HTML (verificato). Integra `astro:assets` e la Fonts API. Lo scheletro esiste già e seo-technical ha già verificato URL e sitemap sulla 7.3.5. | Versione maggiore recente, verificata sul codice perché i documenti non sono raggiungibili. Il compilatore Rust è più rigido sull'HTML non valido. Con `compressHTML: 'jsx'` gli spazi tra elementi generati in un ciclo spariscono (verificato: «Latecnologiacambia.»). |
| B. Eleventy 3.1.6 | Zero JS, stabile. | Pipeline di immagini e font da montare a mano, fallback metrici compresi; lo scheletro andrebbe rifatto. |
| C. Next.js 16.3 con export statico | Ecosistema ampio. | Il runtime React finisce sul client anche nelle pagine statiche: contrario a «JS solo dove serve». |
| D. HTML e Vite senza framework | Controllo totale. | Componenti, immagini responsive, font e sitemap da costruire a mano. |

### 3.2 Motion

| Opzione | Pro | Contro |
|---|---|---|
| **A. CSS su `transform` e `opacity`, IntersectionObserver, scroll-driven animations come miglioramento progressivo** (scelta) | Il reveal pesa meno di 1 KB. Le animazioni girano sul compositor, senza listener di scroll. | Su Firefox, parallax e marquee legati allo scroll restano fermi (le scroll-driven animations sono ancora dietro flag). Lo split del testo si fa al build. |
| B. GSAP, ScrollTrigger, SplitText e Lenis | API comode, supporto ampio. | 48,9 KB con Brotli. Lo smooth scroll di Lenis gira sul main thread e peggiora INP e accessibilità. |

### 3.3 Font

| Opzione | Pro | Contro |
|---|---|---|
| **A. Fonts API di Astro con provider `local()`, che punta ai WOFF2 dei pacchetti @fontsource** (scelta) | Font self-hosted con URL hashati, build offline (i file arrivano da `node_modules`). `@font-face` e fallback metrici con `size-adjust` e `ascent-override` sono generati (verificato), con un solo preload. | Il file latino di ogni famiglia va indicato a mano. |
| B. `import '@fontsource-variable/…'` nel CSS | Semplicissimo. | Niente fallback metrici né preload: vanno scritti e mantenuti a mano. |
| C. Fonts API con provider `fontsource()` o `npm()` | Configurazione più corta. | Durante la build scaricano i file da api.fontsource.org o da jsDelivr (verificato nel codice di unifont 0.7.5). Qui sono bloccati e la build fallirebbe; in generale è una dipendenza esterna. |
| D. Google Fonts da CDN | — | È una terza parte al caricamento: una connessione in più e l'IP dei visitatori inviato a Google. Esclusa. |

### 3.4 Immagini

| Opzione | Pro | Contro |
|---|---|---|
| **A. `astro:assets` con sharp al build** (scelta) | AVIF, WebP e JPEG con `srcset`, dimensioni e `priority`, senza servizi esterni. | La build è più lenta con AVIF: circa 18 s per 31 varianti la prima volta (misurato), poi resta in cache. |
| B. CDN di immagini | Trasformazioni al volo. | Costo e dipendenza in più per circa 20 immagini. |

### 3.5 Navigazione tra pagine

| Opzione | Pro | Contro |
|---|---|---|
| **A. Navigazione classica, `@view-transition` in CSS e Speculation Rules (prefetch)** (scelta) | 0 KB di JS. La transizione è nativa in Chromium e Safari 18.2+; il prefetch funziona in Chromium. | Su Firefox la navigazione resta normale: non risultano view transition tra documenti fino alla 147, da verificare le versioni successive. |
| B. `<ClientRouter />` di Astro | Transizioni ovunque. | Aggiunge il JS del router e va reinizializzato a ogni navigazione. È fragile: nella 7.1 è stato corretto un bug per cui i `<video>` smettevano di funzionare dopo una navigazione (PR #17603). |

### 3.6 Hosting

**Requisiti minimi**, per qualunque opzione:
1. HTTPS con HTTP/2; HTTP/3 preferibile.
2. Compressione Brotli (o zstd) di HTML, CSS, JS, SVG, XML e JSON.
3. Header per percorso: `/_astro/*` in cache per un anno con `immutable`, HTML con `max-age=0, must-revalidate`.
4. Redirect 301 da file, secondo `docs/seo/redirect-map.csv`; 404 personalizzata con stato 404.
5. Richieste `Range` (206) per il video; punti di presenza in Italia o in Europa; TTFB p75 ≤ 0,6 s.
6. Anteprime protette con `X-Robots-Tag: noindex` (specifiche SEO §3.2).
7. Un modo per ricevere il form: sarà l'ADR 002.

| Opzione | Pro | Contro |
|---|---|---|
| **A. Cloudflare Workers, static assets** (proposta) | CDN globale. Le richieste agli asset statici sono gratuite e illimitate. Supporta `_headers` e `_redirects`, HTTP/3 e Brotli. Un Worker nello stesso progetto può fare da endpoint del form. | Per il dominio apex la zona DNS di itnode.it dovrebbe passare a Cloudflare [DA VERIFICARE, attenzione ai record MX]. I singoli file hanno un limite di 25 MiB, che vincola il video. Il codice dei redirect automatici della barra finale è da verificare: le specifiche SEO ammettono solo 301 o 308. |
| B. Netlify, piano a pagamento | `_headers` e `_redirects`; Netlify Forms come endpoint senza backend; anteprime protette. | Prezzi a crediti: il piano Free vale 300 crediti al mese, circa 15 GB di banda, e a quota esaurita il sito si sospende. Serve un piano a pagamento [DA VERIFICARE il costo]. Per Netlify Forms vanno verificati cookie e antispam. |
| C. Railway (attuale), con un container di file statici (Caddy o nginx) | Continuità di account e fatturazione; il backend del form può stare nello stesso posto. | Origine in una sola regione. Una CDN Fastly, lanciata a marzo 2026, ha avuto un incidente di cache il 30/03/2026 e una fonte la dà disattivata da maggio 2026 [DA VERIFICARE]. Egress a consumo. Brotli solo con file precompressi. Il server va configurato e mantenuto. |
| D. Vercel Pro | CDN e anteprime. | Il piano Hobby esclude l'uso commerciale; Pro costa 20 USD per utente al mese e offre funzioni inutili per un sito statico. |

## 4. Decisione proposta

1. **Astro `^7.3.5` con output statico**, senza framework UI (React, Vue, Svelte) e senza `<ClientRouter />`. Il lockfile fissa le versioni; ogni aggiornamento di Astro o Vite passa da una nuova misura (`budget.md` §5).
2. **Configurazione** come in `docs/performance/architettura.md` §1:
   - `build.inlineStylesheets: 'always'`;
   - `image.service` con AVIF q50, WebP q75 e JPEG mozjpeg q75;
   - `fonts` con provider `local()` per Schibsted Grotesk (in preload) e Fragment Mono;
   - `fallbacks: ['system-ui']`, per avere il fallback metrico anche su Roboto (Android).
   - In alternativa restano validi i `@font-face` scritti a mano già presenti in `src/layouts/BaseLayout.astro`, a una condizione: aggiungere la faccia di ripiego per Roboto (`architettura.md` §12).
3. **CSS proprio** con custom properties e stili dei componenti. Nessun framework CSS e nessuna libreria di animazione.
4. **JavaScript:** TypeScript vanilla negli `<script>` dei componenti, raggruppati da Astro, entro il budget di `budget.md` §3. Nessuna terza parte al caricamento.
5. **Motion:** opzione A (§3.2), con le regole di `architettura.md` §6.
6. **Navigazione:** opzione A (§3.5).
7. **Video:** `<video>` nativo, senza librerie di player. Il file va ospitato insieme al sito, in varianti transcodificate (`architettura.md` §4), non a lungo termine su `itnode-website-production.up.railway.app`.
8. **Hosting:** opzione A, con B come alternativa. Decide l'utente: account, costi, DNS.
9. **Misura:**
   - Lighthouse 13.5.0 via `npx` con il Chromium di Playwright;
   - INP in laboratorio con Playwright;
   - dopo il lancio, `web-vitals` 6.2.2 solo se viene attivata una misurazione (oggi il piano CRO prevede nessuno script al lancio).

## 5. Conseguenze

**Positive**
- Nel prototipo HTML, CSS, JS e font stanno molto sotto il budget, con zero terze parti.
- Le regole di performance diventano il comportamento predefinito: configurazione, `Media.astro`, `<Font>`.

**Negative e rischi**
- **Su Firefox** niente motion legato allo scroll e niente view transition: l'esperienza resta statica e completa.
- **Il CSS va scritto rispettando due regole verificate** (`architettura.md` §6):
  - le scroll-driven animations solo con proprietà longhand, perché Lightning CSS le fonde in uno shorthand non valido;
  - la «apertura» con `clip-path` ridipinge il main thread a ogni frame.
- **Con Cloudflare** servono la migrazione della zona DNS e un limite di 25 MiB per file video.
- **I font** vanno aggiornati a mano se cambia il file latino del pacchetto.

**Azioni che ne derivano**

| Azione | Chi |
|---|---|
| Adeguare configurazione e script esistenti (`architettura.md` §12) | sessione principale |
| ADR 002 sull'endpoint del form | seo-technical e cro-specialist, con web-performance-specialist |
| Scelta dell'hosting e accesso al DNS | utente |
| File sorgente del video | cliente |

## Ipotesi da validare
- [IPOTESI: Cloudflare ha punti di presenza in Italia e il TTFB p75 da mobile resta ≤ 0,6 s. Da misurare su un'anteprima.]
- [IPOTESI: il video, transcodificato, resta sotto i 25 MiB per file. Durata e risoluzione sono ignote perché railway.app è bloccato.]
- [DA VERIFICARE: stato attuale della CDN di Railway e della gestione delle richieste `Range` sul server del video.]
- [DA VERIFICARE: codice dei redirect automatici della barra finale su Cloudflare (301 o 308, non 307).]

## Domande aperte
1. Chi gestisce oggi il DNS di itnode.it? È possibile spostarlo su Cloudflare, con i record email?
2. Il cliente preferisce restare su Railway per ragioni contrattuali o di fatturazione?
3. Possiamo avere il file sorgente del video e il permesso di ospitarlo sul nuovo hosting?

## Decisioni richieste
- **Utente:** hosting (A Cloudflare, B Netlify a pagamento, C Railway) e spostamento del DNS.
- **seo-technical:** conferma dello stack e dei requisiti di hosting (§3.6), in particolare dei redirect.
- **Sessione principale:** adozione della configurazione di `architettura.md` §1 e dei pacchetti dei font.

## Fonti
- Registry npm (`npm view`, `npm pack`), consultato il 2026-09-28: versioni e date di pubblicazione della tabella §2; codice di `astro@7.3.5` e `unifont@0.7.5`.
- CHANGELOG di Astro, <https://raw.githubusercontent.com/withastro/astro/main/packages/astro/CHANGELOG.md>, consultato il 2026-09-28.
- Cloudflare, [Static assets: billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) e [Headers](https://developers.cloudflare.com/workers/static-assets/headers/): consultati il 2026-09-28 attraverso i risultati di ricerca (le pagine non sono raggiungibili dall'ambiente).
- Railway, [CDN](https://docs.railway.com/networking/cdn), [Incident report del 30 marzo 2026](https://blog.railway.com/p/incident-report-march-30-2026-authenticated-user-data-cached) e [bex.co, 2026-09-04](https://bex.co/blog/2026/09/04/railway-free-cdn-egress-bill-hetzner): consultati il 2026-09-28 attraverso i risultati di ricerca, con informazioni discordanti.
- Netlify, [Pricing](https://www.netlify.com/pricing/) e [Netli.fyi, limiti del piano Free 2026](https://netli.fyi/blog/netlify-free-plan-limits-2026); Vercel, [Hobby plan](https://vercel.com/docs/plans/hobby) e [Fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines): consultati il 2026-09-28 attraverso i risultati di ricerca.
- MDN, [@view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition), [Firefox 147 per sviluppatori](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/147) e [Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations): consultati il 2026-09-28 attraverso i risultati di ricerca.
