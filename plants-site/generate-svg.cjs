const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

// Generate beautiful SVG placeholders with leaf patterns
function createPlantSVG(name, subtitle, emoji, colors, photoNum) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors[0]}"/>
      <stop offset="50%" style="stop-color:${colors[1]}"/>
      <stop offset="100%" style="stop-color:${colors[2]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.1)"/>
      <stop offset="100%" style="stop-color:rgba(255,255,255,0)"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="350" fill="url(#bg)"/>
  <rect width="800" height="350" fill="url(#glow)"/>
  
  <!-- Decorative leaf patterns -->
  <g opacity="0.1" fill="white">
    <ellipse cx="100" cy="80" rx="40" ry="60" transform="rotate(-30 100 80)"/>
    <ellipse cx="700" cy="100" rx="35" ry="50" transform="rotate(25 700 100)"/>
    <ellipse cx="650" cy="280" rx="45" ry="65" transform="rotate(-15 650 280)"/>
    <ellipse cx="150" cy="300" rx="30" ry="45" transform="rotate(40 150 300)"/>
    <ellipse cx="400" cy="50" rx="25" ry="40" transform="rotate(-10 400 50)"/>
  </g>
  
  <!-- Plant emoji -->
  <text x="400" y="130" text-anchor="middle" font-size="100" filter="url(#shadow)">${emoji}</text>
  
  <!-- Plant name -->
  <text x="400" y="200" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="white" font-weight="bold" filter="url(#shadow)">${name}</text>
  
  <!-- Subtitle -->
  <text x="400" y="245" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="rgba(255,255,255,0.85)">${subtitle}</text>
  
  <!-- Photo number -->
  <text x="400" y="310" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="rgba(255,255,255,0.5)">Фото ${photoNum} из 3</text>
</svg>`;
}

const plants = [
  // Замиокулькас - deep greens
  {
    files: [
      { name: 'zamioculcas1.svg', subtitle: 'Долларовое дерево', emoji: '🌿' },
      { name: 'zamioculcas2.svg', subtitle: 'Мясистые листья', emoji: '🪴' },
      { name: 'zamioculcas3.svg', subtitle: 'Тропическое растение', emoji: '🌱' }
    ],
    colors: ['#1b4332', '#2d5a2d', '#40916c']
  },
  // Калатея - warm browns with green
  {
    files: [
      { name: 'calathea1.svg', subtitle: 'Пёстрые листья', emoji: '🍃' },
      { name: 'calathea2.svg', subtitle: 'Молитвенное растение', emoji: '🌿' },
      { name: 'calathea3.svg', subtitle: 'Тропическая красавица', emoji: '🪴' }
    ],
    colors: ['#5d4037', '#8d6e63', '#6d4c41']
  },
  // Хамедорея - palm greens
  {
    files: [
      { name: 'chamaedorea1.svg', subtitle: 'Бамбуковая пальма', emoji: '🌴' },
      { name: 'chamaedorea2.svg', subtitle: 'Изящная пальма', emoji: '🌿' },
      { name: 'chamaedorea3.svg', subtitle: 'Очиститель воздуха', emoji: '🍀' }
    ],
    colors: ['#1b5e20', '#2e7d32', '#4caf50']
  },
  // Аглонема - red-green variegated
  {
    files: [
      { name: 'aglaonema1.svg', subtitle: 'Пёстрые листья', emoji: '🌺' },
      { name: 'aglaonema2.svg', subtitle: 'Яркие узоры', emoji: '🌿' },
      { name: 'aglaonema3.svg', subtitle: 'Неприхотливая красавица', emoji: '🪴' }
    ],
    colors: ['#b71c1c', '#4a148c', '#2e7d32']
  }
];

// Hero background SVG
const heroSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 600">
  <defs>
    <linearGradient id="hero" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1f0d"/>
      <stop offset="30%" style="stop-color:#1b4332"/>
      <stop offset="70%" style="stop-color:#2d5a2d"/>
      <stop offset="100%" style="stop-color:#40916c"/>
    </linearGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="2"/>
    </filter>
  </defs>
  
  <rect width="1920" height="600" fill="url(#hero)"/>
  
  <!-- Decorative blurred leaves -->
  <g opacity="0.15" fill="white" filter="url(#blur)">
    <ellipse cx="200" cy="150" rx="100" ry="150" transform="rotate(-20 200 150)"/>
    <ellipse cx="500" cy="400" rx="80" ry="120" transform="rotate(15 500 400)"/>
    <ellipse cx="900" cy="100" rx="90" ry="140" transform="rotate(-10 900 100)"/>
    <ellipse cx="1300" cy="350" rx="110" ry="160" transform="rotate(25 1300 350)"/>
    <ellipse cx="1600" cy="200" rx="70" ry="100" transform="rotate(-30 1600 200)"/>
    <ellipse cx="1800" cy="450" rx="95" ry="130" transform="rotate(10 1800 450)"/>
    <ellipse cx="350" cy="250" rx="60" ry="90" transform="rotate(35 350 250)"/>
    <ellipse cx="1100" cy="500" rx="75" ry="110" transform="rotate(-15 1100 500)"/>
  </g>
  
  <!-- Subtle pattern overlay -->
  <rect width="1920" height="600" fill="rgba(255,255,255,0.02)"/>
</svg>`;

// Generate all plant images
plants.forEach(plant => {
  plant.files.forEach((file, index) => {
    const svg = createPlantSVG(
      file.name.replace('.svg', '').replace(/\d$/, ''),
      file.subtitle,
      file.emoji,
      plant.colors,
      index + 1
    );
    fs.writeFileSync(path.join(imagesDir, file.name), svg, 'utf8');
    console.log(`✓ Created ${file.name}`);
  });
});

// Generate hero background
fs.writeFileSync(path.join(imagesDir, 'hero-bg.svg'), heroSVG, 'utf8');
console.log('✓ Created hero-bg.svg');

console.log('\nAll SVG images generated successfully!');
