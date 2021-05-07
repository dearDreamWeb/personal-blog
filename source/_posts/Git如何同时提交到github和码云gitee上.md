---
title: Git如何同时提交到github和码云gitee上
date: 2021-05-07 15:23:20
tags: git
categories: git
---
<script type="text/javascript" src="/js/src/bai.js"></script>

使用多个远程库时，要注意git给远程库起的默认名称是origin，如果有多个远程库，我们需要用不同的名称来标识不同的远程库。仍然以learngit本地库为例，先删除已关联的名为origin的远程库：

```
git remote rm origin
```
然后，先关联GitHub的远程库：

```
git remote add github git@github.com:xxx/LearnGit.git
```
注意，远程库的名称叫`github`，不叫`origin`了。  
<!--more-->
接着，再关联码云的远程库：

```
git remote add gitee git@gitee.com:xxx/LearnGit.git
```
同样注意，远程库的名称叫`gitee`，不叫`origin`。  


现在，我们用git remote -v查看远程库信息，可以看到两个远程库：

```
gitee   git@gitee.com:xxx/LearnGit.git (fetch)
gitee   git@gitee.com:xxx/LearnGit.git (push)
github  git@github.com:xxx/LearnGit.git (fetch)
github  git@github.com:xxx/LearnGit.git (push)
```
如果要推送到`GitHub`，使用命令：

```
git push github master
```

如果要推送到码云，使用命令：

```
git push gitee master
```

这样一来，本地库就可以同时与多个远程库互相同步