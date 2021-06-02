let pup = require("puppeteer");

let email = "nifedan212@relumyx.com";
let pass = "abcde12345";
let codeObj;
async function questionSolver() {
    try {
        let browser = await pup.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
            slowMo: 50,
        });

        let pageArr = await browser.pages();
        let page = pageArr[0];
        await page.goto("https://www.hackerrank.com/auth/login");
        await page.type("#input-1", email);
        await page.type("#input-2", pass);
        await Promise.all([
            page.waitForNavigation(),
            page.click("[data-analytics='LoginPassword']"),
        ]);
        await Promise.all([
            page.waitForNavigation(),
            page.click("[data-attr1='interview-preparation-kit']"),
        ])

        await page.waitForSelector("[data-attr1='warmup']");
        await Promise.all([
            page.waitForNavigation(),
            page.click("[data-attr1='warmup']"),
        ])
        await page.waitForSelector(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
        await Promise.all([
            page.waitForNavigation(),
            page.click(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled"),
        ])

        await page.waitForSelector("#tab-1-item-4");
        await Promise.all([
            page.waitForNavigation(),
            page.click("#tab-1-item-4"),
        ])

        // handling the agree button in the editorial
        await executor();
        async function executor(resolve, reject) {
            try {
                await page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
                await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
                await resolve;

            }
            catch {

                resolve;

            }
        }

        codeObj = await dataSelctor();

        async function dataSelctor() {
            let a = await page.evaluate(() => {
                let language = document.querySelectorAll(".challenge-editorial-block.editorial-setter-code h3");
                let codes = document.querySelectorAll(".challenge-editorial-block.editorial-setter-code .highlight");
                let obj = {};
                obj.lang = language[0].innerText;
                obj.code = codes[0].innerText;
                return obj;
            })
            return a;
        }

        await Promise.all([
            page.waitForNavigation(),
            page.click("[data-attr2='Problem']"),
        ])

        await page.waitForSelector(".css-1hwfws3");
        await page.click(".css-1hwfws3");
        await page.type(".css-1hwfws3", codeObj.lang);
        await page.keyboard.press("Enter");

        await page.click("[type='checkbox']");
        await page.waitForSelector("#input-1");
        await page.type("#input-1", codeObj.code);

        await page.keyboard.down("Control");
        await page.keyboard.press("KeyA");
        await page.keyboard.press("KeyX");
        await page.keyboard.up("Control");

        await page.click(".hr-monaco-editor-parent");

        await page.keyboard.down("Control");
        await page.keyboard.press("KeyA");
        await page.keyboard.press("KeyV");
        await page.keyboard.up("Control");

        await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
    } catch (err) {
        console.log(err);
    }
}


questionSolver();