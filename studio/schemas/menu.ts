import { defineArrayMember, defineField, defineType } from 'sanity';

const kwacha = (n?: number) => (typeof n === 'number' ? `K${n.toLocaleString('en-US')}` : 'No price');

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Item',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'price',
      title: 'Price (Kwacha)',
      description: 'Numbers only, e.g. 1600. The site shows it as K1,600.',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({ name: 'note', title: 'Description', description: 'Optional. One short line under the name.', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', description: 'Optional.', type: 'photo' }),
  ],
  preview: {
    select: { title: 'name', price: 'price', note: 'note', media: 'photo' },
    prepare: ({ title, price, note, media }) => ({ title: `${title ?? 'New item'} · ${kwacha(price)}`, subtitle: note, media }),
  },
});

export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Category',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'blurb', title: 'Description', description: 'One short line, e.g. “Two-layer classics”.', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', description: 'Shown on the home page.', type: 'photo' }),
    defineField({
      name: 'items',
      title: 'Items',
      description: 'Drag to reorder. The “from” price is worked out from the cheapest item.',
      type: 'array',
      of: [defineArrayMember({ type: 'menuItem' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'orderName',
      title: 'Name in the WhatsApp message',
      description: 'Optional. Leave empty to use the name above.',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', items: 'items', media: 'photo' },
    prepare: ({ title, items, media }) => ({
      title,
      subtitle: `${items?.length ?? 0} items`,
      media,
    }),
  },
});

// One document per menu: “bakes” and “kitchen”.
export const menu = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Menu', type: 'string', readOnly: true }),
    defineField({ name: 'tagline', title: 'Tagline', description: 'Shown on the home page and the menu switch.', type: 'string' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      description: 'Drag to reorder.',
      type: 'array',
      of: [defineArrayMember({ type: 'menuCategory' })],
    }),
  ],
});
