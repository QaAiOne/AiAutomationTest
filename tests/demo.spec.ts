
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

    // 18. Interact with Address search bar, input value, select first result
    await completeAppPage.addressInput.scrollIntoViewIfNeeded();
    await completeAppPage.searchAndSelectAddress('New York');
    await page.waitForTimeout(2000);
    console.log('Paused 2s after searchAndSelectAddress:', new Date().toLocaleTimeString());

    // 19. Clear the selected Address and validate the error message
    await completeAppPage.addressInput.scrollIntoViewIfNeeded();
    await completeAppPage.clearAddressAndCheckValidation();
    await page.waitForTimeout(2000);
    console.log('Paused 2s after clearAddressAndCheckValidation:', new Date().toLocaleTimeString());

    // 20. Click Previous button
    await completeAppPage.clickPreviousButton();
    await page.waitForTimeout(2000);
    console.log('Paused 2s after clickPreviousButton:', new Date().toLocaleTimeString());

    // 21. Click Next button
    await completeAppPage.clickNextButton();
    await page.waitForTimeout(2000);
    console.log('Paused 2s after clickNextButton:', new Date().toLocaleTimeString());
  });
});
