import { Button } from '@atoms/Button';
import { SiteContainer } from '@atoms/SiteContainer';
import { Text } from '@atoms/Text';
import clsx from 'clsx';
import NextLink from 'next/link';

import styles from './ErrorPage.module.css';

interface IErrorPageProps {
  status: number;
  title: string;
  message: string;
}

export const ErrorPage = ({ status, title, message }: IErrorPageProps) => {
  return (
    <div className={styles.container}>
      <SiteContainer>
        <section
          className={clsx([styles.sectionContainer, styles.topContainer])}
        >
          <Text variant="displayXl">{status}</Text>
        </section>
        <section
          className={clsx([styles.sectionContainer, styles.bottomContainer])}
        >
          <Text variant="headingXl">{title}</Text>
          <Text>{message}</Text>
          <Button
            as={NextLink}
            href="/"
          >
            Back to home
          </Button>
        </section>
      </SiteContainer>
    </div>
  );
};
