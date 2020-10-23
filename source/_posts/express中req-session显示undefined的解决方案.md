---
title: express中req.session显示undefined的解决方案
date: 2020-04-01 23:41:43
tags: Express
categories: 后端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 先看一下源码
```js
  // 创建路由
    const router = express.Router();
    app.use("/api", router);

    // 创建session
    const session = require('express-session');
    app.use(session({
        secret: 'dfafadfadfa', //秘钥
        resave: true,          //即使 session 没有被修改，也保存 session 值，默认为 true。
        saveUninitialized: true,//无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
        cookie: ('name', 'value', { secure: false })//当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效。
    }))
    
    router.use("/aaa",(req,res)=>{
        console.log(req.session)
    })
```
结果当访问到api/aaa地址时，node打印出来的是undefined

<!-- more -->
# 问题原因
是因为路由写在了session上面导致的。

# 解决方法
把session写在路由上面即可  
正确代码
```js
// 创建session
    const session = require('express-session');
    app.use(session({
        secret: 'dfafadfadfa', //秘钥
        resave: true,          //即使 session 没有被修改，也保存 session 值，默认为 true。
        saveUninitialized: true,//无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
        cookie: ('name', 'value', { secure: false })//当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效。
    }))
    
      // 创建路由
    const router = express.Router();
    app.use("/api", router);
    
        router.use("/aaa",(req,res)=>{
        console.log(req.session)
    })
```