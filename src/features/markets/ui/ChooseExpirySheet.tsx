import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ChooseExpirySheet.styles';

const TITLE = 'Choose Expiry';
const CANCEL_LABEL = 'Cancel';
const CONFIRM_LABEL = 'Confirm';

const SHEET_HEIGHT_RATIO = 0.45;

type Props = {
  visible: boolean;
  selectedExpiry: string;
  options: readonly string[];
  onConfirm: (expiry: string) => void;
  onCancel: () => void;
};

/**
 * Non-draggable bottom sheet for expiry selection.
 * Draft pattern: draftExpiry is local; Cancel discards, Confirm commits selectedExpiry = draftExpiry.
 * Backdrop tap closes and discards (same as Cancel).
 */
export function ChooseExpirySheet({
  visible,
  selectedExpiry,
  options,
  onConfirm,
  onCancel,
}: Props): React.JSX.Element {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const [draftExpiry, setDraftExpiry] = useState(selectedExpiry);

  const sheetHeight =
    Dimensions.get('window').height * SHEET_HEIGHT_RATIO + insets.bottom;

  // When sheet opens, sync draft to current selected value.
  useEffect(() => {
    if (visible) {
      setDraftExpiry(selectedExpiry);
    }
  }, [visible, selectedExpiry]);

  const handleConfirm = () => {
    onConfirm(draftExpiry);
    onCancel();
  };

  const optionList = [...options];

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      {/* Backdrop: tap to close (discard draft). Sheet content prevents tap from closing. */}
      <Pressable
        style={[styles.backdrop, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
        onPress={onCancel}
      >
        <TouchableWithoutFeedback>
          <View
            style={[
            styles.sheet,
            {
              backgroundColor: colors.card,
              height: sheetHeight,
              paddingBottom: insets.bottom,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          ]}
        >
          {/* Title */}
          <View
            style={[
              styles.titleRow,
              { borderBottomColor: colors.divider },
            ]}
          >
            <Text
              style={[typography.h1, { color: colors.text }]}
              numberOfLines={1}
            >
              {TITLE}
            </Text>
          </View>

          {/* Picker list (wheel-style: flat list, single select) */}
          <View style={styles.pickerContainer}>
            <FlatList
              data={optionList}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerItem,
                    {
                      backgroundColor:
                        draftExpiry === item
                          ? colors.chipActiveBg
                          : 'transparent',
                    },
                  ]}
                  onPress={() => setDraftExpiry(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      typography.body,
                      {
                        color: colors.text,
                        fontWeight: draftExpiry === item ? '700' : '600',
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Sticky footer: Cancel + Confirm */}
          <View
            style={[
              styles.footer,
              {
                borderTopColor: colors.divider,
                paddingBottom: Math.max(insets.bottom, 8),
              },
            ]}
          >
            <Pressable
              style={[styles.footerButton, { backgroundColor: colors.surface }]}
              onPress={onCancel}
            >
              <Text style={[typography.body, { color: colors.text }]}>
                {CANCEL_LABEL}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.footerButton, { backgroundColor: colors.primary }]}
              onPress={handleConfirm}
            >
              <Text
                style={[typography.body, { color: colors.onPrimary }]}
              >
                {CONFIRM_LABEL}
              </Text>
            </Pressable>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}
