var fs = require('fs'),
    top = require('./top');
fs.readFile('../range.json', (e, data) => {
    if(e) {
        throw e;
        return false;
    }
    let users = JSON.parse(data);
    let top10 = users.slice(0, 1);
    let promiseArr = [];
    for(let user of top10) {
        promiseArr.push(top(user[0]));
    }
    Promise.all(promiseArr).then(function(data) {
        for(var i = 0; i < data.length; i++) {
            let length = users[i].length
            users[i][length] = data[i];
        }
        console.log(users.slice(0, 1));
    })
})