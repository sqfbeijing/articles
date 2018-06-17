Dva-loading是个插件，解决： ```You don't need to write `showLoading` and `hideLoading` any more.```   但不能用于 判断数据是否加载完成。 

#### 场景:

比如这样写是错的：

```
    if (loading === true) {
      return <div>数据加载中...</div>
    }
    return (
      <Form className={styles.InvoiceForm}>
        {shouldShowRejectPanel && this.renderRejectReason()}
        <div className={styles.formSection}>
```

因为 ```loading: state.loading.models.invoices,``` 这个loading 在redux中，最开始的时候 是undefined, (打断点看到的), 所以 会直接走到下面进行数据渲染。如果 后面 的代码没有类似这样的 ```if (!data) return (null)```判断， 则就会直接报错。



 我认为此插件只是解决loading效果， 比如spinner 效果，但不能完全依靠它来判断数据是否加载完成。

#### 场景:

即使把代码改为 以下方式，我觉得也是不对的，

```   if (loading === undefined || loading === true) {
    if (loading === undefined || loading === true) {
      return <div>数据加载中...</div>
    }
    return (
      <Form className={styles.InvoiceForm}>
        {shouldShowRejectPanel && this.renderRejectReason()}
```

因为，数据加载完成之后,invoices的loading为false, 我切换路由之后，再进来, 如果没有数据，此时loading仍然为false，又会走到下面进行渲染。 所以仍然需要我进行判断数据是否加载完成。

#### 场景3:

这样的方法~~也是错的：~~ (并没有错,只是会先显示遗留数据罢了)

```
    if (R.isEmpty(invoice) || R.isEmpty(dictionary)) {
      return <div>数据加载中...</div>
    }
```



 第一次进入页面是ok的，invoice是`{}`,  会显示 加载中... 效果，但加载完成之后 ，invoice存放在store中遗留，之后并不会清空,切换路由之后,再进入此页面， 就不会显示  `数据加载中…`这个效果了。



### 好的方案

* 方法1： 利用 dva-loading仅仅展示loading状态, 但数据仍要进行判断是否为空，为空则return null

* 方法2:  利用 dva-loading仅仅展示loading状态, 组件中每个地方都进行判断,比如: 

* ```
              {invoice.price_details &&
                invoice.price_details.map(order => {
                  return (
                    <div key={order.order_id}>
                      {`${order.order_name}  (${order.order_id}): ￥${
                        order.user_price
                      }`}
                    </div>
                  )
                })}
  ```

  效果如下： (此效果会一闪而过，但不会报错了) 但此方法有问题:

  顺序 :  先显示空数据情况如下图 =>  显示'加载中...'(dva-loading) => 显示正常数据

* ![](http://owbd0ue91.bkt.clouddn.com/WX20180609-181344@2x.png)

* **方法3：** 路由组件的state里面存放loading: true, 然后请求数据，请求成功之后，设置为false. 这样在路由切换之后constructor函数会再执行一次，state的loading又会变为true,完美解决。

* **方法4：** 

* ``` if (R.isEmpty(invoice) || R.isEmpty(dictionary)) { return <div>数据加载中...</div> }
   if (R.isEmpty(invoice) || R.isEmpty(dictionary)) {
        return <div>数据加载中...</div>
      }
  ```

  ### 总结

  写代码多写点兜底情况,这样能运行不至于报错。

  总的来说方法3最好，方法1略微麻烦，方法4比方法1好。

  