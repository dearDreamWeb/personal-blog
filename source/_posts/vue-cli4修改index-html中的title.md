---
title: vue-cli4修改index.html中的title
date: 2020-07-10 09:24:18
tags: Vue
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

由于vue-cli4的index.html的title是在webpack中定义的，如下

```
<title><%= htmlWebpackPlugin.options.title %></title>
```
修改方法：
在vue.config.js中设置
<!-- more -->
```
module.exports = {
    //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
    chainWebpack: config =>{
      config.plugin('html')
        .tap(args => {
          args[0].title = "宝贝商城";
          return args;
        })
    }
  };
```

