---
titolo: Piano dei dati strutturati (JSON-LD)
owner: seo-technical
contributi: [seo-content, copywriter-content]
stato: bozza
versione: 0.2
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md, docs/seo/specifiche-tecniche.md, docs/seo/ricerca-keyword.md, conferma dell'utente del 2026-10-05 sul dominio di Città Digitali, docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, fonti web elencate in fondo]
---

# Piano dei dati strutturati (JSON-LD)

JSON-LD per ogni pagina del sito, pronto per Astro. Le regole su URL, meta e breadcrumb visibili sono in `docs/seo/specifiche-tecniche.md`.

## 1. Regole
1. **Un solo script per pagina**: un `<script type="application/ld+json">` con `@context` e `@graph`. I nodi si collegano tramite `@id`.
2. **Solo dati visibili**: nel markup va solo ciò che l'utente vede nella pagina, o in header e footer, presenti in ogni pagina (linee guida, sez. 26). Un dato non visibile resta fuori.
3. **Una sola fonte**:
   - `src/data/company.ts` contiene ragione sociale, indirizzo, telefono, email e P.IVA, e alimenta footer, pagina Contatti e JSON-LD;
   - `src/data/pages.ts` contiene title, description e breadcrumb.

   Così markup e contenuto visibile non possono divergere.
4. **`@id` stabili**: URL canonico più un frammento in inglese (`#organization`, `#webpage`…). Non cambiano tra una build e l'altra.
5. **Nessun segnaposto in produzione**:
   - un nodo con dati obbligatori mancanti non si pubblica (è il caso di VideoObject);
   - una proprietà facoltativa mancante si omette;
   - i `[DA …]` degli esempi servono solo a questo documento.
6. **Nessun markup per contenuti assenti**. Niente:
   - FAQPage: non ci sono FAQ, e comunque Google limita quei risultati a pochi siti istituzionali;
   - Review o AggregateRating;
   - Event;
   - Product o Offer;
   - LocalBusiness con orari o coordinate non verificati;
   - SearchAction: non c'è una ricerca interna.
7. **Nessuna promessa di risultati avanzati**:
   - BreadcrumbList è l'unico con un effetto visibile diretto, e solo nei risultati da desktop;
   - Organization e WebSite aiutano Google a riconoscere marchio, logo e nome del sito;
   - VideoObject difficilmente produrrà risultati video (sezione 6).

## 2. Entità e `@id`

| Entità | `@type` | `@id` | Pubblicata su | Contenuto visibile che la supporta |
|---|---|---|---|---|
| ITnode | `Organization` | `https://itnode.it/#organization` | tutte le pagine | footer (nome, indirizzo, contatti, P.IVA) e pagina Contatti |
| Logo | `ImageObject` | `https://itnode.it/#logo` | dentro Organization | logo nell'header |
| Sito | `WebSite` | `https://itnode.it/#website` | tutte le pagine | il sito stesso |
| Puglia Digitale | `Brand` | `https://itnode.it/puglia-digitale/#brand` | dentro Organization | link nel footer e pagina dedicata |
| Città Digitali | `Brand` | `https://itnode.it/citta-digitali/#brand` | dentro Organization | link nel footer e pagina dedicata |
| Pagina | `WebPage` o `ContactPage` | `<URL canonico>#webpage` | ogni pagina tranne la 404 | la pagina stessa |
| Breadcrumb | `BreadcrumbList` | `<URL canonico>#breadcrumb` | pagine interne | breadcrumb visibile |
| Fondatore | `Person` | `https://itnode.it/#founder` | home | sezione fondatore |
| SIII | `Service` | `https://itnode.it/siii/#service` | `/siii/` | pagina SIII |
| Video Città Digitali | `VideoObject` | `https://itnode.it/citta-digitali/#video` | `/citta-digitali/` | sezione video |

**`Brand` e `Service` estendono l'elenco delle linee guida.** L'elenco comprende Organization, WebSite, WebPage, BreadcrumbList, Person e VideoObject.
- Perché aggiungerli: sono tipi schema.org validi, il contenuto visibile li supporta e legano esplicitamente SIII, Puglia Digitale e Città Digitali a ITnode. Serve perché quei nomi hanno omonimi (`ricerca-keyword.md`, sez. 2).
- Non producono risultati avanzati.
- Se si preferisce restare nell'elenco, basta togliere i nodi e le proprietà `brand` e `about` che li richiamano.

