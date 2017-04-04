var cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs');
module.exports = function(user) {
    return new Promise(function(resolve, reject) {
        var total = 0,
            user = user.replace(/\b/g, '');
        url = `http://www.cnblogs.com/mvc/Blog/GetBlogSideBlocks.aspx?blogApp=${user}&showFlag=ShowTopViewPosts%2CShowTopDiggPosts`;
        http.get(url, (res) => {
            var status = res.statusCode;
            var html = '';
            if(status == "200") {
                res.on('data', (data) => {
                    html += data;
                });
                res.on('end', () => {
                    console.log(html);
                    fs.appendFile('./html.txt', html, (e) => { console.log('finish') })
                    console.log(/\"TopViewPostsBlock\"/.test(html))
                        //if(!/id=\"TopViewPostsBlock\"/.test(html)) {
                        //     console.log(`没有阅读排行榜`);
                        //     resolve(0);
                        //     return;
                        // }
                    var $ = cheerio.load(html);
                    maxRead = $('div#TopViewPostsBlock li a').html();
                    console.log(maxRead);
                    // console.log('-----------------------------------------------')
                    var re = /\((\d+)\)/g;
                    if(!maxRead) {
                        resolve(0);
                    }
                    console.log(`用户最大阅读量--`, maxRead);
                    resolve(maxRead);
                })
            }
        })
    })
}