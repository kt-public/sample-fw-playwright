import { test as base } from "@playwright/test";
import { BasePage } from "@/page-objects/base.page";
import { LoginPage } from "@/page-objects/login.page";
import { ProductPage } from "@/page-objects/product.page";
import { CartPage } from "@/page-objects/cart.page";
import { CheckoutPage } from "@/page-objects/checkout.page";
import { ProfilePage } from "@/page-objects/profile.page";

import { LoginApi } from "@/apis/login.api";
import { ProfileApi } from "@/apis/profile.api";
import { CartApi } from "@/apis/cart.api";

// Declare the types of your fixtures.
type MyFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  profilePage: ProfilePage;

  loginApi: LoginApi;
  profileApi: ProfileApi;
  cartApi: CartApi;
};

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    // Set up the fixture.
    const registerStudentPage = new BasePage(page);

    // Use the fixture value in the test.
    await use(registerStudentPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.openUrl(loginPage.path);
    await use(loginPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);

    await profilePage.openUrl(profilePage.path);
    await use(profilePage);
  },

  loginApi: async ({ request }, use) => {
    const loginApi = new LoginApi(request);
    await use(loginApi);
  },
  profileApi: async ({ request }, use) => {
    const profileApi = new ProfileApi(request);
    await use(profileApi);
  },
  cartApi: async ({ request }, use) => {
    const cartApi = new CartApi(request);
    await use(cartApi);
  },
});

export default test;

export { expect } from "@playwright/test";