## 3. Nodi per pagina

| Pagina | Nodi |
|---|---|
| `/` | Organization (con `founder`), WebSite, WebPage (`about` → Organization), Person |
| `/siii/` | Organization, WebSite, WebPage (`about` → Service), BreadcrumbList, Service |
| `/puglia-digitale/` | Organization, WebSite, WebPage (`about` → Brand Puglia Digitale), BreadcrumbList |
| `/citta-digitali/` | Organization, WebSite, WebPage (`about` → Brand Città Digitali; `video` → VideoObject), BreadcrumbList, VideoObject solo con dati completi |
| `/contatti/` | Organization, WebSite, ContactPage (`about` → Organization), BreadcrumbList |
| `/privacy-policy/`, `/cookie-policy/` | Organization, WebSite, WebPage, BreadcrumbList |
| 404 | nessuno |

## 4. Implementazione in Astro

```astro
---
// src/components/JsonLd.astro
interface Props {
  graph: Record<string, unknown>[];
}
const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': Astro.props.graph })
  .replace(/</g, '\\u003c'); // a "</script>" inside a string must never close the tag
---
<script is:inline type="application/ld+json" set:html={json} />
```

- `is:inline` esplicito, così Astro non elabora lo script.
- Il grafo si costruisce con funzioni pure in `src/lib/schema.ts`: `organization({ withFounder })`, `website()`, `webPage(page)`, `breadcrumb(page)`, `person()`, `siiiService()`, `video()`. Leggono `src/data/company.ts` e `src/data/pages.ts`.
- Gli URL assoluti derivano da `Astro.site`.
- `name` della WebPage è il title senza « | ITnode»; `description` coincide con la meta description.
- `name` delle voci del BreadcrumbList sono le etichette del breadcrumb visibile.

## 5. Esempi

### 5.1 Home: grafo completo
Organization e WebSite sono identici su tutte le pagine, tranne `founder`, che compare solo qui dove esiste il nodo Person. Gli esempi successivi mostrano solo i nodi specifici della pagina: in produzione il `@graph` include anche Organization (senza `founder`) e WebSite.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://itnode.it/#organization",
      "name": "ITnode",
      "legalName": "ITNODE S.r.l.",
      "alternateName": ["ITNODE", "itNode"],
      "url": "https://itnode.it/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://itnode.it/#logo",
        "url": "https://itnode.it/brand/logo-itnode.png",
        "contentUrl": "https://itnode.it/brand/logo-itnode.png",
        "caption": "ITnode"
      },
      "description": "ITnode ha creato Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale che portano online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.",
      "email": "info@itnode.it",
      "telephone": "+39 080 2466520",
      "vatID": "IT08937270729",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Sant'Anna, 34",
        "postalCode": "70021",
        "addressLocality": "Acquaviva delle Fonti",
        "addressRegion": "BA",
        "addressCountry": "IT"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+39 080 2466520",
        "email": "info@itnode.it",
        "availableLanguage": "it"
      },
      "brand": [
        {
          "@type": "Brand",
          "@id": "https://itnode.it/puglia-digitale/#brand",
          "name": "Puglia Digitale",
          "url": "https://www.lapugliadigitale.it/",
          "description": "Piattaforma interattiva immersiva per la valorizzazione territoriale."
        },
        {
          "@type": "Brand",
          "@id": "https://itnode.it/citta-digitali/#brand",
          "name": "Città Digitali",
          "url": "https://xn--cittdigitali-19a.it/",
          "description": "Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano."
        }
      ],
      "founder": { "@id": "https://itnode.it/#founder" }
    },
    {
      "@type": "WebSite",
      "@id": "https://itnode.it/#website",
      "url": "https://itnode.it/",
      "name": "ITnode",
      "alternateName": "ITNODE",
      "inLanguage": "it",
      "publisher": { "@id": "https://itnode.it/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://itnode.it/#webpage",
      "url": "https://itnode.it/",
      "name": "ITnode | Esperienze immersive per imprese e territori",
      "description": "(meta description della home, da mappa-keyword-url.md)",
      "inLanguage": "it",
      "isPartOf": { "@id": "https://itnode.it/#website" },
      "about": { "@id": "https://itnode.it/#organization" }
    },
    {
      "@type": "Person",
      "@id": "https://itnode.it/#founder",
      "name": "Giacomo Lenoci",
      "jobTitle": "Fondatore",
      "worksFor": { "@id": "https://itnode.it/#organization" },
      "sameAs": ["https://www.linkedin.com/in/giacomo-lenoci/"]
    }
  ]
}
```

Valori da confermare prima della pubblicazione:
- **`legalName`**: forma esatta, come nel footer `[DA VERIFICARE: «ITNODE S.r.l.» o «ITNODE S.R.L.»]`.
- **`vatID`**: la P.IVA con prefisso IT `[DA VERIFICARE]`. Deve comparire nel footer (soglia legale di CLAUDE.md).
- **`address`**: le linee guida la indicano come sede operativa; per le fonti pubbliche coincide con la sede legale `[DA VERIFICARE]`.
- **`telephone`**: è il numero fisso. Il cellulare resta solo in pagina, perché non sappiamo a quale funzione corrisponda.
- **`brand.url` di Città Digitali**: `https://xn--cittdigitali-19a.it/`, cioè cittàdigitali.it in ASCII, senza www e con la barra finale (specifiche, sez. 5.3).
  - Il dominio è confermato dall'utente il 2026-10-05. Il dominio senza accento, `cittadigitali.it`, non è del cliente e non va mai usato.
  - Prima del go-live resta da verificare da una rete normale la forma canonica del portale (specifiche, sez. 5.3).
  - Nel codice l'URL viene da `portals.cittaDigitali.url` (`src/data/site.ts`): nessun indirizzo scritto a mano nel markup.
