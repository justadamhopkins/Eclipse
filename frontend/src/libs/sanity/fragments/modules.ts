import { IMAGE_FRAGMENT, LINK_FRAGMENT } from '@libs/sanity/fragments/base';
import { defineQuery } from 'next-sanity';

export const HERO_FRAGMENT = defineQuery(`
  {
    _key,
    _type,
    eyebrow,
    headline,
    subheadline,
    image ${IMAGE_FRAGMENT},
    callToActions[]{
      _key,
      _type,
      _type == 'link' => ${LINK_FRAGMENT},
      _type == 'socialProfile' => {
        platform,
        name,
        link->${LINK_FRAGMENT}
      }
    }
  }
`);

export const TEXT_MODULE_FRAGMENT = defineQuery(`{
  title,
  text
}`);

export const EXPERIENCE_MODULE_FRAGMENT = defineQuery(
  `{ title, experienceBlocks[]{ _key, _type, company, role, startDate, endDate, body } }`,
);

export const TOOLING_MODULE_FRAGMENT = defineQuery(`{ title, tags }`);

export const CONTACT_MODULE_FRAGMENT = defineQuery(
  `{ title, heading, "action": actions[0]->${LINK_FRAGMENT}}`,
);
