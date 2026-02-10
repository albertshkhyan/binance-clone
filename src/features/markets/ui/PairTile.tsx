import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';

type PairTileProps = {
  base: string;
  quote: string;
  changePct: number;
  selected: boolean;
  onToggle: () => void;
};

export function PairTile({
  base,
  quote,
  changePct,
  selected,
  onToggle,
}: PairTileProps): React.JSX.Element {
  const { colors, radii, spacing, typography } = useTheme();
  const isUp = changePct >= 0;

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.card,
        {
          borderRadius: radii.lg,
          backgroundColor: pressed ? colors.card2 : colors.card,
          padding: spacing.md,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.row}>
        <View>
          <Text style={[typography.h2, { color: colors.text }]}>
            {base}
            <Text style={[styles.quote, { color: colors.text3 }]}>/{quote}</Text>
          </Text>
          <Text
            style={[
              typography.caption,
              styles.change,
              { color: isUp ? colors.green : colors.red },
            ]}
          >
            {isUp ? '+' : ''}
            {changePct.toFixed(2)}%
          </Text>
        </View>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: colors.border,
              backgroundColor: selected ? 'rgba(231,238,247,0.9)' : 'transparent',
            },
          ]}
        >
          {selected ? (
            <Text style={[styles.check, { color: colors.bg }]}>✓</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    minHeight: 86,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quote: {
    fontWeight: '600',
  },
  change: {
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    fontWeight: '900',
  },
});
