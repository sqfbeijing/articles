

### 简述

npm 全称为 *node package manager*, 即 node的包管理器。 我觉得正是因为有npm 这一大生态，才有了现在node 社区的繁荣。我这篇文章会归纳总结一些我们常用的
npm 知识，包括npm 命令、版本管理、依赖、以及如何发布一个包。

### package.json

package.json 是npm包的入口, 涵盖了这个包的基本信息,  如图我在文件夹中进行 `npm init`, 会让我填写以下信息:
![](https://user-gold-cdn.xitu.io/2018/7/15/1649d4e0663a21fe?w=1140&h=904&f=png&s=326099)

一个 常见的package.json 文件如下:

```
{
  "name": "foo",
  "version": "1.0.0",
  "description": "test ",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "ramda": "^0.25.0",
    "react": "^16.0.0"
  },
  "repository": {
    "type": "git",
    "url": "test.git"
  },
  "keywords": [
    "some",
    "keywords"
  ],
  "author": "Bob",
  "license": "MIT"
}

```

* 其中 `main` 代表此包的入口文件, 当别的包进行 `var foo = require ('foo')`的时候, 引用的其实就是这个`main`字段代表的`index.js`文件
* `scripts` 代表 在这个npm包中运行的命令
* `dependencies` 代表这个npm 包依赖的包, 当 `npm install foo`的时候，会将这个包的依赖包也一起安装

### version

一个npm包从诞生开始,代码库会不断地迭代，developer可能会不断地添加新功能、增加新特性、修改bug等,那么这个包的版本也会不断变化, 如何比较好的管理(迭代)一个包的版本呢? 我们可以参考[react的CHANGELOG](https://github.com/facebook/react/blob/master/CHANGELOG.md) 我们可以用 `npm version`命令, 而不是手动地去更改 `package.json`文件。常用的命令如下:

官方: `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]`

**假如当前包的版本号是`1.0.5`**

* npm version 1.0.5-beta17   ` "version": "1.0.5" => "version": "1.0.5-beta17" `

  > 明确指定需要更新到的版本号, 开发阶段,一般用alpha, beta, rc

* npm version prerelease ` "version": "1.0.5"  =>  "version": "1.0.5-2"  `

  > 基于现在版本的先行版本

* npm version patch   ` "version": "1.0.5"  =>  "version": "1.0.6"  `

  > Fix bug, 小改动 ，仍向后兼容

* npm version minor   ` "version": "1.0.5"  =>  "version": "1.1.0"  `

  > 增加新特性，仍向后兼容

* npm version major   ` "version": "1.0.5"  =>  "version": "2.0.0" `

  > 大改动，大版本，无法向后兼容

* npm version premajor      ` "version": "1.0.5"  =>  "version": "v2.0.0-0" `

  > 大改动，大版本的先行版本，无法向后兼容

  所有的 `npm version pre(xxx)`命令都会是一个先行版本, 会在版本号后面 多出 `-n`,代表这不是一个正式版本.

**`~`与`^` 代表什么?**

我们 常会在代码中看到这样一段：

```
    "ramda": "^0.25.0",
    "react": "~16.0.0" 
```

`~`代表 你在项目中更新包(npm update)的时候, 可以更新到最新的一个 patch版本 即 从 `0.25.0 => 0.25.x`,但不包括 `0.26.x`

`^`代表 你在项目中更新包(npm update)的时候, 可以更新到最新的一个 minor版本 即 从 `16.0.0 => 16.x.x`,但不包括 `17.x.x`

### update

一般我们用npm 的话, 直接npm i packageName  这样就可以直接安装最新的包了, npm update用的比较少，不如直接npm install 来的方便。 yarn 除外, yarn 需要自己 yarn upgrade packageName@x.x.x 这样。

### registry

> 由于国外的服务器访问速度可能比较慢，有时候我们需要访问镜像源，这时候我们可以使用 [cnpm](https://github.com/cnpm/cnpm) 或者设置国内的镜像源

* 全局使用：
  *  npm set registry https://registry.npm.taobao.org (或者 npm config set registry otherUrlPath , 具体config使用请看`npm config -h`)
  *  官方registry地址:  http://registry.npmjs.org 
* 项目中使用:  .yarnrc或者.npmrc中设置   `registry "http://npm.xxx.com/"`
* npm config get registry  (或者npm get registry)  可以获取当前使用的源 地址信息

### npm info

npm info packageName  查看指定包的发版信息, 一般我用它来查看此包的最新发版记录

### npm publish

激动人心的时刻！如果想发布一个包到 npm 上,那么按照如下步骤进行操作

* npm adduser --registry https://registry.npmjs.org
* npm publish用于将当前模块发布到npmjs.com。执行之前，需要向npmjs.com申请用户名。（adduser）

> npm publish --tag beta  (如果当前包是一个beta版)

注意::anguished:  不能发布npm中已经存在的包

### npm unpublish

* npm unpublish packageName  --force 
* 根据规范，只有在发包的**24小时内才允许**撤销发布的包（ unpublish is only allowed with versions published in the last 24 hours）
* **即使**你撤销了发布的包，**发包的时候也不能再和被撤销的包的名称和版本重复了**（即不能名称相同，版本相同，因为这两者构成的唯一标识已经被“占用”了）

### npm link  本地关联包

当我们在发包前需要进行本地测试的时候，往往需要 npm link 进行管理包测试

**相关链接:** 

<https://docs.npmjs.com/cli/link>

http://javascript.ruanyifeng.com/nodejs/npm.html

**使用步骤:**

* 在需要关联的包(比如packageName)文件夹内执行 sudo npm link    然后会显示:

  `/usr/local/lib/node_modules/packageName -> /Users/shaoqianfei/Desktop/work/packageName`

* 然后在需要用到此包的项目中执行 npm link packageName   然后显示

```
added 1 package in 0.756s
/Users/shaoqianfei/Desktop/test-sth/node_modules/packageName -> /usr/local/lib/node_modules/packageName
```

**删除**

如果需要删除关联 可以在项目目录内使用`npm unlink`命令

**有一些坑：**

如果在`outer ` 包目录(此包有package.json)下面有两个包package1 和package2，在package2 目录下执行 `npm link`命令，则会link outer 这个包 ， 而不是package2:heavy_exclamation_mark: (它会link最外层包)

> 解决办法,先把最外层的package.json改为 package.json-xxx,  然后在内层包进行npm link, 然后再改回原来名字。如果link有改动,需要重新npm start.否则缓存的是原来的文件 （或者尝试先将 import 语句注释掉,然后再import来解决）

### npm 包依赖

**devDependencies也会被打包**

我 从网上 看到， 大多数人都说  dependencies与devDependencies的区别是： 前者是生产环境需要的，比如 react , lodash , 后者是 开发环境才需要的,比如 `babel, eslint,jest`等等。还有人说 如果安装到 devDependencies 则 `npm run build`打包的时候，不会打包到最终的文件中去，上到生产环境会报错(比如 lodash打包到devDependencies中).

然而,我亲自试了一下，将jquery包安装到 devDependencies, 然后 

```
console.log("上午11:06:36", $, $('body'))
```

无论是在开发环境, 还是打包完成之后到生产环境(用的http-server跑build文件夹)都是 ok 的， 结果:

都能正常显示如下: 

```
上午11:06:36 ƒ (e,t){return new Ee.fn.init(e,t)} Ee.fn.init [body, prevObject: Ee.fn.init(1)]
```

![](https://user-gold-cdn.xitu.io/2018/7/15/1649d4c715f7de4d?w=1922&h=1446&f=png&s=1074581)

并且 我在 打包之后的js文件中搜素 `jquery`也能搜索到. **这说明 即便是`devDependencies`的包也会被打包到生产环境, 并不会报错, 网上的说法是错误的,把npm包 装到devDependencies 能减小最终打包的体积也是错误的**

> https://mp.weixin.qq.com/s/i_Zxaie1xMALymQ-1Jqz_Q 此文章说 把npm包 装到devDependencies 能减小最终打包的体积

**项目使用**

并且,我看我现在的项目 `babel eslint husky`是放在 `devDependencies`中的，然而在 create-react-app使用上,  npm run eject 之后, 能看到 babel eslint 是放在 dependencies中的,  说明其实放到dependencies 和 devDependencies 区别只是 让开发者能够辨别  哪些是包主要是用于开发的时候，哪些是无论如何都需要的很重要的包。 二者最终都会打包的。

### 总结

npm 生态很大, 本文只是介绍了一些 基本使用, 还有很多东西需要去探索。比如为了更好的开发体验，可以使用 [nrm](https://github.com/Pana/nrm) 进行 registry 的管理, [nodemon](https://github.com/remy/nodemon)进行应用开发, 使用[pm2](https://github.com/Unitech/pm2)进行nodejs进程管理等等。

### 参考链接

 [http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html) 

[http://javascript.ruanyifeng.com/nodejs/npm.html#toc21](http://javascript.ruanyifeng.com/nodejs/npm.html#toc21)

[https://blog.xcatliu.com/2015/04/14/semantic_versioning_and_npm/](https://blog.xcatliu.com/2015/04/14/semantic_versioning_and_npm/)