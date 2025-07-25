import { Page, Locator } from '@playwright/test';

export class GetQuotePage {
  // For Individual travel type
  readonly individualsMinusButton: Locator;
  readonly individualsPlusButton: Locator;
  readonly individualsCountInput: Locator;
  readonly page: Page;
  // Progress indicator/stepper elements (not interactable)
  readonly progressIndicator: Locator;
  readonly getQuoteStep: Locator;
  readonly completeApplicationStep: Locator;
  readonly paymentMethodStep: Locator;
  readonly paymentSuccessStep: Locator;

  // Web elements on the first page (Get Quote)
  readonly travelInsurancePlanHeader: Locator;
  readonly tripTypeSingleRadio: Locator;
  readonly tripTypeAnnualRadio: Locator;
  readonly travelTypeIndividualRadio: Locator;
  readonly travelTypeFamilyRadio: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly areaDropdown: Locator;
  readonly getQuoteButton: Locator;
  readonly nextButton: Locator;

  // Additional elements for actions
  readonly adultsMinusButton: Locator;
  readonly adultsPlusButton: Locator;
  readonly adultsCountInput: Locator;
  readonly childrenMinusButton: Locator;
  readonly childrenPlusButton: Locator;
  readonly childrenCountInput: Locator;
  // ...existing code...

  constructor(page: Page) {
    this.page = page;
    // Progress indicator/stepper (not interactable)
    this.progressIndicator = page.locator('//div[contains(@class, "stepper")]');
    this.getQuoteStep = page.locator('//div[contains(@class, "stepper")]//div[contains(text(), "Get Quote")]');
    this.completeApplicationStep = page.locator('//div[contains(@class, "stepper")]//div[contains(text(), "Complete Application")]');
    this.paymentMethodStep = page.locator('//div[contains(@class, "stepper")]//div[contains(text(), "Payment Method")]');
    this.paymentSuccessStep = page.locator('//div[contains(@class, "stepper")]//div[contains(text(), "Payment Success")]');

    // Main page elements (from actual UI)
    //this.travelInsurancePlanHeader = page.locator('//h2[contains(text(), "Travel Insurance Plan")]');
    this.travelInsurancePlanHeader = page.locator('//*[text()="Travel Insurance Plan"]');
    this.tripTypeSingleRadio = page.locator('//input[@type="radio" and @id="tripType-Basic Plan"]');
    this.tripTypeAnnualRadio = page.locator('//input[@type="radio" and @id="tripType-Preferred Plan"]');
    this.travelTypeIndividualRadio = page.locator('//input[@type="radio" and @id="travelType-INDV"]');
    this.travelTypeFamilyRadio = page.locator('//input[@type="radio" and @id="travelType-FAM"]');
    this.startDateInput = page.locator('//input[@id="dailyStartDate"]');
    this.endDateInput = page.locator('//input[@id="dailyEndDate"]');
    this.areaDropdown = page.locator('#visiting');
    this.getQuoteButton = page.locator('//button[contains(., "Get Quote")]');
    this.nextButton = page.locator('//button[contains(., "Next")]');

    this.adultsMinusButton = page.locator('//label[contains(text(), "No of Adults")]/following-sibling::div//button[contains(@class, "stepper-view-subtract")]');
    this.adultsPlusButton = page.locator('//label[contains(text(), "No of Adults")]/following-sibling::div//button[contains(@class, "stepper-view-add")]'); 
    this.adultsCountInput = page.locator('//label[contains(text(), "No of Adults")]/following-sibling::div//div');
    // Children controls (always defined, but only visible for Family travel type)
    this.childrenMinusButton = page.locator('//label[contains(text(), "No of Children")]/following-sibling::div//button[contains(@class, "stepper-view-subtract")]');
    this.childrenPlusButton = page.locator('//label[contains(text(), "No of Children")]/following-sibling::div//button[contains(@class, "stepper-view-add")]');
    this.childrenCountInput = page.locator('//label[contains(text(), "No of Children")]/following-sibling::div/div');

    // Individuals controls (only visible for Individual travel type)
    this.individualsMinusButton = page.locator('//label[contains(text(), "No of Individuals")]/following-sibling::div//button[contains(@class, "stepper-view-subtract")]');
    this.individualsPlusButton = page.locator('//label[contains(text(), "No of Individuals")]/following-sibling::div//button[contains(@class, "stepper-view-add")]');
    this.individualsCountInput = page.locator('//label[contains(text(), "No of Individuals")]/following-sibling::div//div');
    // Removed duplicate/conflicting areaDropdown assignment
    this.startDateInput = page.locator('//input[@id="dailyStartDate"]');
    this.endDateInput = page.locator('//input[@name="endDate" or @placeholder="End Date"]');
    this.getQuoteButton = page.locator('//button[contains(text(), "Get Quote")]');
  }

