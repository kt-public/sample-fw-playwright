import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  readonly path: string;

  constructor(page: Page) {
    super(page);
    this.path = `/cart`;
  }
}
