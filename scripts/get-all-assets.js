const fs = require('fs');

const themes = [
  { slug: 'minimalism-do-dam', chungdoi: 'minimalism-do-dam' },
  { slug: 'song-hy-v2-do', chungdoi: 'song-hy-v2-do' },
  { slug: 'vuon-xuan-xanh', chungdoi: 'vuon-xuan-xanh' },
  { slug: 'minimalism-nau', chungdoi: 'minimalism-nau' },
  { slug: 'to-duyen-hong', chungdoi: 'to-duyen-hong' },
  { slug: 'cam-thach-vang', chungdoi: 'cam-thach-vang' },
  { slug: 'minimalism-lam-dam', chungdoi: 'minimalism-lam-dam' },
  { slug: 'minimalism-tim', chungdoi: 'minimalism-tim' },
  { slug: 'baroque-v2-do-dam', chungdoi: 'baroque-v2-do-dam' },
  { slug: 'lien-hoa-v2-xanh', chungdoi: 'lien-hoa-v2-xanh' }
];

async function checkAll() {
  const allAssets = new Set();
  const themeAssets = {};

  for (const t of themes) {
    try {
      const res = await fetch(`https://chungdoi.com/vi/mau-thiep/${t.chungdoi}/demo?open=1`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.log(`Failed ${t.chungdoi}:`, res.status);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(`scripts/${t.slug}_raw.html`, html, 'utf8');

      // Match all /images/themes/... and /images/envelope/...
      const matches = html.match(/\/images\/(?:themes|envelope)\/[a-zA-Z0-9_\-\.\/]+/gi) || [];
      const bgMatches = html.match(/url\(['"]?(\/images\/[^'")]+)['"]?\)/gi) || [];
      const cleanBgs = bgMatches.map(m => m.replace(/url\(['"]?/, '').replace(/['"]?\)/, ''));

      const combined = [...new Set([...matches, ...cleanBgs])];
      themeAssets[t.slug] = combined;
      combined.forEach(a => allAssets.add(a));
      console.log(`Found ${combined.length} assets for ${t.slug}`);
    } catch (e) {
      console.error(t.slug, e.message);
    }
  }

  fs.writeFileSync('scripts/all_theme_assets.json', JSON.stringify({ themeAssets, allList: [...allAssets] }, null, 2));
  console.log('Total unique theme decoration assets:', allAssets.size);
}

checkAll();
