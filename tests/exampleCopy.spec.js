// @ts-check
import { test, expect } from '@playwright/test';
import { WelcomePage } from '../support/pages/WelcomePage';
import { GaragePage } from '../support/pages/GaragePage';
/**
 * @type {WelcomePage}
 */
let welcomePage;

/**
 * @type {GaragePage}
 */
let garagePage;

test.describe('qauto.forstudy.space @Sa7295d47', () => {
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
});

test.describe('Test garage', () => {
    test.beforeEach('Page initialization', async ({ page }) => {
        garagePage = new GaragePage(page);
        await garagePage.visit();
    });

    test(
        'Welcome page to garage page and log out @T82f6b743',
        {
            tag: ['@garagePage'],
        },
        async ({ page }) => {
            garagePage.verifyIsOpened();
        },
    );
});
