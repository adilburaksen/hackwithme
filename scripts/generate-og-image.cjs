const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/og-image.svg');
const pngPath = path.join(__dirname, '../public/og-image.png');

sharp(svgPath)
  .resize(1200, 630)
  .png()
  .toFile(pngPath)
  .then(() => console.log('OG image generated!'))
  .catch(err => console.error(err));