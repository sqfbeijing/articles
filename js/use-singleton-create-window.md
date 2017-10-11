#js中用单例模式创建一个弹窗	

### 历史
在开发中，动态创建一个弹层（暂且命名为box）是很常见的需求。因为如果在html中始终渲染这些box，代价可能会比较高，如果是纯文字还好，复杂点的涉及到ajax，图片，那就不太好了。然而如果每次用户一个动作（click或者mouseover）就动态创建一个box，移出就删除box,那么效率也不算很高，需要频繁绘制dom,性能不好。那么，如何比较高效、完美地创建一个弹窗呢？本文演示了用单例模式来创建。

### 演示
一个`createWindow`方法,用于创建box:

![](http://owbd0ue91.bkt.clouddn.com/QQ20171011-171956@2x.png)

createWindow函数立即执行，返回了一个匿名函数，匿名函数中保持了createWindow闭包中对div的引用，若div已经存在，则直接返回div,如果不存在，才会重新创建。然后监听按钮事件，只需切换display状态就好了。

### 完整demo代码

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .common-box {
            background: rgb(233, 90, 90);
            width: 100px;
            height: 100px;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <button id="btn1">
        点我创建新窗口
    </button>
    <button id="hide">
        点我隐藏
    </button>
    <script>
        const btn1 = document.querySelector('#btn1');
        const createWindow = (() => {
            let div;
            return (words) => {
                if (!div) {
                    console.log('重新创建');
                    div = document.createElement('div');
                    div.innerHTML = words || '我是默认的语句';
                    div.className = 'common-box';
                    div.style.display = 'none';
                    document.body.appendChild(div);
                }
               
                return div;
            }
        })();

        btn1.addEventListener('click', ()=>{
            let box = createWindow(`我是文字  ${Date.now()}`);
            box.style.display = 'block';
        }, false);
        
        //隐藏
        document.querySelector('#hide').addEventListener('click', ()=>{
            document.querySelector('.common-box').style.display = 'none';
        }, false);
    </script>
</body>

</html>
```

