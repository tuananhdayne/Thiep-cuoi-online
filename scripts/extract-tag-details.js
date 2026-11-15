const fs = require('fs');

const themes = [
  'song-hy-v2-do',
  'baroque-v2-do-dam',
  'lien-hoa-v2-xanh',
  'minimalism-do-dam',
  'to-duyen-hong',
  'minimalism-nau',
  'cam-thach-vang',
  'minimalism-lam-dam',
  'minimalism-tim',
  'vuon-xuan-xanh'
];

for (const t of themes) {
  const file = `scripts/${t}_raw.html`;
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');

  console.log(`\n=================== ${t} ===================`);
  // Match any tag containing /images/themes/
  const regex = /<[^>]+(?:\/images\/themes\/)[^>]+>/g;
  const matches = html.match(regex) || [];
  console.log(`Found ${matches.length} theme decoration tags:`);
  matches.forEach(m => console.log(' ', m));
}
