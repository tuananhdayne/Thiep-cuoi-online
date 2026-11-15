const https = require('https');
const fs = require('fs');

async function download(url, outPath) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://chungdoi.com/vi/'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(outPath, data);
        console.log(`Downloaded ${url} (${data.length} bytes)`);
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function main() {
  const css1 = await download('https://chungdoi.com/_next/static/css/d037ca79ab5530a8.css', 'scripts/chungdoi-1.css');
  const css2 = await download('https://chungdoi.com/_next/static/css/08fc569d88870472.css', 'scripts/chungdoi-2.css');
  
  const allCss = css1 + '\n' + css2;
  const keyframes = allCss.match(/@keyframes\s+([a-zA-Z0-9_-]+)/g);
  console.log('All Keyframes in ChungDoi CSS:', keyframes);

  const anims = allCss.match(/animation:[^;}]+/g);
  console.log('All animation rules:', anims ? Array.from(new Set(anims)) : []);
}

main().catch(console.error);
