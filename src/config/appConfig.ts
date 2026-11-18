import Constants from 'expo-constants';
import { env } from './env';

export const appConfig = {
  // app.json / app.config.ts la irukkura values
  appName: Constants.expoConfig?.name ?? 'TodoApp',
  version: Constants.expoConfig?.version ?? '1.0.0',

  // App-wide settings
  requestTimeoutMs: 15000,

  // Feature flags: environment padi on / off
  features: {
    enableAnalytics: env.isProd,   // production la mattum
    showDebugBanner: env.isDev,    // development la mattum
  },
} as const;