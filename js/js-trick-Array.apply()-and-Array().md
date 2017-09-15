# Array.apply(null,Array(3))与Array(3)的区别是什么？

### 遇见问题
在看 vue.js官方文档的时候，发现了这么一段：
![](http://owbd0ue91.bkt.clouddn.com/js/js-trick/vue.pngQQ20170915-172114@2x.png)
我没明白其中的 `Array.apply(null, { length: 20 })` , 为何不直接使用new Array(20)呢?

### 尝试
我尝试了下面的代码,发现长度为20的数组并未赋值为777，why?

```
		let arr = new Array(20).map(function() {
			return 777;
		})
		console.log(arr); // (20) [undefined × 20]
```

我查阅了[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map), 发现：
![](http://owbd0ue91.bkt.clouddn.com/js/js-trick/mdn.pngQQ20170915-173014@2x.png)
意思就是说，new Array()出来的数组，从没赋值，所以map函数没办法得到一个我们所期望的值。
可是我在浏览器 打印数组, 发现，诶，明明就是有值(undefined)的啊!不解。
![](http://owbd0ue91.bkt.clouddn.com/js/js-trick/browser.pngQQ20170915-173540@2x.png)

### 解决
我查阅了stackoverflow,终于明白: 用 `new Array(3)`获取的数组，其实是一个只有length,没有元素和索引的空数组，我们一般不会这样创建数组。
下面可以证明这个数组没有索引:

```
		let a = new Array(10)
		console.log(2 in a); // false
```
Array原型上的map等方法，是期望一个可以迭代的、具有非空的值的数组作为调用者，所以直接new Array()出来的数组是无法正常运行map()来获得期望的结果的。
而`Array.apply(null,Array(3))` 实际上等同于`Array.apply(null,[undefined,undefined,undefined])`,也就等同于`Array(undefined,undefined,undefined)`,得到的数组的索引和值都是非空的，所以就可以大胆使用map()方法啦！

### 相关问题
* vue.js文档中` Array.apply(null, { length: 20 })`的`  { length: 20 }`其实就是个可迭代的对象，是个类数组对象，所以同样可以使用。
* 我在vue.js文档提过一个[issue](https://github.com/vuejs/vuejs.org/issues/963),说splice方法不能像文档中那样增加数组长度，有人给我解答，说最好不要直接赋值长度，因为看起来变长了，其实里面都是空索引，与这次这个问题很类似。所以，以后都用最好都用**`Array.apply(null,Array(3))`**啦！

### 相关链接

* [https://stackoverflow.com/questions/28416547/difference-between-array-applynull-arrayx-and-arrayx](https://stackoverflow.com/questions/28416547/difference-between-array-applynull-arrayx-and-arrayx)
* [https://cn.vuejs.org/v2/guide/render-function.html#约束](https://cn.vuejs.org/v2/guide/render-function.html#约束)

