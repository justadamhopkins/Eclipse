import { defineArrayMember, defineField, defineType } from 'sanity';
import { ThListIcon } from '@sanity/icons/ThList';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: ThListIcon,
  description: 'Sitewide footer: links, social profiles and location.',
  preview: {
    select: { links: 'links', location: 'location' },
    prepare({ links, location }) {
      const count = Array.isArray(links) ? links.length : 0;

      return {
        title: 'Footer',
        subtitle: `${count} ${count === 1 ? 'link' : 'links'}${
          location ? ` · ${location}` : ''
        }`,
      };
    },
  },
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      description:
        'Links and social profiles shown in the footer, in display order.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'link',
          title: 'Link',
          type: 'reference',
          to: [{ type: 'link' }],
        }),
        defineArrayMember({
          name: 'socialProfile',
          title: 'Social Profile',
          type: 'reference',
          to: [{ type: 'socialProfile' }],
        }),
      ],
      validation: Rule => [Rule.unique()],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'Where you are based, e.g. London, UK.',
      type: 'string',
      validation: Rule => [Rule.max(50)],
    }),
  ],
});
