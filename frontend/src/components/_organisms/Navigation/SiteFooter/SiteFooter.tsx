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
        <div className={styles.topContainer}>
          <SiteLogo />
          <div className={styles.actionsContainer}>
            <ul className={styles.socialLinksContainer}>
              <li>
                <IconButton
                  variant="brand"
                  as={NextLink}
                  href="https://github.com/justadamhopkins"
                  icon={<RiGithubLine size={24} />}
                />
              </li>
              <li>
                <IconButton
                  variant="brand"
                  as={NextLink}
                  href="https://www.linkedin.com/in/adamhopkins1989/"
                  icon={<LuLinkedin size={24} />}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div>
            <Text as="span">London, UK</Text>
          </div>
          <small>&copy; {new Date().getFullYear()} Adam Hopkins</small>
        </div>
      </SiteContainer>
    </footer>
  );
};
