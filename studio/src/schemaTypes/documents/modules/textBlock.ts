import {
  defineArrayMember,
  defineField,
  defineType,
  type PortableTextBlock,
  type PortableTextSpan,
} from 'sanity';
import { TextIcon } from '@sanity/icons/Text';

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  description: 'A simple text block for adding to a page.',
  icon: TextIcon,
  preview: {
    select: {
      title: 'title',
      text: 'text',
    },
    prepare({ title, text }) {
      const block = (text || []).find(
        (block: PortableTextBlock) => block._type === 'block',
      );
      const plainText =
        block?.children
          ?.map((child: PortableTextSpan) => {
            return child.text;
          })
          .join('') || 'No content';
      return {
        title: title,
        subtitle: plainText,
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
