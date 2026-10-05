// The two menus. Prices, items, descriptions and photos are edited by the owner in Sanity
// (https://luy.sanity.studio) and fetched here at build time — never invent or change a price in code.
// `category` is written into the WhatsApp order message, so keep it readable.
import { sanity, type SanityPhoto } from '../lib/sanity';

export type MenuItem = { name: string; price: string; note?: string; photo?: SanityPhoto };
export type MenuCategory = {
  id: string;
  title: string;
  category: string; // wording used in the WhatsApp message
  blurb: string;
  from: string;
  photo?: SanityPhoto;
  items: MenuItem[];
};

type RawMenu = {
  tagline?: string;
  categories?: {
    title: string;
    blurb?: string;
    orderName?: string;
    photo?: SanityPhoto;
    items?: { name: string; price: number; note?: string; photo?: SanityPhoto }[];
  }[];
};

/** 1600 → "K1,600" */
export const kwacha = (n: number) => `K${n.toLocaleString('en-US')}`;

/** "Bento Cakes & Cupcakes" → "bento-cakes-cupcakes", for the #anchor links. */
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function toCategories(raw: RawMenu | null): MenuCategory[] {
  return (raw?.categories ?? [])
    .filter((c) => c.title && c.items?.length)
    .map((c) => {
      const items = c.items!.filter((i) => i.name && typeof i.price === 'number');
      return {
        id: slug(c.title),
        title: c.title,
        category: c.orderName || c.title,
        blurb: c.blurb ?? '',
        from: kwacha(Math.min(...items.map((i) => i.price))),
        photo: c.photo,
        items: items.map((i) => ({ name: i.name, price: kwacha(i.price), note: i.note || undefined, photo: i.photo })),
      };
    })
    .filter((c) => c.items.length);
}

const raw = await sanity.fetch<{ bakes: RawMenu | null; kitchen: RawMenu | null }>(
  `{ "bakes": *[_id == "bakes"][0], "kitchen": *[_id == "kitchen"][0] }`,
);

// While the kitchen menu is empty, the Kitchen page shows a "coming soon — ask on WhatsApp" panel.
export const bakes = toCategories(raw.bakes);
export const kitchen = toCategories(raw.kitchen);

// The two menus, as shown on the switch and on the home page.
export const menus = {
  bakes: {
    id: 'bakes',
    title: 'Bakes',
    href: '/menu',
    tagline: raw.bakes?.tagline || 'Cakes, cupcakes & bento treats',
    categories: bakes,
  },
  kitchen: {
    id: 'kitchen',
    title: 'Kitchen',
    href: '/menu/kitchen',
    tagline: raw.kitchen?.tagline || 'Home-cooked food, made to order',
    categories: kitchen,
  },
} as const;

// Photos around the site that aren't tied to a menu item. Empty slots show a labelled placeholder.
export const sitePhotos = await sanity.fetch<{ hero?: SanityPhoto; gallery?: SanityPhoto[]; about?: SanityPhoto } | null>(
  `*[_id == "sitePhotos"][0]{ hero, gallery, about }`,
) ?? {};
