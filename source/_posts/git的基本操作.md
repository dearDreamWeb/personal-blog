---
title: git的基本操作
date: 2021-03-24 18:13:45
tags: git
categories: git
---
<script type="text/javascript" src="/js/bai.js"></script>

在进行git 操作之前，先进行一个配置，这个配置告诉git  用户和邮箱  
例子：
```git
git config --global user.name "wxb" 
git config --global user.email "******@163.com"
```
参考下面的流程图：
<!--more-->
![1.png](/git的基本操作/1.png)

`git init` : 初始化仓库
`git status` :  查看git工作区（仓库）的一个状态
`git add` ：添加文件到暂存区
`git add` . :	添加所有未到暂存区的文件
`git commit -m "备注：1.0"`   : 将暂存区的文件进入提交区，文件被git真正意义的管理起来
`git log`:查看日志信息

![2.png](/git的基本操作/2.png)

commit 后面的hash（哈希）值是每次git commit 生成的`commit  id`值
`git reset --hard (commitid)` : 切换到指定的id值版本(这个id可以根据git log查看日志信息去找到) 

![3.png](/git的基本操作/3.png)

`git log --pretty=oneline` : 让git log 日志只显示 commit id 和 备注

![4.png](/git的基本操作/4.png)

`git reset --hard HEAD^`    回退到上个版本
`git reset --hard HEAD^^`  回退到上上个版本

注意：进行版本回退之后，发现commit最新的没了，可以使用`git reflog`进行所有的commitid 的查询

![5.png](/git的基本操作/5.png)