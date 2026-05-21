// spec: specs/next-five-links.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Challenging DOM', () => {
  test('Validate Table Presence', async ({ page }) => {
    // 1. Navigate to https://the-internet.herokuapp.com/
    await page.goto('https://the-internet.herokuapp.com/');
    // 2. Click the 'Challenging DOM' link
    const domLink = page.getByRole('link', { name: 'Challenging DOM' });
    await domLink.click();
    // 3. Check that the table is present and visible
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('Validate Button Actions', async ({ page }) => {
    // 1. Navigate to Challenging DOM page
    await page.goto('https://the-internet.herokuapp.com/challenging_dom');
    // 2. Click each of the colored buttons (blue, red, green)
    const buttons = page.locator('.button, .button.alert, .button.success');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      // No error should occur, page remains functional
      await expect(buttons.nth(i)).toBeVisible();
    }
  });
});
