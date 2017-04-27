var
    cheerio = require('cheerio'),
    http = require('http'),
    fs = require("fs");
var url = "http://www.cnblogs.com/AllBloggers.aspx";

http.get(url, (res) => {
    if(res.statusCode === 200) {
        var html = '';
        res.on('data', (data) => {
            html += data;
        });
        res.on('end', () => {
            var $ = cheerio.load(html);
            var users = $('td');
            console.log(users.length);
            var usersInfo = `账号            地址              随笔数              最近更新              积分\n`;
            var usersArr = [];
            users.each(function(i, ele) {
                if(i > 2990) {
                    console.log($(ele).find('a').first().text());
                }
                var infoArr = [
                    $(ele).find('a').first().text(),
                    $(ele).find('a').first().attr('href'),
                    ...$(ele).find('small').last().text().replace(/\(|\)/g, '').split(',')

                ];
                usersArr.push(infoArr);

            })
            fs.writeFile(__dirname + '\\data.txt', usersInfo + usersArr.join('\r\n').replace(/,/g, '    '), (e) => { if(e) throw(e) });

        })


    }
})