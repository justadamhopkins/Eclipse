import { Button } from '@atoms/Button';
import { SiteContainer } from '@atoms/SiteContainer';
import { Text } from '@atoms/Text';
import clsx from 'clsx';
import NextLink from 'next/link';

import styles from './ErrorPage.module.css';

type TErrorStatus = 400 | 401 | 403 | 404 | 500 | 502 | 503;

interface IErrorPageProps {
  status: TErrorStatus;
  title: string;
  message: string;
  handleRetry?: () => void;
}

export const ErrorPage = ({
  status,
  title,
  message,
  handleRetry,
}: IErrorPageProps) => {
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
          <ul className={styles.actionsContainer}>
            <li>
              <Button
                as={NextLink}
                href="/"
              >
                Back to home
              </Button>
              {handleRetry && (
                <Button
                  variant="secondary"
                  onClick={handleRetry}
                >
                  Retry
                </Button>
              )}
            </li>
          </ul>
        </section>
      </SiteContainer>
    </div>
  );
};
