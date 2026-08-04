import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

type PaymentMethod = "cash" | "card";
export class CheckoutPage extends BasePage {
  readonly path: string = "/checkout";
  private readonly checkoutForm: Locator;
  private readonly checkoutName: Locator;
  private readonly checkoutPhone: Locator;
  private readonly checkoutAddress: Locator;
  private readonly paymentMethods: Locator;
  private readonly checkoutBtn: Locator;
  private readonly checkoutSuccess: Locator;
  private readonly checkoutSuccessIcon: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutForm = this.page.locator(".checkout-form");
    this.checkoutName = this.checkoutForm.getByTestId("checkout-name");
    this.checkoutPhone = this.checkoutForm.getByTestId("checkout-phone");
    this.checkoutAddress = this.checkoutForm.getByTestId("checkout-address");
    this.paymentMethods = this.page.locator(".payment-methods");
    this.checkoutBtn = this.checkoutForm.locator(".btn-checkout");
    this.checkoutSuccess = this.page.locator(".checkout-success");
    this.checkoutSuccessIcon = this.checkoutSuccess.locator(".success-icon");
  }

  getPaymentOptionElement(method: PaymentMethod) {
    return this.paymentMethods.locator(`//input[@value="${method}"]//..`);
  }

  async fillReceiverInfos(name: string, phone: string, address: string) {
    await this.enterTxt(this.checkoutName, name);
    await this.enterTxt(this.checkoutPhone, phone);
    await this.enterTxt(this.checkoutAddress, address);
  }

  async selectPaymentMethod(method: PaymentMethod) {
    await this.clickOnElement(this.getPaymentOptionElement(method));
  }

  async isPaymentMethodSelected(method: PaymentMethod) {
    const allClassNames =
      await this.getPaymentOptionElement(method).getAttribute("class");
    return allClassNames?.includes("selected");
  }

  async clickOnCheckoutBtn() {
    await this.clickOnElement(this.checkoutBtn);
  }

  async isCheckoutStatusSuccess() {
    await this.checkoutSuccessIcon.waitFor();
    return (await this.checkoutSuccessIcon.count()) === 1;
  }

  async isCorrectCheckoutInfo(method: PaymentMethod, name: string, address: string) {
    const paymentText = method === "cash" ? "Tiền mặt khi nhận hàng" : "Thẻ";
    const isFoundName =
      (await this.checkoutSuccess
        .locator(`//*[contains(text(), "${name}")]`)
        .count()) === 1;
    const isFoundAddress =
      (await this.checkoutSuccess
        .locator(`//*[contains(text(), "${address}")]`)
        .count()) === 1;
    const isFoundPaymentMethod =
      (await this.checkoutSuccess
        .locator(`//*[contains(text(), "${paymentText}")]`)
        .count()) === 1;
    return isFoundName && isFoundAddress && isFoundPaymentMethod;
  }
}
