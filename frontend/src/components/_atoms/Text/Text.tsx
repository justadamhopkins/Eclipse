import { type TPolymorphicProps } from '@typings/polymorphism';
import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type ElementType, type JSX, type PropsWithChildren } from 'react';

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
} as const satisfies Record<keyof typeof VARIANTS, keyof JSX.IntrinsicElements>;

interface ITextProps {
  variant?: keyof typeof VARIANTS;
}

type TTextProps<C extends ElementType> = TPolymorphicProps<
  C,
  TWithClassName<PropsWithChildren<ITextProps>>
>;

export const Text = <C extends ElementType = 'p'>({
  variant = 'body',
  as,
  className,
  children,
  ...props
}: TTextProps<C>) => {
  const Tag = (as || DEFAULT_TAGS[variant]) as ElementType;

  return (
    <Tag
      className={clsx(VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
