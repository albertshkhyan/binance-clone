import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { styles } from './MarketsScreen.styles';

export function MarketsSkeletonList(): React.JSX.Element {
  const { colors, spacing } = useTheme();
  return (
    <View style={styles.skeletonList}>
      {Array.from({ length: 12 }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.skeletonRow,
            {
              paddingVertical: spacing.lg,
              paddingHorizontal: spacing.lg,
              backgroundColor: colors.bg,
            },
          ]}
        >
          <View
            style={[styles.skeleton, styles.skeletonTitle, { backgroundColor: colors.card2 }]}
          />
          <View
            style={[styles.skeleton, styles.skeletonPrice, { backgroundColor: colors.card2 }]}
          />
        </View>
      ))}
    </View>
  );
}
