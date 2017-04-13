let _ = require('lodash'),
    fs = require('fs');
fs.readFile('./maxRead2.json', 'utf-8', (err, data) => {
    if(err) {
        throw(err);
    }
    let articles = [];
    data = JSON.parse(data);

    for(let arr of data) {
        for(let page of arr) {
            articles.push(page);
        }
    }

    data = articles.map(function(item) {
        /\((\d+)\)$/.test(item.article);
        item.maxReadNo = Number(RegExp.$1);
        return item;
    })
    data = _.sortBy(data, ["maxReadNo"]);
    console.log(data);
    fs.writeFile('./maxread3.json', JSON.stringify(data), function(err) {
        throw err;
    })
    var md = json2md(data);
    fs.writeFile('maxRead.md', md, function(err) {
        throw err;
    })
})

function json2md(data) {
    mdList = data.map(function(item) {
        return `* [${item.article}](${item.maxReadUrl}) 阅读量:${item.maxReadNo}`;
    });
    mdStr = mdList.join('\r\n');
    return mdStr;

}