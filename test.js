const puppeteer = require('puppeteer');

(async() => {

    const secondaryMenuName = "broadcastSecondaryMenu";
    var stepCount = 0;

    // open chromium //
    const browser = await puppeteer.launch({ headless: false });

    // website
    const args = process.argv.slice(2);
    var websiteURL = args[0].trim().toLowerCase();
    var phoneNumber = args[1].trim();

    // append admin login portal
    var websiteAdminURL = "https://" + websiteURL + "/wp-admin";
    console.log(".........["+websiteAdminURL+"]")
    const email = "joseph@teleosmarketing.com";
    const password = "DMHceRzn7mEx";
    const pages = await browser.pages();
    var page = pages[0];
    // using the first page to to the website and wait for network to load
    await page.goto( websiteAdminURL, {waitUntil: 'networkidle2'});

    console.log("1................", "go to " + websiteAdminURL);

    // wait for the selector input with the name loginform
    const userLoginInputId = "#user_login";
    const passwordInputId = "#user_pass";
    const loginSubmitButton = "#wp-submit";
    await page.waitForSelector(userLoginInputId);
    await page.type(userLoginInputId, email);
    await page.type(passwordInputId, password);
    await page.click(loginSubmitButton);


    console.log("2................", "log in ", email, password);

    // open APPEARANCE/nav-menu
    console.log("3................", " attempting to clicked appearance ");
    const appearanceId = "#menu-appearance";
    await page.waitForSelector(appearanceId);
    await page.goto( websiteAdminURL + "/nav-menus.php", {waitUntil: 'networkidle2'});
    console.log("3................", " successfully clicked appearance ");

    // click create a new menu
    console.log("4................", " attempting to create a new menu ");
    await page.waitForSelector(".add-edit-menu-action");
    await page.goto( websiteAdminURL + "/nav-menus.php?action=edit&menu=0", {waitUntil: 'networkidle2'});
    console.log("4................", " successfully create a new menu ");

    // fill menu name
    console.log("5................", " attempting to fill menu name ");
    await page.waitForSelector("#menu-name");
    await page.type("#menu-name", secondaryMenuName);
    console.log("5................", " successfully fill menu name");

    
    // check the secondary menu checkbox
    console.log("6................", " attempting to check the secondary menu checkbox");
    await page.waitForSelector("#locations-secondary-menu");
    await page.click("#locations-secondary-menu");
    await page.click("#locations-secondary-menu");
    console.log("6................", " successfully check the secondary menu checkbox");
    stepCount = 7;

    // save_menu_footer
    clickButton(page, "#save_menu_footer", stepCount, "press save menu"); // 725, 550
    await page.waitForSelector("#save_menu_footer");
    await page.waitForTimeout(3000);
    await page.mouse.click(725, 550);
    stepCount++;

    // click custom links
    clickButton(page, "#add-custom-links", stepCount, "press add-custom-links").then(
        ()=>{
            stepCount++;
            // type phonenumber url
            typeInput(page, "#custom-menu-item-url", "tel:"+phoneNumber.replaceAll("-",""), stepCount, "type phonenumber url").then(
                ()=>{
                    stepCount++;
                    typeInput(page, "#custom-menu-item-name", phoneNumber, stepCount, "type phonenumber url").then(
                        ()=>{
                            stepCount++;
                            clickButton(page, "#submit-customlinkdiv", stepCount, "click add to Menu").then(()=>{
                                stepCount++;

                                clickButton(page, "#add-post-type-page", stepCount, "click pages").then(
                                    ()=>{
                                        stepCount++;
                                    }
                                );
                            });
                        }
                    );
                }
            );
        }
    );


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