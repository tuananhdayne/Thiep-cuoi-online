const fs = require('fs');

const all10 = [
  { id: 'burgundy-romance', source: 'minimalism-do-dam' },
  { id: 'imperial-harmony', source: 'song-hy-v2-do' },
  { id: 'spring-garden', source: 'vuon-xuan-xanh' },
  { id: 'golden-vintage', source: 'minimalism-nau' },
  { id: 'sunset-blush', source: 'to-duyen-hong' },
  { id: 'crystal-luxury', source: 'cam-thach-vang' },
  { id: 'ocean-breeze', source: 'minimalism-lam-dam' },
  { id: 'lavender-dream', source: 'minimalism-tim' },
  { id: 'noir-prestige', source: 'baroque-v2-do-dam' },
  { id: 'lotus-purity', source: 'lien-hoa-v2-xanh' }
];

const results = [];

for (const item of all10) {
  const filePath = 'd:/web_cuoi/scripts/' + item.source + '_open.html';
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');

  // Envelope background from the non-open or open page
  // Let's also check non-open demo if exists
  let envelopeBg = '';
  const nonOpenPath = 'd:/web_cuoi/scripts/' + item.source + '_demo.html';
  let demoHtml = html;
  if (fs.existsSync(nonOpenPath)) {
    demoHtml = fs.readFileSync(nonOpenPath, 'utf8');
  }
  const envMatch = demoHtml.match(/data-landing-screenshot-id="invite-envelope"[^>]*style="([^"]*background:[^"]*)"/i) ||
                   demoHtml.match(/style="([^"]*background:[^"]*)"[^>]*data-landing-screenshot-id="invite-envelope"/i);
  if (envMatch) {
    envelopeBg = envMatch[1];
  }

  // Extract primary colors
  const hexColors = [...new Set(html.match(/#[0-9a-fA-F]{6}\b/g) || [])];
  
  // Find wax seal details
  const waxMatch = html.match(/class="[^"]*seal[^"]*"[^>]*style="([^"]*)"/i);

  // Find container styles
  const containerMatch = html.match(/max-w-\[480px\][^"]*/);

  results.push({
    id: item.id,
    source: item.source,
    envelopeBg: envelopeBg,
    topHexColors: hexColors.slice(0, 10),
    containerMatch: containerMatch ? containerMatch[0] : null
  });
}

fs.writeFileSync('d:/web_cuoi/scripts/palette_summary.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved palette summary!');
