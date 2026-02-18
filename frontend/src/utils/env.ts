import type * as z from 'zod';

type TNextPublicKeys<T> = {
  [K in keyof T as K extends `NEXT_PUBLIC_${string}` ? K : never]:
    | string
    | undefined;
};

export const parseEnvWithTransformer = <
  Output,
  Input = Output,
  TransformReturn = unknown,
>(
  envSchema: z.ZodType<Output, Input>,
  transformer: (output: Output) => TransformReturn,
  publicEnvVars?: Partial<TNextPublicKeys<Input>>,
) => {
  const envSource = publicEnvVars
    ? { ...process.env, ...publicEnvVars }
    : process.env;

  const parsed = envSchema.parse(envSource);

  return transformer(parsed);
};
