// @ts-check
import { test } from '../support/fixtures/welcomePageFixture';
import { WelcomePage } from '../support/pages/WelcomePage';

test.describe('qauto.forstudy.space @Sfc3ff540', () => {
    test(
        'Welcome page and login form verifies @Td2090560',
        {
            annotation: {
                type: 'testcase',
                description: 'Checking welcome page and login form',
            },
            tag: ['@welcomePage', '@loginForm'],
        },
        async ({ welcomePage }) => {
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

    test('Welcome page to garage page and log out @T554b63cb', async ({ welcomePage }) => {
        const password = 'Test1234';
        const email = `mrcross622+${Date.now()}@gmail.com`;

        await welcomePage.clickLoginButton();
        await welcomePage.loginForm.clickRegister();
        const garagePage = await welcomePage.registerForm.register('Test', 'Test', email, password);
        await garagePage.verifyIsOpened();
        await garagePage.leftNavMenu.goto('Log Out');
        await welcomePage.verifyIsOpened();
    });
});
