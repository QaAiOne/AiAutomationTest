import { Page, Locator } from '@playwright/test';

export class SummaryPage {
  readonly page: Page;
  readonly salutation: Locator;
  readonly name: Locator;
  readonly dateOfBirth: Locator;
  readonly email: Locator;
  readonly identity: Locator;
  readonly mobileNumber: Locator;
  readonly gender: Locator;
  readonly nationality: Locator;
  readonly address: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly saveAndExitButton: Locator;

  salutationText: string;
  nameText: string;
  dobText: string;
  emailText: string;
  identityText: string;
  mobileText: string;
  genderText: string;
  nationalityText: string;
  addressText: string;

  constructor(page: Page) {
    this.page = page;
    this.salutation = page.locator('input#salutationInfo');
    this.name = page.locator('input#nameInfo');
    this.dateOfBirth = page.locator('input#dateOfBirthInfo');
    this.email = page.locator('input#emailInfo');
    this.identity = page.locator('input#identityInfo');
    this.mobileNumber = page.locator('input#mobileNumberInfo');
    this.gender = page.locator('input#genderInfo');
    this.previousButton = page.locator('button#nav-prev-btn');
    this.nextButton = page.locator('button#nav-next-btn');
    this.saveAndExitButton = page.locator('button#nav-save-draft-btn');
  }
  // Function to log summary information  
  async logSummaryInfo() {
    this.salutationText = await this.salutation.inputValue();
    this.nameText = await this.name.inputValue();
    this.dobText = await this.dateOfBirth.inputValue();
    this.emailText = await this.email.inputValue();
    this.identityText = await this.identity.inputValue();
    this.mobileText = await this.mobileNumber.inputValue();
    this.genderText = await this.gender.inputValue();
    
    console.log('Summary Page Data Information:');
    console.log('Salutation:', this.salutationText);
    console.log('Name:', this.nameText);
    console.log('Date of Birth:', this.dobText);
    console.log('Email:', this.emailText);
    console.log('Identity:', this.identityText);
    console.log('Mobile Number:', this.mobileText);
    console.log('Gender:', this.genderText);

}

  //Function to fetch data from ApplicationData.json and compare them to the summary page values
  async compareWithApplicationFillData() {
    const fs = require('fs');
    const path = require('path');
    const jsonPath = path.resolve('ApplicationFillData.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      let allMatch = true;
      const fieldComparisons = [
        { label: 'Salutation', json: data.Salutation, summary: this.salutationText },
        { label: 'Name', json: data.Name, summary: this.nameText },
        { label: 'Date of Birth', json: data['Date of Birth'], summary: this.dobText },
        { label: 'Email', json: data['Email Address'] || data.Email, summary: this.emailText },
        { label: 'Identity Type', json: data['Identity in Page'], summary: this.identityText },
        { label: 'Mobile Number', json: data['Mobile Number'], summary: this.mobileText },
        { label: 'Gender', json: data.Gender, summary: this.genderText },
        // Add more fields as needed
      ];
      for (const field of fieldComparisons) {
        if (field.json !== field.summary) {
          allMatch = false;
          console.log(`Mismatch: ${field.label} | JSON: '${field.json}' | Summary: '${field.summary}'`);
        }
      }
      if (allMatch) {
        console.log('Summary page matches ApplicationFillData.json');
      } else {
        console.log('One or more fields mismatched between Summary page and ApplicationFillData.json');
      }
    }
    else {
      console.log('ApplicationData.json file not found.');
    }
  }

  // Function to click the Next button
  async clickNext() {
    await this.nextButton.click();
    console.log('Clicked Next button on Summary page');
  }

  // Function to click the Previous button
  async clickPrevious() {
    await this.previousButton.click();
    console.log('Clicked Previous button on Summary page');
  }

  // Function to click Save and Exit button
  async clickSaveAndExit() {
    await this.saveAndExitButton.click();
    console.log('Clicked Save and Exit button on Summary page');
}
}
