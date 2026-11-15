const fs = require('fs');

const html = fs.readFileSync('scripts/lien-hoa-v2-xanh_raw.html', 'utf8');

// Find all css classes or styles
const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
console.log('Found style tags:', styleMatches ? styleMatches.length : 0);
if (styleMatches) {
  for (let i = 0; i < styleMatches.length; i++) {
    const s = styleMatches[i];
    if (s.includes('animation') || s.includes('transition') || s.includes('transform') || s.includes('@keyframes')) {
      console.log(`Style tag ${i}:`, s.substring(0, 500));
    }
  }
}
