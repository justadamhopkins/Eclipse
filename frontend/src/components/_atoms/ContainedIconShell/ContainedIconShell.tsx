import { type TTshirtSize } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './ContainedIconShell.module.css';

export interface IContainedIconShellProps {
  size?: Extract<TTshirtSize, 'sm'>;
}

export const ContainedIconShell = ({
  children,
  size = 'sm',
}: PropsWithChildren<IContainedIconShellProps>) => {
  return (
    <span
      className={clsx([
        styles.containedIconShell,
        styles[`containedIconShell__${size}`],
      ])}
    >
      {children}
    </span>
  );
};
