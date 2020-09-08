###  架构

* 仓库
  * 最好使用国内仓库，速度快
* 镜像
  * 类似于java中的类
* 容器
  * 由镜像生成的容器

###  基本使用

Docker 以 ubuntu15.10 镜像创建一个新容器，然后在容器里执行 bin/echo "Hello world"，然后输出结果

```sh
runoob@runoob:~$ docker run ubuntu:15.10 /bin/echo "Hello world"
Hello world
```

以官网app运行hello world

```
docker run hello-world
```

启动 nginx

```js
docker run --detach --publish=80:80 --name=webserver nginx // 然后  go to http://localhost/ to view 
```

运行ubuntu

```
docker run -it ubuntu bash
root@bb434a0a3414:/# ls
```



### 命令

```js
docker //  帮助
docker -v //查看版本
docker image rm nginx // 删除镜像
docker pull ubuntu // 获取镜像
docker images // 查看所有镜像 或者 docker image ls

docker ps // 查看容器
docker ps -a // 查看所有容器
docker container ls -a // 查看所有容器
docker stop 2312b // 停止容器
docker start b750bbbcfd88  // 启动一个已停止的容器
docker restart b750bbbcfd88 //  启动一个已停止的容器
docker run -it ubuntu /bin/bash //  -i: 交互式操作  -t: 终端 
root@ed09e4490c57:/# exit  // 退出终端
docker run -itd --name ubuntu-test ubuntu /bin/bash // 后台运行 --name指定容器名字
docker exec -it 243c32535da7 /bin/bash //加了 -d 参数默认不会进入容器，想要进入容器需要使用指令 docker exec, 推荐使用 docker exec 命令，因为此退出容器终端，不会导致容器的停止
docker export 1e560fca3906 > ubuntu.tar // 导出容器快照到本地文件
docker rm -f 1e560fca3906 // 删除容器
docker container prune // 清理掉所有处于终止状态的容器
docker container stop webserver // webserver是容器名
docker run -d -p 5000:5000 training/webapp python app.py //-p : 是容器内部端口绑定到指定的主机端口。

#标签
docker tag 860c279d2fec runoob/centos:dev // ID为860c279d2fec的镜像多设置一个dev标签

# 网络
 docker network ls // 查看网络
 docker network create -d bridge test-net // 创建网络

```



### 创建镜像

* 创建Dockerfile

```
runoob@runoob:~$ cat Dockerfile 
FROM    centos:6.7
MAINTAINER      Fisher "fisher@sudops.com"

RUN     /bin/echo 'root:123456' |chpasswd
RUN     useradd runoob
RUN     /bin/echo 'runoob:123456' |chpasswd
RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
EXPOSE  22
EXPOSE  80
CMD     /usr/sbin/sshd -D
```

* build

  ```js
  docker build -t sqf/centos:6.7 . //-t ：指定要创建的目标镜像名  . ：上下文路径，是指 docker 在构建镜像，有时候想要使用到本机的文件（比如复制），docker build 命令得知这个路径后，会将路径下的所有内容打包。
  ```

* 运行容器

  ```
  docker run -t -i sqf/centos:6.7  /bin/bash
  ```

## hone

```
cd fe-node-publish
npm install
npm run start
docker build -t hone:v1 . //构建镜像

```





### 相关文档

https://docs.docker.com/docker-for-mac/



### 我的账户 

giovanni9527