import { type TNonEmptyArray } from '@typings/utils';

export const isErrorInstance = (error: unknown): error is Error =>
  error instanceof Error;

export const hasArrayGotValues = <T>(
  data?: Array<T> | null,
): data is TNonEmptyArray<T> =>
  !!data && Array.isArray(data) && data.length > 0;
