---
title: node的调试方法-Inspector调试
date: 2023-02-03 13:57:28
tags: Node
categories: 后端 
---
举例一个简单的例子，创建一个app.js入口文件

```js
const express = require('express');
const app = express();
// 启动
app.listen(3333,()=>{
    console.log('http://localhost:3333');
});
// /api接口
app.use('/api', (req, res) => {
    res.json({
        success: true,
        message: 'hell world'
    })
})
```
<!--more-->
可以直接使用 `node--inspect app.js` 或 `npx nodemon --inspect app.js` 。  
当然也可以在package.json文件中配置脚本去运行，如下：
```json
{
  "name": "npmTest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "npx nodemon --inspect app.js ",
  },
}
```
运行 npm run dev 即可。  
Inspector是通过浏览器和远程服务器建立连接后，是通过 WebSocket 协议通信的
<img src='https://resource.blogwxb.cn/blogResources/4297f44b13955235245b2497399d7a93-1.png'/>
9229 端口是 Node.js 默认选择的端口，这时候随便打开个网页，点击node图标就可以打开新的控制台，然后就可以调试了。
<img src='https://resource.blogwxb.cn/blogResources/4297f44b13955235245b2497399d7a93-2.png'/>
<img src='https://resource.blogwxb.cn/blogResources/4297f44b13955235245b2497399d7a93-3.png'/>

打开`sources`即可调试，也可以断点调试
<img src='https://resource.blogwxb.cn/blogResources/4297f44b13955235245b2497399d7a93-4.png'/>

还有一种方法可以进到`node调试工具`，在 Chrome 浏览器的地址栏，输入`chrome://inspect` 或者 `about:inspect` ，进入到页面之后，点击`inspect按钮`即可进入到`Node调试工具`。
<img src='https://resource.blogwxb.cn/blogResources/4297f44b13955235245b2497399d7a93-5.png'/>
Local 作用域和 Global 作用域里面的所有变量
<img src='https://resource.blogwxb.cn/blogResources/4297f44b13955235245b2497399d7a93-6.png'/>