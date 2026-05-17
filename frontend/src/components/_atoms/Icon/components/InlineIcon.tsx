import { omit } from '@utils/primitives/objetcs';
import { type ComponentProps } from 'react';

import githubLogo from '../icons/github_invertocat.inline.svg';
import LickLogo from '../icons/lick_logo.inline.svg';
import linkedInLogo from '../icons/linkedin-logo.inline.svg';

const INLINE_ICON_MAP = {
  lickLogo: LickLogo,
  githubLogo: githubLogo,
  linkedInLogo: linkedInLogo,
};

export type TIconInlineProps = ComponentProps<'svg'> & {
  isInline: true;
  name: keyof typeof INLINE_ICON_MAP;
};

export const InlineIcon = ({ name, ...rest }: TIconInlineProps) => {
  const IconComponent = INLINE_ICON_MAP[name];

  return IconComponent ? <IconComponent {...omit(rest, ['isInline'])} /> : null;
};
