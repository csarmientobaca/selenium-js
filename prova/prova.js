const { lstat } = require("fs");
const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");

async function prova() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {

        //RICORDARE DI FARLO COMPATIBILE CON FIREFOX E CRHOME
        //SE SI PUO

        // Go to miniclip
        await driver.get("https://miniclip.com/");

        // Find the <span> element with the text "Accept"
        let acceptButton = await driver.findElement(By.xpath('//span[text()="Accept"]'));

        // Click on the <span> element
        await acceptButton.click();


        //ASSERT THAT THE LINK IS NOT VALID WITH A HHTPS RESPONSE


        //////////////////////////


        //GO TO /GAMES ROUTE
        let gamesLink = await driver.findElement(By.linkText('Games'));
        await gamesLink.click();


        // WAIT FOR THE PAGE TO LOAD
        await driver.wait(until.titleContains("Games"), 3000);

        // COUNT THE NUMBER OF <article> ELEMENTS WITHIN THE <section>
        let featuredEntryElements = await driver.findElements(By.css('.featured-entry'));
        let numberOfFeaturedEntries = + featuredEntryElements.length;


        let nextPageLink = await driver.findElement(By.xpath('//a[contains(text(), "Next Page")]'));
        await driver.wait(until.elementIsEnabled(nextPageLink));
        await nextPageLink.click();
        // COUNT THE NUMBER OF <article> ELEMENTS WITHIN THE <section>


        console.log('Number of games:', numberOfFeaturedEntries);

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
        await new Promise(resolve => setTimeout(resolve, 3000000));
    } catch (error) {
        console.error("---->THIS IS AN ERROR <----:", error);
    } finally {
        await driver.quit();
    }
}

prova();