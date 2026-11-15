const https = require('https');

function fetchPhotos(query) {
  return new Promise((resolve, reject) => {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=20`;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const results = json.results || [];
          console.log(`Query "${query}" found ${results.length} photos:`);
          const photos = results.map(r => ({
            id: r.id,
            description: r.alt_description || r.description || 'wedding photo',
            url: r.urls.raw + '&auto=format&fit=crop&w=1200&q=85',
            thumb: r.urls.small,
            width: r.width,
            height: r.height,
            isPortrait: r.height > r.width
          }));
          resolve(photos);
        } catch (e) {
          console.error('Parse error:', e.message);
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const couples = await fetchPhotos('vietnamese wedding couple');
  const romantic = await fetchPhotos('bride and groom wedding');
  const traditional = await fetchPhotos('asian bride and groom');
  
  console.log('--- Sample Vietnamese/Asian Couple Photos ---');
  couples.slice(0, 10).forEach(p => console.log(`[${p.id}] (${p.isPortrait ? 'Portrait' : 'Landscape'}): ${p.description}\n${p.url}`));
  
  console.log('--- Sample Bride & Groom Photos ---');
  romantic.slice(0, 10).forEach(p => console.log(`[${p.id}] (${p.isPortrait ? 'Portrait' : 'Landscape'}): ${p.description}\n${p.url}`));
}

main().catch(console.error);
