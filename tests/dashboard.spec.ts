import { test, expect } from '@playwright/test';

test('has title and dashboard header', async ({ page }) => {
  await page.goto('/');

  // Click the demo persona button to log in
  await page.getByRole('button', { name: /Aarav Sharma/i }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/StockPulse/);

  // Expect the main heading to be visible
  const heading = page.locator('h1', { hasText: 'Stock Catalog & Inventory Ledger' });
  await expect(heading).toBeVisible({ timeout: 10000 });

  // Expect at least one product row to be rendered
  const productRow = page.locator('tr').nth(1); // the first row after the header
  await expect(productRow).toBeVisible();
});
