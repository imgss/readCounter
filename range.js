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
            var usersArr = [];
            users.each(function(i, ele) {
                var infoArr = [
                    $(ele).find('a').first().text(),
                    $(ele).find('a').first().attr('href'),
                    ...$(ele).find('small').last().text().replace(/\(|\)/g, '').split(',')

                ];
                usersArr.push(infoArr);

            })
            usersArr.shift(); //去掉非数据项
            fs.writeFile(__dirname + '\\range.json', JSON.stringify(usersArr), (e) => { if(e) throw(e) });
            //console.log(usersArr.map((item, index) => { return Number(item[4]) / Number(item[2]) }));
            //fs.writeFile(__dirname + '\\range.txt', usersInfo + usersArr.join('\n').replace(/,/g, '    '), (e) => { if(e) throw(e) });

        })


    }
})