import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, resolve, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const publicDir = resolve(__dirname, '..', 'public');

const optimizationSettings = {
  // Для фотографий животных
  animals: {
    maxWidth: 400,
    maxHeight: 300,
    quality: 65
  },
  // Для событий
  events: {
    maxWidth: 500,
    maxHeight: 300,
    quality: 70
  },
  // Для фона и больших изображений
  background: {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 55
  },
  // По умолчанию
  default: {
    maxWidth: 600,
    maxHeight: 400,
    quality: 70
  }
};

function getOptimizationSettings(filePath) {
  const fileName = basename(filePath).toLowerCase();
  
  if (fileName.includes('hero') || fileName.includes('bg') || fileName.includes('background')) {
    return optimizationSettings.background;
  }
  
  if (filePath.includes('/events/')) {
    return optimizationSettings.events;
  }
  
  if (fileName.includes('elephant') || fileName.includes('tiger') || 
      fileName.includes('lion') || fileName.includes('giraffe') ||
      fileName.includes('panda') || fileName.includes('iguana') ||
      fileName.includes('monkey') || fileName.includes('wolf')) {
    return optimizationSettings.animals;
  }
  
  return optimizationSettings.default;
}

async function* walk(dir) {
  try {
    const files = await readdir(dir);
    for (const file of files) {
      const path = join(dir, file);
      const stats = await stat(path);
      if (stats.isDirectory()) {
        yield* walk(path);
      } else if(/\.webp$/i.test(file)) {
        yield path;
      }
    }
  } catch (error) {
    console.log(`Skipping directory ${dir}: ${error.message}`);
  }
}

async function optimizeWebP(inputPath) {
  try {
    const settings = getOptimizationSettings(inputPath);
    const tempPath = inputPath + '.optimized';
    
    console.log(`\n📸 Сжимаю: ${basename(inputPath)}`);
    
    const originalStats = await stat(inputPath);
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`   Исходный: ${metadata.width}x${metadata.height} (${Math.round(originalStats.size / 1024)}KB)`);
    
    await image
      .resize(settings.maxWidth, settings.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: settings.quality,
        effort: 6,
        smartSubsample: true,
        lossless: false
      })
      .toFile(tempPath);
    
    const newStats = await stat(tempPath);
    const saved = originalStats.size - newStats.size;
    const compressionRatio = ((saved / originalStats.size) * 100).toFixed(1);
    
    console.log(`   Сжатый: ${Math.round(newStats.size / 1024)}KB (сэкономлено: ${compressionRatio}%)`);
    
    // Заменяем оригинал только если новый файл меньше
    if (newStats.size < originalStats.size) {
      await rename(tempPath, inputPath);
      console.log(`   ✅ Файл обновлен`);
      return {
        original: originalStats.size,
        optimized: newStats.size,
        saved: saved
      };
    } else {
      await unlink(tempPath);
      console.log(`   ⚠️ Оригинал лучше, оставляем как есть`);
      return {
        original: originalStats.size,
        optimized: originalStats.size,
        saved: 0
      };
    }
  } catch (error) {
    console.error(`   ❌ Ошибка: ${error.message}`);
    return { original: 0, optimized: 0, saved: 0 };
  }
}

async function main() {
  console.log('🎯 Запуск агрессивного сжатия WebP изображений...');
  console.log(`📁 Сканирование: ${publicDir}\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let processedCount = 0;
  
  for await (const path of walk(publicDir)) {
    const result = await optimizeWebP(path);
    totalOriginal += result.original;
    totalOptimized += result.optimized;
    processedCount++;
  }
  
  const totalSaved = totalOriginal - totalOptimized;
  const compressionPercentage = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;
  
  console.log(`\n🎉 Сжатие завершено!`);
  console.log(`📊 Статистика:`);
  console.log(`   • Обработано файлов: ${processedCount}`);
  console.log(`   • Исходный размер: ${Math.round(totalOriginal / 1024)}KB`);
  console.log(`   • Итоговый размер: ${Math.round(totalOptimized / 1024)}KB`);
  console.log(`   • Сэкономлено: ${Math.round(totalSaved / 1024)}KB (${compressionPercentage}%)`);
}

main().catch(console.error); 