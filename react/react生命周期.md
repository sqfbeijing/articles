### componentWillMount

在componentWillMount 中进行 setState, 不会导致多余的render,   render函数只会执行一次。



在在componentWillMount 中进行 dispatch action到redux,  会执行两次render (即便是同步的action), 经我测试发现 mapStateToProps也会执行两次 (**dva**中测试如下, cc的初始值为 90, dispatch之后变为了312)

> 前提是此组件有使用此prop



![](http://owbd0ue91.bkt.clouddn.com/WX20180622-211525@2x.png)