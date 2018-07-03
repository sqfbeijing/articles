链接： [阮一峰](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)   http://javascript.ruanyifeng.com/nodejs/npm.html#toc21

##  version			

官方: `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]`

* npm version 0.0.1-beta17   任意版本=>v0.0.1-beta17   

* npm version prerelease ` "version": "1.0.5"  =>  "version": "1.0.5-2"  `

  > 开发阶段,可以用 "version": "0.0.5-beta15" => "version": "0.0.5-beta16" 这样

* npm version patch   ` "version": "1.0.5"  =>  "version": "1.0.6"  `

  > Fix bug, 小改动

* npm version minor   ` "version": "1.0.5"  =>  "version": "1.1.0"  `

  > 增加新特性，仍向后兼容

* npm version major   ` "version": "1.0.5"  =>  "version": "2.0.0" `

  > 大改动，大版本，无法向后兼容

* prepublish，postpublish

* preinstall，postinstall

* preuninstall，postuninstall

* ~~preversion，postversion~~

* pretest，posttest

* prestop，poststop

* prestart，poststart

* prerestart，postrestart



## update

>一般我们用npm 的话, 直接npm i packageName  这样就可以直接安装最新的包了, npm update用的比较少，不如直接npm install 来的方便。 yarn 除外, yarn 貌似要自己 yarn upgrade packageName@2.3.2 这样。

* package.json中 ` "commander": "^2.15.1"`   npm update  变为  =>  `"commander": "^2.89.1"` '^'代表当前大版本之内，会更新到 : 比如当前大版本是2， 则更新到第2 版最新的包， 2.89.1下一版本就是3.x.x了。




## adduser

npm adduser --registry http://npm.in.zhihu.com

## registry

* 全局： npm set registry https://registry.npm.taobao.org (或者 npm config set registry urlPath 具体config使用请看`npm config -h`) http://registry.npmjs.org    (官方的) ; 详细请看 `nrm.md`,此文档包含了常见的源
* 项目中:  .yarnrc或者.npmrc
* npm config get registry   (或者npm get registry) 获取当前使用的源 



##  npm info

npm info zhihu-advert-preview  查看指定包的发版信息

## npm publish

* npm publish用于将当前模块发布到npmjs.com。执行之前，需要向npmjs.com申请用户名。（adduser）
* npm publish --tag beta  (如果当前模块是一个beta版)

## npm unpublish

* npm unpublish zhihu-advert-preview --force 
* 根据规范，只有在发包的**24小时内才允许**撤销发布的包（ unpublish is only allowed with versions published in the last 24 hours）
* **即使**你撤销了发布的包，**发包的时候也不能再和被撤销的包的名称和版本重复了**（即不能名称相同，版本相同，因为这两者构成的唯一标识已经被“占用”了）

### npm link  本地关联包

<https://docs.npmjs.com/cli/link>

http://javascript.ruanyifeng.com/nodejs/npm.html

**使用步骤:**

* 在需要关联的包(比如myModule)文件夹内执行 sudo npm link    然后显示:

  `/usr/local/lib/node_modules/zhihu-advert-preview -> /Users/shaoqianfei/Desktop/work-zhihu/zhihu-advert/packages/zhihu-advert-preview`

* 然后在需要用到此包的项目中执行 npm link myModule   然后显示

```
added 1 package in 0.756s
/Users/shaoqianfei/Desktop/test-sth/node_modules/zhihu-advert-preview -> /usr/local/lib/node_modules/zhihu-advert-preview
```

**删除**

如果需要删除关联 可以在项目目录内使用`npm unlink`命令

**有坑：**

如果在`ezreal ` 包目录(此包有package.json, 有name)下面有个`zhihu-advert-preview` ，在`zhihu-advert-preview` 目录下执行 `npm link`命令，则会link ezreal ， 而不是`zhihu-advert-preview`。(它会link最外层包)

> 解决办法,先把最外层的package.json改为 package.json1121,  然后在内层包进行npm link, 然后再改回原来名字。
>
> 如果link有改动,需要重新npm start.否则缓存的是原来的文件 （或者尝试先将 import 语句注释掉,然后再import来解决）