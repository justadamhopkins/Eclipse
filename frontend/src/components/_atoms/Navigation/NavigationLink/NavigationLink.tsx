import { Text } from '@atoms/Text';
import { type TPolymorphicProps } from '@typings/polymorphism';
import clsx from 'clsx';
import NextLink from 'next/link';
import { type ElementType, type PropsWithChildren } from 'react';

import styles from './NavigationLink.module.css';

type TNavigationLinkProps<C extends ElementType = 'a'> = TPolymorphicProps<
  C,
  { variant?: 'primary' | 'secondary' }
>;

export const NavigationLink = <C extends ElementType = 'a'>({
  children,
  variant = 'primary',
  className,
  as,
  ...rest
}: PropsWithChildren<TNavigationLinkProps<C>>) => {
  return (
    // @ts-expect-error err
    <Text
      {...rest}
      variant="headingMd"
      as={as ?? NextLink}
      className={clsx([
        styles.navigationLink,
        variant && styles[variant],
        className,
      ])}
    >
      {children}
    </Text>
  );
};
