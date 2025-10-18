const r = require('./lighthouse-full-report.json');

console.log('═══════════════════════════════════════');
console.log('   PWA INSTALLABILITY CHECK');
console.log('═══════════════════════════════════════');
console.log('');

const pwaAudits = [
  'installable-manifest',
  'service-worker',
  'splash-screen',
  'themed-omnibox',
  'viewport',
  'apple-touch-icon',
  'maskable-icon',
  'content-width'
];

let passing = 0;
let failing = 0;

pwaAudits.forEach(id => {
  const a = r.audits[id];
  if (a) {
    const s = a.score === null ? '⚪' : a.score === 1 ? '✅' : '❌';
    console.log(`${s} ${a.title}`);

    if (a.score !== null && a.score < 1 && a.description) {
      console.log(`   Issue: ${a.description.substring(0, 100)}`);
      failing++;
    } else if (a.score === 1) {
      passing++;
    }
  }
});

console.log('');
console.log('Summary:');
console.log(`  Passing: ${passing}`);
console.log(`  Failing: ${failing}`);
console.log('');
console.log('═══════════════════════════════════════');
