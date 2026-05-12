import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type FC } from 'react';

import styles from './Eyebrow.module.css';

interface IEyebrowProps {
  label: string;
}

export const Eyebrow: FC<IEyebrowProps> = ({
  label,
  className,
}: TWithClassName<IEyebrowProps>) => {
  return <span className={clsx(styles.eyebrow, className)}>{label}</span>;
};
