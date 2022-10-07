---
title: js对象和数组之间相互转换
date: 2020-03-21 09:07:26
tags: [JavaScript,ES6]
categories: 前端
---


# 有个终极方法解决数组和对象的相互转换问题
下面的两个例子都是es6语法。
1. 数组转换成对象：
知识点： 扩展运算符...
```js
let arr = [1,2,3];
let obj = {...arr};
console.log(obj); //{0: 1, 1: 2, 2: 3}
```
2. 对象转换成数组
知识点： Object.values(obj)
```js
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']
```