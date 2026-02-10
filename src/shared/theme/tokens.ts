/**
 * Design tokens — 4px grid, 8/12/16/24 spacing rhythm.
 * Typography: System (iOS SF) / Roboto (Android). No custom fonts for MVP.
 */

export const colors = {
  bg: '#0F1720',
  surface: '#141E28',
  card: '#172330',
  card2: '#1A2938',
  border: 'rgba(255,255,255,0.06)',

  // Primary ~90% white, secondary ~65–70%, tertiary ~45%
  text: 'rgba(231,238,247,0.9)',
  text2: 'rgba(231,238,247,0.68)',
  text3: 'rgba(231,238,247,0.45)',

  primary: '#F9B600',
  primaryPressed: '#E0A500',
  onPrimary: '#0B0F14',

  green: '#2ECC71',
  red: '#FF4D57',
  warning: '#F5C542',

  up: '#1FC77E',
  down: '#FF4D57',
  neutral: '#7B8794',

  upBg: 'rgba(31,199,126,0.18)',
  downBg: 'rgba(255,77,87,0.18)',
  neutralBg: 'rgba(123,135,148,0.22)',

  chipBg: 'rgba(231,238,247,0.06)',
  chipActiveBg: 'rgba(231,238,247,0.12)',
  chipText: 'rgba(231,238,247,0.70)',
  chipActiveText: 'rgba(231,238,247,0.9)',

  divider: 'rgba(255,255,255,0.06)',

  icon: 'rgba(231,238,247,0.85)',
  iconMuted: 'rgba(231,238,247,0.55)',
};

/** 8 → micro, 12 → text-to-text, 16 → section padding, 24 → major separation */
export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
};

export const radii = {
  sm: 8,
  md: 10,
  lg: 14,
  xl: 16,
  pill: 22,
};

export const typography = {
  h1: { fontSize: 18, fontWeight: '700' as const },
  h2: { fontSize: 16, fontWeight: '700' as const },
  body: { fontSize: 14, fontWeight: '600' as const },
  sub: { fontSize: 12, fontWeight: '600' as const },
  tiny: { fontSize: 11, fontWeight: '600' as const },
  tabPrimary: { fontSize: 14, fontWeight: '700' as const },
  tabSecondary: { fontSize: 13, fontWeight: '700' as const },
  badge: { fontSize: 13, fontWeight: '700' as const },
};
