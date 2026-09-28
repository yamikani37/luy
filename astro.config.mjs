// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // The live address, used for canonical links and the share image.
  // Set SITE_URL in Cloudflare's build settings (e.g. https://luyandomooyaskitchen.com),
  // or replace the fallback below once the domain is known.
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'ignore',
});
