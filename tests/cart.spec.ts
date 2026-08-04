import test, { expect } from "@/core/fixtures/page.fixture";
import * as allure from "allure-js-commons";
import accounts from "@/data/accounts.json";

test.describe("Cart Tests", { tag: "@cart" }, () => {
  const { username, password } = accounts[1];

  test.beforeEach(async ({ loginApi, cartApi, loginPage }) => {
    // execute api to clean up cart
    const token = await loginApi.getAuthToken(username, password);
    await cartApi.clearCart(token);
    // login into app
    await loginPage.handleLoginSteps(username, password);
  });

  test("Ex2 - Add single product into cart successfully", { tag: "@ex2"}, async ({
    productPage,
    cartPage,
  }) => {
    let cartBadgeQuantity: number;
    let afterCartBadgeQuantity: number;
    let productPriceStr: string | null;
    await allure.step(
      "Capture the number of product (cart badge) before adding",
      async () => {
        cartBadgeQuantity = await productPage.getHeaderCartQuantity();
      },
    );

    await allure.step("Add first product to cart", async () => {
      productPriceStr = await productPage.getFirstProductPriceStr();
      await productPage.addFirstProductToCart();
    });

    await allure.step(
      "Verify the number of product (cart badge) is increased",
      async () => {
        afterCartBadgeQuantity = await productPage.getHeaderCartQuantity();
        await expect(afterCartBadgeQuantity).toBe(cartBadgeQuantity + 1);
      },
    );

    await allure.step("Open cart page", async () => {
      await cartPage.openPage();
      await cartPage.verifyNavigateToCartPage();
    });

    await allure.step(
      "Verify the number of cart item and total price",
      async () => {
        await expect(await cartPage.countCartItem()).toBe(
          afterCartBadgeQuantity,
        );
        await expect(await cartPage.getSummaryTotalStr()).toBe(productPriceStr);
      },
    );
  });
});
