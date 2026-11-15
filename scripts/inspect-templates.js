const fs = require('fs');

async function inspect() {
  try {
    const res = await fetch('https://chungdoi.com/vi/mau-thiep', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi,en;q=0.9'
      }
    });
    console.log('Status:', res.status);
    const html = await res.text();
    fs.writeFileSync('d:/web_cuoi/scripts/mau_thiep.html', html, 'utf8');
    console.log('Saved mau_thiep.html, size:', html.length);

    // Extract links
    const regex = /href="(\/vi\/mau-thiep\/[^"]+)"/g;
    let match;
    const links = new Set();
    while ((match = regex.exec(html)) !== null) {
      links.add(match[1]);
    }
    console.log('Found links:', Array.from(links));
  } catch (err) {
    console.error('Error:', err);
  }
}

inspect();
