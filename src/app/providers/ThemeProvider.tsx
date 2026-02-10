import React, { createContext, useContext, useMemo } from 'react';
import { darkTheme, lightTheme, type Theme } from '../../shared/theme/theme';
import { useSettingsStore } from '../../features/settings/model/settingsStore';

const ThemeContext = createContext<Theme>(darkTheme);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const themeName = useSettingsStore((s) => s.theme);

  const theme = useMemo(
    () => (themeName === 'dark' ? darkTheme : lightTheme),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
