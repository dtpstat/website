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
  console.log(`=${mark}${"=".repeat(message.length - mark.length - 1)}`);
  console.log(message);
  console.log("=".repeat(message.length));
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

// Собираем приложение
logStatement("Запускаем сборку NextJS с статическим экспортом");
await execa("next", ["build"], { stdio: "inherit" });

// Проверяем, что файлы созданы
if (fs.existsSync("out")) {
  const outContents = fs.readdirSync("out");
  logStatement(`Сборка завершена. Содержимое папки out: ${outContents.join(", ")}`);
  
  // Проверяем наличие index.html
  if (fs.existsSync("out/index.html")) {
    logStatement("✅ index.html найден в папке out");
  } else {
    logStatement("❌ index.html НЕ найден в папке out");
  }
} else {
  logStatement("❌ Папка out не создана");
  process.exit(1);
}

logStatement("Сборка статического экспорта завершена успешно!"); 