- **Brand Puglia Digitale**: nel codice non si pubblica finché il cliente non conferma il ruolo di ITnode (brief D1; `src/lib/structured-data.ts`). Per questo la WebPage di `/puglia-digitale/` esce senza `about`. L'esempio mostra il nodo come sarà dopo la conferma; il suo `url` è `[DA VERIFICARE]` (specifiche, domanda 9).
- **`logo`**: file stabile in `public/brand/` (specifiche, sez. 2.4). Niente `width` e `height` nel markup: per schema.org non sono numeri semplici, e Google ricava le dimensioni dal file. Quando arriva il logo vettoriale si sostituisce il PNG, con lo stesso URL.
- **`sameAs` di Organization**: si aggiunge quando il cliente conferma i profili ufficiali di ITnode, per esempio Instagram @itnodedigital segnalato da seo-content `[DA FORNIRE]`. Il LinkedIn personale del fondatore non va usato qui, perché appartiene alla persona.
- **Proprietà escluse**: `foundingDate`, `numberOfEmployees` e `geo`, perché sono dati non verificati.

### 5.2 SIII

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://itnode.it/siii/#webpage",
      "url": "https://itnode.it/siii/",
      "name": "SIII, Siti Interattivi Immersivi oltre il tour 360°",
      "description": "(meta description della pagina, da mappa-keyword-url.md)",
      "inLanguage": "it",
      "isPartOf": { "@id": "https://itnode.it/#website" },
      "about": { "@id": "https://itnode.it/siii/#service" },
      "breadcrumb": { "@id": "https://itnode.it/siii/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://itnode.it/siii/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://itnode.it/" },
        { "@type": "ListItem", "position": 2, "name": "SIII", "item": "https://itnode.it/siii/" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://itnode.it/siii/#service",
      "name": "SIII – Siti Interattivi Immersivi",
      "serviceType": "Sito Interattivo Immersivo",
      "description": "Il SIII replica digitalmente gli spazi fisici dell'impresa e crea un ambiente navigabile da desktop e smartphone, in cui esplorare gli ambienti, interagire con hotspot, vedere prodotti e video, richiedere informazioni e prenotare servizi.",
      "provider": { "@id": "https://itnode.it/#organization" },
      "url": "https://itnode.it/siii/"
    }
  ]
}
```

La `description` del Service riprende il testo della pagina (linee guida, sez. 10) e va allineata al copy definitivo.

### 5.3 Puglia Digitale

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://itnode.it/puglia-digitale/#webpage",
      "url": "https://itnode.it/puglia-digitale/",
      "name": "Puglia Digitale: destination marketing immersivo",
      "description": "(meta description della pagina, da mappa-keyword-url.md)",
      "inLanguage": "it",
      "isPartOf": { "@id": "https://itnode.it/#website" },
      "about": { "@id": "https://itnode.it/puglia-digitale/#brand" },
      "breadcrumb": { "@id": "https://itnode.it/puglia-digitale/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://itnode.it/puglia-digitale/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://itnode.it/" },
        { "@type": "ListItem", "position": 2, "name": "Puglia Digitale", "item": "https://itnode.it/puglia-digitale/" }
      ]
    }
  ]
}
```

