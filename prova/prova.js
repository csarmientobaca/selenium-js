const { By, Builder, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function prova() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // Go to miniclip
        await driver.get("https://miniclip.com/");

        // Find the <span> element with the text "Accept" and click on it
        let acceptButton = await driver.findElement(By.xpath('//span[text()="Accept"]'));
        await acceptButton.click();

        // Go to /GAMES ROUTE
        let gamesLink = await driver.findElement(By.linkText('Games'));
        await gamesLink.click();

        let totalFeaturedEntries = 0;

        while (true) {
            await driver.wait(until.titleContains("Games"), 10000);

            let featuredEntryElements = await driver.findElements(By.css('.featured-entry'));
            let numberOfFeaturedEntries = featuredEntryElements.length;
            totalFeaturedEntries += numberOfFeaturedEntries;
            console.log('Number of games inside loop:', totalFeaturedEntries);

            try {
                let nextPageLink = await driver.findElement(By.xpath('//a[contains(text(), "Next Page")]'));
                await nextPageLink.click();

                // Wait for the new page to load
                await driver.wait(until.stalenessOf(nextPageLink));
            } catch (error) {
                if (error.name === "NoSuchElementError") {
                    console.log("---non ce piu: 'Next Page'---");
                    break;
                } else {
                    throw error;
                }
            }
        }

        console.log('numero totale di giochi:', totalFeaturedEntries);

        //quanto tempo rimane aperto
        await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
        console.error("---->THIS IS AN ERROR <----:", error);
    } finally {
        await driver.quit();
    }
}

prova();
