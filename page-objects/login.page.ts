import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page, "/login");
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

  async handleLoginSteps(userName: string, password: string) {
    await this.fillAccountInfos(userName, password);
    await this.login();
  }
}
