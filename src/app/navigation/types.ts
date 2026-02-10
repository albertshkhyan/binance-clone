import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MarketsStackParamList = {
  MarketsList: undefined;
  CoinDetails: { coinId: string };
};

export type RootTabParamList = {
  Home: undefined;
  Markets: undefined;
  Trade: undefined;
  Futures: undefined;
  Assets: undefined;
};

export type MarketsStackScreenProps<T extends keyof MarketsStackParamList> =
  NativeStackScreenProps<MarketsStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
    interface MarketsParamList extends MarketsStackParamList {}
  }
}
