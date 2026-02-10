/** Minimal coin details for UI (header, price, stats) */
export interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string;
  currentPrice: number;
  priceChangePercentage24h: number | null;
  marketCap: number | null;
}
