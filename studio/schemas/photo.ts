import { defineField, defineType } from 'sanity';

// An uploaded photo with alt text, so screen readers can describe it.
export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Describe the photo',
      description: 'A short sentence for people who can’t see it, e.g. “A pistachio bento cake in its box”.',
      type: 'string',
      validation: (rule) =>
        rule.custom((alt, ctx) => ((ctx.parent as { asset?: unknown })?.asset && !alt ? 'Please describe the photo' : true)),
    }),
  ],
});
