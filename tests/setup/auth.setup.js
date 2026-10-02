import { test as setup } from '@playwright/test';
import { WelcomePage } from '../../support/pages/WelcomePage';
import { GaragePage } from '../../support/pages/GaragePage';

setup('Login as user', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.visit();
    await welcomePage.clickLoginButton();
    await welcomePage.loginForm.login('mrcross622+123123123123123@gmail.com', 'Test123123123');
    const garagePage = new GaragePage(page);
    await garagePage.verifyIsOpened();

    await page.context().storageState({ path: 'auth.json' });
});
