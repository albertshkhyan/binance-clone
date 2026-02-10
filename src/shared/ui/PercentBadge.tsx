import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../app/providers/ThemeProvider';

const NEAR_ZERO = 0.0001;

/** Min width 84–90, height 32, radius 8–10, font 13 weight 700. */
type PercentBadgeProps = {
  value: number;
};

export function PercentBadge({ value }: PercentBadgeProps): React.JSX.Element {
  const { colors, radii, typography } = useTheme();

  const isUp = value > NEAR_ZERO;
  const isDown = value < -NEAR_ZERO;

  const bg = isUp ? colors.upBg : isDown ? colors.downBg : colors.neutralBg;
  const fg = isUp ? colors.up : isDown ? colors.down : colors.text2;

  return (
    <View
      style={{
        minWidth: 88,
        height: 32,
        borderRadius: radii.sm,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={[typography.badge, { color: fg }]}>
        {value > 0 ? '+' : ''}
        {value.toFixed(2)}%
      </Text>
    </View>
  );
}