I numeri della pagina (30+ città, ~200.000 partite IVA, 60%) restano solo nel testo, come dati forniti dal cliente. Non vanno nel markup.

### 5.4 Città Digitali, con VideoObject

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://itnode.it/citta-digitali/#webpage",
      "url": "https://itnode.it/citta-digitali/",
      "name": "Città Digitali: le attività del territorio online",
      "description": "(meta description della pagina, da mappa-keyword-url.md)",
      "inLanguage": "it",
      "isPartOf": { "@id": "https://itnode.it/#website" },
      "about": { "@id": "https://itnode.it/citta-digitali/#brand" },
      "breadcrumb": { "@id": "https://itnode.it/citta-digitali/#breadcrumb" },
      "video": { "@id": "https://itnode.it/citta-digitali/#video" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://itnode.it/citta-digitali/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://itnode.it/" },
        { "@type": "ListItem", "position": 2, "name": "Città Digitali", "item": "https://itnode.it/citta-digitali/" }
      ]
    },
    {
      "@type": "VideoObject",
      "@id": "https://itnode.it/citta-digitali/#video",
      "name": "[DA FORNIRE: titolo visibile accanto al video]",
      "description": "[DA FORNIRE: descrizione visibile accanto al video]",
      "thumbnailUrl": "https://itnode.it/video/citta-digitali-poster.jpg",
      "uploadDate": "[DA FORNIRE: data e ora di prima pubblicazione in ISO 8601 con fuso orario]",
      "duration": "[DA FORNIRE: durata in ISO 8601, ricavata dal file]",
      "contentUrl": "https://itnode.it/video/citta-digitali.mp4"
    }
  ]
}
```

Finché mancano i dati del video, la pagina pubblica solo WebPage (senza `video`) e BreadcrumbList (sezione 6).

### 5.5 Contatti

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://itnode.it/contatti/#webpage",
      "url": "https://itnode.it/contatti/",
      "name": "Contatti, Acquaviva delle Fonti (BA)",
      "description": "(meta description della pagina, da mappa-keyword-url.md)",
      "inLanguage": "it",
      "isPartOf": { "@id": "https://itnode.it/#website" },
      "about": { "@id": "https://itnode.it/#organization" },
      "breadcrumb": { "@id": "https://itnode.it/contatti/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://itnode.it/contatti/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://itnode.it/" },
        { "@type": "ListItem", "position": 2, "name": "Contatti", "item": "https://itnode.it/contatti/" }
      ]
    }
  ]
}
```

