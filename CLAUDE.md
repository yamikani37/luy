# CLAUDE.md

Astro 7 static site for Luyando Mooya's Kitchen (home bakery, Ndola). Read `design/brand-book.md` before any visual change.

## Commands
- `npm run dev`: local server on :4321
- `npm run build`: must pass before committing

## Rules
- Two menus: `bakes` and `kitchen` in `src/data/menu.ts`, rendered by `MenuBoard.astro` on `/menu` and `/menu/kitchen` with `MenuSwitch.astro` on top.
- Keep the footer credit "Designed & built by Yami" (https://iamyami.com).
- **Prices live only in `src/data/menu.ts`** and come from the client. Never invent or change a price, product, phone number or business claim. Missing info gets a clearly labelled placeholder.
- Business info lives in `src/data/site.ts`. WhatsApp links are always built with `orderLink()` from `src/lib/whatsapp.ts`. Keep the message wording.
- Colours, spacing, radii, shadows, durations and easings come from CSS variables in `src/styles/tokens.css`, generated from `design/tokens.json`. Don't hard-code hex values in components. If a token changes, edit the JSON and regenerate `tokens.css`, keeping the same variable names.
- Colour rules: pistachio (`--pistachio-500`) is never used for text; text on pistachio is `--olive-900`; copper is for accents only (`--copper-700` when it must be readable text).
- The logo is `src/components/Seal.astro` (outlined paths in `src/data/seal-paths.json`) or the SVGs in `public/brand/`. Never retype the logo in a font.
- Every control is a pill, at least 44px tall, with a visible focus ring (`--focus`).
- Motion: add `data-reveal` (plus `style="--i:N"` for stagger) to fade and rise elements on scroll. Everything must respect `prefers-reduced-motion`, as `global.css` already does.
- British spelling. Prices written `K1,600`.
- Plain Astro plus small inline `<script>`s. No UI framework unless there's a clear need.
