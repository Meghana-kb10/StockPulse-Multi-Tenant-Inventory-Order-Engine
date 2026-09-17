import { test, expect } from '@playwright/test';

test.describe('Dashboard Layout Bars', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the home page
    await page.goto('/');
    // Log in via the Demo Persona "Aarav Sharma"
    await page.getByRole('button', { name: /Aarav Sharma/i }).click();
    // Wait for the dashboard to load
    await expect(page.locator('h1', { hasText: 'Stock Catalog & Inventory Ledger' })).toBeVisible({ timeout: 10000 });
  });

  test('should display the desktop sidebar', async ({ page }) => {
    // The sidebar should be visible on desktop viewports
    const sidebar = page.locator('aside[aria-label="Sidebar"]');
    await expect(sidebar).toBeVisible();
    
    // Check for some expected navigation items in the sidebar
    await expect(sidebar.getByText('Dashboard', { exact: true })).toBeVisible();
    await expect(sidebar.getByText('Inventory', { exact: true })).toBeVisible();
    await expect(sidebar.getByText('Orders', { exact: true })).toBeVisible();
  });

  test('should display the top navigation bar', async ({ page }) => {
    // The top bar is a header element
    const topBar = page.locator('header').first();
    await expect(topBar).toBeVisible();

    // Check for global search input
    await expect(topBar.locator('input[placeholder*="Search SKU"]')).toBeVisible();

    // Check for health status indicator
    await expect(topBar.getByText(/Health/i)).toBeVisible();
  });

  test('should display the recruiter persona bar', async ({ page }) => {
    // The persona bar contains the text "RECRUITER MODE"
    const personaBar = page.getByText('RECRUITER MODE').locator('..');
    await expect(personaBar).toBeVisible();

    // Verify it has the quick persona buttons
    await expect(page.getByRole('button', { name: /Priya/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Rohan/i })).toBeVisible();
  });
});
