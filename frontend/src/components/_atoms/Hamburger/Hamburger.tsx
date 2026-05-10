'use client';

import clsx from 'clsx';

import styles from './Hamburger.module.css';

interface IHamburgerProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Hamburger = ({ isOpen, onToggle }: IHamburgerProps) => {
  return (
    <button
      className={clsx(styles.hamburger, {
        [styles['hamburger--open']]: isOpen,
      })}
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span className={styles.hamburger__dot}></span>
      <span className={styles.hamburger__dot}></span>
      <span className={styles.hamburger__dot}></span>
      <span className={styles.hamburger__dot}></span>
      <span className={styles.hamburger__dot}></span>
      <span className={styles.hamburger__dot}></span>
      <span className={styles.hamburger__dot}></span>
      <span className={styles.hamburger__dot}></span>
      <span className={styles.hamburger__dot}></span>
    </button>
  );
};
