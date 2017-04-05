var fs = require('fs'),
    top = require('./top'),
    mapLimit = require('async/mapLimit');
fs.readFile('../range.json', (e, data) => {
    if(e) {
        throw e;
        return false;
    }
    let data = JSON.parse(data);
    let users = data.map(function(data) { return data[0] });
    let top10 = users.slice(0, 10);
    let promiseArr = [];
    for(let user of top10) {
        promiseArr.push(top(user));
    }
    Promise.all(promiseArr).then(function(data) {
        for(var i = 0; i < data.length; i++) {
            let length = users[i].length
            users[i][length] = data[i];
        }
        console.log(users.slice(0, 10));
    })
})