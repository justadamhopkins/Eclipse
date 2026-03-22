import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';

import styles from './Badge.module.css';

type TBadgeProps = TWithClassName<{
  label: string;
  variant: 'primary';
}>;

export const Badge = ({ label, variant, className }: TBadgeProps) => {
  return (
    <span
      className={clsx([styles.badge, styles[`badge--${variant}`], className])}
    >
      {label}
    </span>
  );
};
