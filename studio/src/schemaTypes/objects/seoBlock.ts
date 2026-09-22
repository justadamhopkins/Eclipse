import { defineField, defineType } from 'sanity';
import { SearchIcon } from '@sanity/icons/Search';

export const seoBlock = defineType({
  name: 'seoBlock',
  title: 'SEO block',
  type: 'object',
  icon: SearchIcon,
  description: 'Options for configuring the SEO settings for the page.',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Meta Title',
      type: 'string',
      description:
        'Title used for search engines and browser tabs. Falls back to the page title when left empty.',
      validation: Rule => [
        Rule.max(60).warning(
          'Titles longer than 60 characters may be truncated in search results',
        ),
      ],
    }),
    defineField({
      name: 'description',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary shown in search engine results.',
      validation: Rule => [
        Rule.max(160).warning(
          'Descriptions longer than 160 characters may be truncated in search results',
        ),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      description:
        'Image used when this page is shared on social media (Open Graph / Twitter).',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: Rule => [
            Rule.required().warning('Alt text is important for SEO'),
          ],
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Prevents search engines from indexing this page.',
      initialValue: false,
    }),
  ],
  options: {
    collapsible: true,
  },
});
