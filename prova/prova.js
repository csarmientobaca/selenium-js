const { By, Builder, Key, until } = require("selenium-webdriver");
require("chromedriver");


const http = require('http');
const https = require('https');

function assertLinkNotValid(link) {
    const httpModule = link.startsWith('https') ? require('https') : require('http');

    return new Promise((resolve, reject) => {
        httpModule.get(link, (response) => {
            // console.log("------response:", response);
            console.log(response.statusCode)
            if (response.statusCode === 200 || 301) {
                console.log("------response 200");

                try {
                    const responseUrl = response.responseUrl || link;
                    // console.log(link);
                    const responseParsedUrl = new URL(responseUrl);
                    // console.log(responseParsedUrl);

                    if (response.headers['x-cache'] === 'Error from cloudfront') {
                        console.log('Link is invalid due to CloudFront error.');
                        reject(new Error('Link is not a valid route.'));
                    } else if (responseParsedUrl.pathname === new URL(link).pathname) {
                        console.log('Valid link => ', link);
                        resolve();
                    } else {
                        console.log('Link redirects to another route. Not a valid route.');
                        reject(new Error('Link is not a valid route.'));
                    }
                } catch (error) {
                    console.error("Error creating URL instance:", error);
                    reject(error);
                }
            } else {
                console.log('not a valid response');  // Print when the link returns a non-200 nor 301 status code
                resolve();  // Resolve for invalid link
            }
        }).on('error', (error) => {
            console.log('Link is invalid.', error);  // Print when there's an error fetching the link
            resolve();  // Resolve for invalid link
        });
    });
}

// check the link if is valid
const inputUrl = 'https://miniclip.com/games';

assertLinkNotValid(inputUrl)
    .then(() => {
    })
    .catch((error) => {
        console.error('Assertion failed:', error.message);
    });


///second function
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

        // Go to /careers ROUTE
        let careersLink = await driver.findElement(By.linkText('Careers'));
        await careersLink.click();

        // brute force it to win
        let genoaSelect;
        let retries = 0;
        const maxRetries = 3;

        while (retries < maxRetries) {
            try {
                genoaSelect = await driver.findElement(By.xpath('//option[text()="Genoa, Italy"]'));
                await genoaSelect.click();
                break;
            } catch (error) {
                console.log('provando.....');
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

        //quanto tempo rimane aperto
        await new Promise(resolve => setTimeout(resolve, 10000));
    } catch (error) {
        console.error("---->THIS IS AN ERROR <----:", error);
    } finally {
        await driver.quit();
    }
}

prova();
