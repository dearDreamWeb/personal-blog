---
title: Vue3配置环境变量
categories: 前端
date: 2022-03-21 11:08:51
tags: [Vue3]
---
<script type="text/javascript" src="/js/bai.js"></script>

# 使用场景
在做项目中经常用到axios去发送请求，也通常会把axios进行一个封装去使用，axios中使用`baseURL`字段去配置请求的基础路径，如：  
```js
const http = axios.create({
    baseURL: 'http://test-www.baidu.com'
})

// 请求http://test-www.baidu.com/api接口
http.get('/api')
```
<!--more-->
这样可以使我们在去调用接口时可以不用填写基础路径的繁琐以及统一修改请求的基础路径的配置。但是往往开发环境和生产环境所需要请求不同的基础路径，如开发是请求的基础路径是`http://test-www.baidu.com`，而生产是调用的是基础路径是`https://www.baidu.com`。

# 解决方案
一、每次提交代码前就手动修改axios的`baseURL`字段。如：在开发阶段就把`baseURL`字段改成`http://test-www.baidu.com`,在生成阶段把`baseURL`字段改成`https://www.baidu.com`。这样做的话每次都会很繁琐，而且有时候会出现忘记的情况。

二、使用环境变量
1. 根目录下创建.env.development、.env.production。   
.env.development文件配置如下

```js
//模式
VITE_MODE_NAME=development
// 设置环境变量VITE_BASE_URL
VITE_BASE_URL='http:test-www.baidu.com'
```
.env.production配置如下:

```js
//模式
VITE_MODE_NAME=development
// 设置环境变量VITE_BASE_URL
VITE_BASE_URL='https://www.baidu.com'
```

如果项目使用了ts的话，可以创建`env.d.ts`文件进行ts类型声明。  
```ts
// src/types/env.d.ts
interface ImportMetaEnv {
  VITE_BASE_URL: string
}

```
2. 在axios中使用`import.meta.env`获取环境变量。  
```
const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

// 请求http://test-www.baidu.com/api接口
http.get('/api')
```
3. package.json中进行配置打包命令：
```json
"scripts": {
    // 本地开发环境
    "dev": "vite --mode development",
    // 生产使用的环境变量
    "build": "vite build --mode production",
  },

```
PS: 这种方法用于个人的项目，只用生产环境，没有测试环境的情况，如果有两套环境的话，也可以使用package.json配置这个方法，只不过很麻烦。可以用jenkins去直接配置好环境变量等等，方法去做。