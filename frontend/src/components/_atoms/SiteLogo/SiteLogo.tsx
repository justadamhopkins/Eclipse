import { Icon } from '@atoms/Icon';
import Link from 'next/link';

import styles from './SiteLogo.module.css';

export const SiteLogo = () => {
  return (
    <Link
      href="/"
      aria-label="adam hopkins logo"
      className={styles.siteLogo}
    >
      <Icon
        isInline={false}
        name="brandLogo"
      />
    </Link>
  );
};
