const {By, Builder, Browser} = require("selenium-webdriver");
const assert = require("assert");
const { text } = require("stream/consumers");

(async function firstTest() {
  let driver;
  
  try {
    //Start the session
    driver = await new Builder().forBrowser(Browser.CHROME).build();

    //Navigating to the selenium site
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    //Request the title
    let title = await driver.getTitle();
    console.log(title);

    //Use an implicit wait to sync the code with the current state of the browser
    await driver.manage().setTimeouts({implicit: 3500});

    //finding some html elements
    let textBox = await driver.findElement(By.name('my-text'));
    let theId = await textBox.getId();

    let submitButton = await driver.findElement(By.css('button'));
    let value = await submitButton.getText();

    console.log(textBox);
    console.log(value);
    console.log(theId);

    //click on a submit button
    await textBox.sendKeys('Selenium');
    await submitButton.click();

    //Request element information
    let message = await driver.findElement(By.id('message'));
    let value2 = await message.getText();

    console.log(value2);
  } catch (e) {
    console.log(e)
  } finally {
    /* This ends the driver process, which by default closes the browser as well. 
     * No more commands can be sent to this driver instance. */
    await driver.quit();
  }
}())