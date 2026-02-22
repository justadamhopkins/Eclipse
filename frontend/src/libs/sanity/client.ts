import { envConfig } from '@constants/environment';
import { createClient, type QueryParams } from 'next-sanity';

export const client = createClient({
  projectId: envConfig.sanityProjectId,
  dataset: envConfig.sanityDataset,
  apiVersion: envConfig.sanityApiVersion,
  token: envConfig.sanityReadToken,
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
