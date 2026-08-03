import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly url: string;
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = `${this.baseUrl}/login`;

    this.userName = this.page.getByTestId("login-username");
    this.password = this.page.getByTestId("login-password");
    this.loginBtn = this.page.getByTestId("login-submit");
  }

  async fillAccountInfos(userName: string, password: string) {
    await this.enterTxt(this.userName, userName);
    await this.enterTxt(this.password, password);
  }

  async login() {
    await this.clickOnElement(this.loginBtn);
  }

  async verifyNavigateToPage() {
    await expect(this.page).toHaveURL(`${this.baseUrl}/home`);
  }
}
