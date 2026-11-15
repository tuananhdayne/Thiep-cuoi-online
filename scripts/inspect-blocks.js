const fs = require('fs');

const html = fs.readFileSync('d:/web_cuoi/scripts/minimalism-do-dam_open.html', 'utf8');

// Find all data-landing-screenshot-id or id or class with key names
const blocks = [...html.matchAll(/(data-landing-screenshot-id="[^"]*"|id="[^"]*")/gi)].map(m => m[0]);
console.log('Landing screenshot IDs / IDs:', [...new Set(blocks)]);

// Find all headings and their parent div classes
const headingMatches = [...html.matchAll(/<h[1-5][^>]*>([\s\S]*?)<\/h[1-5]>/gi)];
headingMatches.forEach(h => {
  const text = h[1].replace(/<[^>]+>/g, '').trim();
  const start = Math.max(0, h.index - 200);
  const end = Math.min(html.length, h.index + 300);
  console.log(`\n--- Heading: "${text}" ---`);
  console.log(html.slice(start, end).replace(/\s+/g, ' ').slice(0, 300));
});
