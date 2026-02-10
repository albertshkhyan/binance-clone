import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProviders } from './src/app/providers';
import { RootNavigator } from './src/app/navigation';

export default function App(): React.JSX.Element {
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar style="light" />
    </AppProviders>
  );
}
