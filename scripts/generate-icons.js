const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICON_SIZES = [16, 32, 64, 192, 512];
const SOURCE_ICON = path.join(process.cwd(), 'public', 'logo.png');

async function generateIcons() {
  for (const size of ICON_SIZES) {
    const outputPath = path.join(
      process.cwd(),
      'public',
      size <= 64 ? 'favicon.ico' : `icon-${size}.png`
    );

    try {
      if (size <= 64) {
        // Для favicon.ico генерируем все размеры в одном файле
        await sharp(SOURCE_ICON)
          .resize(size, size)
          .toFormat('ico')
          .toFile(outputPath);
      } else {
        await sharp(SOURCE_ICON)
          .resize(size, size)
          .png()
          .toFile(outputPath);
      }
      
      console.log(`✓ Generated icon: ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`✗ Error generating ${outputPath}:`, error);
    }
  }
}

generateIcons()
  .then(() => console.log('✓ Icon generation complete'))
  .catch(console.error); 