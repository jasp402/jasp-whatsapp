exports.setSmartReplay = async (page, spinner) => {
    spinner.start('Setting smart replay...');
    await page.waitForSelector('#app');
    await page.evaluate(`
                var observer = new MutationObserver((mutations) => {
                for (var mutation of mutations) {
                    if (mutation.addedNodes.length && mutation.addedNodes[0].id === 'main') {
                        console.log(mutation.addedNodes[0].id);
                        console.log("Chat changed!");
                        WAPI.addOptions();
                        WAPI.modalSettings();
                    }
                }
            });
            observer.observe(document.querySelector('#app'), { attributes: false, childList: true, subtree: true });`);

    page.waitForSelector("#main", {timeout: 0}).then(async () => {
        // await page.setBypassCSP(true);
        await page.exposeFunction("sendMessage", async message => {
            return new Promise(async (resolve, reject) => {
                //send message to the currently open chat using power of puppeteer
                await page.type("#main p.selectable-text", message);
                await page.waitForTimeout(200);
                await page.click('span[data-testid="send"]');
            });
        });
    });
    spinner.succeed('Setting smart replay...   Done!');
}
