import { SiteLogo } from '@atoms/SiteLogo';
import clsx from 'clsx';

import styles from './SiteHeader.module.css';

export const SiteHeader = () => {
  return (
    <header className={clsx([styles.siteHeader])}>
      <SiteLogo />
      <div className={clsx([styles.siteHeader__navContainer])}>ham/nav</div>
    </header>
  );
};
