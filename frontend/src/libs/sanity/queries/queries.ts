import { defineQuery } from 'next-sanity';

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);
