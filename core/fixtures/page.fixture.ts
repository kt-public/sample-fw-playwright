import { test as base } from "@playwright/test";
import { BasePage } from "../../page-objects/base.page";

// Declare the types of your fixtures.
type MyFixtures = {
  basePage: BasePage;
};

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    // Set up the fixture.
    const registerStudentPage = new BasePage(page);

    // Use the fixture value in the test.
    await use(registerStudentPage);
  },
});

export { expect } from "@playwright/test";
