const fs = require('fs');

function inspectDemo(slug) {
  const html = fs.readFileSync('d:/web_cuoi/scripts/' + slug + '_demo.html', 'utf8');
  console.log('=== ' + slug + ' ===');

  // Look for background images, svgs, or theme styles
  const bgMatches = html.match(/background(?:-image)?:\s*url\([^)]+\)/g);
  console.log('Background urls:', bgMatches ? [...new Set(bgMatches)].slice(0, 5) : 'none');

  // Look for style tags
  const styleTags = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
  console.log('Number of style tags:', styleTags ? styleTags.length : 0);
  if (styleTags) {
    fs.writeFileSync('d:/web_cuoi/scripts/' + slug + '_styles.css', styleTags.join('\n\n'), 'utf8');
  }

  // Look for main containers
  const containers = html.match(/<main[\s\S]*?<\/main>|<div id=\"__next\"[\s\S]*?<\/div>|<body[\s\S]*?<\/body>/);
  // Find key sections
  const sections = html.match(/<(?:section|div)[^>]*(?:id|class)="[^"]*(?:hero|intro|event|album|gallery|couple|story|timeline|rsvp|wishes|gift|invitation|envelope)[^"]*"[^>]*>/gi);
  console.log('Key section tags:', sections ? [...new Set(sections)].slice(0, 15) : 'none');

  // Find audio or music
  const audioMatches = html.match(/<audio[^>]*>|src="[^"]*\.mp3[^"]*"/gi);
  console.log('Audio:', audioMatches);
}

inspectDemo('minimalism-do-dam');
inspectDemo('song-hy-v2-do');
inspectDemo('vuon-xuan-xanh');
