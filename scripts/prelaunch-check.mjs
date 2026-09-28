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
const anyPage = (re) => pages.filter((p) => re.test(p.html)).map((p) => p.path.replace(dist, ''));

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
