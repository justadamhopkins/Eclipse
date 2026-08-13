import { Archivo } from 'next/font/google';

export const FONT_ARCHIVO = Archivo({
  display: 'swap',
  preload: true,
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});
