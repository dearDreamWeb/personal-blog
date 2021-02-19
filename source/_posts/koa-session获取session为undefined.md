---
title: koa-session获取session为undefined
date: 2021-02-19 20:07:59
tags: koa
categories: 后端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 问题
使用koa-session时，获取session显示的是undefined

# 原因
session是依赖于cookie的，前后端跨域时，前后端需要配置允许携带cookie
<!-- more -->

# 解决方案
- 前端
由于前端使用的axios，所以需要在axios中配置`withCredentials: true`。  
例子：  
```js
const $axios = axios.create({
  baseURL: "http://localhost:3030/", // 发送请求的前置的url
  timeout: 10000, // 请求超时的时间
  withCredentials: true   // 允许携带cookie
});
```

- 后端
后端用的是koa2-cor包进行的跨域，所以需要配置`credentials: true`  
例子：  
```js
const cors = require('koa2-cors');
app.keys = ['some secret hurr'];
const sessionConfig = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(sessionConfig, app));
```