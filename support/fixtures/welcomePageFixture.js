import { test as base } from '@playwright/test';
import { WelcomePage } from '../pages/WelcomePage';

export const test = base.extend({
    welcomePage: async ({ page }, use) => {
        let welcomePage = new WelcomePage(page);
        await welcomePage.visit();
        await use(welcomePage);
    },
});
