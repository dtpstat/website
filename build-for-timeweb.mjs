// @ts-check

/*
 * Скрипт для сборки статического экспорта NextJS приложения для Timeweb Apps
 */

import { execa } from "execa";
import fs from "node:fs";

const logStatement = (/** @type {string} */ message) => {
  console.log("");
  console.log("===");
  console.log(message);
  console.log("===");
  console.log("");
};

// Функция для поиска файлов по паттерну
const findFilesByPattern = (dir, pattern) => {
  const files = [];
  const searchRecursive = (currentDir) => {
    if (fs.existsSync(currentDir)) {
      const items = fs.readdirSync(currentDir);
      items.forEach(item => {
        const fullPath = `${currentDir}/${item}`;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          searchRecursive(fullPath);
        } else if (pattern.test(item)) {
          files.push(fullPath.replace(dir + '/', ''));
        }
      });
    }
  };
  searchRecursive(dir);
  return files;
};

// Функция для рекурсивного копирования
const copyRecursive = (src, dest) => {
  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
      copyRecursive(`${src}/${file}`, `${dest}/${file}`);
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

logStatement("Начинаем сборку статического экспорта для Timeweb Apps");

// Устанавливаем переменную окружения для статического экспорта
process.env.STATIC_EXPORT = 'true';

// Удаляем папку out если она существует
if (fs.existsSync("out")) {
  fs.rmSync("out", { recursive: true, force: true });
  logStatement("Удалена существующая папка out");
}

// Временно копируем папку api вместо переименования
const apiPath = "src/pages/api";
const apiBackupPath = "src/api.bak";

if (fs.existsSync(apiPath)) {
  // Копируем папку api
  copyRecursive(apiPath, apiBackupPath);
  // Удаляем оригинальную папку
  fs.rmSync(apiPath, { recursive: true, force: true });
  logStatement("Временно скопирована папка api в src/api.bak");
}

// Создаем временную конфигурацию для статического экспорта
const originalConfig = "next.config.mjs";
const staticConfig = "next.config.static.mjs";

if (fs.existsSync(originalConfig)) {
  fs.copyFileSync(originalConfig, originalConfig + ".bak");
  logStatement("Сохранена оригинальная конфигурация как next.config.mjs.bak");
}

if (fs.existsSync(staticConfig)) {
  fs.copyFileSync(staticConfig, originalConfig);
  logStatement("Применена конфигурация для статического экспорта");
} else {
  logStatement("❌ Файл next.config.static.mjs не найден");
  process.exit(1);
}

try {
  // Собираем приложение
  logStatement("Запускаем сборку NextJS с статическим экспортом");
  await execa("next", ["build"], { stdio: "inherit" });

  // Проверяем, что файлы созданы в .next
  if (fs.existsSync(".next")) {
    const nextContents = fs.readdirSync(".next");
    logStatement(`Сборка завершена. Содержимое папки .next: ${nextContents.join(", ")}`);
    
    // Проверяем наличие export-marker.json
    if (fs.existsSync(".next/export-marker.json")) {
      logStatement("✅ Статический экспорт создан в .next");
      
      // Создаем папку out
      if (!fs.existsSync("out")) {
        fs.mkdirSync("out", { recursive: true });
      }
      
      // Копируем все файлы из .next/static в out
      if (fs.existsSync(".next/static")) {
        copyRecursive(".next/static", "out");
        logStatement("✅ Статические файлы скопированы в out");
      }
      
      // Находим правильные имена файлов
      const jsFiles = findFilesByPattern("out", /\.js$/);
      const cssFiles = findFilesByPattern("out", /\.css$/);
      
      logStatement(`Найдено JS файлов: ${jsFiles.length}`);
      logStatement(`Найдено CSS файлов: ${cssFiles.length}`);
      
      // Создаем index.html с динамическими именами файлов
      const cssLinks = cssFiles.map(file => `<link rel="stylesheet" href="/${file}">`).join('\n    ');
      const jsScripts = jsFiles.map(file => `<script src="/${file}"></script>`).join('\n    ');
      
      const indexHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>DTP Stat - Статистика ДТП</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Статистика дорожно-транспортных происшествий в России">
    ${cssLinks}
    <style>
      body { 
        margin: 0; 
        padding: 0; 
        font-family: Arial, sans-serif; 
        background: #f5f5f5;
      }
      #__next { 
        min-height: 100vh; 
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .demo-content {
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-width: 600px;
      }
      .demo-content h1 {
        color: #18334a;
        margin-bottom: 20px;
      }
      .demo-content p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 15px;
      }
      .demo-content .features {
        text-align: left;
        margin-top: 20px;
      }
      .demo-content .features li {
        margin-bottom: 8px;
        color: #555;
      }
    </style>
</head>
<body>
    <div id="__next">
      <div class="demo-content">
        <h1>DTP Stat</h1>
        <p>Демо-версия приложения статистики дорожно-транспортных происшествий</p>
        <p>В статической версии некоторые функции недоступны:</p>
        <div class="features">
          <ul>
            <li>Интерактивные карты</li>
            <li>Комментарии и аутентификация</li>
            <li>API запросы к серверу</li>
            <li>Динамическая загрузка данных</li>
          </ul>
        </div>
        <p>Для полной функциональности используйте серверную версию приложения.</p>
      </div>
    </div>
    <script>
      // Отключаем загрузку сложных компонентов
      window.STATIC_EXPORT = true;
      window.addEventListener('error', function(e) {
        console.warn('Ошибка загрузки:', e.error);
      });
    </script>
</body>
</html>`;
        fs.writeFileSync("out/index.html", indexHtml);
        logStatement("✅ Создан index.html с динамическими файлами");
        
        // Создаем 404.html
        const error404Html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>404 - Страница не найдена | DTP Stat</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <div style="text-align: center; padding: 50px;">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>Запрашиваемая страница не существует.</p>
        <a href="/">Вернуться на главную</a>
    </div>
</body>
</html>`;
        fs.writeFileSync("out/404.html", error404Html);
        logStatement("✅ Создан 404.html");
        
        // Проверяем содержимое папки out
        const outContents = fs.readdirSync("out");
        logStatement(`Содержимое папки out: ${outContents.join(", ")}`);
        
      } else {
        logStatement("❌ Статический экспорт не создан");
        process.exit(1);
      }
    } else {
      logStatement("❌ Папка .next не создана");
      process.exit(1);
    }
  

  logStatement("Сборка статического экспорта завершена успешно!");
} finally {
  // Восстанавливаем оригинальную конфигурацию
  if (fs.existsSync(originalConfig + ".bak")) {
    fs.unlinkSync(originalConfig);
    fs.copyFileSync(originalConfig + ".bak", originalConfig);
    fs.unlinkSync(originalConfig + ".bak");
    logStatement("Восстановлена оригинальная конфигурация");
  }
  
  // Восстанавливаем папку api
  if (fs.existsSync(apiBackupPath)) {
    if (fs.existsSync(apiPath)) {
      fs.rmSync(apiPath, { recursive: true, force: true });
    }
    copyRecursive(apiBackupPath, apiPath);
    fs.rmSync(apiBackupPath, { recursive: true, force: true });
    logStatement("Восстановлена папка api");
  }
} 
