### 简介 ###

* moment

* add
* subtract
* startOf
* endOf
* format
* diff
* daysInMonth
* toArray
* toObject
* isBetween
* isLeapYear
* isMoment
* isDate
* duration
* asDays

| Key         | Shorthand |
| ----------- | --------- |
| years       | y         |
| quarters    | Q         |
| months      | M         |
| weeks       | w         |
| days        | d         |
| hours       | h         |
| minutes     | m         |
| seconds     | s         |
| millseconds | ms        |



### 解析



#### 通过当前时间获得moment对象

```js
moment();
```

#### 通过Unix 时间戳（毫秒）获得moment对象 

```
moment(Number);
moment(1551841019666).valueOf() // 1551841019666
```

```js
const time = Date.now()
moment(time).toArray() // [2018, 9, 11, 18, 22, 4, 726]
```

#### 通过Unix 时间戳（秒）获得moment对象

```
moment.unix(Number)
```

```js
const time = Date.now()
moment.unix(Math.floor(time / 1000)).toArray() // [2018, 9, 11, 18, 22, 4, 0]
```

#### 通过moment对象获得Unix 时间戳（毫秒）

```
moment().valueOf() // 1551839106211
moment().format('x'); // "1551839106211"
```

#### 通过moment对象获得Unix 时间戳（秒）

```
moment().unix() // 1551841372
moment().format('X'); // "1551841372"
```



### 操作

#### 加法 ####

> 基于一个时间增加

```
moment().add(Number, String);
moment().add(Duration);
moment().add(Object);
```

```js
moment().startOf('d').add(1, 'M') // Sun Nov 11 2018 00:00:00
```



#### 减法 ####



> 基于一个时间减少，类比 **加法**

```
moment().subtract(Number, String);
moment().subtract(Duration);
moment().subtract(Object);
```



#### 开始时间 ####

> 设置开始时间

```
moment().startOf(String)
```

```js
moment().startOf('d') // Thu Oct 11 2018 00:00:00

等同：
moment().hours(0).minutes(0).seconds(0).milliseconds(0)
```



#### 结束时间

> 设置结束时间

```
moment().endOf(String)
```

```js
moment().endOf('d')  // Thu Oct 11 2018 23:59:59

等同：
moment().hours(23).minutes(59).seconds(59).milliseconds(999)
```



### 显示

#### 格式化

> 格式化显示

```js
moment().format();
moment().format(String);
```

```js
moment().format() // "2018-10-11T16:13:15+08:00"
moment().format("YYYY/MM/DD HH:mm:ss") // "2018/10/11 16:10:25"
moment().format("YYYY-MM-DD") // "2018-10-11"
```



#### 时差

> 两个时间的时间差

```js
moment().diff(Moment|String|Number|Date|Array);
moment().diff(Moment|String|Number|Date|Array, String);
moment().diff(Moment|String|Number|Date|Array, String, Boolean);
```

```js
const a = moment(), 
      b = moment().subtract(1, 'd')
a.diff(b) // 86399999

const c = moment([2018, 1])
const b = moment([2018, 10])
b.diff(a, 'M') // 9
b.diff(a, 'y', true) // 0.75
```



#### 天数（月）

> 判断一个月有多少天

```
moment().daysInMonth();
```

```js
moment('2018-02', 'YYYY-MM').daysInMonth() // 28
moment('2018-10', 'YYYY-MM').daysInMonth() // 31
```



#### 数组

> 将moment 类型 转换 数组

```
moment().toArray()
```

```js
moment().toArray() // [2018, 9, 11, 17, 9, 59, 227]
```



#### 对象

> 将moment类型 转换 对象

```
moment().toObject()
```

```js
moment().toObject()

/** output:
 * date: 11
 * hours: 17
 * milliseconds: 991
 * minutes: 12
 * months: 9
 * seconds: 37
 * years: 2018
 **/
```



### 查询



#### 是否之间

> 给定时间是否在某个时间段内

```js
moment().isBetween(moment-like, moment-like);
moment().isBetween(moment-like, moment-like, String);
```

```js
moment().isBetween('2018-01-01', '2018-12-31') // true
```



#### 是否闰年

> 给定时间所在年份是否闰年

```
moment().isLeapYear()
```

```js
moment().isLeapYear() // false
moment(['2016']) // true
```



#### 是否 moment 对象

> 给定参数是否为 moment 类型
>
> 注意：moment 后没有括号

```
moment.isMoment(obj)
```

```js
moment.isMoment(new Date()) // false
moment.isMoment(moment()) // true
```



#### 是否 Date 对象

> 给定参数是否为 Date 类型
>
> 注意：moment 后没有括号

```
moment.isDate(obj);
```

```js
moment.isDate(new Date()) // true
moment.isDate(moment()) // false
```



### 时间段



> 创建 duration

```
moment.duration(Number, String);
moment.duration(Number);
moment.duration(Object);
moment.duration(String);
```



> 两个时间点间隔的 年| 月| 日| 小时 | 分钟 | 秒

```js
const a = moment([2016, 6, 26, 10, 11, 23])
const b = moment()
Math.floor(moment.duration(b.diff(a)).asYears()) // 2
Math.floor(moment.duration(b.diff(a)).asMonths()) // 26
Math.floor(moment.duration(b.diff(a)).asDays()) // 807
```

