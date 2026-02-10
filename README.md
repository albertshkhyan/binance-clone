# Binance MVP

A React Native (Expo) MVP for a Binance-style crypto app: markets list, coin details with chart, and bottom tab navigation (Home, Markets, Trade, Futures, Assets).

## Demo

![App demo](./assets/demo/demo-1th.gif)

## Stack

- **Expo** ~54, **React Native** 0.81, **React** 19
- **React Navigation** (bottom tabs + native stack)
- **TanStack Query** for data
- **Zustand** for client state
- **Lottie** for tab icon animation
- **CoinGecko API** for markets and coin data

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go on device/simulator (or dev build)

## Getting started

```bash
npm install
npm start
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `i` for iOS simulator / `a` for Android emulator.

| Script   | Command                |
|----------|------------------------|
| Start    | `npm start`            |
| iOS      | `npm run ios`          |
| Android  | `npm run android`      |
| Web      | `npm run web`         |

## Project structure

```
src/
├── app/           # Navigation, providers, theme
├── features/      # Home, Markets, Trade, Futures, Assets, Coin details, etc.
└── shared/        # API (CoinGecko), layout, theme, UI components, types
```

Markets data and coin details/charts use the public CoinGecko API. The app is for demonstration only and is not affiliated with Binance.
