---
titolo: Review SEO tecnica e dati strutturati del sito costruito
owner: seo-technical
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-09-28
fonti: [docs/seo/specifiche-tecniche.md, docs/seo/dati-strutturati.md, docs/seo/redirect-map.csv, docs/seo/mappa-keyword-url.md, docs/decisioni/001-stack-tecnologico.md, dist/ (build del commit a6de19d), anteprima http://localhost:4321/, fonti web elencate in fondo]
---

# Review SEO tecnica e dati strutturati · sito costruito (Fase 5)

## Perimetro e metodo
- **Oggetto**: build `dist/` del commit `a6de19d` e anteprima `astro preview` su `http://localhost:4321/`, cioè 7 pagine più `/404.html`. Nessun file di codice o di altri membri è stato modificato.
- **Strumenti**:
  - Playwright con JavaScript disattivato, per head, JSON-LD, testo visibile, breadcrumb, blocchi dopo gli H2, link e immagini;
  - `curl` per codici di stato e tipi di contenuto;
  - `schema-dts` più `tsc` sui 7 grafi JSON-LD estratti dalla build, con un controllo negativo che fallisce come previsto;
  - verifica visiva di `/og/default.jpg` e `/brand/logo-itnode.png`.
- **Cosa non si può verificare dall'ambiente**:
  - il sito attuale, perché itnode.it è bloccato dalla rete: nessun confronto con URL, title e redirect esistenti;
  - l'hosting, che non è ancora scelto (ADR 001). `astro preview` non applica `_redirects` né `_headers`: normalizzazioni, redirect e intestazioni vanno testati in staging;
  - i link esterni (portali ed esperienze) e gli strumenti di Google (Rich Results Test).

## Esito in sintesi

| Area | Esito |
|---|---|
| Dati strutturati | Conformi al piano: grafi completi, `@id` stabili, riferimenti risolti, nessun segnaposto, VideoObject trattenuto come previsto. Consigliati tre allineamenti di testo (oss. 6–8) |
| Head | Conforme su tutte le pagine |
| Scansione e indicizzazione nel build | Conformi: robots.txt, sitemap, canonical, `noindex` solo sulla 404 |
| Rendering | Conforme: senza JavaScript ci sono tutti i contenuti, i link e i blocchi di risposta |
| Migrazione e hosting | **Non pronti per il go-live**: manca l'inventario degli URL e l'hosting è da scegliere e configurare (oss. 1–2) |

## Controlli della sezione 7 delle specifiche

| # | Controllo | Esito | Evidenza |
|---|---|---|---|
| 1 | Crawl interno | OK | 7 URL interni, tutti con barra finale e stato 200; ogni pagina è linkata dall'header o dal footer |
| 2 | Title | OK | Unici, tra 22 e 60 caratteri |
| 3 | Meta description | OK | Uniche, tra 144 e 154 caratteri |
| 4 | Titoli | OK | Un H1 per pagina, nessun salto di livello |
| 5 | Canonical | OK | Assoluti su `https://itnode.it`, con barra finale, assenti sulla 404. `/siii/?utm_source=x` risponde 200 con canonical senza parametri |
| 6 | Robots | OK nel build | `max-image-preview:large` sulle pagine indicizzabili, `noindex` solo sulla 404, nessun `X-Robots-Tag` in `_headers`. Da ripetere in produzione |
| 7 | Sitemap | OK | 7 URL, gli stessi delle pagine indicizzabili. Niente `lastmod`, `priority` né `changefreq`, come chiedono le specifiche (3.3) |
| 8 | robots.txt | OK nel build | Opzione A, con la riga `Sitemap` assoluta. Manca l'ADR (oss. 3) |
| 9 | Open Graph e X | OK | Tutti i tag presenti; `og:url` uguale al canonical; `og:image` di 1200×630 e 46 KB, che risponde 200 |
| 10 | Lingua | OK | `lang="it"` su tutte le pagine |
| 11 | JSON-LD | OK, con suggerimenti | Dettaglio nella sezione successiva. Rich Results Test e validator.schema.org vanno eseguiti in staging |
| 12 | Immagini | OK | Le 4 `<img>` hanno `alt`, `width` e `height` |
| 13 | Link esterni | Parziale | `target="_blank"` sempre con `rel="noopener"`, senza `nofollow` né `noreferrer`. Il 200 senza redirect non è verificabile: rete bloccata |
| 14 | 404 | OK in anteprima | Un URL inventato risponde 404 con la pagina personalizzata. Da ripetere sull'hosting (oss. 2) |
| 15 | Normalizzazioni | Da fare | Dipendono dall'hosting (oss. 2) |
| 16 | Redirect | Da fare | La sintassi di `_redirects` è corretta, ma il file non si può testare in anteprima |
| 17 | Staging | Da fare | L'ambiente non esiste ancora |
| 18 | Contenuto misto | OK | Nessuna risorsa `http://` |
| 19 | Favicon | OK | `.ico` con 16, 32 e 48 px, SVG e `apple-touch-icon` di 180×180, dichiarate su ogni pagina |
| 20 | Rendering senza JavaScript | OK | Ci sono H1, testi, blocchi di risposta, menu e immagini; nessun testo resta nascosto in attesa di uno script |

## Dati strutturati pagina per pagina

| Pagina | Nodi | Collegamenti | Coerenza con il testo visibile |
|---|---|---|---|
| `/` | Organization (con `founder`), WebSite, WebPage, Person | WebPage `about` → Organization; Person `worksFor` → Organization | Ragione sociale, P.IVA, indirizzo, telefono ed email nel footer; nome del fondatore e link LinkedIn visibili. Per la `description` di Organization vedi l'oss. 6 |
| `/siii/` | Organization, WebSite, WebPage, BreadcrumbList, Service | WebPage `about` → Service; Service `provider` → Organization | Breadcrumb visibile «Home / SIII» uguale al JSON-LD. Per la `description` del Service vedi l'oss. 7 |
| `/puglia-digitale/` | Organization, WebSite, WebPage, BreadcrumbList | WebPage `about` → Brand Puglia Digitale | La descrizione del Brand coincide con l'H1 |
| `/citta-digitali/` | Organization, WebSite, WebPage, BreadcrumbList | WebPage `about` → Brand Città Digitali, senza `video` | VideoObject non pubblicato: la guardia di `videoObject()` funziona, perché mancano `thumbnailUrl` e `uploadDate`. Per la descrizione del Brand vedi l'oss. 9 |
| `/contatti/` | Organization, WebSite, ContactPage, BreadcrumbList | ContactPage senza `about` (oss. 8) | Recapiti e dati societari completi in pagina |
| `/privacy-policy/`, `/cookie-policy/` | Organization, WebSite, WebPage, BreadcrumbList | — | OK |
| 404 | nessuno | — | `noindex`, senza canonical né `og:url` |

Valgono per tutte le pagine:
- un solo script `application/ld+json`, con `is:inline` e il carattere `<` protetto;
- Organization è identica ovunque, tranne `founder`, che compare solo in home insieme a Person;
- Person non ha `image`, come previsto finché l'origine delle foto non è confermata;
- il logo di Organization è `/brand/logo-itnode.png`, di 1024×1024, sopra il minimo richiesto da Google. È il ridisegno provvisorio descritto in `docs/ui/design-system.md` e va sostituito con il logo ufficiale mantenendo lo stesso URL;
- `@id` e composizione dei grafi seguono le sezioni 2 e 3 di `dati-strutturati.md`, e tutti e 7 i grafi superano il type-check di `schema-dts`.

## Osservazioni

### 1. [BLOCCANTE] Manca l'inventario degli URL del sito attuale
Blocca il go-live (G4), non lo sviluppo.
- **Dove**: `docs/seo/redirect-map.csv` (ultima riga) e `public/_redirects`.
- **Problema**: la mappa copre solo `/informativa-privacy/` e le normalizzazioni. Non sappiamo quali altri URL abbiano traffico o link: per esempio le voci di menu Tour Virtuali, Esperienze Digitali, Il Digital Marketing e L'E-Commerce.
- **Motivazione**: soglia SEO n. 4 di CLAUDE.md, «nessun URL del sito attuale che abbia valore finisce in 404». Senza dati non si può garantire.
- **Proposta**:
  1. Il cliente fornisce:
     - l'export di Search Console: Pagine, Prestazioni degli ultimi 16 mesi e Link;
     - la sitemap attuale: su WordPress `/wp-sitemap.xml`, oppure `/sitemap_index.xml` se c'è Yoast;
     - l'accesso al CMS, oppure un crawl completo fatto da una rete senza blocchi.
  2. seo-technical completa la mappa, poi `_redirects` si rigenera dal CSV, senza righe scritte a mano.
  3. La vecchia sitemap si ripubblica in `public/` per 4–8 settimane con il nome originale. Non va in conflitto con `sitemap-index.xml` di Astro: Yoast usa il trattino basso.

### 2. [BLOCCANTE] Hosting da scegliere e configurare: 404, barra finale e host
Blocca il go-live (G4).
- **Dove**: ADR 001, §3.6, con l'hosting in stato «proposta». Nel repository non c'è ancora una configurazione dell'hosting.
- **Problema**: tre comportamenti richiesti dalle specifiche dipendono dall'hosting. Oggi non sono configurati e non si possono testare.
  - **Barra finale.** Con Cloudflare Workers, cioè l'opzione A dell'ADR, `html_handling: "auto-trailing-slash"` risponde a `/siii` con un **307**, mentre le specifiche ammettono solo 301 o 308. Il dato viene dagli estratti di ricerca della documentazione di Cloudflare `[DA VERIFICARE con curl in staging]`.
  - **404.** Con Workers, `404.html` viene servita con stato 404 solo se si imposta `not_found_handling: "404-page"`.
  - **Copie su altri host.** Il sottodominio `*.workers.dev` e gli URL di anteprima servirebbero copie indicizzabili del sito.
- **Motivazione**: specifiche 1.1 (nessun altro host serve copie del sito), 1.4 (solo 301 o 308) e 3.4 (404 con stato 404); controlli 14–17.
- **Proposta, se si sceglie Cloudflare.**
  1. Configurazione del Worker:

     ```jsonc
     // wrangler.jsonc (check key names against the wrangler version in use)
     {
       "name": "itnode",
       "compatibility_date": "2026-09-28",
       "assets": {
         "directory": "./dist",
         "html_handling": "auto-trailing-slash",
         "not_found_handling": "404-page"
       },
       "workers_dev": false,
       "preview_urls": false
     }
     ```

  2. In `public/_redirects`, prima delle regole di migrazione, un 301 esplicito per ogni pagina. Cloudflare applica `_redirects` anche quando l'asset esiste, quindi queste regole prevalgono sul 307 automatico:

     ```text
     # Trailing-slash normalisation with 301 (Cloudflare's automatic redirect is a 307)
     /siii              /siii/              301
     /puglia-digitale   /puglia-digitale/   301
     /citta-digitali    /citta-digitali/    301
     /contatti          /contatti/          301
     /privacy-policy    /privacy-policy/    301
     /cookie-policy     /cookie-policy/     301
     ```

  3. Nel pannello di Cloudflare:
     - una sola Redirect Rule che porta `http://` e `www.` su `https://itnode.it`, con lo stesso percorso, codice 301 e query string conservata;
     - un certificato valido anche per `www.itnode.it`;
     - «Email Address Obfuscation» disattivata (specifiche 5.2), altrimenti nell'HTML servito cambiano il link `mailto:` e l'email visibile su cui si basa il markup;
     - impostazioni dei crawler di AI allineate all'ADR (oss. 3).

- **Con le altre opzioni**:
  - **Netlify (B)**: le sei righe vanno tolte, perché Pretty URLs aggiunge la barra finale da solo e la 404 è automatica `[DA VERIFICARE: codice 301]`;
  - **Railway (C)**: tutto va scritto nella configurazione del server (Caddy o nginx), 404 compresa.
- **Test, con qualsiasi hosting**: `curl -sI` sullo staging per ogni riga della mappa e per le varianti, compresa la conservazione della query string (controlli 14–16).

### 3. [IMPORTANTE] Politica per i crawler di AI senza ADR
- **Dove**: `public/robots.txt` e `docs/decisioni/`.
- **Problema**:
  - robots.txt implementa l'opzione A (accesso aperto), ma la scelta non è registrata. Le specifiche (3.1) la affidano al cliente, con un ADR.
  - Su Cloudflare conta anche il pannello: AI Crawl Control può bloccare i crawler a livello di rete, qualunque cosa dica il file, e il robots.txt gestito aggiunge righe a quello del repository.
  - Cloudflare applica inoltre regole predefinite ai crawler di AI, cambiate il 15 settembre 2026 secondo una fonte secondaria `[DA VERIFICARE nel pannello]`.
- **Motivazione**: CLAUDE.md (ogni decisione significativa diventa un ADR); linee guida, sez. 26 (visibilità nei motori generativi).
- **Proposta**:
  - ADR 002 «Politica per i crawler di AI», con la decisione del cliente (consigliata l'opzione A);
  - pannello dell'hosting allineato all'ADR;
  - al lancio, verifica che il `/robots.txt` servito sia identico al file del repository (controllo 8).

### 4. [IMPORTANTE] Il video dipende da railway.app, forse il vecchio host
- **Dove**: `src/data/site.ts:52-54`; `src/pages/citta-digitali.astro:75`.
- **Problema**: il `<video>` punta a `itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2`. L'host è fuori dal controllo del progetto e, dal nome, sembra l'ambiente di produzione del sito attuale `[IPOTESI]`. Dopo il passaggio del DNS ci sono due rischi:
  - se resta acceso, può continuare a servire il vecchio sito su un dominio indicizzabile;
  - se si spegne, il video sparisce.
- **Motivazione**: specifiche 1.1 e 4.5; ADR 001, §4.7.
- **Proposta**:
  1. Servire il file transcodificato da `https://itnode.it/video/citta-digitali.mp4`: la regola `/video/*` è già in `_headers`. Con Cloudflare il file deve restare sotto i 25 MiB.
  2. Poi spegnere il servizio su Railway, oppure fargli rispondere con un 301 verso `https://itnode.it/`.
  3. Verificare con Search Console e con la ricerca `site:up.railway.app itnode` che su quell'host non restino pagine indicizzate.

### 5. [IMPORTANTE] I controlli automatici non sono nel repository
- **Dove**: `seo-check.mjs` sta nello scratchpad della sessione.
- **Problema**: fuori dal repository lo script si perde a fine sessione e non si può rieseguire al lancio.
- **Motivazione**: le specifiche (sez. 7) chiedono che lo script stia nel repository e giri a ogni build.
- **Proposta**:
  - spostarlo in `scripts/seo-check.mjs`;
  - aggiungere in `package.json` lo script `"check:seo": "node scripts/seo-check.mjs dist https://itnode.it"`, da eseguire dopo `astro build`;
  - estenderlo con il confronto tra testi del JSON-LD e testo visibile (oss. 6 e 7) e con il test dei redirect letti dal CSV, via `curl` sullo staging (controllo 16).

### 6. [SUGGERIMENTO] `Organization.description` più vicina al testo della home
- **Dove**: `src/lib/structured-data.ts:39-40`; `src/pages/index.astro:49`.
- **Problema**: il markup riprende solo la terza frase del blocco visibile in home («Ha creato Città Digitali e Puglia Digitale…»). Mancano chi è ITnode e il SIII, cioè l'offerta principale. Il testo è coerente ma incompleto, e sta in due posti diversi.
- **Motivazione**:
  - `dati-strutturati.md`, §1.3: una sola fonte;
  - `mappa-keyword-url.md`, §4, blocco A: «sempre le stesse parole»;
  - i motori generativi descrivono l'azienda anche a partire da questo testo.
- **Proposta**: il testo va in `src/data/site.ts` e si usa sia nella home sia nel markup.

  ```ts
  // src/data/site.ts, inside `site`
  /** Answer block A (docs/seo/mappa-keyword-url.md §4): Home statement and Organization.description. */
  description:
    'ITnode è un’azienda di Acquaviva delle Fonti, in provincia di Bari, che rende gli spazi fisici esplorabili sul Web. Crea Siti Interattivi Immersivi (SIII) per le imprese. Ha creato Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale che portano online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.',

  // src/lib/structured-data.ts, organization()
  description: site.description,
  ```

  Se il paragrafo di `index.astro:49` non contiene markup, diventa `{site.description}`. Se lo contiene, basta che lo script dell'oss. 5 confronti i due testi.

### 7. [SUGGERIMENTO] `Service.description` allineata al copy definitivo
- **Dove**: `src/lib/structured-data.ts:141-142`.
- **Problema**: la descrizione viene dalle linee guida. Il blocco di risposta B pubblicato su `/siii/` usa parole diverse.
- **Motivazione**: `dati-strutturati.md`, §5.2, chiede di allinearla al copy definitivo.
- **Proposta**:

  ```ts
  description:
    'Un Sito Interattivo Immersivo (SIII) replica digitalmente gli spazi fisici di un’impresa e li trasforma in un ambiente navigabile da desktop e da smartphone. Chi lo visita non legge una pagina: entra, esplora gli ambienti e trova al loro interno prodotti, video, informazioni e azioni commerciali.',
  ```

  Meglio ancora, come nell'oss. 6: una costante condivisa con il paragrafo `define__text` di `siii.astro`.

### 8. [SUGGERIMENTO] ContactPage senza `about`
- **Dove**: `src/pages/contatti.astro:17`.
- **Problema**: manca `about` → Organization.
- **Motivazione**: è previsto da `dati-strutturati.md`, §5.5. Dichiara che la pagina parla dell'azienda di cui riporta i recapiti.
- **Proposta**:

  ```ts
  import { pageGraph, ids } from '../lib/structured-data';
  const schema = pageGraph('contatti', [], { type: 'ContactPage', about: ids.organization });
  ```

  Facoltativo: la pagina mostra nome, ruolo e LinkedIn del fondatore, quindi può pubblicare anche `person()`, con lo stesso `@id` della home.

### 9. [SUGGERIMENTO] Il nome del prodotto compare in due ordini diversi
- **Dove**: `src/pages/citta-digitali.astro:55`, sottotitolo dell'hero.
- **Problema**: il sottotitolo dice «Siti Immersivi Interattivi». Il resto del sito, il glossario e la descrizione del Brand nel JSON-LD dicono «Siti Interattivi Immersivi».
- **Motivazione**: il nome di un'entità deve restare sempre uguale; vedi brief DR2 e `mappa-keyword-url.md`.
- **Proposta**: allineare quando il cliente chiude DR2 (copywriter-brand).

### 10. [SUGGERIMENTO] Preparare i dati del video per il VideoObject
- **Dove**: `src/data/site.ts:52-54`; `src/pages/citta-digitali.astro:26-29`; `src/lib/structured-data.ts:168`.
- **Problema**:
  - la guardia funziona, ma quando arriveranno i dati bisognerà cambiare il codice, non solo i dati: oggi la chiamata passa solo `name` e `description`;
  - `contentUrl` non viene reso assoluto, a differenza di `thumbnailUrl`;
  - la descrizione visibile è una sola frase breve («Il progetto Città Digitali, raccontato per immagini.»), mentre le specifiche (4.5) chiedono una o due frasi che dicano cosa mostra il video.
- **Motivazione**: `dati-strutturati.md`, §6 (poster e durata si ricavano dal file, nessun valore inventato); specifiche 4.5.
- **Proposta**:

  ```ts
  // src/data/site.ts
  export const video = {
    cittaDigitali: {
      src: 'https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2', // → '/video/citta-digitali.mp4' (obs. 4)
      thumbnail: '',   // e.g. '/video/citta-digitali-poster.jpg': a real frame chosen by creative-director
      uploadDate: '',  // ISO 8601 with time zone, from the client
      duration: '',    // ISO 8601 from ffprobe, e.g. 'PT1M45S'
    },
  } as const;

  // src/pages/citta-digitali.astro
  const v = video.cittaDigitali;
  const videoNode = videoObject({
    name: videoTitle.replace(/\.$/, ''),
    description: videoText,
    thumbnailUrl: v.thumbnail,
    uploadDate: v.uploadDate,
    duration: v.duration,
    contentUrl: v.src,
  });
  // <VideoSection … src={v.src} />

  // src/lib/structured-data.ts, videoObject()
  ...(video.contentUrl ? { contentUrl: abs(video.contentUrl) } : {}),
  ```

  `abs()` lascia invariato un URL già assoluto. La seconda frase della descrizione la scrive copywriter-content, con fatti forniti dal cliente.

### 11. [SUGGERIMENTO] Blocchi di risposta dopo gli H2
- **Dove**: `/`, sezione «I tre mondi ITnode»; `/siii/`, sezione «Cosa si può fare dentro un SIII».
- **Problema**: i blocchi A–G di `mappa-keyword-url.md` sono nell'HTML statico e visibili senza JavaScript. Quasi tutti sono il primo paragrafo sotto l'H2 indicato, con due eccezioni:
  - il blocco F è il secondo paragrafo, dopo la frase breve «Un’impresa. Un territorio. Una rete di città.»;
  - l'H2 in forma di domanda «Cosa si può fare dentro un SIII» è seguito da un passaggio di 5 parole, e la risposta arriva solo negli H3.
- **Motivazione**: `mappa-keyword-url.md`, §4: il blocco è il primo paragrafo sotto l'heading.
- **Proposta**: decide seo-content, che è owner dei blocchi. Non ci sono impatti tecnici.

### 12. [SUGGERIMENTO] `interest-cohort` in Permissions-Policy
- **Dove**: `public/_headers:15`.
- **Problema**: FLoC è stato ritirato e Chrome segnala `interest-cohort` in console come funzione non riconosciuta.
- **Motivazione**: è solo rumore nella console, senza effetti SEO.
- **Proposta**: `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Owner: web-performance-specialist.

## Cosa manca per il go-live
Il file `docs/seo/checklist-lancio.md` non esiste ancora: è il mio prossimo passo. Per la SEO mancano questi punti.

**Prima del lancio**
1. Inventario degli URL, mappa dei redirect completa e `_redirects` rigenerato (oss. 1).
2. Hosting scelto e configurato: 404, barra finale con 301, normalizzazione di `http` e `www`, sottodomini tecnici disattivati, email non offuscata (oss. 2).
3. Staging protetto con autenticazione e con `X-Robots-Tag: noindex, nofollow` impostato dall'hosting. Lì si eseguono i controlli 13–17, da una rete senza blocchi.
4. ADR 002 sui crawler di AI, con il pannello dell'hosting allineato (oss. 3).
5. Video spostato su itnode.it e decisione sul futuro dell'host Railway (oss. 4).
6. Rich Results Test e validator.schema.org su home e Città Digitali.
7. Conferma dei dati nel markup: ragione sociale, P.IVA, sede legale, URL finali dei portali, nome e ruolo del fondatore, logo ufficiale e profili per `sameAs`.
8. Search Console: proprietà di dominio verificata via DNS prima del cambio, così i dati restano continui. Bing Webmaster Tools: si può importare da Search Console.
9. Script dei controlli nel repository (oss. 5).

**Al lancio**
- Autenticazione e `X-Robots-Tag` rimossi.
- Invio di `sitemap-index.xml` e della vecchia sitemap.
- Test di redirect e normalizzazioni in produzione.
- Nessun `noindex` residuo e canonical corretti.

**Per 4–8 settimane dopo il lancio**
- In Search Console: rapporti Pagine, Statistiche di scansione e Breadcrumb.
- Errori 404 nei log dell'hosting.
- Clic, impressioni e posizioni degli URL migrati.
- URL della sitemap inviati e indicizzati.

**Fuori dal perimetro SEO, ma bloccante per G4**: la soglia legale. Nel footer mancano REA e capitale sociale (`src/data/site.ts:29-30`), e la sede è indicata solo come «Sede operativa».

## Verdetto di dominio (SEO tecnica)
**Build approvato con riserva; go-live non ancora possibile.**
- Nel codice non ci sono bloccanti. Meta, canonical, sitemap, robots.txt, rendering e dati strutturati rispettano le specifiche; le osservazioni 6–12 sono miglioramenti.
- Il go-live resta bloccato dalle osservazioni 1 e 2: servono inventario e redirect completi e un hosting configurato e verificato. Anche le osservazioni 3–5 vanno chiuse prima di G4.
- Il verdetto di gate spetta al creative-director.

## Fonti
Consultate il 2026-09-28 tramite gli estratti dei risultati di ricerca, perché le pagine non sono raggiungibili dall'ambiente.
- Cloudflare, HTML handling (307 con `auto-trailing-slash`): https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling
- Cloudflare, generazione statica e 404 personalizzata (`not_found_handling: "404-page"`): https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/
- Cloudflare, Redirects (le regole di `_redirects` si applicano anche quando l'asset esiste): https://developers.cloudflare.com/workers/static-assets/redirects/
- Cloudflare, opzioni per il traffico dei crawler di AI: https://blog.cloudflare.com/content-independence-day-ai-options/
- Cloudflare, robots.txt gestito: https://blog.cloudflare.com/control-content-use-for-ai-training/
- Nuove regole predefinite dal 15 settembre 2026 (fonte secondaria): https://o-c.do/guides/cloudflare-block-ai-crawlers

## Ipotesi da validare
- L'hosting sarà Cloudflare Workers (ADR 001, opzione A): le configurazioni dell'oss. 2 valgono per questa scelta.
- Il sito attuale è su WordPress: da questo dipendono i percorsi delle sitemap (oss. 1).
- `itnode-website-production.up.railway.app` è l'ambiente del sito attuale (oss. 4).
- La sede di Via Sant'Anna 34 è anche la sede legale.

## Domande aperte
1. **Cliente**: export di Search Console, sitemap attuale, accesso al CMS o all'hosting attuale, backlink.
2. **Utente**: quale hosting? Chi gestisce il DNS di itnode.it?
3. **Cliente**: quale politica per i crawler di AI (A, B o C)?
4. **Cliente**: file originale del video, data di prima pubblicazione e futuro del servizio su Railway.
5. **Cliente**: profili ufficiali per `sameAs`, domini finali dei portali, logo vettoriale ufficiale, dati societari completi e sede legale.
6. **seo-content**: posizione del blocco F e risposta sotto «Cosa si può fare dentro un SIII» (oss. 11).

## Decisioni richieste
- **Utente**: hosting e DNS (ADR 001). Sblocca l'oss. 2.
- **Cliente, con ADR 002**: politica per i crawler di AI.
- **seo-technical** (proposta, da riportare nelle specifiche e nel CSV):
  - con Cloudflare, la barra finale si normalizza con regole 301 esplicite in `_redirects`;
  - per le varianti `www` e `http` dei vecchi URL si tollerano due salti, cioè la normalizzazione dell'host più la regola di percorso. L'obiettivo resta un salto solo, dove l'hosting lo consente.
- **Chi applica le osservazioni**:
  - sessione principale: 5, 6, 7, 8 e 10, sul codice;
  - copywriter-brand e seo-content: 9 e 11, prima dello sviluppo;
  - web-performance-specialist: 12.
