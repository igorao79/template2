import fs from 'fs/promises';
import path from 'path';

async function cleanDev() {
  try {
    console.log('🧹 Очистка development файлов...');
    
    // Удаляем проблемные файлы
    const filesToRemove = [
      'dist/trace',
      'dist/server/middleware-manifest.json',
      '.next'
    ];
    
    for (const file of filesToRemove) {
      try {
        await fs.rm(file, { recursive: true, force: true });
        console.log(`✅ Удален: ${file}`);
      } catch (error) {
        console.log(`⚠️ Не удалось удалить ${file}: ${error.message}`);
      }
    }
    
    console.log('✅ Очистка завершена!');
  } catch (error) {
    console.error('❌ Ошибка очистки:', error.message);
  }
}

cleanDev(); 