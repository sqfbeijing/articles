### 安装

```bash
sudo npm i -g nrm
/usr/local/bin/nrm -> /usr/local/lib/node_modules/nrm/cli.js
+ nrm@1.0.2
added 322 packages in 29.822s
```



### 命令

* `nrm -h /--help `

* `nrm current `  显示当前使用的源  

* `nrm add name registryUrl `    增加一个源

* `nrm ls`  陈列所有可用源   (`*`代表当前使用的源)

  * ```
      npm ---- https://registry.npmjs.org/
      cnpm --- http://r.cnpmjs.org/
    * taobao - https://registry.npm.taobao.org/
      nj ----- https://registry.nodejitsu.com/
      rednpm - http://registry.mirror.cqupt.edu.cn/
      npmMirror  https://skimdb.npmjs.com/registry/
      edunpm - http://registry.enpmjs.org/
    ```

