# Luyando Mooya's Kitchen

Beautifully made. Made for your moments.

Luyando Mooya's Kitchen is a home bakery in Ndola, Zambia, making cakes, cupcakes and bento treats to order. People order on WhatsApp. This system is the brand in one place: the logo, colours, type, motion and the website's building blocks. The Astro site is built from it.

## The idea

A **baker's seal**: a scalloped edge like a tart tin or a cake doily, with the name running around the ring and her initials, LM, at the centre. It works as a stamp on boxes, a sticker where the ribbon crosses, and the icon in a browser tab.

**Pistachio** is the brand colour, fresh, sweet and unusual among local bakers. **Olive Ink** carries the words. **Copper** is the small warm accent at the heart of the seal, a nod to the Copperbelt.

## Voice

- Warm, simple and personal, like the baker answering you herself. Short sentences. "We'd love to hear from you."
- Talk about moments and occasions (birthdays, weddings, a quiet Tuesday), not about "products".
- Ordering is always one tap away, and the words say so plainly: "Order on WhatsApp", "Order this".
- Prices are written K180, K1,000: capital K, no space, a comma from a thousand.
- British spelling (colour, favourite, flavour).
- Sizes and layers are spelled out the way her price list does: Small, Medium, Large; 2 layers, 3 & 4 layers.
- No emoji in headings or buttons.

## Logo

| Version | When |
| --- | --- |
| Seal (`seal.svg`) | The primary logo on cream or white. Hero, stickers, packaging. 64px and up. |
| Seal on pistachio / on olive | The same seal reversed for pistachio-500 or olive-800 grounds. |
| Lockup (`lockup.svg`) | Seal and stacked name, for the footer, price lists and letterheads. |
| Inline lockup (`lockup-inline.svg`) | Mark plus the name on one line, for the site header and narrow spaces. |
| Mark (`mark.svg`) | Scallop and LM only, for anything under 64px: favicon, profile picture, header at 44px. |

Rules:
- Keep one scallop's depth (about 7% of the seal's width) clear on all sides.
- Don't recolour the logo outside the three approved tones. Don't put the light seal on pistachio, stretch it, add shadows, or set the name in another font.
- The lettering in the logo files is outlined, so it looks the same everywhere. Use the files, never retype the logo.

## Colour

Proportions on a typical page: about 60% cream, 25% pistachio, 10% olive, 5% copper.

- **pistachio-500** is the loudest colour: primary buttons, the seal, big blocks and ribbons. It is **never text**, because it is too light to read on cream. Anything on pistachio is olive-900.
- **olive-800** (Olive Ink) is all headings and body text, secondary buttons and the dark closing band. **olive-600** is muted text.
- **copper-500** is only for small accents: the seal centre, short rules, the underline on nav links and the focus ring. For copper-coloured words (eyebrow labels), use **copper-700**.
- **cream-50** is the page. **parchment-100** and **pistachio-100** (mist) separate bands and hold cards.
- Every text pairing here is at least 4.5:1. The token notes list the ratios.
- **Dark mode** swaps the cream grounds for deep olive-black and the Olive Ink for a warm cream. Pistachio blocks, olive bands, copper and the seal stay exactly as they are. The site follows the phone's setting; the sun/moon pill in the header switches it.

## Type

- **Fraunces** (display serif, soft) for headings, item names and the tagline in italic. It is warm and hand-finished, like the bakes.
- **Figtree** (sans) for everything you read or tap: body, prices, buttons, labels.
- Both are free Google Fonts. Load Fraunces with the SOFT axis at 50 to match the logo.
- Headings use sentence case. Eyebrow labels are uppercase Figtree with 0.18em tracking.
- One italic accent line per screen, e.g. "*Made for your moments.*" under the hero heading.

## Layout

- Content is at most 1200px wide, centred, with a 32px gutter on desktop and 16px on phones.
- Section padding is space-24 (96px) on desktop and space-16 (64px) on phones.
- Every clickable control is a pill (radius-pill) and at least 44px tall. Cards use radius-lg.
- Menu grid: 3 columns on desktop, 2 on tablet, 1 on phones, with a 24px gap.
- Bands alternate between cream, parchment and pistachio, with an occasional ScallopDivider where one meets the next.

## Photography

- Her real cakes, in natural daylight, on cream, white or pistachio-tinted surfaces.
- Bento boxes shot top-down; tall and tiered cakes at eye level.
- Crop tight enough to see the icing. No stock photos. Until real photos arrive, the site shows clearly labelled placeholders.

## Motion

Things should feel like icing being piped: smooth and settling, never bouncy.

- **Reveals:** sections and cards fade in and rise 16px as they scroll into view (duration-reveal, ease-rise). Siblings follow each other 60ms apart.
- **Hero:** on load the seal scales from 0.92 to 1 while its name ring starts a slow turn (40s a turn, paused on hover). The heading lines rise in one after the other.
- **Hover:** buttons and cards lift 2–4px (duration-base, ease-soft). Nav links draw a copper underline. Ghost links nudge their arrow forward.
- **Menu:** the category tab pill slides, and the grid cross-fades (duration-slow).
- **Ordering:** "Order this" fills olive on hover. Don't animate the WhatsApp hand-off itself.
- Anyone with reduced motion turned on gets no spin, rises or lifts: everything simply appears.

## Iconography

Few icons, drawn in-house: a 24px grid, 1.9px round-capped strokes in currentColor, olive-800 by default. The set is a chat bubble (WhatsApp actions), an arrow, a menu toggle, a phone, a map pin and Instagram. Don't use the official WhatsApp logo inside buttons. The word "WhatsApp" in the label is enough.

## Components

Seal, Button, Chip, CategoryTabs, MenuItemCard, ScallopDivider, OrderBanner and SiteHeader. Each has usage notes and a live preview. `LMK.orderLink()` builds the pre-filled WhatsApp link used by every order button (number 260770217171).

## Building the website

The site is built in Astro from these tokens and components. Static pages, with small interactive islands for the menu tabs, the mobile nav and scroll reveals. See the handoff notes that come with the logo pack.
