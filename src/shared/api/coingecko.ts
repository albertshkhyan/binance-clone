import axios, { type AxiosError } from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

function serializeParams(params: Record<string, string | number | boolean | undefined>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') out[k] = String(v);
  }
  return out;
}

function toApiError(err: unknown): Error {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<{ error?: string }>;
    const msg = ax.response?.data?.error ?? ax.message ?? 'Request failed';
    return new Error(msg);
  }
  return err instanceof Error ? err : new Error(String(err));
}

// --- Types (CoinGecko response shapes) ---

export interface CoinMarketItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  last_updated?: string;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: { thumb: string; small: string; large: string };
  market_data: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    price_change_percentage_24h?: number;
  };
}

export interface MarketChartResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

// --- API functions ---

/** CoinGecko /coins/markets order param (market_cap, volume, id). */
export type MarketsOrder =
  | 'market_cap_asc'
  | 'market_cap_desc'
  | 'volume_asc'
  | 'volume_desc'
  | 'id_asc'
  | 'id_desc';

const DEFAULT_MARKETS_ORDER: MarketsOrder = 'market_cap_desc';

export async function fetchMarkets(
  vsCurrency: string,
  perPage: number,
  page: number,
  order: MarketsOrder = DEFAULT_MARKETS_ORDER
): Promise<CoinMarketItem[]> {
  const params = serializeParams({
    vs_currency: vsCurrency,
    per_page: perPage,
    page,
    order,
  });
  const { data } = await client.get<CoinMarketItem[]>('/coins/markets', { params });
  return data;
}

export async function fetchCoinDetails(id: string): Promise<CoinDetails> {
  const { data } = await client.get<CoinDetails>(`/coins/${encodeURIComponent(id)}`, {
    params: serializeParams({ localization: 'false', tickers: 'false' }),
  });
  return data;
}

export async function fetchMarketChart(
  id: string,
  vsCurrency: string,
  days: number
): Promise<MarketChartResponse> {
  const params = serializeParams({
    vs_currency: vsCurrency,
    days: days === Infinity ? 'max' : days,
  });
  const { data } = await client.get<MarketChartResponse>(
    `/coins/${encodeURIComponent(id)}/market_chart`,
    { params }
  );
  return data;
}

export { toApiError };
