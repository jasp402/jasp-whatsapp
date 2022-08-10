const intl            = require('./locale/en-US').default;
const constants       = require('./utils/constants');
const chromeLauncher  = require('chrome-launcher');
const qrcode          = require('qrcode-terminal');
const puppeteer       = require('puppeteer-core');
const settings        = require('./config/index');
const helpers         = require('./utils/utils');
const jsPackTools     = require('js-packtools');
const spintax         = require('mel-spintax');
const request         = require('request');
const util            = require('util');
const fs              = require('fs');
const {createFolders} = jsPackTools();
const {smartReplyV2}  = settings;
const spinner         = helpers.spinner();
let isLogin           = undefined;
let page              = undefined;

(async () => {
    const initWithChrome = async () => {
        try {
            spinner.start(intl['init.ready.chrome']);
            createFolders(constants.PATH_BIN('chrome-data'));

            spinner.start(intl['init.launch.chrome']);
            const {port} = await chromeLauncher.launch(constants.CHROME_OPTION);
            spinner.succeed(`chrome-launcher PORT: ${port}`);


            spinner.start(intl['init.promisify.chrome']);
            const chromeResponse         = await util.promisify(request)(constants.GET_CHROME_PORT(port));
            const {webSocketDebuggerUrl} = JSON.parse(chromeResponse.body);

            spinner.start(intl['init.connect.puppeteer']);
            const browser = await puppeteer.connect({
                browserWSEndpoint: webSocketDebuggerUrl,
                defaultViewport  : null
            });

            spinner.start(intl['init.set.page']);
            page = await browser.pages();

            spinner.succeed(intl['init.success.done']);
        } catch (e) {
            spinner.fail(intl['init.error.message']);
            throw new Error(e);
        }
    }
    const gettingStarted = async () => {
        if (page.length > 0) {
            page = page[0];
            await page.setBypassCSP(true);
            // await page.goto(constants.WHATSAPP_URL, constants.GOTO_OPTION);
            await page.waitForTimeout(1000);
        }
    }
    const confirmLogin   = async () => {
        try {
            spinner.start("Confirm Login...");
            await page.waitForTimeout(5000);
            isLogin = await page.evaluate("localStorage['last-wid-md']");
            spinner.succeed(`logged in Success! ${isLogin}`);
        } catch (e) {
            await page
                .waitForSelector('canvas[aria-label="Scan me!"]')
                .then(() => {
                    spinner.start('Wait scan code QR...');
                    isLogin = false;
                });

        }
    }
    const getAndShowQR   = async () => {
        let saveImageQR = undefined;
        let scanMe      = "img[alt='Scan me!'], canvas";
        try {
            while (!isLogin) {
                await page.waitForTimeout(5000);
                let getImageQR    = await page.evaluate(`document.querySelector("${scanMe}").parentElement.getAttribute("data-ref")`);
                let buttonRefresh = await page.$$(`[data-testid='refresh-large']`) || [];

                if (saveImageQR !== getImageQR) {
                    qrcode.generate(getImageQR, {small: true});
                    spinner.info('Update QR code');
                }
                if (buttonRefresh.length) {
                    await buttonRefresh[0].click();
                    spinner.info('Refresh QR code');
                    buttonRefresh = [];
                }

                await page.waitForTimeout(30000);
                await confirmLogin();
            }
        } catch (e) {
            console.log(e)
        }
    }
    const injectScripts  = async () => {
        spinner.start('Inject scripts...');
        // Expose Function

        await page.exposeFunction("log", (message) => console.log(message));
        await page.exposeFunction("resolveSpintax", spintax.unspin);
        await page.exposeFunction("getBiblicalPicture", helpers.biblicalPicture);
        await page.exposeFunction("getFile", helpers.getFileInBase64);
        await page.exposeFunction("saveFile", helpers.saveFileFromBase64);

        let modal = fs.readFileSync(`${process.cwd()}\\src\\helper\\modal.html`, 'utf8')
        await page.evaluate(content => {
            const pageEl   = document.querySelector('#app');
            let node       = document.createElement('div');
            node.innerHTML = content;
            pageEl.appendChild(node);
        }, modal);
        await page.evaluate(`let intents =${JSON.stringify(settings)}`);

        // Expose CSS
        await page.addStyleTag({path: constants.PATH_CONFIG('styles.css')});
        // await page.addStyleTag({path: constants.PATH_CONFIG('styles-dark.css')});

        await page.waitForSelector('[data-icon=laptop]', {timeout: 30000})
            .then(async () => {
                await page.addScriptTag({path: require.resolve(constants.PATH_LIB('WAPI.js'))});
                await page.addScriptTag({path: require.resolve(constants.PATH_LIB('INJECT.js'))});
                spinner.succeed('Inject scripts...   Done!');
            })
            .catch(() => {
                spinner.fail('Not Inject scripts!');
            });
    }
    const setSmartReplay = async () => {
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
            observer.observe(document.querySelector('#app'), { attributes: false, childList: true, subtree: true });
		`);
        spinner.succeed('Setting smart replay...   Done!');
        page.waitForSelector("#main", {timeout: 0}).then(async () => {
            await page.exposeFunction("sendMessage", async message => {
                return new Promise(async (resolve, reject) => {
                    //send message to the currently open chat using power of puppeteer
                    await page.type("#main p.selectable-text", message);
                    await page.waitForTimeout(100);
                    await page.click('span[data-testid="send"]');
                });
            });
        });
    }
    try {
        await initWithChrome();
        await gettingStarted();
        await confirmLogin();
        !isLogin
        && await getAndShowQR();
        await injectScripts();
        Object.keys(smartReplyV2).length
        && await setSmartReplay();
    } catch (e) {
        throw new Error(e);
    }
})();