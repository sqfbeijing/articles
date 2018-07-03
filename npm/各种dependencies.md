### 区别 dependencies、devDependencies

**devDependencies也会被打包**

>  我 从网上 看到， 大多数人都说  dependencies与devDependencies的区别是： 前者是生产环境需要的，比如 react , lodash , 后者是 开发环境才需要的,比如 `babel, eslint,jest`等等。还有人说 如果安装到 devDependencies 则 `npm run build`打包的时候，不会打包到最终的文件中去，上到生产环境会报错(比如 lodash打包到devDependencies中).

然而,我亲自试了一下，将jquery包安装到 devDependencies, 然后 

```
console.log("上午11:06:36", $, $('body'))
```

无论是在开发环境, 还是打包完成之后到生产环境(用的http-server跑build文件夹)都是 ok 的， 结果:

都能正常显示: 

```
上午11:06:36 ƒ (e,t){return new Ee.fn.init(e,t)} Ee.fn.init [body, prevObject: Ee.fn.init(1)]
```

![](http://owbd0ue91.bkt.clouddn.com/WX20180703-112158@2x33.png)

并且 我在 打包之后的js文件中搜素 `jquery`也能搜索到. **这说明 即便是`devDependencies`的包也会被打包到生产环境, 并不会报错, 网上的说法是错误的,把npm包 装到devDependencies 能减小最终打包的体积也是错误的**

>  https://mp.weixin.qq.com/s/i_Zxaie1xMALymQ-1Jqz_Q 此文章说 把npm包 装到devDependencies 能减小最终打包的体积



### 项目使用

并且,我看我现在的项目 `babel eslint husky`是放在 `devDependencies`中的，然而在 create-react-app使用上,  npm run eject 之后, 能看到 ``babel eslint` 是放在 `dependencies`中的,  说明其实放到`dependencies` 和 `` `devDependencies` 区别只是 让开发者能够辨别  哪些是包主要是用于开发的时候，哪些是无论如何都需要的很重要的包。 二者最终都会打包的。