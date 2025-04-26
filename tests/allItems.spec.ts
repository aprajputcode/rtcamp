import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllItemsPage } from '../pages/AllItemsPage';

test.describe('Sorting Tests', () => {
  let loginPage: LoginPage;
  let allItemsPage: AllItemsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    allItemsPage = new AllItemsPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Verify sorting order Z-A', async ({ page }) => {
    await allItemsPage.sortBy('Name (Z to A)');
    const itemNames = await allItemsPage.getItemNames();
    const sorted = [...itemNames].sort().reverse();
    expect(itemNames).toEqual(sorted);
  });

  test('Verify sorting order High-Low Price', async ({ page }) => {
    await allItemsPage.sortBy('Price (high to low)');
    const itemPrices = await allItemsPage.getItemPrices();
    const sorted = [...itemPrices].sort((a, b) => b - a);
    expect(itemPrices).toEqual(sorted);
  });
});
