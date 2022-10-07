---
title: js中的XMLHttpRequest对象
date: 2020-12-02 17:50:52
tags: JavaScript
categories: 前端
---


# 介绍
- XMLHttpRequest对象是`ajax技术的核心`。
- JavaScript通过这个对象可以自己发送请求，同时也自己处理响应。
- 得到了几乎所有现代浏览器的支持。

# 兼容性
微软最早在`IE5`中以`ActiveX对象`的形式实现了一个名叫`XMLHTTP`的对象。在IE中创建新的对象要使用下列代码：
<!-- more -->
```js
var request = new ActiveXObject('Msxml2.XMLHTTP.3.0');
```
其他浏览器则基于`XMLHttpRequest`来创建新对象：

```js
var request = new XMLHttpRequest();
```
更麻烦的是，`不同IE版本`中使用的`XMLHTTP对象也不完全相同`。为了兼容所有浏览器，这样写：

```js
function getHTTPObject() {
    <!-- 判断浏览器是否支持XMLHttpRequest -->
    if(typeof XMLHttpRquest === 'undefined'){
        try{
            return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        }catch(e){}
        try{
            return new ActiveXObject('Msxml2.XMLHTTP.3.0');
        }catch(e){}
        try{
            return new ActiveXObject('Msxml2.XMLHTTP');
        }catch(e){}
        return false;
    }
    return new XMLHttpRequest();
}
var request = getHTTPObject();
```
# open方法
XMLHttpRequest对象的HTTP和HTTPS请求必须通过`opent方法初始化`。这个方法必须在实际发送请求之前调用，以用来验证请求方法，URL以及用户信息。这个方法不能确保URL存在或者用户信息必须正确。初始化请求可以接受5个参数，一般常用前3个参数：

```
open( Method, URL, Asynchronous, UserName, Password )
```
1. 第一个参数是`请求方法`，如下
- GET (IE7+,Mozilla 1+)
- POST (IE7+,Mozilla 1+)
- HEAD (IE7+)
- PUT
- DELETE
- OPTIONS (IE7+)  

使用`POST`请求的方法的话，需要发送合适的`请求头信息`，例子：

```
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
```

2. 第二个参数是string类型，`标示请求的URL`。
3. 第三个参数是boolean类型，`用于指定请求是否以异步方式发送和处理`。
4. 第四个参数是string类型，指定`用户名`。
5. 第五个参数是string类型，指定`密码`。


# onreadystatechange事件处理函数
它会在服务器给XMLHttpRequest对象送回响应的时候被触发执行。  
将自动在XMLHttpRequest对象的`readyState属性改变`时被触发。

# readyState 属性
服务器在向XMLHttpRequest对象发回响应时，该对象有许多属性可用，浏览器会在不同阶段更新readyState属性的值，它有5个可能的值：
- 0 表示未初始化
- 1 表示正在加载
- 2 表示加载完毕
- 3 表示正在交互
- 4 表示完成

只有`readyState`属性的值变成了`4`，就`可以访问服务器发送回来的数据`了。

# status属性
代表请求的响应状态，如200，404等。

# send方法
向服务器发送请求，默认发送的`null`。  
```
request.send(null)
```
send方法也可以`发送参数`，但`仅限post请求`才行，`get`请求发送参数需要在`open`里面的`第二个参数`里的请求地址后面添加。下面举个例子：   

get请求发送参数

```js
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://localhost:3030/api?foo=bar&lorem=ipsum', true);     // 发送的参数数据 { foo: 'bar', lorem: 'ipsum' }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(request.responseText);
        }
    };
    xhr.send(); 
```
post请求发送参数

```js
    var request = new XMLHttpRequest()
    request.open('post', 'http://localhost:3030/api', true);
    //发送合适的请求头信息
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.responseText);
        }
    };
    // 参数
    request.send("foo=bar&lorem=ipsum"); // 发送的参数数据 { foo: 'bar', lorem: 'ipsum' }
```

> 内容部分参考自[《JavaScript DOM 编程艺术》](https://www.ituring.com.cn/book/42)