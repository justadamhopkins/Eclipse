import clsx from 'clsx';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import styles from './Button.module.css';

type TButtonAsButton = {
  href?: never;
  variant?: 'primary' | 'secondary';
  isFullWidth?: boolean;
} & ComponentProps<'button'>;

type TButtonAsLink = {
  variant?: 'primary' | 'secondary';
  isFullWidth?: boolean;
} & ComponentProps<typeof Link>;

type TButtonProps = TButtonAsButton | TButtonAsLink;

export const Button = ({
  children,
  variant = 'primary',
  isFullWidth = false,
  ...rest
}: TButtonProps) => {
  const className = clsx([
    styles.button,
    styles[`button__${variant}`],
    isFullWidth && styles['button--fullWidth'],
  ]);

  if ('href' in rest && rest.href) {
    return (
      <Link
        {...(rest as Omit<TButtonAsLink, 'variant'>)}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      {...(rest as Omit<TButtonAsButton, 'variant'>)}
    >
      {children}
    </button>
  );
};
