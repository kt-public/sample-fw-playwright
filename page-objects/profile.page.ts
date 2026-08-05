import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProfilePage extends BasePage {
  private readonly profileForm: Locator;
  private readonly profileName: Locator;
  private readonly profileSaveBtn: Locator;
  private readonly profileUpdateSuccess: Locator;

  constructor(page: Page) {
    super(page, "/profile");
    this.profileForm = this.page.locator(".pf-form");
    this.profileName = this.profileForm.getByTestId("profile-name");
    this.profileSaveBtn = this.profileForm.getByTestId("profile-save");
    this.profileUpdateSuccess = this.profileForm.getByTestId("profile-success");
  }

  async updateProfileName(name: string) {
    await this.enterTxt(this.profileName, name);
  }

  async clickOnSaveBtn() {
    await this.clickOnElement(this.profileSaveBtn);
  }

  async waitForUpdateSuccess() {
    await this.profileUpdateSuccess.waitFor();
  }
}
