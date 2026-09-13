import { AppContainer } from '@core/AppContainer';
import { PageWrapper } from '@core/PageWrapper';
import { SiteFooter } from '@organisms/Navigation/SiteFooter';
import { SiteHeader } from '@organisms/Navigation/SiteHeader';
import { FONT_ARCHIVO, FONT_ARCHIVO_BLACK } from '@styles/typography/fonts';
import { type Metadata } from 'next';

import '@styles/index.css';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'Adam Hopkins portfolio',
  description: 'A portfolio site for senior software engineer Adam Hopkins.',
  icons: [
    { rel: 'shortcut icon', url: '/assets/favicon.ico' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/assets/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/assets/favicon-96x96.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/favicon-16x16-light.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/favicon-16x16-dark.png',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/assets/apple-touch-icon.png',
    },
  ],
  other: {
    'apple-mobile-web-app-title': 'Speech hoppy',
  },
};

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
