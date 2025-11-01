import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page/login";
import { User } from "../page/user";
import { Role, UserModel } from "../models/user.model";
import { faker } from '@faker-js/faker';
import { generateRandomNumber, saveJsonData } from "../utils/utils";

let page: Page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

})
test.afterAll(async () => {
    await page.close();
})

test.describe.serial(async () => {
    test("Admin login",{tag:"@smoke"}, async () => {
        await page.goto("https://dmoneyportal.roadtocareer.net/login");
        const loginPage = new LoginPage(page);
        await loginPage.login("admin@dmoney.com", "1234");

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

    test("Create new user", {tag:"@smoke"}, async () => {
        const createUser = new User(page);
        // createUser.createUser("test user 90","abcd32@gmail.com","1234","01934086787","123456789","Customer")

        const userData: UserModel = {
            fullName: faker.person.fullName(),
            email: `nadim.cse.edu+${generateRandomNumber(1000, 9999)}@gmail.com`,
            password: "1234",
            phoneNumber: `0190${generateRandomNumber(1000000, 9999999)}`,
            nid: "123456789",
            role: Role.Customer
        }
        createUser.createUser(userData);
        saveJsonData(userData, "resources/users.json")
        await page.pause();


    })


});


