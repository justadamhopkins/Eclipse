import { FIVE_MINUTES_IN_MS } from '@constants/times';
import { isServer, QueryClient } from '@tanstack/react-query';
import { type TMaybeUndefined } from '@typings/utils';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: FIVE_MINUTES_IN_MS,
      },
    },
  });
};

let browserQueryClient: TMaybeUndefined<QueryClient>;

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
};
