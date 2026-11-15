const fs = require('fs');

function inspectOpen(slug) {
  const html = fs.readFileSync('d:/web_cuoi/scripts/' + slug + '_open.html', 'utf8');
  console.log('==================== ' + slug + ' ====================');

  // Find headings
  const headings = [...html.matchAll(/<h[1-5][^>]*>([\s\S]*?)<\/h[1-5]>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
  console.log('Headings:', headings);

  // Find section texts or labels
  const textSnippets = [...html.matchAll(/(?:Lễ Thành Hôn|Lễ Vu Quy|Album|Sự kiện|Lịch trình|Sổ lưu bút|Hộp mừng cưới|Dress Code|Gửi lời chúc|Gia đình)/gi)]
    .map(m => m[0]);
  console.log('Key keywords found:', [...new Set(textSnippets)]);

  // Find container widths or layout
  // Check main container
  const mainMatches = [...html.matchAll(/class="([^"]*(?:max-w-|w-full|min-h-screen|container)[^"]*)"/gi)]
    .map(m => m[1]);
  console.log('Container classes:', [...new Set(mainMatches)].slice(0, 10));

  // Find fonts used inline
  const inlineFonts = [...html.matchAll(/font-family:([^;"]+)/gi)].map(m => m[1].trim());
  console.log('Inline fonts:', [...new Set(inlineFonts)]);

  // Find background colors / gradients
  const bgStyles = [...html.matchAll(/background(?:-color)?:\s*([^;"]+)/gi)].map(m => m[1].trim());
  console.log('Backgrounds:', [...new Set(bgStyles)].slice(0, 10));

  // Find text colors
  const textColors = [...html.matchAll(/color:\s*([^;"]+)/gi)].map(m => m[1].trim());
  console.log('Text colors:', [...new Set(textColors)].slice(0, 10));
}

inspectOpen('minimalism-do-dam');
inspectOpen('song-hy-v2-do');
inspectOpen('vuon-xuan-xanh');
