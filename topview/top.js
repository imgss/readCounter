var cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs');
module.exports = function(user) {
    return new Promise(function(resolve, reject) {
        var total = 0;
        let a = user.replace(' ', '');
        url = `http://www.cnblogs.com/mvc/Blog/GetBlogSideBlocks.aspx?blogApp=${a}&showFlag=ShowTopViewPosts%2CShowTopDiggPosts`;
        http.get(url, (res) => {
            var status = res.statusCode;
            var html = '';
            if(status == "200") {
                res.on('data', (data) => {
                    html += data;
                });
                res.on('end', () => {
                    try {
                        html = JSON.parse(html);
                    } catch(err) {
                        return false;
                    }
                    //fs.appendFile('./html.txt', html, (e) => { console.log('finish') })
                    //if(!/id=\"TopViewPostsBlock\"/.test(html)) {
                    //     console.log(`没有阅读排行榜`);
                    //     resolve(0);
                    //     return;
                    // }
                    var $ = cheerio.load(html['TopViewPosts']);
                    maxRead = $('li a').first().text();
                    // console.log('-----------------------------------------------')
                    var re = /\((\d+)\)/g;
                    try {
                        maxRead = re.exec(maxRead)[1];
                        if(!maxRead) {
                            resolve({ user: user, read: 0 });
                        }
                        //console.log(`用户最大阅读量--`, maxRead);
                        resolve({ user: user, read: maxRead });
                    } catch(err) {
                        reject({ user: user, read: null });
                    }

                })
            }
        })
    })
}