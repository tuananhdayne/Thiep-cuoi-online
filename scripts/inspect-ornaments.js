const fs = require('fs');

async function inspect(slug) {
  try {
    const res = await fetch(`https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    console.log(`=== ${slug} (status: ${res.status}) ===`);
    if (!res.ok) return;
    const html = await res.text();
    fs.writeFileSync(`scripts/${slug}.html`, html, 'utf8');

    // Find all images
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
    const ornamentImgs = imgMatches.filter(url => !url.includes('unsplash') && !url.includes('images.pexels') && !url.includes('avatar'));
    console.log('Ornament / asset images:', ornamentImgs);

    // Find all background urls
    const urls = [...html.matchAll(/url\((?:'|")?([^'")]+)(?:'|")?\)/gi)].map(m => m[1]);
    console.log('Background URLs:', urls);

    // Find SVGs or classes related to pattern, ornament, flower, border, frame, corner
    const classes = [...html.matchAll(/class=["']([^"']*(?:pattern|flower|ornament|border|frame|corner|motif|decor|divider|texture|art|bg-)[^"']*)["']/gi)].map(m => m[1]);
    console.log('Decor classes:', [...new Set(classes)].slice(0, 15));

    // Look for SVG icons or elements
    const svgs = html.match(/<svg[\s\S]*?<\/svg>/gi) || [];
    console.log('Total SVGs found:', svgs.length);
  } catch (err) {
    console.error(slug, 'error:', err.message);
  }
}

async function main() {
  await inspect('song-hy-v2-do');
  await inspect('vuon-xuan-xanh');
  await inspect('to-duyen-hong');
  await inspect('baroque-v2-do-dam');
}

main();
