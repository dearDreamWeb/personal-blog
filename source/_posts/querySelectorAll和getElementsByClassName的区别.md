---
title: querySelectorAll和getElementsByClassName的区别
date: 2020-05-07 21:00:55
tags: JavaScript
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

一直以为querySelectorAll()系列除了兼容性以外其他方面都能完胜getElementsByClassName()系列，最近才发现我还是太年轻了。
# 区别：
querySelectorAll()和querySelector()有个比较容易忽略的缺点就是<font color="#f40">获取出来的元素及元素数组是静态的</font>；
但是getElementsByClassName(）和getElementsByTagName()<font color="#f40">获取出来的元素及元素数组是动态的</font>
静态的就是说它<font color="#f40">不会随着 dom 操作而改变</font>，动态的 <font color="#f40">dom 变了也会跟着变</font>。
<!-- more -->
# 举个例子就明白了：
先让id为parent的元素中的class为child的元素获取出来，打印一下此时的child获取的数组；
再修改一下parent中的元素，改成了a标签但是class仍是child，再次打印一下此时的child获取的数组。
1. 用querySelectorAll()来测试：
```js
// html
<div id="parent">
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</div>
// js
<script>
    let parent = document.querySelector("#parent");
    let children = parent.querySelectorAll(".child");
    console.log(children);
    parent.innerHTML="<a class='child'></a><a class='child'></a>"
    console.log(children);
</script>
```
运行结果：
![1.png](1.png)

2. 用getElementsByClassName()来做测试：
```js
let parent = document.querySelector("#parent");
let children = parent.getElementsByClassName("child");
console.log(children);
parent.innerHTML="<a class='child'></a><a class='child'></a>"
console.log(children);
```
运行结果：
![2.png](2.png)

这样区别就一目了然了吧。<font color="#f40">getElementsByTagName()也是具有动态获取元素的功能的</font>。