import React, { useState, useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MarketsStackParamList } from '../../../app/navigation/types';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { ScreenLayout } from '../../../shared/layout';
import { useMarkets } from '../api/useMarkets';
import { MarketsSearchBar } from './MarketsSearchBar';
import { MarketsList } from './MarketsList';
import { MarketsTabStrip } from './MarketsTabStrip';
import { MarketsChipsRow } from './MarketsChipsRow';
import { MarketsTableHeader } from './MarketsTableHeader';
import { MarketsSkeletonList } from './MarketsSkeletonList';
import { MarketsErrorState } from './MarketsErrorState';
import { useFilteredMarkets } from './useFilteredMarkets';
import {
  VS_CURRENCY,
  PER_PAGE,
  PAGE,
  SECONDARY_TABS_BY_PRIMARY,
  MARKET_CHIPS_CONFIG,
  OPTIONS_EXPIRY_LABEL,
  type PrimaryTabId,
  type MarketSecondaryId,
  type SortField,
  type SortDirection,
} from './MarketsScreen.constants';
import type { MarketsOrder } from '../../../shared/api/coingecko';
import { styles } from './MarketsScreen.styles';

function getInitialSecondaryTab(primary: PrimaryTabId): string {
  const config = SECONDARY_TABS_BY_PRIMARY[primary];
  return config?.tabs[0]?.id ?? '';
}

function getFirstChipForMarketSecondary(secondary: string): string {
  const config = MARKET_CHIPS_CONFIG[secondary as MarketSecondaryId];
  if (config?.type === 'chips') return config.chips[0] ?? 'USDT';
  if (config?.type === 'options') return config.underlyingChips[0] ?? 'BTC';
  return 'USDT';
}

export function MarketsScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<MarketsStackParamList>>();
  const [search, setSearch] = useState('');
  const [primaryTab, setPrimaryTab] = useState<PrimaryTabId>('market');
  const [secondaryTab, setSecondaryTab] = useState<string>(() =>
    getInitialSecondaryTab('market')
  );
  const [activeChip, setActiveChip] = useState('USDT');
  const [optionsExpiry, setOptionsExpiry] = useState(OPTIONS_EXPIRY_LABEL);
  const [usdmDropdown, setUsdmDropdown] = useState('All');
  const [coinmDropdown, setCoinmDropdown] = useState('All');
  const [sortField, setSortField] = useState<SortField>('market_cap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const marketsOrder: MarketsOrder | undefined =
    sortField === 'market_cap'
      ? sortDirection === 'asc'
        ? 'market_cap_asc'
        : 'market_cap_desc'
      : undefined;

  const handlePrimaryTab = useCallback((id: PrimaryTabId) => {
    setPrimaryTab(id);
    setSecondaryTab(getInitialSecondaryTab(id));
  }, []);

  useEffect(() => {
    if (primaryTab !== 'market') return;
    setActiveChip(getFirstChipForMarketSecondary(secondaryTab));
  }, [primaryTab, secondaryTab]);

  const { data: list = [], isLoading, isError, error, refetch } = useMarkets(
    VS_CURRENCY,
    PER_PAGE,
    PAGE,
    marketsOrder
  );

  const handleSortChange = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
        return prev;
      }
      setSortDirection('desc');
      return field;
    });
  }, []);

  const handlePressCoin = useCallback(
    (coinId: string) => navigation.navigate('CoinDetails', { coinId }),
    [navigation]
  );

  const marketView: 'crypto' | 'spot' | 'usdm' | 'coinm' | 'options' =
    primaryTab === 'market'
      ? (secondaryTab as 'crypto' | 'spot' | 'usdm' | 'coinm' | 'options')
      : 'crypto';
  const { filteredAndSorted, coinToRowProps } = useFilteredMarkets(
    list,
    search,
    sortField,
    sortDirection,
    handlePressCoin,
    marketView,
    primaryTab === 'market' ? activeChip : 'USDC'
  );

  if (isError) {
    return (
      <ScreenLayout inTabNavigator>
        <MarketsErrorState
          message={error?.message ?? 'Something went wrong'}
          onRetry={() => refetch()}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout inTabNavigator>
      <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <MarketsSearchBar value={search} onChangeText={setSearch} />
      <MarketsTabStrip
        primaryTab={primaryTab}
        secondaryTab={secondaryTab}
        onPrimaryTab={handlePrimaryTab}
        onSecondaryTab={setSecondaryTab}
        onEditOptionSelect={(optionId) => {
          // Edit favorites / New Group / Manage Groups - wire to your logic
        }}
      />
      {primaryTab === 'market' && (
        <MarketsChipsRow
          marketSecondaryTab={secondaryTab}
          activeChip={activeChip}
          onChipPress={setActiveChip}
          isLoading={isLoading}
          dropdownValue={
            secondaryTab === 'options'
              ? optionsExpiry
              : secondaryTab === 'usdm'
                ? usdmDropdown
                : secondaryTab === 'coinm'
                  ? coinmDropdown
                  : 'All'
          }
          onDropdownSelect={
            secondaryTab === 'options'
              ? (expiry) => {
                  setOptionsExpiry(expiry);
                  refetch();
                }
              : secondaryTab === 'usdm'
                ? setUsdmDropdown
                : secondaryTab === 'coinm'
                  ? setCoinmDropdown
                  : () => {}
          }
        />
      )}
      <MarketsTableHeader
        variant="default"
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
      {isLoading ? (
        <MarketsSkeletonList />
      ) : (
        <MarketsList data={filteredAndSorted} coinToRowProps={coinToRowProps} />
      )}
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
