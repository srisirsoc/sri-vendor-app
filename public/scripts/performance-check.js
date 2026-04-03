const { execSync } = require('child_process');
const fs = require('fs');

console.log('Checking Srisir Performance...\n');

// Check if .next directory exists
if (!fs.existsSync('.next')) {
  console.log('No build found. Building project first...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

// Check bundle sizes
console.log('Analyzing bundle sizes...');
try {
  const buildStats = fs.readFileSync('.next/build-manifest.json', 'utf8');
  const stats = JSON.parse(buildStats);

  let totalSize = 0;
  let jsFiles = 0;

  Object.keys(stats.pages).forEach(page => {
    const files = stats.pages[page];
    files.forEach(file => {
      if (file.endsWith('.js')) {
        jsFiles++;
        totalSize += 50; // KB estimate
      }
    });
  });

  console.log(`Bundle Analysis:`);
  console.log(`\nJavaScript files: ${jsFiles}`);
  console.log(`\nEstimated total size: ~${totalSize}KB`);

  if (totalSize > 500) {
    console.log('Bundle size is large. Consider optimizing dependencies.');
  } else {
    console.log('Bundle size looks good!');
  }

} catch (error) {
  console.log('Could not analyze bundle size:', error.message);
}

// Check for image optimizations
console.log('\nChecking image optimizations...');
try {
  const nextConfig = fs.readFileSync('next.config.js', 'utf8');
  if (nextConfig.includes('formats')) {
    console.log('Image optimization is configured');
  } else {
    console.log('Image optimization not fully configured');
  }
} catch (error) {
  console.log('Could not check image configuration');
}

// Check for lazy loading
console.log('\nChecking lazy loading...');
try {
  const homepage = fs.readFileSync('src/components-page/home-page/homepage.view.tsx', 'utf8');
  if (homepage.includes('dynamic(') && homepage.includes('import(')) {
    console.log('Lazy loading is implemented');
  } else {
    console.log('Lazy loading not found in homepage');
  }
} catch (error) {
  console.log('Could not check lazy loading');
}

console.log('Performance Check Complete!');
console.log('\nTo see detailed bundle analysis, run: npm run analyze');
console.log('\nTo run Lighthouse audit, run: npm run lighthouse'); 