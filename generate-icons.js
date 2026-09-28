const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'icon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// SVG contains embedded base64 png image
const match = svgContent.match(/href="data:image\/png;base64,([^"]+)"/);
if (match && match[1]) {
  const base64Data = match[1];
  const buffer = Buffer.from(base64Data, 'base64');
  
  const iconsDir = path.join(__dirname, 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
  }
  
  fs.writeFileSync(path.join(iconsDir, 'icon16.png'), buffer);
  fs.writeFileSync(path.join(iconsDir, 'icon48.png'), buffer);
  fs.writeFileSync(path.join(iconsDir, 'icon128.png'), buffer);
  console.log('Icon pngs extracted and updated successfully.');
} else {
  console.error('Base64 image not found in SVG.');
}
