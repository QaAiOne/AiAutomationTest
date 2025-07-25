import { Page, Locator } from '@playwright/test';

export class PaymentAmountPage {
  readonly page: Page;
  readonly paymentAmount: Locator;
  readonly cardTypeDropdown: Locator;
  readonly nameOnCard: Locator;
  readonly expirationMonthDropdown: Locator;
  readonly cardNumber: Locator;
  readonly expirationYear: Locator;
  readonly securityCode: Locator;
  readonly zipCode: Locator;
  readonly agreeCheckbox: Locator;
  readonly submitButton: Locator;
  readonly previousButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentAmount = page.locator('input#paymentAmountNumber');
    this.cardTypeDropdown = page.locator('select#cardType');
    this.nameOnCard = page.locator('input#nameCard');
    this.expirationMonthDropdown = page.locator('select#expirationMonth');
    this.cardNumber = page.locator('input#cardNumber');
    this.expirationYear = page.locator('input#expirationYear');
    this.securityCode = page.locator('input#securityCode');
    this.zipCode = page.locator('input#zipCode');
    this.agreeCheckbox = page.locator('input#agree');
    this.submitButton = page.locator('button#btnSubmit');
    this.previousButton = page.locator('button#nav-prev-btn');
  }
}
