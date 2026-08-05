import test, { expect } from "@/core/fixtures/page.fixture";
import * as allure from "allure-js-commons";
import accounts from "@/data/accounts.json";
import receivers from "@/data/receivers.json";

test.describe("Checkout Page Tests", { tag: "@checkout" }, () => {
  const { username, password } = accounts[1];
  const { name, phone, address } = receivers[0];

  test.beforeEach(async ({ loginApi, cartApi, loginPage, productPage }) => {
    await allure.step("Execute api to clean up cart", async () => {
      const token = await loginApi.getAuthToken(username, password);
      await cartApi.clearCart(token);
    });

    await allure.step("Login into app", async () => {
      await loginPage.handleLoginSteps(username, password);
      await expect(productPage.page).toHaveURL(productPage.pageUrl);
    });
  });

  test(
    "Ex5 - Checkout single product with cash method successfully",
    { tag: "@ex5" },
    async ({ productPage, cartPage, checkoutPage }) => {
      const paymentMethod = "cash";

      await allure.step("Add first product into cart", async () => {
        const result = await productPage.addFirstProductToCartSteps();
        expect(result).toBe(true);
      });

      await allure.step("Go to cart page", async () => {
        await productPage.clickOnHeaderCartBtn();
      });

      await allure.step("Click on checkout button in cart page", async () => {
        await cartPage.clickOnCheckoutBtn();
      });

      await allure.step(
        "Input receiver information in checkout page",
        async () => {
          await checkoutPage.fillReceiverInfos(name, phone, address);
        },
      );

      await allure.step("Select cash as payment method", async () => {
        await checkoutPage.selectPaymentMethod(paymentMethod);
      });

      await allure.step(
        "Verify if payment method is select correctly",
        async () => {
          await expect(
            await checkoutPage.isPaymentMethodSelected(paymentMethod),
          ).toBe(true);
        },
      );

      await allure.step("Click on checkout to complete payment", async () => {
        await checkoutPage.clickOnCheckoutBtn();
      });

      await allure.step(
        "Verify if checkout information is submitted correctly",
        async () => {
          await expect(await checkoutPage.isCheckoutStatusSuccess()).toBe(true);
          await expect(
            await checkoutPage.isCorrectCheckoutInfo(paymentMethod, name, address),
          ).toBe(true);
        },
      );
    },
  );
});
