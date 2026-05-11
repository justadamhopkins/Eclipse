import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import NextLink, { type LinkProps } from 'next/link';
import { type PropsWithChildren } from 'react';

import styles from './NavigationLink.module.css';

type TNavigationLinkProps = TWithClassName<LinkProps>;

export const NavigationLink = ({
  children,
  className,
  ...rest
}: PropsWithChildren<TNavigationLinkProps>) => {
  return (
    <NextLink
      {...rest}
      className={clsx([
        styles.navigationLink,
        styles['navigationLink__primary'],
        className,
      ])}
    >
      {children}
    </NextLink>
  );
};
