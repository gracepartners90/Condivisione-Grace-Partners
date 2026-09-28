// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Canonical host (docs/seo/specifiche-tecniche.md §1.1). DA VERIFICARE with the client.
  site: 'https://itnode.it',
  // Canonical URLs always end with "/" (§1.3); the dev server enforces the same policy.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
