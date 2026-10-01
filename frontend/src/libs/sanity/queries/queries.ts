import { defineQuery } from 'next-sanity';

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const PAGE_QUERY = defineQuery(
  `*[_type == "page" && slug == slug.current][0]{
    template
  }`,
);
