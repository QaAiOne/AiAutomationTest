import { test as base, expect, chromium, Page } from '@playwright/test';
import { GetQuotePage } from '../pages/getQuote';

const BASE_URL = 'https://trainingx.unqork.io/#/display/67545b82c5a4314c973256aa';

const test = base.extend<{ page: Page }>({
  page: async ({}, use) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await browser.close();
  }
});

test.describe('Get Quote Page Actions', () => {
  test('should perform all actions on Get Quote page', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60s
    const getQuotePage = new GetQuotePage(page);
    try {
      await page.goto(BASE_URL);
      console.log('Navigated to URL');

      // Check if page is open and body is present
      if (page.isClosed()) {
        console.log('Page closed immediately after navigation.');
        return;
      }
      try {
        await page.waitForSelector('body', { timeout: 10000 });
        console.log('Body loaded.');
      } catch (e) {
        const url = page.url();
        const html = await page.content();
        console.log('Body not found. Current URL:', url);
        console.log('Page HTML:', html);
        if (!page.isClosed()) {
          await page.screenshot({ path: './screenshots/get-quote-page-failure.png', fullPage: true });
        }
        throw new Error('Body not found after navigation.');
      }

      // Select Trip Type and Travel Type
      // await getQuotePage.tripTypeSingleRadio.scrollIntoViewIfNeeded();
      // console.log('Scrolled to Trip Type Single');
      await getQuotePage.selectTripType('Single Trip');
      console.log('Selected Trip Type: Single Trip');
      await getQuotePage.travelTypeIndividualRadio.scrollIntoViewIfNeeded();
      console.log('Scrolled to Travel Type Individual');
      await getQuotePage.selectTravelType('Individual');
      console.log('Selected Travel Type: Individual');

      // Increase and decrease No of Individuals (when Individual is selected)
      await expect(getQuotePage.individualsPlusButton).toBeVisible({ timeout: 10000 });
      await getQuotePage.individualsPlusButton.scrollIntoViewIfNeeded();
      await getQuotePage.increaseIndividuals(2); // Increase by 2
      console.log('Increased Individuals by 2');
      await getQuotePage.individualsMinusButton.scrollIntoViewIfNeeded();
      await getQuotePage.decreaseIndividuals(1); // Decrease by 1 (should not go below 1)
      console.log('Decreased Individuals by 1');

      // Switch to Family and increase/decrease Adults and Children
      await getQuotePage.travelTypeFamilyRadio.scrollIntoViewIfNeeded();
      console.log('Scrolled to Travel Type for Family');
      await getQuotePage.selectTravelType('Family');
      console.log('Scrolled to Travel Type and selected Family');
      // Wait for adults and children controls to be visible
      await expect(getQuotePage.adultsPlusButton).toBeVisible({ timeout: 10000 });
      await getQuotePage.adultsPlusButton.scrollIntoViewIfNeeded();
      await getQuotePage.increaseAdults(1); // Increase by 2
      console.log('Increased Adults to 2');
      await getQuotePage.adultsMinusButton.scrollIntoViewIfNeeded();
      await getQuotePage.decreaseAdults(1); // Decrease by 1 (should not go below 1)
      console.log('Decreased Adults by 1');
      await expect(getQuotePage.childrenPlusButton).toBeVisible({ timeout: 10000 });
      await getQuotePage.childrenPlusButton.scrollIntoViewIfNeeded();
      await getQuotePage.increaseChildren(2); // Increase by 2
      console.log('Increased Children by 2');
      await getQuotePage.childrenMinusButton.scrollIntoViewIfNeeded();
      await getQuotePage.decreaseChildren(1); // Decrease by 1 (should not go below 1)
      console.log('Decreased Children by 1');

      // Switch back to Individual and verify children controls are hidden
      await getQuotePage.travelTypeIndividualRadio.scrollIntoViewIfNeeded();
      await getQuotePage.selectTravelType('Individual');
      await expect(getQuotePage.childrenPlusButton).not.toBeVisible({ timeout: 10000 });
      console.log('Children controls hidden for Individual travel type');

      // Log Area dropdown options
      await getQuotePage.areaDropdown.scrollIntoViewIfNeeded();
      await getQuotePage.logAreaDropdownOptions();
      console.log('Logged Area dropdown options');

      // Select Start and End Date
      await getQuotePage.startDateInput.scrollIntoViewIfNeeded();
      await getQuotePage.selectDates('01-08-2025', '10-08-2025');
      console.log('Selected Start and End Date');
      
      // Select random Area option
      await getQuotePage.areaDropdown.scrollIntoViewIfNeeded();
      await getQuotePage.selectRandomAreaOption();
      console.log('Selected random Area option');

      // Log stepper circle colors after selecting area
     // await getQuotePage.logStepCircleColors();

      // Click Get Quote button
      await getQuotePage.getQuoteButton.scrollIntoViewIfNeeded();
      await getQuotePage.clickGetQuote();
      console.log('Clicked Get Quote button');

      // Log stepper circle colors after clicking Get Quote
      //await getQuotePage.logStepCircleColors();

      // Validate Get Quote button is hidden and cards are visible
      /*
      expect(await getQuotePage.isGetQuoteButtonHidden()).toBe(true);
      console.log('Get Quote button is hidden');
      */
      expect(await getQuotePage.areResultsCardsVisible()).toBe(true);
      console.log('Results cards are visible');

      // Validate Select button text before selection
      expect((await getQuotePage.valueCardSelectButton.textContent())?.toLowerCase()).toContain('select');
      console.log('Value card Select button text is correct');
      expect((await getQuotePage.plusCardSelectButton.textContent())?.toLowerCase()).toContain('select');
      console.log('Plus card Select button text is correct');
      expect((await getQuotePage.proCardSelectButton.textContent())?.toLowerCase()).toContain('select');
      console.log('Pro card Select button text is correct');

      // Click Select on the Plus card and validate button text changes to Selected
      await getQuotePage.selectCardByTitle('Plus');
      expect((await getQuotePage.plusCardSelectButton.textContent())?.toLowerCase()).toContain('selected');
      console.log('Plus card Select button text changed to Selected');

      // Click Next button
      await getQuotePage.nextButton.scrollIntoViewIfNeeded();
      await getQuotePage.clickNext();
      console.log('Clicked Next button');

      // Log stepper circle colors after clicking Next
      await getQuotePage.logStepCircleColors();
    } catch (error) {
      // Take screenshot on failure only if page is not closed
      if (!page.isClosed()) {
        await page.screenshot({ path: './screenshots/get-quote-page-failure.png', fullPage: true });
        console.log('Screenshot taken for failure');
      } else {
        console.log('Page was already closed, could not take screenshot');
      }
      throw error;
    }
  });
});
