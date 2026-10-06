import { test } from '../support/fixtures/loginDatasFixture';

test.describe('Hidden Login tests', () => {
    test('Try hidden login goto', async ({ hiddenLogginedInPage, context }) => {
        hiddenLogginedInPage.on('request', (request) =>
            console.log('>>>', request.method(), request.url()),
        );
        hiddenLogginedInPage.on('response', (response) =>
            console.log('<<<', response.status(), response.url()),
        );

        await hiddenLogginedInPage.route('**/*', async (route) => {
            await route.fulfill({ status: 500 });
        });
        await hiddenLogginedInPage.goto('/');
    });
});
