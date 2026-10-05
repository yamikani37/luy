import { defineArrayMember, defineField, defineType } from 'sanity';

// The photos around the site that aren't tied to a menu item.
export const sitePhotos = defineType({
  name: 'sitePhotos',
  title: 'Site photos',
  type: 'document',
  fields: [
    defineField({ name: 'hero', title: 'Home page: main photo', description: 'A favourite celebration cake.', type: 'photo' }),
    defineField({
      name: 'gallery',
      title: 'Home page: “A peek inside the kitchen”',
      description: 'Up to 4 photos. The first one is shown largest.',
      type: 'array',
      of: [defineArrayMember({ type: 'photo' })],
      validation: (rule) => rule.max(4),
    }),
    defineField({ name: 'about', title: 'About page photo', description: 'Luyando, or the kitchen at work.', type: 'photo' }),
  ],
  preview: { prepare: () => ({ title: 'Site photos' }) },
});
