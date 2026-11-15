const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = 'public/images/couples';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Sample of photo-library URLs from the raw HTMLs
const photoUrls = [
  // Lien hoa / Lotus theme couple
  'https://assets.chungdoi.com/photo-library/design/455c1838dfc39d415f9919e861f56a1435b9a63ed1137db92328d0d9ed732129.webp',
  'https://assets.chungdoi.com/photo-library/design/bbecb4f103023ba59ae9ea19b6bcb62c49519ba26a998f88c80f1b225bd10984.webp',
  'https://assets.chungdoi.com/photo-library/design/69c1de1437cfca1807a0f44dd4238abcae9b4cd77acc79fc598e668b55fa3099.webp',
  'https://assets.chungdoi.com/photo-library/design/c029bacf7bdd173b0244534558d4e0c49df0f9b88555c0648773398e692b1d2d.webp',
  'https://assets.chungdoi.com/photo-library/design/6f6476d8c2c994dc2f06ec018d3ba595af7af9ba73338485ad3e2ccb62567dd2.webp',
  'https://assets.chungdoi.com/photo-library/design/4d6e1c30ebc284cd280f15c6eaec1bcaf217e11ae77ebd6d3ab2451862b4cb16.webp',
  // Song hy / Red wedding couple
  'https://assets.chungdoi.com/photo-library/design/408e5eae5b0fbb8a3da6c7ff32d3647c032123a31e58705b1ffba426fed9c2c0.webp',
  'https://assets.chungdoi.com/photo-library/design/9719c21e23be54d0e4c95f83ab4bd82fe8b3e77b9abd0e2290a8c8c372793e3a.webp',
  'https://assets.chungdoi.com/photo-library/design/8f8b24ba9ae55bb862ba94a61da30b9355000b934e89933f672c0fa2393e56a2.webp',
  'https://assets.chungdoi.com/photo-library/design/48c8d683aee7dffb0d82fc344a10525d2baec7d678f34b07df8b78123cf83356.webp',
  'https://assets.chungdoi.com/photo-library/design/3ff467f130528703b7946df455fd535e4300004fe6785d301c15bbe37bfbe9ba.webp',
  'https://assets.chungdoi.com/photo-library/design/bb1f9bfe41533c4f8929fa6d604c1d82d08c49c4b49d25bd004fad6e0df57830.webp',
  // Western / Modern wedding couples
  'https://assets.chungdoi.com/photo-library/design/91c89299e50d0147428d495685da42750d6dba505aa1bc5e08c9e3091aa8c85e.webp',
  'https://assets.chungdoi.com/photo-library/design/8ce9041b57ac75a40fda724daf408ed9c9f5f8c06fc07956e92321dcecb8c070.webp',
  'https://assets.chungdoi.com/photo-library/design/53fe1ac6520c377e14384b2940cb1edca37668313fa366532c6b50c57cc5e6ba.webp',
  'https://assets.chungdoi.com/photo-library/design/9428e6bdde0a685c2ad1fac40d343b5d50cd9c415610dfd0dec4d222f65b136c.webp',
  'https://assets.chungdoi.com/photo-library/design/5169823e2046899b26d9ce7cf2a452249052ea8c50ff314d84e8dfbedba45c71.webp',
  'https://assets.chungdoi.com/photo-library/design/83b987b712c877f3ce3c72317fe74553eed8de3f7ac7dbf135660bd3902ef115.webp',
  // Additional romantic couple shots
  'https://assets.chungdoi.com/photo-library/design/12ff63fe762cd0c5ca2730ecfb046f7b393a92ff01eab8ee2a94e8eca5702ed5.webp',
  'https://assets.chungdoi.com/photo-library/design/233f83fc04b7eab1e263c4a2a6f089d3bdaee9e544b9996acaffa59969291ed4.webp',
  'https://assets.chungdoi.com/photo-library/design/709ef51371b16aeec07abc414f420341351d35af51bf69c818bde0ab0dd668bc.webp',
  'https://assets.chungdoi.com/photo-library/design/b45fdd26a285e8b31bddf294dc0f205ae152332de9ab6a26b91e5f169bde4bb4.webp',
  'https://assets.chungdoi.com/photo-library/design/fd3178ccf0efc276f3ecd58effa45b6aee5764defcdb64723b2d4d27973a3d67.webp',
  'https://assets.chungdoi.com/photo-library/design/2e18f7158e300d1feb550991f463cbffcb83018ab5bcddd9a524b21b4d6dcaed.webp'
];

async function downloadPhoto(url, idx) {
  const dest = path.join(targetDir, `wedding-couple-${idx + 1}.webp`);
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://chungdoi.com/vi/'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        console.log(`Failed [${res.statusCode}]: ${url}`);
        resolve(null);
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stat = fs.statSync(dest);
        console.log(`Saved wedding-couple-${idx + 1}.webp (${Math.round(stat.size / 1024)} KB)`);
        resolve(dest);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err.message);
      resolve(null);
    });
  });
}

async function main() {
  console.log(`Downloading ${photoUrls.length} wedding couple photos...`);
  for (let i = 0; i < photoUrls.length; i++) {
    await downloadPhoto(photoUrls[i], i);
  }
  console.log('Download complete!');
}

main().catch(console.error);
