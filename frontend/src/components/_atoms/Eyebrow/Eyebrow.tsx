import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';

import styles from './Eyebrow.module.css';

interface IEyebrowProps {
  label: string;
  size: 'sm' | 'md' | 'lg';
  variant: 'primary';
}

export const Eyebrow = ({
  label,
  size,
  variant,
  className,
}: TWithClassName<IEyebrowProps>) => {
  return (
    <p
      className={clsx(
        styles.eyebrow,
        styles[`eyebrow--${size}`],
        styles[`eyebrow--${variant}`],
        className,
      )}
    >
      {label}
    </p>
  );
};
