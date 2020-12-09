### Nginx是什么?

Nginx是个免费、开源的HTTP服务器，也可以用作反向代理服务器。它就是类似Apache的提供静态资源的web服务器, 但是Nginx是基于事件驱动的服务器，它更轻量、性能更好。

### 安装

mac 中使用 `brew`来安装:

```zsh
brew install nginx
```

安装完之后会提示如下信息:

```js
If you need to have this software first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.zshrc
 // index.html 在  /usr/local/var/www; 
 Docroot is: /usr/local/var/www

// 端口配置 在 /usr/local/etc/nginx/nginx.conf
The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.  

// 静态文件在 /usr/local/etc/nginx/servers/
nginx will load all files in /usr/local/etc/nginx/servers/.

// 重启时自动start 
To have launchd start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  nginx
```

### 启动服务

启动服务: 

> 80端口需要sudo 

```
[sudo] nginx 
```

关闭服务:

```
sudo nginx -s quit
```

修改了文件，需要重新加载文件:

> 目前发现修改 index.html不需要 reload  会自己改变

```
sudo nginx -s reload
```

### 基本介绍

Nginx的工作方式由配置文件决定，默认情况下，配置文件为`nginx.conf`, 放在`/usr/local/etc/nginx`(我安装时是放在此目录下的)、`/etc/nginx`或者`/usr/local/nginx/conf`文件夹中。

Nginx有一个主线程(master process)和几个工作线程(worker process), **主线程**的主要功能是 加载、验证配置文件,维护工作线程， **工作线程**的主要功能是进行实际的请求。

### 基本命令

```js
nginx  // 启动nginx, 此时不会提示任何东西， 打开 http://127.0.0.1:8080/ 即可
```

nginx启动之后，可以使用以下命令:

`nginx -s <signal>`

-s 意思是向主进程发送信号， signal为以下中的一个:

* `stop`  快速关闭
* `quit` 优雅关闭, 等待nginx工作进程完成当前请求之后，再关闭;
* `reload`  重新加载配置文件，当你修改了 nginx配置文件，则需要执行此命令 来重新加载配置文件, 如果配置文件格式正确，nginx会关闭当前的旧的工作线程，并开启新的工作线程
* `reopen` 重新打开日志文件

`/usr/local/nginx/sbin/nginx -t`  #检查配置文件

### 配置文件

**构成:**

nginx 配置文件由不同的块构成，在块中，每一行都是一个指令，指令必须以分号 `;`结尾,  注释则以`#`开头。

```nginx
# 全局块
# events 块
events {
    ...
}
# http块 中可以用多个server
http {
    ...
        # 虚拟主机server块  可以有多个 location
        server {
        ...
            location {
            ...
        }
        location {
            ...
        }
    } 
        server {

        }
}
```

**普通配置**

> /etc/nginx/nginx.conf , 此文件是个主入口文件， 通过引入 配置文件完成具体的server的配置， 而这个文件主要是配置http相关的设置

```nginx
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;   #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
pid        /var/run/nginx.pid;  #指定nginx进程运行文件存放地址


events {
    worker_connections  1024;     #最大连接数，默认为512
}


http {
    server {
      listen 80;  #监听端口
      return 404;
    }
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $http_x_forwarded_for - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;
    gzip_buffers 16 8k;
    gzip_comp_level 6;
    gzip_http_version 1.1;
    gzip_min_length 1;
    gzip_proxied any;
    gzip_vary on;
    gzip_types
        text/xml application/xml application/atom+xml application/rss+xml application/xhtml+xml image/svg+xml
        text/javascript application/javascript application/x-javascript
        text/x-json application/json application/x-web-app-manifest+json
        text/css text/plain text/x-component
        font/opentype application/x-font-ttf application/vnd.ms-fontobject
        image/x-icon;
    gzip_disable  "msie6";
    client_max_body_size  10m;

    include proxy-headers.conf;
    include /etc/nginx/conf.d/*.conf;
}
```

