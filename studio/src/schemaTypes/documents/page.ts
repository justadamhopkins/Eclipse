import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export const homePage = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
});
