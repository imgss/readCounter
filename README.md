# readCounter
博客园 用户blog阅读量计数器

### 完成：
1. 输入用户名，统计一个用户的随笔阅读总量
2. 获取博客园积分前3000名用户的信息，包括:
    * 随笔总数
    * 最大阅读量
    * 园龄
3. 保存`json`数据到本地

### todo:
整个项目结构比较乱，梳理目录结构


### 更新历史

* 3-31 对3000条数据的随笔数进行分析。
* 4-8 爬取3000名用户的最大阅读量的文章,用`async函数`控制并发.

### 用法：

1. git clone demo 到本地
2. npm install
3. node index [你的url地址名]

    如：`node index imgss`,

    因为我的博客地址是`https://home.cnblogs.com/u/imgss/`

    控制台会输出你博客的总阅读量
4. 获取积分前3000名的用户数据，并将`json`保存到本地。
```
node 3k
```
主要是涉及用`cheerio`处理数据，将数据写到`data.text`中

data.txt可以导入excel中进行分析。
