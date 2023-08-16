const { By, Builder, Key, until } = import("selenium-webdriver");
import("chromedriver");

import fetch from 'node-fetch';

async function fetchPageSource(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const pageSource = await response.text();
            return pageSource;
        } else {
            console.log('Error fetching page:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
}

// URLs to fetch page source from
const mainpage = 'http://miniclip.com';
const url = 'http://miniclip.com/games/genre-2/multiplayer/EN/#t-n-H';

(async () => {
    const pageSource1 = await fetchPageSource(mainpage);
    const pageSource2 = await fetchPageSource(url);

    if (mainpage !== url) {
        if (pageSource1 === pageSource2) {
            console.log('invalid link =>', url);
        } else {
            console.log('valid link', url);
        }
    }
    else {
        console.log("the links is the same as the mainpage")
    }
})();


