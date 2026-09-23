import { page } from './documents/pages/page';
import { link } from './documents/navigation/link';
import { seoBlock } from './documents/settings/objects/seoBlock';
import { pageTemplate } from './documents/pages/pageTemplate';
import { socialProfile } from './documents/settings/objects/socialProfile';
import { fields } from './fields';
import { moduleSchemas } from './documents/modules';

export const schemaTypes = [
  page,
  pageTemplate,
  link,
  seoBlock,
  socialProfile,
  ...fields,
  ...moduleSchemas,
];
