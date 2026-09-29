// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // The live address, used for canonical links and the share image.
  // Set SITE_URL in Cloudflare's build settings to override (e.g. for a custom domain).
  site: process.env.SITE_URL || 'https://luy.yami-kan37.workers.dev',
  trailingSlash: 'ignore',
});
