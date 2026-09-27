import { page } from './documents/pages/page';
import { link } from './documents/navigation/link';
import { pageTemplate } from './documents/pages/pageTemplate';
import { socialProfile } from './documents/settings/socialProfile';
import { fields } from './fields';
import { moduleSchemas } from './documents/modules';
import { objectSchemas } from './objects';

export const schemaTypes = [
  page,
  pageTemplate,
  link,
  socialProfile,
  ...objectSchemas,
  ...fields,
  ...moduleSchemas,
];
