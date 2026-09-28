# Luyando Mooya's Kitchen

Website for **Luyando Mooya's Kitchen**, a home bakery in Ndola, Zambia. *Beautifully made. Made for your moments.*

Built with [Astro](https://astro.build) as a fully static site: Home, Menu (two menus: **Bakes** at `/menu` and **Kitchen** at `/menu/kitchen`), About and Contact, with no backend. Every "Order" button opens WhatsApp with the order already written.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the build
npm run deploy    # build + deploy to Cloudflare (after `npx wrangler login`)
```

## Hosting: Cloudflare

The site is served from Cloudflare as static files (Workers static assets, `wrangler.jsonc`). There is no server code.

**Option A: auto-deploy from GitHub (recommended)**
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → pick `yamikani37/luy`.
2. Build command: `npm run build`. Deploy command: `npx wrangler deploy` (Cloudflare usually fills these in).
3. Under **Variables**, add `SITE_URL` = the live address (e.g. `https://luy.<your-subdomain>.workers.dev`, or her own domain later). It's used for canonical links and the share image.
4. Every push to `main` then rebuilds and deploys.

**Option B: deploy from your machine**
```bash
npx wrangler login        # once
npm run deploy            # builds, then uploads dist/ to Cloudflare
```

**Custom domain:** Worker → **Settings** → **Domains & Routes** → **Add custom domain**, then update `SITE_URL`.

`public/_headers` sets long caching for built assets and a few security headers. `npm run cf:preview` runs the site locally the way Cloudflare serves it.

## Where things live

| What | Where |
| --- | --- |
| Business details (phones, WhatsApp number, location, Instagram) | `src/data/site.ts` |
| **Prices and menu items**: `bakes` and `kitchen` | `src/data/menu.ts` |
| WhatsApp message wording | `src/lib/whatsapp.ts` |
| Pages | `src/pages/` |
| Components (Seal logo, buttons, cards, header, footer…) | `src/components/` |
| Styles | `src/styles/global.css` (uses the variables in `tokens.css`) |
| Brand tokens, the source of truth for colours, spacing and motion | `design/tokens.json` → `src/styles/tokens.css` |
| Brand book (logo rules, colour rules, voice, motion) | `design/brand-book.md` |
| Logo files (SVG + PNG), favicon, share image | `public/brand/`, `public/favicon.svg`, `public/og.png` |

### Changing a price
Edit `src/data/menu.ts`. The price on the card and in the WhatsApp message both come from there.

### Filling in the Kitchen menu
Add categories to the `kitchen` array in `src/data/menu.ts`, in the same shape as `bakes` (an example is in the comments). While it's empty, the Kitchen page shows a "coming soon, ask what's cooking" panel. Once it has items, it switches to the full menu with category tabs and "Order this" buttons automatically.

### Adding real photos
Photos currently show as labelled placeholders. To add one:
1. Put the image in `src/assets/` (e.g. `src/assets/bento.jpg`).
2. Import it in the page and pass it to the `Photo` component:
   ```astro
   ---
   import bento from '../assets/bento.jpg';
   ---
   <Photo src={bento} alt="A pistachio bento cake in its box" label="bento" />
   ```
   Astro resizes and compresses it automatically.

### Instagram link
Set `instagramUrl` in `src/data/site.ts` and the footer and Contact page link to it automatically.

## Brand at a glance

- **Pistachio** `#A7B97E` is the brand colour: fills, the seal, primary buttons. **Never text.**
- **Olive Ink** `#3B4722` is all text. **Copper** `#C9793A` is a small accent only.
- **Fraunces** (headings) + **Figtree** (body), self-hosted via Fontsource.
- Motion: gentle rise-and-fade on scroll, the seal's ring turns slowly, and hover lifts. All of it switches off for people who prefer reduced motion.

Full rules are in `design/brand-book.md`.

---

Designed & built by [Yami](https://iamyami.com).
