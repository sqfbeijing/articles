
# 生命周期 & 参数

### 特别说明: componentWillMount

> 但此方法已经废弃， 尽量使用 constructor和 componentDidMount , constructor中初始化state

在componentWillMount 中进行 setState, 不会导致多余的render,   render函数只会执行一次。

在在componentWillMount 中进行 dispatch action到redux,  会执行两次render (即便是同步的action), 经我测试发现 mapStateToProps也会执行两次 (**dva**中测试如下, cc的初始值为 90, dispatch之后变为了312)  (前提是此组件有使用此prop)

![](http://owbd0ue91.bkt.clouddn.com/WX20180622-211525@2x.png)



### **componentDidMount**

### **componentWillReceiveProps**

>  在此时setState 不会引起 多余的render, 是安全的。一般在此方法中可以进行对比props，然后选择是否要setState

```
componentWillReceiveProps(nextProps){
}
```

### shouldComponentUpdate

```
shouldComponentUpdate: function(nextProps, nextState){
    return this.state.checked === nextState.checked;
    //return false 则不更新组件
}
```

### **componentWillUpdate**

> 即将渲染之前执行, 注意,别在此方法里面进行 更新 props 或者 state

```
componentWillUpdate(nextProps,nextState) 
```

### **componentDidUpdate**

```
componentDidUpdate(prevProps,prevState)
```



# 生命周期图示

![图示](http://owbd0ue91.bkt.clouddn.com/react-lifecycle.png)