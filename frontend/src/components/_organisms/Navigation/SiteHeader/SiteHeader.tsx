import { SiteContainer } from '@atoms/SiteContainer';
import { SiteLogo } from '@atoms/SiteLogo';
import { SiteHeaderClient } from '@organisms/Navigation/SiteHeader/SiteHeaderClient';

import styles from './SiteHeader.module.css';

export const SiteHeader = () => {
  return (
    <header className={styles.siteHeader}>
      <SiteContainer className={styles.container}>
        <SiteLogo />

        <SiteHeaderClient />
      </SiteContainer>
    </header>
  );
};
