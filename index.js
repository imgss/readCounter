var onepage = require('./onepage');
var promiseArr = [],
    host = 'http://www.cnblogs.com/';
host += process.argv[2] ? process.argv[2] : 'imgss' + '/';
for(let i = 1; i < 10; i++) {
    promiseArr.push(onepage(host, i))
}
Promise.all(promiseArr).then(function(data) {
    let sum = 0;
    for(d of data) {
        sum += d;
    }
    console.log(sum);
})