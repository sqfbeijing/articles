### ref的作用

我们知道react数据流是自上而下的，想要改变子组件的状态只需要传递props，但是在某些特定场景下，我们想获取子组件实例或者dom元素，按我们自己的方式来操作元素的行为，这个时候就需要用到ref来获取子组件或者dom元素 

>  场景： 动画 或者 某个时候我们 想focus  一个 input 输入框 

### 使用ref的三大原则： 

1.可以在dom元素上面使用ref属性 

2.可以在class组件上面使用ref属性 

3.不准在函数组件上面使用ref属性，原因：函数组件没有实例，父组件获取子组件的ref，其实是在获取子组件的实例；（但是可以在函数组件中 获取子组件实例的ref，并用一个变量存储起来，这个是没有问题的） 

> 个人感觉函数组件还是有很多限制的，比如不能使用state和生命周期方法，也不能使用ref属性（这个问题我在开发中遇到了，详情见下文)

### 基本使用

```jsx
class App extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }
  handleClick = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>点我 进行focus</button>
        <input ref={this.inputRef} />
      </div>
    );
  }
}
```

 此处示例是**react16.3+版本**的使用（如果想使用旧版本请看下文），步骤有三个: 

1.createRef方法  生成ref  对象 

2.render的时候 接收 子组件或者dom元素的ref属性 

3.用this.inputRef.current 来获取这个 子组件或者dom元素 

### 回调的方式使用 ref

> react16.2及以下一般用它

```jsx
  componentDidMount() {
    if (this.img && this.img.complete) {  //此处可以获取到 img 这个dom 元素
      this.onLoad()
    }
  }

  render() {
    const {className, src, alt, onClick, onRef, preview} = this.props

    return (
        {preview && !src ? (
          <div>
            <DefaultImageIcon />
          </div>
        ) : (
          <img
            ref={node => {
              this.img = node
              if (onRef) {
                onRef()
              }
            }}
            src={src}
            alt={alt}
            onLoad={this.onLoad}
            onClick={onClick}
          />
        )}
    )
  }
```

可以看到, 我们也可以直接使用回调的方式来获取ref，其实个人感觉这种方式更简单，但是至于作者为什么放弃了这种方式，我目前还不清楚。~~~我觉得是因为跨组件传递很麻烦吧~~~。  我们还看到，代码中，onRef方法可以直接把 ref传给上层组件,那么，如果想使用 新版本api将 ref传递给上层组件，有什么办法呢？ 请看 [forwardRef](https://reactjs.org/docs/forwarding-refs.html) 

### forwardRef

```jsx
const MyInput = React.forwardRef((props, ref) =>  (
    <div>
      我是 自定义input 组件
      <input ref={ref}/>
    </div>
  ))

class App extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }
  handleClick = () => {
    this.inputRef.current.focus();
  };
  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>点我 进行focus</button>
        <MyInput ref={this.inputRef}/>
      </div>
    );
  }
}
```

如果想在 上层组件中获取 下层组件内部的 dom 元素或者子孙组件实例,那么可以使用 React.forwardRef 给组件包裹一层.  执行顺序是:  **上层组件 createRef => App 组件传递 ref 给 MyInput => MyInput 通过 forwardRef 方法 接收到 ref => input 输入框 将节点 传给ref(此时这个ref已经是上层组件的ref了)**

### 高阶组件中 使用 ref

其实 forwardRef 使用到的场景不多, 但是有时候 确实需要跨组件传递 ref, 那就只能通过它来实现了。 我们知道， 为了实现一些逻辑，我们会使用高阶组件，它其实就是给一个组件封装一层，但是如果我们想在上层组件获取ref,获取的是高阶组件的ref, 为什么?举个 例子:  最上层组件 叫 App, 高阶组件叫 MyHOC, 子组件叫 MyInput, 我们想在App 中 获取 这个MyInput, 那么如下使用是错误的:

> 如下例子，App里面接收到ref 其实是Foo 的ref,然而 Foo 没有ref 

```jsx
// MyInput.js
import MyHOC from './MyHOC'
const MyInput = () =>  (
    <div>
      我是 自定义input 组件
      <input />
    </div>
)
return MyHOC(MyInput)

// MyHOC.js
const MyHOC = (WrappedComponent) => {
   // do sth here..
    
  class Foo extends React.Component {
    render() {
      return <WrappedComponent  {...this.props} />;
    }
  } 
    return <Foo />;
} 
export default MyHOC

//App.js
import MyInput from './MyInput';
const ref = React.createRef();
<MyInput
  ref={ref} // 此处的 ref其实是 Foo
/>;
```

**那么应该如何正确地在Hoc中使用呢?** 

```jsx
// MyInput.js
import MyHOC from './MyHOC'
const MyInput = () =>  (
    <div>
      我是 自定义input 组件
      <input />
    </div>
)
return MyHOC(MyInput)

// MyHOC
const MyHOC = (WrappedComponent) => {
  class Foo extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
        // 此时 ref 便是这个WrappedComponent 
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }
// 用React.forwardRef 包裹一层,这样将 上层组件的ref 命名为 forwardedRef (任意定义的一个属性名)  传递给子组件
  return React.forwardRef((props, ref) => {
    return <Foo {...props} forwardedRef={ref} />;
  });
}    
export default MyHOC

//App.js
import MyInput from './MyInput';
const ref = React.createRef();
<MyInput
  ref={ref}
/>;
```

如上代码所示, 唯一一个不同的地方是: `MyHOC`组件使用 `React.forwardRef` 将ref 向下层传递, 这样外层组件接收到的ref 就是真实的 MyInput 组件，而非 Foo了

### 问题&解决方法 

* 函数式组件不能使用ref属性（这个问题我在开发中也遇到了，使用ant design 的 getFieldDecorator()(myFnComponent)时 会报 “无法挂载ref的”错误)

```jsx
        <Form.Item
          label={field.label}
          key={`key_${field.label}`}
        >
          {render
            ? render()
            : getFieldDecorator(field.fieldName, {
                rules: R.pathOr([], ['config', 'rules'], field),
                initialValue: data[field.field],
              })(<Item {...field}/>)} // 此处的Item是个 函数式组件,  这样写会出错
         //  })(Item(field))}   这样写才是ok的, 因为Item会返回一个类组件
        </Form.Item>
// 报错信息: Warning: Stateless function components cannot be given refs. Attempts to access this ref will fail.
```

* 组件中多个ref 怎么办？  那么就多次创建 ref 
* 需要注意: 如果 在组件挂载 之前获取 this.myRef.current, 那么会返回一个 `null`, ref 会在 `componentDidMount` 或者 `componentDidUpdate` 之前更新

### 参考链接

[https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509)

[https://reactjs.org/docs/refs-and-the-dom.html](https://reactjs.org/docs/refs-and-the-dom.html)

[https://ant.design/components/form-cn/#this.props.form.getFieldDecorator(id,-options)](https://ant.design/components/form-cn/#this.props.form.getFieldDecorator)

[https://reactjs.org/docs/forwarding-refs.html](https://reactjs.org/docs/forwarding-refs.html)