import { test, expect } from "../../src/e2e/fixtures";

test.describe("Login Page", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("should display login form", async ({ loginPage }) => {
    await loginPage.expectOnLoginPage();
  });

  test("should login with valid credentials", async ({ loginPage }) => {
    await loginPage.login("testuser", "testpass");
    await loginPage.expectSuccess();
  });

  test("should show error with invalid credentials", async ({ loginPage }) => {
    await loginPage.login("invalid", "invalid");
    await loginPage.expectError("Invalid credentials");
  });

  test("should show error with empty username", async ({ loginPage }) => {
    await loginPage.login("", "testpass");
    await loginPage.expectError("Username is required");
  });

  test("should show error with empty password", async ({ loginPage }) => {
    await loginPage.login("testuser", "");
    await loginPage.expectError("Password is required");
  });

  test("should have forgot password link", async ({ loginPage }) => {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test("should be accessible", async ({ page, loginPage }) => {
    await loginPage.navigate();
    // Basic accessibility checks
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // Form labels should be associated with inputs
    await expect(loginPage.usernameInput).toHaveAttribute("id");
    await expect(loginPage.passwordInput).toHaveAttribute("id");
  });
});
