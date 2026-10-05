---
titolo: Review del dominio del portale Città Digitali
owner: seo-technical
contributi: []
stato: in revisione
versione: 1.0
aggiornato: 2026-10-05
fonti: [docs/brief/linee-guida.md (§22), docs/brief/brief-consolidato.md (glossario, S7), docs/strategia/citta-digitali-elenco.md (§1, §5), conferma dell'utente del 2026-10-05 riferita dalla sessione principale, commit eb691ee e 9b7c5c4, src/data/site.ts, src/lib/structured-data.ts, src/scripts/track.ts, scripts/seo-check.mjs, dist/ (build del 2026-10-05), fonti web elencate in fondo]
---

# Review · dominio del portale Città Digitali (Fase 5, dopo G4)

## Perimetro e metodo
- **Oggetto**:
  - la correzione del commit `eb691ee`, cioè `portals.cittaDigitali` in `src/data/site.ts` e la frase della pagina Città Digitali;
  - la build `dist/` del 2026-10-05, con 8 pagine. Dopo `eb691ee` non sono cambiati `src/`, `public/` né `scripts/`: il commit `9b7c5c4` tocca solo documenti;
  - i miei documenti in `docs/seo/`.
- **Strumenti**:
  - `npm run build` e `npm run check:seo`;
  - uno script di inventario su tutti i file di testo di `dist/` (HTML, JS, CSS, XML, txt, `_headers`, `_redirects`). Per ogni link al portale legge `href`, `target`, `rel` e testo accessibile; legge i valori del JSON-LD e il testo visibile; cerca le forme da escludere;
  - la conversione IDN di Node (`url.domainToASCII` e `url.domainToUnicode`);
  - WebSearch.
- **Cosa non si può verificare da qui**:
  - il portale è bloccato dalla policy di rete. Non ho cercato copie in cache o archivi, e non ho interrogato il portale né il suo DNS per altre strade;
  - il registro del `.it` (`rdap.nic.it`) risponde 403 dalla policy: non ho riprovato.
- **Nessun file di `src/` modificato.**

## Fatti
- **Dominio confermato dall'utente il 2026-10-05**, con le parole «il dominio senza accento non è nostro, vai pure», riferite dalla sessione principale.
  - Il portale del cliente è `cittàdigitali.it`.
  - `cittadigitali.it`, senza accento, non è del cliente.
  - La domanda al cliente sul dominio è chiusa.
- **Punycode.** `cittàdigitali.it` corrisponde a `xn--cittdigitali-19a.it`. La conversione è verificata nei due sensi con `node:url`, anche partendo dalla forma scomposta della «à» (a seguita dall'accento U+0300).
- **Indice di ricerca (2026-10-05).**
  - La home del portale è `https://xn--cittdigitali-19a.it/` («Home - Città Digitali»).
  - Le pagine interne sono tutte sul dominio senza www, per esempio `/il-progetto/`, `/contatti/`, `/dati-aziendali/` e `/caltanissetta/`.
  - `http://www.cittadigitali.it/` è «CITTA' DIGITALI», il progetto omonimo.

## Decisione di dominio: forma dell'indirizzo
Decido io, come owner della SEO tecnica. La regola è registrata nelle specifiche, sezione 5.3.

| Dove | Forma | Valore |
|---|---|---|
| `href` dei link | ASCII (punycode), `https`, dominio senza www | `https://xn--cittdigitali-19a.it` |
| JSON-LD (`brand.url`) | ASCII, forma serializzata con la barra finale | `https://xn--cittdigitali-19a.it/` |
| Testo visibile e nomi accessibili | Unicode, nella forma composta (U+00E0), senza protocollo né www | `cittàdigitali.it` |

**Perché.**
1. **Per Google le due forme sono equivalenti.** Google tratta la forma punycode e quella Unicode dello stesso hostname come lo stesso host, quindi la scelta non cambia nulla per la Ricerca.
2. **L'ASCII conta per tutti gli altri consumatori dell'URL.**
   - È la forma che il browser ricava comunque dall'`href`, secondo lo standard URL di WHATWG.
   - È quella che restituiscono `URL.href` e `URL.hostname`, e quindi quella che arriva agli analytics.
   - Non dipende dalla conversione IDN di crawler di terzi, validatori, strumenti di verifica dei link e client email.
   - Nel JSON-LD evita confronti falliti tra la «à» composta e quella scomposta.
3. **Dominio senza www.** È l'host su cui l'indice mostra tutte le pagine del portale. La piattaforma precedente sta su `www2.` e non c'è traccia di `www.`. Linkare l'host indicizzato evita un redirect (specifiche, 5.2). Va confermato da una rete normale (oss. 1).
4. **Barra finale.**
   - Alla radice `https://host` e `https://host/` producono la stessa richiesta (`GET /`): nell'`href` la barra non cambia nulla e non causa redirect.
   - Nel JSON-LD si scrive la forma serializzata, con la barra. È anche la forma con cui l'indice elenca la home del portale.
5. **Un `brand.url` esatto distingue le due Città Digitali.** È il dato che lega il Brand di ITnode al suo portale e lo separa dall'omonimo sul dominio senza accento.

**Esito.** La decisione coincide con la forma applicata nel commit `eb691ee`: non serve alcuna modifica in `src/`. Le oss. 4 e 5 sono facoltative.

## Verifica della build

| Controllo | Esito |
|---|---|
| Link al portale | **11 link in 8 pagine**, tutti `href="https://xn--cittdigitali-19a.it"` con `target="_blank"` e `rel="noopener"`, senza `nofollow` né `noreferrer`. Tutti hanno `data-destination-id="citta-digitali"` e `data-outbound-type="portale"`. Dove si trovano: footer di tutte le pagine, 404 compresa (8); pagina Città Digitali, nella CTA «Visita il portale» dell'hero e nell'azione dopo l'invio del modulo (2); Contatti, nella sezione «I portali» (1) |
| JSON-LD | `Organization.brand[0].url` vale `https://xn--cittdigitali-19a.it/` su 7 pagine. La 404 non ha JSON-LD. Tutti i riferimenti `@id` si risolvono |
| Testo visibile | 11 occorrenze di «cittàdigitali.it», tutte nella forma composta: 8 nel footer, 1 nella frase «Riunisce in un unico portale, cittàdigitali.it, …», 2 in Contatti (nome accessibile e indirizzo visibile con `aria-hidden`) |
| Forme da escludere | Nessuna occorrenza in tutti i file di `dist/` per: `cittadigitali`, `www.` davanti al punycode, host Unicode dentro un URL, «à» scomposta, entità HTML, `http://` verso il portale, `www2.` |
| Totale | 18 occorrenze del punycode (11 link più 7 JSON-LD), le stesse contate dalla sessione principale |
| `npm run check:seo` | Nessun problema |

## Osservazioni

### 1. [BLOCCANTE per il go-live] Verifica del portale da una rete normale
- **Dove**: link e JSON-LD del portale su 8 pagine; `src/data/site.ts`, riga 58.
- **Problema**: da qui il portale è bloccato. Non posso verificare:
  - che il dominio si risolva;
  - che risponda in HTTPS con un certificato valido;
  - come si comportano `www.` e `http://`;
  - quale forma canonica dichiara.
- **Motivazione**:
  - specifiche 5.2 e controllo 13: link diretti all'URL finale, che risponde 200;
  - il portale è la CTA primaria della pagina Città Digitali e compare nel footer di ogni pagina;
  - un dominio delle linee guida che non si risolveva è già passato inosservato fino al 2026-10-05.
- **Proposta**: chi ha una rete senza blocchi, per esempio l'utente, esegue lo script e gira l'output a seo-technical. Io chiudo la verifica e, se serve, indico la riga da cambiare. Lo script verifica anche gli altri link esterni (oss. 2) ed è collaudato su un host raggiungibile; sul portale non l'ho eseguito.

  ```bash
  #!/usr/bin/env bash
  # External links of the new ITnode site: checks from a network without blocks
  # (docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md, obs. 1 and 2).
  H="${1:-xn--cittdigitali-19a.it}"   # cittàdigitali.it

  hop() {   # one request, no redirects followed: status code and Location
    local out rc
    printf '%-50s ' "$1"
    out=$(curl -s -o /dev/null -m 15 -w '%{http_code} -> %{redirect_url}' "$1"); rc=$?
    case $rc in
      0) echo "$out" ;;
      6) echo "the name does not resolve (DNS)" ;;
      7|28) echo "no answer (refused or timeout, curl $rc)" ;;
      35|51|60) echo "TLS error: invalid or mismatched certificate (curl $rc)" ;;
      *) echo "curl error $rc" ;;
    esac
  }

  echo "== 1. Città Digitali portal: each variant, one hop at a time"
  for u in "https://$H/" "http://$H/" "https://www.$H/" "http://www.$H/"; do hop "$u"; done

  echo "== 2. Full chain from the site's link"
  curl -sL -o /dev/null -m 30 -w '%{http_code}, %{num_redirects} redirect(s), final URL: %{url_effective}\n' "https://$H" || echo "curl error $?"

  echo "== 3. Canonical and URLs declared by the portal's home page"
  curl -sL -m 30 "https://$H/" | grep -ioE "<link[^>]*canonical[^>]*>|<meta[^>]*og:url[^>]*>|\"url\" *: *\"[^\"]*\"" | sort -u | head -n 10

  echo "== 4. TLS certificate: names covered and expiry"
  echo | openssl s_client -connect "$H:443" -servername "$H" 2>/dev/null | openssl x509 -noout -subject -enddate -ext subjectAltName 2>/dev/null || echo "certificate not readable"

  echo "== 5. Other external links in the build: expected 200 with no Location (LinkedIn often answers 999 to scripts: open it in a browser)"
  for u in https://www.lapugliadigitale.it https://www.varesedigitale.it https://www.altamuradigitale.com \
           https://www.caltanissettadigitale.it https://www.acquavivadigitale.com https://www.gravinadigitale.it \
           https://www.monopolidigitale.it https://www.acquavivadigitale.com/dielle/ \
           https://www.cassanodigitale.it/masseriasantella/ https://www.monopolidigitale.it/maisonmimina/ \
           https://www.linkedin.com/in/giacomo-lenoci/; do hop "$u"; done
  ```

  **Esiti attesi per il portale e cosa fare se sono diversi:**

  | Verifica | Atteso | Se diverso |
  |---|---|---|
  | `https://xn--cittdigitali-19a.it/` | `200 ->`, senza Location | **Redirect verso `https://www.…/`**: in `src/data/site.ts` `url` diventa `'https://www.xn--cittdigitali-19a.it'`, e il JSON-LD lo segue da solo. Il testo visibile resta `cittàdigitali.it`. **DNS, TLS o 5xx**: il go-live si blocca finché il cliente non sistema il dominio, oppure finché creative-director non decide di togliere il link |
  | `http://…`, `https://www.…`, `http://www.…` | `301` o `308` verso `https://xn--cittdigitali-19a.it/`, oppure `www.` che non si risolve | Si segnala al cliente: il nostro link non cambia. Se `www.` risponde 200 senza redirect, il portale ha due copie della home: è un problema del portale, non del sito |
  | Catena dal link del sito | `200, 0 redirect(s)`, URL finale `https://xn--cittdigitali-19a.it/` | Il link si allinea all'URL finale |
  | Canonical della home del portale | `https://xn--cittdigitali-19a.it/`, oppure la stessa forma in Unicode | Il link segue l'URL che il portale serve senza redirect; l'incoerenza si segnala al cliente |
  | Certificato | Il nome `xn--cittdigitali-19a.it` è tra i SAN, e la scadenza non è vicina al lancio | Si segnala al cliente |
  | Browser | Il link del footer e «Visita il portale» aprono la home del portale in una nuova scheda, e la barra degli indirizzi mostra `cittàdigitali.it` | Si segnala a seo-technical |

### 2. [IMPORTANTE] Altri domini delle linee guida con indizi di indirizzi superati
- **Dove**:
  - in `src/data/site.ts`: `portals.pugliaDigitale`, `pugliaPlaces` e `italyPlaces`;
  - le esperienze SIII;
  - nelle pagine: footer (Puglia Digitale, 8 pagine), `/puglia-digitale/`, `/citta-digitali/`, `/siii/`.
- **Problema**: il caso di Città Digitali mostra che un dominio delle linee guida può essere superato. Gli estratti di ricerca del 2026-10-05 danno indizi simili per altri link, da verificare:

  | Link del sito | Indizio |
  |---|---|
  | `https://www.lapugliadigitale.it` (8 pagine) | La ricerca non restituisce pagine di questo dominio, come già per brand-strategist (elenco, §1). Nell'indice c'è invece `https://puglia-digitale.it/`, «Puglia Digitale», una piattaforma di esperienze immersive sulle città pugliesi `[DA VERIFICARE: se è del cliente]` |
  | `https://www.varesedigitale.it` | Nell'indice c'è il dominio senza www, `https://varesedigitale.it/` («Varese Virtual Tour»): il link con www passa probabilmente da un redirect |
  | `https://www.altamuradigitale.com` | Nessuna pagina del dominio. «Altamura Digitale» nell'indice è un portale di servizi del Comune per cittadini e imprese, quindi un probabile omonimo `[DA VERIFICARE]`. La pagina di Altamura del cliente sta su `www2.cittàdigitali.it` (elenco, §2) |
  | `https://www.caltanissettadigitale.it` | Nessuna pagina del dominio. Esiste invece `https://xn--cittdigitali-19a.it/caltanissetta/` |
  | acquavivadigitale.com, gravinadigitale.it, monopolidigitale.it, cassanodigitale.it | La ricerca combinata non restituisce nulla: indizio non conclusivo |

- **Motivazione**:
  - specifiche 5.2 e controllo 13: 200 senza redirect;
  - soglia 1 (veridicità): un link verso un omonimo o un dominio scaduto presenta come del cliente un sito che non lo è.
- **Proposta**:
  1. Stessa verifica da una rete normale: è il blocco 5 dello script dell'oss. 1.
  2. Due domande al cliente (vedi Domande aperte): il dominio di Puglia Digitale e i portali delle città.
  3. Se un indirizzo risponde con un redirect verso un altro URL del cliente, il link passa all'URL finale. Basta una riga in `src/data/site.ts`, che indico io dopo la verifica.
  4. Se un dominio non risponde o è di altri, il link passa alla pagina della città su cittàdigitali.it, se esiste e il cliente la conferma, oppure si toglie.
     - Il testo visibile lo decidono copywriter-content e brand-strategist.
     - Se cambia il disegno, decide creative-director.
     - La forma dell'URL spetta a me.

### 3. [IMPORTANTE] Documenti di altri membri con il dominio senza accento
- **Dove**, per owner:

  | Owner | File e righe |
  |---|---|
  | copywriter-content | `docs/contenuti/copy-deck/citta-digitali.md`, righe 57, 78 e 254; `docs/contenuti/copy-deck/contatti.md`, righe 145–147 e 155 |
  | copywriter-brand | `docs/contenuti/microcopy.md`, riga 57; `docs/contenuti/tone-of-voice.md`, riga 71. La regola «esattamente come nelle linee guida» ha ora un'eccezione |
  | ux-designer | `docs/ux/sitemap.md`, riga 149; `docs/ux/struttura-pagine.md`, riga 356 |
  | cro-specialist | `docs/cro/strategia-conversione.md`, riga 97 |

- **Già allineati**:
  - `docs/brief/brief-consolidato.md` e `docs/strategia/citta-digitali-elenco.md` (brand-strategist, commit `9b7c5c4`);
  - `docs/seo/mappa-keyword-url.md` e `docs/seo/ricerca-keyword.md` (seo-content: modifiche in corso, non ancora committate quando ho scritto questa review);
  - i miei due documenti (sotto).
- **Problema**: sono le fonti da cui si riprendono copy e link. Una nuova sincronizzazione reintrodurrebbe il dominio di altri.
- **Motivazione**: soglia 1 (veridicità) e una sola fonte di verità per ogni dato.
- **Proposta**:
  - nel testo si scrive «cittàdigitali.it»;
  - l'URL è `https://xn--cittdigitali-19a.it`;
  - le note `[DA VERIFICARE]` sul dominio si chiudono con la conferma del 2026-10-05.
- **Da non toccare**:
  - `docs/brief/linee-guida.md`, §22: è il testo del cliente, e la correzione è registrata nel brief consolidato;
  - le review del 2026-09-28, che sono documenti storici;
  - `utm_source` `cittadigitali` in `docs/cro/piano-misurazione.md`: è un'etichetta, non un dominio.

### 4. [SUGGERIMENTO] Guardia contro il ritorno del dominio sbagliato in `scripts/seo-check.mjs`
- **Dove**: `scripts/seo-check.mjs`.
- **Problema**: oggi nessun controllo impedisce che `cittadigitali.it` torni nel sito, per esempio copiando un copy deck non ancora allineato (oss. 3). Nessun controllo verifica neppure che gli URL siano in ASCII.
- **Motivazione**: specifiche 5.3 e controllo 13.
- **Proposta**: la modifica qui sotto. L'ho provata su una copia dello script:
  - sulla build attuale: nessun problema;
  - su una copia di `dist/` alterata apposta, con il dominio senza accento in un `href` e nel testo, e con l'host Unicode in un `href` e nel JSON-LD: i 4 casi vengono segnalati;
  - `lecittadigitali.it`, l'iniziativa precedente, non viene segnalato.

  ```diff
  @@ -11,6 +11,8 @@
   const problems = [];
   const warn = (f, m) => problems.push(`${f}: ${m}`);
   const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i')) || [])[1];
  +// Domains that must never appear: the portal is cittàdigitali.it (xn--cittdigitali-19a.it), with the accent.
  +const FORBIDDEN_HOSTS = [/(?<![\w.-])(?:www\.)?cittadigitali\.it/i];
   for (const f of files) {
     const rel = '/' + relative(dist, f).replace(/index\.html$/, '').replace(/\\/g, '/');
     const html = readFileSync(f, 'utf8');
  @@ -42,6 +44,11 @@
     for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\salt=/.test(img)) warn(rel, `img without alt: ${img.slice(0, 80)}`);
     // External links in a new tab need rel=noopener.
     for (const a of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) if (!/rel="[^"]*noopener/.test(a)) warn(rel, `_blank without noopener: ${a.slice(0, 80)}`);
  +  // Absolute URLs in ASCII: IDN hosts in punycode, paths percent-encoded (docs/seo/specifiche-tecniche.md §5.3).
  +  for (const m of html.matchAll(/\s(?:href|src|content)="(https?:[^"]*)"/g)) if (/[^\x00-\x7f]/.test(m[1])) warn(rel, `non-ASCII URL: ${m[1]}`);
  +  for (const j of jsonld) { try { (function visit(o) { if (typeof o === 'string') { if (/^https?:/.test(o) && /[^\x00-\x7f]/.test(o)) warn(rel, `non-ASCII URL in JSON-LD: ${o}`); } else if (o && typeof o === 'object') Object.values(o).forEach(visit); })(JSON.parse(j)); } catch {} }
  +  // Hosts that are not the client's: cittadigitali.it without the accent (docs/review/2026-10-05-dominio-citta-digitali-seo-technical.md).
  +  for (const host of FORBIDDEN_HOSTS) if (host.test(html)) warn(rel, `forbidden host ${host.source}`);
   }
  ```

### 5. [SUGGERIMENTO] `brand.url` costruito con `abs()`
- **Dove**: `src/lib/structured-data.ts`, riga 67.
- **Problema**: oggi `url` è `${portals.cittaDigitali.url}/`. Funziona finché in `site.ts` l'URL è senza barra e in ASCII. Ho verificato due casi:
  - se qualcuno scrivesse `'https://xn--cittdigitali-19a.it/'`, il JSON-LD diventerebbe `https://xn--cittdigitali-19a.it//`, cioè un URL diverso;
  - se scrivesse l'host con l'accento, il JSON-LD lo pubblicherebbe in Unicode.
- **Motivazione**: specifiche 5.3, che chiedono l'ASCII nella forma serializzata.
- **Proposta**:

  ```ts
  // src/lib/structured-data.ts, organization(), Città Digitali brand
  url: abs(portals.cittaDigitali.url), // serialised URL: ASCII host, exactly one trailing slash
  ```

  `abs()` è `new URL(path, site.url).href`: con un URL assoluto restituisce sempre la forma serializzata. Sul valore attuale il risultato non cambia, cioè resta `https://xn--cittdigitali-19a.it/`.

### 6. [SUGGERIMENTO] Negli analytics il portale compare in punycode
- **Dove**: `src/scripts/track.ts`, righe 54–56; `docs/cro/piano-misurazione.md`, evento `outbound_click`.
- **Problema**: `link_url` e `link_domain` vengono da `el.href` e `el.hostname`, che sono sempre in ASCII, comunque sia scritto l'`href`.
  - Nei report GA4 il portale comparirà come `xn--cittdigitali-19a.it`.
  - Un filtro su `cittadigitali.it` o `cittàdigitali.it` non troverebbe nulla.
- **Motivazione**: piano di misurazione, eventi P1.
- **Proposta**: per cro-specialist, senza modifiche al codice.
  - Nei report e nei segmenti si usa `destination_id = citta-digitali`, presente su tutti gli 11 link.
  - Se serve il dominio, si filtra su `xn--cittdigitali-19a.it`.

## Documenti SEO aggiornati
- **`docs/seo/specifiche-tecniche.md` 0.2**:
  - 5.2: tabella dei link esterni e regola sugli IDN;
  - nuova sezione 5.3, con il fatto confermato, la forma dell'indirizzo e le verifiche da una rete normale;
  - controllo 13;
  - fonti, ipotesi, domande e decisioni.
- **`docs/seo/dati-strutturati.md` 0.2**:
  - esempio 5.1 con `brand.url` in punycode;
  - valori confermati;
  - nota sul Brand Puglia Digitale, che il codice non pubblica finché il cliente non risponde a D1, per cui la WebPage di `/puglia-digitale/` esce senza `about`;
  - validazione, fonti, ipotesi, domande e decisioni.
- **Checklist di lancio**: `docs/seo/checklist-lancio.md` non esiste ancora. Si scrive con lo staging sull'hosting scelto (verdetto G4, passo 3). Le verifiche del portale sono nella sezione 5.3 delle specifiche e nell'oss. 1, pronte per entrarci.

## Verdetto di dominio (SEO tecnica)
**Correzione conforme. Per questo punto la build è approvata; il go-live del link dipende dall'oss. 1.**
- La forma applicata nel commit `eb691ee` coincide con la mia decisione: nessuna modifica obbligatoria in `src/`.
- In `dist/` il dominio senza accento non compare più. Link, attributi, JSON-LD e testo visibile sono coerenti.
- Prima del go-live vanno chiuse l'oss. 1 (bloccante) e le oss. 2 e 3. Le oss. 4–6 sono miglioramenti.
- Il verdetto di gate spetta al creative-director.

## Fonti
Consultate il 2026-10-05 tramite gli estratti dei risultati di ricerca: developers.google.com e i portali non sono raggiungibili dall'ambiente.
- Google, equivalenza tra forma punycode e forma Unicode di un hostname, nel post sul trattamento dei nuovi domini di primo livello (luglio 2015): https://developers.google.com/search/blog/2015/07/googles-handling-of-new-top-level
- WHATWG, URL Standard (conversione dell'host in ASCII): https://url.spec.whatwg.org/ · Node.js, `url.domainToASCII`: https://nodejs.org/api/url.html
- W3C, IDN in forma ASCII negli URI: https://www.w3.org/International/articles/idn-and-iri/
- Portale nell'indice, dominio senza www: https://xn--cittdigitali-19a.it/ · https://xn--cittdigitali-19a.it/il-progetto/ · https://xn--cittdigitali-19a.it/contatti/ · https://xn--cittdigitali-19a.it/dati-aziendali/ · https://xn--cittdigitali-19a.it/caltanissetta/
- Omonimo sul dominio senza accento: http://www.cittadigitali.it/ («CITTA' DIGITALI»)
- Puglia Digitale: https://puglia-digitale.it/ («Puglia Digitale»); nessun risultato per lapugliadigitale.it
- Varese: https://varesedigitale.it/ («Varese Virtual Tour»)
- Altamura Digitale, servizi del Comune: https://www.altamuralife.it/notizie/arriva-altamura-digitale-il-comune-a-portata-di-clik/

## Ipotesi da validare
- La forma canonica del portale Città Digitali è il dominio senza www, `https://xn--cittdigitali-19a.it/` (oss. 1).
- `puglia-digitale.it` è il portale di Puglia Digitale del cliente e non un omonimo (oss. 2).
- I domini delle città indicati dalle linee guida sono ancora attivi e del cliente (oss. 2).

## Domande aperte
- **Chiusa il 2026-10-05**. La domanda era «Il portale è cittàdigitali.it? Il dominio cittadigitali.it, senza accento, è vostro?». Risposta dell'utente: il portale è cittàdigitali.it; il dominio senza accento non è del cliente.
- **Utente**, o chiunque abbia una rete senza blocchi: eseguire lo script dell'oss. 1 e girare l'output a seo-technical.
- **Cliente**:
  1. Il portale di Puglia Digitale è lapugliadigitale.it, come nelle linee guida, oppure puglia-digitale.it?
  2. I portali delle città (varesedigitale.it, altamuradigitale.com, caltanissettadigitale.it, gravinadigitale.it, monopolidigitale.it, acquavivadigitale.com) sono attivi e vostri? Per le città che ora hanno una pagina su cittàdigitali.it, quale indirizzo preferite che il sito linki?
  3. Solo se la verifica lo rende necessario: il portale risponde sia con www sia senza, senza redirect. Quale dei due è l'indirizzo ufficiale?

## Decisioni richieste
- **seo-technical (presa)**: forma dell'indirizzo del portale e regola sugli IDN, registrate nelle specifiche, sezione 5.3.
- **Sessione principale**:
  - oss. 4 e 5, facoltative;
  - dopo l'output dell'oss. 1, l'eventuale modifica di una riga in `src/data/site.ts` che indicherò io;
  - le domande al cliente nell'elenco del verdetto G4, §6.
- **copywriter-content, copywriter-brand, ux-designer e cro-specialist**: allineare i propri documenti (oss. 3).
- **cro-specialist**: oss. 6.
- **creative-director**: nessuna decisione nuova se la verifica dà gli esiti attesi. Altrimenti decide se togliere i link che non funzionano (oss. 1 e 2).
