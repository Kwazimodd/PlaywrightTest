import { expect } from '@playwright/test';
import { LeftNavMenu } from '../forms/LeftNavMenuForm';

export class BasePage {
    constructor(page, url) {
        this.page = page;
        this.url = url;
        this.leftNavMenu = new LeftNavMenu(page);
    }

    async verifyIsOpened() {
        await expect(this.page).toHaveURL(new RegExp(`${this.url}`));
    }

    async visit() {
        await this.page.goto(this.url);
    }

    async reload() {
        await this.page.reload();
    }

    async goBack() {
        await this.page.goBack();
    }

    async goForward() {
        await this.page.goForward();
    }
}
