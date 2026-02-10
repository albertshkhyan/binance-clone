import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../app/providers/ThemeProvider';

/** Default bottom tab bar height. Only use for non-tab contexts (e.g. modals). */
export const DEFAULT_TAB_BAR_HEIGHT = 58;

export type ScreenLayoutProps = {
  children: React.ReactNode;
  /** Apply top safe area inset (e.g. below status bar/notch). Default true. */
  topSafe?: boolean;
  /** Apply bottom safe area inset. False when screen is inside bottom tab navigator (navigator reserves that space). */
  bottomSafe?: boolean;
  /** Extra bottom padding when content is not in a tab navigator (e.g. modal). Ignored when inTabNavigator. */
  tabBarPadding?: number;
  /** Screen is inside bottom tab navigator: no bottom padding (navigator already lays content above tab bar). */
  inTabNavigator?: boolean;
  /** Optional style merged with the container. */
  style?: ViewStyle;
};

/**
 * Single place for safe area insets on a screen. Use at the root of each screen to avoid
 * nesting SafeAreaView and double-padding. Horizontal padding is left to screen content (e.g. 16px)
 * so headers and lists control their own margins.
 */
export function ScreenLayout({
  children,
  topSafe = true,
  bottomSafe = true,
  tabBarPadding = 0,
  inTabNavigator = false,
  style,
}: ScreenLayoutProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const paddingTop = topSafe ? insets.top : 0;
  const paddingBottom = inTabNavigator
    ? 0
    : tabBarPadding > 0
      ? tabBarPadding
      : bottomSafe
        ? insets.bottom
        : 0;

  return (
    <View
      style={[
        { flex: 1, backgroundColor: colors.bg },
        { paddingTop, paddingBottom },
        style,
      ]}
    >
      {children}
    </View>
  );
}
