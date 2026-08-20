import { type TPolymorphicProps } from '@typings/polymorphism';
import clsx from 'clsx';
import { type ElementType, type PropsWithChildren } from 'react';

import styles from './Button.module.css';

interface IButtonProps {
  variant?: 'primary' | 'secondary';
  isFullWidth?: boolean;
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
        className,
      ])}
      {...rest}
    >
      {children}
    </Tag>
  );
};
