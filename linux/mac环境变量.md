```
bash   open -a Finder ./
```

[链接](https://www.jianshu.com/p/acb1f062a925)

> Mac系统的环境变量，加载顺序为： /etc/profile /etc/paths  ~/.bash_profile ~/.bash_login ~/.profile ~/.bashrc   
>
> /etc/profile和/etc/paths是系统级别的，系统启动就会加载，后面几个是当前用户级的环境变量。后面3个按照从前往后的顺序读取，如果**/.bash_profile**文件存在，则后面的几个文件就会被忽略不读了，如果/.bash_profile文件不存在，才会以此类推读取后面的文件。~/.bashrc没有上述规则，它是bash shell打开的时候载入的。

### 修改mac环境变量

> // 比如我要增加我的桌面 到环境变量，这样之后，桌面上面的可执行文件 我可以直接运行, 不需要 './foo' ，直接 'foo'就可以

```bash
// /.bash_profile文件 修改此文件 bash/sh/zsh 都会生效
// 语法：export PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/shaoqianfei/Desktop:$PATH

//命令行echo 查看当前环境变量
echo $PATH 

//查看家目录
echo $HOME
/Users/shaoqianfei
```

**特例**

如果你安装了 zsh 这样的工具, 设置环境变量就需要在 

```js
/Users/shaoqianfei/.zshrc
```

而非 `/Users/shaoqianfei/.bash_profile ` 中了， 我亲测 export SHIPIT_USER=YOUR_SSH_USERNAME    在.bash_profile 中设置不行, 而.zshrc中设置就可以。

### host文件

```shell
//显示hosts文件
shaoqianfeideMacBook-Pro:~ shaoqianfei$ cat /etc/hosts
```

### 全局bin-机器自带的

目录：`/bin `

此目录下有类似 `pwd, ls`这样的命令

### 全局bin-用户安装的

`cd /usr/local`   然后  ` ls -l bin`  可以看到映射关系:

> 映射关系就是 可以看到 bin 目录下面 都是替身,原身文件在 `use/local/lib下面 

```
shaoqianfeideMacBook-Pro:local shaoqianfei$ ls -l bin
total 72952
lrwxr-xr-x  1 root  wheel        45  6  4 17:09 create-react-app -> ../lib/node_modules/create-react-app/index.js
lrwxr-xr-x  1 root  wheel        35  5 13 22:07 dva -> ../lib/node_modules/dva-cli/bin/dva
lrwxr-xr-x  1 root  wheel        40  5 27 15:48 eslint -> ../lib/node_modules/eslint/bin/eslint.js
```

**目录下文件**

```
/usr/local/bin
.
|____nrm
|____npm
|____git
|____create-react-app
```

### 全局npm 包

```
/usr/local/lib/node_modules
```

### 可执行的js脚本

> http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html
>
> 一个可执行的js 脚本 应该以 `#!/usr/bin/env node` 开头 或者 `#! /usr/local/bin/node` 开头
>
> 然后 sudo chmod +x   foo.js 或者 sudo chmod 755 foo.js

**bin方式**

```
  "bin": {
    "hello": "./lib/hello.js"
  }
```

见阮一峰的教程, `npm init, 然后 npm link`之后,  出现

```
/usr/local/bin/hello -> /usr/local/lib/node_modules/foo1/lib/hello.js
/usr/local/lib/node_modules/foo1 -> /Users/shaoqianfei/Desktop/foo1
shaoqianfeideMacBook-Pro:foo1 shaoqianfei$ hello
hello world
```

意思是说  全局的hello 命令会执行 `/usr/local/lib/node_modules/foo1/lib/hello.js`文件

**使用 scripts方式**

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "hello": "./node_modules/.bin/hello.js" //此处hello.js应该是个可执行文件
  },
```

​	或者写为: `"hello": "hello.js" //此处hello.js应该是个可执行文件`，    `./node_modules/.bin` 可以忽略, 因为npm运行命令时候会链接环境： `./node_modules/.bin/`

然后运行 `npm run hello`  就ok:

```
shaoqianfeideMacBook-Pro:foo1 shaoqianfei$ npm run hello

> foo1@1.0.0 hello /Users/shaoqianfei/Desktop/foo1
> hello.js

hello world
```

