/** Sortable columns in table header (Name/Vol, Last Price, 24h chg%). */
export type SortField = 'market_cap' | 'price' | 'change_24h';
export type SortDirection = 'asc' | 'desc';

/** Legacy alias for useFilteredMarkets. */
export type SortOption = SortField;

export const VS_CURRENCY = 'usd';
export const PER_PAGE = 100;
export const PAGE = 1;

export const PRIMARY_TABS = [
  { id: 'favorites', label: 'Favorites' },
  { id: 'market', label: 'Market' },
  { id: 'alpha', label: 'Alpha' },
  { id: 'grow', label: 'Grow' },
  { id: 'square', label: 'Square' },
  { id: 'data', label: 'Data' },
] as const;

export type PrimaryTabId = (typeof PRIMARY_TABS)[number]['id'];

export type SecondaryTabConfig = { id: string; label: string };

export type SecondaryTabsConfig = {
  tabs: SecondaryTabConfig[];
  showEditIcon?: boolean;
};

/** Secondary tabs per primary tab. null = no secondary row (Grow, Data). */
export const SECONDARY_TABS_BY_PRIMARY: Record<
  PrimaryTabId,
  SecondaryTabsConfig | null
> = {
  favorites: {
    tabs: [
      { id: 'all', label: 'All' },
      { id: 'holding', label: 'Holding' },
      { id: 'spot', label: 'Spot' },
      { id: 'futured', label: 'Futured' },
    ],
    showEditIcon: true,
  },
  market: {
    tabs: [
      { id: 'crypto', label: 'Crypto' },
      { id: 'spot', label: 'Spot' },
      { id: 'usdm', label: 'USDⓈ-M' },
      { id: 'coinm', label: 'COIN-M' },
      { id: 'options', label: 'Options' },
    ],
  },
  alpha: {
    tabs: [
      { id: 'all', label: 'All' },
      { id: 'point_plus', label: 'Point+' },
      { id: 'bsc', label: 'BSC' },
      { id: 'ethereum', label: 'Ethereum' },
      { id: 'solana', label: 'Solana' },
      { id: 'base', label: 'Base' },
      { id: 'arbitrum', label: 'Arbitrum' },
      { id: 'sonic', label: 'Sonic' },
    ],
  },
  grow: null,
  square: {
    tabs: [
      { id: 'discover', label: 'Discover' },
      { id: 'following', label: 'Following' },
      { id: 'hot', label: 'Hot' },
      { id: 'news', label: 'News' },
      { id: 'academy', label: 'Academy' },
      { id: 'live', label: 'Live' },
    ],
  },
  data: null,
};

export const FAVORITES_EDIT_MENU_OPTIONS = [
  { id: 'edit_favorites', label: 'Edit favorites' },
  { id: 'new_group', label: 'New Group' },
  { id: 'manage_groups', label: 'Manage Groups' },
] as const;

/** Chips for Crypto / Spot (quote currency selection). */
export const CHIPS = ['USDC', 'USDT', 'U', 'USD1', 'USD', 'BNB', 'BTC', 'ALTS▾', 'F'];

/** USDⓈ-M tab: category chips + "All" dropdown (same modal UI as Options). */
export const USDM_CHIPS = ['All', 'Monthly new', 'TradFi', 'Pre-Market', 'USDC', 'China'];
export const USDM_DROPDOWN_TITLE = 'Choose category';

/** COIN-M tab: category chips + "All" dropdown (same modal UI). */
export const COINM_CHIPS = ['All', 'Monthly new', 'AI', 'Layer-1', 'Layer-2', 'Gaming'];
export const COINM_DROPDOWN_TITLE = 'Choose category';

/** Options tab: underlying chips (images 1–2) + "All" expiry dropdown. */
export const OPTIONS_UNDERLYING_CHIPS = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'DOGE'];
export const OPTIONS_EXPIRY_LABEL = 'All';
export const OPTIONS_EXPIRIES = [
  'All',
  '2026-02-10',
  '2026-02-11',
  '2026-02-12',
  '2026-02-13',
  '2026-02-20',
  '2026-02-27',
  '2026-04-21',
  '2026-06-26',
  '2026-09-25',
  '2026-12-25',
];

export type MarketSecondaryId = 'crypto' | 'spot' | 'usdm' | 'coinm' | 'options';

/** Same dropdown + modal UI for all: chips + "All" (or value) + chevron → modal with title, list, Cancel, Confirm. */
export type MarketChipsConfig =
  | {
      type: 'chips';
      chips: readonly string[];
      dropdownModalTitle?: string;
      dropdownOptions?: readonly string[];
    }
  | {
      type: 'options';
      underlyingChips: readonly string[];
      dropdownModalTitle: string;
      dropdownOptions: readonly string[];
    };

export const MARKET_CHIPS_CONFIG: Record<MarketSecondaryId, MarketChipsConfig> = {
  crypto: { type: 'chips', chips: CHIPS },
  spot: { type: 'chips', chips: CHIPS },
  usdm: {
    type: 'chips',
    chips: USDM_CHIPS,
    dropdownModalTitle: USDM_DROPDOWN_TITLE,
    dropdownOptions: USDM_CHIPS,
  },
  coinm: {
    type: 'chips',
    chips: COINM_CHIPS,
    dropdownModalTitle: COINM_DROPDOWN_TITLE,
    dropdownOptions: COINM_CHIPS,
  },
  options: {
    type: 'options',
    underlyingChips: OPTIONS_UNDERLYING_CHIPS,
    dropdownModalTitle: 'Choose Expiry',
    dropdownOptions: OPTIONS_EXPIRIES,
  },
};
