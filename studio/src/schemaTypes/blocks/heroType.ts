import { defineField, defineType } from 'sanity';
import { RocketIcon } from '@sanity/icons';

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
          description:
            'Use a full URL (https://...) for external links, or a path (/projects) for internal links.',
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: rule =>
            rule.custom((value, context) => {
              const parent = context.parent as { asset?: unknown };
              if (parent?.asset && !value) {
                return 'Alt text is required when an image is provided';
              }
              return true;
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled Hero',
        subtitle: 'Hero',
        media: media ?? RocketIcon,
      };
    },
  },
});
