/**
 * White Label App Configuration
 * Supports Green and Orange variants with different bundle IDs
 */

const VARIANTS = {
  green: {
    name: 'WeatherMovies Green',
    bundleId: 'com.birat077.myweathermovies.green',
    scheme: 'myweathermovies-green',
    primaryColor: '#10B981',
    icon: './assets/images/green/icon.png',
    adaptiveIcon: './assets/images/green/adaptive-icon.png',
    splash: './assets/images/green/splash-icon.png',
    backgroundColor: '#ffffff',
  },
  orange: {
    name: 'WeatherMovies Orange',
    bundleId: 'com.birat077.myweathermovies.orange',
    scheme: 'myweathermovies-orange',
    primaryColor: '#F97316',
    icon: './assets/images/orange/icon.png',
    adaptiveIcon: './assets/images/orange/adaptive-icon.png',
    splash: './assets/images/orange/splash-icon.png',
    backgroundColor: '#ffffff',
  },
};

// Get variant from environment variable or EAS build profile
// EAS_BUILD_PROFILE is available during EAS builds
const variant = process.env.APP_VARIANT || process.env.EAS_BUILD_PROFILE || 'green';
const config = VARIANTS[variant];

// Debug logging
console.log('=================================');
console.log('🔍 Build Environment:');
console.log('  APP_VARIANT:', process.env.APP_VARIANT);
console.log('  EAS_BUILD_PROFILE:', process.env.EAS_BUILD_PROFILE);
console.log('  Selected variant:', variant);
console.log('  Config name:', config?.name);
console.log('  Bundle ID:', config?.bundleId);
console.log('=================================');

if (!config) {
  throw new Error(`Unknown variant: ${variant}. Available: ${Object.keys(VARIANTS).join(', ')}`);
}

console.log(`📱 Building ${config.name} (${config.bundleId})`);

module.exports = {
  expo: {
    name: config.name,
    slug: 'my-weather-movies',
    version: '1.0.0',
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: 'https://u.expo.dev/6e4d6821-b4d5-4939-ba41-3e8f469bf356',
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 0,
    },
    orientation: 'portrait',
    icon: config.icon,
    scheme: config.scheme,
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: config.splash,
      resizeMode: 'contain',
      backgroundColor: config.backgroundColor,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: config.bundleId,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: config.adaptiveIcon,
        backgroundColor: config.backgroundColor,
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: config.bundleId,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router', 'expo-secure-store'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: '6e4d6821-b4d5-4939-ba41-3e8f469bf356',
      },
      // Make variant info available at runtime
      variant: variant,
      primaryColor: config.primaryColor,
    },
  },
};
