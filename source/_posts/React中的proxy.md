---
title: React中的proxy
date: 2020-05-22 19:09:15
tags: React
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 一、安装http-proxy-middleware
```js
npm install http-proxy-middleware --save
```
# 二、进行配置
安装middleware插件后，在src目录中新建setupProxy.js文件，在文件中放入如下代码：
<!-- more -->
```js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:3000',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api"
    }
  }))
}
```
简单来说就是当接口是以/api开头才用代理。

比如：   
本来是在localhost:8080启动的react，
<font color="#f40">axios.get("/api/a")请求，最后代理路径就是http://localhost:3000/api/a </font>

<font color="#f40">pathRewrite ： 路径重写功能</font> 默认的好像是pathRewrite: {
"^/xxx": ""} 这个xxx是和createProxyMiddleware()第一个参数对应的。    
上诉例子就是当匹配到/api开头的接口，开头的 <font color="#f40">/api不变</font>。如果上诉例子这样写 ==pathRewrite: {"^/api": "/api"}== 意思就是开头的 <font color="#f40">/api</font> 变成了 ==""==（空字符串）  
这个功能相当于js中的replace功能





# 三、然后运行项目
```
npm run start
```


