import { expect, test } from "@playwright/test";

import { mockLoginWithEmail, testAuthData } from "./helpers/auth-helpers";
import { TestParams } from "./helpers/types";

// eslint-disable-next-line jest/no-done-callback
test("mock login with email", async ({ page }: TestParams) => {
  await mockLoginWithEmail({ page });

  // Go to /
  await page.goto(testAuthData.URL);

  const header = page.locator("h4");

  // Confirm logged in user
  await expect(header).toHaveText(testAuthData.LOGIN);
});
