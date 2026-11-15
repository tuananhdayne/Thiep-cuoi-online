const fs = require('fs');

const files = [
  'scripts/lien-hoa-v2-xanh_raw.html',
  'scripts/song-hy-v2-do_raw.html',
  'scripts/to-duyen-hong_raw.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  console.log(`=== File: ${file} ===`);
  
  // Check keyframes
  const keyframes = content.match(/@keyframes\s+([a-zA-Z0-9_-]+)/g);
  console.log('Keyframes:', keyframes ? Array.from(new Set(keyframes)) : 'none');

  // Check data- or class related to animation
  const animClasses = content.match(/class="[^"]*(?:animate|fade|slide|zoom|float|bounce|pulse|spin|reveal)[^"]*"/g);
  console.log('Sample Anim classes:', animClasses ? Array.from(new Set(animClasses)).slice(0, 10) : 'none');

  // Check inline styles with animation
  const animStyles = content.match(/style="[^"]*animation[^"]*"/g);
  console.log('Anim styles:', animStyles ? Array.from(new Set(animStyles)).slice(0, 5) : 'none');

  // Check scripts for animation libraries or scroll animations
  const scriptKeywords = content.match(/(?:AOS|gsap|framer|ScrollReveal|intersection|motion|fade-in|translateY|opacity)/gi);
  console.log('Script keywords:', scriptKeywords ? Array.from(new Set(scriptKeywords)).slice(0, 10) : 'none');
}
