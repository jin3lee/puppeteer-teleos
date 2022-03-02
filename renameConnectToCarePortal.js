const puppeteer = require('puppeteer');
const websiteList = [ 
  'bertramnursing.com',
'bigspringcenterforskilledcare.com',
'birchwoodnursing.com',
'bluebonnetnursing.com',
'brownwoodrehab.com',
'buenavidanursing.com',
'buenavidasanantonio.com',
'caprocknursing.com',
'carenursingcenter.com',
'castlepinesatlufkin.com',
'cedarcreeknursing.com',
'centraltexasnursing.com',
'cherokeerosenursing.com',
'conchohealthandrehab.com',
'cottonwoodnursing.com',
'countryviewnr.com',
'crossroadsnursingandrehab.com',
'deeringsnursing.com',
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

      // open connect settings arrow
      await page.waitForSelector("#edit-2256");
      await page.click("#edit-2256");
      
      // change name of connect to care portal
      await page.waitForTimeout(1500);  
      await page.click("#edit-menu-item-title-2256");
      await page.click("#edit-menu-item-title-2256");
      for(var i = 0; i < 20; i++ ) {
        await page.keyboard.press("Backspace");
      }
      await page.type("#edit-menu-item-title-2256", "Care Portal");
      

      // save menu
      await page.waitForTimeout(3000);  
      await page.click("#save_menu_footer");
      await page.waitForTimeout(10000);  
      console.log("COMPLETED ", websiteUrl, "!!!!!!!!!!!!!!!!!!!");
    }
  //await browser.close();
})();