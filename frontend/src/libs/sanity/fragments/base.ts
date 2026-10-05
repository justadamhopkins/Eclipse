import { defineQuery } from 'next-sanity';

export const IMAGE_FRAGMENT = defineQuery(`
  {
  ...,
    asset->{
    _id,
    _type,
        metadata { lqip, dimensions { aspectRatio } }
    }
  }
`);

export const LINK_FRAGMENT = defineQuery(`
  {
    label,
    type,
    "href": select(
      type == 'INTERNAL' => internalLink->slug.current,
      type == 'EXTERNAL' => externalUrl
    ),
    "openInNewTab": select(
      type == 'EXTERNAL' => coalesce(openInNewTab, false),
      false
    )
  }
`);
