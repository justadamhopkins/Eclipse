import { defineArrayMember, defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal identifier for this schema type',
      validation: Rule => [Rule.required()],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'identifier',
      },
      description: 'The slug for this page',
      validation: Rule => [Rule.required()],
    }),
    defineType({
      name: 'pageBuilder',
      description: 'A set of configurable modules to structure a page.',
      type: 'array',
      of: [defineArrayMember({ name: 'hero', type: 'hero' })],
    }),
    defineField({
      name: 'seoBlock',
      title: 'SEO block',
      type: 'seoBlock',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
});
