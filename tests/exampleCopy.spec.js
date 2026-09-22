// @ts-check
import { test, expect } from '@playwright/test';
import { WelcomePage } from '../support/pages/WelcomePage';

test.describe('qauto.forstudy.space @Sa7295d47', () => {
    /**
     * @type {WelcomePage}
     */
    let welcomePage;

    test.beforeEach('Page initialization', async ({ page }) => {
        welcomePage = new WelcomePage(page);
        await welcomePage.visit();
    });

    test(
        'Welcome page and login form verifies @T30a1acc4',
        {
            annotation: {
                type: 'testcase',
                description: 'Checking welcome page and login form',
            },
            tag: ['@welcomePage', '@loginForm'],
        },
        async ({ page }) => {
            const password = 'Test1234';
            const email = `mrcross622+${Date.now()}@gmail.com`;

            await welcomePage.clickLoginButton();
            await welcomePage.loginForm.clickRegister();
            const applicationPage = await welcomePage.registerForm.register(
                'Test',
                'Test',
                email,
                password,
            );
            await applicationPage.verifyPanelOpened();
        },
    );

    test(
        'Welcome page to garage page and log out @T82f6b743',
        {
            tag: ['@garagePage'],
        },
        async ({ page }) => {
            const password = 'Test1234';
            const email = `mrcross622+${Date.now()}@gmail.com`;

            await welcomePage.clickLoginButton();
            await welcomePage.loginForm.clickRegister();
            await page.pause();
            const garagePage = await welcomePage.registerForm.register(
                'Test',
                'Test',
                email,
                password,
            );
            await garagePage.verifyIsOpened();
            await garagePage.leftNavMenu.goto('Log Out');
            await welcomePage.verifyIsOpened();
        },
    );
});
