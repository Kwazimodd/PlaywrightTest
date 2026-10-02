import { test as base } from '@playwright/test';
import { WelcomePage } from '../pages/WelcomePage';
import { GaragePage } from '../pages/GaragePage';

const users = {
    guestUser: {
        email: 'guest@test.test',
        password: 'Test',
    },

    adminUser: {
        email: 'admin@test.test',
        password: 'Test',
    },

    user: {
        email: 'user@test.test',
        password: 'Test',
    },
};

export const test = base.extend({
    authPage: async ({ page }, use) => {
        const selectUser = async (user) => {
            const welcomePage = new WelcomePage(page);
            await welcomePage.visit();
            await welcomePage.clickLoginButton();
            const { email, password } = users[user];
            await welcomePage.loginForm.login(email, password);
            return page;
        };

        await use(selectUser);
    },

    userPage: async ({ authPage }, use) => {
        const page = await authPage('user');
        await use(page);
    },
    adminPage: async ({ authPage }, use) => {
        const page = await authPage('adminUser');
        await use(page);
    },

    guestPage: async ({ authPage }, use) => {
        const page = await authPage('guestUser');
        await use(page);
    },
});
