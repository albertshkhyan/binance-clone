import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'dark' | 'light';
type Currency = 'usd' | 'eur';

type SettingsState = {
  theme: ThemeMode;
  currency: Currency;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  setCurrency: (c: Currency) => void;
  hydrate: () => Promise<void>;
};

const STORAGE_KEY = 'settings:v1';

function persist(state: Pick<SettingsState, 'theme' | 'currency'>): void {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: 'dark',
  currency: 'usd',

  setTheme: (theme) => {
    set({ theme });
    persist({ ...get(), theme });
  },

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },

  setCurrency: (currency) => {
    set({ currency });
    persist({ ...get(), currency });
  },

  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<SettingsState>;
      set({
        theme: parsed.theme ?? 'dark',
        currency: parsed.currency ?? 'usd',
      });
    } catch {
      // ignore
    }
  },
}));
