* all 都满足

* allPass

* anyPass

* `ascend` 升序

* `descend ` 降序

* `clone`  深拷贝

* `isEmpty` 空类型值

* `isNil ` null 或 undefined

* concat

* countBy

* difference

* `dissoc `  删除对象给定的key

* `omit`  删除对象给定的keys

* `drop`  删除前n个元素

* dropLast  删除后n个元素

* `endsWith`  以...结尾

* startWith 

* eqProps  两个对象指定的属性值是否相等

* `equals`

* find  查找并返回 list 中首个满足 `predicate` 的元素；

* `groupBy`

* has 

* keys

* mean  平均值。

* merge  合并两个对象的自身属性。

* `path` 

* `pathEq`  配合 R.filter 使用。

* `pathOr ` 

* `pick`  返回对象的部分拷贝。

* pickAll 

* `pluck`  从列表内的每个对象元素中取出特定名称的属性，组成一个新的列表。

* project  模拟 SQL 中的 `select` 语句。

* `prop`

* `propEq`

* `propIs`

* props  输入为 keys 数组，输出为对应的 values 数组。

* `sort`

* sum

* symmetricDifference  对称差集。

* take  返回列表的前 `n` 个元素、字符串的前`n`个字符。

* takeLast

* takeWhile

* takeLastWhile  从前往后取出列表元素，直到遇到首个不满足 predicate 的元素为止。

* `type`  用一个单词来描述输入值的（原生）类型。

* union 集合并运算，合并两个列表为新列表（新列表中无重复元素）。

* `uniq`  列表去重操作。返回无重复元素的列表。

