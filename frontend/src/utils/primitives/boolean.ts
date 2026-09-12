export const isErrorInstance = (error: unknown): error is Error =>
  error instanceof Error;
