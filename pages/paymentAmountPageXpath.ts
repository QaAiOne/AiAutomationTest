import { Page, Locator } from '@playwright/test';

export class PaymentAmountPageXpath {
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
    this.paymentAmount = page.locator('//input[@id="paymentAmountNumber"]');
    this.cardTypeDropdown = page.locator('//select[@id="cardType"]');
    this.nameOnCard = page.locator('//input[@id="nameCard"]');
    this.expirationMonthDropdown = page.locator('//select[@id="expirationMonth"]');
    this.cardNumber = page.locator('//input[@id="cardNumber"]');
    this.expirationYear = page.locator('//input[@id="expirationYear"]');
    this.securityCode = page.locator('//input[@id="securityCode"]');
    this.zipCode = page.locator('//input[@id="zipCode"]');
    this.agreeCheckbox = page.locator('//input[@id="agree"]');
    this.submitButton = page.locator('//button[@id="btnSubmit"]');
    this.previousButton = page.locator('//button[@id="nav-prev-btn"]');
  }
}
