import { parseEnvWithTransformer } from '@utils/env';
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_API_VERSION: z.string(),
  NEXT_PUBLIC_SANITY_DATASET: z.enum(['production']),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
  SANITY_READ_TOKEN: z.string(),
});

export const envConfig = parseEnvWithTransformer(
  envSchema,
  ({
    NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_API_VERSION,
    SANITY_READ_TOKEN,
  }) => ({
    sanityDataset: NEXT_PUBLIC_SANITY_DATASET,
    sanityProjectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
    sanityApiVersion: NEXT_PUBLIC_SANITY_API_VERSION,
    sanityReadToken: SANITY_READ_TOKEN,
  }),
  {
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
);
