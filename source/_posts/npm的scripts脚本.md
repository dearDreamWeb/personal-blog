---
title: npm的scripts脚本
categories: 前端
date: 2021-10-08 19:47:26
tags: [Node,Npm]
---
<script type="text/javascript" src="/js/bai.js"></script>

npm中的package.json中可以通过scripts字段来实现脚本。
# 原理
npm使用`npm run`去执行脚本，会启动一个shell，可以通过shell命令运行脚本。  
当使用npm run命令的时候会将当前目录的`node_modules/.bin`子目录加入`PATH`变量，执行结束后，再将PATH变量恢复原样。  
比如使用jest test来做对比：
<!--more-->
```json
"test": "jest test"
```
这就相当于
```json
"test": "./node_modules/.bin/jest test"
```
# 通配符
`*`表示任意文件名，`**`表示任意一层子目录。  
例子:
```
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```
如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。
```
"test": "tap test/\*.js"
```

# 传参
## 使用环境变量来代替
```js
"scripts": {
    "start": "PORT=3000 node app.js"
}
```
在app.js文件中获取PORT的值
```
console.log(process.env.PORT)
```
打印结果：`3000`

## 可以通过config配置项来定义变量获取
例子：
```
"scripts": {
    "start": "node app.js"
}
"config": {
  "myPort": "5000"
}
```
app.js中获取myPort的变量
```
console.log(process.env.npm_package_config_myPort)
```
打印结果：`5000`

package.json中的配置项都可以通过`process.env.npm_package_`后面是配置项名字来获取到。  
如：  
```js
// package.json文件
"name": "npmTest",
"version": "1.0.0",
"scripts": {
    "test": "node app.js",
},
```
想要获取name就需要用`process.env.npm_package_name`,注意获取配置项一定要精确到最后，否则无法获取，比如无法获取scripts配置项中的所有数据，想要获取数据，要具体一点才行，如：`process.env.npm_package_scripts_test`才能获取到数据，而不是`process.env.npm_package_scripts`,这样的话获取到的结果是`undefined`。

## 用命令去修改配置项的值
使用命令去修改package.json中的数据，如：
```
"name": "npmTest",
"scripts": {
    "test": "node app.js",
},
"config": {
    "myPort": "3000"
}
```
使用`npm config set npmTest:myPort 4000`来改变config配置项中的myPort的值。
这样在app.js中使用
```
console.log(process.env.npm_package_config_myPort)
```
打印结果为：`4000`

注意：npm config set 后面是package.json的name的值冒号加上要改的字段

# 执行顺序
想要执行多个任务，需要使用`&`或者`&&`来进行操作。  
`&`来连接多个任务，表示多个任务异步执行。如：
```
"scripts": {
    "test": "node app.js & node app1.js",
},
```
`node app.js`和`node app1.js`会异步执行，具体谁先执行完是未知的。

`&&`来连接多个任务，表示多个任务同步执行(即只有前一个任务成功，才执行下一个任务)。如：
```
"scripts": {
    "test": "node app.js & node app1.js",
},
```
只有`node app.js`执行完成后才会开始执行`node app1.js`

> 参考自：[npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
