import { chromium, expect, test } from "@playwright/test";

test("add comment", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  // Confirm logged in user name
  await expect(page.locator("text=DTP-STAT TEST")).toBeDefined();
});
