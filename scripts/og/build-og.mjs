// Builds the social cards (Open Graph / X) from scripts/og/og-card.html.
//
//   node scripts/og/build-og.mjs
//
// 1. injects the current wordmark (src/assets/brand/itnode-wordmark.svg) into the template;
// 2. renders it at 1200 × 630 with the Playwright CLI (Chromium, already installed);
// 3. converts the PNG to an sRGB JPEG with sharp and checks size (< 300 KB) and dimensions.
//
// Add a card per page by adding a variant below (theme calce|notte, line1, line2); the URL
// convention is /og/<page>.jpg (docs/seo/specifiche-tecniche.md §2.3).
import { execFileSync } from 'node:child_process';
import { readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const MAX_BYTES = 300 * 1024;

const VARIANTS = [{ out: 'public/og/default.jpg', query: {} }];

const template = await readFile(join(here, 'og-card.html'), 'utf8');
const wordmark = (await readFile(join(root, 'src/assets/brand/itnode-wordmark.svg'), 'utf8')).replace(/<!--[\s\S]*?-->/g, '').trim();
// Rendered next to the template so the relative font URLs keep working; removed afterwards.
const page = join(here, '.render.html');
await writeFile(page, template.replace('<!-- WORDMARK -->', wordmark));

try {
  for (const { out, query } of VARIANTS) {
    const url = pathToFileURL(page);
    url.search = new URLSearchParams(query).toString();
    const png = join(here, '.render.png');
    execFileSync('npx', ['playwright', 'screenshot', '--viewport-size=1200,630', '--wait-for-timeout=300', url.href, png], { stdio: 'inherit' });
    await sharp(png)
      .flatten({ background: '#f3f1ec' })
      .toColorspace('srgb')
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toFile(join(root, out));
    await rm(png);
    const { size } = await stat(join(root, out));
    const meta = await sharp(join(root, out)).metadata();
    if (meta.width !== 1200 || meta.height !== 630) throw new Error(`${out}: ${meta.width}×${meta.height}, expected 1200×630`);
    if (size > MAX_BYTES) throw new Error(`${out}: ${Math.round(size / 1024)} KB, over 300 KB`);
    console.log(`${out}  1200 × 630  ${Math.round(size / 1024)} KB`);
  }
} finally {
  await rm(page, { force: true });
}
