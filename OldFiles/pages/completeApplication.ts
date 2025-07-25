import { Page, Locator } from '@playwright/test';

export class CompleteApplicationPage {
  readonly page: Page;
  // Example locators for Complete Application page elements
  readonly completeApplicationHeader: Locator;
  readonly salutationDropdown: Locator;
  readonly dateOfBirthInput: Locator;
  readonly identityTypeDropdown: Locator;
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
}
