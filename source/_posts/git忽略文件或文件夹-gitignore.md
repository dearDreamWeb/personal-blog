---
title: git忽略文件或文件夹.gitignore
date: 2021-01-29 09:47:22
tags: git
categories: git
---
<script type="text/javascript" src="/js/bai.js"></script>

# .gitignore文件配置
如果没有.gitignore文件创建一个，有的话可以直接修改。可以使用`ls -a`查看所有的隐藏的文件。
# .gitignore规则
简单举几个例子
```
server/node_modules    过滤server文件夹中的node_modules文件夹
server/myDoc.docx      过滤server文件夹中的myDoc.docx文件
*.zip                  过滤以.zip后缀的文件
!root/                 不过滤root文件
```
<!--more-->
# .gitignore立即生效
如果当前.gitignore规则中忽略的文件在之前的版本已经被提交过了，那么这些文件在之后的提交也不会被忽略。  
解决方法是先把本地的缓存删除完毕，让其变成未追踪状态，然后提交。
```
git rm -r --cached . // 删除本地缓存
git add . // 添加要提交的文件
git commit -m 'update' // 更新本地的缓存
```