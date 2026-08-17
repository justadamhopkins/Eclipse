import { NavigationLink } from '@atoms/Navigation/NavigationLink/NavigationLink';
import { SiteContainer } from '@atoms/SiteContainer';
import { SiteLogo } from '@atoms/SiteLogo';
import { SiteHeaderClient } from '@organisms/Navigation/SiteHeader/SiteHeaderClient';

import styles from './SiteHeader.module.css';

export const SiteHeader = () => {
  return (
    <header className={styles.siteHeader}>
      <SiteContainer className={styles.container}>
        <SiteLogo />
        <div className={styles.navOuterContainer}>
          <nav className={styles.navInnerContainer}>
            <ul>
              <li>
                <NavigationLink href="/">Home</NavigationLink>
              </li>
              <li>
                <NavigationLink href="/about">About</NavigationLink>
              </li>
              <li>
                <NavigationLink href="/about">Contact</NavigationLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.mobileNavContainer}>
          <SiteHeaderClient />
        </div>
      </SiteContainer>
    </header>
  );
};
