#!/usr/bin/env node

/**
 * App Variant Configuration Helper
 * 
 * This script helps generate variant-specific configurations for Green and Orange editions.
 * Run with: node scripts/configure-variant.js [green|orange]
 */

const fs = require('fs');
const path = require('path');

const VARIANTS = {
  green: {
    name: 'WeatherMovies Green',
    bundleId: 'com.company.weathermovies.green',
    primaryColor: '#10B981',
    scheme: 'weathermovies-green',
  },
  orange: {
    name: 'WeatherMovies Orange',
    bundleId: 'com.company.weathermovies.orange',
    primaryColor: '#F97316',
    scheme: 'weathermovies-orange',
  },
};

const variant = process.argv[2];

if (!variant || !VARIANTS[variant]) {
  console.error('Usage: node scripts/configure-variant.js [green|orange]');
  process.exit(1);
}

const config = VARIANTS[variant];

console.log(`\n🎨 Configuring ${config.name}...\n`);
console.log(`Bundle ID: ${config.bundleId}`);
console.log(`Primary Color: ${config.primaryColor}`);
console.log(`Scheme: ${config.scheme}`);
console.log('\n✅ Configuration ready!\n');

console.log('Next steps:');
console.log(`1. Build: eas build --platform android --profile ${variant}`);
console.log(`2. Or: eas build --platform ios --profile ${variant}`);
console.log(`3. Update: eas update --branch ${variant} --message "Your message"\n`);
