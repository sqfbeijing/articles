### 手动使用argv

```js
//test.js
console.log(process.argv)

//terminal
node test.js a=1 -b --bob --tom=1
// 输出:
[ '/usr/local/bin/node',
  '/Users/shaoqianfei/Desktop/wqw/test.js',
  'a=1',
  '-b',
  '--bob',
  '--tom=1' ]

```

要想获取参数的话很麻烦, 需要`process.argv.slice(2)`之后再对参数进行解析才能取到值

### commander

**基础使用**

```js
const commander = require("commander")

commander
  .option("-b, --big", "is big")
  .option("-a, --add", "is add")
  .parse(process.argv)

const isBig = commander.big
const isAdd = commander.add
console.log(isBig, isAdd)

//terminal
shaoqianfeideMacBook-Pro:wqw shaoqianfei$ node cm.js -b -a  (或者node cm.js -b --add)
//输出
true true
```

**option有值**

```js
const commander = require("commander")

commander
  .option("-b, --big", "is big")
  // 指定有默认值, 为'cake'
  .option("-a, --add [type]", "add sth", 'cake')
  .parse(process.argv)

const isBig = commander.big
const addType = commander.add
console.log(isBig, addType)
//terminal *注意：--add pear === --add 'pear' === --add=pear === -a pear*
// 而 -a=peer在命令行中的写法是错误的
shaoqianfeideMacBook-Pro:wqw shaoqianfei$ node cm.js -b --add pear
true 'pear'
//terminal 
shaoqianfeideMacBook-Pro:wqw shaoqianfei$ node cm.js -b --add=apple
true 'apple'
//terminal 不写,则有默认值
shaoqianfeideMacBook-Pro:wqw shaoqianfei$ node cm.js -b --add
true 'cake'
```

**指定了命令**

> 一般用于特定指令, 如果写了action回调并且传了多余的 option 比如: -f -other 这样,就会提示报错.

```js
var program = require('commander');

program
  .command('rm <dir>')  //<dir>此处的尖括号等同于 '[]', 只是为了好辨别而已
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir, cmd) {
    console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''))
  })

program.parse(process.argv)
// terminal  
shaoqianfeideMacBook-Pro:wqw shaoqianfei$ node file.js rm foo -r
remove foo recursively
```



### 杂文

- ```js
  $ npm install -g cnpm --registry=https://registry.npm.taobao.org 与
  $ npm install -g cnpm --registry https://registry.npm.taobao.org 是相同的。
  
  nrm -h  与 nrm --help 是相同的。
  
  // commander也可以写成如下 但一般很少这样干:
  .option("a, --add [type]", "is add", 'cake')
  //terminal 
  shaoqianfeideMacBook-Pro:wqw shaoqianfei$ node cm.js a mike
  'mike'
  ```

  

  