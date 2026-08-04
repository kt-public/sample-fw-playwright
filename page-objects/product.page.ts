import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
  readonly path: string = "/home";
  private readonly productCard: Locator;
  private readonly addProductBtn: Locator;
  private readonly headerCartBtn: Locator;
  private readonly headerCartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.productCard = this.page.locator(".product-card");
    this.addProductBtn = this.productCard.locator("button.add-to-cart");
    this.headerCartBtn = this.page.locator("button.cart-btn");
    this.headerCartBadge = this.headerCartBtn
      .locator(".cart-badge");
  }

  getAddProductBtnByName(productName: string) {
    return this.productCard.locator(
      `//h3[@class="product-name"][text()="${productName}"]`,
    );
  }

  getProductPriceElement(parentLocator: Locator) {
    return parentLocator.locator(".product-price")
  }

  async addFirstProductToCart() {
    const firstAddProductBtn = this.addProductBtn.first();
    await firstAddProductBtn.click();
  }

  async getHeaderCartQuantity() {
    let quantity = 0;
    if (await this.headerCartBadge.count() > 0) {
      quantity = Number(await this.headerCartBadge.textContent());
    }
    return isNaN(quantity) ? 0 : Number(quantity);
  }

  async getFirstProductPriceStr() {
    return await this.getProductPriceElement(this.productCard.first()).textContent();
  }

  async clickOnHeaderCartBtn() {
    await this.clickOnElement(this.headerCartBtn);
  }

  async addFirstProductToCartSteps() {
    const cartBadgeQuantity = await this.getHeaderCartQuantity();
    await this.addFirstProductToCart();
    const afterCartBadgeQuantity = await this.getHeaderCartQuantity();
    await expect(afterCartBadgeQuantity).toBe(cartBadgeQuantity + 1);
  }
}
