//https://home.cnblogs.com/u/imgss/
const cheerio = require('cheerio'),
        https = require('https');
module.exports = function(user='imgss') {
    return new Promise(function(resolve, reject) {
        https.get(`https://home.cnblogs.com/u/${user}/`, (res) => {
            var status = res.statusCode;
            var html = '';
            if(status == "200") {
                res.on('data', (data) => {
                    html += data;
                });
                res.on('end', () => {
                    if(!/class=\"text_gray\"/.test(html)) {
                        console.log(`页面${page}没有内容`);
                        resolve(null);
                        return;
                    }
                    var $ = cheerio.load(html);
                    var age = $('#user_profile>li:nth-child(2)>span:nth-child(2)').text();
                    console.log(age);
                    resolve({user,age});
                })
            }
        })
    })
}