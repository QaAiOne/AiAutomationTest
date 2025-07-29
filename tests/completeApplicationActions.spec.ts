import { test, expect } from '@playwright/test';
import { CompleteApplicationPage } from '../pages/completeApplication';
import { GetQuotePage } from '../pages/getQuote';

// This script validates all functions in CompleteApplicationPage

test.describe('Complete Application - All Functions Validation', () => {
  test('should validate all CompleteApplicationPage functions', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('https://trainingx.unqork.io/#/display/67545b82c5a4314c973256aa');
    const getQuotePage = new GetQuotePage(page);
    await getQuotePage.nextButton.scrollIntoViewIfNeeded();
    await getQuotePage.clickNext();
    const completeAppPage = new CompleteApplicationPage(page);

    // 1. Log salutation options
    try {
      await completeAppPage.logSalutationOptions();
      console.log('1. logSalutationOptions completed');
    } catch (e) {
      console.log('1. logSalutationOptions failed:', e);
    }
    await page.waitForTimeout(1000);
    // 2. Select random salutation
    try {
      await completeAppPage.selectRandomSalutationOption();
      console.log('2. selectRandomSalutationOption completed');
    } catch (e) {
      console.log('2. selectRandomSalutationOption failed:', e);
    }
    await page.waitForTimeout(1000);
    // 3. Select 'Mr' as salutation
    try {
      await completeAppPage.selectSalutationOption('Mr');
      console.log('3. selectSalutationOption completed');
    } catch (e) {
      console.log('3. selectSalutationOption failed:', e);
    }
    await page.waitForTimeout(1000);
    // 4. Enter random name
    await completeAppPage.nameInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.enterRandomNameText();
      console.log('4. enterRandomNameText completed');
    } catch (e) {
      console.log('4. enterRandomNameText failed:', e);
    }
    await page.waitForTimeout(1000);
    // 5. Clear name and check validation
    await completeAppPage.nameInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.clearNameInputAndCheckValidation();
      console.log('5. clearNameInputAndCheckValidation completed');
    } catch (e) {
      console.log('5. clearNameInputAndCheckValidation failed:', e);
    }
    await page.waitForTimeout(1000);
    // 6. Date of birth blur validation
    await completeAppPage.dateOfBirthInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.checkDateOfBirthValidationOnBlur();
      console.log('6. checkDateOfBirthValidationOnBlur completed');
    } catch (e) {
      console.log('6. checkDateOfBirthValidationOnBlur failed:', e);
    }
    await page.waitForTimeout(1000);
    // 7. Enter past date for DOB
    await completeAppPage.dateOfBirthInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.enterPastDateOfBirth('01/01/1990');
      console.log('7. enterPastDateOfBirth completed');
    } catch (e) {
      console.log('7. enterPastDateOfBirth failed:', e);
    }
    await page.waitForTimeout(1000);
    // 8. Email invalid/empty validation
    await completeAppPage.emailInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.validateEmailInputWithInvalidAndEmpty();
      console.log('8. validateEmailInputWithInvalidAndEmpty completed');
    } catch (e) {
      console.log('8. validateEmailInputWithInvalidAndEmpty failed:', e);
    }
    await page.waitForTimeout(1000);
    // 9. Enter valid email
    await completeAppPage.emailInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.enterValidEmailAndCheck('test@example.com');
      console.log('9. enterValidEmailAndCheck completed');
    } catch (e) {
      console.log('9. enterValidEmailAndCheck failed:', e);
    }
    
    // 10. Log identity type options
    await completeAppPage.identityTypeDropdown.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.logIdentityTypeOptions();
      console.log('10. logIdentityTypeOptions completed');
    } catch (e) {
      console.log('10. logIdentityTypeOptions failed:', e);
    }
    
    // 11. Select random identity type
    await completeAppPage.identityTypeDropdown.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.selectRandomIdentityTypeOption();
      console.log('11. selectRandomIdentityTypeOption completed');
    } catch (e) {
      console.log('11. selectRandomIdentityTypeOption failed:', e);
    }
    
    // 12. Log gender options
    await completeAppPage.genderDropdown.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.logGenderOptions();
      console.log('12. logGenderOptions completed');
    } catch (e) {
      console.log('12. logGenderOptions failed:', e);
    }
    await page.waitForTimeout(1000);
    // 13. Select random gender (not first)
    await completeAppPage.genderDropdown.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.selectRandomGenderOption();
      console.log('13. selectRandomGenderOption completed');
    } catch (e) {
      console.log('13. selectRandomGenderOption failed:', e);
    }
    await page.waitForTimeout(1000);
    // 14. Log nationality options
    await completeAppPage.nationalityDropdown.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.logNationalityOptions();
      console.log('14. logNationalityOptions completed');
    } catch (e) {
      console.log('14. logNationalityOptions failed:', e);
    }
    await page.waitForTimeout(1000);
    // 15. Select 'Indian' nationality
    await completeAppPage.nationalityDropdown.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.selectIndianNationality();
      console.log('15. selectIndianNationality completed');
    } catch (e) {
      console.log('15. selectIndianNationality failed:', e);
    }
    await page.waitForTimeout(1000);
    // 16. Enter random 8 digits in mobile and check validation
    await completeAppPage.mobileNumberInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.enterRandomMobileAndCheckValidation();
      console.log('16. enterRandomMobileAndCheckValidation completed');
    } catch (e) {
      console.log('16. enterRandomMobileAndCheckValidation failed:', e);
    }
    await page.waitForTimeout(1000);
    // 17. Enter valid mobile number
    await completeAppPage.mobileNumberInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.enterMobileNumberAndCheck('9876543210');
      console.log('17. enterMobileNumberAndCheck completed');
    } catch (e) {
      console.log('17. enterMobileNumberAndCheck failed:', e);
    }
    await page.waitForTimeout(1000);
    // 18. Address search and select
    await completeAppPage.addressInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.searchAndSelectAddress('New York');
      console.log('18. searchAndSelectAddress completed');
    } catch (e) {
      console.log('18. searchAndSelectAddress failed:', e);
    }
    await page.waitForTimeout(1000);
    // 19. Clear address and check validation
    await completeAppPage.addressInput.scrollIntoViewIfNeeded();
    try {
      await completeAppPage.clearAddressAndCheckValidation();
      console.log('19. clearAddressAndCheckValidation completed');
    } catch (e) {
      console.log('19. clearAddressAndCheckValidation failed:', e);
    }
    await page.waitForTimeout(1000);
    // 20. Click Previous button
    try {
      await completeAppPage.clickPreviousButton();
      console.log('20. clickPreviousButton completed');
    } catch (e) {
      console.log('20. clickPreviousButton failed:', e);
    }
    await page.waitForTimeout(1000);
    // 21. Click Next button
    try {
      await completeAppPage.clickNextButton();
      console.log('21. clickNextButton completed');
    } catch (e) {
      console.log('21. clickNextButton failed:', e);
    }
    await page.waitForTimeout(5000);
  });
});
