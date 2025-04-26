import { Page, expect } from '@playwright/test';

export class AllItemsPage {
  constructor(private page: Page) {}

  async sortBy(option: string) {
    await this.page.selectOption('[data-test="product-sort-container"]', { label: option });
  }

  async getItemNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  async addItemsToCart(items: number[]) {
    const buttons = await this.page.$$('.inventory_item button');
    for (const index of items) {
      await buttons[index].click();
    }
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }
}
