import { defineField, defineType } from 'sanity';
import { WrenchIcon } from '@sanity/icons/Wrench';

export const toolingModule = defineType({
  name: 'toolingModule',
  title: 'Tooling Module',
  type: 'object',
  description: 'A list of tools and technologies for adding to a page.',
  icon: WrenchIcon,
  preview: {
    select: {
      title: 'title',
      tags: 'tags',
    },
    prepare({ title, tags }) {
      return {
        title: title || 'Untitled Tooling Module',
        subtitle: tags?.length
          ? `${tags.length} tool${tags.length === 1 ? '' : 's'}`
          : 'No tools',
        media: WrenchIcon,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The heading displayed above the tooling list.',
      initialValue: 'Tooling',
      validation: Rule => [
        Rule.required(),
        Rule.max(60).error('At most 60 characters long'),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tools',
      type: 'tags',
      description: 'The list of tools and technologies to display as tags.',
      validation: Rule => [Rule.required().min(1)],
    }),
  ],
});
