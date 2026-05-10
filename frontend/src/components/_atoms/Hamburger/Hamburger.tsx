'use client';

import clsx from 'clsx';
import { type FC, useState } from 'react';

import styles from './Hamburger.module.css';

interface IHamburgerProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Hamburger: FC<IHamburgerProps> = ({ isOpen, onToggle }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = isOpen ?? internalOpen;
  const handleClick = onToggle ?? (() => setInternalOpen(prev => !prev));

  return (
    <button
      className={clsx(styles.hamburger, { [styles['hamburger--open']]: open })}
      onClick={handleClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
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
