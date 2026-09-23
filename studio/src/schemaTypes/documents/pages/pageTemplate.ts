import { defineArrayMember, defineField, defineType } from 'sanity';
import { StackIcon } from '@sanity/icons/Stack';

export const pageTemplate = defineType({
  name: 'pageTemplate',
  title: 'Page template',
  type: 'document',
  description:
    'This document is used to create a page template. This will allow you to choose modules to add to the page.',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal identifier for this schema type',
      validation: Rule => [Rule.required()],
    }),
    defineField({
      name: 'modules',
      type: 'array',
      of: [
        defineArrayMember({ name: 'hero', type: 'hero' }),
        defineArrayMember({ name: 'textBlock', type: 'textBlock' }),
      ],
      validation: rule => [rule.required(), rule.unique()],
    }),
  ],
});
