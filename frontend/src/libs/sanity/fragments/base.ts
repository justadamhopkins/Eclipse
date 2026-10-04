import { defineQuery } from 'next-sanity';

export const IMAGE_FRAGMENT = defineQuery(`
  {
    alt,
    hotspot,
    crop,
    "asset": asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions { width, height, aspectRatio }
      }
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
