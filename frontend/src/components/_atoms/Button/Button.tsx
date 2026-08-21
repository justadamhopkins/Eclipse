import { type TPolymorphicProps } from '@typings/polymorphism';
import clsx from 'clsx';
import {
  type ElementType,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

import styles from './Button.module.css';

interface IButtonProps {
  variant?: 'primary' | 'secondary';
  isFullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isLabelHiddenOnMobile?: boolean;
}

type TButtonProps<C extends ElementType> = TPolymorphicProps<
  C,
  PropsWithChildren<IButtonProps>
>;

export const Button = <C extends ElementType = 'button'>({
  as,
  children,
  variant = 'primary',
  isFullWidth = false,
  startIcon,
  endIcon,
  isLabelHiddenOnMobile = false,
  className,
  ...rest
}: TButtonProps<C>) => {
  const Tag = as ?? 'button';

  return (
    <Tag
      {...(Tag === 'button' && { type: 'button' })}
      className={clsx([
        styles.button,
        styles[variant],
        isFullWidth && styles.fullWidth,
        isLabelHiddenOnMobile && styles.labelHiddenOnMobile,
        className,
      ])}
      {...rest}
    >
      {startIcon && (
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {startIcon}
        </span>
      )}
      {isLabelHiddenOnMobile ? (
        <span className={styles.label}>{children}</span>
      ) : (
        children
      )}
      {endIcon && (
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {endIcon}
        </span>
      )}
    </Tag>
  );
};
