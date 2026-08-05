import test, { expect } from "@/core/fixtures/page.fixture";
import * as allure from "allure-js-commons";
import accounts from "@/data/accounts.json";

test.describe("Profile Page Tests", { tag: "@profile" }, () => {
  const { username, password, name } = accounts[1];

  test.beforeEach(async ({ loginPage, productPage }) => {
    await allure.step("Login into app", async () => {
      await loginPage.handleLoginSteps(username, password);
      await expect(productPage.page).toHaveURL(productPage.pageUrl);
    });
  });

  test.afterEach(async ({ loginApi, profileApi }) => {
    await allure.step(
      "Execute Api to reset profile name as before testing",
      async () => {
        const token = await loginApi.getAuthToken(username, password);
        const result = await profileApi.updateProfile(name, token);

        await expect(result).toBe(true);
      },
    );
  });

  test(
    "Ex6 - Update profile name successfully",
    { tag: "@ex6" },
    async ({ productPage, profilePage }) => {
      const newName = "Customer User B";

      await allure.step("Update new name in profile page", async () => {
        await profilePage.updateProfileName(newName);
      });

      await allure.step("Click on save button", async () => {
        await profilePage.clickOnSaveBtn();
        await profilePage.waitForUpdateSuccess();
      });

      await allure.step("Navigate to home/product page", async () => {
        await productPage.openUrl(productPage.path);
        await expect(productPage.page).toHaveURL(productPage.pageUrl);
      });

      await allure.step(
        "Verify if new name is displayed in header correctly",
        async () => {
          await expect(
            await productPage.isCorrectProfileNameOnHeader(newName),
          ).toBe(true);
        },
      );
    },
  );
});
