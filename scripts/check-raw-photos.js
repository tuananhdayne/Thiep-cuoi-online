const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('scripts').filter(f => f.endsWith('_raw.html'));

const allPhotos = new Set();
for (const f of files) {
  const content = fs.readFileSync(path.join('scripts', f), 'utf8');
  const matches = content.match(/https:\/\/[^"'\s)]+\.(?:webp|jpg|jpeg|png)/gi);
  if (matches) {
    for (const m of matches) {
      if (m.includes('photo-library') || m.includes('unsplash') || m.includes('wedding')) {
        allPhotos.add(m);
      }
    }
  }
}

console.log('Found photo library images:', Array.from(allPhotos));
