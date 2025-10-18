const report = require('./lighthouse-full-report.json');

console.log('═══════════════════════════════════════');
console.log('   LIGHTHOUSE FULL AUDIT');
console.log('═══════════════════════════════════════');
console.log('');

// Category scores
console.log('CATEGORY SCORES:');
console.log('───────────────────────────────────────');
Object.entries(report.categories).forEach(([key, cat]) => {
  const score = (cat.score * 100).toFixed(1);
  const emoji = cat.score >= 0.9 ? '✅' : cat.score >= 0.5 ? '⚠️' : '❌';
  console.log(`${emoji} ${cat.title}: ${score}%`);
});

console.log('');
console.log('PERFORMANCE METRICS:');
console.log('───────────────────────────────────────');
const metrics = report.audits['metrics'].details.items[0];
console.log(`  First Contentful Paint: ${metrics.firstContentfulPaint}ms`);
console.log(`  Largest Contentful Paint: ${metrics.largestContentfulPaint}ms`);
console.log(`  Total Blocking Time: ${metrics.totalBlockingTime}ms`);
console.log(`  Cumulative Layout Shift: ${metrics.cumulativeLayoutShift}`);
console.log(`  Speed Index: ${metrics.speedIndex}ms`);
console.log(`  Time to Interactive: ${metrics.interactive}ms`);

console.log('');
console.log('═══════════════════════════════════════');
