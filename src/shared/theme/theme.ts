import { colors, radii, spacing, typography } from './tokens';

export type ThemeName = 'dark' | 'light';

export type Theme = {
  name: ThemeName;
  colors: typeof colors;
  radii: typeof radii;
  spacing: typeof spacing;
  typography: typeof typography;
};

export const darkTheme: Theme = {
  name: 'dark',
  colors,
  radii,
  spacing,
  typography,
};

export const lightTheme: Theme = {
  ...darkTheme,
  name: 'light',
  colors: {
    ...colors,
    bg: '#F7F9FC',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    card2: '#F1F5FA',
    text: '#0B1220',
    text2: 'rgba(11,18,32,0.72)',
    text3: 'rgba(11,18,32,0.45)',
    border: 'rgba(11,18,32,0.08)',
    onPrimary: '#0B0F14',
  },
};
