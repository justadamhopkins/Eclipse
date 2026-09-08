import { IconButton } from '@atoms/IconButton';
import { SiteContainer } from '@atoms/SiteContainer';
import { SiteLogo } from '@atoms/SiteLogo';
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
            <span>London, UK</span>
            <ul className={styles.socialLinksContainer}>
              <li>
                <IconButton
                  as={NextLink}
                  href="/contact"
                  variant="secondary"
                  icon={<RiGithubLine size={18} />}
                />
              </li>
              <li>
                <IconButton
                  as={NextLink}
                  href="/contact"
                  variant="secondary"
                  icon={<LuLinkedin size={18} />}
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
