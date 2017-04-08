var fs = require('fs'),
    top = require('./top'),
    mapLimit = require('async/mapLimit');
fs.readFile('../realname.json', (e, data) => {
    if(e) {
        throw e;
        return false;
    }
    let dat = JSON.parse(data);
    var users = dat.map(function(data) { return data[1] });
    let top10 = users.slice(0, 10);
    //     let promiseArr = [];
    //     for(let user of top10) {
    //         promiseArr.push(top(user));
    //     }
    //     Promise.all(promiseArr).then(function(data) {
    //         for(var i = 0; i < data.length; i++) {
    //             let length = users[i].length
    //             users[i][length] = data[i];
    //         }
    //         console.log(users.slice(0, 10));
    //     })
    var reads = [],
        counter = 0;
    /** 
    mapLimit(users, 5, function(user, cb) {
            top(user).then(function(data) {

                console.log(data);
                reads.push(data);
                cb(null, data);
            }, function(data) {
                reads.push(data);
                cb(null, data);

            });
        },
        function(err, results) {
            console.log(results);
            fs.appendFile('./topview.json', JSON.stringify(results), function(err) {
                throw(err);
            })
        }
    )*/
    async function topUsers(users) {
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
            });
            reads.push(data);
        }
        fs.appendFile('./maxRead.json', JSON.stringify(reads), (err) => {
            if(err) {
                throw err;
            }
        })
    };

    topUsers(users);
})