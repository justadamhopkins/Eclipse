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
