# CLAUDE.md

Astro 7 static site for Luyando Mooya's Kitchen (home bakery, Ndola). Read `design/brand-book.md` before any visual change.

## Commands
- `npm run dev`: local server on :4321
- `npm run build`: must pass before committing
- `npm run deploy`: build + `wrangler deploy` to Cloudflare (static assets from `dist/`, config in `wrangler.jsonc`)

## Content (Sanity)
Prices, menu items, descriptions and photos are edited by the owner in Sanity Studio (https://luy.sanity.studio, project `qo3wi0jo`, dataset `production`, public). The site fetches them at build time in `src/data/menu.ts` (client and image helpers in `src/lib/sanity.ts`), so the site stays fully static. Publishing in the Studio calls a Cloudflare deploy hook, which rebuilds the site. The Studio lives in `studio/` with its own `package.json`: schemas in `studio/schemas/`, `npm run dev` / `npm run deploy` from inside `studio/`.

## Hosting
Cloudflare Workers static assets. `SITE_URL` env var sets `site` in `astro.config.mjs` (canonical + OG URLs). Headers live in `public/_headers`. No server code or adapter: keep the site fully static.

## Rules
- Two menus: `bakes` and `kitchen` (Sanity documents with those IDs, loaded in `src/data/menu.ts`), rendered by `MenuBoard.astro` on `/menu` and `/menu/kitchen` with `MenuSwitch.astro` on top.
- Keep the footer credit "Designed & built by Yami" (https://iamyami.com).
- **Prices, items, descriptions and photos live only in Sanity** and come from the client. Never hard-code them in the site, and never invent or change a price, product, phone number or business claim. Prices are stored as numbers and formatted `K1,600` by `kwacha()`. Missing info gets a clearly labelled placeholder.
- Business info lives in `src/data/site.ts`. WhatsApp links are always built with `orderLink()` from `src/lib/whatsapp.ts`. Keep the message wording.
- Colours, spacing, radii, shadows, durations and easings come from CSS variables in `src/styles/tokens.css`, generated from `design/tokens.json`. Don't hard-code hex values in components. If a token changes, edit the JSON and run `npm run tokens` to regenerate `tokens.css`, keeping the same variable names.
- Dark mode: page grounds and text use the role tokens (`--bg`, `--bg-alt`, `--bg-mist`, `--surface`, `--surface-soft`, `--line`, `--text`, `--text-muted`, `--text-accent`), which switch in dark mode. Brand blocks (pistachio, olive bands, the seal) use palette tokens and look the same in both themes. It follows the system setting, and the header toggle overrides it (saved in `localStorage`).
- Colour rules: pistachio (`--pistachio-500`) is never used for text; text on pistachio is `--olive-900`; copper is for accents only (`--copper-700` when it must be readable text).
- The logo is `src/components/Seal.astro` (outlined paths in `src/data/seal-paths.json`) or the SVGs in `public/brand/`. Never retype the logo in a font.
- Every control is a pill, at least 44px tall, with a visible focus ring (`--focus`).
- Motion: add `data-reveal` (plus `style="--i:N"` for stagger) to fade and rise elements on scroll. Everything must respect `prefers-reduced-motion`, as `global.css` already does.
- British spelling. Prices written `K1,600`.
- Plain Astro plus small inline `<script>`s. No UI framework unless there's a clear need.
