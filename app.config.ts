import { ExpoConfig, ConfigContext } from 'expo/config';

type AppEnv = 'development' | 'staging' | 'production';

const APP_ENV = (process.env.EXPO_PUBLIC_APP_ENV ?? 'development') as AppEnv;

const NAMES: Record<AppEnv, string> = {
  development: 'TodoApp (Dev)',
  staging: 'TodoApp (Stg)',
  production: 'TodoApp',
};

// "yourname" ah ungal peyar ku maathunga (small letters, space illa)
const IDS: Record<AppEnv, string> = {
  development: 'com.yourname.todoapp.dev',
  staging: 'com.yourname.todoapp.stg',
  production: 'com.yourname.todoapp',
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: NAMES[APP_ENV],
  slug: config.slug ?? 'todo-app',
  ios: { ...config.ios, bundleIdentifier: IDS[APP_ENV] },
  android: { ...config.android, package: IDS[APP_ENV] },
  extra: { ...config.extra, appEnv: APP_ENV },
});