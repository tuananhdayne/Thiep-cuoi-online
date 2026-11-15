const fs = require('fs');

const templates = [
  'minimalism-nau',
  'to-duyen-hong',
  'cam-thach-vang',
  'minimalism-lam-dam',
  'minimalism-tim',
  'baroque-v2-do-dam',
  'lien-hoa-v2-xanh'
];

async function fetchDemos() {
  for (const slug of templates) {
    try {
      const url = 'https://chungdoi.com/vi/mau-thiep/' + slug + '/demo?open=1';
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (res.ok) {
        const html = await res.text();
        fs.writeFileSync('d:/web_cuoi/scripts/' + slug + '_open.html', html, 'utf8');
        console.log(slug, 'saved, size:', html.length);
      } else {
        console.log(slug, 'status:', res.status);
      }
    } catch (e) {
      console.error(slug, 'error:', e.message);
    }
  }
}

fetchDemos();
