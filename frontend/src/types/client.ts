import { type SanityImageSource } from '@sanity/image-url';

export type TSocialPlatform = 'GITHUB' | 'LINKEDIN';

export type TLinkItem = {
  id: string;
  type: 'link';
  label: string;
  href: string;
};

export type TSocialLinkItem = {
  id: string;
  type: 'socialProfile';
  platform: TSocialPlatform;
  label: string;
  href: string;
};

export type TSanityImage = SanityImageSource & {
  alt: string;
  asset: {
    _id: string;
    _type: 'sanity.imageAsset';
    metadata: {
      lqip: string;
      dimensions: { aspectRatio?: number };
    };
  };
};
