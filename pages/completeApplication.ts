import { Page, Locator, expect } from '@playwright/test';

export class CompleteApplicationPage {

  readonly page: Page;
  // Example locators for Complete Application page elements
  readonly completeApplicationHeader: Locator;
  readonly salutationDropdown: Locator;
  readonly dateOfBirthInput: Locator;
  readonly identityTypeDropdown: Locator;
  readonly aadharNumberInput: Locator;
  readonly panNumberInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly nationalityDropdown: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly genderDropdown: Locator;
  readonly addressInput: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly saveAndExitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Header for Complete Application step
    this.completeApplicationHeader = page.locator('//*[contains(text(), "Please complete your application")]');
    this.salutationDropdown = page.locator('select#salutation');
    this.dateOfBirthInput = page.locator('input#dateOfBirth');
    this.identityTypeDropdown = page.locator('select#identity');
    this.aadharNumberInput = page.locator('input#aadharNumber');
    this.panNumberInput = page.locator('input#panNumber');
    this.mobileNumberInput = page.locator('input#mobileNumber');
    this.nationalityDropdown = page.locator('select#nationality');
    this.nameInput = page.locator('input#name');
    this.emailInput = page.locator('input#email');
    this.genderDropdown = page.locator('select#gender');
    this.addressInput = page.locator('input#react-select-2-input');
    this.previousButton = page.locator('button#nav-prev-btn');
    this.nextButton = page.locator('button#nav-next-btn');
    this.saveAndExitButton = page.locator('button#nav-save-draft-btn');
  }
  
  // 1. Display the list of options in the salutation Dropdown, log them in console
  async logSalutationOptions() {
    const options = await this.salutationDropdown.locator('option').allTextContents();
    console.log('Salutation options:', options);
    return options;
  }

  // 2. Select any of the dropdown options randomly for salutationDropdown
  async selectRandomSalutationOption() {
    const options = await this.salutationDropdown.locator('option').all();
    if (options.length <= 1) throw new Error('Not enough options to select a random salutation (excluding first option)');
    // Exclude the first option (usually a placeholder like 'Select...')
    const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
    const value = await options[randomIndex].getAttribute('value');
    await this.salutationDropdown.selectOption(value || '');
    console.log('Randomly selected salutation (not first option):', await options[randomIndex].textContent());
  }

  // 3. Select the dropdown option for salutationDropdown which the user passes as value
  async selectSalutationOption(salutation: string) {
    await this.salutationDropdown.selectOption({ label: salutation });
    console.log('Selected salutation:', salutation);
  }

   // Enter value in name field
  async enterName(name: string) {
    await this.nameInput.fill(name);
    console.log(`Entered name: ${name}`);
  }

  // 4. Function for entering random text in nameInput field, validate only characters allowed
  async enterRandomNameText() {
    const randomText = 'TestName' + Math.floor(Math.random() * 1000) + '!@#';
    await this.nameInput.fill(randomText);
    const value = await this.nameInput.inputValue();
    const onlyLetters = /^[A-Za-z]+$/.test(value);
    if (!onlyLetters) {
      console.log('Name input validation: All characters are allowed. Entered value:\n', value);
    } else {
      console.log('Name input accepted only characters:', value);
    }
    return value;
  }

  // 5. Function for clearing the value in nameInput field and log validation error
  async clearNameInputAndCheckValidation() {
    await this.nameInput.fill('');
    // Assuming error message appears in a span or div below input with a class containing 'error' or 'validation'
    const errorLocator = this.page.locator('//*[@id="name-errors"]/ul/li');
    let errorMsg = '';
    try {
      await errorLocator.waitFor({ timeout: 3000 });
      errorMsg = (await errorLocator.textContent()) || '';
      console.log('Name input validation error:\n', errorMsg);
    } catch {
      console.log('No validation error message found for name input.');
    }
    return errorMsg;
  }

  // 6. Click inside dateOfBirthInput, click outside, check validation error
  async checkDateOfBirthValidationOnBlur() {
    await this.dateOfBirthInput.click();
    // Click outside, e.g., on the header
    await this.completeApplicationHeader.click();
    const errorLocator = this.page.locator('//*[@id="dateOfBirth-errors"]/ul/li');
    let errorMsg = '';
    try {
      await errorLocator.waitFor({ timeout: 3000 });
      errorMsg = (await errorLocator.textContent()) || '';
      console.log('Date of Birth validation error:\n', errorMsg);
    } catch {
      console.log('No validation error message found for date of birth input.');
    }
    return errorMsg;
  }

  // 7. Provide a past date for dateOfBirthInput
  async enterPastDateOfBirth(date: string) {
    await this.dateOfBirthInput.fill(date);
    console.log('Entered past date of birth:', date);
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press('Escape');  
    await this.page.waitForTimeout(500);  
  }

  // 8. Validate emailInput field with invalid and empty input
  async validateEmailInputWithInvalidAndEmpty() {
    await this.emailInput.fill('invalidEmail');
    // Locator for email validation error
    const errorLocator = this.page.locator('//*[@id="email-errors"]/ul/li');
    let errorMsg = '';
    try {
      await errorLocator.waitFor({ timeout: 500 });
      errorMsg = (await errorLocator.textContent()) || '';
      console.log('Email input validation error (invalid):\n', errorMsg);
    } catch {
      console.log('No validation error message found for invalid email.');
    }
    await this.emailInput.fill('');
    try {
      await errorLocator.waitFor({ timeout: 500 });
      errorMsg = (await errorLocator.textContent()) || '';
      console.log('Email input validation error (empty):\n', errorMsg);
    } catch {
      console.log('No validation error message found for empty email.');
    }
    return errorMsg;
  }

  // 9. Enter valid email and verify no validation message
  async enterValidEmailAndCheck(email: string) {
    await this.emailInput.fill(email);
    const errorLocator = this.page.locator('//*[@id="email-errors"]/ul/li');
    let errorMsg = '';
    try {
      await errorLocator.waitFor({ timeout: 500 });
      errorMsg = (await errorLocator.textContent()) || '';
    } catch {
      errorMsg = '';
    }
    if (errorMsg) {
      console.log('Validation error displayed for valid email:\n', errorMsg);
    } else {
      console.log('No validation error for valid email:\n', email);
    }
    return errorMsg;
  }

  // 10. Display options in identityTypeDropdown
  async logIdentityTypeOptions() {
    const options = await this.identityTypeDropdown.locator('option').allTextContents();
    console.log('Identity Type options:', options);
    return options;
  }

  // 11. Select identity type from dropdown by parameter
  async selectIdentityType(identityType: string) {
    await this.identityTypeDropdown.selectOption({ label: identityType });
    console.log(`Selected identity type: ${identityType}`);
  }

  // Fill either PAN or Aadhar number field based on ID type
  async aadharOrPan(ID: string, idValue: string) {
    if (ID === 'Pan Card') {
      await this.panNumberInput.fill(idValue);
      console.log(`Filled PAN Number with: ${idValue}`);
    } else if (ID === 'Aadhar Card') {
      await this.aadharNumberInput.fill(idValue);
      console.log(`Filled Aadhar Number with: ${idValue}`);
    } else {
      throw new Error(`Unknown ID type: ${ID}`);
    }
  }

  // 12. Display options in genderDropdown
  async logGenderOptions() {
    const options = await this.genderDropdown.locator('option').allTextContents();
    console.log('Gender options:', options);
    return options;
  }

  // 13. Select gender from dropdown by parameter
  async selectGender(gender: string) {
    await this.genderDropdown.selectOption({ label: gender });
    console.log(`Selected gender: ${gender}`);
  }

  // 14. Display options in nationalityDropdown
  async logNationalityOptions() {
    const options = await this.nationalityDropdown.locator('option').allTextContents();
    console.log('Nationality options:', options);
    return options;
  }

  // 15. Select nationality from dropdown by parameter
  async selectNationality(nationality: string) {
    await this.nationalityDropdown.selectOption({ label: nationality });
    console.log(`Selected nationality: ${nationality}`);
  }

  // 16. Enter random 8 digits in mobileNumberInput and check validation
  async enterRandomMobileAndCheckValidation() {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
    await this.mobileNumberInput.fill(randomNumber);
    const errorLocator = this.page.locator('//*[@id="mobileNumber-errors"]/ul/li');
    let errorMsg = '';
    try {
      await errorLocator.waitFor({ timeout: 3000 });
      errorMsg = (await errorLocator.textContent()) || '';
      console.log('Mobile number validation error (8 digits):\n', errorMsg);
    } catch {
      console.log('No validation error message found for 8 digit mobile number.');
    }
    await this.mobileNumberInput.fill('');
    try {
      await errorLocator.waitFor({ timeout: 3000 });
      errorMsg = (await errorLocator.textContent()) || '';
      console.log('Mobile number validation error (empty):\n', errorMsg);
    } catch {
      console.log('No validation error message found for empty mobile number.');
    }
    return errorMsg;
  }

  // 17. Enter a mobile number and check no validation error
  async enterMobileNumberAndCheck(mobile: string) {
    await this.mobileNumberInput.fill(mobile);
    const errorLocator = this.page.locator('//*[@id="mobileNumber-errors"]/ul/li');
    let errorMsg = '';
    try {
      await errorLocator.waitFor({ timeout: 3000 });
      errorMsg = (await errorLocator.textContent()) || '';
    } catch {
      errorMsg = '';
    }
    if (errorMsg) {
      console.log('Validation error displayed for valid mobile number:\n', errorMsg);
    } else {
      console.log('No validation error for mobile number:', mobile);
    }
    return errorMsg;
  }


  // 18. Interact with Address search bar, input value, select first result
  async searchAndSelectAddress(address: string) {
    await this.addressInput.fill(address);
    // Wait for dropdown results to appear (assuming a listbox or menu appears)
    const resultLocator = this.page.locator('[id^="react-select-2-option-"]');
    await resultLocator.first().waitFor({ timeout: 5000 });
    const firstResult = resultLocator.first();
    const resultText = await firstResult.textContent();
    await firstResult.click();
    console.log('Selected address result:', resultText);
  }


  // 20. Click Previous button
  async clickPreviousButton() {
    await this.previousButton.scrollIntoViewIfNeeded();
    await this.previousButton.click();
    console.log('Clicked Previous button');
  }

  // 21. Click Next button
  async clickNextButton() {
    await this.nextButton.scrollIntoViewIfNeeded();
    await this.nextButton.click();
    console.log('Clicked Next button');
  }


  // Fill form fields with values from ApplicationFillData.json
  async fillFormFromJson() {
    const fs = require('fs');
    const path = require('path');
    const jsonPath = path.resolve('TestData/ApplicationFillData.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      await this.salutationDropdown.scrollIntoViewIfNeeded();
      if (data.Salutation) await this.selectSalutationOption(data.Salutation);
      if (data.Name) await this.nameInput.fill(data.Name);
      if (data['Date of Birth']) 
        {
          const date= data['Date of Birth'];
            await this.enterPastDateOfBirth(date);
        }
      if (data['Identity Type']) await this.identityTypeDropdown.selectOption({ label: data['Identity Type'] });
      if (data['Identity Type']=== 'Aadhar Card')
        if (data['Aadhar Number']) await this.aadharNumberInput.fill(data['Aadhar Number']);
      if (data['Identity Type']=== 'Pan Card')
        if (data['Pan Number']) await this.panNumberInput.fill(data['Pan Number']);
      if (data['Email Address']) 
        {
          const email = data['Email Address'];
          await this.enterValidEmailAndCheck(email);
        }
      await this.page.waitForTimeout(1000);
      await this.mobileNumberInput.scrollIntoViewIfNeeded();
      if (data['Mobile Number']) await this.mobileNumberInput.fill(data['Mobile Number']);
      await this.page.waitForTimeout(1000);
      if (data.Gender) await this.genderDropdown.selectOption({ label: data.Gender });
      if (data.Nationality) await this.nationalityDropdown.selectOption({ label: data.Nationality });
      await this.page.waitForTimeout(1000);
      if (data.Address) await this.addressInput.fill(data.Address);
      const resultLocator = this.page.locator('[id^="react-select-2-option-"]');
      await resultLocator.first().waitFor({ timeout: 5000 });
      const firstResult = resultLocator.first();
      await firstResult.click();
      // Add more mappings as needed for your form fields
      console.log('Filled form fields from ApplicationFillData.json');
    } else {
      console.log('ApplicationFillData.json file not found.');
  }
    // Click Next button
    await this.nextButton.scrollIntoViewIfNeeded();
    await this.nextButton.click();
    console.log('Clicked Next button on Complete Application page');
  }
}
