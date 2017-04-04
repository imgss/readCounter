# readCounter
博客园 用户blog阅读量计数器


### 更新历史

* 3-31 对3000条数据的随笔数进行分析。
### 用法：

1. git clone demo 到本地
2. npm install
3. node index [你的url地址名]

    如：`node index imgss`,

    因为我的博客地址是`https://home.cnblogs.com/u/imgss/`

    控制台会输出你博客的总阅读量
### 博客园积分前3000名
```
node 3k
```
主要是涉及用`cheerio`处理数据，将数据写到`data.text`中

data.txt可以导入excel中进行分析。
