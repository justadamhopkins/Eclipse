import { AppContainer } from '@core/AppContainer';
import { PageWrapper } from '@core/PageWrapper';
import { SiteFooter } from '@organisms/Navigation/SiteFooter';
import { SiteHeader } from '@organisms/Navigation/SiteHeader';
import { FONT_ARCHIVO, FONT_ARCHIVO_BLACK } from '@styles/typography/fonts';

import '@styles/index.css';

import Providers from './providers';

const RootLayout = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${FONT_ARCHIVO.variable} ${FONT_ARCHIVO_BLACK.variable}`}
    >
      <body>
        <Providers>
          <PageWrapper>
            <SiteHeader />
            <AppContainer>{children}</AppContainer>
            <SiteFooter />
          </PageWrapper>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
