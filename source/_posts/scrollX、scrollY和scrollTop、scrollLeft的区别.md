---
title: scrollX、scrollY和scrollTop、scrollLeft的区别
date: 2020-02-26 17:05:41
tags: JavaScript
categories: 前端
---



## scrollX、scrollY和scrollTop、scrollLeft比较
- 相同点：都可以获取到滚动条的位置，都是window对象下的。bom对象
- 不同点：scrollX、scrollY<font color="#f40">只读不写</font>;scrollTop、scrollLeft：<font color="#f40">可读可写</font>  

<!-- more -->

例子:在console控制台有输入代码，出现相应的结果
![](/scrollX、scrollY和scrollTop、scrollLeft的区别/3.png)
<br>
![](/scrollX、scrollY和scrollTop、scrollLeft的区别/4.png)

## 获取到scrollTop、scrollLeft的方法是
1. 原生js获取 
```js
let top = document.documentElement.scrollTop;
let left = document.documentElement.scrollLeft;
```

2. jq中的获取方法是
```js
let top =  $(window).scrollTop();
let left =  $(window).scrollLeft();
```

## 用scollTop做一个返回顶部功能按钮
```js
let back=document.querySelector(".back");
back.onclick = function () {
    let distance = document.documentElement.scrollTop;
    console.log(distance);
    let s = distance / 600 * 25;  //路程/时间=s *25每隔25ms秒 动的路程
    let st = setInterval(function () {
        distance -= s;
        if (distance <= 0) {
            distance = 0; //当l<=0时，设置l=0
            clearInterval(st);
        }
        document.documentElement.scrollTop = distance;
    }, 25)
}
```