### 起步

选择 /bin/bash     {query}

script: 

```js
// 不能直接node index.js  因为不会有环境变量
/usr/local/bin/node index.js {query}
或者
./node_modules/.bin/run-node index.js {query} (使用了alfy库)
```



###  天坑

* 知乎api  请注意， 携带 cookie 还不够 ！！还要携带其他信息 才能请求到内网数据
* console.log(items)     写js 千万别console.log， 不然会导致数据不显示
* 起步 请按照alfy  的get start来严格执行