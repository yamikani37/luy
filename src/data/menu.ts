// The price list. Prices come from the client — never invent one.
// `category` is written into the WhatsApp order message, so keep it readable.

export type MenuItem = { name: string; price: string; note?: string; photo?: string };
export type MenuCategory = {
  id: string;
  title: string;
  category: string; // wording used in the WhatsApp message
  blurb: string;
  from: string;
  items: MenuItem[];
};

export const bakes: MenuCategory[] = [
  {
    id: 'bento',
    title: 'Bento Cakes & Cupcakes',
    category: 'Bento Cakes & Cupcakes',
    blurb: 'Small treats, big flavour',
    from: 'K180',
    items: [
      { name: '6 Cupcakes', price: 'K180' },
      { name: '12 Cupcakes', price: 'K320' },
      { name: 'Bento Cake 4”', price: 'K250', note: 'A little cake in its own box' },
      { name: 'Mini Cake', price: 'K300' },
    ],
  },
  {
    id: 'flat',
    title: 'Flat Cakes',
    category: 'Flat Cakes (2 Layers)',
    blurb: 'Two-layer classics',
    from: 'K420',
    items: [
      { name: 'Small', price: 'K420', note: '2 layers' },
      { name: 'Medium', price: 'K530', note: '2 layers' },
      { name: 'Large', price: 'K680', note: '2 layers' },
      { name: 'Oventray', price: 'K1,000', note: 'A full tray, for a crowd' },
    ],
  },
  {
    id: 'tall',
    title: 'Tall Cakes',
    category: 'Tall Cakes (3 & 4 Layers)',
    blurb: '3 & 4 layer showstoppers',
    from: 'K450',
    items: [
      { name: 'Small', price: 'K450' },
      { name: 'Medium', price: 'K600' },
      { name: 'Large (3 layers)', price: 'K700' },
      { name: 'Large (4 layers)', price: 'K850' },
    ],
  },
  {
    id: 'tiered',
    title: 'Tiered Cakes',
    category: 'Tiered Cakes',
    blurb: 'For the big occasions',
    from: 'K850',
    items: [
      { name: 'Two Tiers', price: 'K1,600' },
      { name: 'Doll Cake', price: 'K850' },
    ],
  },
];

// ── Kitchen ──────────────────────────────────────────────────────────────
// Add the kitchen menu here, in the same shape as `bakes`. While it is empty,
// the Kitchen page shows a "coming soon — ask on WhatsApp" panel instead.
// Example shape (replace with the client's real dishes and prices):
// {
//   id: 'mains',
//   title: 'Mains',
//   category: 'Kitchen — Mains',
//   blurb: 'Home-cooked, made to order',
//   from: 'K…',
//   items: [{ name: '…', price: 'K…', note: '…' }],
// },
export const kitchen: MenuCategory[] = [];

// The two menus, as shown on the switch and on the home page.
export const menus = {
  bakes: {
    id: 'bakes',
    title: 'Bakes',
    href: '/menu',
    tagline: 'Cakes, cupcakes & bento treats',
    categories: bakes,
  },
  kitchen: {
    id: 'kitchen',
    title: 'Kitchen',
    href: '/menu/kitchen',
    tagline: 'Home-cooked food, made to order',
    categories: kitchen,
  },
} as const;
