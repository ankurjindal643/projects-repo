const fs = require("fs");
const path = require("path");

// ALL EXTESNSIONS FOR WHICH FILES ARE IN THE MATERIAL FOLDER
let extensionObj = {
    "Images": ['.png', '.jpg', '.jpeg', '.gif'],
    "Audio": ['.mp3'],
    "Document": ['.pdf', '.txt', '.doc' ,'.docx'],
    "commpressed": ['.zip', '.rar'],
    "Videos": ['.mkv', '.mp4'],
    "PowerPoint" : ['.ppt', '.pptx'],
    "Excel" : ['.xls','.xlsx']
}

let input = process.argv.slice(2);
let folderPath = input[0];

let extensionFolderPath = folderPath;

let content = fs.readdirSync(folderPath);


// iterating on the content
for (let i = 0; i < content.length; i++) {

    let extensionName = path.extname(content[i]);


    let extensionFolderExist = checkFolder(extensionName, folderPath);

    if (extensionFolderExist == false) {
        createFolder();
        fs.renameSync(folderPath + '\\' + content[i], extensionFolderPath + '\\' + content[i], function (err) {
            if (err) {
                console.log(err);
            }
        })

    }
    else {

        fs.renameSync(folderPath + '\\' + content[i], extensionFolderPath + '\\' + content[i], function (err) {
            if (err) {
                console.log(err);
            }
        })
    }
}



// creating the folder which are not exists
function createFolder() {

    fs.mkdirSync(extensionFolderPath);
}

//CHECKING THE FOLDER EXIST OR NOT
function checkFolder(extensionName, folderPath) {

    for (let key in extensionObj) {
        let arr = extensionObj[key];

        let extensionExist = arr.includes(extensionName);
        if (extensionExist == true) {

            extensionFolderPath = path.join(folderPath, key);

            break;
        }
    }
    return fs.existsSync(extensionFolderPath);
}
