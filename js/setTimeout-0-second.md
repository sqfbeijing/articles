# setTimeout延时0毫秒的作用

### 遇到问题
我们在面试中经常遇到面试官会考这样一段代码：

```
console.log(1);
setTimeout(function() {
	console.log(2);
}, 0);
console.log(3);
```
打印出的结果应该依次是： 1 3 2. why?   
简单点可以这么说： js是单线程的，是基于事件循环的。setTimeout函数是异步的，异步的事件会加入一个队列，当同步的任务执行完之后，才会执行。

### 解释
* 在 [Why is setTimeout(fn, 0) sometimes useful?](https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful) 这个问题中有更详细的解读，赞数最高的回答指出：js运行的时候，可能浏览器会渲染界面，构建元素，代码看起来也许像是同步执行，然而有可能渲染的速度更不上，这时候我们需要将它放入异步队列当中，这就是 `setTimeout() `的作用。  
  
* 在 [http://www.cnblogs.com/silin6/p/4333999.html](http://www.cnblogs.com/silin6/p/4333999.html) 有比较详细的说明，浏览器中有三个引擎，js引擎和GUI引擎和js的事件引擎. 而重要的一点是：js引擎和GUI引擎互斥，有时候要想在操作DOM的情况下正确运行js,需要等待渲染完毕，所以`setTimeout(()=>{},0);` 还是很有用的。

### 类似问题
[Process.nextTick 和 setImmediate 的区别？](https://www.zhihu.com/question/23028843) 这个问题中的这张图很形象的说明了问题。 `setTimeout(()=>{},0);` 也会和第二张图类似。

![](http://owbd0ue91.bkt.clouddn.com/QQ20170919-104820@2x.png)