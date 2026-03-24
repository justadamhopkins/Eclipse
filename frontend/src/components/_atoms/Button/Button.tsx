import clsx from 'clsx';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import styles from './Button.module.css';

type TButtonAsButton = {
  href?: never;
  variant?: 'primary' | 'secondary';
} & ComponentProps<'button'>;

type TButtonAsLink = {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type TButtonProps = TButtonAsButton | TButtonAsLink;

export const Button = ({
  children,
  variant = 'primary',
  ...rest
}: TButtonProps) => {
  const className = clsx([styles.button, styles[`button__${variant}`]]);

  if ('href' in rest && rest.href) {
    return (
      <Link
        href={rest.href}
        onClick={(rest as TButtonAsLink).onClick}
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
