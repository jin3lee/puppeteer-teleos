const puppeteer = require('puppeteer');
const websiteList = [ 
];

// const cars = ["Saab", "Volvo", "BMW"];

(async () => {

    const browser = await puppeteer.launch({ headless: false });

    for( var website in websiteList ) {
      var websiteUrl = websiteList[website]; // website
      var adminPortal = "https://" + websiteUrl.replaceAll("https://", "").replaceAll("/","") + "/wp-admin";

      // login credentials
      const email = "joseph@teleosmarketing.com";
      const password = "DMHceRzn7mEx";

      // open site
      var page = await browser.newPage();
      await page.goto(adminPortal);

      // email
      await page.waitForSelector("#user_login");
      await page.type("#user_login", email);

      // password
      await page.type("#user_pass", password);

      // click submit
      await page.click("#wp-submit");
      
      // go to 
      await page.waitForSelector(".ab-icon");
      await page.goto(adminPortal + "/nav-menus.php"); 

      // click delete -109 - CONTACT
      await page.waitForSelector("#select-menu-to-edit");
      await page.click("#edit-109");
      await page.waitForTimeout(1500);  // wait to click delete contact
      await page.waitForSelector("#delete-109");
      await page.click("#delete-109");
      console.log(".........deleted contact");
      
      // * 438 - SNF
      // * 2559 - MEM - Granbury
      // Delete - 438 - PHONENUMBER
      await page.waitForSelector("#edit-438");
      await page.click("#edit-438");
      await page.waitForTimeout(1500);  // wait to click delete phone
      await page.waitForSelector("#delete-438");
      await page.click("#delete-438");
      console.log(".........deleted phonenumber");

      // remove connect page
      await page.waitForSelector("#edit-61");
      await page.click("#edit-61");
      await page.waitForTimeout(1500);  // wait to click delete connect
      await page.waitForSelector("#delete-61");
      await page.click("#delete-61");
      console.log(".........deleted connect page");

      // click left sidebar page accordian li
      await page.click("#add-post-type-page");
      await page.waitForTimeout(1500);  // wait for accordian to open
      await page.evaluate(() => {
        let checkbox = document.querySelector(".menu-item-checkbox");
        checkbox.checked = true;
        console.log("checked the box", checkbox);
      });

      // add to menu button
      await page.click("#submit-posttype-page");
      console.log("add connect to menu");

      // save menu
      await page.waitForTimeout(3000);  
      await page.click("#save_menu_footer");
      await page.waitForTimeout(10000);  
      console.log("COMPLETED ", websiteUrl, "!!!!!!!!!!!!!!!!!!!");
    }
  //await browser.close();
})();