

* moment.duration
* diff
* asDays
* add
* startOf
* isValid
* 'MM-DD(ddd)'
* moment(ts.format('YYYY-MM-DD')).unix()
* moment.unix(firstDate).format('YYMMDD')



### 当前时间

``moment(new Date())`  等同于 `var now = moment();`

### 字符串

`var day = moment("1995-12-25");`

传入参数为字符串时, 会先以ISO标准找到匹配的格式进行解析，如果没找到匹配的格式， 则会默认使用 `new Date(string)` 来解析。

```js
moment("1995-12-25").format() // "1995-12-25T00:00:00+08:00"
```

### 合法性

```js
// 如果字符串不符合 ISO标准解析格式，会尝试使用 Date.parse()解析， 如果都失败 则返回false
moment("not a real date").isValid(); // false
```



### format语法

| Input      | Example          | Description                                            |
| ---------- | ---------------- | ------------------------------------------------------ |
| `YYYY`     | `2014`           | 4 or 2 digit year                                      |
| `YY`       | `14`             | 2 digit year                                           |
| `Q`        | `1..4`           | Quarter of year. Sets month to first month in quarter. |
| `M MM`     | `1..12`          | Month number                                           |
| `MMM MMMM` | `Jan..December`  | Month name in locale set by `moment.locale()`          |
| `D DD`     | `1..31`          | Day of month                                           |
| `Do`       | `1st..31st`      | Day of month with ordinal                              |
| `DDD DDDD` | `1..365`         | Day of year                                            |
| `X`        | `1410715640.579` | Unix timestamp                                         |
| `x`        | `1410715640579`  | Unix ms timestamp                                      |

```js
moment().format()
// "2018-07-11T16:38:18+08:00"

moment().format('YYYY') // "2018"
moment().format('YY') // "18"

moment().format('M') // "7"
moment().format('MM') // "07"

moment().format('MMM') // "Jul"
moment().format('MMMM') //"July"

moment().format('D') // "7"
moment().format('DD') // "07"

moment().format('X') // "1531298699"   UNIX时间戳
moment().format('x') // "1531298701354"

moment().format('YYYY-MM-DD HH:mm:ss') // "1970-01-01 14-00-00"   
moment().format('YYYY-MM-DD hh:mm:ss') // "1970-01-01 2-00-00"   

```



### unix

**秒**

> moment.unix() 返回一个moment对象, unix方法需要传入一个number类型的 秒 值
>
> moment.unix(unixDate)  相当于moment(unixDate, 'X')

```js
var day = moment.unix(1318781876.721).format('YYYY MM-DD') // "2011 10-17"
moment.unix(1531298699).format('LLL') // "2018年7月11日下午4点44分"
```



```
//以下两个貌似没啥区别
a = moment.unix(1531298699)
a1 = moment.unix(1531298699, 'YYYY-MM-DD')
```

### format

```js
moment().format('L');    // 2018-07-12
moment().format('l');    // 2018-07-12
moment().format('LL');   // 2018年7月12日
moment().format('ll');   // 2018年7月12日
moment().format('LLL');  // 2018年7月12日晚上7点40分
moment().format('lll');  // 2018年7月12日晚上7点40分
moment().format('LLLL'); // 2018年7月12日星期四晚上7点40分
moment().format('llll'); // 2018年7月12日星期四晚上7点40分
```

通过moment对象获取 unix时间 

`moment().unix() // 1531298699   UNIX时间戳`

### moment

moment("20120620", "YYYYMMDD").format()

> If you know the format of an input string, you can use that to parse a moment.

```
moment("12-25-1995", "MM-DD-YYYY");  // 我感觉 和 moment("12-25-1995")没啥差别
```

以下两个效果等价:

> The parser ignores non-alphanumeric characters, so both of the following will return the same thing.
>
>  

moment("12-25-1995", "MM-DD-YYYY");
moment("12/25/1995", "MM-DD-YYYY");