---
titolo: Specifiche tecniche SEO
owner: seo-technical
contributi: [seo-content, ux-designer, web-performance-specialist, copywriter-content]
stato: bozza
versione: 0.2
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/seo/ricerca-keyword.md, docs/strategia/citta-digitali-elenco.md (§1, §5), conferma dell'utente del 2026-10-05 sul dominio di Città Digitali, docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, pacchetti npm astro@7.3.5 e @astrojs/sitemap@3.7.4, fonti web elencate in fondo]
---

# Specifiche tecniche SEO

Regole per sviluppare il sito in Astro 7 (output statico) e per verificarlo prima del lancio.
- Dati strutturati: `docs/seo/dati-strutturati.md`.
- Redirect: `docs/seo/redirect-map.csv`.
- Testi definitivi di title, description e H1: `docs/seo/mappa-keyword-url.md` (seo-content).

## 1. Dominio e URL

### 1.1 Dominio canonico
- **Proposta: `https://itnode.it`**, cioè HTTPS senza www. Il sito attuale risponde su questo host e gli URL indicizzati sono qui: mantenerlo evita di cambiare host durante la migrazione. `[DA VERIFICARE: comportamento attuale di www.itnode.it e redirect esistenti, perché itnode.it non è raggiungibile dall'ambiente]`
- `http://` e `www.itnode.it` rispondono con 301 verso `https://itnode.it` e mantengono il percorso. Il certificato TLS deve coprire anche `www.itnode.it`.
- HSTS (`Strict-Transport-Security: max-age=31536000`) solo dopo aver verificato che tutti i sottodomini in uso siano in HTTPS. Per ora niente `preload`.
- Nessun altro host deve servire copie del sito: gli ambienti di anteprima sono protetti (sezione 3.2). `itnode-website-production.up.railway.app` oggi ospita il video di Città Digitali e non deve servire pagine indicizzabili `[DA VERIFICARE: cosa pubblica oggi quell'host]`.

### 1.2 URL delle pagine

| Pagina | URL canonico | File Astro | Indicizzabile | In sitemap |
|---|---|---|---|---|
| Home | `https://itnode.it/` | `src/pages/index.astro` | sì | sì |
| SIII | `https://itnode.it/siii/` | `src/pages/siii.astro` | sì | sì |
| Puglia Digitale | `https://itnode.it/puglia-digitale/` | `src/pages/puglia-digitale.astro` | sì | sì |
| Città Digitali | `https://itnode.it/citta-digitali/` | `src/pages/citta-digitali.astro` | sì | sì |
| Contatti | `https://itnode.it/contatti/` | `src/pages/contatti.astro` | sì | sì |
| Privacy Policy | `https://itnode.it/privacy-policy/` | `src/pages/privacy-policy.astro` | sì (¹) | sì (¹) |
| Cookie Policy | `https://itnode.it/cookie-policy/` | `src/pages/cookie-policy.astro` | sì (¹) | sì (¹) |
| 404 | nessuno (file `/404.html`) | `src/pages/404.astro` | no | no (esclusa in automatico) |

(¹) Solo se il testo delle informative è nell'HTML. Se arriva da uno script di terze parti (un embed), la pagina va in `noindex, follow` e fuori dalla sitemap: senza testo nell'HTML sarebbe una pagina vuota.

Negli altri documenti i percorsi possono comparire senza barra finale (`/siii`): è una forma abbreviata. L'URL canonico è sempre quello della tabella.

### 1.3 Regole degli URL
- Minuscole e parole separate da trattini. Niente accenti (`citta-digitali`), date, estensioni o parametri.
- Un solo livello: tutte le pagine sono figlie della home. Eventuali pagine future, come casi studio o articoli, avranno una cartella dedicata, per esempio `/progetti/<slug>/` `[IPOTESI]`.
- **Barra finale sempre presente**, per tre motivi:
  - coincide con l'output predefinito di Astro (`build.format: 'directory'`, cioè `siii/index.html`);
  - gli hosting statici servono questo formato su `/siii/` senza configurazioni particolari;
  - è la convenzione del sito attuale (`/informativa-privacy/`).
- Gli slug pubblicati non cambiano più. Se cambiano: redirect 301 e una riga nella mappa dei redirect.

Configurazione, verificata sui tipi di `astro@7.3.5`:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://itnode.it',       // used for canonical URLs and the sitemap
  trailingSlash: 'always',         // dev server enforces the production policy
  build: { format: 'directory' },  // default: /siii/index.html served at /siii/
  integrations: [sitemap()],
});
```

Due avvertenze:
- Con le pagine statiche Astro non genera i redirect della barra finale: li gestisce l'hosting (sezione 1.4).
- L'opzione `redirects` di `astro.config` senza adapter produce solo un `<meta http-equiv="refresh">`, senza codice di stato. **Non va usata per la migrazione.**

### 1.4 Normalizzazioni lato hosting

| Richiesta | Risposta attesa |
|---|---|
| `http://itnode.it/<percorso>` | 301 → `https://itnode.it/<percorso>` |
| `https://www.itnode.it/<percorso>` e `http://www.itnode.it/<percorso>` | 301 → `https://itnode.it/<percorso>` in un solo salto |
| `https://itnode.it/siii` (senza barra finale) | 301 → `https://itnode.it/siii/`, e così per ogni pagina |
| URL presente nella mappa dei redirect | 301 → URL finale in un solo salto, anche per le varianti con www e senza barra |
| `https://itnode.it/siii/?utm_source=…` | 200, con canonical senza parametri |
| URL inesistente | 404 con la pagina 404 del sito |

