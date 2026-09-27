import { defineArrayMember, defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const contactModule = defineType({
  name: 'contactModule',
  title: 'Contact Module',
  type: 'object',
  description: 'A call-to-contact section for adding to a page.',
  icon: EnvelopeIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Contact Module',
        subtitle: 'Contact',
        media: EnvelopeIcon,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The small label displayed above the heading.',
      initialValue: 'Contact',
      validation: Rule => [
        Rule.required(),
        Rule.max(60).error('At most 60 characters long'),
      ],
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The main statement displayed in the contact section.',
      validation: Rule => [
        Rule.required(),
        Rule.max(150).error('At most 150 characters long'),
      ],
    }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      description:
        'A set of navigational actions to help users interact with the contact module.',
      of: [defineArrayMember({ name: 'link', type: 'link' })],
      validation: Rule => [Rule.required().max(1)],
    }),
  ],
});
