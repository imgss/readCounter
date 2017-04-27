# readCounter
博客园 用户blog阅读量计数器


### 更新历史

* 3-31 对3000条数据的随笔数进行分析。
* 4-8 爬取用户的最大阅读量的文章,用`async函数`控制并发.
* 4-12 获取前3000名用户的最大阅读量的文章名,耗时:`50709.082ms`
* 4-25 获取园龄
* 4-27 整理目录

### 用法：

1. git clone demo 到本地
2. npm install
3. node index [你的url地址名]

    如：`node index imgss`,
    因为我的博客地址是`https://home.cnblogs.com/u/imgss/`
    控制台会输出你博客的总阅读量
    
![效果](http://images2015.cnblogs.com/blog/1016471/201704/1016471-20170419211236556-1067662246.gif)

### 博客园积分前3000名
```
node 3k
```
主要是涉及用`cheerio`处理数据，将数据写到`data.text`中

data.txt可以导入excel中进行分析。

### 最大阅读量

```(bash)
node topview
```
抓取前3000名用户的最大阅读量的文章.

### 抓取园龄
```
node yuanAge
```
获取用户的园龄
....
抓取结果:[这里](https://imgss.github.io/demo/maxRead/index.html)
