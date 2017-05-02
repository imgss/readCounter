const fs = require('fs');

fs.readFile('merge/merge.json','utf-8',(err,data) => {
        data = JSON.parse(data);
    fs.readFile('3k/3k.json','utf-8',(err,info) => {
        info = JSON.parse(info);
        console.log(info,data.length);
        data = data.map(item => {
            if(info[item.user]){
                item.articleNo = info[item.user][2];
                item.points = info[item.user][4];
            }
            return item;
        })
        fs.writeFile('merge/mergeAll.json',JSON.stringify(data), err => {if (err) throw err;})
    })

})