[参考链接](http://www.runoob.com/linux/linux-shell-include-file.html)

[https://github.com/qinjx/30min_guides/blob/master/shell.md](https://github.com/qinjx/30min_guides/blob/master/shell.md)

引言:

> Shell 编程跟 java、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。
>
> Linux 的 Shell 种类众多，常见的有：
>
> - Bourne Shell（/usr/bin/sh或/bin/sh）
> - Bourne Again Shell（/bin/bash）
> - C Shell（/usr/bin/csh）
> - K Shell（/usr/bin/ksh）
> - Shell for Root（/sbin/sh）
> - ……
>
> 本教程关注的是 Bash，也就是 Bourne Again Shell，由于易用和免费，Bash 在日常工作中被广泛使用。同时，Bash 也是大多数Linux 系统默认的 Shell。
>
> 在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，像 **#!/bin/sh**，它同样也可以改为 **#!/bin/bash**。
>
> \#! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。

### 基本使用

```bash
// foo.sh   运行./foo.sh sqf 即可
#!/bin/bash
echo "foo  $1"   //输出:  foo sqf
```



```
#!/bin/bash
# author:菜鸟教程
# url: www.runoob.com

#使用 . 号来引用test1.sh 文件
. ./foo.sh  //第一个. 代表引用  第二个. 代表当前路径

# 或者使用以下包含文件代码
# source ./test1.sh
url="http://www.runoob.com"
echo "菜鸟教程官网地址：$url"
```

