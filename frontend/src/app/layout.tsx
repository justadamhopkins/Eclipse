import { AppContainer } from '@core/AppContainer';

import '@styles/index.css';

import Providers from './providers';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppContainer>{children}</AppContainer>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
