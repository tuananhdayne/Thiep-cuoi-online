const fs = require('fs');

function inspectSectionLayout(slug) {
  const html = fs.readFileSync(`scripts/${slug}_raw.html`, 'utf8');
  console.log(`\n=================== ${slug} SECTIONS ===================`);
  
  // Find sections or divs with id or data attributes
  const sectionMatches = [...html.matchAll(/<(?:section|div)\s+(?:id="([^"]+)"|class="([^"]*(?:relative|hero|intro|event|gallery|timeline)[^"]*)")[^>]*>/gi)];
  console.log('Sections found:', sectionMatches.slice(0, 10).map(m => m[1] || m[2].slice(0, 60)));
}

inspectSectionLayout('song-hy-v2-do');
inspectSectionLayout('baroque-v2-do-dam');
