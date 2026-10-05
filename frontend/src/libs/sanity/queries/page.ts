import { defineQuery } from 'next-sanity';

import { HERO_FRAGMENT, TEXT_MODULE_FRAGMENT } from '../fragments/modules';

export const PAGE_QUERY = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "modules": template->modules[]{
      _key,
      _type,

      _type == "hero" => ${HERO_FRAGMENT},
      _type == "textModule" => ${TEXT_MODULE_FRAGMENT}
    }
  }`,
);
