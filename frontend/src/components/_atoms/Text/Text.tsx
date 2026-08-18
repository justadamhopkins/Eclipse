import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type JSX, type PropsWithChildren } from 'react';

const VARIANTS = {
  display: 'display',
  headingMd: 'heading headingMd',
  headingLg: 'heading headingLg',
  headingXl: 'heading headingXl',
  heading2xl: 'heading heading2xl',
  body: 'body',
} as const;

const DEFAULT_TAGS = {
  display: 'h1',
  headingMd: 'h3',
  headingLg: 'h2',
  headingXl: 'h2',
  heading2xl: 'h1',
  body: 'p',
} as const;

interface ITextProps {
  variant?: keyof typeof VARIANTS;
  as?: keyof JSX.IntrinsicElements;
}

export const Text = ({
  variant = 'body',
  as,
  className,
  children,
  ...props
}: TWithClassName<PropsWithChildren<ITextProps>>) => {
  const Tag = as || DEFAULT_TAGS[variant];

  return (
    <Tag
      className={clsx(VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
