// spec: specs/first-three-links.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Add/Remove Elements', () => {
  test('Add Element', async ({ page }) => {
    // 1. Navigate to https://the-internet.herokuapp.com/
    await page.goto('https://the-internet.herokuapp.com/');

    // 2. Click the 'Add/Remove Elements' link
    const addRemoveLink = page.getByRole('link', { name: 'Add/Remove Elements' });
    await addRemoveLink.click();

    // 3. Check for the presence of the 'Add Element' button
    const addButton = page.getByRole('button', { name: 'Add Element' });
    await expect(addButton).toBeVisible();

    // 4. Click the 'Add Element' button
    await addButton.click();
    const deleteButton = page.getByRole('button', { name: 'Delete' });
    await expect(deleteButton).toBeVisible();
  });

  test('Remove Element', async ({ page }) => {
    // 1. Ensure at least one 'Delete' button is present (add if necessary)
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = page.getByRole('button', { name: 'Add Element' });
    await addButton.click();
    const deleteButton = page.getByRole('button', { name: 'Delete' });
    await expect(deleteButton).toBeVisible();

    // 2. Click the 'Delete' button
    await deleteButton.click();
    await expect(deleteButton).not.toBeVisible();
  });
});
