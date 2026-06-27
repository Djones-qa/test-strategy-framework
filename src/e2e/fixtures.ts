import { test as base, Page, BrowserContext } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

/**
 * Custom Playwright Fixtures
 * Extends the base test with reusable page objects and utilities.
 */

export interface TestFixtures {
  loginPage: LoginPage;
  authenticatedPage: Page;
}

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  authenticatedPage: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext({
      storageState: {
        cookies: [],
        origins: [
          {
            origin: process.env.BASE_URL || "http://localhost:3000",
            localStorage: [
              {
                name: "auth_token",
                value: "test-auth-token",
              },
            ],
          },
        ],
      },
    });

    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from "@playwright/test";
