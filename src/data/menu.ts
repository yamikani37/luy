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

export const menu: MenuCategory[] = [
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
