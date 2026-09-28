// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Change to the real domain when the site moves off Netlify's subdomain.
  site: 'https://luyand.netlify.app',
  trailingSlash: 'ignore',
});
