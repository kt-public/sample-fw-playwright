import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  readonly path: string;
  private readonly cartItems: Locator;
  private readonly cartItem: Locator;
  private readonly cartSummary: Locator;
  private readonly summaryTotal: Locator;

  constructor(page: Page) {
    super(page);
    this.path = `/cart`;
    this.cartItems = this.page.locator(".cart-items");
    this.cartItem = this.cartItems.locator(".cart-item");
    this.cartSummary = this.page.locator(".cart-summary");
    this.summaryTotal = this.cartSummary.locator(".summary-total span").last();
  }

  async openPage() {
    await this.openUrl(this.path);
  }

  async verifyOnCartPage() {
    await expect(this.page).toHaveURL(`${this.baseUrl}${this.path}`);
  }

  async countCartItem() {
    return await this.cartItem.count();
  }

  async getSummaryTotalStr() {
    return await this.summaryTotal.textContent();
  }
}
