import { chromium, expect, test } from "@playwright/test";

import { testAuthData } from "./helpers/auth-helpers";

test("add comment", async () => {
  // Create a Chromium browser instance
  const browser = await chromium.launch();
  // Create a new context with the saved storage state.
  const context = await browser.newContext({
    storageState: "tests/state.json",
  });
  const page = await context.newPage();
  const newCommentText = "Hi, this is my comment";

  // Go to /
  await page.goto(testAuthData.URL);
  // Click text=Comments
  await Promise.all([
    page.waitForNavigation(/* { url: '/iframes/comments/1' } */),
    page.click("text=Comments"),
  ]);
  // Click textarea
  await page.click("textarea");
  // Fill textarea
  await page.fill("textarea", newCommentText);
  // Press Enter
  await page.press("textarea", "Enter");
  // Click text=Отправить
  await page.click("text=Отправить");

  await expect(page.locator(`text=${newCommentText}`)).toHaveText(
    newCommentText,
  );
  await expect(page.locator(`text=${testAuthData.LOGIN}`)).toHaveText(
    testAuthData.LOGIN,
  );
});
