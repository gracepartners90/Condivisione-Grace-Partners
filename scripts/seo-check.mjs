/**
 * SEO and link checks on the built site (docs/seo/specifiche-tecniche.md §7).
 * Run after `astro build`: `npm run check:seo`. Exits with 1 when a problem is found.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
const [dist, site] = process.argv.slice(2);
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) files.push(p); } })(dist);
const pages = {};
const problems = [];
const warn = (f, m) => problems.push(`${f}: ${m}`);
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i')) || [])[1];
for (const f of files) {
  const rel = '/' + relative(dist, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const html = readFileSync(f, 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = attr((html.match(/<meta[^>]+name="description"[^>]*>/) || [''])[0], 'content');
  const canonical = attr((html.match(/<link[^>]+rel="canonical"[^>]*>/) || [''])[0], 'href');
  const robots = attr((html.match(/<meta[^>]+name="robots"[^>]*>/) || [''])[0], 'content');
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const lang = (html.match(/<html[^>]*lang="([^"]+)"/) || [])[1];
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const og = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:locale'].filter((p) => !html.includes(`property="${p}"`));
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  pages[rel] = { title, desc, canonical, robots, h1s, ids, html, jsonld };
  if (!title) warn(rel, 'missing <title>');
  else if (title.length > 60) warn(rel, `title ${title.length} chars`);
  if (!desc) warn(rel, 'missing meta description');
  else if (desc.length < 110 || desc.length > 160) warn(rel, `description ${desc.length} chars`);
  if (h1s !== 1) warn(rel, `${h1s} <h1>`);
  if (lang !== 'it') warn(rel, `lang=${lang}`);
  const is404 = rel.startsWith('/404');
  if (is404) { if (!/noindex/.test(robots || '')) warn(rel, '404 without noindex'); }
  else {
    if (canonical !== site + rel) warn(rel, `canonical ${canonical} != ${site + rel}`);
    if (og.length) warn(rel, `missing ${og.join(', ')}`);
    if (!jsonld.length) warn(rel, 'no JSON-LD');
  }
  for (const j of jsonld) { try { const g = JSON.parse(j); const idsSeen = new Set(); for (const n of g['@graph'] || []) { if (n['@id'] && idsSeen.has(n['@id'])) warn(rel, `duplicate @id ${n['@id']}`); idsSeen.add(n['@id']); } } catch (e) { warn(rel, 'invalid JSON-LD: ' + e.message); } }
  // Images need alt.
  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\salt=/.test(img)) warn(rel, `img without alt: ${img.slice(0, 80)}`);
  // External links in a new tab need rel=noopener.
  for (const a of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) if (!/rel="[^"]*noopener/.test(a)) warn(rel, `_blank without noopener: ${a.slice(0, 80)}`);
}
// Duplicates.
const dup = (key) => { const seen = {}; for (const [p, d] of Object.entries(pages)) if (d[key]) (seen[d[key]] ??= []).push(p); for (const [v, ps] of Object.entries(seen)) if (ps.length > 1) problems.push(`duplicate ${key} on ${ps.join(', ')}`); };
dup('title'); dup('desc');
// Internal links and anchors.
for (const [p, d] of Object.entries(pages)) {
  for (const m of d.html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [path, hash] = href.split('#');
    const target = path === '' ? p : path;
    const t = pages[target];
    if (!t) { problems.push(`${p}: broken internal link ${href}`); continue; }
    if (hash && !t.ids.has(hash)) problems.push(`${p}: missing anchor #${hash} on ${target}`);
  }
}
// Sitemap.
const smFile = join(dist, 'sitemap-0.xml');
if (existsSync(smFile)) {
  const sm = readFileSync(smFile, 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, ''));
  for (const p of Object.keys(pages)) { const indexable = !/noindex/.test(pages[p].robots || '') && !p.startsWith('/404'); if (indexable && !locs.includes(p)) problems.push(`sitemap missing ${p}`); if (!indexable && locs.includes(p)) problems.push(`sitemap lists noindex ${p}`); }
  for (const l of locs) if (!pages[l]) problems.push(`sitemap lists unknown ${l}`);
} else problems.push('no sitemap-0.xml');
console.log(`${Object.keys(pages).length} pages checked`);
for (const [p, d] of Object.entries(pages)) console.log(`${p.padEnd(18)} ${String(d.title?.length).padStart(3)} | ${String(d.desc?.length).padStart(3)} | h1 ${d.h1s} | ${d.title}`);
console.log(problems.length ? '\nPROBLEMS:\n' + problems.join('\n') : '\nno problems');
if (problems.length) process.exitCode = 1;
