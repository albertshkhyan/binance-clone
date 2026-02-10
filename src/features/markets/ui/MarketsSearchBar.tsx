import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { styles } from './MarketsSearchBar.styles';

type Props = {
  value: string;
  onChangeText: (v: string) => void;
};

const SEARCH_BAR_HEIGHT = 36;

export function MarketsSearchBar({ value, onChangeText }: Props): React.JSX.Element {
  const { colors, spacing, radii } = useTheme();
  return (
    <View style={[styles.wrap, { paddingHorizontal: spacing.md }]}>
      <View
        style={[
          styles.bar,
          {
            height: SEARCH_BAR_HEIGHT,
            backgroundColor: colors.card,
            borderRadius: radii.md,
            paddingHorizontal: spacing.sm,
          },
        ]}
      >
        <Ionicons name="search" size={18} color={colors.iconMuted} style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Search Coin Pairs"
          placeholderTextColor={colors.iconMuted}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={{ marginLeft: spacing.md }}
      >
        <Ionicons name="ellipsis-horizontal" size={18} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
