import { LoginForm } from '../forms/LoginForm';
import { RegisterForm } from '../forms/RegisterForm';
import { BasePage } from './BasePage';

class WelcomePageUIMap {
    constructor(page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Sign In' });
    }
}

export class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/');
        this.ui = new WelcomePageUIMap(page);
        this.loginForm = new LoginForm(page);
        this.registerForm = new RegisterForm(page);
    }

    async clickLoginButton() {
        await this.ui.loginButton.click();
    }
}
