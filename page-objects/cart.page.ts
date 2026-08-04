import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  readonly path: string;
  readonly pageUrl: string;
  private readonly cartItems: Locator;
  private readonly cartItem: Locator;
  private readonly cartSummary: Locator;
  private readonly summaryTotal: Locator;
  private readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.path = `/cart`;
    this.pageUrl = `${this.baseUrl}${this.path}`;
    this.cartItems = this.page.locator(".cart-items");
    this.cartItem = this.cartItems.locator(".cart-item");
    this.cartSummary = this.page.locator(".cart-summary");
    this.summaryTotal = this.cartSummary.locator(".summary-total span").last();
    this.checkoutBtn = this.cartSummary.locator(".checkout-btn")
  }

  async openPage() {
    await this.openUrl(this.path);
  }

  async countCartItem() {
    return await this.cartItem.count();
  }

  async getSummaryTotalStr() {
    return await this.summaryTotal.textContent();
  }

  async clickOnCheckoutBtn() {
    await this.clickOnElement(this.checkoutBtn);
  }
}
