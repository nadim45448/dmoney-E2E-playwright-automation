// without OOP

import { test, expect, Page } from "@playwright/test";
let page: Page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

})
test.afterAll(async () => {
    await page.close();
})


test("Admin login", async () => {
    // page fixture: initiate browser automatically
    await page.goto("https://dmoneyportal.roadtocareer.net/login");
    await page.getByRole("textbox", { name: "Email or Phone Number" }).fill("admin@dmoney.com");
    await page.getByRole("textbox", { name: "Password" }).fill("1234");
    await page.getByRole("button", { name: "LOGIN" }).click();

    // assertion
    await expect(page.getByRole('banner')).toContainText('Admin Dashboard'); //1
    const headerText = await page.getByText("Admin Dashboard").textContent(); //2
    expect(headerText).toContain("Admin Dashboard");
    await expect(page.getByText("Admin dashboard")).toContainText("Admin Dashboard"); //3
    // await page.pause();

})

test("Search by user ID", async () => {

    await page.getByRole('link', { name: 'User List' }).click();
    await page.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Search by ID' }).click();
    await page.getByRole('textbox', { name: 'Enter User ID' }).click();
    await page.getByRole('textbox', { name: 'Enter User ID' }).fill('98821');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: 'View' }).click();
    await expect(page).toHaveURL(/.*\/users\/98821/);
    // await page.pause();
})

// we do not want to login again and again. Instead of page fixture we will use browser fixture that. So that for all test instead of separate browser open, we will open only one browser.
// When we will use browser fixture we do not keep page in the test()

//test("Search by user ID", async ({ page }){
//} => test("Search by user ID", async (){
//}

test("Create new user", async () => {
    await page.getByRole('link', { name: 'Create User' }).click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('test1099');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('testbd@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.getByRole('textbox', { name: 'Phone Number' }).click();
    await page.getByRole('textbox', { name: 'Phone Number' }).fill('01840069902');
    await page.getByRole('textbox', { name: 'NID' }).click();
    await page.getByRole('textbox', { name: 'NID' }).fill('123456789');
    await page.getByLabel('', { exact: true }).click();
    await page.getByRole('option', { name: 'Customer' }).click();
    await page.getByRole('button', { name: 'Create User' }).click();
    await page.pause();
})

// Next: convert this file into OOP
