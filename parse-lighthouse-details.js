const report = require('./lighthouse-full-report.json');

console.log('═══════════════════════════════════════');
console.log('   DETAILED AUDIT RESULTS');
console.log('═══════════════════════════════════════');
console.log('');

// Category scores
console.log('SCORES:');
console.log('───────────────────────────────────────');
Object.entries(report.categories).forEach(([key, cat]) => {
  const score = (cat.score * 100).toFixed(1);
  const emoji = cat.score >= 0.9 ? '✅' : cat.score >= 0.5 ? '⚠️' : '❌';
  console.log(`${emoji} ${cat.title}: ${score}%`);
});

// Performance issues
console.log('');
console.log('PERFORMANCE ISSUES:');
console.log('───────────────────────────────────────');

const perfAudits = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'speed-index',
  'interactive',
  'render-blocking-resources',
  'unused-javascript',
  'unused-css-rules'
];

perfAudits.forEach(auditId => {
  const audit = report.audits[auditId];
  if (audit && audit.score !== null && audit.score < 0.9) {
    console.log(`⚠️ ${audit.title}`);
    if (audit.displayValue) {
      console.log(`   ${audit.displayValue}`);
    }
  }
});

// Best Practices issues
console.log('');
console.log('BEST PRACTICES ISSUES:');
console.log('───────────────────────────────────────');

const bpFailed = Object.entries(report.audits)
  .filter(([id, audit]) => {
    return report.categories['best-practices'].auditRefs.some(ref => ref.id === id) &&
           audit.score !== null &&
           audit.score < 1;
  })
  .map(([id, audit]) => audit.title);

if (bpFailed.length > 0) {
  bpFailed.forEach(title => console.log(`⚠️ ${title}`));
} else {
  console.log('✅ All checks passed');
}

// SEO issues
console.log('');
console.log('SEO ISSUES:');
console.log('───────────────────────────────────────');

const seoFailed = Object.entries(report.audits)
  .filter(([id, audit]) => {
    return report.categories['seo'].auditRefs.some(ref => ref.id === id) &&
           audit.score !== null &&
           audit.score < 1;
  })
  .map(([id, audit]) => audit.title);

if (seoFailed.length > 0) {
  seoFailed.forEach(title => console.log(`⚠️ ${title}`));
} else {
  console.log('✅ All checks passed');
}

console.log('');
console.log('═══════════════════════════════════════');
