import { defineField, defineType } from 'sanity';
import { AddUserIcon } from '@sanity/icons/AddUser';
import { capitalize } from 'es-toolkit/string';

export const socialProfile = defineType({
  name: 'socialProfile',
  title: 'Social Profile',
  type: 'document',
  icon: AddUserIcon,
  description: 'Options for configuring social profile settings for the user.',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'The platform for the social profile.',
      options: {
        list: ['GITHUB', 'LINKEDIN'].map(variant => ({
          title: capitalize(variant),
          value: variant,
        })),
        layout: 'dropdown',
      },
      validation: Rule => [Rule.required()],
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'reference',
      to: [{ type: 'link' }],
      description: 'A link for the relevant call to action item',
      validation: Rule => [
        Rule.required().error('A link is required for the social profile'),
      ],
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'A name for the social platform',
      validation: Rule => [
        Rule.required(),
        Rule.max(20).error('A name must be 20 characters or fewer'),
      ],
    }),
  ],
});
