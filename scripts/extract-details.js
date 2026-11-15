const fs = require('fs');

function extractDetails(slug) {
  const html = fs.readFileSync('d:/web_cuoi/scripts/' + slug + '_demo.html', 'utf8');
  
  // Find script tags or Next.js data
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (nextDataMatch) {
    const data = JSON.parse(nextDataMatch[1]);
    fs.writeFileSync('d:/web_cuoi/scripts/' + slug + '_nextdata.json', JSON.stringify(data, null, 2), 'utf8');
    console.log(slug, 'saved __NEXT_DATA__ keys:', Object.keys(data.props?.pageProps || {}));
  }

  // Find the invite-envelope block
  const envelopeStart = html.indexOf('data-landing-screenshot-id="invite-envelope"');
  if (envelopeStart !== -1) {
    const envelopeSnippet = html.slice(envelopeStart - 100, envelopeStart + 3500);
    fs.writeFileSync('d:/web_cuoi/scripts/' + slug + '_envelope_snippet.html', envelopeSnippet, 'utf8');
  }
}

extractDetails('minimalism-do-dam');
extractDetails('song-hy-v2-do');
extractDetails('vuon-xuan-xanh');
