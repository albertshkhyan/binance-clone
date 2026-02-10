import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import type { MarketsStackScreenProps } from '../../../app/navigation/types';
import { useCoinDetails, useCoinChart } from '../api';
import { PriceLineChart } from '../../../shared/ui/PriceLineChart';

const CHART_DAYS_OPTIONS = [1, 7, 30] as const;

type Props = MarketsStackScreenProps<'CoinDetails'>;

export function CoinDetailsScreen({ route }: Props): React.JSX.Element {
  const { coinId } = route.params;
  const [days, setDays] = useState<number>(7);

  const {
    data: details,
    isLoading: detailsLoading,
    isError: detailsError,
    error: detailsErr,
    refetch: refetchDetails,
  } = useCoinDetails(coinId);

  const {
    data: chartData,
    isLoading: chartLoading,
    isError: chartError,
    refetch: refetchChart,
  } = useCoinChart(coinId, 'usd', days);

  const priceSeries = useMemo(() => {
    if (!chartData?.prices?.length) return [];
    return chartData.prices.map(([, p]) => p);
  }, [chartData]);

  const isLoading = detailsLoading;
  const isError = detailsError || chartError;
  const errorMessage = detailsErr?.message ?? (chartError ? 'Failed to load chart' : null);

  if (isLoading && !details) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f0b90b" />
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  if (isError && !details) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorMessage ?? 'Something went wrong'}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => { refetchDetails(); refetchChart(); }}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!details) return <View style={styles.centered} />;

  const change24h = details.priceChangePercentage24h ?? 0;
  const isPositive = change24h >= 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image source={{ uri: details.imageUrl }} style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.symbol}>{details.symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.priceBlock}>
        <Text style={styles.price}>{formatPrice(details.currentPrice)}</Text>
        <Text style={[styles.change24h, isPositive ? styles.changeUp : styles.changeDown]}>
          {formatPercent(change24h)} (24h)
        </Text>
      </View>
      {details.marketCap != null && (
        <Text style={styles.marketCap}>Market cap: {formatMarketCap(details.marketCap)}</Text>
      )}

      <View style={styles.timeRow}>
        {CHART_DAYS_OPTIONS.map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.timeBtn, days === d && styles.timeBtnActive]}
            onPress={() => setDays(d)}
          >
            <Text style={[styles.timeBtnText, days === d && styles.timeBtnTextActive]}>
              {d}D
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {chartLoading && priceSeries.length === 0 ? (
        <View style={styles.chartPlaceholder}>
          <ActivityIndicator size="small" color="#f0b90b" />
        </View>
      ) : (
        <PriceLineChart data={priceSeries} height={220} showMinMax />
      )}
    </ScrollView>
  );
}

function formatPrice(value: number): string {
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${value.toFixed(2)}`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(6)}`;
}

function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function formatMarketCap(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toFixed(0)}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0e11',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#848e9c',
  },
  errorText: {
    fontSize: 15,
    color: '#f6465d',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0b90b',
    borderRadius: 8,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0b0e11',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  headerInfo: {},
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#eaecef',
  },
  symbol: {
    fontSize: 14,
    color: '#848e9c',
    marginTop: 2,
  },
  priceBlock: {
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#eaecef',
  },
  change24h: {
    fontSize: 15,
    marginTop: 4,
  },
  changeUp: { color: '#0ecb81' },
  changeDown: { color: '#f6465d' },
  marketCap: {
    fontSize: 13,
    color: '#848e9c',
    marginBottom: 20,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  timeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1e2329',
  },
  timeBtnActive: {
    backgroundColor: '#f0b90b',
  },
  timeBtnText: {
    fontSize: 14,
    color: '#848e9c',
  },
  timeBtnTextActive: {
    color: '#0b0e11',
    fontWeight: '600',
  },
  chartPlaceholder: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
