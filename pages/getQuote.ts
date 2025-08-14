import { Page, Locator } from '@playwright/test';

export class GetQuotePage {

  
  // Adults controls (Family)
  readonly adultsMinusButton: Locator;
  readonly adultsPlusButton: Locator;
  readonly adultsCountInput: Locator;
  // Children controls (Family)
  readonly childrenMinusButton: Locator;
  readonly childrenPlusButton: Locator;
  readonly childrenCountInput: Locator;
  // Get Quote results cards and Select buttons
  readonly getQuoteResultsSection: Locator;
  readonly valueCard: Locator;
  readonly plusCard: Locator;
  readonly proCard: Locator;
  readonly valueCardSelectButton: Locator;
  readonly plusCardSelectButton: Locator;
  readonly proCardSelectButton: Locator;
  // Stepper circle locators (above the form)
  readonly getQuoteCircle: Locator;
  readonly getQuoteCircle2: Locator;
  readonly completeApplicationCircle: Locator;
  readonly summaryPageCircle: Locator;
  readonly paymentAmountCircle: Locator;
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

  constructor(page: Page) {
    this.page = page;
    // Progress indicator/stepper (not interactable)
    this.progressIndicator = page.locator('//div[contains(@class, "stepper")]');
    this.getQuoteStep = page.locator('//div[contains(@class, "stepper")]//div[contains(text(), "Get Quote")]');
    this.completeApplicationStep = page.locator('//div[contains(@class, "stepper")]//div[contains(text(), "Complete Application")]');
    this.paymentMethodStep = page.locator('//div[contains(@class, "stepper")]//div[contains(text(), "Payment Method")]');
    this.paymentSuccessStep = page.locator('//div[contains(@class, "stepper")]//div[contains(text(), "Payment Success")]');
    // Cards are identified by their container divs (by id), and their title and select button are children
    this.valueCard = page.locator('//*[@id="basicHtml"]');
    this.plusCard = page.locator('//*[@id="essentialHtml"]');
    this.proCard = page.locator('//*[@id="preferredHtml"]');
    this.valueCardSelectButton = page.locator('#btnBasic span');
    this.plusCardSelectButton = page.locator('#btnEssential span');
    this.proCardSelectButton = page.locator('#btnPreffered span');
    
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
    this.nextButton = page.locator('//*[@id="nav-next-btn"]');

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

    // Stepper circles (above the form)
    this.getQuoteCircle = page.locator('//*[@id="nav-navigate-to-0"]/div[1]');
    this.getQuoteCircle2 = page.locator('//*[@id="nav-navigate-to-0"]');
    this.completeApplicationCircle = page.locator('//*[@id="nav-navigate-to-1"]/div[1]');
    this.summaryPageCircle = page.locator('//*[@id="nav-navigate-to-2"]/div[1]');
    this.paymentAmountCircle = page.locator('//*[@id="nav-navigate-to-2"]/div[1]');
  }


  // Select Trip Type radio
  async selectTripType(type: 'Single Trip' | 'Annual Trip') {
    if (type === 'Single Trip') {
      await this.tripTypeSingleRadio.check();
    } else {
      await this.tripTypeAnnualRadio.check();
    }
  }

