import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  description: 'This document is used to create a tag.',
  icon: TagIcon,
  preview: {
    select: {
      label: 'label',
      slug: 'slug',
    },
    prepare(values) {
      return { title: values.label, subtitle: values.slug.current };
    },
  },
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: rule => [rule.required()],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'label' },
      validation: rule => [rule.required()],
    }),
  ],
});