- **Codici.** 301, oppure 308 solo se è il comportamento automatico dell'hosting. Mai 302 o 307, meta refresh o JavaScript. Su alcuni hosting il codice predefinito delle regole è 302: va sempre indicato in modo esplicito.
- **File con estensione** (`/robots.txt`, `/sitemap-index.xml`, immagini): nessuna barra finale.
- **Maiuscole**: nessuna regola, quindi `/SIII/` risponde 404.
- **Implementazione**: nel formato dell'hosting scelto (ADR sullo stack di web-performance-specialist). Esempio con un file `_redirects` nel formato di Netlify e Cloudflare Pages, generabile dalla mappa CSV:

```text
/informativa-privacy/  /privacy-policy/  301
/informativa-privacy   /privacy-policy/  301
```

## 2. Head: meta, Open Graph, icone

### 2.1 Template
Un componente unico, `SeoHead.astro`, legge i dati di ogni pagina da `src/data/pages.ts`: title, description, immagine social, etichetta del breadcrumb e indicizzabilità. Gli stessi dati alimentano i breadcrumb visibili e il JSON-LD: una sola fonte, nessuna incoerenza.

| Elemento | Regola |
|---|---|
| `<title>` | `<Titolo pagina> \| ITnode`; sulla home `ITnode \| <claim>`. Circa 30–60 caratteri, unico per pagina. |
| `meta description` | Circa 120–155 caratteri, unica per pagina, coerente con il contenuto visibile. |
| `link rel="canonical"` | URL assoluto della tabella 1.2, autoreferenziale, senza parametri. Assente sulla 404. |
| `meta robots` | Pagine indicizzabili: `max-image-preview:large`. 404: `noindex`. Nessun `noindex` che dipenda dall'ambiente scritto nel codice (sezione 3.2). |
| Open Graph | `og:type` `website`, `og:site_name` `ITnode`, `og:locale` `it_IT`, `og:title` (il title senza « \| ITnode»), `og:description` (uguale alla description), `og:url` (uguale al canonical). `og:image` assoluta 1200×630, con `og:image:width`, `og:image:height`, `og:image:type` e `og:image:alt`. |
| Twitter/X | `twitter:card` `summary_large_image`, più `twitter:title`, `twitter:description`, `twitter:image` e `twitter:image:alt` con gli stessi valori di Open Graph. Niente `twitter:site`, perché non risulta un account X di ITnode `[DA FORNIRE: account, se esiste]`. |
| Altri | `<meta charset="utf-8">` e `<meta name="viewport" content="width=device-width, initial-scale=1">`, senza bloccare lo zoom. |

```astro
---
// src/components/SeoHead.astro
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from '../data/pages';

interface Props {
  title: string;       // full <title>, e.g. "Puglia Digitale: destination marketing immersivo | ITnode"
  description: string;
  ogImage?: string;    // path in /public, e.g. "/og/siii.jpg"
  ogImageAlt?: string;
  noindex?: boolean;   // true only for the 404 page (and any future thank-you page)
}

const {
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  noindex = false,
} = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site).href; // pathname ends with "/"
const ogTitle = title.replace(/\s\|\sITnode$/, '');
const ogImageUrl = new URL(ogImage, Astro.site).href;
---
<title>{title}</title>
<meta name="description" content={description} />
{noindex && <meta name="robots" content="noindex" />}
{!noindex && <link rel="canonical" href={canonical} />}
{!noindex && <meta name="robots" content="max-image-preview:large" />}
<meta property="og:type" content="website" />
<meta property="og:site_name" content="ITnode" />
<meta property="og:locale" content="it_IT" />
<meta property="og:title" content={ogTitle} />
<meta property="og:description" content={description} />
{!noindex && <meta property="og:url" content={canonical} />}
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:alt" content={ogImageAlt} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={ogTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />
<meta name="twitter:image:alt" content={ogImageAlt} />
```

### 2.2 Testi di title, description e H1
- I valori per tutte le pagine, 404 compresa, sono in `docs/seo/mappa-keyword-url.md` (seo-content). Vanno copiati in `src/data/pages.ts`: questo documento fissa solo template e vincoli.
- Il regex di `og:title` toglie « | ITnode» solo in fondo al title. Un title che non segue il pattern `… | ITnode`, come oggi quello di Contatti, resta intero in `og:title`: meglio allinearlo al pattern (segnalato a seo-content).

### 2.3 Immagine social 1200×630
- **Specifiche.**
  - Formato JPG da 1200×630 px (rapporto 1,91:1), sRGB, peso inferiore a 300 KB.
  - Soggetto e testi nell'area centrale, perché alcune app ritagliano in quadrato.
  - URL stabili in `public/og/`, senza hash: `/og/default.jpg`, `/og/siii.jpg` e così via.
- **Asset mancante** `[DA FORNIRE]`.
  - Serve almeno un'immagine di marca per la home e per il resto del sito, con il marchio ITnode leggibile. La prepara ui-designer quando arriva il logo vettoriale.
  - L'ideale è un'immagine per pagina: una schermata di un'esperienza SIII per `/siii/` e un fotogramma del video per `/citta-digitali/`.
