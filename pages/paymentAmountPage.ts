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

  // Fetch and log values from ApplicationData.json
  async logApplicationDataFromJson() {
    const fs = require('fs');
    const path = require('path');
    const jsonPath = path.resolve('ApplicationData.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      const values = Object.values(data);
      console.log('ApplicationData.json values:', values);
    } else {
      console.log('ApplicationData.json file not found.');
    }
  }

  // Read ApplicationData.json and fill the payment form fields
  async fillFormFromJson() {
    const fs = require('fs');
    const path = require('path');
    const jsonPath = path.resolve('ApplicationData.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      if (data.paymentAmount) await this.paymentAmount.fill(data.paymentAmount);
      if (data.cardType) await this.cardTypeDropdown.selectOption(data.cardType);
      if (data.nameOnCard) await this.nameOnCard.fill(data.nameOnCard);
      if (data.expirationMonth) await this.expirationMonthDropdown.selectOption(data.expirationMonth);
      if (data.cardNumber) await this.cardNumber.fill(data.cardNumber);
      if (data.expirationYear) await this.expirationYear.fill(data.expirationYear);
      if (data.securityCode) await this.securityCode.fill(data.securityCode);
      if (data.zipCode) await this.zipCode.fill(data.zipCode);
      if (data.agreeChecked) {
        const checked = await this.agreeCheckbox.isChecked();
        if (!checked) await this.agreeCheckbox.check();
      }
    } else {
      console.log('ApplicationData.json file not found.');
    }
  }

  }
