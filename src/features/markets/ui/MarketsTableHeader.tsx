import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';
import type { SortField, SortDirection } from './MarketsScreen.constants';
import { styles } from './MarketsScreen.styles';

const SORT_UP = '↑';
const SORT_DOWN = '↓';
const SORT_BOTH = '⇕';

type Props = {
  variant?: 'default' | 'options';
  sortField?: SortField;
  sortDirection?: SortDirection;
  onSortChange?: (field: SortField) => void;
};

function SortableCell({
  label,
  field,
  sortField,
  sortDirection,
  onSortChange,
  style,
}: {
  label: string;
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField) => void;
  style?: object;
}): React.JSX.Element {
  const { colors, typography } = useTheme();
  const isActive = sortField === field;
  const indicator =
    !isActive ? SORT_BOTH : sortDirection === 'asc' ? SORT_UP : SORT_DOWN;
  return (
    <TouchableOpacity
      onPress={() => onSortChange(field)}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: 2 }, style]}
      activeOpacity={0.7}
    >
      <Text style={[typography.tiny, { color: colors.text3 }]}>{label}</Text>
      <Text style={[typography.tiny, { color: colors.text3 }]}>{indicator}</Text>
    </TouchableOpacity>
  );
}

export function MarketsTableHeader({
  variant = 'default',
  sortField = 'market_cap',
  sortDirection = 'desc',
  onSortChange = () => {},
}: Props): React.JSX.Element {
  const { colors, spacing, typography } = useTheme();

  if (variant === 'options') {
    return (
      <View
        style={[
          styles.tableHeader,
          { paddingVertical: 8, paddingHorizontal: spacing.md },
        ]}
      >
        <Text style={[typography.tiny, { color: colors.text3, width: 100 }]}>
          Name
        </Text>
        <Text style={[typography.tiny, { color: colors.text3, width: 72 }]}>
          Strike Price
        </Text>
        <Text style={[typography.tiny, { color: colors.text3, flex: 1, textAlign: 'right' }]}>
          Last Price
        </Text>
        <Text
          style={[
            typography.tiny,
            { color: colors.text3, width: 70, marginLeft: spacing.sm, textAlign: 'right' },
          ]}
        >
          24h chg%
        </Text>
        <Text
          style={[
            typography.tiny,
            { color: colors.text3, width: 56, marginLeft: spacing.xs, textAlign: 'right' },
          ]}
        >
          Vol (BTC)
        </Text>
        <Text
          style={[
            typography.tiny,
            { color: colors.text3, width: 64, marginLeft: spacing.xs, textAlign: 'right' },
          ]}
        >
          Open Int
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.tableHeader,
        { paddingVertical: 8, paddingHorizontal: spacing.md },
      ]}
    >
      <SortableCell
        label="Name / Vol"
        field="market_cap"
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
        style={{ flex: 1.2 }}
      />
      <SortableCell
        label="Last Price"
        field="price"
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      />
      <SortableCell
        label="24h chg%"
        field="change_24h"
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
        style={{
          minWidth: 88,
          marginLeft: spacing.sm,
          justifyContent: 'flex-end',
        }}
      />
    </View>
  );
}
