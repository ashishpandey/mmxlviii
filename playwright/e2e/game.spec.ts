import { test, expect } from '@playwright/test';

test('can init board', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const tiles = page.locator('.tile');
  await expect(tiles).toHaveCount(16);

  const allValues = await tiles.allTextContents();

  expect(allValues.every(v => v === '2' || v === '')).toBe(true);
});
