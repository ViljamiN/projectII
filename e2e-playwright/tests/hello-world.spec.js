const { test, expect } = require("@playwright/test");

const pagesToTest = [
    { url: "http://localhost:7777", name: "Home" },
    { url: "http://localhost:7777/auth/register", name: "Topics" },
    { url: "http://localhost:7777/auth/login", name: "Quiz" },
];

const pagesToTestAfterLogin = [
    { url: "http://localhost:7777/topics/", name: "Topics" },
    { url: "http://localhost:7777/topics/1", name: "Topic 1" },
    { url: "http://localhost:7777/topics/1/questions/1", name: "Question 1" },
    { url: "http://localhost:7777/quiz/", name: "Quiz" },
    { url: "http://localhost:7777/quiz/1/questions/1", name: "Quiz Question 1" },
    { url: "http://localhost:7777/quiz/1/questions/1/correct", name: "Quiz Question 1 correct" },
];

// #1 Initial test to se that the application is running and the server responds
test("Server responds with correct heading", async ({ page }) => {
    await page.goto("http://localhost:7777");

    // Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Drill and practice");

    // Check for statistics section
    await expect(page.locator("h2")).toHaveText("Application Statistics");
});

// #2
test("Can open register page and register a new user", async ({ page }) => {
    await page.goto("http://localhost:7777");
    await page.locator(`a >> text='Register'`).click();

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Register");

    // Register a new user
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    //Check that redirection to the login page happened
    await expect(page.locator("h1")).toHaveText("Login");
});

// #3
test("Can open login page and login with a user", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login");

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Login");

    // Login with a user
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    //Check that redirection to the topics page happened
    await expect(page.locator("h1")).toHaveText("Topics");
});

// #4
test("Topics response is correct when logged as a user", async ({ page }) => {
    await page.goto("http://localhost:7777/topics/");

    // Login with a user
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Topics");

    // Check that topic 1 exists on the page
    await expect(page.locator("li")).toContainText(["Finnish language"]);
});

// #5
test("Topics 1 response is correct when logged as a user", async ({ page }) => {
    await page.goto("http://localhost:7777/topics/");

    // Login with a user
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Topics");

    // Click on topic 1
    await page.locator(`li >> text='Finnish language'`).click();

    //check that the page has all the correct elements
    await expect(page.locator("h1")).toHaveText("Finnish language");
    await expect(page.locator("h2")).toHaveText("Write a question for this topic!");
    await expect(page.locator("textarea")).toHaveText("");
    await expect(page.locator("button[type=submit]")).toHaveText("Add");
});

// #6
test("Can view quiz page when logged as a user", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login/");

    // Login with a user
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    await page.goto("http://localhost:7777/quiz/");

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Quiz topics");

    // Check that topic 1 exists on the page
    await expect(page.locator("li")).toContainText(["Finnish language"]);
});

// #7
test("Can view quiz for topic 1 when logged as a user", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login/");

    // Login with a user
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    await page.goto("http://localhost:7777/quiz/");

    //Check that the page has the correct heading
    await expect(page.locator("h1")).toHaveText("Quiz topics");

    // Click on topic 1
    await page.locator(`li >> text='Finnish language'`).click();

    //check that the page has no questions
    await expect(page.locator("h2")).toHaveText("This topic does not have any questions yet.");
});

// #8
test("Can add a question to topic as a user", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login/");

    // Login with a user
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    await page.goto("http://localhost:7777/topics/");

    // Click on topic 1
    await page.locator(`li >> text='Finnish language'`).click();

    // Add a question
    await page.locator("textarea").type("test question");
    await page.locator("button[type=submit]").click();

    // check that the question was added
    await expect(page.locator("div")).toContainText(["test question"]);
});

// #9
test("Can add an answer option to a question as a user", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/login/");

    // Login with a user
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    await page.goto("http://localhost:7777/topics/1");

    // Click on the question
    await page.locator(`div >> text='test question'`).click();

    // check that the question is shown
    await expect(page.locator("h1")).toHaveText("test question");
    await expect(page.locator("h2")).toHaveText("Please enter the answer options for the question.");

    // Add an answer option
    await page.locator("textarea").type("test answer option");
    //check iscorrect checkbox
    await page.locator("input[type=checkbox]").check();
    await page.getByRole("button", { name: "Submit" }).click();

    //check that the answer option was added
    await expect(page.locator("div")).toContainText(["test answer option\nCorrectness: true"]);
});

// #10
test(`Navigation bar exists on all pages when not logged in`, async ({ page }) => {
    // Check that the navigation bar exists on all pages when not logged in
    for (const pageToTest of pagesToTest) {
        await page.goto(pageToTest.url);
        await expect(page.locator("a.navlink")).toHaveText(["Home", "Topics", "Quiz"]);
    }

    // Login with a user
    await page.goto("http://localhost:7777/auth/login");
    await page.locator("input[type=email]").type("teemu.teekkari@teekkari.fi");
    await page.locator("input[type=password]").type("testPass");
    await page.locator("button[type=submit]").click();

    // Check that the navigation bar exists on all pages when logged in
    for (const pageToTest of pagesToTestAfterLogin) {
        await page.goto(pageToTest.url);
        await expect(page.locator("a.navlink")).toHaveText(["Home", "Topics", "Quiz"]);
    }
});
