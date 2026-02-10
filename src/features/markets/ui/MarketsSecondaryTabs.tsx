import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../../app/providers/ThemeProvider';
import type { SecondaryTabConfig } from './MarketsScreen.constants';
import { styles } from './MarketsScreen.styles';

type Props = {
  tabs: SecondaryTabConfig[];
  activeTab: string;
  onTabPress: (id: string) => void;
  showEditIcon?: boolean;
  editMenuOptions?: readonly { id: string; label: string }[];
  onEditOptionSelect?: (id: string) => void;
};

export function MarketsSecondaryTabs({
  tabs,
  activeTab,
  onTabPress,
  showEditIcon,
  editMenuOptions,
  onEditOptionSelect,
}: Props): React.JSX.Element {
  const { colors, spacing } = useTheme();
  const [editMenuVisible, setEditMenuVisible] = useState(false);

  const handleEditPress = () => setEditMenuVisible(true);
  const handleEditOption = (id: string) => {
    onEditOptionSelect?.(id);
    setEditMenuVisible(false);
  };

  return (
    <>
      <View style={styles.secondaryTabsRowWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.secondaryTabsScroll}
          contentContainerStyle={[styles.secondaryTabsRow, { paddingRight: showEditIcon ? 8 : spacing.sm }]}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => onTabPress(tab.id)}
                style={styles.secondaryTabWrap}
              >
                <Text
                  style={[
                    styles.secondaryTabText,
                    {
                      color: isActive ? colors.text : colors.text2,
                      fontWeight: isActive ? '700' : '600',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {showEditIcon && editMenuOptions && (
          <TouchableOpacity
            onPress={handleEditPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.secondaryEditIcon}
          >
            <Ionicons name="create-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        visible={editMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditMenuVisible(false)}
      >
        <Pressable
          style={styles.editMenuBackdrop}
          onPress={() => setEditMenuVisible(false)}
        >
          <View style={[styles.editMenuBox, { backgroundColor: colors.card }]}>
            {editMenuOptions?.map((opt, index) => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.editMenuItem,
                  index < (editMenuOptions?.length ?? 0) - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.divider,
                  },
                ]}
                onPress={() => handleEditOption(opt.id)}
              >
                <Text style={[styles.editMenuLabel, { color: colors.text }]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
