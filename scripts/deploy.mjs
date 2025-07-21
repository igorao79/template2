import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function deploy() {
  try {
    console.log('🚀 Начинаем деплой на GitHub Pages...');
    
    // Очищаем старые файлы
    console.log('🧹 Очистка старых файлов...');
    try {
      await fs.rm('out', { recursive: true, force: true });
      await fs.rm('.next', { recursive: true, force: true });
    } catch {}
    
    // Сборка проекта
    console.log('🔨 Сборка проекта...');
    await execAsync('npm run build');
    
    // Проверяем что файлы созданы правильно
    try {
      await fs.access('out');
      console.log('✅ Статический экспорт создан');
    } catch {
      throw new Error('Не удалось создать статический экспорт');
    }
    
    // Добавляем .nojekyll для GitHub Pages
    console.log('📄 Создание .nojekyll...');
    await fs.writeFile('out/.nojekyll', '');
    
    // Деплоим напрямую папку out (без вложенной template2)
    console.log('🚀 Деплой на GitHub Pages...');
    await execAsync('gh-pages -d out -t');
    
    console.log('✅ Деплой успешно завершен!');
    console.log('🌐 Сайт доступен по адресу: https://igorao79.github.io/template2/');
    
  } catch (error) {
    console.error('❌ Ошибка деплоя:', error.message);
    
    // Если ошибка trace, пробуем ручной деплой
    if (error.message.includes('trace') || error.message.includes('ENOENT')) {
      console.log('🔧 Пробуем альтернативный метод...');
      await manualDeploy();
    } else {
      process.exit(1);
    }
  }
}

async function manualDeploy() {
  try {
    console.log('🛠️ Ручной деплой...');
    
    // Создаем минимальную структуру
    const tempDir = 'temp-deploy';
    await fs.rm(tempDir, { recursive: true, force: true });
    await fs.mkdir(tempDir, { recursive: true });
    
    // Копируем public файлы в корень
    await fs.cp('public', tempDir, { recursive: true });
    
    // Создаем .nojekyll
    await fs.writeFile(path.join(tempDir, '.nojekyll'), '');
    
    // Деплоим
    await execAsync(`gh-pages -d ${tempDir} -t`);
    
    // Очищаем
    await fs.rm(tempDir, { recursive: true, force: true });
    
    console.log('✅ Ручной деплой завершен!');
  } catch (error) {
    console.error('❌ Ошибка ручного деплоя:', error);
    process.exit(1);
  }
}

deploy(); 