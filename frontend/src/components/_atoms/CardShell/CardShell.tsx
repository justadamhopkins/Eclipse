import { type PropsWithChildren } from 'react';

import styles from './CardShell.module.css';

export const CardShell = ({ children }: PropsWithChildren) => {
  return <article className={styles.cardShell}>{children}</article>;
};
