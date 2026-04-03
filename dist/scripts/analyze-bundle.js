const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size...');

try {
  // Check if .next directory exists
  if (!fs.existsSync('.next')) {
    console.log('⚠️  .next directory not found. Building project first...');
    execSync('npm run build', { stdio: 'inherit' });
  }
  
  // Install bundle analyzer if not present
  try {
    execSync('npx @next/bundle-analyzer --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('📦 Installing bundle analyzer...');
    execSync('npm install --save-dev @next/bundle-analyzer', { stdio: 'inherit' });
  }
  
  // Run bundle analyzer
  console.log('📊 Starting bundle analysis...');
  execSync('npx @next/bundle-analyzer .next/static/chunks', { stdio: 'inherit' });
  
  console.log('✅ Bundle analysis complete! Check the browser for detailed report.');
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  console.log('💡 Try running: npm run build && npx @next/bundle-analyzer .next/static/chunks');
  process.exit(1);
}
