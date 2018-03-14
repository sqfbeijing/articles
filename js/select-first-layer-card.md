# 选取所有的第一层card

![foo](http://owbd0ue91.bkt.clouddn.com/QQ20180314-131657@2x2.png)

如图，实现一个功能，能选取 最外层card里面嵌套的第一层card, 比如，上图中能选取到绿色箭头指向的card和右边的与foo同级的card.


### 函数实现

```
<!DOCTYPE html>


<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.card {
			padding: 20px;
		}
	</style>
</head>

<body>

	<div class="card card-wrap" id="item1">
		<div class="card" id="item2">
			<div class="card" id="item3">

			</div>
		</div>
		<div class="card" id="item22">
			<div class="card" id="item33">

			</div>
		</div>
		<div class="bar" id="item7">
			<div class="card" id="item8">
			</div>
		</div>
		<div class="card" id="item9">
			<div class="card" id="item10">
			</div>
			<div class="card" id="item11">
			</div>
		</div>
	</div>
	</div>

	<script>
		// 递归方式
		function getCard(originCard) {
			var result = [];

			function pushCard(obj) {
				if (obj.className.indexOf('card') !== -1 && obj !== originCard) {
					result.push(obj);
				} else if (obj.children.length > 0) {
					var child = obj.children;
					for (var i = 0; i < child.length; i++) {
						pushCard(child[i]);
					}
				}
			}
			pushCard(originCard);
			return result;
		}

		// 选择器+淘汰方式 获取第一层card
		function getCard2(obj) {
			if (!obj) return null;
			var result = [];
			var allCard = obj.querySelectorAll('.card-wrap .card');
			var innerCard = obj.querySelectorAll('.card-wrap .card .card');
			allCard = Array.from(allCard);
			innerCard = Array.from(innerCard);

			for (var i = 0; i < allCard.length; i++) {
				if (innerCard.indexOf(allCard[i]) === -1) {
					result.push(allCard[i]);
				}
			}

			return result;
		}



		var dom = document.querySelector('#item1');
		var r = getCard(dom);
		// var r = getCard2(dom);
		console.log("09:38", r);
	</script>
</body>

</html>
```


注意有坑， 函数中用了 `result.push` ，而不在for循环中进行[`'splice'`](https://github.com/sqfbeijing/articles/blob/master/js/%E5%A6%82%E4%BD%95%E5%9C%A8%E9%81%8D%E5%8E%86%E6%95%B0%E7%BB%84%E6%97%B6%E6%93%8D%E4%BD%9C%E6%95%B0%E7%BB%84%E5%85%83%E7%B4%A0%EF%BC%9F.md) 。 