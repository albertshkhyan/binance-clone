import { useQuery } from '@tanstack/react-query';
import { fetchCoinDetails } from '../../../shared/api/coingecko';
import type { CoinDetails } from '../../../shared/types';

const COIN_DETAILS_STALE_MS = 5 * 60 * 1000;

const DEFAULT_VS_CURRENCY = 'usd';

export const coinDetailsQueryKey = (id: string) => ['coinDetails', id] as const;

function mapToCoinDetails(
  raw: Awaited<ReturnType<typeof fetchCoinDetails>>,
  vsCurrency: string
): CoinDetails {
  const price = raw.market_data?.current_price?.[vsCurrency] ?? 0;
  const marketCap = raw.market_data?.market_cap?.[vsCurrency] ?? null;
  const change24h = raw.market_data?.price_change_percentage_24h ?? null;
  const imageUrl =
    raw.image?.large ?? raw.image?.small ?? raw.image?.thumb ?? '';
  return {
    id: raw.id,
    name: raw.name,
    symbol: raw.symbol,
    imageUrl,
    currentPrice: price,
    priceChangePercentage24h: change24h ?? null,
    marketCap,
  };
}

export function useCoinDetails(coinId: string, vsCurrency: string = DEFAULT_VS_CURRENCY) {
  return useQuery({
    queryKey: coinDetailsQueryKey(coinId),
    queryFn: async () => {
      const raw = await fetchCoinDetails(coinId);
      return mapToCoinDetails(raw, vsCurrency);
    },
    enabled: !!coinId,
    staleTime: COIN_DETAILS_STALE_MS,
  });
}
