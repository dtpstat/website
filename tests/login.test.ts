import { chromium, expect, test } from "@playwright/test";

import { loginWithEmail, testAuthData } from "./helpers/auth-helpers";

test("login with email", async () => {
  // Create a Chromium browser instance
  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: "ru-RU",
  });
  const page = await context.newPage();

  await loginWithEmail({ page });

  // Save storage state into the file.
  await context.storageState({ path: "tests/state.json" });

  // Go to /
  await page.goto(testAuthData.URL);

  const header = page.locator("h4");

  // Confirm logged in user
  await expect(header).toHaveText(process.env.TEST_LOGIN as string);
});

test("load auth0 session", async () => {
  // Create a Chromium browser instance
  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: "ru-RU",
    storageState: "tests/state.json",
  });
  const page = await context.newPage(); // Create a new context with the saved storage state.

  // Go to /
  await page.goto(testAuthData.URL);

  const header = page.locator("h4");

  // Confirm logged in user
  await expect(header).toHaveText(testAuthData.LOGIN);
});
