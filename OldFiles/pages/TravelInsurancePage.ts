import { Page } from '@playwright/test';

export class TravelInsurancePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('https://trainingx.unqork.io/#/display/67545b82c5a4314c973256aa');
  }
  get getQuoteButton() {
    return this.page.getByRole('button', { name: 'Get Quote' });
  }
  async clickGetQuote() {
    await this.getQuoteButton.click();
  }
  async getRequiredFieldErrors() {
    return [
      await this.page.locator('text=Trip Type is required').isVisible(),
      await this.page.locator('text=Travel Type is required').isVisible(),
      await this.page.locator('text=This field is required').nth(0).isVisible(), // Start Date
      await this.page.locator('text=This field is required').nth(1).isVisible(), // End Date
      await this.page.locator('text=This field is required').nth(2).isVisible(), // Area
    ];
  }
  async selectTripType(type: 'Single Trip' | 'Annual Trip') {
    await this.page.getByLabel(type).check();
  }
  async selectTravelType(type: 'Individual' | 'Family') {
    await this.page.getByRole('radio', { name: type }).check();
  }
  /**
   * Selects a date using the calendar widget by clicking the correct day after opening the calendar.
   * @param label 'Start Date' or 'End Date'
   * @param dateStr in 'YYYY-MM-DD' format
   */
  async selectDate(label: 'Start Date' | 'End Date', dateStr: string) {
    const [year, month, day] = dateStr.split('-').map(Number);
    // Click the calendar icon next to the textbox
    const calendarIcon = label === 'Start Date'
      ? this.page.locator('label:has-text("Start Date")').locator('xpath=..').locator('button, [role=button], [class*=calendar], [class*=icon]').last()
      : this.page.locator('label:has-text("End Date")').locator('xpath=..').locator('button, [role=button], [class*=calendar], [class*=icon]').last();
    await calendarIcon.click();
    // Wait for calendar popup
    await this.page.waitForSelector('role=grid');
    // Navigate to correct month/year if needed
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    while (true) {
      // Get visible month and year from the calendar header
      const header = await this.page.locator('div[role="dialog"] h2, [role="heading"]').first();
      const headerText = await header.textContent();
      if (headerText) {
        const [visibleMonth, visibleYear] = headerText.match(/([A-Za-z]+)\s+(\d{4})/)?.slice(1) || [];
        if (visibleMonth === monthNames[month - 1] && Number(visibleYear) === year) {
          break;
        }
        // Navigate to correct year/month
        if (Number(visibleYear) < year || (Number(visibleYear) === year && monthNames.indexOf(visibleMonth) < month - 1)) {
          await this.page.getByRole('button', { name: /Next Month/ }).click();
        } else {
          await this.page.getByRole('button', { name: /Previous Month/ }).click();
        }
        await this.page.waitForTimeout(200); // Wait for calendar to update
      } else {
        throw new Error('Could not read calendar header');
      }
    }
    // Now click the correct day
    const dayButtons = this.page.locator('button', { hasText: day.toString() });
    const count = await dayButtons.count();
    for (let i = 0; i < count; i++) {
      const btn = dayButtons.nth(i);
      if (await btn.isVisible() && await btn.isEnabled()) {
        await btn.click();
        return;
      }
    }
    throw new Error(`No enabled day button found for day ${day}`);
  }

  async setStartDate(date: string) {
    await this.selectDate('Start Date', date);
  }
  async setEndDate(date: string) {
    await this.selectDate('End Date', date);
  }
  async selectArea(area: string) {
    await this.page.getByRole('combobox', { name: 'Area' }).selectOption({ label: area });
  }
}
