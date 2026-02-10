import { useMemo, useCallback } from 'react';
import type { MarketCoin } from '../../../shared/types';
import type { SortField, SortDirection } from './MarketsScreen.constants';
import { formatVolume, formatPriceValue } from './MarketsScreen.utils';
import type { MarketRowProps } from './MarketRow';

/** Leverage placeholder for Spot view (API has no leverage; match reference UI). */
const SPOT_LEVERAGE_10X = new Set(['btc', 'eth']);
const SPOT_LEVERAGE_5X = new Set([
  'sol', 'xrp', 'bnb', 'sui', 'link', 'usdt', 'usdc', 'fdusd', 'eur', 'usd1',
]);

function getLeverageLabel(symbol: string): string | undefined {
  const lower = symbol.toLowerCase();
  if (SPOT_LEVERAGE_10X.has(lower)) return '10x';
  if (SPOT_LEVERAGE_5X.has(lower)) return '5x';
  return undefined;
}

/** Round price to nearest strike (e.g. 40000, 70000). */
function toStrike(price: number): number {
  if (price >= 1000) return Math.round(price / 1000) * 1000;
  if (price >= 100) return Math.round(price / 100) * 100;
  return Math.round(price);
}

export type MarketViewMode = 'crypto' | 'spot' | 'usdm' | 'coinm' | 'options';

export function useFilteredMarkets(
  list: MarketCoin[],
  search: string,
  sortField: SortField,
  sortDirection: SortDirection,
  onPressCoin: (coinId: string) => void,
  marketView: MarketViewMode = 'crypto',
  spotQuote: string = 'USDC'
) {
  const filteredAndSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = q
      ? list.filter(
          (c) =>
            c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
        )
      : [...list];
    const mult = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'market_cap') {
      result.sort(
        (a, b) => mult * ((a.market_cap ?? 0) - (b.market_cap ?? 0))
      );
    } else if (sortField === 'price') {
      result.sort(
        (a, b) => mult * ((a.current_price ?? 0) - (b.current_price ?? 0))
      );
    } else {
      result.sort(
        (a, b) =>
          mult *
          ((a.price_change_percentage_24h ?? 0) -
            (b.price_change_percentage_24h ?? 0))
      );
    }
    return result;
  }, [list, search, sortField, sortDirection]);

  const coinToRowProps = useCallback(
    (coin: MarketCoin): MarketRowProps => {
      const price = coin.current_price ?? 0;
      const changePct = coin.price_change_percentage_24h ?? 0;
      const lastPriceLabel = formatPriceValue(price);
      const approxUsdLabel = `$${formatPriceValue(price)}`;
      const onPress = () => onPressCoin(coin.id);
      const base = coin.symbol.toUpperCase();

      if (marketView === 'crypto') {
        return {
          variant: 'crypto',
          image: coin.image,
          symbol: base,
          name: coin.name,
          lastPriceLabel,
          approxUsdLabel,
          changePct,
          onPress,
        };
      }

      if (marketView === 'spot') {
        return {
          variant: 'spot',
          base,
          quote: spotQuote,
          volumeLabel: formatVolume(coin.total_volume),
          leverageLabel: getLeverageLabel(coin.symbol),
          lastPriceLabel,
          approxUsdLabel,
          changePct,
          onPress,
        };
      }

      if (marketView === 'usdm') {
        const symbol = base + spotQuote;
        const vol = coin.total_volume ?? 0;
        const volumeLabel = `${formatVolume(vol)} ${spotQuote}`;
        return {
          variant: 'usdm',
          symbol,
          volumeLabel,
          isFavorite: false,
          lastPriceLabel,
          approxUsdLabel,
          changePct,
          onPress,
        };
      }

      if (marketView === 'coinm') {
        const symbol = `${base}USD CM`;
        const vol = coin.total_volume ?? 0;
        const volumeLabel = `${formatVolume(vol)} Cont`;
        return {
          variant: 'coinm',
          symbol,
          contractLabel: 'Perp',
          volumeLabel,
          lastPriceLabel,
          approxUsdLabel,
          changePct,
          onPress,
        };
      }

      // options (images 1–2): contract name + volume USDT | last price | 24h% pill
      const strike = toStrike(price);
      const name = `${base}-260210-${strike.toLocaleString()}-C`;
      const volumeLabel = `${formatVolume(coin.total_volume)} USDT`;
      return {
        variant: 'options',
        name,
        volumeLabel,
        lastPriceLabel,
        approxUsdLabel,
        changePct,
        onPress,
      };
    },
    [onPressCoin, marketView, spotQuote]
  );

  return { filteredAndSorted, coinToRowProps };
}
