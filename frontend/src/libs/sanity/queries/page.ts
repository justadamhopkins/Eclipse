import { HERO_FRAGMENT } from '@libs/sanity/fragments/modules/hero';
import { defineQuery } from 'next-sanity';

export const PAGE_QUERY = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "modules": template->modules[]{
      _key,
      _type,

      _type == "hero" => ${HERO_FRAGMENT}
    }
  }`,
);
