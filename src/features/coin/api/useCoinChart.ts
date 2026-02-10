import { useQuery } from '@tanstack/react-query';
import { fetchMarketChart } from '../../../shared/api/coingecko';
import type { MarketChart } from '../../../shared/types';

const COIN_CHART_STALE_MS = 5 * 60 * 1000;

const DEFAULT_VS_CURRENCY = 'usd';

export const coinChartQueryKey = (id: string, vsCurrency: string, days: number) =>
  ['coinChart', id, vsCurrency, days] as const;

export function useCoinChart(
  coinId: string,
  vsCurrency: string = DEFAULT_VS_CURRENCY,
  days: number = 7
) {
  return useQuery({
    queryKey: coinChartQueryKey(coinId, vsCurrency, days),
    queryFn: async () => {
      const res = await fetchMarketChart(coinId, vsCurrency, days);
      return { prices: res.prices } satisfies MarketChart;
    },
    enabled: !!coinId,
    staleTime: COIN_CHART_STALE_MS,
  });
}
