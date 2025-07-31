
import { test, expect } from '@playwright/test';
import { CompleteApplicationPage } from '../pages/completeApplication';
import { GetQuotePage } from '../pages/getQuote';

test.describe('Complete Application Demo', () => {
  test('should navigate from Get Quote to Complete Application and validate salutation dropdown functions', async ({ page }) => {
    // Go to Get Quote page (landing page)
    await page.goto('https://trainingx.unqork.io/#/display/67545b82c5a4314c973256aa');
    const getQuotePage = new GetQuotePage(page);

    // Click Next button to go to Complete Application page
    await getQuotePage.nextButton.scrollIntoViewIfNeeded();
    await getQuotePage.clickNext();

    // Now on Complete Application page
    const completeAppPage = new CompleteApplicationPage(page);

    // Filling Form Data nd clicking Next button
    await completeAppPage.fillFormFromJson();
    await page.waitForTimeout(2000);
    console.log('Paused 2s after clickNextButton:', new Date().toLocaleTimeString());
    await completeAppPage.nextButton.scrollIntoViewIfNeeded();

    // Now on Summary Page: log and compare summary info
    const { SummaryPage } = require('../pages/summaryPage');
    const summaryPage = new SummaryPage(page);
    await summaryPage.getSummaryInfo();
    await summaryPage.compareWithApplicationFillData();
  });
});
