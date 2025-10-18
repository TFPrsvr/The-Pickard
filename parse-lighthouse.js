const report = require('./lighthouse-accessibility-report.json');

console.log('═══════════════════════════════════════');
console.log('   LIGHTHOUSE ACCESSIBILITY AUDIT');
console.log('═══════════════════════════════════════');
console.log('');
console.log('Score:', (report.categories.accessibility.score * 100).toFixed(1) + '%');
console.log('');
console.log('FAILED AUDITS:');
console.log('───────────────────────────────────────');

const failedAudits = Object.entries(report.audits)
  .filter(([k, v]) => v.score !== null && v.score < 1 && v.scoreDisplayMode !== 'notApplicable')
  .map(([k, v]) => ({
    id: k,
    title: v.title,
    description: v.description,
    score: v.score
  }));

if (failedAudits.length === 0) {
  console.log('✅ No failed audits!');
} else {
  failedAudits.forEach((audit, i) => {
    console.log(`${i + 1}. ${audit.title}`);
    console.log(`   Score: ${(audit.score * 100).toFixed(0)}%`);
    console.log(`   ${audit.description.substring(0, 100)}...`);
    console.log('');
  });
}

console.log('');
console.log('MANUAL CHECKS REQUIRED:');
console.log('───────────────────────────────────────');

const manualAudits = Object.entries(report.audits)
  .filter(([k, v]) => v.scoreDisplayMode === 'manual')
  .map(([k, v]) => v.title);

manualAudits.slice(0, 5).forEach((title, i) => {
  console.log(`${i + 1}. ${title}`);
});

console.log('');
console.log('═══════════════════════════════════════');
