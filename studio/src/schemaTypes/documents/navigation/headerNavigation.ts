import { defineArrayMember, defineField, defineType } from 'sanity';
import { MenuIcon } from '@sanity/icons/Menu';

export const headerNavigation = defineType({
  name: 'headerNavigation',
  title: 'Header Navigation',
  type: 'document',
  icon: MenuIcon,
  description: 'Sitewide header navigation: the logo and the primary links.',
  preview: {
    select: { identifier: 'identifier', links: 'links' },
    prepare({ identifier, links }) {
      const count = Array.isArray(links) ? links.length : 0;

      return {
        title: identifier,
        subtitle: `${count} ${count === 1 ? 'link' : 'links'}`,
      };
    },
  },
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      description: 'Primary navigation links, in display order.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'link',
          type: 'reference',
          to: [{ type: 'link' }],
        }),
      ],
      validation: Rule => [Rule.unique()],
    }),
  ],
});
