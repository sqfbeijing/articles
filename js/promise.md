### 多个请求嵌套

```jsx
const request = x =>
  new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (x === 1) {
        reject(new Error('msg'))
      }
      resolve(Math.random())
    }, 1300)
  })

const r1 = () => request(1)
const r2 = () => request(2)

r1()
  .then(v => {
    console.log("上午11:58:34 r1", v)
    return r2()
  })
  .then(v => {
    console.log("上午11:58:34 r2", v)
    return 12
  })
  .catch(e => {
    console.log("下午12:00:15", e.message)
  })


  

```

