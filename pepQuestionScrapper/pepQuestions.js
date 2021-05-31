const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let data = {};

request("https://pepcoding.com/resources", function (err, res, html) {
    const mt = cheerio.load(html);
    // console.log(html);

    let levels = mt(".col.l8.s6.m6");
    let links = mt(".start-button.text-darken-1.bolder.view-more");

    for(let i = 0 ; i < levels.length ; i++){
        //main label ka name

        let header = mt(levels[i]).text().trim();
        let href = mt(links).attr("href");
        console.log(href[i]);
        // links of levels

        getQuestion(header,html);
    }
})

function getQuestion(level,html){
    if(!data[level]){
        data[level] = [];
    }

    fs.writeFileSync("questions.json" , JSON.stringify(data));
    
}