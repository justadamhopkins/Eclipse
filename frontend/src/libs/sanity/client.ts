import { createClient, type QueryParams } from 'next-sanity';
import { ENV } from 'varlock/env';

export const client = createClient({
  projectId: ENV.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: ENV.SANITY_DATASET,
  apiVersion: ENV.NEXT_PUBLIC_SANITY_API_VERSION,
  token: ENV.SANITY_READ_TOKEN,
  useCdn: true,
});

type TSanityFetchArgs<QueryString extends string> = {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number;
  tags?: string[];
};

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: TSanityFetchArgs<QueryString>) {
  return client.fetch(query, params, {
    cache: 'force-cache',
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags,
    },
  });
}
