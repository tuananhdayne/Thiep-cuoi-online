const fs = require('fs');

const content = fs.readFileSync('scripts/lien-hoa-v2-xanh_raw.html', 'utf8');

// Find occurrences of translateY or reveal
let pos = 0;
while ((pos = content.indexOf('translateY', pos)) !== -1) {
  console.log('--- translateY snippet ---');
  console.log(content.substring(Math.max(0, pos - 150), Math.min(content.length, pos + 250)));
  pos += 10;
}

// Find occurrences of reveal
pos = 0;
while ((pos = content.indexOf('reveal', pos)) !== -1) {
  console.log('--- reveal snippet ---');
  console.log(content.substring(Math.max(0, pos - 100), Math.min(content.length, pos + 200)));
  pos += 6;
}
