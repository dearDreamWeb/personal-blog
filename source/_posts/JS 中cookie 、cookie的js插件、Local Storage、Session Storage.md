---
layout: js中cookie
title: JS 中cookie 、cookie的js插件、Local Storage、Session Storage
date: 2020-03-28 18:38:46
tags: [JavaScript,H5]
categories: 前端
---
# cookie、Local Storage、Session Storage 定义
<font color="#f40">Cookie（局限性）</font>：用户可以禁用cookie，<font color="#f40">最多只能存储4kb</font>，cookie有过期时间的（一般我们设置的时间最长1个月，<font color="#f40">用户使用杀毒软件也可以清除我们的cookie</font>），cookie还需要指定作用域，不可以跨域调用。

<font color="#f40">LocalStorage</font>：持久化存储到本地，没有过期时间，<font color="#f40">最大可存储5MB</font>
都是采用的明文存储，我们在控制台（Resource）下可以看到存储的信息，所以本地存储都是不安全的（不要存储重要的信息，如果需要的话，我们需要对重要的信息进行严格的加密—md5加密）

<font color="#f40">WebStorage(localStorage(常用，sessionStorage))</font>
由于我们的localStorage可以存储很多的数据，我们在项目中把不经常更新的数据进行存储，下一次打开页面，先把本地缓存的数据展示，减少对于服务器的请求压力---移动端的本地缓存。

<font color="#f40">sessionStorage</font>用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。

<!-- more -->
# cookie
Cookie 以名/值对形式存储，如下所示:
username=John Doe
## 使用 JavaScript 创建Cookie（增）
JavaScript 中，<font color="#f40">创建 cookie</font> 如下所示：
```js
document.cookie="username=John Doe";
```
<font color="#f40">设置cookie的生命周期</font>。默认情况下，cookie 在浏览器关闭时删除，<font color="#f40">可以用max-age单位是秒</font>：
```js
document.cookie="username=John Doe; max-age=5";//cookie生命周期为5秒
```
您可以使用<font color="#f40">path 参数告诉浏览器 cookie 的路径</font> 。默认情况下，cookie 属于当前页面。
```js
document.cookie="username=John Doe;max-age=5 ; path=/";
```

## 使用 JavaScript 删除 Cookie(删)
删除 cookie 非常简单。您只需要设置 max-age 参数为0即可，如下所示，设置为 max-age=0;
```js
document.cookie = "username=;max-age=0;";
```
注意，当您删除时不必指定 cookie 的值。

## 使用 JavaScript 修改 Cookie（改）
在 JavaScript 中，修改 cookie 类似于创建 cookie，如下所示：
```js
document.cookie="username=John Smith; path=/";
```
旧的 cookie 将被覆盖。

##  JavaScript 读取 Cookie（查）
在 JavaScript 中, 可以使用以下代码来读取 cookie，<font color="#f40">以字符串的形式返回 ，每对的cookie值都是以；结尾的，可以截取用</font>
有些浏览器不识别汉字需要编码
<font color="#f40">encodeURIComponent()</font>    对汉字进行编码
<font color="#f40">decodeURIComponent()</font>　  对编码的结果进行解码：
```js
var x = document.cookie;
console.log(x)
```
运行结果
![](1.png)

![](2.png)

# 轻量级JS Cookie插件js-cookie的使用方法
介绍：js-cookie插件是一个JS操作cookie的插件，源文件只有3.34 KB，非常轻量级。js-cookie也支持npm和Bower安装和管理。
## 引入js-cookie.js
- 直接引用cdn：
```js
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
```

- 本地下载下来后：
```js
<script src="/path/to/js.cookie.js"></script>
```

- 模块化开发时:
```js
 import Cookies from 'js-cookie'
 ```
 
## js-cookie.js常用的API和方法
1. 设置cookie
```js
Cookies.set('name', 'value', { max-age: 7, path: '' });//7秒过期
Cookies.set('name', { foo: 'bar' });//设置一个json
```

2. 读取cookie
```js
Cookies.get('name');//获取cookie
Cookies.get(); //读取所有的cookie
```

3. 删除cookie
```js
Cookies.remove('name'); //删除cookie时必须是同一个路径。
```


# localStorage和sessionStorage
localStorage和sessionStorage的语法是一样的

// 保存数据到sessionStorage
```js
sessionStorage.setItem('key', 'value');
```

// 从sessionStorage获取数据
```js
var data = sessionStorage.getItem('key');
```
也可以直接用sessionStorage.key

// 从sessionStorage删除保存的数据
```js
sessionStorage.removeItem('key');
```

// 从sessionStorage删除所有保存的数据
```js
sessionStorage.clear();
```

注意：
往localStorage和sessionStorage传值的话，比如传对象或者数组的时候记得先把其转换成json对象，用JSON.stringify();获取值的时候再用<font color="#f40">JSON.parse()或者eval("("+ JSON+")")</font>等方法去解析JSON。
例子：
![](3.png)

localStorage的语法和sessionStorage是一样的

关于cookie、localStorage和sessionStorage的区别详细的讲解
https://www.cnblogs.com/pengc/p/8714475.html
