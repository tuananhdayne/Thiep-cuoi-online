const https = require('https');

function getPhotosFromPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9_-]+/g);
        if (matches) {
          const unique = Array.from(new Set(matches));
          resolve(unique);
        } else {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const urls = [
    'https://unsplash.com/s/photos/wedding-couple',
    'https://unsplash.com/s/photos/bride-and-groom',
    'https://unsplash.com/s/photos/asian-wedding',
    'https://unsplash.com/s/photos/vietnam-wedding'
  ];

  for (const u of urls) {
    const list = await getPhotosFromPage(u);
    console.log(`URL: ${u} => found ${list.length} photos`);
    list.slice(0, 8).forEach(p => console.log(p));
  }
}

main().catch(console.error);
