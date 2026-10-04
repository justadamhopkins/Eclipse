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
