import { defineArrayMember, defineField, defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons/Case';

export const experienceBlock = defineType({
  name: 'experienceBlock',
  title: 'Experience Block',
  description: '',
  type: 'object',
  icon: CaseIcon,
  preview: {
    select: {
      company: 'company',
      role: 'role',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ company, role, startDate, endDate }) {
      const start = startDate ? String(new Date(startDate).getFullYear()) : '?';
      const end = endDate ? String(new Date(endDate).getFullYear()) : 'Present';

      return {
        title: company || 'Untitled Experience',
        subtitle: [role, `${start} - ${end}`].filter(Boolean).join(' · '),
        media: CaseIcon,
      };
    },
  },
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'The name of the company or organisation.',
      validation: Rule => [Rule.required()],
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'The job title held at the company.',
      validation: Rule => [Rule.required()],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: { dateFormat: 'MMM YYYY' },
      description: 'The date this role started.',
      validation: Rule => [Rule.required()],
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: { dateFormat: 'MMM YYYY' },
      description:
        'The date this role ended. Leave empty if this is the current role.',
      validation: Rule => [
        Rule.min(Rule.valueOfField('startDate')).error(
          'End date must be after the start date',
        ),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description:
        'A summary of responsibilities and achievements in this role.',
      of: [defineArrayMember({ type: 'block' })],
      validation: Rule => [Rule.required()],
    }),
  ],
});