### 5.6 Privacy Policy e Cookie Policy
Nella Cookie Policy cambiano solo URL, `@id` e nomi (`cookie-policy`, «Cookie Policy»).

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://itnode.it/privacy-policy/#webpage",
      "url": "https://itnode.it/privacy-policy/",
      "name": "Privacy Policy",
      "description": "(meta description della pagina, da mappa-keyword-url.md)",
      "inLanguage": "it",
      "isPartOf": { "@id": "https://itnode.it/#website" },
      "breadcrumb": { "@id": "https://itnode.it/privacy-policy/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://itnode.it/privacy-policy/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://itnode.it/" },
        { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://itnode.it/privacy-policy/" }
      ]
    }
  ]
}
```

Se le informative passano in `noindex` (specifiche, nota ¹ della sez. 1.2), il JSON-LD può restare: non crea problemi.

## 6. VideoObject: dati mancanti e comportamento

| Proprietà | Per Google | Valore previsto | Chi lo fornisce | Stato |
|---|---|---|---|---|
| `name` | obbligatoria | Titolo visibile accanto al video | copywriter-content | manca |
| `thumbnailUrl` | obbligatoria | `https://itnode.it/video/citta-digitali-poster.jpg`: un fotogramma del video, lo stesso usato come `poster` (minimo 60×30 px; conviene la risoluzione piena del video) | sviluppo, dal file; scelta del fotogramma di creative-director | manca: il file non è raggiungibile dall'ambiente |
| `uploadDate` | obbligatoria | Data e ora di prima pubblicazione, in ISO 8601 con fuso orario | cliente | manca |
| `description` | consigliata | Una o due frasi visibili accanto al video | copywriter-content | manca |
| `duration` | consigliata | ISO 8601, per esempio `PT1M45S` | sviluppo, con `ffprobe` | manca |
| `contentUrl` | consigliata | URL del file MP4 usato nel `<video>`: oggi su railway.app, in prospettiva su itnode.it (specifiche, sez. 4.5) | sviluppo | provvisorio |
| `embedUrl` | consigliata | Non si applica: non esiste un player incorporabile | — | — |

Comportamento finché mancano i dati:
1. **Il nodo non si pubblica** finché mancano `name`, `thumbnailUrl` o `uploadDate`.
   - In codice serve una guardia: `if (video.name && video.thumbnailUrl && video.uploadDate)`.
   - Insieme al nodo sparisce anche la proprietà `video` della WebPage; il resto del grafo si pubblica normalmente.
   - Un VideoObject senza i campi obbligatori genera errori in Search Console e non porta alcun beneficio.
2. **Mai valori inventati**: la data della build non vale come `uploadDate`, un'immagine generica non vale come `thumbnailUrl`, niente durata stimata.
3. **Appena il file è disponibile**, poster e durata si ricavano dal file stesso:

   ```bash
   # duration in seconds (convert to ISO 8601, e.g. 105.2 → PT1M45S)
   ffprobe -v error -show_entries format=duration -of csv=p=0 citta-digitali.mp4
   # poster frame (the timestamp is chosen by creative-director)
   ffmpeg -ss 00:00:03 -i citta-digitali.mp4 -frames:v 1 -q:v 2 citta-digitali-poster.jpg
   ```

   Al cliente resta da fornire solo `uploadDate`. Se la data di prima pubblicazione non è nota, si usa quella di pubblicazione sul nuovo sito, con l'ok del cliente: schema.org definisce `uploadDate` come data di caricamento sul sito.
4. **Aspettative.** Qui il video è una sezione della pagina, non il suo contenuto principale.
   - Da dicembre 2023 Google mostra miniature e risultati video solo quando il video è il contenuto principale della pagina.
   - È probabile che Search Console segnali che il video non è il contenuto principale: è previsto e non richiede interventi.
   - Il markup resta utile per descrivere la pagina.
5. **Scansionabilità**: `contentUrl` e `thumbnailUrl` devono essere accessibili a Googlebot. Se il file resta su railway.app, il robots.txt di quell'host non deve bloccarlo `[DA VERIFICARE]`.

## 7. Person: condizioni per pubblicarla
Il nodo Person esce solo quando sono vere tutte queste condizioni:
- **Nome e ruolo visibili** nella sezione fondatore della home.
  - `name`: «Giacomo Lenoci» `[DA VERIFICARE con il cliente: lo indicano il LinkedIn tra i contatti delle linee guida e l'email g.lenoci@itnode.it, emersa dalla ricerca]`.
  - `jobTitle`: il ruolo esatto come appare in pagina `[DA FORNIRE: per esempio «Fondatore»]`.
- **`sameAs`**: solo il LinkedIn indicato nelle linee guida, e solo se il link è visibile nella sezione fondatore o nel footer. Altri profili (sito personale, YouTube) solo se il cliente conferma che sono suoi: il nome ha omonimi (`ricerca-keyword.md`).
- **`image`**: solo una foto confermata come scatto reale (specifiche, sez. 4.4), con lo stesso URL generato da `astro:assets` per l'immagine in pagina. Fino ad allora la proprietà si omette.
- **Niente carriera nel markup**: numeri e tappe (36 anni, 10.000+ clienti, aziende precedenti) restano nel testo, dove li ha forniti il cliente.
- **`founder` di Organization** compare solo sulla home, dove esiste il nodo Person.

