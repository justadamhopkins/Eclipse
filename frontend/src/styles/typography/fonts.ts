import { Fustat, Inter } from 'next/font/google';

export const FONT_FUSTAT = Fustat({
  display: 'swap',
  preload: true,
  variable: '--font-fustat',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const FONT_INTER = Inter({
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
