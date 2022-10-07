---
title: js正则表达式中的indexOf和search的区别，exec与match的区别说明
date: 2020-04-12 18:50:12
tags: JavaScript
categories: 前端
---


# indexOf和search的区别
search和indexOf的作用都是匹配出符合条件的字符串的索引位置，区别是search能用正则表达式匹配
<!-- more -->
# exec与match的区别
1. 当正则表达式<font color="#f40">无子表达式</font>，并且定义为<font color="#f40">非全局匹配</font>时，exec和match执行的<font color="#f40">结果是一样</font>，均返回第一个匹配的字符串内容 ,如下边的第1种情况；

2. 当正则表达式<font color="#f40">无子表达式</font>，并且定义为<font color="#f40">全局匹配</font>时，exec和match执行，做存在多处匹配内容，则match返回的是<font color="#f40">多个元素数组</font>，而<font color="#f40">exec只会找到一个匹配的即返回</font>,如下边的第2种情况；

3. 当正则表达式<font color="#f40">有子表达式</font>时，并且定义为<font color="#f40">非全局匹配</font>，exec和match执行的<font color="#f40">结果是一样</font>如下边的第3种情况；

4. 当正则表达式<font color="#f40">有子表达式</font>时，并且定义为<font color="#f40">全局匹配</font>，exec和match执行的<font color="#f40">结果不一样</font>，此时<font color="#f40">match将忽略子表达式，只查找全匹配正则表达式并返回所有内容</font>，如下第4种情况；

也就说，<font color="#f40">exec与全局是否定义无关系，而match则于全局相关联，当定义为非全局，两者执行结果相同
</font>

第1种情况
```js
var reg = new RegExp("abc") ; 
var str = "3abc4,5abc6";
console.log(reg.exec(str));    //abc
console.log(str.match(reg));   //abc
```

第2种情况
```js
var reg = new RegExp("abc","g") ; 
var str = "3abc4,5abc6";
console.log(reg.exec(str));//["abc", index: 1, input: "3abc4,5abc6", groups: undefined]
console.log(str.match(reg));//["abc", "abc"]
```
效果图：
![](/js正则表达式中的indexOf和search的区别，exec与match的区别说明/0.png)


第3种情况
```js
var reg = new RegExp("a(bc)") ; 
var str = "3abc4,5abc6";
console.log(reg.exec(str));//abc,bc
console.log(str.match(reg));//abc,bc
```
效果图：
![](/js正则表达式中的indexOf和search的区别，exec与match的区别说明1.png)


第4种情况
```js
var reg = new RegExp("a(bc)","g") ; 
var str = "3abc4,5abc6";
console.log(reg.exec(str));//abc,bc
console.log(str.match(reg));//abc,abc
```
效果图
![](/js正则表达式中的indexOf和search的区别，exec与match的区别说明2.png)