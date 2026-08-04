import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
  readonly path: string = "/checkout";

  constructor(page: Page) {
    super(page);
  }
}
