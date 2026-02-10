import React from 'react';
import { View } from 'react-native';
import TrendIcon from '../../../assets/icons/trend-icon-underline.svg';

/** Example: import SVG from assets and render with width/height (and optional color). */
export function SvgIconExample(): React.JSX.Element {
  return (
    <View>
      <TrendIcon width={24} height={24} color="#9BA1A7" />
    </View>
  );
}
