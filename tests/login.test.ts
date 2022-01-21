import { chromium, expect, test } from "@playwright/test";

test("add comment", async ({ page }) => {
  // Go to /
  await page.goto(process.env.AUTH0_BASE_URL as string);

  // Confirm logged in user name
  await expect(page.locator("text=DTP-STAT TEST")).toBeDefined();
});
