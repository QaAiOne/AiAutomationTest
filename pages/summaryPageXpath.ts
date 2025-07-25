import { Page, Locator } from '@playwright/test';

export class SummaryPageXpath {
  readonly page: Page;
  readonly salutation: Locator;
  readonly name: Locator;
  readonly dateOfBirth: Locator;
  readonly email: Locator;
  readonly identity: Locator;
  readonly mobileNumber: Locator;
  readonly gender: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly saveAndExitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.salutation = page.locator('//input[@id="salutationInfo"]');
    this.name = page.locator('//input[@id="nameInfo"]');
    this.dateOfBirth = page.locator('//input[@id="dateOfBirthInfo"]');
    this.email = page.locator('//input[@id="emailInfo"]');
    this.identity = page.locator('//input[@id="identityInfo"]');
    this.mobileNumber = page.locator('//input[@id="mobileNumberInfo"]');
    this.gender = page.locator('//input[@id="genderInfo"]');
    this.previousButton = page.locator('//button[@id="nav-prev-btn"]');
    this.nextButton = page.locator('//button[@id="nav-next-btn"]');
    this.saveAndExitButton = page.locator('//button[@id="nav-save-draft-btn"]');
  }
}
