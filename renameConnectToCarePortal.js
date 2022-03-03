const puppeteer = require('puppeteer');
const websiteList = [ 
  'navasotanursing.com',
'northpointenursing.com',
'oakridgemanornursing.com',
'oasisnursing.com',
'pebblenursing.com',
'pinetreenursing.com',
'refugionursing.com',
'riverccc.com',
'https://rockcreekhealth.com',
'sansabarehab.com',
'sevenoaksnursing.com',
'siennanursing.com',
'silvertreenursing.com',
'skilledcareofmexia.com',
'slatoncarecenter.com',
'songbirdnursing.com',
'southernspecialtynursing.com',
'stgilesnursing.com',
'stteresanursing.com',
'sunflowerparkhealth.com',
'thearborsnursing.com',
'atriumofbellmead.com',
'https://hillsnursing.com',
'premierofalice.com',
'rioatmissiontrails.com',
'twinoakscare.com',
'universityparknr.com',
'vidorhealth.com',
'villatoscanarehab.com',
'wellingtoncarecenter.com',
'Westwardtrailsnursing.com/',
'whisperingpinescare.com',
'whisperwoodnursing.com'
];


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
      await page.waitForTimeout(100);  
      await page.type("#user_login", email);

      // password
      await page.type("#user_pass", password);

      // click submit
      await page.click("#wp-submit");
      
      // go to 
      await page.waitForSelector(".ab-icon");
      await page.goto(adminPortal + "/nav-menus.php"); 

      var carrotId = await page.evaluate(() => {
          let carrots = document.querySelectorAll("a.item-edit");
          return carrots[carrots.length-1].id;
      });

      var id = carrotId.replaceAll("edit-","");
      // open connect settings arrow
      let connectEditId = "#" + carrotId;
      await page.click(connectEditId);


      // ranme label
      await page.waitForTimeout(3000);  
      await page.click("#edit-menu-item-title-" + id);
      await page.click("#edit-menu-item-title-" + id);
      for(var i = 0; i < 20; i++ ) {
        await page.keyboard.press("Backspace");
      }
      await page.type("#edit-menu-item-title-" + id, "Care Portal");


      // save menu
      await page.click("#save_menu_footer");
      await page.waitForTimeout(5000);  
      console.log("COMPLETED ", websiteUrl, "!!!!!!!!!!!!!!!!!!!");
    }
})();