var fs = require('fs'),
    top = require('./top');
fs.readFile('../realname.json', (err, data) => {
    if(err) {
        throw(err);
        return false;
    }
    let dat = JSON.parse(data),
        users = dat.map(function(data) { return data[1] }),
        top10 = users.slice(0, 10);

    let reads = [],
        counter = 0;

    async function topUsers(users) {
        console.time('start');
        while(users.length > 0) {
            console.log(users.length);
            var user5 = [];
            for(let i = 0; i < 5; i++) {
                user5.push(users.shift());
            }
            var promiseArr = user5.map(function(user) {
                return top(user);
            });
            let data = await Promise.all(promiseArr, function(data) {
                console.log(data);
                Promise.resolve(data);
            }, function(err) {
                console.log('err');
            });
            reads.push(data);
        }
        fs.appendFile('./maxRead2.json', JSON.stringify(reads), (err) => {
            if(err) {
                throw err;
            }
        })
        console.timeEnd('start');
    };

    topUsers(users);
})