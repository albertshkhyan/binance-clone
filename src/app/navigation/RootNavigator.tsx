import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../providers/ThemeProvider';
import { DEFAULT_TAB_BAR_HEIGHT } from '../../shared/layout';
import type { RootTabParamList, MarketsStackParamList } from './types';
import { HomeScreen } from '../../features/home/ui/HomeScreen';
import { MarketsScreen } from '../../features/markets/ui/MarketsScreen';
import { CoinDetailsScreen } from '../../features/coin/ui/CoinDetailsScreen';
import { TradeScreen } from '../../features/trade/ui/TradeScreen';
import { FuturesScreen } from '../../features/futures/ui/FuturesScreen';
import { AssetsScreen } from '../../features/assets/ui/AssetsScreen';

import BinanceIcon from '../../../assets/icons/binance-icon.svg';
import TradeSwapIcon from '../../../assets/icons/trade-swap-icon.svg';
import { MarketsTabIcon } from './MarketsTabIcon';
import FuturesIcon from '../../../assets/icons/futures-icon.svg';
import AssetsIcon from '../../../assets/icons/assets-icon.svg';

const Tab = createBottomTabNavigator<RootTabParamList>();
const MarketsStack = createNativeStackNavigator<MarketsStackParamList>();

function MarketsStackNavigator(): React.JSX.Element {
  return (
    <MarketsStack.Navigator screenOptions={{ headerShown: false }}>
      <MarketsStack.Screen name="MarketsList" component={MarketsScreen} />
      <MarketsStack.Screen name="CoinDetails" component={CoinDetailsScreen} options={{ title: 'Details' }} />
    </MarketsStack.Navigator>
  );
}

const TAB_ICON_SIZE = 24;

export function RootNavigator(): React.JSX.Element {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const tabBarHeight = DEFAULT_TAB_BAR_HEIGHT + insets.bottom;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.iconMuted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            height: tabBarHeight,
            paddingTop: 8,
            borderTopWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            elevation: 0,
            shadowOpacity: 0,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              const iconColor = focused ? colors.primary : color;
              return (
                <BinanceIcon
                  width={size ?? TAB_ICON_SIZE}
                  height={size ?? TAB_ICON_SIZE}
                  color={iconColor}
                  fill={iconColor}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Markets"
          component={MarketsStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MarketsTabIcon
                focused={!!focused}
                color={color}
                size={size ?? TAB_ICON_SIZE}
                colors={colors}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Trade"
          component={TradeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TradeSwapIcon
                width={size ?? TAB_ICON_SIZE}
                height={size ?? TAB_ICON_SIZE}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Futures"
          component={FuturesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FuturesIcon
                width={size ?? TAB_ICON_SIZE}
                height={size ?? TAB_ICON_SIZE}
                color={color}
                fill={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Assets"
          component={AssetsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AssetsIcon
                width={size ?? TAB_ICON_SIZE}
                height={size ?? TAB_ICON_SIZE}
                color={color}
                fill={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
