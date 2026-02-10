import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { styles } from './MarketsScreen.styles';

type Props = { message: string; onRetry: () => void };

export function MarketsErrorState({ message, onRetry }: Props): React.JSX.Element {
  const { colors, radii, typography } = useTheme();
  return (
    <View style={[styles.centered, { backgroundColor: colors.bg }]}>
      <Text style={[styles.errorText, { color: colors.red }]}>{message}</Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: colors.primary, borderRadius: radii.lg }]}
        onPress={onRetry}
      >
        <Text style={[typography.h2, { color: colors.onPrimary }]}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}
