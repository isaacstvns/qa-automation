// spec: specs/first-three-links.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('A/B Testing', () => {
  test('Heading and Content Validation', async ({ page }) => {
    // 1. Navigate to https://the-internet.herokuapp.com/
    await page.goto('https://the-internet.herokuapp.com/');

    // 2. Click the 'A/B Testing' link
    const abTestLink = page.getByRole('link', { name: 'A/B Testing' });
    await abTestLink.click();

    // 3. Validate the heading on the page
    const heading = page.locator('h3');
    await expect(heading).toHaveText(/A\/B Test (Control|Variation 1)/);

    // 4. Check for the presence of the explanatory paragraph
    const paragraph = page.locator('p');
    await expect(paragraph).toBeVisible();
  });
});
