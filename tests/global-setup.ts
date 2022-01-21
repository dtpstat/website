import { chromium, expect } from "@playwright/test";

// TODO: Enable oly for local env
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

const globalSetup = async () => {
  // Create a Chromium browser instance
  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: "ru-RU",
  });
  const page = await context.newPage();

  // Go to http://localhost:3000/
  await page.goto(process.env.AUTH0_BASE_URL as string);
  // Click text=Login
  await Promise.all([
    page.waitForNavigation(/* { url: 'https://dev-9pt5c6ik.us.auth0.com/u/login?state=hKFo2SB1OGdCaDdaSUMtQlU0X2NlQWcyTUdrZk5ZU2tXeHdMMKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGduLW8xY2pKTFFoQkpuS2dXaEhRRGh6UjAwMmxLTk9mo2NpZNkgVklNTGgwNFNLdjhxUjdXc2VwRUhNT3FrdGJSQlNVeTE' } */),
    page.click("text=Login"),
  ]);
  // Click button:has-text("Continue with Google")
  await Promise.all([
    page.waitForNavigation(/* { url: 'https://accounts.google.com/o/oauth2/auth/identifier?login_hint&response_type=code&redirect_uri=https%3A%2F%2Flogin.us.auth0.com%2Flogin%2Fcallback&scope=email%20profile&state=n8xYkwcxbRy0TbhioEowcLaDwAoKBhUm&client_id=104565000066-q7q63bouq2ct8gj73drmpu186amn6a3f.apps.googleusercontent.com&flowName=GeneralOAuthFlow' } */),
    page.click('button:has-text("Continue with Google")'),
  ]);
  // Fill [aria-label="Телефон\ или\ адрес\ эл\.\ почты"]
  await page.fill(
    '[aria-label="Телефон\\ или\\ адрес\\ эл\\.\\ почты"]',
    process.env.TEST_LOGIN as string,
  );
  // Click button:has-text("Далее")
  await Promise.all([
    page.waitForNavigation(/* { url: 'https://accounts.google.com/signin/v2/challenge/pwd?login_hint&response_type=code&redirect_uri=https%3A%2F%2Flogin.us.auth0.com%2Flogin%2Fcallback&scope=email%20profile&state=n8xYkwcxbRy0TbhioEowcLaDwAoKBhUm&client_id=104565000066-q7q63bouq2ct8gj73drmpu186amn6a3f.apps.googleusercontent.com&flowName=GeneralOAuthFlow&cid=1&navigationDirection=forward&TL=AM3QAYZq7nx8YKprItrlvoTViq5YZC2HEuc1NeRa2BVV0ZsxYWQqJ4cxbB74WWE8' } */),
    page.click('button:has-text("Далее")'),
  ]);
  // Fill [aria-label="Введите\ пароль"]
  await page.fill(
    '[aria-label="Введите\\ пароль"]',
    process.env.TEST_PASSWORD as string,
  );
  // Click button:has-text("Далее")
  await Promise.all([
    page.waitForNavigation(/* { url: 'http://localhost:3000/' } */),
    page.click('button:has-text("Далее")'),
  ]);

  expect(page.locator("text=DTP-STAT TEST")).toBeDefined();

  // Save storage state into the file.
  await context.storageState({ path: "tests/state.json" });
};

// eslint-disable-next-line import/no-default-export
export default globalSetup;
