import { Nunito_Sans } from 'next/font/google';

export const FONT_NUNITO_SANS = Nunito_Sans({
  display: 'swap',
  preload: true,
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
});
