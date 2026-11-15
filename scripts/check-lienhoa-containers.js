const fs = require('fs');

const html = fs.readFileSync('scripts/lien-hoa-v2-xanh_raw.html', 'utf8');

// Find sections and their flower tags
const sections = [...html.matchAll(/<(?:section|header|div)[^>]*(?:id|class)=["']([^"']*)["'][^>]*>([\s\S]*?)<\/(?:section|header|div)>/gi)];

for (const m of sections) {
  const content = m[2];
  if (content.includes('/images/themes/lien-hoa-v2-green/')) {
    const flowers = [...content.matchAll(/<img[^>]+src=["'](\/images\/themes\/lien-hoa-v2-green\/[^"']+)["'][^>]*>/gi)].map(f => f[0]);
    if (flowers.length > 0) {
      console.log('=== CONTAINER class:', m[1].slice(0, 80));
      flowers.forEach(f => console.log('   IMG:', f));
    }
  }
}
