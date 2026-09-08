// @ts-check
import { test, expect } from '@playwright/test';

test(
    'has title',
    {
        annotation: {
            type: 'testcase',
            description: 'https://github.com/microsoft/playwright/issues/23180',
        },
        tag: ['@smoke', '@regression'],
    },
    async ({ browser, context, page }) => {
        await page.goto('https://playwright.dev/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
    },
);

test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
