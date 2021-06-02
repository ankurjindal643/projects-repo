const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let data = {};

request("https://pepcoding.com/resources", function (err, res, html) {
    const mt = cheerio.load(html);

    let levels = mt(".col.l8.s6.m6");
    let links = mt(".start-button.text-darken-1.bolder.view-more");

    for (let i = 0; i < levels.length; i++) {
        //main label ka name

        let header = mt(levels[i]).text().trim();

        // links of levels
        let href = "https://pepcoding.com" + mt(links[i]).attr("href");

        if(!data[level]){
            data[level] = [];
        }

        getHeading(header, href);
    }
})

function getHeading(level, link) {

    request(link, function (err, res, html) {


        let mt = cheerio.load(html);
        let topicName = mt(".no-padding.col.l10.s9.m10.push-s1.no-margin");
        let links = mt(".collection-item.row.list-item");
        for (let i = 0; i < topicName.length; i++) {

            let name = mt(topicName[i]).text().trim();
            let href = 'https://www.pepcoding.com' + mt(links[i]).find("a").attr("href");

            getQuestions(level, name, href);
        }

        if(!data[level].name){
            data[level].name = [];
        }

    });
}



function getQuestions(level, name, href) {

    request(href, function (err, res, body) {
        let mt = cheerio.load(body + "");

        let allQuestionLinks = mt(".col.l12.s12.l-desc-icon");
        let questionNames = mt(".col.l12.s12.l-desc-icon .name");

        console.log(name);
        for (let i = 0; i < allQuestionLinks.length; i++) {
            let QuesLink = "https://www.pepcoding.com" + mt(allQuestionLinks[i]).find("a").attr("href");
            let ques = mt(questionNames[i]).text().trim();

            console.log(Qu);
            //===========================================================================
            // data[name].push({ "Question Name": ques, "Question Link": QuesLink });
            // fs.writeFileSync("question.json", JSON.stringify(data));
            //===========================================================================
        }
    })

}
