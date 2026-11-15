const fs = require('fs');

const html = fs.readFileSync('scripts/lien-hoa-v2-xanh_raw.html', 'utf8');

// Find all occurrences of flower in lien-hoa-v2-green
const matches = [...html.matchAll(/(<[^>]+(?:flower|medallion|paper-texture)[^>]+>)/g)];
console.log(`Found ${matches.length} elements:`);
for (const m of matches) {
  console.log('---');
  console.log(m[0]);
}
