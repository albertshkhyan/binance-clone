/** Single point: [timestampMs, price] */
export type MarketChartPoint = [number, number];

/** Market chart response: prices array */
export interface MarketChart {
  prices: MarketChartPoint[];
}
