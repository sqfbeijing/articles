## 引言

* 修改 location.search / location.hash 均会在页面栈中存储(点击回退按钮可以回到上一页)；
* 修改 location.search回刷新页面， 而修改location.hash 不会刷新页面



##  history api

https://zhuanlan.zhihu.com/p/22412047

「history.pushState」，用于改变 URL，「window.onpopstate」来监听返回事件

```javascript
function setUrl(page){
    var url = location.pathname + '?page=' +  page
    var state = { 'page_id': 1, 'user_id': 5 };
    var title = 'Hello World';
	history.pushState(state, title, url);//一般history.pushState({}, '', url)也行
}
```

`	history.pushState`之后，可以用`history.go(-1)`或者`history.back()`进行回退。

