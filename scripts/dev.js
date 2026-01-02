#!/usr/bin/env node

/**
 * Development helper for white label variants
 * Usage: 
 *   node scripts/dev.js green
 *   node scripts/dev.js orange android
 *   node scripts/dev.js orange ios
 */

const { spawn } = require('child_process');

const variant = process.argv[2];
const platform = process.argv[3]; // optional: android, ios, web

if (!variant) {
  console.error('❌ Please specify a variant: node scripts/dev.js <variant> [platform]');
  console.log('\nExamples:');
  console.log('  node scripts/dev.js green');
  console.log('  node scripts/dev.js orange android');
  console.log('  node scripts/dev.js blue ios');
  process.exit(1);
}

const platformFlag = platform ? `--${platform}` : '';

console.log(`🚀 Starting ${variant} variant${platform ? ` on ${platform}` : ''}...\n`);

const args = ['start', platformFlag].filter(Boolean);

const child = spawn('npx', ['expo', ...args], {
  stdio: 'inherit',
  env: {
    ...process.env,
    APP_VARIANT: variant,
  },
});

child.on('exit', (code) => {
  process.exit(code);
});
