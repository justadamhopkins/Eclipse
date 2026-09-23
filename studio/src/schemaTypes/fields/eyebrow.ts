import { defineType } from 'sanity';

export const eyebrowField = defineType({
  name: 'eyebrow',
  title: 'Eyebrow',
  description: 'A simple accent to accompany the main content.',
  type: 'string',
  validation: Rule => [Rule.required(), Rule.max(40)],
});
