import { type TPolymorphicProps } from '@typings/polymorphism';
import { type TVariants } from '@typings/utils';
import clsx from 'clsx';
import { type ElementType, type PropsWithChildren } from 'react';

import styles from './ButtonBase.module.css';

export interface IButtonBaseProps {
  variant?: TVariants;
  isFullWidth?: boolean;
}

export type TButtonBaseProps<C extends ElementType> = TPolymorphicProps<
  C,
  PropsWithChildren<IButtonBaseProps>
>;

export const ButtonBase = <C extends ElementType = 'button'>({
  as,
  children,
  variant = 'primary',
  isFullWidth = false,
  className,
  ...rest
}: TButtonBaseProps<C>) => {
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
