import { test, expect } from '@playwright/test';

test('marketplace flow', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/BuidlOn/);
});
