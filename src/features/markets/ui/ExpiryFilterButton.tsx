import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { styles } from './MarketsScreen.styles';

type Props = {
  label: string;
  onPress: () => void;
};

/** Button that opens the Choose Expiry sheet. Shows current selection + chevron (Binance-style). */
export function ExpiryFilterButton({ label, onPress }: Props): React.JSX.Element {
  const { colors, typography } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.expiryDropdownButton, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[typography.body, { color: colors.text }]} numberOfLines={1}>
        {label}
      </Text>
      <Ionicons name="chevron-down" size={18} color={colors.text3} />
    </TouchableOpacity>
  );
}
