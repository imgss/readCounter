var cheerio = require('cheerio'),
    http = require('http');
var host = 'http://www.cnblogs.com/imgss/default.html';
http.get(host + `?page=1`, (res) => {
    var status = res.statusCode;
    var html = '';
    if(status == "200") {
        res.on('data', (data) => {
            html += data;
        });
        res.on('end', () => {
            // console.log(html);
            var $ = cheerio.load(html);
            countStr = $('.postDesc').text();
            //console.log(countArr);
            var re = /阅读\((\d+)\)/g;
            var arr = [];
            while(true) {
                if(!re.exec(countStr))
                    break;
                var match = re.exec(countStr)[1];
                arr.push(+match);
                console.log(arr);

            }
            //countArr.map((item) => { console.log(item); return item.match(/\([0-9]+\)/)[0] });


        })
    }

})