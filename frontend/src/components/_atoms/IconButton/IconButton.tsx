import {
  ButtonBase,
  type IButtonBaseProps,
  type TButtonBaseProps,
} from '@atoms/ButtonBase';
import { type TPolymorphicProps } from '@typings/polymorphism';
import clsx from 'clsx';
import {
  type ElementType,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

import styles from './IconButton.module.css';

interface IIconButtonProps extends IButtonBaseProps {
  icon: ReactNode;
  isLabelHiddenOnMobile?: boolean;
}

type TIconButtonProps<C extends ElementType> = TPolymorphicProps<
  C,
  PropsWithChildren<IIconButtonProps>
>;

export const IconButton = <C extends ElementType = 'button'>({
  children,
  icon,
  isLabelHiddenOnMobile = true,
  className,
  ...rest
}: TIconButtonProps<C>) => (
  <ButtonBase
    {...(rest as TButtonBaseProps<C>)}
    className={clsx([
      isLabelHiddenOnMobile && styles.labelHiddenOnMobile,
      className,
    ])}
  >
    <span
      className={styles.icon}
      aria-hidden="true"
    >
      {icon}
    </span>
    {children && <span className={styles.label}>{children}</span>}
  </ButtonBase>
);
