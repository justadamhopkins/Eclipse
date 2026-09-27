import { defineArrayMember, defineField, defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons/Case';

export const experienceModule = defineType({
  name: 'experienceModule',
  title: 'Experience Module',
  type: 'object',
  description: 'A list of work experience entries for adding to a page.',
  icon: CaseIcon,
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Untitled Experience Module',
        subtitle: items?.length
          ? `${items.length} experience item${items.length === 1 ? '' : 's'}`
          : 'No experience items',
        media: CaseIcon,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The heading displayed above the experience list.',
      initialValue: 'Experience',
      validation: Rule => [
        Rule.required(),
        Rule.max(60).error('At most 60 characters long'),
      ],
    }),
    defineField({
      name: 'experienceBlocks',
      title: 'Experience Blocks',
      type: 'array',
      description:
        'The list of work experience entries, ordered most recent first.',
      of: [defineArrayMember({ type: 'experienceBlock' })],
      validation: Rule => [Rule.required().min(1)],
    }),
  ],
});
