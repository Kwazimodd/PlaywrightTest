import { LeftNavMenu } from '../forms/LeftNavMenuForm';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

class ApplicationPageUIMap {
    constructor(page) {
        this.page = page;
        this.appPanelLayout = page.locator('app-panel-layout');
    }
}

export class ApplicationPage extends BasePage {
    constructor(page, url) {
        super(page, url ?? '/panel');
        this.ui = new ApplicationPageUIMap(page);
    }

    async verifyPanelOpened() {
        await expect(this.ui.appPanelLayout).toBeVisible();
    }
}
