
import { test, expect, Page } from "@playwright/test";
import {LoginPage} from "../page/login";
import { User } from "../page/user";

let page: Page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

})
test.afterAll(async () => {
    await page.close();
})


test("Admin login", async () => {
    await page.goto("https://dmoneyportal.roadtocareer.net/login");
    const loginPage = new LoginPage(page);
    loginPage.login("admin@dmoney.com", "1234");

    // assertion
    await expect(page.getByRole('banner')).toContainText('Admin Dashboard'); //1
    const headerText = await page.getByText("Admin Dashboard").textContent(); //2
    expect(headerText).toContain("Admin Dashboard");
    await expect(page.getByText("Admin dashboard")).toContainText("Admin Dashboard"); //3
   

})

test("Search by user ID", async () => {

    const searchUser = new User(page);
    await searchUser.searchUser("98821");

    await expect(page).toHaveURL(/.*\/users\/98821/);
    
})

test("Create new user", async () => {
    const createUser = new User(page);
    createUser.createUser("test user 90","abcd32@gmail.com","1234","01934086787","123456789","Customer")
    
})

