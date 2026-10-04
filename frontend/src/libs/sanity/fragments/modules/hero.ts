import groq from 'groq';

export const HERO_FRAGMENT = groq`
  {
    _key,
    _type,
    eyebrow,
    headline,
    subheadline,

    image {
      ...,
      asset->
    },

    callToActions[]{
      ...
    }
  }
`;
