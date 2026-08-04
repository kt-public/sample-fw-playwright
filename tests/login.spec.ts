import test, { expect } from "@/core/fixtures/page.fixture";
import { ReportUtils } from "@/core/utils/report.util";
import * as allure from "allure-js-commons";
import accounts from "@/data/accounts.json";

test.describe("Login Tests", { tag: "@login" }, () => {
  const { username, password } = accounts[0]

  test("Login successfully with valid username and password", async ({
    page, loginPage,
  }) => {
    await allure.step("Input login information", async () => {
      await ReportUtils.attachScreenshot(
        "should input correct infos",
        page,
        async () => {
          await loginPage.fillAccountInfos(username, password);
        },
      );
    });

    await allure.step("Verify successful login", async () => {
      await ReportUtils.attachScreenshot(
        "should see home page",
        page,
        async () => {
          await loginPage.login();
          await loginPage.verifyNavigateToHomePage();
        },
      );
    });
  });
});
