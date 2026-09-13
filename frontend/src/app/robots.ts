import { BASE_SITE_DOMAIN } from '@constants/app';
import { type MetadataRoute } from 'next';

const NO_INDEX_PATHS = [] as const;

export default function robots(): MetadataRoute.Robots {
  if (
    process.env.VERCEL_ENV !== 'production' ||
    process.env.NODE_ENV !== 'production'
  ) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '*',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/api/', // Next.js API routes
      },
      {
        userAgent: '*',
        disallow: '/_next/', // Next.js build output
      },
      {
        userAgent: '*',
        disallow: '/public/', // static files like css, images, fonts. This one's up to you!
      },

      ...NO_INDEX_PATHS.map(path => ({
        userAgent: '*',
        disallow: path,
      })),
    ],

    sitemap: `${BASE_SITE_DOMAIN}/sitemap.xml`,
  };
}
