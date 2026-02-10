import { useQuery } from '@tanstack/react-query';
import {
  fetchMarkets,
  type MarketsOrder,
} from '../../../shared/api/coingecko';
import type { MarketCoin } from '../../../shared/types';

const MARKETS_STALE_MS = 30 * 1000;

export const marketsQueryKey = (
  vsCurrency: string,
  page: number,
  order?: MarketsOrder
) => ['markets', vsCurrency, page, order ?? 'default'] as const;

export function useMarkets(
  vsCurrency: string,
  perPage: number,
  page: number,
  order?: MarketsOrder
) {
  return useQuery({
    queryKey: marketsQueryKey(vsCurrency, page, order),
    queryFn: () =>
      fetchMarkets(vsCurrency, perPage, page, order) as Promise<MarketCoin[]>,
    staleTime: MARKETS_STALE_MS,
  });
}
