import { Archivo, JetBrains_Mono, Playfair_Display } from 'next/font/google';

export const FONT_ARCHIVO = Archivo({
  display: 'swap',
  preload: true,
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const FONT_JETBRAINS_MONO = JetBrains_Mono({
  display: 'swap',
  preload: false,
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const FONT_PLAYFAIR_DISPLAY = Playfair_Display({
  display: 'swap',
  preload: false,
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['700', '800'],
});
