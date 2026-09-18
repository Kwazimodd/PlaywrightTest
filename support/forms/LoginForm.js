import { BaseForm } from './BaseForm';

class LoginFormUIMap {
    constructor(page) {
        this.page = page;
        this.selfForm = page.locator('app-signin-modal');
        this.username = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.rememberMe = page.getByRole('checkbox', { name: 'Remember me' });
        this.forgotPassword = page.getByRole('button', { name: 'Forgot password' });
        this.login = page.getByRole('button', { name: 'Login' });
        this.registration = page.getByRole('button', { name: 'Registration' });
    }
}

export class LoginForm extends BaseForm {
    constructor(page) {
        super(page);
        this.ui = new LoginFormUIMap(page);
    }

    async login(username, password, { rememberMe = false } = {}) {
        await this.ui.username.fill(username);
        await this.ui.password.fill(password);
        if (rememberMe) {
            await this.ui.rememberMe.check();
        }
        await this.ui.login.click();
    }

    async clickRegister() {
        await this.ui.registration.click();
    }
}
