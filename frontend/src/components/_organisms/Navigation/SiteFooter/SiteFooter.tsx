import { IconButton } from '@atoms/IconButton';
import { SiteContainer } from '@atoms/SiteContainer';
import { SiteLogo } from '@atoms/SiteLogo';
import { Text } from '@atoms/Text';
import clsx from 'clsx';
import NextLink from 'next/link';
import { LuLinkedin } from 'react-icons/lu';
import { RiGithubLine } from 'react-icons/ri';

import styles from './SiteFooter.module.css';

export const SiteFooter = () => {
  return (
    <footer
      id="footer"
      className={clsx([styles.siteFooter])}
    >
      <SiteContainer>
        <SiteLogo />
        <div className={styles.topContainer}>
          <div className={styles.actionsContainer}>
            <Text>London, UK</Text>
            <ul className={styles.socialLinksContainer}>
              <li>
                <IconButton
                  variant="brand"
                  as={NextLink}
                  href="/contact"
                  icon={<RiGithubLine size={24} />}
                />
              </li>
              <li>
                <IconButton
                  variant="brand"
                  as={NextLink}
                  href="/contact"
                  icon={<LuLinkedin size={24} />}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <small>&copy; {new Date().getFullYear()} Adam Hopkins</small>
        </div>
      </SiteContainer>
    </footer>
  );
};
