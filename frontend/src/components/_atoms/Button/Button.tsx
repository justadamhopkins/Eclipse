import clsx from 'clsx';
import { type ComponentProps } from 'react';

import styles from './Button.module.css';

interface IButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  children,
  variant = 'primary',
  ...rest
}: IButtonProps) => {
  return (
    <button
      className={clsx([styles.button, styles[`button__${variant}`]])}
      {...rest}
    >
      {children}
    </button>
  );
};
