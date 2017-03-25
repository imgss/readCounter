var cheerio = require('cheerio'),
    http = require('http');
module.exports = function(root, page) {
    return new Promise(function(resolve, reject) {
        var total = 0;
        http.get(root + `?page=${page}`, (res) => {
            var status = res.statusCode;
            var html = '';
            if(status == "200") {
                res.on('data', (data) => {
                    html += data;
                });
                res.on('end', () => {
                    var $ = cheerio.load(html);
                    countStr = $('.postDesc').text();
                    console.log(countStr);
                    console.log('-----------------------------------------------')
                    var re = /阅读\((\d+)\)/g;
                    if(!countStr) {
                        resolve(0);
                    }
                    while(true) {
                        if(!re.exec(html))
                            break;
                        var match = re.exec(html)[1]; //匹配阅读量数据
                        console.log(match);
                        total += +match;
                    }
                    console.log('----------------------------------------------------');
                    console.log(total);
                    resolve(total);
                })
            }
        })
    })
}