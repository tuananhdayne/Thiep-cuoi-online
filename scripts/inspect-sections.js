const fs = require('fs');

const html = fs.readFileSync('d:/web_cuoi/scripts/minimalism-do-dam_open.html', 'utf8');

// Find all section HTML blocks
const sections = [...html.matchAll(/<section[\s\S]*?<\/section>/gi)].map(m => m[0]);
console.log('Total sections in minimalism-do-dam:', sections.length);

sections.forEach((sec, idx) => {
  const headings = [...sec.matchAll(/<h[1-5][^>]*>([\s\S]*?)<\/h[1-5]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log(`Section ${idx}: headings=[${headings.join(', ')}], length=${sec.length}`);
  fs.writeFileSync(`d:/web_cuoi/scripts/sec_${idx}.html`, sec.slice(0, 1500), 'utf8');
});
