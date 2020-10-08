---
title: Express中的socket.io
date: 2020-07-05 20:00:21
tags: Express
categories: 后端
---
socket.io中文api博客地址：https://blog.csdn.net/u010528747/article/details/54341751

# 一、socketio开发时的使用范围
wifi的IP动态分配机制，socket属于可靠连接，在<font color="#f40">wifi中，其他设备（pc，手机）</font>访问<font color="#f40">都没法通过ip访问</font>，虽然<font color="#f40">能访问http协议</font>的服务，<font color="#f40">但socket不行</font>。

<!-- more -->

# 二、Express中的使用
express中的代码：  
先下载 <font color="#f40">npm i socket.io </font>
<font color="#f40">socket.on</font>   是接收数据
<font color="#f40">io.emit </font>    是发送数据
<font color="#f40">server.listen()</font>    一定要新开一个端口,它代表socket.io的通信端口
<font color="#f40">socket.emit</font>        发送的数据应该为字符串格式，所以每次用<font color="#f40">JSON.stringfy()</font>来格式化一下，再在socket.on时<font color="#f40">JSON.parse()</font>
```js
const app = require("express")();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// 连接客户端
io.on('connection', socket => {
    // 接收message事件的数据
    socket.on('message', data => {
        console.log("服务器收到消息" + data);
        // io.emit代表广播，socket.emit代表私发
        io.emit('message', data);
    })

    // 客户端断开，自带事件
    socket.on('disconnect', function () {
         io.emit('leave', socket.nickname + ' left')
     })
});
server.listen(8000)  //一定要新开一个端
```

# 三、前端代码
下载 <font color="#f40">npm i socket.io-client</font>
```js
import io from "socket.io-client";
const socket = io("ws://localhost:8000");  //和后端接收和发送socket.io数据的端口

 socket.on("message", data => console.log(data))
 socket.emit("message","aaaa");
 console.log("向服务器发送消息")
```

# 四、socket.io私发消息
<font color="#f40">socket.id</font>是对客户端的唯一值，和session.id差不多一个意思，每次客户端连接socket.id都会变。

## 关键语法：
<font color="#f40">socket.to(session.id).emit('message', data)</font>    私发给指定session.id的客户端消息
<font color="#f40">socket.emit('message', data)</font>	给socket客户端发消息
```
module.exports = app => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    let usersObj = {}; //存放登录的用户的socket.id
    io.on('connection', socket => {
        // 接收发的消息
        socket.on('message', data => {
            // 把发送方的id值当做key值，socket.id当value值存放在usersObj，每次刷新页面socket.id都会
            let msgData = JSON.parse(data);
            usersObj[msgData.from] = socket.id;

            console.log("服务器收到消息" + data);
            // 将消息私发给指定的客户端
            socket.to(usersObj[msgData.to]).emit('message', data);
            // 给socket客户端发消息
            socket.emit('message', data);
        })
    });
    server.listen(8000)
}
```