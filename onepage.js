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
                    //console.log(countStr);
                    //console.log('-----------------------------------------------')
                    var re = /阅读\((\d+)\)/g;
                    if(!countStr) {
                        resolve(0);
                    }
                    while(true) {
                        // if(!re.exec(html))
                        //     break; //此处会浪费一次re匹配，导致第一个匹配到的从第二个开始。
                        var match = re.exec(html); //匹配阅读量数据
                        //console.log(match);
                        if(match)
                            total += +match[1];
                        else
                            break;
                    }
                    console.log(`page${page}的阅读量是`, total);
                    resolve(total);
                })
            }
        })
    })
}