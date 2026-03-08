import { SiteContainer } from '@atoms/SiteContainer';
import { SiteLogo } from '@atoms/SiteLogo';
import clsx from 'clsx';

import styles from './SiteHeader.module.css';

export const SiteHeader = () => {
  return (
    <header className={clsx([styles.siteHeader])}>
      <SiteContainer className={clsx([styles.siteHeader__container])}>
        <SiteLogo />
        <nav className={clsx([styles.siteHeader__navContainer])}>
          <ul>
            <li>page 1</li>
            <li>page 2</li>
            <li>page 3</li>
          </ul>
        </nav>
        <button>testsr</button>
      </SiteContainer>
    </header>
  );
};
