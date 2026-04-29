'use client';

import {
  ImageIcon,
  type TIconImgProps,
} from '@atoms/Icon/components/ImageIcon';

import { InlineIcon, type TIconInlineProps } from './components/InlineIcon';

export type TIconProps = TIconInlineProps | TIconImgProps;

export const Icon = ({ ...rest }: TIconProps) => {
  return rest.isInline ? <InlineIcon {...rest} /> : <ImageIcon {...rest} />;
};