  // Select Travel Type radio
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
      console.log('Clicked Increase Adults button '+(i+1));
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
    // Wait for 2 seconds after entering dates
    await this.page.waitForTimeout(500);
    // Close the calendar popup if open by pressing Escape
    await this.page.keyboard.press('Escape');  
    await this.page.waitForTimeout(500);  
    await this.endDateInput.fill(endDate);
    // Wait for 2 seconds after entering dates
    await this.page.waitForTimeout(500);
    // Close the calendar popup if open by pressing Escape
    await this.page.keyboard.press('Escape');
  }

  
  // 6. Click Get Quote button
  async clickGetQuote() {
    await this.getQuoteButton.click();
  }

  // 7. Click Next button
  async clickNext() {
    await this.nextButton.click();
    await this.page.waitForTimeout(3000);
    console.log('Waited 3 seconds after clicking Next button');
  }
  
  // Fetch and display the color of the circles in the step display bar
  async logStepCircleColors() {
    // Log the color of each stepper circle using explicit locators
    const steps = [
      { name: 'Get Quote', locator: this.getQuoteCircle },
      { name: 'Complete Application', locator: this.completeApplicationCircle },
      { name: 'Summary Page', locator: this.summaryPageCircle },
      { name: 'Payment Amount', locator: this.paymentAmountCircle },
    ];
    let lastSelectedStep: string | null = null;
    for (const step of steps) {
      try {
        const handle = await step.locator.elementHandle();
        if (handle) {
          const color = await handle.evaluate(el => {
            const style = window.getComputedStyle(el as Element);
            return style.backgroundColor || style.borderColor;
          });
          let selectedMsg = '';
          if (color === 'rgba(0, 0, 0, 0)') {
            lastSelectedStep = step.name;
            selectedMsg = ' (SELECTED)';
          }
          console.log(`Step circle for '${step.name}' color:`, color + selectedMsg);
        } else {
          console.log(`Step circle for '${step.name}' not found.`);
        }
      } catch (err) {
        console.log(`Error fetching color for '${step.name}':`, err?.message || err);
      }
    }
    if (lastSelectedStep) {
      console.log(`Name of the last selected circle: ${lastSelectedStep}`);
    } else {
      console.log('No step is currently selected (no circle with rgba(0, 0, 0, 0) color).');
    }
  }


  // Check if Get Quote button is hidden
  async isGetQuoteButtonHidden() {
    // Check if Get Quote button is not visible
    return (await this.getQuoteButton.isHidden());
  }

  // Check if results cards are visible
  async areResultsCardsVisible() {
    // Check if all three card titles are visible
    const valueVisible = await this.valueCard.isVisible();
    console.log('Value card visible:', valueVisible);
    const plusVisible = await this.plusCard.isVisible();
    console.log('Plus card visible:', plusVisible);
    const proVisible = await this.proCard.isVisible();
    console.log('Pro card visible:', proVisible);
    return valueVisible && plusVisible && proVisible;
  }

  // Select a card by title ("Value", "Plus", "Pro")
  async selectCardByTitle(title: 'Value' | 'Plus' | 'Pro') {
    let cardButton;
    if (title === 'Value') cardButton = this.valueCardSelectButton;
    else if (title === 'Plus') cardButton = this.plusCardSelectButton;
    else cardButton = this.proCardSelectButton;
    await cardButton.scrollIntoViewIfNeeded();
    await cardButton.click();
  }

  // Fill Get Quote form fields from ApplicationFillData.json
  async fillGetQuoteFormFromJson() {
    const fs = require('fs');
    const path = require('path');
    const jsonPath = path.resolve('TestData/ApplicationFillData.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      if (data['Trip Type']) await this.selectTripType(data['Trip Type']);
      if (data['Travel Type']) await this.selectTravelType(data['Travel Type']);
      if (data['Travel Type'] === 'Family') {
      if (data['No of Adults']) await this.increaseAdults(Number(data['No of Adults']) - 1); // assuming default is 1
      if (data['No of Children']) await this.increaseChildren(Number(data['No of Children']));
      }
      else 
      {
        if (data['No of Individuals']) await this.increaseIndividuals(Number(data['No of Individuals']) - 1); 
      }
      if (data['Area']) await this.areaDropdown.selectOption({ label: data['Area'] });
      if (data['Start Date'] && data['End Date']) await this.selectDates(data['Start Date'], data['End Date']);
      await this.getQuoteButton.scrollIntoViewIfNeeded();
      await this.clickGetQuote();
      if (data['Insurance Plan']) 
        {
          await this.valueCard.scrollIntoViewIfNeeded();
          await this.selectCardByTitle(data['Insurance Plan']);
      console.log('Filled Get Quote form fields from ApplicationFillData.json');
        } else {
      console.log('ApplicationFillData.json file not found.');
       }
       await this.clickNext();
  }
}
}