- **Fallback provvisorio: `/og/default.jpg`**, ritaglio centrale 1200×630 di `src/assets/images/evento-puglia-digitale.jpg`.
  - È l'unica immagine che mostra i tour immersivi in uso.
  - Prova eseguita: ritaglio `cover` centrato, JPEG con qualità 82, 131 KB, composizione integra.
  - Generazione una tantum con sharp: `sharp(src).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82, mozjpeg: true })`.
  - `og:image:alt` provvisorio: «Evento Puglia Digitale: sala piena davanti al palco, con due tour virtuali proiettati sui maxischermi».
  - **Limiti.** Mostra il marchio Puglia Digitale, non ITnode: va bene per `/puglia-digitale/`, per le altre pagine è una soluzione temporanea. Inoltre nell'angolo in basso a destra c'è un simbolo simile al watermark di Gemini (sezione 4.4), quindi il fallback si usa solo se il cliente conferma che è una foto reale dell'evento `[IPOTESI: da validare con creative-director e cliente]`.
- **Alternativa, se la foto non è confermata**: una card tipografica fatta da ui-designer, con il nome ITnode nel carattere del sito e il claim su fondo pieno. Niente immagini generate con l'AI (linee guida, sez. 31).

### 2.4 Favicon e logo
- Il logo disponibile (`logo-itnode.png`, 192×114 px) non basta. Servono il logo vettoriale (SVG) e un simbolo quadrato per la favicon `[DA FORNIRE]`.
- **Favicon.**
  - File: `/favicon.ico` (48×48), `/favicon.svg` e `/apple-touch-icon.png` (180×180).
  - Vanno dichiarate nel `<head>` di tutte le pagine: Google le legge dalla home.
  - Formato quadrato con lato di almeno 48 px, URL stabile e non bloccato da robots.txt. Senza favicon Google mostra un'icona generica nei risultati.
- **Logo per i dati strutturati**: una copia stabile in `public/brand/logo-itnode.png`. Oggi misura 192×114, sopra il minimo di 112×112 richiesto da Google. Va sostituito con un PNG di almeno 512 px di lato quando arriva il vettoriale.

## 3. Scansione e indicizzazione

### 3.1 robots.txt
File statico `public/robots.txt`. Versione di base, valida per tutte le opzioni:

```text
User-agent: *
Disallow:

Sitemap: https://itnode.it/sitemap-index.xml
```

Non si blocca nulla: il sito è piccolo e non ha aree private. CSS, JavaScript e immagini non vanno mai bloccati.

**Crawler di AI: decide il cliente, con un ADR.** Le linee guida chiedono visibilità su AI Overviews e sui motori generativi (sez. 26). Fatti utili alla scelta:
- AI Overviews e AI Mode di Google usano Googlebot: da robots.txt non si possono escludere senza uscire dalla Ricerca. `Google-Extended` controlla l'addestramento di Gemini e il grounding nelle app Gemini, non la Ricerca.
- OpenAI, Anthropic e Perplexity usano crawler distinti per tre funzioni:
  - addestramento: GPTBot e ClaudeBot;
  - ricerca: OAI-SearchBot, Claude-SearchBot e PerplexityBot;
  - visite richieste da un utente: ChatGPT-User, Claude-User e Perplexity-User. Per ChatGPT-User, OpenAI dichiara che robots.txt può non applicarsi.
- robots.txt è una richiesta, non una barriera: per un blocco effettivo serve una regola del firewall.

| Opzione | Effetto | Valutazione |
|---|---|---|
| **A. Accesso aperto** (consigliata) | robots.txt di base: tutti i crawler ammessi | Massima presenza nelle risposte e nelle citazioni dei motori generativi. I testi del sito presentano l'azienda: non c'è nulla da proteggere. |
| B. Ricerca sì, addestramento no | Aggiunge il blocco qui sotto | Protegge i testi dall'addestramento. Con `Google-Extended` si perde anche il grounding nelle app Gemini: va tolto dalla lista se la visibilità su Gemini conta. |
| C. Nessun crawler di AI | Blocca anche i bot di ricerca e quelli attivati dagli utenti | Sconsigliata: contraddice gli obiettivi AEO e GEO delle linee guida. |

Blocco aggiuntivo per l'opzione B, prima del gruppo `*`:

```text
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: meta-externalagent
User-agent: Bytespider
Disallow: /
```

`llms.txt` non è previsto: la guida di Google del maggio 2026 lo dichiara non necessario per le funzioni di AI della Ricerca. Si può aggiungere in seguito, con un costo minimo.

