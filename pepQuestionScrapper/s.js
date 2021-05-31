const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let data = {};
request("https://www.pepcoding.com/resources/", function (err, res, html) {
    const mt = cheerio.load(html);
    let topicName = mt(".col.l9.s12.m12.right-section");

    for (let i = 0; i < 1; i++) {
        let names = mt(mt(topicName[i]).find("h2")).text().trim();
        let urls = mt(mt(topicName[i]).find("a")).attr("href");
        // console.log(names);
        // console.log(urls);
        // console.log("===================================");
        headingProcessor(names, "https://www.pepcoding.com" + urls);
    }
});



function headingProcessor(names, urls) {
    request(urls, function (err, res, html) {
        // if (!err)
        const mt = cheerio.load(html);
        let headingsHtml = mt(".col.l12.classResourceList.active.down");


        for (let i = 0; i < headingsHtml.length; i++) {
            let headingName = mt(mt(headingsHtml[i]).find("div")[0]).text().trim();
            let links = mt(headingsHtml[i]).find("a").attr("href");
            if (!data[names]) {
                data[names] = [];
                data[names].push({ topicName: headingName });
            }
            else {
                data[names].push({ topicName: headingName });
            }
            // console.log(headingName);
            // console.log(links);
            questionHeadingProcessor(names, headingName, links);
            // fs.writeFileSync("questionBank.json", JSON.stringify(data));
        }
    });
}

let j = 1;
function questionHeadingProcessor(names, headingName, links) {
    request("https://www.pepcoding.com" + links, function (err, res, html) {
        if (!err) {

            let mt = cheerio.load(html);
            let questionNames = mt(".col.l12.s12.l-desc-icon a");
            // console.log(questionNames.length);
            console.log(names);
            console.log(headingName);
            for (let i = 0; i < questionNames.length; i++) {
                let qName = mt(mt(questionNames[i]).find("span")[1]).text().trim();
                console.log(j + " : " + qName);
                j += 1
            }
            console.log("=======================================================================");
        }
    });
}