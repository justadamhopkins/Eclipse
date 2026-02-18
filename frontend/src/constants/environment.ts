import { parseEnvWithTransformer } from '@utils/env';
import { z } from 'zod';

const envSchema = z.object({});

export const envConfig = parseEnvWithTransformer(envSchema, () => ({}), {});
