import { AppContainer } from '@core/AppContainer';
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
          <AppContainer>{children}</AppContainer>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
