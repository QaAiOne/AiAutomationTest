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
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly saveAndExitButton: Locator;

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
}
