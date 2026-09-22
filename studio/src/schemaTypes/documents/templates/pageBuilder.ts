import { defineArrayMember, defineField, defineType } from 'sanity';
import { StackIcon } from '@sanity/icons';

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'document',
  description:
    'This document is used to create a page builder. This will allow you to choose modules to add to the page.',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
      description: 'The title of the page builder template',
    }),
    defineField({
      name: 'pageBuilderList',
      type: 'array',
      of: [defineArrayMember({ type: 'hero' })],
      validation: rule => [rule.required(), rule.unique()],
    }),
  ],
});
