const fs = require('fs');
const result = {};
fs.readFile('3k/data.json','utf-8',(err,data) => {
    let from = JSON.parse(data);
    let format = from.forEach(item => {
        let user = item[1].replace('http://www.cnblogs.com/', '').slice(0, -1);
        result[user] = item;
    });
    fs.writeFile('3k/3k.json',JSON.stringify(result),err => {if(err) throw err;})
    
})