import { omit } from '@utils/primitives/objetcs';
import NextImage, { type ImageProps } from 'next/image';

import LickLogo from '../icons/lick_logo.svg';

const STATIC_ICON_MAP = {
  lickLogo: LickLogo,
};

export type TIconImgProps = Omit<ImageProps, 'src' | 'alt'> & {
  isInline: false;
  name: keyof typeof STATIC_ICON_MAP;
};

export const ImageIcon = ({ name, ...rest }: TIconImgProps) => {
  const IconImage = STATIC_ICON_MAP[name];

  return IconImage ? (
    <NextImage
      {...omit(rest, ['isInline'])}
      src={IconImage}
      alt=""
      unoptimized={true}
    />
  ) : null;
};
