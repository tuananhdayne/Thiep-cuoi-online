const fs = require('fs');
const path = require('path');

async function downloadAsset(relativeUrl) {
  const localPath = path.join('d:/web_cuoi/public', relativeUrl);
  if (fs.existsSync(localPath) && fs.statSync(localPath).size > 500) {
    // Already downloaded
    return;
  }

  const dir = path.dirname(localPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fullUrl = 'https://chungdoi.com' + relativeUrl;
  try {
    const res = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://chungdoi.com/vi/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });

    if (!res.ok) {
      console.warn(`Failed ${relativeUrl}: HTTP ${res.status}`);
      return;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(localPath, buffer);
    console.log(`Saved ${relativeUrl} (${(buffer.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`Error downloading ${relativeUrl}:`, err.message);
  }
}

async function main() {
  const rawData = fs.readFileSync('scripts/all_theme_assets.json', 'utf8');
  const { allList } = JSON.parse(rawData);

  console.log(`Downloading ${allList.length} assets...`);
  for (let i = 0; i < allList.length; i++) {
    const asset = allList[i];
    await downloadAsset(asset);
  }
  console.log('Finished downloading all assets!');
}

main();
