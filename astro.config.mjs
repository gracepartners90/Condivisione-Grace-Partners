// @ts-check
import { defineConfig, sharpImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Canonical host (docs/seo/specifiche-tecniche.md §1.1). DA VERIFICARE with the client.
  site: 'https://itnode.it',
  // Canonical URLs always end with "/" (§1.3); the dev server enforces the same policy.
  trailingSlash: 'always',
  // Astro's HTML compression drops a line break before an inline element ("Crea\n<a>" renders
  // "Crea<a>"), gluing words to links. Keep the whitespace: after gzip it costs about 1 kB.
  compressHTML: false,
  build: {
    format: 'directory',
    // All CSS inline: no render-blocking request (docs/performance/architettura.md §1).
    inlineStylesheets: 'always',
  },
  image: {
    // Measured on the real assets: sharp defaults weigh 20–35% more for no visible gain.
    service: sharpImageService({
      avif: { quality: 50 },
      webp: { quality: 75 },
      jpeg: { quality: 75, mozjpeg: true },
    }),
  },
  integrations: [sitemap()],
});
