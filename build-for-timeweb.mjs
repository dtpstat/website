// @ts-check

/*
 * Скрипт для сборки статического экспорта NextJS приложения для Timeweb Apps
 */

import { execa } from "execa";
import fs from "node:fs";

const mark = " [build-for-timeweb.mjs] ";
const logStatement = (/** @type {string} */ message) => {
  /* eslint-disable no-console */
  console.log("");
  console.log("===");
  console.log(message);
  console.log("===");
  console.log("");
  /* eslint-enable no-console */
};

logStatement("Начинаем сборку статического экспорта для Timeweb Apps");

// Устанавливаем переменную окружения для статического экспорта
process.env.STATIC_EXPORT = 'true';

// Удаляем папку out если она существует
if (fs.existsSync("out")) {
  fs.rmSync("out", { recursive: true, force: true });
  logStatement("Удалена существующая папка out");
}

// Временно переименовываем папку api
const apiPath = "src/pages/api";
const apiBackupPath = "src/api.bak"; // перемещаем за пределы pages

if (fs.existsSync(apiPath)) {
  fs.renameSync(apiPath, apiBackupPath);
  logStatement("Временно перемещена папка api в src/api.bak");
}

// Создаем временную конфигурацию для статического экспорта
const originalConfig = "next.config.mjs";
const staticConfig = "next.config.static.mjs";

if (fs.existsSync(originalConfig)) {
  fs.renameSync(originalConfig, originalConfig + ".bak");
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
      
      // Копируем статические файлы из .next в out
      logStatement("Копируем статические файлы в папку out");
      
      // Создаем папку out
      if (!fs.existsSync("out")) {
        fs.mkdirSync("out", { recursive: true });
      }
      
      // Копируем все файлы из .next/static в out
      if (fs.existsSync(".next/static")) {
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
        
        copyRecursive(".next/static", "out");
        logStatement("✅ Статические файлы скопированы в out");
      }
      
      // Создаем index.html если его нет
      if (!fs.existsSync("out/index.html")) {
        const indexHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>DTP Stat</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <div id="__next"></div>
    <script src="/_next/static/chunks/main.js"></script>
</body>
</html>`;
        fs.writeFileSync("out/index.html", indexHtml);
        logStatement("✅ Создан index.html");
      }
      
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
    fs.renameSync(originalConfig + ".bak", originalConfig);
    logStatement("Восстановлена оригинальная конфигурация");
  }
  
  // Восстанавливаем папку api
  if (fs.existsSync(apiBackupPath)) {
    fs.renameSync(apiBackupPath, apiPath);
    logStatement("Восстановлена папка api");
  }
} 
