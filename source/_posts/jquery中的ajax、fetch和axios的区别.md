---
title: jquery中的ajax、fetch和axios的区别
date: 2020-12-18 10:18:34
tags: [Javescript,HTML5]
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# jquery ajax
对原生XHR的封装。

优点
- 无页面刷新
- 异步
- 支持JSONP
- 为以后的优秀的http请求库打下来基础
<!-- more -->
缺点
- 本身是针对MVC的,不符合现在前端MVVM的模式
- 会造成回调地狱


# fetch

Fetch 提供了一个更理想的替代方案，可以很容易地被其他技术使用，例如  `Service Workers`。是基于Promise设计的，可以搭配上async/await使用。  
关于service worker的一篇文章的介绍 [Service Workers简介](https://www.jianshu.com/p/1bc5bf8be43d)。

兼容性如下

![fetch兼容性](/jquery中的ajax、fetch和axios的区别/1.png)

优点：
- 符合MVVM模式，脱离了XHR，是ES规范里新的实现方式
- 基于标准的Promise实现，支持async/await
- 更加底层，提供的API丰富（request, response）
- 可以取消发送请求

缺点：
- fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
- 不支持JSONP
- fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
- fetch默认不会带cookie，需要添加配置项
- fetch没有办法原生监测请求的进度，而XHR可以

# axios
Axios本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范。

优点：

- 浏览器和node.js都能用
- 支持 Promise API
- 客户端支持防止CSRF
- 提供了拦截器
- 可以取消发送请求
- 提供了一些并发请求的接口（重要，方便了很多的操作）

缺点：
- 采用的是XHR方式，所以输入、输出和用事件来跟踪的状态混杂在一个对象里


**客户端支持防止CSRF的实现方式：**  
每个请求都带一个从`cookie`中拿到的`key`, 根据浏览器`同源策略`，假冒的网站是`拿不到你cookie中的key`，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。

## axios拦截器  

### 一、 拦截器流程图

![拦截器流程图](/jquery中的ajax、fetch和axios的区别/2.png)

### 二、拦截器的应用场景
对请求和其响应进行特定的处理的时候。
1. 每个请求都附带后端返回的`token`，可以使用 `axios request 拦截器`，在这里，我们给每个请求都加 token,这样就可以节省每个请求再一次次的复制粘贴代码。
2. 当token失效或者后端返回错误信息，都可以用 `axios response 拦截器`，我们统一处理所有请求成功之后响应过来的数据，然后对特殊数据进行处理，其他的正常分发。

### 三、拦截器的使用
主要用的方法：
1. 实例化axios  
axios.create([config])  
简单的例子：
```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',    // 发送请求的前置的url
  timeout: 10000,                              // 请求超时的时间
  headers: {'X-Custom-Header': 'foobar'}      // 请求的headers
});
```
2. 请求拦截器  
axios.interceptors.request.use(function (config) {},function (error) {})  
例子： 
```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```

3. 响应拦截器   
axios.interceptors.response.use(function (config) {},function (error) {})  
例子：  
```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

4. 移除拦截器
```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

注意：  
请求拦截器和响应拦截器的两个回调函数参数，需要`有返回值`才能`继续`。  

- 请求拦截器要返回回调函数的参数才行，否则请求将会被拦截，无法发送到后端，例子如下：
```js
let $axios = axios.create({
    timeout: 10000,
})

// 请求没法发送出去的情况
$axios.interceptors.request.use(config => {
    return;
}, err => console.log(err))

$axios.get('http://localhost:3030/api', { name: 'wxb' }).then(res=>{
    console.log(res);   // undefined， 请求也没有发送出去
});

// 请求发送出去的情况
$axios.interceptors.request.use(config => {
    return config;
}, err => console.log(err))

$axios.get('http://localhost:3030/api', { name: 'wxb' }).then(res=>{
    console.log(res);   // {config:{xxx},data:{xxx},headers:{xxx},request:{xxx},status:xxx,statusText:'xx'}
});
```
- 响应拦截器返回什么数据，then就接收到什么数据

```js
let $axios = axios.create({
    timeout: 10000,
})

// 例子1
$axios.interceptors.response.use(res => {
    return true;  
}, err => console.log(err))

$axios.get('http://localhost:3030/api', { params:{name: 'wxb'} }).then(res=>{
    console.log(res);  // true
});

// 例子2
$axios.interceptors.response.use(res => {
    return res;  
}, err => console.log(err))

$axios.get('http://localhost:3030/api', { params:{name: 'wxb'} }).then(res=>{
    console.log(res);  // {config:{xxx},data:{xxx},headers:{xxx},request:{xxx},status:xxx,statusText:'xx'}
});
```

> 参考文章  
[axios中文文档](http://axios-js.com/zh-cn/docs/index.html)  
[axios拦截器实际应用场景](http://www.lucklnk.com/godaddy/details/aid/195114672)  
[fetch使用的常见问题及其解决办法](https://segmentfault.com/a/1190000008484070)  
[Jquery ajax, Axios, Fetch区别之我见](https://juejin.cn/post/6844903599143649294)