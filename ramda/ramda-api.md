### 常用方法

```js
R.once //只执行一次
R.clone //深克隆
R.isNil // 检查数据为null/undefined
R.isEmpty // 检查数据是否是空对象/数组/字符串
R.path // 安全地获取数据
R.pathOr // 安全地获取数据并赋予初始值
R.assocPath //修改对象上的属性(无副作用，可深度修改)
R.mapObjIndexed //让对象也能像数组那样map
R.omit //删除对象上的某些属性
R.pick // 返回仅包含指定属性的对象
R.pickBy // 返回仅包含指定属性的对象,按照指定函数返回
... 
```

### List 

```js
// 获取前2个元素
R.take(2, ['foo', 'bar', 'baz']); 
//=> ['foo', 'bar']

// 获取后2个元素
R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']


// 获取 常用于返回重复个数的 item
R.times(i => i, 3) 
// => [0,1,2]

//R.repeat方法有风险， 因为返回的如果是对象，那么他们引用的是同一个对象 http://ramda.cn/docs/#repeat

// 获取 范围
R.range(10,13)
// => [10, 11, 12]

// 删除首元素
R.tail([1,2,3])
// => [2,3]

// 删除尾元素
R.init([1,2,3])
// => [1,2]

R.head([1,2,3]) // => 1
R.last([1,2,3]) // => 3

// 摘下 数组或者对象里面的值
R.pluck('val', [{val:1, name: 'a'}, {val:2, name: 'b'}]) 
// => [1, 2]

R.pluck('val', {a: {val:1, name: 'a'}, b: {val:2, name: 'b'}}) 
// => {a:1, b:2}

R.groupBy(item => item > 0 ? 'Y' : 'N', [-2,3,21,-3])
// => {N: [-2, -3], Y:[3, 21]}

// 比如可以用于排期 弹窗的广告位分组
R.groupBy(item => item.name, [{name: 'a', age:1},{name: 'a', age:10},{name: 'b', age:12},{name: 'b', age:1}])
// =>  {a:[{}{}], b:[{}{}]}

// 数组 => 对象   indexBy
R.indexBy(R.prop('id'), [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}]);
//=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}

// 快速转为数组
R.pair('foo', 'bar'); //=> ['foo', 'bar']

// 数组快速转为对象
R.fromPairs([['a', 1], ['b', 2], ['c', 3]]);
//=> {a: 1, b: 2, c: 3}


// 删除首部的几个元素
R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']

// 删除尾部的几个元素
R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']


R.values({c:1,b:2})
// => [1, 2]

R.keys({c:1,b:2})
// => ["c", "b"]


// 删除索引从1开始的2个元素
R.remove(1,2, ['a','b','c','d','e'])
// => ['a','d','e']

// 更新
R.update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']

R.adjust(R.toUpper, 1, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']

// 插入:
R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]

R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]

```



### Object

```jsx
R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]


// 转换:
https://git.in.zhihu.com/efe/odin/merge_requests/37/diffs#ebe144450cad2116b46964267f9f22e1435cbba2_36_59
http://ramda.cn/docs/#evolve

var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
var transformations = {
  firstName: R.trim,
  lastName: R.trim, // Will not get invoked.
  data: {elapsed: R.add(1), remaining: R.add(-1)}
};
R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}

```

