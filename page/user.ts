import { Page } from "@playwright/test";
import { UserModel } from "../models/user.model";

export class User {
    constructor(private page: Page) {
    }

    async searchUser(userId: string) {
        await this.page.getByRole('link', { name: 'User List' }).click();
        await this.page.getByRole('combobox').first().click();
        await this.page.getByRole('option', { name: 'Search by ID' }).click();
        await this.page.getByRole('textbox', { name: 'Enter User ID' }).click();
        await this.page.getByRole('textbox', { name: 'Enter User ID' }).fill(userId);
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.getByRole('button', { name: 'View' }).click();

    }

    async createUser(userData:UserModel) {

        await this.page.getByRole('link', { name: 'Create User' }).click();
        await this.page.getByRole('textbox', { name: 'Name' }).click();
        await this.page.getByRole('textbox', { name: 'Name' }).fill(userData.fullName);
        await this.page.getByRole('textbox', { name: 'Email' }).click();
        await this.page.getByRole('textbox', { name: 'Email' }).fill(userData.email);
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(userData.password);
        await this.page.getByRole('textbox', { name: 'Phone Number' }).click();
        await this.page.getByRole('textbox', { name: 'Phone Number' }).fill(userData.phoneNumber);
        await this.page.getByRole('textbox', { name: 'NID' }).click();
        await this.page.getByRole('textbox', { name: 'NID' }).fill(userData.nid);
        await this.page.getByLabel('', { exact: true }).click();
        await this.page.getByRole('option', { name: userData.role }).click();
        await this.page.getByRole('button', { name: 'Create User' }).click();
    }
}