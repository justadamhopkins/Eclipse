import { Button } from '@atoms/Button';
import { Hamburger } from '@atoms/Hamburger';
import { NavigationLink } from '@atoms/Navigation/NavigationLink/NavigationLink';
import { SiteContainer } from '@atoms/SiteContainer';
import { SiteLogo } from '@atoms/SiteLogo';
import clsx from 'clsx';

import styles from './SiteHeader.module.css';

export const SiteHeader = () => {
  return (
    <header className={clsx([styles.siteHeader])}>
      <SiteContainer className={clsx([styles.siteHeader__container])}>
        <SiteLogo />
        <div className={styles.siteHeader__navWrapper}>
          <nav className={clsx([styles.siteHeader__navContainer])}>
            <ul>
              <li>
                <NavigationLink href="/">Home</NavigationLink>
              </li>
              <li>
                <NavigationLink href="/about">About</NavigationLink>
              </li>
            </ul>
          </nav>
          <Button variant="secondary">Contact</Button>
        </div>
        <div className={styles.siteHeader__mobileNavWrapper}>
          <Hamburger />
        </div>
      </SiteContainer>
    </header>
  );
};
