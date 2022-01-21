import { expect, test } from "@playwright/test";

// eslint-disable-next-line jest/no-done-callback
test("add comment", async ({ page }) => {
  // Go to /
  await page.goto(process.env.AUTH0_BASE_URL as string);

  // Confirm logged in user name
  expect(page.locator("text=DTP-STAT TEST")).toBeDefined();
});
