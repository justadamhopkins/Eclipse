'use client';

import clsx from 'clsx';

import styles from './Hamburger.module.css';

interface IHamburgerProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Hamburger = ({ isOpen = false, onToggle }: IHamburgerProps) => {
  return (
    <button
      className={clsx(styles.hamburger, {
        [styles.open]: isOpen,
      })}
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </button>
  );
};
