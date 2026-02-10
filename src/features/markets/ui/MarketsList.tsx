import React, { useCallback } from 'react';
import { Text, FlatList } from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { MarketRow } from './MarketRow';
import type { MarketCoin } from '../../../shared/types';
import type { MarketRowProps } from './MarketRow';
import { styles } from './MarketsScreen.styles';

type Props = {
  data: MarketCoin[];
  coinToRowProps: (coin: MarketCoin) => MarketRowProps;
};

export function MarketsList({ data, coinToRowProps }: Props): React.JSX.Element {
  const { colors } = useTheme();
  const renderItem = useCallback(
    ({ item }: { item: MarketCoin }) => <MarketRow {...coinToRowProps(item)} />,
    [coinToRowProps]
  );
  const keyExtractor = useCallback((item: MarketCoin) => item.id, []);
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <Text style={[styles.emptyText, { color: colors.text3 }]}>
          No coins match your search.
        </Text>
      }
    />
  );
}
