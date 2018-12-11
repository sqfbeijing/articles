[TOC]

### Typescript是什么?

typescript(本文后面均以ts简称)是由微软开发的一门开源的编程语言，它在2012年公开了首个版本，它是js的超集。ts扩展了js的语法,所以所有的js语法都可以在ts中进行运用。也就是说，我们在js => ts的重构中，可以渐进式地重构。

ts与js最大的区别是，js是一门弱类型、动态类型的编程语言，而ts是一门静态类型的语言，用ts进行软件开发具有更好的健壮性, 我觉得正是由于这个原因，才使得ts如此火爆。使用ts的另一个原因是,js 标准和规范每年都会更新，然而浏览器支持不够，我们往往需要各种工具(babel)编译成浏览器支持的js版本,也很麻烦。所以有的人喜欢写coffescript,typescript 这样的语言，因为它们往往包含了较新的、更强大的js内置功能和api，我们只需要写ts,然后最终编译成浏览器支持的js即可。

### 安装

> 全局安装ts, 然后你的命令行会具有 `tsc` 命令

```bash
npm install -g typescript
# 命令行 查看版本
tsc --version
=>  Version 3.0.1

```

### 基本命令

```bash
Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt
          tsc --build tsconfig.json
```



### 起步

编写一个基本的 `a.ts`文件,然后编译成a.js

> 如果你之前写的是jsx, 那么可以编写a.tsx 文件

```tsx
function greeter(person: string) {
    return "Hello, " + person;
}
```

运行 `tsc a.ts`  编译为 => 

```js
function greeter(person) {
    return "Hello, " + person;
}

```

### 配置文件

noEmitOnError: 发生错误则 编译不通过

noImplicitAny: 不想让TypeScript将没有明确指定的类型默默地推断为 `any`类型

module: 可用的选项有 `commonjs`，`amd`，`system`，and `umd`。

moduleResolution: node

```json
{
    "compilerOptions": {
        "outDir": "./built",
        "allowJs": true, 
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}

// 更完整的配置
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "noImplicitAny": false,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist", // TS文件编译后会放入到此文件夹内
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*", "src/types/*"]
    }
  },
  "include": ["src/**/*", "node_modules/@types/puppeteer/index.d.ts"]
}
```



### 模块化

**导入**

```tsx
// For Node/CommonJS  先声明模块，然后才能使用
declare function require(path: string): any;
```



```tsx
import foo = require("foo");  // 相当于 var foo = require("foo"); 

foo.doStuff();
```

**导出**

```tsx
export function feedPets(pets) {  // 相当于module.exports.feedPets = function(pets) {
    // ...
}

export = foo; // 相当于   module.exports = foo;
```



```shell
npm install -s @types/lodash
```



### 基础类型

ts支持:  布尔、数字、字符串、数组、

boolean, number,string,list

**定义数组的两种方式:**

```tsx
let list: number[] = [1,2,3]
let list: Array<number> = [1,2,3] // 数组泛型
```

**元组 类型**

```tsx
let arr = [number, string];
arr = [20, 'foo']
```



**枚举类型**

```tsx
// 直接获取值
enum Color {Red, Green, Blue}
let c: number = Color.Blue  // 或者 let c: Color = Color.Blue; 这是官方写法
console.log(c) // 2 。 因为默认从0开始

// 通过值获取名字
enum Color {Red, Green, Blue}
let c: string = Color[2] 
console.log(c) // 'Blue'
```



**Any类型**

> 当我们希望 跳过编译检查时，可以用此类型；一般在 使用第三方库或者暂时不知道类型的情况下使用它；

```tsx
let notSure: any = 4;
notSure = false // 重新赋值为 布尔类型也ok   => false

notSure.foo() //还可以调用 any类型变量的方法， ts不会校验这行代码, 但js运行会报错
```



**Void类型**

> 没有任何类型；  

```tsx
let foo: void = undefined //  只能为它赋予undefined和null：
```



**Null 和 Undefined**

> --strictNullChecks 配置之后，`null`和`undefined`只能赋值给`void`和它们各自， 应该尽可能地使用它。

```tsx
let f: null = null;
```

如果没有配置 --strictNullChecks, 则可以这样写: (因为`null`和`undefined`是任何类型的子集)

```tsx
let n: number = null; // null
```

**Never**

永不存在的值，比如 一个函数 进入无限循环或者抛出异常， 则此函数返回的类型是never

**类型断言**

> 相当于其他语言的类型转换

1. 方式1 *(tsx中无法使用此语法)*

```tsx
let someValue: any = "this is a string"; // 此处定义为any 但赋值为字符串

//此处程序员知道它是字符串 所以进行断言
let strLength: number = (<string>someValue).length; 
```

2. 方式2 `as`语法：

```tsx
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length; // 断言
```







TODO:联合类型是什么?

