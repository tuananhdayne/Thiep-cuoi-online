const fs = require('fs');

function extractEnvelopeAndBody(slug) {
  const html = fs.readFileSync('d:/web_cuoi/scripts/' + slug + '_demo.html', 'utf8');
  
  // Cut envelope div
  const envelopeStart = html.indexOf('data-landing-screenshot-id="invite-envelope"');
  if (envelopeStart !== -1) {
    // Find where envelope ends
    // Search for "Mở thiệp" button
    const btnIdx = html.indexOf('Mở thiệp', envelopeStart);
    if (btnIdx !== -1) {
      console.log('--- ENVELOPE BUTTON AREA ---');
      console.log(html.slice(btnIdx - 400, btnIdx + 400));
    }
  }

  // Find the main invitation body (after envelope)
  // Let's find sections or headings
  const headings = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('--- HEADINGS ---', headings);

  // Find font imports or Google font links
  const fontLinks = [...html.matchAll(/href="([^"]*fonts\.googleapis\.com[^"]*)"/gi)].map(m => m[1]);
  console.log('--- GOOGLE FONTS ---', fontLinks);

  // Find css files
  const cssLinks = [...html.matchAll(/href="([^"]*\.css[^"]*)"/gi)].map(m => m[1]);
  console.log('--- CSS LINKS ---', cssLinks);
}

extractEnvelopeAndBody('minimalism-do-dam');
extractEnvelopeAndBody('song-hy-v2-do');
