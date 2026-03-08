import { SiteContainer } from '@atoms/SiteContainer';
import { AppContainer } from '@core/AppContainer';
import { SiteHeader } from '@organisms/Navigation/SiteHeader';
import { FONT_FUSTAT, FONT_INTER } from '@styles/typography/fonts';

import '@styles/index.css';

import Providers from './providers';

const RootLayout = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${FONT_FUSTAT.variable} ${FONT_INTER.variable}`}
    >
      <body>
        <Providers>
          <SiteHeader />
          <SiteContainer>
            <AppContainer>{children}</AppContainer>
          </SiteContainer>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
