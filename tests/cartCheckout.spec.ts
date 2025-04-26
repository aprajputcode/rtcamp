import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllItemsPage } from '../pages/AllItemsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Add to cart and complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const allItemsPage = new AllItemsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await allItemsPage.addItemsToCart([0, 2, 4]); // Add first, third, fifth items
  await allItemsPage.openCart();

  await cartPage.proceedToCheckout();
  await checkoutPage.fillInformation('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();

  const successMessage = await checkoutPage.getSuccessMessage();
  expect(successMessage).toContain('Thank you for your order!');
});
