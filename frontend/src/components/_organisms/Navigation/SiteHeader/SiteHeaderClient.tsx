'use client';

import { Hamburger } from '@atoms/Hamburger';
import { NavigationLink } from '@atoms/Navigation/NavigationLink/NavigationLink';
import { useDisclosure } from '@hooks/useDisclosure/useDisclosure';
import { OffCanvasMenu } from '@organisms/Navigation/OffCanvasMenu';

import { useScrollCtx } from '../../../contexts/ScrollProvider';

import styles from './SiteHeader.module.css';

export const SiteHeaderClient = () => {
  const { isOpen, toggle } = useDisclosure();
  const { scrollTo } = useScrollCtx();

  return (
    <>
      <div className={styles.navOuterContainer}>
        <nav className={styles.navInnerContainer}>
          <ul>
            <li>
              <NavigationLink
                as="button"
                onClick={() => scrollTo(1)}
              >
                About
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                as="button"
                onClick={() => scrollTo(2)}
              >
                Experience
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                as="button"
                onClick={() => scrollTo(3)}
              >
                Tooling
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                as="button"
                onClick={() => scrollTo(4)}
              >
                Contact
              </NavigationLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.mobileNavContainer}>
        <Hamburger
          isOpen={isOpen}
          onToggle={toggle}
        />
        <OffCanvasMenu
          isOpen={isOpen}
          handleMenuToggle={toggle}
        />
      </div>
    </>
  );
};
