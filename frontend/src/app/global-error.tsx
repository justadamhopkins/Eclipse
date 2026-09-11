'use client'; // Error boundaries must be Client Components

import { AppContainer } from '@core/AppContainer';
import { ErrorPage } from '@core/ErrorPage';
import { PageWrapper } from '@core/PageWrapper';
import { SiteFooter } from '@organisms/Navigation/SiteFooter';
import { SiteHeader } from '@organisms/Navigation/SiteHeader';
import { FONT_ARCHIVO, FONT_ARCHIVO_BLACK } from '@styles/typography/fonts';
import { useEffect } from 'react';
import '@styles/index.css';

type TGlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function GlobalError({ error, retry }: TGlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html
      lang="en"
      className={`${FONT_ARCHIVO.variable} ${FONT_ARCHIVO_BLACK.variable}`}
    >
      <body>
        <main>
          <PageWrapper>
            <SiteHeader />
            <AppContainer>
              <ErrorPage
                status={500}
                title="An unexpected error has occurred"
                message="Please try again later."
                handleRetry={retry}
              />
            </AppContainer>
            <SiteFooter />
          </PageWrapper>
        </main>
      </body>
    </html>
  );
}
