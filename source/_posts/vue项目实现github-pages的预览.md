---
title: vue项目实现github-pages的预览
date: 2020-04-13 16:52:43
tags: Vue
categories: 前端
---
# 版本
目前使用的是vue-cli4.0
# 1、打包vue 项目
vue项目：  
现在github上传建一个github.io仓库，例如xxx.github.io，并再创建一个gh-pages分支。  

在本地先把本地仓库上传到远程仓库的master分支。
<!-- more -->
```
git init
git remote add origin 远程仓库地址
git add .
git commit -m""
git push -u origin master
```
再在命令行输入打包命令
```
npm run build
```
，生成了dist文件夹：  
打包完成。  

## 1.1、打包常见问题1——项目资源无法加载
打开刚刚打包好的dist文件夹，浏览器打开index.html  

发现该页面是空白的，打开控制台发现  

这里看到index.html文件中<font color="#f40">没有加载任何css、js文件</font>。


## 1.2、解决方法——修改config文件
打开项目根目录vue.config.js文件，进行如下修改：
即将
```
publicPath: '/'
```
改成
```
publicPath: './'
```
重新
```
npm run build
```
vue项目的根目录下会生成dist文件夹，会把文件打包进去。  
一般来说，直接打开dist文件下的index.html就可以直接看到效果了。

# 2、上传vue 项目并预览
在dist文件目录下，创建另一个本地仓库，上传到远程仓库的gh-pages分支。
```
git init
git remote add origin 远程仓库地址
git add .
git commit -m""
git push -u origin master:gh-pages
```

# 3、其他问题
1. 用mock模拟数据，无法使用。解决方案：创建一个.json文件把数据写死，然后引用这个文件。

2. 对于使用Vue-cli3.0构建的项目出现的样式失效问题，解决方案：在vue.config.js中设置baseUrl: '/staff/'。