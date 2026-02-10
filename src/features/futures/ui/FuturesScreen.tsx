import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { ScreenLayout } from '../../../shared/layout';

export function FuturesScreen(): React.JSX.Element {
  const { colors } = useTheme();
  return (
    <ScreenLayout inTabNavigator>
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={[styles.title, { color: colors.text }]}>Futures</Text>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '600' },
});
