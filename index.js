const { By, Builder, Key, until } = require("selenium-webdriver");
const { spawnSync } = require('child_process');
require("chromedriver");


async function openAndCount() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // Go to miniclip
        await driver.get("https://miniclip.com/");

        // Run script synchronously
        const byeScript = spawnSync('node', ['./checklink/index.js'], { stdio: 'inherit' });

        if (byeScript.error) {
            console.error('checklink encountered an error:', byeScript.error);
        } else {
            console.log('checklink finished successfully');
        }


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

            try {
                let nextPageLink = await driver.findElement(By.xpath('//a[contains(text(), "Next Page")]'));
                await nextPageLink.click();

                // Wait for the new page to load
                await driver.wait(until.stalenessOf(nextPageLink));
            } catch (error) {
                if (error.name === "NoSuchElementError") {
                    break;
                } else {
                    throw error;
                }
            }
        }

        console.log('numero totale di giochi:', totalFeaturedEntries);

        // Go to /careers ROUTE
        let careersLink = await driver.findElement(By.linkText('Careers'));
        await careersLink.click();

        let genoaSelect;
        let retries = 0;
        const maxRetries = 3;

        while (retries < maxRetries) {
            try {
                genoaSelect = await driver.findElement(By.xpath('//option[text()="Genoa, Italy"]'));
                await genoaSelect.click();
                break;
            } catch (error) {
                retries++;
                await driver.sleep(1000);
            }
        }

        if (!genoaSelect) {
            console.log('niente, nonce la opzione.');
        } else {
            console.log('Genoa Selezionato');
        }

        await driver.wait(until.titleContains("Vacancies"), 10000);

        // Count the number of elements with the "truncate" class
        let truncateElement = await driver.findElements(By.css('.truncate'));

        let numberOfTruncate = truncateElement.length;

        console.log('numeri di posizioni aperte a genova:', numberOfTruncate);

        //time it is open
        await new Promise(resolve => setTimeout(resolve, 10000));
    } catch (error) {
        console.error("---->THIS IS AN ERROR <----:", error);
    } finally {
        await driver.quit();
    }
}

openAndCount();
