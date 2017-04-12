var cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs');
module.exports = function(user) {
    return new Promise(function(resolve, reject) {

        let url = `http://www.cnblogs.com/mvc/Blog/GetBlogSideBlocks.aspx?blogApp=${user}&showFlag=ShowTopViewPosts%2CShowTopDiggPosts`;
        http.get(url, (res) => {
            var status = res.statusCode;

            if(status == "200") {
                let html = '';
                res.on('data', (data) => {
                    html += data;
                });
                res.on('end', () => {
                    try {
                        html = JSON.parse(html);
                    } catch(err) {
                        throw(err);

                        return false;
                    }

                    let $ = cheerio.load(html['TopViewPosts']);
                    let maxRead = $('li a').first().text(),
                        maxReadUrl = $('li a').first().attr('href'),
                        maxReadNo = 0;
                    console.log(maxRead);

                    //var re = /\((\d+)\)/g;
                    try {
                        //maxReadNo = re.exec(maxRead)[1];
                        if(!maxRead) {
                            resolve({ user });
                        }
                        resolve({ user, article: maxRead, maxReadUrl });
                    } catch(err) {
                        resolve({ user, article: null });
                    }

                })
            } else {
                resolve({ user, article: null, maxReadNo });
            }

        })
    })
}