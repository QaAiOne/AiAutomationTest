
import { test, expect } from '@playwright/test';
import { CompleteApplicationPage } from '../pages/completeApplication';
import { GetQuotePage } from '../pages/getQuote';

test.describe('Complete Flow Demo', { tag: '@demo' }, () => {
  test('Complete end-end flow 1', async ({ page }) => {
    // Go to Get Quote page (landing page)
    await page.goto('https://trainingx.unqork.io/#/display/67545b82c5a4314c973256aa');
    const getQuotePage = new GetQuotePage(page);
      
    // Fill form and click Next button
    await getQuotePage.fillGetQuoteFormFromJson();
    await getQuotePage.logStepCircleColors();

    // Now on Complete Application page
    const completeAppPage = new CompleteApplicationPage(page);

    
    // Filling Form Data and clicking Next button
    await completeAppPage.fillFormFromJson();
    await page.waitForTimeout(2000);
    console.log('Paused 2s after clickNextButton:', new Date().toLocaleTimeString());
    await completeAppPage.nextButton.scrollIntoViewIfNeeded();

    // Now on Summary Page: log and compare summary info
    const { SummaryPage } = require('../pages/summaryPage');
    const summaryPage = new SummaryPage(page);
    await summaryPage.getSummaryInfo();
    await summaryPage.compareWithApplicationFillData();
    await page.waitForTimeout(2000);
    console.log('Paused 2s after getSummaryInfo:', new Date().toLocaleTimeString());
    await summaryPage.clickNext();

    // Validate that the next page is Payment Amount Page
    const { PaymentAmountPage } = require('../pages/paymentAmountPage');
    const paymentAmountPage = new PaymentAmountPage(page);
    await paymentAmountPage.fillPaymentFormFromJson();
    await page.waitForTimeout(2000);
  });
  
});