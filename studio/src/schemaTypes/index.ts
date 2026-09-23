import { page } from './documents/pages/page';
import { link } from './documents/navigation/link';
import { heroType } from './documents/modules/heroType';
import { seoBlock } from './documents/settings/objects/seoBlock';
import { pageTemplate } from './documents/pages/pageTemplate';
import { socialProfile } from './documents/settings/objects/socialProfile';
import { fields } from './fields';

export const schemaTypes = [
  page,
  pageTemplate,
  link,
  heroType,
  seoBlock,
  socialProfile,
  ...fields,
];
