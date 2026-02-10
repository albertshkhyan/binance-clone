import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../app/providers/ThemeProvider';

/** Height 54–56, radius 14, marginH 16, font 16 weight 700. */
type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
};

export function PrimaryButton({ title, onPress }: PrimaryButtonProps): React.JSX.Element {
  const { colors, radii, typography } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          borderRadius: radii.lg,
          backgroundColor: pressed ? colors.primaryPressed : colors.primary,
          marginHorizontal: 16,
        },
      ]}
    >
      <Text style={[typography.h2, { color: colors.onPrimary }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
