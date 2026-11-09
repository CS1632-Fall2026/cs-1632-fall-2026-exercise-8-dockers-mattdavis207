import { test, expect } from '@playwright/test';

// TODO: Fill in with test cases.

// test fixture
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.evaluate(() => {
        document.cookie = "1=false";
        document.cookie = "2=false";
        document.cookie = "3=false";
    })
})



test('TEST-1-RESET', async ({ page }) => {

    // Preconditions
    await page.evaluate(() => {
        document.cookie = "1=true";
        document.cookie = "2=true";
        document.cookie = "3=true";
    })

    // Execution steps
    await page.getByRole('link', { name: 'Reset' }).click();

    // Postconditions
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(0)).toHaveText('ID 1. Jennyanydots');
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(2)).toHaveText('ID 3. Mistoffelees');
  });

test('TEST-2-CATALOG', async ({ page}) => {

    // Preconditions
    // None

    // Execution steps
    await page.getByRole('link', { name: 'Catalog' }).click();

    //Postconditions
    await expect(page.getByRole('list', { name: 'Cat photos' }).getByRole("listitem").nth(1).getByRole("img")).toHaveAttribute('src', "/images/cat2.jpg");

})

test('TEST-3-LISTING', async ({ page }) => {

    // Preconditions
    // None

    // Execution steps
    await page.getByRole('link', { name: 'Catalog' }).click();

    // Postconditions
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole("listitem")).toHaveCount(3);
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(2)).toHaveText('ID 3. Mistoffelees');
})

test('TEST-4-RENT-A-CAT', async ({ page }) => {

    // Preconditions
    // None

    // Execution steps
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();

    // Postconditions
    await expect(page.getByRole('button', { name: 'Rent' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Return' })).toBeVisible();
})

test('TEST-5-RENT', async ({ page }) => {

    // Preconditions
    // None

    // Execution steps
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).fill('1');
    await page.getByRole('button', { name: 'Rent' }).click();

    // Postconditions
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(0)).toHaveText('Rented out');
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(2)).toHaveText('ID 3. Mistoffelees');
    await expect(page.getByText('Success!')).toBeVisible()
})

test('TEST-6-RETURN', async ({ page }) => {

    // Preconditions
    await page.evaluate(() => {
        document.cookie = "2=true";
        document.cookie = "3=true";
    })

    // Execution steps
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to return:' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to return:' }).fill('2');
    await page.getByRole('button', { name: 'Return' }).click();

    // Postconditions
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(0)).toHaveText('ID 1. Jennyanydots');
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(page.getByRole('list', { name: 'Cat names' }).getByRole('listitem').nth(2)).toHaveText('Rented out');
    await expect(page.getByText('Success!')).toBeVisible();
})

test('TEST-7-FEED-A-CAT', async ({ page }) => {

    // Preconditions
    // None

    // Execution steps
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();

    // Postconditions
    await expect(page.getByRole('button', { name: 'Feed' })).toBeVisible();
})

test('TEST-8-FEED', async ({ page }) => {

    // Preconditions
    // None

    // Execution steps
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Number of catnips to feed:' }).click();
    await page.getByRole('textbox', { name: 'Number of catnips to feed:' }).fill('6');
    await page.getByRole('button', { name: 'Feed' }).click();

    // Postconditions
    await expect(page.getByText('Nom, nom, nom.')).toBeVisible({ timeout: 10_000 });
})

test('TEST-9-GREET-A-CAT', async ({ page }) => {

    // Preconditions
    // None

    // Execution steps
    await page.getByRole('link', { name: 'Greet-A-Cat' }).click();

    // Postconditions
    await expect(page.getByText('Meow!Meow!Meow!')).toBeVisible();
})

test('TEST-10-GREET-A-CAT-WITH-NAME', async ({ page }) => {

    // Preconditions
    // None

    // Execution steps
    await page.goto("https://cs1632.appspot.com/greet-a-cat/Jennyanydots");

    // Postconditions
    await expect(page.getByText('Meow! from Jennyanydots.')).toBeVisible();
})

test('TEST-11-FEED-A-CAT-SCREENSHOT', async ({ page }) => {

    // Preconditions
    await page.evaluate(() => {
        document.cookie = "1=true";
        document.cookie = "2=true";
        document.cookie = "3=true";
    })

    // Execution steps
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();

    // Postconditions
    await expect(page.locator('body')).toHaveScreenshot('TEST-11-FEED-A-CAT-SCREENSHOT-1.png');
})