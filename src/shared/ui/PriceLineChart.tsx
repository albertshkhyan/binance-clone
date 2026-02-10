import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DEFAULT_HEIGHT = 200;
const CHART_WIDTH = 300;
const PADDING = { top: 8, right: 8, bottom: 24, left: 8 };
const STROKE_WIDTH = 2;
const MIN_POINTS = 2;

type PriceLineChartProps = {
  data: number[];
  height?: number;
  showMinMax?: boolean;
};

export function PriceLineChart({
  data,
  height = DEFAULT_HEIGHT,
  showMinMax = false,
}: PriceLineChartProps): React.JSX.Element {
  const { path, minVal, maxVal } = useMemo(() => {
    const w = CHART_WIDTH - PADDING.left - PADDING.right;
    const h = height - PADDING.top - PADDING.bottom;
    if (!data.length || data.length < MIN_POINTS) {
      return { path: '', minVal: 0, maxVal: 0 };
    }
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const xStep = (w - PADDING.left - PADDING.right) / (data.length - 1);
    let d = '';
    data.forEach((val, i) => {
      const x = PADDING.left + i * xStep;
      const y = PADDING.top + h - ((val - min) / range) * h;
      if (i === 0) d += `M ${x} ${y}`;
      else d += ` L ${x} ${y}`;
    });
    return { path: d, minVal: min, maxVal: max };
  }, [data, height]);

  if (data.length < MIN_POINTS) {
    return (
      <View style={[styles.wrapper, { height }]}>
        <Text style={styles.noData}>Not enough data</Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { height }]}>
      {showMinMax && (
        <View style={styles.minMaxRow}>
          <Text style={styles.minMaxText}>Max: {formatPrice(maxVal)}</Text>
          <Text style={styles.minMaxText}>Min: {formatPrice(minVal)}</Text>
        </View>
      )}
      <Svg
        width="100%"
        height={height}
        style={styles.svg}
        viewBox={`0 0 ${CHART_WIDTH} ${height}`}
        preserveAspectRatio="none"
      >
        <Path
          d={path}
          fill="none"
          stroke="#f0b90b"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function formatPrice(value: number): string {
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${value.toFixed(2)}`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(6)}`;
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: DEFAULT_HEIGHT,
  },
  svg: {
    width: '100%',
  },
  minMaxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  minMaxText: {
    fontSize: 11,
    color: '#848e9c',
  },
  noData: {
    fontSize: 13,
    color: '#848e9c',
    textAlign: 'center',
    paddingVertical: 24,
  },
});
