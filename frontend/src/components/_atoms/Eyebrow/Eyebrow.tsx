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
  variant,
  className,
}: TWithClassName<IEyebrowProps>) => {
  return (
    <span className={clsx(styles.eyebrow, styles[variant], 'label', className)}>
      {label}
    </span>
  );
};
