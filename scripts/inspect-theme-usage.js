const fs = require('fs');

function inspectThemeUsage(slug) {
  const file = `scripts/${slug}_raw.html`;
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');

  console.log(`\n=================== ${slug} ===================`);
  
  // Find all elements containing /images/themes/ or /images/envelope/
  const regex = /<([a-z0-9]+)[^>]*(?:src|style)=["'][^"']*(?:\/images\/themes\/|\/images\/envelope\/)[^"']*["'][^>]*>/gi;
  const matches = [...html.matchAll(regex)].map(m => m[0]);
  console.log(`Found ${matches.length} decoration elements:`);
  matches.forEach(m => console.log('  ->', m.slice(0, 160)));
}

inspectThemeUsage('song-hy-v2-do');
inspectThemeUsage('baroque-v2-do-dam');
inspectThemeUsage('minimalism-do-dam');
inspectThemeUsage('to-duyen-hong');
inspectThemeUsage('lien-hoa-v2-xanh');
