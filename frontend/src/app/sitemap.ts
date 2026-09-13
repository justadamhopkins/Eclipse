import { BASE_SITE_DOMAIN } from '@constants/app';
import { type MetadataRoute } from 'next';

const HOMEPAGE_ROUTE = '/';

const routes: string[] = [HOMEPAGE_ROUTE];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return routes.map(route => ({
    url: `${BASE_SITE_DOMAIN}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === HOMEPAGE_ROUTE ? 1 : 0.8,
  }));
}
