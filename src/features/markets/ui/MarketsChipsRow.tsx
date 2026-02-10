import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { Chip } from '../../../shared/ui/Chip';
import { SkeletonChip } from '../../../shared/ui/SkeletonChip';
import {
  MARKET_CHIPS_CONFIG,
  type MarketSecondaryId,
} from './MarketsScreen.constants';
import { styles } from './MarketsScreen.styles';
import { ExpiryFilterButton } from './ExpiryFilterButton';
import { ChooseExpirySheet } from './ChooseExpirySheet';

const CONFIRM_LABEL = 'Confirm';
const CANCEL_LABEL = 'Cancel';

type Props = {
  marketSecondaryTab: string;
  activeChip: string;
  onChipPress: (id: string) => void;
  isLoading: boolean;
  /** Selected value for the "All" dropdown; same modal UI for Options, USDⓈ-M, COIN-M. */
  dropdownValue: string;
  onDropdownSelect: (value: string) => void;
};

function isMarketSecondaryId(id: string): id is MarketSecondaryId {
  return ['crypto', 'spot', 'usdm', 'coinm', 'options'].includes(id);
}

/** Shared modal: title, list, Cancel, Confirm. Used for Choose Expiry and Choose category. */
function ChoiceModal({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}): React.JSX.Element {
  const { colors, typography } = useTheme();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.editMenuBackdrop} onPress={onCancel}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.chooseExpiryModalBox,
            { backgroundColor: colors.card },
          ]}
        >
          <View
            style={[
              styles.chooseExpiryTitle,
              { borderBottomWidth: 1, borderBottomColor: colors.divider },
            ]}
          >
            <Text
              style={[typography.h1, { color: colors.text, textAlign: 'center' }]}
            >
              {title}
            </Text>
          </View>
          <View style={styles.chooseExpiryList}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.editMenuItem,
                    selectedValue === item && {
                      backgroundColor: colors.chipActiveBg,
                    },
                  ]}
                  onPress={() => onSelect(item)}
                >
                  <Text
                    style={[styles.editMenuLabel, { color: colors.text }]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.chooseExpiryButtonsRow}>
            <Pressable
              style={[
                styles.chooseExpiryButton,
                { backgroundColor: colors.surface },
              ]}
              onPress={onCancel}
            >
              <Text style={[typography.body, { color: colors.text }]}>
                {CANCEL_LABEL}
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.chooseExpiryButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={onConfirm}
            >
              <Text
                style={[typography.body, { color: colors.onPrimary }]}
              >
                {CONFIRM_LABEL}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function MarketsChipsRow({
  marketSecondaryTab,
  activeChip,
  onChipPress,
  isLoading,
  dropdownValue,
  onDropdownSelect,
}: Props): React.JSX.Element {
  const { colors, spacing, typography } = useTheme();
  const config = isMarketSecondaryId(marketSecondaryTab)
    ? MARKET_CHIPS_CONFIG[marketSecondaryTab]
    : null;

  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(dropdownValue);

  if (config == null) return <></>;

  const openModal = () => {
    setTempValue(dropdownValue);
    setModalVisible(true);
  };
  const confirmModal = () => {
    onDropdownSelect(tempValue);
    setModalVisible(false);
  };

  if (config.type === 'options') {
    const chips = [...config.underlyingChips];
    return (
      <>
        <View style={styles.chipsScroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.chipsRowWithFilter,
              { gap: 8, paddingRight: spacing.sm },
            ]}
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonChip key={i} />
                ))
              : chips.map((chip) => (
                  <Chip
                    key={chip}
                    label={chip}
                    active={activeChip === chip}
                    onPress={() => onChipPress(chip)}
                  />
                ))}
            <ExpiryFilterButton
              label={dropdownValue}
              onPress={openModal}
            />
          </ScrollView>
        </View>
        <ChooseExpirySheet
          visible={modalVisible}
          selectedExpiry={dropdownValue}
          options={config.dropdownOptions}
          onConfirm={(expiry) => {
            onDropdownSelect(expiry);
            setModalVisible(false);
          }}
          onCancel={() => setModalVisible(false)}
        />
      </>
    );
  }

  const chips = [...config.chips];
  const hasDropdown =
    config.dropdownModalTitle != null && config.dropdownOptions != null;

  return (
    <>
      <View style={styles.chipsScroll}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            hasDropdown ? styles.chipsRowWithFilter : styles.chipsRow,
            { gap: 8, paddingRight: spacing.sm },
          ]}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <SkeletonChip key={i} />
              ))
            : chips.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  active={activeChip === chip}
                  onPress={() => onChipPress(chip)}
                />
              ))}
          {hasDropdown && (
            <TouchableOpacity
              style={[
                styles.expiryDropdownButton,
                { backgroundColor: colors.surface },
              ]}
              onPress={openModal}
            >
              <Text style={[typography.body, { color: colors.text }]}>
                {dropdownValue}
              </Text>
              <Ionicons name="chevron-down" size={18} color={colors.text3} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      {hasDropdown && (
        <ChoiceModal
          visible={modalVisible}
          title={config.dropdownModalTitle!}
          options={[...config.dropdownOptions!]}
          selectedValue={tempValue}
          onSelect={setTempValue}
          onConfirm={confirmModal}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </>
  );
}
