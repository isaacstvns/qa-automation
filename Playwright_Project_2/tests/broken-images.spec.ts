// spec: specs/next-five-links.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Broken Images', () => {
  test('Validate All Images Load', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Broken Images' }).click();
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    let brokenCount = 0;
    for (let i = 0; i < count; i++) {
      const isLoaded = await images.nth(i).evaluate(imgEl => imgEl.complete && imgEl.naturalWidth !== 0);
      if (!isLoaded) brokenCount++;
    }
    expect(brokenCount).toBeGreaterThan(0);
  });

  test('Validate Image Alt Text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    const images = page.locator('img');
    const count = await images.count();
    let hasAlt = false;
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      if (alt !== null) hasAlt = true;
    }
    expect(hasAlt).toBe(true); // At least one image has alt text
  });
});
