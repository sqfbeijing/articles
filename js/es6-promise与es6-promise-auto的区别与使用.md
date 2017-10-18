#es6-promise与es6-promise.auto的区别与使用

### es6-promise

**demo:**

```
	<script>
		window.Promise = 32;
	</script>
	<script src="https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.js"></script>
	<script>
		console.log(Promise); // 32, 说明没有自动polyfill
	</script>
```
**demo:**

```
	<script>
		window.Promise = 32;
	</script>
	<script src="https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.js"></script>
	<script>
	//此处在浏览器中为window.Promise = ES6Promise.Promise;
	//CommonJS中则为 window.Promise = require('es6-promise').Promise;
window.Promise = ES6Promise.Promise;// 与执行ES6Promise.polyfill(); 的效果完全一样，ES6Promise.polyfill()会覆盖掉原生的Promise对象；
console.log(Promise);// ƒ Promise$2(resolver) {}, okay了
	</script>
```

### es6-promise.auto

**demo:**
> es6-promise.auto会检测Promise是否存在，若存在原生的Promise，则不执行；     
> 否则会应用polyfill;

应用：

```
	<script>
		window.Promise = 32;
	</script>
	<script src="https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.js"></script>
	<script>
		console.log(Promise);//ƒ Promise$3(resolver) {} ，已被更改
	</script>
```
不应用：

```
	<script>
		// window.Promise = 32;
	</script>
	<script src="https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.js"></script>
	<script>
		console.log(Promise); // ƒ Promise() { [native code] }， 未被更改
	</script>
```

### 总结
也就是说，es6-promise是个库而已，不会自动polyfill;   
要想自动polyfill那么就用es6-promise.auto。
