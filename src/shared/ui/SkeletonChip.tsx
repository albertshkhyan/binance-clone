import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../../app/providers/ThemeProvider';

export function SkeletonChip(): React.JSX.Element {
  const { colors, radii } = useTheme();
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.65,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.pill,
        {
          backgroundColor: colors.card2,
          borderRadius: radii.xl,
          paddingHorizontal: 14,
          opacity,
        },
      ]}
    >
      <View style={[styles.line, { backgroundColor: colors.border }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pill: {
    minWidth: 56,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 10,
    width: 36,
    borderRadius: 2,
    opacity: 0.5,
  },
});
