---
title: koa-static静态托管
date: 2021-03-17 14:06:00
tags: Koa
categories: 前端
---


# 安装
```
npm i koa-static --save
```
# 使用
```js
const Koa = require('koa');
const app = new Koa();
// 引入 koa-static
const koaStatic= require('koa-static');
const path = require('path');

app.use(koaStatic(path.join(__dirname, './static')))
app.listen(3030);
```
<!-- more -->
先看一下项目的目录结构
![1.png](/koa-static静态托管/1.png)
查看静态文件
![2.png](/koa-static静态托管/2.png)

# 注意：
访问静态文件时，要直接通过`http://localhost:3030/index.html`访问，不是`http://localhost:3030/static/index.html`