import { defineArrayMember, defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons/Text';
import { toPlainText } from '@portabletext/toolkit';

export const textModule = defineType({
  name: 'textModule',
  title: 'Text Module',
  type: 'object',
  description: 'A simple text block for adding to a page.',
  icon: TextIcon,
  preview: {
    select: {
      title: 'title',
      text: 'text',
    },
    prepare({ title, text }) {
      return {
        title: title,
        subtitle: toPlainText(text),
        media: TextIcon,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main heading displayed in the text block section.',
      validation: Rule => [
        Rule.required(),
        Rule.max(60).error('At most 60 characters long'),
      ],
    }),
    defineField({
      name: 'text',
      title: 'Text',
      description: 'The main body copy of the text block section.',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
  ],
});
