import { page } from './documents/pages/page';
import { link } from './documents/navigation/link';
import { headerNavigation } from './documents/navigation/headerNavigation';
import { footer } from './documents/navigation/footer';
import { pageTemplate } from './documents/pages/pageTemplate';
import { socialProfile } from './documents/settings/socialProfile';
import { fields } from './fields';
import { moduleSchemas } from './documents/modules';
import { objectSchemas } from './objects';

export const schemaTypes = [
  page,
  pageTemplate,
  link,
  headerNavigation,
  footer,
  socialProfile,
  ...objectSchemas,
  ...fields,
  ...moduleSchemas,
];
