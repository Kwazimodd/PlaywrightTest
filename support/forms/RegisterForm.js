import { ApplicationPage } from '../pages/ApplicationPage';
import { GaragePage } from '../pages/GaragePage';
import { BaseForm } from './BaseForm';

class RegisterFormUIMap {
    constructor(page) {
        this.page = page;
        this.name = page.locator('#signupName');
        this.lastName = page.locator('#signupLastName');
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' }).first();
        this.reEnterPassword = page.getByRole('textbox', { name: 'Password' }).last();
        this.register = page.getByRole('button', { name: 'Register' });
    }
}

export class RegisterForm extends BaseForm {
    constructor(page) {
        super(page);
        this.ui = new RegisterFormUIMap(page);
    }

    async register(name, lastName, email, password) {
        await this.ui.name.fill(name);
        await this.ui.lastName.fill(lastName);
        await this.ui.email.fill(email);
        await this.ui.password.fill(password);
        await this.ui.reEnterPassword.fill(password);
        await this.ui.register.click();

        return new GaragePage(this.page);
    }
}
