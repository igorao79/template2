const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const QUALITY = 80;
const MAX_WIDTH = {
  thumbnail: 400,
  medium: 800,
  large: 1200
};

async function optimizeImage(inputPath, outputPath, maxWidth) {
  try {
    await sharp(inputPath)
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    console.log(`✓ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error);
  }
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const inputPath = path.join(directory, file);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      await processDirectory(inputPath);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      const outputPath = inputPath.replace(/\.[^.]+$/, '.webp');
      
      // Определяем размер на основе пути
      let maxWidth = MAX_WIDTH.medium;
      if (inputPath.includes('thumbnail')) maxWidth = MAX_WIDTH.thumbnail;
      if (inputPath.includes('large')) maxWidth = MAX_WIDTH.large;

      await optimizeImage(inputPath, outputPath, maxWidth);
    }
  }
}

const PUBLIC_DIR = path.join(process.cwd(), 'public');
processDirectory(PUBLIC_DIR)
  .then(() => console.log('✓ Image optimization complete'))
  .catch(console.error); 