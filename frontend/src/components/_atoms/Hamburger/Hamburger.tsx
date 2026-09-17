'use client';
import styles from './Hamburger.module.css';

interface IHamburgerProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Hamburger = ({ isOpen = false, onToggle }: IHamburgerProps) => {
  return (
    <div className={styles.hamburgerWrapper}>
      <input
        type="checkbox"
        checked={isOpen}
        onChange={onToggle}
        id="hamburger-toggle"
        aria-label="hamburger"
        aria-controls="menu"
        aria-expanded="false"
        className={styles.hamburgerToggle}
      />
      <label
        htmlFor="hamburger-toggle"
        className={styles.hamburger}
        aria-hidden="true"
      >
        <span className={styles.slice}></span>
        <span className={styles.slice}></span>
        <span className={styles.slice}></span>
        <span className="sr-only">{isOpen ? 'Menu open' : 'Menu closed'}</span>
      </label>
    </div>
  );
};
