# Luyando Mooya's Kitchen

Website for **Luyando Mooya's Kitchen**, a home bakery in Ndola, Zambia. *Beautifully made. Made for your moments.*

Built with [Astro](https://astro.build) as a fully static site, with prices, menu items and photos managed in [Sanity](https://luy.sanity.studio): Home, Menu (two menus: **Bakes** at `/menu` and **Kitchen** at `/menu/kitchen`), About and Contact, with no backend. Every "Order" button opens WhatsApp with the order already written.

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
| **Prices, menu items, descriptions, photos** | Sanity Studio: https://luy.sanity.studio (fetched in `src/data/menu.ts`) |
| Studio schema (what fields the owner sees) | `studio/schemas/` |
| WhatsApp message wording | `src/lib/whatsapp.ts` |
| Pages | `src/pages/` |
| Components (Seal logo, buttons, cards, header, footer…) | `src/components/` |
| Styles | `src/styles/global.css` (uses the variables in `tokens.css`) |
| Brand tokens, the source of truth for colours, spacing and motion | `design/tokens.json` → `src/styles/tokens.css` |
| Brand book (logo rules, colour rules, voice, motion) | `design/brand-book.md` |
| Logo files (SVG + PNG), favicon, share image | `public/brand/`, `public/favicon.svg`, `public/og.png` |

### Editing the menu and photos (Sanity)

The owner edits everything at **https://luy.sanity.studio**. In the Studio there are three things:

- **Bakes menu** and **Kitchen menu**: categories (name, description, photo) and items (name, price, description, optional photo). Drag to reorder. Prices are typed as plain numbers (`1600`) and shown as `K1,600`. Each category's "from" price is the cheapest item in it.
- **Site photos**: the home page's main photo, the four "peek inside the kitchen" photos and the About page photo.

When the owner presses **Publish**, a webhook calls the Cloudflare deploy hook. The site rebuilds and is live a minute or two later. Any photo slot without a photo shows a labelled placeholder. While the Kitchen menu has no categories, its page shows the "coming soon" panel.

**Setup (already done unless noted):**
- Sanity project `qo3wi0jo`, public dataset `production`, seeded with the original price list.
- Studio deployed from `studio/` (`cd studio && npm install && npm run deploy`; `npm run dev` runs it locally on :3333).
- **To do:** invite the owner at sanity.io/manage → project → Members (Editor role).
- **To do:** create a deploy hook in Cloudflare (Worker → Settings → Builds → Deploy Hooks), then add it as a Sanity webhook (sanity.io/manage → API → Webhooks: trigger on create/update/delete, POST, filter `_type in ["menu", "sitePhotos"]`, dataset `production`).

If Sanity can't be reached during a build, the build fails and the live site keeps its last version. It never goes out with missing prices.

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
