# State

组件应该尽量是无状态的，尽量使用 函数式组件而非类组件

### 时机

>  有时候，并不需要把所有的数据放到state中，render需要依赖的才需要放到state中
>
> https://doc.react-china.org/docs/state-and-lifecycle.html

![](http://owbd0ue91.bkt.clouddn.com/31212.png)



### setState

> setState是异步的，如果依赖原先的state或者props,那么我们需要传给它一个函数而非一个 plain object

**官方例子**

![](http://owbd0ue91.bkt.clouddn.com/21ED618417E8BAB50B957EBCF2F5CA17.png)

**测试例子**

> 此例子中，我希望点击一次，执行两次setState, foo从10变为12，但如果我两次都使用plain object(见注释) ,依赖 this.state.foo, 那么 最终foo只会从10 变成11。 为什么? 因为 第二次setState用到foo的时候, this.state.foo 取的值还是最先前的10。 **所以一句话： 如果setState依赖当前state或者 props，那么就要用函数，别用注释中的那种用法。**

![](http://owbd0ue91.bkt.clouddn.com/foo121.png)



### state or computed function? 

场景一:

```
  get isCreating() {
    return this.props.contractEditType === 'create'
  }
```

场景二: 

```
    const {contract = {}} = props
    const isFree = contract.paymentType === 'free'
    const isSupplement = contract.category === 'supplement'

    this.state = {
      isFree,
      isSupplement,
    }
```



如果 接收props，但是呢 需要进行一些计算处理， 那么我应该在constructor中进行处理， 处理之后放到state， 还是应该 写个function 在render的时候 对props进行计算？

答案： 如果props老是变化，那么就别放到state中, 因为constructor中需要处理一次, 还需要在componentWillReceiveProps中再次处理一次, 这时候采取场景一的方案比较好;   如果props在此组件初始化之后就恒定不变，那么就放在state里面,是没问题的。

**官方示例**

> https://doc.react-china.org/docs/lifting-state-up.html
>
> 如果某些数据可以由props或者state提供，那么它很有可能不应该在state中出现。举个例子，我们仅仅保存最新的编辑过的`temperature`和`scale`值，而不是同时保存 `celsiusValue` 和 `fahrenheitValue` 。另一个输入框中的值总是可以在 `render()` 函数中由这些保存的数据计算出来。这样我们可以根据同一个用户输入精准计算出两个需要使用的数据。 
>
> ```
> // render函数中进行 convert计算
> render() {
>     const scale = this.state.scale;
>     const temperature = this.state.temperature;
>     const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
>     const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
> ```

# 事件

> 值得注意的是，通过 `bind` 方式向监听函数传参，在类组件中定义的监听函数，事件对象 `e` 要排在所传递参数的后面  https://doc.react-china.org/docs/handling-events.html

最佳实践： 使用属性初始化器语法

如果要传递 参数 `e` 作为 React 事件对象, 那么应该约定好, 都作为最后一个参数传给回调函数比较好。



# 组合

https://doc.react-china.org/docs/composition-vs-inheritance.html

> 属性和组合为你提供了以清晰和安全的方式自定义组件的样式和行为所需的所有灵活性。请记住，组件可以接受任意元素，包括**基本数据类型、React 元素或函数。**

主要用法 `props.children`



# JSX

null,undefined,false, true  这几个值会被jsx忽略, 即 不会渲染出来, 如果想要渲染，需要转换为字符串{'undefined'}



# React 版本

> https://github.com/facebook/react/blob/master/CHANGELOG.md

**16.0.0 (September 26, 2017)** => **16.3.0 (March 29, 2018)** => **16.4.1 (June 13, 2018)**

