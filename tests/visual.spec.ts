import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Visual comparison of product listing page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveScreenshot('all-items.png');
});