  // 1. Select Trip Type radio
  async selectTripType(type: 'Single Trip' | 'Annual Trip') {
    if (type === 'Single Trip') {
      await this.tripTypeSingleRadio.check();
    } else {
      await this.tripTypeAnnualRadio.check();
    }
  }

  // 1. Select Travel Type radio
  async selectTravelType(type: 'Individual' | 'Family') {
    if (type === 'Individual') {
      await this.travelTypeIndividualRadio.check();
    } else {
      await this.travelTypeFamilyRadio.check();
    }
  }

  // 2. Increase No of Adults (Family)
  async increaseAdults(count: number) {
    for (let i = 0; i < count; i++) {
      await this.adultsPlusButton.click();
       console.log('Clicked Increase Adults button'+i+1);
    }
  }
  // 2. Decrease No of Adults (Family, cannot go below 1)
  async decreaseAdults(count: number) {
    for (let i = 0; i < count; i++) {
      const value = await this.adultsCountInput.innerText();
      if (parseInt(value) > 1) {
        await this.adultsMinusButton.click();
      } else {
        break;
      }
    }
  }
  // 2. Increase No of Children (Family)
  async increaseChildren(count: number) {
    for (let i = 0; i < count; i++) {
      await this.childrenPlusButton.click();
    }
  }
  // 2. Decrease No of Children (Family, cannot go below 1)
  async decreaseChildren(count: number) {
    for (let i = 0; i < count; i++) {
      const value = await this.childrenCountInput.innerText();
      if (parseInt(value) > 1) {
        await this.childrenMinusButton.click();
      } else {
        break;
      }
    }
  }

  // 2. Increase No of Individuals (Individual)
  async increaseIndividuals(count: number) {
    for (let i = 0; i < count; i++) {
      await this.individualsPlusButton.click();
    }
  }
  // 2. Decrease No of Individuals (Individual, cannot go below 1)
  async decreaseIndividuals(count: number) {
    for (let i = 0; i < count; i++) {
      const value = await this.individualsCountInput.innerText();
      if (parseInt(value) > 1) {
        await this.individualsMinusButton.click();
      } else {
        break;
      }
    }
  }

  // 3. Log Area dropdown options
  async logAreaDropdownOptions() {
    const options = await this.areaDropdown.locator('option').allTextContents();
    console.log('Area dropdown options:', options);
  }

  // 4. Select random Area option
  async selectRandomAreaOption() {
    const options = await this.areaDropdown.locator('option').all();
    const count = options.length;
    if (count > 1) {
      // skip first if it's a placeholder
      const randomIndex = Math.floor(Math.random() * (count - 1)) + 1;
      const value = await options[randomIndex].getAttribute('value');
      console.log('Randomly selected area option index:', randomIndex, 'value:', value);
      await this.areaDropdown.selectOption(value || '');
    } else if (count === 1) {
      const value = await options[0].getAttribute('value');
      await this.areaDropdown.selectOption(value || '');
    }
  }

  // 5. Select Start and End Date
  async selectDates(startDate: string, endDate: string) {
    await this.startDateInput.fill(startDate);
    await this.endDateInput.fill(endDate);
  }

  // 6. Click Get Quote button
  async clickGetQuote() {
    await this.getQuoteButton.click();
  }

  // 7. Click Next button
  async clickNext() {
    await this.nextButton.click();
  }
}
