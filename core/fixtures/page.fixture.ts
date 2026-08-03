import { test as base } from "@playwright/test";
import { BasePage } from "../../page-objects/base.page";
import { LoginPage } from "@/page-objects/login.page";

// Declare the types of your fixtures.
type MyFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
};

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    // Set up the fixture.
    const registerStudentPage = new BasePage(page);

    // Use the fixture value in the test.
    await use(registerStudentPage);
  },
  loginPage: async ({ page}, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.openUrl(loginPage.path)
    await use(loginPage);
  }
});

export default test;

export { expect } from "@playwright/test";