### 3.2 Staging e meta robots
- **Staging e anteprime**: autenticazione (password dell'hosting o accesso con account) più l'header `X-Robots-Tag: noindex, nofollow`, impostato dall'hosting per quell'ambiente. Molti hosting lo aggiungono già alle anteprime: va verificato, non dato per scontato.
- **Codice**: nessun `noindex` legato all'ambiente, così lo stesso build passa dallo staging alla produzione senza residui.
- **Se l'hosting non consente header per ambiente**: si usa la variabile `PUBLIC_SITE_ENV`. Il `noindex` è attivo per impostazione predefinita e sparisce solo con il valore `production`. Il controllo n. 6 della sezione 7 va ripetuto al lancio.
- **robots.txt uguale in tutti gli ambienti**: niente `Disallow: /` sullo staging. Impedirebbe ai motori di leggere il `noindex` e rischierebbe di finire in produzione.

### 3.3 Sitemap XML
- `@astrojs/sitemap` 3.7.4 genera `/sitemap-index.xml` e `/sitemap-0.xml` con gli URL canonici con barra finale. Esclude da sola le pagine 404 e 500 (verificato nel codice dell'integrazione).
- Contiene solo URL indicizzabili, che rispondono 200 e hanno canonical autoreferenziale. Una pagina che passa in `noindex` (per esempio le informative, nel caso della nota ¹) si esclude con l'opzione `filter`.
- **Campi da omettere.**
  - `changefreq` e `priority`: Google li ignora.
  - `lastmod` globale: l'opzione `lastmod` dell'integrazione applica la stessa data a tutte le pagine, e Google ignora le date non accurate. `lastmod` per pagina solo se affidabile, tramite `serialize`.
- Nessuna sitemap per immagini o video: le immagini sono nell'HTML come `<img>` e il video ha il suo markup (`dati-strutturati.md`).
- **Al lancio**: invio a Google Search Console e a Bing Webmaster Tools. La vecchia sitemap, se esiste, resta pubblicata con i vecchi URL per 4–8 settimane, per far scoprire prima i redirect (sezione 6).

### 3.4 Pagina 404 e codice 410
- `src/pages/404.astro` è obbligatoria. Astro la pubblica come `/404.html` e l'hosting la serve con **stato 404** per ogni URL inesistente. Senza questo file alcuni hosting, per esempio Cloudflare Pages, trattano il sito come una single page application: rispondono 200 con la home a qualsiasi URL, cioè soft 404.
- **Contenuto**: H1 «Pagina non trovata» `[IPOTESI: copy]`, una frase e i link a home, SIII, Puglia Digitale, Città Digitali e Contatti.
- **Meta**: `noindex`, niente canonical e niente JSON-LD. L'esclusione dalla sitemap è automatica.
- **Codice 410**: solo per vecchi URL rimossi di proposito, senza equivalente e senza valore, se l'hosting lo supporta. Altrimenti 404.

### 3.5 Rendering
- Titoli, testi, link e immagini di contenuto sono nell'HTML generato in build. JavaScript serve solo come miglioramento (animazioni, menu, form), mai per inserire contenuti o link.
- **Menu mobile**: i link sono nell'HTML anche a menu chiuso (`<nav>` con `<a href>`), non creati da uno script.
- **Animazioni di comparsa** (reveal, text reveal):
  - il testo resta testo reale nel DOM;
  - se viene diviso in `<span>` per parola o lettera, gli spazi restano e il contenitore ha come nome accessibile il testo intero;
  - se lo script non parte, il contenuto resta visibile: gli stati iniziali nascosti valgono solo con la classe `js` sull'elemento `<html>`.
- Niente testo di contenuto dentro immagini, canvas o SVG: numeri (30+, ~200.000, 60%), statement e marquee sono testo HTML. Le copie duplicate dei marquee hanno `aria-hidden="true"`.

## 4. Struttura della pagina

### 4.1 Lingua
- `<html lang="it">`, `og:locale` `it_IT` e, nel JSON-LD, `inLanguage: "it"`.
- Le frasi intere in un'altra lingua hanno `lang` sull'elemento, per esempio `lang="en"` su un claim in inglese. I termini entrati nell'uso, come «destination marketing» o «tour», non ne hanno bisogno.
- Il sito è monolingua: niente hreflang. Se in futuro arriva una versione inglese: cartella `/en/` e hreflang reciproci con `x-default`.

### 4.2 Gerarchia dei titoli
Regole:
- Un solo H1 per pagina, nell'hero. Il logo nell'header non è un heading.
- Ogni sezione è un H2 e le sue parti sono H3. Nessun salto di livello e nessun heading vuoto o usato solo per lo stile.
- I numeri dei capitoli («01», «02») stanno preferibilmente fuori dal testo dell'heading, come elemento separato.
- Grandi statement, marquee e numeri sono paragrafi o elementi stilizzati, non heading, a meno che introducano una sezione.
- `Hero`, `SectionIntro` e `LargeStatement` ricevono il livello dell'heading come proprietà (`as="h1" | "h2" | "h3"`), così un componente riusato non genera un secondo H1.

H1 secondo `mappa-keyword-url.md`, che resta la fonte in caso di modifiche. «+» indica un unico H1 su due righe: nome grande e descrittore più piccolo, per esempio `<h1>Puglia Digitale <span>Una piattaforma…</span></h1>`, con uno spazio o un segno di punteggiatura tra le due parti nel testo.

| Pagina | H1 |
|---|---|
| `/` | La tecnologia cambia. La curiosità ci accompagna da sempre. |
| `/siii/` | SIII + Siti Interattivi Immersivi |
| `/puglia-digitale/` | Puglia Digitale + Una piattaforma interattiva immersiva per la valorizzazione territoriale. |
| `/citta-digitali/` | Città Digitali + Le attività del territorio, online senza perdere radici. |
| `/contatti/` | Parliamo del prossimo spazio digitale. |
| `/privacy-policy/`, `/cookie-policy/` | Privacy Policy; Cookie Policy |
| 404 | Pagina non trovata (il testo lo scrive copywriter-brand) |

- **Home.** L'H1 non contiene «ITnode». Per questo la frase «ITnode nasce dall'idea di creare un nuovo modo di abitare il Web.» viene subito dopo, come H2 o come primo paragrafo in evidenza, e il marchio compare nel title.
- **Timeline del fondatore**: lista ordinata (`<ol>`) con le date in `<time>`. Dati e numeri solo se forniti dal cliente (linee guida, sez. 9 e 25).

### 4.3 Breadcrumb visibili
- **Dove**: su tutte le pagine interne, sopra l'H1. Non sulla home né sulla 404. Possono essere discreti ma sempre leggibili, mai nascosti: il markup BreadcrumbList deve corrispondere a una traccia visibile.
- **Tracce**: «Home › SIII», «Home › Puglia Digitale», «Home › Città Digitali», «Home › Contatti», «Home › Privacy Policy», «Home › Cookie Policy».
- **HTML**:
  - `<nav aria-label="Percorso di navigazione">` con dentro un `<ol>`. L'etichetta può cambiarla ux-designer.
  - «Home» è un link a `/`.
  - L'ultima voce è la pagina corrente: senza link, con `aria-current="page"`.
  - Il separatore è decorativo, in CSS o con `aria-hidden`.
- Le etichette sono le stesse del JSON-LD e vengono dalla stessa fonte, `src/data/pages.ts`.
- Da gennaio 2025 Google mostra il percorso solo nei risultati su desktop; su mobile mostra il dominio. Il markup resta supportato.

### 4.4 Immagini
- **Formato**: le immagini di contenuto sono sempre `<img>` o `<picture>` (componenti `<Image>` e `<Picture>` di `astro:assets`), mai sfondi CSS, che non vengono indicizzati come immagini.
- **Testo alternativo (`alt`)**:
  - descrive in italiano ciò che l'immagine mostra e perché è lì, in genere in meno di 125 caratteri, senza «immagine di» e senza elenchi di keyword;
  - per le immagini decorative, `alt=""`;
  - per il logo nel link alla home, `alt="ITnode"`;
  - lo scrive copywriter-content insieme ai testi della pagina;
  - schermate delle esperienze SIII e foto dei luoghi, quando arriveranno, avranno alt specifici: nome del luogo o dell'azienda e cosa si vede.
- **Nomi dei file**: minuscoli, con trattini, descrittivi e in italiano, come quelli già in `src/assets/images/`. `astro:assets` aggiunge un hash ma conserva il nome.
- **Dimensioni e caricamento**: `width` e `height` sempre presenti (li genera `astro:assets`). Lazy loading per tutte le immagini tranne quella principale in alto; la strategia di caricamento è di web-performance-specialist.
- **Origine delle foto** `[DA VERIFICARE con il cliente]`.
  - Indizi di generazione o ritocco con l'AI:
    - `fondatore-in-piedi.jpg`, `fondatore-palco-citta-digitali.jpg` e `evento-puglia-digitale.jpg` hanno nell'angolo in basso a destra una stellina semitrasparente a quattro punte, simile al watermark visibile di Gemini. Nella foto dell'evento la stellina copre la cornice grafica, quindi è stata aggiunta dopo;
    - `fondatore-presentazione-platea.webp` misura 1536×1024, un formato tipico dei generatori;
    - `fondatore-braccia-conserte.jpg` ha lo stesso sfondo grafico di `fondatore-in-piedi.jpg`.
  - Nei file non ci sono metadati di provenienza (EXIF, IPTC o C2PA).
  - Finché l'origine non è chiarita, queste immagini non vanno usate come `og:image` né come `image` della persona nel JSON-LD, e non vanno presentate come foto di eventi reali.

### 4.5 Video e contenuti immersivi
- **Video di Città Digitali**: elemento `<video>` con `poster` e `<source src>` nell'HTML servito. `preload="none"` o `metadata` vanno bene; la sorgente però non va inserita con JavaScript. Sottotitoli (`<track kind="captions" srclang="it">`) se c'è parlato.
- **Testo visibile**: accanto al video servono un titolo e una o due frasi di descrizione. Sono il testo della pagina sul video e la base di `name` e `description` del VideoObject.
- **Hosting del file**: oggi è su `itnode-website-production.up.railway.app`. È una dipendenza fragile, perché se quell'ambiente viene spento il video sparisce, e l'host non è sotto controllo. Proposta: servirlo dall'hosting del sito o da un CDN controllato, con URL stabile, per esempio `https://itnode.it/video/citta-digitali.mp4` `[IPOTESI: da decidere con web-performance-specialist]`.
- **Esperienze SIII e tour in iframe**:
  - un iframe non trasferisce testo alla pagina che lo ospita, quindi ogni showcase ha nell'HTML nome, luogo, una breve descrizione e il link all'esperienza;
  - le anteprime interattive si caricano solo al clic (facciata), con `title` sull'iframe;
  - da verificare con chi cura la cookie policy se gli iframe dei portali impostano cookie non tecnici: in quel caso vanno bloccati fino al consenso.

## 5. Link

### 5.1 Link interni
- Sempre `<a href>` verso l'URL canonico con barra finale: `/siii/`, non `/siii`. Nessun link interno deve passare da un redirect.
- **Testo dei link**: descrittivo, con il nome della destinazione («Esplora SIII», «Scopri Puglia Digitale»).
  - Se più CTA hanno lo stesso testo ma destinazioni diverse («Entra nell'esperienza →», «Esplora →»), si aggiunge il nome della destinazione in testo visivamente nascosto.
  - La freccia è decorativa (`aria-hidden`).
- Ogni pagina si raggiunge con un clic dalla home, dall'header e dal footer.
- «Tour virtuale» è il tema principale solo di `/siii/`: le pagine di progetto rimandano lì (ripartizione degli intenti di seo-content).

Matrice minima:

| Da | Verso | Dove |
|---|---|---|
| Tutte | `/`, `/siii/`, `/puglia-digitale/`, `/citta-digitali/`, `/contatti/` | Header (logo e menu) e footer |
| Tutte | `/privacy-policy/`, `/cookie-policy/` | Footer. La privacy anche accanto al consenso dei form |
| `/` | `/siii/`, `/puglia-digitale/`, `/citta-digitali/` | CTA dei tre capitoli |
| `/siii/` | `/citta-digitali/`, `/puglia-digitale/` | Dove il testo cita i portali che ospitano le esperienze |
| `/puglia-digitale/` | `/siii/`, `/citta-digitali/` | Tecnologia (SIII) e rete nazionale |
| `/citta-digitali/` | `/siii/`, `/puglia-digitale/` | Sottotitolo che cita i siti immersivi; progetto pugliese |
| `/contatti/` | `/siii/`, `/puglia-digitale/`, `/citta-digitali/` | Vicino alla scelta «Mi interessa» |

### 5.2 Link esterni

| Tipo | Esempi | Apertura | `rel` |
|---|---|---|---|
| Esperienze SIII | cassanodigitale.it/masseriasantella/, monopolidigitale.it/maisonmimina/, acquavivadigitale.com/dielle/ | Nuova scheda (linee guida, sez. 12) | `noopener` |
| Portali di ITnode | cittàdigitali.it (sezione 5.3), lapugliadigitale.it, portali delle città | Nuova scheda | `noopener` |
| Profili | LinkedIn del fondatore, profili ufficiali di ITnode | Nuova scheda | `noopener` |

- **Niente `nofollow`**: sono link editoriali verso progetti di ITnode.
- **Niente `noreferrer`**: toglierebbe ai portali il dato sulle visite provenienti da itnode.it.
- **Nuova scheda dichiarata**: icona con testo alternativo, oppure testo nascosto «(si apre in una nuova scheda)». Il dettaglio lo decide ux-designer.
- **URL finali**: i link puntano direttamente all'URL finale (protocollo, www, barra finale) per evitare redirect. `[DA VERIFICARE da una rete senza blocchi: URL finali dei portali e delle esperienze, controllo 13. Per Città Digitali la procedura è nella sezione 5.3]`
- **Domini internazionalizzati (IDN)**: negli `href` e nel JSON-LD l'host si scrive in ASCII (punycode, `xn--…`); i percorsi con caratteri non ASCII si codificano in percentuale (UTF-8). Nel testo visibile il dominio si scrive con gli accenti. Dettagli nella sezione 5.3.
- **Email e telefono**: link `mailto:` e `tel:` in chiaro nell'HTML, senza offuscare l'email con JavaScript (per esempio va disattivata l'«Email Address Obfuscation» di Cloudflare). Sono i dati visibili su cui si basa il markup Organization.

### 5.3 Portale Città Digitali: dominio e forma dell'indirizzo
**Fatto confermato.** Il portale di Città Digitali è `cittàdigitali.it`, con l'accento, che in ASCII (punycode) si scrive `xn--cittdigitali-19a.it`. Il dominio senza accento, `cittadigitali.it`, non è del cliente: lo ha confermato l'utente il 2026-10-05. Nell'indice di ricerca corrisponde a un progetto omonimo (`docs/strategia/citta-digitali-elenco.md`, §1), quindi il sito non lo linka e non lo nomina.

**Forma dell'indirizzo** (decisione di seo-technical del 2026-10-05, già applicata in `src/data/site.ts`):

| Dove | Forma | Valore |
|---|---|---|
| `href` dei link | ASCII (punycode), `https`, dominio senza www | `https://xn--cittdigitali-19a.it` |
| JSON-LD (`brand.url`) | ASCII, forma serializzata con la barra finale | `https://xn--cittdigitali-19a.it/` |
| Testo visibile e nomi accessibili | Unicode, senza protocollo né www | `cittàdigitali.it` |

- **Perché l'ASCII negli `href` e nel JSON-LD.** Per Google la forma punycode e la forma Unicode dello stesso host sono equivalenti, quindi la scelta non cambia nulla per la Ricerca. Conta per tutti gli altri:
  - è la forma che il browser ricava comunque dall'`href`;
  - è quella che arriva agli analytics (`link_url`, `link_domain`);
  - non dipende dalla conversione IDN di crawler di terzi, validatori e strumenti di verifica;
  - nel JSON-LD evita confronti falliti tra due codifiche Unicode della stessa lettera (à composta o scomposta).
- **Perché senza www.** Nell'indice di ricerca tutte le pagine del portale sono sul dominio senza www, home compresa: `https://xn--cittdigitali-19a.it/`. La piattaforma precedente sta su `www2.`. Linkare l'host indicizzato evita un redirect `[DA VERIFICARE da una rete normale]`.
- **Barra finale.** Alla radice del dominio `https://host` e `https://host/` producono la stessa richiesta (`GET /`): nell'`href` la barra non cambia nulla e non causa redirect. Nel JSON-LD si scrive la forma serializzata, con la barra.
- **Testo visibile.** Il dominio si scrive con l'accento, nella forma composta (U+00E0), come lo scrive il cliente.

**Verifiche da una rete normale, prima del go-live.** I comandi sono nella review `docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md` (oss. 1); i punti confluiranno in `docs/seo/checklist-lancio.md`.

| Verifica | Esito atteso | Se l'esito è diverso |
|---|---|---|
| Risoluzione del dominio | `xn--cittdigitali-19a.it` si risolve | Il go-live si blocca finché il cliente non sistema il dominio, oppure finché creative-director non decide di togliere il link |
| HTTPS sul dominio senza www | 200 senza redirect, certificato valido per il nome | Con un redirect verso `www.`, si cambia `url` in `src/data/site.ts`. Con un errore TLS o 5xx, il go-live si blocca come nella riga precedente |
| Redirect tra varianti | `http://`, `https://www.` e `http://www.` rispondono 301 o 308 verso `https://xn--cittdigitali-19a.it/`, oppure `www.` non esiste | Si segnala al cliente; il nostro link non cambia |
| Forma canonica | Il canonical della home del portale è `https://xn--cittdigitali-19a.it/`, oppure la stessa forma in Unicode | Il link segue l'URL che il portale serve senza redirect; l'incoerenza si segnala al cliente |
| Browser | Il link del footer e «Visita il portale» aprono la home del portale in una nuova scheda, e la barra degli indirizzi mostra `cittàdigitali.it` | Si segnala a seo-technical |

## 6. Migrazione dal sito attuale
- **Cosa sappiamo.** Dalla ricerca web del 2026-09-28 (itnode.it e la Wayback Machine non sono raggiungibili dall'ambiente):
  - risultano indicizzati solo `https://itnode.it/` e `https://itnode.it/informativa-privacy/`;
  - il formato del title («Informativa Privacy – ItNode») fa pensare a WordPress `[IPOTESI]`;
  - il menu attuale riporta Tour Virtuali, Esperienze Digitali, Il Digital Marketing, L'E-Commerce e Contatti. Possono essere ancore della home o pagine non indicizzate `[DA VERIFICARE]`.
- **Serve l'inventario completo** `[DA FORNIRE]`: export di Search Console (Pagine e Prestazioni degli ultimi 16 mesi), sitemap attuale, accesso al CMS o crawl completo, backlink. Confluirà in `docs/seo/audit-tecnico.md`.
- **Destinazioni proposte**, se quelle voci risultano pagine vere:

| Voce attuale | Destinazione | Logica |
|---|---|---|
| Tour Virtuali | `/siii/` | Il SIII è l'evoluzione della stessa offerta, e la pagina spiega la differenza con il tour 360° |
| Esperienze Digitali | `/siii/` | Stesso tema |
| Contatti | `/contatti/` | Pagina equivalente. Se l'URL attuale è già `/contatti/`, resta invariato |
| Il Digital Marketing, L'E-Commerce | Da decidere con i dati | Nessun equivalente nel nuovo sito: 301 verso la pagina più affine solo se hanno link o traffico, altrimenti 410 |

- **Regole dei redirect.**
  - 301 uno a uno verso la pagina equivalente più vicina, con una nota per ogni riga della mappa.
  - Mai redirect di massa verso la home. Niente catene né loop.
  - Una riga per ogni variante che conta (con e senza barra finale, con www), tutte con un solo salto verso l'URL finale.
  - Gli URL tecnici di WordPress (`/wp-admin/`, `/feed/`, `/wp-json/` e simili) rispondono 404. I file in `/wp-content/uploads/` si reindirizzano solo se hanno link o traffico da Google Immagini.

## 7. Controlli automatici sulla build (Fase 5)
Script (Node o Bash) su `dist/` e sull'anteprima locale o sullo staging. Ogni controllo fallito blocca il lancio.

| # | Controllo | Criterio |
|---|---|---|
| 1 | Crawl interno | Tutti i link interni rispondono 200, nessuno porta a un 3xx o a un 404, nessuna pagina orfana |
| 2 | Title | Uno per pagina, presente, unico, circa 30–60 caratteri |
| 3 | Meta description | Presente, unica, circa 120–155 caratteri |
| 4 | Titoli | Esattamente un H1; nessun salto di livello; nessun heading vuoto |
| 5 | Canonical | Uno per pagina indicizzabile: assoluto, su `https://itnode.it`, con barra finale, uguale all'URL atteso. Assente sulla 404 |
| 6 | Robots | In produzione nessun `noindex` sulle pagine indicizzabili, né nei meta né nell'header `X-Robots-Tag`. `noindex` presente sulla 404 |
| 7 | Sitemap | XML valido. Contiene esattamente gli URL canonici indicizzabili, né uno in più né uno in meno, e ognuno risponde 200 |
| 8 | robots.txt | Risponde 200; nessun `Disallow: /` nel gruppo `*`; riga `Sitemap` con URL assoluto; politica per l'AI conforme all'ADR |
| 9 | Open Graph e X | Tutti i tag della sezione 2.1; `og:url` uguale al canonical; `og:image` assoluta, che risponde 200 e misura 1200×630 |
| 10 | Lingua | `<html lang="it">` su ogni pagina |
| 11 | JSON-LD | JSON valido, `@id` coerenti e riferimenti risolti nella pagina, campi richiesti presenti. Valori uguali al contenuto visibile (breadcrumb, nomi, indirizzo, telefono). Nessun segnaposto `[DA …]` residuo. Verifica manuale su 2 pagine con Rich Results Test e validator.schema.org |
| 12 | Immagini | Ogni `<img>` ha `alt` (vuoto solo se decorativa), `width` e `height`; nessuna immagine rotta |
| 13 | Link esterni | Ogni `target="_blank"` ha un `rel` che contiene `noopener`; niente `nofollow` né `noreferrer` sui link del network; URL assoluti in ASCII, con gli IDN in punycode, e nessun dominio escluso dalla sezione 5.3; ogni link esterno risponde 200 senza redirect (verifica da una rete senza blocchi) |
| 14 | 404 | Un URL inventato risponde 404 con la pagina personalizzata, non 200 |
| 15 | Normalizzazioni | http → https, www → senza www, senza barra → con barra: 301 (o 308 automatico) in un salto |
| 16 | Redirect | Per ogni riga di `redirect-map.csv`: codice e `Location` attesi, destinazione che risponde 200, un salto (al massimo due per le varianti http) |
| 17 | Staging | Senza credenziali risponde 401 e ha l'header `X-Robots-Tag: noindex`. In produzione l'header è assente |
| 18 | Contenuto misto | Nessuna risorsa `http://` nelle pagine |
| 19 | Favicon | Link nel `<head>` della home, file che risponde 200, quadrato di almeno 48 px |
| 20 | Rendering | Con JavaScript disattivato H1, testi, link del menu e immagini di contenuto ci sono (test con Playwright) |

**Strumenti**:
- un parser HTML (per esempio `node-html-parser`) sui file di `dist/`;
- `curl -sI` per codici e `Location`;
- Playwright con JavaScript disattivato per il controllo n. 20.

Lo script sta nel repository (per esempio `scripts/seo-check.mjs`) e gira a ogni build.

## Fonti
Consultate il 2026-09-28. developers.google.com e docs.astro.build non sono raggiungibili dall'ambiente: i dati di Google vengono dagli estratti dei risultati di ricerca, quelli di Astro dal codice dei pacchetti npm.
- Astro 7.3.5: `dist/types/public/config.d.ts` del pacchetto npm `astro@7.3.5` (opzioni `site`, `trailingSlash`, `build.format`, `redirects`).
- @astrojs/sitemap 3.7.4: `dist/index.js` (esclusione di 404 e 500, barra finale) e `dist/schema.js` (opzioni) del pacchetto npm.
- Google, breadcrumb su mobile: https://developers.google.com/search/blog/2025/01/simplifying-breadcrumbs
- Google, favicon nei risultati: https://developers.google.com/search/docs/appearance/favicon-in-search
- Google, funzioni di AI e guida all'ottimizzazione per l'AI generativa (maggio 2026, llms.txt non necessario): https://developers.google.com/search/docs/appearance/ai-features e https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google-Extended, ambito (addestramento e grounding di Gemini): https://ppc.land/google-extended/
- Anthropic, crawler: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- OpenAI, ChatGPT-User e robots.txt: https://www.searchenginejournal.com/openai-says-robots-txt-may-not-apply-to-chatgpts-fetch-bot/585864/
- Perplexity, crawler: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- X, fallback delle card su Open Graph: https://kb.theseoframework.com/kb/twitter-cards-and-x-sharing/
- Sito attuale, ricerca `site:itnode.it`: https://itnode.it/ e https://itnode.it/informativa-privacy/

Consultate il 2026-10-05 (sezione 5.3), tramite gli estratti dei risultati di ricerca: il portale è bloccato dalla policy di rete dell'ambiente.
- Google, equivalenza tra forma punycode e forma Unicode di un hostname: https://developers.google.com/search/blog/2015/07/googles-handling-of-new-top-level
- WHATWG, URL Standard (conversione dell'host in ASCII): https://url.spec.whatwg.org/
- Portale nell'indice, sul dominio senza www: https://xn--cittdigitali-19a.it/ («Home - Città Digitali») e pagine interne, per esempio https://xn--cittdigitali-19a.it/il-progetto/

## Ipotesi da validare
- Dominio canonico senza www (1.1).
- Informative privacy e cookie indicizzabili: dipende da come vengono prodotte (1.2).
- Fallback dell'immagine social con la foto dell'evento (2.3).
- Hosting del video fuori da Railway (4.5).
- Sito attuale su WordPress (6).
- Forma canonica del portale Città Digitali: `https://xn--cittdigitali-19a.it/`, senza www (5.3).

## Domande aperte
1. **Cliente.** Export di Search Console (o accesso in lettura), sitemap attuale, accesso al CMS o all'hosting attuale. Il sito risponde anche su www?
2. **Cliente.** Cosa pubblica oggi `itnode-website-production.up.railway.app`? Resterà attivo dopo il lancio?
3. **Cliente.** Servono logo vettoriale, simbolo per la favicon, immagine social dedicata e poster del video.
4. **Cliente.** Le informative privacy e cookie saranno testo statico o un servizio esterno (embed)?
5. **Cliente.** Le foto del fondatore e dell'evento sono scatti reali, ritoccati o generati? Quali si possono usare come ritratto?
6. **Cliente.** Quali sono i profili ufficiali di ITnode (seo-content segnala Instagram @itnodedigital)? Esiste un account X?
7. **web-performance-specialist.** Quale hosting? Da questo dipendono il formato dei redirect, gli header e la gestione della 404.
8. **ux-designer.** Posizione e stile dei breadcrumb, e avviso di apertura in una nuova scheda.
9. **Cliente.** Il portale di Puglia Digitale è lapugliadigitale.it, come nelle linee guida, oppure puglia-digitale.it? Nell'indice di ricerca il primo non ha pagine, il secondo sì `[DA VERIFICARE]`.
10. **Cliente.** I portali delle città linkati dal sito (varesedigitale.it, altamuradigitale.com, caltanissettadigitale.it, gravinadigitale.it, monopolidigitale.it, acquavivadigitale.com) sono attivi? Con quale indirizzo finale? Alcune città hanno ora una pagina su cittàdigitali.it.
11. **Utente, o chi ha una rete senza blocchi.** Eseguire le verifiche della sezione 5.3 e il controllo 13, poi girare l'output a seo-technical.

Chiusa il 2026-10-05: il dominio del portale Città Digitali (5.3).

## Decisioni richieste
- **Cliente, con ADR in `docs/decisioni/`**: politica per i crawler di AI. Consigliata l'opzione A.
- **Cliente**: confermare il dominio canonico `https://itnode.it`.
- **Prese da seo-technical come owner del dominio**:
  - barra finale sempre presente;
  - slug della tabella 1.2;
  - redirect 301 lato server, senza l'opzione `redirects` di Astro;
  - staging con autenticazione e `X-Robots-Tag`;
  - nessun `noindex` legato all'ambiente nel codice;
  - IDN in ASCII negli `href` e nel JSON-LD, con gli accenti nel testo visibile; portale Città Digitali senza www (5.3, 2026-10-05).
- **web-performance-specialist, con seo-technical**: hosting del video.
