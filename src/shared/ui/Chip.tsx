import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../../app/providers/ThemeProvider';

type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

/** Height 32, paddingH 14, radius 16, font 11 weight 700. Gap 8 (parent). */
export function Chip({ label, active = false, onPress }: ChipProps): React.JSX.Element {
  const { colors, radii, typography } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        height: 32,
        paddingHorizontal: 14,
        borderRadius: radii.xl,
        backgroundColor: active ? colors.chipActiveBg : 'transparent',
        opacity: pressed ? 0.85 : 1,
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Text
        style={[
          typography.tiny,
          { fontWeight: '700', color: active ? colors.chipActiveText : colors.chipText },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
