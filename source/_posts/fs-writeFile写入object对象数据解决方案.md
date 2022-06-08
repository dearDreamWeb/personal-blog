---
title: fs.writeFile写入object对象数据解决方案
date: 2020-09-30 17:46:56
tags: Node
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 问题描述
如果是要写入`object`数据的话，会出现`[object,object]`的情况  
例如:
```js
fs.writeFile("./data.json", {a:1,b:2}, 
 err => console.log(err))
```
运行之后的`data.json`文件的内容为 `[object,object]`
<!-- more -->
![1.png](/fs.writeFile写入object对象数据解决方案/1.png)

# 原因：
因为`writeFile`是最终是通过`将内容转换成字节码`进行写入的，而类型为`Object内容没办法转换成字节码`，会被`先转换成字符类型`。最终出现上述类型。

# 解决办法：
用`JSON.stringify` 可以解决  
例子:
```js
fs.writeFile("./data.json", JSON.stringify({a:1,b:2}), 
 err => console.log(err))
```
运行之后的`data.json`文件的内容为 `[object,object]`
![2.png](/fs.writeFile写入object对象数据解决方案/2.png)

这里可以优化一下的，因为data.json文件中的数据并没有缩进和换行，一旦数据量大的话，会照成数据结构看起来不清晰，所以在`JSON.stringify中添加可选参数`，`进行缩进换行。`   
例子：
```js
fs.writeFile("./data.json", JSON.stringify({a:1,b:2}, null, '\t'), 
err => console.log(err))
```
运行之后的`data.json`文件的内容为 `[object,object]`
![3.png](/fs.writeFile写入object对象数据解决方案/3.png)