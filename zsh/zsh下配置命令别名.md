# zsh下配置命令别名

- 找到zsh的配置文件.zshrc（～.zshrc），添加别名配置 
  例如 `alias install="sudo apt-get install"`
- 令上面修改的配置文件生效 
  `source ~.zshrc`
- 查看shell中的现有别名，terminal下输入： 
  `alias`

其他推荐配置：

```
alias ys="yarn start"
alias sys="sudo yarn start"
```

