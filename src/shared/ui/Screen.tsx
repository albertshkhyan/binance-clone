import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../app/providers/ThemeProvider';

type ScreenProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
};

export function Screen({ children, style }: ScreenProps): React.JSX.Element {
  const { colors, spacing } = useTheme();
  return (
    <View
      style={[
        { flex: 1, backgroundColor: colors.bg, padding: spacing.lg },
        style,
      ]}
    >
      {children}
    </View>
  );
}
