import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  private readonly loginForm: Locator;
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page, "/login");
    this.loginForm = this.page.locator(".login-form");
    this.userName = this.loginForm.getByTestId("login-username");
    this.password = this.loginForm.getByTestId("login-password");
    this.loginBtn = this.loginForm.getByTestId("login-submit");
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

  async isPresentErrorMessage(expectedErrorMessage: string) {
    return await this.loginForm
        .locator(`//*[contains(text(), "${expectedErrorMessage}")]`)
        .isVisible();
  }
}
