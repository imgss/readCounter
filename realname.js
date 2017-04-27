const fs = require('fs'),
      path = require('path');
fs.readFile(path.join(__dirname,'range/range.json'), 'utf-8', (err, data) => {
    if(err){
        throw err;
    }
    var arr = JSON.parse(data);
    var realnames = [];

    for(item of arr) {
        let realname = item[1].replace('http://www.cnblogs.com/', '').slice(0, -1);
        realnames.push([item[0], realname]);
    }
    fs.writeFile('./realname.json', JSON.stringify(realnames)), (err) => {
        if(err) {
            throw err;
        }
        console.log("done");
    }
})