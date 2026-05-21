// spec: specs/first-three-links.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Auth', () => {
  test('Successful Authentication', async ({ page }) => {
    // 1. Navigate to https://the-internet.herokuapp.com/basic_auth with credentials 'admin'/'admin'.
    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
    // Validate success message
    await expect(page.locator('p')).toContainText('Congratulations! You must have the proper credentials.');
  });

  test('Failed Authentication', async ({ page, context }) => {
    // Set invalid credentials using context authentication
    await context.setHTTPCredentials({ username: 'invalid', password: 'invalid' });
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    // Validate failure (page will not show success message)
    await expect(page.locator('body')).not.toContainText('Congratulations! You must have the proper credentials.');
  });
});
