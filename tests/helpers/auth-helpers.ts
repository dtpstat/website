import dotenv from "dotenv";

import { TestParams } from "./types";

dotenv.config({ path: ".env.local" });

export const testAuthData = {
  URL: process.env.AUTH0_BASE_URL as string,
  LOGIN: process.env.TEST_LOGIN as string,
  PASSWORD: process.env.TEST_PASSWORD as string,
  authMeResp: {
    nickname: "dtp.stat.test",
    name: "dtp.stat.test@gmail.com",
    picture: "",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    updated_at: "2022-01-21T23:42:43.606Z",
    sub: "auth0|61eb2c2059e0a90071d8f69f",
  },
};

export const loginWithEmail = async ({ page }: TestParams) => {
  // Go to /
  await page.goto(testAuthData.URL);

  // Click text=Login
  await Promise.all([
    page.waitForNavigation(/* { url: 'https://dev-9pt5c6ik.us.auth0.com/u/login?state=hKFo2SBSXy14NTExZ1M3RWJobTFCU1hHS2xzS0FZbkpMejJRVqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHk3d2tZVjZwbnI3SzB1UHowUkdCZjItWWpjaExyNnd6o2NpZNkgVklNTGgwNFNLdjhxUjdXc2VwRUhNT3FrdGJSQlNVeTE' } */),
    page.click("text=Login"),
  ]);

  // Fill input[name="username"]
  await page.fill('input[name="username"]', testAuthData.LOGIN);

  // Click input[name="password"]
  await page.click('input[name="password"]');

  // Fill input[name="password"]
  await page.fill('input[name="password"]', testAuthData.PASSWORD);

  // Click button:has-text("Continue")
  await Promise.all([
    page.waitForNavigation(/* { url: 'http://localhost:3000/' } */),
    page.click('button:has-text("Continue")'),
  ]);
};

export const loginWithGoogle = async ({ page }: TestParams) => {
  // Go to /
  await page.goto(testAuthData.URL);

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
    testAuthData.LOGIN,
  );
  // Click button:has-text("Далее")
  await Promise.all([
    page.waitForNavigation(/* { url: 'https://accounts.google.com/signin/v2/challenge/pwd?login_hint&response_type=code&redirect_uri=https%3A%2F%2Flogin.us.auth0.com%2Flogin%2Fcallback&scope=email%20profile&state=n8xYkwcxbRy0TbhioEowcLaDwAoKBhUm&client_id=104565000066-q7q63bouq2ct8gj73drmpu186amn6a3f.apps.googleusercontent.com&flowName=GeneralOAuthFlow&cid=1&navigationDirection=forward&TL=AM3QAYZq7nx8YKprItrlvoTViq5YZC2HEuc1NeRa2BVV0ZsxYWQqJ4cxbB74WWE8' } */),
    page.click('button:has-text("Далее")'),
  ]);
  // Fill [aria-label="Введите\ пароль"]
  await page.fill('[aria-label="Введите\\ пароль"]', testAuthData.PASSWORD);
  // Click button:has-text("Далее")
  await Promise.all([
    page.waitForNavigation(/* { url: 'http://localhost:3000/' } */),
    page.click('button:has-text("Далее")'),
  ]);
};

export const mockAuth0Login = async ({ page }: TestParams) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  await page.route(`${testAuthData.URL}/api/auth/me`, (route) =>
    route.fulfill({ body: JSON.stringify(testAuthData.authMeResp) }),
  );
};

export const mockLoginWithEmail = async ({ page }: TestParams) => {
  await mockAuth0Login({ page });
};
