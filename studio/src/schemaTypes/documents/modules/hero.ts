import { defineArrayMember, defineField, defineType } from 'sanity';
import { RocketIcon } from '@sanity/icons/Rocket';

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  description: 'A simple hero for adding to a page.',
  icon: RocketIcon,
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
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The main, large heading displayed in the hero section.',
      validation: Rule => [
        Rule.required(),
        Rule.max(60).error('At most 60 characters long'),
      ],
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      description:
        'Supporting copy displayed below the headline, providing additional context.',
      validation: Rule => [
        Rule.required(),
        Rule.max(150).error('At most 60 characters long'),
      ],
    }),
    defineField({
      name: 'callToActions',
      title: 'Call to Actions',
      type: 'array',
      description:
        'Exactly 3 unique call to action items (social profile links or links) displayed in the hero section.',
      of: [
        defineArrayMember({ name: 'socialProfile', type: 'socialProfile' }),
        defineArrayMember({ name: 'link', type: 'link' }),
      ],
      validation: rule => [rule.required(), rule.unique(), rule.length(3)],
    }),
    defineField({ name: 'eyebrow', type: 'eyebrow' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'An optional hero image displayed alongside the headline and copy.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'A description of the image for accessibility and SEO. Required whenever an image is provided.',
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
});