> /etc/nginx/conf.d/captain.conf,     被导入的配置文件
>
> 如果 `URI` 匹配多个 `location` 块，Nginx 采用**最长前缀匹配原则**

```nginx
server {
  listen 9901;
  server_name *.test *.com;

  access_log /var/log/nginx/captain.access.log main;
  error_log /var/log/nginx/captain.error.log;

  client_max_body_size 10M;
  client_body_buffer_size 1024k;

  location / {
	# 对于匹配的请求，URI 将被添加到 root 指令中指定的路径，即/data/apps/captain/dist/
    root /data/apps/captain/dist/;
    # 尝试寻找匹配 uri 的文件，没找到直接返回root映射的文件夹下的index.html, 再没找到则直接返回 404
    try_files $uri $uri/ /$uri index.html /index.html =404;
	# 限制ip 访问,亲测有效; 允许10-200的ip访问,排除100和其他的; deny 的ip 访问会显示403界面
	deny  192.168.1.100;
	allow 192.168.1.10/200;
	allow 10.110.50.16;
	deny  all;
	# proxy_pass https://cnodejs.org; 若此处写成这样，则访问http://127.0.0.1:8080/ 会直接展示https://cnodejs.org 的界面
    # 移动、pc设备适配; 原理: nginx 监听UA，若是移动设备则重定向到 h5站点
    if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
        set $mobile_request '1';
     }
    if ($mobile_request = '1') {
         # 不同于 proxy_pass,  rewrite 会进行302重定向
         rewrite ^.+ http://mysite-base-H5.com;
     }
  }

}
```

> /etc/nginx/conf.d/adop9010.conf    被导入的配置文件

```nginx
server {
  listen 80;
  server_name adop9010.dev.site.com;

  access_log /var/log/nginx/adop.dev.site.com.access.log main;
  error_log /var/log/nginx/adop.dev.site.com.error.log;

  location ~ ^/assets/ {
    root /data/apps/ads-admin-webapp;
  }

  location /api {
     # Node.js 在 9010 开了一个监听端口, 代理请求到此服务
    proxy_pass http://localhost:9010;
  }

   #请求跨域
  location /api {
    proxy_pass https://cnodejs.org;
  } 

  location /trends/download {
    proxy_pass http://localhost:9010;
  }

  location /crm/dist {
    root /data/apps/;
    try_files /$uri index.html =404;
  }

  location /crm {
    root /data/apps/crm/dist/;
    try_files /index.html =404;
  }

  location / {
    root /data/apps/ads-admin-webapp/assets/;
    try_files /index.html =404;
  }
}
```
**路由正则表达式**    
正则表达式以`~`开头，并空一格。如果一个uri，正则表达式与普通路由都匹配成功，那么优先级: 正则表达式 > 普通路由

```nginx
location ~ \.(gif|jpg|png)$ {
    root /data/images;
}
```

### 常见case

通常执行命令如果全局没有的话往往在 `/usr/local/nginx/sbin/nginx`

### 相关链接

[https://lufficc.com/blog/nginx-for-beginners](https://lufficc.com/blog/nginx-for-beginners)

[https://zhuanlan.zhihu.com/p/24524057?refer=wxyyxc1992](https://zhuanlan.zhihu.com/p/24524057?refer=wxyyxc1992)

[https://juejin.im/post/5a2600bdf265da432b4aaaba](https://juejin.im/post/5a2600bdf265da432b4aaaba)

[https://nginx.rails365.net/chapters/install.html](https://nginx.rails365.net/chapters/install.html)

[http://nginx.org/en/docs/beginners_guide.html](http://nginx.org/en/docs/beginners_guide.html)

[https://zhuanlan.zhihu.com/p/24524057?refer=wxyyxc1992](https://zhuanlan.zhihu.com/p/24524057?refer=wxyyxc1992)

[掘金:高品质博文](https://juejin.im/post/5bacbd395188255c8d0fd4b2)