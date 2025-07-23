
import { test, expect } from '@playwright/test';
import { TravelInsurancePage } from '../pages/TravelInsurancePage';

test.describe('Travel Insurance Plan', () => {
  test('should show required field errors when clicking Get Quote without input', async ({ page }) => {
    const travelPage = new TravelInsurancePage(page);
    await travelPage.goto();
    await travelPage.clickGetQuote();
    const errors = await travelPage.getRequiredFieldErrors();
    expect(errors).toEqual([true, true, true, true, true]);
  });
  test('should show errors except Trip Type when only Trip Type is selected', async ({ page }) => {
    const travelPage = new TravelInsurancePage(page);
    await travelPage.goto();
    await travelPage.selectTripType('Single Trip');
    await travelPage.clickGetQuote();
    const errors = await travelPage.getRequiredFieldErrors();
    expect(errors).toEqual([false, true, true, true, true]);
  });

  test('should show errors except Travel Type when only Travel Type is selected', async ({ page }) => {
    const travelPage = new TravelInsurancePage(page);
    await travelPage.goto();
    await travelPage.selectTravelType('Individual');
    await travelPage.clickGetQuote();
    const errors = await travelPage.getRequiredFieldErrors();
    expect(errors).toEqual([true, false, true, true, true]);
  });

  test('should show errors except dates and area when all required fields are filled', async ({ page }) => {
    const travelPage = new TravelInsurancePage(page);
    await travelPage.goto();
    await travelPage.selectTripType('Single Trip');
    await travelPage.selectTravelType('Individual');
    await travelPage.setStartDate('2025-08-01');
    await travelPage.setEndDate('2025-08-10');
    await travelPage.selectArea('Mumbai');
    await travelPage.clickGetQuote();
    // All errors should be false
    const errors = await travelPage.getRequiredFieldErrors();
    expect(errors).toEqual([false, false, false, false, false]);
  });

  // test('should show error for invalid date range', async ({ page }) => {
  //   const travelPage = new TravelInsurancePage(page);
  //   await travelPage.goto();
  //   await travelPage.selectTripType('Single Trip');
  //   await travelPage.selectTravelType('Individual');
  //   await travelPage.setStartDate('2025-08-10');
  //   await travelPage.setEndDate('2025-08-01'); // End date before start date
  //   await travelPage.selectArea('Mumbai');
  //   await travelPage.clickGetQuote();
  //   // You may need to add a locator for the specific error message for invalid date range
  //   const dateError = await page.locator('text=End Date must be after Start Date').isVisible().catch(() => false);
  //   expect(dateError).toBeTruthy();
  // });
});

