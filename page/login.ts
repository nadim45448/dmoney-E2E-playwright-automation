import { Page } from "@playwright/test";

export class LoginPage {
    // let page:Page; // do not need this in typescript
    constructor(private page: Page) {
        // this.page = page; // typescript assign it automatically
    }
    async login(email: string, Password: string) {
        await this.page.getByRole("textbox", { name: "Email or Phone Number" }).fill("admin@dmoney.com");
        await this.page.getByRole("textbox", { name: "Password" }).fill("1234");
        await this.page.getByRole("button", { name: "LOGIN" }).click()

    }

}