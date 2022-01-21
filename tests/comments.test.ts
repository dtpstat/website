import { chromium, expect, test } from "@playwright/test";

test("add comment", async ({}) => {
  // Create a Chromium browser instance
  const browser = await chromium.launch();
  // Create a new context with the saved storage state.
  const context = await browser.newContext({
    storageState: "tests/state.json",
  });
  const page = await context.newPage();

  // Go to /
  await page.goto(process.env.AUTH0_BASE_URL as string);
  // Click text=Comments
  await Promise.all([
    page.waitForNavigation(/* { url: '/iframes/comments/1' } */),
    page.click("text=Comments"),
  ]);
  // Click textarea
  await page.click("textarea");
  // Fill textarea
  await page.fill("textarea", "Hi, this is my comment\n");
  // Press Enter
  await page.press("textarea", "Enter");
  // Click text=Отправить
  await page.click("text=Отправить");

  await expect(page.locator("text=DTP-STAT TEST")).toBeDefined();
  await expect(page.locator("text=Hi, this is my comment")).toBeDefined();
});
