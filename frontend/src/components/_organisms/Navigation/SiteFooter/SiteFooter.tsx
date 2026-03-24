import { SiteContainer } from '@atoms/SiteContainer';
import clsx from 'clsx';

import styles from './SiteFooter.module.css';

export const SiteFooter = () => {
  return (
    <footer
      id="footer"
      className={clsx([styles.siteFooter])}
    >
      <SiteContainer>
        <small>{new Date().getFullYear()}</small>
      </SiteContainer>
    </footer>
  );
};
