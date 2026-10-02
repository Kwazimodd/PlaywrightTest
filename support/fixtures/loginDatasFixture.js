import { test as base } from '@playwright/test';

export const test = base.extend({
    credentialsData: {
        email: 'mrcross622+test123123123@gmail.com',
        password: 'Test123123123',
    },

    hiddenLogginedInContext: async ({ browser, request, credentialsData }, use) => {
        await request.fetch('/api/auth/signin', {
            method: 'POST',
            data: {
                email: credentialsData.email,
                password: credentialsData.password,
                remember: false,
            },
            headers: {
                'Content-type': 'application/json',
            },
        });
        const context = await browser.newContext({ storageState: request.storageState() });
        await use(context);
        await context.close();
    },

    hiddenLogginedInPage: async ({ hiddenLogginedInContext }, use) => {
        const page = await hiddenLogginedInContext.newPage();
        await use(page);
        await page.close();
    },
});
