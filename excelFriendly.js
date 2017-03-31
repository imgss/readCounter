var fs = require('fs');
fs.readFile('./data.txt', "utf8", (e, data) => {
    console.log(/\s{4,10}/.test(data));
    data = data.replace(/\s{4,10}/g, ',');
    fs.writeFile('./excelfriendly.txt', data, (e) => {
        console.log('done!');
    })
})