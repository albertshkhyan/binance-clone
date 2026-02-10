import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';
import {
  PRIMARY_TABS,
  SECONDARY_TABS_BY_PRIMARY,
  FAVORITES_EDIT_MENU_OPTIONS,
  type PrimaryTabId,
} from './MarketsScreen.constants';
import { MarketsSecondaryTabs } from './MarketsSecondaryTabs';
import { styles } from './MarketsScreen.styles';

type Props = {
  primaryTab: PrimaryTabId;
  secondaryTab: string;
  onPrimaryTab: (id: PrimaryTabId) => void;
  onSecondaryTab: (id: string) => void;
  onEditOptionSelect?: (optionId: string) => void;
};

export function MarketsTabStrip({
  primaryTab,
  secondaryTab,
  onPrimaryTab,
  onSecondaryTab,
  onEditOptionSelect,
}: Props): React.JSX.Element {
  const { colors, spacing } = useTheme();
  const secondaryConfig = SECONDARY_TABS_BY_PRIMARY[primaryTab];

  return (
    <View style={[styles.tabStrip, { backgroundColor: colors.bg }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.primaryTabsScroll}
        contentContainerStyle={[styles.primaryTabsRow, { paddingRight: spacing.sm }]}
      >
        {PRIMARY_TABS.map((tab) => {
          const isActive = primaryTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onPrimaryTab(tab.id)}
              style={styles.primaryTabWrap}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.primaryTabText,
                  { color: isActive ? colors.text : colors.text2, fontWeight: isActive ? '700' : '600' },
                ]}
              >
                {tab.label}
              </Text>
              <View
                style={[
                  styles.underline,
                  { backgroundColor: isActive ? colors.primary : 'transparent', marginTop: 6 },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {secondaryConfig !== null && (
        <>
          <View style={[styles.sectionDivider, { backgroundColor: colors.divider }]} />
          <MarketsSecondaryTabs
            tabs={secondaryConfig.tabs}
            activeTab={secondaryTab}
            onTabPress={onSecondaryTab}
            showEditIcon={secondaryConfig.showEditIcon}
            editMenuOptions={secondaryConfig.showEditIcon ? FAVORITES_EDIT_MENU_OPTIONS : undefined}
            onEditOptionSelect={onEditOptionSelect}
          />
        </>
      )}
    </View>
  );
}
