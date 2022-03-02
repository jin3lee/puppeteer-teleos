const puppeteer = require('puppeteer');

(async() => {

    const secondaryMenuName = "broadcastSecondaryMenu";
    var stepCount = 0;

    // open chromium //
    const browser = await puppeteer.launch({ headless: false });

    // website
    const args = process.argv.slice(2);
    var websiteURL = args[0].trim().toLowerCase().replace("https://", "");

    // append admin login portal
    var websiteAdminURL = "https://" + websiteURL + "/wp-admin";
    console.log(".........["+websiteAdminURL+"]")
    const email = "joseph@teleosmarketing.com";
    const password = "DMHceRzn7mEx";
    const pages = await browser.pages();
    var page = pages[0];
    // using the first page to to the website and wait for network to load
    await page.goto( websiteAdminURL, {waitUntil: 'networkidle2'});
    console.log(stepCount + "................", "go to " + websiteAdminURL);
    stepCount++;

    // wait for the selector input with the name loginform
    const userLoginInputId = "#user_login";
    const passwordInputId = "#user_pass";
    const loginSubmitButton = "#wp-submit";
    await page.waitForSelector(userLoginInputId);
    await page.type(userLoginInputId, email);
    await page.type(passwordInputId, password);
    await page.click(loginSubmitButton);
    console.log(stepCount + "................", "log in ", email, password);
    stepCount++;

    // go to divi builder
    // admin.php?page=et_theme_builder
    await page.waitForSelector(".wp-has-submenu");
    await page.goto( websiteAdminURL + "/admin.php?page=et_theme_builder", {waitUntil: 'networkidle2'});

    clickButton(page, ".et-tb-layout-placeholder__button", stepCount, "click global header");
    stepCount++;

    await page.waitForTimeout(4000);
    await page.mouse.click(400, 330);
    stepCount++;

    await page.waitForTimeout(13000);
    console.log("clicked purple");
    await page.mouse.click(400, 555);
    stepCount++;

    await page.waitForTimeout(5000);
    console.log("clicked module");
    await page.mouse.click(80, 555);
    stepCount++;

    await page.waitForTimeout(5000);
    console.log("clicked add section");
    await page.mouse.click(400, 240);
    stepCount++;

    await page.waitForTimeout(5000);
    console.log("clicked add click library");
    await page.mouse.click(418, 325);
    stepCount++;

    
    await page.waitForTimeout(5000);
    console.log("clicked add click library");
    await page.type("#et-fb-filterByTitle", "script_header_and_subheader");
    stepCount++;

    await page.waitForTimeout(5000);
    console.log("clicked tab");
    await page.keyboard.press("Tab");
    stepCount++;

    await page.waitForTimeout(1000);
    console.log("clicked enter");
    await page.keyboard.press("Enter");
    stepCount++;

    await page.waitForTimeout(5000);
    console.log("delete empty header");
    await page.mouse.click(165, 85);
    stepCount++;
    
    await page.waitForTimeout(3000);
    console.log("clicked save global header");
    await page.mouse.click(745, 555);
    stepCount++;

    await page.waitForTimeout(7000);
    console.log("close builder");
    await page.mouse.click(765, 15);
    stepCount++;
    
    await page.waitForTimeout(5000);
    console.log("save builder");
    // await page.mouse.click(175, 125);
    page.click(".et-common-button.et-tb-admin-save-button");
    stepCount++;

    /// go to disable meg menu
    await page.waitForTimeout(10000);
    console.log("go to nav menu");
    await page.goto( websiteAdminURL + "/nav-menus.php", {waitUntil: 'networkidle2'});

    // click megamenu_enabled
    await page.waitForTimeout(1000);
    console.log("click check box");
    await page.evaluate(() => {
        let checkbox = document.querySelector("input.megamenu_enabled");
        checkbox.checked = false;
    });

    await page.waitForTimeout(5000);
    clickButton(page, "input#submit", stepCount, "remove and save megamenu primary settings.");

    await page.waitForTimeout(5000);
    clickButton(page, "input#save_menu_footer", stepCount, "save menu settings!");

    await page.waitForTimeout(3000);
    clickButton(page, "input#save_menu_footer", stepCount, "save menu settings!");
    
    await page.waitForTimeout(5000);
    await page.goto( "https://" + websiteURL, {waitUntil: 'networkidle2'});
})()

async function clickButton(page, selector, step, actionDetail ) {
    console.log( step + "................", " attempting to click " + actionDetail);
    await page.waitForSelector(selector);
    await page.click(selector);
    console.log( step + "................", " successfully clicked " + actionDetail);
}

async function typeInput(page, selector, value, step, actionDetail ) {
    console.log( step + "................", " attempting to click " + actionDetail);
    await page.waitForSelector(selector);
    page.waitForTimeout(1000);
    await page.type(selector, value);
    console.log( step + "................", " successfully clicked " + actionDetail);
}

function getElementsArrayById( page, idAsString ) {
    // search for element
    var searchArray = page.getElementById( idAsString );

    // return element if found
    if( searchArray != -1 ) {
        return searchArray;
    }

    // otherwise return null
    return null;
}


function getElementsByClassName( page, classNameAsString ) {
    // search for element
    var searchArray = page.querySelector( classNameAsString );

    // return element if found
    if( searchArray ) {
        return searchArray;
    }

    // otherwise return null
    return null;
}