import { SiteContainer } from '@atoms/SiteContainer';
import { AppContainer } from '@core/AppContainer';
import { PageWrapper } from '@core/PageWrapper';
import { SiteFooter } from '@organisms/Navigation/SiteFooter';
import { SiteHeader } from '@organisms/Navigation/SiteHeader';
import { FONT_HEEBO } from '@styles/typography/fonts';

import '@styles/index.css';

import Providers from './providers';

const RootLayout = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${FONT_HEEBO.variable}`}
    >
      <body>
        <Providers>
          <PageWrapper>
            <SiteHeader />
            <AppContainer>
              <SiteContainer>{children}</SiteContainer>
            </AppContainer>
            <SiteFooter />
          </PageWrapper>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
