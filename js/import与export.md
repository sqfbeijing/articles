* 示例：

```js
// 一般 单一组件用 export default
export default Component

//如果
// foo.js
export default {
    a: 1,
    c: 3
}
//那么在引用的时候很麻烦
import foo from './foo.js'
// foo.a foo.b
```



* 示例 

> 这种方式在文件中可以先const 声明,最终只export 一次，这样代码比较清晰

```js
export const d1 = 121 //可以放到最后export一个对象
export const d2() {} //可以放到最后export一个对象

// foo.js
export {
    a: 1,
    c: 3
}
//那么在引用的时候很方便
import {a as a1, b as b1} from './foo.js'
//也可以： 
import * as foo from './foo.js'
// foo.a foo.b
```



* 示例

> 相当于一种简写

```js
export {a, b} from './foo.js'
//等价于：
import {a, b} from './foo.js'
export {a, b}
```

