import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons/Link';

export const link = defineType({
  name: 'link',
  title: 'Links',
  type: 'document',
  icon: LinkIcon,
  description:
    'A link model designed to configure navigational elements sitewide.',
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      internalTitle: 'internalLink.identifier',
      externalUrl: 'externalUrl',
    },
    prepare({ title, linkType, internalTitle, externalUrl }) {
      const subtitle =
        linkType === 'INTERNAL'
          ? (internalTitle ?? 'No page selected')
          : (externalUrl ?? 'No URL set');

      return {
        title: title ?? 'Untitled Link',
        subtitle,
        media: LinkIcon,
      };
    },
  },
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description:
        'The label for this link. This is what will render out to the frontend.',
      validation: Rule => [Rule.required()],
    }),
    defineField({
      name: 'type',
      title: 'Link Type',
      description: 'The type of link.',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'INTERNAL' },
          { title: 'External', value: 'EXTERNAL' },
        ],
        layout: 'radio',
      },
      initialValue: 'INTERNAL',
      validation: Rule => [Rule.required()],
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      description: 'An internal page to link too.',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.type !== 'INTERNAL',
      validation: Rule => [
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === 'INTERNAL' && !value) {
            return 'Select a page to link to';
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description: 'An external url to link too.',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'EXTERNAL',
      validation: Rule => [
        Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }).custom(
          (value, context) => {
            const parent = context.parent as { type?: string };
            if (parent?.type === 'EXTERNAL' && !value) {
              return 'Enter a URL to link to';
            }
            return true;
          },
        ),
      ],
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      description: 'Should the external link open in a new tab?',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.type !== 'EXTERNAL',
    }),
  ],
});
