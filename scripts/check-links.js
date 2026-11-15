const fs = require('fs');
const html = fs.readFileSync('scripts/lien-hoa-v2-xanh_raw.html', 'utf8');

const linkMatches = html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi);
console.log('CSS links:', linkMatches);

const scriptMatches = html.match(/<script[^>]+src=["'][^"']+["'][^>]*>/gi);
console.log('Script tags:', scriptMatches ? scriptMatches.slice(0, 10) : []);
