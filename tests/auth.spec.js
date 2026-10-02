import { test } from '../support/fixtures/authFixture';
import { GaragePage } from '../support/pages/GaragePage';

test.describe('Auth tests', () => {
    test('User auth', async ({ userPage }) => {
        const garagePage = new GaragePage(userPage);
        await garagePage.verifyIsOpened();
    });

    test('User admin auth', async ({ adminPage }) => {
        const garagePage = new GaragePage(adminPage);
        await garagePage.verifyIsOpened();
    });

    test('User guest auth', async ({ guestPage }) => {
        const garagePage = new GaragePage(guestPage);
        await garagePage.verifyIsOpened();
    });
});
