/**
 * Go-live gate on the built site (CLAUDE.md thresholds 1 and 5; reviews of 2026-09-28).
 * Run after `astro build`: `npm run check:launch`. Exits with 1 while something blocks G4.
 * It checks the build, not the intentions: a staging build is expected to fail here.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push({ path: p, html: readFileSync(p, 'utf8') });
  }
})(dist);
const page = (rel) => pages.find((p) => p.path === join(dist, rel))?.html ?? '';

// Veridicity reserves still open (ADR 002; veracity review B2, I2; G4 verdict N10). Set to true
// only with the client's written confirmation, recorded in docs/.
// basilicaProvenance: ADR 002 §3.3, A9, provenance or rights of the basilica image on /puglia-digitale/: authorized by
// the user on 2026-10-09 («tutto autorizzato, vai e carica»), recorded in docs/brief/brief-consolidato.md.
const CONFIRMED = { highTraffic: false, clients10k: false, basilicaProvenance: true };
const anyPage = (re) => pages.filter((p) => re.test(p.html)).map((p) => p.path.replace(dist, ''));

// ADR 002 §3.1, A7: the written consent of each business whose SIII screenshots are in the build, recorded in
// docs/brief/brief-consolidato.md §5 («Consensi delle imprese»). Keys are the file prefixes in src/assets/images/
// (siii-<key>-desktop-… or siii-<key>-mobile-…). Set a key to true only when that consent is recorded.
// A screenshot whose key is not listed here fails the check, so a new business cannot slip through.
// All five authorized by the user on 2026-10-09 («tutto autorizzato, vai e carica»).
const SHOWCASE_CONSENT = { 'masseria-santella': true, 'maison-mimina': true, dielle: true, yes: true, 'la-tana-di-aldo': true };
const showcaseShots = pages.flatMap((p) =>
  [...p.html.matchAll(/_astro\/siii-([a-z0-9-]+?)-(?:desktop|mobile)-/g)].map((m) => ({ key: m[1], page: p.path.replace(dist, '') })),
);
const withoutConsent = [...new Set(showcaseShots.filter((s) => SHOWCASE_CONSENT[s.key] !== true).map((s) => `${s.key} (${s.page})`))];

const checks = [
  {
    name: 'Dati societari obbligatori (soglia 5): sede legale, Registro delle imprese e REA, capitale sociale',
    ok: ['Sede legale', 'REA', 'Capitale sociale'].every((s) => page('contatti/index.html').includes(s)),
  },
  { name: 'Nessun segnaposto «Asset richiesto» visibile', ok: anyPage(/data-asset-slot=/).length === 0, detail: anyPage(/data-asset-slot=/) },
  { name: 'Endpoint del modulo configurato (PUBLIC_FORM_ENDPOINT)', ok: anyPage(/data-form-inactive/).length === 0, detail: anyPage(/data-form-inactive/) },
  { name: 'Privacy Policy definitiva (niente «Testo in preparazione»)', ok: !page('privacy-policy/index.html').includes('Testo in preparazione') },
  {
    name: 'Numeri di Puglia Digitale con data e fonte (niente nota «Dati ITnode.» senza data)',
    ok: !/Dati ITnode\.</.test(page('puglia-digitale/index.html')),
  },
  {
    // Minimal guard: which alternative is needed depends on the video (speech or music only).
    name: 'Video di Città Digitali: sottotitoli (<track>) o descrizione testuale (A3)',
    ok: /<track kind="captions"|Leggi la descrizione del video/.test(page('citta-digitali/index.html')),
  },
  {
    name: 'Claim senza conferma scritta: «ad alto traffico» (B2), «10.000+ clienti» (I2)',
    ok:
      (CONFIRMED.highTraffic || !/alto traffico/.test(page('citta-digitali/index.html'))) &&
      (CONFIRMED.clients10k || !/10\.000\+/.test(page('index.html'))),
  },
  {
    // Visual direction §1.4: digits as given by the source (2 decimals, coordinate-luoghi.md).
    name: 'Coordinate alla precisione della fonte (al massimo 2 decimali)',
    ok: anyPage(/\d\.\d{3,}° [NSEO]/).length === 0,
    detail: anyPage(/\d\.\d{3,}° [NSEO]/),
  },
  {
    // ADR 002 §3.1, A7: each business's screenshots only with its own written consent (SHOWCASE_CONSENT above).
    name: 'Schermate delle esperienze SIII con il consenso scritto di ogni impresa (A7)',
    ok: withoutConsent.length === 0,
    detail: withoutConsent,
  },
  {
    // ADR 002 §3.3, A9: the basilica image with the portal's overlays only with its provenance or rights confirmed.
    name: 'Immagine della basilica con provenienza o diritti confermati (A9)',
    ok: CONFIRMED.basilicaProvenance || anyPage(/_astro\/basilica-piattaforma\./).length === 0,
    detail: anyPage(/_astro\/basilica-piattaforma\./),
  },
  { name: 'Video di Città Digitali ospitato sul sito (non su railway.app)', ok: anyPage(/railway\.app/).length === 0, detail: anyPage(/railway\.app/) },
];

let failed = 0;
for (const c of checks) {
  if (!c.ok) failed++;
  console.log(`${c.ok ? 'OK  ' : 'NO  '} ${c.name}${!c.ok && c.detail?.length ? ` → ${c.detail.join(', ')}` : ''}`);
}

// Not blocking: the typographic variant (PUBLIC_SLOT_MODE=publish) is accepted at go-live,
// but the assets are still owed by the client.
const pending = pages.flatMap((p) => [...p.html.matchAll(/data-asset-pending="([^"]+)"/g)].map((m) => m[1]));
if (pending.length) console.log(`INFO Varianti «in pubblicazione» al posto degli asset (${pending.length}): ${[...new Set(pending)].join(', ')}`);
console.log(
  failed
    ? `\n${failed} controlli non superati: il go-live (G4) resta bloccato. Vedi le review in docs/review/.`
    : '\nTutti i controlli superati.',
);
if (failed) process.exitCode = 1;
