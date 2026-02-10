import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  Component,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import type { Theme } from '../../shared/theme/theme';
import TrendIcon from '../../../assets/icons/trend-icon-underline.svg';
import TrendIconArrow from '../../../assets/icons/trend-icon-arrow.svg';

const LOTTIE_SOURCE = require('../../../assets/animations/lottie-trend.json');
const MIN_ICON_SIZE = 24;

type Props = {
  focused: boolean;
  color: string;
  size: number;
  colors: Theme['colors'];
};

/** Static SVG fallback when Lottie is not used or fails. */
function StaticTrendIcon({
  focused,
  color,
  size,
  colors,
}: Props): React.JSX.Element {
  return (
    <View style={{ width: size, height: size }}>
      <TrendIcon width={size} height={size} color={color} />
      <View style={{ position: 'absolute', left: 0, top: 0 }}>
        <TrendIconArrow
          width={size}
          height={size}
          color={focused ? colors.primary : color}
        />
      </View>
    </View>
  );
}

/** Catches Lottie render errors (e.g. native module missing in Expo Go) and renders fallback. */
class LottieErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    this.props.onError();
  }

  render(): ReactNode {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/**
 * Markets (trend) tab icon: when focused, plays lottie-trend.json once;
 * then shows static SVG. When not focused, shows static SVG.
 */
export function MarketsTabIcon({
  focused,
  color,
  size,
  colors,
}: Props): React.JSX.Element {
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const lottieRef = useRef<LottieView>(null);

  const onAnimationFinish = useCallback(() => {
    setHasPlayedOnce(true);
  }, []);

  const showLottie = focused && !hasPlayedOnce && !lottieError;
  const iconSize = Math.max(size || MIN_ICON_SIZE, MIN_ICON_SIZE);

  useEffect(() => {
    if (showLottie) {
      const t = setTimeout(() => lottieRef.current?.play(), 100);
      return () => clearTimeout(t);
    }
  }, [showLottie]);

  if (showLottie) {
    const staticFallback = (
      <StaticTrendIcon focused={focused} color={color} size={size} colors={colors} />
    );
    return (
      <LottieErrorBoundary
        fallback={staticFallback}
        onError={() => setLottieError(true)}
      >
        <View style={{ width: iconSize, height: iconSize }}>
          <LottieView
            ref={lottieRef}
            autoPlay
            loop={false}
            source={LOTTIE_SOURCE}
            onAnimationFinish={onAnimationFinish}
            onAnimationFailure={() => setLottieError(true)}
            style={{
              width: iconSize,
              height: iconSize,
            }}
          />
        </View>
      </LottieErrorBoundary>
    );
  }

  return <StaticTrendIcon focused={focused} color={color} size={size} colors={colors} />;
}
