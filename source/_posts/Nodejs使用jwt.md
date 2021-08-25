---
title: Nodejs使用jwt
date: 2021-08-25 20:08:29
tags: Node
categories: 后端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 什么是jwt
jwt全称是JSON Web Token，是Token身份验证的方法之一。  
jwt分为三个部分：
- header 请求头
- payload 负载的数据(如：用户id，过期时间等等)
- signature 签名，由服务端生成
<!-- more -->
jwt返回的token的形式为：
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTIzIiwidGltZSI6MTYyOTg4MzM5MzU1OSwiaWF0IjoxNjI5ODgzMzkzfQ.31tMuBdryKXSSRSEEGs5eEPEDFPmVIStHGdKdNspP00
```
采用的是Base64编码三部分是用`.`来分开的。

# jwt的使用
下载npm包jsonwebtoken，使用的时候有两种常用的方法：  
- sign 用于生成token，有三个参数：`payload`,`secret`,`options`，
    - 其中options中有很多参数如：`expiresIn`（过期时间，如"60": 60ms，2 days"：两天，"10h":是小时，"3d"：3天） 更多参数请看[jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken)
- verify 用于验证token是否正确,参数如`jwt.verify(token, secretOrPublicKey, [options, callback])`，
    - `token`代表的是要验证的token
    - `secretOrPublicKey`代表的就是公钥（如果密钥是自己随便起的字符串，公钥也是该字符串

本篇文章采用的Node.js的框架是koa。  token默认是以`Bearer+空格` 开头的
```js
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

const app= new Koa();
const router = new Router();
const jwt = require('jsonwebtoken');

// body parser
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));

// 密钥
const secret = 'this is a secret'

// 登录
router.post('/login', (ctx: any) => {
    const { account } = ctx.request.body;

    const payload = {
        // 账号
        account
    }
    
    // 生成token
    const token =  'Bearer '+jwt.sign(payload,secret,{ expiresIn: '1day' })
    
    console.log(token)
    
    // 返回给客户端
    ctx.body = {
        success: true,
        token
    }
})

app.use(router.routes()).use(router.allowedMethods());
```
打印结果：
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTIzIiwidGltZSI6MTYyOTg4MzM5NTA3NywiaWF0IjoxNjI5ODgzMzk1fQ.525CfB6yVfkTI2Y5jMb_iFZZ0pETS7i69tpwFvIeo8A
```

客户端发请求是在`headers`中把token带上，后端再headers中接收到token，如：
```js
// 获取token
router.get('/getAccount', (ctx: any) => {

    // 从headers中解析token
    const _token = ctx.request.headers["token"];
    // 使用jwt的verify方法验证token是否正确
   const jwtVerify = jwt.verify(_token, secret, (error, decoded) => {
        if (error) {
            console.log(error.message);
            return false;
        }
        return decoded;
    });
    
    if(jwtVerify){
        ctx.body = {
            success: true,
        }
    }else{
        ctx.body = {
            success: false,
        }
    }

})
```

获取密钥这一步可以写个中间件过滤一下：

```js
router.use((ctx: any, next: any) => {
    const _token = ctx.request.headers["token"];

    const jwtVerify = jwt.verify(_token, secret, (error: Error, decoded: any) => {
        if (error) {
            console.log(error.message);
            return false;
        }
        return decoded;
    });

    if(jwtVerify){
        next()
    }else{
        console.log(jwtVerify)
        ctx.status = 401;
        ctx.body={
            success: false,
            message:'token认证失败'
        }
        return ;
    }
})
```
