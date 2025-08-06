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

  // 1. Validate payment amount based on plan type
  async validatePaymentAmount(planType: string) {
    const expectedAmounts: Record<string, string> = {
      'Value': '10,000',
      'Plus': '50,000',
      'Pro': '90,000',
    };
    const expected = expectedAmounts[planType];
    const actual = await this.paymentAmount.inputValue();
    if (actual === expected) {
      console.log(`Payment amount for ${planType} is correct: ${actual}`);
    } else {
      throw new Error(`Payment amount for ${planType} is incorrect. Expected: ${expected}, Actual: ${actual}`);
    }
  }

  // 2. Select Card Type from dropdown
  async selectCardType(cardType: string) {
    const card= cardType;
    console.log(`Card value: ${card}`);
    await this.cardTypeDropdown.selectOption(card);
    console.log(`Selected card type: ${cardType}`);
  }

  // 3. Set Name on Card
  async setNameOnCard(name: string) {
    await this.nameOnCard.fill(name);
    console.log(`Set Name on Card: ${name}`);
  }

  // 4. Set Card Number
  async setCardNumber(cardNumber: string) {
    await this.cardNumber.fill(cardNumber);
    console.log(`Set Card Number: ${cardNumber}`);
  }

  // 5. Set Security Code
  async setSecurityCode(code: string) {
    await this.securityCode.fill(code.trim());
    console.log(`Set Security Code: ${code}`);
  }

  // 6. Select Expiration Month from dropdown
  async selectExpirationMonth(month: string) {
    await this.expirationMonthDropdown.selectOption({ label: month });
    console.log(`Selected Expiration Month: ${month}`);
  }

  // 7. Set Expiration Year
  async setExpirationYear(year: string) {
    await this.expirationYear.fill(year);
    console.log(`Set Expiration Year: ${year}`);
  }

  // 8. Set Zipcode
  async setZipcode(zip: string) {
    await this.zipCode.fill(zip);
    console.log(`Set Zip Code to: ${zip}`);
  }

  // 9. Click Agree Checkbox
  async clickAgreeCheckbox() {
    await this.agreeCheckbox.check();
    console.log('Clicked Agree Checkbox');
  }

  // 10. Click Submit Button
  async clickSubmitButton() {
    await this.submitButton.click();
    console.log('Clicked Submit Button');
  }

  // 11. Click Previous Button
  async clickPreviousButton() {
    await this.previousButton.click();
    console.log('Clicked Previous Button');
  }

  /// Fill payment form fields from ApplicationFillData.json
  async fillPaymentFormFromJson() {
    const fs = require('fs');
    const path = require('path');
    const jsonPath = path.resolve('TestData/ApplicationFillData.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      if (data['Insurance Plan']) await this.validatePaymentAmount(data['Insurance Plan']);
      if (data['Card type']) await this.selectCardType(data['Card type']);
      if (data['Name']) await this.setNameOnCard(data['Name']);
      if (data['Card Number']) await this.setCardNumber(data['Card Number']);
      if (data['Security Code']) await this.setSecurityCode(data['Security Code']);
      if (data['Expiration Month']) await this.selectExpirationMonth(data['Expiration Month']);
      if (data['Expiration Year']) await this.setExpirationYear(data['Expiration Year']);
      if (data['Zip Code']) await this.setZipcode(data['Zip Code']);
      console.log('Filled payment form fields from ApplicationFillData.json');
      await this.clickAgreeCheckbox();
      await this.clickSubmitButton();
    } else {
      console.log('ApplicationFillData.json file not found.');
    }
  }

}
