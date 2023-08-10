const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");

async function prova() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {

        //RICORDARE DI FARLO COMPATIBILE CON FIREFOX E CRHOME
        //SE SI PUO

        // Go to Google
        await driver.get("https://miniclip.com/");







        ////this is google practice

        // let button = await driver.findElement(By.id("L2AGLb"));

        // // Wait for the "Before we start" popup to appear
        // await driver.wait(async () => {
        //     const element = await button.getAttribute("aria-hidden");
        //     return element !== "true";
        // });

        // // per clickare il buttone "prima di iniziare" acetta tutto
        // await button.click();

        // // scrivere "hello, world"
        // await driver.findElement(By.name("q")).sendKeys("hello, world!");

        // // USANDO UNTIL per aspetare che sia usabile, o visibile
        // let searchButton = await driver.findElement(By.name("btnK"));
        // await driver.wait(until.elementIsEnabled(searchButton));

        // // clicka il button con JS
        // await driver.executeScript("arguments[0].click();", searchButton);




        // Wait for a specified amount of time (e.g., 20 seconds) before quitting
        await new Promise(resolve => setTimeout(resolve, 20000));
    } catch (error) {
        console.error("---->THIS IS AN ERROR <----:", error);
    } finally {
        await driver.quit();
    }
}

prova();