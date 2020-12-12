
const onepage = require('./onepage');
const fs = require('fs');
const serve = require('serve');
const host = 'https://www.cnblogs.com/';
host += process.argv[2] ? process.argv[2] : 'imgss' + '/';
//改为异步函数写法。

// for(let i = 1; i < 10; i++) {
//     promiseArr.push(onepage(host, i))
// }
// Promise.all(promiseArr).then(function(data) {
//     let sum = 0;
//     for(d of data) {
//         sum += d;
//     }
//     console.log(sum);
// })

let i=1,sum=0;

(async function getAll() {
    while(true){
        try{
            let num= await onepage(host , i++);
            if(num){
                sum += num;  
            }else{
                break;
            }
        } catch (err) {
            console.log(err);
        }
    }
    console.log('总阅读量:',sum);
    let data = fs.readFileSync('data/total.json', 'utf-8'),
        today = (new Date()).toLocaleString().split(' ')[0];

    data = JSON.parse(data);
    data[today] = {
        total: sum
    }
    fs.writeFileSync('data/total.json', JSON.stringify(data, null, 2), 'utf-8');
    serve('./data',{
        port: '8088'
    });
})();
