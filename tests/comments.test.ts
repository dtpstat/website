import { expect, test } from "@playwright/test";

import { mockLoginWithEmail, testAuthData } from "./helpers/auth-helpers";
import { TestParams } from "./helpers/types";

// eslint-disable-next-line jest/no-done-callback
test("add comment", async ({ page }: TestParams) => {
  await mockLoginWithEmail({ page });

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
