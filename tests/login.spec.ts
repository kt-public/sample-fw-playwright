import test, { expect } from "@/core/fixtures/page.fixture";
import { ReportUtils } from "@/core/utils/report.util";
import * as allure from "allure-js-commons";
import accounts from "@/data/accounts.json";

test.describe("Login Page Tests", { tag: "@login" }, () => {
  const { username, password } = accounts[0];

  /* test.beforeAll(async ({ registerApi }) => {
    const registerUser = accounts[1];
    const result = await registerApi.registerAccount(registerUser.username, registerUser.password, registerUser.name);
    expect(result).toBeTruthy();
  }); */

  test("Login fail when leave username or password empty", async ({
    page,
    loginPage,
  }) => {
    await allure.step("Clear input username and password", async () => {
      await ReportUtils.attachScreenshot(
        "should clear username and password",
        page,
        async () => {
          await loginPage.fillAccountInfos("", "");
        },
      );
    });

    await allure.step(
      "Verify login failure with present error message",
      async () => {
        await ReportUtils.attachScreenshot(
          "should see error message",
          page,
          async () => {
            const expectedErrorMessage =
              "Vui lòng nhập đầy đủ tài khoản và mật khẩu";
            await loginPage.login();
            await expect(
              loginPage.isPresentErrorMessage(expectedErrorMessage),
            ).toBeTruthy();
          },
        );
      },
    );
  });

  test("Login successfully with valid admin user", async ({
    page,
    loginPage,
    productPage,
  }) => {
    await allure.step("Input username and password", async () => {
      await ReportUtils.attachScreenshot(
        "should input username and password",
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
          await expect(productPage.page).toHaveURL(productPage.pageUrl);
        },
      );
    });
  });
});
