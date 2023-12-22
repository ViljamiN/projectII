const { test, expect } = require("@playwright/test");

test("Server responds with correct heading and statistics", async ({ page }) => {
    await page.goto("http://localhost:7777");

    // Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Drill and practice");

    // Check for statistics section
    await expect(page.locator("h2")).toHaveText("Application Statistics");

    // Extract and check statistics using the new classname
    console.log(await page.innerHTML("body"));
    const topicsCount = page.locator("css.statistics");
    // const questionsCount = await page.waitForSelector(".statistics li:nth-child(2)");
    //const answersCount = await page.waitForSelector(".statistics li:nth-child(3)");

    expect(topicsCount).toBe("Amount of topics: 1");
    //expect(questionsCount.).toBe("Amount of questions: 0");
    //expect(answersCount.).toBe("Amount of answers: 0");
});
/*
test("Register Page response is correct", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/register");

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Register");

    // Check for form elements
    await expect(page.locator("form[method='POST'][action='/auth/register']")).toExist();
    await expect(page.locator("form input[name='email']")).toExist();
    await expect(page.locator("form input[name='password']")).toExist();
    await expect(page.locator("form button[type='submit']")).toHaveText("Register");

    //Create a new user
    await page.fill("form input[name='email']", "teemu.teekkari@teekkari.fi");
    await page.fill("form input[name='password']", "salasana");
    await page.click("form button[type='submit']");
});

test("Login Page response is correct", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login");

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Login");

    // Check for form elements
    await expect(page.locator("form[method='POST'][action='/auth/login']")).toExist();
    await expect(page.locator("form input[name='email']")).toExist();
    await expect(page.locator("form input[name='password']")).toExist();
    await expect(page.locator("form button[type='submit']")).toHaveText("Login");

    //Login with a user
    await page.fill("form input[name='email']", "teemu.teekkari@teekkari.fi");
    await page.fill("form input[name='password']", "salasana");
    await page.click("form button[type='submit']");

    //Check that redirection to the topics page happened
    await expect(page.locator("h1")).toHaveText("Topics");
});

test("Topics Page 1 response is correct", async ({ page }) => {
    await page.goto("http://localhost:7777/topics/1");

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Topics");

    // Check for form elements
    await expect(page.locator("form[method='POST'][action='/topics']")).toExist();
    await expect(page.locator("form input[name='name']")).toExist();
    await expect(page.locator("form button[type='submit']")).toHaveText("Add");

    //Create a new topic
    await page.fill("form input[name='name']", "Test topic");
    await page.click("form button[type='submit']");

    //Check that the topic was created
    await expect(page.locator("a[role='button']")).toHaveText("Test topic");
    
});
*/
