import { Text } from '@atoms/Text';
import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';

import styles from './Badge.module.css';

type TBadgeProps = TWithClassName<{
  label: string;
  variant: 'primary';
}>;

export const Badge = ({ label, variant, className }: TBadgeProps) => {
  return (
    <Text
      as="span"
      variant="label"
      className={clsx([styles.badge, styles[variant], className])}
    >
      {label}
    </Text>
  );
};