* `uniqBy`  返回无重复元素的列表。元素通过给定的函数的返回值以及 [`R.equals`](http://ramda.cn/docs/#equals) 进行相同性判断。

* `values`  返回对象所有自身可枚举的属性的值。

* valuesIn

* where  接受一个测试规范对象和一个待检测对象，如果测试满足规范，则返回 true，否则返回 false。

* whereEq  `where`的一种特殊形式。

* without  求第二个列表中，未包含在第一个列表中的任一元素的集合

* zip  将两个列表对应位置的元素组合，生成一个新的元素对列表。


#### all

> 如果列表中的所有元素都满足 predicate，则返回 `true`；否则，返回 `false`。

```js
var equals3 = R.equals(3)
R.all(equals3, [1,2,3]) // flase
R.all(equals3, [3,3,3]) // true
```



#### allPass

> 传入包含多个 predicate 的列表，返回一个 predicate：如果给定的参数满足列表中的所有 predicate ，则返回 `true`。

```js
var isRed = R.propEq('color', 'red')
var isApple = R.propEq('fruit', 'apple')
var isAllPass = R.allPass([isRed, isApple])
isAllPass({color: 'yellow', fruit: 'banana'}) // false
isAllPass({color: 'red', fruit: 'apple'}) // true
```



#### anyPass

> 只要给定的参数满足列表中的一个 predicate ，就返回 `true`。

```js
var isRed = R.propEq('color', 'red')
var isApple = R.propEq('fruit', 'apple')
var isAnyPass = R.anyPass([isRed, isApple])
isAnyPass({color: 'yellow', fruit: 'apple'}) // true
```



#### ascend

> 创建一个升序比较函数

```js
var ascendAge = R.ascend(R.prop('age'))
var obj = [{name: '2', age: 2}, {name: '3', age: 3}, {name: '1', age: 1}]
R.sort(ascendAge, obj)
output:
0: {name: "1", age: 1}
1: {name: "2", age: 2}
2: {name: "3", age: 3}
```



#### descend

> 创建一个降序比较函数

```js
var descendAge = R.descend(R.prop('age'))
var obj = [{name: '2', age: 2}, {name: '3', age: 3}, {name: '1', age: 1}]
R.sort(descendAge, obj)
output: 
0: {name: "3", age: 3}
1: {name: "2", age: 2}
2: {name: "1", age: 1}
```



#### clone

> 深复制。其值可能（嵌套）包含 `Array`、`Object`、`Number`、`String`、`Boolean`、`Date` 类型的数据。`Function` 通过引用复制。

```js
var obj = [{name: '2', age: 2}, {name: '3', age: 3}, {name: '1', age: 1}]
var cloneObj = R.clone(obj)
cloneObj.push({name: '4', age: 4})

obj.length // 3
```



#### isEmpty

> 检测给定值是否为其所属类型的空值，若是则返回 `true` ；否则返回 `false` 。

```js
R.isEmpty([]) // true
R.isEmpty({}) // true
R.isEmpty('') // true
R.isEmpty(null) // false
R.isEmpty(undefined) // false
```



#### isNil

> 检测输入值是否为 `null` 或 `undefined` 

```js
R.isNil(null) // true
R.isNil(undefined) // true
R.isNil(0) // false
```



#### concat

> 连接列表或字符串。
>
> 注意：不同于 [`Array.prototype.concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat), `R.concat` 要求两个参数类型相同。

```js
'123'.concat(456) // "123456"
R.concat('123', 456) // Uncaught TypeError: 456 is not a string
R.concat('123', '456') // "123456"
```



#### countBy

>根据给定函数提供的统计规则对列表中的元素进行分类计数。
>
>返回一个对象，其键值对为：
>
>`fn` 根据列表元素生成键，
>
>列表中通过 `fn` 映射为对应键的元素的个数作为值。

```js
var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
R.countBy(Math.floor)(numbers) // {1: 3, 2: 2, 3: 1}
```



#### difference

> 求差集。求第一个列表中，未包含在第二个列表中的任一元素的集合。对象和数组比较数值相等，而非引用相等。

```js
R.difference([1,2,3,4], [7,6,5,4,3]); // [1,2]
R.difference([7,6,5,4,3], [1,2,3,4]); // [7,6,5]
```



#### dissoc

> 删除对象中指定 `prop` 属性。

```js
var obj = {a: 'apple', b: 'banbana', c: 'ceil'}

var fruitObj = R.dissoc(obj, 'c') // {a: "apple", b: "banbana"}
obj // {a: "apple", b: "banbana", c: "ceil"}
```



#### omit

> 删除对象中给定的 keys 对应的属性。

```js
var person = {name: "Tom", age: 18, score: 98, sex: "Male"}

R.omit(['score', 'sex'], person) // {name: "Tom", age: 18}
person // {name: "Tom", age: 18, score: 98, sex: "Male"}
```



#### drop

> 删除给定 list，string 或者 transducer/transformer（或者具有 drop 方法的对象）的前 `n` 个元素。

```js
var arr = [-2, -1, 0, 1, 2, 3]
R.drop(3, arr) // [1, 2, 3]
arr // [-2, -1, 0, 1, 2, 3]

R.drop(2, '!@abc') // "abc"
```



#### dropLast

> 删除 "list" 末尾的 `n` 个元素。

```js
R.dropLast(1, ['foo', 'bar', 'baz']) // ['foo', 'bar']
R.dropLast(3, 'ramda') //=> 'ra'
```



#### startWith

> 检查列表是否以给定的值开头。

```js
R.startsWith(['a'], ['a', 'b', 'c'])    // true
```



#### endsWith

> 检查列表是否以给定的值结尾。

```js
R.endsWith('day', 'Monday') // true
R.endsWith('b', ['a', 'b', 'c']) // false
```



#### eqProps

> 判断两个对象指定的属性值是否相等。通过 [`R.equals`](http://ramda.cn/docs/#equals) 函数进行相等性判断。可用作柯里化的 `predicate` 

```js
var fruitObj1 = {a: 'apple', b: 'banana'}
var fruitObj2 = {a: 'apple', b: 'bank'}
R.eqProps('b', fruitObj1, fruitObj2) // false
R.eqProps('a', fruitObj1, fruitObj2) // true
```



#### equals

> 如果传入的参数相等，返回 `true`；否则返回 `false`。可以处理几乎所有 JavaScript 支持的数据结构。

```js
R.equals(3, '3') // false
R.equals(3, 3) // true
R.equals([1,2,3], [1,2,3]) // true

```



#### find

> 查找并返回 list 中首个满足 `predicate` 的元素；如果未找到满足条件的元素，则返回 `undefined` 。

```js
var persons = [{name: 'szw', age: 16, grade: 1}, {name: 'Tom', age: 18, grade: 3}]

var large17 = item => item.age >= 18
R.find(large17, persons) // {name: "Tom", age: 18, grade: 3}
```



#### groupBy

> 将列表根据一定规则拆分成多组子列表，并存储在一个对象中。
>
> 对列表中的每个元素调用函数，根据函数返回结果进行分组。函数返回字符串作为相等性判断，返回的字符串作为存储对象的键，具有相同返回字符串的元素聚合为数组，作为该键的值。

```js
var byGrade = R.groupBy(function(student) {
  var score = student.score;
  return score < 65 ? 'F' :
         score < 70 ? 'D' :
         score < 80 ? 'C' :
         score < 90 ? 'B' : 'A';
});

var students = [
    {name: 'Alert', score: 100}, 
    {name: 'Bake', score: 87}, 
    {name: 'Candy', score: 71},
    {name: 'Dove', score: 30}
]

byGrade(students)
output:
A: [{…}]
B: [{…}]
C: [{…}]
F: [{…}]
```



#### has

> 如果对象自身含有指定的属性，则返回 `true`；否则返回 `false`。

```js
R.has('age')({age: '3'}) // true
```



#### keys

> 返回给定对象所有可枚举的、自身属性的属性名组成的列表。

```js
R.keys({a: 1, b: 2, c: 3}) // ['a', 'b', 'c']
```



#### mean

> 返回给定数字列表的平均值。

```js
R.mean([1,2,3,4]) // 2.5
```



#### merge

> 合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在，使用后一个对象对应的属性值。

```js
R.merge({name: 'Tom', age: 17, score: 98}, {sex: 'Male', age: 18})
output: 
{name: "Tom", age: 18, score: 98, sex: "Male"}
```



#### path

> 取出给定路径上的值。

```js
R.path(['a', 'b'], {a: {b: 2}}); // 2
```



#### pathEq

> 判断对象的嵌套路径上是否为给定的值，通过 [`R.equals`](http://ramda.cn/docs/#equals) 函数进行相等性判断。常用于列表过滤。

```js
var user1 = { address: { zipCode: 90210 } };
var user2 = { address: { zipCode: 55555 } };
var user3 = { name: 'Bob' };
var users = [ user1, user2, user3 ];
var isFamous = R.pathEq(['address', 'zipCode'], 90210);
R.filter(isFamous, users); // [ user1 ]
```



#### pathOr

> 如果非空对象在给定路径上存在值，则将该值返回；否则返回给定的默认值。

```js
var person = {name: 'Tom', fruit: ['apple', 'banana']}

R.pathOr([], ['fruit'], person) // ["apple", "banana"]
R.pathOr([], ['car'], person) // []
```



#### pick

> 返回对象的部分拷贝，其中仅包含指定键对应的属性。如果某个键不存在，则忽略该属性。

```js
var person = {name: "Tom", age: 18, score: 98, sex: "Male"}

var someInfo = R.pick(['name', 'age'], person) // {name: "Tom", age: 18}
```



#### pickAll

> 与 `pick` 类似，但 `pickAll` 会将不存在的属性以 `key: undefined` 键值对的形式返回。

```js
var person = {name: "Tom", age: 18, score: 98, sex: "Male"}
var someInfo = R.pickAll(['name', 'age', 'address'], person)

output: 
{name: "Tom", age: 18, address: undefined}
```



#### pluck

> 从列表内的每个对象元素中取出特定名称的属性，组成一个新的列表。

```js
var persons = [{name: 'Tome', age: 16}, {name: 'Marry', age: 17}, {name: 'Kuke', age: 18}]

R.pluck('name', persons) // ["Tome", "Marry", "Kuke"]
```



#### project

> 模拟 SQL 中的 `select` 语句。

```js
var persons = [{name: 'szw', age: 16, grade: 1}, {name: 'Tom', age: 18, grade: 3}]

var projectSQL = R.project(['name', 'age'], persons)
output: 
0: {name: "szw", age: 16}
1: {name: "Tom", age: 18}
```



#### prop

> 取出对象中指定属性的值。如果不存在，则返回 undefined。

```js
R.prop('x', {x: 100}); // 100
```



#### propEq

> 如果指定对象属性与给定的值相等，则返回 `true` ；否则返回 `false`

```js
var abby = {name: 'Abby', age: 7, hair: 'blond'};
var fred = {name: 'Fred', age: 12, hair: 'brown'};
var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
var alois = {name: 'Alois', age: 15, disposition: 'surly'};
var kids = [abby, fred, rusty, alois];
var hasBrownHair = R.propEq('hair', 'brown');
R.filter(hasBrownHair, kids); // [fred, rusty]
```



#### propIs

> 判断指定对象的属性是否为给定的数据类型，是则返回 `true` ；否则返回 `false` 。

```js
R.propIs(Number, 'age', {name: 'szw', age: 18}) // true
```



#### props

> 输入为 keys 数组，输出为对应的 values 数组。values 数组的顺序与 keys 的相同。

```js
var person = {name: 'szw', age: 18, grade: 1, score: 98}

R.props(['name', 'age', 'score'], person) // ["szw", 18, 98]
```



#### sort

> 使用比较函数对列表进行排序。

```js
var diff = function(a, b) { return a - b; };
R.sort(diff, [4,2,7,5]); // [2, 4, 5, 7]
```



#### sum

> 对数组中所有元素求和。

```js
R.sum([2,4,6,8,100,1]); // 121

```



#### symmetricDifference

> 求对称差集。所有不属于两列表交集元素的集合，其元素在且仅在给定列表中的一个里面出现。

```js
var arr1 = [1, 2, 3, 4]
var arr2 = [3, 4, 5, 6]

var symmetricDifference = R.symmetricDifference(arr1, arr2) // [1, 2, 5, 6]
```



#### take

> 返回列表的前 `n` 个元素、字符串的前`n`个字符。

```js
R.take(3, 'Hello') // "Hel"
R.take(3, [1,2,3,4,5]) // [1, 2, 3]
```



#### takeLast

> 返回列表的后 `n` 个元素、字符串的后`n`个字符。

```js
R.take(3, 'Hello') // "llo"
R.take(3, [1,2,3,4,5]) // [3, 4, 5]
```



#### takeWhile

> 从前往后取出列表元素，直到遇到首个不满足 predicate 的元素为止。

```js
var ages = [{age: 17}, {age: 18}, {age: 19}, {age: 16}]
var lessthan18 = item => item.age < 18

R.takeWhile(lessthan18, ages) // [{age: 17}]
```



#### takeLastWhile

> 从后往前取出列表元素，直到遇到首个不满足 predicate 的元素为止。

```js
var ages = [{age: 17}, {age: 18}, {age: 19}, {age: 16}]
var lessthan18 = item => item.age < 18

R.takeLastWhile(lessthan18, ages) // [{age: 16}]
```



#### type

> 用一个单词来描述输入值的（原生）类型

```js
R.type(null) // "Null"
R.type(undefined) // "Undefined"
R.type(1) // "Number"
R.type('') // "String"
R.type(false) // "Boolean"
R.type(new Date()) // "Date"
R.type(R.type) // "Function"
```



#### union 

> 集合并运算，合并两个列表为新列表（新列表中无重复元素）。

```js
R.union([1,2,3], [3,4,5]) // [1, 2, 3, 4, 5]
R.union('123', '234') // ["1", "2", "3", "4"]
```



#### uniq

> 列表去重操作。返回无重复元素的列表。

```js
R.uniq([1,2,2,1]) // [1, 2]
R.uniq([1, '1']) // [1, "1"]
```



#### uniqBy

> 返回无重复元素的列表。元素通过给定的函数的返回值以及 [`R.equals`](http://ramda.cn/docs/#equals) 进行相同性判断。
>
> 如果给定的函数返回值相同，保留第一个元素。

```js
R.uniqBy(Math.abs, [-1, 0, 1]) // [-1, 0]
```



#### values

> 返回对象所有自身可枚举的属性的值。

```js
var person = {name: 'szw', age: 18, grade: 1, score: 98}
R.values(person) // ["szw", 18, 1, 98]
```



#### valuesIn

> 返回对象所有属性的值，包括原型链上的属性。

```js
var F = function() { this.x = 'X'; };
F.prototype.y = 'Y';
var f = new F();

R.valuesIn(f); //=> ['X', 'Y']
```



####  where

> 接受一个测试规范对象和一个待检测对象，如果测试满足规范，则返回 true，否则返回 false。

```js
var pred = R.where({
  a: R.equals('foo'),
  b: R.complement(R.equals('bar')),
  x: R.gt(R.__, 10),
  y: R.lt(R.__, 20)
});

pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
```



#### whereEq

> 接受一个测试规范对象和一个待检测对象，如果测试满足规范，则返回 true，否则返回 false。

```js
var pred = R.whereEq({a: 1, b: 2});

pred({a: 1});              //=> false
pred({a: 1, b: 2});        //=> true
pred({a: 1, b: 2, c: 3});  //=> true
pred({a: 1, b: 1});        //=> false
```



#### withOut

> 求第二个列表中，未包含在第一个列表中的任一元素的集合

```js
R.without([1,2], [1,2,1,3,4]) // [3, 4]
```



#### zip

> 将两个列表对应位置的元素组合，生成一个新的元素对列表。

```js
R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]

```

