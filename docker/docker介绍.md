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
docker // 
docker image rm nginx // 删除镜像
docker pull ubuntu // 获取镜像

docker ps // 查看容器
docker ps -a // 查看所有容器
docker container ls -a // 查看所有容器
docker stop 2312b // 停止容器
docker start b750bbbcfd88  // 启动一个已停止的容器
docker restart b750bbbcfd88 //  启动一个已停止的容器
docker run -it ubuntu /bin/bash //  -i: 交互式操作  -t: 终端 
root@ed09e4490c57:/# exit  // 退出终端
docker run -itd --name ubuntu-test ubuntu /bin/bash // 后台运行
docker exec -it 243c32535da7 /bin/bash //加了 -d 参数默认不会进入容器，想要进入容器需要使用指令 docker exec, 推荐使用 docker exec 命令，因为此退出容器终端，不会导致容器的停止
docker export 1e560fca3906 > ubuntu.tar // 导出容器快照到本地文件
docker rm -f 1e560fca3906 // 删除容器
docker container prune // 清理掉所有处于终止状态的容器
docker container stop webserver // webserver是容器名

```



### 相关文档

https://docs.docker.com/docker-for-mac/



### 我的账户 

giovanni9527