## 8. Validazione
- **Automatica**: controllo n. 11 delle specifiche, sez. 7. Controlla JSON valido, riferimenti `@id` risolti, campi richiesti, coerenza con il contenuto visibile e assenza di `[DA …]`. Gli URL del markup sono in ASCII, con gli IDN in punycode (specifiche, sez. 5.3 e controllo 13).
- **Manuale in staging**:
  - Rich Results Test in modalità «codice», perché lo staging è protetto;
  - Schema Markup Validator (validator.schema.org).

  Si controllano almeno la home e Città Digitali.
- **Dopo il lancio**, in Search Console:
  - rapporto Breadcrumb: nessun errore;
  - rapporto Video: se il VideoObject è pubblicato, l'esito «non è il contenuto principale» è previsto.
- **Verifica degli esempi di questo documento** (2026-09-28): tutti i blocchi JSON sono validi. I riferimenti `@id` si risolvono unendo i nodi condivisi della 5.1. Tipi e proprietà sono conformi alle definizioni schema.org del pacchetto `schema-dts`.

## Fonti
Consultate il 2026-09-28 tramite gli estratti dei risultati di ricerca: developers.google.com non è raggiungibile dall'ambiente.
- Google, VideoObject (campi obbligatori `name`, `thumbnailUrl`, `uploadDate`): https://developers.google.com/search/docs/appearance/structured-data/video
- Google, video come contenuto principale (dicembre 2023): https://developers.google.com/search/blog/2023/12/video-is-the-main-content
- Google, Organization (nessuna proprietà obbligatoria; `vatID`, `legalName`, logo di almeno 112×112): https://developers.google.com/search/docs/appearance/structured-data/organization
- Google, breadcrumb solo su desktop: https://developers.google.com/search/blog/2025/01/simplifying-breadcrumbs
- Ufficio Camerale, ITNODE S.R.L. (P.IVA e sede): https://www.ufficiocamerale.it/2699/itnode-srl
- Sito attuale, email g.lenoci@itnode.it dagli estratti della ricerca `site:itnode.it`: https://itnode.it/

Consultate il 2026-10-05, tramite gli estratti dei risultati di ricerca:
- Google, equivalenza tra forma punycode e forma Unicode di un hostname: https://developers.google.com/search/blog/2015/07/googles-handling-of-new-top-level
- Home del portale Città Digitali nell'indice, sul dominio senza www: https://xn--cittdigitali-19a.it/

## Ipotesi da validare
- L'estensione con `Brand` e `Service` (sez. 2) è utile e non crea attrito con le linee guida.
- `contentUrl` e `thumbnailUrl` del video su itnode.it (dipende dall'hosting del video).
- La sede di Via Sant'Anna 34 è insieme sede legale e operativa.
- La forma canonica del portale Città Digitali è il dominio senza www (specifiche, sez. 5.3).

## Domande aperte
1. **Cliente.** Nome e ruolo esatti del fondatore come devono apparire in pagina? Quale foto è un ritratto reale utilizzabile?
2. **Cliente.** Video: file originale, data di prima pubblicazione, presenza di parlato (per i sottotitoli), fotogramma preferito per il poster.
3. **Cliente.** Quali sono i profili social ufficiali di ITnode (`sameAs`)? Qual è il dominio del portale di Puglia Digitale (specifiche, domanda 9)? Il dominio di Città Digitali è chiuso dal 2026-10-05.
4. **Cliente.** Ragione sociale nella forma esatta, REA e capitale sociale: servono al footer (soglia legale) e a `legalName`.
5. **copywriter-content.** Titolo e descrizione visibili del video; testo definitivo della descrizione del SIII.

## Decisioni richieste
- **seo-technical (presa)**: `@id` e composizione dei grafi per pagina come da sez. 2–3; VideoObject pubblicato solo con dati completi; Person solo con nome, ruolo ed eventuale foto confermati; URL dei portali in ASCII, con `brand.url` di Città Digitali uguale a `https://xn--cittdigitali-19a.it/` (2026-10-05).
- **Team (creative-director, se serve)**: confermare l'estensione con `Brand` e `Service`, o chiedere di restare nell'elenco delle linee guida.
