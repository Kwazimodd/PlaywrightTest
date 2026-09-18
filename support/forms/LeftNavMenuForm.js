import { BaseForm } from './BaseForm';

class LeftNavMenuUIMap {
    constructor(page) {
        this.page = page;
        this.grageButton = page.getByRole('link', { name: ' Garage' });
        this.expensesButton = page.getByRole('link', { name: ' Fuel expenses' });
        this.instructionsButton = page.getByRole('link', { name: ' Instructions' });
        this.logoutButton = page.getByText(/Log out/);
    }
}

export class LeftNavMenu extends BaseForm {
    constructor(page) {
        super(page);
        this.ui = new LeftNavMenuUIMap(page);
    }

    async goto(pageName) {
        if (!['Garage', 'Expenses', 'Instructions', 'Log Out'].includes(pageName)) {
            throw new Error('Wrong LeftNavMenu Button name');
        }

        switch (pageName) {
            case 'Garage':
                await this.ui.grageButton.click();
                {
                    const { GaragePage } = await import('../pages/GaragePage');
                    return new GaragePage(this.page);
                }
            case 'Expenses':
                await this.ui.expensesButton.click();
                {
                    const { ExpensesPage } = await import('../pages/ExpensesPage');
                    return new ExpensesPage(this.page);
                }
            case 'Instructions':
                await this.ui.instructionsButton.click();
                {
                    const { InstructionsPage } = await import('../pages/InstructionsPage');
                    return new InstructionsPage(this.page);
                }
            default:
                await this.ui.logoutButton.click();
                {
                    const { WelcomePage } = await import('../pages/WelcomePage');
                    return new WelcomePage(this.page);
                }
        }
    }
}
