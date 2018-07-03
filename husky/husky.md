https://zhuanlan.zhihu.com/p/27094880?utm_source=itdadao&utm_medium=referral

> husky 是git预提交之前 做一些处理。 
>
> 常见做法是使用 [husky](https://link.zhihu.com/?target=https%3A//github.com/typicode/husky) 或者 [pre-commit](https://link.zhihu.com/?target=https%3A//github.com/observing/pre-commit) 在本地提交之前做 Lint。
>
> 通常配合 lint-staged(一个npm包) eslint stylelint prettier  一起来使用

在项目中安装了husky之后，就可以写 :

```
// package.json
{
  "scripts": {
	"precommit": "lint-staged",
  }
}
```



```
// .lintstagedrc
{
  "{src,test}/**/*.js": [
    "prettier:precommit",
    "eslint:precommit",
    "git add"
  ],
  "{src,public}/**/*.{css,less}": [
    "stylelint:precommit",
    "git add"
  ]
}

```

