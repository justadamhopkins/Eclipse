import { Heebo } from 'next/font/google';

export const FONT_HEEBO = Heebo({
  display: 'swap',
  preload: true,
  variable: '--font-heebo',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});
