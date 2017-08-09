# 在centos中部署node.js服务器

### 使用mac终端连接阿里云centos服务器

```
ssh root@47.93.227.194
root@你的服务器公网IP's password: 
Last login: Wed Aug  9 09:04:30 2017 from 36.110.*.*

Welcome to Alibaba Cloud Elastic Compute Service !
```
### 安装Node.js环境
### 编写服务器代码


###  遇到的问题 
在部署的过程中，我用mac中的终端连接阿里云centos,然后用 公网IP:端口号即可访问，但是当mac的终端断开，服务就停止了。我在网上找到这么一些资料：

![](https://raw.githubusercontent.com/sqfbeijing/articles/master/assets/images/linux001.png)

于是我使用 

```
# nohup node ~/a.js &
```

 开启node服务,会出现 

```
#nohup: 忽略输入并把输出追加到"nohup.out"
```
此时退回到shell窗口，输入 exit 即可退出终端。

> nohup.out会在当前目录自动产生，相当于一个日志记录。

### 相关链接
* [ 阿里云-部署Node.js项目](https://help.aliyun.com/document_detail/50775.html?spm=5176.doc57160.6.714.s1sB9P) 
* 可通过 [链接](http://47.93.227.194:3000/) 访问我的网站



